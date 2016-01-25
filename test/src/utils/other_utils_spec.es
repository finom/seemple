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
});
