'use strict';

define(['matreshka-magic'], function (_matreshkaMagic) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('define', function () {
		it('defines property', function () {
			var obj = {},
			    val = undefined;

			_matreshkaMagic2.default.define(obj, 'a', {
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

			_matreshkaMagic2.default.defineSetter(obj, 'a', function (v) {
				return val = v;
			});

			obj.a = 1;
			expect(val).toEqual(1);
		});
		it('defines getter', function () {
			var obj = {};

			_matreshkaMagic2.default.defineGetter(obj, 'a', function () {
				return 42;
			});

			obj.a = 1;
			expect(obj.a).toEqual(42);
		});
		it('defines property via Matreshka instance method', function () {
			var mk = new MK(),
			    val = undefined;
			mk.define('a', {
				get: function get() {
					return 42;
				},
				set: function set(v) {
					val = v;
				}
			});
			mk.a = 1;
			expect(val).toEqual(1);
			expect(mk.a).toEqual(42);
		});
		it('defines setter via Matreshka instance method', function () {
			var mk = new MK(),
			    val = undefined;
			mk.defineSetter('a', function (v) {
				return val = v;
			});
			mk.a = 1;
			expect(val).toEqual(1);
		});
		it('defines getter via Matreshka instance method', function () {
			var mk = new MK();
			mk.defineGetter('a', function () {
				return 42;
			});
			mk.a = 1;
			expect(mk.a).toEqual(42);
		});
	});
});