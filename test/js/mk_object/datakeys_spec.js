'use strict';

define(['matreshka'], function (_matreshka) {
	var _matreshka2 = _interopRequireDefault(_matreshka);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('MK.Object data keys', function () {
		it('accepts object', function () {
			var obj = new _matreshka2.default.Object({
				a: 1
			});
			expect(obj.keys()).toEqual(['a']);
		});
		it('jsets', function () {
			var obj = new _matreshka2.default.Object({
				a: 1
			});
			obj.jset('b', 2);
			expect(obj.b).toEqual(2);
			expect(obj.keys()).toEqual(['a', 'b']);
		});
		it('adds data keys', function () {
			var obj = new _matreshka2.default.Object({
				a: 1
			});
			obj.addDataKeys('c d');
			expect(obj.keys()).toEqual(['a', 'c', 'd']);
		});
		it('removes data keys', function () {
			var obj = new _matreshka2.default.Object({
				a: 1
			});
			obj.removeDataKeys('c d');
			expect(obj.keys()).toEqual(['a']);
		});
		it('triggers "modify" when data keys are added', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;
			obj.on('modify', function (evt) {
				bool = true;
			});
			obj.addDataKeys('c d');
			expect(bool).toEqual(true);
		});
		it('triggers "remove" when data keys are removed', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;
			obj.addDataKeys('a');
			obj.on('remove', function (evt) {
				bool = true;
			});
			obj.removeDataKeys('a');
			expect(bool).toEqual(true);
		});
		it('triggers "modify" when data keys are removed', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;
			obj.addDataKeys('a');
			obj.on('modify', function (evt) {
				bool = true;
			});
			obj.removeDataKeys('a');
			expect(bool).toEqual(true);
		});
		it('doesn\'t trigger "modify" when data keys are not removed', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;
			obj.addDataKeys('a');
			obj.on('modify', function (evt) {
				bool = true;
			});
			obj.removeDataKeys('b');
			expect(bool).toEqual(false);
		});
		it('triggers "modify" when data is removed', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;
			obj.addDataKeys('a');
			obj.on('modify', function (evt) {
				bool = true;
			});
			obj.remove('a');
			expect(bool).toEqual(true);
		});
		it('doesn\'t trigger "modify" when non-data is removed', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;
			obj.addDataKeys('a');
			obj.on('modify', function (evt) {
				bool = true;
			});
			obj.remove('b');
			expect(bool).toEqual(false);
		});
	});
});