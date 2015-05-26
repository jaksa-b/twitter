angular.module('twitter', ['ui.bootstrap', 'ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: 'components/home/home.html',
            controller:'HomeController'
        })
        .state('search', {
            url: "/search",
            templateUrl: 'components/search/search.html',
            controller:'SearchController'
        });
});
