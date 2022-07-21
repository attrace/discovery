import { ethers } from "ethers";
import { NetworkContract } from "./types";

interface BaseIndexedLogSet {
  setName: string;
  events: string[];
  contracts: NetworkContract[];
}

export interface IndexedLogSet extends BaseIndexedLogSet {
  eventIds: string[];
}

export async function getIndexedLogSets(): Promise<IndexedLogSet[]> {
  return rows.map(d => ({ 
    ...d,
    contracts: d.contracts.map(d => ({ ...d, address: ethers.utils.getAddress(d.address) })),
    eventIds: getEventIDsFromABI(d.events),
  }));
}

// Actual definitions without checks
const rows: BaseIndexedLogSet[] = [
  {
    setName: 'ATTRToken',
    events: [
      'event TransferRuleConfigured(address addr, (uint16 timeLockMonths, uint16 vestingMonths, uint96 tokens, uint40 activationTime, uint16 outboundTimeLockMonths, uint16 outboundVestingMonths) rule)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'event Approval(address indexed owner, address indexed spender, uint256 value)',
    ],
    contracts: [
      { chainId: 1, address: '0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A', startBlockNumber: 12434965 },
      // { chainId: 137, address: '0x0335DeFC8A1977b99488e0b5f5c6bc3D44fAcdD4', startBlockNumber: 16511305 },
    ]
  },
  {
    setName: 'StakingRewardsV1',
    events: [
      'event RewardSet(uint256 indexed reward)',
      'event PeriodExtend(uint256 indexed periodEnds)',
      'event Staked(address indexed user, uint256 amount)',
      'event Withdrawn(address indexed user, uint256 amount, uint256 penalty)',
      'event RewardPaid(address indexed user, uint256 reward)',
      'event Recovered(address indexed token, uint256 amount)'
    ],
    contracts: [
      { chainId: 1, address: '0x4e5c36cc0f10717d6407f39424ab402627b85197', startBlockNumber: 13952340 },
    ]
  },
  {
    setName: 'ReferralFarmsV1',
    events: [
      'event FarmExists(address indexed sponsor, bytes24 indexed rewardTokenDefn, bytes24 indexed referredTokenDefn, bytes32 farmHash)',
      'event FarmDepositIncreased(bytes32 indexed farmHash, uint128 delta)',
      'event FarmDepositDecreaseClaimed(bytes32 indexed farmHash, uint128 delta)',
      'event FarmMetastate(bytes32 indexed farmHash, bytes32 indexed key, bytes value)',
      'event RewardsHarvested(address indexed caller, bytes24 indexed rewardTokenDefn, bytes32 indexed farmHash, uint128 value, bytes32 leafHash)',
      'event FarmDepositDecreaseRequested(bytes32 indexed farmHash, uint128 value, uint128 confirmation)',
    ],
    contracts: [
      { chainId: 1, address: '0xC1F04af99fc53DD3b74615AB47D8825EB98B7943', startBlockNumber: 15008645 },
      { chainId: 4, address: '0x0c050289cBD8E3c9dcd084c5769732C2cEdbB9e9', startBlockNumber: 10897251 },
    ]
  },
  {
    setName: 'ConfirmationV1',
    events: [
      'event ConfirmationFinalized (bytes32 indexed confirmationHash, uint128 indexed number, bytes32 stateRoot, bytes32 parentHash, uint64 timestamp, bytes32 bundleHash, bytes32 indexed closerHash, uint32 blockCount, bytes32 blockHash, uint64 confirmChainBlockNr)',
      'event ConfigChanged(address indexed oracleGate, uint32 finalizeBlockDiffMin)',
    ],
    contracts: [
      { chainId: 1, address: '0x3BdE25d3Ca9b0B08f183D52448aFCF8E3E772BEe', startBlockNumber: 14873531 },
      { chainId: 4, address: '0xb3B6E8e115F2E755b4452AE2d58f8216344eFC1a', startBlockNumber: 10897245 },
    ]
  },
  {
    setName: 'UniswapV2Factory',
    events: [
      'event PairCreated(address indexed token0, address indexed token1, address pair, uint)',
    ],
    contracts: [
      { chainId: 1, address: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', startBlockNumber: 10000835 },
    ]
  },
  {
    setName: 'UniswapV3Factory',
    events: [
      'event PoolCreated( address indexed token0, address indexed token1, uint24 indexed fee, int24 tickSpacing, address pool)',
    ],
    contracts: [
      { chainId: 1, address: '0x1F98431c8aD98523631AE4a59f267346ea31F984', startBlockNumber: 12369621 },
    ]
  },
];

export function getEventIDsFromABI(abi: string[]): string[] {
  const iface = new ethers.utils.Interface(abi)
    
  const eventIDs :string[] = []
  for (const evName in iface.events) {
    if (Object.prototype.hasOwnProperty.call(iface.events, evName)) {
      eventIDs.push(ethers.utils.id(evName))
    }
  }
  return eventIDs
}