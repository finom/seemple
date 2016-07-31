import initMK from '../_core/init';
import matreshkaError from '../_helpers/matreshkaerror';
import defineProp from '../_core/defineprop';
import set from '../set';

export default function setData(key, value, evt) {
    // if no key or falsy key is given
    if(!key) {
        return this;
    }

    if(typeof key === 'object') {
        nofn.forOwn(key, (objVal, objKey) => this.setData(objKey, objVal, value));
        return this;
    }

    const { keys } = initMK(this);
    defineProp(this, key);
    keys[key] = 1;

    return set(this, key, value, evt);
}
