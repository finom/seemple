import defs from './defs';
import set from '../set';

// the function defines needed descriptor for given property
export default function defineProp(object, key) {
    const def = defs.get(object);

    // if no object definition do nothing
    if (!def) {
        return null;
    }

    if (!def.props[key]) {
        const propDef = def.props[key] = {
            value: object[key],
            getter: null,
            setter: null,
            mediator: null,
            bindings: null
        };

        Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            get() {
                return propDef.getter ? propDef.getter.call(object) : propDef.value;
            },
            set(v) {
                return propDef.setter ? propDef.setter.call(object, v) : set(object, key, v, {
                    fromSetter: true
                });
            }
        });
    }

    return def.props[key];
}
