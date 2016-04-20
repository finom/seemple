/*eslint no-shadow: ["error", { "allow": ["name", "events"] }]*/
import defs from '../_core/defs';
import triggerOne from './triggerone';

// removes simple event listener to an object
export default function removeListener(object, name, callback, context, info) {
	const def = defs.get(object);

	// if no definition do nothing
	if (!def) return;

	const { events: allEvents } = def,
		events = allEvents[name],
		retain = [];

	// if all events need to be removed
	if (typeof name === 'undefined') {
		if (!info || !info.noTrigger) {
			nofn.forOwn(allEvents, (events, name) => {
				nofn.forEach(events, evt => {
					const removeEvtData = {
						name,
						callback: evt.callback,
						context: evt.context
					};

					triggerOne(object, `removeevent:${name}`, removeEvtData);
					triggerOne(object, 'removeevent', removeEvtData);
				});
			});
		}

		// restore default value of "events"
		def.events = {};
	} else if (events) { // if events with given name is found
		nofn.forEach(events, evt => {
			if (callback && (callback !== evt.callback && callback._callback !== evt.callback)
				|| (context && context !== evt.context)) {
				// keep event
				retain.push(evt);
			} else {
				const removeEvtData = {
					name,
					callback: evt.callback,
					context: evt.context
				};

				if (!info || !info.noTrigger) {
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
