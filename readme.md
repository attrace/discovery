<h1 align="center">
  <br>
  <a href="https://attrace.com"><img src="https://raw.githubusercontent.com/attrace/assets/4c41155194ca864beda3d0fb5908579ea14e2e8a/images/attrace_logo_v2_256.png" alt="Attrace logo" width="250"></a>
  <br>
  Attrace discovery and routing artifacts.
  <br>
</h1>

## Usable artifacts

Last published manifests can be found on https://discovery.attrace.com/mainnet/*

-  [attrs.json](https://discovery.attrace.com/mainnet/attrs.json)
-  [farmOracles.json](https://discovery.attrace.com/mainnet/farmOracles.json)
-  [tokens.json](https://discovery.attrace.com/mainnet/tokens.json)
-  [indexers.json](https://discovery.attrace.com/mainnet/indexers.json)
-  [indexedLogSets.json](https://discovery.attrace.com/mainnet/indexedLogSets.json)
-  [airports.json](https://discovery.attrace.com/mainnet/airports.json)

Special full file which contains everything in 1 file (to limit to 1 request if multiple are needed):
-  [full.json](https://discovery.attrace.com/mainnet/full.json)

## Usage mindset for indexers and oracles.

These manifests provide node discovery hints without any uptime guarantees.   
The nodes are "most likely" up, but they might be unreachable due to netsplit/load/maintenance/attacks/...   
It's up to caller to fallback to other nodes when nodes are unreachable.

Only when nodes are really shut down and decommissioned, they are removed from the manifests.

## Fast node selection
The CDN discovery.attrace.com provides `x-amz-cf-pop` response header for fast node selection.   
See [./exampleSelection.js](./exampleSelection.js) for more info how to use the response header and select the fastest node.

## Build

```
yarn build
```

## Build & publish

```
yarn build

open "https://s3.console.aws.amazon.com/s3/upload/discovery.attrace.com?region=eu-central-1&prefix=mainnet/"
# click "Add files"
# select manifest/* files
# click permissions
# click "Grant public-read access"
# mark "I understand ..."
# click upload

open "https://console.aws.amazon.com/cloudfront/v3/home?region=eu-central-1#/distributions/EH8VM5LDKTDOF/invalidations/create"
# enter `/*` in the object path
# click "Create invalidation"

# Commit changes to github `mainnet` branch as well to keep everything in sync
```
