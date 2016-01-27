import magic from 'matreshka-magic';
import MK from 'matreshka';

describe("set", () => {
	it('gets', () => {
		let obj = {x: 42};
		expect(magic.get(obj, 'x')).toEqual(42);
	});

	it('sets', () => {
		let obj = {};

		magic.set(obj, 'x', 42)

		expect(obj.x).toEqual(42);

		magic.set(obj, {
			y: 1,
			z: 2
		});

		expect(obj.y).toEqual(1);
		expect(obj.z).toEqual(2);
	});

	it('gets via Matreshka instance method', () => {
		let mk = new MK;
		mk.x = 42;
		expect(mk.get('x')).toEqual(42);
	});

	it('sets via Matreshka instance method', () => {
		let mk = new MK;

		mk.set('x', 42)

		expect(mk.x).toEqual(42);

		mk.set({
			y: 1,
			z: 2
		});

		expect(mk.y).toEqual(1);
		expect(mk.z).toEqual(2);
	});
});
