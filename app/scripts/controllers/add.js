'use strict';

var app = angular.module('cbDemoQaApp');

app.controller('AddCtrl', function($scope, QAService) {
        
    //The service can not be injected because the scope can't be passed as parameter to service at construction time otherwise
    var MsgService = new TMsgService($scope);
    MsgService.showMsg("none","");
    
    $scope.onAddClicked = function(cust, rfp, version, cat, q, a)
    {        
        //Validate
        var validated = true;
        var fields = [];
        
        if (cust == null || cust == "")
        {
            validated = false;
            fields.push("Customer");
        }
        
        if (rfp == null || rfp == "")
        {
            validated = false;
            fields.push("RFP");
        }
        
        if (q == null || q == "")
        {
            validated = false;
            fields.push("Question");
        }
        
        if (!validated)
        {
            MsgService.showMsg("error","The following fields are required" + JSON.stringify(fields));  
        }
        else
        {
             //TQAService.prototype.add = function(customer, rfp, version, category, question, answer)
            QAService.add(cust, rfp, version, cat, q, a).then(     
            
                function(ctx) {            
                
                    var result = ctx.data;
                
                    if (result.error)
                    {
                        MsgService.showMsg("error", result.error.msg);                    
                    }
                    else
                    {
                        //Show the success message
                        MsgService.showMsg("success", "Successfully added the question");                }                
            
                    },
                    function(error) {
                
                        MsgService.showMsg("error", "Internal error: " + JSON.stringify(error));
                    }                                            
            );         
        }
    }
});

