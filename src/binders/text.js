export default function() {
    return {
        on: 'input', // the event name fires only in contenteditable mode
        getValue() {
            return this.textContent;
        },
        setValue(value) {
            this.textContent = `${value}`;
        }
    };
}
