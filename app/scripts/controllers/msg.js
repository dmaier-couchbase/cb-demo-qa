/**
 * MsgCtrl
 */

/*
 * Constructor
 */
function MsgCtrl(scope)
{
  this.scope = scope; 
}

/**
 * To set the model of an action in order to show the success or error message
 * The idea is to us this sub-controller in several controllers, whereby the view imports msg.html
 */
MsgCtrl.prototype.showMsg = function(type, msg)
{
        if (type == "none")
        {
            this.scope.action = {};
            this.scope.action.error = "hidden";
            this.scope.action.success = "hidden";
        }
        
        if (type == "success")
        {
            this.scope.action.error = "hidden";
            this.scope.action.success = "";
            this.scope.action.msg = msg;
        }
        
        if (type == "error")
        {
            this.scope.action.error = "";
            this.scope.action.success = "hidden";
            this.scope.action.msg = msg; 
        }
}