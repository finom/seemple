import magic from 'matreshka-magic';
import $ from 'balalaika';
let q = (s, c) => $(s, c)[0] || null;

// TODO how to test file binder?

describe('Binders', () => {
    it('Binds prop', () => {
        let node = $.create('div', {someProp: 42}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.prop('someProp'));

        expect(o.x).toEqual(42);
        o.x = 43;
        expect(node.someProp).toEqual(43);
    });

    it('Binds attr', () => {
        let node = $.create('div', {attributes: {someattr: "42"}}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.attr('someattr'));

        expect(o.x).toEqual('42');
        o.x = 43;
        expect(node.getAttribute('someattr')).toEqual('43');
    });

    it('Binds html', () => {
        let node = $.create('div', {innerHTML: '<i>42</i>'}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.html());

        expect(o.x).toEqual('<i>42</i>');
        o.x = '<i>43</i>';
        expect(node.innerHTML).toEqual('<i>43</i>');
    });


    it('Binds text', () => {
        let node = $.create('div', {textContent: '<i>42</i>'}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.text());

        expect(o.x).toEqual('<i>42</i>');
        o.x = '<i>43</i>';
        expect(node.textContent).toEqual('<i>43</i>');
    });


    it('Binds style', () => {
        let node = $.create('div', {style: {textAlign: 'center'}}),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.style('textAlign'));

        expect(o.x).toEqual('center');
        o.x = 'right';
        expect(node.style.textAlign).toEqual('right');
    });


    it('Binds display', () => {
        let node = $.create('div'),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.display());

        expect(o.x).toEqual(true);
        o.x = false;
        expect(node.style.display).toEqual('none');

        magic.bindNode(o, 'y', node, magic.binders.display(false));

        expect(o.y).toEqual(true);
        o.y = false;
        expect(node.style.display).toEqual('');
    });

    it('Binds dataset', () => {
        let node = $.create('div', {
                attributes: {'data-some-attr': '42'}
            }),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.dataset('someAttr'));

        expect(o.x).toEqual('42');
        o.x = '43';
        expect(node.getAttribute('data-some-attr')).toEqual('43');
    });

    it('Binds className', () => {
        let node = $.create('div', {
                className: 'some-class'
            }),
            o = {};

        magic.bindNode(o, 'x', node, magic.binders.className('some-class'));

        expect(o.x).toEqual(true);
        o.x = false;
        expect(node.classList.contains('some-class')).toEqual(false);


        magic.bindNode(o, 'y', node, magic.binders.className('!some-class'));

        expect(o.y).toEqual(true);
        o.y = false;
        expect(node.classList.contains('some-class')).toEqual(true);
    });

    it('supports fallbacks', () => {
        expect(magic.binders.innerHTML).toEqual(magic.binders.html);
        expect(magic.binders.innerText).toEqual(magic.binders.text);
        expect(magic.binders.property).toEqual(magic.binders.prop);
        expect(magic.binders.attribute).toEqual(magic.binders.attr);
    })

    ["textarea", "progress", "input", "output", "select"]
});


describe('Default binders', () => {
    //it('Binds textarea', () =>);
});
