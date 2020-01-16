import initSeemple from './_core/init';
import defineProp from './_core/defineprop';
import checkObjectType from './_helpers/checkobjecttype';
import forEach from './_helpers/foreach';
import set from './set';
import seempleError from './_helpers/seempleerror';
import forOwn from './_helpers/forown';

// creates property mediator
function createMediator({
    object,
    propDef,
    key,
    mediator
}) {
    return function propMediator(value) {
        // args: value, previousValue, key, object itself
        return mediator.call(object, value, propDef.value, key, object);
    };
}

// transforms property value on its changing
export default function mediate(object, givenKeys, mediator) {
    if (typeof this === 'object' && this.isSeemple) {
        // when context is Seemple instance, use this as an object and shift other args
        /* eslint-disable no-param-reassign */
        mediator = givenKeys;
        givenKeys = object;
        object = this;
        /* eslint-enable no-param-reassign */
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'mediate');
    }

    const isKeysArray = givenKeys instanceof Array;

    // allow to use key-mediator object as another method variation
    if (typeof givenKeys === 'object' && !isKeysArray) {
        forOwn(givenKeys, (objVal, objKey) => mediate(object, objKey, objVal));
        return object;
    }

    initSeemple(object);

    // allow to use both single key and an array of keys
    const keys = isKeysArray ? givenKeys : [givenKeys];

    forEach(keys, (key) => {
        // if non-string is passed as a key
        if (typeof key !== 'string') {
            throw seempleError('mediate:key_type', { key });
        }

        const propDef = defineProp(object, key);

        const propMediator = propDef.mediator = createMediator({
            object,
            propDef,
            key,
            mediator
        });

        // set new value
        set(object, key, propMediator(propDef.value), {
            fromMediator: true
        });
    });

    return object;
}
