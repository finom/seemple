import defs from '../../_core/defs';
import matreshkaError from '../../_helpers/matreshkaerror';

export default function checkAlreadyRendered({
    item,
    selfDef
}) {
    const itemDef = defs.get(item);
    const { id: selfId } = selfDef;

    if(itemDef) {
        const { renderedInArrays } = itemDef;

        if(renderedInArrays && renderedInArrays[selfId]) {
            throw matreshkaError('array:add_render_twice');
        }
    }
}
