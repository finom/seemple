const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const BannerAndFooterWebpackPlugin = require('./tools/banner-and-footer-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: './src/index',
    output: {
        path: `${__dirname}/bundle`,
        filename: 'seemple.min.js',
        libraryTarget: 'umd',
        library: 'Seemple'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new UnminifiedWebpackPlugin(),
        new BannerAndFooterWebpackPlugin()
    ]
};
