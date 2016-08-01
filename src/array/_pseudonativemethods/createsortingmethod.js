import initMK from '../../_core/init';
import reportModified from '../_reportmodified';

// creates sorting method and returns it (sort, reverse, sort_, reverse_)
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

        // call original method
        Array.prototype[name].call(this, a);

        // extend event options by custom event options if they are given
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

        reportModified(this, eventOptions, name)

        return this;
    };
}
