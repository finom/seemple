'use strict';

define(['matreshka-magic', 'matreshka'], function (magic, MK) {
	describe('Other utils', function () {
		var canSetProto = !!Object.setPrototypeOf || '__proto__' in {};
		it('runs noop which returns nothing', function () {
			expect(magic.noop.call({}, 1, 2, 3, 4)).toEqual(undefined);
		});
		it('iterates over object properties via each method', function () {
			var obj = {
				a: 1,
				b: 2,
				c: 3
			},
			    thisArg = {},
			    keys = [],
			    values = [];
			magic.each(obj, function (value, key) {
				keys.push(key);
				values.push(value);
				expect(this).toEqual(thisArg);
			}, thisArg);
			expect(keys).toEqual(['a', 'b', 'c']);
			expect(values).toEqual([1, 2, 3]);
		});
		it('iterates over array values via each method', function () {
			var arr = [1, 2, 3],
			    thisArg = {},
			    keys = [],
			    values = [];
			magic.each(arr, function (value, key) {
				keys.push(key);
				values.push(value);
				expect(this).toEqual(thisArg);
			}, thisArg);
			expect(keys).toEqual([0, 1, 2]);
			expect(values).toEqual([1, 2, 3]);
		});
		it('works with PseudoMap instead of WeakMap', function () {
			var map = new magic.PseudoMap(),
			    o1 = {},
			    o2 = {},
			    o3 = {};
			map.set(o1, o2);
			expect(map.get(o1)).toEqual(o2);
			expect(map.has(o1)).toEqual(true);
			expect(map.get(o3)).toEqual(undefined);
			expect(map.has(o3)).toEqual(false);
		});
		it('works fine with "delay" method', function (done) {
			var mk = new MK();
			mk.delay(function () {
				expect(this).toEqual(mk);
				done();
			}, 50);
		});
		it('converts to Matreshka via Matreshka.to', function () {
			var mk = new MK.to({
				a: 1,
				b: [1, 2, 3, {
					foo: 'bar'
				}]
			});
			expect(mk.constructor).toEqual(MK.Object);
			expect(mk.b.constructor).toEqual(MK.Array);
			expect(mk.b[3].constructor).toEqual(MK.Object);
			expect(mk.a).toEqual(1);
			expect(mk.b[0]).toEqual(1);
			expect(mk.b[1]).toEqual(2);
			expect(mk.b[2]).toEqual(3);
			expect(mk.b[3].foo).toEqual('bar');
		});
		(canSetProto ? it : xit)('allows to set custom proto for Matreshka class', function () {
			var F = function F() {},
			    bool = false,
			    mk = new MK.Object();

			mk.someProperty = 'foo';

			F.prototype.customMethod = function () {
				bool = this.someProperty == 'foo';
			};

			MK.setProto(F.prototype);
			mk.customMethod();
			expect(bool).toEqual(true);
			expect(mk instanceof F).toBeTruthy();
		});
	});
});