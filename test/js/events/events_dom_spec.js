define(['exports', 'matreshka-magic', 'bquery'], function (exports, _matreshkaMagic, _bquery) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	var _$ = _interopRequireDefault(_bquery);

	var q = function q(s, c) {
		var result = (0, _$['default'])(s, c)[0] || null;
		if (result) {
			result.click = result.click || function () {
				var ev = document.createEvent("MouseEvent");
				ev.initMouseEvent("click", true, /* bubble */true, /* cancelable */
				window, null, 0, 0, 0, 0, /* coordinates */
				false, false, false, false, /* modifier keys */
				0, /*left*/null);
				result.dispatchEvent(ev);
			};
		}
		return result;
	};

	describe("Events core: _addDOMListener, _removeDOMListener", function () {
		document.body.appendChild(_$['default'].create({
			tagName: 'DIV',
			id: 'd-test',
			innerHTML: '\n\t\t\t<div id="d-test-1">\n\t\t\t\t<div class="d-test-2">\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t'
		}));

		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});

			q('#d-test').click();

			expect(bool).toBe(true);
		});

		it('removes (no selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default']._addDOMListener(obj, 'x', 'click', null, function (evt) {
				return bool = true;
			});
			_magic['default']._removeDOMListener(obj, 'x', 'click');
			_magic['default'].bindNode(obj, 'x', '#d-test');

			q('#d-test').click();

			expect(bool).toBe(false);
		});

		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});

			q('.d-test-2').click();

			expect(bool).toBe(true);
		});

		it('adds (use selector) and removes (no selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			_magic['default']._removeDOMListener(obj, 'x', 'click');

			q('.d-test-2').click();

			expect(bool).toBe(false);
		});

		it('adds (use selector) then binds then removes (no selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			_magic['default']._removeDOMListener(obj, 'x', 'click');

			q('.d-test-2').click();

			expect(bool).toBe(false);
		});

		it('triggers DOM event', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', null, function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			_magic['default'].trigger(obj, 'click::x', 1, 2);

			expect(bool).toBe(true);
		});

		it('triggers DOM event with specified selector', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', '.d-test-2', function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			_magic['default'].trigger(obj, 'click::x(.d-test-2)', 1, 2);

			expect(bool).toBe(true);
		});

		it('triggers DOM event with specified selector (bubbling test)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', null, function (d1, d2) {
				return bool = d1 === 1 && d2 === 2;
			});
			_magic['default'].trigger(obj, 'click::x(.d-test-2)', 1, 2);

			expect(bool).toBe(true);
		});

		it('removes delegated', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			_magic['default']._removeDOMListener(obj, 'x', 'click', '.d-test-2');

			q('.d-test-2').click();

			expect(bool).toBe(false);
		});

		it('removes delegated and doesn\'t remove events from other nodes', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._addDOMListener(obj, 'x', 'click', '.d-test-2', function (evt) {
				return bool = true;
			});
			_magic['default']._removeDOMListener(obj, 'x', 'click', '.blah');

			q('.d-test-2').click();

			expect(bool).toBe(true);
		});
	});
});