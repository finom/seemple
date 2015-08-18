import magic from 'matreshka-magic';

describe("set", () => {
	it('sets', () => {
		let obj = {};

		magic.set(obj, 'x', 3)

		expect(obj.x).toEqual(3);
	});
});