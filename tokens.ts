import { EstimatedNodeLocation } from "./types";

// TODO resolve these from the networks when contracts are deployed
export interface TokenRegistryInfo {
  url: string;
  location: EstimatedNodeLocation; 
}

export async function getTokenRegistries(): Promise<TokenRegistryInfo[]> {
  return registries.map(d => ({ ... d }));
}

// Actual definitions without checks
const registries: TokenRegistryInfo[] = [
  { url: 'https://bountytokens.attrace.com', location: { lat: 53.3331, lon: -6.2489 } },
];
