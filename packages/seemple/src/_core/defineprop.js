import defs from './defs';
import set from '../set';
import seempleError from '../_helpers/seempleerror';

function errorAccessor() {
  throw seempleError('common:use_magic_props');
}

// the function defines needed descriptor for given property
export default function defineProp(object, key, noAccessor) {
  const def = defs.get(object);

  // if no object definition do nothing
  if (!def) {
    return null;
  }

  if (!def.props[key]) {
    const propDef = def.props[key] = {
      value: object[key],
      mediator: null,
      bindings: null
    };
    let getter;
    let setter;

    // make possible to throw an error on get and on set if sandbox (for all objects)
    // or container (for Seemple.Array instances) are used
    if (key === 'sandbox' || (object.isSeempleArray && key === 'container')) {
      getter = setter = errorAccessor;
    }

    if (!noAccessor) {
      Object.defineProperty(object, key, {
        configurable: true,
        enumerable: true,
        get() {
          return getter ? getter() : propDef.value;
        },
        set(v) {
          return setter ? setter() : set(object, key, v, {
            fromSetter: true
          });
        }
      });
    }
  }

  return def.props[key];
}
