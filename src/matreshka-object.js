"use strict";
define([
	'matreshka_dir/matreshka-core'
], function(MK) {
	if (!MK) {
		throw new Error('Matreshka is missing');
	}
	var sym = MK.sym,
		i,

		prototype = {
			'extends': MK,
			isMKObject: true,
			renderer: null,
			constructor: function MatreshkaObject(object) {
				return this.jset(object);
			},

			keys: function() {
				var _this = this._initMK(),
					keys = _this[sym].keys,
					result = [],
					p;

				for (p in keys)
					if (keys.hasOwnProperty(p)) {
						result.push(p);
					}

				return result;
			},

			/**
			 * @method Matreshka.Object#_initMK
			 * @private
			 */
			_initMK: function() {
				var _this = this,
					addedEvents;

				if (_this[sym]) return _this;

				MK.prototype._initMK.call(_this, arguments);

				_this[sym].keys = {};

				MK._fastAddListener(_this, 'addevent:modify', function(evt) {
					if (!addedEvents) {
						MK._fastAddListener(_this, 'change', function(evt) {
							if (evt && (evt.key in _this[sym].keys) && !evt.silent) {
								MK._fastTrigger(_this, 'modify', evt);
							}
						});

						MK._fastAddListener(_this, 'delete', function(evt) {
							if (evt && (evt.key in _this[sym].keys)) {
								_this.removeDataKeys(evt.key);

								if (!evt.silent) {
									MK._fastTrigger(_this, 'modify', evt);
								}
							}
						});

						addedEvents = true;
					}
				});

				return _this;
			},


			hasOwnProperty: function(key) {
				return this._initMK()[sym].keys.hasOwnProperty(key);
			},


			toObject: function() {
				var _this = this._initMK(),
					o = {},
					keys = _this[sym].keys,
					p;

				for (p in keys) {
					if (keys.hasOwnProperty(p)) {
						o[p] = _this[p];
					}
				}

				return o;
			},


			toNative: function() {
				return this.toObject();
			},


			toJSON: function() {
				var _this = this._initMK(),
					JSON = {},
					keys = _this[sym].keys,
					p;

				for (p in keys)
					if (keys.hasOwnProperty(p)) {
						JSON[p] = _this[p] && _this[p].toJSON ? _this[p].toJSON() : _this[p];
					}

				return JSON;
			},


			keyOf: function(o) {
				var _this = this._initMK(),
					keys = _this[sym].keys,
					p;

				for (p in keys)
					if (keys.hasOwnProperty(p)) {
						if (o && o.isMK) {
							if (o.eq(_this[p])) {
								return p;
							}
						} else if (o === _this[p]) {
							return p;
						}
					}

				return null;
			},


			jset: function(key, v, evt) {
				var _this = this._initMK(),
					type = typeof key;

				if (type == 'undefined') return _this;

				if (key && type == 'object') {
					key = key.toJSON ? key.toJSON() : key;

					for (i in key) {
						_this[sym].keys[i] = 1;
						MK._defineSpecial(_this, i);
						_this.set(i, key[i], v);
					}

					return _this;
				}

				_this[sym].keys[key] = 1;
				MK._defineSpecial(_this, key);
				return _this.set(key, v, evt);
			},


			addDataKeys: function(keys) {
				var _this = this._initMK(),
					args = arguments;
				if (!args.length) return _this;
				keys = args.length > 1 ? args : keys instanceof Array ? keys : String(keys).split(/\s/);
				for (i = 0; i < keys.length; i++) {
					_this[sym].keys[keys[i]] = 1;
					MK._defineSpecial(_this, keys[i]);
				}
				return _this;
			},

			removeDataKeys: function(keys) {
				var _this = this._initMK(),
					args = arguments;
				if (!args.length) return _this;
				keys = args.length > 1 ? args : keys instanceof Array ? keys : String(keys).split(/\s/);
				for (i = 0; i < keys.length; i++) {
					delete _this[sym].keys[keys[i]];
				}
				return _this;
			},

			each: function(callback, thisArg) {
				var _this = this._initMK(),
					p;
				for (p in _this[sym].keys)
					if (_this[sym].keys.hasOwnProperty(p)) {
						callback.call(thisArg, _this[p], p, _this);
					}

				return _this;
			}
		};


	prototype[typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator'] = function() {
		var _this = this,
			keys = _this.keys(),
			i = 0;

		return {
			next: function() {
				if (i > keys.length - 1) {
					return {
						done: true
					};
				} else {
					return {
						done: false,
						value: _this[keys[i++]]
					};
				}
			}
		};
	};

	return MK.Object = MK.Class(prototype);
});
