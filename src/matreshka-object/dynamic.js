define([
	'matreshka_dir/core/var/map',
	'matreshka_dir/matreshka.class'
], function(map, MK) {
	"use strict";
	return {
		keys: function() {
			var _this = this._initMK(),
				keys = map.get(_this).keys,
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
				keys = map.get(_this).keys,
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
				keys = map.get(_this).keys,
				p;

			for (p in keys)
				if (keys.hasOwnProperty(p)) {
					JSON[p] = _this[p] && _this[p].toJSON ? _this[p].toJSON() : _this[p];
				}

			return JSON;
		},


		keyOf: function(o) {
			var _this = this._initMK(),
				keys = map.get(_this).keys,
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
				objectData = map.get(_this),
				i;

			if (type == 'undefined') return _this;

			if (key && type == 'object') {
				key = key.toJSON ? key.toJSON() : key;

				for (i in key) {
					objectData.keys[i] = 1;
					MK._defineSpecial(_this, i);
					_this.set(i, key[i], v);
				}

				return _this;
			}

			objectData.keys[key] = 1;
			MK._defineSpecial(_this, key);
			return _this.set(key, v, evt);
		},


		addDataKeys: function(_keys) {
			var _this = this._initMK(),
				objectData = map.get(_this),
				args = arguments,
				i,
				keys;

			if (!args.length || !_keys) return _this;
			keys = args.length > 1 ? args : _keys instanceof Array ? _keys : MK.trim(_keys).split(/\s+/);
			for (i = 0; i < keys.length; i++) {
				if(!objectData.keys[keys[i]]) {
					objectData.keys[keys[i]] = 1;
					MK._defineSpecial(_this, keys[i]);
					MK._fastTrigger(_this, 'modify', {
						key: keys[i],
						value: _this[keys[i]]
					});
				}

			}
			return _this;
		},

		removeDataKeys: function(keys) {
			var _this = this._initMK(),
				objectData = map.get(_this),
				args = arguments,
				i,
				evt;

			if (!args.length || !keys) return _this;
			keys = args.length > 1 ? args : keys instanceof Array ? keys : MK.trim(keys).split(/\s+/);
			for (i = 0; i < keys.length; i++) {
				if(objectData.keys[keys[i]]) {
					delete objectData.keys[keys[i]];

					evt = {
						key: keys[i],
						value: _this[keys[i]]
					};

					MK._fastTrigger(_this, 'remove', evt);
					MK._fastTrigger(_this, 'modify', evt);
				}
			}
			return _this;
		},

		each: function(callback, thisArg) {
			var _this = this._initMK(),
				objectData = map.get(_this),
				p;

			for (p in objectData.keys)
				if (objectData.keys.hasOwnProperty(p)) {
					callback.call(thisArg, _this[p], p, _this);
				}

			return _this;
		}
	};
});
