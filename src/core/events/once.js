define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk'
], function(core, initMK) {
	"use strict";
	var once = core.once = function(object, names, callback, context, evtData) {
		var i;
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		if (typeof names == 'object') {
			for (i in names)
				if (names.hasOwnProperty(i)) {
					once(object, i, names[i], callback, context);
				}

			return object;
		}

		if (!callback) throw Error('callback is not function for event "' + names + '"');

		initMK(object);

		names = names.split(/\s+/);

		for (i = 0; i < names.length; i++) {
			(function(name) {
				var once = (function(func) {
					var ran = false,
						memo;
					return function() {
						if (ran) return memo;
						ran = true;
						memo = func.apply(this, arguments);
						func = null;
						return memo;
					};
				})(callback);
				once._callback = callback;
				core.on(object, name, once, context);
			})(names[i]);
		}

		return object;
	};
});
