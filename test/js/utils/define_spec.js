'use strict';

define(['matreshka-magic', 'matreshka'], function (_matreshkaMagic, _matreshka) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	var _matreshka2 = _interopRequireDefault(_matreshka);

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
		it('defines property passing key-value object', function () {
			var obj = {},
			    valA = undefined,
			    valB = undefined;

			_matreshkaMagic2.default.define(obj, {
				a: {
					get: function get() {
						return 'A';
					},
					set: function set(v) {
						valA = v;
					}
				},
				b: {
					get: function get() {
						return 'B';
					},
					set: function set(v) {
						valB = v;
					}
				}
			});

			obj.a = 1;
			obj.b = 2;
			expect(valA).toEqual(1);
			expect(valB).toEqual(2);
			expect(obj.a).toEqual('A');
			expect(obj.b).toEqual('B');
		});
		it('defines setter passing key-value object', function () {
			var obj = {},
			    valA = undefined,
			    valB = undefined;

			_matreshkaMagic2.default.defineSetter(obj, {
				a: function a(v) {
					return valA = v;
				},
				b: function b(v) {
					return valB = v;
				}
			});

			obj.a = 1;
			obj.b = 2;
			expect(valA).toEqual(1);
			expect(valB).toEqual(2);
		});
		it('defines getter passing key-value object', function () {
			var obj = {};

			_matreshkaMagic2.default.defineGetter(obj, {
				a: function a() {
					return 1;
				},
				b: function b() {
					return 2;
				}
			});

			obj.a = 3;
			obj.b = 4;
			expect(obj.a).toEqual(1);
			expect(obj.b).toEqual(2);
		});
		it('defines property via Matreshka instance method', function () {
			var mk = new _matreshka2.default(),
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
			var mk = new _matreshka2.default(),
			    val = undefined;
			mk.defineSetter('a', function (v) {
				return val = v;
			});
			mk.a = 1;
			expect(val).toEqual(1);
		});
		it('defines getter via Matreshka instance method', function () {
			var mk = new _matreshka2.default();
			mk.defineGetter('a', function () {
				return 42;
			});
			mk.a = 1;
			expect(mk.a).toEqual(42);
		});
	});
});