import unbindNode from '../unbindnode';
// re-adds binding when object branch is changed
// the function is called by bindNode when something like
// 'foo.bar.baz' is passed to it as key arg value
export default function switchBinding({
    changeEvt,
    object,
    deepPath,
    $nodes,
    binder,
    evt,
    bindNode
}) {
    const deepPathLength = deepPath.length;
    let { value: target } = changeEvt;
    const { previousValue: previousTarget } = changeEvt;

    if (!target) {
        target = object;
        for (let i = 0; i < deepPathLength - 1; i++) {
            target = target[deepPath[i]];
        }
    }

    bindNode(target, deepPath[deepPathLength - 1], $nodes, binder, evt);

    // remove binding for previously used object
    if (previousTarget && typeof previousTarget === 'object') {
        unbindNode(previousTarget, deepPath[deepPathLength - 1], $nodes);
    }
}
