define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym'
], function(core, sym) {
	"use strict";
	var initMK = core.initMK = function(object) {
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
