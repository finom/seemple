module.exports = function(grunt) {
	var commentMatreshka = '/*\n\tMatreshka v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n\tJavaScript Framework by Andrey Gubanov\n\tReleased under the MIT license\n\tMore info: http://matreshka.io\n*/\n',
		commentMagic = '/*\n\tMatreshka Magic v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>), the part of Matreshka project \n\tJavaScript Framework by Andrey Gubanov\n\tReleased under the MIT license\n\tMore info: http://matreshka.io/#magic\n*/\n';
		
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.registerTask('default', [ 'requirejs', 'uglify' ]);
};