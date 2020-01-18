import defs from '../_core/defs';
import removeListener from './_removelistener';
import dom from '../_dom';
import forEach from '../_helpers/foreach';

// removes dom listener from nodes bound to given key
export default function removeDomListener(
  object,
  key,
  eventName,
  selector,
  callback,
  context,
  info
) {
  const def = defs.get(object);

  if (!def) {
    return object;
  }

  const { props } = def;
  const propDef = props[key];

  if (!propDef) {
    return object;
  }

  const { bindings } = propDef;

  if (bindings) {
    // collect bound nodes and remove DOM event listener
    const nodes = Array(bindings.length);
    const eventNamespace = def.id + key;

    forEach(bindings, (binding, index) => {
      nodes[index] = binding.node;
    });

    dom.$(nodes).off(`${eventName}.${eventNamespace}`, selector, callback);
  }

  // remove bind and unbind listeners from given key
  removeListener(object, `bind:${key}`, callback, context, info);
  removeListener(object, `unbind:${key}`, callback, context, info);

  return object;
}
