import defs from '../_core/defs';

export default function removeDataKeys(givenKeys) {
    const def = defs.get(this);

    if(!def) {
        return this;
    }

    const { keys } = def;
    let removedKeys;
    
    if(givenKeys instanceof Array) {
        removedKeys = givenKeys;
    } else {
        removedKeys = arguments;
    }

    nofn.forEach(removedKeys, key => {
        if(typeof key !== 'string') {
            throw matreshkaError('removedatakeys:key_type');
        }

        if(key in keys) {
            delete keys[key];

            triggerOne(this, 'modify', {
                key,
                value: this[key]
            });
        }
    });

    return this;
}
