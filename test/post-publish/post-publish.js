const { execSync } = require('child_process');
const { JSDOM } = require('jsdom');
var expect = require('expect.js');


execSync('rm -rf node_modules && npm i --no-package-lock', { cwd: __dirname });

global.window = new JSDOM('<!doctype html><html><body><form><input name="foo"></form></body></html>', {
  url: 'http://localhost'
}).window;

global.document = global.window.document;

const Seemple = require('seemple');
const parseForm = require('seemple-parse-form');
const SeempleRouter = require('seemple-router');

// check if seemple itself is OK
const seemple = new Seemple();
seemple.b = 3;
seemple.calc('a', 'b', (b) => b * 2);
expect(seemple.a).to.eql(6);

parseForm(global.document.querySelector('form'));
