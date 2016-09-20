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

	__webpack_require__(1);
	module.exports = __webpack_require__(298);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(2);
	
	__webpack_require__(293);
	
	__webpack_require__(295);
	
	/* eslint max-len: 0 */
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	// Should be removed in the next major release:
	
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(57);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(70);
	__webpack_require__(72);
	__webpack_require__(74);
	__webpack_require__(76);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(85);
	__webpack_require__(87);
	__webpack_require__(89);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(109);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(113);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(131);
	__webpack_require__(132);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(171);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(187);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(191);
	__webpack_require__(193);
	__webpack_require__(195);
	__webpack_require__(197);
	__webpack_require__(198);
	__webpack_require__(199);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(211);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(221);
	__webpack_require__(222);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(231);
	__webpack_require__(232);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(238);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(244);
	__webpack_require__(245);
	__webpack_require__(246);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(249);
	__webpack_require__(251);
	__webpack_require__(252);
	__webpack_require__(253);
	__webpack_require__(254);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(258);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(263);
	__webpack_require__(264);
	__webpack_require__(265);
	__webpack_require__(266);
	__webpack_require__(269);
	__webpack_require__(270);
	__webpack_require__(271);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(274);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(278);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(281);
	__webpack_require__(282);
	__webpack_require__(283);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(291);
	__webpack_require__(292);
	module.exports = __webpack_require__(9);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(4)
	  , has            = __webpack_require__(5)
	  , DESCRIPTORS    = __webpack_require__(6)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(18)
	  , META           = __webpack_require__(22).KEY
	  , $fails         = __webpack_require__(7)
	  , shared         = __webpack_require__(23)
	  , setToStringTag = __webpack_require__(24)
	  , uid            = __webpack_require__(19)
	  , wks            = __webpack_require__(25)
	  , wksExt         = __webpack_require__(26)
	  , wksDefine      = __webpack_require__(27)
	  , keyOf          = __webpack_require__(29)
	  , enumKeys       = __webpack_require__(42)
	  , isArray        = __webpack_require__(45)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , createDesc     = __webpack_require__(17)
	  , _create        = __webpack_require__(46)
	  , gOPNExt        = __webpack_require__(49)
	  , $GOPD          = __webpack_require__(51)
	  , $DP            = __webpack_require__(11)
	  , $keys          = __webpack_require__(30)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(44).f  = $propertyIsEnumerable;
	  __webpack_require__(43).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(28)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 4 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(7)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(9)
	  , hide      = __webpack_require__(10)
	  , redefine  = __webpack_require__(18)
	  , ctx       = __webpack_require__(20)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(6) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(16)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(6) && !__webpack_require__(7)(function(){
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(4).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , hide      = __webpack_require__(10)
	  , has       = __webpack_require__(5)
	  , SRC       = __webpack_require__(19)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(9).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(21);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(19)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(5)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(7)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(5)
	  , TAG = __webpack_require__(25)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(23)('wks')
	  , uid        = __webpack_require__(19)
	  , Symbol     = __webpack_require__(4).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(25);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(4)
	  , core           = __webpack_require__(9)
	  , LIBRARY        = __webpack_require__(28)
	  , wksExt         = __webpack_require__(26)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(31)
	  , enumBugKeys = __webpack_require__(41);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(5)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(23)('keys')
	  , uid    = __webpack_require__(19);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(30)
	  , gOPS    = __webpack_require__(43)
	  , pIE     = __webpack_require__(44);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 44 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(47)
	  , enumBugKeys = __webpack_require__(41)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(15)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(48).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(30);
	
	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4).document && document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , gOPN      = __webpack_require__(50).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(31)
	  , hiddenKeys = __webpack_require__(41).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(44)
	  , createDesc     = __webpack_require__(17)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(16)
	  , has            = __webpack_require__(5)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(46)});

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', {defineProperties: __webpack_require__(47)});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(32)
	  , $getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	__webpack_require__(56)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(8)
	  , core    = __webpack_require__(9)
	  , fails   = __webpack_require__(7);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(58)
	  , $getPrototypeOf = __webpack_require__(59);
	
	__webpack_require__(56)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(5)
	  , toObject    = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(58)
	  , $keys    = __webpack_require__(30);
	
	__webpack_require__(56)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(56)('getOwnPropertyNames', function(){
	  return __webpack_require__(49).f;
	});

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(13)
	  , meta     = __webpack_require__(22).onFreeze;
	
	__webpack_require__(56)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(13);
	
	__webpack_require__(56)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(8);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(69)});

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(30)
	  , gOPS     = __webpack_require__(43)
	  , pIE      = __webpack_require__(44)
	  , toObject = __webpack_require__(58)
	  , IObject  = __webpack_require__(33)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(7)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {is: __webpack_require__(71)});

