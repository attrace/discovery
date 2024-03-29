import { ethers } from 'ethers';
import { formatTokens, TokenInfo, getTokens } from './tokens';

export function getTokensByChain(): Record<string, TokenInfo[]> {
  const mainnet = getTokens();
  return {
    '1': formatTokens(mainnet),
    '4': [],
    '5': formatTokens(goerli0),
  }
}

// Actual definitions without checks
const goerli0: TokenInfo[] = [
  {
    "chainId": 5,
    "address": "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
    "symbol": "WETH",
    "decimals": 18,
    "name": "Wrapped Ether",
    "logoURI": "https://static.debank.com/image/eth_token/logo_url/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/61844453e63cf81301f845d7864236f6.png"
  },
  {
    "chainId": 5,
    "address": "0x926362b451A012F72b34240F36C3bDc163d462e0",
    "symbol": "TATTR",
    "decimals": 18,
    "name": "Test ATTR",
    "logoURI": "https://static.debank.com/image/eth_token/logo_url/0x44e2dec86b9f0e0266e9aa66e10323a2bd69cf9a/146d727c983ae469069e99c3b2d4a85c.png",
  },
  {
    "chainId": 5,
    "address": "0xD8eB5b414e1b5485148E063ee64A5cA5c968D1FB",
    "symbol": "TTTT2",
    "decimals": 18,
    "name": "TestToken2",
    "logoURI": "https://goerli.etherscan.io/images/main/empty-token.png",
  },
  {
    "chainId": 5,
    "address": "0x70D2Ecf459724F6Eb580961519BA3CF80bBf27E0",
    "symbol": "MXV4",
    "decimals": 18,
    "name": "MXV4",
    "logoURI": "https://goerli.etherscan.io/images/main/empty-token.png",
  },
];

