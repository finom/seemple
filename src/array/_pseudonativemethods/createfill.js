import apply from '../../_helpers/apply';
import reportModified from '../_reportmodified';
import matreshkaError from '../../_helpers/matreshkaerror';
import assign from '../../_helpers/assign';

export default function createFill(hasOptions) {
    return function fill(value) {
        const originalFill = Array.prototype.fill;

        /* istanbul ignore if  */
        if (typeof originalFill !== 'function') {
            throw matreshkaError('array:nonexistent_method', { method: 'fill' });
        }
        // +hasOptions is converted to 0 or 1 depending on its value (false/true)
        const argsLength = arguments.length - +hasOptions;
        const args = Array(argsLength);
        const givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;

        for (let i = 0; i < argsLength; i++) {
            args[i] = arguments[i];
        }

        apply(originalFill, this, args);

        const eventOptions = {
            method: 'fill',
            self: this,
            added: [value],
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
