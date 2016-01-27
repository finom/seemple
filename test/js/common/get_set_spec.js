'use strict';

define(['matreshka-magic', 'matreshka'], function (_matreshkaMagic, _matreshka) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	var _matreshka2 = _interopRequireDefault(_matreshka);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe("set", function () {
		it('gets', function () {
			var obj = {
				x: 42
			};
			expect(_matreshkaMagic2.default.get(obj, 'x')).toEqual(42);
		});
		it('sets', function () {
			var obj = {};

			_matreshkaMagic2.default.set(obj, 'x', 42);

			expect(obj.x).toEqual(42);

			_matreshkaMagic2.default.set(obj, {
				y: 1,
				z: 2
			});

			expect(obj.y).toEqual(1);
			expect(obj.z).toEqual(2);
		});
		it('gets via Matreshka instance method', function () {
			var mk = new _matreshka2.default();
			mk.x = 42;
			expect(mk.get('x')).toEqual(42);
		});
		it('sets via Matreshka instance method', function () {
			var mk = new _matreshka2.default();
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