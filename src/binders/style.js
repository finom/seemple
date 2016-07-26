export default function style(property) {
    return {
        on: null,
        getValue: function() {
            return getComputedStyle(this).getPropertyValue(property);
        },
        setValue: function(value) {
            this.style[property] = value;
        }
    };
}
