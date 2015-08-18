define(['exports', 'matreshka'], function (exports, _matreshka) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _MK = _interopRequireDefault(_matreshka);

    describe('MK.Array custom methods', function () {
        var arr = new _MK['default'].Array();

        it('pulls', function () {
            arr.push(1, 2);

            expect(arr[0]).toEqual(1);
            expect(arr[1]).toEqual(2);
            expect(arr.length).toEqual(2);
        });
    });
});