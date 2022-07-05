import { writeFile, rm, mkdirp } from 'fs-extra';
import { getAirports } from './airports';
import { getIndexers, IndexerInfo } from './indexers';
import { getIndexedLogSets } from './indexedLogSets';
import { getFarmOracles } from './farmOracles';
import { getTokens } from './tokens';

function toManifest(props: object): string {
  return JSON.stringify({ ...props, generatedAt: Date.now() });
}

async function main() {
  const indexers = await getIndexers();
  const airports = await getAirports();
  const indexedLogSets = await getIndexedLogSets();
  const farmOracles = await getFarmOracles();
  const tokens = await getTokens();

  // Build
  const buildDir = `${__dirname}/build`;
  await rm(buildDir, { recursive: true, force: true });
  await mkdirp(buildDir);
  await writeFile(`${buildDir}/indexers.json`, toManifest({ indexers }));
  await writeFile(`${buildDir}/airports.json`, toManifest({ airports }));
  await writeFile(`${buildDir}/indexedLogSets.json`, toManifest({ indexedLogSets }));
  await writeFile(`${buildDir}/farmOracles.json`, toManifest({ farmOracles }));
  await writeFile(`${buildDir}/tokens.json`, toManifest({ tokens }));
  await writeFile(`${buildDir}/full.json`, toManifest({ 
    indexers, 
    airports, 
    indexedLogSets, 
    farmOracles, 
    tokens,
  }));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})