define(['exports', 'matreshka'], function (exports, _matreshka) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _MK = _interopRequireDefault(_matreshka);

	describe('Common tests for MK.Array', function () {
		it('throws error if Model is undefined', function () {
			var bool = false,
			    MyClass = undefined;
			try {
				new _MK['default'].Class({
					'extends': _MK['default'].Array,
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