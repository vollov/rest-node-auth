'use strict';

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		nodeunit: {
		      files: ['test/**/*_test.js'],
		},
		pkg: grunt.file.readJSON('package.json'),
	    uglify: {
	    	options: {
	    		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	    	},
	    	build: {
	    		src: 'src/<%= pkg.name %>.js',
	    		dest: 'build/<%= pkg.name %>.min.js'
	    	}
	    }
	});
  
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	//grunt.loadNpmTasks('grunt-contrib-uglify'); ,'uglify'
	
	grunt.registerTask('default', ['nodeunit']);

};
