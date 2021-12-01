export interface EstimatedNodeLocation {
  lat: number;
  lon: number;
}

export interface NetworkContract {
  chainId: number;
  address: string;
  startBlockNumber?: number;
}