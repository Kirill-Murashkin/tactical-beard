(function () {
    'use strict';

    var productsListPage = angular.module('productsListPage');

    productsListPage.controller('productsListPageCtrl', [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        '$locale',
        'productsProvider',
        'filtersFactory',
        'statesFactory',
        'translitFactory',
        'categoriesDictionary',
        'STATE_NAMES',

        function ($scope, $log, $state, $stateParams, $locale, productsProvider, filtersFactory, statesFactory, translitFactory, categoriesDictionary, STATE_NAMES) {
            $scope.helpers = {
                getCurrentOrder: function () {
                    var currentOrdermap = {
                        'cheaper': 'price',

                        // reverse
                        'expensive': '-price'
                    };

                    var currentOrder = _.find($scope.filters.order, function (orderType) {
                        return orderType.status;
                    });

                    if (currentOrder) {
                        return currentOrdermap[currentOrder.name];
                    } else {
                        return 'name';
                    }
                },

                getCurrentFilters: function () {
                    return 'byManufacturerFilter';
                }
            };

            $scope.goToUIProductState = function (state) {
                $state.go(STATE_NAMES.PRODUCT, {
                    productId: state.productId,
                    productName: translitFactory.rusTolat(state.productName),
                    categoryName: state.categoryName[_.keys(state.categoryName)[0]][0].name,
                    categoryNameForUrl: translitFactory.rusTolat(state.categoryName[_.keys(state.categoryName)[0]][0].name)
                });
            };

            $scope.products = [];

            $scope.filters = filtersFactory.getCurrentFilters();

            $scope.currentOrder = $scope.helpers.getCurrentOrder();

            $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

            categoriesDictionary
                .then(
                    function (dictionary) {
                        return dictionary[$stateParams.categoryName];
                    }
                )
                .then(
                    function (categoryId) {
                        productsProvider.getProductsByCategoryId(categoryId).then(
                            function (response) {
                                var products = _.toArray(response.data.data);

                                products.forEach(function (item, index, arr) {
                                    item.price = +item.price;
                                });

                                $scope.products = products;
                            },

                            function (error) {
                                $log.error(error);
                            }
                        );
                    }
                );

            // if ($state.current.name === STATE_NAMES.SEARCH) {
            //     console.log('state.current.name === STATE_NAMES.SEARCH!!!');
            //
            //     productsProvider.getProductsBySearch($stateParams.search).then(
            //         function (response) {
            //             var products = _.toArray(response.data.data);
            //
            //             products.forEach(function (item, index, arr) {
            //                 item.price = +item.price;
            //             });
            //
            //             $log.log('products: ', products);
            //
            //             $scope.products = products;
            //         },
            //
            //         function (error) {
            //             $log.error(error);
            //         }
            //     );
            // } else {
            //     productsProvider.getProductsByCategoryId($scope.helpers.getCategoryId()).then(
            //         function (response) {
            //             console.log('$stateParams): ', $stateParams);
            //             var products = _.toArray(response.data.data);
            //
            //             products.forEach(function (item, index, arr) {
            //                 item.price = +item.price;
            //             });
            //
            //             $log.log('products: ', products);
            //
            //             $scope.products = products;
            //         },
            //
            //         function (error) {
            //             $log.error(error);
            //         }
            //     );
            // }
        }]);
})();