'use strict';

define(['matreshka-magic'], function (magic) {
	describe("remove", function () {
		it('removes', function () {
			var obj = {
				a: 1
			};
			magic.remove(obj, 'a');
			expect('a' in obj).toBe(false);
		});
		it('removes special', function () {
			var obj = {
				a: 1
			};

			magic._defineSpecial(obj, 'a');

			magic.remove(obj, 'a');
			expect('a' in obj).toBe(false);
		});
	});
});