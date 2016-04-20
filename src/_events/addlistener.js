/*eslint no-shadow: ["error", { "allow": ["evt"] }]*/

import initMK from '../_core/init';
import triggerOne from './triggerone';

// adds simple event listener
// used as core of event engine
export default function addListener(object, name, callback, context, info) {
	const { events: allEvents } = initMK(object),
		ctx = context || object,
		events = allEvents[name],
		evt = { callback, context, ctx, name };


	// if there are events with the same name
	if (events) {
		// if there are events with the same data, return false
		for (let i = 0; i < events.length; i++) {
			const evt = events[i];
			if ((evt.callback === callback || evt.callback === callback._callback)
					&& evt.context === context) {
				return false;
			}
		}

		// if the event isn't found add it to the event list
		events.push(evt);
	} else {
		// if there are no events with the same name, create array with only ebent
		allEvents[name] = [evt];
	}

	if (!info || !info.noTrigger) {
		triggerOne(object, `addevent:${name}`, evt);
		triggerOne(object, 'addevent', evt);
	}

	// if event is added return true
	return true;
}
