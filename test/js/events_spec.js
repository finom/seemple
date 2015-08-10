define(['exports', 'magic'], function (exports, _magic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic2 = _interopRequireDefault(_magic);

	describe('Events core: _addListener, _removeListener, trigger', function () {
		var obj = {};

		it('fires', function () {
			var bool = false;
			_magic2['default']._addListener(obj, 'someevent', function (evt) {
				return bool = true;
			});
			_magic2['default'].trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});

		it('removes (no args)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			_magic2['default']._addListener(obj, 'someevent', f);
			_magic2['default']._removeListener(obj, 'someevent');
			_magic2['default'].trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});

		it('removes by callback', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			_magic2['default']._addListener(obj, 'someevent', f);
			_magic2['default']._removeListener(obj, 'someevent', f);
			_magic2['default'].trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});

		it('removes by callback but keeps when callbacks are not same', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			_magic2['default']._addListener(obj, 'someevent', f);
			_magic2['default']._removeListener(obj, 'someevent', function () {});
			_magic2['default'].trigger(obj, 'someevent');

			expect(bool).toBe(true);
		});

		it('removes by callback and context', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {};

			_magic2['default']._addListener(obj, 'someevent', f, ctx);
			_magic2['default']._removeListener(obj, 'someevent', f, ctx);
			_magic2['default'].trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});

		it('removes by callback but keeps when contexts are not same', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {};

			_magic2['default']._addListener(obj, 'someevent', f, ctx);
			_magic2['default']._removeListener(obj, 'someevent', f, {});
			_magic2['default'].trigger(obj, 'someevent');

			expect(bool).toBe(true);
		});

		it('removes by howToRemove (not documented core feature)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    onData = {
				howToRemove: function howToRemove(onData, offData) {
					return offData.x === 53;
				}
			};

			_magic2['default']._addListener(obj, 'someevent', f, null, onData);
			_magic2['default']._removeListener(obj, 'someevent', null, null, {
				x: 53
			});

			_magic2['default'].trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});
	});

	describe('Delegated events: _delegateListener, _undelegateListener', function () {
		it('fires (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } };

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic2['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b, reassign a)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } };

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a = { b: {} };

			_magic2['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b, reassign b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } };
			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a.b = {};

			_magic2['default'].trigger(obj.a.b, 'someevent');
			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b.c, reassign a)', function () {

			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a = { b: { c: {} } };

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b.c, reassign b)', function () {

			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b = { c: {} };

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b.c, reassign c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b.c = {};

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('remove event from old target when reassigned (a.b, reassign a)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } },
			    a = obj.a;

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a = { b: {} };
			_magic2['default'].trigger(a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b, reassign b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } },
			    b = obj.a.b;

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a.b = {};
			_magic2['default'].trigger(b, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b.c, reassign a)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } },
			    a = obj.a;

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a = { b: { c: {} } };
			_magic2['default'].trigger(a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b.c, reassign b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } },
			    b = obj.a.b;

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b = { c: {} };
			_magic2['default'].trigger(b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b.c, reassign c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } },
			    c = obj.a.c;

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b.c = {};
			_magic2['default'].trigger(c, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } };

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic2['default']._undelegateListener(obj, 'a.b', 'someevent');

			_magic2['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic2['default']._undelegateListener(obj, 'a.b.c', 'someevent');

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } };

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic2['default']._undelegateListener(obj, 'a.b', 'someevent', f);

			_magic2['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic2['default']._undelegateListener(obj, 'a.b.c', 'someevent', f);

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback and context (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {},
			    obj = { a: { b: {} } };

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f, ctx);
			_magic2['default']._undelegateListener(obj, 'a.b', 'someevent', f, ctx);

			_magic2['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback and context (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f, ctx);
			_magic2['default']._undelegateListener(obj, 'a.b.c', 'someevent', f, ctx);

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback but keeps when callbacks are not same (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } };

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic2['default']._undelegateListener(obj, 'a.b', 'someevent', function () {});

			_magic2['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('undelegate by callback but keeps when callbacks are not same (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic2['default']._undelegateListener(obj, 'a.b.c', 'someevent', function () {});

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('undelegate by callback but keeps when contexts are not same (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: {} } };

			_magic2['default']._delegateListener(obj, 'a.b', 'someevent', f, {});
			_magic2['default']._undelegateListener(obj, 'a.b', 'someevent', f, {});

			_magic2['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('undelegate by callback but keeps when contexts are not same (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = { a: { b: { c: {} } } };

			_magic2['default']._delegateListener(obj, 'a.b.c', 'someevent', f, {});
			_magic2['default']._undelegateListener(obj, 'a.b.c', 'someevent', f, {});

			_magic2['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		'a.b.c@change:x';

		'a@b@c@change:x'; // polyfill
		'@change:x'; // polyfill

		'...@change:x'; // MK.Array, MK.Object
		'a...@change:x'; // MK
		'*@modify'; // MK.Array, MK.Object
		'*.*@modify'; // MK.Array, MK.Object
		'*.*.*@modify'; // MK.Array, MK.Object
	});

	// change events
	// dom events
});
