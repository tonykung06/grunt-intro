'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		// pkg: grunt.file.readJSON('package.json'),
		clean: {
			testing: ['./js/build/*.js']
		},
		typescript: {
			options: {
				module: 'commonjs'
			},
			single123: {
				src: ['./js/**/*.ts'],
				dest: './js/build/bundle.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.registerTask('default', ['clean', 'typescript']);
};
