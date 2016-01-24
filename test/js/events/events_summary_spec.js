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
		var result = (0, _bquery2.default)(s, c)[0] || null;

		if (result) {
			result.click = result.click || function () {
				var ev = document.createEvent("MouseEvent");
				ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
				result.dispatchEvent(ev);
			};
		}

		return result;
	};

	describe('Events summary (on, off)', function () {
		var node = document.body.appendChild(_bquery2.default.create({
			tagName: 'DIV',
			id: 's-test',
			innerHTML: '\n\t\t\t<div id="s-test-1">\n\t\t\t\t<div class="s-test-2">\n\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t'
		}));

		node.click = node.click || function () {
			this.dispatchEvent(new MouseEvent('click'));
		};

		it('fires', function () {
			var obj = {},
			    bool = false;

			_matreshkaMagic2.default.on(obj, 'someevent', function (evt) {
				return bool = true;
			});

			_matreshkaMagic2.default.trigger(obj, 'someevent');

			expect(bool).toBe(true);
		});
		it('fires on Matreshka instance', function () {
			var mk = new _matreshka2.default(),
			    bool = false;
			mk.on('someevent', function (evt) {
				return bool = true;
			});
			mk.trigger('someevent');
			expect(bool).toBe(true);
		});
		it('removes', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			_matreshkaMagic2.default.on(obj, 'someevent', f);

			_matreshkaMagic2.default.off(obj, 'someevent');

			_matreshkaMagic2.default.trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});
		it('removes on Matreshka instance', function () {
			var mk = new _matreshka2.default(),
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			mk.on('someevent', f);
			mk.off('someevent');
			mk.trigger('someevent');
			expect(bool).toBe(false);
		});
		it('fires delegated', function () {
			var obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    bool = false;

			_matreshkaMagic2.default.on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});
		it('removes delegated', function () {
			var obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    bool = false;

			_matreshkaMagic2.default.on(obj, 'a.b.c@someevent', function (evt) {
				return bool = true;
			});

			_matreshkaMagic2.default.off(obj, 'a.b.c@someevent');

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(false);
		});
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;

			_matreshkaMagic2.default.bindNode(obj, 'x', '#d-test');

			_matreshkaMagic2.default.on(obj, 'click::x', function (evt) {
				return bool = true;
			});

			q('#d-test').click();
			expect(bool).toBe(true);
		});
		it('removes (no selector)', function () {
			var obj = {},
			    bool = false;

			_matreshkaMagic2.default.bindNode(obj, 'x', '#d-test');

			_matreshkaMagic2.default.on(obj, 'click::x', function (evt) {
				return bool = true;
			});

			_matreshkaMagic2.default.off(obj, 'click::x');

			q('#d-test').click();
			expect(bool).toBe(false);
		});
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;

			_matreshkaMagic2.default.bindNode(obj, 'x', '#d-test');

			_matreshkaMagic2.default.on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});

			q('.d-test-2').click();
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Array)', function () {
			var obj = new _matreshka2.default.Array(),
			    bool = false;

			_matreshkaMagic2.default.on(obj, '@someevent', function (evt) {
				return bool = true;
			});

			obj.push({});

			_matreshkaMagic2.default.trigger(obj[0], 'someevent');

			expect(bool).toBe(true);
		});
		it('fires (no selector)', function () {
			var obj = {},
			    bool = false;

			_matreshkaMagic2.default.bindNode(obj, 'x', '#d-test');

			_matreshkaMagic2.default.on(obj, 'click::x', function (evt) {
				return bool = true;
			});

			q('#d-test').click();
			expect(bool).toBe(true);
		});
		it('fires (use selector)', function () {
			var obj = {},
			    bool = false;

			_matreshkaMagic2.default.bindNode(obj, 'x', '#d-test');

			_matreshkaMagic2.default.on(obj, 'click::x(.d-test-2)', function (evt) {
				return bool = true;
			});

			q('.d-test-2').click();
			expect(bool).toBe(true);
		});
		it('triggers once', function () {
			var obj = {},
			    i = 0,
			    f = function f(evt) {
				return i++;
			};

			_matreshkaMagic2.default.once(obj, 'someevent', f);

			_matreshkaMagic2.default.trigger(obj, 'someevent');

			_matreshkaMagic2.default.trigger(obj, 'someevent');

			_matreshkaMagic2.default.trigger(obj, 'someevent');

			expect(i).toBe(1);
		});
		it('triggers once on Matreshka instance', function () {
			var mk = new _matreshka2.default(),
			    i = 0,
			    f = function f(evt) {
				return i++;
			};

			mk.once('someevent', f);
			mk.trigger('someevent');
			mk.trigger('someevent');
			mk.trigger('someevent');
			expect(i).toBe(1);
		});
		it('onDebounce works', function (done) {
			var obj = {},
			    i = 0,
			    f = function f(evt) {
				return i++;
			};

			setTimeout(function () {
				expect(i).toBe(1);
				done();
			}, 800);

			_matreshkaMagic2.default.onDebounce(obj, 'someevent', f);

			_matreshkaMagic2.default.trigger(obj, 'someevent');

			_matreshkaMagic2.default.trigger(obj, 'someevent');

			_matreshkaMagic2.default.trigger(obj, 'someevent');
		});
		it('onDebounce works on Matreshka instance', function (done) {
			var mk = new _matreshka2.default(),
			    i = 0,
			    f = function f(evt) {
				return i++;
			};

			setTimeout(function () {
				expect(i).toBe(1);
				done();
			}, 800);
			mk.onDebounce('someevent', f);
			mk.trigger('someevent');
			mk.trigger('someevent');
			mk.trigger('someevent');
		});
	});
});