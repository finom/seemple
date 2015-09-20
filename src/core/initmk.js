define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/var/isxdr'
], function(core, sym, isXDR) {
	"use strict";
	var initMK = core.initMK = function(object) {
		if (!object[sym]) {
			Object.defineProperty(object, sym, {
				value: {
					events: {},
					special: {},
					id: 'mk' + Math.random()
				},
				enumerable: isXDR,
				configurable: isXDR,
				writable: isXDR
			});
		}

		return object;
	};

	return function(object) {
		object._initMK ? object._initMK() : initMK(object);
		return object;
	};
});
