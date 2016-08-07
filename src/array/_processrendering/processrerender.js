import getAlreadyRendered from './getalreadyrendered';
import renderItemNode from './renderitemnode';
import triggerOne from '../../trigger/_triggerone';

export default function processSort({
    self,
    selfDef,
    eventOptions,
    container
}) {
    const { forceRerender, silent } = eventOptions;

    for(let i = 0; i < self.length; i++) {
        const item = self[i];
        if(item && typeof item === 'object') {
            const alreadyRenderedNode = getAlreadyRendered({
                item,
                selfDef
            });

            if(!forceRerender && alreadyRenderedNode) {
                container.appendChild(alreadyRenderedNode);
                continue;
            }

            if(alreadyRenderedNode) {
                if(container.contains(alreadyRenderedNode)) {
                    container.removeChild(alreadyRenderedNode);
                }
            }

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

    }

}
