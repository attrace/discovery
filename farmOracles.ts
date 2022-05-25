import { NetworkContract } from "./types";
import { ethers } from 'ethers';
import { EstimatedNodeLocation } from "./types";


export interface OracleInfo {
  chainId: number;
  url: string;
  location: EstimatedNodeLocation;
}

export interface FarmOracleInfo {
  oracles: OracleInfo[];
  referralFarmsV1: NetworkContract[];
  confirmationsV1: NetworkContract[];
}

export async function getFarmOracles(): Promise<FarmOracleInfo> {
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
const registries: FarmOracleInfo =
{
  oracles: [
    {
      chainId: 1,
      url: 'https://oracle-147-dub.attrace.com/',
      location: {
        lat: 53.3331,
        lon: -6.2489
      }
    },
    {
      chainId: 4,
      url: 'https://oracle-4470-dub.attrace.com',
      location: {
        lat: 50.1109,
        lon: 8.6821
      }
    },
  ],
  referralFarmsV1: [
    { chainId: 1, address: '0x77663b56A702eAde53DEd60EacF84Eb033A5Efb0' },
    { chainId: 4, address: '0x77663b56A702eAde53DEd60EacF84Eb033A5Efb0' },
  ],
  confirmationsV1: [
    { chainId: 1, address: '0xe562a0193464Db24acd9E3465313346224Cf29Ea' },
    { chainId: 4, address: '0xe562a0193464Db24acd9E3465313346224Cf29Ea' },
  ]
}


