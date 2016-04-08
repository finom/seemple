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


	it('defines property passing key-value object', () => {
		let obj = {},
			valA,
			valB;

		magic.define(obj, {
			a: {
				get() {
					return 'A';
				},
				set(v) {
					valA = v;
				}
			},
			b: {
				get() {
					return 'B';
				},
				set(v) {
					valB = v;
				}
			}
		});

		obj.a = 1;
		obj.b = 2;

		expect(valA).toEqual(1);
		expect(valB).toEqual(2);

		expect(obj.a).toEqual('A');
		expect(obj.b).toEqual('B');
	});

	it('defines setter passing key-value object', () => {
		let obj = {},
			valA,
			valB;

		magic.defineSetter(obj, {
			a: v => valA = v,
			b: v => valB = v
		});

		obj.a = 1;
		obj.b = 2;

		expect(valA).toEqual(1);
		expect(valB).toEqual(2);
	});

	it('defines getter passing key-value object', () => {
		let obj = {};

		magic.defineGetter(obj, {
			a: () => 1,
			b: () => 2
		});

		obj.a = 3;
		obj.b = 4;

		expect(obj.a).toEqual(1);
		expect(obj.b).toEqual(2);
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
