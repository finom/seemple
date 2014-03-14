module.exports = function(grunt) {
	var srcs = [ "src/balalaika.js", "src/balalaika-plugins.js", "src/xclass.js", "src/matreshka-core.js", "src/matreshka-binders.js", "src/matreshka-object.js", "src/matreshka-array.js" ];
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: srcs,
				dest: 'build/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("dd.mm.yyyy") %>)\nAuthor: <%= pkg.author.name %> <<%= pkg.author.email %>>\nLicense: <%= pkg.license %> \n*/\n'
			},
			dist: {
				files: {
					'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint: {
			/*
			ignore_warning: { // doesn't work, so I'm keeping jslint for future
				options: {
					'-W097': true, // Use the function form of "use strict".
					'-W099': true, // Mixed spaces and tabs. (it's needed for better jsdoc comments formatting)
					'-W064': true // Missing 'new' prefix when invoking a constructor. (Class function calls without 'new' operator)
				}
			},*/
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				
				globals: {
					$b: true, // Balalaika
					Matreshka: true,
					MK: true
				}
			},
			src: [ 'Gruntfile.js', 'src/*.js']
		}
		
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', [ 'concat', 'uglify' ]);
};