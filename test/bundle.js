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
	
	// require all modules from the
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
	
	var componentsContext = __webpack_require__(104);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/binders_spec.js": 2,
		"./bindings/bindings_parser_spec.js": 62,
		"./bindings/bindings_spec.js": 63,
		"./bindings/default_binders_spec.js": 70,
		"./bquery/add_spec.js": 71,
		"./bquery/create_spec.js": 72,
		"./bquery/events_spec.js": 73,
		"./bquery/find_spec.js": 75,
		"./bquery/init_spec.js": 76,
		"./bquery/is_spec.js": 77,
		"./bquery/not_spec.js": 78,
		"./bquery/one_spec.js": 79,
		"./bquery/parsehtml_spec.js": 80,
		"./calc_spec.js": 81,
		"./class_spec.js": 86,
		"./events/delegated_collection_spec.js": 88,
		"./events/delegated_spec.js": 89,
		"./events/events_change_spec.js": 90,
		"./events/events_core_spec.js": 91,
		"./events/events_dom_spec.js": 92,
		"./events/events_summary_spec.js": 98,
		"./events/tree_change_spec.js": 103
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
	
	var createBindingSwitcher = __webpack_require__(46);
	
	var bindSingleNode = __webpack_require__(52);
	
	var checkObjectType = __webpack_require__(24);
	
	var MatreshkaError = __webpack_require__(25);
	
	var delegateListener = __webpack_require__(60);
	
	var addListener = __webpack_require__(57);
	
	var removeListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(23);
	
	var unbindNode = __webpack_require__(47);
	
	var addTreeListener = __webpack_require__(61);
	
	// the main method of the framework: binds a property of an object to HTML node
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
	    var _eventOptions$deep = _eventOptions.deep;
	    var deep = _eventOptions$deep === undefined ? true : _eventOptions$deep;
	    var _eventOptions$silent = _eventOptions.silent;
	    var silent = _eventOptions$silent === undefined ? false : _eventOptions$silent;
	
	
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
	        var deepPath = key.split('.');
	        var deepPathLength = deepPath.length;
	
	        if (deepPathLength > 1) {
	            // handle binding when key arg includes dots (eg "a.b.c.d")
	            var bindingSwitcher = createBindingSwitcher({
	                object: object,
	                deepPath: deepPath,
	                $nodes: $nodes,
	                binder: binder,
	                eventOptions: eventOptions,
	                bindNode: bindNode
	            });
	
	            //console.log('azazalo', deepPath.slice(0, deepPathLength - 1));
	            addTreeListener(object, deepPath.slice(0, deepPathLength - 1), bindingSwitcher);
	
	            bindingSwitcher();
	
	            return object;
	        }
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
	
	var objectId = 0;
	
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
	            id: objectId++
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
	// since its performance is very critical we're checking events existence manually
	module.exports = set;
	function set(object, key, value, evt) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        evt = value;
	        value = key;
	        key = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'set');
	    }
	
	    // if no key or falsy key is given
	    if (!key) {
	        return object;
	    }
	
	    evt = evt || {};
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
	
	    var _evt = evt;
	    var skipMediator = _evt.skipMediator;
	    var fromMediator = _evt.fromMediator;
	    var force = _evt.force;
	    var forceHTML = _evt.forceHTML;
	    var silent = _evt.silent;
	    var silentHTML = _evt.silentHTML;
	    var skipLinks = _evt.skipLinks;
	
	
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
	
	    // trigger delegated events logic
	    if (isChanged) {
	        var changeTreeEvtName = '_change:tree:' + key;
	        if (events[changeTreeEvtName]) {
	            triggerOne(object, changeTreeEvtName, extendedEvt);
	        }
	    }
	
	    return object;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	// TODO: Add description and comments for triggerOne
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
	            object: object,
	            method: method
	        });
	    }
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	var bindingErrorPrefix = 'Binding error:';
	var calcErrorPrefix = 'Calc error:';
	var eventsErrorPrefix = 'Events error:';
	
	var getType = function (variable) {
	    if (variable === null) {
	        return 'null';
	    }
	
	    return typeof variable;
	};
	var getTypeError = function (variable, variableName, expectedType) {
	    return variableName + ' must have type "' + expectedType + '" but got "' + getType(variable) + '" instead.';
	};
	
	var errors = {
	    'binding:node_missing': function (_ref) {
	        var key = _ref.key;
	        var node = _ref.node;
	
	        var selectorInfo = typeof node === 'string' ? ' (given selector is "' + node + '")' : '';
	        return bindingErrorPrefix + ' node is missing for key "' + key + '"' + selectorInfo + '.';
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
	        var object = _ref3.object;
	        var method = _ref3.method;
	        return getTypeError(object, method, 'object');
	    },
	    'calc:target_type': function (_ref4) {
	        var target = _ref4.target;
	        return calcErrorPrefix + ' ' + getTypeError(target, 'target key', 'string');
	    },
	    'calc:source_key_type': function (_ref5) {
	        var sourceKey = _ref5.sourceKey;
	        return calcErrorPrefix + ' ' + getTypeError(sourceKey, 'source key', 'string');
	    },
	    'calc:source_object_type': function (_ref6) {
	        var sourceObject = _ref6.sourceObject;
	        return calcErrorPrefix + ' ' + getTypeError(sourceObject, 'source object', 'object');
	    },
	    'calc:source_type': function (_ref7) {
	        var source = _ref7.source;
	        return calcErrorPrefix + ' ' + getTypeError(source, 'source', 'object');
	    },
	    'trigger:names_type': function (_ref8) {
	        var names = _ref8.names;
	        return eventsErrorPrefix + ' ' + getTypeError(names, 'event name', 'string');
	    },
	    'on:names_type': this['trigger:names_type']
	
	};
	
	module.exports = matreshkaError;
	function matreshkaError(key, data) {
	    var getError = errors[key];
	    if (!getError) {
	        throw Error('Unknown error "' + key + '"');
	    }
	
	    return new Error(getError(data));
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
	
	// returns function which re-adds binding when object branch is changed
	// the function is called by bindNode when something like
	// 'foo.bar.baz' is passed to it as key arg value
	module.exports = createBindingSwitcher;
	function createBindingSwitcher(_ref) {
	    var object = _ref.object;
	    var deepPath = _ref.deepPath;
	    var $nodes = _ref.$nodes;
	    var binder = _ref.binder;
	    var eventOptions = _ref.eventOptions;
	    var bindNode = _ref.bindNode;
	
	    return function bindingSwitcher() {
	        var changeEvent = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        var deepPathLength = deepPath.length;
	        var lastDeepPathItem = deepPath[deepPathLength - 1];
	        var value = changeEvent.value;
	        var previousValue = changeEvent.previousValue;
	        var restPath = changeEvent.restPath;
	
	        var target = void 0; // an object to call bindNode
	        var previousTarget = void 0; // an object to call unbindNode
	
	
	        if (value && typeof value === 'object' && restPath) {
	            // if rest path is given and new value is an object
	            target = value;
	            for (var i = 0; i < restPath.length; i++) {
	                target = target[restPath[i]];
	                if (!target) {
	                    break;
	                }
	            }
	        } else {
	            // if rest path is not given
	            target = object;
	            for (var _i = 0; _i < deepPathLength - 1; _i++) {
	                target = target[deepPath[_i]];
	                if (!target) {
	                    break;
	                }
	            }
	        }
	
	        // if rest path is given and new value is an object
	        if (previousValue && typeof previousValue === 'object' && restPath) {
	            previousTarget = previousValue;
	            for (var _i2 = 0; _i2 < restPath.length; _i2++) {
	                previousTarget = previousTarget[restPath[_i2]];
	                if (!previousTarget) {
	                    break;
	                }
	            }
	        }
	
	        // add binding for new target
	        if (target && typeof target === 'object') {
	            bindNode(target, lastDeepPathItem, $nodes, binder, eventOptions);
	        }
	
	        // remove binding for previously used object
	        if (previousTarget && typeof previousTarget === 'object') {
	            unbindNode(previousTarget, lastDeepPathItem, $nodes);
	        }
	    };
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
	
	var removeTreeListener = __webpack_require__(50);
	
	var removeBinding = __webpack_require__(51);
	
	var dom = __webpack_require__(30);
	
	// unbinds a node
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
	            removeTreeListener(object, deepPath.slice(0, deepPathLength - 2));
	
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
	
	// removes delegated event listener from an object by given path
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
	
	var domEventReg = __webpack_require__(58);
	
	// removes simple event listener to an object
	module.exports = removeListener;
	function removeListener(object, name, callback, context, info) {
	    var def = defs.get(object);
	
	    // if no definition do nothing
	    if (!def) return;
	
	    var allEvents = def.events;
	
	    var events = allEvents[name];
	    var retain = [];
	    var noTrigger = name ? name[0] === '_' : false;
	    var domEvtExecResult = domEventReg.exec(name);
	
	    if (domEvtExecResult) {
	        var eventName = domEvtExecResult[1];
	        var _domEvtExecResult$ = domEvtExecResult[2];
	        var key = _domEvtExecResult$ === undefined ? 'sandbox' : _domEvtExecResult$;
	        var selector = domEvtExecResult[3];
	        // fixing circular reference issue
	
	        var removeDomListener = __webpack_require__(95);
	        removeDomListener(object, key, eventName, selector, callback, context, info);
	
	        return true;
	    }
	
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
	            var argCallback = callback && callback._callback || callback;
	            var evtCallback = evt.callback._callback || evt.callback;
	
	            if (argCallback && argCallback !== evtCallback || context && context !== evt.context) {
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
	} /* eslint no-shadow: ["error", { "allow": ["name", "events"] }]*/

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var undelegateListener = __webpack_require__(48);
	
	// removes tree listener from all object tree of fiven path
	// TODO: Pass context to removeTreeListener
	// TODO: Pass info to removeTreeListener
	module.exports = removeTreeListener;
	function removeTreeListener(object, deepPath, handler) {
	    if (typeof deepPath === 'string') {
	        deepPath = deepPath.split('.');
	    }
	
	    // iterate over keys of the path and undelegate given handler (can be undefined)
	    for (var i = 0; i < deepPath.length; i++) {
	        // TODO: Array.prototype.slice is slow
	        var listenPath = deepPath.slice(0, i);
	
	        undelegateListener(object, listenPath, '_change:tree:' + deepPath[i], handler);
	    }
	}

/***/ },
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(53);
	
	var createNodeHandler = __webpack_require__(55);
	
	var createObjectHandler = __webpack_require__(56);
	
	var triggerOne = __webpack_require__(23);
	
	var addListener = __webpack_require__(57);
	
	var debounce = __webpack_require__(59);
	
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
	    var _eventOptions$debounc = eventOptions.debounce;
	    var debounceOption = _eventOptions$debounc === undefined ? true : _eventOptions$debounc;
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
	        objectHandler = createObjectHandler({
	            node: node,
	            propDef: propDef,
	            binder: binder,
	            bindingOptions: bindingOptions,
	            eventOptions: eventOptions
	        });
	
	        // by default debouncing is on
	        // it can be turned off by passing debounce=false to event object
	        if (debounceOption || debounceOption === 0) {
	            var delay = typeof debounceOption === 'number' ? debounceOption : 0;
	            objectHandler = debounce(objectHandler, delay);
	        }
	
	        addListener(object, '_change:bindings:' + key, objectHandler, object, { skipChecks: true });
	
	        if (!isUndefined) {
	            objectHandler();
	        }
	    }
	
	    // add needed event handlers the node when getValue & on are given
	    if (getValue && on) {
	        nodeHandler = createNodeHandler({
	            object: object,
	            key: key,
	            node: node,
	            propDef: propDef,
	            binder: binder,
	            bindingOptions: bindingOptions
	        });
	
	        // TODO: Throw error when "on" and maybe other binder properties has wrong type
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(54);
	
	module.exports = function (node) {
	    var result = void 0;
	
	    for (var i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 54 */
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(26);
	
	var set = __webpack_require__(22);
	
	// returns a function which called when bound node state is changed
	module.exports = createNodeHandler;
	function createNodeHandler(_ref) {
	    var object = _ref.object;
	    var key = _ref.key;
	    var node = _ref.node;
	    var propDef = _ref.propDef;
	    var binder = _ref.binder;
	    var bindingOptions = _ref.bindingOptions;
	
	    return function nodeHandler() {
	        var domEvent = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        // nodeHandler.disabled = true is set in unbindNode
	        // we cannot "turn off" binder.on when its value is function
	        // developer needs to clean memory (turn off callback) manualy in binder.destroy
	        if (nodeHandler.disabled) {
	            return;
	        }
	
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
	    };
	}

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';
	
	// returns a function which is called when property value is changed
	module.exports = createObjectHandler;
	function createObjectHandler(_ref) {
	    var node = _ref.node;
	    var propDef = _ref.propDef;
	    var binder = _ref.binder;
	    var bindingOptions = _ref.bindingOptions;
	    var eventOptions = _ref.eventOptions;
	
	    return function objectHandler() {
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
	    };
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var triggerOne = __webpack_require__(23);
	
	var defineProp = __webpack_require__(21);
	
	var domEventReg = __webpack_require__(58);
	
	// property modifier event regexp
	/* eslint no-shadow: ["error", { "allow": ["evt"] }]*/
	var propModEventReg = /^_change:deps:|^_change:bindings:|^_change:delegated:|^_change:tree:|^change:|^beforechange:/;
	
	// adds simple event listener
	// used as core of event engine
	module.exports = addListener;
	function addListener(object, name, callback, context) {
	    var info = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
	    var _initMK = initMK(object);
	
	    var allEvents = _initMK.events;
	
	    var ctx = context || object;
	    var events = allEvents[name];
	    var evt = { callback: callback, context: context, ctx: ctx, name: name, info: info };
	    var _info$skipChecks = info.skipChecks;
	    var skipChecks = _info$skipChecks === undefined ? false : _info$skipChecks;
	
	
	    if (!skipChecks) {
	        var domEvtExecResult = domEventReg.exec(name);
	
	        if (domEvtExecResult) {
	            var eventName = domEvtExecResult[1];
	            var _domEvtExecResult$ = domEvtExecResult[2];
	            var key = _domEvtExecResult$ === undefined ? 'sandbox' : _domEvtExecResult$;
	            var selector = domEvtExecResult[3];
	            // fixing circular reference issue
	
	            var addDomListener = __webpack_require__(93);
	            addDomListener(object, key, eventName, selector, callback, context, info);
	
	            return true;
	        }
	    }
	
	    // if there are events with the same name
	    if (events) {
	        if (!skipChecks) {
	            // if there are events with the same data, return false
	            for (var i = 0; i < events.length; i++) {
	                var _evt = events[i];
	                var argCallback = callback && callback._callback || callback;
	                var evtCallback = _evt.callback._callback || _evt.callback;
	                if (argCallback === evtCallback && _evt.context === context) {
	                    return false;
	                }
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
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	// the regexp allows to parse things like "click::x(.y)"
	// it's shared between few modules
	module.exports = /([^\:\:]+)::([^\(\)]+)(?:\((.*)\))?/;

/***/ },
/* 59 */
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
	var undelegateListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(23);
	
	var defs = __webpack_require__(20);
	
	var is = __webpack_require__(26);
	
	// the function is called when some part of a path is changed
	// it delegates event listener for new branch of an object and undelegates it for old one
	function changeHandler(_ref) {
	    var previousValue = _ref.previousValue;
	    var value = _ref.value;
	
	    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? triggerOne.latestEvent.info.delegatedData : arguments[1];
	
	    var path = _ref2.path;
	    var name = _ref2.name;
	    var callback = _ref2.callback;
	    var context = _ref2.context;
	    var info = _ref2.info;
	
	    if (value && typeof value === 'object') {
	        delegateListener(value, path, name, callback, context, info);
	    }
	
	    if (previousValue && typeof previousValue === 'object') {
	        undelegateListener(previousValue, path, name, callback, context, info);
	    }
	}
	
	// adds delegated event listener to an object by given path
	module.exports = delegateListener;
	function delegateListener(object, givenPath, name, callback, context) {
	    var info = arguments.length <= 5 || arguments[5] === undefined ? { foo: 'bar' } : arguments[5];
	
	    // if typeof path is string and path is not empty string then split it
	    var path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;
	
	    if (!path || !path.length) {
	        // if no path then add simple listener
	        addListener(object, name, callback, context, info);
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
	            context: context,
	            info: info
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(60);
	
	var removeTreeListener = __webpack_require__(50);
	
	// creates tree listener
	function createTreeListener(_ref) {
	    var handler = _ref.handler;
	    var restPath = _ref.restPath;
	
	    var newHandler = function treeListener(changeEvt) {
	        var _result = { restPath: restPath };
	
	        for (var _source2 = changeEvt, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	            _key2 = _keys2[_i2];
	            _result[_key2] = _source2[_key2];
	        }
	
	        var newChangeEvent = _result;
	        var previousValue = changeEvt.previousValue;
	        var value = changeEvt.value;
	
	        // removes listener for all branches of the path on old object
	
	        if (previousValue && typeof previousValue === 'object') {
	            removeTreeListener(previousValue, restPath, handler);
	        }
	
	        // adds listener for all branches of "restPath" path on newly assigned object
	        if (value && typeof value === 'object') {
	            addTreeListener(value, restPath, handler);
	        }
	
	        // call original handler
	        handler.call(this, newChangeEvent);
	    };
	
	    newHandler._callback = handler;
	
	    return newHandler;
	}
	
	// listens changes for all branches of given path
	// TODO: Pass context to addTreeListener
	// TODO: Pass info to addTreeListener
	module.exports = addTreeListener;
	function addTreeListener(object, deepPath, handler) {
	    if (typeof deepPath === 'string') {
	        deepPath = deepPath.split('.');
	    }
	
	    // iterate over all keys and delegate listener for all objects of given branch
	    for (var i = 0; i < deepPath.length; i++) {
	        // TODO: Array.prototype.slice method is slow
	        var listenPath = deepPath.slice(0, i);
	        var restPath = deepPath.slice(i + 1);
	
	        delegateListener(object, listenPath, '_change:tree:' + deepPath[i], createTreeListener({
	            handler: handler,
	            restPath: restPath
	        }));
	    }
	}

/***/ },
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	var bindOptionalNode = __webpack_require__(64);
	
	var bindSandbox = __webpack_require__(65);
	
	var unbindNode = __webpack_require__(47);
	
	var select = __webpack_require__(66);
	
	var selectAll = __webpack_require__(67);
	
	var addListener = __webpack_require__(57);
	
	var makeObject = __webpack_require__(68);
	
	var createSpy = __webpack_require__(69);
	
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
	
	    xit('should bind and use DOM events', function () {});
	
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
	        var obj = makeObject('u.x.y.z', 'go');
	        bindNode(obj, 'u.x.y.z', node, binder, noDebounceFlag);
	        obj.u.x = makeObject('y.z', 'foo');
	        expect(node.value).toEqual('foo');
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(obj.u.x.y.z).toEqual('bar');
	    });
	
	    it('should remove binding if delegated target is reassigned', function () {
	        var obj = makeObject('u.x.y');
	        bindNode(obj, 'u.x.y.z', node, binder, noDebounceFlag);
	        var x = obj.u.x;
	
	        obj.u.x = makeObject('y.z', 'foo');
	
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(x.y.z).not.toEqual('bar');
	        expect(obj.u.x.y.z).toEqual('bar');
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	// TODO description
	module.exports = bindOptionalNode;
	function bindOptionalNode() {
	    // this hack allows to keep bindOptionalNode as compact as possible
	    // and doesn't require to flip args and suppoer all bindNode variations
	    bindNode.temporaryOptionalFlag = true;
	    return bindNode.apply(this, arguments);
	}

/***/ },
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = createSpy;
	function createSpy() {
	    var spy = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
	
	    var spyName = 'function';
	    var spyObj = {};
	    spyObj[spyName] = spy;
	    return spyOn(spyObj, spyName);
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _srcBinders = __webpack_require__(3);
	
	var textarea = _srcBinders.textarea;
	var input = _srcBinders.input;
	var select = _srcBinders.select;
	var output = _srcBinders.output;
	var progress = _srcBinders.progress;
	
	var lookForBinder = __webpack_require__(53);
	
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
/* 71 */
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
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-unresolved */
	
	
	var $ = __webpack_require__(32);
	
	var simulateClick = __webpack_require__(74);
	
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
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
/* 79 */
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
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var calc = __webpack_require__(82);
	
	var addListener = __webpack_require__(57);
	
	var makeObject = __webpack_require__(68);
	
	var createSpy = __webpack_require__(69);
	
	describe('calc', function () {
		it('adds simple dependency', function () {
			var obj = {
				a: 1,
				b: 2
			};
	
			calc(obj, 'c', ['a', 'b'], function (a, b) {
				return a + b;
			});
			expect(obj.c).toEqual(3);
			obj.a = 3;
			expect(obj.c).toEqual(5);
			obj.b = 3;
			expect(obj.c).toEqual(6);
		});
	
		it('adds simple dependency for object with isMK=true', function () {
			var obj = {
				isMK: true,
				a: 1,
				b: 2
			};
	
			calc.call(obj, 'c', ['a', 'b'], function (a, b) {
				return a + b;
			});
			expect(obj.c).toEqual(3);
			obj.a = 3;
			expect(obj.c).toEqual(5);
			obj.b = 3;
			expect(obj.c).toEqual(6);
		});
	
		it('adds dependency from another object', function () {
			var obj = {
				a: 1,
				b: 2
			};
			var obj2 = {
				c: 4,
				d: 8
			};
	
			calc(obj, 'e', [{
				object: obj,
				key: ['a', 'b']
			}, {
				object: obj2,
				key: ['c', 'd']
			}], function (a, b, c, d) {
				return a + b + c + d;
			});
	
			expect(obj.e).toEqual(15);
		});
	
		it('doesn\'t set on init via setOnInit=false', function () {
			var obj = {
				a: 1,
				b: 2,
				c: 0
			};
	
			calc(obj, 'c', ['a', 'b'], function (a, b) {
				return a + b;
			}, {
				setOnInit: false
			});
	
			expect(obj.c).toEqual(0);
		});
	
		it('protects from cyclical links', function () {
			var obj = {
				a: 1,
				b: 2,
				c: 3
			};
	
			calc(obj, 'a', ['b', 'c'], function (x, y) {
				return x + y;
			});
			calc(obj, 'b', ['a', 'c'], function (x, y) {
				return x + y;
			});
			calc(obj, 'c', ['a', 'b'], function (x, y) {
				return x + y;
			});
	
			expect(obj.a).toEqual(27);
		});
	
		xit('throws error when target is not a string', function () {});
		xit('throws error when source is not an object', function () {});
		xit('throws error when source key is not a string', function () {});
		xit('throws error when source object is not an object', function () {});
	
		it('allows deep dependencies', function () {
			var obj = makeObject('a.b.c', 1);
	
			calc(obj, 'd', 'a.b.c', function (c) {
				return c;
			});
			expect(obj.d).toEqual(1);
			obj.a.b.c = 2;
			expect(obj.d).toEqual(2);
	
			var b = obj.a.b;
			obj.a.b = { c: 3 };
			b.c = 'nope';
			expect(obj.d).toEqual(3);
	
			var a = obj.a;
			obj.a = { b: { c: 4 } };
			a.b = { c: 'nope' };
			expect(obj.d).toEqual(4);
		});
	
		it('allows deep dependencies from another object', function () {
			var obj = makeObject('a', 1);
			var obj2 = makeObject('b.c.d', 2);
	
			calc(obj, 'd', {
				object: obj2,
				key: 'b.c.d'
			}, function (c) {
				return c * 2;
			});
	
			expect(obj.d).toEqual(4);
		});
	
		it('uses event options', function () {
			var obj = {};
			var handler = createSpy(function (evt) {
				expect(evt.foo).toEqual('bar');
			});
			calc(obj, 'c', ['a', 'b'], function (a, b) {
				return a + b;
			}, { foo: 'bar' });
	
			addListener(obj, 'change:c', handler);
	
			obj.a = 2;
			obj.b = 3;
	
			expect(handler).toHaveBeenCalledTimes(1);
		});
	
		it('uses silent=true from event options', function () {
			var obj = {};
			var handler = createSpy();
	
			addListener(obj, 'change:c', handler);
	
			calc(obj, 'c', ['a', 'b'], function (a, b) {
				return a + b;
			}, { silent: true });
	
			obj.a = 2;
			obj.b = 3;
	
			expect(handler).not.toHaveBeenCalled();
		});
	
		it('allows to debounce handler', function (done) {
			var obj = {
				a: 1,
				b: 2
			};
			var handler = createSpy(function () {
				expect(obj.c).toEqual(5);
			});
	
			addListener(obj, 'change:c', handler);
	
			calc(obj, 'c', ['a', 'b'], function (a, b) {
				return a + b;
			}, {
				debounce: true
			});
	
			obj.a = 0;
			obj.a = 1;
			obj.a = 2;
			obj.b = 0;
			obj.b = 1;
			obj.b = 2;
			obj.b = 3;
	
			setTimeout(function () {
				expect(handler).toHaveBeenCalledTimes(1);
				done();
			}, 400);
		});
	});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var checkObjectType = __webpack_require__(24);
	
	var matreshkaError = __webpack_require__(25);
	
	var addListener = __webpack_require__(57);
	
	var delegateListener = __webpack_require__(60);
	
	var debounce = __webpack_require__(59);
	
	var addSource = __webpack_require__(83);
	
	var createCalcHandler = __webpack_require__(84);
	
	module.exports = calc;
	function calc(object, target, sources, givenHandler, eventOptions) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        eventOptions = givenHandler;
	        givenHandler = sources;
	        sources = target;
	        target = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'calc');
	    }
	
	    if (target instanceof Array) {
	        for (var _target = target, _index = 0, _ref, _l5 = _target.length; _ref = _target[_index], _index < _l5; _index++) {
	            var itemTarget = _ref.target;
	            var itemSources = _ref.sources;
	            var itemHandler = _ref.handler;
	            var itemEventOptions = _ref.event;
	
	            var commonEventOptions = sources;
	            var mergedEventOptions = {};
	
	            if (commonEventOptions) {
	                var _result = mergedEventOptions;
	                // extend event object by "global" event
	
	                for (var _source2 = commonEventOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	                    _key2 = _keys2[_i2];
	                    _result[_key2] = _source2[_key2];
	                }
	            }
	
	            if (itemEventOptions) {
	                var _result2 = mergedEventOptions;
	                // extend event object by "local" event ("event" key of an object)
	
	                for (var _source4 = itemEventOptions, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
	                    _key4 = _keys4[_i4];
	                    _result2[_key4] = _source4[_key4];
	                }
	            }
	
	            calc(object, itemTarget, itemSources, itemHandler, mergedEventOptions);
	        }
	        /*
	         * accept array of objects
	         * this.calc([{target, source, handler, event}], commonEventOptions);
	         */
	
	
	        return object;
	    }
	
	    if (typeof target !== 'string') {
	        throw matreshkaError('calc:target_type', { target: target });
	    }
	
	    eventOptions = eventOptions || {};
	    var def = initMK(object);
	    var _eventOptions = eventOptions;
	    var _eventOptions$setOnIn = _eventOptions.setOnInit;
	    var setOnInit = _eventOptions$setOnIn === undefined ? true : _eventOptions$setOnIn;
	    var _eventOptions$deep = _eventOptions.deep;
	    var deep = _eventOptions$deep === undefined ? true : _eventOptions$deep;
	    var _eventOptions$debounc = _eventOptions.debounce;
	    var debounceOption = _eventOptions$debounc === undefined ? false : _eventOptions$debounc;
	
	    var defaultHandler = function (value) {
	        return value;
	    };
	    var handler = givenHandler || defaultHandler;
	    var allSources = [];
	    var calcHandler = createCalcHandler({
	        object: object,
	        eventOptions: eventOptions,
	        allSources: allSources,
	        target: target,
	        def: def,
	        handler: handler
	    });
	
	    if (!(sources instanceof Array)) {
	        sources = [sources];
	    }
	
	    // by default debouncing is off
	    // it can be turned on by passing debounce=true or debounce=<number> to event object
	    if (debounceOption || debounceOption === 0) {
	        var delay = typeof debounceOption === 'number' ? debounceOption : 0;
	        calcHandler = debounce(calcHandler, delay);
	    }
	
	    for (var _target3 = sources, _index3 = 0, source, _l7 = _target3.length; source = _target3[_index3], _index3 < _l7; _index3++) {
	        if (typeof source === 'string') {
	            addSource({
	                calcHandler: calcHandler,
	                object: object,
	                allSources: allSources,
	                sourceKey: source,
	                sourceObject: object
	            });
	        } else {
	            (function () {
	                if (!source || typeof source !== 'object') {
	                    throw matreshkaError('calc:source_type', { source: source });
	                }
	
	                var sourceKey = source.key;
	                var sourceObject = source.object;
	                if (sourceKey instanceof Array) {
	                    for (var _target2 = sourceKey, _index2 = 0, sourceKeyItem, _l6 = _target2.length; sourceKeyItem = _target2[_index2], _index2 < _l6; _index2++) {
	                        addSource({
	                            calcHandler: calcHandler,
	                            object: object,
	                            allSources: allSources,
	                            sourceKey: sourceKeyItem,
	                            sourceObject: sourceObject
	                        });
	                    }
	                } else {
	                    addSource({
	                        calcHandler: calcHandler,
	                        object: object,
	                        allSources: allSources,
	                        sourceKey: sourceKey,
	                        sourceObject: sourceObject
	                    });
	                }
	            })();
	        }
	    }
	
	    if (setOnInit) {
	        calcHandler();
	    }
	}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
	var addTreeListener = __webpack_require__(61);
	
	// adds source to a source list and adds event listener to a source
	module.exports = addSource;
	function addSource(_ref) {
		var calcHandler = _ref.calcHandler;
		var object = _ref.object;
		var allSources = _ref.allSources;
		var sourceKey = _ref.sourceKey;
		var sourceObject = _ref.sourceObject;
	
		var isDelegated = false;
	
		// source key must be a string
		if (typeof sourceKey !== 'string') {
			throw matreshkaError('calc:source_key_type', { sourceKey: sourceKey });
		}
	
		// source object must be an object
		if (!sourceObject || typeof sourceObject !== 'object') {
			throw matreshkaError('calc:source_object_type', { sourceObject: sourceObject });
		}
	
		var deepPath = sourceKey.split('.');
		var deepPathLength = deepPath.length;
	
		// if something like a.b.c is used as a key
		if (deepPath.length > 1) {
			isDelegated = true;
			// TODO avoid collisions with bindings by using another event name instead of _change:tree:...
			addTreeListener(object, deepPath, calcHandler);
		} else {
			// normal handler
			addListener(object, '_change:deps:' + sourceKey, calcHandler);
		}
	
		allSources.push({
			sourceKey: sourceKey,
			sourceObject: sourceObject,
			isDelegated: isDelegated
		});
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var set = __webpack_require__(22);
	
	var deepFind = __webpack_require__(85);
	
	// TODO: Add description and comments for createCalcHandler
	module.exports = createCalcHandler;
	function createCalcHandler(_ref) {
		var object = _ref.object;
		var eventOptions = _ref.eventOptions;
		var allSources = _ref.allSources;
		var target = _ref.target;
		var def = _ref.def;
		var handler = _ref.handler;
	
		return function calcHandler() {
			var changeEvent = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			var values = [];
			var _changeEvent$protecto = changeEvent.protector;
			var protector = _changeEvent$protecto === undefined ? {} : _changeEvent$protecto;
	
			var protectKey = target + def.id;
			var _result = { protector: protector };
	
			for (var _source3 = eventOptions, _keys3 = Object.keys(_source3), _l4 = _keys3.length, _i3 = 0, _key3; _i3 < _l4; _i3++) {
				_key3 = _keys3[_i3];
				_result[_key3] = _source3[_key3];
			}
	
			var setEventOptions = _result;
			var _result2 = setEventOptions;
	
			for (var _source4 = changeEvent, _keys4 = Object.keys(_source4), _l5 = _keys4.length, _i4 = 0, _key4; _i4 < _l5; _i4++) {
				_key4 = _keys4[_i4];
				_result2[_key4] = _source4[_key4];
			}
	
			setEventOptions = _result2;
	
			if (protectKey in protector) {
				return;
			}
	
			protector[protectKey] = true;
	
			for (var _target = allSources, _index = 0, _ref2, _l3 = _target.length; _ref2 = _target[_index], _index < _l3; _index++) {
				var sourceObject = _ref2.sourceObject;
				var sourceKey = _ref2.sourceKey;
				var isDelegated = _ref2.isDelegated;
	
				var value = isDelegated ? deepFind(sourceObject, sourceKey) : sourceObject[sourceKey];
				values.push(value);
			}
	
			var targetValue = handler.apply(object, values);
			set(object, target, targetValue, setEventOptions);
		};
	}

/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';
	
	// gets value of a property in nested object
	// path example: a.b.c.d
	module.exports = deepFind;
	function deepFind(obj, path) {
		var paths = typeof path === 'string' ? path.split('.') : path,
		    current = obj,
		    i;
	
		for (i = 0; i < paths.length; ++i) {
			if (typeof current[paths[i]] == 'undefined') {
				return undefined;
			} else {
				current = current[paths[i]];
			}
		}
	
		return current;
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(87);
	
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
/* 87 */
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
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	/*eslint-disable */
	describe('Delegated events: delegateListener, undelegateListener (Matreshka.Object and Matreshka.Array)', function () {
	    xit('works with "*" events (MK.Array)', function () {
	        var obj = new MK.Array(),
	            bool = false;
	
	        magic._delegateListener(obj, '*', 'someevent', function (evt) {
	            return bool = true;
	        });
	
	        obj.push({});
	
	        magic.trigger(obj[0], 'someevent');
	
	        expect(bool).toBe(true);
	    });
	
	    xit('works with "*" events (MK.Object)', function () {
	        var obj = new MK.Object(),
	            bool = false;
	
	        magic._delegateListener(obj, '*', 'someevent', function (evt) {
	            return bool = true;
	        });
	
	        obj.jset('x', {});
	
	        magic.trigger(obj.x, 'someevent');
	
	        expect(bool).toBe(true);
	    });
	
	    xit('removes "*" events (MK.Array)', function () {
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
	
	    xit('removes "*" events (MK.Object)', function () {
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
	
	    xit('removes "*" events using callback (MK.Array)', function () {
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
	
	    xit('removes "*" events using callback (MK.Object)', function () {
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
	
	    xit('works with "*" events (MK.Array), go deeper (*.a)', function () {
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
	
	    xit('works with "*" events (MK.Object), go deeper (*.a)', function () {
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
	
	    xit('works with "*" events (MK.Array), go deeper (*.*)', function () {
	        var obj = new MK.Array(),
	            bool = false;
	
	        magic._delegateListener(obj, '*.*', 'someevent', function (evt) {
	            return bool = true;
	        });
	
	        obj.push(new MK.Array({}));
	
	        magic.trigger(obj[0][0], 'someevent');
	
	        expect(bool).toBe(true);
	    });
	
	    xit('works with "*" events (MK.Object), go deeper (*.*)', function () {
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
	
	    xit('works with "*" events (MK.Array), go deeper (*.*.a)', function () {
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
	
	    xit('works with "*" events (MK.Object), go deeper (*.*.a)', function () {
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(60);
	
	var undelegateListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(23);
	
	var makeObject = __webpack_require__(68);
	
	var createSpy = __webpack_require__(69);
	
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
	var delegateListener = __webpack_require__(60);
	
	var undelegateListener = __webpack_require__(48);
	
	var removeListener = __webpack_require__(49);
	
	var makeObject = __webpack_require__(68);
	
	var createSpy = __webpack_require__(69);
	
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
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
	var removeListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(23);
	
	var createSpy = __webpack_require__(69);
	
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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var simulateClick = __webpack_require__(74);
	
	var addDomListener = __webpack_require__(93);
	
	var removeDomListener = __webpack_require__(95);
	
	var triggerDOMEvent = __webpack_require__(96);
	
	var bindNode = __webpack_require__(18);
	
	var createSpy = __webpack_require__(69);
	
	describe("Events core: addDomListener, removeDomListener, triggerDOMListener", function () {
	    var node = void 0;
	    var obj = void 0;
	    var handler = void 0;
	    var childNode = void 0;
	    var grandchildNode = void 0;
	
	    beforeEach(function () {
	        obj = {};
	        handler = createSpy();
	        node = window.document.body.appendChild(window.document.createElement('div'));
	
	        node.innerHTML = '\n            <div id="child">\n                <div class="grandchild">\n\n                </div>\n            </div>\n        ';
	
	        childNode = node.querySelector('#child');
	        grandchildNode = node.querySelector('.grandchild');
	    });
	
	    afterEach(function () {
	        document.body.removeChild(node);
	    });
	
	    it('fires (no selector)', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', null, handler);
	        simulateClick(childNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes (no selector)', function () {
	        addDomListener(obj, 'x', 'click', null, handler);
	        removeDomListener(obj, 'x', 'click');
	        bindNode(obj, 'x', '#child');
	        simulateClick(childNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires (use selector)', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        simulateClick(grandchildNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('adds (use selector) and removes (no selector)', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        removeDomListener(obj, 'x', 'click');
	        simulateClick(grandchildNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('adds (use selector) then binds then removes (no selector)', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        removeDomListener(obj, 'x', 'click');
	        simulateClick(grandchildNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('triggers DOM event', function () {
	        var handler = createSpy(function (d1, d2) {
	            return expect(d1 + d2).toEqual(3);
	        });
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', null, handler);
	        triggerDOMEvent(obj, 'x', 'click', null, [1, 2]);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers DOM event with specified selector', function () {
	        var handler = createSpy(function (d1, d2) {
	            return expect(d1 + d2).toEqual(3);
	        });
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        triggerDOMEvent(obj, 'x', 'click', '.grandchild', [1, 2]);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers DOM event with specified selector (bubbling test)', function () {
	        var handler = createSpy(function (d1, d2) {
	            return expect(d1 + d2).toEqual(3);
	        });
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', null, handler);
	        triggerDOMEvent(obj, 'x', 'click', '.grandchild', [1, 2]);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes delegated', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', function (evt) {
	            return bool = true;
	        });
	        removeDomListener(obj, 'x', 'click', '.grandchild');
	        simulateClick(grandchildNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes delegated and doesn\'t remove events from other nodes', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        removeDomListener(obj, 'x', 'click', '.blah');
	        simulateClick(grandchildNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var defineProp = __webpack_require__(21);
	
	var addListener = __webpack_require__(57);
	
	var dom = __webpack_require__(30);
	
	var createDomEventHandler = __webpack_require__(94);
	
	// returns an object for bind and unbind events
	function createBindingHandlers(_ref) {
	    var fullEventName = _ref.fullEventName;
	    var domEventHandler = _ref.domEventHandler;
	    var selector = _ref.selector;
	
	    return {
	        bindHandler: function (evt) {
	            if (evt && evt.node) {
	                dom.$(evt.node).on(fullEventName, selector, domEventHandler);
	            }
	        },
	        unbindHandler: function (evt) {
	            if (evt && evt.node) {
	                dom.$(evt.node).off(fullEventName, selector, domEventHandler);
	            }
	        }
	    };
	}
	
	// adds DOM event listener for nodes bound to given property
	module.exports = addDomListener;
	function addDomListener(object, key, eventName, selector, callback, context, info) {
	    var def = initMK(object);
	    var propDef = defineProp(object, key);
	
	    var domEventHandler = createDomEventHandler({
	        key: key,
	        object: object,
	        callback: callback,
	        context: context
	    });
	
	    // making possible to remove this event listener
	    domEventHandler._callback = callback;
	
	    var eventNamespace = def.id + key;
	    var fullEventName = eventName + '.' + eventNamespace;
	
	    var _createBindingHandler = createBindingHandlers({
	        fullEventName: fullEventName,
	        domEventHandler: domEventHandler,
	        selector: selector
	    });
	
	    var bindHandler = _createBindingHandler.bindHandler;
	    var unbindHandler = _createBindingHandler.unbindHandler;
	
	    var addBindListenerResult = addListener(object, 'bind:' + key, bindHandler, context, info);
	    var addUnbindListenerResult = addListener(object, 'unbind:' + key, unbindHandler, context, info);
	
	    // if events are added successfully then run bindHandler for every node immediately
	    if (addBindListenerResult && addUnbindListenerResult) {
	        var bindings = propDef.bindings;
	
	        if (bindings) {
	            for (var _target = bindings, _index = 0, _ref2, _l = _target.length; _ref2 = _target[_index], _index < _l; _index++) {
	                var node = _ref2.node;
	                return bindHandler({ node: node });
	            }
	        }
	    }
	
	    return object;
	}

/***/ },
/* 94 */
/***/ function(module, exports) {

	"use strict";
	
	// returns DOM event handler
	module.exports = createDomEventHandler;
	function createDomEventHandler(_ref) {
	    var key = _ref.key;
	    var object = _ref.object;
	    var callback = _ref.callback;
	    var context = _ref.context;
	
	    return function domEventHandler(domEvent) {
	        var originalEvent = domEvent.originalEvent || domEvent;
	        var triggerArgs = originalEvent.matreshkaTriggerArgs;
	        var which = domEvent.which;
	        var target = domEvent.target;
	
	
	        if (triggerArgs) {
	            // if args are passed to trigger method then pass them to an event handler
	            callback.apply(context, triggerArgs);
	        } else {
	            // use the following object as an arg for event handler
	            callback.call(context, {
	                self: object,
	                node: this,
	                preventDefault: function () {
	                    return domEvent.preventDefault();
	                },
	                stopPropagation: function () {
	                    return domEvent.stopPropagation();
	                },
	                key: key,
	                domEvent: domEvent,
	                originalEvent: originalEvent,
	                which: which,
	                target: target
	            });
	        }
	    };
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var removeListener = __webpack_require__(49);
	
	var dom = __webpack_require__(30);
	
	// removes dom listener from nodes bound to given key
	module.exports = removeDomListener;
	function removeDomListener(object, key, eventName, selector, callback, context, info) {
	    var def = defs.get(object);
	
	    if (!def) {
	        return object;
	    }
	
	    var props = def.props;
	
	    var propDef = props[key];
	
	    if (!propDef) {
	        return object;
	    }
	
	    var bindings = propDef.bindings;
	
	
	    if (bindings) {
	        (function () {
	            // collect bound nodes and remove DOM event listener
	            var nodes = Array(bindings.length);
	            var eventNamespace = def.id + key;
	
	            for (var _target = bindings, index = 0, binding, _l = _target.length; binding = _target[index], index < _l; index++) {
	                nodes[index] = binding.node;
	            }
	
	            dom.$(nodes).off(eventName + '.' + eventNamespace, selector, callback);
	        })();
	    }
	
	    // remove bind and unbind listeners from given key
	    removeListener(object, 'bind:' + key, callback, context, info);
	    removeListener(object, 'unbind:' + key, callback, context, info);
	
	    return object;
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var triggerOneDOMEvent = __webpack_require__(97);
	
	var defs = __webpack_require__(20);
	
	// triggers DOM event on bound nodes
	module.exports = triggerDOMEvent;
	function triggerDOMEvent(object, key, eventName, selector, triggerArgs) {
	    var def = defs.get(object);
	
	    if (!def) {
	        return object;
	    }
	
	    var props = def.props;
	
	    var propDef = props[key];
	
	    if (!propDef) {
	        return object;
	    }
	
	    var bindings = propDef.bindings;
	
	
	    if (!bindings) {
	        return object;
	    }
	
	    for (var _target2 = bindings, _index2 = 0, _ref, _l2 = _target2.length; _ref = _target2[_index2], _index2 < _l2; _index2++) {
	        var node = _ref.node;
	
	
	        if (selector) {
	            // if selector is given trigger an event on all node descendants
	            var descendants = node.querySelectorAll(selector);
	
	            for (var _target = descendants, _index = 0, descendant, _l = _target.length; descendant = _target[_index], _index < _l; _index++) {
	                triggerOneDOMEvent({
	                    node: descendant,
	                    eventName: eventName,
	                    triggerArgs: triggerArgs
	                });
	            }
	        } else {
	            // trigger an event for single node
	            triggerOneDOMEvent({
	                node: node,
	                eventName: eventName,
	                triggerArgs: triggerArgs
	            });
	        }
	    }
	
	    return object;
	}

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';
	
	// triggers given DOM event on given node
	module.exports = triggerOneDOMEvent;
	function triggerOneDOMEvent(_ref) {
		var node = _ref.node;
		var eventName = _ref.eventName;
		var triggerArgs = _ref.triggerArgs;
		var _window = window;
		var document = _window.document;
		var Event = _window.Event;
	
		var event = void 0;
	
		// polyfill for older browsers
		if (document.createEvent) {
			/* istanbul ignore next */
			event = document.createEvent('Event');
			event.initEvent(eventName, true, true);
		} else if (typeof Event != 'undefined') {
			event = new Event(eventName, {
				bubbles: true,
				cancelable: true
			});
		}
	
		// matreshkaTriggerArgs will be used in a handler created by addDOMListener
		event.matreshkaTriggerArgs = triggerArgs;
	
		node.dispatchEvent(event);
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var on = __webpack_require__(99);
	
	var once = __webpack_require__(111);
	
	var onDebounce = __webpack_require__(112);
	
	var off = __webpack_require__(101);
	
	var trigger = __webpack_require__(102);
	
	var bindNode = __webpack_require__(18);
	
	var createSpy = __webpack_require__(69);
	
	var makeObject = __webpack_require__(68);
	
	var simulateClick = __webpack_require__(74);
	
	describe('Events summary (on, once, onDebounce, off, trigger)', function () {
	    var obj = void 0;
	    var ctx = void 0;
	    var handler = void 0;
	    var node = void 0;
	    var childNode = void 0;
	    var grandchildNode = void 0;
	
	    beforeEach(function () {
	        obj = {};
	        ctx = {};
	        handler = createSpy();
	        node = window.document.body.appendChild(window.document.createElement('div'));
	
	        node.innerHTML = '\n            <div id="child">\n                <div class="grandchild">\n\n                </div>\n            </div>\n        ';
	
	        childNode = node.querySelector('#child');
	        grandchildNode = node.querySelector('.grandchild');
	    });
	
	    afterEach(function () {
	        document.body.removeChild(node);
	    });
	
	    it('fires', function () {
	        on(obj, 'someevent', handler);
	        trigger(obj, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('fires on an object which has isMK=true property', function () {
	        var obj = { isMK: true };
	        on(obj, 'someevent', handler);
	        trigger(obj, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes', function () {
	        on(obj, 'someevent', handler);
	        off(obj, 'someevent');
	        trigger(obj, 'someevent');
	
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes an object which has isMK=true property', function () {
	        var obj = { isMK: true };
	        on(obj, 'someevent', handler);
	        off(obj, 'someevent');
	        trigger(obj, 'someevent');
	
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires delegated', function () {
	        var obj = makeObject('a.b.c');
	        on(obj, 'a.b.c@someevent', handler);
	        trigger(obj.a.b.c, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes delegated', function () {
	        var obj = makeObject('a.b.c');
	        on(obj, 'a.b.c@someevent', handler);
	        off(obj, 'a.b.c@someevent');
	        trigger(obj.a.b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires DOM event (no selector)', function () {
	        bindNode(obj, 'x', '#child');
	        on(obj, 'click::x', handler);
	        simulateClick(childNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes DOM event (no selector)', function () {
	        on(obj, 'click::x', handler);
	        off(obj, 'click::x');
	        bindNode(obj, 'x', '#child');
	        simulateClick(childNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires DOM event (uses selector)', function () {
	        bindNode(obj, 'x', '#child');
	        on(obj, 'click::x(.grandchild)', handler);
	        simulateClick(grandchildNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    xit('works with "*" events (MK.Array)', function () {
	        var obj = new MK.Array(),
	            bool = false;
	
	        magic.on(obj, '@someevent', function (evt) {
	            return bool = true;
	        });
	
	        obj.push({});
	
	        magic.trigger(obj[0], 'someevent');
	
	        expect(bool).toBe(true);
	    });
	
	    it('triggers once', function () {
	        once(obj, 'someevent', handler);
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    xit('allows to pass name-handler object to "once"', function () {
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
	
	    xit('triggers once on Matreshka instance', function () {
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
	        var handler = createSpy();
	
	        setTimeout(function () {
	            expect(handler).toHaveBeenCalledTimes(1);
	            done();
	        }, 200);
	
	        onDebounce(obj, 'someevent', handler);
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	    });
	
	    xit('allows to pass name-handler object to "onDebounce"', function (done) {
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
	
	    xit('onDebounce works on Matreshka instance', function (done) {
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
	        var handlers = {
	            foo: createSpy(),
	            bar: createSpy()
	        };
	
	        on(obj, handlers);
	
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	
	        expect(handlers.foo).toHaveBeenCalledTimes(1);
	        expect(handlers.bar).toHaveBeenCalledTimes(1);
	
	        off(obj, handlers);
	
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	
	        expect(handlers.foo).toHaveBeenCalledTimes(1);
	        expect(handlers.bar).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to flip context and triggerOnInit (on)', function () {
	        var thisArg = {};
	        var handler = createSpy(function () {
	            expect(this).toEqual(thisArg);
	        });
	
	        on(obj, 'foo', handler, true, thisArg);
	        on(obj, 'bar', handler, thisArg, true);
	        expect(handler).toHaveBeenCalledTimes(2);
	    });
	
	    xit('triggers event via "trigger" method', function () {
	        var obj = {},
	            bool = false;
	
	        magic.bindNode(obj, 'x', '#d-test');
	        magic._addDOMListener(obj, 'x', 'click', null, function (d1, d2) {
	            return bool = d1 === 1 && d2 === 2;
	        });
	        magic.trigger(obj, 'click::x', 1, 2);
	
	        expect(bool).toBe(true);
	    });
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var splitBySpaceReg = __webpack_require__(100);
	
	var checkObjectType = __webpack_require__(24);
	
	var matreshkaError = __webpack_require__(25);
	
	var addListener = __webpack_require__(57);
	
	var delegateListener = __webpack_require__(60);
	
	module.exports = on;
	function on(object, names, callback, triggerOnInit, context) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        context = triggerOnInit;
	        triggerOnInit = callback;
	        callback = names;
	        names = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'on');
	    }
	
	    var isNamesVarArray = names instanceof Array;
	
	    if (names && typeof names === 'object' && !isNamesVarArray) {
	        for (var _target = names, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            on(object, namesObjName, namesObjCallback, callback, triggerOnInit)
	        }
	
	        return object;
	    }
	
	    if (typeof names !== 'string' && !isNamesVarArray) {
	        throw matreshkaError('on:names_type', { names: names });
	    }
	
	    names = isNamesVarArray ? names : names.split(splitBySpaceReg); // split by spaces
	
	    if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
	        var _ref = [triggerOnInit, context];
	        context = _ref[0];
	        triggerOnInit = _ref[1];
	    }
	
	    for (var _target2 = names, _index = 0, name, _l2 = _target2.length; name = _target2[_index], _index < _l2; _index++) {
	        var delegatedEventParts = name.split('@');
	
	        if (delegatedEventParts.length > 1) {
	            var path = delegatedEventParts[0];
	            var delegatedName = delegatedEventParts[1];
	
	            delegateListener(object, path, delegatedName, callback, context);
	        } else {
	            addListener(object, name, callback, context);
	        }
	    }
	
	    if (triggerOnInit === true) {
	        callback.call(context || object, { triggerOnInit: triggerOnInit });
	    }
	
	    return object;
	}

/***/ },
/* 100 */
/***/ function(module, exports) {

	"use strict";
	
	// allows to split by space not inclusing things inside of brackers
	module.exports = /\s+(?![^(]*\))/g;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var splitBySpaceReg = __webpack_require__(100);
	
	var checkObjectType = __webpack_require__(24);
	
	var defs = __webpack_require__(20);
	
	var removeListener = __webpack_require__(49);
	
	var undelegateListener = __webpack_require__(48);
	
	module.exports = off;
	function off(object, names, callback, context) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        context = callback;
	        callback = names;
	        names = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'off');
	    }
	
	    var isNamesVarArray = names instanceof Array;
	    var def = defs.get(object);
	
	    // TODO: Name-handler object passed to off method is non-documented feature
	    if (names && typeof names === 'object' && !isNamesVarArray) {
	        for (var _target = names, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            off(object, namesObjName, namesObjCallback, callback)
	        }
	
	        return object;
	    }
	
	    if (!names && !callback && !context) {
	        def.events = {};
	        return object;
	    }
	
	    // TODO: Array of names passed to off method is non-documented feature
	    names = isNamesVarArray ? names : names.split(splitBySpaceReg); // split by spaces
	
	    for (var _target2 = names, _index = 0, name, _l2 = _target2.length; name = _target2[_index], _index < _l2; _index++) {
	        var delegatedEventParts = name.split('@');
	        if (delegatedEventParts.length > 1) {
	            var path = delegatedEventParts[0];
	            var delegatedName = delegatedEventParts[1];
	
	            undelegateListener(object, path, delegatedName, callback, context);
	        } else {
	            removeListener(object, name, callback, context);
	        }
	    }
	
	    return object;
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var domEventReg = __webpack_require__(58);
	
	var checkObjectType = __webpack_require__(24);
	
	var matreshkaError = __webpack_require__(25);
	
	var splitBySpaceReg = __webpack_require__(100);
	
	var defs = __webpack_require__(20);
	
	var triggerOne = __webpack_require__(23);
	
	var triggerDomEvent = __webpack_require__(96);
	
	// triggers event
	module.exports = trigger;
	function trigger() {
	    var object = void 0;
	    var givenNames = void 0;
	    var triggerArgs = void 0;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }
	
	    if (typeof this === 'object' && this.isMK) {
	        givenNames = args[0];
	        // when context is Matreshka instance, use this as an object and shift other args
	
	        triggerArgs = args.slice(1);
	
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        object = args[0];
	        givenNames = args[1];
	        triggerArgs = args.slice(2);
	        checkObjectType(object, 'trigger');
	    }
	    var names = void 0;
	
	    if (typeof givenNames === 'string') {
	        names = givenNames.split(splitBySpaceReg);
	    } else {
	        throw matreshkaError('trigger:names_type', {
	            names: givenNames
	        });
	    }
	
	    var def = defs.get(object);
	
	    // if no definition do nothing
	    if (!def) {
	        return object;
	    }
	
	    var allEvents = def.events;
	
	
	    if (!allEvents) {
	        return object;
	    }
	
	    for (var _target = names, _index = 0, name, _l = _target.length; name = _target[_index], _index < _l; _index++) {
	        var events = allEvents[name];
	        var domEvtExecResult = domEventReg.exec(name);
	
	        if (domEvtExecResult) {
	            var eventName = domEvtExecResult[1];
	            var _domEvtExecResult$ = domEvtExecResult[2];
	            var key = _domEvtExecResult$ === undefined ? 'sandbox' : _domEvtExecResult$;
	            var selector = domEvtExecResult[3];
	
	            triggerDomEvent(object, key, eventName, selector, triggerArgs);
	        } else {
	            triggerOne(object, name);
	        }
	    }
	
	    return object;
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addTreeListner = __webpack_require__(61);
	
	var removeTreeListner = __webpack_require__(50);
	
	var makeObject = __webpack_require__(68);
	
	var createSpy = __webpack_require__(69);
	
	describe('Tree change events', function () {
	    it('should listen tree and should remove listeners from previous subtree', function () {
	        var obj = makeObject('a.b.c.d.e');
	        var handler = createSpy();
	        addTreeListner(obj, 'a.b.c.d.e', handler);
	
	        var e = obj.a.b.c.d.e;
	        obj.a.b.c.d.e = {};
	        expect(handler).toHaveBeenCalledTimes(1);
	
	        // once again
	        obj.a.b.c.d.e = {};
	        expect(handler).toHaveBeenCalledTimes(2);
	
	        var d = obj.a.b.c.d;
	        obj.a.b.c.d = makeObject('e');
	        d.e = {};
	        expect(handler).toHaveBeenCalledTimes(3);
	
	        var c = obj.a.b.c;
	        obj.a.b.c = makeObject('d.e');
	        c.d = makeObject('e');
	        expect(handler).toHaveBeenCalledTimes(4);
	
	        var b = obj.a.b;
	        obj.a.b = makeObject('c.d.e');
	        b.c = makeObject('d.e');
	        expect(handler).toHaveBeenCalledTimes(5);
	
	        var a = obj.a;
	        obj.a = makeObject('b.c.d.e');
	        a.b = makeObject('c.d.e');
	        expect(handler).toHaveBeenCalledTimes(6);
	
	        obj.a.b.c.d.e = {};
	        expect(handler).toHaveBeenCalledTimes(7);
	
	        obj.a.b.c.d = {};
	        expect(handler).toHaveBeenCalledTimes(8);
	
	        obj.a.b.c = {};
	        expect(handler).toHaveBeenCalledTimes(9);
	
	        obj.a.b = {};
	        expect(handler).toHaveBeenCalledTimes(10);
	
	        obj.a = {};
	        expect(handler).toHaveBeenCalledTimes(11);
	
	        obj.a.b = {};
	        expect(handler).toHaveBeenCalledTimes(12);
	
	        obj.a.b.c = {};
	        expect(handler).toHaveBeenCalledTimes(13);
	
	        obj.a.b.c.d = {};
	        expect(handler).toHaveBeenCalledTimes(14);
	
	        obj.a.b.c.d.e = {};
	        expect(handler).toHaveBeenCalledTimes(15);
	    });
	
	    it('should remove tree listener by callback', function () {
	        var obj = makeObject('a.b.c');
	        var handler = createSpy();
	        addTreeListner(obj, 'a.b.c', handler);
	        removeTreeListner(obj, 'a.b.c', handler);
	
	        obj.a.b.c = {};
	        expect(handler).not.toHaveBeenCalled();
	
	        obj.a.b = makeObject('c');
	        expect(handler).not.toHaveBeenCalled();
	
	        obj.a = makeObject('b.c');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('should remove tree listener without', function () {
	        var obj = makeObject('a.b.c');
	        var handler = createSpy();
	        addTreeListner(obj, 'a.b.c', handler);
	        removeTreeListner(obj, 'a.b.c');
	
	        obj.a.b.c = {};
	        expect(handler).not.toHaveBeenCalled();
	
	        obj.a.b = makeObject('c');
	        expect(handler).not.toHaveBeenCalled();
	
	        obj.a = makeObject('b.c');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('should not remove tree listener by wrong callback', function () {
	        var obj = makeObject('a.b.c');
	        var handler = createSpy();
	        addTreeListner(obj, 'a.b.c', handler);
	        removeTreeListner(obj, 'a.b.c', function () {});
	
	        obj.a.b.c = {};
	        expect(handler).toHaveBeenCalledTimes(1);
	
	        obj.a.b = makeObject('c');
	        expect(handler).toHaveBeenCalledTimes(2);
	
	        obj.a = makeObject('b.c');
	        expect(handler).toHaveBeenCalledTimes(3);
	    });
	});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_core/defineprop.js": 21,
		"./_core/defs.js": 20,
		"./_core/init.js": 19,
		"./_dom/default-dollar.js": 31,
		"./_dom/index.js": 30,
		"./_helpers/checkobjecttype.js": 24,
		"./_helpers/debounce.js": 59,
		"./_helpers/deepfind.js": 85,
		"./_helpers/is.js": 26,
		"./_helpers/matreshkaerror.js": 25,
		"./_helpers/toarray.js": 29,
		"./array.js": 105,
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
		"./bindnode/_bindsinglenode.js": 52,
		"./bindnode/_createbindingswitcher.js": 46,
		"./bindnode/_createnodehandler.js": 55,
		"./bindnode/_createobjecthandler.js": 56,
		"./bindnode/_getnodes.js": 27,
		"./bindnode/_selectnodes.js": 28,
		"./bindnode/index.js": 18,
		"./bindoptionalnode.js": 64,
		"./bindsandbox.js": 65,
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
		"./calc/_addsource.js": 83,
		"./calc/_createcalchandler.js": 84,
		"./calc/index.js": 82,
		"./class.js": 87,
		"./defaultbinders.js": 54,
		"./extend.js": 35,
		"./index.js": 106,
		"./lookforbinder.js": 53,
		"./magic.js": 109,
		"./matreshka/index.js": 107,
		"./object/index.js": 108,
		"./off/_removedomlistener.js": 95,
		"./off/_removelistener.js": 49,
		"./off/_removetreelistener.js": 50,
		"./off/_undelegatelistener.js": 48,
		"./off/index.js": 101,
		"./on/_adddomlistener.js": 93,
		"./on/_addlistener.js": 57,
		"./on/_addtreelistener.js": 61,
		"./on/_createdomeventhandler.js": 94,
		"./on/_delegatelistener.js": 60,
		"./on/_domeventregexp.js": 58,
		"./on/_splitbyspaceregexp.js": 100,
		"./on/index.js": 99,
		"./once.js": 111,
		"./ondebounce.js": 112,
		"./parsebindings.js": 110,
		"./select.js": 66,
		"./selectall.js": 67,
		"./set.js": 22,
		"./trigger/_triggerdomevent.js": 96,
		"./trigger/_triggerone.js": 23,
		"./trigger/_triggeronedomevent.js": 97,
		"./trigger/index.js": 102,
		"./unbindnode/_removebinding.js": 51,
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
	webpackContext.id = 104;


/***/ },
/* 105 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(107);
	
	var MatreshkaArray = __webpack_require__(105);
	
	var MatreshkaObject = __webpack_require__(108);
	
	var Class = __webpack_require__(87);
	
	//import binders from './binders';
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	//Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(35);
	
	var Class = __webpack_require__(87);
	
	module.exports = Class({
	    // instance properies and methods
	
	}, {
	    // static properties and methods
	    extend: extend
	});

/***/ },
/* 108 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 109 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";
	
	//import parserBrackets from './_bindings/parserbrackets';
	
	module.exports = parseBindings;
	function parseBindings(object, nodes) {}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var on = __webpack_require__(99);
	
	var checkObjectType = __webpack_require__(24);
	
	var off = __webpack_require__(101);
	
	module.exports = once;
	function once(object, names, givenCallback, context) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        context = givenCallback;
	        givenCallback = names;
	        names = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'once');
	    }
	
	    var isNamesVarArray = names instanceof Array;
	
	    if (names && typeof names === 'object' && !isNamesVarArray) {
	        for (var _target = names, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            once(object, namesObjName, namesObjCallback, givenCallback)
	        }
	
	        return object;
	    }
	
	    var callback = function onceCallback() {
	        givenCallback.apply(this, arguments);
	        off(object, names, onceCallback, context);
	    };
	
	    callback._callback = givenCallback;
	
	    return on(object, names, callback, context);
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var on = __webpack_require__(99);
	
	var checkObjectType = __webpack_require__(24);
	
	var debounce = __webpack_require__(59);
	
	module.exports = onDebounce;
	function onDebounce(object, names, givenCallback, givenDelay, triggerOnInit, context) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        context = triggerOnInit;
	        triggerOnInit = debounceDelay;
	        debounceDelay = givenCallback;
	        givenCallback = names;
	        names = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'onDebounce');
	    }
	
	    var isNamesVarArray = names instanceof Array;
	
	    if (names && typeof names === 'object' && !isNamesVarArray) {
	        for (var _target = names, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            onDebounce(object, namesObjName, namesObjCallback, givenCallback, debounceDelay, triggerOnInit)
	        }
	
	        return object;
	    }
	
	    var delay = typeof givenDelay === 'number' ? givenDelay : 0;
	
	    var callback = debounce(givenCallback, delay);
	
	    callback._callback = givenCallback;
	
	    return on(object, names, callback, triggerOnInit, context);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjEzMGE1ODAwNTAzNTMzYTQwMDEiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9odG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9hdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9faGVscGVycy9jaGVja29iamVjdHR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19oZWxwZXJzL21hdHJlc2hrYWVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9faGVscGVycy9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2dldG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19oZWxwZXJzL3RvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29mZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2FkZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L25vdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlL19jcmVhdGViaW5kaW5nc3dpdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuYmluZG5vZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvX3JlbW92ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvX3JlbW92ZXRyZWVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS9fcmVtb3ZlYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2JpbmRzaW5nbGVub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0YmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2NyZWF0ZW5vZGVoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9fY3JlYXRlb2JqZWN0aGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24vX2FkZGxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9fZG9tZXZlbnRyZWdleHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19oZWxwZXJzL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9fZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24vX2FkZHRyZWVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRzYW5kYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2hlbHBlcnMvbWFrZW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2hlbHBlcnMvY3JlYXRlc3B5LmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9iaW5kaW5ncy9kZWZhdWx0X2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2hlbHBlcnMvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NhbGNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsYy9fYWRkc291cmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jYWxjL19jcmVhdGVjYWxjaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2hlbHBlcnMvZGVlcGZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24vX2FkZGRvbWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9fY3JlYXRlZG9tZXZlbnRoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvX3JlbW92ZWRvbWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy90cmlnZ2VyL190cmlnZ2VyZG9tZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyaWdnZXIvX3RyaWdnZXJvbmVkb21ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9fc3BsaXRieXNwYWNlcmVnZXhwLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyaWdnZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy90cmVlX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYyAuKlxcLmpzJCIsIndlYnBhY2s6Ly8vLi9zcmMvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRyZXNoa2EvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFnaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BhcnNlYmluZGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uZGVib3VuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBLEtBQU0sMkJBQTJCLEVBQWpDOztBQUVBO0FBQ0E7QUFDQSxLQUFNLGVBQWUsc0JBQXJCOztBQUVBLFVBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN6QixTQUFPLHlCQUF5QixPQUF6QixDQUFpQyxJQUFqQyxLQUEwQyxDQUFqRDtBQUNBOztBQUVELEtBQUksV0FBVyxhQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FBMkIsVUFBM0IsQ0FBZjs7QUFFQTtBQUNBLEtBQUksQ0FBQyxTQUFTLE1BQWQsRUFBc0I7QUFDckIsYUFBVyxhQUFhLElBQWIsRUFBWDtBQUNBOztBQUVELFVBQVMsT0FBVCxDQUFpQixZQUFqQjs7QUFHQSxLQUFNLG9CQUFvQix3QkFBMUI7QUFDQSxtQkFBa0IsSUFBbEIsR0FBeUIsT0FBekIsQ0FBaUMsaUJBQWpDLEU7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFpQyx1REFBdUQ7QUFDeEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozt1Q0MxQk8sQzs7Ozs7Ozs7Ozs7b0NBQ2MsRTs7QUFFckIs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ciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjEzMGE1ODAwNTAzNTMzYTQwMDFcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGZyb20gdGhlXG4vLyBjdXJyZW50IGRpcmVjdG9yeSBhbmQgYWxsIHN1YmRpcmVjdG9yaWVzXG5jb25zdCB0ZXN0c0NvbnRleHQgPSByZXF1aXJlLmNvbnRleHQoJy4vc3BlYy8nLCB0cnVlLCAvLipcXC5qcyQvKTtcblxuZnVuY3Rpb24gaW5NYW5pZmVzdChwYXRoKSB7XG5cdHJldHVybiBfX2thcm1hV2VicGFja01hbmlmZXN0X18uaW5kZXhPZihwYXRoKSA+PSAwO1xufVxuXG5sZXQgcnVubmFibGUgPSB0ZXN0c0NvbnRleHQua2V5cygpLmZpbHRlcihpbk1hbmlmZXN0KTtcblxuLy8gUnVuIGFsbCB0ZXN0cyBpZiB3ZSBkaWRuJ3QgZmluZCBhbnkgY2hhbmdlc1xuaWYgKCFydW5uYWJsZS5sZW5ndGgpIHtcblx0cnVubmFibGUgPSB0ZXN0c0NvbnRleHQua2V5cygpO1xufVxuXG5ydW5uYWJsZS5mb3JFYWNoKHRlc3RzQ29udGV4dCk7XG5cblxuY29uc3QgY29tcG9uZW50c0NvbnRleHQgPSByZXF1aXJlLmNvbnRleHQoJy4uL3NyYy8nLCB0cnVlLCAvLipcXC5qcyQvKTtcbmNvbXBvbmVudHNDb250ZXh0LmtleXMoKS5mb3JFYWNoKGNvbXBvbmVudHNDb250ZXh0KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9pbmRleC5qc1xuICoqLyIsInZhciBtYXAgPSB7XG5cdFwiLi9iaW5kaW5ncy9iaW5kZXJzX3NwZWMuanNcIjogMixcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3BhcnNlcl9zcGVjLmpzXCI6IDYyLFxuXHRcIi4vYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1wiOiA2Myxcblx0XCIuL2JpbmRpbmdzL2RlZmF1bHRfYmluZGVyc19zcGVjLmpzXCI6IDcwLFxuXHRcIi4vYnF1ZXJ5L2FkZF9zcGVjLmpzXCI6IDcxLFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXCI6IDcyLFxuXHRcIi4vYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXCI6IDczLFxuXHRcIi4vYnF1ZXJ5L2ZpbmRfc3BlYy5qc1wiOiA3NSxcblx0XCIuL2JxdWVyeS9pbml0X3NwZWMuanNcIjogNzYsXG5cdFwiLi9icXVlcnkvaXNfc3BlYy5qc1wiOiA3Nyxcblx0XCIuL2JxdWVyeS9ub3Rfc3BlYy5qc1wiOiA3OCxcblx0XCIuL2JxdWVyeS9vbmVfc3BlYy5qc1wiOiA3OSxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1wiOiA4MCxcblx0XCIuL2NhbGNfc3BlYy5qc1wiOiA4MSxcblx0XCIuL2NsYXNzX3NwZWMuanNcIjogODYsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1wiOiA4OCxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1wiOiA4OSxcblx0XCIuL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcIjogOTAsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1wiOiA5MSxcblx0XCIuL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcIjogOTIsXG5cdFwiLi9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1wiOiA5OCxcblx0XCIuL2V2ZW50cy90cmVlX2NoYW5nZV9zcGVjLmpzXCI6IDEwM1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Rlc3Qvc3BlYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCB7XG5cdGh0bWwsXG5cdHRleHQsXG5cdHByb3AsXG5cdGF0dHIsXG5cdGNsYXNzTmFtZSxcblx0ZGF0YXNldCxcblx0c3R5bGUsXG5cdGRpc3BsYXlcbn0gZnJvbSAnc3JjL2JpbmRlcnMnO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJ3NyYy9iaW5kbm9kZSc7XG5cbmRlc2NyaWJlKCdCaW5kZXJzJywgKCkgPT4ge1xuXHRjb25zdCBub0RlYm91bmNlRmxhZyA9IHsgZGVib3VuY2U6IGZhbHNlIH07XG5cdGNvbnN0IGRhdGFzZXRJdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmRhdGFzZXQgPyBpdCA6IHhpdDtcblx0bGV0IG9iajtcblx0bGV0IG5vZGU7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0bm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBwcm9wJywgKCkgPT4ge1xuXHRcdG5vZGUuc29tZVByb3AgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgcHJvcCgnc29tZVByb3AnKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3Qobm9kZS5zb21lUHJvcCkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBhdHRyJywgKCkgPT4ge1xuXHRcdG5vZGUuc2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScsICdmb28nKTtcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYXR0cignc29tZVByb3AnKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnc29tZS1hdHRyaWJ1dGUnKSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0bm9kZS5zZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJywgJ2JhcicpO1xuXHRcdGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnc29tZS1hdHRyaWJ1dGUnKSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBodG1sJywgKCkgPT4ge1xuXHRcdG5vZGUuaW5uZXJIVE1MID0gJzxpPmZvbzwvaT4nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBodG1sKCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJzxpPmZvbzwvaT4nKTtcblx0XHRvYmoueCA9ICc8Yj5iYXI8L2I+Jztcblx0XHRleHBlY3Qobm9kZS5pbm5lckhUTUwpLnRvRXF1YWwoJzxiPmJhcjwvYj4nKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHRleHQnLCAoKSA9PiB7XG5cdFx0bm9kZS50ZXh0Q29udGVudCA9ICc8aT5mb288L2k+Jztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgdGV4dCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCc8aT5mb288L2k+Jyk7XG5cdFx0b2JqLnggPSAnPGI+YmFyPC9iPic7XG5cdFx0ZXhwZWN0KG5vZGUudGV4dENvbnRlbnQpLnRvRXF1YWwoJzxiPmJhcjwvYj4nKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHN0eWxlJywgKCkgPT4ge1xuXHRcdG5vZGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHN0eWxlKCd0ZXh0QWxpZ24nKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnY2VudGVyJyk7XG5cdFx0b2JqLnggPSAncmlnaHQnO1xuXHRcdGV4cGVjdChub2RlLnN0eWxlLnRleHRBbGlnbikudG9FcXVhbCgncmlnaHQnKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGRpc3BsYXknLCAoKSA9PiB7XG5cdFx0bm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGRpc3BsYXkodHJ1ZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoZmFsc2UpO1xuXHRcdG9iai54ID0gdHJ1ZTtcblx0XHRleHBlY3Qobm9kZS5zdHlsZS5kaXNwbGF5KS50b0VxdWFsKCcnKTtcblxuXHRcdG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXHRcdGJpbmROb2RlKG9iaiwgJ3knLCBub2RlLCBkaXNwbGF5KGZhbHNlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueSkudG9FcXVhbCh0cnVlKTtcblx0XHRvYmoueSA9IGZhbHNlO1xuXHRcdGV4cGVjdChub2RlLnN0eWxlLmRpc3BsYXkpLnRvRXF1YWwoJycpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgY2xhc3NOYW1lJywgKCkgPT4ge1xuXHRcdC8vIEBJRTlcblx0XHRub2RlLmNsYXNzTmFtZSA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBjbGFzc05hbWUoJ2ZvbycpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKHRydWUpO1xuXHRcdG9iai54ID0gZmFsc2U7XG5cdFx0ZXhwZWN0KG5vZGUuY2xhc3NOYW1lKS50b0VxdWFsKCcnKTtcblxuXHRcdG5vZGUuY2xhc3NOYW1lID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGNsYXNzTmFtZSgnZm9vJywgZmFsc2UpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKGZhbHNlKTtcblx0XHRvYmoueCA9IHRydWU7XG5cdFx0ZXhwZWN0KG5vZGUuY2xhc3NOYW1lKS50b0VxdWFsKCcnKTtcblx0fSk7XG5cblx0ZGF0YXNldEl0KCdzaG91bGQgYmluZCBkYXRhc2V0JywgKCkgPT4ge1xuXHRcdC8vIEBJRTlcblx0XHRub2RlLmRhdGFzZXQuZm9vID0gJ2Jhcic7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGRhdGFzZXQoJ2ZvbycpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdiYXInKTtcblx0XHRvYmoueCA9ICdiYXonO1xuXHRcdGV4cGVjdChub2RlLmRhdGFzZXQuZm9vKS50b0VxdWFsKCdiYXonKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qc1xuICoqLyIsImltcG9ydCBodG1sIGZyb20gJy4vaHRtbCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IGNsYXNzTmFtZSBmcm9tICcuL2NsYXNzbmFtZSc7XG5pbXBvcnQgcHJvcCBmcm9tICcuL3Byb3AnO1xuaW1wb3J0IGF0dHIgZnJvbSAnLi9hdHRyJztcbmltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcbmltcG9ydCBvdXRwdXQgZnJvbSAnLi9vdXRwdXQnO1xuaW1wb3J0IHRleHRhcmVhIGZyb20gJy4vdGV4dGFyZWEnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICcuL3NlbGVjdCc7XG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAnLi9wcm9ncmVzcyc7XG5pbXBvcnQgdGV4dCBmcm9tICcuL3RleHQnO1xuaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGUnO1xuaW1wb3J0IGRhdGFzZXQgZnJvbSAnLi9kYXRhc2V0JztcblxuZXhwb3J0IHtcbiAgICBodG1sLFxuICAgIGRpc3BsYXksXG4gICAgY2xhc3NOYW1lLFxuICAgIHByb3AsXG4gICAgYXR0cixcbiAgICBpbnB1dCxcbiAgICBvdXRwdXQsXG4gICAgdGV4dGFyZWEsXG4gICAgc2VsZWN0LFxuICAgIHByb2dyZXNzLFxuICAgIHRleHQsXG4gICAgc3R5bGUsXG4gICAgZGF0YXNldFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBodG1sKCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiAnaW5wdXQnLCAvLyB0aGUgZXZlbnQgbmFtZSBmaXJlcyBvbmx5IGluIGNvbnRlbnRlZGl0YWJsZSBtb2RlXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pbm5lckhUTUw7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSBgJHt2YWx1ZX1gO1xuXHRcdH1cblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9odG1sLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGxheShzd2l0Y2hlcj10cnVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG51bGwsXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnN0eWxlLmRpc3BsYXlcbiAgICAgICAgICAgICAgICB8fCB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXNwbGF5Jyk7XG4gICAgICAgICAgICBjb25zdCBub25lID0gdmFsdWUgPT09ICdub25lJztcbiAgICAgICAgICAgIHJldHVybiBzd2l0Y2hlciA/ICFub25lIDogbm9uZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3R5bGUgfSA9IHRoaXM7XG4gICAgICAgICAgICBpZihzd2l0Y2hlcikge1xuICAgICAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnbm9uZScgOiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9kaXNwbGF5LmpzXG4gKiovIiwiaW1wb3J0IHtcbiAgICB0b2dnbGUsXG4gICAgY29udGFpbnNcbn0gZnJvbSAnLi9fY2xhc3NsaXN0LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xhc3NOYW1lKGNsYXNzTmFtZSwgc3dpdGNoZXI9dHJ1ZSkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29udGFpbnModGhpcywgY2xhc3NOYW1lKTtcblx0XHRcdHJldHVybiBzd2l0Y2hlciA/IHZhbHVlIDogIXZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0b2dnbGUodGhpcywgY2xhc3NOYW1lLCBzd2l0Y2hlciA/ICEhdmFsdWUgOiAhdmFsdWUpXG5cdFx0fVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9jbGFzc25hbWUuanNcbiAqKi8iLCIvLyBASUU5XG5cbmxldCBhZGQ7XG5sZXQgcmVtb3ZlO1xubGV0IGNvbnRhaW5zO1xuXG5pZihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5jbGFzc0xpc3QpIHtcbiAgICBhZGQgPSAobm9kZSwgbmFtZSkgPT4gbm9kZS5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgIHJlbW92ZSA9IChub2RlLCBuYW1lKSA9PiBub2RlLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgY29udGFpbnMgPSAobm9kZSwgbmFtZSkgPT4gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XG59IGVsc2Uge1xuICAgIGFkZCA9IChub2RlLCBuYW1lKSA9PiB7XG5cdFx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIgKyBuYW1lICsgXCIoXFxcXHN8JClcIiwgXCJnXCIpO1xuXHRcdGlmICghcmUudGVzdChub2RlLmNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gKG5vZGUuY2xhc3NOYW1lICsgXCIgXCIgKyBuYW1lKS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKS5yZXBsYWNlKC8oXiB8ICQpL2csIFwiXCIpO1xuICAgICAgICB9XG5cdH1cblxuXHRyZW1vdmUgPSAobm9kZSwgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiICsgYyArIFwiKFxcXFxzfCQpXCIsIFwiZ1wiKTtcblx0XHRub2RlLmNsYXNzTmFtZSA9IG5vZGUuY2xhc3NOYW1lLnJlcGxhY2UocmUsIFwiJDFcIikucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikucmVwbGFjZSgvKF4gfCAkKS9nLCBcIlwiKTtcblx0fVxuXG5cdGNvbnRhaW5zID0gKG5vZGUsIGMpID0+IHtcblx0XHRyZXR1cm4gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIG5hbWUgKyAnKFxcXFxzfCQpJykudGVzdChub2RlLmNsYXNzTmFtZSk7XG5cdH1cbn1cblxuY29uc3QgdG9nZ2xlID0gKG5vZGUsIG5hbWUsIHN3aXRjaGVyKSA9PiB7XG4gICAgaWYoc3dpdGNoZXIpIHtcbiAgICAgICAgYWRkKG5vZGUsIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbW92ZShub2RlLCBuYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgdG9nZ2xlLFxuICAgIGNvbnRhaW5zXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcm9wKHByb3BlcnR5TmFtZSkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXNbcHJvcGVydHlOYW1lXTtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHQvLyBpbiBjYXNlIHdoZW4geW91J3JlIHRyeWluZyB0byBzZXQgcmVhZC1vbmx5IHByb3BlcnR5XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvcHJvcC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF0dHIoYXR0cmlidXRlTmFtZSkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgdmFsdWUpO1xuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvYXR0ci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlucHV0KHR5cGUpIHtcbiAgICBsZXQgb247XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb246ICdjbGljayBrZXl1cCcsXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb246ICdjbGljayBrZXl1cCcsXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0eXBlb2YgdmFsdWUgIT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy52YWx1ZSA9PSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgIGNhc2UgJ3Jlc2V0JzpcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgY2FzZSAnaGlkZGVuJzpcbiAgICAgICAgICAgIG9uID0gbnVsbDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgICAgIG9uID0gJ2NoYW5nZSc7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgY2FzZSAncGFzc3dvcmQnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICBjYXNlICdkYXRldGltZSc6XG4gICAgICAgICAgICBjYXNlICdkYXRldGltZS1sb2NhbCc6XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgICAgY2FzZSAnc2VhcmNoJzpcbiAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgIGNhc2UgJ3RlbCc6XG4gICAgICAgICAgICBjYXNlICd1cmwnOlxuICAgICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOiAqL1xuICAgICAgICBkZWZhdWx0OiAvLyBvdGhlciBmdXR1cmUgKEhUTUw2KykgaW5wdXRzXG4gICAgICAgICAgICBvbiA9ICdpbnB1dCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG9uLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvaW5wdXQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvdXRwdXQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG51bGwsXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgfHwgdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gJ2Zvcm0nIGluIHRoaXMgPyAndmFsdWUnIDogJ3RleHRDb250ZW50JztcbiAgICAgICAgICAgIHRoaXNbcHJvcGVydHldID0gdmFsdWUgPT09IG51bGwgPyAnJyA6IGAke3ZhbHVlfWA7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvb3V0cHV0LmpzXG4gKiovIiwiaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0ZXh0YXJlYSgpIHtcblx0cmV0dXJuIGlucHV0KCd0ZXh0Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3RleHRhcmVhLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0KG11bHRpcGxlKSB7XG4gICAgaWYgKG11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbjogJ2NoYW5nZScsXG4gICAgICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgb3B0aW9ucy5sZW5ndGggPiBpOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNbaV0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWx1ZShnaXZlblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIGdpdmVuVmFsdWUgPT09ICdzdHJpbmcnID8gW2dpdmVuVmFsdWVdIDogZ2l2ZW5WYWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb3B0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiAnY2hhbmdlJyxcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb3B0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNbaV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9zZWxlY3QuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuXHRyZXR1cm4gaW5wdXQoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogJ2lucHV0JywgLy8gdGhlIGV2ZW50IG5hbWUgZmlyZXMgb25seSBpbiBjb250ZW50ZWRpdGFibGUgbW9kZVxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudGV4dENvbnRlbnQ7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dGhpcy50ZXh0Q29udGVudCA9IGAke3ZhbHVlfWA7XG5cdFx0fVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy90ZXh0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3R5bGUocHJvcGVydHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogbnVsbCxcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGVbcHJvcGVydHldXG4gICAgICAgICAgICAgICAgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcykuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3N0eWxlLmpzXG4gKiovIiwiLy8gcmVwbGFjZSBuYW1lc0xpa2VUaGlzIHdpdGggbmFtZXMtbGlrZS10aGlzXG5jb25zdCB0b0Rhc2hlZCA9IChuYW1lKSA9PiB7XG4gICAgcmV0dXJuICdkYXRhLScgKyBuYW1lLnJlcGxhY2UoLyhbQS1aXSkvZywgKHUpID0+IFwiLVwiICsgdS50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YXNldChwcm9wKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRpZih0aGlzLmRhdGFzZXQpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXRbcHJvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSh0b0Rhc2hlZChwcm9wKSk7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMuZGF0YXNldCkge1xuXHRcdFx0XHR0aGlzLmRhdGFzZXRbcHJvcF0gPSB2YWx1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKHRvRGFzaGVkKHByb3ApLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9kYXRhc2V0LmpzXG4gKiovIiwiaW1wb3J0IGluaXRNSyBmcm9tICcuLi9fY29yZS9pbml0JztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2dldG5vZGVzJztcbmltcG9ydCBjcmVhdGVCaW5kaW5nU3dpdGNoZXIgZnJvbSAnLi9fY3JlYXRlYmluZGluZ3N3aXRjaGVyJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kc2luZ2xlbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4uL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZSc7XG5pbXBvcnQgTWF0cmVzaGthRXJyb3IgZnJvbSAnLi4vX2hlbHBlcnMvbWF0cmVzaGthZXJyb3InO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4uL3VuYmluZG5vZGUnO1xuaW1wb3J0IGFkZFRyZWVMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkdHJlZWxpc3RlbmVyJztcblxuLy8gdGhlIG1haW4gbWV0aG9kIG9mIHRoZSBmcmFtZXdvcms6IGJpbmRzIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRvIEhUTUwgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnRPcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZlbnRPcHRpb25zID0gYmluZGVyO1xuICAgICAgICBiaW5kZXIgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnYmluZE5vZGUnKTtcbiAgICB9XG5cbiAgICBldmVudE9wdGlvbnMgPSBldmVudE9wdGlvbnMgfHwge307XG4gICAgYmluZGVyID0gYmluZGVyIHx8IHt9O1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IHtcbiAgICAgICAgb3B0aW9uYWw9YmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnLFxuICAgICAgICBkZWVwPXRydWUsXG4gICAgICAgIHNpbGVudD1mYWxzZVxuICAgIH0gPSBldmVudE9wdGlvbnM7XG5cbiAgICBkZWxldGUgYmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnO1xuXG4gICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBrZXkgaXMgbm90IGdpdmVuXG4gICAgaWYoIWtleSkge1xuICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpmYWxzeV9rZXknKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtleVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Yga2V5c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbJ2EnLCAnYicsICdjJ10sIG5vZGUpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50T3B0aW9ucykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgKiB0aGlzLmJpbmROb2RlKFt7a2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50fV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZSxcbiAgICAgICAgICAgICAgICBiaW5kZXI6IGl0ZW1CaW5kZXIsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGl0ZW1FdmVudE9wdGlvbnNcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudE9wdGlvbnMgPSBub2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50T3B0aW9ucyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYoY29tbW9uRXZlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJnbG9iYWxcIiBldmVudFxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudE9wdGlvbnMsIGNvbW1vbkV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaXRlbUV2ZW50T3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50T3B0aW9ucywgaXRlbUV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgaXRlbUJpbmRlciwgbWVyZ2VkRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIC8vIGNoZWNrIG5vZGUgZXhpc3RlbmNlXG4gICAgaWYgKCEkbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOm5vZGVfbWlzc2luZycsIHsga2V5LCBub2RlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlZXAgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG4gICAgICAgIGlmIChkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBiaW5kaW5nIHdoZW4ga2V5IGFyZyBpbmNsdWRlcyBkb3RzIChlZyBcImEuYi5jLmRcIilcbiAgICAgICAgICAgIGNvbnN0IGJpbmRpbmdTd2l0Y2hlciA9IGNyZWF0ZUJpbmRpbmdTd2l0Y2hlcih7XG4gICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgIGRlZXBQYXRoLFxuICAgICAgICAgICAgICAgICRub2RlcyxcbiAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgZXZlbnRPcHRpb25zLFxuICAgICAgICAgICAgICAgIGJpbmROb2RlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYXphemFsbycsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgYWRkVHJlZUxpc3RlbmVyKG9iamVjdCwgZGVlcFBhdGguc2xpY2UoMCwgZGVlcFBhdGhMZW5ndGggLSAxKSwgYmluZGluZ1N3aXRjaGVyKTtcblxuICAgICAgICAgICAgYmluZGluZ1N3aXRjaGVyKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm9wRGVmID0gZGVmaW5lUHJvcChvYmplY3QsIGtleSk7XG5cbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgLy8gaWYgb2JqZWN0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSB0aGVuIGV4dGVuZCBcIiRub2Rlc1wiIGFuZCBcIm5vZGVzXCIgb2JqZWN0c1xuICAgICAgICBjb25zdCB7ICRub2RlczogJGFsbE5vZGVzLCBub2RlczogYWxsTm9kZXMgfSA9IG9iamVjdDtcblxuICAgICAgICBpZighJGFsbE5vZGVzIHx8ICFhbGxOb2Rlcykge1xuICAgICAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6aW5zdGFuY2Vfbm9kZXNfbWlzc2luZycsIHtcbiAgICAgICAgICAgICAgICAkbm9kZXM6ICRhbGxOb2RlcyxcbiAgICAgICAgICAgICAgICBub2RlczogYWxsTm9kZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJGFsbE5vZGVzW2tleV0gPSAkYWxsTm9kZXNba2V5XSAmJiAkYWxsTm9kZXNba2V5XS5sZW5ndGhcbiAgICAgICAgICAgID8gJGFsbE5vZGVzW2tleV0uYWRkKCRub2RlcylcbiAgICAgICAgICAgIDogJG5vZGVzO1xuXG4gICAgICAgIGFsbE5vZGVzW2tleV0gPSAkYWxsTm9kZXNba2V5XVswXTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgYmluZGluZyBmb3IgZXZlcnkgbm9kZSBzZXBhcmF0ZWx5XG4gICAgbm9mbi5mb3JFYWNoKCRub2RlcywgKG5vZGUpID0+IGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgZXZlbnRPcHRpb25zLFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIHByb3BEZWZcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuXG5sZXQgb2JqZWN0SWQgPSAwO1xuXG4vLyB0aGlzIGlzIGNvbW1vbiBmdW5jdGlvbiB3aGljaCBhc3NvY2lhdGVzIGFuIG9iamVjdCB3aXRoIGl0cyBNYXRyZXNoa2EgZGVmaW5pdGlvblxuZnVuY3Rpb24gY29tbW9uSW5pdChvYmplY3QpIHtcbiAgICBsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcbiAgICBpZiAoIWRlZikge1xuICAgICAgICBkZWYgPSB7XG4gICAgICAgICAgICAvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuICAgICAgICAgICAgLy8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIC8qIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBjdHg6IG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogb2JqZWN0MixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleGFtcGxlXCIsXG5cdFx0XHRcdFx0aW5mbzoge31cbiAgICAgICAgICAgICAgICB9ICovXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIC8qIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBnZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHNldHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbWVkaWF0b3I6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0SGFuZGxlcixcblx0XHRcdFx0XHRcdC4uLm90aGVyIHJlcXVpcmVkIGluZm9cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZDogb2JqZWN0SWQrK1xuICAgICAgICB9O1xuXG4gICAgICAgIGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TUsob2JqZWN0KSB7XG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG4gICAgaWYgKCFvYmplY3QgfHwgdHlwZSAhPT0gJ29iamVjdCcpIHtcblx0XHQvLyBUT0RPIHRocm93IG1hdHJlc2hrYUVycm9yXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZX0gY2Fubm90IGJlIHVzZWQgaW4gdGhpcyBtZXRob2RgKTtcbiAgICB9XG5cbiAgICAvLyBpZiBvYmplY3QgaGFzIF9pbml0TUsgbWV0aG9kLCBydW4gaXRcbiAgICAvLyBlbHNlIHJ1biBjb21tb25Jbml0XG4gICAgLy8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlXG4gICAgcmV0dXJuIG9iamVjdC5faW5pdE1hdHJlc2hrYSA/IG9iamVjdC5faW5pdE1hdHJlc2hrYSgpIDogY29tbW9uSW5pdChvYmplY3QpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvaW5pdC5qc1xuICoqLyIsImZ1bmN0aW9uIFBzZXVkb01hcCgpIHt9XG5cbi8vIFBzZXVkb01hcCBzaW11bGF0ZXMgV2Vha01hcCBiZWhhdmlvciB3aXRoIE8oMSkgc2VhcmNoIGNvbXBsZXhpdHlcbi8vIGl0J3MgbmVlZGVkIGZvciBASUU5IGFuZCBASUUxMFxubm9mbi5hc3NpZ24oUHNldWRvTWFwLnByb3RvdHlwZSwge1xuICAgIGdldChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5tYXRyZXNoa2FEYXRhO1xuICAgIH0sXG4gICAgc2V0KG9iaiwgZGF0YSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbWF0cmVzaGthRGF0YScsIHtcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaGFzKG9iaikge1xuICAgICAgICByZXR1cm4gJ21hdHJlc2hrYURhdGEnIGluIG9iajtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG4vLyB0aGUgZnVuY3Rpb24gZGVmaW5lcyBuZWVkZWQgZGVzY3JpcHRvciBmb3IgZ2l2ZW4gcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghZGVmLnByb3BzW2tleV0pIHtcbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgZ2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgbWVkaWF0b3I6IG51bGwsXG4gICAgICAgICAgICBiaW5kaW5nczogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuZ2V0dGVyID8gcHJvcERlZi5nZXR0ZXIuY2FsbChvYmplY3QpIDogcHJvcERlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuICAgICAgICAgICAgICAgICAgICBmcm9tU2V0dGVyOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZWYucHJvcHNba2V5XTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZmluZXByb3AuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9faGVscGVycy9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGlzIGZyb20gJy4vX2hlbHBlcnMvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gc2V0cyBuZXcgdmFsdWUgZm9yIGEgcHJvcGVydHlcbi8vIHNpbmNlIGl0cyBwZXJmb3JtYW5jZSBpcyB2ZXJ5IGNyaXRpY2FsIHdlJ3JlIGNoZWNraW5nIGV2ZW50cyBleGlzdGVuY2UgbWFudWFsbHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldChvYmplY3QsIGtleSwgdmFsdWUsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IHZhbHVlO1xuICAgICAgICB2YWx1ZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NldCcpO1xuICAgIH1cblxuICAgIC8vIGlmIG5vIGtleSBvciBmYWxzeSBrZXkgaXMgZ2l2ZW5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG4gICAgaWYgKCFkZWYpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BzLCBldmVudHMgfSA9IGRlZjtcbiAgICBjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuICAgIC8vIGFsbG93IHRvIHVzZSBrZXktdmFsdWUgb2JqZWN0IGFzIGFub3RoZXIgdmFyaWF0aW9uXG4gICAgaWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAob2JqVmFsLCBvYmpLZXkpID0+IHNldChvYmplY3QsIG9iaktleSwgb2JqVmFsLCB2YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8vIGlmIG5vIHByb3BlcnR5IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG4gICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyB2YWx1ZTogcHJldmlvdXNWYWx1ZSwgbWVkaWF0b3IgfSA9IHByb3BEZWY7XG5cbiAgICAvLyBwb3NzaWJsZSBmbGFnc1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2tpcE1lZGlhdG9yLFxuICAgICAgICBmcm9tTWVkaWF0b3IsXG4gICAgICAgIGZvcmNlLFxuICAgICAgICBmb3JjZUhUTUwsXG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgc2lsZW50SFRNTCxcbiAgICAgICAgc2tpcExpbmtzXG4gICAgfSA9IGV2dDtcblxuICAgIGxldCBuZXdWYWx1ZTtcblxuICAgIGlmIChtZWRpYXRvciAmJiAhaXModmFsdWUsIHByZXZpb3VzVmFsdWUpICYmICFza2lwTWVkaWF0b3IgJiYgIWZyb21NZWRpYXRvcikge1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIG5ld1ZhbHVlID0gc3BlY2lhbC5tZWRpYXRvcih2LCBwcmV2VmFsLCBrZXksIG9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhaXMobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpO1xuXG4gICAgLy8gYWRkIHRvIGV2dCBvYmplY3Qgc29tZSB1c2VmdWwgcHJvcGVydGllc1xuICAgIGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXG4gICAgICAgIHNlbGY6IG9iamVjdCxcbiAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAga2V5LFxuICAgICAgICBpc0NoYW5nZWRcbiAgICB9LCBldnQpO1xuXG4gICAgY29uc3QgdHJpZ2dlckNoYW5nZSA9IChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFzaWxlbnQ7XG5cbiAgICAvLyB0cmlnZ2VyIGJlZm9yZWNoYW5nZTpLRVkgYW5kIGJlZm9yZWNoYW5nZSBldmVudHNcbiAgICBpZiAodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBjb25zdCBiZWZvcmVjaGFuZ2VTdHIgPSAnYmVmb3JlY2hhbmdlJztcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlRXZ0TmFtZSA9IGAke2JlZm9yZWNoYW5nZVN0cn06JHtrZXl9YDtcblxuICAgICAgICBpZihldmVudHNbYmVmb3JlY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihldmVudHNbYmVmb3JlY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvcERlZi52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgLy8gdHJpZ2VyIGJpbmRpbmdzXG4gICAgaWYgKCFzaWxlbnRIVE1MICYmIChpc0NoYW5nZWQgfHwgZm9yY2UgfHwgZm9yY2VIVE1MKSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUgPSBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlQmluZGluZ3NFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBjaGFuZ2U6S0VZIGFuZCBjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlU3RyID0gJ2NoYW5nZSc7XG4gICAgICAgIGNvbnN0IGNoYW5nZUV2dE5hbWUgPSBgJHtjaGFuZ2VTdHJ9OiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VTdHJdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIGRlcGVuZGVuY2llcyAobWFkZSB3aXRoIGxpbmtQcm9wcylcbiAgICBpZiAoKGlzQ2hhbmdlZCB8fCBmb3JjZSkgJiYgIXNraXBMaW5rcykge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZXBzRXZ0TmFtZSA9IGBfY2hhbmdlOmRlcHM6JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZURlcHNFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlcHNFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIGRlbGVnYXRlZCBldmVudHMgbG9naWNcbiAgICBpZihpc0NoYW5nZWQpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuICAgICAgICBpZiAoZXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVRyZWVFdnROYW1lID0gYF9jaGFuZ2U6dHJlZToke2tleX1gO1xuICAgICAgICBpZiAoZXZlbnRzW2NoYW5nZVRyZWVFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZVRyZWVFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2V0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbi8vIFRPRE86IEFkZCBkZXNjcmlwdGlvbiBhbmQgY29tbWVudHMgZm9yIHRyaWdnZXJPbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCBldmVudHMgPSBkZWYuZXZlbnRzW25hbWVdO1xuXG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgICBjb25zdCBhcmdzID0gbm9mbi5zbGljZShhcmd1bWVudHMsIDIpO1xuICAgICAgICBjb25zdCBsID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgW2ExLCBhMl0gPSBhcmdzO1xuXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGV2O1xuXG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuXG50cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0ge1xuICAgIGluZm86IHt9LFxuICAgIG5hbWU6IG51bGxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lLmpzXG4gKiovIiwiaW1wb3J0IG1hdHJlc2hrYUVycm9yIGZyb20gJy4vbWF0cmVzaGthZXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3QsIG1ldGhvZCkge1xuICAgIGNvbnN0IHR5cGVvZk9iamVjdCA9IG9iamVjdCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBvYmplY3Q7XG5cbiAgICBpZiAodHlwZW9mT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignY29tbW9uOm9iamVjdF90eXBlJywge1xuICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZS5qc1xuICoqLyIsImNvbnN0IGJpbmRpbmdFcnJvclByZWZpeCA9ICdCaW5kaW5nIGVycm9yOic7XG5jb25zdCBjYWxjRXJyb3JQcmVmaXggPSAnQ2FsYyBlcnJvcjonO1xuY29uc3QgZXZlbnRzRXJyb3JQcmVmaXggPSAnRXZlbnRzIGVycm9yOic7XG5cbmNvbnN0IGdldFR5cGUgPSB2YXJpYWJsZSA9PiB7XG4gICAgaWYodmFyaWFibGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlO1xufTtcbmNvbnN0IGdldFR5cGVFcnJvciA9ICh2YXJpYWJsZSwgdmFyaWFibGVOYW1lLCBleHBlY3RlZFR5cGUpID0+XG4gICAgYCR7dmFyaWFibGVOYW1lfSBtdXN0IGhhdmUgdHlwZSBcIiR7ZXhwZWN0ZWRUeXBlfVwiIGJ1dCBnb3QgXCIke2dldFR5cGUodmFyaWFibGUpfVwiIGluc3RlYWQuYFxuXG5jb25zdCBlcnJvcnMgPSB7XG4gICAgJ2JpbmRpbmc6bm9kZV9taXNzaW5nJzogKHsga2V5LCBub2RlIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JJbmZvID0gdHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnID8gYCAoZ2l2ZW4gc2VsZWN0b3IgaXMgXCIke25vZGV9XCIpYCA6ICcnO1xuICAgICAgICByZXR1cm4gYCR7YmluZGluZ0Vycm9yUHJlZml4fSBub2RlIGlzIG1pc3NpbmcgZm9yIGtleSBcIiR7a2V5fVwiJHtzZWxlY3RvckluZm99LmA7XG4gICAgfSxcbiAgICAnYmluZGluZzpmYWxzeV9rZXknOiAoKSA9PiAnQmluZGluZyBlcnJvcjogXCJrZXlcIiBhcmcgY2Fubm90IGJlIGZhbHN5JyxcbiAgICAnYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJzogKHsgJG5vZGVzIH0pID0+IHtcbiAgICAgICAgY29uc3QgbWlzc2luZyA9ICEkbm9kZXMgPyAnJG5vZGVzJyA6ICdub2Rlcyc7XG4gICAgICAgIHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IFwiJHttaXNzaW5nfVwiIHByb3BlcnR5IG9mIE1hdHJlc2hrYSBpbnN0YW5jZSBpcyBtaXNzaW5nLiBgXG4gICAgICAgICAgICArICdJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgbXVzdCBub3QgYmUgcmVhc3NpZ25lZC4nO1xuICAgIH0sXG4gICAgJ2NvbW1vbjpvYmplY3RfdHlwZSc6ICh7IG9iamVjdCwgbWV0aG9kIH0pID0+IGdldFR5cGVFcnJvcihvYmplY3QsIG1ldGhvZCwgJ29iamVjdCcpLFxuICAgICdjYWxjOnRhcmdldF90eXBlJzogKHsgdGFyZ2V0IH0pID0+XG4gICAgICAgIGAke2NhbGNFcnJvclByZWZpeH0gJHtnZXRUeXBlRXJyb3IodGFyZ2V0LCAndGFyZ2V0IGtleScsICdzdHJpbmcnKX1gLFxuICAgICdjYWxjOnNvdXJjZV9rZXlfdHlwZSc6ICh7IHNvdXJjZUtleSB9KSA9PlxuICAgICAgICBgJHtjYWxjRXJyb3JQcmVmaXh9ICR7Z2V0VHlwZUVycm9yKHNvdXJjZUtleSwgJ3NvdXJjZSBrZXknLCAnc3RyaW5nJyl9YCxcbiAgICAnY2FsYzpzb3VyY2Vfb2JqZWN0X3R5cGUnOiAoeyBzb3VyY2VPYmplY3QgfSkgPT5cbiAgICAgICAgYCR7Y2FsY0Vycm9yUHJlZml4fSAke2dldFR5cGVFcnJvcihzb3VyY2VPYmplY3QsICdzb3VyY2Ugb2JqZWN0JywgJ29iamVjdCcpfWAsXG4gICAgJ2NhbGM6c291cmNlX3R5cGUnOiAoeyBzb3VyY2UgfSkgPT5cbiAgICAgICAgYCR7Y2FsY0Vycm9yUHJlZml4fSAke2dldFR5cGVFcnJvcihzb3VyY2UsICdzb3VyY2UnLCAnb2JqZWN0Jyl9YCxcbiAgICAndHJpZ2dlcjpuYW1lc190eXBlJzogKHsgbmFtZXMgfSkgPT5cbiAgICAgICAgYCR7ZXZlbnRzRXJyb3JQcmVmaXh9ICR7Z2V0VHlwZUVycm9yKG5hbWVzLCAnZXZlbnQgbmFtZScsICdzdHJpbmcnKX1gLFxuICAgICdvbjpuYW1lc190eXBlJzogdGhpc1sndHJpZ2dlcjpuYW1lc190eXBlJ11cblxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG4gICAgY29uc3QgZ2V0RXJyb3IgPSBlcnJvcnNba2V5XTtcbiAgICBpZiAoIWdldEVycm9yKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yKGRhdGEpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19oZWxwZXJzL21hdHJlc2hrYWVycm9yLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlLCBuby1jb25mdXNpbmctYXJyb3cgKi9cbi8vIGRldGVybWluZXMgd2hldGhlciB0d28gdmFsdWVzIGFyZSB0aGUgc2FtZSB2YWx1ZVxuY29uc3QgaXNQb2x5ZmlsbCA9ICh2MSwgdjIpID0+XG4gICAgdjEgPT09IDAgJiYgdjIgPT09IDAgPyAxIC8gdjEgPT09IDEgLyB2MiA6IHYxICE9PSB2MSAmJiB2MiAhPT0gdjIgfHwgdjEgPT09IHYyO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuaXMgfHwgaXNQb2x5ZmlsbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19oZWxwZXJzL2lzLmpzXG4gKiovIiwiaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vX3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuY29uc3QgaHRtbFJlZyA9IC88LztcbmNvbnN0IGN1c3RvbVNlbGVjdG9yUmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG4vLyBUT0RPIHdyaXRlIGRlc2NyaXB0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlcyhvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgbGV0IG5vZGVzO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhaHRtbFJlZy50ZXN0KHNlbGVjdG9yKSAmJiBjdXN0b21TZWxlY3RvclJlZy50ZXN0KHNlbGVjdG9yKSkge1xuICAgICAgICBub2RlcyA9IHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBub2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19nZXRub2Rlcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi4vX2hlbHBlcnMvdG9hcnJheSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclJlZyA9IC9cXHMqOmJvdW5kXFwoKFteKF0qKVxcKVxccyooW1xcU1xcc10qKVxccyp8XFxzKjpzYW5kYm94XFxzKihbXFxTXFxzXSopXFxzKi87XG5cbi8vIFRPRE8gYWRkIGRlc2NyaXB0aW9uXG4vLyBUT0RPIHRoaXMgZnVuY3Rpb24gbG9va3Mgbm90IGdvb2QsIGl0IG5lZWRzIHRvIGJlIHJlZmFjdG9yZWQgYW5kIGFjY2VsZXJhdGVkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIGdpdmVuU2VsZWN0b3IpIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGdpdmVuU2VsZWN0b3Iuc3BsaXQoJywnKTtcbiAgICBsZXQgcmVzdWx0ID0gZG9tLiQoKTtcblxuICAgIG5vZm4uZm9yRWFjaChzZWxlY3RvcnMsIHNlbGVjdG9yID0+IHtcbiAgICAgICAgY29uc3QgZXhlY1Jlc3VsdCA9IGN1c3RvbVNlbGVjdG9yUmVnLmV4ZWMoc2VsZWN0b3IpO1xuICAgICAgICBpZihleGVjUmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEtleSA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/ICdzYW5kYm94JyA6IGV4ZWNSZXN1bHRbMV07XG4gICAgICAgICAgICBjb25zdCBzdWJTZWxlY3RvciA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/IGV4ZWNSZXN1bHRbM10gOiBleGVjUmVzdWx0WzJdO1xuICAgICAgICAgICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2JvdW5kS2V5XTtcblxuICAgICAgICAgICAgaWYocHJvcERlZikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG4gICAgICAgICAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmROb2RlcyA9IEFycmF5KGJpbmRpbmdzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKGJpbmRpbmcsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kTm9kZXNbaV0gPSBiaW5kaW5nLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpIC5teS1zZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGNvbnRhaW5zIGNoaWxkcmVuIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvci5pbmRleE9mKCc+JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RpbmcgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tQXR0ciA9IGBtJHtNYXRoLnJhbmRvbSgpfWAucmVwbGFjZSgnLicsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tQXR0ciwgcmFuZG9tQXR0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGBbJHtyYW5kb21BdHRyfT1cIiR7cmFuZG9tQXR0cn1cIl0gJHtzdWJTZWxlY3Rvcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKHJhbmRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc3ViU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmcganVzdCBhZGQgYm91bmQgbm9kZXMgdG8gcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGJvdW5kTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3IgKG5vIGN1c3RvbSB0aGluZ3MpXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19zZWxlY3Rub2Rlcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0LCBzdGFydCkge1xuXHR2YXIgYXJyYXkgPSBbXSxcblx0XHRsID0gb2JqZWN0Lmxlbmd0aCxcblx0XHRpO1xuXG5cdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblxuXHRmb3IgKGkgPSBzdGFydDsgaSA8IGw7IGkrKykge1xuXHRcdGFycmF5W2kgLSBzdGFydF0gPSBvYmplY3RbaV07XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9faGVscGVycy90b2FycmF5LmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcbiAgICAkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuICAgIGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcbiAgICAgICAgICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcbiAgICAgICAgZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG4gICAgfVxufSBlbHNlIHtcbiAgICB1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG4gICAgZm46IEluaXQucHJvdG90eXBlLFxuICAgIGV4dGVuZCxcbiAgICBwYXJzZUhUTUwsXG4gICAgb25lLFxuICAgIGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBpcyxcbiAgICBhZGQsXG4gICAgbm90LFxuICAgIGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChnaXZlbkhUTUwpIHtcbiAgICAvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG4gICAgY29uc3Qgd3JhcE1hcCA9IHtcbiAgICAgICAgb3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcbiAgICAgICAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgICAgICAgdGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICAgICAgICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gICAgICAgIHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgY29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcbiAgICAgICAgYXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcbiAgICAgICAgXzogWzAsICcnLCAnJ11cbiAgICB9O1xuXG4gICAgY29uc3QgaHRtbCA9IGdpdmVuSFRNTC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaTtcblxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcbiAgICB3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuICAgIHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG4gICAgY29uc3QgZXggPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZXggJiYgd3JhcE1hcFtleFsxXV0gfHwgd3JhcE1hcC5fO1xuXG4gICAgbm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cbiAgICBpID0gd3JhcHBlclswXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBuZXcgSW5pdChodG1sMm5vZGVMaXN0KGh0bWwpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiBtYXRjaGVkIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25lKHMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbi8vIFRPRE8gZ2V0IHJpZCBvZiBpdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiB0YWdOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwcm9wcyA9IHRhZ05hbWU7XG4gICAgICAgIHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihlbFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSAhPT0gJ3RhZ05hbWUnKSB7XG4gICAgICAgICAgICAgICAgZWxba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCByYW5kb21JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICd4Jyk7XG4gICAgY29uc3Qgc2NvcGVTZWxlY3RvciA9IGBbJHtyYW5kb21JRH09XCIke3JhbmRvbUlEfVwiXSBgO1xuICAgIGNvbnN0IHNwbGl0dGVkU2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuXG4gICAgbGV0IG1hdGNoaW5nID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcbiAgICAgICAgbWF0Y2hpbmcgKz0gYCR7aSA9PT0gMCA/ICcnIDogJywnfSR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0sJHtzY29wZVNlbGVjdG9yfSR7c2VsfSAqYDtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cbiAgICBpZiAoaXMuY2FsbChbZXZ0LnRhcmdldF0sIG1hdGNoaW5nKSkge1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXNTdHIsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lc1N0ci5zcGxpdCgvXFxzLyk7XG4gICAgbGV0IGRlbGVnYXRlO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGlzdCkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbi5qc1xuICoqLyIsIi8vIHNoYXJlIGRhdGEgYmV0d2VlbiBhcyBhbiBvYmplY3QgbW9kdWxlcyBiZWNhdXNlIHdlIHVzZVxuLy8gc2ltcGxpZmllZCBlcyBtb2R1bGVzIHRoZXJlIGFuZCBjYW5ub3QgaW1wb3J0IGFuZCBzaGFyZSBhIG51bWJlclxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5vZGVJbmRleDogMCxcbiAgICBhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXNbMF07XG4gICAgcmV0dXJuIG5vZGVcbiAgICAgICAgPyAobm9kZS5tYXRjaGVzXG4gICAgICAgICAgICB8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2lzLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIHJlbW92ZXMgZXZlbnQgaGFuZGxlciBmcm9tIGEgc2V0IG9mIGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuZGVsZWdhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IGV2ZW50Lm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgaWRNYXAgPSB7fTtcblxuICAgIGxldCByZXN1bHQ7XG5cbiAgICBzZWxlY3RvciA9IG5ldyBJbml0KHNlbGVjdG9yKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW5pdCh0aGlzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByZXN1bHRbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gc2VsZWN0b3JbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWYgKCFpZE1hcFtub2RlSURdKSB7XG4gICAgICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvbm90LmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIGVsZW1lbnRzLFxuLy8gZmlsdGVyZWQgYnkgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICAgIGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2ZpbmQuanNcbiAqKi8iLCJpbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcbi8vIHJldHVybnMgZnVuY3Rpb24gd2hpY2ggcmUtYWRkcyBiaW5kaW5nIHdoZW4gb2JqZWN0IGJyYW5jaCBpcyBjaGFuZ2VkXG4vLyB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IGJpbmROb2RlIHdoZW4gc29tZXRoaW5nIGxpa2Vcbi8vICdmb28uYmFyLmJheicgaXMgcGFzc2VkIHRvIGl0IGFzIGtleSBhcmcgdmFsdWVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUJpbmRpbmdTd2l0Y2hlcih7XG4gICAgb2JqZWN0LFxuICAgIGRlZXBQYXRoLFxuICAgICRub2RlcyxcbiAgICBiaW5kZXIsXG4gICAgZXZlbnRPcHRpb25zLFxuICAgIGJpbmROb2RlXG59KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGJpbmRpbmdTd2l0Y2hlcihjaGFuZ2VFdmVudCA9IHt9KSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuICAgICAgICBjb25zdCBsYXN0RGVlcFBhdGhJdGVtID0gZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgdmFsdWUsIC8vIG5ldyB2YWx1ZSBvZiBhIGJyYW5jaFxuICAgICAgICAgICAgcHJldmlvdXNWYWx1ZSwgLy8gcHJldmlvdXMgdmFsdWUgb2YgYSBicmFuY2hcbiAgICAgICAgICAgIHJlc3RQYXRoIC8vIHBhdGggc3RhcnRpbmcgY3VycmVudGx5IGNoYW5nZWQgYnJhbmNoXG4gICAgICAgIH0gPSBjaGFuZ2VFdmVudDtcbiAgICAgICAgbGV0IHRhcmdldDsgLy8gYW4gb2JqZWN0IHRvIGNhbGwgYmluZE5vZGVcbiAgICAgICAgbGV0IHByZXZpb3VzVGFyZ2V0OyAvLyBhbiBvYmplY3QgdG8gY2FsbCB1bmJpbmROb2RlXG5cblxuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHJlc3RQYXRoKSB7XG4gICAgICAgICAgICAvLyBpZiByZXN0IHBhdGggaXMgZ2l2ZW4gYW5kIG5ldyB2YWx1ZSBpcyBhbiBvYmplY3RcbiAgICAgICAgICAgIHRhcmdldCA9IHZhbHVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN0UGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtyZXN0UGF0aFtpXV07XG4gICAgICAgICAgICAgICAgaWYoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiByZXN0IHBhdGggaXMgbm90IGdpdmVuXG4gICAgICAgICAgICB0YXJnZXQgPSBvYmplY3Q7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgICAgICAgICBpZighdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHJlc3QgcGF0aCBpcyBnaXZlbiBhbmQgbmV3IHZhbHVlIGlzIGFuIG9iamVjdFxuICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcgJiYgcmVzdFBhdGgpIHtcbiAgICAgICAgICAgIHByZXZpb3VzVGFyZ2V0ID0gcHJldmlvdXNWYWx1ZTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdFBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c1RhcmdldCA9IHByZXZpb3VzVGFyZ2V0W3Jlc3RQYXRoW2ldXTtcbiAgICAgICAgICAgICAgICBpZighcHJldmlvdXNUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGJpbmRpbmcgZm9yIG5ldyB0YXJnZXRcbiAgICAgICAgaWYodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBiaW5kTm9kZSh0YXJnZXQsIGxhc3REZWVwUGF0aEl0ZW0sICRub2RlcywgYmluZGVyLCBldmVudE9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIGJpbmRpbmcgZm9yIHByZXZpb3VzbHkgdXNlZCBvYmplY3RcbiAgICAgICAgaWYocHJldmlvdXNUYXJnZXQgJiYgdHlwZW9mIHByZXZpb3VzVGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdW5iaW5kTm9kZShwcmV2aW91c1RhcmdldCwgbGFzdERlZXBQYXRoSXRlbSwgJG5vZGVzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19jcmVhdGViaW5kaW5nc3dpdGNoZXIuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4uL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZSc7XG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuLi9iaW5kbm9kZS9fZ2V0bm9kZXMnO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJy4uL2JpbmRub2RlJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZVRyZWVMaXN0ZW5lciBmcm9tICcuLi9vZmYvX3JlbW92ZXRyZWVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlQmluZGluZyBmcm9tICcuL19yZW1vdmViaW5kaW5nJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSc7XG5cbi8vIHVuYmluZHMgYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBldmVudE9wdGlvbnMpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldmVudE9wdGlvbnMgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAndW5iaW5kTm9kZScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGV2ZW50T3B0aW9ucykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbeyBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnQgfV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZVxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBhY2NlcHQga2V5LW5vZGUgb2JqZWN0XG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGtleU9iaktleSwga2V5T2JqVmFsdWUsIG5vZGUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cblxuICAgIGV2ZW50T3B0aW9ucyA9IGV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCB7IGRlZXAgfSA9IGV2ZW50T3B0aW9ucztcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZjtcblxuICAgIC8vIGFsbG93IHRvIHBhc3MgbnVsbCBvciB1bmRlZmluZWQgYXMga2V5XG4gICAgLy8gaWYgcGFzc2VkIHRoZW4gcmVtb3ZlIGJpbmRpbmdzIG9mIGFsbCBrZXlzIGZvciBnaXZlbiBvYmplY3RcbiAgICBpZihrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24ocHJvcHMsIChwcm9wc0l0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbnVsbCwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGJpbmRpbmdcbiAgICBpZihkZWVwICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVlcFBhdGhMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBkbyB3ZSBuZWVkIHRvIHRocm93IGVycm9yIHdoZW4gdGFyZ2V0IGlzIGZhbHN5P1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtkZWVwUGF0aFtpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE8gQlVHIHRoaXMgbWF5IHVuZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBiaW5kaW5ncyB3aXRoIHRoZSBzYW1lIHBhdGggKGNhbm5vdCByZXByb2R1Y2UpXG4gICAgICAgICAgICByZW1vdmVUcmVlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpKTtcblxuICAgICAgICAgICAgdW5iaW5kTm9kZSh0YXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sIG5vZGUsIGV2ZW50T3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG4gICAgLy8gd2hlbiBubyBwcm9wZGVmIGRvIG5vdGhpbmdcbiAgICBpZighcHJvcERlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAvLyBpZiB0aGUgcHJvcGVydHkgZG9lc24ndCBoYXZlIGFueSBiaW5kaW5ncyBkbyBub3RoaW5nXG4gICAgaWYoIWJpbmRpbmdzKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gbm9kZSBpcyBwYXNlZCByZW1vdmUgYWxsIGJpbmRpbmdzIGZvciBnaXZlbiBrZXlcbiAgICBpZighbm9kZSkge1xuICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsIGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldmVudE9wdGlvbnMgfSwgYmluZGluZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BEZWYuYmluZGluZ3MgPSBudWxsO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICAgICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0Lm5vZGVzW2tleV1cbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3QuJG5vZGVzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0ICRub2RlcyA9IGdldE5vZGVzKG9iamVjdCwgbm9kZSk7XG4gICAgY29uc3QgcmV0YWluQmluZGluZ3MgPSBbXTtcbiAgICBjb25zdCByZXRhaW5Ob2RlcyA9IFtdO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBiaW5kbmdzIGFuZCBjb21wYXJlIHRoZWlyIG5vZGUgd2l0aCBnaXZlbiBub2Rlc1xuICAgIG5vZm4uZm9yRWFjaCgkbm9kZXMsIG5vZGVzSXRlbSA9PiB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICBpZihiaW5kaW5nLm5vZGUgPT09IG5vZGVzSXRlbSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZlbnRPcHRpb25zIH0sIGJpbmRpbmcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRhaW5CaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xuICAgICAgICAgICAgICAgIHJldGFpbk5vZGVzLnB1c2gobm9kZXNJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgbm9kZXMgYW5kICRub2RlcyBmb3IgTWF0cmVzaGthIGluc3RhbmNlXG4gICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgIGlmKHJldGFpbk5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0Lm5vZGVzW2tleV0gPSByZXRhaW5Ob2Rlc1swXTtcbiAgICAgICAgICAgIG9iamVjdC4kbm9kZXNba2V5XSA9IGRvbS4kKHJldGFpbk5vZGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBiaW5kaW5ncyBvYmplY3RcbiAgICBpZihyZXRhaW5CaW5kaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IHJldGFpbkJpbmRpbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BEZWYuYmluZGluZ3MgPSBudWxsO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VuYmluZG5vZGUvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL19yZW1vdmVsaXN0ZW5lcic7XG5cbi8vIHJlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIGZyb20gYW4gb2JqZWN0IGJ5IGdpdmVuIHBhdGhcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGdpdmVuUGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuXHRcdHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGRvIGFsbCBtYWdpY1xuICAgICAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5pbmZvLnBhdGhTdHIgIT09IHBhdGhTdHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSA9IHJldGFpbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2tleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIm5hbWVcIiwgXCJldmVudHNcIl0gfV0qL1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBkb21FdmVudFJlZyBmcm9tICcuLi9vbi9fZG9tZXZlbnRyZWdleHAnO1xuXG4vLyByZW1vdmVzIHNpbXBsZSBldmVudCBsaXN0ZW5lciB0byBhbiBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHJldHVybjtcblxuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcbiAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG4gICAgY29uc3QgcmV0YWluID0gW107XG4gICAgY29uc3Qgbm9UcmlnZ2VyID0gbmFtZSA/IG5hbWVbMF0gPT09ICdfJyA6IGZhbHNlO1xuICAgIGNvbnN0IGRvbUV2dEV4ZWNSZXN1bHQgPSBkb21FdmVudFJlZy5leGVjKG5hbWUpO1xuXG4gICAgaWYoZG9tRXZ0RXhlY1Jlc3VsdCkge1xuICAgICAgICBjb25zdCBbLCBldmVudE5hbWUsIGtleT0nc2FuZGJveCcsIHNlbGVjdG9yXSA9IGRvbUV2dEV4ZWNSZXN1bHQ7XG4gICAgICAgIC8vIGZpeGluZyBjaXJjdWxhciByZWZlcmVuY2UgaXNzdWVcbiAgICAgICAgY29uc3QgcmVtb3ZlRG9tTGlzdGVuZXIgPSByZXF1aXJlKCcuL19yZW1vdmVkb21saXN0ZW5lcicpO1xuICAgICAgICByZW1vdmVEb21MaXN0ZW5lcihvYmplY3QsIGtleSwgZXZlbnROYW1lLCBzZWxlY3RvciwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGlmIGFsbCBldmVudHMgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgbm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZXZ0LmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuICAgICAgICBkZWYuZXZlbnRzID0ge307XG4gICAgfSBlbHNlIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcbiAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ0NhbGxiYWNrID0gY2FsbGJhY2sgJiYgY2FsbGJhY2suX2NhbGxiYWNrIHx8IGNhbGxiYWNrO1xuICAgICAgICAgICAgY29uc3QgZXZ0Q2FsbGJhY2sgPSBldnQuY2FsbGJhY2suX2NhbGxiYWNrIHx8IGV2dC5jYWxsYmFjaztcblxuICAgICAgICAgICAgaWYgKGFyZ0NhbGxiYWNrICYmIGFyZ0NhbGxiYWNrICE9PSBldnRDYWxsYmFja1xuICAgICAgICAgICAgICAgIHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgZXZlbnRcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBkZWYuZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2ZmL19yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi9fdW5kZWxlZ2F0ZWxpc3RlbmVyJztcblxuLy8gcmVtb3ZlcyB0cmVlIGxpc3RlbmVyIGZyb20gYWxsIG9iamVjdCB0cmVlIG9mIGZpdmVuIHBhdGhcbi8vIFRPRE86IFBhc3MgY29udGV4dCB0byByZW1vdmVUcmVlTGlzdGVuZXJcbi8vIFRPRE86IFBhc3MgaW5mbyB0byByZW1vdmVUcmVlTGlzdGVuZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZVRyZWVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLCBoYW5kbGVyKSB7XG4gICAgaWYodHlwZW9mIGRlZXBQYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWVwUGF0aCA9IGRlZXBQYXRoLnNwbGl0KCcuJyk7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGtleXMgb2YgdGhlIHBhdGggYW5kIHVuZGVsZWdhdGUgZ2l2ZW4gaGFuZGxlciAoY2FuIGJlIHVuZGVmaW5lZClcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gVE9ETzogQXJyYXkucHJvdG90eXBlLnNsaWNlIGlzIHNsb3dcbiAgICAgICAgY29uc3QgbGlzdGVuUGF0aCA9IGRlZXBQYXRoLnNsaWNlKDAsIGkpO1xuXG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihcbiAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIGxpc3RlblBhdGgsXG4gICAgICAgICAgICBgX2NoYW5nZTp0cmVlOiR7ZGVlcFBhdGhbaV19YCxcbiAgICAgICAgICAgIGhhbmRsZXJcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vZmYvX3JlbW92ZXRyZWVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuLi9vZmYvX3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuXG5jb25zdCBzcGFjZVJlZyA9IC9cXHMrLztcblxuLy8gdGhlIGZ1bmN0aW9uIHJlbW92ZXMgc2luZ2xlIGJpbmRpbmcgZm9yIHNpbmdsZSBvYmplY3Rcbi8vIGNhbGxlZCBieSB1bmJpbmROb2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2ZW50T3B0aW9ucyB9LCB7XG4gICAgb3B0aW9ucyxcbiAgICBiaW5kZXIsXG4gICAgbm9kZSxcbiAgICBub2RlSGFuZGxlcixcbiAgICBvYmplY3RIYW5kbGVyXG59KSB7XG4gICAgY29uc3QgeyBkZXN0cm95LCBvbiB9ID0gYmluZGVyO1xuICAgIGNvbnN0IHsgc2lsZW50IH0gPSBldmVudE9wdGlvbnM7XG5cbiAgICAvLyBpZiBcIm9uXCIgaXMgZnVuY3Rpb24gZGlzYWJsZSBpdFxuICAgIC8vIHdlIGNhbm5vdCB0dXJuIG9mZiBjdXN0b20gbGlzdGVuZXIgZGVmaW5lZCBieSBhIHByb2dyYW1tZXJcbiAgICAvLyBwcm9ncmFtbWVyIG5lZWRzIHRvIHJlbW92ZSBjdXN0b20gbGlzdGVuZXIgbWF1YWxseSB2aWEgYmluZGVyLmRlc3Ryb3lcbiAgICBpZiAodHlwZW9mIG9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvbiA9PT0gJ3N0cmluZycpe1xuICAgICAgICAvLyByZW1vdmUgRE9NIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIC8vIHJlbW92ZUV2ZW50TGlzdGVuZXIgaXMgZmFzdGVyIHRoYW4gXCJvblwiIG1ldGhvZCBmcm9tIGFueSBET00gbGlicmFyeVxuICAgICAgICBub2ZuLmZvckVhY2gob24uc3BsaXQoc3BhY2VSZWcpLFxuICAgICAgICAgICAgZXZ0TmFtZSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgbm9kZUhhbmRsZXIpKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgb2JqZWN0IGV2ZW50IGxpc3RlbmVyXG4gICAgcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gLCBvYmplY3RIYW5kbGVyKTtcblxuICAgIC8vIGlmIGJpbmRlci5kZXN0cm95IGlzIGdpdmVuIGNhbGwgaXRcbiAgICBpZiAoZGVzdHJveSkge1xuICAgICAgICBkZXN0cm95LmNhbGwobm9kZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gZmlyZSBldmVudHNcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBjb25zdCBleHRlbmRlZEV2ZW50T3B0aW9ucyA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfSwgZXZlbnRPcHRpb25zKTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHVuYmluZDoke2tleX1gLCBleHRlbmRlZEV2ZW50T3B0aW9ucyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAndW5iaW5kJywgZXh0ZW5kZWRFdmVudE9wdGlvbnMpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VuYmluZG5vZGUvX3JlbW92ZWJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgbG9va0ZvckJpbmRlciBmcm9tICcuLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBjcmVhdGVOb2RlSGFuZGxlciBmcm9tICcuL19jcmVhdGVub2RlaGFuZGxlcic7XG5pbXBvcnQgY3JlYXRlT2JqZWN0SGFuZGxlciBmcm9tICcuL19jcmVhdGVvYmplY3RoYW5kbGVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vX2hlbHBlcnMvZGVib3VuY2UnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG5jb25zdCBzcGFjZVJlZyA9IC9cXHMrLztcblxuLy8gaGFuZGxlcyBiaW5kaW5nIGZvciBzaW5nbGUgcHJvcGVydHkgJiBub2RlXG4vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCBhdCBiaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgYmluZGVyOiBnaXZlbkJpbmRlcixcbiAgICBrZXksXG4gICAgJG5vZGVzLFxuICAgIG5vZGUsXG4gICAgZXZlbnRPcHRpb25zLFxuICAgIHByb3BEZWZcbn0pIHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgYXNzaWduRGVmYXVsdFZhbHVlLFxuICAgICAgICBkZWJvdW5jZTogZGVib3VuY2VPcHRpb249dHJ1ZVxuICAgIH0gPSBldmVudE9wdGlvbnM7XG4gICAgLy8gY3JlYXRlIGJpbmRpbmdzIGFycmF5IGluIHByb3BlcnR5IGRlZmluaXRpb24gb2JqZWN0XG4gICAgY29uc3QgYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIGxldCB7IHZhbHVlIH0gPSBwcm9wRGVmO1xuICAgIGNvbnN0IGJpbmRpbmdPcHRpb25zID0ge1xuICAgICAgICBzZWxmOiBvYmplY3QsXG4gICAgICAgIGtleSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZVxuICAgIH07XG4gICAgbGV0IGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbiAgICBsZXQgYmluZGVyO1xuICAgIGxldCBvYmplY3RIYW5kbGVyO1xuICAgIGxldCBub2RlSGFuZGxlcjtcblxuICAgIC8vIGdldCBhY3R1YWwgYmluZGVyXG4gICAgaWYgKGdpdmVuQmluZGVyICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuICAgICAgICBpZiAoZm91bmRCaW5kZXIpIHtcbiAgICAgICAgICAgIGlmIChnaXZlbkJpbmRlcikge1xuICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKGZvdW5kQmluZGVyLCBnaXZlbkJpbmRlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJpbmRlciA9IGZvdW5kQmluZGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmluZGVyID0gZ2l2ZW5CaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IGdldFZhbHVlLCBzZXRWYWx1ZSwgb24sIGluaXRpYWxpemUgfSA9IGJpbmRlcjtcblxuICAgIC8vIGNhbGwgYmluZGVyLmluaXRpYWxpemVcbiAgICBpZiAoaW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplLmNhbGwobm9kZSwgYmluZGluZ09wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGNhbGxzIGdldFZhbHVlIGltbWVkaWF0ZWx5IGFuZCByZWFzc2lnbiBhIHByb3BlcnR5XG4gICAgLy8gd2hlbiBhbGwgcmVxdWlyZWQgY29uZGl0aW9ucyBhcmUgbWV0IGZvciB0aGlzXG4gICAgaWYgKGdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBhc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIGJpbmRpbmdPcHRpb25zKTtcbiAgICAgICAgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIHNldChvYmplY3QsIGtleSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgZnJvbU5vZGU6IHRydWUgfSwgZXZlbnRPcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgb2JqZWN0IHdoZW4gc2V0VmFsdWUgaXMgZ2l2ZW5cbiAgICBpZiAoc2V0VmFsdWUpIHtcbiAgICAgICAgb2JqZWN0SGFuZGxlciA9IGNyZWF0ZU9iamVjdEhhbmRsZXIoe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHByb3BEZWYsXG4gICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICBiaW5kaW5nT3B0aW9ucyxcbiAgICAgICAgICAgIGV2ZW50T3B0aW9uc1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBieSBkZWZhdWx0IGRlYm91bmNpbmcgaXMgb25cbiAgICAgICAgLy8gaXQgY2FuIGJlIHR1cm5lZCBvZmYgYnkgcGFzc2luZyBkZWJvdW5jZT1mYWxzZSB0byBldmVudCBvYmplY3RcbiAgICAgICAgaWYgKGRlYm91bmNlT3B0aW9uIHx8IGRlYm91bmNlT3B0aW9uID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHR5cGVvZiBkZWJvdW5jZU9wdGlvbiA9PT0gJ251bWJlcicgPyBkZWJvdW5jZU9wdGlvbiA6IDA7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyID0gZGVib3VuY2Uob2JqZWN0SGFuZGxlciwgZGVsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gLCBvYmplY3RIYW5kbGVyLCBvYmplY3QsIHsgc2tpcENoZWNrczogdHJ1ZSB9KTtcblxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgbmVlZGVkIGV2ZW50IGhhbmRsZXJzIHRoZSBub2RlIHdoZW4gZ2V0VmFsdWUgJiBvbiBhcmUgZ2l2ZW5cbiAgICBpZiAoZ2V0VmFsdWUgJiYgb24pIHtcbiAgICAgICAgbm9kZUhhbmRsZXIgPSBjcmVhdGVOb2RlSGFuZGxlcih7XG4gICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgIGJpbmRpbmdPcHRpb25zXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRPRE86IFRocm93IGVycm9yIHdoZW4gXCJvblwiIGFuZCBtYXliZSBvdGhlciBiaW5kZXIgcHJvcGVydGllcyBoYXMgd3JvbmcgdHlwZVxuICAgICAgICBpZiAodHlwZW9mIG9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvbi5jYWxsKG5vZGUsIG5vZGVIYW5kbGVyLCBiaW5kaW5nT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICAvLyBhZGRFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChvbi5zcGxpdChzcGFjZVJlZyksXG4gICAgICAgICAgICAgICAgZXZ0TmFtZSA9PiBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgbm9kZUhhbmRsZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBiaW5kaW5nIGRhdGEgdG8gYmluZGluZ3MgYXJyYXlcbiAgICBiaW5kaW5ncy5wdXNoKHtcbiAgICAgICAgb24sXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgb2JqZWN0SGFuZGxlcixcbiAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgIGJpbmRpbmdPcHRpb25zXG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZlbnRPcHRpb25zID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9LCBldmVudE9wdGlvbnMpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgYmluZDoke2tleX1gLCBleHRlbmRlZEV2ZW50T3B0aW9ucyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAnYmluZCcsIGV4dGVuZGVkRXZlbnRPcHRpb25zKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fYmluZHNpbmdsZW5vZGUuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdEJpbmRlcnMgZnJvbSAnLi9kZWZhdWx0YmluZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZhdWx0QmluZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocmVzdWx0ID0gZGVmYXVsdEJpbmRlcnNbaV0uY2FsbChub2RlLCBub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvb2tmb3JiaW5kZXIuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9iaW5kZXJzL2lucHV0JztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL2JpbmRlcnMvdGV4dGFyZWEnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICcuL2JpbmRlcnMvc2VsZWN0JztcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL2JpbmRlcnMvcHJvZ3Jlc3MnO1xuaW1wb3J0IG91dHB1dCBmcm9tICcuL2JpbmRlcnMvb3V0cHV0JztcblxuZXhwb3J0IGRlZmF1bHQgW25vZGUgPT4ge1xuICAgIHN3aXRjaChub2RlLnRhZ05hbWUpIHtcbiAgICAgICAgY2FzZSAnSU5QVVQnOlxuICAgICAgICAgICAgcmV0dXJuIGlucHV0KG5vZGUudHlwZSk7XG4gICAgICAgIGNhc2UgJ1RFWFRBUkVBJzpcbiAgICAgICAgICAgIHJldHVybiB0ZXh0YXJlYSgpO1xuICAgICAgICBjYXNlICdTRUxFQ1QnOlxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdChub2RlLm11bHRpcGxlKTtcbiAgICAgICAgY2FzZSAnUFJPR1JFU1MnOlxuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzKCk7XG4gICAgICAgIGNhc2UgJ09VVFBVVCc6XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0KCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IGlzIGZyb20gJy4uL19oZWxwZXJzL2lzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIGNhbGxlZCB3aGVuIGJvdW5kIG5vZGUgc3RhdGUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlTm9kZUhhbmRsZXIoe1xuICAgIG9iamVjdCxcbiAgICBrZXksXG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBiaW5kaW5nT3B0aW9uc1xufSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBub2RlSGFuZGxlcihkb21FdmVudCA9IHt9KSB7XG4gICAgICAgIC8vIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZSBpcyBzZXQgaW4gdW5iaW5kTm9kZVxuICAgICAgICAvLyB3ZSBjYW5ub3QgXCJ0dXJuIG9mZlwiIGJpbmRlci5vbiB3aGVuIGl0cyB2YWx1ZSBpcyBmdW5jdGlvblxuICAgICAgICAvLyBkZXZlbG9wZXIgbmVlZHMgdG8gY2xlYW4gbWVtb3J5ICh0dXJuIG9mZiBjYWxsYmFjaykgbWFudWFseSBpbiBiaW5kZXIuZGVzdHJveVxuICAgICAgICBpZihub2RlSGFuZGxlci5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG4gICAgICAgIGNvbnN0IHsgd2hpY2gsIHRhcmdldCB9ID0gZG9tRXZlbnQ7XG4gICAgICAgIGNvbnN0IHsgZ2V0VmFsdWUgfSA9IGJpbmRlcjtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgICAgICBkb21FdmVudCxcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQsIC8vIGpRdWVyeSB0aGluZ1xuICAgICAgICAgICAgLy8gd2lsbCB0aHJvdyBcInByZXZlbnREZWZhdWx0IGlzIG5vdCBhIGZ1bmN0aW9uXCIgd2hlbiBkb21FdmVudCBpcyBlbXB0eSBvYmplY3RcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiAoKSA9PiBkb21FdmVudC5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgICAgICAgLy8gd2lsbCB0aHJvdyBcInN0b3BQcm9wYWdhdGlvbiBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgICAgICBzdG9wUHJvcGFnYXRpb246ICgpID0+IGRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLFxuICAgICAgICAgICAgd2hpY2gsXG4gICAgICAgICAgICB0YXJnZXRcbiAgICAgICAgfSwgYmluZGluZ09wdGlvbnMpKTtcblxuICAgICAgICBpZiAoIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAgICAgLy8gVE9ETyBhZGQgZGVzY3JpcHRpb24gb2YgYSBoYWNrXG4gICAgICAgICAgICAvLyB3aHkgZG8gd2UgbmVlZCBjaGFuZ2VkTm9kZSwgb25DaGFuZ2VWYWx1ZSwgYmluZGVyP1xuICAgICAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBub2RlLFxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIGJpbmRlclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fY3JlYXRlbm9kZWhhbmRsZXIuanNcbiAqKi8iLCIvLyByZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2ggaXMgY2FsbGVkIHdoZW4gcHJvcGVydHkgdmFsdWUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlT2JqZWN0SGFuZGxlcih7XG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBiaW5kaW5nT3B0aW9ucyxcbiAgICBldmVudE9wdGlvbnNcbn0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gb2JqZWN0SGFuZGxlcigpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICAgICAgY29uc3QgeyBvbkNoYW5nZVZhbHVlLCBjaGFuZ2VkTm9kZSwgYmluZGVyOiBldnRCaW5kZXIgfSA9IGV2ZW50T3B0aW9ucztcbiAgICAgICAgY29uc3QgeyBzZXRWYWx1ZSB9ID0gYmluZGVyO1xuICAgICAgICAvLyBkaXJ0eSBoYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuICAgICAgICBjb25zdCBkaXJ0eUhhY2tWYWx1ZSA9IG9uQ2hhbmdlVmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gU3RyaW5nKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgICAgIGlmIChjaGFuZ2VkTm9kZSA9PT0gbm9kZSAmJiBvbkNoYW5nZVZhbHVlID09PSBkaXJ0eUhhY2tWYWx1ZSAmJiBldnRCaW5kZXIgPT09IGJpbmRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VmFsdWUuY2FsbChub2RlLCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyB2YWx1ZSB9LCBiaW5kaW5nT3B0aW9ucykpO1xuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fY3JlYXRlb2JqZWN0aGFuZGxlci5qc1xuICoqLyIsIi8qIGVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJldnRcIl0gfV0qL1xuaW1wb3J0IGluaXRNSyBmcm9tICcuLi9fY29yZS9pbml0JztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5pbXBvcnQgZG9tRXZlbnRSZWcgZnJvbSAnLi9fZG9tZXZlbnRyZWdleHAnO1xuXG4vLyBwcm9wZXJ0eSBtb2RpZmllciBldmVudCByZWdleHBcbmNvbnN0IHByb3BNb2RFdmVudFJlZ1xuICAgID0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5fY2hhbmdlOnRyZWU6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuLy8gYWRkcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXJcbi8vIHVzZWQgYXMgY29yZSBvZiBldmVudCBlbmdpbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IGN0eCA9IGNvbnRleHQgfHwgb2JqZWN0O1xuICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXTtcbiAgICBjb25zdCBldnQgPSB7IGNhbGxiYWNrLCBjb250ZXh0LCBjdHgsIG5hbWUsIGluZm8gfTtcbiAgICBjb25zdCB7IHNraXBDaGVja3M9ZmFsc2UgfSA9IGluZm87XG5cblxuICAgIGlmKCFza2lwQ2hlY2tzKSB7XG4gICAgICAgIGNvbnN0IGRvbUV2dEV4ZWNSZXN1bHQgPSBkb21FdmVudFJlZy5leGVjKG5hbWUpO1xuXG4gICAgICAgIGlmKGRvbUV2dEV4ZWNSZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnN0IFssIGV2ZW50TmFtZSwga2V5PSdzYW5kYm94Jywgc2VsZWN0b3JdID0gZG9tRXZ0RXhlY1Jlc3VsdDtcbiAgICAgICAgICAgIC8vIGZpeGluZyBjaXJjdWxhciByZWZlcmVuY2UgaXNzdWVcbiAgICAgICAgICAgIGNvbnN0IGFkZERvbUxpc3RlbmVyID0gcmVxdWlyZSgnLi9fYWRkZG9tbGlzdGVuZXInKTtcbiAgICAgICAgICAgIGFkZERvbUxpc3RlbmVyKG9iamVjdCwga2V5LCBldmVudE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWVcbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIGlmKCFza2lwQ2hlY2tzKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgZGF0YSwgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2dCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcmdDYWxsYmFjayA9IGNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayB8fCBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICBjb25zdCBldnRDYWxsYmFjayA9IGV2dC5jYWxsYmFjay5fY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgIGlmIChhcmdDYWxsYmFjayA9PT0gZXZ0Q2FsbGJhY2sgJiYgZXZ0LmNvbnRleHQgPT09IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBldmVudCBpc24ndCBmb3VuZCBhZGQgaXQgdG8gdGhlIGV2ZW50IGxpc3RcbiAgICAgICAgZXZlbnRzLnB1c2goZXZ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZSwgY3JlYXRlIGFycmF5IHdpdGggb25seSBlYmVudFxuICAgICAgICBhbGxFdmVudHNbbmFtZV0gPSBbZXZ0XTtcbiAgICB9XG5cbiAgICBpZiAocHJvcE1vZEV2ZW50UmVnLnRlc3QobmFtZSkpIHtcbiAgICAgICAgLy8gZGVmaW5lIG5lZWRlZCBhY2Nlc3NvcnMgZm9yIEtFWVxuICAgICAgICBkZWZpbmVQcm9wKG9iamVjdCwgbmFtZS5yZXBsYWNlKHByb3BNb2RFdmVudFJlZywgJycpKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZVswXSAhPT0gJ18nKSB7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgYWRkZXZlbnQ6JHtuYW1lfWAsIGV2dCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAnYWRkZXZlbnQnLCBldnQpO1xuICAgIH1cblxuICAgIC8vIGlmIGV2ZW50IGlzIGFkZGVkIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi9fYWRkbGlzdGVuZXIuanNcbiAqKi8iLCIvLyB0aGUgcmVnZXhwIGFsbG93cyB0byBwYXJzZSB0aGluZ3MgbGlrZSBcImNsaWNrOjp4KC55KVwiXG4vLyBpdCdzIHNoYXJlZCBiZXR3ZWVuIGZldyBtb2R1bGVzXG5leHBvcnQgZGVmYXVsdCAvKFteXFw6XFw6XSspOjooW15cXChcXCldKykoPzpcXCgoLiopXFwpKT8vO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2RvbWV2ZW50cmVnZXhwLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgZ2l2ZW5EZWxheSwgdGhpc0FyZykge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIGxldCBkZWxheTtcbiAgICBpZiAodHlwZW9mIGRlbGF5ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzQXJnID0gZ2l2ZW5EZWxheTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBkZWxheSA9IDA7XG4gICAgfVxuXG4gICAgZGVsYXkgPSBnaXZlbkRlbGF5IHx8IDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjb25zdCBbYTEsIGEyXSA9IGFyZ3M7XG4gICAgICAgIGNvbnN0IGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSB0aGlzQXJnIHx8IHRoaXM7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChhcmdzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseShjYWxsQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2hlbHBlcnMvZGVib3VuY2UuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi4vb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vdHJpZ2dlci9fdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCBpcyBmcm9tICcuLi9faGVscGVycy9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBzb21lIHBhcnQgb2YgYSBwYXRoIGlzIGNoYW5nZWRcbi8vIGl0IGRlbGVnYXRlcyBldmVudCBsaXN0ZW5lciBmb3IgbmV3IGJyYW5jaCBvZiBhbiBvYmplY3QgYW5kIHVuZGVsZWdhdGVzIGl0IGZvciBvbGQgb25lXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKHtcbiAgICBwcmV2aW91c1ZhbHVlLFxuICAgIHZhbHVlXG59LCB7XG4gICAgcGF0aCxcbiAgICBuYW1lLFxuICAgIGNhbGxiYWNrLFxuICAgIGNvbnRleHQsXG4gICAgaW5mb1xufSA9IHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQuaW5mby5kZWxlZ2F0ZWREYXRhKSB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcih2YWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuICAgIH1cblxuICAgIGlmIChwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuICAgIH1cbn1cblxuLy8gYWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0IGJ5IGdpdmVuIHBhdGhcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBnaXZlblBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge2ZvbzogJ2Jhcid9KSB7XG4gICAgLy8gaWYgdHlwZW9mIHBhdGggaXMgc3RyaW5nIGFuZCBwYXRoIGlzIG5vdCBlbXB0eSBzdHJpbmcgdGhlbiBzcGxpdCBpdFxuICAgIGxldCBwYXRoID0gdHlwZW9mIGdpdmVuUGF0aCA9PT0gJ3N0cmluZycgJiYgZ2l2ZW5QYXRoICE9PSAnJyA/IGdpdmVuUGF0aC5zcGxpdCgnLicpIDogZ2l2ZW5QYXRoO1xuXG4gICAgaWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBubyBwYXRoIHRoZW4gYWRkIHNpbXBsZSBsaXN0ZW5lclxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGRvIGFsbCBtYWdpY1xuICAgICAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuICAgICAgICBsZXQgcGF0aFN0cjtcblxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwYXRoID0gbm9mbi5zbGljZShwYXRoLCAxKTtcbiAgICAgICAgICAgIHBhdGhTdHIgPSBwYXRoLmpvaW4oJy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGggPSBbXTtcbiAgICAgICAgICAgIHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVsZWdhdGVkRGF0YSA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgaW5mb1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQgYnkgXCJzZXRcIlxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG4gICAgICAgICAgICBkZWxlZ2F0ZWREYXRhLFxuICAgICAgICAgICAgcGF0aFN0clxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWxsIGhhbmRsZXIgbWFudWFsbHlcbiAgICAgICAgY2hhbmdlSGFuZGxlcih7XG4gICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV1cbiAgICAgICAgfSwgZGVsZWdhdGVkRGF0YSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2RlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL19kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVUcmVlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXInO1xuXG4vLyBjcmVhdGVzIHRyZWUgbGlzdGVuZXJcbmZ1bmN0aW9uIGNyZWF0ZVRyZWVMaXN0ZW5lcih7IGhhbmRsZXIsIHJlc3RQYXRoIH0pIHtcbiAgICBjb25zdCBuZXdIYW5kbGVyID0gZnVuY3Rpb24gdHJlZUxpc3RlbmVyKGNoYW5nZUV2dCkge1xuICAgICAgICBjb25zdCBuZXdDaGFuZ2VFdmVudCA9IG5vZm4uYXNzaWduKHsgcmVzdFBhdGggfSwgY2hhbmdlRXZ0KTtcbiAgICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlLCB2YWx1ZSB9ID0gY2hhbmdlRXZ0O1xuXG4gICAgICAgIC8vIHJlbW92ZXMgbGlzdGVuZXIgZm9yIGFsbCBicmFuY2hlcyBvZiB0aGUgcGF0aCBvbiBvbGQgb2JqZWN0XG4gICAgICAgIGlmKHByZXZpb3VzVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZW1vdmVUcmVlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcmVzdFBhdGgsIGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkcyBsaXN0ZW5lciBmb3IgYWxsIGJyYW5jaGVzIG9mIFwicmVzdFBhdGhcIiBwYXRoIG9uIG5ld2x5IGFzc2lnbmVkIG9iamVjdFxuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBhZGRUcmVlTGlzdGVuZXIodmFsdWUsIHJlc3RQYXRoLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGwgb3JpZ2luYWwgaGFuZGxlclxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgbmV3Q2hhbmdlRXZlbnQpO1xuICAgIH1cblxuICAgIG5ld0hhbmRsZXIuX2NhbGxiYWNrID0gaGFuZGxlcjtcblxuICAgIHJldHVybiBuZXdIYW5kbGVyO1xufVxuXG4vLyBsaXN0ZW5zIGNoYW5nZXMgZm9yIGFsbCBicmFuY2hlcyBvZiBnaXZlbiBwYXRoXG4vLyBUT0RPOiBQYXNzIGNvbnRleHQgdG8gYWRkVHJlZUxpc3RlbmVyXG4vLyBUT0RPOiBQYXNzIGluZm8gdG8gYWRkVHJlZUxpc3RlbmVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRUcmVlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aCwgaGFuZGxlcikge1xuICAgIGlmKHR5cGVvZiBkZWVwUGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZGVlcFBhdGggPSBkZWVwUGF0aC5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwga2V5cyBhbmQgZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBvYmplY3RzIG9mIGdpdmVuIGJyYW5jaFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBUT0RPOiBBcnJheS5wcm90b3R5cGUuc2xpY2UgbWV0aG9kIGlzIHNsb3dcbiAgICAgICAgY29uc3QgbGlzdGVuUGF0aCA9IGRlZXBQYXRoLnNsaWNlKDAsIGkpO1xuICAgICAgICBjb25zdCByZXN0UGF0aCA9IGRlZXBQYXRoLnNsaWNlKGkgKyAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKFxuICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgbGlzdGVuUGF0aCxcbiAgICAgICAgICAgIGBfY2hhbmdlOnRyZWU6JHtkZWVwUGF0aFtpXX1gLFxuICAgICAgICAgICAgY3JlYXRlVHJlZUxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLFxuICAgICAgICAgICAgICAgIHJlc3RQYXRoXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uL19hZGR0cmVlbGlzdGVuZXIuanNcbiAqKi8iLCJcbnhkZXNjcmliZSgnQmluZGluZ3MgcGFyc2VyJywgKCkgPT4ge1xuXHRpdCgnc2hvdWxkIGJpbmQgSFRNTCcsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8c3Bhbj57e3h9fTwvc3Bhbj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuXG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnaGknO1xuICAgICAgICBleHBlY3Qobm9kZS5maXJzdENoaWxkLmlubmVySFRNTCkudG9FcXVhbChvYmplY3QueCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBIVE1MIHVzaW5nIE1hdHJlc2hrYSBpbnN0YW5jZSBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHNwYW4+e3t4fX08L3NwYW4+JyksXG4gICAgICAgICAgICBtayA9IG5ldyBNSztcblxuICAgICAgICBtay5wYXJzZUJpbmRpbmdzKG5vZGUpO1xuICAgICAgICBtay54ID0gJ2hpJztcbiAgICAgICAgZXhwZWN0KG5vZGUuZmlyc3RDaGlsZC5pbm5lckhUTUwpLnRvRXF1YWwobWsueCk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cInt7eH19XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdoZXknO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgY2hlY2tlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cInt7eH19XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9IHRydWU7XG4gICAgICAgIGV4cGVjdChub2RlLmNoZWNrZWQpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHRleHRhcmVhcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8dGV4dGFyZWEgdmFsdWU9XCJ7e3h9fVwiPjwvdGV4dGFyZWE+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCk7XG5cdH0pO1xuXG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgY29tcGxleCBhdHRycycsICgpID0+IHt3aW5kb3cub2xvbG9zaGEgPSB0cnVlO1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxhIGhyZWY9XCJ7e3h9fS97e3l9fVwiPjwvYT4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Jhcic7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLmdldEF0dHJpYnV0ZSgnaHJlZicpKS50b0VxdWFsKG9iamVjdC54ICsgJy8nICsgb2JqZWN0LnkpO3dpbmRvdy5vbG9sb3NoYSA9IGZhbHNlO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNvbXBsZXggdmFsdWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cInt7eH19IGFuZCB7e3l9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnZm9vJztcbiAgICAgICAgb2JqZWN0LnkgPSAnYmFyJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LnggKyAnIGFuZCAnICsgb2JqZWN0LnkpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZG50IGNyZWF0ZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHZhbHVlPVwie3t4fX0gYW5kIHt7eX19XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdiYXInO1xuICAgICAgICBvYmplY3QueSA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbChvYmplY3QueCArICcgYW5kICcgKyBvYmplY3QueSk7XG4gICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyhvYmplY3QpKS50b0VxdWFsKFsneCcsICd5J10pO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIG5lc3RlZCBub2RlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKGBcbiAgICAgICAgICAgIDxkaXY+e3t4fX1cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCJ7e3l9fVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGF0dHI9XCJoZXkge3t6fX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCksXG4gICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jhcic7XG4gICAgICAgIG9iamVjdC56ID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLmlubmVySFRNTC5pbmRleE9mKCc8c3Bhbj4nICsgb2JqZWN0LnggKyAnPC9zcGFuPicpKS50b0VxdWFsKDApO1xuICAgICAgICBleHBlY3QocSgnaW5wdXQnLCBub2RlKS52YWx1ZSkudG9FcXVhbChvYmplY3QueSk7XG4gICAgICAgIGV4cGVjdChxKCdbYXR0cl0nLCBub2RlKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKSkudG9FcXVhbCgnaGV5ICcgKyBvYmplY3Queik7XG4gICAgICAgIGV4cGVjdChPYmplY3Qua2V5cyhvYmplY3QpLnNvcnQoKSkudG9FcXVhbChbJ3gnLCAneScsICd6J10pO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBuZXN0ZWQgbm9kZXMgYW5kIGRlZXAgcHJvcGVydGllcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKGBcbiAgICAgICAgICAgIDxkaXY+e3thLmJ9fVxuICAgICAgICAgICAgICAgIDxpbnB1dCB2YWx1ZT1cInt7Yy5kfX1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiaGV5IHt7ZS5mfX1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCksXG4gICAgICAgIG9iamVjdCA9IHtcbiAgICAgICAgICAgIGE6IHtiOiAxfSxcbiAgICAgICAgICAgIGM6IHtkOiAyfSxcbiAgICAgICAgICAgIGU6IHtmOiAyfVxuICAgICAgICB9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC5hLmIgPSAnZm9vJztcbiAgICAgICAgb2JqZWN0LmMuZCA9ICdiYXInO1xuICAgICAgICBvYmplY3QuZS5mID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLmlubmVySFRNTC5pbmRleE9mKCc8c3Bhbj4nICsgb2JqZWN0LmEuYiArICc8L3NwYW4+JykpLnRvRXF1YWwoMCk7XG4gICAgICAgIGV4cGVjdChxKCdpbnB1dCcsIG5vZGUpLnZhbHVlKS50b0VxdWFsKG9iamVjdC5jLmQpO1xuICAgICAgICBleHBlY3QocSgnW2F0dHJdJywgbm9kZSkuZ2V0QXR0cmlidXRlKCdhdHRyJykpLnRvRXF1YWwoJ2hleSAnICsgb2JqZWN0LmUuZik7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aGVuIGJyYWNrZXRzIGFyZSByZWRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHZhbHVlPVwiW1t4XV0geW91XCI+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fSxcblx0XHRcdGRlZmF1bHRCcmFja2V0cyA9IG1hZ2ljLnBhcnNlckJyYWNrZXRzO1xuXG5cdFx0bWFnaWMucGFyc2VyQnJhY2tldHMgPSB7XG5cdFx0XHRsZWZ0OiAnW1snLFxuXHRcdFx0cmlnaHQ6ICddXSdcblx0XHR9O1xuXG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnaGV5JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LnggKyAnIHlvdScpO1xuXG5cdFx0bWFnaWMucGFyc2VyQnJhY2tldHMgPSBkZWZhdWx0QnJhY2tldHM7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19wYXJzZXJfc3BlYy5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuaW1wb3J0IGJpbmRPcHRpb25hbE5vZGUgZnJvbSAnc3JjL2JpbmRvcHRpb25hbG5vZGUnO1xuaW1wb3J0IGJpbmRTYW5kYm94IGZyb20gJ3NyYy9iaW5kc2FuZGJveCc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICdzcmMvdW5iaW5kbm9kZSc7XG5pbXBvcnQgc2VsZWN0IGZyb20gJ3NyYy9zZWxlY3QnO1xuaW1wb3J0IHNlbGVjdEFsbCBmcm9tICdzcmMvc2VsZWN0YWxsJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2hlbHBlcnMvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuICAgIGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBub2RlO1xuICAgIGxldCBiaW5kZXI7XG4gICAgbGV0IHNpbXVsYXRlRG9tRXZlbnQ7XG4gICAgbGV0IGluaXRpYWxpemVDYWxsO1xuICAgIGxldCBkZXN0cm95Q2FsbDtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVCaW5kID0gKGtleSA9ICd4JykgPT4ge1xuICAgICAgICBvYmpba2V5XSA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9ialtrZXldKS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVVbmJpbmQgPSAoKSA9PiB7XG4gICAgICAgIG9iai54ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXonO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBleHBlY3QoZGVzdHJveUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgaW5pdGlhbGl6ZUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgZGVzdHJveUNhbGwgPSBjcmVhdGVTcHkoKTtcblxuICAgICAgICBiaW5kZXIgPSAge1xuICAgICAgICAgICAgb24oY2JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmR1bW15ZXZlbnQgPSBjYmM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUodikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemUobykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplQ2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLm9uZHVtbXlldmVudCA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICAgIGRlc3Ryb3lDYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRlYm91bmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIpO1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH0pO1xuXG4gICAgeGl0KCdzaG91bGQgYmluZCBhbmQgdXNlIERPTSBldmVudHMnLCAoKSA9PiB7fSlcblxuICAgIGl0KCdzaG91bGQgYmluZCBhbmQgdHJpZ2dlciBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJpbmRDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGNvbnN0IGJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2JpbmQnLCBiaW5kQ2FsbCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ2JpbmQ6eCcsIGJpbmRLZXlDYWxsKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgICAgICBleHBlY3QoYmluZENhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgZXhwZWN0KGJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBhbmQgdHJpZ2dlciBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVuYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgdW5iaW5kS2V5Q2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQnLCB1bmJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAndW5iaW5kOngnLCB1bmJpbmRLZXlDYWxsKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3QodW5iaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QodW5iaW5kS2V5Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCB7IHg6IG5vZGUgfSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB1bmJpbmQgd25lIHdyb25nIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHdyb25nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIHdyb25nTm9kZSk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIG5vdCB1bmJpbmQgd25lIHdyb25nIGtleSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3knLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIHdoZW4gbm9kZSBpcyBub3QgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jyk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFsbCB3aGVuIG5laXRoZXIga2V5IG5vciBub2RlIGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIHsgeDogbm9kZSB9KTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGFycmF5IG9mIG9iamVjdHMnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgW3sga2V5OiAneCcsIG5vZGUsIGJpbmRlciB9XSwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSB9XSk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBhIHByb3BlcnR5IGluIGNvbnRleHQgb2JqZWN0IHdoaWNoIGhhcyBpc01LPXRydWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGJpbmROb2RlLmNhbGwob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvRXF1YWwobm9kZSk7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20ob2JqLiRub2Rlcy54KVxuICAgICAgICApLnRvRXF1YWwoW25vZGVdKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSk7XG4gICAgICAgIHRlc3RTaW1wbGVVbmJpbmQoKTtcbiAgICAgICAgZXhwZWN0KG9iai5ub2Rlcy54KS50b0JlVW5kZWZpbmVkKCk7XG4gICAgICAgIGV4cGVjdChvYmouJG5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSk7XG4gICAgICAgIG9iai54LnkueiA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnZm9vJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY2FuY2VscyBkZWVwIGJpbmRpbmcgd2hlbiBkZWVwPWZhbHNlIG9wdGlvbiBpcyBwYXNzZWQnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGRlZXA6IGZhbHNlXG4gICAgICAgIH0sIG5vRGVib3VuY2VGbGFnKSk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCd4LnkueicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZWJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgndS54LnkueicsICdnbycpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd1LngueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIG9iai51LnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLnUueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgYmluZGluZyBpZiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3UueC55Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3UueC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgY29uc3QgeCA9IG9iai51Lng7XG5cbiAgICAgICAgb2JqLnUueCA9IG1ha2VPYmplY3QoJ3kueicsICdmb28nKTtcblxuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdCh4Lnkueikubm90LnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICBleHBlY3Qob2JqLnUueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICB4LnkueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndXNlcyBjdXN0b20gc2VsZWN0b3JzIG9uIGN1cnJlbnQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknLCAnZm9vJyk7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcblxuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94Jywgbm9kZSk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueScsICc6c2FuZGJveCBzcGFuJywgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkTm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIGNoaWxkTm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBjaGlsZE5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KGB0aHJvd3MgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlYCwgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE5vZGUob2JqLCAneCcpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdChgZG9lc24ndCB0aHJvdyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmUgYW5kIG9wdGlvbmFsPXRydWUgaXMgZ2l2ZW5gLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kTm9kZShvYmosICd4JywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSBtZXRob2Qgb2YgTWF0cmVzaGthIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE9wdGlvbmFsTm9kZShvYmosICd4Jyk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2VsZWN0cyBjaGlsZHJlbiBvZiBzYW5kYm94JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImZvb1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiZm9vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCBzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCkgc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpzYW5kYm94IHNwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCB0YWJsZScpXG4gICAgICAgICkudG9FcXVhbChudWxsKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHRhYmxlJylcbiAgICAgICAgKS50b0VxdWFsKG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KSB0YWJsZScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbXSk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggdGFibGUnKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBiaW5kIGFuZCByZWJpbmQgc2FuZGJveCB2aWEgYmluZFNhbmRib3gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFub3RoZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIG5vZGUsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIGFub3RoZXJOb2RlLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFthbm90aGVyTm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2JpbmRTYW5kYm94IHRocm93cyBhbiBlcnJvciB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmopO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5cbi8vIFRPRE8gZGVzY3JpcHRpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRPcHRpb25hbE5vZGUoKSB7XG4gICAgLy8gdGhpcyBoYWNrIGFsbG93cyB0byBrZWVwIGJpbmRPcHRpb25hbE5vZGUgYXMgY29tcGFjdCBhcyBwb3NzaWJsZVxuICAgIC8vIGFuZCBkb2Vzbid0IHJlcXVpcmUgdG8gZmxpcCBhcmdzIGFuZCBzdXBwb2VyIGFsbCBiaW5kTm9kZSB2YXJpYXRpb25zXG4gICAgYmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnID0gdHJ1ZTtcbiAgICByZXR1cm4gYmluZE5vZGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTYW5kYm94KG9iamVjdCwgbm9kZSwgZXZ0KSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZ0ID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdiaW5kU2FuZGJveCcpO1xuICAgIH1cblxuICAgIHVuYmluZE5vZGUob2JqZWN0LCAnc2FuZGJveCcsIG51bGwsIGV2dCk7XG4gICAgcmV0dXJuIGJpbmROb2RlKG9iamVjdCwgJ3NhbmRib3gnLCBub2RlLCBudWxsLCBldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZHNhbmRib3guanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vYmluZG5vZGUvX3NlbGVjdG5vZGVzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4vX2hlbHBlcnMvdG9hcnJheSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX2hlbHBlcnMvY2hlY2tvYmplY3R0eXBlJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JUZXN0UmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3Qob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIHNlbGVjdG9yID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NlbGVjdEFsbCcpO1xuICAgIH1cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpWzBdIHx8IG51bGw7XG5cdH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAgICAgaWYgKCFkZWYgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbm9kZSB9ID0gYmluZGluZ3NbMF07XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuXHR9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCBkb20gZnJvbSAnLi9fZG9tJztcbmltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL2JpbmRub2RlL19zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuL19oZWxwZXJzL3RvYXJyYXknO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yVGVzdFJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0QWxsKG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBzZWxlY3RvciA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZWxlY3RBbGwnKTtcbiAgICB9XG5cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuXHR9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBkb20uJCgpO1xuICAgICAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgICAgIGlmICghZGVmIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoeyBub2RlIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZWxlY3RhbGwuanNcbiAqKi8iLCIvLyBjcmVhdGVzIG5lc3RlZCBvYmplY3QgYmFzZWQgb24gcGF0aCBhbmQgbGFzdFZhbHVlXG4vLyBleGFtcGxlOiBtYWtlT2JqZWN0KCdhLmIuYycsIDQyKSAtPiB7YToge2I6IHtjOyA0Mn19fVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU9iamVjdChnaXZlblBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZ2l2ZW5QYXRoID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBbXTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBsZXQgb2JqID0gcmVzdWx0O1xuICAgIGxldCBrZXk7XG5cblxuICAgIHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAga2V5ID0gcGF0aC5zaGlmdCgpO1xuICAgICAgICBvYmogPSBvYmpba2V5XSA9IHt9O1xuICAgIH1cblxuICAgIG9ialtwYXRoLnNoaWZ0KCldID0gbGFzdFZhbHVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9oZWxwZXJzL21ha2VvYmplY3QuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTcHkoc3B5ID0gKCkgPT4ge30pIHtcbiAgICBjb25zdCBzcHlOYW1lID0gJ2Z1bmN0aW9uJztcbiAgICBjb25zdCBzcHlPYmogPSB7fTtcbiAgICBzcHlPYmpbc3B5TmFtZV0gPSBzcHk7XG4gICAgcmV0dXJuIHNweU9uKHNweU9iaiwgc3B5TmFtZSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvaGVscGVycy9jcmVhdGVzcHkuanNcbiAqKi8iLCJpbXBvcnQge1xuXHR0ZXh0YXJlYSxcbiAgICBpbnB1dCxcbiAgICBzZWxlY3QsXG4gICAgb3V0cHV0LFxuICAgIHByb2dyZXNzXG59IGZyb20gJ3NyYy9iaW5kZXJzJztcblxuaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnc3JjL2xvb2tmb3JiaW5kZXInO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJ3NyYy9iaW5kbm9kZSc7XG5cbmRlc2NyaWJlKCdEZWZhdWx0IGJpbmRlcnMnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuXHRsZXQgb2JqO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKHtcbiAgICAgICAgICAgIGJpbmRlcnNFcXVhbDogKHV0aWwsIGN1c3RvbUVxdWFsaXR5VGVzdGVycykgPT4gKHtcbiAgICAgICAgICAgICAgICBjb21wYXJlOiAoYWN0dWFsLCBleHBlY3RlZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFzcyA9IHJlc3VsdC5wYXNzID0gdXRpbC5lcXVhbHMoYWN0dWFsLm9uLCBleHBlY3RlZC5vbiwgY3VzdG9tRXF1YWxpdHlUZXN0ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdXRpbC5lcXVhbHMoYCR7YWN0dWFsLmdldFZhbHVlfWAsIGAke2V4cGVjdGVkLmdldFZhbHVlfWAsIGN1c3RvbUVxdWFsaXR5VGVzdGVycylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHV0aWwuZXF1YWxzKGAke2FjdHVhbC5zZXRWYWx1ZX1gLCBgJHtleHBlY3RlZC5zZXRWYWx1ZX1gLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlID0gcGFzcyA/ICdCaW5kZXJzIGFyZSBlcXVhbCcgOiAnQmluZGVycyBhcmUgbm90IGVxdWFsJ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG5cdFx0b2JqID0ge307XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHRleHRhcmVhJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblx0XHRub2RlLnZhbHVlID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHRleHRhcmVhKCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwodGV4dGFyZWEoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHByb2dyZXNzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJvZ3Jlc3MnKTtcblx0XHRub2RlLm1heCA9IDM7XG4gICAgICAgIG5vZGUudmFsdWUgPSAxO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBwcm9ncmVzcygpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKDEpO1xuXHRcdG9iai54ID0gMjtcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgyKTtcblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHByb2dyZXNzKCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0IGlucHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcblx0XHRub2RlLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgaW5wdXQoJ3RleHQnKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChpbnB1dCgndGV4dCcpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgb3V0cHV0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3V0cHV0Jyk7XG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIG91dHB1dCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLmlubmVySFRNTCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwob3V0cHV0KCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBzZWxlY3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYCR7aX1gO1xuICAgICAgICAgICAgaWYoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzZWxlY3QoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnMScpO1xuXHRcdG9iai54ID0gJzUnO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCc1Jyk7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChzZWxlY3QoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHNlbGVjdCAobXVsdGlwbGUpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIG5vZGUubXVsdGlwbGUgPSB0cnVlO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGAke2l9YDtcbiAgICAgICAgICAgIGlmKGkgPT09IDEgfHwgaSA9PT0gNCB8fCBpID09PSA3KSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHNlbGVjdCh0cnVlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChbJzEnLCAnNCcsICc3J10pO1xuXHRcdG9iai54ID0gWycyJywgJzUnLCAnOCddO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgbm9kZS5vcHRpb25zW2ldLnNlbGVjdGVkXG4gICAgICAgICAgICApLnRvRXF1YWwoXG4gICAgICAgICAgICAgICAgaSA9PT0gMiB8fCBpID09PSA1IHx8IGkgPT09IDhcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHNlbGVjdCh0cnVlKSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9kZWZhdWx0X2JpbmRlcnNfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5hZGQnLCAoKSA9PiB7XG4gICAgaXQoJ2FkZHMgb25jZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWw0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGV4cGVjdChbXG4gICAgICAgICAgICAuLi4kKFtlbDEsIGVsMiwgZWwzXSkuYWRkKFtlbDIsIGVsMywgZWw0LCBlbDVdKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsMiwgZWwzLCBlbDQsIGVsNV0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvYWRkX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuY3JlYXRlJywgKCkgPT4ge1xuICAgIGl0KCdjcmVhdGVzIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnKS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnRElWJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBhIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2Zvb2JhcidcbiAgICAgICAgICAgIH0pLmNsYXNzTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ2Zvb2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NyZWF0ZXMgY2hpbGRlbicsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcbiAgICAgICAgICAgICAgICAgICAgdGFnTmFtZTogJ3NwYW4nXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pLmNoaWxkcmVuWzBdLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyBhdHRyaWJ1dGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZ2V0QXR0cmlidXRlKCdmb28nKVxuICAgICAgICApLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIG9iamVjdCB3aXRoIHRhZ05hbWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKHtcbiAgICAgICAgICAgICAgICB0YWdOYW1lOiAnZGl2J1xuICAgICAgICAgICAgfSkudGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ0RJVicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2V4dGVuZHMgZGF0YXNldCBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgICAgICBmb286ICdiYXInXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZ2V0QXR0cmlidXRlKCdkYXRhLWZvbycpXG4gICAgICAgICkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcbmltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2hlbHBlcnMvc2ltdWxhdGVjbGljayc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgZXZlbnRzJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgY2hpbGQxO1xuICAgIGxldCBjaGlsZDI7XG4gICAgbGV0IGdyYW5kY2hpbGQxO1xuICAgIGxldCBoYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpO1xuICAgICAgICBjaGlsZDIgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQyJyk7XG4gICAgICAgIGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG4gICAgICAgIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICAkKFt0ZXN0U2FuZGJveCwgY2hpbGQxLCBjaGlsZDIsIGdyYW5kY2hpbGQxXSkub2ZmKCdjbGljaycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBuYW1lc3BhY2VkIGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGJ1YmJsaW5nIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoY2xpY2sgb24gZ3JhbmRjaGlsZHJlbiknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0RvZXNuXFx0IHRyaWdnZXIgd2hlbiBjbGlja2VkIG9uIHdyb25nIGNoaWxkJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMicsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIG5vdCBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU3RvcHMgcHJvcGFnYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICAkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qc1xuICoqLyIsIi8vIHNpbXVsYXRlcyBjbGljayBvbiBhIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2sobm9kZSkge1xuICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2hlbHBlcnMvc2ltdWxhdGVjbGljay5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5maW5kJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgZ3JhbmRDaGlsZDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBncmFuZENoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQodGVzdFNhbmRib3gpLmZpbmQoJy5ncmFuZGNoaWxkJylcbiAgICAgICAgXSkudG9FcXVhbChbZ3JhbmRDaGlsZF0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGluaXRpYWxpemF0aW9uJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0zXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIHdpbmRvdycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCh3aW5kb3cpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgZG9jdW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoZG9jdW1lbnQpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbChkb2N1bWVudCk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb252ZXJ0cyBhcnJheS1saWtlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChjaGlsZHJlbik7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoY2hpbGRyZW5baV0pLnRvRXF1YWwocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZWxlbWVudCkudG9FcXVhbChyZXN1bHRbMF0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsIHRlc3RTYW5kYm94KS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsICcud3JvbmctY29udGV4dCcpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKG51bGwpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcbiAgICAgICAgJC5mbi5iUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiBiUXVlcnlQbHVnaW4oKSB7XG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGhcbiAgICAgICAgICAgICkudG9FcXVhbChcbiAgICAgICAgICAgICAgICB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJykubGVuZ3RoXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKCQuZm4sICdiUXVlcnlQbHVnaW4nKTtcblxuICAgICAgICAkKCcqJywgdGVzdFNhbmRib3gpLmJRdWVyeVBsdWdpbigpO1xuXG4gICAgICAgIGV4cGVjdCgkLmZuLmJRdWVyeVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcbiAgICBpdCgnY2hlY2tzIGNsYXNzTmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKGVsKS5pcygnLmVsJylcbiAgICAgICAgKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwyJylcbiAgICAgICAgKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuICAgIGl0KCdleGNsdWRlcyBieSBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5ub3QoJy5lbDInKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvbm90X3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgKCkgPT4ge1xuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMlwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQub25lKCcqJywgdGVzdFNhbmRib3gpXG4gICAgICAgICkudG9FcXVhbChjaGlsZCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5wYXJzZUhUTUwnLCAoKSA9PiB7XG4gICAgaXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPHRkPjwvdGQ+PHRkPjwvdGQ+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgY2FsYyBmcm9tICdzcmMvY2FsYyc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi9oZWxwZXJzL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi9oZWxwZXJzL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdjYWxjJywgKCkgPT4ge1xuXHRpdCgnYWRkcyBzaW1wbGUgZGVwZW5kZW5jeScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMlxuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIpO1xuXHRcdGV4cGVjdChvYmouYykudG9FcXVhbCgzKTtcblx0XHRvYmouYSA9IDM7XG5cdFx0ZXhwZWN0KG9iai5jKS50b0VxdWFsKDUpO1xuXHRcdG9iai5iID0gMztcblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoNik7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIHNpbXBsZSBkZXBlbmRlbmN5IGZvciBvYmplY3Qgd2l0aCBpc01LPXRydWUnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0ge1xuXHRcdFx0aXNNSzogdHJ1ZSxcblx0XHRcdGE6IDEsXG5cdFx0XHRiOiAyXG5cdFx0fTtcblxuXHRcdGNhbGMuY2FsbChvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiKTtcblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoMyk7XG5cdFx0b2JqLmEgPSAzO1xuXHRcdGV4cGVjdChvYmouYykudG9FcXVhbCg1KTtcblx0XHRvYmouYiA9IDM7XG5cdFx0ZXhwZWN0KG9iai5jKS50b0VxdWFsKDYpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBkZXBlbmRlbmN5IGZyb20gYW5vdGhlciBvYmplY3QnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0ge1xuXHRcdFx0YTogMSxcblx0XHRcdGI6IDJcblx0XHR9O1xuXHRcdGNvbnN0IG9iajIgPSB7XG5cdFx0XHRjOiA0LFxuXHRcdFx0ZDogOFxuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2UnLCBbe1xuXHRcdFx0b2JqZWN0OiBvYmosXG5cdFx0XHRrZXk6IFsnYScsICdiJ11cblx0XHR9LCB7XG5cdFx0XHRvYmplY3Q6IG9iajIsXG5cdFx0XHRrZXk6IFsnYycsICdkJ11cblx0XHR9XSwgKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQpO1xuXG5cdFx0ZXhwZWN0KG9iai5lKS50b0VxdWFsKDE1KTtcblx0fSk7XG5cblx0aXQoYGRvZXNuJ3Qgc2V0IG9uIGluaXQgdmlhIHNldE9uSW5pdD1mYWxzZWAsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMixcblx0XHRcdGM6IDBcblx0XHR9O1xuXG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiLCB7XG5cdFx0XHRzZXRPbkluaXQ6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdwcm90ZWN0cyBmcm9tIGN5Y2xpY2FsIGxpbmtzJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHtcblx0XHRcdGE6IDEsXG5cdFx0XHRiOiAyLFxuXHRcdFx0YzogM1xuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2EnLCBbJ2InLCAnYyddLCAoeCwgeSkgPT4geCArIHkpO1xuXHRcdGNhbGMob2JqLCAnYicsIFsnYScsICdjJ10sICh4LCB5KSA9PiB4ICsgeSk7XG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKHgsIHkpID0+IHggKyB5KTtcblxuXHRcdGV4cGVjdChvYmouYSkudG9FcXVhbCgyNyk7XG5cdH0pO1xuXG5cdHhpdCgndGhyb3dzIGVycm9yIHdoZW4gdGFyZ2V0IGlzIG5vdCBhIHN0cmluZycsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2UgaXMgbm90IGFuIG9iamVjdCcsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2Uga2V5IGlzIG5vdCBhIHN0cmluZycsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2Ugb2JqZWN0IGlzIG5vdCBhbiBvYmplY3QnLCAoKSA9PiB7fSk7XG5cblx0aXQoJ2FsbG93cyBkZWVwIGRlcGVuZGVuY2llcycsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycsIDEpO1xuXG5cdFx0Y2FsYyhvYmosICdkJywgJ2EuYi5jJywgKGMpID0+IGMpO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgxKTtcblx0XHRvYmouYS5iLmMgPSAyO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgyKTtcblxuXHRcdGNvbnN0IGIgPSBvYmouYS5iO1xuXHRcdG9iai5hLmIgPSB7YzogM307XG5cdFx0Yi5jID0gJ25vcGUnO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgzKTtcblxuXHRcdGNvbnN0IGEgPSBvYmouYTtcblx0XHRvYmouYSA9IHtiOiB7YzogNH19O1xuXHRcdGEuYiA9IHtjOiAnbm9wZSd9O1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCg0KTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyBkZWVwIGRlcGVuZGVuY2llcyBmcm9tIGFub3RoZXIgb2JqZWN0JywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EnLCAxKTtcblx0XHRjb25zdCBvYmoyID0gbWFrZU9iamVjdCgnYi5jLmQnLCAyKTtcblxuXHRcdGNhbGMob2JqLCAnZCcsIHtcblx0XHRcdG9iamVjdDogb2JqMixcblx0XHRcdGtleTogJ2IuYy5kJ1xuXHRcdH0sIChjKSA9PiBjKjIpO1xuXG5cdFx0ZXhwZWN0KG9iai5kKS50b0VxdWFsKDQpO1xuXHR9KTtcblxuXHRpdCgndXNlcyBldmVudCBvcHRpb25zJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHt9O1xuXHRcdGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoZXZ0ID0+IHtcblx0XHRcdGV4cGVjdChldnQuZm9vKS50b0VxdWFsKCdiYXInKTtcblx0XHR9KTtcblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIsIHsgZm9vOiAnYmFyJyB9KTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cblx0XHRvYmouYSA9IDI7XG5cdFx0b2JqLmIgPSAzO1xuXG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcblx0fSk7XG5cblx0aXQoJ3VzZXMgc2lsZW50PXRydWUgZnJvbSBldmVudCBvcHRpb25zJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHt9O1xuXHRcdGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIsIHsgc2lsZW50OiB0cnVlIH0pO1xuXG5cdFx0b2JqLmEgPSAyO1xuXHRcdG9iai5iID0gMztcblxuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIGRlYm91bmNlIGhhbmRsZXInLCBkb25lID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMlxuXHRcdH07XG5cdFx0Y29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgoKSA9PiB7XG5cdFx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoNSk7XG5cdFx0fSk7XG5cblx0XHRhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6YycsIGhhbmRsZXIpO1xuXG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiLCB7XG5cdFx0XHRkZWJvdW5jZTogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0b2JqLmEgPSAwO1xuXHRcdG9iai5hID0gMTtcblx0XHRvYmouYSA9IDI7XG5cdFx0b2JqLmIgPSAwO1xuXHRcdG9iai5iID0gMTtcblx0XHRvYmouYiA9IDI7XG5cdFx0b2JqLmIgPSAzO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDQwMCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9jYWxjX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9faGVscGVycy9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IG1hdHJlc2hrYUVycm9yIGZyb20gJy4uL19oZWxwZXJzL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL19oZWxwZXJzL2RlYm91bmNlJztcbmltcG9ydCBhZGRTb3VyY2UgZnJvbSAnLi9fYWRkc291cmNlJztcbmltcG9ydCBjcmVhdGVDYWxjSGFuZGxlciBmcm9tICcuL19jcmVhdGVjYWxjaGFuZGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbGMob2JqZWN0LCB0YXJnZXQsIHNvdXJjZXMsIGdpdmVuSGFuZGxlciwgZXZlbnRPcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZlbnRPcHRpb25zID0gZ2l2ZW5IYW5kbGVyO1xuICAgICAgICBnaXZlbkhhbmRsZXIgPSBzb3VyY2VzO1xuICAgICAgICBzb3VyY2VzID0gdGFyZ2V0O1xuICAgICAgICB0YXJnZXQgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnY2FsYycpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgKiB0aGlzLmNhbGMoW3t0YXJnZXQsIHNvdXJjZSwgaGFuZGxlciwgZXZlbnR9XSwgY29tbW9uRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICovXG4gICAgICAgIG5vZm4uZm9yRWFjaCh0YXJnZXQsICh7XG4gICAgICAgICAgICB0YXJnZXQ6IGl0ZW1UYXJnZXQsXG4gICAgICAgICAgICBzb3VyY2VzOiBpdGVtU291cmNlcyxcbiAgICAgICAgICAgIGhhbmRsZXI6IGl0ZW1IYW5kbGVyLFxuICAgICAgICAgICAgZXZlbnQ6IGl0ZW1FdmVudE9wdGlvbnNcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnRPcHRpb25zID0gc291cmNlcztcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50T3B0aW9ucyA9IHt9O1xuXG4gICAgICAgICAgICBpZihjb21tb25FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwiZ2xvYmFsXCIgZXZlbnRcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudE9wdGlvbnMsIGNvbW1vbkV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGl0ZW1FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnRPcHRpb25zLCBpdGVtRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsYyhvYmplY3QsIGl0ZW1UYXJnZXQsIGl0ZW1Tb3VyY2VzLCBpdGVtSGFuZGxlciwgbWVyZ2VkRXZlbnRPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGFyZ2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignY2FsYzp0YXJnZXRfdHlwZScsIHsgdGFyZ2V0IH0pO1xuICAgIH1cblxuICAgIGV2ZW50T3B0aW9ucyA9IGV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCBkZWYgPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7XG4gICAgICAgIHNldE9uSW5pdD10cnVlLFxuICAgICAgICBkZWVwPXRydWUsXG4gICAgICAgIGRlYm91bmNlOiBkZWJvdW5jZU9wdGlvbj1mYWxzZVxuICAgIH0gPSBldmVudE9wdGlvbnM7XG4gICAgY29uc3QgZGVmYXVsdEhhbmRsZXIgPSB2YWx1ZSA9PiB2YWx1ZTtcbiAgICBjb25zdCBoYW5kbGVyID0gZ2l2ZW5IYW5kbGVyIHx8IGRlZmF1bHRIYW5kbGVyO1xuICAgIGNvbnN0IGFsbFNvdXJjZXMgPSBbXTtcblx0bGV0IGNhbGNIYW5kbGVyID0gY3JlYXRlQ2FsY0hhbmRsZXIoe1xuXHRcdG9iamVjdCxcblx0XHRldmVudE9wdGlvbnMsXG5cdFx0YWxsU291cmNlcyxcblx0XHR0YXJnZXQsXG5cdFx0ZGVmLFxuXHRcdGhhbmRsZXJcblx0fSk7XG5cbiAgICBpZighKHNvdXJjZXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgc291cmNlcyA9IFtzb3VyY2VzXTtcbiAgICB9XG5cbiAgICAvLyBieSBkZWZhdWx0IGRlYm91bmNpbmcgaXMgb2ZmXG4gICAgLy8gaXQgY2FuIGJlIHR1cm5lZCBvbiBieSBwYXNzaW5nIGRlYm91bmNlPXRydWUgb3IgZGVib3VuY2U9PG51bWJlcj4gdG8gZXZlbnQgb2JqZWN0XG4gICAgaWYgKGRlYm91bmNlT3B0aW9uIHx8IGRlYm91bmNlT3B0aW9uID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIGRlYm91bmNlT3B0aW9uID09PSAnbnVtYmVyJyA/IGRlYm91bmNlT3B0aW9uIDogMDtcbiAgICAgICAgY2FsY0hhbmRsZXIgPSBkZWJvdW5jZShjYWxjSGFuZGxlciwgZGVsYXkpO1xuICAgIH1cblxuICAgIG5vZm4uZm9yRWFjaChzb3VyY2VzLCBzb3VyY2UgPT4ge1xuICAgICAgICBpZih0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYWRkU291cmNlKHtcblx0XHRcdFx0Y2FsY0hhbmRsZXIsXG5cdFx0XHRcdG9iamVjdCxcblx0XHRcdFx0YWxsU291cmNlcyxcbiAgICAgICAgICAgICAgICBzb3VyY2VLZXk6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICBzb3VyY2VPYmplY3Q6IG9iamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZighc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbWF0cmVzaGthRXJyb3IoJ2NhbGM6c291cmNlX3R5cGUnLCB7IHNvdXJjZSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc291cmNlS2V5ID0gc291cmNlLmtleTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZU9iamVjdCA9IHNvdXJjZS5vYmplY3Q7XG4gICAgICAgICAgICBpZihzb3VyY2VLZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChzb3VyY2VLZXksIChzb3VyY2VLZXlJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFNvdXJjZSh7XG5cdFx0XHRcdFx0XHRjYWxjSGFuZGxlcixcblx0XHRcdFx0XHRcdG9iamVjdCxcblx0XHRcdFx0XHRcdGFsbFNvdXJjZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VLZXk6IHNvdXJjZUtleUl0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkU291cmNlKHtcblx0XHRcdFx0XHRjYWxjSGFuZGxlcixcblx0XHRcdFx0XHRvYmplY3QsXG5cdFx0XHRcdFx0YWxsU291cmNlcyxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlS2V5LFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VPYmplY3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYoc2V0T25Jbml0KSB7XG4gICAgICAgIGNhbGNIYW5kbGVyKClcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWxjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgYWRkVHJlZUxpc3RlbmVyIGZyb20gJy4uL29uL19hZGR0cmVlbGlzdGVuZXInO1xuXG4vLyBhZGRzIHNvdXJjZSB0byBhIHNvdXJjZSBsaXN0IGFuZCBhZGRzIGV2ZW50IGxpc3RlbmVyIHRvIGEgc291cmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRTb3VyY2Uoe1xuXHRjYWxjSGFuZGxlcixcblx0b2JqZWN0LFxuXHRhbGxTb3VyY2VzLFxuXHRzb3VyY2VLZXksXG5cdHNvdXJjZU9iamVjdFxufSkge1xuXHRsZXQgaXNEZWxlZ2F0ZWQgPSBmYWxzZTtcblxuXHQvLyBzb3VyY2Uga2V5IG11c3QgYmUgYSBzdHJpbmdcblx0aWYodHlwZW9mIHNvdXJjZUtleSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBtYXRyZXNoa2FFcnJvcignY2FsYzpzb3VyY2Vfa2V5X3R5cGUnLCB7IHNvdXJjZUtleSB9KTtcblx0fVxuXG5cdC8vIHNvdXJjZSBvYmplY3QgbXVzdCBiZSBhbiBvYmplY3Rcblx0aWYoIXNvdXJjZU9iamVjdCB8fCB0eXBlb2Ygc291cmNlT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuXHRcdHRocm93IG1hdHJlc2hrYUVycm9yKCdjYWxjOnNvdXJjZV9vYmplY3RfdHlwZScsIHsgc291cmNlT2JqZWN0IH0pO1xuXHR9XG5cblx0Y29uc3QgZGVlcFBhdGggPSBzb3VyY2VLZXkuc3BsaXQoJy4nKTtcblx0Y29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG5cblx0Ly8gaWYgc29tZXRoaW5nIGxpa2UgYS5iLmMgaXMgdXNlZCBhcyBhIGtleVxuXHRpZihkZWVwUGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0aXNEZWxlZ2F0ZWQgPSB0cnVlO1xuXHRcdC8vIFRPRE8gYXZvaWQgY29sbGlzaW9ucyB3aXRoIGJpbmRpbmdzIGJ5IHVzaW5nIGFub3RoZXIgZXZlbnQgbmFtZSBpbnN0ZWFkIG9mIF9jaGFuZ2U6dHJlZTouLi5cblx0XHRhZGRUcmVlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aCwgY2FsY0hhbmRsZXIpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIG5vcm1hbCBoYW5kbGVyXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZXBzOiR7c291cmNlS2V5fWAsIGNhbGNIYW5kbGVyKTtcblx0fVxuXG5cdGFsbFNvdXJjZXMucHVzaCh7XG5cdFx0c291cmNlS2V5LFxuXHRcdHNvdXJjZU9iamVjdCxcblx0XHRpc0RlbGVnYXRlZFxuXHR9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhbGMvX2FkZHNvdXJjZS5qc1xuICoqLyIsImltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcbmltcG9ydCBkZWVwRmluZCBmcm9tICcuLi9faGVscGVycy9kZWVwZmluZCc7XG5cbi8vIFRPRE86IEFkZCBkZXNjcmlwdGlvbiBhbmQgY29tbWVudHMgZm9yIGNyZWF0ZUNhbGNIYW5kbGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDYWxjSGFuZGxlcih7XG5cdG9iamVjdCxcblx0ZXZlbnRPcHRpb25zLFxuXHRhbGxTb3VyY2VzLFxuXHR0YXJnZXQsXG5cdGRlZixcblx0aGFuZGxlclxufSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gY2FsY0hhbmRsZXIoY2hhbmdlRXZlbnQ9e30pIHtcblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0XHRjb25zdCB7IHByb3RlY3Rvcj17fSB9ID0gY2hhbmdlRXZlbnQ7XG5cdFx0Y29uc3QgcHJvdGVjdEtleSA9IHRhcmdldCArIGRlZi5pZDtcblx0XHRsZXQgc2V0RXZlbnRPcHRpb25zID0gbm9mbi5hc3NpZ24oeyBwcm90ZWN0b3IgfSwgZXZlbnRPcHRpb25zKTtcblx0XHRzZXRFdmVudE9wdGlvbnMgPSBub2ZuLmFzc2lnbihzZXRFdmVudE9wdGlvbnMsIGNoYW5nZUV2ZW50KTtcblxuXHRcdGlmKHByb3RlY3RLZXkgaW4gcHJvdGVjdG9yKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0cHJvdGVjdG9yW3Byb3RlY3RLZXldID0gdHJ1ZTtcblxuXHRcdG5vZm4uZm9yRWFjaChhbGxTb3VyY2VzLCAoeyBzb3VyY2VPYmplY3QsIHNvdXJjZUtleSwgaXNEZWxlZ2F0ZWQgfSkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBpc0RlbGVnYXRlZCA/IGRlZXBGaW5kKHNvdXJjZU9iamVjdCwgc291cmNlS2V5KSA6IHNvdXJjZU9iamVjdFtzb3VyY2VLZXldO1xuXHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdGFyZ2V0VmFsdWUgPSBoYW5kbGVyLmFwcGx5KG9iamVjdCwgdmFsdWVzKTtcblx0XHRzZXQob2JqZWN0LCB0YXJnZXQsIHRhcmdldFZhbHVlLCBzZXRFdmVudE9wdGlvbnMpO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWxjL19jcmVhdGVjYWxjaGFuZGxlci5qc1xuICoqLyIsIi8vIGdldHMgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpbiBuZXN0ZWQgb2JqZWN0XG4vLyBwYXRoIGV4YW1wbGU6IGEuYi5jLmRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZXBGaW5kKG9iaiwgcGF0aCkge1xuXHR2YXIgcGF0aHMgPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoLFxuXHRcdGN1cnJlbnQgPSBvYmosXG5cdFx0aTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyArK2kpIHtcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRbcGF0aHNbaV1dID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50ID0gY3VycmVudFtwYXRoc1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9faGVscGVycy9kZWVwZmluZC5qc1xuICoqLyIsImltcG9ydCBDbGFzcyBmcm9tICdzcmMvY2xhc3MnO1xuXG5kZXNjcmliZSgnQ2xhc3MgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgaXQoJ2FsbG93cyB0byBpbmhlcml0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBBID0gQ2xhc3MoeyBhOiB0cnVlIH0pLFxuICAgICAgICAgICAgQiA9IENsYXNzKHsgYjogdHJ1ZSwgZXh0ZW5kczogQSB9KSxcbiAgICAgICAgICAgIEMgPSBDbGFzcyh7IGM6IHRydWUsIGV4dGVuZHM6IEIgfSksXG4gICAgICAgICAgICBpbnN0ID0gbmV3IEM7XG5cbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEMpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICBleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0LmIpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QuYykudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgQSA9IENsYXNzKHt9LCB7IHN0YXRpY1Byb3A6IHRydWUgfSk7XG4gICAgICAgIGV4cGVjdChBLnN0YXRpY1Byb3ApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnN0ID0gbmV3IENsYXNzKHsgYTogdHJ1ZSB9KTtcbiAgICAgICAgZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGFzcyhwcm90b3R5cGUsIHN0YXRpY1Byb3BzKSB7XG4gICAgY29uc3QgQ29uc3RydWN0b3IgPSBwcm90b3R5cGUuY29uc3RydWN0b3IgIT09IE9iamVjdFxuICAgICAgICAgICAgPyBwcm90b3R5cGUuY29uc3RydWN0b3JcbiAgICAgICAgICAgIDogZnVuY3Rpb24gRW1wdHlDb25zdHJ1Y3RvcigpIHt9LFxuICAgICAgICAvL2V4dGVuZHMgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICBQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuICAgICAgICAvL2luaGVyaXQgcHJvdG8gZnJvbSBjbGFzcyBwYXJlbnQgb3IgZW1wdHkgb2JqZWN0XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQgPyBQYXJlbnQucHJvdG90eXBlIDoge30pO1xuXG4gICAgZXh0ZW5kKHByb3RvLCBwcm90b3R5cGUpO1xuXG4gICAgaWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZXh0ZW5kKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgfVxuXG4gICAgLy8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICBwcm90by5pbnN0YW5jZU9mID0gZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcjtcbiAgICB9O1xuXG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDbGFzcykge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7fSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgeTogbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICAgICAgYToge31cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LnkuYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vaGVscGVycy9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChiYXNpYyknLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjdHggPSB7fTtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcbiAgICAgICAgY29uc3QgYiA9IG9iai5hLmI7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShiLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICB0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGMgPSBvYmouYS5jO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKGMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICBvYmouYS5iLmMgPSA1NTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgY29ycmVjdCBjb250ZXh0IGZvciBkZWxlZ2F0ZWQgZXZlbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBsZXQgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZnVuY3Rpb24gaGFuZGxlKCkge1xuICAgICAgICAgICAgYm9vbCA9IHRoaXMgPT09IGN0eDtcbiAgICAgICAgfSwgY3R4KTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9vbi9fZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9vZmYvX3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL29mZi9fcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vaGVscGVycy9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vaGVscGVycy9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQ2hhbmdlIGV2ZW50IChzaW1wbGUgYW5kIGRlbGVnYXRlZCknLCAoKSA9PiB7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIG9iai5hLmIgPSBudWxsO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICdzcmMvdHJpZ2dlci9fdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2hlbHBlcnMvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0V2ZW50cyBjb3JlOiBhZGRMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXIsIHRyaWdnZXJPbmUnLCAoKSA9PiB7XG4gICAgbGV0IG9iajtcbiAgICBsZXQgY3R4O1xuICAgIGxldCBoYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBjdHggPSB7fTtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMCkpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTEpKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUyKSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvRXF1YWwoMTExKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBhcmdzKScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgbmFtZScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1xuICoqLyIsImltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2hlbHBlcnMvc2ltdWxhdGVjbGljayc7XG5pbXBvcnQgYWRkRG9tTGlzdGVuZXIgZnJvbSAnc3JjL29uL19hZGRkb21saXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlRG9tTGlzdGVuZXIgZnJvbSAnc3JjL29mZi9fcmVtb3ZlZG9tbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJET01FdmVudCBmcm9tICdzcmMvdHJpZ2dlci9fdHJpZ2dlcmRvbWV2ZW50JztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKFwiRXZlbnRzIGNvcmU6IGFkZERvbUxpc3RlbmVyLCByZW1vdmVEb21MaXN0ZW5lciwgdHJpZ2dlckRPTUxpc3RlbmVyXCIsICgpID0+IHtcbiAgICBsZXQgbm9kZTtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBoYW5kbGVyO1xuICAgIGxldCBjaGlsZE5vZGU7XG4gICAgbGV0IGdyYW5kY2hpbGROb2RlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIG5vZGUgPSB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICApO1xuXG4gICAgICAgIG5vZGUuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBpZD1cImNoaWxkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcblxuICAgICAgICBjaGlsZE5vZGUgPSBub2RlLnF1ZXJ5U2VsZWN0b3IoJyNjaGlsZCcpO1xuICAgICAgICBncmFuZGNoaWxkTm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcbiAgICB9KTtcblxuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsICcjY2hpbGQnKVxuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGROb2RlKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlRG9tTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkTm9kZSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpXG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmdyYW5kY2hpbGQnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkTm9kZSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSBhbmQgcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpXG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmdyYW5kY2hpbGQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlRG9tTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGROb2RlKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSB0aGVuIGJpbmRzIHRoZW4gcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZURvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkTm9kZSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgoZDEsIGQyKSA9PiBleHBlY3QoZDEgKyBkMikudG9FcXVhbCgzKSk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJyk7XG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlckRPTUV2ZW50KG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBbMSwgMl0pO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgoZDEsIGQyKSA9PiBleHBlY3QoZDEgKyBkMikudG9FcXVhbCgzKSk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJyk7XG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmdyYW5kY2hpbGQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlckRPTUV2ZW50KG9iaiwgJ3gnLCAnY2xpY2snLCAnLmdyYW5kY2hpbGQnLCBbMSwgMl0pO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvciAoYnViYmxpbmcgdGVzdCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKGQxLCBkMikgPT4gZXhwZWN0KGQxICsgZDIpLnRvRXF1YWwoMykpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJET01FdmVudChvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgWzEsIDJdKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsICcjY2hpbGQnKTtcbiAgICAgICAgYWRkRG9tTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZ3JhbmRjaGlsZCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIHJlbW92ZURvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmdyYW5kY2hpbGQnKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkTm9kZSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkIGFuZCBkb2VzblxcJ3QgcmVtb3ZlIGV2ZW50cyBmcm9tIG90aGVyIG5vZGVzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZURvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmJsYWgnKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkTm9kZSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJztcbmltcG9ydCBjcmVhdGVEb21FdmVudEhhbmRsZXIgZnJvbSAnLi9fY3JlYXRlZG9tZXZlbnRoYW5kbGVyJztcblxuLy8gcmV0dXJucyBhbiBvYmplY3QgZm9yIGJpbmQgYW5kIHVuYmluZCBldmVudHNcbmZ1bmN0aW9uIGNyZWF0ZUJpbmRpbmdIYW5kbGVycyh7XG4gICAgZnVsbEV2ZW50TmFtZSxcbiAgICBkb21FdmVudEhhbmRsZXIsXG4gICAgc2VsZWN0b3Jcbn0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBiaW5kSGFuZGxlcihldnQpIHtcbiAgICAgICAgICAgIGlmKGV2dCAmJiBldnQubm9kZSkge1xuICAgICAgICAgICAgICAgIGRvbS4kKGV2dC5ub2RlKS5vbihmdWxsRXZlbnROYW1lLCBzZWxlY3RvciwgZG9tRXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICBcdH0sXG4gICAgICAgIHVuYmluZEhhbmRsZXIoZXZ0KSB7XG4gICAgICAgICAgICBpZihldnQgJiYgZXZ0Lm5vZGUpIHtcbiAgICAgICAgICAgICAgICBkb20uJChldnQubm9kZSkub2ZmKGZ1bGxFdmVudE5hbWUsIHNlbGVjdG9yLCBkb21FdmVudEhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgIFx0fVxuICAgIH1cblxufVxuXG4vLyBhZGRzIERPTSBldmVudCBsaXN0ZW5lciBmb3Igbm9kZXMgYm91bmQgdG8gZ2l2ZW4gcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZERvbUxpc3RlbmVyKG9iamVjdCwga2V5LCBldmVudE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbykge1xuICAgIGNvbnN0IGRlZiA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGNvbnN0IGRvbUV2ZW50SGFuZGxlciA9IGNyZWF0ZURvbUV2ZW50SGFuZGxlcih7XG4gICAgICAgIGtleSxcbiAgICAgICAgb2JqZWN0LFxuICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgY29udGV4dFxuICAgIH0pO1xuXG4gICAgLy8gbWFraW5nIHBvc3NpYmxlIHRvIHJlbW92ZSB0aGlzIGV2ZW50IGxpc3RlbmVyXG4gICAgZG9tRXZlbnRIYW5kbGVyLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgY29uc3QgZXZlbnROYW1lc3BhY2UgPSBkZWYuaWQgKyBrZXk7XG4gICAgY29uc3QgZnVsbEV2ZW50TmFtZSA9IGAke2V2ZW50TmFtZX0uJHtldmVudE5hbWVzcGFjZX1gO1xuXHRjb25zdCB7IGJpbmRIYW5kbGVyLCB1bmJpbmRIYW5kbGVyIH0gPSBjcmVhdGVCaW5kaW5nSGFuZGxlcnMoe1xuICAgICAgICBmdWxsRXZlbnROYW1lLFxuICAgICAgICBkb21FdmVudEhhbmRsZXIsXG4gICAgICAgIHNlbGVjdG9yXG4gICAgfSk7XG4gICAgY29uc3QgYWRkQmluZExpc3RlbmVyUmVzdWx0ID0gYWRkTGlzdGVuZXIob2JqZWN0LCBgYmluZDoke2tleX1gLCBiaW5kSGFuZGxlciwgY29udGV4dCwgaW5mbyk7XG4gICAgY29uc3QgYWRkVW5iaW5kTGlzdGVuZXJSZXN1bHQgPSBhZGRMaXN0ZW5lcihvYmplY3QsIGB1bmJpbmQ6JHtrZXl9YCwgdW5iaW5kSGFuZGxlciwgY29udGV4dCwgaW5mbyk7XG5cbiAgICAvLyBpZiBldmVudHMgYXJlIGFkZGVkIHN1Y2Nlc3NmdWxseSB0aGVuIHJ1biBiaW5kSGFuZGxlciBmb3IgZXZlcnkgbm9kZSBpbW1lZGlhdGVseVxuICAgIGlmKGFkZEJpbmRMaXN0ZW5lclJlc3VsdCAmJiBhZGRVbmJpbmRMaXN0ZW5lclJlc3VsdCkge1xuICAgICAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoeyBub2RlIH0pID0+IGJpbmRIYW5kbGVyKHsgbm9kZSB9KSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi9fYWRkZG9tbGlzdGVuZXIuanNcbiAqKi8iLCIvLyByZXR1cm5zIERPTSBldmVudCBoYW5kbGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEb21FdmVudEhhbmRsZXIoe1xuICAgIGtleSxcbiAgICBvYmplY3QsXG4gICAgY2FsbGJhY2ssXG4gICAgY29udGV4dFxufSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBkb21FdmVudEhhbmRsZXIoZG9tRXZlbnQpIHtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxFdmVudCA9IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQ7XG5cdFx0Y29uc3QgdHJpZ2dlckFyZ3MgPSBvcmlnaW5hbEV2ZW50Lm1hdHJlc2hrYVRyaWdnZXJBcmdzO1xuICAgICAgICBjb25zdCB7IHdoaWNoLCB0YXJnZXQgfSA9IGRvbUV2ZW50O1xuXG4gICAgICAgIGlmKHRyaWdnZXJBcmdzKSB7XG4gICAgICAgICAgICAvLyBpZiBhcmdzIGFyZSBwYXNzZWQgdG8gdHJpZ2dlciBtZXRob2QgdGhlbiBwYXNzIHRoZW0gdG8gYW4gZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoY29udGV4dCwgdHJpZ2dlckFyZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdXNlIHRoZSBmb2xsb3dpbmcgb2JqZWN0IGFzIGFuIGFyZyBmb3IgZXZlbnQgaGFuZGxlclxuICAgICAgICAgICAgY2FsbGJhY2suY2FsbChjb250ZXh0LCB7XG4gICAgICAgICAgICAgICAgc2VsZjogb2JqZWN0LFxuXHRcdFx0XHRub2RlOiB0aGlzLFxuICAgICAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiAoKSA9PiBkb21FdmVudC5wcmV2ZW50RGVmYXVsdCgpLFxuXHRcdFx0XHRzdG9wUHJvcGFnYXRpb246ICgpID0+IGRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLFxuXHRcdFx0XHRrZXksXG5cdFx0XHRcdGRvbUV2ZW50LFxuXHRcdFx0XHRvcmlnaW5hbEV2ZW50LFxuXHRcdFx0XHR3aGljaCxcblx0XHRcdFx0dGFyZ2V0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2NyZWF0ZWRvbWV2ZW50aGFuZGxlci5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vX3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSc7XG5cbi8vIHJlbW92ZXMgZG9tIGxpc3RlbmVyIGZyb20gbm9kZXMgYm91bmQgdG8gZ2l2ZW4ga2V5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVEb21MaXN0ZW5lcihvYmplY3QsIGtleSwgZXZlbnROYW1lLCBzZWxlY3RvciwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZjtcbiAgICBjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuICAgIGlmKCFwcm9wRGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgIGlmKGJpbmRpbmdzKSB7XG4gICAgICAgIC8vIGNvbGxlY3QgYm91bmQgbm9kZXMgYW5kIHJlbW92ZSBET00gZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBBcnJheShiaW5kaW5ncy5sZW5ndGgpO1xuICAgICAgICBjb25zdCBldmVudE5hbWVzcGFjZSA9IGRlZi5pZCArIGtleTtcblxuICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsIChiaW5kaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbm9kZXNbaW5kZXhdID0gYmluZGluZy5ub2RlO1xuICAgICAgICB9KTtcblxuICAgICAgICBkb20uJChub2Rlcykub2ZmKGAke2V2ZW50TmFtZX0uJHtldmVudE5hbWVzcGFjZX1gLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBiaW5kIGFuZCB1bmJpbmQgbGlzdGVuZXJzIGZyb20gZ2l2ZW4ga2V5XG4gICAgcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBgYmluZDoke2tleX1gLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBgdW5iaW5kOiR7a2V5fWAsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vZmYvX3JlbW92ZWRvbWxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IHRyaWdnZXJPbmVET01FdmVudCBmcm9tICcuL190cmlnZ2Vyb25lZG9tZXZlbnQnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbi8vIHRyaWdnZXJzIERPTSBldmVudCBvbiBib3VuZCBub2Rlc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlckRPTUV2ZW50KG9iamVjdCwga2V5LCBldmVudE5hbWUsIHNlbGVjdG9yLCB0cmlnZ2VyQXJncykge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICBpZighZGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcyB9ID0gZGVmO1xuICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG4gICAgaWYoIXByb3BEZWYpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG4gICAgaWYoIWJpbmRpbmdzKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoeyBub2RlIH0pID0+IHtcblxuICAgICAgICBpZihzZWxlY3Rvcikge1xuICAgICAgICAgICAgLy8gaWYgc2VsZWN0b3IgaXMgZ2l2ZW4gdHJpZ2dlciBhbiBldmVudCBvbiBhbGwgbm9kZSBkZXNjZW5kYW50c1xuICAgICAgICAgICAgY29uc3QgZGVzY2VuZGFudHMgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGRlc2NlbmRhbnRzLCBkZXNjZW5kYW50ID0+IHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyT25lRE9NRXZlbnQoe1xuICAgICAgICAgICAgICAgICAgICBub2RlOiBkZXNjZW5kYW50LFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJBcmdzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXIgYW4gZXZlbnQgZm9yIHNpbmdsZSBub2RlXG4gICAgICAgICAgICB0cmlnZ2VyT25lRE9NRXZlbnQoe1xuICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgIHRyaWdnZXJBcmdzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cdHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90cmlnZ2VyL190cmlnZ2VyZG9tZXZlbnQuanNcbiAqKi8iLCIvLyB0cmlnZ2VycyBnaXZlbiBET00gZXZlbnQgb24gZ2l2ZW4gbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlck9uZURPTUV2ZW50KHtcbiAgICBub2RlLFxuICAgIGV2ZW50TmFtZSxcbiAgICB0cmlnZ2VyQXJnc1xufSkge1xuICAgIGNvbnN0IHsgZG9jdW1lbnQsIEV2ZW50IH0gPSB3aW5kb3c7XG4gICAgbGV0IGV2ZW50O1xuXG4gICAgLy8gcG9seWZpbGwgZm9yIG9sZGVyIGJyb3dzZXJzXG5cdGlmKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG5cdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHRldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXHRcdGV2ZW50LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIHRydWUpO1xuXHR9IGVsc2UgaWYodHlwZW9mIEV2ZW50ICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0ZXZlbnQgPSBuZXcgRXZlbnQoZXZlbnROYW1lLCB7XG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0Y2FuY2VsYWJsZTogdHJ1ZVxuXHRcdH0pO1xuXHR9XG5cbiAgICAvLyBtYXRyZXNoa2FUcmlnZ2VyQXJncyB3aWxsIGJlIHVzZWQgaW4gYSBoYW5kbGVyIGNyZWF0ZWQgYnkgYWRkRE9NTGlzdGVuZXJcbiAgICBldmVudC5tYXRyZXNoa2FUcmlnZ2VyQXJncyA9IHRyaWdnZXJBcmdzO1xuXG4gICAgbm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RyaWdnZXIvX3RyaWdnZXJvbmVkb21ldmVudC5qc1xuICoqLyIsImltcG9ydCBvbiBmcm9tICdzcmMvb24nO1xuaW1wb3J0IG9uY2UgZnJvbSAnc3JjL29uY2UnO1xuaW1wb3J0IG9uRGVib3VuY2UgZnJvbSAnc3JjL29uZGVib3VuY2UnO1xuaW1wb3J0IG9mZiBmcm9tICdzcmMvb2ZmJztcbmltcG9ydCB0cmlnZ2VyIGZyb20gJ3NyYy90cmlnZ2VyJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZXNweSc7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9oZWxwZXJzL21ha2VvYmplY3QnO1xuaW1wb3J0IHNpbXVsYXRlQ2xpY2sgZnJvbSAnLi4vLi4vaGVscGVycy9zaW11bGF0ZWNsaWNrJztcblxuZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb25jZSwgb25EZWJvdW5jZSwgb2ZmLCB0cmlnZ2VyKScsICgpID0+IHtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG4gICAgbGV0IG5vZGU7XG4gICAgbGV0IGNoaWxkTm9kZTtcbiAgICBsZXQgZ3JhbmRjaGlsZE5vZGU7XG5cblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgY3R4ID0ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgbm9kZSA9IHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICk7XG5cbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGlkPVwiY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuXG4gICAgICAgIGNoaWxkTm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignI2NoaWxkJyk7XG4gICAgICAgIGdyYW5kY2hpbGROb2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcycsICgpID0+IHtcbiAgICAgICAgb24ob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgb24gYW4gb2JqZWN0IHdoaWNoIGhhcyBpc01LPXRydWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHsgaXNNSzogdHJ1ZSB9O1xuICAgICAgICBvbihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuICAgICAgICBvbihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYW4gb2JqZWN0IHdoaWNoIGhhcyBpc01LPXRydWUgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHsgaXNNSzogdHJ1ZSB9O1xuICAgICAgICBvbihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgb24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgb24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9mZihvYmosICdhLmIuY0Bzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgRE9NIGV2ZW50IChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJylcbiAgICAgICAgb24ob2JqLCAnY2xpY2s6OngnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZE5vZGUpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgRE9NIGV2ZW50IChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIG9uKG9iaiwgJ2NsaWNrOjp4JywgaGFuZGxlcik7XG4gICAgICAgIG9mZihvYmosICdjbGljazo6eCcpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkTm9kZSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIERPTSBldmVudCAodXNlcyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJyk7XG4gICAgICAgIG9uKG9iaiwgJ2NsaWNrOjp4KC5ncmFuZGNoaWxkKScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGROb2RlKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgIG9uY2Uob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuICAgIHhpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBtYWdpYy5vbmNlKG9iaiwge1xuICAgICAgICAgICAgZm9vOiBmMSxcbiAgICAgICAgICAgIGJhcjogZjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoaikudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIHhpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgbWsub25jZSgnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdvbkRlYm91bmNlIHdvcmtzJywgZG9uZSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgb25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICB9KTtcblxuICAgIHhpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBmMSA9IGV2dCA9PiBpKyssXG4gICAgICAgICAgICBmMiA9IGV2dCA9PiBqKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgODAwKTtcblxuICAgICAgICBtay5vbkRlYm91bmNlKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvblwiIGFuZCBcIm9mZlwiJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVycyA9IHtcbiAgICAgICAgICAgIGZvbzogY3JlYXRlU3B5KCksXG4gICAgICAgICAgICBiYXI6IGNyZWF0ZVNweSgpXG4gICAgICAgIH07XG5cbiAgICAgICAgb24ob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgdHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgdHJpZ2dlcihvYmosICdiYXInKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcnMuZm9vKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVycy5iYXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcblxuICAgICAgICBvZmYob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgdHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgdHJpZ2dlcihvYmosICdiYXInKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcnMuZm9vKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVycy5iYXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGhpc0FyZyA9IHt9O1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gY3JlYXRlU3B5KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9uKG9iaiwgJ2ZvbycsIGhhbmRsZXIsIHRydWUsIHRoaXNBcmcpO1xuICAgICAgICBvbihvYmosICdiYXInLCBoYW5kbGVyLCB0aGlzQXJnLCB0cnVlKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygyKTtcbiAgICB9KTtcblxuICAgIHhpdCgndHJpZ2dlcnMgZXZlbnQgdmlhIFwidHJpZ2dlclwiIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnLCAxLCAyKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1xuICoqLyIsImltcG9ydCBzcGxpdEJ5U3BhY2VSZWcgZnJvbSAnLi9fc3BsaXRieXNwYWNlcmVnZXhwJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi4vX2hlbHBlcnMvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBtYXRyZXNoa2FFcnJvciBmcm9tICcuLi9faGVscGVycy9tYXRyZXNoa2FlcnJvcic7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi9fZGVsZWdhdGVsaXN0ZW5lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKG9iamVjdCwgbmFtZXMsIGNhbGxiYWNrLCB0cmlnZ2VyT25Jbml0LCBjb250ZXh0KSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgY29udGV4dCA9IHRyaWdnZXJPbkluaXQ7XG4gICAgICAgIHRyaWdnZXJPbkluaXQgPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2sgPSBuYW1lcztcbiAgICAgICAgbmFtZXMgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnb24nKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc05hbWVzVmFyQXJyYXkgPSBuYW1lcyBpbnN0YW5jZW9mIEFycmF5O1xuXG4gICAgaWYgKG5hbWVzICYmIHR5cGVvZiBuYW1lcyA9PT0gJ29iamVjdCcgJiYgIWlzTmFtZXNWYXJBcnJheSkge1xuICAgICAgICBub2ZuLmZvck93bihuYW1lcywgKG5hbWVzT2JqQ2FsbGJhY2ssIG5hbWVzT2JqTmFtZSkgPT5cbiAgICAgICAgICAgIG9uKG9iamVjdCwgbmFtZXNPYmpOYW1lLCBuYW1lc09iakNhbGxiYWNrLCBjYWxsYmFjaywgdHJpZ2dlck9uSW5pdCkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiBuYW1lcyAhPT0gJ3N0cmluZycgJiYgIWlzTmFtZXNWYXJBcnJheSkge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignb246bmFtZXNfdHlwZScsIHsgbmFtZXMgfSk7XG4gICAgfVxuXG4gICAgbmFtZXMgPSBpc05hbWVzVmFyQXJyYXkgPyBuYW1lcyA6IG5hbWVzLnNwbGl0KHNwbGl0QnlTcGFjZVJlZyk7IC8vIHNwbGl0IGJ5IHNwYWNlc1xuXG4gICAgaWYgKHR5cGVvZiB0cmlnZ2VyT25Jbml0ICE9PSAnYm9vbGVhbicgJiYgdHlwZW9mIHRyaWdnZXJPbkluaXQgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0W2NvbnRleHQsIHRyaWdnZXJPbkluaXRdID0gW3RyaWdnZXJPbkluaXQsIGNvbnRleHRdO1xuXHR9XG5cbiAgICBub2ZuLmZvckVhY2gobmFtZXMsIG5hbWUgPT4ge1xuICAgICAgICBjb25zdCBkZWxlZ2F0ZWRFdmVudFBhcnRzID0gbmFtZS5zcGxpdCgnQCcpO1xuXG4gICAgICAgIGlmIChkZWxlZ2F0ZWRFdmVudFBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IFtwYXRoLCBkZWxlZ2F0ZWROYW1lXSA9IGRlbGVnYXRlZEV2ZW50UGFydHM7XG4gICAgICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgZGVsZWdhdGVkTmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0cmlnZ2VyT25Jbml0ID09PSB0cnVlKSB7XG5cdFx0Y2FsbGJhY2suY2FsbChjb250ZXh0IHx8IG9iamVjdCwgeyB0cmlnZ2VyT25Jbml0IH0pO1xuXHR9XG5cblx0cmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uL2luZGV4LmpzXG4gKiovIiwiLy8gYWxsb3dzIHRvIHNwbGl0IGJ5IHNwYWNlIG5vdCBpbmNsdXNpbmcgdGhpbmdzIGluc2lkZSBvZiBicmFja2Vyc1xuZXhwb3J0IGRlZmF1bHQgL1xccysoPyFbXihdKlxcKSkvZztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uL19zcGxpdGJ5c3BhY2VyZWdleHAuanNcbiAqKi8iLCJpbXBvcnQgc3BsaXRCeVNwYWNlUmVnIGZyb20gJy4uL29uL19zcGxpdGJ5c3BhY2VyZWdleHAnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9faGVscGVycy9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9fcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL191bmRlbGVnYXRlbGlzdGVuZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYob2JqZWN0LCBuYW1lcywgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBjb250ZXh0ID0gY2FsbGJhY2s7XG4gICAgICAgIGNhbGxiYWNrID0gbmFtZXM7XG4gICAgICAgIG5hbWVzID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ29mZicpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTmFtZXNWYXJBcnJheSA9IG5hbWVzIGluc3RhbmNlb2YgQXJyYXk7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIFRPRE86IE5hbWUtaGFuZGxlciBvYmplY3QgcGFzc2VkIHRvIG9mZiBtZXRob2QgaXMgbm9uLWRvY3VtZW50ZWQgZmVhdHVyZVxuICAgIGlmIChuYW1lcyAmJiB0eXBlb2YgbmFtZXMgPT09ICdvYmplY3QnICYmICFpc05hbWVzVmFyQXJyYXkpIHtcbiAgICAgICAgbm9mbi5mb3JPd24obmFtZXMsIChuYW1lc09iakNhbGxiYWNrLCBuYW1lc09iak5hbWUpID0+XG4gICAgICAgICAgICBvZmYob2JqZWN0LCBuYW1lc09iak5hbWUsIG5hbWVzT2JqQ2FsbGJhY2ssIGNhbGxiYWNrKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgaWYgKCFuYW1lcyAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcblx0XHRkZWYuZXZlbnRzID0ge307XG5cdFx0cmV0dXJuIG9iamVjdDtcblx0fVxuXG4gICAgLy8gVE9ETzogQXJyYXkgb2YgbmFtZXMgcGFzc2VkIHRvIG9mZiBtZXRob2QgaXMgbm9uLWRvY3VtZW50ZWQgZmVhdHVyZVxuICAgIG5hbWVzID0gaXNOYW1lc1ZhckFycmF5ID8gbmFtZXMgOiBuYW1lcy5zcGxpdChzcGxpdEJ5U3BhY2VSZWcpOyAvLyBzcGxpdCBieSBzcGFjZXNcblxuICAgIG5vZm4uZm9yRWFjaChuYW1lcywgbmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGRlbGVnYXRlZEV2ZW50UGFydHMgPSBuYW1lLnNwbGl0KCdAJyk7XG4gICAgICAgIGlmIChkZWxlZ2F0ZWRFdmVudFBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IFtwYXRoLCBkZWxlZ2F0ZWROYW1lXSA9IGRlbGVnYXRlZEV2ZW50UGFydHM7XG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBkZWxlZ2F0ZWROYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29mZi9pbmRleC5qc1xuICoqLyIsImltcG9ydCBkb21FdmVudFJlZyBmcm9tICcuLi9vbi9fZG9tZXZlbnRyZWdleHAnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9faGVscGVycy9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IG1hdHJlc2hrYUVycm9yIGZyb20gJy4uL19oZWxwZXJzL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBzcGxpdEJ5U3BhY2VSZWcgZnJvbSAnLi4vb24vX3NwbGl0YnlzcGFjZXJlZ2V4cCc7XG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX3RyaWdnZXJvbmUnO1xuaW1wb3J0IHRyaWdnZXJEb21FdmVudCBmcm9tICcuL190cmlnZ2VyZG9tZXZlbnQnO1xuXG4vLyB0cmlnZ2VycyBldmVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlciguLi5hcmdzKSB7XG4gICAgbGV0IG9iamVjdDtcbiAgICBsZXQgZ2l2ZW5OYW1lcztcbiAgICBsZXQgdHJpZ2dlckFyZ3M7XG5cbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBbZ2l2ZW5OYW1lcywgLi4udHJpZ2dlckFyZ3NdID0gYXJncztcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICBbb2JqZWN0LCBnaXZlbk5hbWVzLCAuLi50cmlnZ2VyQXJnc10gPSBhcmdzO1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICd0cmlnZ2VyJyk7XG4gICAgfVxuICAgIGxldCBuYW1lcztcblxuICAgIGlmKHR5cGVvZiBnaXZlbk5hbWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYW1lcyA9IGdpdmVuTmFtZXMuc3BsaXQoc3BsaXRCeVNwYWNlUmVnKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG1hdHJlc2hrYUVycm9yKCd0cmlnZ2VyOm5hbWVzX3R5cGUnLCB7XG4gICAgICAgICAgICBuYW1lczogZ2l2ZW5OYW1lc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cbiAgICBpZighYWxsRXZlbnRzKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgbm9mbi5mb3JFYWNoKG5hbWVzLCBuYW1lID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgICAgICBjb25zdCBkb21FdnRFeGVjUmVzdWx0ID0gZG9tRXZlbnRSZWcuZXhlYyhuYW1lKTtcblxuICAgICAgICBpZihkb21FdnRFeGVjUmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBbLCBldmVudE5hbWUsIGtleT0nc2FuZGJveCcsIHNlbGVjdG9yXSA9IGRvbUV2dEV4ZWNSZXN1bHQ7XG4gICAgICAgICAgICB0cmlnZ2VyRG9tRXZlbnQob2JqZWN0LCBrZXksIGV2ZW50TmFtZSwgc2VsZWN0b3IsIHRyaWdnZXJBcmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RyaWdnZXIvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgYWRkVHJlZUxpc3RuZXIgZnJvbSAnc3JjL29uL19hZGR0cmVlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZVRyZWVMaXN0bmVyIGZyb20gJ3NyYy9vZmYvX3JlbW92ZXRyZWVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9oZWxwZXJzL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9oZWxwZXJzL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdUcmVlIGNoYW5nZSBldmVudHMnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBsaXN0ZW4gdHJlZSBhbmQgc2hvdWxkIHJlbW92ZSBsaXN0ZW5lcnMgZnJvbSBwcmV2aW91cyBzdWJ0cmVlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYy5kLmUnKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBhZGRUcmVlTGlzdG5lcihvYmosICdhLmIuYy5kLmUnLCBoYW5kbGVyKTtcblxuICAgICAgICBjb25zdCBlID0gb2JqLmEuYi5jLmQuZTtcbiAgICAgICAgb2JqLmEuYi5jLmQuZSA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuXG4gICAgICAgIC8vIG9uY2UgYWdhaW5cbiAgICAgICAgb2JqLmEuYi5jLmQuZSA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDIpO1xuXG4gICAgICAgIGNvbnN0IGQgPSBvYmouYS5iLmMuZDtcbiAgICAgICAgb2JqLmEuYi5jLmQgPSBtYWtlT2JqZWN0KCdlJyk7XG4gICAgICAgIGQuZSA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDMpO1xuXG5cbiAgICAgICAgY29uc3QgYyA9IG9iai5hLmIuYztcbiAgICAgICAgb2JqLmEuYi5jID0gbWFrZU9iamVjdCgnZC5lJyk7XG4gICAgICAgIGMuZCA9IG1ha2VPYmplY3QoJ2UnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg0KTtcblxuICAgICAgICBjb25zdCBiID0gb2JqLmEuYjtcbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MuZC5lJyk7XG4gICAgICAgIGIuYyA9IG1ha2VPYmplY3QoJ2QuZScpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDUpO1xuXG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMuZC5lJyk7XG4gICAgICAgIGEuYiA9IG1ha2VPYmplY3QoJ2MuZC5lJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoNik7XG5cbiAgICAgICAgb2JqLmEuYi5jLmQuZSA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDcpO1xuXG4gICAgICAgIG9iai5hLmIuYy5kID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoOCk7XG5cbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoOSk7XG5cbiAgICAgICAgb2JqLmEuYiA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEwKTtcblxuICAgICAgICBvYmouYSA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDExKTtcblxuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTIpO1xuXG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEzKTtcblxuICAgICAgICBvYmouYS5iLmMuZCA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDE0KTtcblxuICAgICAgICBvYmouYS5iLmMuZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgdHJlZSBsaXN0ZW5lciBieSBjYWxsYmFjaycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBhZGRUcmVlTGlzdG5lcihvYmosICdhLmIuYycsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVUcmVlTGlzdG5lcihvYmosICdhLmIuYycsIGhhbmRsZXIpO1xuXG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmVtb3ZlIHRyZWUgbGlzdGVuZXIgd2l0aG91dCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBhZGRUcmVlTGlzdG5lcihvYmosICdhLmIuYycsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVUcmVlTGlzdG5lcihvYmosICdhLmIuYycpO1xuXG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblxuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHJlbW92ZSB0cmVlIGxpc3RlbmVyIGJ5IHdyb25nIGNhbGxiYWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZFRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZVRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJywgKCkgPT4ge30pO1xuXG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuXG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMik7XG5cbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygzKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL3RyZWVfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiAyMSxcblx0XCIuL19jb3JlL2RlZnMuanNcIjogMjAsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDE5LFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiAzMSxcblx0XCIuL19kb20vaW5kZXguanNcIjogMzAsXG5cdFwiLi9faGVscGVycy9jaGVja29iamVjdHR5cGUuanNcIjogMjQsXG5cdFwiLi9faGVscGVycy9kZWJvdW5jZS5qc1wiOiA1OSxcblx0XCIuL19oZWxwZXJzL2RlZXBmaW5kLmpzXCI6IDg1LFxuXHRcIi4vX2hlbHBlcnMvaXMuanNcIjogMjYsXG5cdFwiLi9faGVscGVycy9tYXRyZXNoa2FlcnJvci5qc1wiOiAyNSxcblx0XCIuL19oZWxwZXJzL3RvYXJyYXkuanNcIjogMjksXG5cdFwiLi9hcnJheS5qc1wiOiAxMDUsXG5cdFwiLi9iaW5kZXJzL19jbGFzc2xpc3QuanNcIjogNyxcblx0XCIuL2JpbmRlcnMvYXR0ci5qc1wiOiA5LFxuXHRcIi4vYmluZGVycy9jbGFzc25hbWUuanNcIjogNixcblx0XCIuL2JpbmRlcnMvZGF0YXNldC5qc1wiOiAxNyxcblx0XCIuL2JpbmRlcnMvZGlzcGxheS5qc1wiOiA1LFxuXHRcIi4vYmluZGVycy9odG1sLmpzXCI6IDQsXG5cdFwiLi9iaW5kZXJzL2luZGV4LmpzXCI6IDMsXG5cdFwiLi9iaW5kZXJzL2lucHV0LmpzXCI6IDEwLFxuXHRcIi4vYmluZGVycy9vdXRwdXQuanNcIjogMTEsXG5cdFwiLi9iaW5kZXJzL3Byb2dyZXNzLmpzXCI6IDE0LFxuXHRcIi4vYmluZGVycy9wcm9wLmpzXCI6IDgsXG5cdFwiLi9iaW5kZXJzL3NlbGVjdC5qc1wiOiAxMyxcblx0XCIuL2JpbmRlcnMvc3R5bGUuanNcIjogMTYsXG5cdFwiLi9iaW5kZXJzL3RleHQuanNcIjogMTUsXG5cdFwiLi9iaW5kZXJzL3RleHRhcmVhLmpzXCI6IDEyLFxuXHRcIi4vYmluZG5vZGUvX2JpbmRzaW5nbGVub2RlLmpzXCI6IDUyLFxuXHRcIi4vYmluZG5vZGUvX2NyZWF0ZWJpbmRpbmdzd2l0Y2hlci5qc1wiOiA0Nixcblx0XCIuL2JpbmRub2RlL19jcmVhdGVub2RlaGFuZGxlci5qc1wiOiA1NSxcblx0XCIuL2JpbmRub2RlL19jcmVhdGVvYmplY3RoYW5kbGVyLmpzXCI6IDU2LFxuXHRcIi4vYmluZG5vZGUvX2dldG5vZGVzLmpzXCI6IDI3LFxuXHRcIi4vYmluZG5vZGUvX3NlbGVjdG5vZGVzLmpzXCI6IDI4LFxuXHRcIi4vYmluZG5vZGUvaW5kZXguanNcIjogMTgsXG5cdFwiLi9iaW5kb3B0aW9uYWxub2RlLmpzXCI6IDY0LFxuXHRcIi4vYmluZHNhbmRib3guanNcIjogNjUsXG5cdFwiLi9icXVlcnkvX2RhdGEuanNcIjogNDAsXG5cdFwiLi9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcIjogMzQsXG5cdFwiLi9icXVlcnkvX2luaXQuanNcIjogMzMsXG5cdFwiLi9icXVlcnkvYWRkLmpzXCI6IDQzLFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZS5qc1wiOiAzOCxcblx0XCIuL2JxdWVyeS9maW5kLmpzXCI6IDQ1LFxuXHRcIi4vYnF1ZXJ5L2luZGV4LmpzXCI6IDMyLFxuXHRcIi4vYnF1ZXJ5L2lzLmpzXCI6IDQxLFxuXHRcIi4vYnF1ZXJ5L25vdC5qc1wiOiA0NCxcblx0XCIuL2JxdWVyeS9vZmYuanNcIjogNDIsXG5cdFwiLi9icXVlcnkvb24uanNcIjogMzksXG5cdFwiLi9icXVlcnkvb25lLmpzXCI6IDM3LFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbC5qc1wiOiAzNixcblx0XCIuL2NhbGMvX2FkZHNvdXJjZS5qc1wiOiA4Myxcblx0XCIuL2NhbGMvX2NyZWF0ZWNhbGNoYW5kbGVyLmpzXCI6IDg0LFxuXHRcIi4vY2FsYy9pbmRleC5qc1wiOiA4Mixcblx0XCIuL2NsYXNzLmpzXCI6IDg3LFxuXHRcIi4vZGVmYXVsdGJpbmRlcnMuanNcIjogNTQsXG5cdFwiLi9leHRlbmQuanNcIjogMzUsXG5cdFwiLi9pbmRleC5qc1wiOiAxMDYsXG5cdFwiLi9sb29rZm9yYmluZGVyLmpzXCI6IDUzLFxuXHRcIi4vbWFnaWMuanNcIjogMTA5LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDEwNyxcblx0XCIuL29iamVjdC9pbmRleC5qc1wiOiAxMDgsXG5cdFwiLi9vZmYvX3JlbW92ZWRvbWxpc3RlbmVyLmpzXCI6IDk1LFxuXHRcIi4vb2ZmL19yZW1vdmVsaXN0ZW5lci5qc1wiOiA0OSxcblx0XCIuL29mZi9fcmVtb3ZldHJlZWxpc3RlbmVyLmpzXCI6IDUwLFxuXHRcIi4vb2ZmL191bmRlbGVnYXRlbGlzdGVuZXIuanNcIjogNDgsXG5cdFwiLi9vZmYvaW5kZXguanNcIjogMTAxLFxuXHRcIi4vb24vX2FkZGRvbWxpc3RlbmVyLmpzXCI6IDkzLFxuXHRcIi4vb24vX2FkZGxpc3RlbmVyLmpzXCI6IDU3LFxuXHRcIi4vb24vX2FkZHRyZWVsaXN0ZW5lci5qc1wiOiA2MSxcblx0XCIuL29uL19jcmVhdGVkb21ldmVudGhhbmRsZXIuanNcIjogOTQsXG5cdFwiLi9vbi9fZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA2MCxcblx0XCIuL29uL19kb21ldmVudHJlZ2V4cC5qc1wiOiA1OCxcblx0XCIuL29uL19zcGxpdGJ5c3BhY2VyZWdleHAuanNcIjogMTAwLFxuXHRcIi4vb24vaW5kZXguanNcIjogOTksXG5cdFwiLi9vbmNlLmpzXCI6IDExMSxcblx0XCIuL29uZGVib3VuY2UuanNcIjogMTEyLFxuXHRcIi4vcGFyc2ViaW5kaW5ncy5qc1wiOiAxMTAsXG5cdFwiLi9zZWxlY3QuanNcIjogNjYsXG5cdFwiLi9zZWxlY3RhbGwuanNcIjogNjcsXG5cdFwiLi9zZXQuanNcIjogMjIsXG5cdFwiLi90cmlnZ2VyL190cmlnZ2VyZG9tZXZlbnQuanNcIjogOTYsXG5cdFwiLi90cmlnZ2VyL190cmlnZ2Vyb25lLmpzXCI6IDIzLFxuXHRcIi4vdHJpZ2dlci9fdHJpZ2dlcm9uZWRvbWV2ZW50LmpzXCI6IDk3LFxuXHRcIi4vdHJpZ2dlci9pbmRleC5qc1wiOiAxMDIsXG5cdFwiLi91bmJpbmRub2RlL19yZW1vdmViaW5kaW5nLmpzXCI6IDUxLFxuXHRcIi4vdW5iaW5kbm9kZS9pbmRleC5qc1wiOiA0N1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxMDQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gMTA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXkuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuLy9pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuXG5NYXRyZXNoa2EuQXJyYXkgPSBNYXRyZXNoa2FBcnJheTtcbk1hdHJlc2hrYS5PYmplY3QgPSBNYXRyZXNoa2FPYmplY3Q7XG5NYXRyZXNoa2EuQ2xhc3MgPSBDbGFzcztcbi8vTWF0cmVzaGthLmJpbmRlcnMgPSBiaW5kZXJzO1xuXG5leHBvcnQgZGVmYXVsdCBNYXRyZXNoa2E7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBDbGFzcyBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzKHtcbiAgICAvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuICAgIC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG4gICAgZXh0ZW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hdHJlc2hrYS9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYmplY3QvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFnaWMuanNcbiAqKi8iLCIvL2ltcG9ydCBwYXJzZXJCcmFja2V0cyBmcm9tICcuL19iaW5kaW5ncy9wYXJzZXJicmFja2V0cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2Rlcykge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYXJzZWJpbmRpbmdzLmpzXG4gKiovIiwiaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZSc7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25jZShvYmplY3QsIG5hbWVzLCBnaXZlbkNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgY29udGV4dCA9IGdpdmVuQ2FsbGJhY2s7XG4gICAgICAgIGdpdmVuQ2FsbGJhY2sgPSBuYW1lcztcbiAgICAgICAgbmFtZXMgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnb25jZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTmFtZXNWYXJBcnJheSA9IG5hbWVzIGluc3RhbmNlb2YgQXJyYXk7XG5cbiAgICBpZiAobmFtZXMgJiYgdHlwZW9mIG5hbWVzID09PSAnb2JqZWN0JyAmJiAhaXNOYW1lc1ZhckFycmF5KSB7XG4gICAgICAgIG5vZm4uZm9yT3duKG5hbWVzLCAobmFtZXNPYmpDYWxsYmFjaywgbmFtZXNPYmpOYW1lKSA9PlxuICAgICAgICAgICAgb25jZShvYmplY3QsIG5hbWVzT2JqTmFtZSwgbmFtZXNPYmpDYWxsYmFjaywgZ2l2ZW5DYWxsYmFjaykpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24gb25jZUNhbGxiYWNrKCkge1xuICAgICAgICBnaXZlbkNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIG9mZihvYmplY3QsIG5hbWVzLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrLl9jYWxsYmFjayA9IGdpdmVuQ2FsbGJhY2s7XG5cbiAgICByZXR1cm4gb24ob2JqZWN0LCBuYW1lcywgY2FsbGJhY2ssIGNvbnRleHQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb25jZS5qc1xuICoqLyIsImltcG9ydCBvbiBmcm9tICcuL29uJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9faGVscGVycy9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4vX2hlbHBlcnMvZGVib3VuY2UnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uRGVib3VuY2Uob2JqZWN0LCBuYW1lcywgZ2l2ZW5DYWxsYmFjaywgZ2l2ZW5EZWxheSwgdHJpZ2dlck9uSW5pdCwgY29udGV4dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGNvbnRleHQgPSB0cmlnZ2VyT25Jbml0O1xuICAgICAgICB0cmlnZ2VyT25Jbml0ID0gZGVib3VuY2VEZWxheTtcbiAgICAgICAgZGVib3VuY2VEZWxheSA9IGdpdmVuQ2FsbGJhY2s7XG4gICAgICAgIGdpdmVuQ2FsbGJhY2sgPSBuYW1lcztcbiAgICAgICAgbmFtZXMgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnb25EZWJvdW5jZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTmFtZXNWYXJBcnJheSA9IG5hbWVzIGluc3RhbmNlb2YgQXJyYXk7XG5cbiAgICBpZiAobmFtZXMgJiYgdHlwZW9mIG5hbWVzID09PSAnb2JqZWN0JyAmJiAhaXNOYW1lc1ZhckFycmF5KSB7XG4gICAgICAgIG5vZm4uZm9yT3duKG5hbWVzLCAobmFtZXNPYmpDYWxsYmFjaywgbmFtZXNPYmpOYW1lKSA9PlxuICAgICAgICAgICAgb25EZWJvdW5jZShvYmplY3QsIG5hbWVzT2JqTmFtZSwgbmFtZXNPYmpDYWxsYmFjaywgZ2l2ZW5DYWxsYmFjaywgZGVib3VuY2VEZWxheSwgdHJpZ2dlck9uSW5pdCkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIGdpdmVuRGVsYXkgPT09ICdudW1iZXInID8gZ2l2ZW5EZWxheSA6IDA7XG5cbiAgICBjb25zdCBjYWxsYmFjayA9IGRlYm91bmNlKGdpdmVuQ2FsbGJhY2ssIGRlbGF5KTtcblxuICAgIGNhbGxiYWNrLl9jYWxsYmFjayA9IGdpdmVuQ2FsbGJhY2s7XG5cbiAgICByZXR1cm4gb24ob2JqZWN0LCBuYW1lcywgY2FsbGJhY2ssIHRyaWdnZXJPbkluaXQsIGNvbnRleHQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb25kZWJvdW5jZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=