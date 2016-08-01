import unbindNode from './unbindnode';
import triggerOne from './trigger/_triggerone';
import removeListener from './off/_removelistener';
import defs from './_core/defs';
import checkObjectType from './_helpers/checkobjecttype';

// removes a property, its bindings and its events
export default function remove(object, givenKey, evt) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        evt = givenKey;
        givenKey = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'remove');
    }

    evt = evt || {};
    const def = defs.get(object);
    const { silent } = evt;
    // allow to pass single key or an array of keys
    const keys = givenKey instanceof Array ? givenKey : [givenKey];

    for(let i = 0; i < keys.length; i++) {
        const key = keys[i];

        // if non-string is passed as a key
        if(typeof key !== 'string') {
            throw matreshkaError('remove:key_type', { key })
        }

        const props = def && def.props;
        const propDef = props && props[key];

        // if no object definition then simply delete the property
        if (!propDef) {
            delete object[key];
            continue;
        }

        const { value } = propDef;

        // remove all bindings
        unbindNode(object, key);

        // TODO: Manual listing of event prefixes may cause problems in future
        const removeEventPrefies = [
            '_change:deps',
            '_change:bindings',
            '_change:delegated',
            '_change:tree',
            'change',
            'beforechange',
            'bind',
            'unbind'
        ]

        // remove all events
        nofn.forEach(removeEventPrefies, prefix => removeListener(object, `${prefix}:${key}`));

        // delete property definition
        delete props[key];

        // delete the property itself
        delete object[key];

        // fire events if "silent" is not true
		if (!silent) {
            const extendedEvt = nofn.assign({
                key,
                value
            }, evt);

            triggerOne(object, 'delete', extendedEvt);
			triggerOne(object, `delete:${key}`, extendedEvt);
		}
    }
}
