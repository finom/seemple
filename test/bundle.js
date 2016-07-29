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
	
	var componentsContext = __webpack_require__(94);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/binders_spec.js": 2,
		"./bindings/bindings_parser_spec.js": 57,
		"./bindings/bindings_spec.js": 58,
		"./bindings/default_binders_spec.js": 65,
		"./bquery/add_spec.js": 66,
		"./bquery/create_spec.js": 67,
		"./bquery/events_spec.js": 68,
		"./bquery/find_spec.js": 70,
		"./bquery/init_spec.js": 71,
		"./bquery/is_spec.js": 72,
		"./bquery/not_spec.js": 73,
		"./bquery/one_spec.js": 74,
		"./bquery/parsehtml_spec.js": 75,
		"./calc_spec.js": 76,
		"./class_spec.js": 80,
		"./events/delegated_collection_spec.js": 82,
		"./events/delegated_spec.js": 83,
		"./events/events_change_spec.js": 84,
		"./events/events_core_spec.js": 85,
		"./events/events_dom_spec.js": 86,
		"./events/events_summary_spec.js": 92,
		"./events/tree_change_spec.js": 93
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
	
	var getNodes = __webpack_require__(25);
	
	var createBindingSwitcher = __webpack_require__(43);
	
	var bindSingleNode = __webpack_require__(49);
	
	var checkObjectType = __webpack_require__(95);
	
	var MatreshkaError = __webpack_require__(96);
	
	var delegateListener = __webpack_require__(55);
	
	var addListener = __webpack_require__(54);
	
	var removeListener = __webpack_require__(46);
	
	var triggerOne = __webpack_require__(23);
	
	var unbindNode = __webpack_require__(44);
	
	var addTreeListener = __webpack_require__(56);
	
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
	
	var checkObjectType = __webpack_require__(95);
	
	var is = __webpack_require__(24);
	
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
/***/ function(module, exports) {

	"use strict";
	
	/* eslint-disable no-self-compare, no-confusing-arrow */
	// determines whether two values are the same value
	var isPolyfill = function (v1, v2) {
	    return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
	};
	
	module.exports = Object.is || isPolyfill;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(26);
	
	var dom = __webpack_require__(27);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var toArray = __webpack_require__(99);
	
	var dom = __webpack_require__(27);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(28);
	
	var dom = {
	    $: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(29);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(30);
	
	var extend = __webpack_require__(32);
	
	var parseHTML = __webpack_require__(33);
	
	var one = __webpack_require__(34);
	
	var create = __webpack_require__(35);
	
	var on = __webpack_require__(36);
	
	var off = __webpack_require__(39);
	
	var is = __webpack_require__(38);
	
	var add = __webpack_require__(40);
	
	var not = __webpack_require__(41);
	
	var find = __webpack_require__(42);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(31);
	
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
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(31);
	
	var Init = __webpack_require__(30);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
	    return new Init(html2nodeList(html));
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(30);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
	    return new Init(s, context)[0];
	}

/***/ },
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(37);
	
	var is = __webpack_require__(38);
	
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
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
	    nodeIndex: 0,
	    allEvents: {}
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
	    var node = this[0];
	    return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(37);
	
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(30);
	
	var data = __webpack_require__(37);
	
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(30);
	
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(30);
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var unbindNode = __webpack_require__(44);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(95);
	
	var defs = __webpack_require__(20);
	
	var getNodes = __webpack_require__(25);
	
	var bindNode = __webpack_require__(18);
	
	var undelegateListener = __webpack_require__(45);
	
	var removeTreeListener = __webpack_require__(47);
	
	var removeBinding = __webpack_require__(48);
	
	var dom = __webpack_require__(27);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var removeListener = __webpack_require__(46);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var triggerOne = __webpack_require__(23);
	
	// removes simple event listener to an object
	/* eslint no-shadow: ["error", { "allow": ["name", "events"] }]*/
	module.exports = removeListener;
	function removeListener(object, name, callback, context) {
	    var info = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
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
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var undelegateListener = __webpack_require__(45);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var removeListener = __webpack_require__(46);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(50);
	
	var createNodeHandler = __webpack_require__(52);
	
	var createObjectHandler = __webpack_require__(53);
	
	var triggerOne = __webpack_require__(23);
	
	var addListener = __webpack_require__(54);
	
	var debounce = __webpack_require__(97);
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(51);
	
	module.exports = function (node) {
	    var result = void 0;
	
	    for (var i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(24);
	
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
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var triggerOne = __webpack_require__(23);
	
	var defineProp = __webpack_require__(21);
	
	// property modifier event regexp
	var propModEventReg = /^_change:deps:|^_change:bindings:|^_change:delegated:|^_change:tree:|^change:|^beforechange:/;
	
	//dom event reg  /([^\:\:]+)(::([^\(\)]+)?(\((.*)\))?)?/;
	
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
	    var _info$skipChecks = info.skipChecks;
	    var skipChecks = _info$skipChecks === undefined ? false : _info$skipChecks;
	
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(54);
	
	var undelegateListener = __webpack_require__(45);
	
	var triggerOne = __webpack_require__(23);
	
	var defs = __webpack_require__(20);
	
	var is = __webpack_require__(24);
	
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(55);
	
	var removeTreeListener = __webpack_require__(47);
	
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
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	var bindOptionalNode = __webpack_require__(59);
	
	var bindSandbox = __webpack_require__(60);
	
	var unbindNode = __webpack_require__(44);
	
	var select = __webpack_require__(61);
	
	var selectAll = __webpack_require__(62);
	
	var addListener = __webpack_require__(54);
	
	var makeObject = __webpack_require__(63);
	
	var createSpy = __webpack_require__(64);
	
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
/* 59 */
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	var unbindNode = __webpack_require__(44);
	
	var checkObjectType = __webpack_require__(95);
	
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var dom = __webpack_require__(27);
	
	var selectNodes = __webpack_require__(26);
	
	var toArray = __webpack_require__(99);
	
	var checkObjectType = __webpack_require__(95);
	
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var dom = __webpack_require__(27);
	
	var selectNodes = __webpack_require__(26);
	
	var toArray = __webpack_require__(99);
	
	var checkObjectType = __webpack_require__(95);
	
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
/* 63 */
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
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _srcBinders = __webpack_require__(3);
	
	var textarea = _srcBinders.textarea;
	var input = _srcBinders.input;
	var select = _srcBinders.select;
	var output = _srcBinders.output;
	var progress = _srcBinders.progress;
	
	var lookForBinder = __webpack_require__(50);
	
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-unresolved */
	
	
	var $ = __webpack_require__(29);
	
	var simulateClick = __webpack_require__(69);
	
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
/* 69 */
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
	describe('bQuery.fn.not', function () {
	    it('checks className', function () {
	        var el = document.createElement('div');
	        el.className = 'el';
	
	        expect($(el).is('.el')).toEqual(true);
	
	        expect($(el).is('.el2')).toEqual(false);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
	describe('bQuery.one', function () {
	    it('finds', function () {
	        var testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n        <div class="child">\n            <div class="grandchild"></div>\n        </div>\n        <div class="child2">\n            <div class="grandchild2"></div>\n        </div>\n        ';
	
	        var child = testSandbox.querySelector('.child');
	
	        expect($.one('*', testSandbox)).toEqual(child);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(29);
	
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var calc = __webpack_require__(77);
	
	var addListener = __webpack_require__(54);
	
	var makeObject = __webpack_require__(63);
	
	var createSpy = __webpack_require__(64);
	
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var checkObjectType = __webpack_require__(95);
	
	var matreshkaError = __webpack_require__(96);
	
	var addListener = __webpack_require__(54);
	
	var delegateListener = __webpack_require__(55);
	
	var debounce = __webpack_require__(97);
	
	var addSource = __webpack_require__(78);
	
	var createCalcHandler = __webpack_require__(79);
	
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(54);
	
	var addTreeListener = __webpack_require__(56);
	
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var set = __webpack_require__(22);
	
	var deepFind = __webpack_require__(98);
	
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(81);
	
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(32);
	
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
/* 82 */
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(55);
	
	var undelegateListener = __webpack_require__(45);
	
	var triggerOne = __webpack_require__(23);
	
	var makeObject = __webpack_require__(63);
	
	var createSpy = __webpack_require__(64);
	
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(54);
	
	var delegateListener = __webpack_require__(55);
	
	var undelegateListener = __webpack_require__(45);
	
	var removeListener = __webpack_require__(46);
	
	var makeObject = __webpack_require__(63);
	
	var createSpy = __webpack_require__(64);
	
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(54);
	
	var removeListener = __webpack_require__(46);
	
	var triggerOne = __webpack_require__(23);
	
	var createSpy = __webpack_require__(64);
	
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var simulateClick = __webpack_require__(69);
	
	var addDomListener = __webpack_require__(87);
	
	var removeDomListener = __webpack_require__(89);
	
	var triggerDOMEvent = __webpack_require__(90);
	
	var bindNode = __webpack_require__(18);
	
	var createSpy = __webpack_require__(64);
	
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var defineProp = __webpack_require__(21);
	
	var addListener = __webpack_require__(54);
	
	var dom = __webpack_require__(27);
	
	var createDomEventHandler = __webpack_require__(88);
	
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
/* 88 */
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
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(20);
	
	var removeListener = __webpack_require__(46);
	
	var dom = __webpack_require__(27);
	
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var triggerOneDOMEvent = __webpack_require__(91);
	
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
/* 91 */
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
/* 92 */
/***/ function(module, exports) {

	'use strict';
	
	describe('Events summary (on, off, trigger)', function () {
	    /*let q = (s, c) => {
	        let result = $(s, c)[0] || null;
	        if (result) {
	            result.click = result.click || (() => {
	                let ev = document.createEvent("MouseEvent");
	                ev.initMouseEvent(
	                    "click",
	                    true
	                );
	                result.dispatchEvent(ev);
	            });
	        }
	        return result;
	    }
	     let node = document.body.appendChild($.create({
	        tagName: 'DIV',
	        id: 's-test',
	        innerHTML: `
	            <div id="s-test-1">
	                <div class="s-test-2">
	                 </div>
	            </div>
	        `
	    }));
	     node.click = node.click || function() {
	        this.dispatchEvent(new MouseEvent('click'));
	    }*/
	
	    xit('fires', function () {
	        var obj = {},
	            bool = false;
	        magic.on(obj, 'someevent', function (evt) {
	            return bool = true;
	        });
	        magic.trigger(obj, 'someevent');
	        expect(bool).toBe(true);
	    });
	
	    xit('fires on Matreshka instance', function () {
	        var mk = new MK(),
	            bool = false;
	        mk.on('someevent', function (evt) {
	            return bool = true;
	        });
	        mk.trigger('someevent');
	        expect(bool).toBe(true);
	    });
	
	    xit('removes', function () {
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
	
	    xit('removes on Matreshka instance', function () {
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
	
	    xit('fires delegated', function () {
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
	
	    xit('removes delegated', function () {
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
	
	    xit('fires (no selector)', function () {
	        var obj = {},
	            bool = false;
	
	        magic.bindNode(obj, 'x', '#d-test');
	        magic.on(obj, 'click::x', function (evt) {
	            return bool = true;
	        });
	
	        q('#d-test').click();
	
	        expect(bool).toBe(true);
	    });
	
	    xit('removes (no selector)', function () {
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
	
	    xit('fires (use selector)', function () {
	        var obj = {},
	            bool = false;
	
	        magic.bindNode(obj, 'x', '#d-test');
	        magic.on(obj, 'click::x(.d-test-2)', function (evt) {
	            return bool = true;
	        });
	
	        q('.d-test-2').click();
	
	        expect(bool).toBe(true);
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
	
	    xit('fires (no selector)', function () {
	        var obj = {},
	            bool = false;
	
	        magic.bindNode(obj, 'x', '#d-test');
	        magic.on(obj, 'click::x', function (evt) {
	            return bool = true;
	        });
	
	        q('#d-test').click();
	
	        expect(bool).toBe(true);
	    });
	
	    xit('fires (use selector)', function () {
	        var obj = {},
	            bool = false;
	
	        magic.bindNode(obj, 'x', '#d-test');
	        magic.on(obj, 'click::x(.d-test-2)', function (evt) {
	            return bool = true;
	        });
	
	        q('.d-test-2').click();
	
	        expect(bool).toBe(true);
	    });
	
	    xit('triggers once', function () {
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
	
	    xit('onDebounce works', function (done) {
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
	
	    xit('allows to pass name-handler object to "on" and "off"', function () {
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
	
	    xit('allows to flip context and triggerOnInit (on)', function () {
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addTreeListner = __webpack_require__(56);
	
	var removeTreeListner = __webpack_require__(47);
	
	var makeObject = __webpack_require__(63);
	
	var createSpy = __webpack_require__(64);
	
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_core/defineprop.js": 21,
		"./_core/defs.js": 20,
		"./_core/init.js": 19,
		"./_dom/default-dollar.js": 28,
		"./_dom/index.js": 27,
		"./_helpers/checkobjecttype.js": 95,
		"./_helpers/debounce.js": 97,
		"./_helpers/deepfind.js": 98,
		"./_helpers/is.js": 24,
		"./_helpers/matreshkaerror.js": 96,
		"./_helpers/toarray.js": 99,
		"./array.js": 100,
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
		"./bindnode/_bindsinglenode.js": 49,
		"./bindnode/_createbindingswitcher.js": 43,
		"./bindnode/_createnodehandler.js": 52,
		"./bindnode/_createobjecthandler.js": 53,
		"./bindnode/_getnodes.js": 25,
		"./bindnode/_selectnodes.js": 26,
		"./bindnode/index.js": 18,
		"./bindoptionalnode.js": 59,
		"./bindsandbox.js": 60,
		"./bquery/_data.js": 37,
		"./bquery/_html2nodelist.js": 31,
		"./bquery/_init.js": 30,
		"./bquery/add.js": 40,
		"./bquery/create.js": 35,
		"./bquery/find.js": 42,
		"./bquery/index.js": 29,
		"./bquery/is.js": 38,
		"./bquery/not.js": 41,
		"./bquery/off.js": 39,
		"./bquery/on.js": 36,
		"./bquery/one.js": 34,
		"./bquery/parsehtml.js": 33,
		"./calc/_addsource.js": 78,
		"./calc/_createcalchandler.js": 79,
		"./calc/index.js": 77,
		"./class.js": 81,
		"./defaultbinders.js": 51,
		"./extend.js": 32,
		"./index.js": 101,
		"./lookforbinder.js": 50,
		"./magic.js": 104,
		"./matreshka/index.js": 102,
		"./object/index.js": 103,
		"./off/_removedomlistener.js": 89,
		"./off/_removelistener.js": 46,
		"./off/_removetreelistener.js": 47,
		"./off/_undelegatelistener.js": 45,
		"./off/index.js": 105,
		"./on/_adddomlistener.js": 87,
		"./on/_addlistener.js": 54,
		"./on/_addtreelistener.js": 56,
		"./on/_createdomeventhandler.js": 88,
		"./on/_delegatelistener.js": 55,
		"./on/index.js": 106,
		"./parsebindings.js": 107,
		"./select.js": 61,
		"./selectall.js": 62,
		"./set.js": 22,
		"./trigger/_triggerdomevent.js": 90,
		"./trigger/_triggerone.js": 23,
		"./trigger/_triggeronedomevent.js": 91,
		"./trigger/index.js": 108,
		"./unbindnode/_removebinding.js": 48,
		"./unbindnode/index.js": 44
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
	webpackContext.id = 94;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var matreshkaError = __webpack_require__(96);
	
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
/* 96 */
/***/ function(module, exports) {

	'use strict';
	
	var bindingErrorPrefix = 'Binding error:';
	var calcErrorPrefix = 'Calc error:';
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
	    }
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
/* 97 */
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
/* 98 */
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
/* 99 */
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
/* 100 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(102);
	
	var MatreshkaArray = __webpack_require__(100);
	
	var MatreshkaObject = __webpack_require__(103);
	
	var Class = __webpack_require__(81);
	
	//import binders from './binders';
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	//Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(32);
	
	var Class = __webpack_require__(81);
	
	module.exports = Class({
	    // instance properies and methods
	
	}, {
	    // static properties and methods
	    extend: extend
	});

/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 104 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 105 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on(object, names, callback, triggerOnInit, context, info) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        info = context;
	        context = triggerOnInit;
	        triggerOnInit = callback;
	        callback = names;
	        names = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'on');
	    }
	
	    if (names && typeof names === 'object') {
	        for (var _target = names, _keys = Object.keys(_target), _i = 0, namesObjCallback, namesObjName, _l = _keys.length; (namesObjCallback = _keys[_i], namesObjName = _target[namesObjCallback]), _i < _l; _i++) {
	            on(object, namesObjName, namesObjCallback, callback, triggerOnInit, context)
	        }
	
	        return object;
	    }
	
	    if (typeof names !== 'string') {
	        throw matreshkaError('on:names_type', { names: names });
	    }
	
	    names = names instanceof Array ? names : names.replace(/\s+/g, ' ') // single spaces only
	    .split(/\s(?![^(]*\))/g); // split by spaces
	
	    if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
	        var _ref = [triggerOnInit, context];
	        context = _ref[0];
	        triggerOnInit = _ref[1];
	    }
	
	    for (var _target2 = names, _index = 0, name, _l2 = _target2.length; name = _target2[_index], _index < _l2; _index++) {
	        var lastIndexOfET = name.lastIndexOf('@');
	
	        if (~lastIndexOfET) {
	            // TODO: Array.prototype.slice is slow
	            var path = name.slice(0, lastIndexOfET);
	            name = name.slice(lastIndexOfET + 1);
	
	            delegateListener(object, path, name, callback, context, info);
	        } else {
	            addListener(object, name, callback, context, evtData);
	        }
	    }
	}

/***/ },
/* 107 */
/***/ function(module, exports) {

	"use strict";
	
	//import parserBrackets from './_bindings/parserbrackets';
	
	module.exports = parseBindings;
	function parseBindings(object, nodes) {}

/***/ },
/* 108 */
/***/ function(module, exports) {

	'use strict';
	
	// triggers event
	module.exports = trigger;
	function trigger() {
	    for (var _len = arguments.length, allArgs = Array(_len), _key = 0; _key < _len; _key++) {
	        allArgs[_key] = arguments[_key];
	    }
	
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        var _givenNames = allArgs[0];
	        var args = allArgs.slice(1);
	
	        object = this;
	    } else {
	        var _object = allArgs[0];
	        var _givenNames2 = allArgs[1];
	
	        var _args = allArgs.slice(2);
	        // throw error when object type is wrong
	
	
	        checkObjectType(_object, 'trigger');
	    }
	    var names = void 0;
	
	    if (typeof names === 'string') {
	        names = givenNames.split(/\s+/);
	    } else {
	        throw matreshkaError('trigger:name_type', { name: givenNames });
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
	
	        /*if(~name.indexOf('::')) {
	        executed = domEvtReg.exec(name);
	        nodes = objectData.special[executed[3] || 'sandbox'];
	        nodes = nodes && nodes.$nodes;
	        _nodes = core.$();
	        selector = executed[5];
	        if(selector) {
	        for(j = 0; j < nodes.length; j++) {
	        _nodes = _nodes.add(nodes.find(selector));
	        }
	        } else {
	        _nodes = nodes;
	        }
	        for(j = 0; j < _nodes.length; j++) {
	        triggerDOMEvent(_nodes[i], executed[1], args);
	        }
	        } else {
	        events = allEvents[name];
	        if (events) {
	        j = -1, l = events.length;
	        while (++j < l)(ev = events[j]).callback.apply(ev.ctx, args);
	        }
	        }*/
	    }
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmE5YTJlZThjNjllYmYxMjZhNzAiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9odG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9hdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9faGVscGVycy9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2dldG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29mZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2FkZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L25vdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlL19jcmVhdGViaW5kaW5nc3dpdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuYmluZG5vZGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvX3JlbW92ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvX3JlbW92ZXRyZWVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS9fcmVtb3ZlYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2JpbmRzaW5nbGVub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0YmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2NyZWF0ZW5vZGVoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9fY3JlYXRlb2JqZWN0aGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24vX2FkZGxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9fZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24vX2FkZHRyZWVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRzYW5kYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL2NyZWF0ZXNweS5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NhbGNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsYy9fYWRkc291cmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9jYWxjL19jcmVhdGVjYWxjaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9fYWRkZG9tbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uL19jcmVhdGVkb21ldmVudGhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29mZi9fcmVtb3ZlZG9tbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyaWdnZXIvX3RyaWdnZXJkb21ldmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJpZ2dlci9fdHJpZ2dlcm9uZWRvbWV2ZW50LmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL3RyZWVfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjIC4qXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9faGVscGVycy9jaGVja29iamVjdHR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19oZWxwZXJzL21hdHJlc2hrYWVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9faGVscGVycy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2hlbHBlcnMvZGVlcGZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19oZWxwZXJzL3RvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hZ2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2ViaW5kaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJpZ2dlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNB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LFFBQXBCLEVBQThCO0FBQzFCLGlCQUFRLFdBQVcsS0FBWCxDQUFpQixLQUFqQixDQUFSO0FBQ0gsTUFGRCxNQUVPO0FBQ0gsZUFBTSxlQUFlLG1CQUFmLEVBQW9DLEVBQUUsTUFBTSxVQUFSLEVBQXBDLENBQU47QUFDSDs7QUFFRCxTQUFNLE1BQU0sS0FBSyxHQUFMLENBQVMsTUFBVCxDQUFaOztBQUVBO0FBQ0EsU0FBSSxDQUFDLEdBQUwsRUFBVTtBQUNOLGdCQUFPLE1BQVA7QUFDSDs7QUF2QnVDLFNBeUJ4QixTQXpCd0IsR0F5QlYsR0F6QlUsQ0F5QmhDLE1BekJnQzs7O0FBMkJ4QyxTQUFHLENBQUMsU0FBSixFQUFlO0FBQ1gsZ0JBQU8sTUFBUDtBQUNIOztBQTdCdUMsd0JBZ0MzQixLQWhDMkIsY0FnQ3BCLElBaENvQix1QkFnQ3BCLElBaENvQiwyQ0FnQ1o7QUFDeEIsYUFBTSxTQUFTLFVBQVUsSUFBVixDQUFmOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCSDtBQUVKLEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiYTlhMmVlOGM2OWViZjEyNmE3MFxuICoqLyIsIi8vIFRoaXMgZ2V0cyByZXBsYWNlZCBieSBrYXJtYSB3ZWJwYWNrIHdpdGggdGhlIHVwZGF0ZWQgZmlsZXMgb24gcmVidWlsZFxuY29uc3QgX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fID0gW107XG5cbi8vIHJlcXVpcmUgYWxsIG1vZHVsZXMgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanNcIjogNTcsXG5cdFwiLi9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXCI6IDU4LFxuXHRcIi4vYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanNcIjogNjUsXG5cdFwiLi9icXVlcnkvYWRkX3NwZWMuanNcIjogNjYsXG5cdFwiLi9icXVlcnkvY3JlYXRlX3NwZWMuanNcIjogNjcsXG5cdFwiLi9icXVlcnkvZXZlbnRzX3NwZWMuanNcIjogNjgsXG5cdFwiLi9icXVlcnkvZmluZF9zcGVjLmpzXCI6IDcwLFxuXHRcIi4vYnF1ZXJ5L2luaXRfc3BlYy5qc1wiOiA3MSxcblx0XCIuL2JxdWVyeS9pc19zcGVjLmpzXCI6IDcyLFxuXHRcIi4vYnF1ZXJ5L25vdF9zcGVjLmpzXCI6IDczLFxuXHRcIi4vYnF1ZXJ5L29uZV9zcGVjLmpzXCI6IDc0LFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXCI6IDc1LFxuXHRcIi4vY2FsY19zcGVjLmpzXCI6IDc2LFxuXHRcIi4vY2xhc3Nfc3BlYy5qc1wiOiA4MCxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXCI6IDgyLFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXCI6IDgzLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1wiOiA4NCxcblx0XCIuL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXCI6IDg1LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1wiOiA4Nixcblx0XCIuL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXCI6IDkyLFxuXHRcIi4vZXZlbnRzL3RyZWVfY2hhbmdlX3NwZWMuanNcIjogOTNcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge1xuXHRodG1sLFxuXHR0ZXh0LFxuXHRwcm9wLFxuXHRhdHRyLFxuXHRjbGFzc05hbWUsXG5cdGRhdGFzZXQsXG5cdHN0eWxlLFxuXHRkaXNwbGF5XG59IGZyb20gJ3NyYy9iaW5kZXJzJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuXG5kZXNjcmliZSgnQmluZGVycycsICgpID0+IHtcblx0Y29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuXHRjb25zdCBkYXRhc2V0SXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5kYXRhc2V0ID8gaXQgOiB4aXQ7XG5cdGxldCBvYmo7XG5cdGxldCBub2RlO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgcHJvcCcsICgpID0+IHtcblx0XHRub2RlLnNvbWVQcm9wID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHByb3AoJ3NvbWVQcm9wJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUuc29tZVByb3ApLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgYXR0cicsICgpID0+IHtcblx0XHRub2RlLnNldEF0dHJpYnV0ZSgnc29tZS1hdHRyaWJ1dGUnLCAnZm9vJyk7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGF0dHIoJ3NvbWVQcm9wJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJykpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUuc2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScsICdiYXInKTtcblx0XHRleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJykpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgaHRtbCcsICgpID0+IHtcblx0XHRub2RlLmlubmVySFRNTCA9ICc8aT5mb288L2k+Jztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgaHRtbCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCc8aT5mb288L2k+Jyk7XG5cdFx0b2JqLnggPSAnPGI+YmFyPC9iPic7XG5cdFx0ZXhwZWN0KG5vZGUuaW5uZXJIVE1MKS50b0VxdWFsKCc8Yj5iYXI8L2I+Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCB0ZXh0JywgKCkgPT4ge1xuXHRcdG5vZGUudGV4dENvbnRlbnQgPSAnPGk+Zm9vPC9pPic7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHRleHQoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnPGk+Zm9vPC9pPicpO1xuXHRcdG9iai54ID0gJzxiPmJhcjwvYj4nO1xuXHRcdGV4cGVjdChub2RlLnRleHRDb250ZW50KS50b0VxdWFsKCc8Yj5iYXI8L2I+Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBzdHlsZScsICgpID0+IHtcblx0XHRub2RlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzdHlsZSgndGV4dEFsaWduJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2NlbnRlcicpO1xuXHRcdG9iai54ID0gJ3JpZ2h0Jztcblx0XHRleHBlY3Qobm9kZS5zdHlsZS50ZXh0QWxpZ24pLnRvRXF1YWwoJ3JpZ2h0Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBkaXNwbGF5JywgKCkgPT4ge1xuXHRcdG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBkaXNwbGF5KHRydWUpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKGZhbHNlKTtcblx0XHRvYmoueCA9IHRydWU7XG5cdFx0ZXhwZWN0KG5vZGUuc3R5bGUuZGlzcGxheSkudG9FcXVhbCgnJyk7XG5cblx0XHRub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblx0XHRiaW5kTm9kZShvYmosICd5Jywgbm9kZSwgZGlzcGxheShmYWxzZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLnkpLnRvRXF1YWwodHJ1ZSk7XG5cdFx0b2JqLnkgPSBmYWxzZTtcblx0XHRleHBlY3Qobm9kZS5zdHlsZS5kaXNwbGF5KS50b0VxdWFsKCcnKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGNsYXNzTmFtZScsICgpID0+IHtcblx0XHQvLyBASUU5XG5cdFx0bm9kZS5jbGFzc05hbWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgY2xhc3NOYW1lKCdmb28nKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCh0cnVlKTtcblx0XHRvYmoueCA9IGZhbHNlO1xuXHRcdGV4cGVjdChub2RlLmNsYXNzTmFtZSkudG9FcXVhbCgnJyk7XG5cblx0XHRub2RlLmNsYXNzTmFtZSA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBjbGFzc05hbWUoJ2ZvbycsIGZhbHNlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChmYWxzZSk7XG5cdFx0b2JqLnggPSB0cnVlO1xuXHRcdGV4cGVjdChub2RlLmNsYXNzTmFtZSkudG9FcXVhbCgnJyk7XG5cdH0pO1xuXG5cdGRhdGFzZXRJdCgnc2hvdWxkIGJpbmQgZGF0YXNldCcsICgpID0+IHtcblx0XHQvLyBASUU5XG5cdFx0bm9kZS5kYXRhc2V0LmZvbyA9ICdiYXInO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBkYXRhc2V0KCdmb28nKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG5cdFx0b2JqLnggPSAnYmF6Jztcblx0XHRleHBlY3Qobm9kZS5kYXRhc2V0LmZvbykudG9FcXVhbCgnYmF6Jyk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kZXJzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaHRtbCBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBjbGFzc05hbWUgZnJvbSAnLi9jbGFzc25hbWUnO1xuaW1wb3J0IHByb3AgZnJvbSAnLi9wcm9wJztcbmltcG9ydCBhdHRyIGZyb20gJy4vYXR0cic7XG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgb3V0cHV0IGZyb20gJy4vb3V0cHV0JztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL3RleHRhcmVhJztcbmltcG9ydCBzZWxlY3QgZnJvbSAnLi9zZWxlY3QnO1xuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xuaW1wb3J0IHRleHQgZnJvbSAnLi90ZXh0JztcbmltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlJztcbmltcG9ydCBkYXRhc2V0IGZyb20gJy4vZGF0YXNldCc7XG5cbmV4cG9ydCB7XG4gICAgaHRtbCxcbiAgICBkaXNwbGF5LFxuICAgIGNsYXNzTmFtZSxcbiAgICBwcm9wLFxuICAgIGF0dHIsXG4gICAgaW5wdXQsXG4gICAgb3V0cHV0LFxuICAgIHRleHRhcmVhLFxuICAgIHNlbGVjdCxcbiAgICBwcm9ncmVzcyxcbiAgICB0ZXh0LFxuICAgIHN0eWxlLFxuICAgIGRhdGFzZXRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbCgpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogJ2lucHV0JywgLy8gdGhlIGV2ZW50IG5hbWUgZmlyZXMgb25seSBpbiBjb250ZW50ZWRpdGFibGUgbW9kZVxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gYCR7dmFsdWV9YDtcblx0XHR9XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvaHRtbC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BsYXkoc3dpdGNoZXI9dHJ1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdHlsZS5kaXNwbGF5XG4gICAgICAgICAgICAgICAgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcykuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpO1xuICAgICAgICAgICAgY29uc3Qgbm9uZSA9IHZhbHVlID09PSAnbm9uZSc7XG4gICAgICAgICAgICByZXR1cm4gc3dpdGNoZXIgPyAhbm9uZSA6IG5vbmU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYoc3dpdGNoZXIpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvZGlzcGxheS5qc1xuICoqLyIsImltcG9ydCB7XG4gICAgdG9nZ2xlLFxuICAgIGNvbnRhaW5zXG59IGZyb20gJy4vX2NsYXNzbGlzdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYXNzTmFtZShjbGFzc05hbWUsIHN3aXRjaGVyPXRydWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbnRhaW5zKHRoaXMsIGNsYXNzTmFtZSk7XG5cdFx0XHRyZXR1cm4gc3dpdGNoZXIgPyB2YWx1ZSA6ICF2YWx1ZTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlKHRoaXMsIGNsYXNzTmFtZSwgc3dpdGNoZXIgPyAhIXZhbHVlIDogIXZhbHVlKVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzXG4gKiovIiwiLy8gQElFOVxuXG5sZXQgYWRkO1xubGV0IHJlbW92ZTtcbmxldCBjb250YWlucztcblxuaWYoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuY2xhc3NMaXN0KSB7XG4gICAgYWRkID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICByZW1vdmUgPSAobm9kZSwgbmFtZSkgPT4gbm9kZS5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgIGNvbnRhaW5zID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xufSBlbHNlIHtcbiAgICBhZGQgPSAobm9kZSwgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiICsgbmFtZSArIFwiKFxcXFxzfCQpXCIsIFwiZ1wiKTtcblx0XHRpZiAoIXJlLnRlc3Qobm9kZS5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IChub2RlLmNsYXNzTmFtZSArIFwiIFwiICsgbmFtZSkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikucmVwbGFjZSgvKF4gfCAkKS9nLCBcIlwiKTtcbiAgICAgICAgfVxuXHR9XG5cblx0cmVtb3ZlID0gKG5vZGUsIG5hbWUpID0+IHtcblx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIGMgKyBcIihcXFxcc3wkKVwiLCBcImdcIik7XG5cdFx0bm9kZS5jbGFzc05hbWUgPSBub2RlLmNsYXNzTmFtZS5yZXBsYWNlKHJlLCBcIiQxXCIpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyheIHwgJCkvZywgXCJcIik7XG5cdH1cblxuXHRjb250YWlucyA9IChub2RlLCBjKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBuYW1lICsgJyhcXFxcc3wkKScpLnRlc3Qobm9kZS5jbGFzc05hbWUpO1xuXHR9XG59XG5cbmNvbnN0IHRvZ2dsZSA9IChub2RlLCBuYW1lLCBzd2l0Y2hlcikgPT4ge1xuICAgIGlmKHN3aXRjaGVyKSB7XG4gICAgICAgIGFkZChub2RlLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUobm9kZSwgbmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIHRvZ2dsZSxcbiAgICBjb250YWluc1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9fY2xhc3NsaXN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzW3Byb3BlcnR5TmFtZV07XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0Ly8gaW4gY2FzZSB3aGVuIHlvdSdyZSB0cnlpbmcgdG8gc2V0IHJlYWQtb25seSBwcm9wZXJ0eVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0fTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3Byb3AuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdHRyKGF0dHJpYnV0ZU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2F0dHIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnB1dCh0eXBlKSB7XG4gICAgbGV0IG9uO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnICYmIHRoaXMudmFsdWUgPT0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIGNhc2UgJ2hpZGRlbic6XG4gICAgICAgICAgICBvbiA9IG51bGw7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICBvbiA9ICdjaGFuZ2UnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XG4gICAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICBjYXNlICd0ZWwnOlxuICAgICAgICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzogKi9cbiAgICAgICAgZGVmYXVsdDogLy8gb3RoZXIgZnV0dXJlIChIVE1MNispIGlucHV0c1xuICAgICAgICAgICAgb24gPSAnaW5wdXQnO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBvbixcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2lucHV0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3V0cHV0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlIHx8IHRoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9ICdmb3JtJyBpbiB0aGlzID8gJ3ZhbHVlJyA6ICd0ZXh0Q29udGVudCc7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IHZhbHVlID09PSBudWxsID8gJycgOiBgJHt2YWx1ZX1gO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL291dHB1dC5qc1xuICoqLyIsImltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGV4dGFyZWEoKSB7XG5cdHJldHVybiBpbnB1dCgndGV4dCcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdChtdWx0aXBsZSkge1xuICAgIGlmIChtdWx0aXBsZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb246ICdjaGFuZ2UnLFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IG9wdGlvbnMubGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChvcHRpb25zW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUoZ2l2ZW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBnaXZlblZhbHVlID09PSAnc3RyaW5nJyA/IFtnaXZlblZhbHVlXSA6IGdpdmVuVmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogJ2NoYW5nZScsXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zW2ldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvc2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0ZXh0YXJlYSgpIHtcblx0cmV0dXJuIGlucHV0KCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3Byb2dyZXNzLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0b246ICdpbnB1dCcsIC8vIHRoZSBldmVudCBuYW1lIGZpcmVzIG9ubHkgaW4gY29udGVudGVkaXRhYmxlIG1vZGVcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLnRleHRDb250ZW50O1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSBgJHt2YWx1ZX1gO1xuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvdGV4dC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0eWxlKHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG51bGwsXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlW3Byb3BlcnR5XVxuICAgICAgICAgICAgICAgIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9zdHlsZS5qc1xuICoqLyIsIi8vIHJlcGxhY2UgbmFtZXNMaWtlVGhpcyB3aXRoIG5hbWVzLWxpa2UtdGhpc1xuY29uc3QgdG9EYXNoZWQgPSAobmFtZSkgPT4ge1xuICAgIHJldHVybiAnZGF0YS0nICsgbmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csICh1KSA9PiBcIi1cIiArIHUudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGFzZXQocHJvcCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0aWYodGhpcy5kYXRhc2V0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0W3Byb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUodG9EYXNoZWQocHJvcCkpO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQpIHtcblx0XHRcdFx0dGhpcy5kYXRhc2V0W3Byb3BdID0gdmFsdWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldEF0dHJpYnV0ZSh0b0Rhc2hlZChwcm9wKSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvZGF0YXNldC5qc1xuICoqLyIsImltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19nZXRub2Rlcyc7XG5pbXBvcnQgY3JlYXRlQmluZGluZ1N3aXRjaGVyIGZyb20gJy4vX2NyZWF0ZWJpbmRpbmdzd2l0Y2hlcic7XG5pbXBvcnQgYmluZFNpbmdsZU5vZGUgZnJvbSAnLi9fYmluZHNpbmdsZW5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9faGVscGVycy9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IE1hdHJlc2hrYUVycm9yIGZyb20gJy4uL19oZWxwZXJzL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4uL29uL19kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4uL29mZi9fcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vdHJpZ2dlci9fdHJpZ2dlcm9uZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcbmltcG9ydCBhZGRUcmVlTGlzdGVuZXIgZnJvbSAnLi4vb24vX2FkZHRyZWVsaXN0ZW5lcic7XG5cbi8vIHRoZSBtYWluIG1ldGhvZCBvZiB0aGUgZnJhbWV3b3JrOiBiaW5kcyBhIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0byBIVE1MIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50T3B0aW9ucykge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2ZW50T3B0aW9ucyA9IGJpbmRlcjtcbiAgICAgICAgYmluZGVyID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgZXZlbnRPcHRpb25zID0gZXZlbnRPcHRpb25zIHx8IHt9O1xuICAgIGJpbmRlciA9IGJpbmRlciB8fCB7fTtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7XG4gICAgICAgIG9wdGlvbmFsPWJpbmROb2RlLnRlbXBvcmFyeU9wdGlvbmFsRmxhZyxcbiAgICAgICAgZGVlcD10cnVlLFxuICAgICAgICBzaWxlbnQ9ZmFsc2VcbiAgICB9ID0gZXZlbnRPcHRpb25zO1xuXG4gICAgZGVsZXRlIGJpbmROb2RlLnRlbXBvcmFyeU9wdGlvbmFsRmxhZztcblxuICAgIC8vIHRocm93IGVycm9yIHdoZW4ga2V5IGlzIG5vdCBnaXZlblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgYmluZGVyLCBldmVudE9wdGlvbnMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRPcHRpb25zXG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnRPcHRpb25zID0gbm9kZTtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXJnZWRFdmVudE9wdGlvbnMgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmKGNvbW1vbkV2ZW50T3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwiZ2xvYmFsXCIgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnRPcHRpb25zLCBjb21tb25FdmVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIGV2ZW50IG9iamVjdCBieSBcImxvY2FsXCIgZXZlbnQgKFwiZXZlbnRcIiBrZXkgb2YgYW4gb2JqZWN0KVxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudE9wdGlvbnMsIGl0ZW1FdmVudE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBhY2NlcHQga2V5LW5vZGUgb2JqZWN0XG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChrZXlPYmpWYWx1ZSwga2V5T2JqS2V5KSA9PiBiaW5kTm9kZShvYmplY3QsIGtleU9iaktleSwga2V5T2JqVmFsdWUsIG5vZGUsIGJpbmRlcikpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0ICRub2RlcyA9IGdldE5vZGVzKG9iamVjdCwgbm9kZSk7XG5cbiAgICAvLyBjaGVjayBub2RlIGV4aXN0ZW5jZVxuICAgIGlmICghJG5vZGVzLmxlbmd0aCkge1xuICAgICAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpub2RlX21pc3NpbmcnLCB7IGtleSwgbm9kZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZWVwICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVlcFBhdGhMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAvLyBoYW5kbGUgYmluZGluZyB3aGVuIGtleSBhcmcgaW5jbHVkZXMgZG90cyAoZWcgXCJhLmIuYy5kXCIpXG4gICAgICAgICAgICBjb25zdCBiaW5kaW5nU3dpdGNoZXIgPSBjcmVhdGVCaW5kaW5nU3dpdGNoZXIoe1xuICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgICBkZWVwUGF0aCxcbiAgICAgICAgICAgICAgICAkbm9kZXMsXG4gICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50T3B0aW9ucyxcbiAgICAgICAgICAgICAgICBiaW5kTm9kZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2F6YXphbG8nLCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDEpKTtcbiAgICAgICAgICAgIGFkZFRyZWVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMSksIGJpbmRpbmdTd2l0Y2hlcik7XG5cbiAgICAgICAgICAgIGJpbmRpbmdTd2l0Y2hlcigpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcERlZiA9IGRlZmluZVByb3Aob2JqZWN0LCBrZXkpO1xuXG4gICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgIC8vIGlmIG9iamVjdCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UgdGhlbiBleHRlbmQgXCIkbm9kZXNcIiBhbmQgXCJub2Rlc1wiIG9iamVjdHNcbiAgICAgICAgY29uc3QgeyAkbm9kZXM6ICRhbGxOb2Rlcywgbm9kZXM6IGFsbE5vZGVzIH0gPSBvYmplY3Q7XG5cbiAgICAgICAgaWYoISRhbGxOb2RlcyB8fCAhYWxsTm9kZXMpIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmluc3RhbmNlX25vZGVzX21pc3NpbmcnLCB7XG4gICAgICAgICAgICAgICAgJG5vZGVzOiAkYWxsTm9kZXMsXG4gICAgICAgICAgICAgICAgbm9kZXM6IGFsbE5vZGVzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRhbGxOb2Rlc1trZXldID0gJGFsbE5vZGVzW2tleV0gJiYgJGFsbE5vZGVzW2tleV0ubGVuZ3RoXG4gICAgICAgICAgICA/ICRhbGxOb2Rlc1trZXldLmFkZCgkbm9kZXMpXG4gICAgICAgICAgICA6ICRub2RlcztcblxuICAgICAgICBhbGxOb2Rlc1trZXldID0gJGFsbE5vZGVzW2tleV1bMF07XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGJpbmRpbmcgZm9yIGV2ZXJ5IG5vZGUgc2VwYXJhdGVseVxuICAgIG5vZm4uZm9yRWFjaCgkbm9kZXMsIChub2RlKSA9PiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcbiAgICAgICAgJG5vZGVzLFxuICAgICAgICBub2RlLFxuICAgICAgICBrZXksXG4gICAgICAgIGV2ZW50T3B0aW9ucyxcbiAgICAgICAgYmluZGVyLFxuICAgICAgICBwcm9wRGVmXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcblxubGV0IG9iamVjdElkID0gMDtcblxuLy8gdGhpcyBpcyBjb21tb24gZnVuY3Rpb24gd2hpY2ggYXNzb2NpYXRlcyBhbiBvYmplY3Qgd2l0aCBpdHMgTWF0cmVzaGthIGRlZmluaXRpb25cbmZ1bmN0aW9uIGNvbW1vbkluaXQob2JqZWN0KSB7XG4gICAgbGV0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG4gICAgaWYgKCFkZWYpIHtcbiAgICAgICAgZGVmID0ge1xuICAgICAgICAgICAgLy8gYSBwcm9wZXJ0eSBuYW1lIG9mIFwiZXZlbnRzXCIgb2JqZWN0IGlzIGFuIGV2ZW50IG5hbWVcbiAgICAgICAgICAgIC8vIGFuZCBhIHZhbHVlIGlzIGFuIGFycmF5IG9mIGV2ZW50IGhhbmRsZXJzXG4gICAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgICAgICAvKiBleGFtcGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgY3R4OiBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IG9iamVjdDIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXhhbXBsZVwiLFxuXHRcdFx0XHRcdGluZm86IHt9XG4gICAgICAgICAgICAgICAgfSAqL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFwicHJvcHNcIiBjb250YWlucyBzcGVjaWFsIGluZm9ybWF0aW9uIGFib3V0IHByb3BlcnRpZXMgKGdldHRlcnMsIHNldHRlcnMgZXRjKVxuICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAvKiBleGFtcGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvYmplY3Rba2V5XSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIG1lZGlhdG9yOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBiaW5kaW5nczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlSGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdEhhbmRsZXIsXG5cdFx0XHRcdFx0XHQuLi5vdGhlciByZXF1aXJlZCBpbmZvXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWQ6IG9iamVjdElkKytcbiAgICAgICAgfTtcblxuICAgICAgICBkZWZzLnNldChvYmplY3QsIGRlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdE1LKG9iamVjdCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqZWN0O1xuICAgIGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0Ly8gVE9ETyB0aHJvdyBtYXRyZXNoa2FFcnJvclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGV9IGNhbm5vdCBiZSB1c2VkIGluIHRoaXMgbWV0aG9kYCk7XG4gICAgfVxuXG4gICAgLy8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG4gICAgLy8gZWxzZSBydW4gY29tbW9uSW5pdFxuICAgIC8vIGV2ZXJ5IF9pbml0TUsgaW1wbGVtZW50YXRpb24gaGF2ZSB0byBydW4gY29tbW9uSW5pdCBvciBwYXJlbnQncyBfaW5pdE1LXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgIHJldHVybiBvYmplY3QuX2luaXRNYXRyZXNoa2EgPyBvYmplY3QuX2luaXRNYXRyZXNoa2EoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcbiAgICBnZXQob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcbiAgICB9LFxuICAgIHNldChvYmosIGRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ21hdHJlc2hrYURhdGEnLCB7XG4gICAgICAgICAgICB2YWx1ZTogZGF0YSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGhhcyhvYmopIHtcbiAgICAgICAgcmV0dXJuICdtYXRyZXNoa2FEYXRhJyBpbiBvYmo7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IG5ldyBQc2V1ZG9NYXAoKSA6IG5ldyBXZWFrTWFwKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhlIGZ1bmN0aW9uIGRlZmluZXMgbmVlZGVkIGRlc2NyaXB0b3IgZm9yIGdpdmVuIHByb3BlcnR5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVQcm9wKG9iamVjdCwga2V5KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIWRlZi5wcm9wc1trZXldKSB7XG4gICAgICAgIGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHNba2V5XSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBvYmplY3Rba2V5XSxcbiAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgIHNldHRlcjogbnVsbCxcbiAgICAgICAgICAgIG1lZGlhdG9yOiBudWxsLFxuICAgICAgICAgICAgYmluZGluZ3M6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmdldHRlciA/IHByb3BEZWYuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHByb3BEZWYudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5zZXR0ZXIgPyBwcm9wRGVmLnNldHRlci5jYWxsKG9iamVjdCwgdikgOiBzZXQob2JqZWN0LCBrZXksIHYsIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbVNldHRlcjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmLnByb3BzW2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlci9fdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX2hlbHBlcnMvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpcyBmcm9tICcuL19oZWxwZXJzL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIHNldHMgbmV3IHZhbHVlIGZvciBhIHByb3BlcnR5XG4vLyBzaW5jZSBpdHMgcGVyZm9ybWFuY2UgaXMgdmVyeSBjcml0aWNhbCB3ZSdyZSBjaGVja2luZyBldmVudHMgZXhpc3RlbmNlIG1hbnVhbGx5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSB2YWx1ZTtcbiAgICAgICAgdmFsdWUgPSBrZXk7XG4gICAgICAgIGtleSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZXQnKTtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBrZXkgb3IgZmFsc3kga2V5IGlzIGdpdmVuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBldnQgPSBldnQgfHwge307XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghZGVmKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcywgZXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuICAgIGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghcHJvcERlZikge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgdmFsdWU6IHByZXZpb3VzVmFsdWUsIG1lZGlhdG9yIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gcG9zc2libGUgZmxhZ3NcbiAgICBjb25zdCB7XG4gICAgICAgIHNraXBNZWRpYXRvcixcbiAgICAgICAgZnJvbU1lZGlhdG9yLFxuICAgICAgICBmb3JjZSxcbiAgICAgICAgZm9yY2VIVE1MLFxuICAgICAgICBzaWxlbnQsXG4gICAgICAgIHNpbGVudEhUTUwsXG4gICAgICAgIHNraXBMaW5rc1xuICAgIH0gPSBldnQ7XG5cbiAgICBsZXQgbmV3VmFsdWU7XG5cbiAgICBpZiAobWVkaWF0b3IgJiYgIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSAmJiAhc2tpcE1lZGlhdG9yICYmICFmcm9tTWVkaWF0b3IpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICBuZXdWYWx1ZSA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWlzKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcblxuICAgIC8vIGFkZCB0byBldnQgb2JqZWN0IHNvbWUgdXNlZnVsIHByb3BlcnRpZXNcbiAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBzZWxmOiBvYmplY3QsXG4gICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgIGtleSxcbiAgICAgICAgaXNDaGFuZ2VkXG4gICAgfSwgZXZ0KTtcblxuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2lsZW50O1xuXG4gICAgLy8gdHJpZ2dlciBiZWZvcmVjaGFuZ2U6S0VZIGFuZCBiZWZvcmVjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlU3RyID0gJ2JlZm9yZWNoYW5nZSc7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZUV2dE5hbWUgPSBgJHtiZWZvcmVjaGFuZ2VTdHJ9OiR7a2V5fWA7XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuICAgIGlmICghc2lsZW50SFRNTCAmJiAoaXNDaGFuZ2VkIHx8IGZvcmNlIHx8IGZvcmNlSFRNTCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQmluZGluZ3NFdnROYW1lID0gYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgY2hhbmdlOktFWSBhbmQgY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ciA9ICdjaGFuZ2UnO1xuICAgICAgICBjb25zdCBjaGFuZ2VFdnROYW1lID0gYCR7Y2hhbmdlU3RyfToke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihldmVudHNbY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG4gICAgaWYgKChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFza2lwTGlua3MpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVwc0V2dE5hbWUgPSBgX2NoYW5nZTpkZXBzOiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlbGVnYXRlZEV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgZGVsZWdhdGVkIGV2ZW50cyBsb2dpY1xuICAgIGlmKGlzQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VUcmVlRXZ0TmFtZSA9IGBfY2hhbmdlOnRyZWU6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VUcmVlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VUcmVlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NldC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuXG4vLyBUT0RPOiBBZGQgZGVzY3JpcHRpb24gYW5kIGNvbW1lbnRzIGZvciB0cmlnZ2VyT25lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmlnZ2VyT25lKG9iamVjdCwgbmFtZSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICBpZiAoIWRlZikgcmV0dXJuO1xuXG4gICAgY29uc3QgZXZlbnRzID0gZGVmLmV2ZW50c1tuYW1lXTtcblxuICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IG5vZm4uc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgY29uc3QgbCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IFthMSwgYTJdID0gYXJncztcblxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBldjtcblxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IHtcbiAgICBpbmZvOiB7fSxcbiAgICBuYW1lOiBudWxsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHJpZ2dlci9fdHJpZ2dlcm9uZS5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSwgbm8tY29uZnVzaW5nLWFycm93ICovXG4vLyBkZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWVcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9faGVscGVycy9pcy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL19zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nXG5cbmNvbnN0IGh0bWxSZWcgPSAvPC87XG5jb25zdCBjdXN0b21TZWxlY3RvclJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuLy8gVE9ETyB3cml0ZSBkZXNjcmlwdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGxldCBub2RlcztcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgJiYgIWh0bWxSZWcudGVzdChzZWxlY3RvcikgJiYgY3VzdG9tU2VsZWN0b3JSZWcudGVzdChzZWxlY3RvcikpIHtcbiAgICAgICAgbm9kZXMgPSBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBub2RlcyA9IGRvbS4kKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fZ2V0bm9kZXMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4uL19oZWxwZXJzL3RvYXJyYXknO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JSZWcgPSAvXFxzKjpib3VuZFxcKChbXihdKilcXClcXHMqKFtcXFNcXHNdKilcXHMqfFxccyo6c2FuZGJveFxccyooW1xcU1xcc10qKVxccyovO1xuXG4vLyBUT0RPIGFkZCBkZXNjcmlwdGlvblxuLy8gVE9ETyB0aGlzIGZ1bmN0aW9uIGxvb2tzIG5vdCBnb29kLCBpdCBuZWVkcyB0byBiZSByZWZhY3RvcmVkIGFuZCBhY2NlbGVyYXRlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0Tm9kZXMob2JqZWN0LCBnaXZlblNlbGVjdG9yKSB7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gZGVmcy5nZXQob2JqZWN0KTtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBnaXZlblNlbGVjdG9yLnNwbGl0KCcsJyk7XG4gICAgbGV0IHJlc3VsdCA9IGRvbS4kKCk7XG5cbiAgICBub2ZuLmZvckVhY2goc2VsZWN0b3JzLCBzZWxlY3RvciA9PiB7XG4gICAgICAgIGNvbnN0IGV4ZWNSZXN1bHQgPSBjdXN0b21TZWxlY3RvclJlZy5leGVjKHNlbGVjdG9yKTtcbiAgICAgICAgaWYoZXhlY1Jlc3VsdCkge1xuICAgICAgICAgICAgY29uc3QgYm91bmRLZXkgPSBleGVjUmVzdWx0WzNdICE9PSB1bmRlZmluZWQgPyAnc2FuZGJveCcgOiBleGVjUmVzdWx0WzFdO1xuICAgICAgICAgICAgY29uc3Qgc3ViU2VsZWN0b3IgPSBleGVjUmVzdWx0WzNdICE9PSB1bmRlZmluZWQgPyBleGVjUmVzdWx0WzNdIDogZXhlY1Jlc3VsdFsyXTtcbiAgICAgICAgICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1tib3VuZEtleV07XG5cbiAgICAgICAgICAgIGlmKHByb3BEZWYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuICAgICAgICAgICAgICAgIGlmKGJpbmRpbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvdW5kTm9kZXMgPSBBcnJheShiaW5kaW5ncy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsIChiaW5kaW5nLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZE5vZGVzW2ldID0gYmluZGluZy5ub2RlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgcGFzc2VkIGFmdGVyIDpib3VuZChLRVkpIGlzIG5vdCBlbXB0eSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSAubXktc2VsZWN0b3JcIlxuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViU2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBjb250YWlucyBjaGlsZHJlbiBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSA+IC5teS1zZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViU2VsZWN0b3IuaW5kZXhPZignPicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VsZWN0aW5nIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJvdW5kTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbUF0dHIgPSBgbSR7TWF0aC5yYW5kb20oKX1gLnJlcGxhY2UoJy4nLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKHJhbmRvbUF0dHIsIHJhbmRvbUF0dHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChgWyR7cmFuZG9tQXR0cn09XCIke3JhbmRvbUF0dHJ9XCJdICR7c3ViU2VsZWN0b3J9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQodG9BcnJheShzZWxlY3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgZG9lc24ndCBjb250YWluIGNoaWxkcmVuIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJvdW5kTm9kZXMsIChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHN1YlNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgaXMgZW1wdHkgc3RyaW5nIGp1c3QgYWRkIGJvdW5kIG5vZGVzIHRvIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChib3VuZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGl0J3MgbmF0aXZlIHNlbGVjdG9yIChubyBjdXN0b20gdGhpbmdzKVxuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdERvbGxhciBmcm9tICcuL2RlZmF1bHQtZG9sbGFyJztcblxuY29uc3QgZG9tID0ge1xuICAgICQ6IGRlZmF1bHREb2xsYXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19kb20vaW5kZXguanNcbiAqKi8iLCIvKiBnbG9iYWwgJCAqL1xuaW1wb3J0IGJRdWVyeSBmcm9tICcuLi9icXVlcnknO1xuXG5jb25zdCBuZWVkZWRNZXRob2RzID0gJ29uIG9mZiBpcyBhZGQgbm90IGZpbmQnLnNwbGl0KC9cXHMvKTtcblxuY29uc3QgZ2xvYmFsRG9sbGFyID0gdHlwZW9mICQgPT09ICdmdW5jdGlvbicgPyAkIDogbnVsbDtcbmxldCB1c2VHbG9iYWxEb2xsYXIgPSB0cnVlO1xuXG5pZiAoZ2xvYmFsRG9sbGFyKSB7XG4gICAgY29uc3QgZm4gPSBnbG9iYWxEb2xsYXIuZm4gfHwgZ2xvYmFsRG9sbGFyLnByb3RvdHlwZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRlZE1ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFmbltuZWVkZWRNZXRob2RzW2ldXSkge1xuICAgICAgICAgICAgdXNlR2xvYmFsRG9sbGFyID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCkge1xuICAgICAgICBnbG9iYWxEb2xsYXIucGFyc2VIVE1MID0gYlF1ZXJ5LnBhcnNlSFRNTDtcbiAgICB9XG59IGVsc2Uge1xuICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VHbG9iYWxEb2xsYXIgPyBnbG9iYWxEb2xsYXIgOiBiUXVlcnk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgcGFyc2VIVE1MIGZyb20gJy4vcGFyc2VodG1sJztcbmltcG9ydCBvbmUgZnJvbSAnLi9vbmUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgb24gZnJvbSAnLi9vbic7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBhZGQgZnJvbSAnLi9hZGQnO1xuaW1wb3J0IG5vdCBmcm9tICcuL25vdCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuXG4vLyB0aW55IGpRdWVyeSByZXBsYWNlbWVudCBmb3IgTWF0cmVzaGthXG4vLyBiUXVlcnkgaXMgcmV3cml0dGVuIHZlcnNpb24gb2YgYmFsYWxhaWthLmpzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiUXVlcnkoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQoc2VsZWN0b3IsIGNvbnRleHQpO1xufVxuXG5ub2ZuLmFzc2lnbihiUXVlcnksIHtcbiAgICBmbjogSW5pdC5wcm90b3R5cGUsXG4gICAgZXh0ZW5kLFxuICAgIHBhcnNlSFRNTCxcbiAgICBvbmUsXG4gICAgY3JlYXRlXG59KTtcblxubm9mbi5hc3NpZ24oYlF1ZXJ5LmZuLCB7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGlzLFxuICAgIGFkZCxcbiAgICBub3QsXG4gICAgZmluZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcblxuLy8gZnVuY3Rpb24tY29uc3RydWN0b3Igb2YgYlF1ZXJ5IGxpYnJhcnlcbi8vIGFjY2VwdHMgbWFueSBraW5kcyBvZiBhcmd1bWVudHMgKHNlbGVjdG9yLCBodG1sLCBmdW5jdGlvbilcbmZ1bmN0aW9uIEJRdWVyeUluaXQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiBzZWxlY3RvciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBbc2VsZWN0b3JdO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICgvPC8udGVzdChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBodG1sMm5vZGVMaXN0KHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGV4dCA9IChuZXcgQlF1ZXJ5SW5pdChjb250ZXh0KSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIC8vIHR5cGVvZiBub2RlTGlzdCByZXR1cm5zIFwiZnVuY3Rpb25cIiBpbiBvbGQgV2ViS2l0XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2gocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQlF1ZXJ5SW5pdC5wcm90b3R5cGUgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgQlF1ZXJ5SW5pdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faW5pdC5qc1xuICoqLyIsIi8vIGNvbnZlcnRzIEhUTUwgc3RyaW5nIHRvIE5vZGVMaXN0IGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBodG1sMm5vZGVMaXN0KGdpdmVuSFRNTCkge1xuICAgIC8vIHdyYXBNYXAgaXMgdGFrZW4gZnJvbSBqUXVlcnlcbiAgICBjb25zdCB3cmFwTWFwID0ge1xuICAgICAgICBvcHRpb246IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuICAgICAgICBsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuICAgICAgICB0aGVhZDogWzEsICc8dGFibGU+JywgJzwvdGFibGU+J10sXG4gICAgICAgIHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgdGQ6IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddLFxuICAgICAgICBjb2w6IFsyLCAnPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD4nLCAnPC9jb2xncm91cD48L3RhYmxlPiddLFxuICAgICAgICBhcmVhOiBbMSwgJzxtYXA+JywgJzwvbWFwPiddLFxuICAgICAgICBfOiBbMCwgJycsICcnXVxuICAgIH07XG5cbiAgICBjb25zdCBodG1sID0gZ2l2ZW5IVE1MLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBpO1xuXG4gICAgd3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuICAgIHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG4gICAgd3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cbiAgICBjb25zdCBleCA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBleCAmJiB3cmFwTWFwW2V4WzFdXSB8fCB3cmFwTWFwLl87XG5cbiAgICBub2RlLmlubmVySFRNTCA9IHdyYXBwZXJbMV0gKyBodG1sICsgd3JhcHBlclsyXTtcblxuICAgIGkgPSB3cmFwcGVyWzBdO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBub2RlID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZS5jaGlsZE5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXG4gKiovIiwiLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZnlsbCBpcyB0YWtlbiB0aGVyZTpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24jUG9seWZpbGxcbi8vIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlXG5cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V4dGVuZC5qc1xuICoqLyIsImltcG9ydCBodG1sMm5vZGVMaXN0IGZyb20gJy4vX2h0bWwybm9kZWxpc3QnO1xuaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHBhcnNlcyBnaXZlbiBIVE1MIGFuZCByZXR1cm5zIGJRdWVyeSAoQlF1ZXJ5SW5pdCkgaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KGh0bWwybm9kZUxpc3QoaHRtbCkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyByZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIG1hdGNoZWQgc2V0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbmUocywgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgSW5pdChzLCBjb250ZXh0KVswXTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbmUuanNcbiAqKi8iLCIvLyBjcmVhdGVzIEhUTUwgZWxlbWVudFxuLy8gVE9ETyBnZXQgcmlkIG9mIGl0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUodGFnTmFtZSwgcHJvcHMpIHtcbiAgICBpZiAodHlwZW9mIHRhZ05hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHByb3BzID0gdGFnTmFtZTtcbiAgICAgICAgdGFnTmFtZSA9IHByb3BzLnRhZ05hbWU7XG4gICAgfVxuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKHByb3BzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2F0dHJpYnV0ZXMnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmZvck93bih2YWx1ZSwgKGF0dHJWYWx1ZSwgYXR0ck5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdjaGlsZHJlbicgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2godmFsdWUsIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxba2V5XSAmJiB0eXBlb2YgZWxba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKGVsW2tleV0sIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ICE9PSAndGFnTmFtZScpIHtcbiAgICAgICAgICAgICAgICBlbFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlbDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9jcmVhdGUuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgd2hlbiBhIHNlbGVjdG9yIGlzIGdpdmVuXG5mdW5jdGlvbiBkZWxlZ2F0ZUhhbmRsZXIoZXZ0LCBzZWxlY3RvciwgaGFuZGxlcikge1xuICAgIGNvbnN0IHJhbmRvbUlEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnJlcGxhY2UoJzAuJywgJ3gnKTtcbiAgICBjb25zdCBzY29wZVNlbGVjdG9yID0gYFske3JhbmRvbUlEfT1cIiR7cmFuZG9tSUR9XCJdIGA7XG4gICAgY29uc3Qgc3BsaXR0ZWRTZWxlY3RvciA9IHNlbGVjdG9yLnNwbGl0KCcsJyk7XG5cbiAgICBsZXQgbWF0Y2hpbmcgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXR0ZWRTZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZWwgPSBzcGxpdHRlZFNlbGVjdG9yW2ldO1xuICAgICAgICBtYXRjaGluZyArPSBgJHtpID09PSAwID8gJycgOiAnLCd9JHtzY29wZVNlbGVjdG9yfSR7c2VsfSwke3Njb3BlU2VsZWN0b3J9JHtzZWx9ICpgO1xuICAgIH1cblxuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUocmFuZG9tSUQsIHJhbmRvbUlEKTtcblxuICAgIGlmIChpcy5jYWxsKFtldnQudGFyZ2V0XSwgbWF0Y2hpbmcpKSB7XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBldnQpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKHJhbmRvbUlEKTtcbn1cblxuLy8gYWRkcyBldmVudCBsaXN0ZW5lciB0byBhIHNldCBvZiBlbGVtbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbihuYW1lc1N0ciwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBuYW1lcyA9IG5hbWVzU3RyLnNwbGl0KC9cXHMvKTtcbiAgICBsZXQgZGVsZWdhdGU7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzZWxlY3RvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBzZWxlY3RvciA9IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgZGVsZWdhdGUgPSBmdW5jdGlvbiB1bmlxdWVEZWxlZ2F0ZUhhbmRsZXIoZXZ0KSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZUhhbmRsZXIuY2FsbCh0aGlzLCBldnQsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcbiAgICAgICAgbmFtZSA9IG5hbWVbMF07XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpc1tqXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlSURdIHx8IFtdO1xuXG4gICAgICAgICAgICBsZXQgZXhpc3QgPSBmYWxzZTtcblxuXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWV4aXN0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGRlbGVnYXRlIHx8IGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29uLmpzXG4gKiovIiwiLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIGFzIGFuIG9iamVjdCBtb2R1bGVzIGJlY2F1c2Ugd2UgdXNlXG4vLyBzaW1wbGlmaWVkIGVzIG1vZHVsZXMgdGhlcmUgYW5kIGNhbm5vdCBpbXBvcnQgYW5kIHNoYXJlIGEgbnVtYmVyXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbm9kZUluZGV4OiAwLFxuICAgIGFsbEV2ZW50czoge31cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2RhdGEuanNcbiAqKi8iLCIvLyBjaGVjayB0aGUgZmlyc3QgZWxlbWVudCBmcm9tIGdpdmVuIHNldCBhZ2FpbnN0IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzKHMpIHtcbiAgICBjb25zdCBub2RlID0gdGhpc1swXTtcbiAgICByZXR1cm4gbm9kZVxuICAgICAgICA/IChub2RlLm1hdGNoZXNcbiAgICAgICAgICAgIHx8IG5vZGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICB8fCBub2RlLm1vek1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKG5vZGUsIHMpIDogZmFsc2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaXMuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcblxuLy8gcmVtb3ZlcyBldmVudCBoYW5kbGVyIGZyb20gYSBzZXQgb2YgZWxlbWVudHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9mZihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzZWxlY3RvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBzZWxlY3RvciA9IG51bGw7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgbmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcbiAgICAgICAgbmFtZSA9IG5hbWVbMF07XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpc1tqXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlLmIkXTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5kZWxlZ2F0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PT0gZXZlbnQubmFtZXNwYWNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50LmRlbGVnYXRlIHx8IGV2ZW50LmhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnNwbGljZShrLS0sIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5hbWVzcGFjZSAmJiAhc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29mZi5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIGFkZHMgdW5pcXVlIG5vZGVzIHRvIGJRdWVyeSBjb2xsZWN0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGQoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBpZE1hcCA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdDtcblxuICAgIHNlbGVjdG9yID0gbmV3IEluaXQoc2VsZWN0b3IpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBJbml0KHRoaXMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJlc3VsdFtpXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG4gICAgICAgICAgICBpZE1hcFtub2RlSURdID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBzZWxlY3RvcltpXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG4gICAgICAgICAgICBpZiAoIWlkTWFwW25vZGVJRF0pIHtcbiAgICAgICAgICAgICAgICBpZE1hcFtub2RlSURdID0gMTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHNlbGVjdG9yO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvYWRkLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGV4Y2x1ZGVzIGVsZW1lbnRzIGZyb20gY3VycmVudCBzZXQgYnkgZ2l2ZW4gc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdChzZWxlY3Rvcikge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFuZXcgSW5pdCh0aGlzW2ldKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9ub3QuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gZ2V0IHRoZSBkZXNjZW5kYW50cyBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIG1hdGNoZWQgZWxlbWVudHMsXG4vLyBmaWx0ZXJlZCBieSBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG4gICAgbGV0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cbiAgICBub2ZuLmZvckVhY2godGhpcywgZWwgPT4ge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvZmluZC5qc1xuICoqLyIsImltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4uL3VuYmluZG5vZGUnO1xuLy8gcmV0dXJucyBmdW5jdGlvbiB3aGljaCByZS1hZGRzIGJpbmRpbmcgd2hlbiBvYmplY3QgYnJhbmNoIGlzIGNoYW5nZWRcbi8vIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgYnkgYmluZE5vZGUgd2hlbiBzb21ldGhpbmcgbGlrZVxuLy8gJ2Zvby5iYXIuYmF6JyBpcyBwYXNzZWQgdG8gaXQgYXMga2V5IGFyZyB2YWx1ZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQmluZGluZ1N3aXRjaGVyKHtcbiAgICBvYmplY3QsXG4gICAgZGVlcFBhdGgsXG4gICAgJG5vZGVzLFxuICAgIGJpbmRlcixcbiAgICBldmVudE9wdGlvbnMsXG4gICAgYmluZE5vZGVcbn0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gYmluZGluZ1N3aXRjaGVyKGNoYW5nZUV2ZW50ID0ge30pIHtcbiAgICAgICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGxhc3REZWVwUGF0aEl0ZW0gPSBkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDFdO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB2YWx1ZSwgLy8gbmV3IHZhbHVlIG9mIGEgYnJhbmNoXG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlLCAvLyBwcmV2aW91cyB2YWx1ZSBvZiBhIGJyYW5jaFxuICAgICAgICAgICAgcmVzdFBhdGggLy8gcGF0aCBzdGFydGluZyBjdXJyZW50bHkgY2hhbmdlZCBicmFuY2hcbiAgICAgICAgfSA9IGNoYW5nZUV2ZW50O1xuICAgICAgICBsZXQgdGFyZ2V0OyAvLyBhbiBvYmplY3QgdG8gY2FsbCBiaW5kTm9kZVxuICAgICAgICBsZXQgcHJldmlvdXNUYXJnZXQ7IC8vIGFuIG9iamVjdCB0byBjYWxsIHVuYmluZE5vZGVcblxuXG4gICAgICAgIGlmKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgcmVzdFBhdGgpIHtcbiAgICAgICAgICAgIC8vIGlmIHJlc3QgcGF0aCBpcyBnaXZlbiBhbmQgbmV3IHZhbHVlIGlzIGFuIG9iamVjdFxuICAgICAgICAgICAgdGFyZ2V0ID0gdmFsdWU7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3RQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W3Jlc3RQYXRoW2ldXTtcbiAgICAgICAgICAgICAgICBpZighdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHJlc3QgcGF0aCBpcyBub3QgZ2l2ZW5cbiAgICAgICAgICAgIHRhcmdldCA9IG9iamVjdDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGhMZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbZGVlcFBhdGhbaV1dO1xuICAgICAgICAgICAgICAgIGlmKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgcmVzdCBwYXRoIGlzIGdpdmVuIGFuZCBuZXcgdmFsdWUgaXMgYW4gb2JqZWN0XG4gICAgICAgIGlmIChwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0JyAmJiByZXN0UGF0aCkge1xuICAgICAgICAgICAgcHJldmlvdXNUYXJnZXQgPSBwcmV2aW91c1ZhbHVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN0UGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzVGFyZ2V0ID0gcHJldmlvdXNUYXJnZXRbcmVzdFBhdGhbaV1dO1xuICAgICAgICAgICAgICAgIGlmKCFwcmV2aW91c1RhcmdldCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgYmluZGluZyBmb3IgbmV3IHRhcmdldFxuICAgICAgICBpZih0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGJpbmROb2RlKHRhcmdldCwgbGFzdERlZXBQYXRoSXRlbSwgJG5vZGVzLCBiaW5kZXIsIGV2ZW50T3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgYmluZGluZyBmb3IgcHJldmlvdXNseSB1c2VkIG9iamVjdFxuICAgICAgICBpZihwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB1bmJpbmROb2RlKHByZXZpb3VzVGFyZ2V0LCBsYXN0RGVlcFBhdGhJdGVtLCAkbm9kZXMpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvX2NyZWF0ZWJpbmRpbmdzd2l0Y2hlci5qc1xuICoqLyIsImltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi4vX2hlbHBlcnMvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4uL2JpbmRub2RlL19nZXRub2Rlcyc7XG5pbXBvcnQgYmluZE5vZGUgZnJvbSAnLi4vYmluZG5vZGUnO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuLi9vZmYvX3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlVHJlZUxpc3RlbmVyIGZyb20gJy4uL29mZi9fcmVtb3ZldHJlZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVCaW5kaW5nIGZyb20gJy4vX3JlbW92ZWJpbmRpbmcnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJztcblxuLy8gdW5iaW5kcyBhIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGV2ZW50T3B0aW9ucykge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2ZW50T3B0aW9ucyA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBrZXk7XG4gICAgICAgIGtleSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICd1bmJpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbJ2EnLCAnYicsICdjJ10sIG5vZGUpXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiB1bmJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgZXZlbnRPcHRpb25zKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy51bmJpbmROb2RlKFt7IGtleSwgbm9kZSwgYmluZGVyLCBldmVudCB9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlXG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIGl0ZW1Ob2RlLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKGtleSAmJiB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChrZXlPYmpWYWx1ZSwga2V5T2JqS2V5KSA9PiB1bmJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuXG4gICAgZXZlbnRPcHRpb25zID0gZXZlbnRPcHRpb25zIHx8IHt9O1xuICAgIGNvbnN0IHsgZGVlcCB9ID0gZXZlbnRPcHRpb25zO1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICBpZighZGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcyB9ID0gZGVmO1xuXG4gICAgLy8gYWxsb3cgdG8gcGFzcyBudWxsIG9yIHVuZGVmaW5lZCBhcyBrZXlcbiAgICAvLyBpZiBwYXNzZWQgdGhlbiByZW1vdmUgYmluZGluZ3Mgb2YgYWxsIGtleXMgZm9yIGdpdmVuIG9iamVjdFxuICAgIGlmKGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHByb3BzSXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBudWxsLCBldmVudE9wdGlvbnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWxlZ2F0ZWQgYmluZGluZ1xuICAgIGlmKGRlZXAgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG4gICAgICAgIGlmIChkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGhMZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGRvIHdlIG5lZWQgdG8gdGhyb3cgZXJyb3Igd2hlbiB0YXJnZXQgaXMgZmFsc3k/XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETyBCVUcgdGhpcyBtYXkgdW5kZWxlZ2F0ZSBsaXN0ZW5lciBmb3IgYWxsIGJpbmRpbmdzIHdpdGggdGhlIHNhbWUgcGF0aCAoY2Fubm90IHJlcHJvZHVjZSlcbiAgICAgICAgICAgIHJlbW92ZVRyZWVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMikpO1xuXG4gICAgICAgICAgICB1bmJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgbm9kZSwgZXZlbnRPcHRpb25zKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyB3aGVuIG5vIHByb3BkZWYgZG8gbm90aGluZ1xuICAgIGlmKCFwcm9wRGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0IGhhdmUgYW55IGJpbmRpbmdzIGRvIG5vdGhpbmdcbiAgICBpZighYmluZGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBub2RlIGlzIHBhc2VkIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuICAgIGlmKCFub2RlKSB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2ZW50T3B0aW9ucyB9LCBiaW5kaW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5vZGVzIGFuZCAkbm9kZXMgZm9yIE1hdHJlc2hrYSBpbnN0YW5jZVxuICAgICAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcbiAgICBjb25zdCByZXRhaW5CaW5kaW5ncyA9IFtdO1xuICAgIGNvbnN0IHJldGFpbk5vZGVzID0gW107XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIGJpbmRuZ3MgYW5kIGNvbXBhcmUgdGhlaXIgbm9kZSB3aXRoIGdpdmVuIG5vZGVzXG4gICAgbm9mbi5mb3JFYWNoKCRub2Rlcywgbm9kZXNJdGVtID0+IHtcbiAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmKGJpbmRpbmcubm9kZSA9PT0gbm9kZXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldmVudE9wdGlvbnMgfSwgYmluZGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldGFpbkJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gICAgICAgICAgICAgICAgcmV0YWluTm9kZXMucHVzaChub2Rlc0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgaWYocmV0YWluTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3Qubm9kZXNba2V5XSA9IHJldGFpbk5vZGVzWzBdO1xuICAgICAgICAgICAgb2JqZWN0LiRub2Rlc1trZXldID0gZG9tLiQocmV0YWluTm9kZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC5ub2Rlc1trZXldXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LiRub2Rlc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGJpbmRpbmdzIG9iamVjdFxuICAgIGlmKHJldGFpbkJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9wRGVmLmJpbmRpbmdzID0gcmV0YWluQmluZGluZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdW5iaW5kbm9kZS9pbmRleC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vX3JlbW92ZWxpc3RlbmVyJztcblxuLy8gcmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgZnJvbSBhbiBvYmplY3QgYnkgZ2l2ZW4gcGF0aFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZ2l2ZW5QYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSB7XG5cdFx0cmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcblxuICAgIGxldCBwYXRoID0gdHlwZW9mIGdpdmVuUGF0aCA9PT0gJ3N0cmluZycgJiYgZ2l2ZW5QYXRoICE9PSAnJyA/IGdpdmVuUGF0aC5zcGxpdCgnLicpIDogZ2l2ZW5QYXRoO1xuXG4gICAgaWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBubyBwYXRoIHRoZW4gcmVtb3ZlIGxpc3RlbmVyXG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdO1xuICAgICAgICBsZXQgcGF0aFN0cjtcblxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwYXRoID0gbm9mbi5zbGljZShwYXRoLCAxKTtcbiAgICAgICAgICAgIHBhdGhTdHIgPSBwYXRoLmpvaW4oJy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGggPSBbXTtcbiAgICAgICAgICAgIHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmV0YWluID0gW107XG4gICAgICAgICAgICBub2ZuLmZvckVhY2goZXZlbnRzLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmluZm8ucGF0aFN0ciAhPT0gcGF0aFN0cikge1xuICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdID0gcmV0YWluO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgYWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3Rba2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2ZmL191bmRlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wibmFtZVwiLCBcImV2ZW50c1wiXSB9XSovXG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuXG4vLyByZW1vdmVzIHNpbXBsZSBldmVudCBsaXN0ZW5lciB0byBhbiBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikgcmV0dXJuO1xuXG4gICAgY29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXTtcbiAgICBjb25zdCByZXRhaW4gPSBbXTtcbiAgICBjb25zdCBub1RyaWdnZXIgPSBuYW1lID8gbmFtZVswXSA9PT0gJ18nIDogZmFsc2U7XG5cbiAgICAvLyBpZiBhbGwgZXZlbnRzIG5lZWQgdG8gYmUgcmVtb3ZlZFxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFub1RyaWdnZXIpIHtcbiAgICAgICAgICAgIG5vZm4uZm9yT3duKGFsbEV2ZW50cywgKGV2ZW50cywgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGV2dC5jYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGV2dC5jb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzdG9yZSBkZWZhdWx0IHZhbHVlIG9mIFwiZXZlbnRzXCJcbiAgICAgICAgZGVmLmV2ZW50cyA9IHt9O1xuICAgIH0gZWxzZSBpZiAoZXZlbnRzKSB7XG4gICAgICAgIC8vIGlmIGV2ZW50cyB3aXRoIGdpdmVuIG5hbWUgYXJlIGZvdW5kXG4gICAgICAgIG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG4gICAgICAgICAgICBjb25zdCBhcmdDYWxsYmFjayA9IGNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayB8fCBjYWxsYmFjaztcbiAgICAgICAgICAgIGNvbnN0IGV2dENhbGxiYWNrID0gZXZ0LmNhbGxiYWNrLl9jYWxsYmFjayB8fCBldnQuY2FsbGJhY2s7XG5cbiAgICAgICAgICAgIGlmIChhcmdDYWxsYmFjayAmJiBhcmdDYWxsYmFjayAhPT0gZXZ0Q2FsbGJhY2tcbiAgICAgICAgICAgICAgICB8fCAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldnQuY29udGV4dCkpIHtcbiAgICAgICAgICAgICAgICAvLyBrZWVwIGV2ZW50XG4gICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZ0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGV2dC5jYWxsYmFjayxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZXZ0LmNvbnRleHRcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKCFub1RyaWdnZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBhbGxFdmVudHNbbmFtZV0gPSByZXRhaW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZGVmLmV2ZW50c1tuYW1lXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybjtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29mZi9fcmVtb3ZlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5cbi8vIHJlbW92ZXMgdHJlZSBsaXN0ZW5lciBmcm9tIGFsbCBvYmplY3QgdHJlZSBvZiBmaXZlbiBwYXRoXG4vLyBUT0RPOiBQYXNzIGNvbnRleHQgdG8gcmVtb3ZlVHJlZUxpc3RlbmVyXG4vLyBUT0RPOiBQYXNzIGluZm8gdG8gcmVtb3ZlVHJlZUxpc3RlbmVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVUcmVlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aCwgaGFuZGxlcikge1xuICAgIGlmKHR5cGVvZiBkZWVwUGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZGVlcFBhdGggPSBkZWVwUGF0aC5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBrZXlzIG9mIHRoZSBwYXRoIGFuZCB1bmRlbGVnYXRlIGdpdmVuIGhhbmRsZXIgKGNhbiBiZSB1bmRlZmluZWQpXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIFRPRE86IEFycmF5LnByb3RvdHlwZS5zbGljZSBpcyBzbG93XG4gICAgICAgIGNvbnN0IGxpc3RlblBhdGggPSBkZWVwUGF0aC5zbGljZSgwLCBpKTtcblxuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIoXG4gICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICBsaXN0ZW5QYXRoLFxuICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2ldfWAsXG4gICAgICAgICAgICBoYW5kbGVyXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIHRoZSBmdW5jdGlvbiByZW1vdmVzIHNpbmdsZSBiaW5kaW5nIGZvciBzaW5nbGUgb2JqZWN0XG4vLyBjYWxsZWQgYnkgdW5iaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldmVudE9wdGlvbnMgfSwge1xuICAgIG9wdGlvbnMsXG4gICAgYmluZGVyLFxuICAgIG5vZGUsXG4gICAgbm9kZUhhbmRsZXIsXG4gICAgb2JqZWN0SGFuZGxlclxufSkge1xuICAgIGNvbnN0IHsgZGVzdHJveSwgb24gfSA9IGJpbmRlcjtcbiAgICBjb25zdCB7IHNpbGVudCB9ID0gZXZlbnRPcHRpb25zO1xuXG4gICAgLy8gaWYgXCJvblwiIGlzIGZ1bmN0aW9uIGRpc2FibGUgaXRcbiAgICAvLyB3ZSBjYW5ub3QgdHVybiBvZmYgY3VzdG9tIGxpc3RlbmVyIGRlZmluZWQgYnkgYSBwcm9ncmFtbWVyXG4gICAgLy8gcHJvZ3JhbW1lciBuZWVkcyB0byByZW1vdmUgY3VzdG9tIGxpc3RlbmVyIG1hdWFsbHkgdmlhIGJpbmRlci5kZXN0cm95XG4gICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb24gPT09ICdzdHJpbmcnKXtcbiAgICAgICAgLy8gcmVtb3ZlIERPTSBldmVudCBsaXN0ZW5lclxuICAgICAgICAvLyByZW1vdmVFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgbm9mbi5mb3JFYWNoKG9uLnNwbGl0KHNwYWNlUmVnKSxcbiAgICAgICAgICAgIGV2dE5hbWUgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9iamVjdCBldmVudCBsaXN0ZW5lclxuICAgIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cbiAgICAvLyBpZiBiaW5kZXIuZGVzdHJveSBpcyBnaXZlbiBjYWxsIGl0XG4gICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgZGVzdHJveS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdmVudE9wdGlvbnMgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlXG4gICAgICAgIH0sIGV2ZW50T3B0aW9ucyk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGB1bmJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdmVudE9wdGlvbnMpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3VuYmluZCcsIGV4dGVuZGVkRXZlbnRPcHRpb25zKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91bmJpbmRub2RlL19yZW1vdmViaW5kaW5nLmpzXG4gKiovIiwiaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnLi4vbG9va2ZvcmJpbmRlcic7XG5pbXBvcnQgY3JlYXRlTm9kZUhhbmRsZXIgZnJvbSAnLi9fY3JlYXRlbm9kZWhhbmRsZXInO1xuaW1wb3J0IGNyZWF0ZU9iamVjdEhhbmRsZXIgZnJvbSAnLi9fY3JlYXRlb2JqZWN0aGFuZGxlcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL19oZWxwZXJzL2RlYm91bmNlJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIGhhbmRsZXMgYmluZGluZyBmb3Igc2luZ2xlIHByb3BlcnR5ICYgbm9kZVxuLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgYXQgYmluZE5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgIGJpbmRlcjogZ2l2ZW5CaW5kZXIsXG4gICAga2V5LFxuICAgICRub2RlcyxcbiAgICBub2RlLFxuICAgIGV2ZW50T3B0aW9ucyxcbiAgICBwcm9wRGVmXG59KSB7XG4gICAgY29uc3Qge1xuICAgICAgICBzaWxlbnQsXG4gICAgICAgIGFzc2lnbkRlZmF1bHRWYWx1ZSxcbiAgICAgICAgZGVib3VuY2U6IGRlYm91bmNlT3B0aW9uPXRydWVcbiAgICB9ID0gZXZlbnRPcHRpb25zO1xuICAgIC8vIGNyZWF0ZSBiaW5kaW5ncyBhcnJheSBpbiBwcm9wZXJ0eSBkZWZpbml0aW9uIG9iamVjdFxuICAgIGNvbnN0IGJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBsZXQgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCBiaW5kaW5nT3B0aW9ucyA9IHtcbiAgICAgICAgc2VsZjogb2JqZWN0LFxuICAgICAgICBrZXksXG4gICAgICAgIHZhbHVlLFxuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGVcbiAgICB9O1xuICAgIGxldCBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgb2JqZWN0SGFuZGxlcjtcbiAgICBsZXQgbm9kZUhhbmRsZXI7XG5cbiAgICAvLyBnZXQgYWN0dWFsIGJpbmRlclxuICAgIGlmIChnaXZlbkJpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cbiAgICAgICAgaWYgKGZvdW5kQmluZGVyKSB7XG4gICAgICAgICAgICBpZiAoZ2l2ZW5CaW5kZXIpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihmb3VuZEJpbmRlciwgZ2l2ZW5CaW5kZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiaW5kZXIgPSBmb3VuZEJpbmRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpbmRlciA9IGdpdmVuQmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBnZXRWYWx1ZSwgc2V0VmFsdWUsIG9uLCBpbml0aWFsaXplIH0gPSBiaW5kZXI7XG5cbiAgICAvLyBjYWxsIGJpbmRlci5pbml0aWFsaXplXG4gICAgaWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIGJpbmRpbmdPcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBjYWxscyBnZXRWYWx1ZSBpbW1lZGlhdGVseSBhbmQgcmVhc3NpZ24gYSBwcm9wZXJ0eVxuICAgIC8vIHdoZW4gYWxsIHJlcXVpcmVkIGNvbmRpdGlvbnMgYXJlIG1ldCBmb3IgdGhpc1xuICAgIGlmIChnZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBhc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG4gICAgICAgIHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBiaW5kaW5nT3B0aW9ucyk7XG4gICAgICAgIGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcblxuICAgICAgICBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBub2ZuLmFzc2lnbih7IGZyb21Ob2RlOiB0cnVlIH0sIGV2ZW50T3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8vIGFkZCBuZWVkZWQgZXZlbnQgaGFuZGxlcnMgdGhlIG9iamVjdCB3aGVuIHNldFZhbHVlIGlzIGdpdmVuXG4gICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgIG9iamVjdEhhbmRsZXIgPSBjcmVhdGVPYmplY3RIYW5kbGVyKHtcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBwcm9wRGVmLFxuICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgYmluZGluZ09wdGlvbnMsXG4gICAgICAgICAgICBldmVudE9wdGlvbnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYnkgZGVmYXVsdCBkZWJvdW5jaW5nIGlzIG9uXG4gICAgICAgIC8vIGl0IGNhbiBiZSB0dXJuZWQgb2ZmIGJ5IHBhc3NpbmcgZGVib3VuY2U9ZmFsc2UgdG8gZXZlbnQgb2JqZWN0XG4gICAgICAgIGlmIChkZWJvdW5jZU9wdGlvbiB8fCBkZWJvdW5jZU9wdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSB0eXBlb2YgZGVib3VuY2VPcHRpb24gPT09ICdudW1iZXInID8gZGVib3VuY2VPcHRpb24gOiAwO1xuICAgICAgICAgICAgb2JqZWN0SGFuZGxlciA9IGRlYm91bmNlKG9iamVjdEhhbmRsZXIsIGRlbGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlciwgb2JqZWN0LCB7IHNraXBDaGVja3M6IHRydWUgfSk7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2JqZWN0SGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgbm9kZSB3aGVuIGdldFZhbHVlICYgb24gYXJlIGdpdmVuXG4gICAgaWYgKGdldFZhbHVlICYmIG9uKSB7XG4gICAgICAgIG5vZGVIYW5kbGVyID0gY3JlYXRlTm9kZUhhbmRsZXIoe1xuICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHByb3BEZWYsXG4gICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICBiaW5kaW5nT3B0aW9uc1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBUT0RPOiBUaHJvdyBlcnJvciB3aGVuIFwib25cIiBhbmQgbWF5YmUgb3RoZXIgYmluZGVyIHByb3BlcnRpZXMgaGFzIHdyb25nIHR5cGVcbiAgICAgICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb24uY2FsbChub2RlLCBub2RlSGFuZGxlciwgYmluZGluZ09wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvbiA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG4gICAgICAgICAgICBub2ZuLmZvckVhY2gob24uc3BsaXQoc3BhY2VSZWcpLFxuICAgICAgICAgICAgICAgIGV2dE5hbWUgPT4gbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgYmluZGluZyBkYXRhIHRvIGJpbmRpbmdzIGFycmF5XG4gICAgYmluZGluZ3MucHVzaCh7XG4gICAgICAgIG9uLFxuICAgICAgICBub2RlLFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIG9iamVjdEhhbmRsZXIsXG4gICAgICAgIG5vZGVIYW5kbGVyLFxuICAgICAgICBiaW5kaW5nT3B0aW9uc1xuICAgIH0pO1xuXG4gICAgLy8gZmlyZSBldmVudHNcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBjb25zdCBleHRlbmRlZEV2ZW50T3B0aW9ucyA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfSwgZXZlbnRPcHRpb25zKTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYGJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdmVudE9wdGlvbnMpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ2JpbmQnLCBleHRlbmRlZEV2ZW50T3B0aW9ucyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvX2JpbmRzaW5nbGVub2RlLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHRCaW5kZXJzIGZyb20gJy4vZGVmYXVsdGJpbmRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmYXVsdEJpbmRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9IGRlZmF1bHRCaW5kZXJzW2ldLmNhbGwobm9kZSwgbm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb29rZm9yYmluZGVyLmpzXG4gKiovIiwiaW1wb3J0IGlucHV0IGZyb20gJy4vYmluZGVycy9pbnB1dCc7XG5pbXBvcnQgdGV4dGFyZWEgZnJvbSAnLi9iaW5kZXJzL3RleHRhcmVhJztcbmltcG9ydCBzZWxlY3QgZnJvbSAnLi9iaW5kZXJzL3NlbGVjdCc7XG5pbXBvcnQgcHJvZ3Jlc3MgZnJvbSAnLi9iaW5kZXJzL3Byb2dyZXNzJztcbmltcG9ydCBvdXRwdXQgZnJvbSAnLi9iaW5kZXJzL291dHB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IFtub2RlID0+IHtcbiAgICBzd2l0Y2gobm9kZS50YWdOYW1lKSB7XG4gICAgICAgIGNhc2UgJ0lOUFVUJzpcbiAgICAgICAgICAgIHJldHVybiBpbnB1dChub2RlLnR5cGUpO1xuICAgICAgICBjYXNlICdURVhUQVJFQSc6XG4gICAgICAgICAgICByZXR1cm4gdGV4dGFyZWEoKTtcbiAgICAgICAgY2FzZSAnU0VMRUNUJzpcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3Qobm9kZS5tdWx0aXBsZSk7XG4gICAgICAgIGNhc2UgJ1BST0dSRVNTJzpcbiAgICAgICAgICAgIHJldHVybiBwcm9ncmVzcygpO1xuICAgICAgICBjYXNlICdPVVRQVVQnOlxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dCgpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufV07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWZhdWx0YmluZGVycy5qc1xuICoqLyIsImltcG9ydCBpcyBmcm9tICcuLi9faGVscGVycy9pcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbi8vIHJldHVybnMgYSBmdW5jdGlvbiB3aGljaCBjYWxsZWQgd2hlbiBib3VuZCBub2RlIHN0YXRlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU5vZGVIYW5kbGVyKHtcbiAgICBvYmplY3QsXG4gICAga2V5LFxuICAgIG5vZGUsXG4gICAgcHJvcERlZixcbiAgICBiaW5kZXIsXG4gICAgYmluZGluZ09wdGlvbnNcbn0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbm9kZUhhbmRsZXIoZG9tRXZlbnQgPSB7fSkge1xuICAgICAgICAvLyBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWUgaXMgc2V0IGluIHVuYmluZE5vZGVcbiAgICAgICAgLy8gd2UgY2Fubm90IFwidHVybiBvZmZcIiBiaW5kZXIub24gd2hlbiBpdHMgdmFsdWUgaXMgZnVuY3Rpb25cbiAgICAgICAgLy8gZGV2ZWxvcGVyIG5lZWRzIHRvIGNsZWFuIG1lbW9yeSAodHVybiBvZmYgY2FsbGJhY2spIG1hbnVhbHkgaW4gYmluZGVyLmRlc3Ryb3lcbiAgICAgICAgaWYobm9kZUhhbmRsZXIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBwcm9wRGVmLnZhbHVlO1xuICAgICAgICBjb25zdCB7IHdoaWNoLCB0YXJnZXQgfSA9IGRvbUV2ZW50O1xuICAgICAgICBjb25zdCB7IGdldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBkb21FdmVudC5vcmlnaW5hbEV2ZW50IHx8IGRvbUV2ZW50LCAvLyBqUXVlcnkgdGhpbmdcbiAgICAgICAgICAgIC8vIHdpbGwgdGhyb3cgXCJwcmV2ZW50RGVmYXVsdCBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcbiAgICAgICAgICAgIC8vIHdpbGwgdGhyb3cgXCJzdG9wUHJvcGFnYXRpb24gaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiAoKSA9PiBkb21FdmVudC5zdG9wUHJvcGFnYXRpb24oKSxcbiAgICAgICAgICAgIHdoaWNoLFxuICAgICAgICAgICAgdGFyZ2V0XG4gICAgICAgIH0sIGJpbmRpbmdPcHRpb25zKSk7XG5cbiAgICAgICAgaWYgKCFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYWRkIGRlc2NyaXB0aW9uIG9mIGEgaGFja1xuICAgICAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgY2hhbmdlZE5vZGUsIG9uQ2hhbmdlVmFsdWUsIGJpbmRlcj9cbiAgICAgICAgICAgIHNldChvYmplY3QsIGtleSwgdmFsdWUsIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjaGFuZ2VkTm9kZTogbm9kZSxcbiAgICAgICAgICAgICAgICBvbkNoYW5nZVZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBiaW5kZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvX2NyZWF0ZW5vZGVoYW5kbGVyLmpzXG4gKiovIiwiLy8gcmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIGlzIGNhbGxlZCB3aGVuIHByb3BlcnR5IHZhbHVlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZU9iamVjdEhhbmRsZXIoe1xuICAgIG5vZGUsXG4gICAgcHJvcERlZixcbiAgICBiaW5kZXIsXG4gICAgYmluZGluZ09wdGlvbnMsXG4gICAgZXZlbnRPcHRpb25zXG59KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9iamVjdEhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG4gICAgICAgIGNvbnN0IHsgb25DaGFuZ2VWYWx1ZSwgY2hhbmdlZE5vZGUsIGJpbmRlcjogZXZ0QmluZGVyIH0gPSBldmVudE9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHsgc2V0VmFsdWUgfSA9IGJpbmRlcjtcbiAgICAgICAgLy8gZGlydHkgaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcbiAgICAgICAgY29uc3QgZGlydHlIYWNrVmFsdWUgPSBvbkNoYW5nZVZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IFN0cmluZyh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgICAgICBpZiAoY2hhbmdlZE5vZGUgPT09IG5vZGUgJiYgb25DaGFuZ2VWYWx1ZSA9PT0gZGlydHlIYWNrVmFsdWUgJiYgZXZ0QmluZGVyID09PSBiaW5kZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFZhbHVlLmNhbGwobm9kZSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgdmFsdWUgfSwgYmluZGluZ09wdGlvbnMpKTtcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvX2NyZWF0ZW9iamVjdGhhbmRsZXIuanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiZXZ0XCJdIH1dKi9cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuXG4vLyBwcm9wZXJ0eSBtb2RpZmllciBldmVudCByZWdleHBcbmNvbnN0IHByb3BNb2RFdmVudFJlZ1xuICAgID0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5fY2hhbmdlOnRyZWU6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuICAgIC8vZG9tIGV2ZW50IHJlZyAgLyhbXlxcOlxcOl0rKSg6OihbXlxcKFxcKV0rKT8oXFwoKC4qKVxcKSk/KT8vO1xuXG4vLyBhZGRzIHNpbXBsZSBldmVudCBsaXN0ZW5lclxuLy8gdXNlZCBhcyBjb3JlIG9mIGV2ZW50IGVuZ2luZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG4gICAgY29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gaW5pdE1LKG9iamVjdCk7XG4gICAgY29uc3QgY3R4ID0gY29udGV4dCB8fCBvYmplY3Q7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IGV2dCA9IHsgY2FsbGJhY2ssIGNvbnRleHQsIGN0eCwgbmFtZSwgaW5mbyB9O1xuICAgIGNvbnN0IHsgc2tpcENoZWNrcz1mYWxzZSB9ID0gaW5mbztcblxuICAgIC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lXG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgICBpZighc2tpcENoZWNrcykge1xuICAgICAgICAgICAgLy8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIGRhdGEsIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICAgICAgY29uc3QgYXJnQ2FsbGJhY2sgPSBjYWxsYmFjayAmJiBjYWxsYmFjay5fY2FsbGJhY2sgfHwgY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZ0Q2FsbGJhY2sgPSBldnQuY2FsbGJhY2suX2NhbGxiYWNrIHx8IGV2dC5jYWxsYmFjaztcbiAgICAgICAgICAgICAgICBpZiAoYXJnQ2FsbGJhY2sgPT09IGV2dENhbGxiYWNrICYmIGV2dC5jb250ZXh0ID09PSBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgZXZlbnQgaXNuJ3QgZm91bmQgYWRkIGl0IHRvIHRoZSBldmVudCBsaXN0XG4gICAgICAgIGV2ZW50cy5wdXNoKGV2dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUsIGNyZWF0ZSBhcnJheSB3aXRoIG9ubHkgZWJlbnRcbiAgICAgICAgYWxsRXZlbnRzW25hbWVdID0gW2V2dF07XG4gICAgfVxuXG4gICAgaWYgKHByb3BNb2RFdmVudFJlZy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIC8vIGRlZmluZSBuZWVkZWQgYWNjZXNzb3JzIGZvciBLRVlcbiAgICAgICAgZGVmaW5lUHJvcChvYmplY3QsIG5hbWUucmVwbGFjZShwcm9wTW9kRXZlbnRSZWcsICcnKSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYGFkZGV2ZW50OiR7bmFtZX1gLCBldnQpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ2FkZGV2ZW50JywgZXZ0KTtcbiAgICB9XG5cbiAgICAvLyBpZiBldmVudCBpcyBhZGRlZCByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2FkZGxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4uL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgaXMgZnJvbSAnLi4vX2hlbHBlcnMvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gc29tZSBwYXJ0IG9mIGEgcGF0aCBpcyBjaGFuZ2VkXG4vLyBpdCBkZWxlZ2F0ZXMgZXZlbnQgbGlzdGVuZXIgZm9yIG5ldyBicmFuY2ggb2YgYW4gb2JqZWN0IGFuZCB1bmRlbGVnYXRlcyBpdCBmb3Igb2xkIG9uZVxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG4gICAgcHJldmlvdXNWYWx1ZSxcbiAgICB2YWx1ZVxufSwge1xuICAgIHBhdGgsXG4gICAgbmFtZSxcbiAgICBjYWxsYmFjayxcbiAgICBjb250ZXh0LFxuICAgIGluZm9cbn0gPSB0cmlnZ2VyT25lLmxhdGVzdEV2ZW50LmluZm8uZGVsZWdhdGVkRGF0YSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIodmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9XG5cbiAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKHByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9XG59XG5cbi8vIGFkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIHRvIGFuIG9iamVjdCBieSBnaXZlbiBwYXRoXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZ2l2ZW5QYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHtmb286ICdiYXInfSkge1xuICAgIC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIGFkZCBzaW1wbGUgbGlzdGVuZXJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBkbyBhbGwgbWFnaWNcbiAgICAgICAgY29uc3Qga2V5ID0gcGF0aFswXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgIGluZm9cbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IFwic2V0XCJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuICAgICAgICAgICAgZGVsZWdhdGVkRGF0YSxcbiAgICAgICAgICAgIHBhdGhTdHJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIG1hbnVhbGx5XG4gICAgICAgIGNoYW5nZUhhbmRsZXIoe1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldXG4gICAgICAgIH0sIGRlbGVnYXRlZERhdGEpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uL19kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi9fZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlVHJlZUxpc3RlbmVyIGZyb20gJy4uL29mZi9fcmVtb3ZldHJlZWxpc3RlbmVyJztcblxuLy8gY3JlYXRlcyB0cmVlIGxpc3RlbmVyXG5mdW5jdGlvbiBjcmVhdGVUcmVlTGlzdGVuZXIoeyBoYW5kbGVyLCByZXN0UGF0aCB9KSB7XG4gICAgY29uc3QgbmV3SGFuZGxlciA9IGZ1bmN0aW9uIHRyZWVMaXN0ZW5lcihjaGFuZ2VFdnQpIHtcbiAgICAgICAgY29uc3QgbmV3Q2hhbmdlRXZlbnQgPSBub2ZuLmFzc2lnbih7IHJlc3RQYXRoIH0sIGNoYW5nZUV2dCk7XG4gICAgICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZSwgdmFsdWUgfSA9IGNoYW5nZUV2dDtcblxuICAgICAgICAvLyByZW1vdmVzIGxpc3RlbmVyIGZvciBhbGwgYnJhbmNoZXMgb2YgdGhlIHBhdGggb24gb2xkIG9iamVjdFxuICAgICAgICBpZihwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmVtb3ZlVHJlZUxpc3RlbmVyKHByZXZpb3VzVmFsdWUsIHJlc3RQYXRoLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZHMgbGlzdGVuZXIgZm9yIGFsbCBicmFuY2hlcyBvZiBcInJlc3RQYXRoXCIgcGF0aCBvbiBuZXdseSBhc3NpZ25lZCBvYmplY3RcbiAgICAgICAgaWYodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgYWRkVHJlZUxpc3RlbmVyKHZhbHVlLCByZXN0UGF0aCwgaGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWxsIG9yaWdpbmFsIGhhbmRsZXJcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIG5ld0NoYW5nZUV2ZW50KTtcbiAgICB9XG5cbiAgICBuZXdIYW5kbGVyLl9jYWxsYmFjayA9IGhhbmRsZXI7XG5cbiAgICByZXR1cm4gbmV3SGFuZGxlcjtcbn1cblxuLy8gbGlzdGVucyBjaGFuZ2VzIGZvciBhbGwgYnJhbmNoZXMgb2YgZ2l2ZW4gcGF0aFxuLy8gVE9ETzogUGFzcyBjb250ZXh0IHRvIGFkZFRyZWVMaXN0ZW5lclxuLy8gVE9ETzogUGFzcyBpbmZvIHRvIGFkZFRyZWVMaXN0ZW5lclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkVHJlZUxpc3RlbmVyKG9iamVjdCwgZGVlcFBhdGgsIGhhbmRsZXIpIHtcbiAgICBpZih0eXBlb2YgZGVlcFBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRlZXBQYXRoID0gZGVlcFBhdGguc3BsaXQoJy4nKTtcbiAgICB9XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIGtleXMgYW5kIGRlbGVnYXRlIGxpc3RlbmVyIGZvciBhbGwgb2JqZWN0cyBvZiBnaXZlbiBicmFuY2hcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gVE9ETzogQXJyYXkucHJvdG90eXBlLnNsaWNlIG1ldGhvZCBpcyBzbG93XG4gICAgICAgIGNvbnN0IGxpc3RlblBhdGggPSBkZWVwUGF0aC5zbGljZSgwLCBpKTtcbiAgICAgICAgY29uc3QgcmVzdFBhdGggPSBkZWVwUGF0aC5zbGljZShpICsgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihcbiAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIGxpc3RlblBhdGgsXG4gICAgICAgICAgICBgX2NoYW5nZTp0cmVlOiR7ZGVlcFBhdGhbaV19YCxcbiAgICAgICAgICAgIGNyZWF0ZVRyZWVMaXN0ZW5lcih7XG4gICAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgICByZXN0UGF0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi9fYWRkdHJlZWxpc3RlbmVyLmpzXG4gKiovIiwiXG54ZGVzY3JpYmUoJ0JpbmRpbmdzIHBhcnNlcicsICgpID0+IHtcblx0aXQoJ3Nob3VsZCBiaW5kIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHNwYW4+e3t4fX08L3NwYW4+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcblxuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2hpJztcbiAgICAgICAgZXhwZWN0KG5vZGUuZmlyc3RDaGlsZC5pbm5lckhUTUwpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgSFRNTCB1c2luZyBNYXRyZXNoa2EgaW5zdGFuY2UgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxzcGFuPnt7eH19PC9zcGFuPicpLFxuICAgICAgICAgICAgbWsgPSBuZXcgTUs7XG5cbiAgICAgICAgbWsucGFyc2VCaW5kaW5ncyhub2RlKTtcbiAgICAgICAgbWsueCA9ICdoaSc7XG4gICAgICAgIGV4cGVjdChub2RlLmZpcnN0Q2hpbGQuaW5uZXJIVE1MKS50b0VxdWFsKG1rLngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJ7e3h9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnaGV5JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNoZWNrZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ7e3h9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSB0cnVlO1xuICAgICAgICBleHBlY3Qobm9kZS5jaGVja2VkKS50b0VxdWFsKG9iamVjdC54KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0YXJlYXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHRleHRhcmVhIHZhbHVlPVwie3t4fX1cIj48L3RleHRhcmVhPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNvbXBsZXggYXR0cnMnLCAoKSA9PiB7d2luZG93Lm9sb2xvc2hhID0gdHJ1ZTtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8YSBocmVmPVwie3t4fX0ve3t5fX1cIj48L2E+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdiYXInO1xuICAgICAgICBvYmplY3QueSA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkudG9FcXVhbChvYmplY3QueCArICcvJyArIG9iamVjdC55KTt3aW5kb3cub2xvbG9zaGEgPSBmYWxzZTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBjb21wbGV4IHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJ7e3h9fSBhbmQge3t5fX1cIj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jhcic7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54ICsgJyBhbmQgJyArIG9iamVjdC55KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGRudCBjcmVhdGUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cInt7eH19IGFuZCB7e3l9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LnkgPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LnggKyAnIGFuZCAnICsgb2JqZWN0LnkpO1xuICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMob2JqZWN0KSkudG9FcXVhbChbJ3gnLCAneSddKTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBuZXN0ZWQgbm9kZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcShgXG4gICAgICAgICAgICA8ZGl2Pnt7eH19XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwie3t5fX1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiaGV5IHt7en19XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApLFxuICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdmb28nO1xuICAgICAgICBvYmplY3QueSA9ICdiYXInO1xuICAgICAgICBvYmplY3QueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5pbm5lckhUTUwuaW5kZXhPZignPHNwYW4+JyArIG9iamVjdC54ICsgJzwvc3Bhbj4nKSkudG9FcXVhbCgwKTtcbiAgICAgICAgZXhwZWN0KHEoJ2lucHV0Jywgbm9kZSkudmFsdWUpLnRvRXF1YWwob2JqZWN0LnkpO1xuICAgICAgICBleHBlY3QocSgnW2F0dHJdJywgbm9kZSkuZ2V0QXR0cmlidXRlKCdhdHRyJykpLnRvRXF1YWwoJ2hleSAnICsgb2JqZWN0LnopO1xuICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMob2JqZWN0KS5zb3J0KCkpLnRvRXF1YWwoWyd4JywgJ3knLCAneiddKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgbmVzdGVkIG5vZGVzIGFuZCBkZWVwIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcShgXG4gICAgICAgICAgICA8ZGl2Pnt7YS5ifX1cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCJ7e2MuZH19XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImhleSB7e2UuZn19XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApLFxuICAgICAgICBvYmplY3QgPSB7XG4gICAgICAgICAgICBhOiB7YjogMX0sXG4gICAgICAgICAgICBjOiB7ZDogMn0sXG4gICAgICAgICAgICBlOiB7ZjogMn1cbiAgICAgICAgfTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QuYS5iID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC5jLmQgPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LmUuZiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5pbm5lckhUTUwuaW5kZXhPZignPHNwYW4+JyArIG9iamVjdC5hLmIgKyAnPC9zcGFuPicpKS50b0VxdWFsKDApO1xuICAgICAgICBleHBlY3QocSgnaW5wdXQnLCBub2RlKS52YWx1ZSkudG9FcXVhbChvYmplY3QuYy5kKTtcbiAgICAgICAgZXhwZWN0KHEoJ1thdHRyXScsIG5vZGUpLmdldEF0dHJpYnV0ZSgnYXR0cicpKS50b0VxdWFsKCdoZXkgJyArIG9iamVjdC5lLmYpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2hlbiBicmFja2V0cyBhcmUgcmVkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cIltbeF1dIHlvdVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge30sXG5cdFx0XHRkZWZhdWx0QnJhY2tldHMgPSBtYWdpYy5wYXJzZXJCcmFja2V0cztcblxuXHRcdG1hZ2ljLnBhcnNlckJyYWNrZXRzID0ge1xuXHRcdFx0bGVmdDogJ1tbJyxcblx0XHRcdHJpZ2h0OiAnXV0nXG5cdFx0fTtcblxuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2hleSc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54ICsgJyB5b3UnKTtcblxuXHRcdG1hZ2ljLnBhcnNlckJyYWNrZXRzID0gZGVmYXVsdEJyYWNrZXRzO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcbmltcG9ydCBiaW5kT3B0aW9uYWxOb2RlIGZyb20gJ3NyYy9iaW5kb3B0aW9uYWxub2RlJztcbmltcG9ydCBiaW5kU2FuZGJveCBmcm9tICdzcmMvYmluZHNhbmRib3gnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnc3JjL3VuYmluZG5vZGUnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICdzcmMvc2VsZWN0JztcbmltcG9ydCBzZWxlY3RBbGwgZnJvbSAnc3JjL3NlbGVjdGFsbCc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQmluZGluZ3MnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuICAgIGxldCBvYmo7XG4gICAgbGV0IG5vZGU7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgc2ltdWxhdGVEb21FdmVudDtcbiAgICBsZXQgaW5pdGlhbGl6ZUNhbGw7XG4gICAgbGV0IGRlc3Ryb3lDYWxsO1xuXG4gICAgY29uc3QgdGVzdFNpbXBsZUJpbmQgPSAoa2V5ID0gJ3gnKSA9PiB7XG4gICAgICAgIG9ialtrZXldID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqW2tleV0pLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgdGVzdFNpbXBsZVVuYmluZCA9ICgpID0+IHtcbiAgICAgICAgb2JqLnggPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jheic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIGV4cGVjdChkZXN0cm95Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb2JqID0ge307XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBpbml0aWFsaXplQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBkZXN0cm95Q2FsbCA9IGNyZWF0ZVNweSgpO1xuXG4gICAgICAgIGJpbmRlciA9ICB7XG4gICAgICAgICAgICBvbihjYmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uZHVtbXlldmVudCA9IGNiYztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWx1ZSh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdGlhbGl6ZShvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVDYWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMub25kdW1teWV2ZW50ID0gKCkgPT4ge307XG4gICAgICAgICAgICAgICAgZGVzdHJveUNhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGVib3VuY2UnLCBkb25lID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG4gICAgICAgIG9iai54ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICAgICAgZXhwZWN0KG9iai54KS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgICAgIGV4cGVjdChpbml0aWFsaXplQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA1MCk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3Nob3VsZCBiaW5kIGFuZCB1c2UgRE9NIGV2ZW50cycsICgpID0+IHt9KVxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZCcsIGJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZDp4JywgYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChiaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdW5iaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBjb25zdCB1bmJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3VuYmluZCcsIHVuYmluZENhbGwpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQ6eCcsIHVuYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcgbm9kZSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgd3JvbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jywgd3JvbmdOb2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcga2V5IGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneScsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgd2hlbiBub2RlIGlzIG5vdCBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYWxsIHdoZW4gbmVpdGhlciBrZXkgbm9yIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmopO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBrZXktbm9kZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0sIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCB1c2luZyBhcnJheSBvZiBvYmplY3RzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlIH1dKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChvYmoubm9kZXMueCkudG9FcXVhbChub2RlKTtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShvYmouJG5vZGVzLngpXG4gICAgICAgICkudG9FcXVhbChbbm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYSBwcm9wZXJ0eSBpbiBjb250ZXh0IG9iamVjdCB3aGljaCBoYXMgaXNNSz10cnVlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBiaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KG9iai4kbm9kZXMueCkudG9CZVVuZGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueC55LnogPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW5jZWxzIGRlZXAgYmluZGluZyB3aGVuIGRlZXA9ZmFsc2Ugb3B0aW9uIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgZGVlcDogZmFsc2VcbiAgICAgICAgfSwgbm9EZWJvdW5jZUZsYWcpKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoJ3gueS56Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd1LngueS56JywgJ2dvJyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3UueC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgb2JqLnUueCA9IG1ha2VPYmplY3QoJ3kueicsICdmb28nKTtcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoudS54LnkueikudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBiaW5kaW5nIGlmIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgndS54LnknKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAndS54LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBjb25zdCB4ID0gb2JqLnUueDtcblxuICAgICAgICBvYmoudS54ID0gbWFrZU9iamVjdCgneS56JywgJ2ZvbycpO1xuXG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChvYmoudS54LnkueikudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIHgueS56ID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd1c2VzIGN1c3RvbSBzZWxlY3RvcnMgb24gY3VycmVudCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScsICdmb28nKTtcbiAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuXG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBub2RlKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55JywgJzpzYW5kYm94IHNwYW4nLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcblxuICAgICAgICBleHBlY3QoY2hpbGROb2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgY2hpbGROb2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIGNoaWxkTm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54LnkpLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoYHRocm93cyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmVgLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kTm9kZShvYmosICd4Jyk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KGBkb2Vzbid0IHRocm93IGVycm9yIHdoZW4gbm9kZSBpc24ndCB0aGVyZSBhbmQgb3B0aW9uYWw9dHJ1ZSBpcyBnaXZlbmAsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIG1ldGhvZCBvZiBNYXRyZXNoa2Egd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kT3B0aW9uYWxOb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZWxlY3RzIGNoaWxkcmVuIG9mIHNhbmRib3gnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiZm9vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICdzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2VsZWN0cyBub2RlcyB3aXRoIGN1c3RvbSBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGF0dHI9XCJmb29cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpzYW5kYm94IHNwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6Ym91bmQoc2FuZGJveCkgc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJylbMF0uZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpzYW5kYm94IHRhYmxlJylcbiAgICAgICAgKS50b0VxdWFsKG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6Ym91bmQoc2FuZGJveCkgdGFibGUnKVxuICAgICAgICApLnRvRXF1YWwobnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpIHRhYmxlJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFtdKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6c2FuZGJveCB0YWJsZScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIGJpbmQgYW5kIHJlYmluZCBzYW5kYm94IHZpYSBiaW5kU2FuZGJveCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYW5vdGhlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBiaW5kU2FuZGJveC5jYWxsKG9iaiwgbm9kZSwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBiaW5kU2FuZGJveC5jYWxsKG9iaiwgYW5vdGhlck5vZGUsIG5vRGVib3VuY2VGbGFnKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCknKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW2Fub3RoZXJOb2RlXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYmluZFNhbmRib3ggdGhyb3dzIGFuIGVycm9yIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kU2FuZGJveC5jYWxsKG9iaik7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICcuL2JpbmRub2RlJztcblxuLy8gVE9ETyBkZXNjcmlwdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE9wdGlvbmFsTm9kZSguLi5hcmdzKSB7XG4gICAgLy8gdGhpcyBoYWNrIGFsbG93cyB0byBrZWVwIGJpbmRPcHRpb25hbE5vZGUgYXMgY29tcGFjdCBhcyBwb3NzaWJsZVxuICAgIC8vIGFuZCBkb2Vzbid0IHJlcXVpcmUgdG8gZmxpcCBhcmdzIGFuZCBzdXBwb2VyIGFsbCBiaW5kTm9kZSB2YXJpYXRpb25zXG4gICAgYmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnID0gdHJ1ZTtcbiAgICByZXR1cm4gYmluZE5vZGUuY2FsbCh0aGlzLCAuLi5hcmdzKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTYW5kYm94KG9iamVjdCwgbm9kZSwgZXZ0KSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZ0ID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdiaW5kU2FuZGJveCcpO1xuICAgIH1cblxuICAgIHVuYmluZE5vZGUob2JqZWN0LCAnc2FuZGJveCcsIG51bGwsIGV2dCk7XG4gICAgcmV0dXJuIGJpbmROb2RlKG9iamVjdCwgJ3NhbmRib3gnLCBub2RlLCBudWxsLCBldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZHNhbmRib3guanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vYmluZG5vZGUvX3NlbGVjdG5vZGVzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4vX2hlbHBlcnMvdG9hcnJheSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX2hlbHBlcnMvY2hlY2tvYmplY3R0eXBlJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JUZXN0UmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3Qob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIHNlbGVjdG9yID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NlbGVjdEFsbCcpO1xuICAgIH1cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpWzBdIHx8IG51bGw7XG5cdH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAgICAgaWYgKCFkZWYgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbm9kZSB9ID0gYmluZGluZ3NbMF07XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuXHR9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCBkb20gZnJvbSAnLi9fZG9tJztcbmltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL2JpbmRub2RlL19zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuL19oZWxwZXJzL3RvYXJyYXknO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yVGVzdFJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0QWxsKG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBzZWxlY3RvciA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZWxlY3RBbGwnKTtcbiAgICB9XG5cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuXHR9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBkb20uJCgpO1xuICAgICAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgICAgIGlmICghZGVmIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoeyBub2RlIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZWxlY3RhbGwuanNcbiAqKi8iLCIvLyBjcmVhdGVzIG5lc3RlZCBvYmplY3QgYmFzZWQgb24gcGF0aCBhbmQgbGFzdFZhbHVlXG4vLyBleGFtcGxlOiBtYWtlT2JqZWN0KCdhLmIuYycsIDQyKSAtPiB7YToge2I6IHtjOyA0Mn19fVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU9iamVjdChnaXZlblBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZ2l2ZW5QYXRoID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBbXTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBsZXQgb2JqID0gcmVzdWx0O1xuICAgIGxldCBrZXk7XG5cblxuICAgIHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAga2V5ID0gcGF0aC5zaGlmdCgpO1xuICAgICAgICBvYmogPSBvYmpba2V5XSA9IHt9O1xuICAgIH1cblxuICAgIG9ialtwYXRoLnNoaWZ0KCldID0gbGFzdFZhbHVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNweShzcHkgPSAoKSA9PiB7fSkge1xuICAgIGNvbnN0IHNweU5hbWUgPSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IHNweU9iaiA9IHt9O1xuICAgIHNweU9ialtzcHlOYW1lXSA9IHNweTtcbiAgICByZXR1cm4gc3B5T24oc3B5T2JqLCBzcHlOYW1lKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvY3JlYXRlc3B5LmpzXG4gKiovIiwiaW1wb3J0IHtcblx0dGV4dGFyZWEsXG4gICAgaW5wdXQsXG4gICAgc2VsZWN0LFxuICAgIG91dHB1dCxcbiAgICBwcm9ncmVzc1xufSBmcm9tICdzcmMvYmluZGVycyc7XG5cbmltcG9ydCBsb29rRm9yQmluZGVyIGZyb20gJ3NyYy9sb29rZm9yYmluZGVyJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuXG5kZXNjcmliZSgnRGVmYXVsdCBiaW5kZXJzJywgKCkgPT4ge1xuICAgIGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcblx0bGV0IG9iajtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgamFzbWluZS5hZGRNYXRjaGVycyh7XG4gICAgICAgICAgICBiaW5kZXJzRXF1YWw6ICh1dGlsLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpID0+ICh7XG4gICAgICAgICAgICAgICAgY29tcGFyZTogKGFjdHVhbCwgZXhwZWN0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhc3MgPSByZXN1bHQucGFzcyA9IHV0aWwuZXF1YWxzKGFjdHVhbC5vbiwgZXhwZWN0ZWQub24sIGN1c3RvbUVxdWFsaXR5VGVzdGVycylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHV0aWwuZXF1YWxzKGAke2FjdHVhbC5nZXRWYWx1ZX1gLCBgJHtleHBlY3RlZC5nZXRWYWx1ZX1gLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB1dGlsLmVxdWFscyhgJHthY3R1YWwuc2V0VmFsdWV9YCwgYCR7ZXhwZWN0ZWQuc2V0VmFsdWV9YCwgY3VzdG9tRXF1YWxpdHlUZXN0ZXJzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubWVzc2FnZSA9IHBhc3MgPyAnQmluZGVycyBhcmUgZXF1YWwnIDogJ0JpbmRlcnMgYXJlIG5vdCBlcXVhbCdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuXHRcdG9iaiA9IHt9O1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0YXJlYScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCB0ZXh0YXJlYSgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHRleHRhcmVhKCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBwcm9ncmVzcycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Byb2dyZXNzJyk7XG5cdFx0bm9kZS5tYXggPSAzO1xuICAgICAgICBub2RlLnZhbHVlID0gMTtcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgcHJvZ3Jlc3MoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgxKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoMik7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChwcm9ncmVzcygpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdGV4dCBpbnB1dCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0bm9kZS50eXBlID0gJ3RleHQnO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGlucHV0KCd0ZXh0JyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwoaW5wdXQoJ3RleHQnKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIG91dHB1dCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ291dHB1dCcpO1xuICAgICAgICBub2RlLmlubmVySFRNTCA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBvdXRwdXQoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3Qobm9kZS5pbm5lckhUTUwpLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKG91dHB1dCgpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgc2VsZWN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGAke2l9YDtcbiAgICAgICAgICAgIGlmKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgc2VsZWN0KCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJzEnKTtcblx0XHRvYmoueCA9ICc1Jztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnNScpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwoc2VsZWN0KCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBzZWxlY3QgKG11bHRpcGxlKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBub2RlLm11bHRpcGxlID0gdHJ1ZTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gbm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBgJHtpfWA7XG4gICAgICAgICAgICBpZihpID09PSAxIHx8IGkgPT09IDQgfHwgaSA9PT0gNykge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzZWxlY3QodHJ1ZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoWycxJywgJzQnLCAnNyddKTtcblx0XHRvYmoueCA9IFsnMicsICc1JywgJzgnXTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgICAgIG5vZGUub3B0aW9uc1tpXS5zZWxlY3RlZFxuICAgICAgICAgICAgKS50b0VxdWFsKFxuICAgICAgICAgICAgICAgIGkgPT09IDIgfHwgaSA9PT0gNSB8fCBpID09PSA4XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChzZWxlY3QodHJ1ZSkpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uYWRkJywgKCkgPT4ge1xuICAgIGl0KCdhZGRzIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJChbZWwxLCBlbDIsIGVsM10pLmFkZChbZWwyLCBlbDMsIGVsNCwgZWw1XSlcbiAgICAgICAgXSkudG9FcXVhbChbZWwxLCBlbDIsIGVsMywgZWw0LCBlbDVdKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmNyZWF0ZScsICgpID0+IHtcbiAgICBpdCgnY3JlYXRlcyBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2JykudGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ0RJVicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgYSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdmb29iYXInXG4gICAgICAgICAgICB9KS5jbGFzc05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdmb29iYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdjcmVhdGVzIGNoaWxkZW4nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdzcGFuJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KS5jaGlsZHJlblswXS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmdldEF0dHJpYnV0ZSgnZm9vJylcbiAgICAgICAgKS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBvYmplY3Qgd2l0aCB0YWdOYW1lIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdGFnTmFtZTogJ2RpdidcbiAgICAgICAgICAgIH0pLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdESVYnKTtcbiAgICB9KTtcblxuICAgIGl0KCdleHRlbmRzIGRhdGFzZXQgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmdldEF0dHJpYnV0ZSgnZGF0YS1mb28nKVxuICAgICAgICApLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5pbXBvcnQgc2ltdWxhdGVDbGljayBmcm9tICcuLi8uLi9saWIvc2ltdWxhdGVjbGljayc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgZXZlbnRzJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgY2hpbGQxO1xuICAgIGxldCBjaGlsZDI7XG4gICAgbGV0IGdyYW5kY2hpbGQxO1xuICAgIGxldCBoYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpO1xuICAgICAgICBjaGlsZDIgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQyJyk7XG4gICAgICAgIGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG4gICAgICAgIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICAkKFt0ZXN0U2FuZGJveCwgY2hpbGQxLCBjaGlsZDIsIGdyYW5kY2hpbGQxXSkub2ZmKCdjbGljaycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBuYW1lc3BhY2VkIGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGJ1YmJsaW5nIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoY2xpY2sgb24gZ3JhbmRjaGlsZHJlbiknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0RvZXNuXFx0IHRyaWdnZXIgd2hlbiBjbGlja2VkIG9uIHdyb25nIGNoaWxkJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMicsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIG5vdCBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU3RvcHMgcHJvcGFnYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICAkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qc1xuICoqLyIsIi8vIHNpbXVsYXRlcyBjbGljayBvbiBhIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2sobm9kZSkge1xuICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmZpbmQnLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuICAgIGxldCBncmFuZENoaWxkO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGdyYW5kQ2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpbmRzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJCh0ZXN0U2FuZGJveCkuZmluZCgnLmdyYW5kY2hpbGQnKVxuICAgICAgICBdKS50b0VxdWFsKFtncmFuZENoaWxkXSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgaW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0xXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtMlwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTNcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgd2luZG93JywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKHdpbmRvdyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKHdpbmRvdyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyBkb2N1bWVudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChkb2N1bWVudCk7XG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKGRvY3VtZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbnZlcnRzIGFycmF5LWxpa2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGNoaWxkcmVuKTtcblxuICAgICAgICBleHBlY3QoY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKHJlc3VsdC5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGV4cGVjdChjaGlsZHJlbltpXSkudG9FcXVhbChyZXN1bHRbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnQ29udmVydHMgb25lIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoZWxlbWVudCk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50KS50b0VxdWFsKHJlc3VsdFswXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCcudGVzdC0xJywgdGVzdFNhbmRib3gpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCcudGVzdC0xJywgJy53cm9uZy1jb250ZXh0JykubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gdXNlIG51bGwnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQobnVsbCkubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gdXNlIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIGNyZWF0ZSBwbHVnaW5zJywgKCkgPT4ge1xuICAgICAgICAkLmZuLmJRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uIGJRdWVyeVBsdWdpbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aFxuICAgICAgICAgICAgKS50b0VxdWFsKFxuICAgICAgICAgICAgICAgIHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5sZW5ndGhcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24oJC5mbiwgJ2JRdWVyeVBsdWdpbicpO1xuXG4gICAgICAgICQoJyonLCB0ZXN0U2FuZGJveCkuYlF1ZXJ5UGx1Z2luKCk7XG5cbiAgICAgICAgZXhwZWN0KCQuZm4uYlF1ZXJ5UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pbml0X3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuICAgIGl0KCdjaGVja3MgY2xhc3NOYW1lJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSAnZWwnO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwnKVxuICAgICAgICApLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJChlbCkuaXMoJy5lbDInKVxuICAgICAgICApLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG4gICAgaXQoJ2V4Y2x1ZGVzIGJ5IHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGVsMi5jbGFzc05hbWUgPSAnZWwyJztcblxuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJChbZWwxLCBlbDIsIGVsM10pLm5vdCgnLmVsMicpXG4gICAgICAgIF0pLnRvRXF1YWwoW2VsMSwgZWwzXSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5vbmUnLCAoKSA9PiB7XG4gICAgaXQoJ2ZpbmRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5vbmUoJyonLCB0ZXN0U2FuZGJveClcbiAgICAgICAgKS50b0VxdWFsKGNoaWxkKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LnBhcnNlSFRNTCcsICgpID0+IHtcbiAgICBpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIGNvbnRleHR1YWwgZWxlbWVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8dGQ+PC90ZD48dGQ+PC90ZD4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1xuICoqLyIsImltcG9ydCBjYWxjIGZyb20gJ3NyYy9jYWxjJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdjYWxjJywgKCkgPT4ge1xuXHRpdCgnYWRkcyBzaW1wbGUgZGVwZW5kZW5jeScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMlxuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIpO1xuXHRcdGV4cGVjdChvYmouYykudG9FcXVhbCgzKTtcblx0XHRvYmouYSA9IDM7XG5cdFx0ZXhwZWN0KG9iai5jKS50b0VxdWFsKDUpO1xuXHRcdG9iai5iID0gMztcblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoNik7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIHNpbXBsZSBkZXBlbmRlbmN5IGZvciBvYmplY3Qgd2l0aCBpc01LPXRydWUnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0ge1xuXHRcdFx0aXNNSzogdHJ1ZSxcblx0XHRcdGE6IDEsXG5cdFx0XHRiOiAyXG5cdFx0fTtcblxuXHRcdGNhbGMuY2FsbChvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiKTtcblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoMyk7XG5cdFx0b2JqLmEgPSAzO1xuXHRcdGV4cGVjdChvYmouYykudG9FcXVhbCg1KTtcblx0XHRvYmouYiA9IDM7XG5cdFx0ZXhwZWN0KG9iai5jKS50b0VxdWFsKDYpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBkZXBlbmRlbmN5IGZyb20gYW5vdGhlciBvYmplY3QnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0ge1xuXHRcdFx0YTogMSxcblx0XHRcdGI6IDJcblx0XHR9O1xuXHRcdGNvbnN0IG9iajIgPSB7XG5cdFx0XHRjOiA0LFxuXHRcdFx0ZDogOFxuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2UnLCBbe1xuXHRcdFx0b2JqZWN0OiBvYmosXG5cdFx0XHRrZXk6IFsnYScsICdiJ11cblx0XHR9LCB7XG5cdFx0XHRvYmplY3Q6IG9iajIsXG5cdFx0XHRrZXk6IFsnYycsICdkJ11cblx0XHR9XSwgKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQpO1xuXG5cdFx0ZXhwZWN0KG9iai5lKS50b0VxdWFsKDE1KTtcblx0fSk7XG5cblx0aXQoYGRvZXNuJ3Qgc2V0IG9uIGluaXQgdmlhIHNldE9uSW5pdD1mYWxzZWAsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMixcblx0XHRcdGM6IDBcblx0XHR9O1xuXG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiLCB7XG5cdFx0XHRzZXRPbkluaXQ6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdwcm90ZWN0cyBmcm9tIGN5Y2xpY2FsIGxpbmtzJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHtcblx0XHRcdGE6IDEsXG5cdFx0XHRiOiAyLFxuXHRcdFx0YzogM1xuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2EnLCBbJ2InLCAnYyddLCAoeCwgeSkgPT4geCArIHkpO1xuXHRcdGNhbGMob2JqLCAnYicsIFsnYScsICdjJ10sICh4LCB5KSA9PiB4ICsgeSk7XG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKHgsIHkpID0+IHggKyB5KTtcblxuXHRcdGV4cGVjdChvYmouYSkudG9FcXVhbCgyNyk7XG5cdH0pO1xuXG5cdHhpdCgndGhyb3dzIGVycm9yIHdoZW4gdGFyZ2V0IGlzIG5vdCBhIHN0cmluZycsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2UgaXMgbm90IGFuIG9iamVjdCcsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2Uga2V5IGlzIG5vdCBhIHN0cmluZycsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2Ugb2JqZWN0IGlzIG5vdCBhbiBvYmplY3QnLCAoKSA9PiB7fSk7XG5cblx0aXQoJ2FsbG93cyBkZWVwIGRlcGVuZGVuY2llcycsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycsIDEpO1xuXG5cdFx0Y2FsYyhvYmosICdkJywgJ2EuYi5jJywgKGMpID0+IGMpO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgxKTtcblx0XHRvYmouYS5iLmMgPSAyO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgyKTtcblxuXHRcdGNvbnN0IGIgPSBvYmouYS5iO1xuXHRcdG9iai5hLmIgPSB7YzogM307XG5cdFx0Yi5jID0gJ25vcGUnO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgzKTtcblxuXHRcdGNvbnN0IGEgPSBvYmouYTtcblx0XHRvYmouYSA9IHtiOiB7YzogNH19O1xuXHRcdGEuYiA9IHtjOiAnbm9wZSd9O1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCg0KTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyBkZWVwIGRlcGVuZGVuY2llcyBmcm9tIGFub3RoZXIgb2JqZWN0JywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EnLCAxKTtcblx0XHRjb25zdCBvYmoyID0gbWFrZU9iamVjdCgnYi5jLmQnLCAyKTtcblxuXHRcdGNhbGMob2JqLCAnZCcsIHtcblx0XHRcdG9iamVjdDogb2JqMixcblx0XHRcdGtleTogJ2IuYy5kJ1xuXHRcdH0sIChjKSA9PiBjKjIpO1xuXG5cdFx0ZXhwZWN0KG9iai5kKS50b0VxdWFsKDQpO1xuXHR9KTtcblxuXHRpdCgndXNlcyBldmVudCBvcHRpb25zJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHt9O1xuXHRcdGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoZXZ0ID0+IHtcblx0XHRcdGV4cGVjdChldnQuZm9vKS50b0VxdWFsKCdiYXInKTtcblx0XHR9KTtcblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIsIHsgZm9vOiAnYmFyJyB9KTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cblx0XHRvYmouYSA9IDI7XG5cdFx0b2JqLmIgPSAzO1xuXG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcblx0fSk7XG5cblx0aXQoJ3VzZXMgc2lsZW50PXRydWUgZnJvbSBldmVudCBvcHRpb25zJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHt9O1xuXHRcdGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIsIHsgc2lsZW50OiB0cnVlIH0pO1xuXG5cdFx0b2JqLmEgPSAyO1xuXHRcdG9iai5iID0gMztcblxuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIGRlYm91bmNlIGhhbmRsZXInLCBkb25lID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMlxuXHRcdH07XG5cdFx0Y29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgoKSA9PiB7XG5cdFx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoNSk7XG5cdFx0fSk7XG5cblx0XHRhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6YycsIGhhbmRsZXIpO1xuXG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiLCB7XG5cdFx0XHRkZWJvdW5jZTogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0b2JqLmEgPSAwO1xuXHRcdG9iai5hID0gMTtcblx0XHRvYmouYSA9IDI7XG5cdFx0b2JqLmIgPSAwO1xuXHRcdG9iai5iID0gMTtcblx0XHRvYmouYiA9IDI7XG5cdFx0b2JqLmIgPSAzO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDQwMCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9jYWxjX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9faGVscGVycy9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IG1hdHJlc2hrYUVycm9yIGZyb20gJy4uL19oZWxwZXJzL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL19oZWxwZXJzL2RlYm91bmNlJztcbmltcG9ydCBhZGRTb3VyY2UgZnJvbSAnLi9fYWRkc291cmNlJztcbmltcG9ydCBjcmVhdGVDYWxjSGFuZGxlciBmcm9tICcuL19jcmVhdGVjYWxjaGFuZGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbGMob2JqZWN0LCB0YXJnZXQsIHNvdXJjZXMsIGdpdmVuSGFuZGxlciwgZXZlbnRPcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZlbnRPcHRpb25zID0gZ2l2ZW5IYW5kbGVyO1xuICAgICAgICBnaXZlbkhhbmRsZXIgPSBzb3VyY2VzO1xuICAgICAgICBzb3VyY2VzID0gdGFyZ2V0O1xuICAgICAgICB0YXJnZXQgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnY2FsYycpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgKiB0aGlzLmNhbGMoW3t0YXJnZXQsIHNvdXJjZSwgaGFuZGxlciwgZXZlbnR9XSwgY29tbW9uRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICovXG4gICAgICAgIG5vZm4uZm9yRWFjaCh0YXJnZXQsICh7XG4gICAgICAgICAgICB0YXJnZXQ6IGl0ZW1UYXJnZXQsXG4gICAgICAgICAgICBzb3VyY2VzOiBpdGVtU291cmNlcyxcbiAgICAgICAgICAgIGhhbmRsZXI6IGl0ZW1IYW5kbGVyLFxuICAgICAgICAgICAgZXZlbnQ6IGl0ZW1FdmVudE9wdGlvbnNcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnRPcHRpb25zID0gc291cmNlcztcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50T3B0aW9ucyA9IHt9O1xuXG4gICAgICAgICAgICBpZihjb21tb25FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwiZ2xvYmFsXCIgZXZlbnRcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudE9wdGlvbnMsIGNvbW1vbkV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGl0ZW1FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnRPcHRpb25zLCBpdGVtRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsYyhvYmplY3QsIGl0ZW1UYXJnZXQsIGl0ZW1Tb3VyY2VzLCBpdGVtSGFuZGxlciwgbWVyZ2VkRXZlbnRPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGFyZ2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignY2FsYzp0YXJnZXRfdHlwZScsIHsgdGFyZ2V0IH0pO1xuICAgIH1cblxuICAgIGV2ZW50T3B0aW9ucyA9IGV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCBkZWYgPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7XG4gICAgICAgIHNldE9uSW5pdD10cnVlLFxuICAgICAgICBkZWVwPXRydWUsXG4gICAgICAgIGRlYm91bmNlOiBkZWJvdW5jZU9wdGlvbj1mYWxzZVxuICAgIH0gPSBldmVudE9wdGlvbnM7XG4gICAgY29uc3QgZGVmYXVsdEhhbmRsZXIgPSB2YWx1ZSA9PiB2YWx1ZTtcbiAgICBjb25zdCBoYW5kbGVyID0gZ2l2ZW5IYW5kbGVyIHx8IGRlZmF1bHRIYW5kbGVyO1xuICAgIGNvbnN0IGFsbFNvdXJjZXMgPSBbXTtcblx0bGV0IGNhbGNIYW5kbGVyID0gY3JlYXRlQ2FsY0hhbmRsZXIoe1xuXHRcdG9iamVjdCxcblx0XHRldmVudE9wdGlvbnMsXG5cdFx0YWxsU291cmNlcyxcblx0XHR0YXJnZXQsXG5cdFx0ZGVmLFxuXHRcdGhhbmRsZXJcblx0fSk7XG5cbiAgICBpZighKHNvdXJjZXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgc291cmNlcyA9IFtzb3VyY2VzXTtcbiAgICB9XG5cbiAgICAvLyBieSBkZWZhdWx0IGRlYm91bmNpbmcgaXMgb2ZmXG4gICAgLy8gaXQgY2FuIGJlIHR1cm5lZCBvbiBieSBwYXNzaW5nIGRlYm91bmNlPXRydWUgb3IgZGVib3VuY2U9PG51bWJlcj4gdG8gZXZlbnQgb2JqZWN0XG4gICAgaWYgKGRlYm91bmNlT3B0aW9uIHx8IGRlYm91bmNlT3B0aW9uID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIGRlYm91bmNlT3B0aW9uID09PSAnbnVtYmVyJyA/IGRlYm91bmNlT3B0aW9uIDogMDtcbiAgICAgICAgY2FsY0hhbmRsZXIgPSBkZWJvdW5jZShjYWxjSGFuZGxlciwgZGVsYXkpO1xuICAgIH1cblxuICAgIG5vZm4uZm9yRWFjaChzb3VyY2VzLCBzb3VyY2UgPT4ge1xuICAgICAgICBpZih0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgYWRkU291cmNlKHtcblx0XHRcdFx0Y2FsY0hhbmRsZXIsXG5cdFx0XHRcdG9iamVjdCxcblx0XHRcdFx0YWxsU291cmNlcyxcbiAgICAgICAgICAgICAgICBzb3VyY2VLZXk6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICBzb3VyY2VPYmplY3Q6IG9iamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZighc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbWF0cmVzaGthRXJyb3IoJ2NhbGM6c291cmNlX3R5cGUnLCB7IHNvdXJjZSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc291cmNlS2V5ID0gc291cmNlLmtleTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZU9iamVjdCA9IHNvdXJjZS5vYmplY3Q7XG4gICAgICAgICAgICBpZihzb3VyY2VLZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChzb3VyY2VLZXksIChzb3VyY2VLZXlJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFNvdXJjZSh7XG5cdFx0XHRcdFx0XHRjYWxjSGFuZGxlcixcblx0XHRcdFx0XHRcdG9iamVjdCxcblx0XHRcdFx0XHRcdGFsbFNvdXJjZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VLZXk6IHNvdXJjZUtleUl0ZW0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkU291cmNlKHtcblx0XHRcdFx0XHRjYWxjSGFuZGxlcixcblx0XHRcdFx0XHRvYmplY3QsXG5cdFx0XHRcdFx0YWxsU291cmNlcyxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlS2V5LFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VPYmplY3RcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYoc2V0T25Jbml0KSB7XG4gICAgICAgIGNhbGNIYW5kbGVyKClcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWxjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgYWRkVHJlZUxpc3RlbmVyIGZyb20gJy4uL29uL19hZGR0cmVlbGlzdGVuZXInO1xuXG4vLyBhZGRzIHNvdXJjZSB0byBhIHNvdXJjZSBsaXN0IGFuZCBhZGRzIGV2ZW50IGxpc3RlbmVyIHRvIGEgc291cmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRTb3VyY2Uoe1xuXHRjYWxjSGFuZGxlcixcblx0b2JqZWN0LFxuXHRhbGxTb3VyY2VzLFxuXHRzb3VyY2VLZXksXG5cdHNvdXJjZU9iamVjdFxufSkge1xuXHRsZXQgaXNEZWxlZ2F0ZWQgPSBmYWxzZTtcblxuXHQvLyBzb3VyY2Uga2V5IG11c3QgYmUgYSBzdHJpbmdcblx0aWYodHlwZW9mIHNvdXJjZUtleSAhPT0gJ3N0cmluZycpIHtcblx0XHR0aHJvdyBtYXRyZXNoa2FFcnJvcignY2FsYzpzb3VyY2Vfa2V5X3R5cGUnLCB7IHNvdXJjZUtleSB9KTtcblx0fVxuXG5cdC8vIHNvdXJjZSBvYmplY3QgbXVzdCBiZSBhbiBvYmplY3Rcblx0aWYoIXNvdXJjZU9iamVjdCB8fCB0eXBlb2Ygc291cmNlT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuXHRcdHRocm93IG1hdHJlc2hrYUVycm9yKCdjYWxjOnNvdXJjZV9vYmplY3RfdHlwZScsIHsgc291cmNlT2JqZWN0IH0pO1xuXHR9XG5cblx0Y29uc3QgZGVlcFBhdGggPSBzb3VyY2VLZXkuc3BsaXQoJy4nKTtcblx0Y29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG5cblx0Ly8gaWYgc29tZXRoaW5nIGxpa2UgYS5iLmMgaXMgdXNlZCBhcyBhIGtleVxuXHRpZihkZWVwUGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0aXNEZWxlZ2F0ZWQgPSB0cnVlO1xuXHRcdC8vIFRPRE8gYXZvaWQgY29sbGlzaW9ucyB3aXRoIGJpbmRpbmdzIGJ5IHVzaW5nIGFub3RoZXIgZXZlbnQgbmFtZSBpbnN0ZWFkIG9mIF9jaGFuZ2U6dHJlZTouLi5cblx0XHRhZGRUcmVlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aCwgY2FsY0hhbmRsZXIpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIG5vcm1hbCBoYW5kbGVyXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZXBzOiR7c291cmNlS2V5fWAsIGNhbGNIYW5kbGVyKTtcblx0fVxuXG5cdGFsbFNvdXJjZXMucHVzaCh7XG5cdFx0c291cmNlS2V5LFxuXHRcdHNvdXJjZU9iamVjdCxcblx0XHRpc0RlbGVnYXRlZFxuXHR9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NhbGMvX2FkZHNvdXJjZS5qc1xuICoqLyIsImltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcbmltcG9ydCBkZWVwRmluZCBmcm9tICcuLi9faGVscGVycy9kZWVwZmluZCc7XG5cbi8vIFRPRE86IEFkZCBkZXNjcmlwdGlvbiBhbmQgY29tbWVudHMgZm9yIGNyZWF0ZUNhbGNIYW5kbGVyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDYWxjSGFuZGxlcih7XG5cdG9iamVjdCxcblx0ZXZlbnRPcHRpb25zLFxuXHRhbGxTb3VyY2VzLFxuXHR0YXJnZXQsXG5cdGRlZixcblx0aGFuZGxlclxufSkge1xuXHRyZXR1cm4gZnVuY3Rpb24gY2FsY0hhbmRsZXIoY2hhbmdlRXZlbnQ9e30pIHtcblx0XHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0XHRjb25zdCB7IHByb3RlY3Rvcj17fSB9ID0gY2hhbmdlRXZlbnQ7XG5cdFx0Y29uc3QgcHJvdGVjdEtleSA9IHRhcmdldCArIGRlZi5pZDtcblx0XHRsZXQgc2V0RXZlbnRPcHRpb25zID0gbm9mbi5hc3NpZ24oeyBwcm90ZWN0b3IgfSwgZXZlbnRPcHRpb25zKTtcblx0XHRzZXRFdmVudE9wdGlvbnMgPSBub2ZuLmFzc2lnbihzZXRFdmVudE9wdGlvbnMsIGNoYW5nZUV2ZW50KTtcblxuXHRcdGlmKHByb3RlY3RLZXkgaW4gcHJvdGVjdG9yKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0cHJvdGVjdG9yW3Byb3RlY3RLZXldID0gdHJ1ZTtcblxuXHRcdG5vZm4uZm9yRWFjaChhbGxTb3VyY2VzLCAoeyBzb3VyY2VPYmplY3QsIHNvdXJjZUtleSwgaXNEZWxlZ2F0ZWQgfSkgPT4ge1xuXHRcdFx0Y29uc3QgdmFsdWUgPSBpc0RlbGVnYXRlZCA/IGRlZXBGaW5kKHNvdXJjZU9iamVjdCwgc291cmNlS2V5KSA6IHNvdXJjZU9iamVjdFtzb3VyY2VLZXldO1xuXHRcdFx0dmFsdWVzLnB1c2godmFsdWUpO1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgdGFyZ2V0VmFsdWUgPSBoYW5kbGVyLmFwcGx5KG9iamVjdCwgdmFsdWVzKTtcblx0XHRzZXQob2JqZWN0LCB0YXJnZXQsIHRhcmdldFZhbHVlLCBzZXRFdmVudE9wdGlvbnMpO1xuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWxjL19jcmVhdGVjYWxjaGFuZGxlci5qc1xuICoqLyIsImltcG9ydCBDbGFzcyBmcm9tICdzcmMvY2xhc3MnO1xuXG5kZXNjcmliZSgnQ2xhc3MgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgaXQoJ2FsbG93cyB0byBpbmhlcml0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBBID0gQ2xhc3MoeyBhOiB0cnVlIH0pLFxuICAgICAgICAgICAgQiA9IENsYXNzKHsgYjogdHJ1ZSwgZXh0ZW5kczogQSB9KSxcbiAgICAgICAgICAgIEMgPSBDbGFzcyh7IGM6IHRydWUsIGV4dGVuZHM6IEIgfSksXG4gICAgICAgICAgICBpbnN0ID0gbmV3IEM7XG5cbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEMpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICBleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0LmIpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QuYykudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgQSA9IENsYXNzKHt9LCB7IHN0YXRpY1Byb3A6IHRydWUgfSk7XG4gICAgICAgIGV4cGVjdChBLnN0YXRpY1Byb3ApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnN0ID0gbmV3IENsYXNzKHsgYTogdHJ1ZSB9KTtcbiAgICAgICAgZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGFzcyhwcm90b3R5cGUsIHN0YXRpY1Byb3BzKSB7XG4gICAgY29uc3QgQ29uc3RydWN0b3IgPSBwcm90b3R5cGUuY29uc3RydWN0b3IgIT09IE9iamVjdFxuICAgICAgICAgICAgPyBwcm90b3R5cGUuY29uc3RydWN0b3JcbiAgICAgICAgICAgIDogZnVuY3Rpb24gRW1wdHlDb25zdHJ1Y3RvcigpIHt9LFxuICAgICAgICAvL2V4dGVuZHMgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICBQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuICAgICAgICAvL2luaGVyaXQgcHJvdG8gZnJvbSBjbGFzcyBwYXJlbnQgb3IgZW1wdHkgb2JqZWN0XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQgPyBQYXJlbnQucHJvdG90eXBlIDoge30pO1xuXG4gICAgZXh0ZW5kKHByb3RvLCBwcm90b3R5cGUpO1xuXG4gICAgaWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZXh0ZW5kKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgfVxuXG4gICAgLy8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICBwcm90by5pbnN0YW5jZU9mID0gZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcjtcbiAgICB9O1xuXG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDbGFzcykge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7fSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgeTogbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICAgICAgYToge31cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LnkuYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoYmFzaWMpJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBsZXQgY3R4O1xuICAgIGxldCBoYW5kbGVyO1xuXG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY3R4ID0ge307XG4gICAgICAgIHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdmaXJlcyAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuICAgICAgICBjb25zdCBhID0gb2JqLmE7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuICAgICAgICB0cmlnZ2VyT25lKGEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUoYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBhID0gb2JqLmE7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcbiAgICAgICAgdHJpZ2dlck9uZShhLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBiID0gb2JqLmEuYjtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuICAgICAgICB0cmlnZ2VyT25lKGIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBjID0gb2JqLmEuYztcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShjLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lc25cXCd0IHJlbW92ZSBjaGFuZ2UgZXZlbnQgd2hlbiB1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcbiAgICAgICAgb2JqLmEuYi5jID0gNTU7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1c2VzIGNvcnJlY3QgY29udGV4dCBmb3IgZGVsZWdhdGVkIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgbGV0IGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGZ1bmN0aW9uIGhhbmRsZSgpIHtcbiAgICAgICAgICAgIGJvb2wgPSB0aGlzID09PSBjdHg7XG4gICAgICAgIH0sIGN0eCk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9vZmYvX3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsICgpID0+IHtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgc2ltcGxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmoueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgc2ltcGxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmoueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyBudWxsIHRhcmdldCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYy54JywgMSk7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgb2JqLmEuYiA9IG51bGw7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9vZmYvX3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdFdmVudHMgY29yZTogYWRkTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVyLCB0cmlnZ2VyT25lJywgKCkgPT4ge1xuICAgIGxldCBvYmo7XG4gICAgbGV0IGN0eDtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgY3R4ID0ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcycsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTApKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMikpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAobm8gYXJncyknLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmopO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjaycsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgc2ltdWxhdGVDbGljayBmcm9tICcuLi8uLi9saWIvc2ltdWxhdGVjbGljayc7XG5pbXBvcnQgYWRkRG9tTGlzdGVuZXIgZnJvbSAnc3JjL29uL19hZGRkb21saXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlRG9tTGlzdGVuZXIgZnJvbSAnc3JjL29mZi9fcmVtb3ZlZG9tbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJET01FdmVudCBmcm9tICdzcmMvdHJpZ2dlci9fdHJpZ2dlcmRvbWV2ZW50JztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoXCJFdmVudHMgY29yZTogYWRkRG9tTGlzdGVuZXIsIHJlbW92ZURvbUxpc3RlbmVyLCB0cmlnZ2VyRE9NTGlzdGVuZXJcIiwgKCkgPT4ge1xuICAgIGxldCBub2RlO1xuICAgIGxldCBvYmo7XG4gICAgbGV0IGhhbmRsZXI7XG4gICAgbGV0IGNoaWxkTm9kZTtcbiAgICBsZXQgZ3JhbmRjaGlsZE5vZGU7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb2JqID0ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgbm9kZSA9IHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICk7XG5cbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGlkPVwiY2hpbGRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuXG4gICAgICAgIGNoaWxkTm9kZSA9IG5vZGUucXVlcnlTZWxlY3RvcignI2NoaWxkJyk7XG4gICAgICAgIGdyYW5kY2hpbGROb2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9KVxuXG4gICAgaXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJylcbiAgICAgICAgYWRkRG9tTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGhhbmRsZXIpO1xuXG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGROb2RlKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgYWRkRG9tTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVEb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJyk7XG5cbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZE5vZGUpO1xuXG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpXG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmdyYW5kY2hpbGQnLCBoYW5kbGVyKTtcblxuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGROb2RlKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgYW5kIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsICcjY2hpbGQnKVxuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZURvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGROb2RlKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIHRoZW4gYmluZHMgdGhlbiByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJyk7XG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmdyYW5kY2hpbGQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlRG9tTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZE5vZGUpO1xuXG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgoZDEsIGQyKSA9PiBleHBlY3QoZDEgKyBkMikudG9FcXVhbCgzKSk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCAnI2NoaWxkJyk7XG4gICAgICAgIGFkZERvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlckRPTUV2ZW50KG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBbMSwgMl0pO1xuXG5cbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKGQxLCBkMikgPT4gZXhwZWN0KGQxICsgZDIpLnRvRXF1YWwoMykpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJET01FdmVudChvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgWzEsIDJdKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIERPTSBldmVudCB3aXRoIHNwZWNpZmllZCBzZWxlY3RvciAoYnViYmxpbmcgdGVzdCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKGQxLCBkMikgPT4gZXhwZWN0KGQxICsgZDIpLnRvRXF1YWwoMykpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJET01FdmVudChvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgWzEsIDJdKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgcmVtb3ZlRG9tTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZ3JhbmRjaGlsZCcpO1xuXG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZE5vZGUpO1xuXG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkIGFuZCBkb2VzblxcJ3QgcmVtb3ZlIGV2ZW50cyBmcm9tIG90aGVyIG5vZGVzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4JywgJyNjaGlsZCcpO1xuICAgICAgICBhZGREb21MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ncmFuZGNoaWxkJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZURvbUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmJsYWgnKTtcblxuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGROb2RlKTtcblxuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGluaXRNSyBmcm9tICcuLi9fY29yZS9pbml0JztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vX2FkZGxpc3RlbmVyJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSc7XG5pbXBvcnQgY3JlYXRlRG9tRXZlbnRIYW5kbGVyIGZyb20gJy4vX2NyZWF0ZWRvbWV2ZW50aGFuZGxlcic7XG5cbi8vIHJldHVybnMgYW4gb2JqZWN0IGZvciBiaW5kIGFuZCB1bmJpbmQgZXZlbnRzXG5mdW5jdGlvbiBjcmVhdGVCaW5kaW5nSGFuZGxlcnMoe1xuICAgIGZ1bGxFdmVudE5hbWUsXG4gICAgZG9tRXZlbnRIYW5kbGVyLFxuICAgIHNlbGVjdG9yXG59KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYmluZEhhbmRsZXIoZXZ0KSB7XG4gICAgICAgICAgICBpZihldnQgJiYgZXZ0Lm5vZGUpIHtcbiAgICAgICAgICAgICAgICBkb20uJChldnQubm9kZSkub24oZnVsbEV2ZW50TmFtZSwgc2VsZWN0b3IsIGRvbUV2ZW50SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgXHR9LFxuICAgICAgICB1bmJpbmRIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgaWYoZXZ0ICYmIGV2dC5ub2RlKSB7XG4gICAgICAgICAgICAgICAgZG9tLiQoZXZ0Lm5vZGUpLm9mZihmdWxsRXZlbnROYW1lLCBzZWxlY3RvciwgZG9tRXZlbnRIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICBcdH1cbiAgICB9XG5cbn1cblxuLy8gYWRkcyBET00gZXZlbnQgbGlzdGVuZXIgZm9yIG5vZGVzIGJvdW5kIHRvIGdpdmVuIHByb3BlcnR5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGREb21MaXN0ZW5lcihvYmplY3QsIGtleSwgZXZlbnROYW1lLCBzZWxlY3RvciwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pIHtcbiAgICBjb25zdCBkZWYgPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCBwcm9wRGVmID0gZGVmaW5lUHJvcChvYmplY3QsIGtleSk7XG5cbiAgICBjb25zdCBkb21FdmVudEhhbmRsZXIgPSBjcmVhdGVEb21FdmVudEhhbmRsZXIoe1xuICAgICAgICBrZXksXG4gICAgICAgIG9iamVjdCxcbiAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgIGNvbnRleHRcbiAgICB9KTtcblxuICAgIC8vIG1ha2luZyBwb3NzaWJsZSB0byByZW1vdmUgdGhpcyBldmVudCBsaXN0ZW5lclxuICAgIGRvbUV2ZW50SGFuZGxlci5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgIGNvbnN0IGV2ZW50TmFtZXNwYWNlID0gZGVmLmlkICsga2V5O1xuICAgIGNvbnN0IGZ1bGxFdmVudE5hbWUgPSBgJHtldmVudE5hbWV9LiR7ZXZlbnROYW1lc3BhY2V9YDtcblx0Y29uc3QgeyBiaW5kSGFuZGxlciwgdW5iaW5kSGFuZGxlciB9ID0gY3JlYXRlQmluZGluZ0hhbmRsZXJzKHtcbiAgICAgICAgZnVsbEV2ZW50TmFtZSxcbiAgICAgICAgZG9tRXZlbnRIYW5kbGVyLFxuICAgICAgICBzZWxlY3RvclxuICAgIH0pO1xuICAgIGNvbnN0IGFkZEJpbmRMaXN0ZW5lclJlc3VsdCA9IGFkZExpc3RlbmVyKG9iamVjdCwgYGJpbmQ6JHtrZXl9YCwgYmluZEhhbmRsZXIsIGNvbnRleHQsIGluZm8pO1xuICAgIGNvbnN0IGFkZFVuYmluZExpc3RlbmVyUmVzdWx0ID0gYWRkTGlzdGVuZXIob2JqZWN0LCBgdW5iaW5kOiR7a2V5fWAsIHVuYmluZEhhbmRsZXIsIGNvbnRleHQsIGluZm8pO1xuXG4gICAgLy8gaWYgZXZlbnRzIGFyZSBhZGRlZCBzdWNjZXNzZnVsbHkgdGhlbiBydW4gYmluZEhhbmRsZXIgZm9yIGV2ZXJ5IG5vZGUgaW1tZWRpYXRlbHlcbiAgICBpZihhZGRCaW5kTGlzdGVuZXJSZXN1bHQgJiYgYWRkVW5iaW5kTGlzdGVuZXJSZXN1bHQpIHtcbiAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcbiAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKHsgbm9kZSB9KSA9PiBiaW5kSGFuZGxlcih7IG5vZGUgfSkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2FkZGRvbWxpc3RlbmVyLmpzXG4gKiovIiwiLy8gcmV0dXJucyBET00gZXZlbnQgaGFuZGxlclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRG9tRXZlbnRIYW5kbGVyKHtcbiAgICBrZXksXG4gICAgb2JqZWN0LFxuICAgIGNhbGxiYWNrLFxuICAgIGNvbnRleHRcbn0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZG9tRXZlbnRIYW5kbGVyKGRvbUV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRXZlbnQgPSBkb21FdmVudC5vcmlnaW5hbEV2ZW50IHx8IGRvbUV2ZW50O1xuXHRcdGNvbnN0IHRyaWdnZXJBcmdzID0gb3JpZ2luYWxFdmVudC5tYXRyZXNoa2FUcmlnZ2VyQXJncztcbiAgICAgICAgY29uc3QgeyB3aGljaCwgdGFyZ2V0IH0gPSBkb21FdmVudDtcblxuICAgICAgICBpZih0cmlnZ2VyQXJncykge1xuICAgICAgICAgICAgLy8gaWYgYXJncyBhcmUgcGFzc2VkIHRvIHRyaWdnZXIgbWV0aG9kIHRoZW4gcGFzcyB0aGVtIHRvIGFuIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIHRyaWdnZXJBcmdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHVzZSB0aGUgZm9sbG93aW5nIG9iamVjdCBhcyBhbiBhcmcgZm9yIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoY29udGV4dCwge1xuICAgICAgICAgICAgICAgIHNlbGY6IG9iamVjdCxcblx0XHRcdFx0bm9kZTogdGhpcyxcbiAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcblx0XHRcdFx0c3RvcFByb3BhZ2F0aW9uOiAoKSA9PiBkb21FdmVudC5zdG9wUHJvcGFnYXRpb24oKSxcblx0XHRcdFx0a2V5LFxuXHRcdFx0XHRkb21FdmVudCxcblx0XHRcdFx0b3JpZ2luYWxFdmVudCxcblx0XHRcdFx0d2hpY2gsXG5cdFx0XHRcdHRhcmdldFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uL19jcmVhdGVkb21ldmVudGhhbmRsZXIuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuXG4vLyByZW1vdmVzIGRvbSBsaXN0ZW5lciBmcm9tIG5vZGVzIGJvdW5kIHRvIGdpdmVuIGtleVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlRG9tTGlzdGVuZXIob2JqZWN0LCBrZXksIGV2ZW50TmFtZSwgc2VsZWN0b3IsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIGlmKCFkZWYpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BzIH0gPSBkZWY7XG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICBpZighcHJvcERlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAvLyBjb2xsZWN0IGJvdW5kIG5vZGVzIGFuZCByZW1vdmUgRE9NIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGNvbnN0IG5vZGVzID0gQXJyYXkoYmluZGluZ3MubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgZXZlbnROYW1lc3BhY2UgPSBkZWYuaWQgKyBrZXk7XG5cbiAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoYmluZGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIG5vZGVzW2luZGV4XSA9IGJpbmRpbmcubm9kZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9tLiQobm9kZXMpLm9mZihgJHtldmVudE5hbWV9LiR7ZXZlbnROYW1lc3BhY2V9YCwgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgYmluZCBhbmQgdW5iaW5kIGxpc3RlbmVycyBmcm9tIGdpdmVuIGtleVxuICAgIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYGJpbmQ6JHtrZXl9YCwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuICAgIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYHVuYmluZDoke2tleX1gLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2ZmL19yZW1vdmVkb21saXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCB0cmlnZ2VyT25lRE9NRXZlbnQgZnJvbSAnLi9fdHJpZ2dlcm9uZWRvbWV2ZW50JztcbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuXG4vLyB0cmlnZ2VycyBET00gZXZlbnQgb24gYm91bmQgbm9kZXNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJET01FdmVudChvYmplY3QsIGtleSwgZXZlbnROYW1lLCBzZWxlY3RvciwgdHJpZ2dlckFyZ3MpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZjtcbiAgICBjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuICAgIGlmKCFwcm9wRGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgIGlmKCFiaW5kaW5ncykge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKHsgbm9kZSB9KSA9PiB7XG5cbiAgICAgICAgaWYoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIC8vIGlmIHNlbGVjdG9yIGlzIGdpdmVuIHRyaWdnZXIgYW4gZXZlbnQgb24gYWxsIG5vZGUgZGVzY2VuZGFudHNcbiAgICAgICAgICAgIGNvbnN0IGRlc2NlbmRhbnRzID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChkZXNjZW5kYW50cywgZGVzY2VuZGFudCA9PiB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlck9uZURPTUV2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogZGVzY2VuZGFudCxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQXJnc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGFuIGV2ZW50IGZvciBzaW5nbGUgbm9kZVxuICAgICAgICAgICAgdHJpZ2dlck9uZURPTUV2ZW50KHtcbiAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyQXJnc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHJpZ2dlci9fdHJpZ2dlcmRvbWV2ZW50LmpzXG4gKiovIiwiLy8gdHJpZ2dlcnMgZ2l2ZW4gRE9NIGV2ZW50IG9uIGdpdmVuIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmVET01FdmVudCh7XG4gICAgbm9kZSxcbiAgICBldmVudE5hbWUsXG4gICAgdHJpZ2dlckFyZ3Ncbn0pIHtcbiAgICBjb25zdCB7IGRvY3VtZW50LCBFdmVudCB9ID0gd2luZG93O1xuICAgIGxldCBldmVudDtcblxuICAgIC8vIHBvbHlmaWxsIGZvciBvbGRlciBicm93c2Vyc1xuXHRpZihkb2N1bWVudC5jcmVhdGVFdmVudCkge1xuXHRcdC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cdFx0ZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcblx0XHRldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcblx0fSBlbHNlIGlmKHR5cGVvZiBFdmVudCAhPSAndW5kZWZpbmVkJykge1xuXHRcdGV2ZW50ID0gbmV3IEV2ZW50KGV2ZW50TmFtZSwge1xuXHRcdFx0YnViYmxlczogdHJ1ZSxcblx0XHRcdGNhbmNlbGFibGU6IHRydWVcblx0XHR9KTtcblx0fVxuXG4gICAgLy8gbWF0cmVzaGthVHJpZ2dlckFyZ3Mgd2lsbCBiZSB1c2VkIGluIGEgaGFuZGxlciBjcmVhdGVkIGJ5IGFkZERPTUxpc3RlbmVyXG4gICAgZXZlbnQubWF0cmVzaGthVHJpZ2dlckFyZ3MgPSB0cmlnZ2VyQXJncztcblxuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lZG9tZXZlbnQuanNcbiAqKi8iLCJkZXNjcmliZSgnRXZlbnRzIHN1bW1hcnkgKG9uLCBvZmYsIHRyaWdnZXIpJywgKCkgPT4ge1xuICAgIC8qbGV0IHEgPSAocywgYykgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgZXYuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuICAgICAgICB0YWdOYW1lOiAnRElWJyxcbiAgICAgICAgaWQ6ICdzLXRlc3QnLFxuICAgICAgICBpbm5lckhUTUw6IGBcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJzLXRlc3QtMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzLXRlc3QtMlwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH0pKTtcblxuICAgIG5vZGUuY2xpY2sgPSBub2RlLmNsaWNrIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuICAgIH0qL1xuXG5cblxuICAgIHhpdCgnZmlyZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIHhpdCgnZmlyZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3JlbW92ZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLm9mZihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsub2ZmKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdmaXJlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG5cbiAgICB4aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYzoge31cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMub2ZmKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgbWFnaWMub25jZShvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIHhpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBtYWdpYy5vbmNlKG9iaiwge1xuICAgICAgICAgICAgZm9vOiBmMSxcbiAgICAgICAgICAgIGJhcjogZjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoaikudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIHhpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgbWsub25jZSgnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgfSk7XG5cblxuICAgIHhpdCgnb25EZWJvdW5jZSB3b3JrcycsIGRvbmUgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgbWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICB9KTtcblxuICAgIHhpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBmMSA9IGV2dCA9PiBpKyssXG4gICAgICAgICAgICBmMiA9IGV2dCA9PiBqKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgODAwKTtcblxuICAgICAgICBtay5vbkRlYm91bmNlKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICB9KTtcblxuXG4gICAgeGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBoYW5kbGVycyA9IHtcbiAgICAgICAgICAgICAgICBmb286ICgpID0+IGkrKyxcbiAgICAgICAgICAgICAgICBiYXI6ICgpID0+IGkrK1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuICAgICAgICBNSy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBNSy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuXG4gICAgICAgIE1LLm9mZihvYmosIGhhbmRsZXJzKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcbiAgICB9KTtcblxuXG4gICAgeGl0KCdhbGxvd3MgdG8gZmxpcCBjb250ZXh0IGFuZCB0cmlnZ2VyT25Jbml0IChvbiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIHRoaXNBcmcgPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRydWUsIHRoaXNBcmcpO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2JhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRoaXNBcmcsIHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuICAgIH0pO1xuXG4gICAgeGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcsIDEsIDIpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGFkZFRyZWVMaXN0bmVyIGZyb20gJ3NyYy9vbi9fYWRkdHJlZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVUcmVlTGlzdG5lciBmcm9tICdzcmMvb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ1RyZWUgY2hhbmdlIGV2ZW50cycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGxpc3RlbiB0cmVlIGFuZCBzaG91bGQgcmVtb3ZlIGxpc3RlbmVycyBmcm9tIHByZXZpb3VzIHN1YnRyZWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLmQuZScpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZFRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jLmQuZScsIGhhbmRsZXIpO1xuXG4gICAgICAgIGNvbnN0IGUgPSBvYmouYS5iLmMuZC5lO1xuICAgICAgICBvYmouYS5iLmMuZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG5cbiAgICAgICAgLy8gb25jZSBhZ2FpblxuICAgICAgICBvYmouYS5iLmMuZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMik7XG5cbiAgICAgICAgY29uc3QgZCA9IG9iai5hLmIuYy5kO1xuICAgICAgICBvYmouYS5iLmMuZCA9IG1ha2VPYmplY3QoJ2UnKTtcbiAgICAgICAgZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMyk7XG5cblxuICAgICAgICBjb25zdCBjID0gb2JqLmEuYi5jO1xuICAgICAgICBvYmouYS5iLmMgPSBtYWtlT2JqZWN0KCdkLmUnKTtcbiAgICAgICAgYy5kID0gbWFrZU9iamVjdCgnZScpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDQpO1xuXG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYy5kLmUnKTtcbiAgICAgICAgYi5jID0gbWFrZU9iamVjdCgnZC5lJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoNSk7XG5cbiAgICAgICAgY29uc3QgYSA9IG9iai5hO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy5kLmUnKTtcbiAgICAgICAgYS5iID0gbWFrZU9iamVjdCgnYy5kLmUnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg2KTtcblxuICAgICAgICBvYmouYS5iLmMuZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoNyk7XG5cbiAgICAgICAgb2JqLmEuYi5jLmQgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg4KTtcblxuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg5KTtcblxuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTApO1xuXG4gICAgICAgIG9iai5hID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTEpO1xuXG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxMik7XG5cbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTMpO1xuXG4gICAgICAgIG9iai5hLmIuYy5kID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTQpO1xuXG4gICAgICAgIG9iai5hLmIuYy5kLmUgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxNSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbW92ZSB0cmVlIGxpc3RlbmVyIGJ5IGNhbGxiYWNrJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZFRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZVRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJywgaGFuZGxlcik7XG5cbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgdHJlZSBsaXN0ZW5lciB3aXRob3V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZFRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZVRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJyk7XG5cbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBub3QgcmVtb3ZlIHRyZWUgbGlzdGVuZXIgYnkgd3JvbmcgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgYWRkVHJlZUxpc3RuZXIob2JqLCAnYS5iLmMnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlVHJlZUxpc3RuZXIob2JqLCAnYS5iLmMnLCAoKSA9PiB7fSk7XG5cbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG5cbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygyKTtcblxuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDMpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvdHJlZV9jaGFuZ2Vfc3BlYy5qc1xuICoqLyIsInZhciBtYXAgPSB7XG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDIxLFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiAyMCxcblx0XCIuL19jb3JlL2luaXQuanNcIjogMTksXG5cdFwiLi9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXCI6IDI4LFxuXHRcIi4vX2RvbS9pbmRleC5qc1wiOiAyNyxcblx0XCIuL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZS5qc1wiOiA5NSxcblx0XCIuL19oZWxwZXJzL2RlYm91bmNlLmpzXCI6IDk3LFxuXHRcIi4vX2hlbHBlcnMvZGVlcGZpbmQuanNcIjogOTgsXG5cdFwiLi9faGVscGVycy9pcy5qc1wiOiAyNCxcblx0XCIuL19oZWxwZXJzL21hdHJlc2hrYWVycm9yLmpzXCI6IDk2LFxuXHRcIi4vX2hlbHBlcnMvdG9hcnJheS5qc1wiOiA5OSxcblx0XCIuL2FycmF5LmpzXCI6IDEwMCxcblx0XCIuL2JpbmRlcnMvX2NsYXNzbGlzdC5qc1wiOiA3LFxuXHRcIi4vYmluZGVycy9hdHRyLmpzXCI6IDksXG5cdFwiLi9iaW5kZXJzL2NsYXNzbmFtZS5qc1wiOiA2LFxuXHRcIi4vYmluZGVycy9kYXRhc2V0LmpzXCI6IDE3LFxuXHRcIi4vYmluZGVycy9kaXNwbGF5LmpzXCI6IDUsXG5cdFwiLi9iaW5kZXJzL2h0bWwuanNcIjogNCxcblx0XCIuL2JpbmRlcnMvaW5kZXguanNcIjogMyxcblx0XCIuL2JpbmRlcnMvaW5wdXQuanNcIjogMTAsXG5cdFwiLi9iaW5kZXJzL291dHB1dC5qc1wiOiAxMSxcblx0XCIuL2JpbmRlcnMvcHJvZ3Jlc3MuanNcIjogMTQsXG5cdFwiLi9iaW5kZXJzL3Byb3AuanNcIjogOCxcblx0XCIuL2JpbmRlcnMvc2VsZWN0LmpzXCI6IDEzLFxuXHRcIi4vYmluZGVycy9zdHlsZS5qc1wiOiAxNixcblx0XCIuL2JpbmRlcnMvdGV4dC5qc1wiOiAxNSxcblx0XCIuL2JpbmRlcnMvdGV4dGFyZWEuanNcIjogMTIsXG5cdFwiLi9iaW5kbm9kZS9fYmluZHNpbmdsZW5vZGUuanNcIjogNDksXG5cdFwiLi9iaW5kbm9kZS9fY3JlYXRlYmluZGluZ3N3aXRjaGVyLmpzXCI6IDQzLFxuXHRcIi4vYmluZG5vZGUvX2NyZWF0ZW5vZGVoYW5kbGVyLmpzXCI6IDUyLFxuXHRcIi4vYmluZG5vZGUvX2NyZWF0ZW9iamVjdGhhbmRsZXIuanNcIjogNTMsXG5cdFwiLi9iaW5kbm9kZS9fZ2V0bm9kZXMuanNcIjogMjUsXG5cdFwiLi9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanNcIjogMjYsXG5cdFwiLi9iaW5kbm9kZS9pbmRleC5qc1wiOiAxOCxcblx0XCIuL2JpbmRvcHRpb25hbG5vZGUuanNcIjogNTksXG5cdFwiLi9iaW5kc2FuZGJveC5qc1wiOiA2MCxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAzNyxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAzMSxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAzMCxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogNDAsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDM1LFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogNDIsXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMjksXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMzgsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDQxLFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAzOSxcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAzNixcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMzQsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDMzLFxuXHRcIi4vY2FsYy9fYWRkc291cmNlLmpzXCI6IDc4LFxuXHRcIi4vY2FsYy9fY3JlYXRlY2FsY2hhbmRsZXIuanNcIjogNzksXG5cdFwiLi9jYWxjL2luZGV4LmpzXCI6IDc3LFxuXHRcIi4vY2xhc3MuanNcIjogODEsXG5cdFwiLi9kZWZhdWx0YmluZGVycy5qc1wiOiA1MSxcblx0XCIuL2V4dGVuZC5qc1wiOiAzMixcblx0XCIuL2luZGV4LmpzXCI6IDEwMSxcblx0XCIuL2xvb2tmb3JiaW5kZXIuanNcIjogNTAsXG5cdFwiLi9tYWdpYy5qc1wiOiAxMDQsXG5cdFwiLi9tYXRyZXNoa2EvaW5kZXguanNcIjogMTAyLFxuXHRcIi4vb2JqZWN0L2luZGV4LmpzXCI6IDEwMyxcblx0XCIuL29mZi9fcmVtb3ZlZG9tbGlzdGVuZXIuanNcIjogODksXG5cdFwiLi9vZmYvX3JlbW92ZWxpc3RlbmVyLmpzXCI6IDQ2LFxuXHRcIi4vb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXIuanNcIjogNDcsXG5cdFwiLi9vZmYvX3VuZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA0NSxcblx0XCIuL29mZi9pbmRleC5qc1wiOiAxMDUsXG5cdFwiLi9vbi9fYWRkZG9tbGlzdGVuZXIuanNcIjogODcsXG5cdFwiLi9vbi9fYWRkbGlzdGVuZXIuanNcIjogNTQsXG5cdFwiLi9vbi9fYWRkdHJlZWxpc3RlbmVyLmpzXCI6IDU2LFxuXHRcIi4vb24vX2NyZWF0ZWRvbWV2ZW50aGFuZGxlci5qc1wiOiA4OCxcblx0XCIuL29uL19kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDU1LFxuXHRcIi4vb24vaW5kZXguanNcIjogMTA2LFxuXHRcIi4vcGFyc2ViaW5kaW5ncy5qc1wiOiAxMDcsXG5cdFwiLi9zZWxlY3QuanNcIjogNjEsXG5cdFwiLi9zZWxlY3RhbGwuanNcIjogNjIsXG5cdFwiLi9zZXQuanNcIjogMjIsXG5cdFwiLi90cmlnZ2VyL190cmlnZ2VyZG9tZXZlbnQuanNcIjogOTAsXG5cdFwiLi90cmlnZ2VyL190cmlnZ2Vyb25lLmpzXCI6IDIzLFxuXHRcIi4vdHJpZ2dlci9fdHJpZ2dlcm9uZWRvbWV2ZW50LmpzXCI6IDkxLFxuXHRcIi4vdHJpZ2dlci9pbmRleC5qc1wiOiAxMDgsXG5cdFwiLi91bmJpbmRub2RlL19yZW1vdmViaW5kaW5nLmpzXCI6IDQ4LFxuXHRcIi4vdW5iaW5kbm9kZS9pbmRleC5qc1wiOiA0NFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA5NDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSA5NFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IG1hdHJlc2hrYUVycm9yIGZyb20gJy4vbWF0cmVzaGthZXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3QsIG1ldGhvZCkge1xuICAgIGNvbnN0IHR5cGVvZk9iamVjdCA9IG9iamVjdCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBvYmplY3Q7XG5cbiAgICBpZiAodHlwZW9mT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignY29tbW9uOm9iamVjdF90eXBlJywge1xuICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19oZWxwZXJzL2NoZWNrb2JqZWN0dHlwZS5qc1xuICoqLyIsImNvbnN0IGJpbmRpbmdFcnJvclByZWZpeCA9ICdCaW5kaW5nIGVycm9yOic7XG5jb25zdCBjYWxjRXJyb3JQcmVmaXggPSAnQ2FsYyBlcnJvcjonO1xuY29uc3QgZ2V0VHlwZSA9IHZhcmlhYmxlID0+IHtcbiAgICBpZih2YXJpYWJsZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlb2YgdmFyaWFibGU7XG59O1xuY29uc3QgZ2V0VHlwZUVycm9yID0gKHZhcmlhYmxlLCB2YXJpYWJsZU5hbWUsIGV4cGVjdGVkVHlwZSkgPT5cbiAgICBgJHt2YXJpYWJsZU5hbWV9IG11c3QgaGF2ZSB0eXBlIFwiJHtleHBlY3RlZFR5cGV9XCIgYnV0IGdvdCBcIiR7Z2V0VHlwZSh2YXJpYWJsZSl9XCIgaW5zdGVhZC5gXG5cbmNvbnN0IGVycm9ycyA9IHtcbiAgICAnYmluZGluZzpub2RlX21pc3NpbmcnOiAoeyBrZXksIG5vZGUgfSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvckluZm8gPSB0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgPyBgIFRoZSBzZWxlY3RvciBpcyAke25vZGV9YCA6ICcnO1xuICAgICAgICByZXR1cm4gYCR7YmluZGluZ0Vycm9yUHJlZml4fSBub2RlIGlzIG1pc3NpbmcgZm9yICR7a2V5fS4ke3NlbGVjdG9ySW5mb31gO1xuICAgIH0sXG4gICAgJ2JpbmRpbmc6ZmFsc3lfa2V5JzogKCkgPT4gJ0JpbmRpbmcgZXJyb3I6IFwia2V5XCIgYXJnIGNhbm5vdCBiZSBmYWxzeScsXG4gICAgJ2JpbmRpbmc6aW5zdGFuY2Vfbm9kZXNfbWlzc2luZyc6ICh7ICRub2RlcyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSAhJG5vZGVzID8gJyRub2RlcycgOiAnbm9kZXMnO1xuICAgICAgICByZXR1cm4gYCR7YmluZGluZ0Vycm9yUHJlZml4fSBcIiR7bWlzc2luZ31cIiBwcm9wZXJ0eSBvZiBNYXRyZXNoa2EgaW5zdGFuY2UgaXMgbWlzc2luZy4gYFxuICAgICAgICAgICAgKyAnSXQgbXVzdCBiZSBhbiBvYmplY3QgYW5kIG11c3Qgbm90IGJlIHJlYXNzaWduZWQuJztcbiAgICB9LFxuICAgICdjb21tb246b2JqZWN0X3R5cGUnOiAoeyBvYmplY3QsIG1ldGhvZCB9KSA9PiBnZXRUeXBlRXJyb3Iob2JqZWN0LCBtZXRob2QsICdvYmplY3QnKSxcbiAgICAnY2FsYzp0YXJnZXRfdHlwZSc6ICh7IHRhcmdldCB9KSA9PlxuICAgICAgICBgJHtjYWxjRXJyb3JQcmVmaXh9ICR7Z2V0VHlwZUVycm9yKHRhcmdldCwgJ3RhcmdldCBrZXknLCAnc3RyaW5nJyl9YCxcbiAgICAnY2FsYzpzb3VyY2Vfa2V5X3R5cGUnOiAoeyBzb3VyY2VLZXkgfSkgPT5cbiAgICAgICAgYCR7Y2FsY0Vycm9yUHJlZml4fSAke2dldFR5cGVFcnJvcihzb3VyY2VLZXksICdzb3VyY2Uga2V5JywgJ3N0cmluZycpfWAsXG4gICAgJ2NhbGM6c291cmNlX29iamVjdF90eXBlJzogKHsgc291cmNlT2JqZWN0IH0pID0+XG4gICAgICAgIGAke2NhbGNFcnJvclByZWZpeH0gJHtnZXRUeXBlRXJyb3Ioc291cmNlT2JqZWN0LCAnc291cmNlIG9iamVjdCcsICdvYmplY3QnKX1gLFxuICAgICdjYWxjOnNvdXJjZV90eXBlJzogKHsgc291cmNlIH0pID0+XG4gICAgICAgIGAke2NhbGNFcnJvclByZWZpeH0gJHtnZXRUeXBlRXJyb3Ioc291cmNlLCAnc291cmNlJywgJ29iamVjdCcpfWAsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRyZXNoa2FFcnJvcihrZXksIGRhdGEpIHtcbiAgICBjb25zdCBnZXRFcnJvciA9IGVycm9yc1trZXldO1xuICAgIGlmICghZ2V0RXJyb3IpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoYFVua25vd24gZXJyb3IgXCIke2tleX1cImApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3IoZGF0YSkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2hlbHBlcnMvbWF0cmVzaGthZXJyb3IuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCBnaXZlbkRlbGF5LCB0aGlzQXJnKSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgbGV0IGRlbGF5O1xuICAgIGlmICh0eXBlb2YgZGVsYXkgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRoaXNBcmcgPSBnaXZlbkRlbGF5OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRlbGF5ID0gMDtcbiAgICB9XG5cbiAgICBkZWxheSA9IGdpdmVuRGVsYXkgfHwgMDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGNvbnN0IFthMSwgYTJdID0gYXJncztcbiAgICAgICAgY29uc3QgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IHRoaXNBcmcgfHwgdGhpcztcblxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGFyZ3NMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0LCBhMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0LCBhMSwgYTIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNhbGxDb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9faGVscGVycy9kZWJvdW5jZS5qc1xuICoqLyIsIi8vIGdldHMgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpbiBuZXN0ZWQgb2JqZWN0XG4vLyBwYXRoIGV4YW1wbGU6IGEuYi5jLmRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZXBGaW5kKG9iaiwgcGF0aCkge1xuXHR2YXIgcGF0aHMgPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoLFxuXHRcdGN1cnJlbnQgPSBvYmosXG5cdFx0aTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyArK2kpIHtcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRbcGF0aHNbaV1dID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50ID0gY3VycmVudFtwYXRoc1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9faGVscGVycy9kZWVwZmluZC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0LCBzdGFydCkge1xuXHR2YXIgYXJyYXkgPSBbXSxcblx0XHRsID0gb2JqZWN0Lmxlbmd0aCxcblx0XHRpO1xuXG5cdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblxuXHRmb3IgKGkgPSBzdGFydDsgaSA8IGw7IGkrKykge1xuXHRcdGFycmF5W2kgLSBzdGFydF0gPSBvYmplY3RbaV07XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9faGVscGVycy90b2FycmF5LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FycmF5LmpzXG4gKiovIiwiaW1wb3J0IE1hdHJlc2hrYSBmcm9tICcuL21hdHJlc2hrYSc7XG5pbXBvcnQgTWF0cmVzaGthQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgTWF0cmVzaGthT2JqZWN0IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBDbGFzcyBmcm9tICcuL2NsYXNzJztcbi8vaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG4vL01hdHJlc2hrYS5iaW5kZXJzID0gYmluZGVycztcblxuZXhwb3J0IGRlZmF1bHQgTWF0cmVzaGthO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi4vY2xhc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBDbGFzcyh7XG4gICAgLy8gaW5zdGFuY2UgcHJvcGVyaWVzIGFuZCBtZXRob2RzXG5cbn0sIHtcbiAgICAvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuICAgIGV4dGVuZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYXRyZXNoa2EvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2JqZWN0L2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hZ2ljLmpzXG4gKiovIiwiXG4vLyAvXigoW15AXSspQCk/KCguKz8pKDo6KFteXFwoXFwpXSspPyhcXCgoLiopXFwpKT8pPyk/JC9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24ob2JqZWN0LCBuYW1lcywgY2FsbGJhY2ssIHRyaWdnZXJPbkluaXQsIGNvbnRleHQsIGluZm8pIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBpbmZvID0gY29udGV4dDtcbiAgICAgICAgY29udGV4dCA9IHRyaWdnZXJPbkluaXQ7XG4gICAgICAgIHRyaWdnZXJPbkluaXQgPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2sgPSBuYW1lcztcbiAgICAgICAgbmFtZXMgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnb24nKTtcbiAgICB9XG5cblxuICAgIGlmIChuYW1lcyAmJiB0eXBlb2YgbmFtZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKG5hbWVzLCAobmFtZXNPYmpOYW1lLCBuYW1lc09iakNhbGxiYWNrKSA9PlxuICAgICAgICAgICAgb24ob2JqZWN0LCBuYW1lc09iak5hbWUsIG5hbWVzT2JqQ2FsbGJhY2ssIGNhbGxiYWNrLCB0cmlnZ2VyT25Jbml0LCBjb250ZXh0KSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIG5hbWVzICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignb246bmFtZXNfdHlwZScsIHsgbmFtZXMgfSlcbiAgICB9XG5cbiAgICBuYW1lcyA9IG5hbWVzIGluc3RhbmNlb2YgQXJyYXkgPyBuYW1lcyA6IG5hbWVzXG4gICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJykgLy8gc2luZ2xlIHNwYWNlcyBvbmx5XG4gICAgICAgIC5zcGxpdCgvXFxzKD8hW14oXSpcXCkpL2cpOyAvLyBzcGxpdCBieSBzcGFjZXNcblxuICAgIGlmICh0eXBlb2YgdHJpZ2dlck9uSW5pdCAhPT0gJ2Jvb2xlYW4nICYmIHR5cGVvZiB0cmlnZ2VyT25Jbml0ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFtjb250ZXh0LCB0cmlnZ2VyT25Jbml0XSA9IFt0cmlnZ2VyT25Jbml0LCBjb250ZXh0XTtcblx0fVxuXG4gICAgbm9mbi5mb3JFYWNoKG5hbWVzLCBuYW1lID0+IHtcbiAgICAgICAgY29uc3QgbGFzdEluZGV4T2ZFVCA9IG5hbWUubGFzdEluZGV4T2YoJ0AnKTtcblxuICAgICAgICBpZiAofmxhc3RJbmRleE9mRVQpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IEFycmF5LnByb3RvdHlwZS5zbGljZSBpcyBzbG93XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gbmFtZS5zbGljZSgwLCBsYXN0SW5kZXhPZkVUKTtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnNsaWNlKGxhc3RJbmRleE9mRVQgKyAxKTtcblxuICAgICAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi9pbmRleC5qc1xuICoqLyIsIi8vaW1wb3J0IHBhcnNlckJyYWNrZXRzIGZyb20gJy4vX2JpbmRpbmdzL3BhcnNlcmJyYWNrZXRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGVzKSB7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BhcnNlYmluZGluZ3MuanNcbiAqKi8iLCIvLyB0cmlnZ2VycyBldmVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlciguLi5hbGxBcmdzKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgY29uc3QgW2dpdmVuTmFtZXMsIC4uLmFyZ3NdID0gYWxsQXJncztcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBbb2JqZWN0LCBnaXZlbk5hbWVzLCAuLi5hcmdzXSA9IGFsbEFyZ3M7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3RyaWdnZXInKTtcbiAgICB9XG4gICAgbGV0IG5hbWVzO1xuXG4gICAgaWYodHlwZW9mIG5hbWVzID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYW1lcyA9IGdpdmVuTmFtZXMuc3BsaXQoL1xccysvKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG1hdHJlc2hrYUVycm9yKCd0cmlnZ2VyOm5hbWVfdHlwZScsIHsgbmFtZTogZ2l2ZW5OYW1lcyB9KVxuICAgIH1cblxuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcblxuICAgIGlmKCFhbGxFdmVudHMpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cblxuICAgIG5vZm4uZm9yRWFjaChuYW1lcywgbmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXTtcblxuICAgICAgICAvKmlmKH5uYW1lLmluZGV4T2YoJzo6JykpIHtcblx0XHRcdGV4ZWN1dGVkID0gZG9tRXZ0UmVnLmV4ZWMobmFtZSk7XG5cdFx0XHRub2RlcyA9IG9iamVjdERhdGEuc3BlY2lhbFtleGVjdXRlZFszXSB8fCAnc2FuZGJveCddO1xuXHRcdFx0bm9kZXMgPSBub2RlcyAmJiBub2Rlcy4kbm9kZXM7XG5cdFx0XHRfbm9kZXMgPSBjb3JlLiQoKTtcblx0XHRcdHNlbGVjdG9yID0gZXhlY3V0ZWRbNV07XG5cdFx0XHRpZihzZWxlY3Rvcikge1xuXHRcdFx0XHRmb3IoaiA9IDA7IGogPCBub2Rlcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdF9ub2RlcyA9IF9ub2Rlcy5hZGQobm9kZXMuZmluZChzZWxlY3RvcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfbm9kZXMgPSBub2Rlcztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGogPSAwOyBqIDwgX25vZGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHRyaWdnZXJET01FdmVudChfbm9kZXNbaV0sIGV4ZWN1dGVkWzFdLCBhcmdzKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuXHRcdFx0aWYgKGV2ZW50cykge1xuXHRcdFx0XHRqID0gLTEsIGwgPSBldmVudHMubGVuZ3RoO1xuXHRcdFx0XHR3aGlsZSAoKytqIDwgbCkoZXYgPSBldmVudHNbal0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG5cdFx0XHR9XG5cdFx0fSovXG4gICAgfSk7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RyaWdnZXIvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9