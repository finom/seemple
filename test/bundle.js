/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("/*const testsContext = require.context('./spec/', true, /.*\\.js$/);\ntestsContext.keys().forEach(testsContext);\nconst componentsContext = require.context('../src/', true, /.*index\\.js$/);\ncomponentsContext.keys().forEach(componentsContext);*/\n\n// jscs:disable\n// test/test_index.js\n\n// This gets replaced by karma webpack with the updated files on rebuild\nvar __karmaWebpackManifest__ = [];\n\n// require all modules ending in \"_test\" from the\n// current directory and all subdirectories\nvar testsContext = __webpack_require__(1);\n\nfunction inManifest(path) {\n  return __karmaWebpackManifest__.indexOf(path) >= 0;\n}\n\nvar runnable = testsContext.keys().filter(inManifest);\n\n// Run all tests if we didn't find any changes\nif (!runnable.length) {\n  runnable = testsContext.keys();\n}\n\nrunnable.forEach(testsContext);\n\n\nconst componentsContext = __webpack_require__(11);\ncomponentsContext.keys().forEach(componentsContext);\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./test/index.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./test/index.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("var map = {\n\t\"./class_spec.js\": 2,\n\t\"./events/events_core_spec.js\": 5\n};\nfunction webpackContext(req) {\n\treturn __webpack_require__(webpackContextResolve(req));\n};\nfunction webpackContextResolve(req) {\n\treturn map[req] || (function() { throw new Error(\"Cannot find module '\" + req + \"'.\") }());\n};\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = 1;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./test/spec .*\\.js$\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./test/spec_.*\\.js$?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Class = __webpack_require__(3);\n\ndescribe('Class function', function () {\n\tit('allows to inherit', function () {\n\t\tvar A = Class({ a: true }),\n\t\t    B = Class({ b: true, extends: A }),\n\t\t    C = Class({ c: true, extends: B }),\n\t\t    inst = new C();\n\n\t\texpect(inst instanceof A).toBeTruthy();\n\t\texpect(inst instanceof B).toBeTruthy();\n\t\texpect(inst instanceof C).toBeTruthy();\n\n\t\texpect(inst.a).toBeTruthy();\n\t\texpect(inst.b).toBeTruthy();\n\t\texpect(inst.c).toBeTruthy();\n\t});\n\n\tit('allows to pass static props', function () {\n\t\tvar A = Class({}, { staticProp: true });\n\t\texpect(A.staticProp).toBeTruthy();\n\t});\n\n\tit('if new Class({}) is called return its instance', function () {\n\t\tvar inst = new Class({ a: true });\n\t\texpect(inst.a).toBeTruthy();\n\t\texpect(inst instanceof Class).toBeFalsy();\n\t});\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ./test/spec/class_spec.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./test/spec/class_spec.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("var extend = __webpack_require__(4);\n\nmodule.exports = Class;\nfunction Class(prototype, staticProps) {\n\tvar Constructor = prototype.constructor !== Object ? prototype.constructor : function EmptyConstructor() {},\n\n\t//extends is kept for backward compatibility\n\tParent = prototype.extends || prototype.extend,\n\n\t//inherit proto from class parent or empty object\n\tproto = Object.create(Parent ? Parent.prototype : {});\n\n\textend(proto, prototype);\n\n\tif (typeof staticProps === 'object') {\n\t\textend(Constructor, staticProps);\n\t}\n\n\t// for backward compatibility\n\tproto.instanceOf = function instanceOf() {\n\t\treturn this instanceof Constructor;\n\t};\n\n\tConstructor.prototype = proto;\n\n\t// if new Class({}) is called return its instance\n\tif (this instanceof Class) {\n\t\treturn new Constructor();\n\t} else {\n\t\treturn Constructor;\n\t}\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/class.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/class.js?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("// Object.assign polyfyll is taken there:\n// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill\n// and will be removed in future\n\nvar assign = Object.assign || function assign(target) {\n\t/* istanbul ignore next */\n\tif (target === undefined || target === null) {\n\t\tthrow new TypeError('Cannot convert undefined or null to object');\n\t}\n\n\tvar output = Object(target);\n\tfor (var index = 1; index < arguments.length; index++) {\n\t\tvar source = arguments[index];\n\t\tif (source !== undefined && source !== null) {\n\t\t\tfor (var nextKey in source) {\n\t\t\t\tif (source.hasOwnProperty(nextKey)) {\n\t\t\t\t\toutput[nextKey] = source[nextKey];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn output;\n};\n\nmodule.exports = assign;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/extend.js\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/extend.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("var addListener = __webpack_require__(6);\n\nvar removeListener = __webpack_require__(10);\n\nvar triggerOne = __webpack_require__(9);\n\ndescribe(\"Events core: addListener, removeListener, triggerOne\", function () {\n\tvar obj = void 0,\n\t    ctx = void 0,\n\t    bool = void 0,\n\t    handler = void 0;\n\n\tbeforeEach(function () {\n\t\tobj = {};\n\t\tctx = {};\n\t\tbool = false;\n\t\thandler = function (evt) {\n\t\t\treturn bool = true;\n\t\t};\n\t});\n\n\tit('fires', function () {\n\t\taddListener(obj, 'someevent', handler);\n\t\ttriggerOne(obj, 'someevent');\n\t\texpect(bool).toBe(true);\n\t});\n\n\tit('avoids conflicts', function () {\n\t\tvar i = 0;\n\t\taddListener(obj, 'someevent', function (evt) {\n\t\t\treturn i += 1e0;\n\t\t});\n\t\taddListener(obj, 'someevent', function (evt) {\n\t\t\treturn i += 1e1;\n\t\t});\n\t\taddListener(obj, 'someevent', function (evt) {\n\t\t\treturn i += 1e2;\n\t\t});\n\t\ttriggerOne(obj, 'someevent');\n\n\t\texpect(i).toEqual(111);\n\t});\n\n\tit('removes (no args)', function () {\n\t\taddListener(obj, 'someevent', handler);\n\t\tremoveListener(obj);\n\t\ttriggerOne(obj, 'someevent');\n\n\t\texpect(bool).toBe(false);\n\t});\n\n\tit('removes by name', function () {\n\t\taddListener(obj, 'someevent', handler);\n\t\tremoveListener(obj, 'someevent');\n\t\ttriggerOne(obj, 'someevent');\n\n\t\texpect(bool).toBe(false);\n\t});\n\n\tit('removes by callback', function () {\n\t\taddListener(obj, 'someevent', handler);\n\t\tremoveListener(obj, 'someevent', handler);\n\t\ttriggerOne(obj, 'someevent');\n\n\t\texpect(bool).toBe(false);\n\t});\n\n\tit('removes by callback but keeps when callbacks are not same', function () {\n\t\taddListener(obj, 'someevent', handler);\n\t\tremoveListener(obj, 'someevent', function () {});\n\t\ttriggerOne(obj, 'someevent');\n\n\t\texpect(bool).toBe(true);\n\t});\n\n\tit('removes by callback and context', function () {\n\t\taddListener(obj, 'someevent', handler, ctx);\n\t\tremoveListener(obj, 'someevent', handler, ctx);\n\t\ttriggerOne(obj, 'someevent');\n\n\t\texpect(bool).toBe(false);\n\t});\n\n\tit('removes by callback but keeps when contexts are not same', function () {\n\t\taddListener(obj, 'someevent', handler, ctx);\n\t\tremoveListener(obj, 'someevent', handler, {});\n\t\ttriggerOne(obj, 'someevent');\n\n\t\texpect(bool).toBe(true);\n\t});\n\n\txit('removes by howToRemove (not documented core feature)', function () {\n\t\tvar obj = {},\n\t\t    bool = false,\n\t\t    f = function (evt) {\n\t\t\treturn bool = true;\n\t\t},\n\t\t    onData = {\n\t\t\thowToRemove: function (onData, offData) {\n\t\t\t\treturn offData.x === 42;\n\t\t\t}\n\t\t};\n\n\t\tmagic._addListener(obj, 'someevent1', f, null, onData);\n\t\tmagic._removeListener(obj, 'someevent1', null, null, {\n\t\t\tx: 42\n\t\t});\n\n\t\tmagic.trigger(obj, 'someevent1');\n\n\t\texpect(bool).toBe(false);\n\n\t\tmagic._addListener(obj, 'someevent2', f, null, onData);\n\t\tmagic._removeListener(obj, 'someevent2', null, null, {\n\t\t\tx: 43\n\t\t});\n\n\t\tmagic.trigger(obj, 'someevent2');\n\n\t\texpect(bool).toBe(true);\n\t});\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ./test/spec/events/events_core_spec.js\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./test/spec/events/events_core_spec.js?");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("var initMK = __webpack_require__(7);\n\nvar triggerOne = __webpack_require__(9);\n\nmodule.exports = addListener;\nfunction addListener(object, name, callback, context, info) {\n\tvar x = initMK(object);\n\tvar allEvents = x.events;\n\tvar ctx = context || object;\n\tvar events = allEvents[name];\n\tvar evt = {\n\t\tcallback: callback,\n\t\tcontext: context,\n\t\tctx: ctx,\n\t\tname: name\n\t};\n\n\t// if there are events with the same name\n\tif (events) {\n\t\t// if there are events with the same data, return false\n\t\tfor (var i = 0; i < events.length; i++) {\n\t\t\tvar _evt = events[i];\n\t\t\tif ((_evt.callback == callback || _evt.callback == callback._callback) && _evt.context == context) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\t// if the event isn't found add it to the event list\n\t\tevents.push(evt);\n\t} else {\n\t\t// if there are no events with the same name, create array with only ebent\n\t\tallEvents[name] = [evt];\n\t}\n\n\tif (!info || !info.noTrigger) {\n\t\ttriggerOne(object, 'addevent:' + name, evt);\n\t\ttriggerOne(object, 'addevent', evt);\n\t}\n\n\t// if event is added return true\n\treturn true;\n}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/_events/addlistener.js\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/_events/addlistener.js?");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("var defs = __webpack_require__(8);\n\n// This is common function which associates an object with its definition\nfunction commonInit(object) {\n\tvar def = defs.get(object);\n\tif (!def) {\n\t\tdef = {\n\t\t\t// A property name of \"events\" object is an event name\n\t\t\t// and a value is an array of event handlers\n\t\t\tevents: {},\n\t\t\t// \"props\" contains special information about\n\t\t\tprops: {\n\t\t\t\t/*vasia: {\n    \t//nodes: core.$(),\n    \tvalue: object[key],\n    \tgetter: null,\n    \tsetter: null,\n    \tmediator: null,\n    \t//destroyers: Map,\n    \tbindings: [{\n    \t\tnode,\n    \t\tbinder,\n    \t\tnodeHandler,\n    \t\tobjectHandler\n    \t}]\n    }*/\n\t\t\t},\n\t\t\tid: 'mk' + Math.random()\n\t\t};\n\n\t\tdefs.set(object, def);\n\t}\n\n\treturn def;\n};\n\nmodule.exports = initMK;\nfunction initMK(object) {\n\tvar type = typeof object;\n\tif (!object || type != 'object') {\n\t\tthrow new TypeError(type + ' cannot be used in this method');\n\t};\n\n\treturn object._initMK ? object._initMK() : commonInit(object);\n};\n\n/*define([\n\t'matreshka_dir/core/var/core',\n\t'matreshka_dir/core/var/map'\n], function(core, map) {\n\t\"use strict\";\n\n\tvar initMK = core.initMK = function(object) {\n\t\tif (!map.has(object)) {\n\t\t\tmap.set(object, {\n\t\t\t\tevents: {},\n\t\t\t\tspecial: {},\n\t\t\t\tid: 'mk' + Math.random()\n\t\t\t});\n\t\t}\n\n\t\treturn object;\n\t};\n\n\treturn function(object) {\n\t\tobject._initMK ? object._initMK() : initMK(object);\n\t\treturn object;\n\t};\n});*/\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/_core/init.js\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/_core/init.js?");

/***/ },
/* 8 */
/***/ function(module, exports) {

	eval("function PseudoMap() {}\n\nvar _result = PseudoMap.prototype;\n\nfor (var _source2 = {\n\tget: function (obj) {\n\t\treturn obj.matreshkaData;\n\t},\n\tset: function (obj, data) {\n\t\tObject.defineProperty(obj, 'matreshkaData', {\n\t\t\tvalue: data,\n\t\t\tenumerable: false,\n\t\t\twritable: false,\n\t\t\tconfigurable: false\n\t\t});\n\t},\n\thas: function (obj) {\n\t\treturn ('matreshkaData' in obj);\n\t}\n}, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {\n\t_key2 = _keys2[_i2];\n\t_result[_key2] = _source2[_key2];\n}\n\nmodule.exports = typeof WeakMap === 'undefined' ? new PseudoMap() : new WeakMap();\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/_core/defs.js\n ** module id = 8\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/_core/defs.js?");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("var defs = __webpack_require__(8);\n\nmodule.exports = triggerOne;\nfunction triggerOne(object, name) {\n\tvar def = defs.get(object);\n\n\tif (!def) return;\n\n\tvar events = def.events[name];;\n\n\tif (events) {\n\t\tvar _source = arguments,\n\t\t    _l = _source.length,\n\t\t    _i = 2 || 0,\n\t\t    _end = null || _l,\n\t\t    _j = 0,\n\t\t    _result = Array(_end - _i);\n\n\t\twhile (_i < _end) {\n\t\t\t_result[_j++] = _source[_i++];\n\t\t}\n\n\t\tvar args = _result;\n\t\tvar l = events.length;\n\t\tvar a1 = args[0];\n\t\tvar a2 = args[1];\n\t\tvar a3 = args[2];\n\n\n\t\tvar i = 0,\n\t\t    ev = void 0;\n\n\t\tswitch (args.length) {\n\t\t\tcase 0:\n\t\t\t\twhile (i < l) {\n\t\t\t\t\t(ev = events[i++]).callback.call(ev.ctx);\n\t\t\t\t}return;\n\t\t\tcase 1:\n\t\t\t\twhile (i < l) {\n\t\t\t\t\t(ev = events[i++]).callback.call(ev.ctx, a1);\n\t\t\t\t}return;\n\t\t\tcase 2:\n\t\t\t\twhile (i < l) {\n\t\t\t\t\t(ev = events[i++]).callback.call(ev.ctx, a1, a2);\n\t\t\t\t}return;\n\t\t\tcase 3:\n\t\t\t\twhile (i < l) {\n\t\t\t\t\t(ev = events[i++]).callback.call(ev.ctx, a1, a2, a3);\n\t\t\t\t}return;\n\t\t\tdefault:\n\t\t\t\twhile (i < l) {\n\t\t\t\t\t(ev = events[i++]).callback.apply(ev.ctx, args);\n\t\t\t\t}return;\n\t\t}\n\t}\n};\n\n/*define([\n\t'matreshka_dir/core/var/core',\n\t'matreshka_dir/core/var/map',\n\t'matreshka_dir/core/util/common',\n\t'matreshka_dir/core/var/domevtreg'\n], function(core, map, utils, domEvtReg) {\n\t\"use strict\";\n\n\tvar triggerDOMEvent = function(el, name, args) {\n\t\tvar doc = document,\n\t\t\tevent;\n\n\t\tif(doc.createEvent) {\n\t\t\tevent = doc.createEvent('Event');\n\t\t\tevent.initEvent(name, true, true);\n\t\t\tevent.mkArgs = args;\n\t\t\tel.dispatchEvent(event);\n\t\t} else if(typeof Event != 'undefined') {\n\t\t\tevent = new Event(name, {\n\t\t\t\tbubbles: true,\n    \t\t\tcancelable: true\n\t\t\t});\n\t\t\tevent.mkArgs = args;\n\t\t\tel.dispatchEvent(event);\n\t\t} else {\n\t\t\tthrow Error('Cannot trigger DOM event');\n\t\t}\n\n\t\treturn event;\n\t};\n\n\tcore.trigger = function(object, names) {\n\t\tif (!object || typeof object != 'object') return object;\n\n\t\tvar objectData = map.get(object),\n\t\t\tallEvents = objectData && objectData.events,\n\t\t\targs,\n\t\t\ti,\n\t\t\tj,\n\t\t\tl,\n\t\t\tevents,\n\t\t\tev,\n\t\t\tname,\n\t\t\texecuted,\n\t\t\tnodes,\n\t\t\t_nodes,\n\t\t\tselector;\n\n\n\n\t\tif (names && allEvents) {\n\t\t\targs = utils.toArray(arguments, 2);\n\t\t\tnames = names.split(/\\s/);\n\n\t\t\tfor (i = 0; i < names.length; i++) {\n\t\t\t\tname = names[i];\n\t\t\t\tif(~name.indexOf('::')) {\n\t\t\t\t\texecuted = domEvtReg.exec(name);\n\t\t\t\t\tnodes = objectData.special[executed[3] || 'sandbox'];\n\t\t\t\t\tnodes = nodes && nodes.$nodes;\n\t\t\t\t\t_nodes = core.$();\n\t\t\t\t\tselector = executed[5];\n\t\t\t\t\tif(selector) {\n\t\t\t\t\t\tfor(j = 0; j < nodes.length; j++) {\n\t\t\t\t\t\t\t_nodes = _nodes.add(nodes.find(selector));\n\t\t\t\t\t\t}\n\t\t\t\t\t} else {\n\t\t\t\t\t\t_nodes = nodes;\n\t\t\t\t\t}\n\n\t\t\t\t\tfor(j = 0; j < _nodes.length; j++) {\n\t\t\t\t\t\ttriggerDOMEvent(_nodes[i], executed[1], args);\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tevents = allEvents[name];\n\t\t\t\t\tif (events) {\n\t\t\t\t\t\tj = -1, l = events.length;\n\t\t\t\t\t\twhile (++j < l)(ev = events[j]).callback.apply(ev.ctx, args);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn object;\n\t};\n\n\n\tcore._fastTrigger = function(object, name, evt) {\n\t\tvar events = map.get(object).events[name],\n\t\t\ti, l, ev;\n\n\t\tif (events) {\n\t\t\ti = -1, l = events.length;\n\t\t\twhile (++i < l)(ev = events[i]).callback.call(ev.ctx, evt);\n\t\t}\n\t};\n});\n*/\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/_events/triggerone.js\n ** module id = 9\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/_events/triggerone.js?");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	eval("var defs = __webpack_require__(8);\n\nvar triggerOne = __webpack_require__(9);\n\nmodule.exports = removeListener;\nfunction removeListener(object, name, callback, context, info) {\n\tvar def = defs.get(object);\n\n\t// if no definition do nothing\n\tif (!def) return;\n\n\tvar allEvents = def.events;\n\tvar events = allEvents[name];\n\tretain = [];\n\n\t// if all events need to be removed\n\tif (typeof name == 'undefined') {\n\t\tif (!info || !info.noTrigger) {\n\t\t\tfor (var _target2 = allEvents, _keys = Object.keys(_target2), _i = 0, name, events, _l2 = _keys.length; (name = _keys[_i], events = _target2[name]), _i < _l2; _i++) {\n\t\t\t\tfor (var _target = events, _index = 0, evt, _l = _target.length; evt = _target[_index], _index < _l; _index++) {\n\t\t\t\t\tvar removeEvtData = {\n\t\t\t\t\t\tname: name,\n\t\t\t\t\t\tcallback: evt.callback,\n\t\t\t\t\t\tcontext: evt.context\n\t\t\t\t\t};\n\n\t\t\t\t\ttriggerOne(object, 'removeevent:' + name, removeEvtData);\n\t\t\t\t\ttriggerOne(object, 'removeevent', removeEvtData);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t// restore default value of events\n\t\tdef.events = {};\n\t} else if (events) {\n\t\tfor (var _target3 = events, _index2 = 0, evt, _l3 = _target3.length; evt = _target3[_index2], _index2 < _l3; _index2++) {\n\t\t\tif (callback && callback !== evt.callback && callback._callback !== evt.callback || context && context !== evt.context) {\n\t\t\t\t// keep event\n\t\t\t\tretain.push(evt);\n\t\t\t} else {\n\t\t\t\tvar _removeEvtData = {\n\t\t\t\t\tname: name,\n\t\t\t\t\tcallback: evt.callback,\n\t\t\t\t\tcontext: evt.context\n\t\t\t\t};\n\n\t\t\t\tif (!info || !info.noTrigger) {\n\t\t\t\t\ttriggerOne(object, 'removeevent:' + name, _removeEvtData);\n\t\t\t\t\ttriggerOne(object, 'removeevent', _removeEvtData);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif (retain.length) {\n\t\t\tallEvents[name] = retain;\n\t\t} else {\n\t\t\tdelete def.events[name];\n\t\t}\n\t}\n\n\treturn;\n}\n\n/*define([\n\t'matreshka_dir/core/var/core',\n\t'matreshka_dir/core/var/map'\n], function(core, map) {\n\t\"use strict\";\n\n\tvar domEvtNameRegExp = /([^\\:\\:]+)(::([^\\(\\)]+)(\\((.*)\\))?)?/;\n\n\tcore._removeListener = function(object, name, callback, context, evtData) {\n\t\tif (!object || typeof object != 'object') return object;\n\n\t\tvar objectData = map.get(object),\n\t\t\tj = 0,\n\t\t\tl,\n\t\t\tevents,\n\t\t\tretain,\n\t\t\tevt,\n\t\t\ti,\n\t\t\texecuted,\n\t\t\thowToRemove,\n\t\t\tremoveEvtData;\n\n\t\tif(!objectData) return object;\n\n\t\tevents = objectData.events[name] || [];\n\t\tretain = objectData.events[name] = [];\n\t\tl = events.length;\n\n\t\tevtData = evtData || {};\n\n\t\texecuted = domEvtNameRegExp.exec(name);\n\n\t\tif (executed && executed[2]) {\n\t\t\tcore._removeDOMListener(object, executed[3], executed[1], executed[5], callback, context);\n\t\t} else {\n\t\t\tfor (i = 0; i < l; i++) {\n\t\t\t\tevt = events[i];\n\t\t\t\thowToRemove  = evt.howToRemove || evtData.howToRemove;\n\n\t\t\t\tif (howToRemove ? !howToRemove(evt, evtData) : (callback && (callback !== evt.callback && callback._callback !== evt.callback)) || (context && context !== evt.context)) {\n\t\t\t\t\tretain[j++] = evt;\n\t\t\t\t} else {\n\t\t\t\t\tremoveEvtData = {\n\t\t\t\t\t\tname: name,\n\t\t\t\t\t\tcallback: evt.callback,\n\t\t\t\t\t\tcontext: evt.context\n\t\t\t\t\t};\n\n\t\t\t\t\tcore._fastTrigger(object, 'removeevent:' + name, removeEvtData);\n\t\t\t\t\tcore._fastTrigger(object, 'removeevent', removeEvtData);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif (!retain.length) {\n\t\t\t\tdelete objectData.events[name];\n\t\t\t}\n\t\t}\n\n\n\n\n\t\treturn object;\n\t};\n});*/\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/_events/removelistener.js\n ** module id = 10\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/_events/removelistener.js?");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	eval("var map = {\n\t\"./_core/defs.js\": 8,\n\t\"./_core/init.js\": 7,\n\t\"./_events/addlistener.js\": 6,\n\t\"./_events/delegatelistener.js\": 12,\n\t\"./_events/removelistener.js\": 10,\n\t\"./_events/triggerone.js\": 9,\n\t\"./array.js\": 13,\n\t\"./binders.js\": 14,\n\t\"./class.js\": 3,\n\t\"./extend.js\": 4,\n\t\"./index.js\": 15,\n\t\"./matreshka.js\": 16,\n\t\"./object.js\": 17,\n\t\"./on.js\": 18\n};\nfunction webpackContext(req) {\n\treturn __webpack_require__(webpackContextResolve(req));\n};\nfunction webpackContextResolve(req) {\n\treturn map[req] || (function() { throw new Error(\"Cannot find module '\" + req + \"'.\") }());\n};\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = 11;\n\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src .*\\.js$\n ** module id = 11\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src_.*\\.js$?");

/***/ },
/* 12 */
/***/ function(module, exports) {

	eval("\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/_events/delegatelistener.js\n ** module id = 12\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/_events/delegatelistener.js?");

/***/ },
/* 13 */
/***/ function(module, exports) {

	eval("\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/array.js\n ** module id = 13\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/array.js?");

/***/ },
/* 14 */
/***/ function(module, exports) {

	eval("\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/binders.js\n ** module id = 14\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/binders.js?");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	eval("var Matreshka = __webpack_require__(16);\n\nvar MatreshkaArray = __webpack_require__(13);\n\nvar MatreshkaObject = __webpack_require__(17);\n\nvar Class = __webpack_require__(3);\n\nvar binders = __webpack_require__(14);\n\nMatreshka.Array = MatreshkaArray;\nMatreshka.Object = MatreshkaObject;\nMatreshka.Class = Class;\nMatreshka.binders = binders;\n\nmodule.exports = Matreshka;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/index.js\n ** module id = 15\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/index.js?");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	eval("var extend = __webpack_require__(4);\n\nvar Class = __webpack_require__(3);\n\nmodule.exports = Class({\n\t// instance properies and methods\n\n}, {\n\t// static properties and methods\n\textend: extend\n});\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/matreshka.js\n ** module id = 16\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/matreshka.js?");

/***/ },
/* 17 */
/***/ function(module, exports) {

	eval("\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/object.js\n ** module id = 17\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/object.js?");

/***/ },
/* 18 */
/***/ function(module, exports) {

	eval("module.exports = on;\nfunction on() {}\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/on.js\n ** module id = 18\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/on.js?");

/***/ }
/******/ ]);