var GreedyMesh = (function() {
//Cache buffer internally
var mask = new Int32Array(4096);

return function(volume, dims) {
  var vertices = [], faces = []
    , dimsX = dims[0]
    , dimsY = dims[1]
    , dimsXY = dimsX * dimsY;

  //Sweep over 3-axes
  for(var d=0; d<3; ++d) {
    var i, j, k, l, w, W, h, n, c
      , u = (d+1)%3
      , v = (d+2)%3
      , x = [0,0,0]
      , q = [0,0,0]
      , du = [0,0,0]
      , dv = [0,0,0]
      , dimsD = dims[d]
      , dimsU = dims[u]
      , dimsV = dims[v]
      , qdimsX, qdimsXY
      , xd

    if (mask.length < dimsU * dimsV) {
      mask = new Int32Array(dimsU * dimsV);
    }

    q[d] =  1;
    x[d] = -1;

    qdimsX  = dimsX  * q[1]
    qdimsXY = dimsXY * q[2]

    // Compute mask
    while (x[d] < dimsD) {
      xd = x[d]
      n = 0;

      for(x[v] = 0; x[v] < dimsV; ++x[v]) {
        for(x[u] = 0; x[u] < dimsU; ++x[u], ++n) {
          var a = xd >= 0      && volume[x[0]      + dimsX * x[1]          + dimsXY * x[2]          ]
            , b = xd < dimsD-1 && volume[x[0]+q[0] + dimsX * x[1] + qdimsX + dimsXY * x[2] + qdimsXY]
          if (a ? b : !b) {
            mask[n] = 0; continue;
          }
          mask[n] = a ? a : -b;
        }
      }

      ++x[d];

      // Generate mesh for mask using lexicographic ordering
      n = 0;
      for (j=0; j < dimsV; ++j) {
        for (i=0; i < dimsU; ) {
          c = mask[n];
          if (!c) {
            i++;  n++; continue;
          }

          //Compute width
          w = 1;
          while (c === mask[n+w] && i+w < dimsU) w++;

          //Compute height (this is slightly awkward)
          for (h=1; j+h < dimsV; ++h) {
            k = 0;
            while (k < w && c === mask[n+k+h*dimsU]) k++
            if (k < w) break;
          }

          // Add quad
          // The du/dv arrays are reused/reset
          // for each iteration.
          du[d] = 0; dv[d] = 0;
          x[u]  = i;  x[v] = j;

          if (c > 0) {
            dv[v] = h; dv[u] = 0;
            du[u] = w; du[v] = 0;
          } else {
            c = -c;
            du[v] = h; du[u] = 0;
            dv[u] = w; dv[v] = 0;
          }
          var vertex_count = vertices.length;
          vertices.push([x[0],             x[1],             x[2]            ]);
          vertices.push([x[0]+du[0],       x[1]+du[1],       x[2]+du[2]      ]);
          vertices.push([x[0]+du[0]+dv[0], x[1]+du[1]+dv[1], x[2]+du[2]+dv[2]]);
          vertices.push([x[0]      +dv[0], x[1]      +dv[1], x[2]      +dv[2]]);
          faces.push([vertex_count, vertex_count+1, vertex_count+2, vertex_count+3, c]);

          //Zero-out mask
          W = n + w;
          for(l=0; l<h; ++l) {
            for(k=n; k<W; ++k) {
              mask[k+l*dimsU] = 0;
            }
          }

          //Increment counters and continue
          i += w; n += w;
        }
      }
    }
  }
  return { vertices:vertices, faces:faces };
}
})();

// if(exports) {
//   exports.mesher = GreedyMesh;
// }
