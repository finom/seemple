// this function is called when property value is changed
export default function runObjectHandler ({
    node,
    propDef,
    binder,
    options,
    evt
}) {
    const { value } = propDef;
    const { onChangeValue, changedNode, binder: evtBinder } = evt;
    const { setValue } = binder;
	// dirty hack for https://github.com/matreshkajs/matreshka/issues/19
	const dirtyHackValue = onChangeValue === 'string' && typeof value === 'number' ? value + '' : value;

    if (changedNode === node && onChangeValue === dirtyHackValue && evtBinder === binder) {
        return;
    }

    setValue.call(node, value, nofn.assign({ value }, options));
}
