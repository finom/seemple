import MK from 'matreshka';

describe('MK.Array custom methods', () => {


	it('pulls', () => {
		let arr = new MK.Array(),
			removed;
		arr.push('a', 'b', 'c');
		removed = arr.pull(1);

		expect(removed).toEqual('b');
		expect(arr.toArray()).toEqual(['a', 'c']);
		expect(arr.length).toEqual(2);
	});

	it('pulls object', () => {
		let arr = new MK.Array(),
			object1 = {},
			object2 = {},
			object3 = {},
			removed;

		arr.push(object1, object2, object3);

		removed = arr.pull(object2);

		expect(removed === object2).toBe(true);

		expect(arr.length).toEqual(2);
	});
});