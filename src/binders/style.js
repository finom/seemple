export default function style(property) {
    return {
        on: null,
        getValue: function() {
            return this.style[property]
                || window.getComputedStyle(this).getPropertyValue(property);
        },
        setValue: function(value) {
            this.style[property] = value;
        }
    };
}
