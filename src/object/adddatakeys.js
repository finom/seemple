import initMK from '../_core/init';
import defineProp from '../_core/defineprop';

export default function addDataKeys(givenKeys) {
    const { keys } = initMK();
    let newKeys;
    if(givenKeys instanceof Array) {
        newKeys = givenKeys;
    } else {
        newKeys = arguments;
    }

    nofn.forEach(newKeys, key => {
        if(typeof key !== 'string') {
            throw matreshkaError('adddatakeys:key_type');
        }

        if(!(key in keys)) {
            const { value } = defineProp(this, key);
            keys[key] = true;

            triggerOne(this, 'modify', { key, value });
        }
    });

    return this;
}
