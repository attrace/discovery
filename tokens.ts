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
  {
    "chainId": 1,
    "address": "0xD502F487e1841Fdc805130e13eae80c61186Bc98",
    "symbol": "ITGR",
    "decimals": 18,
    "name": "Integral",
    "logoURI": "https://assets.website-files.com/6233333c48c5fd468770f97e/6239d4de389d9d22bd9fb8a0_icon.png",
  },
];

