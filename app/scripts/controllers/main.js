'use strict';

/**
 * @ngdoc function
 * @name ajs5BisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ajs5BisApp
 */
angular.module('ajs5BisApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate-------------------',
      'AngularJS',
      'Karma'
    ];
    $scope.aaa = 'rrr';
  });
