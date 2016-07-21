import bindNode from 'src/bindnode';
import unbindNode from 'src/unbindnode';

/*import magic from 'matreshka-magic';
import MK from 'matreshka';
import $ from 'bquery';
let q = (s, c) => $(s, c)[0] || null;

let bindInput = (obj, key, evt) => {
	let input = $.create('input'),
		binder = {
			on(cbc) {
				this._onkeyup = cbc;
			},
			getValue() {
				return this.value;
			},
			setValue(v) {
				this.value = v;
			}
		};

	if(obj instanceof MK) {
		obj.bindNode(key, input, binder, evt);
	} else {
		magic.bindNode(obj, key, input, binder, evt);
	}


	return input;
};*/

describe('Bindings', () => {
	let obj;
	let node;
	let node2;
	let binder;
	let simulateDomEvent;

	beforeEach(() => {
		obj = {};
		node = document.createElement('span');
		node2 = document.createElement('span');
		binder =  {
			on(cbc) {
				this.ondummyevent = cbc;
			},
			getValue() {
				return node.value;
			},
			setValue(v) {
				node.value = v;
			}
		};
	});

	it('should bind', () => {
		bindNode(obj, 'x', node, binder);
		obj.x = 'foo';
		expect(node.value).toEqual('foo');
		node.value = 'bar';
		node.ondummyevent();
		expect(obj.x).toEqual('bar');
	});

	xit('should bind and call initialize', () => {
		let obj = {},
			input = $.create('input'),
			bool = false;

		MK.bindNode(obj, 'x', input, {
			initialize() {
				bool = true;
			}
		});


		expect(bool).toEqual(true);
	});


	it('should unbind', () => {
		bindNode(obj, 'x', node, binder);
		bindNode(obj, 'y', node2, binder);

		unbindNode(obj, 'x y', [node, node2]);

		obj.x = 'foo';
		obj.y = 'bar';
		expect(node.value).toEqual('');
		expect(node2.value).toEqual('');
		node.value = 'baz';
		node2.value = 'qux';
		node.ondummyevent({});
		node2.ondummyevent({});
		expect(obj.x).toEqual('foo');
		expect(obj.y).toEqual('bar');
	});


	xit('should unbind using key-node object', () => {
		let obj = {},
			input1 = bindInput(obj, 'x'),
			input2 = bindInput(obj, 'y');

		magic.unbindNode(obj, {
			x: input1,
			y: input2
		});

		obj.x = 'foo';
		obj.y = 'bar';
		expect(input1.value).toEqual('');
		expect(input2.value).toEqual('');
		input1.value = 'baz';
		input2.value = 'qux';
		input1._onkeyup({});
		input2._onkeyup({});
		expect(obj.x).toEqual('foo');
		expect(obj.y).toEqual('bar');
	});


	xit('should bind via Matreshka instance method', () => {
		let mk = new MK,
			input = bindInput(mk, 'x');

		mk.x = 'foo';
		expect(input.value).toEqual('foo');
		input.value = 'bar';
		input._onkeyup({});
		expect(mk.x).toEqual('bar');
	});


	xit('should unbind via Matreshka instance method', () => {
		let mk = new MK,
			input1 = bindInput(mk, 'x'),
			input2 = bindInput(mk, 'y');

		mk.unbindNode('x y', [input1, input2]);

		mk.x = 'foo';
		mk.y = 'bar';
		expect(input1.value).toEqual('');
		expect(input2.value).toEqual('');
		input1.value = 'baz';
		input2.value = 'qux';
		input1._onkeyup({});
		input2._onkeyup({});
		expect(mk.x).toEqual('foo');
		expect(mk.y).toEqual('bar');
	});


	xit('should bind delegated target', () => {
		let obj = {
				x: {
					y: {}
				}
			},
			input = bindInput(obj, 'x.y.z');

		obj.x.y.z = 'foo';
		expect(input.value).toEqual('foo');
		input.value = 'bar';
		input._onkeyup({});
		expect(obj.x.y.z).toEqual('bar');
	});


	xit('should unbind delegated target', () => {
		let obj = {
				x: {
					y: {}
				}
			},
			input = bindInput(obj, 'x.y.z');

		magic.unbindNode(obj, 'x.y.z', input);

		obj.x.y.z = 'foo';
		expect(input.value).toEqual('');
		input.value = 'bar';
		input._onkeyup({});
		expect(obj.x.y.z).toEqual('foo');
	});

	xit('should rebind delegated target', () => {
		let obj = {
				x: {
					y: {}
				}
			},
			input = bindInput(obj, 'x.y.z');

		obj.x = {
			y: {
				z: 'foo'
			}
		};
		expect(input.value).toEqual('foo');
		input.value = 'bar';
		input._onkeyup({});
		expect(obj.x.y.z).toEqual('bar');
	});

	xit('should remove binding if delegated target is reassigned', () => {
		let obj = {
				x: {
					y: {}
				}
			},
			input = bindInput(obj, 'x.y.z'),
			x = obj.x;

		obj.x = {
			y: {
				z: 'foo'
			}
		};

		input.value = 'bar';
		input._onkeyup({});
		expect(x.y.z).not.toEqual('bar');
		expect(obj.x.y.z).toEqual('bar');

		x.y.z = 'baz';
		expect(input.value).toEqual('bar');
	});


	xit('uses custom selectors on current target', () => {
		let obj = MK.to({x: {y: 'foo'}}),
		 	div = $.create('div'),
			input = div.appendChild($.create('input'));

		obj.bindNode('sandbox', div);
		obj.bindNode('x.y', ':sandbox input', {
			on(cbc) {
				this._onkeyup = cbc;
			}
		});

		expect(input.value).toEqual('foo');
		input.value = 'bar';
		input._onkeyup({});
		expect(obj.x.y).toEqual('bar');
	});


	xit('throws error when node isn\'t there', () => {
		let obj = {},
			error = false;

		try {
			magic.bindNode(obj, 'x');
		} catch(e) {
			error = true;
		}

		expect(error).toBe(true);
	});


	xit('doesn\'t throw error with bindOptionalNode when node is missing', () => {
		let obj = {};

		magic.bindOptionalNode(obj, 'x');

		expect(true).toBe(true);
	});


	xit('doesn\'t throw error with bindOptionalNode method of Matreshka when node is missing', () => {
		let mk = new MK;

		mk.bindOptionalNode('x', null);

		expect(true).toBe(true);
	});


	xit('returns bound nodes', () => {
		let obj = {},
			input = bindInput(obj, 'x');


		expect(input).toEqual(magic.bound(obj, 'x'));
		expect(input).toEqual(magic.$bound(obj, 'x')[0]);
	});


	xit('selects children of sandbox', () => {
		let obj = {};

		magic.bindNode(obj, 'sandbox', `<div>
				<div>
					<span></span>
				</div>
			</div>
		`);

		expect('SPAN').toEqual(magic.select(obj, 'span').tagName);
		expect('SPAN').toEqual(magic.selectAll(obj, 'span')[0].tagName);
	});


	xit('selects nodes with custom selector', () => {
		let obj = {};

		magic.bindNode(obj, 'sandbox', `<div>
				<div>
					<span></span>
				</div>
			</div>
		`);

		expect('SPAN').toEqual(magic.select(obj, ':bound(sandbox) span').tagName);
		expect('SPAN').toEqual(magic.selectAll(obj, ':sandbox span')[0].tagName);
	});

	xit('cancels deep binding via deep: false', () => {
		let obj = {},
			input = bindInput(obj, 'a.b', {
				deep: false
			});

		obj['a.b'] = 'foo';
		expect(input.value).toEqual('foo');
		input.value = 'bar';
		input._onkeyup({});
		expect(obj['a.b']).toEqual('bar');
	});


	xit('allows to debounce handler', done => {
		let obj = {},
			input = bindInput(obj, 'x', {
				debounce: true
			});

		obj.x = 'foo';
		expect(input.value).toEqual('');
		obj.x = 'bar';
		expect(input.value).toEqual('');

		setTimeout(() => {
			expect(input.value).toEqual('bar');
			done();
		}, 400);
	});

	xit('allows to bind sandbox via bindSandbox', () => {
		let obj = {},
			div = $.create('div');

		MK.bindSandbox(obj, div);

		expect(MK.bound(obj, 'sandbox')).toEqual(div);
	});


	xit('bindSandbox throws an error when node is missing', () => {
		let obj = {},
			bool = false;

		try {
			MK.bindSandbox(obj, null);
		} catch(e) {
			bool = true;
		}

		expect(bool).toBeTruthy();

	});
});
