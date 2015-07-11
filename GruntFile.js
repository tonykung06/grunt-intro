'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		// pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['./html/build/', './js/build/', './css/build/']
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
		jshint: {
			options: {
				'-W015': true,
				reporterOutput: 'jshint-report.txt',
				ignores: ['*.min.js']
			},
			files: ['js/build/*.js']
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
					src: './build/*.js',
					dest: './js/'					
				}],
			},
			production: {
				files: [{
					expand: true,
					cwd: './js',
					src: './build/*.js',
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
		},
		htmlmin: {
			dev: {
				options: {
					removeEmptyAttributes: true,
					removeEmptyElements: true,
					removeRedundantAttributes: true,
					removeComments: true,
					removeOptionalTags: true,
					collapseWhitespace: true
				},
				// files: {
				// 	'html/github-home.min.html': ['html/github-home.html']
				// }
				files: [{
					expand: true,
					cwd: 'html/',
					dest: 'html/build/',
					src: ['*.html'],
					ext: '.min.html',
					extDot: 'last'
				}]
			}
		},
		less: {
			dev: {
				options: {
					// cleancss: false, //seems not working
					compress: true,
					modifyVars: {
						"test-var": "blue"
					}
				},
				// files: {
				// 	'css/build/test.css': 'css/test.less',
				// 	'css/build/test2.css': 'css/test2.less',
				// 	'css/build/bundle.css': ['css/test.less', 'css/test2.less']
				// }
				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.less'],
					dest: 'css/build/',
					ext: '.css',
					extDot: 'last'
				}]
			}
		},
		csslint: {
			strict123: {
				options: {

				},
				src: ['css/build/**/*.css']
			},
			laxed123: {
				options: {
					csslintrc: 'lintrules.json'
				},
				src: ['css/build/**/*.css']
			}
		},
		cssmin: {
			// minTarget: {
			// 	options: {
			// 		"report": "gzip"
			// 	},
			// 	files: {
			// 		'css/build/bundle.min.css': 'css/build/*.css'
			// 	}
			// }
			minTarget2: {
				files: [{
					expand: true,
					cwd: 'css/build/',
					src: ['*.css', '!*.min.css'],
					dest: 'css/build/',
					ext: '.min.css',
					extDot: 'last'
				}, {
					'css/build/bundle.min.css': 'css/build/*.css'
				}]	
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', ['clean', 'tslint', 'typescript', 'jshint', 'uglify', 'htmlhint', 'htmlmin', 'less', 'csslint', 'cssmin']);
};
