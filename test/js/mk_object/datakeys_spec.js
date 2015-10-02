define(['exports', 'matreshka'], function (exports, _matreshka) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _MK = _interopRequireDefault(_matreshka);

	describe('MK.Object data keys', function () {

		it('accepts object', function () {
			var obj = new _MK['default'].Object({
				a: 1
			});
			expect(obj.keys()).toEqual(['a']);
		});

		it('jsets', function () {
			var obj = new _MK['default'].Object({
				a: 1
			});
			obj.jset('b', 2);
			expect(obj.b).toEqual(2);
			expect(obj.keys()).toEqual(['a', 'b']);
		});

		it('adds data keys', function () {
			var obj = new _MK['default'].Object({
				a: 1
			});
			obj.addDataKeys('c d');
			expect(obj.keys()).toEqual(['a', 'c', 'd']);
		});

		it('removes data keys', function () {
			var obj = new _MK['default'].Object({
				a: 1
			});
			obj.removeDataKeys('c d');
			expect(obj.keys()).toEqual(['a']);
		});
	});
});