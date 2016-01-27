import magic from 'matreshka-magic';

describe('Other utils', () => {
	it('runs noop which returns nothing', () => {
		expect(magic.noop.call({}, 1, 2, 3, 4)).toEqual(undefined);
	});

	it('iterates over object properties via each method', () => {
		let obj = {a: 1, b: 2, c: 3},
			thisArg = {},
			keys = [],
			values = [];

		magic.each(obj, function(value, key) {
			keys.push(key);
			values.push(value);
			expect(this).toEqual(thisArg);
		}, thisArg);

		expect(keys).toEqual(['a', 'b', 'c']);
		expect(values).toEqual([1, 2, 3]);
	});

	it('iterates over array values via each method', () => {
		let arr = [1, 2, 3],
			thisArg = {},
			keys = [],
			values = [];

		magic.each(arr, function(value, key) {
			keys.push(key);
			values.push(value);
			expect(this).toEqual(thisArg);
		}, thisArg);

		expect(keys).toEqual([0, 1, 2]);
		expect(values).toEqual([1, 2, 3]);
	});

	it('works with PseudoMap instead of WeakMap', () => {
		var map = new magic.PseudoMap(),
			o1 = {},
			o2 = {},
			o3 = {};

		map.set(o1, o2);

		expect(map.get(o1)).toEqual(o2);
		expect(map.has(o1)).toEqual(true);
		expect(map.get(o3)).toEqual(undefined);
		expect(map.has(o3)).toEqual(false);
	});


	it('works fine with "delay" method', (done) => {
		var mk = new MK;

		mk.delay(function() {
			expect(this).toEqual(mk);
			done();
		}, 50);
	});
});
