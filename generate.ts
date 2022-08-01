import { writeFile, rm, mkdirp } from 'fs-extra';
import { getAirports } from './airports';
import { getIndexers, IndexerInfo } from './indexers';
import { getIndexedLogSets } from './indexedLogSets';
import { getFarmOracles } from './farmOracles';
import { getTokens } from './tokens';
import { getATTRs } from './attrs';
import { getChains } from './chains';
import path from 'path';
import { getTokenLists } from './tokenLists';
import { getTokensByChain } from './tokensByChain';

function toManifest(props: object): string {
  return JSON.stringify({ ...props, generatedAt: Date.now() });
}

async function main() {
  const attrs = await getATTRs();
  const farmOracles = await getFarmOracles();
  const tokens = await getTokens();
  const indexers = await getIndexers();
  const indexedLogSets = await getIndexedLogSets();
  const airports = await getAirports();
  const chains = await getChains();
  const tokenLists = await getTokenLists();
  const tokensByChain = getTokensByChain();

  // Build
  const buildDir = `${__dirname}/build`;
  await rm(buildDir, { recursive: true, force: true });
  await mkdirp(buildDir);
  await writeFile(`${buildDir}/attrs.json`, toManifest({ attrs }));

  // Write chains + separate file per chain
  await writeFile(`${buildDir}/chains.json`, toManifest({ chains }));
  const chainsPath = path.join(buildDir, 'chains');
  await mkdirp(chainsPath);
  for(let [chainId, chainInfo] of Object.entries(chains)) {
    await writeFile(`${chainsPath}/${chainId}.json`, toManifest({ chainInfo }));
  }
  await writeFile(`${buildDir}/tokens.json`, toManifest({ tokens }));
  await writeFile(`${buildDir}/tokenLists.json`, toManifest({ tokenLists }));
  const tokensPath = path.join(buildDir, 'tokens');
  await mkdirp(tokensPath);
  for(let [chainId, tokens] of Object.entries(tokensByChain)) {
    await writeFile(`${tokensPath}/${chainId}.json`, toManifest({ tokens }));
  }
  await writeFile(`${buildDir}/airports.json`, toManifest({ airports }));
  
  // DEPRECATED
  await writeFile(`${buildDir}/farmOracles.json`, toManifest({ deprecated: true, farmOracles }));
  await writeFile(`${buildDir}/indexers.json`, toManifest({ deprecated: true, indexers }));
  await writeFile(`${buildDir}/indexedLogSets.json`, toManifest({ deprecated: true, indexedLogSets }));

  await writeFile(`${buildDir}/full.json`, toManifest({ 
    attrs,
    chains,
    tokens,
    tokenLists,
    airports, 

    // BELOW DEPRECATED
    farmOracles, 
    indexers, 
    indexedLogSets, 
  }));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})