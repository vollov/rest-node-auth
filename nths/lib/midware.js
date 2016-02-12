

module.exports = {

	/**
	 * Authentication each /api/* request with the tokenid
	 */
	authentication: function(req, res, next) {
		console.log('bg console: nths authentication');
		next();
	},
	
	/**
	 * Authorization: check if the user with tokenid has rights to access the api 
	 */
	authorization: function(tokenid, url) {
		//return {status: status_code, message : 'xxxx'}
	}
}
