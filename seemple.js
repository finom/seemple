/*
    --------------------------------------------------------------
    Seemple.js v2.4.18 (Mon, 20 Jan 2020 22:29:48 GMT)
    JavaScript Framework by Andrey Gubanov http://github.com/finom
    Released under the MIT license
    More info: https://seemple.io
    --------------------------------------------------------------
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Seemple"] = factory();
	else
		root["Seemple"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return forEach; });
function forEach(arr, callback) {
  var i = 0;
  var l = arr.length;

  for (; i < l; i++) {
    callback(arr[i], i);
  }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return triggerOne; });
/* harmony import */ var _core_defs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _helpers_apply__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);

 // triggers one event

function triggerOne(object, name, triggerArgs) {
  var def = _core_defs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(object);
  var events = def && def.events[name];

  if (events) {
    var l = events.length;
    var i = 0; // allow to pass both array of args and single arg as triggerArgs

    if (triggerArgs instanceof Array) {
      while (i < l) {
        var event = triggerOne.latestEvent = events[i];
        var callback = event.callback,
            ctx = event.ctx;
        Object(_helpers_apply__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(callback, ctx, triggerArgs);
        i += 1;
      }
    } else {
      while (i < l) {
        var _event = triggerOne.latestEvent = events[i];

        var _callback = _event.callback,
            _ctx = _event.ctx;

        _callback.call(_ctx, triggerArgs);

        i += 1;
      }
    }
  }
} // latestEvent is used as required hack in somemethods

triggerOne.latestEvent = {
  info: {},
  name: null
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _helpers_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


function PseudoMap() {} // PseudoMap simulates WeakMap behavior with O(1) search complexity
// it's needed to support @IE9 and @IE10


Object(_helpers_assign__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(PseudoMap.prototype, {
  get: function get(obj) {
    return obj.seempleData;
  },
  set: function set(obj, data) {
    Object.defineProperty(obj, 'seempleData', {
      value: data,
      enumerable: false,
      writable: false,
      configurable: false
    });
  },
  has: function has(obj) {
    return 'seempleData' in obj;
  }
});
/* harmony default export */ __webpack_exports__["a"] = (typeof WeakMap === 'undefined' ? new PseudoMap() : new WeakMap());

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return seempleError; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);


/* eslint-disable prefer-template, max-len */
var bindingErrorPrefix = 'Binding error:';
var calcErrorPrefix = 'Calc error:';
var eventsErrorPrefix = 'Events error:';
var arrayErrorPrefix = 'Seemple.Array error:';

var getType = function getType(variable) {
  if (variable === null) {
    return 'null';
  }

  return _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(variable);
};

var getTypeError = function getTypeError(variable, variableName, expectedType) {
  return "".concat(variableName, " must have type \"").concat(expectedType, "\" but got \"").concat(getType(variable), "\" instead.");
};

var errors = {
  'common:object_type': function commonObject_type(_ref) {
    var object = _ref.object,
        method = _ref.method;
    return "Error in ".concat(method, ": ") + getTypeError(object, 'object', 'object');
  },
  'common:call_class': function commonCall_class() {
    return 'Cannot call a class as a function';
  },
  'common:use_magic_props': function commonUse_magic_props() {
    return '"sandbox" key (for all objects) and "container" key (for Seemple.Array instances)' + ' are reserved for service use and cannot be used as usual properties';
  },
  'binding:node_missing': function bindingNode_missing(_ref2) {
    var key = _ref2.key,
        node = _ref2.node;
    var selectorInfo = typeof node === 'string' ? " (given selector is \"".concat(node, "\")") : '';
    return "".concat(bindingErrorPrefix, " node is missing for key \"").concat(key, "\"").concat(selectorInfo, ".");
  },
  'binding:falsy_key': function bindingFalsy_key() {
    return "".concat(bindingErrorPrefix, " \"key\" arg cannot be falsy");
  },
  'binding:instance_nodes_missing': function bindingInstance_nodes_missing(_ref3) {
    var $nodes = _ref3.$nodes;
    var missing = !$nodes ? '$nodes' : 'nodes';
    return "".concat(bindingErrorPrefix, " \"").concat(missing, "\" property of Seemple instance is missing.") + ' It must be an object and must not be reassigned.';
  },
  'binding:magic_props_nodes_length': function bindingMagic_props_nodes_length() {
    return "".concat(bindingErrorPrefix, " \"sandbox\" key (for all objects) and \"container\" key") + ' (for Seemple.Array instances) cannot have more than one bound node';
  },
  'calc:target_type': function calcTarget_type(_ref4) {
    var target = _ref4.target;
    return "".concat(calcErrorPrefix, " ").concat(getTypeError(target, 'target key', 'string'));
  },
  'calc:source_key_type': function calcSource_key_type(_ref5) {
    var sourceKey = _ref5.sourceKey;
    return "".concat(calcErrorPrefix, " ").concat(getTypeError(sourceKey, 'source key', 'string'));
  },
  'calc:source_object_type': function calcSource_object_type(_ref6) {
    var sourceObject = _ref6.sourceObject;
    return "".concat(calcErrorPrefix, " ").concat(getTypeError(sourceObject, 'source object', 'object'));
  },
  'calc:source_type': function calcSource_type(_ref7) {
    var source = _ref7.source;
    return "".concat(calcErrorPrefix, " ").concat(getTypeError(source, 'source', 'object'));
  },
  'array:model_type': function arrayModel_type(_ref8) {
    var Model = _ref8.Model;
    return "".concat(arrayErrorPrefix, " ").concat(getTypeError(Model, 'Model', 'function'));
  },
  'array:add_render_twice': function arrayAdd_render_twice() {
    return "".concat(arrayErrorPrefix, " one rendered object was inserted twice.");
  },
  'array:rendered_number_nodes': function arrayRendered_number_nodes(_ref9) {
    var length = _ref9.length;
    return "".concat(arrayErrorPrefix, " renderer returned ").concat(length, " nodes instead of one.") + " ".concat(length > 0 ? 'To fix this wrap these nodes by single node.' : '');
  },
  'array:renderer_node_missing': function arrayRenderer_node_missing(_ref10) {
    var selector = _ref10.selector;
    return "".concat(arrayErrorPrefix, " renderer node is missing (given selector is \"").concat(selector, "\")");
  },
  'array:nonexistent_method': function arrayNonexistent_method(_ref11) {
    var method = _ref11.method;
    return "".concat(arrayErrorPrefix, " Array.prototype.").concat(method, " doesn't exist.") + ' You need to include a polyfill for it (e. g. babel-node)';
  },
  'array:method_compat_renderer': function arrayMethod_compat_renderer(_ref12) {
    var method = _ref12.method;
    return "".concat(arrayErrorPrefix, " Not possible to render when ").concat(method, " method is called");
  },
  'pull:to_remove_type': function pullTo_remove_type(_ref13) {
    var toRemove = _ref13.toRemove;
    return "Error in pull: ".concat(getTypeError(toRemove, 'toRemove', 'number'));
  },
  'restore:no_nodes': function restoreNo_nodes() {
    return "".concat(arrayErrorPrefix, " cannot find any container to restore an instance using \"restore\" method");
  },
  'trigger:names_type': function triggerNames_type(_ref14) {
    var names = _ref14.names;
    return "".concat(eventsErrorPrefix, " ").concat(getTypeError(names, 'event name', 'string'));
  },
  'on:names_type': function onNames_type(_ref15) {
    var names = _ref15.names;
    return errors['trigger:names_type']({
      names: names
    });
  },
  'removedatakeys:key_type': function removedatakeysKey_type(_ref16) {
    var key = _ref16.key;
    return "Error in removeDataKeys: ".concat(getTypeError(key, 'key', 'string'));
  },
  'adddatakeys:key_type': function adddatakeysKey_type(_ref17) {
    var key = _ref17.key;
    return "Error in addDataKeys: ".concat(getTypeError(key, 'key', 'string'));
  },
  'remove:key_type': function removeKey_type(_ref18) {
    var key = _ref18.key;
    return "Error in remove: ".concat(getTypeError(key, 'key', 'string'));
  },
  'mediate:key_type': function mediateKey_type(_ref19) {
    var key = _ref19.key;
    return "Error in mediate: ".concat(getTypeError(key, 'key', 'string'));
  }
};
function seempleError(key, data) {
  var getError = errors[key];

  if (!getError) {
    throw Error("Unknown error \"".concat(key, "\". Please report about this on Github."));
  }

  return new Error(getError(data));
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return forOwn; });
function forOwn(obj, callback) {
  var keys = Object.keys(obj);
  var l = keys.length;
  var i = 0;
  var key;

  while (i < l) {
    key = keys[i];
    i += 1;
    callback(obj[key], key);
  }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return initSeemple; });
/* harmony import */ var _defs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

var objectId = 0; // this is common function which associates an object with its Seemple definition

function initSeemple(object) {
  var def = _defs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(object);

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
                    info: { ...extra data for an event... }
                } */
      },
      // "props" contains special information about properties (getters, setters etc)
      props: {
        /* example: {
                    value: object[key],
                    mediator: null,
                    bindings: [{
                        node,
                        binder,
                        nodeHandler,
                        objectHandler,
                        ...other required info
                    }]
                } */
      },
      id: objectId
    };
    objectId += 1;
    _defs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].set(object, def);

    if (object._afterInit) {
      object._afterInit(def);
    }
  }

  return def;
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _forown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
 // Object.assign polyfyll

/* istanbul ignore next */

var assign = Object.assign || function assign(target) {
  /* istanbul ignore next */
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index];

    if (source !== undefined && source !== null) {
      Object(_forown__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(source, function (nextValue, nextKey) {
        output[nextKey] = nextValue;
      });
    }
  }

  return output;
};

/* harmony default export */ __webpack_exports__["a"] = (assign);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkObjectType; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _seempleerror__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);

 // checks type of a variable and throws an error if its type is not an object

function checkObjectType(object, method) {
  var typeofObject = object === null ? 'null' : _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(object);

  if (typeofObject !== 'object' && typeofObject !== 'function') {
    throw Object(_seempleerror__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])('common:object_type', {
      object: object,
      method: method
    });
  }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apply; });
function apply(func, context, args) {
  if (context) {
    switch (args.length) {
      case 0:
        return func.call(context);

      case 1:
        return func.call(context, args[0]);

      case 2:
        return func.call(context, args[0], args[1]);

      case 3:
        return func.call(context, args[0], args[1], args[2]);

      case 4:
        return func.call(context, args[0], args[1], args[2], args[3]);

      default:
        return func.apply(context, args);
      // eslint-disable-line prefer-spread
    }
  }

  switch (args.length) {
    case 0:
      return func();

    case 1:
      return func(args[0]);

    case 2:
      return func(args[0], args[1]);

    case 3:
      return func(args[0], args[1], args[2]);

    case 4:
      return func(args[0], args[1], args[2], args[3]);

    default:
      return func.apply(undefined, args);
    // eslint-disable-line prefer-spread
  }
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addListener; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _core_defineprop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _domeventregexp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(30);




 // property modifier event regexp

var propModEventReg = /^_change:deps:|^_change:bindings:|^_change:delegated:|^_change:common:|^_change:tree:|^change:|^beforechange:/; // adds simple event listener
// used as core of event engine

function addListener(object, name, callback, context) {
  var info = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var _initSeemple = Object(_core_init__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(object),
      allEvents = _initSeemple.events;

  var ctx = context || object;
  var events = allEvents[name];
  var event = {
    callback: callback,
    context: context,
    ctx: ctx,
    name: name,
    info: info
  }; // skipChecks is used by internal methods for better performance

  var _info$skipChecks = info.skipChecks,
      skipChecks = _info$skipChecks === void 0 ? false : _info$skipChecks;

  if (!skipChecks) {
    var domEventExecResult = _domeventregexp__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"].exec(name);

    if (domEventExecResult) {
      var _domEventExecResult = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(domEventExecResult, 4),
          eventName = _domEventExecResult[1],
          _domEventExecResult$ = _domEventExecResult[2],
          key = _domEventExecResult$ === void 0 ? 'sandbox' : _domEventExecResult$,
          selector = _domEventExecResult[3]; // fixing circular reference issue


      var addDomListener = __webpack_require__(61)["default"];

      addDomListener(object, key, eventName, selector, callback, context, info);
      return true;
    }
  } // if there are events with the same name


  if (events) {
    if (!skipChecks) {
      // if there are events with the same data, return false
      for (var i = 0; i < events.length; i++) {
        var existingEvent = events[i];
        var argCallback = callback && callback._callback || callback;
        var eventCallback = existingEvent.callback._callback || existingEvent.callback;

        if (argCallback === eventCallback && existingEvent.context === context) {
          return false;
        }
      }
    } // if the event isn't found add it to the event list


    events.push(event);
  } else {
    // if there are no events with the same name, create an array with only  one event
    allEvents[name] = [event];
  }

  if (propModEventReg.test(name)) {
    // define needed accessors for KEY
    Object(_core_defineprop__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, name.replace(propModEventReg, ''));
  } // names prefixed by underscore mean "private" events


  if (!skipChecks && name[0] !== '_') {
    Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(object, "addevent:".concat(name), event);
    Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(object, 'addevent', event);
  } // if event is added successfully return true


  return true;
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./src/_dom/mq/index.js + 7 modules
var mq = __webpack_require__(37);

// CONCATENATED MODULE: ./src/_dom/default-dollar.js
/* global $ */
 // check existence of needed methods in $ global variable
// to use it for internal needs

var neededMethods = ['on', 'off', 'add'];
var globalDollar = typeof $ === 'function' ? $ : null;
var useGlobalDollar = true;
/* istanbul ignore if */

if (globalDollar) {
  var fn = globalDollar.fn || globalDollar.prototype;

  for (var i = 0; i < neededMethods.length; i++) {
    if (!fn[neededMethods[i]]) {
      useGlobalDollar = false;
      break;
    }
  }

  if (!globalDollar.parseHTML) {
    // Zepto doesn't include its own parseHTML
    // TODO: Assignment of parseHTML is side effect
    globalDollar.parseHTML = mq["a" /* default */].parseHTML;
  }
} else {
  useGlobalDollar = false;
}

/* harmony default export */ var default_dollar = (useGlobalDollar ? globalDollar : mq["a" /* default */]);
// CONCATENATED MODULE: ./src/_dom/index.js

/* harmony default export */ var _dom = __webpack_exports__["a"] = ({
  $: default_dollar
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(8);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./src/_core/init.js
var init = __webpack_require__(6);

// EXTERNAL MODULE: ./src/_core/defineprop.js
var defineprop = __webpack_require__(14);

// EXTERNAL MODULE: ./src/bindnode/_getnodes.js
var _getnodes = __webpack_require__(22);

// EXTERNAL MODULE: ./src/unbindnode/index.js + 1 modules
var unbindnode = __webpack_require__(19);

// CONCATENATED MODULE: ./src/bindnode/_createbindingswitcher.js

 // returns a function which re-adds binding when object branch is changed
// the function is called by bindNode when something like
// 'foo.bar.baz' is passed to it as key argument value
// this is one of the hardest things in the framework to understand

function createBindingSwitcher(_ref) {
  var object = _ref.object,
      deepPath = _ref.deepPath,
      $nodes = _ref.$nodes,
      binder = _ref.binder,
      eventOptions = _ref.eventOptions,
      bindNode = _ref.bindNode;
  return function bindingSwitcher() {
    var changeEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var deepPathLength = deepPath.length;
    var lastDeepPathItem = deepPath[deepPathLength - 1];
    var value = changeEvent.value,
        previousValue = changeEvent.previousValue,
        restPath = changeEvent.restPath;
    var target; // an object to call bindNode

    var previousTarget; // an object to call unbindNode

    if (value && typeof_default()(value) === 'object' && restPath) {
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
    } // if rest path is given and previous value is an object


    if (previousValue && typeof_default()(previousValue) === 'object' && restPath) {
      previousTarget = previousValue;

      for (var _i2 = 0; _i2 < restPath.length; _i2++) {
        previousTarget = previousTarget[restPath[_i2]];

        if (!previousTarget) {
          break;
        }
      }
    } // add binding for new target


    if (target && typeof_default()(target) === 'object') {
      bindNode(target, lastDeepPathItem, $nodes, binder, eventOptions);
    } // remove binding for previously used object


    if (previousTarget && typeof_default()(previousTarget) === 'object') {
      Object(unbindnode["a" /* default */])(previousTarget, lastDeepPathItem, $nodes);
    }
  };
}
// EXTERNAL MODULE: ./src/lookforbinder.js
var lookforbinder = __webpack_require__(28);

// EXTERNAL MODULE: ./src/_helpers/is.js
var is = __webpack_require__(35);

// EXTERNAL MODULE: ./src/set.js
var set = __webpack_require__(16);

// CONCATENATED MODULE: ./src/bindnode/_createnodehandler.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


 // returns a function which called when bound node state is changed (eg DOM event is fired)

function createNodeHandler(_ref) {
  var object = _ref.object,
      key = _ref.key,
      node = _ref.node,
      propDef = _ref.propDef,
      binder = _ref.binder,
      bindingOptions = _ref.bindingOptions;
  return function nodeHandler() {
    var domEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    // nodeHandler.disabled = true is set in unbindNode
    // we cannot "turn off" binder.on when its value is a function
    // developer needs to clean memory ("turn off" callback) manualy in binder.destroy
    if (nodeHandler.disabled) {
      return;
    }

    var previousValue = propDef.value;
    var which = domEvent.which,
        target = domEvent.target,
        ctrlKey = domEvent.ctrlKey,
        altKey = domEvent.altKey;
    var getValue = binder.getValue;
    var value = getValue.call(node, _objectSpread({
      previousValue: previousValue,
      domEvent: domEvent,
      originalEvent: domEvent.originalEvent || domEvent,
      // jQuery thing
      // will throw "preventDefault is not a function" when domEvent is empty object
      preventDefault: function preventDefault() {
        return domEvent.preventDefault();
      },
      // will throw "stopPropagation is not a function" when domEvent is empty object
      stopPropagation: function stopPropagation() {
        return domEvent.stopPropagation();
      },
      which: which,
      target: target,
      ctrlKey: ctrlKey,
      altKey: altKey
    }, bindingOptions));

    if (!Object(is["a" /* default */])(value, previousValue)) {
      Object(set["a" /* default */])(object, key, value, {
        fromNode: true,
        // the following properties are needed to avoid circular changes
        // they are used at objectHandler
        changedNode: node,
        onChangeValue: value,
        binder: binder
      });
    }
  };
}
// CONCATENATED MODULE: ./src/bindnode/_createobjecthandler.js


function _createobjecthandler_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _createobjecthandler_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _createobjecthandler_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _createobjecthandler_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// returns a function which is called when property value is changed
function createObjectHandler(_ref) {
  var node = _ref.node,
      propDef = _ref.propDef,
      binder = _ref.binder,
      bindingOptions = _ref.bindingOptions;
  return function objectHandler() {
    var eventOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var value = propDef.value;
    var onChangeValue = eventOptions.onChangeValue,
        changedNode = eventOptions.changedNode,
        evtBinder = eventOptions.binder;
    var setValue = binder.setValue; // dirty hack for https://github.com/finom/seemple/issues/19

    var dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? "".concat(value) : value; // don't call setValue if a property is changed via getValue of the same binder

    if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
      return;
    }

    setValue.call(node, value, _createobjecthandler_objectSpread({
      value: value
    }, bindingOptions));
  };
}
// EXTERNAL MODULE: ./src/trigger/_triggerone.js
var _triggerone = __webpack_require__(2);

// EXTERNAL MODULE: ./src/on/_addlistener.js
var _addlistener = __webpack_require__(11);

// EXTERNAL MODULE: ./src/_helpers/debounce.js
var debounce = __webpack_require__(25);

// EXTERNAL MODULE: ./src/_helpers/seempleerror.js
var seempleerror = __webpack_require__(4);

// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// EXTERNAL MODULE: ./src/_helpers/assign.js
var _helpers_assign = __webpack_require__(7);

// CONCATENATED MODULE: ./src/bindnode/_bindsinglenode.js


function _bindsinglenode_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _bindsinglenode_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _bindsinglenode_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _bindsinglenode_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }










var spaceReg = /\s+/; // handles binding for single property & node
// the function is used at bindNode

function bindSingleNode(object, _ref) {
  var givenBinder = _ref.binder,
      key = _ref.key,
      $nodes = _ref.$nodes,
      node = _ref.node,
      eventOptions = _ref.eventOptions,
      propDef = _ref.propDef;
  var silent = eventOptions.silent,
      getValueOnBind = eventOptions.getValueOnBind,
      setValueOnBind = eventOptions.setValueOnBind,
      _eventOptions$debounc = eventOptions.debounceSetValue,
      debounceSetValue = _eventOptions$debounc === void 0 ? true : _eventOptions$debounc,
      _eventOptions$debounc2 = eventOptions.debounceGetValue,
      debounceGetValue = _eventOptions$debounc2 === void 0 ? true : _eventOptions$debounc2,
      _eventOptions$debounc3 = eventOptions.debounceSetValueOnBind,
      debounceSetValueOnBind = _eventOptions$debounc3 === void 0 ? false : _eventOptions$debounc3,
      _eventOptions$debounc4 = eventOptions.debounceGetValueOnBind,
      debounceGetValueOnBind = _eventOptions$debounc4 === void 0 ? false : _eventOptions$debounc4,
      _eventOptions$debounc5 = eventOptions.debounceSetValueDelay,
      debounceSetValueDelay = _eventOptions$debounc5 === void 0 ? 0 : _eventOptions$debounc5,
      _eventOptions$debounc6 = eventOptions.debounceGetValueDelay,
      debounceGetValueDelay = _eventOptions$debounc6 === void 0 ? 0 : _eventOptions$debounc6,
      _eventOptions$useExac = eventOptions.useExactBinder,
      useExactBinder = _eventOptions$useExac === void 0 ? false : _eventOptions$useExac; // create bindings array in property definition object

  var bindings = propDef.bindings = propDef.bindings || [];
  var value = propDef.value;
  var bindingOptions = {
    self: object,
    key: key,
    value: value,
    $nodes: $nodes,
    node: node
  };
  var isUndefined = typeof value === 'undefined';
  var binder;
  var objectHandler;
  var nodeHandler; // do not allow to bind more than 2 nodes to "sandbox" (for all nodes)
  // and "container" (for Seemple.Array)

  if (bindings.length && (key === 'sandbox' || object.isSeempleArray && key === 'container')) {
    throw Object(seempleerror["a" /* default */])('binding:magic_props_nodes_length');
  } // get actual binder


  if (givenBinder !== null) {
    // by default binder passed to bindNode is extended by default binder
    // useExactBinder turns this behavior off
    if (useExactBinder) {
      binder = givenBinder;
    } else {
      // getting default binder
      var foundBinder = Object(lookforbinder["a" /* default */])(node); // if default binder is found

      if (foundBinder) {
        // extend found binder by given binder
        if (givenBinder) {
          Object(_helpers_assign["a" /* default */])(foundBinder, givenBinder);
        }

        binder = foundBinder;
      } else {
        // default binder is not found
        binder = givenBinder || {};
      }
    }
  }

  var _binder = binder,
      getValue = _binder.getValue,
      setValue = _binder.setValue,
      on = _binder.on,
      initialize = _binder.initialize; // call binder.initialize

  if (initialize) {
    initialize.call(node, bindingOptions);
  } // add needed event handlers to given node when getValue is given


  if (getValue) {
    var syncNodeHandler = createNodeHandler({
      object: object,
      key: key,
      node: node,
      propDef: propDef,
      binder: binder,
      bindingOptions: bindingOptions
    });
    var debouncedNodeHandler;

    if (debounceGetValue || debounceGetValueOnBind) {
      debouncedNodeHandler = Object(debounce["a" /* default */])(syncNodeHandler, debounceGetValueDelay);
    }

    if (debounceGetValue) {
      nodeHandler = debouncedNodeHandler;
    } else {
      nodeHandler = syncNodeHandler;
    } // TODO: Throw error when "on" and maybe other binder properties has wrong type


    if (typeof on === 'function') {
      on.call(node, nodeHandler, bindingOptions);
    } else if (typeof on === 'string') {
      // addEventListener is faster than "on" method from any DOM library
      Object(foreach["a" /* default */])(on.split(spaceReg), function (evtName) {
        return node.addEventListener(evtName, nodeHandler);
      });
    }

    if (isUndefined && getValueOnBind !== false || getValueOnBind === true) {
      if (debounceGetValueOnBind) {
        debouncedNodeHandler();
      } else {
        syncNodeHandler();
      }
    }

    isUndefined = typeof propDef.value === 'undefined';
  } // add needed event handlers to the object when setValue is given


  if (setValue) {
    var syncObjectHandler = createObjectHandler({
      node: node,
      propDef: propDef,
      binder: binder,
      bindingOptions: bindingOptions,
      eventOptions: eventOptions
    });
    var debouncedObjectHandler;

    if (debounceSetValue || debounceSetValueOnBind) {
      debouncedObjectHandler = Object(debounce["a" /* default */])(syncObjectHandler, debounceSetValueDelay);
    }

    if (debounceSetValue) {
      objectHandler = debouncedObjectHandler;
    } else {
      objectHandler = syncObjectHandler;
    } // TODO: Is it possible to get previous value of a property?


    Object(_addlistener["a" /* default */])(object, "_change:bindings:".concat(key), objectHandler, null, {
      skipChecks: true
    });

    if (!isUndefined && setValueOnBind !== false || setValueOnBind === true) {
      if (debounceSetValueOnBind) {
        debouncedObjectHandler();
      } else {
        syncObjectHandler();
      }
    }
  } // add binding data to bindings array


  bindings.push({
    on: on,
    node: node,
    binder: binder,
    objectHandler: objectHandler,
    nodeHandler: nodeHandler,
    bindingOptions: bindingOptions
  }); // fire events

  if (!silent) {
    var extendedEventOptions = _bindsinglenode_objectSpread({
      key: key,
      node: node
    }, eventOptions);

    Object(_triggerone["a" /* default */])(object, "bind:".concat(key), extendedEventOptions);
    Object(_triggerone["a" /* default */])(object, 'bind', extendedEventOptions);
  }
}
// EXTERNAL MODULE: ./src/_helpers/checkobjecttype.js
var checkobjecttype = __webpack_require__(9);

// EXTERNAL MODULE: ./src/_helpers/forown.js
var forown = __webpack_require__(5);

// EXTERNAL MODULE: ./src/on/_addtreelistener.js
var _addtreelistener = __webpack_require__(43);

// CONCATENATED MODULE: ./src/bindnode/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bindnode_bindNode; });



function bindnode_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bindnode_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bindnode_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bindnode_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }











 // initializes binsing between a property of an object to HTML node

function bindnode_bindNode(object, key, node, binder, eventOptions) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    eventOptions = binder;
    binder = node;
    node = key;
    key = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'bindNode');
  }

  eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign

  binder = binder || {}; // eslint-disable-line no-param-reassign

  Object(init["a" /* default */])(object);
  var temporaryOptionalFlag = bindnode_bindNode.temporaryOptionalFlag;
  delete bindnode_bindNode.temporaryOptionalFlag; // throw an error when key is falsy

  if (!key) {
    throw Object(seempleerror["a" /* default */])('binding:falsy_key');
  }

  if (key instanceof Array) {
    if (typeof key[0] === 'string') {
      /*
             * accept array of keys
             * this.bindNode(['a', 'b', 'c'], node)
             */
      if (temporaryOptionalFlag) {
        // eslint-disable-next-line no-param-reassign
        eventOptions = bindnode_objectSpread({}, eventOptions, {
          optional: true
        });
      }

      Object(foreach["a" /* default */])(key, function (itemKey) {
        return bindnode_bindNode(object, itemKey, node, binder, eventOptions);
      });
    } else {
      /*
             * accept array of objects
             * this.bindNode([{key, node, binder, event}], { silent: true });
             */
      Object(foreach["a" /* default */])(key, function (_ref) {
        var itemKey = _ref.key,
            itemNode = _ref.node,
            itemBinder = _ref.binder,
            itemEventOptions = _ref.event;
        var commonEventOptions = node;
        var mergedEventOptions = {};

        if (temporaryOptionalFlag) {
          mergedEventOptions.optional = true;
        }

        if (commonEventOptions) {
          // extend event object by "global" event
          Object(_helpers_assign["a" /* default */])(mergedEventOptions, commonEventOptions);
        }

        if (itemEventOptions) {
          // extend event object by "local" event ("event" key of an object)
          Object(_helpers_assign["a" /* default */])(mergedEventOptions, itemEventOptions);
        }

        bindnode_bindNode(object, itemKey, itemNode, itemBinder, mergedEventOptions);
      });
    }

    return object;
  }

  if (typeof_default()(key) === 'object') {
    Object(forown["a" /* default */])(key, function (keyObjValue, keyObjKey) {
      // binder means eventOptions
      if (temporaryOptionalFlag) {
        // eslint-disable-next-line no-param-reassign
        eventOptions = binder ? bindnode_objectSpread({}, binder, {
          optional: true
        }) : {
          optional: true
        };
      } else {
        eventOptions = binder; // eslint-disable-line no-param-reassign
      }

      if (keyObjValue && keyObjValue.constructor === Object && 'node' in keyObjValue) {
        // this.bindNode({ key: { node: $(), binder } ) }, { on: 'evt' }, { silent: true });
        bindnode_bindNode(object, keyObjKey, keyObjValue.node, keyObjValue.binder || node, eventOptions);
      } else if (keyObjValue && keyObjValue.constructor === Array && keyObjValue.length && keyObjValue[0].constructor === Object && 'node' in keyObjValue[0]) {
        // this.bindNode({ key: [{
        //   node: $(),
        //   binder
        // }] ) }, { on: 'evt' }, { silent: true });
        Object(foreach["a" /* default */])(keyObjValue, function (keyObjValueItem) {
          bindnode_bindNode(object, keyObjKey, keyObjValueItem.node, keyObjValueItem.binder || node, eventOptions);
        });
      } else {
        // this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
        bindnode_bindNode(object, keyObjKey, keyObjValue, node, eventOptions);
      }
    });
    return object;
  }

  var _eventOptions = eventOptions,
      _eventOptions$optiona = _eventOptions.optional,
      optional = _eventOptions$optiona === void 0 ? temporaryOptionalFlag || false : _eventOptions$optiona,
      _eventOptions$exactKe = _eventOptions.exactKey,
      exactKey = _eventOptions$exactKe === void 0 ? false : _eventOptions$exactKe;
  var $nodes = Object(_getnodes["a" /* default */])(object, node); // check node existence

  if (!$nodes.length) {
    if (optional) {
      return object;
    }

    throw Object(seempleerror["a" /* default */])('binding:node_missing', {
      key: key,
      node: node
    });
  }

  if (!exactKey) {
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
        bindNode: bindnode_bindNode
      });
      Object(_addtreelistener["a" /* default */])(object, deepPath.slice(0, deepPathLength - 1), bindingSwitcher);
      bindingSwitcher();
      return object;
    }
  }

  var propDef = Object(defineprop["a" /* default */])(object, key);

  if (object.isSeemple) {
    // if an object is Seemple instance then extend "$nodes" and "nodes" objects
    var _object = object,
        $allNodes = _object.$nodes,
        allNodes = _object.nodes;

    if (!$allNodes || !allNodes) {
      throw Object(seempleerror["a" /* default */])('binding:instance_nodes_missing', {
        $nodes: $allNodes,
        nodes: allNodes
      });
    }

    $allNodes[key] = $allNodes[key] && $allNodes[key].length ? $allNodes[key].add($nodes) : $nodes;
    allNodes[key] = $allNodes[key][0];
  } // handle binding for every node separately


  Object(foreach["a" /* default */])($nodes, function (oneNode) {
    return bindSingleNode(object, {
      $nodes: $nodes,
      node: oneNode,
      key: key,
      eventOptions: eventOptions,
      binder: binder,
      propDef: propDef
    });
  });
  return object;
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defineProp; });
/* harmony import */ var _defs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _helpers_seempleerror__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function errorAccessor() {
  throw Object(_helpers_seempleerror__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])('common:use_magic_props');
} // the function defines needed descriptor for given property


