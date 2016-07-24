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
	
	var componentsContext = __webpack_require__(57);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 2,
		"./bquery/add_spec.js": 39,
		"./bquery/create_spec.js": 40,
		"./bquery/events_spec.js": 41,
		"./bquery/find_spec.js": 43,
		"./bquery/init_spec.js": 44,
		"./bquery/is_spec.js": 45,
		"./bquery/not_spec.js": 46,
		"./bquery/one_spec.js": 47,
		"./bquery/parsehtml_spec.js": 48,
		"./class_spec.js": 49,
		"./events/delegated_collection_spec.js": 51,
		"./events/delegated_spec.js": 52,
		"./events/events_change_spec.js": 53,
		"./events/events_core_spec.js": 54,
		"./events/events_dom_spec.js": 55,
		"./events/events_summary_spec.js": 56
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
	
	var bindNode = __webpack_require__(3);
	
	var unbindNode = __webpack_require__(34);
	
	var addListener = __webpack_require__(33);
	
	var makeObject = __webpack_require__(38);
	
	var createSpy = __webpack_require__(72);
	
	describe('Bindings', function () {
		var obj = void 0;
		var node = void 0;
		var node2 = void 0;
		var binder = void 0;
		var simulateDomEvent = void 0;
		var initializeCall = void 0;
		var destroyCall = void 0;
		var noDebounceFlag = { debounce: false };
	
		// TODO: isMK, bind event
	
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
			node = document.createElement('span');
			node2 = document.createElement('span');
	
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
					this.ondummyevent = function () {};
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
	
		xit('should unbind and trigger events', function () {
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
			expect([...obj.$nodes.x]).toEqual([node]);
		});
	
		xit('should unbind a property in context object which has isMK=true property', function () {
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
			node.ondummyevent({});
			expect(obj.x.y.z).toEqual('bar');
		});
	
		xit('should unbind delegated target', function () {
			var obj = makeObject('x.y');
			bindNode(obj, 'x.y.z', node, binder, noDebounceFlag);
			unbindNode(obj, 'x.y.z', node);
			obj.x.y.z = 'foo';
			expect(node.value).toEqual('');
			node.value = 'bar';
			node.ondummyevent({});
			expect(obj.x.y.z).toEqual('foo');
		});
	
		it('cancels deep binding when deep=false option is passed', function () {
			bindNode(obj, 'x.y.z', node, binder, Object.assign({
				deep: false
			}, noDebounceFlag));
			testSimpleBind('x.y.z');
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(4);
	
	var defineProp = __webpack_require__(6);
	
	var getNodes = __webpack_require__(12);
	
	var switchBinding = __webpack_require__(67);
	
	var bindSingleNode = __webpack_require__(30);
	
	var checkObjectType = __webpack_require__(9);
	
	var MatreshkaError = __webpack_require__(10);
	
	var delegateListener = __webpack_require__(36);
	
	var unbindNode = __webpack_require__(34);
	
	// The main method of the framework: binds a property of an object to HTML node
	module.exports = bindNode;
	function bindNode(object, key, node) {
	    var binder = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	    var evt = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
	
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
	
	    var _initMK = initMK(object);
	
	    var props = _initMK.props;
	    var _evt = evt;
	    var optional = _evt.optional;
	    var deep = _evt.deep;
	    var silent = _evt.silent;
	
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
	
	    var deepPath = key.split('.');
	    var deepPathLength = deepPath.length;
	
	    if (deep !== false && deepPathLength > 1) {
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
	
	        delegateListener(object, deepPath.slice(0, deepPathLength - 2), 'change:' + deepPath[deepPathLength - 2], changeHandler);
	
	        changeHandler();
	
	        return object;
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
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
	    } */
				},
				// "props" contains special information about properties (getters, setters etc)
				props: {
					/*example: {
	    	? nodes: core.$(),
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var set = __webpack_require__(7);
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var triggerOne = __webpack_require__(8);
	
	var checkObjectType = __webpack_require__(9);
	
	var is = __webpack_require__(11);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaError = __webpack_require__(10);
	
	module.exports = function (object, method) {
	    var typeofObject = object === null ? 'null' : typeof object;
	
	    if (typeofObject !== 'object') {
	        throw MatreshkaError('common:object_type', {
	            type: typeofObject,
	            method: method
	        });
	    }
	};

/***/ },
/* 10 */
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
			var nodes = _ref2.nodes;
	
			var missing = !$nodes ? '$nodes' : 'nodes';
			return bindingErrorPrefix + ' "' + missing + '" property of Matreshka instance is missing. ' + 'It must be an object and must not be reassigned.';
		},
		'common:object_type': function (_ref3) {
			var type = _ref3.type;
			var method = _ref3.method;
	
			return 'Method "' + method + '" does not accept ' + type + ' as target object';
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

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	// determines whether two values are the same value
	var isPolyfill = function (v1, v2) {
	    return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
	};
	
	module.exports = Object.is || isPolyfill;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(13);
	
	var dom = __webpack_require__(14);
	
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(15);
	
	var dom = {
		$: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(16);
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	var extend = __webpack_require__(19);
	
	var parseHTML = __webpack_require__(20);
	
	var one = __webpack_require__(21);
	
	var create = __webpack_require__(22);
	
	var on = __webpack_require__(23);
	
	var off = __webpack_require__(26);
	
	var is = __webpack_require__(25);
	
	var add = __webpack_require__(27);
	
	var not = __webpack_require__(28);
	
	var find = __webpack_require__(29);
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(18);
	
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(18);
	
	var Init = __webpack_require__(17);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
		return new Init(html2nodeList(html));
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
		return new Init(s, context)[0];
	}

/***/ },
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(24);
	
	var is = __webpack_require__(25);
	
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
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
		nodeIndex: 0,
		allEvents: {}
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
		var node = this[0];
		return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(24);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	var data = __webpack_require__(24);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(31);
	
	var runNodeHandler = __webpack_require__(70);
	
	var runObjectHandler = __webpack_require__(69);
	
	var triggerOne = __webpack_require__(8);
	
	var addListener = __webpack_require__(33);
	
	var is = __webpack_require__(11);
	
	var debounce = __webpack_require__(66);
	
	var dom = __webpack_require__(14);
	
	var set = __webpack_require__(7);
	
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
	    var value = propDef.value;
	
	    var options = {
	        self: object,
	        key: key,
	        value: value,
	        $nodes: $nodes,
	        node: node
	    };
	    // create bindings array in property definition object
	    var bindings = propDef.bindings = propDef.bindings || [];
	    var isUndefined = typeof value == 'undefined';
	    var binder = void 0;
	    var objectHandler = void 0;
	
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
	        var _value = getValue.call(node, options);
	        isUndefined = typeof _value === 'undefined';
	
	        var _result2 = { fromNode: true };
	
	        for (var _source4 = evt, _keys4 = Object.keys(_source4), _l4 = _keys4.length, _i4 = 0, _key4; _i4 < _l4; _i4++) {
	            _key4 = _keys4[_i4];
	            _result2[_key4] = _source4[_key4];
	        }
	
	        set(object, key, _value, _result2);
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
	        (function () {
	            var nodeHandler = function (domEvent) {
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
	
	            // add binding data to bindings array
	            bindings.push({
	                on: on,
	                node: node,
	                binder: binder,
	                objectHandler: objectHandler,
	                nodeHandler: nodeHandler,
	                options: options
	            });
	
	            if (typeof on == 'function') {
	                on.call(node, nodeHandler, options);
	            } else {
	                dom.$(node).on(on, nodeHandler);
	            }
	        })();
	    }
	
	    // fire events
	    if (!silent) {
	        var _result3 = {
	            key: key,
	            $nodes: $nodes,
	            node: node
	        };
	
	        for (var _source6 = evt, _keys6 = Object.keys(_source6), _l6 = _keys6.length, _i6 = 0, _key6; _i6 < _l6; _i6++) {
	            _key6 = _keys6[_i6];
	            _result3[_key6] = _source6[_key6];
	        }
	
	        var extendedEvt = _result3;
	
	        triggerOne(object, 'bind:' + key, extendedEvt);
	        triggerOne(object, 'bind', extendedEvt);
	    }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(32);
	
	module.exports = function (node) {
	    var result, i;
	
	    for (i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(4);
	
	var triggerOne = __webpack_require__(8);
	
	var defineProp = __webpack_require__(6);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(9);
	
	var initMK = __webpack_require__(4);
	
	var getNodes = __webpack_require__(12);
	
	var removeListener = __webpack_require__(35);
	
	var bindNode = __webpack_require__(3);
	
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
	    * this.unbindNode(['a', 'b', 'c'], node)
	    */
			} else {
				for (var _target2 = key, _index2 = 0, _ref, _l2 = _target2.length; _ref = _target2[_index2], _index2 < _l2; _index2++) {
					var itemKey = _ref.key;
					var itemNode = _ref.node;
	
					unbindNode(object, itemKey, itemNode, node);
				}
				/*
	    * this.unbindNode([{key, node, binder, event}], { silent: true });
	    */
	
			}
	
			return object;
		}
	
		/*
	  * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
	  */
		if (key && typeof key === 'object') {
			for (var _target3 = key, _keys = Object.keys(_target3), _i = 0, keyObjKey, keyObjValue, _l3 = _keys.length; (keyObjKey = _keys[_i], keyObjValue = _target3[keyObjKey]), _i < _l3; _i++) {
				unbindNode(object, keyObjKey, keyObjValue, node)
			}
	
			return object;
		}
	
		var _initMK = initMK(object);
	
		var props = _initMK.props;
	
		var propDef = props[key];
	
		if (!propDef) {
			return object;
		}
	
		var bindings = propDef.bindings;
	
	
		if (!bindings) {
			return object;
		}
	
		// TODO make sure to update $nodes for Matreshka instances
	
		if (key === null) {
			// TODO remove all bindings
	
			return object;
		}
	
		var deepPath = key.split('.');
		//if (evt.deep !== false && deepPath.length > 1) {
		// TODO
		//}
	
		if (!node) {
			// TODO remove all bindings for given key
		}
	
		var $nodes = getNodes(object, node);
		var retainBindings = [];
	
		for (var _target5 = $nodes, _index4 = 0, nodesItem, _l5 = _target5.length; nodesItem = _target5[_index4], _index4 < _l5; _index4++) {
			for (var _target4 = bindings, _index3 = 0, binding, _l4 = _target4.length; binding = _target4[_index3], _index3 < _l4; _index3++) {
				var on = binding.on;
				var node = binding.node;
				var binder = binding.binder;
				var nodeHandler = binding.nodeHandler;
				var objectHandler = binding.objectHandler;
				var options = binding.options;
	
	
				if (node === nodesItem) {
					var destroy = binder.destroy;
	
	
					if (typeof on === 'function') {
						nodeHandler.disabled = true;
					} else {
						dom.$(node).off(on, nodeHandler);
					}
					removeListener(object, '_change:bindings:' + key, objectHandler);
	
					if (destroy) {
						destroy.call(node, options);
					}
				} else {
					retainBindings.push(binding);
				}
			}
			// TODO move to the top ?
	
		}
	
		propDef.bindings = retainBindings;
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var triggerOne = __webpack_require__(8);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var undelegateListener = __webpack_require__(37);
	
	var triggerOne = __webpack_require__(8);
	
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var $ = __webpack_require__(16);
	
	var simulateClick = __webpack_require__(42);
	
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
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.fn.not', function () {
		it('checks className', function () {
			var el = document.createElement('div');
			el.className = 'el';
	
			expect($(el).is('.el')).toEqual(true);
	
			expect($(el).is('.el2')).toEqual(false);
		});
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.one', function () {
		it('finds', function () {
			var testSandbox = document.createElement('div');
	
			testSandbox.innerHTML = '\n\t\t<div class="child">\n\t\t\t<div class="grandchild"></div>\n\t\t</div>\n\t\t<div class="child2">\n\t\t\t<div class="grandchild2"></div>\n\t\t</div>\n\t\t';
	
			var child = testSandbox.querySelector('.child');
	
			expect($.one('*', testSandbox)).toEqual(child);
		});
	});

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(50);
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(19);
	
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
/* 51 */
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(36);
	
	var undelegateListener = __webpack_require__(37);
	
	var triggerOne = __webpack_require__(8);
	
	var makeObject = __webpack_require__(38);
	
	var createSpy = __webpack_require__(72);
	
	describe('Delegated events: delegateListener, undelegateListener (basic)', function test() {
		var _this = this;
	
		var ctx = void 0,
		    handler = void 0;
	
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var delegateListener = __webpack_require__(36);
	
	var undelegateListener = __webpack_require__(37);
	
	var removeListener = __webpack_require__(35);
	
	var makeObject = __webpack_require__(38);
	
	var createSpy = __webpack_require__(72);
	
	describe('Change event (simple and delegated)', function test() {
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(33);
	
	var removeListener = __webpack_require__(35);
	
	var triggerOne = __webpack_require__(8);
	
	var createSpy = __webpack_require__(72);
	
	describe('Events core: addListener, removeListener, triggerOne', function test() {
		var obj = void 0,
		    ctx = void 0,
		    handler = void 0;
	
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
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 30,
		"./_bindings/defaultbinders.js": 32,
		"./_bindings/getnodes.js": 12,
		"./_bindings/lookforbinder.js": 31,
		"./_bindings/runnodehandler.js": 70,
		"./_bindings/runobjecthandler.js": 69,
		"./_bindings/selectnodes.js": 13,
		"./_bindings/switchbinding.js": 67,
		"./_core/defineprop.js": 6,
		"./_core/defs.js": 5,
		"./_core/init.js": 4,
		"./_dom/default-dollar.js": 15,
		"./_dom/index.js": 14,
		"./_events/addlistener.js": 33,
		"./_events/delegatelistener.js": 36,
		"./_events/removelistener.js": 35,
		"./_events/triggerone.js": 8,
		"./_events/undelegatelistener.js": 37,
		"./_util/checkobjecttype.js": 9,
		"./_util/debounce.js": 66,
		"./_util/is.js": 11,
		"./_util/matreshkaerror.js": 10,
		"./array.js": 58,
		"./binders.js": 59,
		"./bindnode.js": 3,
		"./bquery/_data.js": 24,
		"./bquery/_html2nodelist.js": 18,
		"./bquery/_init.js": 17,
		"./bquery/add.js": 27,
		"./bquery/create.js": 22,
		"./bquery/find.js": 29,
		"./bquery/index.js": 16,
		"./bquery/is.js": 25,
		"./bquery/not.js": 28,
		"./bquery/off.js": 26,
		"./bquery/on.js": 23,
		"./bquery/one.js": 21,
		"./bquery/parsehtml.js": 20,
		"./class.js": 50,
		"./extend.js": 19,
		"./index.js": 61,
		"./magic.js": 64,
		"./matreshka/index.js": 62,
		"./object/index.js": 63,
		"./on.js": 65,
		"./set.js": 7,
		"./unbindnode.js": 34
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
	webpackContext.id = 57;


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
/* 60 */,
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(62);
	
	var MatreshkaArray = __webpack_require__(58);
	
	var MatreshkaObject = __webpack_require__(63);
	
	var Class = __webpack_require__(50);
	
	var binders = __webpack_require__(59);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(19);
	
	var Class = __webpack_require__(50);
	
	module.exports = Class({
		// instance properies and methods
	
	}, {
		// static properties and methods
		extend: extend
	});

/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = debounce;
	function debounce(func, delay, thisArg) {
		var timeout = void 0;
		if (typeof delay !== 'number') {
			thisArg = delay;
			delay = 0;
		}
	
		delay = delay || 0;
	
		return function () {
			var args = arguments;
			var a1 = args[0];
			var a2 = args[1];
			var a3 = args[2];
	
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
					case 3:
						func.call(callContext, a1, a2, a3);
						break;
					default:
						func.apply(callContext, args);
				}
			}, delay);
		};
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';
	
	// re-adds binding when object branch is changed
	// the function is called by bindNode when something like 'foo.bar.baz' is passed to it as key arg value
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
/* 68 */,
/* 69 */
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
	
	    var dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? value + '' : value;
	
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(11);
	
	var set = __webpack_require__(7);
	
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
/* 71 */,
/* 72 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = createSpy;
	function createSpy() {
		var spyName = "randomName" + Math.random() + new Date().getTime();
		var spy = function () {};
		var spyObj = {};
		spyObj[spyName] = spy;
		return spyOn(spyObj, spyName);;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWFlZDJiODE1ZWVjMWU1M2ZmYzIiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VuYmluZG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvbWFrZW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hZ2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3J1bm5vZGVoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL2NyZWF0ZXNweS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JDQSxLQUFNLDJCQUEyQixFQUEzQjs7OztBQUlOLEtBQU0sZUFBZSxzQkFBZjs7QUFFTixVQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDekIsU0FBTyx5QkFBeUIsT0FBekIsQ0FBaUMsSUFBakMsS0FBMEMsQ0FBMUMsQ0FEa0I7RUFBMUI7O0FBSUEsS0FBSSxXQUFXLGFBQWEsSUFBYixHQUFvQixNQUFwQixDQUEyQixVQUEzQixDQUFYOzs7QUFHSixLQUFJLENBQUMsU0FBUyxNQUFULEVBQWlCO0FBQ3JCLGFBQVcsYUFBYSxJQUFiLEVBQVgsQ0FEcUI7RUFBdEI7O0FBSUEsVUFBUyxPQUFULENBQWlCLFlBQWpCOztBQUdBLEtBQU0sb0JBQW9CLHVCQUFwQjtBQUNOLG1CQUFrQixJQUFsQixHQUF5QixPQUF6QixDQUFpQyxpQkFBakMsRTs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBaUMsdURBQXVEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7b0NDOUJxQjs7c0NBQ0U7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QUZ1QjtBQUduQyxNQUFNLFNBQVMsRUFBVCxDQUg2QjtBQUluQyxTQUFPLE9BQVAsSUFBa0IsR0FBbEIsQ0FKbUM7QUFLbkMsU0FBTyxNQUFNLE1BQU4sRUFBYyxPQUFkLENBQVAsQ0FMbUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhYWVkMmI4MTVlZWMxZTUzZmZjMlxuICoqLyIsIi8vIFRoaXMgZ2V0cyByZXBsYWNlZCBieSBrYXJtYSB3ZWJwYWNrIHdpdGggdGhlIHVwZGF0ZWQgZmlsZXMgb24gcmVidWlsZFxuY29uc3QgX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fID0gW107XG5cbi8vIHJlcXVpcmUgYWxsIG1vZHVsZXMgZW5kaW5nIGluIFwiX3Rlc3RcIiBmcm9tIHRoZVxuLy8gY3VycmVudCBkaXJlY3RvcnkgYW5kIGFsbCBzdWJkaXJlY3Rvcmllc1xuY29uc3QgdGVzdHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuL3NwZWMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5cbmZ1bmN0aW9uIGluTWFuaWZlc3QocGF0aCkge1xuXHRyZXR1cm4gX19rYXJtYVdlYnBhY2tNYW5pZmVzdF9fLmluZGV4T2YocGF0aCkgPj0gMDtcbn1cblxubGV0IHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKS5maWx0ZXIoaW5NYW5pZmVzdCk7XG5cbi8vIFJ1biBhbGwgdGVzdHMgaWYgd2UgZGlkbid0IGZpbmQgYW55IGNoYW5nZXNcbmlmICghcnVubmFibGUubGVuZ3RoKSB7XG5cdHJ1bm5hYmxlID0gdGVzdHNDb250ZXh0LmtleXMoKTtcbn1cblxucnVubmFibGUuZm9yRWFjaCh0ZXN0c0NvbnRleHQpO1xuXG5cbmNvbnN0IGNvbXBvbmVudHNDb250ZXh0ID0gcmVxdWlyZS5jb250ZXh0KCcuLi9zcmMvJywgdHJ1ZSwgLy4qXFwuanMkLyk7XG5jb21wb25lbnRzQ29udGV4dC5rZXlzKCkuZm9yRWFjaChjb21wb25lbnRzQ29udGV4dCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvaW5kZXguanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYmluZGluZ3MvYmluZGluZ3Nfc3BlYy5qc1wiOiAyLFxuXHRcIi4vYnF1ZXJ5L2FkZF9zcGVjLmpzXCI6IDM5LFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXCI6IDQwLFxuXHRcIi4vYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXCI6IDQxLFxuXHRcIi4vYnF1ZXJ5L2ZpbmRfc3BlYy5qc1wiOiA0Myxcblx0XCIuL2JxdWVyeS9pbml0X3NwZWMuanNcIjogNDQsXG5cdFwiLi9icXVlcnkvaXNfc3BlYy5qc1wiOiA0NSxcblx0XCIuL2JxdWVyeS9ub3Rfc3BlYy5qc1wiOiA0Nixcblx0XCIuL2JxdWVyeS9vbmVfc3BlYy5qc1wiOiA0Nyxcblx0XCIuL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1wiOiA0OCxcblx0XCIuL2NsYXNzX3NwZWMuanNcIjogNDksXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qc1wiOiA1MSxcblx0XCIuL2V2ZW50cy9kZWxlZ2F0ZWRfc3BlYy5qc1wiOiA1Mixcblx0XCIuL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcIjogNTMsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qc1wiOiA1NCxcblx0XCIuL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcIjogNTUsXG5cdFwiLi9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1wiOiA1NlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRyZXR1cm4gbWFwW3JlcV0gfHwgKGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKSB9KCkpO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAxO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Rlc3Qvc3BlYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICdzcmMvYmluZG5vZGUnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnc3JjL3VuYmluZG5vZGUnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdCaW5kaW5ncycsICgpID0+IHtcblx0bGV0IG9iajtcblx0bGV0IG5vZGU7XG5cdGxldCBub2RlMjtcblx0bGV0IGJpbmRlcjtcblx0bGV0IHNpbXVsYXRlRG9tRXZlbnQ7XG5cdGxldCBpbml0aWFsaXplQ2FsbDtcblx0bGV0IGRlc3Ryb3lDYWxsO1xuXHRjb25zdCBub0RlYm91bmNlRmxhZyA9IHsgZGVib3VuY2U6IGZhbHNlIH07XG5cblx0Ly8gVE9ETzogaXNNSywgYmluZCBldmVudFxuXG5cdGNvbnN0IHRlc3RTaW1wbGVCaW5kID0gKGtleSA9ICd4JykgPT4ge1xuXHRcdG9ialtrZXldID0gJ2Zvbyc7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRub2RlLm9uZHVtbXlldmVudCgpO1xuXHRcdGV4cGVjdChvYmpba2V5XSkudG9FcXVhbCgnYmFyJyk7XG5cdFx0ZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH07XG5cblx0Y29uc3QgdGVzdFNpbXBsZVVuYmluZCA9ICgpID0+IHtcblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcblx0XHRub2RlLnZhbHVlID0gJ2Jheic7XG5cdFx0bm9kZS5vbmR1bW15ZXZlbnQoKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGV4cGVjdChkZXN0cm95Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9O1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0bm9kZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cblx0XHRpbml0aWFsaXplQ2FsbCA9IGNyZWF0ZVNweSgpO1xuXHRcdGRlc3Ryb3lDYWxsID0gY3JlYXRlU3B5KCk7XG5cblx0XHRiaW5kZXIgPSAge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMub25kdW1teWV2ZW50ID0gY2JjO1xuXHRcdFx0fSxcblx0XHRcdGdldFZhbHVlKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRzZXRWYWx1ZSh2KSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2O1xuXHRcdFx0fSxcblx0XHRcdGluaXRpYWxpemUobykge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gJyc7XG5cdFx0XHRcdGluaXRpYWxpemVDYWxsKCk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0dGhpcy5vbmR1bW15ZXZlbnQgPSAoKSA9PiB7fTtcblx0XHRcdFx0ZGVzdHJveUNhbGwoKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGRlYm91bmNlJywgZG9uZSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlcik7XG5cdFx0b2JqLnggPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0XHRub2RlLnZhbHVlID0gJ2Jhcic7XG5cdFx0XHRub2RlLm9uZHVtbXlldmVudCgpO1xuXHRcdFx0ZXhwZWN0KG9iai54KS50b0VxdWFsKCdiYXInKTtcblx0XHRcdGV4cGVjdChpbml0aWFsaXplQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDUwKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcblx0XHRjb25zdCBiaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuXHRcdGNvbnN0IGJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnYmluZCcsIGJpbmRDYWxsKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdiaW5kOngnLCBiaW5kS2V5Q2FsbCk7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdHRlc3RTaW1wbGVCaW5kKCk7XG5cdFx0ZXhwZWN0KGJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdFx0ZXhwZWN0KGJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdHhpdCgnc2hvdWxkIHVuYmluZCBhbmQgdHJpZ2dlciBldmVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgdW5iaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuXHRcdGNvbnN0IHVuYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQnLCB1bmJpbmRDYWxsKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQ6eCcsIHVuYmluZEtleUNhbGwpO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcblx0XHR1bmJpbmROb2RlKG9iaiwgJ3gnLCBub2RlKTtcblx0XHR0ZXN0U2ltcGxlVW5iaW5kKCk7XG5cdFx0ZXhwZWN0KHVuYmluZENhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0XHRleHBlY3QodW5iaW5kS2V5Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuXHRcdGJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0sIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdHRlc3RTaW1wbGVCaW5kKCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgdW5iaW5kIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcblx0XHRiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcblx0XHR1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuXHRcdHRlc3RTaW1wbGVVbmJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGFycmF5IG9mIG9iamVjdHMnLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dGVzdFNpbXBsZUJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcblx0XHRiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcblx0XHR1bmJpbmROb2RlKG9iaiwgW3sga2V5OiAneCcsIG5vZGUgfV0pO1xuXHRcdHRlc3RTaW1wbGVVbmJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRvYmogPSB7XG5cdFx0XHRpc01LOiB0cnVlLFxuXHRcdFx0bm9kZXM6IHt9LFxuXHRcdFx0JG5vZGVzOiB7fVxuXHRcdH07XG5cdFx0YmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dGVzdFNpbXBsZUJpbmQoKTtcblx0XHRleHBlY3Qob2JqLm5vZGVzLngpLnRvRXF1YWwobm9kZSk7XG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLm9iai4kbm9kZXMueFxuXHRcdF0pLnRvRXF1YWwoW25vZGVdKTtcblx0fSk7XG5cblx0eGl0KCdzaG91bGQgdW5iaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRvYmogPSB7XG5cdFx0XHRpc01LOiB0cnVlLFxuXHRcdFx0bm9kZXM6IHt9LFxuXHRcdFx0JG5vZGVzOiB7fVxuXHRcdH07XG5cdFx0YmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dW5iaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlKTtcblx0XHR0ZXN0U2ltcGxlVW5iaW5kKCk7XG5cdFx0ZXhwZWN0KG9iai5ub2Rlcy54KS50b0JlVW5kZWZpbmVkKCk7XG5cdFx0ZXhwZWN0KG9iai4kbm9kZXMueCkudG9CZVVuZGVmaW5lZCgpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcblx0XHRiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdG9iai54LnkueiA9ICdmb28nO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRub2RlLnZhbHVlID0gJ2Jhcic7XG5cdFx0bm9kZS5vbmR1bW15ZXZlbnQoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCB1bmJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcblx0XHRiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdHVuYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlKTtcblx0XHRvYmoueC55LnogPSAnZm9vJztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG5cdFx0bm9kZS52YWx1ZSA9ICdiYXInO1xuXHRcdG5vZGUub25kdW1teWV2ZW50KHt9KTtcblx0XHRleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcblx0fSk7XG5cblx0aXQoJ2NhbmNlbHMgZGVlcCBiaW5kaW5nIHdoZW4gZGVlcD1mYWxzZSBvcHRpb24gaXMgcGFzc2VkJywgKCkgPT4ge1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBPYmplY3QuYXNzaWduKHtcblx0XHRcdGRlZXA6IGZhbHNlXG5cdFx0fSwgbm9EZWJvdW5jZUZsYWcpKTtcblx0XHR0ZXN0U2ltcGxlQmluZCgneC55LnonKTtcblx0fSk7XG5cblx0eGl0KCdzaG91bGQgcmViaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0eDoge1xuXHRcdFx0XHRcdHk6IHt9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4LnkueicpO1xuXG5cdFx0b2JqLnggPSB7XG5cdFx0XHR5OiB7XG5cdFx0XHRcdHo6ICdmb28nXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHR4aXQoJ3Nob3VsZCByZW1vdmUgYmluZGluZyBpZiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0eDoge1xuXHRcdFx0XHRcdHk6IHt9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4LnkueicpLFxuXHRcdFx0eCA9IG9iai54O1xuXG5cdFx0b2JqLnggPSB7XG5cdFx0XHR5OiB7XG5cdFx0XHRcdHo6ICdmb28nXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGlucHV0LnZhbHVlID0gJ2Jhcic7XG5cdFx0aW5wdXQuX29ua2V5dXAoe30pO1xuXHRcdGV4cGVjdCh4Lnkueikubm90LnRvRXF1YWwoJ2JhcicpO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXG5cdFx0eC55LnogPSAnYmF6Jztcblx0XHRleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgndXNlcyBjdXN0b20gc2VsZWN0b3JzIG9uIGN1cnJlbnQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBNSy50byh7eDoge3k6ICdmb28nfX0pLFxuXHRcdCBcdGRpdiA9ICQuY3JlYXRlKCdkaXYnKSxcblx0XHRcdGlucHV0ID0gZGl2LmFwcGVuZENoaWxkKCQuY3JlYXRlKCdpbnB1dCcpKTtcblxuXHRcdG9iai5iaW5kTm9kZSgnc2FuZGJveCcsIGRpdik7XG5cdFx0b2JqLmJpbmROb2RlKCd4LnknLCAnOnNhbmRib3ggaW5wdXQnLCB7XG5cdFx0XHRvbihjYmMpIHtcblx0XHRcdFx0dGhpcy5fb25rZXl1cCA9IGNiYztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGV4cGVjdChpbnB1dC52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG5cdFx0aW5wdXQudmFsdWUgPSAnYmFyJztcblx0XHRpbnB1dC5fb25rZXl1cCh7fSk7XG5cdFx0ZXhwZWN0KG9iai54LnkpLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXG5cdHhpdCgndGhyb3dzIGVycm9yIHdoZW4gbm9kZSBpc25cXCd0IHRoZXJlJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGVycm9yID0gZmFsc2U7XG5cblx0XHR0cnkge1xuXHRcdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcpO1xuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0ZXJyb3IgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGV4cGVjdChlcnJvcikudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXHR4aXQoJ2RvZXNuXFwndCB0aHJvdyBlcnJvciB3aXRoIGJpbmRPcHRpb25hbE5vZGUgd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0bWFnaWMuYmluZE9wdGlvbmFsTm9kZShvYmosICd4Jyk7XG5cblx0XHRleHBlY3QodHJ1ZSkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0eGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIG1ldGhvZCBvZiBNYXRyZXNoa2Egd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LO1xuXG5cdFx0bWsuYmluZE9wdGlvbmFsTm9kZSgneCcsIG51bGwpO1xuXG5cdFx0ZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgncmV0dXJucyBib3VuZCBub2RlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4Jyk7XG5cblxuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy5ib3VuZChvYmosICd4JykpO1xuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy4kYm91bmQob2JqLCAneCcpWzBdKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgY2hpbGRyZW4gb2Ygc2FuZGJveCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHNwYW4+PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3Qob2JqLCAnc3BhbicpLnRhZ05hbWUpO1xuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS50YWdOYW1lKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxzcGFuPjwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJykudGFnTmFtZSk7XG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggc3BhbicpWzBdLnRhZ05hbWUpO1xuXHR9KTtcblxuXG5cblx0eGl0KCdhbGxvd3MgdG8gYmluZCBzYW5kYm94IHZpYSBiaW5kU2FuZGJveCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRkaXYgPSAkLmNyZWF0ZSgnZGl2Jyk7XG5cblx0XHRNSy5iaW5kU2FuZGJveChvYmosIGRpdik7XG5cblx0XHRleHBlY3QoTUsuYm91bmQob2JqLCAnc2FuZGJveCcpKS50b0VxdWFsKGRpdik7XG5cdH0pO1xuXG5cblx0eGl0KCdiaW5kU2FuZGJveCB0aHJvd3MgYW4gZXJyb3Igd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0dHJ5IHtcblx0XHRcdE1LLmJpbmRTYW5kYm94KG9iaiwgbnVsbCk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRib29sID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZVRydXRoeSgpO1xuXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgc3dpdGNoQmluZGluZyBmcm9tICcuL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4vdW5iaW5kbm9kZSdcblxuLy8gVGhlIG1haW4gbWV0aG9kIG9mIHRoZSBmcmFtZXdvcms6IGJpbmRzIGEgcHJvcGVydHkgb2YgYW4gb2JqZWN0IHRvIEhUTUwgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGJpbmRlciA9IHt9LCBldnQgPSB7fSkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IGJpbmRlcjtcbiAgICAgICAgYmluZGVyID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcyB9ID0gaW5pdE1LKG9iamVjdCk7XG4gICAgY29uc3QgeyBvcHRpb25hbCwgZGVlcCwgc2lsZW50IH0gPSBldnQ7XG5cbiAgICAvLyB0aHJvdyBlcnJvciB3aGVuIGtleSBpcyBub3QgZ2l2ZW5cbiAgICBpZigha2V5KSB7XG4gICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOmZhbHN5X2tleScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiBiaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGJpbmRlciwgZXZ0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoW3trZXksIG5vZGUsIGJpbmRlciwgZXZlbnR9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlLFxuICAgICAgICAgICAgICAgIGJpbmRlcjogaXRlbUJpbmRlcixcbiAgICAgICAgICAgICAgICBldmVudDogaXRlbUV2ZW50XG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbW9uRXZlbnQgPSBub2RlO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lcmdlZEV2ZW50ID0ge307XG5cblxuICAgICAgICAgICAgICAgIGlmKGl0ZW1FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmQgZXZlbnQgb2JqZWN0IGJ5IFwibG9jYWxcIiBldmVudCAoXCJldmVudFwiIGtleSBvZiBhbiBvYmplY3QpXG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBpdGVtRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGNvbW1vbkV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJnbG9iYWxcIiBldmVudFxuICAgICAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihtZXJnZWRFdmVudCwgY29tbW9uRXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgaXRlbU5vZGUsIGl0ZW1CaW5kZXIsIG1lcmdlZEV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IGJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSwgYmluZGVyKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblxuICAgIC8vIGNoZWNrIG5vZGUgZXhpc3RlbmNlXG4gICAgaWYgKCEkbm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IE1hdHJlc2hrYUVycm9yKCdiaW5kaW5nOm5vZGVfbWlzc2luZycsIHsga2V5LCBub2RlIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgIGlmIChkZWVwICE9PSBmYWxzZSAmJiBkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gaGFuZGxlIGJpbmRpbmcgd2hlbiBrZXkgYXJnIGluY2x1ZGVzIGRvdHMgKGVnIFwiYS5iLmMuZFwiKVxuICAgICAgICBjb25zdCBjaGFuZ2VIYW5kbGVyID0gKGNoYW5nZUV2dCA9IHt9KSA9PiBzd2l0Y2hCaW5kaW5nKHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VFdnQsXG4gICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgIGRlZXBQYXRoLFxuICAgICAgICAgICAgICAgICRub2RlcyxcbiAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgZXZ0LFxuICAgICAgICAgICAgICAgIGJpbmROb2RlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgZGVlcFBhdGguc2xpY2UoMCwgZGVlcFBhdGhMZW5ndGggLSAyKSxcbiAgICAgICAgICAgIGBjaGFuZ2U6JHtkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDJdfWAsIGNoYW5nZUhhbmRsZXIpO1xuXG4gICAgICAgIGNoYW5nZUhhbmRsZXIoKTtcblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICAvLyBpZiBvYmplY3QgaXMgTWF0cmVzaGthIGluc3RhbmNlIHRoZW4gZXh0ZW5kIFwiJG5vZGVzXCIgYW5kIFwibm9kZXNcIiBvYmplY3RzXG4gICAgICAgIGNvbnN0IHsgJG5vZGVzOiAkYWxsTm9kZXMsIG5vZGVzOiBhbGxOb2RlcyB9ID0gb2JqZWN0O1xuXG4gICAgICAgIGlmKCEkYWxsTm9kZXMgfHwgIWFsbE5vZGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJywge1xuICAgICAgICAgICAgICAgICRub2RlczogJGFsbE5vZGVzLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBhbGxOb2Rlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldICYmICRhbGxOb2Rlc1trZXldLmxlbmd0aFxuICAgICAgICAgICAgPyAkYWxsTm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG5cbiAgICAgICAgYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldWzBdO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBiaW5kaW5nIGZvciBldmVyeSBub2RlIHNlcGFyYXRlbHlcbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCAobm9kZSkgPT4gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZSxcbiAgICAgICAga2V5LFxuICAgICAgICBldnQsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgcHJvcERlZlxuICAgIH0pKTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuXHRsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblx0aWYgKCFkZWYpIHtcblx0XHRkZWYgPSB7XG5cdFx0XHQvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuXHRcdFx0Ly8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24sXG5cdFx0XHRcdFx0Y3R4OiBvYmplY3QsXG5cdFx0XHRcdFx0Y29udGV4dDogb2JqZWN0Mixcblx0XHRcdFx0XHRuYW1lOiBcImV4YW1wbGVcIlxuXHRcdFx0XHR9ICovXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHQ/IG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdFx0XHQvLz9kZXN0cm95ZXJzOiBNYXAsXG5cdFx0XHRcdFx0YmluZGluZ3M6IFt7XG5cdFx0XHRcdFx0XHRub2RlLFxuXHRcdFx0XHRcdFx0YmluZGVyLFxuXHRcdFx0XHRcdFx0bm9kZUhhbmRsZXIsXG5cdFx0XHRcdFx0XHRvYmplY3RIYW5kbGVyXG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSovXG5cdFx0XHR9LFxuXHRcdFx0aWQ6IGBtayR7TWF0aC5yYW5kb20oKX1gXG5cdFx0fTtcblxuXHRcdGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcblx0fVxuXG5cdHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRNSyhvYmplY3QpIHtcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG5cdGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuXHR9XG5cblx0Ly8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG5cdC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcblx0Ly8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0cmV0dXJuIG9iamVjdC5faW5pdE1LID8gb2JqZWN0Ll9pbml0TUsoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcblx0Z2V0KG9iaikge1xuXHRcdHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcblx0fSxcblx0c2V0KG9iaiwgZGF0YSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuXHRcdFx0dmFsdWU6IGRhdGEsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0XHR9KTtcblx0fSxcblx0aGFzKG9iaikge1xuXHRcdHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRpZiAoIWRlZi5wcm9wc1trZXldKSB7XG5cdFx0Y29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0c2V0dGVyOiBudWxsLFxuXHRcdFx0bWVkaWF0b3I6IG51bGwsXG5cdFx0XHRiaW5kaW5nczogbnVsbFxuXHRcdH07XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcERlZi5nZXR0ZXIgPyBwcm9wRGVmLmdldHRlci5jYWxsKG9iamVjdCkgOiBwcm9wRGVmLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldCh2KSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuXHRcdFx0XHRcdGZyb21TZXR0ZXI6IHRydWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZGVmLnByb3BzW2tleV07XG59XG5cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRjb3JlLl9kZWZpbmVTcGVjaWFsID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vQWNjZXNzb3JzKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhbWFwLmhhcyhvYmplY3QpKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XTtcblxuXHRcdGlmICghc3BlY2lhbFByb3BzKSB7XG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XSA9IHtcblx0XHRcdFx0JG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0bWVkaWF0b3I6IG51bGxcblx0XHRcdH07XG5cblx0XHRcdGlmICghbm9BY2Nlc3NvcnMgJiYga2V5ICE9ICdzYW5kYm94Jykge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNwZWNpYWxQcm9wcy5nZXR0ZXIgPyBzcGVjaWFsUHJvcHMuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHNwZWNpYWxQcm9wcy52YWx1ZTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24odikge1xuXHRcdFx0XHRcdFx0c3BlY2lhbFByb3BzLnNldHRlciA/IHNwZWNpYWxQcm9wcy5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogY29yZS5zZXQob2JqZWN0LCBrZXksIHYsIHtcblx0XHRcdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc3BlY2lhbFByb3BzO1xuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpcyBmcm9tICcuL191dGlsL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIHNldHMgbmV3IHZhbHVlIGZvciBhIHByb3BlcnR5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZXQnKTtcblxuICAgIC8vIGlmIG5vIGtleSBvciBmYWxzeSBrZXkgaXMgZ2l2ZW5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG4gICAgaWYgKCFkZWYpIHtcblx0XHRvYmplY3Rba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IHByb3BzLCBldmVudHMgfSA9IGRlZjtcblx0Y29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuXHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xuXHRcdG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuXHRpZiAoIXByb3BEZWYpIHtcblx0XHRvYmplY3Rba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IHZhbHVlOiBwcmV2aW91c1ZhbHVlLCBtZWRpYXRvciB9ID0gcHJvcERlZjtcblxuICAgIC8vIHBvc3NpYmxlIGZsYWdzXG5cdGNvbnN0IHtcbiAgICAgICAgc2tpcE1lZGlhdG9yLFxuICAgICAgICBmcm9tTWVkaWF0b3IsXG4gICAgICAgIGZvcmNlLFxuICAgICAgICBmb3JjZUhUTUwsXG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgc2lsZW50SFRNTCxcbiAgICAgICAgc2tpcExpbmtzXG4gICAgfSA9IGV2dDtcblxuXHRsZXQgbmV3VmFsdWU7XG5cblx0aWYgKG1lZGlhdG9yICYmICFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkgJiYgIXNraXBNZWRpYXRvciAmJiAhZnJvbU1lZGlhdG9yKSB7XG5cdFx0Ly8gVE9ET1xuXHRcdG5ld1ZhbHVlID0gc3BlY2lhbC5tZWRpYXRvcih2LCBwcmV2VmFsLCBrZXksIG9iamVjdCk7XG5cdH0gZWxzZSB7XG5cdFx0bmV3VmFsdWUgPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0IGlzQ2hhbmdlZCA9ICFpcyhuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cbiAgICAvLyBhZGQgdG8gZXZ0IG9iamVjdCBzb21lIHVzZWZ1bCBwcm9wZXJ0aWVzXG5cdGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuXHRcdHZhbHVlOiBuZXdWYWx1ZSxcblx0XHRzZWxmOiBvYmplY3QsXG5cdFx0cHJldmlvdXNWYWx1ZSxcblx0XHRrZXksXG5cdFx0aXNDaGFuZ2VkXG5cdH0sIGV2dCk7XG5cblx0Y29uc3QgdHJpZ2dlckNoYW5nZSA9IChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFzaWxlbnQ7XG5cbiAgICAvLyB0cmlnZ2VyIGJlZm9yZWNoYW5nZTpLRVkgYW5kIGJlZm9yZWNoYW5nZSBldmVudHNcblx0aWYgKHRyaWdnZXJDaGFuZ2UpIHtcblx0XHRjb25zdCBiZWZvcmVjaGFuZ2VTdHIgPSAnYmVmb3JlY2hhbmdlJztcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlRXZ0TmFtZSA9IGAke2JlZm9yZWNoYW5nZVN0cn06JHtrZXl9YDtcblxuXHRcdGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VFdnROYW1lXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcblx0XHR9XG5cblx0XHRpZihldmVudHNbYmVmb3JlY2hhbmdlU3RyXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuXHRcdH1cblx0fVxuXG5cdHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuXHRpZiAoIXNpbGVudEhUTUwgJiYgKGlzQ2hhbmdlZCB8fCBmb3JjZSB8fCBmb3JjZUhUTUwpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSA9IGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWA7XG5cdFx0aWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXHR9XG5cbiAgICAvLyB0cmlnZ2VyIGNoYW5nZTpLRVkgYW5kIGNoYW5nZSBldmVudHNcbiAgICBpZiAodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VTdHIgPSAnY2hhbmdlJztcbiAgICAgICAgY29uc3QgY2hhbmdlRXZ0TmFtZSA9IGAke2NoYW5nZVN0cn06JHtrZXl9YDtcblx0XHRpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuXHRcdGlmKGV2ZW50c1tjaGFuZ2VTdHJdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG5cdGlmICgoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2tpcExpbmtzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlcHNFdnROYW1lID0gYF9jaGFuZ2U6ZGVwczoke2tleX1gO1xuXHRcdGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cdH1cblxuICAgIC8vIHRyaWdnZXIgZGVsZWdhdGVkIGV2ZW50cyBsb2dpY1xuICAgIGlmKGlzQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGlmIChldmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0pIHtcblx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lLCBleHRlbmRlZEV2dCk7XG5cdFx0fVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlck9uZShvYmplY3QsIG5hbWUpIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IGV2ZW50cyA9IGRlZi5ldmVudHNbbmFtZV07XG5cblx0aWYgKGV2ZW50cykge1xuXHRcdGNvbnN0IGFyZ3MgPSBub2ZuLnNsaWNlKGFyZ3VtZW50cywgMiksXG5cdFx0XHRsID0gZXZlbnRzLmxlbmd0aCxcblx0XHRcdFthMSwgYTIsIGEzXSA9IGFyZ3M7XG5cblx0XHRsZXQgaSA9IDAsXG5cdFx0XHRldjtcblxuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRjYXNlIDA6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAxOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDI6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHRjYXNlIDM6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG59XG5cbnRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSB7XG5cdGluZm86IHt9LFxuXHRuYW1lOiBudWxsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy90cmlnZ2Vyb25lLmpzXG4gKiovIiwiaW1wb3J0IE1hdHJlc2hrYUVycm9yIGZyb20gJy4vbWF0cmVzaGthZXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3QsIG1ldGhvZCkge1xuXHRjb25zdCB0eXBlb2ZPYmplY3QgPSBvYmplY3QgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygb2JqZWN0O1xuXG4gICAgaWYodHlwZW9mT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignY29tbW9uOm9iamVjdF90eXBlJywge1xuICAgICAgICAgICAgdHlwZTogdHlwZW9mT2JqZWN0LFxuICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1xuICoqLyIsImNvbnN0IGJpbmRpbmdFcnJvclByZWZpeCA9ICdCaW5kaW5nIGVycm9yOic7XG5cbmNvbnN0IGVycm9ycyA9IHtcblx0J2JpbmRpbmc6bm9kZV9taXNzaW5nJzogKHsga2V5LCBub2RlIH0pID0+IHtcblx0XHRjb25zdCBzZWxlY3RvckluZm8gPSB0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgPyBgIFRoZSBzZWxlY3RvciBpcyAke25vZGV9YCA6ICcnO1xuXHRcdHJldHVybiBgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IG5vZGUgaXMgbWlzc2luZyBmb3IgJHtrZXl9LiR7c2VsZWN0b3JJbmZvfWBcblx0fSxcblx0J2JpbmRpbmc6ZmFsc3lfa2V5JzogKCkgPT4gJ0JpbmRpbmcgZXJyb3I6IFwia2V5XCIgYXJnIGNhbm5vdCBiZSBmYWxzeScsXG5cdCdiaW5kaW5nOmluc3RhbmNlX25vZGVzX21pc3NpbmcnOiAoeyAkbm9kZXMsIG5vZGVzIH0pID0+IHtcblx0XHRjb25zdCBtaXNzaW5nID0gISRub2RlcyA/ICckbm9kZXMnIDogJ25vZGVzJztcblx0XHRyZXR1cm5cdGAke2JpbmRpbmdFcnJvclByZWZpeH0gXCIke21pc3Npbmd9XCIgcHJvcGVydHkgb2YgTWF0cmVzaGthIGluc3RhbmNlIGlzIG1pc3NpbmcuIGBcblx0XHRcdCsgJ0l0IG11c3QgYmUgYW4gb2JqZWN0IGFuZCBtdXN0IG5vdCBiZSByZWFzc2lnbmVkLic7XG5cdH0sXG5cdCdjb21tb246b2JqZWN0X3R5cGUnOiAoeyB0eXBlLCBtZXRob2QgfSkgPT4ge1xuXHRcdHJldHVybiBgTWV0aG9kIFwiJHttZXRob2R9XCIgZG9lcyBub3QgYWNjZXB0ICR7dHlwZX0gYXMgdGFyZ2V0IG9iamVjdGA7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG5cdGNvbnN0IGdldEVycm9yID0gZXJyb3JzW2tleV07XG5cdGlmKCFnZXRFcnJvcikge1xuXHRcdHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcblx0fVxuXG5cdHJldHVybiBuZXcgRXJyb3IoZXJyb3JzW2tleV0oZGF0YSkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvbWF0cmVzaGthZXJyb3IuanNcbiAqKi8iLCIvLyBkZXRlcm1pbmVzIHdoZXRoZXIgdHdvIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWVcbmNvbnN0IGlzUG9seWZpbGwgPSAodjEsIHYyKSA9PlxuICAgIHYxID09PSAwICYmIHYyID09PSAwID8gMSAvIHYxID09PSAxIC8gdjIgOiB2MSAhPT0gdjEgJiYgdjIgIT09IHYyIHx8IHYxID09PSB2MjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmlzIHx8IGlzUG9seWZpbGw7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9pcy5qc1xuICoqLyIsImltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL3NlbGVjdG5vZGVzJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcikge1xuXHRsZXQgbm9kZXM7XG5cdGlmKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhLzwvLnRlc3Qoc2VsZWN0b3IpICYmIC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdG5vZGVzID0gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcilcblx0fSBlbHNle1xuXHRcdG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuXHR9XG5cdHJldHVybiBub2Rlcztcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZ2V0bm9kZXMuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9ycykge1xuXHRcblx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0JCA9IGNvcmUuJCxcblx0XHRyZXN1bHQgPSAkKCksXG5cdFx0ZXhlY1Jlc3VsdCxcblx0XHQkYm91bmQsXG5cdFx0bm9kZSxcblx0XHRzZWxlY3Rvcixcblx0XHRpLCBqLFxuXHRcdHJhbmRvbSxcblx0XHRzdWJTZWxlY3Rvcixcblx0XHRrZXksXG5cdFx0c2VsZWN0ZWQ7XG5cblx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhb2JqZWN0RGF0YSkgcmV0dXJuIHJlc3VsdDtcblxuXHQvLyByZXBsYWNpbmcgOnNhbmRib3ggdG8gOmJvdW5kKHNhbmRib3gpXG5cdHNlbGVjdG9ycyA9IHNlbGVjdG9ycy5zcGxpdCgnLCcpO1xuXG5cdGZvciAoaSA9IDA7IGkgPCBzZWxlY3RvcnMubGVuZ3RoOyBpKyspIHtcblx0XHRzZWxlY3RvciA9IHNlbGVjdG9yc1tpXTtcblxuXHRcdGlmIChleGVjUmVzdWx0ID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLy5leGVjKHNlbGVjdG9yKSkge1xuXHRcdFx0a2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcblx0XHRcdHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG5cblx0XHRcdC8vIGdldHRpbmcgS0VZIGZyb20gOmJvdW5kKEtFWSlcblx0XHRcdCRib3VuZCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldICYmIG9iamVjdERhdGEuc3BlY2lhbFtrZXldLiRub2Rlcztcblx0XHRcdGlmKCEkYm91bmQgfHwgISRib3VuZC5sZW5ndGgpIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBwYXNzZWQgYWZ0ZXIgOmJvdW5kKEtFWSkgaXMgbm90IGVtcHR5IHN0cmluZ1xuXHRcdFx0Ly8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSAubXktc2VsZWN0b3JcIlxuXHRcdFx0aWYgKHN1YlNlbGVjdG9yKSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBjb250YWlucyBjaGlsZHJlbiBzZWxlY3RvclxuXHRcdFx0XHQvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcblx0XHRcdFx0aWYgKHN1YlNlbGVjdG9yLmluZGV4T2YoJz4nKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vIHNlbGVjdGluZyBjaGlsZHJlblxuXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCAkYm91bmQubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdG5vZGUgPSAkYm91bmRbal07XG5cdFx0XHRcdFx0XHRyYW5kb20gPSAnbScgKyBjb3JlLnJhbmRvbVN0cmluZygpO1xuXHRcdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUocmFuZG9tLCByYW5kb20pO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1snICsgcmFuZG9tICsgJz1cIicgKyByYW5kb20gKyAnXCJdJyArIHN1YlNlbGVjdG9yKTtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQodXRpbC50b0FycmF5KHNlbGVjdGVkKSk7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUF0dHJpYnV0ZShyYW5kb20pO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBkb2Vzbid0IGNvbnRhaW4gY2hpbGRyZW4gc2VsZWN0b3Jcblx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKCRib3VuZC5maW5kKHN1YlNlbGVjdG9yKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIG5hdGl2ZSBzZWxlY3RvciBpcyBlbXB0eSBzdHJpbmdcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3Jcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChzZWxlY3Rvcik7XG5cdFx0fVxuXHR9XG5cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcblx0JDogZGVmYXVsdERvbGxhclxufTtcblxuZXhwb3J0IGRlZmF1bHQgZG9tO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9pbmRleC5qc1xuICoqLyIsIi8qZ2xvYmFsICQqL1xuaW1wb3J0IGJRdWVyeSBmcm9tICcuLi9icXVlcnknO1xuXG5jb25zdCBuZWVkZWRNZXRob2RzID0gJ29uIG9mZiBpcyBhZGQgbm90IGZpbmQnLnNwbGl0KC9cXHMvKTtcblxuY29uc3QgZ2xvYmFsRG9sbGFyID0gdHlwZW9mICQgPT09ICdmdW5jdGlvbicgPyAkIDogbnVsbDtcbmxldCB1c2VHbG9iYWxEb2xsYXIgPSB0cnVlO1xuXG5pZiAoZ2xvYmFsRG9sbGFyKSB7XG5cdGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmVlZGVkTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcblx0XHRcdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCFnbG9iYWxEb2xsYXIucGFyc2VIVE1MKSB7XG5cdFx0Z2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG5cdH1cbn0gZWxzZSB7XG5cdHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VHbG9iYWxEb2xsYXIgPyBnbG9iYWxEb2xsYXIgOiBiUXVlcnk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgcGFyc2VIVE1MIGZyb20gJy4vcGFyc2VodG1sJztcbmltcG9ydCBvbmUgZnJvbSAnLi9vbmUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgb24gZnJvbSAnLi9vbic7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBhZGQgZnJvbSAnLi9hZGQnO1xuaW1wb3J0IG5vdCBmcm9tICcuL25vdCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuXG4vLyB0aW55IGpRdWVyeSByZXBsYWNlbWVudCBmb3IgTWF0cmVzaGthXG4vLyBiUXVlcnkgaXMgcmV3cml0dGVuIHZlcnNpb24gb2YgYmFsYWxhaWthLmpzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiUXVlcnkoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0cmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG5cdGZuOiBJbml0LnByb3RvdHlwZSxcblx0ZXh0ZW5kLFxuXHRwYXJzZUhUTUwsXG5cdG9uZSxcblx0Y3JlYXRlXG59KTtcblxubm9mbi5hc3NpZ24oYlF1ZXJ5LmZuLCB7XG5cdG9uLFxuXHRvZmYsXG5cdGlzLFxuXHRhZGQsXG5cdG5vdCxcblx0ZmluZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcblxuLy8gZnVuY3Rpb24tY29uc3RydWN0b3Igb2YgYlF1ZXJ5IGxpYnJhcnlcbi8vIGFjY2VwdHMgbWFueSBraW5kcyBvZiBhcmd1bWVudHMgKHNlbGVjdG9yLCBodG1sLCBmdW5jdGlvbilcbmZ1bmN0aW9uIEJRdWVyeUluaXQoc2VsZWN0b3IsIGNvbnRleHQpIHtcblx0bGV0IHJlc3VsdDtcblxuXHRpZiAoc2VsZWN0b3IpIHtcblx0XHRpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuXHRcdFx0cmVzdWx0ID0gW3NlbGVjdG9yXTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmICgvPC8udGVzdChzZWxlY3RvcikpIHtcblx0XHRcdFx0cmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY29udGV4dCkge1xuXHRcdFx0XHRcdGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG5cdFx0XHRcdFx0aWYgKG5ld0NvbnRleHQpIHtcblx0XHRcdFx0XHRcdHJlc3VsdCA9IG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7IC8vIHR5cGVvZiBub2RlTGlzdCByZXR1cm5zIFwiZnVuY3Rpb25cIiBpbiBvbGQgV2ViS2l0XG5cdFx0XHRpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZWxlY3Rvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxlY3RvcigpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuXHRpZiAobGVuZ3RoKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0dGhpcy5wdXNoKHJlc3VsdFtpXSk7XG5cdFx0fVxuXHR9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChodG1sKSB7XG5cdC8vIHdyYXBNYXAgaXMgdGFrZW4gZnJvbSBqUXVlcnlcblx0Y29uc3Qgd3JhcE1hcCA9IHtcblx0XHRvcHRpb246IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuXHRcdGxlZ2VuZDogWzEsICc8ZmllbGRzZXQ+JywgJzwvZmllbGRzZXQ+J10sXG5cdFx0dGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuXHRcdHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcblx0XHR0ZDogWzMsICc8dGFibGU+PHRib2R5Pjx0cj4nLCAnPC90cj48L3Rib2R5PjwvdGFibGU+J10sXG5cdFx0Y29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcblx0XHRhcmVhOiBbMSwgJzxtYXA+JywgJzwvbWFwPiddLFxuXHRcdF86IFswLCAnJywgJyddXG5cdH07XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRpO1xuXG5cdGh0bWwgPSBodG1sLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcblxuXHR3cmFwTWFwLm9wdGdyb3VwID0gd3JhcE1hcC5vcHRpb247XG5cdHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG5cdHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG5cdGNvbnN0IGV4ID0gLzwoW1xcdzpdKykvLmV4ZWMoaHRtbCksXG5cdFx0d3JhcHBlciA9IGV4ICYmIHdyYXBNYXBbZXhbMV1dIHx8IHdyYXBNYXAuXztcblxuXHRub2RlLmlubmVySFRNTCA9IHdyYXBwZXJbMV0gKyBodG1sICsgd3JhcHBlclsyXTtcblxuXHRpID0gd3JhcHBlclswXTtcblxuXHR3aGlsZSAoaS0tKSB7XG5cdFx0bm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG5cdH1cblxuXHRyZXR1cm4gbm9kZS5jaGlsZE5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXG4gKiovIiwiLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZnlsbCBpcyB0YWtlbiB0aGVyZTpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24jUG9seWZpbGxcbi8vIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlXG5cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuXHQvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuXHRpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0ID09PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG5cdH1cblxuXHRjb25zdCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcblx0Zm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuXHRcdGlmIChzb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBzb3VyY2UgIT09IG51bGwpIHtcblx0XHRcdGZvciAoY29uc3QgbmV4dEtleSBpbiBzb3VyY2UpIHtcblx0XHRcdFx0aWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuXHRcdFx0XHRcdG91dHB1dFtuZXh0S2V5XSA9IHNvdXJjZVtuZXh0S2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuXHRyZXR1cm4gbmV3IEluaXQoaHRtbDJub2RlTGlzdChodG1sKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvcGFyc2VodG1sLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgbWF0Y2hlZCBzZXRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uZShzLCBjb250ZXh0KSB7XG5cdHJldHVybiBuZXcgSW5pdChzLCBjb250ZXh0KVswXTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbmUuanNcbiAqKi8iLCIvLyBjcmVhdGVzIEhUTUwgZWxlbWVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG5cdGlmICh0eXBlb2YgdGFnTmFtZSA9PT0gJ29iamVjdCcpIHtcblx0XHRwcm9wcyA9IHRhZ05hbWU7XG5cdFx0dGFnTmFtZSA9IHByb3BzLnRhZ05hbWU7XG5cdH1cblxuXHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cblx0aWYgKHByb3BzKSB7XG5cdFx0bm9mbi5mb3JPd24ocHJvcHMsICh2YWx1ZSwga2V5KSA9PiB7XG5cdFx0XHRpZiAoa2V5ID09PSAnYXR0cmlidXRlcycgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRub2ZuLmZvck93bih2YWx1ZSwgKGF0dHJWYWx1ZSwgYXR0ck5hbWUpID0+IHtcblx0XHRcdFx0XHRlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgPT09ICdjaGlsZHJlbicgJiYgdmFsdWUpIHtcblx0XHRcdFx0bm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcblx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZWxba2V5XSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIGlmIChrZXkgIT09ICd0YWdOYW1lJykge1xuXHRcdFx0XHRlbFtrZXldID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0Y29uc3QgcmFuZG9tSUQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkucmVwbGFjZSgnMC4nLCAneCcpLFxuXHRcdHNjb3BlU2VsZWN0b3IgPSBgWyR7cmFuZG9tSUR9PVwiJHtyYW5kb21JRH1cIl0gYCxcblx0XHRzcGxpdHRlZFNlbGVjdG9yID0gc2VsZWN0b3Iuc3BsaXQoJywnKTtcblxuXHRsZXQgbWF0Y2hpbmcgPSAnJztcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRjb25zdCBzZWwgPSBzcGxpdHRlZFNlbGVjdG9yW2ldO1xuXHRcdG1hdGNoaW5nICs9IGAke2kgPT09IDAgPyAnJyA6ICcsJ30ke3Njb3BlU2VsZWN0b3J9JHtzZWx9LCR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0gKmA7XG5cdH1cblxuXG5cdHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cblx0aWYgKGlzLmNhbGwoW2V2dC50YXJnZXRdLCBtYXRjaGluZykpIHtcblx0XHRoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcblx0fVxuXG5cdHRoaXMucmVtb3ZlQXR0cmlidXRlKHJhbmRvbUlEKTtcbn1cblxuLy8gYWRkcyBldmVudCBsaXN0ZW5lciB0byBhIHNldCBvZiBlbGVtbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0bGV0IGRlbGVnYXRlO1xuXG5cdGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRoYW5kbGVyID0gc2VsZWN0b3I7XG5cdFx0c2VsZWN0b3IgPSBudWxsO1xuXHR9XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0ZGVsZWdhdGUgPSBmdW5jdGlvbiB1bmlxdWVEZWxlZ2F0ZUhhbmRsZXIoZXZ0KSB7XG5cdFx0XHRkZWxlZ2F0ZUhhbmRsZXIuY2FsbCh0aGlzLCBldnQsIHNlbGVjdG9yLCBoYW5kbGVyKTtcblx0XHR9O1xuXHR9XG5cblx0bmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcblx0XHRjb25zdCBuYW1lc3BhY2UgPSBuYW1lWzFdO1xuXHRcdG5hbWUgPSBuYW1lWzBdO1xuXG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRjb25zdCBub2RlID0gdGhpc1tqXSxcblx0XHRcdFx0bm9kZUlEID0gbm9kZS5iJCA9IG5vZGUuYiQgfHwgKytkYXRhLm5vZGVJbmRleCxcblx0XHRcdFx0ZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuXHRcdFx0bGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuXHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0Y29uc3QgZXZlbnQgPSBldmVudHNba107XG5cblx0XHRcdFx0aWYgKGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpKSB7XG5cdFx0XHRcdFx0ZXhpc3QgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZXhpc3QpIHtcblx0XHRcdFx0ZXZlbnRzLnB1c2goe1xuXHRcdFx0XHRcdGRlbGVnYXRlLFxuXHRcdFx0XHRcdGhhbmRsZXIsXG5cdFx0XHRcdFx0bmFtZXNwYWNlLFxuXHRcdFx0XHRcdHNlbGVjdG9yXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb24uanNcbiAqKi8iLCIvLyBzaGFyZSBkYXRhIGJldHdlZW4gYXMgYW4gb2JqZWN0IG1vZHVsZXMgYmVjYXVzZSB3ZSB1c2Vcbi8vIHNpbXBsaWZpZWQgZXMgbW9kdWxlcyB0aGVyZSBhbmQgY2Fubm90IGltcG9ydCBhbmQgc2hhcmUgYSBudW1iZXJcbmV4cG9ydCBkZWZhdWx0IHtcblx0bm9kZUluZGV4OiAwLFxuXHRhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG5cdGNvbnN0IG5vZGUgPSB0aGlzWzBdO1xuXHRyZXR1cm4gbm9kZVxuXHRcdD8gKG5vZGUubWF0Y2hlc1xuXHRcdFx0fHwgbm9kZS53ZWJraXRNYXRjaGVzU2VsZWN0b3Jcblx0XHRcdHx8IG5vZGUubW96TWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm1zTWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwobm9kZSwgcykgOiBmYWxzZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9pcy5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyByZW1vdmVzIGV2ZW50IGhhbmRsZXIgZnJvbSBhIHNldCBvZiBlbGVtZW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb2ZmKG5hbWVzLCBzZWxlY3RvciwgaGFuZGxlcikge1xuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xuXHRcdHNlbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRuYW1lID0gbmFtZVswXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbal0sXG5cdFx0XHRcdGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlLmIkXTtcblxuXHRcdFx0aWYgKGV2ZW50cykge1xuXHRcdFx0XHRmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuXHRcdFx0XHRcdGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdCghaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5oYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmRlbGVnYXRlKVxuXHRcdFx0XHRcdFx0JiYgKCFuYW1lc3BhY2UgfHwgbmFtZXNwYWNlID09PSBldmVudC5uYW1lc3BhY2UpXG5cdFx0XHRcdFx0XHQmJiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSBldmVudC5zZWxlY3Rvcilcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcblx0XHRcdFx0XHRcdGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghbmFtZXNwYWNlICYmICFzZWxlY3Rvcikge1xuXHRcdFx0XHRcdG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29mZi5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIGFkZHMgdW5pcXVlIG5vZGVzIHRvIGJRdWVyeSBjb2xsZWN0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGQoc2VsZWN0b3IpIHtcblx0Y29uc3QgaWRNYXAgPSB7fTtcblxuXHRsZXQgcmVzdWx0LFxuXHRcdG5vZGVJRCxcblx0XHRub2RlLFxuXHRcdGk7XG5cblx0c2VsZWN0b3IgPSBuZXcgSW5pdChzZWxlY3Rvcik7XG5cblx0aWYgKHRoaXMubGVuZ3RoKSB7XG5cdFx0cmVzdWx0ID0gbmV3IEluaXQodGhpcyk7XG5cdFx0Zm9yIChpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0bm9kZSA9IHJlc3VsdFtpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZE1hcFtub2RlSURdID0gMTtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGUgPSBzZWxlY3RvcltpXTtcblx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG5cdFx0XHRpZiAoIWlkTWFwW25vZGVJRF0pIHtcblx0XHRcdFx0aWRNYXBbbm9kZUlEXSA9IDE7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXN1bHQgPSBzZWxlY3Rvcjtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvYWRkLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGV4Y2x1ZGVzIGVsZW1lbnRzIGZyb20gY3VycmVudCBzZXQgYnkgZ2l2ZW4gc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdChzZWxlY3Rvcikge1xuXHRjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG5cdFx0XHRyZXN1bHQucHVzaCh0aGlzW2ldKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L25vdC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBnZXQgdGhlIGRlc2NlbmRhbnRzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgY3VycmVudCBzZXQgb2YgbWF0Y2hlZCBlbGVtZW50cyxcbi8vIGZpbHRlcmVkIGJ5IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcblx0bGV0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cblx0bm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcblx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcblx0fSk7XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9maW5kLmpzXG4gKiovIiwiaW1wb3J0IGxvb2tGb3JCaW5kZXIgZnJvbSAnLi9sb29rZm9yYmluZGVyJztcbmltcG9ydCBydW5Ob2RlSGFuZGxlciBmcm9tICcuL3J1bm5vZGVoYW5kbGVyJztcbmltcG9ydCBydW5PYmplY3RIYW5kbGVyIGZyb20gJy4vcnVub2JqZWN0aGFuZGxlcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuLi9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4uL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi9fdXRpbC9kZWJvdW5jZSc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG4vLyBoYW5kbGVzIGJpbmRpbmcgZm9yIHNpbmdsZSBwcm9wZXJ0eSAmIG5vZGVcbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIGF0IGJpbmROb2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcblx0YmluZGVyOiBnaXZlbkJpbmRlcixcblx0a2V5LFxuXHQkbm9kZXMsXG5cdG5vZGUsXG5cdGV2dCxcblx0cHJvcERlZlxufSkge1xuXHRjb25zdCB7XG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgYXNzaWduRGVmYXVsdFZhbHVlLFxuICAgICAgICBkZWJvdW5jZTogZGVib3VuY2VPcHRpb25cbiAgICB9ID0gZXZ0O1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0c2VsZjogb2JqZWN0LFxuXHRcdGtleSxcbiAgICAgICAgdmFsdWUsXG5cdFx0JG5vZGVzLFxuXHRcdG5vZGVcblx0fTtcbiAgICAvLyBjcmVhdGUgYmluZGluZ3MgYXJyYXkgaW4gcHJvcGVydHkgZGVmaW5pdGlvbiBvYmplY3RcbiAgICBjb25zdCBiaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzIHx8IFtdO1xuXHRsZXQgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCc7XG5cdGxldCBiaW5kZXI7XG5cdGxldCBvYmplY3RIYW5kbGVyO1xuXG4gICAgLy8gZ2V0IGFjdHVhbCBiaW5kZXJcblx0aWYgKGdpdmVuQmluZGVyICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgZm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRpZiAoZ2l2ZW5CaW5kZXIpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZm91bmRCaW5kZXIsIGdpdmVuQmluZGVyKTtcblx0XHRcdH1cblxuXHRcdFx0YmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJpbmRlciA9IGdpdmVuQmluZGVyO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHsgZ2V0VmFsdWUsIHNldFZhbHVlLCBvbiwgaW5pdGlhbGl6ZSB9ID0gYmluZGVyO1xuXG4gICAgLy8gY2FsbCBiaW5kZXIuaW5pdGlhbGl6ZVxuXHRpZiAoaW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplLmNhbGwobm9kZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gY2FsbHMgZ2V0VmFsdWUgaW1tZWRpYXRlbHkgYW5kIHJlYXNzaWduIGEgcHJvcGVydHlcbiAgICAvLyB3aGVuIGFsbCByZXF1aXJlZCBjb25kaXRpb25zIGFyZSBtZXQgZm9yIHRoaXNcblx0aWYgKGdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBhc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgb3B0aW9ucyk7XG5cdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuXG5cdFx0c2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyBmcm9tTm9kZTogdHJ1ZSB9LCBldnQpKTtcblx0fVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgb2JqZWN0IHdoZW4gc2V0VmFsdWUgaXMgZ2l2ZW5cblx0aWYgKHNldFZhbHVlKSB7XG5cdFx0b2JqZWN0SGFuZGxlciA9ICgpID0+IHJ1bk9iamVjdEhhbmRsZXIoe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHByb3BEZWYsXG4gICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgZXZ0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGJ5IGRlZmF1bHQgZGVib3VuY2luZyBpcyBvblxuICAgICAgICAvLyBpdCBjYW4gYmUgdHVybmVkIG9mZiBieSBwYXNzaW5nIGRlYm91bmNlPWZhbHNlIHRvIGV2ZW50IG9iamVjdFxuXHRcdGlmKGRlYm91bmNlT3B0aW9uICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSB0eXBlb2YgZGVib3VuY2VPcHRpb24gPT09ICdudW1iZXInID8gZGVib3VuY2VPcHRpb24gOiAwO1xuXHRcdFx0b2JqZWN0SGFuZGxlciA9IGRlYm91bmNlKG9iamVjdEhhbmRsZXIsIGRlbGF5KTtcblx0XHR9XG5cblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG5cdFx0aWYoIWlzVW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgbm9kZSB3aGVuIGdldFZhbHVlICYgb24gYXJlIGdpdmVuXG4gICAgaWYoZ2V0VmFsdWUgJiYgb24pIHtcbiAgICAgICAgY29uc3Qgbm9kZUhhbmRsZXIgPSAoZG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZSBpcyBzZXQgaW4gdW5iaW5kTm9kZVxuICAgICAgICAgICAgLy8gd2UgY2Fubm90IFwidHVybiBvZmZcIiBiaW5kZXIub24gd2hlbiBpdHMgdmFsdWUgaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGRldmVsb3BlciBuZWVkcyB0byBjbGVhbiBtZW1vcnkgKHR1cm4gb2ZmIGNhbGxiYWNrKSBtYW51YWx5IGluIGJpbmRlci5kZXN0cm95XG4gICAgICAgICAgICBpZighbm9kZUhhbmRsZXIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBydW5Ob2RlSGFuZGxlcih7XG4gICAgICAgICAgICAgICAgICAgIGRvbUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBiaW5kaW5nIGRhdGEgdG8gYmluZGluZ3MgYXJyYXlcbiAgICAgICAgYmluZGluZ3MucHVzaCh7XG4gICAgICAgICAgICBvbixcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyLFxuICAgICAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgICAgICBvcHRpb25zXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHR5cGVvZiBvbiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvbi5jYWxsKG5vZGUsIG5vZGVIYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS4kKG5vZGUpLm9uKG9uLCBub2RlSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgJG5vZGVzLFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9LCBldnQpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgYmluZDoke2tleX1gLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAnYmluZCcsIGV4dGVuZGVkRXZ0KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdEJpbmRlcnMgZnJvbSAnLi9kZWZhdWx0YmluZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0LFxuICAgICAgICBpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGRlZmF1bHRCaW5kZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyZXN1bHQgPSBkZWZhdWx0QmluZGVyc1tpXS5jYWxsKG5vZGUsIG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBbbm9kZSA9PiB7XG5cdHZhciB0YWdOYW1lID0gbm9kZS50YWdOYW1lLFxuXHRcdGJpbmRlcnMgPSB1bmRlZmluZWQsXG5cdFx0YjtcblxuXHQvLyBUT0RPIFN3aXRjaC9jYXNlXG5cdGlmICh0YWdOYW1lID09ICdJTlBVVCcpIHtcblx0XHRiID0gYmluZGVycy5pbnB1dChub2RlLnR5cGUpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1RFWFRBUkVBJykge1xuXHRcdGIgPSBiaW5kZXJzLnRleHRhcmVhKCk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnU0VMRUNUJykge1xuXHRcdGIgPSBiaW5kZXJzLnNlbGVjdChub2RlLm11bHRpcGxlKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdQUk9HUkVTUycpIHtcblx0XHRiID0gYmluZGVycy5wcm9ncmVzcygpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ09VVFBVVCcpIHtcblx0XHRiID0gYmluZGVycy5vdXRwdXQoKTtcblx0fVxuXG5cdHJldHVybiBiO1xufV07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJldnRcIl0gfV0qL1xuXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuXG4vLyBwcm9wZXJ0eSBtb2RpZmllciBldmVudCByZWdleHBcbmNvbnN0IHByb3BNb2RFdmVudFJlZ1xuXHQ9IC9eX2NoYW5nZTpkZXBzOnxeX2NoYW5nZTpiaW5kaW5nczp8Xl9jaGFuZ2U6ZGVsZWdhdGVkOnxeY2hhbmdlOnxeYmVmb3JlY2hhbmdlOi87XG5cbi8vIGFkZHMgc2ltcGxlIGV2ZW50IGxpc3RlbmVyXG4vLyB1c2VkIGFzIGNvcmUgb2YgZXZlbnQgZW5naW5lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gaW5pdE1LKG9iamVjdCksXG5cdFx0Y3R4ID0gY29udGV4dCB8fCBvYmplY3QsXG5cdFx0ZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdLFxuXHRcdGV2dCA9IHsgY2FsbGJhY2ssIGNvbnRleHQsIGN0eCwgbmFtZSwgaW5mbyB9O1xuXG5cblx0Ly8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWVcblx0aWYgKGV2ZW50cykge1xuXHRcdC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBkYXRhLCByZXR1cm4gZmFsc2Vcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgZXZ0ID0gZXZlbnRzW2ldO1xuXHRcdFx0aWYgKChldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrIHx8IGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2suX2NhbGxiYWNrKVxuXHRcdFx0XHRcdCYmIGV2dC5jb250ZXh0ID09PSBjb250ZXh0KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgZXZlbnQgaXNuJ3QgZm91bmQgYWRkIGl0IHRvIHRoZSBldmVudCBsaXN0XG5cdFx0ZXZlbnRzLnB1c2goZXZ0KTtcblx0fSBlbHNlIHtcblx0XHQvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZSwgY3JlYXRlIGFycmF5IHdpdGggb25seSBlYmVudFxuXHRcdGFsbEV2ZW50c1tuYW1lXSA9IFtldnRdO1xuXHR9XG5cblx0aWYgKHByb3BNb2RFdmVudFJlZy50ZXN0KG5hbWUpKSB7XG5cdFx0Ly8gZGVmaW5lIG5lZWRlZCBhY2Nlc3NvcnMgZm9yIEtFWVxuXHRcdGRlZmluZVByb3Aob2JqZWN0LCBuYW1lLnJlcGxhY2UocHJvcE1vZEV2ZW50UmVnLCAnJykpO1xuXHR9XG5cblx0aWYgKG5hbWVbMF0gIT09ICdfJykge1xuXHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgYWRkZXZlbnQ6JHtuYW1lfWAsIGV2dCk7XG5cdFx0dHJpZ2dlck9uZShvYmplY3QsICdhZGRldmVudCcsIGV2dCk7XG5cdH1cblxuXHQvLyBpZiBldmVudCBpcyBhZGRlZCByZXR1cm4gdHJ1ZVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpbml0TUsgZnJvbSAnLi9fY29yZS9pbml0JztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBiaW5kTm9kZSBmcm9tICcuL2JpbmRub2RlJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbm9kZSwgZXZ0KSB7XG5cdGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBrZXk7XG5cdFx0a2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3VuYmluZE5vZGUnKTtcbiAgICB9XG5cblx0aWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogdGhpcy51bmJpbmROb2RlKFsnYScsICdiJywgJ2MnXSwgbm9kZSlcbiAgICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBub2RlLCBldnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoW3trZXksIG5vZGUsIGJpbmRlciwgZXZlbnR9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlXG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIGl0ZW1Ob2RlLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IHVuYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG5cdGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuXHRjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuXHRpZighcHJvcERlZikge1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG5cdGlmKCFiaW5kaW5ncykge1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHQvLyBUT0RPIG1ha2Ugc3VyZSB0byB1cGRhdGUgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VzXG5cblx0aWYoa2V5ID09PSBudWxsKSB7XG5cdFx0Ly8gVE9ETyByZW1vdmUgYWxsIGJpbmRpbmdzXG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0Y29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAvL2lmIChldnQuZGVlcCAhPT0gZmFsc2UgJiYgZGVlcFBhdGgubGVuZ3RoID4gMSkge1xuXHRcdC8vIFRPRE9cblx0Ly99XG5cblx0aWYoIW5vZGUpIHtcblx0XHQvLyBUT0RPIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuXHR9XG5cblx0Y29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblx0Y29uc3QgcmV0YWluQmluZGluZ3MgPSBbXTtcblxuXHRub2ZuLmZvckVhY2goJG5vZGVzLCBub2Rlc0l0ZW0gPT4ge1xuXHRcdC8vIFRPRE8gbW92ZSB0byB0aGUgdG9wID9cblx0XHRub2ZuLmZvckVhY2goYmluZGluZ3MsIGJpbmRpbmcgPT4ge1xuXHRcdFx0Y29uc3Qge1xuXHRcdFx0XHRvbixcblx0XHRcdFx0bm9kZSxcblx0XHRcdFx0YmluZGVyLFxuXHRcdFx0XHRub2RlSGFuZGxlcixcblx0XHRcdFx0b2JqZWN0SGFuZGxlcixcblx0XHRcdFx0b3B0aW9uc1xuXHRcdFx0fSA9IGJpbmRpbmc7XG5cblx0XHRcdGlmKG5vZGUgPT09IG5vZGVzSXRlbSkge1xuXHRcdFx0XHRjb25zdCB7IGRlc3Ryb3kgfSA9IGJpbmRlcjtcblxuXHRcdFx0XHRpZih0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0ICAgICAgICAgICAgZG9tLiQobm9kZSkub2ZmKG9uLCBub2RlSGFuZGxlcik7XG5cdFx0ICAgICAgICB9XG5cdFx0XHRcdHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cblx0XHRcdFx0aWYoZGVzdHJveSkge1xuXHRcdFx0XHRcdGRlc3Ryb3kuY2FsbChub2RlLCBvcHRpb25zKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXRhaW5CaW5kaW5ncy5wdXNoKGJpbmRpbmcpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHRwcm9wRGVmLmJpbmRpbmdzID0gcmV0YWluQmluZGluZ3M7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3VuYmluZG5vZGUuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0Ly8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSByZXR1cm47XG5cblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXHRjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG5cdGNvbnN0IHJldGFpbiA9IFtdO1xuXHRjb25zdCBub1RyaWdnZXIgPSBuYW1lID8gbmFtZVswXSA9PT0gJ18nIDogZmFsc2U7XG5cblx0Ly8gaWYgYWxsIGV2ZW50cyBuZWVkIHRvIGJlIHJlbW92ZWRcblx0aWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuXHRcdGlmICghbm9UcmlnZ2VyKSB7XG5cdFx0XHRub2ZuLmZvck93bihhbGxFdmVudHMsIChldmVudHMsIG5hbWUpID0+IHtcblx0XHRcdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcblx0XHRcdFx0XHRjb25zdCByZW1vdmVFdnREYXRhID0ge1xuXHRcdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRcdGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG5cdFx0XHRcdFx0XHRjb250ZXh0OiBldnQuY29udGV4dFxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gcmVzdG9yZSBkZWZhdWx0IHZhbHVlIG9mIFwiZXZlbnRzXCJcblx0XHRkZWYuZXZlbnRzID0ge307XG5cdH0gZWxzZSBpZiAoZXZlbnRzKSB7XG5cdFx0Ly8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcblx0XHRub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuXHRcdFx0aWYgKGNhbGxiYWNrICYmIChjYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrKVxuXHRcdFx0XHR8fCAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldnQuY29udGV4dCkpIHtcblx0XHRcdFx0Ly8ga2VlcCBldmVudFxuXHRcdFx0XHRyZXRhaW4ucHVzaChldnQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG5cdFx0XHRcdFx0Y29udGV4dDogZXZ0LmNvbnRleHRcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoIW5vVHJpZ2dlcikge1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiBbXCJlcnJvclwiLCB7IFwiZnVuY3Rpb25zXCI6IGZhbHNlIH1dKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL2FkZGxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG5cdHByZXZpb3VzVmFsdWUsXG5cdHZhbHVlXG59LCB7XG5cdHBhdGgsXG5cdG5hbWUsXG5cdGNhbGxiYWNrLFxuXHRjb250ZXh0XG59ID0gdHJpZ2dlck9uZS5sYXRlc3RFdmVudC5pbmZvLmRlbGVnYXRlZERhdGEpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKHZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cblxuXHRpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCkge1xuXHQvLyBpZiB0eXBlb2YgcGF0aCBpcyBzdHJpbmcgYW5kIHBhdGggaXMgbm90IGVtcHR5IHN0cmluZyB0aGVuIHNwbGl0IGl0XG5cdHBhdGggPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgJiYgcGF0aCAhPT0gJycgPyBwYXRoLnNwbGl0KCcuJykgOiBwYXRoO1xuXG5cdGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcblx0XHQvLyBpZiBubyBwYXRoIHRoZW4gYWRkIHNpbXBsZSBsaXN0ZW5lclxuXHRcdGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG5cdFx0Y29uc3Qga2V5ID0gcGF0aFswXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRjb25zdCBkZWxlZ2F0ZWREYXRhID0ge1xuXHRcdFx0cGF0aCxcblx0XHRcdG5hbWUsXG5cdFx0XHRjYWxsYmFjayxcblx0XHRcdGNvbnRleHRcblx0XHR9O1xuXG5cdFx0Ly8gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZCBieSBcInNldFwiXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuXHRcdFx0ZGVsZWdhdGVkRGF0YSxcblx0XHRcdHBhdGhTdHJcblx0XHR9KTtcblxuXHRcdC8vIGNhbGwgaGFuZGxlciBtYW51YWxseVxuXHRcdGNoYW5nZUhhbmRsZXIoe1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldXG5cdFx0fSwgZGVsZWdhdGVkRGF0YSk7XG5cdH1cbn1cblxuLypcbmRlZmluZShbXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL2NvcmUnLFxuXHQnbWF0cmVzaGthX2Rpci9jb3JlL2luaXRtaycsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCcsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL3NwZWNpYWxldnRyZWcnXG5dLCBmdW5jdGlvbihjb3JlLCBpbml0TUssIG1hcCwgc3BlY2lhbEV2dFJlZykge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIF9kZWxlZ2F0ZUxpc3RlbmVyID0gY29yZS5fZGVsZWdhdGVMaXN0ZW5lciA9IGZ1bmN0aW9uKG9iamVjdCxcblx0IHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdGluaXRNSyhvYmplY3QpO1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zixcblx0XHRcdGZpcnN0S2V5ID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsxXSA6IHBhdGgsXG5cdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRvYmo7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0ZXZ0RGF0YSA9IGV2dERhdGEgfHwge307XG5cblx0XHRpZiAoZmlyc3RLZXkpIHtcblx0XHRcdGlmIChmaXJzdEtleSA9PSAnKicpIHtcblx0XHRcdFx0aWYgKG9iamVjdC5pc01LQXJyYXkpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHQoZXZ0ICYmIGV2dC5hZGRlZCA/IGV2dC5hZGRlZCA6IG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRcdGl0ZW0gJiYgX2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSxcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGYuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnYWRkJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0ZigpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9iamVjdC5pc01LT2JqZWN0KSB7XG5cdFx0XHRcdFx0ZiA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtldnQua2V5XTtcblxuXHRcdFx0XHRcdFx0aWYgKHRhcmdldCAmJiBldnQgJiYgKGV2dC5rZXkgaW4gb2JqZWN0RGF0YS5rZXlzKSkge1xuXHRcdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcih0YXJnZXQsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0b2JqZWN0LmVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZScsIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0aWYgKGV2dCAmJiBldnQuX3NpbGVudCkgcmV0dXJuO1xuXG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9IG9iamVjdFtmaXJzdEtleV0sXG5cdFx0XHRcdFx0XHRjaGFuZ2VLZXksXG5cdFx0XHRcdFx0XHR0cmlnZ2VyQ2hhbmdlID0gdHJ1ZSxcblx0XHRcdFx0XHRcdGksXG5cdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHM7XG5cblx0XHRcdFx0XHRldnREYXRhLnBhdGggPSBwYXRoO1xuXG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlID0gZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlIHx8XG5cdFx0XHRcdFx0ZXZ0RGF0YS5wcmV2aW91c1ZhbHVlICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZVtmaXJzdEtleV07XG5cblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5wcmV2aW91c1ZhbHVlICYmIG1hcC5oYXMoZXZ0LnByZXZpb3VzVmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRjb3JlLl91bmRlbGVnYXRlTGlzdGVuZXIoZXZ0LnByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldCA9PSAnb2JqZWN0JyAmJiB0YXJnZXQpIHtcblx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChzcGVjaWFsRXZ0UmVnLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0XHRcdGNoYW5nZUtleSA9IG5hbWUucmVwbGFjZShzcGVjaWFsRXZ0UmVnLCAnJyk7XG5cblx0XHRcdFx0XHRcdGlmICghcGF0aCAmJiBldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2NoYW5nZUtleV1cblx0XHRcdFx0XHRcdCE9PSB0YXJnZXRbY2hhbmdlS2V5XSkge1xuXHRcdFx0XHRcdFx0XHRjaGFuZ2VFdmVudHMgPSBtYXAuZ2V0KGV2dERhdGEucHJldmlvdXNWYWx1ZSkuZXZlbnRzW25hbWVdO1xuXHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNoYW5nZUV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNoYW5nZUV2ZW50c1tpXS5wYXRoID09PSBwYXRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAodHJpZ2dlckNoYW5nZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNvcmUuc2V0KHRhcmdldCwgY2hhbmdlS2V5LCB0YXJnZXRbY2hhbmdlS2V5XSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yY2U6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlOiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzT2JqZWN0OiBldnREYXRhLnByZXZpb3VzVmFsdWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRfc2lsZW50OiB0cnVlXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuXHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBmLCBjb250ZXh0LCBldnREYXRhKTtcblxuXHRcdFx0XHRmKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vcmVtb3ZlbGlzdGVuZXInO1xuLy8gUkVGQUNUT1IsIERPTlQgVFJJR0dFUiBBRERFVkVOVCwgUkVNT1ZFRVZFTlRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cblx0cGF0aCA9IHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJyAmJiBwYXRoICE9PSAnJyA/IHBhdGguc3BsaXQoJy4nKSA6IHBhdGg7XG5cblx0aWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuXHRcdC8vIGlmIG5vIHBhdGggdGhlbiByZW1vdmUgbGlzdGVuZXJcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcblx0fSBlbHNlIHtcblx0XHQvLyBlbHNlIGRvIGFsbCBtYWdpY1xuXHRcdGNvbnN0IGtleSA9IHBhdGhbMF07XG5cdFx0Y29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuXHRcdGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcblx0XHRsZXQgcGF0aFN0cjtcblxuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcblx0XHRcdHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuXHRcdFx0cGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoID0gW107XG5cdFx0XHRwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcblx0XHR9XG5cblx0XHRpZiAoZXZlbnRzKSB7XG5cdFx0XHRjb25zdCByZXRhaW4gPSBbXTtcblx0XHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcblx0XHRcdFx0aWYgKGV2ZW50LmluZm8ucGF0aFN0ciAhPT0gcGF0aFN0cikge1xuXHRcdFx0XHRcdHJldGFpbi5wdXNoKGV2ZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChyZXRhaW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSA9IHJldGFpbjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiBvYmplY3Rba2V5XSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3Rba2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuXHRcdH1cblx0fVxufVxuXG4vKlxuZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvdmFyL21hcCdcbl0sIGZ1bmN0aW9uKGNvcmUsIG1hcCkge1xuXHRcInVzZSBzdHJpY3RcIjtcblx0dmFyIF91bmRlbGVnYXRlTGlzdGVuZXIgPSBjb3JlLl91bmRlbGVnYXRlTGlzdGVuZXIgPVxuXHQgZnVuY3Rpb24ob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSkge1xuXHRcdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcpIHJldHVybiBvYmplY3Q7XG5cblx0XHR2YXIgZXhlY3V0ZWQgPSAvKFteXFwuXSspXFwuKC4qKS8uZXhlYyhwYXRoKSxcblx0XHRcdGZpcnN0S2V5ID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsxXSA6IHBhdGgsXG5cdFx0XHRwID0gcGF0aCxcblx0XHRcdG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRldmVudHMsXG5cdFx0XHRpO1xuXG5cdFx0cGF0aCA9IGV4ZWN1dGVkID8gZXhlY3V0ZWRbMl0gOiAnJztcblxuXHRcdGlmIChmaXJzdEtleSkge1xuXHRcdFx0aWYgKGZpcnN0S2V5ID09ICcqJykge1xuXHRcdFx0XHRpZiAob2JqZWN0LmlzTUtBcnJheSkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmFkZCB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblxuXHRcdFx0XHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCAnYWRkJywgZXZlbnRzW2ldLmNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG9iamVjdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdGl0ZW0gJiYgX3VuZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAob2JqZWN0LmlzTUtPYmplY3QpIHtcblx0XHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCAnY2hhbmdlJywgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRldmVudHMgPSBvYmplY3REYXRhLmV2ZW50cy5jaGFuZ2UgfHwgW107XG5cdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Y29yZS5fcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlOicgKyBmaXJzdEtleSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzWydjaGFuZ2U6JyArIGZpcnN0S2V5XSB8fCBbXTtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXHRcdFx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodHlwZW9mIG9iamVjdFtmaXJzdEtleV0gPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtmaXJzdEtleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHR9XG5cdH07XG59KTtcblxuKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBuZXN0ZWQgb2JqZWN0IGJhc2VkIG9uIHBhdGggYW5kIGxhc3RWYWx1ZVxuLy8gZXhhbXBsZTogbWFrZU9iamVjdCgnYS5iLmMnLCA0MikgLT4ge2E6IHtiOiB7YzsgNDJ9fX1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VPYmplY3QocGF0aCA9ICcnLCBsYXN0VmFsdWUgPSB7fSkge1xuXHRwYXRoID0gcGF0aCA/IHBhdGguc3BsaXQoJy4nKSA6IFtdO1xuXHRjb25zdCByZXN1bHQgPSB7fTtcblx0bGV0IG9iaiA9IHJlc3VsdCxcblx0XHRrZXk7XG5cblxuXHR3aGlsZSAocGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0a2V5ID0gcGF0aC5zaGlmdCgpO1xuXHRcdG9iaiA9IG9ialtrZXldID0ge307XG5cdH1cblxuXHRvYmpbcGF0aC5zaGlmdCgpXSA9IGxhc3RWYWx1ZTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uYWRkJywgKCkgPT4ge1xuXHRpdCgnYWRkcyBvbmNlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWw1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJChbZWwxLCBlbDIsIGVsM10pLmFkZChbZWwyLCBlbDMsIGVsNCwgZWw1XSlcblx0XHRdKS50b0VxdWFsKFtlbDEsIGVsMiwgZWwzLCBlbDQsIGVsNV0pO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuY3JlYXRlJywgKCkgPT4ge1xuXHRpdCgnY3JlYXRlcyBlbGVtZW50JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnKS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdESVYnKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgYSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRjbGFzc05hbWU6ICdmb29iYXInXG5cdFx0XHR9KS5jbGFzc05hbWVcblx0XHQpLnRvRXF1YWwoJ2Zvb2JhcicpO1xuXHR9KTtcblxuXHRpdCgnY3JlYXRlcyBjaGlsZGVuJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGNoaWxkcmVuOiBbe1xuXHRcdFx0XHRcdHRhZ05hbWU6ICdzcGFuJ1xuXHRcdFx0XHR9XVxuXHRcdFx0fSkuY2hpbGRyZW5bMF0udGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnU1BBTicpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBhdHRyaWJ1dGUnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0YXR0cmlidXRlczoge1xuXHRcdFx0XHRcdGZvbzogJ2Jhcidcblx0XHRcdFx0fVxuXHRcdFx0fSkuZ2V0QXR0cmlidXRlKCdmb28nKVxuXHRcdCkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBvYmplY3Qgd2l0aCB0YWdOYW1lIHByb3BlcnR5JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKHtcblx0XHRcdFx0dGFnTmFtZTogJ2Rpdidcblx0XHRcdH0pLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ0RJVicpO1xuXHR9KTtcblxuXHR4aXQoJ2V4dGVuZHMgZGF0YXNldCBvYmplY3QnLCAoKSA9PiB7XG5cdFx0Ly8gVE9ET1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5pbXBvcnQgc2ltdWxhdGVDbGljayBmcm9tICcuLi8uLi9saWIvc2ltdWxhdGVjbGljayc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgZXZlbnRzJywgKCkgPT4ge1xuXHRsZXQgdGVzdFNhbmRib3gsXG5cdFx0Y2hpbGQxLFxuXHRcdGNoaWxkMixcblx0XHRncmFuZGNoaWxkMSxcblx0XHRoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGQxXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMVwiPjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+PC9kaXY+XG5cdFx0YDtcblxuXHRcdGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDEnKTtcblx0XHRjaGlsZDIgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQyJyk7XG5cdFx0Z3JhbmRjaGlsZDEgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZDEnKTtcblxuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG5cdFx0aGFuZGxlciA9IHRoaXMuaGFuZGxlcjtcblx0fSk7XG5cblx0YWZ0ZXJFYWNoKCgpID0+IHtcblx0XHQkKFt0ZXN0U2FuZGJveCwgY2hpbGQxLCBjaGlsZDIsIGdyYW5kY2hpbGQxXSkub2ZmKCdjbGljaycpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIG5hbWVzcGFjZWQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgYnViYmxpbmcgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoY2xpY2sgb24gZ3JhbmRjaGlsZHJlbiknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnRG9lc25cXHQgdHJpZ2dlciB3aGVuIGNsaWNrZWQgb24gd3JvbmcgY2hpbGQnLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDInLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgbm90IHNwZWNpZmllZCwgaGFuZGxlciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnU3RvcHMgcHJvcGFnYXRpb24nLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0JChjaGlsZDEpLm9uKCdjbGljaycsIGV2dCA9PiBldnQuc3RvcFByb3BhZ2F0aW9uKCkpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qc1xuICoqLyIsIi8vIHNpbXVsYXRlcyBjbGljayBvbiBhIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2sobm9kZSkge1xuXHRjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuXHRldnQuaW5pdE1vdXNlRXZlbnQoJ2NsaWNrJywgdHJ1ZSk7XG5cdG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uZmluZCcsICgpID0+IHtcblx0bGV0IHRlc3RTYW5kYm94LFxuXHRcdGdyYW5kQ2hpbGQ7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdGdyYW5kQ2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuXHR9KTtcblxuXHRpdCgnZmluZHMnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLiQodGVzdFNhbmRib3gpLmZpbmQoJy5ncmFuZGNoaWxkJylcblx0XHRdKS50b0VxdWFsKFtncmFuZENoaWxkXSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG4vLyDQt9Cw0YHRg9C90YPRgtGMINCy0YHQtSDRgdC+0LfQtNCw0L3QuNGPINC90L7QstGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyINCyIGJlZm9yZUVhY2hcbi8vINGA0LXRhNCw0LrRgtC+0YDQuNGC0Yxcbi8vINC90LDQv9C40YHQsNGC0Ywg0LrQvtC80LzQtdC90YLQsNGA0LjQuCAo0LIg0YLQvtC8INGH0LjRgdC70LUg0Lgg0Log0YPQttC1INGA0LXQsNC70LjQt9C+0LLQsNC90L3Ri9C8INGE0YPQvdC60YbQuNGP0LwpXG4vLyDQv9C+0YHQu9C1INCy0YHQtdCz0L4g0L3Rg9C20L3QviDQstC60LvRjtGH0LjRgtGMINC70LjQvdGC0LXRgCDQuCDQv9GA0L7QstC10YDQuNGC0Ywg0LrQvtCy0LXRgNCw0LTQtlxuXG5kZXNjcmliZSgnYlF1ZXJ5IGluaXRpYWxpemF0aW9uJywgKCkgPT4ge1xuXHRsZXQgdGVzdFNhbmRib3g7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTFcIj48L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtMlwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0zXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXHR9KTtcblxuXHRpdCgnYWNjZXB0cyB3aW5kb3cnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJCh3aW5kb3cpO1xuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0pLnRvRXF1YWwod2luZG93KTtcblx0fSk7XG5cblx0aXQoJ2FjY2VwdHMgZG9jdW1lbnQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJChkb2N1bWVudCk7XG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbChkb2N1bWVudCk7XG5cdH0pO1xuXG5cdGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG5cdFx0ZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG5cdH0pO1xuXG5cdGl0KCdjb252ZXJ0cyBhcnJheS1saWtlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGNoaWxkcmVuID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpLFxuXHRcdFx0cmVzdWx0ID0gJChjaGlsZHJlbik7XG5cblx0XHRleHBlY3QoY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKHJlc3VsdC5sZW5ndGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZXhwZWN0KGNoaWxkcmVuW2ldKS50b0VxdWFsKHJlc3VsdFtpXSk7XG5cdFx0fVxuXHR9KTtcblxuXHRpdCgnQ29udmVydHMgb25lIGVsZW1lbnQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyonKSxcblx0XHRcdHJlc3VsdCA9ICQoZWxlbWVudCk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QoZWxlbWVudCkudG9FcXVhbChyZXN1bHRbMF0pO1xuXHR9KTtcblxuXHRpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQoJy50ZXN0LTEnLCB0ZXN0U2FuZGJveCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDEpO1xuXHR9KTtcblxuXHRpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQoJy50ZXN0LTEnLCAnLndyb25nLWNvbnRleHQnKS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdBbGxvd3MgdG8gdXNlIG51bGwnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JChudWxsKS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdBbGxvd3MgdG8gdXNlIHVuZGVmaW5lZCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKCkubGVuZ3RoXG5cdFx0KS50b0VxdWFsKDApO1xuXHR9KTtcblxuXHRpdCgnQWxsb3dzIHRvIGNyZWF0ZSBwbHVnaW5zJywgKCkgPT4ge1xuXHRcdCQuZm4uYlF1ZXJ5UGx1Z2luID0gZnVuY3Rpb24gYlF1ZXJ5UGx1Z2luKCkge1xuXHRcdFx0ZXhwZWN0KFxuXHRcdFx0XHR0aGlzLmxlbmd0aFxuXHRcdFx0KS50b0VxdWFsKFxuXHRcdFx0XHR0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJykubGVuZ3RoXG5cdFx0XHQpO1xuXHRcdH07XG5cblx0XHRzcHlPbigkLmZuLCAnYlF1ZXJ5UGx1Z2luJyk7XG5cblx0XHQkKCcqJywgdGVzdFNhbmRib3gpLmJRdWVyeVBsdWdpbigpO1xuXG5cdFx0ZXhwZWN0KCQuZm4uYlF1ZXJ5UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuXHRpdCgnY2hlY2tzIGNsYXNzTmFtZScsICgpID0+IHtcblx0XHRjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGVsLmNsYXNzTmFtZSA9ICdlbCc7XG5cblx0XHRleHBlY3QoXG5cdFx0XHQkKGVsKS5pcygnLmVsJylcblx0XHQpLnRvRXF1YWwodHJ1ZSk7XG5cblx0XHRleHBlY3QoXG5cdFx0XHQkKGVsKS5pcygnLmVsMicpXG5cdFx0KS50b0VxdWFsKGZhbHNlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuXHRpdCgnZXhjbHVkZXMgYnkgc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0ZWwyLmNsYXNzTmFtZSA9ICdlbDInO1xuXG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5ub3QoJy5lbDInKVxuXHRcdF0pLnRvRXF1YWwoW2VsMSwgZWwzXSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvbm90X3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5vbmUnLCAoKSA9PiB7XG5cdGl0KCdmaW5kcycsICgpID0+IHtcblx0XHRjb25zdCB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDJcIj48L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0Y29uc3QgY2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQnKTtcblxuXHRcdGV4cGVjdChcblx0XHRcdCQub25lKCcqJywgdGVzdFNhbmRib3gpXG5cdFx0KS50b0VxdWFsKGNoaWxkKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LnBhcnNlSFRNTCcsICgpID0+IHtcblx0aXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG5cdFx0ZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG5cdH0pO1xuXG5cdGl0KCdwYXJzZXMgY29udGV4dHVhbCBlbGVtZW50cycsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPHRkPjwvdGQ+PHRkPjwvdGQ+Jyk7XG5cblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcblx0XHRleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG5cdFx0ZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L3BhcnNlaHRtbF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IENsYXNzIGZyb20gJ3NyYy9jbGFzcyc7XG5cbmRlc2NyaWJlKCdDbGFzcyBmdW5jdGlvbicsICgpID0+IHtcblx0aXQoJ2FsbG93cyB0byBpbmhlcml0JywgKCkgPT4ge1xuXHRcdGNvbnN0IEEgPSBDbGFzcyh7IGE6IHRydWUgfSksXG5cdFx0XHRCID0gQ2xhc3MoeyBiOiB0cnVlLCBleHRlbmRzOiBBIH0pLFxuXHRcdFx0QyA9IENsYXNzKHsgYzogdHJ1ZSwgZXh0ZW5kczogQiB9KSxcblx0XHRcdGluc3QgPSBuZXcgQztcblxuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQSkudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQikudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQykudG9CZVRydXRoeSgpO1xuXG5cdFx0ZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0LmIpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdC5jKS50b0JlVHJ1dGh5KCk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBzdGF0aWMgcHJvcHMnLCAoKSA9PiB7XG5cdFx0Y29uc3QgQSA9IENsYXNzKHt9LCB7IHN0YXRpY1Byb3A6IHRydWUgfSk7XG5cdFx0ZXhwZWN0KEEuc3RhdGljUHJvcCkudG9CZVRydXRoeSgpO1xuXHR9KTtcblxuXHRpdCgnaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZScsICgpID0+IHtcblx0XHRjb25zdCBpbnN0ID0gbmV3IENsYXNzKHsgYTogdHJ1ZSB9KTtcblx0XHRleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDbGFzcykudG9CZUZhbHN5KCk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9jbGFzc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuL2V4dGVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENsYXNzKHByb3RvdHlwZSwgc3RhdGljUHJvcHMpIHtcblx0Y29uc3QgQ29uc3RydWN0b3IgPSBwcm90b3R5cGUuY29uc3RydWN0b3IgIT09IE9iamVjdFxuXHRcdFx0PyBwcm90b3R5cGUuY29uc3RydWN0b3Jcblx0XHRcdDogZnVuY3Rpb24gRW1wdHlDb25zdHJ1Y3RvcigpIHt9LFxuXHRcdC8vZXh0ZW5kcyBpcyBrZXB0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cdFx0UGFyZW50ID0gcHJvdG90eXBlLmV4dGVuZHMgfHwgcHJvdG90eXBlLmV4dGVuZCxcblx0XHQvL2luaGVyaXQgcHJvdG8gZnJvbSBjbGFzcyBwYXJlbnQgb3IgZW1wdHkgb2JqZWN0XG5cdFx0cHJvdG8gPSBPYmplY3QuY3JlYXRlKFBhcmVudCA/IFBhcmVudC5wcm90b3R5cGUgOiB7fSk7XG5cblx0ZXh0ZW5kKHByb3RvLCBwcm90b3R5cGUpO1xuXG5cdGlmICh0eXBlb2Ygc3RhdGljUHJvcHMgPT09ICdvYmplY3QnKSB7XG5cdFx0ZXh0ZW5kKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG5cdH1cblxuXHQvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXHRwcm90by5pbnN0YW5jZU9mID0gZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcblx0XHRyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yO1xuXHR9O1xuXG5cdENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvO1xuXG5cdC8vIGlmIG5ldyBDbGFzcyh7fSkgaXMgY2FsbGVkIHJldHVybiBpdHMgaW5zdGFuY2Vcblx0aWYgKHRoaXMgaW5zdGFuY2VvZiBDbGFzcykge1xuXHRcdHJldHVybiBuZXcgQ29uc3RydWN0b3IoKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gQ29uc3RydWN0b3I7XG5cdH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKE1hdHJlc2hrYS5PYmplY3QgYW5kIE1hdHJlc2hrYS5BcnJheSknLCBmdW5jdGlvbigpIHtcblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge30pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyB1c2luZyBjYWxsYmFjayAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe1xuXHRcdFx0YToge31cblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdLmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHtcblx0XHRcdGE6IHt9XG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2gobmV3IE1LLkFycmF5KHt9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXVswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2gobmV3IE1LLkFycmF5KHtcblx0XHRcdGE6IHt9XG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF1bMF0uYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIG5ldyBNSy5PYmplY3Qoe1xuXHRcdFx0eTogbmV3IE1LLk9iamVjdCh7XG5cdFx0XHRcdGE6IHt9XG5cdFx0XHR9KVxuXHRcdH0pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngueS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICdzcmMvX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKGJhc2ljKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBjdHgsXG5cdFx0aGFuZGxlcjtcblxuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdGN0eCA9IHt9O1xuXHRcdHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuXHRcdGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcblx0fSk7XG5cblxuXHRpdCgnZmlyZXMgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IHt9O1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi5jID0ge307XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRhID0gb2JqLmE7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcblx0XHR0cmlnZ2VyT25lKGEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIgPSB7fTtcblx0XHR0cmlnZ2VyT25lKGIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGEgPSBvYmouYTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcblx0XHR0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRiID0gb2JqLmEuYjtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcblx0XHR0cmlnZ2VyT25lKGIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YyA9IG9iai5hLmM7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIuYyA9IHt9O1xuXHRcdHRyaWdnZXJPbmUoYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG5cdFx0b2JqLmEuYi5jID0gNTU7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndXNlcyBjb3JyZWN0IGNvbnRleHQgZm9yIGRlbGVnYXRlZCBldmVudHMnLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblx0XHRsZXQgYm9vbCA9IGZhbHNlO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBmdW5jdGlvbiBoYW5kbGUoKSB7XG5cdFx0XHRib29sID0gdGhpcyA9PT0gY3R4O1xuXHRcdH0sIGN0eCk7XG5cblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdC8qZXNsaW50LWRpc2FibGUgKi9cblx0eGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy54JywgMik7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHtcblx0XHRcdFx0XHRcdFx0eDogMVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRvYmouYS5iID0ge1xuXHRcdFx0Yzoge1xuXHRcdFx0XHR4OiAyXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIuYyA9IHtcblx0XHRcdHg6IDJcblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aSA9IDA7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWUxMCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU5KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTgpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU3KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTUpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTQpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTMpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTIpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTEpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTApO1xuXHRcdG9iai5hID0ge1xuXHRcdFx0Yjoge1xuXHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0eDogMlxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRleHBlY3QoaSkudG9FcXVhbCgxMTExMTExMTExMTEpO1xuXHR9KTtcblxuXHR4aXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5hLmIgPSBudWxsO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblx0Lyplc2xpbnQtZW5hYmxlICovXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0V2ZW50cyBjb3JlOiBhZGRMaXN0ZW5lciwgcmVtb3ZlTGlzdGVuZXIsIHRyaWdnZXJPbmUnLCBmdW5jdGlvbiB0ZXN0KCkge1xuXHRsZXQgb2JqLFxuXHRcdGN0eCxcblx0XHRoYW5kbGVyO1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdGN0eCA9IHt9O1xuXHRcdGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2F2b2lkcyBjb25mbGljdHMnLCAoKSA9PiB7XG5cdFx0bGV0IGkgPSAwO1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMCkpO1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMSkpO1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMikpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9FcXVhbCgxMTEpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gYXJncyknLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqKTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBuYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdHhpdCgncmVtb3ZlcyBieSBob3dUb1JlbW92ZSAobm90IGRvY3VtZW50ZWQgY29yZSBmZWF0dXJlKScsICgpID0+IHtcblx0XHQvKmVzbGludC1kaXNhYmxlICovXG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0ZiA9IGV2dCA9PiBib29sID0gdHJ1ZSxcblx0XHRcdG9uRGF0YSA9IHtcblx0XHRcdFx0aG93VG9SZW1vdmUob25EYXRhLCBvZmZEYXRhKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9mZkRhdGEueCA9PT0gNDI7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRtYWdpYy5fYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIGYsIG51bGwsIG9uRGF0YSk7XG5cdFx0bWFnaWMuX3JlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDEnLCBudWxsLCBudWxsLCB7XG5cdFx0XHR4OiA0MlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQxJyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cblx0XHRtYWdpYy5fYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIGYsIG51bGwsIG9uRGF0YSk7XG5cdFx0bWFnaWMuX3JlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDInLCBudWxsLCBudWxsLCB7XG5cdFx0XHR4OiA0M1xuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQyJyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0XHQvKmVzbGludC1lbmFibGUgKi9cblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG54ZGVzY3JpYmUoXCJFdmVudHMgY29yZTogX2FkZERPTUxpc3RlbmVyLCBfcmVtb3ZlRE9NTGlzdGVuZXJcIiwgKCkgPT4ge1xuXHRsZXQgcSA9IChzLCBjKSA9PiB7XG5cdFx0bGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcblx0XHRpZiAocmVzdWx0KSB7XG5cdFx0XHRyZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcblx0XHRcdFx0bGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuXHRcdFx0XHRldi5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRcImNsaWNrXCIsXG5cdFx0XHRcdFx0dHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuXHRcdFx0XHRcdHdpbmRvdywgbnVsbCxcblx0XHRcdFx0XHQwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuXHRcdFx0XHRcdGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG5cdFx0XHRcdFx0MCAvKmxlZnQqLyAsIG51bGxcblx0XHRcdFx0KTtcblx0XHRcdFx0cmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuXHRcdHRhZ05hbWU6ICdESVYnLFxuXHRcdGlkOiAnZC10ZXN0Jyxcblx0XHRpbm5lckhUTUw6IGBcblx0XHRcdDxkaXYgaWQ9XCJkLXRlc3QtMVwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZC10ZXN0LTJcIj5cblxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGBcblx0fSkpO1xuXG5cblxuXHRpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cblx0aXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgYW5kIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIHRoZW4gYmluZHMgdGhlbiByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgRE9NIGV2ZW50JywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnLCAxLCAyKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yIChidWJibGluZyB0ZXN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkIGFuZCBkb2VzblxcJ3QgcmVtb3ZlIGV2ZW50cyBmcm9tIG90aGVyIG5vZGVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmJsYWgnKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblxuXHRpdCgndHJpZ2dlcnMgZXZlbnQgdmlhIFwidHJpZ2dlclwiIG1ldGhvZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdFdmVudHMgc3VtbWFyeSAob24sIG9mZiknLCAoKSA9PiB7XG5cdGxldCBxID0gKHMsIGMpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cdFx0XHRcdGV2LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFx0XHR0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG5cdFx0XHRcdFx0d2luZG93LCBudWxsLFxuXHRcdFx0XHRcdDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cblx0XHRcdFx0XHQwIC8qbGVmdCovICwgbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGxldCBub2RlID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG5cdFx0dGFnTmFtZTogJ0RJVicsXG5cdFx0aWQ6ICdzLXRlc3QnLFxuXHRcdGlubmVySFRNTDogYFxuXHRcdFx0PGRpdiBpZD1cInMtdGVzdC0xXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzLXRlc3QtMlwiPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YFxuXHR9KSk7XG5cblx0bm9kZS5jbGljayA9IG5vZGUuY2xpY2sgfHwgZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KCdjbGljaycpKTtcblx0fVxuXG5cdGl0KCdmaXJlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cdFx0bWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCdmaXJlcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXHRcdG1rLm9uKCdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMub2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWsub24oJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLm9mZignc29tZWV2ZW50Jyk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHt9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMub2ZmKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnY2xpY2s6OngnKTtcblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLm9uKG9iaiwgJ0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBvbmNlJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRtYWdpYy5vbmNlKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25jZVwiJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRmMSA9IGV2dCA9PiBpKyssXG5cdFx0XHRmMiA9IGV2dCA9PiBqKys7XG5cblx0XHRtYWdpYy5vbmNlKG9iaiwge1xuXHRcdFx0Zm9vOiBmMSxcblx0XHRcdGJhcjogZjJcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRleHBlY3QoaikudG9CZSgxKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIG9uY2Ugb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRtay5vbmNlKCdzb21lZXZlbnQnLCBmKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHR9KTtcblxuXG5cdGl0KCdvbkRlYm91bmNlIHdvcmtzJywgZG9uZSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgMjAwKTtcblxuXHRcdG1hZ2ljLm9uRGVib3VuY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdH0pO1xuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25EZWJvdW5jZVwiJywgKGRvbmUpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGogPSAwLFxuXHRcdFx0ZjEgPSBldnQgPT4gaSsrLFxuXHRcdFx0ZjIgPSBldnQgPT4gaisrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGV4cGVjdChqKS50b0JlKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDIwMCk7XG5cblx0XHRtYWdpYy5vbkRlYm91bmNlKG9iaiwge1xuXHRcdFx0Zm9vOiBmMSxcblx0XHRcdGJhcjogZjJcblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdvbkRlYm91bmNlIHdvcmtzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsIGRvbmUgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGkgPSAwLFxuXHRcdFx0ZiA9IGV2dCA9PiBpKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZG9uZSgpO1xuXHRcdH0sIDgwMCk7XG5cblx0XHRtay5vbkRlYm91bmNlKCdzb21lZXZlbnQnLCBmKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblx0fSk7XG5cblxuXHRpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uXCIgYW5kIFwib2ZmXCInLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRoYW5kbGVycyA9IHtcblx0XHRcdFx0Zm9vOiAoKSA9PiBpKyssXG5cdFx0XHRcdGJhcjogKCkgPT4gaSsrXG5cdFx0XHR9O1xuXG5cdFx0TUsub24ob2JqLCBoYW5kbGVycyk7XG5cblx0XHRNSy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdE1LLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgyKTtcblxuXHRcdE1LLm9mZihvYmosIGhhbmRsZXJzKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXHR9KTtcblxuXG5cdGl0KCdhbGxvd3MgdG8gZmxpcCBjb250ZXh0IGFuZCB0cmlnZ2VyT25Jbml0IChvbiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0dGhpc0FyZyA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0aSA9IDA7XG5cblx0XHRNSy5vbihvYmosICdmb28nLCBmdW5jdGlvbigpIHtcblx0XHRcdGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuXHRcdFx0aSsrO1xuXHRcdH0sIHRydWUsIHRoaXNBcmcpO1xuXG5cdFx0TUsub24ob2JqLCAnYmFyJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcblx0XHRcdGkrKztcblx0XHR9LCB0aGlzQXJnLCB0cnVlKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qc1xuICoqLyIsInZhciBtYXAgPSB7XG5cdFwiLi9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanNcIjogMzAsXG5cdFwiLi9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanNcIjogMzIsXG5cdFwiLi9fYmluZGluZ3MvZ2V0bm9kZXMuanNcIjogMTIsXG5cdFwiLi9fYmluZGluZ3MvbG9va2ZvcmJpbmRlci5qc1wiOiAzMSxcblx0XCIuL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1wiOiA3MCxcblx0XCIuL19iaW5kaW5ncy9ydW5vYmplY3RoYW5kbGVyLmpzXCI6IDY5LFxuXHRcIi4vX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXCI6IDEzLFxuXHRcIi4vX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcIjogNjcsXG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDYsXG5cdFwiLi9fY29yZS9kZWZzLmpzXCI6IDUsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDQsXG5cdFwiLi9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXCI6IDE1LFxuXHRcIi4vX2RvbS9pbmRleC5qc1wiOiAxNCxcblx0XCIuL19ldmVudHMvYWRkbGlzdGVuZXIuanNcIjogMzMsXG5cdFwiLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcIjogMzYsXG5cdFwiLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXCI6IDM1LFxuXHRcIi4vX2V2ZW50cy90cmlnZ2Vyb25lLmpzXCI6IDgsXG5cdFwiLi9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiAzNyxcblx0XCIuL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1wiOiA5LFxuXHRcIi4vX3V0aWwvZGVib3VuY2UuanNcIjogNjYsXG5cdFwiLi9fdXRpbC9pcy5qc1wiOiAxMSxcblx0XCIuL191dGlsL21hdHJlc2hrYWVycm9yLmpzXCI6IDEwLFxuXHRcIi4vYXJyYXkuanNcIjogNTgsXG5cdFwiLi9iaW5kZXJzLmpzXCI6IDU5LFxuXHRcIi4vYmluZG5vZGUuanNcIjogMyxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAyNCxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAxOCxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAxNyxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogMjcsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDIyLFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogMjksXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMTYsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMjUsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDI4LFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAyNixcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAyMyxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMjEsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDIwLFxuXHRcIi4vY2xhc3MuanNcIjogNTAsXG5cdFwiLi9leHRlbmQuanNcIjogMTksXG5cdFwiLi9pbmRleC5qc1wiOiA2MSxcblx0XCIuL21hZ2ljLmpzXCI6IDY0LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDYyLFxuXHRcIi4vb2JqZWN0L2luZGV4LmpzXCI6IDYzLFxuXHRcIi4vb24uanNcIjogNjUsXG5cdFwiLi9zZXQuanNcIjogNyxcblx0XCIuL3VuYmluZG5vZGUuanNcIjogMzRcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNTc7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gNTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcnJheS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IE1hdHJlc2hrYSBmcm9tICcuL21hdHJlc2hrYSc7XG5pbXBvcnQgTWF0cmVzaGthQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgTWF0cmVzaGthT2JqZWN0IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBDbGFzcyBmcm9tICcuL2NsYXNzJztcbmltcG9ydCBiaW5kZXJzIGZyb20gJy4vYmluZGVycyc7XG5cbk1hdHJlc2hrYS5BcnJheSA9IE1hdHJlc2hrYUFycmF5O1xuTWF0cmVzaGthLk9iamVjdCA9IE1hdHJlc2hrYU9iamVjdDtcbk1hdHJlc2hrYS5DbGFzcyA9IENsYXNzO1xuTWF0cmVzaGthLmJpbmRlcnMgPSBiaW5kZXJzO1xuXG5leHBvcnQgZGVmYXVsdCBNYXRyZXNoa2E7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBDbGFzcyBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzKHtcblx0Ly8gaW5zdGFuY2UgcHJvcGVyaWVzIGFuZCBtZXRob2RzXG5cbn0sIHtcblx0Ly8gc3RhdGljIHByb3BlcnRpZXMgYW5kIG1ldGhvZHNcblx0ZXh0ZW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hdHJlc2hrYS9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYmplY3QvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFnaWMuanNcbiAqKi8iLCJcbi8vIC9eKChbXkBdKylAKT8oKC4rPykoOjooW15cXChcXCldKyk/KFxcKCguKilcXCkpPyk/KT8kL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbigpIHtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24uanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCBkZWxheSwgdGhpc0FyZykge1xuXHRsZXQgdGltZW91dDtcblx0aWYgKHR5cGVvZiBkZWxheSAhPT0gJ251bWJlcicpIHtcblx0XHR0aGlzQXJnID0gZGVsYXk7XG5cdFx0ZGVsYXkgPSAwO1xuXHR9XG5cblx0ZGVsYXkgPSBkZWxheSB8fCAwO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IFthMSwgYTIsIGEzXSA9IGFyZ3M7XG5cdFx0Y29uc3QgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuXHRcdGNvbnN0IGNhbGxDb250ZXh0ID0gdGhpc0FyZyB8fCB0aGlzO1xuXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0c3dpdGNoKGFyZ3NMZW5ndGgpIHtcblx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdGZ1bmMuY2FsbChjYWxsQ29udGV4dCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRmdW5jLmNhbGwoY2FsbENvbnRleHQsIGExKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyLCBhMyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjYWxsQ29udGV4dCwgYXJncyk7XG5cdFx0XHR9XG5cdFx0fSwgZGVsYXkpO1xuXHR9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2RlYm91bmNlLmpzXG4gKiovIiwiLy8gcmUtYWRkcyBiaW5kaW5nIHdoZW4gb2JqZWN0IGJyYW5jaCBpcyBjaGFuZ2VkXG4vLyB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IGJpbmROb2RlIHdoZW4gc29tZXRoaW5nIGxpa2UgJ2Zvby5iYXIuYmF6JyBpcyBwYXNzZWQgdG8gaXQgYXMga2V5IGFyZyB2YWx1ZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dpdGNoQmluZGluZyAoe1xuICAgIGNoYW5nZUV2dCxcbiAgICBvYmplY3QsXG4gICAgZGVlcFBhdGgsXG4gICAgJG5vZGVzLFxuICAgIGJpbmRlcixcbiAgICBldnQsXG5cdGJpbmROb2RlXG59KSB7XG5cdGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuICAgIGxldCB7XG5cdFx0dmFsdWU6IHRhcmdldCxcblx0XHRwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1RhcmdldFxuXHR9ID0gY2hhbmdlRXZ0O1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0ID0gb2JqZWN0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbZGVlcFBhdGhbaV1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE5vZGUodGFyZ2V0LCBkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDFdLCAkbm9kZXMsIGJpbmRlciwgZXZ0KTtcblxuXHQvLyByZW1vdmUgYmluZGluZyBmb3IgcHJldmlvdXNseSB1c2VkIG9iamVjdFxuICAgIGlmIChwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuYmluZE5vZGUocHJldmlvdXNUYXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sICRub2Rlcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcbiAqKi8iLCIvLyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHByb3BlcnR5IHZhbHVlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk9iamVjdEhhbmRsZXIgKHtcbiAgICBub2RlLFxuICAgIHByb3BEZWYsXG4gICAgYmluZGVyLFxuICAgIG9wdGlvbnMsXG4gICAgZXZ0XG59KSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCB7IG9uQ2hhbmdlVmFsdWUsIGNoYW5nZWROb2RlLCBiaW5kZXI6IGV2dEJpbmRlciB9ID0gZXZ0O1xuICAgIGNvbnN0IHsgc2V0VmFsdWUgfSA9IGJpbmRlcjtcblx0Ly8gZGlydHkgaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcblx0Y29uc3QgZGlydHlIYWNrVmFsdWUgPSBvbkNoYW5nZVZhbHVlID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdmFsdWUgKyAnJyA6IHZhbHVlO1xuXG4gICAgaWYgKGNoYW5nZWROb2RlID09PSBub2RlICYmIG9uQ2hhbmdlVmFsdWUgPT09IGRpcnR5SGFja1ZhbHVlICYmIGV2dEJpbmRlciA9PT0gYmluZGVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRWYWx1ZS5jYWxsKG5vZGUsIHZhbHVlLCBub2ZuLmFzc2lnbih7IHZhbHVlIH0sIG9wdGlvbnMpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9ydW5vYmplY3RoYW5kbGVyLmpzXG4gKiovIiwiaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBib3VuZCBub2RlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICBkb21FdmVudCA9IHt9LFxuICAgIG9iamVjdCxcbiAgICBrZXksXG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBvcHRpb25zXG59KSB7XG4gICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG4gICAgY29uc3QgeyB3aGljaCwgdGFyZ2V0IH0gPSBkb21FdmVudDtcbiAgICBjb25zdCB7IGdldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG5vZm4uYXNzaWduKHtcbiAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQsIC8vIGpRdWVyeSB0aGluZ1xuICAgICAgICAvLyB3aWxsIHRocm93IFwicHJldmVudERlZmF1bHQgaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcbiAgICAgICAgLy8gd2lsbCB0aHJvdyBcInN0b3BQcm9wYWdhdGlvbiBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogKCkgPT4gZG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksXG4gICAgICAgIHdoaWNoLFxuICAgICAgICB0YXJnZXRcbiAgICB9LCBvcHRpb25zKSk7XG5cbiAgICBpZiAoIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAvLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBvZiBhIGhhY2tcbiAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgY2hhbmdlZE5vZGUsIG9uQ2hhbmdlVmFsdWUsIGJpbmRlcj9cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuICAgICAgICAgICAgZnJvbU5vZGU6IHRydWUsXG4gICAgICAgICAgICBjaGFuZ2VkTm9kZTogbm9kZSxcbiAgICAgICAgICAgIG9uQ2hhbmdlVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgYmluZGVyXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNweSgpIHtcblx0Y29uc3Qgc3B5TmFtZSA9IGByYW5kb21OYW1lJHtNYXRoLnJhbmRvbSgpfSR7bmV3IERhdGUoKS5nZXRUaW1lKCl9YDtcblx0Y29uc3Qgc3B5ID0gKCkgPT4ge307XG5cdGNvbnN0IHNweU9iaiA9IHt9O1xuXHRzcHlPYmpbc3B5TmFtZV0gPSBzcHk7XG5cdHJldHVybiBzcHlPbihzcHlPYmosIHNweU5hbWUpOztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvY3JlYXRlc3B5LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==