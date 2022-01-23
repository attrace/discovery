import { writeFile, rm, mkdirp } from 'fs-extra';
import { AirportInfo, getAirports } from './airports';
import { TokenRegistryInfo, getTokenRegistries } from './tokens';
import { getDAOs } from './daos';
import { getIndexers, IndexerInfo } from './indexers';
import { getATTRs } from './attrs';
import { NetworkContract } from './types';
import { getIndexedLogSets } from './indexedLogSets';
import { getWomOracles } from './womOracles';

function toManifest(props: object): string {
  return JSON.stringify({ ...props, generatedAt: Date.now() });
}

async function main() {
  const daos = await getDAOs();
  const attrs = await getATTRs();
  const indexers = await getIndexers();
  const airports = await getAirports();
  const womOracles = await getWomOracles();
  const indexedLogSets = await getIndexedLogSets();

  // DEPRECATED
  const tokenRegistries = await getTokenRegistries();

  // Build
  const buildDir = `${__dirname}/build`;
  await rm(buildDir, { recursive: true, force: true });
  await mkdirp(buildDir);
  await writeFile(`${buildDir}/daos.json`, toManifest({ daos }));
  await writeFile(`${buildDir}/attrs.json`, toManifest({ attrs }));
  await writeFile(`${buildDir}/indexers.json`, toManifest({ indexers }));
  await writeFile(`${buildDir}/airports.json`, toManifest({ airports }));
  await writeFile(`${buildDir}/indexedLogSets.json`, toManifest({ indexedLogSets }));
  await writeFile(`${buildDir}/womOracles.json`, toManifest({ womOracles }));
  await writeFile(`${buildDir}/tokenRegistries.json`, toManifest({ tokenRegistries })); // Deprecated
  await writeFile(`${buildDir}/full.json`, toManifest({ daos, attrs, indexers, womOracles, airports, indexedLogSets, tokenRegistries }));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})