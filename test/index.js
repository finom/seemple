const testsContext = require.context('./spec/', true, /.*\.js$/);
testsContext.keys().forEach(testsContext);
const componentsContext = require.context('../src/', true, /.*index\.js$/);
componentsContext.keys().forEach(componentsContext);

/*
// test/test_index.js

// This gets replaced by karma webpack with the updated files on rebuild
var __karmaWebpackManifest__ = [];

// require all modules ending in "_test" from the
// current directory and all subdirectories
var testsContext = require.context("./spec/", true,  /.*\.js$/);

function inManifest(path) {console.log(path);
  return __karmaWebpackManifest__.indexOf(path) >= 0;
}

var runnable = testsContext.keys().filter(inManifest);

// Run all tests if we didn't find any changes
if (!runnable.length) {
  runnable = testsContext.keys();
}

runnable.forEach(testsContext);


const componentsContext = require.context('../src/', true, /.*\.js$/);
componentsContext.keys().forEach(componentsContext);
*/
