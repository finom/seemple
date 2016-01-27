define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/util/common'
], function(core, initMK, util) {
	"use strict";
	var onDebounce = core.onDebounce = function(object, names, callback, debounceDelay, triggerOnInit, context, evtData) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		var cbc, i;

		if (typeof names == 'object') {
			for (i in names)
				if (names.hasOwnProperty(i)) {
					onDebounce(object, i, names[i], callback, debounceDelay, triggerOnInit, context);
				}

			return object;
		}

		// flip args
		if (typeof debounceDelay != 'number') {
			evtData = context;
			context = triggerOnInit;
			triggerOnInit = debounceDelay;
			debounceDelay = 0;
		}

		cbc = util.debounce(callback, debounceDelay);

		// set reference to real callback for .off method
		cbc._callback = callback;

		return core.on(object, names, cbc, triggerOnInit, context, evtData);
	};
});
