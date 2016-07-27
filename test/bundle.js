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
	
	var componentsContext = __webpack_require__(91);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/binders_spec.js": 2,
		"./bindings/bindings_parser_spec.js": 61,
		"./bindings/bindings_spec.js": 62,
		"./bindings/default_binders_spec.js": 69,
		"./bquery/add_spec.js": 70,
		"./bquery/create_spec.js": 71,
		"./bquery/events_spec.js": 72,
		"./bquery/find_spec.js": 74,
		"./bquery/init_spec.js": 75,
		"./bquery/is_spec.js": 76,
		"./bquery/not_spec.js": 77,
		"./bquery/one_spec.js": 78,
		"./bquery/parsehtml_spec.js": 79,
		"./calc_spec.js": 80,
		"./class_spec.js": 82,
		"./events/delegated_collection_spec.js": 84,
		"./events/delegated_spec.js": 85,
		"./events/events_change_spec.js": 86,
		"./events/events_core_spec.js": 87,
		"./events/events_dom_spec.js": 88,
		"./events/events_summary_spec.js": 89,
		"./events/tree_change_spec.js": 90
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
	
	var bindSingleNode = __webpack_require__(52);
	
	var checkObjectType = __webpack_require__(24);
	
	var MatreshkaError = __webpack_require__(25);
	
	var delegateListener = __webpack_require__(59);
	
	var addListener = __webpack_require__(57);
	
	var removeListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(23);
	
	var unbindNode = __webpack_require__(47);
	
	var addTreeListener = __webpack_require__(60);
	
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
	                //console.log('azazalo', deepPath.slice(0, deepPathLength - 1));
	                addTreeListener(object, deepPath.slice(0, deepPathLength - 1), changeHandler);
	
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
	
	    // trigger delegated events logic
	    if (isChanged) {
	        var _changeDelegatedEvtName = '_change:tree:' + key;
	        if (events[_changeDelegatedEvtName]) {
	            triggerOne(object, _changeDelegatedEvtName, extendedEvt);
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
	    var lastDeepPathItem = deepPath[deepPathLength - 1];
	    var value = changeEvt.value;
	    var previousValue = changeEvt.previousValue;
	    var restPath = changeEvt.restPath;
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var undelegateListener = __webpack_require__(48);
	
	// removes tree listener from all object tree of fiven path
	module.exports = removeTreeListener;
	function removeTreeListener(object, deepPath, handler) {
	    if (typeof deepPath === 'string') {
	        deepPath = deepPath.split('.');
	    }
	
	    // iterate over keys of the path and undelegate given handler (can be undefined)
	    for (var i = 0; i < deepPath.length; i++) {
	        // TODO slice is slow
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
	
	var runNodeHandler = __webpack_require__(55);
	
	var runObjectHandler = __webpack_require__(56);
	
	var triggerOne = __webpack_require__(23);
	
	var addListener = __webpack_require__(57);
	
	var debounce = __webpack_require__(58);
	
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
	        if (debounceOption || debounceOption === 0) {
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
/* 56 */
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
/* 57 */
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
	            var argCallback = callback && callback._callback || callback;
	            var evtCallback = _evt.callback._callback || _evt.callback;
	            if (argCallback === evtCallback && _evt.context === context) {
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
/* 58 */
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(59);
	
	var removeTreeListener = __webpack_require__(50);
	
	// creates tree listener
	function getTreeListener(_ref) {
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
	module.exports = addTreeListener;
	function addTreeListener(object, deepPath, handler) {
	    if (typeof deepPath === 'string') {
	        deepPath = deepPath.split('.');
	    }
	
	    // iterate over all keys and delegate listener for all objects of given branch
	    for (var i = 0; i < deepPath.length; i++) {
	        // TODO slice method is slow
	        var listenPath = deepPath.slice(0, i);
	        var restPath = deepPath.slice(i + 1);
	
	        delegateListener(object, listenPath, '_change:tree:' + deepPath[i], getTreeListener({
	            handler: handler,
	            restPath: restPath
	        }));
	    }
	}

/***/ },
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(18);
	
	var bindOptionalNode = __webpack_require__(63);
	
	var bindSandbox = __webpack_require__(64);
	
	var unbindNode = __webpack_require__(47);
	
	var select = __webpack_require__(65);
	
	var selectAll = __webpack_require__(66);
	
	var addListener = __webpack_require__(57);
	
	var makeObject = __webpack_require__(67);
	
	var createSpy = __webpack_require__(68);
	
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
/* 63 */
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
/* 64 */
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
/* 65 */
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
/* 66 */
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
/* 67 */
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
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-unresolved */
	
	
	var $ = __webpack_require__(32);
	
	var simulateClick = __webpack_require__(73);
	
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
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
/* 77 */
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
/* 78 */
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
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var calc = __webpack_require__(81);
	
	var addListener = __webpack_require__(57);
	
	var makeObject = __webpack_require__(67);
	
	var createSpy = __webpack_require__(68);
	
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(19);
	
	var checkObjectType = __webpack_require__(24);
	
	var matreshkaError = __webpack_require__(25);
	
	var addListener = __webpack_require__(57);
	
	var delegateListener = __webpack_require__(59);
	
	var debounce = __webpack_require__(58);
	
	var addSource = __webpack_require__(100);
	
	var runCalcHandler = __webpack_require__(101);
	
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
	    var calcHandler = function () {
	        var changeEvent = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	        return runCalcHandler({
	            object: object,
	            changeEvent: changeEvent,
	            eventOptions: eventOptions,
	            allSources: allSources,
	            target: target,
	            def: def,
	            handler: handler
	        });
	    };
	
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(83);
	
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
/* 83 */
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
/* 84 */
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(59);
	
	var undelegateListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(23);
	
	var makeObject = __webpack_require__(67);
	
	var createSpy = __webpack_require__(68);
	
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
	var delegateListener = __webpack_require__(59);
	
	var undelegateListener = __webpack_require__(48);
	
	var removeListener = __webpack_require__(49);
	
	var makeObject = __webpack_require__(67);
	
	var createSpy = __webpack_require__(68);
	
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
	var removeListener = __webpack_require__(49);
	
	var triggerOne = __webpack_require__(23);
	
	var createSpy = __webpack_require__(68);
	
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
/* 88 */
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
/* 89 */
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addTreeListner = __webpack_require__(60);
	
	var removeTreeListner = __webpack_require__(50);
	
	var makeObject = __webpack_require__(67);
	
	var createSpy = __webpack_require__(68);
	
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
	
	    it('should lremove tree listener', function () {
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
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_core/defineprop.js": 21,
		"./_core/defs.js": 20,
		"./_core/init.js": 19,
		"./_dom/default-dollar.js": 31,
		"./_dom/index.js": 30,
		"./_util/checkobjecttype.js": 24,
		"./_util/debounce.js": 58,
		"./_util/deepfind.js": 99,
		"./_util/is.js": 26,
		"./_util/matreshkaerror.js": 25,
		"./_util/toarray.js": 29,
		"./array.js": 92,
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
		"./bindnode/_getnodes.js": 27,
		"./bindnode/_runnodehandler.js": 55,
		"./bindnode/_runobjecthandler.js": 56,
		"./bindnode/_selectnodes.js": 28,
		"./bindnode/_switchbinding.js": 46,
		"./bindnode/index.js": 18,
		"./bindoptionalnode.js": 63,
		"./bindsandbox.js": 64,
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
		"./calc/_addsource.js": 100,
		"./calc/_runcalchandler.js": 101,
		"./calc/index.js": 81,
		"./class.js": 83,
		"./defaultbinders.js": 54,
		"./extend.js": 35,
		"./index.js": 93,
		"./lookforbinder.js": 53,
		"./magic.js": 96,
		"./matreshka/index.js": 94,
		"./object/index.js": 95,
		"./off/_removelistener.js": 49,
		"./off/_removetreelistener.js": 50,
		"./off/_undelegatelistener.js": 48,
		"./on/_addlistener.js": 57,
		"./on/_addtreelistener.js": 60,
		"./on/_delegatelistener.js": 59,
		"./on/index.js": 97,
		"./parsebindings.js": 98,
		"./select.js": 65,
		"./selectall.js": 66,
		"./set.js": 22,
		"./trigger/_triggerone.js": 23,
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
	webpackContext.id = 91;


/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(94);
	
	var MatreshkaArray = __webpack_require__(92);
	
	var MatreshkaObject = __webpack_require__(95);
	
	var Class = __webpack_require__(83);
	
	//import binders from './binders';
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	//Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(35);
	
	var Class = __webpack_require__(83);
	
	module.exports = Class({
	    // instance properies and methods
	
	}, {
	    // static properties and methods
	    extend: extend
	});

/***/ },
/* 95 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 96 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 97 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ },
/* 98 */
/***/ function(module, exports) {

	"use strict";
	
	//import parserBrackets from './_bindings/parserbrackets';
	
	module.exports = parseBindings;
	function parseBindings(object, nodes) {}

/***/ },
/* 99 */
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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(57);
	
	var addTreeListener = __webpack_require__(60);
	
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var set = __webpack_require__(22);
	
	var deepFind = __webpack_require__(99);
	
	// TODO add description and comments
	module.exports = runCalcHandler;
	function runCalcHandler(_ref) {
		var object = _ref.object;
		var changeEvent = _ref.changeEvent;
		var eventOptions = _ref.eventOptions;
		var allSources = _ref.allSources;
		var target = _ref.target;
		var def = _ref.def;
		var handler = _ref.handler;
	
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
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDYyZjY0OWU0MjIxNjFlZDg0ZDkiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9odG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9hdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9kYXRhc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LmpzIiwid2VicGFjazovLy8uL3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9jaGVja29iamVjdHR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX2dldG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kbm9kZS9fc2VsZWN0bm9kZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL3RvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kb20vZGVmYXVsdC1kb2xsYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2h0bWwybm9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2V4dGVuZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29uLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvX2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9pcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L29mZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2FkZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L25vdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L2ZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlL19zd2l0Y2hiaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy91bmJpbmRub2RlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vZmYvX3VuZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmL19yZW1vdmVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuYmluZG5vZGUvX3JlbW92ZWJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlL19iaW5kc2luZ2xlbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9va2ZvcmJpbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlL19ydW5ub2RlaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG5vZGUvX3J1bm9iamVjdGhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uL19hZGRsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uL19kZWxlZ2F0ZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9fYWRkdHJlZWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19wYXJzZXJfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG9wdGlvbmFsbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZHNhbmRib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0YWxsLmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL21ha2VvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvY3JlYXRlc3B5LmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9iaW5kaW5ncy9kZWZhdWx0X2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvY2FsY19zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9jYWxjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9jbGFzc19zcGVjLmpzIiwid2VicGFjazovLy8uL3NyYy9jbGFzcy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvdHJlZV9jaGFuZ2Vfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hZ2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFyc2ViaW5kaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvZGVlcGZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbGMvX2FkZHNvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2FsYy9fcnVuY2FsY2hhbmRsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBLEtBQU0sMkJBQTJCLEVBQWpDOztBQUVBO0FBQ0E7QUFDQSxLQUFNLGVBQWUsc0JBQXJCOztBQUVBLFVBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN6QixTQUFPLHlCQUF5QixPQUF6QixDQUFpQyxJQUFqQyxLQUEwQyxDQUFqRDtBQUNBOztBQUVELEtBQUksV0FBVyxhQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FBMkIsVUFBM0IsQ0FBZjs7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QU0sUUFBUSxjQUFjLFNBQVMsWUFBVCxFQUF1QixTQUF2QixDQUFkLEdBQWtELGFBQWEsU0FBYixDQUFoRTtBQUNBLFVBQU8sSUFBUCxDQUFZLEtBQVo7QUFDQTs7QUFFRCxNQUFNLGNBQWMsUUFBUSxLQUFSLENBQWMsTUFBZCxFQUFzQixNQUF0QixDQUFwQjtBQUNBLE1BQUksTUFBSixFQUFZLE1BQVosRUFBb0IsV0FBcEIsRUFBaUMsZUFBakM7QUFDQSxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDYyZjY0OWU0MjIxNjFlZDg0ZDlcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanNcIjogNjEsXG5cdFwiLi9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXCI6IDYyLFxuXHRcIi4vYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanNcIjogNjksXG5cdFwiLi9icXVlcnkvYWRkX3NwZWMuanNcIjogNzAsXG5cdFwiLi9icXVlcnkvY3JlYXRlX3NwZWMuanNcIjogNzEsXG5cdFwiLi9icXVlcnkvZXZlbnRzX3NwZWMuanNcIjogNzIsXG5cdFwiLi9icXVlcnkvZmluZF9zcGVjLmpzXCI6IDc0LFxuXHRcIi4vYnF1ZXJ5L2luaXRfc3BlYy5qc1wiOiA3NSxcblx0XCIuL2JxdWVyeS9pc19zcGVjLmpzXCI6IDc2LFxuXHRcIi4vYnF1ZXJ5L25vdF9zcGVjLmpzXCI6IDc3LFxuXHRcIi4vYnF1ZXJ5L29uZV9zcGVjLmpzXCI6IDc4LFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXCI6IDc5LFxuXHRcIi4vY2FsY19zcGVjLmpzXCI6IDgwLFxuXHRcIi4vY2xhc3Nfc3BlYy5qc1wiOiA4Mixcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXCI6IDg0LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXCI6IDg1LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1wiOiA4Nixcblx0XCIuL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXCI6IDg3LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qc1wiOiA4OCxcblx0XCIuL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXCI6IDg5LFxuXHRcIi4vZXZlbnRzL3RyZWVfY2hhbmdlX3NwZWMuanNcIjogOTBcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge1xuXHRodG1sLFxuXHR0ZXh0LFxuXHRwcm9wLFxuXHRhdHRyLFxuXHRjbGFzc05hbWUsXG5cdGRhdGFzZXQsXG5cdHN0eWxlLFxuXHRkaXNwbGF5XG59IGZyb20gJ3NyYy9iaW5kZXJzJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuXG5kZXNjcmliZSgnQmluZGVycycsICgpID0+IHtcblx0Y29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuXHRjb25zdCBkYXRhc2V0SXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5kYXRhc2V0ID8gaXQgOiB4aXQ7XG5cdGxldCBvYmo7XG5cdGxldCBub2RlO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgcHJvcCcsICgpID0+IHtcblx0XHRub2RlLnNvbWVQcm9wID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHByb3AoJ3NvbWVQcm9wJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUuc29tZVByb3ApLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgYXR0cicsICgpID0+IHtcblx0XHRub2RlLnNldEF0dHJpYnV0ZSgnc29tZS1hdHRyaWJ1dGUnLCAnZm9vJyk7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGF0dHIoJ3NvbWVQcm9wJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJykpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUuc2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScsICdiYXInKTtcblx0XHRleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJykpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgaHRtbCcsICgpID0+IHtcblx0XHRub2RlLmlubmVySFRNTCA9ICc8aT5mb288L2k+Jztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgaHRtbCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCc8aT5mb288L2k+Jyk7XG5cdFx0b2JqLnggPSAnPGI+YmFyPC9iPic7XG5cdFx0ZXhwZWN0KG5vZGUuaW5uZXJIVE1MKS50b0VxdWFsKCc8Yj5iYXI8L2I+Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCB0ZXh0JywgKCkgPT4ge1xuXHRcdG5vZGUudGV4dENvbnRlbnQgPSAnPGk+Zm9vPC9pPic7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHRleHQoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnPGk+Zm9vPC9pPicpO1xuXHRcdG9iai54ID0gJzxiPmJhcjwvYj4nO1xuXHRcdGV4cGVjdChub2RlLnRleHRDb250ZW50KS50b0VxdWFsKCc8Yj5iYXI8L2I+Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBzdHlsZScsICgpID0+IHtcblx0XHRub2RlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzdHlsZSgndGV4dEFsaWduJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2NlbnRlcicpO1xuXHRcdG9iai54ID0gJ3JpZ2h0Jztcblx0XHRleHBlY3Qobm9kZS5zdHlsZS50ZXh0QWxpZ24pLnRvRXF1YWwoJ3JpZ2h0Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBkaXNwbGF5JywgKCkgPT4ge1xuXHRcdG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBkaXNwbGF5KHRydWUpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKGZhbHNlKTtcblx0XHRvYmoueCA9IHRydWU7XG5cdFx0ZXhwZWN0KG5vZGUuc3R5bGUuZGlzcGxheSkudG9FcXVhbCgnJyk7XG5cblx0XHRub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblx0XHRiaW5kTm9kZShvYmosICd5Jywgbm9kZSwgZGlzcGxheShmYWxzZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLnkpLnRvRXF1YWwodHJ1ZSk7XG5cdFx0b2JqLnkgPSBmYWxzZTtcblx0XHRleHBlY3Qobm9kZS5zdHlsZS5kaXNwbGF5KS50b0VxdWFsKCcnKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGNsYXNzTmFtZScsICgpID0+IHtcblx0XHQvLyBASUU5XG5cdFx0bm9kZS5jbGFzc05hbWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgY2xhc3NOYW1lKCdmb28nKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCh0cnVlKTtcblx0XHRvYmoueCA9IGZhbHNlO1xuXHRcdGV4cGVjdChub2RlLmNsYXNzTmFtZSkudG9FcXVhbCgnJyk7XG5cblx0XHRub2RlLmNsYXNzTmFtZSA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBjbGFzc05hbWUoJ2ZvbycsIGZhbHNlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChmYWxzZSk7XG5cdFx0b2JqLnggPSB0cnVlO1xuXHRcdGV4cGVjdChub2RlLmNsYXNzTmFtZSkudG9FcXVhbCgnJyk7XG5cdH0pO1xuXG5cdGRhdGFzZXRJdCgnc2hvdWxkIGJpbmQgZGF0YXNldCcsICgpID0+IHtcblx0XHQvLyBASUU5XG5cdFx0bm9kZS5kYXRhc2V0LmZvbyA9ICdiYXInO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBkYXRhc2V0KCdmb28nKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG5cdFx0b2JqLnggPSAnYmF6Jztcblx0XHRleHBlY3Qobm9kZS5kYXRhc2V0LmZvbykudG9FcXVhbCgnYmF6Jyk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kZXJzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaHRtbCBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBjbGFzc05hbWUgZnJvbSAnLi9jbGFzc25hbWUnO1xuaW1wb3J0IHByb3AgZnJvbSAnLi9wcm9wJztcbmltcG9ydCBhdHRyIGZyb20gJy4vYXR0cic7XG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgb3V0cHV0IGZyb20gJy4vb3V0cHV0JztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL3RleHRhcmVhJztcbmltcG9ydCBzZWxlY3QgZnJvbSAnLi9zZWxlY3QnO1xuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xuaW1wb3J0IHRleHQgZnJvbSAnLi90ZXh0JztcbmltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlJztcbmltcG9ydCBkYXRhc2V0IGZyb20gJy4vZGF0YXNldCc7XG5cbmV4cG9ydCB7XG4gICAgaHRtbCxcbiAgICBkaXNwbGF5LFxuICAgIGNsYXNzTmFtZSxcbiAgICBwcm9wLFxuICAgIGF0dHIsXG4gICAgaW5wdXQsXG4gICAgb3V0cHV0LFxuICAgIHRleHRhcmVhLFxuICAgIHNlbGVjdCxcbiAgICBwcm9ncmVzcyxcbiAgICB0ZXh0LFxuICAgIHN0eWxlLFxuICAgIGRhdGFzZXRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbCgpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogJ2lucHV0JywgLy8gdGhlIGV2ZW50IG5hbWUgZmlyZXMgb25seSBpbiBjb250ZW50ZWRpdGFibGUgbW9kZVxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gYCR7dmFsdWV9YDtcblx0XHR9XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvaHRtbC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BsYXkoc3dpdGNoZXI9dHJ1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdHlsZS5kaXNwbGF5XG4gICAgICAgICAgICAgICAgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcykuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpO1xuICAgICAgICAgICAgY29uc3Qgbm9uZSA9IHZhbHVlID09PSAnbm9uZSc7XG4gICAgICAgICAgICByZXR1cm4gc3dpdGNoZXIgPyAhbm9uZSA6IG5vbmU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYoc3dpdGNoZXIpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvZGlzcGxheS5qc1xuICoqLyIsImltcG9ydCB7XG4gICAgdG9nZ2xlLFxuICAgIGNvbnRhaW5zXG59IGZyb20gJy4vX2NsYXNzbGlzdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYXNzTmFtZShjbGFzc05hbWUsIHN3aXRjaGVyPXRydWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbnRhaW5zKHRoaXMsIGNsYXNzTmFtZSk7XG5cdFx0XHRyZXR1cm4gc3dpdGNoZXIgPyB2YWx1ZSA6ICF2YWx1ZTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlKHRoaXMsIGNsYXNzTmFtZSwgc3dpdGNoZXIgPyAhIXZhbHVlIDogIXZhbHVlKVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzXG4gKiovIiwiLy8gQElFOVxuXG5sZXQgYWRkO1xubGV0IHJlbW92ZTtcbmxldCBjb250YWlucztcblxuaWYoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuY2xhc3NMaXN0KSB7XG4gICAgYWRkID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICByZW1vdmUgPSAobm9kZSwgbmFtZSkgPT4gbm9kZS5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgIGNvbnRhaW5zID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xufSBlbHNlIHtcbiAgICBhZGQgPSAobm9kZSwgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiICsgbmFtZSArIFwiKFxcXFxzfCQpXCIsIFwiZ1wiKTtcblx0XHRpZiAoIXJlLnRlc3Qobm9kZS5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IChub2RlLmNsYXNzTmFtZSArIFwiIFwiICsgbmFtZSkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikucmVwbGFjZSgvKF4gfCAkKS9nLCBcIlwiKTtcbiAgICAgICAgfVxuXHR9XG5cblx0cmVtb3ZlID0gKG5vZGUsIG5hbWUpID0+IHtcblx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIGMgKyBcIihcXFxcc3wkKVwiLCBcImdcIik7XG5cdFx0bm9kZS5jbGFzc05hbWUgPSBub2RlLmNsYXNzTmFtZS5yZXBsYWNlKHJlLCBcIiQxXCIpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyheIHwgJCkvZywgXCJcIik7XG5cdH1cblxuXHRjb250YWlucyA9IChub2RlLCBjKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBuYW1lICsgJyhcXFxcc3wkKScpLnRlc3Qobm9kZS5jbGFzc05hbWUpO1xuXHR9XG59XG5cbmNvbnN0IHRvZ2dsZSA9IChub2RlLCBuYW1lLCBzd2l0Y2hlcikgPT4ge1xuICAgIGlmKHN3aXRjaGVyKSB7XG4gICAgICAgIGFkZChub2RlLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUobm9kZSwgbmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIHRvZ2dsZSxcbiAgICBjb250YWluc1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9fY2xhc3NsaXN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzW3Byb3BlcnR5TmFtZV07XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0Ly8gaW4gY2FzZSB3aGVuIHlvdSdyZSB0cnlpbmcgdG8gc2V0IHJlYWQtb25seSBwcm9wZXJ0eVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0fTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3Byb3AuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdHRyKGF0dHJpYnV0ZU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2F0dHIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnB1dCh0eXBlKSB7XG4gICAgbGV0IG9uO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnICYmIHRoaXMudmFsdWUgPT0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIGNhc2UgJ2hpZGRlbic6XG4gICAgICAgICAgICBvbiA9IG51bGw7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICBvbiA9ICdjaGFuZ2UnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XG4gICAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICBjYXNlICd0ZWwnOlxuICAgICAgICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzogKi9cbiAgICAgICAgZGVmYXVsdDogLy8gb3RoZXIgZnV0dXJlIChIVE1MNispIGlucHV0c1xuICAgICAgICAgICAgb24gPSAnaW5wdXQnO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBvbixcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2lucHV0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3V0cHV0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlIHx8IHRoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9ICdmb3JtJyBpbiB0aGlzID8gJ3ZhbHVlJyA6ICd0ZXh0Q29udGVudCc7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IHZhbHVlID09PSBudWxsID8gJycgOiBgJHt2YWx1ZX1gO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL291dHB1dC5qc1xuICoqLyIsImltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGV4dGFyZWEoKSB7XG5cdHJldHVybiBpbnB1dCgndGV4dCcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdChtdWx0aXBsZSkge1xuICAgIGlmIChtdWx0aXBsZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb246ICdjaGFuZ2UnLFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IG9wdGlvbnMubGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChvcHRpb25zW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUoZ2l2ZW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBnaXZlblZhbHVlID09PSAnc3RyaW5nJyA/IFtnaXZlblZhbHVlXSA6IGdpdmVuVmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogJ2NoYW5nZScsXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zW2ldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvc2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0ZXh0YXJlYSgpIHtcblx0cmV0dXJuIGlucHV0KCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3Byb2dyZXNzLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0b246ICdpbnB1dCcsIC8vIHRoZSBldmVudCBuYW1lIGZpcmVzIG9ubHkgaW4gY29udGVudGVkaXRhYmxlIG1vZGVcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLnRleHRDb250ZW50O1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSBgJHt2YWx1ZX1gO1xuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvdGV4dC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0eWxlKHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG51bGwsXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlW3Byb3BlcnR5XVxuICAgICAgICAgICAgICAgIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVbcHJvcGVydHldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9zdHlsZS5qc1xuICoqLyIsIi8vIHJlcGxhY2UgbmFtZXNMaWtlVGhpcyB3aXRoIG5hbWVzLWxpa2UtdGhpc1xuY29uc3QgdG9EYXNoZWQgPSAobmFtZSkgPT4ge1xuICAgIHJldHVybiAnZGF0YS0nICsgbmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csICh1KSA9PiBcIi1cIiArIHUudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGFzZXQocHJvcCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0aWYodGhpcy5kYXRhc2V0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhc2V0W3Byb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUodG9EYXNoZWQocHJvcCkpO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQpIHtcblx0XHRcdFx0dGhpcy5kYXRhc2V0W3Byb3BdID0gdmFsdWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldEF0dHJpYnV0ZSh0b0Rhc2hlZChwcm9wKSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvZGF0YXNldC5qc1xuICoqLyIsImltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19nZXRub2Rlcyc7XG5pbXBvcnQgc3dpdGNoQmluZGluZyBmcm9tICcuL19zd2l0Y2hiaW5kaW5nJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kc2luZ2xlbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4uL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5pbXBvcnQgTWF0cmVzaGthRXJyb3IgZnJvbSAnLi4vX3V0aWwvbWF0cmVzaGthZXJyb3InO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4uL3VuYmluZG5vZGUnO1xuaW1wb3J0IGFkZFRyZWVMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkdHJlZWxpc3RlbmVyJztcblxuLy8gdGhlIG1haW4gbWV0aG9kIG9mIHRoZSBmcmFtZXdvcms6IGJpbmRzIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRvIEhUTUwgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnRPcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZlbnRPcHRpb25zID0gYmluZGVyO1xuICAgICAgICBiaW5kZXIgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnYmluZE5vZGUnKTtcbiAgICB9XG5cbiAgICBldmVudE9wdGlvbnMgPSBldmVudE9wdGlvbnMgfHwge307XG4gICAgYmluZGVyID0gYmluZGVyIHx8IHt9O1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IHtcbiAgICAgICAgb3B0aW9uYWw9YmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnLFxuICAgICAgICBkZWVwPXRydWUsXG4gICAgICAgIHNpbGVudD1mYWxzZVxuICAgIH0gPSBldmVudE9wdGlvbnM7XG5cbiAgICBkZWxldGUgYmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnO1xuXG4gICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBrZXkgaXMgbm90IGdpdmVuXG4gICAgaWYoIWtleSkge1xuICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzpmYWxzeV9rZXknKTtcbiAgICB9XG5cbiAgICBpZiAoa2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYodHlwZW9mIGtleVswXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Yga2V5c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbJ2EnLCAnYicsICdjJ10sIG5vZGUpXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50T3B0aW9ucykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgKiB0aGlzLmJpbmROb2RlKFt7a2V5LCBub2RlLCBiaW5kZXIsIGV2ZW50fV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZSxcbiAgICAgICAgICAgICAgICBiaW5kZXI6IGl0ZW1CaW5kZXIsXG4gICAgICAgICAgICAgICAgZXZlbnQ6IGl0ZW1FdmVudE9wdGlvbnNcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudE9wdGlvbnMgPSBub2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50T3B0aW9ucyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYoY29tbW9uRXZlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJnbG9iYWxcIiBldmVudFxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudE9wdGlvbnMsIGNvbW1vbkV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaXRlbUV2ZW50T3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50T3B0aW9ucywgaXRlbUV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgaXRlbUJpbmRlciwgbWVyZ2VkRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIC8vIGNoZWNrIG5vZGUgZXhpc3RlbmNlXG4gICAgaWYgKCEkbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOm5vZGVfbWlzc2luZycsIHsga2V5LCBub2RlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlZXAgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG4gICAgICAgIGlmIChkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBiaW5kaW5nIHdoZW4ga2V5IGFyZyBpbmNsdWRlcyBkb3RzIChlZyBcImEuYi5jLmRcIilcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZUhhbmRsZXIgPSAoY2hhbmdlRXZ0ID0ge30pID0+IHN3aXRjaEJpbmRpbmcoe1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VFdnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgZGVlcFBhdGgsXG4gICAgICAgICAgICAgICAgICAgICRub2RlcyxcbiAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBldmVudE9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGJpbmROb2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnYXphemFsbycsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMSkpO1xuICAgICAgICAgICAgYWRkVHJlZUxpc3RlbmVyKG9iamVjdCwgZGVlcFBhdGguc2xpY2UoMCwgZGVlcFBhdGhMZW5ndGggLSAxKSwgY2hhbmdlSGFuZGxlcik7XG5cbiAgICAgICAgICAgIGNoYW5nZUhhbmRsZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICAvLyBpZiBvYmplY3QgaXMgTWF0cmVzaGthIGluc3RhbmNlIHRoZW4gZXh0ZW5kIFwiJG5vZGVzXCIgYW5kIFwibm9kZXNcIiBvYmplY3RzXG4gICAgICAgIGNvbnN0IHsgJG5vZGVzOiAkYWxsTm9kZXMsIG5vZGVzOiBhbGxOb2RlcyB9ID0gb2JqZWN0O1xuXG4gICAgICAgIGlmKCEkYWxsTm9kZXMgfHwgIWFsbE5vZGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJywge1xuICAgICAgICAgICAgICAgICRub2RlczogJGFsbE5vZGVzLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBhbGxOb2Rlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldICYmICRhbGxOb2Rlc1trZXldLmxlbmd0aFxuICAgICAgICAgICAgPyAkYWxsTm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG5cbiAgICAgICAgYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldWzBdO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBiaW5kaW5nIGZvciBldmVyeSBub2RlIHNlcGFyYXRlbHlcbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCAobm9kZSkgPT4gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZSxcbiAgICAgICAga2V5LFxuICAgICAgICBldmVudE9wdGlvbnMsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgcHJvcERlZlxuICAgIH0pKTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9pbmRleC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbmxldCBvYmplY3RJZCA9IDA7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuICAgIGxldCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIGRlZiA9IHtcbiAgICAgICAgICAgIC8vIGEgcHJvcGVydHkgbmFtZSBvZiBcImV2ZW50c1wiIG9iamVjdCBpcyBhbiBldmVudCBuYW1lXG4gICAgICAgICAgICAvLyBhbmQgYSB2YWx1ZSBpcyBhbiBhcnJheSBvZiBldmVudCBoYW5kbGVyc1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGN0eDogb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBvYmplY3QyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4YW1wbGVcIixcblx0XHRcdFx0XHRpbmZvOiB7fVxuICAgICAgICAgICAgICAgIH0gKi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBcInByb3BzXCIgY29udGFpbnMgc3BlY2lhbCBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzIChnZXR0ZXJzLCBzZXR0ZXJzIGV0YylcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV0sXG4gICAgICAgICAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBtZWRpYXRvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ3M6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RIYW5kbGVyLFxuXHRcdFx0XHRcdFx0Li4ub3RoZXIgcmVxdWlyZWQgaW5mb1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkOiBvYmplY3RJZCsrXG4gICAgICAgIH07XG5cbiAgICAgICAgZGVmcy5zZXQob2JqZWN0LCBkZWYpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRNSyhvYmplY3QpIHtcbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIG9iamVjdDtcbiAgICBpZiAoIW9iamVjdCB8fCB0eXBlICE9PSAnb2JqZWN0Jykge1xuXHRcdC8vIFRPRE8gdGhyb3cgbWF0cmVzaGthRXJyb3JcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuICAgIH1cblxuICAgIC8vIGlmIG9iamVjdCBoYXMgX2luaXRNSyBtZXRob2QsIHJ1biBpdFxuICAgIC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcbiAgICAvLyBldmVyeSBfaW5pdE1LIGltcGxlbWVudGF0aW9uIGhhdmUgdG8gcnVuIGNvbW1vbkluaXQgb3IgcGFyZW50J3MgX2luaXRNS1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbiAgICByZXR1cm4gb2JqZWN0Ll9pbml0TWF0cmVzaGthID8gb2JqZWN0Ll9pbml0TWF0cmVzaGthKCkgOiBjb21tb25Jbml0KG9iamVjdCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9pbml0LmpzXG4gKiovIiwiZnVuY3Rpb24gUHNldWRvTWFwKCkge31cblxuLy8gUHNldWRvTWFwIHNpbXVsYXRlcyBXZWFrTWFwIGJlaGF2aW9yIHdpdGggTygxKSBzZWFyY2ggY29tcGxleGl0eVxuLy8gaXQncyBuZWVkZWQgZm9yIEBJRTkgYW5kIEBJRTEwXG5ub2ZuLmFzc2lnbihQc2V1ZG9NYXAucHJvdG90eXBlLCB7XG4gICAgZ2V0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqLm1hdHJlc2hrYURhdGE7XG4gICAgfSxcbiAgICBzZXQob2JqLCBkYXRhKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuICAgICAgICAgICAgdmFsdWU6IGRhdGEsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoYXMob2JqKSB7XG4gICAgICAgIHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyBuZXcgUHNldWRvTWFwKCkgOiBuZXcgV2Vha01hcCgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbi8vIHRoZSBmdW5jdGlvbiBkZWZpbmVzIG5lZWRlZCBkZXNjcmlwdG9yIGZvciBnaXZlbiBwcm9wZXJ0eSBcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghZGVmLnByb3BzW2tleV0pIHtcbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgZ2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgbWVkaWF0b3I6IG51bGwsXG4gICAgICAgICAgICBiaW5kaW5nczogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuZ2V0dGVyID8gcHJvcERlZi5nZXR0ZXIuY2FsbChvYmplY3QpIDogcHJvcERlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuICAgICAgICAgICAgICAgICAgICBmcm9tU2V0dGVyOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZWYucHJvcHNba2V5XTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZmluZXByb3AuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGlzIGZyb20gJy4vX3V0aWwvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gc2V0cyBuZXcgdmFsdWUgZm9yIGEgcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldChvYmplY3QsIGtleSwgdmFsdWUsIGV2dCA9IHt9KSB7XG4gICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NldCcpO1xuXG4gICAgLy8gaWYgbm8ga2V5IG9yIGZhbHN5IGtleSBpcyBnaXZlblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghZGVmKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcywgZXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuICAgIGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghcHJvcERlZikge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgdmFsdWU6IHByZXZpb3VzVmFsdWUsIG1lZGlhdG9yIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gcG9zc2libGUgZmxhZ3NcbiAgICBjb25zdCB7XG4gICAgICAgIHNraXBNZWRpYXRvcixcbiAgICAgICAgZnJvbU1lZGlhdG9yLFxuICAgICAgICBmb3JjZSxcbiAgICAgICAgZm9yY2VIVE1MLFxuICAgICAgICBzaWxlbnQsXG4gICAgICAgIHNpbGVudEhUTUwsXG4gICAgICAgIHNraXBMaW5rc1xuICAgIH0gPSBldnQ7XG5cbiAgICBsZXQgbmV3VmFsdWU7XG5cbiAgICBpZiAobWVkaWF0b3IgJiYgIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSAmJiAhc2tpcE1lZGlhdG9yICYmICFmcm9tTWVkaWF0b3IpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICBuZXdWYWx1ZSA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWlzKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcblxuICAgIC8vIGFkZCB0byBldnQgb2JqZWN0IHNvbWUgdXNlZnVsIHByb3BlcnRpZXNcbiAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBzZWxmOiBvYmplY3QsXG4gICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgIGtleSxcbiAgICAgICAgaXNDaGFuZ2VkXG4gICAgfSwgZXZ0KTtcblxuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2lsZW50O1xuXG4gICAgLy8gdHJpZ2dlciBiZWZvcmVjaGFuZ2U6S0VZIGFuZCBiZWZvcmVjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlU3RyID0gJ2JlZm9yZWNoYW5nZSc7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZUV2dE5hbWUgPSBgJHtiZWZvcmVjaGFuZ2VTdHJ9OiR7a2V5fWA7XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuICAgIGlmICghc2lsZW50SFRNTCAmJiAoaXNDaGFuZ2VkIHx8IGZvcmNlIHx8IGZvcmNlSFRNTCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQmluZGluZ3NFdnROYW1lID0gYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgY2hhbmdlOktFWSBhbmQgY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ciA9ICdjaGFuZ2UnO1xuICAgICAgICBjb25zdCBjaGFuZ2VFdnROYW1lID0gYCR7Y2hhbmdlU3RyfToke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihldmVudHNbY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG4gICAgaWYgKChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFza2lwTGlua3MpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVwc0V2dE5hbWUgPSBgX2NoYW5nZTpkZXBzOiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlbGVnYXRlZEV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgZGVsZWdhdGVkIGV2ZW50cyBsb2dpY1xuICAgIGlmKGlzQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6dHJlZToke2tleX1gO1xuICAgICAgICBpZiAoZXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NldC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmlnZ2VyT25lKG9iamVjdCwgbmFtZSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICBpZiAoIWRlZikgcmV0dXJuO1xuXG4gICAgY29uc3QgZXZlbnRzID0gZGVmLmV2ZW50c1tuYW1lXTtcblxuICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IG5vZm4uc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgY29uc3QgbCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IFthMSwgYTJdID0gYXJncztcblxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBldjtcblxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IHtcbiAgICBpbmZvOiB7fSxcbiAgICBuYW1lOiBudWxsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdHJpZ2dlci9fdHJpZ2dlcm9uZS5qc1xuICoqLyIsImltcG9ydCBtYXRyZXNoa2FFcnJvciBmcm9tICcuL21hdHJlc2hrYWVycm9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqZWN0LCBtZXRob2QpIHtcbiAgICBjb25zdCB0eXBlb2ZPYmplY3QgPSBvYmplY3QgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygb2JqZWN0O1xuXG4gICAgaWYgKHR5cGVvZk9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbWF0cmVzaGthRXJyb3IoJ2NvbW1vbjpvYmplY3RfdHlwZScsIHtcbiAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcbiAqKi8iLCJjb25zdCBiaW5kaW5nRXJyb3JQcmVmaXggPSAnQmluZGluZyBlcnJvcjonO1xuY29uc3QgY2FsY0Vycm9yUHJlZml4ID0gJ0NhbGMgZXJyb3I6JztcbmNvbnN0IGdldFR5cGUgPSB2YXJpYWJsZSA9PiB7XG4gICAgaWYodmFyaWFibGUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlO1xufTtcbmNvbnN0IGdldFR5cGVFcnJvciA9ICh2YXJpYWJsZSwgdmFyaWFibGVOYW1lLCBleHBlY3RlZFR5cGUpID0+XG4gICAgYCR7dmFyaWFibGVOYW1lfSBtdXN0IGhhdmUgdHlwZSBcIiR7ZXhwZWN0ZWRUeXBlfVwiIGJ1dCBnb3QgXCIke2dldFR5cGUodmFyaWFibGUpfVwiIGluc3RlYWQuYFxuXG5jb25zdCBlcnJvcnMgPSB7XG4gICAgJ2JpbmRpbmc6bm9kZV9taXNzaW5nJzogKHsga2V5LCBub2RlIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JJbmZvID0gdHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnID8gYCBUaGUgc2VsZWN0b3IgaXMgJHtub2RlfWAgOiAnJztcbiAgICAgICAgcmV0dXJuIGAke2JpbmRpbmdFcnJvclByZWZpeH0gbm9kZSBpcyBtaXNzaW5nIGZvciAke2tleX0uJHtzZWxlY3RvckluZm99YDtcbiAgICB9LFxuICAgICdiaW5kaW5nOmZhbHN5X2tleSc6ICgpID0+ICdCaW5kaW5nIGVycm9yOiBcImtleVwiIGFyZyBjYW5ub3QgYmUgZmFsc3knLFxuICAgICdiaW5kaW5nOmluc3RhbmNlX25vZGVzX21pc3NpbmcnOiAoeyAkbm9kZXMgfSkgPT4ge1xuICAgICAgICBjb25zdCBtaXNzaW5nID0gISRub2RlcyA/ICckbm9kZXMnIDogJ25vZGVzJztcbiAgICAgICAgcmV0dXJuIGAke2JpbmRpbmdFcnJvclByZWZpeH0gXCIke21pc3Npbmd9XCIgcHJvcGVydHkgb2YgTWF0cmVzaGthIGluc3RhbmNlIGlzIG1pc3NpbmcuIGBcbiAgICAgICAgICAgICsgJ0l0IG11c3QgYmUgYW4gb2JqZWN0IGFuZCBtdXN0IG5vdCBiZSByZWFzc2lnbmVkLic7XG4gICAgfSxcbiAgICAnY29tbW9uOm9iamVjdF90eXBlJzogKHsgb2JqZWN0LCBtZXRob2QgfSkgPT4gZ2V0VHlwZUVycm9yKG9iamVjdCwgbWV0aG9kLCAnb2JqZWN0JyksXG4gICAgJ2NhbGM6dGFyZ2V0X3R5cGUnOiAoeyB0YXJnZXQgfSkgPT5cbiAgICAgICAgYCR7Y2FsY0Vycm9yUHJlZml4fSAke2dldFR5cGVFcnJvcih0YXJnZXQsICd0YXJnZXQga2V5JywgJ3N0cmluZycpfWAsXG4gICAgJ2NhbGM6c291cmNlX2tleV90eXBlJzogKHsgc291cmNlS2V5IH0pID0+XG4gICAgICAgIGAke2NhbGNFcnJvclByZWZpeH0gJHtnZXRUeXBlRXJyb3Ioc291cmNlS2V5LCAnc291cmNlIGtleScsICdzdHJpbmcnKX1gLFxuICAgICdjYWxjOnNvdXJjZV9vYmplY3RfdHlwZSc6ICh7IHNvdXJjZU9iamVjdCB9KSA9PlxuICAgICAgICBgJHtjYWxjRXJyb3JQcmVmaXh9ICR7Z2V0VHlwZUVycm9yKHNvdXJjZU9iamVjdCwgJ3NvdXJjZSBvYmplY3QnLCAnb2JqZWN0Jyl9YCxcbiAgICAnY2FsYzpzb3VyY2VfdHlwZSc6ICh7IHNvdXJjZSB9KSA9PlxuICAgICAgICBgJHtjYWxjRXJyb3JQcmVmaXh9ICR7Z2V0VHlwZUVycm9yKHNvdXJjZSwgJ3NvdXJjZScsICdvYmplY3QnKX1gLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG4gICAgY29uc3QgZ2V0RXJyb3IgPSBlcnJvcnNba2V5XTtcbiAgICBpZiAoIWdldEVycm9yKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yKGRhdGEpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlLCBuby1jb25mdXNpbmctYXJyb3cgKi9cbi8vIGRldGVybWluZXMgd2hldGhlciB0d28gdmFsdWVzIGFyZSB0aGUgc2FtZSB2YWx1ZVxuY29uc3QgaXNQb2x5ZmlsbCA9ICh2MSwgdjIpID0+XG4gICAgdjEgPT09IDAgJiYgdjIgPT09IDAgPyAxIC8gdjEgPT09IDEgLyB2MiA6IHYxICE9PSB2MSAmJiB2MiAhPT0gdjIgfHwgdjEgPT09IHYyO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuaXMgfHwgaXNQb2x5ZmlsbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2lzLmpzXG4gKiovIiwiaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vX3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuY29uc3QgaHRtbFJlZyA9IC88LztcbmNvbnN0IGN1c3RvbVNlbGVjdG9yUmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG4vLyBUT0RPIHdyaXRlIGRlc2NyaXB0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlcyhvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgbGV0IG5vZGVzO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhaHRtbFJlZy50ZXN0KHNlbGVjdG9yKSAmJiBjdXN0b21TZWxlY3RvclJlZy50ZXN0KHNlbGVjdG9yKSkge1xuICAgICAgICBub2RlcyA9IHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBub2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19nZXRub2Rlcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi4vX3V0aWwvdG9hcnJheSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclJlZyA9IC9cXHMqOmJvdW5kXFwoKFteKF0qKVxcKVxccyooW1xcU1xcc10qKVxccyp8XFxzKjpzYW5kYm94XFxzKihbXFxTXFxzXSopXFxzKi87XG5cbi8vIFRPRE8gYWRkIGRlc2NyaXB0aW9uXG4vLyBUT0RPIHRoaXMgZnVuY3Rpb24gbG9va3Mgbm90IGdvb2QsIGl0IG5lZWRzIHRvIGJlIHJlZmFjdG9yZWQgYW5kIGFjY2VsZXJhdGVkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIGdpdmVuU2VsZWN0b3IpIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGdpdmVuU2VsZWN0b3Iuc3BsaXQoJywnKTtcbiAgICBsZXQgcmVzdWx0ID0gZG9tLiQoKTtcblxuICAgIG5vZm4uZm9yRWFjaChzZWxlY3RvcnMsIHNlbGVjdG9yID0+IHtcbiAgICAgICAgY29uc3QgZXhlY1Jlc3VsdCA9IGN1c3RvbVNlbGVjdG9yUmVnLmV4ZWMoc2VsZWN0b3IpO1xuICAgICAgICBpZihleGVjUmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEtleSA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/ICdzYW5kYm94JyA6IGV4ZWNSZXN1bHRbMV07XG4gICAgICAgICAgICBjb25zdCBzdWJTZWxlY3RvciA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/IGV4ZWNSZXN1bHRbM10gOiBleGVjUmVzdWx0WzJdO1xuICAgICAgICAgICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2JvdW5kS2V5XTtcblxuICAgICAgICAgICAgaWYocHJvcERlZikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG4gICAgICAgICAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmROb2RlcyA9IEFycmF5KGJpbmRpbmdzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKGJpbmRpbmcsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kTm9kZXNbaV0gPSBiaW5kaW5nLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpIC5teS1zZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGNvbnRhaW5zIGNoaWxkcmVuIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvci5pbmRleE9mKCc+JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RpbmcgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tQXR0ciA9IGBtJHtNYXRoLnJhbmRvbSgpfWAucmVwbGFjZSgnLicsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tQXR0ciwgcmFuZG9tQXR0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGBbJHtyYW5kb21BdHRyfT1cIiR7cmFuZG9tQXR0cn1cIl0gJHtzdWJTZWxlY3Rvcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKHJhbmRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc3ViU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmcganVzdCBhZGQgYm91bmQgbm9kZXMgdG8gcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGJvdW5kTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3IgKG5vIGN1c3RvbSB0aGluZ3MpXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19zZWxlY3Rub2Rlcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0LCBzdGFydCkge1xuXHR2YXIgYXJyYXkgPSBbXSxcblx0XHRsID0gb2JqZWN0Lmxlbmd0aCxcblx0XHRpO1xuXG5cdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblxuXHRmb3IgKGkgPSBzdGFydDsgaSA8IGw7IGkrKykge1xuXHRcdGFycmF5W2kgLSBzdGFydF0gPSBvYmplY3RbaV07XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC90b2FycmF5LmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcbiAgICAkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuICAgIGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcbiAgICAgICAgICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcbiAgICAgICAgZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG4gICAgfVxufSBlbHNlIHtcbiAgICB1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG4gICAgZm46IEluaXQucHJvdG90eXBlLFxuICAgIGV4dGVuZCxcbiAgICBwYXJzZUhUTUwsXG4gICAgb25lLFxuICAgIGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBpcyxcbiAgICBhZGQsXG4gICAgbm90LFxuICAgIGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChnaXZlbkhUTUwpIHtcbiAgICAvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG4gICAgY29uc3Qgd3JhcE1hcCA9IHtcbiAgICAgICAgb3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcbiAgICAgICAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgICAgICAgdGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICAgICAgICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gICAgICAgIHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgY29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcbiAgICAgICAgYXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcbiAgICAgICAgXzogWzAsICcnLCAnJ11cbiAgICB9O1xuXG4gICAgY29uc3QgaHRtbCA9IGdpdmVuSFRNTC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaTtcblxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcbiAgICB3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuICAgIHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG4gICAgY29uc3QgZXggPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZXggJiYgd3JhcE1hcFtleFsxXV0gfHwgd3JhcE1hcC5fO1xuXG4gICAgbm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cbiAgICBpID0gd3JhcHBlclswXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBuZXcgSW5pdChodG1sMm5vZGVMaXN0KGh0bWwpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiBtYXRjaGVkIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25lKHMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbi8vIFRPRE8gZ2V0IHJpZCBvZiBpdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiB0YWdOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwcm9wcyA9IHRhZ05hbWU7XG4gICAgICAgIHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihlbFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSAhPT0gJ3RhZ05hbWUnKSB7XG4gICAgICAgICAgICAgICAgZWxba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCByYW5kb21JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICd4Jyk7XG4gICAgY29uc3Qgc2NvcGVTZWxlY3RvciA9IGBbJHtyYW5kb21JRH09XCIke3JhbmRvbUlEfVwiXSBgO1xuICAgIGNvbnN0IHNwbGl0dGVkU2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuXG4gICAgbGV0IG1hdGNoaW5nID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcbiAgICAgICAgbWF0Y2hpbmcgKz0gYCR7aSA9PT0gMCA/ICcnIDogJywnfSR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0sJHtzY29wZVNlbGVjdG9yfSR7c2VsfSAqYDtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cbiAgICBpZiAoaXMuY2FsbChbZXZ0LnRhcmdldF0sIG1hdGNoaW5nKSkge1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXNTdHIsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lc1N0ci5zcGxpdCgvXFxzLyk7XG4gICAgbGV0IGRlbGVnYXRlO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGlzdCkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbi5qc1xuICoqLyIsIi8vIHNoYXJlIGRhdGEgYmV0d2VlbiBhcyBhbiBvYmplY3QgbW9kdWxlcyBiZWNhdXNlIHdlIHVzZVxuLy8gc2ltcGxpZmllZCBlcyBtb2R1bGVzIHRoZXJlIGFuZCBjYW5ub3QgaW1wb3J0IGFuZCBzaGFyZSBhIG51bWJlclxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5vZGVJbmRleDogMCxcbiAgICBhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXNbMF07XG4gICAgcmV0dXJuIG5vZGVcbiAgICAgICAgPyAobm9kZS5tYXRjaGVzXG4gICAgICAgICAgICB8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2lzLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIHJlbW92ZXMgZXZlbnQgaGFuZGxlciBmcm9tIGEgc2V0IG9mIGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuZGVsZWdhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IGV2ZW50Lm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgaWRNYXAgPSB7fTtcblxuICAgIGxldCByZXN1bHQ7XG5cbiAgICBzZWxlY3RvciA9IG5ldyBJbml0KHNlbGVjdG9yKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW5pdCh0aGlzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByZXN1bHRbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gc2VsZWN0b3JbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWYgKCFpZE1hcFtub2RlSURdKSB7XG4gICAgICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvbm90LmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIGVsZW1lbnRzLFxuLy8gZmlsdGVyZWQgYnkgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICAgIGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2ZpbmQuanNcbiAqKi8iLCJpbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcbi8vIHJlLWFkZHMgYmluZGluZyB3aGVuIG9iamVjdCBicmFuY2ggaXMgY2hhbmdlZFxuLy8gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSBiaW5kTm9kZSB3aGVuIHNvbWV0aGluZyBsaWtlXG4vLyAnZm9vLmJhci5iYXonIGlzIHBhc3NlZCB0byBpdCBhcyBrZXkgYXJnIHZhbHVlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2l0Y2hCaW5kaW5nKHtcbiAgICBjaGFuZ2VFdnQsXG4gICAgb2JqZWN0LFxuICAgIGRlZXBQYXRoLFxuICAgICRub2RlcyxcbiAgICBiaW5kZXIsXG4gICAgZXZlbnRPcHRpb25zLFxuICAgIGJpbmROb2RlXG59KSB7XG4gICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG4gICAgY29uc3QgbGFzdERlZXBQYXRoSXRlbSA9IGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV07XG4gICAgY29uc3Qge1xuICAgICAgICB2YWx1ZSwgLy8gbmV3IHZhbHVlIG9mIGEgYnJhbmNoXG4gICAgICAgIHByZXZpb3VzVmFsdWUsIC8vIHByZXZpb3VzIHZhbHVlIG9mIGEgYnJhbmNoXG4gICAgICAgIHJlc3RQYXRoIC8vIHBhdGggc3RhcnRpbmcgY3VycmVudGx5IGNoYW5nZWQgYnJhbmNoXG4gICAgfSA9IGNoYW5nZUV2dDtcbiAgICBsZXQgdGFyZ2V0OyAvLyBhbiBvYmplY3QgdG8gY2FsbCBiaW5kTm9kZVxuICAgIGxldCBwcmV2aW91c1RhcmdldDsgLy8gYW4gb2JqZWN0IHRvIGNhbGwgdW5iaW5kTm9kZVxuXG5cbiAgICBpZih2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHJlc3RQYXRoKSB7XG4gICAgICAgIC8vIGlmIHJlc3QgcGF0aCBpcyBnaXZlbiBhbmQgbmV3IHZhbHVlIGlzIGFuIG9iamVjdFxuICAgICAgICB0YXJnZXQgPSB2YWx1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN0UGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W3Jlc3RQYXRoW2ldXTtcbiAgICAgICAgICAgIGlmKCF0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHJlc3QgcGF0aCBpcyBub3QgZ2l2ZW5cbiAgICAgICAgdGFyZ2V0ID0gb2JqZWN0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbZGVlcFBhdGhbaV1dO1xuICAgICAgICAgICAgaWYoIXRhcmdldCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgcmVzdCBwYXRoIGlzIGdpdmVuIGFuZCBuZXcgdmFsdWUgaXMgYW4gb2JqZWN0XG4gICAgaWYgKHByZXZpb3VzVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdvYmplY3QnICYmIHJlc3RQYXRoKSB7XG4gICAgICAgIHByZXZpb3VzVGFyZ2V0ID0gcHJldmlvdXNWYWx1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN0UGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJldmlvdXNUYXJnZXQgPSBwcmV2aW91c1RhcmdldFtyZXN0UGF0aFtpXV07XG4gICAgICAgICAgICBpZighcHJldmlvdXNUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBiaW5kaW5nIGZvciBuZXcgdGFyZ2V0XG4gICAgaWYodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGJpbmROb2RlKHRhcmdldCwgbGFzdERlZXBQYXRoSXRlbSwgJG5vZGVzLCBiaW5kZXIsIGV2ZW50T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGJpbmRpbmcgZm9yIHByZXZpb3VzbHkgdXNlZCBvYmplY3RcbiAgICBpZihwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuYmluZE5vZGUocHJldmlvdXNUYXJnZXQsIGxhc3REZWVwUGF0aEl0ZW0sICRub2Rlcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvX3N3aXRjaGJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4uL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuLi9iaW5kbm9kZS9fZ2V0bm9kZXMnO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJy4uL2JpbmRub2RlJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL191bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZVRyZWVMaXN0ZW5lciBmcm9tICcuLi9vZmYvX3JlbW92ZXRyZWVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlQmluZGluZyBmcm9tICcuL19yZW1vdmViaW5kaW5nJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSc7XG5cbi8vIHVuYmluZHMgYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBldmVudE9wdGlvbnMpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldmVudE9wdGlvbnMgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAndW5iaW5kTm9kZScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGV2ZW50T3B0aW9ucykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbeyBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnQgfV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZVxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBhY2NlcHQga2V5LW5vZGUgb2JqZWN0XG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGtleU9iaktleSwga2V5T2JqVmFsdWUsIG5vZGUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cblxuICAgIGV2ZW50T3B0aW9ucyA9IGV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCB7IGRlZXAgfSA9IGV2ZW50T3B0aW9ucztcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZjtcblxuICAgIC8vIGFsbG93IHRvIHBhc3MgbnVsbCBvciB1bmRlZmluZWQgYXMga2V5XG4gICAgLy8gaWYgcGFzc2VkIHRoZW4gcmVtb3ZlIGJpbmRpbmdzIG9mIGFsbCBrZXlzIGZvciBnaXZlbiBvYmplY3RcbiAgICBpZihrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24ocHJvcHMsIChwcm9wc0l0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbnVsbCwgZXZlbnRPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGJpbmRpbmdcbiAgICBpZihkZWVwICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVlcFBhdGhMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBkbyB3ZSBuZWVkIHRvIHRocm93IGVycm9yIHdoZW4gdGFyZ2V0IGlzIGZhbHN5P1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtkZWVwUGF0aFtpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE8gQlVHIHRoaXMgbWF5IHVuZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBiaW5kaW5ncyB3aXRoIHRoZSBzYW1lIHBhdGggKGNhbm5vdCByZXByb2R1Y2UpXG4gICAgICAgICAgICByZW1vdmVUcmVlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpKTtcblxuICAgICAgICAgICAgdW5iaW5kTm9kZSh0YXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sIG5vZGUsIGV2ZW50T3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG4gICAgLy8gd2hlbiBubyBwcm9wZGVmIGRvIG5vdGhpbmdcbiAgICBpZighcHJvcERlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAvLyBpZiB0aGUgcHJvcGVydHkgZG9lc24ndCBoYXZlIGFueSBiaW5kaW5ncyBkbyBub3RoaW5nXG4gICAgaWYoIWJpbmRpbmdzKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gbm9kZSBpcyBwYXNlZCByZW1vdmUgYWxsIGJpbmRpbmdzIGZvciBnaXZlbiBrZXlcbiAgICBpZighbm9kZSkge1xuICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsIGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldmVudE9wdGlvbnMgfSwgYmluZGluZyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb3BEZWYuYmluZGluZ3MgPSBudWxsO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICAgICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0Lm5vZGVzW2tleV1cbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3QuJG5vZGVzW2tleV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0ICRub2RlcyA9IGdldE5vZGVzKG9iamVjdCwgbm9kZSk7XG4gICAgY29uc3QgcmV0YWluQmluZGluZ3MgPSBbXTtcbiAgICBjb25zdCByZXRhaW5Ob2RlcyA9IFtdO1xuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGFsbCBiaW5kbmdzIGFuZCBjb21wYXJlIHRoZWlyIG5vZGUgd2l0aCBnaXZlbiBub2Rlc1xuICAgIG5vZm4uZm9yRWFjaCgkbm9kZXMsIG5vZGVzSXRlbSA9PiB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICBpZihiaW5kaW5nLm5vZGUgPT09IG5vZGVzSXRlbSkge1xuICAgICAgICAgICAgICAgIHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZlbnRPcHRpb25zIH0sIGJpbmRpbmcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXRhaW5CaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xuICAgICAgICAgICAgICAgIHJldGFpbk5vZGVzLnB1c2gobm9kZXNJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyB1cGRhdGUgbm9kZXMgYW5kICRub2RlcyBmb3IgTWF0cmVzaGthIGluc3RhbmNlXG4gICAgaWYgKG9iamVjdC5pc01LKSB7XG4gICAgICAgIGlmKHJldGFpbk5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgb2JqZWN0Lm5vZGVzW2tleV0gPSByZXRhaW5Ob2Rlc1swXTtcbiAgICAgICAgICAgIG9iamVjdC4kbm9kZXNba2V5XSA9IGRvbS4kKHJldGFpbk5vZGVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBiaW5kaW5ncyBvYmplY3RcbiAgICBpZihyZXRhaW5CaW5kaW5ncy5sZW5ndGgpIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IHJldGFpbkJpbmRpbmdzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb3BEZWYuYmluZGluZ3MgPSBudWxsO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VuYmluZG5vZGUvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuL19yZW1vdmVsaXN0ZW5lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGdpdmVuUGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuXHRcdHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGRvIGFsbCBtYWdpY1xuICAgICAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5pbmZvLnBhdGhTdHIgIT09IHBhdGhTdHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSA9IHJldGFpbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2tleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIm5hbWVcIiwgXCJldmVudHNcIl0gfV0qL1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgIGNvbnN0IG5vVHJpZ2dlciA9IG5hbWUgPyBuYW1lWzBdID09PSAnXycgOiBmYWxzZTtcblxuICAgIC8vIGlmIGFsbCBldmVudHMgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgbm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZXZ0LmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuICAgICAgICBkZWYuZXZlbnRzID0ge307XG4gICAgfSBlbHNlIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcbiAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ0NhbGxiYWNrID0gY2FsbGJhY2sgJiYgY2FsbGJhY2suX2NhbGxiYWNrIHx8IGNhbGxiYWNrO1xuICAgICAgICAgICAgY29uc3QgZXZ0Q2FsbGJhY2sgPSBldnQuY2FsbGJhY2suX2NhbGxiYWNrIHx8IGV2dC5jYWxsYmFjaztcblxuICAgICAgICAgICAgaWYgKGFyZ0NhbGxiYWNrICYmIGFyZ0NhbGxiYWNrICE9PSBldnRDYWxsYmFja1xuICAgICAgICAgICAgICAgIHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgZXZlbnRcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBkZWYuZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2ZmL19yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi9fdW5kZWxlZ2F0ZWxpc3RlbmVyJztcblxuLy8gcmVtb3ZlcyB0cmVlIGxpc3RlbmVyIGZyb20gYWxsIG9iamVjdCB0cmVlIG9mIGZpdmVuIHBhdGhcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZVRyZWVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLCBoYW5kbGVyKSB7XG4gICAgaWYodHlwZW9mIGRlZXBQYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWVwUGF0aCA9IGRlZXBQYXRoLnNwbGl0KCcuJyk7XG4gICAgfVxuXG4gICAgLy8gaXRlcmF0ZSBvdmVyIGtleXMgb2YgdGhlIHBhdGggYW5kIHVuZGVsZWdhdGUgZ2l2ZW4gaGFuZGxlciAoY2FuIGJlIHVuZGVmaW5lZClcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gVE9ETyBzbGljZSBpcyBzbG93XG4gICAgICAgIGNvbnN0IGxpc3RlblBhdGggPSBkZWVwUGF0aC5zbGljZSgwLCBpKTtcblxuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIoXG4gICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICBsaXN0ZW5QYXRoLFxuICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2ldfWAsXG4gICAgICAgICAgICBoYW5kbGVyXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIHRoZSBmdW5jdGlvbiByZW1vdmVzIHNpbmdsZSBiaW5kaW5nIGZvciBzaW5nbGUgb2JqZWN0XG4vLyBjYWxsZWQgYnkgdW5iaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldmVudE9wdGlvbnMgfSwge1xuICAgIG9wdGlvbnMsXG4gICAgYmluZGVyLFxuICAgIG5vZGUsXG4gICAgbm9kZUhhbmRsZXIsXG4gICAgb2JqZWN0SGFuZGxlclxufSkge1xuICAgIGNvbnN0IHsgZGVzdHJveSwgb24gfSA9IGJpbmRlcjtcbiAgICBjb25zdCB7IHNpbGVudCB9ID0gZXZlbnRPcHRpb25zO1xuXG4gICAgLy8gaWYgXCJvblwiIGlzIGZ1bmN0aW9uIGRpc2FibGUgaXRcbiAgICAvLyB3ZSBjYW5ub3QgdHVybiBvZmYgY3VzdG9tIGxpc3RlbmVyIGRlZmluZWQgYnkgYSBwcm9ncmFtbWVyXG4gICAgLy8gcHJvZ3JhbW1lciBuZWVkcyB0byByZW1vdmUgY3VzdG9tIGxpc3RlbmVyIG1hdWFsbHkgdmlhIGJpbmRlci5kZXN0cm95XG4gICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb24gPT09ICdzdHJpbmcnKXtcbiAgICAgICAgLy8gcmVtb3ZlIERPTSBldmVudCBsaXN0ZW5lclxuICAgICAgICAvLyByZW1vdmVFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgbm9mbi5mb3JFYWNoKG9uLnNwbGl0KHNwYWNlUmVnKSxcbiAgICAgICAgICAgIGV2dE5hbWUgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9iamVjdCBldmVudCBsaXN0ZW5lclxuICAgIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cbiAgICAvLyBpZiBiaW5kZXIuZGVzdHJveSBpcyBnaXZlbiBjYWxsIGl0XG4gICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgZGVzdHJveS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdmVudE9wdGlvbnMgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlXG4gICAgICAgIH0sIGV2ZW50T3B0aW9ucyk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGB1bmJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdmVudE9wdGlvbnMpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3VuYmluZCcsIGV4dGVuZGVkRXZlbnRPcHRpb25zKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91bmJpbmRub2RlL19yZW1vdmViaW5kaW5nLmpzXG4gKiovIiwiaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnLi4vbG9va2ZvcmJpbmRlcic7XG5pbXBvcnQgcnVuTm9kZUhhbmRsZXIgZnJvbSAnLi9fcnVubm9kZWhhbmRsZXInO1xuaW1wb3J0IHJ1bk9iamVjdEhhbmRsZXIgZnJvbSAnLi9fcnVub2JqZWN0aGFuZGxlcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL191dGlsL2RlYm91bmNlJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIGhhbmRsZXMgYmluZGluZyBmb3Igc2luZ2xlIHByb3BlcnR5ICYgbm9kZVxuLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgYXQgYmluZE5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgIGJpbmRlcjogZ2l2ZW5CaW5kZXIsXG4gICAga2V5LFxuICAgICRub2RlcyxcbiAgICBub2RlLFxuICAgIGV2ZW50T3B0aW9ucyxcbiAgICBwcm9wRGVmXG59KSB7XG4gICAgY29uc3Qge1xuICAgICAgICBzaWxlbnQsXG4gICAgICAgIGFzc2lnbkRlZmF1bHRWYWx1ZSxcbiAgICAgICAgZGVib3VuY2U6IGRlYm91bmNlT3B0aW9uPXRydWVcbiAgICB9ID0gZXZlbnRPcHRpb25zO1xuICAgIC8vIGNyZWF0ZSBiaW5kaW5ncyBhcnJheSBpbiBwcm9wZXJ0eSBkZWZpbml0aW9uIG9iamVjdFxuICAgIGNvbnN0IGJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBsZXQgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCBiaW5kaW5nT3B0aW9ucyA9IHtcbiAgICAgICAgc2VsZjogb2JqZWN0LFxuICAgICAgICBrZXksXG4gICAgICAgIHZhbHVlLFxuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGVcbiAgICB9O1xuICAgIGxldCBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgb2JqZWN0SGFuZGxlcjtcbiAgICBsZXQgbm9kZUhhbmRsZXI7XG5cbiAgICAvLyBnZXQgYWN0dWFsIGJpbmRlclxuICAgIGlmIChnaXZlbkJpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cbiAgICAgICAgaWYgKGZvdW5kQmluZGVyKSB7XG4gICAgICAgICAgICBpZiAoZ2l2ZW5CaW5kZXIpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihmb3VuZEJpbmRlciwgZ2l2ZW5CaW5kZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiaW5kZXIgPSBmb3VuZEJpbmRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpbmRlciA9IGdpdmVuQmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBnZXRWYWx1ZSwgc2V0VmFsdWUsIG9uLCBpbml0aWFsaXplIH0gPSBiaW5kZXI7XG5cbiAgICAvLyBjYWxsIGJpbmRlci5pbml0aWFsaXplXG4gICAgaWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIGJpbmRpbmdPcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBjYWxscyBnZXRWYWx1ZSBpbW1lZGlhdGVseSBhbmQgcmVhc3NpZ24gYSBwcm9wZXJ0eVxuICAgIC8vIHdoZW4gYWxsIHJlcXVpcmVkIGNvbmRpdGlvbnMgYXJlIG1ldCBmb3IgdGhpc1xuICAgIGlmIChnZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBhc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG4gICAgICAgIHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBiaW5kaW5nT3B0aW9ucyk7XG4gICAgICAgIGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcblxuICAgICAgICBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBub2ZuLmFzc2lnbih7IGZyb21Ob2RlOiB0cnVlIH0sIGV2ZW50T3B0aW9ucykpO1xuICAgIH1cblxuICAgIC8vIGFkZCBuZWVkZWQgZXZlbnQgaGFuZGxlcnMgdGhlIG9iamVjdCB3aGVuIHNldFZhbHVlIGlzIGdpdmVuXG4gICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgIG9iamVjdEhhbmRsZXIgPSAoKSA9PiBydW5PYmplY3RIYW5kbGVyKHtcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBwcm9wRGVmLFxuICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgYmluZGluZ09wdGlvbnMsXG4gICAgICAgICAgICBldmVudE9wdGlvbnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYnkgZGVmYXVsdCBkZWJvdW5jaW5nIGlzIG9uXG4gICAgICAgIC8vIGl0IGNhbiBiZSB0dXJuZWQgb2ZmIGJ5IHBhc3NpbmcgZGVib3VuY2U9ZmFsc2UgdG8gZXZlbnQgb2JqZWN0XG4gICAgICAgIGlmIChkZWJvdW5jZU9wdGlvbiB8fCBkZWJvdW5jZU9wdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSB0eXBlb2YgZGVib3VuY2VPcHRpb24gPT09ICdudW1iZXInID8gZGVib3VuY2VPcHRpb24gOiAwO1xuICAgICAgICAgICAgb2JqZWN0SGFuZGxlciA9IGRlYm91bmNlKG9iamVjdEhhbmRsZXIsIGRlbGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2JqZWN0SGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgbm9kZSB3aGVuIGdldFZhbHVlICYgb24gYXJlIGdpdmVuXG4gICAgaWYgKGdldFZhbHVlICYmIG9uKSB7XG4gICAgICAgIG5vZGVIYW5kbGVyID0gKGRvbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWUgaXMgc2V0IGluIHVuYmluZE5vZGVcbiAgICAgICAgICAgIC8vIHdlIGNhbm5vdCBcInR1cm4gb2ZmXCIgYmluZGVyLm9uIHdoZW4gaXRzIHZhbHVlIGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBkZXZlbG9wZXIgbmVlZHMgdG8gY2xlYW4gbWVtb3J5ICh0dXJuIG9mZiBjYWxsYmFjaykgbWFudWFseSBpbiBiaW5kZXIuZGVzdHJveVxuICAgICAgICAgICAgaWYoIW5vZGVIYW5kbGVyLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcnVuTm9kZUhhbmRsZXIoe1xuICAgICAgICAgICAgICAgICAgICBkb21FdmVudCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHByb3BEZWYsXG4gICAgICAgICAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ09wdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE8gdGhyb3cgZXJyb3Igd2hlbiBcIm9uXCIgYW5kIG1heWJlIG90aGVyIGJpbmRlciBwcm9wZXJ0aWVzIGhhcyB3cm9uZyB0eXBlXG4gICAgICAgIGlmICh0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9uLmNhbGwobm9kZSwgbm9kZUhhbmRsZXIsIGJpbmRpbmdPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb24gPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIC8vIGFkZEV2ZW50TGlzdGVuZXIgaXMgZmFzdGVyIHRoYW4gXCJvblwiIG1ldGhvZCBmcm9tIGFueSBET00gbGlicmFyeVxuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKG9uLnNwbGl0KHNwYWNlUmVnKSxcbiAgICAgICAgICAgICAgICBldnROYW1lID0+IG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnROYW1lLCBub2RlSGFuZGxlcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGJpbmRpbmcgZGF0YSB0byBiaW5kaW5ncyBhcnJheVxuICAgIGJpbmRpbmdzLnB1c2goe1xuICAgICAgICBvbixcbiAgICAgICAgbm9kZSxcbiAgICAgICAgYmluZGVyLFxuICAgICAgICBvYmplY3RIYW5kbGVyLFxuICAgICAgICBub2RlSGFuZGxlcixcbiAgICAgICAgYmluZGluZ09wdGlvbnNcbiAgICB9KTtcblxuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdmVudE9wdGlvbnMgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlXG4gICAgICAgIH0sIGV2ZW50T3B0aW9ucyk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGBiaW5kOiR7a2V5fWAsIGV4dGVuZGVkRXZlbnRPcHRpb25zKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdiaW5kJywgZXh0ZW5kZWRFdmVudE9wdGlvbnMpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRub2RlL19iaW5kc2luZ2xlbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0QmluZGVycyBmcm9tICcuL2RlZmF1bHRiaW5kZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZmF1bHRCaW5kZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyZXN1bHQgPSBkZWZhdWx0QmluZGVyc1tpXS5jYWxsKG5vZGUsIG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9va2ZvcmJpbmRlci5qc1xuICoqLyIsImltcG9ydCBpbnB1dCBmcm9tICcuL2JpbmRlcnMvaW5wdXQnO1xuaW1wb3J0IHRleHRhcmVhIGZyb20gJy4vYmluZGVycy90ZXh0YXJlYSc7XG5pbXBvcnQgc2VsZWN0IGZyb20gJy4vYmluZGVycy9zZWxlY3QnO1xuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vYmluZGVycy9wcm9ncmVzcyc7XG5pbXBvcnQgb3V0cHV0IGZyb20gJy4vYmluZGVycy9vdXRwdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBbbm9kZSA9PiB7XG4gICAgc3dpdGNoKG5vZGUudGFnTmFtZSkge1xuICAgICAgICBjYXNlICdJTlBVVCc6XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQobm9kZS50eXBlKTtcbiAgICAgICAgY2FzZSAnVEVYVEFSRUEnOlxuICAgICAgICAgICAgcmV0dXJuIHRleHRhcmVhKCk7XG4gICAgICAgIGNhc2UgJ1NFTEVDVCc6XG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0KG5vZGUubXVsdGlwbGUpO1xuICAgICAgICBjYXNlICdQUk9HUkVTUyc6XG4gICAgICAgICAgICByZXR1cm4gcHJvZ3Jlc3MoKTtcbiAgICAgICAgY2FzZSAnT1VUUFVUJzpcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQoKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVmYXVsdGJpbmRlcnMuanNcbiAqKi8iLCJpbXBvcnQgaXMgZnJvbSAnLi4vX3V0aWwvaXMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG4vLyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIGJvdW5kIG5vZGUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuTm9kZUhhbmRsZXIoe1xuICAgIGRvbUV2ZW50ID0ge30sXG4gICAgb2JqZWN0LFxuICAgIGtleSxcbiAgICBub2RlLFxuICAgIHByb3BEZWYsXG4gICAgYmluZGVyLFxuICAgIGJpbmRpbmdPcHRpb25zXG59KSB7XG4gICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG4gICAgY29uc3QgeyB3aGljaCwgdGFyZ2V0IH0gPSBkb21FdmVudDtcbiAgICBjb25zdCB7IGdldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG5vZm4uYXNzaWduKHtcbiAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQsIC8vIGpRdWVyeSB0aGluZ1xuICAgICAgICAvLyB3aWxsIHRocm93IFwicHJldmVudERlZmF1bHQgaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcbiAgICAgICAgLy8gd2lsbCB0aHJvdyBcInN0b3BQcm9wYWdhdGlvbiBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogKCkgPT4gZG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksXG4gICAgICAgIHdoaWNoLFxuICAgICAgICB0YXJnZXRcbiAgICB9LCBiaW5kaW5nT3B0aW9ucykpO1xuXG4gICAgaWYgKCFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgLy8gVE9ETyBhZGQgZGVzY3JpcHRpb24gb2YgYSBoYWNrXG4gICAgICAgIC8vIHdoeSBkbyB3ZSBuZWVkIGNoYW5nZWROb2RlLCBvbkNoYW5nZVZhbHVlLCBiaW5kZXI/XG4gICAgICAgIHNldChvYmplY3QsIGtleSwgdmFsdWUsIHtcbiAgICAgICAgICAgIGZyb21Ob2RlOiB0cnVlLFxuICAgICAgICAgICAgY2hhbmdlZE5vZGU6IG5vZGUsXG4gICAgICAgICAgICBvbkNoYW5nZVZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGJpbmRlclxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS9fcnVubm9kZWhhbmRsZXIuanNcbiAqKi8iLCIvLyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHByb3BlcnR5IHZhbHVlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk9iamVjdEhhbmRsZXIoe1xuICAgIG5vZGUsXG4gICAgcHJvcERlZixcbiAgICBiaW5kZXIsXG4gICAgYmluZGluZ09wdGlvbnMsXG4gICAgZXZlbnRPcHRpb25zXG59KSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCB7IG9uQ2hhbmdlVmFsdWUsIGNoYW5nZWROb2RlLCBiaW5kZXI6IGV2dEJpbmRlciB9ID0gZXZlbnRPcHRpb25zO1xuICAgIGNvbnN0IHsgc2V0VmFsdWUgfSA9IGJpbmRlcjtcbiAgICAvLyBkaXJ0eSBoYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuICAgIGNvbnN0IGRpcnR5SGFja1ZhbHVlID0gb25DaGFuZ2VWYWx1ZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICA/IFN0cmluZyh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIGlmIChjaGFuZ2VkTm9kZSA9PT0gbm9kZSAmJiBvbkNoYW5nZVZhbHVlID09PSBkaXJ0eUhhY2tWYWx1ZSAmJiBldnRCaW5kZXIgPT09IGJpbmRlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0VmFsdWUuY2FsbChub2RlLCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyB2YWx1ZSB9LCBiaW5kaW5nT3B0aW9ucykpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUvX3J1bm9iamVjdGhhbmRsZXIuanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiZXZ0XCJdIH1dKi9cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuXG4vLyBwcm9wZXJ0eSBtb2RpZmllciBldmVudCByZWdleHBcbmNvbnN0IHByb3BNb2RFdmVudFJlZ1xuICAgID0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5fY2hhbmdlOnRyZWU6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuLy8gYWRkcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXJcbi8vIHVzZWQgYXMgY29yZSBvZiBldmVudCBlbmdpbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IGN0eCA9IGNvbnRleHQgfHwgb2JqZWN0O1xuICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXTtcbiAgICBjb25zdCBldnQgPSB7IGNhbGxiYWNrLCBjb250ZXh0LCBjdHgsIG5hbWUsIGluZm8gfTtcblxuXG4gICAgLy8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWVcbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBkYXRhLCByZXR1cm4gZmFsc2VcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGV2dCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGFyZ0NhbGxiYWNrID0gY2FsbGJhY2sgJiYgY2FsbGJhY2suX2NhbGxiYWNrIHx8IGNhbGxiYWNrO1xuICAgICAgICAgICAgY29uc3QgZXZ0Q2FsbGJhY2sgPSBldnQuY2FsbGJhY2suX2NhbGxiYWNrIHx8IGV2dC5jYWxsYmFjaztcbiAgICAgICAgICAgIGlmIChhcmdDYWxsYmFjayA9PT0gZXZ0Q2FsbGJhY2sgJiYgZXZ0LmNvbnRleHQgPT09IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgZXZlbnQgaXNuJ3QgZm91bmQgYWRkIGl0IHRvIHRoZSBldmVudCBsaXN0XG4gICAgICAgIGV2ZW50cy5wdXNoKGV2dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUsIGNyZWF0ZSBhcnJheSB3aXRoIG9ubHkgZWJlbnRcbiAgICAgICAgYWxsRXZlbnRzW25hbWVdID0gW2V2dF07XG4gICAgfVxuXG4gICAgaWYgKHByb3BNb2RFdmVudFJlZy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIC8vIGRlZmluZSBuZWVkZWQgYWNjZXNzb3JzIGZvciBLRVlcbiAgICAgICAgZGVmaW5lUHJvcChvYmplY3QsIG5hbWUucmVwbGFjZShwcm9wTW9kRXZlbnRSZWcsICcnKSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYGFkZGV2ZW50OiR7bmFtZX1gLCBldnQpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ2FkZGV2ZW50JywgZXZ0KTtcbiAgICB9XG5cbiAgICAvLyBpZiBldmVudCBpcyBhZGRlZCByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2FkZGxpc3RlbmVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgZ2l2ZW5EZWxheSwgdGhpc0FyZykge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIGxldCBkZWxheTtcbiAgICBpZiAodHlwZW9mIGRlbGF5ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzQXJnID0gZ2l2ZW5EZWxheTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBkZWxheSA9IDA7XG4gICAgfVxuXG4gICAgZGVsYXkgPSBnaXZlbkRlbGF5IHx8IDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjb25zdCBbYTEsIGEyXSA9IGFyZ3M7XG4gICAgICAgIGNvbnN0IGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSB0aGlzQXJnIHx8IHRoaXM7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChhcmdzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseShjYWxsQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvZGVib3VuY2UuanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tdXNlLWJlZm9yZS1kZWZpbmU6IFtcImVycm9yXCIsIHsgXCJmdW5jdGlvbnNcIjogZmFsc2UgfV0qL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4uL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL3RyaWdnZXIvX3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgaXMgZnJvbSAnLi4vX3V0aWwvaXMnO1xuXG5jb25zdCB0cmVlQ2hhbmdlRXZ0UmVnID0gL15fY2hhbmdlOnRyZWU6LztcblxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG4gICAgcHJldmlvdXNWYWx1ZSxcbiAgICB2YWx1ZVxufSwge1xuICAgIHBhdGgsXG4gICAgbmFtZSxcbiAgICBjYWxsYmFjayxcbiAgICBjb250ZXh0XG59ID0gdHJpZ2dlck9uZS5sYXRlc3RFdmVudC5pbmZvLmRlbGVnYXRlZERhdGEpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKHZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZpb3VzVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihwcmV2aW91c1ZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZ2l2ZW5QYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIGFkZCBzaW1wbGUgbGlzdGVuZXJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBkbyBhbGwgbWFnaWNcbiAgICAgICAgY29uc3Qga2V5ID0gcGF0aFswXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgY29udGV4dFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQgYnkgXCJzZXRcIlxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG4gICAgICAgICAgICBkZWxlZ2F0ZWREYXRhLFxuICAgICAgICAgICAgcGF0aFN0clxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWxsIGhhbmRsZXIgbWFudWFsbHlcbiAgICAgICAgY2hhbmdlSGFuZGxlcih7XG4gICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV1cbiAgICAgICAgfSwgZGVsZWdhdGVkRGF0YSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24vX2RlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL19kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVUcmVlTGlzdGVuZXIgZnJvbSAnLi4vb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXInO1xuXG4vLyBjcmVhdGVzIHRyZWUgbGlzdGVuZXJcbmZ1bmN0aW9uIGdldFRyZWVMaXN0ZW5lcih7IGhhbmRsZXIsIHJlc3RQYXRoIH0pIHtcbiAgICBjb25zdCBuZXdIYW5kbGVyID0gZnVuY3Rpb24gdHJlZUxpc3RlbmVyKGNoYW5nZUV2dCkge1xuICAgICAgICBjb25zdCBuZXdDaGFuZ2VFdmVudCA9IG5vZm4uYXNzaWduKHsgcmVzdFBhdGggfSwgY2hhbmdlRXZ0KTtcbiAgICAgICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlLCB2YWx1ZSB9ID0gY2hhbmdlRXZ0O1xuXG4gICAgICAgIC8vIHJlbW92ZXMgbGlzdGVuZXIgZm9yIGFsbCBicmFuY2hlcyBvZiB0aGUgcGF0aCBvbiBvbGQgb2JqZWN0XG4gICAgICAgIGlmKHByZXZpb3VzVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZW1vdmVUcmVlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcmVzdFBhdGgsIGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkcyBsaXN0ZW5lciBmb3IgYWxsIGJyYW5jaGVzIG9mIFwicmVzdFBhdGhcIiBwYXRoIG9uIG5ld2x5IGFzc2lnbmVkIG9iamVjdFxuICAgICAgICBpZih2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBhZGRUcmVlTGlzdGVuZXIodmFsdWUsIHJlc3RQYXRoLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGwgb3JpZ2luYWwgaGFuZGxlclxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgbmV3Q2hhbmdlRXZlbnQpO1xuICAgIH1cblxuICAgIG5ld0hhbmRsZXIuX2NhbGxiYWNrID0gaGFuZGxlcjtcblxuICAgIHJldHVybiBuZXdIYW5kbGVyO1xufVxuXG4vLyBsaXN0ZW5zIGNoYW5nZXMgZm9yIGFsbCBicmFuY2hlcyBvZiBnaXZlbiBwYXRoXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRUcmVlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aCwgaGFuZGxlcikge1xuICAgIGlmKHR5cGVvZiBkZWVwUGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZGVlcFBhdGggPSBkZWVwUGF0aC5zcGxpdCgnLicpO1xuICAgIH1cblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwga2V5cyBhbmQgZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBvYmplY3RzIG9mIGdpdmVuIGJyYW5jaFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBUT0RPIHNsaWNlIG1ldGhvZCBpcyBzbG93XG4gICAgICAgIGNvbnN0IGxpc3RlblBhdGggPSBkZWVwUGF0aC5zbGljZSgwLCBpKTtcbiAgICAgICAgY29uc3QgcmVzdFBhdGggPSBkZWVwUGF0aC5zbGljZShpICsgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihcbiAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgIGxpc3RlblBhdGgsXG4gICAgICAgICAgICBgX2NoYW5nZTp0cmVlOiR7ZGVlcFBhdGhbaV19YCxcbiAgICAgICAgICAgIGdldFRyZWVMaXN0ZW5lcih7XG4gICAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgICByZXN0UGF0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi9fYWRkdHJlZWxpc3RlbmVyLmpzXG4gKiovIiwiXG54ZGVzY3JpYmUoJ0JpbmRpbmdzIHBhcnNlcicsICgpID0+IHtcblx0aXQoJ3Nob3VsZCBiaW5kIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHNwYW4+e3t4fX08L3NwYW4+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcblxuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2hpJztcbiAgICAgICAgZXhwZWN0KG5vZGUuZmlyc3RDaGlsZC5pbm5lckhUTUwpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgSFRNTCB1c2luZyBNYXRyZXNoa2EgaW5zdGFuY2UgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxzcGFuPnt7eH19PC9zcGFuPicpLFxuICAgICAgICAgICAgbWsgPSBuZXcgTUs7XG5cbiAgICAgICAgbWsucGFyc2VCaW5kaW5ncyhub2RlKTtcbiAgICAgICAgbWsueCA9ICdoaSc7XG4gICAgICAgIGV4cGVjdChub2RlLmZpcnN0Q2hpbGQuaW5uZXJIVE1MKS50b0VxdWFsKG1rLngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJ7e3h9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnaGV5JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNoZWNrZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ7e3h9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSB0cnVlO1xuICAgICAgICBleHBlY3Qobm9kZS5jaGVja2VkKS50b0VxdWFsKG9iamVjdC54KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0YXJlYXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHRleHRhcmVhIHZhbHVlPVwie3t4fX1cIj48L3RleHRhcmVhPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNvbXBsZXggYXR0cnMnLCAoKSA9PiB7d2luZG93Lm9sb2xvc2hhID0gdHJ1ZTtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8YSBocmVmPVwie3t4fX0ve3t5fX1cIj48L2E+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdiYXInO1xuICAgICAgICBvYmplY3QueSA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkudG9FcXVhbChvYmplY3QueCArICcvJyArIG9iamVjdC55KTt3aW5kb3cub2xvbG9zaGEgPSBmYWxzZTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBjb21wbGV4IHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJ7e3h9fSBhbmQge3t5fX1cIj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jhcic7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54ICsgJyBhbmQgJyArIG9iamVjdC55KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGRudCBjcmVhdGUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cInt7eH19IGFuZCB7e3l9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LnkgPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LnggKyAnIGFuZCAnICsgb2JqZWN0LnkpO1xuICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMob2JqZWN0KSkudG9FcXVhbChbJ3gnLCAneSddKTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBuZXN0ZWQgbm9kZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcShgXG4gICAgICAgICAgICA8ZGl2Pnt7eH19XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwie3t5fX1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiaGV5IHt7en19XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApLFxuICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdmb28nO1xuICAgICAgICBvYmplY3QueSA9ICdiYXInO1xuICAgICAgICBvYmplY3QueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5pbm5lckhUTUwuaW5kZXhPZignPHNwYW4+JyArIG9iamVjdC54ICsgJzwvc3Bhbj4nKSkudG9FcXVhbCgwKTtcbiAgICAgICAgZXhwZWN0KHEoJ2lucHV0Jywgbm9kZSkudmFsdWUpLnRvRXF1YWwob2JqZWN0LnkpO1xuICAgICAgICBleHBlY3QocSgnW2F0dHJdJywgbm9kZSkuZ2V0QXR0cmlidXRlKCdhdHRyJykpLnRvRXF1YWwoJ2hleSAnICsgb2JqZWN0LnopO1xuICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMob2JqZWN0KS5zb3J0KCkpLnRvRXF1YWwoWyd4JywgJ3knLCAneiddKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgbmVzdGVkIG5vZGVzIGFuZCBkZWVwIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcShgXG4gICAgICAgICAgICA8ZGl2Pnt7YS5ifX1cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCJ7e2MuZH19XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImhleSB7e2UuZn19XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApLFxuICAgICAgICBvYmplY3QgPSB7XG4gICAgICAgICAgICBhOiB7YjogMX0sXG4gICAgICAgICAgICBjOiB7ZDogMn0sXG4gICAgICAgICAgICBlOiB7ZjogMn1cbiAgICAgICAgfTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QuYS5iID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC5jLmQgPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LmUuZiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5pbm5lckhUTUwuaW5kZXhPZignPHNwYW4+JyArIG9iamVjdC5hLmIgKyAnPC9zcGFuPicpKS50b0VxdWFsKDApO1xuICAgICAgICBleHBlY3QocSgnaW5wdXQnLCBub2RlKS52YWx1ZSkudG9FcXVhbChvYmplY3QuYy5kKTtcbiAgICAgICAgZXhwZWN0KHEoJ1thdHRyXScsIG5vZGUpLmdldEF0dHJpYnV0ZSgnYXR0cicpKS50b0VxdWFsKCdoZXkgJyArIG9iamVjdC5lLmYpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2hlbiBicmFja2V0cyBhcmUgcmVkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cIltbeF1dIHlvdVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge30sXG5cdFx0XHRkZWZhdWx0QnJhY2tldHMgPSBtYWdpYy5wYXJzZXJCcmFja2V0cztcblxuXHRcdG1hZ2ljLnBhcnNlckJyYWNrZXRzID0ge1xuXHRcdFx0bGVmdDogJ1tbJyxcblx0XHRcdHJpZ2h0OiAnXV0nXG5cdFx0fTtcblxuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2hleSc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54ICsgJyB5b3UnKTtcblxuXHRcdG1hZ2ljLnBhcnNlckJyYWNrZXRzID0gZGVmYXVsdEJyYWNrZXRzO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcbmltcG9ydCBiaW5kT3B0aW9uYWxOb2RlIGZyb20gJ3NyYy9iaW5kb3B0aW9uYWxub2RlJztcbmltcG9ydCBiaW5kU2FuZGJveCBmcm9tICdzcmMvYmluZHNhbmRib3gnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnc3JjL3VuYmluZG5vZGUnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICdzcmMvc2VsZWN0JztcbmltcG9ydCBzZWxlY3RBbGwgZnJvbSAnc3JjL3NlbGVjdGFsbCc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL29uL19hZGRsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQmluZGluZ3MnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuICAgIGxldCBvYmo7XG4gICAgbGV0IG5vZGU7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgc2ltdWxhdGVEb21FdmVudDtcbiAgICBsZXQgaW5pdGlhbGl6ZUNhbGw7XG4gICAgbGV0IGRlc3Ryb3lDYWxsO1xuXG4gICAgY29uc3QgdGVzdFNpbXBsZUJpbmQgPSAoa2V5ID0gJ3gnKSA9PiB7XG4gICAgICAgIG9ialtrZXldID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqW2tleV0pLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgdGVzdFNpbXBsZVVuYmluZCA9ICgpID0+IHtcbiAgICAgICAgb2JqLnggPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jheic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIGV4cGVjdChkZXN0cm95Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH07XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb2JqID0ge307XG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBpbml0aWFsaXplQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBkZXN0cm95Q2FsbCA9IGNyZWF0ZVNweSgpO1xuXG4gICAgICAgIGJpbmRlciA9ICB7XG4gICAgICAgICAgICBvbihjYmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uZHVtbXlldmVudCA9IGNiYztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWx1ZSh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdGlhbGl6ZShvKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVDYWxsKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMub25kdW1teWV2ZW50ID0gKCkgPT4ge307XG4gICAgICAgICAgICAgICAgZGVzdHJveUNhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgZGVib3VuY2UnLCBkb25lID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG4gICAgICAgIG9iai54ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICAgICAgZXhwZWN0KG9iai54KS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgICAgIGV4cGVjdChpbml0aWFsaXplQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA1MCk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3Nob3VsZCBiaW5kIGFuZCB1c2UgRE9NIGV2ZW50cycsICgpID0+IHt9KVxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZCcsIGJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZDp4JywgYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChiaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdW5iaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBjb25zdCB1bmJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3VuYmluZCcsIHVuYmluZENhbGwpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQ6eCcsIHVuYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcgbm9kZSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgd3JvbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jywgd3JvbmdOb2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcga2V5IGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneScsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgd2hlbiBub2RlIGlzIG5vdCBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYWxsIHdoZW4gbmVpdGhlciBrZXkgbm9yIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmopO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBrZXktbm9kZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0sIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCB1c2luZyBhcnJheSBvZiBvYmplY3RzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlIH1dKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChvYmoubm9kZXMueCkudG9FcXVhbChub2RlKTtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShvYmouJG5vZGVzLngpXG4gICAgICAgICkudG9FcXVhbChbbm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYSBwcm9wZXJ0eSBpbiBjb250ZXh0IG9iamVjdCB3aGljaCBoYXMgaXNNSz10cnVlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBiaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KG9iai4kbm9kZXMueCkudG9CZVVuZGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueC55LnogPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW5jZWxzIGRlZXAgYmluZGluZyB3aGVuIGRlZXA9ZmFsc2Ugb3B0aW9uIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgZGVlcDogZmFsc2VcbiAgICAgICAgfSwgbm9EZWJvdW5jZUZsYWcpKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoJ3gueS56Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd1LngueS56JywgJ2dvJyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3UueC55LnonLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgb2JqLnUueCA9IG1ha2VPYmplY3QoJ3kueicsICdmb28nKTtcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoudS54LnkueikudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBiaW5kaW5nIGlmIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgndS54LnknKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAndS54LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBjb25zdCB4ID0gb2JqLnUueDtcblxuICAgICAgICBvYmoudS54ID0gbWFrZU9iamVjdCgneS56JywgJ2ZvbycpO1xuXG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChvYmoudS54LnkueikudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIHgueS56ID0gJ2Jheic7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCd1c2VzIGN1c3RvbSBzZWxlY3RvcnMgb24gY3VycmVudCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScsICdmb28nKTtcbiAgICAgICAgY29uc3QgY2hpbGROb2RlID0gbm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuXG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBub2RlKTtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55JywgJzpzYW5kYm94IHNwYW4nLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcblxuICAgICAgICBleHBlY3QoY2hpbGROb2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgY2hpbGROb2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIGNoaWxkTm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54LnkpLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoYHRocm93cyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmVgLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kTm9kZShvYmosICd4Jyk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KGBkb2Vzbid0IHRocm93IGVycm9yIHdoZW4gbm9kZSBpc24ndCB0aGVyZSBhbmQgb3B0aW9uYWw9dHJ1ZSBpcyBnaXZlbmAsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgeyBvcHRpb25hbDogdHJ1ZSB9KTtcbiAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIG1ldGhvZCBvZiBNYXRyZXNoa2Egd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kT3B0aW9uYWxOb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgfSkubm90LnRvVGhyb3coKTtcbiAgICB9KTtcblxuICAgIGl0KCdzZWxlY3RzIGNoaWxkcmVuIG9mIHNhbmRib3gnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiZm9vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICdzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2VsZWN0cyBub2RlcyB3aXRoIGN1c3RvbSBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGF0dHI9XCJmb29cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpzYW5kYm94IHNwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6Ym91bmQoc2FuZGJveCkgc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJylbMF0uZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0KG9iaiwgJzpzYW5kYm94IHRhYmxlJylcbiAgICAgICAgKS50b0VxdWFsKG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6Ym91bmQoc2FuZGJveCkgdGFibGUnKVxuICAgICAgICApLnRvRXF1YWwobnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpIHRhYmxlJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFtdKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6c2FuZGJveCB0YWJsZScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIGJpbmQgYW5kIHJlYmluZCBzYW5kYm94IHZpYSBiaW5kU2FuZGJveCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYW5vdGhlck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBiaW5kU2FuZGJveC5jYWxsKG9iaiwgbm9kZSwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBiaW5kU2FuZGJveC5jYWxsKG9iaiwgYW5vdGhlck5vZGUsIG5vRGVib3VuY2VGbGFnKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCknKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW2Fub3RoZXJOb2RlXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYmluZFNhbmRib3ggdGhyb3dzIGFuIGVycm9yIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kU2FuZGJveC5jYWxsKG9iaik7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICcuL2JpbmRub2RlJztcblxuLy8gVE9ETyBkZXNjcmlwdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE9wdGlvbmFsTm9kZSguLi5hcmdzKSB7XG4gICAgLy8gdGhpcyBoYWNrIGFsbG93cyB0byBrZWVwIGJpbmRPcHRpb25hbE5vZGUgYXMgY29tcGFjdCBhcyBwb3NzaWJsZVxuICAgIC8vIGFuZCBkb2Vzbid0IHJlcXVpcmUgdG8gZmxpcCBhcmdzIGFuZCBzdXBwb2VyIGFsbCBiaW5kTm9kZSB2YXJpYXRpb25zXG4gICAgYmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnID0gdHJ1ZTtcbiAgICByZXR1cm4gYmluZE5vZGUuY2FsbCh0aGlzLCAuLi5hcmdzKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTYW5kYm94KG9iamVjdCwgbm9kZSwgZXZ0KSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZ0ID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdiaW5kU2FuZGJveCcpO1xuICAgIH1cblxuICAgIHVuYmluZE5vZGUob2JqZWN0LCAnc2FuZGJveCcsIG51bGwsIGV2dCk7XG4gICAgcmV0dXJuIGJpbmROb2RlKG9iamVjdCwgJ3NhbmRib3gnLCBub2RlLCBudWxsLCBldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZHNhbmRib3guanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vYmluZG5vZGUvX3NlbGVjdG5vZGVzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4vX3V0aWwvdG9hcnJheSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JUZXN0UmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3Qob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIHNlbGVjdG9yID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NlbGVjdEFsbCcpO1xuICAgIH1cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpWzBdIHx8IG51bGw7XG5cdH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAgICAgaWYgKCFkZWYgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbm9kZSB9ID0gYmluZGluZ3NbMF07XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuXHR9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCBkb20gZnJvbSAnLi9fZG9tJztcbmltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL2JpbmRub2RlL19zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuL191dGlsL3RvYXJyYXknO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yVGVzdFJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0QWxsKG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBzZWxlY3RvciA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZWxlY3RBbGwnKTtcbiAgICB9XG5cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuXHR9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBkb20uJCgpO1xuICAgICAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgICAgIGlmICghZGVmIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoeyBub2RlIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZWxlY3RhbGwuanNcbiAqKi8iLCIvLyBjcmVhdGVzIG5lc3RlZCBvYmplY3QgYmFzZWQgb24gcGF0aCBhbmQgbGFzdFZhbHVlXG4vLyBleGFtcGxlOiBtYWtlT2JqZWN0KCdhLmIuYycsIDQyKSAtPiB7YToge2I6IHtjOyA0Mn19fVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU9iamVjdChnaXZlblBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZ2l2ZW5QYXRoID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBbXTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBsZXQgb2JqID0gcmVzdWx0O1xuICAgIGxldCBrZXk7XG5cblxuICAgIHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAga2V5ID0gcGF0aC5zaGlmdCgpO1xuICAgICAgICBvYmogPSBvYmpba2V5XSA9IHt9O1xuICAgIH1cblxuICAgIG9ialtwYXRoLnNoaWZ0KCldID0gbGFzdFZhbHVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNweShzcHkgPSAoKSA9PiB7fSkge1xuICAgIGNvbnN0IHNweU5hbWUgPSAnZnVuY3Rpb24nO1xuICAgIGNvbnN0IHNweU9iaiA9IHt9O1xuICAgIHNweU9ialtzcHlOYW1lXSA9IHNweTtcbiAgICByZXR1cm4gc3B5T24oc3B5T2JqLCBzcHlOYW1lKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvY3JlYXRlc3B5LmpzXG4gKiovIiwiaW1wb3J0IHtcblx0dGV4dGFyZWEsXG4gICAgaW5wdXQsXG4gICAgc2VsZWN0LFxuICAgIG91dHB1dCxcbiAgICBwcm9ncmVzc1xufSBmcm9tICdzcmMvYmluZGVycyc7XG5cbmltcG9ydCBsb29rRm9yQmluZGVyIGZyb20gJ3NyYy9sb29rZm9yYmluZGVyJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuXG5kZXNjcmliZSgnRGVmYXVsdCBiaW5kZXJzJywgKCkgPT4ge1xuICAgIGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcblx0bGV0IG9iajtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgamFzbWluZS5hZGRNYXRjaGVycyh7XG4gICAgICAgICAgICBiaW5kZXJzRXF1YWw6ICh1dGlsLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpID0+ICh7XG4gICAgICAgICAgICAgICAgY29tcGFyZTogKGFjdHVhbCwgZXhwZWN0ZWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhc3MgPSByZXN1bHQucGFzcyA9IHV0aWwuZXF1YWxzKGFjdHVhbC5vbiwgZXhwZWN0ZWQub24sIGN1c3RvbUVxdWFsaXR5VGVzdGVycylcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHV0aWwuZXF1YWxzKGAke2FjdHVhbC5nZXRWYWx1ZX1gLCBgJHtleHBlY3RlZC5nZXRWYWx1ZX1gLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB1dGlsLmVxdWFscyhgJHthY3R1YWwuc2V0VmFsdWV9YCwgYCR7ZXhwZWN0ZWQuc2V0VmFsdWV9YCwgY3VzdG9tRXF1YWxpdHlUZXN0ZXJzKTtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubWVzc2FnZSA9IHBhc3MgPyAnQmluZGVycyBhcmUgZXF1YWwnIDogJ0JpbmRlcnMgYXJlIG5vdCBlcXVhbCdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcblxuXHRcdG9iaiA9IHt9O1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0YXJlYScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCB0ZXh0YXJlYSgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHRleHRhcmVhKCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBwcm9ncmVzcycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Byb2dyZXNzJyk7XG5cdFx0bm9kZS5tYXggPSAzO1xuICAgICAgICBub2RlLnZhbHVlID0gMTtcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgcHJvZ3Jlc3MoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgxKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoMik7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChwcm9ncmVzcygpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdGV4dCBpbnB1dCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG5cdFx0bm9kZS50eXBlID0gJ3RleHQnO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGlucHV0KCd0ZXh0JyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwoaW5wdXQoJ3RleHQnKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIG91dHB1dCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ291dHB1dCcpO1xuICAgICAgICBub2RlLmlubmVySFRNTCA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBvdXRwdXQoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3Qobm9kZS5pbm5lckhUTUwpLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKG91dHB1dCgpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgc2VsZWN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBub2RlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpKTtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IGAke2l9YDtcbiAgICAgICAgICAgIGlmKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgc2VsZWN0KCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJzEnKTtcblx0XHRvYmoueCA9ICc1Jztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnNScpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwoc2VsZWN0KCkpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBzZWxlY3QgKG11bHRpcGxlKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBub2RlLm11bHRpcGxlID0gdHJ1ZTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gbm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBgJHtpfWA7XG4gICAgICAgICAgICBpZihpID09PSAxIHx8IGkgPT09IDQgfHwgaSA9PT0gNykge1xuICAgICAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzZWxlY3QodHJ1ZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoWycxJywgJzQnLCAnNyddKTtcblx0XHRvYmoueCA9IFsnMicsICc1JywgJzgnXTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgICAgIG5vZGUub3B0aW9uc1tpXS5zZWxlY3RlZFxuICAgICAgICAgICAgKS50b0VxdWFsKFxuICAgICAgICAgICAgICAgIGkgPT09IDIgfHwgaSA9PT0gNSB8fCBpID09PSA4XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChzZWxlY3QodHJ1ZSkpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uYWRkJywgKCkgPT4ge1xuICAgIGl0KCdhZGRzIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJChbZWwxLCBlbDIsIGVsM10pLmFkZChbZWwyLCBlbDMsIGVsNCwgZWw1XSlcbiAgICAgICAgXSkudG9FcXVhbChbZWwxLCBlbDIsIGVsMywgZWw0LCBlbDVdKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmNyZWF0ZScsICgpID0+IHtcbiAgICBpdCgnY3JlYXRlcyBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2JykudGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ0RJVicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgYSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdmb29iYXInXG4gICAgICAgICAgICB9KS5jbGFzc05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdmb29iYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdjcmVhdGVzIGNoaWxkZW4nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdzcGFuJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KS5jaGlsZHJlblswXS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmdldEF0dHJpYnV0ZSgnZm9vJylcbiAgICAgICAgKS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBvYmplY3Qgd2l0aCB0YWdOYW1lIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdGFnTmFtZTogJ2RpdidcbiAgICAgICAgICAgIH0pLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdESVYnKTtcbiAgICB9KTtcblxuICAgIGl0KCdleHRlbmRzIGRhdGFzZXQgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGRhdGFzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmdldEF0dHJpYnV0ZSgnZGF0YS1mb28nKVxuICAgICAgICApLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5pbXBvcnQgc2ltdWxhdGVDbGljayBmcm9tICcuLi8uLi9saWIvc2ltdWxhdGVjbGljayc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgZXZlbnRzJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgY2hpbGQxO1xuICAgIGxldCBjaGlsZDI7XG4gICAgbGV0IGdyYW5kY2hpbGQxO1xuICAgIGxldCBoYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpO1xuICAgICAgICBjaGlsZDIgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQyJyk7XG4gICAgICAgIGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG4gICAgICAgIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICAkKFt0ZXN0U2FuZGJveCwgY2hpbGQxLCBjaGlsZDIsIGdyYW5kY2hpbGQxXSkub2ZmKCdjbGljaycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBuYW1lc3BhY2VkIGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGJ1YmJsaW5nIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoY2xpY2sgb24gZ3JhbmRjaGlsZHJlbiknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0RvZXNuXFx0IHRyaWdnZXIgd2hlbiBjbGlja2VkIG9uIHdyb25nIGNoaWxkJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMicsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIG5vdCBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU3RvcHMgcHJvcGFnYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICAkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qc1xuICoqLyIsIi8vIHNpbXVsYXRlcyBjbGljayBvbiBhIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2sobm9kZSkge1xuICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmZpbmQnLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuICAgIGxldCBncmFuZENoaWxkO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGdyYW5kQ2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpbmRzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJCh0ZXN0U2FuZGJveCkuZmluZCgnLmdyYW5kY2hpbGQnKVxuICAgICAgICBdKS50b0VxdWFsKFtncmFuZENoaWxkXSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgaW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0xXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtMlwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTNcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgd2luZG93JywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKHdpbmRvdyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKHdpbmRvdyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyBkb2N1bWVudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChkb2N1bWVudCk7XG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKGRvY3VtZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbnZlcnRzIGFycmF5LWxpa2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGNoaWxkcmVuKTtcblxuICAgICAgICBleHBlY3QoY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKHJlc3VsdC5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGV4cGVjdChjaGlsZHJlbltpXSkudG9FcXVhbChyZXN1bHRbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnQ29udmVydHMgb25lIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoZWxlbWVudCk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50KS50b0VxdWFsKHJlc3VsdFswXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCcudGVzdC0xJywgdGVzdFNhbmRib3gpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCcudGVzdC0xJywgJy53cm9uZy1jb250ZXh0JykubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gdXNlIG51bGwnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQobnVsbCkubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gdXNlIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIGNyZWF0ZSBwbHVnaW5zJywgKCkgPT4ge1xuICAgICAgICAkLmZuLmJRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uIGJRdWVyeVBsdWdpbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aFxuICAgICAgICAgICAgKS50b0VxdWFsKFxuICAgICAgICAgICAgICAgIHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5sZW5ndGhcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24oJC5mbiwgJ2JRdWVyeVBsdWdpbicpO1xuXG4gICAgICAgICQoJyonLCB0ZXN0U2FuZGJveCkuYlF1ZXJ5UGx1Z2luKCk7XG5cbiAgICAgICAgZXhwZWN0KCQuZm4uYlF1ZXJ5UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pbml0X3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuICAgIGl0KCdjaGVja3MgY2xhc3NOYW1lJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSAnZWwnO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwnKVxuICAgICAgICApLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJChlbCkuaXMoJy5lbDInKVxuICAgICAgICApLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG4gICAgaXQoJ2V4Y2x1ZGVzIGJ5IHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGVsMi5jbGFzc05hbWUgPSAnZWwyJztcblxuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJChbZWwxLCBlbDIsIGVsM10pLm5vdCgnLmVsMicpXG4gICAgICAgIF0pLnRvRXF1YWwoW2VsMSwgZWwzXSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5vbmUnLCAoKSA9PiB7XG4gICAgaXQoJ2ZpbmRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5vbmUoJyonLCB0ZXN0U2FuZGJveClcbiAgICAgICAgKS50b0VxdWFsKGNoaWxkKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LnBhcnNlSFRNTCcsICgpID0+IHtcbiAgICBpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIGNvbnRleHR1YWwgZWxlbWVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8dGQ+PC90ZD48dGQ+PC90ZD4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1xuICoqLyIsImltcG9ydCBjYWxjIGZyb20gJ3NyYy9jYWxjJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdjYWxjJywgKCkgPT4ge1xuXHRpdCgnYWRkcyBzaW1wbGUgZGVwZW5kZW5jeScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMlxuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIpO1xuXHRcdGV4cGVjdChvYmouYykudG9FcXVhbCgzKTtcblx0XHRvYmouYSA9IDM7XG5cdFx0ZXhwZWN0KG9iai5jKS50b0VxdWFsKDUpO1xuXHRcdG9iai5iID0gMztcblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoNik7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIHNpbXBsZSBkZXBlbmRlbmN5IGZvciBvYmplY3Qgd2l0aCBpc01LPXRydWUnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0ge1xuXHRcdFx0aXNNSzogdHJ1ZSxcblx0XHRcdGE6IDEsXG5cdFx0XHRiOiAyXG5cdFx0fTtcblxuXHRcdGNhbGMuY2FsbChvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiKTtcblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoMyk7XG5cdFx0b2JqLmEgPSAzO1xuXHRcdGV4cGVjdChvYmouYykudG9FcXVhbCg1KTtcblx0XHRvYmouYiA9IDM7XG5cdFx0ZXhwZWN0KG9iai5jKS50b0VxdWFsKDYpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBkZXBlbmRlbmN5IGZyb20gYW5vdGhlciBvYmplY3QnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0ge1xuXHRcdFx0YTogMSxcblx0XHRcdGI6IDJcblx0XHR9O1xuXHRcdGNvbnN0IG9iajIgPSB7XG5cdFx0XHRjOiA0LFxuXHRcdFx0ZDogOFxuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2UnLCBbe1xuXHRcdFx0b2JqZWN0OiBvYmosXG5cdFx0XHRrZXk6IFsnYScsICdiJ11cblx0XHR9LCB7XG5cdFx0XHRvYmplY3Q6IG9iajIsXG5cdFx0XHRrZXk6IFsnYycsICdkJ11cblx0XHR9XSwgKGEsIGIsIGMsIGQpID0+IGEgKyBiICsgYyArIGQpO1xuXG5cdFx0ZXhwZWN0KG9iai5lKS50b0VxdWFsKDE1KTtcblx0fSk7XG5cblx0aXQoYGRvZXNuJ3Qgc2V0IG9uIGluaXQgdmlhIHNldE9uSW5pdD1mYWxzZWAsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMixcblx0XHRcdGM6IDBcblx0XHR9O1xuXG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiLCB7XG5cdFx0XHRzZXRPbkluaXQ6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdwcm90ZWN0cyBmcm9tIGN5Y2xpY2FsIGxpbmtzJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHtcblx0XHRcdGE6IDEsXG5cdFx0XHRiOiAyLFxuXHRcdFx0YzogM1xuXHRcdH07XG5cblx0XHRjYWxjKG9iaiwgJ2EnLCBbJ2InLCAnYyddLCAoeCwgeSkgPT4geCArIHkpO1xuXHRcdGNhbGMob2JqLCAnYicsIFsnYScsICdjJ10sICh4LCB5KSA9PiB4ICsgeSk7XG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKHgsIHkpID0+IHggKyB5KTtcblxuXHRcdGV4cGVjdChvYmouYSkudG9FcXVhbCgyNyk7XG5cdH0pO1xuXG5cdHhpdCgndGhyb3dzIGVycm9yIHdoZW4gdGFyZ2V0IGlzIG5vdCBhIHN0cmluZycsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2UgaXMgbm90IGFuIG9iamVjdCcsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2Uga2V5IGlzIG5vdCBhIHN0cmluZycsICgpID0+IHt9KTtcblx0eGl0KCd0aHJvd3MgZXJyb3Igd2hlbiBzb3VyY2Ugb2JqZWN0IGlzIG5vdCBhbiBvYmplY3QnLCAoKSA9PiB7fSk7XG5cblx0aXQoJ2FsbG93cyBkZWVwIGRlcGVuZGVuY2llcycsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycsIDEpO1xuXG5cdFx0Y2FsYyhvYmosICdkJywgJ2EuYi5jJywgKGMpID0+IGMpO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgxKTtcblx0XHRvYmouYS5iLmMgPSAyO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgyKTtcblxuXHRcdGNvbnN0IGIgPSBvYmouYS5iO1xuXHRcdG9iai5hLmIgPSB7YzogM307XG5cdFx0Yi5jID0gJ25vcGUnO1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCgzKTtcblxuXHRcdGNvbnN0IGEgPSBvYmouYTtcblx0XHRvYmouYSA9IHtiOiB7YzogNH19O1xuXHRcdGEuYiA9IHtjOiAnbm9wZSd9O1xuXHRcdGV4cGVjdChvYmouZCkudG9FcXVhbCg0KTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyBkZWVwIGRlcGVuZGVuY2llcyBmcm9tIGFub3RoZXIgb2JqZWN0JywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EnLCAxKTtcblx0XHRjb25zdCBvYmoyID0gbWFrZU9iamVjdCgnYi5jLmQnLCAyKTtcblxuXHRcdGNhbGMob2JqLCAnZCcsIHtcblx0XHRcdG9iamVjdDogb2JqMixcblx0XHRcdGtleTogJ2IuYy5kJ1xuXHRcdH0sIChjKSA9PiBjKjIpO1xuXG5cdFx0ZXhwZWN0KG9iai5kKS50b0VxdWFsKDQpO1xuXHR9KTtcblxuXHRpdCgndXNlcyBldmVudCBvcHRpb25zJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHt9O1xuXHRcdGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoZXZ0ID0+IHtcblx0XHRcdGV4cGVjdChldnQuZm9vKS50b0VxdWFsKCdiYXInKTtcblx0XHR9KTtcblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIsIHsgZm9vOiAnYmFyJyB9KTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cblx0XHRvYmouYSA9IDI7XG5cdFx0b2JqLmIgPSAzO1xuXG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxKTtcblx0fSk7XG5cblx0aXQoJ3VzZXMgc2lsZW50PXRydWUgZnJvbSBldmVudCBvcHRpb25zJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHt9O1xuXHRcdGNvbnN0IGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTpjJywgaGFuZGxlcik7XG5cblx0XHRjYWxjKG9iaiwgJ2MnLCBbJ2EnLCAnYiddLCAoYSwgYikgPT4gYSArIGIsIHsgc2lsZW50OiB0cnVlIH0pO1xuXG5cdFx0b2JqLmEgPSAyO1xuXHRcdG9iai5iID0gMztcblxuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYWxsb3dzIHRvIGRlYm91bmNlIGhhbmRsZXInLCBkb25lID0+IHtcblx0XHRjb25zdCBvYmogPSB7XG5cdFx0XHRhOiAxLFxuXHRcdFx0YjogMlxuXHRcdH07XG5cdFx0Y29uc3QgaGFuZGxlciA9IGNyZWF0ZVNweSgoKSA9PiB7XG5cdFx0XHRleHBlY3Qob2JqLmMpLnRvRXF1YWwoNSk7XG5cdFx0fSk7XG5cblx0XHRhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6YycsIGhhbmRsZXIpO1xuXG5cdFx0Y2FsYyhvYmosICdjJywgWydhJywgJ2InXSwgKGEsIGIpID0+IGEgKyBiLCB7XG5cdFx0XHRkZWJvdW5jZTogdHJ1ZVxuXHRcdH0pO1xuXG5cdFx0b2JqLmEgPSAwO1xuXHRcdG9iai5hID0gMTtcblx0XHRvYmouYSA9IDI7XG5cdFx0b2JqLmIgPSAwO1xuXHRcdG9iai5iID0gMTtcblx0XHRvYmouYiA9IDI7XG5cdFx0b2JqLmIgPSAzO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDQwMCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9jYWxjX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IG1hdHJlc2hrYUVycm9yIGZyb20gJy4uL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi4vb24vX2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL191dGlsL2RlYm91bmNlJztcbmltcG9ydCBhZGRTb3VyY2UgZnJvbSAnLi9fYWRkc291cmNlJztcbmltcG9ydCBydW5DYWxjSGFuZGxlciBmcm9tICcuL19ydW5jYWxjaGFuZGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbGMob2JqZWN0LCB0YXJnZXQsIHNvdXJjZXMsIGdpdmVuSGFuZGxlciwgZXZlbnRPcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZlbnRPcHRpb25zID0gZ2l2ZW5IYW5kbGVyO1xuICAgICAgICBnaXZlbkhhbmRsZXIgPSBzb3VyY2VzO1xuICAgICAgICBzb3VyY2VzID0gdGFyZ2V0O1xuICAgICAgICB0YXJnZXQgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnY2FsYycpO1xuICAgIH1cblxuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAvKlxuICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgKiB0aGlzLmNhbGMoW3t0YXJnZXQsIHNvdXJjZSwgaGFuZGxlciwgZXZlbnR9XSwgY29tbW9uRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICovXG4gICAgICAgIG5vZm4uZm9yRWFjaCh0YXJnZXQsICh7XG4gICAgICAgICAgICB0YXJnZXQ6IGl0ZW1UYXJnZXQsXG4gICAgICAgICAgICBzb3VyY2VzOiBpdGVtU291cmNlcyxcbiAgICAgICAgICAgIGhhbmRsZXI6IGl0ZW1IYW5kbGVyLFxuICAgICAgICAgICAgZXZlbnQ6IGl0ZW1FdmVudE9wdGlvbnNcbiAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnRPcHRpb25zID0gc291cmNlcztcbiAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50T3B0aW9ucyA9IHt9O1xuXG4gICAgICAgICAgICBpZihjb21tb25FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwiZ2xvYmFsXCIgZXZlbnRcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudE9wdGlvbnMsIGNvbW1vbkV2ZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGl0ZW1FdmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnRPcHRpb25zLCBpdGVtRXZlbnRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsYyhvYmplY3QsIGl0ZW1UYXJnZXQsIGl0ZW1Tb3VyY2VzLCBpdGVtSGFuZGxlciwgbWVyZ2VkRXZlbnRPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGFyZ2V0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignY2FsYzp0YXJnZXRfdHlwZScsIHsgdGFyZ2V0IH0pO1xuICAgIH1cblxuICAgIGV2ZW50T3B0aW9ucyA9IGV2ZW50T3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCBkZWYgPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7XG4gICAgICAgIHNldE9uSW5pdD10cnVlLFxuICAgICAgICBkZWVwPXRydWUsXG4gICAgICAgIGRlYm91bmNlOiBkZWJvdW5jZU9wdGlvbj1mYWxzZVxuICAgIH0gPSBldmVudE9wdGlvbnM7XG4gICAgY29uc3QgZGVmYXVsdEhhbmRsZXIgPSB2YWx1ZSA9PiB2YWx1ZTtcbiAgICBjb25zdCBoYW5kbGVyID0gZ2l2ZW5IYW5kbGVyIHx8IGRlZmF1bHRIYW5kbGVyO1xuICAgIGNvbnN0IGFsbFNvdXJjZXMgPSBbXTtcblx0bGV0IGNhbGNIYW5kbGVyID0gKGNoYW5nZUV2ZW50PXt9KSA9PiBydW5DYWxjSGFuZGxlcih7XG5cdFx0b2JqZWN0LFxuXHRcdGNoYW5nZUV2ZW50LFxuXHRcdGV2ZW50T3B0aW9ucyxcblx0XHRhbGxTb3VyY2VzLFxuXHRcdHRhcmdldCxcblx0XHRkZWYsXG5cdFx0aGFuZGxlclxuXHR9KTtcblxuICAgIGlmKCEoc291cmNlcyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICBzb3VyY2VzID0gW3NvdXJjZXNdO1xuICAgIH1cblxuXG5cbiAgICAvLyBieSBkZWZhdWx0IGRlYm91bmNpbmcgaXMgb2ZmXG4gICAgLy8gaXQgY2FuIGJlIHR1cm5lZCBvbiBieSBwYXNzaW5nIGRlYm91bmNlPXRydWUgb3IgZGVib3VuY2U9PG51bWJlcj4gdG8gZXZlbnQgb2JqZWN0XG4gICAgaWYgKGRlYm91bmNlT3B0aW9uIHx8IGRlYm91bmNlT3B0aW9uID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIGRlYm91bmNlT3B0aW9uID09PSAnbnVtYmVyJyA/IGRlYm91bmNlT3B0aW9uIDogMDtcbiAgICAgICAgY2FsY0hhbmRsZXIgPSBkZWJvdW5jZShjYWxjSGFuZGxlciwgZGVsYXkpO1xuICAgIH1cblxuXG5cbiAgICBub2ZuLmZvckVhY2goc291cmNlcywgc291cmNlID0+IHtcbiAgICAgICAgaWYodHlwZW9mIHNvdXJjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGFkZFNvdXJjZSh7XG5cdFx0XHRcdGNhbGNIYW5kbGVyLFxuXHRcdFx0XHRvYmplY3QsXG5cdFx0XHRcdGFsbFNvdXJjZXMsXG4gICAgICAgICAgICAgICAgc291cmNlS2V5OiBzb3VyY2UsXG4gICAgICAgICAgICAgICAgc291cmNlT2JqZWN0OiBvYmplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoIXNvdXJjZSB8fCB0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIHRocm93IG1hdHJlc2hrYUVycm9yKCdjYWxjOnNvdXJjZV90eXBlJywgeyBzb3VyY2UgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUtleSA9IHNvdXJjZS5rZXk7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VPYmplY3QgPSBzb3VyY2Uub2JqZWN0O1xuICAgICAgICAgICAgaWYoc291cmNlS2V5IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goc291cmNlS2V5LCAoc291cmNlS2V5SXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhZGRTb3VyY2Uoe1xuXHRcdFx0XHRcdFx0Y2FsY0hhbmRsZXIsXG5cdFx0XHRcdFx0XHRvYmplY3QsXG5cdFx0XHRcdFx0XHRhbGxTb3VyY2VzLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlS2V5OiBzb3VyY2VLZXlJdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlT2JqZWN0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkZFNvdXJjZSh7XG5cdFx0XHRcdFx0Y2FsY0hhbmRsZXIsXG5cdFx0XHRcdFx0b2JqZWN0LFxuXHRcdFx0XHRcdGFsbFNvdXJjZXMsXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUtleSxcbiAgICAgICAgICAgICAgICAgICAgc291cmNlT2JqZWN0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKHNldE9uSW5pdCkge1xuICAgICAgICBjYWxjSGFuZGxlcigpXG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FsYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBDbGFzcyBmcm9tICdzcmMvY2xhc3MnO1xuXG5kZXNjcmliZSgnQ2xhc3MgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgaXQoJ2FsbG93cyB0byBpbmhlcml0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBBID0gQ2xhc3MoeyBhOiB0cnVlIH0pLFxuICAgICAgICAgICAgQiA9IENsYXNzKHsgYjogdHJ1ZSwgZXh0ZW5kczogQSB9KSxcbiAgICAgICAgICAgIEMgPSBDbGFzcyh7IGM6IHRydWUsIGV4dGVuZHM6IEIgfSksXG4gICAgICAgICAgICBpbnN0ID0gbmV3IEM7XG5cbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEMpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICBleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0LmIpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QuYykudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgQSA9IENsYXNzKHt9LCB7IHN0YXRpY1Byb3A6IHRydWUgfSk7XG4gICAgICAgIGV4cGVjdChBLnN0YXRpY1Byb3ApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnN0ID0gbmV3IENsYXNzKHsgYTogdHJ1ZSB9KTtcbiAgICAgICAgZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGFzcyhwcm90b3R5cGUsIHN0YXRpY1Byb3BzKSB7XG4gICAgY29uc3QgQ29uc3RydWN0b3IgPSBwcm90b3R5cGUuY29uc3RydWN0b3IgIT09IE9iamVjdFxuICAgICAgICAgICAgPyBwcm90b3R5cGUuY29uc3RydWN0b3JcbiAgICAgICAgICAgIDogZnVuY3Rpb24gRW1wdHlDb25zdHJ1Y3RvcigpIHt9LFxuICAgICAgICAvL2V4dGVuZHMgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICBQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuICAgICAgICAvL2luaGVyaXQgcHJvdG8gZnJvbSBjbGFzcyBwYXJlbnQgb3IgZW1wdHkgb2JqZWN0XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQgPyBQYXJlbnQucHJvdG90eXBlIDoge30pO1xuXG4gICAgZXh0ZW5kKHByb3RvLCBwcm90b3R5cGUpO1xuXG4gICAgaWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZXh0ZW5kKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgfVxuXG4gICAgLy8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICBwcm90by5pbnN0YW5jZU9mID0gZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcjtcbiAgICB9O1xuXG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDbGFzcykge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKE1hdHJlc2hrYS5PYmplY3QgYW5kIE1hdHJlc2hrYS5BcnJheSknLCBmdW5jdGlvbigpIHtcbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgY2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaChuZXcgTUsuQXJyYXkoe30pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXVswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2gobmV3IE1LLkFycmF5KHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXVswXS5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgIHk6IG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgICAgIGE6IHt9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC55LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL29uL19kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy90cmlnZ2VyL190cmlnZ2Vyb25lJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKGJhc2ljKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgbGV0IGN0eDtcbiAgICBsZXQgaGFuZGxlcjtcblxuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGN0eCA9IHt9O1xuICAgICAgICB0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcbiAgICAgICAgY29uc3QgYSA9IG9iai5hO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcbiAgICAgICAgdHJpZ2dlck9uZShhLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuICAgICAgICBjb25zdCBiID0gb2JqLmEuYjtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKGIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgYSA9IG9iai5hO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgYiA9IG9iai5hLmI7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcbiAgICAgICAgdHJpZ2dlck9uZShiLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgYyA9IG9iai5hLmM7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUoYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXNuXFwndCByZW1vdmUgY2hhbmdlIGV2ZW50IHdoZW4gdW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG9iai5hLmIuYyA9IDU1O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndXNlcyBjb3JyZWN0IGNvbnRleHQgZm9yIGRlbGVnYXRlZCBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGxldCBib29sID0gZmFsc2U7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBmdW5jdGlvbiBoYW5kbGUoKSB7XG4gICAgICAgICAgICBib29sID0gdGhpcyA9PT0gY3R4O1xuICAgICAgICB9LCBjdHgpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL29uL19kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL29mZi9fdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQ2hhbmdlIGV2ZW50IChzaW1wbGUgYW5kIGRlbGVnYXRlZCknLCAoKSA9PiB7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIG9iai5hLmIgPSBudWxsO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvb24vX2FkZGxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvb2ZmL19yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICdzcmMvdHJpZ2dlci9fdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsICgpID0+IHtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb2JqID0ge307XG4gICAgICAgIGN0eCA9IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2F2b2lkcyBjb25mbGljdHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMSkpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTIpKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9FcXVhbCgxMTEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIGFyZ3MpJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBuYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG54ZGVzY3JpYmUoXCJFdmVudHMgY29yZTogX2FkZERPTUxpc3RlbmVyLCBfcmVtb3ZlRE9NTGlzdGVuZXJcIiwgKCkgPT4ge1xuICAgIGxldCBxID0gKHMsIGMpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgIGV2LmluaXRNb3VzZUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuICAgICAgICAgICAgICAgICAgICAwIC8qbGVmdCovICwgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuICAgICAgICB0YWdOYW1lOiAnRElWJyxcbiAgICAgICAgaWQ6ICdkLXRlc3QnLFxuICAgICAgICBpbm5lckhUTUw6IGBcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkLXRlc3QtMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH0pKTtcblxuXG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cblxuICAgIGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIGFuZCByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4JywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yIChidWJibGluZyB0ZXN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCBhbmQgZG9lc25cXCd0IHJlbW92ZSBldmVudHMgZnJvbSBvdGhlciBub2RlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdFdmVudHMgc3VtbWFyeSAob24sIG9mZiknLCAoKSA9PiB7XG4gICAgbGV0IHEgPSAocywgYykgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgZXYuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG4gICAgICAgICAgICAgICAgICAgIDAgLypsZWZ0Ki8gLCBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGxldCBub2RlID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG4gICAgICAgIHRhZ05hbWU6ICdESVYnLFxuICAgICAgICBpZDogJ3MtdGVzdCcsXG4gICAgICAgIGlubmVySFRNTDogYFxuICAgICAgICAgICAgPGRpdiBpZD1cInMtdGVzdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfSkpO1xuXG4gICAgbm9kZS5jbGljayA9IG5vZGUuY2xpY2sgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snKSk7XG4gICAgfVxuXG4gICAgaXQoJ2ZpcmVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMub2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtay5vbignc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLm9mZignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG5cbiAgICBpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBtYWdpYy5vbmNlKG9iaiwge1xuICAgICAgICAgICAgZm9vOiBmMSxcbiAgICAgICAgICAgIGJhcjogZjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoaikudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBtay5vbmNlKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBmMSA9IGV2dCA9PiBpKyssXG4gICAgICAgICAgICBmMiA9IGV2dCA9PiBqKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnb25EZWJvdW5jZSB3b3JrcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA4MDApO1xuXG4gICAgICAgIG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uXCIgYW5kIFwib2ZmXCInLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgICAgICAgZm9vOiAoKSA9PiBpKyssXG4gICAgICAgICAgICAgICAgYmFyOiAoKSA9PiBpKytcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgTUsub24ob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcblxuICAgICAgICBNSy5vZmYob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMik7XG4gICAgfSk7XG5cblxuICAgIGl0KCdhbGxvd3MgdG8gZmxpcCBjb250ZXh0IGFuZCB0cmlnZ2VyT25Jbml0IChvbiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIHRoaXNBcmcgPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRydWUsIHRoaXNBcmcpO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2JhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRoaXNBcmcsIHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGFkZFRyZWVMaXN0bmVyIGZyb20gJ3NyYy9vbi9fYWRkdHJlZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVUcmVlTGlzdG5lciBmcm9tICdzcmMvb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ1RyZWUgY2hhbmdlIGV2ZW50cycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGxpc3RlbiB0cmVlIGFuZCBzaG91bGQgcmVtb3ZlIGxpc3RlbmVycyBmcm9tIHByZXZpb3VzIHN1YnRyZWUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLmQuZScpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZFRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jLmQuZScsIGhhbmRsZXIpO1xuXG4gICAgICAgIGNvbnN0IGUgPSBvYmouYS5iLmMuZC5lO1xuICAgICAgICBvYmouYS5iLmMuZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMSk7XG5cbiAgICAgICAgLy8gb25jZSBhZ2FpblxuICAgICAgICBvYmouYS5iLmMuZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMik7XG5cbiAgICAgICAgY29uc3QgZCA9IG9iai5hLmIuYy5kO1xuICAgICAgICBvYmouYS5iLmMuZCA9IG1ha2VPYmplY3QoJ2UnKTtcbiAgICAgICAgZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMyk7XG5cblxuICAgICAgICBjb25zdCBjID0gb2JqLmEuYi5jO1xuICAgICAgICBvYmouYS5iLmMgPSBtYWtlT2JqZWN0KCdkLmUnKTtcbiAgICAgICAgYy5kID0gbWFrZU9iamVjdCgnZScpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZFRpbWVzKDQpO1xuXG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYy5kLmUnKTtcbiAgICAgICAgYi5jID0gbWFrZU9iamVjdCgnZC5lJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoNSk7XG5cbiAgICAgICAgY29uc3QgYSA9IG9iai5hO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy5kLmUnKTtcbiAgICAgICAgYS5iID0gbWFrZU9iamVjdCgnYy5kLmUnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg2KTtcblxuICAgICAgICBvYmouYS5iLmMuZC5lID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoNyk7XG5cbiAgICAgICAgb2JqLmEuYi5jLmQgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg4KTtcblxuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcyg5KTtcblxuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTApO1xuXG4gICAgICAgIG9iai5hID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTEpO1xuXG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxMik7XG5cbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTMpO1xuXG4gICAgICAgIG9iai5hLmIuYy5kID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkVGltZXMoMTQpO1xuXG4gICAgICAgIG9iai5hLmIuYy5kLmUgPSB7fTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWRUaW1lcygxNSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdzaG91bGQgbHJlbW92ZSB0cmVlIGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZFRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZVRyZWVMaXN0bmVyKG9iaiwgJ2EuYi5jJywgaGFuZGxlcik7XG5cbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvdHJlZV9jaGFuZ2Vfc3BlYy5qc1xuICoqLyIsInZhciBtYXAgPSB7XG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDIxLFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiAyMCxcblx0XCIuL19jb3JlL2luaXQuanNcIjogMTksXG5cdFwiLi9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXCI6IDMxLFxuXHRcIi4vX2RvbS9pbmRleC5qc1wiOiAzMCxcblx0XCIuL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1wiOiAyNCxcblx0XCIuL191dGlsL2RlYm91bmNlLmpzXCI6IDU4LFxuXHRcIi4vX3V0aWwvZGVlcGZpbmQuanNcIjogOTksXG5cdFwiLi9fdXRpbC9pcy5qc1wiOiAyNixcblx0XCIuL191dGlsL21hdHJlc2hrYWVycm9yLmpzXCI6IDI1LFxuXHRcIi4vX3V0aWwvdG9hcnJheS5qc1wiOiAyOSxcblx0XCIuL2FycmF5LmpzXCI6IDkyLFxuXHRcIi4vYmluZGVycy9fY2xhc3NsaXN0LmpzXCI6IDcsXG5cdFwiLi9iaW5kZXJzL2F0dHIuanNcIjogOSxcblx0XCIuL2JpbmRlcnMvY2xhc3NuYW1lLmpzXCI6IDYsXG5cdFwiLi9iaW5kZXJzL2RhdGFzZXQuanNcIjogMTcsXG5cdFwiLi9iaW5kZXJzL2Rpc3BsYXkuanNcIjogNSxcblx0XCIuL2JpbmRlcnMvaHRtbC5qc1wiOiA0LFxuXHRcIi4vYmluZGVycy9pbmRleC5qc1wiOiAzLFxuXHRcIi4vYmluZGVycy9pbnB1dC5qc1wiOiAxMCxcblx0XCIuL2JpbmRlcnMvb3V0cHV0LmpzXCI6IDExLFxuXHRcIi4vYmluZGVycy9wcm9ncmVzcy5qc1wiOiAxNCxcblx0XCIuL2JpbmRlcnMvcHJvcC5qc1wiOiA4LFxuXHRcIi4vYmluZGVycy9zZWxlY3QuanNcIjogMTMsXG5cdFwiLi9iaW5kZXJzL3N0eWxlLmpzXCI6IDE2LFxuXHRcIi4vYmluZGVycy90ZXh0LmpzXCI6IDE1LFxuXHRcIi4vYmluZGVycy90ZXh0YXJlYS5qc1wiOiAxMixcblx0XCIuL2JpbmRub2RlL19iaW5kc2luZ2xlbm9kZS5qc1wiOiA1Mixcblx0XCIuL2JpbmRub2RlL19nZXRub2Rlcy5qc1wiOiAyNyxcblx0XCIuL2JpbmRub2RlL19ydW5ub2RlaGFuZGxlci5qc1wiOiA1NSxcblx0XCIuL2JpbmRub2RlL19ydW5vYmplY3RoYW5kbGVyLmpzXCI6IDU2LFxuXHRcIi4vYmluZG5vZGUvX3NlbGVjdG5vZGVzLmpzXCI6IDI4LFxuXHRcIi4vYmluZG5vZGUvX3N3aXRjaGJpbmRpbmcuanNcIjogNDYsXG5cdFwiLi9iaW5kbm9kZS9pbmRleC5qc1wiOiAxOCxcblx0XCIuL2JpbmRvcHRpb25hbG5vZGUuanNcIjogNjMsXG5cdFwiLi9iaW5kc2FuZGJveC5qc1wiOiA2NCxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiA0MCxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAzNCxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAzMyxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogNDMsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDM4LFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogNDUsXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMzIsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogNDEsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDQ0LFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiA0Mixcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAzOSxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMzcsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDM2LFxuXHRcIi4vY2FsYy9fYWRkc291cmNlLmpzXCI6IDEwMCxcblx0XCIuL2NhbGMvX3J1bmNhbGNoYW5kbGVyLmpzXCI6IDEwMSxcblx0XCIuL2NhbGMvaW5kZXguanNcIjogODEsXG5cdFwiLi9jbGFzcy5qc1wiOiA4Myxcblx0XCIuL2RlZmF1bHRiaW5kZXJzLmpzXCI6IDU0LFxuXHRcIi4vZXh0ZW5kLmpzXCI6IDM1LFxuXHRcIi4vaW5kZXguanNcIjogOTMsXG5cdFwiLi9sb29rZm9yYmluZGVyLmpzXCI6IDUzLFxuXHRcIi4vbWFnaWMuanNcIjogOTYsXG5cdFwiLi9tYXRyZXNoa2EvaW5kZXguanNcIjogOTQsXG5cdFwiLi9vYmplY3QvaW5kZXguanNcIjogOTUsXG5cdFwiLi9vZmYvX3JlbW92ZWxpc3RlbmVyLmpzXCI6IDQ5LFxuXHRcIi4vb2ZmL19yZW1vdmV0cmVlbGlzdGVuZXIuanNcIjogNTAsXG5cdFwiLi9vZmYvX3VuZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA0OCxcblx0XCIuL29uL19hZGRsaXN0ZW5lci5qc1wiOiA1Nyxcblx0XCIuL29uL19hZGR0cmVlbGlzdGVuZXIuanNcIjogNjAsXG5cdFwiLi9vbi9fZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA1OSxcblx0XCIuL29uL2luZGV4LmpzXCI6IDk3LFxuXHRcIi4vcGFyc2ViaW5kaW5ncy5qc1wiOiA5OCxcblx0XCIuL3NlbGVjdC5qc1wiOiA2NSxcblx0XCIuL3NlbGVjdGFsbC5qc1wiOiA2Nixcblx0XCIuL3NldC5qc1wiOiAyMixcblx0XCIuL3RyaWdnZXIvX3RyaWdnZXJvbmUuanNcIjogMjMsXG5cdFwiLi91bmJpbmRub2RlL19yZW1vdmViaW5kaW5nLmpzXCI6IDUxLFxuXHRcIi4vdW5iaW5kbm9kZS9pbmRleC5qc1wiOiA0N1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA5MTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSA5MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2FycmF5LmpzXG4gKiovIiwiaW1wb3J0IE1hdHJlc2hrYSBmcm9tICcuL21hdHJlc2hrYSc7XG5pbXBvcnQgTWF0cmVzaGthQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgTWF0cmVzaGthT2JqZWN0IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBDbGFzcyBmcm9tICcuL2NsYXNzJztcbi8vaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG4vL01hdHJlc2hrYS5iaW5kZXJzID0gYmluZGVycztcblxuZXhwb3J0IGRlZmF1bHQgTWF0cmVzaGthO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi4vY2xhc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBDbGFzcyh7XG4gICAgLy8gaW5zdGFuY2UgcHJvcGVyaWVzIGFuZCBtZXRob2RzXG5cbn0sIHtcbiAgICAvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuICAgIGV4dGVuZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYXRyZXNoa2EvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2JqZWN0L2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hZ2ljLmpzXG4gKiovIiwiXG4vLyAvXigoW15AXSspQCk/KCguKz8pKDo6KFteXFwoXFwpXSspPyhcXCgoLiopXFwpKT8pPyk/JC9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24oKSB7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uL2luZGV4LmpzXG4gKiovIiwiLy9pbXBvcnQgcGFyc2VyQnJhY2tldHMgZnJvbSAnLi9fYmluZGluZ3MvcGFyc2VyYnJhY2tldHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZXMpIHtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcGFyc2ViaW5kaW5ncy5qc1xuICoqLyIsIi8vIGdldHMgdmFsdWUgb2YgYSBwcm9wZXJ0eSBpbiBuZXN0ZWQgb2JqZWN0XG4vLyBwYXRoIGV4YW1wbGU6IGEuYi5jLmRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZXBGaW5kKG9iaiwgcGF0aCkge1xuXHR2YXIgcGF0aHMgPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoLFxuXHRcdGN1cnJlbnQgPSBvYmosXG5cdFx0aTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyArK2kpIHtcblx0XHRpZiAodHlwZW9mIGN1cnJlbnRbcGF0aHNbaV1dID09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50ID0gY3VycmVudFtwYXRoc1tpXV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGN1cnJlbnQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9kZWVwZmluZC5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkbGlzdGVuZXInO1xuaW1wb3J0IGFkZFRyZWVMaXN0ZW5lciBmcm9tICcuLi9vbi9fYWRkdHJlZWxpc3RlbmVyJztcblxuLy8gYWRkcyBzb3VyY2UgdG8gYSBzb3VyY2UgbGlzdCBhbmQgYWRkcyBldmVudCBsaXN0ZW5lciB0byBhIHNvdXJjZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkU291cmNlKHtcblx0Y2FsY0hhbmRsZXIsXG5cdG9iamVjdCxcblx0YWxsU291cmNlcyxcblx0c291cmNlS2V5LFxuXHRzb3VyY2VPYmplY3Rcbn0pIHtcblx0bGV0IGlzRGVsZWdhdGVkID0gZmFsc2U7XG5cblx0Ly8gc291cmNlIGtleSBtdXN0IGJlIGEgc3RyaW5nXG5cdGlmKHR5cGVvZiBzb3VyY2VLZXkgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbWF0cmVzaGthRXJyb3IoJ2NhbGM6c291cmNlX2tleV90eXBlJywgeyBzb3VyY2VLZXkgfSk7XG5cdH1cblxuXHQvLyBzb3VyY2Ugb2JqZWN0IG11c3QgYmUgYW4gb2JqZWN0XG5cdGlmKCFzb3VyY2VPYmplY3QgfHwgdHlwZW9mIHNvdXJjZU9iamVjdCAhPT0gJ29iamVjdCcpIHtcblx0XHR0aHJvdyBtYXRyZXNoa2FFcnJvcignY2FsYzpzb3VyY2Vfb2JqZWN0X3R5cGUnLCB7IHNvdXJjZU9iamVjdCB9KTtcblx0fVxuXG5cdGNvbnN0IGRlZXBQYXRoID0gc291cmNlS2V5LnNwbGl0KCcuJyk7XG5cdGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG5cdC8vIGlmIHNvbWV0aGluZyBsaWtlIGEuYi5jIGlzIHVzZWQgYXMgYSBrZXlcblx0aWYoZGVlcFBhdGgubGVuZ3RoID4gMSkge1xuXHRcdGlzRGVsZWdhdGVkID0gdHJ1ZTtcblx0XHQvLyBUT0RPIGF2b2lkIGNvbGxpc2lvbnMgd2l0aCBiaW5kaW5ncyBieSB1c2luZyBhbm90aGVyIGV2ZW50IG5hbWUgaW5zdGVhZCBvZiBfY2hhbmdlOnRyZWU6Li4uXG5cdFx0YWRkVHJlZUxpc3RlbmVyKG9iamVjdCwgZGVlcFBhdGgsIGNhbGNIYW5kbGVyKTtcblx0fSBlbHNlIHtcblx0XHQvLyBub3JtYWwgaGFuZGxlclxuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6ZGVwczoke3NvdXJjZUtleX1gLCBjYWxjSGFuZGxlcik7XG5cdH1cblxuXHRhbGxTb3VyY2VzLnB1c2goe1xuXHRcdHNvdXJjZUtleSxcblx0XHRzb3VyY2VPYmplY3QsXG5cdFx0aXNEZWxlZ2F0ZWRcblx0fSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWxjL19hZGRzb3VyY2UuanNcbiAqKi8iLCJpbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5pbXBvcnQgZGVlcEZpbmQgZnJvbSAnLi4vX3V0aWwvZGVlcGZpbmQnO1xuXG4vLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBhbmQgY29tbWVudHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bkNhbGNIYW5kbGVyKHtcblx0b2JqZWN0LFxuXHRjaGFuZ2VFdmVudCxcblx0ZXZlbnRPcHRpb25zLFxuXHRhbGxTb3VyY2VzLFxuXHR0YXJnZXQsXG5cdGRlZixcblx0aGFuZGxlclxufSkge1xuXHRjb25zdCB2YWx1ZXMgPSBbXTtcblx0Y29uc3QgeyBwcm90ZWN0b3I9e30gfSA9IGNoYW5nZUV2ZW50O1xuXHRjb25zdCBwcm90ZWN0S2V5ID0gdGFyZ2V0ICsgZGVmLmlkO1xuXHRsZXQgc2V0RXZlbnRPcHRpb25zID0gbm9mbi5hc3NpZ24oeyBwcm90ZWN0b3IgfSwgZXZlbnRPcHRpb25zKTtcblx0c2V0RXZlbnRPcHRpb25zID0gbm9mbi5hc3NpZ24oc2V0RXZlbnRPcHRpb25zLCBjaGFuZ2VFdmVudCk7XG5cblx0aWYocHJvdGVjdEtleSBpbiBwcm90ZWN0b3IpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRwcm90ZWN0b3JbcHJvdGVjdEtleV0gPSB0cnVlO1xuXG5cdG5vZm4uZm9yRWFjaChhbGxTb3VyY2VzLCAoeyBzb3VyY2VPYmplY3QsIHNvdXJjZUtleSwgaXNEZWxlZ2F0ZWQgfSkgPT4ge1xuXHRcdGNvbnN0IHZhbHVlID0gaXNEZWxlZ2F0ZWQgPyBkZWVwRmluZChzb3VyY2VPYmplY3QsIHNvdXJjZUtleSkgOiBzb3VyY2VPYmplY3Rbc291cmNlS2V5XTtcblx0XHR2YWx1ZXMucHVzaCh2YWx1ZSk7XG5cdH0pO1xuXG5cdGNvbnN0IHRhcmdldFZhbHVlID0gaGFuZGxlci5hcHBseShvYmplY3QsIHZhbHVlcyk7XG5cdHNldChvYmplY3QsIHRhcmdldCwgdGFyZ2V0VmFsdWUsIHNldEV2ZW50T3B0aW9ucyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYWxjL19ydW5jYWxjaGFuZGxlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=