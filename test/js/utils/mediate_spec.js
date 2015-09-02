define(['exports', 'matreshka-magic'], function (exports, _matreshkaMagic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	describe('mediate', function () {
		it('mediates', function () {
			var obj = {};

			_magic['default'].mediate(obj, 'a', function (v) {
				return Number(v);
			});
			_magic['default'].mediate(obj, 'b c', function (v) {
				return Number(v);
			});

			obj.a = obj.b = obj.c = '123';

			expect(typeof obj.a).toEqual('number');
			expect(typeof obj.b).toEqual('number');
			expect(typeof obj.c).toEqual('number');
		});
	});
});