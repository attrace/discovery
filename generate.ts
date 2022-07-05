import { writeFile, rm, mkdirp } from 'fs-extra';
import { getAirports } from './airports';
import { getIndexers, IndexerInfo } from './indexers';
import { getIndexedLogSets } from './indexedLogSets';
import { getFarmOracles } from './farmOracles';
import { getTokens } from './tokens';
import { getATTRs } from './attrs';

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

  // Build
  const buildDir = `${__dirname}/build`;
  await rm(buildDir, { recursive: true, force: true });
  await mkdirp(buildDir);
  await writeFile(`${buildDir}/attrs.json`, toManifest({ attrs }));
  await writeFile(`${buildDir}/farmOracles.json`, toManifest({ farmOracles }));
  await writeFile(`${buildDir}/tokens.json`, toManifest({ tokens }));
  await writeFile(`${buildDir}/indexers.json`, toManifest({ indexers }));
  await writeFile(`${buildDir}/indexedLogSets.json`, toManifest({ indexedLogSets }));
  await writeFile(`${buildDir}/airports.json`, toManifest({ airports }));
  await writeFile(`${buildDir}/full.json`, toManifest({ 
    attrs,
    farmOracles, 
    tokens,
    indexers, 
    indexedLogSets, 
    airports, 
  }));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})