function defineProp(object, key, noAccessor) {
  var def = _defs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(object); // if no object definition do nothing

  if (!def) {
    return null;
  }

  if (!def.props[key]) {
    var propDef = def.props[key] = {
      value: object[key],
      mediator: null,
      bindings: null
    };
    var getter;
    var setter; // make possible to throw an error on get and on set if sandbox (for all objects)
    // or container (for Seemple.Array instances) are used

    if (key === 'sandbox' || object.isSeempleArray && key === 'container') {
      getter = setter = errorAccessor;
    }

    if (!noAccessor) {
      Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        get: function get() {
          return getter ? getter() : propDef.value;
        },
        set: function set(v) {
          return setter ? setter() : Object(_set__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(object, key, v, {
            fromSetter: true
          });
        }
      });
    }
  }

  return def.props[key];
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(47);

var iterableToArrayLimit = __webpack_require__(48);

var nonIterableRest = __webpack_require__(49);

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return set; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_defs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _helpers_checkobjecttype__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _helpers_is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(35);
/* harmony import */ var _helpers_forown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





 // the function sets new value for a property
// since its performance is very critical we're checking events existence manually

function set(object, key, value, eventOptions) {
  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    eventOptions = value;
    value = key;
    key = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(_helpers_checkobjecttype__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(object, 'set');
  } // if no key or falsy key is given


  if (!key) {
    return object;
  } // allow to use key-value object as another method variation


  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(key) === 'object') {
    Object(_helpers_forown__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(key, function (objVal, objKey) {
      return set(object, objKey, objVal, value);
    });
    return object;
  }

  eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign

  var def = _core_defs__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].get(object); // if no object definition then make simple assignment

  if (!def) {
    object[key] = value;
    return object;
  }

  var props = def.props,
      events = def.events;
  var propDef = props[key]; // if no property definition then make simple assignment

  if (!propDef) {
    object[key] = value;
    return object;
  }

  var previousValue = propDef.value,
      mediator = propDef.mediator; // possible flags, all of them are falsy by default

  var _eventOptions = eventOptions,
      skipMediator = _eventOptions.skipMediator,
      fromMediator = _eventOptions.fromMediator,
      force = _eventOptions.force,
      forceHTML = _eventOptions.forceHTML,
      silent = _eventOptions.silent,
      silentHTML = _eventOptions.silentHTML,
      skipCalc = _eventOptions.skipCalc;
  var newValue;

  if (mediator && !Object(_helpers_is__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(value, previousValue) && !skipMediator && !fromMediator) {
    newValue = mediator(value);
  } else {
    newValue = value;
  }

  var isChanged = !Object(_helpers_is__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(newValue, previousValue); // add to eventOptions object some useful properties
  // we override default eventOptions because some of the properties need to have actual values,
  // not inherited ones (eg when calc is used)

  var extendedEventOptions = _objectSpread({}, eventOptions, {
    value: newValue,
    self: object,
    previousValue: previousValue,
    key: key,
    isChanged: isChanged
  });

  var triggerChange = (isChanged || force) && !silent; // trigger beforechange:KEY and beforechange events

  if (triggerChange) {
    var beforechangeStr = 'beforechange';
    var beforechangeEventName = "".concat(beforechangeStr, ":").concat(key);

    if (events[beforechangeEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, beforechangeEventName, extendedEventOptions);
    }

    if (events[beforechangeStr]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, beforechangeStr, extendedEventOptions);
    }
  }

  propDef.value = newValue; // triger bindings

  if (!silentHTML && (isChanged || forceHTML)) {
    var changeBindingsEventName = "_change:bindings:".concat(key);

    if (events[changeBindingsEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeBindingsEventName, extendedEventOptions);
    }
  } // trigger change:KEY and change events


  if (triggerChange) {
    var changeStr = 'change';
    var changeEventName = "".concat(changeStr, ":").concat(key);

    if (events[changeEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeEventName, extendedEventOptions);
    }

    if (events[changeStr]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeStr, extendedEventOptions);
    }
  } // trigger dependencies made by calc method


  if ((isChanged || force) && !skipCalc) {
    var changeDepsEventName = "_change:deps:".concat(key);

    if (events[changeDepsEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeDepsEventName, extendedEventOptions);
    }
  }

  if (isChanged) {
    // trigger common delegated events logic
    var changeDelegatedKeyEventName = "_change:delegated:".concat(key);

    if (events[changeDelegatedKeyEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeDelegatedKeyEventName, extendedEventOptions);
    } // trigger tree change events logic


    var changeTreeEventName = "_change:tree:".concat(key);

    if (events[changeTreeEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeTreeEventName, extendedEventOptions);
    } // trigger other internal change events


    var changeCommonEventName = "_change:common:".concat(key);

    if (events[changeCommonEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeCommonEventName, extendedEventOptions);
    } // trigger delegated logic for asterisk events (*.*.*@foo)
    // TODO: Confusing events names ("_change:delegated", "_change:common:KEY" etc)


    var changeDelegatedEventName = '_change:delegated';

    if (events[changeDelegatedEventName]) {
      Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, changeDelegatedEventName, extendedEventOptions);
    }
  }

  return object;
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return removeListener; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_defs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _on_domeventregexp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* harmony import */ var _helpers_foreach__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var _helpers_forown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);





 // removes simple event listener from an object

function removeListener(object, name, callback, context, info) {
  var def = _core_defs__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].get(object); // if no definition do nothing

  if (!def) {
    return false;
  }

  var allEvents = def.events;
  var events = allEvents[name];
  var retain = [];
  var noTrigger = name ? name[0] === '_' : false;
  var domEventExecResult = _on_domeventregexp__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].exec(name);

  if (domEventExecResult) {
    var _domEventExecResult = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(domEventExecResult, 4),
        eventName = _domEventExecResult[1],
        _domEventExecResult$ = _domEventExecResult[2],
        key = _domEventExecResult$ === void 0 ? 'sandbox' : _domEventExecResult$,
        selector = _domEventExecResult[3]; // fixing circular reference issue


    var removeDomListener = __webpack_require__(50)["default"];

    removeDomListener(object, key, eventName, selector, callback, context, info);
    return true;
  } // if all events need to be removed


  if (typeof name === 'undefined') {
    if (!noTrigger) {
      Object(_helpers_forown__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(allEvents, function (allEventsItem, allEventsName) {
        Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(allEventsItem, function (event) {
          var removeEventData = {
            allEventsName: allEventsName,
            callback: event.callback,
            context: event.context
          };
          Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(object, "removeevent:".concat(name), removeEventData);
          Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(object, 'removeevent', removeEventData);
        });
      });
    } // restore default value of "events"


    def.events = {};
  } else if (events) {
    // if events with given name are found
    Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(events, function (event) {
      var argCallback = callback && callback._callback || callback;
      var eventCallback = event.callback._callback || event.callback;

      if (argCallback && argCallback !== eventCallback || context && context !== event.context) {
        // keep event
        retain.push(event);
      } else {
        var removeEventData = {
          name: name,
          callback: event.callback,
          context: event.context
        };

        if (!noTrigger) {
          Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(object, "removeevent:".concat(name), removeEventData);
          Object(_trigger_triggerone__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(object, 'removeevent', removeEventData);
        }
      }
    });

    if (retain.length) {
      allEvents[name] = retain;
    } else {
      delete def.events[name];
    }
  }

  return false;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var html = __webpack_require__(51);

var display = __webpack_require__(52);

var className = __webpack_require__(53);

var prop = __webpack_require__(55);

var attr = __webpack_require__(56);

var text = __webpack_require__(57);

var style = __webpack_require__(58);

var dataset = __webpack_require__(59);

var existence = __webpack_require__(60);

exports.html = html;
exports.display = display;
exports.className = className;
exports.prop = prop;
exports.attr = attr;
exports.text = text;
exports.style = style;
exports.dataset = dataset;
exports.existence = existence;

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./src/_helpers/checkobjecttype.js
var checkobjecttype = __webpack_require__(9);

// EXTERNAL MODULE: ./src/_core/defs.js
var defs = __webpack_require__(3);

// EXTERNAL MODULE: ./src/bindnode/_getnodes.js
var _getnodes = __webpack_require__(22);

// EXTERNAL MODULE: ./src/off/_removetreelistener.js
var _removetreelistener = __webpack_require__(44);

// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// EXTERNAL MODULE: ./src/_helpers/forown.js
var forown = __webpack_require__(5);

// EXTERNAL MODULE: ./src/_helpers/assign.js
var _helpers_assign = __webpack_require__(7);

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(8);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/off/_removelistener.js
var _removelistener = __webpack_require__(17);

// EXTERNAL MODULE: ./src/trigger/_triggerone.js
var _triggerone = __webpack_require__(2);

// CONCATENATED MODULE: ./src/unbindnode/_removebinding.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




var spaceReg = /\s+/; // the function removes single binding for single object
// called by unbindNode

function removeBinding(_ref) {
  var object = _ref.object,
      key = _ref.key,
      eventOptions = _ref.eventOptions,
      binding = _ref.binding;
  var bindingOptions = binding.bindingOptions,
      binder = binding.binder,
      node = binding.node,
      nodeHandler = binding.nodeHandler,
      objectHandler = binding.objectHandler;
  var destroy = binder.destroy,
      on = binder.on;
  var silent = eventOptions.silent; // if "on" is a function then disable it
  // we cannot "turn off" custom listener defined by a programmer
  // programmer needs to remove custom listener maually inside binder.destroy

  if (typeof on === 'function') {
    nodeHandler.disabled = true;
  } else if (typeof on === 'string') {
    // remove DOM event listener
    // removeEventListener is faster than "on" method from any DOM library
    Object(foreach["a" /* default */])(on.split(spaceReg), function (evtName) {
      return node.removeEventListener(evtName, nodeHandler);
    });
  } // remove object event listener


  Object(_removelistener["a" /* default */])(object, "_change:bindings:".concat(key), objectHandler); // if binder.destroy is given call it

  if (destroy) {
    destroy.call(node, bindingOptions);
  } // fire events


  if (!silent) {
    var extendedEventOptions = _objectSpread({
      key: key,
      node: node
    }, eventOptions);

    Object(_triggerone["a" /* default */])(object, "unbind:".concat(key), extendedEventOptions);
    Object(_triggerone["a" /* default */])(object, 'unbind', extendedEventOptions);
  }
}
// EXTERNAL MODULE: ./src/_dom/index.js + 1 modules
var _dom = __webpack_require__(12);

// CONCATENATED MODULE: ./src/unbindnode/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return unbindNode; });









 // unbinds a node

function unbindNode(object, key, node, eventOptions) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    eventOptions = node;
    node = key;
    key = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'unbindNode');
  }

  if (key instanceof Array) {
    if (typeof key[0] === 'string') {
      /*
             * accept array of keys
             * this.unbindNode(['a', 'b', 'c'], node)
             */
      Object(foreach["a" /* default */])(key, function (itemKey) {
        return unbindNode(object, itemKey, node, eventOptions);
      });
    } else {
      /*
             * acept array of objects
             * this.unbindNode([{ key, node, binder, event }], { silent: true });
             */
      Object(foreach["a" /* default */])(key, function (_ref) {
        var itemKey = _ref.key,
            itemNode = _ref.node,
            itemEventOptions = _ref.event;
        var commonEventOptions = node;
        var mergedEventOptions = {};

        if (commonEventOptions) {
          // extend event object by "global" event
          Object(_helpers_assign["a" /* default */])(mergedEventOptions, commonEventOptions);
        }

        if (itemEventOptions) {
          // extend event object by "local" event ("event" key of an object)
          Object(_helpers_assign["a" /* default */])(mergedEventOptions, itemEventOptions);
        }

        unbindNode(object, itemKey, itemNode, mergedEventOptions);
      });
    }

    return object;
  }

  if (key && typeof_default()(key) === 'object') {
    Object(forown["a" /* default */])(key, function (keyObjValue, keyObjKey) {
      if (keyObjValue.constructor === Object && 'node' in keyObjValue) {
        // this.unbindNode({ key: { node: $(), binder } ) }, { silent: true });
        unbindNode(object, keyObjKey, keyObjValue.node, node);
      } else if (keyObjValue.constructor === Array && keyObjValue.length && keyObjValue[0].constructor === Object && 'node' in keyObjValue[0]) {
        // this.unbindNode({ key: [{ node: $(), binder }] ) }, { silent: true });
        Object(foreach["a" /* default */])(keyObjValue, function (keyObjValueItem) {
          unbindNode(object, keyObjKey, keyObjValueItem.node, node);
        });
      } else {
        // this.unbindNode({ key: $() }, { silent: true });
        unbindNode(object, keyObjKey, keyObjValue, node);
      }
    });
    return object;
  }

  eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign

  var _eventOptions = eventOptions,
      deep = _eventOptions.deep;
  var def = defs["a" /* default */].get(object);

  if (!def) {
    return object;
  }

  var props = def.props; // allow to pass null or undefined as key
  // if passed then remove bindings of all keys for given object

  if (key === null || typeof key === 'undefined') {
    Object(forown["a" /* default */])(props, function (propsItem, propsKey) {
      unbindNode(object, propsKey, null, eventOptions);
    });
    return object;
  } // remove delegated binding


  if (deep !== false) {
    var deepPath = key.split('.');
    var deepPathLength = deepPath.length;

    if (deepPathLength > 1) {
      var target = object;

      for (var i = 0; i < deepPathLength - 1; i++) {
        // TODO: Do we need to throw an error when a target is falsy?
        target = target[deepPath[i]];
      } // TODO: Potential bug! This may undelegate listener for all bindings with the same path
      // ...(cannot reproduce)


      Object(_removetreelistener["a" /* default */])(object, deepPath.slice(0, deepPathLength - 2));
      unbindNode(target, deepPath[deepPathLength - 1], node, eventOptions);
      return object;
    }
  }

  var propDef = props[key]; // when no propdef do nothing

  if (!propDef) {
    return object;
  }

  var bindings = propDef.bindings; // if the property doesn't have any bindings do nothing

  if (!bindings) {
    return object;
  } // if no node is pased remove all bindings for given key


  if (!node) {
    Object(foreach["a" /* default */])(bindings, function (binding) {
      removeBinding({
        object: object,
        key: key,
        eventOptions: eventOptions,
        binding: binding
      });
    });
    propDef.bindings = null; // update nodes and $nodes for Seemple instance

    if (object.isSeemple) {
      delete object.nodes[key];
      delete object.$nodes[key];
    }

    return object;
  }

  var $nodes = Object(_getnodes["a" /* default */])(object, node);
  var retainBindings = [];
  var retainNodes = []; // iterate over all bindngs and compare their node with given nodes

  Object(foreach["a" /* default */])($nodes, function (nodesItem) {
    Object(foreach["a" /* default */])(bindings, function (binding) {
      if (binding.node === nodesItem) {
        removeBinding({
          object: object,
          key: key,
          eventOptions: eventOptions,
          binding: binding
        });
      } else {
        retainBindings.push(binding);
        retainNodes.push(nodesItem);
      }
    });
  }); // update nodes and $nodes for Seemple instance

  if (object.isSeemple) {
    if (retainNodes.length) {
      object.nodes[key] = retainNodes[0];
      object.$nodes[key] = _dom["a" /* default */].$(retainNodes);
    } else {
      delete object.nodes[key];
      delete object.$nodes[key];
    }
  } // update bindings object


  if (retainBindings.length) {
    propDef.bindings = retainBindings;
  } else {
    propDef.bindings = null;
  }

  return object;
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Class; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_foreach__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _helpers_forown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _helpers_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);



 // static methods and properties of classes will be hidden under Symbol('staticNames')

var staticNamesProperty = typeof Symbol === 'function' ? Symbol('staticNames') : '__staticNames';
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function Class(prototype, staticProps) {
  var Constructor = hasOwnProperty.call(prototype, 'constructor') ? prototype.constructor : function EmptyConstructor() {}; // extends is kept for backward compatibility

  var Parent = prototype["extends"]; // inherit proto from class parent or empty object

  var proto = Object.create(Parent ? Parent.prototype : {});
  var parentStaticNames = Parent ? Parent[staticNamesProperty] : undefined;
  Object(_helpers_assign__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(proto, prototype); // allow to pass symbols as prototype properties

  if (getOwnPropertySymbols) {
    var symbols = getOwnPropertySymbols(prototype);
    Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(symbols, function (symbol) {
      proto[symbol] = prototype[symbol];
    });
  } // inherit staric properties of a parent


  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(parentStaticNames) === 'object') {
    var staticNames = Constructor[staticNamesProperty] || {};
    Constructor[staticNamesProperty] = staticNames;
    Object(_helpers_forown__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(parentStaticNames, function (_, name) {
      Constructor[name] = Parent[name];
      staticNames[name] = true;
    }); // inherit static properties of a parent when their keys are symbols

    if (getOwnPropertySymbols) {
      var _symbols = getOwnPropertySymbols(parentStaticNames);

      Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_symbols, function (symbol) {
        Constructor[symbol] = Parent[symbol];
        staticNames[symbol] = true;
      });
    }
  } // extend Constructor with passed static properties


  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(staticProps) === 'object') {
    var _staticNames = Constructor[staticNamesProperty] || {};

    Constructor[staticNamesProperty] = _staticNames;
    Object(_helpers_forown__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(staticProps, function (value, key) {
      Constructor[key] = value;
      _staticNames[key] = true;
    }); // extend Constructor with passed static properties if their keys are symbols

    if (getOwnPropertySymbols) {
      var _symbols2 = getOwnPropertySymbols(staticProps);

      Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(_symbols2, function (symbol) {
        Constructor[symbol] = staticProps[symbol];
        _staticNames[symbol] = true;
      });
    }
  }

  Constructor.prototype = proto; // if new Class({}) is called return its instance

  if (this instanceof Class) {
    return new Constructor();
  }

  return Constructor;
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return undelegateListener; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_defs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _removelistener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _helpers_foreach__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);



 // the function removes internally used events such as _asterisk:add

