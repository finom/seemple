const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const path = require('path');
const BannerAndFooterWebpackPlugin = require('./tools/banner-and-footer-webpack-plugin');


module.exports = {

  entry: './src/index',
  output: {
    path: path.resolve(__dirname, '../../bundle'),
    filename: 'seemple.min.js',
    libraryTarget: 'umd',
    library: 'Seemple'
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
    new UnminifiedWebpackPlugin(),
    new BannerAndFooterWebpackPlugin()
  ]
};
