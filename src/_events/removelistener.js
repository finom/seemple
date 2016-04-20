import defs from '../_core/defs';
import triggerOne from './triggerone';

// removes simple event listener to an object
export default function removeListener(object, name, callback, context, info) {
	const def = defs.get(object);

	// if no definition do nothing
	if(!def) return;

	const {events: allEvents} = def,
		events = allEvents[name];
		retain = [];

	// if all events need to be removed
	if(typeof name == 'undefined') {
		if(!info || !info.noTrigger) {
			nofn.forOwn(allEvents, (events, name) => {
				nofn.forEach(events, evt => {
					const removeEvtData = {
						name: name,
						callback: evt.callback,
						context: evt.context
					};

					triggerOne(object, `removeevent:${name}`, removeEvtData);
					triggerOne(object, 'removeevent', removeEvtData);
				});
			});
		}

		// restore default value of events
		def.events = {};
	} else if(events) { // if events with given name is found
		nofn.forEach(events, evt => {
			if(callback && (callback !== evt.callback && callback._callback !== evt.callback)
				|| (context && context !== evt.context)) {
				// keep event
				retain.push(evt);
			} else {
				const removeEvtData = {
					name: name,
					callback: evt.callback,
					context: evt.context
				};

				if(!info || !info.noTrigger) {
					triggerOne(object, `removeevent:${name}`, removeEvtData);
					triggerOne(object, 'removeevent', removeEvtData);
				}

			}
		});

		if (retain.length) {
			allEvents[name] = retain;
		} else {
			delete def.events[name];
		}
	}

	return;
}

/*define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map'
], function(core, map) {
	"use strict";

	var domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)(\((.*)\))?)?/;

	core._removeListener = function(object, name, callback, context, evtData) {
		if (!object || typeof object != 'object') return object;

		var objectData = map.get(object),
			j = 0,
			l,
			events,
			retain,
			evt,
			i,
			executed,
			howToRemove,
			removeEvtData;

		if(!objectData) return object;

		events = objectData.events[name] || [];
		retain = objectData.events[name] = [];
		l = events.length;

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
				delete objectData.events[name];
			}
		}




		return object;
	};
});*/
