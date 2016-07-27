import removeListener from '../_events/removelistener';
import triggerOne from '../_events/triggerone';

const spaceReg = /\s+/;

// the function removes single binding for single object
// called by unbindNode
export default function removeBinding({ object, key, eventOptions }, {
    options,
    binder,
    node,
    nodeHandler,
    objectHandler
}) {
    const { destroy, on } = binder;
    const { silent } = eventOptions;

    // if "on" is function disable it
    // we cannot turn off custom listener defined by a programmer
    // programmer needs to remove custom listener maually via binder.destroy
    if (typeof on === 'function') {
        nodeHandler.disabled = true;
    } else if (typeof on === 'string'){
        // remove DOM event listener
        // removeEventListener is faster than "on" method from any DOM library
        nofn.forEach(on.split(spaceReg),
            evtName => node.removeEventListener(evtName, nodeHandler));
    }

    // remove object event listener
    removeListener(object, `_change:bindings:${key}`, objectHandler);

    // if binder.destroy is given call it
    if (destroy) {
        destroy.call(node, options);
    }

    // fire events
    if (!silent) {
        const extendedEventOptions = nofn.assign({
            key,
            node
        }, eventOptions);

        triggerOne(object, `unbind:${key}`, extendedEventOptions);
        triggerOne(object, 'unbind', extendedEventOptions);
    }
}
