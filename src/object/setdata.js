import initMK from '../_core/init';
import matreshkaError from '../_helpers/matreshkaerror';
import defineProp from '../_core/defineprop';
import set from '../set';

// changes property value and adds given key to a list of data keys
export default function setData(key, value, evt) {
    // if no key or falsy key is given
    if(!key) {
        return this;
    }

    // allow to pass key-value object
    if(typeof key === 'object') {
        nofn.forOwn(key, (objVal, objKey) => this.setData(objKey, objVal, value));
        return this;
    }

    const { keys } = initMK(this);

    // define descriptors for given property
    defineProp(this, key);

    // add a key to a list of keys
    keys[key] = 1;

    // do other things with set method
    return set(this, key, value, evt);
}
