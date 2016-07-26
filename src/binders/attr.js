export default function attr(attributeName) {
	return {
		on: null,
		getValue: function() {
			return this.getAttribute(attributeName);
		},
		setValue: function(value) {
			this.setAttribute(attributeName, value);
		}
	};
}
