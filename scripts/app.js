/**
 * @ngdoc overview
 * @name purewebApp
 * @description
 * # purewebApp
 *
 * Main module of the application.
 */
(function() {
    'use strict';
    angular
        .module('webApp', [
            'ngAnimate',
            'ngTouch',
            'tessera',
            'ui.router'
        ])
        .config(routeConfig)
        .config(appConfig)
        .run(run);

    function run($state) {
        $state.go('main');
    }

    function appConfig($locationProvider) {

        $locationProvider.html5Mode(false);
    }

    function routeConfig($stateProvider, $urlRouterProvider) {

        //For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/main");

        // Now set up the states
        $stateProvider
            .state('main', {
                url: "main",
                templateUrl: 'views/main.html',
                resolve: {
                    logo: function() {
                        return {
                            'value': 'BOOK1'
                        };
                    }
                },
                controller: 'homeCtrl'
            });

    }
})();
