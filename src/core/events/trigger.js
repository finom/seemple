define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/map',
	'matreshka_dir/core/util/common',
	'matreshka_dir/core/var/domevtreg'
], function(core, map, utils, domEvtReg) {
	"use strict";

	var triggerDOMEvent = function(el, name, args) {
		var doc = document,
			event;

		if(doc.createEvent) {
			/* istanbul ignore next */
			event = doc.createEvent('Event');
			event.initEvent(name, true, true);
			event.mkArgs = args;
			el.dispatchEvent(event);
		} else if(typeof Event != 'undefined') {
			event = new Event(name, {
				bubbles: true,
    			cancelable: true
			});
			event.mkArgs = args;
			el.dispatchEvent(event);
		} else {
			/* istanbul ignore next */
			throw Error('Cannot trigger DOM event');
		}

		return event;
	};

	core.trigger = function(object, names) {
		/* istanbul ignore if  */
		if (!object || typeof object != 'object') return object;

		var objectData = map.get(object),
			allEvents = objectData && objectData.events,
			args,
			i,
			j,
			l,
			events,
			ev,
			name,
			executed,
			nodes,
			_nodes,
			selector;



		if (names && allEvents) {
			args = utils.toArray(arguments, 2);
			names = names.split(/\s/);

			for (i = 0; i < names.length; i++) {
				name = names[i];
				if(~name.indexOf('::')) {
					executed = domEvtReg.exec(name);
					nodes = objectData.special[executed[3] || 'sandbox'];
					nodes = nodes && nodes.$nodes;
					_nodes = core.$();
					selector = executed[5];
					if(selector) {
						for(j = 0; j < nodes.length; j++) {
							_nodes = _nodes.add(nodes.find(selector));
						}
					} else {
						_nodes = nodes;
					}

					for(j = 0; j < _nodes.length; j++) {
						triggerDOMEvent(_nodes[i], executed[1], args);
					}
				} else {
					events = allEvents[name];
					if (events) {
						j = -1, l = events.length;
						while (++j < l)(ev = events[j]).callback.apply(ev.ctx, args);
					}
				}
			}
		}

		return object;
	};


	core._fastTrigger = function(object, name, evt) {
		var events = map.get(object).events[name],
			i, l, ev;

		if (events) {
			i = -1, l = events.length;
			while (++i < l)(ev = events[i]).callback.call(ev.ctx, evt);
		}
	};
});
