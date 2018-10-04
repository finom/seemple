import splitBySpaceReg from './_splitbyspaceregexp';
import checkObjectType from '../_helpers/checkobjecttype';
import matreshkaError from '../_helpers/matreshkaerror';
import addListener from './_addlistener';
import delegateListener from './_delegatelistener';

// adds event listener
export default function on(object, givenNames, callback, triggerOnInit, context) {
    if (typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        /* eslint-disable no-param-reassign */
        context = triggerOnInit;
        triggerOnInit = callback;
        callback = givenNames;
        givenNames = object;
        object = this;
        /* eslint-enable no-param-reassign */
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'on');
    }

    const isNamesVarArray = givenNames instanceof Array;

    // allow to pass name-handler object
    if (givenNames && typeof givenNames === 'object' && !isNamesVarArray) {
        nofn.forOwn(givenNames, (namesObjCallback, namesObjName) => on(
            object, namesObjName, namesObjCallback, callback, triggerOnInit
        ));
        return object;
    }

    if (typeof givenNames !== 'string' && !isNamesVarArray) {
        throw matreshkaError('on:names_type', { names: givenNames });
    }

    // split by spaces
    // TODO: Array of names passed to on method is non-documented feature
    const names = isNamesVarArray ? givenNames : givenNames.split(splitBySpaceReg);

    // flip triggerOnInit and context when triggerOnInit is not boolean
    if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
        // eslint-disable-next-line no-param-reassign
        [context, triggerOnInit] = [triggerOnInit, context];
    }

    nofn.forEach(names, (name) => {
        const delegatedEventParts = name.split('@');

        if (delegatedEventParts.length > 1) {
            // if @ exists in event name then this is delegated event
            const [path, delegatedName] = delegatedEventParts;
            delegateListener(object, path, delegatedName, callback, context || object);
        } else {
            // if not, this is simple event
            addListener(object, name, callback, context);
        }
    });

    // call callback immediatelly if triggerOnInit is true
    if (triggerOnInit === true) {
        callback.call(context || object, { triggerOnInit });
    }

    return object;
}
