define([
	'matreshka_dir/core/var/magic',
	'matreshka_dir/core/var/sym',
], function(magic, sym) {
	magic._removeListener = function(object, name, callback, context, evtData) {
		if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

		var events = object[sym].events[name] || [],
			retain = object[sym].events[name] = [],
			domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)(\((.*)\))?)?/,
			j = 0,
			l = events.length,
			evt,
			i,
			executed;

		evtData = evtData || {};

		executed = domEvtNameRegExp.exec(name);

		if (executed && executed[2]) {
			magic._removeDOMListener(object, executed[3], executed[1], executed[5], callback, context);
		} else {
			for (i = 0; i < l; i++) {
				evt = events[i];

				if (evt.howToRemove ? !evt.howToRemove(evt, evtData) : (callback && (callback !== evt.callback && callback._callback !== evt.callback)) || (context && context !== evt.context)) {
					retain[j++] = evt;
				}
			}

			if (!retain.length) {
				delete object[sym].events[name];
			}
		}

		return object;
	};
});
