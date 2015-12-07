var test = require('tape')
var voxel = require('./')

test('create', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  t.equal(!!chunker, true)
  t.end()
})

test('chunkAtCoordinates', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  t.deepEqual(chunker.chunkAtCoordinates(0, 0, 0), [0, 0, 0])
  t.deepEqual(chunker.chunkAtCoordinates(31, 0, 0), [0, 0, 0])
  t.deepEqual(chunker.chunkAtCoordinates(32, 0, 0), [1, 0, 0])
  t.deepEqual(chunker.chunkAtCoordinates(63, 0, 0), [1, 0, 0])
  t.deepEqual(chunker.chunkAtCoordinates(-1, 0, 0), [-1, 0, 0])
  t.deepEqual(chunker.chunkAtCoordinates(-32, 0, 0), [-1, 0, 0])
  t.deepEqual(chunker.chunkAtCoordinates(-33, 0, 0), [-2, 0, 0])
  t.deepEqual(chunker.chunkAtCoordinates(-64, 0, 0), [-2, 0, 0])
  t.end()
})

test('chunkAtPosition', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  t.deepEqual(chunker.chunkAtPosition([0, 0, 0]), [0, 0, 0])
  t.deepEqual(chunker.chunkAtPosition([0.9999, 0, 0]), [0, 0, 0])
  t.deepEqual(chunker.chunkAtPosition([31.9999, 0, 0]), [0, 0, 0])
  t.deepEqual(chunker.chunkAtPosition([32, 0, 0]), [1, 0, 0])
  t.deepEqual(chunker.chunkAtPosition([-0.0001, 0, 0]), [-1, 0, 0])
  t.deepEqual(chunker.chunkAtPosition([-32, 0, 0]), [-1, 0, 0])
  t.deepEqual(chunker.chunkAtPosition([-32.0001, 0, 0]), [-2, 0, 0])
  t.end()
})

test('getBounds', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  t.deepEqual(chunker.getBounds(0, 0, 0), [[0, 0, 0], [32, 32, 32]])
  t.deepEqual(chunker.getBounds(1, 0, 0), [[32, 0, 0], [64, 32, 32]])
  t.deepEqual(chunker.getBounds(-1, 0, 0), [[-32, 0, 0], [0, 32, 32]])
  t.end()
})

test('nearbyChunks', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  t.deepEqual(chunker.nearbyChunks([0, 0, 0], 1), [[-1, -1, -1], [-1, -1, 0], [-1, 0, -1], [-1, 0, 0], [0, -1, -1], [0, -1, 0], [0, 0, -1], [0, 0, 0]])
  t.end()
})

test('generateChunk', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  chunker.generateChunk(0, 0, 0)
  t.equal(!!chunker.chunks['0|0|0'], true)
  chunker.generateChunk(1, 0, 0)
  t.equal(!!chunker.chunks['1|0|0'], true)
  chunker.generateChunk(-1, 0, 0)
  t.equal(!!chunker.chunks['-1|0|0'], true)
  t.end()
})

test('requestMissingChunks', function (t) {
  var chunker = voxel({chunkDistance: 1, chunkSize: 32, cubeSize: 1}) // note: chunkDistance
  chunker.generateChunk(0, 0, 0)
  chunker.generateChunk(1, 0, 0)
  chunker.generateChunk(-1, 0, 0)
  var missing = []
  chunker.on('missingChunk', function (pos) {
    missing.push(pos)
  })
  chunker.requestMissingChunks([0, 0, 0])
  t.deepEqual(missing, [[-1, -1, -1], [-1, -1, 0], [-1, 0, -1], [0, -1, -1], [0, -1, 0], [0, 0, -1]])
  t.end()
})

test('voxelAtCoordinates', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  chunker.generateChunk(0, 0, 0)
  t.equal(chunker.voxelAtCoordinates(0, 16, 0), 0)
  t.equal(chunker.voxelAtCoordinates(0, 16, 0, 1), 0)
  t.equal(chunker.voxelAtCoordinates(0, 16, 0), 1)
  t.equal(chunker.voxelAtCoordinates(0, 16, 0, 0), 1)
  t.equal(chunker.voxelAtCoordinates(0, 16, 0), 0)
  t.equal(chunker.voxelAtCoordinates(-1, 0, 0), false)
  t.equal(chunker.voxelAtCoordinates(-1, 0, 0, 1), false)
  t.equal(chunker.voxelAtCoordinates(-1, 0, 0), false)
  t.end()
})

test('voxelAtPosition', function (t) {
  var chunker = voxel({chunkDistance: 2, chunkSize: 32, cubeSize: 1})
  chunker.generateChunk(0, 0, 0)
  t.equal(chunker.voxelAtPosition([0, 16, 0], 1), 0)
  t.equal(chunker.voxelAtPosition([0, 16.9999, 0]), 1)
  t.end()
})
