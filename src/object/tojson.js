import initMK from '../_core/init';
import defs from '../_core/defs';

// converts Matreshka.Object instance to ordinary object
export default function toJSON(recursive=true) {
    const def = defs.get(this);
    let result = {};

    if(!def) {
        return result;
    }

    const { keys } = def;

    nofn.forOwn(keys, (_, key) => {
        const value = this[key];
        // when recursive is true and when value has toJSON method then call it recusively
        if(recursive && value && typeof value.toJSON === 'function') {
            result[key] = value.toJSON(true);
        } else {
            result[key] = value;
        }
    });

	return result;
}
