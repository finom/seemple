define(['exports', 'matreshka_magic'], function (exports, _matreshka_magic) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _magic = _interopRequireDefault(_matreshka_magic);

    //import MK from 'matreshka';
    //import $ from 'balalaika';
    //let q = ( s, c ) => $( s, c )[0] || null;

    describe('linkProps', function () {
        it('adds simple dependency', function () {
            var obj = { a: 1, b: 2 };

            _magic['default'].linkProps(obj, 'c', 'a b', function (a, b) {
                return a + b;
            });

            expect(obj.c).toEqual(3);

            obj.a = 3;

            expect(obj.c).toEqual(5);

            obj.b = 3;

            expect(obj.c).toEqual(6);
        });

        it('adds dependency from another object', function () {
            var obj = { a: 1, b: 2 },
                obj2 = { c: 4, d: 8 };

            _magic['default'].linkProps(obj, 'e', [obj, ['a', 'b'], obj2, 'c d'], function (a, b, c, d) {
                return a + b + c + d;
            });

            expect(obj.e).toEqual(15);
        });

        it('doesn\'t sets on init (setOnInit)', function () {
            var obj = { a: 1, b: 2, c: 0 };

            _magic['default'].linkProps(obj, 'c', 'a b', function (a, b) {
                return a + b;
            }, false);

            expect(obj.c).toEqual(0);
        });

        it('saves from cyclical links', function () {
            var obj = { a: 1, b: 2, c: 3 };

            _magic['default'].linkProps(obj, 'a', 'b c', function (x, y) {
                return x + y;
            });
            _magic['default'].linkProps(obj, 'b', 'a c', function (x, y) {
                return x + y;
            });
            _magic['default'].linkProps(obj, 'c', 'a b', function (x, y) {
                return x + y;
            });

            expect(obj.a).toEqual(27);
        });
    });
});
