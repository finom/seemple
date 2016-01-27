'use strict';

define(['matreshka-magic', 'matreshka', 'bquery'], function (_matreshkaMagic, _matreshka, _bquery) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	var _matreshka2 = _interopRequireDefault(_matreshka);

	var _bquery2 = _interopRequireDefault(_bquery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var q = function q(s, c) {
		return (0, _bquery2.default)(s, c)[0] || null;
	};

	var bindInput = function bindInput(obj, key, evt) {
		var input = _bquery2.default.create('input');

		_matreshkaMagic2.default.bindNode(obj, key, input, {
			on: function on(cbc) {
				this._onkeyup = cbc;
			},
			getValue: function getValue() {
				return this.value;
			},
			setValue: function setValue(v) {
				this.value = v;
			}
		}, evt);

		return input;
	};

	describe('Bindings', function () {
		it('should bind', function () {
			var obj = {},
			    input = bindInput(obj, 'x');
			obj.x = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';

			input._onkeyup({});

			expect(obj.x).toEqual('bar');
		});
		it('should unbind', function () {
			var obj = {},
			    input1 = bindInput(obj, 'x'),
			    input2 = bindInput(obj, 'y');

			_matreshkaMagic2.default.unbindNode(obj, 'x y', [input1, input2]);

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
		it('should bind delegated target', function () {
			var obj = {
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
		it('should unbind delegated target', function () {
			var obj = {
				x: {
					y: {}
				}
			},
			    input = bindInput(obj, 'x.y.z');

			_matreshkaMagic2.default.unbindNode(obj, 'x.y.z', input);

			obj.x.y.z = 'foo';
			expect(input.value).toEqual('');
			input.value = 'bar';

			input._onkeyup({});

			expect(obj.x.y.z).toEqual('foo');
		});
		it('should rebind delegated target', function () {
			var obj = {
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
		it('should remove binding if delegated target is reassigned', function () {
			var obj = {
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
		it('uses custom selectors on current target', function () {
			var obj = _matreshka2.default.to({
				x: {
					y: 'foo'
				}
			}),
			    div = _bquery2.default.create('div'),
			    input = div.appendChild(_bquery2.default.create('input'));

			obj.bindNode('sandbox', div);
			obj.bindNode('x.y', ':sandbox input', {
				on: function on(cbc) {
					this._onkeyup = cbc;
				}
			});
			expect(input.value).toEqual('foo');
			input.value = 'bar';

			input._onkeyup({});

			expect(obj.x.y).toEqual('bar');
		});
		it('throws error when node isn\'t there', function () {
			var obj = {},
			    error = false;

			try {
				_matreshkaMagic2.default.bindNode(obj, 'x');
			} catch (e) {
				error = true;
			}

			expect(error).toBe(true);
		});
		it('doesn\'t throw error with bindOptionalNode when node is missing', function () {
			var obj = {};

			_matreshkaMagic2.default.bindOptionalNode(obj, 'x');

			expect(true).toBe(true);
		});
		it('returns bound nodes', function () {
			var obj = {},
			    input = bindInput(obj, 'x');
			expect(input).toEqual(_matreshkaMagic2.default.bound(obj, 'x'));
			expect(input).toEqual(_matreshkaMagic2.default.$bound(obj, 'x')[0]);
		});
		it('selects children of sandbox', function () {
			var obj = {};

			_matreshkaMagic2.default.bindNode(obj, 'sandbox', '<div>\n\t\t\t\t<div>\n\t\t\t\t\t<span></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');

			expect('SPAN').toEqual(_matreshkaMagic2.default.select(obj, 'span').tagName);
			expect('SPAN').toEqual(_matreshkaMagic2.default.selectAll(obj, 'span')[0].tagName);
		});
		it('selects nodes with custom selector', function () {
			var obj = {};

			_matreshkaMagic2.default.bindNode(obj, 'sandbox', '<div>\n\t\t\t\t<div>\n\t\t\t\t\t<span></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t');

			expect('SPAN').toEqual(_matreshkaMagic2.default.select(obj, ':bound(sandbox) span').tagName);
			expect('SPAN').toEqual(_matreshkaMagic2.default.selectAll(obj, ':sandbox span')[0].tagName);
		});
		it('cancels deep binding via deep: false', function () {
			var obj = {},
			    input = bindInput(obj, 'a.b', {
				deep: false
			});
			obj['a.b'] = 'foo';
			expect(input.value).toEqual('foo');
			input.value = 'bar';

			input._onkeyup({});

			expect(obj['a.b']).toEqual('bar');
		});
		it('allows to debounce handler', function (done) {
			var obj = {},
			    input = bindInput(obj, 'x', {
				debounce: true
			});
			obj.x = 'foo';
			expect(input.value).toEqual('');
			obj.x = 'bar';
			expect(input.value).toEqual('');
			setTimeout(function () {
				expect(input.value).toEqual('bar');
				done();
			}, 400);
		});
	});
});