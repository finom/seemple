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
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> (<%= grunt.template.today("dd.mm.yyyy") %>)\nAuthor: <%= pkg.author.name %> <<%= pkg.author.email %>>\nLicense: <%= pkg.license %> \n*/\n'
			},
			dist: {
				files: {
					'build/<%= pkg.name %>.all.min.js': ['<%= concat.dist.dest %>']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat', 'uglify']);
};