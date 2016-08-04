/* eslint-disable import/no-unresolved */
import set from 'src/set';

describe("set", () => {
	it('sets', () => {
		const obj = {};
		set(obj, 'x', 42)
		expect(obj.x).toEqual(42);

		set(obj, {
			y: 1,
			z: 2
		});
		expect(obj.y).toEqual(1);
		expect(obj.z).toEqual(2);
	});

	it('sets a property in context of an object which has isMK=true property', () => {
		const obj = { isMK: true };
		set.call(obj, 'x', 42);
		expect(obj.x).toEqual(42);
		set.call(obj, {
			y: 1,
			z: 2
		});
		expect(obj.y).toEqual(1);
		expect(obj.z).toEqual(2);
	});
});
