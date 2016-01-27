import MK from 'matreshka';
import $ from 'bquery';


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
        let node1 = $.create('div'),
			node2 = $.create('div'),
            mk = new MK;

        mk.bindNode('x', node1);
		mk.bindNode('y', node2);

        expect(mk.bound('x')).toEqual(node1);
        expect(mk.$bound('x')[0]).toEqual(node1);

		expect(mk.bound('x y')).toEqual(node1);
		expect(mk.$bound('x y')).toEqual($([node1, node2]));
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


	it('selects elements via select & selectAll', () => {
        let node = $.create('div', {
				children: [{tagName: 'span'}, {tagName: 'span'}]
			}),
			o = {};

        MK.bindNode(o, 'sandbox', node);

		expect(MK.selectAll(o, ':sandbox span')).toEqual($('span', node));
		expect(MK.select(o, ':sandbox span')).toEqual($('span', node)[0]);
		expect(MK.selectAll(o, ':sandbox')).toEqual($(node));
		expect(MK.select(o, ':sandbox')).toEqual(node);

		expect(MK.selectAll(o, ':sandbox > span')).toEqual($('span', node));
		expect(MK.select(o, ':sandbox > span')).toEqual($('span', node)[0]);

		expect(MK.selectAll(o, 'span')).toEqual($('span', node));
		expect(MK.select(o, 'span')).toEqual($('span', node)[0]);


		expect(MK.selectAll(o, ':bound(sandbox) span')).toEqual($('span', node));
		expect(MK.select(o, ':bound(sandbox) span')).toEqual($('span', node)[0]);
		expect(MK.selectAll(o, ':bound(sandbox)')).toEqual($(node));
		expect(MK.select(o, ':bound(sandbox)')).toEqual(node);

		expect(MK.selectAll(o, ':bound(sandbox) > span')).toEqual($('span', node));
		expect(MK.select(o, ':bound(sandbox) > span')).toEqual($('span', node)[0]);

    });
});
