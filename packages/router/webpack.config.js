const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, '../../bundle'),
    filename: 'seemple-router.min.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  externals: {
    seemple: {
      commonjs: 'seemple',
      commonjs2: 'seemple',
      amd: 'seemple',
      root: 'Seemple'
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static', to: '.' }
    ])
  ]
};
