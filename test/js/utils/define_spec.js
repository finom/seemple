define(['exports', 'matreshka-magic'], function (exports, _matreshkaMagic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	describe('define', function () {
		it('defines property', function () {
			var obj = {},
			    val = undefined;

			_magic['default'].define(obj, 'a', {
				get: function get() {
					return 42;
				},
				set: function set(v) {
					val = v;
				}
			});

			obj.a = 1;

			expect(val).toEqual(1);

			expect(obj.a).toEqual(42);
		});

		it('defines setter', function () {
			var obj = {},
			    val = undefined;

			_magic['default'].defineSetter(obj, 'a', function (v) {
				return val = v;
			});

			obj.a = 1;

			expect(val).toEqual(1);
		});

		it('defines getter', function () {
			var obj = {};

			_magic['default'].defineGetter(obj, 'a', function () {
				return 42;
			});

			obj.a = 1;

			expect(obj.a).toEqual(42);
		});
	});
});