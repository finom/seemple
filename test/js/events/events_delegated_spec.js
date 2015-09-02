define(['exports', 'matreshka-magic', 'matreshka'], function (exports, _matreshkaMagic, _matreshka) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	var _MK = _interopRequireDefault(_matreshka);

	describe('Delegated events: _delegateListener, _undelegateListener', function () {
		it('fires (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b, reassign a)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a = {
				b: {}
			};
			_magic['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b, reassign b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			};
			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a.b = {};

			_magic['default'].trigger(obj.a.b, 'someevent');
			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b.c, reassign a)', function () {

			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a = {
				b: {
					c: {}
				}
			};

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b.c, reassign b)', function () {

			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b = {
				c: {}
			};

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('fires when reassigned (a.b.c, reassign c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b.c = {};

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('remove event from old target when reassigned (a.b, reassign a)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			},
			    a = obj.a;

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a = {
				b: {}
			};
			_magic['default'].trigger(a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b, reassign b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			},
			    b = obj.a.b;

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			obj.a.b = {};
			_magic['default'].trigger(b, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b.c, reassign a)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    a = obj.a;

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a = {
				b: {
					c: {}
				}
			};
			_magic['default'].trigger(a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b.c, reassign b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    b = obj.a.b;

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b = {
				c: {}
			};
			_magic['default'].trigger(b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('remove event from old target when reassigned (a.b.c, reassign c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    c = obj.a.c;

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			obj.a.b.c = {};
			_magic['default'].trigger(c, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic['default']._undelegateListener(obj, 'a.b', 'someevent');

			_magic['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic['default']._undelegateListener(obj, 'a.b.c', 'someevent');

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('doesn\'t remove change event when undelegate (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', function () {});
			_magic['default']._delegateListener(obj, 'a.b', 'change:c', f);
			_magic['default']._undelegateListener(obj, 'a.b.c', 'someevent');
			obj.a.b.c = 55;

			expect(bool).toBe(true);
		});

		it('undelegate by callback (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic['default']._undelegateListener(obj, 'a.b', 'someevent', f);

			_magic['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic['default']._undelegateListener(obj, 'a.b.c', 'someevent', f);

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback and context (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {},
			    obj = {
				a: {
					b: {}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f, ctx);
			_magic['default']._undelegateListener(obj, 'a.b', 'someevent', f, ctx);

			_magic['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback and context (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f, ctx);
			_magic['default']._undelegateListener(obj, 'a.b.c', 'someevent', f, ctx);

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(false);
		});

		it('undelegate by callback but keeps when callbacks are not same (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f);
			_magic['default']._undelegateListener(obj, 'a.b', 'someevent', function () {});

			_magic['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('undelegate by callback but keeps when callbacks are not same (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f);
			_magic['default']._undelegateListener(obj, 'a.b.c', 'someevent', function () {});

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('undelegate by callback but keeps when contexts are not same (a.b)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b', 'someevent', f, {});
			_magic['default']._undelegateListener(obj, 'a.b', 'someevent', f, {});

			_magic['default'].trigger(obj.a.b, 'someevent');

			expect(bool).toBe(true);
		});

		it('undelegate by callback but keeps when contexts are not same (a.b.c)', function () {
			var bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', f, {});
			_magic['default']._undelegateListener(obj, 'a.b.c', 'someevent', f, {});

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('uses correct context for delegated events', function () {
			var bool = false,
			    obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			    ctx = {};

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
				bool = this === ctx;
			}, ctx);

			_magic['default'].trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Array)', function () {
			var obj = new _MK['default'].Array(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({});

			_magic['default'].trigger(obj[0], 'someevent');

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Object)', function () {
			var obj = new _MK['default'].Object(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {});

			_magic['default'].trigger(obj.x, 'someevent');

			expect(bool).toBe(true);
		});

		it('removes "*" events (MK.Array)', function () {
			var obj = new _MK['default'].Array(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({});

			_magic['default']._undelegateListener(obj, '*', 'someevent');

			_magic['default'].trigger(obj[0], 'someevent');

			expect(bool).toBe(false);
		});

		it('removes "*" events (MK.Object)', function () {
			var obj = new _MK['default'].Object(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {});

			_magic['default']._undelegateListener(obj, '*', 'someevent');

			_magic['default'].trigger(obj.x, 'someevent');

			expect(bool).toBe(false);
		});

		it('removes "*" events using callback (MK.Array)', function () {
			var obj = new _MK['default'].Array(),
			    bool = false,
			    callback = function callback(evt) {
				return bool = true;
			};

			_magic['default']._delegateListener(obj, '*', 'someevent', callback);

			obj.push({});

			_magic['default']._undelegateListener(obj, '*', 'someevent', callback);

			_magic['default'].trigger(obj[0], 'someevent');

			expect(bool).toBe(false);
		});

		it('removes "*" events using callback (MK.Object)', function () {
			var obj = new _MK['default'].Object(),
			    bool = false,
			    callback = function callback(evt) {
				return bool = true;
			};

			_magic['default']._delegateListener(obj, '*', 'someevent', callback);

			obj.jset('x', {});

			_magic['default']._undelegateListener(obj, '*', 'someevent', callback);

			_magic['default'].trigger(obj.x, 'someevent');

			expect(bool).toBe(false);
		});

		it('works with "*" events (MK.Array), go deeper (*.a)', function () {
			var obj = new _MK['default'].Array(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({
				a: {}
			});

			_magic['default'].trigger(obj[0].a, 'someevent');

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Object), go deeper (*.a)', function () {
			var obj = new _MK['default'].Object(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {
				a: {}
			});

			_magic['default'].trigger(obj.x.a, 'someevent');

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Array), go deeper (*.*)', function () {
			var obj = new _MK['default'].Array(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push(new _MK['default'].Array({}));

			_magic['default'].trigger(obj[0][0], 'someevent');

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Object), go deeper (*.*)', function () {
			var obj = new _MK['default'].Object(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', new _MK['default'].Object({
				a: {}
			}));

			_magic['default'].trigger(obj.x.a, 'someevent');

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Array), go deeper (*.*.a)', function () {
			var obj = new _MK['default'].Array(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push(new _MK['default'].Array({
				a: {}
			}));

			_magic['default'].trigger(obj[0][0].a, 'someevent');

			expect(bool).toBe(true);
		});

		it('works with "*" events (MK.Object), go deeper (*.*.a)', function () {
			var obj = new _MK['default'].Object(),
			    bool = false;

			_magic['default']._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', new _MK['default'].Object({
				y: new _MK['default'].Object({
					a: {}
				})
			}));

			_magic['default'].trigger(obj.x.y.a, 'someevent');

			expect(bool).toBe(true);
		});

		/*
  TODO
  it( 'works with "..." events (a.b.c, listen "...@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._delegateListener( obj, '...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(true);
  });
  
  it( 'works with "..." events (a.b.c, listen "...@someevent", trigger on b)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._delegateListener( obj, '...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b, 'someevent' );
  		expect(bool).toBe(true);
  });
  	it( 'works with "..." events (a.b.c, listen "...c@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._delegateListener( obj, '...c', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(true);
  });
  	it( 'works with "..." events (a.b.c, listen "a...@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._delegateListener( obj, 'a...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(true);
  });
  	it( 'works with "..." events (a.b.c, listen "a...@someevent", trigger on b)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._delegateListener( obj, 'a...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b, 'someevent' );
  		expect(bool).toBe(true);
  });
  	it( 'works with "..." events (a.b.c, listen "a...c@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._delegateListener( obj, 'a...c', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(true);
  });
  	// ---
  it( 'removes "..." events (a.b.c, listen "...@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._undelegateListener( obj, '...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(false);
  });
  
  it( 'works with "..." events (a.b.c, listen "...@someevent", trigger on b)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._undelegateListener( obj, '...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b, 'someevent' );
  		expect(bool).toBe(false);
  });
  	it( 'works with "..." events (a.b.c, listen "...c@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._undelegateListener( obj, '...c', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(false);
  });
  	it( 'works with "..." events (a.b.c, listen "a...@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._undelegateListener( obj, 'a...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(false);
  });
  	it( 'works with "..." events (a.b.c, listen "a...@someevent", trigger on b)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._undelegateListener( obj, 'a...', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b, 'someevent' );
  		expect(bool).toBe(false);
  });
  	it( 'works with "..." events (a.b.c, listen "a...c@someevent", trigger on c)', () => {
  	let obj = { a: { b: { c: {} } } },
  		bool = false;
  		magic._undelegateListener( obj, 'a...c', 'someevent', evt => bool = true );
  		magic.trigger( obj.a.b.c, 'someevent' );
  		expect(bool).toBe(false);
  });*/

		/*'a.b.c@change:x';
  	'a@b@c@change:x'; // polyfill
  '@change:x'; // polyfill
  	'...@change:x';  // MK.Array, MK.Object
  'a...@change:x'; // MK
  '*@modify'; // MK.Array, MK.Object
  '*.*@modify';  // MK.Array, MK.Object
  '*.*.*@modify';  // MK.Array, MK.Object
  '{a}.{b}.{c}@modify'; // MK.Array, MK.Object
  	'*.a...@change:x';
  '*.{a}.{b}...@change:x'*/
	});
});