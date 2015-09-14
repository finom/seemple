define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/util/common'
], function(magic, sym, utils) {
	magic.trigger = function(object, names) {
		var allEvents = object && typeof object == 'object' && object[sym] && object[sym].events,
			args, i, j, events, ev;

		if (!allEvents) return object;

		if (names) {
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


	magic._fastTrigger = function(object, name, evt) {
		var events = object[sym].events[name],
			i, l, ev;

		if (events) {
			i = -1, l = events.length;
			while (++i < l)(ev = events[i]).callback.call(ev.ctx, evt);
		}
	};
});
