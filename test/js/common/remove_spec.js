'use strict';

define(['matreshka-magic'], function (_matreshkaMagic) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe("remove", function () {
		it('removes', function () {
			var obj = {
				a: 1
			};

			_matreshkaMagic2.default.remove(obj, 'a');

			expect('a' in obj).toBe(false);
		});
		it('removes special', function () {
			var obj = {
				a: 1
			};

			_matreshkaMagic2.default._defineSpecial(obj, 'a');

			_matreshkaMagic2.default.remove(obj, 'a');

			expect('a' in obj).toBe(false);
		});
	});
});