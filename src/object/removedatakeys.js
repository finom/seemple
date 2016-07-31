import defs from '../_core/defs';
import triggerOne from '../trigger/_triggerone';
import matreshkaError from '../_helpers/matreshkaerror';

// removes given keys from a list of data keys
export default function removeDataKeys(givenKeys) {
    const def = defs.get(this);

    if(!def) {
        return this;
    }

    const { keys } = def;
    let removedKeys;

    // accept an array keys or a list of args
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

            // trigger events which inform their listeners that data is changed
            triggerOne(this, 'modify', evt);
            triggerOne(this, 'remove', evt);
        }
    });

    return this;
}
