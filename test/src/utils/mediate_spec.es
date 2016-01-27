import magic from 'matreshka-magic';
import MK from 'matreshka';

describe('mediate', () => {
	it('mediates', () => {
		let obj = {};

		magic.mediate(obj, 'a', v => Number(v));
		magic.mediate(obj, 'b c', v => Number(v));

		obj.a = obj.b = obj.c = '123';

		expect(typeof obj.a).toEqual('number');
		expect(typeof obj.b).toEqual('number');
		expect(typeof obj.c).toEqual('number');
	});

	it('mediates via Matreshka instance', () => {
		let mk = new MK;

		mk.mediate('a', v => Number(v));
		mk.mediate('b c', v => Number(v));

		mk.a = mk.b = mk.c = '123';

		expect(typeof mk.a).toEqual('number');
		expect(typeof mk.b).toEqual('number');
		expect(typeof mk.c).toEqual('number');
	});

	it('sets class for a property', () => {
		let obj = {
			x: { a: 42 }
		};
		class X {
			constructor(data) {
				magic.extend(this, data);
			}
		};

		magic.setClassFor(obj, 'x', X);

		expect(obj.x.constructor).toEqual(X);
		expect(obj.x.a).toEqual(42);
	});

	it('sets class for a property via Matreshka instance method', () => {
		let mk = new MK;

		mk.x = {a: 42};

		class X {
			constructor(data) {
				magic.extend(this, data);
			}
		};

		mk.setClassFor( 'x', X);

		expect(mk.x.constructor).toEqual(X);
		expect(mk.x.a).toEqual(42);
	});

	it('sets class for a property (trying to rewrite)', () => {
		let obj = {},
			x;
		class X {};

		magic.setClassFor(obj, 'x', X);

		x = obj.x;

		obj.x = {a: 42};

		expect(obj.x).toEqual(x);

		expect(obj.x.a).toEqual(42);
	});
});
