// converts array-like to Matreshka.Array instance
export default function toMatreshkaArray(arrayLike) {
    // fix circular dependency issue
    const MatreshkaArray = require('./');
    const result = new MatreshkaArray(arrayLike.length);

    nofn.forEach(arrayLike, (item, index) => {
        result[index] = item;
    });

    return result;
}