function detatchDelegatedLogic(_ref) {
  var delegatedEventName = _ref.delegatedEventName,
      pathStr = _ref.pathStr,
      allEvents = _ref.allEvents;
  var retain = [];
  var events = allEvents[delegatedEventName];
  Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(events, function (event) {
    // pathStr is assigned to info in delegateListener
    if (event.info.pathStr !== pathStr) {
      retain.push(event);
    }
  });

  if (retain.length) {
    allEvents[delegatedEventName] = retain;
  } else {
    delete allEvents[delegatedEventName];
  }
} // removes delegated event listener from an object by given path


function undelegateListener(object, givenPath, name, callback, context) {
  var info = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var def = _core_defs__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].get(object); // if no definition do nothing

  if (!def) {
    return;
  }

  var allEvents = def.events;
  var path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

  if (!path || !path.length) {
    // if no path then remove listener
    Object(_removelistener__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(object, name, callback, context, info);
  } else {
    // else do all magic
    var key = path[0];
    var pathStr;

    if (path.length > 1) {
      path = path.slice(1);
      pathStr = path.join('.');
    } else {
      path = [];
      pathStr = path[0] || '';
    }

    if (key === '*') {
      // remove asterisk events
      if (object.isSeempleArray) {
        var delegatedAddEvtName = '_asterisk:add';

        if (allEvents[delegatedAddEvtName]) {
          detatchDelegatedLogic({
            delegatedEventName: delegatedAddEvtName,
            pathStr: pathStr,
            allEvents: allEvents
          });
        }

        var delegatedRemoveEvtName = '_asterisk:remove';

        if (allEvents[delegatedRemoveEvtName]) {
          detatchDelegatedLogic({
            delegatedEventName: delegatedRemoveEvtName,
            pathStr: pathStr,
            allEvents: allEvents
          });
        } // undelegate asterisk events for existing items


        if (object.length) {
          Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(object, function (item) {
            if (item && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(item) === 'object') {
              undelegateListener(item, path, name, callback, context, info);
            }
          });
        }
      } else if (object.isSeempleObject) {
        var delegatedSetEvtName = '_asterisk:set';

        if (allEvents[delegatedSetEvtName]) {
          detatchDelegatedLogic({
            delegatedEventName: delegatedSetEvtName,
            pathStr: pathStr,
            allEvents: allEvents
          });
        }

        var _delegatedRemoveEvtName = '_asterisk:remove';

        if (allEvents[_delegatedRemoveEvtName]) {
          detatchDelegatedLogic({
            delegatedEventName: _delegatedRemoveEvtName,
            pathStr: pathStr,
            allEvents: allEvents
          });
        }

        object.each(function (item) {
          if (item && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(item) === 'object') {
            undelegateListener(item, path, name, callback, context, info);
          }
        });
      }
    } else {
      // remove non-asterisk delegated events
      var delegatedChangeEvtName = "_change:delegated:".concat(key);

      if (allEvents[delegatedChangeEvtName]) {
        detatchDelegatedLogic({
          delegatedEventName: delegatedChangeEvtName,
          pathStr: pathStr,
          allEvents: allEvents
        });
      }

      if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(object[key]) === 'object') {
        undelegateListener(object[key], path, name, callback, context, info);
      }
    }
  }
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNodes; });
/* harmony import */ var _selectnodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);


