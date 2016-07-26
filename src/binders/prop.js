export default function prop(propertyName) {
	return {
		on: null,
		getValue: function() {
			return this[propertyName];
		},
		setValue: function(value) {
			// in case when you're trying to set read-only property
			try {
				this[propertyName] = value;
			} catch (e) {}
		}
	};
};
