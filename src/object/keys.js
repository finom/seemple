import defs from '../_core/defs';

export default function keys() {
    const def = defs.get(this);

    if(!def) {
        return {};
    }

	return Object.keys(def.keys);
}
