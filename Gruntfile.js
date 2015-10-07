/*jshint multistr: true */
module.exports = function(grunt) {
	"use strict";
	var commentMatreshka = '/*\n\tMatreshka v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n\tJavaScript Framework by Andrey Gubanov\n\tReleased under the MIT license\n\tMore info: http://matreshka.io\n*/\n',
		commentMagic = '/*\n\tMatreshka Magic v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>), the part of Matreshka project \n\tJavaScript Framework by Andrey Gubanov\n\tReleased under the MIT license\n\tMore info: http://matreshka.io/#magic\n*/\n',
		pkg = grunt.file.readJSON('package.json'),
		dirtyMatreshkaAMDCleanHack = function() {
			// hack for systemjs builder
			var d = "define";
			// I don't know how to define modules with no dependencies (since we use AMDClean)
			// so I have to hack it, unfortunatelly
			if (typeof __root != 'undefined') {
				/* global matreshka, balalaika, matreshka_magic, xclass, __root */
				if (typeof define == 'function' && define.amd) {
					if(__root[d]) {
						__root[d]('matreshka', function() {
							return matreshka;
						});
						__root[d]('balalaika', function() {
							return matreshka.$b;
						});
						__root[d]('xclass', function() {
							return matreshka.Class;
						});
						__root[d]('matreshka-magic', function() {
							return matreshka_magic;
						});
					}

					define(function() {
						return matreshka;
					});
				} else if (typeof exports == "object") {
					module.exports = matreshka;
				} else {
					__root.Matreshka = __root.MK = matreshka;
					__root.$b = matreshka.$b;
					__root.Class = matreshka.Class;
				}
			}
		},
		dirtyMagicAMDCleanHack = function() {
			// hack for systemjs builder
			var d = "define";
			// I don't know how to define modules with no dependencies (since we use AMDClean)
			// so I have to hack it, unfortunatelly
			if (typeof __root != 'undefined') {
				/* global matreshka, balalaika, matreshka_magic, xclass, __root */
				if (typeof define == 'function' && define.amd) {
					if(__root[d]) {
						__root[d]('matreshka-magic', function() {
							return matreshka_magic;
						});
					}
					define(function() {
						return matreshka_magic;
					});
				} else if (typeof exports == "object") {
					module.exports = matreshka_magic;
				} else {
					__root.magic = __root.MatreshkaMagic = matreshka_magic;
				}
			}
		};

	grunt.initConfig({
		pkg: pkg,
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
				'-W084': "Expected a conditional expression and instead saw an assignment.",
				'-W040': "Possible strict violation.",
				'-W083': "Don't make functions within a loop.",
				'-W093': "Did you mean to return a conditional instead of an assignment?",
				'-W064': "Missing 'new' prefix when invoking a constructor."
			},
			all: ['src/**/*.js', 'Gruntfile.js', '!src/core/dom-lib/balalaika.js', '!src/core/dom-lib/balalaika-extended.js']
		},
		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
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
						start: commentMatreshka
					},
					onModuleBundleComplete: function(data) {
						var fs = require('fs'),
							amdclean = require('amdclean'),
							outputFile = data.path;

						fs.writeFileSync(outputFile, amdclean.clean({
							'filePath': outputFile,
							'transformAMDChecks': false,
							'wrap': {
								'start': ';(function(__root) {\n',
								'end': '\n matreshka.version="' + pkg.version + '";\
									(' + dirtyMatreshkaAMDCleanHack + ')()\
								}(Function("return this")()||(42, eval)("this")));'
							},
						}));
					}
				}
			},
			matreshka_magic: {
				options: {
					baseUrl: 'src',
					name: "matreshka-magic",
					out: "magic/matreshka-magic.js",
					optimize: "none",
					preserveLicenseComments: false,
					paths: {
						matreshka_dir: ''
					},
					wrap: {
						start: commentMagic
					},
					onModuleBundleComplete: function(data) {
						var fs = require('fs'),
							amdclean = require('amdclean'),
							outputFile = data.path;

						fs.writeFileSync(outputFile, amdclean.clean({
							'filePath': outputFile,
							'transformAMDChecks': false,
							'wrap': {
								'start': ';(function(__root) {\n',
								'end': '\n matreshka_magic.version="' + pkg.version + '";\
									(' + dirtyMagicAMDCleanHack + ')()\
								}(Function("return this")()||(42, eval)("this")));'
							},
						}));
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
					sourceMapName: 'magic/matreshka-magic.min.map',
					banner: commentMagic
				},
				src: 'magic/matreshka-magic.js',
				dest: 'magic/matreshka-magic.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('test', ['karma']);
	grunt.registerTask('default', ['jshint', 'requirejs', 'uglify', 'test']);
};
