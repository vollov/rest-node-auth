'use strict';

var mongoose = require('mongoose');
var User   = require('../../nths/models/user'); 

exports.nths_model_user_test = {
	
	setUp : function(done) {
		console.log('\ndb setup');
		mongoose.createConnection('mongodb://localhost/rest');
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log('\nnths_model_user_test db connected...');// we're connected!
		});
		
		done();
	},
	'test find user by name' : function(test) {
		console.log('\ndb test1()...');
		User.findOne({'name': 'dustin' }, function(err, user){
			console.log('user dustin.password = ' + user.password);
		});	
		test.done();
	},
	'test 2' : function(test) {
		console.log('\ndb test2()...');
		test.done();
	},
};