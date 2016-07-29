import triggerOneDOMEvent from './_triggeronedomevent';
import defs from '../_core/defs';

// triggers DOM event on bound nodes
export default function triggerDOMEvent(object, key, eventName, selector, triggerArgs) {
    const def = defs.get(object);

    if(!def) {
        return object;
    }

    const { props } = def;
    const propDef = props[key];

    if(!propDef) {
        return object;
    }

    const { bindings } = propDef;

    if(!bindings) {
        return object;
    }

    nofn.forEach(bindings, ({ node }) => {

        if(selector) {
            // if selector is given trigger an event on all node descendants
            const descendants = node.querySelectorAll(selector);
            nofn.forEach(descendants, descendant => {
                triggerOneDOMEvent({
                    node: descendant,
                    eventName,
                    triggerArgs
                });
            });
        } else {
            // trigger an event for single node
            triggerOneDOMEvent({
                node,
                eventName,
                triggerArgs
            });
        }
    });

	return object;
}
