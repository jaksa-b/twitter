angular.module('twitter', [
    'ui.bootstrap',
    'ui.router',
    'angularMoment',
    'angularUtils.directives.dirPagination'
])

    .config(function ($stateProvider, $urlRouterProvider, paginationTemplateProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: 'components/home/home.html',
                controller: 'HomeController'
            })
            .state('search', {
                url: "/",
                templateUrl: 'components/search/search.html',
                controller: 'SearchController'
            });

        paginationTemplateProvider.setPath('../bower_components/angular-utils-pagination/dirPagination.tpl.html');
    });