/***/ },
/* 71 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(8);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(73).set});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(13)
	  , anObject = __webpack_require__(12);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(20)(Function.call, __webpack_require__(51).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(75)
	  , test    = {};
	test[__webpack_require__(25)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(18)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(34)
	  , TAG = __webpack_require__(25)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Function', {bind: __webpack_require__(77)});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(21)
	  , isObject   = __webpack_require__(13)
	  , invoke     = __webpack_require__(78)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11).f
	  , createDesc = __webpack_require__(17)
	  , has        = __webpack_require__(5)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    try {
	      var that = this
	        , name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch(e){
	      return '';
	    }
	  }
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObject       = __webpack_require__(13)
	  , getPrototypeOf = __webpack_require__(59)
	  , HAS_INSTANCE   = __webpack_require__(25)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(11).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(8)
	  , $parseInt = __webpack_require__(82);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(4).parseInt
	  , $trim     = __webpack_require__(83).trim
	  , ws        = __webpack_require__(84)
	  , hex       = /^[\-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	  , defined = __webpack_require__(35)
	  , fails   = __webpack_require__(7)
	  , spaces  = __webpack_require__(84)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(8)
	  , $parseFloat = __webpack_require__(86);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(4).parseFloat
	  , $trim       = __webpack_require__(83).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(84) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(4)
	  , has               = __webpack_require__(5)
	  , cof               = __webpack_require__(34)
	  , inheritIfRequired = __webpack_require__(88)
	  , toPrimitive       = __webpack_require__(16)
	  , fails             = __webpack_require__(7)
	  , gOPN              = __webpack_require__(50).f
	  , gOPD              = __webpack_require__(51).f
	  , dP                = __webpack_require__(11).f
	  , $trim             = __webpack_require__(83).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(__webpack_require__(46)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = __webpack_require__(6) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(18)(global, NUMBER, $Number);
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(13)
	  , setPrototypeOf = __webpack_require__(73).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(8)
	  , toInteger    = __webpack_require__(38)
	  , aNumberValue = __webpack_require__(90)
	  , repeat       = __webpack_require__(91)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';
	
	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(7)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(34);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(8)
	  , $fails       = __webpack_require__(7)
	  , aNumberValue = __webpack_require__(90)
	  , $toPrecision = 1..toPrecision;
	
	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(8)
	  , _isFinite = __webpack_require__(4).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(96)});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(13)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(8)
	  , isInteger = __webpack_require__(96)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(8)
	  , $parseFloat = __webpack_require__(86);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(8)
	  , $parseInt = __webpack_require__(82);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(8)
	  , log1p   = __webpack_require__(104)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 104 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(8)
	  , $asinh  = Math.asinh;
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(8)
	  , $atanh  = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(8)
	  , sign    = __webpack_require__(108);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 108 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(8)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(8)
	  , $expm1  = __webpack_require__(112);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ },
/* 112 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(8)
	  , sign      = __webpack_require__(108)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(8)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(8)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(104)});

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {sign: __webpack_require__(108)});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(8)
	  , expm1   = __webpack_require__(112)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(8)
	  , expm1   = __webpack_require__(112)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(8)
	  , toIndex        = __webpack_require__(39)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(8)
	  , toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(83)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(127)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(128)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(28)
	  , $export        = __webpack_require__(8)
	  , redefine       = __webpack_require__(18)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(5)
	  , Iterators      = __webpack_require__(129)
	  , $iterCreate    = __webpack_require__(130)
	  , setToStringTag = __webpack_require__(24)
	  , getPrototypeOf = __webpack_require__(59)
	  , ITERATOR       = __webpack_require__(25)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(46)
	  , descriptor     = __webpack_require__(17)
	  , setToStringTag = __webpack_require__(24)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(25)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $at     = __webpack_require__(127)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(8)
	  , toLength  = __webpack_require__(37)
	  , context   = __webpack_require__(133)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(135)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(134)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(13)
	  , cof      = __webpack_require__(34)
	  , MATCH    = __webpack_require__(25)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(25)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(8)
	  , context  = __webpack_require__(133)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(135)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(91)
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(8)
	  , toLength    = __webpack_require__(37)
	  , context     = __webpack_require__(133)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(135)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(140)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	  , fails   = __webpack_require__(7)
	  , defined = __webpack_require__(35)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	__webpack_require__(140)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(140)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(140)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(140)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(140)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(140)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(140)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(140)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	__webpack_require__(140)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(140)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(140)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(140)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export     = __webpack_require__(8)
	  , toObject    = __webpack_require__(58)
	  , toPrimitive = __webpack_require__(16);
	
	$export($export.P + $export.F * __webpack_require__(7)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(8)
	  , fails   = __webpack_require__(7)
	  , getTime = Date.prototype.getTime;
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING]
	  , getTime      = DateProto.getTime;
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(18)(DateProto, TO_STRING, function toString(){
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var TO_PRIMITIVE = __webpack_require__(25)('toPrimitive')
	  , proto        = Date.prototype;
	
	if(!(TO_PRIMITIVE in proto))__webpack_require__(10)(proto, TO_PRIMITIVE, __webpack_require__(158));

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var anObject    = __webpack_require__(12)
	  , toPrimitive = __webpack_require__(16)
	  , NUMBER      = 'number';
	
	module.exports = function(hint){
	  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Array', {isArray: __webpack_require__(45)});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(20)
	  , $export        = __webpack_require__(8)
	  , toObject       = __webpack_require__(58)
	  , call           = __webpack_require__(161)
	  , isArrayIter    = __webpack_require__(162)
	  , toLength       = __webpack_require__(37)
	  , createProperty = __webpack_require__(163)
	  , getIterFn      = __webpack_require__(164);
	
	$export($export.S + $export.F * !__webpack_require__(165)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(129)
	  , ITERATOR   = __webpack_require__(25)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(17);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(75)
	  , ITERATOR  = __webpack_require__(25)('iterator')
	  , Iterators = __webpack_require__(129);
	module.exports = __webpack_require__(9).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(25)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export        = __webpack_require__(8)
	  , createProperty = __webpack_require__(163);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = __webpack_require__(8)
	  , toIObject = __webpack_require__(32)
	  , arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(33) != Object || !__webpack_require__(168)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(7);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export    = __webpack_require__(8)
	  , html       = __webpack_require__(48)
	  , cof        = __webpack_require__(34)
	  , toIndex    = __webpack_require__(39)
	  , toLength   = __webpack_require__(37)
	  , arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(7)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(8)
	  , aFunction = __webpack_require__(21)
	  , toObject  = __webpack_require__(58)
	  , fails     = __webpack_require__(7)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(168)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(8)
	  , $forEach = __webpack_require__(172)(0)
	  , STRICT   = __webpack_require__(168)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(20)
	  , IObject  = __webpack_require__(33)
	  , toObject = __webpack_require__(58)
	  , toLength = __webpack_require__(37)
	  , asc      = __webpack_require__(173);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(174);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , isArray  = __webpack_require__(45)
	  , SPECIES  = __webpack_require__(25)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $map    = __webpack_require__(172)(1);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $filter = __webpack_require__(172)(2);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $some   = __webpack_require__(172)(3);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $every  = __webpack_require__(172)(4);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $reduce = __webpack_require__(180);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(21)
	  , toObject  = __webpack_require__(58)
	  , IObject   = __webpack_require__(33)
	  , toLength  = __webpack_require__(37);
	
	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(8)
	  , $reduce = __webpack_require__(180);
	
	$export($export.P + $export.F * !__webpack_require__(168)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(8)
	  , $indexOf      = __webpack_require__(36)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(168)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(8)
	  , toIObject     = __webpack_require__(32)
	  , toInteger     = __webpack_require__(38)
	  , toLength      = __webpack_require__(37)
	  , $native       = [].lastIndexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(168)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    // convert -0 to +0
	    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
	    return -1;
	  }
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(185)});
	
	__webpack_require__(186)('copyWithin');

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(58)
	  , toIndex  = __webpack_require__(39)
	  , toLength = __webpack_require__(37);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(25)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(10)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(8);
	
	$export($export.P, 'Array', {fill: __webpack_require__(188)});
	
	__webpack_require__(186)('fill');

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(58)
	  , toIndex  = __webpack_require__(39)
	  , toLength = __webpack_require__(37);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(8)
	  , $find   = __webpack_require__(172)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(186)(KEY);

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(8)
	  , $find   = __webpack_require__(172)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(186)(KEY);

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(192)('Array');

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(4)
	  , dP          = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(6)
	  , SPECIES     = __webpack_require__(25)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(186)
	  , step             = __webpack_require__(194)
	  , Iterators        = __webpack_require__(129)
	  , toIObject        = __webpack_require__(32);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(128)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 194 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var global            = __webpack_require__(4)
	  , inheritIfRequired = __webpack_require__(88)
	  , dP                = __webpack_require__(11).f
	  , gOPN              = __webpack_require__(50).f
	  , isRegExp          = __webpack_require__(134)
	  , $flags            = __webpack_require__(196)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(7)(function(){
	  re2[__webpack_require__(25)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(18)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(192)('RegExp');

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(12);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(198);
	var anObject    = __webpack_require__(12)
	  , $flags      = __webpack_require__(196)
	  , DESCRIPTORS = __webpack_require__(6)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];
	
	var define = function(fn){
	  __webpack_require__(18)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if(__webpack_require__(7)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(6) && /./g.flags != 'g')__webpack_require__(11).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(196)
	});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(200)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(10)
	  , redefine = __webpack_require__(18)
	  , fails    = __webpack_require__(7)
	  , defined  = __webpack_require__(35)
	  , wks      = __webpack_require__(25);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(200)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(200)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(200)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(134)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(28)
	  , global             = __webpack_require__(4)
	  , ctx                = __webpack_require__(20)
	  , classof            = __webpack_require__(75)
	  , $export            = __webpack_require__(8)
	  , isObject           = __webpack_require__(13)
	  , aFunction          = __webpack_require__(21)
	  , anInstance         = __webpack_require__(205)
	  , forOf              = __webpack_require__(206)
	  , speciesConstructor = __webpack_require__(207)
	  , task               = __webpack_require__(208).set
	  , microtask          = __webpack_require__(209)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(25)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(210)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(24)($Promise, PROMISE);
	__webpack_require__(192)(PROMISE);
	Wrapper = __webpack_require__(9)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(165)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 205 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(20)
	  , call        = __webpack_require__(161)
	  , isArrayIter = __webpack_require__(162)
	  , anObject    = __webpack_require__(12)
	  , toLength    = __webpack_require__(37)
	  , getIterFn   = __webpack_require__(164)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(12)
	  , aFunction = __webpack_require__(21)
	  , SPECIES   = __webpack_require__(25)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(20)
	  , invoke             = __webpack_require__(78)
	  , html               = __webpack_require__(48)
	  , cel                = __webpack_require__(15)
	  , global             = __webpack_require__(4)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(34)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , macrotask = __webpack_require__(208).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(34)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(18);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(212);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(213)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(11).f
	  , create      = __webpack_require__(46)
	  , redefineAll = __webpack_require__(210)
	  , ctx         = __webpack_require__(20)
	  , anInstance  = __webpack_require__(205)
	  , defined     = __webpack_require__(35)
	  , forOf       = __webpack_require__(206)
	  , $iterDefine = __webpack_require__(128)
	  , step        = __webpack_require__(194)
	  , setSpecies  = __webpack_require__(192)
	  , DESCRIPTORS = __webpack_require__(6)
	  , fastKey     = __webpack_require__(22).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(4)
	  , $export           = __webpack_require__(8)
	  , redefine          = __webpack_require__(18)
	  , redefineAll       = __webpack_require__(210)
	  , meta              = __webpack_require__(22)
	  , forOf             = __webpack_require__(206)
	  , anInstance        = __webpack_require__(205)
	  , isObject          = __webpack_require__(13)
	  , fails             = __webpack_require__(7)
	  , $iterDetect       = __webpack_require__(165)
	  , setToStringTag    = __webpack_require__(24)
	  , inheritIfRequired = __webpack_require__(88);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(212);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(213)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(172)(0)
	  , redefine     = __webpack_require__(18)
	  , meta         = __webpack_require__(22)
	  , assign       = __webpack_require__(69)
	  , weak         = __webpack_require__(216)
	  , isObject     = __webpack_require__(13)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(213)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(210)
	  , getWeak           = __webpack_require__(22).getWeak
	  , anObject          = __webpack_require__(12)
	  , isObject          = __webpack_require__(13)
	  , anInstance        = __webpack_require__(205)
	  , forOf             = __webpack_require__(206)
	  , createArrayMethod = __webpack_require__(172)
	  , $has              = __webpack_require__(5)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(216);
	
	// 23.4 WeakSet Objects
	__webpack_require__(213)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(8)
	  , $typed       = __webpack_require__(219)
	  , buffer       = __webpack_require__(220)
	  , anObject     = __webpack_require__(12)
	  , toIndex      = __webpack_require__(39)
	  , toLength     = __webpack_require__(37)
	  , isObject     = __webpack_require__(13)
	  , ArrayBuffer  = __webpack_require__(4).ArrayBuffer
	  , speciesConstructor = __webpack_require__(207)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(7)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});
	
	__webpack_require__(192)(ARRAY_BUFFER);

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , hide   = __webpack_require__(10)
	  , uid    = __webpack_require__(19)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;
	
	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(4)
	  , DESCRIPTORS    = __webpack_require__(6)
	  , LIBRARY        = __webpack_require__(28)
	  , $typed         = __webpack_require__(219)
	  , hide           = __webpack_require__(10)
	  , redefineAll    = __webpack_require__(210)
	  , fails          = __webpack_require__(7)
	  , anInstance     = __webpack_require__(205)
	  , toInteger      = __webpack_require__(38)
	  , toLength       = __webpack_require__(37)
	  , gOPN           = __webpack_require__(50).f
	  , dP             = __webpack_require__(11).f
	  , arrayFill      = __webpack_require__(188)
	  , setToStringTag = __webpack_require__(24)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};
	
	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};
	
	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8);
	$export($export.G + $export.W + $export.F * !__webpack_require__(219).ABV, {
	  DataView: __webpack_require__(220).DataView
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(6)){
	  var LIBRARY             = __webpack_require__(28)
	    , global              = __webpack_require__(4)
	    , fails               = __webpack_require__(7)
	    , $export             = __webpack_require__(8)
	    , $typed              = __webpack_require__(219)
	    , $buffer             = __webpack_require__(220)
	    , ctx                 = __webpack_require__(20)
	    , anInstance          = __webpack_require__(205)
	    , propertyDesc        = __webpack_require__(17)
	    , hide                = __webpack_require__(10)
	    , redefineAll         = __webpack_require__(210)
	    , toInteger           = __webpack_require__(38)
	    , toLength            = __webpack_require__(37)
	    , toIndex             = __webpack_require__(39)
	    , toPrimitive         = __webpack_require__(16)
	    , has                 = __webpack_require__(5)
	    , same                = __webpack_require__(71)
	    , classof             = __webpack_require__(75)
	    , isObject            = __webpack_require__(13)
	    , toObject            = __webpack_require__(58)
	    , isArrayIter         = __webpack_require__(162)
	    , create              = __webpack_require__(46)
	    , getPrototypeOf      = __webpack_require__(59)
	    , gOPN                = __webpack_require__(50).f
	    , getIterFn           = __webpack_require__(164)
	    , uid                 = __webpack_require__(19)
	    , wks                 = __webpack_require__(25)
	    , createArrayMethod   = __webpack_require__(172)
	    , createArrayIncludes = __webpack_require__(36)
	    , speciesConstructor  = __webpack_require__(207)
	    , ArrayIterators      = __webpack_require__(193)
	    , Iterators           = __webpack_require__(129)
	    , $iterDetect         = __webpack_require__(165)
	    , setSpecies          = __webpack_require__(192)
	    , arrayFill           = __webpack_require__(188)
	    , arrayCopyWithin     = __webpack_require__(185)
	    , $DP                 = __webpack_require__(11)
	    , $GOPD               = __webpack_require__(51)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };
	
	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };
	
	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });
	
	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };
	
	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	
	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };
	
	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });
	
	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });
	
	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    setSpecies(NAME);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
	
	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});
	
	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(223)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(8)
	  , aFunction = __webpack_require__(21)
	  , anObject  = __webpack_require__(12)
	  , rApply    = (__webpack_require__(4).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(7)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export    = __webpack_require__(8)
	  , create     = __webpack_require__(46)
	  , aFunction  = __webpack_require__(21)
	  , anObject   = __webpack_require__(12)
	  , isObject   = __webpack_require__(13)
	  , fails      = __webpack_require__(7)
	  , bind       = __webpack_require__(77)
	  , rConstruct = (__webpack_require__(4).Reflect || {}).construct;
	
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function(){
	  function F(){}
	  return !(rConstruct(function(){}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function(){
	  rConstruct(function(){});
	});
	
	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(11)
	  , $export     = __webpack_require__(8)
	  , anObject    = __webpack_require__(12)
	  , toPrimitive = __webpack_require__(16);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(8)
	  , gOPD     = __webpack_require__(51).f
	  , anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(8)
	  , anObject = __webpack_require__(12);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(130)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(59)
	  , has            = __webpack_require__(5)
	  , $export        = __webpack_require__(8)
	  , isObject       = __webpack_require__(13)
	  , anObject       = __webpack_require__(12);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(51)
	  , $export  = __webpack_require__(8)
	  , anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(8)
	  , getProto = __webpack_require__(59)
	  , anObject = __webpack_require__(12);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(8)
	  , anObject      = __webpack_require__(12)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(243)});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(50)
	  , gOPS     = __webpack_require__(43)
	  , anObject = __webpack_require__(12)
	  , Reflect  = __webpack_require__(4).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(8)
	  , anObject           = __webpack_require__(12)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(11)
	  , gOPD           = __webpack_require__(51)
	  , getPrototypeOf = __webpack_require__(59)
	  , has            = __webpack_require__(5)
	  , $export        = __webpack_require__(8)
	  , createDesc     = __webpack_require__(17)
	  , anObject       = __webpack_require__(12)
	  , isObject       = __webpack_require__(13);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(8)
	  , setProto = __webpack_require__(73);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(8)
	  , $includes = __webpack_require__(36)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(186)('includes');

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(8)
	  , $at     = __webpack_require__(127)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(8)
	  , $pad    = __webpack_require__(250);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(37)
	  , repeat   = __webpack_require__(91)
	  , defined  = __webpack_require__(35);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength || fillStr == '')return S;
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(8)
	  , $pad    = __webpack_require__(250);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(83)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(83)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	var $export     = __webpack_require__(8)
	  , defined     = __webpack_require__(35)
	  , toLength    = __webpack_require__(37)
	  , isRegExp    = __webpack_require__(134)
	  , getFlags    = __webpack_require__(196)
	  , RegExpProto = RegExp.prototype;
	
	var $RegExpStringIterator = function(regexp, string){
	  this._r = regexp;
	  this._s = string;
	};
	
	__webpack_require__(130)($RegExpStringIterator, 'RegExp String', function next(){
	  var match = this._r.exec(this._s);
	  return {value: match, done: match === null};
	});
	
	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp){
	    defined(this);
	    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
	    var S     = String(this)
	      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
	      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27)('asyncIterator');

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27)('observable');

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = __webpack_require__(8)
	  , ownKeys        = __webpack_require__(243)
	  , toIObject      = __webpack_require__(32)
	  , gOPD           = __webpack_require__(51)
	  , createProperty = __webpack_require__(163);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(8)
	  , $values = __webpack_require__(259)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(30)
	  , toIObject = __webpack_require__(32)
	  , isEnum    = __webpack_require__(44).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(8)
	  , $entries = __webpack_require__(259)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(8)
	  , toObject        = __webpack_require__(58)
	  , aFunction       = __webpack_require__(21)
	  , $defineProperty = __webpack_require__(11);
	
	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter){
	    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(28)|| !__webpack_require__(7)(function(){
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function(){ /* empty */});
	  delete __webpack_require__(4)[K];
	});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(8)
	  , toObject        = __webpack_require__(58)
	  , aFunction       = __webpack_require__(21)
	  , $defineProperty = __webpack_require__(11);
	
	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter){
	    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(8)
	  , toObject                 = __webpack_require__(58)
	  , toPrimitive              = __webpack_require__(16)
	  , getPrototypeOf           = __webpack_require__(59)
	  , getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.get;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(8)
	  , toObject                 = __webpack_require__(58)
	  , toPrimitive              = __webpack_require__(16)
	  , getPrototypeOf           = __webpack_require__(59)
	  , getOwnPropertyDescriptor = __webpack_require__(51).f;
	
	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(6) && $export($export.P + __webpack_require__(262), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.set;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(8);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(267)('Map')});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(75)
	  , from    = __webpack_require__(268);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(206);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(8);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(267)('Set')});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(8);
	
	$export($export.S, 'System', {global: __webpack_require__(4)});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(8)
	  , cof     = __webpack_require__(34);
	
	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(8);
	
	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(277)
	  , anObject                  = __webpack_require__(12)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(211)
	  , $export = __webpack_require__(8)
	  , shared  = __webpack_require__(23)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(215)));
	
	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;
	
	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , getPrototypeOf         = __webpack_require__(59)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(214)
	  , from                    = __webpack_require__(268)
	  , metadata                = __webpack_require__(277)
	  , anObject                = __webpack_require__(12)
	  , getPrototypeOf          = __webpack_require__(59)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(277)
	  , anObject                = __webpack_require__(12)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , getPrototypeOf         = __webpack_require__(59)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(277)
	  , anObject               = __webpack_require__(12)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(277)
	  , anObject                  = __webpack_require__(12)
	  , aFunction                 = __webpack_require__(21)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export   = __webpack_require__(8)
	  , microtask = __webpack_require__(209)()
	  , process   = __webpack_require__(4).process
	  , isNode    = __webpack_require__(34)(process) == 'process';
	
	$export($export.G, {
	  asap: function asap(fn){
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/zenparsing/es-observable
	var $export     = __webpack_require__(8)
	  , global      = __webpack_require__(4)
	  , core        = __webpack_require__(9)
	  , microtask   = __webpack_require__(209)()
	  , OBSERVABLE  = __webpack_require__(25)('observable')
	  , aFunction   = __webpack_require__(21)
	  , anObject    = __webpack_require__(12)
	  , anInstance  = __webpack_require__(205)
	  , redefineAll = __webpack_require__(210)
	  , hide        = __webpack_require__(10)
	  , forOf       = __webpack_require__(206)
	  , RETURN      = forOf.RETURN;
	
	var getMethod = function(fn){
	  return fn == null ? undefined : aFunction(fn);
	};
	
	var cleanupSubscription = function(subscription){
	  var cleanup = subscription._c;
	  if(cleanup){
	    subscription._c = undefined;
	    cleanup();
	  }
	};
	
	var subscriptionClosed = function(subscription){
	  return subscription._o === undefined;
	};
	
	var closeSubscription = function(subscription){
	  if(!subscriptionClosed(subscription)){
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};
	
	var Subscription = function(observer, subscriber){
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup      = subscriber(observer)
	      , subscription = cleanup;
	    if(cleanup != null){
	      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
	      else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch(e){
	    observer.error(e);
	    return;
	  } if(subscriptionClosed(this))cleanupSubscription(this);
	};
	
	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe(){ closeSubscription(this); }
	});
	
	var SubscriptionObserver = function(subscription){
	  this._s = subscription;
	};
	
	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if(m)return m.call(observer, value);
	      } catch(e){
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value){
	    var subscription = this._s;
	    if(subscriptionClosed(subscription))throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if(!m)throw value;
	      value = m.call(observer, value);
	    } catch(e){
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch(e){
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});
	
	var $Observable = function Observable(subscriber){
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};
	
	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer){
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn){
	    var that = this;
	    return new (core.Promise || global.Promise)(function(resolve, reject){
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next : function(value){
	          try {
	            return fn(value);
	          } catch(e){
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});
	
	redefineAll($Observable, {
	  from: function from(x){
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if(method){
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function(observer){
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          try {
	            if(forOf(x, false, function(it){
	              observer.next(it);
	              if(done)return RETURN;
	            }) === RETURN)return;
	          } catch(e){
	            if(done)throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  },
	  of: function of(){
	    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          for(var i = 0; i < items.length; ++i){
	            observer.next(items[i]);
	            if(done)return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  }
	});
	
	hide($Observable.prototype, OBSERVABLE, function(){ return this; });
	
	$export($export.G, {Observable: $Observable});
	
	__webpack_require__(192)('Observable');

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(4)
	  , $export    = __webpack_require__(8)
	  , invoke     = __webpack_require__(78)
	  , partial    = __webpack_require__(289)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(290)
	  , invoke    = __webpack_require__(78)
	  , aFunction = __webpack_require__(21);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(8)
	  , $task   = __webpack_require__(208);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(193)
	  , redefine      = __webpack_require__(18)
	  , global        = __webpack_require__(4)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(129)
	  , wks           = __webpack_require__(25)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(294)))

/***/ },
/* 294 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(296);
	module.exports = __webpack_require__(9).RegExp.escape;

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(8)
	  , $re     = __webpack_require__(297)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 297 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// This gets replaced by karma webpack with the updated files on rebuild
	var __karmaWebpackManifest__ = [];
	
	// require all modules from the
	// current directory and all subdirectories
	var testsContext = __webpack_require__(299);
	
	function inManifest(path) {
	    return __karmaWebpackManifest__.indexOf(path) >= 0;
	}
	
	var runnable = testsContext.keys().filter(inManifest);
	
	// Run all tests if we didn't find any changes
	if (!runnable.length) {
	    runnable = testsContext.keys();
	}
	
	runnable.forEach(testsContext);
	
	var componentsContext = __webpack_require__(492);
	componentsContext.keys().forEach(componentsContext);

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bindings/binders_spec.js": 300,
		"./bindings/bindings_parser_spec.js": 364,
		"./bindings/bindings_spec.js": 376,
		"./bindings/default_binders_spec.js": 383,
		"./calc_spec.js": 384,
		"./class_spec.js": 385,
		"./events/asterisk_spec.js": 387,
		"./events/delegated_spec.js": 456,
		"./events/events_change_spec.js": 457,
		"./events/events_core_spec.js": 458,
		"./events/events_dom_spec.js": 459,
		"./events/events_summary_spec.js": 461,
		"./events/tree_change_spec.js": 462,
		"./instantiate_spec.js": 463,
		"./matreshka_array/common_spec.js": 464,
		"./matreshka_array/iterator_spec.js": 466,
		"./matreshka_array/mediate_item_spec.js": 467,
		"./matreshka_array/model_spec.js": 468,
		"./matreshka_array/native_methods_spec.js": 469,
		"./matreshka_array/native_modifying_methods_spec.js": 470,
		"./matreshka_array/orderby_spec.js": 471,
		"./matreshka_array/pull_spec.js": 472,
		"./matreshka_array/recreate_spec.js": 473,
		"./matreshka_array/renderer_spec.js": 474,
		"./matreshka_array/static_methods_spec.js": 475,
		"./matreshka_array/tojson_spec.js": 476,
		"./matreshka_object/common_spec.js": 477,
		"./matreshka_object/datakeys_spec.js": 478,
		"./matreshka_object/each_spec.js": 479,
		"./matreshka_object/iterator_spec.js": 480,
		"./matreshka_object/tojson_spec.js": 481,
		"./matreshka_spec.js": 482,
		"./mediate_spec.js": 483,
		"./mq/add_spec.js": 484,
		"./mq/events_spec.js": 485,
		"./mq/init_spec.js": 486,
		"./mq/parsehtml_spec.js": 487,
		"./remove_spec.js": 488,
		"./set_spec.js": 489,
		"./tomatreshka_spec.js": 490,
		"./usedomlibrary_spec.js": 491
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
	webpackContext.id = 299;


/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _srcBinders = __webpack_require__(301);
	
	var html = _srcBinders.html;
	var text = _srcBinders.text;
	var prop = _srcBinders.prop;
	var attr = _srcBinders.attr;
	var className = _srcBinders.className;
	var dataset = _srcBinders.dataset;
	var style = _srcBinders.style;
	var display = _srcBinders.display;
	
	var bindNode = __webpack_require__(316);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Binders', function () {
	    var noDebounceFlag = {
	        debounceSetValue: false,
	        debounceGetValue: false
	    };
	
	    var obj = void 0;
	    var node = void 0;
	
	    beforeEach(function () {
	        obj = {};
	        node = window.document.createElement('div');
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
	
	    it('should bind dataset', function () {
	        // @IE9
	        node.setAttribute('data-foo', 'bar');
	        bindNode(obj, 'x', node, dataset('foo'), noDebounceFlag);
	        expect(obj.x).toEqual('bar');
	        obj.x = 'baz';
	        expect(node.getAttribute('data-foo')).toEqual('baz');
	    });
	});

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html = __webpack_require__(302);
	
	var display = __webpack_require__(303);
	
	var className = __webpack_require__(304);
	
	var prop = __webpack_require__(306);
	
	var attr = __webpack_require__(307);
	
	var input = __webpack_require__(308);
	
	var output = __webpack_require__(309);
	
	var textarea = __webpack_require__(310);
	
	var select = __webpack_require__(311);
	
	var progress = __webpack_require__(312);
	
	var text = __webpack_require__(313);
	
	var style = __webpack_require__(314);
	
	var dataset = __webpack_require__(315);
	
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
/* 302 */
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
/* 303 */
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
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classlistJs = __webpack_require__(305);
	
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
/* 305 */
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
/* 306 */
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
/* 307 */
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
/* 308 */
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
/* 309 */
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
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(308);
	
	// returns a binder for textarea element
	module.exports = textarea;
	function textarea() {
	    // textarea behaves just like text input
	    return input('text');
	}

/***/ },
/* 311 */
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
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(308);
	
	// returns a binder for textarea element
	module.exports = progress;
	function progress() {
	    return input();
	}

/***/ },
/* 313 */
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
/* 314 */
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
/* 315 */
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
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var defineProp = __webpack_require__(319);
	
	var getNodes = __webpack_require__(326);
	
	var createBindingSwitcher = __webpack_require__(340);
	
	var bindSingleNode = __webpack_require__(348);
	
	var checkObjectType = __webpack_require__(323);
	
	var matreshkaError = __webpack_require__(324);
	
	var addTreeListener = __webpack_require__(357);
	
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
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
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
/* 318 */
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
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var set = __webpack_require__(320);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var triggerOne = __webpack_require__(321);
	
	var checkObjectType = __webpack_require__(323);
	
	var is = __webpack_require__(325);
	
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
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var apply = __webpack_require__(322);
	
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
/* 322 */
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
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 324 */
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
/* 325 */
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
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var selectNodes = __webpack_require__(327);
	
	var dom = __webpack_require__(329);
	
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
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var toArray = __webpack_require__(328);
	
	var dom = __webpack_require__(329);
	
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
/* 328 */
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
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(330);
	
	module.exports = { $: $ };

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mq = __webpack_require__(331);
	
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
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(332);
	
	var parseHTML = __webpack_require__(334);
	
	var on = __webpack_require__(335);
	
	var off = __webpack_require__(337);
	
	var add = __webpack_require__(338);
	
	var assign = __webpack_require__(339);
	
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
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(333);
	
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
/* 333 */
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
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var html2nodeList = __webpack_require__(333);
	
	var Init = __webpack_require__(332);
	
	// parses given HTML and returns mq instance
	module.exports = parseHTML;
	function parseHTML(html) {
	    return new Init(html2nodeList(html));
	}

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(336);
	
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
/* 336 */
/***/ function(module, exports) {

	"use strict";
	
	// an object allows to share data between modules; it's needed because we use
	// simplified ES modules there and cannot import and share a number
	module.exports = {
	    nodeIndex: 0,
	    allEvents: {}
	};

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var data = __webpack_require__(336);
	
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
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Init = __webpack_require__(332);
	
	var data = __webpack_require__(336);
	
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
/* 339 */
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
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var unbindNode = __webpack_require__(341);
	
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
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(323);
	
	var defs = __webpack_require__(318);
	
	var getNodes = __webpack_require__(326);
	
	var removeTreeListener = __webpack_require__(342);
	
	var removeBinding = __webpack_require__(347);
	
	var dom = __webpack_require__(329);
	
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
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var undelegateListener = __webpack_require__(343);
	
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
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var removeListener = __webpack_require__(344);
	
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
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var triggerOne = __webpack_require__(321);
	
	var domEventReg = __webpack_require__(345);
	
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
	
	        var removeDomListener = __webpack_require__(346);
	
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
/* 345 */
/***/ function(module, exports) {

	"use strict";
	
	// the regexp allows to parse things like "click::x(.y)"
	// it's shared between few modules
	module.exports = /([^::]+)::([^\(\)]+)?(?:\((.*)\))?/;

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var removeListener = __webpack_require__(344);
	
	var dom = __webpack_require__(329);
	
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
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var removeListener = __webpack_require__(344);
	
	var triggerOne = __webpack_require__(321);
	
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
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var lookForBinder = __webpack_require__(349);
	
	var createNodeHandler = __webpack_require__(351);
	
	var createObjectHandler = __webpack_require__(352);
	
	var triggerOne = __webpack_require__(321);
	
	var addListener = __webpack_require__(353);
	
	var debounce = __webpack_require__(356);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(350);
	
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
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var input = __webpack_require__(308);
	
	var textarea = __webpack_require__(310);
	
	var select = __webpack_require__(311);
	
	var progress = __webpack_require__(312);
	
	var output = __webpack_require__(309);
	
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
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(325);
	
	var set = __webpack_require__(320);
	
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
/* 352 */
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
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var triggerOne = __webpack_require__(321);
	
	var defineProp = __webpack_require__(319);
	
	var domEventReg = __webpack_require__(345);
	
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
	
	            var addDomListener = __webpack_require__(354);
	
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
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var defineProp = __webpack_require__(319);
	
	var addListener = __webpack_require__(353);
	
	var dom = __webpack_require__(329);
	
	var createDomEventHandler = __webpack_require__(355);
	
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
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var apply = __webpack_require__(322);
	
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
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var apply = __webpack_require__(322);
	
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
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(358);
	
	var removeTreeListener = __webpack_require__(342);
	
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
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(353);
	
	var defs = __webpack_require__(318);
	
	var arrayAddHandler = __webpack_require__(359);
	
	var objectSetHandler = __webpack_require__(360);
	
	var arrayRemoveHandler = __webpack_require__(361);
	
	var objectRemoveHandler = __webpack_require__(362);
	
	var changeHandler = __webpack_require__(363);
	
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
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var triggerOne = __webpack_require__(321);
	
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
	            var delegateListener = __webpack_require__(358); // fixing circular ref
	
	            delegateListener(item, path, name, callback, context, info);
	        }
	    }
	}

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var triggerOne = __webpack_require__(321);
	
	var defs = __webpack_require__(318);
	
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
	                var delegateListener = __webpack_require__(358); // fixing circular ref
	
	                delegateListener(item, path, name, callback, context, info);
	            }
	        }
	    }
	}

