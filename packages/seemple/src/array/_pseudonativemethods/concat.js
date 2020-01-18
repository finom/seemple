import apply from '../../_helpers/apply';
import forEach from '../../_helpers/foreach';


// the method works just like Array.prototype.concat but
// - flattens both Array and Seemple.Array
// - returns Seemple.Array
export default function concat() {
  // fix circular dependency issue
  const SeempleArray = require('../').default;

  const args = Array(arguments.length);

  // convert all instances of Seemple.Array to Array
  forEach(arguments, (arg, index) => {
    if (arg && typeof arg === 'object' && arg.isSeempleArray) {
      args[index] = arg.toJSON(false);
    } else {
      args[index] = arg;
    }
  });

  // call original concat method
  const nativeCallResult = apply(Array.prototype.concat, this.toJSON(false), args);

  // convert returned value to Seemple.Array
  const result = new SeempleArray();
  forEach(nativeCallResult, (item, index) => {
    result[index] = item;
  });

  result.length = nativeCallResult.length;

  return result;
}
