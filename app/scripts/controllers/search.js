'use strict';

var app = angular.module('cbDemoQaApp');

app.controller('SearchCtrl', function($scope, QAService) {
        
    var msg = new MsgCtrl($scope);
    var items = new ItemsCtrl($scope, QAService);
    
    msg.showMsg("none","");
    
    $scope.onSearchClicked = function(inputQuery)
    {
        QAService.search(inputQuery).then(
          
             function(ctx) {  
                
                  //TODO: Add error handling
                  var result = ctx.data;
                  var hits = result.hits.hits;
                 
                  var docs = [];
                 
                  for (var i = 0; i < hits.length; i++)
                  {
                      var doc = hits[i]._source.doc;
                      doc.id = hits[i]._id;
                      
                      docs.push(doc);
                  }
                 
                  items.showItems(docs);
             },
             function(error) {
                 
                 //TODO: Add error handling
             }
        );
    }
});