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
    eventIds: d.events.map(e => ethers.utils.id(e)),
  }));
}

// Actual definitions without checks
const rows: BaseIndexedLogSet[] = [
  {
    setName: 'DAOStateV1',
    events: [
      'AddressChanged(string,address,address)',
      'VerifierSettingsChanged(address,uint96,uint96,uint24)', // Can be ignored
    ],
    contracts: [
      { chainId: 1, address: '0x8f86BaAbEc737Eb00449425025964Fc4dFbf1522', startBlockNumber: 12619823 },
      { chainId: 4, address: '0xeD155B74703a0EF9E7c6B4E62357e362f3968935', startBlockNumber: 8731982 },
      { chainId: 137, address: '0x0CD36BF14Fa1642Ebd8300b484E7fCa1052975c4', startBlockNumber: 17897741 },
      { chainId: 80001, address: '0x22E31747A31E82aD86c8C8E68646Cb55b31fc467', startBlockNumber: 17425384 },
    ]
  }
];
