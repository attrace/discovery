import { EstimatedNodeLocation } from "./types";

// TODO resolve these from the networks when contracts are deployed
export interface WomOracleInfo {
  url: string;
  location: EstimatedNodeLocation; 
}

export async function getWomOracles(): Promise<WomOracleInfo[]> {
  return oracles.map(d => ({ ... d }));
}

// Actual definitions without checks
const oracles: WomOracleInfo[] = [
  { url: 'https://wom-oracle1.attrace.com', location: { lat: 53.3331, lon: -6.2489 } },
];
