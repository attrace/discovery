# Discovery

Discovery and routing artifacts.

## Usable artifacts

Last published manifests can be found on https://discovery.attrace.com/mainnet/*

-  [daos.json](https://discovery.attrace.com/mainnet/daos.json)
-  [attrs.json](https://discovery.attrace.com/mainnet/attrs.json)
-  [indexers.json](https://discovery.attrace.com/mainnet/indexers.json)
-  [tokenRegistries.json](https://discovery.attrace.com/mainnet/tokenRegistries.json)
-  [airports.json](https://discovery.attrace.com/mainnet/airports.json)
-  [full.json](https://discovery.attrace.com/mainnet/full.json)

## Usage mindset

These manifests provide discovery hints without any uptime guarantees.   
The nodes are "most likely" up, but they might be unreachable due to netsplit/load/maintenance/attacks/...   
It's up to caller to fallback to other nodes when nodes are unreachable.

When nodes are really shut down, they are removed from the manifests.

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