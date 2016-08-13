import {
    toggle,
    contains
} from './_classlist.js';

export default function className(className, switcher=true) {
    return {
        on: null,
        getValue: function() {
            const value = contains(this, className);
            return switcher ? value : !value;
        },
        setValue: function(value) {
            toggle(this, className, switcher ? !!value : !value)
        }
    };
}
