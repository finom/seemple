define(['exports', 'matreshka-magic'], function (exports, _matreshkaMagic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	describe("set", function () {
		it('sets', function () {
			var obj = {};

			_magic['default'].set(obj, 'x', 3);

			expect(obj.x).toEqual(3);
		});
	});
});