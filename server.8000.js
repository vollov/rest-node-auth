// =======================
// package import
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var methodOverride = require('method-override');



var session = require('express-session');
var mongoose    = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);

var errorHandler = require('errorhandler');

// setup passport for authentication
var passport = require('passport');


var config = require('./config'); // get our config file
var midware = require('./lib/midware')
var nths = require('./nths/lib/midware')
// =======================
// configuration
// =======================
var port = process.env.PORT || 8000; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db connected');
});

mongoose.set('debug', true);

app.set('superSecret', config.secret); // secret variable

//all server settings
app.locals.port = 8000;
app.locals.mongo_options = { uri: 'mongodb://localhost:27017/demo', collection: 'sessions' }
app.locals.session_secret = 'uwotm8xxc'
app.locals.session_age = 60000//1209600000 // in ms 14 * 24 * 60 * 60

app.locals.nths_version = 'v1.0'
	
var sessionOptions = {
	saveUninitialized: false, // saved new sessions
	resave: false, // do not automatically write to the session store
	store: new MongoDBStore(app.locals.mongo_options),
	secret: app.locals.session_secret,
	cookie : { httpOnly: true, maxAge: app.locals.session_age } // configure when sessions expires
}

app.use(favicon(__dirname + '/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());

//error handling middle ware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

// =======================
// routes 
// =======================

app.all('*', midware.header);
app.all('/nths/api/*', nths.authentication);

//=======================
//load api
//=======================
require('./nths/pub')(app, express, passport);
require('./nths/api/user')(app,express);

// =======================
// start the server 
// =======================
app.listen(port);
console.log('Server start at http://localhost:' + port);