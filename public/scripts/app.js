angular.module('twitter', [
    'ui.bootstrap',
    'ui.router',
    'angularMoment'
])

.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: 'components/home/home.html',
            controller:'HomeController'
        })
        .state('search', {
            url: "/",
            templateUrl: 'components/search/search.html',
            controller:'SearchController'
        });
});
