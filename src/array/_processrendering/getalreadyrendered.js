import defs from '../../_core/defs';

// returns already rendered node of an object in given array
// selfDef is given instead of  itself (array) for an optimisation
export default function getAlreadyRendered({
    item,
    selfDef
}) {
    const itemDef = defs.get(item);
    const { id: selfId } = selfDef;

    // if item object is defined in object defs
    if(itemDef) {
        const { renderedInArrays } = itemDef;

        // if item's node is already rendered for an array
        // then return it
        if(renderedInArrays && renderedInArrays[selfId]) {
            return renderedInArrays[selfId];
        }
    }
}
