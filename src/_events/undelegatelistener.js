import defs from '../_core/defs';
import removeListener from './removelistener';
// REFACTOR, DONT TRIGGER ADDEVENT, REMOVEEVENT
export default function undelegateListener(object, path, name, callback, context, info = {}) {
	const def = defs.get(object);

	// if no definition do nothing
	if (!def) return;

	const { events: allEvents } = def;

	path = typeof path === 'string' && path !== '' ? path.split('.') : path;

	if (!path || !path.length) {
		// if no path then remove listener
		removeListener(object, name, callback, context, info);
	} else {
		// else do all magic
		const key = path[0],
			events = allEvents[`_change:delegated:${key}`];
		let pathStr;

		if (path.length > 1) {
			path = nofn.slice(path, 1);
			pathStr = path.join('.');
		} else {
			path = [];
			pathStr = path[0] || '';
		}

		if (events) {
			const retain = [];
			nofn.forEach(events, event => {
				if (event.info.pathStr !== pathStr) {
					retain.push(event);
				}
			});

			if (retain.length) {
				allEvents[`_change:delegated:${key}`] = retain;
			} else {
				delete allEvents[`_change:delegated:${key}`];
			}
		}

		if (typeof object[key] === 'object') {
			undelegateListener(object[key], path, name, callback, context, info);
		}
	}
}

/*
define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map'
], function(core, map) {
	"use strict";
	var _undelegateListener = core._undelegateListener =
	 function(object, path, name, callback, context, evtData) {
		if (!object || typeof object != 'object') return object;

		var executed = /([^\.]+)\.(.*)/.exec(path),
			firstKey = executed ? executed[1] : path,
			p = path,
			objectData = map.get(object),
			events,
			i;

		path = executed ? executed[2] : '';

		if (firstKey) {
			if (firstKey == '*') {
				if (object.isMKArray) {
					if (callback) {
						_undelegateListener(object, path, 'add', callback, context, evtData);
					} else {
						events = objectData.events.add || [];
						for (i = 0; i < events.length; i++) {
							if (events[i].path == p) {

								_undelegateListener(object, path, 'add', events[i].callback);
							}
						}
					}

					object.forEach(function(item) {
						item && _undelegateListener(item, path, name, callback, context);
					});
				} else if (object.isMKObject) {
					if (callback) {
						_undelegateListener(object, path, 'change', callback, context);
					} else {
						events = objectData.events.change || [];
						for (i = 0; i < events.length; i++) {
							if (events[i].path == p) {
								_undelegateListener(object, path, 'change', events[i].callback);
							}
						}
					}

					object.each(function(item) {
						item && _undelegateListener(item, path, name, callback, context);
					});
				}
			} else {
				if (callback) {
					core._removeListener(object, 'change:' + firstKey, callback, context, evtData);
				} else {
					events = objectData.events['change:' + firstKey] || [];
					for (i = 0; i < events.length; i++) {
						if (events[i].path == p) {
							core._removeListener(object, 'change:' + firstKey, events[i].callback);
						}
					}
				}
				if (typeof object[firstKey] == 'object') {
					_undelegateListener(object[firstKey], path, name, callback, context, evtData);
				}
			}
		} else {
			core._removeListener(object, name, callback, context, evtData);
		}
	};
});

*/
