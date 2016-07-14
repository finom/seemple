"use strict";

const path = require('path');

module.exports = {
	devtool: 'module-inline-source-map',
	entry: './test/index',
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	resolve: {
		fallback: path.resolve('./')
	},
	module: {
		preLoaders: [
			// transpile all files except testing sources with babel as usual
			{
				test: /\.js$/,
				include: path.resolve('test/'),
				exclude: [
					path.resolve('src/'),
					path.resolve('node_modules/')
				],
				loaders: ['babel', 'eslint']
			},
			// transpile and instrument only testing sources with babel-istanbul
			{
				test: /\.js$/,
				include: path.resolve('src/'),
				loaders: ['babel', 'eslint']
			}
		]
	},
	eslint: {
		configFile: '.eslintrc.json'
	}
};
