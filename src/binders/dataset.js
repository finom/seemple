// replace namesLikeThis with names-like-this
const replacer = u => `-${u.toLowerCase()}`;
const toDashed = name => `data-${name.replace(/([A-Z])/g, replacer)}`;

//  returns a binder for dataset of an element
// old browsers are also supported @IE9 @IE10
export default function dataset(prop) {
    return {
        on: null,
        getValue() {
            if (this.dataset) {
                return this.dataset[prop];
            }

            return this.getAttribute(toDashed(prop));
        },
        setValue(value) {
            if (this.dataset) {
                this.dataset[prop] = value;
            } else {
                this.setAttribute(toDashed(prop), value);
            }
        }
    };
}
