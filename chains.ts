import { ethers } from "ethers";
import { getEventIDsFromABI } from "./indexedLogSets";
import { EstimatedNodeLocation, NetworkContract } from "./types";

type ChainId = string;

// The behavior and supported datasets of oracles depends on the authority contract they bootstrap from.
// Conceptually we think of this authority contract as also the forking source.
//
// The chain id of the oracle reflects the "networks" they operate in according to Attrace DAO-voted behaviors.
// Chain id has structure: PACEMAKERNETWORK_47[_TESTADDITION]. 
// Eg: 1_47 = mainnets paced by eth mainnet, 4_47_0 = testnets paced by rinkeby, ...
//
// Conceptually you want to connect as a client to a "behavior set" according to expectations.
//
// We think of this file as just an authority index _without imposing logic_.
//
// Since chain id is a big number, we index it as a string and to avoid list-parsing on the client while providing deep lookups after deserializing.

interface OracleInfo {
  // Attrace chain ID the oracle operates on. Attrace chain ID labeling is limited to uint32.
  // Eg: 147
  chainId: number;
  
  // RPC connect endpoint
  // Eg: 'https://oracle-147-dub.attrace.com'
  url: string;

  // GPS location where the node is nearest to.
  // Eg: { "lat": 53.3331, "lon": -6.2489 }
  location: EstimatedNodeLocation;
}

interface ChainContract {
  // Chain id a contract operates on, as big number, encoded as string.
  // Eg: '1'
  chainId: string;

  // Address on the chain where this contract can be found, hex-encoded.
  // Eg: '0x518173169DaB8483bc42c943969357A1F5BF091C'
  address: string;

  // Optional block number where to scan from to find the contract creation quickly can be provided.
  // Eg: 13952340
  startBlockNumber?: number;
}

interface ChainConfiguration {
  // The chainId this chain configuration is assigned by the Attrace DAO.
  // Eg: 147
  chainId: number;

  // The authority contract these oracles bootstrap from (source of truth)
  // Eg: { chainId: '1', contract: '0x518173169DaB8483bc42c943969357A1F5BF091C', startBlockNr: 12345575 }
  authority: ChainContract;

  // Pacemaker blockchain chainid as big number string.
  // Eg: '1'
  pacemaker: string;

  // Set of confirmation contracts these oracles support (loaded from the authority)
  confirmationsV1: ChainContract[];
  
  // Set of referral farm contracts these oracles support (loaded from the authority)
  referralFarmsV1: ChainContract[];

  // Set of swap referral contracts these oracles support (loaded from the authority)
  swapReferralsV1: ChainContract[];

  // Additional indexed log sets these oracles provide for optimal dapp performance
  indexedLogSets: IndexedLogSet[];
}

// A single network-specific chain configuration and it's oracles
interface ChainInfo extends ChainConfiguration {
  // DAO-elected oracles by chain
  oracles: OracleInfo[];
}

// DAO-authority decided chain configurations
type ChainsInfo = Record<ChainId, ChainInfo>;

export async function getChains() : Promise<ChainsInfo> {
  const chains: ChainInfo[] = [mainnet, goerli0, rinkeby0];

  // Validations
  for(let c of chains) {
    validateChainContracts([...c.confirmationsV1, ...c.referralFarmsV1, ...c.swapReferralsV1]);
  }

  // Build string-indexed chains info
  return chains.reduce((acc, c) => {
    acc[c.chainId.toString()] = c;
    return acc;
  }, {} as ChainsInfo);
}

function validateChainContracts(contracts: ChainContract[]) {
  return contracts.map((d) => {
    if(typeof d.chainId !== 'string') {
      throw new Error('chainId should be string');
    }
    return {
      ...d,
      address: ethers.utils.getAddress(d.address),
    };
  });
}

interface LogSet {
  setName: string;
  events: string[];
}

interface BaseIndexedLogSet extends LogSet {
  contracts: ChainContract[];
}

interface IndexedLogSet extends BaseIndexedLogSet {
  eventIds: string[];
}

function generateIndexedLogSets(rows: BaseIndexedLogSet[]): IndexedLogSet[] {
  return rows.map(d => ({ 
    ...d,
    contracts: d.contracts.map(d => ({ ...d, address: ethers.utils.getAddress(d.address) })),
    eventIds: getEventIDsFromABI(d.events),
  }));
}

const logset_ATTRToken: LogSet = {
  setName: 'ATTRToken',
  events: [
    'event TransferRuleConfigured(address addr, (uint16 timeLockMonths, uint16 vestingMonths, uint96 tokens, uint40 activationTime, uint16 outboundTimeLockMonths, uint16 outboundVestingMonths) rule)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
  ]
};

const logset_StakingRewardsV1: LogSet = {
  setName: 'StakingRewardsV1',
  events: [
    'event RewardSet(uint256 indexed reward)',
    'event PeriodExtend(uint256 indexed periodEnds)',
    'event Staked(address indexed user, uint256 amount)',
    'event Withdrawn(address indexed user, uint256 amount, uint256 penalty)',
    'event RewardPaid(address indexed user, uint256 reward)',
    'event Recovered(address indexed token, uint256 amount)'
  ]
};

