import MK from 'matreshka';
import $ from 'balalaika';
let q = (s, c) => $(s, c)[0] || null;

describe('MK.Array#renderer', () => {
	let n = 10;
	function createArr() {
		class Model extends MK.Object {
			constructor(...args) {
				super(...args);
				this
					.on('render', evt => this.bindNode('x', ':sandbox span', MK.binders.innerHTML()));
			}
		}

		class Arr extends MK.Array {
			Model = Model;

			constructor(...args) {
				super(...args);
				this.bindNode('sandbox', $.create('div', {
					attributes: {
						role: 'parent'
					}
				}))
			}
		}

		return new Arr();
	}




	it('renders', () => {
		let arr = createArr(),
			index = 0;
		arr.itemRenderer = () => `<div role="child" index="${index++}"><span></span></div>`;
		for (let i = 0; i < n; i++) {
			arr.push({
				x: i
			});
		}

		expect(arr.length).toEqual(n);
		expect(index).toEqual(n);
		expect(arr.sandbox.children.length).toEqual(n);
	});


	it('forces rendering', () => {
		let arr = createArr(),
			index = 0;

		arr.itemRenderer = () => `<div role="child" index="${index++}"><span></span></div>`;

		for (let i = 0; i < n; i++) {
			arr.push({
				x: i
			});
		}

		arr.rerender({
			forceRerender: true
		});

		expect(arr.length).toEqual(n);
		expect(index).toEqual(n * 2);
		expect(arr.sandbox.children.length).toEqual(n);
	});


	it('rerenders when rendered is changed', () => {
		let arr = createArr(),
			index = 0;

		arr.itemRenderer = () => `<div role="child" index="${index++}"><span></span></div>`;

		for (let i = 0; i < n; i++) {
			arr.push({
				x: i
			});
		}

		arr.itemRenderer = () => `<div role="child2" index="${index++}"><span></span></div>`;

		expect(arr.length).toEqual(n);
		expect(index).toEqual(n * 2);
		expect(arr.sandbox.children.length).toEqual(n);
	});


	it('removes rendered nodes', () => {
		let arr = createArr(),
			index = 0;

		arr.itemRenderer = () => `<div role="child" index="${index++}"><span></span></div>`;

		for (let i = 0; i < n; i++) {
			arr.push({
				x: i
			});
		}

		arr.recreate();

		expect(arr.length).toEqual(0);
		expect(index).toEqual(n);
		expect(arr.sandbox.children.length).toEqual(0);
	});


	it('renders if silent: true', () => {
		let arr = createArr(),
			index = 0;

		arr.itemRenderer = () => `<div role="child" index="${index++}"><span></span></div>`;

		for (let i = 0; i < n; i++) {
			arr.push_({
				x: i
			}, {
				silent: true
			});
		}

		expect(arr.length).toEqual(n);
		expect(index).toEqual(n);
		expect(arr.sandbox.children.length).toEqual(n);
	});


	it('uses bindings parser', () => {
		let arr = createArr(),
			index = 0;



		arr.itemRenderer = () => `<div role="child3" index="${index++}"><span attr="hey {{x}}"></span></div>`;

		for (let i = 0; i < n; i++) {
			arr.push({
				x: i
			});
		}

		expect(q('[attr]', arr[5].sandbox).getAttribute('attr')).toEqual('hey ' + 5);
		expect(arr.length).toEqual(n);
		expect(index).toEqual(n);
		expect(arr.sandbox.children.length).toEqual(n);
	});


	it('wraps invalid renderer with <span>', () => {
		let arr = createArr(),
			index = 0;

		arr.itemRenderer = () => `Hi there <div><span attr="hey {{x}}" index="${index++}"></span></div>{{x}}`;

		for (let i = 0; i < n; i++) {
			arr.push({
				x: i
			});
		}
		expect(arr.sandbox.children[0].tagName).toEqual('SPAN');
		expect(arr.sandbox.children[1].childNodes.length).toEqual(3);
		expect(arr.sandbox.children[2].childNodes[0].textContent).toEqual('Hi there ');
		expect(arr.sandbox.children[3].childNodes[1].tagName).toEqual('DIV');
		expect(arr.sandbox.children[4].childNodes[2].textContent).toEqual('4');
		expect(arr.length).toEqual(n);
		expect(index).toEqual(n);
		expect(arr.sandbox.children.length)
	});

	it('allows to use selector', () => {
		let arr = createArr();

		arr.sandbox.appendChild($.create('div', {
			innerHTML: `Hi there <div><span attr="hey {{x}}"></span></div>{{x}}`,
			className: 'item-renderer'
		}));

		arr.itemRenderer = ':sandbox .item-renderer'

		for (let i = 0; i < n; i++) {
			arr.push({
				x: i
			});
		}

		expect(arr.sandbox.children[0].tagName).toEqual('DIV');
		// the first node is itemrenderer node
		expect(arr.sandbox.children[1].childNodes[2].textContent).toEqual('0');
		expect(arr.length).toEqual(n);
		expect(arr.sandbox.children.length);
	});

	it('restores from container', () => {
		let arr = createArr(),
			//div = $.create('div'),
			HTML = '';

		for(let i = 0; i < n; i++) {
			HTML += '<div><span>Hi there</span></div>'
		}

		arr.sandbox.innerHTML = HTML;

		arr.restore();

		expect(arr.length).toEqual(n);
		expect(arr.sandbox.children[0].textContent).toEqual('Hi there');
	});

	it('restores from node with custom selector', () => {
		let arr = createArr(),
			HTML = '';

		for(let i = 0; i < n; i++) {
			HTML += `<div class="${i >= 5 ? 'fit' : 'nope'}"><span>Hi there</span></div>`
		}

		arr.sandbox.innerHTML = HTML;
		arr.restore(':sandbox .fit');
		expect(arr.length).toEqual(5);
		expect(arr.sandbox.children[0].textContent).toEqual('Hi there');
	});

	it('restores from external node', () => {
		let arr = createArr(),
			div = $.create('div', {className: 'restore-items'}),
			HTML = '';

		for(let i = 0; i < n; i++) {
			HTML += '<div><span>Hi there</span></div>'
		}

		div.innerHTML = HTML;
		document.body.appendChild(div);
		arr.restore('.restore-items > div');
		document.body.removeChild(div);
		expect(arr.length).toEqual(n);
		expect(arr[0].sandbox.textContent).toEqual('Hi there');
	});
});
