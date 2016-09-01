// Object.assign polyfyll
/* istanbul ignore next */
const assign = Object.assign || function assign(target) {
    /* istanbul ignore next */
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    const output = Object(target);

    for (let index = 1; index < arguments.length; index++) {
        const source = arguments[index];
        if (source !== undefined && source !== null) {
            nofn.forOwn(source, (nextValue, nextKey) => {
                output[nextKey] = nextValue;
            });
        }
    }

    return output;
};

export default assign;
