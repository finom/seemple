import initMK from '../../_core/init';
import renderItemNode from './renderitemnode';
import triggerOne from '../../trigger/_triggerone';
import defs from '../../_core/defs';
import checkAlreadyRendered from './checkalreadyrendered';
import matreshkaError from '../../_helpers/matreshkaerror';
import getAlreadyRendered from './getalreadyrendered';


export default function processRecreate({
    self,
    selfDef,
    eventOptions,
    container
}) {
    const { added, removed, silent } = eventOptions;
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

    const alreadyRenderedMap = {};

    nofn.forEach(self, item => {
        if(item && typeof item === 'object') {

            const itemDef = defs.get(item);
            const node = getAlreadyRendered({
                item,
                selfDef
            });

            if(node) {
                if(itemDef.id in alreadyRenderedMap) {
                    throw matreshkaError('array:add_render_twice');
                }

                alreadyRenderedMap[itemDef.id] = true;

                container.appendChild(node);
            } else {
                const { node, itemEventOptions } = renderItemNode({
                    selfDef,
                    self,
                    item,
                    eventOptions
                });

                if(node) {
                    if(itemDef.id in alreadyRenderedMap) {
                        throw matreshkaError('array:add_render_twice');
                    }

                    alreadyRenderedMap[itemDef.id] = true;

                    container.appendChild(node);
                    if(!silent) {
                        triggerOne(item, 'afterrender', itemEventOptions);
                    }
                }
            }
        }
    });

    /*nofn.forEach(self, item => {
        if(!~added.indexOf(item)) {
            const node = getAlreadyRendered({
                item,
                selfDef
            });

            if(node) {
                container.appendChild(node);
            }
        } else {
            checkAlreadyRendered({
                item,
                selfDef
            });

            const { node, itemEventOptions } = renderItemNode({
                selfDef,
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
    });*/

    /*nofn.forEach(added, item => {
        const itemDef =
        checkAlreadyRendered({
            item,
            selfDef
        });
    });*/


    /*nofn.forEach(added, item => {
        checkAlreadyRendered({
            item,
            selfDef
        });
    });

    nofn.forEach(self, item => {
        const node = getAlreadyRendered({
            item,
            selfDef
        });

        if(node) {

        }
    });*/

    /*const selfDef = defs.get(self);
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

    });*/
}
