import removeListener from '../off/_removelistener';
import triggerOne from '../trigger/_triggerone';
import forEach from '../_helpers/foreach';

const spaceReg = /\s+/;

// the function removes single binding for single object
// called by unbindNode
export default function removeBinding({
    object,
    key,
    eventOptions,
    binding
}) {
    const {
        bindingOptions,
        binder,
        node,
        nodeHandler,
        objectHandler
    } = binding;
    const { destroy, on } = binder;
    const { silent } = eventOptions;

    // if "on" is a function then disable it
    // we cannot "turn off" custom listener defined by a programmer
    // programmer needs to remove custom listener maually inside binder.destroy
    if (typeof on === 'function') {
        nodeHandler.disabled = true;
    } else if (typeof on === 'string') {
        // remove DOM event listener
        // removeEventListener is faster than "on" method from any DOM library
        forEach(
            on.split(spaceReg),
            evtName => node.removeEventListener(evtName, nodeHandler)
        );
    }

    // remove object event listener
    removeListener(object, `_change:bindings:${key}`, objectHandler);

    // if binder.destroy is given call it
    if (destroy) {
        destroy.call(node, bindingOptions);
    }

    // fire events
    if (!silent) {
        const extendedEventOptions = {
            key,
            node,
            ...eventOptions
        };

        triggerOne(object, `unbind:${key}`, extendedEventOptions);
        triggerOne(object, 'unbind', extendedEventOptions);
    }
}
