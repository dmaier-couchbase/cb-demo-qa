/**
 * TQAService
 */

/*
 * Constructor
 */
function TQAService(httpService)
{
  this.httpService = httpService;   
}

TQAService.prototype.add = function(customer, rfp, version, category, question, answer)
{
    //http://localhost:9000/service/add?cust=Couchbase&rfp=Test&version=2.5.1&category=Couchbase Server&q=Can we do mobile
    var url = "/service/add?cust=" + customer + "&rfp=" + rfp + "&version=" + version + "&category=" + category + "&q=" + question;
    
    if (answer) url = url + "&a=" + answer;
    
    var promise = this.httpService.post(url, {}).success(function (data) { /*Allows to handle the result and errors */ });
    
    return promise;
}

TQAService.prototype.list = function()
{
    var url = "/service/list';
    
    var promise = this.httpService.get(url).success(function(){});
    
    return promise;
}

TQAService.prototype.comment = function(id, comment)
{
    var url = "/service/comment?id=" + id + "&comment=" + comment;
    
    var promise = this.httpService.post(url, {}).success(function (data) { /*Allows to handle the result and errors */ });
    
    return promise;
}

TQAService.prototype.search = function(query)
{
    var url = "/service/query";
    
    if (query) url = url + "?q=" + query;
    
    var promise = this.httpService.get(url).success(function(){});
    
    return promise;
}