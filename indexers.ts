import { EstimatedNodeLocation } from "./types";

export interface IndexerInfo {
  url: string;
  location: EstimatedNodeLocation; 
}

export async function getIndexers(): Promise<IndexerInfo[]> {
  return indexers.map(d => ({ ... d }));
}

// Actual definitions without checks
const indexers: IndexerInfo[] = [
  { url: 'https://indexer.attrace.com', location: { lat: 53.3331, lon: -6.2489 } },
];
