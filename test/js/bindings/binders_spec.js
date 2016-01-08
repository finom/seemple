'use strict';

define(['matreshka-magic', 'bquery'], function (_matreshkaMagic, _bquery) {
    var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

    var _bquery2 = _interopRequireDefault(_bquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var q = function q(s, c) {
        return (0, _bquery2.default)(s, c)[0] || null;
    };

    describe('Binders', function () {
        it('Binds prop', function () {
            var node = _bquery2.default.create('div', {
                someProp: 42
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.prop('someProp'));

            expect(o.x).toEqual(42);
            o.x = 43;
            expect(node.someProp).toEqual(43);
        });
        it('Binds attr', function () {
            var node = _bquery2.default.create('div', {
                attributes: {
                    someattr: "42"
                }
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.attr('someattr'));

            expect(o.x).toEqual('42');
            o.x = 43;
            expect(node.getAttribute('someattr')).toEqual('43');
        });
        it('Binds html', function () {
            var node = _bquery2.default.create('div', {
                innerHTML: '<i>42</i>'
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.html());

            expect(o.x).toEqual('<i>42</i>');
            o.x = '<i>43</i>';
            expect(node.innerHTML).toEqual('<i>43</i>');
        });
        it('Binds text', function () {
            var node = _bquery2.default.create('div', {
                textContent: '<i>42</i>'
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.text());

            expect(o.x).toEqual('<i>42</i>');
            o.x = '<i>43</i>';
            expect(node.textContent).toEqual('<i>43</i>');
        });
        it('Binds style', function () {
            var node = _bquery2.default.create('div', {
                style: {
                    textAlign: 'center'
                }
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.style('textAlign'));

            expect(o.x).toEqual('center');
            o.x = 'right';
            expect(node.style.textAlign).toEqual('right');
        });
        it('Binds display', function () {
            var node = _bquery2.default.create('div'),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.display());

            expect(o.x).toEqual(true);
            o.x = false;
            expect(node.style.display).toEqual('none');

            _matreshkaMagic2.default.bindNode(o, 'y', node, _matreshkaMagic2.default.binders.display(false));

            expect(o.y).toEqual(true);
            o.y = false;
            expect(node.style.display).toEqual('');
        });
        it('Binds dataset', function () {
            var node = _bquery2.default.create('div', {
                attributes: {
                    'data-some-attr': '42'
                }
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.dataset('someAttr'));

            expect(o.x).toEqual('42');
            o.x = '43';
            expect(node.getAttribute('data-some-attr')).toEqual('43');
        });
        it('Binds className', function () {
            var node = _bquery2.default.create('div', {
                className: 'some-class'
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node, _matreshkaMagic2.default.binders.className('some-class'));

            expect(o.x).toEqual(true);
            o.x = false;
            expect(node.classList.contains('some-class')).toEqual(false);

            _matreshkaMagic2.default.bindNode(o, 'y', node, _matreshkaMagic2.default.binders.className('!some-class'));

            expect(o.y).toEqual(true);
            o.y = false;
            expect(node.classList.contains('some-class')).toEqual(true);
        });
        it('supports fallbacks', function () {
            expect(_matreshkaMagic2.default.binders.innerHTML).toEqual(_matreshkaMagic2.default.binders.html);
            expect(_matreshkaMagic2.default.binders.innerText).toEqual(_matreshkaMagic2.default.binders.text);
            expect(_matreshkaMagic2.default.binders.property).toEqual(_matreshkaMagic2.default.binders.prop);
            expect(_matreshkaMagic2.default.binders.attribute).toEqual(_matreshkaMagic2.default.binders.attr);
        });
    });
    describe('Default binders', function () {
        it('Binds textarea', function () {
            var node = _bquery2.default.create('textarea', {
                value: '42'
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node);

            expect(o.x).toEqual('42');
            o.x = '43';
            expect(node.value).toEqual('43');
        });
        it('Binds progress', function () {
            var node = _bquery2.default.create('progress', {
                max: 100,
                value: 42
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node);

            expect(o.x).toEqual(42);
            o.x = 43;
            expect(node.value).toEqual(43);
        });
        it('Binds text input', function () {
            var node = _bquery2.default.create('input', {
                value: '42'
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node);

            expect(o.x).toEqual('42');
            o.x = '43';
            expect(node.value).toEqual('43');
        });
        it('Binds checkbox', function () {
            var node = _bquery2.default.create('input', {
                type: 'checkbox',
                checked: true
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node);

            expect(o.x).toEqual(true);
            o.x = false;
            expect(node.checked).toEqual(false);
        });
        it('Binds select', function () {
            var node = _bquery2.default.create('select', {
                children: [{
                    tagName: 'option',
                    value: '1'
                }, {
                    tagName: 'option',
                    selected: true,
                    value: '2'
                }, {
                    tagName: 'option',
                    value: '3'
                }, {
                    tagName: 'option',
                    value: '4'
                }]
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node);

            expect(o.x).toEqual('2');
            o.x = '3';
            expect(node.options[node.selectedIndex].value).toEqual('3');
        });
        it('Binds output', function () {
            var node = _bquery2.default.create('output', {
                innerHTML: '42'
            }),
                o = {};

            _matreshkaMagic2.default.bindNode(o, 'x', node);

            expect(o.x).toEqual('42');
            o.x = '43';
            expect(node.innerHTML).toEqual('43');
        });
    });
});