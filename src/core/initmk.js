define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/var/sym'
], function(magic, sym) {
	var initMK = magic.initMK = function(object) {
		if (!object[sym]) {
			Object.defineProperty(object, sym, {
				value: {
					events: {},
					special: {},
					id: 'mk' + Math.random()
				},
				enumerable: false,
				configurable: false,
				writable: false
			});
		}

		return object;
	};

	return function(object) {
		object._initMK ? object._initMK() : initMK(object);
		return object;
	};
});