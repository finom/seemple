export default function html() {
    return {
        on: 'input', // the event name fires only in contenteditable mode
        getValue() {
            return this.innerHTML;
        },
        setValue(value) {
            this.innerHTML = `${value}`;
        }
    }
}
