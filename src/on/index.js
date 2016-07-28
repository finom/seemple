
// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/

export default function on(object, names, callback, triggerOnInit, context, info) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        info = context;
        context = triggerOnInit;
        triggerOnInit = callback;
        callback = names;
        names = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'on');
    }


    /*if (names && typeof names === 'object') {
        nofn.forOwn(key, (keyObjValue, keyObjKey) => unbindNode(object, keyObjKey, keyObjValue, node));
        return object;
    }

    if(typeof names !== 'string') {
        throw matreshkaError('on:names_type', { names })
    }*/

}
