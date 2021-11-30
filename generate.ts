import { writeFile, rm, mkdirp } from 'fs-extra';
import { AirportInfo, getAirports } from './airports';
import { DAOInfo, getDAOs } from './daos';
import { getIndexers, IndexerInfo } from './indexers';

interface Manifest {
  daos: DAOInfo[] | null;
  indexers: IndexerInfo[] | null;
  airports: AirportInfo[] | null;
  generatedAt: number;
}

function toManifest(daos?:DAOInfo[], indexers?: IndexerInfo[], airports?:AirportInfo[]): string {
  return JSON.stringify({ daos, indexers, airports, generatedAt: Date.now() });
}

async function main() {
  const daos = await getDAOs();
  const indexers = await getIndexers();
  const airports = await getAirports();

  // Build
  const buildDir = `${__dirname}/build`;
  await rm(buildDir, { recursive: true, force: true });
  await mkdirp(buildDir);
  await writeFile(`${buildDir}/daos.json`, toManifest(daos));
  await writeFile(`${buildDir}/indexers.json`, toManifest(undefined, indexers));
  await writeFile(`${buildDir}/airports.json`, toManifest(undefined, undefined, airports));
  await writeFile(`${buildDir}/full.json`, toManifest(daos, indexers, airports));
}
main()
.catch(err => {
  console.trace(err);
  process.exit(1);
})