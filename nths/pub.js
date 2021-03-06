var User   = require('./models/user'); 
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, express, passport) {
	var apiRoutes = express.Router(); 
	
	passport.serializeUser(function(user, done) {
		console.log('passport serializeUser');
		  done(null, user.id);
		});

	passport.deserializeUser(function(id, done) {
		console.log('passport deserializeUser');
		  User.findById(id, function(err, user) {
		    done(err, user);
		  });
	});
	
//	passport.deserializeUser(function(user, done) {
//		  done(null, user);
//	});
	
	passport.use(new LocalStrategy(
		function(username, password, done) {
			console.log('passport in local strategy...{' + username + ',' + password + '}');
			process.nextTick(function() {
				User.findOne({'name': username, }, function(err, user){
					if (err) {
						console.log('passport in local strategy - error');
						return done(err);
					}

					if (!user) {
						console.log('passport in local strategy - Incorrect username');
						return done(null, false, { message: 'Incorrect username.'});
					}

					if (user.password != password) {
						console.log('passport in local strategy - Incorrect password');
						return done(null, false, { message: 'Incorrect password.' });
					}
					console.log('passport in local strategy - done=' + user.name);
					return done(null, user);
				});
			});
		}
	));
	
	apiRoutes.get('/hello', function(req, res) {
		res.json({ message: 'Welcome to hello!' });
	});
	
	apiRoutes.post('/login',
		passport.authenticate('local'),
		function(req, res) {
			console.log('login success...' + req.body.username);
			//res.json({ username: req.user.username });	
			res.status(200).send({ username: req.body.username });
		}
	);
	
//	apiRoutes.get('/login', function(req, res) {
//		res.json({ message: 'Welcome to login!' });
//	});
	
//	apiRoutes.post('/login', function(req, res) {
//		console.log('received login post request');
//		passport.authenticate('local', {
//		    successRedirect: '/loginSuccess',
//		    failureRedirect: '/loginFailure'
//		})
//	});
	
//	apiRoutes.post('/login',
//		passport.authenticate('local', {
//			successRedirect: '/loginSuccess',
//			failureRedirect: '/loginFailure'
//		})
//	);
	
	apiRoutes.get('/loginFailure', function(req, res, next) {
		  res.send('Failed to authenticate');
	});

	apiRoutes.get('/loginSuccess', function(req, res, next) {
		  res.send('Successfully authenticated');
	});
	
	app.use('/nths/pub/' + app.locals.nths_version, apiRoutes);
}