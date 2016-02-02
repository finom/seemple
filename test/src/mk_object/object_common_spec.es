import MK from 'matreshka';

let hasSymbol = typeof Symbol == 'function';

describe('MK.Object common stuff', () => {
	(hasSymbol ? it : xit)('iterates via for..of', () => {
		let obj = new MK.Object({a: 'foo', b: 'bar', c: 'baz'}),
			values = ['foo', 'bar', 'baz'],
			i = 0;

		for(let item of obj) {
			expect(item).toEqual(values[i++]);
		}
	});

	it('converts to object', () => {
		var obj = new MK.Object({
			a: 42,
			b: 'yop'
		}),
		native = obj.toNative();

		expect(Object.keys(native)).toEqual(['a', 'b']);
		expect(native.a).toEqual(42);
		expect(native.b).toEqual('yop');
	});


	it('converts to JSON object', () => {
		var obj = new MK.Object({
			a: 42,
			b: 'yop',
			c: new MK.Object({
				d: 'ya'
			})
		}),
		native = obj.toJSON();

		expect(Object.keys(native)).toEqual(['a', 'b', 'c']);
		expect(native.a).toEqual(42);
		expect(native.b).toEqual('yop');
		expect(native.c.d).toEqual('ya');
		expect(native.c.constructor == Object).toBe(true);
	});


	it('finds key of an object', () => {
		var toFind = {},
			obj = new MK.Object({
				a: 42,
				b: toFind,
				c: 'yop'
			});

		expect(obj.keyOf(toFind)).toEqual('b');
	});
});
