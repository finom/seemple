'use strict';

define(['matreshka-magic'], function (_matreshkaMagic) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
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
	});
});