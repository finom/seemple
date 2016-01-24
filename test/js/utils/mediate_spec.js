'use strict';

define(['matreshka-magic'], function (_matreshkaMagic) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	describe('mediate', function () {
		it('mediates', function () {
			var obj = {};

			_matreshkaMagic2.default.mediate(obj, 'a', function (v) {
				return Number(v);
			});

			_matreshkaMagic2.default.mediate(obj, 'b c', function (v) {
				return Number(v);
			});

			obj.a = obj.b = obj.c = '123';
			expect(_typeof(obj.a)).toEqual('number');
			expect(_typeof(obj.b)).toEqual('number');
			expect(_typeof(obj.c)).toEqual('number');
		});
		it('sets class for a property', function () {
			var obj = {
				x: {
					a: 42
				}
			};

			var X = function X(data) {
				_classCallCheck(this, X);

				Object.assign(this, data);
			};

			;

			_matreshkaMagic2.default.setClassFor(obj, 'x', X);

			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.a).toEqual(42);
		});
		it('sets class for a property (trying to rewrite)', function () {
			var obj = {},
			    x = undefined;

			var X = function X() {
				_classCallCheck(this, X);
			};

			;

			_matreshkaMagic2.default.setClassFor(obj, 'x', X);

			x = obj.x;
			obj.x = {
				a: 42
			};
			expect(obj.x).toEqual(x);
			expect(obj.x.a).toEqual(42);
		});
	});
});