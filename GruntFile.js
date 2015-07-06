'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		// pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['./js/build']
		},
		typescript: {
			options: {
				module: 'commonjs'
			},
			bundle: {
				src: ['./js/**/*.ts'],
				dest: './js/build/bundle.js'
			}
		},
		uglify: {
			options: {
				beautify: false,
				mangle: true
			},
			dev: {
				options: {
					beautify: true,
					mangle: false
				},
				files: [{
					expand: true,
					cwd: './js',
					src: './build/**/*.js',
					dest: './js/'									
				}],
			},
			production: {
				files: [{
					expand: true,
					cwd: './js',
					src: './build/**/*.js',
					dest: './js/build/production',
					flatten: true
				}],
			}
		},
		tslint: {
			errors: {
		        options: {
		          configuration: grunt.file.readJSON("tslint.json")
		        },
		        files: {
		          src: [
		            "js/**/*.ts"
		        ]}
      		}	
		},
		htmlhint: {
			options: {
				'attr-lower-case': true,
				// 'attr-value-not-empty': true,
				'tag-pair': true,
				// 'tag-self-close': true,
				'tagname-lower-case': true
			},
			github_page: {
				src: ['html/github-home.html']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.registerTask('default', ['clean', 'tslint', 'typescript', 'uglify', 'htmlhint']);
};
