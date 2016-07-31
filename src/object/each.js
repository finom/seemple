import defs from '../_core/defs';

export default function each(callback, thisArg) {
    const def = defs.get(this);

    if(!def) {
        return this;
    }

    nofn.forOwn(def.keys, key => {
        callback.call(thisArg || this, this[key], key, this);
    });

    return this;
}
