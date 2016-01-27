import magic from 'matreshka-magic';
import MK from 'matreshka';

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


	it('defines property via Matreshka instance method', () => {
		let mk = new MK,
			val;

		mk.define('a', {
			get() {
				return 42;
			},
			set(v) {
				val = v;
			}
		});

		mk.a = 1;

		expect(val).toEqual(1);

		expect(mk.a).toEqual(42);
	});

	it('defines setter via Matreshka instance method', () => {
		let mk = new MK,
			val;

		mk.defineSetter('a', v => val = v);

		mk.a = 1;

		expect(val).toEqual(1);
	});

	it('defines getter via Matreshka instance method', () => {
		let mk = new MK;

		mk.defineGetter('a', () => 42);

		mk.a = 1;

		expect(mk.a).toEqual(42);
	});
});
