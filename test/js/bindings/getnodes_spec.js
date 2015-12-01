define(['exports', 'matreshka', 'balalaika'], function (exports, _matreshka, _balalaika) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _MK = _interopRequireDefault(_matreshka);

    var _$ = _interopRequireDefault(_balalaika);

    describe('Getting bound nodes', function () {
        it('nodes and $nodes exist', function () {
            var node = _$['default'].create('div'),
                mk = new _MK['default']();

            mk.bindNode('x', node);

            expect(mk.nodes.x).toEqual(node);
            expect(mk.$nodes.x[0]).toEqual(node);
        });

        it('sandbox and $sandbox exist', function () {
            var node = _$['default'].create('div'),
                mk = new _MK['default']();

            mk.bindNode('sandbox', node);

            expect(mk.sandbox).toEqual(node);
            expect(mk.$sandbox[0]).toEqual(node);
        });

        it('bound and $bound work', function () {
            var node = _$['default'].create('div'),
                mk = new _MK['default']();

            mk.bindNode('x', node);

            expect(mk.bound('x')).toEqual(node);
            expect(mk.$bound('x')[0]).toEqual(node);
        });

        it('bound and $bound work with no argument', function () {
            var node = _$['default'].create('div'),
                mk = new _MK['default']();

            mk.bindNode('sandbox', node);

            expect(mk.bound()).toEqual(node);
            expect(mk.$bound()[0]).toEqual(node);
        });

        it('bound and $bound work with deep bindings', function () {
            var node = _$['default'].create('div'),
                o = { a: { b: { c: {} } } };

            _MK['default'].bindNode(o, 'a.b.c', node);

            expect(_MK['default'].bound(o, 'a.b.c')).toEqual(node);
            expect(_MK['default'].$bound(o, 'a.b.c')[0]).toEqual(node);
        });
    });
});