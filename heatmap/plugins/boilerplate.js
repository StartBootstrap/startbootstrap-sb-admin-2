(function() {
  'use strict';

  var boilerplatePlugin = (function BoilerplatePluginClosure() {

    function BoilerplateStore(config) {
      this._coordinator = {};
      this._data = [];
      this._max = 1;
      this._min = 0;
    };

    BoilerplateStore.prototype = {
      setCoordinator: function(coordinator) {

      },
      setData: function(data) {

      },
      addData: function(data) {

      },
      removeData: function(data) {

      },
      getData: function() {

      }
    };



    function BoilerplateRenderer(config) {

    };

    return {
      store: BoilerplateStore,
      renderer: BoilerplateRenderer
    }
  }());

  h337.register('boilerplate', boilerplatePlugin);

}());