define([
	'matreshka_dir/core/var/core',
	'matreshka_dir/core/var/sym',
	'matreshka_dir/core/util/common',
	'matreshka_dir/core/var/domevtreg'
], function(core, sym, utils, domEvtReg) {
	"use strict";

	var triggerDOMEvent = function(el, name, args) {
		var doc = document,
			event;

		if(doc.createEvent) {
			event = doc.createEvent('Event');
			event.initEvent(name, true, true);
			event.mkArgs = args;
			el.dispatchEvent(event);
		} else if(typeof Event != 'undefined' && !el.fireEvent) {
			event = new Event(name, {
				bubbles: true,
    			cancelable: true
			});
			event.mkArgs = args;
			el.dispatchEvent(event);
		} else if(el.fireEvent) {
			event = doc.createEventObject();
			event.mkArgs = args;
			el.fireEvent('on' + name, event);
		} else {
			throw Error('Cannot trigger DOM event');
		}

		return event;
	};

	core.trigger = function(object, names) {
		var allEvents = object && typeof object == 'object' && object[sym] && object[sym].events,
			args, i, j, l, events, ev, name, executed, nodes, _nodes, selector;

		if (names && allEvents) {
			args = utils.toArray(arguments, 2);
			names = names.split(/\s/);

			for (i = 0; i < names.length; i++) {
				name = names[i];
				if(~name.indexOf('::')) {
					executed = domEvtReg.exec(name);
					nodes = object[sym].special[executed[3] || 'sandbox'];
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
		var events = object[sym].events[name],
			i, l, ev;

		if (events) {
			i = -1, l = events.length;
			while (++i < l)(ev = events[i]).callback.call(ev.ctx, evt);
		}
	};
});
