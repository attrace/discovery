export interface EstimatedNodeLocation {
  lat: number;
  lon: number;
}

export interface IndexerInfo {
  url: string;
  location: EstimatedNodeLocation; 
}

export async function getIndexers(): Promise<IndexerInfo[]> {
  return indexers.map(d => ({ ... d }));
}

// Actual definitions without checks
const indexers: IndexerInfo[] = [
  { url: 'https://indexer.attrace.network', location: { lat: 53.3331, lon: -6.2489 } },
];
