define(['exports', 'matreshka'], function (exports, _matreshka) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _MK = _interopRequireDefault(_matreshka);

	describe('MK.Array native methods', function () {
		var arr = new _MK['default'].Array();

		it('pushes', function () {
			arr.push(1, 2);

			expect(arr[0]).toEqual(1);
			expect(arr[1]).toEqual(2);
			expect(arr.length).toEqual(2);
		});

		it('pops', function () {
			arr.pop();

			expect(arr.length).toEqual(1);

			expect(arr.toNative()).toEqual([1]);
		});

		it('unshifts', function () {
			arr.unshift(2, 3, 4);

			expect(arr[0]).toEqual(2);
			expect(arr[1]).toEqual(3);
			expect(arr[2]).toEqual(4);

			expect(arr.toNative()).toEqual([2, 3, 4, 1]);
			expect(arr.length).toEqual(4);
		});

		it('shifts', function () {
			arr.shift();
			expect(arr.length).toEqual(3);

			expect(arr.toNative()).toEqual([3, 4, 1]);
		});

		it('sorts', function () {
			arr.sort();

			expect(arr.toNative()).toEqual([1, 3, 4]);
		});

		it('reverses', function () {
			arr.reverse();

			expect(arr.toNative()).toEqual([4, 3, 1]);
		});

		it('splices', function () {
			var newArr = arr.splice(1, 1, 3, 4, 5);

			expect(arr.toNative()).toEqual([4, 3, 4, 5, 1]);
			expect(newArr.toNative()).toEqual([3]);
		});

		it('filters', function () {
			arr = arr.filter(function (item) {
				return item > 3;
			});

			expect(arr.toNative()).toEqual([4, 4, 5]);
		});

		it('maps', function () {
			arr = arr.map(function (item) {
				return item * 2;
			});

			expect(arr.toNative()).toEqual([8, 8, 10]);
		});

		it('runs every', function () {
			expect(arr.every(function (item) {
				return item > 7;
			})).toBe(true);
			expect(arr.every(function (item) {
				return item < 7;
			})).toBe(false);
		});

		it('runs some', function () {
			expect(arr.some(function (item) {
				return item === 10;
			})).toBe(true);
			expect(arr.some(function (item) {
				return item === 42;
			})).toBe(false);
		});

		it('concats', function () {
			expect(arr.concat([1, 2, 3]).toNative()).toEqual([8, 8, 10, 1, 2, 3]);
			expect(arr.concat(_MK['default'].Array.from([1, 2, 3])).toNative()).toEqual([8, 8, 10, 1, 2, 3]);
		});

		it('joins', function () {

			expect(arr.join(' ')).toEqual('8 8 10');
		});

		it('converts to string', function () {
			expect(arr.toString()).toEqual('8,8,10');
		});

		it('finds index of', function () {
			expect(arr.indexOf(10)).toEqual(2);
			expect(arr.indexOf(42)).toEqual(-1);
		});

		it('finds last index of', function () {
			expect(arr.lastIndexOf(8)).toEqual(1);
			expect(arr.lastIndexOf(42)).toEqual(-1);
		});

		it('slices', function () {
			expect(arr.slice(1).toNative()).toEqual([8, 10]);
		});

		it('iterates', function () {
			var i = 0;
			arr.forEach(function (item) {
				return i++;
			});
			expect(i).toEqual(3);
		});
	});
});