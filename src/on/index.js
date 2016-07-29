import splitBySpaceReg from './_splitbyspaceregexp';
import checkObjectType from '../_helpers/checkobjecttype';
import matreshkaError from '../_helpers/matreshkaerror';
import addListener from './_addlistener';
import delegateListener from './_delegatelistener';

export default function on(object, names, callback, triggerOnInit, context) {
    if(typeof this === 'object' && this.isMK) {
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

    if (names && typeof names === 'object' && !isNamesVarArray) {
        nofn.forOwn(names, (namesObjCallback, namesObjName) =>
            on(object, namesObjName, namesObjCallback, callback, triggerOnInit));
        return object;
    }

    if(typeof names !== 'string' && !isNamesVarArray) {
        throw matreshkaError('on:names_type', { names });
    }

    names = isNamesVarArray ? names : names.split(splitBySpaceReg); // split by spaces

    if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
		[context, triggerOnInit] = [triggerOnInit, context];
	}

    nofn.forEach(names, name => {
        const delegatedEventParts = name.split('@');

        if (delegatedEventParts.length > 1) {
            const [path, delegatedName] = delegatedEventParts;
            delegateListener(object, path, delegatedName, callback, context);
        } else {
            addListener(object, name, callback, context);
        }
    });

    if (triggerOnInit === true) {
		callback.call(context || object, { triggerOnInit });
	}

	return object;
}
