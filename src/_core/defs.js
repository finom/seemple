function PseudoMap() {}

nofn.assign(PseudoMap.prototype, {
	get(obj) {
		return obj.matreshkaData;
	},
	set(obj, data) {
		Object.defineProperty(obj, 'matreshkaData', {
			value: data,
			enumerable: false,
			writable: false,
			configurable: false
		});
	},
	has(obj) {
		return 'matreshkaData' in obj;
	}
});

export default typeof WeakMap === 'undefined' ? new PseudoMap() : new WeakMap();
