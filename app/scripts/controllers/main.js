'use strict';

/**
 * @ngdoc function
 * @name pandemicInfectionsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pandemicInfectionsApp
 */
angular.module('pandemicInfectionsApp')
  .controller('MainCtrl', function ($scope, $http) {

    let CITYKEY = 'CityData';

    $scope.sum = function (items, prop) {
      return items.reduce(function (a, b) {
        return a + b[prop];
      }, 0);
    };

    $scope.flipCard = function (city, epidemic) {
      if (city.Epidemics[epidemic] < city.NumberOfCards) {
        city.Epidemics[epidemic]++;
        localStorage.setItem(CITYKEY, angular.toJson($scope.cityData, false));
      }
      console.log(city.Epidemics);
    };

    $scope.loadDataFromServer = function () {
      $http.get('cities.json').then(
        function (result) {
          $scope.cityData = {
            'cities': result.data,
            'total': $scope.sum(result.data, 'NumberOfCards')
          };
        });
    };

    $scope.resetData = function () {
      localStorage.removeItem(CITYKEY);
      $scope.loadDataFromServer();
    };

    $scope.cityData = angular.fromJson(localStorage.getItem(CITYKEY));

    if ($scope.cityData === null) {

    }
  });
