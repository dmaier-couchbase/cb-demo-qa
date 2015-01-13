'use strict';

/**
 * @ngdoc overview
 * @name cbDemoQaApp
 * @description
 * # cbDemoQaApp
 *
 * Main module of the application.
 */
var app = angular.module('cbDemoQaApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
]);

app.config(function($routeProvider) {
   
    $routeProvider
    .when('/', {
       templateUrl : 'views/main.html',
       controller : 'MainCtrl'
    })
    .when('/add', {
       templateUrl : 'views/add.html',
       controller : 'AddCtrl'       
    })
    .otherwise({
        redirectTo: '/'
    });
});
