import initMK from '../_core/init';

export default function setData(key, value, evt) {
    if(typeof key === 'object') {
        nofn.forOwn(key, (objVal, objKey) => this.setData(objKey, objVal, value));
        return this;
    }

    if(typeof key !== 'string') {
        throw matreshkaError('jset:key_type');
    }

    const { keys } = initMK(this);
    defineProp(this, key);
    keys[key] = 1;

    return set(this, value, evt)
}
