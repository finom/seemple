/* eslint no-shadow: ["error", { "allow": ["evt"] }]*/
import initMK from '../_core/init';
import triggerOne from '../trigger/_triggerone';
import defineProp from '../_core/defineprop';
import domEventReg from './_domeventregexp';

// property modifier event regexp
const propModEventReg // eslint-disable-next-line max-len
    = /^_change:deps:|^_change:bindings:|^_change:delegated:|^_change:common:|^_change:tree:|^change:|^beforechange:/;

// adds simple event listener
// used as core of event engine
export default function addListener(object, name, callback, context, info = {}) {
    const { events: allEvents } = initMK(object);
    const ctx = context || object;
    const events = allEvents[name];
    const evt = { callback, context, ctx, name, info };
    // skipChecks is used by internal methods for better performance
    const { skipChecks = false } = info;


    if (!skipChecks) {
        const domEvtExecResult = domEventReg.exec(name);

        if (domEvtExecResult) {
            const [, eventName, key = 'sandbox', selector] = domEvtExecResult;
            // fixing circular reference issue
            const addDomListener = require('./_adddomlistener');

            addDomListener(object, key, eventName, selector, callback, context, info);

            return true;
        }
    }

    // if there are events with the same name
    if (events) {
        if (!skipChecks) {
            // if there are events with the same data, return false
            for (let i = 0; i < events.length; i++) {
                const evt = events[i];
                const argCallback = (callback && callback._callback) || callback;
                const evtCallback = evt.callback._callback || evt.callback;
                if (argCallback === evtCallback && evt.context === context) {
                    return false;
                }
            }
        }

        // if the event isn't found add it to the event list
        events.push(evt);
    } else {
        // if there are no events with the same name, create array with only ebent
        allEvents[name] = [evt];
    }

    if (propModEventReg.test(name)) {
        // define needed accessors for KEY
        defineProp(object, name.replace(propModEventReg, ''));
    }

    // names prefixed by underscore mean "private" events
    if (!skipChecks && name[0] !== '_') {
        triggerOne(object, `addevent:${name}`, evt);
        triggerOne(object, 'addevent', evt);
    }

    // if event is added return true
    return true;
}
