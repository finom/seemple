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

	"use strict";
	
	/*const testsContext = require.context('./spec/', true, /.*\.js$/);
	testsContext.keys().forEach(testsContext);
	const componentsContext = require.context('../src/', true, /.*index\.js$/);
	componentsContext.keys().forEach(componentsContext);*/
	
	// jscs:disable
	// test/test_index.js
	
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
	
	var componentsContext = __webpack_require__(41);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bquery/add_spec.js": 2,
		"./bquery/create_spec.js": 14,
		"./bquery/events_spec.js": 15,
		"./bquery/find_spec.js": 17,
		"./bquery/init_spec.js": 18,
		"./bquery/is_spec.js": 19,
		"./bquery/not_spec.js": 20,
		"./bquery/one_spec.js": 21,
		"./bquery/parsehtml_spec.js": 22,
		"./class_spec.js": 23,
		"./events/delegated_collection_spec.js": 25,
		"./events/delegated_spec.js": 26,
		"./events/events_change_spec.js": 37,
		"./events/events_core_spec.js": 38,
		"./events/events_dom_spec.js": 39,
		"./events/events_summary_spec.js": 40
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
	
	describe('bQuery.fn.add', function test() {
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
	
	var one = __webpack_require__(57);
	
	var create = __webpack_require__(58);
	
	var on = __webpack_require__(8);
	
	var off = __webpack_require__(10);
	
	var is = __webpack_require__(11);
	
	var add = __webpack_require__(12);
	
	var not = __webpack_require__(13);
	
	var find = __webpack_require__(49);
	
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
	
	function BQueryInit(selector, context) {
		var result = void 0;
	
		if (selector) {
			if (selector.nodeType || selector === window) {
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

	"use strict";
	
	module.exports = parseHTML;
	function parseHTML(html) {
		var node = document.createElement('div'),
	
		// wrapMap is taken from jQuery
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_: [0, "", ""]
		},
		    wrapper,
		    i,
		    ex;
	
		html = html.replace(/^\s+|\s+$/g, '');
	
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
	
		ex = /<([\w:]+)/.exec(html);
	
		wrapper = ex && wrapMap[ex[1]] || wrapMap._;
	
		node.innerHTML = wrapper[1] + html + wrapper[2];
	
		i = wrapper[0];
	
		while (i--) {
			node = node.children[0];
		}
	
		return node.childNodes;
	};

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
	
	module.exports = parseHTML;
	function parseHTML(html) {
	    return new Init(html2nodeList(html));
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(9);
	
	var Init = __webpack_require__(4);
	
	module.exports = on;
	function on(names, selector, handler) {
	    var _this = this,
	        delegate,
	        name,
	        namespace,
	        node,
	        nodeID,
	        events,
	        event,
	        exist,
	        i,
	        j,
	        k;
	
	    if (typeof selector == 'function') {
	        handler = selector;
	        selector = null;
	    }
	
	    if (selector) {
	        delegate = function delegatex(evt) {
	            var randomID = 'x' + String(Math.random()).split('.')[1],
	                node = this,
	                scopeSelector,
	                is;
	
	            node.setAttribute(randomID, randomID);
	
	            scopeSelector = '[' + randomID + '="' + randomID + '"] ';
	
	            is = selector.split(',').map(function (sel) {
	                return scopeSelector + sel + ',' + scopeSelector + sel + ' *';
	            }).join(',');
	
	            if (new Init(evt.target).is(is)) {
	                handler.call(node, evt);
	            }
	
	            node.removeAttribute(randomID);
	        };
	    }
	
	    names = names.split(/\s/);
	
	    for (i = 0; i < names.length; i++) {
	        name = names[i].split(data.nsReg);
	        namespace = name[1];
	        name = name[0];
	
	        for (j = 0; j < _this.length; j++) {
	            node = _this[j];
	            nodeID = node.b$ = node.b$ || ++data.nodeIndex, events = data.allEvents[name + nodeID] = data.allEvents[name + nodeID] || [], exist = false;
	
	            for (k = 0; k < events.length; k++) {
	                event = events[k];
	
	                if (handler == event.handler && (!selector || selector == event.selector)) {
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
	
	    return _this;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    nodeIndex: 0,
	    nsReg: /\.(.+)/,
	    allEvents: {}
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(9);
	
	module.exports = off;
	function off(names, selector, handler) {
	    var _this = this,
	        name,
	        namespace,
	        node,
	        events,
	        event,
	        i,
	        j,
	        k;
	
	    if (typeof selector == 'function') {
	        handler = selector;
	        selector = null;
	    }
	
	    names = names.split(/\s/);
	
	    for (i = 0; i < names.length; i++) {
	        name = names[i].split(data.nsReg);
	        namespace = name[1];
	        name = name[0];
	
	        for (j = 0; j < _this.length; j++) {
	            node = _this[j];
	
	            events = data.allEvents[name + node.b$];
	
	            if (events) {
	                for (k = 0; k < events.length; k++) {
	                    event = events[k];
	                    if ((!handler || handler == event.handler || handler == event.delegate) && (!namespace || namespace == event.namespace) && (!selector || selector == event.selector)) {
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
	
	    return _this;
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = is;
	function is(s) {
		var node = this[0];
		return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	var data = __webpack_require__(9);
	
	module.exports = add;
	function add(s) {
	    var result = new Init(this),
	        map = {},
	        nodeID,
	        node,
	        i;
	
	    s = new Init(s);
	
	    if (this.length) {
	        for (i = 0; i < result.length; i++) {
	            node = result[i];
	            nodeID = node.b$ = node.b$ || ++data.nodeIndex;
	            map[nodeID] = 1;
	        }
	
	        for (i = 0; i < s.length; i++) {
	            node = s[i];
	            nodeID = node.b$ = node.b$ || ++data.nodeIndex;
	            if (!map[nodeID]) {
	                map[nodeID] = 1;
	                result.push(node);
	            }
	        }
	    } else {
	        result = s;
	    }
	
	    return result;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	module.exports = not;
	function not(s) {
	    var result = new Init(),
	        index,
	        i;
	
	    for (i = 0; i < this.length; i++) {
	        if (!new Init(this[i]).is(s)) {
	            result.push(this[i]);
	        }
	    }
	
	    return result;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.create', function test() {
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
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var $ = __webpack_require__(3);
	
	var simulateClick = __webpack_require__(16);
	
	describe("bQuery events", function () {
							var testSandbox = void 0,
							    child1 = void 0,
							    child2 = void 0,
							    grandchild1 = void 0,
							    ctx = void 0,
							    handler = void 0;
	
							beforeEach(function () {
													testSandbox = document.createElement('div');
	
													testSandbox.innerHTML = '\n\t\t\t<div class="child1">\n\t\t\t\t<div class="grandchild1"></div>\n\t\t\t</div>\n\t\t\t<div class="child2"></div>\n\t\t';
	
													child1 = testSandbox.querySelector('.child1'), child2 = testSandbox.querySelector('.child2'), grandchild1 = testSandbox.querySelector('.grandchild1');
	
													ctx = {};
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
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = simulateClick;
	function simulateClick(node) {
	    var evt = document.createEvent("MouseEvent");
	    evt.initMouseEvent('click', true);
	    node.dispatchEvent(evt);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.fn.find', function test() {
	    var testSandbox = void 0,
	        grandChild = void 0;
	
	    beforeEach(function () {
	        testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n    \t\t<div class="child">\n    \t\t\t<div class="grandchild"></div>\n    \t\t</div>\n    \t';
	
	        grandChild = testSandbox.querySelector('.grandchild');
	    });
	
	    it('finds', function () {
	        expect([...$(testSandbox).find('.grandchild')]).toEqual([grandChild]);
	    });
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	// засунуть все создания новых элементов в beforeEach
	// рефакторить
	// написать комментарии (в том числе и к уже реализованным функциям)
	// после всего нужно включить линтер и проверить коверадж
	
	describe('bQuery initialization', function test() {
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
			$.fn.bQueryPlugin = function () {
				expect(this.length).toEqual(testSandbox.querySelectorAll('*').length);
			};
	
			spyOn($.fn, 'bQueryPlugin');
	
			$('*', testSandbox).bQueryPlugin();
	
			expect($.fn.bQueryPlugin).toHaveBeenCalled();
		});
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.fn.not', function test() {
	    it('checks className', function () {
	        var el = document.createElement('div');
	        el.className = 'el';
	
	        expect($(el).is('.el')).toEqual(true);
	
	        expect($(el).is('.el2')).toEqual(false);
	    });
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.fn.not', function test() {
	    it('excludes by selector', function () {
	        var el1 = document.createElement('div'),
	            el2 = document.createElement('div'),
	            el3 = document.createElement('div');
	
	        el2.className = 'el2';
	
	        expect([...$([el1, el2, el3]).not('.el2')]).toEqual([el1, el3]);
	    });
	});

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.one', function test() {
	    it('finds', function () {
	        var testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n        <div class="child">\n            <div class="grandchild"></div>\n        </div>\n        <div class="child2">\n            <div class="grandchild2"></div>\n        </div>\n    \t';
	
	        var child = testSandbox.querySelector('.child');
	
	        expect($.one('*', testSandbox)).toEqual(child);
	    });
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(3);
	
	describe('bQuery.parseHTML', function test() {
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(24);
	
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
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(27);
	
	var undelegateListener = __webpack_require__(34);
	
	var triggerOne = __webpack_require__(31);
	
	var makeObject = __webpack_require__(36);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(28);
	
	var undelegateListener = __webpack_require__(34);
	
	var triggerOne = __webpack_require__(31);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(29);
	
	var triggerOne = __webpack_require__(31);
	
	var defineProp = __webpack_require__(32);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(30);
	
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
/* 30 */
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(30);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(30);
	
	var set = __webpack_require__(33);
	
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(30);
	
	var triggerOne = __webpack_require__(31);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(30);
	
	var removeListener = __webpack_require__(35);
	
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(30);
	
	var triggerOne = __webpack_require__(31);
	
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
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(28);
	
	var delegateListener = __webpack_require__(27);
	
	var undelegateListener = __webpack_require__(34);
	
	var removeListener = __webpack_require__(35);
	
	var makeObject = __webpack_require__(36);
	
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(28);
	
	var removeListener = __webpack_require__(35);
	
	var triggerOne = __webpack_require__(31);
	
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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/lib.js": 42,
		"./_core/defineprop.js": 32,
		"./_core/defs.js": 30,
		"./_core/init.js": 29,
		"./_dom/dollar-global.js": 43,
		"./_dom/lib.js": 44,
		"./_events/addlistener.js": 28,
		"./_events/delegatelistener.js": 27,
		"./_events/removelistener.js": 35,
		"./_events/triggerone.js": 31,
		"./_events/undelegatelistener.js": 34,
		"./array.js": 45,
		"./binders.js": 46,
		"./bindnode.js": 47,
		"./bquery/_data.js": 9,
		"./bquery/_html2nodelist.js": 5,
		"./bquery/_init.js": 4,
		"./bquery/add.js": 12,
		"./bquery/bquery.js": 48,
		"./bquery/create.js": 58,
		"./bquery/find.js": 49,
		"./bquery/index.js": 3,
		"./bquery/is.js": 11,
		"./bquery/not.js": 13,
		"./bquery/off.js": 10,
		"./bquery/on.js": 8,
		"./bquery/one.js": 57,
		"./bquery/parsehtml.js": 7,
		"./class.js": 24,
		"./extend.js": 6,
		"./get.js": 50,
		"./index.js": 51,
		"./magic.js": 54,
		"./matreshka/index.js": 52,
		"./object.js": 53,
		"./on.js": 55,
		"./set.js": 33
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
	webpackContext.id = 41;


/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
		$: $
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"matreshka_dir/core/dom-lib/bquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())], __WEBPACK_AMD_DEFINE_RESULT__ = function ($b) {
		"use strict";
		/* istanbul ignore if  */
	
		if (typeof window == 'undefined') {
			return;
		}
	
		var neededMethods = 'on off is add not find'.split(/\s/),
		    dollar = typeof window.$ == 'function' ? window.$ : null,
		    useDollar = true,
		    fn,
		    i;
	
		if (dollar) {
			fn = dollar.fn || dollar.prototype;
			for (i = 0; i < neededMethods.length; i++) {
				if (!fn[neededMethods[i]]) {
					useDollar = false;
					break;
				}
			}
	
			if (useDollar && !dollar.parseHTML) {
				dollar.parseHTML = $b.parseHTML;
			}
		} else {
			useDollar = false;
		}
	
		return useDollar ? dollar : $b;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {};
	/*define([
		'matreshka_dir/core/var/core',
		'matreshka_dir/core/dom-lib/bquery',
		'matreshka_dir/core/dom-lib/dollar-lib'
	], function(core, $b, $) {
		"use strict";
		core.$ = $ || noop;

		core.$b = core.balalaika = core.bQuery = core.bquery = $b || noop;

		core.useAs$ = function(_$) {
			return core.$ = this.$ = $ = _$;
		};

		/* istanbul ignore next 
		// used as DOM library placeholder in non-browser environment (eg nodejs)
		function noop() {
			return [];
		}
	});
	*/

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";
	
	// Debounced!
	module.exports = bindNode;
	function bindNode() {}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
		"use strict";
	
		/* istanbul ignore if  */
	
		if (typeof window == 'undefined') {
			return;
		}
	
		var s_classList = 'classList',
		    nsReg = /\.(.+)/,
		    allEvents = {},
		    nodeIndex = 0,
		    fn = [];
	
		function $b(s, context) {
			return new $b.i(s, context);
		}
	
		$b.i = function (s, context) {
			var result, l, i;
	
			if (s) {
				if (s.nodeType || s == window) {
					result = [s];
				} else if (typeof s == 'string') {
					if (/</.test(s)) {
						result = $b.parseHTML(s);
					} else {
						if (context) {
							if (context = $b(context)[0]) {
								result = context.querySelectorAll(s);
							}
						} else {
							result = document.querySelectorAll(s);
						}
					}
				} else if (s instanceof Function) {
					// typeof nodeList returns "function" in old WebKit
					if (document.readyState == 'loading') {
						document.addEventListener('DOMContentLoaded', s);
					} else {
						s();
					}
				} else {
					result = s;
				}
			}
	
			l = result && result.length;
	
			if (l) {
				for (i = 0; i < l; i++) {
					this.push(result[i]);
				}
			}
		};
	
		$b.fn = $b.i.fn = $b.i.prototype = fn;
	
		$b.extend = function (obj) {
			var k = arguments,
			    i,
			    j,
			    l;
			for (i = 1; i < k.length; i++) {
				if (l = k[i]) {
					for (j in l) {
						obj[j] = l[j];
					}
				}
			}
	
			return obj;
		};
	
		$b.extend(fn, {
			is: function (s) {
				var node = this[0];
				return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
			},
			on: function (names, selector, handler) {
				var _this = this,
				    delegate,
				    name,
				    namespace,
				    node,
				    nodeID,
				    events,
				    event,
				    exist,
				    i,
				    j,
				    k;
	
				if (typeof selector == 'function') {
					handler = selector;
					selector = null;
				}
	
				if (selector) {
					delegate = function (evt) {
						var randomID = 'x' + String(Math.random()).split('.')[1],
						    node = this,
						    scopeSelector,
						    is;
	
						node.setAttribute(randomID, randomID);
	
						scopeSelector = '[' + randomID + '="' + randomID + '"] ';
	
						is = selector.split(',').map(function (sel) {
							return scopeSelector + sel + ',' + scopeSelector + sel + ' *';
						}).join(',');
	
						if ($b(evt.target).is(is)) {
							handler.call(node, evt);
						}
	
						node.removeAttribute(randomID);
					};
				}
	
				names = names.split(/\s/);
	
				for (i = 0; i < names.length; i++) {
					name = names[i].split(nsReg);
					namespace = name[1];
					name = name[0];
	
					for (j = 0; j < _this.length; j++) {
						node = _this[j];
	
						nodeID = node.b$ = node.b$ || ++nodeIndex, events = allEvents[name + nodeID] = allEvents[name + nodeID] || [], exist = false;
	
						for (k = 0; k < events.length; k++) {
							event = events[k];
	
							if (handler == event.handler && (!selector || selector == event.selector)) {
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
	
				return _this;
			},
			off: function (names, selector, handler) {
				var _this = this,
				    name,
				    namespace,
				    node,
				    events,
				    event,
				    i,
				    j,
				    k;
	
				if (typeof selector == 'function') {
					handler = selector;
					selector = null;
				}
	
				names = names.split(/\s/);
	
				for (i = 0; i < names.length; i++) {
					name = names[i].split(nsReg);
					namespace = name[1];
					name = name[0];
	
					for (j = 0; j < _this.length; j++) {
						node = _this[j];
	
						events = allEvents[name + node.b$];
	
						if (events) {
							for (k = 0; k < events.length; k++) {
								event = events[k];
								if ((!handler || handler == event.handler || handler == event.delegate) && (!namespace || namespace == event.namespace) && (!selector || selector == event.selector)) {
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
	
				return _this;
			},
			add: function (s) {
				var result = $b(this),
				    map = {},
				    nodeID,
				    node,
				    i;
	
				s = $b(s);
	
				for (i = 0; i < result.length; i++) {
					node = result[i];
					nodeID = node.b$ = node.b$ || ++nodeIndex;
					map[nodeID] = 1;
				}
	
				for (i = 0; i < s.length; i++) {
					node = s[i];
					nodeID = node.b$ = node.b$ || ++nodeIndex;
					if (!map[nodeID]) {
						map[nodeID] = 1;
						result.push(node);
					}
				}
	
				return result;
			},
			not: function (s) {
				var result = $b(this),
				    index,
				    i;
	
				s = $b(s);
	
				for (i = 0; i < s.length; i++) {
					if (~(index = result.indexOf(s[i]))) {
						result.splice(index, 1);
					}
				}
	
				return result;
			},
			find: function (s) {
				var result = $b();
				this.forEach(function (item) {
					result = result.add($b(s, item));
				});
				return result;
			}
		});
	
		// simple html parser
		$b.parseHTML = function (html) {
			var node = document.createElement('div'),
	
			// wrapMap is taken from jQuery
			wrapMap = {
				option: [1, "<select multiple='multiple'>", "</select>"],
				legend: [1, "<fieldset>", "</fieldset>"],
				thead: [1, "<table>", "</table>"],
				tr: [2, "<table><tbody>", "</tbody></table>"],
				td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
				col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
				area: [1, "<map>", "</map>"],
				_: [0, "", ""]
			},
			    wrapper,
			    i,
			    ex;
	
			html = html.replace(/^\s+|\s+$/g, '');
	
			wrapMap.optgroup = wrapMap.option;
			wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
			wrapMap.th = wrapMap.td;
	
			ex = /<([\w:]+)/.exec(html);
	
			wrapper = ex && wrapMap[ex[1]] || wrapMap._;
	
			node.innerHTML = wrapper[1] + html + wrapper[2];
	
			i = wrapper[0];
	
			while (i--) {
				node = node.children[0];
			}
	
			return $b(node.childNodes);
		};
	
		$b.create = function create(tagName, props) {
			var el, i, j, prop;
	
			if (typeof tagName == 'object') {
				props = tagName;
				tagName = props.tagName;
			}
	
			el = document.createElement(tagName);
	
			if (props) for (i in props) {
				prop = props[i];
				if (i == 'attributes' && typeof prop == 'object') {
					for (j in prop) {
						if (prop.hasOwnProperty(j)) {
							el.setAttribute(j, prop[j]);
						}
					}
				} else if (i == 'tagName') {
					continue;
				} else if (i == 'children' && prop) {
					for (j = 0; j < prop.length; j++) {
						el.appendChild(create(prop[j]));
					}
				} else if (typeof el[i] == 'object' && el[i] !== null && typeof props == 'object') {
					for (j in prop) {
						if (prop.hasOwnProperty(j)) {
							el[i][j] = prop[j];
						}
					}
				} else {
					el[i] = prop;
				}
			}
			return el;
		};
	
		$b.one = function (s, context) {
			return $b(s, context)[0] || null;
		};
	
		return $b;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	module.exports = find;
	function find(s) {
	    var result = new Init();
	
	    this.forEach(function (item) {
	        result = result.add(item.querySelectorAll(s));
	    });
	
	    return result;
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = get;
	function get(object, key) {
		return object[key];
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(52);
	
	var MatreshkaArray = __webpack_require__(45);
	
	var MatreshkaObject = __webpack_require__(53);
	
	var Class = __webpack_require__(24);
	
	var binders = __webpack_require__(46);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(6);
	
	var Class = __webpack_require__(24);
	
	module.exports = Class({
		// instance properies and methods
	
	}, {
		// static properties and methods
		extend: extend
	});

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ },
/* 56 */,
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(4);
	
	module.exports = one;
	function one(s, context) {
	    return new Init(s, context)[0];
	};

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = create;
	function create(tagName, props) {
	    var el, i, j, prop;
	
	    if (typeof tagName == 'object') {
	        props = tagName;
	        tagName = props.tagName;
	    }
	
	    el = document.createElement(tagName);
	
	    if (props) for (i in props) {
	        prop = props[i];
	        if (i == 'attributes' && typeof prop == 'object') {
	            for (j in prop) {
	                if (prop.hasOwnProperty(j)) {
	                    el.setAttribute(j, prop[j]);
	                }
	            }
	        } else if (i == 'tagName') {
	            continue;
	        } else if (i == 'children' && prop) {
	            for (j = 0; j < prop.length; j++) {
	                el.appendChild(create(prop[j]));
	            }
	        } else if (typeof el[i] == 'object' && el[i] !== null && typeof props == 'object') {
	            for (j in prop) {
	                if (prop.hasOwnProperty(j)) {
	                    el[i][j] = prop[j];
	                }
	            }
	        } else {
	            el[i] = prop;
	        }
	    }
	    return el;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGFlN2Q0NjY5ZjI5ZTI2NDg5ZWUiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0ZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9fZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29mZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2lzLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvYWRkLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvbm90LmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy90cmlnZ2Vyb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL21ha2VvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9saWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vZG9sbGFyLWdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2RvbS9saWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2JxdWVyeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdHJlc2hrYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWdpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQSxLQUFJLDJCQUEyQixFQUEzQjs7OztBQUlKLEtBQUksZUFBZSxzQkFBZjs7QUFFSixVQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDeEIsVUFBTyx5QkFBeUIsT0FBekIsQ0FBaUMsSUFBakMsS0FBMEMsQ0FBMUMsQ0FEaUI7RUFBMUI7O0FBSUEsS0FBSSxXQUFXLGFBQWEsSUFBYixHQUFvQixNQUFwQixDQUEyQixVQUEzQixDQUFYOzs7QUFHSixLQUFJLENB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SUFBVyxLQUFLLENBQUwsQ0FBWCxDQUR3QjtrQkFBNUI7Y0FESjtVQURHLE1BS0E7QUFDSCxnQkFBRyxDQUFILElBQVEsSUFBUixDQURHO1VBTEE7TUFiWDtBQXNCSixZQUFPLEVBQVAsQ0FqQzJDO0VBQWhDLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwYWU3ZDQ2NjlmMjllMjY0ODllZVxuICoqLyIsIi8qY29uc3QgdGVzdHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuL3NwZWMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG50ZXN0c0NvbnRleHQua2V5cygpLmZvckVhY2godGVzdHNDb250ZXh0KTtcbmNvbnN0IGNvbXBvbmVudHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuLi9zcmMvJywgdHJ1ZSwgLy4qaW5kZXhcXC5qcyQvKTtcbmNvbXBvbmVudHNDb250ZXh0LmtleXMoKS5mb3JFYWNoKGNvbXBvbmVudHNDb250ZXh0KTsqL1xuXG4vLyBqc2NzOmRpc2FibGVcbi8vIHRlc3QvdGVzdF9pbmRleC5qc1xuXG4vLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbnZhciBfX2thcm1hV2VicGFja01hbmlmZXN0X18gPSBbXTtcblxuLy8gcmVxdWlyZSBhbGwgbW9kdWxlcyBlbmRpbmcgaW4gXCJfdGVzdFwiIGZyb20gdGhlXG4vLyBjdXJyZW50IGRpcmVjdG9yeSBhbmQgYWxsIHN1YmRpcmVjdG9yaWVzXG52YXIgdGVzdHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KFwiLi9zcGVjL1wiLCB0cnVlLCAgLy4qXFwuanMkLyk7XG5cbmZ1bmN0aW9uIGluTWFuaWZlc3QocGF0aCkge1xuICByZXR1cm4gX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fLmluZGV4T2YocGF0aCkgPj0gMDtcbn1cblxudmFyIHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKS5maWx0ZXIoaW5NYW5pZmVzdCk7XG5cbi8vIFJ1biBhbGwgdGVzdHMgaWYgd2UgZGlkbid0IGZpbmQgYW55IGNoYW5nZXNcbmlmICghcnVubmFibGUubGVuZ3RoKSB7XG4gIHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKTtcbn1cblxucnVubmFibGUuZm9yRWFjaCh0ZXN0c0NvbnRleHQpO1xuXG5cbmNvbnN0IGNvbXBvbmVudHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuLi9zcmMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5jb21wb25lbnRzQ29udGV4dC5rZXlzKCkuZm9yRWFjaChjb21wb25lbnRzQ29udGV4dCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvaW5kZXguanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYnF1ZXJ5L2FkZF9zcGVjLmpzXCI6IDIsXG5cdFwiLi9icXVlcnkvY3JlYXRlX3NwZWMuanNcIjogMTQsXG5cdFwiLi9icXVlcnkvZXZlbnRzX3NwZWMuanNcIjogMTUsXG5cdFwiLi9icXVlcnkvZmluZF9zcGVjLmpzXCI6IDE3LFxuXHRcIi4vYnF1ZXJ5L2luaXRfc3BlYy5qc1wiOiAxOCxcblx0XCIuL2JxdWVyeS9pc19zcGVjLmpzXCI6IDE5LFxuXHRcIi4vYnF1ZXJ5L25vdF9zcGVjLmpzXCI6IDIwLFxuXHRcIi4vYnF1ZXJ5L29uZV9zcGVjLmpzXCI6IDIxLFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXCI6IDIyLFxuXHRcIi4vY2xhc3Nfc3BlYy5qc1wiOiAyMyxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXCI6IDI1LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXCI6IDI2LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1wiOiAzNyxcblx0XCIuL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXCI6IDM4LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1wiOiAzOSxcblx0XCIuL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXCI6IDQwXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDE7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdGVzdC9zcGVjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uYWRkJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBpdCgnYWRkcyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBlbDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIGVsNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKFtlbDEsIGVsMiwgZWwzXSkuYWRkKFtlbDIsIGVsMywgZWw0LCBlbDVdKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsMiwgZWwzLCBlbDQsIGVsNV0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgcGFyc2VIVE1MIGZyb20gJy4vcGFyc2VodG1sJztcbmltcG9ydCBvbmUgZnJvbSAnLi9vbmUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgb24gZnJvbSAnLi9vbic7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBhZGQgZnJvbSAnLi9hZGQnO1xuaW1wb3J0IG5vdCBmcm9tICcuL25vdCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJRdWVyeShzZWxlY3RvciwgY29udGV4dCkge1xuXHRyZXR1cm4gbmV3IEluaXQoc2VsZWN0b3IsIGNvbnRleHQpO1xufVxuXG5ub2ZuLmFzc2lnbihiUXVlcnksIHtcblx0Zm46IEluaXQucHJvdG90eXBlLFxuXHRleHRlbmQsXG5cdHBhcnNlSFRNTCxcblx0b25lLFxuXHRjcmVhdGVcbn0pO1xuXG5ub2ZuLmFzc2lnbihiUXVlcnkuZm4sIHtcblx0b24sXG5cdG9mZixcblx0aXMsXG5cdGFkZCxcblx0bm90LFxuXHRmaW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pbmRleC5qc1xuICoqLyIsImltcG9ydCBodG1sMm5vZGVMaXN0IGZyb20gJy4vX2h0bWwybm9kZWxpc3QnO1xuXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cdGxldCByZXN1bHQ7XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yID09PSB3aW5kb3cpIHtcblx0XHRcdHJlc3VsdCA9IFtzZWxlY3Rvcl07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdHJlc3VsdCA9IGh0bWwybm9kZUxpc3Qoc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGNvbnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCBuZXdDb250ZXh0ID0gKG5ldyBCUXVlcnlJbml0KGNvbnRleHQpKVswXTtcblxuXHRcdFx0XHRcdGlmIChuZXdDb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikgeyAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuXHRcdFx0aWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZWN0b3IoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gc2VsZWN0b3I7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgbGVuZ3RoID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGg7XG5cblx0aWYgKGxlbmd0aCkge1xuXHRcdGZvcihjb25zdCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0aGlzLnB1c2gocmVzdWx0W2ldKTtcblx0XHR9XG5cdH1cbn1cblxuQlF1ZXJ5SW5pdC5wcm90b3R5cGUgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgQlF1ZXJ5SW5pdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faW5pdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlSFRNTChodG1sKSB7XG5cdHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0Ly8gd3JhcE1hcCBpcyB0YWtlbiBmcm9tIGpRdWVyeVxuXHRcdHdyYXBNYXAgPSB7XG5cdFx0XHRvcHRpb246IFsxLCBcIjxzZWxlY3QgbXVsdGlwbGU9J211bHRpcGxlJz5cIiwgXCI8L3NlbGVjdD5cIl0sXG5cdFx0XHRsZWdlbmQ6IFsxLCBcIjxmaWVsZHNldD5cIiwgXCI8L2ZpZWxkc2V0PlwiXSxcblx0XHRcdHRoZWFkOiBbMSwgXCI8dGFibGU+XCIsIFwiPC90YWJsZT5cIl0sXG5cdFx0XHR0cjogWzIsIFwiPHRhYmxlPjx0Ym9keT5cIiwgXCI8L3Rib2R5PjwvdGFibGU+XCJdLFxuXHRcdFx0dGQ6IFszLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiXSxcblx0XHRcdGNvbDogWzIsIFwiPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD5cIiwgXCI8L2NvbGdyb3VwPjwvdGFibGU+XCJdLFxuXHRcdFx0YXJlYTogWzEsIFwiPG1hcD5cIiwgXCI8L21hcD5cIl0sXG5cdFx0XHRfOiBbMCwgXCJcIiwgXCJcIl1cblx0XHR9LFxuXHRcdHdyYXBwZXIsXG5cdFx0aSxcblx0XHRleDtcblxuXHRodG1sID0gaHRtbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG5cblx0d3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXHR3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuXHR3cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuXHRleCA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpO1xuXG5cdHdyYXBwZXIgPSBleCAmJiB3cmFwTWFwW2V4WzFdXSB8fCB3cmFwTWFwLl87XG5cblx0bm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cblx0aSA9IHdyYXBwZXJbMF07XG5cblx0d2hpbGUgKGktLSkge1xuXHRcdG5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuXHR9XG5cblx0cmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcbiAqKi8iLCIvLyBPYmplY3QuYXNzaWduIHBvbHlmeWxsIGlzIHRha2VuIHRoZXJlOlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnbiNQb2x5ZmlsbFxuLy8gYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmVcblxuY29uc3QgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuXHRmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuXHRcdGNvbnN0IHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG5cdFx0aWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuXHRcdFx0Zm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuXHRcdFx0XHRpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG5cdFx0XHRcdFx0b3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V4dGVuZC5qc1xuICoqLyIsImltcG9ydCBodG1sMm5vZGVMaXN0IGZyb20gJy4vX2h0bWwybm9kZWxpc3QnO1xuaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gbmV3IEluaXQoaHRtbDJub2RlTGlzdChodG1sKSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgZGVsZWdhdGUsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgbm9kZSxcbiAgICAgICAgbm9kZUlELFxuICAgICAgICBldmVudHMsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBleGlzdCxcbiAgICAgICAgaSwgaiwgaztcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7XG4gICAgICAgIHNlbGVjdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgZGVsZWdhdGUgPSBmdW5jdGlvbiBkZWxlZ2F0ZXgoZXZ0KSB7XG4gICAgICAgICAgICB2YXIgcmFuZG9tSUQgPSAneCcgKyBTdHJpbmcoTWF0aC5yYW5kb20oKSkuc3BsaXQoJy4nKVsxXSxcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcyxcbiAgICAgICAgICAgICAgICBzY29wZVNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIGlzO1xuXG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShyYW5kb21JRCwgcmFuZG9tSUQpO1xuXG4gICAgICAgICAgICBzY29wZVNlbGVjdG9yID0gJ1snICsgcmFuZG9tSUQgKyAnPVwiJyArIHJhbmRvbUlEICsgJ1wiXSAnO1xuXG4gICAgICAgICAgICBpcyA9IHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKHNlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY29wZVNlbGVjdG9yICsgc2VsICsgJywnICsgc2NvcGVTZWxlY3RvciArIHNlbCArICcgKic7XG4gICAgICAgICAgICB9KS5qb2luKCcsJyk7XG5cbiAgICAgICAgICAgIGlmIChuZXcgSW5pdChldnQudGFyZ2V0KS5pcyhpcykpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmNhbGwobm9kZSwgZXZ0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tSUQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KGRhdGEubnNSZWcpO1xuICAgICAgICBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuICAgICAgICBuYW1lID0gbmFtZVswXTtcblxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgX3RoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIG5vZGUgPSBfdGhpc1tqXTtcbiAgICAgICAgICAgIG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXgsXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXSxcbiAgICAgICAgICAgICAgICBleGlzdCA9IGZhbHNlO1xuXG5cbiAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBldmVudCA9IGV2ZW50c1trXTtcblxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09IGV2ZW50LmhhbmRsZXIgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PSBldmVudC5zZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZXhpc3QpIHtcbiAgICAgICAgICAgICAgICBldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlOiBkZWxlZ2F0ZSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogaGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBzZWxlY3RvclxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGRlbGVnYXRlIHx8IGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfdGhpcztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb24uanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbm9kZUluZGV4OiAwLFxuICAgIG5zUmVnOiAvXFwuKC4rKS8sXG4gICAgYWxsRXZlbnRzOiB7fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9fZGF0YS5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcyxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICBub2RlLFxuICAgICAgICBldmVudHMsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBpLCBqLCBrO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzZWxlY3RvcjtcbiAgICAgICAgc2VsZWN0b3IgPSBudWxsO1xuICAgIH1cblxuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lc1tpXS5zcGxpdChkYXRhLm5zUmVnKTtcbiAgICAgICAgbmFtZXNwYWNlID0gbmFtZVsxXTtcbiAgICAgICAgbmFtZSA9IG5hbWVbMF07XG5cbiAgICAgICAgZm9yIChqID0gMDsgaiA8IF90aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBub2RlID0gX3RoaXNbal07XG5cbiAgICAgICAgICAgIGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlLmIkXTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBldmVudHNba107XG4gICAgICAgICAgICAgICAgICAgIGlmICgoIWhhbmRsZXIgfHwgaGFuZGxlciA9PSBldmVudC5oYW5kbGVyIHx8IGhhbmRsZXIgPT0gZXZlbnQuZGVsZWdhdGUpICYmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PSBldmVudC5uYW1lc3BhY2UpICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT0gZXZlbnQuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnQuZGVsZWdhdGUgfHwgZXZlbnQuaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGstLSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghbmFtZXNwYWNlICYmICFzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF90aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29mZi5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzKHMpIHtcblx0Y29uc3Qgbm9kZSA9IHRoaXNbMF07XG5cdHJldHVybiBub2RlXG5cdFx0PyAobm9kZS5tYXRjaGVzXG5cdFx0XHR8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pcy5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZChzKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBJbml0KHRoaXMpLFxuICAgICAgICBtYXAgPSB7fSxcbiAgICAgICAgbm9kZUlELFxuICAgICAgICBub2RlLFxuICAgICAgICBpO1xuXG4gICAgcyA9IG5ldyBJbml0KHMpO1xuXG4gICAgaWYodGhpcy5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9kZSA9IHJlc3VsdFtpXTtcbiAgICAgICAgICAgIG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG4gICAgICAgICAgICBtYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbm9kZSA9IHNbaV07XG4gICAgICAgICAgICBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWYgKCFtYXBbbm9kZUlEXSkge1xuICAgICAgICAgICAgICAgIG1hcFtub2RlSURdID0gMTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHM7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9hZGQuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90KHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IEluaXQoKSxcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZighbmV3IEluaXQodGhpc1tpXSkuaXMocykpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXNbaV0pXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L25vdC5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmNyZWF0ZScsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgaXQoJ2NyZWF0ZXMgZWxlbWVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicpLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdESVYnKTtcblx0fSk7XG5cbiAgICBpdCgnYWRkcyBhIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2Zvb2JhcidcbiAgICAgICAgICAgIH0pLmNsYXNzTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ2Zvb2JhcicpO1xuXHR9KTtcblxuICAgIGl0KCdjcmVhdGVzIGNoaWxkZW4nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdzcGFuJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KS5jaGlsZHJlblswXS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXG4gICAgaXQoJ2FkZHMgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmdldEF0dHJpYnV0ZSgnZm9vJylcbiAgICAgICAgKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3Mgb2JqZWN0IHdpdGggdGFnTmFtZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdkaXYnXG4gICAgICAgICAgICB9KS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnRElWJyk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcbmltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2xpYi9zaW11bGF0ZWNsaWNrJztcblxuZGVzY3JpYmUoXCJiUXVlcnkgZXZlbnRzXCIsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94LFxuXHRcdGNoaWxkMSxcblx0XHRjaGlsZDIsXG5cdFx0Z3JhbmRjaGlsZDEsXG5cdFx0Y3R4LFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGQxXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDJcIj48L2Rpdj5cblx0XHRgO1xuXG5cdFx0Y2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpLFxuICAgICAgICBjaGlsZDIgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQyJyksXG4gICAgICAgIGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cblx0XHRjdHggPSB7fTtcblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cdGFmdGVyRWFjaCgoKSA9PiB7XG5cdFx0JChbdGVzdFNhbmRib3gsIGNoaWxkMSwgY2hpbGQyLCBncmFuZGNoaWxkMV0pLm9mZignY2xpY2snKTtcblx0fSk7XG5cbiAgICBpdCgnQWRkcyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICBcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuICAgIGl0KCdBZGRzIG5hbWVzcGFjZWQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG4gICAgaXQoJ0FkZHMgYnViYmxpbmcgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXHRpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKGNsaWNrIG9uIGdyYW5kY2hpbGRyZW4pJyAsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnRG9lc25cXHQgdHJpZ2dlciB3aGVuIGNsaWNrZWQgb24gd3JvbmcgY2hpbGQnLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDInLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBub3Qgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU3RvcHMgcHJvcGFnYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICAkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2sobm9kZSkge1xuICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcbiAgICBldnQuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uZmluZCcsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgbGV0IHRlc3RTYW5kYm94LFxuICAgICAgICBncmFuZENoaWxkO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICBcdFx0PGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgXHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICBcdFx0PC9kaXY+XG4gICAgXHRgO1xuXG4gICAgICAgIGdyYW5kQ2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpbmRzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJCh0ZXN0U2FuZGJveCkuZmluZCgnLmdyYW5kY2hpbGQnKVxuICAgICAgICBdKS50b0VxdWFsKFtncmFuZENoaWxkXSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5Jztcbi8vINC30LDRgdGD0L3Rg9GC0Ywg0LLRgdC1INGB0L7Qt9C00LDQvdC40Y8g0L3QvtCy0YvRhSDRjdC70LXQvNC10L3RgtC+0LIg0LIgYmVmb3JlRWFjaFxuLy8g0YDQtdGE0LDQutGC0L7RgNC40YLRjFxuLy8g0L3QsNC/0LjRgdCw0YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC4ICjQsiDRgtC+0Lwg0YfQuNGB0LvQtSDQuCDQuiDRg9C20LUg0YDQtdCw0LvQuNC30L7QstCw0L3QvdGL0Lwg0YTRg9C90LrRhtC40Y/QvClcbi8vINC/0L7RgdC70LUg0LLRgdC10LPQviDQvdGD0LbQvdC+INCy0LrQu9GO0YfQuNGC0Ywg0LvQuNC90YLQtdGAINC4INC/0YDQvtCy0LXRgNC40YLRjCDQutC+0LLQtdGA0LDQtNC2XG5cbmRlc2NyaWJlKCdiUXVlcnkgaW5pdGlhbGl6YXRpb24nLCBmdW5jdGlvbiB0ZXN0KCkge1xuXHRsZXQgdGVzdFNhbmRib3g7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTFcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtMlwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0zXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9KTtcblxuXHRpdCgnYWNjZXB0cyB3aW5kb3cnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJCh3aW5kb3cpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuXHR9KTtcblxuXHRpdCgnYWNjZXB0cyBkb2N1bWVudCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKGRvY3VtZW50KTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwoZG9jdW1lbnQpO1xuXHR9KTtcblxuICAgIGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbnZlcnRzIGFycmF5LWxpa2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLFxuXHRcdFx0cmVzdWx0ID0gJChjaGlsZHJlbik7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGV4cGVjdChjaGlsZHJlbltpXSkudG9FcXVhbChyZXN1bHRbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cblx0aXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqJyksXG5cdFx0XHRyZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KGVsZW1lbnQpLnRvRXF1YWwocmVzdWx0WzBdKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgdGVzdFNhbmRib3gpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgxKTtcblx0fSk7XG5cblx0aXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCcudGVzdC0xJywgJy53cm9uZy1jb250ZXh0JykubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQobnVsbCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcblx0XHQkLmZuLmJRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KFxuXHRcdFx0XHR0aGlzLmxlbmd0aFxuXHRcdFx0KS50b0VxdWFsKFxuXHRcdFx0XHR0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJykubGVuZ3RoXG5cdFx0XHQpO1xuXHRcdH07XG5cblx0XHRzcHlPbigkLmZuLCAnYlF1ZXJ5UGx1Z2luJyk7XG5cblx0XHQkKCcqJywgdGVzdFNhbmRib3gpLmJRdWVyeVBsdWdpbigpO1xuXG5cdFx0ZXhwZWN0KCQuZm4uYlF1ZXJ5UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBpdCgnY2hlY2tzIGNsYXNzTmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKGVsKS5pcygnLmVsJylcbiAgICAgICAgKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwyJylcbiAgICAgICAgKS50b0VxdWFsKGZhbHNlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBpdCgnZXhjbHVkZXMgYnkgc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5ub3QoJy5lbDInKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBpdCgnZmluZHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIFx0YDtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQub25lKCcqJywgdGVzdFNhbmRib3gpXG4gICAgICAgICkudG9FcXVhbChjaGlsZCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LnBhcnNlSFRNTCcsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgaXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPHRkPjwvdGQ+PHRkPjwvdGQ+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgQ2xhc3MgZnJvbSAnc3JjL2NsYXNzJztcblxuZGVzY3JpYmUoJ0NsYXNzIGZ1bmN0aW9uJywgKCkgPT4ge1xuXHRpdCgnYWxsb3dzIHRvIGluaGVyaXQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgQSA9IENsYXNzKHsgYTogdHJ1ZSB9KSxcblx0XHRcdEIgPSBDbGFzcyh7IGI6IHRydWUsIGV4dGVuZHM6IEEgfSksXG5cdFx0XHRDID0gQ2xhc3MoeyBjOiB0cnVlLCBleHRlbmRzOiBCIH0pLFxuXHRcdFx0aW5zdCA9IG5ldyBDO1xuXG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBCKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDKS50b0JlVHJ1dGh5KCk7XG5cblx0XHRleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QuYikudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0LmMpLnRvQmVUcnV0aHkoKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcblx0XHRjb25zdCBBID0gQ2xhc3Moe30sIHsgc3RhdGljUHJvcDogdHJ1ZSB9KTtcblx0XHRleHBlY3QoQS5zdGF0aWNQcm9wKS50b0JlVHJ1dGh5KCk7XG5cdH0pO1xuXG5cdGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGluc3QgPSBuZXcgQ2xhc3MoeyBhOiB0cnVlIH0pO1xuXHRcdGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xhc3MocHJvdG90eXBlLCBzdGF0aWNQcm9wcykge1xuXHRjb25zdCBDb25zdHJ1Y3RvciA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0XG5cdFx0XHQ/IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxuXHRcdFx0OiBmdW5jdGlvbiBFbXB0eUNvbnN0cnVjdG9yKCkge30sXG5cdFx0Ly9leHRlbmRzIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblx0XHRQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuXHRcdC8vaW5oZXJpdCBwcm90byBmcm9tIGNsYXNzIHBhcmVudCBvciBlbXB0eSBvYmplY3Rcblx0XHRwcm90byA9IE9iamVjdC5jcmVhdGUoUGFyZW50ID8gUGFyZW50LnByb3RvdHlwZSA6IHt9KTtcblxuXHRleHRlbmQocHJvdG8sIHByb3RvdHlwZSk7XG5cblx0aWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcblx0XHRleHRlbmQoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcblx0fVxuXG5cdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cdHByb3RvLmluc3RhbmNlT2YgPSBmdW5jdGlvbiBpbnN0YW5jZU9mKCkge1xuXHRcdHJldHVybiB0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3I7XG5cdH07XG5cblx0Q29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cblx0Ly8gaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZVxuXHRpZiAodGhpcyBpbnN0YW5jZW9mIENsYXNzKSB7XG5cdFx0cmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBDb25zdHJ1Y3Rvcjtcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3MuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0Y2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge1xuXHRcdFx0YToge31cblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe30pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdGE6IHt9XG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe1xuXHRcdFx0YToge31cblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXVswXS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG5cdFx0XHR5OiBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdFx0YToge31cblx0XHRcdH0pXG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC55LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuXG5kZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChiYXNpYyknLCBmdW5jdGlvbiB0ZXN0KCkge1xuXHRsZXQgY3R4LFxuXHRcdGhhbmRsZXI7XG5cblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHRjdHggPSB7fTtcblx0XHR0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcblx0XHRzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuXHRcdGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSB7fTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIuYyA9IHt9O1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpLFxuXHRcdFx0YSA9IG9iai5hO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG5cdFx0dHJpZ2dlck9uZShhLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpLFxuXHRcdFx0YiA9IG9iai5hLmI7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0ge307XG5cdFx0dHJpZ2dlck9uZShiLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRhID0gb2JqLmE7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG5cdFx0dHJpZ2dlck9uZShhLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YiA9IG9iai5hLmI7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG5cdFx0dHJpZ2dlck9uZShiLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGMgPSBvYmouYS5jO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLmMgPSB7fTtcblx0XHR0cmlnZ2VyT25lKGMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZG9lc25cXCd0IHJlbW92ZSBjaGFuZ2UgZXZlbnQgd2hlbiB1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuXHRcdG9iai5hLmIuYyA9IDU1O1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VzZXMgY29ycmVjdCBjb250ZXh0IGZvciBkZWxlZ2F0ZWQgZXZlbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cdFx0bGV0IGJvb2wgPSBmYWxzZTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZnVuY3Rpb24gaGFuZGxlKCkge1xuXHRcdFx0Ym9vbCA9IHRoaXMgPT09IGN0eDtcblx0XHR9LCBjdHgpO1xuXG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiBbXCJlcnJvclwiLCB7IFwiZnVuY3Rpb25zXCI6IGZhbHNlIH1dKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL2FkZGxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG5cdHByZXZpb3VzVmFsdWUsXG5cdHZhbHVlXG59LCB7XG5cdHBhdGgsXG5cdG5hbWUsXG5cdGNhbGxiYWNrLFxuXHRjb250ZXh0XG59ID0gdHJpZ2dlck9uZS5sYXRlc3RFdmVudC5pbmZvLmRlbGVnYXRlZERhdGEpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKHZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cblxuXHRpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuXHQvLyBpZiB0eXBlb2YgcGF0aCBpcyBzdHJpbmcgYW5kIHBhdGggaXMgbm90IGVtcHR5IHN0cmluZyB0aGVuIHNwbGl0IGl0XG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gYWRkIHNpbXBsZSBsaXN0ZW5lclxuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG5cdFx0Y29uc3Qga2V5ID0gcGF0aFswXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRjb25zdCBkZWxlZ2F0ZWREYXRhID0ge1xuXHRcdFx0cGF0aCxcblx0XHRcdG5hbWUsXG5cdFx0XHRjYWxsYmFjayxcblx0XHRcdGNvbnRleHRcblx0XHR9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuXHRcdFx0ZGVsZWdhdGVkRGF0YSxcblx0XHRcdHBhdGhTdHJcblx0XHR9KTtcblxuXHRcdGNoYW5nZUhhbmRsZXIoe1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldXG5cdFx0fSwgZGVsZWdhdGVkRGF0YSk7XG5cdH1cbn1cblxuLypcbmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL2luaXRtaycsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCcsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL3NwZWNpYWxldnRyZWcnXG5dLCBmdW5jdGlvbihjb3JlLCBpbml0TUssIG1hcCwgc3BlY2lhbEV2dFJlZykge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIF9kZWxlZ2F0ZUxpc3RlbmVyID0gY29yZS5fZGVsZWdhdGVMaXN0ZW5lciA9IGZ1bmN0aW9uKG9iamVjdCxcblx0IHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zixcblx0XHRcdGZpcnN0S2V5ID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsxXSA6IHBhdGgsXG5cdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRvYmo7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0ZXZ0RGF0YSA9IGV2dERhdGEgfHwge307XG5cblx0XHRpZiAoZmlyc3RLZXkpIHtcblx0XHRcdGlmIChmaXJzdEtleSA9PSAnKicpIHtcblx0XHRcdFx0aWYgKG9iamVjdC5pc01LQXJyYXkpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHQoZXZ0ICYmIGV2dC5hZGRlZCA/IGV2dC5hZGRlZCA6IG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0gJiYgX2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSxcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGYuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnYWRkJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0ZigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9iamVjdC5pc01LT2JqZWN0KSB7XG5cdFx0XHRcdFx0ZiA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtldnQua2V5XTtcblxuXHRcdFx0XHRcdFx0aWYgKHRhcmdldCAmJiBldnQgJiYgKGV2dC5rZXkgaW4gb2JqZWN0RGF0YS5rZXlzKSkge1xuXHRcdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcih0YXJnZXQsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0b2JqZWN0LmVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZScsIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0aWYgKGV2dCAmJiBldnQuX3NpbGVudCkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtmaXJzdEtleV0sXG5cdFx0XHRcdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRcdFx0XHR0cmlnZ2VyQ2hhbmdlID0gdHJ1ZSxcblx0XHRcdFx0XHRcdGksXG5cdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHM7XG5cblx0XHRcdFx0XHRldnREYXRhLnBhdGggPSBwYXRoO1xuXG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlID0gZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlIHx8XG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZVtmaXJzdEtleV07XG5cblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlICYmIG1hcC5oYXMoZXZ0LnByZXZpb3VzVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRjb3JlLl91bmRlbGVnYXRlTGlzdGVuZXIoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldCA9PSAnb2JqZWN0JyAmJiB0YXJnZXQpIHtcblx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzcGVjaWFsRXZ0UmVnLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0XHRcdGNoYW5nZUtleSA9IG5hbWUucmVwbGFjZShzcGVjaWFsRXZ0UmVnLCAnJyk7XG5cblx0XHRcdFx0XHRcdGlmICghcGF0aCAmJiBldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2NoYW5nZUtleV1cblx0XHRcdFx0XHRcdCE9PSB0YXJnZXRbY2hhbmdlS2V5XSkge1xuXHRcdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHMgPSBtYXAuZ2V0KGV2dERhdGEucHJldmlvdXNWYWx1ZSkuZXZlbnRzW25hbWVdO1xuXHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNoYW5nZUV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNoYW5nZUV2ZW50c1tpXS5wYXRoID09PSBwYXRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAodHJpZ2dlckNoYW5nZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvcmUuc2V0KHRhcmdldCwgY2hhbmdlS2V5LCB0YXJnZXRbY2hhbmdlS2V5XSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yY2U6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlOiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzT2JqZWN0OiBldnREYXRhLnByZXZpb3VzVmFsdWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfc2lsZW50OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBmLCBjb250ZXh0LCBldnREYXRhKTtcblxuXHRcdFx0XHRmKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcImV2dFwiXSB9XSovXG5cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5cbi8vIHByb3BlcnR5IG1vZGlmaWVyIGV2ZW50IHJlZ2V4cFxuY29uc3QgcHJvcE1vZEV2ZW50UmVnXG5cdD0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuLy8gYWRkcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXJcbi8vIHVzZWQgYXMgY29yZSBvZiBldmVudCBlbmdpbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBpbml0TUsob2JqZWN0KSxcblx0XHRjdHggPSBjb250ZXh0IHx8IG9iamVjdCxcblx0XHRldmVudHMgPSBhbGxFdmVudHNbbmFtZV0sXG5cdFx0ZXZ0ID0geyBjYWxsYmFjaywgY29udGV4dCwgY3R4LCBuYW1lLCBpbmZvIH07XG5cblxuXHQvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZVxuXHRpZiAoZXZlbnRzKSB7XG5cdFx0Ly8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIGRhdGEsIHJldHVybiBmYWxzZVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBldnQgPSBldmVudHNbaV07XG5cdFx0XHRpZiAoKGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjay5fY2FsbGJhY2spXG5cdFx0XHRcdFx0JiYgZXZ0LmNvbnRleHQgPT09IGNvbnRleHQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGlmIHRoZSBldmVudCBpc24ndCBmb3VuZCBhZGQgaXQgdG8gdGhlIGV2ZW50IGxpc3Rcblx0XHRldmVudHMucHVzaChldnQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lLCBjcmVhdGUgYXJyYXkgd2l0aCBvbmx5IGViZW50XG5cdFx0YWxsRXZlbnRzW25hbWVdID0gW2V2dF07XG5cdH1cblxuXHRpZiAocHJvcE1vZEV2ZW50UmVnLnRlc3QobmFtZSkpIHtcblx0XHQvLyBkZWZpbmUgbmVlZGVkIGFjY2Vzc29ycyBmb3IgS0VZXG5cdFx0ZGVmaW5lUHJvcChvYmplY3QsIG5hbWUucmVwbGFjZShwcm9wTW9kRXZlbnRSZWcsICcnKSk7XG5cdH1cblxuXHRpZiAobmFtZVswXSAhPT0gJ18nKSB7XG5cdFx0dHJpZ2dlck9uZShvYmplY3QsIGBhZGRldmVudDoke25hbWV9YCwgZXZ0KTtcblx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ2FkZGV2ZW50JywgZXZ0KTtcblx0fVxuXG5cdC8vIGlmIGV2ZW50IGlzIGFkZGVkIHJldHVybiB0cnVlXG5cdHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuXHRsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblx0aWYgKCFkZWYpIHtcblx0XHRkZWYgPSB7XG5cdFx0XHQvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuXHRcdFx0Ly8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24sXG5cdFx0XHRcdFx0Y3R4OiBvYmplY3QsXG5cdFx0XHRcdFx0Y29udGV4dDogb2JqZWN0Mixcblx0XHRcdFx0XHRuYW1lOiBcImV4YW1wbGVcIlxuXHRcdFx0XHR9XG5cdFx0XHRcdCovXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHQvLz9ub2RlczogY29yZS4kKCksXG5cdFx0XHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0XHRcdGdldHRlcjogbnVsbCxcblx0XHRcdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRcdFx0bWVkaWF0b3I6IG51bGwsXG5cdFx0XHRcdFx0Ly8/ZGVzdHJveWVyczogTWFwLFxuXHRcdFx0XHRcdGJpbmRpbmdzOiBbe1xuXHRcdFx0XHRcdFx0bm9kZSxcblx0XHRcdFx0XHRcdGJpbmRlcixcblx0XHRcdFx0XHRcdG5vZGVIYW5kbGVyLFxuXHRcdFx0XHRcdFx0b2JqZWN0SGFuZGxlclxuXHRcdFx0XHRcdH1dXG5cdFx0XHRcdH0qL1xuXHRcdFx0fSxcblx0XHRcdGlkOiBgbWske01hdGgucmFuZG9tKCl9YFxuXHRcdH07XG5cblx0XHRkZWZzLnNldChvYmplY3QsIGRlZik7XG5cdH1cblxuXHRyZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TUsob2JqZWN0KSB7XG5cdGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqZWN0O1xuXHRpZiAoIW9iamVjdCB8fCB0eXBlICE9PSAnb2JqZWN0Jykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZX0gY2Fubm90IGJlIHVzZWQgaW4gdGhpcyBtZXRob2RgKTtcblx0fVxuXG5cdC8vIGlmIG9iamVjdCBoYXMgX2luaXRNSyBtZXRob2QsIHJ1biBpdFxuXHQvLyBlbHNlIHJ1biBjb21tb25Jbml0XG5cdC8vIGV2ZXJ5IF9pbml0TUsgaW1wbGVtZW50YXRpb24gaGF2ZSB0byBydW4gY29tbW9uSW5pdCBvciBwYXJlbnQncyBfaW5pdE1LXG5cdHJldHVybiBvYmplY3QuX2luaXRNSyA/IG9iamVjdC5faW5pdE1LKCkgOiBjb21tb25Jbml0KG9iamVjdCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9pbml0LmpzXG4gKiovIiwiZnVuY3Rpb24gUHNldWRvTWFwKCkge31cblxuLy8gUHNldWRvTWFwIHNpbXVsYXRlcyBXZWFrTWFwIGJlaGF2aW9yIHdpdGggTygxKSBzZWFyY2ggY29tcGxleGl0eVxuLy8gaXQncyBuZWVkZWQgZm9yIEBJRTkgYW5kIEBJRTEwXG5ub2ZuLmFzc2lnbihQc2V1ZG9NYXAucHJvdG90eXBlLCB7XG5cdGdldChvYmopIHtcblx0XHRyZXR1cm4gb2JqLm1hdHJlc2hrYURhdGE7XG5cdH0sXG5cdHNldChvYmosIGRhdGEpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbWF0cmVzaGthRGF0YScsIHtcblx0XHRcdHZhbHVlOiBkYXRhLFxuXHRcdFx0ZW51bWVyYWJsZTogZmFsc2UsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdFx0fSk7XG5cdH0sXG5cdGhhcyhvYmopIHtcblx0XHRyZXR1cm4gJ21hdHJlc2hrYURhdGEnIGluIG9iajtcblx0fVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IG5ldyBQc2V1ZG9NYXAoKSA6IG5ldyBXZWFrTWFwKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCBldmVudHMgPSBkZWYuZXZlbnRzW25hbWVdO1xuXG5cdGlmIChldmVudHMpIHtcblx0XHRjb25zdCBhcmdzID0gbm9mbi5zbGljZShhcmd1bWVudHMsIDIpLFxuXHRcdFx0bCA9IGV2ZW50cy5sZW5ndGgsXG5cdFx0XHRbYTEsIGEyLCBhM10gPSBhcmdzO1xuXG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0ZXY7XG5cblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMTpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAyOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAzOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufVxuXG50cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0ge1xuXHRpbmZvOiB7fSxcblx0bmFtZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmaW5lUHJvcChvYmplY3QsIGtleSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIGRvIG5vdGhpbmdcblx0aWYgKCFkZWYpIHJldHVybjtcblxuXG5cdGlmICghZGVmLnByb3BzW2tleV0pIHtcblx0XHRjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzW2tleV0gPSB7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdGJpbmRpbmdzOiBudWxsXG5cdFx0fTtcblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQoKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLmdldHRlciA/IHByb3BEZWYuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHByb3BEZWYudmFsdWU7XG5cdFx0XHR9LFxuXHRcdFx0c2V0KHYpIHtcblx0XHRcdFx0cmV0dXJuIHByb3BEZWYuc2V0dGVyID8gcHJvcERlZi5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogc2V0KG9iamVjdCwga2V5LCB2LCB7XG5cdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5cbi8qZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0Y29yZS5fZGVmaW5lU3BlY2lhbCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5LCBub0FjY2Vzc29ycykge1xuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcgfHwgIW1hcC5oYXMob2JqZWN0KSkgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdFx0c3BlY2lhbFByb3BzID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV07XG5cblx0XHRpZiAoIXNwZWNpYWxQcm9wcykge1xuXHRcdFx0c3BlY2lhbFByb3BzID0gb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0gPSB7XG5cdFx0XHRcdCRub2RlczogY29yZS4kKCksXG5cdFx0XHRcdHZhbHVlOiBvYmplY3Rba2V5XSxcblx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRzZXR0ZXI6IG51bGwsXG5cdFx0XHRcdG1lZGlhdG9yOiBudWxsXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoIW5vQWNjZXNzb3JzICYmIGtleSAhPSAnc2FuZGJveCcpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzcGVjaWFsUHJvcHMuZ2V0dGVyID8gc3BlY2lhbFByb3BzLmdldHRlci5jYWxsKG9iamVjdCkgOiBzcGVjaWFsUHJvcHMudmFsdWU7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHYpIHtcblx0XHRcdFx0XHRcdHNwZWNpYWxQcm9wcy5zZXR0ZXIgPyBzcGVjaWFsUHJvcHMuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IGNvcmUuc2V0KG9iamVjdCwga2V5LCB2LCB7XG5cdFx0XHRcdFx0XHRcdGZyb21TZXR0ZXI6IHRydWVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHNwZWNpYWxQcm9wcztcblx0fTtcbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZmluZXByb3AuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IHsgcHJvcHMsIGV2ZW50cyB9ID0gZGVmLFxuXHRcdHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG5cdGlmICghcHJvcERlZikge1xuXHRcdG9iamVjdFtrZXldID0gdmFsdWU7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG5cblx0Ly8gVE9ETyBOT1QgUkVRVUlSRURcblx0ZXZ0ID0gbm9mbi5hc3NpZ24oZXZ0LCB7XG5cdFx0dmFsdWUsXG5cdFx0a2V5LFxuXHRcdHByZXZpb3VzVmFsdWVcblx0fSk7XG5cblx0cHJvcERlZi52YWx1ZSA9IHZhbHVlO1xuXG5cdGlmIChwcmV2aW91c1ZhbHVlICE9PSB2YWx1ZSkge1xuXHRcdGlmIChldmVudHNbYGNoYW5nZToke2tleX1gXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGBjaGFuZ2U6JHtrZXl9YCwgZXZ0KTtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBldnQpO1xuXHRcdH1cblxuXHRcdGlmIChldmVudHMuY2hhbmdlKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ2NoYW5nZScsIGV2dCk7XG5cdFx0fVxuXHR9XG59XG5cbi8qZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIHNldDtcblxuXHRjb3JlLmdldCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5KSB7XG5cdFx0cmV0dXJuIG9iamVjdCAmJiBvYmplY3Rba2V5XTtcblx0fTtcblxuXHQvLyBzZXQgbWV0aG9kIGlzIHRoZSBtb3N0IG9mdGVuIHVzZWQgbWV0aG9kXG5cdC8vIHdlIG5lZWQgdG8gb3B0aW1pemUgaXQgYXMgZ29vZCBhcyBwb3NzaWJsZVxuXHRzZXQgPSBjb3JlLnNldCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2LCBldnQpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIHR5cGUgPSB0eXBlb2Yga2V5LFxuXHRcdFx0X2lzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpO1xuXHRcdFx0fSxcblx0XHRcdG9iamVjdERhdGEsXG5cdFx0XHRzcGVjaWFsLFxuXHRcdFx0ZXZlbnRzLFxuXHRcdFx0cHJldlZhbCxcblx0XHRcdG5ld1YsXG5cdFx0XHRpLFxuXHRcdFx0X2V2dCxcblx0XHRcdGlzQ2hhbmdlZCxcblx0XHRcdHRyaWdnZXJDaGFuZ2U7XG5cblx0XHRpZiAodHlwZSA9PSAndW5kZWZpbmVkJykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGlmICh0eXBlID09ICdvYmplY3QnKSB7XG5cdFx0XHRmb3IgKGkgaW4ga2V5KSB7XG5cdFx0XHRcdGlmIChrZXkuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRzZXQob2JqZWN0LCBpLCBrZXlbaV0sIHYpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0fVxuXG5cdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KTtcblxuXHRcdGlmICghb2JqZWN0RGF0YSB8fCAhb2JqZWN0RGF0YS5zcGVjaWFsW2tleV0pIHtcblx0XHRcdG9iamVjdFtrZXldID0gdjtcblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0fVxuXG5cdFx0c3BlY2lhbCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldO1xuXHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzO1xuXG5cdFx0cHJldlZhbCA9IHNwZWNpYWwudmFsdWU7XG5cblx0XHRpZiAoc3BlY2lhbC5tZWRpYXRvciAmJiB2ICE9PSBwcmV2VmFsICYmICghZXZ0IHx8ICFldnQuc2tpcE1lZGlhdG9yICYmICFldnQuZnJvbU1lZGlhdG9yKSkge1xuXHRcdFx0bmV3ViA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdWID0gdjtcblx0XHR9XG5cblx0XHRpc0NoYW5nZWQgPSBuZXdWICE9PSBwcmV2VmFsO1xuXG5cdFx0X2V2dCA9IHtcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2dCxcblx0XHRcdHZhbHVlOiBuZXdWLFxuXHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldlZhbCxcblx0XHRcdGtleToga2V5LFxuXHRcdFx0bm9kZTogc3BlY2lhbC4kbm9kZXNbMF0gfHwgbnVsbCxcblx0XHRcdCRub2Rlczogc3BlY2lhbC4kbm9kZXMsXG5cdFx0XHRzZWxmOiBvYmplY3QsXG5cdFx0XHRpc0NoYW5nZWQ6IGlzQ2hhbmdlZFxuXHRcdH07XG5cblx0XHRpZiAoZXZ0ICYmIHR5cGVvZiBldnQgPT0gJ29iamVjdCcpIHtcblx0XHRcdGZvciAoaSBpbiBldnQpIHtcblx0XHRcdFx0X2V2dFtpXSA9IF9ldnRbaV0gfHwgZXZ0W2ldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IF9ldnQuZm9yY2UpICYmICFfZXZ0LnNpbGVudDtcblxuXHRcdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0XHRldmVudHNbJ2JlZm9yZWNoYW5nZTonICsga2V5XSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdiZWZvcmVjaGFuZ2U6JyArIGtleSwgX2V2dCk7XG5cblx0XHRcdGV2ZW50cy5iZWZvcmVjaGFuZ2UgJiYgY29yZS5fZmFzdFRyaWdnZXIob2JqZWN0LCAnYmVmb3JlY2hhbmdlJywgX2V2dCk7XG5cdFx0fVxuXG5cdFx0c3BlY2lhbC52YWx1ZSA9IG5ld1Y7XG5cblx0XHRpZiAoaXNDaGFuZ2VkIHx8IF9ldnQuZm9yY2UgfHwgX2V2dC5mb3JjZUhUTUwgfHwgbmV3ViAhPT0gdiAmJiAhX2lzTmFOKG5ld1YpKSB7XG5cdFx0XHRpZiAoIV9ldnQuc2lsZW50SFRNTCkge1xuXHRcdFx0XHRldmVudHNbJ19ydW5iaW5kaW5nczonICsga2V5XSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdfcnVuYmluZGluZ3M6JyArIGtleSwgX2V2dCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRyaWdnZXJDaGFuZ2UpIHtcblx0XHRcdGV2ZW50c1snY2hhbmdlOicgKyBrZXldICYmIGNvcmUuX2Zhc3RUcmlnZ2VyKG9iamVjdCwgJ2NoYW5nZTonICsga2V5LCBfZXZ0KTtcblxuXHRcdFx0ZXZlbnRzLmNoYW5nZSAmJiBjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdjaGFuZ2UnLCBfZXZ0KTtcblx0XHR9XG5cblx0XHRpZiAoKGlzQ2hhbmdlZCB8fCBfZXZ0LmZvcmNlKSAmJiAhX2V2dC5za2lwTGlua3MpIHtcblx0XHRcdGV2ZW50c1snX3J1bmRlcGVuZGVuY2llczonICsga2V5XSAmJlxuXHRcdFx0XHRjb3JlLl9mYXN0VHJpZ2dlcihvYmplY3QsICdfcnVuZGVwZW5kZW5jaWVzOicgKyBrZXksIF9ldnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH07XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL3JlbW92ZWxpc3RlbmVyJztcbi8vIFJFRkFDVE9SLCBET05UIFRSSUdHRVIgQURERVZFTlQsIFJFTU9WRUVWRU5UXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gcmVtb3ZlIGxpc3RlbmVyXG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdLFxuXHRcdFx0ZXZlbnRzID0gYWxsRXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRjb25zdCByZXRhaW4gPSBbXTtcblx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcblx0XHRcdFx0aWYgKGV2ZW50LmluZm8ucGF0aFN0ciAhPT0gcGF0aFN0cikge1xuXHRcdFx0XHRcdHJldGFpbi5wdXNoKGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXRhaW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGFsbEV2ZW50c1tgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YF0gPSByZXRhaW47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgYWxsRXZlbnRzW2BfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qXG5kZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX3VuZGVsZWdhdGVMaXN0ZW5lciA9IGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lciA9XG5cdCBmdW5jdGlvbihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdHAgPSBwYXRoLFxuXHRcdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV2ZW50cyxcblx0XHRcdGk7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0aWYgKGZpcnN0S2V5KSB7XG5cdFx0XHRpZiAoZmlyc3RLZXkgPT0gJyonKSB7XG5cdFx0XHRcdGlmIChvYmplY3QuaXNNS0FycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2FkZCcsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHMuYWRkIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChvYmplY3QuaXNNS09iamVjdCkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmNoYW5nZSB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblx0XHRcdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2NoYW5nZScsIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtICYmIF91bmRlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHNbJ2NoYW5nZTonICsgZmlyc3RLZXldIHx8IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Ygb2JqZWN0W2ZpcnN0S2V5XSA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2ZpcnN0S2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmLFxuXHRcdGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXSxcblx0XHRyZXRhaW4gPSBbXTtcblxuXHQvLyBpZiBhbGwgZXZlbnRzIG5lZWQgdG8gYmUgcmVtb3ZlZFxuXHRpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKCFpbmZvIHx8ICFpbmZvLm5vVHJpZ2dlcikge1xuXHRcdFx0bm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG5cdFx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcblx0XHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdFx0Y29udGV4dDogZXZ0LmNvbnRleHRcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8vIHJlc3RvcmUgZGVmYXVsdCB2YWx1ZSBvZiBcImV2ZW50c1wiXG5cdFx0ZGVmLmV2ZW50cyA9IHt9O1xuXHR9IGVsc2UgaWYgKGV2ZW50cykgeyAvLyBpZiBldmVudHMgd2l0aCBnaXZlbiBuYW1lIGlzIGZvdW5kXG5cdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcblx0XHRcdGlmIChjYWxsYmFjayAmJiAoY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjayAmJiBjYWxsYmFjay5fY2FsbGJhY2sgIT09IGV2dC5jYWxsYmFjaylcblx0XHRcdFx0fHwgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZ0LmNvbnRleHQpKSB7XG5cdFx0XHRcdC8vIGtlZXAgZXZlbnRcblx0XHRcdFx0cmV0YWluLnB1c2goZXZ0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG5cdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuXHRcdFx0XHRcdGNvbnRleHQ6IGV2dC5jb250ZXh0XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKCFpbmZvIHx8ICFpbmZvLm5vVHJpZ2dlcikge1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgbmVzdGVkIG9iamVjdCBiYXNlZCBvbiBwYXRoIGFuZCBsYXN0VmFsdWVcbi8vIGV4YW1wbGU6IG1ha2VPYmplY3QoJ2EuYi5jJywgNDIpIC0+IHthOiB7Yjoge2M7IDQyfX19XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlT2JqZWN0KHBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcblx0cGF0aCA9IHBhdGggPyBwYXRoLnNwbGl0KCcuJykgOiBbXTtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGxldCBvYmogPSByZXN1bHQsXG5cdFx0a2V5O1xuXG5cblx0d2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdGtleSA9IHBhdGguc2hpZnQoKTtcblx0XHRvYmogPSBvYmpba2V5XSA9IHt9O1xuXHR9XG5cblx0b2JqW3BhdGguc2hpZnQoKV0gPSBsYXN0VmFsdWU7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdC8qZXNsaW50LWRpc2FibGUgKi9cblx0eGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy54JywgMik7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRvYmouYS5iID0ge1xuXHRcdFx0Yzoge1xuXHRcdFx0XHR4OiAyXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIuYyA9IHtcblx0XHRcdHg6IDJcblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aSA9IDA7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWUxMCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU5KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTgpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU3KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTUpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTQpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTMpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTIpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTEpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTApO1xuXHRcdG9iai5hID0ge1xuXHRcdFx0Yjoge1xuXHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0eDogMlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRleHBlY3QoaSkudG9FcXVhbCgxMTExMTExMTExMTEpO1xuXHR9KTtcblxuXHR4aXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5hLmIgPSBudWxsO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblx0Lyplc2xpbnQtZW5hYmxlICovXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBvYmosXG5cdFx0Y3R4LFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0Y3R4ID0ge307XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgaSA9IDA7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUyKSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBhcmdzKScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmopO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdyZW1vdmVzIGJ5IGhvd1RvUmVtb3ZlIChub3QgZG9jdW1lbnRlZCBjb3JlIGZlYXR1cmUpJywgKCkgPT4ge1xuXHRcdC8qZXNsaW50LWRpc2FibGUgKi9cblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlLFxuXHRcdFx0b25EYXRhID0ge1xuXHRcdFx0XHRob3dUb1JlbW92ZShvbkRhdGEsIG9mZkRhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2ZmRGF0YS54ID09PSA0Mjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDEnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQzXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDInKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHRcdC8qZXNsaW50LWVuYWJsZSAqL1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG5cbnhkZXNjcmliZShcIkV2ZW50cyBjb3JlOiBfYWRkRE9NTGlzdGVuZXIsIF9yZW1vdmVET01MaXN0ZW5lclwiLCAoKSA9PiB7XG5cdGxldCBxID0gKHMsIGMpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cdFx0XHRcdGV2LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFx0XHR0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG5cdFx0XHRcdFx0d2luZG93LCBudWxsLFxuXHRcdFx0XHRcdDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cblx0XHRcdFx0XHQwIC8qbGVmdCovICwgbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG5cdFx0dGFnTmFtZTogJ0RJVicsXG5cdFx0aWQ6ICdkLXRlc3QnLFxuXHRcdGlubmVySFRNTDogYFxuXHRcdFx0PGRpdiBpZD1cImQtdGVzdC0xXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YFxuXHR9KSk7XG5cblxuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSBhbmQgcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3IgKGJ1YmJsaW5nIHRlc3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQgYW5kIGRvZXNuXFwndCByZW1vdmUgZXZlbnRzIGZyb20gb3RoZXIgbm9kZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb2ZmKScsICgpID0+IHtcblx0bGV0IHEgPSAocywgYykgPT4ge1xuXHRcdGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG5cdFx0XHRcdGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblx0XHRcdFx0ZXYuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0XCJjbGlja1wiLFxuXHRcdFx0XHRcdHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcblx0XHRcdFx0XHR3aW5kb3csIG51bGwsXG5cdFx0XHRcdFx0MCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuXHRcdFx0XHRcdDAgLypsZWZ0Ki8gLCBudWxsXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcblx0XHR0YWdOYW1lOiAnRElWJyxcblx0XHRpZDogJ3MtdGVzdCcsXG5cdFx0aW5uZXJIVE1MOiBgXG5cdFx0XHQ8ZGl2IGlkPVwicy10ZXN0LTFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgXG5cdH0pKTtcblxuXHRub2RlLmNsaWNrID0gbm9kZS5jbGljayB8fCBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuXHR9XG5cblx0aXQoJ2ZpcmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRib29sID0gZmFsc2U7XG5cdFx0bWsub24oJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtay5vbignc29tZWV2ZW50JywgZik7XG5cdFx0bWsub2ZmKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHt9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbmNlXCInLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRqID0gMCxcblx0XHRcdGYxID0gZXZ0ID0+IGkrKyxcblx0XHRcdGYyID0gZXZ0ID0+IGorKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdGV4cGVjdChqKS50b0JlKDEpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1rLm9uY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdH0pO1xuXG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCAyMDApO1xuXG5cdFx0bWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbkRlYm91bmNlXCInLCAoZG9uZSkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRmMSA9IGV2dCA9PiBpKyssXG5cdFx0XHRmMiA9IGV2dCA9PiBqKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZXhwZWN0KGopLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgMjAwKTtcblxuXHRcdG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0fSk7XG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgODAwKTtcblxuXHRcdG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHR9KTtcblxuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMCxcblx0XHRcdGhhbmRsZXJzID0ge1xuXHRcdFx0XHRmb286ICgpID0+IGkrKyxcblx0XHRcdFx0YmFyOiAoKSA9PiBpKytcblx0XHRcdH07XG5cblx0XHRNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuXHRcdE1LLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0TUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXG5cdFx0TUsub2ZmKG9iaiwgaGFuZGxlcnMpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG5cblx0aXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHR0aGlzQXJnID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMDtcblxuXHRcdE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG5cdFx0XHRpKys7XG5cdFx0fSwgdHJ1ZSwgdGhpc0FyZyk7XG5cblx0XHRNSy5vbihvYmosICdiYXInLCBmdW5jdGlvbigpIHtcblx0XHRcdGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuXHRcdFx0aSsrO1xuXHRcdH0sIHRoaXNBcmcsIHRydWUpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9saWIuanNcIjogNDIsXG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDMyLFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiAzMCxcblx0XCIuL19jb3JlL2luaXQuanNcIjogMjksXG5cdFwiLi9fZG9tL2RvbGxhci1nbG9iYWwuanNcIjogNDMsXG5cdFwiLi9fZG9tL2xpYi5qc1wiOiA0NCxcblx0XCIuL19ldmVudHMvYWRkbGlzdGVuZXIuanNcIjogMjgsXG5cdFwiLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcIjogMjcsXG5cdFwiLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXCI6IDM1LFxuXHRcIi4vX2V2ZW50cy90cmlnZ2Vyb25lLmpzXCI6IDMxLFxuXHRcIi4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcIjogMzQsXG5cdFwiLi9hcnJheS5qc1wiOiA0NSxcblx0XCIuL2JpbmRlcnMuanNcIjogNDYsXG5cdFwiLi9iaW5kbm9kZS5qc1wiOiA0Nyxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiA5LFxuXHRcIi4vYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXCI6IDUsXG5cdFwiLi9icXVlcnkvX2luaXQuanNcIjogNCxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogMTIsXG5cdFwiLi9icXVlcnkvYnF1ZXJ5LmpzXCI6IDQ4LFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZS5qc1wiOiA1OCxcblx0XCIuL2JxdWVyeS9maW5kLmpzXCI6IDQ5LFxuXHRcIi4vYnF1ZXJ5L2luZGV4LmpzXCI6IDMsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMTEsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDEzLFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAxMCxcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiA4LFxuXHRcIi4vYnF1ZXJ5L29uZS5qc1wiOiA1Nyxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWwuanNcIjogNyxcblx0XCIuL2NsYXNzLmpzXCI6IDI0LFxuXHRcIi4vZXh0ZW5kLmpzXCI6IDYsXG5cdFwiLi9nZXQuanNcIjogNTAsXG5cdFwiLi9pbmRleC5qc1wiOiA1MSxcblx0XCIuL21hZ2ljLmpzXCI6IDU0LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDUyLFxuXHRcIi4vb2JqZWN0LmpzXCI6IDUzLFxuXHRcIi4vb24uanNcIjogNTUsXG5cdFwiLi9zZXQuanNcIjogMzNcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNDE7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IHtcblx0JFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2xpYi5qc1xuICoqLyIsImRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvZG9tLWxpYi9icXVlcnknXG5dLCBmdW5jdGlvbigkYikge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0LyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXHRpZih0eXBlb2Ygd2luZG93ID09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdFxuXHR2YXIgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyksXG5cdFx0ZG9sbGFyID0gdHlwZW9mIHdpbmRvdy4kID09ICdmdW5jdGlvbicgPyB3aW5kb3cuJCA6IG51bGwsXG5cdFx0dXNlRG9sbGFyID0gdHJ1ZSxcblx0XHRmbixcblx0XHRpO1xuXG5cdGlmIChkb2xsYXIpIHtcblx0XHRmbiA9IGRvbGxhci5mbiB8fCBkb2xsYXIucHJvdG90eXBlO1xuXHRcdGZvciAoaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoIWZuW25lZWRlZE1ldGhvZHNbaV1dKSB7XG5cdFx0XHRcdHVzZURvbGxhciA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodXNlRG9sbGFyICYmICFkb2xsYXIucGFyc2VIVE1MKSB7XG5cdFx0XHRkb2xsYXIucGFyc2VIVE1MID0gJGIucGFyc2VIVE1MO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR1c2VEb2xsYXIgPSBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB1c2VEb2xsYXIgPyBkb2xsYXIgOiAkYjtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kb2xsYXItZ2xvYmFsLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQge1xuXG59XG4vKmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL2RvbS1saWIvYnF1ZXJ5Jyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS9kb20tbGliL2RvbGxhci1saWInXG5dLCBmdW5jdGlvbihjb3JlLCAkYiwgJCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0Y29yZS4kID0gJCB8fCBub29wO1xuXG5cdGNvcmUuJGIgPSBjb3JlLmJhbGFsYWlrYSA9IGNvcmUuYlF1ZXJ5ID0gY29yZS5icXVlcnkgPSAkYiB8fCBub29wO1xuXG5cdGNvcmUudXNlQXMkID0gZnVuY3Rpb24oXyQpIHtcblx0XHRyZXR1cm4gY29yZS4kID0gdGhpcy4kID0gJCA9IF8kO1xuXHR9O1xuXG5cdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0IFxuXHQvLyB1c2VkIGFzIERPTSBsaWJyYXJ5IHBsYWNlaG9sZGVyIGluIG5vbi1icm93c2VyIGVudmlyb25tZW50IChlZyBub2RlanMpXG5cdGZ1bmN0aW9uIG5vb3AoKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG59KTtcbiovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2xpYi5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcnJheS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzLmpzXG4gKiovIiwiLy8gRGVib3VuY2VkIVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE5vZGUoKSB7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlLmpzXG4gKiovIiwiZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0LyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXHRpZiAodHlwZW9mIHdpbmRvdyA9PSAndW5kZWZpbmVkJykge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciBzX2NsYXNzTGlzdCA9ICdjbGFzc0xpc3QnLFxuXHRcdG5zUmVnID0gL1xcLiguKykvLFxuXHRcdGFsbEV2ZW50cyA9IHt9LFxuXHRcdG5vZGVJbmRleCA9IDAsXG5cdFx0Zm4gPSBbXTtcblxuXHRmdW5jdGlvbiAkYihzLCBjb250ZXh0KSB7XG5cdFx0cmV0dXJuIG5ldyAkYi5pKHMsIGNvbnRleHQpO1xuXHR9XG5cblx0JGIuaSA9IGZ1bmN0aW9uKHMsIGNvbnRleHQpIHtcblx0XHR2YXIgcmVzdWx0LFxuXHRcdFx0bCwgaTtcblxuXHRcdGlmIChzKSB7XG5cdFx0XHRpZiAocy5ub2RlVHlwZSB8fCBzID09IHdpbmRvdykge1xuXHRcdFx0XHRyZXN1bHQgPSBbc107XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzID09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGlmICgvPC8udGVzdChzKSkge1xuXHRcdFx0XHRcdHJlc3VsdCA9ICRiLnBhcnNlSFRNTChzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoY29udGV4dCkge1xuXHRcdFx0XHRcdFx0aWYgKGNvbnRleHQgPSAkYihjb250ZXh0KVswXSkge1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwocyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHMgaW5zdGFuY2VvZiBGdW5jdGlvbikgeyAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuXHRcdFx0XHRpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSAnbG9hZGluZycpIHtcblx0XHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXN1bHQgPSBzO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGwgPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuXHRcdGlmIChsKSB7XG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRcdHRoaXMucHVzaChyZXN1bHRbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblxuXHQkYi5mbiA9ICRiLmkuZm4gPSAkYi5pLnByb3RvdHlwZSA9IGZuO1xuXG5cdCRiLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuXHRcdHZhciBrID0gYXJndW1lbnRzLFxuXHRcdFx0aSwgaiwgbDtcblx0XHRmb3IgKGkgPSAxOyBpIDwgay5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGwgPSBrW2ldKSB7XG5cdFx0XHRcdGZvciAoaiBpbiBsKSB7XG5cdFx0XHRcdFx0b2JqW2pdID0gbFtqXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH07XG5cblx0JGIuZXh0ZW5kKGZuLCB7XG5cdFx0aXM6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdHZhciBub2RlID0gdGhpc1swXTtcblx0XHRcdHJldHVybiBub2RlID8gKG5vZGUubWF0Y2hlcyB8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBub2RlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xuXHRcdH0sXG5cdFx0b246IGZ1bmN0aW9uKG5hbWVzLCBzZWxlY3RvciwgaGFuZGxlcikge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcyxcblx0XHRcdFx0ZGVsZWdhdGUsXG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdG5hbWVzcGFjZSxcblx0XHRcdFx0bm9kZSxcblx0XHRcdFx0bm9kZUlELFxuXHRcdFx0XHRldmVudHMsXG5cdFx0XHRcdGV2ZW50LFxuXHRcdFx0XHRleGlzdCxcblx0XHRcdFx0aSwgaiwgaztcblxuXHRcdFx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGhhbmRsZXIgPSBzZWxlY3Rvcjtcblx0XHRcdFx0c2VsZWN0b3IgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc2VsZWN0b3IpIHtcblx0XHRcdFx0ZGVsZWdhdGUgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHR2YXIgcmFuZG9tSUQgPSAneCcgKyBTdHJpbmcoTWF0aC5yYW5kb20oKSkuc3BsaXQoJy4nKVsxXSxcblx0XHRcdFx0XHRcdG5vZGUgPSB0aGlzLFxuXHRcdFx0XHRcdFx0c2NvcGVTZWxlY3Rvcixcblx0XHRcdFx0XHRcdGlzO1xuXG5cdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tSUQsIHJhbmRvbUlEKTtcblxuXHRcdFx0XHRcdHNjb3BlU2VsZWN0b3IgPSAnWycgKyByYW5kb21JRCArICc9XCInICsgcmFuZG9tSUQgKyAnXCJdICc7XG5cblx0XHRcdFx0XHRpcyA9IHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKHNlbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNjb3BlU2VsZWN0b3IgKyBzZWwgKyAnLCcgKyBzY29wZVNlbGVjdG9yICsgc2VsICsgJyAqJztcblx0XHRcdFx0XHR9KS5qb2luKCcsJyk7XG5cblx0XHRcdFx0XHRpZiAoJGIoZXZ0LnRhcmdldCkuaXMoaXMpKSB7XG5cdFx0XHRcdFx0XHRoYW5kbGVyLmNhbGwobm9kZSwgZXZ0KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cblx0XHRcdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bmFtZSA9IG5hbWVzW2ldLnNwbGl0KG5zUmVnKTtcblx0XHRcdFx0bmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRcdFx0bmFtZSA9IG5hbWVbMF07XG5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IF90aGlzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0bm9kZSA9IF90aGlzW2pdO1xuXG5cdFx0XHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytub2RlSW5kZXgsXG5cdFx0XHRcdFx0XHRldmVudHMgPSBhbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBhbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gfHwgW10sXG5cdFx0XHRcdFx0XHRleGlzdCA9IGZhbHNlO1xuXG5cblx0XHRcdFx0XHRmb3IgKGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0XHRldmVudCA9IGV2ZW50c1trXTtcblxuXHRcdFx0XHRcdFx0aWYgKGhhbmRsZXIgPT0gZXZlbnQuaGFuZGxlciAmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09IGV2ZW50LnNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdFx0XHRleGlzdCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghZXhpc3QpIHtcblx0XHRcdFx0XHRcdGV2ZW50cy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0ZGVsZWdhdGU6IGRlbGVnYXRlLFxuXHRcdFx0XHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyLFxuXHRcdFx0XHRcdFx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZSxcblx0XHRcdFx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yXG5cdFx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdFx0bm9kZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGRlbGVnYXRlIHx8IGhhbmRsZXIsIGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF90aGlzO1xuXHRcdH0sXG5cdFx0b2ZmOiBmdW5jdGlvbihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0XHRcdHZhciBfdGhpcyA9IHRoaXMsXG5cdFx0XHRcdG5hbWUsXG5cdFx0XHRcdG5hbWVzcGFjZSxcblx0XHRcdFx0bm9kZSxcblx0XHRcdFx0ZXZlbnRzLFxuXHRcdFx0XHRldmVudCxcblx0XHRcdFx0aSwgaiwgaztcblxuXHRcdFx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGhhbmRsZXIgPSBzZWxlY3Rvcjtcblx0XHRcdFx0c2VsZWN0b3IgPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRuYW1lcyA9IG5hbWVzLnNwbGl0KC9cXHMvKTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdG5hbWUgPSBuYW1lc1tpXS5zcGxpdChuc1JlZyk7XG5cdFx0XHRcdG5hbWVzcGFjZSA9IG5hbWVbMV07XG5cdFx0XHRcdG5hbWUgPSBuYW1lWzBdO1xuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBfdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdG5vZGUgPSBfdGhpc1tqXTtcblxuXHRcdFx0XHRcdGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cblx0XHRcdFx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRcdFx0XHRmb3IgKGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdGV2ZW50ID0gZXZlbnRzW2tdO1xuXHRcdFx0XHRcdFx0XHRpZiAoKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT0gZXZlbnQuaGFuZGxlciB8fCBoYW5kbGVyID09IGV2ZW50LmRlbGVnYXRlKSAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT0gZXZlbnQubmFtZXNwYWNlKSAmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09IGV2ZW50LnNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcblx0XHRcdFx0XHRcdFx0XHRldmVudHMuc3BsaWNlKGstLSwgMSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG5cdFx0XHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF90aGlzO1xuXHRcdH0sXG5cdFx0YWRkOiBmdW5jdGlvbihzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gJGIodGhpcyksXG5cdFx0XHRcdG1hcCA9IHt9LFxuXHRcdFx0XHRub2RlSUQsXG5cdFx0XHRcdG5vZGUsXG5cdFx0XHRcdGk7XG5cblx0XHRcdHMgPSAkYihzKTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRub2RlID0gcmVzdWx0W2ldO1xuXHRcdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK25vZGVJbmRleDtcblx0XHRcdFx0bWFwW25vZGVJRF0gPSAxO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRub2RlID0gc1tpXTtcblx0XHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytub2RlSW5kZXg7XG5cdFx0XHRcdGlmICghbWFwW25vZGVJRF0pIHtcblx0XHRcdFx0XHRtYXBbbm9kZUlEXSA9IDE7XG5cdFx0XHRcdFx0cmVzdWx0LnB1c2gobm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXHRcdG5vdDogZnVuY3Rpb24ocykge1xuXHRcdFx0dmFyIHJlc3VsdCA9ICRiKHRoaXMpLFxuXHRcdFx0XHRpbmRleCxcblx0XHRcdFx0aTtcblxuXHRcdFx0cyA9ICRiKHMpO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAofihpbmRleCA9IHJlc3VsdC5pbmRleE9mKHNbaV0pKSkge1xuXHRcdFx0XHRcdHJlc3VsdC5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHRmaW5kOiBmdW5jdGlvbihzKSB7XG5cdFx0XHR2YXIgcmVzdWx0ID0gJGIoKTtcblx0XHRcdHRoaXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQoJGIocywgaXRlbSkpO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gc2ltcGxlIGh0bWwgcGFyc2VyXG5cdCRiLnBhcnNlSFRNTCA9IGZ1bmN0aW9uKGh0bWwpIHtcblx0XHR2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0Ly8gd3JhcE1hcCBpcyB0YWtlbiBmcm9tIGpRdWVyeVxuXHRcdFx0d3JhcE1hcCA9IHtcblx0XHRcdFx0b3B0aW9uOiBbMSwgXCI8c2VsZWN0IG11bHRpcGxlPSdtdWx0aXBsZSc+XCIsIFwiPC9zZWxlY3Q+XCJdLFxuXHRcdFx0XHRsZWdlbmQ6IFsxLCBcIjxmaWVsZHNldD5cIiwgXCI8L2ZpZWxkc2V0PlwiXSxcblx0XHRcdFx0dGhlYWQ6IFsxLCBcIjx0YWJsZT5cIiwgXCI8L3RhYmxlPlwiXSxcblx0XHRcdFx0dHI6IFsyLCBcIjx0YWJsZT48dGJvZHk+XCIsIFwiPC90Ym9keT48L3RhYmxlPlwiXSxcblx0XHRcdFx0dGQ6IFszLCBcIjx0YWJsZT48dGJvZHk+PHRyPlwiLCBcIjwvdHI+PC90Ym9keT48L3RhYmxlPlwiXSxcblx0XHRcdFx0Y29sOiBbMiwgXCI8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPlwiLCBcIjwvY29sZ3JvdXA+PC90YWJsZT5cIl0sXG5cdFx0XHRcdGFyZWE6IFsxLCBcIjxtYXA+XCIsIFwiPC9tYXA+XCJdLFxuXHRcdFx0XHRfOiBbMCwgXCJcIiwgXCJcIl1cblx0XHRcdH0sXG5cdFx0XHR3cmFwcGVyLFxuXHRcdFx0aSxcblx0XHRcdGV4O1xuXG5cdFx0aHRtbCA9IGh0bWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuXG5cdFx0d3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXHRcdHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG5cdFx0d3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cblx0XHRleCA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpO1xuXG5cdFx0d3JhcHBlciA9IGV4ICYmIHdyYXBNYXBbZXhbMV1dIHx8IHdyYXBNYXAuXztcblxuXHRcdG5vZGUuaW5uZXJIVE1MID0gd3JhcHBlclsxXSArIGh0bWwgKyB3cmFwcGVyWzJdO1xuXG5cdFx0aSA9IHdyYXBwZXJbMF07XG5cblx0XHR3aGlsZSAoaS0tKSB7XG5cdFx0XHRub2RlID0gbm9kZS5jaGlsZHJlblswXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gJGIobm9kZS5jaGlsZE5vZGVzKTtcblx0fTtcblxuXHQkYi5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUodGFnTmFtZSwgcHJvcHMpIHtcblx0XHR2YXIgZWwsIGksIGosIHByb3A7XG5cblx0XHRpZiAodHlwZW9mIHRhZ05hbWUgPT0gJ29iamVjdCcpIHtcblx0XHRcdHByb3BzID0gdGFnTmFtZTtcblx0XHRcdHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuXHRcdH1cblxuXHRcdGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuXHRcdGlmIChwcm9wcylcblx0XHRcdGZvciAoaSBpbiBwcm9wcykge1xuXHRcdFx0XHRwcm9wID0gcHJvcHNbaV07XG5cdFx0XHRcdGlmIChpID09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgcHJvcCA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdGZvciAoaiBpbiBwcm9wKVxuXHRcdFx0XHRcdFx0aWYgKHByb3AuaGFzT3duUHJvcGVydHkoaikpIHtcblx0XHRcdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKGosIHByb3Bbal0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKGkgPT0gJ3RhZ05hbWUnKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH0gZWxzZSBpZiAoaSA9PSAnY2hpbGRyZW4nICYmIHByb3ApIHtcblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgcHJvcC5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0ZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKHByb3Bbal0pKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGVsW2ldID09ICdvYmplY3QnICYmIGVsW2ldICE9PSBudWxsICYmIHR5cGVvZiBwcm9wcyA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdGZvciAoaiBpbiBwcm9wKVxuXHRcdFx0XHRcdFx0aWYgKHByb3AuaGFzT3duUHJvcGVydHkoaikpIHtcblx0XHRcdFx0XHRcdFx0ZWxbaV1bal0gPSBwcm9wW2pdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGVsW2ldID0gcHJvcDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdHJldHVybiBlbDtcblx0fTtcblxuXHQkYi5vbmUgPSBmdW5jdGlvbihzLCBjb250ZXh0KSB7XG5cdFx0cmV0dXJuICRiKHMsIGNvbnRleHQpWzBdIHx8IG51bGw7XG5cdH07XG5cblxuXHRyZXR1cm4gJGI7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9icXVlcnkuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzKSB7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGl0ZW0ucXVlcnlTZWxlY3RvckFsbChzKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9maW5kLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0KG9iamVjdCwga2V5KSB7XG5cdHJldHVybiBvYmplY3Rba2V5XTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2dldC5qc1xuICoqLyIsImltcG9ydCBNYXRyZXNoa2EgZnJvbSAnLi9tYXRyZXNoa2EnO1xuaW1wb3J0IE1hdHJlc2hrYUFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IE1hdHJlc2hrYU9iamVjdCBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9jbGFzcyc7XG5pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuXG5NYXRyZXNoa2EuQXJyYXkgPSBNYXRyZXNoa2FBcnJheTtcbk1hdHJlc2hrYS5PYmplY3QgPSBNYXRyZXNoa2FPYmplY3Q7XG5NYXRyZXNoa2EuQ2xhc3MgPSBDbGFzcztcbk1hdHJlc2hrYS5iaW5kZXJzID0gYmluZGVycztcblxuZXhwb3J0IGRlZmF1bHQgTWF0cmVzaGthO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi4vY2xhc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBDbGFzcyh7XG5cdC8vIGluc3RhbmNlIHByb3BlcmllcyBhbmQgbWV0aG9kc1xuXG59LCB7XG5cdC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG5cdGV4dGVuZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYXRyZXNoa2EvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2JqZWN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hZ2ljLmpzXG4gKiovIiwiXG4vLyAvXigoW15AXSspQCk/KCguKz8pKDo6KFteXFwoXFwpXSspPyhcXCgoLiopXFwpKT8pPyk/JC9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24oKSB7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uZShzLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHMsIGNvbnRleHQpWzBdO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbmUuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUodGFnTmFtZSwgcHJvcHMpIHtcbiAgICB2YXIgZWwsIGksIGosIHByb3A7XG5cbiAgICBpZiAodHlwZW9mIHRhZ05hbWUgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcHJvcHMgPSB0YWdOYW1lO1xuICAgICAgICB0YWdOYW1lID0gcHJvcHMudGFnTmFtZTtcbiAgICB9XG5cbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgICBpZiAocHJvcHMpXG4gICAgICAgIGZvciAoaSBpbiBwcm9wcykge1xuICAgICAgICAgICAgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICAgICAgaWYgKGkgPT0gJ2F0dHJpYnV0ZXMnICYmIHR5cGVvZiBwcm9wID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgZm9yIChqIGluIHByb3ApXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wLmhhc093blByb3BlcnR5KGopKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoaiwgcHJvcFtqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAndGFnTmFtZScpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PSAnY2hpbGRyZW4nICYmIHByb3ApIHtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgcHJvcC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjcmVhdGUocHJvcFtqXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsW2ldID09ICdvYmplY3QnICYmIGVsW2ldICE9PSBudWxsICYmIHR5cGVvZiBwcm9wcyA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGZvciAoaiBpbiBwcm9wKVxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcC5oYXNPd25Qcm9wZXJ0eShqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxbaV1bal0gPSBwcm9wW2pdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsW2ldID0gcHJvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIHJldHVybiBlbDtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==