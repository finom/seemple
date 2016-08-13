import defs from '../_core/defs';

// iterates over data keys and calls callback on every iteration
export default function each(callback, thisArg) {
    const def = defs.get(this);

    if (!def) {
        return this;
    }

    nofn.forOwn(def.keys, (_, key) => {
        callback.call(thisArg || this, this[key], key, this);
    });

    return this;
}
