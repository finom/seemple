define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/util/common'
], function(core, sym, utils) {
	"use strict";
	core.trigger = function(object, names) {
		var allEvents = object && typeof object == 'object' && object[sym] && object[sym].events,
			args, i, j, l, events, ev;

		if (names && allEvents) {
			args = utils.toArray(arguments, 2);
			names = names.split(/\s/);

			for (i = 0; i < names.length; i++) {
				events = allEvents[names[i]];
				if (events) {
					j = -1, l = events.length;
					while (++j < l)(ev = events[j]).callback.apply(ev.ctx, args);
				}
			}
		}

		return object;
	};


	core._fastTrigger = function(object, name, evt) {
		var events = object[sym].events[name],
			i, l, ev;

		if (events) {
			i = -1, l = events.length;
			while (++i < l)(ev = events[i]).callback.call(ev.ctx, evt);
		}
	};
});
