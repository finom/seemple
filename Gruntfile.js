module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [ "src/xclass.js", "src/matreshka.js", "src/object.mk.js", "src/array.mk.js" ],
				dest: 'build/<%= pkg.name %>.all.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\
						\nAuthor: <%= pkg.author.name %> <<%= pkg.author.email %>>\
						\nLicense: <%= pkg.license %>'
			},
			dist: {
				files: {
					'build/<%= pkg.name %>.all.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		//qunit: { // not today :)
		//	files: ['test/**/*.html']
		//},
		//jshint: {
		//	files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
		//	options: {
		//		// options here to override JSHint defaults
		//		globals: {
		//			jQuery: true,
		//			console: true,
		//			module: true,
		//			document: true
		//		}
		//	}
		//},
		//watch: {
		//	files: ['<%= jshint.files %>'],
		//	tasks: ['jshint', 'qunit']
		//}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-contrib-qunit');
	//grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	//grunt.registerTask('test', ['jshint', 'qunit']);

	//grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	grunt.registerTask('default', ['concat', 'uglify']);

};