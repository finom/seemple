'use strict';

define(['matreshka-magic'], function (_matreshkaMagic) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Other utils', function () {
		it('runs noop which returns nothing', function () {
			expect(_matreshkaMagic2.default.noop.call({}, 1, 2, 3, 4)).toEqual(undefined);
		});
		it('iterates over object properties via each method', function () {
			var obj = {
				a: 1,
				b: 2,
				c: 3
			},
			    thisArg = {},
			    keys = [],
			    values = [];

			_matreshkaMagic2.default.each(obj, function (value, key) {
				keys.push(key);
				values.push(value);
				expect(this).toEqual(thisArg);
			}, thisArg);

			expect(keys).toEqual(['a', 'b', 'c']);
			expect(values).toEqual([1, 2, 3]);
		});
		it('iterates over array values via each method', function () {
			var arr = [1, 2, 3],
			    thisArg = {},
			    keys = [],
			    values = [];

			_matreshkaMagic2.default.each(arr, function (value, key) {
				keys.push(key);
				values.push(value);
				expect(this).toEqual(thisArg);
			}, thisArg);

			expect(keys).toEqual([0, 1, 2]);
			expect(values).toEqual([1, 2, 3]);
		});
	});
});