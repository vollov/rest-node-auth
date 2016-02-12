var User   = require('../models/user'); // get nths user by mongoose model

module.exports = function(app, express) {
	var apiRoutes = express.Router();

	apiRoutes.get('/users', function(req, res) {
		User.find({}, function(err, users) {
			res.json(users);
		});
	});

	app.use('/nths/api/' + app.locals.nths_version, apiRoutes);
}