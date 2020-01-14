import forEach from '../_helpers/foreach';

// converts array-like to Matreshka.Array instance
export default function toMatreshkaArray(arrayLike) {
    // fix circular dependency issue
    const MatreshkaArray = require('./').default;

    const result = new MatreshkaArray(arrayLike.length);

    forEach(arrayLike, (item, index) => {
        result[index] = item;
    });

    return result;
}
