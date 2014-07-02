module.exports = function(grunt) {
	var comment = '/*\nMatreshka v<%= pkg.version %>\nJavaScript Framework by Andrey Gubanov\nReleased under the MIT license\nBuilt: <%= grunt.template.today("yyyy-mm-dd") %>\nMore info: http://finom.github.io/matreshka/\n*/\n'
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'src',
					name: "matreshka",
					out: "matreshka.js",
					optimize: "none",
					preserveLicenseComments: false,
					paths: {
						matreshka_dir: ''
					},
					wrap: {
						start: comment
					}
				}
			}
		},
		uglify: {
			options: {
				banner: comment
			},
			build: {
				src: 'matreshka.js',
				dest: 'matreshka.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.registerTask('default', [ 'requirejs', 'uglify' ]);
};