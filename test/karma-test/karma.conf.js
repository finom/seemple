var fs = require('fs'),
	path = require('path'),
	files = ['index.js'];

process.argv.forEach((val, index, array) => {
	val = val.split('=');
	if (val[0] == 'dom-library') {
		files.unshift(`karma-test/vendor-dom-libraries/${val[1]}.js`);
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
			'index.js': ['sourcemap', 'webpack']
		},
		coverageReporter: {
			dir: 'coverage',
			reporters: [{
				type: 'lcov',
				subdir: '.'
			}]
		},
		webpack: Object.assign(require('../webpack-test.config'), {
			devtool: 'cheap-module-source-map'
		})
	});
};
