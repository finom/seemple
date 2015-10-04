define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
], function(core, sym) {
	"use strict";
	core._removeListener = function(object, name, callback, context, evtData) {
		if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

		var events = object[sym].events[name] || [],
			retain = object[sym].events[name] = [],
			domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)(\((.*)\))?)?/,
			j = 0,
			l = events.length,
			evt,
			i,
			executed,
			howToRemove,
			removeEvtData;

		evtData = evtData || {};

		executed = domEvtNameRegExp.exec(name);

		if (executed && executed[2]) {
			core._removeDOMListener(object, executed[3], executed[1], executed[5], callback, context);
		} else {
			for (i = 0; i < l; i++) {
				evt = events[i];
				howToRemove  = evt.howToRemove || evtData.howToRemove;

				if (howToRemove ? !howToRemove(evt, evtData) : (callback && (callback !== evt.callback && callback._callback !== evt.callback)) || (context && context !== evt.context)) {
					retain[j++] = evt;
				} else {
					removeEvtData = {
						name: name,
						callback: evt.callback,
						context: evt.context
					};

					core._fastTrigger(object, 'removeevent:' + name, removeEvtData);
					core._fastTrigger(object, 'removeevent', removeEvtData);
				}
			}

			if (!retain.length) {
				delete object[sym].events[name];
			}
		}




		return object;
	};
});
