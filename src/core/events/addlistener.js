define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/initmk',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/var/specialevtreg',
	'matreshka_dir/core/var/domevtreg'
], function(core, initMK, map, specialEvtReg, domEvtReg) {
	"use strict";
	var _addListener;

	core._fastAddListener = function(object, name, callback, context, evtData) {
		var allEvents = map.get(object).events,
			events = allEvents[name] || (allEvents[name] = []);

		events.push({
			callback: callback,
			context: context,
			ctx: context || object,
			name: name,
			node: evtData && evtData.node
		});

		if (specialEvtReg.test(name)) {
			// define needed accessors for KEY
			core._defineSpecial(object, name.replace(specialEvtReg, ''));
		}

		return object;
	};

	_addListener = core._addListener = function(object, name, callback, context, evtData) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return false;

		initMK(object);

		var ctx = context || object,
			allEvents = map.get(object).events,
			events = allEvents[name] || (allEvents[name] = []),
			l = events.length,

			defaultEvtData = {
				callback: callback,
				//_callback: callback._callback || callback,
				context: context,
				ctx: ctx,
				//howToRemove: null,
				name: name
			},
			i,
			ev,
			_evtData,
			executed;

		for (i = 0; i < l; i++) {
			ev = events[i];
			if ((ev.callback == callback || ev.callback == callback._callback) && ev.context == context) {
				return false;
			}
		}

		if (evtData) {
			_evtData = {};
			for (i in evtData) {
				_evtData[i] = evtData[i];
			}
			for (i in defaultEvtData) {
				_evtData[i] = defaultEvtData[i];
			}
		} else {
			_evtData = defaultEvtData;
		}

		events.push(_evtData);

		executed = domEvtReg.exec(name);

		if (executed && executed[2]) {
			core._addDOMListener(object, executed[3] || 'sandbox', executed[1], executed[5], callback, ctx, _evtData);
		} else if (specialEvtReg.test(name)) {
			// define needed accessors for KEY
			core._defineSpecial(object, name.replace(specialEvtReg, ''));
		}

		core._fastTrigger(object, 'addevent:' + name, _evtData);
		core._fastTrigger(object, 'addevent', _evtData);

		return true;
	};
});
