
var User   = require('../models/user'); 

module.exports = function(app, express) {
	var apiRoutes = express.Router(); 
	
	apiRoutes.get('/hello', function(req, res) {
		res.json({ message: 'Welcome to hello!' });
	});
	
	apiRoutes.get('/login', function(req, res) {
		res.json({ message: 'Welcome to login!' });
	});
	
	apiRoutes.post('/authenticate', function(req, res) {

		  // find the user
		  User.findOne({
		    name: req.body.name
		  }, function(err, user) {

		    if (err) throw err;

		    if (!user) {
		      res.json({ success: false, message: 'Authentication failed. User not found.' });
		    } else if (user) {

		      // check if password matches
		      if (user.password != req.body.password) {
		        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
		      } else {

		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign(user, app.get('superSecret'), {
		          expiresInMinutes: 1440 // expires in 24 hours
		        });

		        // return the information including token as JSON
		        res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });
		      }   

		    }

		  });
	});
	
	app.use('/nths/pub', apiRoutes);
}