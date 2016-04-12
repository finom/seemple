path = require('path');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: './test/index',
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	module: {

		preLoaders: [
			// transpile all files except testing sources with babel as usual
			{
				test: /\.js$/,
				include: [
					path.resolve('test/spec/'),
					path.resolve('src/')
				],
				loader: 'babel'
			}
		]
	}
}
