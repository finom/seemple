import initMK from '../_core/init';
import defineProp from '../_core/defineprop';
import addListener from './_addlistener';
import dom from '../_dom';
import createDomEventHandler from './_createdomeventhandler';

// returns an object with event handlers used in addDomListener
function createBindingHandlers({
    fullEventName,
    domEventHandler,
    selector
}) {
    return {
        bindHandler(evt) {
            if(evt && evt.node) {
                dom.$(evt.node).on(fullEventName, selector, domEventHandler);
            }
        },
        unbindHandler(evt) {
            if(evt && evt.node) {
                dom.$(evt.node).off(fullEventName, selector, domEventHandler);
            }
        }
    }

}

// adds DOM event listener for nodes bound to given property
export default function addDomListener(object, key, eventName, selector, callback, context, info) {
    const def = initMK(object);
    const propDef = defineProp(object, key);

    const domEventHandler = createDomEventHandler({
        key,
        object,
        callback,
        context
    });

    // making possible to remove this event listener
    domEventHandler._callback = callback;

    const eventNamespace = def.id + key;
    const fullEventName = `${eventName}.${eventNamespace}`;
    const { bindHandler, unbindHandler } = createBindingHandlers({
        fullEventName,
        domEventHandler,
        selector
    });
    const addBindListenerResult
        = addListener(object, `bind:${key}`, bindHandler, context, info);
    const addUnbindListenerResult
        = addListener(object, `unbind:${key}`, unbindHandler, context, info);

    // if events are added successfully then run bindHandler for every node immediately
    if (addBindListenerResult && addUnbindListenerResult) {
        const { bindings } = propDef;
        if (bindings) {
            nofn.forEach(bindings, ({ node }) => bindHandler({ node }));
        }
    }

    return object;
}
