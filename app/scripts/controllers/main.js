'use strict';

/**
 * @ngdoc function
 * @name cbDemoQaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cbDemoQaApp
 */
angular.module('cbDemoQaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
