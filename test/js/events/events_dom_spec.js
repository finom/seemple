define(['exports', 'matreshka-magic', 'balalaika'], function (exports, _matreshkaMagic, _balalaika) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	var _$ = _interopRequireDefault(_balalaika);

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

		/*
  TODO
  	it( 'removes delegated', () => {
  	let obj = {},
  		bool = false;
  		magic._addDOMListener( obj, '#d-test-2', null, evt => bool = true );
  	magic._removeDOMListener( obj, '#d-test-2', null );
  		document.getElementById( '#d-test-2' ).click();
  		expect(bool).toBe(false);
  });*/
	});
});