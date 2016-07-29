var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var path = require('path');
var jsdom = require('jsdom').jsdom;
console.log(path.resolve(__dirname, '..'));

global.window = jsdom('<!doctype html><html><body></body></html>').defaultView;

require('app-module-path').addPath(path.resolve(__dirname, '..'));

jasmine.loadConfig({
    "spec_dir": "test/spec",
    "spec_files": [
        "**/*_spec.js"
    ],
    "helpers": [
        "../../node_modules/babel-core/register.js"
    ]
});

jasmine.execute();
