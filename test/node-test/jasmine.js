const Jasmine = require('jasmine');
const path = require('path');
const { jsdom } = require('jsdom');
const appModulePath = require('app-module-path');

const jasmine = new Jasmine();

global.window = jsdom('<!doctype html><html><body></body></html>').defaultView;

appModulePath.addPath(path.resolve(__dirname, '../..'));

jasmine.loadConfig({
    spec_dir: 'test/spec',
    spec_files: [
        '**/*_spec.js'
    ]
});

jasmine.execute();
