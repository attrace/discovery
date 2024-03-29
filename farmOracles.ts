import { ethers } from "ethers";
import { EstimatedNodeLocation, NetworkContract } from "./types";

// DEPRECATED, use the one in oracles.ts instead for imports
export interface OracleInfo {
  chainId: number;
  url: string;
  location: EstimatedNodeLocation;
}

// DEPRECATED
export interface FarmOracleInfo {
  oracles: OracleInfo[];
  referralFarmsV1: NetworkContract[];
  confirmationsV1: NetworkContract[];
}

export async function getFarmOracles(): Promise<FarmOracleInfo> {
  registries.referralFarmsV1 = validDateNetworkContract(
    registries.referralFarmsV1
  );
  registries.confirmationsV1 = validDateNetworkContract(
    registries.confirmationsV1
  );
  return registries;
}

export function validDateNetworkContract(contract: NetworkContract[]) {
  return contract.map((d) => {
    return {
      ...d,
      address: ethers.utils.getAddress(d.address),
    };
  });
}

// Actual definitions without checks
const registries: FarmOracleInfo = {
  oracles: [
    {
      chainId: 147,
      url: "https://oracle-147-dub.attrace.com",
      location: {
        lat: 53.3331,
        lon: -6.2489,
      },
    },
    // {
    //   chainId: 4470,
    //   url: "https://oracle-4470-dub.attrace.com",
    //   location: {
    //     lat: 50.1109,
    //     lon: 8.6821,
    //   },
    // },
    {
      chainId: 5470,
      url: "https://oracle-5470-dub.attrace.com",
      location: {
        lat: 50.1109,
        lon: 8.6821,
      },
    },
  ],
  referralFarmsV1: [
    { chainId: 1, address: '0xC1F04af99fc53DD3b74615AB47D8825EB98B7943' },
    // { chainId: 4, address: "0x0c050289cBD8E3c9dcd084c5769732C2cEdbB9e9" },
    { chainId: 5, address: "0x1e1885389b229b036460e2191fbdf0290Bd2baE9" },
  ],
  confirmationsV1: [
    { chainId: 1, address: '0x3BdE25d3Ca9b0B08f183D52448aFCF8E3E772BEe' },
    // { chainId: 4, address: "0xb3B6E8e115F2E755b4452AE2d58f8216344eFC1a" },
    { chainId: 5, address: "0xEE6dF5Bdc3C472401B6DA7ededE1D034a9848ab7" },
  ],
};
