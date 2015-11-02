define(['exports', 'matreshka-magic', 'balalaika'], function (exports, _matreshkaMagic, _balalaika) {
    'use strict';

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _magic = _interopRequireDefault(_matreshkaMagic);

    var _$ = _interopRequireDefault(_balalaika);

    var q = function q(s, c) {
        return (0, _$['default'])(s, c)[0] || null;
    };

    // TODO how to test file binder?

    describe('Binders', function () {
        it('Binds prop', function () {
            var node = _$['default'].create('div', { someProp: 42 }),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.prop('someProp'));

            expect(o.x).toEqual(42);
            o.x = 43;
            expect(node.someProp).toEqual(43);
        });

        it('Binds attr', function () {
            var node = _$['default'].create('div', { attributes: { someattr: "42" } }),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.attr('someattr'));

            expect(o.x).toEqual('42');
            o.x = 43;
            expect(node.getAttribute('someattr')).toEqual('43');
        });

        it('Binds html', function () {
            var node = _$['default'].create('div', { innerHTML: '<i>42</i>' }),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.html());

            expect(o.x).toEqual('<i>42</i>');
            o.x = '<i>43</i>';
            expect(node.innerHTML).toEqual('<i>43</i>');
        });

        it('Binds text', function () {
            var node = _$['default'].create('div', { textContent: '<i>42</i>' }),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.text());

            expect(o.x).toEqual('<i>42</i>');
            o.x = '<i>43</i>';
            expect(node.textContent).toEqual('<i>43</i>');
        });

        it('Binds style', function () {
            var node = _$['default'].create('div', { style: { textAlign: 'center' } }),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.style('textAlign'));

            expect(o.x).toEqual('center');
            o.x = 'right';
            expect(node.style.textAlign).toEqual('right');
        });

        it('Binds display', function () {
            var node = _$['default'].create('div'),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.display());

            expect(o.x).toEqual(true);
            o.x = false;
            expect(node.style.display).toEqual('none');

            _magic['default'].bindNode(o, 'y', node, _magic['default'].binders.display(false));

            expect(o.y).toEqual(true);
            o.y = false;
            expect(node.style.display).toEqual('');
        });

        it('Binds dataset', function () {
            var node = _$['default'].create('div', {
                attributes: { 'data-some-attr': '42' }
            }),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.dataset('someAttr'));

            expect(o.x).toEqual('42');
            o.x = '43';
            expect(node.getAttribute('data-some-attr')).toEqual('43');
        });

        it('Binds className', function () {
            var node = _$['default'].create('div', {
                className: 'some-class'
            }),
                o = {};

            _magic['default'].bindNode(o, 'x', node, _magic['default'].binders.className('some-class'));

            expect(o.x).toEqual(true);
            o.x = false;
            expect(node.classList.contains('some-class')).toEqual(false);

            _magic['default'].bindNode(o, 'y', node, _magic['default'].binders.className('!some-class'));

            expect(o.y).toEqual(true);
            o.y = false;
            expect(node.classList.contains('some-class')).toEqual(true);
        });

        it('supports fallbacks', function () {
            expect(_magic['default'].binders.innerHTML).toEqual(_magic['default'].binders.html);
            expect(_magic['default'].binders.innerText).toEqual(_magic['default'].binders.text);
            expect(_magic['default'].binders.property).toEqual(_magic['default'].binders.prop);
            expect(_magic['default'].binders.attribute).toEqual(_magic['default'].binders.attr);
        })[("textarea", "progress", "input", "output", "select")];
    });

    describe('Default binders', function () {
        //it('Binds textarea', () =>);
    });
});