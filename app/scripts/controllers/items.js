/**
 * ItemsCtrl
 */

/*
 * Constructor
 */
function ItemsCtrl(scope, qaService)
{
  this.scope = scope;
  this.qaService = qaService;
}


//--Helpers

/**
 * Checks if the array contains an element with the specific name. If yes, then it returns the position of it. Otherwise it
 * returns -1.
 */
 function contains(arr, prop, value)
 {
    var result = -1;
        
    for (var i = 0; i < arr.length; i++)
    {
        var e = arr[i];
            
        if (e[prop] == value)
        {
            return i;
        }
    }
        
    return -1;
}
    
/**
 * Create a customer
 */
function crCustomer(name)
{
    var cust = {};
    cust.name = name;
    cust.rfps = [];
        
    return cust;
}
    
/**
 * Create an RFP
 */
function crRfp(name)
{
    var rfp = {};
    rfp.name = name;
    rfp.questions = [];
        
    return rfp;
}
    
/**
 * Create a question
 */
function crQuestion(id, q, a, v, c, cmts)
{
    var qa = {};
    //Replace :: with __ because html id-s do not allow ::
    qa.id = id.replace(new RegExp("::", "g"),"__");
    qa.question = q;
    qa.answer = a;
    qa.version = v;
    qa.category = c;
    qa.comments = cmts;
        
    return qa;
}

//-- Functions 
ItemsCtrl.prototype.hideAddCommentMsg = function() {

    var msg = {};
    msg.err =  "hidden";
    msg.msg  = "";
    this.scope.cmsg = msg;
}

ItemsCtrl.prototype.showAddCommentMsg = function(text)
{
     var msg = {};
     msg.err = "";
     msg.msg = text;
     this.scope.cmsg = msg;
}


//-- Set the model of the view
/*
 * Show items based on the passed result
 */
ItemsCtrl.prototype.showItems = function(result)
{
            //Group by customer and RFP by transforming the data for visualization purposes
            var customers = [];
            
            for (var i = 0; i < result.length; i++)
            {
               var q = result[i];
               
               var custIdx = contains(customers, 'name', q.cust);
                
               //If the customer is not yet existent then add it with the inital RFP and question
               if (custIdx == -1)
               {
                    //Create customer
                    var cust = crCustomer(q.cust);
                    
                    //Create an inital RFP
                    var rfp = crRfp(q.rfp);
                                      
                    //Create an inital question for the RFP
                    var qa = crQuestion(q.id, q.question, q.answer, q.version, q.category, q.comments);
                   
                    //Add the question
                    rfp.questions.push(qa);
        
                    //Add the RFP
                    cust.rfps.push(rfp);                                       

                    //Add the customer
                    customers.push(cust);
               }
               else
               {
                   var cust = customers[custIdx];
            
                   var rfpIdx = contains(cust.rfps, 'name', q.rfp);
                   
                   //If the RFP is not yet existent then add it with the inital question
                   if (rfpIdx == -1)
                   {
                     var rfp = crRfp(q.rfp);
                     var qa = crQuestion(q.id, q.question, q.answer, q.version, q.category, q.comments);
                     rfp.questions.push(qa);
                     cust.rfps.push(rfp);
                   }
                   else
                   {
                        //Otherwise just add the question to the existing RFP
                        var rfp = cust.rfps[rfpIdx];
                        var qa = crQuestion(q.id, q.question, q.answer, q.version, q.category, q.comments);
                        rfp.questions.push(qa);     
                   }
               }
                
            }
            
            //console.log(JSON.stringify(customers));
            this.scope.customers = customers;
    
            this.hideAddCommentMsg();
    
            var me = this;
    
            //-- Comments
            this.scope.onCommentsClosed = function()
            {
                me.hideAddCommentMsg();
            }
    
            this.scope.onAddCommentClicked = function(id, comment)
            {
                //Validate
                if (typeof comment == "undefined" || comment == "undefined")
                {
                   me.showAddCommentMsg("Please enter a comment");
                }
                else
                {
                    me.hideAddCommentMsg();
                    
                    var docId = id.replace(new RegExp("__", "g"),"::");
                    me.qaService.comment(docId, comment).then(
                      
                        function(ctx)
                        {
                            
                            var result = ctx.data;
                
                            if (result.error)
                            {
                                me.showAddCommentMsg(result.error.msg);                    
                            }
                            else
                            {
                                //Add the comment to the view by modifying the view model
                                //TODO: Find a better way. The nested loop is a kind of bad
                                var customers = me.scope.customers;
                                
                                for (var i = 0; i < customers.length; i++)
                                {
                                    var rfps = customers[i].rfps;
                                    
                                    for (var j = 0; j < rfps.length; j++)
                                    {
                                        var questions = rfps[j].questions;
                                        
                                        for (var k = 0; k < questions.length; k++)
                                        {
                                            if (questions[k].id == id)
                                            {
                                                me.scope.customers[i].rfps[j].questions[k].comments.push(comment);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        function(error)
                        {
                            me.showAddCommentMsg("Internal error: " + JSON.stringify(error));
                        }
                    );
                }
            }
}