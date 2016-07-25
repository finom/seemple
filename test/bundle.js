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
	
	var componentsContext = __webpack_require__(62);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 2,
		"./bquery/add_spec.js": 44,
		"./bquery/create_spec.js": 45,
		"./bquery/events_spec.js": 46,
		"./bquery/find_spec.js": 48,
		"./bquery/init_spec.js": 49,
		"./bquery/is_spec.js": 50,
		"./bquery/not_spec.js": 51,
		"./bquery/one_spec.js": 52,
		"./bquery/parsehtml_spec.js": 53,
		"./class_spec.js": 54,
		"./events/delegated_collection_spec.js": 56,
		"./events/delegated_spec.js": 57,
		"./events/events_change_spec.js": 58,
		"./events/events_core_spec.js": 59,
		"./events/events_dom_spec.js": 60,
		"./events/events_summary_spec.js": 61
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
	
	var unbindNode = __webpack_require__(31);
	
	var addListener = __webpack_require__(39);
	
	var makeObject = __webpack_require__(42);
	
	var createSpy = __webpack_require__(43);
	
	describe('Bindings', function () {
		var obj = void 0;
		var node = void 0;
		var node2 = void 0;
		var binder = void 0;
		var simulateDomEvent = void 0;
		var initializeCall = void 0;
		var destroyCall = void 0;
		var noDebounceFlag = { debounce: false };
	
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
			expect([...obj.$nodes.x]).toEqual([node]);
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
	
	var switchBinding = __webpack_require__(30);
	
	var bindSingleNode = __webpack_require__(34);
	
	var checkObjectType = __webpack_require__(9);
	
	var MatreshkaError = __webpack_require__(10);
	
	var delegateListener = __webpack_require__(41);
	
	var addListener = __webpack_require__(39);
	
	var removeListener = __webpack_require__(32);
	
	var triggerOne = __webpack_require__(8);
	
	var unbindNode = __webpack_require__(31);
	
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
	
	var unbindNode = __webpack_require__(31);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(9);
	
	var initMK = __webpack_require__(4);
	
	var getNodes = __webpack_require__(12);
	
	var bindNode = __webpack_require__(3);
	
	var undelegateListener = __webpack_require__(33);
	
	var removeBinding = __webpack_require__(70);
	
	var dom = __webpack_require__(14);
	
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
	
		var _initMK = initMK(object);
	
		var props = _initMK.props;
	
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
	
			// update nodes and $nodes for Matreshka instance
	
			for (var _target5 = bindings, _index3 = 0, binding, _l5 = _target5.length; binding = _target5[_index3], _index3 < _l5; _index3++) {
				removeBinding({ object: object, key: key, evt: evt }, binding);
			}
	
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var removeListener = __webpack_require__(32);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(35);
	
	var runNodeHandler = __webpack_require__(37);
	
	var runObjectHandler = __webpack_require__(38);
	
	var triggerOne = __webpack_require__(8);
	
	var addListener = __webpack_require__(39);
	
	var is = __webpack_require__(11);
	
	var debounce = __webpack_require__(40);
	
	var dom = __webpack_require__(14);
	
	var set = __webpack_require__(7);
	
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
	
	            // TODO throw error when "on" and maybe other binder properties has wrong type
	            if (typeof on === 'function') {
	                on.call(node, nodeHandler, options);
	            } else if (typeof on === 'string') {
	                for (var _target = on.split(spaceReg), _index = 0, evtName, _l5 = _target.length; evtName = _target[_index], _index < _l5; _index++) {
	                    node.addEventListener(evtName, nodeHandler)
	                }
	                // addEventListener is faster than "on" method from any DOM library
	
	            }
	        })();
	    }
	
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(36);
	
	module.exports = function (node) {
	    var result, i;
	
	    for (i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 36 */
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
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(4);
	
	var triggerOne = __webpack_require__(8);
	
	var defineProp = __webpack_require__(6);
	
	// property modifier event regexp
	var propModEventReg = /^_change:deps:|^_change:bindings:|^_change:delegated:|^_change:tree:|^change:|^beforechange:/;
	
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
/* 40 */
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(39);
	
	var undelegateListener = __webpack_require__(33);
	
	var triggerOne = __webpack_require__(8);
	
	var defs = __webpack_require__(5);
	
	var is = __webpack_require__(11);
	
	var treeChangeEvtReg = /^_change:tree:/; /*eslint no-use-before-define: ["error", { "functions": false }]*/
	
	
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
/* 42 */
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
/* 43 */
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

/***/ },
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this;
	
	var $ = __webpack_require__(16);
	
	var simulateClick = __webpack_require__(47);
	
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
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
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
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(55);
	
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
/* 55 */
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
/* 56 */
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(41);
	
	var undelegateListener = __webpack_require__(33);
	
	var triggerOne = __webpack_require__(8);
	
	var makeObject = __webpack_require__(42);
	
	var createSpy = __webpack_require__(43);
	
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(39);
	
	var delegateListener = __webpack_require__(41);
	
	var undelegateListener = __webpack_require__(33);
	
	var removeListener = __webpack_require__(32);
	
	var makeObject = __webpack_require__(42);
	
	var createSpy = __webpack_require__(43);
	
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(39);
	
	var removeListener = __webpack_require__(32);
	
	var triggerOne = __webpack_require__(8);
	
	var createSpy = __webpack_require__(43);
	
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
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 34,
		"./_bindings/defaultbinders.js": 36,
		"./_bindings/getnodes.js": 12,
		"./_bindings/lookforbinder.js": 35,
		"./_bindings/removebinding.js": 70,
		"./_bindings/runnodehandler.js": 37,
		"./_bindings/runobjecthandler.js": 38,
		"./_bindings/selectnodes.js": 13,
		"./_bindings/switchbinding.js": 30,
		"./_core/defineprop.js": 6,
		"./_core/defs.js": 5,
		"./_core/init.js": 4,
		"./_dom/default-dollar.js": 15,
		"./_dom/index.js": 14,
		"./_events/addlistener.js": 39,
		"./_events/delegatelistener.js": 41,
		"./_events/removelistener.js": 32,
		"./_events/triggerone.js": 8,
		"./_events/undelegatelistener.js": 33,
		"./_util/checkobjecttype.js": 9,
		"./_util/debounce.js": 40,
		"./_util/is.js": 11,
		"./_util/matreshkaerror.js": 10,
		"./array.js": 63,
		"./binders.js": 64,
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
		"./class.js": 55,
		"./extend.js": 19,
		"./index.js": 65,
		"./magic.js": 68,
		"./matreshka/index.js": 66,
		"./object/index.js": 67,
		"./on.js": 69,
		"./set.js": 7,
		"./unbindnode.js": 31
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
	webpackContext.id = 62;


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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(66);
	
	var MatreshkaArray = __webpack_require__(63);
	
	var MatreshkaObject = __webpack_require__(67);
	
	var Class = __webpack_require__(55);
	
	var binders = __webpack_require__(64);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(19);
	
	var Class = __webpack_require__(55);
	
	module.exports = Class({
		// instance properies and methods
	
	}, {
		// static properties and methods
		extend: extend
	});

/***/ },
/* 67 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var removeListener = __webpack_require__(32);
	
	var triggerOne = __webpack_require__(8);
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTU0MGU5MGYwZGE0OGVhMDU0MTUiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3Mvc3dpdGNoYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3J1bm5vZGVoYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy9hZGRsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL2NyZWF0ZXNweS5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9vYmplY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hZ2ljLmpzIiwid2VicGFjazovLy8uL3NyYy9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNyQ0EsS0FBTSwyQkFBMkIsRUFBM0I7Ozs7QUFJTixLQUFNLGVBQWUsc0JBQWY7O0FBRU4sVUFBUyxVQUFULENBQW9CLElBQXBCLEVBQTBCO0FBQ3pCLFNBQU8seUJBQXlCLE9BQXpCLENBQWlDLElBQWpDLEtBQTBDLENBQTFDLENBRGtCO0VBQTFCOztBQUlBLEtBQUksV0FBVyxhQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FBMkIsVUFBM0IsQ0FBWDs7O0FBR0osS0FBSSxDQUFDLFNBQVMsTUFBVCxFQUFpQjtBQUNyQixhQUFXLGFBQWEsSUFBYixFQUFYLENBRHFCO0VBQXRCOztBQUlBLFVBQVMsT0FBVCxDQUFpQixZQUFqQjs7QUFHQSxLQUFNLG9CQUFvQix1QkFBcEI7QUFDTixtQkFBa0IsSUFBbEIsR0FBeUIsT0FBekIsQ0FBaUMsaUJBQWpDLEU7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHVEQUF1RDtBQUN4RjtBQUNBO0FB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QUFjLFFBQWQsRUFBdUI7c0JBR25CLEdBQUcsS0FBSCxDQUFTLFFBQVQsZUFDWjtBQUFXLFNBQUssbUJBQUwsQ0FBeUIsT0FBekIsRUFBa0MsV0FBbEM7Ozs7QUFKb0I7R0FBMUI7OztBQVRMLGdCQWlCRixDQUFlLE1BQWYsd0JBQTJDLEdBQTNDLEVBQWtELGFBQWxEOzs7QUFqQkUsTUFvQkMsT0FBSCxFQUFZO0FBQ1gsV0FBUSxJQUFSLENBQWEsSUFBYixFQUFtQixPQUFuQixFQURXO0dBQVo7OztBQXBCRSxNQXlCSyxDQUFDLE1BQUQsRUFBUztpQkFDdUI7QUFDNUIsWUFENEI7QUFFNUIsY0FGNEI7S0FEdkI7O3VCQUlOOzs7SUFKTTs7QUFDVCxPQUFNLHFCQUFOLENBRFM7O0FBTVQsY0FBVyxNQUFYLGNBQTZCLEdBQTdCLEVBQW9DLFdBQXBDLEVBTlM7QUFPVCxjQUFXLE1BQVgsRUFBbUIsUUFBbkIsRUFBNkIsV0FBN0IsRUFQUztHQUFiIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYTU0MGU5MGYwZGE0OGVhMDU0MTVcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogMixcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiA0NCxcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiA0NSxcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiA0Nixcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogNDgsXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDQ5LFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogNTAsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogNTEsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogNTIsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogNTMsXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDU0LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogNTYsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogNTcsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDU4LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogNTksXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDYwLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogNjFcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJ3NyYy91bmJpbmRub2RlJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQmluZGluZ3MnLCAoKSA9PiB7XG5cdGxldCBvYmo7XG5cdGxldCBub2RlO1xuXHRsZXQgbm9kZTI7XG5cdGxldCBiaW5kZXI7XG5cdGxldCBzaW11bGF0ZURvbUV2ZW50O1xuXHRsZXQgaW5pdGlhbGl6ZUNhbGw7XG5cdGxldCBkZXN0cm95Q2FsbDtcblx0Y29uc3Qgbm9EZWJvdW5jZUZsYWcgPSB7IGRlYm91bmNlOiBmYWxzZSB9O1xuXG5cdGNvbnN0IHRlc3RTaW1wbGVCaW5kID0gKGtleSA9ICd4JykgPT4ge1xuXHRcdG9ialtrZXldID0gJ2Zvbyc7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRub2RlLm9uZHVtbXlldmVudCgpO1xuXHRcdGV4cGVjdChvYmpba2V5XSkudG9FcXVhbCgnYmFyJyk7XG5cdFx0ZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH07XG5cblx0Y29uc3QgdGVzdFNpbXBsZVVuYmluZCA9ICgpID0+IHtcblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcblx0XHRub2RlLnZhbHVlID0gJ2Jheic7XG5cdFx0bm9kZS5vbmR1bW15ZXZlbnQoKTtcblx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdGV4cGVjdChkZXN0cm95Q2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9O1xuXG5cdGJlZm9yZUVhY2goKCkgPT4ge1xuXHRcdG9iaiA9IHt9O1xuXHRcdG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0bm9kZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cblx0XHRpbml0aWFsaXplQ2FsbCA9IGNyZWF0ZVNweSgpO1xuXHRcdGRlc3Ryb3lDYWxsID0gY3JlYXRlU3B5KCk7XG5cblx0XHRiaW5kZXIgPSAge1xuXHRcdFx0b24oY2JjKSB7XG5cdFx0XHRcdHRoaXMub25kdW1teWV2ZW50ID0gY2JjO1xuXHRcdFx0fSxcblx0XHRcdGdldFZhbHVlKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy52YWx1ZTtcblx0XHRcdH0sXG5cdFx0XHRzZXRWYWx1ZSh2KSB7XG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2O1xuXHRcdFx0fSxcblx0XHRcdGluaXRpYWxpemUobykge1xuXHRcdFx0XHR0aGlzLnZhbHVlID0gJyc7XG5cdFx0XHRcdGluaXRpYWxpemVDYWxsKCk7XG5cdFx0XHR9LFxuXHRcdFx0ZGVzdHJveSgpIHtcblx0XHRcdFx0Ly90aGlzLm9uZHVtbXlldmVudCA9ICgpID0+IHt9O1xuXHRcdFx0XHRkZXN0cm95Q2FsbCgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgZGVib3VuY2UnLCBkb25lID0+IHtcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyKTtcblx0XHRvYmoueCA9ICdmb28nO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRcdG5vZGUub25kdW1teWV2ZW50KCk7XG5cdFx0XHRleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2JhcicpO1xuXHRcdFx0ZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgNTApO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIGJpbmQgYW5kIHRyaWdnZXIgZXZlbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IGJpbmRDYWxsID0gY3JlYXRlU3B5KCk7XG5cdFx0Y29uc3QgYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdiaW5kJywgYmluZENhbGwpO1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ2JpbmQ6eCcsIGJpbmRLZXlDYWxsKTtcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dGVzdFNpbXBsZUJpbmQoKTtcblx0XHRleHBlY3QoYmluZENhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0XHRleHBlY3QoYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCB1bmJpbmQgYW5kIHRyaWdnZXIgZXZlbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IHVuYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcblx0XHRjb25zdCB1bmJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAndW5iaW5kJywgdW5iaW5kQ2FsbCk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAndW5iaW5kOngnLCB1bmJpbmRLZXlDYWxsKTtcblx0XHRiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dW5iaW5kTm9kZShvYmosICd4Jywgbm9kZSk7XG5cdFx0dGVzdFNpbXBsZVVuYmluZCgpO1xuXHRcdGV4cGVjdCh1bmJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdFx0ZXhwZWN0KHVuYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcblx0XHRiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcblx0XHR0ZXN0U2ltcGxlQmluZCgpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIG5vdCB1bmJpbmQgd25lIHdyb25nIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG5cdFx0Y29uc3Qgd3JvbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdHVuYmluZE5vZGUob2JqLCAneCcsIHdyb25nTm9kZSk7XG5cdFx0dGVzdFNpbXBsZUJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBub3QgdW5iaW5kIHduZSB3cm9uZyBrZXkgaXMgZ2l2ZW4nLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdHVuYmluZE5vZGUob2JqLCAneScsIG5vZGUpO1xuXHRcdHRlc3RTaW1wbGVCaW5kKCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgdW5iaW5kIHdoZW4gbm9kZSBpcyBub3QgZ2l2ZW4nLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdHVuYmluZE5vZGUob2JqLCAneCcpO1xuXHRcdHRlc3RTaW1wbGVVbmJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCB1bmJpbmQgYWxsIHdoZW4gbmVpdGhlciBrZXkgbm9yIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdHVuYmluZE5vZGUob2JqKTtcblx0XHR0ZXN0U2ltcGxlVW5iaW5kKCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgdW5iaW5kIGtleS1ub2RlIG9iamVjdCcsICgpID0+IHtcblx0XHRiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcblx0XHR1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuXHRcdHRlc3RTaW1wbGVVbmJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIHVzaW5nIGFycmF5IG9mIG9iamVjdHMnLCAoKSA9PiB7XG5cdFx0YmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dGVzdFNpbXBsZUJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCB1bmJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcblx0XHRiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcblx0XHR1bmJpbmROb2RlKG9iaiwgW3sga2V5OiAneCcsIG5vZGUgfV0pO1xuXHRcdHRlc3RTaW1wbGVVbmJpbmQoKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcblx0XHRvYmogPSB7XG5cdFx0XHRpc01LOiB0cnVlLFxuXHRcdFx0bm9kZXM6IHt9LFxuXHRcdFx0JG5vZGVzOiB7fVxuXHRcdH07XG5cdFx0YmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dGVzdFNpbXBsZUJpbmQoKTtcblx0XHRleHBlY3Qob2JqLm5vZGVzLngpLnRvRXF1YWwobm9kZSk7XG5cdFx0ZXhwZWN0KFtcblx0XHRcdC4uLm9iai4kbm9kZXMueFxuXHRcdF0pLnRvRXF1YWwoW25vZGVdKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCB1bmJpbmQgYSBwcm9wZXJ0eSBpbiBjb250ZXh0IG9iamVjdCB3aGljaCBoYXMgaXNNSz10cnVlIHByb3BlcnR5JywgKCkgPT4ge1xuXHRcdG9iaiA9IHtcblx0XHRcdGlzTUs6IHRydWUsXG5cdFx0XHRub2Rlczoge30sXG5cdFx0XHQkbm9kZXM6IHt9XG5cdFx0fTtcblx0XHRiaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcblx0XHR1bmJpbmROb2RlLmNhbGwob2JqLCAneCcsIG5vZGUpO1xuXHRcdHRlc3RTaW1wbGVVbmJpbmQoKTtcblx0XHRleHBlY3Qob2JqLm5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcblx0XHRleHBlY3Qob2JqLiRub2Rlcy54KS50b0JlVW5kZWZpbmVkKCk7XG5cdH0pO1xuXG5cdGl0KCdzaG91bGQgYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0b2JqLngueS56ID0gJ2Zvbyc7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRub2RlLm9uZHVtbXlldmVudCgpO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIHVuYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0dW5iaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUpO1xuXHRcdG9iai54LnkueiA9ICdmb28nO1xuXHRcdGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcblx0XHRub2RlLnZhbHVlID0gJ2Jhcic7XG5cdFx0bm9kZS5vbmR1bW15ZXZlbnQoKTtcblx0XHRleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcblx0fSk7XG5cblx0aXQoJ2NhbmNlbHMgZGVlcCBiaW5kaW5nIHdoZW4gZGVlcD1mYWxzZSBvcHRpb24gaXMgcGFzc2VkJywgKCkgPT4ge1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBPYmplY3QuYXNzaWduKHtcblx0XHRcdGRlZXA6IGZhbHNlXG5cdFx0fSwgbm9EZWJvdW5jZUZsYWcpKTtcblx0XHR0ZXN0U2ltcGxlQmluZCgneC55LnonKTtcblx0fSk7XG5cblx0aXQoJ3Nob3VsZCByZWJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnkueicsICdnbycpO1xuXHRcdGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cdFx0b2JqLnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG5cdFx0ZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuXHRcdG5vZGUudmFsdWUgPSAnYmFyJztcblx0XHRub2RlLm9uZHVtbXlldmVudCgpO1xuXHRcdGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuXHR9KTtcblxuXHRpdCgnc2hvdWxkIHJlbW92ZSBiaW5kaW5nIGlmIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCcsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknKTtcblx0XHRiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuXHRcdGNvbnN0IHggPSBvYmoueDtcblxuXHRcdG9iai54ID0gbWFrZU9iamVjdCgneS56JywgJ2ZvbycpO1xuXG5cdFx0bm9kZS52YWx1ZSA9ICdiYXInO1xuXHRcdG5vZGUub25kdW1teWV2ZW50KCk7XG5cdFx0ZXhwZWN0KHgueS56KS5ub3QudG9FcXVhbCgnYmFyJyk7XG5cdFx0d2luZG93LnRhcmdldCA9IG9iai54Lnk7XG5cdFx0ZXhwZWN0KG9iai54LnkueikudG9FcXVhbCgnYmFyJyk7XG5cdFx0eC55LnogPSAnYmF6Jztcblx0XHRleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0eGl0KCd1c2VzIGN1c3RvbSBzZWxlY3RvcnMgb24gY3VycmVudCB0YXJnZXQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IE1LLnRvKHt4OiB7eTogJ2Zvbyd9fSksXG5cdFx0IFx0ZGl2ID0gJC5jcmVhdGUoJ2RpdicpLFxuXHRcdFx0aW5wdXQgPSBkaXYuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoJ2lucHV0JykpO1xuXG5cdFx0b2JqLmJpbmROb2RlKCdzYW5kYm94JywgZGl2KTtcblx0XHRvYmouYmluZE5vZGUoJ3gueScsICc6c2FuZGJveCBpbnB1dCcsIHtcblx0XHRcdG9uKGNiYykge1xuXHRcdFx0XHR0aGlzLl9vbmtleXVwID0gY2JjO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0ZXhwZWN0KGlucHV0LnZhbHVlKS50b0VxdWFsKCdmb28nKTtcblx0XHRpbnB1dC52YWx1ZSA9ICdiYXInO1xuXHRcdGlucHV0Ll9vbmtleXVwKHt9KTtcblx0XHRleHBlY3Qob2JqLngueSkudG9FcXVhbCgnYmFyJyk7XG5cdH0pO1xuXG5cblx0aXQoYHRocm93cyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmVgLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KCgpID0+IHtcblx0XHRcdGJpbmROb2RlKG9iaiwgJ3gnKTtcblx0XHR9KS50b1Rocm93KCk7XG5cdH0pO1xuXG5cblx0aXQoYGRvZXNuJ3QgdGhyb3cgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlIGFuZCBvcHRpb25hbD10cnVlIGlzIGdpdmVuYCwgKCkgPT4ge1xuXHRcdGV4cGVjdCgoKSA9PiB7XG5cdFx0XHRiaW5kTm9kZShvYmosICd4JywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG5cdFx0fSkubm90LnRvVGhyb3coKTtcblx0fSk7XG5cblx0eGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIG1ldGhvZCBvZiBNYXRyZXNoa2Egd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LO1xuXG5cdFx0bWsuYmluZE9wdGlvbmFsTm9kZSgneCcsIG51bGwpO1xuXG5cdFx0ZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgncmV0dXJucyBib3VuZCBub2RlcycsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpbnB1dCA9IGJpbmRJbnB1dChvYmosICd4Jyk7XG5cblxuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy5ib3VuZChvYmosICd4JykpO1xuXHRcdGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy4kYm91bmQob2JqLCAneCcpWzBdKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgY2hpbGRyZW4gb2Ygc2FuZGJveCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge307XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0PHNwYW4+PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3Qob2JqLCAnc3BhbicpLnRhZ05hbWUpO1xuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS50YWdOYW1lKTtcblx0fSk7XG5cblxuXHR4aXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuXHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdDxzcGFuPjwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0KG9iaiwgJzpib3VuZChzYW5kYm94KSBzcGFuJykudGFnTmFtZSk7XG5cdFx0ZXhwZWN0KCdTUEFOJykudG9FcXVhbChtYWdpYy5zZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggc3BhbicpWzBdLnRhZ05hbWUpO1xuXHR9KTtcblxuXG5cblx0eGl0KCdhbGxvd3MgdG8gYmluZCBzYW5kYm94IHZpYSBiaW5kU2FuZGJveCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRkaXYgPSAkLmNyZWF0ZSgnZGl2Jyk7XG5cblx0XHRNSy5iaW5kU2FuZGJveChvYmosIGRpdik7XG5cblx0XHRleHBlY3QoTUsuYm91bmQob2JqLCAnc2FuZGJveCcpKS50b0VxdWFsKGRpdik7XG5cdH0pO1xuXG5cblx0eGl0KCdiaW5kU2FuZGJveCB0aHJvd3MgYW4gZXJyb3Igd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0dHJ5IHtcblx0XHRcdE1LLmJpbmRTYW5kYm94KG9iaiwgbnVsbCk7XG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHRib29sID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZVRydXRoeSgpO1xuXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgc3dpdGNoQmluZGluZyBmcm9tICcuL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnO1xuXG5cbi8vIFRoZSBtYWluIG1ldGhvZCBvZiB0aGUgZnJhbWV3b3JrOiBiaW5kcyBhIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0byBIVE1MIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IGJpbmRlcjtcbiAgICAgICAgYmluZGVyID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgIGJpbmRlciA9IGJpbmRlciB8fCB7fTtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7IG9wdGlvbmFsLCBkZWVwLCBzaWxlbnQgfSA9IGV2dDtcblxuICAgIC8vIHRocm93IGVycm9yIHdoZW4ga2V5IGlzIG5vdCBnaXZlblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgYmluZGVyLCBldnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVyZ2VkRXZlbnQgPSB7fTtcblxuXG4gICAgICAgICAgICAgICAgaWYoaXRlbUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJsb2NhbFwiIGV2ZW50IChcImV2ZW50XCIga2V5IG9mIGFuIG9iamVjdClcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnQsIGl0ZW1FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY29tbW9uRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIGV2ZW50IG9iamVjdCBieSBcImdsb2JhbFwiIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBjb21tb25FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgaXRlbUJpbmRlciwgbWVyZ2VkRXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogYWNjZXB0IGtleS1ub2RlIG9iamVjdFxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlLCBiaW5kZXIpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCAkbm9kZXMgPSBnZXROb2RlcyhvYmplY3QsIG5vZGUpO1xuXG4gICAgLy8gY2hlY2sgbm9kZSBleGlzdGVuY2VcbiAgICBpZiAoISRub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6bm9kZV9taXNzaW5nJywgeyBrZXksIG5vZGUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVlcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGRlZXBQYXRoTGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGJpbmRpbmcgd2hlbiBrZXkgYXJnIGluY2x1ZGVzIGRvdHMgKGVnIFwiYS5iLmMuZFwiKVxuICAgICAgICAgICAgY29uc3QgY2hhbmdlSGFuZGxlciA9IChjaGFuZ2VFdnQgPSB7fSkgPT4gc3dpdGNoQmluZGluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUV2dCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBkZWVwUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgJG5vZGVzLFxuICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIGV2dCxcbiAgICAgICAgICAgICAgICAgICAgYmluZE5vZGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMiksXG4gICAgICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMl19YCwgY2hhbmdlSGFuZGxlcik7XG5cbiAgICAgICAgICAgIGNoYW5nZUhhbmRsZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICAvLyBpZiBvYmplY3QgaXMgTWF0cmVzaGthIGluc3RhbmNlIHRoZW4gZXh0ZW5kIFwiJG5vZGVzXCIgYW5kIFwibm9kZXNcIiBvYmplY3RzXG4gICAgICAgIGNvbnN0IHsgJG5vZGVzOiAkYWxsTm9kZXMsIG5vZGVzOiBhbGxOb2RlcyB9ID0gb2JqZWN0O1xuXG4gICAgICAgIGlmKCEkYWxsTm9kZXMgfHwgIWFsbE5vZGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJywge1xuICAgICAgICAgICAgICAgICRub2RlczogJGFsbE5vZGVzLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBhbGxOb2Rlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldICYmICRhbGxOb2Rlc1trZXldLmxlbmd0aFxuICAgICAgICAgICAgPyAkYWxsTm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG5cbiAgICAgICAgYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldWzBdO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBiaW5kaW5nIGZvciBldmVyeSBub2RlIHNlcGFyYXRlbHlcbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCAobm9kZSkgPT4gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZSxcbiAgICAgICAga2V5LFxuICAgICAgICBldnQsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgcHJvcERlZlxuICAgIH0pKTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuXHRsZXQgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblx0aWYgKCFkZWYpIHtcblx0XHRkZWYgPSB7XG5cdFx0XHQvLyBhIHByb3BlcnR5IG5hbWUgb2YgXCJldmVudHNcIiBvYmplY3QgaXMgYW4gZXZlbnQgbmFtZVxuXHRcdFx0Ly8gYW5kIGEgdmFsdWUgaXMgYW4gYXJyYXkgb2YgZXZlbnQgaGFuZGxlcnNcblx0XHRcdGV2ZW50czoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHRjYWxsYmFjazogZnVuY3Rpb24sXG5cdFx0XHRcdFx0Y3R4OiBvYmplY3QsXG5cdFx0XHRcdFx0Y29udGV4dDogb2JqZWN0Mixcblx0XHRcdFx0XHRuYW1lOiBcImV4YW1wbGVcIlxuXHRcdFx0XHR9ICovXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXCJwcm9wc1wiIGNvbnRhaW5zIHNwZWNpYWwgaW5mb3JtYXRpb24gYWJvdXQgcHJvcGVydGllcyAoZ2V0dGVycywgc2V0dGVycyBldGMpXG5cdFx0XHRwcm9wczoge1xuXHRcdFx0XHQvKmV4YW1wbGU6IHtcblx0XHRcdFx0XHQ/IG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0XHR2YWx1ZTogb2JqZWN0W2tleV0sXG5cdFx0XHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0XHRtZWRpYXRvcjogbnVsbCxcblx0XHRcdFx0XHQvLz9kZXN0cm95ZXJzOiBNYXAsXG5cdFx0XHRcdFx0YmluZGluZ3M6IFt7XG5cdFx0XHRcdFx0XHRub2RlLFxuXHRcdFx0XHRcdFx0YmluZGVyLFxuXHRcdFx0XHRcdFx0bm9kZUhhbmRsZXIsXG5cdFx0XHRcdFx0XHRvYmplY3RIYW5kbGVyXG5cdFx0XHRcdFx0fV1cblx0XHRcdFx0fSovXG5cdFx0XHR9LFxuXHRcdFx0aWQ6IGBtayR7TWF0aC5yYW5kb20oKX1gXG5cdFx0fTtcblxuXHRcdGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcblx0fVxuXG5cdHJldHVybiBkZWY7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRNSyhvYmplY3QpIHtcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG5cdGlmICghb2JqZWN0IHx8IHR5cGUgIT09ICdvYmplY3QnKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuXHR9XG5cblx0Ly8gaWYgb2JqZWN0IGhhcyBfaW5pdE1LIG1ldGhvZCwgcnVuIGl0XG5cdC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcblx0Ly8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0cmV0dXJuIG9iamVjdC5faW5pdE1LID8gb2JqZWN0Ll9pbml0TUsoKSA6IGNvbW1vbkluaXQob2JqZWN0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2luaXQuanNcbiAqKi8iLCJmdW5jdGlvbiBQc2V1ZG9NYXAoKSB7fVxuXG4vLyBQc2V1ZG9NYXAgc2ltdWxhdGVzIFdlYWtNYXAgYmVoYXZpb3Igd2l0aCBPKDEpIHNlYXJjaCBjb21wbGV4aXR5XG4vLyBpdCdzIG5lZWRlZCBmb3IgQElFOSBhbmQgQElFMTBcbm5vZm4uYXNzaWduKFBzZXVkb01hcC5wcm90b3R5cGUsIHtcblx0Z2V0KG9iaikge1xuXHRcdHJldHVybiBvYmoubWF0cmVzaGthRGF0YTtcblx0fSxcblx0c2V0KG9iaiwgZGF0YSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuXHRcdFx0dmFsdWU6IGRhdGEsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0XHR9KTtcblx0fSxcblx0aGFzKG9iaikge1xuXHRcdHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuXHR9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBvYmplY3QgZGVmaW5pdGlvbiBkbyBub3RoaW5nXG5cdGlmICghZGVmKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRpZiAoIWRlZi5wcm9wc1trZXldKSB7XG5cdFx0Y29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuXHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0Z2V0dGVyOiBudWxsLFxuXHRcdFx0c2V0dGVyOiBudWxsLFxuXHRcdFx0bWVkaWF0b3I6IG51bGwsXG5cdFx0XHRiaW5kaW5nczogbnVsbFxuXHRcdH07XG5cblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0KCkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcERlZi5nZXR0ZXIgPyBwcm9wRGVmLmdldHRlci5jYWxsKG9iamVjdCkgOiBwcm9wRGVmLnZhbHVlO1xuXHRcdFx0fSxcblx0XHRcdHNldCh2KSB7XG5cdFx0XHRcdHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuXHRcdFx0XHRcdGZyb21TZXR0ZXI6IHRydWVcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZGVmLnByb3BzW2tleV07XG59XG5cblxuLypkZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRjb3JlLl9kZWZpbmVTcGVjaWFsID0gZnVuY3Rpb24ob2JqZWN0LCBrZXksIG5vQWNjZXNzb3JzKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JyB8fCAhbWFwLmhhcyhvYmplY3QpKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0dmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XTtcblxuXHRcdGlmICghc3BlY2lhbFByb3BzKSB7XG5cdFx0XHRzcGVjaWFsUHJvcHMgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XSA9IHtcblx0XHRcdFx0JG5vZGVzOiBjb3JlLiQoKSxcblx0XHRcdFx0dmFsdWU6IG9iamVjdFtrZXldLFxuXHRcdFx0XHRnZXR0ZXI6IG51bGwsXG5cdFx0XHRcdHNldHRlcjogbnVsbCxcblx0XHRcdFx0bWVkaWF0b3I6IG51bGxcblx0XHRcdH07XG5cblx0XHRcdGlmICghbm9BY2Nlc3NvcnMgJiYga2V5ICE9ICdzYW5kYm94Jykge1xuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcblx0XHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNwZWNpYWxQcm9wcy5nZXR0ZXIgPyBzcGVjaWFsUHJvcHMuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHNwZWNpYWxQcm9wcy52YWx1ZTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24odikge1xuXHRcdFx0XHRcdFx0c3BlY2lhbFByb3BzLnNldHRlciA/IHNwZWNpYWxQcm9wcy5zZXR0ZXIuY2FsbChvYmplY3QsIHYpIDogY29yZS5zZXQob2JqZWN0LCBrZXksIHYsIHtcblx0XHRcdFx0XHRcdFx0ZnJvbVNldHRlcjogdHJ1ZVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gc3BlY2lhbFByb3BzO1xuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmaW5lcHJvcC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpcyBmcm9tICcuL191dGlsL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIHNldHMgbmV3IHZhbHVlIGZvciBhIHByb3BlcnR5XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBldnQgPSB7fSkge1xuICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZXQnKTtcblxuICAgIC8vIGlmIG5vIGtleSBvciBmYWxzeSBrZXkgaXMgZ2l2ZW5cbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG4gICAgaWYgKCFkZWYpIHtcblx0XHRvYmplY3Rba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IHByb3BzLCBldmVudHMgfSA9IGRlZjtcblx0Y29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuXHRpZiAodHlwZW9mIGtleSA9PSAnb2JqZWN0Jykge1xuXHRcdG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuXHRpZiAoIXByb3BEZWYpIHtcblx0XHRvYmplY3Rba2V5XSA9IHZhbHVlO1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHRjb25zdCB7IHZhbHVlOiBwcmV2aW91c1ZhbHVlLCBtZWRpYXRvciB9ID0gcHJvcERlZjtcblxuICAgIC8vIHBvc3NpYmxlIGZsYWdzXG5cdGNvbnN0IHtcbiAgICAgICAgc2tpcE1lZGlhdG9yLFxuICAgICAgICBmcm9tTWVkaWF0b3IsXG4gICAgICAgIGZvcmNlLFxuICAgICAgICBmb3JjZUhUTUwsXG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgc2lsZW50SFRNTCxcbiAgICAgICAgc2tpcExpbmtzXG4gICAgfSA9IGV2dDtcblxuXHRsZXQgbmV3VmFsdWU7XG5cblx0aWYgKG1lZGlhdG9yICYmICFpcyh2YWx1ZSwgcHJldmlvdXNWYWx1ZSkgJiYgIXNraXBNZWRpYXRvciAmJiAhZnJvbU1lZGlhdG9yKSB7XG5cdFx0Ly8gVE9ET1xuXHRcdG5ld1ZhbHVlID0gc3BlY2lhbC5tZWRpYXRvcih2LCBwcmV2VmFsLCBrZXksIG9iamVjdCk7XG5cdH0gZWxzZSB7XG5cdFx0bmV3VmFsdWUgPSB2YWx1ZTtcblx0fVxuXG5cdGNvbnN0IGlzQ2hhbmdlZCA9ICFpcyhuZXdWYWx1ZSwgcHJldmlvdXNWYWx1ZSk7XG5cbiAgICAvLyBhZGQgdG8gZXZ0IG9iamVjdCBzb21lIHVzZWZ1bCBwcm9wZXJ0aWVzXG5cdGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuXHRcdHZhbHVlOiBuZXdWYWx1ZSxcblx0XHRzZWxmOiBvYmplY3QsXG5cdFx0cHJldmlvdXNWYWx1ZSxcblx0XHRrZXksXG5cdFx0aXNDaGFuZ2VkXG5cdH0sIGV2dCk7XG5cblx0Y29uc3QgdHJpZ2dlckNoYW5nZSA9IChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFzaWxlbnQ7XG5cbiAgICAvLyB0cmlnZ2VyIGJlZm9yZWNoYW5nZTpLRVkgYW5kIGJlZm9yZWNoYW5nZSBldmVudHNcblx0aWYgKHRyaWdnZXJDaGFuZ2UpIHtcblx0XHRjb25zdCBiZWZvcmVjaGFuZ2VTdHIgPSAnYmVmb3JlY2hhbmdlJztcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlRXZ0TmFtZSA9IGAke2JlZm9yZWNoYW5nZVN0cn06JHtrZXl9YDtcblxuXHRcdGlmKGV2ZW50c1tiZWZvcmVjaGFuZ2VFdnROYW1lXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcblx0XHR9XG5cblx0XHRpZihldmVudHNbYmVmb3JlY2hhbmdlU3RyXSkge1xuXHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuXHRcdH1cblx0fVxuXG5cdHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuXHRpZiAoIXNpbGVudEhUTUwgJiYgKGlzQ2hhbmdlZCB8fCBmb3JjZSB8fCBmb3JjZUhUTUwpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSA9IGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWA7XG5cdFx0aWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXHR9XG5cbiAgICAvLyB0cmlnZ2VyIGNoYW5nZTpLRVkgYW5kIGNoYW5nZSBldmVudHNcbiAgICBpZiAodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VTdHIgPSAnY2hhbmdlJztcbiAgICAgICAgY29uc3QgY2hhbmdlRXZ0TmFtZSA9IGAke2NoYW5nZVN0cn06JHtrZXl9YDtcblx0XHRpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuXHRcdGlmKGV2ZW50c1tjaGFuZ2VTdHJdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG5cdGlmICgoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2tpcExpbmtzKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlcHNFdnROYW1lID0gYF9jaGFuZ2U6ZGVwczoke2tleX1gO1xuXHRcdGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cdH1cblxuXHQvLyB0cmlnZ2VyIGRlbGVnYXRlZCBldmVudHMgbG9naWNcbiAgICBpZihpc0NoYW5nZWQpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuICAgICAgICBpZiAoZXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdKSB7XG5cdFx0XHR0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuXHRcdH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2V0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyaWdnZXJPbmUob2JqZWN0LCBuYW1lKSB7XG5cdGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCBldmVudHMgPSBkZWYuZXZlbnRzW25hbWVdO1xuXG5cdGlmIChldmVudHMpIHtcblx0XHRjb25zdCBhcmdzID0gbm9mbi5zbGljZShhcmd1bWVudHMsIDIpLFxuXHRcdFx0bCA9IGV2ZW50cy5sZW5ndGgsXG5cdFx0XHRbYTEsIGEyLCBhM10gPSBhcmdzO1xuXG5cdFx0bGV0IGkgPSAwLFxuXHRcdFx0ZXY7XG5cblx0XHRzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG5cdFx0Y2FzZSAwOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGNhc2UgMTpcblx0XHRcdHdoaWxlIChpIDwgbCkge1xuXHRcdFx0XHQodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAyOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0Y2FzZSAzOlxuXHRcdFx0d2hpbGUgKGkgPCBsKSB7XG5cdFx0XHRcdCh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExLCBhMiwgYTMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR3aGlsZSAoaSA8IGwpIHtcblx0XHRcdFx0KHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0fVxufVxuXG50cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0ge1xuXHRpbmZvOiB7fSxcblx0bmFtZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qc1xuICoqLyIsImltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL21hdHJlc2hrYWVycm9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqZWN0LCBtZXRob2QpIHtcblx0Y29uc3QgdHlwZW9mT2JqZWN0ID0gb2JqZWN0ID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIG9iamVjdDtcblxuICAgIGlmKHR5cGVvZk9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2NvbW1vbjpvYmplY3RfdHlwZScsIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZk9iamVjdCxcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcbiAqKi8iLCJjb25zdCBiaW5kaW5nRXJyb3JQcmVmaXggPSAnQmluZGluZyBlcnJvcjonO1xuXG5jb25zdCBlcnJvcnMgPSB7XG5cdCdiaW5kaW5nOm5vZGVfbWlzc2luZyc6ICh7IGtleSwgbm9kZSB9KSA9PiB7XG5cdFx0Y29uc3Qgc2VsZWN0b3JJbmZvID0gdHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnID8gYCBUaGUgc2VsZWN0b3IgaXMgJHtub2RlfWAgOiAnJztcblx0XHRyZXR1cm4gYCR7YmluZGluZ0Vycm9yUHJlZml4fSBub2RlIGlzIG1pc3NpbmcgZm9yICR7a2V5fS4ke3NlbGVjdG9ySW5mb31gXG5cdH0sXG5cdCdiaW5kaW5nOmZhbHN5X2tleSc6ICgpID0+ICdCaW5kaW5nIGVycm9yOiBcImtleVwiIGFyZyBjYW5ub3QgYmUgZmFsc3knLFxuXHQnYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJzogKHsgJG5vZGVzLCBub2RlcyB9KSA9PiB7XG5cdFx0Y29uc3QgbWlzc2luZyA9ICEkbm9kZXMgPyAnJG5vZGVzJyA6ICdub2Rlcyc7XG5cdFx0cmV0dXJuXHRgJHtiaW5kaW5nRXJyb3JQcmVmaXh9IFwiJHttaXNzaW5nfVwiIHByb3BlcnR5IG9mIE1hdHJlc2hrYSBpbnN0YW5jZSBpcyBtaXNzaW5nLiBgXG5cdFx0XHQrICdJdCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgbXVzdCBub3QgYmUgcmVhc3NpZ25lZC4nO1xuXHR9LFxuXHQnY29tbW9uOm9iamVjdF90eXBlJzogKHsgdHlwZSwgbWV0aG9kIH0pID0+IHtcblx0XHRyZXR1cm4gYE1ldGhvZCBcIiR7bWV0aG9kfVwiIGRvZXMgbm90IGFjY2VwdCAke3R5cGV9IGFzIHRhcmdldCBvYmplY3RgO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hdHJlc2hrYUVycm9yKGtleSwgZGF0YSkge1xuXHRjb25zdCBnZXRFcnJvciA9IGVycm9yc1trZXldO1xuXHRpZighZ2V0RXJyb3IpIHtcblx0XHR0aHJvdyBFcnJvcihgVW5rbm93biBlcnJvciBcIiR7a2V5fVwiYCk7XG5cdH1cblxuXHRyZXR1cm4gbmV3IEVycm9yKGVycm9yc1trZXldKGRhdGEpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzXG4gKiovIiwiLy8gZGV0ZXJtaW5lcyB3aGV0aGVyIHR3byB2YWx1ZXMgYXJlIHRoZSBzYW1lIHZhbHVlXG5jb25zdCBpc1BvbHlmaWxsID0gKHYxLCB2MikgPT5cbiAgICB2MSA9PT0gMCAmJiB2MiA9PT0gMCA/IDEgLyB2MSA9PT0gMSAvIHYyIDogdjEgIT09IHYxICYmIHYyICE9PSB2MiB8fCB2MSA9PT0gdjI7XG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5pcyB8fCBpc1BvbHlmaWxsO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvaXMuanNcbiAqKi8iLCJpbXBvcnQgc2VsZWN0Tm9kZXMgZnJvbSAnLi9zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4uL19kb20nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpIHtcblx0bGV0IG5vZGVzO1xuXHRpZih0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgJiYgIS88Ly50ZXN0KHNlbGVjdG9yKSAmJiAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS8udGVzdChzZWxlY3RvcikpIHtcblx0XHRub2RlcyA9IHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpXG5cdH0gZWxzZXtcblx0XHRub2RlcyA9IGRvbS4kKHNlbGVjdG9yKTtcblx0fVxuXHRyZXR1cm4gbm9kZXM7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2dldG5vZGVzLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3RvcnMpIHtcblx0XG5cdHZhciBvYmplY3REYXRhID0gbWFwLmdldChvYmplY3QpLFxuXHRcdCQgPSBjb3JlLiQsXG5cdFx0cmVzdWx0ID0gJCgpLFxuXHRcdGV4ZWNSZXN1bHQsXG5cdFx0JGJvdW5kLFxuXHRcdG5vZGUsXG5cdFx0c2VsZWN0b3IsXG5cdFx0aSwgaixcblx0XHRyYW5kb20sXG5cdFx0c3ViU2VsZWN0b3IsXG5cdFx0a2V5LFxuXHRcdHNlbGVjdGVkO1xuXG5cdGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcgfHwgIW9iamVjdERhdGEpIHJldHVybiByZXN1bHQ7XG5cblx0Ly8gcmVwbGFjaW5nIDpzYW5kYm94IHRvIDpib3VuZChzYW5kYm94KVxuXHRzZWxlY3RvcnMgPSBzZWxlY3RvcnMuc3BsaXQoJywnKTtcblxuXHRmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG5cdFx0c2VsZWN0b3IgPSBzZWxlY3RvcnNbaV07XG5cblx0XHRpZiAoZXhlY1Jlc3VsdCA9IC9cXHMqOmJvdW5kXFwoKFteKF0qKVxcKVxccyooW1xcU1xcc10qKVxccyp8XFxzKjpzYW5kYm94XFxzKihbXFxTXFxzXSopXFxzKi8uZXhlYyhzZWxlY3RvcikpIHtcblx0XHRcdGtleSA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/ICdzYW5kYm94JyA6IGV4ZWNSZXN1bHRbMV07XG5cdFx0XHRzdWJTZWxlY3RvciA9IGV4ZWNSZXN1bHRbM10gIT09IHVuZGVmaW5lZCA/IGV4ZWNSZXN1bHRbM10gOiBleGVjUmVzdWx0WzJdO1xuXG5cdFx0XHQvLyBnZXR0aW5nIEtFWSBmcm9tIDpib3VuZChLRVkpXG5cdFx0XHQkYm91bmQgPSBvYmplY3REYXRhLnNwZWNpYWxba2V5XSAmJiBvYmplY3REYXRhLnNwZWNpYWxba2V5XS4kbm9kZXM7XG5cdFx0XHRpZighJGJvdW5kIHx8ICEkYm91bmQubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgcGFzc2VkIGFmdGVyIDpib3VuZChLRVkpIGlzIG5vdCBlbXB0eSBzdHJpbmdcblx0XHRcdC8vIGZvciBleGFtcGxlIFwiOmJvdW5kKEtFWSkgLm15LXNlbGVjdG9yXCJcblx0XHRcdGlmIChzdWJTZWxlY3Rvcikge1xuXHRcdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgY29udGFpbnMgY2hpbGRyZW4gc2VsZWN0b3Jcblx0XHRcdFx0Ly8gZm9yIGV4YW1wbGUgXCI6Ym91bmQoS0VZKSA+IC5teS1zZWxlY3RvclwiXG5cdFx0XHRcdGlmIChzdWJTZWxlY3Rvci5pbmRleE9mKCc+JykgPT09IDApIHtcblx0XHRcdFx0XHQvLyBzZWxlY3RpbmcgY2hpbGRyZW5cblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgJGJvdW5kLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRub2RlID0gJGJvdW5kW2pdO1xuXHRcdFx0XHRcdFx0cmFuZG9tID0gJ20nICsgY29yZS5yYW5kb21TdHJpbmcoKTtcblx0XHRcdFx0XHRcdG5vZGUuc2V0QXR0cmlidXRlKHJhbmRvbSwgcmFuZG9tKTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbJyArIHJhbmRvbSArICc9XCInICsgcmFuZG9tICsgJ1wiXScgKyBzdWJTZWxlY3Rvcik7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuYWRkKHV0aWwudG9BcnJheShzZWxlY3RlZCkpO1xuXHRcdFx0XHRcdFx0bm9kZS5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgZG9lc24ndCBjb250YWluIGNoaWxkcmVuIHNlbGVjdG9yXG5cdFx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQuZmluZChzdWJTZWxlY3RvcikpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBpZiBuYXRpdmUgc2VsZWN0b3IgaXMgZW1wdHkgc3RyaW5nXG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQoJGJvdW5kKTtcblx0XHRcdH1cblx0XHRcdC8vIGlmIGl0J3MgbmF0aXZlIHNlbGVjdG9yXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IHJlc3VsdC5hZGQoc2VsZWN0b3IpO1xuXHRcdH1cblx0fVxuXG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0RG9sbGFyIGZyb20gJy4vZGVmYXVsdC1kb2xsYXInO1xuXG5jb25zdCBkb20gPSB7XG5cdCQ6IGRlZmF1bHREb2xsYXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19kb20vaW5kZXguanNcbiAqKi8iLCIvKmdsb2JhbCAkKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuXHRjb25zdCBmbiA9IGdsb2JhbERvbGxhci5mbiB8fCBnbG9iYWxEb2xsYXIucHJvdG90eXBlO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRlZE1ldGhvZHMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoIWZuW25lZWRlZE1ldGhvZHNbaV1dKSB7XG5cdFx0XHR1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGlmICghZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCkge1xuXHRcdGdsb2JhbERvbGxhci5wYXJzZUhUTUwgPSBiUXVlcnkucGFyc2VIVE1MO1xuXHR9XG59IGVsc2Uge1xuXHR1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cdHJldHVybiBuZXcgSW5pdChzZWxlY3RvciwgY29udGV4dCk7XG59XG5cbm5vZm4uYXNzaWduKGJRdWVyeSwge1xuXHRmbjogSW5pdC5wcm90b3R5cGUsXG5cdGV4dGVuZCxcblx0cGFyc2VIVE1MLFxuXHRvbmUsXG5cdGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuXHRvbixcblx0b2ZmLFxuXHRpcyxcblx0YWRkLFxuXHRub3QsXG5cdGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG5cdGxldCByZXN1bHQ7XG5cblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHNlbGVjdG9yID09PSB3aW5kb3cpIHtcblx0XHRcdHJlc3VsdCA9IFtzZWxlY3Rvcl07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0XHRcdHJlc3VsdCA9IGh0bWwybm9kZUxpc3Qoc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGNvbnRleHQpIHtcblx0XHRcdFx0XHRjb25zdCBuZXdDb250ZXh0ID0gKG5ldyBCUXVlcnlJbml0KGNvbnRleHQpKVswXTtcblxuXHRcdFx0XHRcdGlmIChuZXdDb250ZXh0KSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikgeyAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuXHRcdFx0aWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2VsZWN0b3IoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gc2VsZWN0b3I7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgbGVuZ3RoID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGg7XG5cblx0aWYgKGxlbmd0aCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdHRoaXMucHVzaChyZXN1bHRbaV0pO1xuXHRcdH1cblx0fVxufVxuXG5CUXVlcnlJbml0LnByb3RvdHlwZSA9IFtdO1xuXG5leHBvcnQgZGVmYXVsdCBCUXVlcnlJbml0O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19pbml0LmpzXG4gKiovIiwiLy8gY29udmVydHMgSFRNTCBzdHJpbmcgdG8gTm9kZUxpc3QgaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh0bWwybm9kZUxpc3QoaHRtbCkge1xuXHQvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG5cdGNvbnN0IHdyYXBNYXAgPSB7XG5cdFx0b3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcblx0XHRsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuXHRcdHRoZWFkOiBbMSwgJzx0YWJsZT4nLCAnPC90YWJsZT4nXSxcblx0XHR0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG5cdFx0dGQ6IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddLFxuXHRcdGNvbDogWzIsICc8dGFibGU+PHRib2R5PjwvdGJvZHk+PGNvbGdyb3VwPicsICc8L2NvbGdyb3VwPjwvdGFibGU+J10sXG5cdFx0YXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcblx0XHRfOiBbMCwgJycsICcnXVxuXHR9O1xuXG5cdGxldCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0aTtcblxuXHRodG1sID0gaHRtbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG5cblx0d3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuXHR3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuXHR3cmFwTWFwLnRoID0gd3JhcE1hcC50ZDtcblxuXHRjb25zdCBleCA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpLFxuXHRcdHdyYXBwZXIgPSBleCAmJiB3cmFwTWFwW2V4WzFdXSB8fCB3cmFwTWFwLl87XG5cblx0bm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cblx0aSA9IHdyYXBwZXJbMF07XG5cblx0d2hpbGUgKGktLSkge1xuXHRcdG5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuXHR9XG5cblx0cmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcblx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0aWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuXHR9XG5cblx0Y29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG5cdGZvciAobGV0IGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0Y29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcblx0XHRpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG5cdFx0XHRmb3IgKGNvbnN0IG5leHRLZXkgaW4gc291cmNlKSB7XG5cdFx0XHRcdGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcblx0XHRcdFx0XHRvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXh0ZW5kLmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5pbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcGFyc2VzIGdpdmVuIEhUTUwgYW5kIHJldHVybnMgYlF1ZXJ5IChCUXVlcnlJbml0KSBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VIVE1MKGh0bWwpIHtcblx0cmV0dXJuIG5ldyBJbml0KGh0bWwybm9kZUxpc3QoaHRtbCkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyByZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIG1hdGNoZWQgc2V0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbmUocywgY29udGV4dCkge1xuXHRyZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZSh0YWdOYW1lLCBwcm9wcykge1xuXHRpZiAodHlwZW9mIHRhZ05hbWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cHJvcHMgPSB0YWdOYW1lO1xuXHRcdHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuXHR9XG5cblx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG5cdGlmIChwcm9wcykge1xuXHRcdG5vZm4uZm9yT3duKHByb3BzLCAodmFsdWUsIGtleSkgPT4ge1xuXHRcdFx0aWYgKGtleSA9PT0gJ2F0dHJpYnV0ZXMnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0bm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG5cdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG5cdFx0XHRcdG5vZm4uZm9yRWFjaCh2YWx1ZSwgKGNoaWxkKSA9PiB7XG5cdFx0XHRcdFx0ZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIGlmIChlbFtrZXldICYmIHR5cGVvZiBlbFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdG5vZm4uYXNzaWduKGVsW2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoa2V5ICE9PSAndGFnTmFtZScpIHtcblx0XHRcdFx0ZWxba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGVsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2NyZWF0ZS5qc1xuICoqLyIsImltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuaW1wb3J0IGlzIGZyb20gJy4vaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCB3aGVuIGEgc2VsZWN0b3IgaXMgZ2l2ZW5cbmZ1bmN0aW9uIGRlbGVnYXRlSGFuZGxlcihldnQsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG5cdGNvbnN0IHJhbmRvbUlEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnJlcGxhY2UoJzAuJywgJ3gnKSxcblx0XHRzY29wZVNlbGVjdG9yID0gYFske3JhbmRvbUlEfT1cIiR7cmFuZG9tSUR9XCJdIGAsXG5cdFx0c3BsaXR0ZWRTZWxlY3RvciA9IHNlbGVjdG9yLnNwbGl0KCcsJyk7XG5cblx0bGV0IG1hdGNoaW5nID0gJyc7XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdHRlZFNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcblx0XHRtYXRjaGluZyArPSBgJHtpID09PSAwID8gJycgOiAnLCd9JHtzY29wZVNlbGVjdG9yfSR7c2VsfSwke3Njb3BlU2VsZWN0b3J9JHtzZWx9ICpgO1xuXHR9XG5cblxuXHR0aGlzLnNldEF0dHJpYnV0ZShyYW5kb21JRCwgcmFuZG9tSUQpO1xuXG5cdGlmIChpcy5jYWxsKFtldnQudGFyZ2V0XSwgbWF0Y2hpbmcpKSB7XG5cdFx0aGFuZGxlci5jYWxsKHRoaXMsIGV2dCk7XG5cdH1cblxuXHR0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG5cdGxldCBkZWxlZ2F0ZTtcblxuXHRpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aGFuZGxlciA9IHNlbGVjdG9yO1xuXHRcdHNlbGVjdG9yID0gbnVsbDtcblx0fVxuXG5cdGlmIChzZWxlY3Rvcikge1xuXHRcdGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuXHRcdFx0ZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG5cdFx0fTtcblx0fVxuXG5cdG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG5cdFx0Y29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcblx0XHRuYW1lID0gbmFtZVswXTtcblxuXHRcdGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuXHRcdFx0Y29uc3Qgbm9kZSA9IHRoaXNbal0sXG5cdFx0XHRcdG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXgsXG5cdFx0XHRcdGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlSURdID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gfHwgW107XG5cblx0XHRcdGxldCBleGlzdCA9IGZhbHNlO1xuXG5cblx0XHRcdGZvciAobGV0IGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXG5cdFx0XHRcdGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdGV4aXN0ID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWV4aXN0KSB7XG5cdFx0XHRcdGV2ZW50cy5wdXNoKHtcblx0XHRcdFx0XHRkZWxlZ2F0ZSxcblx0XHRcdFx0XHRoYW5kbGVyLFxuXHRcdFx0XHRcdG5hbWVzcGFjZSxcblx0XHRcdFx0XHRzZWxlY3RvclxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRub2RlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZGVsZWdhdGUgfHwgaGFuZGxlciwgZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29uLmpzXG4gKiovIiwiLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIGFzIGFuIG9iamVjdCBtb2R1bGVzIGJlY2F1c2Ugd2UgdXNlXG4vLyBzaW1wbGlmaWVkIGVzIG1vZHVsZXMgdGhlcmUgYW5kIGNhbm5vdCBpbXBvcnQgYW5kIHNoYXJlIGEgbnVtYmVyXG5leHBvcnQgZGVmYXVsdCB7XG5cdG5vZGVJbmRleDogMCxcblx0YWxsRXZlbnRzOiB7fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9fZGF0YS5qc1xuICoqLyIsIi8vIGNoZWNrIHRoZSBmaXJzdCBlbGVtZW50IGZyb20gZ2l2ZW4gc2V0IGFnYWluc3QgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXMocykge1xuXHRjb25zdCBub2RlID0gdGhpc1swXTtcblx0cmV0dXJuIG5vZGVcblx0XHQ/IChub2RlLm1hdGNoZXNcblx0XHRcdHx8IG5vZGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yXG5cdFx0XHR8fCBub2RlLm1vek1hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvclxuXHRcdFx0fHwgbm9kZS5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKG5vZGUsIHMpIDogZmFsc2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaXMuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcblxuLy8gcmVtb3ZlcyBldmVudCBoYW5kbGVyIGZyb20gYSBzZXQgb2YgZWxlbWVudHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9mZihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcblx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGhhbmRsZXIgPSBzZWxlY3Rvcjtcblx0XHRzZWxlY3RvciA9IG51bGw7XG5cdH1cblxuXHRuYW1lcyA9IG5hbWVzLnNwbGl0KC9cXHMvKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IG5hbWUgPSBuYW1lc1tpXS5zcGxpdCgvXFwuKC4rKS8pO1xuXHRcdGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG5cdFx0bmFtZSA9IG5hbWVbMF07XG5cblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGNvbnN0IG5vZGUgPSB0aGlzW2pdLFxuXHRcdFx0XHRldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cblx0XHRcdGlmIChldmVudHMpIHtcblx0XHRcdFx0Zm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHQoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5kZWxlZ2F0ZSlcblx0XHRcdFx0XHRcdCYmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PT0gZXZlbnQubmFtZXNwYWNlKVxuXHRcdFx0XHRcdFx0JiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnQuZGVsZWdhdGUgfHwgZXZlbnQuaGFuZGxlcik7XG5cdFx0XHRcdFx0XHRldmVudHMuc3BsaWNlKGstLSwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIW5hbWVzcGFjZSAmJiAhc2VsZWN0b3IpIHtcblx0XHRcdFx0XHRub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgaGFuZGxlcik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG5cdGNvbnN0IGlkTWFwID0ge307XG5cblx0bGV0IHJlc3VsdCxcblx0XHRub2RlSUQsXG5cdFx0bm9kZSxcblx0XHRpO1xuXG5cdHNlbGVjdG9yID0gbmV3IEluaXQoc2VsZWN0b3IpO1xuXG5cdGlmICh0aGlzLmxlbmd0aCkge1xuXHRcdHJlc3VsdCA9IG5ldyBJbml0KHRoaXMpO1xuXHRcdGZvciAoaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGUgPSByZXN1bHRbaV07XG5cdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuXHRcdFx0aWRNYXBbbm9kZUlEXSA9IDE7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRub2RlID0gc2VsZWN0b3JbaV07XG5cdFx0XHRub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuXHRcdFx0aWYgKCFpZE1hcFtub2RlSURdKSB7XG5cdFx0XHRcdGlkTWFwW25vZGVJRF0gPSAxO1xuXHRcdFx0XHRyZXN1bHQucHVzaChub2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gc2VsZWN0b3I7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcblx0Y29uc3QgcmVzdWx0ID0gbmV3IEluaXQoKTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoIW5ldyBJbml0KHRoaXNbaV0pLmlzKHNlbGVjdG9yKSkge1xuXHRcdFx0cmVzdWx0LnB1c2godGhpc1tpXSk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9ub3QuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gZ2V0IHRoZSBkZXNjZW5kYW50cyBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIG1hdGNoZWQgZWxlbWVudHMsXG4vLyBmaWx0ZXJlZCBieSBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG5cdGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG5cdG5vZm4uZm9yRWFjaCh0aGlzLCBlbCA9PiB7XG5cdFx0cmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cdH0pO1xuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvZmluZC5qc1xuICoqLyIsImltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4uL3VuYmluZG5vZGUnO1xuLy8gcmUtYWRkcyBiaW5kaW5nIHdoZW4gb2JqZWN0IGJyYW5jaCBpcyBjaGFuZ2VkXG4vLyB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IGJpbmROb2RlIHdoZW4gc29tZXRoaW5nIGxpa2UgJ2Zvby5iYXIuYmF6JyBpcyBwYXNzZWQgdG8gaXQgYXMga2V5IGFyZyB2YWx1ZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3dpdGNoQmluZGluZyAoe1xuICAgIGNoYW5nZUV2dCxcbiAgICBvYmplY3QsXG4gICAgZGVlcFBhdGgsXG4gICAgJG5vZGVzLFxuICAgIGJpbmRlcixcbiAgICBldnQsXG5cdGJpbmROb2RlXG59KSB7XG5cdGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuICAgIGxldCB7XG5cdFx0dmFsdWU6IHRhcmdldCxcblx0XHRwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1RhcmdldFxuXHR9ID0gY2hhbmdlRXZ0O1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0ID0gb2JqZWN0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbZGVlcFBhdGhbaV1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE5vZGUodGFyZ2V0LCBkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDFdLCAkbm9kZXMsIGJpbmRlciwgZXZ0KTtcblxuXHQvLyByZW1vdmUgYmluZGluZyBmb3IgcHJldmlvdXNseSB1c2VkIG9iamVjdFxuICAgIGlmIChwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuYmluZE5vZGUocHJldmlvdXNUYXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sICRub2Rlcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpbml0TUsgZnJvbSAnLi9fY29yZS9pbml0JztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUJpbmRpbmcgZnJvbSAnLi9fYmluZGluZ3MvcmVtb3ZlYmluZGluZyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vX2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGV2dCkge1xuXHRpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuXHRcdGtleSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICd1bmJpbmROb2RlJyk7XG4gICAgfVxuXG5cdGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcblx0XHRcdCAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGV2dCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcblx0XHRcdCAqIGFjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbeyBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnQgfV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZVxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcblx0ICogYWNjZXB0IGtleS1ub2RlIG9iamVjdFxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKGtleU9ialZhbHVlLCBrZXlPYmpLZXkpID0+IHVuYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlKSk7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG5cblx0ZXZ0ID0gZXZ0IHx8IHt9O1xuXHRjb25zdCB7IGRlZXAgfSA9IGV2dCB8fCB7fTtcblx0Y29uc3QgeyBwcm9wcyB9ID0gaW5pdE1LKG9iamVjdCk7XG5cblx0Ly8gYWxsb3cgdG8gcGFzcyBudWxsIG9yIHVuZGVmaW5lZCBhcyBrZXlcblx0Ly8gaWYgcGFzc2VkIHRoZW4gcmVtb3ZlIGJpbmRpbmdzIG9mIGFsbCBrZXlzIGZvciBnaXZlbiBvYmplY3Rcblx0aWYoa2V5ID09PSBudWxsIHx8IHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0bm9mbi5mb3JPd24ocHJvcHMsIChwcm9wc0l0ZW0sIGtleSkgPT4ge1xuXHRcdFx0dW5iaW5kTm9kZShvYmplY3QsIGtleSwgbnVsbCwgZXZ0KTtcblx0XHR9KTtcblxuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHQvLyByZW1vdmUgZGVsZWdhdGVkIGJpbmRpbmdcblx0aWYoZGVlcCAhPT0gZmFsc2UpIHtcblx0XHRjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuXHRcdGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG5cdFx0aWYgKGRlZXBQYXRoTGVuZ3RoID4gMSkge1xuXHRcdFx0bGV0IHRhcmdldCA9IG9iamVjdDtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aExlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHQvLyBUT0RPIGRvIHdlIG5lZWQgdG8gdGhyb3cgZXJyb3Igd2hlbiB0YXJnZXQgaXMgZmFsc3k/XG5cdFx0XHRcdHRhcmdldCA9IHRhcmdldFtkZWVwUGF0aFtpXV07XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRPRE8gQlVHIHRoaXMgbWF5IHVuZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBiaW5kaW5ncyB3aXRoIHRoZSBzYW1lIHBhdGggKGNhbm5vdCByZXByb2R1Y2UpXG5cdFx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpLFxuXHRcdFx0XHRgX2NoYW5nZTp0cmVlOiR7ZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAyXX1gKTtcblxuXHRcdFx0dW5iaW5kTm9kZSh0YXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sIG5vZGUsIGV2dCk7XG5cblx0XHRcdHJldHVybiBvYmplY3Q7XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cblx0Ly8gd2hlbiBubyBwcm9wZGVmIGRvIG5vdGhpbmdcblx0aWYoIXByb3BEZWYpIHtcblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0Y29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuXHQvLyBpZiB0aGUgcHJvcGVydHkgZG9lc24ndCBoYXZlIGFueSBiaW5kaW5ncyBkbyBub3RoaW5nXG5cdGlmKCFiaW5kaW5ncykge1xuXHRcdHJldHVybiBvYmplY3Q7XG5cdH1cblxuXHQvLyBpZiBubyBub2RlIGlzIHBhc2VkIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuXHRpZighbm9kZSkge1xuXHRcdG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG5cdFx0XHRyZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2dCB9LCBiaW5kaW5nKTtcblx0XHR9KTtcblxuXHRcdC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2Vcblx0XHRpZiAob2JqZWN0LmlzTUspIHtcblx0ICAgICAgICBkZWxldGUgb2JqZWN0Lm5vZGVzW2tleV1cblx0XHRcdGRlbGV0ZSBvYmplY3QuJG5vZGVzW2tleV07XG5cdCAgICB9XG5cblx0XHRyZXR1cm4gb2JqZWN0O1xuXHR9XG5cblx0Y29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcblx0Y29uc3QgcmV0YWluQmluZGluZ3MgPSBbXTtcblx0Y29uc3QgcmV0YWluTm9kZXMgPSBbXTtcblxuXHQvLyBpdGVyYXRlIG92ZXIgYWxsIGJpbmRuZ3MgYW5kIGNvbXBhcmUgdGhlaXIgbm9kZSB3aXRoIGdpdmVuIG5vZGVzXG5cdG5vZm4uZm9yRWFjaCgkbm9kZXMsIG5vZGVzSXRlbSA9PiB7XG5cdFx0bm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcblx0XHRcdGlmKGJpbmRpbmcubm9kZSA9PT0gbm9kZXNJdGVtKSB7XG5cdFx0XHRcdHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZ0IH0sIGJpbmRpbmcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0YWluQmluZGluZ3MucHVzaChiaW5kaW5nKTtcblx0XHRcdFx0cmV0YWluTm9kZXMucHVzaChub2Rlc0l0ZW0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9KTtcblxuXHQvLyB1cGRhdGUgbm9kZXMgYW5kICRub2RlcyBmb3IgTWF0cmVzaGthIGluc3RhbmNlXG5cdGlmIChvYmplY3QuaXNNSykge1xuXHRcdGlmKHJldGFpbk5vZGVzLmxlbmd0aCkge1xuXHRcdFx0b2JqZWN0Lm5vZGVzW2tleV0gPSByZXRhaW5Ob2Rlc1swXTtcblx0XHRcdG9iamVjdC4kbm9kZXNba2V5XSA9IGRvbS4kKHJldGFpbk5vZGVzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVsZXRlIG9iamVjdC5ub2Rlc1trZXldXG5cdFx0XHRkZWxldGUgb2JqZWN0LiRub2Rlc1trZXldO1xuXHRcdH1cblx0fVxuXG5cdC8vIHVwZGF0ZSBiaW5kaW5ncyBvYmplY3Rcblx0aWYocmV0YWluQmluZGluZ3MubGVuZ3RoKSB7XG5cdFx0cHJvcERlZi5iaW5kaW5ncyA9IHJldGFpbkJpbmRpbmdzO1xuXHR9IGVsc2Uge1xuXHRcdHByb3BEZWYuYmluZGluZ3MgPSBudWxsO1xuXHR9XG5cblxuXHRyZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdW5iaW5kbm9kZS5qc1xuICoqLyIsIi8qZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIm5hbWVcIiwgXCJldmVudHNcIl0gfV0qL1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuXG4vLyByZW1vdmVzIHNpbXBsZSBldmVudCBsaXN0ZW5lciB0byBhbiBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pIHtcblx0Y29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuXHQvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcblx0aWYgKCFkZWYpIHJldHVybjtcblxuXHRjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cdGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tuYW1lXTtcblx0Y29uc3QgcmV0YWluID0gW107XG5cdGNvbnN0IG5vVHJpZ2dlciA9IG5hbWUgPyBuYW1lWzBdID09PSAnXycgOiBmYWxzZTtcblxuXHQvLyBpZiBhbGwgZXZlbnRzIG5lZWQgdG8gYmUgcmVtb3ZlZFxuXHRpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0aWYgKCFub1RyaWdnZXIpIHtcblx0XHRcdG5vZm4uZm9yT3duKGFsbEV2ZW50cywgKGV2ZW50cywgbmFtZSkgPT4ge1xuXHRcdFx0XHRub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG5cdFx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdFx0Y2FsbGJhY2s6IGV2dC5jYWxsYmFjayxcblx0XHRcdFx0XHRcdGNvbnRleHQ6IGV2dC5jb250ZXh0XG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHRcdHRyaWdnZXJPbmUob2JqZWN0LCAncmVtb3ZlZXZlbnQnLCByZW1vdmVFdnREYXRhKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuXHRcdGRlZi5ldmVudHMgPSB7fTtcblx0fSBlbHNlIGlmIChldmVudHMpIHtcblx0XHQvLyBpZiBldmVudHMgd2l0aCBnaXZlbiBuYW1lIGFyZSBmb3VuZFxuXHRcdG5vZm4uZm9yRWFjaChldmVudHMsIGV2dCA9PiB7XG5cdFx0XHRpZiAoY2FsbGJhY2sgJiYgKGNhbGxiYWNrICE9PSBldnQuY2FsbGJhY2sgJiYgY2FsbGJhY2suX2NhbGxiYWNrICE9PSBldnQuY2FsbGJhY2spXG5cdFx0XHRcdHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuXHRcdFx0XHQvLyBrZWVwIGV2ZW50XG5cdFx0XHRcdHJldGFpbi5wdXNoKGV2dCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCByZW1vdmVFdnREYXRhID0ge1xuXHRcdFx0XHRcdG5hbWUsXG5cdFx0XHRcdFx0Y2FsbGJhY2s6IGV2dC5jYWxsYmFjayxcblx0XHRcdFx0XHRjb250ZXh0OiBldnQuY29udGV4dFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICghbm9UcmlnZ2VyKSB7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsIGByZW1vdmVldmVudDoke25hbWV9YCwgcmVtb3ZlRXZ0RGF0YSk7XG5cdFx0XHRcdFx0dHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAocmV0YWluLmxlbmd0aCkge1xuXHRcdFx0YWxsRXZlbnRzW25hbWVdID0gcmV0YWluO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkZWxldGUgZGVmLmV2ZW50c1tuYW1lXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm47XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9yZW1vdmVsaXN0ZW5lcic7XG4vLyBSRUZBQ1RPUiwgRE9OVCBUUklHR0VSIEFEREVWRU5ULCBSRU1PVkVFVkVOVFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuXHRjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG5cdC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuXHRpZiAoIWRlZikgcmV0dXJuO1xuXG5cdGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcblxuXHRwYXRoID0gdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICYmIHBhdGggIT09ICcnID8gcGF0aC5zcGxpdCgnLicpIDogcGF0aDtcblxuXHRpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG5cdFx0Ly8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuXHRcdHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8pO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG5cdFx0Y29uc3Qga2V5ID0gcGF0aFswXTtcblx0XHRjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG5cdFx0Y29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdO1xuXHRcdGxldCBwYXRoU3RyO1xuXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdFx0cGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG5cdFx0XHRwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGggPSBbXTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuXHRcdH1cblxuXHRcdGlmIChldmVudHMpIHtcblx0XHRcdGNvbnN0IHJldGFpbiA9IFtdO1xuXHRcdFx0bm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuXHRcdFx0XHRpZiAoZXZlbnQuaW5mby5wYXRoU3RyICE9PSBwYXRoU3RyKSB7XG5cdFx0XHRcdFx0cmV0YWluLnB1c2goZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHJldGFpbi5sZW5ndGgpIHtcblx0XHRcdFx0YWxsRXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdID0gcmV0YWluO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuXHRcdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG5cdFx0fVxuXHR9XG59XG5cbi8qXG5kZWZpbmUoW1xuXHQnbWF0cmVzaGthX2Rpci9jb3JlL3Zhci9jb3JlJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJ1xuXSwgZnVuY3Rpb24oY29yZSwgbWFwKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX3VuZGVsZWdhdGVMaXN0ZW5lciA9IGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lciA9XG5cdCBmdW5jdGlvbihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKSB7XG5cdFx0aWYgKCFvYmplY3QgfHwgdHlwZW9mIG9iamVjdCAhPSAnb2JqZWN0JykgcmV0dXJuIG9iamVjdDtcblxuXHRcdHZhciBleGVjdXRlZCA9IC8oW15cXC5dKylcXC4oLiopLy5leGVjKHBhdGgpLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdHAgPSBwYXRoLFxuXHRcdFx0b2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV2ZW50cyxcblx0XHRcdGk7XG5cblx0XHRwYXRoID0gZXhlY3V0ZWQgPyBleGVjdXRlZFsyXSA6ICcnO1xuXG5cdFx0aWYgKGZpcnN0S2V5KSB7XG5cdFx0XHRpZiAoZmlyc3RLZXkgPT0gJyonKSB7XG5cdFx0XHRcdGlmIChvYmplY3QuaXNNS0FycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2FkZCcsIGNhbGxiYWNrLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHMuYWRkIHx8IFtdO1xuXHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZiAoZXZlbnRzW2ldLnBhdGggPT0gcCkge1xuXG5cdFx0XHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdhZGQnLCBldmVudHNbaV0uY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b2JqZWN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0XHRcdFx0aXRlbSAmJiBfdW5kZWxlZ2F0ZUxpc3RlbmVyKGl0ZW0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIGlmIChvYmplY3QuaXNNS09iamVjdCkge1xuXHRcdFx0XHRcdGlmIChjYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0X3VuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsICdjaGFuZ2UnLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGV2ZW50cyA9IG9iamVjdERhdGEuZXZlbnRzLmNoYW5nZSB8fCBbXTtcblx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKGV2ZW50c1tpXS5wYXRoID09IHApIHtcblx0XHRcdFx0XHRcdFx0XHRfdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdCwgcGF0aCwgJ2NoYW5nZScsIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtICYmIF91bmRlbGVnYXRlTGlzdGVuZXIoaXRlbSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjb3JlLl9yZW1vdmVMaXN0ZW5lcihvYmplY3QsICdjaGFuZ2U6JyArIGZpcnN0S2V5LCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZXZlbnRzID0gb2JqZWN0RGF0YS5ldmVudHNbJ2NoYW5nZTonICsgZmlyc3RLZXldIHx8IFtdO1xuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChldmVudHNbaV0ucGF0aCA9PSBwKSB7XG5cdFx0XHRcdFx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGV2ZW50c1tpXS5jYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0eXBlb2Ygb2JqZWN0W2ZpcnN0S2V5XSA9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdF91bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2ZpcnN0S2V5XSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvcmUuX3JlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdH1cblx0fTtcbn0pO1xuXG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCJpbXBvcnQgbG9va0ZvckJpbmRlciBmcm9tICcuL2xvb2tmb3JiaW5kZXInO1xuaW1wb3J0IHJ1bk5vZGVIYW5kbGVyIGZyb20gJy4vcnVubm9kZWhhbmRsZXInO1xuaW1wb3J0IHJ1bk9iamVjdEhhbmRsZXIgZnJvbSAnLi9ydW5vYmplY3RoYW5kbGVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi4vX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgaXMgZnJvbSAnLi4vX3V0aWwvaXMnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJy4uL191dGlsL2RlYm91bmNlJztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbmNvbnN0IHNwYWNlUmVnID0gL1xccysvO1xuXG4vLyBoYW5kbGVzIGJpbmRpbmcgZm9yIHNpbmdsZSBwcm9wZXJ0eSAmIG5vZGVcbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIGF0IGJpbmROb2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcblx0YmluZGVyOiBnaXZlbkJpbmRlcixcblx0a2V5LFxuXHQkbm9kZXMsXG5cdG5vZGUsXG5cdGV2dCxcblx0cHJvcERlZlxufSkge1xuXHRjb25zdCB7XG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgYXNzaWduRGVmYXVsdFZhbHVlLFxuICAgICAgICBkZWJvdW5jZTogZGVib3VuY2VPcHRpb25cbiAgICB9ID0gZXZ0O1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0c2VsZjogb2JqZWN0LFxuXHRcdGtleSxcbiAgICAgICAgdmFsdWUsXG5cdFx0JG5vZGVzLFxuXHRcdG5vZGVcblx0fTtcbiAgICAvLyBjcmVhdGUgYmluZGluZ3MgYXJyYXkgaW4gcHJvcGVydHkgZGVmaW5pdGlvbiBvYmplY3RcbiAgICBjb25zdCBiaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzIHx8IFtdO1xuXHRsZXQgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCc7XG5cdGxldCBiaW5kZXI7XG5cdGxldCBvYmplY3RIYW5kbGVyO1xuXG4gICAgLy8gZ2V0IGFjdHVhbCBiaW5kZXJcblx0aWYgKGdpdmVuQmluZGVyICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgZm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG5cdFx0aWYgKGZvdW5kQmluZGVyKSB7XG5cdFx0XHRpZiAoZ2l2ZW5CaW5kZXIpIHtcblx0XHRcdFx0bm9mbi5hc3NpZ24oZm91bmRCaW5kZXIsIGdpdmVuQmluZGVyKTtcblx0XHRcdH1cblxuXHRcdFx0YmluZGVyID0gZm91bmRCaW5kZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGJpbmRlciA9IGdpdmVuQmluZGVyO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHsgZ2V0VmFsdWUsIHNldFZhbHVlLCBvbiwgaW5pdGlhbGl6ZSB9ID0gYmluZGVyO1xuXG4gICAgLy8gY2FsbCBiaW5kZXIuaW5pdGlhbGl6ZVxuXHRpZiAoaW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplLmNhbGwobm9kZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gY2FsbHMgZ2V0VmFsdWUgaW1tZWRpYXRlbHkgYW5kIHJlYXNzaWduIGEgcHJvcGVydHlcbiAgICAvLyB3aGVuIGFsbCByZXF1aXJlZCBjb25kaXRpb25zIGFyZSBtZXQgZm9yIHRoaXNcblx0aWYgKGdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBhc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgb3B0aW9ucyk7XG5cdFx0aXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuXG5cdFx0c2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyBmcm9tTm9kZTogdHJ1ZSB9LCBldnQpKTtcblx0fVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgb2JqZWN0IHdoZW4gc2V0VmFsdWUgaXMgZ2l2ZW5cblx0aWYgKHNldFZhbHVlKSB7XG5cdFx0b2JqZWN0SGFuZGxlciA9ICgpID0+IHJ1bk9iamVjdEhhbmRsZXIoe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHByb3BEZWYsXG4gICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgZXZ0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGJ5IGRlZmF1bHQgZGVib3VuY2luZyBpcyBvblxuICAgICAgICAvLyBpdCBjYW4gYmUgdHVybmVkIG9mZiBieSBwYXNzaW5nIGRlYm91bmNlPWZhbHNlIHRvIGV2ZW50IG9iamVjdFxuXHRcdGlmKGRlYm91bmNlT3B0aW9uICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSB0eXBlb2YgZGVib3VuY2VPcHRpb24gPT09ICdudW1iZXInID8gZGVib3VuY2VPcHRpb24gOiAwO1xuXHRcdFx0b2JqZWN0SGFuZGxlciA9IGRlYm91bmNlKG9iamVjdEhhbmRsZXIsIGRlbGF5KTtcblx0XHR9XG5cblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG5cdFx0aWYoIWlzVW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cblx0fVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgbm9kZSB3aGVuIGdldFZhbHVlICYgb24gYXJlIGdpdmVuXG4gICAgaWYoZ2V0VmFsdWUgJiYgb24pIHtcbiAgICAgICAgY29uc3Qgbm9kZUhhbmRsZXIgPSAoZG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZSBpcyBzZXQgaW4gdW5iaW5kTm9kZVxuICAgICAgICAgICAgLy8gd2UgY2Fubm90IFwidHVybiBvZmZcIiBiaW5kZXIub24gd2hlbiBpdHMgdmFsdWUgaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGRldmVsb3BlciBuZWVkcyB0byBjbGVhbiBtZW1vcnkgKHR1cm4gb2ZmIGNhbGxiYWNrKSBtYW51YWx5IGluIGJpbmRlci5kZXN0cm95XG4gICAgICAgICAgICBpZighbm9kZUhhbmRsZXIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBydW5Ob2RlSGFuZGxlcih7XG4gICAgICAgICAgICAgICAgICAgIGRvbUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCBiaW5kaW5nIGRhdGEgdG8gYmluZGluZ3MgYXJyYXlcbiAgICAgICAgYmluZGluZ3MucHVzaCh7XG4gICAgICAgICAgICBvbixcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyLFxuICAgICAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgICAgICBvcHRpb25zXG4gICAgICAgIH0pO1xuXG5cdFx0Ly8gVE9ETyB0aHJvdyBlcnJvciB3aGVuIFwib25cIiBhbmQgbWF5YmUgb3RoZXIgYmluZGVyIHByb3BlcnRpZXMgaGFzIHdyb25nIHR5cGVcbiAgICAgICAgaWYodHlwZW9mIG9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvbi5jYWxsKG5vZGUsIG5vZGVIYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmKHR5cGVvZiBvbiA9PT0gJ3N0cmluZycpe1xuXHRcdFx0Ly8gYWRkRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG5cdFx0XHRub2ZuLmZvckVhY2gob24uc3BsaXQoc3BhY2VSZWcpLFxuXHRcdFx0XHRldnROYW1lID0+IG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnROYW1lLCBub2RlSGFuZGxlcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmlyZSBldmVudHNcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfSwgZXZ0KTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYGJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ2JpbmQnLCBleHRlbmRlZEV2dCk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHRCaW5kZXJzIGZyb20gJy4vZGVmYXVsdGJpbmRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIHJlc3VsdCxcbiAgICAgICAgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBkZWZhdWx0QmluZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocmVzdWx0ID0gZGVmYXVsdEJpbmRlcnNbaV0uY2FsbChub2RlLCBub2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgW25vZGUgPT4ge1xuXHR2YXIgdGFnTmFtZSA9IG5vZGUudGFnTmFtZSxcblx0XHRiaW5kZXJzID0gdW5kZWZpbmVkLFxuXHRcdGI7XG5cblx0Ly8gVE9ETyBTd2l0Y2gvY2FzZVxuXHRpZiAodGFnTmFtZSA9PSAnSU5QVVQnKSB7XG5cdFx0YiA9IGJpbmRlcnMuaW5wdXQobm9kZS50eXBlKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdURVhUQVJFQScpIHtcblx0XHRiID0gYmluZGVycy50ZXh0YXJlYSgpO1xuXHR9IGVsc2UgaWYgKHRhZ05hbWUgPT0gJ1NFTEVDVCcpIHtcblx0XHRiID0gYmluZGVycy5zZWxlY3Qobm9kZS5tdWx0aXBsZSk7XG5cdH0gZWxzZSBpZiAodGFnTmFtZSA9PSAnUFJPR1JFU1MnKSB7XG5cdFx0YiA9IGJpbmRlcnMucHJvZ3Jlc3MoKTtcblx0fSBlbHNlIGlmICh0YWdOYW1lID09ICdPVVRQVVQnKSB7XG5cdFx0YiA9IGJpbmRlcnMub3V0cHV0KCk7XG5cdH1cblxuXHRyZXR1cm4gYjtcbn1dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBib3VuZCBub2RlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICBkb21FdmVudCA9IHt9LFxuICAgIG9iamVjdCxcbiAgICBrZXksXG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBvcHRpb25zXG59KSB7XG4gICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG4gICAgY29uc3QgeyB3aGljaCwgdGFyZ2V0IH0gPSBkb21FdmVudDtcbiAgICBjb25zdCB7IGdldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG5vZm4uYXNzaWduKHtcbiAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQsIC8vIGpRdWVyeSB0aGluZ1xuICAgICAgICAvLyB3aWxsIHRocm93IFwicHJldmVudERlZmF1bHQgaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcbiAgICAgICAgLy8gd2lsbCB0aHJvdyBcInN0b3BQcm9wYWdhdGlvbiBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogKCkgPT4gZG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksXG4gICAgICAgIHdoaWNoLFxuICAgICAgICB0YXJnZXRcbiAgICB9LCBvcHRpb25zKSk7XG5cbiAgICBpZiAoIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAvLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBvZiBhIGhhY2tcbiAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgY2hhbmdlZE5vZGUsIG9uQ2hhbmdlVmFsdWUsIGJpbmRlcj9cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuICAgICAgICAgICAgZnJvbU5vZGU6IHRydWUsXG4gICAgICAgICAgICBjaGFuZ2VkTm9kZTogbm9kZSxcbiAgICAgICAgICAgIG9uQ2hhbmdlVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgYmluZGVyXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1xuICoqLyIsIi8vIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gcHJvcGVydHkgdmFsdWUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuT2JqZWN0SGFuZGxlciAoe1xuICAgIG5vZGUsXG4gICAgcHJvcERlZixcbiAgICBiaW5kZXIsXG4gICAgb3B0aW9ucyxcbiAgICBldnRcbn0pIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBwcm9wRGVmO1xuICAgIGNvbnN0IHsgb25DaGFuZ2VWYWx1ZSwgY2hhbmdlZE5vZGUsIGJpbmRlcjogZXZ0QmluZGVyIH0gPSBldnQ7XG4gICAgY29uc3QgeyBzZXRWYWx1ZSB9ID0gYmluZGVyO1xuXHQvLyBkaXJ0eSBoYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuXHRjb25zdCBkaXJ0eUhhY2tWYWx1ZSA9IG9uQ2hhbmdlVmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyB2YWx1ZSArICcnIDogdmFsdWU7XG5cbiAgICBpZiAoY2hhbmdlZE5vZGUgPT09IG5vZGUgJiYgb25DaGFuZ2VWYWx1ZSA9PT0gZGlydHlIYWNrVmFsdWUgJiYgZXZ0QmluZGVyID09PSBiaW5kZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFZhbHVlLmNhbGwobm9kZSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgdmFsdWUgfSwgb3B0aW9ucykpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3J1bm9iamVjdGhhbmRsZXIuanNcbiAqKi8iLCIvKmVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJldnRcIl0gfV0qL1xuXG5pbXBvcnQgaW5pdE1LIGZyb20gJy4uL19jb3JlL2luaXQnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcbmltcG9ydCBkZWZpbmVQcm9wIGZyb20gJy4uL19jb3JlL2RlZmluZXByb3AnO1xuXG4vLyBwcm9wZXJ0eSBtb2RpZmllciBldmVudCByZWdleHBcbmNvbnN0IHByb3BNb2RFdmVudFJlZ1xuXHQ9IC9eX2NoYW5nZTpkZXBzOnxeX2NoYW5nZTpiaW5kaW5nczp8Xl9jaGFuZ2U6ZGVsZWdhdGVkOnxeX2NoYW5nZTp0cmVlOnxeY2hhbmdlOnxeYmVmb3JlY2hhbmdlOi87XG5cbi8vIGFkZHMgc2ltcGxlIGV2ZW50IGxpc3RlbmVyXG4vLyB1c2VkIGFzIGNvcmUgb2YgZXZlbnQgZW5naW5lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcblx0Y29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gaW5pdE1LKG9iamVjdCksXG5cdFx0Y3R4ID0gY29udGV4dCB8fCBvYmplY3QsXG5cdFx0ZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdLFxuXHRcdGV2dCA9IHsgY2FsbGJhY2ssIGNvbnRleHQsIGN0eCwgbmFtZSwgaW5mbyB9O1xuXG5cblx0Ly8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIG5hbWVcblx0aWYgKGV2ZW50cykge1xuXHRcdC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBkYXRhLCByZXR1cm4gZmFsc2Vcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgZXZ0ID0gZXZlbnRzW2ldO1xuXHRcdFx0aWYgKChldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrIHx8IGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2suX2NhbGxiYWNrKVxuXHRcdFx0XHRcdCYmIGV2dC5jb250ZXh0ID09PSBjb250ZXh0KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBpZiB0aGUgZXZlbnQgaXNuJ3QgZm91bmQgYWRkIGl0IHRvIHRoZSBldmVudCBsaXN0XG5cdFx0ZXZlbnRzLnB1c2goZXZ0KTtcblx0fSBlbHNlIHtcblx0XHQvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZSwgY3JlYXRlIGFycmF5IHdpdGggb25seSBlYmVudFxuXHRcdGFsbEV2ZW50c1tuYW1lXSA9IFtldnRdO1xuXHR9XG5cblx0aWYgKHByb3BNb2RFdmVudFJlZy50ZXN0KG5hbWUpKSB7XG5cdFx0Ly8gZGVmaW5lIG5lZWRlZCBhY2Nlc3NvcnMgZm9yIEtFWVxuXHRcdGRlZmluZVByb3Aob2JqZWN0LCBuYW1lLnJlcGxhY2UocHJvcE1vZEV2ZW50UmVnLCAnJykpO1xuXHR9XG5cblx0aWYgKG5hbWVbMF0gIT09ICdfJykge1xuXHRcdHRyaWdnZXJPbmUob2JqZWN0LCBgYWRkZXZlbnQ6JHtuYW1lfWAsIGV2dCk7XG5cdFx0dHJpZ2dlck9uZShvYmplY3QsICdhZGRldmVudCcsIGV2dCk7XG5cdH1cblxuXHQvLyBpZiBldmVudCBpcyBhZGRlZCByZXR1cm4gdHJ1ZVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCBkZWxheSwgdGhpc0FyZykge1xuXHRsZXQgdGltZW91dDtcblx0aWYgKHR5cGVvZiBkZWxheSAhPT0gJ251bWJlcicpIHtcblx0XHR0aGlzQXJnID0gZGVsYXk7XG5cdFx0ZGVsYXkgPSAwO1xuXHR9XG5cblx0ZGVsYXkgPSBkZWxheSB8fCAwO1xuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IFthMSwgYTIsIGEzXSA9IGFyZ3M7XG5cdFx0Y29uc3QgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuXHRcdGNvbnN0IGNhbGxDb250ZXh0ID0gdGhpc0FyZyB8fCB0aGlzO1xuXG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0c3dpdGNoKGFyZ3NMZW5ndGgpIHtcblx0XHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRcdGZ1bmMuY2FsbChjYWxsQ29udGV4dCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgMTpcblx0XHRcdFx0XHRmdW5jLmNhbGwoY2FsbENvbnRleHQsIGExKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRcdGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAzOlxuXHRcdFx0XHRcdGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyLCBhMyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjYWxsQ29udGV4dCwgYXJncyk7XG5cdFx0XHR9XG5cdFx0fSwgZGVsYXkpO1xuXHR9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2RlYm91bmNlLmpzXG4gKiovIiwiLyplc2xpbnQgbm8tdXNlLWJlZm9yZS1kZWZpbmU6IFtcImVycm9yXCIsIHsgXCJmdW5jdGlvbnNcIjogZmFsc2UgfV0qL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vYWRkbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgaXMgZnJvbSAnLi4vX3V0aWwvaXMnO1xuXG5jb25zdCB0cmVlQ2hhbmdlRXZ0UmVnID0gL15fY2hhbmdlOnRyZWU6LztcblxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG5cdHByZXZpb3VzVmFsdWUsXG5cdHZhbHVlXG59LCB7XG5cdHBhdGgsXG5cdG5hbWUsXG5cdGNhbGxiYWNrLFxuXHRjb250ZXh0XG59ID0gdHJpZ2dlck9uZS5sYXRlc3RFdmVudC5pbmZvLmRlbGVnYXRlZERhdGEpIHtcblx0aWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKHZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH1cblxuXHRpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIocHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuXHR9XG5cblx0Ly8gdHJpZ2dlciB0cmVlIGNoYW5nZSBldmVudCB3aGljaCBpcyB1c2VkIGJ5IGJpbmRpbmdzIGxvZ2ljXG5cdGlmICh0cmVlQ2hhbmdlRXZ0UmVnLnRlc3QobmFtZSkpIHtcblx0XHRjb25zdCBjaGFuZ2VLZXkgPSBuYW1lLnJlcGxhY2UodHJlZUNoYW5nZUV2dFJlZywgJycpO1xuXG5cdFx0aWYgKHByZXZpb3VzVmFsdWUgJiYgIWlzKHByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSwgdmFsdWVbY2hhbmdlS2V5XSkpIHtcblx0XHRcdGNvbnN0IHsgZXZlbnRzIH0gPSBkZWZzLmdldCh2YWx1ZSk7XG5cdFx0XHRjb25zdCB0cmVlQ2hhbmdlRXZ0TmFtZSA9IGBfY2hhbmdlOnRyZWU6JHtjaGFuZ2VLZXl9YDtcblx0XHRcdGNvbnN0IGNoYW5nZUV2ZW50cyA9IGV2ZW50c1t0cmVlQ2hhbmdlRXZ0TmFtZV07XG5cdFx0XHRpZiAoY2hhbmdlRXZlbnRzKSB7XG5cdFx0XHRcdHRyaWdnZXJPbmUodmFsdWUsIHRyZWVDaGFuZ2VFdnROYW1lLCB7XG5cdFx0XHRcdFx0cHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuXHRcdFx0XHRcdHZhbHVlOiB2YWx1ZVtjaGFuZ2VLZXldLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG5cdC8vIGlmIHR5cGVvZiBwYXRoIGlzIHN0cmluZyBhbmQgcGF0aCBpcyBub3QgZW1wdHkgc3RyaW5nIHRoZW4gc3BsaXQgaXRcblx0cGF0aCA9IHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJyAmJiBwYXRoICE9PSAnJyA/IHBhdGguc3BsaXQoJy4nKSA6IHBhdGg7XG5cblx0aWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuXHRcdC8vIGlmIG5vIHBhdGggdGhlbiBhZGQgc2ltcGxlIGxpc3RlbmVyXG5cdFx0YWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gZWxzZSBkbyBhbGwgbWFnaWNcblx0XHRjb25zdCBrZXkgPSBwYXRoWzBdO1xuXHRcdGxldCBwYXRoU3RyO1xuXG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMSkge1xuXHRcdFx0cGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG5cdFx0XHRwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGggPSBbXTtcblx0XHRcdHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuXHRcdH1cblxuXHRcdGNvbnN0IGRlbGVnYXRlZERhdGEgPSB7XG5cdFx0XHRwYXRoLFxuXHRcdFx0bmFtZSxcblx0XHRcdGNhbGxiYWNrLFxuXHRcdFx0Y29udGV4dFxuXHRcdH07XG5cblx0XHQvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IFwic2V0XCJcblx0XHRhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gLCBjaGFuZ2VIYW5kbGVyLCBudWxsLCB7XG5cdFx0XHRkZWxlZ2F0ZWREYXRhLFxuXHRcdFx0cGF0aFN0clxuXHRcdH0pO1xuXG5cdFx0Ly8gY2FsbCBoYW5kbGVyIG1hbnVhbGx5XG5cdFx0Y2hhbmdlSGFuZGxlcih7XG5cdFx0XHR2YWx1ZTogb2JqZWN0W2tleV1cblx0XHR9LCBkZWxlZ2F0ZWREYXRhKTtcblx0fVxufVxuXG4vKlxuZGVmaW5lKFtcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvY29yZScsXG5cdCdtYXRyZXNoa2FfZGlyL2NvcmUvaW5pdG1rJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvbWFwJyxcblx0J21hdHJlc2hrYV9kaXIvY29yZS92YXIvc3BlY2lhbGV2dHJlZydcbl0sIGZ1bmN0aW9uKGNvcmUsIGluaXRNSywgbWFwLCBzcGVjaWFsRXZ0UmVnKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgX2RlbGVnYXRlTGlzdGVuZXIgPSBjb3JlLl9kZWxlZ2F0ZUxpc3RlbmVyID0gZnVuY3Rpb24ob2JqZWN0LFxuXHQgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpIHtcblx0XHRpZiAoIW9iamVjdCB8fCB0eXBlb2Ygb2JqZWN0ICE9ICdvYmplY3QnKSByZXR1cm4gb2JqZWN0O1xuXG5cdFx0aW5pdE1LKG9iamVjdCk7XG5cblx0XHR2YXIgb2JqZWN0RGF0YSA9IG1hcC5nZXQob2JqZWN0KSxcblx0XHRcdGV4ZWN1dGVkID0gLyhbXlxcLl0rKVxcLiguKikvLmV4ZWMocGF0aCksXG5cdFx0XHRmLFxuXHRcdFx0Zmlyc3RLZXkgPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzFdIDogcGF0aCxcblx0XHRcdGNoYW5nZUtleSxcblx0XHRcdG9iajtcblxuXHRcdHBhdGggPSBleGVjdXRlZCA/IGV4ZWN1dGVkWzJdIDogJyc7XG5cblx0XHRldnREYXRhID0gZXZ0RGF0YSB8fCB7fTtcblxuXHRcdGlmIChmaXJzdEtleSkge1xuXHRcdFx0aWYgKGZpcnN0S2V5ID09ICcqJykge1xuXHRcdFx0XHRpZiAob2JqZWN0LmlzTUtBcnJheSkge1xuXHRcdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRcdChldnQgJiYgZXZ0LmFkZGVkID8gZXZ0LmFkZGVkIDogb2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdFx0XHRcdFx0aXRlbSAmJiBfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLFxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0Zi5fY2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRcdFx0XHRjb3JlLl9hZGRMaXN0ZW5lcihvYmplY3QsICdhZGQnLCBmLCBjb250ZXh0LCBldnREYXRhKTtcblx0XHRcdFx0XHRmKCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAob2JqZWN0LmlzTUtPYmplY3QpIHtcblx0XHRcdFx0XHRmID0gZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2V2dC5rZXldO1xuXG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0ICYmIGV2dCAmJiAoZXZ0LmtleSBpbiBvYmplY3REYXRhLmtleXMpKSB7XG5cdFx0XHRcdFx0XHRcdF9kZWxlZ2F0ZUxpc3RlbmVyKHRhcmdldCwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRvYmplY3QuZWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRcdFx0XHRfZGVsZWdhdGVMaXN0ZW5lcihpdGVtLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCAnY2hhbmdlJywgZiwgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGYgPSBmdW5jdGlvbihldnQpIHtcblx0XHRcdFx0XHRpZiAoZXZ0ICYmIGV2dC5fc2lsZW50KSByZXR1cm47XG5cblx0XHRcdFx0XHR2YXIgdGFyZ2V0ID0gb2JqZWN0W2ZpcnN0S2V5XSxcblx0XHRcdFx0XHRcdGNoYW5nZUtleSxcblx0XHRcdFx0XHRcdHRyaWdnZXJDaGFuZ2UgPSB0cnVlLFxuXHRcdFx0XHRcdFx0aSxcblx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cztcblxuXHRcdFx0XHRcdGV2dERhdGEucGF0aCA9IHBhdGg7XG5cblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgPSBldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgfHxcblx0XHRcdFx0XHRldnREYXRhLnByZXZpb3VzVmFsdWUgJiYgZXZ0RGF0YS5wcmV2aW91c1ZhbHVlW2ZpcnN0S2V5XTtcblxuXHRcdFx0XHRcdGlmIChldnQgJiYgZXZ0LnByZXZpb3VzVmFsdWUgJiYgbWFwLmhhcyhldnQucHJldmlvdXNWYWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvcmUuX3VuZGVsZWdhdGVMaXN0ZW5lcihldnQucHJldmlvdXNWYWx1ZSwgcGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGV2dERhdGEpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0ID09ICdvYmplY3QnICYmIHRhcmdldCkge1xuXHRcdFx0XHRcdFx0X2RlbGVnYXRlTGlzdGVuZXIodGFyZ2V0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHNwZWNpYWxFdnRSZWcudGVzdChuYW1lKSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlS2V5ID0gbmFtZS5yZXBsYWNlKHNwZWNpYWxFdnRSZWcsICcnKTtcblxuXHRcdFx0XHRcdFx0aWYgKCFwYXRoICYmIGV2dERhdGEucHJldmlvdXNWYWx1ZSAmJiBldnREYXRhLnByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XVxuXHRcdFx0XHRcdFx0IT09IHRhcmdldFtjaGFuZ2VLZXldKSB7XG5cdFx0XHRcdFx0XHRcdGNoYW5nZUV2ZW50cyA9IG1hcC5nZXQoZXZ0RGF0YS5wcmV2aW91c1ZhbHVlKS5ldmVudHNbbmFtZV07XG5cdFx0XHRcdFx0XHRcdGlmIChjaGFuZ2VFdmVudHMpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2hhbmdlRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoY2hhbmdlRXZlbnRzW2ldLnBhdGggPT09IHBhdGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJpZ2dlckNoYW5nZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29yZS5zZXQodGFyZ2V0LCBjaGFuZ2VLZXksIHRhcmdldFtjaGFuZ2VLZXldLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3JjZTogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdHByZXZpb3VzVmFsdWU6IGV2dERhdGEucHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuXHRcdFx0XHRcdFx0XHRcdFx0cHJldmlvdXNPYmplY3Q6IGV2dERhdGEucHJldmlvdXNWYWx1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdF9zaWxlbnQ6IHRydWVcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRmLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG5cdFx0XHRcdGNvcmUuX2FkZExpc3RlbmVyKG9iamVjdCwgJ2NoYW5nZTonICsgZmlyc3RLZXksIGYsIGNvbnRleHQsIGV2dERhdGEpO1xuXG5cdFx0XHRcdGYoKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29yZS5fYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgZXZ0RGF0YSk7XG5cdFx0fVxuXHR9O1xufSk7XG4qL1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBuZXN0ZWQgb2JqZWN0IGJhc2VkIG9uIHBhdGggYW5kIGxhc3RWYWx1ZVxuLy8gZXhhbXBsZTogbWFrZU9iamVjdCgnYS5iLmMnLCA0MikgLT4ge2E6IHtiOiB7YzsgNDJ9fX1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VPYmplY3QocGF0aCA9ICcnLCBsYXN0VmFsdWUgPSB7fSkge1xuXHRwYXRoID0gcGF0aCA/IHBhdGguc3BsaXQoJy4nKSA6IFtdO1xuXHRjb25zdCByZXN1bHQgPSB7fTtcblx0bGV0IG9iaiA9IHJlc3VsdCxcblx0XHRrZXk7XG5cblxuXHR3aGlsZSAocGF0aC5sZW5ndGggPiAxKSB7XG5cdFx0a2V5ID0gcGF0aC5zaGlmdCgpO1xuXHRcdG9iaiA9IG9ialtrZXldID0ge307XG5cdH1cblxuXHRvYmpbcGF0aC5zaGlmdCgpXSA9IGxhc3RWYWx1ZTtcblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3B5KCkge1xuXHRjb25zdCBzcHlOYW1lID0gYHJhbmRvbU5hbWUke01hdGgucmFuZG9tKCl9JHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xuXHRjb25zdCBzcHkgPSAoKSA9PiB7fTtcblx0Y29uc3Qgc3B5T2JqID0ge307XG5cdHNweU9ialtzcHlOYW1lXSA9IHNweTtcblx0cmV0dXJuIHNweU9uKHNweU9iaiwgc3B5TmFtZSk7O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9jcmVhdGVzcHkuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5hZGQnLCAoKSA9PiB7XG5cdGl0KCdhZGRzIG9uY2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWw0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG5cdFx0XHRlbDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdGV4cGVjdChbXG5cdFx0XHQuLi4kKFtlbDEsIGVsMiwgZWwzXSkuYWRkKFtlbDIsIGVsMywgZWw0LCBlbDVdKVxuXHRcdF0pLnRvRXF1YWwoW2VsMSwgZWwyLCBlbDMsIGVsNCwgZWw1XSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvYWRkX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5jcmVhdGUnLCAoKSA9PiB7XG5cdGl0KCdjcmVhdGVzIGVsZW1lbnQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicpLnRhZ05hbWVcblx0XHQpLnRvRXF1YWwoJ0RJVicpO1xuXHR9KTtcblxuXHRpdCgnYWRkcyBhIHByb3BlcnR5JywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQuY3JlYXRlKCdkaXYnLCB7XG5cdFx0XHRcdGNsYXNzTmFtZTogJ2Zvb2Jhcidcblx0XHRcdH0pLmNsYXNzTmFtZVxuXHRcdCkudG9FcXVhbCgnZm9vYmFyJyk7XG5cdH0pO1xuXG5cdGl0KCdjcmVhdGVzIGNoaWxkZW4nLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoJ2RpdicsIHtcblx0XHRcdFx0Y2hpbGRyZW46IFt7XG5cdFx0XHRcdFx0dGFnTmFtZTogJ3NwYW4nXG5cdFx0XHRcdH1dXG5cdFx0XHR9KS5jaGlsZHJlblswXS50YWdOYW1lXG5cdFx0KS50b0VxdWFsKCdTUEFOJyk7XG5cdH0pO1xuXG5cdGl0KCdhZGRzIGF0dHJpYnV0ZScsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkLmNyZWF0ZSgnZGl2Jywge1xuXHRcdFx0XHRhdHRyaWJ1dGVzOiB7XG5cdFx0XHRcdFx0Zm9vOiAnYmFyJ1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5nZXRBdHRyaWJ1dGUoJ2ZvbycpXG5cdFx0KS50b0VxdWFsKCdiYXInKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG9iamVjdCB3aXRoIHRhZ05hbWUgcHJvcGVydHknLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5jcmVhdGUoe1xuXHRcdFx0XHR0YWdOYW1lOiAnZGl2J1xuXHRcdFx0fSkudGFnTmFtZVxuXHRcdCkudG9FcXVhbCgnRElWJyk7XG5cdH0pO1xuXG5cdHhpdCgnZXh0ZW5kcyBkYXRhc2V0IG9iamVjdCcsICgpID0+IHtcblx0XHQvLyBUT0RPXG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcbmltcG9ydCBzaW11bGF0ZUNsaWNrIGZyb20gJy4uLy4uL2xpYi9zaW11bGF0ZWNsaWNrJztcblxuZGVzY3JpYmUoJ2JRdWVyeSBldmVudHMnLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveCxcblx0XHRjaGlsZDEsXG5cdFx0Y2hpbGQyLFxuXHRcdGdyYW5kY2hpbGQxLFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0dGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuXHRcdHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImdyYW5kY2hpbGQxXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjaGlsZDJcIj48L2Rpdj5cblx0XHRgO1xuXG5cdFx0Y2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpO1xuXHRcdGNoaWxkMiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDInKTtcblx0XHRncmFuZGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkMScpO1xuXG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0c3B5T24odGhpcywgJ2hhbmRsZXInKTtcblx0XHRoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuXHR9KTtcblxuXHRhZnRlckVhY2goKCkgPT4ge1xuXHRcdCQoW3Rlc3RTYW5kYm94LCBjaGlsZDEsIGNoaWxkMiwgZ3JhbmRjaGlsZDFdKS5vZmYoJ2NsaWNrJyk7XG5cdH0pO1xuXG5cdGl0KCdBZGRzIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZXZlbnQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgbmFtZXNwYWNlZCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljay55bycsIGhhbmRsZXIpLm9mZignY2xpY2sueW8nLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycpO1xuXHRcdHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBidWJibGluZyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChjbGljayBvbiBncmFuZGNoaWxkcmVuKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdEb2VzblxcdCB0cmlnZ2VyIHdoZW4gY2xpY2tlZCBvbiB3cm9uZyBjaGlsZCcsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMicsIGhhbmRsZXIpO1xuXHRcdHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBzcGVjaWZpZWQpJywgKCkgPT4ge1xuXHRcdCQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIHNwZWNpZmllZCwgaGFuZGxlciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScpO1xuXHRcdHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBub3Qgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG5cdFx0JCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcblx0XHRzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdTdG9wcyBwcm9wYWdhdGlvbicsICgpID0+IHtcblx0XHQkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcblx0XHQkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG5cdFx0c2ltdWxhdGVDbGljayhjaGlsZDEpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2V2ZW50c19zcGVjLmpzXG4gKiovIiwiLy8gc2ltdWxhdGVzIGNsaWNrIG9uIGEgbm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2ltdWxhdGVDbGljayhub2RlKSB7XG5cdGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG5cdGV2dC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlKTtcblx0bm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvbGliL3NpbXVsYXRlY2xpY2suanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5maW5kJywgKCkgPT4ge1xuXHRsZXQgdGVzdFNhbmRib3gsXG5cdFx0Z3JhbmRDaGlsZDtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cImNoaWxkXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0Z3JhbmRDaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkJyk7XG5cdH0pO1xuXG5cdGl0KCdmaW5kcycsICgpID0+IHtcblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJCh0ZXN0U2FuZGJveCkuZmluZCgnLmdyYW5kY2hpbGQnKVxuXHRcdF0pLnRvRXF1YWwoW2dyYW5kQ2hpbGRdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5Jztcbi8vINC30LDRgdGD0L3Rg9GC0Ywg0LLRgdC1INGB0L7Qt9C00LDQvdC40Y8g0L3QvtCy0YvRhSDRjdC70LXQvNC10L3RgtC+0LIg0LIgYmVmb3JlRWFjaFxuLy8g0YDQtdGE0LDQutGC0L7RgNC40YLRjFxuLy8g0L3QsNC/0LjRgdCw0YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC4ICjQsiDRgtC+0Lwg0YfQuNGB0LvQtSDQuCDQuiDRg9C20LUg0YDQtdCw0LvQuNC30L7QstCw0L3QvdGL0Lwg0YTRg9C90LrRhtC40Y/QvClcbi8vINC/0L7RgdC70LUg0LLRgdC10LPQviDQvdGD0LbQvdC+INCy0LrQu9GO0YfQuNGC0Ywg0LvQuNC90YLQtdGAINC4INC/0YDQvtCy0LXRgNC40YLRjCDQutC+0LLQtdGA0LDQtNC2XG5cbmRlc2NyaWJlKCdiUXVlcnkgaW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG5cdGxldCB0ZXN0U2FuZGJveDtcblxuXHRiZWZvcmVFYWNoKCgpID0+IHtcblx0XHR0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG5cdFx0dGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuXHRcdFx0PGRpdiBjbGFzcz1cInRlc3RcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRlc3QtMVwiPjwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGVzdC0yXCI+PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ0ZXN0LTNcIj48L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGA7XG5cdH0pO1xuXG5cdGl0KCdhY2NlcHRzIHdpbmRvdycsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKHdpbmRvdyk7XG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuXHR9KTtcblxuXHRpdCgnYWNjZXB0cyBkb2N1bWVudCcsICgpID0+IHtcblx0XHRjb25zdCByZXN1bHQgPSAkKGRvY3VtZW50KTtcblx0XHRleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcblx0XHRleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKGRvY3VtZW50KTtcblx0fSk7XG5cblx0aXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ2NvbnZlcnRzIGFycmF5LWxpa2UnLCAoKSA9PiB7XG5cdFx0Y29uc3QgY2hpbGRyZW4gPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJyksXG5cdFx0XHRyZXN1bHQgPSAkKGNoaWxkcmVuKTtcblxuXHRcdGV4cGVjdChjaGlsZHJlbi5sZW5ndGgpLnRvRXF1YWwocmVzdWx0Lmxlbmd0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRleHBlY3QoY2hpbGRyZW5baV0pLnRvRXF1YWwocmVzdWx0W2ldKTtcblx0XHR9XG5cdH0pO1xuXG5cdGl0KCdDb252ZXJ0cyBvbmUgZWxlbWVudCcsICgpID0+IHtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKicpLFxuXHRcdFx0cmVzdWx0ID0gJChlbGVtZW50KTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuXHRcdGV4cGVjdChlbGVtZW50KS50b0VxdWFsKHJlc3VsdFswXSk7XG5cdH0pO1xuXG5cdGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgnLnRlc3QtMScsIHRlc3RTYW5kYm94KS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMSk7XG5cdH0pO1xuXG5cdGl0KCdVc2VzIGNvbnRleHQnLCAoKSA9PiB7XG5cdFx0ZXhwZWN0KFxuXHRcdFx0JCgnLnRlc3QtMScsICcud3JvbmctY29udGV4dCcpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byB1c2UgbnVsbCcsICgpID0+IHtcblx0XHRleHBlY3QoXG5cdFx0XHQkKG51bGwpLmxlbmd0aFxuXHRcdCkudG9FcXVhbCgwKTtcblx0fSk7XG5cblx0aXQoJ0FsbG93cyB0byB1c2UgdW5kZWZpbmVkJywgKCkgPT4ge1xuXHRcdGV4cGVjdChcblx0XHRcdCQoKS5sZW5ndGhcblx0XHQpLnRvRXF1YWwoMCk7XG5cdH0pO1xuXG5cdGl0KCdBbGxvd3MgdG8gY3JlYXRlIHBsdWdpbnMnLCAoKSA9PiB7XG5cdFx0JC5mbi5iUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiBiUXVlcnlQbHVnaW4oKSB7XG5cdFx0XHRleHBlY3QoXG5cdFx0XHRcdHRoaXMubGVuZ3RoXG5cdFx0XHQpLnRvRXF1YWwoXG5cdFx0XHRcdHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5sZW5ndGhcblx0XHRcdCk7XG5cdFx0fTtcblxuXHRcdHNweU9uKCQuZm4sICdiUXVlcnlQbHVnaW4nKTtcblxuXHRcdCQoJyonLCB0ZXN0U2FuZGJveCkuYlF1ZXJ5UGx1Z2luKCk7XG5cblx0XHRleHBlY3QoJC5mbi5iUXVlcnlQbHVnaW4pLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pbml0X3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG5cdGl0KCdjaGVja3MgY2xhc3NOYW1lJywgKCkgPT4ge1xuXHRcdGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuXHRcdGV4cGVjdChcblx0XHRcdCQoZWwpLmlzKCcuZWwnKVxuXHRcdCkudG9FcXVhbCh0cnVlKTtcblxuXHRcdGV4cGVjdChcblx0XHRcdCQoZWwpLmlzKCcuZWwyJylcblx0XHQpLnRvRXF1YWwoZmFsc2UpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG5cdGl0KCdleGNsdWRlcyBieSBzZWxlY3RvcicsICgpID0+IHtcblx0XHRjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcblx0XHRcdGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuXHRcdFx0ZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHRlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cblx0XHRleHBlY3QoW1xuXHRcdFx0Li4uJChbZWwxLCBlbDIsIGVsM10pLm5vdCgnLmVsMicpXG5cdFx0XSkudG9FcXVhbChbZWwxLCBlbDNdKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qc1xuICoqLyIsImltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5Lm9uZScsICgpID0+IHtcblx0aXQoJ2ZpbmRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cblx0XHR0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG5cdFx0PGRpdiBjbGFzcz1cImNoaWxkXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgY2xhc3M9XCJjaGlsZDJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMlwiPjwvZGl2PlxuXHRcdDwvZGl2PlxuXHRcdGA7XG5cblx0XHRjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG5cdFx0ZXhwZWN0KFxuXHRcdFx0JC5vbmUoJyonLCB0ZXN0U2FuZGJveClcblx0XHQpLnRvRXF1YWwoY2hpbGQpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzXG4gKiovIiwiaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkucGFyc2VIVE1MJywgKCkgPT4ge1xuXHRpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gJC5wYXJzZUhUTUwoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG5cdFx0ZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG5cdFx0ZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcblx0fSk7XG5cblx0aXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuXHRcdGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8dGQ+PC90ZD48dGQ+PC90ZD4nKTtcblxuXHRcdGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuXHRcdGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcblx0XHRleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgQ2xhc3MgZnJvbSAnc3JjL2NsYXNzJztcblxuZGVzY3JpYmUoJ0NsYXNzIGZ1bmN0aW9uJywgKCkgPT4ge1xuXHRpdCgnYWxsb3dzIHRvIGluaGVyaXQnLCAoKSA9PiB7XG5cdFx0Y29uc3QgQSA9IENsYXNzKHsgYTogdHJ1ZSB9KSxcblx0XHRcdEIgPSBDbGFzcyh7IGI6IHRydWUsIGV4dGVuZHM6IEEgfSksXG5cdFx0XHRDID0gQ2xhc3MoeyBjOiB0cnVlLCBleHRlbmRzOiBCIH0pLFxuXHRcdFx0aW5zdCA9IG5ldyBDO1xuXG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBCKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDKS50b0JlVHJ1dGh5KCk7XG5cblx0XHRleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG5cdFx0ZXhwZWN0KGluc3QuYikudG9CZVRydXRoeSgpO1xuXHRcdGV4cGVjdChpbnN0LmMpLnRvQmVUcnV0aHkoKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcblx0XHRjb25zdCBBID0gQ2xhc3Moe30sIHsgc3RhdGljUHJvcDogdHJ1ZSB9KTtcblx0XHRleHBlY3QoQS5zdGF0aWNQcm9wKS50b0JlVHJ1dGh5KCk7XG5cdH0pO1xuXG5cdGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGNvbnN0IGluc3QgPSBuZXcgQ2xhc3MoeyBhOiB0cnVlIH0pO1xuXHRcdGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcblx0XHRleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcblx0fSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xhc3MocHJvdG90eXBlLCBzdGF0aWNQcm9wcykge1xuXHRjb25zdCBDb25zdHJ1Y3RvciA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0XG5cdFx0XHQ/IHByb3RvdHlwZS5jb25zdHJ1Y3RvclxuXHRcdFx0OiBmdW5jdGlvbiBFbXB0eUNvbnN0cnVjdG9yKCkge30sXG5cdFx0Ly9leHRlbmRzIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblx0XHRQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuXHRcdC8vaW5oZXJpdCBwcm90byBmcm9tIGNsYXNzIHBhcmVudCBvciBlbXB0eSBvYmplY3Rcblx0XHRwcm90byA9IE9iamVjdC5jcmVhdGUoUGFyZW50ID8gUGFyZW50LnByb3RvdHlwZSA6IHt9KTtcblxuXHRleHRlbmQocHJvdG8sIHByb3RvdHlwZSk7XG5cblx0aWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcblx0XHRleHRlbmQoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcblx0fVxuXG5cdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5cdHByb3RvLmluc3RhbmNlT2YgPSBmdW5jdGlvbiBpbnN0YW5jZU9mKCkge1xuXHRcdHJldHVybiB0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3I7XG5cdH07XG5cblx0Q29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cblx0Ly8gaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZVxuXHRpZiAodGhpcyBpbnN0YW5jZW9mIENsYXNzKSB7XG5cdFx0cmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBDb25zdHJ1Y3Rvcjtcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xhc3MuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoTWF0cmVzaGthLk9iamVjdCBhbmQgTWF0cmVzaGthLkFycmF5KScsIGZ1bmN0aW9uKCkge1xuXHRpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCB7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLnB1c2goe30pO1xuXG5cdFx0bWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlLFxuXHRcdFx0Y2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuXHRcdG9iai5wdXNoKHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLk9iamVjdCknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRvYmouanNldCgneCcsIHt9KTtcblxuXHRcdG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7XG5cdFx0XHRhOiB7fVxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4Jywge1xuXHRcdFx0YToge31cblx0XHR9KTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLnguYSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe30pKTtcblxuXHRcdG1hZ2ljLnRyaWdnZXIob2JqWzBdWzBdLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdGE6IHt9XG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaChuZXcgTUsuQXJyYXkoe1xuXHRcdFx0YToge31cblx0XHR9KSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXVswXS5hLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qLmEnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG5cdFx0XHR5OiBuZXcgTUsuT2JqZWN0KHtcblx0XHRcdFx0YToge31cblx0XHRcdH0pXG5cdFx0fSkpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmoueC55LmEsICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJ3NyYy9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0RlbGVnYXRlZCBldmVudHM6IGRlbGVnYXRlTGlzdGVuZXIsIHVuZGVsZWdhdGVMaXN0ZW5lciAoYmFzaWMpJywgZnVuY3Rpb24gdGVzdCgpIHtcblx0bGV0IGN0eCxcblx0XHRoYW5kbGVyO1xuXG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0Y3R4ID0ge307XG5cdFx0dGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG5cdFx0aGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuXHR9KTtcblxuXG5cdGl0KCdmaXJlcyAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0ge307XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLmMgPSB7fTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKSxcblx0XHRcdGEgPSBvYmouYTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuXHRcdHRyaWdnZXJPbmUoYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKSxcblx0XHRcdGIgPSBvYmouYS5iO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYiA9IHt9O1xuXHRcdHRyaWdnZXJPbmUoYiwgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpLFxuXHRcdFx0YSA9IG9iai5hO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuXHRcdHRyaWdnZXJPbmUoYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKSxcblx0XHRcdGIgPSBvYmouYS5iO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuXHRcdHRyaWdnZXJPbmUoYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyksXG5cdFx0XHRjID0gb2JqLmEuYztcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi5jID0ge307XG5cdFx0dHJpZ2dlck9uZShjLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIChhLmIpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnKTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2RvZXNuXFwndCByZW1vdmUgY2hhbmdlIGV2ZW50IHdoZW4gdW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnKTtcblx0XHRvYmouYS5iLmMgPSA1NTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG5cdFx0dW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcblx0XHR0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCd1c2VzIGNvcnJlY3QgY29udGV4dCBmb3IgZGVsZWdhdGVkIGV2ZW50cycsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXHRcdGxldCBib29sID0gZmFsc2U7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGZ1bmN0aW9uIGhhbmRsZSgpIHtcblx0XHRcdGJvb2wgPSB0aGlzID09PSBjdHg7XG5cdFx0fSwgY3R4KTtcblxuXHRcdHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0NoYW5nZSBldmVudCAoc2ltcGxlIGFuZCBkZWxlZ2F0ZWQpJywgZnVuY3Rpb24gdGVzdCgpIHtcblx0bGV0IGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0aGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgc2ltcGxlJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmoueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cblx0XHRkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hLmIueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgc2ltcGxlJywgKCkgPT4ge1xuXHRcdGNvbnN0IG9iaiA9IHsgeDogMSB9O1xuXG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLngnLCAxKTtcblxuXHRcdGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEueCA9IDI7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHR1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG5cdFx0b2JqLmEuYi54ID0gMjtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0Lyplc2xpbnQtZGlzYWJsZSAqL1xuXHR4aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcblx0XHRjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcblx0XHRvYmouYS5iLnggPSAyO1xuXHRcdGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cblx0eGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG5cdFx0Y29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuXG5cdFx0ZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuXHRcdG9iai5hID0gbWFrZU9iamVjdCgnYi5jLngnLCAyKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHR4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBiKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge1xuXHRcdFx0XHRcdFx0XHR4OiAxXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG9iai5hLmIgPSB7XG5cdFx0XHRjOiB7XG5cdFx0XHRcdHg6IDJcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0b2JqLmEuYi5jID0ge1xuXHRcdFx0eDogMlxuXHRcdH07XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0eGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRpID0gMDtcblxuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTExKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTEwKTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTkpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGV2dCA9PiBpICs9IDFlOCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTcpO1xuXHRcdG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU2KTtcblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlNCk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMyk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMik7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMSk7XG5cdFx0bWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMCk7XG5cdFx0b2JqLmEgPSB7XG5cdFx0XHRiOiB7XG5cdFx0XHRcdGM6IHtcblx0XHRcdFx0XHR4OiAyXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMTExMTExMTExMSk7XG5cdH0pO1xuXG5cdHhpdCgnYWNjZXB0cyBudWxsIHRhcmdldCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7XG5cdFx0XHRcdGE6IHtcblx0XHRcdFx0XHRiOiB7XG5cdFx0XHRcdFx0XHRjOiB7XG5cdFx0XHRcdFx0XHRcdHg6IDFcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0b2JqLmEuYiA9IG51bGw7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXHQvKmVzbGludC1lbmFibGUgKi9cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jaGFuZ2Vfc3BlYy5qc1xuICoqLyIsImltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsIGZ1bmN0aW9uIHRlc3QoKSB7XG5cdGxldCBvYmosXG5cdFx0Y3R4LFxuXHRcdGhhbmRsZXI7XG5cblx0YmVmb3JlRWFjaCgoKSA9PiB7XG5cdFx0b2JqID0ge307XG5cdFx0Y3R4ID0ge307XG5cdFx0aGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcblx0XHRsZXQgaSA9IDA7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUyKSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBhcmdzKScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmopO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG5cdFx0YWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZScsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcblx0XHRyZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcblx0XHRhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuXHRcdHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0dHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblx0XHRleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuXHRcdGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG5cdFx0cmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuXHRcdHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcblx0fSk7XG5cblx0eGl0KCdyZW1vdmVzIGJ5IGhvd1RvUmVtb3ZlIChub3QgZG9jdW1lbnRlZCBjb3JlIGZlYXR1cmUpJywgKCkgPT4ge1xuXHRcdC8qZXNsaW50LWRpc2FibGUgKi9cblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRmID0gZXZ0ID0+IGJvb2wgPSB0cnVlLFxuXHRcdFx0b25EYXRhID0ge1xuXHRcdFx0XHRob3dUb1JlbW92ZShvbkRhdGEsIG9mZkRhdGEpIHtcblx0XHRcdFx0XHRyZXR1cm4gb2ZmRGF0YS54ID09PSA0Mjtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQyXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDEnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblxuXHRcdG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgZiwgbnVsbCwgb25EYXRhKTtcblx0XHRtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIG51bGwsIG51bGwsIHtcblx0XHRcdHg6IDQzXG5cdFx0fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDInKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHRcdC8qZXNsaW50LWVuYWJsZSAqL1xuXHR9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG5cbnhkZXNjcmliZShcIkV2ZW50cyBjb3JlOiBfYWRkRE9NTGlzdGVuZXIsIF9yZW1vdmVET01MaXN0ZW5lclwiLCAoKSA9PiB7XG5cdGxldCBxID0gKHMsIGMpID0+IHtcblx0XHRsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuXHRcdGlmIChyZXN1bHQpIHtcblx0XHRcdHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuXHRcdFx0XHRsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cdFx0XHRcdGV2LmluaXRNb3VzZUV2ZW50KFxuXHRcdFx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFx0XHR0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG5cdFx0XHRcdFx0d2luZG93LCBudWxsLFxuXHRcdFx0XHRcdDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG5cdFx0XHRcdFx0ZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cblx0XHRcdFx0XHQwIC8qbGVmdCovICwgbnVsbFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG5cdFx0dGFnTmFtZTogJ0RJVicsXG5cdFx0aWQ6ICdkLXRlc3QnLFxuXHRcdGlubmVySFRNTDogYFxuXHRcdFx0PGRpdiBpZD1cImQtdGVzdC0xXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YFxuXHR9KSk7XG5cblxuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSBhbmQgcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3IgKGJ1YmJsaW5nIHRlc3QpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIDEsIDIpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuXHRcdG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJyk7XG5cblx0XHRxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXHR9KTtcblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQgYW5kIGRvZXNuXFwndCByZW1vdmUgZXZlbnRzIGZyb20gb3RoZXIgbm9kZXMnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG5cdFx0cSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXG5cdGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb2ZmKScsICgpID0+IHtcblx0bGV0IHEgPSAocywgYykgPT4ge1xuXHRcdGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG5cdFx0aWYgKHJlc3VsdCkge1xuXHRcdFx0cmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG5cdFx0XHRcdGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcblx0XHRcdFx0ZXYuaW5pdE1vdXNlRXZlbnQoXG5cdFx0XHRcdFx0XCJjbGlja1wiLFxuXHRcdFx0XHRcdHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcblx0XHRcdFx0XHR3aW5kb3csIG51bGwsXG5cdFx0XHRcdFx0MCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuXHRcdFx0XHRcdDAgLypsZWZ0Ki8gLCBudWxsXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0bGV0IG5vZGUgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcblx0XHR0YWdOYW1lOiAnRElWJyxcblx0XHRpZDogJ3MtdGVzdCcsXG5cdFx0aW5uZXJIVE1MOiBgXG5cdFx0XHQ8ZGl2IGlkPVwicy10ZXN0LTFcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgXG5cdH0pKTtcblxuXHRub2RlLmNsaWNrID0gbm9kZS5jbGljayB8fCBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuXHR9XG5cblx0aXQoJ2ZpcmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblx0aXQoJ2ZpcmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcblx0XHRsZXQgbWsgPSBuZXcgTUssXG5cdFx0XHRib29sID0gZmFsc2U7XG5cdFx0bWsub24oJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cdFx0bWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuXHRcdGxldCBtayA9IG5ldyBNSyxcblx0XHRcdGJvb2wgPSBmYWxzZSxcblx0XHRcdGYgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cblx0XHRtay5vbignc29tZWV2ZW50JywgZik7XG5cdFx0bWsub2ZmKCdzb21lZXZlbnQnKTtcblx0XHRtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge1xuXHRcdFx0XHRhOiB7XG5cdFx0XHRcdFx0Yjoge1xuXHRcdFx0XHRcdFx0Yzoge31cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cblxuXHRpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHtcblx0XHRcdFx0YToge1xuXHRcdFx0XHRcdGI6IHtcblx0XHRcdFx0XHRcdGM6IHt9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnYS5iLmNAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblx0XHRtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuXHRcdGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcblx0fSk7XG5cblx0aXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuXHRcdHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXHRcdG1hZ2ljLm9mZihvYmosICdjbGljazo6eCcpO1xuXG5cdFx0cSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2U7XG5cblx0XHRtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblx0XHRvYmoucHVzaCh7fSk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG5cdH0pO1xuXG5cdGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGJvb2wgPSBmYWxzZTtcblxuXHRcdG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG5cdFx0bWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cblx0XHRxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuXHRcdGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuXHR9KTtcblxuXHRpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0Ym9vbCA9IGZhbHNlO1xuXG5cdFx0bWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jylcblx0XHRtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXHRcdHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cblx0XHRleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcblx0fSk7XG5cblx0aXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cblx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbmNlXCInLCAoKSA9PiB7XG5cdFx0bGV0IG9iaiA9IHt9LFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRqID0gMCxcblx0XHRcdGYxID0gZXZ0ID0+IGkrKyxcblx0XHRcdGYyID0gZXZ0ID0+IGorKztcblxuXHRcdG1hZ2ljLm9uY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdGV4cGVjdChqKS50b0JlKDEpO1xuXHR9KTtcblxuXHRpdCgndHJpZ2dlcnMgb25jZSBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdG1rLm9uY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdH0pO1xuXG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRpID0gMCxcblx0XHRcdGYgPSBldnQgPT4gaSsrO1xuXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRleHBlY3QoaSkudG9CZSgxKTtcblx0XHRcdGRvbmUoKTtcblx0XHR9LCAyMDApO1xuXG5cdFx0bWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblx0fSk7XG5cblx0aXQoJ2FsbG93cyB0byBwYXNzIG5hbWUtaGFuZGxlciBvYmplY3QgdG8gXCJvbkRlYm91bmNlXCInLCAoZG9uZSkgPT4ge1xuXHRcdGxldCBvYmogPSB7fSxcblx0XHRcdGkgPSAwLFxuXHRcdFx0aiA9IDAsXG5cdFx0XHRmMSA9IGV2dCA9PiBpKyssXG5cdFx0XHRmMiA9IGV2dCA9PiBqKys7XG5cblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdGV4cGVjdChpKS50b0JlKDEpO1xuXHRcdFx0ZXhwZWN0KGopLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgMjAwKTtcblxuXHRcdG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG5cdFx0XHRmb286IGYxLFxuXHRcdFx0YmFyOiBmMlxuXHRcdH0pO1xuXG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cblx0XHRtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXHRcdG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cdFx0bWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcblx0fSk7XG5cblx0aXQoJ29uRGVib3VuY2Ugd29ya3Mgb24gTWF0cmVzaGthIGluc3RhbmNlJywgZG9uZSA9PiB7XG5cdFx0bGV0IG1rID0gbmV3IE1LLFxuXHRcdFx0aSA9IDAsXG5cdFx0XHRmID0gZXZ0ID0+IGkrKztcblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0ZXhwZWN0KGkpLnRvQmUoMSk7XG5cdFx0XHRkb25lKCk7XG5cdFx0fSwgODAwKTtcblxuXHRcdG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHRcdG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXHR9KTtcblxuXG5cdGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMCxcblx0XHRcdGhhbmRsZXJzID0ge1xuXHRcdFx0XHRmb286ICgpID0+IGkrKyxcblx0XHRcdFx0YmFyOiAoKSA9PiBpKytcblx0XHRcdH07XG5cblx0XHRNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuXHRcdE1LLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cdFx0TUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuXHRcdGV4cGVjdChpKS50b0JlKDIpO1xuXG5cdFx0TUsub2ZmKG9iaiwgaGFuZGxlcnMpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG5cblx0aXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcblx0XHRsZXQgb2JqID0ge30sXG5cdFx0XHR0aGlzQXJnID0ge30sXG5cdFx0XHRib29sID0gZmFsc2UsXG5cdFx0XHRpID0gMDtcblxuXHRcdE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG5cdFx0XHRpKys7XG5cdFx0fSwgdHJ1ZSwgdGhpc0FyZyk7XG5cblx0XHRNSy5vbihvYmosICdiYXInLCBmdW5jdGlvbigpIHtcblx0XHRcdGV4cGVjdCh0aGlzKS50b0VxdWFsKHRoaXNBcmcpO1xuXHRcdFx0aSsrO1xuXHRcdH0sIHRoaXNBcmcsIHRydWUpO1xuXG5cdFx0ZXhwZWN0KGkpLnRvQmUoMik7XG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1wiOiAzNCxcblx0XCIuL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1wiOiAzNixcblx0XCIuL19iaW5kaW5ncy9nZXRub2Rlcy5qc1wiOiAxMixcblx0XCIuL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXCI6IDM1LFxuXHRcIi4vX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcuanNcIjogNzAsXG5cdFwiLi9fYmluZGluZ3MvcnVubm9kZWhhbmRsZXIuanNcIjogMzcsXG5cdFwiLi9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qc1wiOiAzOCxcblx0XCIuL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1wiOiAxMyxcblx0XCIuL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nLmpzXCI6IDMwLFxuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiA2LFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiA1LFxuXHRcIi4vX2NvcmUvaW5pdC5qc1wiOiA0LFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiAxNSxcblx0XCIuL19kb20vaW5kZXguanNcIjogMTQsXG5cdFwiLi9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXCI6IDM5LFxuXHRcIi4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDQxLFxuXHRcIi4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1wiOiAzMixcblx0XCIuL19ldmVudHMvdHJpZ2dlcm9uZS5qc1wiOiA4LFxuXHRcIi4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcIjogMzMsXG5cdFwiLi9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcIjogOSxcblx0XCIuL191dGlsL2RlYm91bmNlLmpzXCI6IDQwLFxuXHRcIi4vX3V0aWwvaXMuanNcIjogMTEsXG5cdFwiLi9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1wiOiAxMCxcblx0XCIuL2FycmF5LmpzXCI6IDYzLFxuXHRcIi4vYmluZGVycy5qc1wiOiA2NCxcblx0XCIuL2JpbmRub2RlLmpzXCI6IDMsXG5cdFwiLi9icXVlcnkvX2RhdGEuanNcIjogMjQsXG5cdFwiLi9icXVlcnkvX2h0bWwybm9kZWxpc3QuanNcIjogMTgsXG5cdFwiLi9icXVlcnkvX2luaXQuanNcIjogMTcsXG5cdFwiLi9icXVlcnkvYWRkLmpzXCI6IDI3LFxuXHRcIi4vYnF1ZXJ5L2NyZWF0ZS5qc1wiOiAyMixcblx0XCIuL2JxdWVyeS9maW5kLmpzXCI6IDI5LFxuXHRcIi4vYnF1ZXJ5L2luZGV4LmpzXCI6IDE2LFxuXHRcIi4vYnF1ZXJ5L2lzLmpzXCI6IDI1LFxuXHRcIi4vYnF1ZXJ5L25vdC5qc1wiOiAyOCxcblx0XCIuL2JxdWVyeS9vZmYuanNcIjogMjYsXG5cdFwiLi9icXVlcnkvb24uanNcIjogMjMsXG5cdFwiLi9icXVlcnkvb25lLmpzXCI6IDIxLFxuXHRcIi4vYnF1ZXJ5L3BhcnNlaHRtbC5qc1wiOiAyMCxcblx0XCIuL2NsYXNzLmpzXCI6IDU1LFxuXHRcIi4vZXh0ZW5kLmpzXCI6IDE5LFxuXHRcIi4vaW5kZXguanNcIjogNjUsXG5cdFwiLi9tYWdpYy5qc1wiOiA2OCxcblx0XCIuL21hdHJlc2hrYS9pbmRleC5qc1wiOiA2Nixcblx0XCIuL29iamVjdC9pbmRleC5qc1wiOiA2Nyxcblx0XCIuL29uLmpzXCI6IDY5LFxuXHRcIi4vc2V0LmpzXCI6IDcsXG5cdFwiLi91bmJpbmRub2RlLmpzXCI6IDMxXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDYyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYyAuKlxcLmpzJFxuICoqIG1vZHVsZSBpZCA9IDYyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYXJyYXkuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy5qc1xuICoqLyIsImltcG9ydCBNYXRyZXNoa2EgZnJvbSAnLi9tYXRyZXNoa2EnO1xuaW1wb3J0IE1hdHJlc2hrYUFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IE1hdHJlc2hrYU9iamVjdCBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9jbGFzcyc7XG5pbXBvcnQgYmluZGVycyBmcm9tICcuL2JpbmRlcnMnO1xuXG5NYXRyZXNoa2EuQXJyYXkgPSBNYXRyZXNoa2FBcnJheTtcbk1hdHJlc2hrYS5PYmplY3QgPSBNYXRyZXNoa2FPYmplY3Q7XG5NYXRyZXNoa2EuQ2xhc3MgPSBDbGFzcztcbk1hdHJlc2hrYS5iaW5kZXJzID0gYmluZGVycztcblxuZXhwb3J0IGRlZmF1bHQgTWF0cmVzaGthO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi4vY2xhc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBDbGFzcyh7XG5cdC8vIGluc3RhbmNlIHByb3BlcmllcyBhbmQgbWV0aG9kc1xuXG59LCB7XG5cdC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG5cdGV4dGVuZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYXRyZXNoa2EvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2JqZWN0L2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hZ2ljLmpzXG4gKiovIiwiXG4vLyAvXigoW15AXSspQCk/KCguKz8pKDo6KFteXFwoXFwpXSspPyhcXCgoLiopXFwpKT8pPyk/JC9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24oKSB7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uLmpzXG4gKiovIiwiaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4uL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vX2V2ZW50cy90cmlnZ2Vyb25lJztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIHRoZSBmdW5jdGlvbiByZW1vdmVzIHNpbmdsZSBiaW5kaW5nIGZvciBzaW5nbGUgb2JqZWN0XG4vLyBjYWxsZWQgYnkgdW5iaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldnQgfSwge1xuXHRvcHRpb25zLFxuXHRiaW5kZXIsXG5cdG5vZGUsXG5cdG5vZGVIYW5kbGVyLFxuXHRvYmplY3RIYW5kbGVyXG59KSB7XG5cdGNvbnN0IHsgZGVzdHJveSwgb24gfSA9IGJpbmRlcjtcblx0Y29uc3QgeyBzaWxlbnQgfSA9IGV2dDtcblxuXHQvLyBpZiBcIm9uXCIgaXMgZnVuY3Rpb24gZGlzYWJsZSBpdFxuXHQvLyB3ZSBjYW5ub3QgdHVybiBvZmYgY3VzdG9tIGxpc3RlbmVyIGRlZmluZWQgYnkgYSBwcm9ncmFtbWVyXG5cdC8vIHByb2dyYW1tZXIgbmVlZHMgdG8gcmVtb3ZlIGN1c3RvbSBsaXN0ZW5lciBtYXVhbGx5IHZpYSBiaW5kZXIuZGVzdHJveVxuXHRpZih0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWU7XG5cdH0gZWxzZSBpZih0eXBlb2Ygb24gPT09ICdzdHJpbmcnKXtcblx0XHQvLyByZW1vdmUgRE9NIGV2ZW50IGxpc3RlbmVyXG5cdFx0Ly8gcmVtb3ZlRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG5cdFx0bm9mbi5mb3JFYWNoKG9uLnNwbGl0KHNwYWNlUmVnKSxcblx0XHRcdGV2dE5hbWUgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG5cdH1cblxuXHQvLyByZW1vdmUgb2JqZWN0IGV2ZW50IGxpc3RlbmVyXG5cdHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cblx0Ly8gaWYgYmluZGVyLmRlc3Ryb3kgaXMgZ2l2ZW4gY2FsbCBpdFxuXHRpZihkZXN0cm95KSB7XG5cdFx0ZGVzdHJveS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuXHR9XG5cblx0Ly8gZmlyZSBldmVudHNcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfSwgZXZ0KTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHVuYmluZDoke2tleX1gLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAndW5iaW5kJywgZXh0ZW5kZWRFdnQpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9yZW1vdmViaW5kaW5nLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==