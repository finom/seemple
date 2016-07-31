import defs from '../_core/defs';

export default function keyOf(value) {
    const def = defs.get(this);
    let result = null;

    if(!def) {
        return result;
    }

    const { keys } = def;

    nofn.forOwn(keys, key => {
        if(this[key] === value) {
            result = key;
            return;
        }
    });

	return result;
}