var htmlReg = /</;
var customSelectorReg = /:sandbox|:bound\(([^(]*)\)/; // the function works just like DOM library accepting any kind of arg
// (HTML string, Node, NodeList etc) bu allows to pass custom selector
// eg :bound(KEY) and :sandbox

function getNodes(object, selector) {
  if (typeof selector === 'string' && !htmlReg.test(selector) && customSelectorReg.test(selector)) {
    return Object(_selectnodes__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(object, selector);
  }

  return _dom__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"].$(selector);
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return input; });
// returns a binder for input element based on its type
function input(type) {
  var on;

  switch (type) {
    case 'checkbox':
      return {
        on: 'click keyup',
        getValue: function getValue() {
          return this.checked;
        },
        setValue: function setValue(value) {
          this.checked = value;
        }
      };

    case 'radio':
      return {
        on: 'click keyup',
        getValue: function getValue() {
          return this.value;
        },
        setValue: function setValue(value) {
          this.checked = typeof value !== 'undefined' && this.value === value;
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
    getValue: function getValue() {
      return this.value;
    },
    setValue: function setValue(value) {
      this.value = value;
    }
  };
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./src/on/_addlistener.js
var _addlistener = __webpack_require__(11);

// EXTERNAL MODULE: ./src/_core/defs.js
var defs = __webpack_require__(3);

// EXTERNAL MODULE: ./src/trigger/_triggerone.js
var _triggerone = __webpack_require__(2);

// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// CONCATENATED MODULE: ./src/on/_delegatelistener/arrayaddhandler.js


 // the function is called when something is added to an array
// it delegates asterisk listener for newly added items

function arrayAddHandler(_ref) {
  var added = _ref.added;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _triggerone["a" /* default */].latestEvent.info.delegatedData,
      path = _ref2.path,
      name = _ref2.name,
      callback = _ref2.callback,
      context = _ref2.context,
      info = _ref2.info;

  Object(foreach["a" /* default */])(added, function (item) {
    if (item && typeof_default()(item) === 'object') {
      var delegateListener = __webpack_require__(24)["default"]; // fixing circular ref


      delegateListener(item, path, name, callback, context, info);
    }
  });
}
// CONCATENATED MODULE: ./src/on/_delegatelistener/objectsethandler.js


 // the function is called when data property is changed in Seemple.Object
// it delegates asterisk listener for new value

function objectSetHandler(_ref) {
  var key = _ref.key;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _triggerone["a" /* default */].latestEvent.info.delegatedData,
      path = _ref2.path,
      name = _ref2.name,
      callback = _ref2.callback,
      context = _ref2.context,
      info = _ref2.info,
      object = _ref2.object;

  if (key) {
    var item = object[key];

    if (item && typeof_default()(item) === 'object') {
      var def = defs["a" /* default */].get(object);

      if (key in def.keys) {
        var delegateListener = __webpack_require__(24)["default"]; // fixing circular ref


        delegateListener(item, path, name, callback, context, info);
      }
    }
  }
}
// EXTERNAL MODULE: ./src/off/_undelegatelistener.js
var _undelegatelistener = __webpack_require__(21);

// CONCATENATED MODULE: ./src/on/_delegatelistener/arrayremovehandler.js



 // the function is called when something is removed from an array
// it undelegates asterisk listener from removed items

function arrayRemoveHandler(_ref) {
  var removed = _ref.removed;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _triggerone["a" /* default */].latestEvent.info.delegatedData,
      path = _ref2.path,
      name = _ref2.name,
      callback = _ref2.callback,
      context = _ref2.context,
      info = _ref2.info;

  if (removed && removed.length) {
    Object(foreach["a" /* default */])(removed, function (item) {
      if (item && typeof_default()(item) === 'object') {
        Object(_undelegatelistener["a" /* default */])(item, path, name, callback, context, info);
      }
    });
  }
}
// CONCATENATED MODULE: ./src/on/_delegatelistener/objectremovehandler.js


 // the function is called when data property is removed from Seemple.Object
// it undelegates asterisk listener from removed object

function objectRemoveHandler(_ref) {
  var item = _ref.value;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _triggerone["a" /* default */].latestEvent.info.delegatedData,
      path = _ref2.path,
      name = _ref2.name,
      callback = _ref2.callback,
      context = _ref2.context,
      info = _ref2.info;

  if (item && typeof_default()(item) === 'object') {
    Object(_undelegatelistener["a" /* default */])(item, path, name, callback, context, info);
  }
}
// CONCATENATED MODULE: ./src/on/_delegatelistener/changehandler.js


 // the function is called when some part of a path is changed
// it delegates event listener for new branch of an object and undelegates it for old one
// used for non-asterisk events

function changeHandler(_ref) {
  var previousValue = _ref.previousValue,
      value = _ref.value;

  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _triggerone["a" /* default */].latestEvent.info.delegatedData,
      path = _ref2.path,
      name = _ref2.name,
      callback = _ref2.callback,
      context = _ref2.context,
      info = _ref2.info;

  if (value && typeof_default()(value) === 'object') {
    var delegateListener = __webpack_require__(24)["default"]; // fixing circular ref


    delegateListener(value, path, name, callback, context, info);
  }

  if (previousValue && typeof_default()(previousValue) === 'object') {
    Object(_undelegatelistener["a" /* default */])(previousValue, path, name, callback, context, info);
  }
}
// EXTERNAL MODULE: ./src/_helpers/forown.js
var forown = __webpack_require__(5);

// CONCATENATED MODULE: ./src/on/_delegatelistener/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _delegatelistener_delegateListener; });








 // adds delegated event listener to an object by given path

function _delegatelistener_delegateListener(object, givenPath, name, callback, context) {
  var info = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  // if typeof path is string and path is not empty string then split it
  var path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

  if (!path || !path.length) {
    // if no path then add simple listener
    Object(_addlistener["a" /* default */])(object, name, callback, context, info);
  } else {
    // else do all magic
    var key = path[0];
    var pathStr; // needed for undelegation

    if (path.length > 1) {
      path = path.slice(1);
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
      info: info,
      object: object
    };

    if (key === '*') {
      // handling asterisk events
      // { skipChecks: true } allows to use same event name and event handler few times
      if (object.isSeempleArray) {
        // the event is triggered when something is added to an array
        Object(_addlistener["a" /* default */])(object, '_asterisk:add', arrayAddHandler, null, {
          delegatedData: delegatedData,
          pathStr: pathStr,
          skipChecks: true
        }); // the event is triggered when something is removed from an array

        Object(_addlistener["a" /* default */])(object, '_asterisk:remove', arrayRemoveHandler, null, {
          delegatedData: delegatedData,
          pathStr: pathStr,
          skipChecks: true
        }); // call handler manually to delegate listener for currently existing data props

        arrayAddHandler({
          added: object
        }, delegatedData);
      } else if (object.isSeempleObject) {
        var def = defs["a" /* default */].get(object); // the event is triggered when data prop is changed

        Object(_addlistener["a" /* default */])(object, '_asterisk:set', objectSetHandler, null, {
          delegatedData: delegatedData,
          pathStr: pathStr,
          skipChecks: true
        }); // the event is triggered when data prop is removed

        Object(_addlistener["a" /* default */])(object, '_asterisk:remove', objectRemoveHandler, null, {
          delegatedData: delegatedData,
          pathStr: pathStr,
          skipChecks: true
        }); // delegate listener for currently existing data props

        Object(forown["a" /* default */])(def.keys, function (_, defKey) {
          var item = object[defKey];

          if (item && typeof_default()(item) === 'object') {
            _delegatelistener_delegateListener(item, path, name, callback, context, info);
          }
        });
      }
    } else {
      // handling non-asterisk delegated event
      // the event is triggered by "set"
      Object(_addlistener["a" /* default */])(object, "_change:delegated:".concat(key), changeHandler, null, {
        delegatedData: delegatedData,
        pathStr: pathStr
      }); // call handler manually

      changeHandler({
        value: object[key]
      }, delegatedData);
    }
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return debounce; });
/* harmony import */ var _apply__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
 // Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
// (c) https://davidwalsh.name/javascript-debounce-function

function debounce(func, givenDelay, thisArg) {
  var timeout;
  var delay;

  if (typeof givenDelay !== 'number') {
    thisArg = givenDelay; // eslint-disable-line no-param-reassign

    delay = 0;
  } else {
    delay = givenDelay || 0;
  }

  return function debounced() {
    var args = arguments;
    var callContext = thisArg || this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return Object(_apply__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(func, callContext, args);
    }, delay);
  };
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/class.js
var src_class = __webpack_require__(20);

// EXTERNAL MODULE: ./src/seemple/index.js + 22 modules
var seemple = __webpack_require__(32);

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(8);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/_helpers/assign.js
var _helpers_assign = __webpack_require__(7);

// EXTERNAL MODULE: ./src/seemple/_afterinit.js
var _afterinit = __webpack_require__(29);

// EXTERNAL MODULE: ./src/on/_addlistener.js
var _addlistener = __webpack_require__(11);

// EXTERNAL MODULE: ./src/_helpers/seempleerror.js
var seempleerror = __webpack_require__(4);

// CONCATENATED MODULE: ./src/array/_afterinit.js


 // the function returns array item converted to Model instance

function modelItemMediator(item, index) {
  var Model = this.Model; // if an item is already instance of Model

  if (item instanceof Model) {
    return item;
  }

  var itemData;

  if (item && typeof item.toJSON === 'function') {
    // if item is not falsy and if it has toJSON method
    // then retrieve instance data by this method
    itemData = item.toJSON(false);
  } else {
    // if not then use an item as its data
    itemData = item;
  }

  return new Model(itemData, this, index);
} // event handler to listen changes of Model property


function changeModel() {
  var Model = this.Model; // if model has wrong type then throw an error

  if (typeof Model !== 'function') {
    throw Object(seempleerror["a" /* default */])('array:model_type', {
      Model: Model
    });
  } // attatch item mediator


  this.mediateItem(modelItemMediator);
} // event handler to listen changes of itemRenderer property


function changeItemRendererHandler() {
  var eventOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _eventOptions$forceRe = eventOptions.forceRerender,
      forceRerender = _eventOptions$forceRe === void 0 ? true : _eventOptions$forceRe;
  this.rerender({
    forceRerender: forceRerender
  });
} // Seemple.Array initializer


function afterSeempleArrayInit() {
  // we need to calculate hasModel before change:Model is added
  var hasModel = 'Model' in this; // call Seemple initializer

  _afterinit["a" /* default */].call(this);
  Object(_addlistener["a" /* default */])(this, '_change:common:Model', changeModel, this, {
    skipChecks: true
  });
  Object(_addlistener["a" /* default */])(this, '_change:common:itemRenderer', changeItemRendererHandler, this, {
    skipChecks: true
  }); // call changeModel handler immediately if model is present
  // it will throw an error if Model is not a function

  if (hasModel) {
    changeModel.call(this);
  }
}
// EXTERNAL MODULE: ./src/_core/init.js
var init = __webpack_require__(6);

// CONCATENATED MODULE: ./src/array/mediateitem.js
 // creates item mediator

function createItemMediator(_ref) {
  var arr = _ref.arr,
      mediator = _ref.mediator;
  return function itemMediator(value, index) {
    // args: value, old value, index, array itself
    return mediator.call(arr, value, index, arr);
  };
} // defines a "type" of every array item


function mediateItem(mediator) {
  var def = Object(init["a" /* default */])(this);
  var length = this.length; // store itemMediator in object definition

  var itemMediator = def.itemMediator = createItemMediator({
    arr: this,
    mediator: mediator
  }); // convert existing items

  for (var i = 0; i < length; i++) {
    this[i] = itemMediator(this[i], i);
  }

  return this;
}
// CONCATENATED MODULE: ./src/array/_cheaprecreate.js
// makes cheap array recreation (with no trackBy, with no events, with no item mediator etc)
function cheapRecreate(self) {
  var newItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var newLength = newItems.length;
  var oldLength = self.length;
  var lengthDiff = newLength - oldLength;

  for (var i = 0; i < newLength; i++) {
    self[i] = newItems[i];
  }

  for (var _i = 0; _i < lengthDiff; _i++) {
    delete self[_i + newLength];
  }

  self.length = newLength;
  return self;
}
// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/array/orderby/_pureorderby.js

// the function orders by given order data any array-like object
function pureOrderBy(arr, givenKeys, orders) {
  if ('length' in arr && typeof_default()(arr) === 'object') {
    var defaultOrder = 'asc';
    var commonOrder;

    if (!(orders instanceof Array)) {
      commonOrder = orders || defaultOrder;
    }

    var length = arr.length;
    var result = Array(length);

    for (var i = 0; i < length; i++) {
      result[i] = arr[i];
    }

    if (!givenKeys) {
      return result;
    }

    var keys = givenKeys instanceof Array ? givenKeys : [givenKeys];
    return result.sort(function (a, b) {
      if (a && b) {
        for (var _i = 0; _i < keys.length; _i++) {
          var key = keys[_i];
          var order = (commonOrder || orders[_i]) !== 'desc' ? -1 : 1;

          if (a[key] > b[key]) {
            return -order;
          }

          if (a[key] < b[key]) {
            return order;
          }
        }
      }

      return 0;
    });
  }

  return [];
}
// EXTERNAL MODULE: ./src/_core/defs.js
var defs = __webpack_require__(3);

// EXTERNAL MODULE: ./src/trigger/_triggerone.js
var _triggerone = __webpack_require__(2);

// EXTERNAL MODULE: ./src/parsebindings/index.js + 5 modules
var parsebindings = __webpack_require__(42);

// EXTERNAL MODULE: ./src/bindnode/index.js + 4 modules
var bindnode = __webpack_require__(13);

// EXTERNAL MODULE: ./src/unbindnode/index.js + 1 modules
var unbindnode = __webpack_require__(19);

// EXTERNAL MODULE: ./src/bindnode/_getnodes.js
var _getnodes = __webpack_require__(22);

// CONCATENATED MODULE: ./src/array/_processrendering/renderitemnode.js







var htmlTestReg = /</; // the function makes the main rendering job
// it renders given array item

function renderItemNode(_ref) {
  var selfDef = _ref.selfDef,
      self = _ref.self,
      item = _ref.item,
      eventOptions = _ref.eventOptions;
  var renderer = item.renderer,
      _item$bindRenderedAsS = item.bindRenderedAsSandbox,
      bindRenderedAsSandbox = _item$bindRenderedAsS === void 0 ? true : _item$bindRenderedAsS;
  var itemRenderer = self.itemRenderer;
  var usedRenderer = renderer || itemRenderer;
  var rendererContext = usedRenderer === renderer ? item : self;
  var selfId = selfDef.id;
  var moveSandbox = eventOptions.moveSandbox,
      forceRerender = eventOptions.forceRerender,
      silent = eventOptions.silent; // if renderer is not found return null as a node

  if (!usedRenderer) {
    return {
      node: null
    };
  }

  var itemDef = Object(init["a" /* default */])(item);
  var _itemDef$renderedInAr = itemDef.renderedInArrays,
      renderedInArrays = _itemDef$renderedInAr === void 0 ? {} : _itemDef$renderedInAr; // if moveSandbox option is truthy then return a sandbox of an item

  if (moveSandbox) {
    var sandboxPropDef = itemDef.props.sandbox;

    if (sandboxPropDef) {
      var bindings = sandboxPropDef.bindings;

      var _node = bindings ? bindings[0].node : null;

      if (_node) {
        for (var i = 0, keys = Object.keys(renderedInArrays); i < keys.length; i++) {
          var key = keys[i];

          if (_node === renderedInArrays[key]) {
            // delete an information about previous array
            delete renderedInArrays[key];
            break;
          }
        }

        renderedInArrays[selfId] = _node; // moving sandbox does not fire "render" event but it fire "afterrender"
        // since "afterrender" means "node is inserted to DOM"

        return {
          node: _node.__replacedByNode || _node,
          itemEventOptions: {
            node: _node,
            self: item,
            parentArray: self
          }
        };
      }
    }
  }

  itemDef.renderedInArrays = renderedInArrays; // if usedRenderer is function then call it

  if (typeof usedRenderer === 'function') {
    usedRenderer = usedRenderer.call(rendererContext, item);
  } // if usedRenderer is string


  if (typeof usedRenderer === 'string') {
    if (!htmlTestReg.test(usedRenderer)) {
      // if usedRenderer is a selector
      var selector = usedRenderer;
      usedRenderer = Object(_getnodes["a" /* default */])(self, selector);

      if (usedRenderer.length) {
        // if a node is found by given selector then use its HTML
        usedRenderer = usedRenderer[0].innerHTML.trim();
      } else {
        // if not throw an error
        throw Object(seempleerror["a" /* default */])('array:renderer_node_missing', {
          selector: selector
        });
      }
    } else {
      // if usedRenderer is HTML string
      usedRenderer = usedRenderer.trim();
    }
  } // pass a node or HTML


  var parsed = Object(parsebindings["a" /* default */])(item, usedRenderer, eventOptions); // if parseBindings returned more/less than one node then throw an error

  if (parsed.length !== 1) {
    throw Object(seempleerror["a" /* default */])('array:rendered_number_nodes', {
      length: parsed.length
    });
  }

  var node = renderedInArrays[selfId] = parsed[0];

  if (bindRenderedAsSandbox) {
    if (forceRerender) {
      Object(unbindnode["a" /* default */])(item, 'sandbox', null, null, eventOptions);
    }

    Object(bindnode["a" /* default */])(item, 'sandbox', node, null, eventOptions);
  } // if silent is not truthy then fire 'render' event and virtual methods


  if (!silent) {
    var itemEventOptions = {
      node: node,
      self: item,
      parentArray: self
    };
    var onRender = item.onRender;
    var onItemRender = self.onItemRender;

    if (onRender) {
      onRender.call(item, itemEventOptions);
    }

    if (onItemRender) {
      onItemRender.call(self, item, itemEventOptions);
    }

    Object(_triggerone["a" /* default */])(item, 'render', itemEventOptions);
    return {
      node: node.__replacedByNode || node,
      itemEventOptions: itemEventOptions
    };
  }

  return {
    node: node.__replacedByNode || node
  };
}
// CONCATENATED MODULE: ./src/array/_processrendering/checkalreadyrendered.js

 // checks is item already rendered in an array
// selfDef is given instead of itself (array) for perf optimisation

function checkAlreadyRendered(_ref) {
  var item = _ref.item,
      selfDef = _ref.selfDef;
  var itemDef = defs["a" /* default */].get(item);
  var selfId = selfDef.id; // if item object is defined in object defs

  if (itemDef) {
    var renderedInArrays = itemDef.renderedInArrays; // if item's node is already rendered for an array
    // then throw an error

    if (renderedInArrays && renderedInArrays[selfId]) {
      throw Object(seempleerror["a" /* default */])('array:add_render_twice');
    }
  }
}
// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// CONCATENATED MODULE: ./src/array/_processrendering/processpush.js




 // this function renders inserted items if possible when push method is called

function processPush(_ref) {
  var self = _ref.self,
      selfDef = _ref.selfDef,
      eventOptions = _ref.eventOptions,
      container = _ref.container;
  var added = eventOptions.added,
      silent = eventOptions.silent;
  Object(foreach["a" /* default */])(added, function (item) {
    if (item && typeof_default()(item) === 'object') {
      // if a node of an item is already rendered then throw an error
      checkAlreadyRendered({
        item: item,
        selfDef: selfDef
      }); // render

      var _renderItemNode = renderItemNode({
        selfDef: selfDef,
        self: self,
        item: item,
        eventOptions: eventOptions
      }),
          node = _renderItemNode.node,
          itemEventOptions = _renderItemNode.itemEventOptions;

      if (node) {
        container.appendChild(node);

        if (!silent) {
          Object(_triggerone["a" /* default */])(item, 'afterrender', itemEventOptions);
        }
      }
    }
  });
}
// CONCATENATED MODULE: ./src/array/_processrendering/processunshift.js



 // this function renders inserted items if possible when unshift or push method is called

function processUnshift(_ref) {
  var self = _ref.self,
      selfDef = _ref.selfDef,
      eventOptions = _ref.eventOptions,
      container = _ref.container;
  var added = eventOptions.added,
      silent = eventOptions.silent; // iterate over all added items in opposite order

  for (var i = added.length - 1; i + 1; i--) {
    var item = added[i];

    if (item && typeof_default()(item) === 'object') {
      // if a node of an item is already rendered then throw an error
      checkAlreadyRendered({
        item: item,
        selfDef: selfDef
      });

      var _renderItemNode = renderItemNode({
        selfDef: selfDef,
        self: self,
        item: item,
        eventOptions: eventOptions
      }),
          node = _renderItemNode.node,
          itemEventOptions = _renderItemNode.itemEventOptions;

      if (node) {
        if (container.firstChild) {
          container.insertBefore(node, container.firstChild);
        } else {
          container.appendChild(node);
        }

        if (!silent) {
          Object(_triggerone["a" /* default */])(item, 'afterrender', itemEventOptions);
        }
      }
    }
  }
}
// CONCATENATED MODULE: ./src/array/_processrendering/getalreadyrendered.js
 // returns already rendered node of an object in given array
// selfDef is given instead of  itself (array) for perf optimisation

function getAlreadyRendered(_ref) {
  var item = _ref.item,
      selfDef = _ref.selfDef;
  var itemDef = defs["a" /* default */].get(item);
  var selfId = selfDef.id; // if item object is defined in object defs

  if (itemDef) {
    var renderedInArrays = itemDef.renderedInArrays; // if item's node is already rendered for an array then return it

    if (renderedInArrays && renderedInArrays[selfId]) {
      var node = renderedInArrays[selfId];
      return node.__replacedByNode || node;
    }
  }

  return undefined;
}
// CONCATENATED MODULE: ./src/array/_processrendering/processrecreate.js






 // this function renders inserted items if possible when recreate method is called

function processRecreate(_ref) {
  var self = _ref.self,
      selfDef = _ref.selfDef,
      eventOptions = _ref.eventOptions,
      container = _ref.container;
  var removed = eventOptions.removed,
      silent = eventOptions.silent;
  var selfId = selfDef.id; // iterate over removed items and remove their nodes

  Object(foreach["a" /* default */])(removed, function (item) {
    var itemDef = defs["a" /* default */].get(item);

    if (itemDef) {
      var renderedInArrays = itemDef.renderedInArrays;
      var node = renderedInArrays && renderedInArrays[selfId];

      if (node) {
        delete itemDef.renderedInArrays[selfId];
        container.removeChild(node);
      }
    }
  });
  var alreadyRenderedMap = {}; // iterate over all items
  // the following approach allows to throw an error when two added objects are the same
  // (not only compare existing items with old ones)

  Object(foreach["a" /* default */])(self, function (item) {
    if (item && typeof_default()(item) === 'object') {
      var itemDef = defs["a" /* default */].get(item);
      var alreadyRenderedNode;

      if (itemDef) {
        alreadyRenderedNode = getAlreadyRendered({
          item: item,
          selfDef: selfDef
        });
      }

      if (alreadyRenderedNode) {
        // if an item is already rendered (old item)
        if (itemDef.id in alreadyRenderedMap) {
          // if an item is rendered twice throw an error
          throw Object(seempleerror["a" /* default */])('array:add_render_twice');
        }

        alreadyRenderedMap[itemDef.id] = true;
        container.appendChild(alreadyRenderedNode);
      } else {
        // this is newly added item
        var _renderItemNode = renderItemNode({
          selfDef: selfDef,
          self: self,
          item: item,
          eventOptions: eventOptions
        }),
            node = _renderItemNode.node,
            itemEventOptions = _renderItemNode.itemEventOptions;

        if (node) {
          // itemDef is defined at renderItemNode if not defined before
          // reload this variable
          itemDef = itemDef || defs["a" /* default */].get(item);

          if (itemDef.id in alreadyRenderedMap) {
            // if newly added item is rendered twice throw an error
            throw Object(seempleerror["a" /* default */])('array:add_render_twice');
          }

          alreadyRenderedMap[itemDef.id] = true;
          container.appendChild(node);

          if (!silent) {
            Object(_triggerone["a" /* default */])(item, 'afterrender', itemEventOptions);
          }
        }
      }
    }
  });
}
// CONCATENATED MODULE: ./src/array/_processrendering/processsort.js


 // this function gets called when array is sorted (via sort, orderBy or reverse)

function processSort(_ref) {
  var self = _ref.self,
      selfDef = _ref.selfDef,
      container = _ref.container;
  // just re-insert rendered nodes in new order
  Object(foreach["a" /* default */])(self, function (item) {
    if (item && typeof_default()(item) === 'object') {
      var node = getAlreadyRendered({
        item: item,
        selfDef: selfDef
      });

      if (node) {
        container.appendChild(node);
      }
    }
  });
}
// CONCATENATED MODULE: ./src/array/_processrendering/processremove.js


 // this function removes DOM nodes of removed items
// called on splice, pull, pop and shift

function processRemove(_ref) {
  var selfDef = _ref.selfDef,
      eventOptions = _ref.eventOptions,
      container = _ref.container;
  var removed = eventOptions.removed;
  var selfId = selfDef.id;
  Object(foreach["a" /* default */])(removed, function (item) {
    if (item && typeof_default()(item) === 'object') {
      var itemDef = defs["a" /* default */].get(item);

      if (itemDef) {
        var renderedInArrays = itemDef.renderedInArrays;
        var node = renderedInArrays && renderedInArrays[selfId];

        if (node) {
          delete renderedInArrays[selfId];
          container.removeChild(node);
        }
      }
    }
  });
}
// CONCATENATED MODULE: ./src/array/_processrendering/processrerender.js



 // this function re-inserts rendered DOM nodes of items
// if they are rendered and forceRerender is falsy
// and renders array items from scratch if they aren't rendered yet or forceRerender is truthy

function processRerender(_ref) {
  var self = _ref.self,
      selfDef = _ref.selfDef,
      eventOptions = _ref.eventOptions,
      container = _ref.container;
  var forceRerender = eventOptions.forceRerender,
      silent = eventOptions.silent; // iterate over all items

  for (var i = 0; i < self.length; i++) {
    var item = self[i];

    if (item && typeof_default()(item) === 'object') {
      var alreadyRenderedNode = getAlreadyRendered({
        item: item,
        selfDef: selfDef
      }); // if item is already rendered and forceRerender is falsy then re-insert DOM node
      // go to the next cycle iteration then

      if (!forceRerender && alreadyRenderedNode) {
        container.appendChild(alreadyRenderedNode);
        continue;
      } // node removal is called when an item is rendered
      // and forceRerender is truty


      if (alreadyRenderedNode) {
        if (container.contains(alreadyRenderedNode)) {
          container.removeChild(alreadyRenderedNode);
        }
      } // render new node


      var _renderItemNode = renderItemNode({
        selfDef: selfDef,
        self: self,
        item: item,
        eventOptions: eventOptions
      }),
          node = _renderItemNode.node,
          itemEventOptions = _renderItemNode.itemEventOptions;

      if (node) {
        container.appendChild(node);

        if (!silent) {
          Object(_triggerone["a" /* default */])(item, 'afterrender', itemEventOptions);
        }
      }
    }
  }
}
// CONCATENATED MODULE: ./src/array/_processrendering/processspliceadd.js





 // the function handles rendering of added items passed as third and rest arguments to splice method

function processSpliceAdd(_ref) {
  var self = _ref.self,
      selfDef = _ref.selfDef,
      eventOptions = _ref.eventOptions,
      container = _ref.container;
  var added = eventOptions.added,
      silent = eventOptions.silent;
  var nextIndex = self.lastIndexOf(added[added.length - 1]) + 1;
  var next = self[nextIndex];
  var nextNode; // get a node of an item which is placed next to the last added item
  // it is needed to insert newly rendered items before

  if (next && typeof_default()(next) === 'object') {
    nextNode = getAlreadyRendered({
      item: next,
      selfDef: selfDef
    });
  }

  Object(foreach["a" /* default */])(added, function (item) {
    if (item && typeof_default()(item) === 'object') {
      // throw an error if node of an item is alread rendered
      checkAlreadyRendered({
        item: item,
        selfDef: selfDef
      });

      var _renderItemNode = renderItemNode({
        selfDef: selfDef,
        self: self,
        item: item,
        eventOptions: eventOptions
      }),
          node = _renderItemNode.node,
          itemEventOptions = _renderItemNode.itemEventOptions;

      if (node) {
        if (nextNode) {
          container.insertBefore(node, nextNode);
        } else {
          container.appendChild(node);
        }

        if (!silent) {
          Object(_triggerone["a" /* default */])(item, 'afterrender', itemEventOptions);
        }
      }
    }
  });
}
// CONCATENATED MODULE: ./src/array/_processrendering/index.js








 // makes possible to render array items based on a name of called method

function processRendering(_ref) {
  var self = _ref.self,
      eventOptions = _ref.eventOptions;
  var method = eventOptions.method,
      added = eventOptions.added,
      removed = eventOptions.removed; // nodes object always exist at Seemple instances

  var container = self.nodes.container || self.nodes.sandbox;
  var selfDef = defs["a" /* default */].get(self);

  if (!container) {
    return;
  }

  switch (method) {
    case 'fill':
    case 'copyWithin':
      throw Object(seempleerror["a" /* default */])('array:method_compat_renderer', {
        method: method
      });

    case 'push':
      processPush({
        self: self,
        selfDef: selfDef,
        eventOptions: eventOptions,
        container: container
      });
      break;

    case 'unshift':
      processUnshift({
        self: self,
        selfDef: selfDef,
        eventOptions: eventOptions,
        container: container
      });
      break;

    case 'pull':
    case 'pop':
    case 'shift':
      processRemove({
        self: self,
        selfDef: selfDef,
        eventOptions: eventOptions,
        container: container
      });
      break;

    case 'sort':
    case 'reverse':
      processSort({
        self: self,
        selfDef: selfDef,
        eventOptions: eventOptions,
        container: container
      });
      break;

    case 'rerender':
      processRerender({
        self: self,
        selfDef: selfDef,
        eventOptions: eventOptions,
        container: container
      });
      break;

    case 'recreate':
      processRecreate({
        self: self,
        selfDef: selfDef,
        eventOptions: eventOptions,
        container: container
      });
      break;

    case 'splice':
      if (added.length) {
        processSpliceAdd({
          self: self,
          selfDef: selfDef,
          eventOptions: eventOptions,
          container: container
        });
      }

      if (removed.length) {
        processRemove({
          self: self,
          selfDef: selfDef,
          eventOptions: eventOptions,
          container: container
        });
      }

      break;

    default:
  }
}
// CONCATENATED MODULE: ./src/array/_reportmodified.js


 // fires events and triggers rendering logic

function reportModified(self, eventOptions) {
  var added = eventOptions.added,
      removed = eventOptions.removed,
      silent = eventOptions.silent,
      method = eventOptions.method,
      dontRender = eventOptions.dontRender;
  var addedLength = added.length;
  var removedLength = removed.length;
  var modified = addedLength || removedLength || method === 'sort' || method === 'reverse';

  var _defs$get = defs["a" /* default */].get(self),
      events = _defs$get.events;

  var _self$renderIfPossibl = self.renderIfPossible,
      renderIfPossible = _self$renderIfPossibl === void 0 ? true : _self$renderIfPossibl;
  var asteriskAddEvtName = '_asterisk:add';
  var asteriskRemoveEvtName = '_asterisk:remove'; // if something is added and an array has delegated "asterisk" events
  // then attatch delegated event handlers to newly added items

  if (addedLength && events[asteriskAddEvtName]) {
    Object(_triggerone["a" /* default */])(self, asteriskAddEvtName, eventOptions);
  } // if something is removed and an array has delegated "asterisk" events
  // then remove delegated event handlers from removed items


  if (removedLength && events[asteriskRemoveEvtName]) {
    Object(_triggerone["a" /* default */])(self, asteriskRemoveEvtName, eventOptions);
  }

  if (!silent) {
    // fire additional event name (like "push")
    if (events[method]) {
      Object(_triggerone["a" /* default */])(self, method, eventOptions);
    } // if something is added then fire add and addone events


    if (addedLength) {
      if (events.add) {
        Object(_triggerone["a" /* default */])(self, 'add', eventOptions);
      }

      if (events.addone) {
        for (var i = 0; i < addedLength; i++) {
          Object(_triggerone["a" /* default */])(self, 'addone', {
            self: self,
            addedItem: added[i]
          });
        }
      }
    } // if something is removed then fire add and addone events


    if (removedLength) {
      if (events.remove) {
        Object(_triggerone["a" /* default */])(self, 'remove', eventOptions);
      }

      if (events.removeone) {
        for (var _i = 0; _i < removedLength; _i++) {
          Object(_triggerone["a" /* default */])(self, 'removeone', {
            self: self,
            removedItem: removed[_i]
          });
        }
      }
    } // modify event says that something is added or removed


    if (events.modify) {
      Object(_triggerone["a" /* default */])(self, 'modify', eventOptions);
    }
  } // trigger rendering logic if possible


  if (modified && !dontRender && renderIfPossible) {
    processRendering({
      self: self,
      eventOptions: eventOptions
    });
  }
}
// CONCATENATED MODULE: ./src/array/orderby/index.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



 // sorts by properties of items

function orderBy(keys, orders) {
  var eventOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (this.length > 1) {
    cheapRecreate(this, pureOrderBy(this, keys, orders));
    reportModified(this, _objectSpread({
      method: 'sort',
      // makes possible to listen "sort" event
      self: this,
      added: [],
      removed: []
    }, eventOptions));
  }

  return this;
}
// CONCATENATED MODULE: ./src/array/pull.js



function pull_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function pull_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { pull_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { pull_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


 // removes array item by given index

function shift(arr, index) {
  for (var i = index; i < arr.length; i++) {
    arr[i] = arr[i + 1];
  }

  delete arr[arr.length - 1];
  arr.length -= 1;
} // finds array item that equals to given value and removes it
// returns removed value


function pullByValue(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      shift(arr, i);
      return value;
    }
  }

  return undefined;
} // removes array item by given index if the index is not over array length
// returns removed value


function pullByIndex(arr, index) {
  if (index < arr.length) {
    var value = arr[index];
    shift(arr, index);
    return value;
  }

  return undefined;
} // removes an array item by index (if number is given) or by value (if object is given)


function pull(toRemove) {
  var eventOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var typeofToRemove = typeof_default()(toRemove);

  var removed;

  if (toRemove && typeofToRemove === 'object') {
    removed = pullByValue(this, toRemove);
  } else if (typeofToRemove === 'number') {
    removed = pullByIndex(this, toRemove);
  } else {
    throw Object(seempleerror["a" /* default */])('pull:to_remove_type', {
      toRemove: toRemove
    });
  }

  if (typeof removed !== 'undefined') {
    reportModified(this, pull_objectSpread({
      method: 'pull',
      self: this,
      added: [],
      removed: [removed]
    }, eventOptions));
  }

  return removed;
}
// EXTERNAL MODULE: ./src/_helpers/forown.js
var forown = __webpack_require__(5);

// CONCATENATED MODULE: ./src/array/recreate/_updateobject.js
 // updates one single object by new data
// for Seemple.Array instance call recreate method
// for Seemple.Object instance call setData method
// for other objects just extend them by properties of data parameter

function updateObject(instance, data) {
  if (instance.isSeempleArray) {
    instance.recreate(data);
  } else if (instance.isSeempleObject) {
    // QUESTION: Is it OK to just extend but not replace instance data?
    instance.setData(data);
  } else {
    Object(forown["a" /* default */])(data, function (value, key) {
      instance[key] = value;
    });
  }

  return instance;
}
// CONCATENATED MODULE: ./src/array/recreate/_updatetracked.js

 // the function gets called to update new items passed to recreate method when trackBy is present
// TODO: Throw an error when two or more items of one array has the same value of trackBy

function updateTracked(_ref) {
  var givenNewItems = _ref.givenNewItems,
      arr = _ref.arr,
      trackBy = _ref.trackBy;
  var newLength = givenNewItems.length;
  var oldLength = arr.length;
  var newItems = Array(newLength);

  if (trackBy === '$index') {
    // simply update items with the same index
    for (var i = 0; i < newLength; i++) {
      var item = arr[i];
      var newItem = givenNewItems[i];

      if (item && typeof_default()(item) === 'object' && newItem && typeof_default()(newItem) === 'object') {
        newItems[i] = updateObject(item, newItem);
      } else {
        newItems[i] = newItem;
      }
    }
  } else {
    var trackMap = {}; // fill trackMap object where keys are values of trackBy and values are corresponding items

    for (var _i = 0; _i < oldLength; _i++) {
      var _item = arr[_i];

      if (_item && typeof_default()(_item) === 'object') {
        if (trackBy in _item) {
          trackMap[_item[trackBy]] = _item;
        }
      }
    }

    for (var _i2 = 0; _i2 < newLength; _i2++) {
      var _newItem = givenNewItems[_i2];

      if (_newItem && typeof_default()(_newItem) === 'object') {
        var _item2 = arr[_i2];

        if (_item2 && typeof_default()(_item2) === 'object' && _newItem[trackBy] in trackMap) {
          // if an item exists at trackMap then update it
          newItems[_i2] = updateObject(trackMap[_newItem[trackBy]], _newItem);
        } else {
          // if not then use new value as is
          newItems[_i2] = _newItem;
        }
      } else {
        // newItem is not an object
        newItems[_i2] = _newItem;
      }
    }
  }

  return newItems;
}
// CONCATENATED MODULE: ./src/array/recreate/index.js


function recreate_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function recreate_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { recreate_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { recreate_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



 // recreates an array

function recreate() {
  var givenNewItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var eventOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var def = Object(init["a" /* default */])(this);
  var itemMediator = def.itemMediator;
  var newLength = givenNewItems.length;
  var oldLength = this.length;
  var lengthDiff = oldLength - newLength;
  var was = this.toJSON(false);
  var trackBy = this.trackBy;
  var skipItemMediator = eventOptions.skipItemMediator,
      silent = eventOptions.silent,
      dontRender = eventOptions.dontRender;
  var added;
  var removed;
  var newItems;

  if (trackBy) {
    // if trackBy property is given then update givenNewItems array
    newItems = updateTracked({
      arr: this,
      givenNewItems: givenNewItems,
      trackBy: trackBy
    });
  } else {
    // if trackBy is not given then use given new items as is
    newItems = givenNewItems;
  } // call item mediator for every new item (but don't modify passed newItems)


  if (itemMediator && !skipItemMediator) {
    var toMediate = newItems;
    newItems = Array(newLength);

    for (var i = 0; i < newLength; i++) {
      newItems[i] = itemMediator(toMediate[i], i);
    }
  } // update array indexes with new values


  for (var _i = 0; _i < newLength; _i++) {
    this[_i] = newItems[_i];
  } // remove old items that is out of new length


  for (var _i2 = 0; _i2 < lengthDiff; _i2++) {
    delete this[_i2 + newLength];
  } // update length


  this.length = newLength;

  if (silent && dontRender) {
    return this;
  } // create an array of removed items
  // TODO: Optimize creation of "added" and "removed" options in recreate method
  // ... (do not use indexOf)


  if (newLength) {
    if (oldLength) {
      removed = [];

      for (var _i3 = 0; _i3 < oldLength; _i3++) {
        if (!~newItems.indexOf(was[_i3])) {
          removed.push(was[_i3]);
        }
      }
    } else {
      removed = [];
    }
  } else {
    removed = was;
  } // create an array of added items


  if (oldLength) {
    if (newLength) {
      added = [];

      for (var _i4 = 0; _i4 < newLength; _i4++) {
        if (!~was.indexOf(newItems[_i4])) {
          added.push(newItems[_i4]);
        }
      }
    } else {
      added = [];
    }
  } else {
    added = newItems;
  }

  reportModified(this, recreate_objectSpread({
    added: added,
    removed: removed,
    method: 'recreate',
    self: this
  }, eventOptions));
  return this;
}
// CONCATENATED MODULE: ./src/array/rerender.js


function rerender_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function rerender_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { rerender_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { rerender_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

 // rerenders not rendered items in an array
// force rerender when forceRerender event option is truthy

function rerender() {
  var eventOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _this$renderIfPossibl = this.renderIfPossible,
      renderIfPossible = _this$renderIfPossibl === void 0 ? true : _this$renderIfPossibl;

  if (renderIfPossible) {
    processRendering({
      self: this,
      eventOptions: rerender_objectSpread({
        method: 'rerender',
        added: [],
        removed: []
      }, eventOptions)
    });
  }

  return this;
}
// CONCATENATED MODULE: ./src/array/restore.js


function restore_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function restore_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { restore_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { restore_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






 // restores Seemple.Array from external nodes

function restore(selector) {
  var _this = this;

  var eventOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var selfDef = Object(init["a" /* default */])(this);
  var Model = this.Model;
  var silent = eventOptions.silent;
  var newItems = [];
  var nodes;

  if (typeof selector === 'string') {
    // get nodes by selector
    nodes = Object(_getnodes["a" /* default */])(this, selector);
  } else {
    // get nodes from rendering container
    var container = this.nodes.container || this.nodes.sandbox;

    if (container) {
      nodes = container.children;
    } else {
      // no container is bound, throw an error
      throw Object(seempleerror["a" /* default */])('restore:no_nodes');
    }
  }

  Object(foreach["a" /* default */])(nodes, function (node, index) {
    var item = Model ? new Model({}, _this, index) : {}; // create new item

    var bindRenderedAsSandbox = item.bindRenderedAsSandbox;
    var itemDef = Object(init["a" /* default */])(item);
    itemDef.renderedInArrays = defineProperty_default()({}, selfDef.id, node);

    if (bindRenderedAsSandbox !== false) {
      Object(bindnode["a" /* default */])(item, 'sandbox', node, null, eventOptions);
    }

    if (!silent) {
      // trigger needed events
      var itemEventOptions = {
        node: node,
        self: item,
        parentArray: _this
      };
      var onRender = item.onRender;
      var onItemRender = _this.onItemRender;

      if (onRender) {
        onRender.call(item, itemEventOptions);
      }

      if (onItemRender) {
        onItemRender.call(_this, item, itemEventOptions);
      }

      Object(_triggerone["a" /* default */])(item, 'render', itemEventOptions); // call afterrender immediately because a node already exists in DOM tree

      Object(_triggerone["a" /* default */])(item, 'afterrender', itemEventOptions);
    }

    newItems.push(item);
  }); // recreate an array but don't render newly added items

  return this.recreate(newItems, restore_objectSpread({
    dontRender: true
  }, eventOptions));
}
// CONCATENATED MODULE: ./src/array/tojson.js
 // converts Seemple.Array instance to ordinary array

function toJSON() {
  var recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var result = new Array(this.length);
  Object(foreach["a" /* default */])(this, function (item, index) {
    // when recursive is true and when an item has toJSON method then call it recusively
    if (recursive && item && typeof item.toJSON === 'function') {
      result[index] = item.toJSON(true);
    } else {
      result[index] = item;
    }
  });
  return result;
}
// CONCATENATED MODULE: ./src/array/_toseemplearray.js
 // converts array-like to Seemple.Array instance

function toSeempleArray(arrayLike) {
  // fix circular dependency issue
  var SeempleArray = __webpack_require__(26)["default"];

  var result = new SeempleArray(arrayLike.length);
  Object(foreach["a" /* default */])(arrayLike, function (item, index) {
    result[index] = item;
  });
  return result;
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/createsortingmethod.js



 // creates sorting method and returns it (sort, reverse, sort_, reverse_)

function createSortingMethod(name, hasOptions) {
  return function pseudoNativeMethod(sortCallback) {
    if (this.length < 2) return this;
    Object(init["a" /* default */])(this);
    var givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
    var method = Array.prototype[name];
    var eventOptions = {
      method: name,
      self: this,
      added: [],
      removed: []
    }; // call original method

    if (name === 'sort' && typeof sortCallback === 'function') {
      method.call(this, sortCallback);
    } else {
      method.call(this);
    } // extend event options by custom event options if they are given


    if (hasOptions) {
      if (givenEventOptions && typeof_default()(givenEventOptions) === 'object') {
        Object(_helpers_assign["a" /* default */])(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);
    return this;
  };
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/createremovingmethod.js



 // creates removing method and returns it (pop, shift, pop_, shift_)

function createRemovingMethod(name, hasOptions) {
  return function pseudoNativeMethod(givenEventOptions) {
    if (!this.length) {
      return undefined;
    }

    Object(init["a" /* default */])(this); // call original method

    var returns = Array.prototype[name].call(this);
    var eventOptions = {
      method: name,
      self: this,
      added: [],
      removed: [returns]
    }; // extend event options by custom event options if they are given

    if (hasOptions) {
      if (givenEventOptions && typeof_default()(givenEventOptions) === 'object') {
        Object(_helpers_assign["a" /* default */])(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);
    return returns;
  };
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/createaddingmethod.js



 // creates methods: push, unshift, push_, unshift_

function createAddingMethod(name, hasOptions) {
  return function pseudoNativeMethod() {
    var _initSeemple = Object(init["a" /* default */])(this),
        itemMediator = _initSeemple.itemMediator; // +hasOptions is converted to 0 or 1 depending on its value (false/true)


    var argsLength = arguments.length - +hasOptions;
    var args = Array(argsLength);
    var givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
    var useMediator = typeof itemMediator === 'function' && (!givenEventOptions || !givenEventOptions.skipItemMediator);
    var isPush = name === 'push';
    var length = this.length; // if no arguments are passed

    if (!argsLength) {
      return length;
    } // convert arguments to array and call item mediator on every item if it's possible


    for (var i = 0; i < argsLength; i++) {
      var arg = arguments[i];

      if (useMediator) {
        var index = isPush ? i + length : i;
        args[i] = itemMediator(arg, index);
      } else {
        args[i] = arg;
      }
    }

    if (isPush) {
      // insert new items to the end of array
      for (var _i = 0; _i < argsLength; _i++) {
        this[length + _i] = args[_i];
      }
    } else {
      // move current items to new indexes
      for (var _i2 = length - 1; _i2 >= 0; _i2--) {
        this[argsLength + _i2] = this[_i2];
      } // insert new items to the begin of array


      for (var _i3 = 0; _i3 < argsLength; _i3++) {
        this[_i3] = args[_i3];
      }
    } // update length


    length += argsLength;
    this.length = length;
    var eventOptions = {
      method: name,
      self: this,
      added: args,
      removed: []
    }; // extend event options by custom event options if they are given

    if (hasOptions) {
      if (givenEventOptions && typeof_default()(givenEventOptions) === 'object') {
        Object(_helpers_assign["a" /* default */])(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);
    return length;
  };
}
// EXTERNAL MODULE: ./src/_helpers/apply.js
var apply = __webpack_require__(10);

// CONCATENATED MODULE: ./src/array/_pseudonativemethods/createsplice.js





 // creates splice or splice_ method and returns it
// TODO: Improve readability of createSplice function

function createSplice(hasOptions) {
  return function pseudoNativeMethod() {
    var _initSeemple = Object(init["a" /* default */])(this),
        itemMediator = _initSeemple.itemMediator;

    var functionArguments = arguments;
    var argsLength = functionArguments.length - +hasOptions;
    var args = Array(argsLength);
    var givenEventOptions = hasOptions ? functionArguments[functionArguments.length - 1] : null;
    var useMediator = typeof itemMediator === 'function' && (!givenEventOptions || !givenEventOptions.skipItemMediator);
    var added = [];
    var start = args[0];
    var length = this.length;
    start = start < 0 ? length + start : start; // convert arguments to array and call item mediator on every new item if it's possible

    args[0] = functionArguments[0];
    args[1] = functionArguments[1];

    for (var i = 2; i < argsLength; i++) {
      var arg = functionArguments[i];

      if (useMediator) {
        args[i] = itemMediator(arg, start + (i - 2));
      } else {
        args[i] = arg;
      }

      added[i - 2] = args[i];
    } // call original method
    // TODO: Change array manually in splice method for better performance


    var returns = Object(apply["a" /* default */])(Array.prototype.splice, this, args); // removed items mean returned items

    var removed = returns; // if something is added or removed

    if (added.length || removed.length) {
      var eventOptions = {
        added: added,
        removed: removed,
        method: 'splice',
        self: this
      }; // extend event options by custom event options if they are given

      if (hasOptions) {
        if (givenEventOptions && typeof_default()(givenEventOptions) === 'object') {
          Object(_helpers_assign["a" /* default */])(eventOptions, givenEventOptions);
        }
      }

      reportModified(this, eventOptions);
    }

    return toSeempleArray(returns);
  };
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/createcopywithin.js





function createCopyWithin(hasOptions) {
  return function copyWithin() {
    var originalCopyWithin = Array.prototype.copyWithin;
    /* istanbul ignore if  */

    if (typeof originalCopyWithin !== 'function') {
      throw Object(seempleerror["a" /* default */])('array:nonexistent_method', {
        method: 'copyWithin'
      });
    } // +hasOptions is converted to 0 or 1 depending on its value (false/true)


    var argsLength = arguments.length - +hasOptions;
    var args = Array(argsLength);
    var givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;

    for (var i = 0; i < argsLength; i++) {
      args[i] = arguments[i];
    }

    Object(apply["a" /* default */])(originalCopyWithin, this, args);
    var eventOptions = {
      method: 'copyWithin',
      self: this,
      added: [],
      removed: []
    }; // extend event options by custom event options if they are given

    if (hasOptions) {
      if (givenEventOptions && typeof_default()(givenEventOptions) === 'object') {
        Object(_helpers_assign["a" /* default */])(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);
    return this;
  };
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/createfill.js





function createFill(hasOptions) {
  return function fill(value) {
    var originalFill = Array.prototype.fill;
    /* istanbul ignore if  */

    if (typeof originalFill !== 'function') {
      throw Object(seempleerror["a" /* default */])('array:nonexistent_method', {
        method: 'fill'
      });
    } // +hasOptions is converted to 0 or 1 depending on its value (false/true)


    var argsLength = arguments.length - +hasOptions;
    var args = Array(argsLength);
    var givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;

    for (var i = 0; i < argsLength; i++) {
      args[i] = arguments[i];
    }

    Object(apply["a" /* default */])(originalFill, this, args);
    var eventOptions = {
      method: 'fill',
      self: this,
      added: [value],
      removed: []
    }; // extend event options by custom event options if they are given

    if (hasOptions) {
      if (givenEventOptions && typeof_default()(givenEventOptions) === 'object') {
        Object(_helpers_assign["a" /* default */])(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);
    return this;
  };
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/createpseudonativemethod.js









var arrayPrototype = Array.prototype; // creates pseudo native method and returns it (push, push_, sort, sort_...)

function createPseudoNativeMethod(name) {
  var hasOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  switch (name) {
    case 'forEach':
      return function pseudoNativeMethod(callback, thisArg) {
        arrayPrototype[name].call(this, callback, thisArg); // return this for nicer chain calls

        return this;
      };

    case 'map':
    case 'filter':
    case 'slice':
      // TODO: Improve readability of pseudoNativeMethod, arguments "a, b" look not good
      return function pseudoNativeMethod(a, b) {
        return toSeempleArray(arrayPrototype[name].call(this, a, b));
      };

    case 'every':
    case 'some':
    case 'findIndex':
    case 'find':
      return function pseudoNativeMethod(callback, thisArg) {
        var originalMethod = arrayPrototype[name];
        /* istanbul ignore if  */

        if (typeof originalMethod !== 'function') {
          throw Object(seempleerror["a" /* default */])('array:nonexistent_method', {
            method: name
          });
        }

        return originalMethod.call(this, callback, thisArg);
      };

    case 'join':
      return function pseudoNativeMethod() {
        var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ',';
        return arrayPrototype[name].call(this, separator);
      };

    case 'indexOf':
    case 'lastIndexOf':
    case 'includes':
      return function pseudoNativeMethod(searchElement, fromIndex) {
        var originalMethod = arrayPrototype[name];
        /* istanbul ignore if  */

        if (typeof originalMethod !== 'function') {
          throw Object(seempleerror["a" /* default */])('array:nonexistent_method', {
            method: name
          });
        }

        if (typeof fromIndex === 'undefined') {
          return originalMethod.call(this, searchElement);
        }

        return originalMethod.call(this, searchElement, fromIndex);
      };

    case 'reduce':
    case 'reduceRight':
      return function pseudoNativeMethod() {
        return Object(apply["a" /* default */])(arrayPrototype[name], this, arguments);
      };

    case 'sort':
    case 'reverse':
      return createSortingMethod(name, hasOptions);

    case 'pop':
    case 'shift':
      return createRemovingMethod(name, hasOptions);

    case 'push':
    case 'unshift':
      return createAddingMethod(name, hasOptions);

    case 'splice':
      return createSplice(hasOptions);

    case 'copyWithin':
      return createCopyWithin(hasOptions);

    case 'fill':
      return createFill(hasOptions);

    default:
      return undefined;
  }
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/concat.js


 // the method works just like Array.prototype.concat but
// - flattens both Array and Seemple.Array
// - returns Seemple.Array

function concat() {
  // fix circular dependency issue
  var SeempleArray = __webpack_require__(26)["default"];

  var args = Array(arguments.length); // convert all instances of Seemple.Array to Array

  Object(foreach["a" /* default */])(arguments, function (arg, index) {
    if (arg && typeof_default()(arg) === 'object' && arg.isSeempleArray) {
      args[index] = arg.toJSON(false);
    } else {
      args[index] = arg;
    }
  }); // call original concat method

  var nativeCallResult = Object(apply["a" /* default */])(Array.prototype.concat, this.toJSON(false), args); // convert returned value to Seemple.Array

  var result = new SeempleArray();
  Object(foreach["a" /* default */])(nativeCallResult, function (item, index) {
    result[index] = item;
  });
  result.length = nativeCallResult.length;
  return result;
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/keys.js
// returns indexes
function keys_keys() {
  var length = this.length;
  var result = new Array(length);

  for (var i = 0; i < length; i++) {
    result[i] = i;
  }

  return result;
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/values.js
// returns values
function values() {
  var length = this.length;
  var result = new Array(length);

  for (var i = 0; i < length; i++) {
    result[i] = this[i];
  }

  return result;
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/entries.js
// returns pairs like [index, value]
function entries_values() {
  var length = this.length;
  var result = new Array(length);

  for (var i = 0; i < length; i++) {
    result[i] = [i, this[i]];
  }

  return result;
}
// CONCATENATED MODULE: ./src/array/_pseudonativemethods/index.js





var splitBySpaceReg = /\s+/;
var methods = {
  concat: concat,
  keys: keys_keys,
  values: values,
  entries: entries_values
};
"push pop unshift shift sort reverse splice map filter slice every some reduce reduceRight\nforEach join indexOf lastIndexOf copyWithin fill includes find findIndex".split(splitBySpaceReg).forEach(function (name) {
  methods[name] = createPseudoNativeMethod(name);
});
'push pop unshift shift sort reverse splice copyWithin fill'.split(splitBySpaceReg).forEach(function (name) {
  methods["".concat(name, "_")] = createPseudoNativeMethod(name, true);
});
/* harmony default export */ var _pseudonativemethods = (methods);
// CONCATENATED MODULE: ./src/array/iterator.js
// Symbol.iterator of Seemple.Array instances
function seempleArrayIterator() {
  var _this = this;

  var i = 0;
  return {
    next: function next() {
      if (i > _this.length - 1) {
        return {
          done: true
        };
      }

      return {
        done: false,
        value: _this[i++] // eslint-disable-line no-plusplus

      };
    }
  };
}
// CONCATENATED MODULE: ./src/array/_prototype.js












var symbolIterator = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';
/* harmony default export */ var _prototype = (Object(_helpers_assign["a" /* default */])(defineProperty_default()({
  _afterInit: afterSeempleArrayInit,
  mediateItem: mediateItem,
  orderBy: orderBy,
  pull: pull,
  recreate: recreate,
  rerender: rerender,
  restore: restore,
  toJSON: toJSON,
  length: 0,
  isSeempleArray: true
}, symbolIterator, seempleArrayIterator), _pseudonativemethods));
// CONCATENATED MODULE: ./src/array/from.js
 // creates a new Seemple.Array instance from an array-like or iterable object

function from(arrayLike, mapFn, thisArg) {
  // allow to inherit this method by child classes
  // require('./') fixes circular ref issue
  var ParentClass = typeof this === 'function' ? this : __webpack_require__(26)["default"];
  var result = new ParentClass();
  var length = arrayLike.length;
  var arrayFrom = Array.from;
  var newItems;
  /* istanbul ignore else */

  if (typeof arrayFrom === 'function') {
    // if Array.from exist, let it do all the job (work with iterable objects etc)
    newItems = arrayFrom(arrayLike, mapFn, thisArg);
  } else {
    // convert array-like object for older browsers
    // @IE
    newItems = Array(length);

    for (var i = 0; i < length; i++) {
      if (typeof mapFn === 'function') {
        newItems[i] = mapFn.call(thisArg, arrayLike[i], i, arrayLike);
      } else {
        newItems[i] = arrayLike[i];
      }
    }
  }

  return cheapRecreate(result, newItems);
}
// CONCATENATED MODULE: ./src/array/of.js

 // creates a new Seemple.Array instance with a variable number of arguments,
// regardless of number or type of the arguments

function of() {
  var _arguments = arguments;
  // allow to inherit this method by child classes
  // require('./') fixes circular ref issue
  var ParentClass = typeof this === 'function' ? this : __webpack_require__(26)["default"];
  var result = new ParentClass();
  var newItems = Array(arguments.length);
  Object(foreach["a" /* default */])(arguments, function (item, index) {
    newItems[index] = _arguments[index];
  });
  return cheapRecreate(result, newItems);
}
// CONCATENATED MODULE: ./src/array/_staticmembers.js
 // lol


/* harmony default export */ var _staticmembers = ({
  of: of,
  from: from
});
// CONCATENATED MODULE: ./src/array/index.js






_prototype["extends"] = seemple["default"];

_prototype.constructor = function SeempleArray(length) {
  if (!(this instanceof SeempleArray)) {
    throw Object(seempleerror["a" /* default */])('common:call_class');
  }

  Object(init["a" /* default */])(this); // repeat the same logic as for native Array

  if (arguments.length === 1 && typeof length === 'number') {
    this.length = length;
  } else if (arguments.length) {
    this.recreate(arguments, {
      silent: true,
      dontRender: true
    });
  } // return is used to make possible to chain super() calls


  return this;
};

var array_SeempleArray = Object(src_class["a" /* default */])(_prototype, _staticmembers);
/* harmony default export */ var array = __webpack_exports__["default"] = (array_SeempleArray);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./src/_core/init.js
var init = __webpack_require__(6);

// EXTERNAL MODULE: ./src/_helpers/checkobjecttype.js
var checkobjecttype = __webpack_require__(9);

// EXTERNAL MODULE: ./src/_helpers/seempleerror.js
var seempleerror = __webpack_require__(4);

// EXTERNAL MODULE: ./src/_helpers/assign.js
var _helpers_assign = __webpack_require__(7);

// EXTERNAL MODULE: ./src/_helpers/debounce.js
var debounce = __webpack_require__(25);

// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// EXTERNAL MODULE: ./src/_helpers/forown.js
var forown = __webpack_require__(5);

// EXTERNAL MODULE: ./src/on/_addlistener.js
var _addlistener = __webpack_require__(11);

// EXTERNAL MODULE: ./src/on/_addtreelistener.js
var _addtreelistener = __webpack_require__(43);

// CONCATENATED MODULE: ./src/calc/_addsource.js



 // adds a source to a source list and adds needed event listener to a it

function addSource(_ref) {
  var calcHandler = _ref.calcHandler,
      allSources = _ref.allSources,
      sourceKey = _ref.sourceKey,
      sourceObject = _ref.sourceObject,
      eventOptions = _ref.eventOptions;
  var _eventOptions$exactKe = eventOptions.exactKey,
      exactKey = _eventOptions$exactKe === void 0 ? false : _eventOptions$exactKe;
  var isDelegated = false; // source key must be a string

  if (typeof sourceKey !== 'string') {
    throw Object(seempleerror["a" /* default */])('calc:source_key_type', {
      sourceKey: sourceKey
    });
  } // source object must be an object


  if (!sourceObject || typeof_default()(sourceObject) !== 'object') {
    throw Object(seempleerror["a" /* default */])('calc:source_object_type', {
      sourceObject: sourceObject
    });
  }

  if (!exactKey) {
    var deepPath = sourceKey.split('.'); // if something like a.b.c is used as a key

    if (deepPath.length > 1) {
      isDelegated = true; // TODO: Avoid collisions with bindings by using another event name
      // ... instead of _change:tree:xxx

      Object(_addtreelistener["a" /* default */])(sourceObject, deepPath, calcHandler);
    } else {
      exactKey = true;
    }
  }

  if (exactKey) {
    // normal handler
    Object(_addlistener["a" /* default */])(sourceObject, "_change:deps:".concat(sourceKey), calcHandler);
  }

  allSources.push({
    sourceKey: sourceKey,
    sourceObject: sourceObject,
    isDelegated: isDelegated
  });
}
// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(8);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/set.js
var set = __webpack_require__(16);

// CONCATENATED MODULE: ./src/_helpers/deepfind.js
// gets value of a property in nested object
// eg "d" from a.b.c.d
function deepFind(obj, givenPath) {
  var paths = typeof givenPath === 'string' ? givenPath.split('.') : givenPath;
  var current = obj;

  for (var i = 0; i < paths.length; ++i) {
    if (typeof current[paths[i]] === 'undefined') {
      return undefined;
    }

    current = current[paths[i]];
  }

  return current;
}
// EXTERNAL MODULE: ./src/_helpers/apply.js
var apply = __webpack_require__(10);

// CONCATENATED MODULE: ./src/calc/_createcalchandler.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }




 // creates event handler for target object which will be fired when a source is changed

function createCalcHandler(_ref) {
  var object = _ref.object,
      eventOptions = _ref.eventOptions,
      allSources = _ref.allSources,
      target = _ref.target,
      def = _ref.def,
      handler = _ref.handler;
  return function calcHandler() {
    var changeEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var values = [];
    var _changeEvent$protecto = changeEvent.protector,
        protector = _changeEvent$protecto === void 0 ? {} : _changeEvent$protecto;
    var protectKey = target + def.id;
    var promiseCalc = eventOptions.promiseCalc;

    var setEventOptions = _objectSpread({
      protector: protector
    }, eventOptions, {}, changeEvent);

    if (protectKey in protector) {
      return;
    }

    protector[protectKey] = true;
    Object(foreach["a" /* default */])(allSources, function (_ref2) {
      var sourceObject = _ref2.sourceObject,
          sourceKey = _ref2.sourceKey,
          isDelegated = _ref2.isDelegated;
      var value = isDelegated ? deepFind(sourceObject, sourceKey) : sourceObject[sourceKey];
      values.push(value);
    });
    var targetValue = Object(apply["a" /* default */])(handler, object, values);

    if (promiseCalc) {
      if (!(targetValue instanceof Promise)) {
        targetValue = Promise.resolve(targetValue);
      }

      targetValue.then(function (promiseResult) {
        return Object(set["a" /* default */])(object, target, promiseResult, setEventOptions);
      })["catch"](function (e) {
        throw Error(e);
      });
    } else {
      Object(set["a" /* default */])(object, target, targetValue, setEventOptions);
    }
  };
}
// EXTERNAL MODULE: ./src/_core/defineprop.js
var defineprop = __webpack_require__(14);

// CONCATENATED MODULE: ./src/calc/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calc; });










 // defines a property which is dependend on other properties

function calc(object, target, sources, givenHandler, eventOptions) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    eventOptions = givenHandler;
    givenHandler = sources;
    sources = target;
    target = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'calc');
  }

  if (target instanceof Object) {
    /*
         * accept an object
         * this.calc({target: { source, handler, event } }, commonEventOptions);
         */
    Object(forown["a" /* default */])(target, function (_ref, itemTarget) {
      var itemSource = _ref.source,
          itemHandler = _ref.handler,
          itemEventOptions = _ref.event;
      var commonEventOptions = sources;
      var mergedEventOptions = {};

      if (commonEventOptions) {
        // extend event object by "global" event
        Object(_helpers_assign["a" /* default */])(mergedEventOptions, commonEventOptions);
      }

      if (itemEventOptions) {
        // extend event object by "local" event ("event" key of an object)
        Object(_helpers_assign["a" /* default */])(mergedEventOptions, itemEventOptions);
      }

      calc(object, itemTarget, itemSource, itemHandler, mergedEventOptions);
    });
    return object;
  }

  if (typeof target !== 'string') {
    throw Object(seempleerror["a" /* default */])('calc:target_type', {
      target: target
    });
  }

  eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign

  var def = Object(init["a" /* default */])(object);
  var _eventOptions = eventOptions,
      _eventOptions$setOnIn = _eventOptions.setOnInit,
      setOnInit = _eventOptions$setOnIn === void 0 ? true : _eventOptions$setOnIn,
      _eventOptions$debounc = _eventOptions.debounceCalcOnInit,
      debounceCalcOnInit = _eventOptions$debounc === void 0 ? false : _eventOptions$debounc,
      _eventOptions$debounc2 = _eventOptions.debounceCalc,
      debounceCalc = _eventOptions$debounc2 === void 0 ? true : _eventOptions$debounc2,
      _eventOptions$debounc3 = _eventOptions.debounceCalcDelay,
      debounceCalcDelay = _eventOptions$debounc3 === void 0 ? 0 : _eventOptions$debounc3,
      _eventOptions$isTarge = _eventOptions.isTargetPropertyHidden,
      isTargetPropertyHidden = _eventOptions$isTarge === void 0 ? false : _eventOptions$isTarge;

  var defaultHandler = function defaultHandler(value) {
    return value;
  };

  var handler = givenHandler || defaultHandler;
  var allSources = [];
  var syncCalcHandler = createCalcHandler({
    object: object,
    eventOptions: eventOptions,
    allSources: allSources,
    target: target,
    def: def,
    handler: handler
  });
  var debouncedCalcHandler;
  var calcHandler;

  if (debounceCalcOnInit || debounceCalc) {
    debouncedCalcHandler = Object(debounce["a" /* default */])(syncCalcHandler, debounceCalcDelay);
  }

  Object(defineprop["a" /* default */])(object, target, isTargetPropertyHidden);

  if (!(sources instanceof Array)) {
    sources = [sources]; // eslint-disable-line no-param-reassign
  }

  if (debounceCalc) {
    calcHandler = debouncedCalcHandler;
  } else {
    calcHandler = syncCalcHandler;
  }

  Object(foreach["a" /* default */])(sources, function (source) {
    if (typeof source === 'string') {
      // source object is current object
      addSource({
        calcHandler: calcHandler,
        allSources: allSources,
        sourceKey: source,
        sourceObject: object,
        eventOptions: eventOptions
      });
    } else {
      // source object is external object
      if (!source || typeof_default()(source) !== 'object') {
        throw Object(seempleerror["a" /* default */])('calc:source_type', {
          source: source
        });
      }

      var sourceKey = source.key;
      var sourceObject = source.object;

      if (sourceKey instanceof Array) {
        // many keys are passed
        Object(foreach["a" /* default */])(sourceKey, function (sourceKeyItem) {
          addSource({
            calcHandler: calcHandler,
            allSources: allSources,
            sourceKey: sourceKeyItem,
            sourceObject: sourceObject,
            eventOptions: eventOptions
          });
        });
      } else {
        // one key is passed
        addSource({
          calcHandler: calcHandler,
          allSources: allSources,
          sourceKey: sourceKey,
          sourceObject: sourceObject,
          eventOptions: eventOptions
        });
      }
    }
  });

  if (setOnInit) {
    if (debounceCalcOnInit) {
      debouncedCalcHandler();
    } else {
      syncCalcHandler();
    }
  }

  return object;
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return lookForBinder; });
/* harmony import */ var _defaultbinders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
 // tries to find a binder for given node

function lookForBinder(node) {
  for (var i = 0; i < _defaultbinders__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].length; i++) {
    var binder = _defaultbinders__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"][i].call(node, node);

    if (binder) {
      return binder;
    }
  }

  return undefined;
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return afterSeempleInit; });
// Seemple initializer
function afterSeempleInit() {
  this.nodes = {};
  this.$nodes = {};
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// the regexp allows to parse things like "click::x(.y)"
// it's shared between few modules
/* harmony default export */ __webpack_exports__["a"] = (/([^::]+)::([^()]+)?(?:\((.*)\))?/);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return selectNodes; });
/* harmony import */ var _core_defs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _helpers_toarray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
/* harmony import */ var _helpers_foreach__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);




var customSelectorReg = /\s*:bound\(([^(]*)\)\s*([\S\s]*)\s*|\s*:sandbox\s*([\S\s]*)\s*/;
var randomAttr = "".concat(Math.random().toString().replace('0.', 'x'), "y"); // x12345y
// the function selects nodes based on a selector (including custom values, eg :sandbox)
// TODO: selectNodes looks not good, it needs to be refactored and accelerated if possible

function selectNodes(object, givenSelector) {
  var _defs$get = _core_defs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(object),
      props = _defs$get.props;

  var selectors = givenSelector.split(',');
  var result = _dom__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"].$();
  Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(selectors, function (selector) {
    var execResult = customSelectorReg.exec(selector);

    if (execResult) {
      var boundKey = execResult[3] !== undefined ? 'sandbox' : execResult[1];
      var subSelector = execResult[3] !== undefined ? execResult[3] : execResult[2];
      var propDef = props[boundKey];

      if (propDef) {
        var bindings = propDef.bindings;

        if (bindings) {
          var boundNodes = Array(bindings.length);
          Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(bindings, function (binding, i) {
            boundNodes[i] = binding.node;
          }); // if native selector passed after :bound(KEY) is not empty string
          // for example ":bound(KEY) .my-selector"

          if (subSelector) {
            // if native selector contains children selector
            // for example ":bound(KEY) > .my-selector"
            if (subSelector.indexOf('>') === 0) {
              // selecting children
              Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(boundNodes, function (node) {
                node.setAttribute(randomAttr, randomAttr);
                var selected = node.querySelectorAll("[".concat(randomAttr, "=\"").concat(randomAttr, "\"] ").concat(subSelector));
                result = result.add(Object(_helpers_toarray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(selected));
                node.removeAttribute(randomAttr);
              });
            } else {
              // if native selector doesn't contain children selector
              Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(boundNodes, function (node) {
                var selected = node.querySelectorAll(subSelector);
                result = result.add(Object(_helpers_toarray__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(selected));
              });
            }
          } else {
            // if native selector is empty string just add bound nodes to result
            result = result.add(boundNodes);
          }
        }
      }
    } else {
      // if it's native selector (no custom things)
      result = result.add(selector);
    }
  });
  return result;
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var binders_namespaceObject = {};
__webpack_require__.r(binders_namespaceObject);
__webpack_require__.d(binders_namespaceObject, "html", function() { return common_binders["html"]; });
__webpack_require__.d(binders_namespaceObject, "display", function() { return common_binders["display"]; });
__webpack_require__.d(binders_namespaceObject, "className", function() { return common_binders["className"]; });
__webpack_require__.d(binders_namespaceObject, "prop", function() { return common_binders["prop"]; });
__webpack_require__.d(binders_namespaceObject, "attr", function() { return common_binders["attr"]; });
__webpack_require__.d(binders_namespaceObject, "input", function() { return input["a" /* default */]; });
__webpack_require__.d(binders_namespaceObject, "output", function() { return output["a" /* default */]; });
__webpack_require__.d(binders_namespaceObject, "textarea", function() { return binders_textarea["a" /* default */]; });
__webpack_require__.d(binders_namespaceObject, "select", function() { return binders_select["a" /* default */]; });
__webpack_require__.d(binders_namespaceObject, "progress", function() { return progress["a" /* default */]; });
__webpack_require__.d(binders_namespaceObject, "text", function() { return common_binders["text"]; });
__webpack_require__.d(binders_namespaceObject, "style", function() { return common_binders["style"]; });
__webpack_require__.d(binders_namespaceObject, "dataset", function() { return common_binders["dataset"]; });
__webpack_require__.d(binders_namespaceObject, "existence", function() { return common_binders["existence"]; });
var _universalmethods_namespaceObject = {};
__webpack_require__.r(_universalmethods_namespaceObject);
__webpack_require__.d(_universalmethods_namespaceObject, "on", function() { return on; });
__webpack_require__.d(_universalmethods_namespaceObject, "once", function() { return once; });
__webpack_require__.d(_universalmethods_namespaceObject, "onDebounce", function() { return onDebounce; });
__webpack_require__.d(_universalmethods_namespaceObject, "off", function() { return off; });
__webpack_require__.d(_universalmethods_namespaceObject, "trigger", function() { return trigger; });
__webpack_require__.d(_universalmethods_namespaceObject, "calc", function() { return calc["a" /* default */]; });
__webpack_require__.d(_universalmethods_namespaceObject, "bindNode", function() { return bindnode["a" /* default */]; });
__webpack_require__.d(_universalmethods_namespaceObject, "unbindNode", function() { return unbindnode["a" /* default */]; });
__webpack_require__.d(_universalmethods_namespaceObject, "bindOptionalNode", function() { return bindOptionalNode; });
__webpack_require__.d(_universalmethods_namespaceObject, "bindSandbox", function() { return bindSandbox; });
__webpack_require__.d(_universalmethods_namespaceObject, "parseBindings", function() { return parsebindings["a" /* default */]; });
__webpack_require__.d(_universalmethods_namespaceObject, "select", function() { return select_select; });
__webpack_require__.d(_universalmethods_namespaceObject, "selectAll", function() { return selectAll; });
__webpack_require__.d(_universalmethods_namespaceObject, "set", function() { return set["a" /* default */]; });
__webpack_require__.d(_universalmethods_namespaceObject, "remove", function() { return remove; });
__webpack_require__.d(_universalmethods_namespaceObject, "instantiate", function() { return instantiate; });
__webpack_require__.d(_universalmethods_namespaceObject, "mediate", function() { return mediate; });

// EXTERNAL MODULE: ./src/class.js
var src_class = __webpack_require__(20);

// EXTERNAL MODULE: ./src/defaultbinders.js
var defaultbinders = __webpack_require__(33);

// EXTERNAL MODULE: ./src/lookforbinder.js
var lookforbinder = __webpack_require__(28);

// EXTERNAL MODULE: ./src/parserbrackets.js
var parserbrackets = __webpack_require__(34);

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// EXTERNAL MODULE: ./src/_helpers/forown.js
var forown = __webpack_require__(5);

// CONCATENATED MODULE: ./src/toseemple.js


 // recursively converts objects and arrays to Seemple.Object and Seemple.Array instances

function toSeemple(data) {
  // fix circular ref issue
  var SeempleObject = __webpack_require__(45)["default"];

  var SeempleArray = __webpack_require__(26)["default"]; // convert only objects


  if (data && typeof_default()(data) === 'object') {
    if ('length' in data) {
      // if length is given convert it to Seemple.Array instance
      var arrayItems = Array(data.length);
      Object(foreach["a" /* default */])(data, function (item, index) {
        arrayItems[index] = toSeemple(item);
      });
      return new SeempleArray().recreate(arrayItems);
    } // if length is not given convert it to Seemple.Object instance


    var object = {};
    Object(forown["a" /* default */])(data, function (value, key) {
      object[key] = toSeemple(value);
    });
    return new SeempleObject(object);
  } // for all non-objects just return passed data


  return data;
}
// EXTERNAL MODULE: ./node_modules/common-binders/index.js
var common_binders = __webpack_require__(18);

// EXTERNAL MODULE: ./src/binders/input.js
var input = __webpack_require__(23);

// EXTERNAL MODULE: ./src/binders/output.js
var output = __webpack_require__(41);

// EXTERNAL MODULE: ./src/binders/textarea.js
var binders_textarea = __webpack_require__(38);

// EXTERNAL MODULE: ./src/binders/select.js
var binders_select = __webpack_require__(39);

// EXTERNAL MODULE: ./src/binders/progress.js
var progress = __webpack_require__(40);

// CONCATENATED MODULE: ./src/binders/index.js







// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(15);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./src/on/_splitbyspaceregexp.js
// allows to split by spaces not inclusing ones inside of brackers
/* harmony default export */ var _splitbyspaceregexp = (/\s+(?![^(]*\))/g);
// EXTERNAL MODULE: ./src/_helpers/checkobjecttype.js
var checkobjecttype = __webpack_require__(9);

// EXTERNAL MODULE: ./src/_helpers/seempleerror.js
var seempleerror = __webpack_require__(4);

// EXTERNAL MODULE: ./src/on/_addlistener.js
var _addlistener = __webpack_require__(11);

// EXTERNAL MODULE: ./src/on/_delegatelistener/index.js + 5 modules
var _delegatelistener = __webpack_require__(24);

// CONCATENATED MODULE: ./src/on/index.js








 // adds event listener

function on(object, givenNames, callback, triggerOnInit, context) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    context = triggerOnInit;
    triggerOnInit = callback;
    callback = givenNames;
    givenNames = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'on');
  }

  var isNamesVarArray = givenNames instanceof Array; // allow to pass name-handler object

  if (givenNames && typeof_default()(givenNames) === 'object' && !isNamesVarArray) {
    Object(forown["a" /* default */])(givenNames, function (namesObjCallback, namesObjName) {
      return on(object, namesObjName, namesObjCallback, callback, triggerOnInit);
    });
    return object;
  }

  if (typeof givenNames !== 'string' && !isNamesVarArray) {
    throw Object(seempleerror["a" /* default */])('on:names_type', {
      names: givenNames
    });
  } // split by spaces
  // TODO: Array of names passed to on method is non-documented feature


  var names = isNamesVarArray ? givenNames : givenNames.split(_splitbyspaceregexp); // flip triggerOnInit and context when triggerOnInit is not boolean

  if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
    // eslint-disable-next-line no-param-reassign
    var _ref = [triggerOnInit, context];
    context = _ref[0];
    triggerOnInit = _ref[1];
  }

  Object(foreach["a" /* default */])(names, function (name) {
    var delegatedEventParts = name.split('@');

    if (delegatedEventParts.length > 1) {
      // if @ exists in event name then this is delegated event
      var _delegatedEventParts = slicedToArray_default()(delegatedEventParts, 2),
          path = _delegatedEventParts[0],
          delegatedName = _delegatedEventParts[1];

      Object(_delegatelistener["default"])(object, path, delegatedName, callback, context || object);
    } else {
      // if not, this is simple event
      Object(_addlistener["a" /* default */])(object, name, callback, context);
    }
  }); // call callback immediatelly if triggerOnInit is true

  if (triggerOnInit === true) {
    callback.call(context || object, {
      triggerOnInit: triggerOnInit
    });
  }

  return object;
}
// EXTERNAL MODULE: ./src/_core/defs.js
var defs = __webpack_require__(3);

// EXTERNAL MODULE: ./src/off/_removelistener.js
var _removelistener = __webpack_require__(17);

// EXTERNAL MODULE: ./src/off/_undelegatelistener.js
var _undelegatelistener = __webpack_require__(21);

// EXTERNAL MODULE: ./src/_dom/index.js + 1 modules
var _dom = __webpack_require__(12);

// CONCATENATED MODULE: ./src/off/index.js









 // removes event listener

function off(object, givenNames, callback, context) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    context = callback;
    callback = givenNames;
    givenNames = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'off');
  }

  var isNamesVarArray = givenNames instanceof Array;
  var def = defs["a" /* default */].get(object); // allow to pass name-handler object
  // TODO: Name-handler object passed to off method is non-documented feature

  if (givenNames && typeof_default()(givenNames) === 'object' && !isNamesVarArray) {
    Object(forown["a" /* default */])(givenNames, function (namesObjCallback, namesObjName) {
      return off(object, namesObjName, namesObjCallback, callback);
    });
    return object;
  }

  if (!givenNames && !callback && !context) {
    def.events = {};
    Object(forown["a" /* default */])(def.props, function (_ref, propName) {
      var bindings = _ref.bindings;

      if (bindings) {
        Object(foreach["a" /* default */])(bindings, function (_ref2) {
          var node = _ref2.node;
          var eventNamespace = def.id + propName;
          _dom["a" /* default */].$(node).off(".".concat(eventNamespace));
        });
      }
    });
    return object;
  } // TODO: Array of names passed to off method is non-documented feature
  // split by spaces


  var names = isNamesVarArray ? givenNames : givenNames.split(_splitbyspaceregexp);
  Object(foreach["a" /* default */])(names, function (name) {
    var delegatedEventParts = name.split('@');

    if (delegatedEventParts.length > 1) {
      var _delegatedEventParts = slicedToArray_default()(delegatedEventParts, 2),
          path = _delegatedEventParts[0],
          delegatedName = _delegatedEventParts[1];

      Object(_undelegatelistener["a" /* default */])(object, path, delegatedName, callback, context);
    } else {
      Object(_removelistener["a" /* default */])(object, name, callback, context);
    }
  });
  return object;
}
// EXTERNAL MODULE: ./src/_helpers/apply.js
var apply = __webpack_require__(10);

// CONCATENATED MODULE: ./src/once.js





 // adds event listener which will be removed immediately after its first call

function once(object, names, givenCallback, context) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    context = givenCallback;
    givenCallback = names;
    names = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'once');
  }

  var isNamesVarArray = names instanceof Array; // allow to pass name-handler object

  if (names && typeof_default()(names) === 'object' && !isNamesVarArray) {
    Object(forown["a" /* default */])(names, function (namesObjCallback, namesObjName) {
      return once(object, namesObjName, namesObjCallback, givenCallback);
    });
    return object;
  }

  var callback = function onceCallback() {
    Object(apply["a" /* default */])(givenCallback, this, arguments); // remove event listener after its call

    off(object, names, onceCallback, context);
  }; // allow to remove event listener py passing original callback to "off"


  callback._callback = givenCallback;
  return on(object, names, callback, context);
}
// EXTERNAL MODULE: ./src/_helpers/debounce.js
var debounce = __webpack_require__(25);

// CONCATENATED MODULE: ./src/ondebounce.js




 // adds debounced event listener

function onDebounce(object, names, givenCallback, givenDelay, triggerOnInit, context) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    context = triggerOnInit;
    triggerOnInit = givenDelay;
    givenDelay = givenCallback;
    givenCallback = names;
    names = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'onDebounce');
  }

  var isNamesVarArray = names instanceof Array; // allow to pass name-handler object

  if (names && typeof_default()(names) === 'object' && !isNamesVarArray) {
    Object(forown["a" /* default */])(names, function (namesObjCallback, namesObjName) {
      return onDebounce(object, namesObjName, namesObjCallback, givenCallback, givenDelay, triggerOnInit);
    });
    return object;
  }

  var delay = typeof givenDelay === 'number' ? givenDelay : 0;
  var callback = Object(debounce["a" /* default */])(givenCallback, delay); // allow to remove event listener py passing original callback to "off"

  callback._callback = givenCallback;
  return on(object, names, callback, triggerOnInit, context);
}
// EXTERNAL MODULE: ./src/on/_domeventregexp.js
var _domeventregexp = __webpack_require__(30);

// EXTERNAL MODULE: ./src/trigger/_triggerone.js
var _triggerone = __webpack_require__(2);

// CONCATENATED MODULE: ./src/trigger/_triggeronedomevent.js
// triggers given DOM event on given node
function triggerOneDOMEvent(_ref) {
  var node = _ref.node,
      eventName = _ref.eventName,
      triggerArgs = _ref.triggerArgs;
  var _window = window,
      document = _window.document,
      Event = _window.Event;
  var event; // polyfill for older browsers

  if (document.createEvent) {
    /* istanbul ignore next */
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  } else if (typeof Event !== 'undefined') {
    event = new Event(eventName, {
      bubbles: true,
      cancelable: true
    });
  } // seempleTriggerArgs will be used in a handler created by addDOMListener


  event.seempleTriggerArgs = triggerArgs;
  node.dispatchEvent(event);
}
// CONCATENATED MODULE: ./src/trigger/_triggerdomevent.js


 // triggers DOM event on bound nodes

function triggerDOMEvent(object, key, eventName, selector, triggerArgs) {
  var def = defs["a" /* default */].get(object);

  if (!def) {
    return;
  }

  var props = def.props;
  var propDef = props[key];

  if (!propDef) {
    return;
  }

  var bindings = propDef.bindings;

  if (!bindings) {
    return;
  }

  Object(foreach["a" /* default */])(bindings, function (_ref) {
    var node = _ref.node;

    if (selector) {
      // if selector is given trigger an event on all node descendants
      var descendants = node.querySelectorAll(selector);
      Object(foreach["a" /* default */])(descendants, function (descendant) {
        triggerOneDOMEvent({
          node: descendant,
          eventName: eventName,
          triggerArgs: triggerArgs
        });
      });
    } else {
      // trigger an event for single node
      triggerOneDOMEvent({
        node: node,
        eventName: eventName,
        triggerArgs: triggerArgs
      });
    }
  });
}
// CONCATENATED MODULE: ./src/trigger/index.js









 // triggers an event

function trigger() {
  var object;
  var givenNames;
  var triggerArgs;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args
    givenNames = args[0];
    triggerArgs = args.slice(1);
    object = this;
  } else {
    object = args[0];
    givenNames = args[1];
    triggerArgs = args.slice(2);
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'trigger');
  }

  var names; // allow to use strings only as event name

  if (typeof givenNames === 'string') {
    names = givenNames.split(_splitbyspaceregexp);
  } else {
    throw Object(seempleerror["a" /* default */])('trigger:names_type', {
      names: givenNames
    });
  }

  var def = defs["a" /* default */].get(object); // if no definition do nothing

  if (!def) {
    return object;
  }

  var allEvents = def.events;

  if (!allEvents) {
    return object;
  }

  Object(foreach["a" /* default */])(names, function (name) {
    var domEvtExecResult = _domeventregexp["a" /* default */].exec(name);

    if (domEvtExecResult) {
      // if EVT::KEY(SELECTOR) ia passed as event name then trigger DOM event
      var _domEvtExecResult = slicedToArray_default()(domEvtExecResult, 4),
          eventName = _domEvtExecResult[1],
          _domEvtExecResult$ = _domEvtExecResult[2],
          key = _domEvtExecResult$ === void 0 ? 'sandbox' : _domEvtExecResult$,
          selector = _domEvtExecResult[3];

      triggerDOMEvent(object, key, eventName, selector, triggerArgs);
    } else {
      // trigger ordinary event
      Object(_triggerone["a" /* default */])(object, name, triggerArgs);
    }
  });
  return object;
}
// EXTERNAL MODULE: ./src/calc/index.js + 3 modules
var calc = __webpack_require__(27);

// EXTERNAL MODULE: ./src/bindnode/index.js + 4 modules
var bindnode = __webpack_require__(13);

// EXTERNAL MODULE: ./src/unbindnode/index.js + 1 modules
var unbindnode = __webpack_require__(19);

// CONCATENATED MODULE: ./src/bindoptionalnode.js

 // TODO: Adds a binding, not throwing an error when a node is missing

function bindOptionalNode() {
  // this hack allows to keep bindOptionalNode as compact as possible
  // and doesn't require to flip args and support all bindNode variations
  bindnode["a" /* default */].temporaryOptionalFlag = true;
  return Object(apply["a" /* default */])(bindnode["a" /* default */], this, arguments);
}
// CONCATENATED MODULE: ./src/bindsandbox.js



 // binds or rebinds sandbox node

function bindSandbox(object, node, evt) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    evt = node;
    node = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'bindSandbox');
  }

  Object(unbindnode["a" /* default */])(object, 'sandbox', null, evt);
  return Object(bindnode["a" /* default */])(object, 'sandbox', node, null, evt);
}
// EXTERNAL MODULE: ./src/parsebindings/index.js + 5 modules
var parsebindings = __webpack_require__(42);

// EXTERNAL MODULE: ./src/bindnode/_selectnodes.js
var _selectnodes = __webpack_require__(31);

// CONCATENATED MODULE: ./src/select.js




var customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/; // selects one node based on given selector

function select_select(object, selector) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    selector = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'select');
  } // the selector includes "custom" things like :sandbox or :bound(KEY)


  if (customSelectorTestReg.test(selector)) {
    return Object(_selectnodes["a" /* default */])(object, selector)[0] || null;
  }

  var def = defs["a" /* default */].get(object);

  if (!def || typeof selector !== 'string') {
    return null;
  }

  var propDef = def.props.sandbox;

  if (!propDef) {
    return null;
  }

  var bindings = propDef.bindings;

  if (bindings) {
    // iterate over all bound nodes trying to find a descendant matched given selector
    for (var i = 0; i < bindings.length; i++) {
      var node = bindings[i].node;
      var selected = node.querySelector(selector);

      if (selected) {
        return selected;
      }
    }
  }

  return null;
}
// EXTERNAL MODULE: ./src/_helpers/toarray.js
var toarray = __webpack_require__(36);

// CONCATENATED MODULE: ./src/selectall.js







var selectall_customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/; // selects nodes based on given selector

function selectAll(object, selector) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    selector = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'selectAll or $');
  } // the selector includes "custom" things like :sandbox or :bound(KEY)


  if (selectall_customSelectorTestReg.test(selector)) {
    return Object(_selectnodes["a" /* default */])(object, selector);
  }

  var def = defs["a" /* default */].get(object);
  var result = _dom["a" /* default */].$();

  if (!def || typeof selector !== 'string') {
    return result;
  }

  var propDef = def.props.sandbox;

  if (!propDef) {
    return result;
  }

  var bindings = propDef.bindings;

  if (bindings) {
    // iterate over all bindings and add found nodes
    Object(foreach["a" /* default */])(bindings, function (_ref) {
      var node = _ref.node;
      var selected = node.querySelectorAll(selector);
      result = result.add(Object(toarray["a" /* default */])(selected));
    });
  }

  return result;
}
// EXTERNAL MODULE: ./src/set.js
var set = __webpack_require__(16);

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(8);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// CONCATENATED MODULE: ./src/remove.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







 // removes a property, its bindings and its events
// TODO: remove function does not correctly removes delegated events, bindings, tree listeners etc

function remove(object, givenKey, eventOptions) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    eventOptions = givenKey;
    givenKey = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'remove');
  }

  eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign

  var def = defs["a" /* default */].get(object);
  var _eventOptions = eventOptions,
      silent = _eventOptions.silent; // allow to pass single key or an array of keys

  var keys = givenKey instanceof Array ? givenKey : [givenKey];

  var _loop = function _loop(i) {
    var key = keys[i]; // if non-string is passed as a key

    if (typeof key !== 'string') {
      throw Object(seempleerror["a" /* default */])('remove:key_type', {
        key: key
      });
    }

    var props = def && def.props;
    var propDef = props && props[key]; // if no object definition then simply delete the property

    if (!propDef) {
      delete object[key];
      return "continue";
    }

    var value = propDef.value; // remove all bindings

    Object(unbindnode["a" /* default */])(object, key); // TODO: Manual listing of event prefixes may cause problems in future

    var removeEventPrefies = ['_change:deps', '_change:bindings', '_change:delegated', '_change:tree', 'change', 'beforechange', 'bind', 'unbind']; // remove all events

    Object(foreach["a" /* default */])(removeEventPrefies, function (prefix) {
      return Object(_removelistener["a" /* default */])(object, "".concat(prefix, ":").concat(key));
    }); // delete property definition

    delete props[key]; // delete the property itself

    delete object[key];

    var extendedEventOptions = _objectSpread({
      key: key,
      value: value
    }, eventOptions); // trigger delegated events logic removal for asterisk events (*.*.*@foo)


    Object(_triggerone["a" /* default */])(object, '_delete:delegated', extendedEventOptions); // fire events if "silent" is not true

    if (!silent) {
      Object(_triggerone["a" /* default */])(object, 'delete', extendedEventOptions);
      Object(_triggerone["a" /* default */])(object, "delete:".concat(key), extendedEventOptions);
    }
  };

  for (var i = 0; i < keys.length; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }
}
// EXTERNAL MODULE: ./src/_helpers/assign.js
var _helpers_assign = __webpack_require__(7);

