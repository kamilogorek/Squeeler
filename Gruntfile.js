module.exports = function(grunt) {

    grunt.initConfig({

    // Package
        pkg: grunt.file.readJSON('package.json'),

    // Imagemin
    	imagemin: {
    		options: {
    			pngquant: true
    		},
			dynamic: {
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'src-img',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'img/'                  // Destination path prefix
				}]
			}
		},

    // Clean
        clean: {
            pre: ['styleguide', 'css'],
            post: ['.sass-cache']
        },

	// Autoprefixer
		autoprefixer: {
			options: {
				browsers: ['last 4 version', 'ie 8', 'ie 7']
			},
			src: 'assets/css/style.css',
		},

    // Sass
        sass: {
            dist: {
                options: {
                    debug: 'true',
                    precision: '8',
                    style: 'expanded'
                },
                files: {
                'css/styles.css' : 'sass/styles.scss'
                }
            },
            dev: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/styles.min.css': 'sass/styles.scss'
                }
            }
      },

	// CSS Lint
		csslint: {
			strict: {
				options: {
					import: 2
				},
			src: ['assets/**/*.css']
			},
			lax: {
				options: {
					import: false
				},
				src: ['assets/**/*.css']
			}
		},

	// Modernizr
		modernizr: {
			// [REQUIRED] Path to the build you're using for development.
			"devFile" : "js/src-js/modernizr-dev.js",

			// [REQUIRED] Path to save out the built file.
			"outputFile" : "js/src-js/modernizr-custom.js",

			// Based on default settings on http://modernizr.com/download/
			"extra" : {
			    "shiv" : true,
			    "printshiv" : false,
    			"load" : true,
			    "mq" : false,
		    	"cssclasses" : true
			},

			// Based on default settings on http://modernizr.com/download/
			"extensibility" : {
				"addtest" : false,
				"prefixed" : false,
				"teststyles" : false,
				"testprops" : false,
				"testallprops" : false,
				"hasevents" : false,
				"prefixes" : false,
				"domprefixes" : false
			},

			// By default, source is uglified before saving
			"uglify" : true,

			// By default, this task will crawl your project for references to Modernizr tests.
			// Set to false to disable.
			"parseFiles" : true,

			// When parseFiles = true, matchCommunityTests = true will attempt to
			// match user-contributed tests.
			"matchCommunityTests" : false,
		},

	// JS Uglifier
		uglify: {
			my_target: {
				files: {
					'js/scripts.js': [ 'src-js/modernizr-custom.js', 'src-js/plugins.js', 'src-js/scripts.js']
				}
			}
		},

    // Watch
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: [ 'sass', 'sassdown']
            }
        },

    // Sassdown (Styleguide)
        sassdown: {
            options: {
                template_assets: 'source/styleguide/',
                template_html: 'source/styleguide.hbs',
                includes: 'source/site_includes.hbs'
            },
            files: {
                expand: true,
                cwd: 'sass/partials',
                src: ['**/*.scss'],
                dest: 'styleguide/'
            }
        },

    // Connect Server
        connect: {
			server: {
				options: {
					port: '8080',
					base: '.'
				}
			}
		}

    });

    // Load NPM Tasks
    grunt.loadNpmTasks('sassdown');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks("grunt-modernizr");

    // Register Grunt tasks
    grunt.registerTask('default', [
    	'clean:pre',
    	'autoprefixer',
    	'sass',
    	'sassdown',
    	'csslint',
    	'imagemin',
    	'modernizr',
    	'uglify',
    	'clean:post',
    	'connect',
        'watch'
    ]);

};
