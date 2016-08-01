export default function concat() {
    // fix circular dependency issue
    const MatreshkaArray = require('../');
    const args = Array(arguments.length);

    nofn.forEach(arguments, (arg, index) => {
        if(arg && typeof arg === 'object' && arg.isMKArray) {
            args[index] = arg.toJSON(false);
        } else {
            args[index] = arg;
        }
    });

    const nativeCallResult = Array.prototype.concat.apply(this.toJSON(false), args);
    const result = new MatreshkaArray();

    nofn.forEach(nativeCallResult, (item, index) => {
        result[index] = item;
    });

    result.length = nativeCallResult.length;

    return result;
}
