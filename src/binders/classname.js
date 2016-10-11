import {
    toggle,
    contains
} from './_classlist';

// returns a binder for className of an element
// switcher makes possible to turn property value
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
