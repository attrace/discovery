import { ethers } from "ethers";
import { EstimatedNodeLocation, NetworkContract } from "./types";

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
    {
      chainId: 4470,
      url: "https://oracle-4470-dub.attrace.com",
      location: {
        lat: 50.1109,
        lon: 8.6821,
      },
    },
  ],
  referralFarmsV1: [
    { chainId: 1, address: '0x8c023280ebcec221c394b7e6a1c245d159f8b376' },
    { chainId: 4, address: "0x001EF9Fc14fAbB04cB5D2406791f6C830d63AE13" },
  ],
  confirmationsV1: [
    { chainId: 1, address: '0x3BdE25d3Ca9b0B08f183D52448aFCF8E3E772BEe' },
    { chainId: 4, address: "0x44b370Ab16050539987934DB91490BA4CCC7587c" },
  ],
};
