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
    "address": "0x085209C2f2B5575553Def689E1bF46Ba582C3B79",
    "symbol": "ATTR (12m vest)",
    "decimals": 18,
    "name": "Attrace (12 months vested)",
    "logoURI": "https://static.debank.com/image/eth_token/logo_url/0x44e2dec86b9f0e0266e9aa66e10323a2bd69cf9a/146d727c983ae469069e99c3b2d4a85c.png"
  },
];

