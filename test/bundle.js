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
	
	var componentsContext = __webpack_require__(68);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/bindings_spec.js": 2,
		"./bquery/add_spec.js": 50,
		"./bquery/create_spec.js": 51,
		"./bquery/events_spec.js": 52,
		"./bquery/find_spec.js": 54,
		"./bquery/init_spec.js": 55,
		"./bquery/is_spec.js": 56,
		"./bquery/not_spec.js": 57,
		"./bquery/one_spec.js": 58,
		"./bquery/parsehtml_spec.js": 59,
		"./class_spec.js": 60,
		"./events/delegated_collection_spec.js": 62,
		"./events/delegated_spec.js": 63,
		"./events/events_change_spec.js": 64,
		"./events/events_core_spec.js": 65,
		"./events/events_dom_spec.js": 66,
		"./events/events_summary_spec.js": 67
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
	
	var bindOptionalNode = __webpack_require__(44);
	
	var bindSandbox = __webpack_require__(45);
	
	var unbindNode = __webpack_require__(32);
	
	var select = __webpack_require__(46);
	
	var selectAll = __webpack_require__(47);
	
	var addListener = __webpack_require__(41);
	
	var makeObject = __webpack_require__(48);
	
	var createSpy = __webpack_require__(49);
	
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
	
	var switchBinding = __webpack_require__(31);
	
	var bindSingleNode = __webpack_require__(36);
	
	var checkObjectType = __webpack_require__(9);
	
	var MatreshkaError = __webpack_require__(10);
	
	var delegateListener = __webpack_require__(43);
	
	var addListener = __webpack_require__(41);
	
	var removeListener = __webpack_require__(34);
	
	var triggerOne = __webpack_require__(8);
	
	var unbindNode = __webpack_require__(32);
	
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
	
	var dom = __webpack_require__(15);
	
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
	
	var toArray = __webpack_require__(14);
	
	var dom = __webpack_require__(15);
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultDollar = __webpack_require__(16);
	
	var dom = {
	    $: defaultDollar
	};
	
	module.exports = dom;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bQuery = __webpack_require__(17);
	
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(18);
	
	var extend = __webpack_require__(20);
	
	var parseHTML = __webpack_require__(21);
	
	var one = __webpack_require__(22);
	
	var create = __webpack_require__(23);
	
	var on = __webpack_require__(24);
	
	var off = __webpack_require__(27);
	
	var is = __webpack_require__(26);
	
	var add = __webpack_require__(28);
	
	var not = __webpack_require__(29);
	
	var find = __webpack_require__(30);
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(19);
	
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(19);
	
	var Init = __webpack_require__(18);
	
	// parses given HTML and returns bQuery (BQueryInit) instance
	module.exports = parseHTML;
	function parseHTML(html) {
	    return new Init(html2nodeList(html));
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(18);
	
	// returns the first element of matched set
	module.exports = one;
	function one(s, context) {
	    return new Init(s, context)[0];
	}

/***/ },
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(25);
	
	var is = __webpack_require__(26);
	
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
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	// share data between as an object modules because we use
	// simplified es modules there and cannot import and share a number
	module.exports = {
	    nodeIndex: 0,
	    allEvents: {}
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	// check the first element from given set against a selector
	module.exports = is;
	function is(s) {
	    var node = this[0];
	    return node ? (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, s) : false;
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(25);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(18);
	
	var data = __webpack_require__(25);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(18);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(18);
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var unbindNode = __webpack_require__(32);
	
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(9);
	
	var defs = __webpack_require__(5);
	
	var getNodes = __webpack_require__(12);
	
	var bindNode = __webpack_require__(3);
	
	var undelegateListener = __webpack_require__(33);
	
	var removeBinding = __webpack_require__(35);
	
	var dom = __webpack_require__(15);
	
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var removeListener = __webpack_require__(34);
	
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var removeListener = __webpack_require__(34);
	
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(37);
	
	var runNodeHandler = __webpack_require__(39);
	
	var runObjectHandler = __webpack_require__(40);
	
	var triggerOne = __webpack_require__(8);
	
	var addListener = __webpack_require__(41);
	
	var debounce = __webpack_require__(42);
	
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(38);
	
	module.exports = function (node) {
	    var result = void 0;
	
	    for (var i = 0; i < defaultBinders.length; i++) {
	        if (result = defaultBinders[i].call(node, node)) {
	            return result;
	        }
	    }
	};

/***/ },
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(41);
	
	var undelegateListener = __webpack_require__(33);
	
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
/* 44 */
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(3);
	
	var unbindNode = __webpack_require__(32);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var dom = __webpack_require__(15);
	
	var selectNodes = __webpack_require__(13);
	
	var toArray = __webpack_require__(14);
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(5);
	
	var dom = __webpack_require__(15);
	
	var selectNodes = __webpack_require__(13);
	
	var toArray = __webpack_require__(14);
	
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
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-unresolved */
	
	
	var $ = __webpack_require__(17);
	
	var simulateClick = __webpack_require__(53);
	
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
/* 53 */
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
	describe('bQuery.fn.not', function () {
	    it('checks className', function () {
	        var el = document.createElement('div');
	        el.className = 'el';
	
	        expect($(el).is('.el')).toEqual(true);
	
	        expect($(el).is('.el2')).toEqual(false);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
	describe('bQuery.one', function () {
	    it('finds', function () {
	        var testSandbox = document.createElement('div');
	
	        testSandbox.innerHTML = '\n        <div class="child">\n            <div class="grandchild"></div>\n        </div>\n        <div class="child2">\n            <div class="grandchild2"></div>\n        </div>\n        ';
	
	        var child = testSandbox.querySelector('.child');
	
	        expect($.one('*', testSandbox)).toEqual(child);
	    });
	}); /* eslint-disable import/no-unresolved */

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(17);
	
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(61);
	
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(20);
	
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
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(43);
	
	var undelegateListener = __webpack_require__(33);
	
	var triggerOne = __webpack_require__(8);
	
	var makeObject = __webpack_require__(48);
	
	var createSpy = __webpack_require__(49);
	
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(41);
	
	var delegateListener = __webpack_require__(43);
	
	var undelegateListener = __webpack_require__(33);
	
	var removeListener = __webpack_require__(34);
	
	var makeObject = __webpack_require__(48);
	
	var createSpy = __webpack_require__(49);
	
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(41);
	
	var removeListener = __webpack_require__(34);
	
	var triggerOne = __webpack_require__(8);
	
	var createSpy = __webpack_require__(49);
	
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
/* 66 */
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
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_bindings/bindsinglenode.js": 36,
		"./_bindings/defaultbinders.js": 38,
		"./_bindings/getnodes.js": 12,
		"./_bindings/lookforbinder.js": 37,
		"./_bindings/removebinding.js": 35,
		"./_bindings/runnodehandler.js": 39,
		"./_bindings/runobjecthandler.js": 40,
		"./_bindings/selectnodes.js": 13,
		"./_bindings/switchbinding.js": 31,
		"./_core/defineprop.js": 6,
		"./_core/defs.js": 5,
		"./_core/init.js": 4,
		"./_dom/default-dollar.js": 16,
		"./_dom/index.js": 15,
		"./_events/addlistener.js": 41,
		"./_events/delegatelistener.js": 43,
		"./_events/removelistener.js": 34,
		"./_events/triggerone.js": 8,
		"./_events/undelegatelistener.js": 33,
		"./_util/checkobjecttype.js": 9,
		"./_util/debounce.js": 42,
		"./_util/is.js": 11,
		"./_util/matreshkaerror.js": 10,
		"./_util/toarray.js": 14,
		"./array.js": 69,
		"./binders/_classlist.js": 70,
		"./binders/attr.js": 71,
		"./binders/classname.js": 72,
		"./binders/dataset.js": 73,
		"./binders/display.js": 74,
		"./binders/html.js": 75,
		"./binders/index.js": 76,
		"./binders/input.js": 78,
		"./binders/output.js": 84,
		"./binders/progress.js": 81,
		"./binders/prop.js": 77,
		"./binders/select.js": 80,
		"./binders/style.js": 83,
		"./binders/text.js": 82,
		"./binders/textarea.js": 79,
		"./bindnode.js": 3,
		"./bindoptionalnode.js": 44,
		"./bindsandbox.js": 45,
		"./bquery/_data.js": 25,
		"./bquery/_html2nodelist.js": 19,
		"./bquery/_init.js": 18,
		"./bquery/add.js": 28,
		"./bquery/create.js": 23,
		"./bquery/find.js": 30,
		"./bquery/index.js": 17,
		"./bquery/is.js": 26,
		"./bquery/not.js": 29,
		"./bquery/off.js": 27,
		"./bquery/on.js": 24,
		"./bquery/one.js": 22,
		"./bquery/parsehtml.js": 21,
		"./class.js": 61,
		"./extend.js": 20,
		"./index.js": 85,
		"./magic.js": 88,
		"./matreshka/index.js": 86,
		"./object/index.js": 87,
		"./on.js": 89,
		"./select.js": 46,
		"./selectall.js": 47,
		"./set.js": 7,
		"./unbindnode.js": 32
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
	webpackContext.id = 68;


/***/ },
/* 69 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 70 */
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
/* 71 */
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
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classlistJs = __webpack_require__(70);
	
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html = __webpack_require__(75);
	
	var display = __webpack_require__(74);
	
	var className = __webpack_require__(72);
	
	var prop = __webpack_require__(77);
	
	var attr = __webpack_require__(71);
	
	var input = __webpack_require__(78);
	
	var textarea = __webpack_require__(79);
	
	var select = __webpack_require__(80);
	
	var progress = __webpack_require__(81);
	
	var text = __webpack_require__(82);
	
	var style = __webpack_require__(83);
	
	var dataset = __webpack_require__(73);
	
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
/* 77 */
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
/* 78 */
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(78);
	
	module.exports = textarea;
	function textarea() {
		return input('text');
	}

/***/ },
/* 80 */
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(78);
	
	module.exports = textarea;
	function textarea() {
		return input();
	}

/***/ },
/* 82 */
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
/* 83 */
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

/***/ },
/* 84 */
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(86);
	
	var MatreshkaArray = __webpack_require__(69);
	
	var MatreshkaObject = __webpack_require__(87);
	
	var Class = __webpack_require__(61);
	
	//import binders from './binders';
	
	Matreshka.Array = MatreshkaArray;
	Matreshka.Object = MatreshkaObject;
	Matreshka.Class = Class;
	//Matreshka.binders = binders;
	
	module.exports = Matreshka;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(20);
	
	var Class = __webpack_require__(61);
	
	module.exports = Class({
	    // instance properies and methods
	
	}, {
	    // static properties and methods
	    extend: extend
	});

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 88 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = 1;

/***/ },
/* 89 */
/***/ function(module, exports) {

	"use strict";
	
	// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/
	
	module.exports = on;
	function on() {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjk1OTc3MGNmMTY2ODk2Y2VhZDAiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9pbml0LmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZzLmpzIiwid2VicGFjazovLy8uL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvY2hlY2tvYmplY3R0eXBlLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC9tYXRyZXNoa2FlcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX3V0aWwvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9nZXRub2Rlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9fdXRpbC90b2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9faW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9leHRlbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9wYXJzZWh0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYnF1ZXJ5L19kYXRhLmpzIiwid2VicGFjazovLy8uL3NyYy9icXVlcnkvaXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9vZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9ub3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JxdWVyeS9maW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3Mvc3dpdGNoYmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdW5iaW5kbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9yZW1vdmViaW5kaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvYmluZHNpbmdsZW5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19iaW5kaW5ncy9ydW5ub2RlaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2JpbmRpbmdzL3J1bm9iamVjdGhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL191dGlsL2RlYm91bmNlLmpzIiwid2VicGFjazovLy8uL3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRzYW5kYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlbGVjdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9tYWtlb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Rlc3QvbGliL2NyZWF0ZXNweS5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L2FkZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvY3JlYXRlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9ldmVudHNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L2xpYi9zaW11bGF0ZWNsaWNrLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvaXNfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvYnF1ZXJ5L25vdF9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9icXVlcnkvb25lX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2JxdWVyeS9wYXJzZWh0bWxfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0L3NwZWMvY2xhc3Nfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY2hhbmdlX3NwZWMuanMiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX3N1bW1hcnlfc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMgLipcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL19jbGFzc2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvYXR0ci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9jbGFzc25hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvZGF0YXNldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9kaXNwbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9iaW5kZXJzL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9pbnB1dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvcHJvZ3Jlc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JpbmRlcnMvdGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9zdHlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmluZGVycy9vdXRwdXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYXRyZXNoa2EvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFnaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL29uLmpzIl0sIm5hbWVzIjpbXSwi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SUFBVixHQUFpQixFQUFqQixRQUF5QixLQUExQztBQUNIO0FBUkUsTUFBUDtBQVVILEc7Ozs7Ozs7O3FDQ1hxQixFOzswQ0FDSyxFOzsyQ0FDQyxFOztpQ0FDVixFOztBQUNsQjs7QUFFQSxXQUFVLEtBQVYsR0FBa0IsY0FBbEI7QUFDQSxXQUFVLE1BQVYsR0FBbUIsZUFBbkI7QUFDQSxXQUFVLEtBQVYsR0FBa0IsS0FBbEI7QUFDQTs7a0JBRWUsUzs7Ozs7Ozs7a0NDWEksRTs7aUNBQ0QsRTs7a0JBRUgsTUFBTTtBQUNqQjs7QUFEaUIsRUFBTixFQUdaO0FBQ0M7QUFDQTtBQUZELEVBSFksQzs7Ozs7Ozs7a0JDSEEsQzs7Ozs7Ozs7a0JDQUEsQzs7Ozs7Ozs7QUNDZjs7a0JBRXdCLEU7QUFBVCxVQUFTLEVBQVQsR0FBYyxDQUU1QixDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNjk1OTc3MGNmMTY2ODk2Y2VhZDBcbiAqKi8iLCIvLyBUaGlzIGdldHMgcmVwbGFjZWQgYnkga2FybWEgd2VicGFjayB3aXRoIHRoZSB1cGRhdGVkIGZpbGVzIG9uIHJlYnVpbGRcbmNvbnN0IF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXyA9IFtdO1xuXG4vLyByZXF1aXJlIGFsbCBtb2R1bGVzIGVuZGluZyBpbiBcIl90ZXN0XCIgZnJvbSB0aGVcbi8vIGN1cnJlbnQgZGlyZWN0b3J5IGFuZCBhbGwgc3ViZGlyZWN0b3JpZXNcbmNvbnN0IHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi9zcGVjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuXG5mdW5jdGlvbiBpbk1hbmlmZXN0KHBhdGgpIHtcblx0cmV0dXJuIF9fa2FybWFXZWJwYWNrTWFuaWZlc3RfXy5pbmRleE9mKHBhdGgpID49IDA7XG59XG5cbmxldCBydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCkuZmlsdGVyKGluTWFuaWZlc3QpO1xuXG4vLyBSdW4gYWxsIHRlc3RzIGlmIHdlIGRpZG4ndCBmaW5kIGFueSBjaGFuZ2VzXG5pZiAoIXJ1bm5hYmxlLmxlbmd0aCkge1xuXHRydW5uYWJsZSA9IHRlc3RzQ29udGV4dC5rZXlzKCk7XG59XG5cbnJ1bm5hYmxlLmZvckVhY2godGVzdHNDb250ZXh0KTtcblxuXG5jb25zdCBjb21wb25lbnRzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dCgnLi4vc3JjLycsIHRydWUsIC8uKlxcLmpzJC8pO1xuY29tcG9uZW50c0NvbnRleHQua2V5cygpLmZvckVhY2goY29tcG9uZW50c0NvbnRleHQpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L2luZGV4LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcIjogMixcblx0XCIuL2JxdWVyeS9hZGRfc3BlYy5qc1wiOiA1MCxcblx0XCIuL2JxdWVyeS9jcmVhdGVfc3BlYy5qc1wiOiA1MSxcblx0XCIuL2JxdWVyeS9ldmVudHNfc3BlYy5qc1wiOiA1Mixcblx0XCIuL2JxdWVyeS9maW5kX3NwZWMuanNcIjogNTQsXG5cdFwiLi9icXVlcnkvaW5pdF9zcGVjLmpzXCI6IDU1LFxuXHRcIi4vYnF1ZXJ5L2lzX3NwZWMuanNcIjogNTYsXG5cdFwiLi9icXVlcnkvbm90X3NwZWMuanNcIjogNTcsXG5cdFwiLi9icXVlcnkvb25lX3NwZWMuanNcIjogNTgsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcIjogNTksXG5cdFwiLi9jbGFzc19zcGVjLmpzXCI6IDYwLFxuXHRcIi4vZXZlbnRzL2RlbGVnYXRlZF9jb2xsZWN0aW9uX3NwZWMuanNcIjogNjIsXG5cdFwiLi9ldmVudHMvZGVsZWdhdGVkX3NwZWMuanNcIjogNjMsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXCI6IDY0LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19jb3JlX3NwZWMuanNcIjogNjUsXG5cdFwiLi9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXCI6IDY2LFxuXHRcIi4vZXZlbnRzL2V2ZW50c19zdW1tYXJ5X3NwZWMuanNcIjogNjdcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NwZWMgLipcXC5qcyRcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnc3JjL2JpbmRub2RlJztcbmltcG9ydCBiaW5kT3B0aW9uYWxOb2RlIGZyb20gJ3NyYy9iaW5kb3B0aW9uYWxub2RlJztcbmltcG9ydCBiaW5kU2FuZGJveCBmcm9tICdzcmMvYmluZHNhbmRib3gnO1xuaW1wb3J0IHVuYmluZE5vZGUgZnJvbSAnc3JjL3VuYmluZG5vZGUnO1xuaW1wb3J0IHNlbGVjdCBmcm9tICdzcmMvc2VsZWN0JztcbmltcG9ydCBzZWxlY3RBbGwgZnJvbSAnc3JjL3NlbGVjdGFsbCc7XG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvYWRkbGlzdGVuZXInO1xuaW1wb3J0IG1ha2VPYmplY3QgZnJvbSAnLi4vLi4vbGliL21ha2VvYmplY3QnO1xuaW1wb3J0IGNyZWF0ZVNweSBmcm9tICcuLi8uLi9saWIvY3JlYXRlc3B5JztcblxuZGVzY3JpYmUoJ0JpbmRpbmdzJywgKCkgPT4ge1xuICAgIGxldCBvYmo7XG4gICAgbGV0IG5vZGU7XG4gICAgbGV0IGJpbmRlcjtcbiAgICBsZXQgc2ltdWxhdGVEb21FdmVudDtcbiAgICBsZXQgaW5pdGlhbGl6ZUNhbGw7XG4gICAgbGV0IGRlc3Ryb3lDYWxsO1xuICAgIGNvbnN0IG5vRGVib3VuY2VGbGFnID0geyBkZWJvdW5jZTogZmFsc2UgfTtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVCaW5kID0gKGtleSA9ICd4JykgPT4ge1xuICAgICAgICBvYmpba2V5XSA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIG5vZGUudmFsdWUgPSAnYmFyJztcbiAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgZXhwZWN0KG9ialtrZXldKS50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgZXhwZWN0KGluaXRpYWxpemVDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHRlc3RTaW1wbGVVbmJpbmQgPSAoKSA9PiB7XG4gICAgICAgIG9iai54ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXonO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBleHBlY3QoZGVzdHJveUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgaW5pdGlhbGl6ZUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgZGVzdHJveUNhbGwgPSBjcmVhdGVTcHkoKTtcblxuICAgICAgICBiaW5kZXIgPSAge1xuICAgICAgICAgICAgb24oY2JjKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmR1bW15ZXZlbnQgPSBjYmM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0VmFsdWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsdWUodikge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRpYWxpemUobykge1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplQ2FsbCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLm9uZHVtbXlldmVudCA9ICgpID0+IHt9O1xuICAgICAgICAgICAgICAgIGRlc3Ryb3lDYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGRlYm91bmNlJywgZG9uZSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIpO1xuICAgICAgICBvYmoueCA9ICdmb28nO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICAgICAgbm9kZS5vbmR1bW15ZXZlbnQoKTtcbiAgICAgICAgICAgIGV4cGVjdChvYmoueCkudG9FcXVhbCgnYmFyJyk7XG4gICAgICAgICAgICBleHBlY3QoaW5pdGlhbGl6ZUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSwgNTApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYmluZENhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgY29uc3QgYmluZEtleUNhbGwgPSBjcmVhdGVTcHkoKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZCcsIGJpbmRDYWxsKTtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnYmluZDp4JywgYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChiaW5kQ2FsbCkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICBleHBlY3QoYmluZEtleUNhbGwpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgdW5iaW5kIGFuZCB0cmlnZ2VyIGV2ZW50cycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdW5iaW5kQ2FsbCA9IGNyZWF0ZVNweSgpO1xuICAgICAgICBjb25zdCB1bmJpbmRLZXlDYWxsID0gY3JlYXRlU3B5KCk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3VuYmluZCcsIHVuYmluZENhbGwpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICd1bmJpbmQ6eCcsIHVuYmluZEtleUNhbGwpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneCcsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIGV4cGVjdCh1bmJpbmRLZXlDYWxsKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcga2V5LW5vZGUgb2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIHsgeDogbm9kZSB9LCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcgbm9kZSBpcyBnaXZlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgd3JvbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosICd4Jywgd3JvbmdOb2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgbm90IHVuYmluZCB3bmUgd3Jvbmcga2V5IGlzIGdpdmVuJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneScsIG5vZGUpO1xuICAgICAgICB0ZXN0U2ltcGxlQmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgd2hlbiBub2RlIGlzIG5vdCBnaXZlbicsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneCcsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgJ3gnKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYWxsIHdoZW4gbmVpdGhlciBrZXkgbm9yIG5vZGUgaXMgZ2l2ZW4nLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmopO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCBrZXktbm9kZSBvYmplY3QnLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0sIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICB1bmJpbmROb2RlKG9iaiwgeyB4OiBub2RlIH0pO1xuICAgICAgICB0ZXN0U2ltcGxlVW5iaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGJpbmQgdXNpbmcgYXJyYXkgb2Ygb2JqZWN0cycsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCBbeyBrZXk6ICd4Jywgbm9kZSwgYmluZGVyIH1dLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHVuYmluZCB1c2luZyBhcnJheSBvZiBvYmplY3RzJywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlLCBiaW5kZXIgfV0sIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZShvYmosIFt7IGtleTogJ3gnLCBub2RlIH1dKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGEgcHJvcGVydHkgaW4gY29udGV4dCBvYmplY3Qgd2hpY2ggaGFzIGlzTUs9dHJ1ZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcbiAgICAgICAgYmluZE5vZGUuY2FsbChvYmosICd4Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHRlc3RTaW1wbGVCaW5kKCk7XG4gICAgICAgIGV4cGVjdChvYmoubm9kZXMueCkudG9FcXVhbChub2RlKTtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShvYmouJG5vZGVzLngpXG4gICAgICAgICkudG9FcXVhbChbbm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgYSBwcm9wZXJ0eSBpbiBjb250ZXh0IG9iamVjdCB3aGljaCBoYXMgaXNNSz10cnVlIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICBvYmogPSB7XG4gICAgICAgICAgICBpc01LOiB0cnVlLFxuICAgICAgICAgICAgbm9kZXM6IHt9LFxuICAgICAgICAgICAgJG5vZGVzOiB7fVxuICAgICAgICB9O1xuICAgICAgICBiaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlLCBiaW5kZXIsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgdW5iaW5kTm9kZS5jYWxsKG9iaiwgJ3gnLCBub2RlKTtcbiAgICAgICAgdGVzdFNpbXBsZVVuYmluZCgpO1xuICAgICAgICBleHBlY3Qob2JqLm5vZGVzLngpLnRvQmVVbmRlZmluZWQoKTtcbiAgICAgICAgZXhwZWN0KG9iai4kbm9kZXMueCkudG9CZVVuZGVmaW5lZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiaW5kIGRlbGVnYXRlZCB0YXJnZXQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueC55LnogPSAnZm9vJztcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB1bmJpbmQgZGVsZWdhdGVkIHRhcmdldCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgneC55Jyk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueS56Jywgbm9kZSwgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG4gICAgICAgIHVuYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlKTtcbiAgICAgICAgb2JqLngueS56ID0gJ2Zvbyc7XG4gICAgICAgIGV4cGVjdChub2RlLnZhbHVlKS50b0VxdWFsKCcnKTtcbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3Qob2JqLngueS56KS50b0VxdWFsKCdmb28nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYW5jZWxzIGRlZXAgYmluZGluZyB3aGVuIGRlZXA9ZmFsc2Ugb3B0aW9uIGlzIHBhc3NlZCcsICgpID0+IHtcbiAgICAgICAgYmluZE5vZGUob2JqLCAneC55LnonLCBub2RlLCBiaW5kZXIsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgZGVlcDogZmFsc2VcbiAgICAgICAgfSwgbm9EZWJvdW5jZUZsYWcpKTtcbiAgICAgICAgdGVzdFNpbXBsZUJpbmQoJ3gueS56Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlYmluZCBkZWxlZ2F0ZWQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnkueicsICdnbycpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBvYmoueCA9IG1ha2VPYmplY3QoJ3kueicsICdmb28nKTtcbiAgICAgICAgZXhwZWN0KG5vZGUudmFsdWUpLnRvRXF1YWwoJ2ZvbycpO1xuICAgICAgICBub2RlLnZhbHVlID0gJ2Jhcic7XG4gICAgICAgIG5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgYmluZGluZyBpZiBkZWxlZ2F0ZWQgdGFyZ2V0IGlzIHJlYXNzaWduZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ3gueScpO1xuICAgICAgICBiaW5kTm9kZShvYmosICd4LnkueicsIG5vZGUsIGJpbmRlciwgbm9EZWJvdW5jZUZsYWcpO1xuICAgICAgICBjb25zdCB4ID0gb2JqLng7XG5cbiAgICAgICAgb2JqLnggPSBtYWtlT2JqZWN0KCd5LnonLCAnZm9vJyk7XG5cbiAgICAgICAgbm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBub2RlLm9uZHVtbXlldmVudCgpO1xuICAgICAgICBleHBlY3QoeC55LnopLm5vdC50b0VxdWFsKCdiYXInKTtcbiAgICAgICAgd2luZG93LnRhcmdldCA9IG9iai54Lnk7XG4gICAgICAgIGV4cGVjdChvYmoueC55LnopLnRvRXF1YWwoJ2JhcicpO1xuICAgICAgICB4LnkueiA9ICdiYXonO1xuICAgICAgICBleHBlY3Qobm9kZS52YWx1ZSkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgndXNlcyBjdXN0b20gc2VsZWN0b3JzIG9uIGN1cnJlbnQgdGFyZ2V0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCd4LnknLCAnZm9vJyk7XG4gICAgICAgIGNvbnN0IGNoaWxkTm9kZSA9IG5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcblxuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94Jywgbm9kZSk7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3gueScsICc6c2FuZGJveCBzcGFuJywgYmluZGVyLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkTm9kZS52YWx1ZSkudG9FcXVhbCgnZm9vJyk7XG4gICAgICAgIGNoaWxkTm9kZS52YWx1ZSA9ICdiYXInO1xuICAgICAgICBjaGlsZE5vZGUub25kdW1teWV2ZW50KCk7XG4gICAgICAgIGV4cGVjdChvYmoueC55KS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcblxuICAgIGl0KGB0aHJvd3MgZXJyb3Igd2hlbiBub2RlIGlzbid0IHRoZXJlYCwgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE5vZGUob2JqLCAneCcpO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdChgZG9lc24ndCB0aHJvdyBlcnJvciB3aGVuIG5vZGUgaXNuJ3QgdGhlcmUgYW5kIG9wdGlvbmFsPXRydWUgaXMgZ2l2ZW5gLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgICAgICBiaW5kTm9kZShvYmosICd4JywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHsgb3B0aW9uYWw6IHRydWUgfSk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lc25cXCd0IHRocm93IGVycm9yIHdpdGggYmluZE9wdGlvbmFsTm9kZSBtZXRob2Qgb2YgTWF0cmVzaGthIHdoZW4gbm9kZSBpcyBtaXNzaW5nJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZE9wdGlvbmFsTm9kZShvYmosICd4Jyk7XG4gICAgICAgIH0pLm5vdC50b1Rocm93KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2VsZWN0cyBjaGlsZHJlbiBvZiBzYW5kYm94JywgKCkgPT4ge1xuICAgICAgICBiaW5kTm9kZShvYmosICdzYW5kYm94JywgYDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXR0cj1cImZvb1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnc3BhbicpLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJ3NwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbGVjdHMgbm9kZXMgd2l0aCBjdXN0b20gc2VsZWN0b3InLCAoKSA9PiB7XG4gICAgICAgIGJpbmROb2RlKG9iaiwgJ3NhbmRib3gnLCBgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhdHRyPVwiZm9vXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCBzcGFuJykuZ2V0QXR0cmlidXRlKCdhdHRyJylcbiAgICAgICAgKS50b0VxdWFsKCdmb28nKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHNwYW4nKS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdEFsbChvYmosICc6Ym91bmQoc2FuZGJveCkgc3BhbicpWzBdLmdldEF0dHJpYnV0ZSgnYXR0cicpXG4gICAgICAgICkudG9FcXVhbCgnZm9vJyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpzYW5kYm94IHNwYW4nKVswXS5nZXRBdHRyaWJ1dGUoJ2F0dHInKVxuICAgICAgICApLnRvRXF1YWwoJ2ZvbycpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIHNlbGVjdChvYmosICc6c2FuZGJveCB0YWJsZScpXG4gICAgICAgICkudG9FcXVhbChudWxsKTtcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICBzZWxlY3Qob2JqLCAnOmJvdW5kKHNhbmRib3gpIHRhYmxlJylcbiAgICAgICAgKS50b0VxdWFsKG51bGwpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsKG9iaiwgJzpib3VuZChzYW5kYm94KSB0YWJsZScpXG4gICAgICAgICAgICApXG4gICAgICAgICkudG9FcXVhbChbXSk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOnNhbmRib3ggdGFibGUnKVxuICAgICAgICAgICAgKVxuICAgICAgICApLnRvRXF1YWwoW10pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FsbG93cyB0byBiaW5kIGFuZCByZWJpbmQgc2FuZGJveCB2aWEgYmluZFNhbmRib3gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgICAgIGlzTUs6IHRydWUsXG4gICAgICAgICAgICBub2Rlczoge30sXG4gICAgICAgICAgICAkbm9kZXM6IHt9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFub3RoZXJOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIG5vZGUsIG5vRGVib3VuY2VGbGFnKTtcbiAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmosIGFub3RoZXJOb2RlLCBub0RlYm91bmNlRmxhZyk7XG5cbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwob2JqLCAnOmJvdW5kKHNhbmRib3gpJylcbiAgICAgICAgICAgIClcbiAgICAgICAgKS50b0VxdWFsKFthbm90aGVyTm9kZV0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2JpbmRTYW5kYm94IHRocm93cyBhbiBlcnJvciB3aGVuIG5vZGUgaXMgbWlzc2luZycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0ge1xuICAgICAgICAgICAgaXNNSzogdHJ1ZSxcbiAgICAgICAgICAgIG5vZGVzOiB7fSxcbiAgICAgICAgICAgICRub2Rlczoge31cbiAgICAgICAgfTtcblxuICAgICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICAgICAgYmluZFNhbmRib3guY2FsbChvYmopO1xuICAgICAgICB9KS50b1Rocm93KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JpbmRpbmdzL2JpbmRpbmdzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgaW5pdE1LIGZyb20gJy4vX2NvcmUvaW5pdCc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuL19jb3JlL2RlZmluZXByb3AnO1xuaW1wb3J0IGdldE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL2dldG5vZGVzJztcbmltcG9ydCBzd2l0Y2hCaW5kaW5nIGZyb20gJy4vX2JpbmRpbmdzL3N3aXRjaGJpbmRpbmcnO1xuaW1wb3J0IGJpbmRTaW5nbGVOb2RlIGZyb20gJy4vX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IE1hdHJlc2hrYUVycm9yIGZyb20gJy4vX3V0aWwvbWF0cmVzaGthZXJyb3InO1xuaW1wb3J0IGRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IGFkZExpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4vdW5iaW5kbm9kZSc7XG5cbi8vIFRoZSBtYWluIG1ldGhvZCBvZiB0aGUgZnJhbWV3b3JrOiBiaW5kcyBhIHByb3BlcnR5IG9mIGFuIG9iamVjdCB0byBIVE1MIG5vZGVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmROb2RlKG9iamVjdCwga2V5LCBub2RlLCBiaW5kZXIsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IGJpbmRlcjtcbiAgICAgICAgYmluZGVyID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IGtleTtcbiAgICAgICAga2V5ID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ2JpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgIGJpbmRlciA9IGJpbmRlciB8fCB7fTtcbiAgICBjb25zdCB7IHRlbXBvcmFyeU9wdGlvbmFsRmxhZyB9ID0gYmluZE5vZGU7XG4gICAgY29uc3QgeyBwcm9wcyB9ID0gaW5pdE1LKG9iamVjdCk7XG4gICAgY29uc3QgeyBvcHRpb25hbD10ZW1wb3JhcnlPcHRpb25hbEZsYWcsIGRlZXAsIHNpbGVudCB9ID0gZXZ0O1xuXG4gICAgZGVsZXRlIGJpbmROb2RlLnRlbXBvcmFyeU9wdGlvbmFsRmxhZztcblxuICAgIC8vIHRocm93IGVycm9yIHdoZW4ga2V5IGlzIG5vdCBnaXZlblxuICAgIGlmKCFrZXkpIHtcbiAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6ZmFsc3lfa2V5Jyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMuYmluZE5vZGUoWydhJywgJ2InLCAnYyddLCBub2RlKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBub2ZuLmZvckVhY2goa2V5LCBpdGVtS2V5ID0+IGJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgYmluZGVyLCBldnQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBhY2NlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy5iaW5kTm9kZShbe2tleSwgbm9kZSwgYmluZGVyLCBldmVudH1dLCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgKHtcbiAgICAgICAgICAgICAgICBrZXk6IGl0ZW1LZXksXG4gICAgICAgICAgICAgICAgbm9kZTogaXRlbU5vZGUsXG4gICAgICAgICAgICAgICAgYmluZGVyOiBpdGVtQmluZGVyLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBpdGVtRXZlbnRcbiAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tb25FdmVudCA9IG5vZGU7XG4gICAgICAgICAgICAgICAgY29uc3QgbWVyZ2VkRXZlbnQgPSB7fTtcblxuXG4gICAgICAgICAgICAgICAgaWYoaXRlbUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dGVuZCBldmVudCBvYmplY3QgYnkgXCJsb2NhbFwiIGV2ZW50IChcImV2ZW50XCIga2V5IG9mIGFuIG9iamVjdClcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24obWVyZ2VkRXZlbnQsIGl0ZW1FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY29tbW9uRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZW5kIGV2ZW50IG9iamVjdCBieSBcImdsb2JhbFwiIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKG1lcmdlZEV2ZW50LCBjb21tb25FdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYmluZE5vZGUob2JqZWN0LCBpdGVtS2V5LCBpdGVtTm9kZSwgaXRlbUJpbmRlciwgbWVyZ2VkRXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qXG4gICAgICogYWNjZXB0IGtleS1ub2RlIG9iamVjdFxuICAgICAqIHRoaXMuYmluZE5vZGUoeyBrZXk6ICQoKSB9LCB7IG9uOiAnZXZ0JyB9LCB7IHNpbGVudDogdHJ1ZSB9KTtcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbm9mbi5mb3JPd24oa2V5LCAoa2V5T2JqVmFsdWUsIGtleU9iaktleSkgPT4gYmluZE5vZGUob2JqZWN0LCBrZXlPYmpLZXksIGtleU9ialZhbHVlLCBub2RlLCBiaW5kZXIpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCAkbm9kZXMgPSBnZXROb2RlcyhvYmplY3QsIG5vZGUpO1xuXG4gICAgLy8gY2hlY2sgbm9kZSBleGlzdGVuY2VcbiAgICBpZiAoISRub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgTWF0cmVzaGthRXJyb3IoJ2JpbmRpbmc6bm9kZV9taXNzaW5nJywgeyBrZXksIG5vZGUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVlcCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgZGVlcFBhdGggPSBrZXkuc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3QgZGVlcFBhdGhMZW5ndGggPSBkZWVwUGF0aC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGRlZXBQYXRoTGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGJpbmRpbmcgd2hlbiBrZXkgYXJnIGluY2x1ZGVzIGRvdHMgKGVnIFwiYS5iLmMuZFwiKVxuICAgICAgICAgICAgY29uc3QgY2hhbmdlSGFuZGxlciA9IChjaGFuZ2VFdnQgPSB7fSkgPT4gc3dpdGNoQmluZGluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZUV2dCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBkZWVwUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgJG5vZGVzLFxuICAgICAgICAgICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICAgICAgICAgIGV2dCxcbiAgICAgICAgICAgICAgICAgICAgYmluZE5vZGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMiksXG4gICAgICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMl19YCwgY2hhbmdlSGFuZGxlcik7XG5cbiAgICAgICAgICAgIGNoYW5nZUhhbmRsZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BEZWYgPSBkZWZpbmVQcm9wKG9iamVjdCwga2V5KTtcblxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICAvLyBpZiBvYmplY3QgaXMgTWF0cmVzaGthIGluc3RhbmNlIHRoZW4gZXh0ZW5kIFwiJG5vZGVzXCIgYW5kIFwibm9kZXNcIiBvYmplY3RzXG4gICAgICAgIGNvbnN0IHsgJG5vZGVzOiAkYWxsTm9kZXMsIG5vZGVzOiBhbGxOb2RlcyB9ID0gb2JqZWN0O1xuXG4gICAgICAgIGlmKCEkYWxsTm9kZXMgfHwgIWFsbE5vZGVzKSB7XG4gICAgICAgICAgICB0aHJvdyBNYXRyZXNoa2FFcnJvcignYmluZGluZzppbnN0YW5jZV9ub2Rlc19taXNzaW5nJywge1xuICAgICAgICAgICAgICAgICRub2RlczogJGFsbE5vZGVzLFxuICAgICAgICAgICAgICAgIG5vZGVzOiBhbGxOb2Rlc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldICYmICRhbGxOb2Rlc1trZXldLmxlbmd0aFxuICAgICAgICAgICAgPyAkYWxsTm9kZXNba2V5XS5hZGQoJG5vZGVzKVxuICAgICAgICAgICAgOiAkbm9kZXM7XG5cbiAgICAgICAgYWxsTm9kZXNba2V5XSA9ICRhbGxOb2Rlc1trZXldWzBdO1xuICAgIH1cblxuICAgIC8vIGhhbmRsZSBiaW5kaW5nIGZvciBldmVyeSBub2RlIHNlcGFyYXRlbHlcbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCAobm9kZSkgPT4gYmluZFNpbmdsZU5vZGUob2JqZWN0LCB7XG4gICAgICAgICRub2RlcyxcbiAgICAgICAgbm9kZSxcbiAgICAgICAga2V5LFxuICAgICAgICBldnQsXG4gICAgICAgIGJpbmRlcixcbiAgICAgICAgcHJvcERlZlxuICAgIH0pKTtcblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kbm9kZS5qc1xuICoqLyIsImltcG9ydCBkZWZzIGZyb20gJy4vZGVmcyc7XG5cbi8vIHRoaXMgaXMgY29tbW9uIGZ1bmN0aW9uIHdoaWNoIGFzc29jaWF0ZXMgYW4gb2JqZWN0IHdpdGggaXRzIE1hdHJlc2hrYSBkZWZpbml0aW9uXG5mdW5jdGlvbiBjb21tb25Jbml0KG9iamVjdCkge1xuICAgIGxldCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuICAgIGlmICghZGVmKSB7XG4gICAgICAgIGRlZiA9IHtcbiAgICAgICAgICAgIC8vIGEgcHJvcGVydHkgbmFtZSBvZiBcImV2ZW50c1wiIG9iamVjdCBpcyBhbiBldmVudCBuYW1lXG4gICAgICAgICAgICAvLyBhbmQgYSB2YWx1ZSBpcyBhbiBhcnJheSBvZiBldmVudCBoYW5kbGVyc1xuICAgICAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGN0eDogb2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBvYmplY3QyLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImV4YW1wbGVcIixcblx0XHRcdFx0XHRpbmZvOiB7fVxuICAgICAgICAgICAgICAgIH0gKi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBcInByb3BzXCIgY29udGFpbnMgc3BlY2lhbCBpbmZvcm1hdGlvbiBhYm91dCBwcm9wZXJ0aWVzIChnZXR0ZXJzLCBzZXR0ZXJzIGV0YylcbiAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgLyogZXhhbXBsZToge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb2JqZWN0W2tleV0sXG4gICAgICAgICAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc2V0dGVyOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBtZWRpYXRvcjogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYmluZGluZ3M6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZUhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RIYW5kbGVyLFxuXHRcdFx0XHRcdFx0Li4ub3RoZXIgcmVxdWlyZWQgaW5mb1xuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkOiBgbWske01hdGgucmFuZG9tKCl9YFxuICAgICAgICB9O1xuXG4gICAgICAgIGRlZnMuc2V0KG9iamVjdCwgZGVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0TUsob2JqZWN0KSB7XG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiBvYmplY3Q7XG4gICAgaWYgKCFvYmplY3QgfHwgdHlwZSAhPT0gJ29iamVjdCcpIHtcblx0XHQvLyBUT0RPIHRocm93IG1hdHJlc2hrYUVycm9yXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dHlwZX0gY2Fubm90IGJlIHVzZWQgaW4gdGhpcyBtZXRob2RgKTtcbiAgICB9XG5cbiAgICAvLyBpZiBvYmplY3QgaGFzIF9pbml0TUsgbWV0aG9kLCBydW4gaXRcbiAgICAvLyBlbHNlIHJ1biBjb21tb25Jbml0XG4gICAgLy8gZXZlcnkgX2luaXRNSyBpbXBsZW1lbnRhdGlvbiBoYXZlIHRvIHJ1biBjb21tb25Jbml0IG9yIHBhcmVudCdzIF9pbml0TUtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlXG4gICAgcmV0dXJuIG9iamVjdC5faW5pdE1hdHJlc2hrYSA/IG9iamVjdC5faW5pdE1hdHJlc2hrYSgpIDogY29tbW9uSW5pdChvYmplY3QpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2NvcmUvaW5pdC5qc1xuICoqLyIsImZ1bmN0aW9uIFBzZXVkb01hcCgpIHt9XG5cbi8vIFBzZXVkb01hcCBzaW11bGF0ZXMgV2Vha01hcCBiZWhhdmlvciB3aXRoIE8oMSkgc2VhcmNoIGNvbXBsZXhpdHlcbi8vIGl0J3MgbmVlZGVkIGZvciBASUU5IGFuZCBASUUxMFxubm9mbi5hc3NpZ24oUHNldWRvTWFwLnByb3RvdHlwZSwge1xuICAgIGdldChvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5tYXRyZXNoa2FEYXRhO1xuICAgIH0sXG4gICAgc2V0KG9iaiwgZGF0YSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCAnbWF0cmVzaGthRGF0YScsIHtcbiAgICAgICAgICAgIHZhbHVlOiBkYXRhLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgaGFzKG9iaikge1xuICAgICAgICByZXR1cm4gJ21hdHJlc2hrYURhdGEnIGluIG9iajtcbiAgICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gbmV3IFBzZXVkb01hcCgpIDogbmV3IFdlYWtNYXAoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19jb3JlL2RlZnMuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL2RlZnMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG4vLyB0aGUgZnVuY3Rpb24gZGVmaW5lcyBuZWVkZWQgZGVzY3JpcHRvciBmb3IgZ2l2ZW4gcHJvcGVydHkgXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVQcm9wKG9iamVjdCwga2V5KSB7XG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIWRlZi5wcm9wc1trZXldKSB7XG4gICAgICAgIGNvbnN0IHByb3BEZWYgPSBkZWYucHJvcHNba2V5XSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiBvYmplY3Rba2V5XSxcbiAgICAgICAgICAgIGdldHRlcjogbnVsbCxcbiAgICAgICAgICAgIHNldHRlcjogbnVsbCxcbiAgICAgICAgICAgIG1lZGlhdG9yOiBudWxsLFxuICAgICAgICAgICAgYmluZGluZ3M6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wRGVmLmdldHRlciA/IHByb3BEZWYuZ2V0dGVyLmNhbGwob2JqZWN0KSA6IHByb3BEZWYudmFsdWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlZi5zZXR0ZXIgPyBwcm9wRGVmLnNldHRlci5jYWxsKG9iamVjdCwgdikgOiBzZXQob2JqZWN0LCBrZXksIHYsIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbVNldHRlcjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmLnByb3BzW2tleV07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fY29yZS9kZWZpbmVwcm9wLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGlzIGZyb20gJy4vX3V0aWwvaXMnO1xuXG4vLyB0aGUgZnVuY3Rpb24gc2V0cyBuZXcgdmFsdWUgZm9yIGEgcHJvcGVydHlcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldChvYmplY3QsIGtleSwgdmFsdWUsIGV2dCA9IHt9KSB7XG4gICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NldCcpO1xuXG4gICAgLy8gaWYgbm8ga2V5IG9yIGZhbHN5IGtleSBpcyBnaXZlblxuICAgIGlmICgha2V5KSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmID0gZGVmcy5nZXQob2JqZWN0KTtcblxuICAgIC8vIGlmIG5vIG9iamVjdCBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghZGVmKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcywgZXZlbnRzIH0gPSBkZWY7XG4gICAgY29uc3QgcHJvcERlZiA9IHByb3BzW2tleV07XG5cbiAgICAvLyBhbGxvdyB0byB1c2Uga2V5LXZhbHVlIG9iamVjdCBhcyBhbm90aGVyIHZhcmlhdGlvblxuICAgIGlmICh0eXBlb2Yga2V5ID09ICdvYmplY3QnKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKGtleSwgKG9ialZhbCwgb2JqS2V5KSA9PiBzZXQob2JqZWN0LCBvYmpLZXksIG9ialZhbCwgdmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBwcm9wZXJ0eSBkZWZpbml0aW9uIHRoZW4gbWFrZSBzaW1wbGUgYXNzaWdubWVudFxuICAgIGlmICghcHJvcERlZikge1xuICAgICAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIGNvbnN0IHsgdmFsdWU6IHByZXZpb3VzVmFsdWUsIG1lZGlhdG9yIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gcG9zc2libGUgZmxhZ3NcbiAgICBjb25zdCB7XG4gICAgICAgIHNraXBNZWRpYXRvcixcbiAgICAgICAgZnJvbU1lZGlhdG9yLFxuICAgICAgICBmb3JjZSxcbiAgICAgICAgZm9yY2VIVE1MLFxuICAgICAgICBzaWxlbnQsXG4gICAgICAgIHNpbGVudEhUTUwsXG4gICAgICAgIHNraXBMaW5rc1xuICAgIH0gPSBldnQ7XG5cbiAgICBsZXQgbmV3VmFsdWU7XG5cbiAgICBpZiAobWVkaWF0b3IgJiYgIWlzKHZhbHVlLCBwcmV2aW91c1ZhbHVlKSAmJiAhc2tpcE1lZGlhdG9yICYmICFmcm9tTWVkaWF0b3IpIHtcbiAgICAgICAgLy8gVE9ET1xuICAgICAgICBuZXdWYWx1ZSA9IHNwZWNpYWwubWVkaWF0b3IodiwgcHJldlZhbCwga2V5LCBvYmplY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgY29uc3QgaXNDaGFuZ2VkID0gIWlzKG5ld1ZhbHVlLCBwcmV2aW91c1ZhbHVlKTtcblxuICAgIC8vIGFkZCB0byBldnQgb2JqZWN0IHNvbWUgdXNlZnVsIHByb3BlcnRpZXNcbiAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgdmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBzZWxmOiBvYmplY3QsXG4gICAgICAgIHByZXZpb3VzVmFsdWUsXG4gICAgICAgIGtleSxcbiAgICAgICAgaXNDaGFuZ2VkXG4gICAgfSwgZXZ0KTtcblxuICAgIGNvbnN0IHRyaWdnZXJDaGFuZ2UgPSAoaXNDaGFuZ2VkIHx8IGZvcmNlKSAmJiAhc2lsZW50O1xuXG4gICAgLy8gdHJpZ2dlciBiZWZvcmVjaGFuZ2U6S0VZIGFuZCBiZWZvcmVjaGFuZ2UgZXZlbnRzXG4gICAgaWYgKHRyaWdnZXJDaGFuZ2UpIHtcbiAgICAgICAgY29uc3QgYmVmb3JlY2hhbmdlU3RyID0gJ2JlZm9yZWNoYW5nZSc7XG4gICAgICAgIGNvbnN0IGJlZm9yZWNoYW5nZUV2dE5hbWUgPSBgJHtiZWZvcmVjaGFuZ2VTdHJ9OiR7a2V5fWA7XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZUV2dE5hbWVdKSB7XG4gICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYmVmb3JlY2hhbmdlRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZXZlbnRzW2JlZm9yZWNoYW5nZVN0cl0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBiZWZvcmVjaGFuZ2VTdHIsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BEZWYudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgIC8vIHRyaWdlciBiaW5kaW5nc1xuICAgIGlmICghc2lsZW50SFRNTCAmJiAoaXNDaGFuZ2VkIHx8IGZvcmNlIHx8IGZvcmNlSFRNTCkpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlQmluZGluZ3NFdnROYW1lID0gYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YDtcbiAgICAgICAgaWYoZXZlbnRzW2NoYW5nZUJpbmRpbmdzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VCaW5kaW5nc0V2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRyaWdnZXIgY2hhbmdlOktFWSBhbmQgY2hhbmdlIGV2ZW50c1xuICAgIGlmICh0cmlnZ2VyQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZVN0ciA9ICdjaGFuZ2UnO1xuICAgICAgICBjb25zdCBjaGFuZ2VFdnROYW1lID0gYCR7Y2hhbmdlU3RyfToke2tleX1gO1xuICAgICAgICBpZihldmVudHNbY2hhbmdlRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VFdnROYW1lLCBleHRlbmRlZEV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihldmVudHNbY2hhbmdlU3RyXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZVN0ciwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZXBlbmRlbmNpZXMgKG1hZGUgd2l0aCBsaW5rUHJvcHMpXG4gICAgaWYgKChpc0NoYW5nZWQgfHwgZm9yY2UpICYmICFza2lwTGlua3MpIHtcbiAgICAgICAgY29uc3QgY2hhbmdlRGVwc0V2dE5hbWUgPSBgX2NoYW5nZTpkZXBzOiR7a2V5fWA7XG4gICAgICAgIGlmKGV2ZW50c1tjaGFuZ2VEZXBzRXZ0TmFtZV0pIHtcbiAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBjaGFuZ2VEZXBzRXZ0TmFtZSwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciBkZWxlZ2F0ZWQgZXZlbnRzIGxvZ2ljXG4gICAgaWYoaXNDaGFuZ2VkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZURlbGVnYXRlZEV2dE5hbWUgPSBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YDtcbiAgICAgICAgaWYgKGV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSkge1xuICAgICAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGNoYW5nZURlbGVnYXRlZEV2dE5hbWUsIGV4dGVuZGVkRXZ0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZXQuanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJpZ2dlck9uZShvYmplY3QsIG5hbWUpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgaWYgKCFkZWYpIHJldHVybjtcblxuICAgIGNvbnN0IGV2ZW50cyA9IGRlZi5ldmVudHNbbmFtZV07XG5cbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBub2ZuLnNsaWNlKGFyZ3VtZW50cywgMik7XG4gICAgICAgIGNvbnN0IGwgPSBldmVudHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBbYTEsIGEyXSA9IGFyZ3M7XG5cbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgZXY7XG5cbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHdoaWxlIChpIDwgbCkge1xuICAgICAgICAgICAgICAgICAgICAodHJpZ2dlck9uZS5sYXRlc3RFdmVudCA9IGV2ID0gZXZlbnRzW2krK10pLmNhbGxiYWNrLmNhbGwoZXYuY3R4LCBhMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB3aGlsZSAoaSA8IGwpIHtcbiAgICAgICAgICAgICAgICAgICAgKHRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSBldiA9IGV2ZW50c1tpKytdKS5jYWxsYmFjay5hcHBseShldi5jdHgsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnRyaWdnZXJPbmUubGF0ZXN0RXZlbnQgPSB7XG4gICAgaW5mbzoge30sXG4gICAgbmFtZTogbnVsbFxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdHJpZ2dlcm9uZS5qc1xuICoqLyIsImltcG9ydCBtYXRyZXNoa2FFcnJvciBmcm9tICcuL21hdHJlc2hrYWVycm9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqZWN0LCBtZXRob2QpIHtcbiAgICBjb25zdCB0eXBlb2ZPYmplY3QgPSBvYmplY3QgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2Ygb2JqZWN0O1xuXG4gICAgaWYgKHR5cGVvZk9iamVjdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbWF0cmVzaGthRXJyb3IoJ2NvbW1vbjpvYmplY3RfdHlwZScsIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVvZk9iamVjdCxcbiAgICAgICAgICAgIG1ldGhvZFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcbiAqKi8iLCJjb25zdCBiaW5kaW5nRXJyb3JQcmVmaXggPSAnQmluZGluZyBlcnJvcjonO1xuXG5jb25zdCBlcnJvcnMgPSB7XG4gICAgJ2JpbmRpbmc6bm9kZV9taXNzaW5nJzogKHsga2V5LCBub2RlIH0pID0+IHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JJbmZvID0gdHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnID8gYCBUaGUgc2VsZWN0b3IgaXMgJHtub2RlfWAgOiAnJztcbiAgICAgICAgcmV0dXJuIGAke2JpbmRpbmdFcnJvclByZWZpeH0gbm9kZSBpcyBtaXNzaW5nIGZvciAke2tleX0uJHtzZWxlY3RvckluZm99YDtcbiAgICB9LFxuICAgICdiaW5kaW5nOmZhbHN5X2tleSc6ICgpID0+ICdCaW5kaW5nIGVycm9yOiBcImtleVwiIGFyZyBjYW5ub3QgYmUgZmFsc3knLFxuICAgICdiaW5kaW5nOmluc3RhbmNlX25vZGVzX21pc3NpbmcnOiAoeyAkbm9kZXMgfSkgPT4ge1xuICAgICAgICBjb25zdCBtaXNzaW5nID0gISRub2RlcyA/ICckbm9kZXMnIDogJ25vZGVzJztcbiAgICAgICAgcmV0dXJuIGAke2JpbmRpbmdFcnJvclByZWZpeH0gXCIke21pc3Npbmd9XCIgcHJvcGVydHkgb2YgTWF0cmVzaGthIGluc3RhbmNlIGlzIG1pc3NpbmcuIGBcbiAgICAgICAgICAgICsgJ0l0IG11c3QgYmUgYW4gb2JqZWN0IGFuZCBtdXN0IG5vdCBiZSByZWFzc2lnbmVkLic7XG4gICAgfSxcbiAgICAnY29tbW9uOm9iamVjdF90eXBlJzogKHsgdHlwZSwgbWV0aG9kIH0pID0+XG4gICAgICAgIGBNZXRob2QgXCIke21ldGhvZH1cIiBkb2VzIG5vdCBhY2NlcHQgJHt0eXBlfSBhcyB0YXJnZXQgb2JqZWN0YFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWF0cmVzaGthRXJyb3Ioa2V5LCBkYXRhKSB7XG4gICAgY29uc3QgZ2V0RXJyb3IgPSBlcnJvcnNba2V5XTtcbiAgICBpZiAoIWdldEVycm9yKSB7XG4gICAgICAgIHRocm93IEVycm9yKGBVbmtub3duIGVycm9yIFwiJHtrZXl9XCJgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yc1trZXldKGRhdGEpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL21hdHJlc2hrYWVycm9yLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlLCBuby1jb25mdXNpbmctYXJyb3cgKi9cbi8vIGRldGVybWluZXMgd2hldGhlciB0d28gdmFsdWVzIGFyZSB0aGUgc2FtZSB2YWx1ZVxuY29uc3QgaXNQb2x5ZmlsbCA9ICh2MSwgdjIpID0+XG4gICAgdjEgPT09IDAgJiYgdjIgPT09IDAgPyAxIC8gdjEgPT09IDEgLyB2MiA6IHYxICE9PSB2MSAmJiB2MiAhPT0gdjIgfHwgdjEgPT09IHYyO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuaXMgfHwgaXNQb2x5ZmlsbDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL2lzLmpzXG4gKiovIiwiaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vc2VsZWN0bm9kZXMnO1xuaW1wb3J0IGRvbSBmcm9tICcuLi9fZG9tJ1xuXG5jb25zdCBodG1sUmVnID0gLzwvO1xuY29uc3QgY3VzdG9tU2VsZWN0b3JSZWcgPSAvOnNhbmRib3h8OmJvdW5kXFwoKFteKF0qKVxcKS87XG5cbi8vIFRPRE8gd3JpdGUgZGVzY3JpcHRpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBsZXQgbm9kZXM7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09ICdzdHJpbmcnICYmICFodG1sUmVnLnRlc3Qoc2VsZWN0b3IpICYmIGN1c3RvbVNlbGVjdG9yUmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG4gICAgICAgIG5vZGVzID0gc2VsZWN0Tm9kZXMob2JqZWN0LCBzZWxlY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZXMgPSBkb20uJChzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2dldG5vZGVzLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuLi9fdXRpbC90b2FycmF5JztcbmltcG9ydCBkb20gZnJvbSAnLi4vX2RvbSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yUmVnID0gL1xccyo6Ym91bmRcXCgoW14oXSopXFwpXFxzKihbXFxTXFxzXSopXFxzKnxcXHMqOnNhbmRib3hcXHMqKFtcXFNcXHNdKilcXHMqLztcblxuLy8gVE9ETyBhZGQgZGVzY3JpcHRpb25cbi8vIFRPRE8gdGhpcyBmdW5jdGlvbiBsb29rcyBub3QgZ29vZCwgaXQgbmVlZHMgdG8gYmUgcmVmYWN0b3JlZCBhbmQgYWNjZWxlcmF0ZWRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlbGVjdE5vZGVzKG9iamVjdCwgZ2l2ZW5TZWxlY3Rvcikge1xuICAgIGNvbnN0IHsgcHJvcHMgfSA9IGRlZnMuZ2V0KG9iamVjdCk7XG4gICAgY29uc3Qgc2VsZWN0b3JzID0gZ2l2ZW5TZWxlY3Rvci5zcGxpdCgnLCcpO1xuICAgIGxldCByZXN1bHQgPSBkb20uJCgpO1xuXG4gICAgbm9mbi5mb3JFYWNoKHNlbGVjdG9ycywgc2VsZWN0b3IgPT4ge1xuICAgICAgICBjb25zdCBleGVjUmVzdWx0ID0gY3VzdG9tU2VsZWN0b3JSZWcuZXhlYyhzZWxlY3Rvcik7XG4gICAgICAgIGlmKGV4ZWNSZXN1bHQpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvdW5kS2V5ID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gJ3NhbmRib3gnIDogZXhlY1Jlc3VsdFsxXTtcbiAgICAgICAgICAgIGNvbnN0IHN1YlNlbGVjdG9yID0gZXhlY1Jlc3VsdFszXSAhPT0gdW5kZWZpbmVkID8gZXhlY1Jlc3VsdFszXSA6IGV4ZWNSZXN1bHRbMl07XG4gICAgICAgICAgICBjb25zdCBwcm9wRGVmID0gcHJvcHNbYm91bmRLZXldO1xuXG4gICAgICAgICAgICBpZihwcm9wRGVmKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcbiAgICAgICAgICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib3VuZE5vZGVzID0gQXJyYXkoYmluZGluZ3MubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoYmluZGluZywgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmROb2Rlc1tpXSA9IGJpbmRpbmcubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIHBhc3NlZCBhZnRlciA6Ym91bmQoS0VZKSBpcyBub3QgZW1wdHkgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciBleGFtcGxlIFwiOmJvdW5kKEtFWSkgLm15LXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBuYXRpdmUgc2VsZWN0b3IgY29udGFpbnMgY2hpbGRyZW4gc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciBleGFtcGxlIFwiOmJvdW5kKEtFWSkgPiAubXktc2VsZWN0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1YlNlbGVjdG9yLmluZGV4T2YoJz4nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlbGVjdGluZyBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChib3VuZE5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYW5kb21BdHRyID0gYG0ke01hdGgucmFuZG9tKCl9YC5yZXBsYWNlKCcuJywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShyYW5kb21BdHRyLCByYW5kb21BdHRyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBub2RlLnF1ZXJ5U2VsZWN0b3JBbGwoYFske3JhbmRvbUF0dHJ9PVwiJHtyYW5kb21BdHRyfVwiXSAke3N1YlNlbGVjdG9yfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKHRvQXJyYXkoc2VsZWN0ZWQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUocmFuZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGRvZXNuJ3QgY29udGFpbiBjaGlsZHJlbiBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZm4uZm9yRWFjaChib3VuZE5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzdWJTZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQodG9BcnJheShzZWxlY3RlZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmF0aXZlIHNlbGVjdG9yIGlzIGVtcHR5IHN0cmluZyBqdXN0IGFkZCBib3VuZCBub2RlcyB0byByZXN1bHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoYm91bmROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBpdCdzIG5hdGl2ZSBzZWxlY3RvciAobm8gY3VzdG9tIHRoaW5ncylcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5hZGQoc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3NlbGVjdG5vZGVzLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9BcnJheShvYmplY3QsIHN0YXJ0KSB7XG5cdHZhciBhcnJheSA9IFtdLFxuXHRcdGwgPSBvYmplY3QubGVuZ3RoLFxuXHRcdGk7XG5cblx0c3RhcnQgPSBzdGFydCB8fCAwO1xuXG5cdGZvciAoaSA9IHN0YXJ0OyBpIDwgbDsgaSsrKSB7XG5cdFx0YXJyYXlbaSAtIHN0YXJ0XSA9IG9iamVjdFtpXTtcblx0fVxuXG5cdHJldHVybiBhcnJheTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL191dGlsL3RvYXJyYXkuanNcbiAqKi8iLCJpbXBvcnQgZGVmYXVsdERvbGxhciBmcm9tICcuL2RlZmF1bHQtZG9sbGFyJztcblxuY29uc3QgZG9tID0ge1xuICAgICQ6IGRlZmF1bHREb2xsYXJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRvbTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19kb20vaW5kZXguanNcbiAqKi8iLCIvKiBnbG9iYWwgJCAqL1xuaW1wb3J0IGJRdWVyeSBmcm9tICcuLi9icXVlcnknO1xuXG5jb25zdCBuZWVkZWRNZXRob2RzID0gJ29uIG9mZiBpcyBhZGQgbm90IGZpbmQnLnNwbGl0KC9cXHMvKTtcblxuY29uc3QgZ2xvYmFsRG9sbGFyID0gdHlwZW9mICQgPT09ICdmdW5jdGlvbicgPyAkIDogbnVsbDtcbmxldCB1c2VHbG9iYWxEb2xsYXIgPSB0cnVlO1xuXG5pZiAoZ2xvYmFsRG9sbGFyKSB7XG4gICAgY29uc3QgZm4gPSBnbG9iYWxEb2xsYXIuZm4gfHwgZ2xvYmFsRG9sbGFyLnByb3RvdHlwZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5lZWRlZE1ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFmbltuZWVkZWRNZXRob2RzW2ldXSkge1xuICAgICAgICAgICAgdXNlR2xvYmFsRG9sbGFyID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZ2xvYmFsRG9sbGFyLnBhcnNlSFRNTCkge1xuICAgICAgICBnbG9iYWxEb2xsYXIucGFyc2VIVE1MID0gYlF1ZXJ5LnBhcnNlSFRNTDtcbiAgICB9XG59IGVsc2Uge1xuICAgIHVzZUdsb2JhbERvbGxhciA9IGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCB1c2VHbG9iYWxEb2xsYXIgPyBnbG9iYWxEb2xsYXIgOiBiUXVlcnk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZG9tL2RlZmF1bHQtZG9sbGFyLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgcGFyc2VIVE1MIGZyb20gJy4vcGFyc2VodG1sJztcbmltcG9ydCBvbmUgZnJvbSAnLi9vbmUnO1xuaW1wb3J0IGNyZWF0ZSBmcm9tICcuL2NyZWF0ZSc7XG5pbXBvcnQgb24gZnJvbSAnLi9vbic7XG5pbXBvcnQgb2ZmIGZyb20gJy4vb2ZmJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcbmltcG9ydCBhZGQgZnJvbSAnLi9hZGQnO1xuaW1wb3J0IG5vdCBmcm9tICcuL25vdCc7XG5pbXBvcnQgZmluZCBmcm9tICcuL2ZpbmQnO1xuXG4vLyB0aW55IGpRdWVyeSByZXBsYWNlbWVudCBmb3IgTWF0cmVzaGthXG4vLyBiUXVlcnkgaXMgcmV3cml0dGVuIHZlcnNpb24gb2YgYmFsYWxhaWthLmpzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiUXVlcnkoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IEluaXQoc2VsZWN0b3IsIGNvbnRleHQpO1xufVxuXG5ub2ZuLmFzc2lnbihiUXVlcnksIHtcbiAgICBmbjogSW5pdC5wcm90b3R5cGUsXG4gICAgZXh0ZW5kLFxuICAgIHBhcnNlSFRNTCxcbiAgICBvbmUsXG4gICAgY3JlYXRlXG59KTtcblxubm9mbi5hc3NpZ24oYlF1ZXJ5LmZuLCB7XG4gICAgb24sXG4gICAgb2ZmLFxuICAgIGlzLFxuICAgIGFkZCxcbiAgICBub3QsXG4gICAgZmluZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgaHRtbDJub2RlTGlzdCBmcm9tICcuL19odG1sMm5vZGVsaXN0JztcblxuLy8gZnVuY3Rpb24tY29uc3RydWN0b3Igb2YgYlF1ZXJ5IGxpYnJhcnlcbi8vIGFjY2VwdHMgbWFueSBraW5kcyBvZiBhcmd1bWVudHMgKHNlbGVjdG9yLCBodG1sLCBmdW5jdGlvbilcbmZ1bmN0aW9uIEJRdWVyeUluaXQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiBzZWxlY3RvciA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBbc2VsZWN0b3JdO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmICgvPC8udGVzdChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBodG1sMm5vZGVMaXN0KHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Q29udGV4dCA9IChuZXcgQlF1ZXJ5SW5pdChjb250ZXh0KSlbMF07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld0NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ld0NvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIC8vIHR5cGVvZiBub2RlTGlzdCByZXR1cm5zIFwiZnVuY3Rpb25cIiBpbiBvbGQgV2ViS2l0XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZWxlY3Rvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBzZWxlY3RvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2gocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQlF1ZXJ5SW5pdC5wcm90b3R5cGUgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgQlF1ZXJ5SW5pdDtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9faW5pdC5qc1xuICoqLyIsIi8vIGNvbnZlcnRzIEhUTUwgc3RyaW5nIHRvIE5vZGVMaXN0IGluc3RhbmNlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBodG1sMm5vZGVMaXN0KGdpdmVuSFRNTCkge1xuICAgIC8vIHdyYXBNYXAgaXMgdGFrZW4gZnJvbSBqUXVlcnlcbiAgICBjb25zdCB3cmFwTWFwID0ge1xuICAgICAgICBvcHRpb246IFsxLCAnPHNlbGVjdCBtdWx0aXBsZT1cIm11bHRpcGxlXCI+JywgJzwvc2VsZWN0PiddLFxuICAgICAgICBsZWdlbmQ6IFsxLCAnPGZpZWxkc2V0PicsICc8L2ZpZWxkc2V0PiddLFxuICAgICAgICB0aGVhZDogWzEsICc8dGFibGU+JywgJzwvdGFibGU+J10sXG4gICAgICAgIHRyOiBbMiwgJzx0YWJsZT48dGJvZHk+JywgJzwvdGJvZHk+PC90YWJsZT4nXSxcbiAgICAgICAgdGQ6IFszLCAnPHRhYmxlPjx0Ym9keT48dHI+JywgJzwvdHI+PC90Ym9keT48L3RhYmxlPiddLFxuICAgICAgICBjb2w6IFsyLCAnPHRhYmxlPjx0Ym9keT48L3Rib2R5Pjxjb2xncm91cD4nLCAnPC9jb2xncm91cD48L3RhYmxlPiddLFxuICAgICAgICBhcmVhOiBbMSwgJzxtYXA+JywgJzwvbWFwPiddLFxuICAgICAgICBfOiBbMCwgJycsICcnXVxuICAgIH07XG5cbiAgICBjb25zdCBodG1sID0gZ2l2ZW5IVE1MLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICBsZXQgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxldCBpO1xuXG4gICAgd3JhcE1hcC5vcHRncm91cCA9IHdyYXBNYXAub3B0aW9uO1xuICAgIHdyYXBNYXAudGJvZHkgPSB3cmFwTWFwLnRmb290ID0gd3JhcE1hcC5jb2xncm91cCA9IHdyYXBNYXAuY2FwdGlvbiA9IHdyYXBNYXAudGhlYWQ7XG4gICAgd3JhcE1hcC50aCA9IHdyYXBNYXAudGQ7XG5cbiAgICBjb25zdCBleCA9IC88KFtcXHc6XSspLy5leGVjKGh0bWwpO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBleCAmJiB3cmFwTWFwW2V4WzFdXSB8fCB3cmFwTWFwLl87XG5cbiAgICBub2RlLmlubmVySFRNTCA9IHdyYXBwZXJbMV0gKyBodG1sICsgd3JhcHBlclsyXTtcblxuICAgIGkgPSB3cmFwcGVyWzBdO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBub2RlID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZS5jaGlsZE5vZGVzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L19odG1sMm5vZGVsaXN0LmpzXG4gKiovIiwiLy8gT2JqZWN0LmFzc2lnbiBwb2x5ZnlsbCBpcyB0YWtlbiB0aGVyZTpcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24jUG9seWZpbGxcbi8vIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gZnV0dXJlXG5cbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRwdXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlICE9PSB1bmRlZmluZWQgJiYgc291cmNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5leHRLZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShuZXh0S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXRbbmV4dEtleV0gPSBzb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V4dGVuZC5qc1xuICoqLyIsImltcG9ydCBodG1sMm5vZGVMaXN0IGZyb20gJy4vX2h0bWwybm9kZWxpc3QnO1xuaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIHBhcnNlcyBnaXZlbiBIVE1MIGFuZCByZXR1cm5zIGJRdWVyeSAoQlF1ZXJ5SW5pdCkgaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIG5ldyBJbml0KGh0bWwybm9kZUxpc3QoaHRtbCkpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L3BhcnNlaHRtbC5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuXG4vLyByZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50IG9mIG1hdGNoZWQgc2V0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbmUocywgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgSW5pdChzLCBjb250ZXh0KVswXTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9vbmUuanNcbiAqKi8iLCIvLyBjcmVhdGVzIEhUTUwgZWxlbWVudFxuLy8gVE9ETyBnZXQgcmlkIG9mIGl0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGUodGFnTmFtZSwgcHJvcHMpIHtcbiAgICBpZiAodHlwZW9mIHRhZ05hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHByb3BzID0gdGFnTmFtZTtcbiAgICAgICAgdGFnTmFtZSA9IHByb3BzLnRhZ05hbWU7XG4gICAgfVxuXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICAgIG5vZm4uZm9yT3duKHByb3BzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2F0dHJpYnV0ZXMnICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmZvck93bih2YWx1ZSwgKGF0dHJWYWx1ZSwgYXR0ck5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdjaGlsZHJlbicgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2godmFsdWUsIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjcmVhdGUoY2hpbGQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxba2V5XSAmJiB0eXBlb2YgZWxba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIG5vZm4uYXNzaWduKGVsW2tleV0sIHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ICE9PSAndGFnTmFtZScpIHtcbiAgICAgICAgICAgICAgICBlbFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlbDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9jcmVhdGUuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcbmltcG9ydCBpcyBmcm9tICcuL2lzJztcblxuLy8gdGhlIGZ1bmN0aW9uIGlzIHVzZWQgd2hlbiBhIHNlbGVjdG9yIGlzIGdpdmVuXG5mdW5jdGlvbiBkZWxlZ2F0ZUhhbmRsZXIoZXZ0LCBzZWxlY3RvciwgaGFuZGxlcikge1xuICAgIGNvbnN0IHJhbmRvbUlEID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnJlcGxhY2UoJzAuJywgJ3gnKTtcbiAgICBjb25zdCBzY29wZVNlbGVjdG9yID0gYFske3JhbmRvbUlEfT1cIiR7cmFuZG9tSUR9XCJdIGA7XG4gICAgY29uc3Qgc3BsaXR0ZWRTZWxlY3RvciA9IHNlbGVjdG9yLnNwbGl0KCcsJyk7XG5cbiAgICBsZXQgbWF0Y2hpbmcgPSAnJztcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXR0ZWRTZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzZWwgPSBzcGxpdHRlZFNlbGVjdG9yW2ldO1xuICAgICAgICBtYXRjaGluZyArPSBgJHtpID09PSAwID8gJycgOiAnLCd9JHtzY29wZVNlbGVjdG9yfSR7c2VsfSwke3Njb3BlU2VsZWN0b3J9JHtzZWx9ICpgO1xuICAgIH1cblxuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUocmFuZG9tSUQsIHJhbmRvbUlEKTtcblxuICAgIGlmIChpcy5jYWxsKFtldnQudGFyZ2V0XSwgbWF0Y2hpbmcpKSB7XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBldnQpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKHJhbmRvbUlEKTtcbn1cblxuLy8gYWRkcyBldmVudCBsaXN0ZW5lciB0byBhIHNldCBvZiBlbGVtbnRzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbihuYW1lc1N0ciwgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBuYW1lcyA9IG5hbWVzU3RyLnNwbGl0KC9cXHMvKTtcbiAgICBsZXQgZGVsZWdhdGU7XG5cbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzZWxlY3RvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBzZWxlY3RvciA9IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgZGVsZWdhdGUgPSBmdW5jdGlvbiB1bmlxdWVEZWxlZ2F0ZUhhbmRsZXIoZXZ0KSB7XG4gICAgICAgICAgICBkZWxlZ2F0ZUhhbmRsZXIuY2FsbCh0aGlzLCBldnQsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcbiAgICAgICAgbmFtZSA9IG5hbWVbMF07XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpc1tqXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBkYXRhLmFsbEV2ZW50c1tuYW1lICsgbm9kZUlEXSA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlSURdIHx8IFtdO1xuXG4gICAgICAgICAgICBsZXQgZXhpc3QgPSBmYWxzZTtcblxuXG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGV2ZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIgPT09IGV2ZW50LmhhbmRsZXIgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWV4aXN0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkZWxlZ2F0ZSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvclxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGRlbGVnYXRlIHx8IGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29uLmpzXG4gKiovIiwiLy8gc2hhcmUgZGF0YSBiZXR3ZWVuIGFzIGFuIG9iamVjdCBtb2R1bGVzIGJlY2F1c2Ugd2UgdXNlXG4vLyBzaW1wbGlmaWVkIGVzIG1vZHVsZXMgdGhlcmUgYW5kIGNhbm5vdCBpbXBvcnQgYW5kIHNoYXJlIGEgbnVtYmVyXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbm9kZUluZGV4OiAwLFxuICAgIGFsbEV2ZW50czoge31cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvX2RhdGEuanNcbiAqKi8iLCIvLyBjaGVjayB0aGUgZmlyc3QgZWxlbWVudCBmcm9tIGdpdmVuIHNldCBhZ2FpbnN0IGEgc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzKHMpIHtcbiAgICBjb25zdCBub2RlID0gdGhpc1swXTtcbiAgICByZXR1cm4gbm9kZVxuICAgICAgICA/IChub2RlLm1hdGNoZXNcbiAgICAgICAgICAgIHx8IG5vZGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yXG4gICAgICAgICAgICB8fCBub2RlLm1vek1hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5tc01hdGNoZXNTZWxlY3RvclxuICAgICAgICAgICAgfHwgbm9kZS5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKG5vZGUsIHMpIDogZmFsc2U7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvaXMuanNcbiAqKi8iLCJpbXBvcnQgZGF0YSBmcm9tICcuL19kYXRhJztcblxuLy8gcmVtb3ZlcyBldmVudCBoYW5kbGVyIGZyb20gYSBzZXQgb2YgZWxlbWVudHNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9mZihuYW1lcywgc2VsZWN0b3IsIGhhbmRsZXIpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGhhbmRsZXIgPSBzZWxlY3RvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBzZWxlY3RvciA9IG51bGw7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgbmFtZXMgPSBuYW1lcy5zcGxpdCgvXFxzLyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBuYW1lID0gbmFtZXNbaV0uc3BsaXQoL1xcLiguKykvKTtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gbmFtZVsxXTtcbiAgICAgICAgbmFtZSA9IG5hbWVbMF07XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gdGhpc1tqXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IGRhdGEuYWxsRXZlbnRzW25hbWUgKyBub2RlLmIkXTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgZXZlbnRzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2tdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAoIWhhbmRsZXIgfHwgaGFuZGxlciA9PT0gZXZlbnQuaGFuZGxlciB8fCBoYW5kbGVyID09PSBldmVudC5kZWxlZ2F0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICYmICghbmFtZXNwYWNlIHx8IG5hbWVzcGFjZSA9PT0gZXZlbnQubmFtZXNwYWNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCFzZWxlY3RvciB8fCBzZWxlY3RvciA9PT0gZXZlbnQuc2VsZWN0b3IpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGV2ZW50LmRlbGVnYXRlIHx8IGV2ZW50LmhhbmRsZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzLnNwbGljZShrLS0sIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW5hbWVzcGFjZSAmJiAhc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYnF1ZXJ5L29mZi5qc1xuICoqLyIsImltcG9ydCBJbml0IGZyb20gJy4vX2luaXQnO1xuaW1wb3J0IGRhdGEgZnJvbSAnLi9fZGF0YSc7XG5cbi8vIGFkZHMgdW5pcXVlIG5vZGVzIHRvIGJRdWVyeSBjb2xsZWN0aW9uXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGQoc2VsZWN0b3IpIHtcbiAgICBjb25zdCBpZE1hcCA9IHt9O1xuXG4gICAgbGV0IHJlc3VsdDtcblxuICAgIHNlbGVjdG9yID0gbmV3IEluaXQoc2VsZWN0b3IpO1xuXG4gICAgaWYgKHRoaXMubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdCA9IG5ldyBJbml0KHRoaXMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHJlc3VsdFtpXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG4gICAgICAgICAgICBpZE1hcFtub2RlSURdID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBzZWxlY3RvcltpXTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVJRCA9IG5vZGUuYiQgPSBub2RlLmIkIHx8ICsrZGF0YS5ub2RlSW5kZXg7XG4gICAgICAgICAgICBpZiAoIWlkTWFwW25vZGVJRF0pIHtcbiAgICAgICAgICAgICAgICBpZE1hcFtub2RlSURdID0gMTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHNlbGVjdG9yO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvYWRkLmpzXG4gKiovIiwiaW1wb3J0IEluaXQgZnJvbSAnLi9faW5pdCc7XG5cbi8vIGV4Y2x1ZGVzIGVsZW1lbnRzIGZyb20gY3VycmVudCBzZXQgYnkgZ2l2ZW4gc2VsZWN0b3JcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vdChzZWxlY3Rvcikge1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFuZXcgSW5pdCh0aGlzW2ldKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JxdWVyeS9ub3QuanNcbiAqKi8iLCJpbXBvcnQgSW5pdCBmcm9tICcuL19pbml0JztcblxuLy8gZ2V0IHRoZSBkZXNjZW5kYW50cyBvZiBlYWNoIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgc2V0IG9mIG1hdGNoZWQgZWxlbWVudHMsXG4vLyBmaWx0ZXJlZCBieSBhIHNlbGVjdG9yXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG4gICAgbGV0IHJlc3VsdCA9IG5ldyBJbml0KCk7XG5cbiAgICBub2ZuLmZvckVhY2godGhpcywgZWwgPT4ge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuYWRkKGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9icXVlcnkvZmluZC5qc1xuICoqLyIsImltcG9ydCB1bmJpbmROb2RlIGZyb20gJy4uL3VuYmluZG5vZGUnO1xuLy8gcmUtYWRkcyBiaW5kaW5nIHdoZW4gb2JqZWN0IGJyYW5jaCBpcyBjaGFuZ2VkXG4vLyB0aGUgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IGJpbmROb2RlIHdoZW4gc29tZXRoaW5nIGxpa2Vcbi8vICdmb28uYmFyLmJheicgaXMgcGFzc2VkIHRvIGl0IGFzIGtleSBhcmcgdmFsdWVcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN3aXRjaEJpbmRpbmcoe1xuICAgIGNoYW5nZUV2dCxcbiAgICBvYmplY3QsXG4gICAgZGVlcFBhdGgsXG4gICAgJG5vZGVzLFxuICAgIGJpbmRlcixcbiAgICBldnQsXG4gICAgYmluZE5vZGVcbn0pIHtcbiAgICBjb25zdCBkZWVwUGF0aExlbmd0aCA9IGRlZXBQYXRoLmxlbmd0aDtcbiAgICBsZXQgeyB2YWx1ZTogdGFyZ2V0IH0gPSBjaGFuZ2VFdnQ7XG4gICAgY29uc3QgeyBwcmV2aW91c1ZhbHVlOiBwcmV2aW91c1RhcmdldCB9ID0gY2hhbmdlRXZ0O1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgdGFyZ2V0ID0gb2JqZWN0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlZXBQYXRoTGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRbZGVlcFBhdGhbaV1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE5vZGUodGFyZ2V0LCBkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDFdLCAkbm9kZXMsIGJpbmRlciwgZXZ0KTtcblxuICAgIC8vIHJlbW92ZSBiaW5kaW5nIGZvciBwcmV2aW91c2x5IHVzZWQgb2JqZWN0XG4gICAgaWYgKHByZXZpb3VzVGFyZ2V0ICYmIHR5cGVvZiBwcmV2aW91c1RhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdW5iaW5kTm9kZShwcmV2aW91c1RhcmdldCwgZGVlcFBhdGhbZGVlcFBhdGhMZW5ndGggLSAxXSwgJG5vZGVzKTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3Mvc3dpdGNoYmluZGluZy5qc1xuICoqLyIsImltcG9ydCBjaGVja09iamVjdFR5cGUgZnJvbSAnLi9fdXRpbC9jaGVja29iamVjdHR5cGUnO1xuaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCBnZXROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9nZXRub2Rlcyc7XG5pbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUJpbmRpbmcgZnJvbSAnLi9fYmluZGluZ3MvcmVtb3ZlYmluZGluZyc7XG5pbXBvcnQgZG9tIGZyb20gJy4vX2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuYmluZE5vZGUob2JqZWN0LCBrZXksIG5vZGUsIGV2dCkge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIGV2dCA9IG5vZGU7XG4gICAgICAgIG5vZGUgPSBrZXk7XG4gICAgICAgIGtleSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICd1bmJpbmROb2RlJyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlmKHR5cGVvZiBrZXlbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNjZXB0IGFycmF5IG9mIGtleXNcbiAgICAgICAgICAgICAqIHRoaXMudW5iaW5kTm9kZShbJ2EnLCAnYicsICdjJ10sIG5vZGUpXG4gICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGtleSwgaXRlbUtleSA9PiB1bmJpbmROb2RlKG9iamVjdCwgaXRlbUtleSwgbm9kZSwgZXZ0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogYWNlcHQgYXJyYXkgb2Ygb2JqZWN0c1xuICAgICAgICAgICAgICogdGhpcy51bmJpbmROb2RlKFt7IGtleSwgbm9kZSwgYmluZGVyLCBldmVudCB9XSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG5vZm4uZm9yRWFjaChrZXksICh7XG4gICAgICAgICAgICAgICAga2V5OiBpdGVtS2V5LFxuICAgICAgICAgICAgICAgIG5vZGU6IGl0ZW1Ob2RlXG4gICAgICAgICAgICB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdW5iaW5kTm9kZShvYmplY3QsIGl0ZW1LZXksIGl0ZW1Ob2RlLCBub2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIGFjY2VwdCBrZXktbm9kZSBvYmplY3RcbiAgICAgKiB0aGlzLmJpbmROb2RlKHsga2V5OiAkKCkgfSwgeyBvbjogJ2V2dCcgfSwgeyBzaWxlbnQ6IHRydWUgfSk7XG4gICAgICovXG4gICAgaWYgKGtleSAmJiB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBub2ZuLmZvck93bihrZXksIChrZXlPYmpWYWx1ZSwga2V5T2JqS2V5KSA9PiB1bmJpbmROb2RlKG9iamVjdCwga2V5T2JqS2V5LCBrZXlPYmpWYWx1ZSwgbm9kZSkpO1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuXG4gICAgZXZ0ID0gZXZ0IHx8IHt9O1xuICAgIGNvbnN0IHsgZGVlcCB9ID0gZXZ0IHx8IHt9O1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICBpZighZGVmKSB7XG4gICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm9wcyB9ID0gZGVmO1xuXG4gICAgLy8gYWxsb3cgdG8gcGFzcyBudWxsIG9yIHVuZGVmaW5lZCBhcyBrZXlcbiAgICAvLyBpZiBwYXNzZWQgdGhlbiByZW1vdmUgYmluZGluZ3Mgb2YgYWxsIGtleXMgZm9yIGdpdmVuIG9iamVjdFxuICAgIGlmKGtleSA9PT0gbnVsbCB8fCB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2ZuLmZvck93bihwcm9wcywgKHByb3BzSXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICB1bmJpbmROb2RlKG9iamVjdCwga2V5LCBudWxsLCBldnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8vIHJlbW92ZSBkZWxlZ2F0ZWQgYmluZGluZ1xuICAgIGlmKGRlZXAgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgICAgIGNvbnN0IGRlZXBQYXRoTGVuZ3RoID0gZGVlcFBhdGgubGVuZ3RoO1xuXG4gICAgICAgIGlmIChkZWVwUGF0aExlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBvYmplY3Q7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVlcFBhdGhMZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIGRvIHdlIG5lZWQgdG8gdGhyb3cgZXJyb3Igd2hlbiB0YXJnZXQgaXMgZmFsc3k/XG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0W2RlZXBQYXRoW2ldXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gVE9ETyBCVUcgdGhpcyBtYXkgdW5kZWxlZ2F0ZSBsaXN0ZW5lciBmb3IgYWxsIGJpbmRpbmdzIHdpdGggdGhlIHNhbWUgcGF0aCAoY2Fubm90IHJlcHJvZHVjZSlcbiAgICAgICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGRlZXBQYXRoLnNsaWNlKDAsIGRlZXBQYXRoTGVuZ3RoIC0gMiksXG4gICAgICAgICAgICAgICAgYF9jaGFuZ2U6dHJlZToke2RlZXBQYXRoW2RlZXBQYXRoTGVuZ3RoIC0gMl19YCk7XG5cbiAgICAgICAgICAgIHVuYmluZE5vZGUodGFyZ2V0LCBkZWVwUGF0aFtkZWVwUGF0aExlbmd0aCAtIDFdLCBub2RlLCBldnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjb25zdCBwcm9wRGVmID0gcHJvcHNba2V5XTtcblxuICAgIC8vIHdoZW4gbm8gcHJvcGRlZiBkbyBub3RoaW5nXG4gICAgaWYoIXByb3BEZWYpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCB7IGJpbmRpbmdzIH0gPSBwcm9wRGVmO1xuXG4gICAgLy8gaWYgdGhlIHByb3BlcnR5IGRvZXNuJ3QgaGF2ZSBhbnkgYmluZGluZ3MgZG8gbm90aGluZ1xuICAgIGlmKCFiaW5kaW5ncykge1xuICAgICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cblxuICAgIC8vIGlmIG5vIG5vZGUgaXMgcGFzZWQgcmVtb3ZlIGFsbCBiaW5kaW5ncyBmb3IgZ2l2ZW4ga2V5XG4gICAgaWYoIW5vZGUpIHtcbiAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCBiaW5kaW5nID0+IHtcbiAgICAgICAgICAgIHJlbW92ZUJpbmRpbmcoeyBvYmplY3QsIGtleSwgZXZ0IH0sIGJpbmRpbmcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBwcm9wRGVmLmJpbmRpbmdzID0gbnVsbDtcblxuICAgICAgICAvLyB1cGRhdGUgbm9kZXMgYW5kICRub2RlcyBmb3IgTWF0cmVzaGthIGluc3RhbmNlXG4gICAgICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICAgICAgZGVsZXRlIG9iamVjdC5ub2Rlc1trZXldXG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0LiRub2Rlc1trZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG5cbiAgICBjb25zdCAkbm9kZXMgPSBnZXROb2RlcyhvYmplY3QsIG5vZGUpO1xuICAgIGNvbnN0IHJldGFpbkJpbmRpbmdzID0gW107XG4gICAgY29uc3QgcmV0YWluTm9kZXMgPSBbXTtcblxuICAgIC8vIGl0ZXJhdGUgb3ZlciBhbGwgYmluZG5ncyBhbmQgY29tcGFyZSB0aGVpciBub2RlIHdpdGggZ2l2ZW4gbm9kZXNcbiAgICBub2ZuLmZvckVhY2goJG5vZGVzLCBub2Rlc0l0ZW0gPT4ge1xuICAgICAgICBub2ZuLmZvckVhY2goYmluZGluZ3MsIGJpbmRpbmcgPT4ge1xuICAgICAgICAgICAgaWYoYmluZGluZy5ub2RlID09PSBub2Rlc0l0ZW0pIHtcbiAgICAgICAgICAgICAgICByZW1vdmVCaW5kaW5nKHsgb2JqZWN0LCBrZXksIGV2dCB9LCBiaW5kaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0YWluQmluZGluZ3MucHVzaChiaW5kaW5nKTtcbiAgICAgICAgICAgICAgICByZXRhaW5Ob2Rlcy5wdXNoKG5vZGVzSXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gdXBkYXRlIG5vZGVzIGFuZCAkbm9kZXMgZm9yIE1hdHJlc2hrYSBpbnN0YW5jZVxuICAgIGlmIChvYmplY3QuaXNNSykge1xuICAgICAgICBpZihyZXRhaW5Ob2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG9iamVjdC5ub2Rlc1trZXldID0gcmV0YWluTm9kZXNbMF07XG4gICAgICAgICAgICBvYmplY3QuJG5vZGVzW2tleV0gPSBkb20uJChyZXRhaW5Ob2Rlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgb2JqZWN0Lm5vZGVzW2tleV1cbiAgICAgICAgICAgIGRlbGV0ZSBvYmplY3QuJG5vZGVzW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgYmluZGluZ3Mgb2JqZWN0XG4gICAgaWYocmV0YWluQmluZGluZ3MubGVuZ3RoKSB7XG4gICAgICAgIHByb3BEZWYuYmluZGluZ3MgPSByZXRhaW5CaW5kaW5ncztcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wRGVmLmJpbmRpbmdzID0gbnVsbDtcbiAgICB9XG5cblxuICAgIHJldHVybiBvYmplY3Q7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91bmJpbmRub2RlLmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnLi9yZW1vdmVsaXN0ZW5lcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGdpdmVuUGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQsIGluZm8gPSB7fSkge1xuICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAvLyBpZiBubyBkZWZpbml0aW9uIGRvIG5vdGhpbmdcbiAgICBpZiAoIWRlZikge1xuXHRcdHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBkZWY7XG5cbiAgICBsZXQgcGF0aCA9IHR5cGVvZiBnaXZlblBhdGggPT09ICdzdHJpbmcnICYmIGdpdmVuUGF0aCAhPT0gJycgPyBnaXZlblBhdGguc3BsaXQoJy4nKSA6IGdpdmVuUGF0aDtcblxuICAgIGlmICghcGF0aCB8fCAhcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbm8gcGF0aCB0aGVuIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlbHNlIGRvIGFsbCBtYWdpY1xuICAgICAgICBjb25zdCBrZXkgPSBwYXRoWzBdO1xuICAgICAgICBjb25zdCBjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lID0gYF9jaGFuZ2U6ZGVsZWdhdGVkOiR7a2V5fWA7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgbGV0IHBhdGhTdHI7XG5cbiAgICAgICAgaWYgKHBhdGgubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGF0aCA9IG5vZm4uc2xpY2UocGF0aCwgMSk7XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aC5qb2luKCcuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW107XG4gICAgICAgICAgICBwYXRoU3RyID0gcGF0aFswXSB8fCAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IFtdO1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGV2ZW50cywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5pbmZvLnBhdGhTdHIgIT09IHBhdGhTdHIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAocmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXSA9IHJldGFpbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGFsbEV2ZW50c1tjaGFuZ2VEZWxlZ2F0ZWRFdnROYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqZWN0W2tleV0sIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyLmpzXG4gKiovIiwiLyogZXNsaW50IG5vLXNoYWRvdzogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIm5hbWVcIiwgXCJldmVudHNcIl0gfV0qL1xuaW1wb3J0IGRlZnMgZnJvbSAnLi4vX2NvcmUvZGVmcyc7XG5pbXBvcnQgdHJpZ2dlck9uZSBmcm9tICcuL3RyaWdnZXJvbmUnO1xuXG4vLyByZW1vdmVzIHNpbXBsZSBldmVudCBsaXN0ZW5lciB0byBhbiBvYmplY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgLy8gaWYgbm8gZGVmaW5pdGlvbiBkbyBub3RoaW5nXG4gICAgaWYgKCFkZWYpIHJldHVybjtcblxuICAgIGNvbnN0IHsgZXZlbnRzOiBhbGxFdmVudHMgfSA9IGRlZjtcbiAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG4gICAgY29uc3QgcmV0YWluID0gW107XG4gICAgY29uc3Qgbm9UcmlnZ2VyID0gbmFtZSA/IG5hbWVbMF0gPT09ICdfJyA6IGZhbHNlO1xuXG4gICAgLy8gaWYgYWxsIGV2ZW50cyBuZWVkIHRvIGJlIHJlbW92ZWRcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICghbm9UcmlnZ2VyKSB7XG4gICAgICAgICAgICBub2ZuLmZvck93bihhbGxFdmVudHMsIChldmVudHMsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmVFdnREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiBldnQuY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlc3RvcmUgZGVmYXVsdCB2YWx1ZSBvZiBcImV2ZW50c1wiXG4gICAgICAgIGRlZi5ldmVudHMgPSB7fTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50cykge1xuICAgICAgICAvLyBpZiBldmVudHMgd2l0aCBnaXZlbiBuYW1lIGFyZSBmb3VuZFxuICAgICAgICBub2ZuLmZvckVhY2goZXZlbnRzLCBldnQgPT4ge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVyc2NvcmUtZGFuZ2xlXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgKGNhbGxiYWNrICE9PSBldnQuY2FsbGJhY2sgJiYgY2FsbGJhY2suX2NhbGxiYWNrICE9PSBldnQuY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgfHwgKGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZ0LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgLy8ga2VlcCBldmVudFxuICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZUV2dERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBldnQuY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGV2dC5jb250ZXh0XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICghbm9UcmlnZ2VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJPbmUob2JqZWN0LCBgcmVtb3ZlZXZlbnQ6JHtuYW1lfWAsIHJlbW92ZUV2dERhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3JlbW92ZWV2ZW50JywgcmVtb3ZlRXZ0RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgYWxsRXZlbnRzW25hbWVdID0gcmV0YWluO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGRlZi5ldmVudHNbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm47XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fZXZlbnRzL3JlbW92ZWxpc3RlbmVyLmpzXG4gKiovIiwiaW1wb3J0IHJlbW92ZUxpc3RlbmVyIGZyb20gJy4uL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vX2V2ZW50cy90cmlnZ2Vyb25lJztcblxuY29uc3Qgc3BhY2VSZWcgPSAvXFxzKy87XG5cbi8vIHRoZSBmdW5jdGlvbiByZW1vdmVzIHNpbmdsZSBiaW5kaW5nIGZvciBzaW5nbGUgb2JqZWN0XG4vLyBjYWxsZWQgYnkgdW5iaW5kTm9kZVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlQmluZGluZyh7IG9iamVjdCwga2V5LCBldnQgfSwge1xuICAgIG9wdGlvbnMsXG4gICAgYmluZGVyLFxuICAgIG5vZGUsXG4gICAgbm9kZUhhbmRsZXIsXG4gICAgb2JqZWN0SGFuZGxlclxufSkge1xuICAgIGNvbnN0IHsgZGVzdHJveSwgb24gfSA9IGJpbmRlcjtcbiAgICBjb25zdCB7IHNpbGVudCB9ID0gZXZ0O1xuXG4gICAgLy8gaWYgXCJvblwiIGlzIGZ1bmN0aW9uIGRpc2FibGUgaXRcbiAgICAvLyB3ZSBjYW5ub3QgdHVybiBvZmYgY3VzdG9tIGxpc3RlbmVyIGRlZmluZWQgYnkgYSBwcm9ncmFtbWVyXG4gICAgLy8gcHJvZ3JhbW1lciBuZWVkcyB0byByZW1vdmUgY3VzdG9tIGxpc3RlbmVyIG1hdWFsbHkgdmlhIGJpbmRlci5kZXN0cm95XG4gICAgaWYgKHR5cGVvZiBvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBub2RlSGFuZGxlci5kaXNhYmxlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb24gPT09ICdzdHJpbmcnKXtcbiAgICAgICAgLy8gcmVtb3ZlIERPTSBldmVudCBsaXN0ZW5lclxuICAgICAgICAvLyByZW1vdmVFdmVudExpc3RlbmVyIGlzIGZhc3RlciB0aGFuIFwib25cIiBtZXRob2QgZnJvbSBhbnkgRE9NIGxpYnJhcnlcbiAgICAgICAgbm9mbi5mb3JFYWNoKG9uLnNwbGl0KHNwYWNlUmVnKSxcbiAgICAgICAgICAgIGV2dE5hbWUgPT4gbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dE5hbWUsIG5vZGVIYW5kbGVyKSk7XG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIG9iamVjdCBldmVudCBsaXN0ZW5lclxuICAgIHJlbW92ZUxpc3RlbmVyKG9iamVjdCwgYF9jaGFuZ2U6YmluZGluZ3M6JHtrZXl9YCwgb2JqZWN0SGFuZGxlcik7XG5cbiAgICAvLyBpZiBiaW5kZXIuZGVzdHJveSBpcyBnaXZlbiBjYWxsIGl0XG4gICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgICAgZGVzdHJveS5jYWxsKG5vZGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgaWYgKCFzaWxlbnQpIHtcbiAgICAgICAgY29uc3QgZXh0ZW5kZWRFdnQgPSBub2ZuLmFzc2lnbih7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBub2RlXG4gICAgICAgIH0sIGV2dCk7XG5cbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGB1bmJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ3VuYmluZCcsIGV4dGVuZGVkRXZ0KTtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvcmVtb3ZlYmluZGluZy5qc1xuICoqLyIsImltcG9ydCBsb29rRm9yQmluZGVyIGZyb20gJy4vbG9va2ZvcmJpbmRlcic7XG5pbXBvcnQgcnVuTm9kZUhhbmRsZXIgZnJvbSAnLi9ydW5ub2RlaGFuZGxlcic7XG5pbXBvcnQgcnVuT2JqZWN0SGFuZGxlciBmcm9tICcuL3J1bm9iamVjdGhhbmRsZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnLi4vX2V2ZW50cy90cmlnZ2Vyb25lJztcbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICcuLi9fZXZlbnRzL2FkZGxpc3RlbmVyJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICcuLi9fdXRpbC9kZWJvdW5jZSc7XG5pbXBvcnQgc2V0IGZyb20gJy4uL3NldCc7XG5cbmNvbnN0IHNwYWNlUmVnID0gL1xccysvO1xuXG4vLyBoYW5kbGVzIGJpbmRpbmcgZm9yIHNpbmdsZSBwcm9wZXJ0eSAmIG5vZGVcbi8vIHRoZSBmdW5jdGlvbiBpcyB1c2VkIGF0IGJpbmROb2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBiaW5kU2luZ2xlTm9kZShvYmplY3QsIHtcbiAgICBiaW5kZXI6IGdpdmVuQmluZGVyLFxuICAgIGtleSxcbiAgICAkbm9kZXMsXG4gICAgbm9kZSxcbiAgICBldnQsXG4gICAgcHJvcERlZlxufSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgc2lsZW50LFxuICAgICAgICBhc3NpZ25EZWZhdWx0VmFsdWUsXG4gICAgICAgIGRlYm91bmNlOiBkZWJvdW5jZU9wdGlvblxuICAgIH0gPSBldnQ7XG4gICAgLy8gY3JlYXRlIGJpbmRpbmdzIGFycmF5IGluIHByb3BlcnR5IGRlZmluaXRpb24gb2JqZWN0XG4gICAgY29uc3QgYmluZGluZ3MgPSBwcm9wRGVmLmJpbmRpbmdzID0gcHJvcERlZi5iaW5kaW5ncyB8fCBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIGxldCB7IHZhbHVlIH0gPSBwcm9wRGVmO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHNlbGY6IG9iamVjdCxcbiAgICAgICAga2V5LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgJG5vZGVzLFxuICAgICAgICBub2RlXG4gICAgfTtcbiAgICBsZXQgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuICAgIGxldCBiaW5kZXI7XG4gICAgbGV0IG9iamVjdEhhbmRsZXI7XG4gICAgbGV0IG5vZGVIYW5kbGVyO1xuXG4gICAgLy8gZ2V0IGFjdHVhbCBiaW5kZXJcbiAgICBpZiAoZ2l2ZW5CaW5kZXIgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZm91bmRCaW5kZXIgPSBsb29rRm9yQmluZGVyKG5vZGUpO1xuXG4gICAgICAgIGlmIChmb3VuZEJpbmRlcikge1xuICAgICAgICAgICAgaWYgKGdpdmVuQmluZGVyKSB7XG4gICAgICAgICAgICAgICAgbm9mbi5hc3NpZ24oZm91bmRCaW5kZXIsIGdpdmVuQmluZGVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYmluZGVyID0gZm91bmRCaW5kZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiaW5kZXIgPSBnaXZlbkJpbmRlcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgZ2V0VmFsdWUsIHNldFZhbHVlLCBvbiwgaW5pdGlhbGl6ZSB9ID0gYmluZGVyO1xuXG4gICAgLy8gY2FsbCBiaW5kZXIuaW5pdGlhbGl6ZVxuICAgIGlmIChpbml0aWFsaXplKSB7XG4gICAgICAgIGluaXRpYWxpemUuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBjYWxscyBnZXRWYWx1ZSBpbW1lZGlhdGVseSBhbmQgcmVhc3NpZ24gYSBwcm9wZXJ0eVxuICAgIC8vIHdoZW4gYWxsIHJlcXVpcmVkIGNvbmRpdGlvbnMgYXJlIG1ldCBmb3IgdGhpc1xuICAgIGlmIChnZXRWYWx1ZSAmJiAoaXNVbmRlZmluZWQgJiYgYXNzaWduRGVmYXVsdFZhbHVlICE9PSBmYWxzZSB8fCBhc3NpZ25EZWZhdWx0VmFsdWUgPT09IHRydWUpKSB7XG4gICAgICAgIHZhbHVlID0gZ2V0VmFsdWUuY2FsbChub2RlLCBvcHRpb25zKTtcbiAgICAgICAgaXNVbmRlZmluZWQgPSB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIHNldChvYmplY3QsIGtleSwgdmFsdWUsIG5vZm4uYXNzaWduKHsgZnJvbU5vZGU6IHRydWUgfSwgZXZ0KSk7XG4gICAgfVxuXG4gICAgLy8gYWRkIG5lZWRlZCBldmVudCBoYW5kbGVycyB0aGUgb2JqZWN0IHdoZW4gc2V0VmFsdWUgaXMgZ2l2ZW5cbiAgICBpZiAoc2V0VmFsdWUpIHtcbiAgICAgICAgb2JqZWN0SGFuZGxlciA9ICgpID0+IHJ1bk9iamVjdEhhbmRsZXIoe1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIHByb3BEZWYsXG4gICAgICAgICAgICBiaW5kZXIsXG4gICAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgICAgZXZ0XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGJ5IGRlZmF1bHQgZGVib3VuY2luZyBpcyBvblxuICAgICAgICAvLyBpdCBjYW4gYmUgdHVybmVkIG9mZiBieSBwYXNzaW5nIGRlYm91bmNlPWZhbHNlIHRvIGV2ZW50IG9iamVjdFxuICAgICAgICBpZiAoZGVib3VuY2VPcHRpb24gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHR5cGVvZiBkZWJvdW5jZU9wdGlvbiA9PT0gJ251bWJlcicgPyBkZWJvdW5jZU9wdGlvbiA6IDA7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyID0gZGVib3VuY2Uob2JqZWN0SGFuZGxlciwgZGVsYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpiaW5kaW5nczoke2tleX1gLCBvYmplY3RIYW5kbGVyKTtcblxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvYmplY3RIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgbmVlZGVkIGV2ZW50IGhhbmRsZXJzIHRoZSBub2RlIHdoZW4gZ2V0VmFsdWUgJiBvbiBhcmUgZ2l2ZW5cbiAgICBpZiAoZ2V0VmFsdWUgJiYgb24pIHtcbiAgICAgICAgbm9kZUhhbmRsZXIgPSAoZG9tRXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIG5vZGVIYW5kbGVyLmRpc2FibGVkID0gdHJ1ZSBpcyBzZXQgaW4gdW5iaW5kTm9kZVxuICAgICAgICAgICAgLy8gd2UgY2Fubm90IFwidHVybiBvZmZcIiBiaW5kZXIub24gd2hlbiBpdHMgdmFsdWUgaXMgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGRldmVsb3BlciBuZWVkcyB0byBjbGVhbiBtZW1vcnkgKHR1cm4gb2ZmIGNhbGxiYWNrKSBtYW51YWx5IGluIGJpbmRlci5kZXN0cm95XG4gICAgICAgICAgICBpZighbm9kZUhhbmRsZXIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBydW5Ob2RlSGFuZGxlcih7XG4gICAgICAgICAgICAgICAgICAgIGRvbUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3QsXG4gICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcERlZixcbiAgICAgICAgICAgICAgICAgICAgYmluZGVyLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIHRocm93IGVycm9yIHdoZW4gXCJvblwiIGFuZCBtYXliZSBvdGhlciBiaW5kZXIgcHJvcGVydGllcyBoYXMgd3JvbmcgdHlwZVxuICAgICAgICBpZiAodHlwZW9mIG9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBvbi5jYWxsKG5vZGUsIG5vZGVIYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb24gPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgIC8vIGFkZEV2ZW50TGlzdGVuZXIgaXMgZmFzdGVyIHRoYW4gXCJvblwiIG1ldGhvZCBmcm9tIGFueSBET00gbGlicmFyeVxuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKG9uLnNwbGl0KHNwYWNlUmVnKSxcbiAgICAgICAgICAgICAgICBldnROYW1lID0+IG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnROYW1lLCBub2RlSGFuZGxlcikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIGJpbmRpbmcgZGF0YSB0byBiaW5kaW5ncyBhcnJheVxuICAgIGJpbmRpbmdzLnB1c2goe1xuICAgICAgICBvbixcbiAgICAgICAgbm9kZSxcbiAgICAgICAgYmluZGVyLFxuICAgICAgICBvYmplY3RIYW5kbGVyLFxuICAgICAgICBub2RlSGFuZGxlcixcbiAgICAgICAgb3B0aW9uc1xuICAgIH0pO1xuXG4gICAgLy8gZmlyZSBldmVudHNcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgICBjb25zdCBleHRlbmRlZEV2dCA9IG5vZm4uYXNzaWduKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgfSwgZXZ0KTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgYGJpbmQ6JHtrZXl9YCwgZXh0ZW5kZWRFdnQpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iamVjdCwgJ2JpbmQnLCBleHRlbmRlZEV2dCk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL2JpbmRzaW5nbGVub2RlLmpzXG4gKiovIiwiaW1wb3J0IGRlZmF1bHRCaW5kZXJzIGZyb20gJy4vZGVmYXVsdGJpbmRlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVmYXVsdEJpbmRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHJlc3VsdCA9IGRlZmF1bHRCaW5kZXJzW2ldLmNhbGwobm9kZSwgbm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvbG9va2ZvcmJpbmRlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IFtub2RlID0+IHtcbiAgICBjb25zdCB0YWdOYW1lID0gbm9kZS50YWdOYW1lO1xuXHRjb25zdCBiaW5kZXJzID0gdW5kZWZpbmVkOyAvLyBUT0RPXG4gICAgbGV0IGI7XG5cbiAgICAvLyBUT0RPIFN3aXRjaC9jYXNlXG4gICAgaWYgKHRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgYiA9IGJpbmRlcnMuaW5wdXQobm9kZS50eXBlKTtcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgYiA9IGJpbmRlcnMudGV4dGFyZWEoKTtcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLnNlbGVjdChub2RlLm11bHRpcGxlKTtcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdQUk9HUkVTUycpIHtcbiAgICAgICAgYiA9IGJpbmRlcnMucHJvZ3Jlc3MoKTtcbiAgICB9IGVsc2UgaWYgKHRhZ05hbWUgPT09ICdPVVRQVVQnKSB7XG4gICAgICAgIGIgPSBiaW5kZXJzLm91dHB1dCgpO1xuICAgIH1cblxuICAgIHJldHVybiBiO1xufV07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvZGVmYXVsdGJpbmRlcnMuanNcbiAqKi8iLCJpbXBvcnQgaXMgZnJvbSAnLi4vX3V0aWwvaXMnO1xuaW1wb3J0IHNldCBmcm9tICcuLi9zZXQnO1xuXG4vLyB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIGJvdW5kIG5vZGUgaXMgY2hhbmdlZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcnVuTm9kZUhhbmRsZXIoe1xuICAgIGRvbUV2ZW50ID0ge30sXG4gICAgb2JqZWN0LFxuICAgIGtleSxcbiAgICBub2RlLFxuICAgIHByb3BEZWYsXG4gICAgYmluZGVyLFxuICAgIG9wdGlvbnNcbn0pIHtcbiAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gcHJvcERlZi52YWx1ZTtcbiAgICBjb25zdCB7IHdoaWNoLCB0YXJnZXQgfSA9IGRvbUV2ZW50O1xuICAgIGNvbnN0IHsgZ2V0VmFsdWUgfSA9IGJpbmRlcjtcbiAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlLmNhbGwobm9kZSwgbm9mbi5hc3NpZ24oe1xuICAgICAgICBwcmV2aW91c1ZhbHVlLFxuICAgICAgICBkb21FdmVudCxcbiAgICAgICAgb3JpZ2luYWxFdmVudDogZG9tRXZlbnQub3JpZ2luYWxFdmVudCB8fCBkb21FdmVudCwgLy8galF1ZXJ5IHRoaW5nXG4gICAgICAgIC8vIHdpbGwgdGhyb3cgXCJwcmV2ZW50RGVmYXVsdCBpcyBub3QgYSBmdW5jdGlvblwiIHdoZW4gZG9tRXZlbnQgaXMgZW1wdHkgb2JqZWN0XG4gICAgICAgIHByZXZlbnREZWZhdWx0OiAoKSA9PiBkb21FdmVudC5wcmV2ZW50RGVmYXVsdCgpLFxuICAgICAgICAvLyB3aWxsIHRocm93IFwic3RvcFByb3BhZ2F0aW9uIGlzIG5vdCBhIGZ1bmN0aW9uXCIgd2hlbiBkb21FdmVudCBpcyBlbXB0eSBvYmplY3RcbiAgICAgICAgc3RvcFByb3BhZ2F0aW9uOiAoKSA9PiBkb21FdmVudC5zdG9wUHJvcGFnYXRpb24oKSxcbiAgICAgICAgd2hpY2gsXG4gICAgICAgIHRhcmdldFxuICAgIH0sIG9wdGlvbnMpKTtcblxuICAgIGlmICghaXModmFsdWUsIHByZXZpb3VzVmFsdWUpKSB7XG4gICAgICAgIC8vIFRPRE8gYWRkIGRlc2NyaXB0aW9uIG9mIGEgaGFja1xuICAgICAgICAvLyB3aHkgZG8gd2UgbmVlZCBjaGFuZ2VkTm9kZSwgb25DaGFuZ2VWYWx1ZSwgYmluZGVyP1xuICAgICAgICBzZXQob2JqZWN0LCBrZXksIHZhbHVlLCB7XG4gICAgICAgICAgICBmcm9tTm9kZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYW5nZWROb2RlOiBub2RlLFxuICAgICAgICAgICAgb25DaGFuZ2VWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBiaW5kZXJcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvX2JpbmRpbmdzL3J1bm5vZGVoYW5kbGVyLmpzXG4gKiovIiwiLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiBwcm9wZXJ0eSB2YWx1ZSBpcyBjaGFuZ2VkXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBydW5PYmplY3RIYW5kbGVyKHtcbiAgICBub2RlLFxuICAgIHByb3BEZWYsXG4gICAgYmluZGVyLFxuICAgIG9wdGlvbnMsXG4gICAgZXZ0XG59KSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gcHJvcERlZjtcbiAgICBjb25zdCB7IG9uQ2hhbmdlVmFsdWUsIGNoYW5nZWROb2RlLCBiaW5kZXI6IGV2dEJpbmRlciB9ID0gZXZ0O1xuICAgIGNvbnN0IHsgc2V0VmFsdWUgfSA9IGJpbmRlcjtcbiAgICAvLyBkaXJ0eSBoYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vbWF0cmVzaGthanMvbWF0cmVzaGthL2lzc3Vlcy8xOVxuICAgIGNvbnN0IGRpcnR5SGFja1ZhbHVlID0gb25DaGFuZ2VWYWx1ZSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICA/IFN0cmluZyh2YWx1ZSkgOiB2YWx1ZTtcblxuICAgIGlmIChjaGFuZ2VkTm9kZSA9PT0gbm9kZSAmJiBvbkNoYW5nZVZhbHVlID09PSBkaXJ0eUhhY2tWYWx1ZSAmJiBldnRCaW5kZXIgPT09IGJpbmRlcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0VmFsdWUuY2FsbChub2RlLCB2YWx1ZSwgbm9mbi5hc3NpZ24oeyB2YWx1ZSB9LCBvcHRpb25zKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qc1xuICoqLyIsIi8qIGVzbGludCBuby1zaGFkb3c6IFtcImVycm9yXCIsIHsgXCJhbGxvd1wiOiBbXCJldnRcIl0gfV0qL1xuaW1wb3J0IGluaXRNSyBmcm9tICcuLi9fY29yZS9pbml0JztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmaW5lUHJvcCBmcm9tICcuLi9fY29yZS9kZWZpbmVwcm9wJztcblxuLy8gcHJvcGVydHkgbW9kaWZpZXIgZXZlbnQgcmVnZXhwXG5jb25zdCBwcm9wTW9kRXZlbnRSZWdcbiAgICA9IC9eX2NoYW5nZTpkZXBzOnxeX2NoYW5nZTpiaW5kaW5nczp8Xl9jaGFuZ2U6ZGVsZWdhdGVkOnxeX2NoYW5nZTp0cmVlOnxeY2hhbmdlOnxeYmVmb3JlY2hhbmdlOi87XG5cbi8vIGFkZHMgc2ltcGxlIGV2ZW50IGxpc3RlbmVyXG4vLyB1c2VkIGFzIGNvcmUgb2YgZXZlbnQgZW5naW5lXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0LCBpbmZvID0ge30pIHtcbiAgICBjb25zdCB7IGV2ZW50czogYWxsRXZlbnRzIH0gPSBpbml0TUsob2JqZWN0KTtcbiAgICBjb25zdCBjdHggPSBjb250ZXh0IHx8IG9iamVjdDtcbiAgICBjb25zdCBldmVudHMgPSBhbGxFdmVudHNbbmFtZV07XG4gICAgY29uc3QgZXZ0ID0geyBjYWxsYmFjaywgY29udGV4dCwgY3R4LCBuYW1lLCBpbmZvIH07XG5cblxuICAgIC8vIGlmIHRoZXJlIGFyZSBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lXG4gICAgaWYgKGV2ZW50cykge1xuICAgICAgICAvLyBpZiB0aGVyZSBhcmUgZXZlbnRzIHdpdGggdGhlIHNhbWUgZGF0YSwgcmV0dXJuIGZhbHNlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBldnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBpZiAoKGV2dC5jYWxsYmFjayA9PT0gY2FsbGJhY2sgfHwgZXZ0LmNhbGxiYWNrID09PSBjYWxsYmFjay5fY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICYmIGV2dC5jb250ZXh0ID09PSBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGV2ZW50IGlzbid0IGZvdW5kIGFkZCBpdCB0byB0aGUgZXZlbnQgbGlzdFxuICAgICAgICBldmVudHMucHVzaChldnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGFyZSBubyBldmVudHMgd2l0aCB0aGUgc2FtZSBuYW1lLCBjcmVhdGUgYXJyYXkgd2l0aCBvbmx5IGViZW50XG4gICAgICAgIGFsbEV2ZW50c1tuYW1lXSA9IFtldnRdO1xuICAgIH1cblxuICAgIGlmIChwcm9wTW9kRXZlbnRSZWcudGVzdChuYW1lKSkge1xuICAgICAgICAvLyBkZWZpbmUgbmVlZGVkIGFjY2Vzc29ycyBmb3IgS0VZXG4gICAgICAgIGRlZmluZVByb3Aob2JqZWN0LCBuYW1lLnJlcGxhY2UocHJvcE1vZEV2ZW50UmVnLCAnJykpO1xuICAgIH1cblxuICAgIGlmIChuYW1lWzBdICE9PSAnXycpIHtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsIGBhZGRldmVudDoke25hbWV9YCwgZXZ0KTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmplY3QsICdhZGRldmVudCcsIGV2dCk7XG4gICAgfVxuXG4gICAgLy8gaWYgZXZlbnQgaXMgYWRkZWQgcmV0dXJuIHRydWVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvYWRkbGlzdGVuZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCBnaXZlbkRlbGF5LCB0aGlzQXJnKSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgbGV0IGRlbGF5O1xuICAgIGlmICh0eXBlb2YgZGVsYXkgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRoaXNBcmcgPSBnaXZlbkRlbGF5OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGRlbGF5ID0gMDtcbiAgICB9XG5cbiAgICBkZWxheSA9IGdpdmVuRGVsYXkgfHwgMDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIGNvbnN0IFthMSwgYTJdID0gYXJncztcbiAgICAgICAgY29uc3QgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICBjb25zdCBjYWxsQ29udGV4dCA9IHRoaXNBcmcgfHwgdGhpcztcblxuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGFyZ3NMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMuY2FsbChjYWxsQ29udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0LCBhMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5jYWxsKGNhbGxDb250ZXh0LCBhMSwgYTIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNhbGxDb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9fdXRpbC9kZWJvdW5jZS5qc1xuICoqLyIsIi8qIGVzbGludCBuby11c2UtYmVmb3JlLWRlZmluZTogW1wiZXJyb3JcIiwgeyBcImZ1bmN0aW9uc1wiOiBmYWxzZSB9XSovXG5pbXBvcnQgYWRkTGlzdGVuZXIgZnJvbSAnLi9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgdW5kZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJy4vdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB0cmlnZ2VyT25lIGZyb20gJy4vdHJpZ2dlcm9uZSc7XG5pbXBvcnQgZGVmcyBmcm9tICcuLi9fY29yZS9kZWZzJztcbmltcG9ydCBpcyBmcm9tICcuLi9fdXRpbC9pcyc7XG5cbmNvbnN0IHRyZWVDaGFuZ2VFdnRSZWcgPSAvXl9jaGFuZ2U6dHJlZTovO1xuXG5mdW5jdGlvbiBjaGFuZ2VIYW5kbGVyKHtcbiAgICBwcmV2aW91c1ZhbHVlLFxuICAgIHZhbHVlXG59LCB7XG4gICAgcGF0aCxcbiAgICBuYW1lLFxuICAgIGNhbGxiYWNrLFxuICAgIGNvbnRleHRcbn0gPSB0cmlnZ2VyT25lLmxhdGVzdEV2ZW50LmluZm8uZGVsZWdhdGVkRGF0YSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIodmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICBpZiAocHJldmlvdXNWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKHByZXZpb3VzVmFsdWUsIHBhdGgsIG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIHRyZWUgY2hhbmdlIGV2ZW50IHdoaWNoIGlzIHVzZWQgYnkgYmluZGluZ3MgbG9naWNcbiAgICBpZiAodHJlZUNoYW5nZUV2dFJlZy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUtleSA9IG5hbWUucmVwbGFjZSh0cmVlQ2hhbmdlRXZ0UmVnLCAnJyk7XG5cbiAgICAgICAgaWYgKHByZXZpb3VzVmFsdWUgJiYgIWlzKHByZXZpb3VzVmFsdWVbY2hhbmdlS2V5XSwgdmFsdWVbY2hhbmdlS2V5XSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgZXZlbnRzIH0gPSBkZWZzLmdldCh2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCB0cmVlQ2hhbmdlRXZ0TmFtZSA9IGBfY2hhbmdlOnRyZWU6JHtjaGFuZ2VLZXl9YDtcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZUV2ZW50cyA9IGV2ZW50c1t0cmVlQ2hhbmdlRXZ0TmFtZV07XG4gICAgICAgICAgICBpZiAoY2hhbmdlRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgdHJpZ2dlck9uZSh2YWx1ZSwgdHJlZUNoYW5nZUV2dE5hbWUsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZTogcHJldmlvdXNWYWx1ZVtjaGFuZ2VLZXldLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVbY2hhbmdlS2V5XSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVsZWdhdGVMaXN0ZW5lcihvYmplY3QsIGdpdmVuUGF0aCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAvLyBpZiB0eXBlb2YgcGF0aCBpcyBzdHJpbmcgYW5kIHBhdGggaXMgbm90IGVtcHR5IHN0cmluZyB0aGVuIHNwbGl0IGl0XG4gICAgbGV0IHBhdGggPSB0eXBlb2YgZ2l2ZW5QYXRoID09PSAnc3RyaW5nJyAmJiBnaXZlblBhdGggIT09ICcnID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBnaXZlblBhdGg7XG5cbiAgICBpZiAoIXBhdGggfHwgIXBhdGgubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIG5vIHBhdGggdGhlbiBhZGQgc2ltcGxlIGxpc3RlbmVyXG4gICAgICAgIGFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVsc2UgZG8gYWxsIG1hZ2ljXG4gICAgICAgIGNvbnN0IGtleSA9IHBhdGhbMF07XG4gICAgICAgIGxldCBwYXRoU3RyO1xuXG4gICAgICAgIGlmIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHBhdGggPSBub2ZuLnNsaWNlKHBhdGgsIDEpO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGguam9pbignLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF0aCA9IFtdO1xuICAgICAgICAgICAgcGF0aFN0ciA9IHBhdGhbMF0gfHwgJyc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWxlZ2F0ZWREYXRhID0ge1xuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgfTtcblxuICAgICAgICAvLyB0aGUgZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IFwic2V0XCJcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqZWN0LCBgX2NoYW5nZTpkZWxlZ2F0ZWQ6JHtrZXl9YCwgY2hhbmdlSGFuZGxlciwgbnVsbCwge1xuICAgICAgICAgICAgZGVsZWdhdGVkRGF0YSxcbiAgICAgICAgICAgIHBhdGhTdHJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2FsbCBoYW5kbGVyIG1hbnVhbGx5XG4gICAgICAgIGNoYW5nZUhhbmRsZXIoe1xuICAgICAgICAgICAgdmFsdWU6IG9iamVjdFtrZXldXG4gICAgICAgIH0sIGRlbGVnYXRlZERhdGEpO1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL19ldmVudHMvZGVsZWdhdGVsaXN0ZW5lci5qc1xuICoqLyIsImltcG9ydCBiaW5kTm9kZSBmcm9tICcuL2JpbmRub2RlJztcblxuLy8gVE9ETyBkZXNjcmlwdGlvblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZE9wdGlvbmFsTm9kZSguLi5hcmdzKSB7XG4gICAgLy8gdGhpcyBoYWNrIGFsbG93cyB0byBrZWVwIGJpbmRPcHRpb25hbE5vZGUgYXMgY29tcGFjdCBhcyBwb3NzaWJsZVxuICAgIC8vIGFuZCBkb2Vzbid0IHJlcXVpcmUgdG8gZmxpcCBhcmdzIGFuZCBzdXBwb2VyIGFsbCBiaW5kTm9kZSB2YXJpYXRpb25zXG4gICAgYmluZE5vZGUudGVtcG9yYXJ5T3B0aW9uYWxGbGFnID0gdHJ1ZTtcbiAgICByZXR1cm4gYmluZE5vZGUuY2FsbCh0aGlzLCAuLi5hcmdzKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRvcHRpb25hbG5vZGUuanNcbiAqKi8iLCJpbXBvcnQgYmluZE5vZGUgZnJvbSAnLi9iaW5kbm9kZSc7XG5pbXBvcnQgdW5iaW5kTm9kZSBmcm9tICcuL3VuYmluZG5vZGUnO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRTYW5kYm94KG9iamVjdCwgbm9kZSwgZXZ0KSB7XG4gICAgaWYodHlwZW9mIHRoaXMgPT09ICdvYmplY3QnICYmIHRoaXMuaXNNSykge1xuICAgICAgICAvLyB3aGVuIGNvbnRleHQgaXMgTWF0cmVzaGthIGluc3RhbmNlLCB1c2UgdGhpcyBhcyBhbiBvYmplY3QgYW5kIHNoaWZ0IG90aGVyIGFyZ3NcbiAgICAgICAgZXZ0ID0gbm9kZTtcbiAgICAgICAgbm9kZSA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdiaW5kU2FuZGJveCcpO1xuICAgIH1cblxuICAgIHVuYmluZE5vZGUob2JqZWN0LCAnc2FuZGJveCcsIG51bGwsIGV2dCk7XG4gICAgcmV0dXJuIGJpbmROb2RlKG9iamVjdCwgJ3NhbmRib3gnLCBub2RlLCBudWxsLCBldnQpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZHNhbmRib3guanNcbiAqKi8iLCJpbXBvcnQgZGVmcyBmcm9tICcuL19jb3JlL2RlZnMnO1xuaW1wb3J0IGRvbSBmcm9tICcuL19kb20nO1xuaW1wb3J0IHNlbGVjdE5vZGVzIGZyb20gJy4vX2JpbmRpbmdzL3NlbGVjdG5vZGVzJztcbmltcG9ydCB0b0FycmF5IGZyb20gJy4vX3V0aWwvdG9hcnJheSc7XG5pbXBvcnQgY2hlY2tPYmplY3RUeXBlIGZyb20gJy4vX3V0aWwvY2hlY2tvYmplY3R0eXBlJztcblxuY29uc3QgY3VzdG9tU2VsZWN0b3JUZXN0UmVnID0gLzpzYW5kYm94fDpib3VuZFxcKChbXihdKilcXCkvO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3Qob2JqZWN0LCBzZWxlY3Rvcikge1xuICAgIGlmKHR5cGVvZiB0aGlzID09PSAnb2JqZWN0JyAmJiB0aGlzLmlzTUspIHtcbiAgICAgICAgLy8gd2hlbiBjb250ZXh0IGlzIE1hdHJlc2hrYSBpbnN0YW5jZSwgdXNlIHRoaXMgYXMgYW4gb2JqZWN0IGFuZCBzaGlmdCBvdGhlciBhcmdzXG4gICAgICAgIHNlbGVjdG9yID0gb2JqZWN0O1xuICAgICAgICBvYmplY3QgPSB0aGlzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRocm93IGVycm9yIHdoZW4gb2JqZWN0IHR5cGUgaXMgd3JvbmdcbiAgICAgICAgY2hlY2tPYmplY3RUeXBlKG9iamVjdCwgJ3NlbGVjdEFsbCcpO1xuICAgIH1cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpWzBdIHx8IG51bGw7XG5cdH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZiA9IGRlZnMuZ2V0KG9iamVjdCk7XG5cbiAgICAgICAgaWYgKCFkZWYgfHwgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgYmluZGluZ3MgfSA9IHByb3BEZWY7XG5cbiAgICAgICAgaWYoYmluZGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbm9kZSB9ID0gYmluZGluZ3NbMF07XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuXHR9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2VsZWN0LmpzXG4gKiovIiwiaW1wb3J0IGRlZnMgZnJvbSAnLi9fY29yZS9kZWZzJztcbmltcG9ydCBkb20gZnJvbSAnLi9fZG9tJztcbmltcG9ydCBzZWxlY3ROb2RlcyBmcm9tICcuL19iaW5kaW5ncy9zZWxlY3Rub2Rlcyc7XG5pbXBvcnQgdG9BcnJheSBmcm9tICcuL191dGlsL3RvYXJyYXknO1xuaW1wb3J0IGNoZWNrT2JqZWN0VHlwZSBmcm9tICcuL191dGlsL2NoZWNrb2JqZWN0dHlwZSc7XG5cbmNvbnN0IGN1c3RvbVNlbGVjdG9yVGVzdFJlZyA9IC86c2FuZGJveHw6Ym91bmRcXCgoW14oXSopXFwpLztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2VsZWN0QWxsKG9iamVjdCwgc2VsZWN0b3IpIHtcbiAgICBpZih0eXBlb2YgdGhpcyA9PT0gJ29iamVjdCcgJiYgdGhpcy5pc01LKSB7XG4gICAgICAgIC8vIHdoZW4gY29udGV4dCBpcyBNYXRyZXNoa2EgaW5zdGFuY2UsIHVzZSB0aGlzIGFzIGFuIG9iamVjdCBhbmQgc2hpZnQgb3RoZXIgYXJnc1xuICAgICAgICBzZWxlY3RvciA9IG9iamVjdDtcbiAgICAgICAgb2JqZWN0ID0gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aHJvdyBlcnJvciB3aGVuIG9iamVjdCB0eXBlIGlzIHdyb25nXG4gICAgICAgIGNoZWNrT2JqZWN0VHlwZShvYmplY3QsICdzZWxlY3RBbGwnKTtcbiAgICB9XG5cblxuXHRpZiAoY3VzdG9tU2VsZWN0b3JUZXN0UmVnLnRlc3Qoc2VsZWN0b3IpKSB7XG5cdFx0cmV0dXJuIHNlbGVjdE5vZGVzKG9iamVjdCwgc2VsZWN0b3IpO1xuXHR9IGVsc2Uge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBkb20uJCgpO1xuICAgICAgICBjb25zdCBkZWYgPSBkZWZzLmdldChvYmplY3QpO1xuXG4gICAgICAgIGlmICghZGVmIHx8IHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wRGVmID0gZGVmLnByb3BzLnNhbmRib3g7XG5cbiAgICAgICAgaWYgKCFwcm9wRGVmKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBiaW5kaW5ncyB9ID0gcHJvcERlZjtcblxuICAgICAgICBpZihiaW5kaW5ncykge1xuICAgICAgICAgICAgbm9mbi5mb3JFYWNoKGJpbmRpbmdzLCAoeyBub2RlIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IG5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LmFkZCh0b0FycmF5KHNlbGVjdGVkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG5cdH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zZWxlY3RhbGwuanNcbiAqKi8iLCIvLyBjcmVhdGVzIG5lc3RlZCBvYmplY3QgYmFzZWQgb24gcGF0aCBhbmQgbGFzdFZhbHVlXG4vLyBleGFtcGxlOiBtYWtlT2JqZWN0KCdhLmIuYycsIDQyKSAtPiB7YToge2I6IHtjOyA0Mn19fVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU9iamVjdChnaXZlblBhdGggPSAnJywgbGFzdFZhbHVlID0ge30pIHtcbiAgICBjb25zdCBwYXRoID0gZ2l2ZW5QYXRoID8gZ2l2ZW5QYXRoLnNwbGl0KCcuJykgOiBbXTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBsZXQgb2JqID0gcmVzdWx0O1xuICAgIGxldCBrZXk7XG5cblxuICAgIHdoaWxlIChwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAga2V5ID0gcGF0aC5zaGlmdCgpO1xuICAgICAgICBvYmogPSBvYmpba2V5XSA9IHt9O1xuICAgIH1cblxuICAgIG9ialtwYXRoLnNoaWZ0KCldID0gbGFzdFZhbHVlO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvbWFrZW9iamVjdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVNweSgpIHtcbiAgICBjb25zdCBzcHlOYW1lID0gYHJhbmRvbU5hbWUke01hdGgucmFuZG9tKCl9JHtuZXcgRGF0ZSgpLmdldFRpbWUoKX1gO1xuICAgIGNvbnN0IHNweSA9ICgpID0+IHt9O1xuICAgIGNvbnN0IHNweU9iaiA9IHt9O1xuICAgIHNweU9ialtzcHlOYW1lXSA9IHNweTtcbiAgICByZXR1cm4gc3B5T24oc3B5T2JqLCBzcHlOYW1lKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvY3JlYXRlc3B5LmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLmFkZCcsICgpID0+IHtcbiAgICBpdCgnYWRkcyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWwyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgZWw1ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5hZGQoW2VsMiwgZWwzLCBlbDQsIGVsNV0pXG4gICAgICAgIF0pLnRvRXF1YWwoW2VsMSwgZWwyLCBlbDMsIGVsNCwgZWw1XSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9hZGRfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5jcmVhdGUnLCAoKSA9PiB7XG4gICAgaXQoJ2NyZWF0ZXMgZWxlbWVudCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicpLnRhZ05hbWVcbiAgICAgICAgKS50b0VxdWFsKCdESVYnKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIGEgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQuY3JlYXRlKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnZm9vYmFyJ1xuICAgICAgICAgICAgfSkuY2xhc3NOYW1lXG4gICAgICAgICkudG9FcXVhbCgnZm9vYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnY3JlYXRlcyBjaGlsZGVuJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkLmNyZWF0ZSgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lOiAnc3BhbidcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSkuY2hpbGRyZW5bMF0udGFnTmFtZVxuICAgICAgICApLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdhZGRzIGF0dHJpYnV0ZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5nZXRBdHRyaWJ1dGUoJ2ZvbycpXG4gICAgICAgICkudG9FcXVhbCgnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3Mgb2JqZWN0IHdpdGggdGFnTmFtZSBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHRhZ05hbWU6ICdkaXYnXG4gICAgICAgICAgICB9KS50YWdOYW1lXG4gICAgICAgICkudG9FcXVhbCgnRElWJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnZXh0ZW5kcyBkYXRhc2V0IG9iamVjdCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJC5jcmVhdGUoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogJ2JhcidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9vJylcbiAgICAgICAgKS50b0VxdWFsKCdiYXInKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2NyZWF0ZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuaW1wb3J0IHNpbXVsYXRlQ2xpY2sgZnJvbSAnLi4vLi4vbGliL3NpbXVsYXRlY2xpY2snO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGV2ZW50cycsICgpID0+IHtcbiAgICBsZXQgdGVzdFNhbmRib3g7XG4gICAgbGV0IGNoaWxkMTtcbiAgICBsZXQgY2hpbGQyO1xuICAgIGxldCBncmFuZGNoaWxkMTtcbiAgICBsZXQgaGFuZGxlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JhbmRjaGlsZDFcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoaWxkMlwiPjwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgIGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZDEnKTtcbiAgICAgICAgY2hpbGQyID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmNoaWxkMicpO1xuICAgICAgICBncmFuZGNoaWxkMSA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5ncmFuZGNoaWxkMScpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlciA9ICgpID0+IHt9O1xuICAgICAgICBzcHlPbih0aGlzLCAnaGFuZGxlcicpO1xuICAgICAgICBoYW5kbGVyID0gdGhpcy5oYW5kbGVyO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgICAgJChbdGVzdFNhbmRib3gsIGNoaWxkMSwgY2hpbGQyLCBncmFuZGNoaWxkMV0pLm9mZignY2xpY2snKTtcbiAgICB9KTtcblxuICAgIGl0KCdBZGRzIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBldmVudCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsIGhhbmRsZXIpLm9mZignY2xpY2snKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayh0ZXN0U2FuZGJveCk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgbmFtZXNwYWNlZCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2sodGVzdFNhbmRib3gpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgbmFtZXNwYWNlZCBsaXN0ZW5lciAobGlzdGVuZXIgaXMgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnUmVtb3ZlcyBuYW1lc3BhY2VkIGxpc3RlbmVyIChsaXN0ZW5lciBpcyBub3Qgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrLnlvJywgaGFuZGxlcikub2ZmKCdjbGljay55bycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKHRlc3RTYW5kYm94KTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBidWJibGluZyBldmVudCBsaXN0ZW5lcicsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgaGFuZGxlcik7XG4gICAgICAgIHNpbXVsYXRlQ2xpY2soZ3JhbmRjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FkZHMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWRkcyBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgKGNsaWNrIG9uIGdyYW5kY2hpbGRyZW4pJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGdyYW5kY2hpbGQxKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdEb2VzblxcdCB0cmlnZ2VyIHdoZW4gY2xpY2tlZCBvbiB3cm9uZyBjaGlsZCcsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDInLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhncmFuZGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgc3BlY2lmaWVkKScsICgpID0+IHtcbiAgICAgICAgJCh0ZXN0U2FuZGJveCkub24oJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKS5vZmYoJ2NsaWNrJywgJy5jaGlsZDEnLCBoYW5kbGVyKTtcbiAgICAgICAgc2ltdWxhdGVDbGljayhjaGlsZDEpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdSZW1vdmVzIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciAoc2VsZWN0b3IgaXMgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIG5vdCBzcGVjaWZpZWQpJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCAnLmNoaWxkMScsIGhhbmRsZXIpLm9mZignY2xpY2snLCAnLmNoaWxkMScpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBpcyBub3Qgc3BlY2lmaWVkLCBoYW5kbGVyIGlzIHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1JlbW92ZXMgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIChzZWxlY3RvciBhbmQgaGFuZGxlciBhcmUgbm90IHNwZWNpZmllZCknLCAoKSA9PiB7XG4gICAgICAgICQodGVzdFNhbmRib3gpLm9uKCdjbGljaycsICcuY2hpbGQxJywgaGFuZGxlcikub2ZmKCdjbGljaycpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1N0b3BzIHByb3BhZ2F0aW9uJywgKCkgPT4ge1xuICAgICAgICAkKHRlc3RTYW5kYm94KS5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgICAgICAgJChjaGlsZDEpLm9uKCdjbGljaycsIGV2dCA9PiBldnQuc3RvcFByb3BhZ2F0aW9uKCkpO1xuICAgICAgICBzaW11bGF0ZUNsaWNrKGNoaWxkMSk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZXZlbnRzX3NwZWMuanNcbiAqKi8iLCIvLyBzaW11bGF0ZXMgY2xpY2sgb24gYSBub2RlXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaW11bGF0ZUNsaWNrKG5vZGUpIHtcbiAgICBjb25zdCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudCcpO1xuICAgIGV2dC5pbml0TW91c2VFdmVudCgnY2xpY2snLCB0cnVlKTtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9saWIvc2ltdWxhdGVjbGljay5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5mbi5maW5kJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcbiAgICBsZXQgZ3JhbmRDaGlsZDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBncmFuZENoaWxkID0gdGVzdFNhbmRib3gucXVlcnlTZWxlY3RvcignLmdyYW5kY2hpbGQnKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQodGVzdFNhbmRib3gpLmZpbmQoJy5ncmFuZGNoaWxkJylcbiAgICAgICAgXSkudG9FcXVhbChbZ3JhbmRDaGlsZF0pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvZmluZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5IGluaXRpYWxpemF0aW9uJywgKCkgPT4ge1xuICAgIGxldCB0ZXN0U2FuZGJveDtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICB0ZXN0U2FuZGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgIHRlc3RTYW5kYm94LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlc3QtMVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXN0LTJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVzdC0zXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9KTtcblxuICAgIGl0KCdhY2NlcHRzIHdpbmRvdycsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJCh3aW5kb3cpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbCh3aW5kb3cpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgZG9jdW1lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoZG9jdW1lbnQpO1xuICAgICAgICBleHBlY3QocmVzdWx0Lmxlbmd0aCkudG9FcXVhbCgxKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFswXSkudG9FcXVhbChkb2N1bWVudCk7XG4gICAgfSk7XG5cbiAgICBpdCgncGFyc2VzIEhUTUwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICQoJzxkaXY+PC9kaXY+PHNwYW4+PC9zcGFuPicpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzBdLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICAgICAgICBleHBlY3QocmVzdWx0WzFdLnRhZ05hbWUpLnRvRXF1YWwoJ1NQQU4nKTtcbiAgICB9KTtcblxuICAgIGl0KCdjb252ZXJ0cyBhcnJheS1saWtlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJChjaGlsZHJlbik7XG5cbiAgICAgICAgZXhwZWN0KGNoaWxkcmVuLmxlbmd0aCkudG9FcXVhbChyZXN1bHQubGVuZ3RoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBleHBlY3QoY2hpbGRyZW5baV0pLnRvRXF1YWwocmVzdWx0W2ldKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ0NvbnZlcnRzIG9uZSBlbGVtZW50JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKicpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkKGVsZW1lbnQpO1xuXG4gICAgICAgIGV4cGVjdChyZXN1bHQubGVuZ3RoKS50b0VxdWFsKDEpO1xuICAgICAgICBleHBlY3QoZWxlbWVudCkudG9FcXVhbChyZXN1bHRbMF0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsIHRlc3RTYW5kYm94KS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1VzZXMgY29udGV4dCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KFxuICAgICAgICAgICAgJCgnLnRlc3QtMScsICcud3JvbmctY29udGV4dCcpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSBudWxsJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKG51bGwpLmxlbmd0aFxuICAgICAgICApLnRvRXF1YWwoMCk7XG4gICAgfSk7XG5cbiAgICBpdCgnQWxsb3dzIHRvIHVzZSB1bmRlZmluZWQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoKS5sZW5ndGhcbiAgICAgICAgKS50b0VxdWFsKDApO1xuICAgIH0pO1xuXG4gICAgaXQoJ0FsbG93cyB0byBjcmVhdGUgcGx1Z2lucycsICgpID0+IHtcbiAgICAgICAgJC5mbi5iUXVlcnlQbHVnaW4gPSBmdW5jdGlvbiBiUXVlcnlQbHVnaW4oKSB7XG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgdGhpcy5sZW5ndGhcbiAgICAgICAgICAgICkudG9FcXVhbChcbiAgICAgICAgICAgICAgICB0ZXN0U2FuZGJveC5xdWVyeVNlbGVjdG9yQWxsKCcqJykubGVuZ3RoXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNweU9uKCQuZm4sICdiUXVlcnlQbHVnaW4nKTtcblxuICAgICAgICAkKCcqJywgdGVzdFNhbmRib3gpLmJRdWVyeVBsdWdpbigpO1xuXG4gICAgICAgIGV4cGVjdCgkLmZuLmJRdWVyeVBsdWdpbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvaW5pdF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCAkIGZyb20gJ3NyYy9icXVlcnknO1xuXG5kZXNjcmliZSgnYlF1ZXJ5LmZuLm5vdCcsICgpID0+IHtcbiAgICBpdCgnY2hlY2tzIGNsYXNzTmFtZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2VsJztcblxuICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAkKGVsKS5pcygnLmVsJylcbiAgICAgICAgKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQoZWwpLmlzKCcuZWwyJylcbiAgICAgICAgKS50b0VxdWFsKGZhbHNlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvYnF1ZXJ5L2lzX3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkuZm4ubm90JywgKCkgPT4ge1xuICAgIGl0KCdleGNsdWRlcyBieSBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgICAgY29uc3QgZWwxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IGVsMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBlbDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBlbDIuY2xhc3NOYW1lID0gJ2VsMic7XG5cbiAgICAgICAgZXhwZWN0KFtcbiAgICAgICAgICAgIC4uLiQoW2VsMSwgZWwyLCBlbDNdKS5ub3QoJy5lbDInKVxuICAgICAgICBdKS50b0VxdWFsKFtlbDEsIGVsM10pO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvbm90X3NwZWMuanNcbiAqKi8iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tdW5yZXNvbHZlZCAqL1xuaW1wb3J0ICQgZnJvbSAnc3JjL2JxdWVyeSc7XG5cbmRlc2NyaWJlKCdiUXVlcnkub25lJywgKCkgPT4ge1xuICAgIGl0KCdmaW5kcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGVzdFNhbmRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICB0ZXN0U2FuZGJveC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyYW5kY2hpbGRcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjaGlsZDJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmFuZGNoaWxkMlwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjb25zdCBjaGlsZCA9IHRlc3RTYW5kYm94LnF1ZXJ5U2VsZWN0b3IoJy5jaGlsZCcpO1xuXG4gICAgICAgIGV4cGVjdChcbiAgICAgICAgICAgICQub25lKCcqJywgdGVzdFNhbmRib3gpXG4gICAgICAgICkudG9FcXVhbChjaGlsZCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2JxdWVyeS9vbmVfc3BlYy5qc1xuICoqLyIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby11bnJlc29sdmVkICovXG5pbXBvcnQgJCBmcm9tICdzcmMvYnF1ZXJ5JztcblxuZGVzY3JpYmUoJ2JRdWVyeS5wYXJzZUhUTUwnLCAoKSA9PiB7XG4gICAgaXQoJ3BhcnNlcyBIVE1MJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPGRpdj48L2Rpdj48c3Bhbj48L3NwYW4+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnRElWJyk7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMV0udGFnTmFtZSkudG9FcXVhbCgnU1BBTicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3BhcnNlcyBjb250ZXh0dWFsIGVsZW1lbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAkLnBhcnNlSFRNTCgnPHRkPjwvdGQ+PHRkPjwvdGQ+Jyk7XG5cbiAgICAgICAgZXhwZWN0KHJlc3VsdC5sZW5ndGgpLnRvRXF1YWwoMik7XG4gICAgICAgIGV4cGVjdChyZXN1bHRbMF0udGFnTmFtZSkudG9FcXVhbCgnVEQnKTtcbiAgICAgICAgZXhwZWN0KHJlc3VsdFsxXS50YWdOYW1lKS50b0VxdWFsKCdURCcpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9icXVlcnkvcGFyc2VodG1sX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgQ2xhc3MgZnJvbSAnc3JjL2NsYXNzJztcblxuZGVzY3JpYmUoJ0NsYXNzIGZ1bmN0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdhbGxvd3MgdG8gaW5oZXJpdCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgQSA9IENsYXNzKHsgYTogdHJ1ZSB9KSxcbiAgICAgICAgICAgIEIgPSBDbGFzcyh7IGI6IHRydWUsIGV4dGVuZHM6IEEgfSksXG4gICAgICAgICAgICBDID0gQ2xhc3MoeyBjOiB0cnVlLCBleHRlbmRzOiBCIH0pLFxuICAgICAgICAgICAgaW5zdCA9IG5ldyBDO1xuXG4gICAgICAgIGV4cGVjdChpbnN0IGluc3RhbmNlb2YgQSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdCBpbnN0YW5jZW9mIEIpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDKS50b0JlVHJ1dGh5KCk7XG5cbiAgICAgICAgZXhwZWN0KGluc3QuYSkudG9CZVRydXRoeSgpO1xuICAgICAgICBleHBlY3QoaW5zdC5iKS50b0JlVHJ1dGh5KCk7XG4gICAgICAgIGV4cGVjdChpbnN0LmMpLnRvQmVUcnV0aHkoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgdG8gcGFzcyBzdGF0aWMgcHJvcHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IEEgPSBDbGFzcyh7fSwgeyBzdGF0aWNQcm9wOiB0cnVlIH0pO1xuICAgICAgICBleHBlY3QoQS5zdGF0aWNQcm9wKS50b0JlVHJ1dGh5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5zdCA9IG5ldyBDbGFzcyh7IGE6IHRydWUgfSk7XG4gICAgICAgIGV4cGVjdChpbnN0LmEpLnRvQmVUcnV0aHkoKTtcbiAgICAgICAgZXhwZWN0KGluc3QgaW5zdGFuY2VvZiBDbGFzcykudG9CZUZhbHN5KCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2NsYXNzX3NwZWMuanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4vZXh0ZW5kJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2xhc3MocHJvdG90eXBlLCBzdGF0aWNQcm9wcykge1xuICAgIGNvbnN0IENvbnN0cnVjdG9yID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yICE9PSBPYmplY3RcbiAgICAgICAgICAgID8gcHJvdG90eXBlLmNvbnN0cnVjdG9yXG4gICAgICAgICAgICA6IGZ1bmN0aW9uIEVtcHR5Q29uc3RydWN0b3IoKSB7fSxcbiAgICAgICAgLy9leHRlbmRzIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgUGFyZW50ID0gcHJvdG90eXBlLmV4dGVuZHMgfHwgcHJvdG90eXBlLmV4dGVuZCxcbiAgICAgICAgLy9pbmhlcml0IHByb3RvIGZyb20gY2xhc3MgcGFyZW50IG9yIGVtcHR5IG9iamVjdFxuICAgICAgICBwcm90byA9IE9iamVjdC5jcmVhdGUoUGFyZW50ID8gUGFyZW50LnByb3RvdHlwZSA6IHt9KTtcblxuICAgIGV4dGVuZChwcm90bywgcHJvdG90eXBlKTtcblxuICAgIGlmICh0eXBlb2Ygc3RhdGljUHJvcHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGV4dGVuZChDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIH1cblxuICAgIC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgcHJvdG8uaW5zdGFuY2VPZiA9IGZ1bmN0aW9uIGluc3RhbmNlT2YoKSB7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3I7XG4gICAgfTtcblxuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvO1xuXG4gICAgLy8gaWYgbmV3IENsYXNzKHt9KSBpcyBjYWxsZWQgcmV0dXJuIGl0cyBpbnN0YW5jZVxuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQ2xhc3MpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3RvcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jbGFzcy5qc1xuICoqLyIsIi8qZXNsaW50LWRpc2FibGUgKi9cbnhkZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChNYXRyZXNoa2EuT2JqZWN0IGFuZCBNYXRyZXNoa2EuQXJyYXkpJywgZnVuY3Rpb24oKSB7XG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBcIipcIiBldmVudHMgKE1LLk9iamVjdCknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuT2JqZWN0KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge30pO1xuXG4gICAgICAgIG1hZ2ljLl91bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5BcnJheSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXZ0ID0+IGJvb2wgPSB0cnVlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG9iai5wdXNoKHt9KTtcblxuICAgICAgICBtYWdpYy5fdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyonLCAnc29tZWV2ZW50JywgY2FsbGJhY2spO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgXCIqXCIgZXZlbnRzIHVzaW5nIGNhbGxiYWNrIChNSy5PYmplY3QpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgY2FsbGJhY2sgPSBldnQgPT4gYm9vbCA9IHRydWU7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKicsICdzb21lZXZlbnQnLCBjYWxsYmFjayk7XG5cbiAgICAgICAgb2JqLmpzZXQoJ3gnLCB7fSk7XG5cbiAgICAgICAgbWFnaWMuX3VuZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqJywgJ3NvbWVldmVudCcsIGNhbGxiYWNrKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai54LCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5BcnJheSksIGdvIGRlZXBlciAoKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5BcnJheSgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKHtcbiAgICAgICAgICAgIGE6IHt9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLmEsICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLmEpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4Jywge1xuICAgICAgICAgICAgYToge31cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuX2RlbGVnYXRlTGlzdGVuZXIob2JqLCAnKi4qJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2gobmV3IE1LLkFycmF5KHt9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0sICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuT2JqZWN0KSwgZ28gZGVlcGVyICgqLiopJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLk9iamVjdCgpLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJyouKicsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmoueC5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnd29ya3Mgd2l0aCBcIipcIiBldmVudHMgKE1LLkFycmF5KSwgZ28gZGVlcGVyICgqLiouYSknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSBuZXcgTUsuQXJyYXkoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5wdXNoKG5ldyBNSy5BcnJheSh7XG4gICAgICAgICAgICBhOiB7fVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmpbMF1bMF0uYSwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dvcmtzIHdpdGggXCIqXCIgZXZlbnRzIChNSy5PYmplY3QpLCBnbyBkZWVwZXIgKCouKi5hKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBNSy5PYmplY3QoKSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5fZGVsZWdhdGVMaXN0ZW5lcihvYmosICcqLiouYScsICdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG9iai5qc2V0KCd4JywgbmV3IE1LLk9iamVjdCh7XG4gICAgICAgICAgICB5OiBuZXcgTUsuT2JqZWN0KHtcbiAgICAgICAgICAgICAgICBhOiB7fVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLngueS5hLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9kZWxlZ2F0ZWRfY29sbGVjdGlvbl9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBkZWxlZ2F0ZUxpc3RlbmVyIGZyb20gJ3NyYy9fZXZlbnRzL2RlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHVuZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRGVsZWdhdGVkIGV2ZW50czogZGVsZWdhdGVMaXN0ZW5lciwgdW5kZWxlZ2F0ZUxpc3RlbmVyIChiYXNpYyknLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjdHggPSB7fTtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gKCkgPT4ge307XG4gICAgICAgIGhhbmRsZXIgPSBjcmVhdGVTcHkoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYicpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYiwgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYicpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iID0ge307XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHdoZW4gcmVhc3NpZ25lZCAoYS5iLmMsIHJlYXNzaWduIGEpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hID0gbWFrZU9iamVjdCgnYi5jJyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYiA9IG1ha2VPYmplY3QoJ2MnKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyB3aGVuIHJlYXNzaWduZWQgKGEuYi5jLCByZWFzc2lnbiBjKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLmMgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmUgZXZlbnQgZnJvbSBvbGQgdGFyZ2V0IHdoZW4gcmVhc3NpZ25lZCAoYS5iLCByZWFzc2lnbiBhKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEgPSBtYWtlT2JqZWN0KCdiJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIsIHJlYXNzaWduIGIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcbiAgICAgICAgY29uc3QgYiA9IG9iai5hLmI7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSB7fTtcbiAgICAgICAgdHJpZ2dlck9uZShiLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYSknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGEgPSBvYmouYTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYSA9IG1ha2VPYmplY3QoJ2IuYycpO1xuICAgICAgICB0cmlnZ2VyT25lKGEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYiknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGIgPSBvYmouYS5iO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIgPSBtYWtlT2JqZWN0KCdjJyk7XG4gICAgICAgIHRyaWdnZXJPbmUoYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZSBldmVudCBmcm9tIG9sZCB0YXJnZXQgd2hlbiByZWFzc2lnbmVkIChhLmIuYywgcmVhc3NpZ24gYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG4gICAgICAgIGNvbnN0IGMgPSBvYmouYS5jO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIG9iai5hLmIuYyA9IHt9O1xuICAgICAgICB0cmlnZ2VyT25lKGMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIChhLmIuYyknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi5jJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmIuYycsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzblxcJ3QgcmVtb3ZlIGNoYW5nZSBldmVudCB3aGVuIHVuZGVsZWdhdGUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsICgpID0+IHt9KTtcbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOmMnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcpO1xuICAgICAgICBvYmouYS5iLmMgPSA1NTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmouYS5iLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgndW5kZWxlZ2F0ZSBieSBjYWxsYmFjayBhbmQgY29udGV4dCAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwgY3R4KTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLmEuYi5jLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY2FsbGJhY2tzIGFyZSBub3Qgc2FtZSAoYS5iKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iJyk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlcik7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNhbGxiYWNrcyBhcmUgbm90IHNhbWUgKGEuYi5jKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMnKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VuZGVsZWdhdGUgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lIChhLmIpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmInKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHVuZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1bmRlbGVnYXRlIGJ5IGNhbGxiYWNrIGJ1dCBrZWVwcyB3aGVuIGNvbnRleHRzIGFyZSBub3Qgc2FtZSAoYS5iLmMpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgaGFuZGxlciwge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3VzZXMgY29ycmVjdCBjb250ZXh0IGZvciBkZWxlZ2F0ZWQgZXZlbnRzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBtYWtlT2JqZWN0KCdhLmIuYycpO1xuICAgICAgICBsZXQgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYS5iLmMnLCAnc29tZWV2ZW50JywgZnVuY3Rpb24gaGFuZGxlKCkge1xuICAgICAgICAgICAgYm9vbCA9IHRoaXMgPT09IGN0eDtcbiAgICAgICAgfSwgY3R4KTtcblxuICAgICAgICB0cmlnZ2VyT25lKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi90ZXN0L3NwZWMvZXZlbnRzL2RlbGVnYXRlZF9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgZGVsZWdhdGVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCB1bmRlbGVnYXRlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvdW5kZWxlZ2F0ZWxpc3RlbmVyJztcbmltcG9ydCByZW1vdmVMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9yZW1vdmVsaXN0ZW5lcic7XG5pbXBvcnQgbWFrZU9iamVjdCBmcm9tICcuLi8uLi9saWIvbWFrZW9iamVjdCc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnQ2hhbmdlIGV2ZW50IChzaW1wbGUgYW5kIGRlbGVnYXRlZCknLCAoKSA9PiB7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgaGFuZGxlciA9IGNyZWF0ZVNweSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLmEuYi54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIHNpbXBsZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0geyB4OiAxIH07XG5cbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgb2JqLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChkZWxlZ2F0ZWQsIGEueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EueCcsIDEpO1xuXG4gICAgICAgIGRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICB1bmRlbGVnYXRlTGlzdGVuZXIob2JqLCAnYScsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS54ID0gMjtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyAoZGVsZWdhdGVkLCBhLmIueCknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IG1ha2VPYmplY3QoJ2EuYi54JywgMSk7XG5cbiAgICAgICAgZGVsZWdhdGVMaXN0ZW5lcihvYmosICdhLmInLCAnY2hhbmdlOngnLCBoYW5kbGVyKTtcbiAgICAgICAgdW5kZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ2ZpcmVzIChkZWxlZ2F0ZWQsIGEuYi54KScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLngnLCAxKTtcblxuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYicsICdjaGFuZ2U6eCcsIGhhbmRsZXIpO1xuICAgICAgICBvYmouYS5iLnggPSAyO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjY2VwdHMgbnVsbCB0YXJnZXQgKGEuYi5jLCByZWFzc2lnbiBiKScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgb2JqID0gbWFrZU9iamVjdCgnYS5iLmMueCcsIDEpO1xuICAgICAgICBkZWxlZ2F0ZUxpc3RlbmVyKG9iaiwgJ2EuYi5jJywgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgICAgIG9iai5hLmIgPSBudWxsO1xuICAgICAgICB9KS5ub3QudG9UaHJvdygpO1xuICAgIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2NoYW5nZV9zcGVjLmpzXG4gKiovIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbmltcG9ydCBhZGRMaXN0ZW5lciBmcm9tICdzcmMvX2V2ZW50cy9hZGRsaXN0ZW5lcic7XG5pbXBvcnQgcmVtb3ZlTGlzdGVuZXIgZnJvbSAnc3JjL19ldmVudHMvcmVtb3ZlbGlzdGVuZXInO1xuaW1wb3J0IHRyaWdnZXJPbmUgZnJvbSAnc3JjL19ldmVudHMvdHJpZ2dlcm9uZSc7XG5pbXBvcnQgY3JlYXRlU3B5IGZyb20gJy4uLy4uL2xpYi9jcmVhdGVzcHknO1xuXG5kZXNjcmliZSgnRXZlbnRzIGNvcmU6IGFkZExpc3RlbmVyLCByZW1vdmVMaXN0ZW5lciwgdHJpZ2dlck9uZScsICgpID0+IHtcbiAgICBsZXQgb2JqO1xuICAgIGxldCBjdHg7XG4gICAgbGV0IGhhbmRsZXI7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgb2JqID0ge307XG4gICAgICAgIGN0eCA9IHt9O1xuICAgICAgICBoYW5kbGVyID0gY3JlYXRlU3B5KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2F2b2lkcyBjb25mbGljdHMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgYWRkTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4gKGkgKz0gMWUwKSk7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsICgpID0+IChpICs9IDFlMSkpO1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCAoKSA9PiAoaSArPSAxZTIpKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9FcXVhbCgxMTEpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIGFyZ3MpJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBuYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgdHJpZ2dlck9uZShvYmosICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGhhbmRsZXIpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBieSBjYWxsYmFjayBidXQga2VlcHMgd2hlbiBjYWxsYmFja3MgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyKTtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXIob2JqLCAnc29tZWV2ZW50JywgKCkgPT4ge30pO1xuICAgICAgICB0cmlnZ2VyT25lKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoaGFuZGxlcikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYW5kIGNvbnRleHQnLCAoKSA9PiB7XG4gICAgICAgIGFkZExpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVyKG9iaiwgJ3NvbWVldmVudCcsIGhhbmRsZXIsIGN0eCk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgYnkgY2FsbGJhY2sgYnV0IGtlZXBzIHdoZW4gY29udGV4dHMgYXJlIG5vdCBzYW1lJywgKCkgPT4ge1xuICAgICAgICBhZGRMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCBjdHgpO1xuICAgICAgICByZW1vdmVMaXN0ZW5lcihvYmosICdzb21lZXZlbnQnLCBoYW5kbGVyLCB7fSk7XG4gICAgICAgIHRyaWdnZXJPbmUob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChoYW5kbGVyKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgfSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfY29yZV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xuXG54ZGVzY3JpYmUoXCJFdmVudHMgY29yZTogX2FkZERPTUxpc3RlbmVyLCBfcmVtb3ZlRE9NTGlzdGVuZXJcIiwgKCkgPT4ge1xuICAgIGxldCBxID0gKHMsIGMpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICQocywgYylbMF0gfHwgbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmVzdWx0LmNsaWNrID0gcmVzdWx0LmNsaWNrIHx8ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNb3VzZUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgIGV2LmluaXRNb3VzZUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIHRydWUgLyogYnViYmxlICovICwgdHJ1ZSAvKiBjYW5jZWxhYmxlICovICxcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAwLCAwLCAwLCAwLCAvKiBjb29yZGluYXRlcyAqL1xuICAgICAgICAgICAgICAgICAgICBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgLyogbW9kaWZpZXIga2V5cyAqL1xuICAgICAgICAgICAgICAgICAgICAwIC8qbGVmdCovICwgbnVsbFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoJC5jcmVhdGUoe1xuICAgICAgICB0YWdOYW1lOiAnRElWJyxcbiAgICAgICAgaWQ6ICdkLXRlc3QnLFxuICAgICAgICBpbm5lckhUTUw6IGBcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkLXRlc3QtMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLXRlc3QtMlwiPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH0pKTtcblxuXG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcbiAgICAgICAgbWFnaWMuX3JlbW92ZURPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snKTtcbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG5cbiAgICAgICAgcSgnI2QtdGVzdCcpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cblxuICAgIGl0KCdhZGRzICh1c2Ugc2VsZWN0b3IpIGFuZCByZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FkZHMgKHVzZSBzZWxlY3RvcikgdGhlbiBiaW5kcyB0aGVuIHJlbW92ZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgJy5kLXRlc3QtMicsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLl9yZW1vdmVET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJyk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50JywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCAoZDEsIGQyKSA9PiBib29sID0gZDEgPT09IDEgJiYgZDIgPT09IDIpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2NsaWNrOjp4JywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCAnLmQtdGVzdC0yJywgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHJpZ2dlcnMgRE9NIGV2ZW50IHdpdGggc3BlY2lmaWVkIHNlbGVjdG9yIChidWJibGluZyB0ZXN0KScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0Jyk7XG4gICAgICAgIG1hZ2ljLl9hZGRET01MaXN0ZW5lcihvYmosICd4JywgJ2NsaWNrJywgbnVsbCwgKGQxLCBkMikgPT4gYm9vbCA9IGQxID09PSAxICYmIGQyID09PSAyKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdjbGljazo6eCguZC10ZXN0LTIpJywgMSwgMik7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCcsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInKTtcblxuICAgICAgICBxKCcuZC10ZXN0LTInKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIGRlbGVnYXRlZCBhbmQgZG9lc25cXCd0IHJlbW92ZSBldmVudHMgZnJvbSBvdGhlciBub2RlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpO1xuICAgICAgICBtYWdpYy5fYWRkRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuZC10ZXN0LTInLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5fcmVtb3ZlRE9NTGlzdGVuZXIob2JqLCAneCcsICdjbGljaycsICcuYmxhaCcpO1xuXG4gICAgICAgIHEoJy5kLXRlc3QtMicpLmNsaWNrKCk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cblxuICAgIGl0KCd0cmlnZ2VycyBldmVudCB2aWEgXCJ0cmlnZ2VyXCIgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMuX2FkZERPTUxpc3RlbmVyKG9iaiwgJ3gnLCAnY2xpY2snLCBudWxsLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3Qvc3BlYy9ldmVudHMvZXZlbnRzX2RvbV9zcGVjLmpzXG4gKiovIiwiLyplc2xpbnQtZGlzYWJsZSAqL1xueGRlc2NyaWJlKCdFdmVudHMgc3VtbWFyeSAob24sIG9mZiknLCAoKSA9PiB7XG4gICAgbGV0IHEgPSAocywgYykgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJChzLCBjKVswXSB8fCBudWxsO1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXN1bHQuY2xpY2sgPSByZXN1bHQuY2xpY2sgfHwgKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgZXYuaW5pdE1vdXNlRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiY2xpY2tcIixcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiBidWJibGUgKi8gLCB0cnVlIC8qIGNhbmNlbGFibGUgKi8gLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3csIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIDAsIDAsIDAsIDAsIC8qIGNvb3JkaW5hdGVzICovXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAvKiBtb2RpZmllciBrZXlzICovXG4gICAgICAgICAgICAgICAgICAgIDAgLypsZWZ0Ki8gLCBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGxldCBub2RlID0gZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCgkLmNyZWF0ZSh7XG4gICAgICAgIHRhZ05hbWU6ICdESVYnLFxuICAgICAgICBpZDogJ3MtdGVzdCcsXG4gICAgICAgIGlubmVySFRNTDogYFxuICAgICAgICAgICAgPGRpdiBpZD1cInMtdGVzdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInMtdGVzdC0yXCI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfSkpO1xuXG4gICAgbm9kZS5jbGljayA9IG5vZGUuY2xpY2sgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snKSk7XG4gICAgfVxuXG4gICAgaXQoJ2ZpcmVzJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ3NvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnZmlyZXMgb24gTWF0cmVzaGthIGluc3RhbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgbWsgPSBuZXcgTUssXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG4gICAgICAgIG1rLm9uKCdzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcycsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWFnaWMub2ZmKG9iaiwgJ3NvbWVldmVudCcpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlLFxuICAgICAgICAgICAgZiA9IGV2dCA9PiBib29sID0gdHJ1ZTtcblxuICAgICAgICBtay5vbignc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1rLm9mZignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaXJlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iai5hLmIuYywgJ3NvbWVldmVudCcpO1xuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuXG5cbiAgICBpdCgncmVtb3ZlcyBkZWxlZ2F0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5vbihvYmosICdhLmIuY0Bzb21lZXZlbnQnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnYS5iLmNAc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmouYS5iLmMsICdzb21lZXZlbnQnKTtcbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKVxuICAgICAgICBtYWdpYy5vbihvYmosICdjbGljazo6eCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZW1vdmVzIChubyBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngnLCBldnQgPT4gYm9vbCA9IHRydWUpO1xuICAgICAgICBtYWdpYy5vZmYob2JqLCAnY2xpY2s6OngnKTtcblxuICAgICAgICBxKCcjZC10ZXN0JykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKHVzZSBzZWxlY3RvciknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcblxuICAgICAgICBtYWdpYy5iaW5kTm9kZShvYmosICd4JywgJyNkLXRlc3QnKTtcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIFwiKlwiIGV2ZW50cyAoTUsuQXJyYXkpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0gbmV3IE1LLkFycmF5KCksXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMub24ob2JqLCAnQHNvbWVldmVudCcsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgb2JqLnB1c2goe30pO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqWzBdLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGJvb2wpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZmlyZXMgKG5vIHNlbGVjdG9yKScsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xuXG4gICAgICAgIG1hZ2ljLmJpbmROb2RlKG9iaiwgJ3gnLCAnI2QtdGVzdCcpXG4gICAgICAgIG1hZ2ljLm9uKG9iaiwgJ2NsaWNrOjp4JywgZXZ0ID0+IGJvb2wgPSB0cnVlKTtcblxuXG4gICAgICAgIHEoJyNkLXRlc3QnKS5jbGljaygpO1xuXG4gICAgICAgIGV4cGVjdChib29sKS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2ZpcmVzICh1c2Ugc2VsZWN0b3IpJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBib29sID0gZmFsc2U7XG5cbiAgICAgICAgbWFnaWMuYmluZE5vZGUob2JqLCAneCcsICcjZC10ZXN0JylcbiAgICAgICAgbWFnaWMub24ob2JqLCAnY2xpY2s6OngoLmQtdGVzdC0yKScsIGV2dCA9PiBib29sID0gdHJ1ZSk7XG5cbiAgICAgICAgcSgnLmQtdGVzdC0yJykuY2xpY2soKTtcblxuICAgICAgICBleHBlY3QoYm9vbCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlJywgKCkgPT4ge1xuICAgICAgICBsZXQgb2JqID0ge30sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIGYgPSBldnQgPT4gaSsrO1xuXG4gICAgICAgIG1hZ2ljLm9uY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uY2VcIicsICgpID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBqID0gMCxcbiAgICAgICAgICAgIGYxID0gZXZ0ID0+IGkrKyxcbiAgICAgICAgICAgIGYyID0gZXZ0ID0+IGorKztcblxuICAgICAgICBtYWdpYy5vbmNlKG9iaiwge1xuICAgICAgICAgICAgZm9vOiBmMSxcbiAgICAgICAgICAgIGJhcjogZjJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgbWFnaWMudHJpZ2dlcihvYmosICdmb28nKTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2JhcicpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICBleHBlY3QoaikudG9CZSgxKTtcbiAgICB9KTtcblxuICAgIGl0KCd0cmlnZ2VycyBvbmNlIG9uIE1hdHJlc2hrYSBpbnN0YW5jZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBtay5vbmNlKCdzb21lZXZlbnQnLCBmKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICB9KTtcblxuXG4gICAgaXQoJ29uRGVib3VuY2Ugd29ya3MnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG9iaiA9IHt9LFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCAnc29tZWV2ZW50JywgZik7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnc29tZWV2ZW50Jyk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uRGVib3VuY2VcIicsIChkb25lKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaiA9IDAsXG4gICAgICAgICAgICBmMSA9IGV2dCA9PiBpKyssXG4gICAgICAgICAgICBmMiA9IGV2dCA9PiBqKys7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBleHBlY3QoaSkudG9CZSgxKTtcbiAgICAgICAgICAgIGV4cGVjdChqKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIG1hZ2ljLm9uRGVib3VuY2Uob2JqLCB7XG4gICAgICAgICAgICBmb286IGYxLFxuICAgICAgICAgICAgYmFyOiBmMlxuICAgICAgICB9KTtcblxuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuICAgICAgICBtYWdpYy50cmlnZ2VyKG9iaiwgJ2ZvbycpO1xuXG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgICAgIG1hZ2ljLnRyaWdnZXIob2JqLCAnYmFyJyk7XG4gICAgfSk7XG5cbiAgICBpdCgnb25EZWJvdW5jZSB3b3JrcyBvbiBNYXRyZXNoa2EgaW5zdGFuY2UnLCBkb25lID0+IHtcbiAgICAgICAgbGV0IG1rID0gbmV3IE1LLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBmID0gZXZ0ID0+IGkrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChpKS50b0JlKDEpO1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9LCA4MDApO1xuXG4gICAgICAgIG1rLm9uRGVib3VuY2UoJ3NvbWVldmVudCcsIGYpO1xuICAgICAgICBtay50cmlnZ2VyKCdzb21lZXZlbnQnKTtcbiAgICAgICAgbWsudHJpZ2dlcignc29tZWV2ZW50Jyk7XG4gICAgICAgIG1rLnRyaWdnZXIoJ3NvbWVldmVudCcpO1xuICAgIH0pO1xuXG5cbiAgICBpdCgnYWxsb3dzIHRvIHBhc3MgbmFtZS1oYW5kbGVyIG9iamVjdCB0byBcIm9uXCIgYW5kIFwib2ZmXCInLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgaGFuZGxlcnMgPSB7XG4gICAgICAgICAgICAgICAgZm9vOiAoKSA9PiBpKyssXG4gICAgICAgICAgICAgICAgYmFyOiAoKSA9PiBpKytcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgTUsub24ob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdmb28nKTtcbiAgICAgICAgTUsudHJpZ2dlcihvYmosICdiYXInKTtcblxuICAgICAgICBleHBlY3QoaSkudG9CZSgyKTtcblxuICAgICAgICBNSy5vZmYob2JqLCBoYW5kbGVycyk7XG5cbiAgICAgICAgZXhwZWN0KGkpLnRvQmUoMik7XG4gICAgfSk7XG5cblxuICAgIGl0KCdhbGxvd3MgdG8gZmxpcCBjb250ZXh0IGFuZCB0cmlnZ2VyT25Jbml0IChvbiknLCAoKSA9PiB7XG4gICAgICAgIGxldCBvYmogPSB7fSxcbiAgICAgICAgICAgIHRoaXNBcmcgPSB7fSxcbiAgICAgICAgICAgIGJvb2wgPSBmYWxzZSxcbiAgICAgICAgICAgIGkgPSAwO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2ZvbycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRydWUsIHRoaXNBcmcpO1xuXG4gICAgICAgIE1LLm9uKG9iaiwgJ2JhcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZXhwZWN0KHRoaXMpLnRvRXF1YWwodGhpc0FyZyk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sIHRoaXNBcmcsIHRydWUpO1xuXG4gICAgICAgIGV4cGVjdChpKS50b0JlKDIpO1xuICAgIH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zcGVjL2V2ZW50cy9ldmVudHNfc3VtbWFyeV9zcGVjLmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL19iaW5kaW5ncy9iaW5kc2luZ2xlbm9kZS5qc1wiOiAzNixcblx0XCIuL19iaW5kaW5ncy9kZWZhdWx0YmluZGVycy5qc1wiOiAzOCxcblx0XCIuL19iaW5kaW5ncy9nZXRub2Rlcy5qc1wiOiAxMixcblx0XCIuL19iaW5kaW5ncy9sb29rZm9yYmluZGVyLmpzXCI6IDM3LFxuXHRcIi4vX2JpbmRpbmdzL3JlbW92ZWJpbmRpbmcuanNcIjogMzUsXG5cdFwiLi9fYmluZGluZ3MvcnVubm9kZWhhbmRsZXIuanNcIjogMzksXG5cdFwiLi9fYmluZGluZ3MvcnVub2JqZWN0aGFuZGxlci5qc1wiOiA0MCxcblx0XCIuL19iaW5kaW5ncy9zZWxlY3Rub2Rlcy5qc1wiOiAxMyxcblx0XCIuL19iaW5kaW5ncy9zd2l0Y2hiaW5kaW5nLmpzXCI6IDMxLFxuXHRcIi4vX2NvcmUvZGVmaW5lcHJvcC5qc1wiOiA2LFxuXHRcIi4vX2NvcmUvZGVmcy5qc1wiOiA1LFxuXHRcIi4vX2NvcmUvaW5pdC5qc1wiOiA0LFxuXHRcIi4vX2RvbS9kZWZhdWx0LWRvbGxhci5qc1wiOiAxNixcblx0XCIuL19kb20vaW5kZXguanNcIjogMTUsXG5cdFwiLi9fZXZlbnRzL2FkZGxpc3RlbmVyLmpzXCI6IDQxLFxuXHRcIi4vX2V2ZW50cy9kZWxlZ2F0ZWxpc3RlbmVyLmpzXCI6IDQzLFxuXHRcIi4vX2V2ZW50cy9yZW1vdmVsaXN0ZW5lci5qc1wiOiAzNCxcblx0XCIuL19ldmVudHMvdHJpZ2dlcm9uZS5qc1wiOiA4LFxuXHRcIi4vX2V2ZW50cy91bmRlbGVnYXRlbGlzdGVuZXIuanNcIjogMzMsXG5cdFwiLi9fdXRpbC9jaGVja29iamVjdHR5cGUuanNcIjogOSxcblx0XCIuL191dGlsL2RlYm91bmNlLmpzXCI6IDQyLFxuXHRcIi4vX3V0aWwvaXMuanNcIjogMTEsXG5cdFwiLi9fdXRpbC9tYXRyZXNoa2FlcnJvci5qc1wiOiAxMCxcblx0XCIuL191dGlsL3RvYXJyYXkuanNcIjogMTQsXG5cdFwiLi9hcnJheS5qc1wiOiA2OSxcblx0XCIuL2JpbmRlcnMvX2NsYXNzbGlzdC5qc1wiOiA3MCxcblx0XCIuL2JpbmRlcnMvYXR0ci5qc1wiOiA3MSxcblx0XCIuL2JpbmRlcnMvY2xhc3NuYW1lLmpzXCI6IDcyLFxuXHRcIi4vYmluZGVycy9kYXRhc2V0LmpzXCI6IDczLFxuXHRcIi4vYmluZGVycy9kaXNwbGF5LmpzXCI6IDc0LFxuXHRcIi4vYmluZGVycy9odG1sLmpzXCI6IDc1LFxuXHRcIi4vYmluZGVycy9pbmRleC5qc1wiOiA3Nixcblx0XCIuL2JpbmRlcnMvaW5wdXQuanNcIjogNzgsXG5cdFwiLi9iaW5kZXJzL291dHB1dC5qc1wiOiA4NCxcblx0XCIuL2JpbmRlcnMvcHJvZ3Jlc3MuanNcIjogODEsXG5cdFwiLi9iaW5kZXJzL3Byb3AuanNcIjogNzcsXG5cdFwiLi9iaW5kZXJzL3NlbGVjdC5qc1wiOiA4MCxcblx0XCIuL2JpbmRlcnMvc3R5bGUuanNcIjogODMsXG5cdFwiLi9iaW5kZXJzL3RleHQuanNcIjogODIsXG5cdFwiLi9iaW5kZXJzL3RleHRhcmVhLmpzXCI6IDc5LFxuXHRcIi4vYmluZG5vZGUuanNcIjogMyxcblx0XCIuL2JpbmRvcHRpb25hbG5vZGUuanNcIjogNDQsXG5cdFwiLi9iaW5kc2FuZGJveC5qc1wiOiA0NSxcblx0XCIuL2JxdWVyeS9fZGF0YS5qc1wiOiAyNSxcblx0XCIuL2JxdWVyeS9faHRtbDJub2RlbGlzdC5qc1wiOiAxOSxcblx0XCIuL2JxdWVyeS9faW5pdC5qc1wiOiAxOCxcblx0XCIuL2JxdWVyeS9hZGQuanNcIjogMjgsXG5cdFwiLi9icXVlcnkvY3JlYXRlLmpzXCI6IDIzLFxuXHRcIi4vYnF1ZXJ5L2ZpbmQuanNcIjogMzAsXG5cdFwiLi9icXVlcnkvaW5kZXguanNcIjogMTcsXG5cdFwiLi9icXVlcnkvaXMuanNcIjogMjYsXG5cdFwiLi9icXVlcnkvbm90LmpzXCI6IDI5LFxuXHRcIi4vYnF1ZXJ5L29mZi5qc1wiOiAyNyxcblx0XCIuL2JxdWVyeS9vbi5qc1wiOiAyNCxcblx0XCIuL2JxdWVyeS9vbmUuanNcIjogMjIsXG5cdFwiLi9icXVlcnkvcGFyc2VodG1sLmpzXCI6IDIxLFxuXHRcIi4vY2xhc3MuanNcIjogNjEsXG5cdFwiLi9leHRlbmQuanNcIjogMjAsXG5cdFwiLi9pbmRleC5qc1wiOiA4NSxcblx0XCIuL21hZ2ljLmpzXCI6IDg4LFxuXHRcIi4vbWF0cmVzaGthL2luZGV4LmpzXCI6IDg2LFxuXHRcIi4vb2JqZWN0L2luZGV4LmpzXCI6IDg3LFxuXHRcIi4vb24uanNcIjogODksXG5cdFwiLi9zZWxlY3QuanNcIjogNDYsXG5cdFwiLi9zZWxlY3RhbGwuanNcIjogNDcsXG5cdFwiLi9zZXQuanNcIjogNyxcblx0XCIuL3VuYmluZG5vZGUuanNcIjogMzJcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0cmV0dXJuIG1hcFtyZXFdIHx8IChmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIikgfSgpKTtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNjg7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjIC4qXFwuanMkXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IDE7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcnJheS5qc1xuICoqLyIsIi8vIEBJRTlcblxubGV0IGFkZDtcbmxldCByZW1vdmU7XG5sZXQgY29udGFpbnM7XG5cbmlmKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLmNsYXNzTGlzdCkge1xuICAgIGFkZCA9IChub2RlLCBuYW1lKSA9PiBub2RlLmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgcmVtb3ZlID0gKG5vZGUsIG5hbWUpID0+IG5vZGUuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICBjb250YWlucyA9IChub2RlLCBuYW1lKSA9PiBub2RlLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcbn0gZWxzZSB7XG4gICAgYWRkID0gKG5vZGUsIG5hbWUpID0+IHtcblx0XHRjb25zdCByZSA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIG5hbWUgKyBcIihcXFxcc3wkKVwiLCBcImdcIik7XG5cdFx0aWYgKCFyZS50ZXN0KG5vZGUuY2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSAobm9kZS5jbGFzc05hbWUgKyBcIiBcIiArIG5hbWUpLnJlcGxhY2UoL1xccysvZywgXCIgXCIpLnJlcGxhY2UoLyheIHwgJCkvZywgXCJcIik7XG4gICAgICAgIH1cblx0fVxuXG5cdHJlbW92ZSA9IChub2RlLCBuYW1lKSA9PiB7XG5cdFx0Y29uc3QgcmUgPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIgKyBjICsgXCIoXFxcXHN8JClcIiwgXCJnXCIpO1xuXHRcdG5vZGUuY2xhc3NOYW1lID0gbm9kZS5jbGFzc05hbWUucmVwbGFjZShyZSwgXCIkMVwiKS5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKS5yZXBsYWNlKC8oXiB8ICQpL2csIFwiXCIpO1xuXHR9XG5cblx0Y29udGFpbnMgPSAobm9kZSwgYykgPT4ge1xuXHRcdHJldHVybiBuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgbmFtZSArICcoXFxcXHN8JCknKS50ZXN0KG5vZGUuY2xhc3NOYW1lKTtcblx0fVxufVxuXG5jb25zdCB0b2dnbGUgPSAobm9kZSwgbmFtZSwgc3dpdGNoZXIpID0+IHtcbiAgICBpZihzd2l0Y2hlcikge1xuICAgICAgICBhZGQobm9kZSwgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlKG5vZGUsIG5hbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICB0b2dnbGUsXG4gICAgY29udGFpbnNcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvX2NsYXNzbGlzdC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGF0dHIoYXR0cmlidXRlTmFtZSkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiBudWxsLFxuXHRcdGdldFZhbHVlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0dGhpcy5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgdmFsdWUpO1xuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvYXR0ci5qc1xuICoqLyIsImltcG9ydCB7XG4gICAgdG9nZ2xlLFxuICAgIGNvbnRhaW5zXG59IGZyb20gJy4vX2NsYXNzbGlzdC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsYXNzTmFtZShjbGFzc05hbWUsIHN3aXRjaGVyPXRydWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbnRhaW5zKHRoaXMsIGNsYXNzTmFtZSk7XG5cdFx0XHRyZXR1cm4gc3dpdGNoZXIgPyB2YWx1ZSA6ICF2YWx1ZTtcblx0XHR9LFxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdG9nZ2xlKHRoaXMsIGNsYXNzTmFtZSwgc3dpdGNoZXIgPyAhIXZhbHVlIDogIXZhbHVlKVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvY2xhc3NuYW1lLmpzXG4gKiovIiwiLy8gcmVwbGFjZSBuYW1lc0xpa2VUaGlzIHdpdGggbmFtZXMtbGlrZS10aGlzXG5jb25zdCB0b0Rhc2hlZCA9IChuYW1lKSA9PiB7XG4gICAgcmV0dXJuICdkYXRhLScgKyBuYW1lLnJlcGxhY2UoLyhbQS1aXSkvZywgKHUpID0+IFwiLVwiICsgdS50b0xvd2VyQ2FzZSgpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGF0YXNldChwcm9wKSB7XG5cdHJldHVybiB7XG5cdFx0b246IG51bGwsXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRpZih0aGlzLmRhdGFzZXQpe1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldFtwcm9wXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRBdHRyaWJ1dGUodG9EYXNoZWQocHJvcCkpO1xuICAgICAgICAgICAgfVxuXHRcdH0sXG5cdFx0c2V0VmFsdWUodmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLmRhdGFzZXQpIHtcblx0XHRcdFx0dGhpcy5kYXRhc2V0W3Byb3BdID0gdmFsdWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnNldEF0dHJpYnV0ZSh0b0Rhc2hlZChwcm9wKSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvZGF0YXNldC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BsYXkoc3dpdGNoZXI9dHJ1ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcykuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpO1xuICAgICAgICAgICAgY29uc3Qgbm9uZSA9IHZhbHVlID09PSAnbm9uZSc7XG4gICAgICAgICAgICByZXR1cm4gc3dpdGNoZXIgPyAhbm9uZSA6IG5vbmU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCB7IHN0eWxlIH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYoc3dpdGNoZXIpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJ25vbmUnIDogJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvZGlzcGxheS5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh0bWwoKSB7XG5cdHJldHVybiB7XG5cdFx0b246ICdpbnB1dCcsIC8vIHRoZSBldmVudCBuYW1lIGZpcmVzIG9ubHkgaW4gY29udGVudGVkaXRhYmxlIG1vZGVcblx0XHRnZXRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0aGlzLmlubmVySFRNTDtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0aGlzLmlubmVySFRNTCA9IGAke3ZhbHVlfWA7XG5cdFx0fVxuXHR9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2h0bWwuanNcbiAqKi8iLCJpbXBvcnQgaHRtbCBmcm9tICcuL2h0bWwnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5JztcbmltcG9ydCBjbGFzc05hbWUgZnJvbSAnLi9jbGFzc25hbWUnO1xuaW1wb3J0IHByb3AgZnJvbSAnLi9wcm9wJztcbmltcG9ydCBhdHRyIGZyb20gJy4vYXR0cic7XG5pbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5pbXBvcnQgdGV4dGFyZWEgZnJvbSAnLi90ZXh0YXJlYSc7XG5pbXBvcnQgc2VsZWN0IGZyb20gJy4vc2VsZWN0JztcbmltcG9ydCBwcm9ncmVzcyBmcm9tICcuL3Byb2dyZXNzJztcbmltcG9ydCB0ZXh0IGZyb20gJy4vdGV4dCc7XG5pbXBvcnQgc3R5bGUgZnJvbSAnLi9zdHlsZSc7XG5pbXBvcnQgZGF0YXNldCBmcm9tICcuL2RhdGFzZXQnO1xuXG5leHBvcnQge1xuICAgIGh0bWwsXG4gICAgZGlzcGxheSxcbiAgICBjbGFzc05hbWUsXG4gICAgcHJvcCxcbiAgICBhdHRyLFxuICAgIGlucHV0LFxuICAgIHRleHRhcmVhLFxuICAgIHNlbGVjdCxcbiAgICBwcm9ncmVzcyxcbiAgICB0ZXh0LFxuICAgIHN0eWxlLFxuICAgIGRhdGFzZXRcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcChwcm9wZXJ0eU5hbWUpIHtcblx0cmV0dXJuIHtcblx0XHRvbjogbnVsbCxcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1twcm9wZXJ0eU5hbWVdO1xuXHRcdH0sXG5cdFx0c2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHQvLyBpbiBjYXNlIHdoZW4geW91J3JlIHRyeWluZyB0byBzZXQgcmVhZC1vbmx5IHByb3BlcnR5XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvcHJvcC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlucHV0KHR5cGUpIHtcbiAgICBsZXQgb247XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb246ICdjbGljayBrZXl1cCcsXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb246ICdjbGljayBrZXl1cCcsXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFZhbHVlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0eXBlb2YgdmFsdWUgIT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy52YWx1ZSA9PSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlICdzdWJtaXQnOlxuICAgICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICBjYXNlICdpbWFnZSc6XG4gICAgICAgIGNhc2UgJ3Jlc2V0JzpcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgY2FzZSAnaGlkZGVuJzpcbiAgICAgICAgICAgIG9uID0gbnVsbDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmaWxlJzpcbiAgICAgICAgICAgIG9uID0gJ2NoYW5nZSc7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgY2FzZSAncGFzc3dvcmQnOlxuICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICBjYXNlICdkYXRldGltZSc6XG4gICAgICAgICAgICBjYXNlICdkYXRldGltZS1sb2NhbCc6XG4gICAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgY2FzZSAncmFuZ2UnOlxuICAgICAgICAgICAgY2FzZSAnY29sb3InOlxuICAgICAgICAgICAgY2FzZSAnc2VhcmNoJzpcbiAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcbiAgICAgICAgICAgIGNhc2UgJ3RlbCc6XG4gICAgICAgICAgICBjYXNlICd1cmwnOlxuICAgICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOiAqL1xuICAgICAgICBkZWZhdWx0OiAvLyBvdGhlciBmdXR1cmUgKEhUTUw2KykgaW5wdXRzXG4gICAgICAgICAgICBvbiA9ICdpbnB1dCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG9uLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvaW5wdXQuanNcbiAqKi8iLCJpbXBvcnQgaW5wdXQgZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuXHRyZXR1cm4gaW5wdXQoJ3RleHQnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvdGV4dGFyZWEuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZWxlY3QobXVsdGlwbGUpIHtcbiAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uOiAnY2hhbmdlJyxcbiAgICAgICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgb3B0aW9ucyB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBvcHRpb25zLmxlbmd0aCA+IGk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uc1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbHVlKGdpdmVuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IG9wdGlvbnMgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgZ2l2ZW5WYWx1ZSA9PT0gJ3N0cmluZycgPyBbZ2l2ZW5WYWx1ZV0gOiBnaXZlblZhbHVlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBvcHRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNbaV0uc2VsZWN0ZWQgPSB+dmFsdWUuaW5kZXhPZihvcHRpb25zW2ldLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246ICdjaGFuZ2UnLFxuICAgICAgICBnZXRWYWx1ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBzZXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBvcHRpb25zIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBvcHRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc1tpXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1tpXS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3NlbGVjdC5qc1xuICoqLyIsImltcG9ydCBpbnB1dCBmcm9tICcuL2lucHV0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGV4dGFyZWEoKSB7XG5cdHJldHVybiBpbnB1dCgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvYmluZGVycy9wcm9ncmVzcy5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdG9uOiAnaW5wdXQnLCAvLyB0aGUgZXZlbnQgbmFtZSBmaXJlcyBvbmx5IGluIGNvbnRlbnRlZGl0YWJsZSBtb2RlXG5cdFx0Z2V0VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcblx0XHR9LFxuXHRcdHNldFZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0aGlzLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcblx0XHR9XG5cdH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9iaW5kZXJzL3RleHQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzdHlsZShwcm9wZXJ0eSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uOiBudWxsLFxuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWU6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvc3R5bGUuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvdXRwdXQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb246IG51bGwsXG4gICAgICAgIGdldFZhbHVlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgfHwgdGhpcy50ZXh0Q29udGVudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5ID0gJ2Zvcm0nIGluIHRoaXMgPyAndmFsdWUnIDogJ3RleHRDb250ZW50JztcbiAgICAgICAgICAgIHRoaXNbcHJvcGVydHldID0gdmFsdWUgPT09IG51bGwgPyAnJyA6IGAke3ZhbHVlfWA7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2JpbmRlcnMvb3V0cHV0LmpzXG4gKiovIiwiaW1wb3J0IE1hdHJlc2hrYSBmcm9tICcuL21hdHJlc2hrYSc7XG5pbXBvcnQgTWF0cmVzaGthQXJyYXkgZnJvbSAnLi9hcnJheSc7XG5pbXBvcnQgTWF0cmVzaGthT2JqZWN0IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBDbGFzcyBmcm9tICcuL2NsYXNzJztcbi8vaW1wb3J0IGJpbmRlcnMgZnJvbSAnLi9iaW5kZXJzJztcblxuTWF0cmVzaGthLkFycmF5ID0gTWF0cmVzaGthQXJyYXk7XG5NYXRyZXNoa2EuT2JqZWN0ID0gTWF0cmVzaGthT2JqZWN0O1xuTWF0cmVzaGthLkNsYXNzID0gQ2xhc3M7XG4vL01hdHJlc2hrYS5iaW5kZXJzID0gYmluZGVycztcblxuZXhwb3J0IGRlZmF1bHQgTWF0cmVzaGthO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgZXh0ZW5kIGZyb20gJy4uL2V4dGVuZCc7XG5pbXBvcnQgQ2xhc3MgZnJvbSAnLi4vY2xhc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBDbGFzcyh7XG4gICAgLy8gaW5zdGFuY2UgcHJvcGVyaWVzIGFuZCBtZXRob2RzXG5cbn0sIHtcbiAgICAvLyBzdGF0aWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xuICAgIGV4dGVuZFxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9tYXRyZXNoa2EvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCAxO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvb2JqZWN0L2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgMTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21hZ2ljLmpzXG4gKiovIiwiXG4vLyAvXigoW15AXSspQCk/KCguKz8pKDo6KFteXFwoXFwpXSspPyhcXCgoLiopXFwpKT8pPyk/JC9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb24oKSB7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL29uLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==