import is from '../_util/is';
import set from '../set';

// this function is called when bound node is changed
export default function runNodeHandler({
    domEvent = {},
    object,
    key,
    node,
    propDef,
    binder,
    bindingOptions
}) {
    const previousValue = propDef.value;
    const { which, target } = domEvent;
    const { getValue } = binder;
    const value = getValue.call(node, nofn.assign({
        previousValue,
        domEvent,
        originalEvent: domEvent.originalEvent || domEvent, // jQuery thing
        // will throw "preventDefault is not a function" when domEvent is empty object
        preventDefault: () => domEvent.preventDefault(),
        // will throw "stopPropagation is not a function" when domEvent is empty object
        stopPropagation: () => domEvent.stopPropagation(),
        which,
        target
    }, bindingOptions));

    if (!is(value, previousValue)) {
        // TODO add description of a hack
        // why do we need changedNode, onChangeValue, binder?
        set(object, key, value, {
            fromNode: true,
            changedNode: node,
            onChangeValue: value,
            binder
        });
    }
}
