import forEach from '../_helpers/foreach';

// converts array-like to Seemple.Array instance
export default function toSeempleArray(arrayLike) {
    // fix circular dependency issue
    const SeempleArray = require('./').default;

    const result = new SeempleArray(arrayLike.length);

    forEach(arrayLike, (item, index) => {
        result[index] = item;
    });

    return result;
}
