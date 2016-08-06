import initMK from '../../_core/init';
import renderItemNode from './renderitemnode';
import triggerOne from '../../trigger/_triggerone';
import defs from '../../_core/defs';

export default function processRecreate({
    self,
    eventOptions,
    container
}) {
    const { added, removed, silent } = eventOptions;
    const selfDef = defs.get(self);
    const { id: selfId } = selfDef;

    nofn.forEach(removed, item => {
        const itemDef = defs.get(item);
        
        if(itemDef) {
            const { renderedInArrays } = itemDef;
            const node = renderedInArrays && itemDef.renderedInArrays[selfId];
            if(node) {
                delete itemDef.renderedInArrays[selfId];
                container.removeChild(node);
            }
        }
    });

    const addedMap = {};

    nofn.forEach(added, item => {
        const itemDef = defs.get(item);

        addedMap[itemDef.id] = renderItemNode({
            itemDef,
            selfDef,
            self,
            item,
            eventOptions
        });
    });

    const alreadyRenderedMap = {};

    nofn.forEach(self, item => {
        const itemDef = initMK(item);
        if(itemDef) {
            const { renderedInArrays } = itemDef;

            if(renderedInArrays[selfDef.id]) {
                if(alreadyRenderedMap[itemDef.id]) {
                    throw matreshkaError('array:add_render_twice');
                }

                alreadyRenderedMap[itemDef.id] = true;

                container.appendChild(renderedInArrays[selfDef.id]);

                if(itemDef.id in addedMap) {
                    const { itemEventOptions } = addedMap[itemDef.id];
                    if(!silent) {
                        triggerOne(item, 'afterrender', itemEventOptions);
                    }
                }
            }
        }

    });
}
