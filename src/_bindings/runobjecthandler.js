// this function is called when property value is changed
export default function runObjectHandler({
    node,
    propDef,
    binder,
    bindingOptions,
    eventOptions
}) {
    const { value } = propDef;
    const { onChangeValue, changedNode, binder: evtBinder } = eventOptions;
    const { setValue } = binder;
    // dirty hack for https://github.com/matreshkajs/matreshka/issues/19
    const dirtyHackValue = onChangeValue === 'string' && typeof value === 'number'
        ? String(value) : value;

    if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
        return;
    }

    setValue.call(node, value, nofn.assign({ value }, bindingOptions));
}
