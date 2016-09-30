import defs from '../_core/defs';

// returns an array which contains all data values
export default function keys() {
    const def = defs.get(this);

    if (!def) {
        return [];
    }

    const keys = Object.keys(def.keys);
    const { length } = keys;
    const result = new Array(length);

    for(let i = 0; i < keys.length; i++) {
        result[i] = this[keys[i]];
    }

    return result;
}