/***/ },
/* 361 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var undelegateListener = __webpack_require__(343);
	
	var triggerOne = __webpack_require__(321);
	
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
/* 362 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var undelegateListener = __webpack_require__(343);
	
	var triggerOne = __webpack_require__(321);
	
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
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var undelegateListener = __webpack_require__(343);
	
	var triggerOne = __webpack_require__(321);
	
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
	        var delegateListener = __webpack_require__(358); // fixing circular ref
	
	        delegateListener(value, path, name, callback, context, info);
	    }
	
	    if (previousValue && typeof previousValue === 'object') {
	        undelegateListener(previousValue, path, name, callback, context, info);
	    }
	}

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var parseBindings = __webpack_require__(365);
	
	var bindNode = __webpack_require__(316);
	
	var parserBrackets = __webpack_require__(371);
	
	var noDebounceFlag = {
	    debounceSetValue: false,
	    debounceGetValue: false
	}; /* eslint-disable import/no-extraneous-dependencies, max-lines */
	
	
	function parse(html) {
	    var node = window.document.createElement('div');
	    node.innerHTML = html;
	    return node.children[0];
	}
	
	describe('Bindings parser', function () {
	    it('should parse inner content', function () {
	        var node = parse('<span>{{x}}</span>');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        expect(node.textContent).toEqual(obj.x);
	    });
	
	    it('should parse inner content and keep node empty if property value is not given', function () {
	        var node = parse('<span>{{x}}</span>');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        expect(node.textContent).toEqual('');
	    });
	
	    it('should bind complex inner content', function () {
	        var node = parse('<span>{{x}} {{y}}</span>');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        obj.y = 'bar';
	        expect(node.textContent).toEqual(obj.x + ' ' + obj.y);
	    });
	
	    it('should bind attributes', function () {
	        var node = parse('<a href="{{x}}"></a>');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'bar';
	        expect(node.getAttribute('href')).toEqual(obj.x);
	    });
	
	    it('should bind complex attributes', function () {
	        var node = parse('<a href="{{x}}/{{y}}"></a>');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        obj.y = 'bar';
	        expect(node.getAttribute('href')).toEqual(obj.x + '/' + obj.y);
	    });
	
	    it('should bind inner content in context of an object which has isMatreshka=true property', function () {
	        var node = parse('<span>{{x}}</span>');
	        var obj = { isMatreshka: true, nodes: {}, $nodes: {} };
	
	        parseBindings.call(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        expect(node.textContent).toEqual(obj.x);
	    });
	
	    it('should bind input value', function () {
	        var node = parse('<input value="{{x}}">');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        expect(node.value).toEqual(obj.x);
	    });
	
	    it('should bind complex input value', function () {
	        var node = parse('<input value="{{x}} {{y}}">');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        obj.x = 'bar';
	        expect(node.value).toEqual(obj.x + ' ' + obj.y);
	    });
	
	    it('should bind input=checkbox checked', function () {
	        var node = parse('<input type="checkbox" checked="{{x}}">');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = true;
	        expect(node.checked).toEqual(obj.x);
	    });
	
	    it('should bind textarea value', function () {
	        var node = parse('<textarea value="{{x}}"></textarea>');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        expect(node.value).toEqual(obj.x);
	    });
	
	    it('shouldnt create additional properties\n        (complex node values require to create hidden computable property)', function () {
	        var node = parse('<input value="{{x}} and {{y}}">');
	        var obj = {};
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        obj.y = 'bar';
	        expect(node.value).toEqual(obj.x + ' and ' + obj.y);
	        expect(Object.keys(obj)).toEqual(['x', 'y']);
	    });
	
	    it('should bind nested nodes', function () {
	        var node = parse('\n            <div>{{x}}\n                <input value="{{y}}">\n                <span>\n                    <span>\n                        <span data-qux="hey {{z}}"></span>\n                    </span>\n                </span>\n            </div>\n        ');
	        var obj = {};
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        obj.y = 'bar';
	        obj.z = 'baz';
	
	        expect(node.innerHTML.indexOf(obj.x)).toEqual(0);
	
	        expect(node.querySelector('input').value).toEqual(obj.y);
	
	        expect(node.querySelector('[data-qux]').getAttribute('data-qux')).toEqual('hey ' + obj.z);
	
	        expect(Object.keys(obj).sort()).toEqual(['x', 'y', 'z']);
	    });
	
	    it('should bind nested nodes and nested properties', function () {
	        var node = parse('\n            <div>{{a.b}}\n                <input value="{{c.d}}">\n                <span>\n                    <span>\n                        <span data-qux="hey {{e.f}}"></span>\n                    </span>\n                </span>\n            </div>\n        ');
	
	        var obj = {
	            a: { b: 1 },
	            c: { d: 2 },
	            e: { f: 2 }
	        };
	
	        parseBindings(obj, node, noDebounceFlag);
	
	        obj.a.b = 'foo';
	        obj.c.d = 'bar';
	        obj.e.f = 'baz';
	
	        expect(node.innerHTML.indexOf(obj.a.b)).toEqual(0);
	
	        expect(node.querySelector('input').value).toEqual(obj.c.d);
	
	        expect(node.querySelector('[data-qux]').getAttribute('data-qux')).toEqual('hey ' + obj.e.f);
	    });
	
	    it('works when brackets are redefined', function () {
	        var node = parse('<input value="[[x]] bar">');
	        var obj = {};
	
	        parserBrackets.left = '[[';
	        parserBrackets.right = ']]';
	
	        parseBindings(obj, node, noDebounceFlag);
	        obj.x = 'foo';
	        expect(node.value).toEqual(obj.x + ' bar');
	
	        parserBrackets.left = '{{';
	        parserBrackets.right = '}}';
	    });
	
	    it('accepts HTML', function () {
	        var obj = {};
	        var result = parseBindings(obj, '<span>{{x}}</span>', noDebounceFlag);
	        obj.x = 'foo';
	
	        expect(result[0].textContent).toEqual(obj.x);
	    });
	
	    it('accepts selector', function () {
	        var obj = {};
	        bindNode(obj, 'y', '<span>{{x}}</span>', noDebounceFlag);
	
	        var result = parseBindings(obj, ':bound(y)', noDebounceFlag);
	
	        obj.x = 'foo';
	
	        expect(result[0].textContent).toEqual(obj.x);
	    });
	});

/***/ },
/* 365 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(323);
	
	var dom = __webpack_require__(329);
	
	var parserData = __webpack_require__(366);
	
	var processTextNode = __webpack_require__(372);
	
	var processAttribute = __webpack_require__(373);
	
	var getNodes = __webpack_require__(326);
	
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
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var calc = __webpack_require__(367);
	
	var parserBrackets = __webpack_require__(371);
	
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
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var checkObjectType = __webpack_require__(323);
	
	var matreshkaError = __webpack_require__(324);
	
	var debounce = __webpack_require__(356);
	
	var addSource = __webpack_require__(368);
	
	var createCalcHandler = __webpack_require__(369);
	
	var defineProp = __webpack_require__(319);
	
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
/* 368 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(353);
	
	var addTreeListener = __webpack_require__(357);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 369 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var set = __webpack_require__(320);
	
	var deepFind = __webpack_require__(370);
	
	var apply = __webpack_require__(322);
	
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
/* 370 */
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
/* 371 */
/***/ function(module, exports) {

	'use strict';
	
	// brackets for bindings parser
	module.exports = {
	    left: '{{',
	    right: '}}'
	};

/***/ },
/* 372 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var parserData = __webpack_require__(366);
	
	var bindNode = __webpack_require__(316);
	
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
/* 373 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getBindingKey = __webpack_require__(374);
	
	var bindNode = __webpack_require__(316);
	
	var lookForBinder = __webpack_require__(349);
	
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
/* 374 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var parserData = __webpack_require__(366);
	
	var defineHiddenContentProperty = __webpack_require__(375);
	
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
/* 375 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var calc = __webpack_require__(367);
	
	var parserData = __webpack_require__(366);
	
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
/* 376 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(316);
	
	var bindOptionalNode = __webpack_require__(377);
	
	var bindSandbox = __webpack_require__(378);
	
	var unbindNode = __webpack_require__(341);
	
	var select = __webpack_require__(379);
	
	var selectAll = __webpack_require__(380);
	
	var addListener = __webpack_require__(353);
	
	var makeObject = __webpack_require__(381);
	
	var createSpy = __webpack_require__(382);
	
	describe('Bindings', function () {
	    var noDebounceFlag = {
	        debounceSetValue: false,
	        debounceGetValue: false
	    };
	
	    var _window = window;
	    var document = _window.document;
	
	
	    var obj = void 0;
	    var node = void 0;
	    var binder = void 0;
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
	            setValue: function (value) {
	                this.value = value;
	            },
	            initialize: function () {
	                this.value = this.value || '';
	                initializeCall();
	            },
	            destroy: function () {
	                destroyCall();
	            }
	        };
	    });
	
	    it('should handle debounceSetValueOnBind=true', function (done) {
	        obj.x = 'foo';
	        bindNode(obj, 'x', node, binder, {
	            debounceSetValueOnBind: true
	        });
	        expect(node.value).toEqual('');
	        setTimeout(function () {
	            expect(node.value).toEqual('foo');
	            done();
	        }, 50);
	    });
	
	    it('should handle debounceGetValueOnBind=true', function (done) {
	        node.value = 'foo';
	        bindNode(obj, 'x', node, binder, {
	            debounceGetValueOnBind: true
	        });
	        expect(obj.x).toEqual(undefined);
	        setTimeout(function () {
	            expect(obj.x).toEqual('foo');
	            done();
	        }, 50);
	    });
	
	    it('should handle debounceSetValue=true (use default value)', function (done) {
	        obj.x = 'foo';
	        bindNode(obj, 'x', node, binder);
	        expect(node.value).toEqual('foo');
	        obj.x = 'bar';
	        expect(node.value).toEqual('foo');
	        setTimeout(function () {
	            expect(node.value).toEqual('bar');
	            done();
	        }, 50);
	    });
	
	    it('should handle debounceGetValue=true (use default value)', function (done) {
	        node.value = 'foo';
	        bindNode(obj, 'x', node, binder);
	        expect(obj.x).toEqual('foo');
	        node.value = 'bar';
	        node.ondummyevent();
	        expect(obj.x).toEqual('foo');
	        setTimeout(function () {
	            expect(obj.x).toEqual('bar');
	            done();
	        }, 50);
	    });
	
	    xit('should bind and use DOM events', function () {});
	
	    xit('handle option setOnBind=true', function () {});
	
	    xit('handle option getOnBind=true', function () {});
	
	    xit('handle option setOnBind=false', function () {});
	
	    xit('handle option getOnBind=false', function () {});
	
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
	
	    it('should bind using key-binding object', function () {
	        bindNode(obj, { x: { node: node, binder: binder } }, null, noDebounceFlag);
	        testSimpleBind();
	    });
	
	    it('should bind using key-bindingsarray object', function () {
	        bindNode(obj, { x: [{ node: node, binder: binder }] }, null, noDebounceFlag);
	        testSimpleBind();
	    });
	
	    it('should bind using key-binding object and use common binder', function () {
	        bindNode(obj, { x: { node: node } }, binder, noDebounceFlag);
	        testSimpleBind();
	    });
	
	    it('should bind using key-bindingsarray object and use common binder', function () {
	        bindNode(obj, { x: [{ node: node }] }, binder, noDebounceFlag);
	        testSimpleBind();
	    });
	
	    it('should not unbind when wrong node is given', function () {
	        var wrongNode = document.createElement('div');
	        bindNode(obj, 'x', node, binder, noDebounceFlag);
	        unbindNode(obj, 'x', wrongNode);
	        testSimpleBind();
	    });
	
	    it('should not unbind when wrong key is given', function () {
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
	
	    it('should unbind using key-node object', function () {
	        bindNode(obj, { x: node }, binder, noDebounceFlag);
	        unbindNode(obj, { x: node });
	        testSimpleUnbind();
	    });
	
	    it('should unbind using key-binding object', function () {
	        bindNode(obj, { x: { node: node, binder: binder } }, null, noDebounceFlag);
	        unbindNode(obj, { x: { node: node, binder: binder } });
	        testSimpleUnbind();
	    });
	
	    it('should unbind using key-bindingsarray object', function () {
	        bindNode(obj, { x: [{ node: node, binder: binder }] }, null, noDebounceFlag);
	        unbindNode(obj, { x: [{ node: node, binder: binder }] });
	        testSimpleUnbind();
	    });
	
	    it('should bind using an array of objects', function () {
	        bindNode(obj, [{ key: 'x', node: node, binder: binder }], noDebounceFlag);
	        testSimpleBind();
	    });
	
	    it('should unbind using an array of objects', function () {
	        bindNode(obj, [{ key: 'x', node: node, binder: binder }], noDebounceFlag);
	        unbindNode(obj, [{ key: 'x', node: node }]);
	        testSimpleUnbind();
	    });
	
	    it('should bind a property in context object which has isMatreshka=true property', function () {
	        obj = {
	            isMatreshka: true,
	            nodes: {},
	            $nodes: {}
	        };
	        bindNode.call(obj, 'x', node, binder, noDebounceFlag);
	        testSimpleBind();
	        expect(obj.nodes.x).toEqual(node);
	        expect(Array.from(obj.$nodes.x)).toEqual([node]);
	    });
	
	    it('should unbind a property in context object which has isMatreshka=true property', function () {
	        obj = {
	            isMatreshka: true,
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
	
	    it('cancels delegated binding when exactKey=true option is passed', function () {
	        bindNode(obj, 'x.y.z', node, binder, Object.assign({
	            exactKey: true
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
	
	    it('throws error when node is not there', function () {
	        expect(function () {
	            bindNode(obj, 'x');
	        }).toThrow();
	    });
	
	    it('does not throw error when node is not there and optional=true is given', function () {
	        expect(function () {
	            bindNode(obj, 'x', undefined, undefined, { optional: true });
	        }).not.toThrow();
	    });
	
	    it('doesn\'t throw error with bindOptionalNode method of Matreshka when node is missing', function () {
	        expect(function () {
	            bindOptionalNode(obj, 'x');
	        }).not.toThrow();
	    });
	
	    it('doesn\'t throw error with bindOptionalNode method of' + ' Matreshka when node is missing (an object is used)', function () {
	        expect(function () {
	            bindOptionalNode(obj, {
	                x: null,
	                y: undefined
	            });
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
	            isMatreshka: true,
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
	            isMatreshka: true,
	            nodes: {},
	            $nodes: {}
	        };
	
	        expect(function () {
	            bindSandbox.call(obj);
	        }).toThrow();
	    });
	
	    it('does not allow to bind more than two nodes to "sandbox"', function () {
	        var obj = {};
	        var node1 = document.createElement('div');
	        var node2 = document.createElement('div');
	
	        bindNode(obj, 'sandbox', node1);
	
	        expect(function () {
	            bindNode(obj, 'sandbox', node2);
	        }).toThrow();
	    });
	
	    it('does not allow to bind more than two nodes to "container"\n        when an object has a property isMatreshkaArray=true', function () {
	        var obj = {
	            isMatreshkaArray: true
	        };
	        var node1 = document.createElement('div');
	        var node2 = document.createElement('div');
	
	        bindNode(obj, 'container', node1);
	
	        expect(function () {
	            bindNode(obj, 'container', node2);
	        }).toThrow();
	    });
	}); /* eslint-disable import/no-extraneous-dependencies, no-shadow, max-lines */

