import MK from 'matreshka';
import $ from 'balalaika';
let q = (s, c) => $(s, c)[0] || null;

describe('MK.Array#renderer', () => {
	let container = $.create('div', {
			attributes: {
				role: 'parent'
			}
		}),
		n = 10,
		arr,
        index = 0;


	class Model extends MK.Object {
		constructor() {
			super();
			this
				.on('render', evt => this.bindNode('x', 'span', MK.binders.innerHTML()));
		}
	}

	class Arr extends MK.Array {
		Model = Model;
		itemRenderer = () => `<div role="child" index="${index++}"><span></span></div>`;
		constructor() {
			super();
			this.bindNode('sandbox', container)
		}
	}

	arr = new Arr;


    it('renders', () => {
		for(let i = 0; i < n; i++) {
            arr.push({x:i});
        }

		expect(arr.length).toEqual(n);
        expect(index).toEqual(10);
		expect(arr.sandbox.children.length).toEqual(n);
	});

    it('forces rendering', () => {
		arr.rerender({
            forceRerender: true
        });

		expect(arr.length).toEqual(n);
        expect(index).toEqual(20);
		expect(arr.sandbox.children.length).toEqual(n);
	});

    it('rerenders when rendered is changed', () => {
        arr.itemRenderer = () => `<div role="child2" index="${index++}"><span></span></div>`;

        expect(arr.length).toEqual(n);
        expect(index).toEqual(30);
		expect(arr.sandbox.children.length).toEqual(n);
        console.log( arr.sandbox.innerHTML);
	});

    it('removes rendered nodes', () => {
		arr.recreate();

		expect(arr.length).toEqual(0);
		expect(arr.sandbox.children.length).toEqual(0);
	});
});
