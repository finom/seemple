define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map'
], function(core, map) {
	"use strict";

	var initMK = core.initMK = function(object) {
		if (!map.has(object)) {
			map.set(object, {
				events: {},
				special: {},
				id: 'mk' + Math.random()
			});
		}

		return object;
	};

	return function(object) {
		object._initMK ? object._initMK() : initMK(object);
		return object;
	};
});
