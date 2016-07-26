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
	
	var bindNode = __webpack_require__(17);
	
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
	
	var output = __webpack_require__(53);
	
	var textarea = __webpack_require__(11);
	
	var select = __webpack_require__(12);
	
	var progress = __webpack_require__(13);
	
	var text = __webpack_require__(14);
	
	var style = __webpack_require__(15);
	
	var dataset = __webpack_require__(16);
	
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(10);
	
	module.exports = textarea;
	function textarea() {
		return input('text');
	}

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(10);
	
	module.exports = textarea;
	function textarea() {
		return input();
	}

/***/ },
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(18);
	
	var defineProp = __webpack_require__(20);
	
	var getNodes = __webpack_require__(26);
	
	var switchBinding = __webpack_require__(45);
	
	var bindSingleNode = __webpack_require__(50);
	
	var checkObjectType = __webpack_require__(23);
	
	var MatreshkaError = __webpack_require__(24);
	
	var delegateListener = __webpack_require__(58);
	
	var addListener = __webpack_require__(56);
	
	var removeListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(22);
	
	var unbindNode = __webpack_require__(46);
	
	// The main method of the framework: binds a property of an object to HTML node
	module.exports = bindNode;
	function bindNode(object, key, node, binder, evt) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        evt = binder;
	        binder = node;
	        node = key;
	        key = object;
	        object = this;
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'bindNode');
	    }
	
	    evt = evt || {};
	    binder = binder || {};
	    var temporaryOptionalFlag = bindNode.temporaryOptionalFlag;
	
	    var _initMK = initMK(object);
	
	    var props = _initMK.props;
	    var _evt = evt;
	    var _evt$optional = _evt.optional;
	    var optional = _evt$optional === undefined ? temporaryOptionalFlag : _evt$optional;
	    var deep = _evt.deep;
	    var silent = _evt.silent;
	
	
	    delete bindNode.temporaryOptionalFlag;
	
	    // throw error when key is not given
	    if (!key) {
	        throw MatreshkaError('binding:falsy_key');
	    }
	
	    if (key instanceof Array) {
	        if (typeof key[0] === 'string') {
	            for (var _target = key, _index = 0, itemKey, _l = _target.length; itemKey = _target[_index], _index < _l; _index++) {
	                bindNode(object, itemKey, node, binder, evt)
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
	                        evt: evt,
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
	            evt: evt,
	            binder: binder,
	            propDef: propDef
	        })
	    }
	
	    return object;
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(19);
	
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(19);
	
	var set = __webpack_require__(21);
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(19);
	
	var triggerOne = __webpack_require__(22);
	
	var checkObjectType = __webpack_require__(23);
	
	var is = __webpack_require__(25);
	
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(19);
	
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var matreshkaError = __webpack_require__(24);
	
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
/* 24 */
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
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	/* eslint-disable no-self-compare, no-confusing-arrow */
	// determines whether two values are the same value
	var isPolyfill = function (v1, v2) {
	    return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
	};
	
	module.exports = Object.is || isPolyfill;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(27);
	
	var dom = __webpack_require__(29);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(19);
	
	var toArray = __webpack_require__(28);
	
	var dom = __webpack_require__(29);
	
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
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(30);
	
	var dom = {
	    $: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(31);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(32);
	
	var extend = __webpack_require__(34);
	
	var parseHTML = __webpack_require__(35);
	
	var one = __webpack_require__(36);
	
	var create = __webpack_require__(37);
	
	var on = __webpack_require__(38);
	
	var off = __webpack_require__(41);
	
	var is = __webpack_require__(40);
	
	var add = __webpack_require__(42);
	
	var not = __webpack_require__(43);
	
	var find = __webpack_require__(44);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(33);
	
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
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(33);
	
	var Init = __webpack_require__(32);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
	    return new Init(html2nodeList(html));
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(32);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
	    return new Init(s, context)[0];
	}

