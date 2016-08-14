export default function style(property) {
    return {
        on: null,
        getValue() {
            return this.style[property]
                || window.getComputedStyle(this).getPropertyValue(property);
        },
        setValue(value) {
            this.style[property] = value;
        }
    };
}