/***/ },
/* 377 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(316);
	
	var apply = __webpack_require__(322);
	
	// TODO: Adds a binding, not throwing an error when a node is missing
	module.exports = bindOptionalNode;
	function bindOptionalNode() {
	    // this hack allows to keep bindOptionalNode as compact as possible
	    // and doesn't require to flip args and support all bindNode variations
	    bindNode.temporaryOptionalFlag = true;
	    return apply(bindNode, this, arguments);
	}

/***/ },
/* 378 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bindNode = __webpack_require__(316);
	
	var unbindNode = __webpack_require__(341);
	
	var checkObjectType = __webpack_require__(323);
	
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
/* 379 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var selectNodes = __webpack_require__(327);
	
	var checkObjectType = __webpack_require__(323);
	
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
/* 380 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var dom = __webpack_require__(329);
	
	var selectNodes = __webpack_require__(327);
	
	var toArray = __webpack_require__(328);
	
	var checkObjectType = __webpack_require__(323);
	
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
/* 381 */
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
/* 382 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = createSpy;
	function createSpy() {
	    var spy = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
	
	    var spyName = 'function';
	    var spyObj = {};
	    spyObj[spyName] = spy;
	    return spyOn(spyObj, spyName).and.callThrough();
	}

/***/ },
/* 383 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _srcBinders = __webpack_require__(301);
	
	var textarea = _srcBinders.textarea;
	var input = _srcBinders.input;
	var select = _srcBinders.select;
	var output = _srcBinders.output;
	var progress = _srcBinders.progress;
	
	var lookForBinder = __webpack_require__(349);
	
	var bindNode = __webpack_require__(316);
	
	describe('Default binders', function () {
	    var noDebounceFlag = {
	        debounceSetValue: false,
	        debounceGetValue: false
	    };
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
	        var node = window.document.createElement('textarea');
	        node.value = 'foo';
	        bindNode(obj, 'x', node, textarea(), noDebounceFlag);
	        expect(obj.x).toEqual('foo');
	        obj.x = 'bar';
	        expect(node.value).toEqual('bar');
	
	        expect(lookForBinder(node)).bindersEqual(textarea());
	    });
	
	    it('should bind progress', function () {
	        var node = window.document.createElement('progress');
	        node.max = 3;
	        node.value = 1;
	        bindNode(obj, 'x', node, progress(), noDebounceFlag);
	        expect(obj.x).toEqual(1);
	        obj.x = 2;
	        expect(node.value).toEqual(2);
	
	        expect(lookForBinder(node)).bindersEqual(progress());
	    });
	
	    it('should bind text input', function () {
	        var node = window.document.createElement('input');
	        node.type = 'text';
	        node.value = 'foo';
	        bindNode(obj, 'x', node, input('text'), noDebounceFlag);
	        expect(obj.x).toEqual('foo');
	        obj.x = 'bar';
	        expect(node.value).toEqual('bar');
	
	        expect(lookForBinder(node)).bindersEqual(input('text'));
	    });
	
	    it('should bind output', function () {
	        var node = window.document.createElement('output');
	        node.innerHTML = 'foo';
	        bindNode(obj, 'x', node, output(), noDebounceFlag);
	        expect(obj.x).toEqual('foo');
	        obj.x = 'bar';
	        expect(node.innerHTML).toEqual('bar');
	        expect(lookForBinder(node)).bindersEqual(output());
	    });
	
	    it('should bind select', function () {
	        var node = window.document.createElement('select');
	        for (var i = 0; i < 10; i++) {
	            var option = node.appendChild(window.document.createElement('option'));
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
	        var node = window.document.createElement('select');
	        node.multiple = true;
	
	        for (var i = 0; i < 10; i++) {
	            var option = node.appendChild(window.document.createElement('option'));
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
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 384 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var calc = __webpack_require__(367);
	
	var addListener = __webpack_require__(353);
	
	var makeObject = __webpack_require__(381);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies, max-lines */
	var noDebounceFlag = { debounceCalc: false };
	
	describe('calc', function () {
	    it('adds simple dependency', function () {
	        var obj = {
	            a: 1,
	            b: 2
	        };
	
	        calc(obj, 'c', ['a', 'b'], function (a, b) {
	            return a + b;
	        }, noDebounceFlag);
	        expect(obj.c).toEqual(3);
	        obj.a = 3;
	        expect(obj.c).toEqual(5);
	        obj.b = 3;
	        expect(obj.c).toEqual(6);
	    });
	
	    it('adds simple dependency in context of an object which includes' + ' isMatreshka=true property', function () {
	        var obj = {
	            isMatreshka: true,
	            a: 1,
	            b: 2
	        };
	
	        calc.call(obj, 'c', ['a', 'b'], function (a, b) {
	            return a + b;
	        }, noDebounceFlag);
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
	        }, noDebounceFlag);
	
	        expect(obj.e).toEqual(15);
	    });
	
	    it('allows to pass an object of calcs', function () {
	        var obj = {
	            a: 1,
	            b: 2,
	            g: 16
	        };
	        var obj2 = {
	            c: 4,
	            d: 8
	        };
	
	        calc(obj, {
	            e: {
	                source: ['a', 'b', {
	                    object: obj2,
	                    key: ['c', 'd']
	                }],
	                handler: function (a, b, c, d) {
	                    return a + b + c + d;
	                }
	            },
	            f: {
	                source: 'g'
	            },
	            g: {
	                source: 'f'
	            }
	        }, noDebounceFlag);
	
	        expect(obj.e).toEqual(15);
	        expect(obj.f).toEqual(16);
	        expect(obj.g).toEqual(16);
	    });
	
	    it('does not set on init via setOnInit=false', function () {
	        var obj = {
	            a: 1,
	            b: 2,
	            c: 0
	        };
	
	        calc(obj, 'c', ['a', 'b'], function (a, b) {
	            return a + b;
	        }, {
	            setOnInit: false,
	            debounceCalc: false
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
	        }, noDebounceFlag);
	        calc(obj, 'b', ['a', 'c'], function (x, y) {
	            return x + y;
	        }, noDebounceFlag);
	        calc(obj, 'c', ['a', 'b'], function (x, y) {
	            return x + y;
	        }, noDebounceFlag);
	
	        expect(obj.a).toEqual(27);
	    });
	
	    xit('throws error when target is not a string', function () {});
	    xit('throws error when source is not an object', function () {});
	    xit('throws error when source key is not a string', function () {});
	    xit('throws error when source object is not an object', function () {});
	
	    it('allows delegated dependencies', function () {
	        var obj = makeObject('a.b.c', 1);
	
	        calc(obj, 'd', 'a.b.c', function (c) {
	            return c;
	        }, noDebounceFlag);
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
	
	    it('allows delegated dependencies from another object', function () {
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
	
	    it('allows to cancel delegated dependencies by exactKey=true option', function () {
	        var obj = {
	            'a.b.c': 1,
	            'd.e.f': 2
	        };
	
	        calc(obj, 'c', ['a.b.c', 'd.e.f'], function (abc, def) {
	            return abc + def;
	        }, {
	            debounceCalc: false,
	            exactKey: true
	        });
	
	        expect(obj.c).toEqual(3);
	        obj['a.b.c'] = 3;
	        expect(obj.c).toEqual(5);
	        obj['d.e.f'] = 3;
	        expect(obj.c).toEqual(6);
	    });
	
	    it('uses event options', function () {
	        var obj = {};
	        var handler = createSpy(function (evt) {
	            return expect(evt.foo).toEqual('bar');
	        });
	        calc(obj, 'c', ['a', 'b'], function (a, b) {
	            return a + b;
	        }, {
	            foo: 'bar',
	            debounceCalc: false
	        });
	
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
	
	    it('allows to debounce handler via debounceCalc=true (use default value)', function (done) {
	        var obj = {
	            a: 1,
	            b: 2
	        };
	        var handler = createSpy(function () {
	            expect(obj.c).toEqual(firstCall ? 3 : 5);
	        });
	
	        addListener(obj, 'change:c', handler);
	
	        // we'e going to handle the first call separately because debounceCalcOnInit is always true
	        var firstCall = true;
	        calc(obj, 'c', ['a', 'b'], function (a, b) {
	            return a + b;
	        });
	        firstCall = false;
	
	        obj.a = 0;
	        obj.a = 1;
	        obj.a = 2;
	        obj.b = 0;
	        obj.b = 1;
	        obj.b = 2;
	        obj.b = 3;
	
	        setTimeout(function () {
	            expect(handler).toHaveBeenCalledTimes(2);
	            done();
	        }, 400);
	    });
	
	    it('allows to debounce handler on init via debounceCalcOnInit=true', function (done) {
	        var obj = {
	            a: 1,
	            b: 2
	        };
	        var handler = createSpy(function () {
	            expect(obj.c).toEqual(3);
	            done();
	        });
	
	        addListener(obj, 'change:c', handler);
	
	        calc(obj, 'c', ['a', 'b'], function (a, b) {
	            return a + b;
	        }, {
	            debounceCalcOnInit: true
	        });
	
	        expect(obj.c).toEqual(undefined);
	
	        expect(handler).not.toHaveBeenCalled();
	    });
	});

/***/ },
/* 385 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(386);
	
	describe('Class function', function () {
	    var symbolIt = typeof Symbol === 'function' ? it : xit;
	
	    it('allows to inherit', function () {
	        var A = Class({ a: true });
	        var B = Class({ b: true, extends: A });
	        var C = Class({ c: true, extends: B });
	        var inst = new C();
	
	        expect(inst instanceof A).toBeTruthy();
	        expect(inst instanceof B).toBeTruthy();
	        expect(inst instanceof C).toBeTruthy();
	
	        expect(inst.a).toBeTruthy();
	        expect(inst.b).toBeTruthy();
	        expect(inst.c).toBeTruthy();
	    });
	
	    symbolIt('allows to inherit symbols', function () {
	        var _Class, _Class2, _Class3;
	
	        var a = Symbol('a');
	        var b = Symbol('b');
	        var c = Symbol('c');
	
	        var A = Class((_Class = {}, _Class[a] = true, _Class));
	        var B = Class((_Class2 = {}, _Class2[b] = true, _Class2.extends = A, _Class2));
	        var C = Class((_Class3 = {}, _Class3[c] = true, _Class3.extends = B, _Class3));
	        var inst = new C();
	
	        expect(inst[a]).toBeTruthy();
	        expect(inst[a]).toBeTruthy();
	        expect(inst[c]).toBeTruthy();
	    });
	
	    it('allows to pass static props', function () {
	        var A = Class({}, { staticProp: true });
	        expect(A.staticProp).toBeTruthy();
	    });
	
	    it('allows to inherit static props', function () {
	        var A = Class({}, { staticProp: true });
	        var B = Class({ extends: A });
	        expect(B.staticProp).toBeTruthy();
	    });
	
	    symbolIt('allows to pass symbols as static props', function () {
	        var _Class4;
	
	        var staticProp = Symbol('staticProp');
	        var A = Class({}, (_Class4 = {}, _Class4[staticProp] = true, _Class4));
	        expect(A[staticProp]).toBeTruthy();
	    });
	
	    symbolIt('allows to inherit symbols as static props', function () {
	        var _Class5;
	
	        var staticProp = Symbol('staticProp');
	        var A = Class({}, (_Class5 = {}, _Class5[staticProp] = true, _Class5));
	        var B = Class({ extends: A });
	        expect(B[staticProp]).toBeTruthy();
	    });
	
	    it('if new Class({}) is called return its instance', function () {
	        var inst = new Class({ a: true });
	        expect(inst.a).toEqual(true);
	        expect(inst instanceof Class).toBeFalsy();
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 386 */
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
/* 387 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	var MatreshkaObject = __webpack_require__(392);
	
	var delegateListener = __webpack_require__(358);
	
	var undelegateListener = __webpack_require__(343);
	
	var trigger = __webpack_require__(411);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies, max-lines */
	describe('Astrerisk events: delegateListener, undelegateListener', function () {
	    it('allows to attatch "*" events to Matreshka.Array instance', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.push({});
	        trigger(obj[0], 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('automatically removes "*" delegated event from Matreshka.Array instance' + 'if an item is removed', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	        var item = {};
	
	        delegateListener(obj, '*', 'someevent', handler);
	
	        obj.push(item);
	        obj.pop();
	        trigger(item, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('allows to attatch "*" event to Matreshka.Object instance', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.setData('x', {});
	        trigger(obj.x, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('automatically removes "*" delegated event from Matreshka.Object instance' + ' if an item is removed', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	        var item = {};
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.setData('x', item);
	        obj.remove('x');
	        trigger(item, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes "*" events from Matreshka.Array instance', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.push({});
	        undelegateListener(obj, '*', 'someevent');
	        trigger(obj[0], 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes "*" events from Matreshka.Object instance', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.setData('x', {});
	        undelegateListener(obj, '*', 'someevent');
	        trigger(obj.x, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes "*" events from Matreshka.Array instance using callback', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.push({});
	        undelegateListener(obj, '*', 'someevent', handler);
	        trigger(obj[0], 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('does not remove "*" events from Matreshka.Array instance when wrong callback is given', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.push({});
	        undelegateListener(obj, '*', 'someevent', function () {});
	        trigger(obj[0], 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes "*" events from Matreshka.Object instance using callback', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.setData('x', {});
	        undelegateListener(obj, '*', 'someevent', handler);
	        trigger(obj.x, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('does not remove "*" events from Matreshka.Object instance when wrong callback is given', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        delegateListener(obj, '*', 'someevent', handler);
	        obj.setData('x', {});
	        undelegateListener(obj, '*', 'someevent', function () {});
	        trigger(obj.x, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to attatch "*" events to Matreshka.Array instance, go deeper (*.a)', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        delegateListener(obj, '*.a', 'someevent', handler);
	        obj.push({
	            a: {}
	        });
	        trigger(obj[0].a, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to attatch "*" events to Matreshka.Object instance, go deeper (*.a)', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        delegateListener(obj, '*.a', 'someevent', handler);
	        obj.setData('x', {
	            a: {}
	        });
	        trigger(obj.x.a, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to attatch "*" events to Matreshka.Array instance, go deeper (*.*)', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        delegateListener(obj, '*.*', 'someevent', handler);
	        obj.push(new MatreshkaArray({}));
	        trigger(obj[0][0], 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to attatch "*" events to Matreshka.Object instance, go deeper (*.*)', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        delegateListener(obj, '*.*', 'someevent', handler);
	        obj.setData('x', new MatreshkaObject({
	            a: {}
	        }));
	        trigger(obj.x.a, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to attatch "*" events to Matreshka.Array instance, go deeper (*.*.a)', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        delegateListener(obj, '*.*.a', 'someevent', handler);
	        obj.push(new MatreshkaArray({
	            a: {}
	        }));
	        trigger(obj[0][0].a, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to attatch "*" events to Matreshka.Object instance, go deeper (*.*.a)', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        delegateListener(obj, '*.*.a', 'someevent', handler);
	        obj.setData('x', new MatreshkaObject({
	            y: new MatreshkaObject({
	                a: {}
	            })
	        }));
	        trigger(obj.x.y.a, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	});

/***/ },
/* 388 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(386);
	
	var Matreshka = __webpack_require__(389);
	
	var instanceMembers = __webpack_require__(419);
	
	var matreshkaError = __webpack_require__(324);
	
	var initMK = __webpack_require__(317);
	
	var staticMembers = __webpack_require__(453);
	
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
/* 389 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(386);
	
	var staticMembers = __webpack_require__(390);
	
	var instanceMembers = __webpack_require__(418);
	
	var initMK = __webpack_require__(317);
	
	var matreshkaError = __webpack_require__(324);
	
	instanceMembers.constructor = function Matreshka() {
	    if (!(this instanceof Matreshka)) {
	        throw matreshkaError('common:call_class');
	    }
	
	    initMK(this);
	};
	
	var Matreshka = Class(instanceMembers, staticMembers);
	
	module.exports = Matreshka;

/***/ },
/* 390 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultBinders = __webpack_require__(350);
	
	var lookForBinder = __webpack_require__(349);
	
	var parserBrackers = __webpack_require__(371);
	
	var Class = __webpack_require__(386);
	
	var toMatreshka = __webpack_require__(391);
	
	var _binders = __webpack_require__(301);
	
	var binders = _binders;
	
	var _universalmethods = __webpack_require__(405);
	
	var universalMethods = _universalmethods;
	
	var assign = __webpack_require__(339);
	
	var useDOMLibrary = __webpack_require__(417);
	
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
/* 391 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// recursively converts objects and arrays to Matreshka.Object and Matreshka.Array instances
	module.exports = toMatreshka;
	function toMatreshka(data) {
	    // fix circular ref issue
	    var MatreshkaObject = __webpack_require__(392);
	    var MatreshkaArray = __webpack_require__(388);
	
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
/* 392 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(386);
	
	var Matreshka = __webpack_require__(389);
	
	var instanceMembers = __webpack_require__(393);
	
	var matreshkaError = __webpack_require__(324);
	
	var initMK = __webpack_require__(317);
	
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
/* 393 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _afterInit$setData$ad;
	
	var _afterInit = __webpack_require__(394);
	
	var addDataKeys = __webpack_require__(396);
	
	var removeDataKeys = __webpack_require__(397);
	
	var isDataKey = __webpack_require__(398);
	
	var setData = __webpack_require__(399);
	
	var keyOf = __webpack_require__(400);
	
	var keys = __webpack_require__(401);
	
	var toJSON = __webpack_require__(402);
	
	var each = __webpack_require__(403);
	
	var iterator = __webpack_require__(404);
	
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
	    jset: setData }, _afterInit$setData$ad[symbolIterator] = iterator, _afterInit$setData$ad);

/***/ },
/* 394 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var afterMatreshkaInit = __webpack_require__(395);
	
	var addListener = __webpack_require__(353);
	
	var triggerOne = __webpack_require__(321);
	
	var defs = __webpack_require__(318);
	
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
	    // for easy Matreshka.Object detection
	    this.isMatreshkaObject = true;
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
/* 395 */
/***/ function(module, exports) {

	"use strict";
	
	// Matreshka initializer
	module.exports = afterMatreshkaInit;
	function afterMatreshkaInit() {
	    this.isMatreshka = true;
	    this.nodes = {};
	    this.$nodes = {};
	}

/***/ },
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var defineProp = __webpack_require__(319);
	
	var matreshkaError = __webpack_require__(324);
	
	var triggerOne = __webpack_require__(321);
	
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
/* 397 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var triggerOne = __webpack_require__(321);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 398 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
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
/* 399 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var defineProp = __webpack_require__(319);
	
	var set = __webpack_require__(320);
	
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
/* 400 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
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
/* 401 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
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
/* 402 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
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
/* 403 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
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
/* 404 */
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
/* 405 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var on = __webpack_require__(406);
	
	var once = __webpack_require__(408);
	
	var onDebounce = __webpack_require__(410);
	
	var off = __webpack_require__(409);
	
	var trigger = __webpack_require__(411);
	
	var calc = __webpack_require__(367);
	
	var bindNode = __webpack_require__(316);
	
	var unbindNode = __webpack_require__(341);
	
	var bindOptionalNode = __webpack_require__(377);
	
	var bindSandbox = __webpack_require__(378);
	
	var parseBindings = __webpack_require__(365);
	
	var select = __webpack_require__(379);
	
	var selectAll = __webpack_require__(380);
	
	var set = __webpack_require__(320);
	
	var remove = __webpack_require__(414);
	
	var instantiate = __webpack_require__(415);
	
	var mediate = __webpack_require__(416);
	
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
/* 406 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var splitBySpaceReg = __webpack_require__(407);
	
	var checkObjectType = __webpack_require__(323);
	
	var matreshkaError = __webpack_require__(324);
	
	var addListener = __webpack_require__(353);
	
	var delegateListener = __webpack_require__(358);
	
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
/* 407 */
/***/ function(module, exports) {

	"use strict";
	
	// allows to split by spaces not inclusing ones inside of brackers
	module.exports = /\s+(?![^(]*\))/g;

/***/ },
/* 408 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var on = __webpack_require__(406);
	
	var checkObjectType = __webpack_require__(323);
	
	var off = __webpack_require__(409);
	
	var apply = __webpack_require__(322);
	
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
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var splitBySpaceReg = __webpack_require__(407);
	
	var checkObjectType = __webpack_require__(323);
	
	var defs = __webpack_require__(318);
	
	var removeListener = __webpack_require__(344);
	
	var undelegateListener = __webpack_require__(343);
	
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
/* 410 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var on = __webpack_require__(406);
	
	var checkObjectType = __webpack_require__(323);
	
	var debounce = __webpack_require__(356);
	
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
/* 411 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var domEventReg = __webpack_require__(345);
	
	var checkObjectType = __webpack_require__(323);
	
	var matreshkaError = __webpack_require__(324);
	
	var splitBySpaceReg = __webpack_require__(407);
	
	var defs = __webpack_require__(318);
	
	var triggerOne = __webpack_require__(321);
	
	var triggerDomEvent = __webpack_require__(412);
	
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
/* 412 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var triggerOneDOMEvent = __webpack_require__(413);
	
	var defs = __webpack_require__(318);
	
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
/* 413 */
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
/* 414 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var unbindNode = __webpack_require__(341);
	
	var triggerOne = __webpack_require__(321);
	
	var removeListener = __webpack_require__(344);
	
	var defs = __webpack_require__(318);
	
	var checkObjectType = __webpack_require__(323);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var checkObjectType = __webpack_require__(323);
	
	var mediate = __webpack_require__(416);
	
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
/* 416 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var defineProp = __webpack_require__(319);
	
	var checkObjectType = __webpack_require__(323);
	
	var set = __webpack_require__(320);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 417 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dom = __webpack_require__(329);
	
	var mq = __webpack_require__(331);
	
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
/* 418 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _universalmethods = __webpack_require__(405);
	
	var universalMethods = _universalmethods;
	
	var assign = __webpack_require__(339);
	
	var _afterInit = __webpack_require__(395);
	
	module.exports = assign({
	    _afterInit: _afterInit,
	    $: universalMethods.selectAll
	}, universalMethods);

/***/ },
/* 419 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _assign;
	
	var assign = __webpack_require__(339);
	
	var _afterInit = __webpack_require__(420);
	
	var mediateItem = __webpack_require__(421);
	
	var orderBy = __webpack_require__(422);
	
	var pull = __webpack_require__(437);
	
	var recreate = __webpack_require__(438);
	
	var rerender = __webpack_require__(441);
	
	var restore = __webpack_require__(442);
	
	var toJSON = __webpack_require__(443);
	
	var pseudoNativeMethods = __webpack_require__(444);
	
	var iterator = __webpack_require__(452);
	
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
	    length: 0
	}, _assign[symbolIterator] = iterator, _assign), pseudoNativeMethods);

/***/ },
/* 420 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var afterMatreshkaInit = __webpack_require__(395);
	
	var addListener = __webpack_require__(353);
	
	var matreshkaError = __webpack_require__(324);
	
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
	
	    // easy Matreshka.Array detection
	    this.isMatreshkaArray = true;
	
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
/* 421 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
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
/* 422 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var cheapRecreate = __webpack_require__(423);
	
	var pureOrderBy = __webpack_require__(424);
	
	var reportModified = __webpack_require__(425);
	
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
/* 423 */
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
/* 424 */
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
/* 425 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var triggerOne = __webpack_require__(321);
	
	var processRendering = __webpack_require__(426);
	
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
/* 426 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var processPush = __webpack_require__(427);
	
	var processUnshift = __webpack_require__(430);
	
	var processRecreate = __webpack_require__(431);
	
	var processSort = __webpack_require__(433);
	
	var processRemove = __webpack_require__(434);
	
	var processRerender = __webpack_require__(435);
	
	var processSpliceAdd = __webpack_require__(436);
	
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
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var renderItemNode = __webpack_require__(428);
	
	var triggerOne = __webpack_require__(321);
	
	var checkAlreadyRendered = __webpack_require__(429);
	
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
/* 428 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var parseBindings = __webpack_require__(365);
	
	var bindNode = __webpack_require__(316);
	
	var unbindNode = __webpack_require__(341);
	
	var triggerOne = __webpack_require__(321);
	
	var initMK = __webpack_require__(317);
	
	var matreshkaError = __webpack_require__(324);
	
	var getNodes = __webpack_require__(326);
	
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
/* 429 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 430 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var renderItemNode = __webpack_require__(428);
	
	var triggerOne = __webpack_require__(321);
	
	var checkAlreadyRendered = __webpack_require__(429);
	
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
/* 431 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var renderItemNode = __webpack_require__(428);
	
	var triggerOne = __webpack_require__(321);
	
	var defs = __webpack_require__(318);
	
	var matreshkaError = __webpack_require__(324);
	
	var getAlreadyRendered = __webpack_require__(432);
	
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
/* 432 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
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
/* 433 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getAlreadyRendered = __webpack_require__(432);
	
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
/* 434 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defs = __webpack_require__(318);
	
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
/* 435 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var getAlreadyRendered = __webpack_require__(432);
	
	var renderItemNode = __webpack_require__(428);
	
	var triggerOne = __webpack_require__(321);
	
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
/* 436 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var renderItemNode = __webpack_require__(428);
	
	var triggerOne = __webpack_require__(321);
	
	var checkAlreadyRendered = __webpack_require__(429);
	
	var getAlreadyRendered = __webpack_require__(432);
	
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
/* 437 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var reportModified = __webpack_require__(425);
	
	var matreshkaError = __webpack_require__(324);
	
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
/* 438 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var reportModified = __webpack_require__(425);
	
	var updateTracked = __webpack_require__(439);
	
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
/* 439 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var updateObject = __webpack_require__(440);
	
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
/* 440 */
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
/* 441 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var processRendering = __webpack_require__(426);
	
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
/* 442 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var matreshkaError = __webpack_require__(324);
	
	var bindNode = __webpack_require__(316);
	
	var triggerOne = __webpack_require__(321);
	
	var getNodes = __webpack_require__(326);
	
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
/* 443 */
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
/* 444 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createPseudoNativeMethod = __webpack_require__(445);
	
	var concat = __webpack_require__(451);
	
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
/* 445 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toMatreshkaArray = __webpack_require__(446);
	
	var createSortingMethod = __webpack_require__(447);
	
	var createRemovingMethod = __webpack_require__(448);
	
	var createAddingMethod = __webpack_require__(449);
	
	var createSplice = __webpack_require__(450);
	
	var apply = __webpack_require__(322);
	
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
/* 446 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// converts array-like to Matreshka.Array instance
	module.exports = toMatreshkaArray;
	function toMatreshkaArray(arrayLike) {
	    // fix circular dependency issue
	    var MatreshkaArray = __webpack_require__(388);
	
	    var result = new MatreshkaArray(arrayLike.length);
	
	    for (var _target = arrayLike, index = 0, item, _l = _target.length; item = _target[index], index < _l; index++) {
	        result[index] = item;
	    }
	
	    return result;
	}

/***/ },
/* 447 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var reportModified = __webpack_require__(425);
	
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
/* 448 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var reportModified = __webpack_require__(425);
	
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
/* 449 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var reportModified = __webpack_require__(425);
	
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
/* 450 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var initMK = __webpack_require__(317);
	
	var reportModified = __webpack_require__(425);
	
	var toMatreshkaArray = __webpack_require__(446);
	
	var apply = __webpack_require__(322);
	
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
/* 451 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var apply = __webpack_require__(322);
	
	// the method works just like Array.prototype.concat but
	// - flattens both Array and Matreshka.Array
	// - returns Matreshka.Array
	module.exports = concat;
	function concat() {
	    // fix circular dependency issue
	    var MatreshkaArray = __webpack_require__(388);
	
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
/* 452 */
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
/* 453 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var from = __webpack_require__(454);
	
	var of = __webpack_require__(455);
	
	module.exports = {
	    of: of,
	    from: from
	}; // lol

/***/ },
/* 454 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var cheapRecreate = __webpack_require__(423);
	
	// creates a new Matreshka.Array instance from an array-like or iterable object
	module.exports = from;
	function from(arrayLike, mapFn, thisArg) {
	    // allow to inherit this method by child classes
	    // require('./') fixes circular ref issue
	    var ParentClass = this || __webpack_require__(388);
	
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
/* 455 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var cheapRecreate = __webpack_require__(423);
	
	// creates a new Matreshka.Array instance with a variable number of arguments,
	// regardless of number or type of the arguments
	module.exports = of;
	function of() {
	    var _arguments = arguments;
	
	    // allow to inherit this method by child classes
	    // require('./') fixes circular ref issue
	    var ParentClass = this || __webpack_require__(388);
	
	    var result = new ParentClass();
	    var newItems = Array(arguments.length);
	
	    for (var _target = arguments, index = 0, item, _l = _target.length; item = _target[index], index < _l; index++) {
	        newItems[index] = _arguments[index];
	    }
	
	    return cheapRecreate(result, newItems);
	}

/***/ },
/* 456 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var delegateListener = __webpack_require__(358);
	
	var undelegateListener = __webpack_require__(343);
	
	var triggerOne = __webpack_require__(321);
	
	var makeObject = __webpack_require__(381);
	
	var createSpy = __webpack_require__(382);
	
	describe('Delegated events (delegateListener, undelegateListener)', function () {
	    var ctx = void 0;
	    var handler = void 0;
	
	    beforeEach(function () {
	        ctx = {};
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
	
	    it('remove event from previous object when reassigned (a.b, reassign a)', function () {
	        var obj = makeObject('a.b');
	        var a = obj.a;
	
	        delegateListener(obj, 'a.b', 'someevent', handler);
	        obj.a = makeObject('b');
	        triggerOne(a.b, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from previous object when reassigned (a.b, reassign b)', function () {
	        var obj = makeObject('a.b');
	        var b = obj.a.b;
	
	        delegateListener(obj, 'a.b', 'someevent', handler);
	        obj.a.b = {};
	        triggerOne(b, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from previous object when reassigned (a.b.c, reassign a)', function () {
	        var obj = makeObject('a.b.c');
	        var a = obj.a;
	
	        delegateListener(obj, 'a.b.c', 'someevent', handler);
	        obj.a = makeObject('b.c');
	        triggerOne(a.b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from previous object when reassigned (a.b.c, reassign b)', function () {
	        var obj = makeObject('a.b.c');
	        var b = obj.a.b;
	
	        delegateListener(obj, 'a.b.c', 'someevent', handler);
	        obj.a.b = makeObject('c');
	        triggerOne(b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('remove event from previous object when reassigned (a.b.c, reassign c)', function () {
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
	
	    it('does not remove change event when undelegated (a.b.c)', function () {
	        var obj = makeObject('a.b.c');
	
	        delegateListener(obj, 'a.b.c', 'someevent', function () {});
	        delegateListener(obj, 'a.b', 'change:c', handler);
	        undelegateListener(obj, 'a.b.c', 'someevent');
	        obj.a.b.c = 55;
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('undelegates by callback (a.b)', function () {
	        var obj = makeObject('a.b');
	
	        delegateListener(obj, 'a.b', 'someevent', handler);
	        undelegateListener(obj, 'a.b', 'someevent', handler);
	        triggerOne(obj.a.b, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('undelegates by callback (a.b.c)', function () {
	        var obj = makeObject('a.b.c');
	
	        delegateListener(obj, 'a.b.c', 'someevent', handler);
	        undelegateListener(obj, 'a.b.c', 'someevent', handler);
	        triggerOne(obj.a.b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('undelegates by callback and context (a.b)', function () {
	        var obj = makeObject('a.b');
	
	        delegateListener(obj, 'a.b', 'someevent', handler, ctx);
	        undelegateListener(obj, 'a.b', 'someevent', handler, ctx);
	        triggerOne(obj.a.b, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('undelegates by callback and context (a.b.c)', function () {
	        var obj = makeObject('a.b.c');
	
	        delegateListener(obj, 'a.b.c', 'someevent', handler, ctx);
	        undelegateListener(obj, 'a.b.c', 'someevent', handler, ctx);
	        triggerOne(obj.a.b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('undelegates by callback but keeps when callbacks are not same (a.b)', function () {
	        var obj = makeObject('a.b');
	
	        delegateListener(obj, 'a.b', 'someevent', handler);
	        undelegateListener(obj, 'a.b', 'someevent', function () {});
	        triggerOne(obj.a.b, 'someevent');
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('undelegates by callback but keeps when callbacks are not same (a.b.c)', function () {
	        var obj = makeObject('a.b.c');
	
	        delegateListener(obj, 'a.b.c', 'someevent', handler);
	        undelegateListener(obj, 'a.b.c', 'someevent', function () {});
	        triggerOne(obj.a.b.c, 'someevent');
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('undelegates by callback but keeps when contexts are not same (a.b)', function () {
	        var obj = makeObject('a.b');
	
	        delegateListener(obj, 'a.b', 'someevent', handler, {});
	        undelegateListener(obj, 'a.b', 'someevent', handler, {});
	        triggerOne(obj.a.b, 'someevent');
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('undelegates by callback but keeps when contexts are not same (a.b.c)', function () {
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
	}); /* eslint-disable import/no-extraneous-dependencies, max-lines */

/***/ },
/* 457 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(353);
	
	var delegateListener = __webpack_require__(358);
	
	var undelegateListener = __webpack_require__(343);
	
	var removeListener = __webpack_require__(344);
	
	var makeObject = __webpack_require__(381);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies */
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
	
	    it('fires delegated (a.x)', function () {
	        var obj = makeObject('a.x', 1);
	
	        delegateListener(obj, 'a', 'change:x', handler);
	        obj.a.x = 2;
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('fires delegated (a.b.x)', function () {
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
	
	    it('removes delegated (a.x)', function () {
	        var obj = makeObject('a.x', 1);
	
	        delegateListener(obj, 'a', 'change:x', handler);
	        undelegateListener(obj, 'a', 'change:x', handler);
	        obj.a.x = 2;
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes delegated (a.b.x)', function () {
	        var obj = makeObject('a.b.x', 1);
	
	        delegateListener(obj, 'a.b', 'change:x', handler);
	        undelegateListener(obj, 'a.b', 'change:x', handler);
	        obj.a.b.x = 2;
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires delegated (a.b.x)', function () {
	        var obj = makeObject('a.b.x', 1);
	
	        delegateListener(obj, 'a.b', 'change:x', handler);
	        obj.a.b.x = 2;
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('accepts null target (a.b.c, reassign b)', function () {
	        var obj = makeObject('a.b.c.x', 1);
	        delegateListener(obj, 'a.b.c', 'someevent', handler);
	
	        expect(function () {
	            obj.a.b = null;
	        }).not.toThrow();
	    });
	});

/***/ },
/* 458 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addListener = __webpack_require__(353);
	
	var removeListener = __webpack_require__(344);
	
	var triggerOne = __webpack_require__(321);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Events core (addListener, removeListener, triggerOne)', function () {
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
	
	    it('removes all', function () {
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
/* 459 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addDomListener = __webpack_require__(354);
	
	var removeDomListener = __webpack_require__(346);
	
	var triggerDOMEvent = __webpack_require__(412);
	
	var bindNode = __webpack_require__(316);
	
	var createSpy = __webpack_require__(382);
	
	var simulateClick = __webpack_require__(460);
	
	/* eslint-disable import/no-extraneous-dependencies, no-shadow */
	describe('Events core (addDomListener, removeDomListener, triggerDOMListener)', function () {
	    var node = void 0;
	    var obj = void 0;
	    var handler = void 0;
	    var childNode = void 0;
	    var grandchildNode = void 0;
	
	    beforeEach(function () {
	        obj = {};
	        handler = createSpy();
	        node = window.document.body.appendChild(window.document.createElement('div'));
	
	        node.innerHTML = '\n            <div id="child">\n                <div class="grandchild">\n\n                </div>\n            </div>\n        ';
	
	        childNode = node.querySelector('#child');
	        grandchildNode = node.querySelector('.grandchild');
	    });
	
	    afterEach(function () {
	        window.document.body.removeChild(node);
	    });
	
	    it('fires with no selector', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', null, handler);
	        simulateClick(childNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes with no selector', function () {
	        addDomListener(obj, 'x', 'click', null, handler);
	        removeDomListener(obj, 'x', 'click');
	        bindNode(obj, 'x', '#child');
	        simulateClick(childNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires using selector', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        simulateClick(grandchildNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('adds using selector and removes with no selector', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        removeDomListener(obj, 'x', 'click');
	        simulateClick(grandchildNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('adds using selector then binds and removes with selector', function () {
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        bindNode(obj, 'x', '#child');
	        removeDomListener(obj, 'x', 'click');
	        simulateClick(grandchildNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('triggers DOM event', function () {
	        var handler = createSpy(function (d1, d2) {
	            return expect(d1 + d2).toEqual(3);
	        });
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', null, handler);
	        triggerDOMEvent(obj, 'x', 'click', null, [1, 2]);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers DOM event with specified selector', function () {
	        var handler = createSpy(function (d1, d2) {
	            return expect(d1 + d2).toEqual(3);
	        });
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        triggerDOMEvent(obj, 'x', 'click', '.grandchild', [1, 2]);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers DOM event with specified selector (bubbling test)', function () {
	        var handler = createSpy(function (d1, d2) {
	            return expect(d1 + d2).toEqual(3);
	        });
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', null, handler);
	        triggerDOMEvent(obj, 'x', 'click', '.grandchild', [1, 2]);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes delegated', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        removeDomListener(obj, 'x', 'click', '.grandchild');
	        simulateClick(grandchildNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes delegated and does not remove events from other nodes', function () {
	        bindNode(obj, 'x', '#child');
	        addDomListener(obj, 'x', 'click', '.grandchild', handler);
	        removeDomListener(obj, 'x', 'click', '.blah');
	        simulateClick(grandchildNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	});

/***/ },
/* 460 */
/***/ function(module, exports) {

	'use strict';
	
	// simulates click on a node
	module.exports = simulateClick;
	function simulateClick(node) {
	    var evt = window.document.createEvent('MouseEvent');
	    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    node.dispatchEvent(evt);
	}

/***/ },
/* 461 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-extraneous-dependencies, no-shadow, max-lines */
	
	
	var on = __webpack_require__(406);
	
	var once = __webpack_require__(408);
	
	var onDebounce = __webpack_require__(410);
	
	var off = __webpack_require__(409);
	
	var trigger = __webpack_require__(411);
	
	var bindNode = __webpack_require__(316);
	
	var MatreshkaArray = __webpack_require__(388);
	
	var MatreshkaObject = __webpack_require__(392);
	
	var createSpy = __webpack_require__(382);
	
	var makeObject = __webpack_require__(381);
	
	var simulateClick = __webpack_require__(460);
	
	describe('Events summary (on, once, onDebounce, off, trigger)', function () {
	    var obj = void 0;
	    var handler = void 0;
	    var node = void 0;
	    var childNode = void 0;
	    var grandchildNode = void 0;
	
	    beforeEach(function () {
	        obj = {};
	        handler = createSpy();
	        node = window.document.body.appendChild(window.document.createElement('div'));
	
	        node.innerHTML = '\n            <div id="child">\n                <div class="grandchild">\n\n                </div>\n            </div>\n        ';
	
	        childNode = node.querySelector('#child');
	        grandchildNode = node.querySelector('.grandchild');
	    });
	
	    afterEach(function () {
	        window.document.body.removeChild(node);
	    });
	
	    it('fires', function () {
	        on(obj, 'someevent', handler);
	        trigger(obj, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to pass few arguments to trigger', function () {
	        var handler = createSpy(function (a, b) {
	            expect(a).toEqual('foo');
	            expect(b).toEqual('bar');
	        });
	        on(obj, 'someevent', handler);
	        trigger(obj, 'someevent', 'foo', 'bar');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('fires work in context of an object which has isMatreshka=true property', function () {
	        var obj = { isMatreshka: true };
	        on.call(obj, 'someevent', handler);
	        trigger.call(obj, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes', function () {
	        on(obj, 'someevent', handler);
	        off(obj, 'someevent');
	        trigger(obj, 'someevent');
	
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes work in context of an object which has isMatreshka=true property', function () {
	        var obj = { isMatreshka: true };
	        on.call(obj, 'someevent', handler);
	        off.call(obj, 'someevent');
	        trigger.call(obj, 'someevent');
	
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires delegated', function () {
	        var obj = makeObject('a.b.c');
	        on(obj, 'a.b.c@someevent', handler);
	        trigger(obj.a.b.c, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes delegated', function () {
	        var obj = makeObject('a.b.c');
	        on(obj, 'a.b.c@someevent', handler);
	        off(obj, 'a.b.c@someevent');
	        trigger(obj.a.b.c, 'someevent');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('fires DOM event with no selector', function () {
	        bindNode(obj, 'x', '#child');
	        on(obj, 'click::x', handler);
	        simulateClick(childNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('removes DOM event with no selector', function () {
	        on(obj, 'click::x', handler);
	        off(obj, 'click::x');
	        bindNode(obj, 'x', '#child');
	        simulateClick(childNode);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('triggers DOM event using selector', function () {
	        bindNode(obj, 'x', '#child');
	        on(obj, 'click::x(.grandchild)', handler);
	        simulateClick(grandchildNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers DOM event un sandbox using selector', function () {
	        bindNode(obj, 'sandbox', '#child');
	        on(obj, 'click::(.grandchild)', handler);
	        simulateClick(grandchildNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers DOM event via trigger', function () {
	        var handler = createSpy(function (a, b) {
	            return expect(a + b).toEqual(3);
	        });
	        bindNode(obj, 'x', '#child');
	        on(obj, 'click::x', handler);
	        trigger(obj, 'click::x', 1, 2);
	
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('fires DOM event using delegated event name', function () {
	        var obj = { a: {} };
	        bindNode(obj.a, 'x', '#child');
	        on(obj, 'a@click::x', handler);
	        simulateClick(childNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('fires DOM event using asterisk event name', function () {
	        var obj = new MatreshkaArray({});
	        bindNode(obj[0], 'x', '#child');
	        on(obj, '*@click::x', handler);
	        simulateClick(childNode);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers once', function () {
	        once(obj, 'someevent', handler);
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to pass name-handler object to "once"', function () {
	        var handlers = {
	            foo: createSpy(),
	            bar: createSpy()
	        };
	
	        once(obj, handlers);
	
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	
	        expect(handlers.foo).toHaveBeenCalledTimes(1);
	        expect(handlers.bar).toHaveBeenCalledTimes(1);
	
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	
	        expect(handlers.foo).toHaveBeenCalledTimes(1);
	        expect(handlers.bar).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers once in context of an object which has isMatreshka=true property', function () {
	        var obj = { isMatreshka: true };
	        once.call(obj, 'someevent', handler);
	        trigger.call(obj, 'someevent');
	        trigger.call(obj, 'someevent');
	        trigger.call(obj, 'someevent');
	
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('adds debounced handler via onDebounce', function (done) {
	        setTimeout(function () {
	            expect(handler).toHaveBeenCalledTimes(1);
	            done();
	        }, 200);
	
	        onDebounce(obj, 'someevent', handler);
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	        trigger(obj, 'someevent');
	    });
	
	    it('adds debounced handler via onDebounce using context object' + ' which has isMatreshka=true property', function (done) {
	        var obj = { isMatreshka: true };
	
	        setTimeout(function () {
	            expect(handler).toHaveBeenCalledTimes(1);
	            done();
	        }, 200);
	
	        onDebounce.call(obj, 'someevent', handler);
	        trigger.call(obj, 'someevent');
	        trigger.call(obj, 'someevent');
	        trigger.call(obj, 'someevent');
	    });
	
	    it('allows to pass name-handler object to "on" and "off"', function () {
	        var handlers = {
	            foo: createSpy(),
	            bar: createSpy()
	        };
	
	        on(obj, handlers);
	
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	
	        expect(handlers.foo).toHaveBeenCalledTimes(1);
	        expect(handlers.bar).toHaveBeenCalledTimes(1);
	
	        off(obj, handlers);
	
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	
	        expect(handlers.foo).toHaveBeenCalledTimes(1);
	        expect(handlers.bar).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to pass name-handler object to "onDebounce"', function (done) {
	        var handlers = {
	            foo: createSpy(),
	            bar: createSpy()
	        };
	
	        setTimeout(function () {
	            expect(handlers.foo).toHaveBeenCalledTimes(1);
	            expect(handlers.bar).toHaveBeenCalledTimes(1);
	            done();
	        }, 200);
	
	        onDebounce(obj, handlers);
	
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	        trigger(obj, 'foo');
	        trigger(obj, 'bar');
	    });
	
	    it('allows to flip context and triggerOnInit (on)', function () {
	        var thisArg = {};
	        var handler = createSpy(function () {
	            expect(_this).toEqual(thisArg);
	        });
	
	        on(obj, 'foo', handler, true, thisArg);
	        on(obj, 'bar', handler, thisArg, true);
	        expect(handler).toHaveBeenCalledTimes(2);
	    });
	
	    it('allows to attatch "*" events to Matreshka.Array instance', function () {
	        var obj = new MatreshkaArray();
	        var handler = createSpy();
	
	        on(obj, '*@someevent', handler);
	        obj.push({});
	        trigger(obj[0], 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to attatch "*" event to Matreshka.Object instance', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	
	        on(obj, '*@someevent', handler);
	        obj.setData('x', {});
	        trigger(obj.x, 'someevent');
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('allows to pass delay without context to onDebounce instance method', function (done) {
	        var handler = createSpy(function handler() {
	            expect(this).toEqual(obj);
	        });
	        var obj = { isMatreshka: true };
	
	        setTimeout(function () {
	            expect(handler).toHaveBeenCalledTimes(1);
	            done();
	        }, 200);
	
	        onDebounce.call(obj, 'someevent', handler, 100);
	        trigger(obj, 'someevent');
	    });
	});

/***/ },
/* 462 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var addTreeListner = __webpack_require__(357);
	
	var removeTreeListner = __webpack_require__(342);
	
	var makeObject = __webpack_require__(381);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Tree change events (internal feature)', function () {
	    it('should listen tree and should remove listeners from previous subtree', function () {
	        var obj = makeObject('a.b.c.d.e');
	        var handler = createSpy();
	        addTreeListner(obj, 'a.b.c.d.e', handler);
	
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
	
	        obj.a = {};
	        expect(handler).toHaveBeenCalledTimes(16);
	    });
	
	    it('should remove tree listener by callback', function () {
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
	
	    it('should remove tree listener without callback', function () {
	        var obj = makeObject('a.b.c');
	        var handler = createSpy();
	        addTreeListner(obj, 'a.b.c', handler);
	        removeTreeListner(obj, 'a.b.c');
	
	        obj.a.b.c = {};
	        expect(handler).not.toHaveBeenCalled();
	
	        obj.a.b = makeObject('c');
	        expect(handler).not.toHaveBeenCalled();
	
	        obj.a = makeObject('b.c');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('should not remove tree listener by wrong callback', function () {
	        var obj = makeObject('a.b.c');
	        var handler = createSpy();
	        addTreeListner(obj, 'a.b.c', handler);
	        removeTreeListner(obj, 'a.b.c', function () {});
	
	        obj.a.b.c = {};
	        expect(handler).toHaveBeenCalledTimes(1);
	
	        obj.a.b = makeObject('c');
	        expect(handler).toHaveBeenCalledTimes(2);
	
	        obj.a = makeObject('b.c');
	        expect(handler).toHaveBeenCalledTimes(3);
	    });
	});

/***/ },
/* 463 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var instantiate = __webpack_require__(415);
	
	var Class = __webpack_require__(386);
	
	var MatreshkaObject = __webpack_require__(392);
	
	var MatreshkaArray = __webpack_require__(388);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* eslint-disable import/no-extraneous-dependencies */
	
	
	describe('instantiate', function () {
	    it('allows to instantiate a property', function () {
	        var obj = {
	            x: { a: 42 }
	        };
	
	        var X = function X(data) {
	            _classCallCheck(this, X);
	
	            this.a = data.a;
	        };
	
	        instantiate(obj, 'x', X);
	
	        expect(obj.x.constructor).toEqual(X);
	        expect(obj.x.a).toEqual(42);
	    });
	
	    it('instantiates in context of an object which has isMatreshka=true property', function () {
	        var obj = {
	            isMatreshka: true,
	            x: { a: 42 }
	        };
	
	        var X = function X(data) {
	            _classCallCheck(this, X);
	
	            this.a = data.a;
	        };
	
	        instantiate.call(obj, 'x', X);
	
	        expect(obj.x.constructor).toEqual(X);
	        expect(obj.x.a).toEqual(42);
	    });
	
	    it('allows to pass key-class object', function () {
	        var obj = {
	            x: { a: 1 },
	            y: { b: 2 }
	        };
	
	        var X = function X(data) {
	            _classCallCheck(this, X);
	
	            this.a = data.a;
	        };
	
	        var Y = function Y(data) {
	            _classCallCheck(this, Y);
	
	            this.b = data.b;
	        };
	
	        instantiate(obj, {
	            x: X,
	            y: Y
	        });
	
	        expect(obj.x.constructor).toEqual(X);
	        expect(obj.x.a).toEqual(1);
	        expect(obj.y.constructor).toEqual(Y);
	        expect(obj.y.b).toEqual(2);
	    });
	
	    it('updates simple object on assignment', function () {
	        var obj = {};
	
	        var X = function X() {
	            _classCallCheck(this, X);
	        };
	
	        instantiate(obj, 'x', X);
	
	        var x = obj.x;
	
	        obj.x = { a: 42 };
	
	        expect(obj.x).toEqual(x);
	
	        expect(obj.x.a).toEqual(42);
	    });
	
	    it('updates Matreshka.Object instance on assigment', function () {
	        var obj = {
	            x: { a: 42 }
	        };
	
	        var X = Class({
	            extends: MatreshkaObject,
	            constructor: function (data) {
	                this.setData(data);
	            }
	        });
	
	        instantiate(obj, 'x', X);
	
	        expect(obj.x.constructor).toEqual(X);
	        expect(obj.x.a).toEqual(42);
	
	        obj.x = {
	            b: 1,
	            c: 2
	        };
	
	        expect(obj.x.keys()).toEqual(['b', 'c']);
	    });
	
	    it('updates Matreshka.Array instance on assigment', function () {
	        var obj = {
	            x: [1, 2, 3, 4, 5]
	        };
	
	        var X = Class({
	            extends: MatreshkaArray,
	            constructor: function (data) {
	                this.recreate(data);
	            }
	        });
	
	        instantiate(obj, 'x', X);
	
	        expect(obj.x.constructor).toEqual(X);
	        expect(obj.x.toJSON(false)).toEqual([1, 2, 3, 4, 5]);
	
	        obj.x = [6, 7, 8, 9, 0];
	
	        expect(obj.x.toJSON(false)).toEqual([6, 7, 8, 9, 0]);
	    });
	
	    it('makes possible to customize update function', function () {
	        var obj = {
	            x: { a: 1 }
	        };
	
	        var X = function X(data) {
	            _classCallCheck(this, X);
	
	            this.a = data.a + 'foo';
	        };
	
	        instantiate(obj, 'x', X, function (instance, data) {
	            instance.a = data.a + 'bar';
	        });
	
	        expect(obj.x.constructor).toEqual(X);
	        expect(obj.x.a).toEqual('1foo');
	
	        obj.x = { a: 2 };
	
	        expect(obj.x.constructor).toEqual(X);
	        expect(obj.x.a).toEqual('2bar');
	    });
	});

/***/ },
/* 464 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(465);
	
	var MatreshkaArray = __webpack_require__(388);
	
	var createSpy = __webpack_require__(382);
	
	describe('Matreshka.Array class', function () {
	    var methodNames = '_afterInit,\n    mediateItem,\n    orderBy,\n    pull,\n    recreate,\n    rerender,\n    restore,\n    toJSON,\n    concat,\n    join,\n    pop,\n    push,\n    reverse,\n    shift,\n    slice,\n    sort,\n    splice,\n    toString,\n    unshift,\n    every,\n    filter,\n    forEach,\n    indexOf,\n    lastIndexOf,\n    map,\n    some,\n    push_,\n    pop_,\n    unshift_,\n    shift_,\n    sort_,\n    reverse_,\n    splice_'.split(/\s*,\s*/);
	
	    it('an instance should have isMatreshka=true and isMatreshkaArray=true properties', function () {
	        var obj = new MatreshkaArray();
	        expect(obj.isMatreshka).toEqual(true);
	        expect(obj.isMatreshkaArray).toEqual(true);
	    });
	
	    it('includes all instance methods', function () {
	        var obj = new MatreshkaArray();
	        for (var i = 0; i < methodNames.length; i++) {
	            var name = methodNames[i];
	            expect(typeof obj[name]).toEqual('function', name + ' method is missing');
	        }
	    });
	
	    it('includes all static methods', function () {
	        expect(typeof MatreshkaArray.of).toEqual('function', 'of method is missing');
	        expect(typeof MatreshkaArray.from).toEqual('function', 'from method is missing');
	    });
	
	    it('is a property of Matreshka', function () {
	        expect(Matreshka.Array).toEqual(MatreshkaArray);
	    });
	
	    it('triggers addone and removeone', function () {
	        var arr = MatreshkaArray.of(1, 2, 3, 4, 5);
	        var addOneHandler = createSpy(function (_ref) {
	            var addedItem = _ref.addedItem;
	
	            expect(addedItem).toEqual('foo');
	        });
	        var removeOneHandler = createSpy(function (_ref2) {
	            var removedItem = _ref2.removedItem;
	
	            expect(removedItem).toEqual(2);
	        });
	
	        arr.on('addone', addOneHandler);
	        arr.on('removeone', removeOneHandler);
	
	        arr.push('foo');
	        arr.pull(1);
	
	        expect(addOneHandler).toHaveBeenCalledTimes(1);
	        expect(removeOneHandler).toHaveBeenCalledTimes(1);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 465 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(389);
	
	var MatreshkaArray = __webpack_require__(388);
	
	var MatreshkaObject = __webpack_require__(392);
	
	Matreshka.Object = MatreshkaObject;
	Matreshka.Array = MatreshkaArray;
	
	module.exports = Matreshka;

/***/ },
/* 466 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	describe('Matreshka.Array iterator', function () {
	    var symbolIt = typeof Symbol === 'function' ? it : xit;
	
	    symbolIt('iterates via for..of', function () {
	        var arr = new MatreshkaArray(1, 2, 3);
	        var i = 1;
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var item = _step.value;
	
	                expect(item).toEqual(i);
	                i += 1;
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 467 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	describe('Matreshka.Array mediate item', function () {
	    it('allows to set item mediator via mediateItem', function () {
	        var arr = new MatreshkaArray('foo', 'bar');
	        arr.mediateItem(function (value) {
	            return 'x' + value;
	        });
	
	        expect(arr.toJSON(false)).toEqual(['xfoo', 'xbar']);
	
	        arr.push('baz');
	
	        expect(arr.toJSON(false)).toEqual(['xfoo', 'xbar', 'xbaz']);
	
	        arr.splice(0, 0, 'qux');
	
	        expect(arr.toJSON(false)).toEqual(['xqux', 'xfoo', 'xbar', 'xbaz']);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 468 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(386);
	
	var MatreshkaArray = __webpack_require__(388);
	
	var MatreshkaObject = __webpack_require__(392);
	
	describe('Matreshka.Array Model', function () {
	    it('can use Model and Model gets correct arguments', function (done) {
	        var item = {};
	
	        var Model = Class({
	            constructor: function (data, parent, index) {
	                expect(data === item).toBeTruthy();
	                expect(index).toEqual(0);
	                setTimeout(function () {
	                    expect(parent === arr).toBeTruthy(); // eslint-disable-line no-use-before-define
	                    done();
	                });
	            }
	        });
	
	        var MatreshkaArrayChild = Class({
	            extends: MatreshkaArray,
	            get Model() {
	                return Model;
	            },
	            constructor: function () {
	                this.push(item);
	            }
	        });
	
	        var arr = new MatreshkaArrayChild();
	
	        expect(arr[0] instanceof Model).toBeTruthy();
	    });
	
	    it('allows to change Model dynamically', function () {
	        var item = {};
	        var arr = new Class({
	            extends: MatreshkaArray,
	
	            constructor: function () {
	                this.push({});
	            }
	        });
	
	        expect(arr[0]).toEqual(item);
	
	        arr.Model = MatreshkaObject;
	
	        expect(arr[0] instanceof MatreshkaObject).toBeTruthy();
	    });
	
	    it('throws error if Model has wront type', function () {
	        expect(function () {
	            return new Class({
	                extends: MatreshkaArray,
	                Model: undefined,
	                constructor: function () {
	                    this.push({});
	                }
	            });
	        }).toThrow();
	
	        expect(function () {
	            return new Class({
	                extends: MatreshkaArray,
	                Model: {},
	                constructor: function () {
	                    this.push({});
	                }
	            });
	        }).toThrow();
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 469 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Matreshka.Array native methods', function () {
	    it('supports filter method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3, 4, 5);
	        var result = arr.filter(function (item) {
	            return item > 3;
	        });
	
	        expect(result.toJSON(false)).toEqual([4, 5]);
	    });
	
	    it('supports map method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3);
	        var result = arr.map(function (item) {
	            return item * 2;
	        });
	
	        expect(result.toJSON(false)).toEqual([2, 4, 6]);
	    });
	
	    it('supports every method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3);
	        expect(arr.every(function (item) {
	            return item < 4;
	        })).toBe(true);
	        expect(arr.every(function (item) {
	            return item > 4;
	        })).toBe(false);
	    });
	
	    it('supports some method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3);
	        expect(arr.some(function (item) {
	            return item === 2;
	        })).toBe(true);
	        expect(arr.some(function (item) {
	            return item === 4;
	        })).toBe(false);
	    });
	
	    it('supports join method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3);
	        expect(arr.join(' ')).toEqual('1 2 3');
	    });
	
	    it('supports indexOf method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3, 3, 4, 5);
	        expect(arr.indexOf(3)).toEqual(2);
	        expect(arr.indexOf(6)).toEqual(-1);
	    });
	
	    it('supports lastIndexOf method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3, 3, 4, 5);
	        expect(arr.lastIndexOf(3)).toEqual(3);
	        expect(arr.lastIndexOf(6)).toEqual(-1);
	    });
	
	    it('supports slice method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(1, 2, 3);
	        expect(arr.slice(1).toJSON(false)).toEqual([2, 3]);
	    });
	
	    it('supports forEach method', function () {
	        var arr = new MatreshkaArray(1, 2, 3);
	        var callback = createSpy();
	
	        arr.push(1, 2, 3);
	
	        arr.forEach(callback);
	
	        expect(callback).toHaveBeenCalledTimes(arr.length);
	    });
	
	    it('supports reduce method', function () {
	        var arr = new MatreshkaArray(0, 1, 2, 3, 4);
	        var result = arr.reduce(function (previousValue, currentValue) {
	            return previousValue + currentValue;
	        }, 5);
	
	        expect(result).toEqual(15);
	    });
	
	    it('supports reduceRight method', function () {
	        var arr = new MatreshkaArray(0, 1, 2, 3, 4);
	        var result = arr.reduceRight(function (previousValue, currentValue) {
	            return previousValue + currentValue;
	        }, 5);
	
	        expect(result).toEqual(15);
	    });
	
	    it('supports concat method', function () {
	        var arr = new MatreshkaArray(1, 2, 3);
	
	        expect(arr.concat([4, 5, 6]).toJSON(false)).toEqual([1, 2, 3, 4, 5, 6]);
	
	        expect(arr.concat(new MatreshkaArray(4, 5, 6)).toJSON(false)).toEqual([1, 2, 3, 4, 5, 6]);
	    });
	});

/***/ },
/* 470 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies, max-lines */
	describe('Matreshka.Array native modifying methods (including ones that ending by underscore)' + ' and their events', function () {
	    var testFlag = { test: 'ok' };
	    var simpleHandler = void 0;
	    var testFlagHandler = void 0;
	
	    beforeEach(function () {
	        simpleHandler = createSpy();
	        testFlagHandler = createSpy(function (evt) {
	            return expect(evt.test).toEqual('ok');
	        });
	    });
	
	    it('supports push method', function () {
	        var arr = new MatreshkaArray();
	        arr.on('push', simpleHandler);
	        arr.on('add', simpleHandler);
	        arr.on('modify', simpleHandler);
	        var result = arr.push('foo', 'bar');
	        expect(arr.toJSON(false)).toEqual(['foo', 'bar']);
	        expect(arr.length).toEqual(2);
	        expect(result).toEqual(2);
	        expect(simpleHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports push_ method', function () {
	        var arr = new MatreshkaArray();
	
	        arr.on('push', testFlagHandler);
	        arr.on('add', testFlagHandler);
	        arr.on('modify', testFlagHandler);
	
	        var result = arr.push_('foo', 'bar', testFlag);
	        expect(arr.toJSON(false)).toEqual(['foo', 'bar']);
	
	        expect(arr.length).toEqual(2);
	        expect(result).toEqual(2);
	
	        expect(testFlagHandler).toHaveBeenCalledTimes(3);
	
	        // test silent only once
	        arr.push_('baz', 'qux', { silent: true });
	
	        expect(testFlagHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports pop method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar');
	
	        arr.on('pop', simpleHandler);
	        arr.on('remove', simpleHandler);
	        arr.on('modify', simpleHandler);
	
	        var result = arr.pop();
	
	        expect(arr.toJSON(false)).toEqual(['foo']);
	
	        expect(arr.length).toEqual(1);
	        expect(result).toEqual('bar');
	
	        expect(simpleHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports pop_ method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar');
	
	        arr.on('pop', testFlagHandler);
	        arr.on('remove', testFlagHandler);
	        arr.on('modify', testFlagHandler);
	
	        var result = arr.pop_(testFlag);
	
	        expect(arr.toJSON(false)).toEqual(['foo']);
	
	        expect(arr.length).toEqual(1);
	        expect(result).toEqual('bar');
	        expect(testFlagHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports unshift method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar');
	        arr.on('unshift', simpleHandler);
	        arr.on('add', simpleHandler);
	        arr.on('modify', simpleHandler);
	
	        var result = arr.unshift('baz', 'qux');
	
	        expect(arr.toJSON(false)).toEqual(['baz', 'qux', 'foo', 'bar']);
	
	        expect(arr.length).toEqual(4);
	        expect(result).toEqual(4);
	        expect(simpleHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports unshift_ method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar');
	        arr.on('unshift', testFlagHandler);
	        arr.on('add', testFlagHandler);
	        arr.on('modify', testFlagHandler);
	
	        var result = arr.unshift_('baz', 'qux', testFlag);
	
	        expect(arr.toJSON(false)).toEqual(['baz', 'qux', 'foo', 'bar']);
	
	        expect(arr.length).toEqual(4);
	        expect(result).toEqual(4);
	        expect(testFlagHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports shift method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar');
	        arr.on('shift', simpleHandler);
	        arr.on('remove', simpleHandler);
	        arr.on('modify', simpleHandler);
	        var result = arr.shift();
	        expect(arr.length).toEqual(1);
	        expect(arr.toJSON(false)).toEqual(['bar']);
	        expect(result).toEqual('foo');
	        expect(simpleHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports shift_ method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar');
	        arr.on('shift', testFlagHandler);
	        arr.on('remove', testFlagHandler);
	        arr.on('modify', testFlagHandler);
	        var result = arr.shift_(testFlag);
	        expect(arr.length).toEqual(1);
	        expect(arr.toJSON(false)).toEqual(['bar']);
	        expect(result).toEqual('foo');
	        expect(testFlagHandler).toHaveBeenCalledTimes(3);
	    });
	
	    it('supports splice method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar', 'baz', 'qux');
	        arr.on('splice', simpleHandler);
	        arr.on('add', simpleHandler);
	        arr.on('remove', simpleHandler);
	        arr.on('modify', simpleHandler);
	        var result = arr.splice(1, 2, 'puk', 'boo', 'lol');
	
	        expect(arr.toJSON(false)).toEqual(['foo', 'puk', 'boo', 'lol', 'qux']);
	        expect(result.toJSON(false)).toEqual(['bar', 'baz']);
	
	        expect(simpleHandler).toHaveBeenCalledTimes(4);
	    });
	
	    it('supports splice_ method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar', 'baz', 'qux');
	        arr.on('splice', testFlagHandler);
	        arr.on('add', testFlagHandler);
	        arr.on('remove', testFlagHandler);
	        arr.on('modify', testFlagHandler);
	        var result = arr.splice_(1, 2, 'puk', 'boo', 'lol', testFlag);
	
	        expect(arr.toJSON(false)).toEqual(['foo', 'puk', 'boo', 'lol', 'qux']);
	        expect(result.toJSON(false)).toEqual(['bar', 'baz']);
	
	        expect(testFlagHandler).toHaveBeenCalledTimes(4);
	    });
	
	    it('supports sort method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(2, 3, 1);
	        arr.on('sort', simpleHandler);
	        arr.on('modify', simpleHandler);
	        var result = arr.sort();
	        expect(arr.toJSON(false)).toEqual([1, 2, 3]);
	        expect(result).toEqual(arr);
	        expect(simpleHandler).toHaveBeenCalledTimes(2);
	    });
	
	    it('supports sort_ method', function () {
	        var arr = new MatreshkaArray();
	        arr.push(2, 3, 1);
	        arr.on('sort', testFlagHandler);
	        arr.on('modify', testFlagHandler);
	        var result = arr.sort_(testFlag);
	        expect(arr.toJSON(false)).toEqual([1, 2, 3]);
	        expect(result).toEqual(arr);
	        expect(testFlagHandler).toHaveBeenCalledTimes(2);
	    });
	
	    it('supports reverse method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar', 'baz');
	        arr.on('reverse', simpleHandler);
	        arr.on('modify', simpleHandler);
	        var result = arr.reverse();
	        expect(arr.toJSON(false)).toEqual(['baz', 'bar', 'foo']);
	        expect(result).toEqual(arr);
	        expect(simpleHandler).toHaveBeenCalledTimes(2);
	    });
	
	    it('supports reverse_ method', function () {
	        var arr = new MatreshkaArray();
	        arr.push('foo', 'bar', 'baz');
	        arr.on('reverse', testFlagHandler);
	        arr.on('modify', testFlagHandler);
	        var result = arr.reverse_(testFlag);
	        expect(arr.toJSON(false)).toEqual(['baz', 'bar', 'foo']);
	        expect(result).toEqual(arr);
	        expect(testFlagHandler).toHaveBeenCalledTimes(2);
	    });
	});

/***/ },
/* 471 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	describe('Matreshka.Array orderBy method', function () {
	    // tests partially taken from lodash
	    var objects = [{ a: 'x', b: 3 }, { a: 'y', b: 4 }, { a: 'x', b: 1 }, { a: 'y', b: 2 }];
	
	    it('should sort by a single property by a specified order', function () {
	        var arr = new MatreshkaArray(...objects);
	
	        expect(arr.orderBy('a', 'desc').toJSON(false)).toEqual([objects[1], objects[3], objects[0], objects[2]]);
	    });
	
	    it('should sort by multiple properties by specified orders', function () {
	        var arr = new MatreshkaArray(...objects);
	
	        expect(arr.orderBy(['a', 'b'], ['desc', 'asc']).toJSON(false)).toEqual([objects[3], objects[1], objects[2], objects[0]]);
	    });
	
	    it('should sort by a property in ascending order when its order is not specified', function () {
	        var arr = new MatreshkaArray(...objects);
	        var falsey = ['', 0, false, NaN, null, undefined];
	
	        expect(arr.orderBy(['a', 'b']).toJSON(false)).toEqual([objects[2], objects[0], objects[3], objects[1]]);
	
	        falsey.forEach(function (order, index) {
	            var arr = new MatreshkaArray(...objects); // eslint-disable-line no-shadow
	
	            expect(arr.orderBy(['a', 'b'], index ? ['desc', order] : ['desc']).toJSON(false)).toEqual([objects[3], objects[1], objects[2], objects[0]]);
	        });
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 472 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	describe('Matreshka.Array pull method', function () {
	    it('pulls', function () {
	        var arr = new MatreshkaArray();
	        arr.push('a', 'b', 'c');
	        var removed = arr.pull(1);
	
	        expect(removed).toEqual('b');
	
	        expect(arr.toJSON(false)).toEqual(['a', 'c']);
	    });
	
	    it('pulls by given value', function () {
	        var arr = new MatreshkaArray();
	        var object1 = {};
	        var object2 = {};
	        var object3 = {};
	
	        arr.push(object1, object2, object3);
	
	        var removed = arr.pull(object2);
	
	        expect(removed === object2).toBe(true);
	
	        expect(arr.toJSON(false)).toEqual([object1, object3]);
	    });
	
	    it('throws an error if wrong type is passed to pull method', function () {
	        var arr = new MatreshkaArray();
	
	        arr.push('a', 'b', 'c');
	
	        expect(function () {
	            return arr.pull('foo');
	        }).toThrow();
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 473 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	describe('Matreshka.Array recreate method (including trackBy feature)', function () {
	    it('recreates an array via recreate method', function () {
	        var arr = new MatreshkaArray();
	        var object1 = {};
	        var object2 = {};
	        var object3 = {};
	
	        arr.recreate([object1, object2, object3]);
	
	        expect(arr.length).toEqual(3);
	        expect(arr[0] === object1).toBe(true);
	        expect(arr[1] === object2).toBe(true);
	        expect(arr[2] === object3).toBe(true);
	    });
	
	    it('emptifies an array via recreate method', function () {
	        var arr = new MatreshkaArray();
	        var object1 = {};
	        var object2 = {};
	        var object3 = {};
	
	        arr.recreate([object1, object2, object3]);
	
	        expect(arr.length).toEqual(3);
	        arr.recreate();
	
	        expect(arr.length).toEqual(0);
	        expect(arr[0] === undefined).toBe(true);
	        expect(arr[1] === undefined).toBe(true);
	        expect(arr[2] === undefined).toBe(true);
	    });
	
	    it('tracks by _id', function () {
	        var arr = new MatreshkaArray();
	        var object0 = { _id: 0, a: 0 };
	        var object1 = { _id: 1, a: 1 };
	        var object2 = { _id: 2, a: 2 };
	        var object3 = { _id: 0, a: 3 };
	        var object4 = { _id: 1, a: 4 };
	        var object5 = { _id: 3, a: 5 };
	
	        arr.trackBy = '_id';
	
	        arr.recreate([object0, object1, object2]);
	
	        expect(arr[0] === object0).toBe(true);
	        expect(arr[1] === object1).toBe(true);
	        expect(arr[2] === object2).toBe(true);
	
	        arr.recreate([object4, object5, object3]);
	
	        expect(arr[0] === object1).toBe(true);
	        expect(arr[1] === object5).toBe(true);
	        expect(arr[2] === object0).toBe(true);
	
	        expect(arr[0].a).toEqual(4);
	        expect(arr[1].a).toEqual(5);
	        expect(arr[2].a).toEqual(3);
	    });
	
	    it('tracks by $index', function () {
	        var arr = new MatreshkaArray();
	        var object0 = { a: 0 };
	        var object1 = { a: 1 };
	        var object2 = { a: 2 };
	        var object3 = { a: 3 };
	        var object4 = { a: 4 };
	        var object5 = { a: 5 };
	        var object6 = { a: 6 };
	
	        arr.trackBy = '$index';
	
	        arr.recreate([object0, object1, object2]);
	
	        expect(arr[0] === object0).toBe(true);
	        expect(arr[1] === object1).toBe(true);
	        expect(arr[2] === object2).toBe(true);
	
	        arr.recreate([object3, object4, object5, object6]);
	
	        expect(arr[0] === object0).toBe(true);
	        expect(arr[1] === object1).toBe(true);
	        expect(arr[2] === object2).toBe(true);
	        expect(arr[3] === object6).toBe(true);
	
	        expect(arr[0].a).toEqual(3);
	        expect(arr[1].a).toEqual(4);
	        expect(arr[2].a).toEqual(5);
	        expect(arr[3].a).toEqual(6);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 474 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var MatreshkaObject = __webpack_require__(392);
	
	var MatreshkaArray = __webpack_require__(388);
	
	var _srcBinders = __webpack_require__(301);
	
	var html = _srcBinders.html;
	
	var createSpy = __webpack_require__(382);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable import/no-extraneous-dependencies, max-lines */
	
	
	// TODO: Split this file by smaller ones
	describe('Matreshka.Array renderer', function () {
	    var n = 10;
	
	    var Model = function (_MatreshkaObject) {
	        _inherits(Model, _MatreshkaObject);
	
	        function Model(obj) {
	            var _this;
	
	            _classCallCheck(this, Model);
	
	            (_this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this, obj)), _this).on('render', function () {
	                return _this.bindNode('x', ':sandbox span', html(), {
	                    debounceGetValue: false,
	                    debounceSetValue: false
	                });
	            });
	            return _this;
	        }
	
	        return Model;
	    }(MatreshkaObject);
	
	    var Arr = function (_MatreshkaArray) {
	        _inherits(Arr, _MatreshkaArray);
	
	        _createClass(Arr, [{
	            key: 'Model',
	            get: function () {
	                return Model;
	            }
	        }]);
	
	        function Arr() {
	            var _this2;
	
	            _classCallCheck(this, Arr);
	
	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                args[_key] = arguments[_key];
	            }
	
	            (_this2 = _possibleConstructorReturn(this, (Arr.__proto__ || Object.getPrototypeOf(Arr)).call(this, ...args)), _this2).bindNode('sandbox', '<div data-foo="bar"></div>');
	            return _this2;
	        }
	
	        return Arr;
	    }(MatreshkaArray);
	
	    function createArray() {
	        return new Arr();
	    }
	
	    it('renders', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('throws an error when two nodes are given as render for single item', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = function () {
	            return '<div></div><div></div>';
	        };
	
	        expect(function () {
	            arr.push({});
	        }).toThrow();
	    });
	
	    it('throws an error when trying to insert same rendered node twice', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        expect(function () {
	            return arr.push(arr[0]);
	        }).toThrow();
	
	        expect(arr.length).toEqual(n + 1);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('renders via recreate', function () {
	        var arr = createArray();
	        var newItems = [];
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            newItems.push({
	                x: i
	            });
	        }
	
	        arr.recreate(newItems);
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('throws an error when the same objects are passed to recreate', function () {
	        var arr = createArray();
	        var newItems = [];
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            newItems.push({
	                x: i
	            });
	        }
	
	        arr.recreate(newItems);
	
	        expect(function () {
	            arr.recreate([arr[0], arr[0]]);
	        }).toThrow();
	
	        expect(arr.length).toEqual(2);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(1);
	    });
	
	    it('allows to rerender and allows to force rerender', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        arr.nodes.sandbox.innerHTML = '';
	
	        arr.rerender();
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	
	        arr.rerender({
	            forceRerender: true
	        });
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n * 2);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('rerenders when renderer is changed', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('allows to pass dontRender=true to push and forceRerender=false' + ' setting to itemRenderer', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n / 2; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        for (var _i = 0; _i < n / 2; _i++) {
	            arr.push_({
	                x: _i + n / 2
	            }, {
	                dontRender: true
	            });
	        }
	
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n / 2);
	
	        arr.set('itemRenderer', createSpy(function () {
	            return '<div><span></span></div>';
	        }), {
	            forceRerender: false
	        });
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n / 2);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('removes rendered nodes recreate method is used', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = function () {
	            return '<div><span></span></div>';
	        };
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        arr.recreate();
	
	        expect(arr.length).toEqual(0);
	        expect(arr.nodes.sandbox.children.length).toEqual(0);
	    });
	
	    it('renders if silent=true', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.push_({
	                x: i
	            }, {
	                silent: true
	            });
	        }
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('uses bindings parser', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '  <div><span attr="hey {{x}}"></span></div>  ';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.push_({
	                x: i
	            }, {
	                debounce: false
	            });
	        }
	
	        expect(arr[5].nodes.sandbox.firstChild.getAttribute('attr')).toEqual('hey 5');
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('allows to use selector as renderer', function () {
	        var arr = createArray();
	        var div = window.document.createElement('div');
	
	        div.innerHTML = '<span>Hi there <div><span attr="hey {{x}}"></span></div>{{x}}</span>';
	        div.className = 'item-renderer';
	
	        arr.nodes.sandbox.appendChild(div);
	
	        arr.itemRenderer = ':sandbox .item-renderer';
	
	        for (var i = 0; i < n; i++) {
	            arr.push_({
	                x: i
	            }, { debounce: false });
	        }
	
	        expect(arr.nodes.sandbox.children[0].tagName).toEqual('DIV');
	        // the first node is itemrenderer node
	        expect(arr.nodes.sandbox.children[1].childNodes[2].textContent).toEqual('0');
	        expect(arr.length).toEqual(n);
	    });
	
	    it('restores from container via restore method', function () {
	        var arr = createArray();
	        var HTML = '';
	
	        for (var i = 0; i < n; i++) {
	            HTML += '<div><span>Hi there</span></div>';
	        }
	
	        arr.nodes.sandbox.innerHTML = HTML;
	
	        arr.restore();
	
	        expect(arr.length).toEqual(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	        expect(arr.nodes.sandbox.children[0].textContent).toEqual('Hi there');
	    });
	
	    it('restores from nodes with custom selector', function () {
	        var arr = createArray();
	        var HTML = '';
	
	        for (var i = 0; i < n; i++) {
	            HTML += '<div class="' + (i % 2 ? 'fit' : 'nope') + '"><span>Hi there</span></div>';
	        }
	
	        arr.nodes.sandbox.innerHTML = HTML;
	        arr.restore(':sandbox .fit');
	        expect(arr.length).toEqual(n / 2);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	        expect(arr.nodes.sandbox.children[0].textContent).toEqual('Hi there');
	    });
	
	    it('restores from nodes with custom selector when renderer is placed in sandbox', function () {
	        var arr = createArray();
	        var HTML = '';
	
	        arr.itemRenderer = ':sandbox .renderer';
	        HTML += '<script class="renderer"><div></div></script>';
	        for (var i = 0; i < n; i++) {
	            HTML += '<div class="' + (i >= 5 ? 'fit' : 'nope') + '"><span>Hi there</span></div>';
	        }
	
	        arr.nodes.sandbox.innerHTML = HTML;
	        arr.restore(':sandbox .fit');
	        expect(arr.length).toEqual(5);
	        expect(arr.nodes.sandbox.children.length).toEqual(n + 1); // script plus number of divs
	        expect(arr.nodes.sandbox.children[1].textContent).toEqual('Hi there');
	    });
	
	    it('restores from external node', function () {
	        var arr = createArray();
	        var div = window.document.createElement('div');
	        var HTML = '';
	
	        div.className = 'restore-items';
	
	        for (var i = 0; i < n; i++) {
	            HTML += '<div><span>Hi there</span></div>';
	        }
	
	        div.innerHTML = HTML;
	        window.document.body.appendChild(div);
	        arr.restore('.restore-items > div');
	        window.document.body.removeChild(div);
	        expect(arr.length).toEqual(n);
	        expect(arr[0].nodes.sandbox.textContent).toEqual('Hi there');
	    });
	
	    it('allows to sort', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = '<span><span></span></span>';
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        arr.reverse();
	        expect(arr.length).toEqual(n);
	
	        expect(+arr[0].nodes.sandbox.textContent).toEqual(n - 1);
	
	        expect(+arr[n - 1].nodes.sandbox.textContent).toEqual(0);
	
	        expect(+arr.nodes.sandbox.children[0].textContent).toEqual(n - 1);
	
	        expect(+arr.nodes.sandbox.children[n - 1].textContent).toEqual(0);
	
	        arr.sort(function (a, b) {
	            return a.x > b.x ? 1 : -1;
	        }); // eslint-disable-line no-confusing-arrow
	
	        expect(+arr[0].nodes.sandbox.textContent).toEqual(0);
	
	        expect(+arr[n - 1].nodes.sandbox.textContent).toEqual(n - 1);
	
	        expect(+arr.nodes.sandbox.children[0].textContent).toEqual(0);
	
	        expect(+arr.nodes.sandbox.children[n - 1].textContent).toEqual(n - 1);
	    });
	
	    xit('orders by key', function () {
	        // detailed test for orderby is
	        var arr = createArray();
	
	        arr.itemRenderer = '<span><span></span></span>';
	
	        for (var i = 0; i < n; i++) {
	            arr.push({ x: i });
	        }
	
	        arr.orderBy('x', 'desc');
	        expect(arr.length).toEqual(n);
	        expect(arr[0].sandbox.textContent).toEqual(String(n - 1));
	        expect(arr[n - 1].sandbox.textContent).toEqual(String(0));
	        expect(arr.sandbox.children[0].textContent).toEqual(String(n - 1));
	        expect(arr.sandbox.children[n - 1].textContent).toEqual(String(0));
	
	        arr.orderBy('x', 'asc');
	
	        expect(arr[0].sandbox.textContent).toEqual(String(0));
	        expect(arr[n - 1].sandbox.textContent).toEqual(String(n - 1));
	        expect(arr.sandbox.children[0].textContent).toEqual(String(0));
	        expect(arr.sandbox.children[n - 1].textContent).toEqual(String(n - 1));
	    });
	
	    it('allows to unshift', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.unshift({
	                x: i
	            });
	        }
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	
	        var index = 0;
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = Array.from(arr.nodes.sandbox.children)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var node = _step.value;
	
	                expect(+node.querySelector('span').innerHTML).toEqual(n - index - 1);
	                index += 1;
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    });
	
	    it('allows to unshift', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.unshift({
	                x: i
	            });
	        }
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	
	        var index = 0;
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	            for (var _iterator2 = Array.from(arr.nodes.sandbox.children)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var node = _step2.value;
	
	                expect(+node.querySelector('span').innerHTML).toEqual(n - index - 1);
	                index += 1;
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	    });
	
	    it('allows to call pull pop and shift', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = '<span><span></span></span>';
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        arr.pull(1);
	        expect(arr.length).toEqual(n - 1);
	        expect(+arr[1].nodes.sandbox.textContent).toEqual(2);
	
	        arr.pop();
	        expect(arr.length).toEqual(n - 2);
	        expect(+arr[n - 3].nodes.sandbox.textContent).toEqual(n - 2);
	
	        arr.shift();
	        expect(arr.length).toEqual(n - 3);
	        expect(+arr[0].nodes.sandbox.textContent).toEqual(2);
	    });
	
	    xit('alows to use custom trackBy value', function () {});
	
	    xit('alows to use $index as trackBy value', function () {});
	
	    it('renders on splice', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = '<span><span></span></span>';
	
	        for (var i = 0; i < n; i++) {
	            arr.push({ x: i });
	        }
	
	        arr.splice(1, 2, {
	            x: 'foo'
	        }, {
	            x: 'bar'
	        });
	
	        expect(arr.length).toEqual(n);
	        expect(arr[1].nodes.sandbox.textContent).toEqual('foo');
	        expect(arr[2].nodes.sandbox.textContent).toEqual('bar');
	    });
	
	    it('triggers "afterrender" event', function () {
	        var arr = new MatreshkaArray();
	        var handler = void 0;
	        var item = void 0;
	
	        arr.itemRenderer = createSpy(function () {
	            return '<div><span></span></div>';
	        });
	        arr.bindNode('container', '<div></div>');
	
	        handler = createSpy();
	        item = new MatreshkaObject();
	        item.on('afterrender', handler);
	        arr.push(item);
	        expect(handler).toHaveBeenCalledTimes(1);
	
	        handler = createSpy();
	        item = new MatreshkaObject();
	        item.on('afterrender', handler);
	        arr.unshift(item);
	        expect(handler).toHaveBeenCalledTimes(1);
	
	        handler = createSpy();
	        item = new MatreshkaObject();
	        item.on('afterrender', handler);
	        arr.splice(0, 0, item);
	        expect(handler).toHaveBeenCalledTimes(1);
	    });
	
	    it('trims itemRenderer', function () {
	        var arr = createArray();
	
	        arr.itemRenderer = createSpy(function () {
	            return '         <div><span></span></div>            ';
	        });
	
	        for (var i = 0; i < n; i++) {
	            arr.push({
	                x: i
	            });
	        }
	
	        expect(arr.length).toEqual(n);
	        expect(arr.itemRenderer).toHaveBeenCalledTimes(n);
	        expect(arr.nodes.sandbox.children.length).toEqual(n);
	    });
	
	    it('makes possible to move sandbox via moveSandbox=true event option', function () {
	        var arr = createArray();
	        var arr2 = createArray();
	        arr.itemRenderer = arr2.itemRenderer = '<div><span></span></div>';
	
	        arr.push({});
	
	        var arrItemNode = arr.nodes.sandbox.children[0];
	
	        // just in case
	        expect(arrItemNode).toBeTruthy();
	
	        arr2.push_(arr[0], {
	            moveSandbox: true
	        });
	
	        expect(arr2.nodes.sandbox.children[0]).toEqual(arrItemNode);
	    });
	});

/***/ },
/* 475 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable import/no-extraneous-dependencies */
	
	
	describe('Matreshka.Array static methods (of and from)', function () {
	    it('converts an array to Matreshka.Array instance via Matreshka.Array.from', function () {
	        var items = [1, 2, 3];
	        var arr = MatreshkaArray.from(items);
	
	        expect(arr instanceof MatreshkaArray).toBe(true);
	        expect(arr.toJSON(false)).toEqual(items);
	    });
	
	    it('allows to inherit Matreshka.Array.from', function () {
	        var items = [1, 2, 3];
	
	        var OwnerClass = function (_MatreshkaArray) {
	            _inherits(OwnerClass, _MatreshkaArray);
	
	            function OwnerClass() {
	                _classCallCheck(this, OwnerClass);
	
	                return _possibleConstructorReturn(this, (OwnerClass.__proto__ || Object.getPrototypeOf(OwnerClass)).apply(this, arguments));
	            }
	
	            return OwnerClass;
	        }(MatreshkaArray);
	
	        var arr = OwnerClass.from(items);
	
	        expect(arr instanceof OwnerClass).toBe(true);
	        expect(arr.toJSON(false)).toEqual(items);
	    });
	
	    it('allows to assign Matreshka.Array.from to a variable', function () {
	        var items = [1, 2, 3];
	        var from = MatreshkaArray.from;
	        var arr = from(items);
	
	        expect(arr instanceof MatreshkaArray).toBe(true);
	        expect(arr.toJSON(false)).toEqual(items);
	    });
	
	    it('converts arguments to Matreshka.Array instance via Matreshka.Array.of', function () {
	        var items = [1, 2, 3];
	        var arr = MatreshkaArray.of(...items);
	
	        expect(arr instanceof MatreshkaArray).toBe(true);
	        expect(arr.toJSON(false)).toEqual(items);
	    });
	
	    it('allows to inherit Matreshka.Array.of', function () {
	        var items = [1, 2, 3];
	
	        var OwnerClass = function (_MatreshkaArray2) {
	            _inherits(OwnerClass, _MatreshkaArray2);
	
	            function OwnerClass() {
	                _classCallCheck(this, OwnerClass);
	
	                return _possibleConstructorReturn(this, (OwnerClass.__proto__ || Object.getPrototypeOf(OwnerClass)).apply(this, arguments));
	            }
	
	            return OwnerClass;
	        }(MatreshkaArray);
	
	        var arr = OwnerClass.of(...items);
	
	        expect(arr instanceof OwnerClass).toBe(true);
	        expect(arr.toJSON(false)).toEqual(items);
	    });
	
	    it('allows to assign Matreshka.Array.of to a variable', function () {
	        var items = [1, 2, 3];
	        var of = MatreshkaArray.of;
	        var arr = of(...items);
	
	        expect(arr instanceof MatreshkaArray).toBe(true);
	        expect(arr.toJSON(false)).toEqual(items);
	    });
	});

/***/ },
/* 476 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaArray = __webpack_require__(388);
	
	describe('Matreshka.Array toJSON method', function () {
	    it('is converted to JSON', function () {
	        var arr = new MatreshkaArray(1, 2, new MatreshkaArray(3, 4));
	
	        expect(arr.toJSON()).toEqual([1, 2, [3, 4]]);
	    });
	
	    it('is converted to JSON with recursive=false parameter', function () {
	        var arr = new MatreshkaArray(1, 2, new MatreshkaArray(3, 4));
	
	        expect(arr.toJSON(false)).toEqual([1, 2, arr[2]]);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 477 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(465);
	
	var MatreshkaObject = __webpack_require__(392);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Matreshka.Object class', function () {
	    var methodNames = '_afterInit,\n    setData,\n    addDataKeys,\n    removeDataKeys,\n    isDataKey,\n    keys,\n    keyOf,\n    toJSON,\n    each'.split(/\s*,\s*/);
	
	    it('an instance should have isMatreshka=true and isMatreshkaObject=true properties', function () {
	        var obj = new MatreshkaObject();
	        expect(obj.isMatreshka).toEqual(true);
	        expect(obj.isMatreshkaObject).toEqual(true);
	    });
	
	    it('includes all instance methods', function () {
	        var obj = new MatreshkaObject();
	        for (var i = 0; i < methodNames.length; i++) {
	            var name = methodNames[i];
	            expect(typeof obj[name]).toEqual('function', name + ' method is missing');
	        }
	
	        expect(typeof obj.jset).toEqual('function', 'jset method is missing');
	        expect(obj.jset).toEqual(obj.setData);
	    });
	
	    it('is a property of Matreshka', function () {
	        expect(Matreshka.Object).toEqual(MatreshkaObject);
	    });
	});

/***/ },
/* 478 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaObject = __webpack_require__(392);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Matreshka.Object data keys', function () {
	    it('the class accepts an object as an argument', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	
	        expect(obj.keys()).toEqual(['a']);
	    });
	
	    it('sets data via setData', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	        obj.setData('b', 2);
	        expect(obj.a).toEqual(1);
	        expect(obj.b).toEqual(2);
	        expect(obj.keys()).toEqual(['a', 'b']);
	    });
	
	    it('replaces data via setData and replaceData=true', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	        obj.setData('b', 2, {
	            replaceData: true
	        });
	
	        expect(obj.a).toEqual(1);
	        expect(obj.b).toEqual(2);
	        expect(obj.keys()).toEqual(['b']);
	    });
	
	    it('allows to pass key-value object to setData', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	
	        obj.setData({
	            b: 2,
	            c: 3
	        });
	        expect(obj.a).toEqual(1);
	        expect(obj.b).toEqual(2);
	        expect(obj.c).toEqual(3);
	        expect(obj.keys()).toEqual(['a', 'b', 'c']);
	    });
	
	    it('allows to pass key-value object and replace data via setData and replaceData=true', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	
	        obj.setData({
	            b: 2,
	            c: 3
	        }, {
	            replaceData: true
	        });
	
	        expect(obj.a).toEqual(1);
	        expect(obj.b).toEqual(2);
	        expect(obj.c).toEqual(3);
	        expect(obj.keys()).toEqual(['b', 'c']);
	    });
	
	    it('adds data keys', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	        obj.addDataKeys('c', 'd');
	        obj.addDataKeys(['e', 'f']);
	        expect(obj.keys()).toEqual(['a', 'c', 'd', 'e', 'f']);
	    });
	
	    it('removes data keys', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	        obj.addDataKeys('c', 'd');
	        obj.addDataKeys(['e', 'f']);
	        obj.removeDataKeys('c', 'd');
	        obj.removeDataKeys(['e', 'f']);
	        expect(obj.keys()).toEqual(['a']);
	    });
	
	    it('triggers "modify" when data keys are added', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	        obj.on('modify', handler);
	        obj.addDataKeys('c', 'd');
	        expect(handler).toHaveBeenCalledTimes(2);
	    });
	
	    it('triggers "modify" and "remove" when data keys are removed', function () {
	        var obj = new MatreshkaObject();
	        var modifyHandler = createSpy();
	        var removeHandler = createSpy();
	        obj.addDataKeys('c', 'd');
	        obj.on('modify', modifyHandler);
	        obj.on('remove', removeHandler);
	        obj.removeDataKeys('c', 'd');
	        expect(modifyHandler).toHaveBeenCalledTimes(2);
	        expect(removeHandler).toHaveBeenCalledTimes(2);
	    });
	
	    it('does not trigger "modify" and "remove" when data keys are not removed', function () {
	        var obj = new MatreshkaObject();
	        var handler = createSpy();
	        obj.addDataKeys('c', 'd');
	        obj.on('modify', handler);
	        obj.on('remove', handler);
	        obj.removeDataKeys('e', 'f');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('triggers "modify" and "set" when data is changed', function () {
	        var obj = new MatreshkaObject();
	        var modifyHandler = createSpy();
	        var setHandler = createSpy();
	        obj.addDataKeys('a');
	        obj.on('modify', modifyHandler);
	        obj.on('set', setHandler);
	        obj.a = 'foo';
	        expect(modifyHandler).toHaveBeenCalledTimes(1);
	        expect(setHandler).toHaveBeenCalledTimes(1);
	    });
	
	    it('triggers "modify" and "remove" when data is removed', function () {
	        var obj = new MatreshkaObject();
	        var modifyHandler = createSpy();
	        var removeHandler = createSpy();
	        obj.addDataKeys('a');
	        obj.on('modify', modifyHandler);
	        obj.on('remove', removeHandler);
	        obj.remove('a');
	        expect(modifyHandler).toHaveBeenCalledTimes(1);
	        expect(removeHandler).toHaveBeenCalledTimes(1);
	    });
	
	    it('does not trigger "modify" and "remove" when non-data is removed', function () {
	        var obj = new MatreshkaObject({
	            a: 1
	        });
	        var handler = createSpy();
	        obj.b = 'foo';
	        obj.on('modify', handler);
	        obj.on('remove', handler);
	        obj.remove('b');
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('checks is data key by isDataKey method', function () {
	        var obj = new MatreshkaObject();
	        obj.setData('a', 1);
	        obj.b = 2;
	        expect(obj.isDataKey('a')).toBeTruthy();
	        expect(obj.isDataKey('b')).toBeFalsy();
	    });
	
	    it('finds a key of an object', function () {
	        var toFind = {};
	        var obj = new MatreshkaObject({
	            a: 42,
	            b: toFind,
	            c: 'yop'
	        });
	
	        expect(obj.keyOf(toFind)).toEqual('b');
	    });
	});

/***/ },
/* 479 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-extraneous-dependencies */
	
	
	var MatreshkaObject = __webpack_require__(392);
	
	var createSpy = __webpack_require__(382);
	
	describe('Matreshka.Object each', function () {
	    it('is iterated via each', function () {
	        var obj = new MatreshkaObject({
	            a: 'foo',
	            b: 'bar',
	            c: 'baz'
	        });
	        var keys = ['a', 'b', 'c'];
	        var values = ['foo', 'bar', 'baz'];
	        var context = {};
	        var i = 0;
	        var callback = createSpy(function (value, key, itSelf) {
	            expect(value).toEqual(values[i]);
	            expect(key).toEqual(keys[i]);
	            expect(itSelf).toEqual(obj);
	            expect(_this).toEqual(context);
	            i += 1;
	        });
	
	        obj.each(callback, context);
	
	        expect(callback).toHaveBeenCalledTimes(3);
	    });
	});

/***/ },
/* 480 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Class = __webpack_require__(386);
	
	var MatreshkaObject = __webpack_require__(392);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Matreshka.Object iterator', function () {
	    var symbolIt = typeof Symbol === 'function' ? it : xit;
	
	    symbolIt('allows to iterate an instance via for..of', function () {
	        var obj = new MatreshkaObject({
	            a: 'foo',
	            b: 'bar',
	            c: 'baz'
	        });
	        var values = ['foo', 'bar', 'baz'];
	        var i = 0;
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	            for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var item = _step.value;
	
	                expect(item).toEqual(values[i]);
	                i += 1;
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    });
	
	    symbolIt('allows to iterate an instance of inherited class via for..of', function () {
	        var Child = Class({
	            extends: MatreshkaObject,
	            constructor: function (data) {
	                this.setData(data);
	            }
	        });
	        var obj = new Child({
	            a: 'foo',
	            b: 'bar',
	            c: 'baz'
	        });
	        var values = ['foo', 'bar', 'baz'];
	        var i = 0;
	
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	            for (var _iterator2 = obj[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var item = _step2.value;
	
	                expect(item).toEqual(values[i]);
	                i += 1;
	            }
	        } catch (err) {
	            _didIteratorError2 = true;
	            _iteratorError2 = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                    _iterator2.return();
	                }
	            } finally {
	                if (_didIteratorError2) {
	                    throw _iteratorError2;
	                }
	            }
	        }
	    });
	});

/***/ },
/* 481 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MatreshkaObject = __webpack_require__(392);
	
	describe('Matreshka.Object toJSON method', function () {
	    it('is converted to JSON object', function () {
	        var obj = new MatreshkaObject({
	            a: 42,
	            b: 'yop',
	            c: new MatreshkaObject({
	                d: 'ya'
	            })
	        });
	        var result = obj.toJSON();
	
	        expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
	        expect(result.a).toEqual(42);
	        expect(result.b).toEqual('yop');
	        expect(result.c.d).toEqual('ya');
	        expect(result.c).not.toEqual(obj.c);
	    });
	
	    it('is converted to JSON with recursive=false parameter', function () {
	        var obj = new MatreshkaObject({
	            a: 42,
	            b: 'yop',
	            c: new MatreshkaObject({
	                d: 'ya'
	            })
	        });
	        var result = obj.toJSON(false);
	
	        expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
	        expect(result.a).toEqual(42);
	        expect(result.b).toEqual('yop');
	        expect(result.c.d).toEqual('ya');
	        expect(result.c).toEqual(obj.c);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 482 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Matreshka = __webpack_require__(465);
	
	var MatreshkaOnly = __webpack_require__(389);
	
	var initMK = __webpack_require__(317);
	
	var defineProp = __webpack_require__(319);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('Matreshka class', function () {
	    var universalMethodsNames = 'on,\n        once,\n        onDebounce,\n        off,\n        trigger,\n        calc,\n        bindNode,\n        unbindNode,\n        bindOptionalNode,\n        bindSandbox,\n        parseBindings,\n        select,\n        selectAll,\n        set,\n        remove,\n        instantiate,\n        mediate'.split(/\s*,\s*/);
	
	    it('an instance should have isMatreshka=true property', function () {
	        var obj = new Matreshka();
	        expect(obj.isMatreshka).toEqual(true);
	    });
	
	    it('an instance should have nodes and $nodes properties', function () {
	        var obj = new Matreshka();
	        expect(typeof obj.nodes).toEqual('object');
	        expect(typeof obj.$nodes).toEqual('object');
	    });
	
	    it('includes all instance methods', function () {
	        var obj = new Matreshka();
	        for (var i = 0; i < universalMethodsNames.length; i++) {
	            var name = universalMethodsNames[i];
	            expect(typeof obj[name]).toEqual('function');
	        }
	
	        expect(typeof obj._afterInit).toEqual('function');
	
	        // test selectAll alias
	        expect(typeof obj.$).toEqual('function');
	        expect(obj.$).toEqual(obj.selectAll);
	    });
	
	    it('includes all static members', function () {
	        for (var i = 0; i < universalMethodsNames.length; i++) {
	            var name = universalMethodsNames[i];
	            expect(typeof Matreshka[name]).toEqual('function');
	        }
	
	        expect(typeof Matreshka.binders).toEqual('object');
	        expect(typeof Matreshka.parserBrackers).toEqual('object');
	        expect(typeof Matreshka.defaultBinders).toEqual('object');
	        expect(typeof Matreshka.lookForBinder).toEqual('function');
	        expect(typeof Matreshka.Class).toEqual('function');
	        expect(typeof Matreshka.Array).toEqual('function');
	        expect(typeof Matreshka.Object).toEqual('function');
	        expect(typeof Matreshka.toMatreshka).toEqual('function');
	        expect(typeof Matreshka.useDOMLibrary).toEqual('function');
	    });
	
	    it('exports the same thing from index.js and matreshka/index.js', function () {
	        expect(Matreshka).toEqual(MatreshkaOnly);
	    });
	
	    it('does not allow to get and set "sandbox" property', function () {
	        var obj = {};
	
	        initMK(obj);
	
	        defineProp(obj, 'sandbox');
	
	        expect(function () {
	            obj.sandbox; // eslint-disable-line no-unused-expressions
	        }).toThrow();
	
	        expect(function () {
	            obj.sandbox = 'foo';
	        }).toThrow();
	    });
	
	    it('does not allow to get and set "container" property\n        when an object has a property isMatreshkaArray=true', function () {
	        var obj = {
	            isMatreshkaArray: true
	        };
	
	        initMK(obj);
	
	        defineProp(obj, 'container');
	
	        expect(function () {
	            obj.container; // eslint-disable-line no-unused-expressions
	        }).toThrow();
	
	        expect(function () {
	            obj.container = 'foo';
	        }).toThrow();
	    });
	});

/***/ },
/* 483 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mediate = __webpack_require__(416);
	
	describe('mediate', function () {
	    it('mediates', function () {
	        var obj = {};
	
	        mediate(obj, 'a', function (v) {
	            return Number(v);
	        });
	        mediate(obj, ['b', 'c'], function (v) {
	            return Number(v);
	        });
	
	        obj.a = obj.b = obj.c = '123';
	
	        expect(typeof obj.a).toEqual('number');
	        expect(typeof obj.b).toEqual('number');
	        expect(typeof obj.c).toEqual('number');
	    });
	
	    it('mediates in context of an object which has isMatreshka=true property', function () {
	        var obj = { isMatreshka: true };
	
	        mediate.call(obj, 'a', function (v) {
	            return Number(v);
	        });
	        mediate.call(obj, ['b', 'c'], function (v) {
	            return Number(v);
	        });
	
	        obj.a = obj.b = obj.c = '123';
	
	        expect(typeof obj.a).toEqual('number');
	        expect(typeof obj.b).toEqual('number');
	        expect(typeof obj.c).toEqual('number');
	    });
	
	    it('mediates using key-mediator object', function () {
	        var obj = {};
	
	        mediate(obj, {
	            a: function (v) {
	                return Number(v);
	            },
	            b: function (v) {
	                return Number(v);
	            }
	        });
	
	        obj.a = obj.b = '123';
	
	        expect(typeof obj.a).toEqual('number');
	        expect(typeof obj.b).toEqual('number');
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 484 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(331);
	
	describe('mq.fn.add', function () {
	    it('adds once', function () {
	        var el1 = window.document.createElement('div');
	        var el2 = window.document.createElement('div');
	        var el3 = window.document.createElement('div');
	        var el4 = window.document.createElement('div');
	        var el5 = window.document.createElement('div');
	
	        expect(Array.from($([el1, el2, el3]).add([el2, el3, el4, el5]))).toEqual([el1, el2, el3, el4, el5]);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 485 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _this = this; /* eslint-disable import/no-extraneous-dependencies */
	
	
	var $ = __webpack_require__(331);
	
	var simulateClick = __webpack_require__(460);
	
	describe('mq events', function () {
	    var testSandbox = void 0;
	    var child1 = void 0;
	    var child2 = void 0;
	    var grandchild1 = void 0;
	    var handler = void 0;
	
	    beforeEach(function () {
	        testSandbox = window.document.createElement('div');
	
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
	
	    it('adds event listener', function () {
	        $(testSandbox).on('click', handler);
	        simulateClick(testSandbox);
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('removes event listener (listener is specified)', function () {
	        $(testSandbox).on('click', handler).off('click', handler);
	        simulateClick(testSandbox);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes event listener (listener is not specified)', function () {
	        $(testSandbox).on('click', handler).off('click');
	        simulateClick(testSandbox);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('adds namespaced listener', function () {
	        $(testSandbox).on('click.yo', handler);
	        simulateClick(testSandbox);
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('removes namespaced listener (listener is specified)', function () {
	        $(testSandbox).on('click.yo', handler).off('click.yo', handler);
	        simulateClick(testSandbox);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes namespaced listener (listener is not specified)', function () {
	        $(testSandbox).on('click.yo', handler).off('click.yo');
	        simulateClick(testSandbox);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('adds bubbling event listener', function () {
	        $(testSandbox).on('click', handler);
	        simulateClick(grandchild1);
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('adds delegated event listener', function () {
	        $(testSandbox).on('click', '.child1', handler);
	        simulateClick(child1);
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('adds delegated event listener (click on grandchildren)', function () {
	        $(testSandbox).on('click', '.child1', handler);
	        simulateClick(grandchild1);
	        expect(handler).toHaveBeenCalled();
	    });
	
	    it('does not trigger when clicked on wrong child', function () {
	        $(testSandbox).on('click', '.child2', handler);
	        simulateClick(grandchild1);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes delegated event listener (selector and handler are specified)', function () {
	        $(testSandbox).on('click', '.child1', handler).off('click', '.child1', handler);
	        simulateClick(child1);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes delegated event listener (selector is specified, handler is not specified)', function () {
	        $(testSandbox).on('click', '.child1', handler).off('click', '.child1');
	        simulateClick(child1);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes delegated event listener (selector is not specified, handler is specified)', function () {
	        $(testSandbox).on('click', '.child1', handler).off('click', handler);
	        simulateClick(child1);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('removes delegated event listener (selector and handler are not specified)', function () {
	        $(testSandbox).on('click', '.child1', handler).off('click');
	        simulateClick(child1);
	        expect(handler).not.toHaveBeenCalled();
	    });
	
	    it('stops propagation', function () {
	        $(testSandbox).on('click', handler);
	        $(child1).on('click', function (evt) {
	            return evt.stopPropagation();
	        });
	        simulateClick(child1);
	        expect(handler).not.toHaveBeenCalled();
	    });
	});

/***/ },
/* 486 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(331);
	
	describe('mq initialization', function () {
	    var testSandbox = void 0;
	
	    beforeEach(function () {
	        testSandbox = window.document.createElement('div');
	
	        testSandbox.innerHTML = '\n            <div class="test">\n                <div class="test-1"></div>\n                <div class="test-2"></div>\n                <div class="test-3"></div>\n            </div>\n        ';
	    });
	
	    it('accepts window', function () {
	        var result = $(window);
	        expect(result.length).toEqual(1);
	        expect(result[0]).toEqual(window);
	    });
	
	    it('accepts document', function () {
	        var result = $(window.document);
	        expect(result.length).toEqual(1);
	        expect(result[0]).toEqual(window.document);
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
	
	    it('converts one element', function () {
	        var element = window.document.querySelector('*');
	        var result = $(element);
	
	        expect(result.length).toEqual(1);
	        expect(element).toEqual(result[0]);
	    });
	
	    it('uses context', function () {
	        expect($('.test-1', testSandbox).length).toEqual(1);
	    });
	
	    it('does not use wrong context', function () {
	        expect($('.test-1', '.wrong-context').length).toEqual(0);
	    });
	
	    it('allows to pass null', function () {
	        expect($(null).length).toEqual(0);
	    });
	
	    it('allows to pass nothing', function () {
	        expect($().length).toEqual(0);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 487 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $ = __webpack_require__(331);
	
	describe('mq.parseHTML', function () {
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
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 488 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var remove = __webpack_require__(414);
	
	var on = __webpack_require__(406);
	
	var bindNode = __webpack_require__(316);
	
	var trigger = __webpack_require__(411);
	
	var select = __webpack_require__(379);
	
	var createSpy = __webpack_require__(382);
	
	/* eslint-disable import/no-extraneous-dependencies */
	describe('remove', function () {
	    it('removes a property', function () {
	        var obj = {
	            a: 1
	        };
	
	        remove(obj, 'a');
	        expect('a' in obj).toBe(false);
	    });
	
	    it('removes a property in context of an object which has isMatreshka=true property', function () {
	        var obj = {
	            a: 1,
	            isMatreshka: true
	        };
	
	        remove.call(obj, 'a');
	        expect('a' in obj).toBe(false);
	    });
	
	    it('removes a property and its events', function () {
	        var obj = {
	            a: 1
	        };
	        var handler = createSpy();
	
	        on(obj, 'change:a', handler);
	        trigger(obj, 'change:a');
	        expect(handler).toHaveBeenCalledTimes(1);
	        remove(obj, 'a');
	        trigger(obj, 'change:a');
	        expect(handler).toHaveBeenCalledTimes(1);
	        expect('a' in obj).toBe(false);
	    });
	
	    it('removes a property and its bindings', function () {
	        var obj = {
	            a: 1
	        };
	        var node = window.document.createElement('div');
	
	        bindNode(obj, 'a', node);
	        expect(select(obj, ':bound(a)')).toEqual(node);
	        remove(obj, 'a');
	        expect(select(obj, ':bound(a)')).toEqual(null);
	        expect('a' in obj).toBe(false);
	    });
	});

/***/ },
/* 489 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var set = __webpack_require__(320);
	
	describe('set', function () {
	    it('sets', function () {
	        var obj = {};
	        set(obj, 'x', 42);
	        expect(obj.x).toEqual(42);
	
	        set(obj, {
	            y: 1,
	            z: 2
	        });
	        expect(obj.y).toEqual(1);
	        expect(obj.z).toEqual(2);
	    });
	
	    it('sets a property in context of an object which has isMatreshka=true property', function () {
	        var obj = { isMatreshka: true };
	        set.call(obj, 'x', 42);
	        expect(obj.x).toEqual(42);
	        set.call(obj, {
	            y: 1,
	            z: 2
	        });
	        expect(obj.y).toEqual(1);
	        expect(obj.z).toEqual(2);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 490 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toMatreshka = __webpack_require__(391);
	
	var MatreshkaObject = __webpack_require__(392);
	
	var MatreshkaArray = __webpack_require__(388);
	
	describe('toMatreshka function', function () {
	    it('converts to Matreshka via Matreshka.toMatreshka', function () {
	        var obj = toMatreshka({
	            a: 1,
	            b: [1, 2, 3, {
	                foo: 'bar'
	            }]
	        });
	
	        expect(obj.constructor).toEqual(MatreshkaObject);
	        expect(obj.b.constructor).toEqual(MatreshkaArray);
	        expect(obj.b[3].constructor).toEqual(MatreshkaObject);
	
	        expect(obj.a).toEqual(1);
	        expect(obj.b[0]).toEqual(1);
	        expect(obj.b[1]).toEqual(2);
	        expect(obj.b[2]).toEqual(3);
	        expect(obj.b[3].foo).toEqual('bar');
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 491 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dom = __webpack_require__(329);
	
	var mq = __webpack_require__(331);
	
	var useDOMLibrary = __webpack_require__(417);
	
	describe('useDOMLibrary function', function () {
	    it('allows to change DOM library', function () {
	        var dummyLibrary = function () {};
	        useDOMLibrary(dummyLibrary);
	        expect(dom.$).toEqual(dummyLibrary);
	    });
	
	    it('sets mq as DOM library when falsy is passed', function () {
	        useDOMLibrary(null);
	        expect(dom.$).toEqual(mq);
	    });
	}); /* eslint-disable import/no-extraneous-dependencies */

/***/ },
/* 492 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_core/defineprop.js": 319,
		"./_core/defs.js": 318,
		"./_core/init.js": 317,
		"./_dom/default-dollar.js": 330,
		"./_dom/index.js": 329,
		"./_dom/mq/_data.js": 336,
		"./_dom/mq/_html2nodelist.js": 333,
		"./_dom/mq/_init.js": 332,
		"./_dom/mq/add.js": 338,
		"./_dom/mq/index.js": 331,
		"./_dom/mq/off.js": 337,
		"./_dom/mq/on.js": 335,
		"./_dom/mq/parsehtml.js": 334,
		"./_helpers/apply.js": 322,
		"./_helpers/assign.js": 339,
		"./_helpers/checkobjecttype.js": 323,
		"./_helpers/debounce.js": 356,
		"./_helpers/deepfind.js": 370,
		"./_helpers/is.js": 325,
		"./_helpers/matreshkaerror.js": 324,
		"./_helpers/toarray.js": 328,
		"./array/_afterinit.js": 420,
		"./array/_cheaprecreate.js": 423,
		"./array/_processrendering/checkalreadyrendered.js": 429,
		"./array/_processrendering/getalreadyrendered.js": 432,
		"./array/_processrendering/index.js": 426,
		"./array/_processrendering/processpush.js": 427,
		"./array/_processrendering/processrecreate.js": 431,
		"./array/_processrendering/processremove.js": 434,
		"./array/_processrendering/processrerender.js": 435,
		"./array/_processrendering/processsort.js": 433,
		"./array/_processrendering/processspliceadd.js": 436,
		"./array/_processrendering/processunshift.js": 430,
		"./array/_processrendering/renderitemnode.js": 428,
		"./array/_prototype.js": 419,
		"./array/_pseudonativemethods/concat.js": 451,
		"./array/_pseudonativemethods/createaddingmethod.js": 449,
		"./array/_pseudonativemethods/createpseudonativemethod.js": 445,
		"./array/_pseudonativemethods/createremovingmethod.js": 448,
		"./array/_pseudonativemethods/createsortingmethod.js": 447,
		"./array/_pseudonativemethods/createsplice.js": 450,
		"./array/_pseudonativemethods/index.js": 444,
		"./array/_reportmodified.js": 425,
		"./array/_staticmembers.js": 453,
		"./array/_tomatreshkaarray.js": 446,
		"./array/from.js": 454,
		"./array/index.js": 388,
		"./array/iterator.js": 452,
		"./array/mediateitem.js": 421,
		"./array/of.js": 455,
		"./array/orderby/_pureorderby.js": 424,
		"./array/orderby/index.js": 422,
		"./array/pull.js": 437,
		"./array/recreate/_updateobject.js": 440,
		"./array/recreate/_updatetracked.js": 439,
		"./array/recreate/index.js": 438,
		"./array/rerender.js": 441,
		"./array/restore.js": 442,
		"./array/tojson.js": 443,
		"./binders/_classlist.js": 305,
		"./binders/attr.js": 307,
		"./binders/classname.js": 304,
		"./binders/dataset.js": 315,
		"./binders/display.js": 303,
		"./binders/html.js": 302,
		"./binders/index.js": 301,
		"./binders/input.js": 308,
		"./binders/output.js": 309,
		"./binders/progress.js": 312,
		"./binders/prop.js": 306,
		"./binders/select.js": 311,
		"./binders/style.js": 314,
		"./binders/text.js": 313,
		"./binders/textarea.js": 310,
		"./bindnode/_bindsinglenode.js": 348,
		"./bindnode/_createbindingswitcher.js": 340,
		"./bindnode/_createnodehandler.js": 351,
		"./bindnode/_createobjecthandler.js": 352,
		"./bindnode/_getnodes.js": 326,
		"./bindnode/_selectnodes.js": 327,
		"./bindnode/index.js": 316,
		"./bindoptionalnode.js": 377,
		"./bindsandbox.js": 378,
		"./calc/_addsource.js": 368,
		"./calc/_createcalchandler.js": 369,
		"./calc/index.js": 367,
		"./class.js": 386,
		"./defaultbinders.js": 350,
		"./index.js": 465,
		"./instantiate.js": 415,
		"./lookforbinder.js": 349,
		"./matreshka/_afterinit.js": 395,
		"./matreshka/_prototype.js": 418,
		"./matreshka/_staticmembers.js": 390,
		"./matreshka/_universalmethods.js": 405,
		"./matreshka/index.js": 389,
		"./mediate.js": 416,
		"./object/_afterinit.js": 394,
		"./object/_prototype.js": 393,
		"./object/adddatakeys.js": 396,
		"./object/each.js": 403,
		"./object/index.js": 392,
		"./object/isdatakey.js": 398,
		"./object/iterator.js": 404,
		"./object/keyof.js": 400,
		"./object/keys.js": 401,
		"./object/removedatakeys.js": 397,
		"./object/setdata.js": 399,
		"./object/tojson.js": 402,
		"./off/_removedomlistener.js": 346,
		"./off/_removelistener.js": 344,
		"./off/_removetreelistener.js": 342,
		"./off/_undelegatelistener.js": 343,
		"./off/index.js": 409,
		"./on/_adddomlistener.js": 354,
		"./on/_addlistener.js": 353,
		"./on/_addtreelistener.js": 357,
		"./on/_createdomeventhandler.js": 355,
		"./on/_delegatelistener/arrayaddhandler.js": 359,
		"./on/_delegatelistener/arrayremovehandler.js": 361,
		"./on/_delegatelistener/changehandler.js": 363,
		"./on/_delegatelistener/index.js": 358,
		"./on/_delegatelistener/objectremovehandler.js": 362,
		"./on/_delegatelistener/objectsethandler.js": 360,
		"./on/_domeventregexp.js": 345,
		"./on/_splitbyspaceregexp.js": 407,
		"./on/index.js": 406,
		"./once.js": 408,
		"./ondebounce.js": 410,
		"./parsebindings/_parserdata.js": 366,
		"./parsebindings/_processattribute/_definehiddencontentproperty.js": 375,
		"./parsebindings/_processattribute/_getbindingkey.js": 374,
		"./parsebindings/_processattribute/index.js": 373,
		"./parsebindings/_processtextnode.js": 372,
		"./parsebindings/index.js": 365,
		"./parserbrackets.js": 371,
		"./remove.js": 414,
		"./select.js": 379,
		"./selectall.js": 380,
		"./set.js": 320,
		"./tomatreshka.js": 391,
		"./trigger/_triggerdomevent.js": 412,
		"./trigger/_triggerone.js": 321,
		"./trigger/_triggeronedomevent.js": 413,
		"./trigger/index.js": 411,
		"./unbindnode/_removebinding.js": 347,
		"./unbindnode/index.js": 341,
		"./usedomlibrary.js": 417
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
	webpackContext.id = 492;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map