module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'src',
					name: "matreshka",
					out: "matreshka.min.js",
					preserveLicenseComments: false,
					paths: {
						matreshka_dir: ''
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.registerTask('default', [ 'requirejs' ]);
};