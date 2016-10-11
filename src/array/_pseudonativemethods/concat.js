import apply from '../../_helpers/apply';

// the method works just like Array.prototype.concat but
// - flattens both Array and Matreshka.Array
// - returns Matreshka.Array
export default function concat() {
    // fix circular dependency issue
    const MatreshkaArray = require('../');

    const args = Array(arguments.length);

    // convert all instances of Matreshka.Array to Array
    nofn.forEach(arguments, (arg, index) => {
        if (arg && typeof arg === 'object' && arg.isMatreshkaArray) {
            args[index] = arg.toJSON(false);
        } else {
            args[index] = arg;
        }
    });

    // call original concat method
    const nativeCallResult = apply(Array.prototype.concat, this.toJSON(false), args);

    // convert returned value to Matreshka.Array
    const result = new MatreshkaArray();
    nofn.forEach(nativeCallResult, (item, index) => {
        result[index] = item;
    });

    result.length = nativeCallResult.length;

    return result;
}
