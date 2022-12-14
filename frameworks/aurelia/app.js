define(['exports'], function (exports) {
  'use strict';

  function App() {
    this.databases = [];
  }

  App.prototype.activate = function() {
    var _this = this;
    function load() {
      _this.databases = ENV.generateData().toArray();
      window.Monitoring?.ping();
      setTimeout(load, ENV.timeout);
    }
    load();
  };

  exports.App = App;
});
