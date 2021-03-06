'use strict';

/**
 * @ngdoc function
 * @name doitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doitApp
 */

var app = angular.module('doitApp');

app.factory('MenuFactory', ['$http', function($http) {
    return {
        getMenuFuture: function() {
            return $http.get('/app/menu.json');
        }
    };
}]);

app.controller('MainCtrl', ['$scope', 'MenuFactory', function($scope, MenuFactory) {
    $scope.pizzas = [];
    $scope.cart = {}; // { 'title': {'item': PizzaObject, count: int}

    $scope.totalPrice = 0;

    $scope.totalItems = 0;

    $scope.showMe = false;

    // $scope.hide = false;

    $scope.addToCart = function(pizza) {
        // todo: another apporach
        var propertyPrice = pizza.customPrice;

        var propertyName = pizza.title;
        var order = $scope.cart[propertyName] || {
            price: propertyPrice,
            count: 0
        };
        order.count += 1;
        $scope.cart[propertyName] = order;

        // return $scope.hide = false;
    };

    var whenDataLoaded = function(data) {
        $scope.pizzas = data.pizzas;
    };
    MenuFactory.getMenuFuture().success(whenDataLoaded);

    $scope.$watch('cart', function(newVal) {

        var totalPrice = 0;
        var totalItems = 0;
        for (var key in newVal) {
            var order = newVal[key];
            totalItems += order.count;
            totalPrice += parseInt(order.price * order.count);
        };
        //Do your logic with the property here
        $scope.totalPrice = totalPrice;
        $scope.totalItems = totalItems;
    }, true);

    $scope.remove = function(title, confirmed) {

        var ok = confirmed || confirm('Ви впевнені, що бажаєте видалити піццу "' + title + '" з корзини?');
        if (!ok) {
            return;
        }
        delete $scope.cart[title];

        if (Object.keys($scope.cart).length === 0) {
            $scope.showMe = false;
        }
    };

    $scope.minusItem = function(title) {
        var order = $scope.cart[title];
        order.count -= 1;

        if (order.count == 0) {
            $scope.remove(title);
        }
    };

    $scope.plusItem = function(title) {
        var order = $scope.cart[title];
        order.count += 1;
    };

    $scope.later = function() {
        alert('Можливо, пізніше. :)');
    };

    $scope.checkCartLength = function() {

        if ($scope.totalItems == 0) {
            alert('Спочатку Ви маєте щось замовити.');
        } else {
            $scope.showMe = !$scope.showMe;
        }
    };
}]);

app.filter('as_number', function() {
    return function(input) {
        return parseInt(input, 10);
    };
});

