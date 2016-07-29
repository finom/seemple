
// /^(([^@]+)@)?((.+?)(::([^\(\)]+)?(\((.*)\))?)?)?$/

export default function on(object, names, callback, triggerOnInit, context, info) {
    if(typeof this === 'object' && this.isMK) {
        // when context is Matreshka instance, use this as an object and shift other args
        info = context;
        context = triggerOnInit;
        triggerOnInit = callback;
        callback = names;
        names = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'on');
    }


    if (names && typeof names === 'object') {
        nofn.forOwn(names, (namesObjName, namesObjCallback) =>
            on(object, namesObjName, namesObjCallback, callback, triggerOnInit, context));
        return object;
    }

    if(typeof names !== 'string') {
        throw matreshkaError('on:names_type', { names })
    }

    names = names instanceof Array ? names : names
        .replace(/\s+/g, ' ') // single spaces only
        .split(/\s(?![^(]*\))/g); // split by spaces

    if (typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined') {
		[context, triggerOnInit] = [triggerOnInit, context];
	}

    nofn.forEach(names, name => {
        const lastIndexOfET = name.lastIndexOf('@');

        if (~lastIndexOfET) {
            // TODO: Array.prototype.slice is slow
            const path = name.slice(0, lastIndexOfET);
            name = name.slice(lastIndexOfET + 1);

            delegateListener(object, path, name, callback, context, info);
        } else {
            addListener(object, name, callback, context, evtData);
        }
    });
}
