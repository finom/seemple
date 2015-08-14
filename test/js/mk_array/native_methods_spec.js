define(['exports', 'matreshka'], function (exports, _matreshka) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _MK = _interopRequireDefault(_matreshka);

    describe('MK.Array native methods', function () {
        var arr = new _MK['default'].Array();

        it('pushes', function () {
            arr.push(1, 2);

            expect(arr[0]).toEqual(1);
            expect(arr[1]).toEqual(2);
            expect(arr.length).toEqual(2);
        });

        it('pops', function () {
            arr.pop();

            expect(arr.length).toEqual(1);
        });

        it('unshifts', function () {
            arr.unshift(2, 3);

            expect(arr[1]).toEqual(2);
            expect(arr[2]).toEqual(3);
            expect(arr.length).toEqual(3);
        });
    });
});