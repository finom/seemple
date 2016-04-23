import initMK from '../_core/init';
import addListener from './addlistener';
import undelegateListener from './undelegatelistener';
import triggerOne from './triggerone';

function changeHandler({
	previousValue,
	value
}, delegatedData = triggerOne.latestEvent.info.delegatedData) {
	const { path, name, callback, context } = delegatedData;

	if(typeof value === 'object') {
		delegateListener(value, path, name, callback, context);
	}

	if(typeof previousValue === 'object') {
		undelegateListener(previousValue, path, name, callback, context);
	}
}

export default function delegateListener(object, path, name, callback, context, info = {}) {
	const def = initMK(object);

	// if typeof path is string and path is not empty string then split it
	path = typeof path === 'string' && path !== '' ? path.split('.') : path;

	if(!path || !path.length) {
		// if no path then add simple listener
		addListener(object, name, callback, context);
	} else {
		// else do all magic
		const key = path[0];

		if(path.length > 1) {
			path = nofn.slice(path, 1);
		} else {
			path = [];
		}


		const delegatedData = {
			path,
			name,
			callback,
			context
		};

		addListener(object, `change:${key}`, changeHandler, null, {
			delegatedData,
			pathStr: path.length > 1 ? path.join('.') : path[0] || ''
		});

		changeHandler({
			value: object[key]
		}, delegatedData);
	}
}



/*
define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/var/specialevtreg'
], function(core, initMK, map, specialEvtReg) {
	"use strict";
	var _delegateListener = core._delegateListener = function(object, path, name, callback, context, evtData) {
		if (!object || typeof object != 'object') return object;

		initMK(object);

		var objectData = map.get(object),
			executed = /([^\.]+)\.(.*)/.exec(path),
			f,
			firstKey = executed ? executed[1] : path,
			changeKey,
			obj;

		path = executed ? executed[2] : '';

		evtData = evtData || {};

		if (firstKey) {
			if (firstKey == '*') {
				if (object.isMKArray) {
					f = function(evt) {
						(evt && evt.added ? evt.added : object).forEach(function(item) {
							item && _delegateListener(item, path, name, callback, context, evtData);
						});
					};

					f._callback = callback;
					core._addListener(object, 'add', f, context, evtData);
					f();
				} else if (object.isMKObject) {
					f = function(evt) {
						var target = object[evt.key];

						if (target && evt && (evt.key in objectData.keys)) {
							_delegateListener(target, path, name, callback, context, evtData);
						}
					};

					object.each(function(item) {
						_delegateListener(item, path, name, callback, context, evtData);
					});

					f._callback = callback;

					core._addListener(object, 'change', f, context, evtData);
				}
			} else {
				f = function(evt) {
					if (evt && evt._silent) return;

					var target = object[firstKey],
						changeKey,
						triggerChange = true,
						i,
						changeEvents;

					evtData.path = path;

					evtData.previousValue = evt && evt.previousValue || evtData.previousValue && evtData.previousValue[firstKey];

					if (evt && evt.previousValue && map.has(evt.previousValue)) {
						core._undelegateListener(evt.previousValue, path, name, callback, context, evtData);
					}

					if (typeof target == 'object' && target) {
						_delegateListener(target, path, name, callback, context, evtData);
					}

					if (specialEvtReg.test(name)) {
						changeKey = name.replace(specialEvtReg, '');

						if (!path && evtData.previousValue && evtData.previousValue[changeKey] !== target[changeKey]) {
							changeEvents = map.get(evtData.previousValue).events[name];
							if (changeEvents) {
								for (i = 0; i < changeEvents.length; i++) {
									if (changeEvents[i].path === path) {
										triggerChange = false;
									}
								}
							}

							if (triggerChange) {
								core.set(target, changeKey, target[changeKey], {
									force: true,
									previousValue: evtData.previousValue[changeKey],
									previousObject: evtData.previousValue,
									_silent: true
								});
							}
						}
					}
				};

				f._callback = callback;

				core._addListener(object, 'change:' + firstKey, f, context, evtData);

				f();
			}
		} else {
			core._addListener(object, name, callback, context, evtData);
		}
	};
});
*/
