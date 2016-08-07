import getAlreadyRendered from './getalreadyrendered';

export default function processSort({
    self,
    selfDef,
    eventOptions,
    container
}) {
    nofn.forEach(self, item => {
        if(item && typeof item === 'object') {
            const node = getAlreadyRendered({
                item,
                selfDef
            });

            if(node) {
                container.appendChild(node);
            }
        }
    });

}
