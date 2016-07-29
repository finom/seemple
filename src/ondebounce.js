import on from './on';
import checkObjectType from './_helpers/checkobjecttype';
import debounce from './_helpers/debounce'

export default function onDebounce(object, names, givenCallback, givenDelay, triggerOnInit, context) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        context = triggerOnInit;
        triggerOnInit = debounceDelay;
        debounceDelay = givenCallback;
        givenCallback = names;
        names = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'onDebounce');
    }

    const isNamesVarArray = names instanceof Array;

    if (names && typeof names === 'object' && !isNamesVarArray) {
        nofn.forOwn(names, (namesObjCallback, namesObjName) =>
            onDebounce(object, namesObjName, namesObjCallback, givenCallback, debounceDelay, triggerOnInit));
        return object;
    }

    const delay = typeof givenDelay === 'number' ? givenDelay : 0;

    const callback = debounce(givenCallback, delay);

    callback._callback = givenCallback;

    return on(object, names, callback, triggerOnInit, context);
}
