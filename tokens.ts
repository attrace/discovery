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
  },
  {
    "chainId": 1,
    "address": "0x949D48EcA67b17269629c7194F4b727d4Ef9E5d6",
    "symbol": "MC",
    "decimals": 18,
    "name": "Merit Circle",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/mc_logo_128.png"
  },
  {
    "chainId": 1,
    "address": "0xf4d2888d29D722226FafA5d9B24F9164c092421E",
    "symbol": "LOOKS",
    "decimals": 18,
    "name": "LooksRare",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/looks_logo_128.png"
  },
  {
    "chainId": 1,
    "address": "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
    "symbol": "OCEAN",
    "decimals": 18,
    "name": "Ocean Token",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/ocean_logo_128.png"
  },
  {
    "chainId": 1,
    "address": "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    "symbol": "SUSHI",
    "decimals": 18,
    "name": "SushiToken",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/sushi_logo_128.png"
  },
  {
    "chainId": 1,
    "address": "0x2c022e58c5e3ee213f06f975fd8a0d3a6fe9ca1c",
    "symbol": "FINU",
    "decimals": 18,
    "name": "Formula Inu",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/finu_logo_128.png"
  },
  {
    "chainId": 1,
    "address": "0x0C22604A72485143A41E6026CDa757389335A09b",
    "symbol": "STF",
    "decimals": 9,
    "name": "Seventhythree Trade Fund",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/seventhythree_logo_128.png"
  },
  {
    "chainId": 1,
    "address": "0x44e2deC86B9F0e0266E9AA66e10323A2bd69CF9A",
    "symbol": "ATTR",
    "decimals": 18,
    "name": "Attrace",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/attr_logo_128.png"
  },
  {
    "chainId": 1,
    "address": "0x765af00f9278Ab696E815ffA2d0529CdeBD4E10A",
    "symbol": "BSKR",
    "decimals": 18,
    "name": "BSKR - pulselorian.com",
    "logoURI": "https://raw.githubusercontent.com/attrace/assets/main/images/tokenLogos/bskr_logo_128.png"
  }
];

