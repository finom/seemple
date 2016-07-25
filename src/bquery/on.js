import data from './_data';
import is from './is';

// the function is used when a selector is given
function delegateHandler(evt, selector, handler) {
    const randomID = Math.random().toString().replace('0.', 'x');
    const scopeSelector = `[${randomID}="${randomID}"] `;
    const splittedSelector = selector.split(',');

    let matching = '';

    for (let i = 0; i < splittedSelector.length; i++) {
        const sel = splittedSelector[i];
        matching += `${i === 0 ? '' : ','}${scopeSelector}${sel},${scopeSelector}${sel} *`;
    }


    this.setAttribute(randomID, randomID);

    if (is.call([evt.target], matching)) {
        handler.call(this, evt);
    }

    this.removeAttribute(randomID);
}

// adds event listener to a set of elemnts
export default function on(namesStr, selector, handler) {
    const names = namesStr.split(/\s/);
    let delegate;

    if (typeof selector === 'function') {
        handler = selector; // eslint-disable-line no-param-reassign
        selector = null; // eslint-disable-line no-param-reassign
    }

    if (selector) {
        delegate = function uniqueDelegateHandler(evt) {
            delegateHandler.call(this, evt, selector, handler);
        };
    }

    for (let i = 0; i < names.length; i++) {
        let name = names[i].split(/\.(.+)/);
        const namespace = name[1];
        name = name[0];

        for (let j = 0; j < this.length; j++) {
            const node = this[j];
            const nodeID = node.b$ = node.b$ || ++data.nodeIndex;
            const events = data.allEvents[name + nodeID] = data.allEvents[name + nodeID] || [];

            let exist = false;


            for (let k = 0; k < events.length; k++) {
                const event = events[k];

                if (handler === event.handler && (!selector || selector === event.selector)) {
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                events.push({
                    delegate,
                    handler,
                    namespace,
                    selector
                });

                node.addEventListener(name, delegate || handler, false);
            }
        }
    }

    return this;
}