// EXTERNAL MODULE: ./src/_core/init.js
var init = __webpack_require__(6);

// EXTERNAL MODULE: ./src/_core/defineprop.js
var defineprop = __webpack_require__(14);

// CONCATENATED MODULE: ./src/mediate.js







 // creates property mediator

function createMediator(_ref) {
  var object = _ref.object,
      propDef = _ref.propDef,
      key = _ref.key,
      mediator = _ref.mediator;
  return function propMediator(value) {
    // args: value, previousValue, key, object itself
    return mediator.call(object, value, propDef.value, key, object);
  };
} // transforms property value on its changing


function mediate(object, givenKeys, mediator) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    mediator = givenKeys;
    givenKeys = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'mediate');
  }

  var isKeysArray = givenKeys instanceof Array; // allow to use key-mediator object as another method variation

  if (typeof_default()(givenKeys) === 'object' && !isKeysArray) {
    Object(forown["a" /* default */])(givenKeys, function (objVal, objKey) {
      return mediate(object, objKey, objVal);
    });
    return object;
  }

  Object(init["a" /* default */])(object); // allow to use both single key and an array of keys

  var keys = isKeysArray ? givenKeys : [givenKeys];
  Object(foreach["a" /* default */])(keys, function (key) {
    // if non-string is passed as a key
    if (typeof key !== 'string') {
      throw Object(seempleerror["a" /* default */])('mediate:key_type', {
        key: key
      });
    }

    var propDef = Object(defineprop["a" /* default */])(object, key);
    var propMediator = propDef.mediator = createMediator({
      object: object,
      propDef: propDef,
      key: key,
      mediator: mediator
    }); // set new value

    Object(set["a" /* default */])(object, key, propMediator(propDef.value), {
      fromMediator: true
    });
  });
  return object;
}
// CONCATENATED MODULE: ./src/instantiate.js





 // the function is used when no update function is given

