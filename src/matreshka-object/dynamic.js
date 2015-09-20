define([
	'matreshka_dir/core/var/sym',
	'matreshka_dir/matreshka.class'
], function(sym, MK) {
	"use strict";
	return {
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
				type = typeof key,
				i;

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
				args = arguments,
				i;
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
				args = arguments,
				i;
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
});
