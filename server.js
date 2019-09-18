var express = require('express');
var apiRoot = require('./server/api');
var indexRoot = require('./server/index');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Conf
var port = process.env.PORT || 8080;

// Create server
var app = express();

// Public folder
app.use(express.static((__dirname + '/dist/kathra-dashboard')));

// Request body parser strategies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Favicon
app.use(favicon(__dirname + '/dist/kathra-dashboard/favicon.ico'));

// API routes
app.use('/api', apiRoot);
app.use('/', indexRoot);

// Launch server 
app.listen(port, function(){
	console.log('ENV', process.env)
	console.log('Server running on ', port, '...');
});