'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('doitApp'));

    var MainCtrl, scope;

    var testPizza = {
            'slug': 'modilyani',
            'title': 'El Diablo',
            'type': 'pizza',
            'extID': '21851',
            'emotionalDescription': 'Поєднання класичних італійських коренів та вишуканого французького смаку!',
            'description': 'Класичний соус, качка, маринований солодкий перець, сир фета, каперси, орегано.',
            'toppings': [],
            'categories': '0: Популярні, 1: М’ясні',
            'sauce': '20277',
            'specialRecipe': true,
            'customPrice': 45.4,
            'recommended': '',
            'images': {
                'big': 'http://mamamia.ua/wp-content/uploads/2013/10/pizza-modigliani.jpg',
                'small': 'http://mamamia.ua/wp-content/uploads/2013/10/pizza-modigliani-wpcf_187x187.jpg'
            }
        };

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
            // place here mocked dependencies
        });
    }));

    it('Total price should be initially be zero', function() {
        expect(scope.totalPrice).toBe(0);
    });

    it('The cart should be hidden', function() {
        expect(scope.showMe).toBe(false);
    });

    describe('Method: addToCart', function() {
        it('It should add item (empty cart)', function() {
            expect(scope.cart).toEqual({});

            scope.addToCart(testPizza);

            var expectedCart = {'El Diablo': { price: 45.4, count: 1 }};
            expect(scope.cart).toEqual(expectedCart);
        });

        it('It increase counter for the same pizza in the cart', function() {
            expect(scope.cart).toEqual({});

            scope.addToCart(testPizza);
            scope.addToCart(testPizza);

            var expectedCart = {'El Diablo': { price: 45.4, count: 2 }};
            expect(scope.cart).toEqual(expectedCart);
        });
    });

    it('Test remove from cart', function() {
        expect(scope.cart).toEqual({});

        scope.addToCart(testPizza);

        scope.remove(testPizza.title, true);

        expect(scope.cart).toEqual({});

    });

    it('Minus one item', function() {
        expect(scope.cart).toEqual({});

        scope.addToCart(testPizza);
        scope.addToCart(testPizza);

        scope.minusItem(testPizza.title);

        var expectedCart = {'El Diablo': { price: 45.4, count: 1 }};
        expect(scope.cart).toEqual(expectedCart);
    });

    it('Minus one item and remove', function() {
        expect(scope.cart).toEqual({});

        scope.addToCart(testPizza);

        scope.minusItem(testPizza.title);

        var expectedCart = {'El Diablo': { price: 45.4, count: 0 }};
        expect(scope.cart).toEqual(expectedCart);
    });

    it('Plus one item', function() {
        expect(scope.cart).toEqual({});

        scope.addToCart(testPizza);

        scope.plusItem(testPizza.title);

        var expectedCart = {'El Diablo': { price: 45.4, count: 2 }};
        expect(scope.cart).toEqual(expectedCart);
    });

    it('Method checkCartLength', function() {
        expect(scope.cart).toEqual({});

        scope.totalItems = 1;

        expect(scope.showMe).toEqual(false);

        scope.checkCartLength();

        expect(scope.showMe).toEqual(true);
    });

});
