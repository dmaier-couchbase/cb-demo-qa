'use strict';

var app = angular.module('cbDemoQaApp');

app.controller('AddCtrl', function($scope, QAService) {
    
    $scope.action = {};
    $scope.action.error = "hidden";
    $scope.action.success = "hidden";
    
    $scope.onAddClicked = function(cust, rfp, version, cat, q, a)
    {        
        //TQAService.prototype.add = function(customer, rfp, version, category, question, answer)
        QAService.add(cust, rfp, version, cat, q, a).then(     
            function(ctx) {            
                
                var result = ctx.data;
                
                if (result.error)
                {
                    $scope.action.error = "";
                    $scope.action.success = "visibility: hidden";
                    $scope.action.msg = result.error.msg;
                    
                }
                else
                {
                    //Show the success message
                    $scope.action.error = "visibility: hidden";
                    $scope.action.success = "";
                    $scope.action.msg = "Successfully added the question";    
                }                
            
            },
            function(error) {
                
                $scope.action.error = "";
                $scope.action.success = "visibility: hidden";
                $scope.action.msg = JSON.stringify(error);
            }                                            
        ); 
    }
});

