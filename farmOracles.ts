import { NetworkContract } from "./types";
import { ethers } from 'ethers';
import { getWomOracles, WomOracleInfo } from "./womOracles";

export interface FarmOracle {
  oracles: WomOracleInfo[];
  referralFarmsV1: NetworkContract[];
  confirmationsV1: NetworkContract[];
}

export async function getFarmOracles(): Promise<FarmOracle> {
  registries.referralFarmsV1 = validDateNetworkContract(registries.referralFarmsV1);
  registries.confirmationsV1 = validDateNetworkContract(registries.confirmationsV1);
  return registries;
}

export function validDateNetworkContract(contract: NetworkContract[]) {
  return contract.map(d => {
    return {
      ...d,
      address: ethers.utils.getAddress(d.address),
    }
  })
}

// Actual definitions without checks
const registries: FarmOracle =
{
  oracles: getWomOracles(),
  referralFarmsV1: [
    { chainId: 1, address: '0x77663b56A702eAde53DEd60EacF84Eb033A5Efb0' },
    { chainId: 4, address: '0x77663b56A702eAde53DEd60EacF84Eb033A5Efb0' },
  ],
  confirmationsV1: [
    { chainId: 1, address: '0xe562a0193464Db24acd9E3465313346224Cf29Ea' },
    { chainId: 4, address: '0xe562a0193464Db24acd9E3465313346224Cf29Ea' },
  ]
}
  

