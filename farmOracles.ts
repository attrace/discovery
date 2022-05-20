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
    { chainId: 1, address: '0x5c057Fd6830fCAecA2BC76A8FBFf9b03D274Ce13' },
    { chainId: 4, address: '0x5c057Fd6830fCAecA2BC76A8FBFf9b03D274Ce13' },
  ],
  confirmationsV1: [
    { chainId: 1, address: '0x1d7216020f8FF3Fb32C7AD96F583a6D7b65E985A' },
    { chainId: 4, address: '0x1d7216020f8FF3Fb32C7AD96F583a6D7b65E985A' },
  ]
}
  

