import splitBySpaceReg from './_splitbyspaceregexp';
import checkObjectType from '../_helpers/checkobjecttype';
import matreshkaError from '../_helpers/matreshkaerror';
import addListener from './_addlistener';
import delegateListener from './_delegatelistener';

// adds event listener
export default function on(object, names, callback, triggerOnInit, context) {
    if(typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        context = triggerOnInit;
        triggerOnInit = callback;
        callback = names;
        names = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'on');
    }

    const isNamesVarArray = names instanceof Array;

    // allow to pass name-handler object
    if (names && typeof names === 'object' && !isNamesVarArray) {
        nofn.forOwn(names, (namesObjCallback, namesObjName) =>
            on(object, namesObjName, namesObjCallback, callback, triggerOnInit));
        return object;
    }

    if(typeof names !== 'string' && !isNamesVarArray) {
        throw matreshkaError('on:names_type', { names });
    }

    names = isNamesVarArray ? names : names.split(splitBySpaceReg); // split by spaces

    // flip triggerOnInit and context when triggerOnInit is not boolean
    if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
        [context, triggerOnInit] = [triggerOnInit, context];
    }

    nofn.forEach(names, name => {
        const delegatedEventParts = name.split('@');

        if (delegatedEventParts.length > 1) {
            // if @ exists in event name then this is delegated event
            const [path, delegatedName] = delegatedEventParts;
            delegateListener(object, path, delegatedName, callback, context);
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
