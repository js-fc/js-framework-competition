angular.module('app', []).controller('DBMonCtrl', function ($scope, $timeout) {
  $scope.databases = [];
  var load = function() {
    $scope.databases = ENV.generateData().toArray();
    window.Monitoring?.ping();
    $timeout(load, ENV.timeout);
  };
  load();
});
