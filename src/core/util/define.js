define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/initmk'
], function(magic, initMK) {
	var define, defineGetter, defineSetter;

	define = magic.define = function(object, key, descriptor) {
		if (!object || typeof object != 'object') return object;

		var i;

		if (typeof key == 'object') {
			for (i in key) {
				define(object, i, key[i]);
			}

			return object;
		}

		Object.defineProperty(object, key, descriptor);

		return object;
	};

	defineGetter = magic.defineGetter = function(object, key, getter) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var i,
			special;

		if (typeof key == 'object') {
			for (i in key)
				if (key.hasOwnProperty(i)) {
					defineGetter(object, i, key[i]);
				}

			return object;
		}

		special = magic._defineSpecial(object, key);

		special.getter = function() {
			return getter.call(object, {
				value: special.value,
				key: key,
				self: object
			});
		};

		return object;
	};

	defineSetter = magic.defineSetter = function(object, key, setter) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var i;

		if (typeof key == 'object') {
			for (i in key)
				if (key.hasOwnProperty(i)) {
					defineSetter(object, i, key[i]);
				}

			return object;
		}

		magic._defineSpecial(object, key).setter = function(v) {
			return setter.call(object, v, {
				value: v,
				key: key,
				self: object
			});
		};

		return object;
	};
});
