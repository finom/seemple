/* Matreshka 2 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Matreshka"] = factory();
	else
		root["Matreshka"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	var Matreshka = __webpack_require__(1);

	var MatreshkaArray = __webpack_require__(50);

	var MatreshkaObject = __webpack_require__(13);

	Matreshka.Object = MatreshkaObject;
	Matreshka.Array = MatreshkaArray;

	module.exports = Matreshka;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Class = __webpack_require__(2);

	var staticMembers = __webpack_require__(3);

	var instanceMembers = __webpack_require__(147);

	var initMK = __webpack_require__(18);

	var matreshkaError = __webpack_require__(25);

	instanceMembers.constructor = function Matreshka() {
	    if (!(this instanceof Matreshka)) {
	        throw matreshkaError('common:call_class');
	    }

	    initMK(this);
	};

	var Matreshka = Class(instanceMembers, staticMembers);

	module.exports = Matreshka;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// static methods and properties of classes will be hidden under Symbol('staticNames')
	var staticNamesProperty = typeof Symbol === 'function' ? Symbol('staticNames') : '__staticNames';
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	module.exports = Class;
	function Class(prototype, staticProps) {
	    var Constructor = hasOwnProperty.call(prototype, 'constructor') ? prototype.constructor : function EmptyConstructor() {};
	    // extends is kept for backward compatibility
	    var Parent = prototype.extends;
	    // inherit proto from class parent or empty object
	    var proto = Object.create(Parent ? Parent.prototype : {});
	    var parentStaticNames = Parent ? Parent[staticNamesProperty] : undefined;

	    // allow to pass symbols as prototype properties
	    var _result = proto;

	    for (var _source2 = prototype, _keys4 = Object.keys(_source2), _l7 = _keys4.length, _i4 = 0, _key2; _i4 < _l7; _i4++) {
	        _key2 = _keys4[_i4];
	        _result[_key2] = _source2[_key2];
	    }

	    if (getOwnPropertySymbols) {
	        var symbols = getOwnPropertySymbols(prototype);

	        for (var _target = symbols, _index = 0, symbol, _l2 = _target.length; symbol = _target[_index], _index < _l2; _index++) {
	            proto[symbol] = prototype[symbol];
	        }
	    }

	    // inherit staric properties of a parent
	    if (typeof parentStaticNames === 'object') {
	        (function () {
	            var staticNames = Constructor[staticNamesProperty] || {};
	            Constructor[staticNamesProperty] = staticNames;

	            // inherit static properties of a parent when their keys are symbols
	            for (var _target2 = parentStaticNames, _keys2 = Object.keys(_target2), _i2 = 0, name, _, _l3 = _keys2.length; (name = _keys2[_i2], _ = _target2[name]), _i2 < _l3; _i2++) {
	                Constructor[name] = Parent[name];
	                staticNames[name] = true;
	            }

	            if (getOwnPropertySymbols) {
	                var _symbols = getOwnPropertySymbols(parentStaticNames);

	                for (var _target3 = _symbols, _index2 = 0, symbol, _l4 = _target3.length; symbol = _target3[_index2], _index2 < _l4; _index2++) {
	                    Constructor[symbol] = Parent[symbol];
	                    staticNames[symbol] = true;
	                }
	            }
	        })();
	    }

	    // extend Constructor with passed static properties
	    if (typeof staticProps === 'object') {
	        (function () {
	            var staticNames = Constructor[staticNamesProperty] || {};
	            Constructor[staticNamesProperty] = staticNames;

	            // extend Constructor with passed static properties if their keys are symbols
	            for (var _target4 = staticProps, _keys3 = Object.keys(_target4), _i3 = 0, key, value, _l5 = _keys3.length; (key = _keys3[_i3], value = _target4[key]), _i3 < _l5; _i3++) {
	                Constructor[key] = value;
	                staticNames[key] = true;
	            }

	            if (getOwnPropertySymbols) {
	                var _symbols2 = getOwnPropertySymbols(staticProps);

	                for (var _target5 = _symbols2, _index3 = 0, symbol, _l6 = _target5.length; symbol = _target5[_index3], _index3 < _l6; _index3++) {
	                    Constructor[symbol] = staticProps[symbol];
	                    staticNames[symbol] = true;
	                }
	            }
	        })();
	    }

	    Constructor.prototype = proto;

	    // if new Class({}) is called return its instance
	    if (this instanceof Class) {
	        return new Constructor();
	    }

	    return Constructor;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaultBinders = __webpack_require__(4);

	var lookForBinder = __webpack_require__(10);

	var parserBrackers = __webpack_require__(11);

	var Class = __webpack_require__(2);

	var toMatreshka = __webpack_require__(12);

	var _binders = __webpack_require__(120);

	var binders = _binders;

	var _universalmethods = __webpack_require__(130);

	var universalMethods = _universalmethods;

	var assign = __webpack_require__(39);

	var useDOMLibrary = __webpack_require__(146);

	module.exports = assign({
	    Class: Class,
	    defaultBinders: defaultBinders,
	    lookForBinder: lookForBinder,
	    binders: binders,
	    parserBrackers: parserBrackers,
	    toMatreshka: toMatreshka,
	    useDOMLibrary: useDOMLibrary
	}, universalMethods);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var input = __webpack_require__(5);

	var textarea = __webpack_require__(6);

	var select = __webpack_require__(7);

	var progress = __webpack_require__(8);

	var output = __webpack_require__(9);

	// defaultBinders collection by default contains only one function-checker
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
/* 5 */
/***/ function(module, exports) {

	'use strict';

	// returns a binder for input element based on its type
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
	        getValue: function () {
	            return this.value;
	        },
	        setValue: function (value) {
	            this.value = value;
	        }
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var input = __webpack_require__(5);

	// returns a binder for textarea element
	module.exports = textarea;
	function textarea() {
	    // textarea behaves just like text input
	    return input('text');
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	// returns a binder for select element
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var input = __webpack_require__(5);

	// returns a binder for textarea element
	module.exports = progress;
	function progress() {
	    return input();
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	// returns a binder for output element
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
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaultBinders = __webpack_require__(4);

	// tries to find a binder for given node
	module.exports = lookForBinder;
	function lookForBinder(node) {
	    for (var i = 0; i < defaultBinders.length; i++) {
	        var binder = defaultBinders[i].call(node, node);
	        if (binder) {
	            return binder;
	        }
	    }

	    return undefined;
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	// brackets for bindings parser
	module.exports = {
	    left: '{{',
	    right: '}}'
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// recursively converts objects and arrays to Matreshka.Object and Matreshka.Array instances
	module.exports = toMatreshka;
	function toMatreshka(data) {
	    // fix circular ref issue
	    var MatreshkaObject = __webpack_require__(13);
	    var MatreshkaArray = __webpack_require__(50);

	    // convert only objects
	    if (data && typeof data === 'object') {
	        var _ret = function () {
	            if ('length' in data) {
	                var _ret2 = function () {
	                    // if length is given convert it to Matreshka.Array instance
	                    var arrayItems = Array(data.length);

	                    for (var _target = data, index = 0, item, _l = _target.length; item = _target[index], index < _l; index++) {
	                        arrayItems[index] = toMatreshka(item);
	                    }

	                    return {
	                        v: {
	                            v: new MatreshkaArray().recreate(arrayItems)
	                        }
	                    };
	                }();

	                if (typeof _ret2 === "object") return _ret2.v;
	            }

	            // if length is not given convert it to Matreshka.Object instance
	            var object = {};

	            for (var _target2 = data, _keys = Object.keys(_target2), _i = 0, key, value, _l2 = _keys.length; (key = _keys[_i], value = _target2[key]), _i < _l2; _i++) {
	                object[key] = toMatreshka(value);
	            }

	            return {
	                v: new MatreshkaObject(object)
	            };
	        }();

	        if (typeof _ret === "object") return _ret.v;
	    }

	    // for all non-objects just return passed data
	    return data;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Class = __webpack_require__(2);

	var Matreshka = __webpack_require__(1);

	var instanceMembers = __webpack_require__(14);

	var matreshkaError = __webpack_require__(25);

	var initMK = __webpack_require__(18);

	instanceMembers.extends = Matreshka;

	instanceMembers.constructor = function MatreshkaObject(data) {
	    if (!(this instanceof MatreshkaObject)) {
	        throw matreshkaError('common:call_class');
	    }

	    initMK(this);

	    // return is used to make possible to chain super() calls
	    return typeof data !== 'undefined' ? this.setData(data) : this;
	};

	var MatreshkaObject = Class(instanceMembers);

	module.exports = MatreshkaObject;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _afterInit$setData$ad;

	var _afterInit = __webpack_require__(15);

	var addDataKeys = __webpack_require__(41);

	var removeDataKeys = __webpack_require__(42);

	var isDataKey = __webpack_require__(43);

	var setData = __webpack_require__(44);

	var keyOf = __webpack_require__(45);

	var keys = __webpack_require__(46);

	var toJSON = __webpack_require__(47);

	var each = __webpack_require__(48);

	var iterator = __webpack_require__(49);

	var symbolIterator = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';

	module.exports = (_afterInit$setData$ad = {
	    _afterInit: _afterInit,
	    setData: setData,
	    addDataKeys: addDataKeys,
	    removeDataKeys: removeDataKeys,
	    isDataKey: isDataKey,
	    keys: keys,
	    keyOf: keyOf,
	    toJSON: toJSON,
	    each: each,
	    isMatreshkaObject: true,
	    jset: setData }, _afterInit$setData$ad[symbolIterator] = iterator, _afterInit$setData$ad);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var afterMatreshkaInit = __webpack_require__(16);

	var addListener = __webpack_require__(17);

	var triggerOne = __webpack_require__(20);

	var defs = __webpack_require__(19);

	// called on _change:delegated
	// tiggers asterisk events logic by triggering _asterisk:set
	function changeDelegatedHandler() {
	    var eventOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var key = eventOptions.key;

	    var def = defs.get(this);

	    if (key && key in def.keys) {
	        triggerOne(this, '_asterisk:set', eventOptions);
	    }
	}

	// called on _delete:delegated
	// removes asterisk events logic by triggering _asterisk:remove
	function deleteDelegatedHandler() {
	    var eventOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var key = eventOptions.key;

	    var def = defs.get(this);

	    if (key && key in def.keys) {
	        triggerOne(this, '_asterisk:remove', eventOptions);
	    }
	}

	// called on change
	// triggers set and modify if data keys are changed
	function changeHandler() {
	    var eventOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var key = eventOptions.key;
	    var silent = eventOptions.silent;

	    var def = defs.get(this);

	    if (key && key in def.keys && !silent) {
	        triggerOne(this, 'set', eventOptions);
	        triggerOne(this, 'modify', eventOptions);
	    }
	}

	// called on delete
	// triggers remove and modify if data keys are removed
	function deleteHandler() {
	    var eventOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var key = eventOptions.key;
	    var silent = eventOptions.silent;

	    var def = defs.get(this);

	    if (key && key in def.keys) {
	        delete def.keys[key];

	        if (!silent) {
	            triggerOne(this, 'remove', eventOptions);
	            triggerOne(this, 'modify', eventOptions);
	        }
	    }
	}

	// Matreshka.Object initializer
	module.exports = afterMatreshkaObjectInit;
	function afterMatreshkaObjectInit(def) {
	    // Matreshka initializer
	    afterMatreshkaInit.call(this);
	    // create a set of data keys
	    def.keys = {};

	    // trigger asterisk events
	    addListener(this, '_change:delegated', changeDelegatedHandler);

	    // trigger asterisk events removal
	    addListener(this, '_delete:delegated', deleteDelegatedHandler);

	    // fire "modify" and "set" events when data key is changed
	    addListener(this, 'change', changeHandler);

	    // fire "modify" and "remove" events when data key is removed
	    addListener(this, 'delete', deleteHandler);
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	// Matreshka initializer
	module.exports = afterMatreshkaInit;
	function afterMatreshkaInit() {
	    this.nodes = {};
	    this.$nodes = {};
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var triggerOne = __webpack_require__(20);

	var defineProp = __webpack_require__(22);

	var domEventReg = __webpack_require__(27);

	// property modifier event regexp
	var propModEventReg // eslint-disable-next-line max-len
	= /^_change:deps:|^_change:bindings:|^_change:delegated:|^_change:common:|^_change:tree:|^change:|^beforechange:/;

	// adds simple event listener
	// used as core of event engine
	module.exports = addListener;
	function addListener(object, name, callback, context) {
	    var info = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

	    var _initMK = initMK(object);

	    var allEvents = _initMK.events;

	    var ctx = context || object;
	    var events = allEvents[name];
	    var event = { callback: callback, context: context, ctx: ctx, name: name, info: info };
	    // skipChecks is used by internal methods for better performance
	    var _info$skipChecks = info.skipChecks;
	    var skipChecks = _info$skipChecks === undefined ? false : _info$skipChecks;


	    if (!skipChecks) {
	        var domEventExecResult = domEventReg.exec(name);

	        if (domEventExecResult) {
	            var eventName = domEventExecResult[1];
	            var _domEventExecResult$ = domEventExecResult[2];
	            var key = _domEventExecResult$ === undefined ? 'sandbox' : _domEventExecResult$;
	            var selector = domEventExecResult[3];
	            // fixing circular reference issue

	            var addDomListener = __webpack_require__(28);

	            addDomListener(object, key, eventName, selector, callback, context, info);

	            return true;
	        }
	    }

	    // if there are events with the same name
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
	        }

	        // if the event isn't found add it to the event list
	        events.push(event);
	    } else {
	        // if there are no events with the same name, create an array with only  one event
	        allEvents[name] = [event];
	    }

	    if (propModEventReg.test(name)) {
	        // define needed accessors for KEY
	        defineProp(object, name.replace(propModEventReg, ''));
	    }

	    // names prefixed by underscore mean "private" events
	    if (!skipChecks && name[0] !== '_') {
	        triggerOne(object, 'addevent:' + name, event);
	        triggerOne(object, 'addevent', event);
	    }

	    // if event is added successfully return true
	    return true;
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var objectId = 0;

	// this is common function which associates an object with its Matreshka definition
	module.exports = initMK;
	function initMK(object) {
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
	                }*/
	            },
	            id: objectId
	        };

	        objectId += 1;

	        defs.set(object, def);

	        if (object._afterInit) {
	            object._afterInit(def);
	        }
	    }

	    return def;
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	function PseudoMap() {}

	// PseudoMap simulates WeakMap behavior with O(1) search complexity
	// it's needed to support @IE9 and @IE10
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

	var apply = __webpack_require__(21);

	// triggers one event
	module.exports = triggerOne;
	function triggerOne(object, name, triggerArgs) {
	    var def = defs.get(object);
	    var events = def && def.events[name];

	    if (events) {
	        var l = events.length;
	        var i = 0;

	        // allow to pass both array of args and single arg as triggerArgs
	        if (triggerArgs instanceof Array) {
	            while (i < l) {
	                var event = triggerOne.latestEvent = events[i];
	                var callback = event.callback;
	                var ctx = event.ctx;

	                apply(callback, ctx, triggerArgs);
	                i += 1;
	            }
	        } else {
	            while (i < l) {
	                var _event = triggerOne.latestEvent = events[i];
	                var _callback = _event.callback;
	                var _ctx = _event.ctx;

	                _callback.call(_ctx, triggerArgs);
	                i += 1;
	            }
	        }
	    }
	}

	// latestEvent is used as required hack in somemethods
	triggerOne.latestEvent = {
	    info: {},
	    name: null
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	module.exports = apply;
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
	                return func.apply(context, args); // eslint-disable-line prefer-spread
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
	            return func.apply(undefined, args); // eslint-disable-line prefer-spread
	    }
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var set = __webpack_require__(23);

	var matreshkaError = __webpack_require__(25);

	function errorAccessor() {
	    throw matreshkaError('common:use_magic_props');
	}

	// the function defines needed descriptor for given property
	module.exports = defineProp;
	function defineProp(object, key, noAccessor) {
	    var def = defs.get(object);

	    // if no object definition do nothing
	    if (!def) {
	        return null;
	    }

	    if (!def.props[key]) {
	        (function () {
	            var propDef = def.props[key] = {
	                value: object[key],
	                mediator: null,
	                bindings: null
	            };
	            var getter = void 0;
	            var setter = void 0;

	            // make possible to throw an error on get and on set if sandbox (for all objects)
	            // or container (for Matreshka.Array instances) are used
	            if (key === 'sandbox' || object.isMatreshkaArray && key === 'container') {
	                getter = setter = errorAccessor;
	            }

	            if (!noAccessor) {
	                Object.defineProperty(object, key, {
	                    configurable: true,
	                    enumerable: true,
	                    get: function () {
	                        return getter ? getter() : propDef.value;
	                    },
	                    set: function (v) {
	                        return setter ? setter() : set(object, key, v, {
	                            fromSetter: true
	                        });
	                    }
	                });
	            }
	        })();
	    }

	    return def.props[key];
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var triggerOne = __webpack_require__(20);

	var checkObjectType = __webpack_require__(24);

	var is = __webpack_require__(26);

	// the function sets new value for a property
	// since its performance is very critical we're checking events existence manually
	module.exports = set;
	function set(object, key, value, eventOptions) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        eventOptions = value;
	        value = key;
	        key = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'set');
	    }

	    // if no key or falsy key is given
	    if (!key) {
	        return object;
	    }

	    // allow to use key-value object as another method variation
	    if (typeof key === 'object') {
	        for (var _target = key, _keys = Object.keys(_target), _i = 0, objKey, objVal, _l = _keys.length; (objKey = _keys[_i], objVal = _target[objKey]), _i < _l; _i++) {
	            set(object, objKey, objVal, value)
	        }

	        return object;
	    }

	    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
	    var def = defs.get(object);

	    // if no object definition then make simple assignment
	    if (!def) {
	        object[key] = value;
	        return object;
	    }

	    var props = def.props;
	    var events = def.events;

	    var propDef = props[key];

	    // if no property definition then make simple assignment
	    if (!propDef) {
	        object[key] = value;
	        return object;
	    }

	    var previousValue = propDef.value;
	    var mediator = propDef.mediator;

	    // possible flags, all of them are falsy by default

	    var _eventOptions = eventOptions;
	    var skipMediator = _eventOptions.skipMediator;
	    var fromMediator = _eventOptions.fromMediator;
	    var force = _eventOptions.force;
	    var forceHTML = _eventOptions.forceHTML;
	    var silent = _eventOptions.silent;
	    var silentHTML = _eventOptions.silentHTML;
	    var skipCalc = _eventOptions.skipCalc;


	    var newValue = void 0;

	    if (mediator && !is(value, previousValue) && !skipMediator && !fromMediator) {
	        newValue = mediator(value);
	    } else {
	        newValue = value;
	    }

	    var isChanged = !is(newValue, previousValue);

	    // add to eventOptions object some useful properties
	    // we override default eventOptions because some of the properties need to have actual values,
	    // not inherited ones (eg when calc is used)

	    var _keys2,
	        _l2,
	        _i2,
	        _source,
	        _key,
	        _result = {};

	    for (_source = eventOptions, _keys2 = Object.keys(_source), _l2 = _keys2.length, _i2 = 0; _i2 < _l2; _i2++) {
	        _key = _keys2[_i2];
	        _result[_key] = _source[_key];
	    }

	    _result.value = newValue
	    _result.self = object
	    _result.previousValue = previousValue
	    _result.key = key
	    _result.isChanged = isChanged
	    var extendedEventOptions = _result;

	    var triggerChange = (isChanged || force) && !silent;

	    // trigger beforechange:KEY and beforechange events
	    if (triggerChange) {
	        var beforechangeStr = 'beforechange';
	        var beforechangeEventName = beforechangeStr + ':' + key;

	        if (events[beforechangeEventName]) {
	            triggerOne(object, beforechangeEventName, extendedEventOptions);
	        }

	        if (events[beforechangeStr]) {
	            triggerOne(object, beforechangeStr, extendedEventOptions);
	        }
	    }

	    propDef.value = newValue;

	    // triger bindings
	    if (!silentHTML && (isChanged || forceHTML)) {
	        var changeBindingsEventName = '_change:bindings:' + key;
	        if (events[changeBindingsEventName]) {
	            triggerOne(object, changeBindingsEventName, extendedEventOptions);
	        }
	    }

	    // trigger change:KEY and change events
	    if (triggerChange) {
	        var changeStr = 'change';
	        var changeEventName = changeStr + ':' + key;
	        if (events[changeEventName]) {
	            triggerOne(object, changeEventName, extendedEventOptions);
	        }

	        if (events[changeStr]) {
	            triggerOne(object, changeStr, extendedEventOptions);
	        }
	    }

	    // trigger dependencies made by calc method
	    if ((isChanged || force) && !skipCalc) {
	        var changeDepsEventName = '_change:deps:' + key;
	        if (events[changeDepsEventName]) {
	            triggerOne(object, changeDepsEventName, extendedEventOptions);
	        }
	    }

	    if (isChanged) {
	        // trigger common delegated events logic
	        var changeDelegatedKeyEventName = '_change:delegated:' + key;
	        if (events[changeDelegatedKeyEventName]) {
	            triggerOne(object, changeDelegatedKeyEventName, extendedEventOptions);
	        }

	        // trigger tree change events logic
	        var changeTreeEventName = '_change:tree:' + key;
	        if (events[changeTreeEventName]) {
	            triggerOne(object, changeTreeEventName, extendedEventOptions);
	        }

	        // trigger other internal change events
	        var changeCommonEventName = '_change:common:' + key;
	        if (events[changeCommonEventName]) {
	            triggerOne(object, changeCommonEventName, extendedEventOptions);
	        }

	        // trigger delegated logic for asterisk events (*.*.*@foo)
	        // TODO: Confusing events names ("_change:delegated", "_change:common:KEY" etc)
	        var changeDelegatedEventName = '_change:delegated';
	        if (events[changeDelegatedEventName]) {
	            triggerOne(object, changeDelegatedEventName, extendedEventOptions);
	        }
	    }

	    return object;
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var matreshkaError = __webpack_require__(25);

	// checks type of a variable and throws an error if its type is not an object
	module.exports = checkObjectType;
	function checkObjectType(object, method) {
	    var typeofObject = object === null ? 'null' : typeof object;

	    if (typeofObject !== 'object' && typeofObject !== 'function') {
	        throw matreshkaError('common:object_type', {
	            object: object,
	            method: method
	        });
	    }
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	/* eslint-disable prefer-template, max-len */
	var bindingErrorPrefix = 'Binding error:';
	var calcErrorPrefix = 'Calc error:';
	var eventsErrorPrefix = 'Events error:';
	var arrayErrorPrefix = 'Matreshka.Array error:';

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
	    'common:object_type': function (_ref) {
	        var object = _ref.object;
	        var method = _ref.method;
	        return 'Error in ' + method + ':' + getTypeError(object, 'object', 'object');
	    },
	    'common:call_class': function () {
	        return 'Cannot call a class as a function';
	    },
	    'common:use_magic_props': function () {
	        return '"sandbox" key (for all objects) and "container" key (for Matreshka.Array instances)' + ' are reserved for service use and cannot be used as usual properties';
	    },

	    'binding:node_missing': function (_ref2) {
	        var key = _ref2.key;
	        var node = _ref2.node;

	        var selectorInfo = typeof node === 'string' ? ' (given selector is "' + node + '")' : '';
	        return bindingErrorPrefix + ' node is missing for key "' + key + '"' + selectorInfo + '.';
	    },
	    'binding:falsy_key': function () {
	        return bindingErrorPrefix + ' "key" arg cannot be falsy';
	    },
	    'binding:instance_nodes_missing': function (_ref3) {
	        var $nodes = _ref3.$nodes;

	        var missing = !$nodes ? '$nodes' : 'nodes';
	        return bindingErrorPrefix + ' "' + missing + '" property of Matreshka instance is missing.' + ' It must be an object and must not be reassigned.';
	    },
	    'binding:magic_props_nodes_length': function () {
	        return bindingErrorPrefix + ' "sandbox" key (for all objects) and "container" key' + ' (for Matreshka.Array instances) cannot have more than one bound node';
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
	    },

	    'array:model_type': function (_ref8) {
	        var Model = _ref8.Model;
	        return arrayErrorPrefix + ' ' + getTypeError(Model, 'Model', 'function');
	    },
	    'array:add_render_twice': function () {
	        return arrayErrorPrefix + ' one rendered object was inserted twice.';
	    },
	    'array:rendered_number_nodes': function (_ref9) {
	        var length = _ref9.length;
	        return arrayErrorPrefix + ' renderer returned ' + length + ' nodes instead of one.' + (' ' + (length > 0 ? 'To fix this wrap these nodes by single node.' : ''));
	    },
	    'array:renderer_node_missing': function (_ref10) {
	        var selector = _ref10.selector;
	        return arrayErrorPrefix + ' renderer node is missing (given selector is "' + selector + '")';
	    },

	    'pull:to_remove_type': function (_ref11) {
	        var toRemove = _ref11.toRemove;
	        return 'Error in pull: ' + getTypeError(toRemove, 'toRemove', 'number');
	    },

	    'restore:no_nodes': function () {
	        return arrayErrorPrefix + ' cannot find any container to restore an instance using "restore" method';
	    },

	    'trigger:names_type': function (_ref12) {
	        var names = _ref12.names;
	        return eventsErrorPrefix + ' ' + getTypeError(names, 'event name', 'string');
	    },

	    'on:names_type': function (_ref13) {
	        var names = _ref13.names;
	        return errors['trigger:names_type']({ names: names });
	    },

	    'removedatakeys:key_type': function (_ref14) {
	        var key = _ref14.key;
	        return 'Error in removeDataKeys: ' + getTypeError(key, 'key', 'string');
	    },

	    'adddatakeys:key_type': function (_ref15) {
	        var key = _ref15.key;
	        return 'Error in addDataKeys: ' + getTypeError(key, 'key', 'string');
	    },

	    'remove:key_type': function (_ref16) {
	        var key = _ref16.key;
	        return 'Error in remove: ' + getTypeError(key, 'key', 'string');
	    },

	    'mediate:key_type': function (_ref17) {
	        var key = _ref17.key;
	        return 'Error in mediate: ' + getTypeError(key, 'key', 'string');
	    }
	};

	module.exports = matreshkaError;
	function matreshkaError(key, data) {
	    var getError = errors[key];
	    if (!getError) {
	        throw Error('Unknown error "' + key + '". Please report about this on Github.');
	    }

	    return new Error(getError(data));
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";

	// determines whether two values are the same value
	/* istanbul ignore next */
	// eslint-disable-next-line
	var isPolyfill = function (v1, v2) {
	  return v1 === 0 && v2 === 0 ? 1 / v1 === 1 / v2 : v1 !== v1 && v2 !== v2 || v1 === v2;
	};

	module.exports = Object.is || isPolyfill;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	// the regexp allows to parse things like "click::x(.y)"
	// it's shared between few modules
	module.exports = /([^::]+)::([^\(\)]+)?(?:\((.*)\))?/;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var defineProp = __webpack_require__(22);

	var addListener = __webpack_require__(17);

	var dom = __webpack_require__(29);

	var createDomEventHandler = __webpack_require__(40);

	// returns an object with event handlers used at addDomListener
	function createBindingHandlers(_ref) {
	    var fullEventName = _ref.fullEventName;
	    var domEventHandler = _ref.domEventHandler;
	    var selector = _ref.selector;

	    return {
	        bindHandler: function () {
	            var evt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var node = evt.node;

	            if (node) {
	                dom.$(node).on(fullEventName, selector, domEventHandler);
	            }
	        },
	        unbindHandler: function () {
	            var evt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	            var node = evt.node;

	            if (node) {
	                dom.$(node).off(fullEventName, selector, domEventHandler);
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
	        context: context || object
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
	    // TODO: Describe why do we need addBindListenerResult and addUnbindListenerResult
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(30);

	module.exports = { $: $ };

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mq = __webpack_require__(31);

	// check existence of needed methods in $ global variable
	// to use it for internal needs

	var neededMethods = ['on', 'off', 'add']; /* global $ */


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
	        globalDollar.parseHTML = mq.parseHTML;
	    }
	} else {
	    useGlobalDollar = false;
	}

	module.exports = useGlobalDollar ? globalDollar : mq;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Init = __webpack_require__(32);

	var parseHTML = __webpack_require__(34);

	var on = __webpack_require__(35);

	var off = __webpack_require__(37);

	var add = __webpack_require__(38);

	var assign = __webpack_require__(39);

	// tiny jQuery replacement for Matreshka
	// mq previously called balalaika.js
	module.exports = mq;
	function mq(selector, context) {
	    return new Init(selector, context);
	}

	mq.parseHTML = parseHTML;

	assign(Init.prototype, {
	    on: on,
	    off: off,
	    add: add
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var html2nodeList = __webpack_require__(33);

	var win = window;

	// function-constructor of mq library
	// accepts many kinds of arguments (selector, html, function)
	function MQInit(selector, context) {
	    var result = void 0;

	    if (selector) {
	        if (selector.nodeType || typeof win === 'object' && selector === win) {
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
	}

	MQInit.prototype = [];

	module.exports = MQInit;

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
	    var node = window.document.createElement('div');
	    var i = void 0;

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

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var html2nodeList = __webpack_require__(33);

	var Init = __webpack_require__(32);

	// parses given HTML and returns mq instance
	module.exports = parseHTML;
	function parseHTML(html) {
	    return new Init(html2nodeList(html));
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var data = __webpack_require__(36);

	var splitBySpaceReg = /\s+/;
	var splitByDotReg = /\.(.+)/;

	// checks an element against a selector
	function is(node, selector) {
	    return (node.matches || node.webkitMatchesSelector || node.mozMatchesSelector || node.msMatchesSelector || node.oMatchesSelector).call(node, selector);
	}

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

	    if (is(evt.target, matching)) {
	        handler.call(this, evt);
	    }

	    this.removeAttribute(randomID);
	}

	// adds event listener to a set of elemnts
	module.exports = on;
	function on(namesStr, selector, handler) {
	    var names = namesStr.split(splitBySpaceReg);
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
	        var _names$i$split = names[i].split(splitByDotReg);

	        var name = _names$i$split[0];
	        var namespace = _names$i$split[1];


	        for (var j = 0; j < this.length; j++) {
	            var node = this[j];
	            var nodeID = node.b$ = node.b$ || ++data.nodeIndex; // eslint-disable-line no-plusplus
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
/* 36 */
/***/ function(module, exports) {

	"use strict";

	// an object allows to share data between modules; it's needed because we use
	// simplified ES modules there and cannot import and share a number
	module.exports = {
	    nodeIndex: 0,
	    allEvents: {}
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var data = __webpack_require__(36);

	var splitBySpaceReg = /\s+/;
	var splitByDotReg = /\.(.+)/;

	// removes event handler from a set of elements
	module.exports = off;
	function off(namesStr, selector, handler) {
	    if (typeof selector === 'function') {
	        handler = selector; // eslint-disable-line no-param-reassign
	        selector = null; // eslint-disable-line no-param-reassign
	    }

	    var names = namesStr.split(splitBySpaceReg);

	    for (var i = 0; i < names.length; i++) {
	        var _names$i$split = names[i].split(splitByDotReg);

	        var name = _names$i$split[0];
	        var namespace = _names$i$split[1];


	        for (var j = 0; j < this.length; j++) {
	            var node = this[j];
	            var events = data.allEvents[name + node.b$];

	            if (events) {
	                for (var k = 0; k < events.length; k++) {
	                    var event = events[k];
	                    if ((!handler || handler === event.handler || handler === event.delegate) && (!namespace || namespace === event.namespace) && (!selector || selector === event.selector)) {
	                        node.removeEventListener(name, event.delegate || event.handler);
	                        events.splice(k, 1);
	                        k -= 1;
	                    }
	                }
	            } else if (!namespace && !selector) {
	                node.removeEventListener(name, handler);
	            }
	        }
	    }

	    return this;
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Init = __webpack_require__(32);

	var data = __webpack_require__(36);

	// adds unique nodes to mq collection
	module.exports = add;
	function add(selector) {
	    var idMap = {};

	    var result = void 0;

	    var nodes = new Init(selector);

	    if (this.length) {
	        result = new Init();
	        for (var i = 0; i < this.length; i++) {
	            var node = this[i];
	            var nodeID = node.b$ = node.b$ || ++data.nodeIndex; // eslint-disable-line no-plusplus
	            idMap[nodeID] = 1;
	            result.push(node);
	        }

	        for (var _i = 0; _i < nodes.length; _i++) {
	            var _node = nodes[_i];
	            var _nodeID = _node.b$ = _node.b$ || ++data.nodeIndex; // eslint-disable-line no-plusplus
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

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

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
	            for (var _target = source, _keys = Object.keys(_target), _i = 0, nextKey, nextValue, _l = _keys.length; (nextKey = _keys[_i], nextValue = _target[nextKey]), _i < _l; _i++) {
	                output[nextKey] = nextValue;
	            }
	        }
	    }

	    return output;
	};

	module.exports = assign;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(21);

	// returns DOM event handler
	module.exports = createDomEventHandler;
	function createDomEventHandler(_ref) {
	    var key = _ref.key;
	    var object = _ref.object;
	    var callback = _ref.callback;
	    var context = _ref.context;

	    return function domEventHandler(domEvent) {
	        var originalEvent = domEvent.originalEvent || domEvent;
	        // matreshkaTriggerArgs are created when DOM event is triggered by trigger method
	        var triggerArgs = originalEvent.matreshkaTriggerArgs;
	        var which = domEvent.which;
	        var target = domEvent.target;
	        var ctrlKey = domEvent.ctrlKey;
	        var altKey = domEvent.altKey;


	        if (triggerArgs) {
	            // if args are passed to trigger method then pass them to an event handler
	            apply(callback, context, triggerArgs);
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
	                target: target,
	                ctrlKey: ctrlKey,
	                altKey: altKey
	            });
	        }
	    };
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var defineProp = __webpack_require__(22);

	var matreshkaError = __webpack_require__(25);

	var triggerOne = __webpack_require__(20);

	// adds keys to a list of data keys
	module.exports = addDataKeys;
	function addDataKeys(givenKeys) {
	    var _this = this;

	    var _initMK = initMK(this);

	    var keys = _initMK.keys;


	    var newKeys = void 0;

	    // accept an array keys or a list of args
	    if (givenKeys instanceof Array) {
	        newKeys = givenKeys;
	    } else {
	        newKeys = arguments;
	    }

	    for (var _target = newKeys, _index = 0, key, _l = _target.length; key = _target[_index], _index < _l; _index++) {
	        if (typeof key !== 'string') {
	            throw matreshkaError('adddatakeys:key_type', { key: key });
	        }

	        // if key is not in a list of keys
	        if (!(key in keys)) {
	            // define descriptors for this property
	            var _defineProp = defineProp(_this, key);

	            var value = _defineProp.value;

	            var eventOptions = { key: key, value: value };

	            // add a key to the list of keys
	            keys[key] = true;

	            // trigger events which say that data is changed
	            triggerOne(_this, 'set', eventOptions);
	            triggerOne(_this, 'modify', eventOptions);
	        }
	    }

	    return this;
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var triggerOne = __webpack_require__(20);

	var matreshkaError = __webpack_require__(25);

	// removes given keys from a list of data keys
	module.exports = removeDataKeys;
	function removeDataKeys(givenKeys) {
	    var _this = this;

	    var def = defs.get(this);

	    if (!def) {
	        return this;
	    }

	    var keys = def.keys;

	    var removedKeys = void 0;

	    // accept an array keys or a list of args
	    if (givenKeys instanceof Array) {
	        removedKeys = givenKeys;
	    } else {
	        removedKeys = arguments;
	    }

	    for (var _target = removedKeys, _index = 0, key, _l = _target.length; key = _target[_index], _index < _l; _index++) {
	        if (typeof key !== 'string') {
	            throw matreshkaError('removedatakeys:key_type', { key: key });
	        }

	        if (key in keys) {
	            var eventOptions = {
	                key: key,
	                value: _this[key]
	            };

	            delete keys[key];

	            // fire "modify" and "remove" events
	            triggerOne(_this, 'modify', eventOptions);
	            triggerOne(_this, 'remove', eventOptions);
	        }
	    }

	    return this;
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	// checks is a key present in data keys list
	module.exports = isDataKey;
	function isDataKey(key) {
	    var def = defs.get(this);

	    if (!def) {
	        return false;
	    }

	    return key in def.keys;
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var defineProp = __webpack_require__(22);

	var set = __webpack_require__(23);

	// returns an array of keys listed at inObject but not listed at fromObject
	function getNotListedKeys(inObject, fromObject) {
	    var result = [];

	    for (var _target = inObject, _keys = Object.keys(_target), _i = 0, key, _, _l = _keys.length; (key = _keys[_i], _ = _target[key]), _i < _l; _i++) {
	        if (!(key in fromObject)) {
	            result.push(key);
	        }
	    }

	    return result;
	}

	// changes property value and adds given key to a list of data keys
	module.exports = setData;
	function setData(key, value, eventOptions) {
	    var _this = this;

	    // if no key or falsy key is given
	    if (!key) {
	        return this;
	    }

	    var _initMK = initMK(this);

	    var keys = _initMK.keys;

	    // allow to pass key-value object

	    if (typeof key === 'object') {
	        var _ret = function () {
	            eventOptions = value || {}; // eslint-disable-line no-param-reassign

	            var _eventOptions = eventOptions;
	            var replaceData = _eventOptions.replaceData;

	            // do not call setData recursivally for better performance

	            for (var _target2 = key, _keys2 = Object.keys(_target2), _i2 = 0, objKey, objVal, _l2 = _keys2.length; (objKey = _keys2[_i2], objVal = _target2[objKey]), _i2 < _l2; _i2++) {
	                // remove data keys not listed at key-value object
	                if (replaceData) {
	                    var notListedKeys = getNotListedKeys(keys, key);

	                    if (notListedKeys.length) {
	                        _this.removeDataKeys(notListedKeys);
	                    }
	                }

	                // define descriptors for given property
	                defineProp(_this, objKey);

	                // add a key to a list of keys
	                keys[objKey] = 1;

	                // do other things with set method
	                set(_this, objKey, objVal, eventOptions);
	            }

	            return {
	                v: _this
	            };
	        }();

	        if (typeof _ret === "object") return _ret.v;
	    }

	    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign

	    var _eventOptions2 = eventOptions;
	    var replaceData = _eventOptions2.replaceData;

	    // remove all data keys except given key

	    if (replaceData) {
	        var _getNotListedKeys;

	        var notListedKeys = getNotListedKeys(keys, (_getNotListedKeys = {}, _getNotListedKeys[key] = true, _getNotListedKeys));

	        if (notListedKeys.length) {
	            this.removeDataKeys(notListedKeys);
	        }
	    }

	    // define descriptors for given property
	    defineProp(this, key);

	    // add a key to a list of keys
	    keys[key] = 1;

	    // do other things with set method
	    return set(this, key, value, eventOptions);
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	// iterates over data keys looking for a property with given value
	// and returns a key of found property
	module.exports = keyOf;
	function keyOf(value) {
	    var def = defs.get(this);

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

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	// returns an array which contains all data keys
	module.exports = keys;
	function keys() {
	    var def = defs.get(this);

	    if (!def) {
	        return [];
	    }

	    return Object.keys(def.keys);
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	// converts Matreshka.Object instance to ordinary object
	module.exports = toJSON;
	function toJSON() {
	    var _this = this;

	    var recursive = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	    var _initMK = initMK(this);

	    var keys = _initMK.keys;

	    var result = {};

	    for (var _target = keys, _keys = Object.keys(_target), _i = 0, key, _, _l = _keys.length; (key = _keys[_i], _ = _target[key]), _i < _l; _i++) {
	        var value = _this[key];
	        // when recursive is true and when value has toJSON method then call it recusively
	        if (recursive && value && typeof value.toJSON === 'function') {
	            result[key] = value.toJSON(true);
	        } else {
	            result[key] = value;
	        }
	    }

	    return result;
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	// iterates over data keys and calls callback on every iteration
	// @IE for..of is preferable and the method will be removed in one of major versions
	module.exports = each;
	function each(callback, thisArg) {
	    var _this = this;

	    var def = defs.get(this);
	    var ctx = typeof thisArg !== 'undefined' ? thisArg : this;

	    if (!def) {
	        return this;
	    }

	    for (var _target = def.keys, _keys = Object.keys(_target), _i = 0, key, _, _l = _keys.length; (key = _keys[_i], _ = _target[key]), _i < _l; _i++) {
	        callback.call(ctx, _this[key], key, _this);
	    }

	    return this;
	}

/***/ },
/* 49 */
/***/ function(module, exports) {

	"use strict";

	// Symbol.iterator of Matreshka.Object instances
	module.exports = matreshkaObjectIterator;
	function matreshkaObjectIterator() {
	    var _this = this;

	    var keys = this.keys();
	    var i = 0;

	    return {
	        next: function () {
	            if (i > keys.length - 1) {
	                return { done: true };
	            }

	            return {
	                done: false,
	                value: _this[keys[i++]] // eslint-disable-line no-plusplus
	            };
	        }
	    };
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Class = __webpack_require__(2);

	var Matreshka = __webpack_require__(1);

	var instanceMembers = __webpack_require__(51);

	var matreshkaError = __webpack_require__(25);

	var initMK = __webpack_require__(18);

	var staticMembers = __webpack_require__(117);

	instanceMembers.extends = Matreshka;

	instanceMembers.constructor = function MatreshkaArray(length) {
	    var _this = this;

	    if (!(this instanceof MatreshkaArray)) {
	        throw matreshkaError('common:call_class');
	    }

	    initMK(this);

	    // repeat the same logic as for native Array
	    if (arguments.length === 1 && typeof length === 'number') {
	        this.length = length;
	    } else {
	        for (var _target = arguments, index = 0, arg, _l = _target.length; arg = _target[index], index < _l; index++) {
	            _this[index] = arg;
	        }

	        this.length = arguments.length;
	    }

	    // return is used to make possible to chain super() calls
	    return this;
	};

	var MatreshkaArray = Class(instanceMembers, staticMembers);

	module.exports = MatreshkaArray;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _assign;

	var assign = __webpack_require__(39);

	var _afterInit = __webpack_require__(52);

	var mediateItem = __webpack_require__(53);

	var orderBy = __webpack_require__(54);

	var pull = __webpack_require__(101);

	var recreate = __webpack_require__(102);

	var rerender = __webpack_require__(105);

	var restore = __webpack_require__(106);

	var toJSON = __webpack_require__(107);

	var pseudoNativeMethods = __webpack_require__(108);

	var iterator = __webpack_require__(116);

	var symbolIterator = typeof Symbol === 'function' ? Symbol.iterator : '@@iterator';

	module.exports = assign((_assign = {
	    _afterInit: _afterInit,
	    mediateItem: mediateItem,
	    orderBy: orderBy,
	    pull: pull,
	    recreate: recreate,
	    rerender: rerender,
	    restore: restore,
	    toJSON: toJSON,
	    length: 0,
	    isMatreshkaArray: true
	}, _assign[symbolIterator] = iterator, _assign), pseudoNativeMethods);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var afterMatreshkaInit = __webpack_require__(16);

	var addListener = __webpack_require__(17);

	var matreshkaError = __webpack_require__(25);

	// the function returns array item converted to Model instance
	function modelItemMediator(item, index) {
	    var Model = this.Model;

	    // if an item is already instance of Model

	    if (item instanceof Model) {
	        return item;
	    }

	    var itemData = void 0;

	    if (item && typeof item.toJSON === 'function') {
	        // if item is not falsy and if it has toJSON method
	        // then retrieve instance data by this method
	        itemData = item.toJSON(false);
	    } else {
	        // if not then use an item as its data
	        itemData = item;
	    }

	    return new Model(itemData, this, index);
	}

	// event handler to listen changes of Model property
	function changeModel() {
	    var Model = this.Model;

	    // if model has wrong type then throw an error

	    if (typeof Model !== 'function') {
	        throw matreshkaError('array:model_type', { Model: Model });
	    }

	    // attatch item mediator
	    this.mediateItem(modelItemMediator);
	}

	// event handler to listen changes of itemRenderer property
	function changeItemRendererHandler() {
	    var eventOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var _eventOptions$forceRe = eventOptions.forceRerender;
	    var forceRerender = _eventOptions$forceRe === undefined ? true : _eventOptions$forceRe;

	    this.rerender({ forceRerender: forceRerender });
	}

	// Matreshka.Array initializer
	module.exports = afterMatreshkaArrayInit;
	function afterMatreshkaArrayInit() {
	    // we need to calculate hasModel before change:Model is added
	    var hasModel = 'Model' in this;

	    // call Matreshka initializer
	    afterMatreshkaInit.call(this);

	    addListener(this, '_change:common:Model', changeModel, this, {
	        skipChecks: true
	    });

	    addListener(this, '_change:common:itemRenderer', changeItemRendererHandler, this, {
	        skipChecks: true
	    });

	    // call changeModel handler immediately if model is present
	    // it will throw an error if Model is not a function
	    if (hasModel) {
	        changeModel.call(this);
	    }
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	// creates item mediator
	function createItemMediator(_ref) {
	    var arr = _ref.arr;
	    var mediator = _ref.mediator;

	    return function itemMediator(value, index) {
	        // args: value, old value, index, array itself
	        return mediator.call(arr, value, index, arr);
	    };
	}

	// defines a "type" of every array item
	module.exports = mediateItem;
	function mediateItem(mediator) {
	    var def = initMK(this);
	    var length = this.length;

	    // store itemMediator in object definition

	    var itemMediator = def.itemMediator = createItemMediator({
	        arr: this,
	        mediator: mediator
	    });

	    // convert existing items
	    for (var i = 0; i < length; i++) {
	        this[i] = itemMediator(this[i], i);
	    }

	    return this;
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cheapRecreate = __webpack_require__(55);

	var pureOrderBy = __webpack_require__(56);

	var reportModified = __webpack_require__(57);

	// sorts by properties of items
	module.exports = orderBy;
	function orderBy(keys, orders) {
	    var eventOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    if (this.length > 1) {
	        cheapRecreate(this, pureOrderBy(this, keys, orders));

	        var _keys,
	            _l,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.method = 'sort'
	        _result.self = this
	        _result.added = []
	        _result.removed = []

	        for (_source = eventOptions, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        reportModified(this, _result);
	    }

	    return this;
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";

	// makes cheap array recreation (with no trackBy, with no events, with no item mediator etc)
	module.exports = cheapRecreate;
	function cheapRecreate(self) {
	    var newItems = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

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

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	// the function orders by given order data any array-like object
	module.exports = pureOrderBy;
	function pureOrderBy(arr, givenKeys, orders) {
	    if ('length' in arr && typeof arr === 'object') {
	        var _ret = function () {
	            var defaultOrder = 'asc';
	            var commonOrder = void 0;

	            if (!(orders instanceof Array)) {
	                commonOrder = orders || defaultOrder;
	            }

	            var length = arr.length;

	            var result = Array(length);

	            for (var i = 0; i < length; i++) {
	                result[i] = arr[i];
	            }

	            if (!givenKeys) {
	                return {
	                    v: result
	                };
	            }

	            var keys = givenKeys instanceof Array ? givenKeys : [givenKeys];

	            return {
	                v: result.sort(function (a, b) {
	                    if (a && b) {
	                        for (var _i = 0; _i < keys.length; _i++) {
	                            var key = keys[_i];
	                            var order = (commonOrder || orders[_i]) !== 'desc' ? -1 : 1;

	                            if (a[key] > b[key]) {
	                                return -order;
	                            } else if (a[key] < b[key]) {
	                                return order;
	                            }
	                        }
	                    }

	                    return 0;
	                })
	            };
	        }();

	        if (typeof _ret === "object") return _ret.v;
	    }

	    return [];
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var triggerOne = __webpack_require__(20);

	var processRendering = __webpack_require__(58);

	// fires events and triggers rendering logic
	module.exports = reportModified;
	function reportModified(self, eventOptions) {
	    var added = eventOptions.added;
	    var removed = eventOptions.removed;
	    var silent = eventOptions.silent;
	    var method = eventOptions.method;
	    var dontRender = eventOptions.dontRender;

	    var addedLength = added.length;
	    var removedLength = removed.length;
	    var modified = addedLength || removedLength || method === 'sort' || method === 'reverse';

	    var _defs$get = defs.get(self);

	    var events = _defs$get.events;
	    var _self$renderIfPossibl = self.renderIfPossible;
	    var renderIfPossible = _self$renderIfPossibl === undefined ? true : _self$renderIfPossibl;

	    var asteriskAddEvtName = '_asterisk:add';
	    var asteriskRemoveEvtName = '_asterisk:remove';

	    // if something is added and an array has delegated "asterisk" events
	    // then attatch delegated event handlers to newly added items
	    if (addedLength && events[asteriskAddEvtName]) {
	        triggerOne(self, asteriskAddEvtName, eventOptions);
	    }

	    // if something is removed and an array has delegated "asterisk" events
	    // then remove delegated event handlers from removed items
	    if (removedLength && events[asteriskRemoveEvtName]) {
	        triggerOne(self, asteriskRemoveEvtName, eventOptions);
	    }

	    if (!silent) {
	        // fire additional event name (like "push")
	        if (events[method]) {
	            triggerOne(self, method, eventOptions);
	        }

	        // if something is added then fire add and addone events
	        if (addedLength) {
	            if (events.add) {
	                triggerOne(self, 'add', eventOptions);
	            }

	            if (events.addone) {
	                for (var i = 0; i < addedLength; i++) {
	                    triggerOne(self, 'addone', {
	                        self: self,
	                        addedItem: added[i]
	                    });
	                }
	            }
	        }

	        // if something is removed then fire add and addone events
	        if (removedLength) {
	            if (events.remove) {
	                triggerOne(self, 'remove', eventOptions);
	            }

	            if (events.removeone) {
	                for (var _i = 0; _i < removedLength; _i++) {
	                    triggerOne(self, 'removeone', {
	                        self: self,
	                        removedItem: removed[_i]
	                    });
	                }
	            }
	        }

	        // modify event says that something is added or removed
	        if (events.modify) {
	            triggerOne(self, 'modify', eventOptions);
	        }
	    }

	    // trigger rendering logic if possible
	    if (modified && !dontRender && renderIfPossible) {
	        processRendering({
	            self: self,
	            eventOptions: eventOptions
	        });
	    }
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var processPush = __webpack_require__(59);

	var processUnshift = __webpack_require__(94);

	var processRecreate = __webpack_require__(95);

	var processSort = __webpack_require__(97);

	var processRemove = __webpack_require__(98);

	var processRerender = __webpack_require__(99);

	var processSpliceAdd = __webpack_require__(100);

	// makes possible to render array items based on a name of called method
	module.exports = processRendering;
	function processRendering(_ref) {
	    var self = _ref.self;
	    var eventOptions = _ref.eventOptions;
	    var method = eventOptions.method;
	    var added = eventOptions.added;
	    var removed = eventOptions.removed;
	    // nodes object always exist at Matreshka instances

	    var container = self.nodes.container || self.nodes.sandbox;
	    var selfDef = defs.get(self);

	    if (!container) {
	        return;
	    }

	    switch (method) {
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
	            return;
	    }
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var renderItemNode = __webpack_require__(60);

	var triggerOne = __webpack_require__(20);

	var checkAlreadyRendered = __webpack_require__(93);

	// this function renders inserted items if possible when push method is called
	module.exports = processPush;
	function processPush(_ref) {
	    var self = _ref.self;
	    var selfDef = _ref.selfDef;
	    var eventOptions = _ref.eventOptions;
	    var container = _ref.container;
	    var added = eventOptions.added;
	    var silent = eventOptions.silent;

	    for (var _target = added, _index = 0, item, _l = _target.length; item = _target[_index], _index < _l; _index++) {
	        if (item && typeof item === 'object') {
	            // if a node of an item is already rendered then throw an error
	            checkAlreadyRendered({
	                item: item,
	                selfDef: selfDef
	            });

	            // render

	            var _renderItemNode = renderItemNode({
	                selfDef: selfDef,
	                self: self,
	                item: item,
	                eventOptions: eventOptions
	            });

	            var node = _renderItemNode.node;
	            var itemEventOptions = _renderItemNode.itemEventOptions;


	            if (node) {
	                container.appendChild(node);
	                if (!silent) {
	                    triggerOne(item, 'afterrender', itemEventOptions);
	                }
	            }
	        }
	    }
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parseBindings = __webpack_require__(61);

	var bindNode = __webpack_require__(80);

	var unbindNode = __webpack_require__(85);

	var triggerOne = __webpack_require__(20);

	var initMK = __webpack_require__(18);

	var matreshkaError = __webpack_require__(25);

	var getNodes = __webpack_require__(81);

	var htmlTestReg = /</;

	// the function makes the main rendering job
	// it renders given array item
	module.exports = renderItemNode;
	function renderItemNode(_ref) {
	    var selfDef = _ref.selfDef;
	    var self = _ref.self;
	    var item = _ref.item;
	    var eventOptions = _ref.eventOptions;
	    var renderer = item.renderer;
	    var _item$bindRenderedAsS = item.bindRenderedAsSandbox;
	    var bindRenderedAsSandbox = _item$bindRenderedAsS === undefined ? true : _item$bindRenderedAsS;
	    var itemRenderer = self.itemRenderer;

	    var usedRenderer = renderer || itemRenderer;
	    var rendererContext = usedRenderer === renderer ? item : self;
	    var selfId = selfDef.id;
	    var moveSandbox = eventOptions.moveSandbox;
	    var forceRerender = eventOptions.forceRerender;
	    var silent = eventOptions.silent;

	    // if renderer is not found return null as a node

	    if (!usedRenderer) {
	        return { node: null };
	    }

	    var itemDef = initMK(item);
	    var _itemDef$renderedInAr = itemDef.renderedInArrays;
	    var renderedInArrays = _itemDef$renderedInAr === undefined ? {} : _itemDef$renderedInAr;

	    // if moveSandbox option is truthy then return a sandbox of an item

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

	                renderedInArrays[selfId] = _node;

	                // moving sandbox does not fire "render" event but it fire "afterrender"
	                // since "afterrender" means "node is inserted to DOM"
	                return {
	                    node: _node,
	                    itemEventOptions: {
	                        node: _node,
	                        self: item,
	                        parentArray: self
	                    }
	                };
	            }
	        }
	    }

	    itemDef.renderedInArrays = renderedInArrays;

	    // if usedRenderer is function then call it
	    if (typeof usedRenderer === 'function') {
	        usedRenderer = usedRenderer.call(rendererContext, item);
	    }

	    // if usedRenderer is string
	    if (typeof usedRenderer === 'string') {
	        if (!htmlTestReg.test(usedRenderer)) {
	            // if usedRenderer is a selector
	            var selector = usedRenderer;

	            usedRenderer = getNodes(self, selector);

	            if (usedRenderer.length) {
	                // if a node is found by given selector then use its HTML
	                usedRenderer = usedRenderer[0].innerHTML.trim();
	            } else {
	                // if not throw an error
	                throw matreshkaError('array:renderer_node_missing', { selector: selector });
	            }
	        } else {
	            // if usedRenderer is HTML string
	            usedRenderer = usedRenderer.trim();
	        }
	    }

	    // pass a node or HTML
	    var parsed = parseBindings(item, usedRenderer, eventOptions);

	    // if parseBindings returned more/less than one node then throw an error
	    if (parsed.length !== 1) {
	        throw matreshkaError('array:rendered_number_nodes', { length: parsed.length });
	    }

	    var node = renderedInArrays[selfId] = parsed[0];

	    if (bindRenderedAsSandbox) {
	        if (forceRerender) {
	            unbindNode(item, 'sandbox', null, null, eventOptions);
	        }

	        bindNode(item, 'sandbox', node, null, eventOptions);
	    }

	    // if silent is not truthy then fire 'render' event and virtual methods
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

	        triggerOne(item, 'render', itemEventOptions);

	        return { node: node, itemEventOptions: itemEventOptions };
	    }

	    return { node: node };
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var checkObjectType = __webpack_require__(24);

	var dom = __webpack_require__(29);

	var parserData = __webpack_require__(62);

	var processTextNode = __webpack_require__(79);

	var processAttribute = __webpack_require__(90);

	var getNodes = __webpack_require__(81);

	// makes parsing of given node (node, $(nodes), selector, HTML)
	// and initializes bindings for attributes and text nodes which contain things like {{foo}}
	module.exports = parseBindings;
	function parseBindings(object, givenNodes, eventOptions) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        eventOptions = givenNodes;
	        givenNodes = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'parseBindings');
	    }

	    var extendedEventOptions = {
	        // useExactBinder is little optimization
	        // without this option used binder is extended by default binder
	        useExactBinder: true,
	        fromParser: true,
	        setValueOnBind: true
	    };

	    if (typeof eventOptions === 'object') {
	        var _result = extendedEventOptions;

	        for (var _source2 = eventOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	            _key2 = _keys2[_i2];
	            _result[_key2] = _source2[_key2];
	        }
	    }

	    var nodes = void 0;
	    var allNodes = [];
	    // extract all needed data from parserData
	    // check out what is parserData in its module
	    var leftBracket = parserData.leftBracket;
	    var bindingReg = parserData.bindingReg;


	    if (typeof givenNodes === 'string') {
	        if (~givenNodes.indexOf('<')) {
	            // this is HTML
	            nodes = dom.$.parseHTML(givenNodes);
	            if (!~givenNodes.indexOf(leftBracket)) {
	                // if it doesn't include parser bracket then we don't need to check
	                // their existence for all included nodes in cycle below
	                return nodes;
	            }
	        } else {
	            // this is a selector
	            nodes = getNodes(object, givenNodes);
	        }
	    } else if (typeof givenNodes === 'object') {
	        // this is a node, nodeList or something else (eg array, jQuery instance etc)
	        nodes = dom.$(givenNodes);
	    }

	    // to make possible to not use recursion we're collecting all nodes to allNodes array

	    // on every cycle of array we're adding new descendants to allNodes
	    // increasing # of needed iterations
	    for (var _target = nodes, _index = 0, node, _l3 = _target.length; node = _target[_index], _index < _l3; _index++) {
	        allNodes.push(node)
	    }

	    var _loop = function (i) {
	        var node = allNodes[i];
	        var ELEMENT_NODE = 1;
	        var TEXT_NODE = 3;

	        // allow to parse elements only
	        if (node.nodeType !== ELEMENT_NODE) {
	            return 'continue';
	        }

	        var outerHTML = node.outerHTML;
	        var innerHTML = node.innerHTML;
	        var childNodes = node.childNodes;
	        var attributes = node.attributes;

	        // if outerHTML does't contain left bracket, then this node doesn't need to be parsed
	        // we may need to check outerHTML existence for older browsers
	        // we may need to add !~outerHTML.indexOf(encodeURI(leftBracket) to support old FF

	        if (!~outerHTML.indexOf(leftBracket)) {
	            return 'continue';
	        }

	        // initialize bindings for attributes if they appear
	        if (attributes.length) {
	            for (var _target2 = attributes, _index2 = 0, attribute, _l4 = _target2.length; attribute = _target2[_index2], _index2 < _l4; _index2++) {
	                if (bindingReg.test(attribute.value)) {
	                    processAttribute({
	                        node: node,
	                        attribute: attribute,
	                        object: object,
	                        eventOptions: extendedEventOptions
	                    });
	                }
	            }
	        }

	        // if innerHTML does't contain left bracket,
	        // then children of this node don't need to be parsed
	        // we may need to add !~innerHTML.indexOf(encodeURI(leftBracket) to support old FF
	        if (!~innerHTML.indexOf(leftBracket)) {
	            return 'continue';
	        }

	        for (var j = 0; j < childNodes.length; j++) {
	            var childNode = childNodes[j];
	            var nodeType = childNode.nodeType;
	            var textContent = childNode.textContent;


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

	        if (_ret === 'continue') continue;
	    }

	    return nodes;
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var calc = __webpack_require__(63);

	var parserBrackets = __webpack_require__(11);

	var parserData = {};

	// since Matreshka allows to change parser brackets via parserBrackets objects
	// the parser needs to generate required regular expressions and escaped brackets every time
	// when parseBindings is called
	// to optimize this behavior parserData object is created
	// it calculates needed data every time when parserBrackets are changed
	// and when parseBindings function is called it uses previously generated regeps
	// from parserData object
	calc(parserData, {
	    leftBracket: {
	        source: {
	            object: parserBrackets,
	            key: 'left'
	        }
	    },
	    rightBracket: {
	        source: {
	            object: parserBrackets,
	            key: 'right'
	        }
	    },
	    escLeftBracket: {
	        source: 'leftBracket',
	        handler: function (left) {
	            return left.replace(/(\[|\(|\?)/g, '\\$1');
	        }
	    },
	    escRightBracket: {
	        source: 'rightBracket',
	        handler: function (right) {
	            return right.replace(/(\]|\)|\?)/g, '\\$1');
	        }
	    },
	    bindingReg: {
	        source: ['escLeftBracket', 'escRightBracket'],
	        handler: function (left, right) {
	            return new RegExp(left + '(.+?)' + right, 'g');
	        }
	    },
	    strictBindingReg: {
	        source: ['escLeftBracket', 'escRightBracket'],
	        handler: function (left, right) {
	            return new RegExp('^' + left + '(.+?)' + right + '$', 'g');
	        }
	    }
	}, {
	    debounceCalc: false // we need to get new regexps immediately when brackets are changed
	});

	module.exports = parserData;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var checkObjectType = __webpack_require__(24);

	var matreshkaError = __webpack_require__(25);

	var debounce = __webpack_require__(64);

	var addSource = __webpack_require__(65);

	var createCalcHandler = __webpack_require__(77);

	var defineProp = __webpack_require__(22);

	// defines a property which is dependend on other properties
	module.exports = calc;
	function calc(object, target, sources, givenHandler, eventOptions) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        eventOptions = givenHandler;
	        givenHandler = sources;
	        sources = target;
	        target = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'calc');
	    }

	    if (target instanceof Object) {
	        for (var _target = target, _keys5 = Object.keys(_target), _i5 = 0, itemTarget, _ref, _l5 = _keys5.length; (itemTarget = _keys5[_i5], _ref = _target[itemTarget]), _i5 < _l5; _i5++) {
	            var itemSource = _ref.source;
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

	            calc(object, itemTarget, itemSource, itemHandler, mergedEventOptions);
	        }
	        /*
	         * accept an object
	         * this.calc({target: { source, handler, event } }, commonEventOptions);
	         */


	        return object;
	    }

	    if (typeof target !== 'string') {
	        throw matreshkaError('calc:target_type', { target: target });
	    }

	    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
	    var def = initMK(object);
	    var _eventOptions = eventOptions;
	    var _eventOptions$setOnIn = _eventOptions.setOnInit;
	    var setOnInit = _eventOptions$setOnIn === undefined ? true : _eventOptions$setOnIn;
	    var _eventOptions$debounc = _eventOptions.debounceCalcOnInit;
	    var debounceCalcOnInit = _eventOptions$debounc === undefined ? false : _eventOptions$debounc;
	    var _eventOptions$debounc2 = _eventOptions.debounceCalc;
	    var debounceCalc = _eventOptions$debounc2 === undefined ? true : _eventOptions$debounc2;
	    var _eventOptions$debounc3 = _eventOptions.debounceCalcDelay;
	    var debounceCalcDelay = _eventOptions$debounc3 === undefined ? 0 : _eventOptions$debounc3;
	    var _eventOptions$isTarge = _eventOptions.isTargetPropertyHidden;
	    var isTargetPropertyHidden = _eventOptions$isTarge === undefined ? false : _eventOptions$isTarge;

	    var defaultHandler = function (value) {
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

	    var debouncedCalcHandler = void 0;
	    var calcHandler = void 0;

	    if (debounceCalcOnInit || debounceCalc) {
	        debouncedCalcHandler = debounce(syncCalcHandler, debounceCalcDelay);
	    }

	    defineProp(object, target, isTargetPropertyHidden);

	    if (!(sources instanceof Array)) {
	        sources = [sources]; // eslint-disable-line no-param-reassign
	    }

	    if (debounceCalc) {
	        calcHandler = debouncedCalcHandler;
	    } else {
	        calcHandler = syncCalcHandler;
	    }

	    for (var _target3 = sources, _index2 = 0, source, _l7 = _target3.length; source = _target3[_index2], _index2 < _l7; _index2++) {
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
	            (function () {
	                // source object is external object
	                if (!source || typeof source !== 'object') {
	                    throw matreshkaError('calc:source_type', { source: source });
	                }

	                var sourceKey = source.key;
	                var sourceObject = source.object;
	                if (sourceKey instanceof Array) {
	                    for (var _target2 = sourceKey, _index = 0, sourceKeyItem, _l6 = _target2.length; sourceKeyItem = _target2[_index], _index < _l6; _index++) {
	                        addSource({
	                            calcHandler: calcHandler,
	                            allSources: allSources,
	                            sourceKey: sourceKeyItem,
	                            sourceObject: sourceObject,
	                            eventOptions: eventOptions
	                        });
	                    }
	                    // many keys are passed

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
	            })();
	        }
	    }

	    if (setOnInit) {
	        if (debounceCalcOnInit) {
	            debouncedCalcHandler();
	        } else {
	            syncCalcHandler();
	        }
	    }

	    return object;
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(21);

	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds.
	// (c) https://davidwalsh.name/javascript-debounce-function

	module.exports = debounce;
	function debounce(func, givenDelay, thisArg) {
	    var timeout = void 0;
	    var delay = void 0;
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
	            return apply(func, callContext, args);
	        }, delay);
	    };
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addListener = __webpack_require__(17);

	var addTreeListener = __webpack_require__(66);

	var matreshkaError = __webpack_require__(25);

	// adds a source to a source list and adds needed event listener to a it
	module.exports = addSource;
	function addSource(_ref) {
	    var calcHandler = _ref.calcHandler;
	    var allSources = _ref.allSources;
	    var sourceKey = _ref.sourceKey;
	    var sourceObject = _ref.sourceObject;
	    var eventOptions = _ref.eventOptions;
	    var _eventOptions$exactKe = eventOptions.exactKey;
	    var exactKey = _eventOptions$exactKe === undefined ? false : _eventOptions$exactKe;

	    var isDelegated = false;

	    // source key must be a string
	    if (typeof sourceKey !== 'string') {
	        throw matreshkaError('calc:source_key_type', { sourceKey: sourceKey });
	    }

	    // source object must be an object
	    if (!sourceObject || typeof sourceObject !== 'object') {
	        throw matreshkaError('calc:source_object_type', { sourceObject: sourceObject });
	    }

	    if (!exactKey) {
	        var deepPath = sourceKey.split('.');

	        // if something like a.b.c is used as a key
	        if (deepPath.length > 1) {
	            isDelegated = true;
	            // TODO: Avoid collisions with bindings by using another event name
	            // ... instead of _change:tree:xxx
	            addTreeListener(sourceObject, deepPath, calcHandler);
	        } else {
	            exactKey = true;
	        }
	    }

	    if (exactKey) {
	        // normal handler
	        addListener(sourceObject, '_change:deps:' + sourceKey, calcHandler);
	    }

	    allSources.push({
	        sourceKey: sourceKey,
	        sourceObject: sourceObject,
	        isDelegated: isDelegated
	    });
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var delegateListener = __webpack_require__(67);

	var removeTreeListener = __webpack_require__(76);

	// creates tree listener
	function createTreeListener(_ref) {
	    var handler = _ref.handler;
	    var restPath = _ref.restPath;

	    var newHandler = function treeListener(changeEvent) {
	        var _keys,
	            _l,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.restPath = restPath

	        for (_source = changeEvent, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        var extendedChangeEvent = _result;
	        var previousValue = changeEvent.previousValue;
	        var value = changeEvent.value;

	        // removes listener for all branches of the path on old object

	        if (previousValue && typeof previousValue === 'object') {
	            removeTreeListener(previousValue, restPath, handler);
	        }

	        // adds listener for all branches of "restPath" path on newly assigned object
	        if (value && typeof value === 'object') {
	            addTreeListener(value, restPath, handler);
	        }

	        // call original handler
	        handler.call(this, extendedChangeEvent);
	    };

	    newHandler._callback = handler;

	    return newHandler;
	}

	// listens changes for all branches of given path
	// TODO: Pass context to addTreeListener
	// one of the most hard functions to understand
	module.exports = addTreeListener;
	function addTreeListener(object, deepPath, handler) {
	    if (typeof deepPath === 'string') {
	        deepPath = deepPath.split('.'); // eslint-disable-line no-param-reassign
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var addListener = __webpack_require__(17);

	var defs = __webpack_require__(19);

	var arrayAddHandler = __webpack_require__(68);

	var objectSetHandler = __webpack_require__(69);

	var arrayRemoveHandler = __webpack_require__(70);

	var objectRemoveHandler = __webpack_require__(74);

	var changeHandler = __webpack_require__(75);

	// adds delegated event listener to an object by given path
	module.exports = delegateListener;
	function delegateListener(object, givenPath, name, callback, context) {
	    var info = arguments.length <= 5 || arguments[5] === undefined ? {} : arguments[5];

	    // if typeof path is string and path is not empty string then split it
	    var path = typeof givenPath === 'string' && givenPath !== '' ? givenPath.split('.') : givenPath;

	    if (!path || !path.length) {
	        // if no path then add simple listener
	        addListener(object, name, callback, context, info);
	    } else {
	        // else do all magic
	        var key = path[0];
	        var pathStr = void 0; // needed for undelegation

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
	            info: info,
	            object: object
	        };

	        if (key === '*') {
	            // handling asterisk events
	            // { skipChecks: true } allows to use same event name and event handler few times
	            if (object.isMatreshkaArray) {
	                // the event is triggered when something is added to an array
	                addListener(object, '_asterisk:add', arrayAddHandler, null, {
	                    delegatedData: delegatedData,
	                    pathStr: pathStr,
	                    skipChecks: true
	                });

	                // the event is triggered when something is removed from an array
	                addListener(object, '_asterisk:remove', arrayRemoveHandler, null, {
	                    delegatedData: delegatedData,
	                    pathStr: pathStr,
	                    skipChecks: true
	                });

	                // call handler manually to delegate listener for currently existing data props
	                arrayAddHandler({
	                    added: object
	                }, delegatedData);
	            } else if (object.isMatreshkaObject) {
	                var def = defs.get(object);

	                // the event is triggered when data prop is changed
	                addListener(object, '_asterisk:set', objectSetHandler, null, {
	                    delegatedData: delegatedData,
	                    pathStr: pathStr,
	                    skipChecks: true
	                });

	                // the event is triggered when data prop is removed
	                addListener(object, '_asterisk:remove', objectRemoveHandler, null, {
	                    delegatedData: delegatedData,
	                    pathStr: pathStr,
	                    skipChecks: true
	                });

	                // delegate listener for currently existing data props

	                for (var _target = def.keys, _keys = Object.keys(_target), _i2 = 0, defKey, _, _l2 = _keys.length; (defKey = _keys[_i2], _ = _target[defKey]), _i2 < _l2; _i2++) {
	                    var item = object[defKey];
	                    if (item && typeof item === 'object') {
	                        delegateListener(item, path, name, callback, context, info);
	                    }
	                }
	            }
	        } else {
	            // handling non-asterisk delegated event

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
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var triggerOne = __webpack_require__(20);

	// the function is called when something is added to an array
	// it delegates asterisk listener for newly added items
	module.exports = arrayAddHandler;
	function arrayAddHandler(_ref) {
	    var added = _ref.added;

	    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? triggerOne.latestEvent.info.delegatedData : arguments[1];

	    var path = _ref2.path;
	    var name = _ref2.name;
	    var callback = _ref2.callback;
	    var context = _ref2.context;
	    var info = _ref2.info;

	    for (var _target = added, _index = 0, item, _l = _target.length; item = _target[_index], _index < _l; _index++) {
	        if (item && typeof item === 'object') {
	            var delegateListener = __webpack_require__(67); // fixing circular ref

	            delegateListener(item, path, name, callback, context, info);
	        }
	    }
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var triggerOne = __webpack_require__(20);

	var defs = __webpack_require__(19);

	// the function is called when data property is changed in Matreshka.Object
	// it delegates asterisk listener for new value
	module.exports = objectSetHandler;
	function objectSetHandler(_ref) {
	    var key = _ref.key;

	    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? triggerOne.latestEvent.info.delegatedData : arguments[1];

	    var path = _ref2.path;
	    var name = _ref2.name;
	    var callback = _ref2.callback;
	    var context = _ref2.context;
	    var info = _ref2.info;
	    var object = _ref2.object;

	    if (key) {
	        var item = object[key];

	        if (item && typeof item === 'object') {
	            var def = defs.get(object);
	            if (key in def.keys) {
	                var delegateListener = __webpack_require__(67); // fixing circular ref

	                delegateListener(item, path, name, callback, context, info);
	            }
	        }
	    }
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var undelegateListener = __webpack_require__(71);

	var triggerOne = __webpack_require__(20);

	// the function is called when something is removed from an array
	// it undelegates asterisk listener from removed items
	module.exports = arrayRemoveHandler;
	function arrayRemoveHandler(_ref) {
	    var removed = _ref.removed;

	    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? triggerOne.latestEvent.info.delegatedData : arguments[1];

	    var path = _ref2.path;
	    var name = _ref2.name;
	    var callback = _ref2.callback;
	    var context = _ref2.context;
	    var info = _ref2.info;

	    if (removed && removed.length) {
	        for (var _target = removed, _index = 0, item, _l = _target.length; item = _target[_index], _index < _l; _index++) {
	            if (item && typeof item === 'object') {
	                undelegateListener(item, path, name, callback, context, info);
	            }
	        }
	    }
	}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var removeListener = __webpack_require__(72);

	// the function removes internally used events such as _asterisk:add
	function detatchDelegatedLogic(_ref) {
	    var delegatedEventName = _ref.delegatedEventName;
	    var pathStr = _ref.pathStr;
	    var allEvents = _ref.allEvents;

	    var retain = [];
	    var events = allEvents[delegatedEventName];

	    for (var _target = events, _index = 0, event, _l = _target.length; event = _target[_index], _index < _l; _index++) {
	        // pathStr is assigned to info in delegateListener
	        if (event.info.pathStr !== pathStr) {
	            retain.push(event);
	        }
	    }

	    if (retain.length) {
	        allEvents[delegatedEventName] = retain;
	    } else {
	        delete allEvents[delegatedEventName];
	    }
	}

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
	        // else do all magic
	        var key = path[0];
	        var pathStr = void 0;

	        if (path.length > 1) {
	            var _source = path,
	                _l2 = _source.length,
	                _i = 1 || 0,
	                _end = null || _l2,
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

	        if (key === '*') {
	            // remove asterisk events
	            if (object.isMatreshkaArray) {
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
	                }

	                // undelegate asterisk events for existing items
	                if (object.length) {
	                    for (var _target2 = object, _index2 = 0, item, _l3 = _target2.length; item = _target2[_index2], _index2 < _l3; _index2++) {
	                        if (item && typeof item === 'object') {
	                            undelegateListener(item, path, name, callback, context, info);
	                        }
	                    }
	                }
	            } else if (object.isMatreshkaObject) {
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
	                    if (item && typeof item === 'object') {
	                        undelegateListener(item, path, name, callback, context, info);
	                    }
	                });
	            }
	        } else {
	            // remove non-asterisk delegated events

	            var delegatedChangeEvtName = '_change:delegated:' + key;
	            if (allEvents[delegatedChangeEvtName]) {
	                detatchDelegatedLogic({
	                    delegatedEventName: delegatedChangeEvtName,
	                    pathStr: pathStr,
	                    allEvents: allEvents
	                });
	            }

	            if (typeof object[key] === 'object') {
	                undelegateListener(object[key], path, name, callback, context, info);
	            }
	        }
	    }
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var triggerOne = __webpack_require__(20);

	var domEventReg = __webpack_require__(27);

	// removes simple event listener from an object
	module.exports = removeListener;
	function removeListener(object, name, callback, context, info) {
	    var def = defs.get(object);

	    // if no definition do nothing
	    if (!def) {
	        return false;
	    }

	    var allEvents = def.events;

	    var events = allEvents[name];
	    var retain = [];
	    var noTrigger = name ? name[0] === '_' : false;
	    var domEventExecResult = domEventReg.exec(name);

	    if (domEventExecResult) {
	        var eventName = domEventExecResult[1];
	        var _domEventExecResult$ = domEventExecResult[2];
	        var key = _domEventExecResult$ === undefined ? 'sandbox' : _domEventExecResult$;
	        var selector = domEventExecResult[3];
	        // fixing circular reference issue

	        var removeDomListener = __webpack_require__(73);

	        removeDomListener(object, key, eventName, selector, callback, context, info);

	        return true;
	    }

	    // if all events need to be removed
	    if (typeof name === 'undefined') {
	        if (!noTrigger) {
	            for (var _target2 = allEvents, _keys = Object.keys(_target2), _i = 0, allEventsName, allEventsItem, _l2 = _keys.length; (allEventsName = _keys[_i], allEventsItem = _target2[allEventsName]), _i < _l2; _i++) {
	                for (var _target = allEventsItem, _index = 0, event, _l = _target.length; event = _target[_index], _index < _l; _index++) {
	                    var removeEventData = {
	                        allEventsName: allEventsName,
	                        callback: event.callback,
	                        context: event.context
	                    };

	                    triggerOne(object, 'removeevent:' + name, removeEventData);
	                    triggerOne(object, 'removeevent', removeEventData);
	                }
	            }
	        }

	        // restore default value of "events"
	        def.events = {};
	    } else if (events) {
	        for (var _target3 = events, _index2 = 0, event, _l3 = _target3.length; event = _target3[_index2], _index2 < _l3; _index2++) {
	            var argCallback = callback && callback._callback || callback;
	            var eventCallback = event.callback._callback || event.callback;

	            if (argCallback && argCallback !== eventCallback || context && context !== event.context) {
	                // keep event
	                retain.push(event);
	            } else {
	                var _removeEventData = {
	                    name: name,
	                    callback: event.callback,
	                    context: event.context
	                };

	                if (!noTrigger) {
	                    triggerOne(object, 'removeevent:' + name, _removeEventData);
	                    triggerOne(object, 'removeevent', _removeEventData);
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

	    return false;
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var removeListener = __webpack_require__(72);

	var dom = __webpack_require__(29);

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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var undelegateListener = __webpack_require__(71);

	var triggerOne = __webpack_require__(20);

	// the function is called when data property is removed from Matreshka.Object
	// it undelegates asterisk listener from removed object
	module.exports = objectRemoveHandler;
	function objectRemoveHandler(_ref) {
	    var item = _ref.value;

	    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? triggerOne.latestEvent.info.delegatedData : arguments[1];

	    var path = _ref2.path;
	    var name = _ref2.name;
	    var callback = _ref2.callback;
	    var context = _ref2.context;
	    var info = _ref2.info;

	    if (item && typeof item === 'object') {
	        undelegateListener(item, path, name, callback, context, info);
	    }
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var undelegateListener = __webpack_require__(71);

	var triggerOne = __webpack_require__(20);

	// the function is called when some part of a path is changed
	// it delegates event listener for new branch of an object and undelegates it for old one
	// used for non-asterisk events
	module.exports = changeHandler;
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
	        var delegateListener = __webpack_require__(67); // fixing circular ref

	        delegateListener(value, path, name, callback, context, info);
	    }

	    if (previousValue && typeof previousValue === 'object') {
	        undelegateListener(previousValue, path, name, callback, context, info);
	    }
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var undelegateListener = __webpack_require__(71);

	// removes tree listener from all object tree of fiven path
	// TODO: Pass context to removeTreeListener
	module.exports = removeTreeListener;
	function removeTreeListener(object, deepPath, handler) {
	    if (typeof deepPath === 'string') {
	        deepPath = deepPath.split('.'); // eslint-disable-line no-param-reassign
	    }

	    // iterate over keys of the path and undelegate given handler (can be undefined)
	    for (var i = 0; i < deepPath.length; i++) {
	        // TODO: Array.prototype.slice is slow
	        var listenedPath = deepPath.slice(0, i);

	        undelegateListener(object, listenedPath, '_change:tree:' + deepPath[i], handler);
	    }
	}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var set = __webpack_require__(23);

	var deepFind = __webpack_require__(78);

	var apply = __webpack_require__(21);

	// creates event handler for target object which will be fired when a source is changed
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

	        var _keys,
	            _l,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.protector = protector

	        for (_source = eventOptions, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        for (_source = changeEvent, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        var setEventOptions = _result;

	        if (protectKey in protector) {
	            return;
	        }

	        protector[protectKey] = true;

	        for (var _target = allSources, _index = 0, _ref2, _l2 = _target.length; _ref2 = _target[_index], _index < _l2; _index++) {
	            var sourceObject = _ref2.sourceObject;
	            var sourceKey = _ref2.sourceKey;
	            var isDelegated = _ref2.isDelegated;

	            var value = isDelegated ? deepFind(sourceObject, sourceKey) : sourceObject[sourceKey];
	            values.push(value);
	        }

	        var targetValue = apply(handler, object, values);
	        set(object, target, targetValue, setEventOptions);
	    };
	}

/***/ },
/* 78 */
/***/ function(module, exports) {

	'use strict';

	// gets value of a property in nested object
	// eg "d" from a.b.c.d
	module.exports = deepFind;
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

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parserData = __webpack_require__(62);

	var bindNode = __webpack_require__(80);

	var textNodeBinder = {
	    setValue: function (value) {
	        this.textContent = typeof value === 'undefined' ? '' : value;
	    }
	};

	// adds binding for text node
	// it splits up one text node into "simple text nodes"
	// and "bound text nodes" and removes original text node
	module.exports = processTextNode;
	function processTextNode(_ref) {
	    var object = _ref.object;
	    var node = _ref.node;
	    var textNode = _ref.textNode;
	    var eventOptions = _ref.eventOptions;
	    var bindingReg = parserData.bindingReg;
	    var textContent = textNode.textContent;
	    var _window = window;
	    var document = _window.document;


	    bindingReg.lastIndex = 0;

	    // tokens variable contains normal text as odd items
	    // and bound keys as even items
	    // 'foo{{x}}bar{{y}}baz{{z}}' -> ['foo', 'x', 'bar', 'y', 'baz', 'z', '']
	    var tokens = textContent.split(bindingReg);

	    // fragment contains all new text nodes
	    var fragment = document.createDocumentFragment();

	    for (var _target = tokens, index = 0, token, _l = _target.length; token = _target[index], index < _l; index++) {
	        if (token) {
	            var newTextNode = document.createTextNode(token);
	            fragment.appendChild(newTextNode);

	            // if tokens item is even then it is a key
	            // which needs to be bound to newly created text node
	            if (index % 2 !== 0) {
	                bindNode(object, token, newTextNode, textNodeBinder, eventOptions);
	            }
	        }
	    }

	    node.insertBefore(fragment, textNode);
	    node.removeChild(textNode);
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var defineProp = __webpack_require__(22);

	var getNodes = __webpack_require__(81);

	var createBindingSwitcher = __webpack_require__(84);

	var bindSingleNode = __webpack_require__(87);

	var checkObjectType = __webpack_require__(24);

	var matreshkaError = __webpack_require__(25);

	var addTreeListener = __webpack_require__(66);

	// initializes binsing between a property of an object to HTML node
	module.exports = bindNode;
	function bindNode(object, key, node, binder, eventOptions) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        eventOptions = binder;
	        binder = node;
	        node = key;
	        key = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'bindNode');
	    }

	    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
	    binder = binder || {}; // eslint-disable-line no-param-reassign

	    initMK(object);

	    var temporaryOptionalFlag = bindNode.temporaryOptionalFlag;


	    delete bindNode.temporaryOptionalFlag;

	    // throw an error when key is falsy
	    if (!key) {
	        throw matreshkaError('binding:falsy_key');
	    }

	    if (key instanceof Array) {
	        if (typeof key[0] === 'string') {
	            /*
	             * accept array of keys
	             * this.bindNode(['a', 'b', 'c'], node)
	             */
	            if (temporaryOptionalFlag) {
	                var _keys,
	                    _l,
	                    _i,
	                    _source,
	                    _key,
	                    _result = {};

	                for (_source = eventOptions, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	                    _key = _keys[_i];
	                    _result[_key] = _source[_key];
	                }

	                _result.optional = true

	                // eslint-disable-next-line no-param-reassign
	                eventOptions = _result;
	            }

	            for (var _target = key, _index = 0, itemKey, _l2 = _target.length; itemKey = _target[_index], _index < _l2; _index++) {
	                bindNode(object, itemKey, node, binder, eventOptions)
	            }
	        } else {
	            for (var _target2 = key, _index2 = 0, _ref, _l7 = _target2.length; _ref = _target2[_index2], _index2 < _l7; _index2++) {
	                var itemKey = _ref.key;
	                var itemNode = _ref.node;
	                var itemBinder = _ref.binder;
	                var itemEventOptions = _ref.event;

	                var commonEventOptions = node;
	                var mergedEventOptions = {};

	                if (temporaryOptionalFlag) {
	                    mergedEventOptions.optional = true;
	                }

	                if (commonEventOptions) {
	                    var _result2 = mergedEventOptions;
	                    // extend event object by "global" event

	                    for (var _source3 = commonEventOptions, _keys3 = Object.keys(_source3), _l4 = _keys3.length, _i3 = 0, _key3; _i3 < _l4; _i3++) {
	                        _key3 = _keys3[_i3];
	                        _result2[_key3] = _source3[_key3];
	                    }
	                }

	                if (itemEventOptions) {
	                    var _result3 = mergedEventOptions;
	                    // extend event object by "local" event ("event" key of an object)

	                    for (var _source5 = itemEventOptions, _keys5 = Object.keys(_source5), _l6 = _keys5.length, _i5 = 0, _key5; _i5 < _l6; _i5++) {
	                        _key5 = _keys5[_i5];
	                        _result3[_key5] = _source5[_key5];
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

	    if (typeof key === 'object') {
	        for (var _target4 = key, _keys7 = Object.keys(_target4), _i7 = 0, keyObjKey, keyObjValue, _l10 = _keys7.length; (keyObjKey = _keys7[_i7], keyObjValue = _target4[keyObjKey]), _i7 < _l10; _i7++) {
	            // binder means eventOptions
	            if (temporaryOptionalFlag) {
	                var _keys6,
	                    _l8,
	                    _i6,
	                    _source6,
	                    _key6,
	                    _result4 = {};

	                for (_source6 = binder, _keys6 = Object.keys(_source6), _l8 = _keys6.length, _i6 = 0; _i6 < _l8; _i6++) {
	                    _key6 = _keys6[_i6];
	                    _result4[_key6] = _source6[_key6];
	                }

	                _result4.optional = true

	                // eslint-disable-next-line no-param-reassign
	                eventOptions = binder ? _result4 : { optional: true };
	            } else {
	                eventOptions = binder; // eslint-disable-line no-param-reassign
	            }

	            if (keyObjValue && keyObjValue.constructor === Object && 'node' in keyObjValue) {
	                // this.bindNode({ key: { node: $(), binder } ) }, { on: 'evt' }, { silent: true });
	                bindNode(object, keyObjKey, keyObjValue.node, keyObjValue.binder || node, eventOptions);
	            } else if (keyObjValue && keyObjValue.constructor === Array && keyObjValue.length && keyObjValue[0].constructor === Object && 'node' in keyObjValue[0]) {
	                for (var _target3 = keyObjValue, _index3 = 0, keyObjValueItem, _l9 = _target3.length; keyObjValueItem = _target3[_index3], _index3 < _l9; _index3++) {
	                    bindNode(object, keyObjKey, keyObjValueItem.node, keyObjValueItem.binder || node, eventOptions);
	                }
	                // this.bindNode({ key: [{
	                //   node: $(),
	                //   binder
	                // }] ) }, { on: 'evt' }, { silent: true });

	            } else {
	                // this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
	                bindNode(object, keyObjKey, keyObjValue, node, eventOptions);
	            }
	        }

	        return object;
	    }

	    var _eventOptions = eventOptions;
	    var _eventOptions$optiona = _eventOptions.optional;
	    var optional = _eventOptions$optiona === undefined ? temporaryOptionalFlag || false : _eventOptions$optiona;
	    var _eventOptions$exactKe = _eventOptions.exactKey;
	    var exactKey = _eventOptions$exactKe === undefined ? false : _eventOptions$exactKe;

	    var $nodes = getNodes(object, node);

	    // check node existence
	    if (!$nodes.length) {
	        if (optional) {
	            return object;
	        }

	        throw matreshkaError('binding:node_missing', { key: key, node: node });
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
	                bindNode: bindNode
	            });

	            addTreeListener(object, deepPath.slice(0, deepPathLength - 1), bindingSwitcher);

	            bindingSwitcher();

	            return object;
	        }
	    }

	    var propDef = defineProp(object, key);

	    if (object.isMatreshka) {
	        // if an object is Matreshka instance then extend "$nodes" and "nodes" objects
	        var _object = object;
	        var $allNodes = _object.$nodes;
	        var allNodes = _object.nodes;


	        if (!$allNodes || !allNodes) {
	            throw matreshkaError('binding:instance_nodes_missing', {
	                $nodes: $allNodes,
	                nodes: allNodes
	            });
	        }

	        $allNodes[key] = $allNodes[key] && $allNodes[key].length ? $allNodes[key].add($nodes) : $nodes;

	        allNodes[key] = $allNodes[key][0];
	    }

	    // handle binding for every node separately

	    for (var _target5 = $nodes, _index4 = 0, oneNode, _l11 = _target5.length; oneNode = _target5[_index4], _index4 < _l11; _index4++) {
	        bindSingleNode(object, {
	            $nodes: $nodes,
	            node: oneNode,
	            key: key,
	            eventOptions: eventOptions,
	            binder: binder,
	            propDef: propDef
	        })
	    }

	    return object;
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var selectNodes = __webpack_require__(82);

	var dom = __webpack_require__(29);

	var htmlReg = /</;
	var customSelectorReg = /:sandbox|:bound\(([^(]*)\)/;

	// the function works just like DOM library accepting any kind of arg
	// (HTML string, Node, NodeList etc) bu allows to pass custom selector
	// eg :bound(KEY) and :sandbox
	module.exports = getNodes;
	function getNodes(object, selector) {
	    var nodes = void 0;

	    if (typeof selector === 'string' && !htmlReg.test(selector) && customSelectorReg.test(selector)) {
	        nodes = selectNodes(object, selector);
	    } else {
	        nodes = dom.$(selector);
	    }

	    return nodes;
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var toArray = __webpack_require__(83);

	var dom = __webpack_require__(29);

	var customSelectorReg = /\s*:bound\(([^(]*)\)\s*([\S\s]*)\s*|\s*:sandbox\s*([\S\s]*)\s*/;

	// the function selects nodes based on a selector (including custom values, eg :sandbox)
	// TODO: selectNodes looks not good, it needs to be refactored and accelerated if possible
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
	                                        node.removeAttribute(randomAttr);
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
/* 83 */
/***/ function(module, exports) {

	"use strict";

	// cheap conversion of an array-like object to Array instance
	module.exports = toArray;
	function toArray(object) {
	    var start = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var length = object.length;

	    var array = Array(length);

	    for (var i = start; i < length; i++) {
	        array[i - start] = object[i];
	    }

	    return array;
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var unbindNode = __webpack_require__(85);

	// returns a function which re-adds binding when object branch is changed
	// the function is called by bindNode when something like
	// 'foo.bar.baz' is passed to it as key argument value
	// this is one of the hardest things in the framework to understand
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

	        // if rest path is given and previous value is an object
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var checkObjectType = __webpack_require__(24);

	var defs = __webpack_require__(19);

	var getNodes = __webpack_require__(81);

	var removeTreeListener = __webpack_require__(76);

	var removeBinding = __webpack_require__(86);

	var dom = __webpack_require__(29);

	// unbinds a node
	module.exports = unbindNode;
	function unbindNode(object, key, node, eventOptions) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        eventOptions = node;
	        node = key;
	        key = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
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
	            for (var _target2 = key, _index2 = 0, _ref, _l6 = _target2.length; _ref = _target2[_index2], _index2 < _l6; _index2++) {
	                var itemKey = _ref.key;
	                var itemNode = _ref.node;
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

	                unbindNode(object, itemKey, itemNode, mergedEventOptions);
	            }
	            /*
	             * acept array of objects
	             * this.unbindNode([{ key, node, binder, event }], { silent: true });
	             */

	        }

	        return object;
	    }

	    if (key && typeof key === 'object') {
	        for (var _target4 = key, _keys5 = Object.keys(_target4), _i5 = 0, keyObjKey, keyObjValue, _l8 = _keys5.length; (keyObjKey = _keys5[_i5], keyObjValue = _target4[keyObjKey]), _i5 < _l8; _i5++) {
	            if (keyObjValue.constructor === Object && 'node' in keyObjValue) {
	                // this.unbindNode({ key: { node: $(), binder } ) }, { silent: true });
	                unbindNode(object, keyObjKey, keyObjValue.node, node);
	            } else if (keyObjValue.constructor === Array && keyObjValue.length && keyObjValue[0].constructor === Object && 'node' in keyObjValue[0]) {
	                for (var _target3 = keyObjValue, _index3 = 0, keyObjValueItem, _l7 = _target3.length; keyObjValueItem = _target3[_index3], _index3 < _l7; _index3++) {
	                    unbindNode(object, keyObjKey, keyObjValueItem.node, node);
	                }
	                // this.unbindNode({ key: [{ node: $(), binder }] ) }, { silent: true });

	            } else {
	                // this.unbindNode({ key: $() }, { silent: true });
	                unbindNode(object, keyObjKey, keyObjValue, node);
	            }
	        }

	        return object;
	    }

	    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
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
	        for (var _target5 = props, _keys6 = Object.keys(_target5), _i6 = 0, propsKey, propsItem, _l9 = _keys6.length; (propsKey = _keys6[_i6], propsItem = _target5[propsKey]), _i6 < _l9; _i6++) {
	            unbindNode(object, propsKey, null, eventOptions);
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
	                // TODO: Do we need to throw an error when a target is falsy?
	                target = target[deepPath[i]];
	            }

	            // TODO: Potential bug! This may undelegate listener for all bindings with the same path
	            // ...(cannot reproduce)
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
	        for (var _target6 = bindings, _index4 = 0, binding, _l10 = _target6.length; binding = _target6[_index4], _index4 < _l10; _index4++) {
	            removeBinding({ object: object, key: key, eventOptions: eventOptions, binding: binding });
	        }

	        propDef.bindings = null;

	        // update nodes and $nodes for Matreshka instance
	        if (object.isMatreshka) {
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
	    for (var _target8 = $nodes, _index6 = 0, nodesItem, _l12 = _target8.length; nodesItem = _target8[_index6], _index6 < _l12; _index6++) {
	        for (var _target7 = bindings, _index5 = 0, binding, _l11 = _target7.length; binding = _target7[_index5], _index5 < _l11; _index5++) {
	            if (binding.node === nodesItem) {
	                removeBinding({ object: object, key: key, eventOptions: eventOptions, binding: binding });
	            } else {
	                retainBindings.push(binding);
	                retainNodes.push(nodesItem);
	            }
	        }
	    }

	    if (object.isMatreshka) {
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var removeListener = __webpack_require__(72);

	var triggerOne = __webpack_require__(20);

	var spaceReg = /\s+/;

	// the function removes single binding for single object
	// called by unbindNode
	module.exports = removeBinding;
	function removeBinding(_ref) {
	    var object = _ref.object;
	    var key = _ref.key;
	    var eventOptions = _ref.eventOptions;
	    var binding = _ref.binding;
	    var bindingOptions = binding.bindingOptions;
	    var binder = binding.binder;
	    var node = binding.node;
	    var nodeHandler = binding.nodeHandler;
	    var objectHandler = binding.objectHandler;
	    var destroy = binder.destroy;
	    var on = binder.on;
	    var silent = eventOptions.silent;

	    // if "on" is a function then disable it
	    // we cannot "turn off" custom listener defined by a programmer
	    // programmer needs to remove custom listener maually inside binder.destroy

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
	        destroy.call(node, bindingOptions);
	    }

	    // fire events
	    if (!silent) {
	        var _keys,
	            _l2,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.key = key
	        _result.node = node

	        for (_source = eventOptions, _keys = Object.keys(_source), _l2 = _keys.length, _i = 0; _i < _l2; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        var extendedEventOptions = _result;

	        triggerOne(object, 'unbind:' + key, extendedEventOptions);
	        triggerOne(object, 'unbind', extendedEventOptions);
	    }
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lookForBinder = __webpack_require__(10);

	var createNodeHandler = __webpack_require__(88);

	var createObjectHandler = __webpack_require__(89);

	var triggerOne = __webpack_require__(20);

	var addListener = __webpack_require__(17);

	var debounce = __webpack_require__(64);

	var matreshkaError = __webpack_require__(25);

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
	    var getValueOnBind = eventOptions.getValueOnBind;
	    var setValueOnBind = eventOptions.setValueOnBind;
	    var _eventOptions$debounc = eventOptions.debounceSetValue;
	    var debounceSetValue = _eventOptions$debounc === undefined ? true : _eventOptions$debounc;
	    var _eventOptions$debounc2 = eventOptions.debounceGetValue;
	    var debounceGetValue = _eventOptions$debounc2 === undefined ? true : _eventOptions$debounc2;
	    var _eventOptions$debounc3 = eventOptions.debounceSetValueOnBind;
	    var debounceSetValueOnBind = _eventOptions$debounc3 === undefined ? false : _eventOptions$debounc3;
	    var _eventOptions$debounc4 = eventOptions.debounceGetValueOnBind;
	    var debounceGetValueOnBind = _eventOptions$debounc4 === undefined ? false : _eventOptions$debounc4;
	    var _eventOptions$debounc5 = eventOptions.debounceSetValueDelay;
	    var debounceSetValueDelay = _eventOptions$debounc5 === undefined ? 0 : _eventOptions$debounc5;
	    var _eventOptions$debounc6 = eventOptions.debounceGetValueDelay;
	    var debounceGetValueDelay = _eventOptions$debounc6 === undefined ? 0 : _eventOptions$debounc6;
	    var _eventOptions$useExac = eventOptions.useExactBinder;
	    var useExactBinder = _eventOptions$useExac === undefined ? false : _eventOptions$useExac;
	    // create bindings array in property definition object

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
	    var binder = void 0;
	    var objectHandler = void 0;
	    var nodeHandler = void 0;

	    // do not allow to bind more than 2 nodes to "sandbox" (for all nodes)
	    // and "container" (for Matreshka.Array)
	    if (bindings.length && (key === 'sandbox' || object.isMatreshkaArray && key === 'container')) {
	        throw matreshkaError('binding:magic_props_nodes_length');
	    }

	    // get actual binder
	    if (givenBinder !== null) {
	        // by default binder passed to bindNode is extended by default binder
	        // useExactBinder turns this behavior off
	        if (useExactBinder) {
	            binder = givenBinder;
	        } else {
	            // getting default binder
	            var foundBinder = lookForBinder(node);

	            // if default binder is found
	            if (foundBinder) {
	                // extend found binder by given binder
	                if (givenBinder) {
	                    var _result = foundBinder;

	                    for (var _source2 = givenBinder, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	                        _key2 = _keys2[_i2];
	                        _result[_key2] = _source2[_key2];
	                    }
	                }

	                binder = foundBinder;
	            } else {
	                // default binder is not found
	                binder = givenBinder || {};
	            }
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

	    // add needed event handlers to given node when getValue is given
	    if (getValue) {
	        var syncNodeHandler = createNodeHandler({
	            object: object,
	            key: key,
	            node: node,
	            propDef: propDef,
	            binder: binder,
	            bindingOptions: bindingOptions
	        });

	        var debouncedNodeHandler = void 0;

	        if (debounceGetValue || debounceGetValueOnBind) {
	            debouncedNodeHandler = debounce(syncNodeHandler, debounceGetValueDelay);
	        }

	        if (debounceGetValue) {
	            nodeHandler = debouncedNodeHandler;
	        } else {
	            nodeHandler = syncNodeHandler;
	        }

	        // TODO: Throw error when "on" and maybe other binder properties has wrong type
	        if (typeof on === 'function') {
	            on.call(node, nodeHandler, bindingOptions);
	        } else if (typeof on === 'string') {
	            for (var _target = on.split(spaceReg), _index = 0, evtName, _l3 = _target.length; evtName = _target[_index], _index < _l3; _index++) {
	                node.addEventListener(evtName, nodeHandler)
	            }
	            // addEventListener is faster than "on" method from any DOM library

	        }

	        if (isUndefined && getValueOnBind !== false || getValueOnBind === true) {
	            if (debounceGetValueOnBind) {
	                debouncedNodeHandler();
	            } else {
	                syncNodeHandler();
	            }
	        }

	        isUndefined = typeof propDef.value === 'undefined';
	    }

	    // add needed event handlers to the object when setValue is given
	    if (setValue) {
	        var syncObjectHandler = createObjectHandler({
	            node: node,
	            propDef: propDef,
	            binder: binder,
	            bindingOptions: bindingOptions,
	            eventOptions: eventOptions
	        });

	        var debouncedObjectHandler = void 0;

	        if (debounceSetValue || debounceSetValueOnBind) {
	            debouncedObjectHandler = debounce(syncObjectHandler, debounceSetValueDelay);
	        }

	        if (debounceSetValue) {
	            objectHandler = debouncedObjectHandler;
	        } else {
	            objectHandler = syncObjectHandler;
	        }

	        // TODO: Is it possible to get previous value of a property?
	        addListener(object, '_change:bindings:' + key, objectHandler, null, { skipChecks: true });

	        if (!isUndefined && setValueOnBind !== false || setValueOnBind === true) {
	            if (debounceSetValueOnBind) {
	                debouncedObjectHandler();
	            } else {
	                syncObjectHandler();
	            }
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
	        var _keys3,
	            _l4,
	            _i3,
	            _source3,
	            _key3,
	            _result2 = {};

	        _result2.key = key
	        _result2.node = node

	        for (_source3 = eventOptions, _keys3 = Object.keys(_source3), _l4 = _keys3.length, _i3 = 0; _i3 < _l4; _i3++) {
	            _key3 = _keys3[_i3];
	            _result2[_key3] = _source3[_key3];
	        }

	        var extendedEventOptions = _result2;

	        triggerOne(object, 'bind:' + key, extendedEventOptions);
	        triggerOne(object, 'bind', extendedEventOptions);
	    }
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(26);

	var set = __webpack_require__(23);

	// returns a function which called when bound node state is changed (eg DOM event is fired)
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
	        // we cannot "turn off" binder.on when its value is a function
	        // developer needs to clean memory ("turn off" callback) manualy in binder.destroy
	        if (nodeHandler.disabled) {
	            return;
	        }

	        var previousValue = propDef.value;
	        var which = domEvent.which;
	        var target = domEvent.target;
	        var ctrlKey = domEvent.ctrlKey;
	        var altKey = domEvent.altKey;
	        var getValue = binder.getValue;

	        var _keys,
	            _l,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.previousValue = previousValue
	        _result.domEvent = domEvent
	        _result.originalEvent = domEvent.originalEvent || domEvent

	        _result.preventDefault = function () {
	            return domEvent.preventDefault();
	        }

	        _result.stopPropagation = function () {
	            return domEvent.stopPropagation();
	        }

	        _result.which = which
	        _result.target = target
	        _result.ctrlKey = ctrlKey
	        _result.altKey = altKey

	        for (_source = bindingOptions, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        var value = getValue.call(node, _result);

	        if (!is(value, previousValue)) {
	            set(object, key, value, {
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

/***/ },
/* 89 */
/***/ function(module, exports) {

	'use strict';

	// returns a function which is called when property value is changed
	module.exports = createObjectHandler;
	function createObjectHandler(_ref) {
	    var node = _ref.node;
	    var propDef = _ref.propDef;
	    var binder = _ref.binder;
	    var bindingOptions = _ref.bindingOptions;

	    return function objectHandler() {
	        var eventOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	        var value = propDef.value;
	        var onChangeValue = eventOptions.onChangeValue;
	        var changedNode = eventOptions.changedNode;
	        var evtBinder = eventOptions.binder;
	        var setValue = binder.setValue;
	        // dirty hack for https://github.com/matreshkajs/matreshka/issues/19

	        var dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? '' + value : value;

	        // don't call setValue if a property is changed via getValue of the same binder
	        if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
	            return;
	        }

	        var _keys,
	            _l,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.value = value

	        for (_source = bindingOptions, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        setValue.call(node, value, _result);
	    };
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getBindingKey = __webpack_require__(91);

	var bindNode = __webpack_require__(80);

	var lookForBinder = __webpack_require__(10);

	// a binder for instance of Attr
	var attributeBinder = {
	    setValue: function (value) {
	        this.value = value;
	    }
	};

	// adds binding for an attribute
	// its logic is much harder than for text node
	// check out imported modules for more info
	module.exports = processAttribute;
	function processAttribute(_ref) {
	    var node = _ref.node;
	    var attribute = _ref.attribute;
	    var object = _ref.object;
	    var eventOptions = _ref.eventOptions;
	    var name = attribute.name;
	    var value = attribute.value;
	    var type = node.type;
	    // get a key which will be actually bound to an attribute
	    // getBindingKey analyzes given value, creates computable property and returns its key

	    var key = getBindingKey({
	        object: object,
	        text: value
	    });
	    var probablyValueInput = name === 'value' && type !== 'checkbox' && type !== 'radio';
	    var probablyCheckableInput = name === 'checked' && (type === 'checkbox' || type === 'radio');

	    var defaultBinder = void 0;

	    if (probablyValueInput || probablyCheckableInput) {
	        defaultBinder = lookForBinder(node);
	    }

	    if (defaultBinder) {
	        // if deault binder is found then this is default HTML5 form element
	        // remove the attribute and use found binder
	        node.setAttribute(name, '');
	        bindNode(object, key, node, defaultBinder, eventOptions);
	    } else {
	        // simply bind an attribute
	        bindNode(object, key, attribute, attributeBinder, eventOptions);
	    }
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parserData = __webpack_require__(62);

	var defineHiddenContentProperty = __webpack_require__(92);

	// analyzes string and returns only one key which will be actually bound to an attribute
	module.exports = getBindingKey;
	function getBindingKey(_ref) {
	    var object = _ref.object;
	    var text = _ref.text;
	    var strictBindingReg = parserData.strictBindingReg;
	    var bindingReg = parserData.bindingReg;

	    var keys = [];

	    var execResult = void 0;
	    var key = void 0;

	    bindingReg.lastIndex = 0;

	    // extract keys given in parser brackers
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

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var calc = __webpack_require__(63);

	var parserData = __webpack_require__(62);

	var hiddenPropertyPrefix = ('' + Math.random()).replace('0.', 'hidden');
	var hiddenPropertyIndex = 0;

	// defines hiden (without accessors) computed property
	// that dependent on given properties ('keys') as text template describes
	// for example if text='{{x}} blah {{y}}', x='foo', y='bar'
	// then the new property should have value 'foo blah bar'
	module.exports = defineHiddenContentProperty;
	function defineHiddenContentProperty(_ref) {
	    var object = _ref.object;
	    var keys = _ref.keys;
	    var text = _ref.text;

	    var key = '' + hiddenPropertyPrefix + hiddenPropertyIndex;
	    var regs = {};
	    var escLeftBracket = parserData.escLeftBracket;
	    var escRightBracket = parserData.escRightBracket;


	    hiddenPropertyIndex += 1;

	    // create and cache regular expressions which will help us to
	    // change target property value quickly when sources are changed
	    for (var i = 0; i < keys.length; i++) {
	        regs[keys[i]] = new RegExp(escLeftBracket + keys[i] + escRightBracket, 'g');
	    }

	    calc(object, key, keys, function calcHandler() {
	        var value = text;

	        // replace things like {{x}} by actual values
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

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var matreshkaError = __webpack_require__(25);

	// checks is item already rendered in an array
	// selfDef is given instead of itself (array) for perf optimisation
	module.exports = checkAlreadyRendered;
	function checkAlreadyRendered(_ref) {
	    var item = _ref.item;
	    var selfDef = _ref.selfDef;

	    var itemDef = defs.get(item);
	    var selfId = selfDef.id;

	    // if item object is defined in object defs

	    if (itemDef) {
	        var renderedInArrays = itemDef.renderedInArrays;

	        // if item's node is already rendered for an array
	        // then throw an error

	        if (renderedInArrays && renderedInArrays[selfId]) {
	            throw matreshkaError('array:add_render_twice');
	        }
	    }
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var renderItemNode = __webpack_require__(60);

	var triggerOne = __webpack_require__(20);

	var checkAlreadyRendered = __webpack_require__(93);

	// this function renders inserted items if possible when unshift or push method is called
	module.exports = processUnshift;
	function processUnshift(_ref) {
	    var self = _ref.self;
	    var selfDef = _ref.selfDef;
	    var eventOptions = _ref.eventOptions;
	    var container = _ref.container;
	    var added = eventOptions.added;
	    var silent = eventOptions.silent;

	    // iterate over all added items in opposite order

	    for (var i = added.length - 1; i + 1; i--) {
	        var item = added[i];
	        if (item && typeof item === 'object') {
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
	            });

	            var node = _renderItemNode.node;
	            var itemEventOptions = _renderItemNode.itemEventOptions;


	            if (node) {
	                if (container.firstChild) {
	                    container.insertBefore(node, container.firstChild);
	                } else {
	                    container.appendChild(node);
	                }

	                if (!silent) {
	                    triggerOne(item, 'afterrender', itemEventOptions);
	                }
	            }
	        }
	    }
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var renderItemNode = __webpack_require__(60);

	var triggerOne = __webpack_require__(20);

	var defs = __webpack_require__(19);

	var matreshkaError = __webpack_require__(25);

	var getAlreadyRendered = __webpack_require__(96);

	// this function renders inserted items if possible when recreate method is called
	module.exports = processRecreate;
	function processRecreate(_ref) {
	    var self = _ref.self;
	    var selfDef = _ref.selfDef;
	    var eventOptions = _ref.eventOptions;
	    var container = _ref.container;
	    var removed = eventOptions.removed;
	    var silent = eventOptions.silent;
	    var selfId = selfDef.id;

	    // iterate over removed items and remove their nodes

	    for (var _target = removed, _index = 0, item, _l = _target.length; item = _target[_index], _index < _l; _index++) {
	        var itemDef = defs.get(item);

	        if (itemDef) {
	            var renderedInArrays = itemDef.renderedInArrays;

	            var node = renderedInArrays && renderedInArrays[selfId];
	            if (node) {
	                delete itemDef.renderedInArrays[selfId];
	                container.removeChild(node);
	            }
	        }
	    }

	    var alreadyRenderedMap = {};

	    // iterate over all items
	    // the following approach allows to throw an error when two added objects are the same
	    // (not only compare existing items with old ones)

	    for (var _target2 = self, _index2 = 0, item, _l2 = _target2.length; item = _target2[_index2], _index2 < _l2; _index2++) {
	        if (item && typeof item === 'object') {
	            var itemDef = defs.get(item);
	            var alreadyRenderedNode = void 0;

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
	                    throw matreshkaError('array:add_render_twice');
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
	                });

	                var node = _renderItemNode.node;
	                var itemEventOptions = _renderItemNode.itemEventOptions;


	                if (node) {
	                    // itemDef is defined at renderItemNode if not defined before
	                    // reload this variable
	                    itemDef = itemDef || defs.get(item);

	                    if (itemDef.id in alreadyRenderedMap) {
	                        // if newly added item is rendered twice throw an error
	                        throw matreshkaError('array:add_render_twice');
	                    }

	                    alreadyRenderedMap[itemDef.id] = true;

	                    container.appendChild(node);

	                    if (!silent) {
	                        triggerOne(item, 'afterrender', itemEventOptions);
	                    }
	                }
	            }
	        }
	    }
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	// returns already rendered node of an object in given array
	// selfDef is given instead of  itself (array) for perf optimisation
	module.exports = getAlreadyRendered;
	function getAlreadyRendered(_ref) {
	    var item = _ref.item;
	    var selfDef = _ref.selfDef;

	    var itemDef = defs.get(item);
	    var selfId = selfDef.id;

	    // if item object is defined in object defs

	    if (itemDef) {
	        var renderedInArrays = itemDef.renderedInArrays;

	        // if item's node is already rendered for an array then return it

	        if (renderedInArrays && renderedInArrays[selfId]) {
	            return renderedInArrays[selfId];
	        }
	    }

	    return undefined;
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getAlreadyRendered = __webpack_require__(96);

	// this function gets called when array is sorted (via sort, orderBy or reverse)
	module.exports = processSort;
	function processSort(_ref) {
	    var self = _ref.self;
	    var selfDef = _ref.selfDef;
	    var container = _ref.container;
	    // just re-insert rendered nodes in new order

	    for (var _target = self, _index = 0, item, _l = _target.length; item = _target[_index], _index < _l; _index++) {
	        if (item && typeof item === 'object') {
	            var node = getAlreadyRendered({
	                item: item,
	                selfDef: selfDef
	            });

	            if (node) {
	                container.appendChild(node);
	            }
	        }
	    }
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	// this function removes DOM nodes of removed items
	// called on splice, pull, pop and shift
	module.exports = processRemove;
	function processRemove(_ref) {
	    var selfDef = _ref.selfDef;
	    var eventOptions = _ref.eventOptions;
	    var container = _ref.container;
	    var removed = eventOptions.removed;
	    var selfId = selfDef.id;

	    for (var _target = removed, _index = 0, item, _l = _target.length; item = _target[_index], _index < _l; _index++) {
	        if (item && typeof item === 'object') {
	            var itemDef = defs.get(item);
	            if (itemDef) {
	                var renderedInArrays = itemDef.renderedInArrays;

	                var node = renderedInArrays && renderedInArrays[selfId];
	                if (node) {
	                    delete renderedInArrays[selfId];
	                    container.removeChild(node);
	                }
	            }
	        }
	    }
	}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getAlreadyRendered = __webpack_require__(96);

	var renderItemNode = __webpack_require__(60);

	var triggerOne = __webpack_require__(20);

	// this function re-inserts rendered DOM nodes of items
	// if they are rendered and forceRerender is falsy
	// and renders array items from scratch if they aren't rendered yet or forceRerender is truthy
	module.exports = processRerender;
	function processRerender(_ref) {
	    var self = _ref.self;
	    var selfDef = _ref.selfDef;
	    var eventOptions = _ref.eventOptions;
	    var container = _ref.container;
	    var forceRerender = eventOptions.forceRerender;
	    var silent = eventOptions.silent;

	    // iterate over all items

	    for (var i = 0; i < self.length; i++) {
	        var item = self[i];
	        if (item && typeof item === 'object') {
	            var alreadyRenderedNode = getAlreadyRendered({
	                item: item,
	                selfDef: selfDef
	            });

	            // if item is already rendered and forceRerender is falsy then re-insert DOM node
	            // go to the next cycle iteration then
	            if (!forceRerender && alreadyRenderedNode) {
	                container.appendChild(alreadyRenderedNode);
	                continue;
	            }

	            // node removal is called when an item is rendered
	            // and forceRerender is truty
	            if (alreadyRenderedNode) {
	                if (container.contains(alreadyRenderedNode)) {
	                    container.removeChild(alreadyRenderedNode);
	                }
	            }

	            // render new node

	            var _renderItemNode = renderItemNode({
	                selfDef: selfDef,
	                self: self,
	                item: item,
	                eventOptions: eventOptions
	            });

	            var node = _renderItemNode.node;
	            var itemEventOptions = _renderItemNode.itemEventOptions;


	            if (node) {
	                container.appendChild(node);

	                if (!silent) {
	                    triggerOne(item, 'afterrender', itemEventOptions);
	                }
	            }
	        }
	    }
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var renderItemNode = __webpack_require__(60);

	var triggerOne = __webpack_require__(20);

	var checkAlreadyRendered = __webpack_require__(93);

	var getAlreadyRendered = __webpack_require__(96);

	// the function handles rendering of added items passed as third and rest arguments to splice method
	module.exports = processSpliceAdd;
	function processSpliceAdd(_ref) {
	    var self = _ref.self;
	    var selfDef = _ref.selfDef;
	    var eventOptions = _ref.eventOptions;
	    var container = _ref.container;
	    var added = eventOptions.added;
	    var silent = eventOptions.silent;

	    var nextIndex = self.lastIndexOf(added[added.length - 1]) + 1;
	    var next = self[nextIndex];
	    var nextNode = void 0;

	    // get a node of an item which is placed next to the last added item
	    // it is needed to insert newly rendered items before
	    if (next && typeof next === 'object') {
	        nextNode = getAlreadyRendered({
	            item: next,
	            selfDef: selfDef
	        });
	    }

	    for (var _target = added, _index = 0, item, _l = _target.length; item = _target[_index], _index < _l; _index++) {
	        if (item && typeof item === 'object') {
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
	            });

	            var node = _renderItemNode.node;
	            var itemEventOptions = _renderItemNode.itemEventOptions;


	            if (node) {
	                if (nextNode) {
	                    container.insertBefore(node, nextNode);
	                } else {
	                    container.appendChild(node);
	                }

	                if (!silent) {
	                    triggerOne(item, 'afterrender', itemEventOptions);
	                }
	            }
	        }
	    }
	}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var reportModified = __webpack_require__(57);

	var matreshkaError = __webpack_require__(25);

	// removes array item by given index
	function shift(arr, index) {
	    for (var i = index; i < arr.length; i++) {
	        arr[i] = arr[i + 1];
	    }
	    delete arr[arr.length - 1];
	    arr.length -= 1;
	}

	// finds array item that equals to given value and removes it
	// returns removed value
	function pullByValue(arr, value) {
	    for (var i = 0; i < arr.length; i++) {
	        if (arr[i] === value) {
	            shift(arr, i);
	            return value;
	        }
	    }

	    return undefined;
	}

	// removes array item by given index if the index is not over array length
	// returns removed value
	function pullByIndex(arr, index) {
	    if (index < arr.length) {
	        var value = arr[index];
	        shift(arr, index);
	        return value;
	    }

	    return undefined;
	}

	// removes an array item by index (if number is given) or by value (if object is given)
	module.exports = pull;
	function pull(toRemove) {
	    var eventOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var typeofToRemove = typeof toRemove;
	    var removed = void 0;

	    if (toRemove && typeofToRemove === 'object') {
	        removed = pullByValue(this, toRemove);
	    } else if (typeofToRemove === 'number') {
	        removed = pullByIndex(this, toRemove);
	    } else {
	        throw matreshkaError('pull:to_remove_type', { toRemove: toRemove });
	    }

	    if (typeof removed !== 'undefined') {
	        var _keys,
	            _l,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.method = 'pull'
	        _result.self = this
	        _result.added = []
	        _result.removed = [removed]

	        for (_source = eventOptions, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        reportModified(this, _result);
	    }

	    return removed;
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var reportModified = __webpack_require__(57);

	var updateTracked = __webpack_require__(103);

	// recreates an array
	module.exports = recreate;
	function recreate() {
	    var givenNewItems = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var eventOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var def = initMK(this);
	    var itemMediator = def.itemMediator;

	    var newLength = givenNewItems.length;
	    var oldLength = this.length;
	    var lengthDiff = oldLength - newLength;
	    var was = this.toJSON(false);
	    var trackBy = this.trackBy;
	    var skipItemMediator = eventOptions.skipItemMediator;
	    var silent = eventOptions.silent;
	    var dontRender = eventOptions.dontRender;

	    var addedIndexes = {};
	    var added = void 0;
	    var removed = void 0;
	    var newItems = void 0;

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
	    }

	    // call item mediator for every new item (but don't modify passed newItems)
	    if (itemMediator && !skipItemMediator) {
	        var toMediate = newItems;
	        newItems = Array(newLength);
	        for (var i = 0; i < newLength; i++) {
	            newItems[i] = itemMediator(toMediate[i], i);
	        }
	    }

	    // update array indexes with new values
	    for (var _i = 0; _i < newLength; _i++) {
	        this[_i] = newItems[_i];
	    }

	    // remove old items that is out of new length
	    for (var _i2 = 0; _i2 < lengthDiff; _i2++) {
	        delete this[_i2 + newLength];
	    }

	    // update length
	    this.length = newLength;

	    if (silent && dontRender) {
	        return this;
	    }

	    // create an array of removed items
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
	    }

	    // create an array of added items
	    if (oldLength) {
	        if (newLength) {
	            added = [];
	            for (var _i4 = 0; _i4 < newLength; _i4++) {
	                if (!~was.indexOf(newItems[_i4])) {
	                    added.push(newItems[_i4]);
	                    addedIndexes[_i4] = newItems[_i4];
	                }
	            }
	        } else {
	            added = [];
	        }
	    } else {
	        added = newItems;
	    }

	    var _keys,
	        _l,
	        _i5,
	        _source,
	        _key,
	        _result = {};

	    _result.added = added
	    _result.removed = removed
	    _result.method = 'recreate'
	    _result.self = this

	    for (_source = eventOptions, _keys = Object.keys(_source), _l = _keys.length, _i5 = 0; _i5 < _l; _i5++) {
	        _key = _keys[_i5];
	        _result[_key] = _source[_key];
	    }

	    reportModified(this, _result);

	    return this;
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var updateObject = __webpack_require__(104);

	// the function gets called to update new items passed to recreate method when trackBy is present
	// TODO: Throw an error when two or more items of one array has the same value of trackBy
	module.exports = updateTracked;
	function updateTracked(_ref) {
	    var givenNewItems = _ref.givenNewItems;
	    var arr = _ref.arr;
	    var trackBy = _ref.trackBy;

	    var newLength = givenNewItems.length;
	    var oldLength = arr.length;
	    var newItems = Array(newLength);

	    if (trackBy === '$index') {
	        // simply update items with the same index
	        for (var i = 0; i < newLength; i++) {
	            var item = arr[i];
	            var newItem = givenNewItems[i];

	            if (item && typeof item === 'object' && newItem && typeof newItem === 'object') {
	                newItems[i] = updateObject(item, newItem);
	            } else {
	                newItems[i] = newItem;
	            }
	        }
	    } else {
	        var trackMap = {};

	        // fill trackMap object where keys are values of trackBy and values are corresponding items
	        for (var _i = 0; _i < oldLength; _i++) {
	            var _item = arr[_i];

	            if (_item && typeof _item === 'object') {
	                if (trackBy in _item) {
	                    trackMap[_item[trackBy]] = _item;
	                }
	            }
	        }

	        for (var _i2 = 0; _i2 < newLength; _i2++) {
	            var _newItem = givenNewItems[_i2];

	            if (_newItem && typeof _newItem === 'object') {
	                var _item2 = arr[_i2];

	                if (_item2 && typeof _item2 === 'object' && _newItem[trackBy] in trackMap) {
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

/***/ },
/* 104 */
/***/ function(module, exports) {

	"use strict";

	// updates one single object by new data
	// for Matreshka.Array instance call recreate method
	// for Matreshka.Object instance call setData method
	// for other objects just extend them by properties of data parameter
	module.exports = updateObject;
	function updateObject(instance, data) {
	    if (instance.isMatreshkaArray) {
	        instance.recreate(data);
	    } else if (instance.isMatreshkaObject) {
	        // QUESTION: Is it OK to just extend but not replace instance data?
	        instance.setData(data);
	    } else {
	        for (var _target = data, _keys = Object.keys(_target), _i = 0, key, value, _l = _keys.length; (key = _keys[_i], value = _target[key]), _i < _l; _i++) {
	            instance[key] = value;
	        }
	    }

	    return instance;
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var processRendering = __webpack_require__(58);

	// rerenders not rendered items in an array
	// force rerender when forceRerender event option is truthy
	module.exports = rerender;
	function rerender() {
	    var eventOptions = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var _renderIfPossible = this.renderIfPossible;
	    var renderIfPossible = _renderIfPossible === undefined ? true : _renderIfPossible;

	    if (renderIfPossible) {
	        var _keys,
	            _l,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.method = 'rerender'
	        _result.added = []
	        _result.removed = []

	        for (_source = eventOptions, _keys = Object.keys(_source), _l = _keys.length, _i = 0; _i < _l; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        processRendering({
	            self: this,
	            eventOptions: _result
	        });
	    }

	    return this;
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var matreshkaError = __webpack_require__(25);

	var bindNode = __webpack_require__(80);

	var triggerOne = __webpack_require__(20);

	var getNodes = __webpack_require__(81);

	// restores Matreshka.Array from external nodes
	module.exports = restore;
	function restore(selector) {
	    var _this = this;

	    var eventOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var selfDef = initMK(this);
	    var Model = this.Model;
	    var silent = eventOptions.silent;

	    var newItems = [];
	    var nodes = void 0;

	    if (typeof selector === 'string') {
	        // get nodes by selector
	        nodes = getNodes(this, selector);
	    } else {
	        // get nodes from rendering container
	        var container = this.nodes.container || this.nodes.sandbox;

	        if (container) {
	            nodes = container.children;
	        } else {
	            // no container is bound, throw an error
	            throw matreshkaError('restore:no_nodes');
	        }
	    }

	    // recreate an array but don't render newly added items
	    for (var _target = nodes, index = 0, node, _l = _target.length; node = _target[index], index < _l; index++) {
	        var _itemDef$renderedInAr;

	        var item = Model ? new Model({}, _this, index) : {}; // create new item
	        var bindRenderedAsSandbox = item.bindRenderedAsSandbox;

	        var itemDef = initMK(item);

	        itemDef.renderedInArrays = (_itemDef$renderedInAr = {}, _itemDef$renderedInAr[selfDef.id] = node, _itemDef$renderedInAr);

	        if (bindRenderedAsSandbox !== false) {
	            bindNode(item, 'sandbox', node, null, eventOptions);
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

	            triggerOne(item, 'render', itemEventOptions);

	            // call afterrender immediately because a node already exists in DOM tree
	            triggerOne(item, 'afterrender', itemEventOptions);
	        }

	        newItems.push(item);
	    }

	    var _keys,
	        _l2,
	        _i,
	        _source,
	        _key,
	        _result = {};

	    _result.dontRender = true

	    for (_source = eventOptions, _keys = Object.keys(_source), _l2 = _keys.length, _i = 0; _i < _l2; _i++) {
	        _key = _keys[_i];
	        _result[_key] = _source[_key];
	    }

	    return this.recreate(newItems, _result);
	}

/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';

	// converts Matreshka.Array instance to ordinary array
	module.exports = toJSON;
	function toJSON() {
	    var recursive = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	    var result = new Array(this.length);

	    for (var _target = this, index = 0, item, _l = _target.length; item = _target[index], index < _l; index++) {
	        // when recursive is true and when an item has toJSON method then call it recusively
	        if (recursive && item && typeof item.toJSON === 'function') {
	            result[index] = item.toJSON(true);
	        } else {
	            result[index] = item;
	        }
	    }

	    return result;
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createPseudoNativeMethod = __webpack_require__(109);

	var concat = __webpack_require__(115);

	var splitBySpaceReg = /\s+/;
	var methods = { concat: concat };

	'push pop unshift shift sort reverse splice map filter slice every\nsome reduce reduceRight forEach join indexOf lastIndexOf'.split(splitBySpaceReg).forEach(function (name) {
	    methods[name] = createPseudoNativeMethod(name);
	});

	'push pop unshift shift sort reverse splice'.split(splitBySpaceReg).forEach(function (name) {
	    methods[name + '_'] = createPseudoNativeMethod(name, true);
	});

	module.exports = methods;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toMatreshkaArray = __webpack_require__(110);

	var createSortingMethod = __webpack_require__(111);

	var createRemovingMethod = __webpack_require__(112);

	var createAddingMethod = __webpack_require__(113);

	var createSplice = __webpack_require__(114);

	var apply = __webpack_require__(21);

	var arrayPrototype = Array.prototype;

	// creates pseudo native method and returns it (push, push_, sort, sort_...)
	module.exports = createPseudoNativeMethod;
	function createPseudoNativeMethod(name) {
	    var hasOptions = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	    switch (name) {
	        case 'forEach':
	            return function pseudoNativeMethod(callback, thisArg) {
	                arrayPrototype[name].call(this, callback, thisArg);
	                // return this for nicer chain calls
	                return this;
	            };
	        case 'map':
	        case 'filter':
	        case 'slice':
	            // TODO: Improve readability of pseudoNativeMethod, arguments "a, b" look not good
	            return function pseudoNativeMethod(a, b) {
	                return toMatreshkaArray(arrayPrototype[name].call(this, a, b));
	            };
	        case 'every':
	        case 'some':
	            return function pseudoNativeMethod(callback, thisArg) {
	                return arrayPrototype[name].call(this, callback, thisArg);
	            };
	        case 'join':
	            return function pseudoNativeMethod() {
	                var separator = arguments.length <= 0 || arguments[0] === undefined ? ',' : arguments[0];

	                return arrayPrototype[name].call(this, separator);
	            };
	        case 'indexOf':
	        case 'lastIndexOf':
	            return function pseudoNativeMethod(item) {
	                return arrayPrototype[name].call(this, item);
	            };
	        case 'reduce':
	        case 'reduceRight':
	            return function pseudoNativeMethod() {
	                return apply(arrayPrototype[name], this, arguments);
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
	        default:
	            return undefined;
	    }
	}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// converts array-like to Matreshka.Array instance
	module.exports = toMatreshkaArray;
	function toMatreshkaArray(arrayLike) {
	    // fix circular dependency issue
	    var MatreshkaArray = __webpack_require__(50);

	    var result = new MatreshkaArray(arrayLike.length);

	    for (var _target = arrayLike, index = 0, item, _l = _target.length; item = _target[index], index < _l; index++) {
	        result[index] = item;
	    }

	    return result;
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var reportModified = __webpack_require__(57);

	// creates sorting method and returns it (sort, reverse, sort_, reverse_)
	module.exports = createSortingMethod;
	function createSortingMethod(name, hasOptions) {
	    return function pseudoNativeMethod(sortCallback) {
	        if (this.length < 2) return this;
	        initMK(this);

	        var givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
	        var method = Array.prototype[name];

	        var eventOptions = {
	            method: name,
	            self: this,
	            added: [],
	            removed: []
	        };

	        // call original method
	        if (name === 'sort' && typeof sortCallback === 'function') {
	            method.call(this, sortCallback);
	        } else {
	            method.call(this);
	        }

	        // extend event options by custom event options if they are given
	        if (hasOptions) {
	            if (givenEventOptions && typeof givenEventOptions === 'object') {
	                var _result = eventOptions;

	                for (var _source2 = givenEventOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	                    _key2 = _keys2[_i2];
	                    _result[_key2] = _source2[_key2];
	                }
	            }
	        }

	        reportModified(this, eventOptions);

	        return this;
	    };
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var reportModified = __webpack_require__(57);

	// creates removing method and returns it (pop, shift, pop_, shift_)
	module.exports = createRemovingMethod;
	function createRemovingMethod(name, hasOptions) {
	    return function pseudoNativeMethod(givenEventOptions) {
	        if (!this.length) {
	            return undefined;
	        }
	        initMK(this);

	        // call original method
	        var returns = Array.prototype[name].call(this);
	        var eventOptions = {
	            method: name,
	            self: this,
	            added: [],
	            removed: [returns]
	        };

	        // extend event options by custom event options if they are given
	        if (hasOptions) {
	            if (givenEventOptions && typeof givenEventOptions === 'object') {
	                var _result = eventOptions;

	                for (var _source2 = givenEventOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	                    _key2 = _keys2[_i2];
	                    _result[_key2] = _source2[_key2];
	                }
	            }
	        }

	        reportModified(this, eventOptions);

	        return returns;
	    };
	}

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var reportModified = __webpack_require__(57);

	// creates methods: push, unshift, push_, unshift_
	module.exports = createAddingMethod;
	function createAddingMethod(name, hasOptions) {
	    return function pseudoNativeMethod() {
	        var _initMK = initMK(this);

	        var itemMediator = _initMK.itemMediator;
	        // +hasOptions is converted to 0 or 1 depending on its value (false/true)

	        var argsLength = arguments.length - +hasOptions;
	        var args = Array(argsLength);
	        var givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
	        var useMediator = typeof itemMediator === 'function' && (!givenEventOptions || !givenEventOptions.skipItemMediator);
	        var isPush = name === 'push';
	        var length = this.length;

	        // if no arguments are passed

	        if (!argsLength) {
	            return length;
	        }

	        // convert arguments to array and call item mediator on every item if it's possible
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
	            }
	            // insert new items to the begin of array
	            for (var _i3 = 0; _i3 < argsLength; _i3++) {
	                this[_i3] = args[_i3];
	            }
	        }

	        // update length
	        length += argsLength;
	        this.length = length;

	        var eventOptions = {
	            method: name,
	            self: this,
	            added: args,
	            removed: []
	        };

	        // extend event options by custom event options if they are given
	        if (hasOptions) {
	            if (givenEventOptions && typeof givenEventOptions === 'object') {
	                var _result = eventOptions;

	                for (var _source2 = givenEventOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i5 = 0, _key2; _i5 < _l2; _i5++) {
	                    _key2 = _keys2[_i5];
	                    _result[_key2] = _source2[_key2];
	                }
	            }
	        }

	        reportModified(this, eventOptions);

	        return length;
	    };
	}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var reportModified = __webpack_require__(57);

	var toMatreshkaArray = __webpack_require__(110);

	var apply = __webpack_require__(21);

	// creates splice or splice_ method and returns it
	// TODO: Improve readability of createSplice function
	module.exports = createSplice;
	function createSplice(hasOptions) {
	    return function pseudoNativeMethod() {
	        var _initMK = initMK(this);

	        var itemMediator = _initMK.itemMediator;

	        var functionArguments = arguments;
	        var argsLength = functionArguments.length - +hasOptions;
	        var args = Array(argsLength);
	        var givenEventOptions = hasOptions ? functionArguments[functionArguments.length - 1] : null;
	        var useMediator = typeof itemMediator === 'function' && (!givenEventOptions || !givenEventOptions.skipItemMediator);
	        var added = [];
	        var start = args[0];
	        var length = this.length;


	        start = start < 0 ? length + start : start;

	        // convert arguments to array and call item mediator on every new item if it's possible
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
	        }

	        // call original method
	        // TODO: Change array manually in splice method for better performance
	        var returns = apply(Array.prototype.splice, this, args);
	        // removed items mean returned items
	        var removed = returns;

	        // if something is added or removed
	        if (added.length || removed.length) {
	            var eventOptions = {
	                added: added,
	                removed: removed,
	                method: 'splice',
	                self: this
	            };

	            // extend event options by custom event options if they are given
	            if (hasOptions) {
	                if (givenEventOptions && typeof givenEventOptions === 'object') {
	                    var _result = eventOptions;

	                    for (var _source2 = givenEventOptions, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	                        _key2 = _keys2[_i2];
	                        _result[_key2] = _source2[_key2];
	                    }
	                }
	            }

	            reportModified(this, eventOptions);
	        }

	        return toMatreshkaArray(returns);
	    };
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var apply = __webpack_require__(21);

	// the method works just like Array.prototype.concat but
	// - flattens both Array and Matreshka.Array
	// - returns Matreshka.Array
	module.exports = concat;
	function concat() {
	    // fix circular dependency issue
	    var MatreshkaArray = __webpack_require__(50);

	    var args = Array(arguments.length);

	    // convert all instances of Matreshka.Array to Array

	    // call original concat method
	    for (var _target = arguments, index = 0, arg, _l = _target.length; arg = _target[index], index < _l; index++) {
	        if (arg && typeof arg === 'object' && arg.isMatreshkaArray) {
	            args[index] = arg.toJSON(false);
	        } else {
	            args[index] = arg;
	        }
	    }

	    var nativeCallResult = apply(Array.prototype.concat, this.toJSON(false), args);

	    // convert returned value to Matreshka.Array
	    var result = new MatreshkaArray();

	    for (var _target2 = nativeCallResult, index = 0, item, _l2 = _target2.length; item = _target2[index], index < _l2; index++) {
	        result[index] = item;
	    }

	    result.length = nativeCallResult.length;

	    return result;
	}

/***/ },
/* 116 */
/***/ function(module, exports) {

	"use strict";

	// Symbol.iterator of Matreshka.Array instances
	module.exports = matreshkaArrayIterator;
	function matreshkaArrayIterator() {
	    var _this = this;

	    var i = 0;

	    return {
	        next: function () {
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

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var from = __webpack_require__(118);

	var of = __webpack_require__(119);

	module.exports = {
	    of: of,
	    from: from
	}; // lol

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cheapRecreate = __webpack_require__(55);

	// creates a new Matreshka.Array instance from an array-like or iterable object
	module.exports = from;
	function from(arrayLike, mapFn, thisArg) {
	    // allow to inherit this method by child classes
	    // require('./') fixes circular ref issue
	    var ParentClass = this || __webpack_require__(50);

	    var result = new ParentClass();
	    var length = arrayLike.length;
	    var arrayFrom = Array.from;
	    var newItems = void 0;

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

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var cheapRecreate = __webpack_require__(55);

	// creates a new Matreshka.Array instance with a variable number of arguments,
	// regardless of number or type of the arguments
	module.exports = of;
	function of() {
	    var _arguments = arguments;

	    // allow to inherit this method by child classes
	    // require('./') fixes circular ref issue
	    var ParentClass = this || __webpack_require__(50);

	    var result = new ParentClass();
	    var newItems = Array(arguments.length);

	    for (var _target = arguments, index = 0, item, _l = _target.length; item = _target[index], index < _l; index++) {
	        newItems[index] = _arguments[index];
	    }

	    return cheapRecreate(result, newItems);
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var html = __webpack_require__(121);

	var display = __webpack_require__(122);

	var className = __webpack_require__(123);

	var prop = __webpack_require__(125);

	var attr = __webpack_require__(126);

	var input = __webpack_require__(5);

	var output = __webpack_require__(9);

	var textarea = __webpack_require__(6);

	var select = __webpack_require__(7);

	var progress = __webpack_require__(8);

	var text = __webpack_require__(127);

	var style = __webpack_require__(128);

	var dataset = __webpack_require__(129);

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
/* 121 */
/***/ function(module, exports) {

	'use strict';

	// returns a binder for innerHTML of an element
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
/* 122 */
/***/ function(module, exports) {

	'use strict';

	//  returns a binder to switch visibility of an element
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
	}

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classlistJs = __webpack_require__(124);

	var toggle = _classlistJs.toggle;
	var contains = _classlistJs.contains;


	// returns a binder for className of an element
	// switcher makes possible to turn property value
	module.exports = className;
	function className(elementClassName) {
	    var switcher = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

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

/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict';

	// @IE9

	var add = void 0;
	var remove = void 0;
	var contains = void 0; // eslint-disable-line import/no-mutable-exports

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
	        var re = new RegExp('(^|\\s)' + name + '(\\s|$)', 'g');
	        if (!re.test(node.className)) {
	            node.className = (node.className + ' ' + name).replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
	        }
	    };

	    remove = function (node, name) {
	        var re = new RegExp('(^|\\s)' + name + '(\\s|$)', 'g');
	        node.className = node.className.replace(re, '$1').replace(/\s+/g, ' ').replace(/(^ | $)/g, '');
	    };

	    contains = function (node, name) {
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
/* 125 */
/***/ function(module, exports) {

	"use strict";

	// returns a binder to change properties of an element
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
	            } catch (e) {
	                // cannot set given property (eg tagName)
	            }
	        }
	    };
	}

/***/ },
/* 126 */
/***/ function(module, exports) {

	"use strict";

	// returns a binder for element attribute
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
/* 127 */
/***/ function(module, exports) {

	'use strict';

	// returns a binder for textContent of an element
	module.exports = text;
	function text() {
	    return {
	        on: 'input', // the event name fires only in contenteditable mode
	        getValue: function () {
	            return this.textContent;
	        },
	        setValue: function (value) {
	            this.textContent = '' + value;
	        }
	    };
	}

/***/ },
/* 128 */
/***/ function(module, exports) {

	"use strict";

	// returns a binder for style properties
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
/* 129 */
/***/ function(module, exports) {

	"use strict";

	// replace namesLikeThis with names-like-this
	var replacer = function (u) {
	    return "-" + u.toLowerCase();
	};
	var toDashed = function (name) {
	    return "data-" + name.replace(/([A-Z])/g, replacer);
	};

	//  returns a binder for dataset of an element
	// old browsers are also supported @IE9 @IE10
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
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var on = __webpack_require__(131);

	var once = __webpack_require__(133);

	var onDebounce = __webpack_require__(135);

	var off = __webpack_require__(134);

	var trigger = __webpack_require__(136);

	var calc = __webpack_require__(63);

	var bindNode = __webpack_require__(80);

	var unbindNode = __webpack_require__(85);

	var bindOptionalNode = __webpack_require__(139);

	var bindSandbox = __webpack_require__(140);

	var parseBindings = __webpack_require__(61);

	var select = __webpack_require__(141);

	var selectAll = __webpack_require__(142);

	var set = __webpack_require__(23);

	var remove = __webpack_require__(143);

	var instantiate = __webpack_require__(144);

	var mediate = __webpack_require__(145);

	// the following methods can be used as static methods and as instance methods
	exports.on = on;
	exports.once = once;
	exports.onDebounce = onDebounce;
	exports.off = off;
	exports.trigger = trigger;
	exports.calc = calc;
	exports.bindNode = bindNode;
	exports.unbindNode = unbindNode;
	exports.bindOptionalNode = bindOptionalNode;
	exports.bindSandbox = bindSandbox;
	exports.parseBindings = parseBindings;
	exports.select = select;
	exports.selectAll = selectAll;
	exports.set = set;
	exports.remove = remove;
	exports.instantiate = instantiate;
	exports.mediate = mediate;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var splitBySpaceReg = __webpack_require__(132);

	var checkObjectType = __webpack_require__(24);

	var matreshkaError = __webpack_require__(25);

	var addListener = __webpack_require__(17);

	var delegateListener = __webpack_require__(67);

	// adds event listener
	module.exports = on;
	function on(object, givenNames, callback, triggerOnInit, context) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        context = triggerOnInit;
	        triggerOnInit = callback;
	        callback = givenNames;
	        givenNames = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'on');
	    }

	    var isNamesVarArray = givenNames instanceof Array;

	    // allow to pass name-handler object
	    if (givenNames && typeof givenNames === 'object' && !isNamesVarArray) {
	        for (var _target = givenNames, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            on(object, namesObjName, namesObjCallback, callback, triggerOnInit)
	        }

	        return object;
	    }

	    if (typeof givenNames !== 'string' && !isNamesVarArray) {
	        throw matreshkaError('on:names_type', { names: givenNames });
	    }

	    // split by spaces
	    // TODO: Array of names passed to on method is non-documented feature
	    var names = isNamesVarArray ? givenNames : givenNames.split(splitBySpaceReg);

	    // flip triggerOnInit and context when triggerOnInit is not boolean
	    if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
	        var _ref = [triggerOnInit, context];
	        // eslint-disable-next-line no-param-reassign

	        context = _ref[0];
	        triggerOnInit = _ref[1];
	    }

	    // call callback immediatelly if triggerOnInit is true
	    for (var _target2 = names, _index = 0, name, _l2 = _target2.length; name = _target2[_index], _index < _l2; _index++) {
	        var delegatedEventParts = name.split('@');

	        if (delegatedEventParts.length > 1) {
	            // if @ exists in event name then this is delegated event
	            var path = delegatedEventParts[0];
	            var delegatedName = delegatedEventParts[1];

	            delegateListener(object, path, delegatedName, callback, context || object);
	        } else {
	            // if not, this is simple event
	            addListener(object, name, callback, context);
	        }
	    }

	    if (triggerOnInit === true) {
	        callback.call(context || object, { triggerOnInit: triggerOnInit });
	    }

	    return object;
	}

/***/ },
/* 132 */
/***/ function(module, exports) {

	"use strict";

	// allows to split by spaces not inclusing ones inside of brackers
	module.exports = /\s+(?![^(]*\))/g;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var on = __webpack_require__(131);

	var checkObjectType = __webpack_require__(24);

	var off = __webpack_require__(134);

	var apply = __webpack_require__(21);

	// adds event listener which will be removed immediately after its first call
	module.exports = once;
	function once(object, names, givenCallback, context) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        context = givenCallback;
	        givenCallback = names;
	        names = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'once');
	    }

	    var isNamesVarArray = names instanceof Array;

	    // allow to pass name-handler object
	    if (names && typeof names === 'object' && !isNamesVarArray) {
	        for (var _target = names, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            once(object, namesObjName, namesObjCallback, givenCallback)
	        }

	        return object;
	    }

	    var callback = function onceCallback() {
	        apply(givenCallback, this, arguments);
	        // remove event listener after its call
	        off(object, names, onceCallback, context);
	    };

	    // allow to remove event listener py passing original callback to "off"
	    callback._callback = givenCallback;

	    return on(object, names, callback, context);
	}

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var splitBySpaceReg = __webpack_require__(132);

	var checkObjectType = __webpack_require__(24);

	var defs = __webpack_require__(19);

	var removeListener = __webpack_require__(72);

	var undelegateListener = __webpack_require__(71);

	// removes event listener
	module.exports = off;
	function off(object, givenNames, callback, context) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        context = callback;
	        callback = givenNames;
	        givenNames = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'off');
	    }

	    var isNamesVarArray = givenNames instanceof Array;
	    var def = defs.get(object);

	    // allow to pass name-handler object
	    // TODO: Name-handler object passed to off method is non-documented feature
	    if (givenNames && typeof givenNames === 'object' && !isNamesVarArray) {
	        for (var _target = givenNames, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            off(object, namesObjName, namesObjCallback, callback)
	        }

	        return object;
	    }

	    if (!givenNames && !callback && !context) {
	        def.events = {};
	        return object;
	    }

	    // TODO: Array of names passed to off method is non-documented feature
	    // split by spaces
	    var names = isNamesVarArray ? givenNames : givenNames.split(splitBySpaceReg);

	    for (var _target2 = names, _index = 0, name, _l2 = _target2.length; name = _target2[_index], _index < _l2; _index++) {
	        var delegatedEventParts = name.split('@');
	        if (delegatedEventParts.length > 1) {
	            var path = delegatedEventParts[0];
	            var delegatedName = delegatedEventParts[1];

	            undelegateListener(object, path, delegatedName, callback, context);
	        } else {
	            removeListener(object, name, callback, context);
	        }
	    }

	    return object;
	}

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var on = __webpack_require__(131);

	var checkObjectType = __webpack_require__(24);

	var debounce = __webpack_require__(64);

	// adds debounced event listener
	module.exports = onDebounce;
	function onDebounce(object, names, givenCallback, givenDelay, triggerOnInit, context) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
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
	        checkObjectType(object, 'onDebounce');
	    }

	    var isNamesVarArray = names instanceof Array;

	    // allow to pass name-handler object
	    if (names && typeof names === 'object' && !isNamesVarArray) {
	        for (var _target = names, _keys = Object.keys(_target), _i = 0, namesObjName, namesObjCallback, _l = _keys.length; (namesObjName = _keys[_i], namesObjCallback = _target[namesObjName]), _i < _l; _i++) {
	            onDebounce(object, namesObjName, namesObjCallback, givenCallback, givenDelay, triggerOnInit)
	        }

	        return object;
	    }

	    var delay = typeof givenDelay === 'number' ? givenDelay : 0;

	    var callback = debounce(givenCallback, delay);

	    // allow to remove event listener py passing original callback to "off"
	    callback._callback = givenCallback;

	    return on(object, names, callback, triggerOnInit, context);
	}

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var domEventReg = __webpack_require__(27);

	var checkObjectType = __webpack_require__(24);

	var matreshkaError = __webpack_require__(25);

	var splitBySpaceReg = __webpack_require__(132);

	var defs = __webpack_require__(19);

	var triggerOne = __webpack_require__(20);

	var triggerDomEvent = __webpack_require__(137);

	// triggers an event
	module.exports = trigger;
	function trigger() {
	    var object = void 0;
	    var givenNames = void 0;
	    var triggerArgs = void 0;

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    if (typeof this === 'object' && this.isMatreshka) {
	        givenNames = args[0];
	        // when context is Matreshka instance, use this as an object and shift other args

	        triggerArgs = args.slice(1);

	        object = this;
	    } else {
	        // throw error when object type is wrong
	        object = args[0];
	        givenNames = args[1];
	        triggerArgs = args.slice(2);
	        checkObjectType(object, 'trigger');
	    }
	    var names = void 0;

	    // allow to use strings only as event name
	    if (typeof givenNames === 'string') {
	        names = givenNames.split(splitBySpaceReg);
	    } else {
	        throw matreshkaError('trigger:names_type', { names: givenNames });
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
	        var domEvtExecResult = domEventReg.exec(name);

	        if (domEvtExecResult) {
	            // if EVT::KEY(SELECTOR) ia passed as event name then trigger DOM event
	            var eventName = domEvtExecResult[1];
	            var _domEvtExecResult$ = domEvtExecResult[2];
	            var key = _domEvtExecResult$ === undefined ? 'sandbox' : _domEvtExecResult$;
	            var selector = domEvtExecResult[3];

	            triggerDomEvent(object, key, eventName, selector, triggerArgs);
	        } else {
	            // trigger ordinary event
	            triggerOne(object, name, triggerArgs);
	        }
	    }

	    return object;
	}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var triggerOneDOMEvent = __webpack_require__(138);

	var defs = __webpack_require__(19);

	// triggers DOM event on bound nodes
	module.exports = triggerDOMEvent;
	function triggerDOMEvent(object, key, eventName, selector, triggerArgs) {
	    var def = defs.get(object);

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

	    return;
	}

/***/ },
/* 138 */
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
	    } else if (typeof Event !== 'undefined') {
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
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindNode = __webpack_require__(80);

	var apply = __webpack_require__(21);

	// TODO: Adds a binding, not throwing an error when a node is missing
	module.exports = bindOptionalNode;
	function bindOptionalNode() {
	    // this hack allows to keep bindOptionalNode as compact as possible
	    // and doesn't require to flip args and support all bindNode variations
	    bindNode.temporaryOptionalFlag = true;
	    return apply(bindNode, this, arguments);
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindNode = __webpack_require__(80);

	var unbindNode = __webpack_require__(85);

	var checkObjectType = __webpack_require__(24);

	// binds or rebinds sandbox node
	module.exports = bindSandbox;
	function bindSandbox(object, node, evt) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        evt = node;
	        node = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'bindSandbox');
	    }

	    unbindNode(object, 'sandbox', null, evt);
	    return bindNode(object, 'sandbox', node, null, evt);
	}

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var selectNodes = __webpack_require__(82);

	var checkObjectType = __webpack_require__(24);

	var customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/;

	// selects one node based on given selector
	module.exports = select;
	function select(object, selector) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        selector = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'select');
	    }

	    // the selector includes "custom" things like :sandbox or :bound(KEY)
	    if (customSelectorTestReg.test(selector)) {
	        return selectNodes(object, selector)[0] || null;
	    }
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

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defs = __webpack_require__(19);

	var dom = __webpack_require__(29);

	var selectNodes = __webpack_require__(82);

	var toArray = __webpack_require__(83);

	var checkObjectType = __webpack_require__(24);

	var customSelectorTestReg = /:sandbox|:bound\(([^(]*)\)/;

	// selects nodes based on given selector
	module.exports = selectAll;
	function selectAll(object, selector) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        selector = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'selectAll or $');
	    }

	    // the selector includes "custom" things like :sandbox or :bound(KEY)
	    if (customSelectorTestReg.test(selector)) {
	        return selectNodes(object, selector);
	    }

	    var def = defs.get(object);
	    var result = dom.$();

	    if (!def || typeof selector !== 'string') {
	        return result;
	    }

	    var propDef = def.props.sandbox;

	    if (!propDef) {
	        return result;
	    }

	    var bindings = propDef.bindings;


	    if (bindings) {
	        for (var _target = bindings, _index = 0, _ref, _l = _target.length; _ref = _target[_index], _index < _l; _index++) {
	            var node = _ref.node;

	            var selected = node.querySelectorAll(selector);
	            result = result.add(toArray(selected));
	        }
	        // iterate over all bindings and add found nodes

	    }

	    return result;
	}

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var unbindNode = __webpack_require__(85);

	var triggerOne = __webpack_require__(20);

	var removeListener = __webpack_require__(72);

	var defs = __webpack_require__(19);

	var checkObjectType = __webpack_require__(24);

	var matreshkaError = __webpack_require__(25);

	// removes a property, its bindings and its events
	// TODO: remove function does not correctly removes delegated events, bindings, tree listeners etc
	module.exports = remove;
	function remove(object, givenKey, eventOptions) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        eventOptions = givenKey;
	        givenKey = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'remove');
	    }

	    eventOptions = eventOptions || {}; // eslint-disable-line no-param-reassign
	    var def = defs.get(object);
	    var _eventOptions = eventOptions;
	    var silent = _eventOptions.silent;
	    // allow to pass single key or an array of keys

	    var keys = givenKey instanceof Array ? givenKey : [givenKey];

	    var _loop = function (i) {
	        var key = keys[i];

	        // if non-string is passed as a key
	        if (typeof key !== 'string') {
	            throw matreshkaError('remove:key_type', { key: key });
	        }

	        var props = def && def.props;
	        var propDef = props && props[key];

	        // if no object definition then simply delete the property
	        if (!propDef) {
	            delete object[key];
	            return 'continue';
	        }

	        var value = propDef.value;

	        // remove all bindings

	        unbindNode(object, key);

	        // TODO: Manual listing of event prefixes may cause problems in future
	        var removeEventPrefies = ['_change:deps', '_change:bindings', '_change:delegated', '_change:tree', 'change', 'beforechange', 'bind', 'unbind'];

	        // remove all events

	        // delete property definition
	        for (var _target = removeEventPrefies, _index = 0, prefix, _l = _target.length; prefix = _target[_index], _index < _l; _index++) {
	            removeListener(object, prefix + ':' + key)
	        }

	        delete props[key];

	        // delete the property itself
	        delete object[key];

	        var _keys,
	            _l2,
	            _i,
	            _source,
	            _key,
	            _result = {};

	        _result.key = key
	        _result.value = value

	        for (_source = eventOptions, _keys = Object.keys(_source), _l2 = _keys.length, _i = 0; _i < _l2; _i++) {
	            _key = _keys[_i];
	            _result[_key] = _source[_key];
	        }

	        var extendedEventOptions = _result;

	        // trigger delegated events logic removal for asterisk events (*.*.*@foo)
	        triggerOne(object, '_delete:delegated', extendedEventOptions);

	        // fire events if "silent" is not true
	        if (!silent) {
	            triggerOne(object, 'delete', extendedEventOptions);
	            triggerOne(object, 'delete:' + key, extendedEventOptions);
	        }
	    };

	    for (var i = 0; i < keys.length; i++) {
	        var _ret = _loop(i);

	        if (_ret === 'continue') continue;
	    }
	}

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var checkObjectType = __webpack_require__(24);

	var mediate = __webpack_require__(145);

	// the function is used when no update function is given
	function defaultUpdateFunction(instance, data) {
	    if (instance.isMatreshkaArray) {
	        instance.recreate(data);
	    } else if (instance.isMatreshkaObject) {
	        instance.setData(data, { replaceData: true });
	    } else {
	        var _result = instance;
	        // for other objects just extend them with given data

	        for (var _source2 = data, _keys2 = Object.keys(_source2), _l2 = _keys2.length, _i2 = 0, _key2; _i2 < _l2; _i2++) {
	            _key2 = _keys2[_i2];
	            _result[_key2] = _source2[_key2];
	        }
	    }
	}

	// returns mediator which controls assignments
	function createInstantiateMediator(_ref) {
	    var UsedClass = _ref.UsedClass;
	    var updateFunction = _ref.updateFunction;

	    return function mediator(value, previousValue, key, object) {
	        if (previousValue instanceof UsedClass) {
	            updateFunction.call(object, previousValue, value, key);
	            return previousValue;
	        }

	        return new UsedClass(value, object, key);
	    };
	}

	// creates an instance of given class as property value
	// and updates an instance on new value assignment instead of actual assignment
	module.exports = instantiate;
	function instantiate(object, givenKeys, UsedClass, givenUpdateFunction) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        givenUpdateFunction = UsedClass;
	        UsedClass = givenKeys;
	        givenKeys = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'instantiate');
	    }

	    var isKeysArray = givenKeys instanceof Array;

	    // allow to use key-class object
	    if (typeof givenKeys === 'object' && !isKeysArray) {
	        for (var _target = givenKeys, _keys3 = Object.keys(_target), _i3 = 0, objKey, objVal, _l3 = _keys3.length; (objKey = _keys3[_i3], objVal = _target[objKey]), _i3 < _l3; _i3++) {
	            instantiate(object, objKey, objVal, UsedClass)
	        }

	        return object;
	    }

	    // allow to use both single key and an array of keys
	    var keys = isKeysArray ? givenKeys : [givenKeys];
	    var updateFunction = givenUpdateFunction || defaultUpdateFunction;
	    var mediator = createInstantiateMediator({
	        UsedClass: UsedClass,
	        updateFunction: updateFunction
	    });

	    // iterate over all keys and define created mediator for all of them

	    for (var _target2 = keys, _index = 0, key, _l4 = _target2.length; key = _target2[_index], _index < _l4; _index++) {
	        mediate(object, key, mediator)
	    }

	    return object;
	}

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var initMK = __webpack_require__(18);

	var defineProp = __webpack_require__(22);

	var checkObjectType = __webpack_require__(24);

	var set = __webpack_require__(23);

	var matreshkaError = __webpack_require__(25);

	// creates property mediator
	function createMediator(_ref) {
	    var object = _ref.object;
	    var propDef = _ref.propDef;
	    var key = _ref.key;
	    var mediator = _ref.mediator;

	    return function propMediator(value) {
	        // args: value, previousValue, key, object itself
	        return mediator.call(object, value, propDef.value, key, object);
	    };
	}

	// transforms property value on its changing
	module.exports = mediate;
	function mediate(object, givenKeys, mediator) {
	    if (typeof this === 'object' && this.isMatreshka) {
	        // when context is Matreshka instance, use this as an object and shift other args
	        /* eslint-disable no-param-reassign */
	        mediator = givenKeys;
	        givenKeys = object;
	        object = this;
	        /* eslint-enable no-param-reassign */
	    } else {
	        // throw error when object type is wrong
	        checkObjectType(object, 'mediate');
	    }

	    var isKeysArray = givenKeys instanceof Array;

	    // allow to use key-mediator object as another method variation
	    if (typeof givenKeys === 'object' && !isKeysArray) {
	        for (var _target = givenKeys, _keys = Object.keys(_target), _i = 0, objKey, objVal, _l = _keys.length; (objKey = _keys[_i], objVal = _target[objKey]), _i < _l; _i++) {
	            mediate(object, objKey, objVal)
	        }

	        return object;
	    }

	    initMK(object);

	    // allow to use both single key and an array of keys
	    var keys = isKeysArray ? givenKeys : [givenKeys];

	    for (var _target2 = keys, _index = 0, key, _l2 = _target2.length; key = _target2[_index], _index < _l2; _index++) {
	        // if non-string is passed as a key
	        if (typeof key !== 'string') {
	            throw matreshkaError('mediate:key_type', { key: key });
	        }

	        var propDef = defineProp(object, key);

	        var propMediator = propDef.mediator = createMediator({
	            object: object,
	            propDef: propDef,
	            key: key,
	            mediator: mediator
	        });

	        // set new value
	        set(object, key, propMediator(propDef.value), {
	            fromMediator: true
	        });
	    }

	    return object;
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var dom = __webpack_require__(29);

	var mq = __webpack_require__(31);

	// forces Matrsahka to use jQuery-like DOM library for internal stuff
	module.exports = useDOMLibrary;
	function useDOMLibrary(library) {
	    if (typeof library === 'function') {
	        dom.$ = library;
	    } else {
	        dom.$ = mq;
	    }
	}

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _universalmethods = __webpack_require__(130);

	var universalMethods = _universalmethods;

	var assign = __webpack_require__(39);

	var _afterInit = __webpack_require__(16);

	module.exports = assign({
	    _afterInit: _afterInit,
	    isMatreshka: true,
	    $: universalMethods.selectAll
	}, universalMethods);

/***/ }
/******/ ])
});
;if(typeof Matreshka === "function") this.MK = Matreshka;