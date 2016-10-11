// returns a binder to change properties of an element
export default function prop(propertyName) {
    return {
        on: null,
        getValue() {
            return this[propertyName];
        },
        setValue(value) {
            // in case when you're trying to set read-only property
            try {
                this[propertyName] = value;
            } catch (e) {
                // cannot set given property (eg tagName)
            }
        }
    };
}
