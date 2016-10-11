import cheapRecreate from './_cheaprecreate';

// creates a new Matreshka.Array instance from an array-like or iterable object
export default function from(arrayLike, mapFn, thisArg) {
    // allow to inherit this method by child classes
    // require('./') fixes circular ref issue
    const ParentClass = typeof this === 'function' ? this : require('./');

    const result = new ParentClass();
    const length = arrayLike.length;
    const arrayFrom = Array.from;
    let newItems;

    /* istanbul ignore else */
    if (typeof arrayFrom === 'function') {
        // if Array.from exist, let it do all the job (work with iterable objects etc)
        newItems = arrayFrom(arrayLike, mapFn, thisArg);
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
