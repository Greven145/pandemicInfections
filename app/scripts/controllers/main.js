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

    $scope.sum = function (items, prop) {
      return items.reduce(function (a, b) {
        return a + b[prop];
      }, 0);
    };

    $scope.flipCard = function (city, epidemic) {
      if ( city.Epidemics[epidemic] < city.NumberOfCards) {
        city.Epidemics[epidemic]++;
      }
      console.log(city.Epidemics);
    };

    $http.get('cities.json').then(
      function (result) {
        $scope.cityData = {
          "cities": result.data,
          "total": $scope.sum(result.data, 'NumberOfCards')
        };
      });
  });
