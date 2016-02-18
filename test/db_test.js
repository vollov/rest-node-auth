'use strict';

exports.db_test = {
	
	setUp : function(done) {
		console.log('db setUp()...');
		done();
	},
	'test 1' : function(test) {
		console.log('db test1()...');
		test.done();
	},
	'test 2' : function(test) {
		console.log('db test2()...');
		test.done();
	},
};
