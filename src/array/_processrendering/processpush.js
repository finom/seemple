import initMK from '../../_core/init';
import renderItemNode from './renderitemnode';
import triggerOne from '../../trigger/_triggerone';
import defs from '../../_core/defs';

export default function processPush({
    self,
    eventOptions,
    container
}) {
    const { added, removed, silent } = eventOptions;
    const selfDef = defs.get(self);

    nofn.forEach(added, item => {
        if(item && typeof item === 'object') {
            const itemDef = initMK(item);
            const { renderedInArrays } = itemDef;

            if(renderedInArrays && renderedInArrays[selfId]) {
                throw matreshkaError('array:add_render_twice');
            }

            const { node, itemEventOptions } = renderItemNode({
                selfDef,
                itemDef,
                self,
                item,
                eventOptions
            });

            if(node) {
                container.appendChild(node);
                if(!silent) {
                    triggerOne(item, 'afterrender', itemEventOptions);
                }
            }
        }
    });
}
