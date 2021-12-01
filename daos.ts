import { ethers } from 'ethers';
import { NetworkContract } from './types';

export async function getDAOs(): Promise<NetworkContract[]> {
  return daos.map(d => {
    return {
      ...d,
      address: ethers.utils.getAddress(d.address),
    }
  })
}

// Actual definitions without checks
const daos: NetworkContract[] = [
  { chainId: 1, address: '0x8f86BaAbEc737Eb00449425025964Fc4dFbf1522', startBlockNumber: 12619823 },
  { chainId: 137, address: '0x0CD36BF14Fa1642Ebd8300b484E7fCa1052975c4', startBlockNumber: 17897741 },
  { chainId: 4, address: '0xeD155B74703a0EF9E7c6B4E62357e362f3968935', startBlockNumber: 8731982 },
  { chainId: 80001, address: '0x22E31747A31E82aD86c8C8E68646Cb55b31fc467', startBlockNumber: 17425384 },
];

