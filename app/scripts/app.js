'use strict';

/**
 * @ngdoc overview
 * @name ajs5BisApp
 * @description
 * # ajs5BisApp
 *
 * Main module of the application.
 */
angular
  .module('ajs5BisApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
