define(['exports', 'matreshka-magic'], function (exports, _matreshkaMagic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	describe("remove", function () {
		it('removes', function () {
			var obj = {
				a: 1
			};

			_magic['default'].remove(obj, 'a');

			expect('a' in obj).toBe(false);
		});

		it('removes special', function () {
			var obj = {
				a: 1
			};

			_magic['default']._defineSpecial(obj, 'a');

			_magic['default'].remove(obj, 'a');

			expect('a' in obj).toBe(false);
		});
	});
});