define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/initmk'
], function(magic, initMK) {
	var once = magic.once = function(object, names, callback, context, evtData) {
		var i;
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

		names = names.split(/\s/);

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
				magic._on(object, name, once, context);
			})(names[i]);
		}

		return object;
	};
});