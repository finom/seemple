import data from './_data';
import Init from './_init';


export default function on(names, selector, handler) {
    var _this = this,
        delegate,
        name,
        namespace,
        node,
        nodeID,
        events,
        event,
        exist,
        i, j, k;

    if (typeof selector == 'function') {
        handler = selector;
        selector = null;
    }

    if (selector) {
        delegate = function delegatex(evt) {
            var randomID = 'x' + String(Math.random()).split('.')[1],
                node = this,
                scopeSelector,
                is;

            node.setAttribute(randomID, randomID);

            scopeSelector = '[' + randomID + '="' + randomID + '"] ';

            is = selector.split(',').map(function(sel) {
                return scopeSelector + sel + ',' + scopeSelector + sel + ' *';
            }).join(',');

            if (new Init(evt.target).is(is)) {
                handler.call(node, evt);
            }

            node.removeAttribute(randomID);
        }
    }

    names = names.split(/\s/);

    for (i = 0; i < names.length; i++) {
        name = names[i].split(data.nsReg);
        namespace = name[1];
        name = name[0];

        for (j = 0; j < _this.length; j++) {
            node = _this[j];
            nodeID = node.b$ = node.b$ || ++data.nodeIndex,
                events = data.allEvents[name + nodeID] = data.allEvents[name + nodeID] || [],
                exist = false;


            for (k = 0; k < events.length; k++) {
                event = events[k];

                if (handler == event.handler && (!selector || selector == event.selector)) {
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                events.push({
                    delegate: delegate,
                    handler: handler,
                    namespace: namespace,
                    selector: selector
                });

                node.addEventListener(name, delegate || handler, false);
            }
        }
    }

    return _this;
};
