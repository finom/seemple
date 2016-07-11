import data from './_data';

export default function off(names, selector, handler) {
    var _this = this,
        name,
        namespace,
        node,
        events,
        event,
        i, j, k;

    if (typeof selector == 'function') {
        handler = selector;
        selector = null;
    }

    names = names.split(/\s/);

    for (i = 0; i < names.length; i++) {
        name = names[i].split(data.nsReg);
        namespace = name[1];
        name = name[0];

        for (j = 0; j < _this.length; j++) {
            node = _this[j];

            events = data.allEvents[name + node.b$];

            if (events) {
                for (k = 0; k < events.length; k++) {
                    event = events[k];
                    if ((!handler || handler == event.handler || handler == event.delegate) && (!namespace || namespace == event.namespace) && (!selector || selector == event.selector)) {
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

    return _this;
}
