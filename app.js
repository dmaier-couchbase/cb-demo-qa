//Basic express requirements
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Couchbase requirements
var couchbase = require('couchbase');

//The express application
var app = express();

//The static resources
app.use('/',express.static(__dirname + '/app'));
app.use('/bower_components',express.static(__dirname + '/bower_components'));

//The service implementation
var SERVICE_URL = '/service/';

app.get(SERVICE_URL + 'question', function (req, res) {
	
    var cust = req.query.cust;
    var rfp = req.query.rfp;
    var version = req.query.version;
    var category = req.query.category;
    var comment = req.query.comment;
    var q = req.query.q;
    var a = req.query.a;
    
    if (cust && rfp && version && category && q)
    {
        var question = {};
        question.question = q;
        question.cust = cust;
        question.rfp = rfp;
        question.version = version;
        question.category = category;
        
        if (a) question.answer = a;
        if (comment) {
            
            question.comments = [];
            question.comments.push(comment);
        }
        
        res.json(question);
    }
    else
    {
        res.json({"error" : "Could not create the question"});
    }    
});


//Web server
server = app.listen(9000, function () { 
	
	var host = server.address().address
	var port = server.address().port 

	console.log('Example app listening at http://%s:%s', host, port)
	  
});
