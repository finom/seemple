import initMK from '../_core/init';

export default function isDataKey(key) {
    const def = defs.get(this);

    if(!def) {
        return false;
    }

    return key in def.keys;
}
