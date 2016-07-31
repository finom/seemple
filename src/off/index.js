import splitBySpaceReg from '../on/_splitbyspaceregexp';
import checkObjectType from '../_helpers/checkobjecttype';
import defs from '../_core/defs';
import removeListener from './_removelistener';
import undelegateListener from './_undelegatelistener';

// removes event listener
export default function off(object, names, callback, context) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        context = callback;
        callback = names;
        names = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'off');
    }

    const isNamesVarArray = names instanceof Array;
    const def = defs.get(object);

    // allow to pass name-handler object
    // TODO: Name-handler object passed to off method is non-documented feature
    if (names && typeof names === 'object' && !isNamesVarArray) {
        nofn.forOwn(names, (namesObjCallback, namesObjName) =>
            off(object, namesObjName, namesObjCallback, callback));
        return object;
    }

    if (!names && !callback && !context) {
		def.events = {};
		return object;
	}

    // TODO: Array of names passed to off method is non-documented feature
    names = isNamesVarArray ? names : names.split(splitBySpaceReg); // split by spaces

    nofn.forEach(names, name => {
        const delegatedEventParts = name.split('@');
        if (delegatedEventParts.length > 1) {
            const [path, delegatedName] = delegatedEventParts;
            undelegateListener(object, path, delegatedName, callback, context);
        } else {
            removeListener(object, name, callback, context);
        }
    });

    return object;
}
