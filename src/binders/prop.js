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
                // do nothing
            }
        }
    };
}
