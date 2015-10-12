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
}]);

app.controller('MainCtrl', ['$scope', 'MenuFactory', function ($scope, MenuFactory) {
	$scope.pizzas = [];
	$scope.cart = [];

	$scope.totalPrice = 0;

	$scope.order = function() {
		$scope.totalPrice+=parseInt(this.pizza.customPrice);
		$scope.cart.push(this.pizza);
	};
	
	var whenDataLoaded = function (data) {
		$scope.pizzas = data.pizzas;
	}
	MenuFactory.getMenuFuture().success(whenDataLoaded);
}]);
