import checkObjectType from './_helpers/checkobjecttype';
import mediate from './mediate';

function defaultUpdateFunction(instance, data) {
    if (instance.isMatreshkaArray) {
		instance.recreate(data);
	} else if (instance.isMatreshkaObject) {
	    instance.setData(data);
	} else {
		nofn.assign(instance, data);
	}
}

function createInstantiateMediator({
    UsedClass,
    updateFunction
}) {
    return function mediator(value, previousValue, key, object) {
        if(previousValue instanceof UsedClass) {
            updateFunction.call(object, previousValue, value, key);
            return previousValue;
        }

        return new UsedClass(value, object, key);
    }
}

export default function instantiate(object, givenKeys, UsedClass, givenUpdateFunction) {
    if(typeof this === 'object' && this.isMatreshka) {
        // when context is Matreshka instance, use this as an object and shift other args
        givenUpdateFunction = UsedClass;
        UsedClass = givenKeys;
        givenKeys = object;
        object = this;
    } else {
        // throw error when object type is wrong
        checkObjectType(object, 'instantiate');
    }

    const isKeysArray = givenKeys instanceof Array;

    if (typeof givenKeys === 'object' && !isKeysArray) {
        nofn.forOwn(givenKeys, (objVal, objKey) => instantiate(object, objKey, objVal, UsedClass));
        return object;
    }

    // allow to use both single key and an array of keys
    const keys = isKeysArray ? givenKeys : [givenKeys];
    const updateFunction = givenUpdateFunction || defaultUpdateFunction;

    nofn.forEach(keys, key => {
        mediate(object, key, createInstantiateMediator({
            UsedClass,
            updateFunction
        }));
    });

    return object;
}
