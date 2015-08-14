define(['exports', 'matreshka-magic', 'matreshka', 'balalaika'], function (exports, _matreshkaMagic, _matreshka, _balalaika) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	var _MK = _interopRequireDefault(_matreshka);

	var _$ = _interopRequireDefault(_balalaika);

	var q = function q(s, c) {
		return (0, _$['default'])(s, c)[0] || null;
	};

	describe('Events summary (_on, _off, on, off)', function () {
		document.body.appendChild(_$['default'].create({
			tagName: 'DIV',
			id: 's-test',
			innerHTML: '\n\t\t\t<div id="s-test-1">\n\t\t\t\t<div class="s-test-2">\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t'
		}));

		it('fires', function () {
			var obj = {},
			    bool = false;
			_magic['default']._on(obj, 'someevent', function (evt) {
				return bool = true;
			});
			_magic['default'].trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});

		it('fires delegated', function () {
			var obj = { a: { b: { c: {} } } },
			    bool = false;

			_magic['default']._on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});
			_magic['default'].trigger(obj.a.b.c, 'someevent');
			expect(bool).toBe(true);
		});

		it('removed delegated', function () {
			var obj = { a: { b: { c: {} } } },
			    bool = false;

			_magic['default']._on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});
			_magic['default']._off(obj, 'a.b.c@someevent');

			_magic['default'].trigger(obj.a.b.c, 'someevent');
			expect(bool).toBe(false);
		});

		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._on(obj, 'click::x', function (evt) {
				return bool = true;
			});

			q('#d-test').click();

			expect(bool).toBe(true);
		});

		it('removes (no selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._on(obj, 'click::x', function (evt) {
				return bool = true;
			});
			_magic['default']._off(obj, 'click::x');

			q('#d-test').click();

			expect(bool).toBe(false);
		});

		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});

			q('.d-test-2').click();

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Array)', function () {
			var obj = new _MK['default'].Array(),
			    bool = false;

			_magic['default']._on(obj, '@someevent', function (evt) {
				return bool = true;
			});

			obj.push({});

			//magic._off( obj, '*@someevent'  );

			_magic['default'].trigger(obj[0], 'someevent');

			expect(bool).toBe(true);
		});

		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._on(obj, 'click::x', function (evt) {
				return bool = true;
			});

			q('#d-test').click();

			expect(bool).toBe(true);
		});

		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;

			_magic['default'].bindNode(obj, 'x', '#d-test');
			_magic['default']._on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});

			q('.d-test-2').click();

			expect(bool).toBe(true);
		});
	});
});