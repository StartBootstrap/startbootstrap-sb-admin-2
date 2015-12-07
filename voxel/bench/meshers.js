var meshers = require('../').meshers
  , generators = require('../').generator
  , microtime = require('microtime')
  , times = {}

var chunkSize = 32
  , iterations = 10

Object.keys(meshers).forEach(function(mesherName) {
  var mesher = meshers[mesherName]
    , meshTimes = times[mesherName] = {}

  process.stdout.write('benchmarking ' + mesherName)

  Object.keys(generators).forEach(function(generatorName) {
    var generator = generators[generatorName]
      , array = new Int8Array(4096)
      , n = 0

    for (var x = 0; x < chunkSize; x += 1)
      for (var y = 0; y < chunkSize; y += 1)
        for (var z = 0; z < chunkSize; z += 1, n += 1)
          array[n] = generator(x, y, z) || 0

    var start = microtime.now()
    for (var i = 0; i < iterations; i += 1) mesher(array, [chunkSize, chunkSize, chunkSize])
    meshTimes[generatorName] = microtime.now() - start

    process.stdout.write('.')
  })

  process.stdout.write('\n')
})

function limit(n) {
  return (n + '').slice(0, 6)
}

console.log('\nResults:')
Object.keys(times).forEach(function(mesher) {
  var meshTimes = times[mesher]
    , meshKeys = Object.keys(meshTimes)
    , meshTotal = meshKeys.reduce(function(n, k) { return meshTimes[k] + n }, 0)

  console.log('└─ ' + mesher + ': ' + limit(meshTotal / 1000 / iterations) + 'ms')

  meshKeys.sort(function(a, b) {
    return meshTimes[a] - meshTimes[b]
  }).forEach(function(key) {
    console.log('  └─ ' + key + ': ' + limit(meshTimes[key] / 1000 / iterations) + 'ms')
  })
})