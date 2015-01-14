/**
 * ItemsCtrl
 */

/*
 * Constructor
 */
function ItemsCtrl(scope)
{
  this.scope = scope; 
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
function crQuestion(q, a, v, c)
{
    var qa = {};
    qa.question = q;
    qa.answer = a;
    qa.version = v;
    qa.category = c;
        
    return qa;
}

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
                    var qa = crQuestion(q.question, q.answer, q.version, q.category);
                   
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
                     var qa = crQuestion(q.question, q.answer, q.version, q.category);
                     rfp.questions.push(qa);
                     cust.rfps.push(rfp);
                   }
                   else
                   {
                        //Otherwise just add the question to the existing RFP
                        var rfp = cust.rfps[rfpIdx];
                        var qa = crQuestion(q.question, q.answer, q.version, q.category);
                        rfp.questions.push(qa);     
                   }
               }
                
            }
            
            //console.log(JSON.stringify(customers));
            this.scope.customers = customers;
}