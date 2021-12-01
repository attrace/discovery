import { writeFile, rm, mkdirp } from 'fs-extra';
import { AirportInfo, getAirports } from './airports';
import { TokenRegistryInfo, getTokenRegistries } from './tokens';
import { DAOInfo, getDAOs } from './daos';
import { getIndexers, IndexerInfo } from './indexers';
import { ATTRInfo, getATTRs } from './attrs';

interface Manifest {
  daos: DAOInfo[] | null;
  indexers: IndexerInfo[] | null;
  airports: AirportInfo[] | null;
  generatedAt: number;
}

function toManifest(
  daos?:DAOInfo[], 
  attrs?:ATTRInfo[],
  indexers?: IndexerInfo[], 
  tokenRegistries?: TokenRegistryInfo[], 
  airports?:AirportInfo[]): string {
  return JSON.stringify({ daos, attrs, indexers, tokenRegistries, airports, generatedAt: Date.now() });
}

async function main() {
  const daos = await getDAOs();
  const attrs = await getATTRs();
  const indexers = await getIndexers();
  const airports = await getAirports();
  const tokenRegistries = await getTokenRegistries();

  // Build
  const buildDir = `${__dirname}/build`;
  await rm(buildDir, { recursive: true, force: true });
  await mkdirp(buildDir);
  await writeFile(`${buildDir}/daos.json`, toManifest(daos));
  await writeFile(`${buildDir}/attrs.json`, toManifest(undefined, attrs));
  await writeFile(`${buildDir}/indexers.json`, toManifest(undefined, undefined, indexers));
  await writeFile(`${buildDir}/tokenRegistries.json`, toManifest(undefined, undefined, undefined, tokenRegistries));
  await writeFile(`${buildDir}/airports.json`, toManifest(undefined, undefined, undefined, undefined, airports));
  await writeFile(`${buildDir}/full.json`, toManifest(daos, attrs, indexers, tokenRegistries, airports));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})