'use strict';

define(['matreshka'], function (MK) {
	var hasSymbol = typeof Symbol == 'function';
	describe('MK.Object common stuff', function () {
		(hasSymbol ? it : xit)('iterates via for..of', function () {
			var obj = new MK.Object({
				a: 'foo',
				b: 'bar',
				c: 'baz'
			}),
			    values = ['foo', 'bar', 'baz'],
			    i = 0;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;
					expect(item).toEqual(values[i++]);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		});
		it('converts to object', function () {
			var obj = new MK.Object({
				a: 42,
				b: 'yop'
			}),
			    native = obj.toNative();
			expect(Object.keys(native)).toEqual(['a', 'b']);
			expect(native.a).toEqual(42);
			expect(native.b).toEqual('yop');
		});
		it('converts to JSON object', function () {
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
		it('finds key of an object', function () {
			var toFind = {},
			    obj = new MK.Object({
				a: 42,
				b: toFind,
				c: 'yop'
			});
			expect(obj.keyOf(toFind)).toEqual('b');
		});
	});
});