'use strict';

define(['matreshka-magic', 'matreshka'], function (magic, MK) {
	describe("set", function () {
		it('gets', function () {
			var obj = {
				x: 42
			};
			expect(magic.get(obj, 'x')).toEqual(42);
		});
		it('sets', function () {
			var obj = {};
			magic.set(obj, 'x', 42);
			expect(obj.x).toEqual(42);
			magic.set(obj, {
				y: 1,
				z: 2
			});
			expect(obj.y).toEqual(1);
			expect(obj.z).toEqual(2);
		});
		it('gets via Matreshka instance method', function () {
			var mk = new MK();
			mk.x = 42;
			expect(mk.get('x')).toEqual(42);
		});
		it('sets via Matreshka instance method', function () {
			var mk = new MK();
			mk.set('x', 42);
			expect(mk.x).toEqual(42);
			mk.set({
				y: 1,
				z: 2
			});
			expect(mk.y).toEqual(1);
			expect(mk.z).toEqual(2);
		});
	});
});