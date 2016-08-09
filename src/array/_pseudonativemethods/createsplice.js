import initMK from '../../_core/init';
import reportModified from '../_reportmodified';
import toMatreshkaArray from '../_tomatreshkaarray';
import apply from '../../_helpers/apply';

// creates splice or splice_ method and returns it
export default function createSplice(hasOptions) {
    return function pseudoNativeMethod() {
        const { itemMediator } = initMK(this);
        const argsLength = arguments.length - +hasOptions;
        const args = Array(argsLength);
        const givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
        const useMediator = typeof itemMediator === 'function'
            && (!givenEventOptions || !givenEventOptions.skipItemMediator);
        const added = [];
        let start = args[0];
        let { length } = this;

        start = start < 0 ? length + start : start;

        // convert arguments to array and call item mediator on every new item if it's possible
        args[0] = arguments[0];
        args[1] = arguments[1];
        for (let i = 2; i < argsLength; i++) {
            const arg = arguments[i];
            if(useMediator) {
                args[i] = itemMediator(arg, start + i - 2);
            } else {
                args[i] = arg;
            }

            added[i - 2] = args[i];
        }

        // call original method
        // TODO: Change array manually in method "splice" for better performance
        const returns = apply(Array.prototype.splice, this, args);
        // removed items are returned items
        const removed = returns;

        // if something is added or removed
        if (added.length || removed.length) {
            const eventOptions = {
                added,
                removed,
                method: 'splice',
                self: this,
            };

            // extend event options by custom event options if they are given
            if(hasOptions) {
                if(givenEventOptions && typeof givenEventOptions === 'object') {
                    nofn.assign(eventOptions, givenEventOptions);
                }
            }

            reportModified(this, eventOptions);
        }

        return toMatreshkaArray(returns);
    };
}
