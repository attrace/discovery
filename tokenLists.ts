type ChainId = string;

interface TokenListItem {
  // Human readable description what partner the list originates from
  origin: string;

  // The URL to resolve which implements the `{ tokens: TokenInfo[] }` structure. TokenInfo can be found in tokens.ts.
  url: string;
}

/**
 * Get urls of token lists officially supported by the Attrace DAO. It's the list app.attrace.com uses as well.
 * 
 * @returns a list of urls which can be crawled to create a combined list of tokens.
 */
export async function getTokenLists() : Promise<Record<ChainId, TokenListItem[]>> {
  return {
    "1": [
      { 
        origin: "Mask",
        url: "https://tokens.r2d2.to/latest/1/tokens.json" 
      }, 
      { 
        origin: "Attrace",
        url: "https://discovery.attrace.com/tokens.json" 
      },
    ],

    "4": [
      {
        origin: "Mask", 
        url: "https://tokens.r2d2.to/latest/4/tokens.json"
      }
    ],

    "5": [
      {
        origin: "Attrace", 
        url: "https://discovery.attrace.com/tokens/5.json"
      }
    ],
  }
}