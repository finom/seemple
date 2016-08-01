import initMK from '../../_core/init';

const arrayPrototype = Array.prototype;

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

        for (let i = 2; i < argsLength; i++) {
            const arg = arguments[i];
            if(useMediator) {
                args[i] = itemMediator(arg, start + i - 2);
            } else {
                args[i] = arg;
            }

            added[i - 2] = args[i];
        }

        // TODO: Change array manually in method splice
        const returns = arrayPrototype[name].apply(this, args);
        const removed = returns;

        if (added.length || removed.length) {
            const eventOptions = {
                args,
                added,
                removed,
                method: name,
                self: this,
            };

            if(hasOptions) {
                if(givenEventOptions && typeof givenEventOptions === 'object') {
                    nofn.assign(eventOptions, givenEventOptions);
                }
            }

            reportModified(this, eventOptions, name);
        }

        return toMatreshkaArray(returns);
    };
}
