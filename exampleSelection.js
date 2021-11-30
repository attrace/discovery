// Dependency-less example in vanilla JS

var toRad = function(num) {
  return num * Math.PI / 180
}

function haversine(start, end) {
  var R = 6371

  var dLat = toRad(end.lat - start.lat)
  var dLon = toRad(end.lon - start.lon)
  var lat1 = toRad(start.lat)
  var lat2 = toRad(end.lat)

  var a = Math.sin(dLat/2) * Math.sin(dL  at/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  return R * c
}

// pop = the x-amz-cf-pop response header from discovery.attrace.com
function selectNearestNode(nodes, airports, pop) {
  const iata = pop.substr(0,3)
  let popc = airports.find(ap => ap.iata === iata)
  if(popc) {
      let nearest;
      for(let i in nodes) {
          const n = nodes[i];
          if(!n.location || !n.location.lat || !n.location.lon) {
              continue;
          }
          const d = haversine(popc, n.location);
          if(!nearest || d < nearest.d) {
              nearest = { d, n }
          }
      }
      if(nearest) {
          return nearest.n;
      }
  }
  
  // No nearest found, it's up to the caller to implement another node selection strategy.
  return null;
}


// Example usage
const { airports, indexers } = JSON.parse(require('fs').readFileSync('./build/full.json'));
console.log(selectNearestNode(indexers, airports, 'CDG50-P1'));