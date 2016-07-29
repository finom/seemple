var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var path = require('path');
var jsdom = require('jsdom').jsdom;
//require("babel-register");

global.window = jsdom('<!doctype html><html><body></body></html>').defaultView;

// TODO
if(false) {
    // if testing source
    require('app-module-path').addPath(path.resolve(__dirname, '../..'));
} else {
    // if testing npm modules

    var copy = require('recursive-copy');

    copy('./npm', './node_modules/src', {overwrite: true}, function(error, results) {
    if (error) {
        console.error('Copy failed: ' + error);
    } else {
        console.info('Copied ' + results.length + ' files');
        jasmine.execute();
    }
});




}

jasmine.loadConfig({
    "spec_dir": "test/spec",
    "spec_files": [
        "**/*_spec.js"
    ],
    "helpers": [
        "../../node_modules/babel-core/register.js"
    ]
});
//jasmine.execute();
//jasmine.execute();
