// returns a binder for textContent of an element
export default function text(mappingFn) {
    return {
        on: 'input', // the event name fires only in contenteditable mode
        getValue() {
            return this.textContent;
        },
        setValue(value) {
            const val = typeof mappingFn === 'function' ? mappingFn(value) : value;
            this.textContent = `${val}`;
        }
    };
}
