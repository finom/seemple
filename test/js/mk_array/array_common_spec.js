define(['exports', 'matreshka'], function (exports, _matreshka) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _MK = _interopRequireDefault(_matreshka);

	describe('Common tests for MK.Array', function () {
		it('throws error if Model is undefined', function () {
			let bool = false,
			    MyClass;

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

		it('gives correct index to item mediator', () => {
			let arr = new MK.Array(),
				expectedIndexes;

			arr.mediateItem((data, index) => {
				let x ;
				expect(index).toEqual(x = expectedIndexes.shift());
				return data;
			});

			expectedIndexes = [0, 1, 2];
			arr.push({}, {}, {});
			expectedIndexes = [3, 4, 5];
			arr.push({}, {}, {});
			expectedIndexes = [0, 1, 2];
			arr.recreate([{}, {}, {}]);
			expectedIndexes = [0, 1, 2];
			arr.unshift({}, {}, {});
			expectedIndexes = [3, 4, 5];
			arr.splice(3, 0, {}, {}, {});
			expectedIndexes = [5, 6, 7];
			arr.splice(5, 2, {}, {}, {});
			expectedIndexes = [6, 7, 8];
			arr.splice(-4, 2, {}, {}, {});
		});
	});
});
