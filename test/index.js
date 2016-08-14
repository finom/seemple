// This gets replaced by karma webpack with the updated files on rebuild
const __karmaWebpackManifest__ = [];

// require all modules from the
// current directory and all subdirectories
const testsContext = require.context('./spec/', true, /.*\.js$/);

function inManifest(path) {
    return __karmaWebpackManifest__.indexOf(path) >= 0;
}

let runnable = testsContext.keys().filter(inManifest);

// Run all tests if we didn't find any changes
if (!runnable.length) {
    runnable = testsContext.keys();
}

runnable.forEach(testsContext);

const componentsContext = require.context('../src/', true, /.*\.js$/);
componentsContext.keys().forEach(componentsContext);
