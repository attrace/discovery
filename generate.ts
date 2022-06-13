import { writeFile, rm, mkdirp } from 'fs-extra';
import { getAirports } from './airports';
import { getTokenRegistries } from './tokenRegistries';
import { getDAOs } from './daos';
import { getIndexers, IndexerInfo } from './indexers';
import { getATTRs } from './attrs';
import { getIndexedLogSets } from './indexedLogSets';
import { getWomOracles } from './womOracles';
import { getFarmOracles } from './farmOracles';
import { getTokens } from './tokens';

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
  const farmOracles = await getFarmOracles();
  const tokens = await getTokens();

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
  await writeFile(`${buildDir}/farmOracles.json`, toManifest({ farmOracles }));
  await writeFile(`${buildDir}/tokens.json`, toManifest({ tokens }));
  await writeFile(`${buildDir}/tokenRegistries.json`, toManifest({ tokenRegistries })); // Deprecated
  await writeFile(`${buildDir}/full.json`, toManifest({ daos, attrs, indexers, womOracles, airports, indexedLogSets, tokenRegistries }));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})