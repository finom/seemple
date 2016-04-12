/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*const testsContext = require.context('./spec/', true, /.*\.js$/);
	testsContext.keys().forEach(testsContext);
	const componentsContext = require.context('../src/', true, /.*index\.js$/);
	componentsContext.keys().forEach(componentsContext);
	*/

	// test/test_index.js

	// This gets replaced by karma webpack with the updated files on rebuild
	var __karmaWebpackManifest__ = [];

	// require all modules ending in "_test" from the
	// current directory and all subdirectories
	var testsContext = __webpack_require__(1);

	function inManifest(path) {console.log(path);
	  return __karmaWebpackManifest__.indexOf(path) >= 0;
	}

	var runnable = testsContext.keys().filter(inManifest);

	// Run all tests if we didn't find any changes
	if (!runnable.length) {
	  runnable = testsContext.keys();
	}

	runnable.forEach(testsContext);


	const componentsContext = __webpack_require__(4);
	componentsContext.keys().forEach(componentsContext);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./test_spec.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var wow = __webpack_require__(3);

	describe("A suite", function () {
	  it("contains spec with an expectation", function () {
	    expect(wow()).toBe(21);
	  });
	});

		console.log($);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = ozozo;
	function ozozo() {
		return 21;
		}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./array.js": 5,
		"./binders.js": 6,
		"./class.js": 3,
		"./index.js": 7,
		"./matreshka.js": 8,
		"./object.js": 9
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 4;


/***/ },
/* 5 */
/***/ function(module, exports) {

	

/***/ },
/* 6 */
/***/ function(module, exports) {

	

/***/ },
/* 7 */
/***/ function(module, exports) {

	

/***/ },
/* 8 */
/***/ function(module, exports) {

	

/***/ },
/* 9 */
/***/ function(module, exports) {

	

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map