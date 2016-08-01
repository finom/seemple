import initMK from '../../_core/init';
import reportModified from '../_reportmodified';

export default function createAddingMethod(name, hasOptions) {
    return function pseudoNativeMethod() {
        const { itemMediator } = initMK(this);
        const argsLength = arguments.length - +hasOptions;
        const args = Array(argsLength);
        const givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
        const useMediator = typeof itemMediator === 'function'
            && (!givenEventOptions || !givenEventOptions.skipItemMediator);
        const isPush = name === 'push';
        let { length } = this;

        if (!argsLength) {
            return length;
        }

        for (let i = 0; i < argsLength; i++) {
            const arg = arguments[i];
            if(useMediator) {
                const index = isPush ? i + length : i;
                args[i] = itemMediator(arg, index);
            } else {
                args[i] = arg;
            }
        }

        if(isPush) {
            for(let i = 0; i < argsLength; i++) {
                this[length + i] = args[i];
            }
        } else {
            for(let i = length - 1; i >= 0; i--) {
                this[argsLength + i] = this[i];
            }

            for(let i = 0; i < argsLength; i++) {
                this[i] = args[i];
            }
        }

        this.length = length = length + argsLength;

        const eventOptions = {
            method: name,
            self: this,
            added: args,
            removed: []
        };

        if(hasOptions) {
            if(givenEventOptions && typeof givenEventOptions === 'object') {
                nofn.assign(eventOptions, givenEventOptions);
            }
        }

        reportModified(this, eventOptions, name);

        return length;
    };
}
