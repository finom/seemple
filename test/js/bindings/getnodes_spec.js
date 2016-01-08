'use strict';

define(['matreshka', 'bquery'], function (_matreshka, _bquery) {
    var _matreshka2 = _interopRequireDefault(_matreshka);

    var _bquery2 = _interopRequireDefault(_bquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    describe('Getting bound nodes', function () {
        it('nodes and $nodes exist', function () {
            var node = _bquery2.default.create('div'),
                mk = new _matreshka2.default();

            mk.bindNode('x', node);
            expect(mk.nodes.x).toEqual(node);
            expect(mk.$nodes.x[0]).toEqual(node);
        });
        it('sandbox and $sandbox exist', function () {
            var node = _bquery2.default.create('div'),
                mk = new _matreshka2.default();

            mk.bindNode('sandbox', node);
            expect(mk.sandbox).toEqual(node);
            expect(mk.$sandbox[0]).toEqual(node);
        });
        it('bound and $bound work', function () {
            var node = _bquery2.default.create('div'),
                mk = new _matreshka2.default();

            mk.bindNode('x', node);
            expect(mk.bound('x')).toEqual(node);
            expect(mk.$bound('x')[0]).toEqual(node);
        });
        it('bound and $bound work with no argument', function () {
            var node = _bquery2.default.create('div'),
                mk = new _matreshka2.default();

            mk.bindNode('sandbox', node);
            expect(mk.bound()).toEqual(node);
            expect(mk.$bound()[0]).toEqual(node);
        });
        it('bound and $bound work with deep bindings', function () {
            var node = _bquery2.default.create('div'),
                o = {
                a: {
                    b: {
                        c: {}
                    }
                }
            };

            _matreshka2.default.bindNode(o, 'a.b.c', node);

            expect(_matreshka2.default.bound(o, 'a.b.c')).toEqual(node);
            expect(_matreshka2.default.$bound(o, 'a.b.c')[0]).toEqual(node);
        });
    });
});