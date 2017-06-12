(function () {
    'use strict';

    angular.module('utils')
        .service('categoriesDictionary', [
            '$log',

            'categoriesProvider',

            'translitFactory',

            function ($log, categoriesProvider, translitFactory) {
                return categoriesProvider.getCategoriesForLevel()
                    .then(
                        function (response) {
                            var dictionary = {};

                            var categories = _.toArray(response.data.data.categories);

                            // Create object, where keys are transliterated category names and values are id of these categories

                            categories.forEach(function (category) {
                                var transliterated = translitFactory.rusTolat(category[0].name);

                                dictionary[transliterated] = category[0].category_id;

                                if ( category[0].categories ) {
                                    _.toArray(category[0].categories.categories).forEach(function (subCategory) {
                                        transliterated = translitFactory.rusTolat(subCategory[0].name);

                                        dictionary[transliterated] = subCategory[0].category_id;
                                    });
                                }
                            });

                            return dictionary;
                        }
                    );
            }]);
})();