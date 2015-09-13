define([
	'matreshka_dir/var/magic',
	'matreshka_dir/core/initmk',
	'matreshka_dir/util/common',
	'matreshka_dir/var/sym',
], function(magic, initMK, util, sym) {
	var _off, off;

	_off = magic._off = function(object, name, callback, context) {
		if (!object) return object;

		initMK(object);

		var path;
		// index of @
		var lastIndexOfET = name.lastIndexOf('@');

		if (~lastIndexOfET) {
			path = name.slice(0, lastIndexOfET);
			name = name.slice(lastIndexOfET + 1).replace(/@/g, '.');

			magic._undelegateListener(object, path, name, callback, context);
		} else {
			magic._removeListener(object, name, callback, context);
		}

		return object;
	};

	off = magic.off = function(object, names, callback, context) {
		if (!object || typeof object != 'object' || !object[sym]) return object;

		var i;

		// if event-callback object is passed to the function
		if (typeof names == 'object' && !(names instanceof Array)) {
			for (i in names)
				if (names.hasOwnProperty(i)) {
					off(object, i, names[i], callback);
				}

			return object;
		}

		if (!names && !callback && !context && object[sym]) {
			object[sym].events = {};
			return object;
		}

		names = util.trim(names)
			.replace(/\s+/g, ' ') // single spaces only
			.split(/\s(?![^(]*\))/g);

		if (typeof object != 'object') {
			return object;
		}

		for (i = 0; i < names.length; i++) {
			_off(object, names[i], callback, context);
		}

		return object;
	};
});