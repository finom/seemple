module.exports = function(grunt) {
	var commentMatreshka = '/*\n\tMatreshka v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n\tJavaScript Framework by Andrey Gubanov\n\tReleased under the MIT license\n\tMore info: http://matreshka.io\n*/\n',
		commentMagic = '/*\n\tMatreshka Magic v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>), the part of Matreshka project \n\tJavaScript Framework by Andrey Gubanov\n\tReleased under the MIT license\n\tMore info: http://matreshka.io/#magic\n*/\n';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				globals: {
					Symbol: true,
					define: true,
					XDomainRequest: true,
					document: true,
					navigator: true,
					clearTimeout: true,
					setTimeout: true,
					getComputedStyle: true,
					window: true,
					FileReader: true
				},
				// turns off some jshint errors, value is description instead of "true"
				'-W001': "'hasOwnProperty' is a really bad name.",
				'-W014': "Bad line breaking before '{a}'.",
				'-W055': "A constructor name should start with an uppercase letter.",
				'-W030': "Expected an assignment or function call and instead saw an expression.",
				'-W097': "Use the function form of \"use strict\".",
				'-W084': "Expected a conditional expression and instead saw an assignment.",
				'-W040': "Possible strict violation.",
				'-W083': "Don't make functions within a loop.",
				'-W093': "Did you mean to return a conditional instead of an assignment?",
				'-W064': "Missing 'new' prefix when invoking a constructor."
			},
			all: ['src/**/*.js', '!src/balalaika.js', '!src/balalaika-extended.js']
		},
		requirejs: {
			matreshka: {
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
						start: commentMatreshka,
						end: ';\
							if(typeof define==="function"&&define.amd) {\
								define(["matreshka"],function(MK){\
									MK.version="<%= pkg.version %>";\
									return MK;\
								});\
							} else {\
								Matreshka.version="<%= pkg.version %>";\
								if(typeof exports=="object") module.exports=Matreshka;\
							}'
					}
				}
			},
			matreshka_magic: {
				options: {
					baseUrl: 'src',
					name: "matreshka-magic",
					out: "matreshka-magic.js",
					optimize: "none",
					preserveLicenseComments: false,
					paths: {
						matreshka_dir: ''
					},
					wrap: {
						start: commentMagic,
						end: ';\
							if(typeof define==="function"&&define.amd) {\
								define(["matreshka-magic"],function(magic){\
									magic.version="<%= pkg.version %>";\
									return magic;\
								});\
							} else {\
								magic.version="<%= pkg.version %>";\
								if(typeof exports=="object") module.exports=magic;\
							}'
					}
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true,
				maxLineLen: 1000,
				compress: {
					keep_fnames: 1
				},
				mangle: {
					keep_fnames: 1
				}
			},
			matreshka: {
				options: {
					sourceMapName: 'matreshka.min.map',
					banner: commentMatreshka
				},
				src: 'matreshka.js',
				dest: 'matreshka.min.js'
			},
			matreshka_magic: {
				options: {
					sourceMapName: 'matreshka-magic.min.map',
					banner: commentMagic
				},
				src: 'matreshka-magic.js',
				dest: 'matreshka-magic.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', [ 'jshint', 'requirejs', 'uglify' ]);
};
