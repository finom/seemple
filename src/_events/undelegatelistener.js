import defs from '../_core/defs';
import removeListener from './removelistener';

export default function undelegateListener(object, path, name, callback, context, info = {}) {
	const def = defs.get(object);

	// if no definition do nothing
	if (!def) return;

	path = typeof path === 'string' && path !== '' ? path.split('.') : path;

	if (!path || !path.length) {
		// if no path then remove listener
		removeListener(object, name, callback, context, info);
	} else {
		// else do all magic
		const key = path.shift(),
			events = def.events[`change:${key}`];

		if(events && path.length) {
			const retain = [];
			nofn.forEach(events, event => {
				const pathStr = path.length > 1 ? path.join('.') : path[0];//console.log(path);

				if (event.info.pathStr !== pathStr) {
					retain.push(event);
				}
			});

			if(retain.length) {
				def.events[`change:${key}`] = retain;
			} else {
				delete def.events[`change:${key}`];
			}
		}

		if (typeof object[key] == 'object') {
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
	var _undelegateListener = core._undelegateListener = function(object, path, name, callback, context, evtData) {
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
