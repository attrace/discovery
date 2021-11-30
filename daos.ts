import { ethers } from 'ethers';

export interface DAOInfo {
  chainId: number;
  addr: string;
  initBlockNumber: number;
}

export async function getDAOs(): Promise<DAOInfo[]> {
  return daos.map(d => {
    return {
      ...d,
      addr: ethers.utils.getAddress(d.addr),
    }
  })
}

// Actual definitions without checks
const daos: DAOInfo[] = [
  { chainId: 1, addr: '0x8f86BaAbEc737Eb00449425025964Fc4dFbf1522', initBlockNumber: 12619823 },
  { chainId: 137, addr: '0x0CD36BF14Fa1642Ebd8300b484E7fCa1052975c4', initBlockNumber: 17897741 },
  { chainId: 4, addr: '0xeD155B74703a0EF9E7c6B4E62357e362f3968935', initBlockNumber: 8731982 },
  { chainId: 80001, addr: '0x22E31747A31E82aD86c8C8E68646Cb55b31fc467', initBlockNumber: 17425384 },
];

