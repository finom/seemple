'use strict';

define(['matreshka'], function (MK) {
	var Class = MK.Class;
	describe('Class function', function () {
		it('allows to inherit', function () {
			var A = Class({
				a: true
			}),
			    B = Class({
				b: true,
				'extends': A
			}),
			    C = Class({
				c: true,
				'extends': B
			}),
			    inst = new C();
			expect(inst instanceof A).toBeTruthy();
			expect(inst instanceof B).toBeTruthy();
			expect(inst instanceof C).toBeTruthy();
			expect(inst.a).toBeTruthy();
			expect(inst.b).toBeTruthy();
			expect(inst.c).toBeTruthy();
		});
		it('allows to inherit when Object.assign is not defined', function () {
			var assign = Object.assign;
			Object.assign = null;
			var A = Class({
				a: true
			}),
			    B = Class({
				b: true,
				'extends': A
			}),
			    C = Class({
				c: true,
				'extends': B
			}),
			    inst = new C();
			expect(inst instanceof A).toBeTruthy();
			expect(inst instanceof B).toBeTruthy();
			expect(inst instanceof C).toBeTruthy();
			expect(inst.a).toBeTruthy();
			expect(inst.b).toBeTruthy();
			expect(inst.c).toBeTruthy();
			Object.assign = assign;
		});
	});
});
