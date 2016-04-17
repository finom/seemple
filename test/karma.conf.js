var fs = require('fs'),
	path = require('path'),
	files = ['test/index.js'];

process.argv.forEach((val, index, array) => {
	val = val.split('=');
	if (val[0] == 'dom-library') {
		files.unshift(`test/vendor/${val[1]}.js`);
	}
});

module.exports = function(config) {
	"use strict";
	config.set({
		basePath: '..',
		frameworks: ['jasmine'],
		plugins: [
			require('karma-jasmine'),
			require('karma-coverage'),
			require('karma-webpack-with-fast-source-maps'),
			require('karma-sourcemap-loader'),
			require('karma-chrome-launcher')
		],
		files: files,
		exclude: [],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'],
		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},
		reporters: ['progress', 'coverage'],
		singleRun: false,
		preprocessors: {
			'test/index.js': ['sourcemap', 'webpack']
		},
		coverageReporter: {
			dir: 'coverage',
			reporters: [{
				type: 'lcov',
				subdir: '.'
			}]
		},
		webpack: require('./webpack.config')
	});
};


// Karma configuration
// Generated on Sun Aug 16 2015 13:55:06 GMT+0300 (EEST)
/*var fs = require('fs');
module.exports = function(config) {
	"use strict";

	config.set({
		basePath: '..',
		frameworks: ['jasmine'],
		plugins: [
			require('karma-babel-preprocessor'),
			require('karma-jasmine'),
			require('karma-commonjs'),
			require('karma-chrome-launcher'),
			require('karma-coverage')
		],
		files: [
			'test/spec/ ** /*_spec.js'
		],
		exclude: [],
		reporters: ['progress', 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'],
		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},
		singleRun: false,
		preprocessors: {
			//'src/* * /*.js': ['babel', 'coverage'],
			'test/spec/** /*.js': ['babel', 'commonjs']
		},
		/*coverageReporter: {
			type: 'lcov',
			dir: 'coverage',
			subdir: '.'
		},*
		babelPreprocessor: {
			options: {
				/*sourceMap: 'inline',
				presets: ["es2015"],* /
				plugins: ["transform-es2015-modules-simple-commonjs"]
			}
		}
	});
};


/*
*/
