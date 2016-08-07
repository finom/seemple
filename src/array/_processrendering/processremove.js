import getAlreadyRendered from './getalreadyrendered';

export default function processRemove({
    self,
    selfDef,
    eventOptions,
    container
}) {
    const { removed } = eventOptions;
    nofn.forEach(removed, item => {
        if(item && typeof item === 'object') {
            const node = getAlreadyRendered({
                item,
                selfDef
            });

            if(node) {
                container.removeChild(node);
            }
        }
    });
}
