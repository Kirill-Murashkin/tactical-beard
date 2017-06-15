(function() {
	'use strict';

	var registry = angular.module('registry');

	var pathToPartial = function(moduleName){
		return 'modules/' + moduleName + '/partials/' + moduleName + '.html';
	};

    var pathToInnerPage = function pathToPartial(page) {
        return 'modules/inner-pages/partials/' + page + '.html';
    };

	var pathToController = function(moduleName) {
		return 'modules/' + moduleName + '/controllers/' + moduleName + '.html';
	};

	registry.constant('STATE_NAMES', {
		'HOME': 'home',
		'CATEGORIES': 'categories',
		'SEARCH': 'search',
		'CATEGORY': 'category',
		'PRODUCT': 'product',
		'MAKE_ORDER': 'make-order',
		'ORDER_DONE': 'order-done',
		'BASKET': 'basket',
		'INFO_LIST_PAGE': 'info-list-page',
		'INFO_PAGE': 'info-page',
		'BOOKMARKS_PAGE': 'bookmarks-page',
		'PERSONAL_ACCOUNT_PAGE': 'personal-account-page'
	});

	registry.constant('STATES', [
		{
			name: 'home',
			url: '/',
			templateUrl: pathToPartial('main-page')
		},

		{
			name: 'categories',
			url: '/categories/',
			controller: 'categoriesPageCtrl',
			templateUrl: pathToPartial('categories-page')
		},

        {
            name: 'search',
            url: '/categories/search/?{search}',
            params: {
                search: null
            },
            templateUrl: pathToPartial('products-list-page')
        },

		{
			name: 'category',
			url: '/categories/{categoryName}/',
			params: {
                categoryId: null,

				categoryName: null
			},
			templateUrl: pathToPartial('products-list-page')
		},

		{
			name: 'product',
            url: '/categories/{categoryNameForUrl}/{productName}/?{productId}',
			params: {
				productId: null,

				productName: null,

				categoryName: null,

                categoryNameForUrl: null
			},
			controller: 'productPageCtrl',
			templateUrl: pathToPartial('product-page')
		},

		{
			name: 'make-order',
			url: '/make-order/',
			templateUrl: pathToPartial('make-order-page')
		},

		{
			name: 'order-done',
			url: '/order-done/',
			templateUrl: pathToPartial('order-done-page')
		},

		{
			name: 'basket',
			url: '/basket/',
			templateUrl: pathToPartial('basket-page')
		},

		{
			name: 'info-list-page',
			url: '/info/:infoType/', //news or articles or something else
			templateUrl: pathToPartial('info-list-page')
		},

		{
			name: 'info-page',
			url: '/info/:infoType/:pageName/',
			templateUrl: pathToPartial('info-page')
		},

        {
            name: 'about',
            url: '/about/',
            templateUrl: pathToInnerPage('about')
        },

		{
            name: 'delivery-and-payment',
            url: '/delivery-and-payment/',
            templateUrl: pathToInnerPage('delivery-and-payment')
        },

		{
            name: 'wholesale',
            url: '/wholesale/',
            templateUrl: pathToInnerPage('wholesale')
        },

        {
            name: 'contacts',
            url: '/contacts/',
            templateUrl: pathToInnerPage('contacts')
        },

		{
			name: 'bookmarks-page',
			url: '/bookmarks/',
			templateUrl: pathToPartial('bookmarks-page')
		},

		{
			name: 'personal-account-page',
			url: '/account/',
			templateUrl: pathToPartial('personal-account-page')
		}
	]);
})();