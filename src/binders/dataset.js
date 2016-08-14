// replace namesLikeThis with names-like-this
const replacer = (u) => `-${u.toLowerCase()}`;
const toDashed = (name) => `data-${name.replace(/([A-Z])/g, replacer)}`;

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
