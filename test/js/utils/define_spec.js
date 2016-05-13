'use strict';

define(['matreshka-magic', 'matreshka'], function (magic, MK) {
	describe('define', function () {
		it('defines property', function () {
			var obj = {},
			    val = void 0;
			magic.define(obj, 'a', {
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
			    val = void 0;
			magic.defineSetter(obj, 'a', function (v) {
				return val = v;
			});
			obj.a = 1;
			expect(val).toEqual(1);
		});
		it('defines getter', function () {
			var obj = {};
			magic.defineGetter(obj, 'a', function () {
				return 42;
			});
			obj.a = 1;
			expect(obj.a).toEqual(42);
		});
		it('defines property passing key-value object', function () {
			var obj = {},
			    valA = void 0,
			    valB = void 0;
			magic.define(obj, {
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
			    valA = void 0,
			    valB = void 0;
			magic.defineSetter(obj, {
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
			magic.defineGetter(obj, {
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
			var mk = new MK(),
			    val = void 0;
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
			    val = void 0;
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