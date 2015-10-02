define(['exports', 'matreshka'], function (exports, _matreshka) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _MK = _interopRequireDefault(_matreshka);

	describe('MK.Array native methods', function () {
		it('pushes', function () {
			var arr = new _MK['default'].Array();

			arr.push(1, 2);

			expect(arr[0]).toEqual(1);
			expect(arr[1]).toEqual(2);
			expect(arr.length).toEqual(2);
		});

		it('pops', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2);
			arr.pop();

			expect(arr.length).toEqual(1);
			expect(arr.toNative()).toEqual([1]);
		});

		it('unshifts', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2);
			arr.unshift(2, 3, 4);

			expect(arr[0]).toEqual(2);
			expect(arr[1]).toEqual(3);
			expect(arr[2]).toEqual(4);

			expect(arr.toNative()).toEqual([2, 3, 4, 1, 2]);
			expect(arr.length).toEqual(5);
		});

		it('shifts', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			arr.shift();
			expect(arr.length).toEqual(2);

			expect(arr.toNative()).toEqual([2, 3]);
		});

		it('sorts', function () {
			var arr = new _MK['default'].Array();
			arr.push(2, 3, 1);

			arr.sort();
			expect(arr.toNative()).toEqual([1, 2, 3]);
		});

		it('reverses', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			arr.reverse();

			expect(arr.toNative()).toEqual([3, 2, 1]);
		});

		it('splices', function () {
			var arr = new _MK['default'].Array(),
			    newArr = undefined;

			arr.push(1, 2, 3);
			newArr = arr.splice(1, 1, 3, 4, 5);

			expect(arr.toNative()).toEqual([1, 3, 4, 5, 3]);
			expect(newArr.toNative()).toEqual([2]);
		});

		it('filters', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3, 4, 5);
			arr = arr.filter(function (item) {
				return item > 3;
			});

			expect(arr.toNative()).toEqual([4, 5]);
		});

		it('maps', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			arr = arr.map(function (item) {
				return item * 2;
			});

			expect(arr.toNative()).toEqual([2, 4, 6]);
		});

		it('runs every', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			expect(arr.every(function (item) {
				return item < 4;
			})).toBe(true);
			expect(arr.every(function (item) {
				return item > 4;
			})).toBe(false);
		});

		it('runs some', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			expect(arr.some(function (item) {
				return item === 2;
			})).toBe(true);
			expect(arr.some(function (item) {
				return item === 4;
			})).toBe(false);
		});

		it('concats', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);

			expect(arr.concat([4, 5, 6]).toNative()).toEqual([1, 2, 3, 4, 5, 6]);
			expect(arr.concat(_MK['default'].Array.from([4, 5, 6])).toNative()).toEqual([1, 2, 3, 4, 5, 6]);
		});

		it('joins', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			expect(arr.join(' ')).toEqual('1 2 3');
		});

		it('converts to string', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			expect(arr.toString()).toEqual('1,2,3');
		});

		it('finds index of', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3, 3, 4, 5);
			expect(arr.indexOf(3)).toEqual(2);
			expect(arr.indexOf(6)).toEqual(-1);
		});

		it('finds last index of', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3, 3, 4, 5);
			expect(arr.lastIndexOf(3)).toEqual(3);
			expect(arr.lastIndexOf(6)).toEqual(-1);
		});

		it('slices', function () {
			var arr = new _MK['default'].Array();
			arr.push(1, 2, 3);
			expect(arr.slice(1).toNative()).toEqual([2, 3]);
		});

		it('iterates', function () {
			var arr = new _MK['default'].Array(),
			    i = 0;

			arr.push(1, 2, 3);

			arr.forEach(function (item) {
				return i++;
			});
			expect(i).toEqual(arr.length);
		});
	});
});