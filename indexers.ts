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
  { url: 'https://indexer-jfk.attrace.com', location: { lat: 40.639801, lon: -73.7789 } },
  { url: 'https://indexer-sin.attrace.com', location: { lat: 1.35019, lon: 103.994003 } },
];