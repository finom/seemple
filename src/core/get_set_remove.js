define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map'
], function(core, map) {
	"use strict";
	var set;

	core.get = function(object, key) {
		return object && object[key];
	};

	// set method is the most often used method
	// we need to optimize it as good as possible
	set = core.set = function(object, key, v, evt) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		var type = typeof key,
			_isNaN = Number.isNaN || function(value) {
				return typeof value == 'number' && isNaN(value);
			},
			objectData,
			special,
			events,
			prevVal,
			newV,
			i,
			_evt,
			isChanged,
			triggerChange;

		if (type == 'undefined') return object;

		if (type == 'object') {
			for (i in key) {
				if (key.hasOwnProperty(i)) {
					set(object, i, key[i], v);
				}
			}

			return object;
		}

		objectData = map.get(object);

		if (!objectData || !objectData.special[key]) {
			object[key] = v;
			return object;
		}

		special = objectData.special[key];
		events = objectData.events;

		prevVal = special.value;

		if (special.mediator && v !== prevVal && (!evt || !evt.skipMediator && !evt.fromMediator)) {
			newV = special.mediator(v, prevVal, key, object);
		} else {
			newV = v;
		}

		isChanged = newV !== prevVal;

		_evt = {
			originalEvent: evt,
			value: newV,
			previousValue: prevVal,
			key: key,
			node: special.$nodes[0] || null,
			$nodes: special.$nodes,
			self: object,
			isChanged: isChanged
		};

		if (evt && typeof evt == 'object') {
			for (i in evt) {
				_evt[i] = _evt[i] || evt[i];
			}
		}

		triggerChange = (isChanged || _evt.force) && !_evt.silent;

		if (triggerChange) {
			events['beforechange:' + key] && core._fastTrigger(object, 'beforechange:' + key, _evt);

			events.beforechange && core._fastTrigger(object, 'beforechange', _evt);
		}

		special.value = newV;

		if (isChanged || _evt.force || _evt.forceHTML || newV !== v && !_isNaN(newV)) {
			if (!_evt.silentHTML) {
				events['_runbindings:' + key] && core._fastTrigger(object, '_runbindings:' + key, _evt);
			}
		}

		if (triggerChange) {
			events['change:' + key] && core._fastTrigger(object, 'change:' + key, _evt);

			events.change && core._fastTrigger(object, 'change', _evt);
		}

		if ((isChanged || _evt.force) && !_evt.skipLinks) {
			events['_rundependencies:' + key] &&
				core._fastTrigger(object, '_rundependencies:' + key, _evt);
		}

		return object;
	};


	core.remove = function(object, key, evt) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object' || typeof key !== 'string') return object;

		var keys = key.split(/\s+/),
			_evt = {
				keys: keys
			},
			objectData = map.get(object),
			exists,
			i;

		if (evt && typeof evt == 'object') {
			for (i in evt) {
				_evt[i] = evt[i];
			}
		}

		for (i = 0; i < keys.length; i++) {
			key = keys[i];
			exists = key in object;

			if (exists) {
				_evt.key = key;
				_evt.value = object[key];

				delete object[key];

				if (objectData) {
					core.unbindNode(object, key);
					core.off(object, 'change:' + key + ' beforechange:' + key + ' _runbindings:' + key + ' _rundependencies:' + key);
					delete objectData.special[key];

					if (!_evt.silent) {
						core._fastTrigger(object, 'delete', _evt);
						core._fastTrigger(object, 'delete:' + key, _evt);
					}
				}
			}
		}

		return object;
	};
});
