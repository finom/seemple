import is from '../_helpers/is';
import set from '../set';

// returns a function which called when bound node state is changed
export default function createNodeHandler({
    object,
    key,
    node,
    propDef,
    binder,
    bindingOptions
}) {
    return function nodeHandler(domEvent = {}) {
        // nodeHandler.disabled = true is set in unbindNode
        // we cannot "turn off" binder.on when its value is function
        // developer needs to clean memory (turn off callback) manualy in binder.destroy
        if (nodeHandler.disabled) {
            return;
        }

        const previousValue = propDef.value;
        const { which, target } = domEvent;
        const { getValue } = binder;
        const value = getValue.call(node, {
            previousValue,
            domEvent,
            originalEvent: domEvent.originalEvent || domEvent, // jQuery thing
            // will throw "preventDefault is not a function" when domEvent is empty object
            preventDefault: () => domEvent.preventDefault(),
            // will throw "stopPropagation is not a function" when domEvent is empty object
            stopPropagation: () => domEvent.stopPropagation(),
            which,
            target,
            ...bindingOptions
        });

        if (!is(value, previousValue)) {
            // TODO: Add description of a hack (why do we need changedNode, onChangeValue, binder?)
            set(object, key, value, {
                fromNode: true,
                changedNode: node,
                onChangeValue: value,
                binder
            });
        }
    };
}
