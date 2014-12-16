/**
 * Initialization
 */
//Basic express requirements
var express = require('express');
var fs = require('fs');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Couchbase requirements and connection initialization
var CB_HOST = '192.168.7.145';
var CB_BUCKET = 'q_and_a';
var CB_PWD = 'test';

var couchbase = require('couchbase');

var cluster = new couchbase.Cluster('couchbase://' + CB_HOST);
var bucket = cluster.openBucket(CB_BUCKET, CB_PWD);
var viewQuery = new couchbase.ViewQuery();
    
if (cluster && bucket && viewQuery)
{
    console.log("cluster = " + JSON.stringify(cluster));
    console.log("bucket = " + JSON.stringify(bucket));
}
else
{
    console.log("ERROR: Could not initialize Couchbase");
}

//The express application initialization
var app = express();

//The static resources
app.use('/',express.static(__dirname + '/app'));
app.use('/bower_components',express.static(__dirname + '/bower_components'));

//The service implementation
var SERVICE_URL = '/service/';

/**
 * Add a question
 *
 * The bucket 'q_and_a' has to be existent
 */
app.post(SERVICE_URL + 'add', function (req, res) {
	
    //http://localhost:9000/service/add?cust=Couchbase&rfp=Test&version=2.5.1&category=Couchbase Server&q=Can we do mobile
    var cust = req.query.cust;
    var rfp = req.query.rfp;
    var version = req.query.version;
    var category = req.query.category;
    var comment = req.query.comment;
    var q = req.query.q;
    var a = req.query.a;
    
    if (cust && rfp && version && category && q)
    {
        var date = new Date();
        var qKey = "q::" + cust + "::" + rfp + "::" + date.getTime();
        
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

        bucket.insert( qKey, question, function(err, cbres) {
         
            if (err)
            {
                var msg = "Could not add the Question to Couchbase!";
                console.log("ERROR" + msg);
                res.json({ "error" : msg });
                
            }
            else
            {
                console.log("Added " + qKey + " to Couchbase");
                res.json(question);
            }
        });      
    }
    else
    {
        var msg = "Did you pass all mandatory parameters?";
        console.log("ERROR:" + msg); 
        res.json({"error" : msg});
    }    
});


/**
 * List all questions
 * 
 * The following View needs to be created:
 *
 * /q_and_a/_design/questions/_view/all
 *
 * function (doc, meta) {
 *     emit(meta.id, null);
 *  }
 */
app.get(SERVICE_URL + 'list', function (req, res) { 
        
    var q = viewQuery.from('questions', 'all');
    
    bucket.query(q, function(err, results) {
        
        if (err)
        {
          var msg = "Could not query the view";
          console.log("ERROR: " + msg);
          res.json({"error" : msg});
        }
        else
        {
            //Query the keys
            var keys = [];
            
            for(i in results) {
                
                var key = results[i].key;
                keys.push(key);
            }
            
            //Get the values of the keys
            var questions = [];
            
            bucket.getMulti(keys, function(err, cbres) {
                
                for (j in keys)
                {
                    var key = keys[j];
                    //console.log("key = " + key);
                    
                    var value = cbres[key].value;
                    value.id = key;
                    //console.log("value = " + JSON.stringify(value));

                    questions.push(value);
                }
                
                res.json(questions); 
            });
        }
    });
});


/**
 * Add a comment
 */
app.post(SERVICE_URL + 'comment', function (req, res) { 

    //TODO
});


/**
 * Import CSV
 */
app.post(SERVICE_URL + 'import', function (req, res) { 

    //TODO
});

/**
 * Query Elastic Search
 */
app.get(SERVICE_URL + 'query', function (req, res) { 

    //TODO
});


//Web server
server = app.listen(9000, function () { 
	
	var host = server.address().address
	var port = server.address().port 

	console.log('Example app listening at http://%s:%s', host, port)
	  
});
