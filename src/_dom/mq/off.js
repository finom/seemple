import data from './_data';

// removes event handler from a set of elements
export default function off(names, selector, handler) {
    if (typeof selector === 'function') {
        handler = selector; // eslint-disable-line no-param-reassign
        selector = null;  // eslint-disable-line no-param-reassign
    }

    names = names.split(/\s/);

    for (let i = 0; i < names.length; i++) {
        let name = names[i].split(/\.(.+)/);
        const namespace = name[1];
        name = name[0];

        for (let j = 0; j < this.length; j++) {
            const node = this[j];
            const events = data.allEvents[name + node.b$];

            if (events) {
                for (let k = 0; k < events.length; k++) {
                    const event = events[k];
                    if (
                        (!handler || handler === event.handler || handler === event.delegate)
                        && (!namespace || namespace === event.namespace)
                        && (!selector || selector === event.selector)
                    ) {
                        node.removeEventListener(name, event.delegate || event.handler);
                        events.splice(k--, 1);
                    }
                }
            } else {
                if (!namespace && !selector) {
                    node.removeEventListener(name, handler);
                }
            }
        }
    }

    return this;
}
