"use strict";
(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define([
			'xclass',
			'matreshka-magic'
		], factory);
	} else {
		root.MK = root.Matreshka = factory(root.Class, root.MatreshkaMagic);
	}
}(this, function(Class, magic) {

	if (!Class) {
		throw Error('Class function is missing');
	}
	if (![].forEach) {
		throw Error('Internet Explorer 8 requires to use es5-shim: https://github.com/es-shims/es5-shim');
	}

	var toArray = magic.toArray,
		extend = magic.extend,
		sym = magic.sym,
		MK = Class({
			//__special: null, // { <key>: { getter: f, $nodes: jQ, value: 4 }}
			//__events: null,
			isMK: true,

			on: function(names, callback, triggerOnInit, context, evtData) {
				return magic.on(this, names, callback, triggerOnInit, context, evtData);
			},

			onDebounce: function(names, callback, debounceDelay, triggerOnInit, context, evtData) {
				return magic.onDebounce(this, names, callback, debounceDelay, triggerOnInit, context, evtData);
			},

			_on: function(name, callback, context, evtData) {
				return magic._on(this, name, callback, context, evtData);
			},


			once: function(names, callback, context) {
				return magic.once(this, names, callback, context);
			},

			off: function(names, callback, context) {
				return magic.off(this, names, callback, context);
			},

			_off: function(name, callback, context) {
				return magic._off(this, name, callback, context);
			},

			trigger: function() {
				var args = magic.toArray(arguments);
				args.unshift(this);
				return magic.trigger.apply(magic, args);
			},

			_trigger: function() {
				var args = magic.toArray(arguments);
				args.unshift(this);
				return magic._trigger.apply(magic, args);
			},

			bindNode: function(key, node, binder, evt, optional) {
				return magic.bindNode(this, key, node, binder, evt, optional);
			},

			bindOptionalNode: function(key, node, binder, evt) {
				return magic.bindOptionalNode(this, key, node, binder, evt);
			},

			unbindNode: function(key, node, evt) {
				return magic.unbindNode(this, key, node, evt);
			},

			boundAll: function(key) {
				return magic.boundAll(this, key);
			},

			$bound: function(key) {
				return magic.boundAll(this, key);
			},

			bound: function(key) {
				return magic.bound(this, key);
			},

			selectAll: function(s) {
				return magic.selectAll(this, s);
			},

			$: function(s) {
				return magic.selectAll(this, s);
			},

			select: function(s) {
				return magic.select(this, s);
			},

			/**
			 * @private
			 * @method Matreshka#_defineSpecial
			 * @todo Defines needed descriptor for given key
			 */
			_defineSpecial: function(key) {
				return magic._defineSpecial(this, key);
			},

			eq: function(object) { // @IE8
				return typeof object == 'object' && object !== null
                    && this[sym] && object[sym] && this[sym].id == object[sym].id;
			},

			defineGetter: function(key, getter) {
				return magic.defineGetter(this, key, getter);
			},

			defineSetter: function(key, setter) {
				return magic.defineSetter(this, key, setter);
			},

			mediate: function(keys, mediator) {
				return magic.mediate(this, keys, mediator);
			},

			setClassFor: function(keys, Class, updateFunction) {
				return magic.setClassFor(this, keys, Class, updateFunction);
			},

			linkProps: function(key, keys, getter, setOnInit) {
				return magic.linkProps(this, key, keys, getter, setOnInit);
			},

			get: function(key) {
				return this[key];
			},

			set: function(key, v, evt) {
				return magic.set(this, key, v, evt);
			},

			remove: function(key, evt) {
				return magic.remove(this, key, evt);
			},

			define: function(key, descriptor) {
				return magic.define(this, key, descriptor);
			},

			delay: function(f, delay, thisArg) {
				return magic.delay(this, f, delay, thisArg);
			},

			/**
			 * @method Matreshka#_initMK
			 * @private
			 */
			_initMK: function() {
				var _this = this;

				if(_this[sym]) return _this;

				magic.initMK(_this);

				_this.nodes = _this.nodes = {};
				_this.$nodes = _this.$nodes = {};
				_this.sandbox = _this.sandbox || null;
				_this.$sandbox = _this.$sandbox || MK.$();
				_this.Matreshka = MK;

				return _this;
			},

			toString: function() {
				return '[object Matreshka]';
			},

			constructor: function Matreshka() {
				this._initMK();
			}
		});

	/*

	This is the list of methods that inherited from magic. We need a way how to
	inherit them dynamically. method.apply is slow
	"on onDebounce _on once off _off trigger _trigger bindNode bindOptionalNode\
	 unbindNode boundAll $bound bound selectAll $ select _defineSpecial defineGetter\
	 defineSetter mediate fixClassOf linkProps get set remove define delay".split( /\s+/ )
	*/

	extend(MK, magic, {

		version: 'dev',

		Class: Class,

		isXDR: Class.isXDR,

		to: function(data) {
			var result,
				i;

			if (typeof data == 'object') {
				if ('length' in data) {
					result = [];
					for (i = 0; i < data.length; i++) {
						result[i] = MK.to(data[i]);
					}
					result = new MK.Array().recreate(result);
				} else {
					result = {};
					for (i in data)
						if (data.hasOwnProperty(i)) {
							result[i] = MK.to(data[i]);
						}
					result = new MK.Object(result);
				}
			} else {
				result = data;
			}

			return result;
		}
	});

	return MK;
}));
