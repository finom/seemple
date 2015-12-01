import MK from 'matreshka';
import $ from 'balalaika';


describe('Getting bound nodes', () => {
    it('nodes and $nodes exist', () => {
        let node = $.create('div'),
            mk = new MK;

        mk.bindNode('x', node);

        expect(mk.nodes.x).toEqual(node);
        expect(mk.$nodes.x[0]).toEqual(node);
    });

    it('sandbox and $sandbox exist', () => {
        let node = $.create('div'),
            mk = new MK;

        mk.bindNode('sandbox', node);

        expect(mk.sandbox).toEqual(node);
        expect(mk.$sandbox[0]).toEqual(node);
    });

    it('bound and $bound work', () => {
        let node = $.create('div'),
            mk = new MK;

        mk.bindNode('x', node);

        expect(mk.bound('x')).toEqual(node);
        expect(mk.$bound('x')[0]).toEqual(node);
    });

    it('bound and $bound work with no argument', () => {
        let node = $.create('div'),
            mk = new MK;

        mk.bindNode('sandbox', node);

        expect(mk.bound()).toEqual(node);
        expect(mk.$bound()[0]).toEqual(node);
    });

    it('bound and $bound work with deep bindings', () => {
        let node = $.create('div'),
            o = {a: {b: {c: {}}}};

        MK.bindNode(o, 'a.b.c', node);

        expect(MK.bound(o, 'a.b.c')).toEqual(node);
        expect(MK.$bound(o, 'a.b.c')[0]).toEqual(node);
    });
});
