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
            delete keys[key];

            triggerOne(this, 'modify', {
                key,
                value: this[key]
            });
        }
    });

    return this;
}
