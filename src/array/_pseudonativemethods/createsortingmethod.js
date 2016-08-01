import initMK from '../../_core/init';
import reportModified from '../_reportmodified';

const arrayPrototype = Array.prototype;

export default function createSortingMethod(name, hasOptions) {
    return function pseudoNativeMethod(a, b) {
        if (this.length < 2) return this;
        initMK(this);

        let givenEventOptions;
        const eventOptions = {
            method: name,
            self: this,
            added: [],
            removed: []
        };

        if(hasOptions) {
            if(name == 'sort') {
                givenEventOptions = b;
            } else {
                givenEventOptions = a;
            }

            if(givenEventOptions && typeof givenEventOptions === 'object') {
                nofn.assign(eventOptions, givenEventOptions);
            }
        }

        arrayPrototype[name].call(this, a);

        reportModified(this, eventOptions, name)

        return this;
    };
}
