'use strict';

define(['matreshka-magic'], function (_matreshkaMagic) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe("set", function () {
		it('sets', function () {
			var obj = {};

			_matreshkaMagic2.default.set(obj, 'x', 3);

			expect(obj.x).toEqual(3);
		});
	});
});