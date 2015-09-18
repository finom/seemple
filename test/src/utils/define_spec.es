import magic from 'matreshka-magic';

describe('define', () => {
	it('defines property', () => {
		let obj = {},
			val;

		magic.define(obj, 'a', {
			get() {
					return 42;
				},
				set(v) {
					val = v;
				}
		});

		obj.a = 1;

		expect(val).toEqual(1);

		expect(obj.a).toEqual(42);
	});

	it('defines setter', () => {
		let obj = {},
			val;

		magic.defineSetter(obj, 'a', v => val = v);

		obj.a = 1;

		expect(val).toEqual(1);
	});

	it('defines getter', () => {
		let obj = {};

		magic.defineGetter(obj, 'a', () => 42);

		obj.a = 1;

		expect(obj.a).toEqual(42);
	});
});