import initMK from '../../_core/init';
import renderItemNode from './renderitemnode';
import triggerOne from '../../trigger/_triggerone';
import checkAlreadyRendered from './checkalreadyrendered';

export default function processUnshift({
    self,
    selfDef,
    eventOptions,
    container
}) {
    const { added, removed, silent } = eventOptions;

    for (let i = added.length - 1; i + 1; i--) {
        const item = added[i];
        if(item && typeof item === 'object') {
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
                if (container.firstChild) {
					container.insertBefore(node, container.firstChild);
				} else {
					container.appendChild(node);
				}

                if(!silent) {
                    triggerOne(item, 'afterrender', itemEventOptions);
                }
            }
        }
    };
}
