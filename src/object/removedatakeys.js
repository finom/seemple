import defs from '../_core/defs';
import triggerOne from '../trigger/_triggerone';
import matreshkaError from '../_helpers/matreshkaerror';

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
            throw matreshkaError('removedatakeys:key_type', { key });
        }

        if(key in keys) {
            const evt = {
                key,
                value: this[key]
            };

            delete keys[key];

            triggerOne(this, 'modify', evt);
            triggerOne(this, 'remove', evt);
        }
    });

    return this;
}