/***/ },
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(39);
	
	var is = __webpack_require__(40);
	
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
/* 39 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
	    nodeIndex: 0,
	    allEvents: {}
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
	    var node = this[0];
	    return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(39);
	
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(32);
	
	var data = __webpack_require__(39);
	
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(32);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(32);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var unbindNode = __webpack_require__(46);
	
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
	    var evt = _ref.evt;
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
	
	    bindNode(target, deepPath[deepPathLength - 1], $nodes, binder, evt);
	
	    // remove binding for previously used object
	    if (previousTarget && typeof previousTarget === 'object') {
	        unbindNode(previousTarget, deepPath[deepPathLength - 1], $nodes);
	    }
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(23);
	
	var defs = __webpack_require__(19);
	
	var getNodes = __webpack_require__(26);
	
	var bindNode = __webpack_require__(17);
	
	var undelegateListener = __webpack_require__(47);
	
	var removeBinding = __webpack_require__(49);
	
	var dom = __webpack_require__(29);
	
	module.exports = unbindNode;
	function unbindNode(object, key, node, evt) {
	    if (typeof this === 'object' && this.isMK) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        evt = node;
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
	                unbindNode(object, itemKey, node, evt)
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
	
	    evt = evt || {};
	
	    var _ref2 = evt || {};
	
	    var deep = _ref2.deep;
	
	    var def = defs.get(object);
	
	    if (!def) {
	        return object;
	    }
	
	    var props = def.props;
	
	    // allow to pass null or undefined as key
	    // if passed then remove bindings of all keys for given object
	
	    if (key === null || typeof key === 'undefined') {
	        for (var _target4 = props, _keys2 = Object.keys(_target4), _i2 = 0, key, propsItem, _l4 = _keys2.length; (key = _keys2[_i2], propsItem = _target4[key]), _i2 < _l4; _i2++) {
	            unbindNode(object, key, null, evt);
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
	
	            unbindNode(target, deepPath[deepPathLength - 1], node, evt);
	
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
	            removeBinding({ object: object, key: key, evt: evt }, binding);
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
	                removeBinding({ object: object, key: key, evt: evt }, binding);
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(19);
	
	var removeListener = __webpack_require__(48);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(19);
	
	var triggerOne = __webpack_require__(22);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var removeListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(22);
	
	var spaceReg = /\s+/;
	
	// the function removes single binding for single object
	// called by unbindNode
	module.exports = removeBinding;
	function removeBinding(_ref, _ref2) {
	    var object = _ref.object;
	    var key = _ref.key;
	    var evt = _ref.evt;
	    var options = _ref2.options;
	    var binder = _ref2.binder;
	    var node = _ref2.node;
	    var nodeHandler = _ref2.nodeHandler;
	    var objectHandler = _ref2.objectHandler;
	    var destroy = binder.destroy;
	    var on = binder.on;
	    var silent = evt.silent;
	
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
	
	        for (var _source2 = evt, _keys2 = Object.keys(_source2), _l3 = _keys2.length, _i2 = 0, _key2; _i2 < _l3; _i2++) {
	            _key2 = _keys2[_i2];
	            _result[_key2] = _source2[_key2];
	        }
	
	        var extendedEvt = _result;
	
	        triggerOne(object, 'unbind:' + key, extendedEvt);
	        triggerOne(object, 'unbind', extendedEvt);
	    }
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(51);
	
	var runNodeHandler = __webpack_require__(54);
	
	var runObjectHandler = __webpack_require__(55);
	
	var triggerOne = __webpack_require__(22);
	
	var addListener = __webpack_require__(56);
	
	var debounce = __webpack_require__(57);
	
	var set = __webpack_require__(21);
	
	var spaceReg = /\s+/;
	
	// handles binding for single property & node
	// the function is used at bindNode
	module.exports = bindSingleNode;
	function bindSingleNode(object, _ref) {
	    var givenBinder = _ref.binder;
	    var key = _ref.key;
	    var $nodes = _ref.$nodes;
	    var node = _ref.node;
	    var evt = _ref.evt;
	    var propDef = _ref.propDef;
	    var silent = evt.silent;
	    var assignDefaultValue = evt.assignDefaultValue;
	    var debounceOption = evt.debounce;
	    // create bindings array in property definition object
	
	    var bindings = propDef.bindings = propDef.bindings || []; // eslint-disable-line no-param-reassign
	    var value = propDef.value;
	
	    var options = {
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
	        initialize.call(node, options);
	    }
	
	    // calls getValue immediately and reassign a property
	    // when all required conditions are met for this
	    if (getValue && (isUndefined && assignDefaultValue !== false || assignDefaultValue === true)) {
	        value = getValue.call(node, options);
	        isUndefined = typeof value === 'undefined';
	
	        var _result2 = { fromNode: true };
	
	        for (var _source4 = evt, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
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
	                options: options,
	                evt: evt
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
	                    options: options
	                });
	            }
	        };
	
	        // TODO throw error when "on" and maybe other binder properties has wrong type
	        if (typeof on === 'function') {
	            on.call(node, nodeHandler, options);
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
	        options: options
	    });
	
	    // fire events
	    if (!silent) {
	        var _result3 = {
	            key: key,
	            node: node
	        };
	
	        for (var _source6 = evt, _keys6 = Object.keys(_source6), _l7 = _keys6.length, _i6 = 0, _key6; _i6 < _l7; _i6++) {
	            _key6 = _keys6[_i6];
	            _result3[_key6] = _source6[_key6];
	        }
	
	        var extendedEvt = _result3;
	
	        triggerOne(object, 'bind:' + key, extendedEvt);
	        triggerOne(object, 'bind', extendedEvt);
	    }
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(52);
	
	module.exports = function (node) {
	    var result = void 0;
	
	    for (var i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(10);
	
	var textarea = __webpack_require__(11);
	
	var select = __webpack_require__(12);
	
	var progress = __webpack_require__(13);
	
	var output = __webpack_require__(53);
	
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
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(25);
	
	var set = __webpack_require__(21);
	
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
	    var options = _ref.options;
	
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
	
	    for (var _source2 = options, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
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
	    var options = _ref.options;
	    var evt = _ref.evt;
	    var value = propDef.value;
	    var onChangeValue = evt.onChangeValue;
	    var changedNode = evt.changedNode;
	    var evtBinder = evt.binder;
	    var setValue = binder.setValue;
	    // dirty hack for https://github.com/matreshkajs/matreshka/issues/19
	
	    var dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? String(value) : value;
	
	    if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
	        return;
	    }
	
	    var _result = { value: value };
	
	    for (var _source2 = options, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	        _key2 = _keys2[_i2];
	        _result[_key2] = _source2[_key2];
	    }
	
	    setValue.call(node, value, _result);
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(18);
	
	var triggerOne = __webpack_require__(22);
	
	var defineProp = __webpack_require__(20);
	
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
	
	var undelegateListener = __webpack_require__(47);
	
	var triggerOne = __webpack_require__(22);
	
	var defs = __webpack_require__(19);
	
	var is = __webpack_require__(25);
	
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
	
	var bindNode = __webpack_require__(17);
	
	var bindOptionalNode = __webpack_require__(61);
	
	var bindSandbox = __webpack_require__(62);
	
	var unbindNode = __webpack_require__(46);
	
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
	
	var bindNode = __webpack_require__(17);
	
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
	
	var bindNode = __webpack_require__(17);
	
	var unbindNode = __webpack_require__(46);
	
	var checkObjectType = __webpack_require__(23);
	
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
	
	var defs = __webpack_require__(19);
	
	var dom = __webpack_require__(29);
	
	var selectNodes = __webpack_require__(27);
	
	var toArray = __webpack_require__(28);
	
	var checkObjectType = __webpack_require__(23);
	
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
	
	var defs = __webpack_require__(19);
	
	var dom = __webpack_require__(29);
	
	var selectNodes = __webpack_require__(27);
	
	var toArray = __webpack_require__(28);
	
	var checkObjectType = __webpack_require__(23);
	
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
	
	var lookForBinder = __webpack_require__(51);
	
	var bindNode = __webpack_require__(17);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	
	var $ = __webpack_require__(31);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	var $ = __webpack_require__(31);
	
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
	
	var extend = __webpack_require__(34);
	
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
	
	var undelegateListener = __webpack_require__(47);
	
	var triggerOne = __webpack_require__(22);
	
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
	
	var undelegateListener = __webpack_require__(47);
	
	var removeListener = __webpack_require__(48);
	
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
	
	var removeListener = __webpack_require__(48);
	
	var triggerOne = __webpack_require__(22);
	
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
		"./_bindings/bindsinglenode.js": 50,
		"./_bindings/getnodes.js": 26,
		"./_bindings/removebinding.js": 49,
		"./_bindings/runnodehandler.js": 54,
		"./_bindings/runobjecthandler.js": 55,
		"./_bindings/selectnodes.js": 27,
		"./_bindings/switchbinding.js": 45,
		"./_core/defineprop.js": 20,
		"./_core/defs.js": 19,
		"./_core/init.js": 18,
		"./_dom/default-dollar.js": 30,
		"./_dom/index.js": 29,
		"./_events/addlistener.js": 56,
		"./_events/delegatelistener.js": 58,
		"./_events/removelistener.js": 48,
		"./_events/triggerone.js": 22,
		"./_events/undelegatelistener.js": 47,
		"./_util/checkobjecttype.js": 23,
		"./_util/debounce.js": 57,
		"./_util/is.js": 25,
		"./_util/matreshkaerror.js": 24,
		"./_util/toarray.js": 28,
		"./array.js": 87,
		"./binders/_classlist.js": 7,
		"./binders/attr.js": 9,
		"./binders/classname.js": 6,
		"./binders/dataset.js": 16,
		"./binders/display.js": 5,
		"./binders/html.js": 4,
		"./binders/index.js": 3,
		"./binders/input.js": 10,
		"./binders/output.js": 53,
		"./binders/progress.js": 13,
		"./binders/prop.js": 8,
		"./binders/select.js": 12,
		"./binders/style.js": 15,
		"./binders/text.js": 14,
		"./binders/textarea.js": 11,
		"./bindnode.js": 17,
		"./bindoptionalnode.js": 61,
		"./bindsandbox.js": 62,
		"./bquery/_data.js": 39,
		"./bquery/_html2nodelist.js": 33,
		"./bquery/_init.js": 32,
		"./bquery/add.js": 42,
		"./bquery/create.js": 37,
		"./bquery/find.js": 44,
		"./bquery/index.js": 31,
		"./bquery/is.js": 40,
		"./bquery/not.js": 43,
		"./bquery/off.js": 41,
		"./bquery/on.js": 38,
		"./bquery/one.js": 36,
		"./bquery/parsehtml.js": 35,
		"./class.js": 79,
		"./defaultbinders.js": 52,
		"./extend.js": 34,
		"./index.js": 88,
		"./lookforbinder.js": 51,
		"./magic.js": 91,
		"./matreshka/index.js": 89,
		"./object/index.js": 90,
		"./on.js": 92,
		"./select.js": 63,
		"./selectall.js": 64,
		"./set.js": 21,
		"./unbindnode.js": 46
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
	
	var extend = __webpack_require__(34);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTllYjc1NTZkMzQyNTU2N2MxMWYiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRlcnNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9odG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9hdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL3RleHRhcmVhLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9wcm9ncmVzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy90ZXh0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL3N0eWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC90b2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3Mvc3dpdGNoYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9yZW1vdmViaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvb2tmb3JiaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRiaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL291dHB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3J1bm5vZGVoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRzYW5kYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL2NyZWF0ZXNweS5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYmluZGluZ3MvZGVmYXVsdF9iaW5kZXJzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjIC4qXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdHJlc2hrYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWdpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBLEtBQU0sMkJBQTJCLEVBQWpDOztBQUVBO0FBQ0E7QUFDQSxLQUFNLGVBQWUsc0JBQXJCOztBQUVBLFVBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN6QixTQUFPLHlCQUF5QixPQUF6QixDQUFpQyxJQUFqQyxLQUEwQyxDQUFqRDtBQUNBOztBQUVELEtBQUksV0FBVyxhQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FBMkIsVUFBM0IsQ0FBZjs7QUFFQTtBQUNBLEtBQUksQ0FBQyxTQUFTLE1BQWQsRUFBc0I7QUFDckIsYUFBVyxhQUFhLElBQWIsRUFBWDtBQUNBOztBQUVELFVBQVMsT0FBVCxDQUFpQixZQUFqQjs7QUFHQSxLQUFNLG9CQUFvQix1QkFBMUI7QUFDQSxtQkFBa0IsSUFBbEIsR0FBeUIsT0FBekIsQ0FBaUMsaUJBQWpDLEU7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHVEQUF1RDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O3VDQ3hCTyxD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O0FBQ2xCOztBQUVBLFdBQVUsS0FBVixHQUFrQixjQUFsQjtBQUNBLFdBQVUsTUFBVixHQUFtQixlQUFuQjtBQUNBLFdBQVUsS0FBVixHQUFrQixLQUFsQjtBQUNBOztrQkFFZSxTOzs7Ozs7OztrQ0NYSSxFOztpQ0FDRCxFOztrQkFFSCxNQUFNO0FBQ2pCOztBQURpQixFQUFOLEVBR1o7QUFDQztBQUNBO0FBRkQsRUFIWSxDOzs7Ozs7OztrQkNIQSxDOzs7Ozs7OztrQkNBQSxDOzs7Ozs7OztBQ0NmOztrQkFFd0IsRTtBQUFULFVBQVMsRUFBVCxHQUFjLENBRTVCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5OWViNzU1NmQzNDI1NTY3YzExZlxuICoqLyIsIi8vIFRoaXMgZ2V0cyByZXBsYWNlZCBieSBrYXJtYSB3ZWJwYWNrIHdpdGggdGhlIHVwZGF0ZWQgZmlsZXMgb24gcmVidWlsZFxuY29uc3QgX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fID0gW107XG5cbi8vIHJlcXVpcmUgYWxsIG1vZHVsZXMgZW5kaW5nIGluIFwiX3Rlc3RcIiBmcm9tIHRoZVxuLy8gY3VycmVudCBkaXJlY3RvcnkgYW5kIGFsbCBzdWJkaXJlY3Rvcmllc1xuY29uc3QgdGVzdHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuL3NwZWMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5cbmZ1bmN0aW9uIGluTWFuaWZlc3QocGF0aCkge1xuXHRyZXR1cm4gX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fLmluZGV4T2YocGF0aCkgPj0gMDtcbn1cblxubGV0IHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKS5maWx0ZXIoaW5NYW5pZmVzdCk7XG5cbi8vIFJ1biBhbGwgdGVzdHMgaWYgd2UgZGlkbid0IGZpbmQgYW55IGNoYW5nZXNcbmlmICghcnVubmFibGUubGVuZ3RoKSB7XG5cdHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKTtcbn1cblxucnVubmFibGUuZm9yRWFjaCh0ZXN0c0NvbnRleHQpO1xuXG5cbmNvbnN0IGNvbXBvbmVudHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuLi9zcmMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5jb21wb25lbnRzQ29udGV4dC5rZXlzKCkuZm9yRWFjaChjb21wb25lbnRzQ29udGV4dCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvaW5kZXguanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYmluZGluZ3MvYmluZGVyc19zcGVjLmpzXCI6IDIsXG5cdFwiLi9iaW5kaW5ncy9iaW5kaW5nc19wYXJzZXJfc3BlYy5qc1wiOiA1OSxcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogNjAsXG5cdFwiLi9iaW5kaW5ncy9kZWZhdWx0X2JpbmRlcnNfc3BlYy5qc1wiOiA2Nyxcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiA2OCxcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiA2OSxcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiA3MCxcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogNzIsXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDczLFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogNzQsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogNzUsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogNzYsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogNzcsXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDc4LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogODAsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogODEsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDgyLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogODMsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDg0LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogODVcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQge1xuXHRodG1sLFxuXHR0ZXh0LFxuXHRwcm9wLFxuXHRhdHRyLFxuXHRjbGFzc05hbWUsXG5cdGRhdGFzZXQsXG5cdHN0eWxlLFxuXHRkaXNwbGF5XG59IGZyb20gJ3NyYy9iaW5kZXJzJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuXG5kZXNjcmliZSgnQmluZGVycycsICgpID0+IHtcblx0Y29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuXHRjb25zdCBkYXRhc2V0SXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5kYXRhc2V0ID8gaXQgOiB4aXQ7XG5cdGxldCBvYmo7XG5cdGxldCBub2RlO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgcHJvcCcsICgpID0+IHtcblx0XHRub2RlLnNvbWVQcm9wID0gJ2Zvbyc7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHByb3AoJ3NvbWVQcm9wJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUuc29tZVByb3ApLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgYXR0cicsICgpID0+IHtcblx0XHRub2RlLnNldEF0dHJpYnV0ZSgnc29tZS1hdHRyaWJ1dGUnLCAnZm9vJyk7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGF0dHIoJ3NvbWVQcm9wJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJykpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUuc2V0QXR0cmlidXRlKCdzb21lLWF0dHJpYnV0ZScsICdiYXInKTtcblx0XHRleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ3NvbWUtYXR0cmlidXRlJykpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgaHRtbCcsICgpID0+IHtcblx0XHRub2RlLmlubmVySFRNTCA9ICc8aT5mb288L2k+Jztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgaHRtbCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCc8aT5mb288L2k+Jyk7XG5cdFx0b2JqLnggPSAnPGI+YmFyPC9iPic7XG5cdFx0ZXhwZWN0KG5vZGUuaW5uZXJIVE1MKS50b0VxdWFsKCc8Yj5iYXI8L2I+Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCB0ZXh0JywgKCkgPT4ge1xuXHRcdG5vZGUudGV4dENvbnRlbnQgPSAnPGk+Zm9vPC9pPic7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHRleHQoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnPGk+Zm9vPC9pPicpO1xuXHRcdG9iai54ID0gJzxiPmJhcjwvYj4nO1xuXHRcdGV4cGVjdChub2RlLnRleHRDb250ZW50KS50b0VxdWFsKCc8Yj5iYXI8L2I+Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBzdHlsZScsICgpID0+IHtcblx0XHRub2RlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBzdHlsZSgndGV4dEFsaWduJyksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2NlbnRlcicpO1xuXHRcdG9iai54ID0gJ3JpZ2h0Jztcblx0XHRleHBlY3Qobm9kZS5zdHlsZS50ZXh0QWxpZ24pLnRvRXF1YWwoJ3JpZ2h0Jyk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBkaXNwbGF5JywgKCkgPT4ge1xuXHRcdG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBkaXNwbGF5KHRydWUpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKGZhbHNlKTtcblx0XHRvYmoueCA9IHRydWU7XG5cdFx0ZXhwZWN0KG5vZGUuc3R5bGUuZGlzcGxheSkudG9FcXVhbCgnJyk7XG5cblx0XHRub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblx0XHRiaW5kTm9kZShvYmosICd5Jywgbm9kZSwgZGlzcGxheShmYWxzZSksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLnkpLnRvRXF1YWwodHJ1ZSk7XG5cdFx0b2JqLnkgPSBmYWxzZTtcblx0XHRleHBlY3Qobm9kZS5zdHlsZS5kaXNwbGF5KS50b0VxdWFsKCcnKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGNsYXNzTmFtZScsICgpID0+IHtcblx0XHQvLyBASUU5XG5cdFx0bm9kZS5jbGFzc05hbWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgY2xhc3NOYW1lKCdmb28nKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCh0cnVlKTtcblx0XHRvYmoueCA9IGZhbHNlO1xuXHRcdGV4cGVjdChub2RlLmNsYXNzTmFtZSkudG9FcXVhbCgnJyk7XG5cblx0XHRub2RlLmNsYXNzTmFtZSA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBjbGFzc05hbWUoJ2ZvbycsIGZhbHNlKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbChmYWxzZSk7XG5cdFx0b2JqLnggPSB0cnVlO1xuXHRcdGV4cGVjdChub2RlLmNsYXNzTmFtZSkudG9FcXVhbCgnJyk7XG5cdH0pO1xuXG5cdGRhdGFzZXRJdCgnc2hvdWxkIGJpbmQgZGF0YXNldCcsICgpID0+IHtcblx0XHQvLyBASUU5XG5cdFx0bm9kZS5kYXRhc2V0LmZvbyA9ICdiYXInO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBkYXRhc2V0KCdmb28nKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG5cdFx0b2JqLnggPSAnYmF6Jztcblx0XHRleHBlY3Qobm9kZS5kYXRhc2V0LmZvbykudG9FcXVhbCgnYmF6Jyk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kZXJzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaHRtbCBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBjbGFzc05hbWUgZnJvbSAnLi9jbGFzc25hbWUnO1xuaW1wb3J0IHByb3AgZnJvbSAnLi9wcm9wJztcbmltcG9ydCBhdHRyIGZyb20gJy4vYXR0cic7XG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgb3V0cHV0IGZyb20gJy4vb3V0cHV0JztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL3RleHRhcmVhJztcbmltcG9ydCBzZWxlY3QgZnJvbSAnLi9zZWxlY3QnO1xuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xuaW1wb3J0IHRleHQgZnJvbSAnLi90ZXh0JztcbmltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlJztcbmltcG9ydCBkYXRhc2V0IGZyb20gJy4vZGF0YXNldCc7XG5cbmV4cG9ydCB7XG4gICAgaHRtbCxcbiAgICBkaXNwbGF5LFxuICAgIGNsYXNzTmFtZSxcbiAgICBwcm9wLFxuICAgIGF0dHIsXG4gICAgaW5wdXQsXG4gICAgb3V0cHV0LFxuICAgIHRleHRhcmVhLFxuICAgIHNlbGVjdCxcbiAgICBwcm9ncmVzcyxcbiAgICB0ZXh0LFxuICAgIHN0eWxlLFxuICAgIGRhdGFzZXRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbCgpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogJ2lucHV0JywgLy8gdGhlIGV2ZW50IG5hbWUgZmlyZXMgb25seSBpbiBjb250ZW50ZWRpdGFibGUgbW9kZVxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5uZXJIVE1MO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gYCR7dmFsdWV9YDtcblx0XHR9XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvaHRtbC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BsYXkoc3dpdGNoZXI9dHJ1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdHlsZS5kaXNwbGF5XG4gICAgICAgICAgICAgICAgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcykuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpO1xuICAgICAgICAgICAgY29uc3Qgbm9uZSA9IHZhbHVlID09PSAnbm9uZSc7XG4gICAgICAgICAgICByZXR1cm4gc3dpdGNoZXIgPyAhbm9uZSA6IG5vbmU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYoc3dpdGNoZXIpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvZGlzcGxheS5qc1xuICoqLyIsImltcG9ydCB7XG4gICAgdG9nZ2xlLFxuICAgIGNvbnRhaW5zXG59IGZyb20gJy4vX2NsYXNzbGlzdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYXNzTmFtZShjbGFzc05hbWUsIHN3aXRjaGVyPXRydWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbnRhaW5zKHRoaXMsIGNsYXNzTmFtZSk7XG5cdFx0XHRyZXR1cm4gc3dpdGNoZXIgPyB2YWx1ZSA6ICF2YWx1ZTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlKHRoaXMsIGNsYXNzTmFtZSwgc3dpdGNoZXIgPyAhIXZhbHVlIDogIXZhbHVlKVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzXG4gKiovIiwiLy8gQElFOVxuXG5sZXQgYWRkO1xubGV0IHJlbW92ZTtcbmxldCBjb250YWlucztcblxuaWYoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuY2xhc3NMaXN0KSB7XG4gICAgYWRkID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICByZW1vdmUgPSAobm9kZSwgbmFtZSkgPT4gbm9kZS5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgIGNvbnRhaW5zID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xufSBlbHNlIHtcbiAgICBhZGQgPSAobm9kZSwgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiICsgbmFtZSArIFwiKFxcXFxzfCQpXCIsIFwiZ1wiKTtcblx0XHRpZiAoIXJlLnRlc3Qobm9kZS5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IChub2RlLmNsYXNzTmFtZSArIFwiIFwiICsgbmFtZSkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikucmVwbGFjZSgvKF4gfCAkKS9nLCBcIlwiKTtcbiAgICAgICAgfVxuXHR9XG5cblx0cmVtb3ZlID0gKG5vZGUsIG5hbWUpID0+IHtcblx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIGMgKyBcIihcXFxcc3wkKVwiLCBcImdcIik7XG5cdFx0bm9kZS5jbGFzc05hbWUgPSBub2RlLmNsYXNzTmFtZS5yZXBsYWNlKHJlLCBcIiQxXCIpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyheIHwgJCkvZywgXCJcIik7XG5cdH1cblxuXHRjb250YWlucyA9IChub2RlLCBjKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBuYW1lICsgJyhcXFxcc3wkKScpLnRlc3Qobm9kZS5jbGFzc05hbWUpO1xuXHR9XG59XG5cbmNvbnN0IHRvZ2dsZSA9IChub2RlLCBuYW1lLCBzd2l0Y2hlcikgPT4ge1xuICAgIGlmKHN3aXRjaGVyKSB7XG4gICAgICAgIGFkZChub2RlLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUobm9kZSwgbmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIHRvZ2dsZSxcbiAgICBjb250YWluc1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9fY2xhc3NsaXN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzW3Byb3BlcnR5TmFtZV07XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0Ly8gaW4gY2FzZSB3aGVuIHlvdSdyZSB0cnlpbmcgdG8gc2V0IHJlYWQtb25seSBwcm9wZXJ0eVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG5cdFx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdH1cblx0fTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3Byb3AuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhdHRyKGF0dHJpYnV0ZU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIHZhbHVlKTtcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2F0dHIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnB1dCh0eXBlKSB7XG4gICAgbGV0IG9uO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnICYmIHRoaXMudmFsdWUgPT0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIGNhc2UgJ2hpZGRlbic6XG4gICAgICAgICAgICBvbiA9IG51bGw7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICBvbiA9ICdjaGFuZ2UnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XG4gICAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICBjYXNlICd0ZWwnOlxuICAgICAgICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzogKi9cbiAgICAgICAgZGVmYXVsdDogLy8gb3RoZXIgZnV0dXJlIChIVE1MNispIGlucHV0c1xuICAgICAgICAgICAgb24gPSAnaW5wdXQnO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBvbixcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2lucHV0LmpzXG4gKiovIiwiaW1wb3J0IGlucHV0IGZyb20gJy4vaW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0ZXh0YXJlYSgpIHtcblx0cmV0dXJuIGlucHV0KCd0ZXh0Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3RleHRhcmVhLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0KG11bHRpcGxlKSB7XG4gICAgaWYgKG11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbjogJ2NoYW5nZScsXG4gICAgICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgb3B0aW9ucy5sZW5ndGggPiBpOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnNbaV0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRWYWx1ZShnaXZlblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdHlwZW9mIGdpdmVuVmFsdWUgPT09ICdzdHJpbmcnID8gW2dpdmVuVmFsdWVdIDogZ2l2ZW5WYWx1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb3B0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiAnY2hhbmdlJyxcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gb3B0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNbaV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9zZWxlY3QuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuXHRyZXR1cm4gaW5wdXQoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogJ2lucHV0JywgLy8gdGhlIGV2ZW50IG5hbWUgZmlyZXMgb25seSBpbiBjb250ZW50ZWRpdGFibGUgbW9kZVxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMudGV4dENvbnRlbnQ7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dGhpcy50ZXh0Q29udGVudCA9IGAke3ZhbHVlfWA7XG5cdFx0fVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy90ZXh0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3R5bGUocHJvcGVydHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogbnVsbCxcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGVbcHJvcGVydHldXG4gICAgICAgICAgICAgICAgfHwgd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcykuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3N0eWxlLmpzXG4gKiovIiwiLy8gcmVwbGFjZSBuYW1lc0xpa2VUaGlzIHdpdGggbmFtZXMtbGlrZS10aGlzXG5jb25zdCB0b0Rhc2hlZCA9IChuYW1lKSA9PiB7XG4gICAgcmV0dXJuICdkYXRhLScgKyBuYW1lLnJlcGxhY2UoLyhbQS1aXSkvZywgKHUpID0+IFwiLVwiICsgdS50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YXNldChwcm9wKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRpZih0aGlzLmRhdGFzZXQpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFzZXRbcHJvcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSh0b0Rhc2hlZChwcm9wKSk7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMuZGF0YXNldCkge1xuXHRcdFx0XHR0aGlzLmRhdGFzZXRbcHJvcF0gPSB2YWx1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cmlidXRlKHRvRGFzaGVkKHByb3ApLCB2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9kYXRhc2V0LmpzXG4gKiovIiwiaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgc3dpdGNoQmluZGluZyBmcm9tICcuL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnO1xuXG4vLyBUaGUgbWFpbiBtZXRob2Qgb2YgdGhlIGZyYW1ld29yazogYmluZHMgYSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgdG8gSFRNTCBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZSwgYmluZGVyLCBldnQpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSBiaW5kZXI7XG4gICAgICAgIGJpbmRlciA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBrZXk7XG4gICAgICAgIGtleSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdiaW5kTm9kZScpO1xuICAgIH1cblxuICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICBiaW5kZXIgPSBiaW5kZXIgfHwge307XG4gICAgY29uc3QgeyB0ZW1wb3JhcnlPcHRpb25hbEZsYWcgfSA9IGJpbmROb2RlO1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IHsgb3B0aW9uYWw9dGVtcG9yYXJ5T3B0aW9uYWxGbGFnLCBkZWVwLCBzaWxlbnQgfSA9IGV2dDtcblxuICAgIGRlbGV0ZSBiaW5kTm9kZS50ZW1wb3JhcnlPcHRpb25hbEZsYWc7XG5cbiAgICAvLyB0aHJvdyBlcnJvciB3aGVuIGtleSBpcyBub3QgZ2l2ZW5cbiAgICBpZigha2V5KSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmZhbHN5X2tleScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiBiaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGJpbmRlciwgZXZ0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoW3trZXksIG5vZGUsIGJpbmRlciwgZXZlbnR9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlLFxuICAgICAgICAgICAgICAgIGJpbmRlcjogaXRlbUJpbmRlcixcbiAgICAgICAgICAgICAgICBldmVudDogaXRlbUV2ZW50XG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnQgPSBub2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50ID0ge307XG5cblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBpdGVtRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNvbW1vbkV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJnbG9iYWxcIiBldmVudFxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgY29tbW9uRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIC8vIGNoZWNrIG5vZGUgZXhpc3RlbmNlXG4gICAgaWYgKCEkbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOm5vZGVfbWlzc2luZycsIHsga2V5LCBub2RlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlZXAgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG4gICAgICAgIGlmIChkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIC8vIGhhbmRsZSBiaW5kaW5nIHdoZW4ga2V5IGFyZyBpbmNsdWRlcyBkb3RzIChlZyBcImEuYi5jLmRcIilcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZUhhbmRsZXIgPSAoY2hhbmdlRXZ0ID0ge30pID0+IHN3aXRjaEJpbmRpbmcoe1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VFdnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgZGVlcFBhdGgsXG4gICAgICAgICAgICAgICAgICAgICRub2RlcyxcbiAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBldnQsXG4gICAgICAgICAgICAgICAgICAgIGJpbmROb2RlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpLFxuICAgICAgICAgICAgICAgIGBfY2hhbmdlOnRyZWU6JHtkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDJdfWAsIGNoYW5nZUhhbmRsZXIpO1xuXG4gICAgICAgICAgICBjaGFuZ2VIYW5kbGVyKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm9wRGVmID0gZGVmaW5lUHJvcChvYmplY3QsIGtleSk7XG5cbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgLy8gaWYgb2JqZWN0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSB0aGVuIGV4dGVuZCBcIiRub2Rlc1wiIGFuZCBcIm5vZGVzXCIgb2JqZWN0c1xuICAgICAgICBjb25zdCB7ICRub2RlczogJGFsbE5vZGVzLCBub2RlczogYWxsTm9kZXMgfSA9IG9iamVjdDtcblxuICAgICAgICBpZighJGFsbE5vZGVzIHx8ICFhbGxOb2Rlcykge1xuICAgICAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6aW5zdGFuY2Vfbm9kZXNfbWlzc2luZycsIHtcbiAgICAgICAgICAgICAgICAkbm9kZXM6ICRhbGxOb2RlcyxcbiAgICAgICAgICAgICAgICBub2RlczogYWxsTm9kZXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgJGFsbE5vZGVzW2tleV0gPSAkYWxsTm9kZXNba2V5XSAmJiAkYWxsTm9kZXNba2V5XS5sZW5ndGhcbiAgICAgICAgICAgID8gJGFsbE5vZGVzW2tleV0uYWRkKCRub2RlcylcbiAgICAgICAgICAgIDogJG5vZGVzO1xuXG4gICAgICAgIGFsbE5vZGVzW2tleV0gPSAkYWxsTm9kZXNba2V5XVswXTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgYmluZGluZyBmb3IgZXZlcnkgbm9kZSBzZXBhcmF0ZWx5XG4gICAgbm9mbi5mb3JFYWNoKCRub2RlcywgKG5vZGUpID0+IGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGtleSxcbiAgICAgICAgZXZ0LFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIHByb3BEZWZcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG5vZGUuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuXG4vLyB0aGlzIGlzIGNvbW1vbiBmdW5jdGlvbiB3aGljaCBhc3NvY2lhdGVzIGFuIG9iamVjdCB3aXRoIGl0cyBNYXRyZXNoa2EgZGVmaW5pdGlvblxuZnVuY3Rpb24gY29tbW9uSW5pdChvYmplY3QpIHtcbiAgICBsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcbiAgICBpZiAoIWRlZikge1xuICAgICAgICBkZWYgPSB7XG4gICAgICAgICAgICAvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuICAgICAgICAgICAgLy8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcbiAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIC8qIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICBjdHg6IG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDogb2JqZWN0MixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJleGFtcGxlXCIsXG5cdFx0XHRcdFx0aW5mbzoge31cbiAgICAgICAgICAgICAgICB9ICovXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG4gICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgIC8qIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgICAgICAgICBnZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHNldHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbWVkaWF0b3I6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGJpbmRpbmdzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVIYW5kbGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0SGFuZGxlcixcblx0XHRcdFx0XHRcdC4uLm90aGVyIHJlcXVpcmVkIGluZm9cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpZDogYG1rJHtNYXRoLnJhbmRvbSgpfWBcbiAgICAgICAgfTtcblxuICAgICAgICBkZWZzLnNldChvYmplY3QsIGRlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5pdE1LKG9iamVjdCkge1xuICAgIGNvbnN0IHR5cGUgPSB0eXBlb2Ygb2JqZWN0O1xuICAgIGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0Ly8gVE9ETyB0aHJvdyBtYXRyZXNoa2FFcnJvclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3R5cGV9IGNhbm5vdCBiZSB1c2VkIGluIHRoaXMgbWV0aG9kYCk7XG4gICAgfVxuXG4gICAgLy8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG4gICAgLy8gZWxzZSBydW4gY29tbW9uSW5pdFxuICAgIC8vIGV2ZXJ5IF9pbml0TUsgaW1wbGVtZW50YXRpb24gaGF2ZSB0byBydW4gY29tbW9uSW5pdCBvciBwYXJlbnQncyBfaW5pdE1LXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgIHJldHVybiBvYmplY3QuX2luaXRNYXRyZXNoa2EgPyBvYmplY3QuX2luaXRNYXRyZXNoa2EoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcbiAgICBnZXQob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcbiAgICB9LFxuICAgIHNldChvYmosIGRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgJ21hdHJlc2hrYURhdGEnLCB7XG4gICAgICAgICAgICB2YWx1ZTogZGF0YSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGhhcyhvYmopIHtcbiAgICAgICAgcmV0dXJuICdtYXRyZXNoa2FEYXRhJyBpbiBvYmo7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IG5ldyBQc2V1ZG9NYXAoKSA6IG5ldyBXZWFrTWFwKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9kZWZzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhlIGZ1bmN0aW9uIGRlZmluZXMgbmVlZGVkIGRlc2NyaXB0b3IgZm9yIGdpdmVuIHByb3BlcnR5IFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmaW5lUHJvcChvYmplY3QsIGtleSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFkZWYucHJvcHNba2V5XSkge1xuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzW2tleV0gPSB7XG4gICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV0sXG4gICAgICAgICAgICBnZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICBzZXR0ZXI6IG51bGwsXG4gICAgICAgICAgICBtZWRpYXRvcjogbnVsbCxcbiAgICAgICAgICAgIGJpbmRpbmdzOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5nZXR0ZXIgPyBwcm9wRGVmLmdldHRlci5jYWxsKG9iamVjdCkgOiBwcm9wRGVmLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCh2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuc2V0dGVyID8gcHJvcERlZi5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogc2V0KG9iamVjdCwga2V5LCB2LCB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21TZXR0ZXI6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlZi5wcm9wc1trZXldO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpcyBmcm9tICcuL191dGlsL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIHNldHMgbmV3IHZhbHVlIGZvciBhIHByb3BlcnR5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZXQnKTtcblxuICAgIC8vIGlmIG5vIGtleSBvciBmYWxzeSBrZXkgaXMgZ2l2ZW5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiB0aGVuIG1ha2Ugc2ltcGxlIGFzc2lnbm1lbnRcbiAgICBpZiAoIWRlZikge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMsIGV2ZW50cyB9ID0gZGVmO1xuICAgIGNvbnN0IHByb3BEZWYgPSBwcm9wc1trZXldO1xuXG4gICAgLy8gYWxsb3cgdG8gdXNlIGtleS12YWx1ZSBvYmplY3QgYXMgYW5vdGhlciB2YXJpYXRpb25cbiAgICBpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChvYmpWYWwsIG9iaktleSkgPT4gc2V0KG9iamVjdCwgb2JqS2V5LCBvYmpWYWwsIHZhbHVlKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gcHJvcGVydHkgZGVmaW5pdGlvbiB0aGVuIG1ha2Ugc2ltcGxlIGFzc2lnbm1lbnRcbiAgICBpZiAoIXByb3BEZWYpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHZhbHVlOiBwcmV2aW91c1ZhbHVlLCBtZWRpYXRvciB9ID0gcHJvcERlZjtcblxuICAgIC8vIHBvc3NpYmxlIGZsYWdzXG4gICAgY29uc3Qge1xuICAgICAgICBza2lwTWVkaWF0b3IsXG4gICAgICAgIGZyb21NZWRpYXRvcixcbiAgICAgICAgZm9yY2UsXG4gICAgICAgIGZvcmNlSFRNTCxcbiAgICAgICAgc2lsZW50LFxuICAgICAgICBzaWxlbnRIVE1MLFxuICAgICAgICBza2lwTGlua3NcbiAgICB9ID0gZXZ0O1xuXG4gICAgbGV0IG5ld1ZhbHVlO1xuXG4gICAgaWYgKG1lZGlhdG9yICYmICFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkgJiYgIXNraXBNZWRpYXRvciAmJiAhZnJvbU1lZGlhdG9yKSB7XG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgbmV3VmFsdWUgPSBzcGVjaWFsLm1lZGlhdG9yKHYsIHByZXZWYWwsIGtleSwgb2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGNvbnN0IGlzQ2hhbmdlZCA9ICFpcyhuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cbiAgICAvLyBhZGQgdG8gZXZ0IG9iamVjdCBzb21lIHVzZWZ1bCBwcm9wZXJ0aWVzXG4gICAgY29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgIHZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgc2VsZjogb2JqZWN0LFxuICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICBrZXksXG4gICAgICAgIGlzQ2hhbmdlZFxuICAgIH0sIGV2dCk7XG5cbiAgICBjb25zdCB0cmlnZ2VyQ2hhbmdlID0gKGlzQ2hhbmdlZCB8fCBmb3JjZSkgJiYgIXNpbGVudDtcblxuICAgIC8vIHRyaWdnZXIgYmVmb3JlY2hhbmdlOktFWSBhbmQgYmVmb3JlY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZVN0ciA9ICdiZWZvcmVjaGFuZ2UnO1xuICAgICAgICBjb25zdCBiZWZvcmVjaGFuZ2VFdnROYW1lID0gYCR7YmVmb3JlY2hhbmdlU3RyfToke2tleX1gO1xuXG4gICAgICAgIGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VTdHJdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9wRGVmLnZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAvLyB0cmlnZXIgYmluZGluZ3NcbiAgICBpZiAoIXNpbGVudEhUTUwgJiYgKGlzQ2hhbmdlZCB8fCBmb3JjZSB8fCBmb3JjZUhUTUwpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSA9IGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VCaW5kaW5nc0V2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlQmluZGluZ3NFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIGNoYW5nZTpLRVkgYW5kIGNoYW5nZSBldmVudHNcbiAgICBpZiAodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VTdHIgPSAnY2hhbmdlJztcbiAgICAgICAgY29uc3QgY2hhbmdlRXZ0TmFtZSA9IGAke2NoYW5nZVN0cn06JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgZGVwZW5kZW5jaWVzIChtYWRlIHdpdGggbGlua1Byb3BzKVxuICAgIGlmICgoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2tpcExpbmtzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlcHNFdnROYW1lID0gYF9jaGFuZ2U6ZGVwczoke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlRGVwc0V2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVwc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgZGVsZWdhdGVkIGV2ZW50cyBsb2dpY1xuICAgIGlmKGlzQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGlmIChldmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2V0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCBldmVudHMgPSBkZWYuZXZlbnRzW25hbWVdO1xuXG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgICBjb25zdCBhcmdzID0gbm9mbi5zbGljZShhcmd1bWVudHMsIDIpO1xuICAgICAgICBjb25zdCBsID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgW2ExLCBhMl0gPSBhcmdzO1xuXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGV2O1xuXG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suYXBwbHkoZXYuY3R4LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuXG50cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0ge1xuICAgIGluZm86IHt9LFxuICAgIG5hbWU6IG51bGxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUuanNcbiAqKi8iLCJpbXBvcnQgbWF0cmVzaGthRXJyb3IgZnJvbSAnLi9tYXRyZXNoa2FlcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9iamVjdCwgbWV0aG9kKSB7XG4gICAgY29uc3QgdHlwZW9mT2JqZWN0ID0gb2JqZWN0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIG9iamVjdDtcblxuICAgIGlmICh0eXBlb2ZPYmplY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG1hdHJlc2hrYUVycm9yKCdjb21tb246b2JqZWN0X3R5cGUnLCB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlb2ZPYmplY3QsXG4gICAgICAgICAgICBtZXRob2RcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzXG4gKiovIiwiY29uc3QgYmluZGluZ0Vycm9yUHJlZml4ID0gJ0JpbmRpbmcgZXJyb3I6JztcblxuY29uc3QgZXJyb3JzID0ge1xuICAgICdiaW5kaW5nOm5vZGVfbWlzc2luZyc6ICh7IGtleSwgbm9kZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ySW5mbyA9IHR5cGVvZiBub2RlID09PSAnc3RyaW5nJyA/IGAgVGhlIHNlbGVjdG9yIGlzICR7bm9kZX1gIDogJyc7XG4gICAgICAgIHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IG5vZGUgaXMgbWlzc2luZyBmb3IgJHtrZXl9LiR7c2VsZWN0b3JJbmZvfWA7XG4gICAgfSxcbiAgICAnYmluZGluZzpmYWxzeV9rZXknOiAoKSA9PiAnQmluZGluZyBlcnJvcjogXCJrZXlcIiBhcmcgY2Fubm90IGJlIGZhbHN5JyxcbiAgICAnYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJzogKHsgJG5vZGVzIH0pID0+IHtcbiAgICAgICAgY29uc3QgbWlzc2luZyA9ICEkbm9kZXMgPyAnJG5vZGVzJyA6ICdub2Rlcyc7XG4gICAgICAgIHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IFwiJHttaXNzaW5nfVwiIHByb3BlcnR5IG9mIE1hdHJlc2hrYSBpbnN0YW5jZSBpcyBtaXNzaW5nLiBgXG4gICAgICAgICAgICArICdJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgbXVzdCBub3QgYmUgcmVhc3NpZ25lZC4nO1xuICAgIH0sXG4gICAgJ2NvbW1vbjpvYmplY3RfdHlwZSc6ICh7IHR5cGUsIG1ldGhvZCB9KSA9PlxuICAgICAgICBgTWV0aG9kIFwiJHttZXRob2R9XCIgZG9lcyBub3QgYWNjZXB0ICR7dHlwZX0gYXMgdGFyZ2V0IG9iamVjdGBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1hdHJlc2hrYUVycm9yKGtleSwgZGF0YSkge1xuICAgIGNvbnN0IGdldEVycm9yID0gZXJyb3JzW2tleV07XG4gICAgaWYgKCFnZXRFcnJvcikge1xuICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBlcnJvciBcIiR7a2V5fVwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcnNba2V5XShkYXRhKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSwgbm8tY29uZnVzaW5nLWFycm93ICovXG4vLyBkZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWVcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9pcy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuY29uc3QgaHRtbFJlZyA9IC88LztcbmNvbnN0IGN1c3RvbVNlbGVjdG9yUmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG4vLyBUT0RPIHdyaXRlIGRlc2NyaXB0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlcyhvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgbGV0IG5vZGVzO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhaHRtbFJlZy50ZXN0KHNlbGVjdG9yKSAmJiBjdXN0b21TZWxlY3RvclJlZy50ZXN0KHNlbGVjdG9yKSkge1xuICAgICAgICBub2RlcyA9IHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBub2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi4vX3V0aWwvdG9hcnJheSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclJlZyA9IC9cXHMqOmJvdW5kXFwoKFteKF0qKVxcKVxccyooW1xcU1xcc10qKVxccyp8XFxzKjpzYW5kYm94XFxzKihbXFxTXFxzXSopXFxzKi87XG5cbi8vIFRPRE8gYWRkIGRlc2NyaXB0aW9uXG4vLyBUT0RPIHRoaXMgZnVuY3Rpb24gbG9va3Mgbm90IGdvb2QsIGl0IG5lZWRzIHRvIGJlIHJlZmFjdG9yZWQgYW5kIGFjY2VsZXJhdGVkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIGdpdmVuU2VsZWN0b3IpIHtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGdpdmVuU2VsZWN0b3Iuc3BsaXQoJywnKTtcbiAgICBsZXQgcmVzdWx0ID0gZG9tLiQoKTtcblxuICAgIG5vZm4uZm9yRWFjaChzZWxlY3RvcnMsIHNlbGVjdG9yID0+IHtcbiAgICAgICAgY29uc3QgZXhlY1Jlc3VsdCA9IGN1c3RvbVNlbGVjdG9yUmVnLmV4ZWMoc2VsZWN0b3IpO1xuICAgICAgICBpZihleGVjUmVzdWx0KSB7XG4gICAgICAgICAgICBjb25zdCBib3VuZEtleSA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/ICdzYW5kYm94JyA6IGV4ZWNSZXN1bHRbMV07XG4gICAgICAgICAgICBjb25zdCBzdWJTZWxlY3RvciA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/IGV4ZWNSZXN1bHRbM10gOiBleGVjUmVzdWx0WzJdO1xuICAgICAgICAgICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2JvdW5kS2V5XTtcblxuICAgICAgICAgICAgaWYocHJvcERlZikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG4gICAgICAgICAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYm91bmROb2RlcyA9IEFycmF5KGJpbmRpbmdzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKGJpbmRpbmcsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kTm9kZXNbaV0gPSBiaW5kaW5nLm5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpIC5teS1zZWxlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGNvbnRhaW5zIGNoaWxkcmVuIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJTZWxlY3Rvci5pbmRleE9mKCc+JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWxlY3RpbmcgY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tQXR0ciA9IGBtJHtNYXRoLnJhbmRvbSgpfWAucmVwbGFjZSgnLicsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tQXR0ciwgcmFuZG9tQXR0cik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKGBbJHtyYW5kb21BdHRyfT1cIiR7cmFuZG9tQXR0cn1cIl0gJHtzdWJTZWxlY3Rvcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKHJhbmRvbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goYm91bmROb2RlcywgKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc3ViU2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmcganVzdCBhZGQgYm91bmQgbm9kZXMgdG8gcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGJvdW5kTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3IgKG5vIGN1c3RvbSB0aGluZ3MpXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0LCBzdGFydCkge1xuXHR2YXIgYXJyYXkgPSBbXSxcblx0XHRsID0gb2JqZWN0Lmxlbmd0aCxcblx0XHRpO1xuXG5cdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblxuXHRmb3IgKGkgPSBzdGFydDsgaSA8IGw7IGkrKykge1xuXHRcdGFycmF5W2kgLSBzdGFydF0gPSBvYmplY3RbaV07XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC90b2FycmF5LmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcbiAgICAkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuICAgIGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcbiAgICAgICAgICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcbiAgICAgICAgZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG4gICAgfVxufSBlbHNlIHtcbiAgICB1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG4gICAgZm46IEluaXQucHJvdG90eXBlLFxuICAgIGV4dGVuZCxcbiAgICBwYXJzZUhUTUwsXG4gICAgb25lLFxuICAgIGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBpcyxcbiAgICBhZGQsXG4gICAgbm90LFxuICAgIGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChnaXZlbkhUTUwpIHtcbiAgICAvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG4gICAgY29uc3Qgd3JhcE1hcCA9IHtcbiAgICAgICAgb3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcbiAgICAgICAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgICAgICAgdGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICAgICAgICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gICAgICAgIHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgY29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcbiAgICAgICAgYXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcbiAgICAgICAgXzogWzAsICcnLCAnJ11cbiAgICB9O1xuXG4gICAgY29uc3QgaHRtbCA9IGdpdmVuSFRNTC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaTtcblxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcbiAgICB3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuICAgIHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG4gICAgY29uc3QgZXggPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZXggJiYgd3JhcE1hcFtleFsxXV0gfHwgd3JhcE1hcC5fO1xuXG4gICAgbm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cbiAgICBpID0gd3JhcHBlclswXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBuZXcgSW5pdChodG1sMm5vZGVMaXN0KGh0bWwpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiBtYXRjaGVkIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25lKHMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbi8vIFRPRE8gZ2V0IHJpZCBvZiBpdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiB0YWdOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwcm9wcyA9IHRhZ05hbWU7XG4gICAgICAgIHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihlbFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSAhPT0gJ3RhZ05hbWUnKSB7XG4gICAgICAgICAgICAgICAgZWxba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCByYW5kb21JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICd4Jyk7XG4gICAgY29uc3Qgc2NvcGVTZWxlY3RvciA9IGBbJHtyYW5kb21JRH09XCIke3JhbmRvbUlEfVwiXSBgO1xuICAgIGNvbnN0IHNwbGl0dGVkU2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuXG4gICAgbGV0IG1hdGNoaW5nID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcbiAgICAgICAgbWF0Y2hpbmcgKz0gYCR7aSA9PT0gMCA/ICcnIDogJywnfSR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0sJHtzY29wZVNlbGVjdG9yfSR7c2VsfSAqYDtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cbiAgICBpZiAoaXMuY2FsbChbZXZ0LnRhcmdldF0sIG1hdGNoaW5nKSkge1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXNTdHIsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lc1N0ci5zcGxpdCgvXFxzLyk7XG4gICAgbGV0IGRlbGVnYXRlO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGlzdCkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbi5qc1xuICoqLyIsIi8vIHNoYXJlIGRhdGEgYmV0d2VlbiBhcyBhbiBvYmplY3QgbW9kdWxlcyBiZWNhdXNlIHdlIHVzZVxuLy8gc2ltcGxpZmllZCBlcyBtb2R1bGVzIHRoZXJlIGFuZCBjYW5ub3QgaW1wb3J0IGFuZCBzaGFyZSBhIG51bWJlclxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5vZGVJbmRleDogMCxcbiAgICBhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXNbMF07XG4gICAgcmV0dXJuIG5vZGVcbiAgICAgICAgPyAobm9kZS5tYXRjaGVzXG4gICAgICAgICAgICB8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2lzLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIHJlbW92ZXMgZXZlbnQgaGFuZGxlciBmcm9tIGEgc2V0IG9mIGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuZGVsZWdhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IGV2ZW50Lm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgaWRNYXAgPSB7fTtcblxuICAgIGxldCByZXN1bHQ7XG5cbiAgICBzZWxlY3RvciA9IG5ldyBJbml0KHNlbGVjdG9yKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW5pdCh0aGlzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByZXN1bHRbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gc2VsZWN0b3JbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWYgKCFpZE1hcFtub2RlSURdKSB7XG4gICAgICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvbm90LmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIGVsZW1lbnRzLFxuLy8gZmlsdGVyZWQgYnkgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICAgIGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2ZpbmQuanNcbiAqKi8iLCJpbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcbi8vIHJlLWFkZHMgYmluZGluZyB3aGVuIG9iamVjdCBicmFuY2ggaXMgY2hhbmdlZFxuLy8gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSBiaW5kTm9kZSB3aGVuIHNvbWV0aGluZyBsaWtlXG4vLyAnZm9vLmJhci5iYXonIGlzIHBhc3NlZCB0byBpdCBhcyBrZXkgYXJnIHZhbHVlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2l0Y2hCaW5kaW5nKHtcbiAgICBjaGFuZ2VFdnQsXG4gICAgb2JqZWN0LFxuICAgIGRlZXBQYXRoLFxuICAgICRub2RlcyxcbiAgICBiaW5kZXIsXG4gICAgZXZ0LFxuICAgIGJpbmROb2RlXG59KSB7XG4gICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG4gICAgbGV0IHsgdmFsdWU6IHRhcmdldCB9ID0gY2hhbmdlRXZ0O1xuICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNUYXJnZXQgfSA9IGNoYW5nZUV2dDtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldCA9IG9iamVjdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgJG5vZGVzLCBiaW5kZXIsIGV2dCk7XG5cbiAgICAvLyByZW1vdmUgYmluZGluZyBmb3IgcHJldmlvdXNseSB1c2VkIG9iamVjdFxuICAgIGlmIChwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuYmluZE5vZGUocHJldmlvdXNUYXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sICRub2Rlcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZ2V0Tm9kZXMgZnJvbSAnLi9fYmluZGluZ3MvZ2V0bm9kZXMnO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVCaW5kaW5nIGZyb20gJy4vX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBldnQpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAndW5iaW5kTm9kZScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGV2dCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbeyBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnQgfV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZVxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBhY2NlcHQga2V5LW5vZGUgb2JqZWN0XG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGtleU9iaktleSwga2V5T2JqVmFsdWUsIG5vZGUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cblxuICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICBjb25zdCB7IGRlZXAgfSA9IGV2dCB8fCB7fTtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZjtcblxuICAgIC8vIGFsbG93IHRvIHBhc3MgbnVsbCBvciB1bmRlZmluZWQgYXMga2V5XG4gICAgLy8gaWYgcGFzc2VkIHRoZW4gcmVtb3ZlIGJpbmRpbmdzIG9mIGFsbCBrZXlzIGZvciBnaXZlbiBvYmplY3RcbiAgICBpZihrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24ocHJvcHMsIChwcm9wc0l0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbnVsbCwgZXZ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGJpbmRpbmdcbiAgICBpZihkZWVwICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVlcFBhdGhMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBkbyB3ZSBuZWVkIHRvIHRocm93IGVycm9yIHdoZW4gdGFyZ2V0IGlzIGZhbHN5P1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtkZWVwUGF0aFtpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE8gQlVHIHRoaXMgbWF5IHVuZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBiaW5kaW5ncyB3aXRoIHRoZSBzYW1lIHBhdGggKGNhbm5vdCByZXByb2R1Y2UpXG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpLFxuICAgICAgICAgICAgICAgIGBfY2hhbmdlOnRyZWU6JHtkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDJdfWApO1xuXG4gICAgICAgICAgICB1bmJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgbm9kZSwgZXZ0KTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyB3aGVuIG5vIHByb3BkZWYgZG8gbm90aGluZ1xuICAgIGlmKCFwcm9wRGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0IGhhdmUgYW55IGJpbmRpbmdzIGRvIG5vdGhpbmdcbiAgICBpZighYmluZGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBub2RlIGlzIHBhc2VkIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuICAgIGlmKCFub2RlKSB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2dCB9LCBiaW5kaW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5vZGVzIGFuZCAkbm9kZXMgZm9yIE1hdHJlc2hrYSBpbnN0YW5jZVxuICAgICAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcbiAgICBjb25zdCByZXRhaW5CaW5kaW5ncyA9IFtdO1xuICAgIGNvbnN0IHJldGFpbk5vZGVzID0gW107XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIGJpbmRuZ3MgYW5kIGNvbXBhcmUgdGhlaXIgbm9kZSB3aXRoIGdpdmVuIG5vZGVzXG4gICAgbm9mbi5mb3JFYWNoKCRub2Rlcywgbm9kZXNJdGVtID0+IHtcbiAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmKGJpbmRpbmcubm9kZSA9PT0gbm9kZXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldnQgfSwgYmluZGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldGFpbkJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gICAgICAgICAgICAgICAgcmV0YWluTm9kZXMucHVzaChub2Rlc0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgaWYocmV0YWluTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3Qubm9kZXNba2V5XSA9IHJldGFpbk5vZGVzWzBdO1xuICAgICAgICAgICAgb2JqZWN0LiRub2Rlc1trZXldID0gZG9tLiQocmV0YWluTm9kZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC5ub2Rlc1trZXldXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LiRub2Rlc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGJpbmRpbmdzIG9iamVjdFxuICAgIGlmKHJldGFpbkJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9wRGVmLmJpbmRpbmdzID0gcmV0YWluQmluZGluZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdW5iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vcmVtb3ZlbGlzdGVuZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBnaXZlblBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHtcblx0XHRyZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXG4gICAgbGV0IHBhdGggPSB0eXBlb2YgZ2l2ZW5QYXRoID09PSAnc3RyaW5nJyAmJiBnaXZlblBhdGggIT09ICcnID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBnaXZlblBhdGg7XG5cbiAgICBpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG5vIHBhdGggdGhlbiByZW1vdmUgbGlzdGVuZXJcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBkbyBhbGwgbWFnaWNcbiAgICAgICAgY29uc3Qga2V5ID0gcGF0aFswXTtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuICAgICAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG4gICAgICAgIGxldCBwYXRoU3RyO1xuXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZXRhaW4gPSBbXTtcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaW5mby5wYXRoU3RyICE9PSBwYXRoU3RyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0gPSByZXRhaW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIi8qIGVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgIGNvbnN0IG5vVHJpZ2dlciA9IG5hbWUgPyBuYW1lWzBdID09PSAnXycgOiBmYWxzZTtcblxuICAgIC8vIGlmIGFsbCBldmVudHMgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgbm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZXZ0LmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuICAgICAgICBkZWYuZXZlbnRzID0ge307XG4gICAgfSBlbHNlIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcbiAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIChjYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgZXZlbnRcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBkZWYuZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5cbmNvbnN0IHNwYWNlUmVnID0gL1xccysvO1xuXG4vLyB0aGUgZnVuY3Rpb24gcmVtb3ZlcyBzaW5nbGUgYmluZGluZyBmb3Igc2luZ2xlIG9iamVjdFxuLy8gY2FsbGVkIGJ5IHVuYmluZE5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZ0IH0sIHtcbiAgICBvcHRpb25zLFxuICAgIGJpbmRlcixcbiAgICBub2RlLFxuICAgIG5vZGVIYW5kbGVyLFxuICAgIG9iamVjdEhhbmRsZXJcbn0pIHtcbiAgICBjb25zdCB7IGRlc3Ryb3ksIG9uIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgeyBzaWxlbnQgfSA9IGV2dDtcblxuICAgIC8vIGlmIFwib25cIiBpcyBmdW5jdGlvbiBkaXNhYmxlIGl0XG4gICAgLy8gd2UgY2Fubm90IHR1cm4gb2ZmIGN1c3RvbSBsaXN0ZW5lciBkZWZpbmVkIGJ5IGEgcHJvZ3JhbW1lclxuICAgIC8vIHByb2dyYW1tZXIgbmVlZHMgdG8gcmVtb3ZlIGN1c3RvbSBsaXN0ZW5lciBtYXVhbGx5IHZpYSBiaW5kZXIuZGVzdHJveVxuICAgIGlmICh0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbm9kZUhhbmRsZXIuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uID09PSAnc3RyaW5nJyl7XG4gICAgICAgIC8vIHJlbW92ZSBET00gZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG4gICAgICAgIG5vZm4uZm9yRWFjaChvbi5zcGxpdChzcGFjZVJlZyksXG4gICAgICAgICAgICBldnROYW1lID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnROYW1lLCBub2RlSGFuZGxlcikpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBvYmplY3QgZXZlbnQgbGlzdGVuZXJcbiAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG4gICAgLy8gaWYgYmluZGVyLmRlc3Ryb3kgaXMgZ2l2ZW4gY2FsbCBpdFxuICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgIGRlc3Ryb3kuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9LCBldnQpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgdW5iaW5kOiR7a2V5fWAsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICd1bmJpbmQnLCBleHRlbmRlZEV2dCk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgbG9va0ZvckJpbmRlciBmcm9tICcuLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBydW5Ob2RlSGFuZGxlciBmcm9tICcuL3J1bm5vZGVoYW5kbGVyJztcbmltcG9ydCBydW5PYmplY3RIYW5kbGVyIGZyb20gJy4vcnVub2JqZWN0aGFuZGxlcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL191dGlsL2RlYm91bmNlJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIGhhbmRsZXMgYmluZGluZyBmb3Igc2luZ2xlIHByb3BlcnR5ICYgbm9kZVxuLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgYXQgYmluZE5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTaW5nbGVOb2RlKG9iamVjdCwge1xuICAgIGJpbmRlcjogZ2l2ZW5CaW5kZXIsXG4gICAga2V5LFxuICAgICRub2RlcyxcbiAgICBub2RlLFxuICAgIGV2dCxcbiAgICBwcm9wRGVmXG59KSB7XG4gICAgY29uc3Qge1xuICAgICAgICBzaWxlbnQsXG4gICAgICAgIGFzc2lnbkRlZmF1bHRWYWx1ZSxcbiAgICAgICAgZGVib3VuY2U6IGRlYm91bmNlT3B0aW9uXG4gICAgfSA9IGV2dDtcbiAgICAvLyBjcmVhdGUgYmluZGluZ3MgYXJyYXkgaW4gcHJvcGVydHkgZGVmaW5pdGlvbiBvYmplY3RcbiAgICBjb25zdCBiaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzIHx8IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgbGV0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgc2VsZjogb2JqZWN0LFxuICAgICAgICBrZXksXG4gICAgICAgIHZhbHVlLFxuICAgICAgICAkbm9kZXMsXG4gICAgICAgIG5vZGVcbiAgICB9O1xuICAgIGxldCBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgb2JqZWN0SGFuZGxlcjtcbiAgICBsZXQgbm9kZUhhbmRsZXI7XG5cbiAgICAvLyBnZXQgYWN0dWFsIGJpbmRlclxuICAgIGlmIChnaXZlbkJpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cbiAgICAgICAgaWYgKGZvdW5kQmluZGVyKSB7XG4gICAgICAgICAgICBpZiAoZ2l2ZW5CaW5kZXIpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihmb3VuZEJpbmRlciwgZ2l2ZW5CaW5kZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiaW5kZXIgPSBmb3VuZEJpbmRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpbmRlciA9IGdpdmVuQmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBnZXRWYWx1ZSwgc2V0VmFsdWUsIG9uLCBpbml0aWFsaXplIH0gPSBiaW5kZXI7XG5cbiAgICAvLyBjYWxsIGJpbmRlci5pbml0aWFsaXplXG4gICAgaWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGNhbGxzIGdldFZhbHVlIGltbWVkaWF0ZWx5IGFuZCByZWFzc2lnbiBhIHByb3BlcnR5XG4gICAgLy8gd2hlbiBhbGwgcmVxdWlyZWQgY29uZGl0aW9ucyBhcmUgbWV0IGZvciB0aGlzXG4gICAgaWYgKGdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBhc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgICAgICBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyBmcm9tTm9kZTogdHJ1ZSB9LCBldnQpKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgbmVlZGVkIGV2ZW50IGhhbmRsZXJzIHRoZSBvYmplY3Qgd2hlbiBzZXRWYWx1ZSBpcyBnaXZlblxuICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICBvYmplY3RIYW5kbGVyID0gKCkgPT4gcnVuT2JqZWN0SGFuZGxlcih7XG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICBldnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYnkgZGVmYXVsdCBkZWJvdW5jaW5nIGlzIG9uXG4gICAgICAgIC8vIGl0IGNhbiBiZSB0dXJuZWQgb2ZmIGJ5IHBhc3NpbmcgZGVib3VuY2U9ZmFsc2UgdG8gZXZlbnQgb2JqZWN0XG4gICAgICAgIGlmIChkZWJvdW5jZU9wdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIGRlYm91bmNlT3B0aW9uID09PSAnbnVtYmVyJyA/IGRlYm91bmNlT3B0aW9uIDogMDtcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIgPSBkZWJvdW5jZShvYmplY3RIYW5kbGVyLCBkZWxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBuZWVkZWQgZXZlbnQgaGFuZGxlcnMgdGhlIG5vZGUgd2hlbiBnZXRWYWx1ZSAmIG9uIGFyZSBnaXZlblxuICAgIGlmIChnZXRWYWx1ZSAmJiBvbikge1xuICAgICAgICBub2RlSGFuZGxlciA9IChkb21FdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gbm9kZUhhbmRsZXIuZGlzYWJsZWQgPSB0cnVlIGlzIHNldCBpbiB1bmJpbmROb2RlXG4gICAgICAgICAgICAvLyB3ZSBjYW5ub3QgXCJ0dXJuIG9mZlwiIGJpbmRlci5vbiB3aGVuIGl0cyB2YWx1ZSBpcyBmdW5jdGlvblxuICAgICAgICAgICAgLy8gZGV2ZWxvcGVyIG5lZWRzIHRvIGNsZWFuIG1lbW9yeSAodHVybiBvZmYgY2FsbGJhY2spIG1hbnVhbHkgaW4gYmluZGVyLmRlc3Ryb3lcbiAgICAgICAgICAgIGlmKCFub2RlSGFuZGxlci5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICAgICAgICAgICAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wRGVmLFxuICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE8gdGhyb3cgZXJyb3Igd2hlbiBcIm9uXCIgYW5kIG1heWJlIG90aGVyIGJpbmRlciBwcm9wZXJ0aWVzIGhhcyB3cm9uZyB0eXBlXG4gICAgICAgIGlmICh0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIG9uLmNhbGwobm9kZSwgbm9kZUhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvbiA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgLy8gYWRkRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG4gICAgICAgICAgICBub2ZuLmZvckVhY2gob24uc3BsaXQoc3BhY2VSZWcpLFxuICAgICAgICAgICAgICAgIGV2dE5hbWUgPT4gbm9kZS5hZGRFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgYmluZGluZyBkYXRhIHRvIGJpbmRpbmdzIGFycmF5XG4gICAgYmluZGluZ3MucHVzaCh7XG4gICAgICAgIG9uLFxuICAgICAgICBub2RlLFxuICAgICAgICBiaW5kZXIsXG4gICAgICAgIG9iamVjdEhhbmRsZXIsXG4gICAgICAgIG5vZGVIYW5kbGVyLFxuICAgICAgICBvcHRpb25zXG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9LCBldnQpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgYmluZDoke2tleX1gLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAnYmluZCcsIGV4dGVuZGVkRXZ0KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdEJpbmRlcnMgZnJvbSAnLi9kZWZhdWx0YmluZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZhdWx0QmluZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocmVzdWx0ID0gZGVmYXVsdEJpbmRlcnNbaV0uY2FsbChub2RlLCBub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvb2tmb3JiaW5kZXIuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9iaW5kZXJzL2lucHV0JztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL2JpbmRlcnMvdGV4dGFyZWEnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICcuL2JpbmRlcnMvc2VsZWN0JztcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL2JpbmRlcnMvcHJvZ3Jlc3MnO1xuaW1wb3J0IG91dHB1dCBmcm9tICcuL2JpbmRlcnMvb3V0cHV0JztcblxuZXhwb3J0IGRlZmF1bHQgW25vZGUgPT4ge1xuICAgIHN3aXRjaChub2RlLnRhZ05hbWUpIHtcbiAgICAgICAgY2FzZSAnSU5QVVQnOlxuICAgICAgICAgICAgcmV0dXJuIGlucHV0KG5vZGUudHlwZSk7XG4gICAgICAgIGNhc2UgJ1RFWFRBUkVBJzpcbiAgICAgICAgICAgIHJldHVybiB0ZXh0YXJlYSgpO1xuICAgICAgICBjYXNlICdTRUxFQ1QnOlxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdChub2RlLm11bHRpcGxlKTtcbiAgICAgICAgY2FzZSAnUFJPR1JFU1MnOlxuICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzKCk7XG4gICAgICAgIGNhc2UgJ09VVFBVVCc6XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0KCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3V0cHV0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlIHx8IHRoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9ICdmb3JtJyBpbiB0aGlzID8gJ3ZhbHVlJyA6ICd0ZXh0Q29udGVudCc7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IHZhbHVlID09PSBudWxsID8gJycgOiBgJHt2YWx1ZX1gO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL291dHB1dC5qc1xuICoqLyIsImltcG9ydCBpcyBmcm9tICcuLi9fdXRpbC9pcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbi8vIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gYm91bmQgbm9kZSBpcyBjaGFuZ2VkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW5Ob2RlSGFuZGxlcih7XG4gICAgZG9tRXZlbnQgPSB7fSxcbiAgICBvYmplY3QsXG4gICAga2V5LFxuICAgIG5vZGUsXG4gICAgcHJvcERlZixcbiAgICBiaW5kZXIsXG4gICAgb3B0aW9uc1xufSkge1xuICAgIGNvbnN0IHByZXZpb3VzVmFsdWUgPSBwcm9wRGVmLnZhbHVlO1xuICAgIGNvbnN0IHsgd2hpY2gsIHRhcmdldCB9ID0gZG9tRXZlbnQ7XG4gICAgY29uc3QgeyBnZXRWYWx1ZSB9ID0gYmluZGVyO1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBub2ZuLmFzc2lnbih7XG4gICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgIGRvbUV2ZW50LFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBkb21FdmVudC5vcmlnaW5hbEV2ZW50IHx8IGRvbUV2ZW50LCAvLyBqUXVlcnkgdGhpbmdcbiAgICAgICAgLy8gd2lsbCB0aHJvdyBcInByZXZlbnREZWZhdWx0IGlzIG5vdCBhIGZ1bmN0aW9uXCIgd2hlbiBkb21FdmVudCBpcyBlbXB0eSBvYmplY3RcbiAgICAgICAgcHJldmVudERlZmF1bHQ6ICgpID0+IGRvbUV2ZW50LnByZXZlbnREZWZhdWx0KCksXG4gICAgICAgIC8vIHdpbGwgdGhyb3cgXCJzdG9wUHJvcGFnYXRpb24gaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICBzdG9wUHJvcGFnYXRpb246ICgpID0+IGRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLFxuICAgICAgICB3aGljaCxcbiAgICAgICAgdGFyZ2V0XG4gICAgfSwgb3B0aW9ucykpO1xuXG4gICAgaWYgKCFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkpIHtcbiAgICAgICAgLy8gVE9ETyBhZGQgZGVzY3JpcHRpb24gb2YgYSBoYWNrXG4gICAgICAgIC8vIHdoeSBkbyB3ZSBuZWVkIGNoYW5nZWROb2RlLCBvbkNoYW5nZVZhbHVlLCBiaW5kZXI/XG4gICAgICAgIHNldChvYmplY3QsIGtleSwgdmFsdWUsIHtcbiAgICAgICAgICAgIGZyb21Ob2RlOiB0cnVlLFxuICAgICAgICAgICAgY2hhbmdlZE5vZGU6IG5vZGUsXG4gICAgICAgICAgICBvbkNoYW5nZVZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGJpbmRlclxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvcnVubm9kZWhhbmRsZXIuanNcbiAqKi8iLCIvLyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHByb3BlcnR5IHZhbHVlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk9iamVjdEhhbmRsZXIoe1xuICAgIG5vZGUsXG4gICAgcHJvcERlZixcbiAgICBiaW5kZXIsXG4gICAgb3B0aW9ucyxcbiAgICBldnRcbn0pIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wRGVmO1xuICAgIGNvbnN0IHsgb25DaGFuZ2VWYWx1ZSwgY2hhbmdlZE5vZGUsIGJpbmRlcjogZXZ0QmluZGVyIH0gPSBldnQ7XG4gICAgY29uc3QgeyBzZXRWYWx1ZSB9ID0gYmluZGVyO1xuICAgIC8vIGRpcnR5IGhhY2sgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRyZXNoa2Fqcy9tYXRyZXNoa2EvaXNzdWVzLzE5XG4gICAgY29uc3QgZGlydHlIYWNrVmFsdWUgPSBvbkNoYW5nZVZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInXG4gICAgICAgID8gU3RyaW5nKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgaWYgKGNoYW5nZWROb2RlID09PSBub2RlICYmIG9uQ2hhbmdlVmFsdWUgPT09IGRpcnR5SGFja1ZhbHVlICYmIGV2dEJpbmRlciA9PT0gYmluZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZS5jYWxsKG5vZGUsIHZhbHVlLCBub2ZuLmFzc2lnbih7IHZhbHVlIH0sIG9wdGlvbnMpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9ydW5vYmplY3RoYW5kbGVyLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcImV2dFwiXSB9XSovXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuXG4vLyBwcm9wZXJ0eSBtb2RpZmllciBldmVudCByZWdleHBcbmNvbnN0IHByb3BNb2RFdmVudFJlZ1xuICAgID0gL15fY2hhbmdlOmRlcHM6fF5fY2hhbmdlOmJpbmRpbmdzOnxeX2NoYW5nZTpkZWxlZ2F0ZWQ6fF5fY2hhbmdlOnRyZWU6fF5jaGFuZ2U6fF5iZWZvcmVjaGFuZ2U6LztcblxuLy8gYWRkcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXJcbi8vIHVzZWQgYXMgY29yZSBvZiBldmVudCBlbmdpbmVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGluaXRNSyhvYmplY3QpO1xuICAgIGNvbnN0IGN0eCA9IGNvbnRleHQgfHwgb2JqZWN0O1xuICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXTtcbiAgICBjb25zdCBldnQgPSB7IGNhbGxiYWNrLCBjb250ZXh0LCBjdHgsIG5hbWUsIGluZm8gfTtcblxuXG4gICAgLy8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWVcbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBkYXRhLCByZXR1cm4gZmFsc2VcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGV2dCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGlmICgoZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjayB8fCBldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrLl9jYWxsYmFjaylcbiAgICAgICAgICAgICAgICAgICAgJiYgZXZ0LmNvbnRleHQgPT09IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgZXZlbnQgaXNuJ3QgZm91bmQgYWRkIGl0IHRvIHRoZSBldmVudCBsaXN0XG4gICAgICAgIGV2ZW50cy5wdXNoKGV2dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIG5vIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWUsIGNyZWF0ZSBhcnJheSB3aXRoIG9ubHkgZWJlbnRcbiAgICAgICAgYWxsRXZlbnRzW25hbWVdID0gW2V2dF07XG4gICAgfVxuXG4gICAgaWYgKHByb3BNb2RFdmVudFJlZy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIC8vIGRlZmluZSBuZWVkZWQgYWNjZXNzb3JzIGZvciBLRVlcbiAgICAgICAgZGVmaW5lUHJvcChvYmplY3QsIG5hbWUucmVwbGFjZShwcm9wTW9kRXZlbnRSZWcsICcnKSk7XG4gICAgfVxuXG4gICAgaWYgKG5hbWVbMF0gIT09ICdfJykge1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYGFkZGV2ZW50OiR7bmFtZX1gLCBldnQpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ2FkZGV2ZW50JywgZXZ0KTtcbiAgICB9XG5cbiAgICAvLyBpZiBldmVudCBpcyBhZGRlZCByZXR1cm4gdHJ1ZVxuICAgIHJldHVybiB0cnVlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIGdpdmVuRGVsYXksIHRoaXNBcmcpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICBsZXQgZGVsYXk7XG4gICAgaWYgKHR5cGVvZiBkZWxheSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhpc0FyZyA9IGdpdmVuRGVsYXk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZGVsYXkgPSAwO1xuICAgIH1cblxuICAgIGRlbGF5ID0gZ2l2ZW5EZWxheSB8fCAwO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgY29uc3QgW2ExLCBhMl0gPSBhcmdzO1xuICAgICAgICBjb25zdCBhcmdzTGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNhbGxDb250ZXh0ID0gdGhpc0FyZyB8fCB0aGlzO1xuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2goYXJnc0xlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQsIGExKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQsIGExLCBhMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuYXBwbHkoY2FsbENvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBkZWxheSk7XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2RlYm91bmNlLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiBbXCJlcnJvclwiLCB7IFwiZnVuY3Rpb25zXCI6IGZhbHNlIH1dKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL2FkZGxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcblxuY29uc3QgdHJlZUNoYW5nZUV2dFJlZyA9IC9eX2NoYW5nZTp0cmVlOi87XG5cbmZ1bmN0aW9uIGNoYW5nZUhhbmRsZXIoe1xuICAgIHByZXZpb3VzVmFsdWUsXG4gICAgdmFsdWVcbn0sIHtcbiAgICBwYXRoLFxuICAgIG5hbWUsXG4gICAgY2FsbGJhY2ssXG4gICAgY29udGV4dFxufSA9IHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQuaW5mby5kZWxlZ2F0ZWREYXRhKSB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcih2YWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIGlmIChwcmV2aW91c1ZhbHVlICYmIHR5cGVvZiBwcmV2aW91c1ZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgdHJlZSBjaGFuZ2UgZXZlbnQgd2hpY2ggaXMgdXNlZCBieSBiaW5kaW5ncyBsb2dpY1xuICAgIGlmICh0cmVlQ2hhbmdlRXZ0UmVnLnRlc3QobmFtZSkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlS2V5ID0gbmFtZS5yZXBsYWNlKHRyZWVDaGFuZ2VFdnRSZWcsICcnKTtcblxuICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiAhaXMocHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLCB2YWx1ZVtjaGFuZ2VLZXldKSkge1xuICAgICAgICAgICAgY29uc3QgeyBldmVudHMgfSA9IGRlZnMuZ2V0KHZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHRyZWVDaGFuZ2VFdnROYW1lID0gYF9jaGFuZ2U6dHJlZToke2NoYW5nZUtleX1gO1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlRXZlbnRzID0gZXZlbnRzW3RyZWVDaGFuZ2VFdnROYW1lXTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VFdmVudHMpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKHZhbHVlLCB0cmVlQ2hhbmdlRXZ0TmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1ZhbHVlW2NoYW5nZUtleV0sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVtjaGFuZ2VLZXldLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZ2l2ZW5QYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuICAgIC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIGFkZCBzaW1wbGUgbGlzdGVuZXJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBkbyBhbGwgbWFnaWNcbiAgICAgICAgY29uc3Qga2V5ID0gcGF0aFswXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICAgICAgY29udGV4dFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHRoZSBldmVudCBpcyB0cmlnZ2VyZWQgYnkgXCJzZXRcIlxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG4gICAgICAgICAgICBkZWxlZ2F0ZWREYXRhLFxuICAgICAgICAgICAgcGF0aFN0clxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWxsIGhhbmRsZXIgbWFudWFsbHlcbiAgICAgICAgY2hhbmdlSGFuZGxlcih7XG4gICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV1cbiAgICAgICAgfSwgZGVsZWdhdGVkRGF0YSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiXG54ZGVzY3JpYmUoJ0JpbmRpbmdzIHBhcnNlcicsICgpID0+IHtcblx0aXQoJ3Nob3VsZCBiaW5kIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHNwYW4+e3t4fX08L3NwYW4+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcblxuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2hpJztcbiAgICAgICAgZXhwZWN0KG5vZGUuZmlyc3RDaGlsZC5pbm5lckhUTUwpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgSFRNTCB1c2luZyBNYXRyZXNoa2EgaW5zdGFuY2UgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxzcGFuPnt7eH19PC9zcGFuPicpLFxuICAgICAgICAgICAgbWsgPSBuZXcgTUs7XG5cbiAgICAgICAgbWsucGFyc2VCaW5kaW5ncyhub2RlKTtcbiAgICAgICAgbWsueCA9ICdoaSc7XG4gICAgICAgIGV4cGVjdChub2RlLmZpcnN0Q2hpbGQuaW5uZXJIVE1MKS50b0VxdWFsKG1rLngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJ7e3h9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnaGV5JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNoZWNrZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJ7e3h9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSB0cnVlO1xuICAgICAgICBleHBlY3Qobm9kZS5jaGVja2VkKS50b0VxdWFsKG9iamVjdC54KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCB0ZXh0YXJlYXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcSgnPHRleHRhcmVhIHZhbHVlPVwie3t4fX1cIj48L3RleHRhcmVhPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LngpO1xuXHR9KTtcblxuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGNvbXBsZXggYXR0cnMnLCAoKSA9PiB7d2luZG93Lm9sb2xvc2hhID0gdHJ1ZTtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8YSBocmVmPVwie3t4fX0ve3t5fX1cIj48L2E+JyksXG4gICAgICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdiYXInO1xuICAgICAgICBvYmplY3QueSA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkudG9FcXVhbChvYmplY3QueCArICcvJyArIG9iamVjdC55KTt3aW5kb3cub2xvbG9zaGEgPSBmYWxzZTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBjb21wbGV4IHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG5vZGUgPSBxKCc8aW5wdXQgdmFsdWU9XCJ7e3h9fSBhbmQge3t5fX1cIj4nKSxcbiAgICAgICAgICAgIG9iamVjdCA9IHt9O1xuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC55ID0gJ2Jhcic7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54ICsgJyBhbmQgJyArIG9iamVjdC55KTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGRudCBjcmVhdGUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cInt7eH19IGFuZCB7e3l9fVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge307XG4gICAgICAgIG1hZ2ljLnBhcnNlQmluZGluZ3Mob2JqZWN0LCBub2RlKTtcbiAgICAgICAgb2JqZWN0LnggPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LnkgPSAnYmF6JztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwob2JqZWN0LnggKyAnIGFuZCAnICsgb2JqZWN0LnkpO1xuICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMob2JqZWN0KSkudG9FcXVhbChbJ3gnLCAneSddKTtcblx0fSk7XG5cblxuICAgIGl0KCdzaG91bGQgYmluZCBuZXN0ZWQgbm9kZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcShgXG4gICAgICAgICAgICA8ZGl2Pnt7eH19XG4gICAgICAgICAgICAgICAgPGlucHV0IHZhbHVlPVwie3t5fX1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiaGV5IHt7en19XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApLFxuICAgICAgICBvYmplY3QgPSB7fTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QueCA9ICdmb28nO1xuICAgICAgICBvYmplY3QueSA9ICdiYXInO1xuICAgICAgICBvYmplY3QueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5pbm5lckhUTUwuaW5kZXhPZignPHNwYW4+JyArIG9iamVjdC54ICsgJzwvc3Bhbj4nKSkudG9FcXVhbCgwKTtcbiAgICAgICAgZXhwZWN0KHEoJ2lucHV0Jywgbm9kZSkudmFsdWUpLnRvRXF1YWwob2JqZWN0LnkpO1xuICAgICAgICBleHBlY3QocSgnW2F0dHJdJywgbm9kZSkuZ2V0QXR0cmlidXRlKCdhdHRyJykpLnRvRXF1YWwoJ2hleSAnICsgb2JqZWN0LnopO1xuICAgICAgICBleHBlY3QoT2JqZWN0LmtleXMob2JqZWN0KS5zb3J0KCkpLnRvRXF1YWwoWyd4JywgJ3knLCAneiddKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgbmVzdGVkIG5vZGVzIGFuZCBkZWVwIHByb3BlcnRpZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBub2RlID0gcShgXG4gICAgICAgICAgICA8ZGl2Pnt7YS5ifX1cbiAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9XCJ7e2MuZH19XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImhleSB7e2UuZn19XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApLFxuICAgICAgICBvYmplY3QgPSB7XG4gICAgICAgICAgICBhOiB7YjogMX0sXG4gICAgICAgICAgICBjOiB7ZDogMn0sXG4gICAgICAgICAgICBlOiB7ZjogMn1cbiAgICAgICAgfTtcbiAgICAgICAgbWFnaWMucGFyc2VCaW5kaW5ncyhvYmplY3QsIG5vZGUpO1xuICAgICAgICBvYmplY3QuYS5iID0gJ2Zvbyc7XG4gICAgICAgIG9iamVjdC5jLmQgPSAnYmFyJztcbiAgICAgICAgb2JqZWN0LmUuZiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS5pbm5lckhUTUwuaW5kZXhPZignPHNwYW4+JyArIG9iamVjdC5hLmIgKyAnPC9zcGFuPicpKS50b0VxdWFsKDApO1xuICAgICAgICBleHBlY3QocSgnaW5wdXQnLCBub2RlKS52YWx1ZSkudG9FcXVhbChvYmplY3QuYy5kKTtcbiAgICAgICAgZXhwZWN0KHEoJ1thdHRyXScsIG5vZGUpLmdldEF0dHJpYnV0ZSgnYXR0cicpKS50b0VxdWFsKCdoZXkgJyArIG9iamVjdC5lLmYpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2hlbiBicmFja2V0cyBhcmUgcmVkZWZpbmVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgbm9kZSA9IHEoJzxpbnB1dCB2YWx1ZT1cIltbeF1dIHlvdVwiPicpLFxuICAgICAgICAgICAgb2JqZWN0ID0ge30sXG5cdFx0XHRkZWZhdWx0QnJhY2tldHMgPSBtYWdpYy5wYXJzZXJCcmFja2V0cztcblxuXHRcdG1hZ2ljLnBhcnNlckJyYWNrZXRzID0ge1xuXHRcdFx0bGVmdDogJ1tbJyxcblx0XHRcdHJpZ2h0OiAnXV0nXG5cdFx0fTtcblxuICAgICAgICBtYWdpYy5wYXJzZUJpbmRpbmdzKG9iamVjdCwgbm9kZSk7XG4gICAgICAgIG9iamVjdC54ID0gJ2hleSc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKG9iamVjdC54ICsgJyB5b3UnKTtcblxuXHRcdG1hZ2ljLnBhcnNlckJyYWNrZXRzID0gZGVmYXVsdEJyYWNrZXRzO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYmluZGluZ3MvYmluZGluZ3NfcGFyc2VyX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcbmltcG9ydCBiaW5kT3B0aW9uYWxOb2RlIGZyb20gJ3NyYy9iaW5kb3B0aW9uYWxub2RlJztcbmltcG9ydCBiaW5kU2FuZGJveCBmcm9tICdzcmMvYmluZHNhbmRib3gnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnc3JjL3VuYmluZG5vZGUnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICdzcmMvc2VsZWN0JztcbmltcG9ydCBzZWxlY3RBbGwgZnJvbSAnc3JjL3NlbGVjdGFsbCc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuICAgIGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBub2RlO1xuICAgIGxldCBiaW5kZXI7XG4gICAgbGV0IHNpbXVsYXRlRG9tRXZlbnQ7XG4gICAgbGV0IGluaXRpYWxpemVDYWxsO1xuICAgIGxldCBkZXN0cm95Q2FsbDtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVCaW5kID0gKGtleSA9ICd4JykgPT4ge1xuICAgICAgICBvYmpba2V5XSA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9ialtrZXldKS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVVbmJpbmQgPSAoKSA9PiB7XG4gICAgICAgIG9iai54ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXonO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBleHBlY3QoZGVzdHJveUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgaW5pdGlhbGl6ZUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgZGVzdHJveUNhbGwgPSBjcmVhdGVTcHkoKTtcblxuICAgICAgICBiaW5kZXIgPSAge1xuICAgICAgICAgICAgb24oY2JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmR1bW15ZXZlbnQgPSBjYmM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUodikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemUobykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplQ2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLm9uZHVtbXlldmVudCA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICAgIGRlc3Ryb3lDYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRlYm91bmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIpO1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZCcsIGJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZDp4JywgYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChiaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdW5iaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBjb25zdCB1bmJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3VuYmluZCcsIHVuYmluZENhbGwpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQ6eCcsIHVuYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcgbm9kZSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgd3JvbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jywgd3JvbmdOb2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcga2V5IGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneScsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgd2hlbiBub2RlIGlzIG5vdCBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYWxsIHdoZW4gbmVpdGhlciBrZXkgbm9yIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmopO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBrZXktbm9kZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0sIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCB1c2luZyBhcnJheSBvZiBvYmplY3RzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlIH1dKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChvYmoubm9kZXMueCkudG9FcXVhbChub2RlKTtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShvYmouJG5vZGVzLngpXG4gICAgICAgICkudG9FcXVhbChbbm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYSBwcm9wZXJ0eSBpbiBjb250ZXh0IG9iamVjdCB3aGljaCBoYXMgaXNNSz10cnVlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBiaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KG9iai4kbm9kZXMueCkudG9CZVVuZGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueC55LnogPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW5jZWxzIGRlZXAgYmluZGluZyB3aGVuIGRlZXA9ZmFsc2Ugb3B0aW9uIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgZGVlcDogZmFsc2VcbiAgICAgICAgfSwgbm9EZWJvdW5jZUZsYWcpKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoJ3gueS56Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnkueicsICdnbycpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueCA9IG1ha2VPYmplY3QoJ3kueicsICdmb28nKTtcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgYmluZGluZyBpZiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBjb25zdCB4ID0gb2JqLng7XG5cbiAgICAgICAgb2JqLnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG5cbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3QoeC55LnopLm5vdC50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgd2luZG93LnRhcmdldCA9IG9iai54Lnk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICB4LnkueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndXNlcyBjdXN0b20gc2VsZWN0b3JzIG9uIGN1cnJlbnQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknLCAnZm9vJyk7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcblxuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94Jywgbm9kZSk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueScsICc6c2FuZGJveCBzcGFuJywgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkTm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIGNoaWxkTm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBjaGlsZE5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KGB0aHJvd3MgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlYCwgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE5vZGUob2JqLCAneCcpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdChgZG9lc24ndCB0aHJvdyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmUgYW5kIG9wdGlvbmFsPXRydWUgaXMgZ2l2ZW5gLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kTm9kZShvYmosICd4JywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSBtZXRob2Qgb2YgTWF0cmVzaGthIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE9wdGlvbmFsTm9kZShvYmosICd4Jyk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2VsZWN0cyBjaGlsZHJlbiBvZiBzYW5kYm94JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImZvb1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiZm9vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCBzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCkgc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpzYW5kYm94IHNwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCB0YWJsZScpXG4gICAgICAgICkudG9FcXVhbChudWxsKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHRhYmxlJylcbiAgICAgICAgKS50b0VxdWFsKG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KSB0YWJsZScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbXSk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggdGFibGUnKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBiaW5kIGFuZCByZWJpbmQgc2FuZGJveCB2aWEgYmluZFNhbmRib3gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFub3RoZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIG5vZGUsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIGFub3RoZXJOb2RlLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFthbm90aGVyTm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2JpbmRTYW5kYm94IHRocm93cyBhbiBlcnJvciB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmopO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5cbi8vIFRPRE8gZGVzY3JpcHRpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRPcHRpb25hbE5vZGUoLi4uYXJncykge1xuICAgIC8vIHRoaXMgaGFjayBhbGxvd3MgdG8ga2VlcCBiaW5kT3B0aW9uYWxOb2RlIGFzIGNvbXBhY3QgYXMgcG9zc2libGVcbiAgICAvLyBhbmQgZG9lc24ndCByZXF1aXJlIHRvIGZsaXAgYXJncyBhbmQgc3VwcG9lciBhbGwgYmluZE5vZGUgdmFyaWF0aW9uc1xuICAgIGJpbmROb2RlLnRlbXBvcmFyeU9wdGlvbmFsRmxhZyA9IHRydWU7XG4gICAgcmV0dXJuIGJpbmROb2RlLmNhbGwodGhpcywgLi4uYXJncyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kb3B0aW9uYWxub2RlLmpzXG4gKiovIiwiaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnLi91bmJpbmRub2RlJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2FuZGJveChvYmplY3QsIG5vZGUsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnYmluZFNhbmRib3gnKTtcbiAgICB9XG5cbiAgICB1bmJpbmROb2RlKG9iamVjdCwgJ3NhbmRib3gnLCBudWxsLCBldnQpO1xuICAgIHJldHVybiBiaW5kTm9kZShvYmplY3QsICdzYW5kYm94Jywgbm9kZSwgbnVsbCwgZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRzYW5kYm94LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCBkb20gZnJvbSAnLi9fZG9tJztcbmltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuL191dGlsL3RvYXJyYXknO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yVGVzdFJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0KG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBzZWxlY3RvciA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZWxlY3RBbGwnKTtcbiAgICB9XG5cblx0aWYgKGN1c3RvbVNlbGVjdG9yVGVzdFJlZy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdHJldHVybiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9yKVswXSB8fCBudWxsO1xuXHR9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgICAgIGlmICghZGVmIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wcy5zYW5kYm94O1xuXG4gICAgICAgIGlmICghcHJvcERlZikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG4gICAgICAgIGlmKGJpbmRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCB7IG5vZGUgfSA9IGJpbmRpbmdzWzBdO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcblx0fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlbGVjdC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vX2RvbSc7XG5pbXBvcnQgc2VsZWN0Tm9kZXMgZnJvbSAnLi9fYmluZGluZ3Mvc2VsZWN0bm9kZXMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi9fdXRpbC90b2FycmF5JztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclRlc3RSZWcgPSAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdEFsbChvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgc2VsZWN0b3IgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnc2VsZWN0QWxsJyk7XG4gICAgfVxuXG5cblx0aWYgKGN1c3RvbVNlbGVjdG9yVGVzdFJlZy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdHJldHVybiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9yKTtcblx0fSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZG9tLiQoKTtcbiAgICAgICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgICAgICBpZiAoIWRlZiB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wcy5zYW5kYm94O1xuXG4gICAgICAgIGlmICghcHJvcERlZikge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKHsgbm9kZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQodG9BcnJheShzZWxlY3RlZCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXHR9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VsZWN0YWxsLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBuZXN0ZWQgb2JqZWN0IGJhc2VkIG9uIHBhdGggYW5kIGxhc3RWYWx1ZVxuLy8gZXhhbXBsZTogbWFrZU9iamVjdCgnYS5iLmMnLCA0MikgLT4ge2E6IHtiOiB7YzsgNDJ9fX1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VPYmplY3QoZ2l2ZW5QYXRoID0gJycsIGxhc3RWYWx1ZSA9IHt9KSB7XG4gICAgY29uc3QgcGF0aCA9IGdpdmVuUGF0aCA/IGdpdmVuUGF0aC5zcGxpdCgnLicpIDogW107XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgbGV0IG9iaiA9IHJlc3VsdDtcbiAgICBsZXQga2V5O1xuXG5cbiAgICB3aGlsZSAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGtleSA9IHBhdGguc2hpZnQoKTtcbiAgICAgICAgb2JqID0gb2JqW2tleV0gPSB7fTtcbiAgICB9XG5cbiAgICBvYmpbcGF0aC5zaGlmdCgpXSA9IGxhc3RWYWx1ZTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL21ha2VvYmplY3QuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTcHkoKSB7XG4gICAgY29uc3Qgc3B5TmFtZSA9IGByYW5kb21OYW1lJHtNYXRoLnJhbmRvbSgpfSR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YDtcbiAgICBjb25zdCBzcHkgPSAoKSA9PiB7fTtcbiAgICBjb25zdCBzcHlPYmogPSB7fTtcbiAgICBzcHlPYmpbc3B5TmFtZV0gPSBzcHk7XG4gICAgcmV0dXJuIHNweU9uKHNweU9iaiwgc3B5TmFtZSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL2NyZWF0ZXNweS5qc1xuICoqLyIsImltcG9ydCB7XG5cdHRleHRhcmVhLFxuICAgIGlucHV0LFxuICAgIHNlbGVjdCxcbiAgICBvdXRwdXQsXG4gICAgcHJvZ3Jlc3Ncbn0gZnJvbSAnc3JjL2JpbmRlcnMnO1xuXG5pbXBvcnQgbG9va0ZvckJpbmRlciBmcm9tICdzcmMvbG9va2ZvcmJpbmRlcic7XG5pbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcblxuZGVzY3JpYmUoJ0RlZmF1bHQgYmluZGVycycsICgpID0+IHtcbiAgICBjb25zdCBub0RlYm91bmNlRmxhZyA9IHsgZGVib3VuY2U6IGZhbHNlIH07XG5cdGxldCBvYmo7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGphc21pbmUuYWRkTWF0Y2hlcnMoe1xuICAgICAgICAgICAgYmluZGVyc0VxdWFsOiAodXRpbCwgY3VzdG9tRXF1YWxpdHlUZXN0ZXJzKSA9PiAoe1xuICAgICAgICAgICAgICAgIGNvbXBhcmU6IChhY3R1YWwsIGV4cGVjdGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXNzID0gcmVzdWx0LnBhc3MgPSB1dGlsLmVxdWFscyhhY3R1YWwub24sIGV4cGVjdGVkLm9uLCBjdXN0b21FcXVhbGl0eVRlc3RlcnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB1dGlsLmVxdWFscyhgJHthY3R1YWwuZ2V0VmFsdWV9YCwgYCR7ZXhwZWN0ZWQuZ2V0VmFsdWV9YCwgY3VzdG9tRXF1YWxpdHlUZXN0ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdXRpbC5lcXVhbHMoYCR7YWN0dWFsLnNldFZhbHVlfWAsIGAke2V4cGVjdGVkLnNldFZhbHVlfWAsIGN1c3RvbUVxdWFsaXR5VGVzdGVycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UgPSBwYXNzID8gJ0JpbmRlcnMgYXJlIGVxdWFsJyA6ICdCaW5kZXJzIGFyZSBub3QgZXF1YWwnXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cblx0XHRvYmogPSB7fTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdGV4dGFyZWEnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuXHRcdG5vZGUudmFsdWUgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgdGV4dGFyZWEoKSwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGV4cGVjdChvYmoueCkudG9FcXVhbCgnZm9vJyk7XG5cdFx0b2JqLnggPSAnYmFyJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbCh0ZXh0YXJlYSgpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgcHJvZ3Jlc3MnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcm9ncmVzcycpO1xuXHRcdG5vZGUubWF4ID0gMztcbiAgICAgICAgbm9kZS52YWx1ZSA9IDE7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHByb2dyZXNzKCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoMSk7XG5cdFx0b2JqLnggPSAyO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKDIpO1xuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwocHJvZ3Jlc3MoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHRleHQgaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXHRcdG5vZGUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdmb28nO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBpbnB1dCgndGV4dCcpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcblx0XHRvYmoueCA9ICdiYXInO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdiYXInKTtcblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKGlucHV0KCd0ZXh0JykpO1xuXHR9KTtcblxuICAgIGl0KCdzaG91bGQgYmluZCBvdXRwdXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvdXRwdXQnKTtcbiAgICAgICAgbm9kZS5pbm5lckhUTUwgPSAnZm9vJztcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgb3V0cHV0KCksIG5vRGVib3VuY2VGbGFnKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG9iai54ID0gJ2Jhcic7XG5cdFx0ZXhwZWN0KG5vZGUuaW5uZXJIVE1MKS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgZXhwZWN0KGxvb2tGb3JCaW5kZXIobm9kZSkpLmJpbmRlcnNFcXVhbChvdXRwdXQoKSk7XG5cdH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIHNlbGVjdCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gbm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKSk7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBgJHtpfWA7XG4gICAgICAgICAgICBpZihpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIHNlbGVjdCgpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCcxJyk7XG5cdFx0b2JqLnggPSAnNSc7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJzUnKTtcblxuICAgICAgICBleHBlY3QobG9va0ZvckJpbmRlcihub2RlKSkuYmluZGVyc0VxdWFsKHNlbGVjdCgpKTtcblx0fSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgc2VsZWN0IChtdWx0aXBsZSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgbm9kZS5tdWx0aXBsZSA9IHRydWU7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJykpO1xuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYCR7aX1gO1xuICAgICAgICAgICAgaWYoaSA9PT0gMSB8fCBpID09PSA0IHx8IGkgPT09IDcpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgc2VsZWN0KHRydWUpLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKFsnMScsICc0JywgJzcnXSk7XG5cdFx0b2JqLnggPSBbJzInLCAnNScsICc4J107XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICAgICBub2RlLm9wdGlvbnNbaV0uc2VsZWN0ZWRcbiAgICAgICAgICAgICkudG9FcXVhbChcbiAgICAgICAgICAgICAgICBpID09PSAyIHx8IGkgPT09IDUgfHwgaSA9PT0gOFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4cGVjdChsb29rRm9yQmluZGVyKG5vZGUpKS5iaW5kZXJzRXF1YWwoc2VsZWN0KHRydWUpKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2RlZmF1bHRfYmluZGVyc19zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmFkZCcsICgpID0+IHtcbiAgICBpdCgnYWRkcyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWw1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5hZGQoW2VsMiwgZWwzLCBlbDQsIGVsNV0pXG4gICAgICAgIF0pLnRvRXF1YWwoW2VsMSwgZWwyLCBlbDMsIGVsNCwgZWw1XSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5jcmVhdGUnLCAoKSA9PiB7XG4gICAgaXQoJ2NyZWF0ZXMgZWxlbWVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicpLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdESVYnKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIGEgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZm9vYmFyJ1xuICAgICAgICAgICAgfSkuY2xhc3NOYW1lXG4gICAgICAgICkudG9FcXVhbCgnZm9vYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY3JlYXRlcyBjaGlsZGVuJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lOiAnc3BhbidcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSkuY2hpbGRyZW5bMF0udGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIGF0dHJpYnV0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5nZXRBdHRyaWJ1dGUoJ2ZvbycpXG4gICAgICAgICkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3Mgb2JqZWN0IHdpdGggdGFnTmFtZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdkaXYnXG4gICAgICAgICAgICB9KS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnRElWJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZXh0ZW5kcyBkYXRhc2V0IG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vJylcbiAgICAgICAgKS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuaW1wb3J0IHNpbXVsYXRlQ2xpY2sgZnJvbSAnLi4vLi4vbGliL3NpbXVsYXRlY2xpY2snO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGV2ZW50cycsICgpID0+IHtcbiAgICBsZXQgdGVzdFNhbmRib3g7XG4gICAgbGV0IGNoaWxkMTtcbiAgICBsZXQgY2hpbGQyO1xuICAgIGxldCBncmFuZGNoaWxkMTtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDFcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMlwiPjwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDEnKTtcbiAgICAgICAgY2hpbGQyID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMicpO1xuICAgICAgICBncmFuZGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkMScpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuICAgICAgICBzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuICAgICAgICBoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgJChbdGVzdFNhbmRib3gsIGNoaWxkMSwgY2hpbGQyLCBncmFuZGNoaWxkMV0pLm9mZignY2xpY2snKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgbmFtZXNwYWNlZCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBidWJibGluZyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKGNsaWNrIG9uIGdyYW5kY2hpbGRyZW4pJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdEb2VzblxcdCB0cmlnZ2VyIHdoZW4gY2xpY2tlZCBvbiB3cm9uZyBjaGlsZCcsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDInLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBub3Qgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1N0b3BzIHByb3BhZ2F0aW9uJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgJChjaGlsZDEpLm9uKCdjbGljaycsIGV2dCA9PiBldnQuc3RvcFByb3BhZ2F0aW9uKCkpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanNcbiAqKi8iLCIvLyBzaW11bGF0ZXMgY2xpY2sgb24gYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW11bGF0ZUNsaWNrKG5vZGUpIHtcbiAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICAgIGV2dC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5maW5kJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgZ3JhbmRDaGlsZDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBncmFuZENoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQodGVzdFNhbmRib3gpLmZpbmQoJy5ncmFuZGNoaWxkJylcbiAgICAgICAgXSkudG9FcXVhbChbZ3JhbmRDaGlsZF0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGluaXRpYWxpemF0aW9uJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0zXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIHdpbmRvdycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCh3aW5kb3cpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgZG9jdW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoZG9jdW1lbnQpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbChkb2N1bWVudCk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb252ZXJ0cyBhcnJheS1saWtlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChjaGlsZHJlbik7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoY2hpbGRyZW5baV0pLnRvRXF1YWwocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZWxlbWVudCkudG9FcXVhbChyZXN1bHRbMF0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsIHRlc3RTYW5kYm94KS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsICcud3JvbmctY29udGV4dCcpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKG51bGwpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcbiAgICAgICAgJC5mbi5iUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiBiUXVlcnlQbHVnaW4oKSB7XG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGhcbiAgICAgICAgICAgICkudG9FcXVhbChcbiAgICAgICAgICAgICAgICB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJykubGVuZ3RoXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKCQuZm4sICdiUXVlcnlQbHVnaW4nKTtcblxuICAgICAgICAkKCcqJywgdGVzdFNhbmRib3gpLmJRdWVyeVBsdWdpbigpO1xuXG4gICAgICAgIGV4cGVjdCgkLmZuLmJRdWVyeVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcbiAgICBpdCgnY2hlY2tzIGNsYXNzTmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKGVsKS5pcygnLmVsJylcbiAgICAgICAgKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwyJylcbiAgICAgICAgKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuICAgIGl0KCdleGNsdWRlcyBieSBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5ub3QoJy5lbDInKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvbm90X3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgKCkgPT4ge1xuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMlwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQub25lKCcqJywgdGVzdFNhbmRib3gpXG4gICAgICAgICkudG9FcXVhbChjaGlsZCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5wYXJzZUhUTUwnLCAoKSA9PiB7XG4gICAgaXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPHRkPjwvdGQ+PHRkPjwvdGQ+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgQ2xhc3MgZnJvbSAnc3JjL2NsYXNzJztcblxuZGVzY3JpYmUoJ0NsYXNzIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdhbGxvd3MgdG8gaW5oZXJpdCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgQSA9IENsYXNzKHsgYTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIEIgPSBDbGFzcyh7IGI6IHRydWUsIGV4dGVuZHM6IEEgfSksXG4gICAgICAgICAgICBDID0gQ2xhc3MoeyBjOiB0cnVlLCBleHRlbmRzOiBCIH0pLFxuICAgICAgICAgICAgaW5zdCA9IG5ldyBDO1xuXG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEIpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDKS50b0JlVHJ1dGh5KCk7XG5cbiAgICAgICAgZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdC5iKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0LmMpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBzdGF0aWMgcHJvcHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IEEgPSBDbGFzcyh7fSwgeyBzdGF0aWNQcm9wOiB0cnVlIH0pO1xuICAgICAgICBleHBlY3QoQS5zdGF0aWNQcm9wKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5zdCA9IG5ldyBDbGFzcyh7IGE6IHRydWUgfSk7XG4gICAgICAgIGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDbGFzcykudG9CZUZhbHN5KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xhc3MocHJvdG90eXBlLCBzdGF0aWNQcm9wcykge1xuICAgIGNvbnN0IENvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBPYmplY3RcbiAgICAgICAgICAgID8gcHJvdG90eXBlLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICA6IGZ1bmN0aW9uIEVtcHR5Q29uc3RydWN0b3IoKSB7fSxcbiAgICAgICAgLy9leHRlbmRzIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgUGFyZW50ID0gcHJvdG90eXBlLmV4dGVuZHMgfHwgcHJvdG90eXBlLmV4dGVuZCxcbiAgICAgICAgLy9pbmhlcml0IHByb3RvIGZyb20gY2xhc3MgcGFyZW50IG9yIGVtcHR5IG9iamVjdFxuICAgICAgICBwcm90byA9IE9iamVjdC5jcmVhdGUoUGFyZW50ID8gUGFyZW50LnByb3RvdHlwZSA6IHt9KTtcblxuICAgIGV4dGVuZChwcm90bywgcHJvdG90eXBlKTtcblxuICAgIGlmICh0eXBlb2Ygc3RhdGljUHJvcHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGV4dGVuZChDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIH1cblxuICAgIC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgcHJvdG8uaW5zdGFuY2VPZiA9IGZ1bmN0aW9uIGluc3RhbmNlT2YoKSB7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3I7XG4gICAgfTtcblxuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvO1xuXG4gICAgLy8gaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZVxuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ2xhc3MpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzcy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChNYXRyZXNoa2EuT2JqZWN0IGFuZCBNYXRyZXNoa2EuQXJyYXkpJywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5PYmplY3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgY2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2gobmV3IE1LLkFycmF5KHt9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICB5OiBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBhOiB7fVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngueS5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChiYXNpYyknLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjdHggPSB7fTtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcbiAgICAgICAgY29uc3QgYiA9IG9iai5hLmI7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShiLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICB0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGMgPSBvYmouYS5jO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKGMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICBvYmouYS5iLmMgPSA1NTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgY29ycmVjdCBjb250ZXh0IGZvciBkZWxlZ2F0ZWQgZXZlbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBsZXQgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZnVuY3Rpb24gaGFuZGxlKCkge1xuICAgICAgICAgICAgYm9vbCA9IHRoaXMgPT09IGN0eDtcbiAgICAgICAgfSwgY3R4KTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQ2hhbmdlIGV2ZW50IChzaW1wbGUgYW5kIGRlbGVnYXRlZCknLCAoKSA9PiB7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIG9iai5hLmIgPSBudWxsO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsICgpID0+IHtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb2JqID0ge307XG4gICAgICAgIGN0eCA9IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2F2b2lkcyBjb25mbGljdHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMSkpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTIpKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9FcXVhbCgxMTEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIGFyZ3MpJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBuYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG54ZGVzY3JpYmUoXCJFdmVudHMgY29yZTogX2FkZERPTUxpc3RlbmVyLCBfcmVtb3ZlRE9NTGlzdGVuZXJcIiwgKCkgPT4ge1xuICAgIGxldCBxID0gKHMsIGMpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgIGV2LmluaXRNb3VzZUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuICAgICAgICAgICAgICAgICAgICAwIC8qbGVmdCovICwgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuICAgICAgICB0YWdOYW1lOiAnRElWJyxcbiAgICAgICAgaWQ6ICdkLXRlc3QnLFxuICAgICAgICBpbm5lckhUTUw6IGBcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkLXRlc3QtMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH0pKTtcblxuXG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cblxuICAgIGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIGFuZCByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4JywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yIChidWJibGluZyB0ZXN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCBhbmQgZG9lc25cXCd0IHJlbW92ZSBldmVudHMgZnJvbSBvdGhlciBub2RlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdFdmVudHMgc3VtbWFyeSAob24sIG9mZiknLCAoKSA9PiB7XG4gICAgbGV0IHEgPSAocywgYykgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgZXYuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG4gICAgICAgICAgICAgICAgICAgIDAgLypsZWZ0Ki8gLCBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGxldCBub2RlID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG4gICAgICAgIHRhZ05hbWU6ICdESVYnLFxuICAgICAgICBpZDogJ3MtdGVzdCcsXG4gICAgICAgIGlubmVySFRNTDogYFxuICAgICAgICAgICAgPGRpdiBpZD1cInMtdGVzdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfSkpO1xuXG4gICAgbm9kZS5jbGljayA9IG5vZGUuY2xpY2sgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snKSk7XG4gICAgfVxuXG4gICAgaXQoJ2ZpcmVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMub2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtay5vbignc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLm9mZignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG5cbiAgICBpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBtYWdpYy5vbmNlKG9iaiwge1xuICAgICAgICAgICAgZm9vOiBmMSxcbiAgICAgICAgICAgIGJhcjogZjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoaikudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBtay5vbmNlKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBmMSA9IGV2dCA9PiBpKyssXG4gICAgICAgICAgICBmMiA9IGV2dCA9PiBqKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnb25EZWJvdW5jZSB3b3JrcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA4MDApO1xuXG4gICAgICAgIG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uXCIgYW5kIFwib2ZmXCInLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgICAgICAgZm9vOiAoKSA9PiBpKyssXG4gICAgICAgICAgICAgICAgYmFyOiAoKSA9PiBpKytcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgTUsub24ob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcblxuICAgICAgICBNSy5vZmYob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMik7XG4gICAgfSk7XG5cblxuICAgIGl0KCdhbGxvd3MgdG8gZmxpcCBjb250ZXh0IGFuZCB0cmlnZ2VyT25Jbml0IChvbiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIHRoaXNBcmcgPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRydWUsIHRoaXNBcmcpO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2JhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRoaXNBcmcsIHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1wiOiA1MCxcblx0XCIuL19iaW5kaW5ncy9nZXRub2Rlcy5qc1wiOiAyNixcblx0XCIuL19iaW5kaW5ncy9yZW1vdmViaW5kaW5nLmpzXCI6IDQ5LFxuXHRcIi4vX2JpbmRpbmdzL3J1bm5vZGVoYW5kbGVyLmpzXCI6IDU0LFxuXHRcIi4vX2JpbmRpbmdzL3J1bm9iamVjdGhhbmRsZXIuanNcIjogNTUsXG5cdFwiLi9fYmluZGluZ3Mvc2VsZWN0bm9kZXMuanNcIjogMjcsXG5cdFwiLi9fYmluZGluZ3Mvc3dpdGNoYmluZGluZy5qc1wiOiA0NSxcblx0XCIuL19jb3JlL2RlZmluZXByb3AuanNcIjogMjAsXG5cdFwiLi9fY29yZS9kZWZzLmpzXCI6IDE5LFxuXHRcIi4vX2NvcmUvaW5pdC5qc1wiOiAxOCxcblx0XCIuL19kb20vZGVmYXVsdC1kb2xsYXIuanNcIjogMzAsXG5cdFwiLi9fZG9tL2luZGV4LmpzXCI6IDI5LFxuXHRcIi4vX2V2ZW50cy9hZGRsaXN0ZW5lci5qc1wiOiA1Nixcblx0XCIuL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA1OCxcblx0XCIuL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanNcIjogNDgsXG5cdFwiLi9fZXZlbnRzL3RyaWdnZXJvbmUuanNcIjogMjIsXG5cdFwiLi9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiA0Nyxcblx0XCIuL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1wiOiAyMyxcblx0XCIuL191dGlsL2RlYm91bmNlLmpzXCI6IDU3LFxuXHRcIi4vX3V0aWwvaXMuanNcIjogMjUsXG5cdFwiLi9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1wiOiAyNCxcblx0XCIuL191dGlsL3RvYXJyYXkuanNcIjogMjgsXG5cdFwiLi9hcnJheS5qc1wiOiA4Nyxcblx0XCIuL2JpbmRlcnMvX2NsYXNzbGlzdC5qc1wiOiA3LFxuXHRcIi4vYmluZGVycy9hdHRyLmpzXCI6IDksXG5cdFwiLi9iaW5kZXJzL2NsYXNzbmFtZS5qc1wiOiA2LFxuXHRcIi4vYmluZGVycy9kYXRhc2V0LmpzXCI6IDE2LFxuXHRcIi4vYmluZGVycy9kaXNwbGF5LmpzXCI6IDUsXG5cdFwiLi9iaW5kZXJzL2h0bWwuanNcIjogNCxcblx0XCIuL2JpbmRlcnMvaW5kZXguanNcIjogMyxcblx0XCIuL2JpbmRlcnMvaW5wdXQuanNcIjogMTAsXG5cdFwiLi9iaW5kZXJzL291dHB1dC5qc1wiOiA1Myxcblx0XCIuL2JpbmRlcnMvcHJvZ3Jlc3MuanNcIjogMTMsXG5cdFwiLi9iaW5kZXJzL3Byb3AuanNcIjogOCxcblx0XCIuL2JpbmRlcnMvc2VsZWN0LmpzXCI6IDEyLFxuXHRcIi4vYmluZGVycy9zdHlsZS5qc1wiOiAxNSxcblx0XCIuL2JpbmRlcnMvdGV4dC5qc1wiOiAxNCxcblx0XCIuL2JpbmRlcnMvdGV4dGFyZWEuanNcIjogMTEsXG5cdFwiLi9iaW5kbm9kZS5qc1wiOiAxNyxcblx0XCIuL2JpbmRvcHRpb25hbG5vZGUuanNcIjogNjEsXG5cdFwiLi9iaW5kc2FuZGJveC5qc1wiOiA2Mixcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAzOSxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAzMyxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAzMixcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogNDIsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDM3LFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogNDQsXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMzEsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogNDAsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDQzLFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiA0MSxcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAzOCxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMzYsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDM1LFxuXHRcIi4vY2xhc3MuanNcIjogNzksXG5cdFwiLi9kZWZhdWx0YmluZGVycy5qc1wiOiA1Mixcblx0XCIuL2V4dGVuZC5qc1wiOiAzNCxcblx0XCIuL2luZGV4LmpzXCI6IDg4LFxuXHRcIi4vbG9va2ZvcmJpbmRlci5qc1wiOiA1MSxcblx0XCIuL21hZ2ljLmpzXCI6IDkxLFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDg5LFxuXHRcIi4vb2JqZWN0L2luZGV4LmpzXCI6IDkwLFxuXHRcIi4vb24uanNcIjogOTIsXG5cdFwiLi9zZWxlY3QuanNcIjogNjMsXG5cdFwiLi9zZWxlY3RhbGwuanNcIjogNjQsXG5cdFwiLi9zZXQuanNcIjogMjEsXG5cdFwiLi91bmJpbmRub2RlLmpzXCI6IDQ2XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDg2O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDg2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXkuanNcbiAqKi8iLCJpbXBvcnQgTWF0cmVzaGthIGZyb20gJy4vbWF0cmVzaGthJztcbmltcG9ydCBNYXRyZXNoa2FBcnJheSBmcm9tICcuL2FycmF5JztcbmltcG9ydCBNYXRyZXNoa2FPYmplY3QgZnJvbSAnLi9vYmplY3QnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4vY2xhc3MnO1xuLy9pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuXG5NYXRyZXNoa2EuQXJyYXkgPSBNYXRyZXNoa2FBcnJheTtcbk1hdHJlc2hrYS5PYmplY3QgPSBNYXRyZXNoa2FPYmplY3Q7XG5NYXRyZXNoa2EuQ2xhc3MgPSBDbGFzcztcbi8vTWF0cmVzaGthLmJpbmRlcnMgPSBiaW5kZXJzO1xuXG5leHBvcnQgZGVmYXVsdCBNYXRyZXNoa2E7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBDbGFzcyBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzKHtcbiAgICAvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuICAgIC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG4gICAgZXh0ZW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hdHJlc2hrYS9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYmplY3QvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFnaWMuanNcbiAqKi8iLCJcbi8vIC9eKChbXkBdKylAKT8oKC4rPykoOjooW15cXChcXCldKyk/KFxcKCguKilcXCkpPyk/KT8kL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbigpIHtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24uanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9