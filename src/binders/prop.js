// returns a binder to change properties of an element
export default function prop(propertyName, mappingFn) {
    return {
        on: null,
        getValue() {
            return this[propertyName];
        },
        setValue(value) {
            const val = typeof mappingFn === 'function' ? mappingFn(value) : value;
            // in case when you're trying to set read-only property
            try {
                this[propertyName] = val;
            } catch (e) {
                // cannot set given property (eg tagName)
            }
        }
    };
}
