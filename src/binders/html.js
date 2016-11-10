// returns a binder for innerHTML of an element
export default function html(mappingFn) {
    return {
        on: 'input', // the event name fires only in contenteditable mode
        getValue() {
            return this.innerHTML;
        },
        setValue(value) {
            const val = typeof mappingFn === 'function' ? mappingFn(value) : value;
            this.innerHTML = `${val}`;
        }
    };
}
