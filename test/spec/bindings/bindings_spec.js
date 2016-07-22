import bindNode from 'src/bindnode';
import unbindNode from 'src/unbindnode';
import makeObject from '../../lib/makeobject';

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
	let initializeCall;
	let destroyCall;

	beforeEach(() => {
		obj = {};
		node = document.createElement('span');
		node2 = document.createElement('span');

		this.initializeCall = () => {};
		this.destroyCall = () => {};
		spyOn(this, 'initializeCall');
		spyOn(this, 'destroyCall');
		initializeCall = this.initializeCall;
		destroyCall = this.destroyCall;

		binder =  {
			on(cbc) {
				this.ondummyevent = cbc;
			},
			getValue() {
				return this.value;
			},
			setValue(v) {
				this.value = v;
			},
			initialize(o) {
				this.value = '';
				initializeCall();
			},
			destroy() {
				this.ondummyevent = () => {};
				destroyCall();
			}
		};
	});

	it('should bind and call initialize', () => {
		bindNode(obj, 'x', node, binder);
		obj.x = 'foo';
		expect(node.value).toEqual('foo');
		node.value = 'bar';
		node.ondummyevent();
		expect(obj.x).toEqual('bar');
		expect(initializeCall).toHaveBeenCalled();
	});

	it('should unbind and call destroy', () => {
		bindNode(obj, 'x', node, binder);
		unbindNode(obj, 'x', node);
		obj.x = 'foo';
		expect(node.value).toEqual('');
		node.value = 'baz';
		node.ondummyevent();
		expect(obj.x).toEqual('foo');
		expect(destroyCall).toHaveBeenCalled();
	});

	it('should bind using key-node object', () => {
		bindNode(obj, { x: node }, binder);
		obj.x = 'foo';
		expect(node.value).toEqual('foo');
		node.value = 'bar';
		node.ondummyevent();
		expect(obj.x).toEqual('bar');
		expect(initializeCall).toHaveBeenCalled();
	});

	it('should unbind key-node object', () => {
		bindNode(obj, { x: node }, binder);
		unbindNode(obj, { x: node });
		obj.x = 'foo';
		expect(node.value).toEqual('');
		node.value = 'baz';
		node.ondummyevent();
		expect(obj.x).toEqual('foo');
		expect(destroyCall).toHaveBeenCalled();
	});

	it('should bind delegated target', () => {
		const obj = makeObject('x.y');
		bindNode(obj, 'x.y.z', node, binder);
		obj.x.y.z = 'foo';
		expect(node.value).toEqual('foo');
		node.value = 'bar';
		node.ondummyevent({});
		expect(obj.x.y.z).toEqual('bar');
	});

	it('should unbind delegated target', () => {
		const obj = makeObject('x.y');
		bindNode(obj, 'x.y.z', node, binder);
		unbindNode(obj, 'x.y.z', node);
		obj.x.y.z = 'foo';
		expect(node.value).toEqual('');
		node.value = 'bar';
		node.ondummyevent({});
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
