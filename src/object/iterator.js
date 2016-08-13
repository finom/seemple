import initMK from '../_core/init';

// Symbol.iterator of Matreshka.Object instances
export default function matreshkaObjectIterator() {
    const keys = this.keys();
    let i = 0;

    return {
        next: () => {
            if (i > keys.length - 1) {
                return { done: true };
            } else {
                return {
                    done: false,
                    value: this[keys[i++]]
                };
            }
        }
    };
}