function defaultUpdateFunction(instance, data) {
  if (instance.isSeempleArray) {
    instance.recreate(data);
  } else if (instance.isSeempleObject) {
    instance.setData(data, {
      replaceData: true
    });
  } else {
    // for other objects just extend them with given data
    Object(_helpers_assign["a" /* default */])(instance, data);
  }
} // returns mediator which controls assignments


function createInstantiateMediator(_ref) {
  var UsedClass = _ref.UsedClass,
      updateFunction = _ref.updateFunction;
  return function mediator(value, previousValue, key, object) {
    if (previousValue instanceof UsedClass) {
      updateFunction.call(object, previousValue, value, key);
      return previousValue;
    }

    return new UsedClass(value, object, key);
  };
} // creates an instance of given class as property value
// and updates an instance on new value assignment instead of actual assignment


function instantiate(object, givenKeys, UsedClass, givenUpdateFunction) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    givenUpdateFunction = UsedClass;
    UsedClass = givenKeys;
    givenKeys = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'instantiate');
  }

  var isKeysArray = givenKeys instanceof Array; // allow to use key-class object

  if (typeof_default()(givenKeys) === 'object' && !isKeysArray) {
    Object(forown["a" /* default */])(givenKeys, function (objVal, objKey) {
      return instantiate(object, objKey, objVal, UsedClass);
    });
    return object;
  } // allow to use both single key and an array of keys


  var keys = isKeysArray ? givenKeys : [givenKeys];
  var updateFunction = givenUpdateFunction || defaultUpdateFunction;
  var mediator = createInstantiateMediator({
    UsedClass: UsedClass,
    updateFunction: updateFunction
  }); // iterate over all keys and define created mediator for all of them

  Object(foreach["a" /* default */])(keys, function (key) {
    return mediate(object, key, mediator);
  });
  return object;
}
// CONCATENATED MODULE: ./src/seemple/_universalmethods.js
















 // the following methods can be used as static methods and as instance methods