const logset_ReferralFarmsV1: LogSet = {
  setName: 'ReferralFarmsV1',
  events: [
    'event FarmExists(address indexed sponsor, bytes24 indexed rewardTokenDefn, bytes24 indexed referredTokenDefn, bytes32 farmHash)',
    'event FarmDepositIncreased(bytes32 indexed farmHash, uint128 delta)',
    'event FarmDepositDecreaseClaimed(bytes32 indexed farmHash, uint128 delta)',
    'event FarmMetastate(bytes32 indexed farmHash, bytes32 indexed key, bytes value)',
    'event RewardsHarvested(address indexed caller, bytes24 indexed rewardTokenDefn, bytes32 indexed farmHash, uint128 value, bytes32 leafHash)',
    'event FarmDepositDecreaseRequested(bytes32 indexed farmHash, uint128 value, uint128 confirmation)',
  ]
};

const logset_ConfirmationV1: LogSet = {
  setName: 'ConfirmationV1',
  events: [
    'event ConfirmationFinalized (bytes32 indexed confirmationHash, uint128 indexed number, bytes32 stateRoot, bytes32 parentHash, uint64 timestamp, bytes32 bundleHash, bytes32 indexed closerHash, uint32 blockCount, bytes32 blockHash, uint64 confirmChainBlockNr)',
    'event ConfigChanged(address indexed oracleGate, uint32 finalizeBlockDiffMin)',
  ]
};


// Single file we manage to generate the outputs
const mainnet: ChainInfo = {
  chainId: 147,
  authority: { chainId: '1', address: '0x518173169DaB8483bc42c943969357A1F5BF091C' },
  pacemaker: '1',
  confirmationsV1: [
    { chainId: '1', address: '0x3bde25d3ca9b0b08f183d52448afcf8e3e772bee' }
  ],
  referralFarmsV1: [
    { chainId: '1', address: '0xc1f04af99fc53dd3b74615ab47d8825eb98b7943'},
  ],
  swapReferralsV1: [
    // TODO on release
  ],
  indexedLogSets: [
    ...generateIndexedLogSets([
      { 
        ...logset_ATTRToken, 
        contracts: [
          { chainId: '1', address: '0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A', startBlockNumber: 12434965 },
        ]
      },
      { 
        ...logset_StakingRewardsV1, 
        contracts: [
          { chainId: '1', address: '0x4e5c36cc0f10717d6407f39424ab402627b85197', startBlockNumber: 13952340 }
        ]
      },
      { 
        ...logset_ReferralFarmsV1, 
        contracts: [
          { chainId: '1', address: '0xC1F04af99fc53DD3b74615AB47D8825EB98B7943', startBlockNumber: 15008645 }
        ]
      },
      {
        ...logset_ConfirmationV1,
        contracts: [
          { chainId: '1', address: '0x3BdE25d3Ca9b0B08f183D52448aFCF8E3E772BEe', startBlockNumber: 14873531 },
        ]
      }
    ]),
  ],
  oracles: [
    {
      chainId: 147,
      url: 'https://oracle-147-dub.attrace.com',
      location: {
        "lat": 53.3331,
        "lon": -6.2489
      },
    }
  ]
}

const rinkeby0: ChainInfo = {
  chainId: 4470,
  authority: { chainId: '4', address: '0xe4517CE62Ee3f09Eee68940e3e2BcE27C525df4B' },
  pacemaker: '4',
  confirmationsV1: [
    { chainId: '4', address: '0xb3B6E8e115F2E755b4452AE2d58f8216344eFC1a' },
  ],
  referralFarmsV1: [
    { chainId: '4', address: '0x0c050289cBD8E3c9dcd084c5769732C2cEdbB9e9'},
  ],
  swapReferralsV1: [
    // TODO on release
  ],
  indexedLogSets: [
    ...generateIndexedLogSets([
      { 
        ...logset_ReferralFarmsV1, 
        contracts: [
          { chainId: '4', address: '0x0c050289cBD8E3c9dcd084c5769732C2cEdbB9e9', startBlockNumber: 10897251 }
        ]
      },
      {
        ...logset_ConfirmationV1,
        contracts: [
          { chainId: '4', address: '0xb3B6E8e115F2E755b4452AE2d58f8216344eFC1a', startBlockNumber: 10897245 },
        ]
      }
    ]),
  ],
  oracles: [
    {
      chainId: 4470,
      url: 'https://oracle-4470-dub.attrace.com',
      location: {
        lat: 50.1109,
        lon: 8.6821,
      },
    }
  ]
}

const goerli0: ChainInfo = {
  chainId: 5470,
  authority: { chainId: '5', address: '0x2b1116ca5974635a40B820B974Dcb3Ab9D181681' },
  pacemaker: '5',
  confirmationsV1: [
    { chainId: '5', address: '0xEE6dF5Bdc3C472401B6DA7ededE1D034a9848ab7' },
  ],
  referralFarmsV1: [
    { chainId: '5', address: '0x1e1885389b229b036460e2191fbdf0290Bd2baE9'},
  ],
  swapReferralsV1: [
    // TODO on release
  ],
  indexedLogSets: [
    ...generateIndexedLogSets([
      { 
        ...logset_ReferralFarmsV1, 
        contracts: [
          { chainId: '5', address: '0x1e1885389b229b036460e2191fbdf0290Bd2baE9', startBlockNumber: 7327781 }
        ]
      },
      {
        ...logset_ConfirmationV1,
        contracts: [
          { chainId: '5', address: '0xEE6dF5Bdc3C472401B6DA7ededE1D034a9848ab7', startBlockNumber: 7327774 },
        ]
      }
    ]),
  ],
  oracles: [
    {
      chainId: 5470,
      url: 'https://oracle-5470-dub.attrace.com',
      location: {
        lat: 50.1109,
        lon: 8.6821,
      },
    }
  ]
}