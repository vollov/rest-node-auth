'use strict';

exports.nths_pub_test = {
	
	setUp : function(done) {
		console.log('\ndb setUp()...');
		done();
	},
	'test 1' : function(test) {
		console.log('\ndb test1()...');
		test.done();
	},
	'test 2' : function(test) {
		console.log('\ndb test2()...');
		test.done();
	},
};