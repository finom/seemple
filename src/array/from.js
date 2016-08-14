import cheapRecreate from './_cheaprecreate';

// creates a new Matreshka.Array instance from an array-like or iterable object
export default function from(arrayLike, mapFn, thisArg) {
    // allow to inherit this method by child classes
    // require('./') fixes circular ref issue
    const ParentClass = this || require('./');

    const result = new ParentClass();
    const length = arrayLike.length;
    let newItems;

    if (typeof Array.from === 'function') {
        // if Array.from exist, allow it to do all the job (work with iterable objects etc)
        newItems = Array.from(arrayLike, mapFn, thisArg);
    } else {
        // convert array-like object for older browsers
        // @IE
        newItems = Array(length);

        for (let i = 0; i < length; i++) {
            if (typeof mapFn === 'function') {
                newItems[i] = mapFn.call(thisArg, arrayLike[i], i, arrayLike);
            } else {
                newItems[i] = arrayLike[i];
            }
        }
    }

    return cheapRecreate(result, newItems);
}
