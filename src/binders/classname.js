import {
    toggle,
    contains
} from './_classlist.js';

export default function className(elementClassName, switcher = true) {
    return {
        on: null,
        getValue() {
            const value = contains(this, elementClassName);
            return switcher ? value : !value;
        },
        setValue(value) {
            toggle(this, elementClassName, switcher ? !!value : !value);
        }
    };
}
