// Object.assign polyfyll is taken there:
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
// and will be removed in future

const assign = Object.assign || function assign(target) {
    /* istanbul ignore next */
    if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    const output = Object(target);
    for (let index = 1; index < arguments.length; index++) {
        const source = arguments[index];
        if (source !== undefined && source !== null) {
            for (const nextKey in source) {
                if (source.hasOwnProperty(nextKey)) {
                    output[nextKey] = source[nextKey];
                }
            }
        }
    }

    return output;
};

export default assign;
