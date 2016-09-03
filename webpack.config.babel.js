import webpack from 'webpack';
import UnminifiedWebpackPlugin from 'unminified-webpack-plugin';
import BannerAndFooterWebpackPlugin from './tools/banner-and-footer-webpack-plugin';

module.exports = {
    devtool: 'source-map',
    entry: './src/index',
    output: {
        path: `${__dirname}/bundle`,
        filename: 'matreshka.min.js',
        libraryTarget: 'umd',
        library: 'Matreshka'
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
        new UnminifiedWebpackPlugin(),
        new BannerAndFooterWebpackPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
