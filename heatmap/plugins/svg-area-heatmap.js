/*
* SVG Area Heatmap Plugin
*
* Copyright (c) 2014, Patrick Wied (http://www.patrick-wied.at)
* Dual-licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and the Beerware (http://en.wikipedia.org/wiki/Beerware) license.
*/
(function() {
  'use strict';

  var SvgAreaHeatmap = (function SvgAreaHeatmapClosure() {

    var _getColorPalette = function(config) {
      var gradientConfig = config.gradient || config.defaultGradient;
      var paletteCanvas = document.createElement('canvas');
      var paletteCtx = paletteCanvas.getContext('2d');

      paletteCanvas.width = 256;
      paletteCanvas.height = 1;

      var gradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
      for (var key in gradientConfig) {
        gradient.addColorStop(key, gradientConfig[key]);
      }

      paletteCtx.fillStyle = gradient;
      paletteCtx.fillRect(0, 0, 256, 1);

      return paletteCtx.getImageData(0, 0, 256, 1).data;
    };


    function SvgAreaHeatmapStore(config) {
      this._coordinator = {};
      this._data = {};
      this._max = 1;
      this._min = 0;
    };

    SvgAreaHeatmapStore.prototype = {
      setCoordinator: function(coordinator) {
        this._coordinator = coordinator;
      },
      setData: function(data) {
        this._max = data.max || this._max;
        this._min = data.min || this._min;
        this._data = {};

        var d =  data.data;
        var dataLen = d.length;

        while (dataLen--) {
          this._organiseData(d[dataLen]);
        }

        this._coordinator.emit('renderall', this._getInternalData());
      },
      addData: function(data) {
        var organisedEntry = this._organiseData(data);
        if (organisedEntry) {
          this._coordinator.emit('renderpartial', {
            min: this._min,
            max: this._max,
            data: [organisedEntry]
          });
        }
      },
      updateData: function(data) {

      },
      removeData: function(data) {

      },
      getData: function() {

      },
      setDataMax: function(max) {
        this._max = max;
        //this._onExtremaChange();
        this._coordinator.emit('renderall', this._getInternalData());
        return this;
      },
      setDataMin: function(min) {
        this._min = min;
        //this._onExtremaChange();
        this._coordinator.emit('renderall', this._getInternalData());
        return this;
      },
      _organiseData: function(point) {
        if (this._data[point.id]) {
          this._data[point.id] += point.value;

        } else {
          this._data[point.id] = point.value;
        }

        if (this._data[point.id] > this._max) {
          this.setDataMax(this._data[point.id]);
        }
        if (this._data[point.id] < this._min) {
          this.setDataMin(this._data[point.id]);
        }
        return point;
      },
      _getInternalData: function() {
        return { 
          max: this._max,
          min: this._min, 
          data: this._data,
        };
      }
    };


    function SvgAreaHeatmapRenderer(config) {
      // initialization
      var container = config.container;
      var svgUrl = config.svgUrl;
      this.renderQueue = [];


      var svgObj = document.createElement('object');
      svgObj.type = 'image/svg+xml';
      svgObj.id = 'svgHeatmap';
      svgObj.data = svgUrl;

      var that = this;

      svgObj.onload = function() {
        that.svgDoc = this.getSVGDocument();
        that.$ = function(selector) {
          return that.svgDoc.querySelector(selector);
        };

        that._processQueue();
      }

      container.appendChild(svgObj);

      this._palette = _getColorPalette(config);

    };

    SvgAreaHeatmapRenderer.prototype = {
      renderPartial: function(data) {
        var point = data.data[0];
        this.max = data.max;
        this.min = data.min;
        this._colorize(point.id, point.value);
      },
      renderAll: function(data) {
        var points = data.data;
        this.max = data.max;
        this.min = data.min;
        for (var key in points) {
          this._colorize(key, points[key]);
        }
      },
      _colorize: function(key, value) {
        
        if (!this.svgDoc) {
          this.renderQueue.push([key, value]);
        } else {
          var node = this.$('#' + key);
          var color;
          var max = this.max;
          var min = this.min;
          var colorIndex = (((value/(Math.abs(max-min)) * 255) >> 0) * 4);

          var r = this._palette[colorIndex];
          var g = this._palette[colorIndex + 1];
          var b = this._palette[colorIndex + 2];

          node.style.fill = ['rgb(', r, ',', g, ',', b,')'].join('');
        }
      },
      _processQueue: function() {
        var renderElement = this.renderQueue.pop();
        if (!renderElement) {
          return;
        }
        this._colorize.apply(this, renderElement);
        this._processQueue();
      }
    };

    return {
      store: SvgAreaHeatmapStore,
      renderer: SvgAreaHeatmapRenderer
    }
  }());

  h337.register('SvgAreaHeatmap', SvgAreaHeatmap);

}());