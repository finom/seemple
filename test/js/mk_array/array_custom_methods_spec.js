define(['exports', 'matreshka'], function (exports, _matreshka) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _MK = _interopRequireDefault(_matreshka);

    describe('MK.Array custom methods', function () {

        it('pulls', function () {
            var arr = new _MK['default'].Array(),
                removed = undefined;
            arr.push('a', 'b', 'c');
            removed = arr.pull(1);

            expect(removed).toEqual('b');
            expect(arr.toArray()).toEqual(['a', 'c']);
            expect(arr.length).toEqual(2);
        });

        it('pulls object', function () {
            var arr = new _MK['default'].Array(),
                object1 = {},
                object2 = {},
                object3 = {},
                removed = undefined;

            arr.push(object1, object2, object3);

            removed = arr.pull(object2);

            expect(removed === object2).toBe(true);

            expect(arr.length).toEqual(2);
        });
    });
});