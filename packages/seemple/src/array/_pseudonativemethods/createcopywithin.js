import apply from '../../_helpers/apply';
import reportModified from '../_reportmodified';
import seempleError from '../../_helpers/seempleerror';
import assign from '../../_helpers/assign';

export default function createCopyWithin(hasOptions) {
  return function copyWithin() {
    const originalCopyWithin = Array.prototype.copyWithin;

    /* istanbul ignore if  */
    if (typeof originalCopyWithin !== 'function') {
      throw seempleError('array:nonexistent_method', { method: 'copyWithin' });
    }
    // +hasOptions is converted to 0 or 1 depending on its value (false/true)
    const argsLength = arguments.length - +hasOptions;
    const args = Array(argsLength);
    const givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;

    for (let i = 0; i < argsLength; i++) {
      args[i] = arguments[i];
    }

    apply(originalCopyWithin, this, args);

    const eventOptions = {
      method: 'copyWithin',
      self: this,
      added: [],
      removed: []
    };

    // extend event options by custom event options if they are given
    if (hasOptions) {
      if (givenEventOptions && typeof givenEventOptions === 'object') {
        assign(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);

    return this;
  };
}
