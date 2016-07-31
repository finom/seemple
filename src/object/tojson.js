import initMK from '../_core/init';
import defs from '../_core/defs';

export default function toJSON(recursive=true) {
    const def = defs.get(this);
    let result = {};

    if(!def) {
        return result;
    }

    const { keys } = def;

    nofn.forOwn(keys, key => {
        const value = this[key];
        if(value && typeof value.toJSON === 'function' && recursive) {
            result[key] = value.toJSON(true);
        } else {
            result[key] = value;
        }
    });

	return result;
}
