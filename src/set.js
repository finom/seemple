import defs from './_core/defs';
import triggerOne from './trigger/_triggerone';
import checkObjectType from './_helpers/checkobjecttype';
import is from './_helpers/is';

// the function sets new value for a property
// since its performance is very critical we're checking events existence manually
export default function set(object, key, value, evt) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        evt = value;
        value = key;
        key = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'set');
    }

    // if no key or falsy key is given
    if (!key) {
        return object;
    }

    evt = evt || {};
    const def = defs.get(object);

    // if no object definition then make simple assignment
    if (!def) {
        object[key] = value;
        return object;
    }

    const { props, events } = def;
    const propDef = props[key];

    // allow to use key-value object as another variation
    if (typeof key == 'object') {
        nofn.forOwn(key, (objVal, objKey) => set(object, objKey, objVal, value));
        return object;
    }

    // if no property definition then make simple assignment
    if (!propDef) {
        object[key] = value;
        return object;
    }

    const { value: previousValue, mediator } = propDef;

    // possible flags
    const {
        skipMediator,
        fromMediator,
        force,
        forceHTML,
        silent,
        silentHTML,
        skipLinks
    } = evt;

    let newValue;

    if (mediator && !is(value, previousValue) && !skipMediator && !fromMediator) {
        // TODO
        newValue = special.mediator(v, prevVal, key, object);
    } else {
        newValue = value;
    }

    const isChanged = !is(newValue, previousValue);

    // add to evt object some useful properties
    const extendedEvt = nofn.assign({
        value: newValue,
        self: object,
        previousValue,
        key,
        isChanged
    }, evt);

    const triggerChange = (isChanged || force) && !silent;

    // trigger beforechange:KEY and beforechange events
    if (triggerChange) {
        const beforechangeStr = 'beforechange';
        const beforechangeEvtName = `${beforechangeStr}:${key}`;

        if(events[beforechangeEvtName]) {
            triggerOne(object, beforechangeEvtName, extendedEvt);
        }

        if(events[beforechangeStr]) {
            triggerOne(object, beforechangeStr, extendedEvt);
        }
    }

    propDef.value = newValue;

    // triger bindings
    if (!silentHTML && (isChanged || force || forceHTML)) {
        const changeBindingsEvtName = `_change:bindings:${key}`;
        if(events[changeBindingsEvtName]) {
            triggerOne(object, changeBindingsEvtName, extendedEvt);
        }
    }

    // trigger change:KEY and change events
    if (triggerChange) {
        const changeStr = 'change';
        const changeEvtName = `${changeStr}:${key}`;
        if(events[changeEvtName]) {
            triggerOne(object, changeEvtName, extendedEvt);
        }

        if(events[changeStr]) {
            triggerOne(object, changeStr, extendedEvt);
        }
    }

    // trigger dependencies (made with linkProps)
    if ((isChanged || force) && !skipLinks) {
        const changeDepsEvtName = `_change:deps:${key}`;
        if(events[changeDepsEvtName]) {
            triggerOne(object, changeDepsEvtName, extendedEvt);
        }
    }

    // trigger delegated events logic
    if(isChanged) {
        const changeDelegatedEvtName = `_change:delegated:${key}`;
        if (events[changeDelegatedEvtName]) {
            triggerOne(object, changeDelegatedEvtName, extendedEvt);
        }
    }

    // trigger delegated events logic
    if(isChanged) {
        const changeTreeEvtName = `_change:tree:${key}`;
        if (events[changeTreeEvtName]) {
            triggerOne(object, changeTreeEvtName, extendedEvt);
        }
    }

    return object;
}
