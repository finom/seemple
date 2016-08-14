export default function attr(attributeName) {
    return {
        on: null,
        getValue() {
            return this.getAttribute(attributeName);
        },
        setValue(value) {
            this.setAttribute(attributeName, value);
        }
    };
}
