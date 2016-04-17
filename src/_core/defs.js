function PseudoMap() {}

nofn.assign(PseudoMap.prototype, {
	get: function(obj) {
		return obj.matreshkaData;
	},
	set: function(obj, data) {
		Object.defineProperty(obj, 'matreshkaData', {
			value: data,
			enumerable: false,
			writable: false,
			configurable: false
		});
	},
	has: function(obj) {
		return 'matreshkaData' in obj;
	}
});

export default typeof WeakMap == 'undefined' ? new PseudoMap() : new WeakMap();
