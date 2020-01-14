import on from './on';
import checkObjectType from './_helpers/checkobjecttype';
import forOwn from './_helpers/forown';
import off from './off';
import apply from './_helpers/apply';

// adds event listener which will be removed immediately after its first call
export default function once(object, names, givenCallback, context) {
    if (typeof this === 'object' && this.isSeemple) {
        // when context is Seemple instance, use this as an object and shift other args
        /* eslint-disable no-param-reassign */
        context = givenCallback;
        givenCallback = names;
        names = object;
        object = this;
        /* eslint-enable no-param-reassign */
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'once');
    }

    const isNamesVarArray = names instanceof Array;

    // allow to pass name-handler object
    if (names && typeof names === 'object' && !isNamesVarArray) {
        forOwn(names, (namesObjCallback, namesObjName) => once(
            object, namesObjName, namesObjCallback, givenCallback
        ));
        return object;
    }

    const callback = function onceCallback() {
        apply(givenCallback, this, arguments);
        // remove event listener after its call
        off(object, names, onceCallback, context);
    };

    // allow to remove event listener py passing original callback to "off"
    callback._callback = givenCallback;

    return on(object, names, callback, context);
}
