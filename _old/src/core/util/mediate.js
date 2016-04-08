define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk'
], function(core, initMK) {
	"use strict";
	var mediate = core.mediate = function(object, keys, mediator) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var type = typeof keys,
			i,
			special;

		if (type == 'object' && !(keys instanceof Array)) {
			for (i in keys) {
				if (keys.hasOwnProperty(i)) {
					core.mediate(object, i, keys[i]);
				}
			}
			return object;
		}

		keys = type == 'string' ? keys.split(/\s/) : keys;

		for (i = 0; i < keys.length; i++)(function(key) {
			special = core._defineSpecial(object, key);

			special.mediator = function(v) {
				return mediator.call(object, v, special.value, key, object);
			};

			core.set(object, key, special.mediator(special.value), {
				fromMediator: true
			});
		})(keys[i]);

		return object;
	};

	var setClassFor = core.setClassFor = function(object, keys, Class, updateFunction) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var type = typeof keys,
			i;

		if (type == 'object' && !(keys instanceof Array)) {
			for (i in keys)
				if (keys.hasOwnProperty(i)) {
					core.setClassFor(object, i, keys[i], Class);
				}

			return object;
		}

		keys = type == 'string' ? keys.split(/\s/) : keys;

		updateFunction = updateFunction || function(instance, data) {
			var i,
				keys,
				removeKeys;

			if (instance.isMKArray) {
				instance.recreate(data);
			} else if (instance.isMKObject) {
				keys = instance.keys();
				removeKeys = [];

				for(i = 0; i < keys.length; i++) {
					if(!(keys[i] in data)) {
						removeKeys.push(keys[i]);
					}
				}

				instance.jset(data).removeDataKeys(removeKeys);
			} else {
				for (i in data) {
					if (data.hasOwnProperty(i)) {
						instance[i] = data[i];
					}
				}
			}
		};

		for (i = 0; i < keys.length; i++) {
			core.mediate(object, keys[i], function(v, prevVal, key) {
				var result;
				if (prevVal && (prevVal.instanceOf ? prevVal.instanceOf(Class) : prevVal instanceof Class)) {
					updateFunction.call(object, prevVal, v, key);
					result = prevVal;
				} else {
					result = new Class(v, object, key);
				}

				return result;
			});
		}

		return object;
	};
});
