'use strict';

define(['matreshka-magic', 'matreshka'], function (_matreshkaMagic, _matreshka) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	var _matreshka2 = _interopRequireDefault(_matreshka);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a = {
				b: {}
			};

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a.b = {};

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a = {
				b: {
					c: {}
				}
			};

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b = {
				c: {}
			};

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b.c = {};

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a = {
				b: {}
			};

			_matreshkaMagic2.default.trigger(a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a.b = {};

			_matreshkaMagic2.default.trigger(b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a = {
				b: {
					c: {}
				}
			};

			_matreshkaMagic2.default.trigger(a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b = {
				c: {}
			};

			_matreshkaMagic2.default.trigger(b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b.c = {};

			_matreshkaMagic2.default.trigger(c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b', 'someevent');

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b.c', 'someevent');

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', function () {});

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'change:c', f);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b.c', 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b', 'someevent', f);

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b.c', 'someevent', f);

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f, ctx);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b', 'someevent', f, ctx);

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f, ctx);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b.c', 'someevent', f, ctx);

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b', 'someevent', function () {});

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f);

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b.c', 'someevent', function () {});

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'someevent', f, {});

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b', 'someevent', f, {});

			_matreshkaMagic2.default.trigger(obj.a.b, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', f, {});

			_matreshkaMagic2.default._undelegateListener(obj, 'a.b.c', 'someevent', f, {});

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
				bool = this === ctx;
			}, ctx);

			_matreshkaMagic2.default.trigger(obj.a.b.c, 'someevent');

			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Array)', function () {
			var obj = new _matreshka2.default.Array(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({});

			_matreshkaMagic2.default.trigger(obj[0], 'someevent');

			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object)', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {});

			_matreshkaMagic2.default.trigger(obj.x, 'someevent');

			expect(bool).toBe(true);
		});
		it('removes "*" events (MK.Array)', function () {
			var obj = new _matreshka2.default.Array(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({});

			_matreshkaMagic2.default._undelegateListener(obj, '*', 'someevent');

			_matreshkaMagic2.default.trigger(obj[0], 'someevent');

			expect(bool).toBe(false);
		});
		it('removes "*" events (MK.Object)', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {});

			_matreshkaMagic2.default._undelegateListener(obj, '*', 'someevent');

			_matreshkaMagic2.default.trigger(obj.x, 'someevent');

			expect(bool).toBe(false);
		});
		it('removes "*" events using callback (MK.Array)', function () {
			var obj = new _matreshka2.default.Array(),
			    bool = false,
			    callback = function callback(evt) {
				return bool = true;
			};

			_matreshkaMagic2.default._delegateListener(obj, '*', 'someevent', callback);

			obj.push({});

			_matreshkaMagic2.default._undelegateListener(obj, '*', 'someevent', callback);

			_matreshkaMagic2.default.trigger(obj[0], 'someevent');

			expect(bool).toBe(false);
		});
		it('removes "*" events using callback (MK.Object)', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false,
			    callback = function callback(evt) {
				return bool = true;
			};

			_matreshkaMagic2.default._delegateListener(obj, '*', 'someevent', callback);

			obj.jset('x', {});

			_matreshkaMagic2.default._undelegateListener(obj, '*', 'someevent', callback);

			_matreshkaMagic2.default.trigger(obj.x, 'someevent');

			expect(bool).toBe(false);
		});
		it('works with "*" events (MK.Array), go deeper (*.a)', function () {
			var obj = new _matreshka2.default.Array(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({
				a: {}
			});

			_matreshkaMagic2.default.trigger(obj[0].a, 'someevent');

			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object), go deeper (*.a)', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {
				a: {}
			});

			_matreshkaMagic2.default.trigger(obj.x.a, 'someevent');

			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Array), go deeper (*.*)', function () {
			var obj = new _matreshka2.default.Array(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push(new _matreshka2.default.Array({}));

			_matreshkaMagic2.default.trigger(obj[0][0], 'someevent');

			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object), go deeper (*.*)', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', new _matreshka2.default.Object({
				a: {}
			}));

			_matreshkaMagic2.default.trigger(obj.x.a, 'someevent');

			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Array), go deeper (*.*.a)', function () {
			var obj = new _matreshka2.default.Array(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push(new _matreshka2.default.Array({
				a: {}
			}));

			_matreshkaMagic2.default.trigger(obj[0][0].a, 'someevent');

			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object), go deeper (*.*.a)', function () {
			var obj = new _matreshka2.default.Object(),
			    bool = false;

			_matreshkaMagic2.default._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', new _matreshka2.default.Object({
				y: new _matreshka2.default.Object({
					a: {}
				})
			}));

			_matreshkaMagic2.default.trigger(obj.x.y.a, 'someevent');

			expect(bool).toBe(true);
		});
	});
});