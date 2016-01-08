'use strict';

define(['matreshka'], function (_matreshka) {
	var _matreshka2 = _interopRequireDefault(_matreshka);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('Common tests for MK.Array', function () {
		it('throws error if Model is undefined', function () {
			var bool = false,
			    MyClass = undefined;

			try {
				new _matreshka2.default.Class({
					'extends': _matreshka2.default.Array,
					Model: undefined,
					constructor: function constructor() {
						this._initMK();
					}
				});
			} catch (e) {
				bool = true;
			}

			expect(bool).toEqual(true);
		});
	});
});