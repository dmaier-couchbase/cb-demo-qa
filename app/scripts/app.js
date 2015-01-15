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
    .when('/list', {
       templateUrl : 'views/list.html',
       controller : 'ListCtrl'  
    })
    .when('/search', {
        templateUrl : 'views/search.html',
        controller : 'SearchCtrl'
    })
    .when('/import', {
       templateUrl : 'views/import.html',
       controller : 'MainCtrl' 
    })
    .otherwise({
        redirectTo: '/'
    });
});
