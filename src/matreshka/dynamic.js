define([
	'matreshka_dir/matreshka-magic',
	'matreshka_dir/core/var/map'
], function(magic, map) {
	"use strict";
	/*

	This is the list of methods that inherited from magic. We need a way how to
	inherit them dynamically. method.apply is slow	*/

	return {
		isMK: true,

		on: function(names, callback, triggerOnInit, context, evtData) {
			return magic.on(this, names, callback, triggerOnInit, context, evtData);
		},

		onDebounce: function(names, callback, debounceDelay, triggerOnInit, context, evtData) {
			return magic.onDebounce(this, names, callback, debounceDelay, triggerOnInit, context, evtData);
		},

		once: function(names, callback, context) {
			return magic.once(this, names, callback, context);
		},

		off: function(names, callback, context) {
			return magic.off(this, names, callback, context);
		},

		trigger: function() {
			var args = magic.toArray(arguments);
			args.unshift(this);
			return magic.trigger.apply(magic, args);
		},

		bindNode: function(key, node, binder, evt, optional) {
			return magic.bindNode(this, key, node, binder, evt, optional);
		},

		bindOptionalNode: function(key, node, binder, evt) {
			return magic.bindOptionalNode(this, key, node, binder, evt);
		},

		bindSandbox: function(node, evt) {
			return magic.bindSandbox(this, node, evt);
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
			var _this = this;

			if (typeof delay == 'object') {
				thisArg = delay;
				delay = 0;
			}

			setTimeout(function() {
				f.call(thisArg || _this);
			}, delay || 0);

			return _this;
		},

		parseBindings: function(nodes) {
			return magic.parseBindings(this, nodes);
		},

		_initMK: function() {
			var _this = this;

			if (map.has(_this)) return _this;

			magic.initMK(_this);

			_this.nodes = {};
			_this.$nodes = {};
			_this.sandbox = null;
			_this.$sandbox = magic.$();

			return _this;
		},

		toString: function() {
			return '[object Matreshka]';
		},

		constructor: function Matreshka() {
			/* istanbul ignore if  */
			if(!(this instanceof Matreshka)) {
				throw new TypeError('Cannot call a class as a function');
			}

			return this._initMK();
		}
	};
});
