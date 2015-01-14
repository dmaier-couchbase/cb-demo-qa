'use strict';

var app = angular.module('cbDemoQaApp');

app.controller('ListCtrl', function($scope, QAService) {
   
    var msg = new MsgCtrl($scope);
    var items = new ItemsCtrl($scope, QAService);
    
    msg.showMsg("none","");
    
    QAService.list().then(
        
        function(ctx) { 
            
            var result = ctx.data;
            
            items.showItems(result);
            
        },
        function(error)
        {
            msg.showMsg("error", "Internal error: " + JSON.stringify(error));
        }
        
    );
    
});