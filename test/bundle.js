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
	                var itemEventOptions = _ref.event;
	
	                var commonEventOptions = node;
	                var mergedEventOptions = {};
	
	                if (commonEventOptions) {
	                    var _result = mergedEventOptions;
	                    // extend event object by "global" event
	
	                    for (var _source2 = commonEventOptions, _keys2 = Object.keys(_source2), _l3 = _keys2.length, _i2 = 0, _key2; _i2 < _l3; _i2++) {
	                        _key2 = _keys2[_i2];
	                        _result[_key2] = _source2[_key2];
	                    }
	                }
	
	                if (itemEventOptions) {
	                    var _result2 = mergedEventOptions;
	                    // extend event object by "local" event ("event" key of an object)
	
	                    for (var _source4 = itemEventOptions, _keys4 = Object.keys(_source4), _l5 = _keys4.length, _i4 = 0, _key4; _i4 < _l5; _i4++) {
	                        _key4 = _keys4[_i4];
	                        _result2[_key4] = _source4[_key4];
	                    }
	                }
	
	                bindNode(object, itemKey, itemNode, itemBinder, mergedEventOptions);
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
		"./_core/defineprop.js": 21,
		"./_core/defs.js": 20,
		"./_core/init.js": 19,
		"./_dom/default-dollar.js": 31,
		"./_dom/index.js": 30,
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
		"./bindnode/_bindsinglenode.js": 51,
		"./bindnode/_getnodes.js": 27,
		"./bindnode/_runnodehandler.js": 54,
		"./bindnode/_runobjecthandler.js": 55,
		"./bindnode/_selectnodes.js": 28,
		"./bindnode/_switchbinding.js": 46,
		"./bindnode/index.js": 18,
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
		"./calc.js": 88,
		"./class.js": 79,
		"./defaultbinders.js": 53,
		"./extend.js": 35,
		"./index.js": 89,
		"./lookforbinder.js": 52,
		"./magic.js": 92,
		"./matreshka/index.js": 90,
		"./object/index.js": 91,
		"./off/_removelistener.js": 49,
		"./off/_undelegatelistener.js": 48,
		"./on/_addlistener.js": 56,
		"./on/_delegatelistener.js": 58,
		"./on/index.js": 93,
		"./parsebindings.js": 94,
		"./select.js": 63,
		"./selectall.js": 64,
		"./set.js": 22,
		"./trigger/_triggerone.js": 23,
		"./unbindnode/_removebinding.js": 50,
		"./unbindnode/index.js": 47
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
	
	var initMK = __webpack_require__(19);
	
	module.exports = calc;
	function calc(object, target, source, handler, eventOptions) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        eventOptions = handler;
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

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(90);
	
	var MatreshkaArray = __webpack_require__(87);
	
	var MatreshkaObject = __webpack_require__(91);
	
	var Class = __webpack_require__(79);
	
	//import binders from './binders';
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	//Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 90 */
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
/* 91 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";
	
	//import parserBrackets from './_bindings/parserbrackets';
	
	module.exports = parseBindings;
	function parseBindings(object, nodes) {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmNlMzYzZWMzODNhNjdlYzFlM2YiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9odG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9hdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9jaGVja29iamVjdHR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2dldG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL3RvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29mZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2FkZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L25vdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlL19zd2l0Y2hiaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy91bmJpbmRub2RlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvX3VuZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmL19yZW1vdmVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS9fcmVtb3ZlYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2JpbmRzaW5nbGVub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0YmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX3J1bm5vZGVoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9fcnVub2JqZWN0aGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24vX2FkZGxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24vX2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3BhcnNlcl9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kb3B0aW9uYWxub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kc2FuZGJveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3RhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvbWFrZW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9jcmVhdGVzcHkuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2RlZmF1bHRfYmluZGVyc19zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvYWRkX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9jcmVhdGVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2V2ZW50c19zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL3NpbXVsYXRlY2xpY2suanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9pbml0X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9pc19zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvbm90X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9jbGFzc19zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYyAuKlxcLmpzJCIsIndlYnBhY2s6Ly8vLi9zcmMvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRyZXNoa2EvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFnaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYXJzZWJpbmRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7QUFDQSxLQUFNLDJCQUEyQixFQUFqQzs7QUFFQTtBQUNBO0FBQ0EsS0FBTSxlQUFlLHNCQUFyQjs7QUFFQSxVQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDekIsU0FBTyx5QkFBeUIsT0FBekIsQ0FBaUMsSUFBakMsS0FBMEMsQ0FBakQ7QUFDQTs7QUFFRCxLQUFJLFdBQVcsYUFBYSxJQUFiLEdBQW9CLE1BQXBCLENBQTJCLFVBQTNCLENBQWY7O0FBRUE7QUFDQSxLQUFJLENBQUMsU0FBUyxNQUFkLEVBQXNCO0FBQ3JCLGFBQVcsYUFBYSxJQUFiLEVBQVg7QUFDQTs7QUFFRCxVQUFTLE9BQVQsQ0FBaUIsWUFBakI7O0FBR0EsS0FBTSxvQkFBb0IsdUJBQTFCO0FBQ0EsbUJBQWtCLElBQWxCLEdBQXlCLE9BQXpCLENBQWlDLGlCQUFqQyxFOzs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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R0FBa0IsY0FBbEI7QUFDQSxXQUFVLE1BQVYsR0FBbUIsZUFBbkI7QUFDQSxXQUFVLEtBQVYsR0FBa0IsS0FBbEI7QUFDQTs7a0JBRWUsUzs7Ozs7Ozs7a0NDWEksRTs7aUNBQ0QsRTs7a0JBRUgsTUFBTTtBQUNqQjs7QUFEaUIsRUFBTixFQUdaO0FBQ0M7QUFDQTtBQUZELEVBSFksQzs7Ozs7Ozs7a0JDSEEsQzs7Ozs7Ozs7a0JDQUEsQzs7Ozs7Ozs7QUNDZjs7a0JBRXdCLEU7QUFBVCxVQUFTLEVBQVQsR0FBYyxDQUU1QixDOzs7Ozs7OztBQ0xEOztrQkFFd0IsYTtBQUFULFVBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQixLQUEvQixFQUFzQyxDQUVwRCxDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmNlMzYzZWMzODNhNjdlYzFlM2ZcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanNcIjogNTksXG5cdFwiLi9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXCI6IDYwLFxuXHRcIi4vYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanNcIjogNjcsXG5cdFwiLi9icXVlcnkvYWRkX3NwZWMuanNcIjogNjgsXG5cdFwiLi9icXVlcnkvY3JlYXRlX3NwZWMuanNcIjogNjksXG5cdFwiLi9icXVlcnkvZXZlbnRzX3NwZWMuanNcIjogNzAsXG5cdFwiLi9icXVlcnkvZmluZF9zcGVjLmpzXCI6IDcyLFxuXHRcIi4vYnF1ZXJ5L2luaXRfc3BlYy5qc1wiOiA3Myxcblx0XCIuL2JxdWVyeS9pc19zcGVjLmpzXCI6IDc0LFxuXHRcIi4vYnF1ZXJ5L25vdF9zcGVjLmpzXCI6IDc1LFxuXHRcIi4vYnF1ZXJ5L29uZV9zcGVjLmpzXCI6IDc2LFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXCI6IDc3LFxuXHRcIi4vY2xhc3Nfc3BlYy5qc1wiOiA3OCxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXCI6IDgwLFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXCI6IDgxLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1wiOiA4Mixcblx0XCIuL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXCI6IDgzLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1wiOiA4NCxcblx0XCIuL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXCI6IDg1XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDE7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdGVzdC9zcGVjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IHtcblx0aHRtbCxcblx0dGV4dCxcblx0cHJvcCxcblx0YXR0cixcblx0Y2xhc3NOYW1lLFxuXHRkYXRhc2V0LFxuXHRzdHlsZSxcblx0ZGlzcGxheVxufSBmcm9tICdzcmMvYmluZGVycyc7XG5pbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcblxuZGVzY3JpYmUoJ0JpbmRlcnMnLCAoKSA9PiB7XG5cdGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcblx0Y29uc3QgZGF0YXNldEl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuZGF0YXNldCA/IGl0IDogeGl0O1xuXHRsZXQgb2JqO1xuXHRsZXQgbm9kZTtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHRvYmogPSB7fTtcblx0XHRub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHByb3AnLCAoKSA9PiB7XG5cdFx0bm9kZS5zb21lUHJvcCA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBwcm9wKCdzb21lUHJvcCcpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLnNvbWVQcm9wKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGF0dHInLCAoKSA9PiB7XG5cdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJywgJ2ZvbycpO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBhdHRyKCdzb21lUHJvcCcpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScpKS50b0VxdWFsKCdmb28nKTtcblx0XHRub2RlLnNldEF0dHJpYnV0ZSgnc29tZS1hdHRyaWJ1dGUnLCAnYmFyJyk7XG5cdFx0ZXhwZWN0KG5vZGUuZ2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScpKS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGh0bWwnLCAoKSA9PiB7XG5cdFx0bm9kZS5pbm5lckhUTUwgPSAnPGk+Zm9vPC9pPic7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGh0bWwoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnPGk+Zm9vPC9pPicpO1xuXHRcdG9iai54ID0gJzxiPmJhcjwvYj4nO1xuXHRcdGV4cGVjdChub2RlLmlubmVySFRNTCkudG9FcXVhbCgnPGI+YmFyPC9iPicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgdGV4dCcsICgpID0+IHtcblx0XHRub2RlLnRleHRDb250ZW50ID0gJzxpPmZvbzwvaT4nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCB0ZXh0KCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJzxpPmZvbzwvaT4nKTtcblx0XHRvYmoueCA9ICc8Yj5iYXI8L2I+Jztcblx0XHRleHBlY3Qobm9kZS50ZXh0Q29udGVudCkudG9FcXVhbCgnPGI+YmFyPC9iPicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgc3R5bGUnLCAoKSA9PiB7XG5cdFx0bm9kZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgc3R5bGUoJ3RleHRBbGlnbicpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdjZW50ZXInKTtcblx0XHRvYmoueCA9ICdyaWdodCc7XG5cdFx0ZXhwZWN0KG5vZGUuc3R5bGUudGV4dEFsaWduKS50b0VxdWFsKCdyaWdodCcpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgZGlzcGxheScsICgpID0+IHtcblx0XHRub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgZGlzcGxheSh0cnVlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChmYWxzZSk7XG5cdFx0b2JqLnggPSB0cnVlO1xuXHRcdGV4cGVjdChub2RlLnN0eWxlLmRpc3BsYXkpLnRvRXF1YWwoJycpO1xuXG5cdFx0bm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cdFx0YmluZE5vZGUob2JqLCAneScsIG5vZGUsIGRpc3BsYXkoZmFsc2UpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai55KS50b0VxdWFsKHRydWUpO1xuXHRcdG9iai55ID0gZmFsc2U7XG5cdFx0ZXhwZWN0KG5vZGUuc3R5bGUuZGlzcGxheSkudG9FcXVhbCgnJyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBjbGFzc05hbWUnLCAoKSA9PiB7XG5cdFx0Ly8gQElFOVxuXHRcdG5vZGUuY2xhc3NOYW1lID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGNsYXNzTmFtZSgnZm9vJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwodHJ1ZSk7XG5cdFx0b2JqLnggPSBmYWxzZTtcblx0XHRleHBlY3Qobm9kZS5jbGFzc05hbWUpLnRvRXF1YWwoJycpO1xuXG5cdFx0bm9kZS5jbGFzc05hbWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgY2xhc3NOYW1lKCdmb28nLCBmYWxzZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoZmFsc2UpO1xuXHRcdG9iai54ID0gdHJ1ZTtcblx0XHRleHBlY3Qobm9kZS5jbGFzc05hbWUpLnRvRXF1YWwoJycpO1xuXHR9KTtcblxuXHRkYXRhc2V0SXQoJ3Nob3VsZCBiaW5kIGRhdGFzZXQnLCAoKSA9PiB7XG5cdFx0Ly8gQElFOVxuXHRcdG5vZGUuZGF0YXNldC5mb28gPSAnYmFyJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgZGF0YXNldCgnZm9vJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuXHRcdG9iai54ID0gJ2Jheic7XG5cdFx0ZXhwZWN0KG5vZGUuZGF0YXNldC5mb28pLnRvRXF1YWwoJ2JheicpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGVyc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGh0bWwgZnJvbSAnLi9odG1sJztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheSc7XG5pbXBvcnQgY2xhc3NOYW1lIGZyb20gJy4vY2xhc3NuYW1lJztcbmltcG9ydCBwcm9wIGZyb20gJy4vcHJvcCc7XG5pbXBvcnQgYXR0ciBmcm9tICcuL2F0dHInO1xuaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuaW1wb3J0IG91dHB1dCBmcm9tICcuL291dHB1dCc7XG5pbXBvcnQgdGV4dGFyZWEgZnJvbSAnLi90ZXh0YXJlYSc7XG5pbXBvcnQgc2VsZWN0IGZyb20gJy4vc2VsZWN0JztcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL3Byb2dyZXNzJztcbmltcG9ydCB0ZXh0IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZSc7XG5pbXBvcnQgZGF0YXNldCBmcm9tICcuL2RhdGFzZXQnO1xuXG5leHBvcnQge1xuICAgIGh0bWwsXG4gICAgZGlzcGxheSxcbiAgICBjbGFzc05hbWUsXG4gICAgcHJvcCxcbiAgICBhdHRyLFxuICAgIGlucHV0LFxuICAgIG91dHB1dCxcbiAgICB0ZXh0YXJlYSxcbiAgICBzZWxlY3QsXG4gICAgcHJvZ3Jlc3MsXG4gICAgdGV4dCxcbiAgICBzdHlsZSxcbiAgICBkYXRhc2V0XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh0bWwoKSB7XG5cdHJldHVybiB7XG5cdFx0b246ICdpbnB1dCcsIC8vIHRoZSBldmVudCBuYW1lIGZpcmVzIG9ubHkgaW4gY29udGVudGVkaXRhYmxlIG1vZGVcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0aGlzLmlubmVySFRNTCA9IGAke3ZhbHVlfWA7XG5cdFx0fVxuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2h0bWwuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkaXNwbGF5KHN3aXRjaGVyPXRydWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogbnVsbCxcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3R5bGUuZGlzcGxheVxuICAgICAgICAgICAgICAgIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMpLmdldFByb3BlcnR5VmFsdWUoJ2Rpc3BsYXknKTtcbiAgICAgICAgICAgIGNvbnN0IG5vbmUgPSB2YWx1ZSA9PT0gJ25vbmUnO1xuICAgICAgICAgICAgcmV0dXJuIHN3aXRjaGVyID8gIW5vbmUgOiBub25lO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgeyBzdHlsZSB9ID0gdGhpcztcbiAgICAgICAgICAgIGlmKHN3aXRjaGVyKSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICdub25lJyA6ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanNcbiAqKi8iLCJpbXBvcnQge1xuICAgIHRvZ2dsZSxcbiAgICBjb250YWluc1xufSBmcm9tICcuL19jbGFzc2xpc3QuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbGFzc05hbWUoY2xhc3NOYW1lLCBzd2l0Y2hlcj10cnVlKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb250YWlucyh0aGlzLCBjbGFzc05hbWUpO1xuXHRcdFx0cmV0dXJuIHN3aXRjaGVyID8gdmFsdWUgOiAhdmFsdWU7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRvZ2dsZSh0aGlzLCBjbGFzc05hbWUsIHN3aXRjaGVyID8gISF2YWx1ZSA6ICF2YWx1ZSlcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2NsYXNzbmFtZS5qc1xuICoqLyIsIi8vIEBJRTlcblxubGV0IGFkZDtcbmxldCByZW1vdmU7XG5sZXQgY29udGFpbnM7XG5cbmlmKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmNsYXNzTGlzdCkge1xuICAgIGFkZCA9IChub2RlLCBuYW1lKSA9PiBub2RlLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgcmVtb3ZlID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICBjb250YWlucyA9IChub2RlLCBuYW1lKSA9PiBub2RlLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcbn0gZWxzZSB7XG4gICAgYWRkID0gKG5vZGUsIG5hbWUpID0+IHtcblx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIG5hbWUgKyBcIihcXFxcc3wkKVwiLCBcImdcIik7XG5cdFx0aWYgKCFyZS50ZXN0KG5vZGUuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAobm9kZS5jbGFzc05hbWUgKyBcIiBcIiArIG5hbWUpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyheIHwgJCkvZywgXCJcIik7XG4gICAgICAgIH1cblx0fVxuXG5cdHJlbW92ZSA9IChub2RlLCBuYW1lKSA9PiB7XG5cdFx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIgKyBjICsgXCIoXFxcXHN8JClcIiwgXCJnXCIpO1xuXHRcdG5vZGUuY2xhc3NOYW1lID0gbm9kZS5jbGFzc05hbWUucmVwbGFjZShyZSwgXCIkMVwiKS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKS5yZXBsYWNlKC8oXiB8ICQpL2csIFwiXCIpO1xuXHR9XG5cblx0Y29udGFpbnMgPSAobm9kZSwgYykgPT4ge1xuXHRcdHJldHVybiBuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgbmFtZSArICcoXFxcXHN8JCknKS50ZXN0KG5vZGUuY2xhc3NOYW1lKTtcblx0fVxufVxuXG5jb25zdCB0b2dnbGUgPSAobm9kZSwgbmFtZSwgc3dpdGNoZXIpID0+IHtcbiAgICBpZihzd2l0Y2hlcikge1xuICAgICAgICBhZGQobm9kZSwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlKG5vZGUsIG5hbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICB0b2dnbGUsXG4gICAgY29udGFpbnNcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvX2NsYXNzbGlzdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3AocHJvcGVydHlOYW1lKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1twcm9wZXJ0eU5hbWVdO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdC8vIGluIGNhc2Ugd2hlbiB5b3UncmUgdHJ5aW5nIHRvIHNldCByZWFkLW9ubHkgcHJvcGVydHlcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXNbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fSBjYXRjaCAoZSkge31cblx0XHR9XG5cdH07XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9wcm9wLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXR0cihhdHRyaWJ1dGVOYW1lKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR0aGlzLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCB2YWx1ZSk7XG5cdFx0fVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9hdHRyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5wdXQodHlwZSkge1xuICAgIGxldCBvbjtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvbjogJ2NsaWNrIGtleXVwJyxcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAncmFkaW8nOlxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvbjogJ2NsaWNrIGtleXVwJyxcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHR5cGVvZiB2YWx1ZSAhPSAndW5kZWZpbmVkJyAmJiB0aGlzLnZhbHVlID09IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgJ3N1Ym1pdCc6XG4gICAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgY2FzZSAncmVzZXQnOlxuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICBjYXNlICdoaWRkZW4nOlxuICAgICAgICAgICAgb24gPSBudWxsO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgICAgb24gPSAnY2hhbmdlJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgY2FzZSAndGV4dCc6XG4gICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGV0aW1lJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGV0aW1lLWxvY2FsJzpcbiAgICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIGNhc2UgJ3RpbWUnOlxuICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICBjYXNlICdyYW5nZSc6XG4gICAgICAgICAgICBjYXNlICdjb2xvcic6XG4gICAgICAgICAgICBjYXNlICdzZWFyY2gnOlxuICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgY2FzZSAndGVsJzpcbiAgICAgICAgICAgIGNhc2UgJ3VybCc6XG4gICAgICAgICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6ICovXG4gICAgICAgIGRlZmF1bHQ6IC8vIG90aGVyIGZ1dHVyZSAoSFRNTDYrKSBpbnB1dHNcbiAgICAgICAgICAgIG9uID0gJ2lucHV0JztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogb24sXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9pbnB1dC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG91dHB1dCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogbnVsbCxcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSB8fCB0aGlzLnRleHRDb250ZW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgcHJvcGVydHkgPSAnZm9ybScgaW4gdGhpcyA/ICd2YWx1ZScgOiAndGV4dENvbnRlbnQnO1xuICAgICAgICAgICAgdGhpc1twcm9wZXJ0eV0gPSB2YWx1ZSA9PT0gbnVsbCA/ICcnIDogYCR7dmFsdWV9YDtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9vdXRwdXQuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuXHRyZXR1cm4gaW5wdXQoJ3RleHQnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvdGV4dGFyZWEuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3QobXVsdGlwbGUpIHtcbiAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uOiAnY2hhbmdlJyxcbiAgICAgICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBvcHRpb25zLmxlbmd0aCA+IGk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uc1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbHVlKGdpdmVuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgZ2l2ZW5WYWx1ZSA9PT0gJ3N0cmluZycgPyBbZ2l2ZW5WYWx1ZV0gOiBnaXZlblZhbHVlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBvcHRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb25zW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246ICdjaGFuZ2UnLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBvcHRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc1tpXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3NlbGVjdC5qc1xuICoqLyIsImltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGV4dGFyZWEoKSB7XG5cdHJldHVybiBpbnB1dCgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9wcm9ncmVzcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiAnaW5wdXQnLCAvLyB0aGUgZXZlbnQgbmFtZSBmaXJlcyBvbmx5IGluIGNvbnRlbnRlZGl0YWJsZSBtb2RlXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0aGlzLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3RleHQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHlsZShwcm9wZXJ0eSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZVtwcm9wZXJ0eV1cbiAgICAgICAgICAgICAgICB8fCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvc3R5bGUuanNcbiAqKi8iLCIvLyByZXBsYWNlIG5hbWVzTGlrZVRoaXMgd2l0aCBuYW1lcy1saWtlLXRoaXNcbmNvbnN0IHRvRGFzaGVkID0gKG5hbWUpID0+IHtcbiAgICByZXR1cm4gJ2RhdGEtJyArIG5hbWUucmVwbGFjZSgvKFtBLVpdKS9nLCAodSkgPT4gXCItXCIgKyB1LnRvTG93ZXJDYXNlKCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkYXRhc2V0KHByb3ApIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdGlmKHRoaXMuZGF0YXNldCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YXNldFtwcm9wXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKHRvRGFzaGVkKHByb3ApKTtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0KSB7XG5cdFx0XHRcdHRoaXMuZGF0YXNldFtwcm9wXSA9IHZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUodG9EYXNoZWQocHJvcCksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2RhdGFzZXQuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5pbXBvcnQgZ2V0Tm9kZXMgZnJvbSAnLi9fZ2V0bm9kZXMnO1xuaW1wb3J0IHN3aXRjaEJpbmRpbmcgZnJvbSAnLi9fc3dpdGNoYmluZGluZyc7XG5pbXBvcnQgYmluZFNpbmdsZU5vZGUgZnJvbSAnLi9fYmluZHNpbmdsZW5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IE1hdHJlc2hrYUVycm9yIGZyb20gJy4uL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4uL29uL19kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4uL29mZi9fcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vdHJpZ2dlci9fdHJpZ2dlcm9uZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcblxuLy8gVGhlIG1haW4gbWV0aG9kIG9mIHRoZSBmcmFtZXdvcms6IGJpbmRzIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRvIEhUTUwgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnRPcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZlbnRPcHRpb25zID0gYmluZGVyO1xuICAgICAgICBiaW5kZXIgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnYmluZE5vZGUnKTtcbiAgICB9XG5cbiAgICBldmVudE9wdGlvbnMgPSBldmVudE9wdGlvbnMgfHwge307XG4gICAgYmluZGVyID0gYmluZGVyIHx8IHt9O1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IHtcbiAgICAgICAgb3B0aW9uYWw9YmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnLFxuICAgICAgICBkZWVwLFxuICAgICAgICBzaWxlbnRcbiAgICB9ID0gZXZlbnRPcHRpb25zO1xuXG4gICAgZGVsZXRlIGJpbmROb2RlLnRlbXBvcmFyeU9wdGlvbmFsRmxhZztcblxuICAgIC8vIHRocm93IGVycm9yIHdoZW4ga2V5IGlzIG5vdCBnaXZlblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgYmluZGVyLCBldmVudE9wdGlvbnMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRPcHRpb25zXG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnRPcHRpb25zID0gbm9kZTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXJnZWRFdmVudE9wdGlvbnMgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmKGNvbW1vbkV2ZW50T3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwiZ2xvYmFsXCIgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnRPcHRpb25zLCBjb21tb25FdmVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIGV2ZW50IG9iamVjdCBieSBcImxvY2FsXCIgZXZlbnQgKFwiZXZlbnRcIiBrZXkgb2YgYW4gb2JqZWN0KVxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudE9wdGlvbnMsIGl0ZW1FdmVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBhY2NlcHQga2V5LW5vZGUgb2JqZWN0XG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChrZXlPYmpWYWx1ZSwga2V5T2JqS2V5KSA9PiBiaW5kTm9kZShvYmplY3QsIGtleU9iaktleSwga2V5T2JqVmFsdWUsIG5vZGUsIGJpbmRlcikpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0ICRub2RlcyA9IGdldE5vZGVzKG9iamVjdCwgbm9kZSk7XG5cbiAgICAvLyBjaGVjayBub2RlIGV4aXN0ZW5jZVxuICAgIGlmICghJG5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpub2RlX21pc3NpbmcnLCB7IGtleSwgbm9kZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZWVwICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVlcFBhdGhMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBoYW5kbGUgYmluZGluZyB3aGVuIGtleSBhcmcgaW5jbHVkZXMgZG90cyAoZWcgXCJhLmIuYy5kXCIpXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VIYW5kbGVyID0gKGNoYW5nZUV2dCA9IHt9KSA9PiBzd2l0Y2hCaW5kaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRXZ0LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGRlZXBQYXRoLFxuICAgICAgICAgICAgICAgICAgICAkbm9kZXMsXG4gICAgICAgICAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRPcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICBiaW5kTm9kZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZGVlcFBhdGguc2xpY2UoMCwgZGVlcFBhdGhMZW5ndGggLSAyKSxcbiAgICAgICAgICAgICAgICBgX2NoYW5nZTp0cmVlOiR7ZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAyXX1gLCBjaGFuZ2VIYW5kbGVyKTtcblxuICAgICAgICAgICAgY2hhbmdlSGFuZGxlcigpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcERlZiA9IGRlZmluZVByb3Aob2JqZWN0LCBrZXkpO1xuXG4gICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgIC8vIGlmIG9iamVjdCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UgdGhlbiBleHRlbmQgXCIkbm9kZXNcIiBhbmQgXCJub2Rlc1wiIG9iamVjdHNcbiAgICAgICAgY29uc3QgeyAkbm9kZXM6ICRhbGxOb2Rlcywgbm9kZXM6IGFsbE5vZGVzIH0gPSBvYmplY3Q7XG5cbiAgICAgICAgaWYoISRhbGxOb2RlcyB8fCAhYWxsTm9kZXMpIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmluc3RhbmNlX25vZGVzX21pc3NpbmcnLCB7XG4gICAgICAgICAgICAgICAgJG5vZGVzOiAkYWxsTm9kZXMsXG4gICAgICAgICAgICAgICAgbm9kZXM6IGFsbE5vZGVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRhbGxOb2Rlc1trZXldID0gJGFsbE5vZGVzW2tleV0gJiYgJGFsbE5vZGVzW2tleV0ubGVuZ3RoXG4gICAgICAgICAgICA/ICRhbGxOb2Rlc1trZXldLmFkZCgkbm9kZXMpXG4gICAgICAgICAgICA6ICRub2RlcztcblxuICAgICAgICBhbGxOb2Rlc1trZXldID0gJGFsbE5vZGVzW2tleV1bMF07XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGJpbmRpbmcgZm9yIGV2ZXJ5IG5vZGUgc2VwYXJhdGVseVxuICAgIG5vZm4uZm9yRWFjaCgkbm9kZXMsIChub2RlKSA9PiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcbiAgICAgICAgJG5vZGVzLFxuICAgICAgICBub2RlLFxuICAgICAgICBrZXksXG4gICAgICAgIGV2ZW50T3B0aW9ucyxcbiAgICAgICAgYmluZGVyLFxuICAgICAgICBwcm9wRGVmXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcblxuLy8gdGhpcyBpcyBjb21tb24gZnVuY3Rpb24gd2hpY2ggYXNzb2NpYXRlcyBhbiBvYmplY3Qgd2l0aCBpdHMgTWF0cmVzaGthIGRlZmluaXRpb25cbmZ1bmN0aW9uIGNvbW1vbkluaXQob2JqZWN0KSB7XG4gICAgbGV0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG4gICAgaWYgKCFkZWYpIHtcbiAgICAgICAgZGVmID0ge1xuICAgICAgICAgICAgLy8gYSBwcm9wZXJ0eSBuYW1lIG9mIFwiZXZlbnRzXCIgb2JqZWN0IGlzIGFuIGV2ZW50IG5hbWVcbiAgICAgICAgICAgIC8vIGFuZCBhIHZhbHVlIGlzIGFuIGFycmF5IG9mIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICAvKiBleGFtcGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY3R4OiBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IG9iamVjdDIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXhhbXBsZVwiLFxuXHRcdFx0XHRcdGluZm86IHt9XG4gICAgICAgICAgICAgICAgfSAqL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFwicHJvcHNcIiBjb250YWlucyBzcGVjaWFsIGluZm9ybWF0aW9uIGFib3V0IHByb3BlcnRpZXMgKGdldHRlcnMsIHNldHRlcnMgZXRjKVxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAvKiBleGFtcGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvYmplY3Rba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG1lZGlhdG9yOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBiaW5kaW5nczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdEhhbmRsZXIsXG5cdFx0XHRcdFx0XHQuLi5vdGhlciByZXF1aXJlZCBpbmZvXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWQ6IGBtayR7TWF0aC5yYW5kb20oKX1gXG4gICAgICAgIH07XG5cbiAgICAgICAgZGVmcy5zZXQob2JqZWN0LCBkZWYpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRNSyhvYmplY3QpIHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdDtcbiAgICBpZiAoIW9iamVjdCB8fCB0eXBlICE9PSAnb2JqZWN0Jykge1xuXHRcdC8vIFRPRE8gdGhyb3cgbWF0cmVzaGthRXJyb3JcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuICAgIH1cblxuICAgIC8vIGlmIG9iamVjdCBoYXMgX2luaXRNSyBtZXRob2QsIHJ1biBpdFxuICAgIC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcbiAgICAvLyBldmVyeSBfaW5pdE1LIGltcGxlbWVudGF0aW9uIGhhdmUgdG8gcnVuIGNvbW1vbkluaXQgb3IgcGFyZW50J3MgX2luaXRNS1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbiAgICByZXR1cm4gb2JqZWN0Ll9pbml0TWF0cmVzaGthID8gb2JqZWN0Ll9pbml0TWF0cmVzaGthKCkgOiBjb21tb25Jbml0KG9iamVjdCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9pbml0LmpzXG4gKiovIiwiZnVuY3Rpb24gUHNldWRvTWFwKCkge31cblxuLy8gUHNldWRvTWFwIHNpbXVsYXRlcyBXZWFrTWFwIGJlaGF2aW9yIHdpdGggTygxKSBzZWFyY2ggY29tcGxleGl0eVxuLy8gaXQncyBuZWVkZWQgZm9yIEBJRTkgYW5kIEBJRTEwXG5ub2ZuLmFzc2lnbihQc2V1ZG9NYXAucHJvdG90eXBlLCB7XG4gICAgZ2V0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqLm1hdHJlc2hrYURhdGE7XG4gICAgfSxcbiAgICBzZXQob2JqLCBkYXRhKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuICAgICAgICAgICAgdmFsdWU6IGRhdGEsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoYXMob2JqKSB7XG4gICAgICAgIHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyBuZXcgUHNldWRvTWFwKCkgOiBuZXcgV2Vha01hcCgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbi8vIHRoZSBmdW5jdGlvbiBkZWZpbmVzIG5lZWRlZCBkZXNjcmlwdG9yIGZvciBnaXZlbiBwcm9wZXJ0eSBcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghZGVmLnByb3BzW2tleV0pIHtcbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgZ2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgbWVkaWF0b3I6IG51bGwsXG4gICAgICAgICAgICBiaW5kaW5nczogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuZ2V0dGVyID8gcHJvcERlZi5nZXR0ZXIuY2FsbChvYmplY3QpIDogcHJvcERlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuICAgICAgICAgICAgICAgICAgICBmcm9tU2V0dGVyOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZWYucHJvcHNba2V5XTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZmluZXByb3AuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGlzIGZyb20gJy4vX3V0aWwvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gc2V0cyBuZXcgdmFsdWUgZm9yIGEgcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldChvYmplY3QsIGtleSwgdmFsdWUsIGV2dCA9IHt9KSB7XG4gICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NldCcpO1xuXG4gICAgLy8gaWYgbm8ga2V5IG9yIGZhbHN5IGtleSBpcyBnaXZlblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghZGVmKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcywgZXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuICAgIGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghcHJvcERlZikge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgdmFsdWU6IHByZXZpb3VzVmFsdWUsIG1lZGlhdG9yIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gcG9zc2libGUgZmxhZ3NcbiAgICBjb25zdCB7XG4gICAgICAgIHNraXBNZWRpYXRvcixcbiAgICAgICAgZnJvbU1lZGlhdG9yLFxuICAgICAgICBmb3JjZSxcbiAgICAgICAgZm9yY2VIVE1MLFxuICAgICAgICBzaWxlbnQsXG4gICAgICAgIHNpbGVudEhUTUwsXG4gICAgICAgIHNraXBMaW5rc1xuICAgIH0gPSBldnQ7XG5cbiAgICBsZXQgbmV3VmFsdWU7XG5cbiAgICBpZiAobWVkaWF0b3IgJiYgIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSAmJiAhc2tpcE1lZGlhdG9yICYmICFmcm9tTWVkaWF0b3IpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICBuZXdWYWx1ZSA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWlzKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcblxuICAgIC8vIGFkZCB0byBldnQgb2JqZWN0IHNvbWUgdXNlZnVsIHByb3BlcnRpZXNcbiAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBzZWxmOiBvYmplY3QsXG4gICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgIGtleSxcbiAgICAgICAgaXNDaGFuZ2VkXG4gICAgfSwgZXZ0KTtcblxuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2lsZW50O1xuXG4gICAgLy8gdHJpZ2dlciBiZWZvcmVjaGFuZ2U6S0VZIGFuZCBiZWZvcmVjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlU3RyID0gJ2JlZm9yZWNoYW5nZSc7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZUV2dE5hbWUgPSBgJHtiZWZvcmVjaGFuZ2VTdHJ9OiR7a2V5fWA7XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuICAgIGlmICghc2lsZW50SFRNTCAmJiAoaXNDaGFuZ2VkIHx8IGZvcmNlIHx8IGZvcmNlSFRNTCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQmluZGluZ3NFdnROYW1lID0gYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgY2hhbmdlOktFWSBhbmQgY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ciA9ICdjaGFuZ2UnO1xuICAgICAgICBjb25zdCBjaGFuZ2VFdnROYW1lID0gYCR7Y2hhbmdlU3RyfToke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihldmVudHNbY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG4gICAgaWYgKChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFza2lwTGlua3MpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVwc0V2dE5hbWUgPSBgX2NoYW5nZTpkZXBzOiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlbGVnYXRlZEV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlck9uZShvYmplY3QsIG5hbWUpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYgKCFkZWYpIHJldHVybjtcblxuICAgIGNvbnN0IGV2ZW50cyA9IGRlZi5ldmVudHNbbmFtZV07XG5cbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBub2ZuLnNsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgICAgIGNvbnN0IGwgPSBldmVudHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBbYTEsIGEyXSA9IGFyZ3M7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgZXY7XG5cbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSB7XG4gICAgaW5mbzoge30sXG4gICAgbmFtZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RyaWdnZXIvX3RyaWdnZXJvbmUuanNcbiAqKi8iLCJpbXBvcnQgbWF0cmVzaGthRXJyb3IgZnJvbSAnLi9tYXRyZXNoa2FlcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgbWV0aG9kKSB7XG4gICAgY29uc3QgdHlwZW9mT2JqZWN0ID0gb2JqZWN0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIG9iamVjdDtcblxuICAgIGlmICh0eXBlb2ZPYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG1hdHJlc2hrYUVycm9yKCdjb21tb246b2JqZWN0X3R5cGUnLCB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlb2ZPYmplY3QsXG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzXG4gKiovIiwiY29uc3QgYmluZGluZ0Vycm9yUHJlZml4ID0gJ0JpbmRpbmcgZXJyb3I6JztcblxuY29uc3QgZXJyb3JzID0ge1xuICAgICdiaW5kaW5nOm5vZGVfbWlzc2luZyc6ICh7IGtleSwgbm9kZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ySW5mbyA9IHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyA/IGAgVGhlIHNlbGVjdG9yIGlzICR7bm9kZX1gIDogJyc7XG4gICAgICAgIHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IG5vZGUgaXMgbWlzc2luZyBmb3IgJHtrZXl9LiR7c2VsZWN0b3JJbmZvfWA7XG4gICAgfSxcbiAgICAnYmluZGluZzpmYWxzeV9rZXknOiAoKSA9PiAnQmluZGluZyBlcnJvcjogXCJrZXlcIiBhcmcgY2Fubm90IGJlIGZhbHN5JyxcbiAgICAnYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJzogKHsgJG5vZGVzIH0pID0+IHtcbiAgICAgICAgY29uc3QgbWlzc2luZyA9ICEkbm9kZXMgPyAnJG5vZGVzJyA6ICdub2Rlcyc7XG4gICAgICAgIHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IFwiJHttaXNzaW5nfVwiIHByb3BlcnR5IG9mIE1hdHJlc2hrYSBpbnN0YW5jZSBpcyBtaXNzaW5nLiBgXG4gICAgICAgICAgICArICdJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgbXVzdCBub3QgYmUgcmVhc3NpZ25lZC4nO1xuICAgIH0sXG4gICAgJ2NvbW1vbjpvYmplY3RfdHlwZSc6ICh7IHR5cGUsIG1ldGhvZCB9KSA9PlxuICAgICAgICBgTWV0aG9kIFwiJHttZXRob2R9XCIgZG9lcyBub3QgYWNjZXB0ICR7dHlwZX0gYXMgdGFyZ2V0IG9iamVjdGBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hdHJlc2hrYUVycm9yKGtleSwgZGF0YSkge1xuICAgIGNvbnN0IGdldEVycm9yID0gZXJyb3JzW2tleV07XG4gICAgaWYgKCFnZXRFcnJvcikge1xuICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBlcnJvciBcIiR7a2V5fVwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcnNba2V5XShkYXRhKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSwgbm8tY29uZnVzaW5nLWFycm93ICovXG4vLyBkZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWVcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9pcy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL19zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nXG5cbmNvbnN0IGh0bWxSZWcgPSAvPC87XG5jb25zdCBjdXN0b21TZWxlY3RvclJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuLy8gVE9ETyB3cml0ZSBkZXNjcmlwdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGxldCBub2RlcztcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgJiYgIWh0bWxSZWcudGVzdChzZWxlY3RvcikgJiYgY3VzdG9tU2VsZWN0b3JSZWcudGVzdChzZWxlY3RvcikpIHtcbiAgICAgICAgbm9kZXMgPSBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBub2RlcyA9IGRvbS4kKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fZ2V0bm9kZXMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4uL191dGlsL3RvYXJyYXknO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JSZWcgPSAvXFxzKjpib3VuZFxcKChbXihdKilcXClcXHMqKFtcXFNcXHNdKilcXHMqfFxccyo6c2FuZGJveFxccyooW1xcU1xcc10qKVxccyovO1xuXG4vLyBUT0RPIGFkZCBkZXNjcmlwdGlvblxuLy8gVE9ETyB0aGlzIGZ1bmN0aW9uIGxvb2tzIG5vdCBnb29kLCBpdCBuZWVkcyB0byBiZSByZWZhY3RvcmVkIGFuZCBhY2NlbGVyYXRlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0Tm9kZXMob2JqZWN0LCBnaXZlblNlbGVjdG9yKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gZGVmcy5nZXQob2JqZWN0KTtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBnaXZlblNlbGVjdG9yLnNwbGl0KCcsJyk7XG4gICAgbGV0IHJlc3VsdCA9IGRvbS4kKCk7XG5cbiAgICBub2ZuLmZvckVhY2goc2VsZWN0b3JzLCBzZWxlY3RvciA9PiB7XG4gICAgICAgIGNvbnN0IGV4ZWNSZXN1bHQgPSBjdXN0b21TZWxlY3RvclJlZy5leGVjKHNlbGVjdG9yKTtcbiAgICAgICAgaWYoZXhlY1Jlc3VsdCkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRLZXkgPSBleGVjUmVzdWx0WzNdICE9PSB1bmRlZmluZWQgPyAnc2FuZGJveCcgOiBleGVjUmVzdWx0WzFdO1xuICAgICAgICAgICAgY29uc3Qgc3ViU2VsZWN0b3IgPSBleGVjUmVzdWx0WzNdICE9PSB1bmRlZmluZWQgPyBleGVjUmVzdWx0WzNdIDogZXhlY1Jlc3VsdFsyXTtcbiAgICAgICAgICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1tib3VuZEtleV07XG5cbiAgICAgICAgICAgIGlmKHByb3BEZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuICAgICAgICAgICAgICAgIGlmKGJpbmRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kTm9kZXMgPSBBcnJheShiaW5kaW5ncy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsIChiaW5kaW5nLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZE5vZGVzW2ldID0gYmluZGluZy5ub2RlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgcGFzc2VkIGFmdGVyIDpib3VuZChLRVkpIGlzIG5vdCBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSAubXktc2VsZWN0b3JcIlxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViU2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBjb250YWlucyBjaGlsZHJlbiBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSA+IC5teS1zZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViU2VsZWN0b3IuaW5kZXhPZignPicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW5nIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJvdW5kTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbUF0dHIgPSBgbSR7TWF0aC5yYW5kb20oKX1gLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKHJhbmRvbUF0dHIsIHJhbmRvbUF0dHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChgWyR7cmFuZG9tQXR0cn09XCIke3JhbmRvbUF0dHJ9XCJdICR7c3ViU2VsZWN0b3J9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQodG9BcnJheShzZWxlY3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgZG9lc24ndCBjb250YWluIGNoaWxkcmVuIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJvdW5kTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHN1YlNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgaXMgZW1wdHkgc3RyaW5nIGp1c3QgYWRkIGJvdW5kIG5vZGVzIHRvIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChib3VuZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGl0J3MgbmF0aXZlIHNlbGVjdG9yIChubyBjdXN0b20gdGhpbmdzKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0FycmF5KG9iamVjdCwgc3RhcnQpIHtcblx0dmFyIGFycmF5ID0gW10sXG5cdFx0bCA9IG9iamVjdC5sZW5ndGgsXG5cdFx0aTtcblxuXHRzdGFydCA9IHN0YXJ0IHx8IDA7XG5cblx0Zm9yIChpID0gc3RhcnQ7IGkgPCBsOyBpKyspIHtcblx0XHRhcnJheVtpIC0gc3RhcnRdID0gb2JqZWN0W2ldO1xuXHR9XG5cblx0cmV0dXJuIGFycmF5O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvdG9hcnJheS5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0RG9sbGFyIGZyb20gJy4vZGVmYXVsdC1kb2xsYXInO1xuXG5jb25zdCBkb20gPSB7XG4gICAgJDogZGVmYXVsdERvbGxhclxufTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9pbmRleC5qc1xuICoqLyIsIi8qIGdsb2JhbCAkICovXG5pbXBvcnQgYlF1ZXJ5IGZyb20gJy4uL2JxdWVyeSc7XG5cbmNvbnN0IG5lZWRlZE1ldGhvZHMgPSAnb24gb2ZmIGlzIGFkZCBub3QgZmluZCcuc3BsaXQoL1xccy8pO1xuXG5jb25zdCBnbG9iYWxEb2xsYXIgPSB0eXBlb2YgJCA9PT0gJ2Z1bmN0aW9uJyA/ICQgOiBudWxsO1xubGV0IHVzZUdsb2JhbERvbGxhciA9IHRydWU7XG5cbmlmIChnbG9iYWxEb2xsYXIpIHtcbiAgICBjb25zdCBmbiA9IGdsb2JhbERvbGxhci5mbiB8fCBnbG9iYWxEb2xsYXIucHJvdG90eXBlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmVlZGVkTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWZuW25lZWRlZE1ldGhvZHNbaV1dKSB7XG4gICAgICAgICAgICB1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFnbG9iYWxEb2xsYXIucGFyc2VIVE1MKSB7XG4gICAgICAgIGdsb2JhbERvbGxhci5wYXJzZUhUTUwgPSBiUXVlcnkucGFyc2VIVE1MO1xuICAgIH1cbn0gZWxzZSB7XG4gICAgdXNlR2xvYmFsRG9sbGFyID0gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVzZUdsb2JhbERvbGxhciA/IGdsb2JhbERvbGxhciA6IGJRdWVyeTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBwYXJzZUhUTUwgZnJvbSAnLi9wYXJzZWh0bWwnO1xuaW1wb3J0IG9uZSBmcm9tICcuL29uZSc7XG5pbXBvcnQgY3JlYXRlIGZyb20gJy4vY3JlYXRlJztcbmltcG9ydCBvbiBmcm9tICcuL29uJztcbmltcG9ydCBvZmYgZnJvbSAnLi9vZmYnO1xuaW1wb3J0IGlzIGZyb20gJy4vaXMnO1xuaW1wb3J0IGFkZCBmcm9tICcuL2FkZCc7XG5pbXBvcnQgbm90IGZyb20gJy4vbm90JztcbmltcG9ydCBmaW5kIGZyb20gJy4vZmluZCc7XG5cbi8vIHRpbnkgalF1ZXJ5IHJlcGxhY2VtZW50IGZvciBNYXRyZXNoa2Fcbi8vIGJRdWVyeSBpcyByZXdyaXR0ZW4gdmVyc2lvbiBvZiBiYWxhbGFpa2EuanNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJRdWVyeShzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgSW5pdChzZWxlY3RvciwgY29udGV4dCk7XG59XG5cbm5vZm4uYXNzaWduKGJRdWVyeSwge1xuICAgIGZuOiBJbml0LnByb3RvdHlwZSxcbiAgICBleHRlbmQsXG4gICAgcGFyc2VIVE1MLFxuICAgIG9uZSxcbiAgICBjcmVhdGVcbn0pO1xuXG5ub2ZuLmFzc2lnbihiUXVlcnkuZm4sIHtcbiAgICBvbixcbiAgICBvZmYsXG4gICAgaXMsXG4gICAgYWRkLFxuICAgIG5vdCxcbiAgICBmaW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pbmRleC5qc1xuICoqLyIsImltcG9ydCBodG1sMm5vZGVMaXN0IGZyb20gJy4vX2h0bWwybm9kZWxpc3QnO1xuXG4vLyBmdW5jdGlvbi1jb25zdHJ1Y3RvciBvZiBiUXVlcnkgbGlicmFyeVxuLy8gYWNjZXB0cyBtYW55IGtpbmRzIG9mIGFyZ3VtZW50cyAoc2VsZWN0b3IsIGh0bWwsIGZ1bmN0aW9uKVxuZnVuY3Rpb24gQlF1ZXJ5SW5pdChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHNlbGVjdG9yID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IFtzZWxlY3Rvcl07XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKC88Ly50ZXN0KHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGh0bWwybm9kZUxpc3Qoc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdDb250ZXh0ID0gKG5ldyBCUXVlcnlJbml0KGNvbnRleHQpKVswXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV3Q29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3Q29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgLy8gdHlwZW9mIG5vZGVMaXN0IHJldHVybnMgXCJmdW5jdGlvblwiIGluIG9sZCBXZWJLaXRcbiAgICAgICAgfSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHNlbGVjdG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbGVuZ3RoID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChyZXN1bHRbaV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5CUXVlcnlJbml0LnByb3RvdHlwZSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBCUXVlcnlJbml0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19pbml0LmpzXG4gKiovIiwiLy8gY29udmVydHMgSFRNTCBzdHJpbmcgdG8gTm9kZUxpc3QgaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh0bWwybm9kZUxpc3QoZ2l2ZW5IVE1MKSB7XG4gICAgLy8gd3JhcE1hcCBpcyB0YWtlbiBmcm9tIGpRdWVyeVxuICAgIGNvbnN0IHdyYXBNYXAgPSB7XG4gICAgICAgIG9wdGlvbjogWzEsICc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLCAnPC9zZWxlY3Q+J10sXG4gICAgICAgIGxlZ2VuZDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG4gICAgICAgIHRoZWFkOiBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXSxcbiAgICAgICAgdHI6IFsyLCAnPHRhYmxlPjx0Ym9keT4nLCAnPC90Ym9keT48L3RhYmxlPiddLFxuICAgICAgICB0ZDogWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J10sXG4gICAgICAgIGNvbDogWzIsICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsICc8L2NvbGdyb3VwPjwvdGFibGU+J10sXG4gICAgICAgIGFyZWE6IFsxLCAnPG1hcD4nLCAnPC9tYXA+J10sXG4gICAgICAgIF86IFswLCAnJywgJyddXG4gICAgfTtcblxuICAgIGNvbnN0IGh0bWwgPSBnaXZlbkhUTUwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGV0IGk7XG5cbiAgICB3cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG4gICAgd3JhcE1hcC50Ym9keSA9IHdyYXBNYXAudGZvb3QgPSB3cmFwTWFwLmNvbGdyb3VwID0gd3JhcE1hcC5jYXB0aW9uID0gd3JhcE1hcC50aGVhZDtcbiAgICB3cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuICAgIGNvbnN0IGV4ID0gLzwoW1xcdzpdKykvLmV4ZWMoaHRtbCk7XG4gICAgY29uc3Qgd3JhcHBlciA9IGV4ICYmIHdyYXBNYXBbZXhbMV1dIHx8IHdyYXBNYXAuXztcblxuICAgIG5vZGUuaW5uZXJIVE1MID0gd3JhcHBlclsxXSArIGh0bWwgKyB3cmFwcGVyWzJdO1xuXG4gICAgaSA9IHdyYXBwZXJbMF07XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlLmNoaWxkTm9kZXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcbiAqKi8iLCIvLyBPYmplY3QuYXNzaWduIHBvbHlmeWxsIGlzIHRha2VuIHRoZXJlOlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnbiNQb2x5ZmlsbFxuLy8gYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBmdXR1cmVcblxuY29uc3QgYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgIH1cblxuICAgIGNvbnN0IG91dHB1dCA9IE9iamVjdCh0YXJnZXQpO1xuICAgIGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICAgIGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbmV4dEtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KG5leHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXh0ZW5kLmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5pbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcGFyc2VzIGdpdmVuIEhUTUwgYW5kIHJldHVybnMgYlF1ZXJ5IChCUXVlcnlJbml0KSBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gbmV3IEluaXQoaHRtbDJub2RlTGlzdChodG1sKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbWF0Y2hlZCBzZXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uZShzLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHMsIGNvbnRleHQpWzBdO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29uZS5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgSFRNTCBlbGVtZW50XG4vLyBUT0RPIGdldCByaWQgb2YgaXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZSh0YWdOYW1lLCBwcm9wcykge1xuICAgIGlmICh0eXBlb2YgdGFnTmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcHJvcHMgPSB0YWdOYW1lO1xuICAgICAgICB0YWdOYW1lID0gcHJvcHMudGFnTmFtZTtcbiAgICB9XG5cbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgbm9mbi5mb3JPd24ocHJvcHMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnYXR0cmlidXRlcycgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG5vZm4uZm9yT3duKHZhbHVlLCAoYXR0clZhbHVlLCBhdHRyTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2NoaWxkcmVuJyAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaCh2YWx1ZSwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGNyZWF0ZShjaGlsZCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbFtrZXldICYmIHR5cGVvZiBlbFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24oZWxba2V5XSwgdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgIT09ICd0YWdOYW1lJykge1xuICAgICAgICAgICAgICAgIGVsW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuaW1wb3J0IGlzIGZyb20gJy4vaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB3aGVuIGEgc2VsZWN0b3IgaXMgZ2l2ZW5cbmZ1bmN0aW9uIGRlbGVnYXRlSGFuZGxlcihldnQsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkucmVwbGFjZSgnMC4nLCAneCcpO1xuICAgIGNvbnN0IHNjb3BlU2VsZWN0b3IgPSBgWyR7cmFuZG9tSUR9PVwiJHtyYW5kb21JRH1cIl0gYDtcbiAgICBjb25zdCBzcGxpdHRlZFNlbGVjdG9yID0gc2VsZWN0b3Iuc3BsaXQoJywnKTtcblxuICAgIGxldCBtYXRjaGluZyA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHRlZFNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHNwbGl0dGVkU2VsZWN0b3JbaV07XG4gICAgICAgIG1hdGNoaW5nICs9IGAke2kgPT09IDAgPyAnJyA6ICcsJ30ke3Njb3BlU2VsZWN0b3J9JHtzZWx9LCR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0gKmA7XG4gICAgfVxuXG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZShyYW5kb21JRCwgcmFuZG9tSUQpO1xuXG4gICAgaWYgKGlzLmNhbGwoW2V2dC50YXJnZXRdLCBtYXRjaGluZykpIHtcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGV2dCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tSUQpO1xufVxuXG4vLyBhZGRzIGV2ZW50IGxpc3RlbmVyIHRvIGEgc2V0IG9mIGVsZW1udHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKG5hbWVzU3RyLCBzZWxlY3RvciwgaGFuZGxlcikge1xuICAgIGNvbnN0IG5hbWVzID0gbmFtZXNTdHIuc3BsaXQoL1xccy8pO1xuICAgIGxldCBkZWxlZ2F0ZTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGFuZGxlciA9IHNlbGVjdG9yOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHNlbGVjdG9yID0gbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBkZWxlZ2F0ZSA9IGZ1bmN0aW9uIHVuaXF1ZURlbGVnYXRlSGFuZGxlcihldnQpIHtcbiAgICAgICAgICAgIGRlbGVnYXRlSGFuZGxlci5jYWxsKHRoaXMsIGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IG5hbWUgPSBuYW1lc1tpXS5zcGxpdCgvXFwuKC4rKS8pO1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuICAgICAgICBuYW1lID0gbmFtZVswXTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzW2pdO1xuICAgICAgICAgICAgY29uc3Qgbm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleDtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlSURdID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gfHwgW107XG5cbiAgICAgICAgICAgIGxldCBleGlzdCA9IGZhbHNlO1xuXG5cbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNba107XG5cbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gZXZlbnQuaGFuZGxlciAmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBldmVudC5zZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZXhpc3QpIHtcbiAgICAgICAgICAgICAgICBldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGRlbGVnYXRlLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lc3BhY2UsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZGVsZWdhdGUgfHwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb24uanNcbiAqKi8iLCIvLyBzaGFyZSBkYXRhIGJldHdlZW4gYXMgYW4gb2JqZWN0IG1vZHVsZXMgYmVjYXVzZSB3ZSB1c2Vcbi8vIHNpbXBsaWZpZWQgZXMgbW9kdWxlcyB0aGVyZSBhbmQgY2Fubm90IGltcG9ydCBhbmQgc2hhcmUgYSBudW1iZXJcbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBub2RlSW5kZXg6IDAsXG4gICAgYWxsRXZlbnRzOiB7fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9fZGF0YS5qc1xuICoqLyIsIi8vIGNoZWNrIHRoZSBmaXJzdCBlbGVtZW50IGZyb20gZ2l2ZW4gc2V0IGFnYWluc3QgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXMocykge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzWzBdO1xuICAgIHJldHVybiBub2RlXG4gICAgICAgID8gKG5vZGUubWF0Y2hlc1xuICAgICAgICAgICAgfHwgbm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUubW96TWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICB8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICB8fCBub2RlLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgcykgOiBmYWxzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pcy5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyByZW1vdmVzIGV2ZW50IGhhbmRsZXIgZnJvbSBhIHNldCBvZiBlbGVtZW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2ZmKG5hbWVzLCBzZWxlY3RvciwgaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgaGFuZGxlciA9IHNlbGVjdG9yOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIHNlbGVjdG9yID0gbnVsbDsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB9XG5cbiAgICBuYW1lcyA9IG5hbWVzLnNwbGl0KC9cXHMvKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IG5hbWUgPSBuYW1lc1tpXS5zcGxpdCgvXFwuKC4rKS8pO1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuICAgICAgICBuYW1lID0gbmFtZVswXTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSB0aGlzW2pdO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGUuYiRdO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNba107XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICghaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5oYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmRlbGVnYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCFuYW1lc3BhY2UgfHwgbmFtZXNwYWNlID09PSBldmVudC5uYW1lc3BhY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBldmVudC5zZWxlY3RvcilcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnQuZGVsZWdhdGUgfHwgZXZlbnQuaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHMuc3BsaWNlKGstLSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghbmFtZXNwYWNlICYmICFzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb2ZmLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcblxuLy8gYWRkcyB1bmlxdWUgbm9kZXMgdG8gYlF1ZXJ5IGNvbGxlY3Rpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZChzZWxlY3Rvcikge1xuICAgIGNvbnN0IGlkTWFwID0ge307XG5cbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgc2VsZWN0b3IgPSBuZXcgSW5pdChzZWxlY3Rvcik7XG5cbiAgICBpZiAodGhpcy5sZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0ID0gbmV3IEluaXQodGhpcyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gcmVzdWx0W2ldO1xuICAgICAgICAgICAgY29uc3Qgbm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleDtcbiAgICAgICAgICAgIGlkTWFwW25vZGVJRF0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHNlbGVjdG9yW2ldO1xuICAgICAgICAgICAgY29uc3Qgbm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleDtcbiAgICAgICAgICAgIGlmICghaWRNYXBbbm9kZUlEXSkge1xuICAgICAgICAgICAgICAgIGlkTWFwW25vZGVJRF0gPSAxO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9hZGQuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gZXhjbHVkZXMgZWxlbWVudHMgZnJvbSBjdXJyZW50IHNldCBieSBnaXZlbiBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm90KHNlbGVjdG9yKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEluaXQoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIW5ldyBJbml0KHRoaXNbaV0pLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpc1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L25vdC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBnZXQgdGhlIGRlc2NlbmRhbnRzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgY3VycmVudCBzZXQgb2YgbWF0Y2hlZCBlbGVtZW50cyxcbi8vIGZpbHRlcmVkIGJ5IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcbiAgICBsZXQgcmVzdWx0ID0gbmV3IEluaXQoKTtcblxuICAgIG5vZm4uZm9yRWFjaCh0aGlzLCBlbCA9PiB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9maW5kLmpzXG4gKiovIiwiaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnLi4vdW5iaW5kbm9kZSc7XG4vLyByZS1hZGRzIGJpbmRpbmcgd2hlbiBvYmplY3QgYnJhbmNoIGlzIGNoYW5nZWRcbi8vIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgYnkgYmluZE5vZGUgd2hlbiBzb21ldGhpbmcgbGlrZVxuLy8gJ2Zvby5iYXIuYmF6JyBpcyBwYXNzZWQgdG8gaXQgYXMga2V5IGFyZyB2YWx1ZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dpdGNoQmluZGluZyh7XG4gICAgY2hhbmdlRXZ0LFxuICAgIG9iamVjdCxcbiAgICBkZWVwUGF0aCxcbiAgICAkbm9kZXMsXG4gICAgYmluZGVyLFxuICAgIGV2ZW50T3B0aW9ucyxcbiAgICBiaW5kTm9kZVxufSkge1xuICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuICAgIGxldCB7IHZhbHVlOiB0YXJnZXQgfSA9IGNoYW5nZUV2dDtcbiAgICBjb25zdCB7IHByZXZpb3VzVmFsdWU6IHByZXZpb3VzVGFyZ2V0IH0gPSBjaGFuZ2VFdnQ7XG5cbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICB0YXJnZXQgPSBvYmplY3Q7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGhMZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtkZWVwUGF0aFtpXV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kTm9kZSh0YXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sICRub2RlcywgYmluZGVyLCBldmVudE9wdGlvbnMpO1xuXG4gICAgLy8gcmVtb3ZlIGJpbmRpbmcgZm9yIHByZXZpb3VzbHkgdXNlZCBvYmplY3RcbiAgICBpZiAocHJldmlvdXNUYXJnZXQgJiYgdHlwZW9mIHByZXZpb3VzVGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICB1bmJpbmROb2RlKHByZXZpb3VzVGFyZ2V0LCBkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDFdLCAkbm9kZXMpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19zd2l0Y2hiaW5kaW5nLmpzXG4gKiovIiwiaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZ2V0Tm9kZXMgZnJvbSAnLi4vYmluZG5vZGUvX2dldG5vZGVzJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICcuLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4uL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVCaW5kaW5nIGZyb20gJy4vX3JlbW92ZWJpbmRpbmcnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZSwgZXZlbnRPcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZlbnRPcHRpb25zID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3VuYmluZE5vZGUnKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtleVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Yga2V5c1xuICAgICAgICAgICAgICogdGhpcy51bmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBub2RlLCBldmVudE9wdGlvbnMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2VwdCBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoW3sga2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50IH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGVcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICB1bmJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIG5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogYWNjZXB0IGtleS1ub2RlIG9iamVjdFxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IHVuYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG5cbiAgICBldmVudE9wdGlvbnMgPSBldmVudE9wdGlvbnMgfHwge307XG4gICAgY29uc3QgeyBkZWVwIH0gPSBldmVudE9wdGlvbnM7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIGlmKCFkZWYpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BzIH0gPSBkZWY7XG5cbiAgICAvLyBhbGxvdyB0byBwYXNzIG51bGwgb3IgdW5kZWZpbmVkIGFzIGtleVxuICAgIC8vIGlmIHBhc3NlZCB0aGVuIHJlbW92ZSBiaW5kaW5ncyBvZiBhbGwga2V5cyBmb3IgZ2l2ZW4gb2JqZWN0XG4gICAgaWYoa2V5ID09PSBudWxsIHx8IHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKHByb3BzLCAocHJvcHNJdGVtLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHVuYmluZE5vZGUob2JqZWN0LCBrZXksIG51bGwsIGV2ZW50T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGRlbGVnYXRlZCBiaW5kaW5nXG4gICAgaWYoZGVlcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGRlZXBQYXRoTGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IG9iamVjdDtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE8gZG8gd2UgbmVlZCB0byB0aHJvdyBlcnJvciB3aGVuIHRhcmdldCBpcyBmYWxzeT9cbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbZGVlcFBhdGhbaV1dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUT0RPIEJVRyB0aGlzIG1heSB1bmRlbGVnYXRlIGxpc3RlbmVyIGZvciBhbGwgYmluZGluZ3Mgd2l0aCB0aGUgc2FtZSBwYXRoIChjYW5ub3QgcmVwcm9kdWNlKVxuICAgICAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZGVlcFBhdGguc2xpY2UoMCwgZGVlcFBhdGhMZW5ndGggLSAyKSxcbiAgICAgICAgICAgICAgICBgX2NoYW5nZTp0cmVlOiR7ZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAyXX1gKTtcblxuICAgICAgICAgICAgdW5iaW5kTm9kZSh0YXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sIG5vZGUsIGV2ZW50T3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG4gICAgLy8gd2hlbiBubyBwcm9wZGVmIGRvIG5vdGhpbmdcbiAgICBpZighcHJvcERlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAvLyBpZiB0aGUgcHJvcGVydHkgZG9lc24ndCBoYXZlIGFueSBiaW5kaW5ncyBkbyBub3RoaW5nXG4gICAgaWYoIWJpbmRpbmdzKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gbm9kZSBpcyBwYXNlZCByZW1vdmUgYWxsIGJpbmRpbmdzIGZvciBnaXZlbiBrZXlcbiAgICBpZighbm9kZSkge1xuICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsIGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldmVudE9wdGlvbnMgfSwgYmluZGluZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BEZWYuYmluZGluZ3MgPSBudWxsO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICAgICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0Lm5vZGVzW2tleV1cbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3QuJG5vZGVzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0ICRub2RlcyA9IGdldE5vZGVzKG9iamVjdCwgbm9kZSk7XG4gICAgY29uc3QgcmV0YWluQmluZGluZ3MgPSBbXTtcbiAgICBjb25zdCByZXRhaW5Ob2RlcyA9IFtdO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBiaW5kbmdzIGFuZCBjb21wYXJlIHRoZWlyIG5vZGUgd2l0aCBnaXZlbiBub2Rlc1xuICAgIG5vZm4uZm9yRWFjaCgkbm9kZXMsIG5vZGVzSXRlbSA9PiB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICBpZihiaW5kaW5nLm5vZGUgPT09IG5vZGVzSXRlbSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZlbnRPcHRpb25zIH0sIGJpbmRpbmcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRhaW5CaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xuICAgICAgICAgICAgICAgIHJldGFpbk5vZGVzLnB1c2gobm9kZXNJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgbm9kZXMgYW5kICRub2RlcyBmb3IgTWF0cmVzaGthIGluc3RhbmNlXG4gICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgIGlmKHJldGFpbk5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0Lm5vZGVzW2tleV0gPSByZXRhaW5Ob2Rlc1swXTtcbiAgICAgICAgICAgIG9iamVjdC4kbm9kZXNba2V5XSA9IGRvbS4kKHJldGFpbk5vZGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBiaW5kaW5ncyBvYmplY3RcbiAgICBpZihyZXRhaW5CaW5kaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IHJldGFpbkJpbmRpbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BEZWYuYmluZGluZ3MgPSBudWxsO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VuYmluZG5vZGUvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL19yZW1vdmVsaXN0ZW5lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGdpdmVuUGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuXHRcdHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGRvIGFsbCBtYWdpY1xuICAgICAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5pbmZvLnBhdGhTdHIgIT09IHBhdGhTdHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSA9IHJldGFpbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2tleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIm5hbWVcIiwgXCJldmVudHNcIl0gfV0qL1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgIGNvbnN0IG5vVHJpZ2dlciA9IG5hbWUgPyBuYW1lWzBdID09PSAnXycgOiBmYWxzZTtcblxuICAgIC8vIGlmIGFsbCBldmVudHMgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgbm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZXZ0LmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuICAgICAgICBkZWYuZXZlbnRzID0ge307XG4gICAgfSBlbHNlIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcbiAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIChjYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgZXZlbnRcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBkZWYuZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2ZmL19yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuLi9vZmYvX3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuXG5jb25zdCBzcGFjZVJlZyA9IC9cXHMrLztcblxuLy8gdGhlIGZ1bmN0aW9uIHJlbW92ZXMgc2luZ2xlIGJpbmRpbmcgZm9yIHNpbmdsZSBvYmplY3Rcbi8vIGNhbGxlZCBieSB1bmJpbmROb2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2ZW50T3B0aW9ucyB9LCB7XG4gICAgb3B0aW9ucyxcbiAgICBiaW5kZXIsXG4gICAgbm9kZSxcbiAgICBub2RlSGFuZGxlcixcbiAgICBvYmplY3RIYW5kbGVyXG59KSB7XG4gICAgY29uc3QgeyBkZXN0cm95LCBvbiB9ID0gYmluZGVyO1xuICAgIGNvbnN0IHsgc2lsZW50IH0gPSBldmVudE9wdGlvbnM7XG5cbiAgICAvLyBpZiBcIm9uXCIgaXMgZnVuY3Rpb24gZGlzYWJsZSBpdFxuICAgIC8vIHdlIGNhbm5vdCB0dXJuIG9mZiBjdXN0b20gbGlzdGVuZXIgZGVmaW5lZCBieSBhIHByb2dyYW1tZXJcbiAgICAvLyBwcm9ncmFtbWVyIG5lZWRzIHRvIHJlbW92ZSBjdXN0b20gbGlzdGVuZXIgbWF1YWxseSB2aWEgYmluZGVyLmRlc3Ryb3lcbiAgICBpZiAodHlwZW9mIG9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvbiA9PT0gJ3N0cmluZycpe1xuICAgICAgICAvLyByZW1vdmUgRE9NIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIC8vIHJlbW92ZUV2ZW50TGlzdGVuZXIgaXMgZmFzdGVyIHRoYW4gXCJvblwiIG1ldGhvZCBmcm9tIGFueSBET00gbGlicmFyeVxuICAgICAgICBub2ZuLmZvckVhY2gob24uc3BsaXQoc3BhY2VSZWcpLFxuICAgICAgICAgICAgZXZ0TmFtZSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgbm9kZUhhbmRsZXIpKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgb2JqZWN0IGV2ZW50IGxpc3RlbmVyXG4gICAgcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gLCBvYmplY3RIYW5kbGVyKTtcblxuICAgIC8vIGlmIGJpbmRlci5kZXN0cm95IGlzIGdpdmVuIGNhbGwgaXRcbiAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICBkZXN0cm95LmNhbGwobm9kZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gZmlyZSBldmVudHNcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBjb25zdCBleHRlbmRlZEV2ZW50T3B0aW9ucyA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfSwgZXZlbnRPcHRpb25zKTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHVuYmluZDoke2tleX1gLCBleHRlbmRlZEV2ZW50T3B0aW9ucyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAndW5iaW5kJywgZXh0ZW5kZWRFdmVudE9wdGlvbnMpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VuYmluZG5vZGUvX3JlbW92ZWJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgbG9va0ZvckJpbmRlciBmcm9tICcuLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBydW5Ob2RlSGFuZGxlciBmcm9tICcuL19ydW5ub2RlaGFuZGxlcic7XG5pbXBvcnQgcnVuT2JqZWN0SGFuZGxlciBmcm9tICcuL19ydW5vYmplY3RoYW5kbGVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vX3V0aWwvZGVib3VuY2UnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG5jb25zdCBzcGFjZVJlZyA9IC9cXHMrLztcblxuLy8gaGFuZGxlcyBiaW5kaW5nIGZvciBzaW5nbGUgcHJvcGVydHkgJiBub2RlXG4vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCBhdCBiaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgYmluZGVyOiBnaXZlbkJpbmRlcixcbiAgICBrZXksXG4gICAgJG5vZGVzLFxuICAgIG5vZGUsXG4gICAgZXZlbnRPcHRpb25zLFxuICAgIHByb3BEZWZcbn0pIHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgYXNzaWduRGVmYXVsdFZhbHVlLFxuICAgICAgICBkZWJvdW5jZTogZGVib3VuY2VPcHRpb25cbiAgICB9ID0gZXZlbnRPcHRpb25zO1xuICAgIC8vIGNyZWF0ZSBiaW5kaW5ncyBhcnJheSBpbiBwcm9wZXJ0eSBkZWZpbml0aW9uIG9iamVjdFxuICAgIGNvbnN0IGJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBsZXQgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCBiaW5kaW5nT3B0aW9ucyA9IHtcbiAgICAgICAgc2VsZjogb2JqZWN0LFxuICAgICAgICBrZXksXG4gICAgICAgIHZhbHVlLFxuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGVcbiAgICB9O1xuICAgIGxldCBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgb2JqZWN0SGFuZGxlcjtcbiAgICBsZXQgbm9kZUhhbmRsZXI7XG5cbiAgICAvLyBnZXQgYWN0dWFsIGJpbmRlclxuICAgIGlmIChnaXZlbkJpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cbiAgICAgICAgaWYgKGZvdW5kQmluZGVyKSB7XG4gICAgICAgICAgICBpZiAoZ2l2ZW5CaW5kZXIpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihmb3VuZEJpbmRlciwgZ2l2ZW5CaW5kZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiaW5kZXIgPSBmb3VuZEJpbmRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpbmRlciA9IGdpdmVuQmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBnZXRWYWx1ZSwgc2V0VmFsdWUsIG9uLCBpbml0aWFsaXplIH0gPSBiaW5kZXI7XG5cbiAgICAvLyBjYWxsIGJpbmRlci5pbml0aWFsaXplXG4gICAgaWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIGJpbmRpbmdPcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBjYWxscyBnZXRWYWx1ZSBpbW1lZGlhdGVseSBhbmQgcmVhc3NpZ24gYSBwcm9wZXJ0eVxuICAgIC8vIHdoZW4gYWxsIHJlcXVpcmVkIGNvbmRpdGlvbnMgYXJlIG1ldCBmb3IgdGhpc1xuICAgIGlmIChnZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBhc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG4gICAgICAgIHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBiaW5kaW5nT3B0aW9ucyk7XG4gICAgICAgIGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcblxuICAgICAgICBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBub2ZuLmFzc2lnbih7IGZyb21Ob2RlOiB0cnVlIH0sIGV2ZW50T3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8vIGFkZCBuZWVkZWQgZXZlbnQgaGFuZGxlcnMgdGhlIG9iamVjdCB3aGVuIHNldFZhbHVlIGlzIGdpdmVuXG4gICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgIG9iamVjdEhhbmRsZXIgPSAoKSA9PiBydW5PYmplY3RIYW5kbGVyKHtcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBwcm9wRGVmLFxuICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgYmluZGluZ09wdGlvbnMsXG4gICAgICAgICAgICBldmVudE9wdGlvbnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYnkgZGVmYXVsdCBkZWJvdW5jaW5nIGlzIG9uXG4gICAgICAgIC8vIGl0IGNhbiBiZSB0dXJuZWQgb2ZmIGJ5IHBhc3NpbmcgZGVib3VuY2U9ZmFsc2UgdG8gZXZlbnQgb2JqZWN0XG4gICAgICAgIGlmIChkZWJvdW5jZU9wdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIGRlYm91bmNlT3B0aW9uID09PSAnbnVtYmVyJyA/IGRlYm91bmNlT3B0aW9uIDogMDtcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIgPSBkZWJvdW5jZShvYmplY3RIYW5kbGVyLCBkZWxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBuZWVkZWQgZXZlbnQgaGFuZGxlcnMgdGhlIG5vZGUgd2hlbiBnZXRWYWx1ZSAmIG9uIGFyZSBnaXZlblxuICAgIGlmIChnZXRWYWx1ZSAmJiBvbikge1xuICAgICAgICBub2RlSGFuZGxlciA9IChkb21FdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gbm9kZUhhbmRsZXIuZGlzYWJsZWQgPSB0cnVlIGlzIHNldCBpbiB1bmJpbmROb2RlXG4gICAgICAgICAgICAvLyB3ZSBjYW5ub3QgXCJ0dXJuIG9mZlwiIGJpbmRlci5vbiB3aGVuIGl0cyB2YWx1ZSBpcyBmdW5jdGlvblxuICAgICAgICAgICAgLy8gZGV2ZWxvcGVyIG5lZWRzIHRvIGNsZWFuIG1lbW9yeSAodHVybiBvZmYgY2FsbGJhY2spIG1hbnVhbHkgaW4gYmluZGVyLmRlc3Ryb3lcbiAgICAgICAgICAgIGlmKCFub2RlSGFuZGxlci5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICAgICAgICAgICAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wRGVmLFxuICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIGJpbmRpbmdPcHRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIHRocm93IGVycm9yIHdoZW4gXCJvblwiIGFuZCBtYXliZSBvdGhlciBiaW5kZXIgcHJvcGVydGllcyBoYXMgd3JvbmcgdHlwZVxuICAgICAgICBpZiAodHlwZW9mIG9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvbi5jYWxsKG5vZGUsIG5vZGVIYW5kbGVyLCBiaW5kaW5nT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICAvLyBhZGRFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChvbi5zcGxpdChzcGFjZVJlZyksXG4gICAgICAgICAgICAgICAgZXZ0TmFtZSA9PiBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgbm9kZUhhbmRsZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBiaW5kaW5nIGRhdGEgdG8gYmluZGluZ3MgYXJyYXlcbiAgICBiaW5kaW5ncy5wdXNoKHtcbiAgICAgICAgb24sXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgb2JqZWN0SGFuZGxlcixcbiAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgIGJpbmRpbmdPcHRpb25zXG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZlbnRPcHRpb25zID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9LCBldmVudE9wdGlvbnMpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgYmluZDoke2tleX1gLCBleHRlbmRlZEV2ZW50T3B0aW9ucyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAnYmluZCcsIGV4dGVuZGVkRXZlbnRPcHRpb25zKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fYmluZHNpbmdsZW5vZGUuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdEJpbmRlcnMgZnJvbSAnLi9kZWZhdWx0YmluZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZhdWx0QmluZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocmVzdWx0ID0gZGVmYXVsdEJpbmRlcnNbaV0uY2FsbChub2RlLCBub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvb2tmb3JiaW5kZXIuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9iaW5kZXJzL2lucHV0JztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL2JpbmRlcnMvdGV4dGFyZWEnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICcuL2JpbmRlcnMvc2VsZWN0JztcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL2JpbmRlcnMvcHJvZ3Jlc3MnO1xuaW1wb3J0IG91dHB1dCBmcm9tICcuL2JpbmRlcnMvb3V0cHV0JztcblxuZXhwb3J0IGRlZmF1bHQgW25vZGUgPT4ge1xuICAgIHN3aXRjaChub2RlLnRhZ05hbWUpIHtcbiAgICAgICAgY2FzZSAnSU5QVVQnOlxuICAgICAgICAgICAgcmV0dXJuIGlucHV0KG5vZGUudHlwZSk7XG4gICAgICAgIGNhc2UgJ1RFWFRBUkVBJzpcbiAgICAgICAgICAgIHJldHVybiB0ZXh0YXJlYSgpO1xuICAgICAgICBjYXNlICdTRUxFQ1QnOlxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdChub2RlLm11bHRpcGxlKTtcbiAgICAgICAgY2FzZSAnUFJPR1JFU1MnOlxuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzKCk7XG4gICAgICAgIGNhc2UgJ09VVFBVVCc6XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0KCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBib3VuZCBub2RlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICBkb21FdmVudCA9IHt9LFxuICAgIG9iamVjdCxcbiAgICBrZXksXG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBiaW5kaW5nT3B0aW9uc1xufSkge1xuICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBwcm9wRGVmLnZhbHVlO1xuICAgIGNvbnN0IHsgd2hpY2gsIHRhcmdldCB9ID0gZG9tRXZlbnQ7XG4gICAgY29uc3QgeyBnZXRWYWx1ZSB9ID0gYmluZGVyO1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBub2ZuLmFzc2lnbih7XG4gICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgIGRvbUV2ZW50LFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBkb21FdmVudC5vcmlnaW5hbEV2ZW50IHx8IGRvbUV2ZW50LCAvLyBqUXVlcnkgdGhpbmdcbiAgICAgICAgLy8gd2lsbCB0aHJvdyBcInByZXZlbnREZWZhdWx0IGlzIG5vdCBhIGZ1bmN0aW9uXCIgd2hlbiBkb21FdmVudCBpcyBlbXB0eSBvYmplY3RcbiAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IGRvbUV2ZW50LnByZXZlbnREZWZhdWx0KCksXG4gICAgICAgIC8vIHdpbGwgdGhyb3cgXCJzdG9wUHJvcGFnYXRpb24gaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICBzdG9wUHJvcGFnYXRpb246ICgpID0+IGRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLFxuICAgICAgICB3aGljaCxcbiAgICAgICAgdGFyZ2V0XG4gICAgfSwgYmluZGluZ09wdGlvbnMpKTtcblxuICAgIGlmICghaXModmFsdWUsIHByZXZpb3VzVmFsdWUpKSB7XG4gICAgICAgIC8vIFRPRE8gYWRkIGRlc2NyaXB0aW9uIG9mIGEgaGFja1xuICAgICAgICAvLyB3aHkgZG8gd2UgbmVlZCBjaGFuZ2VkTm9kZSwgb25DaGFuZ2VWYWx1ZSwgYmluZGVyP1xuICAgICAgICBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG4gICAgICAgICAgICBmcm9tTm9kZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYW5nZWROb2RlOiBub2RlLFxuICAgICAgICAgICAgb25DaGFuZ2VWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBiaW5kZXJcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvX3J1bm5vZGVoYW5kbGVyLmpzXG4gKiovIiwiLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBwcm9wZXJ0eSB2YWx1ZSBpcyBjaGFuZ2VkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW5PYmplY3RIYW5kbGVyKHtcbiAgICBub2RlLFxuICAgIHByb3BEZWYsXG4gICAgYmluZGVyLFxuICAgIGJpbmRpbmdPcHRpb25zLFxuICAgIGV2ZW50T3B0aW9uc1xufSkge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG4gICAgY29uc3QgeyBvbkNoYW5nZVZhbHVlLCBjaGFuZ2VkTm9kZSwgYmluZGVyOiBldnRCaW5kZXIgfSA9IGV2ZW50T3B0aW9ucztcbiAgICBjb25zdCB7IHNldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgLy8gZGlydHkgaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcbiAgICBjb25zdCBkaXJ0eUhhY2tWYWx1ZSA9IG9uQ2hhbmdlVmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgPyBTdHJpbmcodmFsdWUpIDogdmFsdWU7XG5cbiAgICBpZiAoY2hhbmdlZE5vZGUgPT09IG5vZGUgJiYgb25DaGFuZ2VWYWx1ZSA9PT0gZGlydHlIYWNrVmFsdWUgJiYgZXZ0QmluZGVyID09PSBiaW5kZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFZhbHVlLmNhbGwobm9kZSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgdmFsdWUgfSwgYmluZGluZ09wdGlvbnMpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19ydW5vYmplY3RoYW5kbGVyLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcImV2dFwiXSB9XSovXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vdHJpZ2dlci9fdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuLi9fY29yZS9kZWZpbmVwcm9wJztcblxuLy8gcHJvcGVydHkgbW9kaWZpZXIgZXZlbnQgcmVnZXhwXG5jb25zdCBwcm9wTW9kRXZlbnRSZWdcbiAgICA9IC9eX2NoYW5nZTpkZXBzOnxeX2NoYW5nZTpiaW5kaW5nczp8Xl9jaGFuZ2U6ZGVsZWdhdGVkOnxeX2NoYW5nZTp0cmVlOnxeY2hhbmdlOnxeYmVmb3JlY2hhbmdlOi87XG5cbi8vIGFkZHMgc2ltcGxlIGV2ZW50IGxpc3RlbmVyXG4vLyB1c2VkIGFzIGNvcmUgb2YgZXZlbnQgZW5naW5lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCBjdHggPSBjb250ZXh0IHx8IG9iamVjdDtcbiAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG4gICAgY29uc3QgZXZ0ID0geyBjYWxsYmFjaywgY29udGV4dCwgY3R4LCBuYW1lLCBpbmZvIH07XG5cblxuICAgIC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lXG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgZGF0YSwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBldnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBpZiAoKGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjay5fY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICYmIGV2dC5jb250ZXh0ID09PSBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGV2ZW50IGlzbid0IGZvdW5kIGFkZCBpdCB0byB0aGUgZXZlbnQgbGlzdFxuICAgICAgICBldmVudHMucHVzaChldnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lLCBjcmVhdGUgYXJyYXkgd2l0aCBvbmx5IGViZW50XG4gICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IFtldnRdO1xuICAgIH1cblxuICAgIGlmIChwcm9wTW9kRXZlbnRSZWcudGVzdChuYW1lKSkge1xuICAgICAgICAvLyBkZWZpbmUgbmVlZGVkIGFjY2Vzc29ycyBmb3IgS0VZXG4gICAgICAgIGRlZmluZVByb3Aob2JqZWN0LCBuYW1lLnJlcGxhY2UocHJvcE1vZEV2ZW50UmVnLCAnJykpO1xuICAgIH1cblxuICAgIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGBhZGRldmVudDoke25hbWV9YCwgZXZ0KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdhZGRldmVudCcsIGV2dCk7XG4gICAgfVxuXG4gICAgLy8gaWYgZXZlbnQgaXMgYWRkZWQgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uL19hZGRsaXN0ZW5lci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIGdpdmVuRGVsYXksIHRoaXNBcmcpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICBsZXQgZGVsYXk7XG4gICAgaWYgKHR5cGVvZiBkZWxheSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhpc0FyZyA9IGdpdmVuRGVsYXk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZGVsYXkgPSAwO1xuICAgIH1cblxuICAgIGRlbGF5ID0gZ2l2ZW5EZWxheSB8fCAwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgY29uc3QgW2ExLCBhMl0gPSBhcmdzO1xuICAgICAgICBjb25zdCBhcmdzTGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0gdGhpc0FyZyB8fCB0aGlzO1xuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goYXJnc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQsIGExKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQsIGExLCBhMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY2FsbENvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheSk7XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2RlYm91bmNlLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiBbXCJlcnJvclwiLCB7IFwiZnVuY3Rpb25zXCI6IGZhbHNlIH1dKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuLi9vZmYvX3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcblxuY29uc3QgdHJlZUNoYW5nZUV2dFJlZyA9IC9eX2NoYW5nZTp0cmVlOi87XG5cbmZ1bmN0aW9uIGNoYW5nZUhhbmRsZXIoe1xuICAgIHByZXZpb3VzVmFsdWUsXG4gICAgdmFsdWVcbn0sIHtcbiAgICBwYXRoLFxuICAgIG5hbWUsXG4gICAgY2FsbGJhY2ssXG4gICAgY29udGV4dFxufSA9IHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQuaW5mby5kZWxlZ2F0ZWREYXRhKSB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcih2YWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGlmIChwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgdHJlZSBjaGFuZ2UgZXZlbnQgd2hpY2ggaXMgdXNlZCBieSBiaW5kaW5ncyBsb2dpY1xuICAgIGlmICh0cmVlQ2hhbmdlRXZ0UmVnLnRlc3QobmFtZSkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlS2V5ID0gbmFtZS5yZXBsYWNlKHRyZWVDaGFuZ2VFdnRSZWcsICcnKTtcblxuICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiAhaXMocHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLCB2YWx1ZVtjaGFuZ2VLZXldKSkge1xuICAgICAgICAgICAgY29uc3QgeyBldmVudHMgfSA9IGRlZnMuZ2V0KHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHRyZWVDaGFuZ2VFdnROYW1lID0gYF9jaGFuZ2U6dHJlZToke2NoYW5nZUtleX1gO1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlRXZlbnRzID0gZXZlbnRzW3RyZWVDaGFuZ2VFdnROYW1lXTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VFdmVudHMpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKHZhbHVlLCB0cmVlQ2hhbmdlRXZ0TmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlW2NoYW5nZUtleV0sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVtjaGFuZ2VLZXldLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZ2l2ZW5QYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIGFkZCBzaW1wbGUgbGlzdGVuZXJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBkbyBhbGwgbWFnaWNcbiAgICAgICAgY29uc3Qga2V5ID0gcGF0aFswXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgY29udGV4dFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQgYnkgXCJzZXRcIlxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG4gICAgICAgICAgICBkZWxlZ2F0ZWREYXRhLFxuICAgICAgICAgICAgcGF0aFN0clxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWxsIGhhbmRsZXIgbWFudWFsbHlcbiAgICAgICAgY2hhbmdlSGFuZGxlcih7XG4gICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV1cbiAgICAgICAgfSwgZGVsZWdhdGVkRGF0YSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2RlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCJcbnhkZXNjcmliZSgnQmluZGluZ3MgcGFyc2VyJywgKCkgPT4ge1xuXHRpdCgnc2hvdWxkIGJpbmQgSFRNTCcsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8c3Bhbj57e3h9fTwvc3Bhbj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuXG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnaGknO1xuICAgICAgICBleHBlY3Qobm9kZS5maXJzdENoaWxkLmlubmVySFRNTCkudG9FcXVhbChvYmplY3QueCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBIVE1MIHVzaW5nIE1hdHJlc2hrYSBpbnN0YW5jZSBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHNwYW4+e3t4fX08L3NwYW4+JyksXG4gICAgICAgICAgICBtayA9IG5ldyBNSztcblxuICAgICAgICBtay5wYXJzZUJpbmRpbmdzKG5vZGUpO1xuICAgICAgICBtay54ID0gJ2hpJztcbiAgICAgICAgZXhwZWN0KG5vZGUuZmlyc3RDaGlsZC5pbm5lckhUTUwpLnRvRXF1YWwobWsueCk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cInt7eH19XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdoZXknO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgY2hlY2tlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cInt7eH19XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9IHRydWU7XG4gICAgICAgIGV4cGVjdChub2RlLmNoZWNrZWQpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHRleHRhcmVhcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8dGV4dGFyZWEgdmFsdWU9XCJ7e3h9fVwiPjwvdGV4dGFyZWE+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgY29tcGxleCBhdHRycycsICgpID0+IHt3aW5kb3cub2xvbG9zaGEgPSB0cnVlO1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxhIGhyZWY9XCJ7e3h9fS97e3l9fVwiPjwvYT4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Jhcic7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpKS50b0VxdWFsKG9iamVjdC54ICsgJy8nICsgb2JqZWN0LnkpO3dpbmRvdy5vbG9sb3NoYSA9IGZhbHNlO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNvbXBsZXggdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cInt7eH19IGFuZCB7e3l9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnZm9vJztcbiAgICAgICAgb2JqZWN0LnkgPSAnYmFyJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LnggKyAnIGFuZCAnICsgb2JqZWN0LnkpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZG50IGNyZWF0ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHZhbHVlPVwie3t4fX0gYW5kIHt7eX19XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdiYXInO1xuICAgICAgICBvYmplY3QueSA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCArICcgYW5kICcgKyBvYmplY3QueSk7XG4gICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyhvYmplY3QpKS50b0VxdWFsKFsneCcsICd5J10pO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIG5lc3RlZCBub2RlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKGBcbiAgICAgICAgICAgIDxkaXY+e3t4fX1cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCJ7e3l9fVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGF0dHI9XCJoZXkge3t6fX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCksXG4gICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jhcic7XG4gICAgICAgIG9iamVjdC56ID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLmlubmVySFRNTC5pbmRleE9mKCc8c3Bhbj4nICsgb2JqZWN0LnggKyAnPC9zcGFuPicpKS50b0VxdWFsKDApO1xuICAgICAgICBleHBlY3QocSgnaW5wdXQnLCBub2RlKS52YWx1ZSkudG9FcXVhbChvYmplY3QueSk7XG4gICAgICAgIGV4cGVjdChxKCdbYXR0cl0nLCBub2RlKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKSkudG9FcXVhbCgnaGV5ICcgKyBvYmplY3Queik7XG4gICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyhvYmplY3QpLnNvcnQoKSkudG9FcXVhbChbJ3gnLCAneScsICd6J10pO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBuZXN0ZWQgbm9kZXMgYW5kIGRlZXAgcHJvcGVydGllcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKGBcbiAgICAgICAgICAgIDxkaXY+e3thLmJ9fVxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cInt7Yy5kfX1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiaGV5IHt7ZS5mfX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCksXG4gICAgICAgIG9iamVjdCA9IHtcbiAgICAgICAgICAgIGE6IHtiOiAxfSxcbiAgICAgICAgICAgIGM6IHtkOiAyfSxcbiAgICAgICAgICAgIGU6IHtmOiAyfVxuICAgICAgICB9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC5hLmIgPSAnZm9vJztcbiAgICAgICAgb2JqZWN0LmMuZCA9ICdiYXInO1xuICAgICAgICBvYmplY3QuZS5mID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLmlubmVySFRNTC5pbmRleE9mKCc8c3Bhbj4nICsgb2JqZWN0LmEuYiArICc8L3NwYW4+JykpLnRvRXF1YWwoMCk7XG4gICAgICAgIGV4cGVjdChxKCdpbnB1dCcsIG5vZGUpLnZhbHVlKS50b0VxdWFsKG9iamVjdC5jLmQpO1xuICAgICAgICBleHBlY3QocSgnW2F0dHJdJywgbm9kZSkuZ2V0QXR0cmlidXRlKCdhdHRyJykpLnRvRXF1YWwoJ2hleSAnICsgb2JqZWN0LmUuZik7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aGVuIGJyYWNrZXRzIGFyZSByZWRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHZhbHVlPVwiW1t4XV0geW91XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fSxcblx0XHRcdGRlZmF1bHRCcmFja2V0cyA9IG1hZ2ljLnBhcnNlckJyYWNrZXRzO1xuXG5cdFx0bWFnaWMucGFyc2VyQnJhY2tldHMgPSB7XG5cdFx0XHRsZWZ0OiAnW1snLFxuXHRcdFx0cmlnaHQ6ICddXSdcblx0XHR9O1xuXG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnaGV5JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LnggKyAnIHlvdScpO1xuXG5cdFx0bWFnaWMucGFyc2VyQnJhY2tldHMgPSBkZWZhdWx0QnJhY2tldHM7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19wYXJzZXJfc3BlYy5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuaW1wb3J0IGJpbmRPcHRpb25hbE5vZGUgZnJvbSAnc3JjL2JpbmRvcHRpb25hbG5vZGUnO1xuaW1wb3J0IGJpbmRTYW5kYm94IGZyb20gJ3NyYy9iaW5kc2FuZGJveCc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICdzcmMvdW5iaW5kbm9kZSc7XG5pbXBvcnQgc2VsZWN0IGZyb20gJ3NyYy9zZWxlY3QnO1xuaW1wb3J0IHNlbGVjdEFsbCBmcm9tICdzcmMvc2VsZWN0YWxsJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdCaW5kaW5ncycsICgpID0+IHtcbiAgICBjb25zdCBub0RlYm91bmNlRmxhZyA9IHsgZGVib3VuY2U6IGZhbHNlIH07XG4gICAgbGV0IG9iajtcbiAgICBsZXQgbm9kZTtcbiAgICBsZXQgYmluZGVyO1xuICAgIGxldCBzaW11bGF0ZURvbUV2ZW50O1xuICAgIGxldCBpbml0aWFsaXplQ2FsbDtcbiAgICBsZXQgZGVzdHJveUNhbGw7XG5cbiAgICBjb25zdCB0ZXN0U2ltcGxlQmluZCA9IChrZXkgPSAneCcpID0+IHtcbiAgICAgICAgb2JqW2tleV0gPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmpba2V5XSkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChpbml0aWFsaXplQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH07XG5cbiAgICBjb25zdCB0ZXN0U2ltcGxlVW5iaW5kID0gKCkgPT4ge1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmF6JztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgZXhwZWN0KGRlc3Ryb3lDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGluaXRpYWxpemVDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGRlc3Ryb3lDYWxsID0gY3JlYXRlU3B5KCk7XG5cbiAgICAgICAgYmluZGVyID0gIHtcbiAgICAgICAgICAgIG9uKGNiYykge1xuICAgICAgICAgICAgICAgIHRoaXMub25kdW1teWV2ZW50ID0gY2JjO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbHVlKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0aWFsaXplKG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZUNhbGwoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5vbmR1bW15ZXZlbnQgPSAoKSA9PiB7fTtcbiAgICAgICAgICAgICAgICBkZXN0cm95Q2FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBkZWJvdW5jZScsIGRvbmUgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyKTtcbiAgICAgICAgb2JqLnggPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJycpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgICAgICBleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICAgICAgZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBhbmQgdHJpZ2dlciBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJpbmRDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGNvbnN0IGJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2JpbmQnLCBiaW5kQ2FsbCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2JpbmQ6eCcsIGJpbmRLZXlDYWxsKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgICAgICBleHBlY3QoYmluZENhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBhbmQgdHJpZ2dlciBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVuYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgdW5iaW5kS2V5Q2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQnLCB1bmJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAndW5iaW5kOngnLCB1bmJpbmRLZXlDYWxsKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3QodW5iaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QodW5iaW5kS2V5Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCB7IHg6IG5vZGUgfSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB1bmJpbmQgd25lIHdyb25nIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHdyb25nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIHdyb25nTm9kZSk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB1bmJpbmQgd25lIHdyb25nIGtleSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3knLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIHdoZW4gbm9kZSBpcyBub3QgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jyk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFsbCB3aGVuIG5laXRoZXIga2V5IG5vciBub2RlIGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIHsgeDogbm9kZSB9KTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGFycmF5IG9mIG9iamVjdHMnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgW3sga2V5OiAneCcsIG5vZGUsIGJpbmRlciB9XSwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSB9XSk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBhIHByb3BlcnR5IGluIGNvbnRleHQgb2JqZWN0IHdoaWNoIGhhcyBpc01LPXRydWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGJpbmROb2RlLmNhbGwob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvRXF1YWwobm9kZSk7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20ob2JqLiRub2Rlcy54KVxuICAgICAgICApLnRvRXF1YWwoW25vZGVdKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICAgICAgZXhwZWN0KG9iai5ub2Rlcy54KS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChvYmouJG5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSk7XG4gICAgICAgIG9iai54LnkueiA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnZm9vJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuY2VscyBkZWVwIGJpbmRpbmcgd2hlbiBkZWVwPWZhbHNlIG9wdGlvbiBpcyBwYXNzZWQnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGRlZXA6IGZhbHNlXG4gICAgICAgIH0sIG5vRGVib3VuY2VGbGFnKSk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCd4LnkueicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55LnonLCAnZ28nKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgb2JqLnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVtb3ZlIGJpbmRpbmcgaWYgZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgY29uc3QgeCA9IG9iai54O1xuXG4gICAgICAgIG9iai54ID0gbWFrZU9iamVjdCgneS56JywgJ2ZvbycpO1xuXG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIHdpbmRvdy50YXJnZXQgPSBvYmoueC55O1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgeC55LnogPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgY3VzdG9tIHNlbGVjdG9ycyBvbiBjdXJyZW50IHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55JywgJ2ZvbycpO1xuICAgICAgICBjb25zdCBjaGlsZE5vZGUgPSBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSk7XG5cbiAgICAgICAgYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIG5vZGUpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnknLCAnOnNhbmRib3ggc3BhbicsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXG4gICAgICAgIGV4cGVjdChjaGlsZE5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBjaGlsZE5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgY2hpbGROb2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueSkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdChgdGhyb3dzIGVycm9yIHdoZW4gbm9kZSBpc24ndCB0aGVyZWAsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoYGRvZXNuJ3QgdGhyb3cgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlIGFuZCBvcHRpb25hbD10cnVlIGlzIGdpdmVuYCwgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXNuXFwndCB0aHJvdyBlcnJvciB3aXRoIGJpbmRPcHRpb25hbE5vZGUgbWV0aG9kIG9mIE1hdHJlc2hrYSB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmRPcHRpb25hbE5vZGUob2JqLCAneCcpO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbGVjdHMgY2hpbGRyZW4gb2Ygc2FuZGJveCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGF0dHI9XCJmb29cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJ3NwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICdzcGFuJylbMF0uZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZWxlY3RzIG5vZGVzIHdpdGggY3VzdG9tIHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImZvb1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOnNhbmRib3ggc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6c2FuZGJveCBzcGFuJylbMF0uZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOnNhbmRib3ggdGFibGUnKVxuICAgICAgICApLnRvRXF1YWwobnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSB0YWJsZScpXG4gICAgICAgICkudG9FcXVhbChudWxsKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCkgdGFibGUnKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW10pO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpzYW5kYm94IHRhYmxlJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFtdKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gYmluZCBhbmQgcmViaW5kIHNhbmRib3ggdmlhIGJpbmRTYW5kYm94JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhbm90aGVyTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGJpbmRTYW5kYm94LmNhbGwob2JqLCBub2RlLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIGJpbmRTYW5kYm94LmNhbGwob2JqLCBhbm90aGVyTm9kZSwgbm9EZWJvdW5jZUZsYWcpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbYW5vdGhlck5vZGVdKTtcbiAgICB9KTtcblxuICAgIGl0KCdiaW5kU2FuZGJveCB0aHJvd3MgYW4gZXJyb3Igd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmRTYW5kYm94LmNhbGwob2JqKTtcbiAgICAgICAgfSkudG9UaHJvdygpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuXG4vLyBUT0RPIGRlc2NyaXB0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kT3B0aW9uYWxOb2RlKC4uLmFyZ3MpIHtcbiAgICAvLyB0aGlzIGhhY2sgYWxsb3dzIHRvIGtlZXAgYmluZE9wdGlvbmFsTm9kZSBhcyBjb21wYWN0IGFzIHBvc3NpYmxlXG4gICAgLy8gYW5kIGRvZXNuJ3QgcmVxdWlyZSB0byBmbGlwIGFyZ3MgYW5kIHN1cHBvZXIgYWxsIGJpbmROb2RlIHZhcmlhdGlvbnNcbiAgICBiaW5kTm9kZS50ZW1wb3JhcnlPcHRpb25hbEZsYWcgPSB0cnVlO1xuICAgIHJldHVybiBiaW5kTm9kZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG9wdGlvbmFsbm9kZS5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICcuL2JpbmRub2RlJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4vdW5iaW5kbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFNhbmRib3gob2JqZWN0LCBub2RlLCBldnQpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSBub2RlO1xuICAgICAgICBub2RlID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmRTYW5kYm94Jyk7XG4gICAgfVxuXG4gICAgdW5iaW5kTm9kZShvYmplY3QsICdzYW5kYm94JywgbnVsbCwgZXZ0KTtcbiAgICByZXR1cm4gYmluZE5vZGUob2JqZWN0LCAnc2FuZGJveCcsIG5vZGUsIG51bGwsIGV2dCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kc2FuZGJveC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vX2RvbSc7XG5pbXBvcnQgc2VsZWN0Tm9kZXMgZnJvbSAnLi9iaW5kbm9kZS9fc2VsZWN0bm9kZXMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi9fdXRpbC90b2FycmF5JztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclRlc3RSZWcgPSAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdChvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgc2VsZWN0b3IgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnc2VsZWN0QWxsJyk7XG4gICAgfVxuXG5cdGlmIChjdXN0b21TZWxlY3RvclRlc3RSZWcudGVzdChzZWxlY3RvcikpIHtcblx0XHRyZXR1cm4gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3RvcilbMF0gfHwgbnVsbDtcblx0fSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgICAgICBpZiAoIWRlZiB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHMuc2FuZGJveDtcblxuICAgICAgICBpZiAoIXByb3BEZWYpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgY29uc3QgeyBub2RlIH0gPSBiaW5kaW5nc1swXTtcbiAgICAgICAgICAgIHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cdH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZWxlY3QuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vYmluZG5vZGUvX3NlbGVjdG5vZGVzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4vX3V0aWwvdG9hcnJheSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JUZXN0UmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3RBbGwob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIHNlbGVjdG9yID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NlbGVjdEFsbCcpO1xuICAgIH1cblxuXG5cdGlmIChjdXN0b21TZWxlY3RvclRlc3RSZWcudGVzdChzZWxlY3RvcikpIHtcblx0XHRyZXR1cm4gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcik7XG5cdH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGRvbS4kKCk7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAgICAgaWYgKCFkZWYgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHMuc2FuZGJveDtcblxuICAgICAgICBpZiAoIXByb3BEZWYpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG4gICAgICAgIGlmKGJpbmRpbmdzKSB7XG4gICAgICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsICh7IG5vZGUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcblx0fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlbGVjdGFsbC5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgbmVzdGVkIG9iamVjdCBiYXNlZCBvbiBwYXRoIGFuZCBsYXN0VmFsdWVcbi8vIGV4YW1wbGU6IG1ha2VPYmplY3QoJ2EuYi5jJywgNDIpIC0+IHthOiB7Yjoge2M7IDQyfX19XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlT2JqZWN0KGdpdmVuUGF0aCA9ICcnLCBsYXN0VmFsdWUgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBnaXZlblBhdGggPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGxldCBvYmogPSByZXN1bHQ7XG4gICAgbGV0IGtleTtcblxuXG4gICAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICBrZXkgPSBwYXRoLnNoaWZ0KCk7XG4gICAgICAgIG9iaiA9IG9ialtrZXldID0ge307XG4gICAgfVxuXG4gICAgb2JqW3BhdGguc2hpZnQoKV0gPSBsYXN0VmFsdWU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3B5KCkge1xuICAgIGNvbnN0IHNweU5hbWUgPSBgcmFuZG9tTmFtZSR7TWF0aC5yYW5kb20oKX0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG4gICAgY29uc3Qgc3B5ID0gKCkgPT4ge307XG4gICAgY29uc3Qgc3B5T2JqID0ge307XG4gICAgc3B5T2JqW3NweU5hbWVdID0gc3B5O1xuICAgIHJldHVybiBzcHlPbihzcHlPYmosIHNweU5hbWUpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9jcmVhdGVzcHkuanNcbiAqKi8iLCJpbXBvcnQge1xuXHR0ZXh0YXJlYSxcbiAgICBpbnB1dCxcbiAgICBzZWxlY3QsXG4gICAgb3V0cHV0LFxuICAgIHByb2dyZXNzXG59IGZyb20gJ3NyYy9iaW5kZXJzJztcblxuaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnc3JjL2xvb2tmb3JiaW5kZXInO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJ3NyYy9iaW5kbm9kZSc7XG5cbmRlc2NyaWJlKCdEZWZhdWx0IGJpbmRlcnMnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuXHRsZXQgb2JqO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKHtcbiAgICAgICAgICAgIGJpbmRlcnNFcXVhbDogKHV0aWwsIGN1c3RvbUVxdWFsaXR5VGVzdGVycykgPT4gKHtcbiAgICAgICAgICAgICAgICBjb21wYXJlOiAoYWN0dWFsLCBleHBlY3RlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFzcyA9IHJlc3VsdC5wYXNzID0gdXRpbC5lcXVhbHMoYWN0dWFsLm9uLCBleHBlY3RlZC5vbiwgY3VzdG9tRXF1YWxpdHlUZXN0ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdXRpbC5lcXVhbHMoYCR7YWN0dWFsLmdldFZhbHVlfWAsIGAke2V4cGVjdGVkLmdldFZhbHVlfWAsIGN1c3RvbUVxdWFsaXR5VGVzdGVycylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHV0aWwuZXF1YWxzKGAke2FjdHVhbC5zZXRWYWx1ZX1gLCBgJHtleHBlY3RlZC5zZXRWYWx1ZX1gLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlID0gcGFzcyA/ICdCaW5kZXJzIGFyZSBlcXVhbCcgOiAnQmluZGVycyBhcmUgbm90IGVxdWFsJ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG5cdFx0b2JqID0ge307XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHRleHRhcmVhJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblx0XHRub2RlLnZhbHVlID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHRleHRhcmVhKCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwodGV4dGFyZWEoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHByb2dyZXNzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnKTtcblx0XHRub2RlLm1heCA9IDM7XG4gICAgICAgIG5vZGUudmFsdWUgPSAxO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBwcm9ncmVzcygpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKDEpO1xuXHRcdG9iai54ID0gMjtcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgyKTtcblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHByb2dyZXNzKCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0IGlucHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRub2RlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgaW5wdXQoJ3RleHQnKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChpbnB1dCgndGV4dCcpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgb3V0cHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3V0cHV0Jyk7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIG91dHB1dCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLmlubmVySFRNTCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwob3V0cHV0KCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBzZWxlY3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYCR7aX1gO1xuICAgICAgICAgICAgaWYoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzZWxlY3QoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnMScpO1xuXHRcdG9iai54ID0gJzUnO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCc1Jyk7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChzZWxlY3QoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHNlbGVjdCAobXVsdGlwbGUpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIG5vZGUubXVsdGlwbGUgPSB0cnVlO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGAke2l9YDtcbiAgICAgICAgICAgIGlmKGkgPT09IDEgfHwgaSA9PT0gNCB8fCBpID09PSA3KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHNlbGVjdCh0cnVlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChbJzEnLCAnNCcsICc3J10pO1xuXHRcdG9iai54ID0gWycyJywgJzUnLCAnOCddO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgbm9kZS5vcHRpb25zW2ldLnNlbGVjdGVkXG4gICAgICAgICAgICApLnRvRXF1YWwoXG4gICAgICAgICAgICAgICAgaSA9PT0gMiB8fCBpID09PSA1IHx8IGkgPT09IDhcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHNlbGVjdCh0cnVlKSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9kZWZhdWx0X2JpbmRlcnNfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5hZGQnLCAoKSA9PiB7XG4gICAgaXQoJ2FkZHMgb25jZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWw0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKFtlbDEsIGVsMiwgZWwzXSkuYWRkKFtlbDIsIGVsMywgZWw0LCBlbDVdKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsMiwgZWwzLCBlbDQsIGVsNV0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvYWRkX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuY3JlYXRlJywgKCkgPT4ge1xuICAgIGl0KCdjcmVhdGVzIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnKS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnRElWJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBhIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2Zvb2JhcidcbiAgICAgICAgICAgIH0pLmNsYXNzTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ2Zvb2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NyZWF0ZXMgY2hpbGRlbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZTogJ3NwYW4nXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pLmNoaWxkcmVuWzBdLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZ2V0QXR0cmlidXRlKCdmb28nKVxuICAgICAgICApLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIG9iamVjdCB3aXRoIHRhZ05hbWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiAnZGl2J1xuICAgICAgICAgICAgfSkudGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ0RJVicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2V4dGVuZHMgZGF0YXNldCBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZ2V0QXR0cmlidXRlKCdkYXRhLWZvbycpXG4gICAgICAgICkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcbmltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2xpYi9zaW11bGF0ZWNsaWNrJztcblxuZGVzY3JpYmUoJ2JRdWVyeSBldmVudHMnLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuICAgIGxldCBjaGlsZDE7XG4gICAgbGV0IGNoaWxkMjtcbiAgICBsZXQgZ3JhbmRjaGlsZDE7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQxXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGQxXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDJcIj48L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQxJyk7XG4gICAgICAgIGNoaWxkMiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDInKTtcbiAgICAgICAgZ3JhbmRjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZDEnKTtcblxuICAgICAgICB0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICAgICAgc3B5T24odGhpcywgJ2hhbmRsZXInKTtcbiAgICAgICAgaGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgICQoW3Rlc3RTYW5kYm94LCBjaGlsZDEsIGNoaWxkMiwgZ3JhbmRjaGlsZDFdKS5vZmYoJ2NsaWNrJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIG5hbWVzcGFjZWQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgYnViYmxpbmcgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChjbGljayBvbiBncmFuZGNoaWxkcmVuKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnRG9lc25cXHQgdHJpZ2dlciB3aGVuIGNsaWNrZWQgb24gd3JvbmcgY2hpbGQnLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQyJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIHNwZWNpZmllZCwgaGFuZGxlciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgbm90IHNwZWNpZmllZCwgaGFuZGxlciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgYW5kIGhhbmRsZXIgYXJlIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdTdG9wcyBwcm9wYWdhdGlvbicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgICQoY2hpbGQxKS5vbignY2xpY2snLCBldnQgPT4gZXZ0LnN0b3BQcm9wYWdhdGlvbigpKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXG4gKiovIiwiLy8gc2ltdWxhdGVzIGNsaWNrIG9uIGEgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2ltdWxhdGVDbGljayhub2RlKSB7XG4gICAgY29uc3QgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnQnKTtcbiAgICBldnQuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSk7XG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL3NpbXVsYXRlY2xpY2suanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uZmluZCcsICgpID0+IHtcbiAgICBsZXQgdGVzdFNhbmRib3g7XG4gICAgbGV0IGdyYW5kQ2hpbGQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgZ3JhbmRDaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmluZHMnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKHRlc3RTYW5kYm94KS5maW5kKCcuZ3JhbmRjaGlsZCcpXG4gICAgICAgIF0pLnRvRXF1YWwoW2dyYW5kQ2hpbGRdKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeSBpbml0aWFsaXphdGlvbicsICgpID0+IHtcbiAgICBsZXQgdGVzdFNhbmRib3g7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTFcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0yXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtM1wiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyB3aW5kb3cnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQod2luZG93KTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwod2luZG93KTtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIGRvY3VtZW50JywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGRvY3VtZW50KTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwoZG9jdW1lbnQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY29udmVydHMgYXJyYXktbGlrZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoY2hpbGRyZW4pO1xuXG4gICAgICAgIGV4cGVjdChjaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwocmVzdWx0Lmxlbmd0aCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXhwZWN0KGNoaWxkcmVuW2ldKS50b0VxdWFsKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGl0KCdDb252ZXJ0cyBvbmUgZWxlbWVudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyonKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChlbGVtZW50KTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KGVsZW1lbnQpLnRvRXF1YWwocmVzdWx0WzBdKTtcbiAgICB9KTtcblxuICAgIGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoJy50ZXN0LTEnLCB0ZXN0U2FuZGJveCkubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoJy50ZXN0LTEnLCAnLndyb25nLWNvbnRleHQnKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byB1c2UgbnVsbCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJChudWxsKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byB1c2UgdW5kZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCkubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gY3JlYXRlIHBsdWdpbnMnLCAoKSA9PiB7XG4gICAgICAgICQuZm4uYlF1ZXJ5UGx1Z2luID0gZnVuY3Rpb24gYlF1ZXJ5UGx1Z2luKCkge1xuICAgICAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgICAgIHRoaXMubGVuZ3RoXG4gICAgICAgICAgICApLnRvRXF1YWwoXG4gICAgICAgICAgICAgICAgdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLmxlbmd0aFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcblxuICAgICAgICBzcHlPbigkLmZuLCAnYlF1ZXJ5UGx1Z2luJyk7XG5cbiAgICAgICAgJCgnKicsIHRlc3RTYW5kYm94KS5iUXVlcnlQbHVnaW4oKTtcblxuICAgICAgICBleHBlY3QoJC5mbi5iUXVlcnlQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG4gICAgaXQoJ2NoZWNrcyBjbGFzc05hbWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICdlbCc7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJChlbCkuaXMoJy5lbCcpXG4gICAgICAgICkudG9FcXVhbCh0cnVlKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKGVsKS5pcygnLmVsMicpXG4gICAgICAgICkudG9FcXVhbChmYWxzZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pc19zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcbiAgICBpdCgnZXhjbHVkZXMgYnkgc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZWwyLmNsYXNzTmFtZSA9ICdlbDInO1xuXG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKFtlbDEsIGVsMiwgZWwzXSkubm90KCcuZWwyJylcbiAgICAgICAgXSkudG9FcXVhbChbZWwxLCBlbDNdKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5Lm9uZScsICgpID0+IHtcbiAgICBpdCgnZmluZHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDJcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3QgY2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQnKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLm9uZSgnKicsIHRlc3RTYW5kYm94KVxuICAgICAgICApLnRvRXF1YWwoY2hpbGQpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkucGFyc2VIVE1MJywgKCkgPT4ge1xuICAgIGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgY29udGV4dHVhbCBlbGVtZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzx0ZD48L3RkPjx0ZD48L3RkPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IENsYXNzIGZyb20gJ3NyYy9jbGFzcyc7XG5cbmRlc2NyaWJlKCdDbGFzcyBmdW5jdGlvbicsICgpID0+IHtcbiAgICBpdCgnYWxsb3dzIHRvIGluaGVyaXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IEEgPSBDbGFzcyh7IGE6IHRydWUgfSksXG4gICAgICAgICAgICBCID0gQ2xhc3MoeyBiOiB0cnVlLCBleHRlbmRzOiBBIH0pLFxuICAgICAgICAgICAgQyA9IENsYXNzKHsgYzogdHJ1ZSwgZXh0ZW5kczogQiB9KSxcbiAgICAgICAgICAgIGluc3QgPSBuZXcgQztcblxuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBCKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQykudG9CZVRydXRoeSgpO1xuXG4gICAgICAgIGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QuYikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdC5jKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3Mgc3RhdGljIHByb3BzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBBID0gQ2xhc3Moe30sIHsgc3RhdGljUHJvcDogdHJ1ZSB9KTtcbiAgICAgICAgZXhwZWN0KEEuc3RhdGljUHJvcCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2lmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGluc3QgPSBuZXcgQ2xhc3MoeyBhOiB0cnVlIH0pO1xuICAgICAgICBleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQ2xhc3MpLnRvQmVGYWxzeSgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9jbGFzc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuL2V4dGVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENsYXNzKHByb3RvdHlwZSwgc3RhdGljUHJvcHMpIHtcbiAgICBjb25zdCBDb25zdHJ1Y3RvciA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0XG4gICAgICAgICAgICA/IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxuICAgICAgICAgICAgOiBmdW5jdGlvbiBFbXB0eUNvbnN0cnVjdG9yKCkge30sXG4gICAgICAgIC8vZXh0ZW5kcyBpcyBrZXB0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgICAgIFBhcmVudCA9IHByb3RvdHlwZS5leHRlbmRzIHx8IHByb3RvdHlwZS5leHRlbmQsXG4gICAgICAgIC8vaW5oZXJpdCBwcm90byBmcm9tIGNsYXNzIHBhcmVudCBvciBlbXB0eSBvYmplY3RcbiAgICAgICAgcHJvdG8gPSBPYmplY3QuY3JlYXRlKFBhcmVudCA/IFBhcmVudC5wcm90b3R5cGUgOiB7fSk7XG5cbiAgICBleHRlbmQocHJvdG8sIHByb3RvdHlwZSk7XG5cbiAgICBpZiAodHlwZW9mIHN0YXRpY1Byb3BzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBleHRlbmQoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICB9XG5cbiAgICAvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIHByb3RvLmluc3RhbmNlT2YgPSBmdW5jdGlvbiBpbnN0YW5jZU9mKCkge1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yO1xuICAgIH07XG5cbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90bztcblxuICAgIC8vIGlmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2VcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIENsYXNzKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ29uc3RydWN0b3IoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3MuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHt9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXS5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7fSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaChuZXcgTUsuQXJyYXkoe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgeTogbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICAgICAgYToge31cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LnkuYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoYmFzaWMpJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBsZXQgY3R4O1xuICAgIGxldCBoYW5kbGVyO1xuXG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY3R4ID0ge307XG4gICAgICAgIHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdmaXJlcyAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuICAgICAgICBjb25zdCBhID0gb2JqLmE7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuICAgICAgICB0cmlnZ2VyT25lKGEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUoYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBhID0gb2JqLmE7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcbiAgICAgICAgdHJpZ2dlck9uZShhLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBiID0gb2JqLmEuYjtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuICAgICAgICB0cmlnZ2VyT25lKGIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBjID0gb2JqLmEuYztcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShjLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lc25cXCd0IHJlbW92ZSBjaGFuZ2UgZXZlbnQgd2hlbiB1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcbiAgICAgICAgb2JqLmEuYi5jID0gNTU7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1c2VzIGNvcnJlY3QgY29udGV4dCBmb3IgZGVsZWdhdGVkIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgbGV0IGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGZ1bmN0aW9uIGhhbmRsZSgpIHtcbiAgICAgICAgICAgIGJvb2wgPSB0aGlzID09PSBjdHg7XG4gICAgICAgIH0sIGN0eCk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9vZmYvX3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsICgpID0+IHtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgc2ltcGxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmoueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgc2ltcGxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmoueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyBudWxsIHRhcmdldCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYy54JywgMSk7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgb2JqLmEuYiA9IG51bGw7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9vZmYvX3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdFdmVudHMgY29yZTogYWRkTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVyLCB0cmlnZ2VyT25lJywgKCkgPT4ge1xuICAgIGxldCBvYmo7XG4gICAgbGV0IGN0eDtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgY3R4ID0ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcycsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTApKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMikpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAobm8gYXJncyknLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmopO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjaycsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG5cbnhkZXNjcmliZShcIkV2ZW50cyBjb3JlOiBfYWRkRE9NTGlzdGVuZXIsIF9yZW1vdmVET01MaXN0ZW5lclwiLCAoKSA9PiB7XG4gICAgbGV0IHEgPSAocywgYykgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgZXYuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG4gICAgICAgICAgICAgICAgICAgIDAgLypsZWZ0Ki8gLCBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG4gICAgICAgIHRhZ05hbWU6ICdESVYnLFxuICAgICAgICBpZDogJ2QtdGVzdCcsXG4gICAgICAgIGlubmVySFRNTDogYFxuICAgICAgICAgICAgPGRpdiBpZD1cImQtdGVzdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtdGVzdC0yXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfSkpO1xuXG5cblxuICAgIGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuXG4gICAgaXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgYW5kIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSB0aGVuIGJpbmRzIHRoZW4gcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBET00gZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnLCAxLCAyKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3IgKGJ1YmJsaW5nIHRlc3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkIGFuZCBkb2VzblxcJ3QgcmVtb3ZlIGV2ZW50cyBmcm9tIG90aGVyIG5vZGVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ibGFoJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3RyaWdnZXJzIGV2ZW50IHZpYSBcInRyaWdnZXJcIiBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb2ZmKScsICgpID0+IHtcbiAgICBsZXQgcSA9IChzLCBjKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcbiAgICAgICAgICAgICAgICBldi5pbml0TW91c2VFdmVudChcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICB0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgMCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cbiAgICAgICAgICAgICAgICAgICAgMCAvKmxlZnQqLyAsIG51bGxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcbiAgICAgICAgdGFnTmFtZTogJ0RJVicsXG4gICAgICAgIGlkOiAncy10ZXN0JyxcbiAgICAgICAgaW5uZXJIVE1MOiBgXG4gICAgICAgICAgICA8ZGl2IGlkPVwicy10ZXN0LTFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicy10ZXN0LTJcIj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9KSk7XG5cbiAgICBub2RlLmNsaWNrID0gbm9kZS5jbGljayB8fCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KCdjbGljaycpKTtcbiAgICB9XG5cbiAgICBpdCgnZmlyZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdmaXJlcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcbiAgICAgICAgbWsub24oJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsub2ZmKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLm9mZihvYmosICdhLmIuY0Bzb21lZXZlbnQnKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLm9mZihvYmosICdjbGljazo6eCcpO1xuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgbWFnaWMub25jZShvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25jZVwiJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGogPSAwLFxuICAgICAgICAgICAgZjEgPSBldnQgPT4gaSsrLFxuICAgICAgICAgICAgZjIgPSBldnQgPT4gaisrO1xuXG4gICAgICAgIG1hZ2ljLm9uY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIG9uY2Ugb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIG1rLm9uY2UoJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnb25EZWJvdW5jZSB3b3JrcycsIGRvbmUgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgbWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25EZWJvdW5jZVwiJywgKGRvbmUpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGopLnRvQmUoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgbWFnaWMub25EZWJvdW5jZShvYmosIHtcbiAgICAgICAgICAgIGZvbzogZjEsXG4gICAgICAgICAgICBiYXI6IGYyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdvbkRlYm91bmNlIHdvcmtzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsIGRvbmUgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDgwMCk7XG5cbiAgICAgICAgbWsub25EZWJvdW5jZSgnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBoYW5kbGVycyA9IHtcbiAgICAgICAgICAgICAgICBmb286ICgpID0+IGkrKyxcbiAgICAgICAgICAgICAgICBiYXI6ICgpID0+IGkrK1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuICAgICAgICBNSy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBNSy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuXG4gICAgICAgIE1LLm9mZihvYmosIGhhbmRsZXJzKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgdGhpc0FyZyA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgTUsub24ob2JqLCAnZm9vJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSwgdHJ1ZSwgdGhpc0FyZyk7XG5cbiAgICAgICAgTUsub24ob2JqLCAnYmFyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSwgdGhpc0FyZywgdHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMik7XG4gICAgfSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiAyMSxcblx0XCIuL19jb3JlL2RlZnMuanNcIjogMjAsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDE5LFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiAzMSxcblx0XCIuL19kb20vaW5kZXguanNcIjogMzAsXG5cdFwiLi9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcIjogMjQsXG5cdFwiLi9fdXRpbC9kZWJvdW5jZS5qc1wiOiA1Nyxcblx0XCIuL191dGlsL2lzLmpzXCI6IDI2LFxuXHRcIi4vX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcIjogMjUsXG5cdFwiLi9fdXRpbC90b2FycmF5LmpzXCI6IDI5LFxuXHRcIi4vYXJyYXkuanNcIjogODcsXG5cdFwiLi9iaW5kZXJzL19jbGFzc2xpc3QuanNcIjogNyxcblx0XCIuL2JpbmRlcnMvYXR0ci5qc1wiOiA5LFxuXHRcIi4vYmluZGVycy9jbGFzc25hbWUuanNcIjogNixcblx0XCIuL2JpbmRlcnMvZGF0YXNldC5qc1wiOiAxNyxcblx0XCIuL2JpbmRlcnMvZGlzcGxheS5qc1wiOiA1LFxuXHRcIi4vYmluZGVycy9odG1sLmpzXCI6IDQsXG5cdFwiLi9iaW5kZXJzL2luZGV4LmpzXCI6IDMsXG5cdFwiLi9iaW5kZXJzL2lucHV0LmpzXCI6IDEwLFxuXHRcIi4vYmluZGVycy9vdXRwdXQuanNcIjogMTEsXG5cdFwiLi9iaW5kZXJzL3Byb2dyZXNzLmpzXCI6IDE0LFxuXHRcIi4vYmluZGVycy9wcm9wLmpzXCI6IDgsXG5cdFwiLi9iaW5kZXJzL3NlbGVjdC5qc1wiOiAxMyxcblx0XCIuL2JpbmRlcnMvc3R5bGUuanNcIjogMTYsXG5cdFwiLi9iaW5kZXJzL3RleHQuanNcIjogMTUsXG5cdFwiLi9iaW5kZXJzL3RleHRhcmVhLmpzXCI6IDEyLFxuXHRcIi4vYmluZG5vZGUvX2JpbmRzaW5nbGVub2RlLmpzXCI6IDUxLFxuXHRcIi4vYmluZG5vZGUvX2dldG5vZGVzLmpzXCI6IDI3LFxuXHRcIi4vYmluZG5vZGUvX3J1bm5vZGVoYW5kbGVyLmpzXCI6IDU0LFxuXHRcIi4vYmluZG5vZGUvX3J1bm9iamVjdGhhbmRsZXIuanNcIjogNTUsXG5cdFwiLi9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanNcIjogMjgsXG5cdFwiLi9iaW5kbm9kZS9fc3dpdGNoYmluZGluZy5qc1wiOiA0Nixcblx0XCIuL2JpbmRub2RlL2luZGV4LmpzXCI6IDE4LFxuXHRcIi4vYmluZG9wdGlvbmFsbm9kZS5qc1wiOiA2MSxcblx0XCIuL2JpbmRzYW5kYm94LmpzXCI6IDYyLFxuXHRcIi4vYnF1ZXJ5L19kYXRhLmpzXCI6IDQwLFxuXHRcIi4vYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXCI6IDM0LFxuXHRcIi4vYnF1ZXJ5L19pbml0LmpzXCI6IDMzLFxuXHRcIi4vYnF1ZXJ5L2FkZC5qc1wiOiA0Myxcblx0XCIuL2JxdWVyeS9jcmVhdGUuanNcIjogMzgsXG5cdFwiLi9icXVlcnkvZmluZC5qc1wiOiA0NSxcblx0XCIuL2JxdWVyeS9pbmRleC5qc1wiOiAzMixcblx0XCIuL2JxdWVyeS9pcy5qc1wiOiA0MSxcblx0XCIuL2JxdWVyeS9ub3QuanNcIjogNDQsXG5cdFwiLi9icXVlcnkvb2ZmLmpzXCI6IDQyLFxuXHRcIi4vYnF1ZXJ5L29uLmpzXCI6IDM5LFxuXHRcIi4vYnF1ZXJ5L29uZS5qc1wiOiAzNyxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWwuanNcIjogMzYsXG5cdFwiLi9jYWxjLmpzXCI6IDg4LFxuXHRcIi4vY2xhc3MuanNcIjogNzksXG5cdFwiLi9kZWZhdWx0YmluZGVycy5qc1wiOiA1Myxcblx0XCIuL2V4dGVuZC5qc1wiOiAzNSxcblx0XCIuL2luZGV4LmpzXCI6IDg5LFxuXHRcIi4vbG9va2ZvcmJpbmRlci5qc1wiOiA1Mixcblx0XCIuL21hZ2ljLmpzXCI6IDkyLFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDkwLFxuXHRcIi4vb2JqZWN0L2luZGV4LmpzXCI6IDkxLFxuXHRcIi4vb2ZmL19yZW1vdmVsaXN0ZW5lci5qc1wiOiA0OSxcblx0XCIuL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDQ4LFxuXHRcIi4vb24vX2FkZGxpc3RlbmVyLmpzXCI6IDU2LFxuXHRcIi4vb24vX2RlbGVnYXRlbGlzdGVuZXIuanNcIjogNTgsXG5cdFwiLi9vbi9pbmRleC5qc1wiOiA5Myxcblx0XCIuL3BhcnNlYmluZGluZ3MuanNcIjogOTQsXG5cdFwiLi9zZWxlY3QuanNcIjogNjMsXG5cdFwiLi9zZWxlY3RhbGwuanNcIjogNjQsXG5cdFwiLi9zZXQuanNcIjogMjIsXG5cdFwiLi90cmlnZ2VyL190cmlnZ2Vyb25lLmpzXCI6IDIzLFxuXHRcIi4vdW5iaW5kbm9kZS9fcmVtb3ZlYmluZGluZy5qc1wiOiA1MCxcblx0XCIuL3VuYmluZG5vZGUvaW5kZXguanNcIjogNDdcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gODY7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gODZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcnJheS5qc1xuICoqLyIsImltcG9ydCBpbml0TUsgZnJvbSAnLi9fY29yZS9pbml0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FsYyhvYmplY3QsIHRhcmdldCwgc291cmNlLCBoYW5kbGVyLCBldmVudE9wdGlvbnMpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldmVudE9wdGlvbnMgPSBoYW5kbGVyO1xuICAgICAgICBoYW5kbGVyID0gc291cmNlO1xuICAgICAgICBzb3VyY2UgPSB0YXJnZXQ7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnY2FsYycpO1xuICAgIH1cblxuICAgIC8vZXZ0ID0gZXZ0IHx8IHt9O1xuICAgIGNvbnN0IGRlZnMgPSBpbml0TUsob2JqZWN0KTtcblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgKiB0aGlzLmNhbGMoW3t0YXJnZXQsIHNvdXJjZSwgaGFuZGxlciwgZXZlbnR9XSwgY29tbW9uRXZlbnQpO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZSxcbiAgICAgICAgICAgICAgICBiaW5kZXI6IGl0ZW1CaW5kZXIsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGl0ZW1FdmVudFxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1vbkV2ZW50ID0gbm9kZTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXJnZWRFdmVudCA9IHt9O1xuXG5cbiAgICAgICAgICAgICAgICBpZihpdGVtRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIGV2ZW50IG9iamVjdCBieSBcImxvY2FsXCIgZXZlbnQgKFwiZXZlbnRcIiBrZXkgb2YgYW4gb2JqZWN0KVxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgaXRlbUV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjb21tb25FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwiZ2xvYmFsXCIgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnQsIGNvbW1vbkV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBiaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIGl0ZW1Ob2RlLCBpdGVtQmluZGVyLCBtZXJnZWRFdmVudCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhbGMuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuLy9pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuXG5NYXRyZXNoa2EuQXJyYXkgPSBNYXRyZXNoa2FBcnJheTtcbk1hdHJlc2hrYS5PYmplY3QgPSBNYXRyZXNoa2FPYmplY3Q7XG5NYXRyZXNoa2EuQ2xhc3MgPSBDbGFzcztcbi8vTWF0cmVzaGthLmJpbmRlcnMgPSBiaW5kZXJzO1xuXG5leHBvcnQgZGVmYXVsdCBNYXRyZXNoa2E7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBDbGFzcyBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzKHtcbiAgICAvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuICAgIC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG4gICAgZXh0ZW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hdHJlc2hrYS9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYmplY3QvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFnaWMuanNcbiAqKi8iLCJcbi8vIC9eKChbXkBdKylAKT8oKC4rPykoOjooW15cXChcXCldKyk/KFxcKCguKilcXCkpPyk/KT8kL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbigpIHtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vaW5kZXguanNcbiAqKi8iLCIvL2ltcG9ydCBwYXJzZXJCcmFja2V0cyBmcm9tICcuL19iaW5kaW5ncy9wYXJzZXJicmFja2V0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2Rlcykge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYXJzZWJpbmRpbmdzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==