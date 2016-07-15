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
		"./_bindings/defaultbinders.js": 46,
		"./_bindings/lookforbinder.js": 47,
		"./_core/defineprop.js": 35,
		"./_core/defs.js": 33,
		"./_core/init.js": 32,
		"./_dom/default-dollar.js": 48,
		"./_dom/index.js": 49,
		"./_events/addlistener.js": 31,
		"./_events/delegatelistener.js": 30,
		"./_events/removelistener.js": 38,
		"./_events/triggerone.js": 34,
		"./_events/undelegatelistener.js": 37,
		"./array.js": 50,
		"./binders.js": 51,
		"./bindnode.js": 52,
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
		"./get.js": 53,
		"./index.js": 54,
		"./magic.js": 57,
		"./matreshka/index.js": 55,
		"./object.js": 56,
		"./on.js": 58,
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
	
	var lookForBinder = __webpack_require__(47);
	
	module.exports = bindSingleNode;
	function bindSingleNode(object, key, node) {
	    var givenBinder = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var evt = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	    var assignDefaultValue = evt.assignDefaultValue;
	
	    var isUndefined = typeof special.value == 'undefined';
	
	    var binder = void 0;
	
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
/***/ function(module, exports) {

	'use strict';
	
	module.exports = [function (node) {
	    var tagName = node.tagName,
	        binders = core.binders,
	        b;
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(46);
	
	module.exports = function (node) {
	    var result, i;
	
	    for (i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(48);
	
	var dom = {
		$: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 51 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(32);
	
	module.exports = bindNode;
	function bindNode(object, key, node, binder, evt, optional) {
		var _initMK = initMK(object);
	
		var props = _initMK.props;
	}
	
	/*define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/var/map',
		'matreshka_dir/core/initmk',
		'matreshka_dir/core/util/common'
	], function(core, map, initMK, util) {
		"use strict";
		var defaultBinders, lookForBinder;

		defaultBinders = core.defaultBinders = [function(node) {
			var tagName = node.tagName,
				binders = core.binders,
				b;

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

		lookForBinder = core.lookForBinder = function(node) {
			var result,
				ep = defaultBinders,
				i;

			for (i = 0; i < ep.length; i++) {
				if (result = ep[i].call(node, node)) {
					return result;
				}
			}
		};


		core.bindOptionalNode = function(object, key, node, binder, evt) {
			if (typeof key == 'object') {
				/*
				 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
				 *
				bindNode(object, key, node, binder, true);
			} else {
				bindNode(object, key, node, binder, evt, true);
			}

			return object;
		};

		var bindSandbox = core.bindSandbox = function(object, node, evt) {
			var $nodes = core.$(node),
				_evt,
				special,
				i;

			initMK(object);

			if (!$nodes.length) {
				throw Error('Binding error: node is missing for "sandbox".' + (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
			}

			special = core._defineSpecial(object, 'sandbox');

			special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

			if (object.isMK) {
				object.$sandbox = $nodes;
				object.sandbox = $nodes[0];
				object.$nodes.sandbox = special.$nodes;
				object.nodes.sandbox = special.$nodes[0];
			}

			if (!evt || !evt.silent) {
				_evt = {
					key: 'sandbox',
					$nodes: $nodes,
					node: $nodes[0] || null
				};

				if(evt) {
					for (i in evt) {
						_evt[i] = evt[i];
					}
				}

				core._fastTrigger(object, 'bind:sandbox', _evt);
				core._fastTrigger(object, 'bind', _evt);
			}

			return object;
		};

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
/* 53 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = get;
	function get(object, key) {
		return object[key];
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(55);
	
	var MatreshkaArray = __webpack_require__(50);
	
	var MatreshkaObject = __webpack_require__(56);
	
	var Class = __webpack_require__(27);
	
	var binders = __webpack_require__(51);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 55 */
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
/* 56 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmI4MTlhMDhmMjNjZWM3OTMxZWQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0ZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9fZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2lzLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb2ZmLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvYWRkLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvbm90LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvZmluZC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19jb3JlL2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19jb3JlL2RlZnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjIC4qXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hZ2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JDQSxLQUFNLDJCQUEyQixFQUEzQjs7OztBQUlOLEtBQU0sZUFBZSxzQkFBZjs7QUFFTixVQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDekIsU0FBTyx5QkFBeUIsT0FBekIsQ0FBaUMsSUFBakMsS0FBMEMsQ0FBMUMsQ0FEa0I7RUFBMUI7O0FBSUEs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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDSFM7QUFBVCxVQUFTLEdBQVQsQ0FBYSxNQUFiLEVBQXFCLEdBQXJCLEVBQTBCO0FBQ3hDLFNBQU8sT0FBTyxHQUFQLENBQVAsQ0FEd0M7Ozs7Ozs7OztxQ0NBbkI7OzBDQUNLOzsyQ0FDQzs7aUNBQ1Y7O21DQUNFOztBQUVwQixXQUFVLEtBQVYsR0FBa0IsY0FBbEI7QUFDQSxXQUFVLE1BQVYsR0FBbUIsZUFBbkI7QUFDQSxXQUFVLEtBQVYsR0FBa0IsS0FBbEI7QUFDQSxXQUFVLE9BQVYsR0FBb0IsT0FBcEI7O2tCQUVlLFU7Ozs7Ozs7O2tDQ1hJOztpQ0FDRDs7a0JBRUgsTUFBTTs7O0VBQU4sRUFHWjs7QUFFRixnQkFGRTtFQUhZLEU7Ozs7Ozs7O2tCQ0hBLEU7Ozs7Ozs7O2tCQ0FBLEU7Ozs7Ozs7Ozs7a0JDR1M7QUFBVCxVQUFTLEVBQVQsR0FBYyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmI4MTlhMDhmMjNjZWM3OTMxZWRcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXCI6IDE3LFxuXHRcIi4vYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXCI6IDE4LFxuXHRcIi4vYnF1ZXJ5L2ZpbmRfc3BlYy5qc1wiOiAyMCxcblx0XCIuL2JxdWVyeS9pbml0X3NwZWMuanNcIjogMjEsXG5cdFwiLi9icXVlcnkvaXNfc3BlYy5qc1wiOiAyMixcblx0XCIuL2JxdWVyeS9ub3Rfc3BlYy5qc1wiOiAyMyxcblx0XCIuL2JxdWVyeS9vbmVfc3BlYy5qc1wiOiAyNCxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1wiOiAyNSxcblx0XCIuL2NsYXNzX3NwZWMuanNcIjogMjYsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1wiOiAyOCxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1wiOiAyOSxcblx0XCIuL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcIjogNDAsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1wiOiA0MSxcblx0XCIuL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcIjogNDIsXG5cdFwiLi9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1wiOiA0M1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Rlc3Qvc3BlYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmFkZCcsICgpID0+IHtcblx0aXQoJ2FkZHMgb25jZScsICgpID0+IHtcblx0XHRjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5hZGQoW2VsMiwgZWwzLCBlbDQsIGVsNV0pXG5cdFx0XSkudG9FcXVhbChbZWwxLCBlbDIsIGVsMywgZWw0LCBlbDVdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cdHJldHVybiBuZXcgSW5pdChzZWxlY3RvciwgY29udGV4dCk7XG59XG5cbm5vZm4uYXNzaWduKGJRdWVyeSwge1xuXHRmbjogSW5pdC5wcm90b3R5cGUsXG5cdGV4dGVuZCxcblx0cGFyc2VIVE1MLFxuXHRvbmUsXG5cdGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuXHRvbixcblx0b2ZmLFxuXHRpcyxcblx0YWRkLFxuXHRub3QsXG5cdGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cdGxldCByZXN1bHQ7XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHNlbGVjdG9yID09PSB3aW5kb3cpIHtcblx0XHRcdHJlc3VsdCA9IFtzZWxlY3Rvcl07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdHJlc3VsdCA9IGh0bWwybm9kZUxpc3Qoc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGNvbnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCBuZXdDb250ZXh0ID0gKG5ldyBCUXVlcnlJbml0KGNvbnRleHQpKVswXTtcblxuXHRcdFx0XHRcdGlmIChuZXdDb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikgeyAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuXHRcdFx0aWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZWN0b3IoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gc2VsZWN0b3I7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgbGVuZ3RoID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGg7XG5cblx0aWYgKGxlbmd0aCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMucHVzaChyZXN1bHRbaV0pO1xuXHRcdH1cblx0fVxufVxuXG5CUXVlcnlJbml0LnByb3RvdHlwZSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBCUXVlcnlJbml0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19pbml0LmpzXG4gKiovIiwiLy8gY29udmVydHMgSFRNTCBzdHJpbmcgdG8gTm9kZUxpc3QgaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh0bWwybm9kZUxpc3QoaHRtbCkge1xuXHQvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG5cdGNvbnN0IHdyYXBNYXAgPSB7XG5cdFx0b3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcblx0XHRsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuXHRcdHRoZWFkOiBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXSxcblx0XHR0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG5cdFx0dGQ6IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddLFxuXHRcdGNvbDogWzIsICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsICc8L2NvbGdyb3VwPjwvdGFibGU+J10sXG5cdFx0YXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcblx0XHRfOiBbMCwgJycsICcnXVxuXHR9O1xuXG5cdGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0aTtcblxuXHRodG1sID0gaHRtbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG5cblx0d3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXHR3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuXHR3cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuXHRjb25zdCBleCA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpLFxuXHRcdHdyYXBwZXIgPSBleCAmJiB3cmFwTWFwW2V4WzFdXSB8fCB3cmFwTWFwLl87XG5cblx0bm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cblx0aSA9IHdyYXBwZXJbMF07XG5cblx0d2hpbGUgKGktLSkge1xuXHRcdG5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuXHR9XG5cblx0cmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcblx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuXHR9XG5cblx0Y29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG5cdGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0Y29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG5cdFx0XHRmb3IgKGNvbnN0IG5leHRLZXkgaW4gc291cmNlKSB7XG5cdFx0XHRcdGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcblx0XHRcdFx0XHRvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXh0ZW5kLmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5pbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcGFyc2VzIGdpdmVuIEhUTUwgYW5kIHJldHVybnMgYlF1ZXJ5IChCUXVlcnlJbml0KSBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcblx0cmV0dXJuIG5ldyBJbml0KGh0bWwybm9kZUxpc3QoaHRtbCkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyByZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIG1hdGNoZWQgc2V0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbmUocywgY29udGV4dCkge1xuXHRyZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZSh0YWdOYW1lLCBwcm9wcykge1xuXHRpZiAodHlwZW9mIHRhZ05hbWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cHJvcHMgPSB0YWdOYW1lO1xuXHRcdHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuXHR9XG5cblx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG5cdGlmIChwcm9wcykge1xuXHRcdG5vZm4uZm9yT3duKHByb3BzLCAodmFsdWUsIGtleSkgPT4ge1xuXHRcdFx0aWYgKGtleSA9PT0gJ2F0dHJpYnV0ZXMnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG5cdFx0XHRcdG5vZm4uZm9yRWFjaCh2YWx1ZSwgKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0ZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChlbFtrZXldICYmIHR5cGVvZiBlbFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdG5vZm4uYXNzaWduKGVsW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoa2V5ICE9PSAndGFnTmFtZScpIHtcblx0XHRcdFx0ZWxba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGVsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuaW1wb3J0IGlzIGZyb20gJy4vaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB3aGVuIGEgc2VsZWN0b3IgaXMgZ2l2ZW5cbmZ1bmN0aW9uIGRlbGVnYXRlSGFuZGxlcihldnQsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG5cdGNvbnN0IHJhbmRvbUlEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnJlcGxhY2UoJzAuJywgJ3gnKSxcblx0XHRzY29wZVNlbGVjdG9yID0gYFske3JhbmRvbUlEfT1cIiR7cmFuZG9tSUR9XCJdIGAsXG5cdFx0c3BsaXR0ZWRTZWxlY3RvciA9IHNlbGVjdG9yLnNwbGl0KCcsJyk7XG5cblx0bGV0IG1hdGNoaW5nID0gJyc7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHRlZFNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcblx0XHRtYXRjaGluZyArPSBgJHtpID09PSAwID8gJycgOiAnLCd9JHtzY29wZVNlbGVjdG9yfSR7c2VsfSwke3Njb3BlU2VsZWN0b3J9JHtzZWx9ICpgO1xuXHR9XG5cblxuXHR0aGlzLnNldEF0dHJpYnV0ZShyYW5kb21JRCwgcmFuZG9tSUQpO1xuXG5cdGlmIChpcy5jYWxsKFtldnQudGFyZ2V0XSwgbWF0Y2hpbmcpKSB7XG5cdFx0aGFuZGxlci5jYWxsKHRoaXMsIGV2dCk7XG5cdH1cblxuXHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG5cdGxldCBkZWxlZ2F0ZTtcblxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xuXHRcdHNlbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdGlmIChzZWxlY3Rvcikge1xuXHRcdGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuXHRcdFx0ZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG5cdFx0fTtcblx0fVxuXG5cdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRuYW1lID0gbmFtZVswXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbal0sXG5cdFx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXgsXG5cdFx0XHRcdGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlSURdID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gfHwgW107XG5cblx0XHRcdGxldCBleGlzdCA9IGZhbHNlO1xuXG5cblx0XHRcdGZvciAobGV0IGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXG5cdFx0XHRcdGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdGV4aXN0ID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWV4aXN0KSB7XG5cdFx0XHRcdGV2ZW50cy5wdXNoKHtcblx0XHRcdFx0XHRkZWxlZ2F0ZSxcblx0XHRcdFx0XHRoYW5kbGVyLFxuXHRcdFx0XHRcdG5hbWVzcGFjZSxcblx0XHRcdFx0XHRzZWxlY3RvclxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZGVsZWdhdGUgfHwgaGFuZGxlciwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29uLmpzXG4gKiovIiwiLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIGFzIGFuIG9iamVjdCBtb2R1bGVzIGJlY2F1c2Ugd2UgdXNlXG4vLyBzaW1wbGlmaWVkIGVzIG1vZHVsZXMgdGhlcmUgYW5kIGNhbm5vdCBpbXBvcnQgYW5kIHNoYXJlIGEgbnVtYmVyXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5vZGVJbmRleDogMCxcblx0YWxsRXZlbnRzOiB7fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9fZGF0YS5qc1xuICoqLyIsIi8vIGNoZWNrIHRoZSBmaXJzdCBlbGVtZW50IGZyb20gZ2l2ZW4gc2V0IGFnYWluc3QgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXMocykge1xuXHRjb25zdCBub2RlID0gdGhpc1swXTtcblx0cmV0dXJuIG5vZGVcblx0XHQ/IChub2RlLm1hdGNoZXNcblx0XHRcdHx8IG5vZGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm1vek1hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKG5vZGUsIHMpIDogZmFsc2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaXMuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcblxuLy8gcmVtb3ZlcyBldmVudCBoYW5kbGVyIGZyb20gYSBzZXQgb2YgZWxlbWVudHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9mZihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGhhbmRsZXIgPSBzZWxlY3Rvcjtcblx0XHRzZWxlY3RvciA9IG51bGw7XG5cdH1cblxuXHRuYW1lcyA9IG5hbWVzLnNwbGl0KC9cXHMvKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IG5hbWUgPSBuYW1lc1tpXS5zcGxpdCgvXFwuKC4rKS8pO1xuXHRcdGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG5cdFx0bmFtZSA9IG5hbWVbMF07XG5cblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGNvbnN0IG5vZGUgPSB0aGlzW2pdLFxuXHRcdFx0XHRldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cblx0XHRcdGlmIChldmVudHMpIHtcblx0XHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5kZWxlZ2F0ZSlcblx0XHRcdFx0XHRcdCYmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PT0gZXZlbnQubmFtZXNwYWNlKVxuXHRcdFx0XHRcdFx0JiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnQuZGVsZWdhdGUgfHwgZXZlbnQuaGFuZGxlcik7XG5cdFx0XHRcdFx0XHRldmVudHMuc3BsaWNlKGstLSwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIW5hbWVzcGFjZSAmJiAhc2VsZWN0b3IpIHtcblx0XHRcdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG5cdGNvbnN0IGlkTWFwID0ge307XG5cblx0bGV0IHJlc3VsdCxcblx0XHRub2RlSUQsXG5cdFx0bm9kZSxcblx0XHRpO1xuXG5cdHNlbGVjdG9yID0gbmV3IEluaXQoc2VsZWN0b3IpO1xuXG5cdGlmICh0aGlzLmxlbmd0aCkge1xuXHRcdHJlc3VsdCA9IG5ldyBJbml0KHRoaXMpO1xuXHRcdGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGUgPSByZXN1bHRbaV07XG5cdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuXHRcdFx0aWRNYXBbbm9kZUlEXSA9IDE7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRub2RlID0gc2VsZWN0b3JbaV07XG5cdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuXHRcdFx0aWYgKCFpZE1hcFtub2RlSURdKSB7XG5cdFx0XHRcdGlkTWFwW25vZGVJRF0gPSAxO1xuXHRcdFx0XHRyZXN1bHQucHVzaChub2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gc2VsZWN0b3I7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcblx0Y29uc3QgcmVzdWx0ID0gbmV3IEluaXQoKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoIW5ldyBJbml0KHRoaXNbaV0pLmlzKHNlbGVjdG9yKSkge1xuXHRcdFx0cmVzdWx0LnB1c2godGhpc1tpXSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9ub3QuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gZ2V0IHRoZSBkZXNjZW5kYW50cyBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIG1hdGNoZWQgZWxlbWVudHMsXG4vLyBmaWx0ZXJlZCBieSBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG5cdGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG5cdG5vZm4uZm9yRWFjaCh0aGlzLCBlbCA9PiB7XG5cdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cdH0pO1xuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvZmluZC5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmNyZWF0ZScsICgpID0+IHtcblx0aXQoJ2NyZWF0ZXMgZWxlbWVudCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2JykudGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnRElWJyk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIGEgcHJvcGVydHknLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0Y2xhc3NOYW1lOiAnZm9vYmFyJ1xuXHRcdFx0fSkuY2xhc3NOYW1lXG5cdFx0KS50b0VxdWFsKCdmb29iYXInKTtcblx0fSk7XG5cblx0aXQoJ2NyZWF0ZXMgY2hpbGRlbicsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRjaGlsZHJlbjogW3tcblx0XHRcdFx0XHR0YWdOYW1lOiAnc3Bhbidcblx0XHRcdFx0fV1cblx0XHRcdH0pLmNoaWxkcmVuWzBdLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgYXR0cmlidXRlJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGF0dHJpYnV0ZXM6IHtcblx0XHRcdFx0XHRmb286ICdiYXInXG5cdFx0XHRcdH1cblx0XHRcdH0pLmdldEF0dHJpYnV0ZSgnZm9vJylcblx0XHQpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3Mgb2JqZWN0IHdpdGggdGFnTmFtZSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSh7XG5cdFx0XHRcdHRhZ05hbWU6ICdkaXYnXG5cdFx0XHR9KS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdESVYnKTtcblx0fSk7XG5cblx0eGl0KCdleHRlbmRzIGRhdGFzZXQgb2JqZWN0JywgKCkgPT4ge1xuXHRcdC8vIFRPRE9cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuaW1wb3J0IHNpbXVsYXRlQ2xpY2sgZnJvbSAnLi4vLi4vbGliL3NpbXVsYXRlY2xpY2snO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGV2ZW50cycsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94LFxuXHRcdGNoaWxkMSxcblx0XHRjaGlsZDIsXG5cdFx0Z3JhbmRjaGlsZDEsXG5cdFx0aGFuZGxlcjtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkMVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDFcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkMlwiPjwvZGl2PlxuXHRcdGA7XG5cblx0XHRjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQxJyk7XG5cdFx0Y2hpbGQyID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMicpO1xuXHRcdGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cdGFmdGVyRWFjaCgoKSA9PiB7XG5cdFx0JChbdGVzdFNhbmRib3gsIGNoaWxkMSwgY2hpbGQyLCBncmFuZGNoaWxkMV0pLm9mZignY2xpY2snKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBuYW1lc3BhY2VkIGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJyk7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGJ1YmJsaW5nIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKGNsaWNrIG9uIGdyYW5kY2hpbGRyZW4pJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0RvZXNuXFx0IHRyaWdnZXIgd2hlbiBjbGlja2VkIG9uIHdyb25nIGNoaWxkJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQyJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJyk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIG5vdCBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1N0b3BzIHByb3BhZ2F0aW9uJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdCQoY2hpbGQxKS5vbignY2xpY2snLCBldnQgPT4gZXZ0LnN0b3BQcm9wYWdhdGlvbigpKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanNcbiAqKi8iLCIvLyBzaW11bGF0ZXMgY2xpY2sgb24gYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW11bGF0ZUNsaWNrKG5vZGUpIHtcblx0Y29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcblx0ZXZ0LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUpO1xuXHRub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmZpbmQnLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveCxcblx0XHRncmFuZENoaWxkO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRncmFuZENoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcblx0fSk7XG5cblx0aXQoJ2ZpbmRzJywgKCkgPT4ge1xuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKHRlc3RTYW5kYm94KS5maW5kKCcuZ3JhbmRjaGlsZCcpXG5cdFx0XSkudG9FcXVhbChbZ3JhbmRDaGlsZF0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuLy8g0LfQsNGB0YPQvdGD0YLRjCDQstGB0LUg0YHQvtC30LTQsNC90LjRjyDQvdC+0LLRi9GFINGN0LvQtdC80LXQvdGC0L7QsiDQsiBiZWZvcmVFYWNoXG4vLyDRgNC10YTQsNC60YLQvtGA0LjRgtGMXG4vLyDQvdCw0L/QuNGB0LDRgtGMINC60L7QvNC80LXQvdGC0LDRgNC40LggKNCyINGC0L7QvCDRh9C40YHQu9C1INC4INC6INGD0LbQtSDRgNC10LDQu9C40LfQvtCy0LDQvdC90YvQvCDRhNGD0L3QutGG0LjRj9C8KVxuLy8g0L/QvtGB0LvQtSDQstGB0LXQs9C+INC90YPQttC90L4g0LLQutC70Y7Rh9C40YLRjCDQu9C40L3RgtC10YAg0Lgg0L/RgNC+0LLQtdGA0LjRgtGMINC60L7QstC10YDQsNC00LZcblxuZGVzY3JpYmUoJ2JRdWVyeSBpbml0aWFsaXphdGlvbicsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94O1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0xXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTJcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtM1wiPjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblx0fSk7XG5cblx0aXQoJ2FjY2VwdHMgd2luZG93JywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQod2luZG93KTtcblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKHdpbmRvdyk7XG5cdH0pO1xuXG5cdGl0KCdhY2NlcHRzIGRvY3VtZW50JywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQoZG9jdW1lbnQpO1xuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwoZG9jdW1lbnQpO1xuXHR9KTtcblxuXHRpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgnY29udmVydHMgYXJyYXktbGlrZScsICgpID0+IHtcblx0XHRjb25zdCBjaGlsZHJlbiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSxcblx0XHRcdHJlc3VsdCA9ICQoY2hpbGRyZW4pO1xuXG5cdFx0ZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdGV4cGVjdChjaGlsZHJlbltpXSkudG9FcXVhbChyZXN1bHRbaV0pO1xuXHRcdH1cblx0fSk7XG5cblx0aXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqJyksXG5cdFx0XHRyZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KGVsZW1lbnQpLnRvRXF1YWwocmVzdWx0WzBdKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgdGVzdFNhbmRib3gpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgxKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgJy53cm9uZy1jb250ZXh0JykubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQobnVsbCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcblx0XHQkLmZuLmJRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uIGJRdWVyeVBsdWdpbigpIHtcblx0XHRcdGV4cGVjdChcblx0XHRcdFx0dGhpcy5sZW5ndGhcblx0XHRcdCkudG9FcXVhbChcblx0XHRcdFx0dGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLmxlbmd0aFxuXHRcdFx0KTtcblx0XHR9O1xuXG5cdFx0c3B5T24oJC5mbiwgJ2JRdWVyeVBsdWdpbicpO1xuXG5cdFx0JCgnKicsIHRlc3RTYW5kYm94KS5iUXVlcnlQbHVnaW4oKTtcblxuXHRcdGV4cGVjdCgkLmZuLmJRdWVyeVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcblx0aXQoJ2NoZWNrcyBjbGFzc05hbWUnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbC5jbGFzc05hbWUgPSAnZWwnO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChlbCkuaXMoJy5lbCcpXG5cdFx0KS50b0VxdWFsKHRydWUpO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChlbCkuaXMoJy5lbDInKVxuXHRcdCkudG9FcXVhbChmYWxzZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcblx0aXQoJ2V4Y2x1ZGVzIGJ5IHNlbGVjdG9yJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdGVsMi5jbGFzc05hbWUgPSAnZWwyJztcblxuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKFtlbDEsIGVsMiwgZWwzXSkubm90KCcuZWwyJylcblx0XHRdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgKCkgPT4ge1xuXHRpdCgnZmluZHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cImNoaWxkMlwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGQyXCI+PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdGNvbnN0IGNoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkJyk7XG5cblx0XHRleHBlY3QoXG5cdFx0XHQkLm9uZSgnKicsIHRlc3RTYW5kYm94KVxuXHRcdCkudG9FcXVhbChjaGlsZCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5wYXJzZUhUTUwnLCAoKSA9PiB7XG5cdGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgncGFyc2VzIGNvbnRleHR1YWwgZWxlbWVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzx0ZD48L3RkPjx0ZD48L3RkPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuXHRcdGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1xuICoqLyIsImltcG9ydCBDbGFzcyBmcm9tICdzcmMvY2xhc3MnO1xuXG5kZXNjcmliZSgnQ2xhc3MgZnVuY3Rpb24nLCAoKSA9PiB7XG5cdGl0KCdhbGxvd3MgdG8gaW5oZXJpdCcsICgpID0+IHtcblx0XHRjb25zdCBBID0gQ2xhc3MoeyBhOiB0cnVlIH0pLFxuXHRcdFx0QiA9IENsYXNzKHsgYjogdHJ1ZSwgZXh0ZW5kczogQSB9KSxcblx0XHRcdEMgPSBDbGFzcyh7IGM6IHRydWUsIGV4dGVuZHM6IEIgfSksXG5cdFx0XHRpbnN0ID0gbmV3IEM7XG5cblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEIpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEMpLnRvQmVUcnV0aHkoKTtcblxuXHRcdGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdC5iKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QuYykudG9CZVRydXRoeSgpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIHBhc3Mgc3RhdGljIHByb3BzJywgKCkgPT4ge1xuXHRcdGNvbnN0IEEgPSBDbGFzcyh7fSwgeyBzdGF0aWNQcm9wOiB0cnVlIH0pO1xuXHRcdGV4cGVjdChBLnN0YXRpY1Byb3ApLnRvQmVUcnV0aHkoKTtcblx0fSk7XG5cblx0aXQoJ2lmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgaW5zdCA9IG5ldyBDbGFzcyh7IGE6IHRydWUgfSk7XG5cdFx0ZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQ2xhc3MpLnRvQmVGYWxzeSgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGFzcyhwcm90b3R5cGUsIHN0YXRpY1Byb3BzKSB7XG5cdGNvbnN0IENvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBPYmplY3Rcblx0XHRcdD8gcHJvdG90eXBlLmNvbnN0cnVjdG9yXG5cdFx0XHQ6IGZ1bmN0aW9uIEVtcHR5Q29uc3RydWN0b3IoKSB7fSxcblx0XHQvL2V4dGVuZHMgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXHRcdFBhcmVudCA9IHByb3RvdHlwZS5leHRlbmRzIHx8IHByb3RvdHlwZS5leHRlbmQsXG5cdFx0Ly9pbmhlcml0IHByb3RvIGZyb20gY2xhc3MgcGFyZW50IG9yIGVtcHR5IG9iamVjdFxuXHRcdHByb3RvID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQgPyBQYXJlbnQucHJvdG90eXBlIDoge30pO1xuXG5cdGV4dGVuZChwcm90bywgcHJvdG90eXBlKTtcblxuXHRpZiAodHlwZW9mIHN0YXRpY1Byb3BzID09PSAnb2JqZWN0Jykge1xuXHRcdGV4dGVuZChDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuXHR9XG5cblx0Ly8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblx0cHJvdG8uaW5zdGFuY2VPZiA9IGZ1bmN0aW9uIGluc3RhbmNlT2YoKSB7XG5cdFx0cmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcjtcblx0fTtcblxuXHRDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90bztcblxuXHQvLyBpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlXG5cdGlmICh0aGlzIGluc3RhbmNlb2YgQ2xhc3MpIHtcblx0XHRyZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIENvbnN0cnVjdG9yO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzcy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChNYXRyZXNoa2EuT2JqZWN0IGFuZCBNYXRyZXNoa2EuQXJyYXkpJywgZnVuY3Rpb24oKSB7XG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0Y2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHtcblx0XHRcdGE6IHt9XG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7XG5cdFx0XHRhOiB7fVxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKG5ldyBNSy5BcnJheSh7fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF1bMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0YToge31cblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdHk6IG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0XHRhOiB7fVxuXHRcdFx0fSlcblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LnkuYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1xuICoqLyIsImltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5cbmRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKGJhc2ljKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBjdHgsXG5cdFx0aGFuZGxlcjtcblxuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdGN0eCA9IHt9O1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblxuXHRpdCgnZmlyZXMgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IHt9O1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi5jID0ge307XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRhID0gb2JqLmE7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKGEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSB7fTtcblx0XHR0cmlnZ2VyT25lKGIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGEgPSBvYmouYTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcblx0XHR0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcblx0XHR0cmlnZ2VyT25lKGIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YyA9IG9iai5hLmM7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIuYyA9IHt9O1xuXHRcdHRyaWdnZXJPbmUoYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG5cdFx0b2JqLmEuYi5jID0gNTU7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndXNlcyBjb3JyZWN0IGNvbnRleHQgZm9yIGRlbGVnYXRlZCBldmVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblx0XHRsZXQgYm9vbCA9IGZhbHNlO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBmdW5jdGlvbiBoYW5kbGUoKSB7XG5cdFx0XHRib29sID0gdGhpcyA9PT0gY3R4O1xuXHRcdH0sIGN0eCk7XG5cblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQgbm8tdXNlLWJlZm9yZS1kZWZpbmU6IFtcImVycm9yXCIsIHsgXCJmdW5jdGlvbnNcIjogZmFsc2UgfV0qL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vYWRkbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKHtcblx0cHJldmlvdXNWYWx1ZSxcblx0dmFsdWVcbn0sIHtcblx0cGF0aCxcblx0bmFtZSxcblx0Y2FsbGJhY2ssXG5cdGNvbnRleHRcbn0gPSB0cmlnZ2VyT25lLmxhdGVzdEV2ZW50LmluZm8uZGVsZWdhdGVkRGF0YSkge1xuXHRpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdGRlbGVnYXRlTGlzdGVuZXIodmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0fVxuXG5cdGlmIChwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihwcmV2aW91c1ZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcblx0cGF0aCA9IHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJyAmJiBwYXRoICE9PSAnJyA/IHBhdGguc3BsaXQoJy4nKSA6IHBhdGg7XG5cblx0aWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuXHRcdC8vIGlmIG5vIHBhdGggdGhlbiBhZGQgc2ltcGxlIGxpc3RlbmVyXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdO1xuXHRcdGxldCBwYXRoU3RyO1xuXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdFx0cGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG5cdFx0XHRwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGggPSBbXTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG5cdFx0XHRwYXRoLFxuXHRcdFx0bmFtZSxcblx0XHRcdGNhbGxiYWNrLFxuXHRcdFx0Y29udGV4dFxuXHRcdH07XG5cblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG5cdFx0XHRkZWxlZ2F0ZWREYXRhLFxuXHRcdFx0cGF0aFN0clxuXHRcdH0pO1xuXG5cdFx0Y2hhbmdlSGFuZGxlcih7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV1cblx0XHR9LCBkZWxlZ2F0ZWREYXRhKTtcblx0fVxufVxuXG4vKlxuZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvaW5pdG1rJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvc3BlY2lhbGV2dHJlZydcbl0sIGZ1bmN0aW9uKGNvcmUsIGluaXRNSywgbWFwLCBzcGVjaWFsRXZ0UmVnKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX2RlbGVnYXRlTGlzdGVuZXIgPSBjb3JlLl9kZWxlZ2F0ZUxpc3RlbmVyID0gZnVuY3Rpb24ob2JqZWN0LFxuXHQgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0aW5pdE1LKG9iamVjdCk7XG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV4ZWN1dGVkID0gLyhbXlxcLl0rKVxcLiguKikvLmV4ZWMocGF0aCksXG5cdFx0XHRmLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdGNoYW5nZUtleSxcblx0XHRcdG9iajtcblxuXHRcdHBhdGggPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzJdIDogJyc7XG5cblx0XHRldnREYXRhID0gZXZ0RGF0YSB8fCB7fTtcblxuXHRcdGlmIChmaXJzdEtleSkge1xuXHRcdFx0aWYgKGZpcnN0S2V5ID09ICcqJykge1xuXHRcdFx0XHRpZiAob2JqZWN0LmlzTUtBcnJheSkge1xuXHRcdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRcdChldnQgJiYgZXZ0LmFkZGVkID8gZXZ0LmFkZGVkIDogb2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdFx0aXRlbSAmJiBfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLFxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdhZGQnLCBmLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRmKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAob2JqZWN0LmlzTUtPYmplY3QpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2V2dC5rZXldO1xuXG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0ICYmIGV2dCAmJiAoZXZ0LmtleSBpbiBvYmplY3REYXRhLmtleXMpKSB7XG5cdFx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5fc2lsZW50KSByZXR1cm47XG5cblx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2ZpcnN0S2V5XSxcblx0XHRcdFx0XHRcdGNoYW5nZUtleSxcblx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSB0cnVlLFxuXHRcdFx0XHRcdFx0aSxcblx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cztcblxuXHRcdFx0XHRcdGV2dERhdGEucGF0aCA9IHBhdGg7XG5cblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgPSBldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgfHxcblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2ZpcnN0S2V5XTtcblxuXHRcdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgJiYgbWFwLmhhcyhldnQucHJldmlvdXNWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lcihldnQucHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0ID09ICdvYmplY3QnICYmIHRhcmdldCkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIodGFyZ2V0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHNwZWNpYWxFdnRSZWcudGVzdChuYW1lKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlS2V5ID0gbmFtZS5yZXBsYWNlKHNwZWNpYWxFdnRSZWcsICcnKTtcblxuXHRcdFx0XHRcdFx0aWYgKCFwYXRoICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZSAmJiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XVxuXHRcdFx0XHRcdFx0IT09IHRhcmdldFtjaGFuZ2VLZXldKSB7XG5cdFx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cyA9IG1hcC5nZXQoZXZ0RGF0YS5wcmV2aW91c1ZhbHVlKS5ldmVudHNbbmFtZV07XG5cdFx0XHRcdFx0XHRcdGlmIChjaGFuZ2VFdmVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hhbmdlRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzW2ldLnBhdGggPT09IHBhdGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJpZ2dlckNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29yZS5zZXQodGFyZ2V0LCBjaGFuZ2VLZXksIHRhcmdldFtjaGFuZ2VLZXldLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3JjZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzVmFsdWU6IGV2dERhdGEucHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuXHRcdFx0XHRcdFx0XHRcdFx0cHJldmlvdXNPYmplY3Q6IGV2dERhdGEucHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9zaWxlbnQ6IHRydWVcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXG5cdFx0XHRcdGYoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0fVxuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLyplc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiZXZ0XCJdIH1dKi9cblxuaW1wb3J0IGluaXRNSyBmcm9tICcuLi9fY29yZS9pbml0JztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuLi9fY29yZS9kZWZpbmVwcm9wJztcblxuLy8gcHJvcGVydHkgbW9kaWZpZXIgZXZlbnQgcmVnZXhwXG5jb25zdCBwcm9wTW9kRXZlbnRSZWdcblx0PSAvXl9jaGFuZ2U6ZGVwczp8Xl9jaGFuZ2U6YmluZGluZ3M6fF5fY2hhbmdlOmRlbGVnYXRlZDp8XmNoYW5nZTp8XmJlZm9yZWNoYW5nZTovO1xuXG4vLyBhZGRzIHNpbXBsZSBldmVudCBsaXN0ZW5lclxuLy8gdXNlZCBhcyBjb3JlIG9mIGV2ZW50IGVuZ2luZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG5cdGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGluaXRNSyhvYmplY3QpLFxuXHRcdGN0eCA9IGNvbnRleHQgfHwgb2JqZWN0LFxuXHRcdGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXSxcblx0XHRldnQgPSB7IGNhbGxiYWNrLCBjb250ZXh0LCBjdHgsIG5hbWUsIGluZm8gfTtcblxuXG5cdC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lXG5cdGlmIChldmVudHMpIHtcblx0XHQvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgZGF0YSwgcmV0dXJuIGZhbHNlXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IGV2dCA9IGV2ZW50c1tpXTtcblx0XHRcdGlmICgoZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjayB8fCBldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrLl9jYWxsYmFjaylcblx0XHRcdFx0XHQmJiBldnQuY29udGV4dCA9PT0gY29udGV4dCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gaWYgdGhlIGV2ZW50IGlzbid0IGZvdW5kIGFkZCBpdCB0byB0aGUgZXZlbnQgbGlzdFxuXHRcdGV2ZW50cy5wdXNoKGV2dCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUsIGNyZWF0ZSBhcnJheSB3aXRoIG9ubHkgZWJlbnRcblx0XHRhbGxFdmVudHNbbmFtZV0gPSBbZXZ0XTtcblx0fVxuXG5cdGlmIChwcm9wTW9kRXZlbnRSZWcudGVzdChuYW1lKSkge1xuXHRcdC8vIGRlZmluZSBuZWVkZWQgYWNjZXNzb3JzIGZvciBLRVlcblx0XHRkZWZpbmVQcm9wKG9iamVjdCwgbmFtZS5yZXBsYWNlKHByb3BNb2RFdmVudFJlZywgJycpKTtcblx0fVxuXG5cdGlmIChuYW1lWzBdICE9PSAnXycpIHtcblx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYGFkZGV2ZW50OiR7bmFtZX1gLCBldnQpO1xuXHRcdHRyaWdnZXJPbmUob2JqZWN0LCAnYWRkZXZlbnQnLCBldnQpO1xuXHR9XG5cblx0Ly8gaWYgZXZlbnQgaXMgYWRkZWQgcmV0dXJuIHRydWVcblx0cmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcblxuLy8gdGhpcyBpcyBjb21tb24gZnVuY3Rpb24gd2hpY2ggYXNzb2NpYXRlcyBhbiBvYmplY3Qgd2l0aCBpdHMgTWF0cmVzaGthIGRlZmluaXRpb25cbmZ1bmN0aW9uIGNvbW1vbkluaXQob2JqZWN0KSB7XG5cdGxldCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXHRpZiAoIWRlZikge1xuXHRcdGRlZiA9IHtcblx0XHRcdC8vIGEgcHJvcGVydHkgbmFtZSBvZiBcImV2ZW50c1wiIG9iamVjdCBpcyBhbiBldmVudCBuYW1lXG5cdFx0XHQvLyBhbmQgYSB2YWx1ZSBpcyBhbiBhcnJheSBvZiBldmVudCBoYW5kbGVyc1xuXHRcdFx0ZXZlbnRzOiB7XG5cdFx0XHRcdC8qZXhhbXBsZToge1xuXHRcdFx0XHRcdGNhbGxiYWNrOiBmdW5jdGlvbixcblx0XHRcdFx0XHRjdHg6IG9iamVjdCxcblx0XHRcdFx0XHRjb250ZXh0OiBvYmplY3QyLFxuXHRcdFx0XHRcdG5hbWU6IFwiZXhhbXBsZVwiXG5cdFx0XHRcdH1cblx0XHRcdFx0Ki9cblx0XHRcdH0sXG5cdFx0XHQvLyBcInByb3BzXCIgY29udGFpbnMgc3BlY2lhbCBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzIChnZXR0ZXJzLCBzZXR0ZXJzIGV0Yylcblx0XHRcdHByb3BzOiB7XG5cdFx0XHRcdC8qZXhhbXBsZToge1xuXHRcdFx0XHRcdC8vP25vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdFx0XHQvLz9kZXN0cm95ZXJzOiBNYXAsXG5cdFx0XHRcdFx0YmluZGluZ3M6IFt7XG5cdFx0XHRcdFx0XHRub2RlLFxuXHRcdFx0XHRcdFx0YmluZGVyLFxuXHRcdFx0XHRcdFx0bm9kZUhhbmRsZXIsXG5cdFx0XHRcdFx0XHRvYmplY3RIYW5kbGVyXG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSovXG5cdFx0XHR9LFxuXHRcdFx0aWQ6IGBtayR7TWF0aC5yYW5kb20oKX1gXG5cdFx0fTtcblxuXHRcdGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcblx0fVxuXG5cdHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRNSyhvYmplY3QpIHtcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG5cdGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuXHR9XG5cblx0Ly8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG5cdC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcblx0Ly8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0cmV0dXJuIG9iamVjdC5faW5pdE1LID8gb2JqZWN0Ll9pbml0TUsoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcblx0Z2V0KG9iaikge1xuXHRcdHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcblx0fSxcblx0c2V0KG9iaiwgZGF0YSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuXHRcdFx0dmFsdWU6IGRhdGEsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0XHR9KTtcblx0fSxcblx0aGFzKG9iaikge1xuXHRcdHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlck9uZShvYmplY3QsIG5hbWUpIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IGV2ZW50cyA9IGRlZi5ldmVudHNbbmFtZV07XG5cblx0aWYgKGV2ZW50cykge1xuXHRcdGNvbnN0IGFyZ3MgPSBub2ZuLnNsaWNlKGFyZ3VtZW50cywgMiksXG5cdFx0XHRsID0gZXZlbnRzLmxlbmd0aCxcblx0XHRcdFthMSwgYTIsIGEzXSA9IGFyZ3M7XG5cblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRldjtcblxuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAxOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDI6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDM6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG59XG5cbnRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSB7XG5cdGluZm86IHt9LFxuXHRuYW1lOiBudWxsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy90cmlnZ2Vyb25lLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVQcm9wKG9iamVjdCwga2V5KSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gZG8gbm90aGluZ1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGlmICghZGVmLnByb3BzW2tleV0pIHtcblx0XHRjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzW2tleV0gPSB7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdGJpbmRpbmdzOiBudWxsXG5cdFx0fTtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLmdldHRlciA/IHByb3BEZWYuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHByb3BEZWYudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0KHYpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BEZWYuc2V0dGVyID8gcHJvcERlZi5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogc2V0KG9iamVjdCwga2V5LCB2LCB7XG5cdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5cbi8qZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0Y29yZS5fZGVmaW5lU3BlY2lhbCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5LCBub0FjY2Vzc29ycykge1xuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcgfHwgIW1hcC5oYXMob2JqZWN0KSkgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdFx0c3BlY2lhbFByb3BzID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV07XG5cblx0XHRpZiAoIXNwZWNpYWxQcm9wcykge1xuXHRcdFx0c3BlY2lhbFByb3BzID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0gPSB7XG5cdFx0XHRcdCRub2RlczogY29yZS4kKCksXG5cdFx0XHRcdHZhbHVlOiBvYmplY3Rba2V5XSxcblx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRcdG1lZGlhdG9yOiBudWxsXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIW5vQWNjZXNzb3JzICYmIGtleSAhPSAnc2FuZGJveCcpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzcGVjaWFsUHJvcHMuZ2V0dGVyID8gc3BlY2lhbFByb3BzLmdldHRlci5jYWxsKG9iamVjdCkgOiBzcGVjaWFsUHJvcHMudmFsdWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHYpIHtcblx0XHRcdFx0XHRcdHNwZWNpYWxQcm9wcy5zZXR0ZXIgPyBzcGVjaWFsUHJvcHMuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IGNvcmUuc2V0KG9iamVjdCwga2V5LCB2LCB7XG5cdFx0XHRcdFx0XHRcdGZyb21TZXR0ZXI6IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNwZWNpYWxQcm9wcztcblx0fTtcbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZmluZXByb3AuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IHsgcHJvcHMsIGV2ZW50cyB9ID0gZGVmLFxuXHRcdHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG5cdGlmICghcHJvcERlZikge1xuXHRcdG9iamVjdFtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG5cblx0Ly8gVE9ETyBOT1QgUkVRVUlSRURcblx0ZXZ0ID0gbm9mbi5hc3NpZ24oZXZ0LCB7XG5cdFx0dmFsdWUsXG5cdFx0a2V5LFxuXHRcdHByZXZpb3VzVmFsdWVcblx0fSk7XG5cblx0cHJvcERlZi52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmIChwcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuXHRcdGlmIChldmVudHNbYGNoYW5nZToke2tleX1gXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGBjaGFuZ2U6JHtrZXl9YCwgZXZ0KTtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBldnQpO1xuXHRcdH1cblxuXHRcdGlmIChldmVudHMuY2hhbmdlKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ2NoYW5nZScsIGV2dCk7XG5cdFx0fVxuXHR9XG59XG5cbi8qZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIHNldDtcblxuXHRjb3JlLmdldCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5KSB7XG5cdFx0cmV0dXJuIG9iamVjdCAmJiBvYmplY3Rba2V5XTtcblx0fTtcblxuXHQvLyBzZXQgbWV0aG9kIGlzIHRoZSBtb3N0IG9mdGVuIHVzZWQgbWV0aG9kXG5cdC8vIHdlIG5lZWQgdG8gb3B0aW1pemUgaXQgYXMgZ29vZCBhcyBwb3NzaWJsZVxuXHRzZXQgPSBjb3JlLnNldCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2LCBldnQpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIHR5cGUgPSB0eXBlb2Yga2V5LFxuXHRcdFx0X2lzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpO1xuXHRcdFx0fSxcblx0XHRcdG9iamVjdERhdGEsXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0ZXZlbnRzLFxuXHRcdFx0cHJldlZhbCxcblx0XHRcdG5ld1YsXG5cdFx0XHRpLFxuXHRcdFx0X2V2dCxcblx0XHRcdGlzQ2hhbmdlZCxcblx0XHRcdHRyaWdnZXJDaGFuZ2U7XG5cblx0XHRpZiAodHlwZSA9PSAndW5kZWZpbmVkJykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGlmICh0eXBlID09ICdvYmplY3QnKSB7XG5cdFx0XHRmb3IgKGkgaW4ga2V5KSB7XG5cdFx0XHRcdGlmIChrZXkuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRzZXQob2JqZWN0LCBpLCBrZXlbaV0sIHYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0fVxuXG5cdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KTtcblxuXHRcdGlmICghb2JqZWN0RGF0YSB8fCAhb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0pIHtcblx0XHRcdG9iamVjdFtrZXldID0gdjtcblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0fVxuXG5cdFx0c3BlY2lhbCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldO1xuXHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzO1xuXG5cdFx0cHJldlZhbCA9IHNwZWNpYWwudmFsdWU7XG5cblx0XHRpZiAoc3BlY2lhbC5tZWRpYXRvciAmJiB2ICE9PSBwcmV2VmFsICYmICghZXZ0IHx8ICFldnQuc2tpcE1lZGlhdG9yICYmICFldnQuZnJvbU1lZGlhdG9yKSkge1xuXHRcdFx0bmV3ViA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdWID0gdjtcblx0XHR9XG5cblx0XHRpc0NoYW5nZWQgPSBuZXdWICE9PSBwcmV2VmFsO1xuXG5cdFx0X2V2dCA9IHtcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2dCxcblx0XHRcdHZhbHVlOiBuZXdWLFxuXHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldlZhbCxcblx0XHRcdGtleToga2V5LFxuXHRcdFx0bm9kZTogc3BlY2lhbC4kbm9kZXNbMF0gfHwgbnVsbCxcblx0XHRcdCRub2Rlczogc3BlY2lhbC4kbm9kZXMsXG5cdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRpc0NoYW5nZWQ6IGlzQ2hhbmdlZFxuXHRcdH07XG5cblx0XHRpZiAoZXZ0ICYmIHR5cGVvZiBldnQgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IF9ldnRbaV0gfHwgZXZ0W2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IF9ldnQuZm9yY2UpICYmICFfZXZ0LnNpbGVudDtcblxuXHRcdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0XHRldmVudHNbJ2JlZm9yZWNoYW5nZTonICsga2V5XSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiZWZvcmVjaGFuZ2U6JyArIGtleSwgX2V2dCk7XG5cblx0XHRcdGV2ZW50cy5iZWZvcmVjaGFuZ2UgJiYgY29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmVmb3JlY2hhbmdlJywgX2V2dCk7XG5cdFx0fVxuXG5cdFx0c3BlY2lhbC52YWx1ZSA9IG5ld1Y7XG5cblx0XHRpZiAoaXNDaGFuZ2VkIHx8IF9ldnQuZm9yY2UgfHwgX2V2dC5mb3JjZUhUTUwgfHwgbmV3ViAhPT0gdiAmJiAhX2lzTmFOKG5ld1YpKSB7XG5cdFx0XHRpZiAoIV9ldnQuc2lsZW50SFRNTCkge1xuXHRcdFx0XHRldmVudHNbJ19ydW5iaW5kaW5nczonICsga2V5XSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdfcnVuYmluZGluZ3M6JyArIGtleSwgX2V2dCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRyaWdnZXJDaGFuZ2UpIHtcblx0XHRcdGV2ZW50c1snY2hhbmdlOicgKyBrZXldICYmIGNvcmUuX2Zhc3RUcmlnZ2VyKG9iamVjdCwgJ2NoYW5nZTonICsga2V5LCBfZXZ0KTtcblxuXHRcdFx0ZXZlbnRzLmNoYW5nZSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdjaGFuZ2UnLCBfZXZ0KTtcblx0XHR9XG5cblx0XHRpZiAoKGlzQ2hhbmdlZCB8fCBfZXZ0LmZvcmNlKSAmJiAhX2V2dC5za2lwTGlua3MpIHtcblx0XHRcdGV2ZW50c1snX3J1bmRlcGVuZGVuY2llczonICsga2V5XSAmJlxuXHRcdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdfcnVuZGVwZW5kZW5jaWVzOicgKyBrZXksIF9ldnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH07XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL3JlbW92ZWxpc3RlbmVyJztcbi8vIFJFRkFDVE9SLCBET05UIFRSSUdHRVIgQURERVZFTlQsIFJFTU9WRUVWRU5UXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gcmVtb3ZlIGxpc3RlbmVyXG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdLFxuXHRcdFx0ZXZlbnRzID0gYWxsRXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRjb25zdCByZXRhaW4gPSBbXTtcblx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcblx0XHRcdFx0aWYgKGV2ZW50LmluZm8ucGF0aFN0ciAhPT0gcGF0aFN0cikge1xuXHRcdFx0XHRcdHJldGFpbi5wdXNoKGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXRhaW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGFsbEV2ZW50c1tgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YF0gPSByZXRhaW47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgYWxsRXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qXG5kZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX3VuZGVsZWdhdGVMaXN0ZW5lciA9IGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lciA9XG5cdCBmdW5jdGlvbihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdHAgPSBwYXRoLFxuXHRcdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV2ZW50cyxcblx0XHRcdGk7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0aWYgKGZpcnN0S2V5KSB7XG5cdFx0XHRpZiAoZmlyc3RLZXkgPT0gJyonKSB7XG5cdFx0XHRcdGlmIChvYmplY3QuaXNNS0FycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2FkZCcsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHMuYWRkIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChvYmplY3QuaXNNS09iamVjdCkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmNoYW5nZSB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblx0XHRcdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2NoYW5nZScsIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtICYmIF91bmRlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHNbJ2NoYW5nZTonICsgZmlyc3RLZXldIHx8IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Ygb2JqZWN0W2ZpcnN0S2V5XSA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2ZpcnN0S2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmLFxuXHRcdGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXSxcblx0XHRyZXRhaW4gPSBbXTtcblxuXHQvLyBpZiBhbGwgZXZlbnRzIG5lZWQgdG8gYmUgcmVtb3ZlZFxuXHRpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKCFpbmZvIHx8ICFpbmZvLm5vVHJpZ2dlcikge1xuXHRcdFx0bm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG5cdFx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcblx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdFx0Y29udGV4dDogZXZ0LmNvbnRleHRcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIHJlc3RvcmUgZGVmYXVsdCB2YWx1ZSBvZiBcImV2ZW50c1wiXG5cdFx0ZGVmLmV2ZW50cyA9IHt9O1xuXHR9IGVsc2UgaWYgKGV2ZW50cykgeyAvLyBpZiBldmVudHMgd2l0aCBnaXZlbiBuYW1lIGlzIGZvdW5kXG5cdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcblx0XHRcdGlmIChjYWxsYmFjayAmJiAoY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjayAmJiBjYWxsYmFjay5fY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjaylcblx0XHRcdFx0fHwgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZ0LmNvbnRleHQpKSB7XG5cdFx0XHRcdC8vIGtlZXAgZXZlbnRcblx0XHRcdFx0cmV0YWluLnB1c2goZXZ0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGV2dC5jb250ZXh0XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKCFpbmZvIHx8ICFpbmZvLm5vVHJpZ2dlcikge1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgbmVzdGVkIG9iamVjdCBiYXNlZCBvbiBwYXRoIGFuZCBsYXN0VmFsdWVcbi8vIGV4YW1wbGU6IG1ha2VPYmplY3QoJ2EuYi5jJywgNDIpIC0+IHthOiB7Yjoge2M7IDQyfX19XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlT2JqZWN0KHBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcblx0cGF0aCA9IHBhdGggPyBwYXRoLnNwbGl0KCcuJykgOiBbXTtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGxldCBvYmogPSByZXN1bHQsXG5cdFx0a2V5O1xuXG5cblx0d2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdGtleSA9IHBhdGguc2hpZnQoKTtcblx0XHRvYmogPSBvYmpba2V5XSA9IHt9O1xuXHR9XG5cblx0b2JqW3BhdGguc2hpZnQoKV0gPSBsYXN0VmFsdWU7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdC8qZXNsaW50LWRpc2FibGUgKi9cblx0eGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy54JywgMik7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRvYmouYS5iID0ge1xuXHRcdFx0Yzoge1xuXHRcdFx0XHR4OiAyXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIuYyA9IHtcblx0XHRcdHg6IDJcblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aSA9IDA7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWUxMCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU5KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTgpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU3KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTUpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTQpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTMpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTIpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTEpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTApO1xuXHRcdG9iai5hID0ge1xuXHRcdFx0Yjoge1xuXHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0eDogMlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRleHBlY3QoaSkudG9FcXVhbCgxMTExMTExMTExMTEpO1xuXHR9KTtcblxuXHR4aXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5hLmIgPSBudWxsO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblx0Lyplc2xpbnQtZW5hYmxlICovXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBvYmosXG5cdFx0Y3R4LFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0Y3R4ID0ge307XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgaSA9IDA7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUyKSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBhcmdzKScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmopO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdyZW1vdmVzIGJ5IGhvd1RvUmVtb3ZlIChub3QgZG9jdW1lbnRlZCBjb3JlIGZlYXR1cmUpJywgKCkgPT4ge1xuXHRcdC8qZXNsaW50LWRpc2FibGUgKi9cblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlLFxuXHRcdFx0b25EYXRhID0ge1xuXHRcdFx0XHRob3dUb1JlbW92ZShvbkRhdGEsIG9mZkRhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2ZmRGF0YS54ID09PSA0Mjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDEnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQzXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDInKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHRcdC8qZXNsaW50LWVuYWJsZSAqL1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG5cbnhkZXNjcmliZShcIkV2ZW50cyBjb3JlOiBfYWRkRE9NTGlzdGVuZXIsIF9yZW1vdmVET01MaXN0ZW5lclwiLCAoKSA9PiB7XG5cdGxldCBxID0gKHMsIGMpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cdFx0XHRcdGV2LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFx0XHR0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG5cdFx0XHRcdFx0d2luZG93LCBudWxsLFxuXHRcdFx0XHRcdDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cblx0XHRcdFx0XHQwIC8qbGVmdCovICwgbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG5cdFx0dGFnTmFtZTogJ0RJVicsXG5cdFx0aWQ6ICdkLXRlc3QnLFxuXHRcdGlubmVySFRNTDogYFxuXHRcdFx0PGRpdiBpZD1cImQtdGVzdC0xXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YFxuXHR9KSk7XG5cblxuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSBhbmQgcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3IgKGJ1YmJsaW5nIHRlc3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQgYW5kIGRvZXNuXFwndCByZW1vdmUgZXZlbnRzIGZyb20gb3RoZXIgbm9kZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb2ZmKScsICgpID0+IHtcblx0bGV0IHEgPSAocywgYykgPT4ge1xuXHRcdGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG5cdFx0XHRcdGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblx0XHRcdFx0ZXYuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0XCJjbGlja1wiLFxuXHRcdFx0XHRcdHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcblx0XHRcdFx0XHR3aW5kb3csIG51bGwsXG5cdFx0XHRcdFx0MCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuXHRcdFx0XHRcdDAgLypsZWZ0Ki8gLCBudWxsXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcblx0XHR0YWdOYW1lOiAnRElWJyxcblx0XHRpZDogJ3MtdGVzdCcsXG5cdFx0aW5uZXJIVE1MOiBgXG5cdFx0XHQ8ZGl2IGlkPVwicy10ZXN0LTFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgXG5cdH0pKTtcblxuXHRub2RlLmNsaWNrID0gbm9kZS5jbGljayB8fCBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuXHR9XG5cblx0aXQoJ2ZpcmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRib29sID0gZmFsc2U7XG5cdFx0bWsub24oJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtay5vbignc29tZWV2ZW50JywgZik7XG5cdFx0bWsub2ZmKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHt9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbmNlXCInLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRqID0gMCxcblx0XHRcdGYxID0gZXZ0ID0+IGkrKyxcblx0XHRcdGYyID0gZXZ0ID0+IGorKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdGV4cGVjdChqKS50b0JlKDEpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1rLm9uY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdH0pO1xuXG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCAyMDApO1xuXG5cdFx0bWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbkRlYm91bmNlXCInLCAoZG9uZSkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRmMSA9IGV2dCA9PiBpKyssXG5cdFx0XHRmMiA9IGV2dCA9PiBqKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZXhwZWN0KGopLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgMjAwKTtcblxuXHRcdG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0fSk7XG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgODAwKTtcblxuXHRcdG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHR9KTtcblxuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMCxcblx0XHRcdGhhbmRsZXJzID0ge1xuXHRcdFx0XHRmb286ICgpID0+IGkrKyxcblx0XHRcdFx0YmFyOiAoKSA9PiBpKytcblx0XHRcdH07XG5cblx0XHRNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuXHRcdE1LLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0TUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXG5cdFx0TUsub2ZmKG9iaiwgaGFuZGxlcnMpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG5cblx0aXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHR0aGlzQXJnID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMDtcblxuXHRcdE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG5cdFx0XHRpKys7XG5cdFx0fSwgdHJ1ZSwgdGhpc0FyZyk7XG5cblx0XHRNSy5vbihvYmosICdiYXInLCBmdW5jdGlvbigpIHtcblx0XHRcdGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuXHRcdFx0aSsrO1xuXHRcdH0sIHRoaXNBcmcsIHRydWUpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1wiOiA0NSxcblx0XCIuL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1wiOiA0Nixcblx0XCIuL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXCI6IDQ3LFxuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiAzNSxcblx0XCIuL19jb3JlL2RlZnMuanNcIjogMzMsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDMyLFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiA0OCxcblx0XCIuL19kb20vaW5kZXguanNcIjogNDksXG5cdFwiLi9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXCI6IDMxLFxuXHRcIi4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDMwLFxuXHRcIi4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1wiOiAzOCxcblx0XCIuL19ldmVudHMvdHJpZ2dlcm9uZS5qc1wiOiAzNCxcblx0XCIuL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDM3LFxuXHRcIi4vYXJyYXkuanNcIjogNTAsXG5cdFwiLi9iaW5kZXJzLmpzXCI6IDUxLFxuXHRcIi4vYmluZG5vZGUuanNcIjogNTIsXG5cdFwiLi9icXVlcnkvX2RhdGEuanNcIjogMTEsXG5cdFwiLi9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcIjogNSxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiA0LFxuXHRcIi4vYnF1ZXJ5L2FkZC5qc1wiOiAxNCxcblx0XCIuL2JxdWVyeS9jcmVhdGUuanNcIjogOSxcblx0XCIuL2JxdWVyeS9maW5kLmpzXCI6IDE2LFxuXHRcIi4vYnF1ZXJ5L2luZGV4LmpzXCI6IDMsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMTIsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDE1LFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAxMyxcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAxMCxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogOCxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWwuanNcIjogNyxcblx0XCIuL2NsYXNzLmpzXCI6IDI3LFxuXHRcIi4vZXh0ZW5kLmpzXCI6IDYsXG5cdFwiLi9nZXQuanNcIjogNTMsXG5cdFwiLi9pbmRleC5qc1wiOiA1NCxcblx0XCIuL21hZ2ljLmpzXCI6IDU3LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDU1LFxuXHRcIi4vb2JqZWN0LmpzXCI6IDU2LFxuXHRcIi4vb24uanNcIjogNTgsXG5cdFwiLi9zZXQuanNcIjogMzZcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNDQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBsb29rRm9yQmluZGVyIGZyb20gJy4vbG9va2ZvcmJpbmRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTaW5nbGVOb2RlKG9iamVjdCwga2V5LCBub2RlLCBnaXZlbkJpbmRlciA9IHt9LCBldnQgPSB7fSkge1xuICAgIGNvbnN0IHsgYXNzaWduRGVmYXVsdFZhbHVlIH0gPSBldnQ7XG4gICAgbGV0IGlzVW5kZWZpbmVkID0gdHlwZW9mIHNwZWNpYWwudmFsdWUgPT0gJ3VuZGVmaW5lZCc7XG5cbiAgICBsZXQgYmluZGVyO1xuXG4gICAgaWYgKGdpdmVuQmluZGVyICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuICAgICAgICBpZiAoZm91bmRCaW5kZXIpIHtcbiAgICAgICAgICAgIGlmIChnaXZlbkJpbmRlcikge1xuICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKGZvdW5kQmluZGVyLCBnaXZlbkJpbmRlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJpbmRlciA9IGZvdW5kQmluZGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmluZGVyID0gZ2l2ZW5CaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IGdldFZhbHVlLCBzZXRWYWx1ZSwgb24sIGluaXRpYWxpemUgfSA9IGJpbmRlcjtcblxuICAgIC8qIFRPRE8gaWYgKGJpbmRlci5pbml0aWFsaXplKSB7IC4uLiB9Ki9cblxuICAgIGlmIChnZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBhc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG5cbiAgICAgICAgX2V2dCA9IHtcbiAgICAgICAgICAgIGZyb21Ob2RlOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChpIGluIGV2dCkge1xuICAgICAgICAgICAgX2V2dFtpXSA9IGV2dFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbCA9IF9iaW5kZXIuZ2V0VmFsdWUuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICAgICAgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIGNvcmUuc2V0KG9iamVjdCwga2V5LCB2YWwsIF9ldnQpO1xuICAgIH1cbn1cbi8qXG5mdW5jdGlvbiBpbml0QmluZGluZyhvYmplY3QsIG9iamVjdERhdGEsIGtleSwgJG5vZGVzLCBpbmRleCwgYmluZGVyLCBldnQsIHNwZWNpYWwpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHNlbGY6IG9iamVjdCxcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgJG5vZGVzOiAkbm9kZXMsXG4gICAgICAgICAgICBub2RlOiBub2RlXG4gICAgICAgIH0sXG4gICAgICAgIG5vZGUgPSAkbm9kZXNbaW5kZXhdLFxuICAgICAgICBpc1VuZGVmaW5lZCA9IHR5cGVvZiBzcGVjaWFsLnZhbHVlID09ICd1bmRlZmluZWQnLFxuICAgICAgICBfYmluZGVyLFxuICAgICAgICBfZXZ0LFxuICAgICAgICBmb3VuZEJpbmRlcixcbiAgICAgICAgX29wdGlvbnMsXG4gICAgICAgIGksXG4gICAgICAgIGRvbUV2dCxcbiAgICAgICAgbWtIYW5kbGVyLFxuICAgICAgICB2YWw7XG5cblxuXG5cbiAgICBpZiAoYmluZGVyID09PSBudWxsKSB7XG4gICAgICAgIF9iaW5kZXIgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cbiAgICAgICAgaWYgKGZvdW5kQmluZGVyKSB7XG4gICAgICAgICAgICBpZiAoYmluZGVyKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpIGluIGJpbmRlcikge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9iaW5kZXIgPSBmb3VuZEJpbmRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9iaW5kZXIgPSBiaW5kZXIgfHwge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoX2JpbmRlci5pbml0aWFsaXplKSB7XG4gICAgICAgIF9vcHRpb25zID0ge1xuICAgICAgICAgICAgdmFsdWU6IHNwZWNpYWwudmFsdWVcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcbiAgICAgICAgfVxuICAgICAgICBfYmluZGVyLmluaXRpYWxpemUuY2FsbChub2RlLCBfb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKF9iaW5kZXIuZ2V0VmFsdWUgJiYgKGlzVW5kZWZpbmVkICYmIGV2dC5hc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGV2dC5hc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG5cbiAgICAgICAgX2V2dCA9IHtcbiAgICAgICAgICAgIGZyb21Ob2RlOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChpIGluIGV2dCkge1xuICAgICAgICAgICAgX2V2dFtpXSA9IGV2dFtpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbCA9IF9iaW5kZXIuZ2V0VmFsdWUuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICAgICAgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIGNvcmUuc2V0KG9iamVjdCwga2V5LCB2YWwsIF9ldnQpO1xuICAgIH1cblxuXG4gICAgaWYgKF9iaW5kZXIuc2V0VmFsdWUpIHtcbiAgICAgICAgbWtIYW5kbGVyID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgdmFyIHYgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XS52YWx1ZSxcbiAgICAgICAgICAgICAgICAvLyBkaXJ0eSBoYWNrIGZvciB0aGlzIG9uZSBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuICAgICAgICAgICAgICAgIF92ID0gZXZ0ICYmIHR5cGVvZiBldnQub25DaGFuZ2VWYWx1ZSA9PSAnc3RyaW5nJyAmJiB0eXBlb2YgdiA9PSAnbnVtYmVyJyA/IHYgKyAnJyA6IHYsXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgaWYgKGV2dCAmJiBldnQuY2hhbmdlZE5vZGUgPT0gbm9kZSAmJiBldnQub25DaGFuZ2VWYWx1ZSA9PSBfdikgcmV0dXJuO1xuXG4gICAgICAgICAgICBfb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdlxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yIChpIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9iaW5kZXIuc2V0VmFsdWUuY2FsbChub2RlLCB2LCBfb3B0aW9ucyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYoZXZ0LmRlYm91bmNlKSB7XG4gICAgICAgICAgICBta0hhbmRsZXIgPSB1dGlsLmRlYm91bmNlKG1rSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBjb3JlLl9mYXN0QWRkTGlzdGVuZXIob2JqZWN0LCAnX3J1bmJpbmRpbmdzOicgKyBrZXksIG1rSGFuZGxlciwgbnVsbCwge25vZGU6IG5vZGV9KTtcblxuICAgICAgICAhaXNVbmRlZmluZWQgJiYgbWtIYW5kbGVyKCk7XG4gICAgfVxuXG5cblxuXG4gICAgaWYgKF9iaW5kZXIuZ2V0VmFsdWUgJiYgX2JpbmRlci5vbikge1xuICAgICAgICBkb21FdnQgPSB7XG4gICAgICAgICAgICBub2RlOiBub2RlLFxuICAgICAgICAgICAgb246IF9iaW5kZXIub24sXG4gICAgICAgICAgICBpbnN0YW5jZTogb2JqZWN0LFxuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBta0hhbmRsZXI6IG1rSGFuZGxlcixcbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBvbGR2YWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgaixcbiAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb2xkdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21FdmVudDogZXZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWNoOiBldnQud2hpY2gsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGV2dC50YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAgICAgLy8gaGFzT3duUHJvcGVydHkgaXMgbm90IHJlcXVpcmVkIHRoZXJlXG4gICAgICAgICAgICAgICAgZm9yIChqIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgX29wdGlvbnNbal0gPSBvcHRpb25zW2pdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhbHVlID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gb2xkdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29yZS5zZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2VWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvcmUuZG9tRXZlbnRzLmFkZChkb21FdnQpO1xuICAgIH1cbn0qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgW25vZGUgPT4ge1xuICAgIHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lLFxuICAgICAgICBiaW5kZXJzID0gY29yZS5iaW5kZXJzLFxuICAgICAgICBiO1xuXG4gICAgaWYgKHRhZ05hbWUgPT0gJ0lOUFVUJykge1xuICAgICAgICBiID0gYmluZGVycy5pbnB1dChub2RlLnR5cGUpO1xuICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLnRleHRhcmVhKCk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09ICdTRUxFQ1QnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLnNlbGVjdChub2RlLm11bHRpcGxlKTtcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1BST0dSRVNTJykge1xuICAgICAgICBiID0gYmluZGVycy5wcm9ncmVzcygpO1xuICAgIH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnT1VUUFVUJykge1xuICAgICAgICBiID0gYmluZGVycy5vdXRwdXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYjtcbn1dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHRCaW5kZXJzIGZyb20gJy4vZGVmYXVsdGJpbmRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIHJlc3VsdCxcbiAgICAgICAgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBkZWZhdWx0QmluZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocmVzdWx0ID0gZGVmYXVsdEJpbmRlcnNbaV0uY2FsbChub2RlLCBub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXG4gKiovIiwiLypnbG9iYWwgJCovXG5pbXBvcnQgYlF1ZXJ5IGZyb20gJy4uL2JxdWVyeSc7XG5cbmNvbnN0IG5lZWRlZE1ldGhvZHMgPSAnb24gb2ZmIGlzIGFkZCBub3QgZmluZCcuc3BsaXQoL1xccy8pO1xuXG5jb25zdCBnbG9iYWxEb2xsYXIgPSB0eXBlb2YgJCA9PT0gJ2Z1bmN0aW9uJyA/ICQgOiBudWxsO1xubGV0IHVzZUdsb2JhbERvbGxhciA9IHRydWU7XG5cbmlmIChnbG9iYWxEb2xsYXIpIHtcblx0Y29uc3QgZm4gPSBnbG9iYWxEb2xsYXIuZm4gfHwgZ2xvYmFsRG9sbGFyLnByb3RvdHlwZTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKCFmbltuZWVkZWRNZXRob2RzW2ldXSkge1xuXHRcdFx0dXNlR2xvYmFsRG9sbGFyID0gZmFsc2U7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcblx0XHRnbG9iYWxEb2xsYXIucGFyc2VIVE1MID0gYlF1ZXJ5LnBhcnNlSFRNTDtcblx0fVxufSBlbHNlIHtcblx0dXNlR2xvYmFsRG9sbGFyID0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUdsb2JhbERvbGxhciA/IGdsb2JhbERvbGxhciA6IGJRdWVyeTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdERvbGxhciBmcm9tICcuL2RlZmF1bHQtZG9sbGFyJztcblxuY29uc3QgZG9tID0ge1xuXHQkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FycmF5LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMuanNcbiAqKi8iLCIvLyBEZWJvdW5jZWQhXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4vX2NvcmUvaW5pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2dCwgb3B0aW9uYWwpIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbn1cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS9pbml0bWsnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3V0aWwvY29tbW9uJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwLCBpbml0TUssIHV0aWwpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBkZWZhdWx0QmluZGVycywgbG9va0ZvckJpbmRlcjtcblxuXHRkZWZhdWx0QmluZGVycyA9IGNvcmUuZGVmYXVsdEJpbmRlcnMgPSBbZnVuY3Rpb24obm9kZSkge1xuXHRcdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lLFxuXHRcdFx0YmluZGVycyA9IGNvcmUuYmluZGVycyxcblx0XHRcdGI7XG5cblx0XHRpZiAodGFnTmFtZSA9PSAnSU5QVVQnKSB7XG5cdFx0XHRiID0gYmluZGVycy5pbnB1dChub2RlLnR5cGUpO1xuXHRcdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnVEVYVEFSRUEnKSB7XG5cdFx0XHRiID0gYmluZGVycy50ZXh0YXJlYSgpO1xuXHRcdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnU0VMRUNUJykge1xuXHRcdFx0YiA9IGJpbmRlcnMuc2VsZWN0KG5vZGUubXVsdGlwbGUpO1xuXHRcdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnUFJPR1JFU1MnKSB7XG5cdFx0XHRiID0gYmluZGVycy5wcm9ncmVzcygpO1xuXHRcdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnT1VUUFVUJykge1xuXHRcdFx0YiA9IGJpbmRlcnMub3V0cHV0KCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGI7XG5cdH1dO1xuXG5cdGxvb2tGb3JCaW5kZXIgPSBjb3JlLmxvb2tGb3JCaW5kZXIgPSBmdW5jdGlvbihub2RlKSB7XG5cdFx0dmFyIHJlc3VsdCxcblx0XHRcdGVwID0gZGVmYXVsdEJpbmRlcnMsXG5cdFx0XHRpO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGVwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAocmVzdWx0ID0gZXBbaV0uY2FsbChub2RlLCBub2RlKSkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXG5cdGNvcmUuYmluZE9wdGlvbmFsTm9kZSA9IGZ1bmN0aW9uKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2dCkge1xuXHRcdGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG5cdFx0XHQvKlxuXHRcdFx0ICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdFx0ICpcblx0XHRcdGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIHRydWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRiaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZSwgYmluZGVyLCBldnQsIHRydWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH07XG5cblx0dmFyIGJpbmRTYW5kYm94ID0gY29yZS5iaW5kU2FuZGJveCA9IGZ1bmN0aW9uKG9iamVjdCwgbm9kZSwgZXZ0KSB7XG5cdFx0dmFyICRub2RlcyA9IGNvcmUuJChub2RlKSxcblx0XHRcdF9ldnQsXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0aTtcblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cdFx0aWYgKCEkbm9kZXMubGVuZ3RoKSB7XG5cdFx0XHR0aHJvdyBFcnJvcignQmluZGluZyBlcnJvcjogbm9kZSBpcyBtaXNzaW5nIGZvciBcInNhbmRib3hcIi4nICsgKHR5cGVvZiBub2RlID09ICdzdHJpbmcnID8gJyBUaGUgc2VsZWN0b3IgaXMgXCInICsgbm9kZSArICdcIicgOiAnJykpO1xuXHRcdH1cblxuXHRcdHNwZWNpYWwgPSBjb3JlLl9kZWZpbmVTcGVjaWFsKG9iamVjdCwgJ3NhbmRib3gnKTtcblxuXHRcdHNwZWNpYWwuJG5vZGVzID0gc3BlY2lhbC4kbm9kZXMubGVuZ3RoID8gc3BlY2lhbC4kbm9kZXMuYWRkKCRub2RlcykgOiAkbm9kZXM7XG5cblx0XHRpZiAob2JqZWN0LmlzTUspIHtcblx0XHRcdG9iamVjdC4kc2FuZGJveCA9ICRub2Rlcztcblx0XHRcdG9iamVjdC5zYW5kYm94ID0gJG5vZGVzWzBdO1xuXHRcdFx0b2JqZWN0LiRub2Rlcy5zYW5kYm94ID0gc3BlY2lhbC4kbm9kZXM7XG5cdFx0XHRvYmplY3Qubm9kZXMuc2FuZGJveCA9IHNwZWNpYWwuJG5vZGVzWzBdO1xuXHRcdH1cblxuXHRcdGlmICghZXZ0IHx8ICFldnQuc2lsZW50KSB7XG5cdFx0XHRfZXZ0ID0ge1xuXHRcdFx0XHRrZXk6ICdzYW5kYm94Jyxcblx0XHRcdFx0JG5vZGVzOiAkbm9kZXMsXG5cdFx0XHRcdG5vZGU6ICRub2Rlc1swXSB8fCBudWxsXG5cdFx0XHR9O1xuXG5cdFx0XHRpZihldnQpIHtcblx0XHRcdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0XHRcdF9ldnRbaV0gPSBldnRbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmluZDpzYW5kYm94JywgX2V2dCk7XG5cdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kJywgX2V2dCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fTtcblxuXHR2YXIgYmluZE5vZGUgPSBjb3JlLmJpbmROb2RlID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZ0LCBvcHRpb25hbCkge1xuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKlxuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHRpZihrZXkgPT0gJ3NhbmRib3gnKSB7XG5cdFx0XHRyZXR1cm4gYmluZFNhbmRib3gob2JqZWN0LCBub2RlLCBldnQsIG9wdGlvbmFsKTtcblx0XHR9XG5cblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBudWxsLFxuXHRcdFx0JG5vZGVzLFxuXHRcdFx0a2V5cyxcblx0XHRcdGksXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0cGF0aCxcblx0XHRcdGxpc3RlbktleSxcblx0XHRcdGNoYW5nZUhhbmRsZXIsXG5cdFx0XHRfZXZ0O1xuXG5cdFx0Lypcblx0XHQgKiB0aGlzLmJpbmROb2RlKFtbJ2tleScsICQoKSwge29uOidldnQnfV0sIFt7a2V5OiAkKCksIHtvbjogJ2V2dCd9fV1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcblx0XHQgKlxuXHRcdGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRiaW5kTm9kZShvYmplY3QsIGtleVtpXVswXSwga2V5W2ldWzFdLCBrZXlbaV1bMl0gfHwgZXZ0LCBub2RlKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleTEga2V5MicsIG5vZGUsIGJpbmRlciwgeyBzaWxlbnQ6IHRydWUgfSk7XG5cdFx0ICpcblx0XHRpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJyAmJiB+a2V5LmluZGV4T2YoJyAnKSkge1xuXHRcdFx0a2V5cyA9IGtleS5zcGxpdCgvXFxzKy8pO1xuXHRcdFx0aWYgKGtleXMubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwga2V5c1tpXSwgbm9kZSwgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb2JqZWN0O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8qXG5cdFx0ICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0aWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBrZXkpIHtcblx0XHRcdFx0aWYgKGtleS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGJpbmROb2RlKG9iamVjdCwgaSwga2V5W2ldLCBub2RlLCBiaW5kZXIsIGV2dCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIHRoaXMuYmluZE5vZGUoJ2tleScsIFsgbm9kZSwgYmluZGVyIF0sIHsgc2lsZW50OiB0cnVlIH0pO1xuXHRcdCAqXG5cdFx0Ly8gbm9kZSAhPT0gd2luIGlzIHRoZSBtb3N0IHVuY29tbW9uIGJ1Z2ZpeCBldmVyLiBEb24ndCBhc2sgd2hhdCBkb2VzIGl0IG1lYW4uXG5cdFx0Ly8gVGhpcyBpcyBhYm91dCBpZnJhbWVzLCBDT1JTIGFuZCBkZXByZWNhdGVkIERPTSBBUEkuXG5cdFx0aWYgKG5vZGUgJiYgbm9kZS5sZW5ndGggPT0gMiAmJiBub2RlICE9PSB3aW4gJiYgIW5vZGVbMV0ubm9kZU5hbWVcblx0XHRcdFx0JiYgKG5vZGVbMV0uc2V0VmFsdWUgfHwgbm9kZVsxXS5nZXRWYWx1ZSkpIHtcblx0XHRcdHJldHVybiBiaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZVswXSwgbm9kZVsxXSwgYmluZGVyLCBvcHRpb25hbCk7XG5cdFx0fVxuXG5cdFx0JG5vZGVzID0gY29yZS5fZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuXHRcdGlmICghJG5vZGVzLmxlbmd0aCkge1xuXHRcdFx0aWYgKG9wdGlvbmFsKSB7XG5cdFx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aHJvdyBFcnJvcignQmluZGluZyBlcnJvcjogbm9kZSBpcyBtaXNzaW5nIGZvciBcIicgKyBrZXkgKyAnXCIuJyArICh0eXBlb2Ygbm9kZSA9PSAnc3RyaW5nJyA/ICcgVGhlIHNlbGVjdG9yIGlzIFwiJyArIG5vZGUgKyAnXCInIDogJycpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoKCFldnQgfHwgZXZ0LmRlZXAgIT09IGZhbHNlKSAmJiB+a2V5LmluZGV4T2YoJy4nKSkge1xuXHRcdFx0cGF0aCA9IGtleS5zcGxpdCgnLicpO1xuXHRcdFx0Y2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRldnQgPSBldnQgJiYgZXZ0Lm9yaWdpbmFsRXZlbnQ7XG5cblx0XHRcdFx0dmFyIHRhcmdldCA9IGV2dCAmJiBldnQudmFsdWUsXG5cdFx0XHRcdFx0aTtcblx0XHRcdFx0aWYgKCF0YXJnZXQpIHtcblx0XHRcdFx0XHR0YXJnZXQgPSBvYmplY3Q7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHBhdGgubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHR0YXJnZXQgPSB0YXJnZXRbcGF0aFtpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmluZE5vZGUodGFyZ2V0LCBwYXRoW3BhdGgubGVuZ3RoIC0gMV0sICRub2RlcywgYmluZGVyLCBldnQsIG9wdGlvbmFsKTtcblxuXG5cdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUpIHtcblx0XHRcdFx0XHRjb3JlLnVuYmluZE5vZGUoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSwgJG5vZGVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5fZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGguc2xpY2UoMCwgcGF0aC5sZW5ndGggLSAyKS5qb2luKCcuJyksXG5cdFx0XHRcdCdjaGFuZ2U6JyArIHBhdGhbcGF0aC5sZW5ndGggLSAyXSwgY2hhbmdlSGFuZGxlcik7XG5cblx0XHRcdGNoYW5nZUhhbmRsZXIoKTtcblxuXHRcdFx0cmV0dXJuIG9iamVjdDtcblx0XHR9XG5cblx0XHRldnQgPSBldnQgfHwge307XG5cblx0XHRzcGVjaWFsID0gY29yZS5fZGVmaW5lU3BlY2lhbChvYmplY3QsIGtleSk7XG5cblx0XHRzcGVjaWFsLiRub2RlcyA9IHNwZWNpYWwuJG5vZGVzLmxlbmd0aCA/IHNwZWNpYWwuJG5vZGVzLmFkZCgkbm9kZXMpIDogJG5vZGVzO1xuXG5cdFx0aWYgKG9iamVjdC5pc01LKSB7XG5cdFx0XHRvYmplY3QuJG5vZGVzW2tleV0gPSBzcGVjaWFsLiRub2Rlcztcblx0XHRcdG9iamVjdC5ub2Rlc1trZXldID0gc3BlY2lhbC4kbm9kZXNbMF07XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8ICRub2Rlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0aW5pdEJpbmRpbmcob2JqZWN0LCBvYmplY3REYXRhLCBrZXksICRub2RlcywgaSwgYmluZGVyLCBldnQsIHNwZWNpYWwpO1xuXHRcdH1cblxuXHRcdGlmICghZXZ0LnNpbGVudCkge1xuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdCRub2RlczogJG5vZGVzLFxuXHRcdFx0XHRub2RlOiAkbm9kZXNbMF0gfHwgbnVsbFxuXHRcdFx0fTtcblxuXHRcdFx0Zm9yIChpIGluIGV2dCkge1xuXHRcdFx0XHRfZXZ0W2ldID0gZXZ0W2ldO1xuXHRcdFx0fVxuXG5cdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiaW5kOicgKyBrZXksIF9ldnQpO1xuXHRcdFx0Y29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmluZCcsIF9ldnQpO1xuXHRcdH1cblxuXG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9O1xuXG5cdGZ1bmN0aW9uIGluaXRCaW5kaW5nKG9iamVjdCwgb2JqZWN0RGF0YSwga2V5LCAkbm9kZXMsIGluZGV4LCBiaW5kZXIsIGV2dCwgc3BlY2lhbCkge1xuXHRcdHZhciBvcHRpb25zID0ge1xuXHRcdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHQkbm9kZXM6ICRub2Rlcyxcblx0XHRcdFx0bm9kZTogbm9kZVxuXHRcdFx0fSxcblx0XHRcdG5vZGUgPSAkbm9kZXNbaW5kZXhdLFxuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2Ygc3BlY2lhbC52YWx1ZSA9PSAndW5kZWZpbmVkJyxcblx0XHRcdF9iaW5kZXIsXG5cdFx0XHRfZXZ0LFxuXHRcdFx0Zm91bmRCaW5kZXIsXG5cdFx0XHRfb3B0aW9ucyxcblx0XHRcdGksXG5cdFx0XHRkb21FdnQsXG5cdFx0XHRta0hhbmRsZXIsXG5cdFx0XHR2YWw7XG5cblxuXG5cblx0XHRpZiAoYmluZGVyID09PSBudWxsKSB7XG5cdFx0XHRfYmluZGVyID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuXHRcdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRcdGlmIChiaW5kZXIpIHtcblx0XHRcdFx0XHRmb3IgKGkgaW4gYmluZGVyKSB7XG5cdFx0XHRcdFx0XHRmb3VuZEJpbmRlcltpXSA9IGJpbmRlcltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfYmluZGVyID0gYmluZGVyIHx8IHt9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChfYmluZGVyLmluaXRpYWxpemUpIHtcblx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHR2YWx1ZTogc3BlY2lhbC52YWx1ZVxuXHRcdFx0fTtcblx0XHRcdGZvciAoaSBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdF9vcHRpb25zW2ldID0gb3B0aW9uc1tpXTtcblx0XHRcdH1cblx0XHRcdF9iaW5kZXIuaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIF9vcHRpb25zKTtcblx0XHR9XG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgZXZ0LmFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblxuXHRcdFx0X2V2dCA9IHtcblx0XHRcdFx0ZnJvbU5vZGU6IHRydWVcblx0XHRcdH07XG5cblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IGV2dFtpXTtcblx0XHRcdH1cblxuXHRcdFx0dmFsID0gX2JpbmRlci5nZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHRcdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsID09ICd1bmRlZmluZWQnO1xuXG5cdFx0XHRjb3JlLnNldChvYmplY3QsIGtleSwgdmFsLCBfZXZ0KTtcblx0XHR9XG5cblxuXHRcdGlmIChfYmluZGVyLnNldFZhbHVlKSB7XG5cdFx0XHRta0hhbmRsZXIgPSBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0XHRcdHZhciB2ID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0udmFsdWUsXG5cdFx0XHRcdFx0Ly8gZGlydHkgaGFjayBmb3IgdGhpcyBvbmUgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0XHRcdFx0XHRfdiA9IGV2dCAmJiB0eXBlb2YgZXZ0Lm9uQ2hhbmdlVmFsdWUgPT0gJ3N0cmluZycgJiYgdHlwZW9mIHYgPT0gJ251bWJlcicgPyB2ICsgJycgOiB2LFxuXHRcdFx0XHRcdGk7XG5cblx0XHRcdFx0aWYgKGV2dCAmJiBldnQuY2hhbmdlZE5vZGUgPT0gbm9kZSAmJiBldnQub25DaGFuZ2VWYWx1ZSA9PSBfdikgcmV0dXJuO1xuXG5cdFx0XHRcdF9vcHRpb25zID0ge1xuXHRcdFx0XHRcdHZhbHVlOiB2XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zm9yIChpIGluIG9wdGlvbnMpIHtcblx0XHRcdFx0XHRfb3B0aW9uc1tpXSA9IG9wdGlvbnNbaV07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRfYmluZGVyLnNldFZhbHVlLmNhbGwobm9kZSwgdiwgX29wdGlvbnMpO1xuXHRcdFx0fTtcblxuXHRcdFx0aWYoZXZ0LmRlYm91bmNlKSB7XG5cdFx0XHRcdG1rSGFuZGxlciA9IHV0aWwuZGVib3VuY2UobWtIYW5kbGVyKTtcblx0XHRcdH1cblxuXHRcdFx0Y29yZS5fZmFzdEFkZExpc3RlbmVyKG9iamVjdCwgJ19ydW5iaW5kaW5nczonICsga2V5LCBta0hhbmRsZXIsIG51bGwsIHtub2RlOiBub2RlfSk7XG5cblx0XHRcdCFpc1VuZGVmaW5lZCAmJiBta0hhbmRsZXIoKTtcblx0XHR9XG5cblxuXG5cblx0XHRpZiAoX2JpbmRlci5nZXRWYWx1ZSAmJiBfYmluZGVyLm9uKSB7XG5cdFx0XHRkb21FdnQgPSB7XG5cdFx0XHRcdG5vZGU6IG5vZGUsXG5cdFx0XHRcdG9uOiBfYmluZGVyLm9uLFxuXHRcdFx0XHRpbnN0YW5jZTogb2JqZWN0LFxuXHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0bWtIYW5kbGVyOiBta0hhbmRsZXIsXG5cdFx0XHRcdGhhbmRsZXI6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdGlmIChkb21FdnQucmVtb3ZlZCkgcmV0dXJuO1xuXHRcdFx0XHRcdHZhciBvbGR2YWx1ZSA9IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdFx0dmFsdWUsXG5cdFx0XHRcdFx0XHRqLFxuXHRcdFx0XHRcdFx0X29wdGlvbnMgPSB7XG5cdFx0XHRcdFx0XHRcdHZhbHVlOiBvbGR2YWx1ZSxcblx0XHRcdFx0XHRcdFx0ZG9tRXZlbnQ6IGV2dCxcblx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFdmVudDogZXZ0Lm9yaWdpbmFsRXZlbnQgfHwgZXZ0LFxuXHRcdFx0XHRcdFx0XHRwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdHN0b3BQcm9wYWdhdGlvbjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR3aGljaDogZXZ0LndoaWNoLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IGV2dC50YXJnZXRcblx0XHRcdFx0XHRcdH07XG5cblxuXHRcdFx0XHRcdC8vIGhhc093blByb3BlcnR5IGlzIG5vdCByZXF1aXJlZCB0aGVyZVxuXHRcdFx0XHRcdGZvciAoaiBpbiBvcHRpb25zKSB7XG5cdFx0XHRcdFx0XHRfb3B0aW9uc1tqXSA9IG9wdGlvbnNbal07XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFsdWUgPSBfYmluZGVyLmdldFZhbHVlLmNhbGwobm9kZSwgX29wdGlvbnMpO1xuXG5cdFx0XHRcdFx0aWYgKHZhbHVlICE9PSBvbGR2YWx1ZSkge1xuXHRcdFx0XHRcdFx0Y29yZS5zZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG5cdFx0XHRcdFx0XHRcdGZyb21Ob2RlOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkTm9kZTogbm9kZSxcblx0XHRcdFx0XHRcdFx0b25DaGFuZ2VWYWx1ZTogdmFsdWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Y29yZS5kb21FdmVudHMuYWRkKGRvbUV2dCk7XG5cdFx0fVxuXHR9XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldChvYmplY3QsIGtleSkge1xuXHRyZXR1cm4gb2JqZWN0W2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9nZXQuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG5NYXRyZXNoa2EuYmluZGVycyA9IGJpbmRlcnM7XG5cbmV4cG9ydCBkZWZhdWx0IE1hdHJlc2hrYTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4uL2NsYXNzJztcblxuZXhwb3J0IGRlZmF1bHQgQ2xhc3Moe1xuXHQvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuXHQvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuXHRleHRlbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWdpYy5qc1xuICoqLyIsIlxuLy8gL14oKFteQF0rKUApPygoLis/KSg6OihbXlxcKFxcKV0rKT8oXFwoKC4qKVxcKSk/KT8pPyQvXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKCkge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=