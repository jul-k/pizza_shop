'use strict';

/**
 * @ngdoc function
 * @name doitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doitApp
 */
var app = angular.module('doitApp');


app.factory('MenuFactory', ['$http', function ($http) {
   return {
        getMenuFuture: function() {
            return $http.get('/menu.json');
        }
    };
}])

app.controller('MainCtrl', ['$scope', 'MenuFactory', function ($scope, MenuFactory) {
  		$scope.pizzas = [];
  		
  		var whenDataLoaded = function (data) {
  			$scope.pizzas = data.pizzas;
  		}
  		MenuFactory.getMenuFuture().success(whenDataLoaded);

  }]);
