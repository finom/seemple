define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common'
], function(core, initMK, util) {
	"use strict";
	var on = core.on = function(object, names, callback, triggerOnInit, context, evtData) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var t, i, name, path, lastIndexOfET;

		// if event-callback object is passed to the function
		if (typeof names == 'object' && !(names instanceof Array)) {
			for (i in names) {
				if (names.hasOwnProperty(i)) {
					on(object, i, names[i], callback, triggerOnInit);
				}
			}

			return object;
		}

		// callback is required
		if (!callback) throw Error('callback is not a function for event(s) "' + names + '"');

		names = names instanceof Array ? names : util.trim(names)
			.replace(/\s+/g, ' ') // single spaces only
			.split(/\s(?![^(]*\))/g) // split by spaces
		;

		// allow to flip triggerOnInit and context
		if (typeof triggerOnInit != 'boolean' && typeof triggerOnInit != 'undefined') {
			t = context;
			context = triggerOnInit;
			triggerOnInit = t;
		}

		for (i = 0; i < names.length; i++) {
			name = names[i];
			// index of @
			lastIndexOfET = name.lastIndexOf('@');

			if (~lastIndexOfET) {
				path = name.slice(0, lastIndexOfET);

				// fallback for older apps
				if(!path) {
					path = '*';
				} else if(~path.indexOf('@')) {
					path = path.replace(/([^@]*)@/g, function($0, key) {
						return (key || '*') + '.';
					}).replace(/\.$/, '.*') || '*';
				}

				name = name.slice(lastIndexOfET + 1);

				core._delegateListener(object, path, name, callback, context || object, evtData);
			} else {
				core._addListener(object, name, callback, context, evtData);
			}
		}

		// trigger after event is initialized
		if (triggerOnInit === true) {
			callback.call(context || object, {
				triggeredOnInit: true
			});
		}

		return object;
	};
});
