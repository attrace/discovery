import { ethers } from 'ethers';

export interface TokenInfo {
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
}

export async function getTokens(): Promise<TokenInfo[]> {
  return tokens.map(d => {
    return {
      ...d,
      address: ethers.utils.getAddress(d.address),
    }
  })
}

// Actual definitions without checks
const tokens: TokenInfo[] = [
  {
    "chainId": 1,
    "address": "0x6e9e3bFbd01904A5513BB2bFD0500127B3fba00B",
    "symbol": "ATTR (12m vest)",
    "decimals": 18,
    "name": "Attrace (12 months vested)",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/attrace_logo_v2_256_12m.png"
  },
];

