"use strict";

const path = require('path');
const webpack = require('webpack');
module.exports = {
	devtool: 'source-map',
	entry: './src/index',
	output: {
		path: `${__dirname}/dist`,
		filename: "matreshka.js",
        libraryTarget: 'umd'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel']
			}
		]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})
	]
};
