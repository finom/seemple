import on from './on';
import checkObjectType from './_helpers/checkobjecttype';
import off from './off';

export default function once(object, names, givenCallback, context) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        context = givenCallback;
        givenCallback = names;
        names = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'once');
    }

    const isNamesVarArray = names instanceof Array;

    if (names && typeof names === 'object' && !isNamesVarArray) {
        nofn.forOwn(names, (namesObjCallback, namesObjName) =>
            once(object, namesObjName, namesObjCallback, givenCallback));
        return object;
    }

    const callback = function onceCallback() {
        givenCallback.apply(this, arguments);
        off(object, names, onceCallback, context);
    }

    callback._callback = givenCallback;

    return on(object, names, callback, context);
}
