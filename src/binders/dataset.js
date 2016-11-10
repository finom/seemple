// replace namesLikeThis with names-like-this
const replacer = u => `-${u.toLowerCase()}`;
const toDashed = name => `data-${name.replace(/([A-Z])/g, replacer)}`;

//  returns a binder for dataset of an element
// old browsers are also supported @IE9 @IE10
export default function dataset(prop, mappingFn) {
    return {
        on: null,
        getValue() {
            if (this.dataset) {
                return this.dataset[prop];
            }

            return this.getAttribute(toDashed(prop));
        },
        setValue(value) {
            const val = typeof mappingFn === 'function' ? mappingFn(value) : value;

            if (this.dataset) {
                this.dataset[prop] = val;
            } else {
                this.setAttribute(toDashed(prop), val);
            }
        }
    };
}
