//Basic express requirements
var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Set up logging
//var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
//var logger = morgan('combined', {stream: accessLogStream});

//The express application
var app = express();

//The static resources
//app.use(logger);
app.use('/',express.static(__dirname + '/app'));
app.use('/bower_components',express.static(__dirname + '/bower_components'));


//Web server
server = app.listen(9000, function () { 
	
	var host = server.address().address
	var port = server.address().port 

	console.log('Example app listening at http://%s:%s', host, port)
	  
});
