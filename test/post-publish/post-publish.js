const { execSync } = require('child_process');
const { JSDOM } = require('jsdom');
const expect = require('expect.js');


execSync('rm -rf node_modules && npm i --no-package-lock', { cwd: __dirname });

global.window = new JSDOM('<!doctype html><html><body><form><input name="a"></form></body></html>', {
  url: 'http://localhost'
}).window;

global.document = global.window.document;

const Seemple = require('seemple');
const parseForm = require('seemple-parse-form');
const Router = require('seemple-router/router');

// check if seemple itself is OK
const seemple = new Seemple();
seemple.b = 3;
seemple.calc('a', 'b', (b) => b * 2);
expect(seemple.a).to.eql(6);

// check if seemple-parse-form is OK
parseForm(seemple, global.document.querySelector('form'));
expect(global.document.querySelector('input').value).to.eql('6');


const customRouter = new Router('custom');
customRouter.subscribe(seemple, '/a/')
expect(customRouter.path).to.eql('/6/');
