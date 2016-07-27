import initMK from './_core/init';

export default function calc(object, target, source, handler, evt) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        evt = handler;
        handler = source;
        source = target;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'calc');
    }

    //evt = evt || {};
    const defs = initMK(object);

    if (key instanceof Array) {
            /*
             * accept array of objects
             * this.calc([{target, source, handler, event}], commonEvent);
             */
            nofn.forEach(key, ({
                key: itemKey,
                node: itemNode,
                binder: itemBinder,
                event: itemEvent
            }) => {
                const commonEvent = node;
                const mergedEvent = {};


                if(itemEvent) {
                    // extend event object by "local" event ("event" key of an object)
                    nofn.assign(mergedEvent, itemEvent);
                }

                if(commonEvent) {
                    // extend event object by "global" event
                    nofn.assign(mergedEvent, commonEvent);
                }

                bindNode(object, itemKey, itemNode, itemBinder, mergedEvent);
            });

        return object;
    }
}
