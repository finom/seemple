import MK from 'matreshka';

describe('Common tests for MK.Array', () => {
	it('throws error if Model is undefined', () => {
		let bool = false,
			MyClass;
		try {
			new MK.Class({
				'extends': MK.Array,
				Model: undefined,
				constructor() {
					this._initMK();
				}
			});
		} catch(e) {
			bool = true;
		}

		expect(bool).toEqual(true);
	});

	it('iterates via for..of', () => {
		let arr = new MK.Array(1, 2, 3),
			i = 1;

		for(let item of arr) {
			expect(item).toEqual(i++);
		}
	});
});
