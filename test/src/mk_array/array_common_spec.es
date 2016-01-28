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

	it('converts array to MK.Array via "from" method', () => {
		var arr = MK.Array.from([1, 2, 3]),
			i = 1;

		expect(arr instanceof MK.Array).toBe(true);

		for(let item of arr) {
			expect(item).toEqual(i++);
		}
	});

	it('converts args to MK.Array via "of" method', () => {
		var arr = MK.Array.of(1, 2, 3),
			i = 1;

		expect(arr instanceof MK.Array).toBe(true);

		for(let item of arr) {
			expect(item).toEqual(i++);
		}
	});


	it('triggers addone and removeone', () => {
		var arr = MK.Array.of(1, 2, 3, 4, 5),
			i = 0;

		arr.on('addone', evt => {
			i++;
			expect(evt.added).toEqual('foo');
		});

		arr.on('removeone', evt => {
			i++;
			expect(evt.removed).toEqual(2);
		});

		arr.push('foo');
		arr.pull(1);
	});
});
