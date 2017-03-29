const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: __dirname,
    entry: [
        'babel-polyfill',
        './index'
    ],
    output: {
        path: path.resolve(__dirname, '../bundle/test'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            src: path.resolve('./src')
        }
    },
    module: {
        rules: [
            // transpile all files except testing sources with babel as usual
            {
                test: /\.js$/,
                include: path.resolve('test/'),
                exclude: [
                    path.resolve('src/'),
                    path.resolve('node_modules/')
                ],
                use: ['babel-loader']
            },
            // transpile and instrument only testing sources with babel-istanbul
            {
                test: /\.js$/,
                include: path.resolve('src/'),
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
