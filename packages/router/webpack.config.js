
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
                use: ['babel-loader']
            }
        ]
    },

    resolve: {
        alias: {
            seemple: path.resolve(__dirname, '../seemple/src')
        }
    },

    externals: {
         seemple: {
             commonjs: 'seemple',
             commonjs2: 'seemple',
             amd: 'seemple',
             root: 'seemple'
         }
     }
};
