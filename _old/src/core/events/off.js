define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common',
	'matreshka_dir/core/var/map'
], function(core, initMK, util, map) {
	"use strict";
	var off = core.off = function(object, names, callback, context) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		var objectData = map.get(object),
			i,
			path,
			lastIndexOfET,
			name;

		if(!objectData) return object;

		// if event-callback object is passed to the function
		if (typeof names == 'object' && !(names instanceof Array)) {
			for (i in names)
				if (names.hasOwnProperty(i)) {
					off(object, i, names[i], callback);
				}

			return object;
		}

		if (!names && !callback && !context) {
			objectData.events = {};
			return object;
		}

		names = util.trim(names)
			.replace(/\s+/g, ' ') // single spaces only
			.split(/\s(?![^(]*\))/g);

		if (typeof object != 'object') {
			return object;
		}

		for (i = 0; i < names.length; i++) {
			name = names[i];

			// index of @
			lastIndexOfET = name.lastIndexOf('@');

			if (~lastIndexOfET) {
				path = name.slice(0, lastIndexOfET);
				name = name.slice(lastIndexOfET + 1).replace(/@/g, '.');

				core._undelegateListener(object, path, name, callback, context);
			} else {
				core._removeListener(object, name, callback, context);
			}
		}

		return object;
	};
});
