// returns a binder for style properties
export default function style(property, mappingFn) {
    return {
        on: null,
        getValue() {
            return this.style[property]
                || window.getComputedStyle(this).getPropertyValue(property);
        },
        setValue(value) {
            const val = typeof mappingFn === 'function' ? mappingFn(value) : value;
            this.style[property] = val;
        }
    };
}
