const Jasmine = require('jasmine');
const path = require('path');
const { JSDOM } = require('jsdom');
const appModulePath = require('app-module-path');
const { SpecReporter } = require('jasmine-spec-reporter');

const jasmine = new Jasmine();

global.window = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost'
}).window;

appModulePath.addPath(path.resolve(__dirname, '../..'));

jasmine.loadConfig({
    spec_dir: 'test/spec',
    spec_files: [
        '**/*_spec.js'
    ]
});

jasmine.addReporter(new SpecReporter());

jasmine.execute();
