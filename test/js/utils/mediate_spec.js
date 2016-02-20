'use strict';

define(['matreshka-magic', 'matreshka'], function (magic, MK) {
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
			magic.mediate(obj, 'a', function (v) {
				return Number(v);
			});
			magic.mediate(obj, 'b c', function (v) {
				return Number(v);
			});
			obj.a = obj.b = obj.c = '123';
			expect(_typeof(obj.a)).toEqual('number');
			expect(_typeof(obj.b)).toEqual('number');
			expect(_typeof(obj.c)).toEqual('number');
		});
		it('mediates via Matreshka instance', function () {
			var mk = new MK();
			mk.mediate('a', function (v) {
				return Number(v);
			});
			mk.mediate('b c', function (v) {
				return Number(v);
			});
			mk.a = mk.b = mk.c = '123';
			expect(_typeof(mk.a)).toEqual('number');
			expect(_typeof(mk.b)).toEqual('number');
			expect(_typeof(mk.c)).toEqual('number');
		});
		it('mediates key-value object', function () {
			var obj = {};
			magic.mediate(obj, {
				a: function a(v) {
					return Number(v);
				},
				b: function b(v) {
					return Number(v);
				}
			});
			obj.a = obj.b = '123';
			expect(_typeof(obj.a)).toEqual('number');
			expect(_typeof(obj.b)).toEqual('number');
		});
		it('sets class for a property', function () {
			var obj = {
				x: {
					a: 42
				}
			};

			var X = function X(data) {
				_classCallCheck(this, X);

				magic.extend(this, data);
			};

			;
			magic.setClassFor(obj, 'x', X);
			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.a).toEqual(42);
		});
		it('sets class for a property via Matreshka instance method', function () {
			var mk = new MK();
			mk.x = {
				a: 42
			};

			var X = function X(data) {
				_classCallCheck(this, X);

				magic.extend(this, data);
			};

			;
			mk.setClassFor('x', X);
			expect(mk.x.constructor).toEqual(X);
			expect(mk.x.a).toEqual(42);
		});
		it('sets class for a property passing key-value object', function () {
			var obj = {
				x: {
					a: 1
				},
				y: {
					b: 2
				}
			};

			var X = function X(data) {
				_classCallCheck(this, X);

				magic.extend(this, data);
			};

			;

			var Y = function Y(data) {
				_classCallCheck(this, Y);

				magic.extend(this, data);
			};

			;
			magic.setClassFor(obj, {
				x: X,
				y: Y
			});
			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.a).toEqual(1);
			expect(obj.y.constructor).toEqual(Y);
			expect(obj.y.b).toEqual(2);
		});
		it('sets class for a property (trying to rewrite)', function () {
			var obj = {},
			    x = undefined;

			var X = function X() {
				_classCallCheck(this, X);
			};

			;
			magic.setClassFor(obj, 'x', X);
			x = obj.x;
			obj.x = {
				a: 42
			};
			expect(obj.x).toEqual(x);
			expect(obj.x.a).toEqual(42);
		});
		it('sets MK.Object class for a property', function () {
			var obj = {
				x: {
					a: 42
				}
			};
			var X = MK.Class({
				'extends': MK.Object,
				constructor: function constructor(data) {
					this.jset(data);
				}
			});
			magic.setClassFor(obj, 'x', X);
			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.a).toEqual(42);
			obj.x = {
				b: 1,
				c: 2
			};
			expect(obj.x.keys()).toEqual(['b', 'c']);
		});
		it('sets MK.Array class for a property', function () {
			var obj = {
				x: [1, 2, 3, 4, 5]
			};
			var X = MK.Class({
				'extends': MK.Array,
				constructor: function constructor(data) {
					this.recreate(data);
				}
			});
			magic.setClassFor(obj, 'x', X);
			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.toArray()).toEqual([1, 2, 3, 4, 5]);
			obj.x = [6, 7, 8, 9, 0];
			expect(obj.x.toArray()).toEqual([6, 7, 8, 9, 0]);
		});
	});
});