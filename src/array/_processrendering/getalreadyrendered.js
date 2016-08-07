import defs from '../../_core/defs';

export default function getAlreadyRendered({
    item,
    selfDef
}) {
    const itemDef = defs.get(item);
    const { id: selfId } = selfDef;

    if(itemDef) {
        const { renderedInArrays } = itemDef;

        if(renderedInArrays && renderedInArrays[selfId]) {
            return renderedInArrays[selfId];
        }
    }
}