// EXTERNAL MODULE: ./src/_dom/mq/index.js + 7 modules
var mq = __webpack_require__(37);

// CONCATENATED MODULE: ./src/usedomlibrary.js

 // forces Matrsahka to use jQuery-like DOM library for internal stuff

function useDOMLibrary(library) {
  if (typeof library === 'function') {
    _dom["a" /* default */].$ = library;
  } else {
    _dom["a" /* default */].$ = mq["a" /* default */];
  }
}
// CONCATENATED MODULE: ./src/chain.js




 // create a prototype of ChainClass
// store target object at "object" property

var chain_prototype = {
  constructor: function constructor(object) {
    this.object = object;
  }
};
var methodNames = Object.keys(_universalmethods_namespaceObject); // iterate over all universal methods

var chain_loop = function _loop(i) {
  var methodName = methodNames[i];
  var method = _universalmethods_namespaceObject[methodName]; // create every chained method

  chain_prototype[methodName] = function chainedMethod() {
    var args = [this.object];
    Object(foreach["a" /* default */])(arguments, function (argument) {
      args.push(argument);
    });
    Object(apply["a" /* default */])(method, undefined, args); // returning this is important for chained calls

    return this;
  };
};

for (var chain_i = 0; chain_i < methodNames.length; chain_i++) {
  chain_loop(chain_i);
}

var ChainClass = Object(src_class["a" /* default */])(chain_prototype); // the function allows to chain static function calls on any object

function chain(object) {
  // check for type and throw an error if it is not an object and is not a function
  Object(checkobjecttype["a" /* default */])(object, 'chain');
  return new ChainClass(object);
}
// CONCATENATED MODULE: ./src/seemple/_staticmembers.js










/* harmony default export */ var _staticmembers = (Object(_helpers_assign["a" /* default */])({
  Class: src_class["a" /* default */],
  defaultBinders: defaultbinders["a" /* default */],
  lookForBinder: lookforbinder["a" /* default */],
  binders: binders_namespaceObject,
  parserBrackers: parserbrackets["a" /* default */],
  toSeemple: toSeemple,
  useDOMLibrary: useDOMLibrary,
  chain: chain
}, _universalmethods_namespaceObject));
// EXTERNAL MODULE: ./src/seemple/_afterinit.js
var _afterinit = __webpack_require__(29);

// CONCATENATED MODULE: ./src/seemple/_prototype.js



/* harmony default export */ var _prototype = (Object(_helpers_assign["a" /* default */])({
  _afterInit: _afterinit["a" /* default */],
  isSeemple: true,
  $: selectAll
}, _universalmethods_namespaceObject));
// CONCATENATED MODULE: ./src/seemple/index.js






_prototype.constructor = function Seemple() {
  if (!(this instanceof Seemple)) {
    throw Object(seempleerror["a" /* default */])('common:call_class');
  }

  Object(init["a" /* default */])(this);
};

var seemple_Seemple = Object(src_class["a" /* default */])(_prototype, _staticmembers);
/* harmony default export */ var seemple = __webpack_exports__["default"] = (seemple_Seemple);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _binders_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _binders_textarea__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
/* harmony import */ var _binders_select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39);
/* harmony import */ var _binders_progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _binders_output__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41);




 // defaultBinders collection by default contains only one function-checker

/* harmony default export */ __webpack_exports__["a"] = ([function (node) {
  switch (node.tagName) {
    case 'INPUT':
      return Object(_binders_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(node.type);

    case 'TEXTAREA':
      return Object(_binders_textarea__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])();

    case 'SELECT':
      return Object(_binders_select__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(node.multiple);

    case 'PROGRESS':
      return Object(_binders_progress__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])();

    case 'OUTPUT':
      return Object(_binders_output__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])();

    default:
      return null;
  }
}]);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// brackets for bindings parser
/* harmony default export */ __webpack_exports__["a"] = ({
  left: '{{',
  right: '}}'
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// determines whether two values are the same value

/* istanbul ignore next */
// eslint-disable-next-line
var isPolyfill = function isPolyfill(v1, v2) {
  return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
};

/* harmony default export */ __webpack_exports__["a"] = (Object.is || isPolyfill);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toArray; });
// cheap conversion of an array-like object to Array instance
function toArray(object) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var length = object.length;
  var array = Array(length);

  for (var i = start; i < length; i++) {
    array[i - start] = object[i];
  }

  return array;
}

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./src/_dom/mq/_html2nodelist.js
// converts HTML string to NodeList instance
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
  var node = window.document.createElement('div');
  var i;
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  var ex = /<([\w:]+)/.exec(html);
  var wrapper = ex && wrapMap[ex[1]] || wrapMap._;
  node.innerHTML = wrapper[1] + html + wrapper[2];
  i = wrapper[0];

  while (i) {
    i -= 1;
    node = node.children[0];
  }

  return node.childNodes;
}
// CONCATENATED MODULE: ./src/_dom/mq/_init.js


var win = window; // function-constructor of mq library
// accepts many kinds of arguments (selector, html, function)

function MQInit(selector, context) {
  var result;

  if (selector) {
    if (selector.nodeType || typeof_default()(win) === 'object' && selector === win) {
      result = [selector];
    } else if (typeof selector === 'string') {
      if (/</.test(selector)) {
        result = html2nodeList(selector);
      } else if (context) {
        var newContext = new MQInit(context)[0];

        if (newContext) {
          result = newContext.querySelectorAll(selector);
        }
      } else {
        result = win.document.querySelectorAll(selector);
      }
    } else if ('length' in selector) {
      // if it's something array-like (eg NodeList)
      result = selector;
    } else {
      // this is somethong another (eg Attr)
      result = [selector];
    }
  }

  var length = result && result.length;

  if (length) {
    for (var i = 0; i < length; i++) {
      this.push(result[i]);
    }
  }

  return this;
}

MQInit.prototype = [];
/* harmony default export */ var _init = (MQInit);
// CONCATENATED MODULE: ./src/_dom/mq/parsehtml.js

 // parses given HTML and returns mq instance

function parseHTML(html) {
  return new _init(html2nodeList(html));
}
// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(15);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// CONCATENATED MODULE: ./src/_dom/mq/_data.js
// an object allows to share data between modules; it's needed because we use
// simplified ES modules there and cannot import and share a number
/* harmony default export */ var _data = ({
  nodeIndex: 0,
  allEvents: {}
});
// CONCATENATED MODULE: ./src/_dom/mq/on.js


var splitBySpaceReg = /\s+/;
var splitByDotReg = /\.(.+)/;
var randomID = "".concat(Math.random().toString().replace('0.', 'x'), "y"); // x12345y
// checks an element against a selector

function is(node, selector) {
  return (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, selector);
} // the function is used when a selector is given


function delegateHandler(evt, selector, handler) {
  var scopeSelector = "[".concat(randomID, "=\"").concat(randomID, "\"] ");
  var splittedSelector = selector.split(',');
  var matching = '';

  for (var i = 0; i < splittedSelector.length; i++) {
    var sel = splittedSelector[i];
    matching += "".concat(i === 0 ? '' : ',').concat(scopeSelector).concat(sel, ",").concat(scopeSelector).concat(sel, " *");
  }

  this.setAttribute(randomID, randomID);

  if (is(evt.target, matching)) {
    handler.call(this, evt);
  }

  this.removeAttribute(randomID);
} // adds event listener to a set of elemnts


function on(namesStr, selector, handler) {
  var names = namesStr.split(splitBySpaceReg);
  var delegate;

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
    var _names$i$split = names[i].split(splitByDotReg),
        _names$i$split2 = slicedToArray_default()(_names$i$split, 2),
        name = _names$i$split2[0],
        namespace = _names$i$split2[1];

    for (var j = 0; j < this.length; j++) {
      var node = this[j];
      var nodeID = node.b$ = node.b$ || ++_data.nodeIndex; // eslint-disable-line no-plusplus

      var events = _data.allEvents[name + nodeID] = _data.allEvents[name + nodeID] || [];
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
          selector: selector,
          nodeID: nodeID,
          name: name
        });
        node.addEventListener(name, delegate || handler, false);
      }
    }
  }

  return this;
}
// CONCATENATED MODULE: ./src/_dom/mq/off.js


var off_splitBySpaceReg = /\s+/;
var off_splitByDotReg = /\.(.+)/; // removes event handler from a set of elements

function off(namesStr, selector, handler) {
  if (typeof selector === 'function') {
    handler = selector; // eslint-disable-line no-param-reassign

    selector = null; // eslint-disable-line no-param-reassign
  }

  var names = namesStr.split(off_splitBySpaceReg);

  for (var i = 0; i < names.length; i++) {
    var _names$i$split = names[i].split(off_splitByDotReg),
        _names$i$split2 = slicedToArray_default()(_names$i$split, 2),
        name = _names$i$split2[0],
        namespace = _names$i$split2[1];

    for (var j = 0; j < this.length; j++) {
      var node = this[j];

      if (!name && namespace) {
        for (var k = 0, keys = Object.keys(_data.allEvents); k < keys.length; k++) {
          var _events = _data.allEvents[keys[k]];

          for (var l = 0; l < _events.length; l++) {
            var event = _events[i];

            if (event.namespace === namespace && event.nodeID === node.b$) {
              node.removeEventListener(event.name, event.delegate || event.handler);

              _events.splice(l, 1);

              l -= 1;
            }
          }
        }

        continue;
      }

      var events = _data.allEvents[name + node.b$];

      if (events) {
        for (var _k = 0; _k < events.length; _k++) {
          var _event = events[_k];

          if ((!handler || handler === _event.handler || handler === _event.delegate) && (!namespace || namespace === _event.namespace) && (!selector || selector === _event.selector)) {
            node.removeEventListener(name, _event.delegate || _event.handler);
            events.splice(_k, 1);
            _k -= 1;
          }
        }
      } else if (!namespace && !selector) {
        node.removeEventListener(name, handler);
      }
    }
  }

  return this;
}
// CONCATENATED MODULE: ./src/_dom/mq/add.js

 // adds unique nodes to mq collection

function add(selector) {
  var idMap = {};
  var result;
  var nodes = new _init(selector);

  if (this.length) {
    result = new _init();

    for (var i = 0; i < this.length; i++) {
      var node = this[i];
      var nodeID = node.b$ = node.b$ || ++_data.nodeIndex; // eslint-disable-line no-plusplus

      idMap[nodeID] = 1;
      result.push(node);
    }

    for (var _i = 0; _i < nodes.length; _i++) {
      var _node = nodes[_i];

      var _nodeID = _node.b$ = _node.b$ || ++_data.nodeIndex; // eslint-disable-line no-plusplus


      if (!idMap[_nodeID]) {
        idMap[_nodeID] = 1;
        result.push(_node);
      }
    }
  } else {
    result = nodes;
  }

  return result;
}
// EXTERNAL MODULE: ./src/_helpers/assign.js
var _helpers_assign = __webpack_require__(7);

// CONCATENATED MODULE: ./src/_dom/mq/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mq; });





 // tiny jQuery replacement for Seemple

function mq(selector, context) {
  return new _init(selector, context);
}
mq.parseHTML = parseHTML;
Object(_helpers_assign["a" /* default */])(_init.prototype, {
  on: on,
  off: off,
  add: add
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return textarea; });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
 // returns a binder for textarea element

function textarea() {
  // textarea behaves just like text input
  return Object(_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])('text');
}

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return select; });
// returns a binder for select element
function select(multiple) {
  if (multiple) {
    return {
      on: 'change',
      getValue: function getValue() {
        var options = this.options;
        var result = [];

        for (var i = 0; options.length > i; i++) {
          if (options[i].selected) {
            result.push(options[i].value);
          }
        }

        return result;
      },
      setValue: function setValue(givenValue) {
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
    getValue: function getValue() {
      return this.value;
    },
    setValue: function setValue(value) {
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

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return progress; });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
 // returns a binder for textarea element

function progress() {
  return Object(_input__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])();
}

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return output; });
// returns a binder for output element
function output() {
  return {
    on: null,
    getValue: function getValue() {
      return this.value || this.textContent;
    },
    setValue: function setValue(value) {
      var property = 'form' in this ? 'value' : 'textContent';
      this[property] = value === null ? '' : "".concat(value);
    }
  };
}

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./src/_helpers/checkobjecttype.js
var checkobjecttype = __webpack_require__(9);

// EXTERNAL MODULE: ./src/_dom/index.js + 1 modules
var _dom = __webpack_require__(12);

// EXTERNAL MODULE: ./src/calc/index.js + 3 modules
var calc = __webpack_require__(27);

// EXTERNAL MODULE: ./src/parserbrackets.js
var parserbrackets = __webpack_require__(34);

// CONCATENATED MODULE: ./src/parsebindings/_parserdata.js


var parserData = {}; // since Seemple allows to change parser brackets via parserBrackets objects
// the parser needs to generate required regular expressions and escaped brackets every time
// when parseBindings is called
// to optimize this behavior parserData object is created
// it calculates needed data every time when parserBrackets are changed
// and when parseBindings function is called it uses previously generated regeps
// from parserData object

Object(calc["a" /* default */])(parserData, {
  leftBracket: {
    source: {
      object: parserbrackets["a" /* default */],
      key: 'left'
    }
  },
  rightBracket: {
    source: {
      object: parserbrackets["a" /* default */],
      key: 'right'
    }
  },
  escLeftBracket: {
    source: 'leftBracket',
    handler: function handler(left) {
      return left.replace(/(\[|\(|\?)/g, '\\$1');
    }
  },
  escRightBracket: {
    source: 'rightBracket',
    handler: function handler(right) {
      return right.replace(/(]|\)|\?)/g, '\\$1');
    }
  },
  bindingReg: {
    source: ['escLeftBracket', 'escRightBracket'],
    handler: function handler(left, right) {
      return new RegExp("".concat(left, "\\s*(.+?)\\s*").concat(right), 'g');
    }
  },
  strictBindingReg: {
    source: ['escLeftBracket', 'escRightBracket'],
    handler: function handler(left, right) {
      return new RegExp("^".concat(left, "\\s*(.+?)\\s*").concat(right, "$"), 'g');
    }
  }
}, {
  debounceCalc: false // we need to get new regexps immediately when brackets are changed

});
/* harmony default export */ var _parserdata = (parserData);
// EXTERNAL MODULE: ./src/bindnode/index.js + 4 modules
var bindnode = __webpack_require__(13);

// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// CONCATENATED MODULE: ./src/parsebindings/_processtextnode.js



var textNodeBinder = {
  setValue: function setValue(value) {
    this.textContent = typeof value === 'undefined' ? '' : value;
  }
}; // adds binding for text node
// it splits up one text node into "simple text nodes"
// and "bound text nodes" and removes original text node

function processTextNode(_ref) {
  var object = _ref.object,
      node = _ref.node,
      textNode = _ref.textNode,
      eventOptions = _ref.eventOptions;
  var bindingReg = _parserdata.bindingReg;
  var textContent = textNode.textContent;
  var _window = window,
      document = _window.document;
  bindingReg.lastIndex = 0; // tokens variable contains normal text as odd items
  // and bound keys as even items
  // 'foo{{x}}bar{{y}}baz{{z}}' -> ['foo', 'x', 'bar', 'y', 'baz', 'z', '']

  var tokens = textContent.split(bindingReg); // fragment contains all new text nodes

  var fragment = document.createDocumentFragment();
  Object(foreach["a" /* default */])(tokens, function (token, index) {
    if (token) {
      var newTextNode = document.createTextNode(token);
      fragment.appendChild(newTextNode); // if tokens item is even then it is a key
      // which needs to be bound to newly created text node

      if (index % 2 !== 0) {
        Object(bindnode["a" /* default */])(object, token, newTextNode, textNodeBinder, eventOptions);
      }
    }
  });
  node.insertBefore(fragment, textNode);
  node.removeChild(textNode);
}
// CONCATENATED MODULE: ./src/parsebindings/_processattribute/_definehiddencontentproperty.js


var hiddenPropertyPrefix = "".concat(Math.random()).replace('0.', 'hidden');
var hiddenPropertyIndex = 0; // defines hiden (without accessors) computed property
// that dependent on given properties ('keys') as text template describes
// for example if text='{{x}} blah {{y}}', x='foo', y='bar'
// then the new property should have value 'foo blah bar'

function defineHiddenContentProperty(_ref) {
  var object = _ref.object,
      keys = _ref.keys,
      text = _ref.text;
  var key = "".concat(hiddenPropertyPrefix).concat(hiddenPropertyIndex);
  var regs = {};
  var escLeftBracket = _parserdata.escLeftBracket,
      escRightBracket = _parserdata.escRightBracket;
  hiddenPropertyIndex += 1; // create and cache regular expressions which will help us to
  // change target property value quickly when sources are changed
  // TODO: We need better parser!

  for (var i = 0; i < keys.length; i++) {
    regs[keys[i]] = new RegExp("".concat(escLeftBracket, "\\s*").concat(keys[i], "\\s*").concat(escRightBracket), 'g');
  }

  Object(calc["a" /* default */])(object, key, keys, function calcHandler() {
    var value = text; // replace things like {{x}} by actual values

    for (var _i = 0; _i < keys.length; _i++) {
      value = value.replace(regs[keys[_i]], arguments[_i]);
    }

    return value;
  }, {
    isTargetPropertyHidden: true,
    debounceCalc: false
  });
  return key;
}
// CONCATENATED MODULE: ./src/parsebindings/_processattribute/_getbindingkey.js

 // analyzes string and returns only one key which will be actually bound to an attribute

function getBindingKey(_ref) {
  var object = _ref.object,
      text = _ref.text;
  var strictBindingReg = _parserdata.strictBindingReg,
      bindingReg = _parserdata.bindingReg;
  var keys = [];
  var execResult;
  var key;
  strictBindingReg.lastIndex = 0;
  bindingReg.lastIndex = 0; // extract keys given in parser brackers
  // '{{x}} {{y}}' -> ['x', 'y']

  while (execResult = bindingReg.exec(text)) {
    keys.push(execResult[1]);
  }

  if (keys.length === 1 && strictBindingReg.test(text)) {
    // if there is only one key and if only binding substring is present in a text
    // in other words '{{x}}' is given instead of '{{x}} {{y}}' or '{{x}}foo'
    // then don't create computable property and use that key (eg 'x') for binding
    key = keys[0];
  } else {
    // create hidden computable property
    key = defineHiddenContentProperty({
      object: object,
      keys: keys,
      text: text
    });
  }

  return key;
}
// EXTERNAL MODULE: ./src/lookforbinder.js
var lookforbinder = __webpack_require__(28);

// CONCATENATED MODULE: ./src/parsebindings/_processattribute/index.js


 // a binder for instance of Attr

var attributeBinder = {
  setValue: function setValue(value) {
    this.value = value;
  }
}; // adds binding for an attribute
// its logic is much harder than for text node
// check out imported modules for more info

function processAttribute(_ref) {
  var node = _ref.node,
      attribute = _ref.attribute,
      object = _ref.object,
      eventOptions = _ref.eventOptions;
  var name = attribute.name,
      value = attribute.value;
  var type = node.type; // get a key which will be actually bound to an attribute
  // getBindingKey analyzes given value, creates computable property and returns its key

  var key = getBindingKey({
    object: object,
    text: value
  });
  var probablyValueInput = name === 'value' && type !== 'checkbox' && type !== 'radio';
  var probablyCheckableInput = name === 'checked' && (type === 'checkbox' || type === 'radio');
  var defaultBinder;

  if (probablyValueInput || probablyCheckableInput) {
    defaultBinder = Object(lookforbinder["a" /* default */])(node);
  }

  if (defaultBinder) {
    // if deault binder is found then this is default HTML5 form element
    // remove the attribute and use found binder
    node.removeAttribute(name);
    Object(bindnode["a" /* default */])(object, key, node, defaultBinder, eventOptions);
  } else {
    // simply bind an attribute
    Object(bindnode["a" /* default */])(object, key, attribute, attributeBinder, eventOptions);
  }
}
// EXTERNAL MODULE: ./src/bindnode/_getnodes.js
var _getnodes = __webpack_require__(22);

// EXTERNAL MODULE: ./src/_helpers/assign.js
var _helpers_assign = __webpack_require__(7);

// CONCATENATED MODULE: ./src/parsebindings/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return parseBindings; });








 // makes parsing of given node (node, $(nodes), selector, HTML)
// and initializes bindings for attributes and text nodes which contain things like {{foo}}

