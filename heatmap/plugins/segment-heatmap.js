(function() {
  'use strict';

  var segmentHeatmapPlugin = (function SegmentHeatmapPluginClosure() {

    var defaultSegmentsX = 10;
    var defaultSegmentsY = 5;

    function SegmentStore(config) {
      this._coordinator = {};
      this._data = [];
      this._max = 1;
      this._min = 0;
      this._initSegments();
    };

    SegmentStore.prototype = {
      _initSegments: function() {

      },
      setCoordinator: function(coordinator) {

      },
      setData: function(data) {
        var max = data.max;
        var min = data.min;
        var data = data.data;

        this._coordinator.emit('renderall', {
          min: min,
          max: max,
          data: data
        });
      },
      addData: function(data) {

      },
      removeData: function(data) {

      },
      getData: function() {
        return this._data;
      }
    };



    function SegmentRenderer(config) {

    };
    SegmentRenderer.prototype = {
      renderAll: function(data) {
        
      },
      renderPartial: function(data) {

      },
      getDataURL: function() {

      }
    };  

    return {
      store: SegmentStore,
      renderer: SegmentRenderer
    }
  }());

  h337.register('segment-heatmap', segmentHeatmapPlugin);

}());