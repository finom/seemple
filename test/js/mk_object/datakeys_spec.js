define(['exports', 'matreshka'], function (exports, _matreshka) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _MK = _interopRequireDefault(_matreshka);

    describe('MK.Object data keys', function () {
        var obj = new _MK['default'].Object({ a: 1 });

        it('accepts object', function () {
            expect(obj.keys()).toEqual(['a']);
        });

        it('jsets', function () {
            obj.jset('b', 2);
            expect(obj.b).toEqual(2);
            expect(obj.keys()).toEqual(['a', 'b']);
        });

        it('adds data keys', function () {
            obj.addDataKeys('c d');
            expect(obj.keys()).toEqual(['a', 'b', 'c', 'd']);
        });

        it('removes data keys', function () {
            obj.removeDataKeys('c d');
            expect(obj.keys()).toEqual(['a', 'b']);
        });
    });
});