function parseBindings(object, givenNodes, eventOptions) {
  if (typeof_default()(this) === 'object' && this.isSeemple) {
    // when context is Seemple instance, use this as an object and shift other args

    /* eslint-disable no-param-reassign */
    eventOptions = givenNodes;
    givenNodes = object;
    object = this;
    /* eslint-enable no-param-reassign */
  } else {
    // throw error when object type is wrong
    Object(checkobjecttype["a" /* default */])(object, 'parseBindings');
  }

  var extendedEventOptions = {
    // useExactBinder is little optimization
    // without this option used binder is extended by default binder
    useExactBinder: true,
    fromParser: true,
    setValueOnBind: true
  };

  if (typeof_default()(eventOptions) === 'object') {
    Object(_helpers_assign["a" /* default */])(extendedEventOptions, eventOptions);
  }

  var nodes;
  var allNodes = []; // extract all needed data from parserData
  // check out what is parserData in its module

  var leftBracket = _parserdata.leftBracket,
      bindingReg = _parserdata.bindingReg;

  if (typeof givenNodes === 'string') {
    if (~givenNodes.indexOf('<')) {
      // this is HTML
      nodes = _dom["a" /* default */].$.parseHTML(givenNodes);

      if (!~givenNodes.indexOf(leftBracket)) {
        // if it doesn't include parser bracket then we don't need to check
        // their existence for all included nodes in cycle below
        return nodes;
      }
    } else {
      // this is a selector
      nodes = Object(_getnodes["a" /* default */])(object, givenNodes);
    }
  } else if (typeof_default()(givenNodes) === 'object') {
    // this is a node, nodeList or something else (eg array, jQuery instance etc)
    nodes = _dom["a" /* default */].$(givenNodes);
  } // to make possible to not use recursion we're collecting all nodes to allNodes array


  Object(foreach["a" /* default */])(nodes, function (node) {
    return allNodes.push(node);
  }); // on every cycle of array we're adding new descendants to allNodes
  // increasing # of needed iterations

  var _loop = function _loop(i) {
    var node = allNodes[i];
    var ELEMENT_NODE = 1;
    var TEXT_NODE = 3; // allow to parse elements only

    if (node.nodeType !== ELEMENT_NODE) {
      return "continue";
    }

    var outerHTML = node.outerHTML,
        innerHTML = node.innerHTML,
        childNodes = node.childNodes,
        attributes = node.attributes; // if outerHTML does't contain left bracket, then this node doesn't need to be parsed
    // we may need to check outerHTML existence for older browsers
    // we may need to add !~outerHTML.indexOf(encodeURI(leftBracket) to support old FF

    if (!~outerHTML.indexOf(leftBracket)) {
      return "continue";
    } // initialize bindings for attributes if they appear


    if (attributes.length) {
      // fixes Firefox issue: attributes.length can be changed by processAttribute
      var attrs = attributes.length > 1 ? Array.prototype.slice.call(attributes) : attributes;
      Object(foreach["a" /* default */])(attrs, function (attribute) {
        if (bindingReg.test(attribute.value)) {
          processAttribute({
            node: node,
            attribute: attribute,
            object: object,
            eventOptions: extendedEventOptions
          });
        }
      });
    } // if innerHTML does't contain left bracket,
    // then children of this node don't need to be parsed
    // we may need to add !~innerHTML.indexOf(encodeURI(leftBracket) to support old FF


    if (!~innerHTML.indexOf(leftBracket)) {
      return "continue";
    }

    for (var j = 0; j < childNodes.length; j++) {
      var childNode = childNodes[j];
      var nodeType = childNode.nodeType,
          textContent = childNode.textContent;

      if (nodeType === ELEMENT_NODE) {
        // if childNode is HTML element then add it to the end of allNodes array
        // to check everything on next outer cycle iterations
        allNodes.push(childNode);
      } else if (nodeType === TEXT_NODE) {
        // if childNode is text node which contains things like {{x}}
        // then initialize bindings for this node
        if (bindingReg.test(textContent)) {
          processTextNode({
            object: object,
            node: node,
            textNode: childNode,
            eventOptions: extendedEventOptions
          });
        }
      }
    }
  };

  for (var i = 0; i < allNodes.length; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }

  return nodes;
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addTreeListener; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _delegatelistener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _off_removetreelistener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


 // creates tree listener

function createTreeListener(_ref) {
  var handler = _ref.handler,
      restPath = _ref.restPath;

  var newHandler = function treeListener(changeEvent) {
    var extendedChangeEvent = _objectSpread({
      restPath: restPath
    }, changeEvent);

    var previousValue = changeEvent.previousValue,
        value = changeEvent.value; // removes listener for all branches of the path on old object

    if (previousValue && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(previousValue) === 'object') {
      Object(_off_removetreelistener__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(previousValue, restPath, handler);
    } // adds listener for all branches of "restPath" path on newly assigned object


    if (value && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(value) === 'object') {
      addTreeListener(value, restPath, handler);
    } // call original handler


    handler.call(this, extendedChangeEvent);
  };

  newHandler._callback = handler;
  return newHandler;
} // listens changes for all branches of given path
// TODO: Pass context to addTreeListener
// one of the most hard functions to understand


function addTreeListener(object, deepPath, handler) {
  if (typeof deepPath === 'string') {
    deepPath = deepPath.split('.'); // eslint-disable-line no-param-reassign
  } // iterate over all keys and delegate listener for all objects of given branch


  for (var i = 0; i < deepPath.length; i++) {
    // TODO: Array.prototype.slice method is slow
    var listenPath = deepPath.slice(0, i);
    var restPath = deepPath.slice(i + 1);
    Object(_delegatelistener__WEBPACK_IMPORTED_MODULE_2__["default"])(object, listenPath, "_change:tree:".concat(deepPath[i]), createTreeListener({
      handler: handler,
      restPath: restPath
    }));
  }
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return removeTreeListener; });
/* harmony import */ var _undelegatelistener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
 // removes tree listener from all object tree of fiven path
// TODO: Pass context to removeTreeListener

function removeTreeListener(object, deepPath, handler) {
  if (typeof deepPath === 'string') {
    deepPath = deepPath.split('.'); // eslint-disable-line no-param-reassign
  } // iterate over keys of the path and undelegate given handler (can be undefined)


  for (var i = 0; i < deepPath.length; i++) {
    // TODO: Array.prototype.slice is slow
    var listenedPath = deepPath.slice(0, i);
    Object(_undelegatelistener__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(object, listenedPath, "_change:tree:".concat(deepPath[i]), handler);
  }
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/class.js
var src_class = __webpack_require__(20);

// EXTERNAL MODULE: ./src/seemple/index.js + 22 modules
var seemple = __webpack_require__(32);

// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/defineProperty.js
var defineProperty = __webpack_require__(8);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty);

// EXTERNAL MODULE: ./src/seemple/_afterinit.js
var _afterinit = __webpack_require__(29);

// EXTERNAL MODULE: ./src/on/_addlistener.js
var _addlistener = __webpack_require__(11);

// EXTERNAL MODULE: ./src/trigger/_triggerone.js
var _triggerone = __webpack_require__(2);

// EXTERNAL MODULE: ./src/_core/defs.js
var defs = __webpack_require__(3);

// CONCATENATED MODULE: ./src/object/_afterinit.js



 // called on _change:delegated
// tiggers asterisk events logic by triggering _asterisk:set

function changeDelegatedHandler() {
  var eventOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = eventOptions.key;
  var def = defs["a" /* default */].get(this);

  if (key && key in def.keys) {
    Object(_triggerone["a" /* default */])(this, '_asterisk:set', eventOptions);
  }
} // called on _delete:delegated
// removes asterisk events logic by triggering _asterisk:remove


function deleteDelegatedHandler() {
  var eventOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = eventOptions.key;
  var def = defs["a" /* default */].get(this);

  if (key && key in def.keys) {
    Object(_triggerone["a" /* default */])(this, '_asterisk:remove', eventOptions);
  }
} // called on change
// triggers set and modify if data keys are changed


function changeHandler() {
  var eventOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = eventOptions.key,
      silent = eventOptions.silent;
  var def = defs["a" /* default */].get(this);

  if (key && key in def.keys && !silent) {
    Object(_triggerone["a" /* default */])(this, 'set', eventOptions);
    Object(_triggerone["a" /* default */])(this, 'modify', eventOptions);
  }
} // called on delete
// triggers remove and modify if data keys are removed


function deleteHandler() {
  var eventOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = eventOptions.key,
      silent = eventOptions.silent;
  var def = defs["a" /* default */].get(this);

  if (key && key in def.keys) {
    delete def.keys[key];

    if (!silent) {
      Object(_triggerone["a" /* default */])(this, 'remove', eventOptions);
      Object(_triggerone["a" /* default */])(this, 'modify', eventOptions);
    }
  }
} // Seemple.Object initializer


function afterSeempleObjectInit(def) {
  // Seemple initializer
  _afterinit["a" /* default */].call(this); // create a set of data keys

  def.keys = {}; // trigger asterisk events

  Object(_addlistener["a" /* default */])(this, '_change:delegated', changeDelegatedHandler); // trigger asterisk events removal

  Object(_addlistener["a" /* default */])(this, '_delete:delegated', deleteDelegatedHandler); // fire "modify" and "set" events when data key is changed

  Object(_addlistener["a" /* default */])(this, 'change', changeHandler); // fire "modify" and "remove" events when data key is removed

  Object(_addlistener["a" /* default */])(this, 'delete', deleteHandler);
}
// EXTERNAL MODULE: ./src/_core/init.js
var init = __webpack_require__(6);

// EXTERNAL MODULE: ./src/_core/defineprop.js
var defineprop = __webpack_require__(14);

// EXTERNAL MODULE: ./src/_helpers/seempleerror.js
var seempleerror = __webpack_require__(4);

// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// CONCATENATED MODULE: ./src/object/adddatakeys.js




 // adds keys to a list of data keys

function addDataKeys(givenKeys) {
  var _this = this;

  var _initSeemple = Object(init["a" /* default */])(this),
      keys = _initSeemple.keys;

  var newKeys; // accept an array keys or a list of args

  if (givenKeys instanceof Array) {
    newKeys = givenKeys;
  } else {
    newKeys = arguments;
  }

  Object(foreach["a" /* default */])(newKeys, function (key) {
    if (typeof key !== 'string') {
      throw Object(seempleerror["a" /* default */])('adddatakeys:key_type', {
        key: key
      });
    } // if key is not in a list of keys


    if (!(key in keys)) {
      // define descriptors for this property
      var _defineProp = Object(defineprop["a" /* default */])(_this, key),
          value = _defineProp.value;

      var eventOptions = {
        key: key,
        value: value
      }; // add a key to the list of keys

      keys[key] = true; // trigger events which say that data is changed

      Object(_triggerone["a" /* default */])(_this, 'set', eventOptions);
      Object(_triggerone["a" /* default */])(_this, 'modify', eventOptions);
    }
  });
  return this;
}
// CONCATENATED MODULE: ./src/object/removedatakeys.js



 // removes given keys from a list of data keys

function removeDataKeys(givenKeys) {
  var _this = this;

  var def = defs["a" /* default */].get(this);
  /* istanbul ignore if */

  if (!def) {
    return this;
  }

  var keys = def.keys;
  var removedKeys; // accept an array keys or a list of args

  if (givenKeys instanceof Array) {
    removedKeys = givenKeys;
  } else {
    removedKeys = arguments;
  }

  Object(foreach["a" /* default */])(removedKeys, function (key) {
    if (typeof key !== 'string') {
      throw Object(seempleerror["a" /* default */])('removedatakeys:key_type', {
        key: key
      });
    }

    if (key in keys) {
      var eventOptions = {
        key: key,
        value: _this[key]
      };
      delete keys[key]; // fire "modify" and "remove" events

      Object(_triggerone["a" /* default */])(_this, 'modify', eventOptions);
      Object(_triggerone["a" /* default */])(_this, 'remove', eventOptions);
    }
  });
  return this;
}
// CONCATENATED MODULE: ./src/object/isdatakey.js
 // checks is a key present in data keys list

function isDataKey(key) {
  var def = defs["a" /* default */].get(this);
  /* istanbul ignore if */

  if (!def) {
    return false;
  }

  return key in def.keys;
}
// EXTERNAL MODULE: /Users/finom/Work/matreshka/node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__(0);
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// EXTERNAL MODULE: ./src/_helpers/forown.js
var forown = __webpack_require__(5);

// EXTERNAL MODULE: ./src/set.js
var set = __webpack_require__(16);

// CONCATENATED MODULE: ./src/object/setdata.js





 // returns an array of keys listed at inObject but not listed at fromObject

function getNotListedKeys(inObject, fromObject) {
  var result = [];
  Object(forown["a" /* default */])(inObject, function (_, key) {
    if (!(key in fromObject)) {
      result.push(key);
    }
  });
  return result;
} // changes property value and adds given key to a list of data keys


function setData(key, value, eventOptions) {
  var _this = this;

  // if no key or falsy key is given
  if (!key) {
    return this;
  }

  var _initSeemple = Object(init["a" /* default */])(this),
      keys = _initSeemple.keys; // allow to pass key-value object


  if (typeof_default()(key) === 'object') {
    eventOptions = value || {}; // eslint-disable-line no-param-reassign

    var _eventOptions = eventOptions,
        _replaceData = _eventOptions.replaceData; // do not call setData recursivally for better performance

    Object(forown["a" /* default */])(key, function (objVal, objKey) {
      // remove data keys not listed at key-value object
      if (_replaceData) {
        var notListedKeys = getNotListedKeys(keys, key);

        if (notListedKeys.length) {
          _this.removeDataKeys(notListedKeys);
        }
      } // define descriptors for given property


      Object(defineprop["a" /* default */])(_this, objKey); // add a key to a list of keys

      keys[objKey] = 1; // do other things with set method

      Object(set["a" /* default */])(_this, objKey, objVal, eventOptions);
    });
    return this;
  }

  eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign

  var _eventOptions2 = eventOptions,
      replaceData = _eventOptions2.replaceData; // remove all data keys except given key

  if (replaceData) {
    var notListedKeys = getNotListedKeys(keys, defineProperty_default()({}, key, true));

    if (notListedKeys.length) {
      this.removeDataKeys(notListedKeys);
    }
  } // define descriptors for given property


  Object(defineprop["a" /* default */])(this, key); // add a key to a list of keys

  keys[key] = 1; // do other things with set method

  return Object(set["a" /* default */])(this, key, value, eventOptions);
}
// CONCATENATED MODULE: ./src/object/keyof.js
 // iterates over data keys looking for a property with given value
// and returns a key of found property

function keyOf(value) {
  var def = defs["a" /* default */].get(this);
  /* istanbul ignore if */

  if (!def) {
    return null;
  }

  var keysArray = Object.keys(def.keys);

  for (var i = 0; i < keysArray.length; i++) {
    var key = keysArray[i];

    if (this[key] === value) {
      return key;
    }
  }

  return null;
}
// CONCATENATED MODULE: ./src/object/keys.js
 // returns an array which contains all data keys

function keys_keys() {
  var def = defs["a" /* default */].get(this);
  /* istanbul ignore if */

  if (!def) {
    return [];
  }

  return Object.keys(def.keys);
}
// CONCATENATED MODULE: ./src/object/values.js
 // returns an array which contains all data values

function values_keys() {
  var def = defs["a" /* default */].get(this);
  /* istanbul ignore if */

  if (!def) {
    return [];
  }

  var keysArr = Object.keys(def.keys);
  var length = keysArr.length;
  var result = new Array(length);

  for (var i = 0; i < keysArr.length; i++) {
    result[i] = this[keysArr[i]];
  }

  return result;
}
// CONCATENATED MODULE: ./src/object/entries.js
 // returns an array which contains things like [key, value]

function entries_keys() {
  var def = defs["a" /* default */].get(this);
  /* istanbul ignore if */

  if (!def) {
    return [];
  }

  var keysArr = Object.keys(def.keys);
  var length = keysArr.length;
  var result = new Array(length);

  for (var i = 0; i < keysArr.length; i++) {
    var key = keysArr[i];
    result[i] = [key, this[key]];
  }

  return result;
}
// CONCATENATED MODULE: ./src/object/tojson.js

 // converts Seemple.Object instance to ordinary object

function toJSON() {
  var _this = this;

  var recursive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  var _initSeemple = Object(init["a" /* default */])(this),
      keys = _initSeemple.keys;

  var result = {};
  Object(forown["a" /* default */])(keys, function (_, key) {
    var value = _this[key]; // when recursive is true and when value has toJSON method then call it recusively

    if (recursive && value && typeof value.toJSON === 'function') {
      result[key] = value.toJSON(true);
    } else {
      result[key] = value;
    }
  });
  return result;
}
// CONCATENATED MODULE: ./src/object/each.js

 // iterates over data keys and calls callback on every iteration
// @IE for..of is preferable and the method will be removed in one of major versions

function each(callback, thisArg) {
  var _this = this;

  var def = defs["a" /* default */].get(this);
  var ctx = typeof thisArg !== 'undefined' ? thisArg : this;
  /* istanbul ignore if */

  if (!def) {
    return this;
  }

  Object(forown["a" /* default */])(def.keys, function (_, key) {
    callback.call(ctx, _this[key], key, _this);
  });
  return this;
}
// CONCATENATED MODULE: ./src/object/iterator.js
// Symbol.iterator of Seemple.Object instances
function seempleObjectIterator() {
  var _this = this;

  var keys = this.keys();
  var i = 0;
  return {
    next: function next() {
      if (i > keys.length - 1) {
        return {
          done: true
        };
      }

      return {
        done: false,
        value: _this[keys[i++]] // eslint-disable-line no-plusplus

      };
    }
  };
}
// CONCATENATED MODULE: ./src/object/_prototype.js













var symbolIterator = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';
/* harmony default export */ var _prototype = (defineProperty_default()({
  _afterInit: afterSeempleObjectInit,
  setData: setData,
  addDataKeys: addDataKeys,
  removeDataKeys: removeDataKeys,
  isDataKey: isDataKey,
  keys: keys_keys,
  values: values_keys,
  entries: entries_keys,
  keyOf: keyOf,
  toJSON: toJSON,
  each: each,
  isSeempleObject: true,
  jset: setData
}, symbolIterator, seempleObjectIterator));
// CONCATENATED MODULE: ./src/object/index.js





_prototype["extends"] = seemple["default"];

_prototype.constructor = function SeempleObject(data) {
  if (!(this instanceof SeempleObject)) {
    throw Object(seempleerror["a" /* default */])('common:call_class');
  }

  Object(init["a" /* default */])(this); // return is used to make possible to chain super() calls

  return typeof data !== 'undefined' ? this.setData(data) : this;
};

var object_SeempleObject = Object(src_class["a" /* default */])(_prototype);
/* harmony default export */ var object = __webpack_exports__["default"] = (object_SeempleObject);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var Seemple = __webpack_require__(32)["default"];

var SeempleArray = __webpack_require__(26)["default"];

var SeempleObject = __webpack_require__(45)["default"];

Seemple.Object = SeempleObject;
Seemple.Array = SeempleArray;
module.exports = Seemple;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return removeDomListener; });
/* harmony import */ var _core_defs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _removelistener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _helpers_foreach__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1);



 // removes dom listener from nodes bound to given key

function removeDomListener(object, key, eventName, selector, callback, context, info) {
  var def = _core_defs__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].get(object);

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
    // collect bound nodes and remove DOM event listener
    var nodes = Array(bindings.length);
    var eventNamespace = def.id + key;
    Object(_helpers_foreach__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(bindings, function (binding, index) {
      nodes[index] = binding.node;
    });
    _dom__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].$(nodes).off("".concat(eventName, ".").concat(eventNamespace), selector, callback);
  } // remove bind and unbind listeners from given key


  Object(_removelistener__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(object, "bind:".concat(key), callback, context, info);
  Object(_removelistener__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(object, "unbind:".concat(key), callback, context, info);
  return object;
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// returns a binder for innerHTML of an element
module.exports = html;

function html(mappingFn) {
  return {
    on: 'input',
    // the event name fires only in contenteditable mode
    getValue: function () {
      return this.innerHTML;
    },
    setValue: function (value) {
      var val = typeof mappingFn === 'function' ? mappingFn(value) : value;

      if (val instanceof window.HTMLElement) {
        this.innerHTML = '';
        this.appendChild(val);
      } else {
        this.innerHTML = "" + val;
      }
    }
  };
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//  returns a binder to switch visibility of an element
module.exports = display;

function display() {
  var switcher = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    on: null,
    getValue: function () {
      var value = this.style.display || window.getComputedStyle(this).getPropertyValue('display');
      var none = value === 'none';
      return switcher ? !none : none;
    },
    setValue: function (value) {
      var style = this.style;

      if (typeof switcher === 'function') {
        style.display = switcher(value) ? '' : 'none';
      } else if (switcher) {
        style.display = value ? '' : 'none';
      } else {
        style.display = value ? 'none' : '';
      }
    }
  };
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classlist = __webpack_require__(54);

var toggle = _classlist.toggle;
var contains = _classlist.contains;
// returns a binder for className of an element
// switcher makes possible to turn property value
module.exports = className;

function className(elementClassName) {
  var switcher = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return {
    on: null,
    getValue: function () {
      var value = contains(this, elementClassName);
      return switcher ? value : !value;
    },
    setValue: function (value) {
      toggle(this, elementClassName, switcher ? !!value : !value);
    }
  };
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @IE9
var add;
var remove;
var contains; // eslint-disable-line import/no-mutable-exports

/* istanbul ignore else */

if (window.document.createElement('div').classList) {
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
    var re = new RegExp("(^|\\s)" + name + "(\\s|$)", 'g');

    if (!re.test(node.className)) {
      node.className = (node.className + " " + name).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
    }
  };

  remove = function (node, name) {
    var re = new RegExp("(^|\\s)" + name + "(\\s|$)", 'g');
    node.className = node.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
  };

  contains = function (node, name) {
    return new RegExp("(\\s|^)" + name + "(\\s|$)").test(node.className);
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

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// returns a binder to change properties of an element
module.exports = prop;

function prop(propertyName, mappingFn) {
  return {
    on: null,
    getValue: function () {
      return this[propertyName];
    },
    setValue: function (value) {
      var val = typeof mappingFn === 'function' ? mappingFn(value) : value; // in case when you're trying to set read-only property

      try {
        this[propertyName] = val;
      } catch (e) {// cannot set given property (eg tagName)
      }
    }
  };
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// returns a binder for element attribute
module.exports = attr;

function attr(attributeName, mappingFn) {
  return {
    on: null,
    getValue: function () {
      return this.getAttribute(attributeName);
    },
    setValue: function (value) {
      var val = typeof mappingFn === 'function' ? mappingFn(value) : value;
      this.setAttribute(attributeName, val);
    }
  };
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// returns a binder for textContent of an element
module.exports = text;

function text(mappingFn) {
  return {
    on: 'input',
    // the event name fires only in contenteditable mode
    getValue: function () {
      return this.textContent;
    },
    setValue: function (value) {
      var val = typeof mappingFn === 'function' ? mappingFn(value) : value;
      this.textContent = "" + val;
    }
  };
}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// returns a binder for style properties
module.exports = style;

function style(property, mappingFn) {
  return {
    on: null,
    getValue: function () {
      return this.style[property] || window.getComputedStyle(this).getPropertyValue(property);
    },
    setValue: function (value) {
      var val = typeof mappingFn === 'function' ? mappingFn(value) : value;
      this.style[property] = val;
    }
  };
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// replace namesLikeThis with names-like-this
var replacer = function (u) {
  return "-" + u.toLowerCase();
};

var toDashed = function (name) {
  return "data-" + name.replace(/([A-Z])/g, replacer);
}; //  returns a binder for dataset of an element
// old browsers are also supported @IE9 @IE10


module.exports = dataset;

function dataset(prop, mappingFn) {
  return {
    on: null,
    getValue: function () {
      if (this.dataset) {
        return this.dataset[prop];
      }
      /* istanbul ignore next */


      return this.getAttribute(toDashed(prop));
    },
    setValue: function (value) {
      var val = typeof mappingFn === 'function' ? mappingFn(value) : value;

      if (this.dataset) {
        this.dataset[prop] = val;
      } else {
        /* istanbul ignore next */
        this.setAttribute(toDashed(prop), val);
      }
    }
  };
}

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = existence;

function existence() {
  var switcher = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var comment;
  return {
    setValue: function (value) {
      var node = this;
      var tagName = node.tagName,
          id = node.id,
          classList = node.classList,
          className = node.className;

      if (!comment) {
        var commentText = tagName;

        if (id) {
          commentText += "#" + id;
        }

        if (className) {
          commentText += "." + [].slice.apply(classList).join('.');
        }

        comment = window.document.createComment(commentText);
      }

      if (typeof switcher === 'function') {
        value = switcher(value); // eslint-disable-line no-param-reassign
      } else if (!switcher) {
        value = !value; // eslint-disable-line no-param-reassign
      }

      if (value) {
        delete node.__replacedByNode;

        if (comment.parentNode) {
          comment.parentNode.insertBefore(node, comment);
          comment.parentNode.removeChild(comment);
        }
      }

      if (!value) {
        node.__replacedByNode = comment;

        if (node.parentNode) {
          node.parentNode.insertBefore(comment, node);
          node.parentNode.removeChild(node);
        }
      }
    }
  };
}

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/_core/init.js
var init = __webpack_require__(6);

// EXTERNAL MODULE: ./src/_core/defineprop.js
var defineprop = __webpack_require__(14);

// EXTERNAL MODULE: ./src/on/_addlistener.js
var _addlistener = __webpack_require__(11);

// EXTERNAL MODULE: ./src/_dom/index.js + 1 modules
var _dom = __webpack_require__(12);

// EXTERNAL MODULE: ./src/_helpers/apply.js
var apply = __webpack_require__(10);

// CONCATENATED MODULE: ./src/on/_createdomeventhandler.js
 // returns DOM event handler

function createDomEventHandler(_ref) {
  var key = _ref.key,
      object = _ref.object,
      callback = _ref.callback,
      context = _ref.context;
  return function domEventHandler(domEvent) {
    var originalEvent = domEvent.originalEvent || domEvent; // seempleTriggerArgs are created when DOM event is triggered by trigger method

    var triggerArgs = originalEvent.seempleTriggerArgs;
    var which = domEvent.which,
        target = domEvent.target,
        ctrlKey = domEvent.ctrlKey,
        altKey = domEvent.altKey;

    if (triggerArgs) {
      // if args are passed to trigger method then pass them to an event handler
      Object(apply["a" /* default */])(callback, context, triggerArgs);
    } else {
      // use the following object as an arg for event handler
      callback.call(context, {
        self: object,
        node: this,
        preventDefault: function preventDefault() {
          return domEvent.preventDefault();
        },
        stopPropagation: function stopPropagation() {
          return domEvent.stopPropagation();
        },
        key: key,
        domEvent: domEvent,
        originalEvent: originalEvent,
        which: which,
        target: target,
        ctrlKey: ctrlKey,
        altKey: altKey
      });
    }
  };
}
// EXTERNAL MODULE: ./src/_helpers/foreach.js
var foreach = __webpack_require__(1);

// CONCATENATED MODULE: ./src/on/_adddomlistener.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addDomListener; });





 // returns an object with event handlers used at addDomListener

function createBindingHandlers(_ref) {
  var fullEventName = _ref.fullEventName,
      domEventHandler = _ref.domEventHandler,
      selector = _ref.selector;
  return {
    bindHandler: function bindHandler() {
      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var node = evt.node;

      if (node) {
        _dom["a" /* default */].$(node).on(fullEventName, selector, domEventHandler);
      }
    },
    unbindHandler: function unbindHandler() {
      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var node = evt.node;

      if (node) {
        _dom["a" /* default */].$(node).off(fullEventName, selector, domEventHandler);
      }
    }
  };
} // adds DOM event listener for nodes bound to given property


function addDomListener(object, key, eventName, selector, callback, context, info) {
  var def = Object(init["a" /* default */])(object);
  var propDef = Object(defineprop["a" /* default */])(object, key);
  var domEventHandler = createDomEventHandler({
    key: key,
    object: object,
    callback: callback,
    context: context || object
  }); // making possible to remove this event listener

  domEventHandler._callback = callback;
  var eventNamespace = def.id + key;
  var fullEventName = "".concat(eventName, ".").concat(eventNamespace);

  var _createBindingHandler = createBindingHandlers({
    fullEventName: fullEventName,
    domEventHandler: domEventHandler,
    selector: selector
  }),
      bindHandler = _createBindingHandler.bindHandler,
      unbindHandler = _createBindingHandler.unbindHandler;

  var addBindListenerResult = Object(_addlistener["a" /* default */])(object, "bind:".concat(key), bindHandler, context, info);
  var addUnbindListenerResult = Object(_addlistener["a" /* default */])(object, "unbind:".concat(key), unbindHandler, context, info); // if events are added successfully then run bindHandler for every node immediately
  // TODO: Describe why do we need addBindListenerResult and addUnbindListenerResult

  if (addBindListenerResult && addUnbindListenerResult) {
    var bindings = propDef.bindings;

    if (bindings) {
      Object(foreach["a" /* default */])(bindings, function (_ref2) {
        var node = _ref2.node;
        return bindHandler({
          node: node
        });
      });
    }
  }

  return object;
}

/***/ })
/******/ ]);
});if(typeof Seemple === "function") this.MK = Seemple;