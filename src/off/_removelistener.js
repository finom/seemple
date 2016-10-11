import defs from '../_core/defs';
import triggerOne from '../trigger/_triggerone';
import domEventReg from '../on/_domeventregexp';

// removes simple event listener from an object
export default function removeListener(object, name, callback, context, info) {
    const def = defs.get(object);

    // if no definition do nothing
    if (!def) {
        return false;
    }

    const { events: allEvents } = def;
    const events = allEvents[name];
    const retain = [];
    const noTrigger = name ? name[0] === '_' : false;
    const domEventExecResult = domEventReg.exec(name);

    if (domEventExecResult) {
        const [, eventName, key = 'sandbox', selector] = domEventExecResult;
        // fixing circular reference issue
        const removeDomListener = require('./_removedomlistener');

        removeDomListener(object, key, eventName, selector, callback, context, info);

        return true;
    }

    // if all events need to be removed
    if (typeof name === 'undefined') {
        if (!noTrigger) {
            nofn.forOwn(allEvents, (allEventsItem, allEventsName) => {
                nofn.forEach(allEventsItem, (event) => {
                    const removeEventData = {
                        allEventsName,
                        callback: event.callback,
                        context: event.context
                    };

                    triggerOne(object, `removeevent:${name}`, removeEventData);
                    triggerOne(object, 'removeevent', removeEventData);
                });
            });
        }

        // restore default value of "events"
        def.events = {};
    } else if (events) {
        // if events with given name are found
        nofn.forEach(events, (event) => {
            const argCallback = (callback && callback._callback) || callback;
            const eventCallback = event.callback._callback || event.callback;

            if ((argCallback && argCallback !== eventCallback)
                || (context && context !== event.context)) {
                // keep event
                retain.push(event);
            } else {
                const removeEventData = {
                    name,
                    callback: event.callback,
                    context: event.context
                };

                if (!noTrigger) {
                    triggerOne(object, `removeevent:${name}`, removeEventData);
                    triggerOne(object, 'removeevent', removeEventData);
                }
            }
        });

        if (retain.length) {
            allEvents[name] = retain;
        } else {
            delete def.events[name];
        }
    }

    return false;
}
