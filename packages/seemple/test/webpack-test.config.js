const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: [
    // '@babel/polyfill',
    './index'
  ],
  output: {
    path: path.resolve(__dirname, '../../../bundle/test'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve('node_modules/')],
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'browser-test')
    }])
  ]
};
