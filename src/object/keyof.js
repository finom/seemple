import defs from '../_core/defs';

export default function keyOf(value) {
    const def = defs.get(this);

    if(!def) {
        return null;
    }

    const keysArray = Object.keys(def.keys);

    for(let i = 0; i < keysArray.length; i++) {
        const key = keysArray[i];
        if(this[key] === value) {
            return key;
        }
    }

	return null;
}
