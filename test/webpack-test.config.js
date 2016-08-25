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
                loaders: ['babel']
            },
            // transpile and instrument only testing sources with babel-istanbul
            {
                test: /\.js$/,
                include: path.resolve('src/'),
                loaders: ['babel']
            }
        ]
    },
    eslint: {
        configFile: '.eslintrc.json'
    },
    plugins: [
        new CopyWebpackPlugin([{
            from:  path.resolve(__dirname, 'browser-test')
        }])
    ]
};
