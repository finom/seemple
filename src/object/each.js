import defs from '../_core/defs';

// iterates over data keys and calls callback on every iteration
// @IE for..of is preferable and the method will be removed in one of major versions
export default function each(callback, thisArg) {
    const def = defs.get(this);
    const ctx = typeof thisArg !== 'undefined' ? thisArg : this;

    if (!def) {
        return this;
    }

    nofn.forOwn(def.keys, (_, key) => {
        callback.call(ctx, this[key], key, this);
    });

    return this;
}
