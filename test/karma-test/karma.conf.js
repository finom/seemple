const files = ['index.js'];

module.exports = (config) => {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-webpack-with-fast-source-maps'),
            require('karma-sourcemap-loader'),
            require('karma-chrome-launcher')
        ],
        files,
        exclude: [],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        reporters: ['progress', 'coverage'],
        singleRun: false,
        preprocessors: {
            'index.js': ['sourcemap', 'webpack']
        },
        coverageReporter: {
            dir: 'coverage',
            reporters: [{
                type: 'lcov',
                subdir: '.'
            }]
        },
        webpack: Object.assign(require('../webpack-test.config'), {
            devtool: 'cheap-module-source-map',
            entry: [
                '../test/index'
            ]
        })
    });
};
