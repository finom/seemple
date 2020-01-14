import initSeemple from '../../_core/init';
import reportModified from '../_reportmodified';
import toSeempleArray from '../_toseemplearray';
import apply from '../../_helpers/apply';
import assign from '../../_helpers/assign';

// creates splice or splice_ method and returns it
// TODO: Improve readability of createSplice function
export default function createSplice(hasOptions) {
    return function pseudoNativeMethod() {
        const { itemMediator } = initSeemple(this);
        const functionArguments = arguments;
        const argsLength = functionArguments.length - +hasOptions;
        const args = Array(argsLength);
        const givenEventOptions = hasOptions
            ? functionArguments[functionArguments.length - 1]
            : null;
        const useMediator = typeof itemMediator === 'function'
            && (!givenEventOptions || !givenEventOptions.skipItemMediator);
        const added = [];
        let start = args[0];
        const { length } = this;

        start = start < 0 ? length + start : start;

        // convert arguments to array and call item mediator on every new item if it's possible
        args[0] = functionArguments[0];
        args[1] = functionArguments[1];
        for (let i = 2; i < argsLength; i++) {
            const arg = functionArguments[i];
            if (useMediator) {
                args[i] = itemMediator(arg, start + (i - 2));
            } else {
                args[i] = arg;
            }

            added[i - 2] = args[i];
        }

        // call original method
        // TODO: Change array manually in splice method for better performance
        const returns = apply(Array.prototype.splice, this, args);
        // removed items mean returned items
        const removed = returns;

        // if something is added or removed
        if (added.length || removed.length) {
            const eventOptions = {
                added,
                removed,
                method: 'splice',
                self: this
            };

            // extend event options by custom event options if they are given
            if (hasOptions) {
                if (givenEventOptions && typeof givenEventOptions === 'object') {
                    assign(eventOptions, givenEventOptions);
                }
            }

            reportModified(this, eventOptions);
        }

        return toSeempleArray(returns);
    };
}
