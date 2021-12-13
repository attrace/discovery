import { NetworkContract } from "./types";
import { ethers } from "ethers";

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
    eventIds: getEventIDsFromABI(d.events),
  }));
}

// Actual definitions without checks
const rows: BaseIndexedLogSet[] = [
  {
    setName: 'DAOStateV1',
    events: [
      'event AddressChanged(string setting, address requestor, address addr)',
      'event VerifierSettingsChanged(address requestor, uint96 verifierStake, uint96 verifierStakeSlashLowBound, uint24 verifierFraudDetectionMinTime)', // Can be ignored
    ],
    contracts: [
      { chainId: 1, address: '0x8f86BaAbEc737Eb00449425025964Fc4dFbf1522', startBlockNumber: 12619823 },
      { chainId: 4, address: '0xeD155B74703a0EF9E7c6B4E62357e362f3968935', startBlockNumber: 8731982 },
      { chainId: 137, address: '0x0CD36BF14Fa1642Ebd8300b484E7fCa1052975c4', startBlockNumber: 17897741 },
      { chainId: 80001, address: '0x22E31747A31E82aD86c8C8E68646Cb55b31fc467', startBlockNumber: 17425384 },
    ]
  },
  {
    setName: 'LiquidityFarmingReferralContractV1',
    events: [
      'event BountiesPayed(bytes32 indexed refHash, address[] beneficiaries, uint[] amounts)',
      'event ReferralTokenMinted(bytes32 indexed refHash, address indexed promoter, bytes32 indexed token)',
      'event ReferrableConversion(bytes32 indexed refHash, address indexed verifier, address indexed promoter, address buyer)',
      'event ReferrableWithdrawn(bytes32 indexed refHash, address seller)',
      'event ReferrableCreated(bytes32 indexed refHash, string metadata, (uint128 bountyValue,address pairAddrV2,address pairAddrV3,address farmingContract) metastate, uint utilityFee)',
      'event ReferrableConfigurationUpdated(bytes32 indexed refHash, string key, bytes value)',
      'event ReferrableStateSnapshot(bytes32 indexed refHash, ((address,uint96,uint32,uint32,uint40,uint24,uint24,uint24),address,uint40,uint32,uint96,uint96,uint40) state)',
      'event PeriodConfigured(bytes32 indexed refHash, uint40 startTime, uint40 endTime)',
    ],
    contracts: [
      { chainId: 1, address: '0x160d5f442e7d3899955cf5adfc15fce57c05ea78', startBlockNumber: 12914040 },
      { chainId: 4, address: '0x5b2e70592b237779039fe096a9e32855e345a26a', startBlockNumber: 9009904 },
      { chainId: 137, address: '0x45cf5df9e67409279f635291c71dc76a370f4f69', startBlockNumber: 18038834 },
      { chainId: 80001, address: '0x3c15487649969e95fd525e653f69e6b077762d5f', startBlockNumber: 17454705 },
    ]
  },
  {
    setName: 'BountyVaultV1',
    events: [
      'event ERC20BountyDeposited(bytes32 indexed refHash, address token, uint256 value, address from)',
      'event NativeBountyDeposited(bytes32 indexed refHash, uint256 value, address from)',
    ],
    contracts: [
      { chainId: 4, address: '0x6a73AB4Cb1031a8f3e907333678c9BDdd7411fd5', startBlockNumber: 9607267 },
      { chainId: 137, address: '0x9Ba69Ae4b4b7096B54Bd623097DB46a0fc28EbbD', startBlockNumber: 21167099 },
      { chainId: 80001, address: '0x7dba02428f810ccd6433f2b6d08526104bb77ccc', startBlockNumber: 21210152 },
    ]
  },
  {
    setName: 'ProgramRegistryV1',
    events: [
      'event ConversionPeriodChanged(bytes32 indexed refHash, uint8 change, (uint40 begin, uint40 end, uint40 promoBegin, uint40 promoEnd, uint40 finalized) period)',
      'event ProgramProofAdded(bytes12 indexed proof, bytes32 indexed refHash)',
    ],
    contracts: [
      { chainId: 4, address: '0xfed2f6c007051ca8edb31b5fed00e7b9929eaa49', startBlockNumber: 9607267 },
      { chainId: 137, address: '0x00Db840A1Ba3d00A6C6316fdF3D0de86497899E8', startBlockNumber: 21167099 },
      { chainId: 80001, address: '0xc25ceb355897e818a4300590294317497bbd6805', startBlockNumber: 21213486 },
    ]
  },
  {
    setName: 'DAPPOpenPeriodClosedListFilter',
    events: [
      'event ConfigChanged(bytes32 refHash, string key, bytes value)',
      'event AddressesChanged(bytes32 indexed refHash, uint8 change, address[] addresses)',
    ],
    contracts: [
      { chainId: 1, address: '0xFe2a0d3604007AD32480B550eC3E792aFAC8739f', startBlockNumber: 13582052 },
      { chainId: 4, address: '0x8e9bdf12798a59a8540e07a7f3ce0d047bd48af4', startBlockNumber: 9579260 },
      { chainId: 137, address: '0x885e77D0d1458d98Ac63C2883B05b1c7Fc559240', startBlockNumber: 21167099 },
      { chainId: 80001, address: '0x6077a28e287b0ee583ba8fbd8e3f41706a372888', startBlockNumber: 21210364 },
    ]
  },
  {
    setName: 'ReferralTokenRegistryV1',
    events: [
      'event ConfigChanged(bytes32 refHash, string key, bytes value)',
      'event AddressChanged(bytes32 indexed refHash, address indexed addr, string key, bytes value)',
    ],
    contracts: [
      { chainId: 1, address: '0xAB7c7f3F160289cf07c6D622B207c8ccF26F348e', startBlockNumber: 13582052 },
      { chainId: 4, address: '0xeb349bb7e307cffebd78b97469570ecaa36fa6af', startBlockNumber: 9579246 },
      { chainId: 137, address: '0x05DB037dBC1e197A31849eaE7baa9d55749049b5', startBlockNumber: 21167099 },
      { chainId: 80001, address: '0x4b73e3c8d8254321460af1237efc2be80b18abad', startBlockNumber: 21210233 },
    ]
  },
  {
    setName: 'NFTDropReferralContractV1',
    events: [
      'event ProgramCreated(bytes32 indexed refHash, address creator)',
      'event ProgramUpdated(bytes32 indexed refHash, string key, bytes value)',
      'event ProgramWithdrawn(bytes32 indexed refHash)'
    ],
    contracts: [
      { chainId: 4, address: '0x460b1322DE0046c01C80999B10d47Bc44680fed1', startBlockNumber: 9607267 },
      { chainId: 137, address: '0xdE359Ba3767c2763E9C1E1883E3D8cE00ce97770', startBlockNumber: 21167099 },
      { chainId: 80001, address: '0x55f8e2c8cb5e91127860c9729062c149a9b2b0ac', startBlockNumber: 21213539 },
    ]
  },
  {
    setName: 'ReferralContractRegistryV1',
    events: [
      'event ReferralContractRegistered(address indexed addr, bytes32 indexed version)',
    ],
    contracts: [
      { chainId: 1, address: '0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A', startBlockNumber: 12434965 },
      { chainId: 137, address: '0x0335DeFC8A1977b99488e0b5f5c6bc3D44fAcdD4', startBlockNumber: 16511305 },
    ]
  },
  {
    setName: 'ATTRToken',
    events: [
      'event TransferRuleConfigured(address addr, (uint16,uint16,uint96,uint40,uint16,uint16) rule)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'event Approval(address indexed owner, address indexed spender, uint256 value)',
    ],
    contracts: [
      { chainId: 1, address: '0x160d5f442E7d3899955Cf5adfC15Fce57c05ea78', startBlockNumber: 12914041 },
      { chainId: 137, address: '0x45cf5df9e67409279f635291c71dc76a370f4f69', startBlockNumber: 17898279 },
    ]
  },
];

function getEventIDsFromABI(abi: string[]): string[] {
  const iface = new ethers.utils.Interface(abi)
    
  const eventIDs :string[] = []
  for (const evName in iface.events) {
    if (Object.prototype.hasOwnProperty.call(iface.events, evName)) {
      eventIDs.push(ethers.utils.id(evName))
    }
  }
  return eventIDs
}