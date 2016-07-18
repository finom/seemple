/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This gets replaced by karma webpack with the updated files on rebuild
	var __karmaWebpackManifest__ = [];
	
	// require all modules ending in "_test" from the
	// current directory and all subdirectories
	var testsContext = __webpack_require__(1);
	
	function inManifest(path) {
		return __karmaWebpackManifest__.indexOf(path) >= 0;
	}
	
	var runnable = testsContext.keys().filter(inManifest);
	
	// Run all tests if we didn't find any changes
	if (!runnable.length) {
		runnable = testsContext.keys();
	}
	
	runnable.forEach(testsContext);
	
	var componentsContext = __webpack_require__(44);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 61,
		"./bquery/add_spec.js": 2,
		"./bquery/create_spec.js": 17,
		"./bquery/events_spec.js": 18,
		"./bquery/find_spec.js": 20,
		"./bquery/init_spec.js": 21,
		"./bquery/is_spec.js": 22,
		"./bquery/not_spec.js": 23,
		"./bquery/one_spec.js": 24,
		"./bquery/parsehtml_spec.js": 25,
		"./class_spec.js": 26,
		"./events/delegated_collection_spec.js": 28,
		"./events/delegated_spec.js": 29,
		"./events/events_change_spec.js": 40,
		"./events/events_core_spec.js": 41,
		"./events/events_dom_spec.js": 42,
		"./events/events_summary_spec.js": 43
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

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.fn.add', function () {
		it('adds once', function () {
			var el1 = document.createElement('div'),
			    el2 = document.createElement('div'),
			    el3 = document.createElement('div'),
			    el4 = document.createElement('div'),
			    el5 = document.createElement('div');
	
			expect([...$([el1, el2, el3]).add([el2, el3, el4, el5])]).toEqual([el1, el2, el3, el4, el5]);
		});
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	var extend = __webpack_require__(6);
	
	var parseHTML = __webpack_require__(7);
	
	var one = __webpack_require__(8);
	
	var create = __webpack_require__(9);
	
	var on = __webpack_require__(10);
	
	var off = __webpack_require__(13);
	
	var is = __webpack_require__(12);
	
	var add = __webpack_require__(14);
	
	var not = __webpack_require__(15);
	
	var find = __webpack_require__(16);
	
	// tiny jQuery replacement for Matreshka
	// bQuery is rewritten version of balalaika.js
	module.exports = bQuery;
	function bQuery(selector, context) {
		return new Init(selector, context);
	}
	
	var _result = bQuery;
	
	for (var _source3 = {
		fn: Init.prototype,
		extend: extend,
		parseHTML: parseHTML,
		one: one,
		create: create
	}, _keys3 = Object.keys(_source3), _l3 = _keys3.length, _i3 = 0, _key3; _i3 < _l3; _i3++) {
		_key3 = _keys3[_i3];
		_result[_key3] = _source3[_key3];
	}
	
	var _result2 = bQuery.fn;
	
	for (var _source4 = {
		on: on,
		off: off,
		is: is,
		add: add,
		not: not,
		find: find
	}, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
		_key4 = _keys4[_i4];
		_result2[_key4] = _source4[_key4];
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(5);
	
	// function-constructor of bQuery library
	// accepts many kinds of arguments (selector, html, function)
	function BQueryInit(selector, context) {
		var result = void 0;
	
		if (selector) {
			if (selector.nodeType || typeof window === 'object' && selector === window) {
				result = [selector];
			} else if (typeof selector === 'string') {
				if (/</.test(selector)) {
					result = html2nodeList(selector);
				} else {
					if (context) {
						var newContext = new BQueryInit(context)[0];
	
						if (newContext) {
							result = newContext.querySelectorAll(selector);
						}
					} else {
						result = document.querySelectorAll(selector);
					}
				}
			} else if (selector instanceof Function) {
				// typeof nodeList returns "function" in old WebKit
				if (document.readyState === 'loading') {
					document.addEventListener('DOMContentLoaded', selector);
				} else {
					selector();
				}
			} else {
				result = selector;
			}
		}
	
		var length = result && result.length;
	
		if (length) {
			for (var i = 0; i < length; i++) {
				this.push(result[i]);
			}
		}
	}
	
	BQueryInit.prototype = [];
	
	module.exports = BQueryInit;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	// converts HTML string to NodeList instance
	module.exports = html2nodeList;
	function html2nodeList(html) {
		// wrapMap is taken from jQuery
		var wrapMap = {
			option: [1, '<select multiple="multiple">', '</select>'],
			legend: [1, '<fieldset>', '</fieldset>'],
			thead: [1, '<table>', '</table>'],
			tr: [2, '<table><tbody>', '</tbody></table>'],
			td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
			col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
			area: [1, '<map>', '</map>'],
			_: [0, '', '']
		};
	
		var node = document.createElement('div'),
		    i = void 0;
	
		html = html.replace(/^\s+|\s+$/g, '');
	
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
	
		var ex = /<([\w:]+)/.exec(html),
		    wrapper = ex && wrapMap[ex[1]] || wrapMap._;
	
		node.innerHTML = wrapper[1] + html + wrapper[2];
	
		i = wrapper[0];
	
		while (i--) {
			node = node.children[0];
		}
	
		return node.childNodes;
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// Object.assign polyfyll is taken there:
	// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
	// and will be removed in future
	
	var assign = Object.assign || function assign(target) {
		/* istanbul ignore next */
		if (target === undefined || target === null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}
	
		var output = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source !== undefined && source !== null) {
				for (var nextKey in source) {
					if (source.hasOwnProperty(nextKey)) {
						output[nextKey] = source[nextKey];
					}
				}
			}
		}
	
		return output;
	};
	
	module.exports = assign;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(5);
	
	var Init = __webpack_require__(4);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
		return new Init(html2nodeList(html));
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
		return new Init(s, context)[0];
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	// creates HTML element
	module.exports = create;
	function create(tagName, props) {
		if (typeof tagName === 'object') {
			props = tagName;
			tagName = props.tagName;
		}
	
		var el = document.createElement(tagName);
	
		if (props) {
			for (var _target3 = props, _keys4 = Object.keys(_target3), _i4 = 0, key, value, _l5 = _keys4.length; (key = _keys4[_i4], value = _target3[key]), _i4 < _l5; _i4++) {
				if (key === 'attributes' && typeof value === 'object') {
					for (var _target = value, _keys = Object.keys(_target), _i = 0, attrName, attrValue, _l = _keys.length; (attrName = _keys[_i], attrValue = _target[attrName]), _i < _l; _i++) {
						el.setAttribute(attrName, attrValue);
					}
				} else if (key === 'children' && value) {
					for (var _target2 = value, _index = 0, child, _l2 = _target2.length; child = _target2[_index], _index < _l2; _index++) {
						el.appendChild(create(child));
					}
				} else if (el[key] && typeof el[key] === 'object' && typeof value === 'object') {
					var _result = el[key];
	
					for (var _source2 = value, _keys3 = Object.keys(_source2), _l4 = _keys3.length, _i3 = 0, _key2; _i3 < _l4; _i3++) {
						_key2 = _keys3[_i3];
						_result[_key2] = _source2[_key2];
					}
				} else if (key !== 'tagName') {
					el[key] = value;
				}
			}
		}
	
		return el;
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(11);
	
	var is = __webpack_require__(12);
	
	// the function is used when a selector is given
	function delegateHandler(evt, selector, handler) {
		var randomID = Math.random().toString().replace('0.', 'x'),
		    scopeSelector = '[' + randomID + '="' + randomID + '"] ',
		    splittedSelector = selector.split(',');
	
		var matching = '';
	
		for (var i = 0; i < splittedSelector.length; i++) {
			var sel = splittedSelector[i];
			matching += '' + (i === 0 ? '' : ',') + scopeSelector + sel + ',' + scopeSelector + sel + ' *';
		}
	
		this.setAttribute(randomID, randomID);
	
		if (is.call([evt.target], matching)) {
			handler.call(this, evt);
		}
	
		this.removeAttribute(randomID);
	}
	
	// adds event listener to a set of elemnts
	module.exports = on;
	function on(names, selector, handler) {
		var delegate = void 0;
	
		if (typeof selector === 'function') {
			handler = selector;
			selector = null;
		}
	
		if (selector) {
			delegate = function uniqueDelegateHandler(evt) {
				delegateHandler.call(this, evt, selector, handler);
			};
		}
	
		names = names.split(/\s/);
	
		for (var i = 0; i < names.length; i++) {
			var name = names[i].split(/\.(.+)/);
			var namespace = name[1];
			name = name[0];
	
			for (var j = 0; j < this.length; j++) {
				var node = this[j],
				    nodeID = node.b$ = node.b$ || ++data.nodeIndex,
				    events = data.allEvents[name + nodeID] = data.allEvents[name + nodeID] || [];
	
				var exist = false;
	
				for (var k = 0; k < events.length; k++) {
					var event = events[k];
	
					if (handler === event.handler && (!selector || selector === event.selector)) {
						exist = true;
						break;
					}
				}
	
				if (!exist) {
					events.push({
						delegate: delegate,
						handler: handler,
						namespace: namespace,
						selector: selector
					});
	
					node.addEventListener(name, delegate || handler, false);
				}
			}
		}
	
		return this;
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
		nodeIndex: 0,
		allEvents: {}
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
		var node = this[0];
		return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(11);
	
	// removes event handler from a set of elements
	module.exports = off;
	function off(names, selector, handler) {
		if (typeof selector === 'function') {
			handler = selector;
			selector = null;
		}
	
		names = names.split(/\s/);
	
		for (var i = 0; i < names.length; i++) {
			var name = names[i].split(/\.(.+)/);
			var namespace = name[1];
			name = name[0];
	
			for (var j = 0; j < this.length; j++) {
				var node = this[j],
				    events = data.allEvents[name + node.b$];
	
				if (events) {
					for (var k = 0; k < events.length; k++) {
						var event = events[k];
						if ((!handler || handler === event.handler || handler === event.delegate) && (!namespace || namespace === event.namespace) && (!selector || selector === event.selector)) {
							node.removeEventListener(name, event.delegate || event.handler);
							events.splice(k--, 1);
						}
					}
				} else {
					if (!namespace && !selector) {
						node.removeEventListener(name, handler);
					}
				}
			}
		}
	
		return this;
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	var data = __webpack_require__(11);
	
	// adds unique nodes to bQuery collection
	module.exports = add;
	function add(selector) {
		var idMap = {};
	
		var result = void 0,
		    nodeID = void 0,
		    node = void 0,
		    i = void 0;
	
		selector = new Init(selector);
	
		if (this.length) {
			result = new Init(this);
			for (i = 0; i < result.length; i++) {
				node = result[i];
				nodeID = node.b$ = node.b$ || ++data.nodeIndex;
				idMap[nodeID] = 1;
			}
	
			for (i = 0; i < selector.length; i++) {
				node = selector[i];
				nodeID = node.b$ = node.b$ || ++data.nodeIndex;
				if (!idMap[nodeID]) {
					idMap[nodeID] = 1;
					result.push(node);
				}
			}
		} else {
			result = selector;
		}
	
		return result;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	// excludes elements from current set by given selector
	module.exports = not;
	function not(selector) {
		var result = new Init();
	
		for (var i = 0; i < this.length; i++) {
			if (!new Init(this[i]).is(selector)) {
				result.push(this[i]);
			}
		}
	
		return result;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	// get the descendants of each element in the current set of matched elements,
	// filtered by a selector
	module.exports = find;
	function find(selector) {
		var result = new Init();
	
		for (var _target = this, _index = 0, el, _l = _target.length; el = _target[_index], _index < _l; _index++) {
			result = result.add(el.querySelectorAll(selector));
		}
	
		return result;
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.create', function () {
		it('creates element', function () {
			expect($.create('div').tagName).toEqual('DIV');
		});
	
		it('adds a property', function () {
			expect($.create('div', {
				className: 'foobar'
			}).className).toEqual('foobar');
		});
	
		it('creates childen', function () {
			expect($.create('div', {
				children: [{
					tagName: 'span'
				}]
			}).children[0].tagName).toEqual('SPAN');
		});
	
		it('adds attribute', function () {
			expect($.create('div', {
				attributes: {
					foo: 'bar'
				}
			}).getAttribute('foo')).toEqual('bar');
		});
	
		it('allows to pass object with tagName property', function () {
			expect($.create({
				tagName: 'div'
			}).tagName).toEqual('DIV');
		});
	
		xit('extends dataset object', function () {
			// TODO
		});
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var $ = __webpack_require__(3);
	
	var simulateClick = __webpack_require__(19);
	
	describe('bQuery events', function () {
		var testSandbox = void 0,
		    child1 = void 0,
		    child2 = void 0,
		    grandchild1 = void 0,
		    handler = void 0;
	
		beforeEach(function () {
			testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t\t<div class="child1">\n\t\t\t\t<div class="grandchild1"></div>\n\t\t\t</div>\n\t\t\t<div class="child2"></div>\n\t\t';
	
			child1 = testSandbox.querySelector('.child1');
			child2 = testSandbox.querySelector('.child2');
			grandchild1 = testSandbox.querySelector('.grandchild1');
	
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		afterEach(function () {
			$([testSandbox, child1, child2, grandchild1]).off('click');
		});
	
		it('Adds event listener', function () {
			$(testSandbox).on('click', handler);
			simulateClick(testSandbox);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Removes event listener (listener is specified)', function () {
			$(testSandbox).on('click', handler).off('click', handler);
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes event listener (listener is not specified)', function () {
			$(testSandbox).on('click', handler).off('click');
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Adds namespaced listener', function () {
			$(testSandbox).on('click.yo', handler);
			simulateClick(testSandbox);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Removes namespaced listener (listener is specified)', function () {
			$(testSandbox).on('click.yo', handler).off('click.yo', handler);
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes namespaced listener (listener is not specified)', function () {
			$(testSandbox).on('click.yo', handler).off('click.yo');
			simulateClick(testSandbox);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Adds bubbling event listener', function () {
			$(testSandbox).on('click', handler);
			simulateClick(grandchild1);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Adds delegated event listener', function () {
			$(testSandbox).on('click', '.child1', handler);
			simulateClick(child1);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Adds delegated event listener (click on grandchildren)', function () {
			$(testSandbox).on('click', '.child1', handler);
			simulateClick(grandchild1);
			expect(handler).toHaveBeenCalled();
		});
	
		it('Doesn\t trigger when clicked on wrong child', function () {
			$(testSandbox).on('click', '.child2', handler);
			simulateClick(grandchild1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector and handler are specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click', '.child1', handler);
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector is specified, handler is not specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click', '.child1');
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector is not specified, handler is specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click', handler);
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Removes delegated event listener (selector and handler are not specified)', function () {
			$(testSandbox).on('click', '.child1', handler).off('click');
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('Stops propagation', function () {
			$(testSandbox).on('click', handler);
			$(child1).on('click', function (evt) {
				return evt.stopPropagation();
			});
			simulateClick(child1);
			expect(handler).not.toHaveBeenCalled();
		});
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	// simulates click on a node
	module.exports = simulateClick;
	function simulateClick(node) {
		var evt = document.createEvent('MouseEvent');
		evt.initMouseEvent('click', true);
		node.dispatchEvent(evt);
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.fn.find', function () {
		var testSandbox = void 0,
		    grandChild = void 0;
	
		beforeEach(function () {
			testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t\t<div class="child">\n\t\t\t\t<div class="grandchild"></div>\n\t\t\t</div>\n\t\t';
	
			grandChild = testSandbox.querySelector('.grandchild');
		});
	
		it('finds', function () {
			expect([...$(testSandbox).find('.grandchild')]).toEqual([grandChild]);
		});
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	// засунуть все создания новых элементов в beforeEach
	// рефакторить
	// написать комментарии (в том числе и к уже реализованным функциям)
	// после всего нужно включить линтер и проверить коверадж
	
	describe('bQuery initialization', function () {
		var testSandbox = void 0;
	
		beforeEach(function () {
			testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t\t<div class="test">\n\t\t\t\t<div class="test-1"></div>\n\t\t\t\t<div class="test-2"></div>\n\t\t\t\t<div class="test-3"></div>\n\t\t\t</div>\n\t\t';
		});
	
		it('accepts window', function () {
			var result = $(window);
			expect(result.length).toEqual(1);
			expect(result[0]).toEqual(window);
		});
	
		it('accepts document', function () {
			var result = $(document);
			expect(result.length).toEqual(1);
			expect(result[0]).toEqual(document);
		});
	
		it('parses HTML', function () {
			var result = $('<div></div><span></span>');
	
			expect(result.length).toEqual(2);
			expect(result[0].tagName).toEqual('DIV');
			expect(result[1].tagName).toEqual('SPAN');
		});
	
		it('converts array-like', function () {
			var children = testSandbox.querySelectorAll('*'),
			    result = $(children);
	
			expect(children.length).toEqual(result.length);
	
			for (var i = 0; i < children.length; i++) {
				expect(children[i]).toEqual(result[i]);
			}
		});
	
		it('Converts one element', function () {
			var element = document.querySelector('*'),
			    result = $(element);
	
			expect(result.length).toEqual(1);
			expect(element).toEqual(result[0]);
		});
	
		it('Uses context', function () {
			expect($('.test-1', testSandbox).length).toEqual(1);
		});
	
		it('Uses context', function () {
			expect($('.test-1', '.wrong-context').length).toEqual(0);
		});
	
		it('Allows to use null', function () {
			expect($(null).length).toEqual(0);
		});
	
		it('Allows to use undefined', function () {
			expect($().length).toEqual(0);
		});
	
		it('Allows to create plugins', function () {
			$.fn.bQueryPlugin = function bQueryPlugin() {
				expect(this.length).toEqual(testSandbox.querySelectorAll('*').length);
			};
	
			spyOn($.fn, 'bQueryPlugin');
	
			$('*', testSandbox).bQueryPlugin();
	
			expect($.fn.bQueryPlugin).toHaveBeenCalled();
		});
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.fn.not', function () {
		it('checks className', function () {
			var el = document.createElement('div');
			el.className = 'el';
	
			expect($(el).is('.el')).toEqual(true);
	
			expect($(el).is('.el2')).toEqual(false);
		});
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.fn.not', function () {
		it('excludes by selector', function () {
			var el1 = document.createElement('div'),
			    el2 = document.createElement('div'),
			    el3 = document.createElement('div');
	
			el2.className = 'el2';
	
			expect([...$([el1, el2, el3]).not('.el2')]).toEqual([el1, el3]);
		});
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.one', function () {
		it('finds', function () {
			var testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t<div class="child">\n\t\t\t<div class="grandchild"></div>\n\t\t</div>\n\t\t<div class="child2">\n\t\t\t<div class="grandchild2"></div>\n\t\t</div>\n\t\t';
	
			var child = testSandbox.querySelector('.child');
	
			expect($.one('*', testSandbox)).toEqual(child);
		});
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.parseHTML', function () {
		it('parses HTML', function () {
			var result = $.parseHTML('<div></div><span></span>');
	
			expect(result.length).toEqual(2);
			expect(result[0].tagName).toEqual('DIV');
			expect(result[1].tagName).toEqual('SPAN');
		});
	
		it('parses contextual elements', function () {
			var result = $.parseHTML('<td></td><td></td>');
	
			expect(result.length).toEqual(2);
			expect(result[0].tagName).toEqual('TD');
			expect(result[1].tagName).toEqual('TD');
		});
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(27);
	
	describe('Class function', function () {
		it('allows to inherit', function () {
			var A = Class({ a: true }),
			    B = Class({ b: true, extends: A }),
			    C = Class({ c: true, extends: B }),
			    inst = new C();
	
			expect(inst instanceof A).toBeTruthy();
			expect(inst instanceof B).toBeTruthy();
			expect(inst instanceof C).toBeTruthy();
	
			expect(inst.a).toBeTruthy();
			expect(inst.b).toBeTruthy();
			expect(inst.c).toBeTruthy();
		});
	
		it('allows to pass static props', function () {
			var A = Class({}, { staticProp: true });
			expect(A.staticProp).toBeTruthy();
		});
	
		it('if new Class({}) is called return its instance', function () {
			var inst = new Class({ a: true });
			expect(inst.a).toBeTruthy();
			expect(inst instanceof Class).toBeFalsy();
		});
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(6);
	
	module.exports = Class;
	function Class(prototype, staticProps) {
		var Constructor = prototype.constructor !== Object ? prototype.constructor : function EmptyConstructor() {},
	
		//extends is kept for backward compatibility
		Parent = prototype.extends || prototype.extend,
	
		//inherit proto from class parent or empty object
		proto = Object.create(Parent ? Parent.prototype : {});
	
		extend(proto, prototype);
	
		if (typeof staticProps === 'object') {
			extend(Constructor, staticProps);
		}
	
		// for backward compatibility
		proto.instanceOf = function instanceOf() {
			return this instanceof Constructor;
		};
	
		Constructor.prototype = proto;
	
		// if new Class({}) is called return its instance
		if (this instanceof Class) {
			return new Constructor();
		} else {
			return Constructor;
		}
	}

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	/*eslint-disable */
	xdescribe('Delegated events: delegateListener, undelegateListener (Matreshka.Object and Matreshka.Array)', function () {
		it('works with "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({});
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', {});
	
			magic.trigger(obj.x, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('removes "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({});
	
			magic._undelegateListener(obj, '*', 'someevent');
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes "*" events (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', {});
	
			magic._undelegateListener(obj, '*', 'someevent');
	
			magic.trigger(obj.x, 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes "*" events using callback (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false,
			    callback = function (evt) {
				return bool = true;
			};
	
			magic._delegateListener(obj, '*', 'someevent', callback);
	
			obj.push({});
	
			magic._undelegateListener(obj, '*', 'someevent', callback);
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes "*" events using callback (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false,
			    callback = function (evt) {
				return bool = true;
			};
	
			magic._delegateListener(obj, '*', 'someevent', callback);
	
			obj.jset('x', {});
	
			magic._undelegateListener(obj, '*', 'someevent', callback);
	
			magic.trigger(obj.x, 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('works with "*" events (MK.Array), go deeper (*.a)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({
				a: {}
			});
	
			magic.trigger(obj[0].a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object), go deeper (*.a)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', {
				a: {}
			});
	
			magic.trigger(obj.x.a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Array), go deeper (*.*)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push(new MK.Array({}));
	
			magic.trigger(obj[0][0], 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object), go deeper (*.*)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', new MK.Object({
				a: {}
			}));
	
			magic.trigger(obj.x.a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Array), go deeper (*.*.a)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.push(new MK.Array({
				a: {}
			}));
	
			magic.trigger(obj[0][0].a, 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Object), go deeper (*.*.a)', function () {
			var obj = new MK.Object(),
			    bool = false;
	
			magic._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.jset('x', new MK.Object({
				y: new MK.Object({
					a: {}
				})
			}));
	
			magic.trigger(obj.x.y.a, 'someevent');
	
			expect(bool).toBe(true);
		});
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(30);
	
	var undelegateListener = __webpack_require__(37);
	
	var triggerOne = __webpack_require__(34);
	
	var makeObject = __webpack_require__(39);
	
	describe('Delegated events: delegateListener, undelegateListener (basic)', function test() {
		var _this = this;
	
		var ctx = void 0,
		    handler = void 0;
	
		beforeEach(function () {
			ctx = {};
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		it('fires (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b, reassign a)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a = makeObject('b');
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b, reassign b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a.b = {};
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b.c, reassign a)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a = makeObject('b.c');
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b.c, reassign b)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b = makeObject('c');
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires when reassigned (a.b.c, reassign c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b.c = {};
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b, reassign a)', function () {
			var obj = makeObject('a.b'),
			    a = obj.a;
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a = makeObject('b');
			triggerOne(a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b, reassign b)', function () {
			var obj = makeObject('a.b'),
			    b = obj.a.b;
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			obj.a.b = {};
			triggerOne(b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b.c, reassign a)', function () {
			var obj = makeObject('a.b.c'),
			    a = obj.a;
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a = makeObject('b.c');
			triggerOne(a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b.c, reassign b)', function () {
			var obj = makeObject('a.b.c'),
			    b = obj.a.b;
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b = makeObject('c');
			triggerOne(b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('remove event from old target when reassigned (a.b.c, reassign c)', function () {
			var obj = makeObject('a.b.c'),
			    c = obj.a.c;
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			obj.a.b.c = {};
			triggerOne(c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			undelegateListener(obj, 'a.b', 'someevent');
			triggerOne(obj.a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			undelegateListener(obj, 'a.b.c', 'someevent');
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('doesn\'t remove change event when undelegate (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', function () {});
			delegateListener(obj, 'a.b', 'change:c', handler);
			undelegateListener(obj, 'a.b.c', 'someevent');
			obj.a.b.c = 55;
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			undelegateListener(obj, 'a.b', 'someevent', handler);
			triggerOne(obj.a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			undelegateListener(obj, 'a.b.c', 'someevent', handler);
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback and context (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler, ctx);
			undelegateListener(obj, 'a.b', 'someevent', handler, ctx);
			triggerOne(obj.a.b, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback and context (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler, ctx);
			undelegateListener(obj, 'a.b.c', 'someevent', handler, ctx);
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when callbacks are not same (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler);
			undelegateListener(obj, 'a.b', 'someevent', function () {});
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when callbacks are not same (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler);
			undelegateListener(obj, 'a.b.c', 'someevent', function () {});
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when contexts are not same (a.b)', function () {
			var obj = makeObject('a.b');
	
			delegateListener(obj, 'a.b', 'someevent', handler, {});
			undelegateListener(obj, 'a.b', 'someevent', handler, {});
			triggerOne(obj.a.b, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('undelegate by callback but keeps when contexts are not same (a.b.c)', function () {
			var obj = makeObject('a.b.c');
	
			delegateListener(obj, 'a.b.c', 'someevent', handler, {});
			undelegateListener(obj, 'a.b.c', 'someevent', handler, {});
			triggerOne(obj.a.b.c, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('uses correct context for delegated events', function () {
			var obj = makeObject('a.b.c');
			var bool = false;
	
			delegateListener(obj, 'a.b.c', 'someevent', function handle() {
				bool = this === ctx;
			}, ctx);
	
			triggerOne(obj.a.b.c, 'someevent');
			expect(bool).toBe(true);
		});
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(31);
	
	var undelegateListener = __webpack_require__(37);
	
	var triggerOne = __webpack_require__(34);
	
	function changeHandler(_ref) {
		var previousValue = _ref.previousValue;
		var value = _ref.value;
	
		var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? triggerOne.latestEvent.info.delegatedData : arguments[1];
	
		var path = _ref2.path;
		var name = _ref2.name;
		var callback = _ref2.callback;
		var context = _ref2.context;
	
		if (value && typeof value === 'object') {
			delegateListener(value, path, name, callback, context);
		}
	
		if (previousValue && typeof previousValue === 'object') {
			undelegateListener(previousValue, path, name, callback, context);
		}
	} /*eslint no-use-before-define: ["error", { "functions": false }]*/
	
	
	module.exports = delegateListener;
	function delegateListener(object, path, name, callback, context) {
		// if typeof path is string and path is not empty string then split it
		path = typeof path === 'string' && path !== '' ? path.split('.') : path;
	
		if (!path || !path.length) {
			// if no path then add simple listener
			addListener(object, name, callback, context);
		} else {
			// else do all magic
			var key = path[0];
			var pathStr = void 0;
	
			if (path.length > 1) {
				var _source = path,
				    _l = _source.length,
				    _i = 1 || 0,
				    _end = null || _l,
				    _j = 0,
				    _result = Array(_end - _i);
	
				while (_i < _end) {
					_result[_j++] = _source[_i++];
				}
	
				path = _result;
				pathStr = path.join('.');
			} else {
				path = [];
				pathStr = path[0] || '';
			}
	
			var delegatedData = {
				path: path,
				name: name,
				callback: callback,
				context: context
			};
	
			addListener(object, '_change:delegated:' + key, changeHandler, null, {
				delegatedData: delegatedData,
				pathStr: pathStr
			});
	
			changeHandler({
				value: object[key]
			}, delegatedData);
		}
	}
	
	/*
	define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/initmk',
		'matreshka_dir/core/var/map',
		'matreshka_dir/core/var/specialevtreg'
	], function(core, initMK, map, specialEvtReg) {
		"use strict";
		var _delegateListener = core._delegateListener = function(object,
		 path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var objectData = map.get(object),
				executed = /([^\.]+)\.(.*)/.exec(path),
				f,
				firstKey = executed ? executed[1] : path,
				changeKey,
				obj;

			path = executed ? executed[2] : '';

			evtData = evtData || {};

			if (firstKey) {
				if (firstKey == '*') {
					if (object.isMKArray) {
						f = function(evt) {
							(evt && evt.added ? evt.added : object).forEach(function(item) {
								item && _delegateListener(item, path, name,
								callback, context, evtData);
							});
						};

						f._callback = callback;
						core._addListener(object, 'add', f, context, evtData);
						f();
					} else if (object.isMKObject) {
						f = function(evt) {
							var target = object[evt.key];

							if (target && evt && (evt.key in objectData.keys)) {
								_delegateListener(target, path, name, callback, context, evtData);
							}
						};

						object.each(function(item) {
							_delegateListener(item, path, name, callback, context, evtData);
						});

						f._callback = callback;

						core._addListener(object, 'change', f, context, evtData);
					}
				} else {
					f = function(evt) {
						if (evt && evt._silent) return;

						var target = object[firstKey],
							changeKey,
							triggerChange = true,
							i,
							changeEvents;

						evtData.path = path;

						evtData.previousValue = evt && evt.previousValue ||
						evtData.previousValue && evtData.previousValue[firstKey];

						if (evt && evt.previousValue && map.has(evt.previousValue)) {
							core._undelegateListener(evt.previousValue, path, name, callback, context, evtData);
						}

						if (typeof target == 'object' && target) {
							_delegateListener(target, path, name, callback, context, evtData);
						}

						if (specialEvtReg.test(name)) {
							changeKey = name.replace(specialEvtReg, '');

							if (!path && evtData.previousValue && evtData.previousValue[changeKey]
							!== target[changeKey]) {
								changeEvents = map.get(evtData.previousValue).events[name];
								if (changeEvents) {
									for (i = 0; i < changeEvents.length; i++) {
										if (changeEvents[i].path === path) {
											triggerChange = false;
										}
									}
								}

								if (triggerChange) {
									core.set(target, changeKey, target[changeKey], {
										force: true,
										previousValue: evtData.previousValue[changeKey],
										previousObject: evtData.previousValue,
										_silent: true
									});
								}
							}
						}
					};

					f._callback = callback;

					core._addListener(object, 'change:' + firstKey, f, context, evtData);

					f();
				}
			} else {
				core._addListener(object, name, callback, context, evtData);
			}
		};
	});
	*/

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(32);
	
	var triggerOne = __webpack_require__(34);
	
	var defineProp = __webpack_require__(35);
	
	// property modifier event regexp
	var propModEventReg = /^_change:deps:|^_change:bindings:|^_change:delegated:|^change:|^beforechange:/;
	
	// adds simple event listener
	// used as core of event engine
	/*eslint no-shadow: ["error", { "allow": ["evt"] }]*/
	
	module.exports = addListener;
	function addListener(object, name, callback, context) {
		var info = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
		var _initMK = initMK(object);
	
		var allEvents = _initMK.events;
		var ctx = context || object;
		var events = allEvents[name];
		var evt = { callback: callback, context: context, ctx: ctx, name: name, info: info };
	
		// if there are events with the same name
		if (events) {
			// if there are events with the same data, return false
			for (var i = 0; i < events.length; i++) {
				var _evt = events[i];
				if ((_evt.callback === callback || _evt.callback === callback._callback) && _evt.context === context) {
					return false;
				}
			}
	
			// if the event isn't found add it to the event list
			events.push(evt);
		} else {
			// if there are no events with the same name, create array with only ebent
			allEvents[name] = [evt];
		}
	
		if (propModEventReg.test(name)) {
			// define needed accessors for KEY
			defineProp(object, name.replace(propModEventReg, ''));
		}
	
		if (name[0] !== '_') {
			triggerOne(object, 'addevent:' + name, evt);
			triggerOne(object, 'addevent', evt);
		}
	
		// if event is added return true
		return true;
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(33);
	
	// this is common function which associates an object with its Matreshka definition
	function commonInit(object) {
		var def = defs.get(object);
		if (!def) {
			def = {
				// a property name of "events" object is an event name
				// and a value is an array of event handlers
				events: {
					/*example: {
	    	callback: function,
	    	ctx: object,
	    	context: object2,
	    	name: "example"
	    }
	    */
				},
				// "props" contains special information about properties (getters, setters etc)
				props: {
					/*example: {
	    	//?nodes: core.$(),
	    	value: object[key],
	    	getter: null,
	    	setter: null,
	    	mediator: null,
	    	//?destroyers: Map,
	    	bindings: [{
	    		node,
	    		binder,
	    		nodeHandler,
	    		objectHandler
	    	}]
	    }*/
				},
				id: 'mk' + Math.random()
			};
	
			defs.set(object, def);
		}
	
		return def;
	}
	
	module.exports = initMK;
	function initMK(object) {
		var type = typeof object;
		if (!object || type !== 'object') {
			throw new TypeError(type + ' cannot be used in this method');
		}
	
		// if object has _initMK method, run it
		// else run commonInit
		// every _initMK implementation have to run commonInit or parent's _initMK
		return object._initMK ? object._initMK() : commonInit(object);
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	function PseudoMap() {}
	
	// PseudoMap simulates WeakMap behavior with O(1) search complexity
	// it's needed for @IE9 and @IE10
	var _result = PseudoMap.prototype;
	
	for (var _source2 = {
		get: function (obj) {
			return obj.matreshkaData;
		},
		set: function (obj, data) {
			Object.defineProperty(obj, 'matreshkaData', {
				value: data,
				enumerable: false,
				writable: false,
				configurable: false
			});
		},
		has: function (obj) {
			return ('matreshkaData' in obj);
		}
	}, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
		_key2 = _keys2[_i2];
		_result[_key2] = _source2[_key2];
	}
	
	module.exports = typeof WeakMap === 'undefined' ? new PseudoMap() : new WeakMap();

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(33);
	
	module.exports = triggerOne;
	function triggerOne(object, name) {
		var def = defs.get(object);
	
		if (!def) return;
	
		var events = def.events[name];
	
		if (events) {
			var _source = arguments,
			    _l = _source.length,
			    _i = 2 || 0,
			    _end = null || _l,
			    _j = 0,
			    _result = Array(_end - _i);
	
			while (_i < _end) {
				_result[_j++] = _source[_i++];
			}
	
			var args = _result;
			var l = events.length;
			var a1 = args[0];
			var a2 = args[1];
			var a3 = args[2];
	
	
			var i = 0,
			    ev = void 0;
	
			switch (args.length) {
				case 0:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx);
					}
					return;
				case 1:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1);
					}
					return;
				case 2:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1, a2);
					}
					return;
				case 3:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.call(ev.ctx, a1, a2, a3);
					}
					return;
				default:
					while (i < l) {
						(triggerOne.latestEvent = ev = events[i++]).callback.apply(ev.ctx, args);
					}
					return;
			}
		}
	}
	
	triggerOne.latestEvent = {
		info: {},
		name: null
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(33);
	
	var set = __webpack_require__(36);
	
	module.exports = defineProp;
	function defineProp(object, key) {
		var def = defs.get(object);
	
		// if no object definition do nothing
		if (!def) return;
	
		if (!def.props[key]) {
			(function () {
				var propDef = def.props[key] = {
					value: object[key],
					getter: null,
					setter: null,
					mediator: null,
					bindings: null
				};
	
				Object.defineProperty(object, key, {
					configurable: false,
					enumerable: true,
					get: function () {
						return propDef.getter ? propDef.getter.call(object) : propDef.value;
					},
					set: function (v) {
						return propDef.setter ? propDef.setter.call(object, v) : set(object, key, v, {
							fromSetter: true
						});
					}
				});
			})();
		}
	
		return def;
	}
	
	/*define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map'
	], function(core, map) {
		"use strict";
		core._defineSpecial = function(object, key, noAccessors) {
			if (!object || typeof object != 'object' || !map.has(object)) return object;

			var objectData = map.get(object),
				specialProps = objectData.special[key];

			if (!specialProps) {
				specialProps = objectData.special[key] = {
					$nodes: core.$(),
					value: object[key],
					getter: null,
					setter: null,
					mediator: null
				};

				if (!noAccessors && key != 'sandbox') {
					Object.defineProperty(object, key, {
						configurable: true,
						enumerable: true,
						get: function() {
							return specialProps.getter ? specialProps.getter.call(object) : specialProps.value;
						},
						set: function(v) {
							specialProps.setter ? specialProps.setter.call(object, v) : core.set(object, key, v, {
								fromSetter: true
							});
						}
					});
				}
			}

			return specialProps;
		};
	});
	*/

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(33);
	
	var triggerOne = __webpack_require__(34);
	
	module.exports = set;
	function set(object, key, value) {
		var evt = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
		var def = defs.get(object);
		if (!def) return;
	
		var props = def.props;
		var events = def.events;
		var propDef = props[key];
	
		if (!propDef) {
			object[key] = value;
			return;
		}
	
		var previousValue = propDef.value;
	
		// TODO NOT REQUIRED
		var _result = evt;
	
		for (var _source2 = {
			value: value,
			key: key,
			previousValue: previousValue
		}, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
			_key2 = _keys2[_i2];
			_result[_key2] = _source2[_key2];
		}
	
		evt = _result;
	
		propDef.value = value;
	
		if (previousValue !== value) {
			if (events['change:' + key]) {
				triggerOne(object, 'change:' + key, evt);
			}
	
			if (events['_change:delegated:' + key]) {
				triggerOne(object, '_change:delegated:' + key, evt);
			}
	
			if (events.change) {
				triggerOne(object, 'change', evt);
			}
		}
	}
	
	/*define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map'
	], function(core, map) {
		"use strict";
		var set;

		core.get = function(object, key) {
			return object && object[key];
		};

		// set method is the most often used method
		// we need to optimize it as good as possible
		set = core.set = function(object, key, v, evt) {
			if (!object || typeof object != 'object') return object;

			var type = typeof key,
				_isNaN = Number.isNaN || function(value) {
					return typeof value == 'number' && isNaN(value);
				},
				objectData,
				special,
				events,
				prevVal,
				newV,
				i,
				_evt,
				isChanged,
				triggerChange;

			if (type == 'undefined') return object;

			if (type == 'object') {
				for (i in key) {
					if (key.hasOwnProperty(i)) {
						set(object, i, key[i], v);
					}
				}

				return object;
			}

			objectData = map.get(object);

			if (!objectData || !objectData.special[key]) {
				object[key] = v;
				return object;
			}

			special = objectData.special[key];
			events = objectData.events;

			prevVal = special.value;

			if (special.mediator && v !== prevVal && (!evt || !evt.skipMediator && !evt.fromMediator)) {
				newV = special.mediator(v, prevVal, key, object);
			} else {
				newV = v;
			}

			isChanged = newV !== prevVal;

			_evt = {
				originalEvent: evt,
				value: newV,
				previousValue: prevVal,
				key: key,
				node: special.$nodes[0] || null,
				$nodes: special.$nodes,
				self: object,
				isChanged: isChanged
			};

			if (evt && typeof evt == 'object') {
				for (i in evt) {
					_evt[i] = _evt[i] || evt[i];
				}
			}

			triggerChange = (isChanged || _evt.force) && !_evt.silent;

			if (triggerChange) {
				events['beforechange:' + key] && core._fastTrigger(object, 'beforechange:' + key, _evt);

				events.beforechange && core._fastTrigger(object, 'beforechange', _evt);
			}

			special.value = newV;

			if (isChanged || _evt.force || _evt.forceHTML || newV !== v && !_isNaN(newV)) {
				if (!_evt.silentHTML) {
					events['_runbindings:' + key] && core._fastTrigger(object, '_runbindings:' + key, _evt);
				}
			}

			if (triggerChange) {
				events['change:' + key] && core._fastTrigger(object, 'change:' + key, _evt);

				events.change && core._fastTrigger(object, 'change', _evt);
			}

			if ((isChanged || _evt.force) && !_evt.skipLinks) {
				events['_rundependencies:' + key] &&
					core._fastTrigger(object, '_rundependencies:' + key, _evt);
			}

			return object;
		};
	});
	*/

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(33);
	
	var removeListener = __webpack_require__(38);
	
	// REFACTOR, DONT TRIGGER ADDEVENT, REMOVEEVENT
	module.exports = undelegateListener;
	function undelegateListener(object, path, name, callback, context) {
		var info = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];
	
		var def = defs.get(object);
	
		// if no definition do nothing
		if (!def) return;
	
		var allEvents = def.events;
	
	
		path = typeof path === 'string' && path !== '' ? path.split('.') : path;
	
		if (!path || !path.length) {
			// if no path then remove listener
			removeListener(object, name, callback, context, info);
		} else {
			(function () {
				// else do all magic
				var key = path[0],
				    events = allEvents['_change:delegated:' + key];
				var pathStr = void 0;
	
				if (path.length > 1) {
					var _source = path,
					    _l = _source.length,
					    _i = 1 || 0,
					    _end = null || _l,
					    _j = 0,
					    _result = Array(_end - _i);
	
					while (_i < _end) {
						_result[_j++] = _source[_i++];
					}
	
					path = _result;
					pathStr = path.join('.');
				} else {
					path = [];
					pathStr = path[0] || '';
				}
	
				if (events) {
					(function () {
						var retain = [];
	
						for (var _target = events, _index = 0, event, _l2 = _target.length; event = _target[_index], _index < _l2; _index++) {
							if (event.info.pathStr !== pathStr) {
								retain.push(event);
							}
						}
	
						if (retain.length) {
							allEvents['_change:delegated:' + key] = retain;
						} else {
							delete allEvents['_change:delegated:' + key];
						}
					})();
				}
	
				if (typeof object[key] === 'object') {
					undelegateListener(object[key], path, name, callback, context, info);
				}
			})();
		}
	}
	
	/*
	define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map'
	], function(core, map) {
		"use strict";
		var _undelegateListener = core._undelegateListener =
		 function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var executed = /([^\.]+)\.(.*)/.exec(path),
				firstKey = executed ? executed[1] : path,
				p = path,
				objectData = map.get(object),
				events,
				i;

			path = executed ? executed[2] : '';

			if (firstKey) {
				if (firstKey == '*') {
					if (object.isMKArray) {
						if (callback) {
							_undelegateListener(object, path, 'add', callback, context, evtData);
						} else {
							events = objectData.events.add || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {

									_undelegateListener(object, path, 'add', events[i].callback);
								}
							}
						}

						object.forEach(function(item) {
							item && _undelegateListener(item, path, name, callback, context);
						});
					} else if (object.isMKObject) {
						if (callback) {
							_undelegateListener(object, path, 'change', callback, context);
						} else {
							events = objectData.events.change || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {
									_undelegateListener(object, path, 'change', events[i].callback);
								}
							}
						}

						object.each(function(item) {
							item && _undelegateListener(item, path, name, callback, context);
						});
					}
				} else {
					if (callback) {
						core._removeListener(object, 'change:' + firstKey, callback, context, evtData);
					} else {
						events = objectData.events['change:' + firstKey] || [];
						for (i = 0; i < events.length; i++) {
							if (events[i].path == p) {
								core._removeListener(object, 'change:' + firstKey, events[i].callback);
							}
						}
					}
					if (typeof object[firstKey] == 'object') {
						_undelegateListener(object[firstKey], path, name, callback, context, evtData);
					}
				}
			} else {
				core._removeListener(object, name, callback, context, evtData);
			}
		};
	});

	*/

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(33);
	
	var triggerOne = __webpack_require__(34);
	
	// removes simple event listener to an object
	/*eslint no-shadow: ["error", { "allow": ["name", "events"] }]*/
	module.exports = removeListener;
	function removeListener(object, name, callback, context, info) {
		var def = defs.get(object);
	
		// if no definition do nothing
		if (!def) return;
	
		var allEvents = def.events;
		var events = allEvents[name];
		var retain = [];
	
		// if all events need to be removed
		if (typeof name === 'undefined') {
			if (!info || !info.noTrigger) {
				for (var _target2 = allEvents, _keys = Object.keys(_target2), _i = 0, name, events, _l2 = _keys.length; (name = _keys[_i], events = _target2[name]), _i < _l2; _i++) {
					for (var _target = events, _index = 0, evt, _l = _target.length; evt = _target[_index], _index < _l; _index++) {
						var removeEvtData = {
							name: name,
							callback: evt.callback,
							context: evt.context
						};
	
						triggerOne(object, 'removeevent:' + name, removeEvtData);
						triggerOne(object, 'removeevent', removeEvtData);
					}
				}
			}
	
			// restore default value of "events"
			def.events = {};
		} else if (events) {
			for (var _target3 = events, _index2 = 0, evt, _l3 = _target3.length; evt = _target3[_index2], _index2 < _l3; _index2++) {
				if (callback && callback !== evt.callback && callback._callback !== evt.callback || context && context !== evt.context) {
					// keep event
					retain.push(evt);
				} else {
					var _removeEvtData = {
						name: name,
						callback: evt.callback,
						context: evt.context
					};
	
					if (!info || !info.noTrigger) {
						triggerOne(object, 'removeevent:' + name, _removeEvtData);
						triggerOne(object, 'removeevent', _removeEvtData);
					}
				}
			} // if events with given name is found
	
	
			if (retain.length) {
				allEvents[name] = retain;
			} else {
				delete def.events[name];
			}
		}
	
		return;
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	// creates nested object based on path and lastValue
	// example: makeObject('a.b.c', 42) -> {a: {b: {c; 42}}}
	module.exports = makeObject;
	function makeObject() {
		var path = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
		var lastValue = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
		path = path ? path.split('.') : [];
		var result = {};
		var obj = result,
		    key = void 0;
	
		while (path.length > 1) {
			key = path.shift();
			obj = obj[key] = {};
		}
	
		obj[path.shift()] = lastValue;
	
		return result;
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(31);
	
	var delegateListener = __webpack_require__(30);
	
	var undelegateListener = __webpack_require__(37);
	
	var removeListener = __webpack_require__(38);
	
	var makeObject = __webpack_require__(39);
	
	describe('Change event (simple and delegated)', function test() {
		var _this = this;
	
		var handler = void 0;
	
		beforeEach(function () {
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		it('fires simple', function () {
			var obj = { x: 1 };
	
			addListener(obj, 'change:x', handler);
			obj.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires (delegated, a.x)', function () {
			var obj = makeObject('a.x', 1);
	
			delegateListener(obj, 'a', 'change:x', handler);
			obj.a.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		it('fires (delegated, a.b.x)', function () {
			var obj = makeObject('a.b.x', 1);
	
			delegateListener(obj, 'a.b', 'change:x', handler);
			obj.a.b.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		it('removes simple', function () {
			var obj = { x: 1 };
	
			addListener(obj, 'change:x', handler);
			removeListener(obj, 'change:x', handler);
			obj.x = 2;
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes (delegated, a.x)', function () {
			var obj = makeObject('a.x', 1);
	
			delegateListener(obj, 'a', 'change:x', handler);
			undelegateListener(obj, 'a', 'change:x', handler);
			obj.a.x = 2;
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes (delegated, a.b.x)', function () {
			var obj = makeObject('a.b.x', 1);
	
			delegateListener(obj, 'a.b', 'change:x', handler);
			undelegateListener(obj, 'a.b', 'change:x', handler);
			obj.a.b.x = 2;
			expect(handler).not.toHaveBeenCalled();
		});
	
		/*eslint-disable */
		xit('fires (delegated, a.b.x)', function () {
			var obj = makeObject('a.b.x', 1);
	
			delegateListener(obj, 'a.b', 'change:x', handler);
			obj.a.b.x = 2;
			expect(handler).toHaveBeenCalled();
		});
	
		xit('fires when delegated target is reassigned (a.b.c.x, reassign a)', function () {
			var obj = makeObject('a.b.c.x', 1);
	
			delegateListener(obj, 'a.b.c', 'change:x', handler);
			obj.a = makeObject('b.c.x', 2);
			expect(handler).toHaveBeenCalled();
		});
	
		xit('fires when delegated target is reassigned (a.b.c.x, reassign b)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;
	
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return bool = true;
			});
			obj.a.b = {
				c: {
					x: 2
				}
			};
	
			expect(bool).toBe(true);
		});
	
		xit('fires when delegated target is reassigned (a.b.c.x, reassign c)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;
	
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return bool = true;
			});
			obj.a.b.c = {
				x: 2
			};
	
			expect(bool).toBe(true);
		});
	
		xit('avoids conflicts', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    i = 0;
	
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e11;
			});
			magic._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e10;
			});
			magic._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e9;
			});
			magic._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e8;
			});
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e7;
			});
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e6;
			});
			magic._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e5;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e4;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e3;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e2;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e1;
			});
			magic._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e0;
			});
			obj.a = {
				b: {
					c: {
						x: 2
					}
				}
			};
			expect(i).toEqual(111111111111);
		});
	
		xit('accepts null target (a.b.c, reassign b)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;
	
			magic._delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
				return bool = true;
			});
	
			obj.a.b = null;
	
			expect(bool).toBe(false);
		});
		/*eslint-enable */
	});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(31);
	
	var removeListener = __webpack_require__(38);
	
	var triggerOne = __webpack_require__(34);
	
	describe('Events core: addListener, removeListener, triggerOne', function test() {
		var _this = this;
	
		var obj = void 0,
		    ctx = void 0,
		    handler = void 0;
	
		beforeEach(function () {
			obj = {};
			ctx = {};
			_this.handler = function () {};
			spyOn(_this, 'handler');
			handler = _this.handler;
		});
	
		it('fires', function () {
			addListener(obj, 'someevent', handler);
			triggerOne(obj, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('avoids conflicts', function () {
			var i = 0;
			addListener(obj, 'someevent', function () {
				return i += 1e0;
			});
			addListener(obj, 'someevent', function () {
				return i += 1e1;
			});
			addListener(obj, 'someevent', function () {
				return i += 1e2;
			});
			triggerOne(obj, 'someevent');
	
			expect(i).toEqual(111);
		});
	
		it('removes (no args)', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj);
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by name', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj, 'someevent');
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by callback', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj, 'someevent', handler);
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by callback but keeps when callbacks are not same', function () {
			addListener(obj, 'someevent', handler);
			removeListener(obj, 'someevent', function () {});
			triggerOne(obj, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		it('removes by callback and context', function () {
			addListener(obj, 'someevent', handler, ctx);
			removeListener(obj, 'someevent', handler, ctx);
			triggerOne(obj, 'someevent');
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('removes by callback but keeps when contexts are not same', function () {
			addListener(obj, 'someevent', handler, ctx);
			removeListener(obj, 'someevent', handler, {});
			triggerOne(obj, 'someevent');
			expect(handler).toHaveBeenCalled();
		});
	
		xit('removes by howToRemove (not documented core feature)', function () {
			/*eslint-disable */
			var obj = {},
			    bool = false,
			    f = function (evt) {
				return bool = true;
			},
			    onData = {
				howToRemove: function (onData, offData) {
					return offData.x === 42;
				}
			};
	
			magic._addListener(obj, 'someevent1', f, null, onData);
			magic._removeListener(obj, 'someevent1', null, null, {
				x: 42
			});
	
			magic.trigger(obj, 'someevent1');
	
			expect(bool).toBe(false);
	
			magic._addListener(obj, 'someevent2', f, null, onData);
			magic._removeListener(obj, 'someevent2', null, null, {
				x: 43
			});
	
			magic.trigger(obj, 'someevent2');
	
			expect(bool).toBe(true);
			/*eslint-enable */
		});
	});

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	/*eslint-disable */
	
	xdescribe("Events core: _addDOMListener, _removeDOMListener", function () {
		var q = function (s, c) {
			var result = $(s, c)[0] || null;
			if (result) {
				result.click = result.click || function () {
					var ev = document.createEvent("MouseEvent");
					ev.initMouseEvent("click", true /* bubble */, true /* cancelable */
					, window, null, 0, 0, 0, 0, /* coordinates */
					false, false, false, false, /* modifier keys */
					0 /*left*/, null);
					result.dispatchEvent(ev);
				};
			}
			return result;
		};
	
		document.body.appendChild($.create({
			tagName: 'DIV',
			id: 'd-test',
			innerHTML: "\n\t\t\t<div id=\"d-test-1\">\n\t\t\t\t<div class=\"d-test-2\">\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
		}));
	
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});
	
			q('#d-test').click();
	
			expect(bool).toBe(true);
		});
	
		it('removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click');
			magic.bindNode(obj, 'x', '#d-test');
	
			q('#d-test').click();
	
			expect(bool).toBe(false);
		});
	
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('adds (use selector) and removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(false);
		});
	
		it('adds (use selector) then binds then removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(false);
		});
	
		it('triggers DOM event', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			magic.trigger(obj, 'click::x', 1, 2);
	
			expect(bool).toBe(true);
		});
	
		it('triggers DOM event with specified selector', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			magic.trigger(obj, 'click::x(.d-test-2)', 1, 2);
	
			expect(bool).toBe(true);
		});
	
		it('triggers DOM event with specified selector (bubbling test)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			magic.trigger(obj, 'click::x(.d-test-2)', 1, 2);
	
			expect(bool).toBe(true);
		});
	
		it('removes delegated', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click', '.d-test-2');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(false);
		});
	
		it('removes delegated and doesn\'t remove events from other nodes', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			magic._removeDOMListener(obj, 'x', 'click', '.blah');
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('triggers event via "trigger" method', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});
	
			magic.trigger(obj, 'click::x');
	
			expect(bool).toBe(true);
		});
	});

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	
	/*eslint-disable */
	xdescribe('Events summary (on, off)', function () {
		var q = function (s, c) {
			var result = $(s, c)[0] || null;
			if (result) {
				result.click = result.click || function () {
					var ev = document.createEvent("MouseEvent");
					ev.initMouseEvent("click", true /* bubble */, true /* cancelable */
					, window, null, 0, 0, 0, 0, /* coordinates */
					false, false, false, false, /* modifier keys */
					0 /*left*/, null);
					result.dispatchEvent(ev);
				};
			}
			return result;
		};
	
		var node = document.body.appendChild($.create({
			tagName: 'DIV',
			id: 's-test',
			innerHTML: "\n\t\t\t<div id=\"s-test-1\">\n\t\t\t\t<div class=\"s-test-2\">\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t"
		}));
	
		node.click = node.click || function () {
			this.dispatchEvent(new MouseEvent('click'));
		};
	
		it('fires', function () {
			var obj = {},
			    bool = false;
			magic.on(obj, 'someevent', function (evt) {
				return bool = true;
			});
			magic.trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});
	
		it('fires on Matreshka instance', function () {
			var mk = new MK(),
			    bool = false;
			mk.on('someevent', function (evt) {
				return bool = true;
			});
			mk.trigger('someevent');
			expect(bool).toBe(true);
		});
	
		it('removes', function () {
			var obj = {},
			    bool = false,
			    f = function (evt) {
				return bool = true;
			};
	
			magic.on(obj, 'someevent', f);
			magic.off(obj, 'someevent');
			magic.trigger(obj, 'someevent');
	
			expect(bool).toBe(false);
		});
	
		it('removes on Matreshka instance', function () {
			var mk = new MK(),
			    bool = false,
			    f = function (evt) {
				return bool = true;
			};
	
			mk.on('someevent', f);
			mk.off('someevent');
			mk.trigger('someevent');
	
			expect(bool).toBe(false);
		});
	
		it('fires delegated', function () {
			var obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    bool = false;
	
			magic.on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});
			magic.trigger(obj.a.b.c, 'someevent');
			expect(bool).toBe(true);
		});
	
		it('removes delegated', function () {
			var obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    bool = false;
	
			magic.on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});
			magic.off(obj, 'a.b.c@someevent');
	
			magic.trigger(obj.a.b.c, 'someevent');
			expect(bool).toBe(false);
		});
	
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x', function (evt) {
				return bool = true;
			});
	
			q('#d-test').click();
	
			expect(bool).toBe(true);
		});
	
		it('removes (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x', function (evt) {
				return bool = true;
			});
			magic.off(obj, 'click::x');
	
			q('#d-test').click();
	
			expect(bool).toBe(false);
		});
	
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('works with "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;
	
			magic.on(obj, '@someevent', function (evt) {
				return bool = true;
			});
	
			obj.push({});
	
			magic.trigger(obj[0], 'someevent');
	
			expect(bool).toBe(true);
		});
	
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x', function (evt) {
				return bool = true;
			});
	
			q('#d-test').click();
	
			expect(bool).toBe(true);
		});
	
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;
	
			magic.bindNode(obj, 'x', '#d-test');
			magic.on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});
	
			q('.d-test-2').click();
	
			expect(bool).toBe(true);
		});
	
		it('triggers once', function () {
			var obj = {},
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			magic.once(obj, 'someevent', f);
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
	
			expect(i).toBe(1);
		});
	
		it('allows to pass name-handler object to "once"', function () {
			var obj = {},
			    i = 0,
			    j = 0,
			    f1 = function (evt) {
				return i++;
			},
			    f2 = function (evt) {
				return j++;
			};
	
			magic.once(obj, {
				foo: f1,
				bar: f2
			});
	
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
	
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
	
			expect(i).toBe(1);
			expect(j).toBe(1);
		});
	
		it('triggers once on Matreshka instance', function () {
			var mk = new MK(),
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			mk.once('someevent', f);
			mk.trigger('someevent');
			mk.trigger('someevent');
			mk.trigger('someevent');
	
			expect(i).toBe(1);
		});
	
		it('onDebounce works', function (done) {
			var obj = {},
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			setTimeout(function () {
				expect(i).toBe(1);
				done();
			}, 200);
	
			magic.onDebounce(obj, 'someevent', f);
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
			magic.trigger(obj, 'someevent');
		});
	
		it('allows to pass name-handler object to "onDebounce"', function (done) {
			var obj = {},
			    i = 0,
			    j = 0,
			    f1 = function (evt) {
				return i++;
			},
			    f2 = function (evt) {
				return j++;
			};
	
			setTimeout(function () {
				expect(i).toBe(1);
				expect(j).toBe(1);
				done();
			}, 200);
	
			magic.onDebounce(obj, {
				foo: f1,
				bar: f2
			});
	
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
			magic.trigger(obj, 'foo');
	
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
			magic.trigger(obj, 'bar');
		});
	
		it('onDebounce works on Matreshka instance', function (done) {
			var mk = new MK(),
			    i = 0,
			    f = function (evt) {
				return i++;
			};
	
			setTimeout(function () {
				expect(i).toBe(1);
				done();
			}, 800);
	
			mk.onDebounce('someevent', f);
			mk.trigger('someevent');
			mk.trigger('someevent');
			mk.trigger('someevent');
		});
	
		it('allows to pass name-handler object to "on" and "off"', function () {
			var obj = {},
			    bool = false,
			    i = 0,
			    handlers = {
				foo: function () {
					return i++;
				},
				bar: function () {
					return i++;
				}
			};
	
			MK.on(obj, handlers);
	
			MK.trigger(obj, 'foo');
			MK.trigger(obj, 'bar');
	
			expect(i).toBe(2);
	
			MK.off(obj, handlers);
	
			expect(i).toBe(2);
		});
	
		it('allows to flip context and triggerOnInit (on)', function () {
			var obj = {},
			    thisArg = {},
			    bool = false,
			    i = 0;
	
			MK.on(obj, 'foo', function () {
				expect(this).toEqual(thisArg);
				i++;
			}, true, thisArg);
	
			MK.on(obj, 'bar', function () {
				expect(this).toEqual(thisArg);
				i++;
			}, thisArg, true);
	
			expect(i).toBe(2);
		});
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 45,
		"./_bindings/defaultbinders.js": 47,
		"./_bindings/getnodes.js": 48,
		"./_bindings/lookforbinder.js": 46,
		"./_bindings/selectnodes.js": 49,
		"./_core/defineprop.js": 35,
		"./_core/defs.js": 33,
		"./_core/init.js": 32,
		"./_dom/default-dollar.js": 50,
		"./_dom/index.js": 51,
		"./_events/addlistener.js": 31,
		"./_events/delegatelistener.js": 30,
		"./_events/removelistener.js": 38,
		"./_events/triggerone.js": 34,
		"./_events/undelegatelistener.js": 37,
		"./_util/matreshkaerror.js": 62,
		"./array.js": 52,
		"./binders.js": 53,
		"./bindnode.js": 54,
		"./bquery/_data.js": 11,
		"./bquery/_html2nodelist.js": 5,
		"./bquery/_init.js": 4,
		"./bquery/add.js": 14,
		"./bquery/create.js": 9,
		"./bquery/find.js": 16,
		"./bquery/index.js": 3,
		"./bquery/is.js": 12,
		"./bquery/not.js": 15,
		"./bquery/off.js": 13,
		"./bquery/on.js": 10,
		"./bquery/one.js": 8,
		"./bquery/parsehtml.js": 7,
		"./class.js": 27,
		"./extend.js": 6,
		"./get.js": 55,
		"./index.js": 56,
		"./magic.js": 59,
		"./matreshka/index.js": 57,
		"./object.js": 58,
		"./on.js": 60,
		"./set.js": 36
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
	webpackContext.id = 44;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(46);
	
	var set = __webpack_require__(36);
	
	function runMatreshkaHandler(node, propDef, options, evt) {
		var v = objectData.special[key].value,
	
		// dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
		_v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v,
		    i;
	
		if (evt && evt.changedNode == node && evt.onChangeValue == _v) return;
	
		_options = {
			value: v
		};
	
		for (i in options) {
			_options[i] = options[i];
		}
	
		_binder.setValue.call(node, v, _options);
	};
	
	module.exports = bindSingleNode;
	function bindSingleNode(object, _ref) {
		var givenBinder = _ref.binder;
		var key = _ref.key;
		var $nodes = _ref.$nodes;
		var node = _ref.node;
		var evt = _ref.evt;
		var propDef = _ref.propDef;
		var assignDefaultValue = evt.assignDefaultValue;
	
		var options = {
			self: object,
			key: key,
			$nodes: $nodes,
			node: node
		};
		var isUndefined = typeof propDef.value == 'undefined';
		var binder = void 0;
		var mkHandler = void 0;
	
		if (givenBinder !== null) {
			var foundBinder = lookForBinder(node);
	
			if (foundBinder) {
				if (givenBinder) {
					var _result = foundBinder;
	
					for (var _source2 = givenBinder, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
						_key2 = _keys2[_i2];
						_result[_key2] = _source2[_key2];
					}
				}
	
				binder = foundBinder;
			} else {
				binder = givenBinder;
			}
		}
	
		var _binder2 = binder;
		var getValue = _binder2.getValue;
		var setValue = _binder2.setValue;
		var on = _binder2.on;
		var initialize = _binder2.initialize;
	
		/* TODO if (binder.initialize) { ... }*/
	
		if (getValue && (isUndefined && assignDefaultValue !== false || assignDefaultValue === true)) {
			var value = getValue.call(node, options);
			isUndefined = typeof val == 'undefined';
	
			var _result2 = {
				fromNode: true
			};
	
			for (var _source4 = evt, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
				_key4 = _keys4[_i4];
				_result2[_key4] = _source4[_key4];
			}
	
			set(object, key, value, _result2);
		}
	
		if (setValue) {
			mkHandler = function () {
				return runMatreshkaHandler(node, propDef, options, evt);
			};
	
			if (evt.debounce) {
				mkHandler = util.debounce(mkHandler);
			}
			alert(1);
			core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, { node: node });
			alert(2);
			!isUndefined && mkHandler();
		}
	}
	/*
	function initBinding(object, objectData, key, $nodes, index, binder, evt, special) {
		var options = {
				self: object,
				key: key,
				$nodes: $nodes,
				node: node
			},
			node = $nodes[index],
			isUndefined = typeof special.value == 'undefined',
			_binder,
			_evt,
			foundBinder,
			_options,
			i,
			domEvt,
			mkHandler,
			val;




		if (binder === null) {
			_binder = {};
		} else {
			foundBinder = lookForBinder(node);

			if (foundBinder) {
				if (binder) {
					for (i in binder) {
						foundBinder[i] = binder[i];
					}
				}

				_binder = foundBinder;
			} else {
				_binder = binder || {};
			}
		}

		if (_binder.initialize) {
			_options = {
				value: special.value
			};
			for (i in options) {
				_options[i] = options[i];
			}
			_binder.initialize.call(node, _options);
		}

		if (_binder.getValue && (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {

			_evt = {
				fromNode: true
			};

			for (i in evt) {
				_evt[i] = evt[i];
			}

			val = _binder.getValue.call(node, options);
			isUndefined = typeof val == 'undefined';

			core.set(object, key, val, _evt);
		}


		if (_binder.setValue) {
			mkHandler = function (evt) {
				var v = objectData.special[key].value,
					// dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
					_v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v,
					i;

				if (evt && evt.changedNode == node && evt.onChangeValue == _v) return;

				_options = {
					value: v
				};

				for (i in options) {
					_options[i] = options[i];
				}

				_binder.setValue.call(node, v, _options);
			};

			if(evt.debounce) {
				mkHandler = util.debounce(mkHandler);
			}

			core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, {node: node});

			!isUndefined && mkHandler();
		}




		if (_binder.getValue && _binder.on) {
			domEvt = {
				node: node,
				on: _binder.on,
				instance: object,
				key: key,
				mkHandler: mkHandler,
				handler: function(evt) {
					if (domEvt.removed) return;
					var oldvalue = object[key],
						value,
						j,
						_options = {
							value: oldvalue,
							domEvent: evt,
							originalEvent: evt.originalEvent || evt,
							preventDefault: function() {
								evt.preventDefault();
							},
							stopPropagation: function() {
								evt.stopPropagation();
							},
							which: evt.which,
							target: evt.target
						};


					// hasOwnProperty is not required there
					for (j in options) {
						_options[j] = options[j];
					}

					value = _binder.getValue.call(node, _options);

					if (value !== oldvalue) {
						core.set(object, key, value, {
							fromNode: true,
							changedNode: node,
							onChangeValue: value
						});
					}
				}
			};

			core.domEvents.add(domEvt);
		}
	}*/

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(47);
	
	module.exports = function (node) {
	    var result, i;
	
	    for (i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = [function (node) {
		var tagName = node.tagName,
		    binders = undefined,
		    b;
	
		// TODO Switch/case
		if (tagName == 'INPUT') {
			b = binders.input(node.type);
		} else if (tagName == 'TEXTAREA') {
			b = binders.textarea();
		} else if (tagName == 'SELECT') {
			b = binders.select(node.multiple);
		} else if (tagName == 'PROGRESS') {
			b = binders.progress();
		} else if (tagName == 'OUTPUT') {
			b = binders.output();
		}
	
		return b;
	}];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(49);
	
	var dom = __webpack_require__(51);
	
	module.exports = getNodes;
	function getNodes(object, selector) {
		var nodes = void 0;
		if (typeof selector == 'string' && !/</.test(selector) && /:sandbox|:bound\(([^(]*)\)/.test(selector)) {
			nodes = selectNodes(object, selector);
		} else {
			nodes = dom.$(selector);
		}
		return nodes;
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = selectNodes;
	function selectNodes(object, selectors) {
	
		var objectData = map.get(object),
		    $ = core.$,
		    result = $(),
		    execResult,
		    $bound,
		    node,
		    selector,
		    i,
		    j,
		    random,
		    subSelector,
		    key,
		    selected;
	
		if (!object || typeof object != 'object' || !objectData) return result;
	
		// replacing :sandbox to :bound(sandbox)
		selectors = selectors.split(',');
	
		for (i = 0; i < selectors.length; i++) {
			selector = selectors[i];
	
			if (execResult = /\s*:bound\(([^(]*)\)\s*([\S\s]*)\s*|\s*:sandbox\s*([\S\s]*)\s*/.exec(selector)) {
				key = execResult[3] !== undefined ? 'sandbox' : execResult[1];
				subSelector = execResult[3] !== undefined ? execResult[3] : execResult[2];
	
				// getting KEY from :bound(KEY)
				$bound = objectData.special[key] && objectData.special[key].$nodes;
				if (!$bound || !$bound.length) {
					continue;
				}
	
				// if native selector passed after :bound(KEY) is not empty string
				// for example ":bound(KEY) .my-selector"
				if (subSelector) {
					// if native selector contains children selector
					// for example ":bound(KEY) > .my-selector"
					if (subSelector.indexOf('>') === 0) {
						// selecting children
						for (j = 0; j < $bound.length; j++) {
							node = $bound[j];
							random = 'm' + core.randomString();
							node.setAttribute(random, random);
							selected = node.querySelectorAll('[' + random + '="' + random + '"]' + subSelector);
							result = result.add(util.toArray(selected));
							node.removeAttribute(random);
						}
					} else {
						// if native selector doesn't contain children selector
						result = result.add($bound.find(subSelector));
					}
				} else {
					// if native selector is empty string
					result = result.add($bound);
				}
				// if it's native selector
			} else {
					result = result.add(selector);
				}
		}
	
		return result;
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(3);
	
	var neededMethods = 'on off is add not find'.split(/\s/); /*global $*/
	
	
	var globalDollar = typeof $ === 'function' ? $ : null;
	var useGlobalDollar = true;
	
	if (globalDollar) {
		var fn = globalDollar.fn || globalDollar.prototype;
		for (var i = 0; i < neededMethods.length; i++) {
			if (!fn[neededMethods[i]]) {
				useGlobalDollar = false;
				break;
			}
		}
	
		if (!globalDollar.parseHTML) {
			globalDollar.parseHTML = bQuery.parseHTML;
		}
	} else {
		useGlobalDollar = false;
	}
	
	module.exports = useGlobalDollar ? globalDollar : bQuery;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(50);
	
	var dom = {
		$: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 52 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(32);
	
	var defineProp = __webpack_require__(35);
	
	var getNodes = __webpack_require__(48);
	
	var MatreshkaError = __webpack_require__(62);
	
	var bindSingleNode = __webpack_require__(45);
	
	module.exports = bindNode;
	function bindNode(object, key, node) {
		var binder = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
		var evt = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
		var _initMK = initMK(object);
	
		var props = _initMK.props;
		var optional = evt.optional;
	
	
		if (!key) {
			throw MatreshkaError('binding:falsy_key');
		}
	
		/*
	  * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
	  */
		if (key instanceof Array) {
			for (i = 0; i < key.length; i++) {
				bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
			}
	
			return object;
		}
	
		/*
	  * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
	  */
		if (typeof key === 'object') {
			nofn.each(key, function (keyObjValue, keyObjKey) {
				return bindNode(object, keyObjKey, keyObjValue, node, binder);
			});
			return object;
		}
	
		/*
	  * this.bindNode('key', [ node, binder ], { silent: true });
	  */
		// node !== win is the most uncommon bugfix ever
		// this is about iframes, CORS and deprecated DOM API.
		if (node && node.length == 2 && node !== win && !node[1].nodeName && (node[1].setValue || node[1].getValue)) {
			return bindNode(object, key, node[0], node[1], binder);
		}
	
		var $nodes = getNodes(object, node);
	
		if (!$nodes.length) {
			if (optional) {
				return object;
			} else {
				throw MatreshkaError('binding:node_missing', { key: key, node: node });
			}
		}
	
		var propDef = defineProp(object, key);
	
		if (object.isMK) {
			object.$nodes[key] = object.$nodes[key].length ? object.$nodes[key].add($nodes) : $nodes;
			object.nodes[key] = object.$nodes[key][0];
		}
	
		if ((!evt || evt.deep !== false) && ~key.indexOf('.')) {
			// TODO
		}
	
		/*
	  for (i = 0; i < $nodes.length; i++) {
	     initBinding(object, objectData, key, $nodes, i, binder, evt, special);
	 }
	  if (!evt.silent) {
	     _evt = {
	         key: key,
	         $nodes: $nodes,
	         node: $nodes[0] || null
	     };
	      for (i in evt) {
	         _evt[i] = evt[i];
	     }
	      core._fastTrigger(object, 'bind:' + key, _evt);
	     core._fastTrigger(object, 'bind', _evt);
	 }*/
	
		for (var _target = $nodes, _index = 0, node, _l = _target.length; node = _target[_index], _index < _l; _index++) {
			return bindSingleNode(object, {
				$nodes: $nodes,
				node: node,
				key: key,
				evt: evt,
				binder: binder,
				propDef: propDef
			});
		}
	
		return object;
	}
	
	/*define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map',
		'matreshka_dir/core/initmk',
		'matreshka_dir/core/util/common'
	], function(core, map, initMK, util) {

		var bindNode = core.bindNode = function(object, key, node, binder, evt, optional) {
			/* istanbul ignore if  *
			if (!object || typeof object != 'object') return object;

			if(key == 'sandbox') {
				return bindSandbox(object, node, evt, optional);
			}


			initMK(object);


			var objectData = map.get(object),
				win = typeof window != 'undefined' ? window : null,
				$nodes,
				keys,
				i,
				special,
				path,
				listenKey,
				changeHandler,
				_evt;

			/*
			 * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
			 *
			if (key instanceof Array) {
				for (i = 0; i < key.length; i++) {
					bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
				}

				return object;
			}

			/*
			 * this.bindNode('key1 key2', node, binder, { silent: true });
			 *
			if (typeof key == 'string' && ~key.indexOf(' ')) {
				keys = key.split(/\s+/);
				if (keys.length > 1) {
					for (i = 0; i < keys.length; i++) {
						bindNode(object, keys[i], node, binder, evt, optional);
					}
					return object;
				}
			}

			/*
			 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
			 *
			if (typeof key == 'object') {
				for (i in key) {
					if (key.hasOwnProperty(i)) {
						bindNode(object, i, key[i], node, binder, evt);
					}
				}

				return object;
			}

			/*
			 * this.bindNode('key', [ node, binder ], { silent: true });
			 *
			// node !== win is the most uncommon bugfix ever. Don't ask what does it mean.
			// This is about iframes, CORS and deprecated DOM API.
			if (node && node.length == 2 && node !== win && !node[1].nodeName
					&& (node[1].setValue || node[1].getValue)) {
				return bindNode(object, key, node[0], node[1], binder, optional);
			}

			$nodes = core._getNodes(object, node);

			if (!$nodes.length) {
				if (optional) {
					return object;
				} else {
					throw Error('Binding error: node is missing for "' + key + '".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
				}
			}

			if ((!evt || evt.deep !== false) && ~key.indexOf('.')) {
				path = key.split('.');
				changeHandler = function(evt) {
					evt = evt && evt.originalEvent;

					var target = evt && evt.value,
						i;
					if (!target) {
						target = object;
						for (i = 0; i < path.length - 1; i++) {
							target = target[path[i]];
						}
					}

					bindNode(target, path[path.length - 1], $nodes, binder, evt, optional);


					if (evt && evt.previousValue) {
						core.unbindNode(evt.previousValue, path[path.length - 1], $nodes);
					}
				};

				core._delegateListener(object, path.slice(0, path.length - 2).join('.'),
					'change:' + path[path.length - 2], changeHandler);

				changeHandler();

				return object;
			}

			evt = evt || {};

			special = core._defineSpecial(object, key);

			special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

			if (object.isMK) {
				object.$nodes[key] = special.$nodes;
				object.nodes[key] = special.$nodes[0];
			}

			for (i = 0; i < $nodes.length; i++) {
				initBinding(object, objectData, key, $nodes, i, binder, evt, special);
			}

			if (!evt.silent) {
				_evt = {
					key: key,
					$nodes: $nodes,
					node: $nodes[0] || null
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				core._fastTrigger(object, 'bind:' + key, _evt);
				core._fastTrigger(object, 'bind', _evt);
			}



			return object;
		};

		function initBinding(object, objectData, key, $nodes, index, binder, evt, special) {
			var options = {
					self: object,
					key: key,
					$nodes: $nodes,
					node: node
				},
				node = $nodes[index],
				isUndefined = typeof special.value == 'undefined',
				_binder,
				_evt,
				foundBinder,
				_options,
				i,
				domEvt,
				mkHandler,
				val;




			if (binder === null) {
				_binder = {};
			} else {
				foundBinder = lookForBinder(node);

				if (foundBinder) {
					if (binder) {
						for (i in binder) {
							foundBinder[i] = binder[i];
						}
					}

					_binder = foundBinder;
				} else {
					_binder = binder || {};
				}
			}

			if (_binder.initialize) {
				_options = {
					value: special.value
				};
				for (i in options) {
					_options[i] = options[i];
				}
				_binder.initialize.call(node, _options);
			}

			if (_binder.getValue && (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {

				_evt = {
					fromNode: true
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				val = _binder.getValue.call(node, options);
				isUndefined = typeof val == 'undefined';

				core.set(object, key, val, _evt);
			}


			if (_binder.setValue) {
				mkHandler = function (evt) {
					var v = objectData.special[key].value,
						// dirty hack for this one https://github.com/matreshkajs/matreshka/issues/19
						_v = evt && typeof evt.onChangeValue == 'string' && typeof v == 'number' ? v + '' : v,
						i;

					if (evt && evt.changedNode == node && evt.onChangeValue == _v) return;

					_options = {
						value: v
					};

					for (i in options) {
						_options[i] = options[i];
					}

					_binder.setValue.call(node, v, _options);
				};

				if(evt.debounce) {
					mkHandler = util.debounce(mkHandler);
				}

				core._fastAddListener(object, '_runbindings:' + key, mkHandler, null, {node: node});

				!isUndefined && mkHandler();
			}




			if (_binder.getValue && _binder.on) {
				domEvt = {
					node: node,
					on: _binder.on,
					instance: object,
					key: key,
					mkHandler: mkHandler,
					handler: function(evt) {
						if (domEvt.removed) return;
						var oldvalue = object[key],
							value,
							j,
							_options = {
								value: oldvalue,
								domEvent: evt,
								originalEvent: evt.originalEvent || evt,
								preventDefault: function() {
									evt.preventDefault();
								},
								stopPropagation: function() {
									evt.stopPropagation();
								},
								which: evt.which,
								target: evt.target
							};


						// hasOwnProperty is not required there
						for (j in options) {
							_options[j] = options[j];
						}

						value = _binder.getValue.call(node, _options);

						if (value !== oldvalue) {
							core.set(object, key, value, {
								fromNode: true,
								changedNode: node,
								onChangeValue: value
							});
						}
					}
				};

				core.domEvents.add(domEvt);
			}
		}
	});
	*/
	// Debounced!

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = get;
	function get(object, key) {
		return object[key];
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(57);
	
	var MatreshkaArray = __webpack_require__(52);
	
	var MatreshkaObject = __webpack_require__(58);
	
	var Class = __webpack_require__(27);
	
	var binders = __webpack_require__(53);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(6);
	
	var Class = __webpack_require__(27);
	
	module.exports = Class({
		// instance properies and methods
	
	}, {
		// static properties and methods
		extend: extend
	});

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 60 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(54);
	
	/*import magic from 'matreshka-magic';
	import MK from 'matreshka';
	import $ from 'bquery';
	let q = (s, c) => $(s, c)[0] || null;
	
	let bindInput = (obj, key, evt) => {
		let input = $.create('input'),
			binder = {
				on(cbc) {
					this._onkeyup = cbc;
				},
				getValue() {
					return this.value;
				},
				setValue(v) {
					this.value = v;
				}
			};
	
		if(obj instanceof MK) {
			obj.bindNode(key, input, binder, evt);
		} else {
			magic.bindNode(obj, key, input, binder, evt);
		}
	
	
		return input;
	};*/
	
	describe('Bindings', function () {
		var obj = void 0;
		var node = void 0;
		var binder = void 0;
		var simulateDomEvent = void 0;
	
		beforeEach(function () {
			obj = {};
			node = document.createElement('div');
			binder = {
				on: function (cbc) {
					simulateDomEvent = cbc;
				},
				getValue: function () {
					return node.value;
				},
				setValue: function (v) {
					node.value = v;
				}
			};
		});
	
		it('should bind', function () {
			bindNode(obj, 'x', node, binder);
			obj.x = 'foo';
			expect(node.value).toEqual('foo');
			node.value = 'bar';
			simulateDomEvent();
			expect(obj.x).toEqual('bar');
		});
	
		xit('should bind and call initialize', function () {
			var obj = {},
			    input = $.create('input'),
			    bool = false;
	
			MK.bindNode(obj, 'x', input, {
				initialize: function () {
					bool = true;
				}
			});
	
			expect(bool).toEqual(true);
		});
	
		xit('should unbind', function () {
			var obj = {},
			    input1 = bindInput(obj, 'x'),
			    input2 = bindInput(obj, 'y');
	
			magic.unbindNode(obj, 'x y', [input1, input2]);
	
			obj.x = 'foo';
			obj.y = 'bar';
			expect(input1.value).toEqual('');
			expect(input2.value).toEqual('');
			input1.value = 'baz';
			input2.value = 'qux';
			input1._onkeyup({});
			input2._onkeyup({});
			expect(obj.x).toEqual('foo');
			expect(obj.y).toEqual('bar');
		});
	
		xit('should unbind using key-node object', function () {
			var obj = {},
			    input1 = bindInput(obj, 'x'),
			    input2 = bindInput(obj, 'y');
	
			magic.unbindNode(obj, {
				x: input1,
				y: input2
			});
	
			obj.x = 'foo';
			obj.y = 'bar';
			expect(input1.value).toEqual('');
			expect(input2.value).toEqual('');
			input1.value = 'baz';
			input2.value = 'qux';
			input1._onkeyup({});
			input2._onkeyup({});
			expect(obj.x).toEqual('foo');
			expect(obj.y).toEqual('bar');
		});
	
		xit('should bind via Matreshka instance method', function () {
			var mk = new MK(),
			    input = bindInput(mk, 'x');
	
			mk.x = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(mk.x).toEqual('bar');
		});
	
		xit('should unbind via Matreshka instance method', function () {
			var mk = new MK(),
			    input1 = bindInput(mk, 'x'),
			    input2 = bindInput(mk, 'y');
	
			mk.unbindNode('x y', [input1, input2]);
	
			mk.x = 'foo';
			mk.y = 'bar';
			expect(input1.value).toEqual('');
			expect(input2.value).toEqual('');
			input1.value = 'baz';
			input2.value = 'qux';
			input1._onkeyup({});
			input2._onkeyup({});
			expect(mk.x).toEqual('foo');
			expect(mk.y).toEqual('bar');
		});
	
		xit('should bind delegated target', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z');
	
			obj.x.y.z = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj.x.y.z).toEqual('bar');
		});
	
		xit('should unbind delegated target', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z');
	
			magic.unbindNode(obj, 'x.y.z', input);
	
			obj.x.y.z = 'foo';
			expect(input.value).toEqual('');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj.x.y.z).toEqual('foo');
		});
	
		xit('should rebind delegated target', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z');
	
			obj.x = {
				y: {
					z: 'foo'
				}
			};
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj.x.y.z).toEqual('bar');
		});
	
		xit('should remove binding if delegated target is reassigned', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z'),
			    x = obj.x;
	
			obj.x = {
				y: {
					z: 'foo'
				}
			};
	
			input.value = 'bar';
			input._onkeyup({});
			expect(x.y.z).not.toEqual('bar');
			expect(obj.x.y.z).toEqual('bar');
	
			x.y.z = 'baz';
			expect(input.value).toEqual('bar');
		});
	
		xit('uses custom selectors on current target', function () {
			var obj = MK.to({ x: { y: 'foo' } }),
			    div = $.create('div'),
			    input = div.appendChild($.create('input'));
	
			obj.bindNode('sandbox', div);
			obj.bindNode('x.y', ':sandbox input', {
				on: function (cbc) {
					this._onkeyup = cbc;
				}
			});
	
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj.x.y).toEqual('bar');
		});
	
		xit('throws error when node isn\'t there', function () {
			var obj = {},
			    error = false;
	
			try {
				magic.bindNode(obj, 'x');
			} catch (e) {
				error = true;
			}
	
			expect(error).toBe(true);
		});
	
		xit('doesn\'t throw error with bindOptionalNode when node is missing', function () {
			var obj = {};
	
			magic.bindOptionalNode(obj, 'x');
	
			expect(true).toBe(true);
		});
	
		xit('doesn\'t throw error with bindOptionalNode method of Matreshka when node is missing', function () {
			var mk = new MK();
	
			mk.bindOptionalNode('x', null);
	
			expect(true).toBe(true);
		});
	
		xit('returns bound nodes', function () {
			var obj = {},
			    input = bindInput(obj, 'x');
	
			expect(input).toEqual(magic.bound(obj, 'x'));
			expect(input).toEqual(magic.$bound(obj, 'x')[0]);
		});
	
		xit('selects children of sandbox', function () {
			var obj = {};
	
			magic.bindNode(obj, 'sandbox', '<div>\n\t\t\t\t<div>\n\t\t\t\t\t<span></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');
	
			expect('SPAN').toEqual(magic.select(obj, 'span').tagName);
			expect('SPAN').toEqual(magic.selectAll(obj, 'span')[0].tagName);
		});
	
		xit('selects nodes with custom selector', function () {
			var obj = {};
	
			magic.bindNode(obj, 'sandbox', '<div>\n\t\t\t\t<div>\n\t\t\t\t\t<span></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');
	
			expect('SPAN').toEqual(magic.select(obj, ':bound(sandbox) span').tagName);
			expect('SPAN').toEqual(magic.selectAll(obj, ':sandbox span')[0].tagName);
		});
	
		xit('cancels deep binding via deep: false', function () {
			var obj = {},
			    input = bindInput(obj, 'a.b', {
				deep: false
			});
	
			obj['a.b'] = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';
			input._onkeyup({});
			expect(obj['a.b']).toEqual('bar');
		});
	
		xit('allows to debounce handler', function (done) {
			var obj = {},
			    input = bindInput(obj, 'x', {
				debounce: true
			});
	
			obj.x = 'foo';
			expect(input.value).toEqual('');
			obj.x = 'bar';
			expect(input.value).toEqual('');
	
			setTimeout(function () {
				expect(input.value).toEqual('bar');
				done();
			}, 400);
		});
	
		xit('allows to bind sandbox via bindSandbox', function () {
			var obj = {},
			    div = $.create('div');
	
			MK.bindSandbox(obj, div);
	
			expect(MK.bound(obj, 'sandbox')).toEqual(div);
		});
	
		xit('bindSandbox throws an error when node is missing', function () {
			var obj = {},
			    bool = false;
	
			try {
				MK.bindSandbox(obj, null);
			} catch (e) {
				bool = true;
			}
	
			expect(bool).toBeTruthy();
		});
	});

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';
	
	var bindingErrorPrefix = 'Binding error:';
	var errors = {
		'binding:node_missing': function (_ref) {
			var key = _ref.key;
			var node = _ref.node;
	
			var selectorInfo = typeof node === 'string' ? ' The selector is ' + node : '';
			return bindingErrorPrefix + ' node is missing for ' + key + '.' + selectorInfo;
		},
		'binding:falsy_key': function () {
			return 'Binding error: "key" arg cannot be falsy';
		}
	};
	
	module.exports = MatreshkaError;
	function MatreshkaError(key, data) {
		var getError = errors[key];
		if (!getError) {
			throw Error('Unknown error "' + key + '"');
		}
	
		return new Error(errors[key](data));
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmI0YzEzZjVmZTQyMDMyMjQ4OTUiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0ZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9fZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2lzLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb2ZmLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvYWRkLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvbm90LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvZmluZC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19jb3JlL2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19jb3JlL2RlZnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjIC4qXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdHJlc2hrYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWdpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24uanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7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QUMvQkEsS0FBTSxxQkFBcUIsZ0JBQXJCO0FBQ04sS0FBTSxTQUFTO0FBQ2QsMEJBQXdCLGdCQUFpQjtPQUFmLGVBQWU7T0FBVixpQkFBVTs7QUFDeEMsT0FBTSxlQUFlLE9BQU8sSUFBUCxLQUFnQixRQUFoQix5QkFBK0MsSUFBL0MsR0FBd0QsRUFBeEQsQ0FEbUI7QUFFeEMsVUFBVSwrQ0FBMEMsWUFBTyxZQUEzRCxDQUZ3QztHQUFqQjtBQUl4Qix1QkFBcUI7VUFBTTtHQUFOO0VBTGhCOztrQkFRa0I7QUFBVCxVQUFTLGNBQVQsQ0FBd0IsR0FBeEIsRUFBNkIsSUFBN0IsRUFBbUM7QUFDakQsTUFBTSxXQUFXLE9BQU8sR0FBUCxDQUFYLENBRDJDO0FBRWpELE1BQUcsQ0FBQyxRQUFELEVBQVc7QUFDYixTQUFNLDBCQUF3QixTQUF4QixDQUFOLENBRGE7R0FBZDs7QUFJQSxTQUFPLElBQUksS0FBSixDQUFVLE9BQU8sR0FBUCxFQUFZLElBQVosQ0FBVixDQUFQLENBTmlEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZmI0YzEzZjVmZTQyMDMyMjQ4OTVcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogNjEsXG5cdFwiLi9icXVlcnkvYWRkX3NwZWMuanNcIjogMixcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiAxNyxcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiAxOCxcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogMjAsXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDIxLFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogMjIsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogMjMsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogMjQsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogMjUsXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDI2LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogMjgsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogMjksXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDQwLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogNDEsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDQyLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogNDNcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5hZGQnLCAoKSA9PiB7XG5cdGl0KCdhZGRzIG9uY2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWw0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKFtlbDEsIGVsMiwgZWwzXSkuYWRkKFtlbDIsIGVsMywgZWw0LCBlbDVdKVxuXHRcdF0pLnRvRXF1YWwoW2VsMSwgZWwyLCBlbDMsIGVsNCwgZWw1XSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvYWRkX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBwYXJzZUhUTUwgZnJvbSAnLi9wYXJzZWh0bWwnO1xuaW1wb3J0IG9uZSBmcm9tICcuL29uZSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCBvbiBmcm9tICcuL29uJztcbmltcG9ydCBvZmYgZnJvbSAnLi9vZmYnO1xuaW1wb3J0IGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuL2FkZCc7XG5pbXBvcnQgbm90IGZyb20gJy4vbm90JztcbmltcG9ydCBmaW5kIGZyb20gJy4vZmluZCc7XG5cbi8vIHRpbnkgalF1ZXJ5IHJlcGxhY2VtZW50IGZvciBNYXRyZXNoa2Fcbi8vIGJRdWVyeSBpcyByZXdyaXR0ZW4gdmVyc2lvbiBvZiBiYWxhbGFpa2EuanNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJRdWVyeShzZWxlY3RvciwgY29udGV4dCkge1xuXHRyZXR1cm4gbmV3IEluaXQoc2VsZWN0b3IsIGNvbnRleHQpO1xufVxuXG5ub2ZuLmFzc2lnbihiUXVlcnksIHtcblx0Zm46IEluaXQucHJvdG90eXBlLFxuXHRleHRlbmQsXG5cdHBhcnNlSFRNTCxcblx0b25lLFxuXHRjcmVhdGVcbn0pO1xuXG5ub2ZuLmFzc2lnbihiUXVlcnkuZm4sIHtcblx0b24sXG5cdG9mZixcblx0aXMsXG5cdGFkZCxcblx0bm90LFxuXHRmaW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pbmRleC5qc1xuICoqLyIsImltcG9ydCBodG1sMm5vZGVMaXN0IGZyb20gJy4vX2h0bWwybm9kZWxpc3QnO1xuXG4vLyBmdW5jdGlvbi1jb25zdHJ1Y3RvciBvZiBiUXVlcnkgbGlicmFyeVxuLy8gYWNjZXB0cyBtYW55IGtpbmRzIG9mIGFyZ3VtZW50cyAoc2VsZWN0b3IsIGh0bWwsIGZ1bmN0aW9uKVxuZnVuY3Rpb24gQlF1ZXJ5SW5pdChzZWxlY3RvciwgY29udGV4dCkge1xuXHRsZXQgcmVzdWx0O1xuXG5cdGlmIChzZWxlY3Rvcikge1xuXHRcdGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiBzZWxlY3RvciA9PT0gd2luZG93KSB7XG5cdFx0XHRyZXN1bHQgPSBbc2VsZWN0b3JdO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKC88Ly50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdFx0XHRyZXN1bHQgPSBodG1sMm5vZGVMaXN0KHNlbGVjdG9yKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChjb250ZXh0KSB7XG5cdFx0XHRcdFx0Y29uc3QgbmV3Q29udGV4dCA9IChuZXcgQlF1ZXJ5SW5pdChjb250ZXh0KSlbMF07XG5cblx0XHRcdFx0XHRpZiAobmV3Q29udGV4dCkge1xuXHRcdFx0XHRcdFx0cmVzdWx0ID0gbmV3Q29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHsgLy8gdHlwZW9mIG5vZGVMaXN0IHJldHVybnMgXCJmdW5jdGlvblwiIGluIG9sZCBXZWJLaXRcblx0XHRcdGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcblx0XHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNlbGVjdG9yKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IHNlbGVjdG9yO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGxlbmd0aCA9IHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoO1xuXG5cdGlmIChsZW5ndGgpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLnB1c2gocmVzdWx0W2ldKTtcblx0XHR9XG5cdH1cbn1cblxuQlF1ZXJ5SW5pdC5wcm90b3R5cGUgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgQlF1ZXJ5SW5pdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faW5pdC5qc1xuICoqLyIsIi8vIGNvbnZlcnRzIEhUTUwgc3RyaW5nIHRvIE5vZGVMaXN0IGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBodG1sMm5vZGVMaXN0KGh0bWwpIHtcblx0Ly8gd3JhcE1hcCBpcyB0YWtlbiBmcm9tIGpRdWVyeVxuXHRjb25zdCB3cmFwTWFwID0ge1xuXHRcdG9wdGlvbjogWzEsICc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLCAnPC9zZWxlY3Q+J10sXG5cdFx0bGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcblx0XHR0aGVhZDogWzEsICc8dGFibGU+JywgJzwvdGFibGU+J10sXG5cdFx0dHI6IFsyLCAnPHRhYmxlPjx0Ym9keT4nLCAnPC90Ym9keT48L3RhYmxlPiddLFxuXHRcdHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcblx0XHRjb2w6IFsyLCAnPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD4nLCAnPC9jb2xncm91cD48L3RhYmxlPiddLFxuXHRcdGFyZWE6IFsxLCAnPG1hcD4nLCAnPC9tYXA+J10sXG5cdFx0XzogWzAsICcnLCAnJ11cblx0fTtcblxuXHRsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdGk7XG5cblx0aHRtbCA9IGh0bWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuXG5cdHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcblx0d3JhcE1hcC50Ym9keSA9IHdyYXBNYXAudGZvb3QgPSB3cmFwTWFwLmNvbGdyb3VwID0gd3JhcE1hcC5jYXB0aW9uID0gd3JhcE1hcC50aGVhZDtcblx0d3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cblx0Y29uc3QgZXggPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKSxcblx0XHR3cmFwcGVyID0gZXggJiYgd3JhcE1hcFtleFsxXV0gfHwgd3JhcE1hcC5fO1xuXG5cdG5vZGUuaW5uZXJIVE1MID0gd3JhcHBlclsxXSArIGh0bWwgKyB3cmFwcGVyWzJdO1xuXG5cdGkgPSB3cmFwcGVyWzBdO1xuXG5cdHdoaWxlIChpLS0pIHtcblx0XHRub2RlID0gbm9kZS5jaGlsZHJlblswXTtcblx0fVxuXG5cdHJldHVybiBub2RlLmNoaWxkTm9kZXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcbiAqKi8iLCIvLyBPYmplY3QuYXNzaWduIHBvbHlmeWxsIGlzIHRha2VuIHRoZXJlOlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnbiNQb2x5ZmlsbFxuLy8gYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmVcblxuY29uc3QgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuXHRmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdGNvbnN0IHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuXHRcdFx0Zm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuXHRcdFx0XHRpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG5cdFx0XHRcdFx0b3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V4dGVuZC5qc1xuICoqLyIsImltcG9ydCBodG1sMm5vZGVMaXN0IGZyb20gJy4vX2h0bWwybm9kZWxpc3QnO1xuaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHBhcnNlcyBnaXZlbiBIVE1MIGFuZCByZXR1cm5zIGJRdWVyeSAoQlF1ZXJ5SW5pdCkgaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlSFRNTChodG1sKSB7XG5cdHJldHVybiBuZXcgSW5pdChodG1sMm5vZGVMaXN0KGh0bWwpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiBtYXRjaGVkIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25lKHMsIGNvbnRleHQpIHtcblx0cmV0dXJuIG5ldyBJbml0KHMsIGNvbnRleHQpWzBdO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29uZS5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgSFRNTCBlbGVtZW50XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUodGFnTmFtZSwgcHJvcHMpIHtcblx0aWYgKHR5cGVvZiB0YWdOYW1lID09PSAnb2JqZWN0Jykge1xuXHRcdHByb3BzID0gdGFnTmFtZTtcblx0XHR0YWdOYW1lID0gcHJvcHMudGFnTmFtZTtcblx0fVxuXG5cdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuXHRpZiAocHJvcHMpIHtcblx0XHRub2ZuLmZvck93bihwcm9wcywgKHZhbHVlLCBrZXkpID0+IHtcblx0XHRcdGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdG5vZm4uZm9yT3duKHZhbHVlLCAoYXR0clZhbHVlLCBhdHRyTmFtZSkgPT4ge1xuXHRcdFx0XHRcdGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGtleSA9PT0gJ2NoaWxkcmVuJyAmJiB2YWx1ZSkge1xuXHRcdFx0XHRub2ZuLmZvckVhY2godmFsdWUsIChjaGlsZCkgPT4ge1xuXHRcdFx0XHRcdGVsLmFwcGVuZENoaWxkKGNyZWF0ZShjaGlsZCkpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoZWxba2V5XSAmJiB0eXBlb2YgZWxba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRub2ZuLmFzc2lnbihlbFtrZXldLCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2UgaWYgKGtleSAhPT0gJ3RhZ05hbWUnKSB7XG5cdFx0XHRcdGVsW2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBlbDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9jcmVhdGUuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgd2hlbiBhIHNlbGVjdG9yIGlzIGdpdmVuXG5mdW5jdGlvbiBkZWxlZ2F0ZUhhbmRsZXIoZXZ0LCBzZWxlY3RvciwgaGFuZGxlcikge1xuXHRjb25zdCByYW5kb21JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICd4JyksXG5cdFx0c2NvcGVTZWxlY3RvciA9IGBbJHtyYW5kb21JRH09XCIke3JhbmRvbUlEfVwiXSBgLFxuXHRcdHNwbGl0dGVkU2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuXG5cdGxldCBtYXRjaGluZyA9ICcnO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXR0ZWRTZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IHNlbCA9IHNwbGl0dGVkU2VsZWN0b3JbaV07XG5cdFx0bWF0Y2hpbmcgKz0gYCR7aSA9PT0gMCA/ICcnIDogJywnfSR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0sJHtzY29wZVNlbGVjdG9yfSR7c2VsfSAqYDtcblx0fVxuXG5cblx0dGhpcy5zZXRBdHRyaWJ1dGUocmFuZG9tSUQsIHJhbmRvbUlEKTtcblxuXHRpZiAoaXMuY2FsbChbZXZ0LnRhcmdldF0sIG1hdGNoaW5nKSkge1xuXHRcdGhhbmRsZXIuY2FsbCh0aGlzLCBldnQpO1xuXHR9XG5cblx0dGhpcy5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tSUQpO1xufVxuXG4vLyBhZGRzIGV2ZW50IGxpc3RlbmVyIHRvIGEgc2V0IG9mIGVsZW1udHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKG5hbWVzLCBzZWxlY3RvciwgaGFuZGxlcikge1xuXHRsZXQgZGVsZWdhdGU7XG5cblx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGhhbmRsZXIgPSBzZWxlY3Rvcjtcblx0XHRzZWxlY3RvciA9IG51bGw7XG5cdH1cblxuXHRpZiAoc2VsZWN0b3IpIHtcblx0XHRkZWxlZ2F0ZSA9IGZ1bmN0aW9uIHVuaXF1ZURlbGVnYXRlSGFuZGxlcihldnQpIHtcblx0XHRcdGRlbGVnYXRlSGFuZGxlci5jYWxsKHRoaXMsIGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuXHRcdH07XG5cdH1cblxuXHRuYW1lcyA9IG5hbWVzLnNwbGl0KC9cXHMvKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IG5hbWUgPSBuYW1lc1tpXS5zcGxpdCgvXFwuKC4rKS8pO1xuXHRcdGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG5cdFx0bmFtZSA9IG5hbWVbMF07XG5cblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGNvbnN0IG5vZGUgPSB0aGlzW2pdLFxuXHRcdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4LFxuXHRcdFx0XHRldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlSURdIHx8IFtdO1xuXG5cdFx0XHRsZXQgZXhpc3QgPSBmYWxzZTtcblxuXG5cdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblxuXHRcdFx0XHRpZiAoaGFuZGxlciA9PT0gZXZlbnQuaGFuZGxlciAmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBldmVudC5zZWxlY3RvcikpIHtcblx0XHRcdFx0XHRleGlzdCA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKCFleGlzdCkge1xuXHRcdFx0XHRldmVudHMucHVzaCh7XG5cdFx0XHRcdFx0ZGVsZWdhdGUsXG5cdFx0XHRcdFx0aGFuZGxlcixcblx0XHRcdFx0XHRuYW1lc3BhY2UsXG5cdFx0XHRcdFx0c2VsZWN0b3Jcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGRlbGVnYXRlIHx8IGhhbmRsZXIsIGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbi5qc1xuICoqLyIsIi8vIHNoYXJlIGRhdGEgYmV0d2VlbiBhcyBhbiBvYmplY3QgbW9kdWxlcyBiZWNhdXNlIHdlIHVzZVxuLy8gc2ltcGxpZmllZCBlcyBtb2R1bGVzIHRoZXJlIGFuZCBjYW5ub3QgaW1wb3J0IGFuZCBzaGFyZSBhIG51bWJlclxuZXhwb3J0IGRlZmF1bHQge1xuXHRub2RlSW5kZXg6IDAsXG5cdGFsbEV2ZW50czoge31cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2RhdGEuanNcbiAqKi8iLCIvLyBjaGVjayB0aGUgZmlyc3QgZWxlbWVudCBmcm9tIGdpdmVuIHNldCBhZ2FpbnN0IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzKHMpIHtcblx0Y29uc3Qgbm9kZSA9IHRoaXNbMF07XG5cdHJldHVybiBub2RlXG5cdFx0PyAobm9kZS5tYXRjaGVzXG5cdFx0XHR8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2lzLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIHJlbW92ZXMgZXZlbnQgaGFuZGxlciBmcm9tIGEgc2V0IG9mIGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XG5cdFx0c2VsZWN0b3IgPSBudWxsO1xuXHR9XG5cblx0bmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcblx0XHRjb25zdCBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuXHRcdG5hbWUgPSBuYW1lWzBdO1xuXG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gdGhpc1tqXSxcblx0XHRcdFx0ZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGUuYiRdO1xuXG5cdFx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRcdGZvciAobGV0IGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0Y29uc3QgZXZlbnQgPSBldmVudHNba107XG5cdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0KCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuZGVsZWdhdGUpXG5cdFx0XHRcdFx0XHQmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IGV2ZW50Lm5hbWVzcGFjZSlcblx0XHRcdFx0XHRcdCYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50LmRlbGVnYXRlIHx8IGV2ZW50LmhhbmRsZXIpO1xuXHRcdFx0XHRcdFx0ZXZlbnRzLnNwbGljZShrLS0sIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG5cdFx0XHRcdFx0bm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb2ZmLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcblxuLy8gYWRkcyB1bmlxdWUgbm9kZXMgdG8gYlF1ZXJ5IGNvbGxlY3Rpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZChzZWxlY3Rvcikge1xuXHRjb25zdCBpZE1hcCA9IHt9O1xuXG5cdGxldCByZXN1bHQsXG5cdFx0bm9kZUlELFxuXHRcdG5vZGUsXG5cdFx0aTtcblxuXHRzZWxlY3RvciA9IG5ldyBJbml0KHNlbGVjdG9yKTtcblxuXHRpZiAodGhpcy5sZW5ndGgpIHtcblx0XHRyZXN1bHQgPSBuZXcgSW5pdCh0aGlzKTtcblx0XHRmb3IgKGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRub2RlID0gcmVzdWx0W2ldO1xuXHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleDtcblx0XHRcdGlkTWFwW25vZGVJRF0gPSAxO1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuXHRcdFx0bm9kZSA9IHNlbGVjdG9yW2ldO1xuXHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleDtcblx0XHRcdGlmICghaWRNYXBbbm9kZUlEXSkge1xuXHRcdFx0XHRpZE1hcFtub2RlSURdID0gMTtcblx0XHRcdFx0cmVzdWx0LnB1c2gobm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9IHNlbGVjdG9yO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9hZGQuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gZXhjbHVkZXMgZWxlbWVudHMgZnJvbSBjdXJyZW50IHNldCBieSBnaXZlbiBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90KHNlbGVjdG9yKSB7XG5cdGNvbnN0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKCFuZXcgSW5pdCh0aGlzW2ldKS5pcyhzZWxlY3RvcikpIHtcblx0XHRcdHJlc3VsdC5wdXNoKHRoaXNbaV0pO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvbm90LmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIGVsZW1lbnRzLFxuLy8gZmlsdGVyZWQgYnkgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuXHRsZXQgcmVzdWx0ID0gbmV3IEluaXQoKTtcblxuXHRub2ZuLmZvckVhY2godGhpcywgZWwgPT4ge1xuXHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQoZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXHR9KTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2ZpbmQuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5jcmVhdGUnLCAoKSA9PiB7XG5cdGl0KCdjcmVhdGVzIGVsZW1lbnQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicpLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ0RJVicpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBhIHByb3BlcnR5JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGNsYXNzTmFtZTogJ2Zvb2Jhcidcblx0XHRcdH0pLmNsYXNzTmFtZVxuXHRcdCkudG9FcXVhbCgnZm9vYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdjcmVhdGVzIGNoaWxkZW4nLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0Y2hpbGRyZW46IFt7XG5cdFx0XHRcdFx0dGFnTmFtZTogJ3NwYW4nXG5cdFx0XHRcdH1dXG5cdFx0XHR9KS5jaGlsZHJlblswXS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdTUEFOJyk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIGF0dHJpYnV0ZScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdFx0Zm9vOiAnYmFyJ1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5nZXRBdHRyaWJ1dGUoJ2ZvbycpXG5cdFx0KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG9iamVjdCB3aXRoIHRhZ05hbWUgcHJvcGVydHknLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoe1xuXHRcdFx0XHR0YWdOYW1lOiAnZGl2J1xuXHRcdFx0fSkudGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnRElWJyk7XG5cdH0pO1xuXG5cdHhpdCgnZXh0ZW5kcyBkYXRhc2V0IG9iamVjdCcsICgpID0+IHtcblx0XHQvLyBUT0RPXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcbmltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2xpYi9zaW11bGF0ZWNsaWNrJztcblxuZGVzY3JpYmUoJ2JRdWVyeSBldmVudHMnLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveCxcblx0XHRjaGlsZDEsXG5cdFx0Y2hpbGQyLFxuXHRcdGdyYW5kY2hpbGQxLFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGQxXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDJcIj48L2Rpdj5cblx0XHRgO1xuXG5cdFx0Y2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpO1xuXHRcdGNoaWxkMiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDInKTtcblx0XHRncmFuZGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkMScpO1xuXG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRhZnRlckVhY2goKCkgPT4ge1xuXHRcdCQoW3Rlc3RTYW5kYm94LCBjaGlsZDEsIGNoaWxkMiwgZ3JhbmRjaGlsZDFdKS5vZmYoJ2NsaWNrJyk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgbmFtZXNwYWNlZCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBidWJibGluZyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChjbGljayBvbiBncmFuZGNoaWxkcmVuKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdEb2VzblxcdCB0cmlnZ2VyIHdoZW4gY2xpY2tlZCBvbiB3cm9uZyBjaGlsZCcsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMicsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIHNwZWNpZmllZCwgaGFuZGxlciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBub3Qgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdTdG9wcyBwcm9wYWdhdGlvbicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHQkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXG4gKiovIiwiLy8gc2ltdWxhdGVzIGNsaWNrIG9uIGEgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2ltdWxhdGVDbGljayhub2RlKSB7XG5cdGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG5cdGV2dC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlKTtcblx0bm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL3NpbXVsYXRlY2xpY2suanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5maW5kJywgKCkgPT4ge1xuXHRsZXQgdGVzdFNhbmRib3gsXG5cdFx0Z3JhbmRDaGlsZDtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0Z3JhbmRDaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkJyk7XG5cdH0pO1xuXG5cdGl0KCdmaW5kcycsICgpID0+IHtcblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJCh0ZXN0U2FuZGJveCkuZmluZCgnLmdyYW5kY2hpbGQnKVxuXHRcdF0pLnRvRXF1YWwoW2dyYW5kQ2hpbGRdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5Jztcbi8vINC30LDRgdGD0L3Rg9GC0Ywg0LLRgdC1INGB0L7Qt9C00LDQvdC40Y8g0L3QvtCy0YvRhSDRjdC70LXQvNC10L3RgtC+0LIg0LIgYmVmb3JlRWFjaFxuLy8g0YDQtdGE0LDQutGC0L7RgNC40YLRjFxuLy8g0L3QsNC/0LjRgdCw0YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC4ICjQsiDRgtC+0Lwg0YfQuNGB0LvQtSDQuCDQuiDRg9C20LUg0YDQtdCw0LvQuNC30L7QstCw0L3QvdGL0Lwg0YTRg9C90LrRhtC40Y/QvClcbi8vINC/0L7RgdC70LUg0LLRgdC10LPQviDQvdGD0LbQvdC+INCy0LrQu9GO0YfQuNGC0Ywg0LvQuNC90YLQtdGAINC4INC/0YDQvtCy0LXRgNC40YLRjCDQutC+0LLQtdGA0LDQtNC2XG5cbmRlc2NyaWJlKCdiUXVlcnkgaW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveDtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInRlc3RcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtMVwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0yXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTNcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH0pO1xuXG5cdGl0KCdhY2NlcHRzIHdpbmRvdycsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKHdpbmRvdyk7XG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuXHR9KTtcblxuXHRpdCgnYWNjZXB0cyBkb2N1bWVudCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKGRvY3VtZW50KTtcblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKGRvY3VtZW50KTtcblx0fSk7XG5cblx0aXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ2NvbnZlcnRzIGFycmF5LWxpa2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgY2hpbGRyZW4gPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJyksXG5cdFx0XHRyZXN1bHQgPSAkKGNoaWxkcmVuKTtcblxuXHRcdGV4cGVjdChjaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwocmVzdWx0Lmxlbmd0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRleHBlY3QoY2hpbGRyZW5baV0pLnRvRXF1YWwocmVzdWx0W2ldKTtcblx0XHR9XG5cdH0pO1xuXG5cdGl0KCdDb252ZXJ0cyBvbmUgZWxlbWVudCcsICgpID0+IHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKicpLFxuXHRcdFx0cmVzdWx0ID0gJChlbGVtZW50KTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChlbGVtZW50KS50b0VxdWFsKHJlc3VsdFswXSk7XG5cdH0pO1xuXG5cdGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgnLnRlc3QtMScsIHRlc3RTYW5kYm94KS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMSk7XG5cdH0pO1xuXG5cdGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgnLnRlc3QtMScsICcud3JvbmctY29udGV4dCcpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byB1c2UgbnVsbCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKG51bGwpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byB1c2UgdW5kZWZpbmVkJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQoKS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdBbGxvd3MgdG8gY3JlYXRlIHBsdWdpbnMnLCAoKSA9PiB7XG5cdFx0JC5mbi5iUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiBiUXVlcnlQbHVnaW4oKSB7XG5cdFx0XHRleHBlY3QoXG5cdFx0XHRcdHRoaXMubGVuZ3RoXG5cdFx0XHQpLnRvRXF1YWwoXG5cdFx0XHRcdHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5sZW5ndGhcblx0XHRcdCk7XG5cdFx0fTtcblxuXHRcdHNweU9uKCQuZm4sICdiUXVlcnlQbHVnaW4nKTtcblxuXHRcdCQoJyonLCB0ZXN0U2FuZGJveCkuYlF1ZXJ5UGx1Z2luKCk7XG5cblx0XHRleHBlY3QoJC5mbi5iUXVlcnlQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pbml0X3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG5cdGl0KCdjaGVja3MgY2xhc3NOYW1lJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuXHRcdGV4cGVjdChcblx0XHRcdCQoZWwpLmlzKCcuZWwnKVxuXHRcdCkudG9FcXVhbCh0cnVlKTtcblxuXHRcdGV4cGVjdChcblx0XHRcdCQoZWwpLmlzKCcuZWwyJylcblx0XHQpLnRvRXF1YWwoZmFsc2UpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG5cdGl0KCdleGNsdWRlcyBieSBzZWxlY3RvcicsICgpID0+IHtcblx0XHRjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJChbZWwxLCBlbDIsIGVsM10pLm5vdCgnLmVsMicpXG5cdFx0XSkudG9FcXVhbChbZWwxLCBlbDNdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5Lm9uZScsICgpID0+IHtcblx0aXQoJ2ZpbmRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0PGRpdiBjbGFzcz1cImNoaWxkXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJjaGlsZDJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMlwiPjwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5vbmUoJyonLCB0ZXN0U2FuZGJveClcblx0XHQpLnRvRXF1YWwoY2hpbGQpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkucGFyc2VIVE1MJywgKCkgPT4ge1xuXHRpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8dGQ+PC90ZD48dGQ+PC90ZD4nKTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgQ2xhc3MgZnJvbSAnc3JjL2NsYXNzJztcblxuZGVzY3JpYmUoJ0NsYXNzIGZ1bmN0aW9uJywgKCkgPT4ge1xuXHRpdCgnYWxsb3dzIHRvIGluaGVyaXQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgQSA9IENsYXNzKHsgYTogdHJ1ZSB9KSxcblx0XHRcdEIgPSBDbGFzcyh7IGI6IHRydWUsIGV4dGVuZHM6IEEgfSksXG5cdFx0XHRDID0gQ2xhc3MoeyBjOiB0cnVlLCBleHRlbmRzOiBCIH0pLFxuXHRcdFx0aW5zdCA9IG5ldyBDO1xuXG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBCKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDKS50b0JlVHJ1dGh5KCk7XG5cblx0XHRleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QuYikudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0LmMpLnRvQmVUcnV0aHkoKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcblx0XHRjb25zdCBBID0gQ2xhc3Moe30sIHsgc3RhdGljUHJvcDogdHJ1ZSB9KTtcblx0XHRleHBlY3QoQS5zdGF0aWNQcm9wKS50b0JlVHJ1dGh5KCk7XG5cdH0pO1xuXG5cdGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGluc3QgPSBuZXcgQ2xhc3MoeyBhOiB0cnVlIH0pO1xuXHRcdGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xhc3MocHJvdG90eXBlLCBzdGF0aWNQcm9wcykge1xuXHRjb25zdCBDb25zdHJ1Y3RvciA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0XG5cdFx0XHQ/IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxuXHRcdFx0OiBmdW5jdGlvbiBFbXB0eUNvbnN0cnVjdG9yKCkge30sXG5cdFx0Ly9leHRlbmRzIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblx0XHRQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuXHRcdC8vaW5oZXJpdCBwcm90byBmcm9tIGNsYXNzIHBhcmVudCBvciBlbXB0eSBvYmplY3Rcblx0XHRwcm90byA9IE9iamVjdC5jcmVhdGUoUGFyZW50ID8gUGFyZW50LnByb3RvdHlwZSA6IHt9KTtcblxuXHRleHRlbmQocHJvdG8sIHByb3RvdHlwZSk7XG5cblx0aWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcblx0XHRleHRlbmQoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcblx0fVxuXG5cdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cdHByb3RvLmluc3RhbmNlT2YgPSBmdW5jdGlvbiBpbnN0YW5jZU9mKCkge1xuXHRcdHJldHVybiB0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3I7XG5cdH07XG5cblx0Q29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cblx0Ly8gaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZVxuXHRpZiAodGhpcyBpbnN0YW5jZW9mIENsYXNzKSB7XG5cdFx0cmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBDb25zdHJ1Y3Rvcjtcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3MuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0Y2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge1xuXHRcdFx0YToge31cblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe30pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdGE6IHt9XG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe1xuXHRcdFx0YToge31cblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXVswXS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG5cdFx0XHR5OiBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdFx0YToge31cblx0XHRcdH0pXG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC55LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuXG5kZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChiYXNpYyknLCBmdW5jdGlvbiB0ZXN0KCkge1xuXHRsZXQgY3R4LFxuXHRcdGhhbmRsZXI7XG5cblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHRjdHggPSB7fTtcblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSB7fTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIuYyA9IHt9O1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpLFxuXHRcdFx0YSA9IG9iai5hO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG5cdFx0dHJpZ2dlck9uZShhLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpLFxuXHRcdFx0YiA9IG9iai5hLmI7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0ge307XG5cdFx0dHJpZ2dlck9uZShiLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRhID0gb2JqLmE7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG5cdFx0dHJpZ2dlck9uZShhLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YiA9IG9iai5hLmI7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG5cdFx0dHJpZ2dlck9uZShiLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGMgPSBvYmouYS5jO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLmMgPSB7fTtcblx0XHR0cmlnZ2VyT25lKGMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZG9lc25cXCd0IHJlbW92ZSBjaGFuZ2UgZXZlbnQgd2hlbiB1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuXHRcdG9iai5hLmIuYyA9IDU1O1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VzZXMgY29ycmVjdCBjb250ZXh0IGZvciBkZWxlZ2F0ZWQgZXZlbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cdFx0bGV0IGJvb2wgPSBmYWxzZTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZnVuY3Rpb24gaGFuZGxlKCkge1xuXHRcdFx0Ym9vbCA9IHRoaXMgPT09IGN0eDtcblx0XHR9LCBjdHgpO1xuXG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiBbXCJlcnJvclwiLCB7IFwiZnVuY3Rpb25zXCI6IGZhbHNlIH1dKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL2FkZGxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG5cdHByZXZpb3VzVmFsdWUsXG5cdHZhbHVlXG59LCB7XG5cdHBhdGgsXG5cdG5hbWUsXG5cdGNhbGxiYWNrLFxuXHRjb250ZXh0XG59ID0gdHJpZ2dlck9uZS5sYXRlc3RFdmVudC5pbmZvLmRlbGVnYXRlZERhdGEpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKHZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cblxuXHRpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuXHQvLyBpZiB0eXBlb2YgcGF0aCBpcyBzdHJpbmcgYW5kIHBhdGggaXMgbm90IGVtcHR5IHN0cmluZyB0aGVuIHNwbGl0IGl0XG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gYWRkIHNpbXBsZSBsaXN0ZW5lclxuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG5cdFx0Y29uc3Qga2V5ID0gcGF0aFswXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRjb25zdCBkZWxlZ2F0ZWREYXRhID0ge1xuXHRcdFx0cGF0aCxcblx0XHRcdG5hbWUsXG5cdFx0XHRjYWxsYmFjayxcblx0XHRcdGNvbnRleHRcblx0XHR9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuXHRcdFx0ZGVsZWdhdGVkRGF0YSxcblx0XHRcdHBhdGhTdHJcblx0XHR9KTtcblxuXHRcdGNoYW5nZUhhbmRsZXIoe1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldXG5cdFx0fSwgZGVsZWdhdGVkRGF0YSk7XG5cdH1cbn1cblxuLypcbmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL2luaXRtaycsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCcsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL3NwZWNpYWxldnRyZWcnXG5dLCBmdW5jdGlvbihjb3JlLCBpbml0TUssIG1hcCwgc3BlY2lhbEV2dFJlZykge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIF9kZWxlZ2F0ZUxpc3RlbmVyID0gY29yZS5fZGVsZWdhdGVMaXN0ZW5lciA9IGZ1bmN0aW9uKG9iamVjdCxcblx0IHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zixcblx0XHRcdGZpcnN0S2V5ID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsxXSA6IHBhdGgsXG5cdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRvYmo7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0ZXZ0RGF0YSA9IGV2dERhdGEgfHwge307XG5cblx0XHRpZiAoZmlyc3RLZXkpIHtcblx0XHRcdGlmIChmaXJzdEtleSA9PSAnKicpIHtcblx0XHRcdFx0aWYgKG9iamVjdC5pc01LQXJyYXkpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHQoZXZ0ICYmIGV2dC5hZGRlZCA/IGV2dC5hZGRlZCA6IG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0gJiYgX2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSxcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGYuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnYWRkJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0ZigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9iamVjdC5pc01LT2JqZWN0KSB7XG5cdFx0XHRcdFx0ZiA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtldnQua2V5XTtcblxuXHRcdFx0XHRcdFx0aWYgKHRhcmdldCAmJiBldnQgJiYgKGV2dC5rZXkgaW4gb2JqZWN0RGF0YS5rZXlzKSkge1xuXHRcdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcih0YXJnZXQsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0b2JqZWN0LmVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZScsIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0aWYgKGV2dCAmJiBldnQuX3NpbGVudCkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtmaXJzdEtleV0sXG5cdFx0XHRcdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRcdFx0XHR0cmlnZ2VyQ2hhbmdlID0gdHJ1ZSxcblx0XHRcdFx0XHRcdGksXG5cdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHM7XG5cblx0XHRcdFx0XHRldnREYXRhLnBhdGggPSBwYXRoO1xuXG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlID0gZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlIHx8XG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZVtmaXJzdEtleV07XG5cblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlICYmIG1hcC5oYXMoZXZ0LnByZXZpb3VzVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRjb3JlLl91bmRlbGVnYXRlTGlzdGVuZXIoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldCA9PSAnb2JqZWN0JyAmJiB0YXJnZXQpIHtcblx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzcGVjaWFsRXZ0UmVnLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0XHRcdGNoYW5nZUtleSA9IG5hbWUucmVwbGFjZShzcGVjaWFsRXZ0UmVnLCAnJyk7XG5cblx0XHRcdFx0XHRcdGlmICghcGF0aCAmJiBldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2NoYW5nZUtleV1cblx0XHRcdFx0XHRcdCE9PSB0YXJnZXRbY2hhbmdlS2V5XSkge1xuXHRcdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHMgPSBtYXAuZ2V0KGV2dERhdGEucHJldmlvdXNWYWx1ZSkuZXZlbnRzW25hbWVdO1xuXHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNoYW5nZUV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNoYW5nZUV2ZW50c1tpXS5wYXRoID09PSBwYXRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAodHJpZ2dlckNoYW5nZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvcmUuc2V0KHRhcmdldCwgY2hhbmdlS2V5LCB0YXJnZXRbY2hhbmdlS2V5XSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yY2U6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlOiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzT2JqZWN0OiBldnREYXRhLnByZXZpb3VzVmFsdWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfc2lsZW50OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBmLCBjb250ZXh0LCBldnREYXRhKTtcblxuXHRcdFx0XHRmKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcImV2dFwiXSB9XSovXG5cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5cbi8vIHByb3BlcnR5IG1vZGlmaWVyIGV2ZW50IHJlZ2V4cFxuY29uc3QgcHJvcE1vZEV2ZW50UmVnXG5cdD0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuLy8gYWRkcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXJcbi8vIHVzZWQgYXMgY29yZSBvZiBldmVudCBlbmdpbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBpbml0TUsob2JqZWN0KSxcblx0XHRjdHggPSBjb250ZXh0IHx8IG9iamVjdCxcblx0XHRldmVudHMgPSBhbGxFdmVudHNbbmFtZV0sXG5cdFx0ZXZ0ID0geyBjYWxsYmFjaywgY29udGV4dCwgY3R4LCBuYW1lLCBpbmZvIH07XG5cblxuXHQvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZVxuXHRpZiAoZXZlbnRzKSB7XG5cdFx0Ly8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIGRhdGEsIHJldHVybiBmYWxzZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBldnQgPSBldmVudHNbaV07XG5cdFx0XHRpZiAoKGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjay5fY2FsbGJhY2spXG5cdFx0XHRcdFx0JiYgZXZ0LmNvbnRleHQgPT09IGNvbnRleHQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGlmIHRoZSBldmVudCBpc24ndCBmb3VuZCBhZGQgaXQgdG8gdGhlIGV2ZW50IGxpc3Rcblx0XHRldmVudHMucHVzaChldnQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lLCBjcmVhdGUgYXJyYXkgd2l0aCBvbmx5IGViZW50XG5cdFx0YWxsRXZlbnRzW25hbWVdID0gW2V2dF07XG5cdH1cblxuXHRpZiAocHJvcE1vZEV2ZW50UmVnLnRlc3QobmFtZSkpIHtcblx0XHQvLyBkZWZpbmUgbmVlZGVkIGFjY2Vzc29ycyBmb3IgS0VZXG5cdFx0ZGVmaW5lUHJvcChvYmplY3QsIG5hbWUucmVwbGFjZShwcm9wTW9kRXZlbnRSZWcsICcnKSk7XG5cdH1cblxuXHRpZiAobmFtZVswXSAhPT0gJ18nKSB7XG5cdFx0dHJpZ2dlck9uZShvYmplY3QsIGBhZGRldmVudDoke25hbWV9YCwgZXZ0KTtcblx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ2FkZGV2ZW50JywgZXZ0KTtcblx0fVxuXG5cdC8vIGlmIGV2ZW50IGlzIGFkZGVkIHJldHVybiB0cnVlXG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuXHRsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblx0aWYgKCFkZWYpIHtcblx0XHRkZWYgPSB7XG5cdFx0XHQvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuXHRcdFx0Ly8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24sXG5cdFx0XHRcdFx0Y3R4OiBvYmplY3QsXG5cdFx0XHRcdFx0Y29udGV4dDogb2JqZWN0Mixcblx0XHRcdFx0XHRuYW1lOiBcImV4YW1wbGVcIlxuXHRcdFx0XHR9XG5cdFx0XHRcdCovXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHQvLz9ub2RlczogY29yZS4kKCksXG5cdFx0XHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdGdldHRlcjogbnVsbCxcblx0XHRcdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRcdFx0bWVkaWF0b3I6IG51bGwsXG5cdFx0XHRcdFx0Ly8/ZGVzdHJveWVyczogTWFwLFxuXHRcdFx0XHRcdGJpbmRpbmdzOiBbe1xuXHRcdFx0XHRcdFx0bm9kZSxcblx0XHRcdFx0XHRcdGJpbmRlcixcblx0XHRcdFx0XHRcdG5vZGVIYW5kbGVyLFxuXHRcdFx0XHRcdFx0b2JqZWN0SGFuZGxlclxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH0qL1xuXHRcdFx0fSxcblx0XHRcdGlkOiBgbWske01hdGgucmFuZG9tKCl9YFxuXHRcdH07XG5cblx0XHRkZWZzLnNldChvYmplY3QsIGRlZik7XG5cdH1cblxuXHRyZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TUsob2JqZWN0KSB7XG5cdGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqZWN0O1xuXHRpZiAoIW9iamVjdCB8fCB0eXBlICE9PSAnb2JqZWN0Jykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZX0gY2Fubm90IGJlIHVzZWQgaW4gdGhpcyBtZXRob2RgKTtcblx0fVxuXG5cdC8vIGlmIG9iamVjdCBoYXMgX2luaXRNSyBtZXRob2QsIHJ1biBpdFxuXHQvLyBlbHNlIHJ1biBjb21tb25Jbml0XG5cdC8vIGV2ZXJ5IF9pbml0TUsgaW1wbGVtZW50YXRpb24gaGF2ZSB0byBydW4gY29tbW9uSW5pdCBvciBwYXJlbnQncyBfaW5pdE1LXG5cdHJldHVybiBvYmplY3QuX2luaXRNSyA/IG9iamVjdC5faW5pdE1LKCkgOiBjb21tb25Jbml0KG9iamVjdCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9pbml0LmpzXG4gKiovIiwiZnVuY3Rpb24gUHNldWRvTWFwKCkge31cblxuLy8gUHNldWRvTWFwIHNpbXVsYXRlcyBXZWFrTWFwIGJlaGF2aW9yIHdpdGggTygxKSBzZWFyY2ggY29tcGxleGl0eVxuLy8gaXQncyBuZWVkZWQgZm9yIEBJRTkgYW5kIEBJRTEwXG5ub2ZuLmFzc2lnbihQc2V1ZG9NYXAucHJvdG90eXBlLCB7XG5cdGdldChvYmopIHtcblx0XHRyZXR1cm4gb2JqLm1hdHJlc2hrYURhdGE7XG5cdH0sXG5cdHNldChvYmosIGRhdGEpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbWF0cmVzaGthRGF0YScsIHtcblx0XHRcdHZhbHVlOiBkYXRhLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdFx0fSk7XG5cdH0sXG5cdGhhcyhvYmopIHtcblx0XHRyZXR1cm4gJ21hdHJlc2hrYURhdGEnIGluIG9iajtcblx0fVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IG5ldyBQc2V1ZG9NYXAoKSA6IG5ldyBXZWFrTWFwKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCBldmVudHMgPSBkZWYuZXZlbnRzW25hbWVdO1xuXG5cdGlmIChldmVudHMpIHtcblx0XHRjb25zdCBhcmdzID0gbm9mbi5zbGljZShhcmd1bWVudHMsIDIpLFxuXHRcdFx0bCA9IGV2ZW50cy5sZW5ndGgsXG5cdFx0XHRbYTEsIGEyLCBhM10gPSBhcmdzO1xuXG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0ZXY7XG5cblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMTpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAyOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAzOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufVxuXG50cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0ge1xuXHRpbmZvOiB7fSxcblx0bmFtZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmaW5lUHJvcChvYmplY3QsIGtleSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIGRvIG5vdGhpbmdcblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRpZiAoIWRlZi5wcm9wc1trZXldKSB7XG5cdFx0Y29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0c2V0dGVyOiBudWxsLFxuXHRcdFx0bWVkaWF0b3I6IG51bGwsXG5cdFx0XHRiaW5kaW5nczogbnVsbFxuXHRcdH07XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcERlZi5nZXR0ZXIgPyBwcm9wRGVmLmdldHRlci5jYWxsKG9iamVjdCkgOiBwcm9wRGVmLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldCh2KSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuXHRcdFx0XHRcdGZyb21TZXR0ZXI6IHRydWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZGVmO1xufVxuXG5cbi8qZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0Y29yZS5fZGVmaW5lU3BlY2lhbCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5LCBub0FjY2Vzc29ycykge1xuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcgfHwgIW1hcC5oYXMob2JqZWN0KSkgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdFx0c3BlY2lhbFByb3BzID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV07XG5cblx0XHRpZiAoIXNwZWNpYWxQcm9wcykge1xuXHRcdFx0c3BlY2lhbFByb3BzID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0gPSB7XG5cdFx0XHRcdCRub2RlczogY29yZS4kKCksXG5cdFx0XHRcdHZhbHVlOiBvYmplY3Rba2V5XSxcblx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRcdG1lZGlhdG9yOiBudWxsXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIW5vQWNjZXNzb3JzICYmIGtleSAhPSAnc2FuZGJveCcpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzcGVjaWFsUHJvcHMuZ2V0dGVyID8gc3BlY2lhbFByb3BzLmdldHRlci5jYWxsKG9iamVjdCkgOiBzcGVjaWFsUHJvcHMudmFsdWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHYpIHtcblx0XHRcdFx0XHRcdHNwZWNpYWxQcm9wcy5zZXR0ZXIgPyBzcGVjaWFsUHJvcHMuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IGNvcmUuc2V0KG9iamVjdCwga2V5LCB2LCB7XG5cdFx0XHRcdFx0XHRcdGZyb21TZXR0ZXI6IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNwZWNpYWxQcm9wcztcblx0fTtcbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZmluZXByb3AuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IHsgcHJvcHMsIGV2ZW50cyB9ID0gZGVmLFxuXHRcdHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG5cdGlmICghcHJvcERlZikge1xuXHRcdG9iamVjdFtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG5cblx0Ly8gVE9ETyBOT1QgUkVRVUlSRURcblx0ZXZ0ID0gbm9mbi5hc3NpZ24oZXZ0LCB7XG5cdFx0dmFsdWUsXG5cdFx0a2V5LFxuXHRcdHByZXZpb3VzVmFsdWVcblx0fSk7XG5cblx0cHJvcERlZi52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmIChwcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuXHRcdGlmIChldmVudHNbYGNoYW5nZToke2tleX1gXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGBjaGFuZ2U6JHtrZXl9YCwgZXZ0KTtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBldnQpO1xuXHRcdH1cblxuXHRcdGlmIChldmVudHMuY2hhbmdlKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ2NoYW5nZScsIGV2dCk7XG5cdFx0fVxuXHR9XG59XG5cbi8qZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIHNldDtcblxuXHRjb3JlLmdldCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5KSB7XG5cdFx0cmV0dXJuIG9iamVjdCAmJiBvYmplY3Rba2V5XTtcblx0fTtcblxuXHQvLyBzZXQgbWV0aG9kIGlzIHRoZSBtb3N0IG9mdGVuIHVzZWQgbWV0aG9kXG5cdC8vIHdlIG5lZWQgdG8gb3B0aW1pemUgaXQgYXMgZ29vZCBhcyBwb3NzaWJsZVxuXHRzZXQgPSBjb3JlLnNldCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2LCBldnQpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIHR5cGUgPSB0eXBlb2Yga2V5LFxuXHRcdFx0X2lzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpO1xuXHRcdFx0fSxcblx0XHRcdG9iamVjdERhdGEsXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0ZXZlbnRzLFxuXHRcdFx0cHJldlZhbCxcblx0XHRcdG5ld1YsXG5cdFx0XHRpLFxuXHRcdFx0X2V2dCxcblx0XHRcdGlzQ2hhbmdlZCxcblx0XHRcdHRyaWdnZXJDaGFuZ2U7XG5cblx0XHRpZiAodHlwZSA9PSAndW5kZWZpbmVkJykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGlmICh0eXBlID09ICdvYmplY3QnKSB7XG5cdFx0XHRmb3IgKGkgaW4ga2V5KSB7XG5cdFx0XHRcdGlmIChrZXkuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRzZXQob2JqZWN0LCBpLCBrZXlbaV0sIHYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0fVxuXG5cdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KTtcblxuXHRcdGlmICghb2JqZWN0RGF0YSB8fCAhb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0pIHtcblx0XHRcdG9iamVjdFtrZXldID0gdjtcblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0fVxuXG5cdFx0c3BlY2lhbCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldO1xuXHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzO1xuXG5cdFx0cHJldlZhbCA9IHNwZWNpYWwudmFsdWU7XG5cblx0XHRpZiAoc3BlY2lhbC5tZWRpYXRvciAmJiB2ICE9PSBwcmV2VmFsICYmICghZXZ0IHx8ICFldnQuc2tpcE1lZGlhdG9yICYmICFldnQuZnJvbU1lZGlhdG9yKSkge1xuXHRcdFx0bmV3ViA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdWID0gdjtcblx0XHR9XG5cblx0XHRpc0NoYW5nZWQgPSBuZXdWICE9PSBwcmV2VmFsO1xuXG5cdFx0X2V2dCA9IHtcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2dCxcblx0XHRcdHZhbHVlOiBuZXdWLFxuXHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldlZhbCxcblx0XHRcdGtleToga2V5LFxuXHRcdFx0bm9kZTogc3BlY2lhbC4kbm9kZXNbMF0gfHwgbnVsbCxcblx0XHRcdCRub2Rlczogc3BlY2lhbC4kbm9kZXMsXG5cdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRpc0NoYW5nZWQ6IGlzQ2hhbmdlZFxuXHRcdH07XG5cblx0XHRpZiAoZXZ0ICYmIHR5cGVvZiBldnQgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IF9ldnRbaV0gfHwgZXZ0W2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IF9ldnQuZm9yY2UpICYmICFfZXZ0LnNpbGVudDtcblxuXHRcdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0XHRldmVudHNbJ2JlZm9yZWNoYW5nZTonICsga2V5XSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiZWZvcmVjaGFuZ2U6JyArIGtleSwgX2V2dCk7XG5cblx0XHRcdGV2ZW50cy5iZWZvcmVjaGFuZ2UgJiYgY29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmVmb3JlY2hhbmdlJywgX2V2dCk7XG5cdFx0fVxuXG5cdFx0c3BlY2lhbC52YWx1ZSA9IG5ld1Y7XG5cblx0XHRpZiAoaXNDaGFuZ2VkIHx8IF9ldnQuZm9yY2UgfHwgX2V2dC5mb3JjZUhUTUwgfHwgbmV3ViAhPT0gdiAmJiAhX2lzTmFOKG5ld1YpKSB7XG5cdFx0XHRpZiAoIV9ldnQuc2lsZW50SFRNTCkge1xuXHRcdFx0XHRldmVudHNbJ19ydW5iaW5kaW5nczonICsga2V5XSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdfcnVuYmluZGluZ3M6JyArIGtleSwgX2V2dCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRyaWdnZXJDaGFuZ2UpIHtcblx0XHRcdGV2ZW50c1snY2hhbmdlOicgKyBrZXldICYmIGNvcmUuX2Zhc3RUcmlnZ2VyKG9iamVjdCwgJ2NoYW5nZTonICsga2V5LCBfZXZ0KTtcblxuXHRcdFx0ZXZlbnRzLmNoYW5nZSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdjaGFuZ2UnLCBfZXZ0KTtcblx0XHR9XG5cblx0XHRpZiAoKGlzQ2hhbmdlZCB8fCBfZXZ0LmZvcmNlKSAmJiAhX2V2dC5za2lwTGlua3MpIHtcblx0XHRcdGV2ZW50c1snX3J1bmRlcGVuZGVuY2llczonICsga2V5XSAmJlxuXHRcdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdfcnVuZGVwZW5kZW5jaWVzOicgKyBrZXksIF9ldnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH07XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL3JlbW92ZWxpc3RlbmVyJztcbi8vIFJFRkFDVE9SLCBET05UIFRSSUdHRVIgQURERVZFTlQsIFJFTU9WRUVWRU5UXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gcmVtb3ZlIGxpc3RlbmVyXG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdLFxuXHRcdFx0ZXZlbnRzID0gYWxsRXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRjb25zdCByZXRhaW4gPSBbXTtcblx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcblx0XHRcdFx0aWYgKGV2ZW50LmluZm8ucGF0aFN0ciAhPT0gcGF0aFN0cikge1xuXHRcdFx0XHRcdHJldGFpbi5wdXNoKGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXRhaW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGFsbEV2ZW50c1tgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YF0gPSByZXRhaW47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgYWxsRXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qXG5kZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX3VuZGVsZWdhdGVMaXN0ZW5lciA9IGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lciA9XG5cdCBmdW5jdGlvbihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdHAgPSBwYXRoLFxuXHRcdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV2ZW50cyxcblx0XHRcdGk7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0aWYgKGZpcnN0S2V5KSB7XG5cdFx0XHRpZiAoZmlyc3RLZXkgPT0gJyonKSB7XG5cdFx0XHRcdGlmIChvYmplY3QuaXNNS0FycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2FkZCcsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHMuYWRkIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChvYmplY3QuaXNNS09iamVjdCkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmNoYW5nZSB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblx0XHRcdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2NoYW5nZScsIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtICYmIF91bmRlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHNbJ2NoYW5nZTonICsgZmlyc3RLZXldIHx8IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Ygb2JqZWN0W2ZpcnN0S2V5XSA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2ZpcnN0S2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmLFxuXHRcdGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXSxcblx0XHRyZXRhaW4gPSBbXTtcblxuXHQvLyBpZiBhbGwgZXZlbnRzIG5lZWQgdG8gYmUgcmVtb3ZlZFxuXHRpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKCFpbmZvIHx8ICFpbmZvLm5vVHJpZ2dlcikge1xuXHRcdFx0bm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG5cdFx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcblx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdFx0Y29udGV4dDogZXZ0LmNvbnRleHRcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIHJlc3RvcmUgZGVmYXVsdCB2YWx1ZSBvZiBcImV2ZW50c1wiXG5cdFx0ZGVmLmV2ZW50cyA9IHt9O1xuXHR9IGVsc2UgaWYgKGV2ZW50cykgeyAvLyBpZiBldmVudHMgd2l0aCBnaXZlbiBuYW1lIGlzIGZvdW5kXG5cdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcblx0XHRcdGlmIChjYWxsYmFjayAmJiAoY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjayAmJiBjYWxsYmFjay5fY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjaylcblx0XHRcdFx0fHwgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZ0LmNvbnRleHQpKSB7XG5cdFx0XHRcdC8vIGtlZXAgZXZlbnRcblx0XHRcdFx0cmV0YWluLnB1c2goZXZ0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGV2dC5jb250ZXh0XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKCFpbmZvIHx8ICFpbmZvLm5vVHJpZ2dlcikge1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgbmVzdGVkIG9iamVjdCBiYXNlZCBvbiBwYXRoIGFuZCBsYXN0VmFsdWVcbi8vIGV4YW1wbGU6IG1ha2VPYmplY3QoJ2EuYi5jJywgNDIpIC0+IHthOiB7Yjoge2M7IDQyfX19XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlT2JqZWN0KHBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcblx0cGF0aCA9IHBhdGggPyBwYXRoLnNwbGl0KCcuJykgOiBbXTtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGxldCBvYmogPSByZXN1bHQsXG5cdFx0a2V5O1xuXG5cblx0d2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdGtleSA9IHBhdGguc2hpZnQoKTtcblx0XHRvYmogPSBvYmpba2V5XSA9IHt9O1xuXHR9XG5cblx0b2JqW3BhdGguc2hpZnQoKV0gPSBsYXN0VmFsdWU7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdC8qZXNsaW50LWRpc2FibGUgKi9cblx0eGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy54JywgMik7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRvYmouYS5iID0ge1xuXHRcdFx0Yzoge1xuXHRcdFx0XHR4OiAyXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIuYyA9IHtcblx0XHRcdHg6IDJcblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aSA9IDA7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWUxMCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU5KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTgpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU3KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTUpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTQpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTMpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTIpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTEpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTApO1xuXHRcdG9iai5hID0ge1xuXHRcdFx0Yjoge1xuXHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0eDogMlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRleHBlY3QoaSkudG9FcXVhbCgxMTExMTExMTExMTEpO1xuXHR9KTtcblxuXHR4aXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5hLmIgPSBudWxsO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblx0Lyplc2xpbnQtZW5hYmxlICovXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBvYmosXG5cdFx0Y3R4LFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0Y3R4ID0ge307XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgaSA9IDA7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUyKSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBhcmdzKScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmopO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdyZW1vdmVzIGJ5IGhvd1RvUmVtb3ZlIChub3QgZG9jdW1lbnRlZCBjb3JlIGZlYXR1cmUpJywgKCkgPT4ge1xuXHRcdC8qZXNsaW50LWRpc2FibGUgKi9cblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlLFxuXHRcdFx0b25EYXRhID0ge1xuXHRcdFx0XHRob3dUb1JlbW92ZShvbkRhdGEsIG9mZkRhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2ZmRGF0YS54ID09PSA0Mjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDEnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQzXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDInKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHRcdC8qZXNsaW50LWVuYWJsZSAqL1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG5cbnhkZXNjcmliZShcIkV2ZW50cyBjb3JlOiBfYWRkRE9NTGlzdGVuZXIsIF9yZW1vdmVET01MaXN0ZW5lclwiLCAoKSA9PiB7XG5cdGxldCBxID0gKHMsIGMpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cdFx0XHRcdGV2LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFx0XHR0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG5cdFx0XHRcdFx0d2luZG93LCBudWxsLFxuXHRcdFx0XHRcdDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cblx0XHRcdFx0XHQwIC8qbGVmdCovICwgbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG5cdFx0dGFnTmFtZTogJ0RJVicsXG5cdFx0aWQ6ICdkLXRlc3QnLFxuXHRcdGlubmVySFRNTDogYFxuXHRcdFx0PGRpdiBpZD1cImQtdGVzdC0xXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YFxuXHR9KSk7XG5cblxuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSBhbmQgcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3IgKGJ1YmJsaW5nIHRlc3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQgYW5kIGRvZXNuXFwndCByZW1vdmUgZXZlbnRzIGZyb20gb3RoZXIgbm9kZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb2ZmKScsICgpID0+IHtcblx0bGV0IHEgPSAocywgYykgPT4ge1xuXHRcdGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG5cdFx0XHRcdGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblx0XHRcdFx0ZXYuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0XCJjbGlja1wiLFxuXHRcdFx0XHRcdHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcblx0XHRcdFx0XHR3aW5kb3csIG51bGwsXG5cdFx0XHRcdFx0MCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuXHRcdFx0XHRcdDAgLypsZWZ0Ki8gLCBudWxsXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcblx0XHR0YWdOYW1lOiAnRElWJyxcblx0XHRpZDogJ3MtdGVzdCcsXG5cdFx0aW5uZXJIVE1MOiBgXG5cdFx0XHQ8ZGl2IGlkPVwicy10ZXN0LTFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgXG5cdH0pKTtcblxuXHRub2RlLmNsaWNrID0gbm9kZS5jbGljayB8fCBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuXHR9XG5cblx0aXQoJ2ZpcmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRib29sID0gZmFsc2U7XG5cdFx0bWsub24oJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtay5vbignc29tZWV2ZW50JywgZik7XG5cdFx0bWsub2ZmKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHt9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbmNlXCInLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRqID0gMCxcblx0XHRcdGYxID0gZXZ0ID0+IGkrKyxcblx0XHRcdGYyID0gZXZ0ID0+IGorKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdGV4cGVjdChqKS50b0JlKDEpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1rLm9uY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdH0pO1xuXG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCAyMDApO1xuXG5cdFx0bWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbkRlYm91bmNlXCInLCAoZG9uZSkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRmMSA9IGV2dCA9PiBpKyssXG5cdFx0XHRmMiA9IGV2dCA9PiBqKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZXhwZWN0KGopLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgMjAwKTtcblxuXHRcdG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0fSk7XG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgODAwKTtcblxuXHRcdG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHR9KTtcblxuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMCxcblx0XHRcdGhhbmRsZXJzID0ge1xuXHRcdFx0XHRmb286ICgpID0+IGkrKyxcblx0XHRcdFx0YmFyOiAoKSA9PiBpKytcblx0XHRcdH07XG5cblx0XHRNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuXHRcdE1LLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0TUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXG5cdFx0TUsub2ZmKG9iaiwgaGFuZGxlcnMpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG5cblx0aXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHR0aGlzQXJnID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMDtcblxuXHRcdE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG5cdFx0XHRpKys7XG5cdFx0fSwgdHJ1ZSwgdGhpc0FyZyk7XG5cblx0XHRNSy5vbihvYmosICdiYXInLCBmdW5jdGlvbigpIHtcblx0XHRcdGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuXHRcdFx0aSsrO1xuXHRcdH0sIHRoaXNBcmcsIHRydWUpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1wiOiA0NSxcblx0XCIuL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1wiOiA0Nyxcblx0XCIuL19iaW5kaW5ncy9nZXRub2Rlcy5qc1wiOiA0OCxcblx0XCIuL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXCI6IDQ2LFxuXHRcIi4vX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXCI6IDQ5LFxuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiAzNSxcblx0XCIuL19jb3JlL2RlZnMuanNcIjogMzMsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDMyLFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiA1MCxcblx0XCIuL19kb20vaW5kZXguanNcIjogNTEsXG5cdFwiLi9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXCI6IDMxLFxuXHRcIi4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDMwLFxuXHRcIi4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1wiOiAzOCxcblx0XCIuL19ldmVudHMvdHJpZ2dlcm9uZS5qc1wiOiAzNCxcblx0XCIuL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDM3LFxuXHRcIi4vX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcIjogNjIsXG5cdFwiLi9hcnJheS5qc1wiOiA1Mixcblx0XCIuL2JpbmRlcnMuanNcIjogNTMsXG5cdFwiLi9iaW5kbm9kZS5qc1wiOiA1NCxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAxMSxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiA1LFxuXHRcIi4vYnF1ZXJ5L19pbml0LmpzXCI6IDQsXG5cdFwiLi9icXVlcnkvYWRkLmpzXCI6IDE0LFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZS5qc1wiOiA5LFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogMTYsXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMyxcblx0XCIuL2JxdWVyeS9pcy5qc1wiOiAxMixcblx0XCIuL2JxdWVyeS9ub3QuanNcIjogMTUsXG5cdFwiLi9icXVlcnkvb2ZmLmpzXCI6IDEzLFxuXHRcIi4vYnF1ZXJ5L29uLmpzXCI6IDEwLFxuXHRcIi4vYnF1ZXJ5L29uZS5qc1wiOiA4LFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbC5qc1wiOiA3LFxuXHRcIi4vY2xhc3MuanNcIjogMjcsXG5cdFwiLi9leHRlbmQuanNcIjogNixcblx0XCIuL2dldC5qc1wiOiA1NSxcblx0XCIuL2luZGV4LmpzXCI6IDU2LFxuXHRcIi4vbWFnaWMuanNcIjogNTksXG5cdFwiLi9tYXRyZXNoa2EvaW5kZXguanNcIjogNTcsXG5cdFwiLi9vYmplY3QuanNcIjogNTgsXG5cdFwiLi9vbi5qc1wiOiA2MCxcblx0XCIuL3NldC5qc1wiOiAzNlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA0NDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuZnVuY3Rpb24gcnVuTWF0cmVzaGthSGFuZGxlcihub2RlLCBwcm9wRGVmLCBvcHRpb25zLCBldnQpIHtcbiAgIHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdCAgIC8vIGRpcnR5IGhhY2sgZm9yIHRoaXMgb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyZXNoa2Fqcy9tYXRyZXNoa2EvaXNzdWVzLzE5XG5cdCAgIF92ID0gZXZ0ICYmIHR5cGVvZiBldnQub25DaGFuZ2VWYWx1ZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdiA9PSAnbnVtYmVyJyA/IHYgKyAnJyA6IHYsXG5cdCAgIGk7XG5cbiAgIGlmIChldnQgJiYgZXZ0LmNoYW5nZWROb2RlID09IG5vZGUgJiYgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gX3YpIHJldHVybjtcblxuICAgX29wdGlvbnMgPSB7XG5cdCAgIHZhbHVlOiB2XG4gICB9O1xuXG4gICBmb3IgKGkgaW4gb3B0aW9ucykge1xuXHQgICBfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG4gICB9XG5cbiAgIF9iaW5kZXIuc2V0VmFsdWUuY2FsbChub2RlLCB2LCBfb3B0aW9ucyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcblx0YmluZGVyOiBnaXZlbkJpbmRlcixcblx0a2V5LFxuXHQkbm9kZXMsXG5cdG5vZGUsXG5cdGV2dCxcblx0cHJvcERlZlxufSkge1xuXHRjb25zdCB7IGFzc2lnbkRlZmF1bHRWYWx1ZSB9ID0gZXZ0O1xuXHRjb25zdCBvcHRpb25zID0ge1xuXHRcdHNlbGY6IG9iamVjdCxcblx0XHRrZXksXG5cdFx0JG5vZGVzLFxuXHRcdG5vZGVcblx0fTtcblx0bGV0IGlzVW5kZWZpbmVkID0gdHlwZW9mIHByb3BEZWYudmFsdWUgPT0gJ3VuZGVmaW5lZCc7XG5cdGxldCBiaW5kZXI7XG5cdGxldCBta0hhbmRsZXI7XG5cblx0aWYgKGdpdmVuQmluZGVyICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgZm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRpZiAoZ2l2ZW5CaW5kZXIpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZm91bmRCaW5kZXIsIGdpdmVuQmluZGVyKTtcblx0XHRcdH1cblxuXHRcdFx0YmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJpbmRlciA9IGdpdmVuQmluZGVyO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHsgZ2V0VmFsdWUsIHNldFZhbHVlLCBvbiwgaW5pdGlhbGl6ZSB9ID0gYmluZGVyO1xuXG5cdC8qIFRPRE8gaWYgKGJpbmRlci5pbml0aWFsaXplKSB7IC4uLiB9Ki9cblxuXHRpZiAoZ2V0VmFsdWUgJiYgKGlzVW5kZWZpbmVkICYmIGFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuXHRcdGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBvcHRpb25zKTtcblx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWwgPT0gJ3VuZGVmaW5lZCc7XG5cblx0XHRzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBub2ZuLmFzc2lnbih7XG5cdFx0XHRmcm9tTm9kZTogdHJ1ZVxuXHRcdH0sIGV2dCkpO1xuXHR9XG5cblx0aWYgKHNldFZhbHVlKSB7XG5cdFx0bWtIYW5kbGVyID0gKCkgPT4gcnVuTWF0cmVzaGthSGFuZGxlcihub2RlLCBwcm9wRGVmLCBvcHRpb25zLCBldnQpO1xuXG5cdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSB1dGlsLmRlYm91bmNlKG1rSGFuZGxlcik7XG5cdFx0fVxuXHRcdGFsZXJ0KDEpO1xuXHRcdGNvcmUuX2Zhc3RBZGRMaXN0ZW5lcihvYmplY3QsICdfcnVuYmluZGluZ3M6JyArIGtleSwgbWtIYW5kbGVyLCBudWxsLCB7bm9kZTogbm9kZX0pO1xuXHRcdGFsZXJ0KDIpO1xuXHRcdCFpc1VuZGVmaW5lZCAmJiBta0hhbmRsZXIoKTtcblx0fVxufVxuLypcbmZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHR2YXIgb3B0aW9ucyA9IHtcblx0XHRcdHNlbGY6IG9iamVjdCxcblx0XHRcdGtleToga2V5LFxuXHRcdFx0JG5vZGVzOiAkbm9kZXMsXG5cdFx0XHRub2RlOiBub2RlXG5cdFx0fSxcblx0XHRub2RlID0gJG5vZGVzW2luZGV4XSxcblx0XHRpc1VuZGVmaW5lZCA9IHR5cGVvZiBzcGVjaWFsLnZhbHVlID09ICd1bmRlZmluZWQnLFxuXHRcdF9iaW5kZXIsXG5cdFx0X2V2dCxcblx0XHRmb3VuZEJpbmRlcixcblx0XHRfb3B0aW9ucyxcblx0XHRpLFxuXHRcdGRvbUV2dCxcblx0XHRta0hhbmRsZXIsXG5cdFx0dmFsO1xuXG5cblxuXG5cdGlmIChiaW5kZXIgPT09IG51bGwpIHtcblx0XHRfYmluZGVyID0ge307XG5cdH0gZWxzZSB7XG5cdFx0Zm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRpZiAoYmluZGVyKSB7XG5cdFx0XHRcdGZvciAoaSBpbiBiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdF9iaW5kZXIgPSBiaW5kZXIgfHwge307XG5cdFx0fVxuXHR9XG5cblx0aWYgKF9iaW5kZXIuaW5pdGlhbGl6ZSkge1xuXHRcdF9vcHRpb25zID0ge1xuXHRcdFx0dmFsdWU6IHNwZWNpYWwudmFsdWVcblx0XHR9O1xuXHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0fVxuXHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0fVxuXG5cdGlmIChfYmluZGVyLmdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBldnQuYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBldnQuYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuXG5cdFx0X2V2dCA9IHtcblx0XHRcdGZyb21Ob2RlOiB0cnVlXG5cdFx0fTtcblxuXHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdF9ldnRbaV0gPSBldnRbaV07XG5cdFx0fVxuXG5cdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbCA9PSAndW5kZWZpbmVkJztcblxuXHRcdGNvcmUuc2V0KG9iamVjdCwga2V5LCB2YWwsIF9ldnQpO1xuXHR9XG5cblxuXHRpZiAoX2JpbmRlci5zZXRWYWx1ZSkge1xuXHRcdG1rSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcblx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdC8vIGRpcnR5IGhhY2sgZm9yIHRoaXMgb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyZXNoa2Fqcy9tYXRyZXNoa2EvaXNzdWVzLzE5XG5cdFx0XHRcdF92ID0gZXZ0ICYmIHR5cGVvZiBldnQub25DaGFuZ2VWYWx1ZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdiA9PSAnbnVtYmVyJyA/IHYgKyAnJyA6IHYsXG5cdFx0XHRcdGk7XG5cblx0XHRcdGlmIChldnQgJiYgZXZ0LmNoYW5nZWROb2RlID09IG5vZGUgJiYgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gX3YpIHJldHVybjtcblxuXHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHR9O1xuXG5cdFx0XHRmb3IgKGkgaW4gb3B0aW9ucykge1xuXHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHR9XG5cblx0XHRcdF9iaW5kZXIuc2V0VmFsdWUuY2FsbChub2RlLCB2LCBfb3B0aW9ucyk7XG5cdFx0fTtcblxuXHRcdGlmKGV2dC5kZWJvdW5jZSkge1xuXHRcdFx0bWtIYW5kbGVyID0gdXRpbC5kZWJvdW5jZShta0hhbmRsZXIpO1xuXHRcdH1cblxuXHRcdGNvcmUuX2Zhc3RBZGRMaXN0ZW5lcihvYmplY3QsICdfcnVuYmluZGluZ3M6JyArIGtleSwgbWtIYW5kbGVyLCBudWxsLCB7bm9kZTogbm9kZX0pO1xuXG5cdFx0IWlzVW5kZWZpbmVkICYmIG1rSGFuZGxlcigpO1xuXHR9XG5cblxuXG5cblx0aWYgKF9iaW5kZXIuZ2V0VmFsdWUgJiYgX2JpbmRlci5vbikge1xuXHRcdGRvbUV2dCA9IHtcblx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRvbjogX2JpbmRlci5vbixcblx0XHRcdGluc3RhbmNlOiBvYmplY3QsXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdG1rSGFuZGxlcjogbWtIYW5kbGVyLFxuXHRcdFx0aGFuZGxlcjogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHR2YXIgb2xkdmFsdWUgPSBvYmplY3Rba2V5XSxcblx0XHRcdFx0XHR2YWx1ZSxcblx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdFx0dmFsdWU6IG9sZHZhbHVlLFxuXHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2dC5vcmlnaW5hbEV2ZW50IHx8IGV2dCxcblx0XHRcdFx0XHRcdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHdoaWNoOiBldnQud2hpY2gsXG5cdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHR9O1xuXG5cblx0XHRcdFx0Ly8gaGFzT3duUHJvcGVydHkgaXMgbm90IHJlcXVpcmVkIHRoZXJlXG5cdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0X29wdGlvbnNbal0gPSBvcHRpb25zW2pdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdGlmICh2YWx1ZSAhPT0gb2xkdmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsdWUsIHtcblx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0Y2hhbmdlZE5vZGU6IG5vZGUsXG5cdFx0XHRcdFx0XHRvbkNoYW5nZVZhbHVlOiB2YWx1ZVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGNvcmUuZG9tRXZlbnRzLmFkZChkb21FdnQpO1xuXHR9XG59Ki9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0QmluZGVycyBmcm9tICcuL2RlZmF1bHRiaW5kZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICAgIHZhciByZXN1bHQsXG4gICAgICAgIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZGVmYXVsdEJpbmRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9IGRlZmF1bHRCaW5kZXJzW2ldLmNhbGwobm9kZSwgbm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvbG9va2ZvcmJpbmRlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IFtub2RlID0+IHtcblx0dmFyIHRhZ05hbWUgPSBub2RlLnRhZ05hbWUsXG5cdFx0YmluZGVycyA9IHVuZGVmaW5lZCxcblx0XHRiO1xuXG5cdC8vIFRPRE8gU3dpdGNoL2Nhc2Vcblx0aWYgKHRhZ05hbWUgPT0gJ0lOUFVUJykge1xuXHRcdGIgPSBiaW5kZXJzLmlucHV0KG5vZGUudHlwZSk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnVEVYVEFSRUEnKSB7XG5cdFx0YiA9IGJpbmRlcnMudGV4dGFyZWEoKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdTRUxFQ1QnKSB7XG5cdFx0YiA9IGJpbmRlcnMuc2VsZWN0KG5vZGUubXVsdGlwbGUpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1BST0dSRVNTJykge1xuXHRcdGIgPSBiaW5kZXJzLnByb2dyZXNzKCk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnT1VUUFVUJykge1xuXHRcdGIgPSBiaW5kZXJzLm91dHB1dCgpO1xuXHR9XG5cblx0cmV0dXJuIGI7XG59XTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcikge1xuXHRsZXQgbm9kZXM7XG5cdGlmKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhLzwvLnRlc3Qoc2VsZWN0b3IpICYmIC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdG5vZGVzID0gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcilcblx0fSBlbHNle1xuXHRcdG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuXHR9XG5cdHJldHVybiBub2Rlcztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZ2V0bm9kZXMuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9ycykge1xuXHRcblx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0JCA9IGNvcmUuJCxcblx0XHRyZXN1bHQgPSAkKCksXG5cdFx0ZXhlY1Jlc3VsdCxcblx0XHQkYm91bmQsXG5cdFx0bm9kZSxcblx0XHRzZWxlY3Rvcixcblx0XHRpLCBqLFxuXHRcdHJhbmRvbSxcblx0XHRzdWJTZWxlY3Rvcixcblx0XHRrZXksXG5cdFx0c2VsZWN0ZWQ7XG5cblx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhb2JqZWN0RGF0YSkgcmV0dXJuIHJlc3VsdDtcblxuXHQvLyByZXBsYWNpbmcgOnNhbmRib3ggdG8gOmJvdW5kKHNhbmRib3gpXG5cdHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5zcGxpdCgnLCcpO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRzZWxlY3RvciA9IHNlbGVjdG9yc1tpXTtcblxuXHRcdGlmIChleGVjUmVzdWx0ID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLy5leGVjKHNlbGVjdG9yKSkge1xuXHRcdFx0a2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcblx0XHRcdHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG5cblx0XHRcdC8vIGdldHRpbmcgS0VZIGZyb20gOmJvdW5kKEtFWSlcblx0XHRcdCRib3VuZCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldICYmIG9iamVjdERhdGEuc3BlY2lhbFtrZXldLiRub2Rlcztcblx0XHRcdGlmKCEkYm91bmQgfHwgISRib3VuZC5sZW5ndGgpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuXHRcdFx0Ly8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSAubXktc2VsZWN0b3JcIlxuXHRcdFx0aWYgKHN1YlNlbGVjdG9yKSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBjb250YWlucyBjaGlsZHJlbiBzZWxlY3RvclxuXHRcdFx0XHQvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcblx0XHRcdFx0aWYgKHN1YlNlbGVjdG9yLmluZGV4T2YoJz4nKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIHNlbGVjdGluZyBjaGlsZHJlblxuXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCAkYm91bmQubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdG5vZGUgPSAkYm91bmRbal07XG5cdFx0XHRcdFx0XHRyYW5kb20gPSAnbScgKyBjb3JlLnJhbmRvbVN0cmluZygpO1xuXHRcdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tLCByYW5kb20pO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgcmFuZG9tICsgJz1cIicgKyByYW5kb20gKyAnXCJdJyArIHN1YlNlbGVjdG9yKTtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQodXRpbC50b0FycmF5KHNlbGVjdGVkKSk7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb20pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3Jcblx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKCRib3VuZC5maW5kKHN1YlNlbGVjdG9yKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmdcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3Jcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChzZWxlY3Rvcik7XG5cdFx0fVxuXHR9XG5cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiLypnbG9iYWwgJCovXG5pbXBvcnQgYlF1ZXJ5IGZyb20gJy4uL2JxdWVyeSc7XG5cbmNvbnN0IG5lZWRlZE1ldGhvZHMgPSAnb24gb2ZmIGlzIGFkZCBub3QgZmluZCcuc3BsaXQoL1xccy8pO1xuXG5jb25zdCBnbG9iYWxEb2xsYXIgPSB0eXBlb2YgJCA9PT0gJ2Z1bmN0aW9uJyA/ICQgOiBudWxsO1xubGV0IHVzZUdsb2JhbERvbGxhciA9IHRydWU7XG5cbmlmIChnbG9iYWxEb2xsYXIpIHtcblx0Y29uc3QgZm4gPSBnbG9iYWxEb2xsYXIuZm4gfHwgZ2xvYmFsRG9sbGFyLnByb3RvdHlwZTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKCFmbltuZWVkZWRNZXRob2RzW2ldXSkge1xuXHRcdFx0dXNlR2xvYmFsRG9sbGFyID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcblx0XHRnbG9iYWxEb2xsYXIucGFyc2VIVE1MID0gYlF1ZXJ5LnBhcnNlSFRNTDtcblx0fVxufSBlbHNlIHtcblx0dXNlR2xvYmFsRG9sbGFyID0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUdsb2JhbERvbGxhciA/IGdsb2JhbERvbGxhciA6IGJRdWVyeTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdERvbGxhciBmcm9tICcuL2RlZmF1bHQtZG9sbGFyJztcblxuY29uc3QgZG9tID0ge1xuXHQkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FycmF5LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMuanNcbiAqKi8iLCIvLyBEZWJvdW5jZWQhXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL2dldG5vZGVzJztcbmltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIgPSB7fSwgZXZ0ID0ge30pIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7IG9wdGlvbmFsIH0gPSBldnQ7XG5cbiAgICBpZigha2V5KSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmZhbHN5X2tleScpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogdGhpcy5iaW5kTm9kZShbWydrZXknLCAkKCksIHtvbjonZXZ0J31dLCBbe2tleTogJCgpLCB7b246ICdldnQnfX1dXSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwga2V5W2ldWzBdLCBrZXlbaV1bMV0sIGtleVtpXVsyXSB8fCBldnQsIG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5lYWNoKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiB0aGlzLmJpbmROb2RlKCdrZXknLCBbIG5vZGUsIGJpbmRlciBdLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICAvLyBub2RlICE9PSB3aW4gaXMgdGhlIG1vc3QgdW5jb21tb24gYnVnZml4IGV2ZXJcbiAgICAvLyB0aGlzIGlzIGFib3V0IGlmcmFtZXMsIENPUlMgYW5kIGRlcHJlY2F0ZWQgRE9NIEFQSS5cbiAgICBpZiAobm9kZSAmJiBub2RlLmxlbmd0aCA9PSAyICYmIG5vZGUgIT09IHdpbiAmJiAhbm9kZVsxXS5ub2RlTmFtZVxuICAgICAgICAgICAgJiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlWzBdLCBub2RlWzFdLCBiaW5kZXIpO1xuICAgIH1cblxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIGlmICghJG5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpub2RlX21pc3NpbmcnLCB7IGtleSwgbm9kZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICBvYmplY3QuJG5vZGVzW2tleV0gPSBvYmplY3QuJG5vZGVzW2tleV0ubGVuZ3RoXG4gICAgICAgICAgICA/IG9iamVjdC4kbm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG4gICAgICAgIG9iamVjdC5ub2Rlc1trZXldID0gb2JqZWN0LiRub2Rlc1trZXldWzBdO1xuICAgIH1cblxuXG5cbiAgICBpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuICAgICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgbm9mbi5mb3JFYWNoKCRub2RlcywgKG5vZGUpID0+IGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgZXZ0LFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIHByb3BEZWZcbiAgICB9KSk7XG5cblxuICAgIC8qXG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgJG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGksIGJpbmRlciwgZXZ0LCBzcGVjaWFsKTtcbiAgICB9XG5cbiAgICBpZiAoIWV2dC5zaWxlbnQpIHtcbiAgICAgICAgX2V2dCA9IHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgJG5vZGVzOiAkbm9kZXMsXG4gICAgICAgICAgICBub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgIF9ldnRbaV0gPSBldnRbaV07XG4gICAgICAgIH1cblxuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuICAgICAgICBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kJywgX2V2dCk7XG4gICAgfSovXG5cblxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS9pbml0bWsnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3V0aWwvY29tbW9uJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwLCBpbml0TUssIHV0aWwpIHtcblxuXHR2YXIgYmluZE5vZGUgPSBjb3JlLmJpbmROb2RlID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZ0LCBvcHRpb25hbCkge1xuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKlxuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHRpZihrZXkgPT0gJ3NhbmRib3gnKSB7XG5cdFx0XHRyZXR1cm4gYmluZFNhbmRib3gob2JqZWN0LCBub2RlLCBldnQsIG9wdGlvbmFsKTtcblx0XHR9XG5cblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLFxuXHRcdFx0JG5vZGVzLFxuXHRcdFx0a2V5cyxcblx0XHRcdGksXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0cGF0aCxcblx0XHRcdGxpc3RlbktleSxcblx0XHRcdGNoYW5nZUhhbmRsZXIsXG5cdFx0XHRfZXZ0O1xuXG5cdFx0Lypcblx0XHQgKiB0aGlzLmJpbmROb2RlKFtbJ2tleScsICQoKSwge29uOidldnQnfV0sIFt7a2V5OiAkKCksIHtvbjogJ2V2dCd9fV1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHQgKlxuXHRcdGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRiaW5kTm9kZShvYmplY3QsIGtleVtpXVswXSwga2V5W2ldWzFdLCBrZXlbaV1bMl0gfHwgZXZ0LCBub2RlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleTEga2V5MicsIG5vZGUsIGJpbmRlciwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0ICpcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiB+a2V5LmluZGV4T2YoJyAnKSkge1xuXHRcdFx0a2V5cyA9IGtleS5zcGxpdCgvXFxzKy8pO1xuXHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwga2V5c1tpXSwgbm9kZSwgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0aWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBrZXkpIHtcblx0XHRcdFx0aWYgKGtleS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwgaSwga2V5W2ldLCBub2RlLCBiaW5kZXIsIGV2dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleScsIFsgbm9kZSwgYmluZGVyIF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0Ly8gbm9kZSAhPT0gd2luIGlzIHRoZSBtb3N0IHVuY29tbW9uIGJ1Z2ZpeCBldmVyLiBEb24ndCBhc2sgd2hhdCBkb2VzIGl0IG1lYW4uXG5cdFx0Ly8gVGhpcyBpcyBhYm91dCBpZnJhbWVzLCBDT1JTIGFuZCBkZXByZWNhdGVkIERPTSBBUEkuXG5cdFx0aWYgKG5vZGUgJiYgbm9kZS5sZW5ndGggPT0gMiAmJiBub2RlICE9PSB3aW4gJiYgIW5vZGVbMV0ubm9kZU5hbWVcblx0XHRcdFx0JiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcblx0XHRcdHJldHVybiBiaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZVswXSwgbm9kZVsxXSwgYmluZGVyLCBvcHRpb25hbCk7XG5cdFx0fVxuXG5cdFx0JG5vZGVzID0gY29yZS5fZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuXHRcdGlmICghJG5vZGVzLmxlbmd0aCkge1xuXHRcdFx0aWYgKG9wdGlvbmFsKSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignQmluZGluZyBlcnJvcjogbm9kZSBpcyBtaXNzaW5nIGZvciBcIicgKyBrZXkgKyAnXCIuJyArICh0eXBlb2Ygbm9kZSA9PSAnc3RyaW5nJyA/ICcgVGhlIHNlbGVjdG9yIGlzIFwiJyArIG5vZGUgKyAnXCInIDogJycpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuXHRcdFx0cGF0aCA9IGtleS5zcGxpdCgnLicpO1xuXHRcdFx0Y2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRldnQgPSBldnQgJiYgZXZ0Lm9yaWdpbmFsRXZlbnQ7XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2dCAmJiBldnQudmFsdWUsXG5cdFx0XHRcdFx0aTtcblx0XHRcdFx0aWYgKCF0YXJnZXQpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBvYmplY3Q7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXRbcGF0aFtpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmluZE5vZGUodGFyZ2V0LCBwYXRoW3BhdGgubGVuZ3RoIC0gMV0sICRub2RlcywgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblxuXG5cdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnVuYmluZE5vZGUoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5fZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGguc2xpY2UoMCwgcGF0aC5sZW5ndGggLSAyKS5qb2luKCcuJyksXG5cdFx0XHRcdCdjaGFuZ2U6JyArIHBhdGhbcGF0aC5sZW5ndGggLSAyXSwgY2hhbmdlSGFuZGxlcik7XG5cblx0XHRcdGNoYW5nZUhhbmRsZXIoKTtcblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHRldnQgPSBldnQgfHwge307XG5cblx0XHRzcGVjaWFsID0gY29yZS5fZGVmaW5lU3BlY2lhbChvYmplY3QsIGtleSk7XG5cblx0XHRzcGVjaWFsLiRub2RlcyA9IHNwZWNpYWwuJG5vZGVzLmxlbmd0aCA/IHNwZWNpYWwuJG5vZGVzLmFkZCgkbm9kZXMpIDogJG5vZGVzO1xuXG5cdFx0aWYgKG9iamVjdC5pc01LKSB7XG5cdFx0XHRvYmplY3QuJG5vZGVzW2tleV0gPSBzcGVjaWFsLiRub2Rlcztcblx0XHRcdG9iamVjdC5ub2Rlc1trZXldID0gc3BlY2lhbC4kbm9kZXNbMF07XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8ICRub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaSwgYmluZGVyLCBldnQsIHNwZWNpYWwpO1xuXHRcdH1cblxuXHRcdGlmICghZXZ0LnNpbGVudCkge1xuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdCRub2RlczogJG5vZGVzLFxuXHRcdFx0XHRub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0XHRfZXZ0W2ldID0gZXZ0W2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuXHRcdFx0Y29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmluZCcsIF9ldnQpO1xuXHRcdH1cblxuXG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHQkbm9kZXM6ICRub2Rlcyxcblx0XHRcdFx0bm9kZTogbm9kZVxuXHRcdFx0fSxcblx0XHRcdG5vZGUgPSAkbm9kZXNbaW5kZXhdLFxuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2Ygc3BlY2lhbC52YWx1ZSA9PSAndW5kZWZpbmVkJyxcblx0XHRcdF9iaW5kZXIsXG5cdFx0XHRfZXZ0LFxuXHRcdFx0Zm91bmRCaW5kZXIsXG5cdFx0XHRfb3B0aW9ucyxcblx0XHRcdGksXG5cdFx0XHRkb21FdnQsXG5cdFx0XHRta0hhbmRsZXIsXG5cdFx0XHR2YWw7XG5cblxuXG5cblx0XHRpZiAoYmluZGVyID09PSBudWxsKSB7XG5cdFx0XHRfYmluZGVyID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRcdGlmIChiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3IgKGkgaW4gYmluZGVyKSB7XG5cdFx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfYmluZGVyID0gYmluZGVyIHx8IHt9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChfYmluZGVyLmluaXRpYWxpemUpIHtcblx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHR2YWx1ZTogc3BlY2lhbC52YWx1ZVxuXHRcdFx0fTtcblx0XHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHRcdH1cblx0XHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblxuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0ZnJvbU5vZGU6IHRydWVcblx0XHRcdH07XG5cblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IGV2dFtpXTtcblx0XHRcdH1cblxuXHRcdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG5cdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsLCBfZXZ0KTtcblx0XHR9XG5cblxuXHRcdGlmIChfYmluZGVyLnNldFZhbHVlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdFx0Ly8gZGlydHkgaGFjayBmb3IgdGhpcyBvbmUgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0XHRcdFx0XHRfdiA9IGV2dCAmJiB0eXBlb2YgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHYgPT0gJ251bWJlcicgPyB2ICsgJycgOiB2LFxuXHRcdFx0XHRcdGk7XG5cblx0XHRcdFx0aWYgKGV2dCAmJiBldnQuY2hhbmdlZE5vZGUgPT0gbm9kZSAmJiBldnQub25DaGFuZ2VWYWx1ZSA9PSBfdikgcmV0dXJuO1xuXG5cdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyLnNldFZhbHVlLmNhbGwobm9kZSwgdiwgX29wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRcdG1rSGFuZGxlciA9IHV0aWwuZGVib3VuY2UobWtIYW5kbGVyKTtcblx0XHRcdH1cblxuXHRcdFx0Y29yZS5fZmFzdEFkZExpc3RlbmVyKG9iamVjdCwgJ19ydW5iaW5kaW5nczonICsga2V5LCBta0hhbmRsZXIsIG51bGwsIHtub2RlOiBub2RlfSk7XG5cblx0XHRcdCFpc1VuZGVmaW5lZCAmJiBta0hhbmRsZXIoKTtcblx0XHR9XG5cblxuXG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiBfYmluZGVyLm9uKSB7XG5cdFx0XHRkb21FdnQgPSB7XG5cdFx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRcdG9uOiBfYmluZGVyLm9uLFxuXHRcdFx0XHRpbnN0YW5jZTogb2JqZWN0LFxuXHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0bWtIYW5kbGVyOiBta0hhbmRsZXIsXG5cdFx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHRcdHZhciBvbGR2YWx1ZSA9IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBvbGR2YWx1ZSxcblx0XHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFdmVudDogZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0LFxuXHRcdFx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR3aGljaDogZXZ0LndoaWNoLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHRcdH07XG5cblxuXHRcdFx0XHRcdC8vIGhhc093blByb3BlcnR5IGlzIG5vdCByZXF1aXJlZCB0aGVyZVxuXHRcdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRfb3B0aW9uc1tqXSA9IG9wdGlvbnNbal07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9PSBvbGR2YWx1ZSkge1xuXHRcdFx0XHRcdFx0Y29yZS5zZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkTm9kZTogbm9kZSxcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5kb21FdmVudHMuYWRkKGRvbUV2dCk7XG5cdFx0fVxuXHR9XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldChvYmplY3QsIGtleSkge1xuXHRyZXR1cm4gb2JqZWN0W2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9nZXQuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG5NYXRyZXNoa2EuYmluZGVycyA9IGJpbmRlcnM7XG5cbmV4cG9ydCBkZWZhdWx0IE1hdHJlc2hrYTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4uL2NsYXNzJztcblxuZXhwb3J0IGRlZmF1bHQgQ2xhc3Moe1xuXHQvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuXHQvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuXHRleHRlbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWdpYy5qc1xuICoqLyIsIlxuLy8gL14oKFteQF0rKUApPygoLis/KSg6OihbXlxcKFxcKV0rKT8oXFwoKC4qKVxcKSk/KT8pPyQvXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKCkge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuXG4vKmltcG9ydCBtYWdpYyBmcm9tICdtYXRyZXNoa2EtbWFnaWMnO1xuaW1wb3J0IE1LIGZyb20gJ21hdHJlc2hrYSc7XG5pbXBvcnQgJCBmcm9tICdicXVlcnknO1xubGV0IHEgPSAocywgYykgPT4gJChzLCBjKVswXSB8fCBudWxsO1xuXG5sZXQgYmluZElucHV0ID0gKG9iaiwga2V5LCBldnQpID0+IHtcblx0bGV0IGlucHV0ID0gJC5jcmVhdGUoJ2lucHV0JyksXG5cdFx0YmluZGVyID0ge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMuX29ua2V5dXAgPSBjYmM7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldFZhbHVlKHYpIHtcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHY7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRpZihvYmogaW5zdGFuY2VvZiBNSykge1xuXHRcdG9iai5iaW5kTm9kZShrZXksIGlucHV0LCBiaW5kZXIsIGV2dCk7XG5cdH0gZWxzZSB7XG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCBrZXksIGlucHV0LCBiaW5kZXIsIGV2dCk7XG5cdH1cblxuXG5cdHJldHVybiBpbnB1dDtcbn07Ki9cblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuXHRsZXQgb2JqO1xuXHRsZXQgbm9kZTtcblx0bGV0IGJpbmRlcjtcblx0bGV0IHNpbXVsYXRlRG9tRXZlbnQ7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGJpbmRlciA9ICB7XG5cdFx0XHRvbihjYmMpIHtcblx0XHRcdFx0c2ltdWxhdGVEb21FdmVudCA9IGNiYztcblx0XHRcdH0sXG5cdFx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdFx0cmV0dXJuIG5vZGUudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0VmFsdWUodikge1xuXHRcdFx0XHRub2RlLnZhbHVlID0gdjtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQnLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdiYXInO1xuXHRcdHNpbXVsYXRlRG9tRXZlbnQoKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCBiaW5kIGFuZCBjYWxsIGluaXRpYWxpemUnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQgPSAkLmNyZWF0ZSgnaW5wdXQnKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdE1LLmJpbmROb2RlKG9iaiwgJ3gnLCBpbnB1dCwge1xuXHRcdFx0aW5pdGlhbGl6ZSgpIHtcblx0XHRcdFx0Ym9vbCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdGV4cGVjdChib29sKS50b0VxdWFsKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dDEgPSBiaW5kSW5wdXQob2JqLCAneCcpLFxuXHRcdFx0aW5wdXQyID0gYmluZElucHV0KG9iaiwgJ3knKTtcblxuXHRcdG1hZ2ljLnVuYmluZE5vZGUob2JqLCAneCB5JywgW2lucHV0MSwgaW5wdXQyXSk7XG5cblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdG9iai55ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0MS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0ZXhwZWN0KGlucHV0Mi52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0aW5wdXQxLnZhbHVlID0gJ2Jheic7XG5cdFx0aW5wdXQyLnZhbHVlID0gJ3F1eCc7XG5cdFx0aW5wdXQxLl9vbmtleXVwKHt9KTtcblx0XHRpbnB1dDIuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0ZXhwZWN0KG9iai55KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGlucHV0MSA9IGJpbmRJbnB1dChvYmosICd4JyksXG5cdFx0XHRpbnB1dDIgPSBiaW5kSW5wdXQob2JqLCAneScpO1xuXG5cdFx0bWFnaWMudW5iaW5kTm9kZShvYmosIHtcblx0XHRcdHg6IGlucHV0MSxcblx0XHRcdHk6IGlucHV0MlxuXHRcdH0pO1xuXG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRvYmoueSA9ICdiYXInO1xuXHRcdGV4cGVjdChpbnB1dDEudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGV4cGVjdChpbnB1dDIudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0MS52YWx1ZSA9ICdiYXonO1xuXHRcdGlucHV0Mi52YWx1ZSA9ICdxdXgnO1xuXHRcdGlucHV0MS5fb25rZXl1cCh7fSk7XG5cdFx0aW5wdXQyLl9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGV4cGVjdChvYmoueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCdzaG91bGQgYmluZCB2aWEgTWF0cmVzaGthIGluc3RhbmNlIG1ldGhvZCcsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChtaywgJ3gnKTtcblxuXHRcdG1rLnggPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChtay54KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ3Nob3VsZCB1bmJpbmQgdmlhIE1hdHJlc2hrYSBpbnN0YW5jZSBtZXRob2QnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aW5wdXQxID0gYmluZElucHV0KG1rLCAneCcpLFxuXHRcdFx0aW5wdXQyID0gYmluZElucHV0KG1rLCAneScpO1xuXG5cdFx0bWsudW5iaW5kTm9kZSgneCB5JywgW2lucHV0MSwgaW5wdXQyXSk7XG5cblx0XHRtay54ID0gJ2Zvbyc7XG5cdFx0bWsueSA9ICdiYXInO1xuXHRcdGV4cGVjdChpbnB1dDEudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGV4cGVjdChpbnB1dDIudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0MS52YWx1ZSA9ICdiYXonO1xuXHRcdGlucHV0Mi52YWx1ZSA9ICdxdXgnO1xuXHRcdGlucHV0MS5fb25rZXl1cCh7fSk7XG5cdFx0aW5wdXQyLl9vbmtleXVwKHt9KTtcblx0XHRleHBlY3QobWsueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0ZXhwZWN0KG1rLnkpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIGJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56Jyk7XG5cblx0XHRvYmoueC55LnogPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdHg6IHtcblx0XHRcdFx0XHR5OiB7fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneC55LnonKTtcblxuXHRcdG1hZ2ljLnVuYmluZE5vZGUob2JqLCAneC55LnonLCBpbnB1dCk7XG5cblx0XHRvYmoueC55LnogPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2ZvbycpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCByZWJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56Jyk7XG5cblx0XHRvYmoueCA9IHtcblx0XHRcdHk6IHtcblx0XHRcdFx0ejogJ2Zvbydcblx0XHRcdH1cblx0XHR9O1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cdHhpdCgnc2hvdWxkIHJlbW92ZSBiaW5kaW5nIGlmIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHR4OiB7XG5cdFx0XHRcdFx0eToge31cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gueS56JyksXG5cdFx0XHR4ID0gb2JqLng7XG5cblx0XHRvYmoueCA9IHtcblx0XHRcdHk6IHtcblx0XHRcdFx0ejogJ2Zvbydcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cblx0XHR4LnkueiA9ICdiYXonO1xuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCd1c2VzIGN1c3RvbSBzZWxlY3RvcnMgb24gY3VycmVudCB0YXJnZXQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IE1LLnRvKHt4OiB7eTogJ2Zvbyd9fSksXG5cdFx0IFx0ZGl2ID0gJC5jcmVhdGUoJ2RpdicpLFxuXHRcdFx0aW5wdXQgPSBkaXYuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoJ2lucHV0JykpO1xuXG5cdFx0b2JqLmJpbmROb2RlKCdzYW5kYm94JywgZGl2KTtcblx0XHRvYmouYmluZE5vZGUoJ3gueScsICc6c2FuZGJveCBpbnB1dCcsIHtcblx0XHRcdG9uKGNiYykge1xuXHRcdFx0XHR0aGlzLl9vbmtleXVwID0gY2JjO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBub2RlIGlzblxcJ3QgdGhlcmUnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0ZXJyb3IgPSBmYWxzZTtcblxuXHRcdHRyeSB7XG5cdFx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4Jyk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRlcnJvciA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZXhwZWN0KGVycm9yKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kT3B0aW9uYWxOb2RlKG9iaiwgJ3gnKTtcblxuXHRcdGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSBtZXRob2Qgb2YgTWF0cmVzaGthIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSztcblxuXHRcdG1rLmJpbmRPcHRpb25hbE5vZGUoJ3gnLCBudWxsKTtcblxuXHRcdGV4cGVjdCh0cnVlKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdHhpdCgncmV0dXJucyBib3VuZCBub2RlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4Jyk7XG5cblxuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy5ib3VuZChvYmosICd4JykpO1xuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy4kYm91bmQob2JqLCAneCcpWzBdKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgY2hpbGRyZW4gb2Ygc2FuZGJveCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHNwYW4+PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3Qob2JqLCAnc3BhbicpLnRhZ05hbWUpO1xuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS50YWdOYW1lKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxzcGFuPjwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJykudGFnTmFtZSk7XG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggc3BhbicpWzBdLnRhZ05hbWUpO1xuXHR9KTtcblxuXHR4aXQoJ2NhbmNlbHMgZGVlcCBiaW5kaW5nIHZpYSBkZWVwOiBmYWxzZScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICdhLmInLCB7XG5cdFx0XHRcdGRlZXA6IGZhbHNlXG5cdFx0XHR9KTtcblxuXHRcdG9ialsnYS5iJ10gPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmpbJ2EuYiddKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblxuXHR4aXQoJ2FsbG93cyB0byBkZWJvdW5jZSBoYW5kbGVyJywgZG9uZSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aW5wdXQgPSBiaW5kSW5wdXQob2JqLCAneCcsIHtcblx0XHRcdFx0ZGVib3VuY2U6IHRydWVcblx0XHRcdH0pO1xuXG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCcnKTtcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCA0MDApO1xuXHR9KTtcblxuXHR4aXQoJ2FsbG93cyB0byBiaW5kIHNhbmRib3ggdmlhIGJpbmRTYW5kYm94JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGRpdiA9ICQuY3JlYXRlKCdkaXYnKTtcblxuXHRcdE1LLmJpbmRTYW5kYm94KG9iaiwgZGl2KTtcblxuXHRcdGV4cGVjdChNSy5ib3VuZChvYmosICdzYW5kYm94JykpLnRvRXF1YWwoZGl2KTtcblx0fSk7XG5cblxuXHR4aXQoJ2JpbmRTYW5kYm94IHRocm93cyBhbiBlcnJvciB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHR0cnkge1xuXHRcdFx0TUsuYmluZFNhbmRib3gob2JqLCBudWxsKTtcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdGJvb2wgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGV4cGVjdChib29sKS50b0JlVHJ1dGh5KCk7XG5cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcbiAqKi8iLCJjb25zdCBiaW5kaW5nRXJyb3JQcmVmaXggPSAnQmluZGluZyBlcnJvcjonO1xuY29uc3QgZXJyb3JzID0ge1xuXHQnYmluZGluZzpub2RlX21pc3NpbmcnOiAoe2tleSwgbm9kZX0pID0+IHtcblx0XHRjb25zdCBzZWxlY3RvckluZm8gPSB0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgPyBgIFRoZSBzZWxlY3RvciBpcyAke25vZGV9YCA6ICcnO1xuXHRcdHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IG5vZGUgaXMgbWlzc2luZyBmb3IgJHtrZXl9LiR7c2VsZWN0b3JJbmZvfWBcblx0fSxcblx0J2JpbmRpbmc6ZmFsc3lfa2V5JzogKCkgPT4gJ0JpbmRpbmcgZXJyb3I6IFwia2V5XCIgYXJnIGNhbm5vdCBiZSBmYWxzeSdcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG5cdGNvbnN0IGdldEVycm9yID0gZXJyb3JzW2tleV07XG5cdGlmKCFnZXRFcnJvcikge1xuXHRcdHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcblx0fVxuXG5cdHJldHVybiBuZXcgRXJyb3IoZXJyb3JzW2tleV0oZGF0YSkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9