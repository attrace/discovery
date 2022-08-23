import { ethers } from 'ethers';

export interface TokenInfo {
  chainId: number;
  address: string;
  symbol: string;
  decimals: number;
  name: string;
  logoURI: string;
}

export function formatTokens(tokens: TokenInfo[]) : TokenInfo[] {
  return tokens.map(d => {
    return {
      ...d,
      address: ethers.utils.getAddress(d.address),
    }
  })
}

export function getTokens(): TokenInfo[] {
  return formatTokens(mainnet);
}

// Actual definitions without checks
const mainnet: TokenInfo[] = [
  // {
  //   "chainId": 1,
  //   "address": "0x6e9e3bFbd01904A5513BB2bFD0500127B3fba00B",
  //   "symbol": "ATTR (12m vest)",
  //   "decimals": 18,
  //   "name": "Attrace (12 months vested)",
  //   "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/attrace_logo_v2_256_12m.png"
  // },
  // {
  //   "chainId": 1,
  //   "address": "0xD502F487e1841Fdc805130e13eae80c61186Bc98",
  //   "symbol": "ITGR",
  //   "decimals": 18,
  //   "name": "Integral",
  //   "logoURI": "https://assets.website-files.com/6233333c48c5fd468770f97e/6239d4de389d9d22bd9fb8a0_icon.png",
  // },
  {
    "chainId": 1,
    "address": "0x65a8fbA02F641a13Bb7B01d5E1129b0521004f52",
    "symbol": "AMAS",
    "decimals": 18,
    "name": "Amasa",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/amasa_logo_128.png",
  },
  {
    "chainId": 1,
    "address": "0xc98d64da73a6616c42117b582e832812e7b8d57f",
    "symbol": "RSS3",
    "decimals": 18,
    "name": "RSS3",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/rss3_logo_128.png",
  },
  {
    "chainId": 1,
    "address": "0xf293d23BF2CDc05411Ca0edDD588eb1977e8dcd4",
    "symbol": "SYLO",
    "decimals": 18,
    "name": "Sylo",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/sylo_logo_128.png"
  }
];

