// =======================
// package import
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file

    
var midware = require('./lib/midware')
var nths = require('./nths/lib/midware')
// =======================
// configuration
// =======================
var port = process.env.PORT || 8000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes 
// =======================

app.all('*', midware.header);
app.all('/nths/api/*', nths.authentication);

//=======================
//load api
//=======================
require('./nths/pub')(app,express);
require('./nths/api/user')(app,express);

// =======================
// start the server 
// =======================
app.listen(port);
console.log('Server start at http://localhost:' + port);