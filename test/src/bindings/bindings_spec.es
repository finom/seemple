import magic from 'matreshka-magic';
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
};

describe('Bindings', () => {
	it('should bind', () => {
		let obj = {},
			input = bindInput(obj, 'x');

		obj.x = 'foo';
		expect(input.value).toEqual('foo');
		input.value = 'bar';
		input._onkeyup({});
		expect(obj.x).toEqual('bar');
	});


	it('should unbind', () => {
		let obj = {},
			input1 = bindInput(obj, 'x'),
			input2 = bindInput(obj, 'y');

		magic.unbindNode(obj, 'x y', [input1, input2]);

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


	it('should bind via Matreshka instance method', () => {
		let mk = new MK,
			input = bindInput(mk, 'x');

		mk.x = 'foo';
		expect(input.value).toEqual('foo');
		input.value = 'bar';
		input._onkeyup({});
		expect(mk.x).toEqual('bar');
	});


	it('should unbind via Matreshka instance method', () => {
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


	it('should bind delegated target', () => {
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


	it('should unbind delegated target', () => {
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

	it('should rebind delegated target', () => {
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

	it('should remove binding if delegated target is reassigned', () => {
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


	it('uses custom selectors on current target', () => {
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


	it('throws error when node isn\'t there', () => {
		let obj = {},
			error = false;

		try {
			magic.bindNode(obj, 'x');
		} catch(e) {
			error = true;
		}

		expect(error).toBe(true);
	});


	it('doesn\'t throw error with bindOptionalNode when node is missing', () => {
		let obj = {};

		magic.bindOptionalNode(obj, 'x');

		expect(true).toBe(true);
	});


	it('doesn\'t throw error with bindOptionalNode method of Matreshka when node is missing', () => {
		let mk = new MK;

		mk.bindOptionalNode('x', null);

		expect(true).toBe(true);
	});


	it('returns bound nodes', () => {
		let obj = {},
			input = bindInput(obj, 'x');


		expect(input).toEqual(magic.bound(obj, 'x'));
		expect(input).toEqual(magic.$bound(obj, 'x')[0]);
	});


	it('selects children of sandbox', () => {
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


	it('selects nodes with custom selector', () => {
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

	it('cancels deep binding via deep: false', () => {
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


	it('allows to debounce handler', done => {
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
});
