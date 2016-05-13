'use strict';

define(['matreshka'], function (MK) {
	var hasSymbol = typeof Symbol == 'function';
	describe('Common tests for MK.Array', function () {
		it('throws error if Model is undefined', function () {
			var bool = false,
			    MyClass = void 0;

			try {
				new MK.Class({
					'extends': MK.Array,
					Model: undefined,
					constructor: function constructor() {
						this._initMK();
					}
				});
			} catch (e) {
				bool = true;
			}

			expect(bool).toEqual(true);
		});
		(hasSymbol ? it : xit)('iterates via for..of', function () {
			var arr = new MK.Array(1, 2, 3),
			    i = 1;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;
					expect(item).toEqual(i++);
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
		it('converts array to MK.Array via "from" method', function () {
			var arr = MK.Array.from([1, 2, 3]),
			    i = 1;
			expect(arr instanceof MK.Array).toBe(true);

			for (var _i = 0; _i < arr.length; _i++) {
				expect(arr[_i]).toEqual(_i + 1);
			}
		});
		it('converts args to MK.Array via "of" method', function () {
			var arr = MK.Array.of(1, 2, 3),
			    i = 1;
			expect(arr instanceof MK.Array).toBe(true);

			for (var _i2 = 0; _i2 < arr.length; _i2++) {
				expect(arr[_i2]).toEqual(_i2 + 1);
			}
		});
		it('triggers addone and removeone', function () {
			var arr = MK.Array.of(1, 2, 3, 4, 5),
			    i = 0;
			arr.on('addone', function (evt) {
				i++;
				expect(evt.added).toEqual('foo');
			});
			arr.on('removeone', function (evt) {
				i++;
				expect(evt.removed).toEqual(2);
			});
			arr.push('foo');
			arr.pull(1);
		});
	});
});