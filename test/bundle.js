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
	
	var componentsContext = __webpack_require__(86);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/binders_spec.js": 2,
		"./bindings/bindings_parser_spec.js": 59,
		"./bindings/bindings_spec.js": 60,
		"./bindings/default_binders_spec.js": 67,
		"./bquery/add_spec.js": 68,
		"./bquery/create_spec.js": 69,
		"./bquery/events_spec.js": 70,
		"./bquery/find_spec.js": 72,
		"./bquery/init_spec.js": 73,
		"./bquery/is_spec.js": 74,
		"./bquery/not_spec.js": 75,
		"./bquery/one_spec.js": 76,
		"./bquery/parsehtml_spec.js": 77,
		"./class_spec.js": 78,
		"./events/delegated_collection_spec.js": 80,
		"./events/delegated_spec.js": 81,
		"./events/events_change_spec.js": 82,
		"./events/events_core_spec.js": 83,
		"./events/events_dom_spec.js": 84,
		"./events/events_summary_spec.js": 85
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
	
	var _srcBinders = __webpack_require__(3);
	
	var html = _srcBinders.html;
	var text = _srcBinders.text;
	var prop = _srcBinders.prop;
	var attr = _srcBinders.attr;
	var className = _srcBinders.className;
	var dataset = _srcBinders.dataset;
	var style = _srcBinders.style;
	var display = _srcBinders.display;
	
	var bindNode = __webpack_require__(18);
	
	describe('Binders', function () {
		var noDebounceFlag = { debounce: false };
		var datasetIt = document.createElement('div').dataset ? it : xit;
		var obj = void 0;
		var node = void 0;
	
		beforeEach(function () {
			obj = {};
			node = document.createElement('div');
		});
	
		it('should bind prop', function () {
			node.someProp = 'foo';
			bindNode(obj, 'x', node, prop('someProp'), noDebounceFlag);
			expect(obj.x).toEqual('foo');
			obj.x = 'bar';
			expect(node.someProp).toEqual('bar');
		});
	
		it('should bind attr', function () {
			node.setAttribute('some-attribute', 'foo');
			bindNode(obj, 'x', node, attr('someProp'), noDebounceFlag);
			expect(node.getAttribute('some-attribute')).toEqual('foo');
			node.setAttribute('some-attribute', 'bar');
			expect(node.getAttribute('some-attribute')).toEqual('bar');
		});
	
		it('should bind html', function () {
			node.innerHTML = '<i>foo</i>';
			bindNode(obj, 'x', node, html(), noDebounceFlag);
			expect(obj.x).toEqual('<i>foo</i>');
			obj.x = '<b>bar</b>';
			expect(node.innerHTML).toEqual('<b>bar</b>');
		});
	
		it('should bind text', function () {
			node.textContent = '<i>foo</i>';
			bindNode(obj, 'x', node, text(), noDebounceFlag);
			expect(obj.x).toEqual('<i>foo</i>');
			obj.x = '<b>bar</b>';
			expect(node.textContent).toEqual('<b>bar</b>');
		});
	
		it('should bind style', function () {
			node.style.textAlign = 'center';
			bindNode(obj, 'x', node, style('textAlign'), noDebounceFlag);
			expect(obj.x).toEqual('center');
			obj.x = 'right';
			expect(node.style.textAlign).toEqual('right');
		});
	
		it('should bind display', function () {
			node.style.display = 'none';
			bindNode(obj, 'x', node, display(true), noDebounceFlag);
			expect(obj.x).toEqual(false);
			obj.x = true;
			expect(node.style.display).toEqual('');
	
			node.style.display = 'none';
			bindNode(obj, 'y', node, display(false), noDebounceFlag);
			expect(obj.y).toEqual(true);
			obj.y = false;
			expect(node.style.display).toEqual('');
		});
	
		it('should bind className', function () {
			// @IE9
			node.className = 'foo';
			bindNode(obj, 'x', node, className('foo'), noDebounceFlag);
			expect(obj.x).toEqual(true);
			obj.x = false;
			expect(node.className).toEqual('');
	
			node.className = 'foo';
			bindNode(obj, 'x', node, className('foo', false), noDebounceFlag);
			expect(obj.x).toEqual(false);
			obj.x = true;
			expect(node.className).toEqual('');
		});
	
		datasetIt('should bind dataset', function () {
			// @IE9
			node.dataset.foo = 'bar';
			bindNode(obj, 'x', node, dataset('foo'), noDebounceFlag);
			expect(obj.x).toEqual('bar');
			obj.x = 'baz';
			expect(node.dataset.foo).toEqual('baz');
		});
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html = __webpack_require__(4);
	
	var display = __webpack_require__(5);
	
	var className = __webpack_require__(6);
	
	var prop = __webpack_require__(8);
	
	var attr = __webpack_require__(9);
	
	var input = __webpack_require__(10);
	
	var output = __webpack_require__(11);
	
	var textarea = __webpack_require__(12);
	
	var select = __webpack_require__(13);
	
	var progress = __webpack_require__(14);
	
	var text = __webpack_require__(15);
	
	var style = __webpack_require__(16);
	
	var dataset = __webpack_require__(17);
	
	exports.html = html;
	exports.display = display;
	exports.className = className;
	exports.prop = prop;
	exports.attr = attr;
	exports.input = input;
	exports.output = output;
	exports.textarea = textarea;
	exports.select = select;
	exports.progress = progress;
	exports.text = text;
	exports.style = style;
	exports.dataset = dataset;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = html;
	function html() {
		return {
			on: 'input', // the event name fires only in contenteditable mode
			getValue: function () {
				return this.innerHTML;
			},
			setValue: function (value) {
				this.innerHTML = '' + value;
			}
		};
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = display;
	function display() {
	    var switcher = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	    return {
	        on: null,
	        getValue: function () {
	            var value = this.style.display || window.getComputedStyle(this).getPropertyValue('display');
	            var none = value === 'none';
	            return switcher ? !none : none;
	        },
	        setValue: function (value) {
	            var style = this.style;
	
	            if (switcher) {
	                style.display = value ? '' : 'none';
	            } else {
	                style.display = value ? 'none' : '';
	            }
	        }
	    };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classlistJs = __webpack_require__(7);
	
	var toggle = _classlistJs.toggle;
	var contains = _classlistJs.contains;
	module.exports = className;
	function className(className) {
		var switcher = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
		return {
			on: null,
			getValue: function () {
				var value = contains(this, className);
				return switcher ? value : !value;
			},
			setValue: function (value) {
				toggle(this, className, switcher ? !!value : !value);
			}
		};
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	// @IE9
	
	var add = void 0;
	var remove = void 0;
	var contains = void 0;
	
	if (document.createElement('div').classList) {
	    add = function (node, name) {
	        return node.classList.add(name);
	    };
	    remove = function (node, name) {
	        return node.classList.remove(name);
	    };
	    contains = function (node, name) {
	        return node.classList.contains(name);
	    };
	} else {
	    add = function (node, name) {
	        var re = new RegExp("(^|\\s)" + name + "(\\s|$)", "g");
	        if (!re.test(node.className)) {
	            node.className = (node.className + " " + name).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	        }
	    };
	
	    remove = function (node, name) {
	        var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g");
	        node.className = node.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
	    };
	
	    contains = function (node, c) {
	        return new RegExp('(\\s|^)' + name + '(\\s|$)').test(node.className);
	    };
	}
	
	var toggle = function (node, name, switcher) {
	    if (switcher) {
	        add(node, name);
	    } else {
	        remove(node, name);
	    }
	};
	
	exports.toggle = toggle;
	exports.contains = contains;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = prop;
	function prop(propertyName) {
		return {
			on: null,
			getValue: function () {
				return this[propertyName];
			},
			setValue: function (value) {
				// in case when you're trying to set read-only property
				try {
					this[propertyName] = value;
				} catch (e) {}
			}
		};
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = attr;
	function attr(attributeName) {
		return {
			on: null,
			getValue: function () {
				return this.getAttribute(attributeName);
			},
			setValue: function (value) {
				this.setAttribute(attributeName, value);
			}
		};
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = input;
	function input(type) {
	    var on = void 0;
	    switch (type) {
	        case 'checkbox':
	            return {
	                on: 'click keyup',
	                getValue: function () {
	                    return this.checked;
	                },
	                setValue: function (value) {
	                    this.checked = value;
	                }
	            };
	        case 'radio':
	            return {
	                on: 'click keyup',
	                getValue: function () {
	                    return this.value;
	                },
	                setValue: function (value) {
	                    this.checked = typeof value != 'undefined' && this.value == value;
	                }
	            };
	        case 'submit':
	        case 'button':
	        case 'image':
	        case 'reset':
	            return {};
	        case 'hidden':
	            on = null;
	            break;
	        case 'file':
	            on = 'change';
	            break;
	
	        /*
	        case 'text':
	        case 'password':
	        case 'date':
	        case 'datetime':
	        case 'datetime-local':
	        case 'month':
	        case 'time':
	        case 'week':
	        case 'range':
	        case 'color':
	        case 'search':
	        case 'email':
	        case 'tel':
	        case 'url':
	        case 'file':
	        case 'number': */
	        default:
	            // other future (HTML6+) inputs
	            on = 'input';
	    }
	
	    return {
	        on: on,
	        getValue: function () {
	            return this.value;
	        },
	        setValue: function (value) {
	            this.value = value;
	        }
	    };
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = output;
	function output() {
	    return {
	        on: null,
	        getValue: function () {
	            return this.value || this.textContent;
	        },
	        setValue: function (value) {
	            var property = 'form' in this ? 'value' : 'textContent';
	            this[property] = value === null ? '' : '' + value;
	        }
	    };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(10);
	
	module.exports = textarea;
	function textarea() {
		return input('text');
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = select;
	function select(multiple) {
	    if (multiple) {
	        return {
	            on: 'change',
	            getValue: function () {
	                var options = this.options;
	
	                var result = [];
	
	                for (var i = 0; options.length > i; i++) {
	                    if (options[i].selected) {
	                        result.push(options[i].value);
	                    }
	                }
	
	                return result;
	            },
	            setValue: function (givenValue) {
	                var options = this.options;
	
	                var value = typeof givenValue === 'string' ? [givenValue] : givenValue;
	                for (var i = options.length - 1; i >= 0; i--) {
	                    options[i].selected = ~value.indexOf(options[i].value);
	                }
	            }
	        };
	    }
	
	    return {
	        on: 'change',
	        getValue: function () {
	            return this.value;
	        },
	        setValue: function (value) {
	            this.value = value;
	
	            if (!value) {
	                var options = this.options;
	
	                for (var i = options.length - 1; i >= 0; i--) {
	                    if (!options[i].value) {
	                        options[i].selected = true;
	                        break;
	                    }
	                }
	            }
	        }
	    };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(10);
	
	module.exports = textarea;
	function textarea() {
		return input();
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		return {
			on: 'input', // the event name fires only in contenteditable mode
			getValue: function () {
				return this.textContent;
			},
			setValue: function (value) {
				this.textContent = '' + value;
			}
		};
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = style;
	function style(property) {
	    return {
	        on: null,
	        getValue: function () {
	            return this.style[property] || window.getComputedStyle(this).getPropertyValue(property);
	        },
	        setValue: function (value) {
	            this.style[property] = value;
	        }
	    };
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	// replace namesLikeThis with names-like-this
	var toDashed = function (name) {
		return 'data-' + name.replace(/([A-Z])/g, function (u) {
			return "-" + u.toLowerCase();
		});
	};
	
	module.exports = dataset;
	function dataset(prop) {
		return {
			on: null,
			getValue: function () {
				if (this.dataset) {
					return this.dataset[prop];
				}
	
				return this.getAttribute(toDashed(prop));
			},
			setValue: function (value) {
				if (this.dataset) {
					this.dataset[prop] = value;
				} else {
					this.setAttribute(toDashed(prop), value);
				}
			}
		};
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var defineProp = __webpack_require__(21);
	
	var getNodes = __webpack_require__(27);
	
	var switchBinding = __webpack_require__(46);
	
	var bindSingleNode = __webpack_require__(51);
	
	var checkObjectType = __webpack_require__(24);
	
	var MatreshkaError = __webpack_require__(25);
	
	var delegateListener = __webpack_require__(58);
	
	var addListener = __webpack_require__(56);
	
	var removeListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(23);
	
	var unbindNode = __webpack_require__(47);
	
	// The main method of the framework: binds a property of an object to HTML node
	module.exports = bindNode;
	function bindNode(object, key, node, binder, eventOptions) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        eventOptions = binder;
	        binder = node;
	        node = key;
	        key = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'bindNode');
	    }
	
	    eventOptions = eventOptions || {};
	    binder = binder || {};
	
	    var _initMK = initMK(object);
	
	    var props = _initMK.props;
	    var _eventOptions = eventOptions;
	    var _eventOptions$optiona = _eventOptions.optional;
	    var optional = _eventOptions$optiona === undefined ? bindNode.temporaryOptionalFlag : _eventOptions$optiona;
	    var deep = _eventOptions.deep;
	    var silent = _eventOptions.silent;
	
	
	    delete bindNode.temporaryOptionalFlag;
	
	    // throw error when key is not given
	    if (!key) {
	        throw MatreshkaError('binding:falsy_key');
	    }
	
	    if (key instanceof Array) {
	        if (typeof key[0] === 'string') {
	            for (var _target = key, _index = 0, itemKey, _l = _target.length; itemKey = _target[_index], _index < _l; _index++) {
	                bindNode(object, itemKey, node, binder, eventOptions)
	            }
	            /*
	             * accept array of keys
	             * this.bindNode(['a', 'b', 'c'], node)
	             */
	
	        } else {
	            for (var _target2 = key, _index2 = 0, _ref, _l6 = _target2.length; _ref = _target2[_index2], _index2 < _l6; _index2++) {
	                var itemKey = _ref.key;
	                var itemNode = _ref.node;
	                var itemBinder = _ref.binder;
	                var itemEvent = _ref.event;
	
	                var commonEvent = node;
	                var mergedEvent = {};
	
	                if (itemEvent) {
	                    var _result = mergedEvent;
	                    // extend event object by "local" event ("event" key of an object)
	
	                    for (var _source2 = itemEvent, _keys2 = Object.keys(_source2), _l3 = _keys2.length, _i2 = 0, _key2; _i2 < _l3; _i2++) {
	                        _key2 = _keys2[_i2];
	                        _result[_key2] = _source2[_key2];
	                    }
	                }
	
	                if (commonEvent) {
	                    var _result2 = mergedEvent;
	                    // extend event object by "global" event
	
	                    for (var _source4 = commonEvent, _keys4 = Object.keys(_source4), _l5 = _keys4.length, _i4 = 0, _key4; _i4 < _l5; _i4++) {
	                        _key4 = _keys4[_i4];
	                        _result2[_key4] = _source4[_key4];
	                    }
	                }
	
	                bindNode(object, itemKey, itemNode, itemBinder, mergedEvent);
	            }
	            /*
	             * accept array of objects
	             * this.bindNode([{key, node, binder, event}], { silent: true });
	             */
	
	        }
	
	        return object;
	    }
	
	    /*
	     * accept key-node object
	     * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
	     */
	    if (typeof key === 'object') {
	        for (var _target3 = key, _keys5 = Object.keys(_target3), _i5 = 0, keyObjKey, keyObjValue, _l7 = _keys5.length; (keyObjKey = _keys5[_i5], keyObjValue = _target3[keyObjKey]), _i5 < _l7; _i5++) {
	            bindNode(object, keyObjKey, keyObjValue, node, binder)
	        }
	
	        return object;
	    }
	
	    var $nodes = getNodes(object, node);
	
	    // check node existence
	    if (!$nodes.length) {
	        if (optional) {
	            return object;
	        } else {
	            throw MatreshkaError('binding:node_missing', { key: key, node: node });
	        }
	    }
	
	    if (deep !== false) {
	        var _ret = function () {
	            var deepPath = key.split('.');
	            var deepPathLength = deepPath.length;
	
	            if (deepPathLength > 1) {
	                // handle binding when key arg includes dots (eg "a.b.c.d")
	                var changeHandler = function () {
	                    var changeEvt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	                    return switchBinding({
	                        changeEvt: changeEvt,
	                        object: object,
	                        deepPath: deepPath,
	                        $nodes: $nodes,
	                        binder: binder,
	                        eventOptions: eventOptions,
	                        bindNode: bindNode
	                    });
	                };
	
	                delegateListener(object, deepPath.slice(0, deepPathLength - 2), '_change:tree:' + deepPath[deepPathLength - 2], changeHandler);
	
	                changeHandler();
	
	                return {
	                    v: object
	                };
	            }
	        }();
	
	        if (typeof _ret === "object") return _ret.v;
	    }
	
	    var propDef = defineProp(object, key);
	
	    if (object.isMK) {
	        // if object is Matreshka instance then extend "$nodes" and "nodes" objects
	        var _object = object;
	        var $allNodes = _object.$nodes;
	        var allNodes = _object.nodes;
	
	
	        if (!$allNodes || !allNodes) {
	            throw MatreshkaError('binding:instance_nodes_missing', {
	                $nodes: $allNodes,
	                nodes: allNodes
	            });
	        }
	
	        $allNodes[key] = $allNodes[key] && $allNodes[key].length ? $allNodes[key].add($nodes) : $nodes;
	
	        allNodes[key] = $allNodes[key][0];
	    }
	
	    // handle binding for every node separately
	
	    for (var _target4 = $nodes, _index3 = 0, node, _l8 = _target4.length; node = _target4[_index3], _index3 < _l8; _index3++) {
	        bindSingleNode(object, {
	            $nodes: $nodes,
	            node: node,
	            key: key,
	            eventOptions: eventOptions,
	            binder: binder,
	            propDef: propDef
	        })
	    }
	
	    return object;
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	// this is common function which associates an object with its Matreshka definition
	function commonInit(object) {
	    var def = defs.get(object);
	    if (!def) {
	        def = {
	            // a property name of "events" object is an event name
	            // and a value is an array of event handlers
	            events: {
	                /* example: {
	                    callback: function,
	                    ctx: object,
	                    context: object2,
	                    name: "example",
	                info: {}
	                } */
	            },
	            // "props" contains special information about properties (getters, setters etc)
	            props: {
	                /* example: {
	                    value: object[key],
	                    getter: null,
	                    setter: null,
	                    mediator: null,
	                    bindings: [{
	                        node,
	                        binder,
	                        nodeHandler,
	                        objectHandler,
	                ...other required info
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
	        // TODO throw matreshkaError
	        throw new TypeError(type + ' cannot be used in this method');
	    }
	
	    // if object has _initMK method, run it
	    // else run commonInit
	    // every _initMK implementation have to run commonInit or parent's _initMK
	    // eslint-disable-next-line no-underscore-dangle
	    return object._initMatreshka ? object._initMatreshka() : commonInit(object);
	}

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var set = __webpack_require__(22);
	
	// the function defines needed descriptor for given property 
	module.exports = defineProp;
	function defineProp(object, key) {
	    var def = defs.get(object);
	
	    // if no object definition do nothing
	    if (!def) {
	        return null;
	    }
	
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
	
	    return def.props[key];
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var triggerOne = __webpack_require__(23);
	
	var checkObjectType = __webpack_require__(24);
	
	var is = __webpack_require__(26);
	
	// the function sets new value for a property
	module.exports = set;
	function set(object, key, value) {
	    var evt = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    checkObjectType(object, 'set');
	
	    // if no key or falsy key is given
	    if (!key) {
	        return object;
	    }
	
	    var def = defs.get(object);
	
	    // if no object definition then make simple assignment
	    if (!def) {
	        object[key] = value;
	        return object;
	    }
	
	    var props = def.props;
	    var events = def.events;
	
	    var propDef = props[key];
	
	    // allow to use key-value object as another variation
	    if (typeof key == 'object') {
	        for (var _target = key, _keys = Object.keys(_target), _i = 0, objKey, objVal, _l = _keys.length; (objKey = _keys[_i], objVal = _target[objKey]), _i < _l; _i++) {
	            set(object, objKey, objVal, value)
	        }
	
	        return object;
	    }
	
	    // if no property definition then make simple assignment
	    if (!propDef) {
	        object[key] = value;
	        return object;
	    }
	
	    var previousValue = propDef.value;
	    var mediator = propDef.mediator;
	
	    // possible flags
	
	    var skipMediator = evt.skipMediator;
	    var fromMediator = evt.fromMediator;
	    var force = evt.force;
	    var forceHTML = evt.forceHTML;
	    var silent = evt.silent;
	    var silentHTML = evt.silentHTML;
	    var skipLinks = evt.skipLinks;
	
	
	    var newValue = void 0;
	
	    if (mediator && !is(value, previousValue) && !skipMediator && !fromMediator) {
	        // TODO
	        newValue = special.mediator(v, prevVal, key, object);
	    } else {
	        newValue = value;
	    }
	
	    var isChanged = !is(newValue, previousValue);
	
	    // add to evt object some useful properties
	    var _result = {
	        value: newValue,
	        self: object,
	        previousValue: previousValue,
	        key: key,
	        isChanged: isChanged
	    };
	
	    for (var _source2 = evt, _keys3 = Object.keys(_source2), _l3 = _keys3.length, _i3 = 0, _key2; _i3 < _l3; _i3++) {
	        _key2 = _keys3[_i3];
	        _result[_key2] = _source2[_key2];
	    }
	
	    var extendedEvt = _result;
	
	    var triggerChange = (isChanged || force) && !silent;
	
	    // trigger beforechange:KEY and beforechange events
	    if (triggerChange) {
	        var beforechangeStr = 'beforechange';
	        var beforechangeEvtName = beforechangeStr + ':' + key;
	
	        if (events[beforechangeEvtName]) {
	            triggerOne(object, beforechangeEvtName, extendedEvt);
	        }
	
	        if (events[beforechangeStr]) {
	            triggerOne(object, beforechangeStr, extendedEvt);
	        }
	    }
	
	    propDef.value = newValue;
	
	    // triger bindings
	    if (!silentHTML && (isChanged || force || forceHTML)) {
	        var changeBindingsEvtName = '_change:bindings:' + key;
	        if (events[changeBindingsEvtName]) {
	            triggerOne(object, changeBindingsEvtName, extendedEvt);
	        }
	    }
	
	    // trigger change:KEY and change events
	    if (triggerChange) {
	        var changeStr = 'change';
	        var changeEvtName = changeStr + ':' + key;
	        if (events[changeEvtName]) {
	            triggerOne(object, changeEvtName, extendedEvt);
	        }
	
	        if (events[changeStr]) {
	            triggerOne(object, changeStr, extendedEvt);
	        }
	    }
	
	    // trigger dependencies (made with linkProps)
	    if ((isChanged || force) && !skipLinks) {
	        var changeDepsEvtName = '_change:deps:' + key;
	        if (events[changeDepsEvtName]) {
	            triggerOne(object, changeDepsEvtName, extendedEvt);
	        }
	    }
	
	    // trigger delegated events logic
	    if (isChanged) {
	        var changeDelegatedEvtName = '_change:delegated:' + key;
	        if (events[changeDelegatedEvtName]) {
	            triggerOne(object, changeDelegatedEvtName, extendedEvt);
	        }
	    }
	
	    return object;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
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
	
	
	        var i = 0;
	        var ev = void 0;
	
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var matreshkaError = __webpack_require__(25);
	
	module.exports = function (object, method) {
	    var typeofObject = object === null ? 'null' : typeof object;
	
	    if (typeofObject !== 'object') {
	        throw matreshkaError('common:object_type', {
	            type: typeofObject,
	            method: method
	        });
	    }
	};

/***/ },
/* 25 */
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
	    },
	    'binding:instance_nodes_missing': function (_ref2) {
	        var $nodes = _ref2.$nodes;
	
	        var missing = !$nodes ? '$nodes' : 'nodes';
	        return bindingErrorPrefix + ' "' + missing + '" property of Matreshka instance is missing. ' + 'It must be an object and must not be reassigned.';
	    },
	    'common:object_type': function (_ref3) {
	        var type = _ref3.type;
	        var method = _ref3.method;
	        return 'Method "' + method + '" does not accept ' + type + ' as target object';
	    }
	};
	
	module.exports = matreshkaError;
	function matreshkaError(key, data) {
	    var getError = errors[key];
	    if (!getError) {
	        throw Error('Unknown error "' + key + '"');
	    }
	
	    return new Error(errors[key](data));
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	/* eslint-disable no-self-compare, no-confusing-arrow */
	// determines whether two values are the same value
	var isPolyfill = function (v1, v2) {
	    return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
	};
	
	module.exports = Object.is || isPolyfill;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(28);
	
	var dom = __webpack_require__(30);
	
	var htmlReg = /</;
	var customSelectorReg = /:sandbox|:bound\(([^(]*)\)/;
	
	// TODO write description
	module.exports = getNodes;
	function getNodes(object, selector) {
	    var nodes = void 0;
	
	    if (typeof selector == 'string' && !htmlReg.test(selector) && customSelectorReg.test(selector)) {
	        nodes = selectNodes(object, selector);
	    } else {
	        nodes = dom.$(selector);
	    }
	
	    return nodes;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var toArray = __webpack_require__(29);
	
	var dom = __webpack_require__(30);
	
	var customSelectorReg = /\s*:bound\(([^(]*)\)\s*([\S\s]*)\s*|\s*:sandbox\s*([\S\s]*)\s*/;
	
	// TODO add description
	// TODO this function looks not good, it needs to be refactored and accelerated
	module.exports = selectNodes;
	function selectNodes(object, givenSelector) {
	    var _defs$get = defs.get(object);
	
	    var props = _defs$get.props;
	
	    var selectors = givenSelector.split(',');
	    var result = dom.$();
	
	    for (var _target4 = selectors, _index3 = 0, selector, _l4 = _target4.length; selector = _target4[_index3], _index3 < _l4; _index3++) {
	        var execResult = customSelectorReg.exec(selector);
	        if (execResult) {
	            (function () {
	                var boundKey = execResult[3] !== undefined ? 'sandbox' : execResult[1];
	                var subSelector = execResult[3] !== undefined ? execResult[3] : execResult[2];
	                var propDef = props[boundKey];
	
	                if (propDef) {
	                    var bindings = propDef.bindings;
	
	                    if (bindings) {
	                        (function () {
	                            var boundNodes = Array(bindings.length);
	
	                            // if native selector passed after :bound(KEY) is not empty string
	                            // for example ":bound(KEY) .my-selector"
	                            for (var _target = bindings, i = 0, binding, _l = _target.length; binding = _target[i], i < _l; i++) {
	                                boundNodes[i] = binding.node;
	                            }
	
	                            if (subSelector) {
	                                // if native selector contains children selector
	                                // for example ":bound(KEY) > .my-selector"
	                                if (subSelector.indexOf('>') === 0) {
	                                    for (var _target2 = boundNodes, _index = 0, node, _l2 = _target2.length; node = _target2[_index], _index < _l2; _index++) {
	                                        var randomAttr = ('m' + Math.random()).replace('.', '');
	                                        node.setAttribute(randomAttr, randomAttr);
	                                        var selected = node.querySelectorAll('[' + randomAttr + '="' + randomAttr + '"] ' + subSelector);
	                                        result = result.add(toArray(selected));
	                                        node.removeAttribute(random);
	                                    }
	                                    // selecting children
	
	                                } else {
	                                    for (var _target3 = boundNodes, _index2 = 0, node, _l3 = _target3.length; node = _target3[_index2], _index2 < _l3; _index2++) {
	                                        var selected = node.querySelectorAll(subSelector);
	                                        result = result.add(toArray(selected));
	                                    }
	                                    // if native selector doesn't contain children selector
	
	                                }
	                            } else {
	                                // if native selector is empty string just add bound nodes to result
	                                result = result.add(boundNodes);
	                            }
	                        })();
	                    }
	                }
	            })();
	        } else {
	            // if it's native selector (no custom things)
	            result = result.add(selector);
	        }
	    }
	
	    return result;
	}

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = toArray;
	function toArray(object, start) {
		var array = [],
		    l = object.length,
		    i;
	
		start = start || 0;
	
		for (i = start; i < l; i++) {
			array[i - start] = object[i];
		}
	
		return array;
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(31);
	
	var dom = {
	    $: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(32);
	
	var neededMethods = 'on off is add not find'.split(/\s/); /* global $ */
	
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(33);
	
	var extend = __webpack_require__(35);
	
	var parseHTML = __webpack_require__(36);
	
	var one = __webpack_require__(37);
	
	var create = __webpack_require__(38);
	
	var on = __webpack_require__(39);
	
	var off = __webpack_require__(42);
	
	var is = __webpack_require__(41);
	
	var add = __webpack_require__(43);
	
	var not = __webpack_require__(44);
	
	var find = __webpack_require__(45);
	
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(34);
	
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
	            // typeof nodeList returns "function" in old WebKit
	        } else if (selector instanceof Function) {
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
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	// converts HTML string to NodeList instance
	module.exports = html2nodeList;
	function html2nodeList(givenHTML) {
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
	
	    var html = givenHTML.replace(/^\s+|\s+$/g, '');
	    var node = document.createElement('div');
	    var i = void 0;
	
	    wrapMap.optgroup = wrapMap.option;
	    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	    wrapMap.th = wrapMap.td;
	
	    var ex = /<([\w:]+)/.exec(html);
	    var wrapper = ex && wrapMap[ex[1]] || wrapMap._;
	
	    node.innerHTML = wrapper[1] + html + wrapper[2];
	
	    i = wrapper[0];
	
	    while (i--) {
	        node = node.children[0];
	    }
	
	    return node.childNodes;
	}

/***/ },
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(34);
	
	var Init = __webpack_require__(33);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
	    return new Init(html2nodeList(html));
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(33);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
	    return new Init(s, context)[0];
	}

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	// creates HTML element
	// TODO get rid of it
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(40);
	
	var is = __webpack_require__(41);
	
	// the function is used when a selector is given
	function delegateHandler(evt, selector, handler) {
	    var randomID = Math.random().toString().replace('0.', 'x');
	    var scopeSelector = '[' + randomID + '="' + randomID + '"] ';
	    var splittedSelector = selector.split(',');
	
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
	function on(namesStr, selector, handler) {
	    var names = namesStr.split(/\s/);
	    var delegate = void 0;
	
	    if (typeof selector === 'function') {
	        handler = selector; // eslint-disable-line no-param-reassign
	        selector = null; // eslint-disable-line no-param-reassign
	    }
	
	    if (selector) {
	        delegate = function uniqueDelegateHandler(evt) {
	            delegateHandler.call(this, evt, selector, handler);
	        };
	    }
	
	    for (var i = 0; i < names.length; i++) {
	        var name = names[i].split(/\.(.+)/);
	        var namespace = name[1];
	        name = name[0];
	
	        for (var j = 0; j < this.length; j++) {
	            var node = this[j];
	            var nodeID = node.b$ = node.b$ || ++data.nodeIndex;
	            var events = data.allEvents[name + nodeID] = data.allEvents[name + nodeID] || [];
	
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
/* 40 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
	    nodeIndex: 0,
	    allEvents: {}
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
	    var node = this[0];
	    return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(40);
	
	// removes event handler from a set of elements
	module.exports = off;
	function off(names, selector, handler) {
	    if (typeof selector === 'function') {
	        handler = selector; // eslint-disable-line no-param-reassign
	        selector = null; // eslint-disable-line no-param-reassign
	    }
	
	    names = names.split(/\s/);
	
	    for (var i = 0; i < names.length; i++) {
	        var name = names[i].split(/\.(.+)/);
	        var namespace = name[1];
	        name = name[0];
	
	        for (var j = 0; j < this.length; j++) {
	            var node = this[j];
	            var events = data.allEvents[name + node.b$];
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(33);
	
	var data = __webpack_require__(40);
	
	// adds unique nodes to bQuery collection
	module.exports = add;
	function add(selector) {
	    var idMap = {};
	
	    var result = void 0;
	
	    selector = new Init(selector);
	
	    if (this.length) {
	        result = new Init(this);
	        for (var i = 0; i < result.length; i++) {
	            var node = result[i];
	            var nodeID = node.b$ = node.b$ || ++data.nodeIndex;
	            idMap[nodeID] = 1;
	        }
	
	        for (var _i = 0; _i < selector.length; _i++) {
	            var _node = selector[_i];
	            var _nodeID = _node.b$ = _node.b$ || ++data.nodeIndex;
	            if (!idMap[_nodeID]) {
	                idMap[_nodeID] = 1;
	                result.push(_node);
	            }
	        }
	    } else {
	        result = selector;
	    }
	
	    return result;
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(33);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(33);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var unbindNode = __webpack_require__(47);
	
	// re-adds binding when object branch is changed
	// the function is called by bindNode when something like
	// 'foo.bar.baz' is passed to it as key arg value
	module.exports = switchBinding;
	function switchBinding(_ref) {
	    var changeEvt = _ref.changeEvt;
	    var object = _ref.object;
	    var deepPath = _ref.deepPath;
	    var $nodes = _ref.$nodes;
	    var binder = _ref.binder;
	    var eventOptions = _ref.eventOptions;
	    var bindNode = _ref.bindNode;
	
	    var deepPathLength = deepPath.length;
	    var target = changeEvt.value;
	    var previousTarget = changeEvt.previousValue;
	
	
	    if (!target) {
	        target = object;
	        for (var i = 0; i < deepPathLength - 1; i++) {
	            target = target[deepPath[i]];
	        }
	    }
	
	    bindNode(target, deepPath[deepPathLength - 1], $nodes, binder, eventOptions);
	
	    // remove binding for previously used object
	    if (previousTarget && typeof previousTarget === 'object') {
	        unbindNode(previousTarget, deepPath[deepPathLength - 1], $nodes);
	    }
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(24);
	
	var defs = __webpack_require__(20);
	
	var getNodes = __webpack_require__(27);
	
	var bindNode = __webpack_require__(18);
	
	var undelegateListener = __webpack_require__(48);
	
	var removeBinding = __webpack_require__(50);
	
	var dom = __webpack_require__(30);
	
	module.exports = unbindNode;
	function unbindNode(object, key, node, eventOptions) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        eventOptions = node;
	        node = key;
	        key = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'unbindNode');
	    }
	
	    if (key instanceof Array) {
	        if (typeof key[0] === 'string') {
	            for (var _target = key, _index = 0, itemKey, _l = _target.length; itemKey = _target[_index], _index < _l; _index++) {
	                unbindNode(object, itemKey, node, eventOptions)
	            }
	            /*
	             * accept array of keys
	             * this.unbindNode(['a', 'b', 'c'], node)
	             */
	        } else {
	            for (var _target2 = key, _index2 = 0, _ref, _l2 = _target2.length; _ref = _target2[_index2], _index2 < _l2; _index2++) {
	                var itemKey = _ref.key;
	                var itemNode = _ref.node;
	
	                unbindNode(object, itemKey, itemNode, node);
	            }
	            /*
	             * acept array of objects
	             * this.unbindNode([{ key, node, binder, event }], { silent: true });
	             */
	
	        }
	
	        return object;
	    }
	
	    /*
	     * accept key-node object
	     * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
	     */
	    if (key && typeof key === 'object') {
	        for (var _target3 = key, _keys = Object.keys(_target3), _i = 0, keyObjKey, keyObjValue, _l3 = _keys.length; (keyObjKey = _keys[_i], keyObjValue = _target3[keyObjKey]), _i < _l3; _i++) {
	            unbindNode(object, keyObjKey, keyObjValue, node)
	        }
	
	        return object;
	    }
	
	    eventOptions = eventOptions || {};
	    var _eventOptions = eventOptions;
	    var deep = _eventOptions.deep;
	
	    var def = defs.get(object);
	
	    if (!def) {
	        return object;
	    }
	
	    var props = def.props;
	
	    // allow to pass null or undefined as key
	    // if passed then remove bindings of all keys for given object
	
	    if (key === null || typeof key === 'undefined') {
	        for (var _target4 = props, _keys2 = Object.keys(_target4), _i2 = 0, key, propsItem, _l4 = _keys2.length; (key = _keys2[_i2], propsItem = _target4[key]), _i2 < _l4; _i2++) {
	            unbindNode(object, key, null, eventOptions);
	        }
	
	        return object;
	    }
	
	    // remove delegated binding
	    if (deep !== false) {
	        var deepPath = key.split('.');
	        var deepPathLength = deepPath.length;
	
	        if (deepPathLength > 1) {
	            var target = object;
	
	            for (var i = 0; i < deepPathLength - 1; i++) {
	                // TODO do we need to throw error when target is falsy?
	                target = target[deepPath[i]];
	            }
	
	            // TODO BUG this may undelegate listener for all bindings with the same path (cannot reproduce)
	            undelegateListener(object, deepPath.slice(0, deepPathLength - 2), '_change:tree:' + deepPath[deepPathLength - 2]);
	
	            unbindNode(target, deepPath[deepPathLength - 1], node, eventOptions);
	
	            return object;
	        }
	    }
	
	    var propDef = props[key];
	
	    // when no propdef do nothing
	    if (!propDef) {
	        return object;
	    }
	
	    var bindings = propDef.bindings;
	
	    // if the property doesn't have any bindings do nothing
	
	    if (!bindings) {
	        return object;
	    }
	
	    // if no node is pased remove all bindings for given key
	    if (!node) {
	        for (var _target5 = bindings, _index3 = 0, binding, _l5 = _target5.length; binding = _target5[_index3], _index3 < _l5; _index3++) {
	            removeBinding({ object: object, key: key, eventOptions: eventOptions }, binding);
	        }
	
	        propDef.bindings = null;
	
	        // update nodes and $nodes for Matreshka instance
	        if (object.isMK) {
	            delete object.nodes[key];
	            delete object.$nodes[key];
	        }
	
	        return object;
	    }
	
	    var $nodes = getNodes(object, node);
	    var retainBindings = [];
	    var retainNodes = [];
	
	    // iterate over all bindngs and compare their node with given nodes
	
	    // update nodes and $nodes for Matreshka instance
	    for (var _target7 = $nodes, _index5 = 0, nodesItem, _l7 = _target7.length; nodesItem = _target7[_index5], _index5 < _l7; _index5++) {
	        for (var _target6 = bindings, _index4 = 0, binding, _l6 = _target6.length; binding = _target6[_index4], _index4 < _l6; _index4++) {
	            if (binding.node === nodesItem) {
	                removeBinding({ object: object, key: key, eventOptions: eventOptions }, binding);
	            } else {
	                retainBindings.push(binding);
	                retainNodes.push(nodesItem);
	            }
	        }
	    }
	
	    if (object.isMK) {
	        if (retainNodes.length) {
	            object.nodes[key] = retainNodes[0];
	            object.$nodes[key] = dom.$(retainNodes);
	        } else {
	            delete object.nodes[key];
	            delete object.$nodes[key];
	        }
	    }
	
	    // update bindings object
	    if (retainBindings.length) {
	        propDef.bindings = retainBindings;
	    } else {
	        propDef.bindings = null;
	    }
	
	    return object;
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var removeListener = __webpack_require__(49);
	
	module.exports = undelegateListener;
	function undelegateListener(object, givenPath, name, callback, context) {
	    var info = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];
	
	    var def = defs.get(object);
	
	    // if no definition do nothing
	    if (!def) {
	        return;
	    }
	
	    var allEvents = def.events;
	
	
	    var path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;
	
	    if (!path || !path.length) {
	        // if no path then remove listener
	        removeListener(object, name, callback, context, info);
	    } else {
	        (function () {
	            // else do all magic
	            var key = path[0];
	            var changeDelegatedEvtName = '_change:delegated:' + key;
	            var events = allEvents[changeDelegatedEvtName];
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
	                        allEvents[changeDelegatedEvtName] = retain;
	                    } else {
	                        delete allEvents[changeDelegatedEvtName];
	                    }
	                })();
	            }
	
	            if (typeof object[key] === 'object') {
	                undelegateListener(object[key], path, name, callback, context, info);
	            }
	        })();
	    }
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var triggerOne = __webpack_require__(23);
	
	// removes simple event listener to an object
	/* eslint no-shadow: ["error", { "allow": ["name", "events"] }]*/
	module.exports = removeListener;
	function removeListener(object, name, callback, context) {
	    var def = defs.get(object);
	
	    // if no definition do nothing
	    if (!def) return;
	
	    var allEvents = def.events;
	
	    var events = allEvents[name];
	    var retain = [];
	    var noTrigger = name ? name[0] === '_' : false;
	
	    // if all events need to be removed
	    if (typeof name === 'undefined') {
	        if (!noTrigger) {
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
	            // eslint-disable-next-line no-underscore-dangle
	            if (callback && callback !== evt.callback && callback._callback !== evt.callback || context && context !== evt.context) {
	                // keep event
	                retain.push(evt);
	            } else {
	                var _removeEvtData = {
	                    name: name,
	                    callback: evt.callback,
	                    context: evt.context
	                };
	
	                if (!noTrigger) {
	                    triggerOne(object, 'removeevent:' + name, _removeEvtData);
	                    triggerOne(object, 'removeevent', _removeEvtData);
	                }
	            }
	        }
	        // if events with given name are found
	
	
	        if (retain.length) {
	            allEvents[name] = retain;
	        } else {
	            delete def.events[name];
	        }
	    }
	
	    return;
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var removeListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(23);
	
	var spaceReg = /\s+/;
	
	// the function removes single binding for single object
	// called by unbindNode
	module.exports = removeBinding;
	function removeBinding(_ref, _ref2) {
	    var object = _ref.object;
	    var key = _ref.key;
	    var eventOptions = _ref.eventOptions;
	    var options = _ref2.options;
	    var binder = _ref2.binder;
	    var node = _ref2.node;
	    var nodeHandler = _ref2.nodeHandler;
	    var objectHandler = _ref2.objectHandler;
	    var destroy = binder.destroy;
	    var on = binder.on;
	    var silent = eventOptions.silent;
	
	    // if "on" is function disable it
	    // we cannot turn off custom listener defined by a programmer
	    // programmer needs to remove custom listener maually via binder.destroy
	
	    if (typeof on === 'function') {
	        nodeHandler.disabled = true;
	    } else if (typeof on === 'string') {
	        for (var _target = on.split(spaceReg), _index = 0, evtName, _l = _target.length; evtName = _target[_index], _index < _l; _index++) {
	            node.removeEventListener(evtName, nodeHandler)
	        }
	        // remove DOM event listener
	        // removeEventListener is faster than "on" method from any DOM library
	
	    }
	
	    // remove object event listener
	    removeListener(object, '_change:bindings:' + key, objectHandler);
	
	    // if binder.destroy is given call it
	    if (destroy) {
	        destroy.call(node, options);
	    }
	
	    // fire events
	    if (!silent) {
	        var _result = {
	            key: key,
	            node: node
	        };
	
	        for (var _source2 = eventOptions, _keys2 = Object.keys(_source2), _l3 = _keys2.length, _i2 = 0, _key2; _i2 < _l3; _i2++) {
	            _key2 = _keys2[_i2];
	            _result[_key2] = _source2[_key2];
	        }
	
	        var extendedEventOptions = _result;
	
	        triggerOne(object, 'unbind:' + key, extendedEventOptions);
	        triggerOne(object, 'unbind', extendedEventOptions);
	    }
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(52);
	
	var runNodeHandler = __webpack_require__(54);
	
	var runObjectHandler = __webpack_require__(55);
	
	var triggerOne = __webpack_require__(23);
	
	var addListener = __webpack_require__(56);
	
	var debounce = __webpack_require__(57);
	
	var set = __webpack_require__(22);
	
	var spaceReg = /\s+/;
	
	// handles binding for single property & node
	// the function is used at bindNode
	module.exports = bindSingleNode;
	function bindSingleNode(object, _ref) {
	    var givenBinder = _ref.binder;
	    var key = _ref.key;
	    var $nodes = _ref.$nodes;
	    var node = _ref.node;
	    var eventOptions = _ref.eventOptions;
	    var propDef = _ref.propDef;
	    var silent = eventOptions.silent;
	    var assignDefaultValue = eventOptions.assignDefaultValue;
	    var debounceOption = eventOptions.debounce;
	    // create bindings array in property definition object
	
	    var bindings = propDef.bindings = propDef.bindings || []; // eslint-disable-line no-param-reassign
	    var value = propDef.value;
	
	    var bindingOptions = {
	        self: object,
	        key: key,
	        value: value,
	        $nodes: $nodes,
	        node: node
	    };
	    var isUndefined = typeof value === 'undefined';
	    var binder = void 0;
	    var objectHandler = void 0;
	    var nodeHandler = void 0;
	
	    // get actual binder
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
	
	    var _binder = binder;
	    var getValue = _binder.getValue;
	    var setValue = _binder.setValue;
	    var on = _binder.on;
	    var initialize = _binder.initialize;
	
	    // call binder.initialize
	
	    if (initialize) {
	        initialize.call(node, bindingOptions);
	    }
	
	    // calls getValue immediately and reassign a property
	    // when all required conditions are met for this
	    if (getValue && (isUndefined && assignDefaultValue !== false || assignDefaultValue === true)) {
	        value = getValue.call(node, bindingOptions);
	        isUndefined = typeof value === 'undefined';
	
	        var _result2 = { fromNode: true };
	
	        for (var _source4 = eventOptions, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
	            _key4 = _keys4[_i4];
	            _result2[_key4] = _source4[_key4];
	        }
	
	        set(object, key, value, _result2);
	    }
	
	    // add needed event handlers the object when setValue is given
	    if (setValue) {
	        objectHandler = function () {
	            return runObjectHandler({
	                node: node,
	                propDef: propDef,
	                binder: binder,
	                bindingOptions: bindingOptions,
	                eventOptions: eventOptions
	            });
	        };
	
	        // by default debouncing is on
	        // it can be turned off by passing debounce=false to event object
	        if (debounceOption !== false) {
	            var delay = typeof debounceOption === 'number' ? debounceOption : 0;
	            objectHandler = debounce(objectHandler, delay);
	        }
	
	        addListener(object, '_change:bindings:' + key, objectHandler);
	
	        if (!isUndefined) {
	            objectHandler();
	        }
	    }
	
	    // add needed event handlers the node when getValue & on are given
	    if (getValue && on) {
	        nodeHandler = function (domEvent) {
	            // nodeHandler.disabled = true is set in unbindNode
	            // we cannot "turn off" binder.on when its value is function
	            // developer needs to clean memory (turn off callback) manualy in binder.destroy
	            if (!nodeHandler.disabled) {
	                runNodeHandler({
	                    domEvent: domEvent,
	                    object: object,
	                    key: key,
	                    node: node,
	                    propDef: propDef,
	                    binder: binder,
	                    bindingOptions: bindingOptions
	                });
	            }
	        };
	
	        // TODO throw error when "on" and maybe other binder properties has wrong type
	        if (typeof on === 'function') {
	            on.call(node, nodeHandler, bindingOptions);
	        } else if (typeof on === 'string') {
	            for (var _target = on.split(spaceReg), _index = 0, evtName, _l5 = _target.length; evtName = _target[_index], _index < _l5; _index++) {
	                node.addEventListener(evtName, nodeHandler)
	            }
	            // addEventListener is faster than "on" method from any DOM library
	
	        }
	    }
	
	    // add binding data to bindings array
	    bindings.push({
	        on: on,
	        node: node,
	        binder: binder,
	        objectHandler: objectHandler,
	        nodeHandler: nodeHandler,
	        bindingOptions: bindingOptions
	    });
	
	    // fire events
	    if (!silent) {
	        var _result3 = {
	            key: key,
	            node: node
	        };
	
	        for (var _source6 = eventOptions, _keys6 = Object.keys(_source6), _l7 = _keys6.length, _i6 = 0, _key6; _i6 < _l7; _i6++) {
	            _key6 = _keys6[_i6];
	            _result3[_key6] = _source6[_key6];
	        }
	
	        var extendedEventOptions = _result3;
	
	        triggerOne(object, 'bind:' + key, extendedEventOptions);
	        triggerOne(object, 'bind', extendedEventOptions);
	    }
	}

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(53);
	
	module.exports = function (node) {
	    var result = void 0;
	
	    for (var i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(10);
	
	var textarea = __webpack_require__(12);
	
	var select = __webpack_require__(13);
	
	var progress = __webpack_require__(14);
	
	var output = __webpack_require__(11);
	
	module.exports = [function (node) {
	    switch (node.tagName) {
	        case 'INPUT':
	            return input(node.type);
	        case 'TEXTAREA':
	            return textarea();
	        case 'SELECT':
	            return select(node.multiple);
	        case 'PROGRESS':
	            return progress();
	        case 'OUTPUT':
	            return output();
	        default:
	            return null;
	    }
	}];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(26);
	
	var set = __webpack_require__(22);
	
	// this function is called when bound node is changed
	module.exports = runNodeHandler;
	function runNodeHandler(_ref) {
	    var _ref$domEvent = _ref.domEvent;
	    var domEvent = _ref$domEvent === undefined ? {} : _ref$domEvent;
	    var object = _ref.object;
	    var key = _ref.key;
	    var node = _ref.node;
	    var propDef = _ref.propDef;
	    var binder = _ref.binder;
	    var bindingOptions = _ref.bindingOptions;
	
	    var previousValue = propDef.value;
	    var which = domEvent.which;
	    var target = domEvent.target;
	    var getValue = binder.getValue;
	    var _result = {
	        previousValue: previousValue,
	        domEvent: domEvent,
	        originalEvent: domEvent.originalEvent || domEvent, // jQuery thing
	        // will throw "preventDefault is not a function" when domEvent is empty object
	        preventDefault: function () {
	            return domEvent.preventDefault();
	        },
	        // will throw "stopPropagation is not a function" when domEvent is empty object
	        stopPropagation: function () {
	            return domEvent.stopPropagation();
	        },
	        which: which,
	        target: target
	    };
	
	    for (var _source2 = bindingOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	        _key2 = _keys2[_i2];
	        _result[_key2] = _source2[_key2];
	    }
	
	    var value = getValue.call(node, _result);
	
	    if (!is(value, previousValue)) {
	        // TODO add description of a hack
	        // why do we need changedNode, onChangeValue, binder?
	        set(object, key, value, {
	            fromNode: true,
	            changedNode: node,
	            onChangeValue: value,
	            binder: binder
	        });
	    }
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';
	
	// this function is called when property value is changed
	module.exports = runObjectHandler;
	function runObjectHandler(_ref) {
	    var node = _ref.node;
	    var propDef = _ref.propDef;
	    var binder = _ref.binder;
	    var bindingOptions = _ref.bindingOptions;
	    var eventOptions = _ref.eventOptions;
	    var value = propDef.value;
	    var onChangeValue = eventOptions.onChangeValue;
	    var changedNode = eventOptions.changedNode;
	    var evtBinder = eventOptions.binder;
	    var setValue = binder.setValue;
	    // dirty hack for https://github.com/matreshkajs/matreshka/issues/19
	
	    var dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? String(value) : value;
	
	    if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
	        return;
	    }
	
	    var _result = { value: value };
	
	    for (var _source2 = bindingOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	        _key2 = _keys2[_i2];
	        _result[_key2] = _source2[_key2];
	    }
	
	    setValue.call(node, value, _result);
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var triggerOne = __webpack_require__(23);
	
	var defineProp = __webpack_require__(21);
	
	// property modifier event regexp
	var propModEventReg = /^_change:deps:|^_change:bindings:|^_change:delegated:|^_change:tree:|^change:|^beforechange:/;
	
	// adds simple event listener
	// used as core of event engine
	/* eslint no-shadow: ["error", { "allow": ["evt"] }]*/
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
/* 57 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = debounce;
	function debounce(func, givenDelay, thisArg) {
	    var timeout = void 0;
	    var delay = void 0;
	    if (typeof delay !== 'number') {
	        thisArg = givenDelay; // eslint-disable-line no-param-reassign
	        delay = 0;
	    }
	
	    delay = givenDelay || 0;
	
	    return function debounced() {
	        var args = arguments;
	        var a1 = args[0];
	        var a2 = args[1];
	
	        var argsLength = args.length;
	        var callContext = thisArg || this;
	
	        clearTimeout(timeout);
	
	        timeout = setTimeout(function () {
	            switch (argsLength) {
	                case 0:
	                    func.call(callContext);
	                    break;
	                case 1:
	                    func.call(callContext, a1);
	                    break;
	                case 2:
	                    func.call(callContext, a1, a2);
	                    break;
	                default:
	                    func.apply(callContext, args);
	            }
	        }, delay);
	    };
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(56);
	
	var undelegateListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(23);
	
	var defs = __webpack_require__(20);
	
	var is = __webpack_require__(26);
	
	var treeChangeEvtReg = /^_change:tree:/; /* eslint no-use-before-define: ["error", { "functions": false }]*/
	
	
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
	
	    // trigger tree change event which is used by bindings logic
	    if (treeChangeEvtReg.test(name)) {
	        var changeKey = name.replace(treeChangeEvtReg, '');
	
	        if (previousValue && !is(previousValue[changeKey], value[changeKey])) {
	            var _defs$get = defs.get(value);
	
	            var events = _defs$get.events;
	
	            var treeChangeEvtName = '_change:tree:' + changeKey;
	            var changeEvents = events[treeChangeEvtName];
	            if (changeEvents) {
	                triggerOne(value, treeChangeEvtName, {
	                    previousValue: previousValue[changeKey],
	                    value: value[changeKey]
	                });
	            }
	        }
	    }
	}
	
	module.exports = delegateListener;
	function delegateListener(object, givenPath, name, callback, context) {
	    // if typeof path is string and path is not empty string then split it
	    var path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;
	
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
	
	        // the event is triggered by "set"
	        addListener(object, '_change:delegated:' + key, changeHandler, null, {
	            delegatedData: delegatedData,
	            pathStr: pathStr
	        });
	
	        // call handler manually
	        changeHandler({
	            value: object[key]
	        }, delegatedData);
	    }
	}

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';
	
	xdescribe('Bindings parser', function () {
	    it('should bind HTML', function () {
	        var node = q('<span>{{x}}</span>'),
	            object = {};
	
	        magic.parseBindings(object, node);
	        object.x = 'hi';
	        expect(node.firstChild.innerHTML).toEqual(object.x);
	    });
	
	    it('should bind HTML using Matreshka instance method', function () {
	        var node = q('<span>{{x}}</span>'),
	            mk = new MK();
	
	        mk.parseBindings(node);
	        mk.x = 'hi';
	        expect(node.firstChild.innerHTML).toEqual(mk.x);
	    });
	
	    it('should bind values', function () {
	        var node = q('<input value="{{x}}">'),
	            object = {};
	        magic.parseBindings(object, node);
	        object.x = 'hey';
	        expect(node.value).toEqual(object.x);
	    });
	
	    it('should bind checked', function () {
	        var node = q('<input type="checkbox" checked="{{x}}">'),
	            object = {};
	        magic.parseBindings(object, node);
	        object.x = true;
	        expect(node.checked).toEqual(object.x);
	    });
	
	    it('should bind textareas', function () {
	        var node = q('<textarea value="{{x}}"></textarea>'),
	            object = {};
	        magic.parseBindings(object, node);
	        object.x = 'foo';
	        expect(node.value).toEqual(object.x);
	    });
	
	    it('should bind complex attrs', function () {
	        window.ololosha = true;
	        var node = q('<a href="{{x}}/{{y}}"></a>'),
	            object = {};
	        magic.parseBindings(object, node);
	        object.x = 'bar';
	        object.y = 'baz';
	        expect(node.getAttribute('href')).toEqual(object.x + '/' + object.y);window.ololosha = false;
	    });
	
	    it('should bind complex values', function () {
	        var node = q('<input value="{{x}} and {{y}}">'),
	            object = {};
	        magic.parseBindings(object, node);
	        object.x = 'foo';
	        object.y = 'bar';
	        expect(node.value).toEqual(object.x + ' and ' + object.y);
	    });
	
	    it('shouldnt create additional properties', function () {
	        var node = q('<input value="{{x}} and {{y}}">'),
	            object = {};
	        magic.parseBindings(object, node);
	        object.x = 'bar';
	        object.y = 'baz';
	        expect(node.value).toEqual(object.x + ' and ' + object.y);
	        expect(Object.keys(object)).toEqual(['x', 'y']);
	    });
	
	    it('should bind nested nodes', function () {
	        var node = q('\n            <div>{{x}}\n                <input value="{{y}}">\n                <span>\n                    <span>\n                        <span attr="hey {{z}}"></span>\n                    </span>\n                </span>\n            </div>\n        '),
	            object = {};
	        magic.parseBindings(object, node);
	        object.x = 'foo';
	        object.y = 'bar';
	        object.z = 'baz';
	        expect(node.innerHTML.indexOf('<span>' + object.x + '</span>')).toEqual(0);
	        expect(q('input', node).value).toEqual(object.y);
	        expect(q('[attr]', node).getAttribute('attr')).toEqual('hey ' + object.z);
	        expect(Object.keys(object).sort()).toEqual(['x', 'y', 'z']);
	    });
	
	    it('should bind nested nodes and deep properties', function () {
	        var node = q('\n            <div>{{a.b}}\n                <input value="{{c.d}}">\n                <span>\n                    <span>\n                        <span attr="hey {{e.f}}"></span>\n                    </span>\n                </span>\n            </div>\n        '),
	            object = {
	            a: { b: 1 },
	            c: { d: 2 },
	            e: { f: 2 }
	        };
	        magic.parseBindings(object, node);
	        object.a.b = 'foo';
	        object.c.d = 'bar';
	        object.e.f = 'baz';
	        expect(node.innerHTML.indexOf('<span>' + object.a.b + '</span>')).toEqual(0);
	        expect(q('input', node).value).toEqual(object.c.d);
	        expect(q('[attr]', node).getAttribute('attr')).toEqual('hey ' + object.e.f);
	    });
	
	    it('works when brackets are redefined', function () {
	        var node = q('<input value="[[x]] you">'),
	            object = {},
	            defaultBrackets = magic.parserBrackets;
	
	        magic.parserBrackets = {
	            left: '[[',
	            right: ']]'
	        };
	
	        magic.parseBindings(object, node);
	        object.x = 'hey';
	        expect(node.value).toEqual(object.x + ' you');
	
	        magic.parserBrackets = defaultBrackets;
	    });
	});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	var bindOptionalNode = __webpack_require__(61);
	
	var bindSandbox = __webpack_require__(62);
	
	var unbindNode = __webpack_require__(47);
	
	var select = __webpack_require__(63);
	
	var selectAll = __webpack_require__(64);
	
	var addListener = __webpack_require__(56);
	
	var makeObject = __webpack_require__(65);
	
	var createSpy = __webpack_require__(66);
	
	describe('Bindings', function () {
	    var noDebounceFlag = { debounce: false };
	    var obj = void 0;
	    var node = void 0;
	    var binder = void 0;
	    var simulateDomEvent = void 0;
	    var initializeCall = void 0;
	    var destroyCall = void 0;
	
	    var testSimpleBind = function () {
	        var key = arguments.length <= 0 || arguments[0] === undefined ? 'x' : arguments[0];
	
	        obj[key] = 'foo';
	        expect(node.value).toEqual('foo');
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(obj[key]).toEqual('bar');
	        expect(initializeCall).toHaveBeenCalled();
	    };
	
	    var testSimpleUnbind = function () {
	        obj.x = 'foo';
	        expect(node.value).toEqual('');
	        node.value = 'baz';
	        node.ondummyevent();
	        expect(obj.x).toEqual('foo');
	        expect(destroyCall).toHaveBeenCalled();
	    };
	
	    beforeEach(function () {
	        obj = {};
	        node = document.createElement('div');
	
	        initializeCall = createSpy();
	        destroyCall = createSpy();
	
	        binder = {
	            on: function (cbc) {
	                this.ondummyevent = cbc;
	            },
	            getValue: function () {
	                return this.value;
	            },
	            setValue: function (v) {
	                this.value = v;
	            },
	            initialize: function (o) {
	                this.value = '';
	                initializeCall();
	            },
	            destroy: function () {
	                //this.ondummyevent = () => {};
	                destroyCall();
	            }
	        };
	    });
	
	    it('should debounce', function (done) {
	        bindNode(obj, 'x', node, binder);
	        obj.x = 'foo';
	        expect(node.value).toEqual('');
	        setTimeout(function () {
	            expect(node.value).toEqual('foo');
	            node.value = 'bar';
	            node.ondummyevent();
	            expect(obj.x).toEqual('bar');
	            expect(initializeCall).toHaveBeenCalled();
	            done();
	        }, 50);
	    });
	
	    it('should bind and trigger events', function () {
	        var bindCall = createSpy();
	        var bindKeyCall = createSpy();
	        addListener(obj, 'bind', bindCall);
	        addListener(obj, 'bind:x', bindKeyCall);
	        bindNode(obj, 'x', node, binder, noDebounceFlag);
	        testSimpleBind();
	        expect(bindCall).toHaveBeenCalled();
	        expect(bindKeyCall).toHaveBeenCalled();
	    });
	
	    it('should unbind and trigger events', function () {
	        var unbindCall = createSpy();
	        var unbindKeyCall = createSpy();
	        addListener(obj, 'unbind', unbindCall);
	        addListener(obj, 'unbind:x', unbindKeyCall);
	        bindNode(obj, 'x', node, binder, noDebounceFlag);
	        unbindNode(obj, 'x', node);
	        testSimpleUnbind();
	        expect(unbindCall).toHaveBeenCalled();
	        expect(unbindKeyCall).toHaveBeenCalled();
	    });
	
	    it('should bind using key-node object', function () {
	        bindNode(obj, { x: node }, binder, noDebounceFlag);
	        testSimpleBind();
	    });
	
	    it('should not unbind wne wrong node is given', function () {
	        var wrongNode = document.createElement('div');
	        bindNode(obj, 'x', node, binder, noDebounceFlag);
	        unbindNode(obj, 'x', wrongNode);
	        testSimpleBind();
	    });
	
	    it('should not unbind wne wrong key is given', function () {
	        bindNode(obj, 'x', node, binder, noDebounceFlag);
	        unbindNode(obj, 'y', node);
	        testSimpleBind();
	    });
	
	    it('should unbind when node is not given', function () {
	        bindNode(obj, 'x', node, binder, noDebounceFlag);
	        unbindNode(obj, 'x');
	        testSimpleUnbind();
	    });
	
	    it('should unbind all when neither key nor node is given', function () {
	        bindNode(obj, 'x', node, binder, noDebounceFlag);
	        unbindNode(obj);
	        testSimpleUnbind();
	    });
	
	    it('should unbind key-node object', function () {
	        bindNode(obj, { x: node }, binder, noDebounceFlag);
	        unbindNode(obj, { x: node });
	        testSimpleUnbind();
	    });
	
	    it('should bind using array of objects', function () {
	        bindNode(obj, [{ key: 'x', node: node, binder: binder }], noDebounceFlag);
	        testSimpleBind();
	    });
	
	    it('should unbind using array of objects', function () {
	        bindNode(obj, [{ key: 'x', node: node, binder: binder }], noDebounceFlag);
	        unbindNode(obj, [{ key: 'x', node: node }]);
	        testSimpleUnbind();
	    });
	
	    it('should bind a property in context object which has isMK=true property', function () {
	        obj = {
	            isMK: true,
	            nodes: {},
	            $nodes: {}
	        };
	        bindNode.call(obj, 'x', node, binder, noDebounceFlag);
	        testSimpleBind();
	        expect(obj.nodes.x).toEqual(node);
	        expect(Array.from(obj.$nodes.x)).toEqual([node]);
	    });
	
	    it('should unbind a property in context object which has isMK=true property', function () {
	        obj = {
	            isMK: true,
	            nodes: {},
	            $nodes: {}
	        };
	        bindNode.call(obj, 'x', node, binder, noDebounceFlag);
	        unbindNode.call(obj, 'x', node);
	        testSimpleUnbind();
	        expect(obj.nodes.x).toBeUndefined();
	        expect(obj.$nodes.x).toBeUndefined();
	    });
	
	    it('should bind delegated target', function () {
	        var obj = makeObject('x.y');
	        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
	        obj.x.y.z = 'foo';
	        expect(node.value).toEqual('foo');
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(obj.x.y.z).toEqual('bar');
	    });
	
	    it('should unbind delegated target', function () {
	        var obj = makeObject('x.y');
	        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
	        unbindNode(obj, 'x.y.z', node);
	        obj.x.y.z = 'foo';
	        expect(node.value).toEqual('');
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(obj.x.y.z).toEqual('foo');
	    });
	
	    it('cancels deep binding when deep=false option is passed', function () {
	        bindNode(obj, 'x.y.z', node, binder, Object.assign({
	            deep: false
	        }, noDebounceFlag));
	        testSimpleBind('x.y.z');
	    });
	
	    it('should rebind delegated target', function () {
	        var obj = makeObject('x.y.z', 'go');
	        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
	        obj.x = makeObject('y.z', 'foo');
	        expect(node.value).toEqual('foo');
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(obj.x.y.z).toEqual('bar');
	    });
	
	    it('should remove binding if delegated target is reassigned', function () {
	        var obj = makeObject('x.y');
	        bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
	        var x = obj.x;
	
	        obj.x = makeObject('y.z', 'foo');
	
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(x.y.z).not.toEqual('bar');
	        window.target = obj.x.y;
	        expect(obj.x.y.z).toEqual('bar');
	        x.y.z = 'baz';
	        expect(node.value).toEqual('bar');
	    });
	
	    it('uses custom selectors on current target', function () {
	        var obj = makeObject('x.y', 'foo');
	        var childNode = node.appendChild(document.createElement('span'));
	
	        bindNode(obj, 'sandbox', node);
	        bindNode(obj, 'x.y', ':sandbox span', binder, noDebounceFlag);
	
	        expect(childNode.value).toEqual('foo');
	        childNode.value = 'bar';
	        childNode.ondummyevent();
	        expect(obj.x.y).toEqual('bar');
	    });
	
	    it('throws error when node isn\'t there', function () {
	        expect(function () {
	            bindNode(obj, 'x');
	        }).toThrow();
	    });
	
	    it('doesn\'t throw error when node isn\'t there and optional=true is given', function () {
	        expect(function () {
	            bindNode(obj, 'x', undefined, undefined, { optional: true });
	        }).not.toThrow();
	    });
	
	    it('doesn\'t throw error with bindOptionalNode method of Matreshka when node is missing', function () {
	        expect(function () {
	            bindOptionalNode(obj, 'x');
	        }).not.toThrow();
	    });
	
	    it('selects children of sandbox', function () {
	        bindNode(obj, 'sandbox', '<div>\n                <div>\n                    <span attr="foo"></span>\n                </div>\n            </div>\n        ');
	
	        expect(select(obj, 'span').getAttribute('attr')).toEqual('foo');
	
	        expect(selectAll(obj, 'span')[0].getAttribute('attr')).toEqual('foo');
	    });
	
	    it('selects nodes with custom selector', function () {
	        bindNode(obj, 'sandbox', '<div>\n                <div>\n                    <span attr="foo"></span>\n                </div>\n            </div>\n        ');
	
	        expect(select(obj, ':sandbox span').getAttribute('attr')).toEqual('foo');
	
	        expect(select(obj, ':bound(sandbox) span').getAttribute('attr')).toEqual('foo');
	
	        expect(selectAll(obj, ':bound(sandbox) span')[0].getAttribute('attr')).toEqual('foo');
	
	        expect(selectAll(obj, ':sandbox span')[0].getAttribute('attr')).toEqual('foo');
	
	        expect(select(obj, ':sandbox table')).toEqual(null);
	
	        expect(select(obj, ':bound(sandbox) table')).toEqual(null);
	
	        expect(Array.from(selectAll(obj, ':bound(sandbox) table'))).toEqual([]);
	
	        expect(Array.from(selectAll(obj, ':sandbox table'))).toEqual([]);
	    });
	
	    it('allows to bind and rebind sandbox via bindSandbox', function () {
	        var obj = {
	            isMK: true,
	            nodes: {},
	            $nodes: {}
	        };
	        var anotherNode = document.createElement('div');
	
	        bindSandbox.call(obj, node, noDebounceFlag);
	        bindSandbox.call(obj, anotherNode, noDebounceFlag);
	
	        expect(Array.from(selectAll(obj, ':bound(sandbox)'))).toEqual([anotherNode]);
	    });
	
	    it('bindSandbox throws an error when node is missing', function () {
	        var obj = {
	            isMK: true,
	            nodes: {},
	            $nodes: {}
	        };
	
	        expect(function () {
	            bindSandbox.call(obj);
	        }).toThrow();
	    });
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	// TODO description
	module.exports = bindOptionalNode;
	function bindOptionalNode() {
	    // this hack allows to keep bindOptionalNode as compact as possible
	    // and doesn't require to flip args and suppoer all bindNode variations
	    bindNode.temporaryOptionalFlag = true;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    return bindNode.call(this, ...args);
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	var unbindNode = __webpack_require__(47);
	
	var checkObjectType = __webpack_require__(24);
	
	module.exports = bindSandbox;
	function bindSandbox(object, node, evt) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        evt = node;
	        node = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'bindSandbox');
	    }
	
	    unbindNode(object, 'sandbox', null, evt);
	    return bindNode(object, 'sandbox', node, null, evt);
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var dom = __webpack_require__(30);
	
	var selectNodes = __webpack_require__(28);
	
	var toArray = __webpack_require__(29);
	
	var checkObjectType = __webpack_require__(24);
	
	var customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/;
	
	module.exports = select;
	function select(object, selector) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        selector = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'selectAll');
	    }
	
	    if (customSelectorTestReg.test(selector)) {
	        return selectNodes(object, selector)[0] || null;
	    } else {
	        var def = defs.get(object);
	
	        if (!def || typeof selector !== 'string') {
	            return null;
	        }
	
	        var propDef = def.props.sandbox;
	
	        if (!propDef) {
	            return null;
	        }
	
	        var bindings = propDef.bindings;
	
	
	        if (bindings) {
	            var node = bindings[0].node;
	
	            return node.querySelector(selector);
	        }
	
	        return null;
	    }
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var dom = __webpack_require__(30);
	
	var selectNodes = __webpack_require__(28);
	
	var toArray = __webpack_require__(29);
	
	var checkObjectType = __webpack_require__(24);
	
	var customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/;
	
	module.exports = selectAll;
	function selectAll(object, selector) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        selector = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'selectAll');
	    }
	
	    if (customSelectorTestReg.test(selector)) {
	        return selectNodes(object, selector);
	    } else {
	        var _ret = function () {
	            var result = dom.$();
	            var def = defs.get(object);
	
	            if (!def || typeof selector !== 'string') {
	                return {
	                    v: result
	                };
	            }
	
	            var propDef = def.props.sandbox;
	
	            if (!propDef) {
	                return {
	                    v: result
	                };
	            }
	
	            var bindings = propDef.bindings;
	
	
	            if (bindings) {
	                for (var _target = bindings, _index = 0, _ref, _l = _target.length; _ref = _target[_index], _index < _l; _index++) {
	                    var node = _ref.node;
	
	                    var selected = node.querySelectorAll(selector);
	                    result = result.add(toArray(selected));
	                }
	            }
	
	            return {
	                v: result
	            };
	        }();
	
	        if (typeof _ret === "object") return _ret.v;
	    }
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	'use strict';
	
	// creates nested object based on path and lastValue
	// example: makeObject('a.b.c', 42) -> {a: {b: {c; 42}}}
	module.exports = makeObject;
	function makeObject() {
	    var givenPath = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	    var lastValue = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var path = givenPath ? givenPath.split('.') : [];
	    var result = {};
	    var obj = result;
	    var key = void 0;
	
	    while (path.length > 1) {
	        key = path.shift();
	        obj = obj[key] = {};
	    }
	
	    obj[path.shift()] = lastValue;
	
	    return result;
	}

/***/ },
/* 66 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = createSpy;
	function createSpy() {
	    var spyName = "randomName" + Math.random() + new Date().getTime();
	    var spy = function () {};
	    var spyObj = {};
	    spyObj[spyName] = spy;
	    return spyOn(spyObj, spyName);
	}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _srcBinders = __webpack_require__(3);
	
	var textarea = _srcBinders.textarea;
	var input = _srcBinders.input;
	var select = _srcBinders.select;
	var output = _srcBinders.output;
	var progress = _srcBinders.progress;
	
	var lookForBinder = __webpack_require__(52);
	
	var bindNode = __webpack_require__(18);
	
	describe('Default binders', function () {
	    var noDebounceFlag = { debounce: false };
	    var obj = void 0;
	
	    beforeEach(function () {
	        jasmine.addMatchers({
	            bindersEqual: function (util, customEqualityTesters) {
	                return {
	                    compare: function (actual, expected) {
	                        var result = {};
	                        var pass = result.pass = util.equals(actual.on, expected.on, customEqualityTesters) && util.equals('' + actual.getValue, '' + expected.getValue, customEqualityTesters) && util.equals('' + actual.setValue, '' + expected.setValue, customEqualityTesters);
	
	                        result.message = pass ? 'Binders are equal' : 'Binders are not equal';
	                        return result;
	                    }
	                };
	            }
	        });
	
	        obj = {};
	    });
	
	    it('should bind textarea', function () {
	        var node = document.createElement('textarea');
	        node.value = 'foo';
	        bindNode(obj, 'x', node, textarea(), noDebounceFlag);
	        expect(obj.x).toEqual('foo');
	        obj.x = 'bar';
	        expect(node.value).toEqual('bar');
	
	        expect(lookForBinder(node)).bindersEqual(textarea());
	    });
	
	    it('should bind progress', function () {
	        var node = document.createElement('progress');
	        node.max = 3;
	        node.value = 1;
	        bindNode(obj, 'x', node, progress(), noDebounceFlag);
	        expect(obj.x).toEqual(1);
	        obj.x = 2;
	        expect(node.value).toEqual(2);
	
	        expect(lookForBinder(node)).bindersEqual(progress());
	    });
	
	    it('should bind text input', function () {
	        var node = document.createElement('input');
	        node.type = 'text';
	        node.value = 'foo';
	        bindNode(obj, 'x', node, input('text'), noDebounceFlag);
	        expect(obj.x).toEqual('foo');
	        obj.x = 'bar';
	        expect(node.value).toEqual('bar');
	
	        expect(lookForBinder(node)).bindersEqual(input('text'));
	    });
	
	    it('should bind output', function () {
	        var node = document.createElement('output');
	        node.innerHTML = 'foo';
	        bindNode(obj, 'x', node, output(), noDebounceFlag);
	        expect(obj.x).toEqual('foo');
	        obj.x = 'bar';
	        expect(node.innerHTML).toEqual('bar');
	        expect(lookForBinder(node)).bindersEqual(output());
	    });
	
	    it('should bind select', function () {
	        var node = document.createElement('select');
	        for (var i = 0; i < 10; i++) {
	            var option = node.appendChild(document.createElement('option'));
	            option.value = '' + i;
	            if (i === 1) {
	                option.selected = true;
	            }
	        }
	
	        bindNode(obj, 'x', node, select(), noDebounceFlag);
	        expect(obj.x).toEqual('1');
	        obj.x = '5';
	        expect(node.value).toEqual('5');
	
	        expect(lookForBinder(node)).bindersEqual(select());
	    });
	
	    it('should bind select (multiple)', function () {
	        var node = document.createElement('select');
	        node.multiple = true;
	
	        for (var i = 0; i < 10; i++) {
	            var option = node.appendChild(document.createElement('option'));
	            option.value = '' + i;
	            if (i === 1 || i === 4 || i === 7) {
	                option.selected = true;
	            }
	        }
	
	        bindNode(obj, 'x', node, select(true), noDebounceFlag);
	        expect(obj.x).toEqual(['1', '4', '7']);
	        obj.x = ['2', '5', '8'];
	
	        for (var _i = 0; _i < 10; _i++) {
	            expect(node.options[_i].selected).toEqual(_i === 2 || _i === 5 || _i === 8);
	        }
	
	        expect(lookForBinder(node)).bindersEqual(select(true));
	    });
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
	describe('bQuery.fn.add', function () {
	    it('adds once', function () {
	        var el1 = document.createElement('div');
	        var el2 = document.createElement('div');
	        var el3 = document.createElement('div');
	        var el4 = document.createElement('div');
	        var el5 = document.createElement('div');
	
	        expect([...$([el1, el2, el3]).add([el2, el3, el4, el5])]).toEqual([el1, el2, el3, el4, el5]);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
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
	
	    it('extends dataset object', function () {
	        expect($.create('div', {
	            dataset: {
	                foo: 'bar'
	            }
	        }).getAttribute('data-foo')).toEqual('bar');
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-unresolved */
	
	
	var $ = __webpack_require__(32);
	
	var simulateClick = __webpack_require__(71);
	
	describe('bQuery events', function () {
	    var testSandbox = void 0;
	    var child1 = void 0;
	    var child2 = void 0;
	    var grandchild1 = void 0;
	    var handler = void 0;
	
	    beforeEach(function () {
	        testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n            <div class="child1">\n                <div class="grandchild1"></div>\n            </div>\n            <div class="child2"></div>\n        ';
	
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
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
	describe('bQuery.fn.find', function () {
	    var testSandbox = void 0;
	    var grandChild = void 0;
	
	    beforeEach(function () {
	        testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n            <div class="child">\n                <div class="grandchild"></div>\n            </div>\n        ';
	
	        grandChild = testSandbox.querySelector('.grandchild');
	    });
	
	    it('finds', function () {
	        expect([...$(testSandbox).find('.grandchild')]).toEqual([grandChild]);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
	describe('bQuery initialization', function () {
	    var testSandbox = void 0;
	
	    beforeEach(function () {
	        testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n            <div class="test">\n                <div class="test-1"></div>\n                <div class="test-2"></div>\n                <div class="test-3"></div>\n            </div>\n        ';
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
	        var children = testSandbox.querySelectorAll('*');
	        var result = $(children);
	
	        expect(children.length).toEqual(result.length);
	
	        for (var i = 0; i < children.length; i++) {
	            expect(children[i]).toEqual(result[i]);
	        }
	    });
	
	    it('Converts one element', function () {
	        var element = document.querySelector('*');
	        var result = $(element);
	
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
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
	describe('bQuery.fn.not', function () {
	    it('checks className', function () {
	        var el = document.createElement('div');
	        el.className = 'el';
	
	        expect($(el).is('.el')).toEqual(true);
	
	        expect($(el).is('.el2')).toEqual(false);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
	describe('bQuery.fn.not', function () {
	    it('excludes by selector', function () {
	        var el1 = document.createElement('div');
	        var el2 = document.createElement('div');
	        var el3 = document.createElement('div');
	
	        el2.className = 'el2';
	
	        expect([...$([el1, el2, el3]).not('.el2')]).toEqual([el1, el3]);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
	describe('bQuery.one', function () {
	    it('finds', function () {
	        var testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n        <div class="child">\n            <div class="grandchild"></div>\n        </div>\n        <div class="child2">\n            <div class="grandchild2"></div>\n        </div>\n        ';
	
	        var child = testSandbox.querySelector('.child');
	
	        expect($.one('*', testSandbox)).toEqual(child);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(32);
	
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
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(79);
	
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(35);
	
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
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(58);
	
	var undelegateListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(23);
	
	var makeObject = __webpack_require__(65);
	
	var createSpy = __webpack_require__(66);
	
	describe('Delegated events: delegateListener, undelegateListener (basic)', function test() {
	    var _this = this;
	
	    var ctx = void 0;
	    var handler = void 0;
	
	    beforeEach(function () {
	        ctx = {};
	        _this.handler = function () {};
	        handler = createSpy();
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
	        var obj = makeObject('a.b');
	        var a = obj.a;
	
	        delegateListener(obj, 'a.b', 'someevent', handler);
	        obj.a = makeObject('b');
	        triggerOne(a.b, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from old target when reassigned (a.b, reassign b)', function () {
	        var obj = makeObject('a.b');
	        var b = obj.a.b;
	
	        delegateListener(obj, 'a.b', 'someevent', handler);
	        obj.a.b = {};
	        triggerOne(b, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from old target when reassigned (a.b.c, reassign a)', function () {
	        var obj = makeObject('a.b.c');
	        var a = obj.a;
	
	        delegateListener(obj, 'a.b.c', 'someevent', handler);
	        obj.a = makeObject('b.c');
	        triggerOne(a.b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from old target when reassigned (a.b.c, reassign b)', function () {
	        var obj = makeObject('a.b.c');
	        var b = obj.a.b;
	
	        delegateListener(obj, 'a.b.c', 'someevent', handler);
	        obj.a.b = makeObject('c');
	        triggerOne(b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from old target when reassigned (a.b.c, reassign c)', function () {
	        var obj = makeObject('a.b.c');
	        var c = obj.a.c;
	
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
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(56);
	
	var delegateListener = __webpack_require__(58);
	
	var undelegateListener = __webpack_require__(48);
	
	var removeListener = __webpack_require__(49);
	
	var makeObject = __webpack_require__(65);
	
	var createSpy = __webpack_require__(66);
	
	/* eslint-disable import/no-unresolved */
	describe('Change event (simple and delegated)', function () {
	    var handler = void 0;
	
	    beforeEach(function () {
	        handler = createSpy();
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
	
	    it('fires (delegated, a.b.x)', function () {
	        var obj = makeObject('a.b.x', 1);
	
	        delegateListener(obj, 'a.b', 'change:x', handler);
	        obj.a.b.x = 2;
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('accepts null target (a.b.c, reassign b)', function () {
	        var obj = makeObject('a.b.c.x', 1);
	        delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
	            return bool = true;
	        });
	
	        expect(function () {
	            obj.a.b = null;
	        }).not.toThrow();
	    });
	});

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(56);
	
	var removeListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(23);
	
	var createSpy = __webpack_require__(66);
	
	/* eslint-disable import/no-unresolved */
	describe('Events core: addListener, removeListener, triggerOne', function () {
	    var obj = void 0;
	    var ctx = void 0;
	    var handler = void 0;
	
	    beforeEach(function () {
	        obj = {};
	        ctx = {};
	        handler = createSpy();
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
	});

/***/ },
/* 84 */
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
	        innerHTML: "\n            <div id=\"d-test-1\">\n                <div class=\"d-test-2\">\n\n                </div>\n            </div>\n        "
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
/* 85 */
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
	        innerHTML: "\n            <div id=\"s-test-1\">\n                <div class=\"s-test-2\">\n\n                </div>\n            </div>\n        "
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 51,
		"./_bindings/getnodes.js": 27,
		"./_bindings/removebinding.js": 50,
		"./_bindings/runnodehandler.js": 54,
		"./_bindings/runobjecthandler.js": 55,
		"./_bindings/selectnodes.js": 28,
		"./_bindings/switchbinding.js": 46,
		"./_core/defineprop.js": 21,
		"./_core/defs.js": 20,
		"./_core/init.js": 19,
		"./_dom/default-dollar.js": 31,
		"./_dom/index.js": 30,
		"./_events/addlistener.js": 56,
		"./_events/delegatelistener.js": 58,
		"./_events/removelistener.js": 49,
		"./_events/triggerone.js": 23,
		"./_events/undelegatelistener.js": 48,
		"./_util/checkobjecttype.js": 24,
		"./_util/debounce.js": 57,
		"./_util/is.js": 26,
		"./_util/matreshkaerror.js": 25,
		"./_util/toarray.js": 29,
		"./array.js": 87,
		"./binders/_classlist.js": 7,
		"./binders/attr.js": 9,
		"./binders/classname.js": 6,
		"./binders/dataset.js": 17,
		"./binders/display.js": 5,
		"./binders/html.js": 4,
		"./binders/index.js": 3,
		"./binders/input.js": 10,
		"./binders/output.js": 11,
		"./binders/progress.js": 14,
		"./binders/prop.js": 8,
		"./binders/select.js": 13,
		"./binders/style.js": 16,
		"./binders/text.js": 15,
		"./binders/textarea.js": 12,
		"./bindnode.js": 18,
		"./bindoptionalnode.js": 61,
		"./bindsandbox.js": 62,
		"./bquery/_data.js": 40,
		"./bquery/_html2nodelist.js": 34,
		"./bquery/_init.js": 33,
		"./bquery/add.js": 43,
		"./bquery/create.js": 38,
		"./bquery/find.js": 45,
		"./bquery/index.js": 32,
		"./bquery/is.js": 41,
		"./bquery/not.js": 44,
		"./bquery/off.js": 42,
		"./bquery/on.js": 39,
		"./bquery/one.js": 37,
		"./bquery/parsehtml.js": 36,
		"./calc.js": 95,
		"./class.js": 79,
		"./defaultbinders.js": 53,
		"./extend.js": 35,
		"./index.js": 88,
		"./lookforbinder.js": 52,
		"./magic.js": 91,
		"./matreshka/index.js": 89,
		"./object/index.js": 90,
		"./on.js": 92,
		"./parsebindings.js": 93,
		"./select.js": 63,
		"./selectall.js": 64,
		"./set.js": 22,
		"./unbindnode.js": 47
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
	webpackContext.id = 86;


/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(89);
	
	var MatreshkaArray = __webpack_require__(87);
	
	var MatreshkaObject = __webpack_require__(90);
	
	var Class = __webpack_require__(79);
	
	//import binders from './binders';
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	//Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(35);
	
	var Class = __webpack_require__(79);
	
	module.exports = Class({
	    // instance properies and methods
	
	}, {
	    // static properties and methods
	    extend: extend
	});

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";
	
	//import parserBrackets from './_bindings/parserbrackets';
	
	module.exports = parseBindings;
	function parseBindings(object, nodes) {}

/***/ },
/* 94 */,
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	module.exports = calc;
	function calc(object, target, source, handler, evt) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        evt = handler;
	        handler = source;
	        source = target;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'calc');
	    }
	
	    //evt = evt || {};
	    var defs = initMK(object);
	
	    if (key instanceof Array) {
	        for (var _target = key, _index = 0, _ref, _l5 = _target.length; _ref = _target[_index], _index < _l5; _index++) {
	            var itemKey = _ref.key;
	            var itemNode = _ref.node;
	            var itemBinder = _ref.binder;
	            var itemEvent = _ref.event;
	
	            var commonEvent = node;
	            var mergedEvent = {};
	
	            if (itemEvent) {
	                var _result = mergedEvent;
	                // extend event object by "local" event ("event" key of an object)
	
	                for (var _source2 = itemEvent, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	                    _key2 = _keys2[_i2];
	                    _result[_key2] = _source2[_key2];
	                }
	            }
	
	            if (commonEvent) {
	                var _result2 = mergedEvent;
	                // extend event object by "global" event
	
	                for (var _source4 = commonEvent, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
	                    _key4 = _keys4[_i4];
	                    _result2[_key4] = _source4[_key4];
	                }
	            }
	
	            bindNode(object, itemKey, itemNode, itemBinder, mergedEvent);
	        }
	        /*
	         * accept array of objects
	         * this.calc([{target, source, handler, event}], commonEvent);
	         */
	
	
	        return object;
	    }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmUxODZhZjA4NjQ1ODQyMThmZGUiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9odG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9hdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvbWF0cmVzaGthZXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL2lzLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZ2V0bm9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvdG9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2RvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0ZW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvY3JlYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9fZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2lzLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvb2ZmLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvYWRkLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvbm90LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvZmluZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuYmluZG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvcmVtb3ZlYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0YmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3J1bm5vZGVoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRzYW5kYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL2NyZWF0ZXNweS5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjIC4qXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdHJlc2hrYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWdpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnNlYmluZGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBLEtBQU0sMkJBQTJCLEVBQWpDOztBQUVBO0FBQ0E7QUFDQSxLQUFNLGVBQWUsc0JBQXJCOztBQUVBLFVBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN6QixTQUFPLHlCQUF5QixPQUF6QixDQUFpQyxJQUFqQyxLQUEwQyxDQUFqRDtBQUNBOztBQUVELEtBQUksV0FBVyxhQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FBMkIsVUFBM0IsQ0FBZjs7QUFFQTtBQUNBLEtBQUksQ0FBQyxTQUFTLE1BQWQsRUFBc0I7QUFDckIsYUFBVyxhQUFhLElBQWIsRUFBWDtBQUNBOztBQUVELFVBQVMsT0FBVCxDQUFpQixZQUFqQjs7QUFHQSxLQUFNLG9CQUFvQix1QkFBMUI7QUFDQSxtQkFBa0IsSUFBbEIsR0FBeUIsT0FBekIsQ0FBaUMsaUJBQWpDLEU7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHVEQUF1RDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O3VDQ3hCTyxDOzs7Ozs7Ozs7OztvQ0FDYyxFOztBQUVyQixVQUFTLFNBQVQsRUFBb0IsWUFBTTtBQUN6QixNQUFNLGlCQUFpQixFQUFFLFVBQVUsS0FBWixFQUF2QjtBQUNBLE1BQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBOEIsT0FBOUIsR0FBd0MsRUFBeEMsR0FBNkMsR0FBL0Q7QUFDQSxNQUFJLFlBQUo7QUFDQSxNQUFJLGFBQUo7O0FBRUEsYUFBVyxZQUFNO0FBQ2hCLFNBQU0sRUFBTjtBQUNBLFVBQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVA7QUFDQSxHQUhEOztBQUtBLEtBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUM1QixRQUFLLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxZQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLEtBQUssVUFBTCxDQUF6QixFQUEyQyxjQUEzQztBQUNBLFVBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixLQUF0QjtBQUNBLE9BQUksQ0FBSixHQUFRLEtBQVI7QUFDQSxVQUFPLEtBQUssUUFBWixFQUFzQixPQUF0QixDQUE4QixLQUE5QjtBQUNBLEdBTkQ7O0FBUUEsS0FBRyxrQkFBSCxFQUF1QixZQUFNO0FBQzVCLFFBQUssWUFBTCxDQUFrQixnQkFBbEIsRUFBb0MsS0FBcEM7QUFDQSxZQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLEtBQUssVUFBTCxDQUF6QixFQUEyQyxjQUEzQztBQUNBLFVBQU8sS0FBSyxZQUFMLENBQWtCLGdCQUFsQixDQUFQLEVBQTRDLE9BQTVDLENBQW9ELEtBQXBEO0FBQ0EsUUFBSyxZQUFMLENBQWtCLGdCQUFsQixFQUFvQyxLQUFwQztBQUNBLFVBQU8sS0FBSyxZQUFMLENBQWtCLGdCQUFsQixDQUFQLEVBQTRDLE9BQTVDLENBQW9ELEtBQXBEO0FBQ0EsR0FORDs7QUFRQSxLQUFHLGtCQUFILEVBQXVCLFlBQU07QUFDNUIsUUFBSyxTQUFMLEdBQWlCLFlBQWpCO0FBQ0EsWUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QixNQUF6QixFQUFpQyxjQUFqQztBQUNBLFVBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixZQUF0QjtBQUNBLE9BQUksQ0FBSixHQUFRLFlBQVI7QUFDQSxVQUFPLEtBQUssU0FBWixFQUF1QixPQUF2QixDQUErQixZQUEvQjtBQUNBLEdBTkQ7O0FBUUEsS0FBRyxrQkFBSCxFQUF1QixZQUFNO0FBQzVCLFFBQUssV0FBTCxHQUFtQixZQUFuQjtBQUNBLFlBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUIsTUFBekIsRUFBaUMsY0FBakM7QUFDQSxVQUFPLElBQUksQ0FBWCxFQUFjLE9BQWQsQ0FBc0IsWUFBdEI7QUFDQSxPQUFJLENBQUosR0FBUSxZQUFSO0FBQ0EsVUFBTyxLQUFLLFdBQVosRUFBeUIsT0FBekIsQ0FBaUMsWUFBakM7QUFDQSxHQU5EOztBQVFBLEtBQUcsbUJBQUgsRUFBd0IsWUFBTTtBQUM3QixRQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXVCLFFBQXZCO0FBQ0EsWUFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QixNQUFNLFdBQU4sQ0FBekIsRUFBNkMsY0FBN0M7QUFDQSxVQUFPLElBQUksQ0FBWCxFQUFjLE9BQWQsQ0FBc0IsUUFBdEI7QUFDQSxPQUFJLENBQUosR0FBUSxPQUFSO0FBQ0EsVUFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFsQixFQUE2QixPQUE3QixDQUFxQyxPQUFyQztBQUNBLEdBTkQ7O0FBUUEsS0FBRyxxQkFBSCxFQUEwQixZQUFNO0FBQy9CLFFBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsTUFBckI7QUFDQSxZQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLFFBQVEsSUFBUixDQUF6QixFQUF3QyxjQUF4QztBQUNBLFVBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixLQUF0QjtBQUNBLE9BQUksQ0FBSixHQUFRLElBQVI7QUFDQSxVQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCLEVBQTJCLE9BQTNCLENBQW1DLEVBQW5DOztBQUVBLFFBQUssS0FBTCxDQUFXLE9BQVgsR0FBcUIsTUFBckI7QUFDQSxZQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLFFBQVEsS0FBUixDQUF6QixFQUF5QyxjQUF6QztBQUNBLFVBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixJQUF0QjtBQUNBLE9BQUksQ0FBSixHQUFRLEtBQVI7QUFDQSxVQUFPLEtBQUssS0FBTCxDQUFXLE9BQWxCLEVBQTJCLE9BQTNCLENBQW1DLEVBQW5DO0FBQ0EsR0FaRDs7QUFjQSxLQUFHLHVCQUFILEVBQTRCLFlBQU07QUFDakM7QUFDQSxRQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxZQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLFVBQVUsS0FBVixDQUF6QixFQUEyQyxjQUEzQztBQUNBLFVBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixJQUF0QjtBQUNBLE9BQUksQ0FBSixHQUFRLEtBQVI7QUFDQSxVQUFPLEtBQUssU0FBWixFQUF1QixPQUF2QixDQUErQixFQUEvQjs7QUFFQSxRQUFLLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxZQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLFVBQVUsS0FBVixFQUFpQixLQUFqQixDQUF6QixFQUFrRCxjQUFsRDtBQUNBLFVBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixLQUF0QjtBQUNBLE9BQUksQ0FBSixHQUFRLElBQVI7QUFDQSxVQUFPLEtBQUssU0FBWixFQUF1QixPQUF2QixDQUErQixFQUEvQjtBQUNBLEdBYkQ7O0FBZUEsWUFBVSxxQkFBVixFQUFpQyxZQUFNO0FBQ3RDO0FBQ0EsUUFBSyxPQUFMLENBQWEsR0FBYixHQUFtQixLQUFuQjtBQUNBLFlBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUIsUUFBUSxLQUFSLENBQXpCLEVBQXlDLGNBQXpDO0FBQ0EsVUFBTyxJQUFJLENBQVgsRUFBYyxPQUFkLENBQXNCLEtBQXRCO0FBQ0EsT0FBSSxDQUFKLEdBQVEsS0FBUjtBQUNBLFVBQU8sS0FBSyxPQUFMLENBQWEsR0FBcEIsRUFBeUIsT0FBekIsQ0FBaUMsS0FBakM7QUFDQSxHQVBEO0FBUUEsRUF4RkQsRTs7Ozs7Ozs7Z0NDWmlCLEM7O21DQUNHLEM7O3FDQUNFLEM7O2dDQUNMLEM7O2dDQUNBLEM7O2lDQUNDLEU7O2tDQUNDLEU7O29DQUNFLEU7O2tDQUNGLEU7O29DQUNFLEU7O2dDQUNKLEU7O2lDQUNDLEU7O21DQUNFLEU7O1NBR2hCLEksR0FBQSxJO1NBQ0EsTyxHQUFBLE87U0FDQSxTLEdBQUEsUztTQUNBLEksR0FBQSxJO1NBQ0EsSSxHQUFBLEk7U0FDQSxLLEdBQUEsSztTQUNBLE0sR0FBQSxNO1NBQ0EsUSxHQUFBLFE7U0FDQSxNLEdBQUEsTTtTQUNBLFEsR0FBQSxRO1NBQ0EsSSxHQUFBLEk7U0FDQSxLLEdBQUEsSztTQUNBLE8sR0FBQSxPOzs7Ozs7OztrQkMzQm9CLEk7QUFBVCxVQUFTLElBQVQsR0FBZ0I7QUFDOUIsU0FBTztBQUNOLE9BQUksT0FERSxFQUNPO0FBQ2IsV0FGTSxjQUVLO0FBQ1YsV0FBTyxLQUFLLFNBQVo7QUFDQSxJQUpLO0FBS04sV0FMTSxZQUtHLEtBTEgsRUFLVTtBQUNmLFNBQUssU0FBTCxRQUFvQixLQUFwQjtBQUNBO0FBUEssR0FBUDtBQVNBLEU7Ozs7Ozs7O2tCQ1Z1QixPO0FBQVQsVUFBUyxPQUFULEdBQWdDO0FBQUEsU0FBZixRQUFlLHlEQUFOLElBQU07O0FBQzNDLFlBQU87QUFDSCxhQUFJLElBREQ7QUFFSCxpQkFGRyxjQUVRO0FBQ1AsaUJBQU0sUUFBUSxLQUFLLEtBQUwsQ0FBVyxPQUFYLElBQ1AsT0FBTyxnQkFBUCxDQUF3QixJQUF4QixFQUE4QixnQkFBOUIsQ0FBK0MsU0FBL0MsQ0FEUDtBQUVBLGlCQUFNLE9BQU8sVUFBVSxNQUF2QjtBQUNBLG9CQUFPLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLElBQTFCO0FBQ0gsVUFQRTtBQVFILGlCQVJHLFlBUU0sS0FSTixFQVFhO0FBQUEsaUJBQ0osS0FESSxHQUNNLElBRE4sQ0FDSixLQURJOztBQUVaLGlCQUFHLFFBQUgsRUFBYTtBQUNULHVCQUFNLE9BQU4sR0FBZ0IsUUFBUSxFQUFSLEdBQWEsTUFBN0I7QUFDSCxjQUZELE1BRU87QUFDSCx1QkFBTSxPQUFOLEdBQWdCLFFBQVEsTUFBUixHQUFpQixFQUFqQztBQUNIO0FBQ0o7QUFmRSxNQUFQO0FBaUJILEc7Ozs7Ozs7O3dDQ2ZNLEM7Ozs7a0JBRWlCLFM7QUFBVCxVQUFTLFNBQVQsQ0FBbUIsU0FBbkIsRUFBNkM7QUFBQSxNQUFmLFFBQWUseURBQU4sSUFBTTs7QUFDM0QsU0FBTztBQUNOLE9BQUksSUFERTtBQUVOLGFBQVUsWUFBVztBQUNYLFFBQU0sUUFBUSxTQUFTLElBQVQsRUFBZSxTQUFmLENBQWQ7QUFDVCxXQUFPLFdBQVcsS0FBWCxHQUFtQixDQUFDLEtBQTNCO0FBQ0EsSUFMSztBQU1OLGFBQVUsVUFBUyxLQUFULEVBQWdCO0FBQ2hCLFdBQU8sSUFBUCxFQUFhLFNBQWIsRUFBd0IsV0FBVyxDQUFDLENBQUMsS0FBYixHQUFxQixDQUFDLEtBQTlDO0FBQ1Q7QUFSSyxHQUFQO0FBVUEsRTs7Ozs7Ozs7QUNoQkQ7O0FBRUEsS0FBSSxZQUFKO0FBQ0EsS0FBSSxlQUFKO0FBQ0EsS0FBSSxpQkFBSjs7QUFFQSxLQUFHLFNBQVMsYUFBVCxDQUF1QixLQUF2QixFQUE4QixTQUFqQyxFQUE0QztBQUN4QyxXQUFNLFVBQUMsSUFBRCxFQUFPLElBQVA7QUFBQSxnQkFBZ0IsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixJQUFuQixDQUFoQjtBQUFBLE1BQU47QUFDQSxjQUFTLFVBQUMsSUFBRCxFQUFPLElBQVA7QUFBQSxnQkFBZ0IsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFzQixJQUF0QixDQUFoQjtBQUFBLE1BQVQ7QUFDQSxnQkFBVyxVQUFDLElBQUQsRUFBTyxJQUFQO0FBQUEsZ0JBQWdCLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBd0IsSUFBeEIsQ0FBaEI7QUFBQSxNQUFYO0FBQ0gsRUFKRCxNQUlPO0FBQ0gsV0FBTSxVQUFDLElBQUQsRUFBTyxJQUFQLEVBQWdCO0FBQ3hCLGFBQU0sS0FBSyxJQUFJLE1BQUosQ0FBVyxZQUFZLElBQVosR0FBbUIsU0FBOUIsRUFBeUMsR0FBekMsQ0FBWDtBQUNBLGFBQUksQ0FBQyxHQUFHLElBQUgsQ0FBUSxLQUFLLFNBQWIsQ0FBTCxFQUE4QjtBQUNwQixrQkFBSyxTQUFMLEdBQWlCLENBQUMsS0FBSyxTQUFMLEdBQWlCLEdBQWpCLEdBQXVCLElBQXhCLEVBQThCLE9BQTlCLENBQXNDLE1BQXRDLEVBQThDLEdBQTlDLEVBQW1ELE9BQW5ELENBQTJELFVBQTNELEVBQXVFLEVBQXZFLENBQWpCO0FBQ0g7QUFDUCxNQUxFOztBQU9ILGNBQVMsVUFBQyxJQUFELEVBQU8sSUFBUCxFQUFnQjtBQUN4QixhQUFNLEtBQUssSUFBSSxNQUFKLENBQVcsWUFBWSxDQUFaLEdBQWdCLFNBQTNCLEVBQXNDLEdBQXRDLENBQVg7QUFDQSxjQUFLLFNBQUwsR0FBaUIsS0FBSyxTQUFMLENBQWUsT0FBZixDQUF1QixFQUF2QixFQUEyQixJQUEzQixFQUFpQyxPQUFqQyxDQUF5QyxNQUF6QyxFQUFpRCxHQUFqRCxFQUFzRCxPQUF0RCxDQUE4RCxVQUE5RCxFQUEwRSxFQUExRSxDQUFqQjtBQUNBLE1BSEQ7O0FBS0EsZ0JBQVcsVUFBQyxJQUFELEVBQU8sQ0FBUCxFQUFhO0FBQ3ZCLGdCQUFPLElBQUksTUFBSixDQUFXLFlBQVksSUFBWixHQUFtQixTQUE5QixFQUF5QyxJQUF6QyxDQUE4QyxLQUFLLFNBQW5ELENBQVA7QUFDQSxNQUZEO0FBR0E7O0FBRUQsS0FBTSxTQUFTLFVBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxRQUFiLEVBQTBCO0FBQ3JDLFNBQUcsUUFBSCxFQUFhO0FBQ1QsYUFBSSxJQUFKLEVBQVUsSUFBVjtBQUNILE1BRkQsTUFFTztBQUNILGdCQUFPLElBQVAsRUFBYSxJQUFiO0FBQ0g7QUFDSixFQU5EOztTQVNJLE0sR0FBQSxNO1NBQ0EsUSxHQUFBLFE7Ozs7Ozs7O2tCQ3RDb0IsSTtBQUFULFVBQVMsSUFBVCxDQUFjLFlBQWQsRUFBNEI7QUFDMUMsU0FBTztBQUNOLE9BQUksSUFERTtBQUVOLFdBRk0sY0FFSztBQUNWLFdBQU8sS0FBSyxZQUFMLENBQVA7QUFDQSxJQUpLO0FBS04sV0FMTSxZQUtHLEtBTEgsRUFLVTtBQUNmO0FBQ0EsUUFBSTtBQUNILFVBQUssWUFBTCxJQUFxQixLQUFyQjtBQUNBLEtBRkQsQ0FFRSxPQUFPLENBQVAsRUFBVSxDQUFFO0FBQ2Q7QUFWSyxHQUFQO0FBWUEsRzs7Ozs7Ozs7a0JDYnVCLEk7QUFBVCxVQUFTLElBQVQsQ0FBYyxhQUFkLEVBQTZCO0FBQzNDLFNBQU87QUFDTixPQUFJLElBREU7QUFFTixhQUFVLFlBQVc7QUFDcEIsV0FBTyxLQUFLLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBUDtBQUNBLElBSks7QUFLTixhQUFVLFVBQVMsS0FBVCxFQUFnQjtBQUN6QixTQUFLLFlBQUwsQ0FBa0IsYUFBbEIsRUFBaUMsS0FBakM7QUFDQTtBQVBLLEdBQVA7QUFTQSxFOzs7Ozs7OztrQkNWdUIsSztBQUFULFVBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUI7QUFDaEMsU0FBSSxXQUFKO0FBQ0EsYUFBUSxJQUFSO0FBQ0ksY0FBSyxVQUFMO0FBQ0ksb0JBQU87QUFDSCxxQkFBSSxhQUREO0FBRUgsMkJBQVUsWUFBVztBQUNqQiw0QkFBTyxLQUFLLE9BQVo7QUFDSCxrQkFKRTtBQUtILDJCQUFVLFVBQVMsS0FBVCxFQUFnQjtBQUN0QiwwQkFBSyxPQUFMLEdBQWUsS0FBZjtBQUNIO0FBUEUsY0FBUDtBQVNKLGNBQUssT0FBTDtBQUNJLG9CQUFPO0FBQ0gscUJBQUksYUFERDtBQUVILDJCQUFVLFlBQVc7QUFDakIsNEJBQU8sS0FBSyxLQUFaO0FBQ0gsa0JBSkU7QUFLSCwyQkFBVSxVQUFTLEtBQVQsRUFBZ0I7QUFDdEIsMEJBQUssT0FBTCxHQUFlLE9BQU8sS0FBUCxJQUFnQixXQUFoQixJQUErQixLQUFLLEtBQUwsSUFBYyxLQUE1RDtBQUNIO0FBUEUsY0FBUDtBQVNKLGNBQUssUUFBTDtBQUNBLGNBQUssUUFBTDtBQUNBLGNBQUssT0FBTDtBQUNBLGNBQUssT0FBTDtBQUNJLG9CQUFPLEVBQVA7QUFDSixjQUFLLFFBQUw7QUFDSSxrQkFBSyxJQUFMO0FBQ0E7QUFDSixjQUFLLE1BQUw7QUFDSSxrQkFBSyxRQUFMO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJKO0FBQVM7QUFDTCxrQkFBSyxPQUFMO0FBbkRSOztBQXNEQSxZQUFPO0FBQ0gsYUFBSSxFQUREO0FBRUgsaUJBRkcsY0FFUTtBQUNQLG9CQUFPLEtBQUssS0FBWjtBQUNILFVBSkU7QUFLSCxpQkFMRyxZQUtNLEtBTE4sRUFLYTtBQUNaLGtCQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0g7QUFQRSxNQUFQO0FBU0gsRTs7Ozs7Ozs7a0JDakV1QixNO0FBQVQsVUFBUyxNQUFULEdBQWtCO0FBQzdCLFlBQU87QUFDSCxhQUFJLElBREQ7QUFFSCxpQkFGRyxjQUVRO0FBQ1Asb0JBQU8sS0FBSyxLQUFMLElBQWMsS0FBSyxXQUExQjtBQUNILFVBSkU7QUFLSCxpQkFMRyxZQUtNLEtBTE4sRUFLYTtBQUNaLGlCQUFNLFdBQVcsVUFBVSxJQUFWLEdBQWlCLE9BQWpCLEdBQTJCLGFBQTVDO0FBQ0Esa0JBQUssUUFBTCxJQUFpQixVQUFVLElBQVYsR0FBaUIsRUFBakIsUUFBeUIsS0FBMUM7QUFDSDtBQVJFLE1BQVA7QUFVSCxHOzs7Ozs7OztpQ0NYaUIsRTs7a0JBRU0sUTtBQUFULFVBQVMsUUFBVCxHQUFvQjtBQUNsQyxTQUFPLE1BQU0sTUFBTixDQUFQO0FBQ0EsRTs7Ozs7Ozs7a0JDSnVCLE07QUFBVCxVQUFTLE1BQVQsQ0FBZ0IsUUFBaEIsRUFBMEI7QUFDckMsU0FBSSxRQUFKLEVBQWM7QUFDVixnQkFBTztBQUNILGlCQUFJLFFBREQ7QUFFSCxxQkFGRyxjQUVRO0FBQUEscUJBQ0MsT0FERCxHQUNhLElBRGIsQ0FDQyxPQUREOztBQUVQLHFCQUFNLFNBQVMsRUFBZjs7QUFFQSxzQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixRQUFRLE1BQVIsR0FBaUIsQ0FBakMsRUFBb0MsR0FBcEMsRUFBeUM7QUFDckMseUJBQUksUUFBUSxDQUFSLEVBQVcsUUFBZixFQUF5QjtBQUNyQixnQ0FBTyxJQUFQLENBQVksUUFBUSxDQUFSLEVBQVcsS0FBdkI7QUFDSDtBQUNKOztBQUVELHdCQUFPLE1BQVA7QUFDSCxjQWJFO0FBY0gscUJBZEcsWUFjTSxVQWROLEVBY2tCO0FBQUEscUJBQ1QsT0FEUyxHQUNHLElBREgsQ0FDVCxPQURTOztBQUVqQixxQkFBTSxRQUFRLE9BQU8sVUFBUCxLQUFzQixRQUF0QixHQUFpQyxDQUFDLFVBQUQsQ0FBakMsR0FBZ0QsVUFBOUQ7QUFDQSxzQkFBSyxJQUFJLElBQUksUUFBUSxNQUFSLEdBQWlCLENBQTlCLEVBQWlDLEtBQUssQ0FBdEMsRUFBeUMsR0FBekMsRUFBOEM7QUFDMUMsNkJBQVEsQ0FBUixFQUFXLFFBQVgsR0FBc0IsQ0FBQyxNQUFNLE9BQU4sQ0FBYyxRQUFRLENBQVIsRUFBVyxLQUF6QixDQUF2QjtBQUNIO0FBQ0o7QUFwQkUsVUFBUDtBQXNCSDs7QUFFRCxZQUFPO0FBQ0gsYUFBSSxRQUREO0FBRUgsaUJBRkcsY0FFUTtBQUNQLG9CQUFPLEtBQUssS0FBWjtBQUNILFVBSkU7QUFLSCxpQkFMRyxZQUtNLEtBTE4sRUFLYTtBQUNaLGtCQUFLLEtBQUwsR0FBYSxLQUFiOztBQUVBLGlCQUFJLENBQUMsS0FBTCxFQUFZO0FBQUEscUJBQ0EsT0FEQSxHQUNZLElBRFosQ0FDQSxPQURBOztBQUVSLHNCQUFLLElBQUksSUFBSSxRQUFRLE1BQVIsR0FBaUIsQ0FBOUIsRUFBaUMsS0FBSyxDQUF0QyxFQUF5QyxHQUF6QyxFQUE4QztBQUMxQyx5QkFBSSxDQUFDLFFBQVEsQ0FBUixFQUFXLEtBQWhCLEVBQXVCO0FBQ25CLGlDQUFRLENBQVIsRUFBVyxRQUFYLEdBQXNCLElBQXRCO0FBQ0E7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQWpCRSxNQUFQO0FBbUJILEU7Ozs7Ozs7O2lDQzdDaUIsRTs7a0JBRU0sUTtBQUFULFVBQVMsUUFBVCxHQUFvQjtBQUNsQyxTQUFPLE9BQVA7QUFDQSxFOzs7Ozs7OztrQkNKYyxZQUFXO0FBQ3pCLFNBQU87QUFDTixPQUFJLE9BREUsRUFDTztBQUNiLFdBRk0sY0FFSztBQUNWLFdBQU8sS0FBSyxXQUFaO0FBQ0EsSUFKSztBQUtOLFdBTE0sWUFLRyxLQUxILEVBS1U7QUFDZixTQUFLLFdBQUwsUUFBc0IsS0FBdEI7QUFDQTtBQVBLLEdBQVA7QUFTQSxFOzs7Ozs7OztrQkNWdUIsSztBQUFULFVBQVMsS0FBVCxDQUFlLFFBQWYsRUFBeUI7QUFDcEMsWUFBTztBQUNILGFBQUksSUFERDtBQUVILG1CQUFVLFlBQVc7QUFDakIsb0JBQU8sS0FBSyxLQUFMLENBQVcsUUFBWCxLQUNBLE9BQU8sZ0JBQVAsQ0FBd0IsSUFBeEIsRUFBOEIsZ0JBQTlCLENBQStDLFFBQS9DLENBRFA7QUFFSCxVQUxFO0FBTUgsbUJBQVUsVUFBUyxLQUFULEVBQWdCO0FBQ3RCLGtCQUFLLEtBQUwsQ0FBVyxRQUFYLElBQXVCLEtBQXZCO0FBQ0g7QUFSRSxNQUFQO0FBVUgsRTs7Ozs7Ozs7QUNYRDtBQUNBLEtBQU0sV0FBVyxVQUFDLElBQUQsRUFBVTtBQUN2QixTQUFPLFVBQVUsS0FBSyxPQUFMLENBQWEsVUFBYixFQUF5QixVQUFDLENBQUQ7QUFBQSxVQUFPLE1BQU0sRUFBRSxXQUFGLEVBQWI7QUFBQSxHQUF6QixDQUFqQjtBQUNILEVBRkQ7O2tCQUl3QixPO0FBQVQsVUFBUyxPQUFULENBQWlCLElBQWpCLEVBQXVCO0FBQ3JDLFNBQU87QUFDTixPQUFJLElBREU7QUFFTixXQUZNLGNBRUs7QUFDVixRQUFHLEtBQUssT0FBUixFQUFnQjtBQUNILFlBQU8sS0FBSyxPQUFMLENBQWEsSUFBYixDQUFQO0FBQ0g7O0FBRUQsV0FBTyxLQUFLLFlBQUwsQ0FBa0IsU0FBUyxJQUFULENBQWxCLENBQVA7QUFDVCxJQVJLO0FBU04sV0FUTSxZQVNHLEtBVEgsRUFTVTtBQUNmLFFBQUksS0FBSyxPQUFULEVBQWtCO0FBQ2pCLFVBQUssT0FBTCxDQUFhLElBQWIsSUFBcUIsS0FBckI7QUFDQSxLQUZELE1BRU87QUFDTixVQUFLLFlBQUwsQ0FBa0IsU0FBUyxJQUFULENBQWxCLEVBQWtDLEtBQWxDO0FBQ0E7QUFDRDtBQWZLLEdBQVA7QUFpQkEsRTs7Ozs7Ozs7a0NDdkJrQixFOztzQ0FDSSxFOztvQ0FDRixFOzt5Q0FDSyxFOzswQ0FDQyxFOzsyQ0FDQyxFOzswQ0FDRCxFOzs0Q0FDRSxFOzt1Q0FDTCxFOzswQ0FDRyxFOztzQ0FDSixFOztzQ0FDQSxFOztBQUV2QjtrQkFDd0IsUTtBQUFULFVBQVMsUUFBVCxDQUFrQixNQUFsQixFQUEwQixHQUExQixFQUErQixJQUEvQixFQUFxQyxNQUFyQyxFQUE2QyxZQUE3QyxFQUEyRDtBQUN0RSxTQUFHLE9BQU8sSUFBUCxLQUFnQixRQUFoQixJQUE0QixLQUFLLElBQXBDLEVBQTBDO0FBQ3RDO0FBQ0Esd0JBQWUsTUFBZjtBQUNBLGtCQUFTLElBQVQ7QUFDQSxnQkFBTyxHQUFQO0FBQ0EsZUFBTSxNQUFOO0FBQ0Esa0JBQVMsSUFBVDtBQUNILE1BUEQsTUFPTztBQUNIO0FBQ0EseUJBQWdCLE1BQWhCLEVBQXdCLFVBQXhCO0FBQ0g7O0FBRUQsb0JBQWUsZ0JBQWdCLEVBQS9CO0FBQ0EsY0FBUyxVQUFVLEVBQW5COztBQWRzRSxtQkFlcEQsT0FBTyxNQUFQLENBZm9EOztBQUFBLFNBZTlELEtBZjhELFdBZTlELEtBZjhEO0FBQUEseUJBb0JsRSxZQXBCa0U7QUFBQSwrQ0FpQmxFLFFBakJrRTtBQUFBLFNBaUJsRSxRQWpCa0UseUNBaUJ6RCxTQUFTLHFCQWpCZ0Q7QUFBQSxTQWtCbEUsSUFsQmtFLGlCQWtCbEUsSUFsQmtFO0FBQUEsU0FtQmxFLE1BbkJrRSxpQkFtQmxFLE1BbkJrRTs7O0FBc0J0RSxZQUFPLFNBQVMscUJBQWhCOztBQUVBO0FBQ0EsU0FBRyxDQUFDLEdBQUosRUFBUztBQUNMLGVBQU0sZUFBZSxtQkFBZixDQUFOO0FBQ0g7O0FBRUQsU0FBSSxlQUFlLEtBQW5CLEVBQTBCO0FBQ3RCLGFBQUcsT0FBTyxJQUFJLENBQUosQ0FBUCxLQUFrQixRQUFyQixFQUErQjtBQUFBLGdDQUtkLEdBTGMsY0FLVCxPQUxTLHVCQUtULE9BTFM7QUFLRSwwQkFBUyxNQUFULEVBQWlCLE9BQWpCLEVBQTBCLElBQTFCLEVBQWdDLE1BQWhDLEVBQXdDLFlBQXhDO0FBTEY7QUFDM0I7Ozs7O0FBS0gsVUFORCxNQU1PO0FBQUEsaUNBS1UsR0FMVixnR0FVRztBQUFBLHFCQUpHLE9BSUgsUUFKRixHQUlFO0FBQUEscUJBSEksUUFHSixRQUhGLElBR0U7QUFBQSxxQkFGTSxVQUVOLFFBRkYsTUFFRTtBQUFBLHFCQURLLFNBQ0wsUUFERixLQUNFOztBQUNGLHFCQUFNLGNBQWMsSUFBcEI7QUFDQSxxQkFBTSxjQUFjLEVBQXBCOztBQUdBLHFCQUFHLFNBQUgsRUFBYztBQUFBLG1DQUVFLFdBRkY7QUFDVjs7QUFEVSx5Q0FFZSxTQUZmO0FBQUE7QUFBQTtBQUFBO0FBR2I7O0FBRUQscUJBQUcsV0FBSCxFQUFnQjtBQUFBLG9DQUVBLFdBRkE7QUFDWjs7QUFEWSx5Q0FFYSxXQUZiO0FBQUE7QUFBQTtBQUFBO0FBR2Y7O0FBRUQsMEJBQVMsTUFBVCxFQUFpQixPQUFqQixFQUEwQixRQUExQixFQUFvQyxVQUFwQyxFQUFnRCxXQUFoRDtBQUNIO0FBekJEOzs7OztBQTBCSDs7QUFFRCxnQkFBTyxNQUFQO0FBQ0g7O0FBRUQ7Ozs7QUFJQSxTQUFJLE9BQU8sR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQUEsNkJBQ2IsR0FEYSwyQ0FDTSxTQUROLEVBQ1AsV0FETyx3QkFDTSxTQUROLGdCQUNQLFdBRE8sWUFDTSxTQUROO0FBQ29CLHNCQUFTLE1BQVQsRUFBaUIsU0FBakIsRUFBNEIsV0FBNUIsRUFBeUMsSUFBekMsRUFBK0MsTUFBL0M7QUFEcEI7O0FBRXpCLGdCQUFPLE1BQVA7QUFDSDs7QUFFRCxTQUFNLFNBQVMsU0FBUyxNQUFULEVBQWlCLElBQWpCLENBQWY7O0FBRUE7QUFDQSxTQUFJLENBQUMsT0FBTyxNQUFaLEVBQW9CO0FBQ2hCLGFBQUksUUFBSixFQUFjO0FBQ1Ysb0JBQU8sTUFBUDtBQUNILFVBRkQsTUFFTztBQUNILG1CQUFNLGVBQWUsc0JBQWYsRUFBdUMsRUFBRSxRQUFGLEVBQU8sVUFBUCxFQUF2QyxDQUFOO0FBQ0g7QUFDSjs7QUFFRCxTQUFJLFNBQVMsS0FBYixFQUFvQjtBQUFBO0FBQ2hCLGlCQUFNLFdBQVcsSUFBSSxLQUFKLENBQVUsR0FBVixDQUFqQjtBQUNBLGlCQUFNLGlCQUFpQixTQUFTLE1BQWhDOztBQUVBLGlCQUFJLGlCQUFpQixDQUFyQixFQUF3QjtBQUNwQjtBQUNBLHFCQUFNLGdCQUFnQjtBQUFBLHlCQUFDLFNBQUQseURBQWEsRUFBYjtBQUFBLDRCQUFvQixjQUFjO0FBQ2hELDZDQURnRDtBQUVoRCx1Q0FGZ0Q7QUFHaEQsMkNBSGdEO0FBSWhELHVDQUpnRDtBQUtoRCx1Q0FMZ0Q7QUFNaEQsbURBTmdEO0FBT2hEO0FBUGdELHNCQUFkLENBQXBCO0FBQUEsa0JBQXRCOztBQVVBLGtDQUFpQixNQUFqQixFQUF5QixTQUFTLEtBQVQsQ0FBZSxDQUFmLEVBQWtCLGlCQUFpQixDQUFuQyxDQUF6QixvQkFDb0IsU0FBUyxpQkFBaUIsQ0FBMUIsQ0FEcEIsRUFDb0QsYUFEcEQ7O0FBR0E7O0FBRUE7QUFBQSx3QkFBTztBQUFQO0FBQ0g7QUF0QmU7O0FBQUE7QUF1Qm5COztBQUVELFNBQU0sVUFBVSxXQUFXLE1BQVgsRUFBbUIsR0FBbkIsQ0FBaEI7O0FBRUEsU0FBSSxPQUFPLElBQVgsRUFBaUI7QUFDYjtBQURhLHVCQUVrQyxNQUZsQztBQUFBLGFBRUcsU0FGSCxXQUVMLE1BRks7QUFBQSxhQUVxQixRQUZyQixXQUVjLEtBRmQ7OztBQUliLGFBQUcsQ0FBQyxTQUFELElBQWMsQ0FBQyxRQUFsQixFQUE0QjtBQUN4QixtQkFBTSxlQUFlLGdDQUFmLEVBQWlEO0FBQ25ELHlCQUFRLFNBRDJDO0FBRW5ELHdCQUFPO0FBRjRDLGNBQWpELENBQU47QUFJSDs7QUFFRCxtQkFBVSxHQUFWLElBQWlCLFVBQVUsR0FBVixLQUFrQixVQUFVLEdBQVYsRUFBZSxNQUFqQyxHQUNYLFVBQVUsR0FBVixFQUFlLEdBQWYsQ0FBbUIsTUFBbkIsQ0FEVyxHQUVYLE1BRk47O0FBSUEsa0JBQVMsR0FBVCxJQUFnQixVQUFVLEdBQVYsRUFBZSxDQUFmLENBQWhCO0FBQ0g7O0FBRUQ7O0FBcklzRSx5QkFzSXpELE1BdEl5RCxlQXNJaEQsSUF0SWdELHlCQXNJaEQsSUF0SWdEO0FBc0l2Qyx3QkFBZSxNQUFmLEVBQXVCO0FBQ2xELDJCQURrRDtBQUVsRCx1QkFGa0Q7QUFHbEQscUJBSGtEO0FBSWxELHVDQUprRDtBQUtsRCwyQkFMa0Q7QUFNbEQ7QUFOa0QsVUFBdkI7QUF0SXVDOztBQStJdEUsWUFBTyxNQUFQO0FBQ0gsRTs7Ozs7Ozs7Z0NDOUpnQixFOztBQUVqQjtBQUNBLFVBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QjtBQUN4QixTQUFJLE1BQU0sS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFWO0FBQ0EsU0FBSSxDQUFDLEdBQUwsRUFBVTtBQUNOLGVBQU07QUFDRjtBQUNBO0FBQ0EscUJBQVE7QUFDSjs7Ozs7OztBQURJLGNBSE47QUFZRjtBQUNBLG9CQUFPO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUFERyxjQWJMO0FBNEJGLHdCQUFTLEtBQUssTUFBTDtBQTVCUCxVQUFOOztBQStCQSxjQUFLLEdBQUwsQ0FBUyxNQUFULEVBQWlCLEdBQWpCO0FBQ0g7O0FBRUQsWUFBTyxHQUFQO0FBQ0g7O2tCQUV1QixNO0FBQVQsVUFBUyxNQUFULENBQWdCLE1BQWhCLEVBQXdCO0FBQ25DLFNBQU0sT0FBTyxPQUFPLE1BQXBCO0FBQ0EsU0FBSSxDQUFDLE1BQUQsSUFBVyxTQUFTLFFBQXhCLEVBQWtDO0FBQ3BDO0FBQ00sZUFBTSxJQUFJLFNBQUosQ0FBaUIsSUFBakIsb0NBQU47QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDSDtBQUNHLFlBQU8sT0FBTyxjQUFQLEdBQXdCLE9BQU8sY0FBUCxFQUF4QixHQUFrRCxXQUFXLE1BQVgsQ0FBekQ7QUFDSCxFOzs7Ozs7OztBQ3ZERCxVQUFTLFNBQVQsR0FBcUIsQ0FBRTs7QUFFdkI7QUFDQTtlQUNZLFVBQVUsUzs7cUJBQVc7QUFDN0IsUUFENkIsWUFDekIsR0FEeUIsRUFDcEI7QUFDTCxnQkFBTyxJQUFJLGFBQVg7QUFDSCxNQUg0QjtBQUk3QixRQUo2QixZQUl6QixHQUp5QixFQUlwQixJQUpvQixFQUlkO0FBQ1gsZ0JBQU8sY0FBUCxDQUFzQixHQUF0QixFQUEyQixlQUEzQixFQUE0QztBQUN4QyxvQkFBTyxJQURpQztBQUV4Qyx5QkFBWSxLQUY0QjtBQUd4Qyx1QkFBVSxLQUg4QjtBQUl4QywyQkFBYztBQUowQixVQUE1QztBQU1ILE1BWDRCO0FBWTdCLFFBWjZCLFlBWXpCLEdBWnlCLEVBWXBCO0FBQ0wsZ0JBQU8sb0JBQW1CLEdBQW5CLENBQVA7QUFDSDtBQWQ0QixFOzs7OztrQkFpQmxCLE9BQU8sT0FBUCxLQUFtQixXQUFuQixHQUFpQyxJQUFJLFNBQUosRUFBakMsR0FBbUQsSUFBSSxPQUFKLEU7Ozs7Ozs7O2dDQ3JCakQsRTs7K0JBQ0QsRTs7QUFFaEI7a0JBQ3dCLFU7QUFBVCxVQUFTLFVBQVQsQ0FBb0IsTUFBcEIsRUFBNEIsR0FBNUIsRUFBaUM7QUFDNUMsU0FBTSxNQUFNLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBWjs7QUFFQTtBQUNBLFNBQUksQ0FBQyxHQUFMLEVBQVU7QUFDTixnQkFBTyxJQUFQO0FBQ0g7O0FBRUQsU0FBSSxDQUFDLElBQUksS0FBSixDQUFVLEdBQVYsQ0FBTCxFQUFxQjtBQUFBO0FBQ2pCLGlCQUFNLFVBQVUsSUFBSSxLQUFKLENBQVUsR0FBVixJQUFpQjtBQUM3Qix3QkFBTyxPQUFPLEdBQVAsQ0FEc0I7QUFFN0IseUJBQVEsSUFGcUI7QUFHN0IseUJBQVEsSUFIcUI7QUFJN0IsMkJBQVUsSUFKbUI7QUFLN0IsMkJBQVU7QUFMbUIsY0FBakM7O0FBUUEsb0JBQU8sY0FBUCxDQUFzQixNQUF0QixFQUE4QixHQUE5QixFQUFtQztBQUMvQiwrQkFBYyxLQURpQjtBQUUvQiw2QkFBWSxJQUZtQjtBQUcvQixvQkFIK0IsY0FHekI7QUFDRiw0QkFBTyxRQUFRLE1BQVIsR0FBaUIsUUFBUSxNQUFSLENBQWUsSUFBZixDQUFvQixNQUFwQixDQUFqQixHQUErQyxRQUFRLEtBQTlEO0FBQ0gsa0JBTDhCO0FBTS9CLG9CQU4rQixZQU0zQixDQU4yQixFQU14QjtBQUNILDRCQUFPLFFBQVEsTUFBUixHQUFpQixRQUFRLE1BQVIsQ0FBZSxJQUFmLENBQW9CLE1BQXBCLEVBQTRCLENBQTVCLENBQWpCLEdBQWtELElBQUksTUFBSixFQUFZLEdBQVosRUFBaUIsQ0FBakIsRUFBb0I7QUFDekUscUNBQVk7QUFENkQsc0JBQXBCLENBQXpEO0FBR0g7QUFWOEIsY0FBbkM7QUFUaUI7QUFxQnBCOztBQUVELFlBQU8sSUFBSSxLQUFKLENBQVUsR0FBVixDQUFQO0FBQ0gsRTs7Ozs7Ozs7Z0NDcENnQixFOztzQ0FDTSxFOzsyQ0FDSyxFOzs4QkFDYixFOztBQUVmO2tCQUN3QixHO0FBQVQsVUFBUyxHQUFULENBQWEsTUFBYixFQUFxQixHQUFyQixFQUEwQixLQUExQixFQUEyQztBQUFBLFNBQVYsR0FBVSx5REFBSixFQUFJOztBQUN0RCxxQkFBZ0IsTUFBaEIsRUFBd0IsS0FBeEI7O0FBRUE7QUFDQSxTQUFJLENBQUMsR0FBTCxFQUFVO0FBQ04sZ0JBQU8sTUFBUDtBQUNIOztBQUVELFNBQU0sTUFBTSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQVo7O0FBRUE7QUFDQSxTQUFJLENBQUMsR0FBTCxFQUFVO0FBQ04sZ0JBQU8sR0FBUCxJQUFjLEtBQWQ7QUFDQSxnQkFBTyxNQUFQO0FBQ0g7O0FBZHFELFNBZ0I5QyxLQWhCOEMsR0FnQjVCLEdBaEI0QixDQWdCOUMsS0FoQjhDO0FBQUEsU0FnQnZDLE1BaEJ1QyxHQWdCNUIsR0FoQjRCLENBZ0J2QyxNQWhCdUM7O0FBaUJ0RCxTQUFNLFVBQVUsTUFBTSxHQUFOLENBQWhCOztBQUVBO0FBQ0EsU0FBSSxPQUFPLEdBQVAsSUFBYyxRQUFsQixFQUE0QjtBQUFBLDRCQUNaLEdBRFksd0NBQ0UsTUFERixFQUNOLE1BRE0sc0JBQ0UsTUFERixjQUNOLE1BRE0sV0FDRSxNQURGO0FBQ2EsaUJBQUksTUFBSixFQUFZLE1BQVosRUFBb0IsTUFBcEIsRUFBNEIsS0FBNUI7QUFEYjs7QUFFeEIsZ0JBQU8sTUFBUDtBQUNIOztBQUVEO0FBQ0EsU0FBSSxDQUFDLE9BQUwsRUFBYztBQUNWLGdCQUFPLEdBQVAsSUFBYyxLQUFkO0FBQ0EsZ0JBQU8sTUFBUDtBQUNIOztBQTdCcUQsU0ErQnZDLGFBL0J1QyxHQStCWCxPQS9CVyxDQStCOUMsS0EvQjhDO0FBQUEsU0ErQnhCLFFBL0J3QixHQStCWCxPQS9CVyxDQStCeEIsUUEvQndCOztBQWlDdEQ7O0FBakNzRCxTQW1DbEQsWUFuQ2tELEdBMENsRCxHQTFDa0QsQ0FtQ2xELFlBbkNrRDtBQUFBLFNBb0NsRCxZQXBDa0QsR0EwQ2xELEdBMUNrRCxDQW9DbEQsWUFwQ2tEO0FBQUEsU0FxQ2xELEtBckNrRCxHQTBDbEQsR0ExQ2tELENBcUNsRCxLQXJDa0Q7QUFBQSxTQXNDbEQsU0F0Q2tELEdBMENsRCxHQTFDa0QsQ0FzQ2xELFNBdENrRDtBQUFBLFNBdUNsRCxNQXZDa0QsR0EwQ2xELEdBMUNrRCxDQXVDbEQsTUF2Q2tEO0FBQUEsU0F3Q2xELFVBeENrRCxHQTBDbEQsR0ExQ2tELENBd0NsRCxVQXhDa0Q7QUFBQSxTQXlDbEQsU0F6Q2tELEdBMENsRCxHQTFDa0QsQ0F5Q2xELFNBekNrRDs7O0FBNEN0RCxTQUFJLGlCQUFKOztBQUVBLFNBQUksWUFBWSxDQUFDLEdBQUcsS0FBSCxFQUFVLGFBQVYsQ0FBYixJQUF5QyxDQUFDLFlBQTFDLElBQTBELENBQUMsWUFBL0QsRUFBNkU7QUFDekU7QUFDQSxvQkFBVyxRQUFRLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsT0FBcEIsRUFBNkIsR0FBN0IsRUFBa0MsTUFBbEMsQ0FBWDtBQUNILE1BSEQsTUFHTztBQUNILG9CQUFXLEtBQVg7QUFDSDs7QUFFRCxTQUFNLFlBQVksQ0FBQyxHQUFHLFFBQUgsRUFBYSxhQUFiLENBQW5COztBQUVBO0FBdkRzRCxtQkF3RHRCO0FBQzVCLGdCQUFPLFFBRHFCO0FBRTVCLGVBQU0sTUFGc0I7QUFHNUIscUNBSDRCO0FBSTVCLGlCQUo0QjtBQUs1QjtBQUw0QixNQXhEc0I7O0FBQUEseUJBOERuRCxHQTlEbUQ7QUFBQTtBQUFBO0FBQUE7O0FBd0R0RCxTQUFNLHFCQUFOOztBQVFBLFNBQU0sZ0JBQWdCLENBQUMsYUFBYSxLQUFkLEtBQXdCLENBQUMsTUFBL0M7O0FBRUE7QUFDQSxTQUFJLGFBQUosRUFBbUI7QUFDZixhQUFNLGtCQUFrQixjQUF4QjtBQUNBLGFBQU0sc0JBQXlCLGVBQXpCLFNBQTRDLEdBQWxEOztBQUVBLGFBQUcsT0FBTyxtQkFBUCxDQUFILEVBQWdDO0FBQzVCLHdCQUFXLE1BQVgsRUFBbUIsbUJBQW5CLEVBQXdDLFdBQXhDO0FBQ0g7O0FBRUQsYUFBRyxPQUFPLGVBQVAsQ0FBSCxFQUE0QjtBQUN4Qix3QkFBVyxNQUFYLEVBQW1CLGVBQW5CLEVBQW9DLFdBQXBDO0FBQ0g7QUFDSjs7QUFFRCxhQUFRLEtBQVIsR0FBZ0IsUUFBaEI7O0FBRUE7QUFDQSxTQUFJLENBQUMsVUFBRCxLQUFnQixhQUFhLEtBQWIsSUFBc0IsU0FBdEMsQ0FBSixFQUFzRDtBQUNsRCxhQUFNLDhDQUE0QyxHQUFsRDtBQUNBLGFBQUcsT0FBTyxxQkFBUCxDQUFILEVBQWtDO0FBQzlCLHdCQUFXLE1BQVgsRUFBbUIscUJBQW5CLEVBQTBDLFdBQTFDO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLFNBQUksYUFBSixFQUFtQjtBQUNmLGFBQU0sWUFBWSxRQUFsQjtBQUNBLGFBQU0sZ0JBQW1CLFNBQW5CLFNBQWdDLEdBQXRDO0FBQ0EsYUFBRyxPQUFPLGFBQVAsQ0FBSCxFQUEwQjtBQUN0Qix3QkFBVyxNQUFYLEVBQW1CLGFBQW5CLEVBQWtDLFdBQWxDO0FBQ0g7O0FBRUQsYUFBRyxPQUFPLFNBQVAsQ0FBSCxFQUFzQjtBQUNsQix3QkFBVyxNQUFYLEVBQW1CLFNBQW5CLEVBQThCLFdBQTlCO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLFNBQUksQ0FBQyxhQUFhLEtBQWQsS0FBd0IsQ0FBQyxTQUE3QixFQUF3QztBQUNwQyxhQUFNLHNDQUFvQyxHQUExQztBQUNBLGFBQUcsT0FBTyxpQkFBUCxDQUFILEVBQThCO0FBQzFCLHdCQUFXLE1BQVgsRUFBbUIsaUJBQW5CLEVBQXNDLFdBQXRDO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLFNBQUcsU0FBSCxFQUFjO0FBQ1YsYUFBTSxnREFBOEMsR0FBcEQ7QUFDQSxhQUFJLE9BQU8sc0JBQVAsQ0FBSixFQUFvQztBQUNoQyx3QkFBVyxNQUFYLEVBQW1CLHNCQUFuQixFQUEyQyxXQUEzQztBQUNIO0FBQ0o7O0FBRUQsWUFBTyxNQUFQO0FBQ0gsRTs7Ozs7Ozs7Z0NDOUhnQixFOztrQkFFTyxVO0FBQVQsVUFBUyxVQUFULENBQW9CLE1BQXBCLEVBQTRCLElBQTVCLEVBQWtDO0FBQzdDLFNBQU0sTUFBTSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQVo7O0FBRUEsU0FBSSxDQUFDLEdBQUwsRUFBVTs7QUFFVixTQUFNLFNBQVMsSUFBSSxNQUFKLENBQVcsSUFBWCxDQUFmOztBQUVBLFNBQUksTUFBSixFQUFZO0FBQUEsdUJBQ2dCLFNBRGhCO0FBQUE7QUFBQSxrQkFDMkIsQ0FEM0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUNSLGFBQU0sY0FBTjtBQUNBLGFBQU0sSUFBSSxPQUFPLE1BQWpCO0FBRlEsYUFHRCxFQUhDLEdBR1MsSUFIVDtBQUFBLGFBR0csRUFISCxHQUdTLElBSFQ7OztBQUtSLGFBQUksSUFBSSxDQUFSO0FBQ0EsYUFBSSxXQUFKOztBQUVBLGlCQUFRLEtBQUssTUFBYjtBQUNJLGtCQUFLLENBQUw7QUFDSSx3QkFBTyxJQUFJLENBQVgsRUFBYztBQUNWLHNCQUFDLFdBQVcsV0FBWCxHQUF5QixLQUFLLE9BQU8sR0FBUCxDQUEvQixFQUE0QyxRQUE1QyxDQUFxRCxJQUFyRCxDQUEwRCxHQUFHLEdBQTdEO0FBQ0g7QUFDRDtBQUNKLGtCQUFLLENBQUw7QUFDSSx3QkFBTyxJQUFJLENBQVgsRUFBYztBQUNWLHNCQUFDLFdBQVcsV0FBWCxHQUF5QixLQUFLLE9BQU8sR0FBUCxDQUEvQixFQUE0QyxRQUE1QyxDQUFxRCxJQUFyRCxDQUEwRCxHQUFHLEdBQTdELEVBQWtFLEVBQWxFO0FBQ0g7QUFDRDtBQUNKLGtCQUFLLENBQUw7QUFDSSx3QkFBTyxJQUFJLENBQVgsRUFBYztBQUNWLHNCQUFDLFdBQVcsV0FBWCxHQUF5QixLQUFLLE9BQU8sR0FBUCxDQUEvQixFQUE0QyxRQUE1QyxDQUFxRCxJQUFyRCxDQUEwRCxHQUFHLEdBQTdELEVBQWtFLEVBQWxFLEVBQXNFLEVBQXRFO0FBQ0g7QUFDRDtBQUNKO0FBQ0ksd0JBQU8sSUFBSSxDQUFYLEVBQWM7QUFDVixzQkFBQyxXQUFXLFdBQVgsR0FBeUIsS0FBSyxPQUFPLEdBQVAsQ0FBL0IsRUFBNEMsUUFBNUMsQ0FBcUQsS0FBckQsQ0FBMkQsR0FBRyxHQUE5RCxFQUFtRSxJQUFuRTtBQUNIO0FBQ0Q7QUFwQlI7QUFzQkg7QUFDSjs7QUFFRCxZQUFXLFdBQVgsR0FBeUI7QUFDckIsV0FBTSxFQURlO0FBRXJCLFdBQU07QUFGZSxFQUF6QixDOzs7Ozs7OzswQ0MxQzJCLEU7O2tCQUVaLFVBQVMsTUFBVCxFQUFpQixNQUFqQixFQUF5QjtBQUNwQyxTQUFNLGVBQWUsV0FBVyxJQUFYLEdBQWtCLE1BQWxCLEdBQTJCLE9BQU8sTUFBdkQ7O0FBRUEsU0FBSSxpQkFBaUIsUUFBckIsRUFBK0I7QUFDM0IsZUFBTSxlQUFlLG9CQUFmLEVBQXFDO0FBQ3ZDLG1CQUFNLFlBRGlDO0FBRXZDO0FBRnVDLFVBQXJDLENBQU47QUFJSDtBQUNKLEU7Ozs7Ozs7O0FDWEQsS0FBTSxxQkFBcUIsZ0JBQTNCOztBQUVBLEtBQU0sU0FBUztBQUNYLDZCQUF3QixnQkFBbUI7QUFBQSxhQUFoQixHQUFnQixRQUFoQixHQUFnQjtBQUFBLGFBQVgsSUFBVyxRQUFYLElBQVc7O0FBQ3ZDLGFBQU0sZUFBZSxPQUFPLElBQVAsS0FBZ0IsUUFBaEIseUJBQStDLElBQS9DLEdBQXdELEVBQTdFO0FBQ0EsZ0JBQVUsa0JBQVYsNkJBQW9ELEdBQXBELFNBQTJELFlBQTNEO0FBQ0gsTUFKVTtBQUtYLDBCQUFxQjtBQUFBLGdCQUFNLDBDQUFOO0FBQUEsTUFMVjtBQU1YLHVDQUFrQyxpQkFBZ0I7QUFBQSxhQUFiLE1BQWEsU0FBYixNQUFhOztBQUM5QyxhQUFNLFVBQVUsQ0FBQyxNQUFELEdBQVUsUUFBVixHQUFxQixPQUFyQztBQUNBLGdCQUFVLGtCQUFILFVBQTBCLE9BQTFCLHFEQUNELGtEQUROO0FBRUgsTUFWVTtBQVdYLDJCQUFzQjtBQUFBLGFBQUcsSUFBSCxTQUFHLElBQUg7QUFBQSxhQUFTLE1BQVQsU0FBUyxNQUFUO0FBQUEsNkJBQ1AsTUFETywwQkFDb0IsSUFEcEI7QUFBQTtBQVhYLEVBQWY7O2tCQWV3QixjO0FBQVQsVUFBUyxjQUFULENBQXdCLEdBQXhCLEVBQTZCLElBQTdCLEVBQW1DO0FBQzlDLFNBQU0sV0FBVyxPQUFPLEdBQVAsQ0FBakI7QUFDQSxTQUFJLENBQUMsUUFBTCxFQUFlO0FBQ1gsZUFBTSwwQkFBd0IsR0FBeEIsT0FBTjtBQUNIOztBQUVELFlBQU8sSUFBSSxLQUFKLENBQVUsT0FBTyxHQUFQLEVBQVksSUFBWixDQUFWLENBQVA7QUFDSCxFOzs7Ozs7OztBQ3hCRDtBQUNBO0FBQ0EsS0FBTSxhQUFhLFVBQUMsRUFBRCxFQUFLLEVBQUw7QUFBQSxZQUNmLE9BQU8sQ0FBUCxJQUFZLE9BQU8sQ0FBbkIsR0FBdUIsSUFBSSxFQUFKLEtBQVcsSUFBSSxFQUF0QyxHQUEyQyxPQUFPLEVBQVAsSUFBYSxPQUFPLEVBQXBCLElBQTBCLE9BQU8sRUFEN0Q7QUFBQSxFQUFuQjs7a0JBR2UsT0FBTyxFQUFQLElBQWEsVTs7Ozs7Ozs7dUNDTEosRTs7K0JBQ1IsRTs7QUFFaEIsS0FBTSxVQUFVLEdBQWhCO0FBQ0EsS0FBTSxvQkFBb0IsNEJBQTFCOztBQUVBO2tCQUN3QixRO0FBQVQsVUFBUyxRQUFULENBQWtCLE1BQWxCLEVBQTBCLFFBQTFCLEVBQW9DO0FBQy9DLFNBQUksY0FBSjs7QUFFQSxTQUFJLE9BQU8sUUFBUCxJQUFtQixRQUFuQixJQUErQixDQUFDLFFBQVEsSUFBUixDQUFhLFFBQWIsQ0FBaEMsSUFBMEQsa0JBQWtCLElBQWxCLENBQXVCLFFBQXZCLENBQTlELEVBQWdHO0FBQzVGLGlCQUFRLFlBQVksTUFBWixFQUFvQixRQUFwQixDQUFSO0FBQ0gsTUFGRCxNQUVPO0FBQ0gsaUJBQVEsSUFBSSxDQUFKLENBQU0sUUFBTixDQUFSO0FBQ0g7O0FBRUQsWUFBTyxLQUFQO0FBQ0gsRTs7Ozs7Ozs7Z0NDakJnQixFOzttQ0FDRyxFOzsrQkFDSixFOztBQUVoQixLQUFNLG9CQUFvQixnRUFBMUI7O0FBRUE7QUFDQTtrQkFDd0IsVztBQUFULFVBQVMsV0FBVCxDQUFxQixNQUFyQixFQUE2QixhQUE3QixFQUE0QztBQUFBLHFCQUNyQyxLQUFLLEdBQUwsQ0FBUyxNQUFULENBRHFDOztBQUFBLFNBQy9DLEtBRCtDLGFBQy9DLEtBRCtDOztBQUV2RCxTQUFNLFlBQVksY0FBYyxLQUFkLENBQW9CLEdBQXBCLENBQWxCO0FBQ0EsU0FBSSxTQUFTLElBQUksQ0FBSixFQUFiOztBQUh1RCx5QkFLMUMsU0FMMEMsZUFLL0IsUUFMK0IseUJBSy9CLFFBTCtCLGdEQUtuQjtBQUNoQyxhQUFNLGFBQWEsa0JBQWtCLElBQWxCLENBQXVCLFFBQXZCLENBQW5CO0FBQ0EsYUFBRyxVQUFILEVBQWU7QUFBQTtBQUNYLHFCQUFNLFdBQVcsV0FBVyxDQUFYLE1BQWtCLFNBQWxCLEdBQThCLFNBQTlCLEdBQTBDLFdBQVcsQ0FBWCxDQUEzRDtBQUNBLHFCQUFNLGNBQWMsV0FBVyxDQUFYLE1BQWtCLFNBQWxCLEdBQThCLFdBQVcsQ0FBWCxDQUE5QixHQUE4QyxXQUFXLENBQVgsQ0FBbEU7QUFDQSxxQkFBTSxVQUFVLE1BQU0sUUFBTixDQUFoQjs7QUFFQSxxQkFBRyxPQUFILEVBQVk7QUFBQSx5QkFDQSxRQURBLEdBQ2EsT0FEYixDQUNBLFFBREE7O0FBRVIseUJBQUcsUUFBSCxFQUFhO0FBQUE7QUFDVCxpQ0FBTSxhQUFhLE1BQU0sU0FBUyxNQUFmLENBQW5COztBQUtBO0FBQ0E7QUFQUyxnREFFSSxRQUZKLEVBRXdCLENBRnhCLE1BRWUsT0FGZix1QkFFZSxPQUZmLFdBRXdCLENBRnhCLEdBRXdCLENBRnhCLE9BRXdCLENBRnhCLElBRThCO0FBQ25DLDRDQUFXLENBQVgsSUFBZ0IsUUFBUSxJQUF4QjtBQUNIOztBQUlELGlDQUFJLFdBQUosRUFBaUI7QUFDYjtBQUNBO0FBQ0EscUNBQUksWUFBWSxPQUFaLENBQW9CLEdBQXBCLE1BQTZCLENBQWpDLEVBQW9DO0FBQUEseURBRW5CLFVBRm1CLGNBRU4sSUFGTSx5QkFFTixJQUZNLDZDQUVHO0FBQy9CLDZDQUFNLGFBQWEsT0FBSSxLQUFLLE1BQUwsRUFBSixFQUFvQixPQUFwQixDQUE0QixHQUE1QixFQUFpQyxFQUFqQyxDQUFuQjtBQUNBLDhDQUFLLFlBQUwsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUI7QUFDQSw2Q0FBTSxXQUFXLEtBQUssZ0JBQUwsT0FBMEIsVUFBMUIsVUFBeUMsVUFBekMsV0FBeUQsV0FBekQsQ0FBakI7QUFDQSxrREFBUyxPQUFPLEdBQVAsQ0FBVyxRQUFRLFFBQVIsQ0FBWCxDQUFUO0FBQ0EsOENBQUssZUFBTCxDQUFxQixNQUFyQjtBQUNIO0FBUEQ7O0FBUUgsa0NBVEQsTUFTTztBQUFBLHlEQUVVLFVBRlYsZUFFdUIsSUFGdkIseUJBRXVCLElBRnZCLGdEQUVnQztBQUMvQiw2Q0FBTSxXQUFXLEtBQUssZ0JBQUwsQ0FBc0IsV0FBdEIsQ0FBakI7QUFDQSxrREFBUyxPQUFPLEdBQVAsQ0FBVyxRQUFRLFFBQVIsQ0FBWCxDQUFUO0FBQ0g7QUFKRDs7QUFLSDtBQUNKLDhCQW5CRCxNQW1CTztBQUNIO0FBQ0EsMENBQVMsT0FBTyxHQUFQLENBQVcsVUFBWCxDQUFUO0FBQ0g7QUE5QlE7QUErQlo7QUFDSjtBQXZDVTtBQXdDZCxVQXhDRCxNQXdDTztBQUNIO0FBQ0Esc0JBQVMsT0FBTyxHQUFQLENBQVcsUUFBWCxDQUFUO0FBQ0g7QUFDSjs7QUFFRCxZQUFPLE1BQVA7QUFDSCxFOzs7Ozs7OztrQkM5RHVCLE87QUFBVCxVQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFBeUIsS0FBekIsRUFBZ0M7QUFDOUMsTUFBSSxRQUFRLEVBQVo7QUFBQSxNQUNDLElBQUksT0FBTyxNQURaO0FBQUEsTUFFQyxDQUZEOztBQUlBLFVBQVEsU0FBUyxDQUFqQjs7QUFFQSxPQUFLLElBQUksS0FBVCxFQUFnQixJQUFJLENBQXBCLEVBQXVCLEdBQXZCLEVBQTRCO0FBQzNCLFNBQU0sSUFBSSxLQUFWLElBQW1CLE9BQU8sQ0FBUCxDQUFuQjtBQUNBOztBQUVELFNBQU8sS0FBUDtBQUNBLEU7Ozs7Ozs7O3lDQ1p5QixFOztBQUUxQixLQUFNLE1BQU07QUFDUixRQUFHO0FBREssRUFBWjs7a0JBSWUsRzs7Ozs7Ozs7a0NDTEksRTs7QUFFbkIsS0FBTSxnQkFBZ0IseUJBQXlCLEtBQXpCLENBQStCLElBQS9CLENBQXRCLEMsQ0FIQTs7O0FBS0EsS0FBTSxlQUFlLE9BQU8sQ0FBUCxLQUFhLFVBQWIsR0FBMEIsQ0FBMUIsR0FBOEIsSUFBbkQ7QUFDQSxLQUFJLGtCQUFrQixJQUF0Qjs7QUFFQSxLQUFJLFlBQUosRUFBa0I7QUFDZCxTQUFNLEtBQUssYUFBYSxFQUFiLElBQW1CLGFBQWEsU0FBM0M7QUFDQSxVQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksY0FBYyxNQUFsQyxFQUEwQyxHQUExQyxFQUErQztBQUMzQyxhQUFJLENBQUMsR0FBRyxjQUFjLENBQWQsQ0FBSCxDQUFMLEVBQTJCO0FBQ3ZCLCtCQUFrQixLQUFsQjtBQUNBO0FBQ0g7QUFDSjs7QUFFRCxTQUFJLENBQUMsYUFBYSxTQUFsQixFQUE2QjtBQUN6QixzQkFBYSxTQUFiLEdBQXlCLE9BQU8sU0FBaEM7QUFDSDtBQUNKLEVBWkQsTUFZTztBQUNILHVCQUFrQixLQUFsQjtBQUNIOztrQkFFYyxrQkFBa0IsWUFBbEIsR0FBaUMsTTs7Ozs7Ozs7Z0NDeEIvQixFOztrQ0FDRSxFOztxQ0FDRyxFOzsrQkFDTixFOztrQ0FDRyxFOzs4QkFDSixFOzsrQkFDQyxFOzs4QkFDRCxFOzsrQkFDQyxFOzsrQkFDQSxFOztnQ0FDQyxFOztBQUVqQjtBQUNBO2tCQUN3QixNO0FBQVQsVUFBUyxNQUFULENBQWdCLFFBQWhCLEVBQTBCLE9BQTFCLEVBQW1DO0FBQzlDLFlBQU8sSUFBSSxJQUFKLENBQVMsUUFBVCxFQUFtQixPQUFuQixDQUFQO0FBQ0g7O2VBRVcsTTs7cUJBQVE7QUFDaEIsU0FBSSxLQUFLLFNBRE87QUFFaEIsbUJBRmdCO0FBR2hCLHlCQUhnQjtBQUloQixhQUpnQjtBQUtoQjtBQUxnQixFOzs7OztnQkFRUixPQUFPLEU7O3FCQUFJO0FBQ25CLFdBRG1CO0FBRW5CLGFBRm1CO0FBR25CLFdBSG1CO0FBSW5CLGFBSm1CO0FBS25CLGFBTG1CO0FBTW5CO0FBTm1CLEU7Ozs7Ozs7Ozs7O3lDQzFCRyxFOztBQUUxQjtBQUNBO0FBQ0EsVUFBUyxVQUFULENBQW9CLFFBQXBCLEVBQThCLE9BQTlCLEVBQXVDO0FBQ25DLFNBQUksZUFBSjs7QUFFQSxTQUFJLFFBQUosRUFBYztBQUNWLGFBQUksU0FBUyxRQUFULElBQXFCLE9BQU8sTUFBUCxLQUFrQixRQUFsQixJQUE4QixhQUFhLE1BQXBFLEVBQTRFO0FBQ3hFLHNCQUFTLENBQUMsUUFBRCxDQUFUO0FBQ0gsVUFGRCxNQUVPLElBQUksT0FBTyxRQUFQLEtBQW9CLFFBQXhCLEVBQWtDO0FBQ3JDLGlCQUFJLElBQUksSUFBSixDQUFTLFFBQVQsQ0FBSixFQUF3QjtBQUNwQiwwQkFBUyxjQUFjLFFBQWQsQ0FBVDtBQUNILGNBRkQsTUFFTztBQUNILHFCQUFJLE9BQUosRUFBYTtBQUNULHlCQUFNLGFBQWMsSUFBSSxVQUFKLENBQWUsT0FBZixDQUFELENBQTBCLENBQTFCLENBQW5COztBQUVBLHlCQUFJLFVBQUosRUFBZ0I7QUFDWixrQ0FBUyxXQUFXLGdCQUFYLENBQTRCLFFBQTVCLENBQVQ7QUFDSDtBQUNKLGtCQU5ELE1BTU87QUFDSCw4QkFBUyxTQUFTLGdCQUFULENBQTBCLFFBQTFCLENBQVQ7QUFDSDtBQUNKO0FBQ0w7QUFDQyxVQWZNLE1BZUEsSUFBSSxvQkFBb0IsUUFBeEIsRUFBa0M7QUFDckMsaUJBQUksU0FBUyxVQUFULEtBQXdCLFNBQTVCLEVBQXVDO0FBQ25DLDBCQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxRQUE5QztBQUNILGNBRkQsTUFFTztBQUNIO0FBQ0g7QUFDSixVQU5NLE1BTUE7QUFDSCxzQkFBUyxRQUFUO0FBQ0g7QUFDSjs7QUFFRCxTQUFNLFNBQVMsVUFBVSxPQUFPLE1BQWhDOztBQUVBLFNBQUksTUFBSixFQUFZO0FBQ1IsY0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQXBCLEVBQTRCLEdBQTVCLEVBQWlDO0FBQzdCLGtCQUFLLElBQUwsQ0FBVSxPQUFPLENBQVAsQ0FBVjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxZQUFXLFNBQVgsR0FBdUIsRUFBdkI7O2tCQUVlLFU7Ozs7Ozs7O0FDL0NmO2tCQUN3QixhO0FBQVQsVUFBUyxhQUFULENBQXVCLFNBQXZCLEVBQWtDO0FBQzdDO0FBQ0EsU0FBTSxVQUFVO0FBQ1osaUJBQVEsQ0FBQyxDQUFELEVBQUksOEJBQUosRUFBb0MsV0FBcEMsQ0FESTtBQUVaLGlCQUFRLENBQUMsQ0FBRCxFQUFJLFlBQUosRUFBa0IsYUFBbEIsQ0FGSTtBQUdaLGdCQUFPLENBQUMsQ0FBRCxFQUFJLFNBQUosRUFBZSxVQUFmLENBSEs7QUFJWixhQUFJLENBQUMsQ0FBRCxFQUFJLGdCQUFKLEVBQXNCLGtCQUF0QixDQUpRO0FBS1osYUFBSSxDQUFDLENBQUQsRUFBSSxvQkFBSixFQUEwQix1QkFBMUIsQ0FMUTtBQU1aLGNBQUssQ0FBQyxDQUFELEVBQUksa0NBQUosRUFBd0MscUJBQXhDLENBTk87QUFPWixlQUFNLENBQUMsQ0FBRCxFQUFJLE9BQUosRUFBYSxRQUFiLENBUE07QUFRWixZQUFHLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSO0FBUlMsTUFBaEI7O0FBV0EsU0FBTSxPQUFPLFVBQVUsT0FBVixDQUFrQixZQUFsQixFQUFnQyxFQUFoQyxDQUFiO0FBQ0EsU0FBSSxPQUFPLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0EsU0FBSSxVQUFKOztBQUVBLGFBQVEsUUFBUixHQUFtQixRQUFRLE1BQTNCO0FBQ0EsYUFBUSxLQUFSLEdBQWdCLFFBQVEsS0FBUixHQUFnQixRQUFRLFFBQVIsR0FBbUIsUUFBUSxPQUFSLEdBQWtCLFFBQVEsS0FBN0U7QUFDQSxhQUFRLEVBQVIsR0FBYSxRQUFRLEVBQXJCOztBQUVBLFNBQU0sS0FBSyxZQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBWDtBQUNBLFNBQU0sVUFBVSxNQUFNLFFBQVEsR0FBRyxDQUFILENBQVIsQ0FBTixJQUF3QixRQUFRLENBQWhEOztBQUVBLFVBQUssU0FBTCxHQUFpQixRQUFRLENBQVIsSUFBYSxJQUFiLEdBQW9CLFFBQVEsQ0FBUixDQUFyQzs7QUFFQSxTQUFJLFFBQVEsQ0FBUixDQUFKOztBQUVBLFlBQU8sR0FBUCxFQUFZO0FBQ1IsZ0JBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFQO0FBQ0g7O0FBRUQsWUFBTyxLQUFLLFVBQVo7QUFDSCxFOzs7Ozs7OztBQ2xDRDtBQUNBO0FBQ0E7O0FBRUEsS0FBTSxTQUFTLE9BQU8sTUFBUCxJQUFpQixTQUFTLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBd0I7QUFDcEQ7QUFDQSxTQUFJLFdBQVcsU0FBWCxJQUF3QixXQUFXLElBQXZDLEVBQTZDO0FBQ3pDLGVBQU0sSUFBSSxTQUFKLENBQWMsNENBQWQsQ0FBTjtBQUNIOztBQUVELFNBQU0sU0FBUyxPQUFPLE1BQVAsQ0FBZjtBQUNBLFVBQUssSUFBSSxRQUFRLENBQWpCLEVBQW9CLFFBQVEsVUFBVSxNQUF0QyxFQUE4QyxPQUE5QyxFQUF1RDtBQUNuRCxhQUFNLFNBQVMsVUFBVSxLQUFWLENBQWY7QUFDQSxhQUFJLFdBQVcsU0FBWCxJQUF3QixXQUFXLElBQXZDLEVBQTZDO0FBQ3pDLGtCQUFLLElBQU0sT0FBWCxJQUFzQixNQUF0QixFQUE4QjtBQUMxQixxQkFBSSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsQ0FBSixFQUFvQztBQUNoQyw0QkFBTyxPQUFQLElBQWtCLE9BQU8sT0FBUCxDQUFsQjtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVELFlBQU8sTUFBUDtBQUNILEVBbkJEOztrQkFxQmUsTTs7Ozs7Ozs7eUNDekJXLEU7O2dDQUNULEU7O0FBRWpCO2tCQUN3QixTO0FBQVQsVUFBUyxTQUFULENBQW1CLElBQW5CLEVBQXlCO0FBQ3BDLFlBQU8sSUFBSSxJQUFKLENBQVMsY0FBYyxJQUFkLENBQVQsQ0FBUDtBQUNILEU7Ozs7Ozs7O2dDQ05nQixFOztBQUVqQjtrQkFDd0IsRztBQUFULFVBQVMsR0FBVCxDQUFhLENBQWIsRUFBZ0IsT0FBaEIsRUFBeUI7QUFDcEMsWUFBTyxJQUFJLElBQUosQ0FBUyxDQUFULEVBQVksT0FBWixFQUFxQixDQUFyQixDQUFQO0FBQ0gsRTs7Ozs7Ozs7QUNMRDtBQUNBO2tCQUN3QixNO0FBQVQsVUFBUyxNQUFULENBQWdCLE9BQWhCLEVBQXlCLEtBQXpCLEVBQWdDO0FBQzNDLFNBQUksT0FBTyxPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQzdCLGlCQUFRLE9BQVI7QUFDQSxtQkFBVSxNQUFNLE9BQWhCO0FBQ0g7O0FBRUQsU0FBTSxLQUFLLFNBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFYOztBQUVBLFNBQUksS0FBSixFQUFXO0FBQUEsNkJBQ0ssS0FETCwyQ0FDb0IsR0FEcEIsRUFDYSxLQURiLHdCQUNvQixHQURwQixnQkFDYSxLQURiLFlBQ29CLEdBRHBCLHNCQUM0QjtBQUMvQixpQkFBSSxRQUFRLFlBQVIsSUFBd0IsT0FBTyxLQUFQLEtBQWlCLFFBQTdDLEVBQXVEO0FBQUEsb0NBQ3ZDLEtBRHVDLHdDQUNwQixRQURvQixFQUMvQixTQUQrQixzQkFDcEIsUUFEb0IsY0FDL0IsU0FEK0IsV0FDcEIsUUFEb0IsbUJBQ1A7QUFDeEMsd0JBQUcsWUFBSCxDQUFnQixRQUFoQixFQUEwQixTQUExQjtBQUNIO0FBQ0osY0FKRCxNQUlPLElBQUksUUFBUSxVQUFSLElBQXNCLEtBQTFCLEVBQWlDO0FBQUEscUNBQ3ZCLEtBRHVCLGNBQ2YsS0FEZSx5QkFDZixLQURlLDZDQUNMO0FBQzNCLHdCQUFHLFdBQUgsQ0FBZSxPQUFPLEtBQVAsQ0FBZjtBQUNIO0FBQ0osY0FKTSxNQUlBLElBQUksR0FBRyxHQUFILEtBQVcsT0FBTyxHQUFHLEdBQUgsQ0FBUCxLQUFtQixRQUE5QixJQUEwQyxPQUFPLEtBQVAsS0FBaUIsUUFBL0QsRUFBeUU7QUFBQSwrQkFDaEUsR0FBRyxHQUFILENBRGdFOztBQUFBLHFDQUN2RCxLQUR1RDtBQUFBO0FBQUE7QUFBQTtBQUUvRSxjQUZNLE1BRUEsSUFBSSxRQUFRLFNBQVosRUFBdUI7QUFDMUIsb0JBQUcsR0FBSCxJQUFVLEtBQVY7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsWUFBTyxFQUFQO0FBQ0gsRTs7Ozs7Ozs7Z0NDN0JnQixFOzs4QkFDRixFOztBQUVmO0FBQ0EsVUFBUyxlQUFULENBQXlCLEdBQXpCLEVBQThCLFFBQTlCLEVBQXdDLE9BQXhDLEVBQWlEO0FBQzdDLFNBQU0sV0FBVyxLQUFLLE1BQUwsR0FBYyxRQUFkLEdBQXlCLE9BQXpCLENBQWlDLElBQWpDLEVBQXVDLEdBQXZDLENBQWpCO0FBQ0EsU0FBTSxzQkFBb0IsUUFBcEIsVUFBaUMsUUFBakMsUUFBTjtBQUNBLFNBQU0sbUJBQW1CLFNBQVMsS0FBVCxDQUFlLEdBQWYsQ0FBekI7O0FBRUEsU0FBSSxXQUFXLEVBQWY7O0FBRUEsVUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGlCQUFpQixNQUFyQyxFQUE2QyxHQUE3QyxFQUFrRDtBQUM5QyxhQUFNLE1BQU0saUJBQWlCLENBQWpCLENBQVo7QUFDQSwyQkFBZSxNQUFNLENBQU4sR0FBVSxFQUFWLEdBQWUsR0FBOUIsSUFBb0MsYUFBcEMsR0FBb0QsR0FBcEQsU0FBMkQsYUFBM0QsR0FBMkUsR0FBM0U7QUFDSDs7QUFHRCxVQUFLLFlBQUwsQ0FBa0IsUUFBbEIsRUFBNEIsUUFBNUI7O0FBRUEsU0FBSSxHQUFHLElBQUgsQ0FBUSxDQUFDLElBQUksTUFBTCxDQUFSLEVBQXNCLFFBQXRCLENBQUosRUFBcUM7QUFDakMsaUJBQVEsSUFBUixDQUFhLElBQWIsRUFBbUIsR0FBbkI7QUFDSDs7QUFFRCxVQUFLLGVBQUwsQ0FBcUIsUUFBckI7QUFDSDs7QUFFRDtrQkFDd0IsRTtBQUFULFVBQVMsRUFBVCxDQUFZLFFBQVosRUFBc0IsUUFBdEIsRUFBZ0MsT0FBaEMsRUFBeUM7QUFDcEQsU0FBTSxRQUFRLFNBQVMsS0FBVCxDQUFlLElBQWYsQ0FBZDtBQUNBLFNBQUksaUJBQUo7O0FBRUEsU0FBSSxPQUFPLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDaEMsbUJBQVUsUUFBVixDQURnQyxDQUNaO0FBQ3BCLG9CQUFXLElBQVgsQ0FGZ0MsQ0FFZjtBQUNwQjs7QUFFRCxTQUFJLFFBQUosRUFBYztBQUNWLG9CQUFXLFNBQVMscUJBQVQsQ0FBK0IsR0FBL0IsRUFBb0M7QUFDM0MsNkJBQWdCLElBQWhCLENBQXFCLElBQXJCLEVBQTJCLEdBQTNCLEVBQWdDLFFBQWhDLEVBQTBDLE9BQTFDO0FBQ0gsVUFGRDtBQUdIOztBQUVELFVBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxNQUFNLE1BQTFCLEVBQWtDLEdBQWxDLEVBQXVDO0FBQ25DLGFBQUksT0FBTyxNQUFNLENBQU4sRUFBUyxLQUFULENBQWUsUUFBZixDQUFYO0FBQ0EsYUFBTSxZQUFZLEtBQUssQ0FBTCxDQUFsQjtBQUNBLGdCQUFPLEtBQUssQ0FBTCxDQUFQOztBQUVBLGNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxLQUFLLE1BQXpCLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDLGlCQUFNLE9BQU8sS0FBSyxDQUFMLENBQWI7QUFDQSxpQkFBTSxTQUFTLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBTCxJQUFXLEVBQUUsS0FBSyxTQUEzQztBQUNBLGlCQUFNLFNBQVMsS0FBSyxTQUFMLENBQWUsT0FBTyxNQUF0QixJQUFnQyxLQUFLLFNBQUwsQ0FBZSxPQUFPLE1BQXRCLEtBQWlDLEVBQWhGOztBQUVBLGlCQUFJLFFBQVEsS0FBWjs7QUFHQSxrQkFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE9BQU8sTUFBM0IsRUFBbUMsR0FBbkMsRUFBd0M7QUFDcEMscUJBQU0sUUFBUSxPQUFPLENBQVAsQ0FBZDs7QUFFQSxxQkFBSSxZQUFZLE1BQU0sT0FBbEIsS0FBOEIsQ0FBQyxRQUFELElBQWEsYUFBYSxNQUFNLFFBQTlELENBQUosRUFBNkU7QUFDekUsNkJBQVEsSUFBUjtBQUNBO0FBQ0g7QUFDSjs7QUFFRCxpQkFBSSxDQUFDLEtBQUwsRUFBWTtBQUNSLHdCQUFPLElBQVAsQ0FBWTtBQUNSLHVDQURRO0FBRVIscUNBRlE7QUFHUix5Q0FIUTtBQUlSO0FBSlEsa0JBQVo7O0FBT0Esc0JBQUssZ0JBQUwsQ0FBc0IsSUFBdEIsRUFBNEIsWUFBWSxPQUF4QyxFQUFpRCxLQUFqRDtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxZQUFPLElBQVA7QUFDSCxFOzs7Ozs7OztBQzlFRDtBQUNBO2tCQUNlO0FBQ1gsZ0JBQVcsQ0FEQTtBQUVYLGdCQUFXO0FBRkEsRTs7Ozs7Ozs7QUNGZjtrQkFDd0IsRTtBQUFULFVBQVMsRUFBVCxDQUFZLENBQVosRUFBZTtBQUMxQixTQUFNLE9BQU8sS0FBSyxDQUFMLENBQWI7QUFDQSxZQUFPLE9BQ0QsQ0FBQyxLQUFLLE9BQUwsSUFDSSxLQUFLLHFCQURULElBRUksS0FBSyxrQkFGVCxJQUdJLEtBQUssaUJBSFQsSUFJSSxLQUFLLGdCQUpWLEVBSTRCLElBSjVCLENBSWlDLElBSmpDLEVBSXVDLENBSnZDLENBREMsR0FLMkMsS0FMbEQ7QUFNSCxFOzs7Ozs7OztnQ0NUZ0IsRTs7QUFFakI7a0JBQ3dCLEc7QUFBVCxVQUFTLEdBQVQsQ0FBYSxLQUFiLEVBQW9CLFFBQXBCLEVBQThCLE9BQTlCLEVBQXVDO0FBQ2xELFNBQUksT0FBTyxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DO0FBQ2hDLG1CQUFVLFFBQVYsQ0FEZ0MsQ0FDWjtBQUNwQixvQkFBVyxJQUFYLENBRmdDLENBRWQ7QUFDckI7O0FBRUQsYUFBUSxNQUFNLEtBQU4sQ0FBWSxJQUFaLENBQVI7O0FBRUEsVUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDbkMsYUFBSSxPQUFPLE1BQU0sQ0FBTixFQUFTLEtBQVQsQ0FBZSxRQUFmLENBQVg7QUFDQSxhQUFNLFlBQVksS0FBSyxDQUFMLENBQWxCO0FBQ0EsZ0JBQU8sS0FBSyxDQUFMLENBQVA7O0FBRUEsY0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssTUFBekIsRUFBaUMsR0FBakMsRUFBc0M7QUFDbEMsaUJBQU0sT0FBTyxLQUFLLENBQUwsQ0FBYjtBQUNBLGlCQUFNLFNBQVMsS0FBSyxTQUFMLENBQWUsT0FBTyxLQUFLLEVBQTNCLENBQWY7O0FBRUEsaUJBQUksTUFBSixFQUFZO0FBQ1Isc0JBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLHlCQUFNLFFBQVEsT0FBTyxDQUFQLENBQWQ7QUFDQSx5QkFDSSxDQUFDLENBQUMsT0FBRCxJQUFZLFlBQVksTUFBTSxPQUE5QixJQUF5QyxZQUFZLE1BQU0sUUFBNUQsTUFDSSxDQUFDLFNBQUQsSUFBYyxjQUFjLE1BQU0sU0FEdEMsTUFFSSxDQUFDLFFBQUQsSUFBYSxhQUFhLE1BQU0sUUFGcEMsQ0FESixFQUlFO0FBQ0UsOEJBQUssbUJBQUwsQ0FBeUIsSUFBekIsRUFBK0IsTUFBTSxRQUFOLElBQWtCLE1BQU0sT0FBdkQ7QUFDQSxnQ0FBTyxNQUFQLENBQWMsR0FBZCxFQUFtQixDQUFuQjtBQUNIO0FBQ0o7QUFDSixjQVpELE1BWU87QUFDSCxxQkFBSSxDQUFDLFNBQUQsSUFBYyxDQUFDLFFBQW5CLEVBQTZCO0FBQ3pCLDBCQUFLLG1CQUFMLENBQXlCLElBQXpCLEVBQStCLE9BQS9CO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBRUQsWUFBTyxJQUFQO0FBQ0gsRTs7Ozs7Ozs7Z0NDekNnQixFOztnQ0FDQSxFOztBQUVqQjtrQkFDd0IsRztBQUFULFVBQVMsR0FBVCxDQUFhLFFBQWIsRUFBdUI7QUFDbEMsU0FBTSxRQUFRLEVBQWQ7O0FBRUEsU0FBSSxlQUFKOztBQUVBLGdCQUFXLElBQUksSUFBSixDQUFTLFFBQVQsQ0FBWDs7QUFFQSxTQUFJLEtBQUssTUFBVCxFQUFpQjtBQUNiLGtCQUFTLElBQUksSUFBSixDQUFTLElBQVQsQ0FBVDtBQUNBLGNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLE1BQTNCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLGlCQUFNLE9BQU8sT0FBTyxDQUFQLENBQWI7QUFDQSxpQkFBTSxTQUFTLEtBQUssRUFBTCxHQUFVLEtBQUssRUFBTCxJQUFXLEVBQUUsS0FBSyxTQUEzQztBQUNBLG1CQUFNLE1BQU4sSUFBZ0IsQ0FBaEI7QUFDSDs7QUFFRCxjQUFLLElBQUksS0FBSSxDQUFiLEVBQWdCLEtBQUksU0FBUyxNQUE3QixFQUFxQyxJQUFyQyxFQUEwQztBQUN0QyxpQkFBTSxRQUFPLFNBQVMsRUFBVCxDQUFiO0FBQ0EsaUJBQU0sVUFBUyxNQUFLLEVBQUwsR0FBVSxNQUFLLEVBQUwsSUFBVyxFQUFFLEtBQUssU0FBM0M7QUFDQSxpQkFBSSxDQUFDLE1BQU0sT0FBTixDQUFMLEVBQW9CO0FBQ2hCLHVCQUFNLE9BQU4sSUFBZ0IsQ0FBaEI7QUFDQSx3QkFBTyxJQUFQLENBQVksS0FBWjtBQUNIO0FBQ0o7QUFDSixNQWhCRCxNQWdCTztBQUNILGtCQUFTLFFBQVQ7QUFDSDs7QUFFRCxZQUFPLE1BQVA7QUFDSCxFOzs7Ozs7OztnQ0NoQ2dCLEU7O0FBRWpCO2tCQUN3QixHO0FBQVQsVUFBUyxHQUFULENBQWEsUUFBYixFQUF1QjtBQUNsQyxTQUFNLFNBQVMsSUFBSSxJQUFKLEVBQWY7O0FBRUEsVUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEtBQUssTUFBekIsRUFBaUMsR0FBakMsRUFBc0M7QUFDbEMsYUFBSSxDQUFDLElBQUksSUFBSixDQUFTLEtBQUssQ0FBTCxDQUFULEVBQWtCLEVBQWxCLENBQXFCLFFBQXJCLENBQUwsRUFBcUM7QUFDakMsb0JBQU8sSUFBUCxDQUFZLEtBQUssQ0FBTCxDQUFaO0FBQ0g7QUFDSjs7QUFFRCxZQUFPLE1BQVA7QUFDSCxFOzs7Ozs7OztnQ0NiZ0IsRTs7QUFFakI7QUFDQTtrQkFDd0IsSTtBQUFULFVBQVMsSUFBVCxDQUFjLFFBQWQsRUFBd0I7QUFDbkMsU0FBSSxTQUFTLElBQUksSUFBSixFQUFiOztBQURtQyx3QkFHdEIsSUFIc0IsY0FHaEIsRUFIZ0IsdUJBR2hCLEVBSGdCLDJDQUdWO0FBQ3JCLGtCQUFTLE9BQU8sR0FBUCxDQUFXLEdBQUcsZ0JBQUgsQ0FBb0IsUUFBcEIsQ0FBWCxDQUFUO0FBQ0g7O0FBRUQsWUFBTyxNQUFQO0FBQ0gsRTs7Ozs7Ozs7c0NDWnNCLEU7O0FBQ3ZCO0FBQ0E7QUFDQTtrQkFDd0IsYTtBQUFULFVBQVMsYUFBVCxPQVFaO0FBQUEsU0FQQyxTQU9ELFFBUEMsU0FPRDtBQUFBLFNBTkMsTUFNRCxRQU5DLE1BTUQ7QUFBQSxTQUxDLFFBS0QsUUFMQyxRQUtEO0FBQUEsU0FKQyxNQUlELFFBSkMsTUFJRDtBQUFBLFNBSEMsTUFHRCxRQUhDLE1BR0Q7QUFBQSxTQUZDLFlBRUQsUUFGQyxZQUVEO0FBQUEsU0FEQyxRQUNELFFBREMsUUFDRDs7QUFDQyxTQUFNLGlCQUFpQixTQUFTLE1BQWhDO0FBREQsU0FFYyxNQUZkLEdBRXlCLFNBRnpCLENBRU8sS0FGUDtBQUFBLFNBR3dCLGNBSHhCLEdBRzJDLFNBSDNDLENBR1MsYUFIVDs7O0FBS0MsU0FBSSxDQUFDLE1BQUwsRUFBYTtBQUNULGtCQUFTLE1BQVQ7QUFDQSxjQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksaUJBQWlCLENBQXJDLEVBQXdDLEdBQXhDLEVBQTZDO0FBQ3pDLHNCQUFTLE9BQU8sU0FBUyxDQUFULENBQVAsQ0FBVDtBQUNIO0FBQ0o7O0FBRUQsY0FBUyxNQUFULEVBQWlCLFNBQVMsaUJBQWlCLENBQTFCLENBQWpCLEVBQStDLE1BQS9DLEVBQXVELE1BQXZELEVBQStELFlBQS9EOztBQUVBO0FBQ0EsU0FBSSxrQkFBa0IsT0FBTyxjQUFQLEtBQTBCLFFBQWhELEVBQTBEO0FBQ3RELG9CQUFXLGNBQVgsRUFBMkIsU0FBUyxpQkFBaUIsQ0FBMUIsQ0FBM0IsRUFBeUQsTUFBekQ7QUFDSDtBQUNKLEU7Ozs7Ozs7OzJDQzlCMkIsRTs7Z0NBQ1gsRTs7b0NBQ0ksRTs7b0NBQ0EsRTs7OENBQ1UsRTs7eUNBQ0wsRTs7K0JBQ1YsRTs7a0JBRVEsVTtBQUFULFVBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QixHQUE1QixFQUFpQyxJQUFqQyxFQUF1QyxZQUF2QyxFQUFxRDtBQUNoRSxTQUFHLE9BQU8sSUFBUCxLQUFnQixRQUFoQixJQUE0QixLQUFLLElBQXBDLEVBQTBDO0FBQ3RDO0FBQ0Esd0JBQWUsSUFBZjtBQUNBLGdCQUFPLEdBQVA7QUFDQSxlQUFNLE1BQU47QUFDQSxrQkFBUyxJQUFUO0FBQ0gsTUFORCxNQU1PO0FBQ0g7QUFDQSx5QkFBZ0IsTUFBaEIsRUFBd0IsWUFBeEI7QUFDSDs7QUFFRCxTQUFJLGVBQWUsS0FBbkIsRUFBMEI7QUFDdEIsYUFBRyxPQUFPLElBQUksQ0FBSixDQUFQLEtBQWtCLFFBQXJCLEVBQStCO0FBQUEsZ0NBTWQsR0FOYyxjQU1ULE9BTlMsdUJBTVQsT0FOUztBQU1FLDRCQUFXLE1BQVgsRUFBbUIsT0FBbkIsRUFBNEIsSUFBNUIsRUFBa0MsWUFBbEM7QUFORjtBQUMzQjs7OztBQU1ILFVBUEQsTUFPTztBQUFBLGlDQUtVLEdBTFYsZ0dBUUc7QUFBQSxxQkFGRyxPQUVILFFBRkYsR0FFRTtBQUFBLHFCQURJLFFBQ0osUUFERixJQUNFOztBQUNGLDRCQUFXLE1BQVgsRUFBbUIsT0FBbkIsRUFBNEIsUUFBNUIsRUFBc0MsSUFBdEM7QUFDSDtBQVREOzs7OztBQVVIOztBQUVELGdCQUFPLE1BQVA7QUFDSDs7QUFFRDs7OztBQUlBLFNBQUksT0FBTyxPQUFPLEdBQVAsS0FBZSxRQUExQixFQUFvQztBQUFBLDZCQUNwQixHQURvQix5Q0FDRCxTQURDLEVBQ2QsV0FEYyx1QkFDRCxTQURDLGNBQ2QsV0FEYyxZQUNELFNBREM7QUFDYSx3QkFBVyxNQUFYLEVBQW1CLFNBQW5CLEVBQThCLFdBQTlCLEVBQTJDLElBQTNDO0FBRGI7O0FBRWhDLGdCQUFPLE1BQVA7QUFDSDs7QUFHRCxvQkFBZSxnQkFBZ0IsRUFBL0I7QUE5Q2dFLHlCQStDL0MsWUEvQytDO0FBQUEsU0ErQ3hELElBL0N3RCxpQkErQ3hELElBL0N3RDs7QUFnRGhFLFNBQU0sTUFBTSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQVo7O0FBRUEsU0FBRyxDQUFDLEdBQUosRUFBUztBQUNMLGdCQUFPLE1BQVA7QUFDSDs7QUFwRCtELFNBc0R4RCxLQXREd0QsR0FzRDlDLEdBdEQ4QyxDQXNEeEQsS0F0RHdEOztBQXdEaEU7QUFDQTs7QUFDQSxTQUFHLFFBQVEsSUFBUixJQUFnQixPQUFPLEdBQVAsS0FBZSxXQUFsQyxFQUErQztBQUFBLDZCQUMvQixLQUQrQiwyQ0FDWixHQURZLEVBQ3ZCLFNBRHVCLHdCQUNaLEdBRFksZ0JBQ3ZCLFNBRHVCLFlBQ1osR0FEWSxzQkFDSjtBQUNuQyx3QkFBVyxNQUFYLEVBQW1CLEdBQW5CLEVBQXdCLElBQXhCLEVBQThCLFlBQTlCO0FBQ0g7O0FBRUQsZ0JBQU8sTUFBUDtBQUNIOztBQUVEO0FBQ0EsU0FBRyxTQUFTLEtBQVosRUFBbUI7QUFDZixhQUFNLFdBQVcsSUFBSSxLQUFKLENBQVUsR0FBVixDQUFqQjtBQUNBLGFBQU0saUJBQWlCLFNBQVMsTUFBaEM7O0FBRUEsYUFBSSxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDcEIsaUJBQUksU0FBUyxNQUFiOztBQUVBLGtCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksaUJBQWlCLENBQXJDLEVBQXdDLEdBQXhDLEVBQTZDO0FBQ3pDO0FBQ0EsMEJBQVMsT0FBTyxTQUFTLENBQVQsQ0FBUCxDQUFUO0FBQ0g7O0FBRUQ7QUFDQSxnQ0FBbUIsTUFBbkIsRUFBMkIsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixpQkFBaUIsQ0FBbkMsQ0FBM0Isb0JBQ29CLFNBQVMsaUJBQWlCLENBQTFCLENBRHBCOztBQUdBLHdCQUFXLE1BQVgsRUFBbUIsU0FBUyxpQkFBaUIsQ0FBMUIsQ0FBbkIsRUFBaUQsSUFBakQsRUFBdUQsWUFBdkQ7O0FBRUEsb0JBQU8sTUFBUDtBQUNIO0FBQ0o7O0FBR0QsU0FBTSxVQUFVLE1BQU0sR0FBTixDQUFoQjs7QUFFQTtBQUNBLFNBQUcsQ0FBQyxPQUFKLEVBQWE7QUFDVCxnQkFBTyxNQUFQO0FBQ0g7O0FBL0YrRCxTQWlHeEQsUUFqR3dELEdBaUczQyxPQWpHMkMsQ0FpR3hELFFBakd3RDs7QUFtR2hFOztBQUNBLFNBQUcsQ0FBQyxRQUFKLEVBQWM7QUFDVixnQkFBTyxNQUFQO0FBQ0g7O0FBRUQ7QUFDQSxTQUFHLENBQUMsSUFBSixFQUFVO0FBQUEsNkJBQ08sUUFEUCxlQUNpQixPQURqQix5QkFDaUIsT0FEakIsZ0RBQzRCO0FBQzlCLDJCQUFjLEVBQUUsY0FBRixFQUFVLFFBQVYsRUFBZSwwQkFBZixFQUFkLEVBQTZDLE9BQTdDO0FBQ0g7O0FBRUQsaUJBQVEsUUFBUixHQUFtQixJQUFuQjs7QUFFQTtBQUNBLGFBQUksT0FBTyxJQUFYLEVBQWlCO0FBQ2Isb0JBQU8sT0FBTyxLQUFQLENBQWEsR0FBYixDQUFQO0FBQ0Esb0JBQU8sT0FBTyxNQUFQLENBQWMsR0FBZCxDQUFQO0FBQ0g7O0FBRUQsZ0JBQU8sTUFBUDtBQUNIOztBQUVELFNBQU0sU0FBUyxTQUFTLE1BQVQsRUFBaUIsSUFBakIsQ0FBZjtBQUNBLFNBQU0saUJBQWlCLEVBQXZCO0FBQ0EsU0FBTSxjQUFjLEVBQXBCOztBQUVBOztBQVlBO0FBeklnRSx5QkE4SG5ELE1BOUhtRCxlQThIM0MsU0E5SDJDLHlCQThIM0MsU0E5SDJDLGdEQThIOUI7QUFBQSw2QkFDakIsUUFEaUIsZUFDUCxPQURPLHlCQUNQLE9BRE8sZ0RBQ0k7QUFDOUIsaUJBQUcsUUFBUSxJQUFSLEtBQWlCLFNBQXBCLEVBQStCO0FBQzNCLCtCQUFjLEVBQUUsY0FBRixFQUFVLFFBQVYsRUFBZSwwQkFBZixFQUFkLEVBQTZDLE9BQTdDO0FBQ0gsY0FGRCxNQUVPO0FBQ0gsZ0NBQWUsSUFBZixDQUFvQixPQUFwQjtBQUNBLDZCQUFZLElBQVosQ0FBaUIsU0FBakI7QUFDSDtBQUNKO0FBQ0o7O0FBR0QsU0FBSSxPQUFPLElBQVgsRUFBaUI7QUFDYixhQUFHLFlBQVksTUFBZixFQUF1QjtBQUNuQixvQkFBTyxLQUFQLENBQWEsR0FBYixJQUFvQixZQUFZLENBQVosQ0FBcEI7QUFDQSxvQkFBTyxNQUFQLENBQWMsR0FBZCxJQUFxQixJQUFJLENBQUosQ0FBTSxXQUFOLENBQXJCO0FBQ0gsVUFIRCxNQUdPO0FBQ0gsb0JBQU8sT0FBTyxLQUFQLENBQWEsR0FBYixDQUFQO0FBQ0Esb0JBQU8sT0FBTyxNQUFQLENBQWMsR0FBZCxDQUFQO0FBQ0g7QUFDSjs7QUFFRDtBQUNBLFNBQUcsZUFBZSxNQUFsQixFQUEwQjtBQUN0QixpQkFBUSxRQUFSLEdBQW1CLGNBQW5CO0FBQ0gsTUFGRCxNQUVPO0FBQ0gsaUJBQVEsUUFBUixHQUFtQixJQUFuQjtBQUNIOztBQUdELFlBQU8sTUFBUDtBQUNILEU7Ozs7Ozs7O2dDQ3JLZ0IsRTs7MENBQ1UsRTs7a0JBRUgsa0I7QUFBVCxVQUFTLGtCQUFULENBQTRCLE1BQTVCLEVBQW9DLFNBQXBDLEVBQStDLElBQS9DLEVBQXFELFFBQXJELEVBQStELE9BQS9ELEVBQW1GO0FBQUEsU0FBWCxJQUFXLHlEQUFKLEVBQUk7O0FBQzlGLFNBQU0sTUFBTSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQVo7O0FBRUE7QUFDQSxTQUFJLENBQUMsR0FBTCxFQUFVO0FBQ1o7QUFDRzs7QUFONkYsU0FROUUsU0FSOEUsR0FRaEUsR0FSZ0UsQ0FRdEYsTUFSc0Y7OztBQVU5RixTQUFJLE9BQU8sT0FBTyxTQUFQLEtBQXFCLFFBQXJCLElBQWlDLGNBQWMsRUFBL0MsR0FBb0QsVUFBVSxLQUFWLENBQWdCLEdBQWhCLENBQXBELEdBQTJFLFNBQXRGOztBQUVBLFNBQUksQ0FBQyxJQUFELElBQVMsQ0FBQyxLQUFLLE1BQW5CLEVBQTJCO0FBQ3ZCO0FBQ0Esd0JBQWUsTUFBZixFQUF1QixJQUF2QixFQUE2QixRQUE3QixFQUF1QyxPQUF2QyxFQUFnRCxJQUFoRDtBQUNILE1BSEQsTUFHTztBQUFBO0FBQ0g7QUFDQSxpQkFBTSxNQUFNLEtBQUssQ0FBTCxDQUFaO0FBQ0EsaUJBQU0sZ0RBQThDLEdBQXBEO0FBQ0EsaUJBQU0sU0FBUyxVQUFVLHNCQUFWLENBQWY7QUFDQSxpQkFBSSxnQkFBSjs7QUFFQSxpQkFBSSxLQUFLLE1BQUwsR0FBYyxDQUFsQixFQUFxQjtBQUFBLCtCQUNDLElBREQ7QUFBQTtBQUFBLDBCQUNPLENBRFA7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUNqQjtBQUNBLDJCQUFVLEtBQUssSUFBTCxDQUFVLEdBQVYsQ0FBVjtBQUNILGNBSEQsTUFHTztBQUNILHdCQUFPLEVBQVA7QUFDQSwyQkFBVSxLQUFLLENBQUwsS0FBVyxFQUFyQjtBQUNIOztBQUVELGlCQUFJLE1BQUosRUFBWTtBQUFBO0FBQ1IseUJBQU0sU0FBUyxFQUFmOztBQURRLHdDQUVLLE1BRkwsY0FFYSxLQUZiLHdCQUVhLEtBRmIsNENBRXNCO0FBQzFCLDZCQUFJLE1BQU0sSUFBTixDQUFXLE9BQVgsS0FBdUIsT0FBM0IsRUFBb0M7QUFDaEMsb0NBQU8sSUFBUCxDQUFZLEtBQVo7QUFDSDtBQUNKOztBQUVELHlCQUFJLE9BQU8sTUFBWCxFQUFtQjtBQUNmLG1DQUFVLHNCQUFWLElBQW9DLE1BQXBDO0FBQ0gsc0JBRkQsTUFFTztBQUNILGdDQUFPLFVBQVUsc0JBQVYsQ0FBUDtBQUNIO0FBWk87QUFhWDs7QUFFRCxpQkFBSSxPQUFPLE9BQU8sR0FBUCxDQUFQLEtBQXVCLFFBQTNCLEVBQXFDO0FBQ2pDLG9DQUFtQixPQUFPLEdBQVAsQ0FBbkIsRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsRUFBNEMsUUFBNUMsRUFBc0QsT0FBdEQsRUFBK0QsSUFBL0Q7QUFDSDtBQWhDRTtBQWlDTjtBQUNKLEU7Ozs7Ozs7O2dDQ25EZ0IsRTs7c0NBQ00sRTs7QUFFdkI7QUFKQTtrQkFLd0IsYztBQUFULFVBQVMsY0FBVCxDQUF3QixNQUF4QixFQUFnQyxJQUFoQyxFQUFzQyxRQUF0QyxFQUFnRCxPQUFoRCxFQUF5RDtBQUNwRSxTQUFNLE1BQU0sS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFaOztBQUVBO0FBQ0EsU0FBSSxDQUFDLEdBQUwsRUFBVTs7QUFKMEQsU0FNcEQsU0FOb0QsR0FNdEMsR0FOc0MsQ0FNNUQsTUFONEQ7O0FBT3BFLFNBQU0sU0FBUyxVQUFVLElBQVYsQ0FBZjtBQUNBLFNBQU0sU0FBUyxFQUFmO0FBQ0EsU0FBTSxZQUFZLE9BQU8sS0FBSyxDQUFMLE1BQVksR0FBbkIsR0FBeUIsS0FBM0M7O0FBRUE7QUFDQSxTQUFJLE9BQU8sSUFBUCxLQUFnQixXQUFwQixFQUFpQztBQUM3QixhQUFJLENBQUMsU0FBTCxFQUFnQjtBQUFBLGlDQUNBLFNBREEseUNBQ29CLElBRHBCLEVBQ1ksTUFEWix1QkFDb0IsSUFEcEIsY0FDWSxNQURaLFlBQ29CLElBRHBCLG9CQUM2QjtBQUFBLG9DQUN4QixNQUR3QixjQUNoQixHQURnQix1QkFDaEIsR0FEZ0IsMkNBQ1Q7QUFDeEIseUJBQU0sZ0JBQWdCO0FBQ2xCLG1DQURrQjtBQUVsQixtQ0FBVSxJQUFJLFFBRkk7QUFHbEIsa0NBQVMsSUFBSTtBQUhLLHNCQUF0Qjs7QUFNQSxnQ0FBVyxNQUFYLG1CQUFrQyxJQUFsQyxFQUEwQyxhQUExQztBQUNBLGdDQUFXLE1BQVgsRUFBbUIsYUFBbkIsRUFBa0MsYUFBbEM7QUFDSDtBQUNKO0FBQ0o7O0FBRUQ7QUFDQSxhQUFJLE1BQUosR0FBYSxFQUFiO0FBQ0gsTUFsQkQsTUFrQk8sSUFBSSxNQUFKLEVBQVk7QUFBQSw2QkFFRixNQUZFLGVBRU0sR0FGTix5QkFFTSxHQUZOLGdEQUVhO0FBQ3hCO0FBQ0EsaUJBQUksWUFBYSxhQUFhLElBQUksUUFBakIsSUFBNkIsU0FBUyxTQUFULEtBQXVCLElBQUksUUFBckUsSUFDSSxXQUFXLFlBQVksSUFBSSxPQURuQyxFQUM2QztBQUN6QztBQUNBLHdCQUFPLElBQVAsQ0FBWSxHQUFaO0FBQ0gsY0FKRCxNQUlPO0FBQ0gscUJBQU0saUJBQWdCO0FBQ2xCLCtCQURrQjtBQUVsQiwrQkFBVSxJQUFJLFFBRkk7QUFHbEIsOEJBQVMsSUFBSTtBQUhLLGtCQUF0Qjs7QUFNQSxxQkFBSSxDQUFDLFNBQUwsRUFBZ0I7QUFDWixnQ0FBVyxNQUFYLG1CQUFrQyxJQUFsQyxFQUEwQyxjQUExQztBQUNBLGdDQUFXLE1BQVgsRUFBbUIsYUFBbkIsRUFBa0MsY0FBbEM7QUFDSDtBQUNKO0FBQ0o7QUFuQkQ7OztBQXFCQSxhQUFJLE9BQU8sTUFBWCxFQUFtQjtBQUNmLHVCQUFVLElBQVYsSUFBa0IsTUFBbEI7QUFDSCxVQUZELE1BRU87QUFDSCxvQkFBTyxJQUFJLE1BQUosQ0FBVyxJQUFYLENBQVA7QUFDSDtBQUNKOztBQUVEO0FBQ0gsRTs7Ozs7Ozs7MENDakUwQixFOztzQ0FDSixFOztBQUV2QixLQUFNLFdBQVcsS0FBakI7O0FBRUE7QUFDQTtrQkFDd0IsYTtBQUFULFVBQVMsYUFBVCxjQU1aO0FBQUEsU0FOcUMsTUFNckMsUUFOcUMsTUFNckM7QUFBQSxTQU42QyxHQU03QyxRQU42QyxHQU03QztBQUFBLFNBTmtELFlBTWxELFFBTmtELFlBTWxEO0FBQUEsU0FMQyxPQUtELFNBTEMsT0FLRDtBQUFBLFNBSkMsTUFJRCxTQUpDLE1BSUQ7QUFBQSxTQUhDLElBR0QsU0FIQyxJQUdEO0FBQUEsU0FGQyxXQUVELFNBRkMsV0FFRDtBQUFBLFNBREMsYUFDRCxTQURDLGFBQ0Q7QUFBQSxTQUNTLE9BRFQsR0FDeUIsTUFEekIsQ0FDUyxPQURUO0FBQUEsU0FDa0IsRUFEbEIsR0FDeUIsTUFEekIsQ0FDa0IsRUFEbEI7QUFBQSxTQUVTLE1BRlQsR0FFb0IsWUFGcEIsQ0FFUyxNQUZUOztBQUlDO0FBQ0E7QUFDQTs7QUFDQSxTQUFJLE9BQU8sRUFBUCxLQUFjLFVBQWxCLEVBQThCO0FBQzFCLHFCQUFZLFFBQVosR0FBdUIsSUFBdkI7QUFDSCxNQUZELE1BRU8sSUFBSSxPQUFPLEVBQVAsS0FBYyxRQUFsQixFQUEyQjtBQUFBLDRCQUdqQixHQUFHLEtBQUgsQ0FBUyxRQUFULENBSGlCLGNBSTFCLE9BSjBCLHVCQUkxQixPQUowQjtBQUlmLGtCQUFLLG1CQUFMLENBQXlCLE9BQXpCLEVBQWtDLFdBQWxDO0FBSmU7QUFDOUI7QUFDQTs7QUFHSDs7QUFFRDtBQUNBLG9CQUFlLE1BQWYsd0JBQTJDLEdBQTNDLEVBQWtELGFBQWxEOztBQUVBO0FBQ0EsU0FBSSxPQUFKLEVBQWE7QUFDVCxpQkFBUSxJQUFSLENBQWEsSUFBYixFQUFtQixPQUFuQjtBQUNIOztBQUVEO0FBQ0EsU0FBSSxDQUFDLE1BQUwsRUFBYTtBQUFBLHVCQUNnQztBQUNyQyxxQkFEcUM7QUFFckM7QUFGcUMsVUFEaEM7O0FBQUEsNkJBSU4sWUFKTTtBQUFBO0FBQUE7QUFBQTs7QUFDVCxhQUFNLDhCQUFOOztBQUtBLG9CQUFXLE1BQVgsY0FBNkIsR0FBN0IsRUFBb0Msb0JBQXBDO0FBQ0Esb0JBQVcsTUFBWCxFQUFtQixRQUFuQixFQUE2QixvQkFBN0I7QUFDSDtBQUNKLEU7Ozs7Ozs7O3lDQy9DeUIsRTs7MENBQ0MsRTs7NENBQ0UsRTs7c0NBQ04sRTs7dUNBQ0MsRTs7b0NBQ0gsRTs7K0JBQ0wsRTs7QUFFaEIsS0FBTSxXQUFXLEtBQWpCOztBQUVBO0FBQ0E7a0JBQ3dCLGM7QUFBVCxVQUFTLGNBQVQsQ0FBd0IsTUFBeEIsUUFPWjtBQUFBLFNBTlMsV0FNVCxRQU5DLE1BTUQ7QUFBQSxTQUxDLEdBS0QsUUFMQyxHQUtEO0FBQUEsU0FKQyxNQUlELFFBSkMsTUFJRDtBQUFBLFNBSEMsSUFHRCxRQUhDLElBR0Q7QUFBQSxTQUZDLFlBRUQsUUFGQyxZQUVEO0FBQUEsU0FEQyxPQUNELFFBREMsT0FDRDtBQUFBLFNBRUssTUFGTCxHQUtLLFlBTEwsQ0FFSyxNQUZMO0FBQUEsU0FHSyxrQkFITCxHQUtLLFlBTEwsQ0FHSyxrQkFITDtBQUFBLFNBSWUsY0FKZixHQUtLLFlBTEwsQ0FJSyxRQUpMO0FBTUM7O0FBQ0EsU0FBTSxXQUFXLFFBQVEsUUFBUixHQUFtQixRQUFRLFFBQVIsSUFBb0IsRUFBeEQsQ0FQRCxDQU82RDtBQVA3RCxTQVFPLEtBUlAsR0FRaUIsT0FSakIsQ0FRTyxLQVJQOztBQVNDLFNBQU0saUJBQWlCO0FBQ25CLGVBQU0sTUFEYTtBQUVuQixpQkFGbUI7QUFHbkIscUJBSG1CO0FBSW5CLHVCQUptQjtBQUtuQjtBQUxtQixNQUF2QjtBQU9BLFNBQUksY0FBYyxPQUFPLEtBQVAsS0FBaUIsV0FBbkM7QUFDQSxTQUFJLGVBQUo7QUFDQSxTQUFJLHNCQUFKO0FBQ0EsU0FBSSxvQkFBSjs7QUFFQTtBQUNBLFNBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3RCLGFBQU0sY0FBYyxjQUFjLElBQWQsQ0FBcEI7O0FBRUEsYUFBSSxXQUFKLEVBQWlCO0FBQ2IsaUJBQUksV0FBSixFQUFpQjtBQUFBLCtCQUNELFdBREM7O0FBQUEscUNBQ1ksV0FEWjtBQUFBO0FBQUE7QUFBQTtBQUVoQjs7QUFFRCxzQkFBUyxXQUFUO0FBQ0gsVUFORCxNQU1PO0FBQ0gsc0JBQVMsV0FBVDtBQUNIO0FBQ0o7O0FBbENGLG1CQW9DZ0QsTUFwQ2hEO0FBQUEsU0FvQ1MsUUFwQ1QsV0FvQ1MsUUFwQ1Q7QUFBQSxTQW9DbUIsUUFwQ25CLFdBb0NtQixRQXBDbkI7QUFBQSxTQW9DNkIsRUFwQzdCLFdBb0M2QixFQXBDN0I7QUFBQSxTQW9DaUMsVUFwQ2pDLFdBb0NpQyxVQXBDakM7O0FBc0NDOztBQUNBLFNBQUksVUFBSixFQUFnQjtBQUNaLG9CQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFBc0IsY0FBdEI7QUFDSDs7QUFFRDtBQUNBO0FBQ0EsU0FBSSxhQUFhLGVBQWUsdUJBQXVCLEtBQXRDLElBQStDLHVCQUF1QixJQUFuRixDQUFKLEVBQThGO0FBQzFGLGlCQUFRLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0IsY0FBcEIsQ0FBUjtBQUNBLHVCQUFjLE9BQU8sS0FBUCxLQUFpQixXQUEvQjs7QUFGMEYsd0JBSXRELEVBQUUsVUFBVSxJQUFaLEVBSnNEOztBQUFBLDZCQUlsQyxZQUprQztBQUFBO0FBQUE7QUFBQTs7QUFJMUYsYUFBSSxNQUFKLEVBQVksR0FBWixFQUFpQixLQUFqQjtBQUNIOztBQUVEO0FBQ0EsU0FBSSxRQUFKLEVBQWM7QUFDVix5QkFBZ0I7QUFBQSxvQkFBTSxpQkFBaUI7QUFDbkMsMkJBRG1DO0FBRW5DLGlDQUZtQztBQUduQywrQkFIbUM7QUFJbkMsK0NBSm1DO0FBS25DO0FBTG1DLGNBQWpCLENBQU47QUFBQSxVQUFoQjs7QUFRQTtBQUNBO0FBQ0EsYUFBSSxtQkFBbUIsS0FBdkIsRUFBOEI7QUFDMUIsaUJBQU0sUUFBUSxPQUFPLGNBQVAsS0FBMEIsUUFBMUIsR0FBcUMsY0FBckMsR0FBc0QsQ0FBcEU7QUFDQSw2QkFBZ0IsU0FBUyxhQUFULEVBQXdCLEtBQXhCLENBQWhCO0FBQ0g7O0FBRUQscUJBQVksTUFBWix3QkFBd0MsR0FBeEMsRUFBK0MsYUFBL0M7O0FBRUEsYUFBSSxDQUFDLFdBQUwsRUFBa0I7QUFDZDtBQUNIO0FBQ0o7O0FBRUQ7QUFDQSxTQUFJLFlBQVksRUFBaEIsRUFBb0I7QUFDaEIsdUJBQWMsVUFBQyxRQUFELEVBQWM7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsaUJBQUcsQ0FBQyxZQUFZLFFBQWhCLEVBQTBCO0FBQ3RCLGdDQUFlO0FBQ1gsdUNBRFc7QUFFWCxtQ0FGVztBQUdYLDZCQUhXO0FBSVgsK0JBSlc7QUFLWCxxQ0FMVztBQU1YLG1DQU5XO0FBT1g7QUFQVyxrQkFBZjtBQVNIO0FBQ0osVUFmRDs7QUFpQkE7QUFDQSxhQUFJLE9BQU8sRUFBUCxLQUFjLFVBQWxCLEVBQThCO0FBQzFCLGdCQUFHLElBQUgsQ0FBUSxJQUFSLEVBQWMsV0FBZCxFQUEyQixjQUEzQjtBQUNILFVBRkQsTUFFTyxJQUFJLE9BQU8sRUFBUCxLQUFjLFFBQWxCLEVBQTJCO0FBQUEsZ0NBRWpCLEdBQUcsS0FBSCxDQUFTLFFBQVQsQ0FGaUIsY0FHMUIsT0FIMEIsd0JBRzFCLE9BSDBCO0FBR2Ysc0JBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsV0FBL0I7QUFIZTtBQUM5Qjs7QUFHSDtBQUNKOztBQUVEO0FBQ0EsY0FBUyxJQUFULENBQWM7QUFDVixlQURVO0FBRVYsbUJBRlU7QUFHVix1QkFIVTtBQUlWLHFDQUpVO0FBS1YsaUNBTFU7QUFNVjtBQU5VLE1BQWQ7O0FBU0E7QUFDQSxTQUFJLENBQUMsTUFBTCxFQUFhO0FBQUEsd0JBQ2dDO0FBQ3JDLHFCQURxQztBQUVyQztBQUZxQyxVQURoQzs7QUFBQSw2QkFJTixZQUpNO0FBQUE7QUFBQTtBQUFBOztBQUNULGFBQU0sK0JBQU47O0FBS0Esb0JBQVcsTUFBWCxZQUEyQixHQUEzQixFQUFrQyxvQkFBbEM7QUFDQSxvQkFBVyxNQUFYLEVBQW1CLE1BQW5CLEVBQTJCLG9CQUEzQjtBQUNIO0FBQ0osRTs7Ozs7Ozs7MENDaEowQixFOztrQkFFWixVQUFTLElBQVQsRUFBZTtBQUMxQixTQUFJLGVBQUo7O0FBRUEsVUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGVBQWUsTUFBbkMsRUFBMkMsR0FBM0MsRUFBZ0Q7QUFDNUMsYUFBSSxTQUFTLGVBQWUsQ0FBZixFQUFrQixJQUFsQixDQUF1QixJQUF2QixFQUE2QixJQUE3QixDQUFiLEVBQWlEO0FBQzdDLG9CQUFPLE1BQVA7QUFDSDtBQUNKO0FBQ0osRTs7Ozs7Ozs7aUNDVmlCLEU7O29DQUNHLEU7O2tDQUNGLEU7O29DQUNFLEU7O2tDQUNGLEU7O2tCQUVKLENBQUMsZ0JBQVE7QUFDcEIsYUFBTyxLQUFLLE9BQVo7QUFDSSxjQUFLLE9BQUw7QUFDSSxvQkFBTyxNQUFNLEtBQUssSUFBWCxDQUFQO0FBQ0osY0FBSyxVQUFMO0FBQ0ksb0JBQU8sVUFBUDtBQUNKLGNBQUssUUFBTDtBQUNJLG9CQUFPLE9BQU8sS0FBSyxRQUFaLENBQVA7QUFDSixjQUFLLFVBQUw7QUFDSSxvQkFBTyxVQUFQO0FBQ0osY0FBSyxRQUFMO0FBQ0ksb0JBQU8sUUFBUDtBQUNKO0FBQ0ksb0JBQU8sSUFBUDtBQVpSO0FBY0gsRUFmYyxDOzs7Ozs7Ozs4QkNOQSxFOzsrQkFDQyxFOztBQUVoQjtrQkFDd0IsYztBQUFULFVBQVMsY0FBVCxPQVFaO0FBQUEsOEJBUEMsUUFPRDtBQUFBLFNBUEMsUUFPRCxpQ0FQWSxFQU9aO0FBQUEsU0FOQyxNQU1ELFFBTkMsTUFNRDtBQUFBLFNBTEMsR0FLRCxRQUxDLEdBS0Q7QUFBQSxTQUpDLElBSUQsUUFKQyxJQUlEO0FBQUEsU0FIQyxPQUdELFFBSEMsT0FHRDtBQUFBLFNBRkMsTUFFRCxRQUZDLE1BRUQ7QUFBQSxTQURDLGNBQ0QsUUFEQyxjQUNEOztBQUNDLFNBQU0sZ0JBQWdCLFFBQVEsS0FBOUI7QUFERCxTQUVTLEtBRlQsR0FFMkIsUUFGM0IsQ0FFUyxLQUZUO0FBQUEsU0FFZ0IsTUFGaEIsR0FFMkIsUUFGM0IsQ0FFZ0IsTUFGaEI7QUFBQSxTQUdTLFFBSFQsR0FHc0IsTUFIdEIsQ0FHUyxRQUhUO0FBQUEsbUJBSStDO0FBQzFDLHFDQUQwQztBQUUxQywyQkFGMEM7QUFHMUMsd0JBQWUsU0FBUyxhQUFULElBQTBCLFFBSEMsRUFHUztBQUNuRDtBQUNBLHlCQUFnQjtBQUFBLG9CQUFNLFNBQVMsY0FBVCxFQUFOO0FBQUEsVUFMMEI7QUFNMUM7QUFDQSwwQkFBaUI7QUFBQSxvQkFBTSxTQUFTLGVBQVQsRUFBTjtBQUFBLFVBUHlCO0FBUTFDLHFCQVIwQztBQVMxQztBQVQwQyxNQUovQzs7QUFBQSx5QkFjSSxjQWRKO0FBQUE7QUFBQTtBQUFBOztBQUlDLFNBQU0sUUFBUSxTQUFTLElBQVQsQ0FBYyxJQUFkLFVBQWQ7O0FBWUEsU0FBSSxDQUFDLEdBQUcsS0FBSCxFQUFVLGFBQVYsQ0FBTCxFQUErQjtBQUMzQjtBQUNBO0FBQ0EsYUFBSSxNQUFKLEVBQVksR0FBWixFQUFpQixLQUFqQixFQUF3QjtBQUNwQix1QkFBVSxJQURVO0FBRXBCLDBCQUFhLElBRk87QUFHcEIsNEJBQWUsS0FISztBQUlwQjtBQUpvQixVQUF4QjtBQU1IO0FBQ0osRTs7Ozs7Ozs7QUN0Q0Q7a0JBQ3dCLGdCO0FBQVQsVUFBUyxnQkFBVCxPQU1aO0FBQUEsU0FMQyxJQUtELFFBTEMsSUFLRDtBQUFBLFNBSkMsT0FJRCxRQUpDLE9BSUQ7QUFBQSxTQUhDLE1BR0QsUUFIQyxNQUdEO0FBQUEsU0FGQyxjQUVELFFBRkMsY0FFRDtBQUFBLFNBREMsWUFDRCxRQURDLFlBQ0Q7QUFBQSxTQUNTLEtBRFQsR0FDbUIsT0FEbkIsQ0FDUyxLQURUO0FBQUEsU0FFUyxhQUZULEdBRTJELFlBRjNELENBRVMsYUFGVDtBQUFBLFNBRXdCLFdBRnhCLEdBRTJELFlBRjNELENBRXdCLFdBRnhCO0FBQUEsU0FFNkMsU0FGN0MsR0FFMkQsWUFGM0QsQ0FFcUMsTUFGckM7QUFBQSxTQUdTLFFBSFQsR0FHc0IsTUFIdEIsQ0FHUyxRQUhUO0FBSUM7O0FBQ0EsU0FBTSxpQkFBaUIsa0JBQWtCLFFBQWxCLElBQThCLE9BQU8sS0FBUCxLQUFpQixRQUEvQyxHQUNqQixPQUFPLEtBQVAsQ0FEaUIsR0FDRCxLQUR0Qjs7QUFHQSxTQUFJLGdCQUFnQixJQUFoQixJQUF3QixrQkFBa0IsY0FBMUMsSUFBNEQsY0FBYyxNQUE5RSxFQUFzRjtBQUNsRjtBQUNIOztBQVZGLG1CQVl3QyxFQUFFLFlBQUYsRUFaeEM7O0FBQUEseUJBWW1ELGNBWm5EO0FBQUE7QUFBQTtBQUFBOztBQVlDLGNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0IsS0FBcEI7QUFDSCxFOzs7Ozs7OztrQ0NuQmtCLEU7O3NDQUNJLEU7O3NDQUNBLEU7O0FBRXZCO0FBQ0EsS0FBTSxrQkFDQSw4RkFETjs7QUFHQTtBQUNBO0FBVkE7a0JBV3dCLFc7QUFBVCxVQUFTLFdBQVQsQ0FBcUIsTUFBckIsRUFBNkIsSUFBN0IsRUFBbUMsUUFBbkMsRUFBNkMsT0FBN0MsRUFBaUU7QUFBQSxTQUFYLElBQVcseURBQUosRUFBSTs7QUFBQSxtQkFDOUMsT0FBTyxNQUFQLENBRDhDOztBQUFBLFNBQzVELFNBRDRELFdBQ3BFLE1BRG9FOztBQUU1RSxTQUFNLE1BQU0sV0FBVyxNQUF2QjtBQUNBLFNBQU0sU0FBUyxVQUFVLElBQVYsQ0FBZjtBQUNBLFNBQU0sTUFBTSxFQUFFLGtCQUFGLEVBQVksZ0JBQVosRUFBcUIsUUFBckIsRUFBMEIsVUFBMUIsRUFBZ0MsVUFBaEMsRUFBWjs7QUFHQTtBQUNBLFNBQUksTUFBSixFQUFZO0FBQ1I7QUFDQSxjQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksT0FBTyxNQUEzQixFQUFtQyxHQUFuQyxFQUF3QztBQUNwQyxpQkFBTSxPQUFNLE9BQU8sQ0FBUCxDQUFaO0FBQ0EsaUJBQUksQ0FBQyxLQUFJLFFBQUosS0FBaUIsUUFBakIsSUFBNkIsS0FBSSxRQUFKLEtBQWlCLFNBQVMsU0FBeEQsS0FDTyxLQUFJLE9BQUosS0FBZ0IsT0FEM0IsRUFDb0M7QUFDaEMsd0JBQU8sS0FBUDtBQUNIO0FBQ0o7O0FBRUQ7QUFDQSxnQkFBTyxJQUFQLENBQVksR0FBWjtBQUNILE1BWkQsTUFZTztBQUNIO0FBQ0EsbUJBQVUsSUFBVixJQUFrQixDQUFDLEdBQUQsQ0FBbEI7QUFDSDs7QUFFRCxTQUFJLGdCQUFnQixJQUFoQixDQUFxQixJQUFyQixDQUFKLEVBQWdDO0FBQzVCO0FBQ0Esb0JBQVcsTUFBWCxFQUFtQixLQUFLLE9BQUwsQ0FBYSxlQUFiLEVBQThCLEVBQTlCLENBQW5CO0FBQ0g7O0FBRUQsU0FBSSxLQUFLLENBQUwsTUFBWSxHQUFoQixFQUFxQjtBQUNqQixvQkFBVyxNQUFYLGdCQUErQixJQUEvQixFQUF1QyxHQUF2QztBQUNBLG9CQUFXLE1BQVgsRUFBbUIsVUFBbkIsRUFBK0IsR0FBL0I7QUFDSDs7QUFFRDtBQUNBLFlBQU8sSUFBUDtBQUNILEU7Ozs7Ozs7O2tCQ2hEdUIsUTtBQUFULFVBQVMsUUFBVCxDQUFrQixJQUFsQixFQUF3QixVQUF4QixFQUFvQyxPQUFwQyxFQUE2QztBQUN4RCxTQUFJLGdCQUFKO0FBQ0EsU0FBSSxjQUFKO0FBQ0EsU0FBSSxPQUFPLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDM0IsbUJBQVUsVUFBVixDQUQyQixDQUNMO0FBQ3RCLGlCQUFRLENBQVI7QUFDSDs7QUFFRCxhQUFRLGNBQWMsQ0FBdEI7O0FBRUEsWUFBTyxTQUFTLFNBQVQsR0FBcUI7QUFDeEIsYUFBTSxPQUFPLFNBQWI7QUFEd0IsYUFFakIsRUFGaUIsR0FFUCxJQUZPO0FBQUEsYUFFYixFQUZhLEdBRVAsSUFGTzs7QUFHeEIsYUFBTSxhQUFhLEtBQUssTUFBeEI7QUFDQSxhQUFNLGNBQWMsV0FBVyxJQUEvQjs7QUFFQSxzQkFBYSxPQUFiOztBQUVBLG1CQUFVLFdBQVcsWUFBTTtBQUN2QixxQkFBTyxVQUFQO0FBQ0ksc0JBQUssQ0FBTDtBQUNJLDBCQUFLLElBQUwsQ0FBVSxXQUFWO0FBQ0E7QUFDSixzQkFBSyxDQUFMO0FBQ0ksMEJBQUssSUFBTCxDQUFVLFdBQVYsRUFBdUIsRUFBdkI7QUFDQTtBQUNKLHNCQUFLLENBQUw7QUFDSSwwQkFBSyxJQUFMLENBQVUsV0FBVixFQUF1QixFQUF2QixFQUEyQixFQUEzQjtBQUNBO0FBQ0o7QUFDSSwwQkFBSyxLQUFMLENBQVcsV0FBWCxFQUF3QixJQUF4QjtBQVhSO0FBYUgsVUFkUyxFQWNQLEtBZE8sQ0FBVjtBQWVILE1BdkJEO0FBd0JILEU7Ozs7Ozs7O3VDQ2pDdUIsRTs7OENBQ08sRTs7c0NBQ1IsRTs7Z0NBQ04sRTs7OEJBQ0YsRTs7QUFFZixLQUFNLG1CQUFtQixnQkFBekIsQyxDQVBBOzs7QUFTQSxVQUFTLGFBQVQsT0FRK0M7QUFBQSxTQVAzQyxhQU8yQyxRQVAzQyxhQU8yQztBQUFBLFNBTjNDLEtBTTJDLFFBTjNDLEtBTTJDOztBQUFBLHVFQUEzQyxXQUFXLFdBQVgsQ0FBdUIsSUFBdkIsQ0FBNEIsYUFBZTs7QUFBQSxTQUozQyxJQUkyQyxTQUozQyxJQUkyQztBQUFBLFNBSDNDLElBRzJDLFNBSDNDLElBRzJDO0FBQUEsU0FGM0MsUUFFMkMsU0FGM0MsUUFFMkM7QUFBQSxTQUQzQyxPQUMyQyxTQUQzQyxPQUMyQzs7QUFDM0MsU0FBSSxTQUFTLE9BQU8sS0FBUCxLQUFpQixRQUE5QixFQUF3QztBQUNwQywwQkFBaUIsS0FBakIsRUFBd0IsSUFBeEIsRUFBOEIsSUFBOUIsRUFBb0MsUUFBcEMsRUFBOEMsT0FBOUM7QUFDSDs7QUFFRCxTQUFJLGlCQUFpQixPQUFPLGFBQVAsS0FBeUIsUUFBOUMsRUFBd0Q7QUFDcEQsNEJBQW1CLGFBQW5CLEVBQWtDLElBQWxDLEVBQXdDLElBQXhDLEVBQThDLFFBQTlDLEVBQXdELE9BQXhEO0FBQ0g7O0FBRUQ7QUFDQSxTQUFJLGlCQUFpQixJQUFqQixDQUFzQixJQUF0QixDQUFKLEVBQWlDO0FBQzdCLGFBQU0sWUFBWSxLQUFLLE9BQUwsQ0FBYSxnQkFBYixFQUErQixFQUEvQixDQUFsQjs7QUFFQSxhQUFJLGlCQUFpQixDQUFDLEdBQUcsY0FBYyxTQUFkLENBQUgsRUFBNkIsTUFBTSxTQUFOLENBQTdCLENBQXRCLEVBQXNFO0FBQUEsNkJBQy9DLEtBQUssR0FBTCxDQUFTLEtBQVQsQ0FEK0M7O0FBQUEsaUJBQzFELE1BRDBELGFBQzFELE1BRDBEOztBQUVsRSxpQkFBTSxzQ0FBb0MsU0FBMUM7QUFDQSxpQkFBTSxlQUFlLE9BQU8saUJBQVAsQ0FBckI7QUFDQSxpQkFBSSxZQUFKLEVBQWtCO0FBQ2QsNEJBQVcsS0FBWCxFQUFrQixpQkFBbEIsRUFBcUM7QUFDakMsb0NBQWUsY0FBYyxTQUFkLENBRGtCO0FBRWpDLDRCQUFPLE1BQU0sU0FBTjtBQUYwQixrQkFBckM7QUFJSDtBQUNKO0FBQ0o7QUFDSjs7a0JBRXVCLGdCO0FBQVQsVUFBUyxnQkFBVCxDQUEwQixNQUExQixFQUFrQyxTQUFsQyxFQUE2QyxJQUE3QyxFQUFtRCxRQUFuRCxFQUE2RCxPQUE3RCxFQUFzRTtBQUNqRjtBQUNBLFNBQUksT0FBTyxPQUFPLFNBQVAsS0FBcUIsUUFBckIsSUFBaUMsY0FBYyxFQUEvQyxHQUFvRCxVQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBcEQsR0FBMkUsU0FBdEY7O0FBRUEsU0FBSSxDQUFDLElBQUQsSUFBUyxDQUFDLEtBQUssTUFBbkIsRUFBMkI7QUFDdkI7QUFDQSxxQkFBWSxNQUFaLEVBQW9CLElBQXBCLEVBQTBCLFFBQTFCLEVBQW9DLE9BQXBDO0FBQ0gsTUFIRCxNQUdPO0FBQ0g7QUFDQSxhQUFNLE1BQU0sS0FBSyxDQUFMLENBQVo7QUFDQSxhQUFJLGdCQUFKOztBQUVBLGFBQUksS0FBSyxNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFBQSwyQkFDQyxJQUREO0FBQUE7QUFBQSxzQkFDTyxDQURQO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFDakI7QUFDQSx1QkFBVSxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQVY7QUFDSCxVQUhELE1BR087QUFDSCxvQkFBTyxFQUFQO0FBQ0EsdUJBQVUsS0FBSyxDQUFMLEtBQVcsRUFBckI7QUFDSDs7QUFFRCxhQUFNLGdCQUFnQjtBQUNsQix1QkFEa0I7QUFFbEIsdUJBRmtCO0FBR2xCLCtCQUhrQjtBQUlsQjtBQUprQixVQUF0Qjs7QUFPQTtBQUNBLHFCQUFZLE1BQVoseUJBQXlDLEdBQXpDLEVBQWdELGFBQWhELEVBQStELElBQS9ELEVBQXFFO0FBQ2pFLHlDQURpRTtBQUVqRTtBQUZpRSxVQUFyRTs7QUFLQTtBQUNBLHVCQUFjO0FBQ1Ysb0JBQU8sT0FBTyxHQUFQO0FBREcsVUFBZCxFQUVHLGFBRkg7QUFHSDtBQUNKLEU7Ozs7Ozs7O0FDakZELFdBQVUsaUJBQVYsRUFBNkIsWUFBTTtBQUNsQyxRQUFHLGtCQUFILEVBQXVCLFlBQU07QUFDdEIsYUFBSSxPQUFPLEVBQUUsb0JBQUYsQ0FBWDtBQUFBLGFBQ0ksU0FBUyxFQURiOztBQUdBLGVBQU0sYUFBTixDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLGdCQUFPLENBQVAsR0FBVyxJQUFYO0FBQ0EsZ0JBQU8sS0FBSyxVQUFMLENBQWdCLFNBQXZCLEVBQWtDLE9BQWxDLENBQTBDLE9BQU8sQ0FBakQ7QUFDTixNQVBEOztBQVNBLFFBQUcsa0RBQUgsRUFBdUQsWUFBTTtBQUN0RCxhQUFJLE9BQU8sRUFBRSxvQkFBRixDQUFYO0FBQUEsYUFDSSxLQUFLLElBQUksRUFBSixFQURUOztBQUdBLFlBQUcsYUFBSCxDQUFpQixJQUFqQjtBQUNBLFlBQUcsQ0FBSCxHQUFPLElBQVA7QUFDQSxnQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsU0FBdkIsRUFBa0MsT0FBbEMsQ0FBMEMsR0FBRyxDQUE3QztBQUNOLE1BUEQ7O0FBVUcsUUFBRyxvQkFBSCxFQUF5QixZQUFNO0FBQzNCLGFBQUksT0FBTyxFQUFFLHVCQUFGLENBQVg7QUFBQSxhQUNJLFNBQVMsRUFEYjtBQUVBLGVBQU0sYUFBTixDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLGdCQUFPLENBQVAsR0FBVyxLQUFYO0FBQ0EsZ0JBQU8sS0FBSyxLQUFaLEVBQW1CLE9BQW5CLENBQTJCLE9BQU8sQ0FBbEM7QUFDTixNQU5FOztBQVNBLFFBQUcscUJBQUgsRUFBMEIsWUFBTTtBQUM1QixhQUFJLE9BQU8sRUFBRSx5Q0FBRixDQUFYO0FBQUEsYUFDSSxTQUFTLEVBRGI7QUFFQSxlQUFNLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUI7QUFDQSxnQkFBTyxDQUFQLEdBQVcsSUFBWDtBQUNBLGdCQUFPLEtBQUssT0FBWixFQUFxQixPQUFyQixDQUE2QixPQUFPLENBQXBDO0FBQ04sTUFORTs7QUFTQSxRQUFHLHVCQUFILEVBQTRCLFlBQU07QUFDOUIsYUFBSSxPQUFPLEVBQUUscUNBQUYsQ0FBWDtBQUFBLGFBQ0ksU0FBUyxFQURiO0FBRUEsZUFBTSxhQUFOLENBQW9CLE1BQXBCLEVBQTRCLElBQTVCO0FBQ0EsZ0JBQU8sQ0FBUCxHQUFXLEtBQVg7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsT0FBTyxDQUFsQztBQUNOLE1BTkU7O0FBU0EsUUFBRywyQkFBSCxFQUFnQyxZQUFNO0FBQUMsZ0JBQU8sUUFBUCxHQUFrQixJQUFsQjtBQUNuQyxhQUFJLE9BQU8sRUFBRSw0QkFBRixDQUFYO0FBQUEsYUFDSSxTQUFTLEVBRGI7QUFFQSxlQUFNLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUI7QUFDQSxnQkFBTyxDQUFQLEdBQVcsS0FBWDtBQUNBLGdCQUFPLENBQVAsR0FBVyxLQUFYO0FBQ0EsZ0JBQU8sS0FBSyxZQUFMLENBQWtCLE1BQWxCLENBQVAsRUFBa0MsT0FBbEMsQ0FBMEMsT0FBTyxDQUFQLEdBQVcsR0FBWCxHQUFpQixPQUFPLENBQWxFLEVBQXFFLE9BQU8sUUFBUCxHQUFrQixLQUFsQjtBQUMzRSxNQVBFOztBQVVBLFFBQUcsNEJBQUgsRUFBaUMsWUFBTTtBQUNuQyxhQUFJLE9BQU8sRUFBRSxpQ0FBRixDQUFYO0FBQUEsYUFDSSxTQUFTLEVBRGI7QUFFQSxlQUFNLGFBQU4sQ0FBb0IsTUFBcEIsRUFBNEIsSUFBNUI7QUFDQSxnQkFBTyxDQUFQLEdBQVcsS0FBWDtBQUNBLGdCQUFPLENBQVAsR0FBVyxLQUFYO0FBQ0EsZ0JBQU8sS0FBSyxLQUFaLEVBQW1CLE9BQW5CLENBQTJCLE9BQU8sQ0FBUCxHQUFXLE9BQVgsR0FBcUIsT0FBTyxDQUF2RDtBQUNOLE1BUEU7O0FBVUEsUUFBRyx1Q0FBSCxFQUE0QyxZQUFNO0FBQzlDLGFBQUksT0FBTyxFQUFFLGlDQUFGLENBQVg7QUFBQSxhQUNJLFNBQVMsRUFEYjtBQUVBLGVBQU0sYUFBTixDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLGdCQUFPLENBQVAsR0FBVyxLQUFYO0FBQ0EsZ0JBQU8sQ0FBUCxHQUFXLEtBQVg7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsT0FBTyxDQUFQLEdBQVcsT0FBWCxHQUFxQixPQUFPLENBQXZEO0FBQ0EsZ0JBQU8sT0FBTyxJQUFQLENBQVksTUFBWixDQUFQLEVBQTRCLE9BQTVCLENBQW9DLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBcEM7QUFDTixNQVJFOztBQVdBLFFBQUcsMEJBQUgsRUFBK0IsWUFBTTtBQUNqQyxhQUFJLE9BQU8sb1FBQVg7QUFBQSxhQVVBLFNBQVMsRUFWVDtBQVdBLGVBQU0sYUFBTixDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLGdCQUFPLENBQVAsR0FBVyxLQUFYO0FBQ0EsZ0JBQU8sQ0FBUCxHQUFXLEtBQVg7QUFDQSxnQkFBTyxDQUFQLEdBQVcsS0FBWDtBQUNBLGdCQUFPLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsV0FBVyxPQUFPLENBQWxCLEdBQXNCLFNBQTdDLENBQVAsRUFBZ0UsT0FBaEUsQ0FBd0UsQ0FBeEU7QUFDQSxnQkFBTyxFQUFFLE9BQUYsRUFBVyxJQUFYLEVBQWlCLEtBQXhCLEVBQStCLE9BQS9CLENBQXVDLE9BQU8sQ0FBOUM7QUFDQSxnQkFBTyxFQUFFLFFBQUYsRUFBWSxJQUFaLEVBQWtCLFlBQWxCLENBQStCLE1BQS9CLENBQVAsRUFBK0MsT0FBL0MsQ0FBdUQsU0FBUyxPQUFPLENBQXZFO0FBQ0EsZ0JBQU8sT0FBTyxJQUFQLENBQVksTUFBWixFQUFvQixJQUFwQixFQUFQLEVBQW1DLE9BQW5DLENBQTJDLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQTNDO0FBQ04sTUFwQkU7O0FBc0JBLFFBQUcsOENBQUgsRUFBbUQsWUFBTTtBQUNyRCxhQUFJLE9BQU8sMFFBQVg7QUFBQSxhQVVBLFNBQVM7QUFDTCxnQkFBRyxFQUFDLEdBQUcsQ0FBSixFQURFO0FBRUwsZ0JBQUcsRUFBQyxHQUFHLENBQUosRUFGRTtBQUdMLGdCQUFHLEVBQUMsR0FBRyxDQUFKO0FBSEUsVUFWVDtBQWVBLGVBQU0sYUFBTixDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLGdCQUFPLENBQVAsQ0FBUyxDQUFULEdBQWEsS0FBYjtBQUNBLGdCQUFPLENBQVAsQ0FBUyxDQUFULEdBQWEsS0FBYjtBQUNBLGdCQUFPLENBQVAsQ0FBUyxDQUFULEdBQWEsS0FBYjtBQUNBLGdCQUFPLEtBQUssU0FBTCxDQUFlLE9BQWYsQ0FBdUIsV0FBVyxPQUFPLENBQVAsQ0FBUyxDQUFwQixHQUF3QixTQUEvQyxDQUFQLEVBQWtFLE9BQWxFLENBQTBFLENBQTFFO0FBQ0EsZ0JBQU8sRUFBRSxPQUFGLEVBQVcsSUFBWCxFQUFpQixLQUF4QixFQUErQixPQUEvQixDQUF1QyxPQUFPLENBQVAsQ0FBUyxDQUFoRDtBQUNBLGdCQUFPLEVBQUUsUUFBRixFQUFZLElBQVosRUFBa0IsWUFBbEIsQ0FBK0IsTUFBL0IsQ0FBUCxFQUErQyxPQUEvQyxDQUF1RCxTQUFTLE9BQU8sQ0FBUCxDQUFTLENBQXpFO0FBQ04sTUF2QkU7O0FBeUJILFFBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUN2QyxhQUFJLE9BQU8sRUFBRSwyQkFBRixDQUFYO0FBQUEsYUFDSSxTQUFTLEVBRGI7QUFBQSxhQUVMLGtCQUFrQixNQUFNLGNBRm5COztBQUlOLGVBQU0sY0FBTixHQUF1QjtBQUN0QixtQkFBTSxJQURnQjtBQUV0QixvQkFBTztBQUZlLFVBQXZCOztBQUtNLGVBQU0sYUFBTixDQUFvQixNQUFwQixFQUE0QixJQUE1QjtBQUNBLGdCQUFPLENBQVAsR0FBVyxLQUFYO0FBQ0EsZ0JBQU8sS0FBSyxLQUFaLEVBQW1CLE9BQW5CLENBQTJCLE9BQU8sQ0FBUCxHQUFXLE1BQXRDOztBQUVOLGVBQU0sY0FBTixHQUF1QixlQUF2QjtBQUNBLE1BZkQ7QUFnQkEsRUE3SUQsRTs7Ozs7Ozs7b0NDRHFCLEU7OzRDQUNRLEU7O3VDQUNMLEU7O3NDQUNELEU7O2tDQUNKLEU7O3FDQUNHLEU7O3VDQUNFLEU7O3NDQUNELEU7O3FDQUNELEU7O0FBRXRCLFVBQVMsVUFBVCxFQUFxQixZQUFNO0FBQ3ZCLFNBQU0saUJBQWlCLEVBQUUsVUFBVSxLQUFaLEVBQXZCO0FBQ0EsU0FBSSxZQUFKO0FBQ0EsU0FBSSxhQUFKO0FBQ0EsU0FBSSxlQUFKO0FBQ0EsU0FBSSx5QkFBSjtBQUNBLFNBQUksdUJBQUo7QUFDQSxTQUFJLG9CQUFKOztBQUVBLFNBQU0saUJBQWlCLFlBQWU7QUFBQSxhQUFkLEdBQWMseURBQVIsR0FBUTs7QUFDbEMsYUFBSSxHQUFKLElBQVcsS0FBWDtBQUNBLGdCQUFPLEtBQUssS0FBWixFQUFtQixPQUFuQixDQUEyQixLQUEzQjtBQUNBLGNBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxjQUFLLFlBQUw7QUFDQSxnQkFBTyxJQUFJLEdBQUosQ0FBUCxFQUFpQixPQUFqQixDQUF5QixLQUF6QjtBQUNBLGdCQUFPLGNBQVAsRUFBdUIsZ0JBQXZCO0FBQ0gsTUFQRDs7QUFTQSxTQUFNLG1CQUFtQixZQUFNO0FBQzNCLGFBQUksQ0FBSixHQUFRLEtBQVI7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsRUFBM0I7QUFDQSxjQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsY0FBSyxZQUFMO0FBQ0EsZ0JBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixLQUF0QjtBQUNBLGdCQUFPLFdBQVAsRUFBb0IsZ0JBQXBCO0FBQ0gsTUFQRDs7QUFTQSxnQkFBVyxZQUFNO0FBQ2IsZUFBTSxFQUFOO0FBQ0EsZ0JBQU8sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVA7O0FBRUEsMEJBQWlCLFdBQWpCO0FBQ0EsdUJBQWMsV0FBZDs7QUFFQSxrQkFBVTtBQUNOLGVBRE0sWUFDSCxHQURHLEVBQ0U7QUFDSixzQkFBSyxZQUFMLEdBQW9CLEdBQXBCO0FBQ0gsY0FISztBQUlOLHFCQUpNLGNBSUs7QUFDUCx3QkFBTyxLQUFLLEtBQVo7QUFDSCxjQU5LO0FBT04scUJBUE0sWUFPRyxDQVBILEVBT007QUFDUixzQkFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNILGNBVEs7QUFVTix1QkFWTSxZQVVLLENBVkwsRUFVUTtBQUNWLHNCQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0E7QUFDSCxjQWJLO0FBY04sb0JBZE0sY0FjSTtBQUNOO0FBQ0E7QUFDSDtBQWpCSyxVQUFWO0FBbUJILE1BMUJEOztBQTRCQSxRQUFHLGlCQUFILEVBQXNCLGdCQUFRO0FBQzFCLGtCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLE1BQXpCO0FBQ0EsYUFBSSxDQUFKLEdBQVEsS0FBUjtBQUNBLGdCQUFPLEtBQUssS0FBWixFQUFtQixPQUFuQixDQUEyQixFQUEzQjtBQUNBLG9CQUFXLFlBQU07QUFDYixvQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsS0FBM0I7QUFDQSxrQkFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGtCQUFLLFlBQUw7QUFDQSxvQkFBTyxJQUFJLENBQVgsRUFBYyxPQUFkLENBQXNCLEtBQXRCO0FBQ0Esb0JBQU8sY0FBUCxFQUF1QixnQkFBdkI7QUFDQTtBQUNILFVBUEQsRUFPRyxFQVBIO0FBUUgsTUFaRDs7QUFjQSxRQUFHLGdDQUFILEVBQXFDLFlBQU07QUFDdkMsYUFBTSxXQUFXLFdBQWpCO0FBQ0EsYUFBTSxjQUFjLFdBQXBCO0FBQ0EscUJBQVksR0FBWixFQUFpQixNQUFqQixFQUF5QixRQUF6QjtBQUNBLHFCQUFZLEdBQVosRUFBaUIsUUFBakIsRUFBMkIsV0FBM0I7QUFDQSxrQkFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QixNQUF6QixFQUFpQyxjQUFqQztBQUNBO0FBQ0EsZ0JBQU8sUUFBUCxFQUFpQixnQkFBakI7QUFDQSxnQkFBTyxXQUFQLEVBQW9CLGdCQUFwQjtBQUNILE1BVEQ7O0FBV0EsUUFBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQ3pDLGFBQU0sYUFBYSxXQUFuQjtBQUNBLGFBQU0sZ0JBQWdCLFdBQXRCO0FBQ0EscUJBQVksR0FBWixFQUFpQixRQUFqQixFQUEyQixVQUEzQjtBQUNBLHFCQUFZLEdBQVosRUFBaUIsVUFBakIsRUFBNkIsYUFBN0I7QUFDQSxrQkFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QixNQUF6QixFQUFpQyxjQUFqQztBQUNBLG9CQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsSUFBckI7QUFDQTtBQUNBLGdCQUFPLFVBQVAsRUFBbUIsZ0JBQW5CO0FBQ0EsZ0JBQU8sYUFBUCxFQUFzQixnQkFBdEI7QUFDSCxNQVZEOztBQVlBLFFBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUMxQyxrQkFBUyxHQUFULEVBQWMsRUFBRSxHQUFHLElBQUwsRUFBZCxFQUEyQixNQUEzQixFQUFtQyxjQUFuQztBQUNBO0FBQ0gsTUFIRDs7QUFLQSxRQUFHLDJDQUFILEVBQWdELFlBQU07QUFDbEQsYUFBTSxZQUFZLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFsQjtBQUNBLGtCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLE1BQXpCLEVBQWlDLGNBQWpDO0FBQ0Esb0JBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixTQUFyQjtBQUNBO0FBQ0gsTUFMRDs7QUFPQSxRQUFHLDBDQUFILEVBQStDLFlBQU07QUFDakQsa0JBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUIsTUFBekIsRUFBaUMsY0FBakM7QUFDQSxvQkFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLElBQXJCO0FBQ0E7QUFDSCxNQUpEOztBQU1BLFFBQUcsc0NBQUgsRUFBMkMsWUFBTTtBQUM3QyxrQkFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QixNQUF6QixFQUFpQyxjQUFqQztBQUNBLG9CQUFXLEdBQVgsRUFBZ0IsR0FBaEI7QUFDQTtBQUNILE1BSkQ7O0FBTUEsUUFBRyxzREFBSCxFQUEyRCxZQUFNO0FBQzdELGtCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLE1BQXpCLEVBQWlDLGNBQWpDO0FBQ0Esb0JBQVcsR0FBWDtBQUNBO0FBQ0gsTUFKRDs7QUFNQSxRQUFHLCtCQUFILEVBQW9DLFlBQU07QUFDdEMsa0JBQVMsR0FBVCxFQUFjLEVBQUUsR0FBRyxJQUFMLEVBQWQsRUFBMkIsTUFBM0IsRUFBbUMsY0FBbkM7QUFDQSxvQkFBVyxHQUFYLEVBQWdCLEVBQUUsR0FBRyxJQUFMLEVBQWhCO0FBQ0E7QUFDSCxNQUpEOztBQU1BLFFBQUcsb0NBQUgsRUFBeUMsWUFBTTtBQUMzQyxrQkFBUyxHQUFULEVBQWMsQ0FBQyxFQUFFLEtBQUssR0FBUCxFQUFZLFVBQVosRUFBa0IsY0FBbEIsRUFBRCxDQUFkLEVBQTRDLGNBQTVDO0FBQ0E7QUFDSCxNQUhEOztBQUtBLFFBQUcsc0NBQUgsRUFBMkMsWUFBTTtBQUM3QyxrQkFBUyxHQUFULEVBQWMsQ0FBQyxFQUFFLEtBQUssR0FBUCxFQUFZLFVBQVosRUFBa0IsY0FBbEIsRUFBRCxDQUFkLEVBQTRDLGNBQTVDO0FBQ0Esb0JBQVcsR0FBWCxFQUFnQixDQUFDLEVBQUUsS0FBSyxHQUFQLEVBQVksVUFBWixFQUFELENBQWhCO0FBQ0E7QUFDSCxNQUpEOztBQU1BLFFBQUcsdUVBQUgsRUFBNEUsWUFBTTtBQUM5RSxlQUFNO0FBQ0YsbUJBQU0sSUFESjtBQUVGLG9CQUFPLEVBRkw7QUFHRixxQkFBUTtBQUhOLFVBQU47QUFLQSxrQkFBUyxJQUFULENBQWMsR0FBZCxFQUFtQixHQUFuQixFQUF3QixJQUF4QixFQUE4QixNQUE5QixFQUFzQyxjQUF0QztBQUNBO0FBQ0EsZ0JBQU8sSUFBSSxLQUFKLENBQVUsQ0FBakIsRUFBb0IsT0FBcEIsQ0FBNEIsSUFBNUI7QUFDQSxnQkFDSSxNQUFNLElBQU4sQ0FBVyxJQUFJLE1BQUosQ0FBVyxDQUF0QixDQURKLEVBRUUsT0FGRixDQUVVLENBQUMsSUFBRCxDQUZWO0FBR0gsTUFaRDs7QUFjQSxRQUFHLHlFQUFILEVBQThFLFlBQU07QUFDaEYsZUFBTTtBQUNGLG1CQUFNLElBREo7QUFFRixvQkFBTyxFQUZMO0FBR0YscUJBQVE7QUFITixVQUFOO0FBS0Esa0JBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUIsR0FBbkIsRUFBd0IsSUFBeEIsRUFBOEIsTUFBOUIsRUFBc0MsY0FBdEM7QUFDQSxvQkFBVyxJQUFYLENBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLElBQTFCO0FBQ0E7QUFDQSxnQkFBTyxJQUFJLEtBQUosQ0FBVSxDQUFqQixFQUFvQixhQUFwQjtBQUNBLGdCQUFPLElBQUksTUFBSixDQUFXLENBQWxCLEVBQXFCLGFBQXJCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDckMsYUFBTSxNQUFNLFdBQVcsS0FBWCxDQUFaO0FBQ0Esa0JBQVMsR0FBVCxFQUFjLE9BQWQsRUFBdUIsSUFBdkIsRUFBNkIsTUFBN0IsRUFBcUMsY0FBckM7QUFDQSxhQUFJLENBQUosQ0FBTSxDQUFOLENBQVEsQ0FBUixHQUFZLEtBQVo7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsS0FBM0I7QUFDQSxjQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsY0FBSyxZQUFMO0FBQ0EsZ0JBQU8sSUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQWYsRUFBa0IsT0FBbEIsQ0FBMEIsS0FBMUI7QUFDSCxNQVJEOztBQVVBLFFBQUcsZ0NBQUgsRUFBcUMsWUFBTTtBQUN2QyxhQUFNLE1BQU0sV0FBVyxLQUFYLENBQVo7QUFDQSxrQkFBUyxHQUFULEVBQWMsT0FBZCxFQUF1QixJQUF2QixFQUE2QixNQUE3QixFQUFxQyxjQUFyQztBQUNBLG9CQUFXLEdBQVgsRUFBZ0IsT0FBaEIsRUFBeUIsSUFBekI7QUFDQSxhQUFJLENBQUosQ0FBTSxDQUFOLENBQVEsQ0FBUixHQUFZLEtBQVo7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsRUFBM0I7QUFDQSxjQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsY0FBSyxZQUFMO0FBQ0EsZ0JBQU8sSUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQWYsRUFBa0IsT0FBbEIsQ0FBMEIsS0FBMUI7QUFDSCxNQVREOztBQVdBLFFBQUcsdURBQUgsRUFBNEQsWUFBTTtBQUM5RCxrQkFBUyxHQUFULEVBQWMsT0FBZCxFQUF1QixJQUF2QixFQUE2QixNQUE3QixFQUFxQyxPQUFPLE1BQVAsQ0FBYztBQUMvQyxtQkFBTTtBQUR5QyxVQUFkLEVBRWxDLGNBRmtDLENBQXJDO0FBR0Esd0JBQWUsT0FBZjtBQUNILE1BTEQ7O0FBT0EsUUFBRyxnQ0FBSCxFQUFxQyxZQUFNO0FBQ3ZDLGFBQU0sTUFBTSxXQUFXLE9BQVgsRUFBb0IsSUFBcEIsQ0FBWjtBQUNBLGtCQUFTLEdBQVQsRUFBYyxPQUFkLEVBQXVCLElBQXZCLEVBQTZCLE1BQTdCLEVBQXFDLGNBQXJDO0FBQ0EsYUFBSSxDQUFKLEdBQVEsV0FBVyxLQUFYLEVBQWtCLEtBQWxCLENBQVI7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsS0FBM0I7QUFDQSxjQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsY0FBSyxZQUFMO0FBQ0EsZ0JBQU8sSUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQWYsRUFBa0IsT0FBbEIsQ0FBMEIsS0FBMUI7QUFDSCxNQVJEOztBQVVBLFFBQUcseURBQUgsRUFBOEQsWUFBTTtBQUNoRSxhQUFNLE1BQU0sV0FBVyxLQUFYLENBQVo7QUFDQSxrQkFBUyxHQUFULEVBQWMsT0FBZCxFQUF1QixJQUF2QixFQUE2QixNQUE3QixFQUFxQyxjQUFyQztBQUNBLGFBQU0sSUFBSSxJQUFJLENBQWQ7O0FBRUEsYUFBSSxDQUFKLEdBQVEsV0FBVyxLQUFYLEVBQWtCLEtBQWxCLENBQVI7O0FBRUEsY0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGNBQUssWUFBTDtBQUNBLGdCQUFPLEVBQUUsQ0FBRixDQUFJLENBQVgsRUFBYyxHQUFkLENBQWtCLE9BQWxCLENBQTBCLEtBQTFCO0FBQ0EsZ0JBQU8sTUFBUCxHQUFnQixJQUFJLENBQUosQ0FBTSxDQUF0QjtBQUNBLGdCQUFPLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFmLEVBQWtCLE9BQWxCLENBQTBCLEtBQTFCO0FBQ0EsV0FBRSxDQUFGLENBQUksQ0FBSixHQUFRLEtBQVI7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsS0FBM0I7QUFDSCxNQWREOztBQWdCQSxRQUFHLHlDQUFILEVBQThDLFlBQU07QUFDaEQsYUFBTSxNQUFNLFdBQVcsS0FBWCxFQUFrQixLQUFsQixDQUFaO0FBQ0EsYUFBTSxZQUFZLEtBQUssV0FBTCxDQUFpQixTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBakIsQ0FBbEI7O0FBRUEsa0JBQVMsR0FBVCxFQUFjLFNBQWQsRUFBeUIsSUFBekI7QUFDQSxrQkFBUyxHQUFULEVBQWMsS0FBZCxFQUFxQixlQUFyQixFQUFzQyxNQUF0QyxFQUE4QyxjQUE5Qzs7QUFFQSxnQkFBTyxVQUFVLEtBQWpCLEVBQXdCLE9BQXhCLENBQWdDLEtBQWhDO0FBQ0EsbUJBQVUsS0FBVixHQUFrQixLQUFsQjtBQUNBLG1CQUFVLFlBQVY7QUFDQSxnQkFBTyxJQUFJLENBQUosQ0FBTSxDQUFiLEVBQWdCLE9BQWhCLENBQXdCLEtBQXhCO0FBQ0gsTUFYRDs7QUFhQSwrQ0FBeUMsWUFBTTtBQUMzQyxnQkFBTyxZQUFNO0FBQ1Qsc0JBQVMsR0FBVCxFQUFjLEdBQWQ7QUFDSCxVQUZELEVBRUcsT0FGSDtBQUdILE1BSkQ7O0FBTUEsa0ZBQTJFLFlBQU07QUFDN0UsZ0JBQU8sWUFBTTtBQUNULHNCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLFNBQW5CLEVBQThCLFNBQTlCLEVBQXlDLEVBQUUsVUFBVSxJQUFaLEVBQXpDO0FBQ0gsVUFGRCxFQUVHLEdBRkgsQ0FFTyxPQUZQO0FBR0gsTUFKRDs7QUFNQSxRQUFHLHFGQUFILEVBQTBGLFlBQU07QUFDNUYsZ0JBQU8sWUFBTTtBQUNULDhCQUFpQixHQUFqQixFQUFzQixHQUF0QjtBQUNILFVBRkQsRUFFRyxHQUZILENBRU8sT0FGUDtBQUdILE1BSkQ7O0FBTUEsUUFBRyw2QkFBSCxFQUFrQyxZQUFNO0FBQ3BDLGtCQUFTLEdBQVQsRUFBYyxTQUFkOztBQU9BLGdCQUNJLE9BQU8sR0FBUCxFQUFZLE1BQVosRUFBb0IsWUFBcEIsQ0FBaUMsTUFBakMsQ0FESixFQUVFLE9BRkYsQ0FFVSxLQUZWOztBQUlBLGdCQUNJLFVBQVUsR0FBVixFQUFlLE1BQWYsRUFBdUIsQ0FBdkIsRUFBMEIsWUFBMUIsQ0FBdUMsTUFBdkMsQ0FESixFQUVFLE9BRkYsQ0FFVSxLQUZWO0FBR0gsTUFmRDs7QUFpQkEsUUFBRyxvQ0FBSCxFQUF5QyxZQUFNO0FBQzNDLGtCQUFTLEdBQVQsRUFBYyxTQUFkOztBQU9BLGdCQUNJLE9BQU8sR0FBUCxFQUFZLGVBQVosRUFBNkIsWUFBN0IsQ0FBMEMsTUFBMUMsQ0FESixFQUVFLE9BRkYsQ0FFVSxLQUZWOztBQUlBLGdCQUNJLE9BQU8sR0FBUCxFQUFZLHNCQUFaLEVBQW9DLFlBQXBDLENBQWlELE1BQWpELENBREosRUFFRSxPQUZGLENBRVUsS0FGVjs7QUFJQSxnQkFDSSxVQUFVLEdBQVYsRUFBZSxzQkFBZixFQUF1QyxDQUF2QyxFQUEwQyxZQUExQyxDQUF1RCxNQUF2RCxDQURKLEVBRUUsT0FGRixDQUVVLEtBRlY7O0FBSUEsZ0JBQ0ksVUFBVSxHQUFWLEVBQWUsZUFBZixFQUFnQyxDQUFoQyxFQUFtQyxZQUFuQyxDQUFnRCxNQUFoRCxDQURKLEVBRUUsT0FGRixDQUVVLEtBRlY7O0FBSUEsZ0JBQ0ksT0FBTyxHQUFQLEVBQVksZ0JBQVosQ0FESixFQUVFLE9BRkYsQ0FFVSxJQUZWOztBQUlBLGdCQUNJLE9BQU8sR0FBUCxFQUFZLHVCQUFaLENBREosRUFFRSxPQUZGLENBRVUsSUFGVjs7QUFJQSxnQkFDSSxNQUFNLElBQU4sQ0FDSSxVQUFVLEdBQVYsRUFBZSx1QkFBZixDQURKLENBREosRUFJRSxPQUpGLENBSVUsRUFKVjs7QUFNQSxnQkFDSSxNQUFNLElBQU4sQ0FDSSxVQUFVLEdBQVYsRUFBZSxnQkFBZixDQURKLENBREosRUFJRSxPQUpGLENBSVUsRUFKVjtBQUtILE1BM0NEOztBQTZDQSxRQUFHLG1EQUFILEVBQXdELFlBQU07QUFDMUQsYUFBTSxNQUFNO0FBQ1IsbUJBQU0sSUFERTtBQUVSLG9CQUFPLEVBRkM7QUFHUixxQkFBUTtBQUhBLFVBQVo7QUFLQSxhQUFNLGNBQWMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXBCOztBQUVBLHFCQUFZLElBQVosQ0FBaUIsR0FBakIsRUFBc0IsSUFBdEIsRUFBNEIsY0FBNUI7QUFDQSxxQkFBWSxJQUFaLENBQWlCLEdBQWpCLEVBQXNCLFdBQXRCLEVBQW1DLGNBQW5DOztBQUVBLGdCQUNJLE1BQU0sSUFBTixDQUNJLFVBQVUsR0FBVixFQUFlLGlCQUFmLENBREosQ0FESixFQUlFLE9BSkYsQ0FJVSxDQUFDLFdBQUQsQ0FKVjtBQUtILE1BaEJEOztBQWtCQSxRQUFHLGtEQUFILEVBQXVELFlBQU07QUFDekQsYUFBTSxNQUFNO0FBQ1IsbUJBQU0sSUFERTtBQUVSLG9CQUFPLEVBRkM7QUFHUixxQkFBUTtBQUhBLFVBQVo7O0FBTUEsZ0JBQU8sWUFBTTtBQUNULHlCQUFZLElBQVosQ0FBaUIsR0FBakI7QUFDSCxVQUZELEVBRUcsT0FGSDtBQUdILE1BVkQ7QUFXSCxFQXRWRCxFOzs7Ozs7OztvQ0NWcUIsRTs7QUFFckI7a0JBQ3dCLGdCO0FBQVQsVUFBUyxnQkFBVCxHQUFtQztBQUM5QztBQUNBO0FBQ0EsY0FBUyxxQkFBVCxHQUFpQyxJQUFqQzs7QUFIOEMsdUNBQU4sSUFBTTtBQUFOLGFBQU07QUFBQTs7QUFJOUMsWUFBTyxTQUFTLElBQVQsQ0FBYyxJQUFkLEVBQW9CLEdBQUcsSUFBdkIsQ0FBUDtBQUNILEU7Ozs7Ozs7O29DQ1JvQixFOztzQ0FDRSxFOzsyQ0FDSyxFOztrQkFFSixXO0FBQVQsVUFBUyxXQUFULENBQXFCLE1BQXJCLEVBQTZCLElBQTdCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ25ELFNBQUcsT0FBTyxJQUFQLEtBQWdCLFFBQWhCLElBQTRCLEtBQUssSUFBcEMsRUFBMEM7QUFDdEM7QUFDQSxlQUFNLElBQU47QUFDQSxnQkFBTyxNQUFQO0FBQ0Esa0JBQVMsSUFBVDtBQUNILE1BTEQsTUFLTztBQUNIO0FBQ0EseUJBQWdCLE1BQWhCLEVBQXdCLGFBQXhCO0FBQ0g7O0FBRUQsZ0JBQVcsTUFBWCxFQUFtQixTQUFuQixFQUE4QixJQUE5QixFQUFvQyxHQUFwQztBQUNBLFlBQU8sU0FBUyxNQUFULEVBQWlCLFNBQWpCLEVBQTRCLElBQTVCLEVBQWtDLElBQWxDLEVBQXdDLEdBQXhDLENBQVA7QUFDSCxFOzs7Ozs7OztnQ0NqQmdCLEU7OytCQUNELEU7O3VDQUNRLEU7O21DQUNKLEU7OzJDQUNRLEU7O0FBRTVCLEtBQU0sd0JBQXdCLDRCQUE5Qjs7a0JBRXdCLE07QUFBVCxVQUFTLE1BQVQsQ0FBZ0IsTUFBaEIsRUFBd0IsUUFBeEIsRUFBa0M7QUFDN0MsU0FBRyxPQUFPLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEIsS0FBSyxJQUFwQyxFQUEwQztBQUN0QztBQUNBLG9CQUFXLE1BQVg7QUFDQSxrQkFBUyxJQUFUO0FBQ0gsTUFKRCxNQUlPO0FBQ0g7QUFDQSx5QkFBZ0IsTUFBaEIsRUFBd0IsV0FBeEI7QUFDSDs7QUFFSixTQUFJLHNCQUFzQixJQUF0QixDQUEyQixRQUEzQixDQUFKLEVBQTBDO0FBQ3pDLGdCQUFPLFlBQVksTUFBWixFQUFvQixRQUFwQixFQUE4QixDQUE5QixLQUFvQyxJQUEzQztBQUNBLE1BRkQsTUFFTztBQUNBLGFBQU0sTUFBTSxLQUFLLEdBQUwsQ0FBUyxNQUFULENBQVo7O0FBRUEsYUFBSSxDQUFDLEdBQUQsSUFBUSxPQUFPLFFBQVAsS0FBb0IsUUFBaEMsRUFBMEM7QUFDdEMsb0JBQU8sSUFBUDtBQUNIOztBQUVELGFBQU0sVUFBVSxJQUFJLEtBQUosQ0FBVSxPQUExQjs7QUFFQSxhQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1Ysb0JBQU8sSUFBUDtBQUNIOztBQVhELGFBYVEsUUFiUixHQWFxQixPQWJyQixDQWFRLFFBYlI7OztBQWVBLGFBQUcsUUFBSCxFQUFhO0FBQUEsaUJBQ0QsSUFEQyxHQUNRLFNBQVMsQ0FBVCxDQURSLENBQ0QsSUFEQzs7QUFFVCxvQkFBTyxLQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBUDtBQUNIOztBQUVELGdCQUFPLElBQVA7QUFDTjtBQUNELEc7Ozs7Ozs7O2dDQzFDZ0IsRTs7K0JBQ0QsRTs7dUNBQ1EsRTs7bUNBQ0osRTs7MkNBQ1EsRTs7QUFFNUIsS0FBTSx3QkFBd0IsNEJBQTlCOztrQkFFd0IsUztBQUFULFVBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixRQUEzQixFQUFxQztBQUNoRCxTQUFHLE9BQU8sSUFBUCxLQUFnQixRQUFoQixJQUE0QixLQUFLLElBQXBDLEVBQTBDO0FBQ3RDO0FBQ0Esb0JBQVcsTUFBWDtBQUNBLGtCQUFTLElBQVQ7QUFDSCxNQUpELE1BSU87QUFDSDtBQUNBLHlCQUFnQixNQUFoQixFQUF3QixXQUF4QjtBQUNIOztBQUdKLFNBQUksc0JBQXNCLElBQXRCLENBQTJCLFFBQTNCLENBQUosRUFBMEM7QUFDekMsZ0JBQU8sWUFBWSxNQUFaLEVBQW9CLFFBQXBCLENBQVA7QUFDQSxNQUZELE1BRU87QUFBQTtBQUNBLGlCQUFNLFNBQVMsSUFBSSxDQUFKLEVBQWY7QUFDQSxpQkFBTSxNQUFNLEtBQUssR0FBTCxDQUFTLE1BQVQsQ0FBWjs7QUFFQSxpQkFBSSxDQUFDLEdBQUQsSUFBUSxPQUFPLFFBQVAsS0FBb0IsUUFBaEMsRUFBMEM7QUFDdEM7QUFBQSx3QkFBTztBQUFQO0FBQ0g7O0FBRUQsaUJBQU0sVUFBVSxJQUFJLEtBQUosQ0FBVSxPQUExQjs7QUFFQSxpQkFBSSxDQUFDLE9BQUwsRUFBYztBQUNWO0FBQUEsd0JBQU87QUFBUDtBQUNIOztBQVpELGlCQWNRLFFBZFIsR0FjcUIsT0FkckIsQ0FjUSxRQWRSOzs7QUFnQkEsaUJBQUcsUUFBSCxFQUFhO0FBQUEsb0NBQ0ksUUFESix3RkFDNEI7QUFBQSx5QkFBWCxJQUFXLFFBQVgsSUFBVzs7QUFDakMseUJBQU0sV0FBVyxLQUFLLGdCQUFMLENBQXNCLFFBQXRCLENBQWpCO0FBQ0EsOEJBQVMsT0FBTyxHQUFQLENBQVcsUUFBUSxRQUFSLENBQVgsQ0FBVDtBQUNIO0FBQ0o7O0FBRUQ7QUFBQSxvQkFBTztBQUFQO0FBdkJBOztBQUFBO0FBd0JOO0FBQ0QsRzs7Ozs7Ozs7QUM5Q0Q7QUFDQTtrQkFDd0IsVTtBQUFULFVBQVMsVUFBVCxHQUFvRDtBQUFBLFNBQWhDLFNBQWdDLHlEQUFwQixFQUFvQjtBQUFBLFNBQWhCLFNBQWdCLHlEQUFKLEVBQUk7O0FBQy9ELFNBQU0sT0FBTyxZQUFZLFVBQVUsS0FBVixDQUFnQixHQUFoQixDQUFaLEdBQW1DLEVBQWhEO0FBQ0EsU0FBTSxTQUFTLEVBQWY7QUFDQSxTQUFJLE1BQU0sTUFBVjtBQUNBLFNBQUksWUFBSjs7QUFHQSxZQUFPLEtBQUssTUFBTCxHQUFjLENBQXJCLEVBQXdCO0FBQ3BCLGVBQU0sS0FBSyxLQUFMLEVBQU47QUFDQSxlQUFNLElBQUksR0FBSixJQUFXLEVBQWpCO0FBQ0g7O0FBRUQsU0FBSSxLQUFLLEtBQUwsRUFBSixJQUFvQixTQUFwQjs7QUFFQSxZQUFPLE1BQVA7QUFDSCxFOzs7Ozs7OztrQkNqQnVCLFM7QUFBVCxVQUFTLFNBQVQsR0FBcUI7QUFDaEMsU0FBTSx5QkFBdUIsS0FBSyxNQUFMLEVBQXZCLEdBQXVDLElBQUksSUFBSixHQUFXLE9BQVgsRUFBN0M7QUFDQSxTQUFNLE1BQU0sWUFBTSxDQUFFLENBQXBCO0FBQ0EsU0FBTSxTQUFTLEVBQWY7QUFDQSxZQUFPLE9BQVAsSUFBa0IsR0FBbEI7QUFDQSxZQUFPLE1BQU0sTUFBTixFQUFjLE9BQWQsQ0FBUDtBQUNILEU7Ozs7Ozs7O3VDQ0FNLEM7Ozs7Ozs7O3lDQUVtQixFOztvQ0FDTCxFOztBQUVyQixVQUFTLGlCQUFULEVBQTRCLFlBQU07QUFDOUIsU0FBTSxpQkFBaUIsRUFBRSxVQUFVLEtBQVosRUFBdkI7QUFDSCxTQUFJLFlBQUo7O0FBRUEsZ0JBQVcsWUFBTTtBQUNWLGlCQUFRLFdBQVIsQ0FBb0I7QUFDaEIsMkJBQWMsVUFBQyxJQUFELEVBQU8scUJBQVA7QUFBQSx3QkFBa0M7QUFDNUMsOEJBQVMsVUFBQyxNQUFELEVBQVMsUUFBVCxFQUFzQjtBQUMzQiw2QkFBTSxTQUFTLEVBQWY7QUFDQSw2QkFBTSxPQUFPLE9BQU8sSUFBUCxHQUFjLEtBQUssTUFBTCxDQUFZLE9BQU8sRUFBbkIsRUFBdUIsU0FBUyxFQUFoQyxFQUFvQyxxQkFBcEMsS0FDcEIsS0FBSyxNQUFMLE1BQWUsT0FBTyxRQUF0QixPQUFxQyxTQUFTLFFBQTlDLEVBQTBELHFCQUExRCxDQURvQixJQUVwQixLQUFLLE1BQUwsTUFBZSxPQUFPLFFBQXRCLE9BQXFDLFNBQVMsUUFBOUMsRUFBMEQscUJBQTFELENBRlA7O0FBSUEsZ0NBQU8sT0FBUCxHQUFpQixPQUFPLG1CQUFQLEdBQTZCLHVCQUE5QztBQUNBLGdDQUFPLE1BQVA7QUFDSDtBQVQyQyxrQkFBbEM7QUFBQTtBQURFLFVBQXBCOztBQWNOLGVBQU0sRUFBTjtBQUNBLE1BaEJEOztBQWtCRyxRQUFHLHNCQUFILEVBQTJCLFlBQU07QUFDN0IsYUFBTSxPQUFPLFNBQVMsYUFBVCxDQUF1QixVQUF2QixDQUFiO0FBQ04sY0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGtCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLFVBQXpCLEVBQXFDLGNBQXJDO0FBQ0EsZ0JBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixLQUF0QjtBQUNBLGFBQUksQ0FBSixHQUFRLEtBQVI7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsS0FBM0I7O0FBRU0sZ0JBQU8sY0FBYyxJQUFkLENBQVAsRUFBNEIsWUFBNUIsQ0FBeUMsVUFBekM7QUFDTixNQVRFOztBQVdBLFFBQUcsc0JBQUgsRUFBMkIsWUFBTTtBQUM3QixhQUFNLE9BQU8sU0FBUyxhQUFULENBQXVCLFVBQXZCLENBQWI7QUFDTixjQUFLLEdBQUwsR0FBVyxDQUFYO0FBQ00sY0FBSyxLQUFMLEdBQWEsQ0FBYjtBQUNOLGtCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLFVBQXpCLEVBQXFDLGNBQXJDO0FBQ0EsZ0JBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixDQUF0QjtBQUNBLGFBQUksQ0FBSixHQUFRLENBQVI7QUFDQSxnQkFBTyxLQUFLLEtBQVosRUFBbUIsT0FBbkIsQ0FBMkIsQ0FBM0I7O0FBRU0sZ0JBQU8sY0FBYyxJQUFkLENBQVAsRUFBNEIsWUFBNUIsQ0FBeUMsVUFBekM7QUFDTixNQVZFOztBQVlBLFFBQUcsd0JBQUgsRUFBNkIsWUFBTTtBQUMvQixhQUFNLE9BQU8sU0FBUyxhQUFULENBQXVCLE9BQXZCLENBQWI7QUFDTixjQUFLLElBQUwsR0FBWSxNQUFaO0FBQ00sY0FBSyxLQUFMLEdBQWEsS0FBYjtBQUNOLGtCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLE1BQU0sTUFBTixDQUF6QixFQUF3QyxjQUF4QztBQUNBLGdCQUFPLElBQUksQ0FBWCxFQUFjLE9BQWQsQ0FBc0IsS0FBdEI7QUFDQSxhQUFJLENBQUosR0FBUSxLQUFSO0FBQ0EsZ0JBQU8sS0FBSyxLQUFaLEVBQW1CLE9BQW5CLENBQTJCLEtBQTNCOztBQUVNLGdCQUFPLGNBQWMsSUFBZCxDQUFQLEVBQTRCLFlBQTVCLENBQXlDLE1BQU0sTUFBTixDQUF6QztBQUNOLE1BVkU7O0FBWUEsUUFBRyxvQkFBSCxFQUF5QixZQUFNO0FBQzNCLGFBQU0sT0FBTyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLGNBQUssU0FBTCxHQUFpQixLQUFqQjtBQUNOLGtCQUFTLEdBQVQsRUFBYyxHQUFkLEVBQW1CLElBQW5CLEVBQXlCLFFBQXpCLEVBQW1DLGNBQW5DO0FBQ0EsZ0JBQU8sSUFBSSxDQUFYLEVBQWMsT0FBZCxDQUFzQixLQUF0QjtBQUNBLGFBQUksQ0FBSixHQUFRLEtBQVI7QUFDQSxnQkFBTyxLQUFLLFNBQVosRUFBdUIsT0FBdkIsQ0FBK0IsS0FBL0I7QUFDTSxnQkFBTyxjQUFjLElBQWQsQ0FBUCxFQUE0QixZQUE1QixDQUF5QyxRQUF6QztBQUNOLE1BUkU7O0FBVUEsUUFBRyxvQkFBSCxFQUF5QixZQUFNO0FBQzNCLGFBQU0sT0FBTyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLGNBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLEVBQW5CLEVBQXVCLEdBQXZCLEVBQTRCO0FBQ3hCLGlCQUFNLFNBQVMsS0FBSyxXQUFMLENBQWlCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFqQixDQUFmO0FBQ0Esb0JBQU8sS0FBUCxRQUFrQixDQUFsQjtBQUNBLGlCQUFHLE1BQU0sQ0FBVCxFQUFZO0FBQ1Isd0JBQU8sUUFBUCxHQUFrQixJQUFsQjtBQUNIO0FBQ0o7O0FBRVAsa0JBQVMsR0FBVCxFQUFjLEdBQWQsRUFBbUIsSUFBbkIsRUFBeUIsUUFBekIsRUFBbUMsY0FBbkM7QUFDQSxnQkFBTyxJQUFJLENBQVgsRUFBYyxPQUFkLENBQXNCLEdBQXRCO0FBQ0EsYUFBSSxDQUFKLEdBQVEsR0FBUjtBQUNBLGdCQUFPLEtBQUssS0FBWixFQUFtQixPQUFuQixDQUEyQixHQUEzQjs7QUFFTSxnQkFBTyxjQUFjLElBQWQsQ0FBUCxFQUE0QixZQUE1QixDQUF5QyxRQUF6QztBQUNOLE1BaEJFOztBQWtCQSxRQUFHLCtCQUFILEVBQW9DLFlBQU07QUFDdEMsYUFBTSxPQUFPLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsY0FBSyxRQUFMLEdBQWdCLElBQWhCOztBQUVBLGNBQUksSUFBSSxJQUFJLENBQVosRUFBZSxJQUFJLEVBQW5CLEVBQXVCLEdBQXZCLEVBQTRCO0FBQ3hCLGlCQUFNLFNBQVMsS0FBSyxXQUFMLENBQWlCLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFqQixDQUFmO0FBQ0Esb0JBQU8sS0FBUCxRQUFrQixDQUFsQjtBQUNBLGlCQUFHLE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBakIsSUFBc0IsTUFBTSxDQUEvQixFQUFrQztBQUM5Qix3QkFBTyxRQUFQLEdBQWtCLElBQWxCO0FBQ0g7QUFDSjs7QUFFUCxrQkFBUyxHQUFULEVBQWMsR0FBZCxFQUFtQixJQUFuQixFQUF5QixPQUFPLElBQVAsQ0FBekIsRUFBdUMsY0FBdkM7QUFDQSxnQkFBTyxJQUFJLENBQVgsRUFBYyxPQUFkLENBQXNCLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQXRCO0FBQ0EsYUFBSSxDQUFKLEdBQVEsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBUjs7QUFFTSxjQUFJLElBQUksS0FBSSxDQUFaLEVBQWUsS0FBSSxFQUFuQixFQUF1QixJQUF2QixFQUE0QjtBQUN4QixvQkFDSSxLQUFLLE9BQUwsQ0FBYSxFQUFiLEVBQWdCLFFBRHBCLEVBRUUsT0FGRixDQUdJLE9BQU0sQ0FBTixJQUFXLE9BQU0sQ0FBakIsSUFBc0IsT0FBTSxDQUhoQztBQUtIOztBQUVELGdCQUFPLGNBQWMsSUFBZCxDQUFQLEVBQTRCLFlBQTVCLENBQXlDLE9BQU8sSUFBUCxDQUF6QztBQUNOLE1BekJFO0FBMEJILEVBL0dELEU7Ozs7Ozs7OzZCQ1ZjLEU7O0FBRWQsVUFBUyxlQUFULEVBQTBCLFlBQU07QUFDNUIsUUFBRyxXQUFILEVBQWdCLFlBQU07QUFDbEIsYUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsYUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsYUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsYUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0EsYUFBTSxNQUFNLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaOztBQUVBLGdCQUFPLENBQ0gsR0FBRyxFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLENBQUYsRUFBbUIsR0FBbkIsQ0FBdUIsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsQ0FBdkIsQ0FEQSxDQUFQLEVBRUcsT0FGSCxDQUVXLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLENBRlg7QUFHSCxNQVZEO0FBV0gsRUFaRCxFLENBSEEseUM7Ozs7Ozs7OzZCQ0NjLEU7O0FBRWQsVUFBUyxlQUFULEVBQTBCLFlBQU07QUFDNUIsUUFBRyxpQkFBSCxFQUFzQixZQUFNO0FBQ3hCLGdCQUNJLEVBQUUsTUFBRixDQUFTLEtBQVQsRUFBZ0IsT0FEcEIsRUFFRSxPQUZGLENBRVUsS0FGVjtBQUdILE1BSkQ7O0FBTUEsUUFBRyxpQkFBSCxFQUFzQixZQUFNO0FBQ3hCLGdCQUNJLEVBQUUsTUFBRixDQUFTLEtBQVQsRUFBZ0I7QUFDWix3QkFBVztBQURDLFVBQWhCLEVBRUcsU0FIUCxFQUlFLE9BSkYsQ0FJVSxRQUpWO0FBS0gsTUFORDs7QUFRQSxRQUFHLGlCQUFILEVBQXNCLFlBQU07QUFDeEIsZ0JBQ0ksRUFBRSxNQUFGLENBQVMsS0FBVCxFQUFnQjtBQUNaLHVCQUFVLENBQUM7QUFDUCwwQkFBUztBQURGLGNBQUQ7QUFERSxVQUFoQixFQUlHLFFBSkgsQ0FJWSxDQUpaLEVBSWUsT0FMbkIsRUFNRSxPQU5GLENBTVUsTUFOVjtBQU9ILE1BUkQ7O0FBVUEsUUFBRyxnQkFBSCxFQUFxQixZQUFNO0FBQ3ZCLGdCQUNJLEVBQUUsTUFBRixDQUFTLEtBQVQsRUFBZ0I7QUFDWix5QkFBWTtBQUNSLHNCQUFLO0FBREc7QUFEQSxVQUFoQixFQUlHLFlBSkgsQ0FJZ0IsS0FKaEIsQ0FESixFQU1FLE9BTkYsQ0FNVSxLQU5WO0FBT0gsTUFSRDs7QUFVQSxRQUFHLDZDQUFILEVBQWtELFlBQU07QUFDcEQsZ0JBQ0ksRUFBRSxNQUFGLENBQVM7QUFDTCxzQkFBUztBQURKLFVBQVQsRUFFRyxPQUhQLEVBSUUsT0FKRixDQUlVLEtBSlY7QUFLSCxNQU5EOztBQVFBLFFBQUcsd0JBQUgsRUFBNkIsWUFBTTtBQUMvQixnQkFDSSxFQUFFLE1BQUYsQ0FBUyxLQUFULEVBQWdCO0FBQ1osc0JBQVM7QUFDTCxzQkFBSztBQURBO0FBREcsVUFBaEIsRUFJRyxZQUpILENBSWdCLFVBSmhCLENBREosRUFNRSxPQU5GLENBTVUsS0FOVjtBQU9ILE1BUkQ7QUFTSCxFQXBERCxFLENBSEEseUM7Ozs7Ozs7O21CQ0FBOzs7NkJBQ2MsRTs7eUNBQ1ksRTs7QUFFMUIsVUFBUyxlQUFULEVBQTBCLFlBQU07QUFDNUIsU0FBSSxvQkFBSjtBQUNBLFNBQUksZUFBSjtBQUNBLFNBQUksZUFBSjtBQUNBLFNBQUksb0JBQUo7QUFDQSxTQUFJLGdCQUFKOztBQUVBLGdCQUFXLFlBQU07QUFDYix1QkFBYyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDs7QUFFQSxxQkFBWSxTQUFaOztBQU9BLGtCQUFTLFlBQVksYUFBWixDQUEwQixTQUExQixDQUFUO0FBQ0Esa0JBQVMsWUFBWSxhQUFaLENBQTBCLFNBQTFCLENBQVQ7QUFDQSx1QkFBYyxZQUFZLGFBQVosQ0FBMEIsY0FBMUIsQ0FBZDs7QUFFQSxlQUFLLE9BQUwsR0FBZSxZQUFNLENBQUUsQ0FBdkI7QUFDQSxzQkFBWSxTQUFaO0FBQ0EsbUJBQVUsTUFBSyxPQUFmO0FBQ0gsTUFqQkQ7O0FBbUJBLGVBQVUsWUFBTTtBQUNaLFdBQUUsQ0FBQyxXQUFELEVBQWMsTUFBZCxFQUFzQixNQUF0QixFQUE4QixXQUE5QixDQUFGLEVBQThDLEdBQTlDLENBQWtELE9BQWxEO0FBQ0gsTUFGRDs7QUFJQSxRQUFHLHFCQUFILEVBQTBCLFlBQU07QUFDNUIsV0FBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixPQUEzQjtBQUNBLHVCQUFjLFdBQWQ7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLGdCQUFoQjtBQUNILE1BSkQ7O0FBTUEsUUFBRyxnREFBSCxFQUFxRCxZQUFNO0FBQ3ZELFdBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsT0FBM0IsRUFBb0MsR0FBcEMsQ0FBd0MsT0FBeEMsRUFBaUQsT0FBakQ7QUFDQSx1QkFBYyxXQUFkO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQUpEOztBQU1BLFFBQUcsb0RBQUgsRUFBeUQsWUFBTTtBQUMzRCxXQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLE9BQTNCLEVBQW9DLEdBQXBDLENBQXdDLE9BQXhDO0FBQ0EsdUJBQWMsV0FBZDtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFKRDs7QUFNQSxRQUFHLDBCQUFILEVBQStCLFlBQU07QUFDakMsV0FBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixVQUFsQixFQUE4QixPQUE5QjtBQUNBLHVCQUFjLFdBQWQ7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLGdCQUFoQjtBQUNILE1BSkQ7O0FBTUEsUUFBRyxxREFBSCxFQUEwRCxZQUFNO0FBQzVELFdBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsVUFBbEIsRUFBOEIsT0FBOUIsRUFBdUMsR0FBdkMsQ0FBMkMsVUFBM0MsRUFBdUQsT0FBdkQ7QUFDQSx1QkFBYyxXQUFkO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQUpEOztBQU1BLFFBQUcseURBQUgsRUFBOEQsWUFBTTtBQUNoRSxXQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLFVBQWxCLEVBQThCLE9BQTlCLEVBQXVDLEdBQXZDLENBQTJDLFVBQTNDO0FBQ0EsdUJBQWMsV0FBZDtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFKRDs7QUFNQSxRQUFHLDhCQUFILEVBQW1DLFlBQU07QUFDckMsV0FBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixPQUEzQjtBQUNBLHVCQUFjLFdBQWQ7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLGdCQUFoQjtBQUNILE1BSkQ7O0FBTUEsUUFBRywrQkFBSCxFQUFvQyxZQUFNO0FBQ3RDLFdBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsU0FBM0IsRUFBc0MsT0FBdEM7QUFDQSx1QkFBYyxNQUFkO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQUpEOztBQU1BLFFBQUcsd0RBQUgsRUFBNkQsWUFBTTtBQUMvRCxXQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCLEVBQXNDLE9BQXRDO0FBQ0EsdUJBQWMsV0FBZDtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFKRDs7QUFNQSxRQUFHLDZDQUFILEVBQWtELFlBQU07QUFDcEQsV0FBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixTQUEzQixFQUFzQyxPQUF0QztBQUNBLHVCQUFjLFdBQWQ7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNILE1BSkQ7O0FBTUEsUUFBRyx1RUFBSCxFQUE0RSxZQUFNO0FBQzlFLFdBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsU0FBM0IsRUFBc0MsT0FBdEMsRUFBK0MsR0FBL0MsQ0FBbUQsT0FBbkQsRUFBNEQsU0FBNUQsRUFBdUUsT0FBdkU7QUFDQSx1QkFBYyxNQUFkO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQUpEOztBQU1BLFFBQUcsb0ZBQUgsRUFBeUYsWUFBTTtBQUMzRixXQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFNBQTNCLEVBQXNDLE9BQXRDLEVBQStDLEdBQS9DLENBQW1ELE9BQW5ELEVBQTRELFNBQTVEO0FBQ0EsdUJBQWMsTUFBZDtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFKRDs7QUFNQSxRQUFHLG9GQUFILEVBQXlGLFlBQU07QUFDM0YsV0FBRSxXQUFGLEVBQWUsRUFBZixDQUFrQixPQUFsQixFQUEyQixTQUEzQixFQUFzQyxPQUF0QyxFQUErQyxHQUEvQyxDQUFtRCxPQUFuRCxFQUE0RCxPQUE1RDtBQUNBLHVCQUFjLE1BQWQ7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNILE1BSkQ7O0FBTUEsUUFBRywyRUFBSCxFQUFnRixZQUFNO0FBQ2xGLFdBQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsU0FBM0IsRUFBc0MsT0FBdEMsRUFBK0MsR0FBL0MsQ0FBbUQsT0FBbkQ7QUFDQSx1QkFBYyxNQUFkO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQUpEOztBQU1BLFFBQUcsbUJBQUgsRUFBd0IsWUFBTTtBQUMxQixXQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLE9BQTNCO0FBQ0EsV0FBRSxNQUFGLEVBQVUsRUFBVixDQUFhLE9BQWIsRUFBc0I7QUFBQSxvQkFBTyxJQUFJLGVBQUosRUFBUDtBQUFBLFVBQXRCO0FBQ0EsdUJBQWMsTUFBZDtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFMRDtBQU1ILEVBeEhELEU7Ozs7Ozs7O0FDSkE7a0JBQ3dCLGE7QUFBVCxVQUFTLGFBQVQsQ0FBdUIsSUFBdkIsRUFBNkI7QUFDeEMsU0FBTSxNQUFNLFNBQVMsV0FBVCxDQUFxQixZQUFyQixDQUFaO0FBQ0EsU0FBSSxjQUFKLENBQW1CLE9BQW5CLEVBQTRCLElBQTVCO0FBQ0EsVUFBSyxhQUFMLENBQW1CLEdBQW5CO0FBQ0gsRTs7Ozs7Ozs7NkJDSmEsRTs7QUFFZCxVQUFTLGdCQUFULEVBQTJCLFlBQU07QUFDN0IsU0FBSSxvQkFBSjtBQUNBLFNBQUksbUJBQUo7O0FBRUEsZ0JBQVcsWUFBTTtBQUNiLHVCQUFjLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFkOztBQUVBLHFCQUFZLFNBQVo7O0FBTUEsc0JBQWEsWUFBWSxhQUFaLENBQTBCLGFBQTFCLENBQWI7QUFDSCxNQVZEOztBQVlBLFFBQUcsT0FBSCxFQUFZLFlBQU07QUFDZCxnQkFBTyxDQUNILEdBQUcsRUFBRSxXQUFGLEVBQWUsSUFBZixDQUFvQixhQUFwQixDQURBLENBQVAsRUFFRyxPQUZILENBRVcsQ0FBQyxVQUFELENBRlg7QUFHSCxNQUpEO0FBS0gsRUFyQkQsRSxDQUhBLHlDOzs7Ozs7Ozs2QkNDYyxFOztBQUVkLFVBQVMsdUJBQVQsRUFBa0MsWUFBTTtBQUNwQyxTQUFJLG9CQUFKOztBQUVBLGdCQUFXLFlBQU07QUFDYix1QkFBYyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDs7QUFFQSxxQkFBWSxTQUFaO0FBT0gsTUFWRDs7QUFZQSxRQUFHLGdCQUFILEVBQXFCLFlBQU07QUFDdkIsYUFBTSxTQUFTLEVBQUUsTUFBRixDQUFmO0FBQ0EsZ0JBQU8sT0FBTyxNQUFkLEVBQXNCLE9BQXRCLENBQThCLENBQTlCO0FBQ0EsZ0JBQU8sT0FBTyxDQUFQLENBQVAsRUFBa0IsT0FBbEIsQ0FBMEIsTUFBMUI7QUFDSCxNQUpEOztBQU1BLFFBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUN6QixhQUFNLFNBQVMsRUFBRSxRQUFGLENBQWY7QUFDQSxnQkFBTyxPQUFPLE1BQWQsRUFBc0IsT0FBdEIsQ0FBOEIsQ0FBOUI7QUFDQSxnQkFBTyxPQUFPLENBQVAsQ0FBUCxFQUFrQixPQUFsQixDQUEwQixRQUExQjtBQUNILE1BSkQ7O0FBTUEsUUFBRyxhQUFILEVBQWtCLFlBQU07QUFDcEIsYUFBTSxTQUFTLEVBQUUsMEJBQUYsQ0FBZjs7QUFFQSxnQkFBTyxPQUFPLE1BQWQsRUFBc0IsT0FBdEIsQ0FBOEIsQ0FBOUI7QUFDQSxnQkFBTyxPQUFPLENBQVAsRUFBVSxPQUFqQixFQUEwQixPQUExQixDQUFrQyxLQUFsQztBQUNBLGdCQUFPLE9BQU8sQ0FBUCxFQUFVLE9BQWpCLEVBQTBCLE9BQTFCLENBQWtDLE1BQWxDO0FBQ0gsTUFORDs7QUFRQSxRQUFHLHFCQUFILEVBQTBCLFlBQU07QUFDNUIsYUFBTSxXQUFXLFlBQVksZ0JBQVosQ0FBNkIsR0FBN0IsQ0FBakI7QUFDQSxhQUFNLFNBQVMsRUFBRSxRQUFGLENBQWY7O0FBRUEsZ0JBQU8sU0FBUyxNQUFoQixFQUF3QixPQUF4QixDQUFnQyxPQUFPLE1BQXZDOztBQUVBLGNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxTQUFTLE1BQTdCLEVBQXFDLEdBQXJDLEVBQTBDO0FBQ3RDLG9CQUFPLFNBQVMsQ0FBVCxDQUFQLEVBQW9CLE9BQXBCLENBQTRCLE9BQU8sQ0FBUCxDQUE1QjtBQUNIO0FBQ0osTUFURDs7QUFXQSxRQUFHLHNCQUFILEVBQTJCLFlBQU07QUFDN0IsYUFBTSxVQUFVLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFoQjtBQUNBLGFBQU0sU0FBUyxFQUFFLE9BQUYsQ0FBZjs7QUFFQSxnQkFBTyxPQUFPLE1BQWQsRUFBc0IsT0FBdEIsQ0FBOEIsQ0FBOUI7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLE9BQWhCLENBQXdCLE9BQU8sQ0FBUCxDQUF4QjtBQUNILE1BTkQ7O0FBUUEsUUFBRyxjQUFILEVBQW1CLFlBQU07QUFDckIsZ0JBQ0ksRUFBRSxTQUFGLEVBQWEsV0FBYixFQUEwQixNQUQ5QixFQUVFLE9BRkYsQ0FFVSxDQUZWO0FBR0gsTUFKRDs7QUFNQSxRQUFHLGNBQUgsRUFBbUIsWUFBTTtBQUNyQixnQkFDSSxFQUFFLFNBQUYsRUFBYSxnQkFBYixFQUErQixNQURuQyxFQUVFLE9BRkYsQ0FFVSxDQUZWO0FBR0gsTUFKRDs7QUFNQSxRQUFHLG9CQUFILEVBQXlCLFlBQU07QUFDM0IsZ0JBQ0ksRUFBRSxJQUFGLEVBQVEsTUFEWixFQUVFLE9BRkYsQ0FFVSxDQUZWO0FBR0gsTUFKRDs7QUFNQSxRQUFHLHlCQUFILEVBQThCLFlBQU07QUFDaEMsZ0JBQ0ksSUFBSSxNQURSLEVBRUUsT0FGRixDQUVVLENBRlY7QUFHSCxNQUpEOztBQU1BLFFBQUcsMEJBQUgsRUFBK0IsWUFBTTtBQUNqQyxXQUFFLEVBQUYsQ0FBSyxZQUFMLEdBQW9CLFNBQVMsWUFBVCxHQUF3QjtBQUN4QyxvQkFDSSxLQUFLLE1BRFQsRUFFRSxPQUZGLENBR0ksWUFBWSxnQkFBWixDQUE2QixHQUE3QixFQUFrQyxNQUh0QztBQUtILFVBTkQ7O0FBUUEsZUFBTSxFQUFFLEVBQVIsRUFBWSxjQUFaOztBQUVBLFdBQUUsR0FBRixFQUFPLFdBQVAsRUFBb0IsWUFBcEI7O0FBRUEsZ0JBQU8sRUFBRSxFQUFGLENBQUssWUFBWixFQUEwQixnQkFBMUI7QUFDSCxNQWREO0FBZUgsRUE3RkQsRSxDQUhBLHlDOzs7Ozs7Ozs2QkNDYyxFOztBQUVkLFVBQVMsZUFBVCxFQUEwQixZQUFNO0FBQzVCLFFBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUN6QixhQUFNLEtBQUssU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQSxZQUFHLFNBQUgsR0FBZSxJQUFmOztBQUVBLGdCQUNJLEVBQUUsRUFBRixFQUFNLEVBQU4sQ0FBUyxLQUFULENBREosRUFFRSxPQUZGLENBRVUsSUFGVjs7QUFJQSxnQkFDSSxFQUFFLEVBQUYsRUFBTSxFQUFOLENBQVMsTUFBVCxDQURKLEVBRUUsT0FGRixDQUVVLEtBRlY7QUFHSCxNQVhEO0FBWUgsRUFiRCxFLENBSEEseUM7Ozs7Ozs7OzZCQ0NjLEU7O0FBRWQsVUFBUyxlQUFULEVBQTBCLFlBQU07QUFDNUIsUUFBRyxzQkFBSCxFQUEyQixZQUFNO0FBQzdCLGFBQU0sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLGFBQU0sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjtBQUNBLGFBQU0sTUFBTSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjs7QUFFQSxhQUFJLFNBQUosR0FBZ0IsS0FBaEI7O0FBRUEsZ0JBQU8sQ0FDSCxHQUFHLEVBQUUsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsQ0FBRixFQUFtQixHQUFuQixDQUF1QixNQUF2QixDQURBLENBQVAsRUFFRyxPQUZILENBRVcsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUZYO0FBR0gsTUFWRDtBQVdILEVBWkQsRSxDQUhBLHlDOzs7Ozs7Ozs2QkNDYyxFOztBQUVkLFVBQVMsWUFBVCxFQUF1QixZQUFNO0FBQ3pCLFFBQUcsT0FBSCxFQUFZLFlBQU07QUFDZCxhQUFNLGNBQWMsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQXBCOztBQUVBLHFCQUFZLFNBQVo7O0FBU0EsYUFBTSxRQUFRLFlBQVksYUFBWixDQUEwQixRQUExQixDQUFkOztBQUVBLGdCQUNJLEVBQUUsR0FBRixDQUFNLEdBQU4sRUFBVyxXQUFYLENBREosRUFFRSxPQUZGLENBRVUsS0FGVjtBQUdILE1BakJEO0FBa0JILEVBbkJELEUsQ0FIQSx5Qzs7Ozs7Ozs7NkJDQ2MsRTs7QUFFZCxVQUFTLGtCQUFULEVBQTZCLFlBQU07QUFDL0IsUUFBRyxhQUFILEVBQWtCLFlBQU07QUFDcEIsYUFBTSxTQUFTLEVBQUUsU0FBRixDQUFZLDBCQUFaLENBQWY7O0FBRUEsZ0JBQU8sT0FBTyxNQUFkLEVBQXNCLE9BQXRCLENBQThCLENBQTlCO0FBQ0EsZ0JBQU8sT0FBTyxDQUFQLEVBQVUsT0FBakIsRUFBMEIsT0FBMUIsQ0FBa0MsS0FBbEM7QUFDQSxnQkFBTyxPQUFPLENBQVAsRUFBVSxPQUFqQixFQUEwQixPQUExQixDQUFrQyxNQUFsQztBQUNILE1BTkQ7O0FBUUEsUUFBRyw0QkFBSCxFQUFpQyxZQUFNO0FBQ25DLGFBQU0sU0FBUyxFQUFFLFNBQUYsQ0FBWSxvQkFBWixDQUFmOztBQUVBLGdCQUFPLE9BQU8sTUFBZCxFQUFzQixPQUF0QixDQUE4QixDQUE5QjtBQUNBLGdCQUFPLE9BQU8sQ0FBUCxFQUFVLE9BQWpCLEVBQTBCLE9BQTFCLENBQWtDLElBQWxDO0FBQ0EsZ0JBQU8sT0FBTyxDQUFQLEVBQVUsT0FBakIsRUFBMEIsT0FBMUIsQ0FBa0MsSUFBbEM7QUFDSCxNQU5EO0FBT0gsRUFoQkQsRSxDQUhBLHlDOzs7Ozs7OztpQ0NBa0IsRTs7QUFFbEIsVUFBUyxnQkFBVCxFQUEyQixZQUFNO0FBQzdCLFFBQUcsbUJBQUgsRUFBd0IsWUFBTTtBQUMxQixhQUFNLElBQUksTUFBTSxFQUFFLEdBQUcsSUFBTCxFQUFOLENBQVY7QUFBQSxhQUNJLElBQUksTUFBTSxFQUFFLEdBQUcsSUFBTCxFQUFXLFNBQVMsQ0FBcEIsRUFBTixDQURSO0FBQUEsYUFFSSxJQUFJLE1BQU0sRUFBRSxHQUFHLElBQUwsRUFBVyxTQUFTLENBQXBCLEVBQU4sQ0FGUjtBQUFBLGFBR0ksT0FBTyxJQUFJLENBQUosRUFIWDs7QUFLQSxnQkFBTyxnQkFBZ0IsQ0FBdkIsRUFBMEIsVUFBMUI7QUFDQSxnQkFBTyxnQkFBZ0IsQ0FBdkIsRUFBMEIsVUFBMUI7QUFDQSxnQkFBTyxnQkFBZ0IsQ0FBdkIsRUFBMEIsVUFBMUI7O0FBRUEsZ0JBQU8sS0FBSyxDQUFaLEVBQWUsVUFBZjtBQUNBLGdCQUFPLEtBQUssQ0FBWixFQUFlLFVBQWY7QUFDQSxnQkFBTyxLQUFLLENBQVosRUFBZSxVQUFmO0FBQ0gsTUFiRDs7QUFlQSxRQUFHLDZCQUFILEVBQWtDLFlBQU07QUFDcEMsYUFBTSxJQUFJLE1BQU0sRUFBTixFQUFVLEVBQUUsWUFBWSxJQUFkLEVBQVYsQ0FBVjtBQUNBLGdCQUFPLEVBQUUsVUFBVCxFQUFxQixVQUFyQjtBQUNILE1BSEQ7O0FBS0EsUUFBRyxnREFBSCxFQUFxRCxZQUFNO0FBQ3ZELGFBQU0sT0FBTyxJQUFJLEtBQUosQ0FBVSxFQUFFLEdBQUcsSUFBTCxFQUFWLENBQWI7QUFDQSxnQkFBTyxLQUFLLENBQVosRUFBZSxVQUFmO0FBQ0EsZ0JBQU8sZ0JBQWdCLEtBQXZCLEVBQThCLFNBQTlCO0FBQ0gsTUFKRDtBQUtILEVBMUJELEU7Ozs7Ozs7O2tDQ0ZtQixFOztrQkFFSyxLO0FBQVQsVUFBUyxLQUFULENBQWUsU0FBZixFQUEwQixXQUExQixFQUF1QztBQUNsRCxTQUFNLGNBQWMsVUFBVSxXQUFWLEtBQTBCLE1BQTFCLEdBQ1YsVUFBVSxXQURBLEdBRVYsU0FBUyxnQkFBVCxHQUE0QixDQUFFLENBRnhDOztBQUdJO0FBQ0EsY0FBUyxVQUFVLE9BQVYsSUFBcUIsVUFBVSxNQUo1Qzs7QUFLSTtBQUNBLGFBQVEsT0FBTyxNQUFQLENBQWMsU0FBUyxPQUFPLFNBQWhCLEdBQTRCLEVBQTFDLENBTlo7O0FBUUEsWUFBTyxLQUFQLEVBQWMsU0FBZDs7QUFFQSxTQUFJLE9BQU8sV0FBUCxLQUF1QixRQUEzQixFQUFxQztBQUNqQyxnQkFBTyxXQUFQLEVBQW9CLFdBQXBCO0FBQ0g7O0FBRUQ7QUFDQSxXQUFNLFVBQU4sR0FBbUIsU0FBUyxVQUFULEdBQXNCO0FBQ3JDLGdCQUFPLGdCQUFnQixXQUF2QjtBQUNILE1BRkQ7O0FBSUEsaUJBQVksU0FBWixHQUF3QixLQUF4Qjs7QUFFQTtBQUNBLFNBQUksZ0JBQWdCLEtBQXBCLEVBQTJCO0FBQ3ZCLGdCQUFPLElBQUksV0FBSixFQUFQO0FBQ0gsTUFGRCxNQUVPO0FBQ0gsZ0JBQU8sV0FBUDtBQUNIO0FBQ0osRTs7Ozs7Ozs7QUM5QkQ7QUFDQSxXQUFVLCtGQUFWLEVBQTJHLFlBQVc7QUFDbEgsUUFBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQ3pDLGFBQUksTUFBTSxJQUFJLEdBQUcsS0FBUCxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxpQkFBTixDQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQyxXQUFsQyxFQUErQztBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBQS9DOztBQUVBLGFBQUksSUFBSixDQUFTLEVBQVQ7O0FBRUEsZUFBTSxPQUFOLENBQWMsSUFBSSxDQUFKLENBQWQsRUFBc0IsV0FBdEI7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsSUFBbEI7QUFDSCxNQVhEOztBQWFBLFFBQUcsbUNBQUgsRUFBd0MsWUFBTTtBQUMxQyxhQUFJLE1BQU0sSUFBSSxHQUFHLE1BQVAsRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYOztBQUdBLGVBQU0saUJBQU4sQ0FBd0IsR0FBeEIsRUFBNkIsR0FBN0IsRUFBa0MsV0FBbEMsRUFBK0M7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUEvQzs7QUFFQSxhQUFJLElBQUosQ0FBUyxHQUFULEVBQWMsRUFBZDs7QUFFQSxlQUFNLE9BQU4sQ0FBYyxJQUFJLENBQWxCLEVBQXFCLFdBQXJCOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLElBQWxCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLCtCQUFILEVBQW9DLFlBQU07QUFDdEMsYUFBSSxNQUFNLElBQUksR0FBRyxLQUFQLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLGlCQUFOLENBQXdCLEdBQXhCLEVBQTZCLEdBQTdCLEVBQWtDLFdBQWxDLEVBQStDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBL0M7O0FBRUEsYUFBSSxJQUFKLENBQVMsRUFBVDs7QUFFQSxlQUFNLG1CQUFOLENBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLFdBQXBDOztBQUVBLGVBQU0sT0FBTixDQUFjLElBQUksQ0FBSixDQUFkLEVBQXNCLFdBQXRCOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFiRDs7QUFlQSxRQUFHLGdDQUFILEVBQXFDLFlBQU07QUFDdkMsYUFBSSxNQUFNLElBQUksR0FBRyxNQUFQLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLGlCQUFOLENBQXdCLEdBQXhCLEVBQTZCLEdBQTdCLEVBQWtDLFdBQWxDLEVBQStDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBL0M7O0FBRUEsYUFBSSxJQUFKLENBQVMsR0FBVCxFQUFjLEVBQWQ7O0FBRUEsZUFBTSxtQkFBTixDQUEwQixHQUExQixFQUErQixHQUEvQixFQUFvQyxXQUFwQzs7QUFFQSxlQUFNLE9BQU4sQ0FBYyxJQUFJLENBQWxCLEVBQXFCLFdBQXJCOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFiRDs7QUFlQSxRQUFHLDhDQUFILEVBQW1ELFlBQU07QUFDckQsYUFBSSxNQUFNLElBQUksR0FBRyxLQUFQLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDtBQUFBLGFBRUksV0FBVztBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBRmY7O0FBSUEsZUFBTSxpQkFBTixDQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQyxXQUFsQyxFQUErQyxRQUEvQzs7QUFFQSxhQUFJLElBQUosQ0FBUyxFQUFUOztBQUVBLGVBQU0sbUJBQU4sQ0FBMEIsR0FBMUIsRUFBK0IsR0FBL0IsRUFBb0MsV0FBcEMsRUFBaUQsUUFBakQ7O0FBRUEsZUFBTSxPQUFOLENBQWMsSUFBSSxDQUFKLENBQWQsRUFBc0IsV0FBdEI7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDSCxNQWREOztBQWdCQSxRQUFHLCtDQUFILEVBQW9ELFlBQU07QUFDdEQsYUFBSSxNQUFNLElBQUksR0FBRyxNQUFQLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDtBQUFBLGFBRUksV0FBVztBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBRmY7O0FBSUEsZUFBTSxpQkFBTixDQUF3QixHQUF4QixFQUE2QixHQUE3QixFQUFrQyxXQUFsQyxFQUErQyxRQUEvQzs7QUFFQSxhQUFJLElBQUosQ0FBUyxHQUFULEVBQWMsRUFBZDs7QUFFQSxlQUFNLG1CQUFOLENBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLFdBQXBDLEVBQWlELFFBQWpEOztBQUVBLGVBQU0sT0FBTixDQUFjLElBQUksQ0FBbEIsRUFBcUIsV0FBckI7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDSCxNQWREOztBQWdCQSxRQUFHLG1EQUFILEVBQXdELFlBQU07QUFDMUQsYUFBSSxNQUFNLElBQUksR0FBRyxLQUFQLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLGlCQUFOLENBQXdCLEdBQXhCLEVBQTZCLEtBQTdCLEVBQW9DLFdBQXBDLEVBQWlEO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBakQ7O0FBRUEsYUFBSSxJQUFKLENBQVM7QUFDTCxnQkFBRztBQURFLFVBQVQ7O0FBSUEsZUFBTSxPQUFOLENBQWMsSUFBSSxDQUFKLEVBQU8sQ0FBckIsRUFBd0IsV0FBeEI7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsSUFBbEI7QUFDSCxNQWJEOztBQWVBLFFBQUcsb0RBQUgsRUFBeUQsWUFBTTtBQUMzRCxhQUFJLE1BQU0sSUFBSSxHQUFHLE1BQVAsRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYOztBQUdBLGVBQU0saUJBQU4sQ0FBd0IsR0FBeEIsRUFBNkIsS0FBN0IsRUFBb0MsV0FBcEMsRUFBaUQ7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUFqRDs7QUFFQSxhQUFJLElBQUosQ0FBUyxHQUFULEVBQWM7QUFDVixnQkFBRztBQURPLFVBQWQ7O0FBSUEsZUFBTSxPQUFOLENBQWMsSUFBSSxDQUFKLENBQU0sQ0FBcEIsRUFBdUIsV0FBdkI7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsSUFBbEI7QUFDSCxNQWJEOztBQWVBLFFBQUcsbURBQUgsRUFBd0QsWUFBTTtBQUMxRCxhQUFJLE1BQU0sSUFBSSxHQUFHLEtBQVAsRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYOztBQUdBLGVBQU0saUJBQU4sQ0FBd0IsR0FBeEIsRUFBNkIsS0FBN0IsRUFBb0MsV0FBcEMsRUFBaUQ7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUFqRDs7QUFFQSxhQUFJLElBQUosQ0FBUyxJQUFJLEdBQUcsS0FBUCxDQUFhLEVBQWIsQ0FBVDs7QUFFQSxlQUFNLE9BQU4sQ0FBYyxJQUFJLENBQUosRUFBTyxDQUFQLENBQWQsRUFBeUIsV0FBekI7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsSUFBbEI7QUFDSCxNQVhEOztBQWFBLFFBQUcsb0RBQUgsRUFBeUQsWUFBTTtBQUMzRCxhQUFJLE1BQU0sSUFBSSxHQUFHLE1BQVAsRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYOztBQUdBLGVBQU0saUJBQU4sQ0FBd0IsR0FBeEIsRUFBNkIsS0FBN0IsRUFBb0MsV0FBcEMsRUFBaUQ7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUFqRDs7QUFFQSxhQUFJLElBQUosQ0FBUyxHQUFULEVBQWMsSUFBSSxHQUFHLE1BQVAsQ0FBYztBQUN4QixnQkFBRztBQURxQixVQUFkLENBQWQ7O0FBSUEsZUFBTSxPQUFOLENBQWMsSUFBSSxDQUFKLENBQU0sQ0FBcEIsRUFBdUIsV0FBdkI7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsSUFBbEI7QUFDSCxNQWJEOztBQWVBLFFBQUcscURBQUgsRUFBMEQsWUFBTTtBQUM1RCxhQUFJLE1BQU0sSUFBSSxHQUFHLEtBQVAsRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYOztBQUdBLGVBQU0saUJBQU4sQ0FBd0IsR0FBeEIsRUFBNkIsT0FBN0IsRUFBc0MsV0FBdEMsRUFBbUQ7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUFuRDs7QUFFQSxhQUFJLElBQUosQ0FBUyxJQUFJLEdBQUcsS0FBUCxDQUFhO0FBQ2xCLGdCQUFHO0FBRGUsVUFBYixDQUFUOztBQUlBLGVBQU0sT0FBTixDQUFjLElBQUksQ0FBSixFQUFPLENBQVAsRUFBVSxDQUF4QixFQUEyQixXQUEzQjs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BYkQ7O0FBZUEsUUFBRyxzREFBSCxFQUEyRCxZQUFNO0FBQzdELGFBQUksTUFBTSxJQUFJLEdBQUcsTUFBUCxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxpQkFBTixDQUF3QixHQUF4QixFQUE2QixPQUE3QixFQUFzQyxXQUF0QyxFQUFtRDtBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBQW5EOztBQUVBLGFBQUksSUFBSixDQUFTLEdBQVQsRUFBYyxJQUFJLEdBQUcsTUFBUCxDQUFjO0FBQ3hCLGdCQUFHLElBQUksR0FBRyxNQUFQLENBQWM7QUFDYixvQkFBRztBQURVLGNBQWQ7QUFEcUIsVUFBZCxDQUFkOztBQU1BLGVBQU0sT0FBTixDQUFjLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUF0QixFQUF5QixXQUF6Qjs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BZkQ7QUFnQkgsRUFsTEQsRTs7Ozs7Ozs7NENDQTZCLEU7OzhDQUNFLEU7O3NDQUNSLEU7O3NDQUNBLEU7O3FDQUNELEU7O0FBRXRCLFVBQVMsZ0VBQVQsRUFBMkUsU0FBUyxJQUFULEdBQWdCO0FBQUE7O0FBQ3ZGLFNBQUksWUFBSjtBQUNBLFNBQUksZ0JBQUo7O0FBR0EsZ0JBQVcsWUFBTTtBQUNiLGVBQU0sRUFBTjtBQUNBLGVBQUssT0FBTCxHQUFlLFlBQU0sQ0FBRSxDQUF2QjtBQUNBLG1CQUFVLFdBQVY7QUFDSCxNQUpEOztBQU9BLFFBQUcsYUFBSCxFQUFrQixZQUFNO0FBQ3BCLGFBQU0sTUFBTSxXQUFXLEtBQVgsQ0FBWjs7QUFFQSwwQkFBaUIsR0FBakIsRUFBc0IsS0FBdEIsRUFBNkIsV0FBN0IsRUFBMEMsT0FBMUM7QUFDQSxvQkFBVyxJQUFJLENBQUosQ0FBTSxDQUFqQixFQUFvQixXQUFwQjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFORDs7QUFRQSxRQUFHLGVBQUgsRUFBb0IsWUFBTTtBQUN0QixhQUFNLE1BQU0sV0FBVyxPQUFYLENBQVo7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDLE9BQTVDO0FBQ0Esb0JBQVcsSUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQW5CLEVBQXNCLFdBQXRCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQU5EOztBQVFBLFFBQUcseUNBQUgsRUFBOEMsWUFBTTtBQUNoRCxhQUFNLE1BQU0sV0FBVyxLQUFYLENBQVo7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLEtBQXRCLEVBQTZCLFdBQTdCLEVBQTBDLE9BQTFDO0FBQ0EsYUFBSSxDQUFKLEdBQVEsV0FBVyxHQUFYLENBQVI7QUFDQSxvQkFBVyxJQUFJLENBQUosQ0FBTSxDQUFqQixFQUFvQixXQUFwQjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLHlDQUFILEVBQThDLFlBQU07QUFDaEQsYUFBTSxNQUFNLFdBQVcsS0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUE2QixXQUE3QixFQUEwQyxPQUExQztBQUNBLGFBQUksQ0FBSixDQUFNLENBQU4sR0FBVSxFQUFWO0FBQ0Esb0JBQVcsSUFBSSxDQUFKLENBQU0sQ0FBakIsRUFBb0IsV0FBcEI7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLGdCQUFoQjtBQUNILE1BUEQ7O0FBU0EsUUFBRywyQ0FBSCxFQUFnRCxZQUFNO0FBQ2xELGFBQU0sTUFBTSxXQUFXLE9BQVgsQ0FBWjs7QUFFQSwwQkFBaUIsR0FBakIsRUFBc0IsT0FBdEIsRUFBK0IsV0FBL0IsRUFBNEMsT0FBNUM7QUFDQSxhQUFJLENBQUosR0FBUSxXQUFXLEtBQVgsQ0FBUjtBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFuQixFQUFzQixXQUF0QjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLDJDQUFILEVBQWdELFlBQU07QUFDbEQsYUFBTSxNQUFNLFdBQVcsT0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixPQUF0QixFQUErQixXQUEvQixFQUE0QyxPQUE1QztBQUNBLGFBQUksQ0FBSixDQUFNLENBQU4sR0FBVSxXQUFXLEdBQVgsQ0FBVjtBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFuQixFQUFzQixXQUF0QjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLDJDQUFILEVBQWdELFlBQU07QUFDbEQsYUFBTSxNQUFNLFdBQVcsT0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixPQUF0QixFQUErQixXQUEvQixFQUE0QyxPQUE1QztBQUNBLGFBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFSLEdBQVksRUFBWjtBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFuQixFQUFzQixXQUF0QjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLGdFQUFILEVBQXFFLFlBQU07QUFDdkUsYUFBTSxNQUFNLFdBQVcsS0FBWCxDQUFaO0FBQ0EsYUFBTSxJQUFJLElBQUksQ0FBZDs7QUFFQSwwQkFBaUIsR0FBakIsRUFBc0IsS0FBdEIsRUFBNkIsV0FBN0IsRUFBMEMsT0FBMUM7QUFDQSxhQUFJLENBQUosR0FBUSxXQUFXLEdBQVgsQ0FBUjtBQUNBLG9CQUFXLEVBQUUsQ0FBYixFQUFnQixXQUFoQjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFSRDs7QUFVQSxRQUFHLGdFQUFILEVBQXFFLFlBQU07QUFDdkUsYUFBTSxNQUFNLFdBQVcsS0FBWCxDQUFaO0FBQ0EsYUFBTSxJQUFJLElBQUksQ0FBSixDQUFNLENBQWhCOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUE2QixXQUE3QixFQUEwQyxPQUExQztBQUNBLGFBQUksQ0FBSixDQUFNLENBQU4sR0FBVSxFQUFWO0FBQ0Esb0JBQVcsQ0FBWCxFQUFjLFdBQWQ7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNILE1BUkQ7O0FBVUEsUUFBRyxrRUFBSCxFQUF1RSxZQUFNO0FBQ3pFLGFBQU0sTUFBTSxXQUFXLE9BQVgsQ0FBWjtBQUNBLGFBQU0sSUFBSSxJQUFJLENBQWQ7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDLE9BQTVDO0FBQ0EsYUFBSSxDQUFKLEdBQVEsV0FBVyxLQUFYLENBQVI7QUFDQSxvQkFBVyxFQUFFLENBQUYsQ0FBSSxDQUFmLEVBQWtCLFdBQWxCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQVJEOztBQVVBLFFBQUcsa0VBQUgsRUFBdUUsWUFBTTtBQUN6RSxhQUFNLE1BQU0sV0FBVyxPQUFYLENBQVo7QUFDQSxhQUFNLElBQUksSUFBSSxDQUFKLENBQU0sQ0FBaEI7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDLE9BQTVDO0FBQ0EsYUFBSSxDQUFKLENBQU0sQ0FBTixHQUFVLFdBQVcsR0FBWCxDQUFWO0FBQ0Esb0JBQVcsRUFBRSxDQUFiLEVBQWdCLFdBQWhCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQVJEOztBQVVBLFFBQUcsa0VBQUgsRUFBdUUsWUFBTTtBQUN6RSxhQUFNLE1BQU0sV0FBVyxPQUFYLENBQVo7QUFDQSxhQUFNLElBQUksSUFBSSxDQUFKLENBQU0sQ0FBaEI7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDLE9BQTVDO0FBQ0EsYUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQVIsR0FBWSxFQUFaO0FBQ0Esb0JBQVcsQ0FBWCxFQUFjLFdBQWQ7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNILE1BUkQ7O0FBVUEsUUFBRyxrQkFBSCxFQUF1QixZQUFNO0FBQ3pCLGFBQU0sTUFBTSxXQUFXLEtBQVgsQ0FBWjs7QUFFQSwwQkFBaUIsR0FBakIsRUFBc0IsS0FBdEIsRUFBNkIsV0FBN0IsRUFBMEMsT0FBMUM7QUFDQSw0QkFBbUIsR0FBbkIsRUFBd0IsS0FBeEIsRUFBK0IsV0FBL0I7QUFDQSxvQkFBVyxJQUFJLENBQUosQ0FBTSxDQUFqQixFQUFvQixXQUFwQjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLG9CQUFILEVBQXlCLFlBQU07QUFDM0IsYUFBTSxNQUFNLFdBQVcsT0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixPQUF0QixFQUErQixXQUEvQixFQUE0QyxPQUE1QztBQUNBLDRCQUFtQixHQUFuQixFQUF3QixPQUF4QixFQUFpQyxXQUFqQztBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFuQixFQUFzQixXQUF0QjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLHNEQUFILEVBQTJELFlBQU07QUFDN0QsYUFBTSxNQUFNLFdBQVcsT0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixPQUF0QixFQUErQixXQUEvQixFQUE0QyxZQUFNLENBQUUsQ0FBcEQ7QUFDQSwwQkFBaUIsR0FBakIsRUFBc0IsS0FBdEIsRUFBNkIsVUFBN0IsRUFBeUMsT0FBekM7QUFDQSw0QkFBbUIsR0FBbkIsRUFBd0IsT0FBeEIsRUFBaUMsV0FBakM7QUFDQSxhQUFJLENBQUosQ0FBTSxDQUFOLENBQVEsQ0FBUixHQUFZLEVBQVo7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLGdCQUFoQjtBQUNILE1BUkQ7O0FBVUEsUUFBRyw4QkFBSCxFQUFtQyxZQUFNO0FBQ3JDLGFBQU0sTUFBTSxXQUFXLEtBQVgsQ0FBWjs7QUFFQSwwQkFBaUIsR0FBakIsRUFBc0IsS0FBdEIsRUFBNkIsV0FBN0IsRUFBMEMsT0FBMUM7QUFDQSw0QkFBbUIsR0FBbkIsRUFBd0IsS0FBeEIsRUFBK0IsV0FBL0IsRUFBNEMsT0FBNUM7QUFDQSxvQkFBVyxJQUFJLENBQUosQ0FBTSxDQUFqQixFQUFvQixXQUFwQjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLGdDQUFILEVBQXFDLFlBQU07QUFDdkMsYUFBTSxNQUFNLFdBQVcsT0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixPQUF0QixFQUErQixXQUEvQixFQUE0QyxPQUE1QztBQUNBLDRCQUFtQixHQUFuQixFQUF3QixPQUF4QixFQUFpQyxXQUFqQyxFQUE4QyxPQUE5QztBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFuQixFQUFzQixXQUF0QjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFQRDs7QUFVQSxRQUFHLDBDQUFILEVBQStDLFlBQU07QUFDakQsYUFBTSxNQUFNLFdBQVcsS0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUE2QixXQUE3QixFQUEwQyxPQUExQyxFQUFtRCxHQUFuRDtBQUNBLDRCQUFtQixHQUFuQixFQUF3QixLQUF4QixFQUErQixXQUEvQixFQUE0QyxPQUE1QyxFQUFxRCxHQUFyRDtBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQWpCLEVBQW9CLFdBQXBCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQVBEOztBQVNBLFFBQUcsNENBQUgsRUFBaUQsWUFBTTtBQUNuRCxhQUFNLE1BQU0sV0FBVyxPQUFYLENBQVo7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDLE9BQTVDLEVBQXFELEdBQXJEO0FBQ0EsNEJBQW1CLEdBQW5CLEVBQXdCLE9BQXhCLEVBQWlDLFdBQWpDLEVBQThDLE9BQTlDLEVBQXVELEdBQXZEO0FBQ0Esb0JBQVcsSUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQW5CLEVBQXNCLFdBQXRCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQVBEOztBQVNBLFFBQUcsb0VBQUgsRUFBeUUsWUFBTTtBQUMzRSxhQUFNLE1BQU0sV0FBVyxLQUFYLENBQVo7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLEtBQXRCLEVBQTZCLFdBQTdCLEVBQTBDLE9BQTFDO0FBQ0EsNEJBQW1CLEdBQW5CLEVBQXdCLEtBQXhCLEVBQStCLFdBQS9CLEVBQTRDLFlBQU0sQ0FBRSxDQUFwRDtBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQWpCLEVBQW9CLFdBQXBCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQVBEOztBQVNBLFFBQUcsc0VBQUgsRUFBMkUsWUFBTTtBQUM3RSxhQUFNLE1BQU0sV0FBVyxPQUFYLENBQVo7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDLE9BQTVDO0FBQ0EsNEJBQW1CLEdBQW5CLEVBQXdCLE9BQXhCLEVBQWlDLFdBQWpDLEVBQThDLFlBQU0sQ0FBRSxDQUF0RDtBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFuQixFQUFzQixXQUF0QjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLG1FQUFILEVBQXdFLFlBQU07QUFDMUUsYUFBTSxNQUFNLFdBQVcsS0FBWCxDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUE2QixXQUE3QixFQUEwQyxPQUExQyxFQUFtRCxFQUFuRDtBQUNBLDRCQUFtQixHQUFuQixFQUF3QixLQUF4QixFQUErQixXQUEvQixFQUE0QyxPQUE1QyxFQUFxRCxFQUFyRDtBQUNBLG9CQUFXLElBQUksQ0FBSixDQUFNLENBQWpCLEVBQW9CLFdBQXBCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQVBEOztBQVNBLFFBQUcscUVBQUgsRUFBMEUsWUFBTTtBQUM1RSxhQUFNLE1BQU0sV0FBVyxPQUFYLENBQVo7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDLE9BQTVDLEVBQXFELEVBQXJEO0FBQ0EsNEJBQW1CLEdBQW5CLEVBQXdCLE9BQXhCLEVBQWlDLFdBQWpDLEVBQThDLE9BQTlDLEVBQXVELEVBQXZEO0FBQ0Esb0JBQVcsSUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQW5CLEVBQXNCLFdBQXRCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQVBEOztBQVNBLFFBQUcsMkNBQUgsRUFBZ0QsWUFBTTtBQUNsRCxhQUFNLE1BQU0sV0FBVyxPQUFYLENBQVo7QUFDQSxhQUFJLE9BQU8sS0FBWDs7QUFFQSwwQkFBaUIsR0FBakIsRUFBc0IsT0FBdEIsRUFBK0IsV0FBL0IsRUFBNEMsU0FBUyxNQUFULEdBQWtCO0FBQzFELG9CQUFPLFNBQVMsR0FBaEI7QUFDSCxVQUZELEVBRUcsR0FGSDs7QUFJQSxvQkFBVyxJQUFJLENBQUosQ0FBTSxDQUFOLENBQVEsQ0FBbkIsRUFBc0IsV0FBdEI7QUFDQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BVkQ7QUFXSCxFQTNPRCxFLENBUEEseUM7Ozs7Ozs7O3VDQ0N3QixFOzs0Q0FDSyxFOzs4Q0FDRSxFOzswQ0FDSixFOztzQ0FDSixFOztxQ0FDRCxFOztBQU50QjtBQVFBLFVBQVMscUNBQVQsRUFBZ0QsWUFBTTtBQUNsRCxTQUFJLGdCQUFKOztBQUVBLGdCQUFXLFlBQU07QUFDYixtQkFBVSxXQUFWO0FBQ0gsTUFGRDs7QUFJQSxRQUFHLGNBQUgsRUFBbUIsWUFBTTtBQUNyQixhQUFNLE1BQU0sRUFBRSxHQUFHLENBQUwsRUFBWjs7QUFFQSxxQkFBWSxHQUFaLEVBQWlCLFVBQWpCLEVBQTZCLE9BQTdCO0FBQ0EsYUFBSSxDQUFKLEdBQVEsQ0FBUjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFORDs7QUFRQSxRQUFHLHdCQUFILEVBQTZCLFlBQU07QUFDL0IsYUFBTSxNQUFNLFdBQVcsS0FBWCxFQUFrQixDQUFsQixDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixHQUF0QixFQUEyQixVQUEzQixFQUF1QyxPQUF2QztBQUNBLGFBQUksQ0FBSixDQUFNLENBQU4sR0FBVSxDQUFWO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQU5EOztBQVFBLFFBQUcsMEJBQUgsRUFBK0IsWUFBTTtBQUNqQyxhQUFNLE1BQU0sV0FBVyxPQUFYLEVBQW9CLENBQXBCLENBQVo7O0FBRUEsMEJBQWlCLEdBQWpCLEVBQXNCLEtBQXRCLEVBQTZCLFVBQTdCLEVBQXlDLE9BQXpDO0FBQ0EsYUFBSSxDQUFKLENBQU0sQ0FBTixDQUFRLENBQVIsR0FBWSxDQUFaO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQU5EOztBQVFBLFFBQUcsZ0JBQUgsRUFBcUIsWUFBTTtBQUN2QixhQUFNLE1BQU0sRUFBRSxHQUFHLENBQUwsRUFBWjs7QUFFQSxxQkFBWSxHQUFaLEVBQWlCLFVBQWpCLEVBQTZCLE9BQTdCO0FBQ0Esd0JBQWUsR0FBZixFQUFvQixVQUFwQixFQUFnQyxPQUFoQztBQUNBLGFBQUksQ0FBSixHQUFRLENBQVI7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNILE1BUEQ7O0FBU0EsUUFBRywwQkFBSCxFQUErQixZQUFNO0FBQ2pDLGFBQU0sTUFBTSxXQUFXLEtBQVgsRUFBa0IsQ0FBbEIsQ0FBWjs7QUFFQSwwQkFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsVUFBM0IsRUFBdUMsT0FBdkM7QUFDQSw0QkFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkIsVUFBN0IsRUFBeUMsT0FBekM7QUFDQSxhQUFJLENBQUosQ0FBTSxDQUFOLEdBQVUsQ0FBVjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFQRDs7QUFTQSxRQUFHLDRCQUFILEVBQWlDLFlBQU07QUFDbkMsYUFBTSxNQUFNLFdBQVcsT0FBWCxFQUFvQixDQUFwQixDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUE2QixVQUE3QixFQUF5QyxPQUF6QztBQUNBLDRCQUFtQixHQUFuQixFQUF3QixLQUF4QixFQUErQixVQUEvQixFQUEyQyxPQUEzQztBQUNBLGFBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFSLEdBQVksQ0FBWjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFQRDs7QUFVQSxRQUFHLDBCQUFILEVBQStCLFlBQU07QUFDakMsYUFBTSxNQUFNLFdBQVcsT0FBWCxFQUFvQixDQUFwQixDQUFaOztBQUVBLDBCQUFpQixHQUFqQixFQUFzQixLQUF0QixFQUE2QixVQUE3QixFQUF5QyxPQUF6QztBQUNBLGFBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUFSLEdBQVksQ0FBWjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFORDs7QUFRQSxRQUFHLHlDQUFILEVBQThDLFlBQU07QUFDaEQsYUFBTSxNQUFNLFdBQVcsU0FBWCxFQUFzQixDQUF0QixDQUFaO0FBQ0EsMEJBQWlCLEdBQWpCLEVBQXNCLE9BQXRCLEVBQStCLFdBQS9CLEVBQTRDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBNUM7O0FBRUEsZ0JBQU8sWUFBTTtBQUNULGlCQUFJLENBQUosQ0FBTSxDQUFOLEdBQVUsSUFBVjtBQUNILFVBRkQsRUFFRyxHQUZILENBRU8sT0FGUDtBQUdILE1BUEQ7QUFRSCxFQTNFRCxFOzs7Ozs7Ozt1Q0NQd0IsRTs7MENBQ0csRTs7c0NBQ0osRTs7cUNBQ0QsRTs7QUFKdEI7QUFNQSxVQUFTLHNEQUFULEVBQWlFLFlBQU07QUFDbkUsU0FBSSxZQUFKO0FBQ0EsU0FBSSxZQUFKO0FBQ0EsU0FBSSxnQkFBSjs7QUFFQSxnQkFBVyxZQUFNO0FBQ2IsZUFBTSxFQUFOO0FBQ0EsZUFBTSxFQUFOO0FBQ0EsbUJBQVUsV0FBVjtBQUNILE1BSkQ7O0FBTUEsUUFBRyxPQUFILEVBQVksWUFBTTtBQUNkLHFCQUFZLEdBQVosRUFBaUIsV0FBakIsRUFBOEIsT0FBOUI7QUFDQSxvQkFBVyxHQUFYLEVBQWdCLFdBQWhCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQUpEOztBQU1BLFFBQUcsa0JBQUgsRUFBdUIsWUFBTTtBQUN6QixhQUFJLElBQUksQ0FBUjtBQUNBLHFCQUFZLEdBQVosRUFBaUIsV0FBakIsRUFBOEI7QUFBQSxvQkFBTyxLQUFLLEdBQVo7QUFBQSxVQUE5QjtBQUNBLHFCQUFZLEdBQVosRUFBaUIsV0FBakIsRUFBOEI7QUFBQSxvQkFBTyxLQUFLLEdBQVo7QUFBQSxVQUE5QjtBQUNBLHFCQUFZLEdBQVosRUFBaUIsV0FBakIsRUFBOEI7QUFBQSxvQkFBTyxLQUFLLEdBQVo7QUFBQSxVQUE5QjtBQUNBLG9CQUFXLEdBQVgsRUFBZ0IsV0FBaEI7O0FBRUEsZ0JBQU8sQ0FBUCxFQUFVLE9BQVYsQ0FBa0IsR0FBbEI7QUFDSCxNQVJEOztBQVVBLFFBQUcsbUJBQUgsRUFBd0IsWUFBTTtBQUMxQixxQkFBWSxHQUFaLEVBQWlCLFdBQWpCLEVBQThCLE9BQTlCO0FBQ0Esd0JBQWUsR0FBZjtBQUNBLG9CQUFXLEdBQVgsRUFBZ0IsV0FBaEI7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNILE1BTEQ7O0FBT0EsUUFBRyxpQkFBSCxFQUFzQixZQUFNO0FBQ3hCLHFCQUFZLEdBQVosRUFBaUIsV0FBakIsRUFBOEIsT0FBOUI7QUFDQSx3QkFBZSxHQUFmLEVBQW9CLFdBQXBCO0FBQ0Esb0JBQVcsR0FBWCxFQUFnQixXQUFoQjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsR0FBaEIsQ0FBb0IsZ0JBQXBCO0FBQ0gsTUFMRDs7QUFPQSxRQUFHLHFCQUFILEVBQTBCLFlBQU07QUFDNUIscUJBQVksR0FBWixFQUFpQixXQUFqQixFQUE4QixPQUE5QjtBQUNBLHdCQUFlLEdBQWYsRUFBb0IsV0FBcEIsRUFBaUMsT0FBakM7QUFDQSxvQkFBVyxHQUFYLEVBQWdCLFdBQWhCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixHQUFoQixDQUFvQixnQkFBcEI7QUFDSCxNQUxEOztBQU9BLFFBQUcsMkRBQUgsRUFBZ0UsWUFBTTtBQUNsRSxxQkFBWSxHQUFaLEVBQWlCLFdBQWpCLEVBQThCLE9BQTlCO0FBQ0Esd0JBQWUsR0FBZixFQUFvQixXQUFwQixFQUFpQyxZQUFNLENBQUUsQ0FBekM7QUFDQSxvQkFBVyxHQUFYLEVBQWdCLFdBQWhCO0FBQ0EsZ0JBQU8sT0FBUCxFQUFnQixnQkFBaEI7QUFDSCxNQUxEOztBQU9BLFFBQUcsaUNBQUgsRUFBc0MsWUFBTTtBQUN4QyxxQkFBWSxHQUFaLEVBQWlCLFdBQWpCLEVBQThCLE9BQTlCLEVBQXVDLEdBQXZDO0FBQ0Esd0JBQWUsR0FBZixFQUFvQixXQUFwQixFQUFpQyxPQUFqQyxFQUEwQyxHQUExQztBQUNBLG9CQUFXLEdBQVgsRUFBZ0IsV0FBaEI7QUFDQSxnQkFBTyxPQUFQLEVBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNILE1BTEQ7O0FBT0EsUUFBRywwREFBSCxFQUErRCxZQUFNO0FBQ2pFLHFCQUFZLEdBQVosRUFBaUIsV0FBakIsRUFBOEIsT0FBOUIsRUFBdUMsR0FBdkM7QUFDQSx3QkFBZSxHQUFmLEVBQW9CLFdBQXBCLEVBQWlDLE9BQWpDLEVBQTBDLEVBQTFDO0FBQ0Esb0JBQVcsR0FBWCxFQUFnQixXQUFoQjtBQUNBLGdCQUFPLE9BQVAsRUFBZ0IsZ0JBQWhCO0FBQ0gsTUFMRDtBQU1ILEVBcEVELEU7Ozs7Ozs7O0FDTkE7O0FBRUEsV0FBVSxrREFBVixFQUE4RCxZQUFNO0FBQ2hFLFNBQUksSUFBSSxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFDZCxhQUFJLFNBQVMsRUFBRSxDQUFGLEVBQUssQ0FBTCxFQUFRLENBQVIsS0FBYyxJQUEzQjtBQUNBLGFBQUksTUFBSixFQUFZO0FBQ1Isb0JBQU8sS0FBUCxHQUFlLE9BQU8sS0FBUCxJQUFpQixZQUFNO0FBQ2xDLHFCQUFJLEtBQUssU0FBUyxXQUFULENBQXFCLFlBQXJCLENBQVQ7QUFDQSxvQkFBRyxjQUFILENBQ0ksT0FESixFQUVJLElBRkosQ0FFUyxZQUZULEVBRXdCLElBRnhCLENBRTZCO0FBRjdCLG1CQUdJLE1BSEosRUFHWSxJQUhaLEVBSUksQ0FKSixFQUlPLENBSlAsRUFJVSxDQUpWLEVBSWEsQ0FKYixFQUlnQjtBQUNaLHNCQUxKLEVBS1csS0FMWCxFQUtrQixLQUxsQixFQUt5QixLQUx6QixFQUtnQztBQUM1QixrQkFOSixDQU1NLFFBTk4sRUFNaUIsSUFOakI7QUFRQSx3QkFBTyxhQUFQLENBQXFCLEVBQXJCO0FBQ0gsY0FYRDtBQVlIO0FBQ0QsZ0JBQU8sTUFBUDtBQUNILE1BakJEOztBQW1CQSxjQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEVBQUUsTUFBRixDQUFTO0FBQy9CLGtCQUFTLEtBRHNCO0FBRS9CLGFBQUksUUFGMkI7QUFHL0I7QUFIK0IsTUFBVCxDQUExQjs7QUFjQSxRQUFHLHFCQUFILEVBQTBCLFlBQU07QUFDNUIsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLFNBQXpCO0FBQ0EsZUFBTSxlQUFOLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLE9BQWhDLEVBQXlDLElBQXpDLEVBQStDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBL0M7O0FBR0EsV0FBRSxTQUFGLEVBQWEsS0FBYjs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BWEQ7O0FBYUEsUUFBRyx1QkFBSCxFQUE0QixZQUFNO0FBQzlCLGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxlQUFOLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLE9BQWhDLEVBQXlDLElBQXpDLEVBQStDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBL0M7QUFDQSxlQUFNLGtCQUFOLENBQXlCLEdBQXpCLEVBQThCLEdBQTlCLEVBQW1DLE9BQW5DO0FBQ0EsZUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixTQUF6Qjs7QUFFQSxXQUFFLFNBQUYsRUFBYSxLQUFiOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLHNCQUFILEVBQTJCLFlBQU07QUFDN0IsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLFNBQXpCO0FBQ0EsZUFBTSxlQUFOLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLE9BQWhDLEVBQXlDLFdBQXpDLEVBQXNEO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBdEQ7O0FBRUEsV0FBRSxXQUFGLEVBQWUsS0FBZjs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BVkQ7O0FBY0EsUUFBRywrQ0FBSCxFQUFvRCxZQUFNO0FBQ3RELGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixTQUF6QjtBQUNBLGVBQU0sZUFBTixDQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxPQUFoQyxFQUF5QyxXQUF6QyxFQUFzRDtBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBQXREO0FBQ0EsZUFBTSxrQkFBTixDQUF5QixHQUF6QixFQUE4QixHQUE5QixFQUFtQyxPQUFuQzs7QUFFQSxXQUFFLFdBQUYsRUFBZSxLQUFmOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLDJEQUFILEVBQWdFLFlBQU07QUFDbEUsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFJQSxlQUFNLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLFNBQXpCO0FBQ0EsZUFBTSxlQUFOLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLE9BQWhDLEVBQXlDLFdBQXpDLEVBQXNEO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBdEQ7QUFDQSxlQUFNLGtCQUFOLENBQXlCLEdBQXpCLEVBQThCLEdBQTlCLEVBQW1DLE9BQW5DOztBQUVBLFdBQUUsV0FBRixFQUFlLEtBQWY7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsS0FBbEI7QUFDSCxNQVpEOztBQWNBLFFBQUcsb0JBQUgsRUFBeUIsWUFBTTtBQUMzQixhQUFJLE1BQU0sRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYOztBQUlBLGVBQU0sUUFBTixDQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsU0FBekI7QUFDQSxlQUFNLGVBQU4sQ0FBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsT0FBaEMsRUFBeUMsSUFBekMsRUFBK0MsVUFBQyxFQUFELEVBQUssRUFBTDtBQUFBLG9CQUFZLE9BQU8sT0FBTyxDQUFQLElBQVksT0FBTyxDQUF0QztBQUFBLFVBQS9DO0FBQ0EsZUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixVQUFuQixFQUErQixDQUEvQixFQUFrQyxDQUFsQzs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BVkQ7O0FBWUEsUUFBRyw0Q0FBSCxFQUFpRCxZQUFNO0FBQ25ELGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBSUEsZUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixTQUF6QjtBQUNBLGVBQU0sZUFBTixDQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxPQUFoQyxFQUF5QyxXQUF6QyxFQUFzRCxVQUFDLEVBQUQsRUFBSyxFQUFMO0FBQUEsb0JBQVksT0FBTyxPQUFPLENBQVAsSUFBWSxPQUFPLENBQXRDO0FBQUEsVUFBdEQ7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLHFCQUFuQixFQUEwQyxDQUExQyxFQUE2QyxDQUE3Qzs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BVkQ7O0FBWUEsUUFBRyw0REFBSCxFQUFpRSxZQUFNO0FBQ25FLGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBSUEsZUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixTQUF6QjtBQUNBLGVBQU0sZUFBTixDQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxPQUFoQyxFQUF5QyxJQUF6QyxFQUErQyxVQUFDLEVBQUQsRUFBSyxFQUFMO0FBQUEsb0JBQVksT0FBTyxPQUFPLENBQVAsSUFBWSxPQUFPLENBQXRDO0FBQUEsVUFBL0M7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLHFCQUFuQixFQUEwQyxDQUExQyxFQUE2QyxDQUE3Qzs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BVkQ7O0FBYUEsUUFBRyxtQkFBSCxFQUF3QixZQUFNO0FBQzFCLGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixTQUF6QjtBQUNBLGVBQU0sZUFBTixDQUFzQixHQUF0QixFQUEyQixHQUEzQixFQUFnQyxPQUFoQyxFQUF5QyxXQUF6QyxFQUFzRDtBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBQXREO0FBQ0EsZUFBTSxrQkFBTixDQUF5QixHQUF6QixFQUE4QixHQUE5QixFQUFtQyxPQUFuQyxFQUE0QyxXQUE1Qzs7QUFFQSxXQUFFLFdBQUYsRUFBZSxLQUFmOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLCtEQUFILEVBQW9FLFlBQU07QUFDdEUsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLFNBQXpCO0FBQ0EsZUFBTSxlQUFOLENBQXNCLEdBQXRCLEVBQTJCLEdBQTNCLEVBQWdDLE9BQWhDLEVBQXlDLFdBQXpDLEVBQXNEO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBdEQ7QUFDQSxlQUFNLGtCQUFOLENBQXlCLEdBQXpCLEVBQThCLEdBQTlCLEVBQW1DLE9BQW5DLEVBQTRDLE9BQTVDOztBQUVBLFdBQUUsV0FBRixFQUFlLEtBQWY7O0FBRUEsZ0JBQU8sSUFBUCxFQUFhLElBQWIsQ0FBa0IsSUFBbEI7QUFDSCxNQVhEOztBQWNBLFFBQUcscUNBQUgsRUFBMEMsWUFBTTtBQUM1QyxhQUFJLE1BQU0sRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYOztBQUdBLGVBQU0sUUFBTixDQUFlLEdBQWYsRUFBb0IsR0FBcEIsRUFBeUIsU0FBekI7QUFDQSxlQUFNLGVBQU4sQ0FBc0IsR0FBdEIsRUFBMkIsR0FBM0IsRUFBZ0MsT0FBaEMsRUFBeUMsSUFBekMsRUFBK0M7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUEvQzs7QUFFQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLFVBQW5COztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLElBQWxCO0FBQ0gsTUFWRDtBQVlILEVBakxELEU7Ozs7Ozs7O0FDRkE7QUFDQSxXQUFVLDBCQUFWLEVBQXNDLFlBQU07QUFDeEMsU0FBSSxJQUFJLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBVTtBQUNkLGFBQUksU0FBUyxFQUFFLENBQUYsRUFBSyxDQUFMLEVBQVEsQ0FBUixLQUFjLElBQTNCO0FBQ0EsYUFBSSxNQUFKLEVBQVk7QUFDUixvQkFBTyxLQUFQLEdBQWUsT0FBTyxLQUFQLElBQWlCLFlBQU07QUFDbEMscUJBQUksS0FBSyxTQUFTLFdBQVQsQ0FBcUIsWUFBckIsQ0FBVDtBQUNBLG9CQUFHLGNBQUgsQ0FDSSxPQURKLEVBRUksSUFGSixDQUVTLFlBRlQsRUFFd0IsSUFGeEIsQ0FFNkI7QUFGN0IsbUJBR0ksTUFISixFQUdZLElBSFosRUFJSSxDQUpKLEVBSU8sQ0FKUCxFQUlVLENBSlYsRUFJYSxDQUpiLEVBSWdCO0FBQ1osc0JBTEosRUFLVyxLQUxYLEVBS2tCLEtBTGxCLEVBS3lCLEtBTHpCLEVBS2dDO0FBQzVCLGtCQU5KLENBTU0sUUFOTixFQU1pQixJQU5qQjtBQVFBLHdCQUFPLGFBQVAsQ0FBcUIsRUFBckI7QUFDSCxjQVhEO0FBWUg7QUFDRCxnQkFBTyxNQUFQO0FBQ0gsTUFqQkQ7O0FBbUJBLFNBQUksT0FBTyxTQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEVBQUUsTUFBRixDQUFTO0FBQzFDLGtCQUFTLEtBRGlDO0FBRTFDLGFBQUksUUFGc0M7QUFHMUM7QUFIMEMsTUFBVCxDQUExQixDQUFYOztBQVlBLFVBQUssS0FBTCxHQUFhLEtBQUssS0FBTCxJQUFjLFlBQVc7QUFDbEMsY0FBSyxhQUFMLENBQW1CLElBQUksVUFBSixDQUFlLE9BQWYsQ0FBbkI7QUFDSCxNQUZEOztBQUlBLFFBQUcsT0FBSCxFQUFZLFlBQU07QUFDZCxhQUFJLE1BQU0sRUFBVjtBQUFBLGFBQ0ksT0FBTyxLQURYO0FBRUEsZUFBTSxFQUFOLENBQVMsR0FBVCxFQUFjLFdBQWQsRUFBMkI7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUEzQjtBQUNBLGVBQU0sT0FBTixDQUFjLEdBQWQsRUFBbUIsV0FBbkI7QUFDQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BTkQ7O0FBU0EsUUFBRyw2QkFBSCxFQUFrQyxZQUFNO0FBQ3BDLGFBQUksS0FBSyxJQUFJLEVBQUosRUFBVDtBQUFBLGFBQ0ksT0FBTyxLQURYO0FBRUEsWUFBRyxFQUFILENBQU0sV0FBTixFQUFtQjtBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBQW5CO0FBQ0EsWUFBRyxPQUFILENBQVcsV0FBWDtBQUNBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLElBQWxCO0FBQ0gsTUFORDs7QUFRQSxRQUFHLFNBQUgsRUFBYyxZQUFNO0FBQ2hCLGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7QUFBQSxhQUVJLElBQUk7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUZSOztBQUlBLGVBQU0sRUFBTixDQUFTLEdBQVQsRUFBYyxXQUFkLEVBQTJCLENBQTNCO0FBQ0EsZUFBTSxHQUFOLENBQVUsR0FBVixFQUFlLFdBQWY7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLFdBQW5COztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFWRDs7QUFZQSxRQUFHLCtCQUFILEVBQW9DLFlBQU07QUFDdEMsYUFBSSxLQUFLLElBQUksRUFBSixFQUFUO0FBQUEsYUFDSSxPQUFPLEtBRFg7QUFBQSxhQUVJLElBQUk7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUZSOztBQUlBLFlBQUcsRUFBSCxDQUFNLFdBQU4sRUFBbUIsQ0FBbkI7QUFDQSxZQUFHLEdBQUgsQ0FBTyxXQUFQO0FBQ0EsWUFBRyxPQUFILENBQVcsV0FBWDs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixLQUFsQjtBQUNILE1BVkQ7O0FBWUEsUUFBRyxpQkFBSCxFQUFzQixZQUFNO0FBQ3hCLGFBQUksTUFBTTtBQUNGLGdCQUFHO0FBQ0Msb0JBQUc7QUFDQyx3QkFBRztBQURKO0FBREo7QUFERCxVQUFWO0FBQUEsYUFPSSxPQUFPLEtBUFg7O0FBU0EsZUFBTSxFQUFOLENBQVMsR0FBVCxFQUFjLGlCQUFkLEVBQWlDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBakM7QUFDQSxlQUFNLE9BQU4sQ0FBYyxJQUFJLENBQUosQ0FBTSxDQUFOLENBQVEsQ0FBdEIsRUFBeUIsV0FBekI7QUFDQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BYkQ7O0FBaUJBLFFBQUcsbUJBQUgsRUFBd0IsWUFBTTtBQUMxQixhQUFJLE1BQU07QUFDRixnQkFBRztBQUNDLG9CQUFHO0FBQ0Msd0JBQUc7QUFESjtBQURKO0FBREQsVUFBVjtBQUFBLGFBT0ksT0FBTyxLQVBYOztBQVNBLGVBQU0sRUFBTixDQUFTLEdBQVQsRUFBYyxpQkFBZCxFQUFpQztBQUFBLG9CQUFPLE9BQU8sSUFBZDtBQUFBLFVBQWpDO0FBQ0EsZUFBTSxHQUFOLENBQVUsR0FBVixFQUFlLGlCQUFmOztBQUVBLGVBQU0sT0FBTixDQUFjLElBQUksQ0FBSixDQUFNLENBQU4sQ0FBUSxDQUF0QixFQUF5QixXQUF6QjtBQUNBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFmRDs7QUFpQkEsUUFBRyxxQkFBSCxFQUEwQixZQUFNO0FBQzVCLGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixTQUF6QjtBQUNBLGVBQU0sRUFBTixDQUFTLEdBQVQsRUFBYyxVQUFkLEVBQTBCO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBMUI7O0FBR0EsV0FBRSxTQUFGLEVBQWEsS0FBYjs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BWEQ7O0FBYUEsUUFBRyx1QkFBSCxFQUE0QixZQUFNO0FBQzlCLGFBQUksTUFBTSxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxRQUFOLENBQWUsR0FBZixFQUFvQixHQUFwQixFQUF5QixTQUF6QjtBQUNBLGVBQU0sRUFBTixDQUFTLEdBQVQsRUFBYyxVQUFkLEVBQTBCO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBMUI7QUFDQSxlQUFNLEdBQU4sQ0FBVSxHQUFWLEVBQWUsVUFBZjs7QUFFQSxXQUFFLFNBQUYsRUFBYSxLQUFiOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLHNCQUFILEVBQTJCLFlBQU07QUFDN0IsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLFNBQXpCO0FBQ0EsZUFBTSxFQUFOLENBQVMsR0FBVCxFQUFjLHFCQUFkLEVBQXFDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBckM7O0FBRUEsV0FBRSxXQUFGLEVBQWUsS0FBZjs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BVkQ7O0FBWUEsUUFBRyxrQ0FBSCxFQUF1QyxZQUFNO0FBQ3pDLGFBQUksTUFBTSxJQUFJLEdBQUcsS0FBUCxFQUFWO0FBQUEsYUFDSSxPQUFPLEtBRFg7O0FBR0EsZUFBTSxFQUFOLENBQVMsR0FBVCxFQUFjLFlBQWQsRUFBNEI7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUE1Qjs7QUFFQSxhQUFJLElBQUosQ0FBUyxFQUFUOztBQUVBLGVBQU0sT0FBTixDQUFjLElBQUksQ0FBSixDQUFkLEVBQXNCLFdBQXRCOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLElBQWxCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLHFCQUFILEVBQTBCLFlBQU07QUFDNUIsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLFNBQXpCO0FBQ0EsZUFBTSxFQUFOLENBQVMsR0FBVCxFQUFjLFVBQWQsRUFBMEI7QUFBQSxvQkFBTyxPQUFPLElBQWQ7QUFBQSxVQUExQjs7QUFHQSxXQUFFLFNBQUYsRUFBYSxLQUFiOztBQUVBLGdCQUFPLElBQVAsRUFBYSxJQUFiLENBQWtCLElBQWxCO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLHNCQUFILEVBQTJCLFlBQU07QUFDN0IsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDs7QUFHQSxlQUFNLFFBQU4sQ0FBZSxHQUFmLEVBQW9CLEdBQXBCLEVBQXlCLFNBQXpCO0FBQ0EsZUFBTSxFQUFOLENBQVMsR0FBVCxFQUFjLHFCQUFkLEVBQXFDO0FBQUEsb0JBQU8sT0FBTyxJQUFkO0FBQUEsVUFBckM7O0FBRUEsV0FBRSxXQUFGLEVBQWUsS0FBZjs7QUFFQSxnQkFBTyxJQUFQLEVBQWEsSUFBYixDQUFrQixJQUFsQjtBQUNILE1BVkQ7O0FBWUEsUUFBRyxlQUFILEVBQW9CLFlBQU07QUFDdEIsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLElBQUksQ0FEUjtBQUFBLGFBRUksSUFBSTtBQUFBLG9CQUFPLEdBQVA7QUFBQSxVQUZSOztBQUlBLGVBQU0sSUFBTixDQUFXLEdBQVgsRUFBZ0IsV0FBaEIsRUFBNkIsQ0FBN0I7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLFdBQW5CO0FBQ0EsZUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixXQUFuQjtBQUNBLGVBQU0sT0FBTixDQUFjLEdBQWQsRUFBbUIsV0FBbkI7O0FBRUEsZ0JBQU8sQ0FBUCxFQUFVLElBQVYsQ0FBZSxDQUFmO0FBQ0gsTUFYRDs7QUFhQSxRQUFHLDhDQUFILEVBQW1ELFlBQU07QUFDckQsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLElBQUksQ0FEUjtBQUFBLGFBRUksSUFBSSxDQUZSO0FBQUEsYUFHSSxLQUFLO0FBQUEsb0JBQU8sR0FBUDtBQUFBLFVBSFQ7QUFBQSxhQUlJLEtBQUs7QUFBQSxvQkFBTyxHQUFQO0FBQUEsVUFKVDs7QUFNQSxlQUFNLElBQU4sQ0FBVyxHQUFYLEVBQWdCO0FBQ1osa0JBQUssRUFETztBQUVaLGtCQUFLO0FBRk8sVUFBaEI7O0FBS0EsZUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixLQUFuQjtBQUNBLGVBQU0sT0FBTixDQUFjLEdBQWQsRUFBbUIsS0FBbkI7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLEtBQW5COztBQUVBLGVBQU0sT0FBTixDQUFjLEdBQWQsRUFBbUIsS0FBbkI7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLEtBQW5CO0FBQ0EsZUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixLQUFuQjs7QUFFQSxnQkFBTyxDQUFQLEVBQVUsSUFBVixDQUFlLENBQWY7QUFDQSxnQkFBTyxDQUFQLEVBQVUsSUFBVixDQUFlLENBQWY7QUFDSCxNQXRCRDs7QUF3QkEsUUFBRyxxQ0FBSCxFQUEwQyxZQUFNO0FBQzVDLGFBQUksS0FBSyxJQUFJLEVBQUosRUFBVDtBQUFBLGFBQ0ksSUFBSSxDQURSO0FBQUEsYUFFSSxJQUFJO0FBQUEsb0JBQU8sR0FBUDtBQUFBLFVBRlI7O0FBSUEsWUFBRyxJQUFILENBQVEsV0FBUixFQUFxQixDQUFyQjtBQUNBLFlBQUcsT0FBSCxDQUFXLFdBQVg7QUFDQSxZQUFHLE9BQUgsQ0FBVyxXQUFYO0FBQ0EsWUFBRyxPQUFILENBQVcsV0FBWDs7QUFFQSxnQkFBTyxDQUFQLEVBQVUsSUFBVixDQUFlLENBQWY7QUFDSCxNQVhEOztBQWNBLFFBQUcsa0JBQUgsRUFBdUIsZ0JBQVE7QUFDM0IsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLElBQUksQ0FEUjtBQUFBLGFBRUksSUFBSTtBQUFBLG9CQUFPLEdBQVA7QUFBQSxVQUZSOztBQUlBLG9CQUFXLFlBQU07QUFDYixvQkFBTyxDQUFQLEVBQVUsSUFBVixDQUFlLENBQWY7QUFDQTtBQUNILFVBSEQsRUFHRyxHQUhIOztBQUtBLGVBQU0sVUFBTixDQUFpQixHQUFqQixFQUFzQixXQUF0QixFQUFtQyxDQUFuQztBQUNBLGVBQU0sT0FBTixDQUFjLEdBQWQsRUFBbUIsV0FBbkI7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLFdBQW5CO0FBQ0EsZUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixXQUFuQjtBQUNILE1BZEQ7O0FBZ0JBLFFBQUcsb0RBQUgsRUFBeUQsVUFBQyxJQUFELEVBQVU7QUFDL0QsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLElBQUksQ0FEUjtBQUFBLGFBRUksSUFBSSxDQUZSO0FBQUEsYUFHSSxLQUFLO0FBQUEsb0JBQU8sR0FBUDtBQUFBLFVBSFQ7QUFBQSxhQUlJLEtBQUs7QUFBQSxvQkFBTyxHQUFQO0FBQUEsVUFKVDs7QUFNQSxvQkFBVyxZQUFNO0FBQ2Isb0JBQU8sQ0FBUCxFQUFVLElBQVYsQ0FBZSxDQUFmO0FBQ0Esb0JBQU8sQ0FBUCxFQUFVLElBQVYsQ0FBZSxDQUFmO0FBQ0E7QUFDSCxVQUpELEVBSUcsR0FKSDs7QUFNQSxlQUFNLFVBQU4sQ0FBaUIsR0FBakIsRUFBc0I7QUFDbEIsa0JBQUssRUFEYTtBQUVsQixrQkFBSztBQUZhLFVBQXRCOztBQUtBLGVBQU0sT0FBTixDQUFjLEdBQWQsRUFBbUIsS0FBbkI7QUFDQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLEtBQW5CO0FBQ0EsZUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixLQUFuQjs7QUFFQSxlQUFNLE9BQU4sQ0FBYyxHQUFkLEVBQW1CLEtBQW5CO0FBQ0EsZUFBTSxPQUFOLENBQWMsR0FBZCxFQUFtQixLQUFuQjtBQUNBLGVBQU0sT0FBTixDQUFjLEdBQWQsRUFBbUIsS0FBbkI7QUFDSCxNQXpCRDs7QUEyQkEsUUFBRyx3Q0FBSCxFQUE2QyxnQkFBUTtBQUNqRCxhQUFJLEtBQUssSUFBSSxFQUFKLEVBQVQ7QUFBQSxhQUNJLElBQUksQ0FEUjtBQUFBLGFBRUksSUFBSTtBQUFBLG9CQUFPLEdBQVA7QUFBQSxVQUZSOztBQUlBLG9CQUFXLFlBQU07QUFDYixvQkFBTyxDQUFQLEVBQVUsSUFBVixDQUFlLENBQWY7QUFDQTtBQUNILFVBSEQsRUFHRyxHQUhIOztBQUtBLFlBQUcsVUFBSCxDQUFjLFdBQWQsRUFBMkIsQ0FBM0I7QUFDQSxZQUFHLE9BQUgsQ0FBVyxXQUFYO0FBQ0EsWUFBRyxPQUFILENBQVcsV0FBWDtBQUNBLFlBQUcsT0FBSCxDQUFXLFdBQVg7QUFDSCxNQWREOztBQWlCQSxRQUFHLHNEQUFILEVBQTJELFlBQU07QUFDN0QsYUFBSSxNQUFNLEVBQVY7QUFBQSxhQUNJLE9BQU8sS0FEWDtBQUFBLGFBRUksSUFBSSxDQUZSO0FBQUEsYUFHSSxXQUFXO0FBQ1Asa0JBQUs7QUFBQSx3QkFBTSxHQUFOO0FBQUEsY0FERTtBQUVQLGtCQUFLO0FBQUEsd0JBQU0sR0FBTjtBQUFBO0FBRkUsVUFIZjs7QUFRQSxZQUFHLEVBQUgsQ0FBTSxHQUFOLEVBQVcsUUFBWDs7QUFFQSxZQUFHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLEtBQWhCO0FBQ0EsWUFBRyxPQUFILENBQVcsR0FBWCxFQUFnQixLQUFoQjs7QUFFQSxnQkFBTyxDQUFQLEVBQVUsSUFBVixDQUFlLENBQWY7O0FBRUEsWUFBRyxHQUFILENBQU8sR0FBUCxFQUFZLFFBQVo7O0FBRUEsZ0JBQU8sQ0FBUCxFQUFVLElBQVYsQ0FBZSxDQUFmO0FBQ0gsTUFuQkQ7O0FBc0JBLFFBQUcsK0NBQUgsRUFBb0QsWUFBTTtBQUN0RCxhQUFJLE1BQU0sRUFBVjtBQUFBLGFBQ0ksVUFBVSxFQURkO0FBQUEsYUFFSSxPQUFPLEtBRlg7QUFBQSxhQUdJLElBQUksQ0FIUjs7QUFLQSxZQUFHLEVBQUgsQ0FBTSxHQUFOLEVBQVcsS0FBWCxFQUFrQixZQUFXO0FBQ3pCLG9CQUFPLElBQVAsRUFBYSxPQUFiLENBQXFCLE9BQXJCO0FBQ0E7QUFDSCxVQUhELEVBR0csSUFISCxFQUdTLE9BSFQ7O0FBS0EsWUFBRyxFQUFILENBQU0sR0FBTixFQUFXLEtBQVgsRUFBa0IsWUFBVztBQUN6QixvQkFBTyxJQUFQLEVBQWEsT0FBYixDQUFxQixPQUFyQjtBQUNBO0FBQ0gsVUFIRCxFQUdHLE9BSEgsRUFHWSxJQUhaOztBQUtBLGdCQUFPLENBQVAsRUFBVSxJQUFWLENBQWUsQ0FBZjtBQUNILE1BakJEO0FBbUJILEVBblZELEU7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQyx1REFBdUQ7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztrQkNsRmUsQzs7Ozs7Ozs7cUNDQU8sRTs7MENBQ0ssRTs7MkNBQ0MsRTs7aUNBQ1YsRTs7QUFDbEI7O0FBRUEsV0FBVSxLQUFWLEdBQWtCLGNBQWxCO0FBQ0EsV0FBVSxNQUFWLEdBQW1CLGVBQW5CO0FBQ0EsV0FBVSxLQUFWLEdBQWtCLEtBQWxCO0FBQ0E7O2tCQUVlLFM7Ozs7Ozs7O2tDQ1hJLEU7O2lDQUNELEU7O2tCQUVILE1BQU07QUFDakI7O0FBRGlCLEVBQU4sRUFHWjtBQUNDO0FBQ0E7QUFGRCxFQUhZLEM7Ozs7Ozs7O2tCQ0hBLEM7Ozs7Ozs7O2tCQ0FBLEM7Ozs7Ozs7O0FDQ2Y7O2tCQUV3QixFO0FBQVQsVUFBUyxFQUFULEdBQWMsQ0FFNUIsQzs7Ozs7Ozs7QUNMRDs7a0JBRXdCLGE7QUFBVCxVQUFTLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsS0FBL0IsRUFBc0MsQ0FFcEQsQzs7Ozs7Ozs7O2tDQ0prQixFOztrQkFFSyxJO0FBQVQsVUFBUyxJQUFULENBQWMsTUFBZCxFQUFzQixNQUF0QixFQUE4QixNQUE5QixFQUFzQyxPQUF0QyxFQUErQyxHQUEvQyxFQUFvRDtBQUMvRCxTQUFHLE9BQU8sSUFBUCxLQUFnQixRQUFoQixJQUE0QixLQUFLLElBQXBDLEVBQTBDO0FBQ3RDO0FBQ0EsZUFBTSxPQUFOO0FBQ0EsbUJBQVUsTUFBVjtBQUNBLGtCQUFTLE1BQVQ7QUFDQSxrQkFBUyxJQUFUO0FBQ0gsTUFORCxNQU1PO0FBQ0g7QUFDQSx5QkFBZ0IsTUFBaEIsRUFBd0IsTUFBeEI7QUFDSDs7QUFFRDtBQUNBLFNBQU0sT0FBTyxPQUFPLE1BQVAsQ0FBYjs7QUFFQSxTQUFJLGVBQWUsS0FBbkIsRUFBMEI7QUFBQSw0QkFLTCxHQUxLLDBGQVVaO0FBQUEsaUJBSkcsT0FJSCxRQUpGLEdBSUU7QUFBQSxpQkFISSxRQUdKLFFBSEYsSUFHRTtBQUFBLGlCQUZNLFVBRU4sUUFGRixNQUVFO0FBQUEsaUJBREssU0FDTCxRQURGLEtBQ0U7O0FBQ0YsaUJBQU0sY0FBYyxJQUFwQjtBQUNBLGlCQUFNLGNBQWMsRUFBcEI7O0FBR0EsaUJBQUcsU0FBSCxFQUFjO0FBQUEsK0JBRUUsV0FGRjtBQUNWOztBQURVLHFDQUVlLFNBRmY7QUFBQTtBQUFBO0FBQUE7QUFHYjs7QUFFRCxpQkFBRyxXQUFILEVBQWdCO0FBQUEsZ0NBRUEsV0FGQTtBQUNaOztBQURZLHFDQUVhLFdBRmI7QUFBQTtBQUFBO0FBQUE7QUFHZjs7QUFFRCxzQkFBUyxNQUFULEVBQWlCLE9BQWpCLEVBQTBCLFFBQTFCLEVBQW9DLFVBQXBDLEVBQWdELFdBQWhEO0FBQ0g7QUF6QkQ7Ozs7OztBQTJCSixnQkFBTyxNQUFQO0FBQ0g7QUFDSixFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmUxODZhZjA4NjQ1ODQyMThmZGVcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanNcIjogNTksXG5cdFwiLi9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXCI6IDYwLFxuXHRcIi4vYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanNcIjogNjcsXG5cdFwiLi9icXVlcnkvYWRkX3NwZWMuanNcIjogNjgsXG5cdFwiLi9icXVlcnkvY3JlYXRlX3NwZWMuanNcIjogNjksXG5cdFwiLi9icXVlcnkvZXZlbnRzX3NwZWMuanNcIjogNzAsXG5cdFwiLi9icXVlcnkvZmluZF9zcGVjLmpzXCI6IDcyLFxuXHRcIi4vYnF1ZXJ5L2luaXRfc3BlYy5qc1wiOiA3Myxcblx0XCIuL2JxdWVyeS9pc19zcGVjLmpzXCI6IDc0LFxuXHRcIi4vYnF1ZXJ5L25vdF9zcGVjLmpzXCI6IDc1LFxuXHRcIi4vYnF1ZXJ5L29uZV9zcGVjLmpzXCI6IDc2LFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXCI6IDc3LFxuXHRcIi4vY2xhc3Nfc3BlYy5qc1wiOiA3OCxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXCI6IDgwLFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXCI6IDgxLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1wiOiA4Mixcblx0XCIuL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXCI6IDgzLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1wiOiA4NCxcblx0XCIuL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXCI6IDg1XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDE7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdGVzdC9zcGVjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtcblx0aHRtbCxcblx0dGV4dCxcblx0cHJvcCxcblx0YXR0cixcblx0Y2xhc3NOYW1lLFxuXHRkYXRhc2V0LFxuXHRzdHlsZSxcblx0ZGlzcGxheVxufSBmcm9tICdzcmMvYmluZGVycyc7XG5pbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcblxuZGVzY3JpYmUoJ0JpbmRlcnMnLCAoKSA9PiB7XG5cdGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcblx0Y29uc3QgZGF0YXNldEl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuZGF0YXNldCA/IGl0IDogeGl0O1xuXHRsZXQgb2JqO1xuXHRsZXQgbm9kZTtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHRvYmogPSB7fTtcblx0XHRub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHByb3AnLCAoKSA9PiB7XG5cdFx0bm9kZS5zb21lUHJvcCA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBwcm9wKCdzb21lUHJvcCcpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLnNvbWVQcm9wKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGF0dHInLCAoKSA9PiB7XG5cdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJywgJ2ZvbycpO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBhdHRyKCdzb21lUHJvcCcpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScpKS50b0VxdWFsKCdmb28nKTtcblx0XHRub2RlLnNldEF0dHJpYnV0ZSgnc29tZS1hdHRyaWJ1dGUnLCAnYmFyJyk7XG5cdFx0ZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScpKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGh0bWwnLCAoKSA9PiB7XG5cdFx0bm9kZS5pbm5lckhUTUwgPSAnPGk+Zm9vPC9pPic7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGh0bWwoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnPGk+Zm9vPC9pPicpO1xuXHRcdG9iai54ID0gJzxiPmJhcjwvYj4nO1xuXHRcdGV4cGVjdChub2RlLmlubmVySFRNTCkudG9FcXVhbCgnPGI+YmFyPC9iPicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgdGV4dCcsICgpID0+IHtcblx0XHRub2RlLnRleHRDb250ZW50ID0gJzxpPmZvbzwvaT4nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCB0ZXh0KCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJzxpPmZvbzwvaT4nKTtcblx0XHRvYmoueCA9ICc8Yj5iYXI8L2I+Jztcblx0XHRleHBlY3Qobm9kZS50ZXh0Q29udGVudCkudG9FcXVhbCgnPGI+YmFyPC9iPicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgc3R5bGUnLCAoKSA9PiB7XG5cdFx0bm9kZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgc3R5bGUoJ3RleHRBbGlnbicpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdjZW50ZXInKTtcblx0XHRvYmoueCA9ICdyaWdodCc7XG5cdFx0ZXhwZWN0KG5vZGUuc3R5bGUudGV4dEFsaWduKS50b0VxdWFsKCdyaWdodCcpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgZGlzcGxheScsICgpID0+IHtcblx0XHRub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgZGlzcGxheSh0cnVlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChmYWxzZSk7XG5cdFx0b2JqLnggPSB0cnVlO1xuXHRcdGV4cGVjdChub2RlLnN0eWxlLmRpc3BsYXkpLnRvRXF1YWwoJycpO1xuXG5cdFx0bm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cdFx0YmluZE5vZGUob2JqLCAneScsIG5vZGUsIGRpc3BsYXkoZmFsc2UpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai55KS50b0VxdWFsKHRydWUpO1xuXHRcdG9iai55ID0gZmFsc2U7XG5cdFx0ZXhwZWN0KG5vZGUuc3R5bGUuZGlzcGxheSkudG9FcXVhbCgnJyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBjbGFzc05hbWUnLCAoKSA9PiB7XG5cdFx0Ly8gQElFOVxuXHRcdG5vZGUuY2xhc3NOYW1lID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGNsYXNzTmFtZSgnZm9vJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwodHJ1ZSk7XG5cdFx0b2JqLnggPSBmYWxzZTtcblx0XHRleHBlY3Qobm9kZS5jbGFzc05hbWUpLnRvRXF1YWwoJycpO1xuXG5cdFx0bm9kZS5jbGFzc05hbWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgY2xhc3NOYW1lKCdmb28nLCBmYWxzZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoZmFsc2UpO1xuXHRcdG9iai54ID0gdHJ1ZTtcblx0XHRleHBlY3Qobm9kZS5jbGFzc05hbWUpLnRvRXF1YWwoJycpO1xuXHR9KTtcblxuXHRkYXRhc2V0SXQoJ3Nob3VsZCBiaW5kIGRhdGFzZXQnLCAoKSA9PiB7XG5cdFx0Ly8gQElFOVxuXHRcdG5vZGUuZGF0YXNldC5mb28gPSAnYmFyJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgZGF0YXNldCgnZm9vJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuXHRcdG9iai54ID0gJ2Jheic7XG5cdFx0ZXhwZWN0KG5vZGUuZGF0YXNldC5mb28pLnRvRXF1YWwoJ2JheicpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGVyc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGh0bWwgZnJvbSAnLi9odG1sJztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgY2xhc3NOYW1lIGZyb20gJy4vY2xhc3NuYW1lJztcbmltcG9ydCBwcm9wIGZyb20gJy4vcHJvcCc7XG5pbXBvcnQgYXR0ciBmcm9tICcuL2F0dHInO1xuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IG91dHB1dCBmcm9tICcuL291dHB1dCc7XG5pbXBvcnQgdGV4dGFyZWEgZnJvbSAnLi90ZXh0YXJlYSc7XG5pbXBvcnQgc2VsZWN0IGZyb20gJy4vc2VsZWN0JztcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL3Byb2dyZXNzJztcbmltcG9ydCB0ZXh0IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZSc7XG5pbXBvcnQgZGF0YXNldCBmcm9tICcuL2RhdGFzZXQnO1xuXG5leHBvcnQge1xuICAgIGh0bWwsXG4gICAgZGlzcGxheSxcbiAgICBjbGFzc05hbWUsXG4gICAgcHJvcCxcbiAgICBhdHRyLFxuICAgIGlucHV0LFxuICAgIG91dHB1dCxcbiAgICB0ZXh0YXJlYSxcbiAgICBzZWxlY3QsXG4gICAgcHJvZ3Jlc3MsXG4gICAgdGV4dCxcbiAgICBzdHlsZSxcbiAgICBkYXRhc2V0XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh0bWwoKSB7XG5cdHJldHVybiB7XG5cdFx0b246ICdpbnB1dCcsIC8vIHRoZSBldmVudCBuYW1lIGZpcmVzIG9ubHkgaW4gY29udGVudGVkaXRhYmxlIG1vZGVcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0aGlzLmlubmVySFRNTCA9IGAke3ZhbHVlfWA7XG5cdFx0fVxuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2h0bWwuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwbGF5KHN3aXRjaGVyPXRydWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogbnVsbCxcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3R5bGUuZGlzcGxheVxuICAgICAgICAgICAgICAgIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMpLmdldFByb3BlcnR5VmFsdWUoJ2Rpc3BsYXknKTtcbiAgICAgICAgICAgIGNvbnN0IG5vbmUgPSB2YWx1ZSA9PT0gJ25vbmUnO1xuICAgICAgICAgICAgcmV0dXJuIHN3aXRjaGVyID8gIW5vbmUgOiBub25lO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgeyBzdHlsZSB9ID0gdGhpcztcbiAgICAgICAgICAgIGlmKHN3aXRjaGVyKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanNcbiAqKi8iLCJpbXBvcnQge1xuICAgIHRvZ2dsZSxcbiAgICBjb250YWluc1xufSBmcm9tICcuL19jbGFzc2xpc3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGFzc05hbWUoY2xhc3NOYW1lLCBzd2l0Y2hlcj10cnVlKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb250YWlucyh0aGlzLCBjbGFzc05hbWUpO1xuXHRcdFx0cmV0dXJuIHN3aXRjaGVyID8gdmFsdWUgOiAhdmFsdWU7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRvZ2dsZSh0aGlzLCBjbGFzc05hbWUsIHN3aXRjaGVyID8gISF2YWx1ZSA6ICF2YWx1ZSlcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2NsYXNzbmFtZS5qc1xuICoqLyIsIi8vIEBJRTlcblxubGV0IGFkZDtcbmxldCByZW1vdmU7XG5sZXQgY29udGFpbnM7XG5cbmlmKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmNsYXNzTGlzdCkge1xuICAgIGFkZCA9IChub2RlLCBuYW1lKSA9PiBub2RlLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgcmVtb3ZlID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICBjb250YWlucyA9IChub2RlLCBuYW1lKSA9PiBub2RlLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcbn0gZWxzZSB7XG4gICAgYWRkID0gKG5vZGUsIG5hbWUpID0+IHtcblx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIG5hbWUgKyBcIihcXFxcc3wkKVwiLCBcImdcIik7XG5cdFx0aWYgKCFyZS50ZXN0KG5vZGUuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAobm9kZS5jbGFzc05hbWUgKyBcIiBcIiArIG5hbWUpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyheIHwgJCkvZywgXCJcIik7XG4gICAgICAgIH1cblx0fVxuXG5cdHJlbW92ZSA9IChub2RlLCBuYW1lKSA9PiB7XG5cdFx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIgKyBjICsgXCIoXFxcXHN8JClcIiwgXCJnXCIpO1xuXHRcdG5vZGUuY2xhc3NOYW1lID0gbm9kZS5jbGFzc05hbWUucmVwbGFjZShyZSwgXCIkMVwiKS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKS5yZXBsYWNlKC8oXiB8ICQpL2csIFwiXCIpO1xuXHR9XG5cblx0Y29udGFpbnMgPSAobm9kZSwgYykgPT4ge1xuXHRcdHJldHVybiBuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgbmFtZSArICcoXFxcXHN8JCknKS50ZXN0KG5vZGUuY2xhc3NOYW1lKTtcblx0fVxufVxuXG5jb25zdCB0b2dnbGUgPSAobm9kZSwgbmFtZSwgc3dpdGNoZXIpID0+IHtcbiAgICBpZihzd2l0Y2hlcikge1xuICAgICAgICBhZGQobm9kZSwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlKG5vZGUsIG5hbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICB0b2dnbGUsXG4gICAgY29udGFpbnNcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvX2NsYXNzbGlzdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3AocHJvcGVydHlOYW1lKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1twcm9wZXJ0eU5hbWVdO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdC8vIGluIGNhc2Ugd2hlbiB5b3UncmUgdHJ5aW5nIHRvIHNldCByZWFkLW9ubHkgcHJvcGVydHlcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXNbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdH07XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9wcm9wLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0cihhdHRyaWJ1dGVOYW1lKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9hdHRyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5wdXQodHlwZSkge1xuICAgIGxldCBvbjtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvbjogJ2NsaWNrIGtleXVwJyxcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvbjogJ2NsaWNrIGtleXVwJyxcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJyAmJiB0aGlzLnZhbHVlID09IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgY2FzZSAncmVzZXQnOlxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICAgICAgb24gPSBudWxsO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgICAgb24gPSAnY2hhbmdlJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGV0aW1lLWxvY2FsJzpcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgICAgICBjYXNlICdzZWFyY2gnOlxuICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgY2FzZSAndGVsJzpcbiAgICAgICAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6ICovXG4gICAgICAgIGRlZmF1bHQ6IC8vIG90aGVyIGZ1dHVyZSAoSFRNTDYrKSBpbnB1dHNcbiAgICAgICAgICAgIG9uID0gJ2lucHV0JztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogb24sXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9pbnB1dC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG91dHB1dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogbnVsbCxcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSB8fCB0aGlzLnRleHRDb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgcHJvcGVydHkgPSAnZm9ybScgaW4gdGhpcyA/ICd2YWx1ZScgOiAndGV4dENvbnRlbnQnO1xuICAgICAgICAgICAgdGhpc1twcm9wZXJ0eV0gPSB2YWx1ZSA9PT0gbnVsbCA/ICcnIDogYCR7dmFsdWV9YDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9vdXRwdXQuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuXHRyZXR1cm4gaW5wdXQoJ3RleHQnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvdGV4dGFyZWEuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3QobXVsdGlwbGUpIHtcbiAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uOiAnY2hhbmdlJyxcbiAgICAgICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBvcHRpb25zLmxlbmd0aCA+IGk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uc1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbHVlKGdpdmVuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgZ2l2ZW5WYWx1ZSA9PT0gJ3N0cmluZycgPyBbZ2l2ZW5WYWx1ZV0gOiBnaXZlblZhbHVlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBvcHRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb25zW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246ICdjaGFuZ2UnLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBvcHRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc1tpXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3NlbGVjdC5qc1xuICoqLyIsImltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGV4dGFyZWEoKSB7XG5cdHJldHVybiBpbnB1dCgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9wcm9ncmVzcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiAnaW5wdXQnLCAvLyB0aGUgZXZlbnQgbmFtZSBmaXJlcyBvbmx5IGluIGNvbnRlbnRlZGl0YWJsZSBtb2RlXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0aGlzLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3RleHQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHlsZShwcm9wZXJ0eSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZVtwcm9wZXJ0eV1cbiAgICAgICAgICAgICAgICB8fCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvc3R5bGUuanNcbiAqKi8iLCIvLyByZXBsYWNlIG5hbWVzTGlrZVRoaXMgd2l0aCBuYW1lcy1saWtlLXRoaXNcbmNvbnN0IHRvRGFzaGVkID0gKG5hbWUpID0+IHtcbiAgICByZXR1cm4gJ2RhdGEtJyArIG5hbWUucmVwbGFjZSgvKFtBLVpdKS9nLCAodSkgPT4gXCItXCIgKyB1LnRvTG93ZXJDYXNlKCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRhc2V0KHByb3ApIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdGlmKHRoaXMuZGF0YXNldCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldFtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKHRvRGFzaGVkKHByb3ApKTtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0KSB7XG5cdFx0XHRcdHRoaXMuZGF0YXNldFtwcm9wXSA9IHZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUodG9EYXNoZWQocHJvcCksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2RhdGFzZXQuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL2dldG5vZGVzJztcbmltcG9ydCBzd2l0Y2hCaW5kaW5nIGZyb20gJy4vX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcnO1xuaW1wb3J0IGJpbmRTaW5nbGVOb2RlIGZyb20gJy4vX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IE1hdHJlc2hrYUVycm9yIGZyb20gJy4vX3V0aWwvbWF0cmVzaGthZXJyb3InO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4vdW5iaW5kbm9kZSc7XG5cbi8vIFRoZSBtYWluIG1ldGhvZCBvZiB0aGUgZnJhbWV3b3JrOiBiaW5kcyBhIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0byBIVE1MIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50T3B0aW9ucykge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2ZW50T3B0aW9ucyA9IGJpbmRlcjtcbiAgICAgICAgYmluZGVyID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgZXZlbnRPcHRpb25zID0gZXZlbnRPcHRpb25zIHx8IHt9O1xuICAgIGJpbmRlciA9IGJpbmRlciB8fCB7fTtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7XG4gICAgICAgIG9wdGlvbmFsPWJpbmROb2RlLnRlbXBvcmFyeU9wdGlvbmFsRmxhZyxcbiAgICAgICAgZGVlcCxcbiAgICAgICAgc2lsZW50XG4gICAgfSA9IGV2ZW50T3B0aW9ucztcblxuICAgIGRlbGV0ZSBiaW5kTm9kZS50ZW1wb3JhcnlPcHRpb25hbEZsYWc7XG5cbiAgICAvLyB0aHJvdyBlcnJvciB3aGVuIGtleSBpcyBub3QgZ2l2ZW5cbiAgICBpZigha2V5KSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmZhbHN5X2tleScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiBiaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGJpbmRlciwgZXZlbnRPcHRpb25zKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoW3trZXksIG5vZGUsIGJpbmRlciwgZXZlbnR9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlLFxuICAgICAgICAgICAgICAgIGJpbmRlcjogaXRlbUJpbmRlcixcbiAgICAgICAgICAgICAgICBldmVudDogaXRlbUV2ZW50XG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnQgPSBub2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50ID0ge307XG5cblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBpdGVtRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNvbW1vbkV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJnbG9iYWxcIiBldmVudFxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgY29tbW9uRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIC8vIGNoZWNrIG5vZGUgZXhpc3RlbmNlXG4gICAgaWYgKCEkbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOm5vZGVfbWlzc2luZycsIHsga2V5LCBub2RlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlZXAgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG4gICAgICAgIGlmIChkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBiaW5kaW5nIHdoZW4ga2V5IGFyZyBpbmNsdWRlcyBkb3RzIChlZyBcImEuYi5jLmRcIilcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZUhhbmRsZXIgPSAoY2hhbmdlRXZ0ID0ge30pID0+IHN3aXRjaEJpbmRpbmcoe1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VFdnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgZGVlcFBhdGgsXG4gICAgICAgICAgICAgICAgICAgICRub2RlcyxcbiAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBldmVudE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGJpbmROb2RlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpLFxuICAgICAgICAgICAgICAgIGBfY2hhbmdlOnRyZWU6JHtkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDJdfWAsIGNoYW5nZUhhbmRsZXIpO1xuXG4gICAgICAgICAgICBjaGFuZ2VIYW5kbGVyKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm9wRGVmID0gZGVmaW5lUHJvcChvYmplY3QsIGtleSk7XG5cbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgLy8gaWYgb2JqZWN0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSB0aGVuIGV4dGVuZCBcIiRub2Rlc1wiIGFuZCBcIm5vZGVzXCIgb2JqZWN0c1xuICAgICAgICBjb25zdCB7ICRub2RlczogJGFsbE5vZGVzLCBub2RlczogYWxsTm9kZXMgfSA9IG9iamVjdDtcblxuICAgICAgICBpZighJGFsbE5vZGVzIHx8ICFhbGxOb2Rlcykge1xuICAgICAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6aW5zdGFuY2Vfbm9kZXNfbWlzc2luZycsIHtcbiAgICAgICAgICAgICAgICAkbm9kZXM6ICRhbGxOb2RlcyxcbiAgICAgICAgICAgICAgICBub2RlczogYWxsTm9kZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJGFsbE5vZGVzW2tleV0gPSAkYWxsTm9kZXNba2V5XSAmJiAkYWxsTm9kZXNba2V5XS5sZW5ndGhcbiAgICAgICAgICAgID8gJGFsbE5vZGVzW2tleV0uYWRkKCRub2RlcylcbiAgICAgICAgICAgIDogJG5vZGVzO1xuXG4gICAgICAgIGFsbE5vZGVzW2tleV0gPSAkYWxsTm9kZXNba2V5XVswXTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgYmluZGluZyBmb3IgZXZlcnkgbm9kZSBzZXBhcmF0ZWx5XG4gICAgbm9mbi5mb3JFYWNoKCRub2RlcywgKG5vZGUpID0+IGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgZXZlbnRPcHRpb25zLFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIHByb3BEZWZcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuXG4vLyB0aGlzIGlzIGNvbW1vbiBmdW5jdGlvbiB3aGljaCBhc3NvY2lhdGVzIGFuIG9iamVjdCB3aXRoIGl0cyBNYXRyZXNoa2EgZGVmaW5pdGlvblxuZnVuY3Rpb24gY29tbW9uSW5pdChvYmplY3QpIHtcbiAgICBsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcbiAgICBpZiAoIWRlZikge1xuICAgICAgICBkZWYgPSB7XG4gICAgICAgICAgICAvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuICAgICAgICAgICAgLy8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIC8qIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBjdHg6IG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogb2JqZWN0MixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleGFtcGxlXCIsXG5cdFx0XHRcdFx0aW5mbzoge31cbiAgICAgICAgICAgICAgICB9ICovXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIC8qIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBnZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHNldHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbWVkaWF0b3I6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0SGFuZGxlcixcblx0XHRcdFx0XHRcdC4uLm90aGVyIHJlcXVpcmVkIGluZm9cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZDogYG1rJHtNYXRoLnJhbmRvbSgpfWBcbiAgICAgICAgfTtcblxuICAgICAgICBkZWZzLnNldChvYmplY3QsIGRlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdE1LKG9iamVjdCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqZWN0O1xuICAgIGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0Ly8gVE9ETyB0aHJvdyBtYXRyZXNoa2FFcnJvclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGV9IGNhbm5vdCBiZSB1c2VkIGluIHRoaXMgbWV0aG9kYCk7XG4gICAgfVxuXG4gICAgLy8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG4gICAgLy8gZWxzZSBydW4gY29tbW9uSW5pdFxuICAgIC8vIGV2ZXJ5IF9pbml0TUsgaW1wbGVtZW50YXRpb24gaGF2ZSB0byBydW4gY29tbW9uSW5pdCBvciBwYXJlbnQncyBfaW5pdE1LXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgIHJldHVybiBvYmplY3QuX2luaXRNYXRyZXNoa2EgPyBvYmplY3QuX2luaXRNYXRyZXNoa2EoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcbiAgICBnZXQob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcbiAgICB9LFxuICAgIHNldChvYmosIGRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ21hdHJlc2hrYURhdGEnLCB7XG4gICAgICAgICAgICB2YWx1ZTogZGF0YSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGhhcyhvYmopIHtcbiAgICAgICAgcmV0dXJuICdtYXRyZXNoa2FEYXRhJyBpbiBvYmo7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IG5ldyBQc2V1ZG9NYXAoKSA6IG5ldyBXZWFrTWFwKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhlIGZ1bmN0aW9uIGRlZmluZXMgbmVlZGVkIGRlc2NyaXB0b3IgZm9yIGdpdmVuIHByb3BlcnR5IFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmaW5lUHJvcChvYmplY3QsIGtleSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFkZWYucHJvcHNba2V5XSkge1xuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzW2tleV0gPSB7XG4gICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV0sXG4gICAgICAgICAgICBnZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICBzZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICBtZWRpYXRvcjogbnVsbCxcbiAgICAgICAgICAgIGJpbmRpbmdzOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5nZXR0ZXIgPyBwcm9wRGVmLmdldHRlci5jYWxsKG9iamVjdCkgOiBwcm9wRGVmLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuc2V0dGVyID8gcHJvcERlZi5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogc2V0KG9iamVjdCwga2V5LCB2LCB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21TZXR0ZXI6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZi5wcm9wc1trZXldO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpcyBmcm9tICcuL191dGlsL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIHNldHMgbmV3IHZhbHVlIGZvciBhIHByb3BlcnR5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZXQnKTtcblxuICAgIC8vIGlmIG5vIGtleSBvciBmYWxzeSBrZXkgaXMgZ2l2ZW5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiB0aGVuIG1ha2Ugc2ltcGxlIGFzc2lnbm1lbnRcbiAgICBpZiAoIWRlZikge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMsIGV2ZW50cyB9ID0gZGVmO1xuICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG4gICAgLy8gYWxsb3cgdG8gdXNlIGtleS12YWx1ZSBvYmplY3QgYXMgYW5vdGhlciB2YXJpYXRpb25cbiAgICBpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChvYmpWYWwsIG9iaktleSkgPT4gc2V0KG9iamVjdCwgb2JqS2V5LCBvYmpWYWwsIHZhbHVlKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gcHJvcGVydHkgZGVmaW5pdGlvbiB0aGVuIG1ha2Ugc2ltcGxlIGFzc2lnbm1lbnRcbiAgICBpZiAoIXByb3BEZWYpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHZhbHVlOiBwcmV2aW91c1ZhbHVlLCBtZWRpYXRvciB9ID0gcHJvcERlZjtcblxuICAgIC8vIHBvc3NpYmxlIGZsYWdzXG4gICAgY29uc3Qge1xuICAgICAgICBza2lwTWVkaWF0b3IsXG4gICAgICAgIGZyb21NZWRpYXRvcixcbiAgICAgICAgZm9yY2UsXG4gICAgICAgIGZvcmNlSFRNTCxcbiAgICAgICAgc2lsZW50LFxuICAgICAgICBzaWxlbnRIVE1MLFxuICAgICAgICBza2lwTGlua3NcbiAgICB9ID0gZXZ0O1xuXG4gICAgbGV0IG5ld1ZhbHVlO1xuXG4gICAgaWYgKG1lZGlhdG9yICYmICFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkgJiYgIXNraXBNZWRpYXRvciAmJiAhZnJvbU1lZGlhdG9yKSB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgbmV3VmFsdWUgPSBzcGVjaWFsLm1lZGlhdG9yKHYsIHByZXZWYWwsIGtleSwgb2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFpcyhuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cbiAgICAvLyBhZGQgdG8gZXZ0IG9iamVjdCBzb21lIHVzZWZ1bCBwcm9wZXJ0aWVzXG4gICAgY29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgc2VsZjogb2JqZWN0LFxuICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICBrZXksXG4gICAgICAgIGlzQ2hhbmdlZFxuICAgIH0sIGV2dCk7XG5cbiAgICBjb25zdCB0cmlnZ2VyQ2hhbmdlID0gKGlzQ2hhbmdlZCB8fCBmb3JjZSkgJiYgIXNpbGVudDtcblxuICAgIC8vIHRyaWdnZXIgYmVmb3JlY2hhbmdlOktFWSBhbmQgYmVmb3JlY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZVN0ciA9ICdiZWZvcmVjaGFuZ2UnO1xuICAgICAgICBjb25zdCBiZWZvcmVjaGFuZ2VFdnROYW1lID0gYCR7YmVmb3JlY2hhbmdlU3RyfToke2tleX1gO1xuXG4gICAgICAgIGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VTdHJdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9wRGVmLnZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAvLyB0cmlnZXIgYmluZGluZ3NcbiAgICBpZiAoIXNpbGVudEhUTUwgJiYgKGlzQ2hhbmdlZCB8fCBmb3JjZSB8fCBmb3JjZUhUTUwpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSA9IGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VCaW5kaW5nc0V2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlQmluZGluZ3NFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIGNoYW5nZTpLRVkgYW5kIGNoYW5nZSBldmVudHNcbiAgICBpZiAodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VTdHIgPSAnY2hhbmdlJztcbiAgICAgICAgY29uc3QgY2hhbmdlRXZ0TmFtZSA9IGAke2NoYW5nZVN0cn06JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgZGVwZW5kZW5jaWVzIChtYWRlIHdpdGggbGlua1Byb3BzKVxuICAgIGlmICgoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2tpcExpbmtzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlcHNFdnROYW1lID0gYF9jaGFuZ2U6ZGVwczoke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlRGVwc0V2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVwc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgZGVsZWdhdGVkIGV2ZW50cyBsb2dpY1xuICAgIGlmKGlzQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGlmIChldmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2V0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCBldmVudHMgPSBkZWYuZXZlbnRzW25hbWVdO1xuXG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgICBjb25zdCBhcmdzID0gbm9mbi5zbGljZShhcmd1bWVudHMsIDIpO1xuICAgICAgICBjb25zdCBsID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgW2ExLCBhMl0gPSBhcmdzO1xuXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGV2O1xuXG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuXG50cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0ge1xuICAgIGluZm86IHt9LFxuICAgIG5hbWU6IG51bGxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUuanNcbiAqKi8iLCJpbXBvcnQgbWF0cmVzaGthRXJyb3IgZnJvbSAnLi9tYXRyZXNoa2FlcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgbWV0aG9kKSB7XG4gICAgY29uc3QgdHlwZW9mT2JqZWN0ID0gb2JqZWN0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIG9iamVjdDtcblxuICAgIGlmICh0eXBlb2ZPYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG1hdHJlc2hrYUVycm9yKCdjb21tb246b2JqZWN0X3R5cGUnLCB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlb2ZPYmplY3QsXG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzXG4gKiovIiwiY29uc3QgYmluZGluZ0Vycm9yUHJlZml4ID0gJ0JpbmRpbmcgZXJyb3I6JztcblxuY29uc3QgZXJyb3JzID0ge1xuICAgICdiaW5kaW5nOm5vZGVfbWlzc2luZyc6ICh7IGtleSwgbm9kZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ySW5mbyA9IHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyA/IGAgVGhlIHNlbGVjdG9yIGlzICR7bm9kZX1gIDogJyc7XG4gICAgICAgIHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IG5vZGUgaXMgbWlzc2luZyBmb3IgJHtrZXl9LiR7c2VsZWN0b3JJbmZvfWA7XG4gICAgfSxcbiAgICAnYmluZGluZzpmYWxzeV9rZXknOiAoKSA9PiAnQmluZGluZyBlcnJvcjogXCJrZXlcIiBhcmcgY2Fubm90IGJlIGZhbHN5JyxcbiAgICAnYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJzogKHsgJG5vZGVzIH0pID0+IHtcbiAgICAgICAgY29uc3QgbWlzc2luZyA9ICEkbm9kZXMgPyAnJG5vZGVzJyA6ICdub2Rlcyc7XG4gICAgICAgIHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IFwiJHttaXNzaW5nfVwiIHByb3BlcnR5IG9mIE1hdHJlc2hrYSBpbnN0YW5jZSBpcyBtaXNzaW5nLiBgXG4gICAgICAgICAgICArICdJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgbXVzdCBub3QgYmUgcmVhc3NpZ25lZC4nO1xuICAgIH0sXG4gICAgJ2NvbW1vbjpvYmplY3RfdHlwZSc6ICh7IHR5cGUsIG1ldGhvZCB9KSA9PlxuICAgICAgICBgTWV0aG9kIFwiJHttZXRob2R9XCIgZG9lcyBub3QgYWNjZXB0ICR7dHlwZX0gYXMgdGFyZ2V0IG9iamVjdGBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hdHJlc2hrYUVycm9yKGtleSwgZGF0YSkge1xuICAgIGNvbnN0IGdldEVycm9yID0gZXJyb3JzW2tleV07XG4gICAgaWYgKCFnZXRFcnJvcikge1xuICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBlcnJvciBcIiR7a2V5fVwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcnNba2V5XShkYXRhKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSwgbm8tY29uZnVzaW5nLWFycm93ICovXG4vLyBkZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWVcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9pcy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuY29uc3QgaHRtbFJlZyA9IC88LztcbmNvbnN0IGN1c3RvbVNlbGVjdG9yUmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG4vLyBUT0RPIHdyaXRlIGRlc2NyaXB0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlcyhvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgbGV0IG5vZGVzO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhaHRtbFJlZy50ZXN0KHNlbGVjdG9yKSAmJiBjdXN0b21TZWxlY3RvclJlZy50ZXN0KHNlbGVjdG9yKSkge1xuICAgICAgICBub2RlcyA9IHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBub2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi4vX3V0aWwvdG9hcnJheSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclJlZyA9IC9cXHMqOmJvdW5kXFwoKFteKF0qKVxcKVxccyooW1xcU1xcc10qKVxccyp8XFxzKjpzYW5kYm94XFxzKihbXFxTXFxzXSopXFxzKi87XG5cbi8vIFRPRE8gYWRkIGRlc2NyaXB0aW9uXG4vLyBUT0RPIHRoaXMgZnVuY3Rpb24gbG9va3Mgbm90IGdvb2QsIGl0IG5lZWRzIHRvIGJlIHJlZmFjdG9yZWQgYW5kIGFjY2VsZXJhdGVkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIGdpdmVuU2VsZWN0b3IpIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGdpdmVuU2VsZWN0b3Iuc3BsaXQoJywnKTtcbiAgICBsZXQgcmVzdWx0ID0gZG9tLiQoKTtcblxuICAgIG5vZm4uZm9yRWFjaChzZWxlY3RvcnMsIHNlbGVjdG9yID0+IHtcbiAgICAgICAgY29uc3QgZXhlY1Jlc3VsdCA9IGN1c3RvbVNlbGVjdG9yUmVnLmV4ZWMoc2VsZWN0b3IpO1xuICAgICAgICBpZihleGVjUmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEtleSA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/ICdzYW5kYm94JyA6IGV4ZWNSZXN1bHRbMV07XG4gICAgICAgICAgICBjb25zdCBzdWJTZWxlY3RvciA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/IGV4ZWNSZXN1bHRbM10gOiBleGVjUmVzdWx0WzJdO1xuICAgICAgICAgICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2JvdW5kS2V5XTtcblxuICAgICAgICAgICAgaWYocHJvcERlZikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG4gICAgICAgICAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmROb2RlcyA9IEFycmF5KGJpbmRpbmdzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKGJpbmRpbmcsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kTm9kZXNbaV0gPSBiaW5kaW5nLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpIC5teS1zZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGNvbnRhaW5zIGNoaWxkcmVuIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvci5pbmRleE9mKCc+JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RpbmcgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tQXR0ciA9IGBtJHtNYXRoLnJhbmRvbSgpfWAucmVwbGFjZSgnLicsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tQXR0ciwgcmFuZG9tQXR0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGBbJHtyYW5kb21BdHRyfT1cIiR7cmFuZG9tQXR0cn1cIl0gJHtzdWJTZWxlY3Rvcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKHJhbmRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc3ViU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmcganVzdCBhZGQgYm91bmQgbm9kZXMgdG8gcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGJvdW5kTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3IgKG5vIGN1c3RvbSB0aGluZ3MpXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0LCBzdGFydCkge1xuXHR2YXIgYXJyYXkgPSBbXSxcblx0XHRsID0gb2JqZWN0Lmxlbmd0aCxcblx0XHRpO1xuXG5cdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblxuXHRmb3IgKGkgPSBzdGFydDsgaSA8IGw7IGkrKykge1xuXHRcdGFycmF5W2kgLSBzdGFydF0gPSBvYmplY3RbaV07XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC90b2FycmF5LmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcbiAgICAkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuICAgIGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcbiAgICAgICAgICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcbiAgICAgICAgZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG4gICAgfVxufSBlbHNlIHtcbiAgICB1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG4gICAgZm46IEluaXQucHJvdG90eXBlLFxuICAgIGV4dGVuZCxcbiAgICBwYXJzZUhUTUwsXG4gICAgb25lLFxuICAgIGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBpcyxcbiAgICBhZGQsXG4gICAgbm90LFxuICAgIGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChnaXZlbkhUTUwpIHtcbiAgICAvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG4gICAgY29uc3Qgd3JhcE1hcCA9IHtcbiAgICAgICAgb3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcbiAgICAgICAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgICAgICAgdGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICAgICAgICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gICAgICAgIHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgY29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcbiAgICAgICAgYXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcbiAgICAgICAgXzogWzAsICcnLCAnJ11cbiAgICB9O1xuXG4gICAgY29uc3QgaHRtbCA9IGdpdmVuSFRNTC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaTtcblxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcbiAgICB3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuICAgIHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG4gICAgY29uc3QgZXggPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZXggJiYgd3JhcE1hcFtleFsxXV0gfHwgd3JhcE1hcC5fO1xuXG4gICAgbm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cbiAgICBpID0gd3JhcHBlclswXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBuZXcgSW5pdChodG1sMm5vZGVMaXN0KGh0bWwpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiBtYXRjaGVkIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25lKHMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbi8vIFRPRE8gZ2V0IHJpZCBvZiBpdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiB0YWdOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwcm9wcyA9IHRhZ05hbWU7XG4gICAgICAgIHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihlbFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSAhPT0gJ3RhZ05hbWUnKSB7XG4gICAgICAgICAgICAgICAgZWxba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCByYW5kb21JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICd4Jyk7XG4gICAgY29uc3Qgc2NvcGVTZWxlY3RvciA9IGBbJHtyYW5kb21JRH09XCIke3JhbmRvbUlEfVwiXSBgO1xuICAgIGNvbnN0IHNwbGl0dGVkU2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuXG4gICAgbGV0IG1hdGNoaW5nID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcbiAgICAgICAgbWF0Y2hpbmcgKz0gYCR7aSA9PT0gMCA/ICcnIDogJywnfSR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0sJHtzY29wZVNlbGVjdG9yfSR7c2VsfSAqYDtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cbiAgICBpZiAoaXMuY2FsbChbZXZ0LnRhcmdldF0sIG1hdGNoaW5nKSkge1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXNTdHIsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lc1N0ci5zcGxpdCgvXFxzLyk7XG4gICAgbGV0IGRlbGVnYXRlO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGlzdCkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbi5qc1xuICoqLyIsIi8vIHNoYXJlIGRhdGEgYmV0d2VlbiBhcyBhbiBvYmplY3QgbW9kdWxlcyBiZWNhdXNlIHdlIHVzZVxuLy8gc2ltcGxpZmllZCBlcyBtb2R1bGVzIHRoZXJlIGFuZCBjYW5ub3QgaW1wb3J0IGFuZCBzaGFyZSBhIG51bWJlclxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5vZGVJbmRleDogMCxcbiAgICBhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXNbMF07XG4gICAgcmV0dXJuIG5vZGVcbiAgICAgICAgPyAobm9kZS5tYXRjaGVzXG4gICAgICAgICAgICB8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2lzLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIHJlbW92ZXMgZXZlbnQgaGFuZGxlciBmcm9tIGEgc2V0IG9mIGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuZGVsZWdhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IGV2ZW50Lm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgaWRNYXAgPSB7fTtcblxuICAgIGxldCByZXN1bHQ7XG5cbiAgICBzZWxlY3RvciA9IG5ldyBJbml0KHNlbGVjdG9yKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW5pdCh0aGlzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByZXN1bHRbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gc2VsZWN0b3JbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWYgKCFpZE1hcFtub2RlSURdKSB7XG4gICAgICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvbm90LmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIGVsZW1lbnRzLFxuLy8gZmlsdGVyZWQgYnkgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICAgIGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2ZpbmQuanNcbiAqKi8iLCJpbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcbi8vIHJlLWFkZHMgYmluZGluZyB3aGVuIG9iamVjdCBicmFuY2ggaXMgY2hhbmdlZFxuLy8gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSBiaW5kTm9kZSB3aGVuIHNvbWV0aGluZyBsaWtlXG4vLyAnZm9vLmJhci5iYXonIGlzIHBhc3NlZCB0byBpdCBhcyBrZXkgYXJnIHZhbHVlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2l0Y2hCaW5kaW5nKHtcbiAgICBjaGFuZ2VFdnQsXG4gICAgb2JqZWN0LFxuICAgIGRlZXBQYXRoLFxuICAgICRub2RlcyxcbiAgICBiaW5kZXIsXG4gICAgZXZlbnRPcHRpb25zLFxuICAgIGJpbmROb2RlXG59KSB7XG4gICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG4gICAgbGV0IHsgdmFsdWU6IHRhcmdldCB9ID0gY2hhbmdlRXZ0O1xuICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNUYXJnZXQgfSA9IGNoYW5nZUV2dDtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldCA9IG9iamVjdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgJG5vZGVzLCBiaW5kZXIsIGV2ZW50T3B0aW9ucyk7XG5cbiAgICAvLyByZW1vdmUgYmluZGluZyBmb3IgcHJldmlvdXNseSB1c2VkIG9iamVjdFxuICAgIGlmIChwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuYmluZE5vZGUocHJldmlvdXNUYXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sICRub2Rlcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZ2V0Tm9kZXMgZnJvbSAnLi9fYmluZGluZ3MvZ2V0bm9kZXMnO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVCaW5kaW5nIGZyb20gJy4vX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBldmVudE9wdGlvbnMpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldmVudE9wdGlvbnMgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAndW5iaW5kTm9kZScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGV2ZW50T3B0aW9ucykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbeyBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnQgfV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZVxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBhY2NlcHQga2V5LW5vZGUgb2JqZWN0XG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGtleU9iaktleSwga2V5T2JqVmFsdWUsIG5vZGUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cblxuICAgIGV2ZW50T3B0aW9ucyA9IGV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCB7IGRlZXAgfSA9IGV2ZW50T3B0aW9ucztcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZjtcblxuICAgIC8vIGFsbG93IHRvIHBhc3MgbnVsbCBvciB1bmRlZmluZWQgYXMga2V5XG4gICAgLy8gaWYgcGFzc2VkIHRoZW4gcmVtb3ZlIGJpbmRpbmdzIG9mIGFsbCBrZXlzIGZvciBnaXZlbiBvYmplY3RcbiAgICBpZihrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24ocHJvcHMsIChwcm9wc0l0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbnVsbCwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGJpbmRpbmdcbiAgICBpZihkZWVwICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVlcFBhdGhMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBkbyB3ZSBuZWVkIHRvIHRocm93IGVycm9yIHdoZW4gdGFyZ2V0IGlzIGZhbHN5P1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtkZWVwUGF0aFtpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE8gQlVHIHRoaXMgbWF5IHVuZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBiaW5kaW5ncyB3aXRoIHRoZSBzYW1lIHBhdGggKGNhbm5vdCByZXByb2R1Y2UpXG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpLFxuICAgICAgICAgICAgICAgIGBfY2hhbmdlOnRyZWU6JHtkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDJdfWApO1xuXG4gICAgICAgICAgICB1bmJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgbm9kZSwgZXZlbnRPcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyB3aGVuIG5vIHByb3BkZWYgZG8gbm90aGluZ1xuICAgIGlmKCFwcm9wRGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0IGhhdmUgYW55IGJpbmRpbmdzIGRvIG5vdGhpbmdcbiAgICBpZighYmluZGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBub2RlIGlzIHBhc2VkIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuICAgIGlmKCFub2RlKSB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2ZW50T3B0aW9ucyB9LCBiaW5kaW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5vZGVzIGFuZCAkbm9kZXMgZm9yIE1hdHJlc2hrYSBpbnN0YW5jZVxuICAgICAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcbiAgICBjb25zdCByZXRhaW5CaW5kaW5ncyA9IFtdO1xuICAgIGNvbnN0IHJldGFpbk5vZGVzID0gW107XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIGJpbmRuZ3MgYW5kIGNvbXBhcmUgdGhlaXIgbm9kZSB3aXRoIGdpdmVuIG5vZGVzXG4gICAgbm9mbi5mb3JFYWNoKCRub2Rlcywgbm9kZXNJdGVtID0+IHtcbiAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmKGJpbmRpbmcubm9kZSA9PT0gbm9kZXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldmVudE9wdGlvbnMgfSwgYmluZGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldGFpbkJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gICAgICAgICAgICAgICAgcmV0YWluTm9kZXMucHVzaChub2Rlc0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgaWYocmV0YWluTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3Qubm9kZXNba2V5XSA9IHJldGFpbk5vZGVzWzBdO1xuICAgICAgICAgICAgb2JqZWN0LiRub2Rlc1trZXldID0gZG9tLiQocmV0YWluTm9kZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC5ub2Rlc1trZXldXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LiRub2Rlc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGJpbmRpbmdzIG9iamVjdFxuICAgIGlmKHJldGFpbkJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9wRGVmLmJpbmRpbmdzID0gcmV0YWluQmluZGluZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdW5iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vcmVtb3ZlbGlzdGVuZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBnaXZlblBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHtcblx0XHRyZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXG4gICAgbGV0IHBhdGggPSB0eXBlb2YgZ2l2ZW5QYXRoID09PSAnc3RyaW5nJyAmJiBnaXZlblBhdGggIT09ICcnID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBnaXZlblBhdGg7XG5cbiAgICBpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG5vIHBhdGggdGhlbiByZW1vdmUgbGlzdGVuZXJcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBkbyBhbGwgbWFnaWNcbiAgICAgICAgY29uc3Qga2V5ID0gcGF0aFswXTtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuICAgICAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG4gICAgICAgIGxldCBwYXRoU3RyO1xuXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZXRhaW4gPSBbXTtcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaW5mby5wYXRoU3RyICE9PSBwYXRoU3RyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0gPSByZXRhaW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIi8qIGVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgIGNvbnN0IG5vVHJpZ2dlciA9IG5hbWUgPyBuYW1lWzBdID09PSAnXycgOiBmYWxzZTtcblxuICAgIC8vIGlmIGFsbCBldmVudHMgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgbm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZXZ0LmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuICAgICAgICBkZWYuZXZlbnRzID0ge307XG4gICAgfSBlbHNlIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcbiAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIChjYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgZXZlbnRcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBkZWYuZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5cbmNvbnN0IHNwYWNlUmVnID0gL1xccysvO1xuXG4vLyB0aGUgZnVuY3Rpb24gcmVtb3ZlcyBzaW5nbGUgYmluZGluZyBmb3Igc2luZ2xlIG9iamVjdFxuLy8gY2FsbGVkIGJ5IHVuYmluZE5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZlbnRPcHRpb25zIH0sIHtcbiAgICBvcHRpb25zLFxuICAgIGJpbmRlcixcbiAgICBub2RlLFxuICAgIG5vZGVIYW5kbGVyLFxuICAgIG9iamVjdEhhbmRsZXJcbn0pIHtcbiAgICBjb25zdCB7IGRlc3Ryb3ksIG9uIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgeyBzaWxlbnQgfSA9IGV2ZW50T3B0aW9ucztcblxuICAgIC8vIGlmIFwib25cIiBpcyBmdW5jdGlvbiBkaXNhYmxlIGl0XG4gICAgLy8gd2UgY2Fubm90IHR1cm4gb2ZmIGN1c3RvbSBsaXN0ZW5lciBkZWZpbmVkIGJ5IGEgcHJvZ3JhbW1lclxuICAgIC8vIHByb2dyYW1tZXIgbmVlZHMgdG8gcmVtb3ZlIGN1c3RvbSBsaXN0ZW5lciBtYXVhbGx5IHZpYSBiaW5kZXIuZGVzdHJveVxuICAgIGlmICh0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbm9kZUhhbmRsZXIuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uID09PSAnc3RyaW5nJyl7XG4gICAgICAgIC8vIHJlbW92ZSBET00gZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG4gICAgICAgIG5vZm4uZm9yRWFjaChvbi5zcGxpdChzcGFjZVJlZyksXG4gICAgICAgICAgICBldnROYW1lID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnROYW1lLCBub2RlSGFuZGxlcikpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBvYmplY3QgZXZlbnQgbGlzdGVuZXJcbiAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG4gICAgLy8gaWYgYmluZGVyLmRlc3Ryb3kgaXMgZ2l2ZW4gY2FsbCBpdFxuICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgIGRlc3Ryb3kuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZlbnRPcHRpb25zID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9LCBldmVudE9wdGlvbnMpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgdW5iaW5kOiR7a2V5fWAsIGV4dGVuZGVkRXZlbnRPcHRpb25zKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICd1bmJpbmQnLCBleHRlbmRlZEV2ZW50T3B0aW9ucyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgbG9va0ZvckJpbmRlciBmcm9tICcuLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBydW5Ob2RlSGFuZGxlciBmcm9tICcuL3J1bm5vZGVoYW5kbGVyJztcbmltcG9ydCBydW5PYmplY3RIYW5kbGVyIGZyb20gJy4vcnVub2JqZWN0aGFuZGxlcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL191dGlsL2RlYm91bmNlJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIGhhbmRsZXMgYmluZGluZyBmb3Igc2luZ2xlIHByb3BlcnR5ICYgbm9kZVxuLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgYXQgYmluZE5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgIGJpbmRlcjogZ2l2ZW5CaW5kZXIsXG4gICAga2V5LFxuICAgICRub2RlcyxcbiAgICBub2RlLFxuICAgIGV2ZW50T3B0aW9ucyxcbiAgICBwcm9wRGVmXG59KSB7XG4gICAgY29uc3Qge1xuICAgICAgICBzaWxlbnQsXG4gICAgICAgIGFzc2lnbkRlZmF1bHRWYWx1ZSxcbiAgICAgICAgZGVib3VuY2U6IGRlYm91bmNlT3B0aW9uXG4gICAgfSA9IGV2ZW50T3B0aW9ucztcbiAgICAvLyBjcmVhdGUgYmluZGluZ3MgYXJyYXkgaW4gcHJvcGVydHkgZGVmaW5pdGlvbiBvYmplY3RcbiAgICBjb25zdCBiaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgbGV0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG4gICAgY29uc3QgYmluZGluZ09wdGlvbnMgPSB7XG4gICAgICAgIHNlbGY6IG9iamVjdCxcbiAgICAgICAga2V5LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgJG5vZGVzLFxuICAgICAgICBub2RlXG4gICAgfTtcbiAgICBsZXQgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgIGxldCBiaW5kZXI7XG4gICAgbGV0IG9iamVjdEhhbmRsZXI7XG4gICAgbGV0IG5vZGVIYW5kbGVyO1xuXG4gICAgLy8gZ2V0IGFjdHVhbCBiaW5kZXJcbiAgICBpZiAoZ2l2ZW5CaW5kZXIgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG4gICAgICAgIGlmIChmb3VuZEJpbmRlcikge1xuICAgICAgICAgICAgaWYgKGdpdmVuQmluZGVyKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24oZm91bmRCaW5kZXIsIGdpdmVuQmluZGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmluZGVyID0gZm91bmRCaW5kZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiaW5kZXIgPSBnaXZlbkJpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgZ2V0VmFsdWUsIHNldFZhbHVlLCBvbiwgaW5pdGlhbGl6ZSB9ID0gYmluZGVyO1xuXG4gICAgLy8gY2FsbCBiaW5kZXIuaW5pdGlhbGl6ZVxuICAgIGlmIChpbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemUuY2FsbChub2RlLCBiaW5kaW5nT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gY2FsbHMgZ2V0VmFsdWUgaW1tZWRpYXRlbHkgYW5kIHJlYXNzaWduIGEgcHJvcGVydHlcbiAgICAvLyB3aGVuIGFsbCByZXF1aXJlZCBjb25kaXRpb25zIGFyZSBtZXQgZm9yIHRoaXNcbiAgICBpZiAoZ2V0VmFsdWUgJiYgKGlzVW5kZWZpbmVkICYmIGFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuICAgICAgICB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgYmluZGluZ09wdGlvbnMpO1xuICAgICAgICBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyBmcm9tTm9kZTogdHJ1ZSB9LCBldmVudE9wdGlvbnMpKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgbmVlZGVkIGV2ZW50IGhhbmRsZXJzIHRoZSBvYmplY3Qgd2hlbiBzZXRWYWx1ZSBpcyBnaXZlblxuICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICBvYmplY3RIYW5kbGVyID0gKCkgPT4gcnVuT2JqZWN0SGFuZGxlcih7XG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgIGJpbmRpbmdPcHRpb25zLFxuICAgICAgICAgICAgZXZlbnRPcHRpb25zXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGJ5IGRlZmF1bHQgZGVib3VuY2luZyBpcyBvblxuICAgICAgICAvLyBpdCBjYW4gYmUgdHVybmVkIG9mZiBieSBwYXNzaW5nIGRlYm91bmNlPWZhbHNlIHRvIGV2ZW50IG9iamVjdFxuICAgICAgICBpZiAoZGVib3VuY2VPcHRpb24gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHR5cGVvZiBkZWJvdW5jZU9wdGlvbiA9PT0gJ251bWJlcicgPyBkZWJvdW5jZU9wdGlvbiA6IDA7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyID0gZGVib3VuY2Uob2JqZWN0SGFuZGxlciwgZGVsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gLCBvYmplY3RIYW5kbGVyKTtcblxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgbmVlZGVkIGV2ZW50IGhhbmRsZXJzIHRoZSBub2RlIHdoZW4gZ2V0VmFsdWUgJiBvbiBhcmUgZ2l2ZW5cbiAgICBpZiAoZ2V0VmFsdWUgJiYgb24pIHtcbiAgICAgICAgbm9kZUhhbmRsZXIgPSAoZG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZSBpcyBzZXQgaW4gdW5iaW5kTm9kZVxuICAgICAgICAgICAgLy8gd2UgY2Fubm90IFwidHVybiBvZmZcIiBiaW5kZXIub24gd2hlbiBpdHMgdmFsdWUgaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGRldmVsb3BlciBuZWVkcyB0byBjbGVhbiBtZW1vcnkgKHR1cm4gb2ZmIGNhbGxiYWNrKSBtYW51YWx5IGluIGJpbmRlci5kZXN0cm95XG4gICAgICAgICAgICBpZighbm9kZUhhbmRsZXIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBydW5Ob2RlSGFuZGxlcih7XG4gICAgICAgICAgICAgICAgICAgIGRvbUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBiaW5kaW5nT3B0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETyB0aHJvdyBlcnJvciB3aGVuIFwib25cIiBhbmQgbWF5YmUgb3RoZXIgYmluZGVyIHByb3BlcnRpZXMgaGFzIHdyb25nIHR5cGVcbiAgICAgICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb24uY2FsbChub2RlLCBub2RlSGFuZGxlciwgYmluZGluZ09wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvbiA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG4gICAgICAgICAgICBub2ZuLmZvckVhY2gob24uc3BsaXQoc3BhY2VSZWcpLFxuICAgICAgICAgICAgICAgIGV2dE5hbWUgPT4gbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgYmluZGluZyBkYXRhIHRvIGJpbmRpbmdzIGFycmF5XG4gICAgYmluZGluZ3MucHVzaCh7XG4gICAgICAgIG9uLFxuICAgICAgICBub2RlLFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIG9iamVjdEhhbmRsZXIsXG4gICAgICAgIG5vZGVIYW5kbGVyLFxuICAgICAgICBiaW5kaW5nT3B0aW9uc1xuICAgIH0pO1xuXG4gICAgLy8gZmlyZSBldmVudHNcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBjb25zdCBleHRlbmRlZEV2ZW50T3B0aW9ucyA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfSwgZXZlbnRPcHRpb25zKTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYGJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdmVudE9wdGlvbnMpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ2JpbmQnLCBleHRlbmRlZEV2ZW50T3B0aW9ucyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHRCaW5kZXJzIGZyb20gJy4vZGVmYXVsdGJpbmRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmYXVsdEJpbmRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9IGRlZmF1bHRCaW5kZXJzW2ldLmNhbGwobm9kZSwgbm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb29rZm9yYmluZGVyLmpzXG4gKiovIiwiaW1wb3J0IGlucHV0IGZyb20gJy4vYmluZGVycy9pbnB1dCc7XG5pbXBvcnQgdGV4dGFyZWEgZnJvbSAnLi9iaW5kZXJzL3RleHRhcmVhJztcbmltcG9ydCBzZWxlY3QgZnJvbSAnLi9iaW5kZXJzL3NlbGVjdCc7XG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAnLi9iaW5kZXJzL3Byb2dyZXNzJztcbmltcG9ydCBvdXRwdXQgZnJvbSAnLi9iaW5kZXJzL291dHB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IFtub2RlID0+IHtcbiAgICBzd2l0Y2gobm9kZS50YWdOYW1lKSB7XG4gICAgICAgIGNhc2UgJ0lOUFVUJzpcbiAgICAgICAgICAgIHJldHVybiBpbnB1dChub2RlLnR5cGUpO1xuICAgICAgICBjYXNlICdURVhUQVJFQSc6XG4gICAgICAgICAgICByZXR1cm4gdGV4dGFyZWEoKTtcbiAgICAgICAgY2FzZSAnU0VMRUNUJzpcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Qobm9kZS5tdWx0aXBsZSk7XG4gICAgICAgIGNhc2UgJ1BST0dSRVNTJzpcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcygpO1xuICAgICAgICBjYXNlICdPVVRQVVQnOlxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dCgpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufV07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWZhdWx0YmluZGVycy5qc1xuICoqLyIsImltcG9ydCBpcyBmcm9tICcuLi9fdXRpbC9pcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbi8vIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gYm91bmQgbm9kZSBpcyBjaGFuZ2VkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW5Ob2RlSGFuZGxlcih7XG4gICAgZG9tRXZlbnQgPSB7fSxcbiAgICBvYmplY3QsXG4gICAga2V5LFxuICAgIG5vZGUsXG4gICAgcHJvcERlZixcbiAgICBiaW5kZXIsXG4gICAgYmluZGluZ09wdGlvbnNcbn0pIHtcbiAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcHJvcERlZi52YWx1ZTtcbiAgICBjb25zdCB7IHdoaWNoLCB0YXJnZXQgfSA9IGRvbUV2ZW50O1xuICAgIGNvbnN0IHsgZ2V0VmFsdWUgfSA9IGJpbmRlcjtcbiAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgbm9mbi5hc3NpZ24oe1xuICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICBkb21FdmVudCxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZG9tRXZlbnQub3JpZ2luYWxFdmVudCB8fCBkb21FdmVudCwgLy8galF1ZXJ5IHRoaW5nXG4gICAgICAgIC8vIHdpbGwgdGhyb3cgXCJwcmV2ZW50RGVmYXVsdCBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgIHByZXZlbnREZWZhdWx0OiAoKSA9PiBkb21FdmVudC5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgICAvLyB3aWxsIHRocm93IFwic3RvcFByb3BhZ2F0aW9uIGlzIG5vdCBhIGZ1bmN0aW9uXCIgd2hlbiBkb21FdmVudCBpcyBlbXB0eSBvYmplY3RcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiAoKSA9PiBkb21FdmVudC5zdG9wUHJvcGFnYXRpb24oKSxcbiAgICAgICAgd2hpY2gsXG4gICAgICAgIHRhcmdldFxuICAgIH0sIGJpbmRpbmdPcHRpb25zKSk7XG5cbiAgICBpZiAoIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAvLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBvZiBhIGhhY2tcbiAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgY2hhbmdlZE5vZGUsIG9uQ2hhbmdlVmFsdWUsIGJpbmRlcj9cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuICAgICAgICAgICAgZnJvbU5vZGU6IHRydWUsXG4gICAgICAgICAgICBjaGFuZ2VkTm9kZTogbm9kZSxcbiAgICAgICAgICAgIG9uQ2hhbmdlVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgYmluZGVyXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1xuICoqLyIsIi8vIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gcHJvcGVydHkgdmFsdWUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuT2JqZWN0SGFuZGxlcih7XG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBiaW5kaW5nT3B0aW9ucyxcbiAgICBldmVudE9wdGlvbnNcbn0pIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wRGVmO1xuICAgIGNvbnN0IHsgb25DaGFuZ2VWYWx1ZSwgY2hhbmdlZE5vZGUsIGJpbmRlcjogZXZ0QmluZGVyIH0gPSBldmVudE9wdGlvbnM7XG4gICAgY29uc3QgeyBzZXRWYWx1ZSB9ID0gYmluZGVyO1xuICAgIC8vIGRpcnR5IGhhY2sgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyZXNoa2Fqcy9tYXRyZXNoa2EvaXNzdWVzLzE5XG4gICAgY29uc3QgZGlydHlIYWNrVmFsdWUgPSBvbkNoYW5nZVZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgID8gU3RyaW5nKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgaWYgKGNoYW5nZWROb2RlID09PSBub2RlICYmIG9uQ2hhbmdlVmFsdWUgPT09IGRpcnR5SGFja1ZhbHVlICYmIGV2dEJpbmRlciA9PT0gYmluZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZS5jYWxsKG5vZGUsIHZhbHVlLCBub2ZuLmFzc2lnbih7IHZhbHVlIH0sIGJpbmRpbmdPcHRpb25zKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qc1xuICoqLyIsIi8qIGVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJldnRcIl0gfV0qL1xuaW1wb3J0IGluaXRNSyBmcm9tICcuLi9fY29yZS9pbml0JztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuLi9fY29yZS9kZWZpbmVwcm9wJztcblxuLy8gcHJvcGVydHkgbW9kaWZpZXIgZXZlbnQgcmVnZXhwXG5jb25zdCBwcm9wTW9kRXZlbnRSZWdcbiAgICA9IC9eX2NoYW5nZTpkZXBzOnxeX2NoYW5nZTpiaW5kaW5nczp8Xl9jaGFuZ2U6ZGVsZWdhdGVkOnxeX2NoYW5nZTp0cmVlOnxeY2hhbmdlOnxeYmVmb3JlY2hhbmdlOi87XG5cbi8vIGFkZHMgc2ltcGxlIGV2ZW50IGxpc3RlbmVyXG4vLyB1c2VkIGFzIGNvcmUgb2YgZXZlbnQgZW5naW5lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCBjdHggPSBjb250ZXh0IHx8IG9iamVjdDtcbiAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG4gICAgY29uc3QgZXZ0ID0geyBjYWxsYmFjaywgY29udGV4dCwgY3R4LCBuYW1lLCBpbmZvIH07XG5cblxuICAgIC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lXG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgZGF0YSwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBldnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBpZiAoKGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjay5fY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICYmIGV2dC5jb250ZXh0ID09PSBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGV2ZW50IGlzbid0IGZvdW5kIGFkZCBpdCB0byB0aGUgZXZlbnQgbGlzdFxuICAgICAgICBldmVudHMucHVzaChldnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lLCBjcmVhdGUgYXJyYXkgd2l0aCBvbmx5IGViZW50XG4gICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IFtldnRdO1xuICAgIH1cblxuICAgIGlmIChwcm9wTW9kRXZlbnRSZWcudGVzdChuYW1lKSkge1xuICAgICAgICAvLyBkZWZpbmUgbmVlZGVkIGFjY2Vzc29ycyBmb3IgS0VZXG4gICAgICAgIGRlZmluZVByb3Aob2JqZWN0LCBuYW1lLnJlcGxhY2UocHJvcE1vZEV2ZW50UmVnLCAnJykpO1xuICAgIH1cblxuICAgIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGBhZGRldmVudDoke25hbWV9YCwgZXZ0KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdhZGRldmVudCcsIGV2dCk7XG4gICAgfVxuXG4gICAgLy8gaWYgZXZlbnQgaXMgYWRkZWQgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCBnaXZlbkRlbGF5LCB0aGlzQXJnKSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgbGV0IGRlbGF5O1xuICAgIGlmICh0eXBlb2YgZGVsYXkgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRoaXNBcmcgPSBnaXZlbkRlbGF5OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRlbGF5ID0gMDtcbiAgICB9XG5cbiAgICBkZWxheSA9IGdpdmVuRGVsYXkgfHwgMDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGNvbnN0IFthMSwgYTJdID0gYXJncztcbiAgICAgICAgY29uc3QgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IHRoaXNBcmcgfHwgdGhpcztcblxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGFyZ3NMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0LCBhMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0LCBhMSwgYTIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNhbGxDb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9kZWJvdW5jZS5qc1xuICoqLyIsIi8qIGVzbGludCBuby11c2UtYmVmb3JlLWRlZmluZTogW1wiZXJyb3JcIiwgeyBcImZ1bmN0aW9uc1wiOiBmYWxzZSB9XSovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCBpcyBmcm9tICcuLi9fdXRpbC9pcyc7XG5cbmNvbnN0IHRyZWVDaGFuZ2VFdnRSZWcgPSAvXl9jaGFuZ2U6dHJlZTovO1xuXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKHtcbiAgICBwcmV2aW91c1ZhbHVlLFxuICAgIHZhbHVlXG59LCB7XG4gICAgcGF0aCxcbiAgICBuYW1lLFxuICAgIGNhbGxiYWNrLFxuICAgIGNvbnRleHRcbn0gPSB0cmlnZ2VyT25lLmxhdGVzdEV2ZW50LmluZm8uZGVsZWdhdGVkRGF0YSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIodmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKHByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIHRyZWUgY2hhbmdlIGV2ZW50IHdoaWNoIGlzIHVzZWQgYnkgYmluZGluZ3MgbG9naWNcbiAgICBpZiAodHJlZUNoYW5nZUV2dFJlZy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUtleSA9IG5hbWUucmVwbGFjZSh0cmVlQ2hhbmdlRXZ0UmVnLCAnJyk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUgJiYgIWlzKHByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSwgdmFsdWVbY2hhbmdlS2V5XSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZXZlbnRzIH0gPSBkZWZzLmdldCh2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCB0cmVlQ2hhbmdlRXZ0TmFtZSA9IGBfY2hhbmdlOnRyZWU6JHtjaGFuZ2VLZXl9YDtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZUV2ZW50cyA9IGV2ZW50c1t0cmVlQ2hhbmdlRXZ0TmFtZV07XG4gICAgICAgICAgICBpZiAoY2hhbmdlRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlck9uZSh2YWx1ZSwgdHJlZUNoYW5nZUV2dE5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVbY2hhbmdlS2V5XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGdpdmVuUGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAvLyBpZiB0eXBlb2YgcGF0aCBpcyBzdHJpbmcgYW5kIHBhdGggaXMgbm90IGVtcHR5IHN0cmluZyB0aGVuIHNwbGl0IGl0XG4gICAgbGV0IHBhdGggPSB0eXBlb2YgZ2l2ZW5QYXRoID09PSAnc3RyaW5nJyAmJiBnaXZlblBhdGggIT09ICcnID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBnaXZlblBhdGg7XG5cbiAgICBpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG5vIHBhdGggdGhlbiBhZGQgc2ltcGxlIGxpc3RlbmVyXG4gICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XG4gICAgICAgIGxldCBwYXRoU3RyO1xuXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZWREYXRhID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IFwic2V0XCJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuICAgICAgICAgICAgZGVsZWdhdGVkRGF0YSxcbiAgICAgICAgICAgIHBhdGhTdHJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIG1hbnVhbGx5XG4gICAgICAgIGNoYW5nZUhhbmRsZXIoe1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldXG4gICAgICAgIH0sIGRlbGVnYXRlZERhdGEpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIlxueGRlc2NyaWJlKCdCaW5kaW5ncyBwYXJzZXInLCAoKSA9PiB7XG5cdGl0KCdzaG91bGQgYmluZCBIVE1MJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxzcGFuPnt7eH19PC9zcGFuPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG5cbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdoaSc7XG4gICAgICAgIGV4cGVjdChub2RlLmZpcnN0Q2hpbGQuaW5uZXJIVE1MKS50b0VxdWFsKG9iamVjdC54KTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIEhUTUwgdXNpbmcgTWF0cmVzaGthIGluc3RhbmNlIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8c3Bhbj57e3h9fTwvc3Bhbj4nKSxcbiAgICAgICAgICAgIG1rID0gbmV3IE1LO1xuXG4gICAgICAgIG1rLnBhcnNlQmluZGluZ3Mobm9kZSk7XG4gICAgICAgIG1rLnggPSAnaGknO1xuICAgICAgICBleHBlY3Qobm9kZS5maXJzdENoaWxkLmlubmVySFRNTCkudG9FcXVhbChtay54KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHZhbHVlPVwie3t4fX1cIj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2hleSc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBjaGVja2VkJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwie3t4fX1cIj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gdHJ1ZTtcbiAgICAgICAgZXhwZWN0KG5vZGUuY2hlY2tlZCkudG9FcXVhbChvYmplY3QueCk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdGV4dGFyZWFzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzx0ZXh0YXJlYSB2YWx1ZT1cInt7eH19XCI+PC90ZXh0YXJlYT4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBjb21wbGV4IGF0dHJzJywgKCkgPT4ge3dpbmRvdy5vbG9sb3NoYSA9IHRydWU7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGEgaHJlZj1cInt7eH19L3t7eX19XCI+PC9hPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LnkgPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdocmVmJykpLnRvRXF1YWwob2JqZWN0LnggKyAnLycgKyBvYmplY3QueSk7d2luZG93Lm9sb2xvc2hhID0gZmFsc2U7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgY29tcGxleCB2YWx1ZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHZhbHVlPVwie3t4fX0gYW5kIHt7eX19XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdmb28nO1xuICAgICAgICBvYmplY3QueSA9ICdiYXInO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCArICcgYW5kICcgKyBvYmplY3QueSk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkbnQgY3JlYXRlIGFkZGl0aW9uYWwgcHJvcGVydGllcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJ7e3h9fSBhbmQge3t5fX1cIj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Jhcic7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54ICsgJyBhbmQgJyArIG9iamVjdC55KTtcbiAgICAgICAgZXhwZWN0KE9iamVjdC5rZXlzKG9iamVjdCkpLnRvRXF1YWwoWyd4JywgJ3knXSk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgbmVzdGVkIG5vZGVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoYFxuICAgICAgICAgICAgPGRpdj57e3h9fVxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cInt7eX19XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImhleSB7e3p9fVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKSxcbiAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnZm9vJztcbiAgICAgICAgb2JqZWN0LnkgPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LnogPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUuaW5uZXJIVE1MLmluZGV4T2YoJzxzcGFuPicgKyBvYmplY3QueCArICc8L3NwYW4+JykpLnRvRXF1YWwoMCk7XG4gICAgICAgIGV4cGVjdChxKCdpbnB1dCcsIG5vZGUpLnZhbHVlKS50b0VxdWFsKG9iamVjdC55KTtcbiAgICAgICAgZXhwZWN0KHEoJ1thdHRyXScsIG5vZGUpLmdldEF0dHJpYnV0ZSgnYXR0cicpKS50b0VxdWFsKCdoZXkgJyArIG9iamVjdC56KTtcbiAgICAgICAgZXhwZWN0KE9iamVjdC5rZXlzKG9iamVjdCkuc29ydCgpKS50b0VxdWFsKFsneCcsICd5JywgJ3onXSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIG5lc3RlZCBub2RlcyBhbmQgZGVlcCBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoYFxuICAgICAgICAgICAgPGRpdj57e2EuYn19XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwie3tjLmR9fVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGF0dHI9XCJoZXkge3tlLmZ9fVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKSxcbiAgICAgICAgb2JqZWN0ID0ge1xuICAgICAgICAgICAgYToge2I6IDF9LFxuICAgICAgICAgICAgYzoge2Q6IDJ9LFxuICAgICAgICAgICAgZToge2Y6IDJ9XG4gICAgICAgIH07XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LmEuYiA9ICdmb28nO1xuICAgICAgICBvYmplY3QuYy5kID0gJ2Jhcic7XG4gICAgICAgIG9iamVjdC5lLmYgPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUuaW5uZXJIVE1MLmluZGV4T2YoJzxzcGFuPicgKyBvYmplY3QuYS5iICsgJzwvc3Bhbj4nKSkudG9FcXVhbCgwKTtcbiAgICAgICAgZXhwZWN0KHEoJ2lucHV0Jywgbm9kZSkudmFsdWUpLnRvRXF1YWwob2JqZWN0LmMuZCk7XG4gICAgICAgIGV4cGVjdChxKCdbYXR0cl0nLCBub2RlKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKSkudG9FcXVhbCgnaGV5ICcgKyBvYmplY3QuZS5mKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdoZW4gYnJhY2tldHMgYXJlIHJlZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJbW3hdXSB5b3VcIj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9LFxuXHRcdFx0ZGVmYXVsdEJyYWNrZXRzID0gbWFnaWMucGFyc2VyQnJhY2tldHM7XG5cblx0XHRtYWdpYy5wYXJzZXJCcmFja2V0cyA9IHtcblx0XHRcdGxlZnQ6ICdbWycsXG5cdFx0XHRyaWdodDogJ11dJ1xuXHRcdH07XG5cbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdoZXknO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCArICcgeW91Jyk7XG5cblx0XHRtYWdpYy5wYXJzZXJCcmFja2V0cyA9IGRlZmF1bHRCcmFja2V0cztcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3BhcnNlcl9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGJpbmROb2RlIGZyb20gJ3NyYy9iaW5kbm9kZSc7XG5pbXBvcnQgYmluZE9wdGlvbmFsTm9kZSBmcm9tICdzcmMvYmluZG9wdGlvbmFsbm9kZSc7XG5pbXBvcnQgYmluZFNhbmRib3ggZnJvbSAnc3JjL2JpbmRzYW5kYm94JztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJ3NyYy91bmJpbmRub2RlJztcbmltcG9ydCBzZWxlY3QgZnJvbSAnc3JjL3NlbGVjdCc7XG5pbXBvcnQgc2VsZWN0QWxsIGZyb20gJ3NyYy9zZWxlY3RhbGwnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdCaW5kaW5ncycsICgpID0+IHtcbiAgICBjb25zdCBub0RlYm91bmNlRmxhZyA9IHsgZGVib3VuY2U6IGZhbHNlIH07XG4gICAgbGV0IG9iajtcbiAgICBsZXQgbm9kZTtcbiAgICBsZXQgYmluZGVyO1xuICAgIGxldCBzaW11bGF0ZURvbUV2ZW50O1xuICAgIGxldCBpbml0aWFsaXplQ2FsbDtcbiAgICBsZXQgZGVzdHJveUNhbGw7XG5cbiAgICBjb25zdCB0ZXN0U2ltcGxlQmluZCA9IChrZXkgPSAneCcpID0+IHtcbiAgICAgICAgb2JqW2tleV0gPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmpba2V5XSkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChpbml0aWFsaXplQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH07XG5cbiAgICBjb25zdCB0ZXN0U2ltcGxlVW5iaW5kID0gKCkgPT4ge1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmF6JztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgZXhwZWN0KGRlc3Ryb3lDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGluaXRpYWxpemVDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGRlc3Ryb3lDYWxsID0gY3JlYXRlU3B5KCk7XG5cbiAgICAgICAgYmluZGVyID0gIHtcbiAgICAgICAgICAgIG9uKGNiYykge1xuICAgICAgICAgICAgICAgIHRoaXMub25kdW1teWV2ZW50ID0gY2JjO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbHVlKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0aWFsaXplKG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZUNhbGwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5vbmR1bW15ZXZlbnQgPSAoKSA9PiB7fTtcbiAgICAgICAgICAgICAgICBkZXN0cm95Q2FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBkZWJvdW5jZScsIGRvbmUgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyKTtcbiAgICAgICAgb2JqLnggPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJycpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgICAgICBleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICAgICAgZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBhbmQgdHJpZ2dlciBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJpbmRDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGNvbnN0IGJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2JpbmQnLCBiaW5kQ2FsbCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2JpbmQ6eCcsIGJpbmRLZXlDYWxsKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgICAgICBleHBlY3QoYmluZENhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBhbmQgdHJpZ2dlciBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVuYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgdW5iaW5kS2V5Q2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQnLCB1bmJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAndW5iaW5kOngnLCB1bmJpbmRLZXlDYWxsKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3QodW5iaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QodW5iaW5kS2V5Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCB7IHg6IG5vZGUgfSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB1bmJpbmQgd25lIHdyb25nIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHdyb25nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIHdyb25nTm9kZSk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB1bmJpbmQgd25lIHdyb25nIGtleSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3knLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIHdoZW4gbm9kZSBpcyBub3QgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jyk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFsbCB3aGVuIG5laXRoZXIga2V5IG5vciBub2RlIGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIHsgeDogbm9kZSB9KTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGFycmF5IG9mIG9iamVjdHMnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgW3sga2V5OiAneCcsIG5vZGUsIGJpbmRlciB9XSwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSB9XSk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBhIHByb3BlcnR5IGluIGNvbnRleHQgb2JqZWN0IHdoaWNoIGhhcyBpc01LPXRydWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGJpbmROb2RlLmNhbGwob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvRXF1YWwobm9kZSk7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20ob2JqLiRub2Rlcy54KVxuICAgICAgICApLnRvRXF1YWwoW25vZGVdKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICAgICAgZXhwZWN0KG9iai5ub2Rlcy54KS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChvYmouJG5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSk7XG4gICAgICAgIG9iai54LnkueiA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnZm9vJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuY2VscyBkZWVwIGJpbmRpbmcgd2hlbiBkZWVwPWZhbHNlIG9wdGlvbiBpcyBwYXNzZWQnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGRlZXA6IGZhbHNlXG4gICAgICAgIH0sIG5vRGVib3VuY2VGbGFnKSk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCd4LnkueicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55LnonLCAnZ28nKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgb2JqLnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVtb3ZlIGJpbmRpbmcgaWYgZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgY29uc3QgeCA9IG9iai54O1xuXG4gICAgICAgIG9iai54ID0gbWFrZU9iamVjdCgneS56JywgJ2ZvbycpO1xuXG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIHdpbmRvdy50YXJnZXQgPSBvYmoueC55O1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgeC55LnogPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgY3VzdG9tIHNlbGVjdG9ycyBvbiBjdXJyZW50IHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55JywgJ2ZvbycpO1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG5cbiAgICAgICAgYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIG5vZGUpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnknLCAnOnNhbmRib3ggc3BhbicsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXG4gICAgICAgIGV4cGVjdChjaGlsZE5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBjaGlsZE5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgY2hpbGROb2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueSkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdChgdGhyb3dzIGVycm9yIHdoZW4gbm9kZSBpc24ndCB0aGVyZWAsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoYGRvZXNuJ3QgdGhyb3cgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlIGFuZCBvcHRpb25hbD10cnVlIGlzIGdpdmVuYCwgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXNuXFwndCB0aHJvdyBlcnJvciB3aXRoIGJpbmRPcHRpb25hbE5vZGUgbWV0aG9kIG9mIE1hdHJlc2hrYSB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmRPcHRpb25hbE5vZGUob2JqLCAneCcpO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbGVjdHMgY2hpbGRyZW4gb2Ygc2FuZGJveCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGF0dHI9XCJmb29cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJ3NwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICdzcGFuJylbMF0uZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZWxlY3RzIG5vZGVzIHdpdGggY3VzdG9tIHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImZvb1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOnNhbmRib3ggc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6c2FuZGJveCBzcGFuJylbMF0uZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOnNhbmRib3ggdGFibGUnKVxuICAgICAgICApLnRvRXF1YWwobnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSB0YWJsZScpXG4gICAgICAgICkudG9FcXVhbChudWxsKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCkgdGFibGUnKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW10pO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpzYW5kYm94IHRhYmxlJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFtdKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gYmluZCBhbmQgcmViaW5kIHNhbmRib3ggdmlhIGJpbmRTYW5kYm94JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhbm90aGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGJpbmRTYW5kYm94LmNhbGwob2JqLCBub2RlLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIGJpbmRTYW5kYm94LmNhbGwob2JqLCBhbm90aGVyTm9kZSwgbm9EZWJvdW5jZUZsYWcpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbYW5vdGhlck5vZGVdKTtcbiAgICB9KTtcblxuICAgIGl0KCdiaW5kU2FuZGJveCB0aHJvd3MgYW4gZXJyb3Igd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmRTYW5kYm94LmNhbGwob2JqKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuXG4vLyBUT0RPIGRlc2NyaXB0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kT3B0aW9uYWxOb2RlKC4uLmFyZ3MpIHtcbiAgICAvLyB0aGlzIGhhY2sgYWxsb3dzIHRvIGtlZXAgYmluZE9wdGlvbmFsTm9kZSBhcyBjb21wYWN0IGFzIHBvc3NpYmxlXG4gICAgLy8gYW5kIGRvZXNuJ3QgcmVxdWlyZSB0byBmbGlwIGFyZ3MgYW5kIHN1cHBvZXIgYWxsIGJpbmROb2RlIHZhcmlhdGlvbnNcbiAgICBiaW5kTm9kZS50ZW1wb3JhcnlPcHRpb25hbEZsYWcgPSB0cnVlO1xuICAgIHJldHVybiBiaW5kTm9kZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG9wdGlvbmFsbm9kZS5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICcuL2JpbmRub2RlJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4vdW5iaW5kbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFNhbmRib3gob2JqZWN0LCBub2RlLCBldnQpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSBub2RlO1xuICAgICAgICBub2RlID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmRTYW5kYm94Jyk7XG4gICAgfVxuXG4gICAgdW5iaW5kTm9kZShvYmplY3QsICdzYW5kYm94JywgbnVsbCwgZXZ0KTtcbiAgICByZXR1cm4gYmluZE5vZGUob2JqZWN0LCAnc2FuZGJveCcsIG5vZGUsIG51bGwsIGV2dCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kc2FuZGJveC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vX2RvbSc7XG5pbXBvcnQgc2VsZWN0Tm9kZXMgZnJvbSAnLi9fYmluZGluZ3Mvc2VsZWN0bm9kZXMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi9fdXRpbC90b2FycmF5JztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclRlc3RSZWcgPSAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdChvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgc2VsZWN0b3IgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnc2VsZWN0QWxsJyk7XG4gICAgfVxuXG5cdGlmIChjdXN0b21TZWxlY3RvclRlc3RSZWcudGVzdChzZWxlY3RvcikpIHtcblx0XHRyZXR1cm4gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3RvcilbMF0gfHwgbnVsbDtcblx0fSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgICAgICBpZiAoIWRlZiB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHMuc2FuZGJveDtcblxuICAgICAgICBpZiAoIXByb3BEZWYpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgY29uc3QgeyBub2RlIH0gPSBiaW5kaW5nc1swXTtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cdH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZWxlY3QuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL3NlbGVjdG5vZGVzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4vX3V0aWwvdG9hcnJheSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JUZXN0UmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3RBbGwob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIHNlbGVjdG9yID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NlbGVjdEFsbCcpO1xuICAgIH1cblxuXG5cdGlmIChjdXN0b21TZWxlY3RvclRlc3RSZWcudGVzdChzZWxlY3RvcikpIHtcblx0XHRyZXR1cm4gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcik7XG5cdH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRvbS4kKCk7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAgICAgaWYgKCFkZWYgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHMuc2FuZGJveDtcblxuICAgICAgICBpZiAoIXByb3BEZWYpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG4gICAgICAgIGlmKGJpbmRpbmdzKSB7XG4gICAgICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsICh7IG5vZGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblx0fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlbGVjdGFsbC5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgbmVzdGVkIG9iamVjdCBiYXNlZCBvbiBwYXRoIGFuZCBsYXN0VmFsdWVcbi8vIGV4YW1wbGU6IG1ha2VPYmplY3QoJ2EuYi5jJywgNDIpIC0+IHthOiB7Yjoge2M7IDQyfX19XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlT2JqZWN0KGdpdmVuUGF0aCA9ICcnLCBsYXN0VmFsdWUgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBnaXZlblBhdGggPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGxldCBvYmogPSByZXN1bHQ7XG4gICAgbGV0IGtleTtcblxuXG4gICAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICBrZXkgPSBwYXRoLnNoaWZ0KCk7XG4gICAgICAgIG9iaiA9IG9ialtrZXldID0ge307XG4gICAgfVxuXG4gICAgb2JqW3BhdGguc2hpZnQoKV0gPSBsYXN0VmFsdWU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3B5KCkge1xuICAgIGNvbnN0IHNweU5hbWUgPSBgcmFuZG9tTmFtZSR7TWF0aC5yYW5kb20oKX0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG4gICAgY29uc3Qgc3B5ID0gKCkgPT4ge307XG4gICAgY29uc3Qgc3B5T2JqID0ge307XG4gICAgc3B5T2JqW3NweU5hbWVdID0gc3B5O1xuICAgIHJldHVybiBzcHlPbihzcHlPYmosIHNweU5hbWUpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9jcmVhdGVzcHkuanNcbiAqKi8iLCJpbXBvcnQge1xuXHR0ZXh0YXJlYSxcbiAgICBpbnB1dCxcbiAgICBzZWxlY3QsXG4gICAgb3V0cHV0LFxuICAgIHByb2dyZXNzXG59IGZyb20gJ3NyYy9iaW5kZXJzJztcblxuaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnc3JjL2xvb2tmb3JiaW5kZXInO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJ3NyYy9iaW5kbm9kZSc7XG5cbmRlc2NyaWJlKCdEZWZhdWx0IGJpbmRlcnMnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuXHRsZXQgb2JqO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKHtcbiAgICAgICAgICAgIGJpbmRlcnNFcXVhbDogKHV0aWwsIGN1c3RvbUVxdWFsaXR5VGVzdGVycykgPT4gKHtcbiAgICAgICAgICAgICAgICBjb21wYXJlOiAoYWN0dWFsLCBleHBlY3RlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFzcyA9IHJlc3VsdC5wYXNzID0gdXRpbC5lcXVhbHMoYWN0dWFsLm9uLCBleHBlY3RlZC5vbiwgY3VzdG9tRXF1YWxpdHlUZXN0ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdXRpbC5lcXVhbHMoYCR7YWN0dWFsLmdldFZhbHVlfWAsIGAke2V4cGVjdGVkLmdldFZhbHVlfWAsIGN1c3RvbUVxdWFsaXR5VGVzdGVycylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHV0aWwuZXF1YWxzKGAke2FjdHVhbC5zZXRWYWx1ZX1gLCBgJHtleHBlY3RlZC5zZXRWYWx1ZX1gLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlID0gcGFzcyA/ICdCaW5kZXJzIGFyZSBlcXVhbCcgOiAnQmluZGVycyBhcmUgbm90IGVxdWFsJ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG5cdFx0b2JqID0ge307XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHRleHRhcmVhJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblx0XHRub2RlLnZhbHVlID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHRleHRhcmVhKCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwodGV4dGFyZWEoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHByb2dyZXNzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnKTtcblx0XHRub2RlLm1heCA9IDM7XG4gICAgICAgIG5vZGUudmFsdWUgPSAxO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBwcm9ncmVzcygpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKDEpO1xuXHRcdG9iai54ID0gMjtcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgyKTtcblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHByb2dyZXNzKCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0IGlucHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRub2RlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgaW5wdXQoJ3RleHQnKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChpbnB1dCgndGV4dCcpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgb3V0cHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3V0cHV0Jyk7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIG91dHB1dCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLmlubmVySFRNTCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwob3V0cHV0KCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBzZWxlY3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYCR7aX1gO1xuICAgICAgICAgICAgaWYoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzZWxlY3QoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnMScpO1xuXHRcdG9iai54ID0gJzUnO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCc1Jyk7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChzZWxlY3QoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHNlbGVjdCAobXVsdGlwbGUpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIG5vZGUubXVsdGlwbGUgPSB0cnVlO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGAke2l9YDtcbiAgICAgICAgICAgIGlmKGkgPT09IDEgfHwgaSA9PT0gNCB8fCBpID09PSA3KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHNlbGVjdCh0cnVlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChbJzEnLCAnNCcsICc3J10pO1xuXHRcdG9iai54ID0gWycyJywgJzUnLCAnOCddO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgbm9kZS5vcHRpb25zW2ldLnNlbGVjdGVkXG4gICAgICAgICAgICApLnRvRXF1YWwoXG4gICAgICAgICAgICAgICAgaSA9PT0gMiB8fCBpID09PSA1IHx8IGkgPT09IDhcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHNlbGVjdCh0cnVlKSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9kZWZhdWx0X2JpbmRlcnNfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5hZGQnLCAoKSA9PiB7XG4gICAgaXQoJ2FkZHMgb25jZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWw0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKFtlbDEsIGVsMiwgZWwzXSkuYWRkKFtlbDIsIGVsMywgZWw0LCBlbDVdKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsMiwgZWwzLCBlbDQsIGVsNV0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvYWRkX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuY3JlYXRlJywgKCkgPT4ge1xuICAgIGl0KCdjcmVhdGVzIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnKS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnRElWJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBhIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2Zvb2JhcidcbiAgICAgICAgICAgIH0pLmNsYXNzTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ2Zvb2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NyZWF0ZXMgY2hpbGRlbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZTogJ3NwYW4nXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pLmNoaWxkcmVuWzBdLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZ2V0QXR0cmlidXRlKCdmb28nKVxuICAgICAgICApLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIG9iamVjdCB3aXRoIHRhZ05hbWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiAnZGl2J1xuICAgICAgICAgICAgfSkudGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ0RJVicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2V4dGVuZHMgZGF0YXNldCBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZ2V0QXR0cmlidXRlKCdkYXRhLWZvbycpXG4gICAgICAgICkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcbmltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2xpYi9zaW11bGF0ZWNsaWNrJztcblxuZGVzY3JpYmUoJ2JRdWVyeSBldmVudHMnLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuICAgIGxldCBjaGlsZDE7XG4gICAgbGV0IGNoaWxkMjtcbiAgICBsZXQgZ3JhbmRjaGlsZDE7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQxXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGQxXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDJcIj48L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQxJyk7XG4gICAgICAgIGNoaWxkMiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDInKTtcbiAgICAgICAgZ3JhbmRjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZDEnKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICAgICAgc3B5T24odGhpcywgJ2hhbmRsZXInKTtcbiAgICAgICAgaGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgICQoW3Rlc3RTYW5kYm94LCBjaGlsZDEsIGNoaWxkMiwgZ3JhbmRjaGlsZDFdKS5vZmYoJ2NsaWNrJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIG5hbWVzcGFjZWQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgYnViYmxpbmcgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChjbGljayBvbiBncmFuZGNoaWxkcmVuKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnRG9lc25cXHQgdHJpZ2dlciB3aGVuIGNsaWNrZWQgb24gd3JvbmcgY2hpbGQnLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQyJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIHNwZWNpZmllZCwgaGFuZGxlciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgbm90IHNwZWNpZmllZCwgaGFuZGxlciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdTdG9wcyBwcm9wYWdhdGlvbicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgICQoY2hpbGQxKS5vbignY2xpY2snLCBldnQgPT4gZXZ0LnN0b3BQcm9wYWdhdGlvbigpKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXG4gKiovIiwiLy8gc2ltdWxhdGVzIGNsaWNrIG9uIGEgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2ltdWxhdGVDbGljayhub2RlKSB7XG4gICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgICBldnQuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL3NpbXVsYXRlY2xpY2suanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uZmluZCcsICgpID0+IHtcbiAgICBsZXQgdGVzdFNhbmRib3g7XG4gICAgbGV0IGdyYW5kQ2hpbGQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgZ3JhbmRDaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmluZHMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKHRlc3RTYW5kYm94KS5maW5kKCcuZ3JhbmRjaGlsZCcpXG4gICAgICAgIF0pLnRvRXF1YWwoW2dyYW5kQ2hpbGRdKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeSBpbml0aWFsaXphdGlvbicsICgpID0+IHtcbiAgICBsZXQgdGVzdFNhbmRib3g7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTFcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtM1wiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyB3aW5kb3cnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQod2luZG93KTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwod2luZG93KTtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIGRvY3VtZW50JywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGRvY3VtZW50KTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwoZG9jdW1lbnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY29udmVydHMgYXJyYXktbGlrZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoY2hpbGRyZW4pO1xuXG4gICAgICAgIGV4cGVjdChjaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwocmVzdWx0Lmxlbmd0aCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXhwZWN0KGNoaWxkcmVuW2ldKS50b0VxdWFsKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdDb252ZXJ0cyBvbmUgZWxlbWVudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyonKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChlbGVtZW50KTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQpLnRvRXF1YWwocmVzdWx0WzBdKTtcbiAgICB9KTtcblxuICAgIGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoJy50ZXN0LTEnLCB0ZXN0U2FuZGJveCkubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoJy50ZXN0LTEnLCAnLndyb25nLWNvbnRleHQnKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byB1c2UgbnVsbCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJChudWxsKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byB1c2UgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCkubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gY3JlYXRlIHBsdWdpbnMnLCAoKSA9PiB7XG4gICAgICAgICQuZm4uYlF1ZXJ5UGx1Z2luID0gZnVuY3Rpb24gYlF1ZXJ5UGx1Z2luKCkge1xuICAgICAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoXG4gICAgICAgICAgICApLnRvRXF1YWwoXG4gICAgICAgICAgICAgICAgdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLmxlbmd0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbigkLmZuLCAnYlF1ZXJ5UGx1Z2luJyk7XG5cbiAgICAgICAgJCgnKicsIHRlc3RTYW5kYm94KS5iUXVlcnlQbHVnaW4oKTtcblxuICAgICAgICBleHBlY3QoJC5mbi5iUXVlcnlQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG4gICAgaXQoJ2NoZWNrcyBjbGFzc05hbWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICdlbCc7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJChlbCkuaXMoJy5lbCcpXG4gICAgICAgICkudG9FcXVhbCh0cnVlKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKGVsKS5pcygnLmVsMicpXG4gICAgICAgICkudG9FcXVhbChmYWxzZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pc19zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcbiAgICBpdCgnZXhjbHVkZXMgYnkgc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZWwyLmNsYXNzTmFtZSA9ICdlbDInO1xuXG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKFtlbDEsIGVsMiwgZWwzXSkubm90KCcuZWwyJylcbiAgICAgICAgXSkudG9FcXVhbChbZWwxLCBlbDNdKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5Lm9uZScsICgpID0+IHtcbiAgICBpdCgnZmluZHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDJcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQnKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLm9uZSgnKicsIHRlc3RTYW5kYm94KVxuICAgICAgICApLnRvRXF1YWwoY2hpbGQpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkucGFyc2VIVE1MJywgKCkgPT4ge1xuICAgIGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgY29udGV4dHVhbCBlbGVtZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzx0ZD48L3RkPjx0ZD48L3RkPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IENsYXNzIGZyb20gJ3NyYy9jbGFzcyc7XG5cbmRlc2NyaWJlKCdDbGFzcyBmdW5jdGlvbicsICgpID0+IHtcbiAgICBpdCgnYWxsb3dzIHRvIGluaGVyaXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IEEgPSBDbGFzcyh7IGE6IHRydWUgfSksXG4gICAgICAgICAgICBCID0gQ2xhc3MoeyBiOiB0cnVlLCBleHRlbmRzOiBBIH0pLFxuICAgICAgICAgICAgQyA9IENsYXNzKHsgYzogdHJ1ZSwgZXh0ZW5kczogQiB9KSxcbiAgICAgICAgICAgIGluc3QgPSBuZXcgQztcblxuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBCKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQykudG9CZVRydXRoeSgpO1xuXG4gICAgICAgIGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QuYikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdC5jKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3Mgc3RhdGljIHByb3BzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBBID0gQ2xhc3Moe30sIHsgc3RhdGljUHJvcDogdHJ1ZSB9KTtcbiAgICAgICAgZXhwZWN0KEEuc3RhdGljUHJvcCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2lmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGluc3QgPSBuZXcgQ2xhc3MoeyBhOiB0cnVlIH0pO1xuICAgICAgICBleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQ2xhc3MpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9jbGFzc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuL2V4dGVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENsYXNzKHByb3RvdHlwZSwgc3RhdGljUHJvcHMpIHtcbiAgICBjb25zdCBDb25zdHJ1Y3RvciA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0XG4gICAgICAgICAgICA/IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxuICAgICAgICAgICAgOiBmdW5jdGlvbiBFbXB0eUNvbnN0cnVjdG9yKCkge30sXG4gICAgICAgIC8vZXh0ZW5kcyBpcyBrZXB0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgIFBhcmVudCA9IHByb3RvdHlwZS5leHRlbmRzIHx8IHByb3RvdHlwZS5leHRlbmQsXG4gICAgICAgIC8vaW5oZXJpdCBwcm90byBmcm9tIGNsYXNzIHBhcmVudCBvciBlbXB0eSBvYmplY3RcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuY3JlYXRlKFBhcmVudCA/IFBhcmVudC5wcm90b3R5cGUgOiB7fSk7XG5cbiAgICBleHRlbmQocHJvdG8sIHByb3RvdHlwZSk7XG5cbiAgICBpZiAodHlwZW9mIHN0YXRpY1Byb3BzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBleHRlbmQoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICB9XG5cbiAgICAvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIHByb3RvLmluc3RhbmNlT2YgPSBmdW5jdGlvbiBpbnN0YW5jZU9mKCkge1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yO1xuICAgIH07XG5cbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90bztcblxuICAgIC8vIGlmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2VcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIENsYXNzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3MuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHt9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXS5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7fSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaChuZXcgTUsuQXJyYXkoe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgeTogbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICAgICAgYToge31cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LnkuYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoYmFzaWMpJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBsZXQgY3R4O1xuICAgIGxldCBoYW5kbGVyO1xuXG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY3R4ID0ge307XG4gICAgICAgIHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdmaXJlcyAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuICAgICAgICBjb25zdCBhID0gb2JqLmE7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuICAgICAgICB0cmlnZ2VyT25lKGEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUoYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBhID0gb2JqLmE7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcbiAgICAgICAgdHJpZ2dlck9uZShhLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBiID0gb2JqLmEuYjtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuICAgICAgICB0cmlnZ2VyT25lKGIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBjID0gb2JqLmEuYztcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShjLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lc25cXCd0IHJlbW92ZSBjaGFuZ2UgZXZlbnQgd2hlbiB1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcbiAgICAgICAgb2JqLmEuYi5jID0gNTU7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1c2VzIGNvcnJlY3QgY29udGV4dCBmb3IgZGVsZWdhdGVkIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgbGV0IGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGZ1bmN0aW9uIGhhbmRsZSgpIHtcbiAgICAgICAgICAgIGJvb2wgPSB0aGlzID09PSBjdHg7XG4gICAgICAgIH0sIGN0eCk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0NoYW5nZSBldmVudCAoc2ltcGxlIGFuZCBkZWxlZ2F0ZWQpJywgKCkgPT4ge1xuICAgIGxldCBoYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyBzaW1wbGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBzaW1wbGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIG51bGwgdGFyZ2V0IChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLngnLCAxKTtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBvYmouYS5iID0gbnVsbDtcbiAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0V2ZW50cyBjb3JlOiBhZGRMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXIsIHRyaWdnZXJPbmUnLCAoKSA9PiB7XG4gICAgbGV0IG9iajtcbiAgICBsZXQgY3R4O1xuICAgIGxldCBoYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBjdHggPSB7fTtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMCkpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTEpKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUyKSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvRXF1YWwoMTExKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBhcmdzKScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgbmFtZScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cblxueGRlc2NyaWJlKFwiRXZlbnRzIGNvcmU6IF9hZGRET01MaXN0ZW5lciwgX3JlbW92ZURPTUxpc3RlbmVyXCIsICgpID0+IHtcbiAgICBsZXQgcSA9IChzLCBjKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcbiAgICAgICAgICAgICAgICBldi5pbml0TW91c2VFdmVudChcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICB0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgMCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cbiAgICAgICAgICAgICAgICAgICAgMCAvKmxlZnQqLyAsIG51bGxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcbiAgICAgICAgdGFnTmFtZTogJ0RJVicsXG4gICAgICAgIGlkOiAnZC10ZXN0JyxcbiAgICAgICAgaW5uZXJIVE1MOiBgXG4gICAgICAgICAgICA8ZGl2IGlkPVwiZC10ZXN0LTFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC10ZXN0LTJcIj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9KSk7XG5cblxuXG4gICAgaXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG5cbiAgICBpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSBhbmQgcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIHRoZW4gYmluZHMgdGhlbiByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcsIDEsIDIpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvciAoYnViYmxpbmcgdGVzdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQgYW5kIGRvZXNuXFwndCByZW1vdmUgZXZlbnRzIGZyb20gb3RoZXIgbm9kZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmJsYWgnKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgndHJpZ2dlcnMgZXZlbnQgdmlhIFwidHJpZ2dlclwiIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRXZlbnRzIHN1bW1hcnkgKG9uLCBvZmYpJywgKCkgPT4ge1xuICAgIGxldCBxID0gKHMsIGMpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgIGV2LmluaXRNb3VzZUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuICAgICAgICAgICAgICAgICAgICAwIC8qbGVmdCovICwgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuICAgICAgICB0YWdOYW1lOiAnRElWJyxcbiAgICAgICAgaWQ6ICdzLXRlc3QnLFxuICAgICAgICBpbm5lckhUTUw6IGBcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJzLXRlc3QtMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzLXRlc3QtMlwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH0pKTtcblxuICAgIG5vZGUuY2xpY2sgPSBub2RlLmNsaWNrIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuICAgIH1cblxuICAgIGl0KCdmaXJlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuICAgICAgICBtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuICAgICAgICBtay5vbignc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLm9mZihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWsub24oJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtay5vZmYoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYzoge31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYzoge31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMub2ZmKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMub2ZmKG9iaiwgJ2NsaWNrOjp4Jyk7XG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgb25jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBtYWdpYy5vbmNlKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbmNlXCInLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBmMSA9IGV2dCA9PiBpKyssXG4gICAgICAgICAgICBmMiA9IGV2dCA9PiBqKys7XG5cbiAgICAgICAgbWFnaWMub25jZShvYmosIHtcbiAgICAgICAgICAgIGZvbzogZjEsXG4gICAgICAgICAgICBiYXI6IGYyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgZXhwZWN0KGopLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgbWsub25jZSgnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdvbkRlYm91bmNlIHdvcmtzJywgZG9uZSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICBtYWdpYy5vbkRlYm91bmNlKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbkRlYm91bmNlXCInLCAoZG9uZSkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGogPSAwLFxuICAgICAgICAgICAgZjEgPSBldnQgPT4gaSsrLFxuICAgICAgICAgICAgZjIgPSBldnQgPT4gaisrO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgICAgICBleHBlY3QoaikudG9CZSgxKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICBtYWdpYy5vbkRlYm91bmNlKG9iaiwge1xuICAgICAgICAgICAgZm9vOiBmMSxcbiAgICAgICAgICAgIGJhcjogZjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgODAwKTtcblxuICAgICAgICBtay5vbkRlYm91bmNlKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvblwiIGFuZCBcIm9mZlwiJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGhhbmRsZXJzID0ge1xuICAgICAgICAgICAgICAgIGZvbzogKCkgPT4gaSsrLFxuICAgICAgICAgICAgICAgIGJhcjogKCkgPT4gaSsrXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIE1LLm9uKG9iaiwgaGFuZGxlcnMpO1xuXG4gICAgICAgIE1LLnRyaWdnZXIob2JqLCAnZm9vJyk7XG4gICAgICAgIE1LLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMik7XG5cbiAgICAgICAgTUsub2ZmKG9iaiwgaGFuZGxlcnMpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnYWxsb3dzIHRvIGZsaXAgY29udGV4dCBhbmQgdHJpZ2dlck9uSW5pdCAob24pJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICB0aGlzQXJnID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICBNSy5vbihvYmosICdmb28nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9LCB0cnVlLCB0aGlzQXJnKTtcblxuICAgICAgICBNSy5vbihvYmosICdiYXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9LCB0aGlzQXJnLCB0cnVlKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcbiAgICB9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1xuICoqLyIsInZhciBtYXAgPSB7XG5cdFwiLi9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanNcIjogNTEsXG5cdFwiLi9fYmluZGluZ3MvZ2V0bm9kZXMuanNcIjogMjcsXG5cdFwiLi9fYmluZGluZ3MvcmVtb3ZlYmluZGluZy5qc1wiOiA1MCxcblx0XCIuL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1wiOiA1NCxcblx0XCIuL19iaW5kaW5ncy9ydW5vYmplY3RoYW5kbGVyLmpzXCI6IDU1LFxuXHRcIi4vX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXCI6IDI4LFxuXHRcIi4vX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcIjogNDYsXG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDIxLFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiAyMCxcblx0XCIuL19jb3JlL2luaXQuanNcIjogMTksXG5cdFwiLi9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXCI6IDMxLFxuXHRcIi4vX2RvbS9pbmRleC5qc1wiOiAzMCxcblx0XCIuL19ldmVudHMvYWRkbGlzdGVuZXIuanNcIjogNTYsXG5cdFwiLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcIjogNTgsXG5cdFwiLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXCI6IDQ5LFxuXHRcIi4vX2V2ZW50cy90cmlnZ2Vyb25lLmpzXCI6IDIzLFxuXHRcIi4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcIjogNDgsXG5cdFwiLi9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcIjogMjQsXG5cdFwiLi9fdXRpbC9kZWJvdW5jZS5qc1wiOiA1Nyxcblx0XCIuL191dGlsL2lzLmpzXCI6IDI2LFxuXHRcIi4vX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcIjogMjUsXG5cdFwiLi9fdXRpbC90b2FycmF5LmpzXCI6IDI5LFxuXHRcIi4vYXJyYXkuanNcIjogODcsXG5cdFwiLi9iaW5kZXJzL19jbGFzc2xpc3QuanNcIjogNyxcblx0XCIuL2JpbmRlcnMvYXR0ci5qc1wiOiA5LFxuXHRcIi4vYmluZGVycy9jbGFzc25hbWUuanNcIjogNixcblx0XCIuL2JpbmRlcnMvZGF0YXNldC5qc1wiOiAxNyxcblx0XCIuL2JpbmRlcnMvZGlzcGxheS5qc1wiOiA1LFxuXHRcIi4vYmluZGVycy9odG1sLmpzXCI6IDQsXG5cdFwiLi9iaW5kZXJzL2luZGV4LmpzXCI6IDMsXG5cdFwiLi9iaW5kZXJzL2lucHV0LmpzXCI6IDEwLFxuXHRcIi4vYmluZGVycy9vdXRwdXQuanNcIjogMTEsXG5cdFwiLi9iaW5kZXJzL3Byb2dyZXNzLmpzXCI6IDE0LFxuXHRcIi4vYmluZGVycy9wcm9wLmpzXCI6IDgsXG5cdFwiLi9iaW5kZXJzL3NlbGVjdC5qc1wiOiAxMyxcblx0XCIuL2JpbmRlcnMvc3R5bGUuanNcIjogMTYsXG5cdFwiLi9iaW5kZXJzL3RleHQuanNcIjogMTUsXG5cdFwiLi9iaW5kZXJzL3RleHRhcmVhLmpzXCI6IDEyLFxuXHRcIi4vYmluZG5vZGUuanNcIjogMTgsXG5cdFwiLi9iaW5kb3B0aW9uYWxub2RlLmpzXCI6IDYxLFxuXHRcIi4vYmluZHNhbmRib3guanNcIjogNjIsXG5cdFwiLi9icXVlcnkvX2RhdGEuanNcIjogNDAsXG5cdFwiLi9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcIjogMzQsXG5cdFwiLi9icXVlcnkvX2luaXQuanNcIjogMzMsXG5cdFwiLi9icXVlcnkvYWRkLmpzXCI6IDQzLFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZS5qc1wiOiAzOCxcblx0XCIuL2JxdWVyeS9maW5kLmpzXCI6IDQ1LFxuXHRcIi4vYnF1ZXJ5L2luZGV4LmpzXCI6IDMyLFxuXHRcIi4vYnF1ZXJ5L2lzLmpzXCI6IDQxLFxuXHRcIi4vYnF1ZXJ5L25vdC5qc1wiOiA0NCxcblx0XCIuL2JxdWVyeS9vZmYuanNcIjogNDIsXG5cdFwiLi9icXVlcnkvb24uanNcIjogMzksXG5cdFwiLi9icXVlcnkvb25lLmpzXCI6IDM3LFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbC5qc1wiOiAzNixcblx0XCIuL2NhbGMuanNcIjogOTUsXG5cdFwiLi9jbGFzcy5qc1wiOiA3OSxcblx0XCIuL2RlZmF1bHRiaW5kZXJzLmpzXCI6IDUzLFxuXHRcIi4vZXh0ZW5kLmpzXCI6IDM1LFxuXHRcIi4vaW5kZXguanNcIjogODgsXG5cdFwiLi9sb29rZm9yYmluZGVyLmpzXCI6IDUyLFxuXHRcIi4vbWFnaWMuanNcIjogOTEsXG5cdFwiLi9tYXRyZXNoa2EvaW5kZXguanNcIjogODksXG5cdFwiLi9vYmplY3QvaW5kZXguanNcIjogOTAsXG5cdFwiLi9vbi5qc1wiOiA5Mixcblx0XCIuL3BhcnNlYmluZGluZ3MuanNcIjogOTMsXG5cdFwiLi9zZWxlY3QuanNcIjogNjMsXG5cdFwiLi9zZWxlY3RhbGwuanNcIjogNjQsXG5cdFwiLi9zZXQuanNcIjogMjIsXG5cdFwiLi91bmJpbmRub2RlLmpzXCI6IDQ3XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDg2O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDg2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXkuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuLy9pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuXG5NYXRyZXNoa2EuQXJyYXkgPSBNYXRyZXNoa2FBcnJheTtcbk1hdHJlc2hrYS5PYmplY3QgPSBNYXRyZXNoa2FPYmplY3Q7XG5NYXRyZXNoa2EuQ2xhc3MgPSBDbGFzcztcbi8vTWF0cmVzaGthLmJpbmRlcnMgPSBiaW5kZXJzO1xuXG5leHBvcnQgZGVmYXVsdCBNYXRyZXNoa2E7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBDbGFzcyBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzKHtcbiAgICAvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuICAgIC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG4gICAgZXh0ZW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hdHJlc2hrYS9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYmplY3QvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFnaWMuanNcbiAqKi8iLCJcbi8vIC9eKChbXkBdKylAKT8oKC4rPykoOjooW15cXChcXCldKyk/KFxcKCguKilcXCkpPyk/KT8kL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbigpIHtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24uanNcbiAqKi8iLCIvL2ltcG9ydCBwYXJzZXJCcmFja2V0cyBmcm9tICcuL19iaW5kaW5ncy9wYXJzZXJicmFja2V0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2Rlcykge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYXJzZWJpbmRpbmdzLmpzXG4gKiovIiwiaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYWxjKG9iamVjdCwgdGFyZ2V0LCBzb3VyY2UsIGhhbmRsZXIsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IGhhbmRsZXI7XG4gICAgICAgIGhhbmRsZXIgPSBzb3VyY2U7XG4gICAgICAgIHNvdXJjZSA9IHRhcmdldDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdjYWxjJyk7XG4gICAgfVxuXG4gICAgLy9ldnQgPSBldnQgfHwge307XG4gICAgY29uc3QgZGVmcyA9IGluaXRNSyhvYmplY3QpO1xuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMuY2FsYyhbe3RhcmdldCwgc291cmNlLCBoYW5kbGVyLCBldmVudH1dLCBjb21tb25FdmVudCk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlLFxuICAgICAgICAgICAgICAgIGJpbmRlcjogaXRlbUJpbmRlcixcbiAgICAgICAgICAgICAgICBldmVudDogaXRlbUV2ZW50XG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnQgPSBub2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50ID0ge307XG5cblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBpdGVtRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNvbW1vbkV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJnbG9iYWxcIiBldmVudFxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgY29tbW9uRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FsYy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=