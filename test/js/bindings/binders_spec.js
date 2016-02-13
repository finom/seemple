'use strict';

define(['matreshka-magic', 'matreshka', 'bquery'], function (magic, MK, $) {
	var q = function q(s, c) {
		return $(s, c)[0] || null;
	};

	var canRedefineNativeProps = true;

	try {
		Object.defineProperty(document.createElement('div'), 'dataset', {
			value: null
		});
	} catch (e) {
		canRedefineNativeProps = false;
	}

	var canTestFileBinder = true;

	try {
		new Blob(['foo'], {
			type: 'text/plain'
		});
	} catch (e) {
		canTestFileBinder = false;
	}

	canTestFileBinder = canTestFileBinder && typeof FileReader != 'undefined';
	describe('Binders', function () {
		it('Binds prop', function () {
			var node = $.create('div', {
				someProp: 42
			}),
			    o = {};
			magic.bindNode(o, 'x', node, magic.binders.prop('someProp'));
			expect(o.x).toEqual(42);
			o.x = 43;
			expect(node.someProp).toEqual(43);
		});
		it('Binds attr', function () {
			var node = $.create('div', {
				attributes: {
					someattr: "42"
				}
			}),
			    o = {};
			magic.bindNode(o, 'x', node, magic.binders.attr('someattr'));
			expect(o.x).toEqual('42');
			o.x = 43;
			expect(node.getAttribute('someattr')).toEqual('43');
		});
		it('Binds html', function () {
			var node = $.create('div', {
				innerHTML: '<i>42</i>'
			}),
			    o = {};
			magic.bindNode(o, 'x', node, magic.binders.html());
			expect(o.x).toEqual('<i>42</i>');
			o.x = '<i>43</i>';
			expect(node.innerHTML).toEqual('<i>43</i>');
		});
		it('Binds text', function () {
			var node = $.create('div', {
				textContent: '<i>42</i>'
			}),
			    o = {};
			magic.bindNode(o, 'x', node, magic.binders.text());
			expect(o.x).toEqual('<i>42</i>');
			o.x = '<i>43</i>';
			expect(node.textContent).toEqual('<i>43</i>');
		});
		it('Binds style', function () {
			var node = $.create('div', {
				style: {
					textAlign: 'center'
				}
			}),
			    o = {};
			magic.bindNode(o, 'x', node, magic.binders.style('textAlign'));
			expect(o.x).toEqual('center');
			o.x = 'right';
			expect(node.style.textAlign).toEqual('right');
		});
		it('Binds display', function () {
			var node = $.create('div'),
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
		(canRedefineNativeProps ? it : xit)('Binds dataset', function () {
			var node = $.create('div', {
				attributes: {
					'data-some-attr': '42'
				}
			});
			tester(node);
			node = $.create('div', {
				attributes: {
					'data-some-attr': '42'
				}
			});
			Object.defineProperty(node, 'dataset', {
				get: function get() {
					return null;
				}
			});
			tester(node);

			function tester(node) {
				var o = {};
				magic.bindNode(o, 'x', node, magic.binders.dataset('someAttr'));
				expect(o.x).toEqual('42');
				o.x = '43';
				expect(node.getAttribute('data-some-attr')).toEqual('43');
			}
		});
		(canRedefineNativeProps ? it : xit)('Binds className', function () {
			var node = $.create('div', {
				className: 'some-class'
			});
			tester(node);
			node = $.create('div', {
				className: 'some-class'
			});
			Object.defineProperty(node, 'classList', {
				get: function get() {
					return null;
				}
			});
			tester(node);

			function tester(node) {
				var o = {},
				    hasClass = function hasClass(o, c) {
					return o.classList ? o.classList.contains(c) : new RegExp('(\\s|^)' + c + '(\\s|$)').test(o.className);
				};

				magic.bindNode(o, 'x', node, magic.binders.className('some-class'));
				expect(o.x).toEqual(true);
				o.x = false;
				expect(hasClass(node, 'some-class')).toEqual(false);
				magic.bindNode(o, 'y', node, magic.binders.className('!some-class'));
				expect(o.y).toEqual(true);
				o.y = false;
				expect(hasClass(node, 'some-class')).toEqual(true);
			}
		});
		it('supports fallbacks', function () {
			expect(magic.binders.innerHTML).toEqual(magic.binders.html);
			expect(magic.binders.innerText).toEqual(magic.binders.text);
			expect(magic.binders.property).toEqual(magic.binders.prop);
			expect(magic.binders.attribute).toEqual(magic.binders.attr);
		});
	});
	describe('Default binders', function () {
		it('Binds textarea', function () {
			var node = $.create('textarea', {
				value: '42'
			}),
			    o = {};
			magic.bindNode(o, 'x', node);
			expect(o.x).toEqual('42');
			o.x = '43';
			expect(node.value).toEqual('43');
		});
		it('Binds progress', function () {
			var node = $.create('progress', {
				max: 100,
				value: 42
			}),
			    o = {};
			magic.bindNode(o, 'x', node);
			expect(o.x).toEqual(42);
			o.x = 43;
			expect(node.value).toEqual(43);
		});
		it('Binds text input', function () {
			var node = $.create('input', {
				value: '42'
			}),
			    o = {};
			magic.bindNode(o, 'x', node);
			expect(o.x).toEqual('42');
			o.x = '43';
			expect(node.value).toEqual('43');
		});
		it('Binds checkbox', function () {
			var node = $.create('input', {
				type: 'checkbox',
				checked: true
			}),
			    o = {};
			magic.bindNode(o, 'x', node);
			expect(o.x).toEqual(true);
			o.x = false;
			expect(node.checked).toEqual(false);
		});
		it('Binds select', function () {
			var node = $.create('select', {
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
			magic.bindNode(o, 'x', node);
			expect(o.x).toEqual('2');
			o.x = '3';
			expect(node.options[node.selectedIndex].value).toEqual('3');
		});
		it('Binds multiple select', function () {
			var node = $.create('select', {
				multiple: true,
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
					selected: true,
					value: '4'
				}]
			}),
			    o = {};
			magic.bindNode(o, 'x', node);
			expect(o.x).toEqual(['2', '4']);
			o.x = ['1', '3'];
			$(node.options).forEach(function (option) {
				return expect(option.selected).toEqual(option.value == '1' || option.value == '3');
			});
			o.x = '2';
			$(node.options).forEach(function (option) {
				return expect(option.selected).toEqual(option.value == '2');
			});
		});
		it('Binds output', function () {
			var node = $.create('output', {
				innerHTML: '42'
			}),
			    o = {};
			magic.bindNode(o, 'x', node);
			expect(o.x).toEqual('42');
			o.x = '43';
			expect(node.innerHTML).toEqual('43');
		});
		(canTestFileBinder ? it : xit)('allows to bind file input', function (done) {
			var input = $.create('div', {
				type: 'file',
				multiple: false
			}),
			    o = {};
			Object.defineProperty(input, 'files', {
				value: [new Blob(['foo'], {
					type: 'text/plain'
				})]
			});
			magic.bindNode(o, 'file', input, magic.binders.file('text'));
			magic.on(o, 'change:file', function (evt) {
				expect(o.file.readerResult).toEqual('foo');
				done();
			});
			MK.trigger(o, 'change::file');
		});
		(canTestFileBinder ? it : xit)('allows to bind file input (multiple)', function (done) {
			var input = $.create('div', {
				type: 'file',
				multiple: true
			}),
			    o = {};
			Object.defineProperty(input, 'files', {
				value: [new Blob(['foo'], {
					type: 'text/plain'
				}), new Blob(['bar'], {
					type: 'text/plain'
				})]
			});
			magic.bindNode(o, 'files', input, magic.binders.file('text'));
			magic.on(o, 'change:files', function (evt) {
				expect(o.files[0].readerResult).toEqual('foo');
				expect(o.files[1].readerResult).toEqual('bar');
				done();
			});
			MK.trigger(o, 'change::files');
		});
		(canTestFileBinder ? it : xit)('allows to bind file input with no reading', function () {
			var input = $.create('div', {
				type: 'file',
				multiple: false
			}),
			    o = {};
			Object.defineProperty(input, 'files', {
				value: [new Blob(['foo'], {
					type: 'text/plain'
				})]
			});
			magic.bindNode(o, 'file', input, magic.binders.file());
			MK.trigger(o, 'change::file');
			expect(o.file.readerResult).toEqual(undefined);
		});
		(canTestFileBinder ? it : xit)('assigns null if files aren\'t exist', function () {
			var input = $.create('div', {
				type: 'file',
				multiple: false
			}),
			    o = {};
			Object.defineProperty(input, 'files', {
				value: []
			});
			magic.bindNode(o, 'file', input, magic.binders.file('text'));
			MK.trigger(o, 'change::file');
			expect(o.file).toEqual(null);
		});
		(canTestFileBinder ? it : xit)('throws error if filereader doesn\'t exist', function () {
			var input = $.create('div', {
				type: 'file',
				multiple: false
			}),
			    o = {};
			Object.defineProperty(input, 'files', {
				value: []
			});

			try {
				magic.bindNode(o, 'file', input, magic.binders.file('wat'));
			} catch (e) {
				expect(!! ~e.message.indexOf('not supported')).toEqual(true);
			}
		});
	});
});
