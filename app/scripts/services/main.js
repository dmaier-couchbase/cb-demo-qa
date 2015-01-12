var qaServices = angular.module('cbDemoQaApp');

qaServices.factory('QAService', function($http) {
   
    var qaService = new TQAService($http);
    
    return qaService;
});