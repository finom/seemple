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
	
	var componentsContext = __webpack_require__(63);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 2,
		"./bquery/add_spec.js": 45,
		"./bquery/create_spec.js": 46,
		"./bquery/events_spec.js": 47,
		"./bquery/find_spec.js": 49,
		"./bquery/init_spec.js": 50,
		"./bquery/is_spec.js": 51,
		"./bquery/not_spec.js": 52,
		"./bquery/one_spec.js": 53,
		"./bquery/parsehtml_spec.js": 54,
		"./class_spec.js": 55,
		"./events/delegated_collection_spec.js": 57,
		"./events/delegated_spec.js": 58,
		"./events/events_change_spec.js": 59,
		"./events/events_core_spec.js": 60,
		"./events/events_dom_spec.js": 61,
		"./events/events_summary_spec.js": 62
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
	
	var addListener = __webpack_require__(40);
	
	var makeObject = __webpack_require__(43);
	
	var createSpy = __webpack_require__(44);
	
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
	
	        magic.bindNode(obj, 'sandbox', '<div>\n                <div>\n                    <span></span>\n                </div>\n            </div>\n        ');
	
	        expect('SPAN').toEqual(magic.select(obj, 'span').tagName);
	        expect('SPAN').toEqual(magic.selectAll(obj, 'span')[0].tagName);
	    });
	
	    xit('selects nodes with custom selector', function () {
	        var obj = {};
	
	        magic.bindNode(obj, 'sandbox', '<div>\n                <div>\n                    <span></span>\n                </div>\n            </div>\n        ');
	
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
	}); /* eslint-disable */

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(4);
	
	var defineProp = __webpack_require__(6);
	
	var getNodes = __webpack_require__(12);
	
	var switchBinding = __webpack_require__(30);
	
	var bindSingleNode = __webpack_require__(35);
	
	var checkObjectType = __webpack_require__(9);
	
	var MatreshkaError = __webpack_require__(10);
	
	var delegateListener = __webpack_require__(42);
	
	var addListener = __webpack_require__(40);
	
	var removeListener = __webpack_require__(33);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var matreshkaError = __webpack_require__(10);
	
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
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	// eslint-disable no-self-compare no-confusing-arrow
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
	
	var htmlReg = /</;
	var customSelectorReg = /:sandbox|:bound\(([^(]*)\)/;
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
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	// eslint-disable
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
/* 18 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(24);
	
	var is = __webpack_require__(25);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(17);
	
	var data = __webpack_require__(24);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(9);
	
	var initMK = __webpack_require__(4);
	
	var getNodes = __webpack_require__(12);
	
	var bindNode = __webpack_require__(3);
	
	var undelegateListener = __webpack_require__(32);
	
	var removeBinding = __webpack_require__(34);
	
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
	
	var removeListener = __webpack_require__(33);
	
	module.exports = undelegateListener;
	function undelegateListener(object, path, name, callback, context) {
	    var info = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];
	
	    var def = defs.get(object);
	
	    // if no definition do nothing
	    if (!def) {
	        return;
	    }
	
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

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var triggerOne = __webpack_require__(8);
	
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var removeListener = __webpack_require__(33);
	
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

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(36);
	
	var runNodeHandler = __webpack_require__(38);
	
	var runObjectHandler = __webpack_require__(39);
	
	var triggerOne = __webpack_require__(8);
	
	var addListener = __webpack_require__(40);
	
	var debounce = __webpack_require__(41);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(37);
	
	module.exports = function (node) {
	    var result = void 0;
	
	    for (var i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = [function (node) {
	    var tagName = node.tagName;
	    var binders = undefined; // TODO
	    var b = void 0;
	
	    // TODO Switch/case
	    if (tagName === 'INPUT') {
	        b = binders.input(node.type);
	    } else if (tagName === 'TEXTAREA') {
	        b = binders.textarea();
	    } else if (tagName === 'SELECT') {
	        b = binders.select(node.multiple);
	    } else if (tagName === 'PROGRESS') {
	        b = binders.progress();
	    } else if (tagName === 'OUTPUT') {
	        b = binders.output();
	    }
	
	    return b;
	}];

/***/ },
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(4);
	
	var triggerOne = __webpack_require__(8);
	
	var defineProp = __webpack_require__(6);
	
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
/* 41 */
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(40);
	
	var undelegateListener = __webpack_require__(32);
	
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
/* 43 */
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
/* 44 */
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 46 */
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
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-unresolved */
	
	
	var $ = __webpack_require__(16);
	
	var simulateClick = __webpack_require__(48);
	
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
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 51 */
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
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(16);
	
	describe('bQuery.one', function () {
	    it('finds', function () {
	        var testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n        <div class="child">\n            <div class="grandchild"></div>\n        </div>\n        <div class="child2">\n            <div class="grandchild2"></div>\n        </div>\n        ';
	
	        var child = testSandbox.querySelector('.child');
	
	        expect($.one('*', testSandbox)).toEqual(child);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 54 */
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
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(56);
	
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
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(42);
	
	var undelegateListener = __webpack_require__(32);
	
	var triggerOne = __webpack_require__(8);
	
	var makeObject = __webpack_require__(43);
	
	var createSpy = __webpack_require__(44);
	
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(40);
	
	var delegateListener = __webpack_require__(42);
	
	var undelegateListener = __webpack_require__(32);
	
	var removeListener = __webpack_require__(33);
	
	var makeObject = __webpack_require__(43);
	
	var createSpy = __webpack_require__(44);
	
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(40);
	
	var removeListener = __webpack_require__(33);
	
	var triggerOne = __webpack_require__(8);
	
	var createSpy = __webpack_require__(44);
	
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
/* 61 */
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
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 35,
		"./_bindings/defaultbinders.js": 37,
		"./_bindings/getnodes.js": 12,
		"./_bindings/lookforbinder.js": 36,
		"./_bindings/removebinding.js": 34,
		"./_bindings/runnodehandler.js": 38,
		"./_bindings/runobjecthandler.js": 39,
		"./_bindings/selectnodes.js": 13,
		"./_bindings/switchbinding.js": 30,
		"./_core/defineprop.js": 6,
		"./_core/defs.js": 5,
		"./_core/init.js": 4,
		"./_dom/default-dollar.js": 15,
		"./_dom/index.js": 14,
		"./_events/addlistener.js": 40,
		"./_events/delegatelistener.js": 42,
		"./_events/removelistener.js": 33,
		"./_events/triggerone.js": 8,
		"./_events/undelegatelistener.js": 32,
		"./_util/checkobjecttype.js": 9,
		"./_util/debounce.js": 41,
		"./_util/is.js": 11,
		"./_util/matreshkaerror.js": 10,
		"./array.js": 64,
		"./binders.js": 65,
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
		"./class.js": 56,
		"./extend.js": 19,
		"./index.js": 66,
		"./magic.js": 69,
		"./matreshka/index.js": 67,
		"./object/index.js": 68,
		"./on.js": 70,
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
	webpackContext.id = 63;


/***/ },
/* 64 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 65 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(67);
	
	var MatreshkaArray = __webpack_require__(64);
	
	var MatreshkaObject = __webpack_require__(68);
	
	var Class = __webpack_require__(56);
	
	var binders = __webpack_require__(65);
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(19);
	
	var Class = __webpack_require__(56);
	
	module.exports = Class({
	    // instance properies and methods
	
	}, {
	    // static properties and methods
	    extend: extend
	});

/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 70 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTdjMGMxYjMxZTM2ZTk1ZTBkYzUiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3Mvc3dpdGNoYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9yZW1vdmViaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3J1bm9iamVjdGhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvbWFrZW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9jcmVhdGVzcHkuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjIC4qXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdHJlc2hrYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWdpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTtBQUNBLEtBQU0sMkJBQTJCLEVBQWpDOztBQUVBO0FBQ0E7QUFDQSxLQUFNLGVBQWUsc0JBQXJCOztBQUVBLFVBQVMsVUFBVCxDQUFvQixJQUFwQixFQUEwQjtBQUN6QixTQUFPLHlCQUF5QixPQUF6QixDQUFpQyxJQUFqQyxLQUEwQyxDQUFqRDtBQUNBOztBQUVELEtBQUksV0FBVyxhQUFhLElBQWIsR0FBb0IsTUFBcEIsQ0FBMkIsVUFBM0IsQ0FBZjs7QUFFQTtBQUNBLEtBQUksQ0FBQyxTQUFTLE1BQWQsRUFBc0I7QUFDckIsYUFBVyxhQUFhLElBQWIsRUFBWDtBQUNBOztBQUVELFVBQVMsT0FBVCxDQUFpQixZQUFqQjs7QUFHQSxLQUFNLG9CQUFvQix1QkFBMUI7QUFDQSxtQkFBa0IsSUFBbEIsR0FBeUIsT0FBekIsQ0FBaUMsaUJBQWpDLEU7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLHVEQUF1RDtBQUN4RjtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBaUMsdURBQXVEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7a0JDN0RlLEM7Ozs7Ozs7O2tCQ0FBLEM7Ozs7Ozs7O3FDQ0FPLEU7OzBDQUNLLEU7OzJDQUNDLEU7O2lDQUNWLEU7O21DQUNFLEU7O0FBRXBCLFdBQVUsS0FBVixHQUFrQixjQUFsQjtBQUNBLFdBQVUsTUFBVixHQUFtQixlQUFuQjtBQUNBLFdBQVUsS0FBVixHQUFrQixLQUFsQjtBQUNBLFdBQVUsT0FBVixHQUFvQixPQUFwQjs7a0JBRWUsUzs7Ozs7Ozs7a0NDWEksRTs7aUNBQ0QsRTs7a0JBRUgsTUFBTTtBQUNqQjs7QUFEaUIsRUFBTixFQUdaO0FBQ0M7QUFDQTtBQUZELEVBSFksQzs7Ozs7Ozs7a0JDSEEsQzs7Ozs7Ozs7a0JDQUEsQzs7Ozs7Ozs7QUNDZjs7a0JBRXdCLEU7QUFBVCxVQUFTLEVBQVQsR0FBYyxDQUU1QixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMTdjMGMxYjMxZTM2ZTk1ZTBkYzVcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogMixcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiA0NSxcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiA0Nixcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiA0Nyxcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogNDksXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDUwLFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogNTEsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogNTIsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogNTMsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogNTQsXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDU1LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogNTcsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogNTgsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDU5LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogNjAsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDYxLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogNjJcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJ3NyYy9iaW5kbm9kZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICdzcmMvdW5iaW5kbm9kZSc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuICAgIGxldCBvYmo7XG4gICAgbGV0IG5vZGU7XG4gICAgbGV0IG5vZGUyO1xuICAgIGxldCBiaW5kZXI7XG4gICAgbGV0IHNpbXVsYXRlRG9tRXZlbnQ7XG4gICAgbGV0IGluaXRpYWxpemVDYWxsO1xuICAgIGxldCBkZXN0cm95Q2FsbDtcbiAgICBjb25zdCBub0RlYm91bmNlRmxhZyA9IHsgZGVib3VuY2U6IGZhbHNlIH07XG5cbiAgICBjb25zdCB0ZXN0U2ltcGxlQmluZCA9IChrZXkgPSAneCcpID0+IHtcbiAgICAgICAgb2JqW2tleV0gPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmpba2V5XSkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgIGV4cGVjdChpbml0aWFsaXplQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH07XG5cbiAgICBjb25zdCB0ZXN0U2ltcGxlVW5iaW5kID0gKCkgPT4ge1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmF6JztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9iai54KS50b0VxdWFsKCdmb28nKTtcbiAgICAgICAgZXhwZWN0KGRlc3Ryb3lDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgbm9kZTIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgaW5pdGlhbGl6ZUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgZGVzdHJveUNhbGwgPSBjcmVhdGVTcHkoKTtcblxuICAgICAgICBiaW5kZXIgPSAge1xuICAgICAgICAgICAgb24oY2JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmR1bW15ZXZlbnQgPSBjYmM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUodikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemUobykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplQ2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLm9uZHVtbXlldmVudCA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICAgIGRlc3Ryb3lDYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRlYm91bmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIpO1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZCcsIGJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZDp4JywgYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChiaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdW5iaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBjb25zdCB1bmJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3VuYmluZCcsIHVuYmluZENhbGwpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQ6eCcsIHVuYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcgbm9kZSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgd3JvbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jywgd3JvbmdOb2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcga2V5IGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneScsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgd2hlbiBub2RlIGlzIG5vdCBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYWxsIHdoZW4gbmVpdGhlciBrZXkgbm9yIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmopO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBrZXktbm9kZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0sIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCB1c2luZyBhcnJheSBvZiBvYmplY3RzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlIH1dKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChvYmoubm9kZXMueCkudG9FcXVhbChub2RlKTtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShvYmouJG5vZGVzLngpXG4gICAgICAgICkudG9FcXVhbChbbm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYSBwcm9wZXJ0eSBpbiBjb250ZXh0IG9iamVjdCB3aGljaCBoYXMgaXNNSz10cnVlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBiaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KG9iai4kbm9kZXMueCkudG9CZVVuZGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueC55LnogPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW5jZWxzIGRlZXAgYmluZGluZyB3aGVuIGRlZXA9ZmFsc2Ugb3B0aW9uIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgZGVlcDogZmFsc2VcbiAgICAgICAgfSwgbm9EZWJvdW5jZUZsYWcpKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoJ3gueS56Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnkueicsICdnbycpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueCA9IG1ha2VPYmplY3QoJ3kueicsICdmb28nKTtcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgYmluZGluZyBpZiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBjb25zdCB4ID0gb2JqLng7XG5cbiAgICAgICAgb2JqLnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG5cbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3QoeC55LnopLm5vdC50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgd2luZG93LnRhcmdldCA9IG9iai54Lnk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICB4LnkueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cblxuICAgIHhpdCgndXNlcyBjdXN0b20gc2VsZWN0b3JzIG9uIGN1cnJlbnQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gTUsudG8oe3g6IHt5OiAnZm9vJ319KSxcbiAgICAgICAgICAgICBkaXYgPSAkLmNyZWF0ZSgnZGl2JyksXG4gICAgICAgICAgICBpbnB1dCA9IGRpdi5hcHBlbmRDaGlsZCgkLmNyZWF0ZSgnaW5wdXQnKSk7XG5cbiAgICAgICAgb2JqLmJpbmROb2RlKCdzYW5kYm94JywgZGl2KTtcbiAgICAgICAgb2JqLmJpbmROb2RlKCd4LnknLCAnOnNhbmRib3ggaW5wdXQnLCB7XG4gICAgICAgICAgICBvbihjYmMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbmtleXVwID0gY2JjO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBleHBlY3QoaW5wdXQudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBpbnB1dC52YWx1ZSA9ICdiYXInO1xuICAgICAgICBpbnB1dC5fb25rZXl1cCh7fSk7XG4gICAgICAgIGV4cGVjdChvYmoueC55KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuXG4gICAgaXQoYHRocm93cyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmVgLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kTm9kZShvYmosICd4Jyk7XG4gICAgICAgIH0pLnRvVGhyb3coKTtcbiAgICB9KTtcblxuXG4gICAgaXQoYGRvZXNuJ3QgdGhyb3cgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlIGFuZCBvcHRpb25hbD10cnVlIGlzIGdpdmVuYCwgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7IG9wdGlvbmFsOiB0cnVlIH0pO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdkb2VzblxcJ3QgdGhyb3cgZXJyb3Igd2l0aCBiaW5kT3B0aW9uYWxOb2RlIG1ldGhvZCBvZiBNYXRyZXNoa2Egd2hlbiBub2RlIGlzIG1pc3NpbmcnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSztcblxuICAgICAgICBtay5iaW5kT3B0aW9uYWxOb2RlKCd4JywgbnVsbCk7XG5cbiAgICAgICAgZXhwZWN0KHRydWUpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3JldHVybnMgYm91bmQgbm9kZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGlucHV0ID0gYmluZElucHV0KG9iaiwgJ3gnKTtcblxuXG4gICAgICAgIGV4cGVjdChpbnB1dCkudG9FcXVhbChtYWdpYy5ib3VuZChvYmosICd4JykpO1xuICAgICAgICBleHBlY3QoaW5wdXQpLnRvRXF1YWwobWFnaWMuJGJvdW5kKG9iaiwgJ3gnKVswXSk7XG4gICAgfSk7XG5cblxuICAgIHhpdCgnc2VsZWN0cyBjaGlsZHJlbiBvZiBzYW5kYm94JywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge307XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoJ1NQQU4nKS50b0VxdWFsKG1hZ2ljLnNlbGVjdChvYmosICdzcGFuJykudGFnTmFtZSk7XG4gICAgICAgIGV4cGVjdCgnU1BBTicpLnRvRXF1YWwobWFnaWMuc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS50YWdOYW1lKTtcbiAgICB9KTtcblxuXG4gICAgeGl0KCdzZWxlY3RzIG5vZGVzIHdpdGggY3VzdG9tIHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge307XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAnc2FuZGJveCcsIGA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoJ1NQQU4nKS50b0VxdWFsKG1hZ2ljLnNlbGVjdChvYmosICc6Ym91bmQoc2FuZGJveCkgc3BhbicpLnRhZ05hbWUpO1xuICAgICAgICBleHBlY3QoJ1NQQU4nKS50b0VxdWFsKG1hZ2ljLnNlbGVjdEFsbChvYmosICc6c2FuZGJveCBzcGFuJylbMF0udGFnTmFtZSk7XG4gICAgfSk7XG5cblxuXG4gICAgeGl0KCdhbGxvd3MgdG8gYmluZCBzYW5kYm94IHZpYSBiaW5kU2FuZGJveCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgZGl2ID0gJC5jcmVhdGUoJ2RpdicpO1xuXG4gICAgICAgIE1LLmJpbmRTYW5kYm94KG9iaiwgZGl2KTtcblxuICAgICAgICBleHBlY3QoTUsuYm91bmQob2JqLCAnc2FuZGJveCcpKS50b0VxdWFsKGRpdik7XG4gICAgfSk7XG5cblxuICAgIHhpdCgnYmluZFNhbmRib3ggdGhyb3dzIGFuIGVycm9yIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIE1LLmJpbmRTYW5kYm94KG9iaiwgbnVsbCk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgYm9vbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZVRydXRoeSgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9iaW5kaW5ncy9iaW5kaW5nc19zcGVjLmpzXG4gKiovIiwiaW1wb3J0IGluaXRNSyBmcm9tICcuL19jb3JlL2luaXQnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi9fY29yZS9kZWZpbmVwcm9wJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgc3dpdGNoQmluZGluZyBmcm9tICcuL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nJztcbmltcG9ydCBiaW5kU2luZ2xlTm9kZSBmcm9tICcuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBNYXRyZXNoa2FFcnJvciBmcm9tICcuL191dGlsL21hdHJlc2hrYWVycm9yJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnO1xuXG5cbi8vIFRoZSBtYWluIG1ldGhvZCBvZiB0aGUgZnJhbWV3b3JrOiBiaW5kcyBhIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0byBIVE1MIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IGJpbmRlcjtcbiAgICAgICAgYmluZGVyID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgIGJpbmRlciA9IGJpbmRlciB8fCB7fTtcbiAgICBjb25zdCB7IHByb3BzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCB7IG9wdGlvbmFsLCBkZWVwLCBzaWxlbnQgfSA9IGV2dDtcblxuICAgIC8vIHRocm93IGVycm9yIHdoZW4ga2V5IGlzIG5vdCBnaXZlblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgYmluZGVyLCBldnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVyZ2VkRXZlbnQgPSB7fTtcblxuXG4gICAgICAgICAgICAgICAgaWYoaXRlbUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJsb2NhbFwiIGV2ZW50IChcImV2ZW50XCIga2V5IG9mIGFuIG9iamVjdClcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnQsIGl0ZW1FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY29tbW9uRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIGV2ZW50IG9iamVjdCBieSBcImdsb2JhbFwiIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBjb21tb25FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgaXRlbUJpbmRlciwgbWVyZ2VkRXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogYWNjZXB0IGtleS1ub2RlIG9iamVjdFxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlLCBiaW5kZXIpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCAkbm9kZXMgPSBnZXROb2RlcyhvYmplY3QsIG5vZGUpO1xuXG4gICAgLy8gY2hlY2sgbm9kZSBleGlzdGVuY2VcbiAgICBpZiAoISRub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6bm9kZV9taXNzaW5nJywgeyBrZXksIG5vZGUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVlcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGRlZXBQYXRoTGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGJpbmRpbmcgd2hlbiBrZXkgYXJnIGluY2x1ZGVzIGRvdHMgKGVnIFwiYS5iLmMuZFwiKVxuICAgICAgICAgICAgY29uc3QgY2hhbmdlSGFuZGxlciA9IChjaGFuZ2VFdnQgPSB7fSkgPT4gc3dpdGNoQmluZGluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUV2dCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBkZWVwUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgJG5vZGVzLFxuICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIGV2dCxcbiAgICAgICAgICAgICAgICAgICAgYmluZE5vZGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMiksXG4gICAgICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMl19YCwgY2hhbmdlSGFuZGxlcik7XG5cbiAgICAgICAgICAgIGNoYW5nZUhhbmRsZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICAvLyBpZiBvYmplY3QgaXMgTWF0cmVzaGthIGluc3RhbmNlIHRoZW4gZXh0ZW5kIFwiJG5vZGVzXCIgYW5kIFwibm9kZXNcIiBvYmplY3RzXG4gICAgICAgIGNvbnN0IHsgJG5vZGVzOiAkYWxsTm9kZXMsIG5vZGVzOiBhbGxOb2RlcyB9ID0gb2JqZWN0O1xuXG4gICAgICAgIGlmKCEkYWxsTm9kZXMgfHwgIWFsbE5vZGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJywge1xuICAgICAgICAgICAgICAgICRub2RlczogJGFsbE5vZGVzLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBhbGxOb2Rlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldICYmICRhbGxOb2Rlc1trZXldLmxlbmd0aFxuICAgICAgICAgICAgPyAkYWxsTm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG5cbiAgICAgICAgYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldWzBdO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBiaW5kaW5nIGZvciBldmVyeSBub2RlIHNlcGFyYXRlbHlcbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCAobm9kZSkgPT4gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZSxcbiAgICAgICAga2V5LFxuICAgICAgICBldnQsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgcHJvcERlZlxuICAgIH0pKTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuICAgIGxldCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIGRlZiA9IHtcbiAgICAgICAgICAgIC8vIGEgcHJvcGVydHkgbmFtZSBvZiBcImV2ZW50c1wiIG9iamVjdCBpcyBhbiBldmVudCBuYW1lXG4gICAgICAgICAgICAvLyBhbmQgYSB2YWx1ZSBpcyBhbiBhcnJheSBvZiBldmVudCBoYW5kbGVyc1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGN0eDogb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBvYmplY3QyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4YW1wbGVcIixcblx0XHRcdFx0XHRpbmZvOiB7fVxuICAgICAgICAgICAgICAgIH0gKi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBcInByb3BzXCIgY29udGFpbnMgc3BlY2lhbCBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzIChnZXR0ZXJzLCBzZXR0ZXJzIGV0YylcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV0sXG4gICAgICAgICAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBtZWRpYXRvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ3M6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RIYW5kbGVyLFxuXHRcdFx0XHRcdFx0Li4ub3RoZXIgcmVxdWlyZWQgaW5mb1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkOiBgbWske01hdGgucmFuZG9tKCl9YFxuICAgICAgICB9O1xuXG4gICAgICAgIGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TUsob2JqZWN0KSB7XG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG4gICAgaWYgKCFvYmplY3QgfHwgdHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJHt0eXBlfSBjYW5ub3QgYmUgdXNlZCBpbiB0aGlzIG1ldGhvZGApO1xuICAgIH1cblxuICAgIC8vIGlmIG9iamVjdCBoYXMgX2luaXRNSyBtZXRob2QsIHJ1biBpdFxuICAgIC8vIGVsc2UgcnVuIGNvbW1vbkluaXRcbiAgICAvLyBldmVyeSBfaW5pdE1LIGltcGxlbWVudGF0aW9uIGhhdmUgdG8gcnVuIGNvbW1vbkluaXQgb3IgcGFyZW50J3MgX2luaXRNS1xuICAgIHJldHVybiBvYmplY3QuX2luaXRNSyA/IG9iamVjdC5faW5pdE1LKCkgOiBjb21tb25Jbml0KG9iamVjdCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9pbml0LmpzXG4gKiovIiwiZnVuY3Rpb24gUHNldWRvTWFwKCkge31cblxuLy8gUHNldWRvTWFwIHNpbXVsYXRlcyBXZWFrTWFwIGJlaGF2aW9yIHdpdGggTygxKSBzZWFyY2ggY29tcGxleGl0eVxuLy8gaXQncyBuZWVkZWQgZm9yIEBJRTkgYW5kIEBJRTEwXG5ub2ZuLmFzc2lnbihQc2V1ZG9NYXAucHJvdG90eXBlLCB7XG4gICAgZ2V0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqLm1hdHJlc2hrYURhdGE7XG4gICAgfSxcbiAgICBzZXQob2JqLCBkYXRhKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosICdtYXRyZXNoa2FEYXRhJywge1xuICAgICAgICAgICAgdmFsdWU6IGRhdGEsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBoYXMob2JqKSB7XG4gICAgICAgIHJldHVybiAnbWF0cmVzaGthRGF0YScgaW4gb2JqO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyBuZXcgUHNldWRvTWFwKCkgOiBuZXcgV2Vha01hcCgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvZGVmcy5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbi8vIHRoZSBmdW5jdGlvbiBkZWZpbmVzIG5lZWRlZCBkZXNjcmlwdG9yIGZvciBnaXZlbiBwcm9wZXJ0eSBcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlZmluZVByb3Aob2JqZWN0LCBrZXkpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghZGVmLnByb3BzW2tleV0pIHtcbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wc1trZXldID0ge1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldLFxuICAgICAgICAgICAgZ2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgbWVkaWF0b3I6IG51bGwsXG4gICAgICAgICAgICBiaW5kaW5nczogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BEZWYuZ2V0dGVyID8gcHJvcERlZi5nZXR0ZXIuY2FsbChvYmplY3QpIDogcHJvcERlZi52YWx1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQodikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLnNldHRlciA/IHByb3BEZWYuc2V0dGVyLmNhbGwob2JqZWN0LCB2KSA6IHNldChvYmplY3QsIGtleSwgdiwge1xuICAgICAgICAgICAgICAgICAgICBmcm9tU2V0dGVyOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkZWYucHJvcHNba2V5XTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZmluZXByb3AuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi9fZXZlbnRzL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9fdXRpbC9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBzZXRzIG5ldyB2YWx1ZSBmb3IgYSBwcm9wZXJ0eVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgZXZ0ID0ge30pIHtcbiAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnc2V0Jyk7XG5cbiAgICAvLyBpZiBubyBrZXkgb3IgZmFsc3kga2V5IGlzIGdpdmVuXG4gICAgaWYgKCFrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gb2JqZWN0IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG4gICAgaWYgKCFkZWYpIHtcbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHByb3BzLCBldmVudHMgfSA9IGRlZjtcbiAgICBjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuICAgIC8vIGFsbG93IHRvIHVzZSBrZXktdmFsdWUgb2JqZWN0IGFzIGFub3RoZXIgdmFyaWF0aW9uXG4gICAgaWYgKHR5cGVvZiBrZXkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAob2JqVmFsLCBvYmpLZXkpID0+IHNldChvYmplY3QsIG9iaktleSwgb2JqVmFsLCB2YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8vIGlmIG5vIHByb3BlcnR5IGRlZmluaXRpb24gdGhlbiBtYWtlIHNpbXBsZSBhc3NpZ25tZW50XG4gICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyB2YWx1ZTogcHJldmlvdXNWYWx1ZSwgbWVkaWF0b3IgfSA9IHByb3BEZWY7XG5cbiAgICAvLyBwb3NzaWJsZSBmbGFnc1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2tpcE1lZGlhdG9yLFxuICAgICAgICBmcm9tTWVkaWF0b3IsXG4gICAgICAgIGZvcmNlLFxuICAgICAgICBmb3JjZUhUTUwsXG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgc2lsZW50SFRNTCxcbiAgICAgICAgc2tpcExpbmtzXG4gICAgfSA9IGV2dDtcblxuICAgIGxldCBuZXdWYWx1ZTtcblxuICAgIGlmIChtZWRpYXRvciAmJiAhaXModmFsdWUsIHByZXZpb3VzVmFsdWUpICYmICFza2lwTWVkaWF0b3IgJiYgIWZyb21NZWRpYXRvcikge1xuICAgICAgICAvLyBUT0RPXG4gICAgICAgIG5ld1ZhbHVlID0gc3BlY2lhbC5tZWRpYXRvcih2LCBwcmV2VmFsLCBrZXksIG9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NoYW5nZWQgPSAhaXMobmV3VmFsdWUsIHByZXZpb3VzVmFsdWUpO1xuXG4gICAgLy8gYWRkIHRvIGV2dCBvYmplY3Qgc29tZSB1c2VmdWwgcHJvcGVydGllc1xuICAgIGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICB2YWx1ZTogbmV3VmFsdWUsXG4gICAgICAgIHNlbGY6IG9iamVjdCxcbiAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAga2V5LFxuICAgICAgICBpc0NoYW5nZWRcbiAgICB9LCBldnQpO1xuXG4gICAgY29uc3QgdHJpZ2dlckNoYW5nZSA9IChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFzaWxlbnQ7XG5cbiAgICAvLyB0cmlnZ2VyIGJlZm9yZWNoYW5nZTpLRVkgYW5kIGJlZm9yZWNoYW5nZSBldmVudHNcbiAgICBpZiAodHJpZ2dlckNoYW5nZSkge1xuICAgICAgICBjb25zdCBiZWZvcmVjaGFuZ2VTdHIgPSAnYmVmb3JlY2hhbmdlJztcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlRXZ0TmFtZSA9IGAke2JlZm9yZWNoYW5nZVN0cn06JHtrZXl9YDtcblxuICAgICAgICBpZihldmVudHNbYmVmb3JlY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihldmVudHNbYmVmb3JlY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGJlZm9yZWNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvcERlZi52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgLy8gdHJpZ2VyIGJpbmRpbmdzXG4gICAgaWYgKCFzaWxlbnRIVE1MICYmIChpc0NoYW5nZWQgfHwgZm9yY2UgfHwgZm9yY2VIVE1MKSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUgPSBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlQmluZGluZ3NFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUJpbmRpbmdzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBjaGFuZ2U6S0VZIGFuZCBjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlU3RyID0gJ2NoYW5nZSc7XG4gICAgICAgIGNvbnN0IGNoYW5nZUV2dE5hbWUgPSBgJHtjaGFuZ2VTdHJ9OiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZUV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VTdHJdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlU3RyLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIGRlcGVuZGVuY2llcyAobWFkZSB3aXRoIGxpbmtQcm9wcylcbiAgICBpZiAoKGlzQ2hhbmdlZCB8fCBmb3JjZSkgJiYgIXNraXBMaW5rcykge1xuICAgICAgICBjb25zdCBjaGFuZ2VEZXBzRXZ0TmFtZSA9IGBfY2hhbmdlOmRlcHM6JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZURlcHNFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlcHNFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIGRlbGVnYXRlZCBldmVudHMgbG9naWNcbiAgICBpZihpc0NoYW5nZWQpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuICAgICAgICBpZiAoZXZlbnRzW2NoYW5nZURlbGVnYXRlZEV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NldC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmlnZ2VyT25lKG9iamVjdCwgbmFtZSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICBpZiAoIWRlZikgcmV0dXJuO1xuXG4gICAgY29uc3QgZXZlbnRzID0gZGVmLmV2ZW50c1tuYW1lXTtcblxuICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IG5vZm4uc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgY29uc3QgbCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IFthMSwgYTJdID0gYXJncztcblxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBldjtcblxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBsKSB7XG4gICAgICAgICAgICAgICAgICAgICh0cmlnZ2VyT25lLmxhdGVzdEV2ZW50ID0gZXYgPSBldmVudHNbaSsrXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSwgYTIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IHtcbiAgICBpbmZvOiB7fSxcbiAgICBuYW1lOiBudWxsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy90cmlnZ2Vyb25lLmpzXG4gKiovIiwiaW1wb3J0IG1hdHJlc2hrYUVycm9yIGZyb20gJy4vbWF0cmVzaGthZXJyb3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvYmplY3QsIG1ldGhvZCkge1xuICAgIGNvbnN0IHR5cGVvZk9iamVjdCA9IG9iamVjdCA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBvYmplY3Q7XG5cbiAgICBpZiAodHlwZW9mT2JqZWN0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBtYXRyZXNoa2FFcnJvcignY29tbW9uOm9iamVjdF90eXBlJywge1xuICAgICAgICAgICAgdHlwZTogdHlwZW9mT2JqZWN0LFxuICAgICAgICAgICAgbWV0aG9kXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1xuICoqLyIsImNvbnN0IGJpbmRpbmdFcnJvclByZWZpeCA9ICdCaW5kaW5nIGVycm9yOic7XG5cbmNvbnN0IGVycm9ycyA9IHtcbiAgICAnYmluZGluZzpub2RlX21pc3NpbmcnOiAoeyBrZXksIG5vZGUgfSkgPT4ge1xuICAgICAgICBjb25zdCBzZWxlY3RvckluZm8gPSB0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycgPyBgIFRoZSBzZWxlY3RvciBpcyAke25vZGV9YCA6ICcnO1xuICAgICAgICByZXR1cm4gYCR7YmluZGluZ0Vycm9yUHJlZml4fSBub2RlIGlzIG1pc3NpbmcgZm9yICR7a2V5fS4ke3NlbGVjdG9ySW5mb31gO1xuICAgIH0sXG4gICAgJ2JpbmRpbmc6ZmFsc3lfa2V5JzogKCkgPT4gJ0JpbmRpbmcgZXJyb3I6IFwia2V5XCIgYXJnIGNhbm5vdCBiZSBmYWxzeScsXG4gICAgJ2JpbmRpbmc6aW5zdGFuY2Vfbm9kZXNfbWlzc2luZyc6ICh7ICRub2RlcyB9KSA9PiB7XG4gICAgICAgIGNvbnN0IG1pc3NpbmcgPSAhJG5vZGVzID8gJyRub2RlcycgOiAnbm9kZXMnO1xuICAgICAgICByZXR1cm4gYCR7YmluZGluZ0Vycm9yUHJlZml4fSBcIiR7bWlzc2luZ31cIiBwcm9wZXJ0eSBvZiBNYXRyZXNoa2EgaW5zdGFuY2UgaXMgbWlzc2luZy4gYFxuICAgICAgICAgICAgKyAnSXQgbXVzdCBiZSBhbiBvYmplY3QgYW5kIG11c3Qgbm90IGJlIHJlYXNzaWduZWQuJztcbiAgICB9LFxuICAgICdjb21tb246b2JqZWN0X3R5cGUnOiAoeyB0eXBlLCBtZXRob2QgfSkgPT5cbiAgICAgICAgYE1ldGhvZCBcIiR7bWV0aG9kfVwiIGRvZXMgbm90IGFjY2VwdCAke3R5cGV9IGFzIHRhcmdldCBvYmplY3RgXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYXRyZXNoa2FFcnJvcihrZXksIGRhdGEpIHtcbiAgICBjb25zdCBnZXRFcnJvciA9IGVycm9yc1trZXldO1xuICAgIGlmKCFnZXRFcnJvcikge1xuICAgICAgICB0aHJvdyBFcnJvcihgVW5rbm93biBlcnJvciBcIiR7a2V5fVwiYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBFcnJvcihlcnJvcnNba2V5XShkYXRhKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1xuICoqLyIsIi8vIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSBuby1jb25mdXNpbmctYXJyb3dcbi8vIGRldGVybWluZXMgd2hldGhlciB0d28gdmFsdWVzIGFyZSB0aGUgc2FtZSB2YWx1ZVxuY29uc3QgaXNQb2x5ZmlsbCA9ICh2MSwgdjIpID0+XG4gICAgdjEgPT09IDAgJiYgdjIgPT09IDAgPyAxIC8gdjEgPT09IDEgLyB2MiA6IHYxICE9PSB2MSAmJiB2MiAhPT0gdjIgfHwgdjEgPT09IHYyO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuaXMgfHwgaXNQb2x5ZmlsbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2lzLmpzXG4gKiovIiwiaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vc2VsZWN0bm9kZXMnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJ1xuXG5jb25zdCBodG1sUmVnID0gLzwvO1xuY29uc3QgY3VzdG9tU2VsZWN0b3JSZWcgPSAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS87XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlcyhvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgbGV0IG5vZGVzO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyAmJiAhaHRtbFJlZy50ZXN0KHNlbGVjdG9yKSAmJiBjdXN0b21TZWxlY3RvclJlZy50ZXN0KHNlbGVjdG9yKSkge1xuICAgICAgICBub2RlcyA9IHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzID0gZG9tLiQoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHJldHVybiBub2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qc1xuICoqLyIsIi8vIGVzbGludC1kaXNhYmxlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9ycykge1xuXG4gICAgdmFyIG9iamVjdERhdGEgPSBtYXAuZ2V0KG9iamVjdCksXG4gICAgICAgICQgPSBjb3JlLiQsXG4gICAgICAgIHJlc3VsdCA9ICQoKSxcbiAgICAgICAgZXhlY1Jlc3VsdCxcbiAgICAgICAgJGJvdW5kLFxuICAgICAgICBub2RlLFxuICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgaSwgaixcbiAgICAgICAgcmFuZG9tLFxuICAgICAgICBzdWJTZWxlY3RvcixcbiAgICAgICAga2V5LFxuICAgICAgICBzZWxlY3RlZDtcblxuICAgIGlmICghb2JqZWN0IHx8IHR5cGVvZiBvYmplY3QgIT0gJ29iamVjdCcgfHwgIW9iamVjdERhdGEpIHJldHVybiByZXN1bHQ7XG5cbiAgICAvLyByZXBsYWNpbmcgOnNhbmRib3ggdG8gOmJvdW5kKHNhbmRib3gpXG4gICAgc2VsZWN0b3JzID0gc2VsZWN0b3JzLnNwbGl0KCcsJyk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3JzW2ldO1xuXG4gICAgICAgIGlmIChleGVjUmVzdWx0ID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLy5leGVjKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAga2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcbiAgICAgICAgICAgIHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG5cbiAgICAgICAgICAgIC8vIGdldHRpbmcgS0VZIGZyb20gOmJvdW5kKEtFWSlcbiAgICAgICAgICAgICRib3VuZCA9IG9iamVjdERhdGEuc3BlY2lhbFtrZXldICYmIG9iamVjdERhdGEuc3BlY2lhbFtrZXldLiRub2RlcztcbiAgICAgICAgICAgIGlmKCEkYm91bmQgfHwgISRib3VuZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIHBhc3NlZCBhZnRlciA6Ym91bmQoS0VZKSBpcyBub3QgZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpIC5teS1zZWxlY3RvclwiXG4gICAgICAgICAgICBpZiAoc3ViU2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgY29udGFpbnMgY2hpbGRyZW4gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSBcIjpib3VuZChLRVkpID4gLm15LXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICBpZiAoc3ViU2VsZWN0b3IuaW5kZXhPZignPicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGluZyBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgJGJvdW5kLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gJGJvdW5kW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tID0gJ20nICsgY29yZS5yYW5kb21TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKHJhbmRvbSwgcmFuZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKCdbJyArIHJhbmRvbSArICc9XCInICsgcmFuZG9tICsgJ1wiXScgKyBzdWJTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHV0aWwudG9BcnJheShzZWxlY3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGRvZXNuJ3QgY29udGFpbiBjaGlsZHJlbiBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKCRib3VuZC5maW5kKHN1YlNlbGVjdG9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgaXMgZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCgkYm91bmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgaXQncyBuYXRpdmUgc2VsZWN0b3JcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcbiAgICAkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuICAgIGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcbiAgICAgICAgICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcbiAgICAgICAgZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG4gICAgfVxufSBlbHNlIHtcbiAgICB1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG4gICAgZm46IEluaXQucHJvdG90eXBlLFxuICAgIGV4dGVuZCxcbiAgICBwYXJzZUhUTUwsXG4gICAgb25lLFxuICAgIGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBpcyxcbiAgICBhZGQsXG4gICAgbm90LFxuICAgIGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChnaXZlbkhUTUwpIHtcbiAgICAvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG4gICAgY29uc3Qgd3JhcE1hcCA9IHtcbiAgICAgICAgb3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcbiAgICAgICAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgICAgICAgdGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICAgICAgICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gICAgICAgIHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgY29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcbiAgICAgICAgYXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcbiAgICAgICAgXzogWzAsICcnLCAnJ11cbiAgICB9O1xuXG4gICAgY29uc3QgaHRtbCA9IGdpdmVuSFRNTC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaTtcblxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcbiAgICB3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuICAgIHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG4gICAgY29uc3QgZXggPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZXggJiYgd3JhcE1hcFtleFsxXV0gfHwgd3JhcE1hcC5fO1xuXG4gICAgbm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cbiAgICBpID0gd3JhcHBlclswXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBuZXcgSW5pdChodG1sMm5vZGVMaXN0KGh0bWwpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiBtYXRjaGVkIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25lKHMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbi8vIFRPRE8gZ2V0IHJpZCBvZiBpdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiB0YWdOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwcm9wcyA9IHRhZ05hbWU7XG4gICAgICAgIHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihlbFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSAhPT0gJ3RhZ05hbWUnKSB7XG4gICAgICAgICAgICAgICAgZWxba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCByYW5kb21JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICd4Jyk7XG4gICAgY29uc3Qgc2NvcGVTZWxlY3RvciA9IGBbJHtyYW5kb21JRH09XCIke3JhbmRvbUlEfVwiXSBgO1xuICAgIGNvbnN0IHNwbGl0dGVkU2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuXG4gICAgbGV0IG1hdGNoaW5nID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcbiAgICAgICAgbWF0Y2hpbmcgKz0gYCR7aSA9PT0gMCA/ICcnIDogJywnfSR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0sJHtzY29wZVNlbGVjdG9yfSR7c2VsfSAqYDtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cbiAgICBpZiAoaXMuY2FsbChbZXZ0LnRhcmdldF0sIG1hdGNoaW5nKSkge1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXNTdHIsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lc1N0ci5zcGxpdCgvXFxzLyk7XG4gICAgbGV0IGRlbGVnYXRlO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGlzdCkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbi5qc1xuICoqLyIsIi8vIHNoYXJlIGRhdGEgYmV0d2VlbiBhcyBhbiBvYmplY3QgbW9kdWxlcyBiZWNhdXNlIHdlIHVzZVxuLy8gc2ltcGxpZmllZCBlcyBtb2R1bGVzIHRoZXJlIGFuZCBjYW5ub3QgaW1wb3J0IGFuZCBzaGFyZSBhIG51bWJlclxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5vZGVJbmRleDogMCxcbiAgICBhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXNbMF07XG4gICAgcmV0dXJuIG5vZGVcbiAgICAgICAgPyAobm9kZS5tYXRjaGVzXG4gICAgICAgICAgICB8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2lzLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIHJlbW92ZXMgZXZlbnQgaGFuZGxlciBmcm9tIGEgc2V0IG9mIGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuZGVsZWdhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IGV2ZW50Lm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgaWRNYXAgPSB7fTtcblxuICAgIGxldCByZXN1bHQ7XG5cbiAgICBzZWxlY3RvciA9IG5ldyBJbml0KHNlbGVjdG9yKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW5pdCh0aGlzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByZXN1bHRbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gc2VsZWN0b3JbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWYgKCFpZE1hcFtub2RlSURdKSB7XG4gICAgICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvbm90LmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIGVsZW1lbnRzLFxuLy8gZmlsdGVyZWQgYnkgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICAgIGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2ZpbmQuanNcbiAqKi8iLCJpbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcbi8vIHJlLWFkZHMgYmluZGluZyB3aGVuIG9iamVjdCBicmFuY2ggaXMgY2hhbmdlZFxuLy8gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSBiaW5kTm9kZSB3aGVuIHNvbWV0aGluZyBsaWtlXG4vLyAnZm9vLmJhci5iYXonIGlzIHBhc3NlZCB0byBpdCBhcyBrZXkgYXJnIHZhbHVlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2l0Y2hCaW5kaW5nKHtcbiAgICBjaGFuZ2VFdnQsXG4gICAgb2JqZWN0LFxuICAgIGRlZXBQYXRoLFxuICAgICRub2RlcyxcbiAgICBiaW5kZXIsXG4gICAgZXZ0LFxuICAgIGJpbmROb2RlXG59KSB7XG4gICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG4gICAgbGV0IHsgdmFsdWU6IHRhcmdldCB9ID0gY2hhbmdlRXZ0O1xuICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNUYXJnZXQgfSA9IGNoYW5nZUV2dDtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldCA9IG9iamVjdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgJG5vZGVzLCBiaW5kZXIsIGV2dCk7XG5cbiAgICAvLyByZW1vdmUgYmluZGluZyBmb3IgcHJldmlvdXNseSB1c2VkIG9iamVjdFxuICAgIGlmIChwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuYmluZE5vZGUocHJldmlvdXNUYXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sICRub2Rlcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBpbml0TUsgZnJvbSAnLi9fY29yZS9pbml0JztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUJpbmRpbmcgZnJvbSAnLi9fYmluZGluZ3MvcmVtb3ZlYmluZGluZyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vX2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBrZXk7XG4gICAgICAgIGtleSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICd1bmJpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbJ2EnLCAnYicsICdjJ10sIG5vZGUpXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiB1bmJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgZXZ0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy51bmJpbmROb2RlKFt7IGtleSwgbm9kZSwgYmluZGVyLCBldmVudCB9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlXG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIGl0ZW1Ob2RlLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKGtleSAmJiB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChrZXlPYmpWYWx1ZSwga2V5T2JqS2V5KSA9PiB1bmJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuXG4gICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgIGNvbnN0IHsgZGVlcCB9ID0gZXZ0IHx8IHt9O1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGluaXRNSyhvYmplY3QpO1xuXG4gICAgLy8gYWxsb3cgdG8gcGFzcyBudWxsIG9yIHVuZGVmaW5lZCBhcyBrZXlcbiAgICAvLyBpZiBwYXNzZWQgdGhlbiByZW1vdmUgYmluZGluZ3Mgb2YgYWxsIGtleXMgZm9yIGdpdmVuIG9iamVjdFxuICAgIGlmKGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHByb3BzSXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBudWxsLCBldnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWxlZ2F0ZWQgYmluZGluZ1xuICAgIGlmKGRlZXAgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG4gICAgICAgIGlmIChkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGhMZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGRvIHdlIG5lZWQgdG8gdGhyb3cgZXJyb3Igd2hlbiB0YXJnZXQgaXMgZmFsc3k/XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETyBCVUcgdGhpcyBtYXkgdW5kZWxlZ2F0ZSBsaXN0ZW5lciBmb3IgYWxsIGJpbmRpbmdzIHdpdGggdGhlIHNhbWUgcGF0aCAoY2Fubm90IHJlcHJvZHVjZSlcbiAgICAgICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMiksXG4gICAgICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMl19YCk7XG5cbiAgICAgICAgICAgIHVuYmluZE5vZGUodGFyZ2V0LCBkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDFdLCBub2RlLCBldnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyB3aGVuIG5vIHByb3BkZWYgZG8gbm90aGluZ1xuICAgIGlmKCFwcm9wRGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0IGhhdmUgYW55IGJpbmRpbmdzIGRvIG5vdGhpbmdcbiAgICBpZighYmluZGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBub2RlIGlzIHBhc2VkIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuICAgIGlmKCFub2RlKSB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2dCB9LCBiaW5kaW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5vZGVzIGFuZCAkbm9kZXMgZm9yIE1hdHJlc2hrYSBpbnN0YW5jZVxuICAgICAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcbiAgICBjb25zdCByZXRhaW5CaW5kaW5ncyA9IFtdO1xuICAgIGNvbnN0IHJldGFpbk5vZGVzID0gW107XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIGJpbmRuZ3MgYW5kIGNvbXBhcmUgdGhlaXIgbm9kZSB3aXRoIGdpdmVuIG5vZGVzXG4gICAgbm9mbi5mb3JFYWNoKCRub2Rlcywgbm9kZXNJdGVtID0+IHtcbiAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmKGJpbmRpbmcubm9kZSA9PT0gbm9kZXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldnQgfSwgYmluZGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldGFpbkJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gICAgICAgICAgICAgICAgcmV0YWluTm9kZXMucHVzaChub2Rlc0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgaWYocmV0YWluTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3Qubm9kZXNba2V5XSA9IHJldGFpbk5vZGVzWzBdO1xuICAgICAgICAgICAgb2JqZWN0LiRub2Rlc1trZXldID0gZG9tLiQocmV0YWluTm9kZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC5ub2Rlc1trZXldXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LiRub2Rlc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGJpbmRpbmdzIG9iamVjdFxuICAgIGlmKHJldGFpbkJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9wRGVmLmJpbmRpbmdzID0gcmV0YWluQmluZGluZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdW5iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vcmVtb3ZlbGlzdGVuZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cbiAgICBwYXRoID0gdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnICYmIHBhdGggIT09ICcnID8gcGF0aC5zcGxpdCgnLicpIDogcGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGRvIGFsbCBtYWdpY1xuICAgICAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5pbmZvLnBhdGhTdHIgIT09IHBhdGhTdHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSA9IHJldGFpbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2tleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIm5hbWVcIiwgXCJldmVudHNcIl0gfV0qL1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuXG4vLyByZW1vdmVzIHNpbXBsZSBldmVudCBsaXN0ZW5lciB0byBhbiBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHJldHVybjtcblxuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcbiAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG4gICAgY29uc3QgcmV0YWluID0gW107XG4gICAgY29uc3Qgbm9UcmlnZ2VyID0gbmFtZSA/IG5hbWVbMF0gPT09ICdfJyA6IGZhbHNlO1xuXG4gICAgLy8gaWYgYWxsIGV2ZW50cyBuZWVkIHRvIGJlIHJlbW92ZWRcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghbm9UcmlnZ2VyKSB7XG4gICAgICAgICAgICBub2ZuLmZvck93bihhbGxFdmVudHMsIChldmVudHMsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc3RvcmUgZGVmYXVsdCB2YWx1ZSBvZiBcImV2ZW50c1wiXG4gICAgICAgIGRlZi5ldmVudHMgPSB7fTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50cykge1xuICAgICAgICAvLyBpZiBldmVudHMgd2l0aCBnaXZlbiBuYW1lIGFyZSBmb3VuZFxuICAgICAgICBub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgKGNhbGxiYWNrICE9PSBldnQuY2FsbGJhY2sgJiYgY2FsbGJhY2suX2NhbGxiYWNrICE9PSBldnQuY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgfHwgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZ0LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgLy8ga2VlcCBldmVudFxuICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGV2dC5jb250ZXh0XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghbm9UcmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgYWxsRXZlbnRzW25hbWVdID0gcmV0YWluO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm47XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4uL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vX2V2ZW50cy90cmlnZ2Vyb25lJztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIHRoZSBmdW5jdGlvbiByZW1vdmVzIHNpbmdsZSBiaW5kaW5nIGZvciBzaW5nbGUgb2JqZWN0XG4vLyBjYWxsZWQgYnkgdW5iaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldnQgfSwge1xuICAgIG9wdGlvbnMsXG4gICAgYmluZGVyLFxuICAgIG5vZGUsXG4gICAgbm9kZUhhbmRsZXIsXG4gICAgb2JqZWN0SGFuZGxlclxufSkge1xuICAgIGNvbnN0IHsgZGVzdHJveSwgb24gfSA9IGJpbmRlcjtcbiAgICBjb25zdCB7IHNpbGVudCB9ID0gZXZ0O1xuXG4gICAgLy8gaWYgXCJvblwiIGlzIGZ1bmN0aW9uIGRpc2FibGUgaXRcbiAgICAvLyB3ZSBjYW5ub3QgdHVybiBvZmYgY3VzdG9tIGxpc3RlbmVyIGRlZmluZWQgYnkgYSBwcm9ncmFtbWVyXG4gICAgLy8gcHJvZ3JhbW1lciBuZWVkcyB0byByZW1vdmUgY3VzdG9tIGxpc3RlbmVyIG1hdWFsbHkgdmlhIGJpbmRlci5kZXN0cm95XG4gICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb24gPT09ICdzdHJpbmcnKXtcbiAgICAgICAgLy8gcmVtb3ZlIERPTSBldmVudCBsaXN0ZW5lclxuICAgICAgICAvLyByZW1vdmVFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgbm9mbi5mb3JFYWNoKG9uLnNwbGl0KHNwYWNlUmVnKSxcbiAgICAgICAgICAgIGV2dE5hbWUgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9iamVjdCBldmVudCBsaXN0ZW5lclxuICAgIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cbiAgICAvLyBpZiBiaW5kZXIuZGVzdHJveSBpcyBnaXZlbiBjYWxsIGl0XG4gICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgZGVzdHJveS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlXG4gICAgICAgIH0sIGV2dCk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGB1bmJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3VuYmluZCcsIGV4dGVuZGVkRXZ0KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvcmVtb3ZlYmluZGluZy5qc1xuICoqLyIsImltcG9ydCBsb29rRm9yQmluZGVyIGZyb20gJy4vbG9va2ZvcmJpbmRlcic7XG5pbXBvcnQgcnVuTm9kZUhhbmRsZXIgZnJvbSAnLi9ydW5ub2RlaGFuZGxlcic7XG5pbXBvcnQgcnVuT2JqZWN0SGFuZGxlciBmcm9tICcuL3J1bm9iamVjdGhhbmRsZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi9fdXRpbC9kZWJvdW5jZSc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbmNvbnN0IHNwYWNlUmVnID0gL1xccysvO1xuXG4vLyBoYW5kbGVzIGJpbmRpbmcgZm9yIHNpbmdsZSBwcm9wZXJ0eSAmIG5vZGVcbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIGF0IGJpbmROb2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcbiAgICBiaW5kZXI6IGdpdmVuQmluZGVyLFxuICAgIGtleSxcbiAgICAkbm9kZXMsXG4gICAgbm9kZSxcbiAgICBldnQsXG4gICAgcHJvcERlZlxufSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2lsZW50LFxuICAgICAgICBhc3NpZ25EZWZhdWx0VmFsdWUsXG4gICAgICAgIGRlYm91bmNlOiBkZWJvdW5jZU9wdGlvblxuICAgIH0gPSBldnQ7XG4gICAgLy8gY3JlYXRlIGJpbmRpbmdzIGFycmF5IGluIHByb3BlcnR5IGRlZmluaXRpb24gb2JqZWN0XG4gICAgY29uc3QgYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIGxldCB7IHZhbHVlIH0gPSBwcm9wRGVmO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHNlbGY6IG9iamVjdCxcbiAgICAgICAga2V5LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgJG5vZGVzLFxuICAgICAgICBub2RlXG4gICAgfTtcbiAgICBsZXQgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgIGxldCBiaW5kZXI7XG4gICAgbGV0IG9iamVjdEhhbmRsZXI7XG5cbiAgICAvLyBnZXQgYWN0dWFsIGJpbmRlclxuICAgIGlmIChnaXZlbkJpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBmb3VuZEJpbmRlciA9IGxvb2tGb3JCaW5kZXIobm9kZSk7XG5cbiAgICAgICAgaWYgKGZvdW5kQmluZGVyKSB7XG4gICAgICAgICAgICBpZiAoZ2l2ZW5CaW5kZXIpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihmb3VuZEJpbmRlciwgZ2l2ZW5CaW5kZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBiaW5kZXIgPSBmb3VuZEJpbmRlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJpbmRlciA9IGdpdmVuQmluZGVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBnZXRWYWx1ZSwgc2V0VmFsdWUsIG9uLCBpbml0aWFsaXplIH0gPSBiaW5kZXI7XG5cbiAgICAvLyBjYWxsIGJpbmRlci5pbml0aWFsaXplXG4gICAgaWYgKGluaXRpYWxpemUpIHtcbiAgICAgICAgaW5pdGlhbGl6ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGNhbGxzIGdldFZhbHVlIGltbWVkaWF0ZWx5IGFuZCByZWFzc2lnbiBhIHByb3BlcnR5XG4gICAgLy8gd2hlbiBhbGwgcmVxdWlyZWQgY29uZGl0aW9ucyBhcmUgbWV0IGZvciB0aGlzXG4gICAgaWYgKGdldFZhbHVlICYmIChpc1VuZGVmaW5lZCAmJiBhc3NpZ25EZWZhdWx0VmFsdWUgIT09IGZhbHNlIHx8IGFzc2lnbkRlZmF1bHRWYWx1ZSA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgICAgICBpc1VuZGVmaW5lZCA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XG5cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyBmcm9tTm9kZTogdHJ1ZSB9LCBldnQpKTtcbiAgICB9XG5cbiAgICAvLyBhZGQgbmVlZGVkIGV2ZW50IGhhbmRsZXJzIHRoZSBvYmplY3Qgd2hlbiBzZXRWYWx1ZSBpcyBnaXZlblxuICAgIGlmIChzZXRWYWx1ZSkge1xuICAgICAgICBvYmplY3RIYW5kbGVyID0gKCkgPT4gcnVuT2JqZWN0SGFuZGxlcih7XG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICBldnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYnkgZGVmYXVsdCBkZWJvdW5jaW5nIGlzIG9uXG4gICAgICAgIC8vIGl0IGNhbiBiZSB0dXJuZWQgb2ZmIGJ5IHBhc3NpbmcgZGVib3VuY2U9ZmFsc2UgdG8gZXZlbnQgb2JqZWN0XG4gICAgICAgIGlmIChkZWJvdW5jZU9wdGlvbiAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdHlwZW9mIGRlYm91bmNlT3B0aW9uID09PSAnbnVtYmVyJyA/IGRlYm91bmNlT3B0aW9uIDogMDtcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIgPSBkZWJvdW5jZShvYmplY3RIYW5kbGVyLCBkZWxheSk7XG4gICAgICAgIH1cblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBuZWVkZWQgZXZlbnQgaGFuZGxlcnMgdGhlIG5vZGUgd2hlbiBnZXRWYWx1ZSAmIG9uIGFyZSBnaXZlblxuICAgIGlmIChnZXRWYWx1ZSAmJiBvbikge1xuICAgICAgICBjb25zdCBub2RlSGFuZGxlciA9IChkb21FdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gbm9kZUhhbmRsZXIuZGlzYWJsZWQgPSB0cnVlIGlzIHNldCBpbiB1bmJpbmROb2RlXG4gICAgICAgICAgICAvLyB3ZSBjYW5ub3QgXCJ0dXJuIG9mZlwiIGJpbmRlci5vbiB3aGVuIGl0cyB2YWx1ZSBpcyBmdW5jdGlvblxuICAgICAgICAgICAgLy8gZGV2ZWxvcGVyIG5lZWRzIHRvIGNsZWFuIG1lbW9yeSAodHVybiBvZmYgY2FsbGJhY2spIG1hbnVhbHkgaW4gYmluZGVyLmRlc3Ryb3lcbiAgICAgICAgICAgIGlmKCFub2RlSGFuZGxlci5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICAgICAgICAgICAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgICBwcm9wRGVmLFxuICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYWRkIGJpbmRpbmcgZGF0YSB0byBiaW5kaW5ncyBhcnJheVxuICAgICAgICBiaW5kaW5ncy5wdXNoKHtcbiAgICAgICAgICAgIG9uLFxuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgIG9iamVjdEhhbmRsZXIsXG4gICAgICAgICAgICBub2RlSGFuZGxlcixcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVE9ETyB0aHJvdyBlcnJvciB3aGVuIFwib25cIiBhbmQgbWF5YmUgb3RoZXIgYmluZGVyIHByb3BlcnRpZXMgaGFzIHdyb25nIHR5cGVcbiAgICAgICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb24uY2FsbChub2RlLCBub2RlSGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICAvLyBhZGRFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChvbi5zcGxpdChzcGFjZVJlZyksXG4gICAgICAgICAgICAgICAgZXZ0TmFtZSA9PiBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgbm9kZUhhbmRsZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlXG4gICAgICAgIH0sIGV2dCk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGBiaW5kOiR7a2V5fWAsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdiaW5kJywgZXh0ZW5kZWRFdnQpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0QmluZGVycyBmcm9tICcuL2RlZmF1bHRiaW5kZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZmF1bHRCaW5kZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyZXN1bHQgPSBkZWZhdWx0QmluZGVyc1tpXS5jYWxsKG5vZGUsIG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBbbm9kZSA9PiB7XG4gICAgY29uc3QgdGFnTmFtZSA9IG5vZGUudGFnTmFtZTtcblx0Y29uc3QgYmluZGVycyA9IHVuZGVmaW5lZDsgLy8gVE9ET1xuICAgIGxldCBiO1xuXG4gICAgLy8gVE9ETyBTd2l0Y2gvY2FzZVxuICAgIGlmICh0YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLmlucHV0KG5vZGUudHlwZSk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLnRleHRhcmVhKCk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICBiID0gYmluZGVycy5zZWxlY3Qobm9kZS5tdWx0aXBsZSk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnUFJPR1JFU1MnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLnByb2dyZXNzKCk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnT1VUUFVUJykge1xuICAgICAgICBiID0gYmluZGVycy5vdXRwdXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYjtcbn1dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBib3VuZCBub2RlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICBkb21FdmVudCA9IHt9LFxuICAgIG9iamVjdCxcbiAgICBrZXksXG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBvcHRpb25zXG59KSB7XG4gICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG4gICAgY29uc3QgeyB3aGljaCwgdGFyZ2V0IH0gPSBkb21FdmVudDtcbiAgICBjb25zdCB7IGdldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG5vZm4uYXNzaWduKHtcbiAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQsIC8vIGpRdWVyeSB0aGluZ1xuICAgICAgICAvLyB3aWxsIHRocm93IFwicHJldmVudERlZmF1bHQgaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcbiAgICAgICAgLy8gd2lsbCB0aHJvdyBcInN0b3BQcm9wYWdhdGlvbiBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogKCkgPT4gZG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksXG4gICAgICAgIHdoaWNoLFxuICAgICAgICB0YXJnZXRcbiAgICB9LCBvcHRpb25zKSk7XG5cbiAgICBpZiAoIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAvLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBvZiBhIGhhY2tcbiAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgY2hhbmdlZE5vZGUsIG9uQ2hhbmdlVmFsdWUsIGJpbmRlcj9cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuICAgICAgICAgICAgZnJvbU5vZGU6IHRydWUsXG4gICAgICAgICAgICBjaGFuZ2VkTm9kZTogbm9kZSxcbiAgICAgICAgICAgIG9uQ2hhbmdlVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgYmluZGVyXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1xuICoqLyIsIi8vIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gcHJvcGVydHkgdmFsdWUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuT2JqZWN0SGFuZGxlcih7XG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBvcHRpb25zLFxuICAgIGV2dFxufSkge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG4gICAgY29uc3QgeyBvbkNoYW5nZVZhbHVlLCBjaGFuZ2VkTm9kZSwgYmluZGVyOiBldnRCaW5kZXIgfSA9IGV2dDtcbiAgICBjb25zdCB7IHNldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgLy8gZGlydHkgaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcbiAgICBjb25zdCBkaXJ0eUhhY2tWYWx1ZSA9IG9uQ2hhbmdlVmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgPyBTdHJpbmcodmFsdWUpIDogdmFsdWU7XG5cbiAgICBpZiAoY2hhbmdlZE5vZGUgPT09IG5vZGUgJiYgb25DaGFuZ2VWYWx1ZSA9PT0gZGlydHlIYWNrVmFsdWUgJiYgZXZ0QmluZGVyID09PSBiaW5kZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFZhbHVlLmNhbGwobm9kZSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgdmFsdWUgfSwgb3B0aW9ucykpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3J1bm9iamVjdGhhbmRsZXIuanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiZXZ0XCJdIH1dKi9cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5cbi8vIHByb3BlcnR5IG1vZGlmaWVyIGV2ZW50IHJlZ2V4cFxuY29uc3QgcHJvcE1vZEV2ZW50UmVnXG4gICAgPSAvXl9jaGFuZ2U6ZGVwczp8Xl9jaGFuZ2U6YmluZGluZ3M6fF5fY2hhbmdlOmRlbGVnYXRlZDp8Xl9jaGFuZ2U6dHJlZTp8XmNoYW5nZTp8XmJlZm9yZWNoYW5nZTovO1xuXG4vLyBhZGRzIHNpbXBsZSBldmVudCBsaXN0ZW5lclxuLy8gdXNlZCBhcyBjb3JlIG9mIGV2ZW50IGVuZ2luZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG4gICAgY29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gaW5pdE1LKG9iamVjdCk7XG4gICAgY29uc3QgY3R4ID0gY29udGV4dCB8fCBvYmplY3Q7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IGV2dCA9IHsgY2FsbGJhY2ssIGNvbnRleHQsIGN0eCwgbmFtZSwgaW5mbyB9O1xuXG5cbiAgICAvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZVxuICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIGRhdGEsIHJldHVybiBmYWxzZVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZXZ0ID0gZXZlbnRzW2ldO1xuICAgICAgICAgICAgaWYgKChldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrIHx8IGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2suX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAmJiBldnQuY29udGV4dCA9PT0gY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBldmVudCBpc24ndCBmb3VuZCBhZGQgaXQgdG8gdGhlIGV2ZW50IGxpc3RcbiAgICAgICAgZXZlbnRzLnB1c2goZXZ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZSwgY3JlYXRlIGFycmF5IHdpdGggb25seSBlYmVudFxuICAgICAgICBhbGxFdmVudHNbbmFtZV0gPSBbZXZ0XTtcbiAgICB9XG5cbiAgICBpZiAocHJvcE1vZEV2ZW50UmVnLnRlc3QobmFtZSkpIHtcbiAgICAgICAgLy8gZGVmaW5lIG5lZWRlZCBhY2Nlc3NvcnMgZm9yIEtFWVxuICAgICAgICBkZWZpbmVQcm9wKG9iamVjdCwgbmFtZS5yZXBsYWNlKHByb3BNb2RFdmVudFJlZywgJycpKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZVswXSAhPT0gJ18nKSB7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgYWRkZXZlbnQ6JHtuYW1lfWAsIGV2dCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAnYWRkZXZlbnQnLCBldnQpO1xuICAgIH1cblxuICAgIC8vIGlmIGV2ZW50IGlzIGFkZGVkIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgZ2l2ZW5EZWxheSwgdGhpc0FyZykge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIGxldCBkZWxheTtcbiAgICBpZiAodHlwZW9mIGRlbGF5ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzQXJnID0gZ2l2ZW5EZWxheTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBkZWxheSA9IDA7XG4gICAgfVxuXG4gICAgZGVsYXkgPSBnaXZlbkRlbGF5IHx8IDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjb25zdCBbYTEsIGEyXSA9IGFyZ3M7XG4gICAgICAgIGNvbnN0IGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSB0aGlzQXJnIHx8IHRoaXM7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChhcmdzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseShjYWxsQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvZGVib3VuY2UuanNcbiAqKi8iLCIvKmVzbGludCBuby11c2UtYmVmb3JlLWRlZmluZTogW1wiZXJyb3JcIiwgeyBcImZ1bmN0aW9uc1wiOiBmYWxzZSB9XSovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCBpcyBmcm9tICcuLi9fdXRpbC9pcyc7XG5cbmNvbnN0IHRyZWVDaGFuZ2VFdnRSZWcgPSAvXl9jaGFuZ2U6dHJlZTovO1xuXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKHtcbiAgICBwcmV2aW91c1ZhbHVlLFxuICAgIHZhbHVlXG59LCB7XG4gICAgcGF0aCxcbiAgICBuYW1lLFxuICAgIGNhbGxiYWNrLFxuICAgIGNvbnRleHRcbn0gPSB0cmlnZ2VyT25lLmxhdGVzdEV2ZW50LmluZm8uZGVsZWdhdGVkRGF0YSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIodmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKHByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIHRyZWUgY2hhbmdlIGV2ZW50IHdoaWNoIGlzIHVzZWQgYnkgYmluZGluZ3MgbG9naWNcbiAgICBpZiAodHJlZUNoYW5nZUV2dFJlZy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUtleSA9IG5hbWUucmVwbGFjZSh0cmVlQ2hhbmdlRXZ0UmVnLCAnJyk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUgJiYgIWlzKHByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSwgdmFsdWVbY2hhbmdlS2V5XSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZXZlbnRzIH0gPSBkZWZzLmdldCh2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCB0cmVlQ2hhbmdlRXZ0TmFtZSA9IGBfY2hhbmdlOnRyZWU6JHtjaGFuZ2VLZXl9YDtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZUV2ZW50cyA9IGV2ZW50c1t0cmVlQ2hhbmdlRXZ0TmFtZV07XG4gICAgICAgICAgICBpZiAoY2hhbmdlRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlck9uZSh2YWx1ZSwgdHJlZUNoYW5nZUV2dE5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVbY2hhbmdlS2V5XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGdpdmVuUGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAvLyBpZiB0eXBlb2YgcGF0aCBpcyBzdHJpbmcgYW5kIHBhdGggaXMgbm90IGVtcHR5IHN0cmluZyB0aGVuIHNwbGl0IGl0XG4gICAgbGV0IHBhdGggPSB0eXBlb2YgZ2l2ZW5QYXRoID09PSAnc3RyaW5nJyAmJiBnaXZlblBhdGggIT09ICcnID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBnaXZlblBhdGg7XG5cbiAgICBpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG5vIHBhdGggdGhlbiBhZGQgc2ltcGxlIGxpc3RlbmVyXG4gICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XG4gICAgICAgIGxldCBwYXRoU3RyO1xuXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZWREYXRhID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IFwic2V0XCJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuICAgICAgICAgICAgZGVsZWdhdGVkRGF0YSxcbiAgICAgICAgICAgIHBhdGhTdHJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIG1hbnVhbGx5XG4gICAgICAgIGNoYW5nZUhhbmRsZXIoe1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldXG4gICAgICAgIH0sIGRlbGVnYXRlZERhdGEpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIi8vIGNyZWF0ZXMgbmVzdGVkIG9iamVjdCBiYXNlZCBvbiBwYXRoIGFuZCBsYXN0VmFsdWVcbi8vIGV4YW1wbGU6IG1ha2VPYmplY3QoJ2EuYi5jJywgNDIpIC0+IHthOiB7Yjoge2M7IDQyfX19XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlT2JqZWN0KGdpdmVuUGF0aCA9ICcnLCBsYXN0VmFsdWUgPSB7fSkge1xuICAgIGNvbnN0IHBhdGggPSBnaXZlblBhdGggPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGxldCBvYmogPSByZXN1bHQ7XG4gICAgbGV0IGtleTtcblxuXG4gICAgd2hpbGUgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICBrZXkgPSBwYXRoLnNoaWZ0KCk7XG4gICAgICAgIG9iaiA9IG9ialtrZXldID0ge307XG4gICAgfVxuXG4gICAgb2JqW3BhdGguc2hpZnQoKV0gPSBsYXN0VmFsdWU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3B5KCkge1xuICAgIGNvbnN0IHNweU5hbWUgPSBgcmFuZG9tTmFtZSR7TWF0aC5yYW5kb20oKX0ke25ldyBEYXRlKCkuZ2V0VGltZSgpfWA7XG4gICAgY29uc3Qgc3B5ID0gKCkgPT4ge307XG4gICAgY29uc3Qgc3B5T2JqID0ge307XG4gICAgc3B5T2JqW3NweU5hbWVdID0gc3B5O1xuICAgIHJldHVybiBzcHlPbihzcHlPYmosIHNweU5hbWUpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9jcmVhdGVzcHkuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4uYWRkJywgKCkgPT4ge1xuICAgIGl0KCdhZGRzIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJChbZWwxLCBlbDIsIGVsM10pLmFkZChbZWwyLCBlbDMsIGVsNCwgZWw1XSlcbiAgICAgICAgXSkudG9FcXVhbChbZWwxLCBlbDIsIGVsMywgZWw0LCBlbDVdKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmNyZWF0ZScsICgpID0+IHtcbiAgICBpdCgnY3JlYXRlcyBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2JykudGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ0RJVicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgYSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU6ICdmb29iYXInXG4gICAgICAgICAgICB9KS5jbGFzc05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdmb29iYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdjcmVhdGVzIGNoaWxkZW4nLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdzcGFuJ1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KS5jaGlsZHJlblswXS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgYXR0cmlidXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAnYmFyJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmdldEF0dHJpYnV0ZSgnZm9vJylcbiAgICAgICAgKS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBvYmplY3Qgd2l0aCB0YWdOYW1lIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSh7XG4gICAgICAgICAgICAgICAgdGFnTmFtZTogJ2RpdidcbiAgICAgICAgICAgIH0pLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdESVYnKTtcbiAgICB9KTtcblxuICAgIHhpdCgnZXh0ZW5kcyBkYXRhc2V0IG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgLy8gVE9ET1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5pbXBvcnQgc2ltdWxhdGVDbGljayBmcm9tICcuLi8uLi9saWIvc2ltdWxhdGVjbGljayc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgZXZlbnRzJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgY2hpbGQxO1xuICAgIGxldCBjaGlsZDI7XG4gICAgbGV0IGdyYW5kY2hpbGQxO1xuICAgIGxldCBoYW5kbGVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMScpO1xuICAgICAgICBjaGlsZDIgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuY2hpbGQyJyk7XG4gICAgICAgIGdyYW5kY2hpbGQxID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQxJyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIHNweU9uKHRoaXMsICdoYW5kbGVyJyk7XG4gICAgICAgIGhhbmRsZXIgPSB0aGlzLmhhbmRsZXI7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgICAkKFt0ZXN0U2FuZGJveCwgY2hpbGQxLCBjaGlsZDIsIGdyYW5kY2hpbGQxXSkub2ZmKCdjbGljaycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGV2ZW50IGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBuYW1lc3BhY2VkIGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIG5hbWVzcGFjZWQgbGlzdGVuZXIgKGxpc3RlbmVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2sueW8nLCBoYW5kbGVyKS5vZmYoJ2NsaWNrLnlvJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGJ1YmJsaW5nIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXInLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoY2xpY2sgb24gZ3JhbmRjaGlsZHJlbiknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0RvZXNuXFx0IHRyaWdnZXIgd2hlbiBjbGlja2VkIG9uIHdyb25nIGNoaWxkJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMicsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsICcuY2hpbGQxJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGlzIG5vdCBzcGVjaWZpZWQsIGhhbmRsZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKHNlbGVjdG9yIGFuZCBoYW5kbGVyIGFyZSBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU3RvcHMgcHJvcGFnYXRpb24nLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICAkKGNoaWxkMSkub24oJ2NsaWNrJywgZXZ0ID0+IGV2dC5zdG9wUHJvcGFnYXRpb24oKSk7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qc1xuICoqLyIsIi8vIHNpbXVsYXRlcyBjbGljayBvbiBhIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNpbXVsYXRlQ2xpY2sobm9kZSkge1xuICAgIGNvbnN0IGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50Jyk7XG4gICAgZXZ0LmluaXRNb3VzZUV2ZW50KCdjbGljaycsIHRydWUpO1xuICAgIG5vZGUuZGlzcGF0Y2hFdmVudChldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmZpbmQnLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuICAgIGxldCBncmFuZENoaWxkO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGdyYW5kQ2hpbGQgPSB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yKCcuZ3JhbmRjaGlsZCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpbmRzJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJCh0ZXN0U2FuZGJveCkuZmluZCgnLmdyYW5kY2hpbGQnKVxuICAgICAgICBdKS50b0VxdWFsKFtncmFuZENoaWxkXSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9maW5kX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkgaW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG4gICAgbGV0IHRlc3RTYW5kYm94O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHRlc3RTYW5kYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgdGVzdFNhbmRib3guaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0xXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtMlwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTNcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgd2luZG93JywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKHdpbmRvdyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKHdpbmRvdyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWNjZXB0cyBkb2N1bWVudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChkb2N1bWVudCk7XG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdKS50b0VxdWFsKGRvY3VtZW50KTtcbiAgICB9KTtcblxuICAgIGl0KCdwYXJzZXMgSFRNTCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NvbnZlcnRzIGFycmF5LWxpa2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGNoaWxkcmVuKTtcblxuICAgICAgICBleHBlY3QoY2hpbGRyZW4ubGVuZ3RoKS50b0VxdWFsKHJlc3VsdC5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGV4cGVjdChjaGlsZHJlbltpXSkudG9FcXVhbChyZXN1bHRbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpdCgnQ29udmVydHMgb25lIGVsZW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcqJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoZWxlbWVudCk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMSk7XG4gICAgICAgIGV4cGVjdChlbGVtZW50KS50b0VxdWFsKHJlc3VsdFswXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCcudGVzdC0xJywgdGVzdFNhbmRib3gpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnVXNlcyBjb250ZXh0JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKCcudGVzdC0xJywgJy53cm9uZy1jb250ZXh0JykubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gdXNlIG51bGwnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQobnVsbCkubGVuZ3RoXG4gICAgICAgICkudG9FcXVhbCgwKTtcbiAgICB9KTtcblxuICAgIGl0KCdBbGxvd3MgdG8gdXNlIHVuZGVmaW5lZCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIGNyZWF0ZSBwbHVnaW5zJywgKCkgPT4ge1xuICAgICAgICAkLmZuLmJRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uIGJRdWVyeVBsdWdpbigpIHtcbiAgICAgICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICAgICB0aGlzLmxlbmd0aFxuICAgICAgICAgICAgKS50b0VxdWFsKFxuICAgICAgICAgICAgICAgIHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKS5sZW5ndGhcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc3B5T24oJC5mbiwgJ2JRdWVyeVBsdWdpbicpO1xuXG4gICAgICAgICQoJyonLCB0ZXN0U2FuZGJveCkuYlF1ZXJ5UGx1Z2luKCk7XG5cbiAgICAgICAgZXhwZWN0KCQuZm4uYlF1ZXJ5UGx1Z2luKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9pbml0X3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuICAgIGl0KCdjaGVja3MgY2xhc3NOYW1lJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSAnZWwnO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwnKVxuICAgICAgICApLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJChlbCkuaXMoJy5lbDInKVxuICAgICAgICApLnRvRXF1YWwoZmFsc2UpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5ub3QnLCAoKSA9PiB7XG4gICAgaXQoJ2V4Y2x1ZGVzIGJ5IHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIGVsMi5jbGFzc05hbWUgPSAnZWwyJztcblxuICAgICAgICBleHBlY3QoW1xuICAgICAgICAgICAgLi4uJChbZWwxLCBlbDIsIGVsM10pLm5vdCgnLmVsMicpXG4gICAgICAgIF0pLnRvRXF1YWwoW2VsMSwgZWwzXSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5vbmUnLCAoKSA9PiB7XG4gICAgaXQoJ2ZpbmRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGQyXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGNvbnN0IGNoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5vbmUoJyonLCB0ZXN0U2FuZGJveClcbiAgICAgICAgKS50b0VxdWFsKGNoaWxkKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LnBhcnNlSFRNTCcsICgpID0+IHtcbiAgICBpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8ZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdESVYnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdTUEFOJyk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIGNvbnRleHR1YWwgZWxlbWVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQucGFyc2VIVE1MKCc8dGQ+PC90ZD48dGQ+PC90ZD4nKTtcblxuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgyKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1REJyk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qc1xuICoqLyIsImltcG9ydCBDbGFzcyBmcm9tICdzcmMvY2xhc3MnO1xuXG5kZXNjcmliZSgnQ2xhc3MgZnVuY3Rpb24nLCAoKSA9PiB7XG4gICAgaXQoJ2FsbG93cyB0byBpbmhlcml0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBBID0gQ2xhc3MoeyBhOiB0cnVlIH0pLFxuICAgICAgICAgICAgQiA9IENsYXNzKHsgYjogdHJ1ZSwgZXh0ZW5kczogQSB9KSxcbiAgICAgICAgICAgIEMgPSBDbGFzcyh7IGM6IHRydWUsIGV4dGVuZHM6IEIgfSksXG4gICAgICAgICAgICBpbnN0ID0gbmV3IEM7XG5cbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBBKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQikudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEMpLnRvQmVUcnV0aHkoKTtcblxuICAgICAgICBleHBlY3QoaW5zdC5hKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0LmIpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QuYykudG9CZVRydXRoeSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBwYXNzIHN0YXRpYyBwcm9wcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgQSA9IENsYXNzKHt9LCB7IHN0YXRpY1Byb3A6IHRydWUgfSk7XG4gICAgICAgIGV4cGVjdChBLnN0YXRpY1Byb3ApLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnN0ID0gbmV3IENsYXNzKHsgYTogdHJ1ZSB9KTtcbiAgICAgICAgZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIENsYXNzKS50b0JlRmFsc3koKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi9leHRlbmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGFzcyhwcm90b3R5cGUsIHN0YXRpY1Byb3BzKSB7XG4gICAgY29uc3QgQ29uc3RydWN0b3IgPSBwcm90b3R5cGUuY29uc3RydWN0b3IgIT09IE9iamVjdFxuICAgICAgICAgICAgPyBwcm90b3R5cGUuY29uc3RydWN0b3JcbiAgICAgICAgICAgIDogZnVuY3Rpb24gRW1wdHlDb25zdHJ1Y3RvcigpIHt9LFxuICAgICAgICAvL2V4dGVuZHMgaXMga2VwdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgICAgICBQYXJlbnQgPSBwcm90b3R5cGUuZXh0ZW5kcyB8fCBwcm90b3R5cGUuZXh0ZW5kLFxuICAgICAgICAvL2luaGVyaXQgcHJvdG8gZnJvbSBjbGFzcyBwYXJlbnQgb3IgZW1wdHkgb2JqZWN0XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmNyZWF0ZShQYXJlbnQgPyBQYXJlbnQucHJvdG90eXBlIDoge30pO1xuXG4gICAgZXh0ZW5kKHByb3RvLCBwcm90b3R5cGUpO1xuXG4gICAgaWYgKHR5cGVvZiBzdGF0aWNQcm9wcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgZXh0ZW5kKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgfVxuXG4gICAgLy8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICBwcm90by5pbnN0YW5jZU9mID0gZnVuY3Rpb24gaW5zdGFuY2VPZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcjtcbiAgICB9O1xuXG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG87XG5cbiAgICAvLyBpZiBuZXcgQ2xhc3Moe30pIGlzIGNhbGxlZCByZXR1cm4gaXRzIGluc3RhbmNlXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDbGFzcykge1xuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NsYXNzLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKE1hdHJlc2hrYS5PYmplY3QgYW5kIE1hdHJlc2hrYS5BcnJheSknLCBmdW5jdGlvbigpIHtcbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueCwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLkFycmF5KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgY2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgdXNpbmcgY2FsbGJhY2sgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBjYWxsYmFjayA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBvYmouanNldCgneCcsIHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLionLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaChuZXcgTUsuQXJyYXkoe30pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXVswXSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2gobmV3IE1LLkFycmF5KHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9ialswXVswXS5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCksIGdvIGRlZXBlciAoKi4qLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKi5hJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgIHk6IG5ldyBNSy5PYmplY3Qoe1xuICAgICAgICAgICAgICAgIGE6IHt9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC55LmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICdzcmMvX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdEZWxlZ2F0ZWQgZXZlbnRzOiBkZWxlZ2F0ZUxpc3RlbmVyLCB1bmRlbGVnYXRlTGlzdGVuZXIgKGJhc2ljKScsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgbGV0IGN0eDtcbiAgICBsZXQgaGFuZGxlcjtcblxuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGN0eCA9IHt9O1xuICAgICAgICB0aGlzLmhhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0gbWFrZU9iamVjdCgnYycpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcbiAgICAgICAgY29uc3QgYSA9IG9iai5hO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2InKTtcbiAgICAgICAgdHJpZ2dlck9uZShhLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuICAgICAgICBjb25zdCBiID0gb2JqLmEuYjtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKGIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgYSA9IG9iai5hO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgYiA9IG9iai5hLmI7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcbiAgICAgICAgdHJpZ2dlck9uZShiLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlIGV2ZW50IGZyb20gb2xkIHRhcmdldCB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcbiAgICAgICAgY29uc3QgYyA9IG9iai5hLmM7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi5jID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUoYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RvZXNuXFwndCByZW1vdmUgY2hhbmdlIGV2ZW50IHdoZW4gdW5kZWxlZ2F0ZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG9iai5hLmIuYyA9IDU1O1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGFuZCBjb250ZXh0IChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUgKGEuYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndXNlcyBjb3JyZWN0IGNvbnRleHQgZm9yIGRlbGVnYXRlZCBldmVudHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGxldCBib29sID0gZmFsc2U7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBmdW5jdGlvbiBoYW5kbGUoKSB7XG4gICAgICAgICAgICBib29sID0gdGhpcyA9PT0gY3R4O1xuICAgICAgICB9LCBjdHgpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCBtYWtlT2JqZWN0IGZyb20gJy4uLy4uL2xpYi9tYWtlb2JqZWN0JztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdDaGFuZ2UgZXZlbnQgKHNpbXBsZSBhbmQgZGVsZWdhdGVkKScsICgpID0+IHtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgc2ltcGxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmoueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgc2ltcGxlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSB7IHg6IDEgfTtcblxuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmoueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKGRlbGVnYXRlZCwgYS54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgLyplc2xpbnQtZGlzYWJsZSAqL1xuICAgIHhpdCgnZmlyZXMgKGRlbGVnYXRlZCwgYS5iLngpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTp4JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIueCA9IDI7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cblxuICAgIHhpdCgnZmlyZXMgd2hlbiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQgKGEuYi5jLngsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYy54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYy54JywgMik7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgb2JqLmEuYiA9IHtcbiAgICAgICAgICAgIGM6IHtcbiAgICAgICAgICAgICAgICB4OiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBjKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgb2JqLmEuYi5jID0ge1xuICAgICAgICAgICAgeDogMlxuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdhdm9pZHMgY29uZmxpY3RzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpID0gMDtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxMSk7XG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6YycsIGV2dCA9PiBpICs9IDFlMTApO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTkpO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTgpO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNyk7XG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU2KTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTUpO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWU0KTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMyk7XG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTIpO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUxKTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMCk7XG4gICAgICAgIG9iai5hID0ge1xuICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgIGM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZXhwZWN0KGkpLnRvRXF1YWwoMTExMTExMTExMTExKTtcbiAgICB9KTtcblxuICAgIHhpdCgnYWNjZXB0cyBudWxsIHRhcmdldCAoYS5iLmMsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgIGE6IHtcbiAgICAgICAgICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmouYS5iID0gbnVsbDtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG4gICAgLyplc2xpbnQtZW5hYmxlICovXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICdzcmMvX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBjcmVhdGVTcHkgZnJvbSAnLi4vLi4vbGliL2NyZWF0ZXNweSc7XG5cbmRlc2NyaWJlKCdFdmVudHMgY29yZTogYWRkTGlzdGVuZXIsIHJlbW92ZUxpc3RlbmVyLCB0cmlnZ2VyT25lJywgKCkgPT4ge1xuICAgIGxldCBvYmo7XG4gICAgbGV0IGN0eDtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBvYmogPSB7fTtcbiAgICAgICAgY3R4ID0ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcycsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTApKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUxKSk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMikpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0VxdWFsKDExMSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAobm8gYXJncyknLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmopO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IG5hbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjaycsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBhbmQgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjb250ZXh0cyBhcmUgbm90IHNhbWUnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIHt9KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIHhpdCgncmVtb3ZlcyBieSBob3dUb1JlbW92ZSAobm90IGRvY3VtZW50ZWQgY29yZSBmZWF0dXJlKScsICgpID0+IHtcbiAgICAgICAgLyplc2xpbnQtZGlzYWJsZSAqL1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGJvb2wgPSB0cnVlLFxuICAgICAgICAgICAgb25EYXRhID0ge1xuICAgICAgICAgICAgICAgIGhvd1RvUmVtb3ZlKG9uRGF0YSwgb2ZmRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2ZmRGF0YS54ID09PSA0MjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgZiwgbnVsbCwgb25EYXRhKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDEnLCBudWxsLCBudWxsLCB7XG4gICAgICAgICAgICB4OiA0MlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDEnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG5cbiAgICAgICAgbWFnaWMuX2FkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDInLCBmLCBudWxsLCBvbkRhdGEpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MicsIG51bGwsIG51bGwsIHtcbiAgICAgICAgICAgIHg6IDQzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50MicpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgICAgICAvKmVzbGludC1lbmFibGUgKi9cbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG5cbnhkZXNjcmliZShcIkV2ZW50cyBjb3JlOiBfYWRkRE9NTGlzdGVuZXIsIF9yZW1vdmVET01MaXN0ZW5lclwiLCAoKSA9PiB7XG4gICAgbGV0IHEgPSAocywgYykgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgZXYuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG4gICAgICAgICAgICAgICAgICAgIDAgLypsZWZ0Ki8gLCBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG4gICAgICAgIHRhZ05hbWU6ICdESVYnLFxuICAgICAgICBpZDogJ2QtdGVzdCcsXG4gICAgICAgIGlubmVySFRNTDogYFxuICAgICAgICAgICAgPGRpdiBpZD1cImQtdGVzdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtdGVzdC0yXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfSkpO1xuXG5cblxuICAgIGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuXG4gICAgaXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgYW5kIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWRkcyAodXNlIHNlbGVjdG9yKSB0aGVuIGJpbmRzIHRoZW4gcmVtb3ZlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBET00gZXZlbnQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIChkMSwgZDIpID0+IGJvb2wgPSBkMSA9PT0gMSAmJiBkMiA9PT0gMik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnLCAxLCAyKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBET00gZXZlbnQgd2l0aCBzcGVjaWZpZWQgc2VsZWN0b3IgKGJ1YmJsaW5nIHRlc3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4KC5kLXRlc3QtMiknLCAxLCAyKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgZGVsZWdhdGVkIGFuZCBkb2VzblxcJ3QgcmVtb3ZlIGV2ZW50cyBmcm9tIG90aGVyIG5vZGVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5ibGFoJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ3RyaWdnZXJzIGV2ZW50IHZpYSBcInRyaWdnZXJcIiBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsIG51bGwsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfZG9tX3NwZWMuanNcbiAqKi8iLCIvKmVzbGludC1kaXNhYmxlICovXG54ZGVzY3JpYmUoJ0V2ZW50cyBzdW1tYXJ5IChvbiwgb2ZmKScsICgpID0+IHtcbiAgICBsZXQgcSA9IChzLCBjKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSAkKHMsIGMpWzBdIHx8IG51bGw7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5jbGljayA9IHJlc3VsdC5jbGljayB8fCAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudFwiKTtcbiAgICAgICAgICAgICAgICBldi5pbml0TW91c2VFdmVudChcbiAgICAgICAgICAgICAgICAgICAgXCJjbGlja1wiLFxuICAgICAgICAgICAgICAgICAgICB0cnVlIC8qIGJ1YmJsZSAqLyAsIHRydWUgLyogY2FuY2VsYWJsZSAqLyAsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdywgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgMCwgMCwgMCwgMCwgLyogY29vcmRpbmF0ZXMgKi9cbiAgICAgICAgICAgICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIC8qIG1vZGlmaWVyIGtleXMgKi9cbiAgICAgICAgICAgICAgICAgICAgMCAvKmxlZnQqLyAsIG51bGxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKCQuY3JlYXRlKHtcbiAgICAgICAgdGFnTmFtZTogJ0RJVicsXG4gICAgICAgIGlkOiAncy10ZXN0JyxcbiAgICAgICAgaW5uZXJIVE1MOiBgXG4gICAgICAgICAgICA8ZGl2IGlkPVwicy10ZXN0LTFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicy10ZXN0LTJcIj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9KSk7XG5cbiAgICBub2RlLmNsaWNrID0gbm9kZS5jbGljayB8fCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KCdjbGljaycpKTtcbiAgICB9XG5cbiAgICBpdCgnZmlyZXMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdmaXJlcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtayA9IG5ldyBNSyxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcbiAgICAgICAgbWsub24oJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2UsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsub2ZmKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2EuYi5jQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLm9mZihvYmosICdhLmIuY0Bzb21lZXZlbnQnKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLm9mZihvYmosICdjbGljazo6eCcpO1xuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAodXNlIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdAc29tZWV2ZW50JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBvYmoucHVzaCh7fSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAobm8gc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIG9uY2UnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBpKys7XG5cbiAgICAgICAgbWFnaWMub25jZShvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25jZVwiJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGogPSAwLFxuICAgICAgICAgICAgZjEgPSBldnQgPT4gaSsrLFxuICAgICAgICAgICAgZjIgPSBldnQgPT4gaisrO1xuXG4gICAgICAgIG1hZ2ljLm9uY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3RyaWdnZXJzIG9uY2Ugb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIG1rLm9uY2UoJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnb25EZWJvdW5jZSB3b3JrcycsIGRvbmUgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgbWFnaWMub25EZWJvdW5jZShvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25EZWJvdW5jZVwiJywgKGRvbmUpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZXhwZWN0KGopLnRvQmUoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgbWFnaWMub25EZWJvdW5jZShvYmosIHtcbiAgICAgICAgICAgIGZvbzogZjEsXG4gICAgICAgICAgICBiYXI6IGYyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnZm9vJyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KCdvbkRlYm91bmNlIHdvcmtzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsIGRvbmUgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0sIDgwMCk7XG5cbiAgICAgICAgbWsub25EZWJvdW5jZSgnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBuYW1lLWhhbmRsZXIgb2JqZWN0IHRvIFwib25cIiBhbmQgXCJvZmZcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBoYW5kbGVycyA9IHtcbiAgICAgICAgICAgICAgICBmb286ICgpID0+IGkrKyxcbiAgICAgICAgICAgICAgICBiYXI6ICgpID0+IGkrK1xuICAgICAgICAgICAgfTtcblxuICAgICAgICBNSy5vbihvYmosIGhhbmRsZXJzKTtcblxuICAgICAgICBNSy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBNSy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuXG4gICAgICAgIE1LLm9mZihvYmosIGhhbmRsZXJzKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2FsbG93cyB0byBmbGlwIGNvbnRleHQgYW5kIHRyaWdnZXJPbkluaXQgKG9uKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgdGhpc0FyZyA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgTUsub24ob2JqLCAnZm9vJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSwgdHJ1ZSwgdGhpc0FyZyk7XG5cbiAgICAgICAgTUsub24ob2JqLCAnYmFyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBleHBlY3QodGhpcykudG9FcXVhbCh0aGlzQXJnKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSwgdGhpc0FyZywgdHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMik7XG4gICAgfSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcbiAqKi8iLCJ2YXIgbWFwID0ge1xuXHRcIi4vX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXCI6IDM1LFxuXHRcIi4vX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXCI6IDM3LFxuXHRcIi4vX2JpbmRpbmdzL2dldG5vZGVzLmpzXCI6IDEyLFxuXHRcIi4vX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanNcIjogMzYsXG5cdFwiLi9fYmluZGluZ3MvcmVtb3ZlYmluZGluZy5qc1wiOiAzNCxcblx0XCIuL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1wiOiAzOCxcblx0XCIuL19iaW5kaW5ncy9ydW5vYmplY3RoYW5kbGVyLmpzXCI6IDM5LFxuXHRcIi4vX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXCI6IDEzLFxuXHRcIi4vX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcIjogMzAsXG5cdFwiLi9fY29yZS9kZWZpbmVwcm9wLmpzXCI6IDYsXG5cdFwiLi9fY29yZS9kZWZzLmpzXCI6IDUsXG5cdFwiLi9fY29yZS9pbml0LmpzXCI6IDQsXG5cdFwiLi9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXCI6IDE1LFxuXHRcIi4vX2RvbS9pbmRleC5qc1wiOiAxNCxcblx0XCIuL19ldmVudHMvYWRkbGlzdGVuZXIuanNcIjogNDAsXG5cdFwiLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcIjogNDIsXG5cdFwiLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXCI6IDMzLFxuXHRcIi4vX2V2ZW50cy90cmlnZ2Vyb25lLmpzXCI6IDgsXG5cdFwiLi9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1wiOiAzMixcblx0XCIuL191dGlsL2NoZWNrb2JqZWN0dHlwZS5qc1wiOiA5LFxuXHRcIi4vX3V0aWwvZGVib3VuY2UuanNcIjogNDEsXG5cdFwiLi9fdXRpbC9pcy5qc1wiOiAxMSxcblx0XCIuL191dGlsL21hdHJlc2hrYWVycm9yLmpzXCI6IDEwLFxuXHRcIi4vYXJyYXkuanNcIjogNjQsXG5cdFwiLi9iaW5kZXJzLmpzXCI6IDY1LFxuXHRcIi4vYmluZG5vZGUuanNcIjogMyxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAyNCxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAxOCxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAxNyxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogMjcsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDIyLFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogMjksXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMTYsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMjUsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDI4LFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAyNixcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAyMyxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMjEsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDIwLFxuXHRcIi4vY2xhc3MuanNcIjogNTYsXG5cdFwiLi9leHRlbmQuanNcIjogMTksXG5cdFwiLi9pbmRleC5qc1wiOiA2Nixcblx0XCIuL21hZ2ljLmpzXCI6IDY5LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDY3LFxuXHRcIi4vb2JqZWN0L2luZGV4LmpzXCI6IDY4LFxuXHRcIi4vb24uanNcIjogNzAsXG5cdFwiLi9zZXQuanNcIjogNyxcblx0XCIuL3VuYmluZG5vZGUuanNcIjogMzFcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNjM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcnJheS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IE1hdHJlc2hrYSBmcm9tICcuL21hdHJlc2hrYSc7XG5pbXBvcnQgTWF0cmVzaGthQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgTWF0cmVzaGthT2JqZWN0IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBDbGFzcyBmcm9tICcuL2NsYXNzJztcbmltcG9ydCBiaW5kZXJzIGZyb20gJy4vYmluZGVycyc7XG5cbk1hdHJlc2hrYS5BcnJheSA9IE1hdHJlc2hrYUFycmF5O1xuTWF0cmVzaGthLk9iamVjdCA9IE1hdHJlc2hrYU9iamVjdDtcbk1hdHJlc2hrYS5DbGFzcyA9IENsYXNzO1xuTWF0cmVzaGthLmJpbmRlcnMgPSBiaW5kZXJzO1xuXG5leHBvcnQgZGVmYXVsdCBNYXRyZXNoa2E7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCBleHRlbmQgZnJvbSAnLi4vZXh0ZW5kJztcbmltcG9ydCBDbGFzcyBmcm9tICcuLi9jbGFzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IENsYXNzKHtcbiAgICAvLyBpbnN0YW5jZSBwcm9wZXJpZXMgYW5kIG1ldGhvZHNcblxufSwge1xuICAgIC8vIHN0YXRpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXG4gICAgZXh0ZW5kXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hdHJlc2hrYS9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vYmplY3QvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFnaWMuanNcbiAqKi8iLCJcbi8vIC9eKChbXkBdKylAKT8oKC4rPykoOjooW15cXChcXCldKyk/KFxcKCguKilcXCkpPyk/KT8kL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbigpIHtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb24uanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9