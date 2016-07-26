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
	
	var bindOptionalNode = __webpack_require__(74);
	
	var bindSandbox = __webpack_require__(73);
	
	var unbindNode = __webpack_require__(31);
	
	var select = __webpack_require__(71);
	
	var selectAll = __webpack_require__(72);
	
	var addListener = __webpack_require__(40);
	
	var makeObject = __webpack_require__(43);
	
	var createSpy = __webpack_require__(44);
	
	describe('Bindings', function () {
	    var obj = void 0;
	    var node = void 0;
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
	
	/* eslint-disable no-self-compare, no-confusing-arrow */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var toArray = __webpack_require__(70);
	
	var dom = __webpack_require__(14);
	
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
	
	var defs = __webpack_require__(5);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var removeListener = __webpack_require__(33);
	
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
		"./_util/toarray.js": 70,
		"./array.js": 64,
		"./binders/_classlist.js": 80,
		"./binders/attr.js": 82,
		"./binders/classname.js": 78,
		"./binders/dataset.js": 83,
		"./binders/display.js": 89,
		"./binders/html.js": 76,
		"./binders/index.js": 75,
		"./binders/input.js": 86,
		"./binders/output.js": 87,
		"./binders/progress.js": 85,
		"./binders/prop.js": 81,
		"./binders/select.js": 88,
		"./binders/style.js": 90,
		"./binders/text.js": 77,
		"./binders/textarea.js": 84,
		"./bindnode.js": 3,
		"./bindoptionalnode.js": 74,
		"./bindsandbox.js": 73,
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
		"./index.js": 65,
		"./magic.js": 68,
		"./matreshka/index.js": 66,
		"./object/index.js": 67,
		"./on.js": 69,
		"./select.js": 71,
		"./selectall.js": 72,
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(66);
	
	var MatreshkaArray = __webpack_require__(64);
	
	var MatreshkaObject = __webpack_require__(67);
	
	var Class = __webpack_require__(56);
	
	//import binders from './binders';
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	//Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 66 */
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var dom = __webpack_require__(14);
	
	var selectNodes = __webpack_require__(13);
	
	var toArray = __webpack_require__(70);
	
	var checkObjectType = __webpack_require__(9);
	
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var dom = __webpack_require__(14);
	
	var selectNodes = __webpack_require__(13);
	
	var toArray = __webpack_require__(70);
	
	var checkObjectType = __webpack_require__(9);
	
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(3);
	
	var unbindNode = __webpack_require__(31);
	
	var checkObjectType = __webpack_require__(9);
	
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(3);
	
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html = __webpack_require__(76);
	
	var display = __webpack_require__(89);
	
	var className = __webpack_require__(78);
	
	var prop = __webpack_require__(81);
	
	var attr = __webpack_require__(82);
	
	var input = __webpack_require__(86);
	
	var textarea = __webpack_require__(84);
	
	var select = __webpack_require__(88);
	
	var progress = __webpack_require__(85);
	
	var text = __webpack_require__(77);
	
	var style = __webpack_require__(90);
	
	var dataset = __webpack_require__(83);
	
	exports.html = html;
	exports.display = display;
	exports.className = className;
	exports.prop = prop;
	exports.attr = attr;
	exports.input = input;
	exports.textarea = textarea;
	exports.select = select;
	exports.progress = progress;
	exports.text = text;
	exports.style = style;
	exports.dataset = dataset;

/***/ },
/* 76 */
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
/* 77 */
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classlistJs = __webpack_require__(80);
	
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
/* 79 */,
/* 80 */
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
/* 81 */
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
/* 82 */
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
/* 83 */
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
					this.dataset[prop];
				} else {
					this.getAttribute(toDashed(prop));
				}
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(86);
	
	module.exports = textarea;
	function textarea() {
		return input('text');
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(86);
	
	module.exports = textarea;
	function textarea() {
		return input();
	}

/***/ },
/* 86 */
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
/* 87 */
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
/* 88 */
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
/* 89 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = display;
	function display() {
	    var switcher = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	    return {
	        on: null,
	        getValue: function () {
	            var value = window.getComputedStyle(this).getPropertyValue('display');
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
/* 90 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = style;
	function style(property) {
	    return {
	        on: null,
	        getValue: function () {
	            return getComputedStyle(this).getPropertyValue(property);
	        },
	        setValue: function (value) {
	            this.style[property] = value;
	        }
	    };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODM4OTI0NTFhZTZlMWYwZWY5NzkiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3Mvc3dpdGNoYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9yZW1vdmViaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3J1bm9iamVjdGhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvbWFrZW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9jcmVhdGVzcHkuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2ZpbmRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2luaXRfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ub3Rfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L29uZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX2NvbGxlY3Rpb25fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NvcmVfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19kb21fc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjIC4qXFwuanMkIiwid2VicGFjazovLy8uL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hdHJlc2hrYS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWdpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL3RvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0YWxsLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kc2FuZGJveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZG9wdGlvbmFsbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9odG1sLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL3RleHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9hdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2RhdGFzZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvdGV4dGFyZWEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvb3V0cHV0LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9kaXNwbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL3N0eWxlLmpzIl0sIm5hbWVzIjpbXSwi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Q0FBd0IsSUFBeEIsRUFBOEIsZ0JBQTlCLENBQStDLFNBQS9DLENBQWQ7QUFDQSxpQkFBTSxPQUFPLFVBQVUsTUFBdkI7QUFDQSxvQkFBTyxXQUFXLENBQUMsSUFBWixHQUFtQixJQUExQjtBQUNILFVBTkU7QUFPSCxpQkFQRyxZQU9NLEtBUE4sRUFPYTtBQUFBLGlCQUNKLEtBREksR0FDTSxJQUROLENBQ0osS0FESTs7QUFFWixpQkFBRyxRQUFILEVBQWE7QUFDVCx1QkFBTSxPQUFOLEdBQWdCLFFBQVEsRUFBUixHQUFhLE1BQTdCO0FBQ0gsY0FGRCxNQUVPO0FBQ0gsdUJBQU0sT0FBTixHQUFnQixRQUFRLE1BQVIsR0FBaUIsRUFBakM7QUFDSDtBQUNKO0FBZEUsTUFBUDtBQWdCSCxHOzs7Ozs7OztrQkNqQnVCLEs7QUFBVCxVQUFTLEtBQVQsQ0FBZSxRQUFmLEVBQXlCO0FBQ3BDLFlBQU87QUFDSCxhQUFJLElBREQ7QUFFSCxtQkFBVSxZQUFXO0FBQ2pCLG9CQUFPLGlCQUFpQixJQUFqQixFQUF1QixnQkFBdkIsQ0FBd0MsUUFBeEMsQ0FBUDtBQUNILFVBSkU7QUFLSCxtQkFBVSxVQUFTLEtBQVQsRUFBZ0I7QUFDdEIsa0JBQUssS0FBTCxDQUFXLFFBQVgsSUFBdUIsS0FBdkI7QUFDSDtBQVBFLE1BQVA7QUFTSCxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODM4OTI0NTFhZTZlMWYwZWY5NzlcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogMixcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiA0NSxcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiA0Nixcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiA0Nyxcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogNDksXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDUwLFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogNTEsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogNTIsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogNTMsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogNTQsXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDU1LFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogNTcsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogNTgsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDU5LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogNjAsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDYxLFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogNjJcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcbmltcG9ydCBiaW5kT3B0aW9uYWxOb2RlIGZyb20gJ3NyYy9iaW5kb3B0aW9uYWxub2RlJztcbmltcG9ydCBiaW5kU2FuZGJveCBmcm9tICdzcmMvYmluZHNhbmRib3gnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnc3JjL3VuYmluZG5vZGUnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICdzcmMvc2VsZWN0JztcbmltcG9ydCBzZWxlY3RBbGwgZnJvbSAnc3JjL3NlbGVjdGFsbCc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuICAgIGxldCBvYmo7XG4gICAgbGV0IG5vZGU7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgc2ltdWxhdGVEb21FdmVudDtcbiAgICBsZXQgaW5pdGlhbGl6ZUNhbGw7XG4gICAgbGV0IGRlc3Ryb3lDYWxsO1xuICAgIGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVCaW5kID0gKGtleSA9ICd4JykgPT4ge1xuICAgICAgICBvYmpba2V5XSA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9ialtrZXldKS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVVbmJpbmQgPSAoKSA9PiB7XG4gICAgICAgIG9iai54ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXonO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBleHBlY3QoZGVzdHJveUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgaW5pdGlhbGl6ZUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgZGVzdHJveUNhbGwgPSBjcmVhdGVTcHkoKTtcblxuICAgICAgICBiaW5kZXIgPSAge1xuICAgICAgICAgICAgb24oY2JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmR1bW15ZXZlbnQgPSBjYmM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUodikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemUobykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplQ2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLm9uZHVtbXlldmVudCA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICAgIGRlc3Ryb3lDYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRlYm91bmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIpO1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZCcsIGJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZDp4JywgYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChiaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdW5iaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBjb25zdCB1bmJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3VuYmluZCcsIHVuYmluZENhbGwpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQ6eCcsIHVuYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcgbm9kZSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgd3JvbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jywgd3JvbmdOb2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcga2V5IGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneScsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgd2hlbiBub2RlIGlzIG5vdCBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYWxsIHdoZW4gbmVpdGhlciBrZXkgbm9yIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmopO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBrZXktbm9kZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0sIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCB1c2luZyBhcnJheSBvZiBvYmplY3RzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlIH1dKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChvYmoubm9kZXMueCkudG9FcXVhbChub2RlKTtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShvYmouJG5vZGVzLngpXG4gICAgICAgICkudG9FcXVhbChbbm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYSBwcm9wZXJ0eSBpbiBjb250ZXh0IG9iamVjdCB3aGljaCBoYXMgaXNNSz10cnVlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBiaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KG9iai4kbm9kZXMueCkudG9CZVVuZGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueC55LnogPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW5jZWxzIGRlZXAgYmluZGluZyB3aGVuIGRlZXA9ZmFsc2Ugb3B0aW9uIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgZGVlcDogZmFsc2VcbiAgICAgICAgfSwgbm9EZWJvdW5jZUZsYWcpKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoJ3gueS56Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnkueicsICdnbycpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueCA9IG1ha2VPYmplY3QoJ3kueicsICdmb28nKTtcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgYmluZGluZyBpZiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBjb25zdCB4ID0gb2JqLng7XG5cbiAgICAgICAgb2JqLnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG5cbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3QoeC55LnopLm5vdC50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgd2luZG93LnRhcmdldCA9IG9iai54Lnk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICB4LnkueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndXNlcyBjdXN0b20gc2VsZWN0b3JzIG9uIGN1cnJlbnQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknLCAnZm9vJyk7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcblxuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94Jywgbm9kZSk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueScsICc6c2FuZGJveCBzcGFuJywgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkTm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIGNoaWxkTm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBjaGlsZE5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KGB0aHJvd3MgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlYCwgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE5vZGUob2JqLCAneCcpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdChgZG9lc24ndCB0aHJvdyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmUgYW5kIG9wdGlvbmFsPXRydWUgaXMgZ2l2ZW5gLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kTm9kZShvYmosICd4JywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSBtZXRob2Qgb2YgTWF0cmVzaGthIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE9wdGlvbmFsTm9kZShvYmosICd4Jyk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2VsZWN0cyBjaGlsZHJlbiBvZiBzYW5kYm94JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImZvb1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiZm9vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCBzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCkgc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpzYW5kYm94IHNwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCB0YWJsZScpXG4gICAgICAgICkudG9FcXVhbChudWxsKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHRhYmxlJylcbiAgICAgICAgKS50b0VxdWFsKG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KSB0YWJsZScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbXSk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggdGFibGUnKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBiaW5kIGFuZCByZWJpbmQgc2FuZGJveCB2aWEgYmluZFNhbmRib3gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFub3RoZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIG5vZGUsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIGFub3RoZXJOb2RlLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFthbm90aGVyTm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2JpbmRTYW5kYm94IHRocm93cyBhbiBlcnJvciB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmopO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL2dldG5vZGVzJztcbmltcG9ydCBzd2l0Y2hCaW5kaW5nIGZyb20gJy4vX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcnO1xuaW1wb3J0IGJpbmRTaW5nbGVOb2RlIGZyb20gJy4vX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IE1hdHJlc2hrYUVycm9yIGZyb20gJy4vX3V0aWwvbWF0cmVzaGthZXJyb3InO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4vdW5iaW5kbm9kZSc7XG5cbi8vIFRoZSBtYWluIG1ldGhvZCBvZiB0aGUgZnJhbWV3b3JrOiBiaW5kcyBhIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0byBIVE1MIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IGJpbmRlcjtcbiAgICAgICAgYmluZGVyID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgIGJpbmRlciA9IGJpbmRlciB8fCB7fTtcbiAgICBjb25zdCB7IHRlbXBvcmFyeU9wdGlvbmFsRmxhZyB9ID0gYmluZE5vZGU7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gaW5pdE1LKG9iamVjdCk7XG4gICAgY29uc3QgeyBvcHRpb25hbD10ZW1wb3JhcnlPcHRpb25hbEZsYWcsIGRlZXAsIHNpbGVudCB9ID0gZXZ0O1xuXG4gICAgZGVsZXRlIGJpbmROb2RlLnRlbXBvcmFyeU9wdGlvbmFsRmxhZztcblxuICAgIC8vIHRocm93IGVycm9yIHdoZW4ga2V5IGlzIG5vdCBnaXZlblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgYmluZGVyLCBldnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVyZ2VkRXZlbnQgPSB7fTtcblxuXG4gICAgICAgICAgICAgICAgaWYoaXRlbUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJsb2NhbFwiIGV2ZW50IChcImV2ZW50XCIga2V5IG9mIGFuIG9iamVjdClcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnQsIGl0ZW1FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY29tbW9uRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIGV2ZW50IG9iamVjdCBieSBcImdsb2JhbFwiIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBjb21tb25FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgaXRlbUJpbmRlciwgbWVyZ2VkRXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogYWNjZXB0IGtleS1ub2RlIG9iamVjdFxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlLCBiaW5kZXIpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCAkbm9kZXMgPSBnZXROb2RlcyhvYmplY3QsIG5vZGUpO1xuXG4gICAgLy8gY2hlY2sgbm9kZSBleGlzdGVuY2VcbiAgICBpZiAoISRub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6bm9kZV9taXNzaW5nJywgeyBrZXksIG5vZGUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVlcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGRlZXBQYXRoTGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGJpbmRpbmcgd2hlbiBrZXkgYXJnIGluY2x1ZGVzIGRvdHMgKGVnIFwiYS5iLmMuZFwiKVxuICAgICAgICAgICAgY29uc3QgY2hhbmdlSGFuZGxlciA9IChjaGFuZ2VFdnQgPSB7fSkgPT4gc3dpdGNoQmluZGluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUV2dCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBkZWVwUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgJG5vZGVzLFxuICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIGV2dCxcbiAgICAgICAgICAgICAgICAgICAgYmluZE5vZGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMiksXG4gICAgICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMl19YCwgY2hhbmdlSGFuZGxlcik7XG5cbiAgICAgICAgICAgIGNoYW5nZUhhbmRsZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICAvLyBpZiBvYmplY3QgaXMgTWF0cmVzaGthIGluc3RhbmNlIHRoZW4gZXh0ZW5kIFwiJG5vZGVzXCIgYW5kIFwibm9kZXNcIiBvYmplY3RzXG4gICAgICAgIGNvbnN0IHsgJG5vZGVzOiAkYWxsTm9kZXMsIG5vZGVzOiBhbGxOb2RlcyB9ID0gb2JqZWN0O1xuXG4gICAgICAgIGlmKCEkYWxsTm9kZXMgfHwgIWFsbE5vZGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJywge1xuICAgICAgICAgICAgICAgICRub2RlczogJGFsbE5vZGVzLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBhbGxOb2Rlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldICYmICRhbGxOb2Rlc1trZXldLmxlbmd0aFxuICAgICAgICAgICAgPyAkYWxsTm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG5cbiAgICAgICAgYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldWzBdO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBiaW5kaW5nIGZvciBldmVyeSBub2RlIHNlcGFyYXRlbHlcbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCAobm9kZSkgPT4gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZSxcbiAgICAgICAga2V5LFxuICAgICAgICBldnQsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgcHJvcERlZlxuICAgIH0pKTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuICAgIGxldCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIGRlZiA9IHtcbiAgICAgICAgICAgIC8vIGEgcHJvcGVydHkgbmFtZSBvZiBcImV2ZW50c1wiIG9iamVjdCBpcyBhbiBldmVudCBuYW1lXG4gICAgICAgICAgICAvLyBhbmQgYSB2YWx1ZSBpcyBhbiBhcnJheSBvZiBldmVudCBoYW5kbGVyc1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGN0eDogb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBvYmplY3QyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4YW1wbGVcIixcblx0XHRcdFx0XHRpbmZvOiB7fVxuICAgICAgICAgICAgICAgIH0gKi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBcInByb3BzXCIgY29udGFpbnMgc3BlY2lhbCBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzIChnZXR0ZXJzLCBzZXR0ZXJzIGV0YylcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV0sXG4gICAgICAgICAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBtZWRpYXRvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ3M6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RIYW5kbGVyLFxuXHRcdFx0XHRcdFx0Li4ub3RoZXIgcmVxdWlyZWQgaW5mb1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkOiBgbWske01hdGgucmFuZG9tKCl9YFxuICAgICAgICB9O1xuXG4gICAgICAgIGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TUsob2JqZWN0KSB7XG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG4gICAgaWYgKCFvYmplY3QgfHwgdHlwZSAhPT0gJ29iamVjdCcpIHtcblx0XHQvLyBUT0RPIHRocm93IG1hdHJlc2hrYUVycm9yXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZX0gY2Fubm90IGJlIHVzZWQgaW4gdGhpcyBtZXRob2RgKTtcbiAgICB9XG5cbiAgICAvLyBpZiBvYmplY3QgaGFzIF9pbml0TUsgbWV0aG9kLCBydW4gaXRcbiAgICAvLyBlbHNlIHJ1biBjb21tb25Jbml0XG4gICAgLy8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlXG4gICAgcmV0dXJuIG9iamVjdC5faW5pdE1hdHJlc2hrYSA/IG9iamVjdC5faW5pdE1hdHJlc2hrYSgpIDogY29tbW9uSW5pdChvYmplY3QpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvaW5pdC5qc1xuICoqLyIsImZ1bmN0aW9uIFBzZXVkb01hcCgpIHt9XG5cbi8vIFBzZXVkb01hcCBzaW11bGF0ZXMgV2Vha01hcCBiZWhhdmlvciB3aXRoIE8oMSkgc2VhcmNoIGNvbXBsZXhpdHlcbi8vIGl0J3MgbmVlZGVkIGZvciBASUU5IGFuZCBASUUxMFxubm9mbi5hc3NpZ24oUHNldWRvTWFwLnByb3RvdHlwZSwge1xuICAgIGdldChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5tYXRyZXNoa2FEYXRhO1xuICAgIH0sXG4gICAgc2V0KG9iaiwgZGF0YSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbWF0cmVzaGthRGF0YScsIHtcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaGFzKG9iaikge1xuICAgICAgICByZXR1cm4gJ21hdHJlc2hrYURhdGEnIGluIG9iajtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG4vLyB0aGUgZnVuY3Rpb24gZGVmaW5lcyBuZWVkZWQgZGVzY3JpcHRvciBmb3IgZ2l2ZW4gcHJvcGVydHkgXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVQcm9wKG9iamVjdCwga2V5KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIWRlZi5wcm9wc1trZXldKSB7XG4gICAgICAgIGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHNba2V5XSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBvYmplY3Rba2V5XSxcbiAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgIHNldHRlcjogbnVsbCxcbiAgICAgICAgICAgIG1lZGlhdG9yOiBudWxsLFxuICAgICAgICAgICAgYmluZGluZ3M6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmdldHRlciA/IHByb3BEZWYuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHByb3BEZWYudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5zZXR0ZXIgPyBwcm9wRGVmLnNldHRlci5jYWxsKG9iamVjdCwgdikgOiBzZXQob2JqZWN0LCBrZXksIHYsIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbVNldHRlcjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmLnByb3BzW2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGlzIGZyb20gJy4vX3V0aWwvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gc2V0cyBuZXcgdmFsdWUgZm9yIGEgcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldChvYmplY3QsIGtleSwgdmFsdWUsIGV2dCA9IHt9KSB7XG4gICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NldCcpO1xuXG4gICAgLy8gaWYgbm8ga2V5IG9yIGZhbHN5IGtleSBpcyBnaXZlblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghZGVmKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcywgZXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuICAgIGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghcHJvcERlZikge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgdmFsdWU6IHByZXZpb3VzVmFsdWUsIG1lZGlhdG9yIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gcG9zc2libGUgZmxhZ3NcbiAgICBjb25zdCB7XG4gICAgICAgIHNraXBNZWRpYXRvcixcbiAgICAgICAgZnJvbU1lZGlhdG9yLFxuICAgICAgICBmb3JjZSxcbiAgICAgICAgZm9yY2VIVE1MLFxuICAgICAgICBzaWxlbnQsXG4gICAgICAgIHNpbGVudEhUTUwsXG4gICAgICAgIHNraXBMaW5rc1xuICAgIH0gPSBldnQ7XG5cbiAgICBsZXQgbmV3VmFsdWU7XG5cbiAgICBpZiAobWVkaWF0b3IgJiYgIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSAmJiAhc2tpcE1lZGlhdG9yICYmICFmcm9tTWVkaWF0b3IpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICBuZXdWYWx1ZSA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWlzKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcblxuICAgIC8vIGFkZCB0byBldnQgb2JqZWN0IHNvbWUgdXNlZnVsIHByb3BlcnRpZXNcbiAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBzZWxmOiBvYmplY3QsXG4gICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgIGtleSxcbiAgICAgICAgaXNDaGFuZ2VkXG4gICAgfSwgZXZ0KTtcblxuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2lsZW50O1xuXG4gICAgLy8gdHJpZ2dlciBiZWZvcmVjaGFuZ2U6S0VZIGFuZCBiZWZvcmVjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlU3RyID0gJ2JlZm9yZWNoYW5nZSc7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZUV2dE5hbWUgPSBgJHtiZWZvcmVjaGFuZ2VTdHJ9OiR7a2V5fWA7XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuICAgIGlmICghc2lsZW50SFRNTCAmJiAoaXNDaGFuZ2VkIHx8IGZvcmNlIHx8IGZvcmNlSFRNTCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQmluZGluZ3NFdnROYW1lID0gYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgY2hhbmdlOktFWSBhbmQgY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ciA9ICdjaGFuZ2UnO1xuICAgICAgICBjb25zdCBjaGFuZ2VFdnROYW1lID0gYCR7Y2hhbmdlU3RyfToke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihldmVudHNbY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG4gICAgaWYgKChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFza2lwTGlua3MpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVwc0V2dE5hbWUgPSBgX2NoYW5nZTpkZXBzOiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlbGVnYXRlZEV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlck9uZShvYmplY3QsIG5hbWUpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYgKCFkZWYpIHJldHVybjtcblxuICAgIGNvbnN0IGV2ZW50cyA9IGRlZi5ldmVudHNbbmFtZV07XG5cbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBub2ZuLnNsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgICAgIGNvbnN0IGwgPSBldmVudHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBbYTEsIGEyXSA9IGFyZ3M7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgZXY7XG5cbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSB7XG4gICAgaW5mbzoge30sXG4gICAgbmFtZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qc1xuICoqLyIsImltcG9ydCBtYXRyZXNoa2FFcnJvciBmcm9tICcuL21hdHJlc2hrYWVycm9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqZWN0LCBtZXRob2QpIHtcbiAgICBjb25zdCB0eXBlb2ZPYmplY3QgPSBvYmplY3QgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygb2JqZWN0O1xuXG4gICAgaWYgKHR5cGVvZk9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbWF0cmVzaGthRXJyb3IoJ2NvbW1vbjpvYmplY3RfdHlwZScsIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZk9iamVjdCxcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcbiAqKi8iLCJjb25zdCBiaW5kaW5nRXJyb3JQcmVmaXggPSAnQmluZGluZyBlcnJvcjonO1xuXG5jb25zdCBlcnJvcnMgPSB7XG4gICAgJ2JpbmRpbmc6bm9kZV9taXNzaW5nJzogKHsga2V5LCBub2RlIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JJbmZvID0gdHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnID8gYCBUaGUgc2VsZWN0b3IgaXMgJHtub2RlfWAgOiAnJztcbiAgICAgICAgcmV0dXJuIGAke2JpbmRpbmdFcnJvclByZWZpeH0gbm9kZSBpcyBtaXNzaW5nIGZvciAke2tleX0uJHtzZWxlY3RvckluZm99YDtcbiAgICB9LFxuICAgICdiaW5kaW5nOmZhbHN5X2tleSc6ICgpID0+ICdCaW5kaW5nIGVycm9yOiBcImtleVwiIGFyZyBjYW5ub3QgYmUgZmFsc3knLFxuICAgICdiaW5kaW5nOmluc3RhbmNlX25vZGVzX21pc3NpbmcnOiAoeyAkbm9kZXMgfSkgPT4ge1xuICAgICAgICBjb25zdCBtaXNzaW5nID0gISRub2RlcyA/ICckbm9kZXMnIDogJ25vZGVzJztcbiAgICAgICAgcmV0dXJuIGAke2JpbmRpbmdFcnJvclByZWZpeH0gXCIke21pc3Npbmd9XCIgcHJvcGVydHkgb2YgTWF0cmVzaGthIGluc3RhbmNlIGlzIG1pc3NpbmcuIGBcbiAgICAgICAgICAgICsgJ0l0IG11c3QgYmUgYW4gb2JqZWN0IGFuZCBtdXN0IG5vdCBiZSByZWFzc2lnbmVkLic7XG4gICAgfSxcbiAgICAnY29tbW9uOm9iamVjdF90eXBlJzogKHsgdHlwZSwgbWV0aG9kIH0pID0+XG4gICAgICAgIGBNZXRob2QgXCIke21ldGhvZH1cIiBkb2VzIG5vdCBhY2NlcHQgJHt0eXBlfSBhcyB0YXJnZXQgb2JqZWN0YFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG4gICAgY29uc3QgZ2V0RXJyb3IgPSBlcnJvcnNba2V5XTtcbiAgICBpZiAoIWdldEVycm9yKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yc1trZXldKGRhdGEpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlLCBuby1jb25mdXNpbmctYXJyb3cgKi9cbi8vIGRldGVybWluZXMgd2hldGhlciB0d28gdmFsdWVzIGFyZSB0aGUgc2FtZSB2YWx1ZVxuY29uc3QgaXNQb2x5ZmlsbCA9ICh2MSwgdjIpID0+XG4gICAgdjEgPT09IDAgJiYgdjIgPT09IDAgPyAxIC8gdjEgPT09IDEgLyB2MiA6IHYxICE9PSB2MSAmJiB2MiAhPT0gdjIgfHwgdjEgPT09IHYyO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuaXMgfHwgaXNQb2x5ZmlsbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2lzLmpzXG4gKiovIiwiaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vc2VsZWN0bm9kZXMnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJ1xuXG5jb25zdCBodG1sUmVnID0gLzwvO1xuY29uc3QgY3VzdG9tU2VsZWN0b3JSZWcgPSAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS87XG5cbi8vIFRPRE8gd3JpdGUgZGVzY3JpcHRpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBsZXQgbm9kZXM7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09ICdzdHJpbmcnICYmICFodG1sUmVnLnRlc3Qoc2VsZWN0b3IpICYmIGN1c3RvbVNlbGVjdG9yUmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgIG5vZGVzID0gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZXMgPSBkb20uJChzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2dldG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuLi9fdXRpbC90b2FycmF5JztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yUmVnID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLztcblxuLy8gVE9ETyBhZGQgZGVzY3JpcHRpb25cbi8vIFRPRE8gdGhpcyBmdW5jdGlvbiBsb29rcyBub3QgZ29vZCwgaXQgbmVlZHMgdG8gYmUgcmVmYWN0b3JlZCBhbmQgYWNjZWxlcmF0ZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdE5vZGVzKG9iamVjdCwgZ2l2ZW5TZWxlY3Rvcikge1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZnMuZ2V0KG9iamVjdCk7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gZ2l2ZW5TZWxlY3Rvci5zcGxpdCgnLCcpO1xuICAgIGxldCByZXN1bHQgPSBkb20uJCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHNlbGVjdG9ycywgc2VsZWN0b3IgPT4ge1xuICAgICAgICBjb25zdCBleGVjUmVzdWx0ID0gY3VzdG9tU2VsZWN0b3JSZWcuZXhlYyhzZWxlY3Rvcik7XG4gICAgICAgIGlmKGV4ZWNSZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kS2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG4gICAgICAgICAgICBjb25zdCBwcm9wRGVmID0gcHJvcHNbYm91bmRLZXldO1xuXG4gICAgICAgICAgICBpZihwcm9wRGVmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcbiAgICAgICAgICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3VuZE5vZGVzID0gQXJyYXkoYmluZGluZ3MubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoYmluZGluZywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmROb2Rlc1tpXSA9IGJpbmRpbmcubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIHBhc3NlZCBhZnRlciA6Ym91bmQoS0VZKSBpcyBub3QgZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBleGFtcGxlIFwiOmJvdW5kKEtFWSkgLm15LXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgY29udGFpbnMgY2hpbGRyZW4gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciBleGFtcGxlIFwiOmJvdW5kKEtFWSkgPiAubXktc2VsZWN0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlNlbGVjdG9yLmluZGV4T2YoJz4nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGluZyBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChib3VuZE5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5kb21BdHRyID0gYG0ke01hdGgucmFuZG9tKCl9YC5yZXBsYWNlKCcuJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShyYW5kb21BdHRyLCByYW5kb21BdHRyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3JhbmRvbUF0dHJ9PVwiJHtyYW5kb21BdHRyfVwiXSAke3N1YlNlbGVjdG9yfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGRvZXNuJ3QgY29udGFpbiBjaGlsZHJlbiBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChib3VuZE5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzdWJTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQodG9BcnJheShzZWxlY3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGlzIGVtcHR5IHN0cmluZyBqdXN0IGFkZCBib3VuZCBub2RlcyB0byByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoYm91bmROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBpdCdzIG5hdGl2ZSBzZWxlY3RvciAobm8gY3VzdG9tIHRoaW5ncylcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHREb2xsYXIgZnJvbSAnLi9kZWZhdWx0LWRvbGxhcic7XG5cbmNvbnN0IGRvbSA9IHtcbiAgICAkOiBkZWZhdWx0RG9sbGFyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkb207XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2luZGV4LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cbmltcG9ydCBiUXVlcnkgZnJvbSAnLi4vYnF1ZXJ5JztcblxuY29uc3QgbmVlZGVkTWV0aG9kcyA9ICdvbiBvZmYgaXMgYWRkIG5vdCBmaW5kJy5zcGxpdCgvXFxzLyk7XG5cbmNvbnN0IGdsb2JhbERvbGxhciA9IHR5cGVvZiAkID09PSAnZnVuY3Rpb24nID8gJCA6IG51bGw7XG5sZXQgdXNlR2xvYmFsRG9sbGFyID0gdHJ1ZTtcblxuaWYgKGdsb2JhbERvbGxhcikge1xuICAgIGNvbnN0IGZuID0gZ2xvYmFsRG9sbGFyLmZuIHx8IGdsb2JhbERvbGxhci5wcm90b3R5cGU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZWVkZWRNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZm5bbmVlZGVkTWV0aG9kc1tpXV0pIHtcbiAgICAgICAgICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdsb2JhbERvbGxhci5wYXJzZUhUTUwpIHtcbiAgICAgICAgZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCA9IGJRdWVyeS5wYXJzZUhUTUw7XG4gICAgfVxufSBlbHNlIHtcbiAgICB1c2VHbG9iYWxEb2xsYXIgPSBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlR2xvYmFsRG9sbGFyID8gZ2xvYmFsRG9sbGFyIDogYlF1ZXJ5O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2RvbS9kZWZhdWx0LWRvbGxhci5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IHBhcnNlSFRNTCBmcm9tICcuL3BhcnNlaHRtbCc7XG5pbXBvcnQgb25lIGZyb20gJy4vb25lJztcbmltcG9ydCBjcmVhdGUgZnJvbSAnLi9jcmVhdGUnO1xuaW1wb3J0IG9uIGZyb20gJy4vb24nO1xuaW1wb3J0IG9mZiBmcm9tICcuL29mZic7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5pbXBvcnQgYWRkIGZyb20gJy4vYWRkJztcbmltcG9ydCBub3QgZnJvbSAnLi9ub3QnO1xuaW1wb3J0IGZpbmQgZnJvbSAnLi9maW5kJztcblxuLy8gdGlueSBqUXVlcnkgcmVwbGFjZW1lbnQgZm9yIE1hdHJlc2hrYVxuLy8gYlF1ZXJ5IGlzIHJld3JpdHRlbiB2ZXJzaW9uIG9mIGJhbGFsYWlrYS5qc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYlF1ZXJ5KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KHNlbGVjdG9yLCBjb250ZXh0KTtcbn1cblxubm9mbi5hc3NpZ24oYlF1ZXJ5LCB7XG4gICAgZm46IEluaXQucHJvdG90eXBlLFxuICAgIGV4dGVuZCxcbiAgICBwYXJzZUhUTUwsXG4gICAgb25lLFxuICAgIGNyZWF0ZVxufSk7XG5cbm5vZm4uYXNzaWduKGJRdWVyeS5mbiwge1xuICAgIG9uLFxuICAgIG9mZixcbiAgICBpcyxcbiAgICBhZGQsXG4gICAgbm90LFxuICAgIGZpbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGh0bWwybm9kZUxpc3QgZnJvbSAnLi9faHRtbDJub2RlbGlzdCc7XG5cbi8vIGZ1bmN0aW9uLWNvbnN0cnVjdG9yIG9mIGJRdWVyeSBsaWJyYXJ5XG4vLyBhY2NlcHRzIG1hbnkga2luZHMgb2YgYXJndW1lbnRzIChzZWxlY3RvciwgaHRtbCwgZnVuY3Rpb24pXG5mdW5jdGlvbiBCUXVlcnlJbml0KHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgc2VsZWN0b3IgPT09IHdpbmRvdykge1xuICAgICAgICAgICAgcmVzdWx0ID0gW3NlbGVjdG9yXTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoLzwvLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gaHRtbDJub2RlTGlzdChzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NvbnRleHQgPSAobmV3IEJRdWVyeUluaXQoY29udGV4dCkpWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXdDb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAvLyB0eXBlb2Ygbm9kZUxpc3QgcmV0dXJucyBcImZ1bmN0aW9uXCIgaW4gb2xkIFdlYktpdFxuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgc2VsZWN0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gc2VsZWN0b3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBsZW5ndGggPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKHJlc3VsdFtpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkJRdWVyeUluaXQucHJvdG90eXBlID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IEJRdWVyeUluaXQ7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2luaXQuanNcbiAqKi8iLCIvLyBjb252ZXJ0cyBIVE1MIHN0cmluZyB0byBOb2RlTGlzdCBpbnN0YW5jZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaHRtbDJub2RlTGlzdChnaXZlbkhUTUwpIHtcbiAgICAvLyB3cmFwTWFwIGlzIHRha2VuIGZyb20galF1ZXJ5XG4gICAgY29uc3Qgd3JhcE1hcCA9IHtcbiAgICAgICAgb3B0aW9uOiBbMSwgJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsICc8L3NlbGVjdD4nXSxcbiAgICAgICAgbGVnZW5kOiBbMSwgJzxmaWVsZHNldD4nLCAnPC9maWVsZHNldD4nXSxcbiAgICAgICAgdGhlYWQ6IFsxLCAnPHRhYmxlPicsICc8L3RhYmxlPiddLFxuICAgICAgICB0cjogWzIsICc8dGFibGU+PHRib2R5PicsICc8L3Rib2R5PjwvdGFibGU+J10sXG4gICAgICAgIHRkOiBbMywgJzx0YWJsZT48dGJvZHk+PHRyPicsICc8L3RyPjwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgY29sOiBbMiwgJzx0YWJsZT48dGJvZHk+PC90Ym9keT48Y29sZ3JvdXA+JywgJzwvY29sZ3JvdXA+PC90YWJsZT4nXSxcbiAgICAgICAgYXJlYTogWzEsICc8bWFwPicsICc8L21hcD4nXSxcbiAgICAgICAgXzogWzAsICcnLCAnJ11cbiAgICB9O1xuXG4gICAgY29uc3QgaHRtbCA9IGdpdmVuSFRNTC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgbGV0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsZXQgaTtcblxuICAgIHdyYXBNYXAub3B0Z3JvdXAgPSB3cmFwTWFwLm9wdGlvbjtcbiAgICB3cmFwTWFwLnRib2R5ID0gd3JhcE1hcC50Zm9vdCA9IHdyYXBNYXAuY29sZ3JvdXAgPSB3cmFwTWFwLmNhcHRpb24gPSB3cmFwTWFwLnRoZWFkO1xuICAgIHdyYXBNYXAudGggPSB3cmFwTWFwLnRkO1xuXG4gICAgY29uc3QgZXggPSAvPChbXFx3Ol0rKS8uZXhlYyhodG1sKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZXggJiYgd3JhcE1hcFtleFsxXV0gfHwgd3JhcE1hcC5fO1xuXG4gICAgbm9kZS5pbm5lckhUTUwgPSB3cmFwcGVyWzFdICsgaHRtbCArIHdyYXBwZXJbMl07XG5cbiAgICBpID0gd3JhcHBlclswXTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGUuY2hpbGROb2Rlcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1xuICoqLyIsIi8vIE9iamVjdC5hc3NpZ24gcG9seWZ5bGwgaXMgdGFrZW4gdGhlcmU6XG4vLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduI1BvbHlmaWxsXG4vLyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIGZ1dHVyZVxuXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQpIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAxOyBpbmRleCA8IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3Qgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIHNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBuZXh0S2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkobmV4dEtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0W25leHRLZXldID0gc291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ247XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9leHRlbmQuanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcbmltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBwYXJzZXMgZ2l2ZW4gSFRNTCBhbmQgcmV0dXJucyBiUXVlcnkgKEJRdWVyeUluaXQpIGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBuZXcgSW5pdChodG1sMm5vZGVMaXN0KGh0bWwpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gcmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiBtYXRjaGVkIHNldFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb25lKHMsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQocywgY29udGV4dClbMF07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvb25lLmpzXG4gKiovIiwiLy8gY3JlYXRlcyBIVE1MIGVsZW1lbnRcbi8vIFRPRE8gZ2V0IHJpZCBvZiBpdFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlKHRhZ05hbWUsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiB0YWdOYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwcm9wcyA9IHRhZ05hbWU7XG4gICAgICAgIHRhZ05hbWUgPSBwcm9wcy50YWdOYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhdHRyaWJ1dGVzJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JPd24odmFsdWUsIChhdHRyVmFsdWUsIGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2hpbGRyZW4nICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKHZhbHVlLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY3JlYXRlKGNoaWxkKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsW2tleV0gJiYgdHlwZW9mIGVsW2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmFzc2lnbihlbFtrZXldLCB2YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSAhPT0gJ3RhZ05hbWUnKSB7XG4gICAgICAgICAgICAgICAgZWxba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvY3JlYXRlLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XG5cbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIHdoZW4gYSBzZWxlY3RvciBpcyBnaXZlblxuZnVuY3Rpb24gZGVsZWdhdGVIYW5kbGVyKGV2dCwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCByYW5kb21JRCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5yZXBsYWNlKCcwLicsICd4Jyk7XG4gICAgY29uc3Qgc2NvcGVTZWxlY3RvciA9IGBbJHtyYW5kb21JRH09XCIke3JhbmRvbUlEfVwiXSBgO1xuICAgIGNvbnN0IHNwbGl0dGVkU2VsZWN0b3IgPSBzZWxlY3Rvci5zcGxpdCgnLCcpO1xuXG4gICAgbGV0IG1hdGNoaW5nID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0dGVkU2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VsID0gc3BsaXR0ZWRTZWxlY3RvcltpXTtcbiAgICAgICAgbWF0Y2hpbmcgKz0gYCR7aSA9PT0gMCA/ICcnIDogJywnfSR7c2NvcGVTZWxlY3Rvcn0ke3NlbH0sJHtzY29wZVNlbGVjdG9yfSR7c2VsfSAqYDtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKHJhbmRvbUlELCByYW5kb21JRCk7XG5cbiAgICBpZiAoaXMuY2FsbChbZXZ0LnRhcmdldF0sIG1hdGNoaW5nKSkge1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZ0KTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShyYW5kb21JRCk7XG59XG5cbi8vIGFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gYSBzZXQgb2YgZWxlbW50c1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24obmFtZXNTdHIsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lc1N0ci5zcGxpdCgvXFxzLyk7XG4gICAgbGV0IGRlbGVnYXRlO1xuXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGRlbGVnYXRlID0gZnVuY3Rpb24gdW5pcXVlRGVsZWdhdGVIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgZGVsZWdhdGVIYW5kbGVyLmNhbGwodGhpcywgZXZ0LCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gZGF0YS5hbGxFdmVudHNbbmFtZSArIG5vZGVJRF0gPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSB8fCBbXTtcblxuICAgICAgICAgICAgbGV0IGV4aXN0ID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBldmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcblxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09PSBldmVudC5oYW5kbGVyICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKSkge1xuICAgICAgICAgICAgICAgICAgICBleGlzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFleGlzdCkge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZWdhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBkZWxlZ2F0ZSB8fCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbi5qc1xuICoqLyIsIi8vIHNoYXJlIGRhdGEgYmV0d2VlbiBhcyBhbiBvYmplY3QgbW9kdWxlcyBiZWNhdXNlIHdlIHVzZVxuLy8gc2ltcGxpZmllZCBlcyBtb2R1bGVzIHRoZXJlIGFuZCBjYW5ub3QgaW1wb3J0IGFuZCBzaGFyZSBhIG51bWJlclxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5vZGVJbmRleDogMCxcbiAgICBhbGxFdmVudHM6IHt9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19kYXRhLmpzXG4gKiovIiwiLy8gY2hlY2sgdGhlIGZpcnN0IGVsZW1lbnQgZnJvbSBnaXZlbiBzZXQgYWdhaW5zdCBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpcyhzKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXNbMF07XG4gICAgcmV0dXJuIG5vZGVcbiAgICAgICAgPyAobm9kZS5tYXRjaGVzXG4gICAgICAgICAgICB8fCBub2RlLndlYmtpdE1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tb3pNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUubXNNYXRjaGVzU2VsZWN0b3JcbiAgICAgICAgICAgIHx8IG5vZGUub01hdGNoZXNTZWxlY3RvcikuY2FsbChub2RlLCBzKSA6IGZhbHNlO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2lzLmpzXG4gKiovIiwiaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIHJlbW92ZXMgZXZlbnQgaGFuZGxlciBmcm9tIGEgc2V0IG9mIGVsZW1lbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvZmYobmFtZXMsIHNlbGVjdG9yLCBoYW5kbGVyKSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBoYW5kbGVyID0gc2VsZWN0b3I7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgc2VsZWN0b3IgPSBudWxsOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIH1cblxuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoL1xccy8pO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmFtZSA9IG5hbWVzW2ldLnNwbGl0KC9cXC4oLispLyk7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5hbWVbMV07XG4gICAgICAgIG5hbWUgPSBuYW1lWzBdO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbal07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZS5iJF07XG5cbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1trXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuZGVsZWdhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoIW5hbWVzcGFjZSB8fCBuYW1lc3BhY2UgPT09IGV2ZW50Lm5hbWVzcGFjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09IGV2ZW50LnNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBldmVudC5kZWxlZ2F0ZSB8fCBldmVudC5oYW5kbGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cy5zcGxpY2Uoay0tLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFuYW1lc3BhY2UgJiYgIXNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vZmYuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcbmltcG9ydCBkYXRhIGZyb20gJy4vX2RhdGEnO1xuXG4vLyBhZGRzIHVuaXF1ZSBub2RlcyB0byBiUXVlcnkgY29sbGVjdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgaWRNYXAgPSB7fTtcblxuICAgIGxldCByZXN1bHQ7XG5cbiAgICBzZWxlY3RvciA9IG5ldyBJbml0KHNlbGVjdG9yKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBuZXcgSW5pdCh0aGlzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSByZXN1bHRbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gc2VsZWN0b3JbaV07XG4gICAgICAgICAgICBjb25zdCBub2RlSUQgPSBub2RlLmIkID0gbm9kZS5iJCB8fCArK2RhdGEubm9kZUluZGV4O1xuICAgICAgICAgICAgaWYgKCFpZE1hcFtub2RlSURdKSB7XG4gICAgICAgICAgICAgICAgaWRNYXBbbm9kZUlEXSA9IDE7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2FkZC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyBleGNsdWRlcyBlbGVtZW50cyBmcm9tIGN1cnJlbnQgc2V0IGJ5IGdpdmVuIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub3Qoc2VsZWN0b3IpIHtcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghbmV3IEluaXQodGhpc1tpXSkuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvbm90LmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGdldCB0aGUgZGVzY2VuZGFudHMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBjdXJyZW50IHNldCBvZiBtYXRjaGVkIGVsZW1lbnRzLFxuLy8gZmlsdGVyZWQgYnkgYSBzZWxlY3RvclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmluZChzZWxlY3Rvcikge1xuICAgIGxldCByZXN1bHQgPSBuZXcgSW5pdCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHRoaXMsIGVsID0+IHtcbiAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZChlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L2ZpbmQuanNcbiAqKi8iLCJpbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuLi91bmJpbmRub2RlJztcbi8vIHJlLWFkZHMgYmluZGluZyB3aGVuIG9iamVjdCBicmFuY2ggaXMgY2hhbmdlZFxuLy8gdGhlIGZ1bmN0aW9uIGlzIGNhbGxlZCBieSBiaW5kTm9kZSB3aGVuIHNvbWV0aGluZyBsaWtlXG4vLyAnZm9vLmJhci5iYXonIGlzIHBhc3NlZCB0byBpdCBhcyBrZXkgYXJnIHZhbHVlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzd2l0Y2hCaW5kaW5nKHtcbiAgICBjaGFuZ2VFdnQsXG4gICAgb2JqZWN0LFxuICAgIGRlZXBQYXRoLFxuICAgICRub2RlcyxcbiAgICBiaW5kZXIsXG4gICAgZXZ0LFxuICAgIGJpbmROb2RlXG59KSB7XG4gICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG4gICAgbGV0IHsgdmFsdWU6IHRhcmdldCB9ID0gY2hhbmdlRXZ0O1xuICAgIGNvbnN0IHsgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNUYXJnZXQgfSA9IGNoYW5nZUV2dDtcblxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldCA9IG9iamVjdDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWVwUGF0aExlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgJG5vZGVzLCBiaW5kZXIsIGV2dCk7XG5cbiAgICAvLyByZW1vdmUgYmluZGluZyBmb3IgcHJldmlvdXNseSB1c2VkIG9iamVjdFxuICAgIGlmIChwcmV2aW91c1RhcmdldCAmJiB0eXBlb2YgcHJldmlvdXNUYXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuYmluZE5vZGUocHJldmlvdXNUYXJnZXQsIGRlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMV0sICRub2Rlcyk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcbmltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZ2V0Tm9kZXMgZnJvbSAnLi9fYmluZGluZ3MvZ2V0bm9kZXMnO1xuaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVCaW5kaW5nIGZyb20gJy4vX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBldnQpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBldnQgPSBub2RlO1xuICAgICAgICBub2RlID0ga2V5O1xuICAgICAgICBrZXkgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAndW5iaW5kTm9kZScpO1xuICAgIH1cblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZih0eXBlb2Yga2V5WzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjY2VwdCBhcnJheSBvZiBrZXlzXG4gICAgICAgICAgICAgKiB0aGlzLnVuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksIGl0ZW1LZXkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIG5vZGUsIGV2dCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIGFjZXB0IGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbeyBrZXksIG5vZGUsIGJpbmRlciwgZXZlbnQgfV0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCAoe1xuICAgICAgICAgICAgICAgIGtleTogaXRlbUtleSxcbiAgICAgICAgICAgICAgICBub2RlOiBpdGVtTm9kZVxuICAgICAgICAgICAgfSkgPT4ge1xuICAgICAgICAgICAgICAgIHVuYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgbm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBhY2NlcHQga2V5LW5vZGUgb2JqZWN0XG4gICAgICogdGhpcy5iaW5kTm9kZSh7IGtleTogJCgpIH0sIHsgb246ICdldnQnIH0sIHsgc2lsZW50OiB0cnVlIH0pO1xuICAgICAqL1xuICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gdW5iaW5kTm9kZShvYmplY3QsIGtleU9iaktleSwga2V5T2JqVmFsdWUsIG5vZGUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cblxuICAgIGV2dCA9IGV2dCB8fCB7fTtcbiAgICBjb25zdCB7IGRlZXAgfSA9IGV2dCB8fCB7fTtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYoIWRlZikge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZjtcblxuICAgIC8vIGFsbG93IHRvIHBhc3MgbnVsbCBvciB1bmRlZmluZWQgYXMga2V5XG4gICAgLy8gaWYgcGFzc2VkIHRoZW4gcmVtb3ZlIGJpbmRpbmdzIG9mIGFsbCBrZXlzIGZvciBnaXZlbiBvYmplY3RcbiAgICBpZihrZXkgPT09IG51bGwgfHwgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24ocHJvcHMsIChwcm9wc0l0ZW0sIGtleSkgPT4ge1xuICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGtleSwgbnVsbCwgZXZ0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZGVsZWdhdGVkIGJpbmRpbmdcbiAgICBpZihkZWVwICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBkZWVwUGF0aCA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcblxuICAgICAgICBpZiAoZGVlcFBhdGhMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gb2JqZWN0O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyBkbyB3ZSBuZWVkIHRvIHRocm93IGVycm9yIHdoZW4gdGFyZ2V0IGlzIGZhbHN5P1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldFtkZWVwUGF0aFtpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRPRE8gQlVHIHRoaXMgbWF5IHVuZGVsZWdhdGUgbGlzdGVuZXIgZm9yIGFsbCBiaW5kaW5ncyB3aXRoIHRoZSBzYW1lIHBhdGggKGNhbm5vdCByZXByb2R1Y2UpXG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBkZWVwUGF0aC5zbGljZSgwLCBkZWVwUGF0aExlbmd0aCAtIDIpLFxuICAgICAgICAgICAgICAgIGBfY2hhbmdlOnRyZWU6JHtkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDJdfWApO1xuXG4gICAgICAgICAgICB1bmJpbmROb2RlKHRhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgbm9kZSwgZXZ0KTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyB3aGVuIG5vIHByb3BkZWYgZG8gbm90aGluZ1xuICAgIGlmKCFwcm9wRGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgIC8vIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0IGhhdmUgYW55IGJpbmRpbmdzIGRvIG5vdGhpbmdcbiAgICBpZighYmluZGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBub2RlIGlzIHBhc2VkIHJlbW92ZSBhbGwgYmluZGluZ3MgZm9yIGdpdmVuIGtleVxuICAgIGlmKCFub2RlKSB7XG4gICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgYmluZGluZyA9PiB7XG4gICAgICAgICAgICByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2dCB9LCBiaW5kaW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG5cbiAgICAgICAgLy8gdXBkYXRlIG5vZGVzIGFuZCAkbm9kZXMgZm9yIE1hdHJlc2hrYSBpbnN0YW5jZVxuICAgICAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3Qubm9kZXNba2V5XVxuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC4kbm9kZXNba2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgJG5vZGVzID0gZ2V0Tm9kZXMob2JqZWN0LCBub2RlKTtcbiAgICBjb25zdCByZXRhaW5CaW5kaW5ncyA9IFtdO1xuICAgIGNvbnN0IHJldGFpbk5vZGVzID0gW107XG5cbiAgICAvLyBpdGVyYXRlIG92ZXIgYWxsIGJpbmRuZ3MgYW5kIGNvbXBhcmUgdGhlaXIgbm9kZSB3aXRoIGdpdmVuIG5vZGVzXG4gICAgbm9mbi5mb3JFYWNoKCRub2Rlcywgbm9kZXNJdGVtID0+IHtcbiAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIGlmKGJpbmRpbmcubm9kZSA9PT0gbm9kZXNJdGVtKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldnQgfSwgYmluZGluZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldGFpbkJpbmRpbmdzLnB1c2goYmluZGluZyk7XG4gICAgICAgICAgICAgICAgcmV0YWluTm9kZXMucHVzaChub2Rlc0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHVwZGF0ZSBub2RlcyBhbmQgJG5vZGVzIGZvciBNYXRyZXNoa2EgaW5zdGFuY2VcbiAgICBpZiAob2JqZWN0LmlzTUspIHtcbiAgICAgICAgaWYocmV0YWluTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBvYmplY3Qubm9kZXNba2V5XSA9IHJldGFpbk5vZGVzWzBdO1xuICAgICAgICAgICAgb2JqZWN0LiRub2Rlc1trZXldID0gZG9tLiQocmV0YWluTm9kZXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC5ub2Rlc1trZXldXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LiRub2Rlc1trZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGJpbmRpbmdzIG9iamVjdFxuICAgIGlmKHJldGFpbkJpbmRpbmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9wRGVmLmJpbmRpbmdzID0gcmV0YWluQmluZGluZ3M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcERlZi5iaW5kaW5ncyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gb2JqZWN0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdW5iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4vcmVtb3ZlbGlzdGVuZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBnaXZlblBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHtcblx0XHRyZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gZGVmO1xuXG4gICAgbGV0IHBhdGggPSB0eXBlb2YgZ2l2ZW5QYXRoID09PSAnc3RyaW5nJyAmJiBnaXZlblBhdGggIT09ICcnID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBnaXZlblBhdGg7XG5cbiAgICBpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG5vIHBhdGggdGhlbiByZW1vdmUgbGlzdGVuZXJcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZWxzZSBkbyBhbGwgbWFnaWNcbiAgICAgICAgY29uc3Qga2V5ID0gcGF0aFswXTtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZSA9IGBfY2hhbmdlOmRlbGVnYXRlZDoke2tleX1gO1xuICAgICAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG4gICAgICAgIGxldCBwYXRoU3RyO1xuXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICBjb25zdCByZXRhaW4gPSBbXTtcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChldmVudHMsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuaW5mby5wYXRoU3RyICE9PSBwYXRoU3RyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV0gPSByZXRhaW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhbGxFdmVudHNbY2hhbmdlRGVsZWdhdGVkRXZ0TmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIG9iamVjdFtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iamVjdFtrZXldLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3VuZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsIi8qIGVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJuYW1lXCIsIFwiZXZlbnRzXCJdIH1dKi9cbmltcG9ydCBkZWZzIGZyb20gJy4uL19jb3JlL2RlZnMnO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi90cmlnZ2Vyb25lJztcblxuLy8gcmVtb3ZlcyBzaW1wbGUgZXZlbnQgbGlzdGVuZXIgdG8gYW4gb2JqZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIGRlZmluaXRpb24gZG8gbm90aGluZ1xuICAgIGlmICghZGVmKSByZXR1cm47XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgIGNvbnN0IG5vVHJpZ2dlciA9IG5hbWUgPyBuYW1lWzBdID09PSAnXycgOiBmYWxzZTtcblxuICAgIC8vIGlmIGFsbCBldmVudHMgbmVlZCB0byBiZSByZW1vdmVkXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgbm9mbi5mb3JPd24oYWxsRXZlbnRzLCAoZXZlbnRzLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlRXZ0RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogZXZ0LmNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXN0b3JlIGRlZmF1bHQgdmFsdWUgb2YgXCJldmVudHNcIlxuICAgICAgICBkZWYuZXZlbnRzID0ge307XG4gICAgfSBlbHNlIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgZXZlbnRzIHdpdGggZ2l2ZW4gbmFtZSBhcmUgZm91bmRcbiAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZ0ID0+IHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIChjYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrICYmIGNhbGxiYWNrLl9jYWxsYmFjayAhPT0gZXZ0LmNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHx8IChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2dC5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIC8vIGtlZXAgZXZlbnRcbiAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZXZ0LmNhbGxiYWNrLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vVHJpZ2dlcikge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYHJlbW92ZWV2ZW50OiR7bmFtZX1gLCByZW1vdmVFdnREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdyZW1vdmVldmVudCcsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IHJldGFpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSBkZWYuZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5cbmNvbnN0IHNwYWNlUmVnID0gL1xccysvO1xuXG4vLyB0aGUgZnVuY3Rpb24gcmVtb3ZlcyBzaW5nbGUgYmluZGluZyBmb3Igc2luZ2xlIG9iamVjdFxuLy8gY2FsbGVkIGJ5IHVuYmluZE5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZ0IH0sIHtcbiAgICBvcHRpb25zLFxuICAgIGJpbmRlcixcbiAgICBub2RlLFxuICAgIG5vZGVIYW5kbGVyLFxuICAgIG9iamVjdEhhbmRsZXJcbn0pIHtcbiAgICBjb25zdCB7IGRlc3Ryb3ksIG9uIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgeyBzaWxlbnQgfSA9IGV2dDtcblxuICAgIC8vIGlmIFwib25cIiBpcyBmdW5jdGlvbiBkaXNhYmxlIGl0XG4gICAgLy8gd2UgY2Fubm90IHR1cm4gb2ZmIGN1c3RvbSBsaXN0ZW5lciBkZWZpbmVkIGJ5IGEgcHJvZ3JhbW1lclxuICAgIC8vIHByb2dyYW1tZXIgbmVlZHMgdG8gcmVtb3ZlIGN1c3RvbSBsaXN0ZW5lciBtYXVhbGx5IHZpYSBiaW5kZXIuZGVzdHJveVxuICAgIGlmICh0eXBlb2Ygb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbm9kZUhhbmRsZXIuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uID09PSAnc3RyaW5nJyl7XG4gICAgICAgIC8vIHJlbW92ZSBET00gZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgLy8gcmVtb3ZlRXZlbnRMaXN0ZW5lciBpcyBmYXN0ZXIgdGhhbiBcIm9uXCIgbWV0aG9kIGZyb20gYW55IERPTSBsaWJyYXJ5XG4gICAgICAgIG5vZm4uZm9yRWFjaChvbi5zcGxpdChzcGFjZVJlZyksXG4gICAgICAgICAgICBldnROYW1lID0+IG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnROYW1lLCBub2RlSGFuZGxlcikpO1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBvYmplY3QgZXZlbnQgbGlzdGVuZXJcbiAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIGBfY2hhbmdlOmJpbmRpbmdzOiR7a2V5fWAsIG9iamVjdEhhbmRsZXIpO1xuXG4gICAgLy8gaWYgYmluZGVyLmRlc3Ryb3kgaXMgZ2l2ZW4gY2FsbCBpdFxuICAgIGlmIChkZXN0cm95KSB7XG4gICAgICAgIGRlc3Ryb3kuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZGVkRXZ0ID0gbm9mbi5hc3NpZ24oe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICB9LCBldnQpO1xuXG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgdW5iaW5kOiR7a2V5fWAsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICd1bmJpbmQnLCBleHRlbmRlZEV2dCk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQgbG9va0ZvckJpbmRlciBmcm9tICcuL2xvb2tmb3JiaW5kZXInO1xuaW1wb3J0IHJ1bk5vZGVIYW5kbGVyIGZyb20gJy4vcnVubm9kZWhhbmRsZXInO1xuaW1wb3J0IHJ1bk9iamVjdEhhbmRsZXIgZnJvbSAnLi9ydW5vYmplY3RoYW5kbGVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4uL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi4vX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnLi4vX3V0aWwvZGVib3VuY2UnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG5jb25zdCBzcGFjZVJlZyA9IC9cXHMrLztcblxuLy8gaGFuZGxlcyBiaW5kaW5nIGZvciBzaW5nbGUgcHJvcGVydHkgJiBub2RlXG4vLyB0aGUgZnVuY3Rpb24gaXMgdXNlZCBhdCBiaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgYmluZGVyOiBnaXZlbkJpbmRlcixcbiAgICBrZXksXG4gICAgJG5vZGVzLFxuICAgIG5vZGUsXG4gICAgZXZ0LFxuICAgIHByb3BEZWZcbn0pIHtcbiAgICBjb25zdCB7XG4gICAgICAgIHNpbGVudCxcbiAgICAgICAgYXNzaWduRGVmYXVsdFZhbHVlLFxuICAgICAgICBkZWJvdW5jZTogZGVib3VuY2VPcHRpb25cbiAgICB9ID0gZXZ0O1xuICAgIC8vIGNyZWF0ZSBiaW5kaW5ncyBhcnJheSBpbiBwcm9wZXJ0eSBkZWZpbml0aW9uIG9iamVjdFxuICAgIGNvbnN0IGJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyA9IHByb3BEZWYuYmluZGluZ3MgfHwgW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICBsZXQgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBzZWxmOiBvYmplY3QsXG4gICAgICAgIGtleSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZVxuICAgIH07XG4gICAgbGV0IGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcbiAgICBsZXQgYmluZGVyO1xuICAgIGxldCBvYmplY3RIYW5kbGVyO1xuICAgIGxldCBub2RlSGFuZGxlcjtcblxuICAgIC8vIGdldCBhY3R1YWwgYmluZGVyXG4gICAgaWYgKGdpdmVuQmluZGVyICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kQmluZGVyID0gbG9va0ZvckJpbmRlcihub2RlKTtcblxuICAgICAgICBpZiAoZm91bmRCaW5kZXIpIHtcbiAgICAgICAgICAgIGlmIChnaXZlbkJpbmRlcikge1xuICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKGZvdW5kQmluZGVyLCBnaXZlbkJpbmRlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJpbmRlciA9IGZvdW5kQmluZGVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmluZGVyID0gZ2l2ZW5CaW5kZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB7IGdldFZhbHVlLCBzZXRWYWx1ZSwgb24sIGluaXRpYWxpemUgfSA9IGJpbmRlcjtcblxuICAgIC8vIGNhbGwgYmluZGVyLmluaXRpYWxpemVcbiAgICBpZiAoaW5pdGlhbGl6ZSkge1xuICAgICAgICBpbml0aWFsaXplLmNhbGwobm9kZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gY2FsbHMgZ2V0VmFsdWUgaW1tZWRpYXRlbHkgYW5kIHJlYXNzaWduIGEgcHJvcGVydHlcbiAgICAvLyB3aGVuIGFsbCByZXF1aXJlZCBjb25kaXRpb25zIGFyZSBtZXQgZm9yIHRoaXNcbiAgICBpZiAoZ2V0VmFsdWUgJiYgKGlzVW5kZWZpbmVkICYmIGFzc2lnbkRlZmF1bHRWYWx1ZSAhPT0gZmFsc2UgfHwgYXNzaWduRGVmYXVsdFZhbHVlID09PSB0cnVlKSkge1xuICAgICAgICB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgb3B0aW9ucyk7XG4gICAgICAgIGlzVW5kZWZpbmVkID0gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcblxuICAgICAgICBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCBub2ZuLmFzc2lnbih7IGZyb21Ob2RlOiB0cnVlIH0sIGV2dCkpO1xuICAgIH1cblxuICAgIC8vIGFkZCBuZWVkZWQgZXZlbnQgaGFuZGxlcnMgdGhlIG9iamVjdCB3aGVuIHNldFZhbHVlIGlzIGdpdmVuXG4gICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgIG9iamVjdEhhbmRsZXIgPSAoKSA9PiBydW5PYmplY3RIYW5kbGVyKHtcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBwcm9wRGVmLFxuICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgIGV2dFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBieSBkZWZhdWx0IGRlYm91bmNpbmcgaXMgb25cbiAgICAgICAgLy8gaXQgY2FuIGJlIHR1cm5lZCBvZmYgYnkgcGFzc2luZyBkZWJvdW5jZT1mYWxzZSB0byBldmVudCBvYmplY3RcbiAgICAgICAgaWYgKGRlYm91bmNlT3B0aW9uICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgZGVsYXkgPSB0eXBlb2YgZGVib3VuY2VPcHRpb24gPT09ICdudW1iZXInID8gZGVib3VuY2VPcHRpb24gOiAwO1xuICAgICAgICAgICAgb2JqZWN0SGFuZGxlciA9IGRlYm91bmNlKG9iamVjdEhhbmRsZXIsIGRlbGF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCkge1xuICAgICAgICAgICAgb2JqZWN0SGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgbm9kZSB3aGVuIGdldFZhbHVlICYgb24gYXJlIGdpdmVuXG4gICAgaWYgKGdldFZhbHVlICYmIG9uKSB7XG4gICAgICAgIG5vZGVIYW5kbGVyID0gKGRvbUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWUgaXMgc2V0IGluIHVuYmluZE5vZGVcbiAgICAgICAgICAgIC8vIHdlIGNhbm5vdCBcInR1cm4gb2ZmXCIgYmluZGVyLm9uIHdoZW4gaXRzIHZhbHVlIGlzIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBkZXZlbG9wZXIgbmVlZHMgdG8gY2xlYW4gbWVtb3J5ICh0dXJuIG9mZiBjYWxsYmFjaykgbWFudWFseSBpbiBiaW5kZXIuZGVzdHJveVxuICAgICAgICAgICAgaWYoIW5vZGVIYW5kbGVyLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcnVuTm9kZUhhbmRsZXIoe1xuICAgICAgICAgICAgICAgICAgICBkb21FdmVudCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHByb3BEZWYsXG4gICAgICAgICAgICAgICAgICAgIGJpbmRlcixcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETyB0aHJvdyBlcnJvciB3aGVuIFwib25cIiBhbmQgbWF5YmUgb3RoZXIgYmluZGVyIHByb3BlcnRpZXMgaGFzIHdyb25nIHR5cGVcbiAgICAgICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgb24uY2FsbChub2RlLCBub2RlSGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9uID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICAvLyBhZGRFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChvbi5zcGxpdChzcGFjZVJlZyksXG4gICAgICAgICAgICAgICAgZXZ0TmFtZSA9PiBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZ0TmFtZSwgbm9kZUhhbmRsZXIpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFkZCBiaW5kaW5nIGRhdGEgdG8gYmluZGluZ3MgYXJyYXlcbiAgICBiaW5kaW5ncy5wdXNoKHtcbiAgICAgICAgb24sXG4gICAgICAgIG5vZGUsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgb2JqZWN0SGFuZGxlcixcbiAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgIG9wdGlvbnNcbiAgICB9KTtcblxuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlXG4gICAgICAgIH0sIGV2dCk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGBiaW5kOiR7a2V5fWAsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdiaW5kJywgZXh0ZW5kZWRFdnQpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZhdWx0QmluZGVycyBmcm9tICcuL2RlZmF1bHRiaW5kZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZmF1bHRCaW5kZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChyZXN1bHQgPSBkZWZhdWx0QmluZGVyc1tpXS5jYWxsKG5vZGUsIG5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2xvb2tmb3JiaW5kZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBbbm9kZSA9PiB7XG4gICAgY29uc3QgdGFnTmFtZSA9IG5vZGUudGFnTmFtZTtcblx0Y29uc3QgYmluZGVycyA9IHVuZGVmaW5lZDsgLy8gVE9ET1xuICAgIGxldCBiO1xuXG4gICAgLy8gVE9ETyBTd2l0Y2gvY2FzZVxuICAgIGlmICh0YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLmlucHV0KG5vZGUudHlwZSk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLnRleHRhcmVhKCk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICBiID0gYmluZGVycy5zZWxlY3Qobm9kZS5tdWx0aXBsZSk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnUFJPR1JFU1MnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLnByb2dyZXNzKCk7XG4gICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnT1VUUFVUJykge1xuICAgICAgICBiID0gYmluZGVycy5vdXRwdXQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYjtcbn1dO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2RlZmF1bHRiaW5kZXJzLmpzXG4gKiovIiwiaW1wb3J0IGlzIGZyb20gJy4uL191dGlsL2lzJztcbmltcG9ydCBzZXQgZnJvbSAnLi4vc2V0JztcblxuLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBib3VuZCBub2RlIGlzIGNoYW5nZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJ1bk5vZGVIYW5kbGVyKHtcbiAgICBkb21FdmVudCA9IHt9LFxuICAgIG9iamVjdCxcbiAgICBrZXksXG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBvcHRpb25zXG59KSB7XG4gICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHByb3BEZWYudmFsdWU7XG4gICAgY29uc3QgeyB3aGljaCwgdGFyZ2V0IH0gPSBkb21FdmVudDtcbiAgICBjb25zdCB7IGdldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZS5jYWxsKG5vZGUsIG5vZm4uYXNzaWduKHtcbiAgICAgICAgcHJldmlvdXNWYWx1ZSxcbiAgICAgICAgZG9tRXZlbnQsXG4gICAgICAgIG9yaWdpbmFsRXZlbnQ6IGRvbUV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgZG9tRXZlbnQsIC8vIGpRdWVyeSB0aGluZ1xuICAgICAgICAvLyB3aWxsIHRocm93IFwicHJldmVudERlZmF1bHQgaXMgbm90IGEgZnVuY3Rpb25cIiB3aGVuIGRvbUV2ZW50IGlzIGVtcHR5IG9iamVjdFxuICAgICAgICBwcmV2ZW50RGVmYXVsdDogKCkgPT4gZG9tRXZlbnQucHJldmVudERlZmF1bHQoKSxcbiAgICAgICAgLy8gd2lsbCB0aHJvdyBcInN0b3BQcm9wYWdhdGlvbiBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgIHN0b3BQcm9wYWdhdGlvbjogKCkgPT4gZG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksXG4gICAgICAgIHdoaWNoLFxuICAgICAgICB0YXJnZXRcbiAgICB9LCBvcHRpb25zKSk7XG5cbiAgICBpZiAoIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSkge1xuICAgICAgICAvLyBUT0RPIGFkZCBkZXNjcmlwdGlvbiBvZiBhIGhhY2tcbiAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgY2hhbmdlZE5vZGUsIG9uQ2hhbmdlVmFsdWUsIGJpbmRlcj9cbiAgICAgICAgc2V0KG9iamVjdCwga2V5LCB2YWx1ZSwge1xuICAgICAgICAgICAgZnJvbU5vZGU6IHRydWUsXG4gICAgICAgICAgICBjaGFuZ2VkTm9kZTogbm9kZSxcbiAgICAgICAgICAgIG9uQ2hhbmdlVmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgYmluZGVyXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qc1xuICoqLyIsIi8vIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gcHJvcGVydHkgdmFsdWUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuT2JqZWN0SGFuZGxlcih7XG4gICAgbm9kZSxcbiAgICBwcm9wRGVmLFxuICAgIGJpbmRlcixcbiAgICBvcHRpb25zLFxuICAgIGV2dFxufSkge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IHByb3BEZWY7XG4gICAgY29uc3QgeyBvbkNoYW5nZVZhbHVlLCBjaGFuZ2VkTm9kZSwgYmluZGVyOiBldnRCaW5kZXIgfSA9IGV2dDtcbiAgICBjb25zdCB7IHNldFZhbHVlIH0gPSBiaW5kZXI7XG4gICAgLy8gZGlydHkgaGFjayBmb3IgaHR0cHM6Ly9naXRodWIuY29tL21hdHJlc2hrYWpzL21hdHJlc2hrYS9pc3N1ZXMvMTlcbiAgICBjb25zdCBkaXJ0eUhhY2tWYWx1ZSA9IG9uQ2hhbmdlVmFsdWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcidcbiAgICAgICAgPyBTdHJpbmcodmFsdWUpIDogdmFsdWU7XG5cbiAgICBpZiAoY2hhbmdlZE5vZGUgPT09IG5vZGUgJiYgb25DaGFuZ2VWYWx1ZSA9PT0gZGlydHlIYWNrVmFsdWUgJiYgZXZ0QmluZGVyID09PSBiaW5kZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldFZhbHVlLmNhbGwobm9kZSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgdmFsdWUgfSwgb3B0aW9ucykpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3J1bm9iamVjdGhhbmRsZXIuanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tc2hhZG93OiBbXCJlcnJvclwiLCB7IFwiYWxsb3dcIjogW1wiZXZ0XCJdIH1dKi9cbmltcG9ydCBpbml0TUsgZnJvbSAnLi4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZmluZVByb3AgZnJvbSAnLi4vX2NvcmUvZGVmaW5lcHJvcCc7XG5cbi8vIHByb3BlcnR5IG1vZGlmaWVyIGV2ZW50IHJlZ2V4cFxuY29uc3QgcHJvcE1vZEV2ZW50UmVnXG4gICAgPSAvXl9jaGFuZ2U6ZGVwczp8Xl9jaGFuZ2U6YmluZGluZ3M6fF5fY2hhbmdlOmRlbGVnYXRlZDp8Xl9jaGFuZ2U6dHJlZTp8XmNoYW5nZTp8XmJlZm9yZWNoYW5nZTovO1xuXG4vLyBhZGRzIHNpbXBsZSBldmVudCBsaXN0ZW5lclxuLy8gdXNlZCBhcyBjb3JlIG9mIGV2ZW50IGVuZ2luZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCwgaW5mbyA9IHt9KSB7XG4gICAgY29uc3QgeyBldmVudHM6IGFsbEV2ZW50cyB9ID0gaW5pdE1LKG9iamVjdCk7XG4gICAgY29uc3QgY3R4ID0gY29udGV4dCB8fCBvYmplY3Q7XG4gICAgY29uc3QgZXZlbnRzID0gYWxsRXZlbnRzW25hbWVdO1xuICAgIGNvbnN0IGV2dCA9IHsgY2FsbGJhY2ssIGNvbnRleHQsIGN0eCwgbmFtZSwgaW5mbyB9O1xuXG5cbiAgICAvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZVxuICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgYXJlIGV2ZW50cyB3aXRoIHRoZSBzYW1lIGRhdGEsIHJldHVybiBmYWxzZVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZXZ0ID0gZXZlbnRzW2ldO1xuICAgICAgICAgICAgaWYgKChldnQuY2FsbGJhY2sgPT09IGNhbGxiYWNrIHx8IGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2suX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAmJiBldnQuY29udGV4dCA9PT0gY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHRoZSBldmVudCBpc24ndCBmb3VuZCBhZGQgaXQgdG8gdGhlIGV2ZW50IGxpc3RcbiAgICAgICAgZXZlbnRzLnB1c2goZXZ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgbm8gZXZlbnRzIHdpdGggdGhlIHNhbWUgbmFtZSwgY3JlYXRlIGFycmF5IHdpdGggb25seSBlYmVudFxuICAgICAgICBhbGxFdmVudHNbbmFtZV0gPSBbZXZ0XTtcbiAgICB9XG5cbiAgICBpZiAocHJvcE1vZEV2ZW50UmVnLnRlc3QobmFtZSkpIHtcbiAgICAgICAgLy8gZGVmaW5lIG5lZWRlZCBhY2Nlc3NvcnMgZm9yIEtFWVxuICAgICAgICBkZWZpbmVQcm9wKG9iamVjdCwgbmFtZS5yZXBsYWNlKHByb3BNb2RFdmVudFJlZywgJycpKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZVswXSAhPT0gJ18nKSB7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgYWRkZXZlbnQ6JHtuYW1lfWAsIGV2dCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCAnYWRkZXZlbnQnLCBldnQpO1xuICAgIH1cblxuICAgIC8vIGlmIGV2ZW50IGlzIGFkZGVkIHJldHVybiB0cnVlXG4gICAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgZ2l2ZW5EZWxheSwgdGhpc0FyZykge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIGxldCBkZWxheTtcbiAgICBpZiAodHlwZW9mIGRlbGF5ICE9PSAnbnVtYmVyJykge1xuICAgICAgICB0aGlzQXJnID0gZ2l2ZW5EZWxheTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBkZWxheSA9IDA7XG4gICAgfVxuXG4gICAgZGVsYXkgPSBnaXZlbkRlbGF5IHx8IDA7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgICAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjb25zdCBbYTEsIGEyXSA9IGFyZ3M7XG4gICAgICAgIGNvbnN0IGFyZ3NMZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgY2FsbENvbnRleHQgPSB0aGlzQXJnIHx8IHRoaXM7XG5cbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChhcmdzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmNhbGwoY2FsbENvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5hcHBseShjYWxsQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX3V0aWwvZGVib3VuY2UuanNcbiAqKi8iLCIvKiBlc2xpbnQgbm8tdXNlLWJlZm9yZS1kZWZpbmU6IFtcImVycm9yXCIsIHsgXCJmdW5jdGlvbnNcIjogZmFsc2UgfV0qL1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vYWRkbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICcuL3VuZGVsZWdhdGVsaXN0ZW5lcic7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgaXMgZnJvbSAnLi4vX3V0aWwvaXMnO1xuXG5jb25zdCB0cmVlQ2hhbmdlRXZ0UmVnID0gL15fY2hhbmdlOnRyZWU6LztcblxuZnVuY3Rpb24gY2hhbmdlSGFuZGxlcih7XG4gICAgcHJldmlvdXNWYWx1ZSxcbiAgICB2YWx1ZVxufSwge1xuICAgIHBhdGgsXG4gICAgbmFtZSxcbiAgICBjYWxsYmFjayxcbiAgICBjb250ZXh0XG59ID0gdHJpZ2dlck9uZS5sYXRlc3RFdmVudC5pbmZvLmRlbGVnYXRlZERhdGEpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKHZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZpb3VzVmFsdWUgJiYgdHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihwcmV2aW91c1ZhbHVlLCBwYXRoLCBuYW1lLCBjYWxsYmFjaywgY29udGV4dCk7XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciB0cmVlIGNoYW5nZSBldmVudCB3aGljaCBpcyB1c2VkIGJ5IGJpbmRpbmdzIGxvZ2ljXG4gICAgaWYgKHRyZWVDaGFuZ2VFdnRSZWcudGVzdChuYW1lKSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VLZXkgPSBuYW1lLnJlcGxhY2UodHJlZUNoYW5nZUV2dFJlZywgJycpO1xuXG4gICAgICAgIGlmIChwcmV2aW91c1ZhbHVlICYmICFpcyhwcmV2aW91c1ZhbHVlW2NoYW5nZUtleV0sIHZhbHVlW2NoYW5nZUtleV0pKSB7XG4gICAgICAgICAgICBjb25zdCB7IGV2ZW50cyB9ID0gZGVmcy5nZXQodmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgdHJlZUNoYW5nZUV2dE5hbWUgPSBgX2NoYW5nZTp0cmVlOiR7Y2hhbmdlS2V5fWA7XG4gICAgICAgICAgICBjb25zdCBjaGFuZ2VFdmVudHMgPSBldmVudHNbdHJlZUNoYW5nZUV2dE5hbWVdO1xuICAgICAgICAgICAgaWYgKGNoYW5nZUV2ZW50cykge1xuICAgICAgICAgICAgICAgIHRyaWdnZXJPbmUodmFsdWUsIHRyZWVDaGFuZ2VFdnROYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzVmFsdWU6IHByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlW2NoYW5nZUtleV0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGVnYXRlTGlzdGVuZXIob2JqZWN0LCBnaXZlblBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgLy8gaWYgdHlwZW9mIHBhdGggaXMgc3RyaW5nIGFuZCBwYXRoIGlzIG5vdCBlbXB0eSBzdHJpbmcgdGhlbiBzcGxpdCBpdFxuICAgIGxldCBwYXRoID0gdHlwZW9mIGdpdmVuUGF0aCA9PT0gJ3N0cmluZycgJiYgZ2l2ZW5QYXRoICE9PSAnJyA/IGdpdmVuUGF0aC5zcGxpdCgnLicpIDogZ2l2ZW5QYXRoO1xuXG4gICAgaWYgKCFwYXRoIHx8ICFwYXRoLmxlbmd0aCkge1xuICAgICAgICAvLyBpZiBubyBwYXRoIHRoZW4gYWRkIHNpbXBsZSBsaXN0ZW5lclxuICAgICAgICBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGRvIGFsbCBtYWdpY1xuICAgICAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuICAgICAgICBsZXQgcGF0aFN0cjtcblxuICAgICAgICBpZiAocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBwYXRoID0gbm9mbi5zbGljZShwYXRoLCAxKTtcbiAgICAgICAgICAgIHBhdGhTdHIgPSBwYXRoLmpvaW4oJy4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGggPSBbXTtcbiAgICAgICAgICAgIHBhdGhTdHIgPSBwYXRoWzBdIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVsZWdhdGVkRGF0YSA9IHtcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICBjb250ZXh0XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gdGhlIGV2ZW50IGlzIHRyaWdnZXJlZCBieSBcInNldFwiXG4gICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWAsIGNoYW5nZUhhbmRsZXIsIG51bGwsIHtcbiAgICAgICAgICAgIGRlbGVnYXRlZERhdGEsXG4gICAgICAgICAgICBwYXRoU3RyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhbGwgaGFuZGxlciBtYW51YWxseVxuICAgICAgICBjaGFuZ2VIYW5kbGVyKHtcbiAgICAgICAgICAgIHZhbHVlOiBvYmplY3Rba2V5XVxuICAgICAgICB9LCBkZWxlZ2F0ZWREYXRhKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanNcbiAqKi8iLCIvLyBjcmVhdGVzIG5lc3RlZCBvYmplY3QgYmFzZWQgb24gcGF0aCBhbmQgbGFzdFZhbHVlXG4vLyBleGFtcGxlOiBtYWtlT2JqZWN0KCdhLmIuYycsIDQyKSAtPiB7YToge2I6IHtjOyA0Mn19fVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU9iamVjdChnaXZlblBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZ2l2ZW5QYXRoID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBbXTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBsZXQgb2JqID0gcmVzdWx0O1xuICAgIGxldCBrZXk7XG5cblxuICAgIHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAga2V5ID0gcGF0aC5zaGlmdCgpO1xuICAgICAgICBvYmogPSBvYmpba2V5XSA9IHt9O1xuICAgIH1cblxuICAgIG9ialtwYXRoLnNoaWZ0KCldID0gbGFzdFZhbHVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNweSgpIHtcbiAgICBjb25zdCBzcHlOYW1lID0gYHJhbmRvbU5hbWUke01hdGgucmFuZG9tKCl9JHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xuICAgIGNvbnN0IHNweSA9ICgpID0+IHt9O1xuICAgIGNvbnN0IHNweU9iaiA9IHt9O1xuICAgIHNweU9ialtzcHlOYW1lXSA9IHNweTtcbiAgICByZXR1cm4gc3B5T24oc3B5T2JqLCBzcHlOYW1lKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvY3JlYXRlc3B5LmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmFkZCcsICgpID0+IHtcbiAgICBpdCgnYWRkcyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWw1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5hZGQoW2VsMiwgZWwzLCBlbDQsIGVsNV0pXG4gICAgICAgIF0pLnRvRXF1YWwoW2VsMSwgZWwyLCBlbDMsIGVsNCwgZWw1XSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5jcmVhdGUnLCAoKSA9PiB7XG4gICAgaXQoJ2NyZWF0ZXMgZWxlbWVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicpLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdESVYnKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIGEgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZm9vYmFyJ1xuICAgICAgICAgICAgfSkuY2xhc3NOYW1lXG4gICAgICAgICkudG9FcXVhbCgnZm9vYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY3JlYXRlcyBjaGlsZGVuJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lOiAnc3BhbidcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSkuY2hpbGRyZW5bMF0udGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIGF0dHJpYnV0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5nZXRBdHRyaWJ1dGUoJ2ZvbycpXG4gICAgICAgICkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3Mgb2JqZWN0IHdpdGggdGFnTmFtZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdkaXYnXG4gICAgICAgICAgICB9KS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnRElWJyk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ2V4dGVuZHMgZGF0YXNldCBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE9cbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuaW1wb3J0IHNpbXVsYXRlQ2xpY2sgZnJvbSAnLi4vLi4vbGliL3NpbXVsYXRlY2xpY2snO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGV2ZW50cycsICgpID0+IHtcbiAgICBsZXQgdGVzdFNhbmRib3g7XG4gICAgbGV0IGNoaWxkMTtcbiAgICBsZXQgY2hpbGQyO1xuICAgIGxldCBncmFuZGNoaWxkMTtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDFcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMlwiPjwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDEnKTtcbiAgICAgICAgY2hpbGQyID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMicpO1xuICAgICAgICBncmFuZGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkMScpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuICAgICAgICBzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuICAgICAgICBoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgJChbdGVzdFNhbmRib3gsIGNoaWxkMSwgY2hpbGQyLCBncmFuZGNoaWxkMV0pLm9mZignY2xpY2snKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgbmFtZXNwYWNlZCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBidWJibGluZyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKGNsaWNrIG9uIGdyYW5kY2hpbGRyZW4pJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdEb2VzblxcdCB0cmlnZ2VyIHdoZW4gY2xpY2tlZCBvbiB3cm9uZyBjaGlsZCcsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDInLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBub3Qgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1N0b3BzIHByb3BhZ2F0aW9uJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgJChjaGlsZDEpLm9uKCdjbGljaycsIGV2dCA9PiBldnQuc3RvcFByb3BhZ2F0aW9uKCkpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanNcbiAqKi8iLCIvLyBzaW11bGF0ZXMgY2xpY2sgb24gYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW11bGF0ZUNsaWNrKG5vZGUpIHtcbiAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICAgIGV2dC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5maW5kJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgZ3JhbmRDaGlsZDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBncmFuZENoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQodGVzdFNhbmRib3gpLmZpbmQoJy5ncmFuZGNoaWxkJylcbiAgICAgICAgXSkudG9FcXVhbChbZ3JhbmRDaGlsZF0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGluaXRpYWxpemF0aW9uJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0zXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIHdpbmRvdycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCh3aW5kb3cpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgZG9jdW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoZG9jdW1lbnQpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbChkb2N1bWVudCk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb252ZXJ0cyBhcnJheS1saWtlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChjaGlsZHJlbik7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoY2hpbGRyZW5baV0pLnRvRXF1YWwocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZWxlbWVudCkudG9FcXVhbChyZXN1bHRbMF0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsIHRlc3RTYW5kYm94KS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsICcud3JvbmctY29udGV4dCcpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKG51bGwpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcbiAgICAgICAgJC5mbi5iUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiBiUXVlcnlQbHVnaW4oKSB7XG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGhcbiAgICAgICAgICAgICkudG9FcXVhbChcbiAgICAgICAgICAgICAgICB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJykubGVuZ3RoXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKCQuZm4sICdiUXVlcnlQbHVnaW4nKTtcblxuICAgICAgICAkKCcqJywgdGVzdFNhbmRib3gpLmJRdWVyeVBsdWdpbigpO1xuXG4gICAgICAgIGV4cGVjdCgkLmZuLmJRdWVyeVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcbiAgICBpdCgnY2hlY2tzIGNsYXNzTmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKGVsKS5pcygnLmVsJylcbiAgICAgICAgKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwyJylcbiAgICAgICAgKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuICAgIGl0KCdleGNsdWRlcyBieSBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5ub3QoJy5lbDInKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvbm90X3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgKCkgPT4ge1xuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMlwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQub25lKCcqJywgdGVzdFNhbmRib3gpXG4gICAgICAgICkudG9FcXVhbChjaGlsZCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5wYXJzZUhUTUwnLCAoKSA9PiB7XG4gICAgaXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPHRkPjwvdGQ+PHRkPjwvdGQ+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgQ2xhc3MgZnJvbSAnc3JjL2NsYXNzJztcblxuZGVzY3JpYmUoJ0NsYXNzIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdhbGxvd3MgdG8gaW5oZXJpdCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgQSA9IENsYXNzKHsgYTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIEIgPSBDbGFzcyh7IGI6IHRydWUsIGV4dGVuZHM6IEEgfSksXG4gICAgICAgICAgICBDID0gQ2xhc3MoeyBjOiB0cnVlLCBleHRlbmRzOiBCIH0pLFxuICAgICAgICAgICAgaW5zdCA9IG5ldyBDO1xuXG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEIpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDKS50b0JlVHJ1dGh5KCk7XG5cbiAgICAgICAgZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdC5iKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0LmMpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBzdGF0aWMgcHJvcHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IEEgPSBDbGFzcyh7fSwgeyBzdGF0aWNQcm9wOiB0cnVlIH0pO1xuICAgICAgICBleHBlY3QoQS5zdGF0aWNQcm9wKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5zdCA9IG5ldyBDbGFzcyh7IGE6IHRydWUgfSk7XG4gICAgICAgIGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDbGFzcykudG9CZUZhbHN5KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xhc3MocHJvdG90eXBlLCBzdGF0aWNQcm9wcykge1xuICAgIGNvbnN0IENvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBPYmplY3RcbiAgICAgICAgICAgID8gcHJvdG90eXBlLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICA6IGZ1bmN0aW9uIEVtcHR5Q29uc3RydWN0b3IoKSB7fSxcbiAgICAgICAgLy9leHRlbmRzIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgUGFyZW50ID0gcHJvdG90eXBlLmV4dGVuZHMgfHwgcHJvdG90eXBlLmV4dGVuZCxcbiAgICAgICAgLy9pbmhlcml0IHByb3RvIGZyb20gY2xhc3MgcGFyZW50IG9yIGVtcHR5IG9iamVjdFxuICAgICAgICBwcm90byA9IE9iamVjdC5jcmVhdGUoUGFyZW50ID8gUGFyZW50LnByb3RvdHlwZSA6IHt9KTtcblxuICAgIGV4dGVuZChwcm90bywgcHJvdG90eXBlKTtcblxuICAgIGlmICh0eXBlb2Ygc3RhdGljUHJvcHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGV4dGVuZChDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIH1cblxuICAgIC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgcHJvdG8uaW5zdGFuY2VPZiA9IGZ1bmN0aW9uIGluc3RhbmNlT2YoKSB7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3I7XG4gICAgfTtcblxuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvO1xuXG4gICAgLy8gaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZVxuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ2xhc3MpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzcy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChNYXRyZXNoa2EuT2JqZWN0IGFuZCBNYXRyZXNoa2EuQXJyYXkpJywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5PYmplY3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgY2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2gobmV3IE1LLkFycmF5KHt9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICB5OiBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBhOiB7fVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngueS5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChiYXNpYyknLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjdHggPSB7fTtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcbiAgICAgICAgY29uc3QgYiA9IG9iai5hLmI7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShiLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICB0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGMgPSBvYmouYS5jO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKGMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICBvYmouYS5iLmMgPSA1NTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgY29ycmVjdCBjb250ZXh0IGZvciBkZWxlZ2F0ZWQgZXZlbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBsZXQgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZnVuY3Rpb24gaGFuZGxlKCkge1xuICAgICAgICAgICAgYm9vbCA9IHRoaXMgPT09IGN0eDtcbiAgICAgICAgfSwgY3R4KTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQ2hhbmdlIGV2ZW50IChzaW1wbGUgYW5kIGRlbGVnYXRlZCknLCAoKSA9PiB7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIC8qZXNsaW50LWRpc2FibGUgKi9cbiAgICB4aXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG5cbiAgICB4aXQoJ2ZpcmVzIHdoZW4gZGVsZWdhdGVkIHRhcmdldCBpcyByZWFzc2lnbmVkIChhLmIuYy54LCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiLmMueCcsIDIpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG9iai5hLmIgPSB7XG4gICAgICAgICAgICBjOiB7XG4gICAgICAgICAgICAgICAgeDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgeGl0KCdmaXJlcyB3aGVuIGRlbGVnYXRlZCB0YXJnZXQgaXMgcmVhc3NpZ25lZCAoYS5iLmMueCwgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG9iai5hLmIuYyA9IHtcbiAgICAgICAgICAgIHg6IDJcbiAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIHhpdCgnYXZvaWRzIGNvbmZsaWN0cycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaSA9IDA7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMTEpO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBldnQgPT4gaSArPSAxZTEwKTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU5KTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ2NoYW5nZTpjJywgZXZ0ID0+IGkgKz0gMWU4KTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnY2hhbmdlOngnLCBldnQgPT4gaSArPSAxZTcpO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdjaGFuZ2U6eCcsIGV2dCA9PiBpICs9IDFlNik7XG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ2NoYW5nZTp4JywgZXZ0ID0+IGkgKz0gMWU1KTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlNCk7XG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTMpO1xuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhJywgJ2NoYW5nZTpiJywgZXZ0ID0+IGkgKz0gMWUyKTtcbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6YicsIGV2dCA9PiBpICs9IDFlMSk7XG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EnLCAnY2hhbmdlOmInLCBldnQgPT4gaSArPSAxZTApO1xuICAgICAgICBvYmouYSA9IHtcbiAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICBjOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGV4cGVjdChpKS50b0VxdWFsKDExMTExMTExMTExMSk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLmEuYiA9IG51bGw7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuICAgIC8qZXNsaW50LWVuYWJsZSAqL1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsICgpID0+IHtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb2JqID0ge307XG4gICAgICAgIGN0eCA9IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2F2b2lkcyBjb25mbGljdHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMSkpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTIpKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9FcXVhbCgxMTEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIGFyZ3MpJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBuYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICB4aXQoJ3JlbW92ZXMgYnkgaG93VG9SZW1vdmUgKG5vdCBkb2N1bWVudGVkIGNvcmUgZmVhdHVyZSknLCAoKSA9PiB7XG4gICAgICAgIC8qZXNsaW50LWRpc2FibGUgKi9cbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZSxcbiAgICAgICAgICAgIG9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICBob3dUb1JlbW92ZShvbkRhdGEsIG9mZkRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mZkRhdGEueCA9PT0gNDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBtYWdpYy5fYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50MScsIGYsIG51bGwsIG9uRGF0YSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQxJywgbnVsbCwgbnVsbCwge1xuICAgICAgICAgICAgeDogNDJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdzb21lZXZlbnQxJyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuXG4gICAgICAgIG1hZ2ljLl9hZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQyJywgZiwgbnVsbCwgb25EYXRhKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudDInLCBudWxsLCBudWxsLCB7XG4gICAgICAgICAgICB4OiA0M1xuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudDInKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICAgICAgLyplc2xpbnQtZW5hYmxlICovXG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG54ZGVzY3JpYmUoXCJFdmVudHMgY29yZTogX2FkZERPTUxpc3RlbmVyLCBfcmVtb3ZlRE9NTGlzdGVuZXJcIiwgKCkgPT4ge1xuICAgIGxldCBxID0gKHMsIGMpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgIGV2LmluaXRNb3VzZUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuICAgICAgICAgICAgICAgICAgICAwIC8qbGVmdCovICwgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuICAgICAgICB0YWdOYW1lOiAnRElWJyxcbiAgICAgICAgaWQ6ICdkLXRlc3QnLFxuICAgICAgICBpbm5lckhUTUw6IGBcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkLXRlc3QtMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH0pKTtcblxuXG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cblxuICAgIGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIGFuZCByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4JywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yIChidWJibGluZyB0ZXN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCBhbmQgZG9lc25cXCd0IHJlbW92ZSBldmVudHMgZnJvbSBvdGhlciBub2RlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdFdmVudHMgc3VtbWFyeSAob24sIG9mZiknLCAoKSA9PiB7XG4gICAgbGV0IHEgPSAocywgYykgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgZXYuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG4gICAgICAgICAgICAgICAgICAgIDAgLypsZWZ0Ki8gLCBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGxldCBub2RlID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG4gICAgICAgIHRhZ05hbWU6ICdESVYnLFxuICAgICAgICBpZDogJ3MtdGVzdCcsXG4gICAgICAgIGlubmVySFRNTDogYFxuICAgICAgICAgICAgPGRpdiBpZD1cInMtdGVzdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfSkpO1xuXG4gICAgbm9kZS5jbGljayA9IG5vZGUuY2xpY2sgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snKSk7XG4gICAgfVxuXG4gICAgaXQoJ2ZpcmVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMub2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtay5vbignc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLm9mZignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG5cbiAgICBpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBtYWdpYy5vbmNlKG9iaiwge1xuICAgICAgICAgICAgZm9vOiBmMSxcbiAgICAgICAgICAgIGJhcjogZjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoaikudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBtay5vbmNlKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBmMSA9IGV2dCA9PiBpKyssXG4gICAgICAgICAgICBmMiA9IGV2dCA9PiBqKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnb25EZWJvdW5jZSB3b3JrcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA4MDApO1xuXG4gICAgICAgIG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uXCIgYW5kIFwib2ZmXCInLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgICAgICAgZm9vOiAoKSA9PiBpKyssXG4gICAgICAgICAgICAgICAgYmFyOiAoKSA9PiBpKytcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgTUsub24ob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcblxuICAgICAgICBNSy5vZmYob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMik7XG4gICAgfSk7XG5cblxuICAgIGl0KCdhbGxvd3MgdG8gZmxpcCBjb250ZXh0IGFuZCB0cmlnZ2VyT25Jbml0IChvbiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIHRoaXNBcmcgPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRydWUsIHRoaXNBcmcpO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2JhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRoaXNBcmcsIHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1wiOiAzNSxcblx0XCIuL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1wiOiAzNyxcblx0XCIuL19iaW5kaW5ncy9nZXRub2Rlcy5qc1wiOiAxMixcblx0XCIuL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXCI6IDM2LFxuXHRcIi4vX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcuanNcIjogMzQsXG5cdFwiLi9fYmluZGluZ3MvcnVubm9kZWhhbmRsZXIuanNcIjogMzgsXG5cdFwiLi9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qc1wiOiAzOSxcblx0XCIuL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1wiOiAxMyxcblx0XCIuL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nLmpzXCI6IDMwLFxuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiA2LFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiA1LFxuXHRcIi4vX2NvcmUvaW5pdC5qc1wiOiA0LFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiAxNSxcblx0XCIuL19kb20vaW5kZXguanNcIjogMTQsXG5cdFwiLi9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXCI6IDQwLFxuXHRcIi4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDQyLFxuXHRcIi4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1wiOiAzMyxcblx0XCIuL19ldmVudHMvdHJpZ2dlcm9uZS5qc1wiOiA4LFxuXHRcIi4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcIjogMzIsXG5cdFwiLi9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcIjogOSxcblx0XCIuL191dGlsL2RlYm91bmNlLmpzXCI6IDQxLFxuXHRcIi4vX3V0aWwvaXMuanNcIjogMTEsXG5cdFwiLi9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1wiOiAxMCxcblx0XCIuL191dGlsL3RvYXJyYXkuanNcIjogNzAsXG5cdFwiLi9hcnJheS5qc1wiOiA2NCxcblx0XCIuL2JpbmRlcnMvX2NsYXNzbGlzdC5qc1wiOiA4MCxcblx0XCIuL2JpbmRlcnMvYXR0ci5qc1wiOiA4Mixcblx0XCIuL2JpbmRlcnMvY2xhc3NuYW1lLmpzXCI6IDc4LFxuXHRcIi4vYmluZGVycy9kYXRhc2V0LmpzXCI6IDgzLFxuXHRcIi4vYmluZGVycy9kaXNwbGF5LmpzXCI6IDg5LFxuXHRcIi4vYmluZGVycy9odG1sLmpzXCI6IDc2LFxuXHRcIi4vYmluZGVycy9pbmRleC5qc1wiOiA3NSxcblx0XCIuL2JpbmRlcnMvaW5wdXQuanNcIjogODYsXG5cdFwiLi9iaW5kZXJzL291dHB1dC5qc1wiOiA4Nyxcblx0XCIuL2JpbmRlcnMvcHJvZ3Jlc3MuanNcIjogODUsXG5cdFwiLi9iaW5kZXJzL3Byb3AuanNcIjogODEsXG5cdFwiLi9iaW5kZXJzL3NlbGVjdC5qc1wiOiA4OCxcblx0XCIuL2JpbmRlcnMvc3R5bGUuanNcIjogOTAsXG5cdFwiLi9iaW5kZXJzL3RleHQuanNcIjogNzcsXG5cdFwiLi9iaW5kZXJzL3RleHRhcmVhLmpzXCI6IDg0LFxuXHRcIi4vYmluZG5vZGUuanNcIjogMyxcblx0XCIuL2JpbmRvcHRpb25hbG5vZGUuanNcIjogNzQsXG5cdFwiLi9iaW5kc2FuZGJveC5qc1wiOiA3Myxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAyNCxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAxOCxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAxNyxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogMjcsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDIyLFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogMjksXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMTYsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMjUsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDI4LFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAyNixcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAyMyxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMjEsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDIwLFxuXHRcIi4vY2xhc3MuanNcIjogNTYsXG5cdFwiLi9leHRlbmQuanNcIjogMTksXG5cdFwiLi9pbmRleC5qc1wiOiA2NSxcblx0XCIuL21hZ2ljLmpzXCI6IDY4LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDY2LFxuXHRcIi4vb2JqZWN0L2luZGV4LmpzXCI6IDY3LFxuXHRcIi4vb24uanNcIjogNjksXG5cdFwiLi9zZWxlY3QuanNcIjogNzEsXG5cdFwiLi9zZWxlY3RhbGwuanNcIjogNzIsXG5cdFwiLi9zZXQuanNcIjogNyxcblx0XCIuL3VuYmluZG5vZGUuanNcIjogMzFcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNjM7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gNjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcnJheS5qc1xuICoqLyIsImltcG9ydCBNYXRyZXNoa2EgZnJvbSAnLi9tYXRyZXNoa2EnO1xuaW1wb3J0IE1hdHJlc2hrYUFycmF5IGZyb20gJy4vYXJyYXknO1xuaW1wb3J0IE1hdHJlc2hrYU9iamVjdCBmcm9tICcuL29iamVjdCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi9jbGFzcyc7XG4vL2ltcG9ydCBiaW5kZXJzIGZyb20gJy4vYmluZGVycyc7XG5cbk1hdHJlc2hrYS5BcnJheSA9IE1hdHJlc2hrYUFycmF5O1xuTWF0cmVzaGthLk9iamVjdCA9IE1hdHJlc2hrYU9iamVjdDtcbk1hdHJlc2hrYS5DbGFzcyA9IENsYXNzO1xuLy9NYXRyZXNoa2EuYmluZGVycyA9IGJpbmRlcnM7XG5cbmV4cG9ydCBkZWZhdWx0IE1hdHJlc2hrYTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IGV4dGVuZCBmcm9tICcuLi9leHRlbmQnO1xuaW1wb3J0IENsYXNzIGZyb20gJy4uL2NsYXNzJztcblxuZXhwb3J0IGRlZmF1bHQgQ2xhc3Moe1xuICAgIC8vIGluc3RhbmNlIHByb3BlcmllcyBhbmQgbWV0aG9kc1xuXG59LCB7XG4gICAgLy8gc3RhdGljIHByb3BlcnRpZXMgYW5kIG1ldGhvZHNcbiAgICBleHRlbmRcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWF0cmVzaGthL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29iamVjdC9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYWdpYy5qc1xuICoqLyIsIlxuLy8gL14oKFteQF0rKUApPygoLis/KSg6OihbXlxcKFxcKV0rKT8oXFwoKC4qKVxcKSk/KT8pPyQvXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uKCkge1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9vbi5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvQXJyYXkob2JqZWN0LCBzdGFydCkge1xuXHR2YXIgYXJyYXkgPSBbXSxcblx0XHRsID0gb2JqZWN0Lmxlbmd0aCxcblx0XHRpO1xuXG5cdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblxuXHRmb3IgKGkgPSBzdGFydDsgaSA8IGw7IGkrKykge1xuXHRcdGFycmF5W2kgLSBzdGFydF0gPSBvYmplY3RbaV07XG5cdH1cblxuXHRyZXR1cm4gYXJyYXk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC90b2FycmF5LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCBkb20gZnJvbSAnLi9fZG9tJztcbmltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuL191dGlsL3RvYXJyYXknO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yVGVzdFJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0KG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBzZWxlY3RvciA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZWxlY3RBbGwnKTtcbiAgICB9XG5cblx0aWYgKGN1c3RvbVNlbGVjdG9yVGVzdFJlZy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdHJldHVybiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9yKVswXSB8fCBudWxsO1xuXHR9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgICAgIGlmICghZGVmIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wcy5zYW5kYm94O1xuXG4gICAgICAgIGlmICghcHJvcERlZikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG4gICAgICAgIGlmKGJpbmRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCB7IG5vZGUgfSA9IGJpbmRpbmdzWzBdO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGUucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcblx0fVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlbGVjdC5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vX2RvbSc7XG5pbXBvcnQgc2VsZWN0Tm9kZXMgZnJvbSAnLi9fYmluZGluZ3Mvc2VsZWN0bm9kZXMnO1xuaW1wb3J0IHRvQXJyYXkgZnJvbSAnLi9fdXRpbC90b2FycmF5JztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuXG5jb25zdCBjdXN0b21TZWxlY3RvclRlc3RSZWcgPSAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS87XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdEFsbChvYmplY3QsIHNlbGVjdG9yKSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgc2VsZWN0b3IgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnc2VsZWN0QWxsJyk7XG4gICAgfVxuXG5cblx0aWYgKGN1c3RvbVNlbGVjdG9yVGVzdFJlZy50ZXN0KHNlbGVjdG9yKSkge1xuXHRcdHJldHVybiBzZWxlY3ROb2RlcyhvYmplY3QsIHNlbGVjdG9yKTtcblx0fSBlbHNlIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZG9tLiQoKTtcbiAgICAgICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgICAgICBpZiAoIWRlZiB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvcERlZiA9IGRlZi5wcm9wcy5zYW5kYm94O1xuXG4gICAgICAgIGlmICghcHJvcERlZikge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChiaW5kaW5ncywgKHsgbm9kZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQodG9BcnJheShzZWxlY3RlZCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuXHR9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VsZWN0YWxsLmpzXG4gKiovIiwiaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnLi91bmJpbmRub2RlJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2FuZGJveChvYmplY3QsIG5vZGUsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBvYmplY3Q7XG4gICAgICAgIG9iamVjdCA9IHRoaXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhyb3cgZXJyb3Igd2hlbiBvYmplY3QgdHlwZSBpcyB3cm9uZ1xuICAgICAgICBjaGVja09iamVjdFR5cGUob2JqZWN0LCAnYmluZFNhbmRib3gnKTtcbiAgICB9XG5cbiAgICB1bmJpbmROb2RlKG9iamVjdCwgJ3NhbmRib3gnLCBudWxsLCBldnQpO1xuICAgIHJldHVybiBiaW5kTm9kZShvYmplY3QsICdzYW5kYm94Jywgbm9kZSwgbnVsbCwgZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRzYW5kYm94LmpzXG4gKiovIiwiaW1wb3J0IGJpbmROb2RlIGZyb20gJy4vYmluZG5vZGUnO1xuXG4vLyBUT0RPIGRlc2NyaXB0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kT3B0aW9uYWxOb2RlKC4uLmFyZ3MpIHtcbiAgICAvLyB0aGlzIGhhY2sgYWxsb3dzIHRvIGtlZXAgYmluZE9wdGlvbmFsTm9kZSBhcyBjb21wYWN0IGFzIHBvc3NpYmxlXG4gICAgLy8gYW5kIGRvZXNuJ3QgcmVxdWlyZSB0byBmbGlwIGFyZ3MgYW5kIHN1cHBvZXIgYWxsIGJpbmROb2RlIHZhcmlhdGlvbnNcbiAgICBiaW5kTm9kZS50ZW1wb3JhcnlPcHRpb25hbEZsYWcgPSB0cnVlO1xuICAgIHJldHVybiBiaW5kTm9kZS5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZG9wdGlvbmFsbm9kZS5qc1xuICoqLyIsImltcG9ydCBodG1sIGZyb20gJy4vaHRtbCc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuL2Rpc3BsYXknO1xuaW1wb3J0IGNsYXNzTmFtZSBmcm9tICcuL2NsYXNzbmFtZSc7XG5pbXBvcnQgcHJvcCBmcm9tICcuL3Byb3AnO1xuaW1wb3J0IGF0dHIgZnJvbSAnLi9hdHRyJztcbmltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcbmltcG9ydCB0ZXh0YXJlYSBmcm9tICcuL3RleHRhcmVhJztcbmltcG9ydCBzZWxlY3QgZnJvbSAnLi9zZWxlY3QnO1xuaW1wb3J0IHByb2dyZXNzIGZyb20gJy4vcHJvZ3Jlc3MnO1xuaW1wb3J0IHRleHQgZnJvbSAnLi90ZXh0JztcbmltcG9ydCBzdHlsZSBmcm9tICcuL3N0eWxlJztcbmltcG9ydCBkYXRhc2V0IGZyb20gJy4vZGF0YXNldCc7XG5cbmV4cG9ydCB7XG4gICAgaHRtbCxcbiAgICBkaXNwbGF5LFxuICAgIGNsYXNzTmFtZSxcbiAgICBwcm9wLFxuICAgIGF0dHIsXG4gICAgaW5wdXQsXG4gICAgdGV4dGFyZWEsXG4gICAgc2VsZWN0LFxuICAgIHByb2dyZXNzLFxuICAgIHRleHQsXG4gICAgc3R5bGUsXG4gICAgZGF0YXNldFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBodG1sKCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiAnaW5wdXQnLCAvLyB0aGUgZXZlbnQgbmFtZSBmaXJlcyBvbmx5IGluIGNvbnRlbnRlZGl0YWJsZSBtb2RlXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pbm5lckhUTUw7XG5cdFx0fSxcblx0XHRzZXRWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSBgJHt2YWx1ZX1gO1xuXHRcdH1cblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9odG1sLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0b246ICdpbnB1dCcsIC8vIHRoZSBldmVudCBuYW1lIGZpcmVzIG9ubHkgaW4gY29udGVudGVkaXRhYmxlIG1vZGVcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLnRleHRDb250ZW50O1xuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdHRoaXMudGV4dENvbnRlbnQgPSBgJHt2YWx1ZX1gO1xuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvdGV4dC5qc1xuICoqLyIsImltcG9ydCB7XG4gICAgdG9nZ2xlLFxuICAgIGNvbnRhaW5zXG59IGZyb20gJy4vX2NsYXNzbGlzdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYXNzTmFtZShjbGFzc05hbWUsIHN3aXRjaGVyPXRydWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbnRhaW5zKHRoaXMsIGNsYXNzTmFtZSk7XG5cdFx0XHRyZXR1cm4gc3dpdGNoZXIgPyB2YWx1ZSA6ICF2YWx1ZTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlKHRoaXMsIGNsYXNzTmFtZSwgc3dpdGNoZXIgPyAhIXZhbHVlIDogIXZhbHVlKVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzXG4gKiovIiwiLy8gQElFOVxuXG5sZXQgYWRkO1xubGV0IHJlbW92ZTtcbmxldCBjb250YWlucztcblxuaWYoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykuY2xhc3NMaXN0KSB7XG4gICAgYWRkID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICByZW1vdmUgPSAobm9kZSwgbmFtZSkgPT4gbm9kZS5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgIGNvbnRhaW5zID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xufSBlbHNlIHtcbiAgICBhZGQgPSAobm9kZSwgbmFtZSkgPT4ge1xuXHRcdGNvbnN0IHJlID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiICsgbmFtZSArIFwiKFxcXFxzfCQpXCIsIFwiZ1wiKTtcblx0XHRpZiAoIXJlLnRlc3Qobm9kZS5jbGFzc05hbWUpKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IChub2RlLmNsYXNzTmFtZSArIFwiIFwiICsgbmFtZSkucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikucmVwbGFjZSgvKF4gfCAkKS9nLCBcIlwiKTtcbiAgICAgICAgfVxuXHR9XG5cblx0cmVtb3ZlID0gKG5vZGUsIG5hbWUpID0+IHtcblx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIGMgKyBcIihcXFxcc3wkKVwiLCBcImdcIik7XG5cdFx0bm9kZS5jbGFzc05hbWUgPSBub2RlLmNsYXNzTmFtZS5yZXBsYWNlKHJlLCBcIiQxXCIpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyheIHwgJCkvZywgXCJcIik7XG5cdH1cblxuXHRjb250YWlucyA9IChub2RlLCBjKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBuYW1lICsgJyhcXFxcc3wkKScpLnRlc3Qobm9kZS5jbGFzc05hbWUpO1xuXHR9XG59XG5cbmNvbnN0IHRvZ2dsZSA9IChub2RlLCBuYW1lLCBzd2l0Y2hlcikgPT4ge1xuICAgIGlmKHN3aXRjaGVyKSB7XG4gICAgICAgIGFkZChub2RlLCBuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUobm9kZSwgbmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIHRvZ2dsZSxcbiAgICBjb250YWluc1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9fY2xhc3NsaXN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1twcm9wZXJ0eU5hbWVdO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHQvLyBpbiBjYXNlIHdoZW4geW91J3JlIHRyeWluZyB0byBzZXQgcmVhZC1vbmx5IHByb3BlcnR5XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvcHJvcC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF0dHIoYXR0cmlidXRlTmFtZSkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgdmFsdWUpO1xuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvYXR0ci5qc1xuICoqLyIsIi8vIHJlcGxhY2UgbmFtZXNMaWtlVGhpcyB3aXRoIG5hbWVzLWxpa2UtdGhpc1xuY29uc3QgdG9EYXNoZWQgPSAobmFtZSkgPT4ge1xuICAgIHJldHVybiAnZGF0YS0nICsgbmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csICh1KSA9PiBcIi1cIiArIHUudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRhdGFzZXQocHJvcCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlKCkge1xuXHRcdFx0aWYodGhpcy5kYXRhc2V0KXtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFzZXRbcHJvcF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXR0cmlidXRlKHRvRGFzaGVkKHByb3ApKTtcbiAgICAgICAgICAgIH1cblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHRpZiAodGhpcy5kYXRhc2V0KSB7XG5cdFx0XHRcdHRoaXMuZGF0YXNldFtwcm9wXSA9IHZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUodG9EYXNoZWQocHJvcCksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2RhdGFzZXQuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuXHRyZXR1cm4gaW5wdXQoJ3RleHQnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvdGV4dGFyZWEuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuXHRyZXR1cm4gaW5wdXQoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnB1dCh0eXBlKSB7XG4gICAgbGV0IG9uO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdyYWRpbyc6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG9uOiAnY2xpY2sga2V5dXAnLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnICYmIHRoaXMudmFsdWUgPT0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAnc3VibWl0JzpcbiAgICAgICAgY2FzZSAnYnV0dG9uJzpcbiAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIGNhc2UgJ2hpZGRlbic6XG4gICAgICAgICAgICBvbiA9IG51bGw7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICBvbiA9ICdjaGFuZ2UnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgIGNhc2UgJ3Bhc3N3b3JkJzpcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZXRpbWUtbG9jYWwnOlxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgY2FzZSAndGltZSc6XG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcbiAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICAgIGNhc2UgJ2NvbG9yJzpcbiAgICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XG4gICAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICBjYXNlICd0ZWwnOlxuICAgICAgICAgICAgY2FzZSAndXJsJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzogKi9cbiAgICAgICAgZGVmYXVsdDogLy8gb3RoZXIgZnV0dXJlIChIVE1MNispIGlucHV0c1xuICAgICAgICAgICAgb24gPSAnaW5wdXQnO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBvbixcbiAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2lucHV0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3V0cHV0KCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlIHx8IHRoaXMudGV4dENvbnRlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wZXJ0eSA9ICdmb3JtJyBpbiB0aGlzID8gJ3ZhbHVlJyA6ICd0ZXh0Q29udGVudCc7XG4gICAgICAgICAgICB0aGlzW3Byb3BlcnR5XSA9IHZhbHVlID09PSBudWxsID8gJycgOiBgJHt2YWx1ZX1gO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL291dHB1dC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdChtdWx0aXBsZSkge1xuICAgIGlmIChtdWx0aXBsZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb246ICdjaGFuZ2UnLFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IG9wdGlvbnMubGVuZ3RoID4gaTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChvcHRpb25zW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUoZ2l2ZW5WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBnaXZlblZhbHVlID09PSAnc3RyaW5nJyA/IFtnaXZlblZhbHVlXSA6IGdpdmVuVmFsdWU7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZCA9IH52YWx1ZS5pbmRleE9mKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogJ2NoYW5nZScsXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zW2ldLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zW2ldLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvc2VsZWN0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGlzcGxheShzd2l0Y2hlcj10cnVlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG51bGwsXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzKS5nZXRQcm9wZXJ0eVZhbHVlKCdkaXNwbGF5Jyk7XG4gICAgICAgICAgICBjb25zdCBub25lID0gdmFsdWUgPT09ICdub25lJztcbiAgICAgICAgICAgIHJldHVybiBzd2l0Y2hlciA/ICFub25lIDogbm9uZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3R5bGUgfSA9IHRoaXM7XG4gICAgICAgICAgICBpZihzd2l0Y2hlcikge1xuICAgICAgICAgICAgICAgIHN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnbm9uZScgOiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9kaXNwbGF5LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3R5bGUocHJvcGVydHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvbjogbnVsbCxcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUodGhpcykuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3N0eWxlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==