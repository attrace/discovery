import { writeFile, rm, mkdirp } from 'fs-extra';
import { AirportInfo, getAirports } from './airports';
import { TokenRegistryInfo, getTokenRegistries } from './tokens';
import { getDAOs } from './daos';
import { getIndexers, IndexerInfo } from './indexers';
import { getATTRs } from './attrs';
import { NetworkContract } from './types';
import { getIndexedLogSets } from './indexedLogSets';

function toManifest(props: object): string {
  return JSON.stringify({ ...props, generatedAt: Date.now() });
}

async function main() {
  const daos = await getDAOs();
  const attrs = await getATTRs();
  const indexers = await getIndexers();
  const airports = await getAirports();
  const tokenRegistries = await getTokenRegistries();
  const indexedLogSets = await getIndexedLogSets();

  // Build
  const buildDir = `${__dirname}/build`;
  await rm(buildDir, { recursive: true, force: true });
  await mkdirp(buildDir);
  await writeFile(`${buildDir}/daos.json`, toManifest({ daos }));
  await writeFile(`${buildDir}/attrs.json`, toManifest({ attrs }));
  await writeFile(`${buildDir}/indexers.json`, toManifest({ indexers }));
  await writeFile(`${buildDir}/tokenRegistries.json`, toManifest({ tokenRegistries }));
  await writeFile(`${buildDir}/airports.json`, toManifest({ airports }));
  await writeFile(`${buildDir}/indexedLogSets.json`, toManifest({ indexedLogSets }));
  await writeFile(`${buildDir}/full.json`, toManifest({ daos , attrs, indexers, tokenRegistries, airports, indexedLogSets }));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})