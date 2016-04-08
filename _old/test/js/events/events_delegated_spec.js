'use strict';

define(['matreshka-magic', 'matreshka'], function (magic, MK) {
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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a = {
				b: {}
			};
			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a.b = {};
			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a = {
				b: {
					c: {}
				}
			};
			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b = {
				c: {}
			};
			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b.c = {};
			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a = {
				b: {}
			};
			magic.trigger(a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			obj.a.b = {};
			magic.trigger(b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a = {
				b: {
					c: {}
				}
			};
			magic.trigger(a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b = {
				c: {}
			};
			magic.trigger(b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			obj.a.b.c = {};
			magic.trigger(c, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			magic._undelegateListener(obj, 'a.b', 'someevent');

			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			magic._undelegateListener(obj, 'a.b.c', 'someevent');

			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', function () {});

			magic._delegateListener(obj, 'a.b', 'change:c', f);

			magic._undelegateListener(obj, 'a.b.c', 'someevent');

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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			magic._undelegateListener(obj, 'a.b', 'someevent', f);

			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			magic._undelegateListener(obj, 'a.b.c', 'someevent', f);

			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f, ctx);

			magic._undelegateListener(obj, 'a.b', 'someevent', f, ctx);

			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f, ctx);

			magic._undelegateListener(obj, 'a.b.c', 'someevent', f, ctx);

			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f);

			magic._undelegateListener(obj, 'a.b', 'someevent', function () {});

			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f);

			magic._undelegateListener(obj, 'a.b.c', 'someevent', function () {});

			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b', 'someevent', f, {});

			magic._undelegateListener(obj, 'a.b', 'someevent', f, {});

			magic.trigger(obj.a.b, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', f, {});

			magic._undelegateListener(obj, 'a.b.c', 'someevent', f, {});

			magic.trigger(obj.a.b.c, 'someevent');
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

			magic._delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
				bool = this === ctx;
			}, ctx);

			magic.trigger(obj.a.b.c, 'someevent');
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;

			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({});
			magic.trigger(obj[0], 'someevent');
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false;

			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {});
			magic.trigger(obj.x, 'someevent');
			expect(bool).toBe(true);
		});
		it('removes "*" events (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false;

			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({});

			magic._undelegateListener(obj, '*', 'someevent');

			magic.trigger(obj[0], 'someevent');
			expect(bool).toBe(false);
		});
		it('removes "*" events (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false;

			magic._delegateListener(obj, '*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {});

			magic._undelegateListener(obj, '*', 'someevent');

			magic.trigger(obj.x, 'someevent');
			expect(bool).toBe(false);
		});
		it('removes "*" events using callback (MK.Array)', function () {
			var obj = new MK.Array(),
			    bool = false,
			    callback = function callback(evt) {
				return bool = true;
			};

			magic._delegateListener(obj, '*', 'someevent', callback);

			obj.push({});

			magic._undelegateListener(obj, '*', 'someevent', callback);

			magic.trigger(obj[0], 'someevent');
			expect(bool).toBe(false);
		});
		it('removes "*" events using callback (MK.Object)', function () {
			var obj = new MK.Object(),
			    bool = false,
			    callback = function callback(evt) {
				return bool = true;
			};

			magic._delegateListener(obj, '*', 'someevent', callback);

			obj.jset('x', {});

			magic._undelegateListener(obj, '*', 'someevent', callback);

			magic.trigger(obj.x, 'someevent');
			expect(bool).toBe(false);
		});
		it('works with "*" events (MK.Array), go deeper (*.a)', function () {
			var obj = new MK.Array(),
			    bool = false;

			magic._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push({
				a: {}
			});
			magic.trigger(obj[0].a, 'someevent');
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object), go deeper (*.a)', function () {
			var obj = new MK.Object(),
			    bool = false;

			magic._delegateListener(obj, '*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', {
				a: {}
			});
			magic.trigger(obj.x.a, 'someevent');
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Array), go deeper (*.*)', function () {
			var obj = new MK.Array(),
			    bool = false;

			magic._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push(new MK.Array({}));
			magic.trigger(obj[0][0], 'someevent');
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object), go deeper (*.*)', function () {
			var obj = new MK.Object(),
			    bool = false;

			magic._delegateListener(obj, '*.*', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', new MK.Object({
				a: {}
			}));
			magic.trigger(obj.x.a, 'someevent');
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Array), go deeper (*.*.a)', function () {
			var obj = new MK.Array(),
			    bool = false;

			magic._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.push(new MK.Array({
				a: {}
			}));
			magic.trigger(obj[0][0].a, 'someevent');
			expect(bool).toBe(true);
		});
		it('works with "*" events (MK.Object), go deeper (*.*.a)', function () {
			var obj = new MK.Object(),
			    bool = false;

			magic._delegateListener(obj, '*.*.a', 'someevent', function (evt) {
				return bool = true;
			});

			obj.jset('x', new MK.Object({
				y: new MK.Object({
					a: {}
				})
			}));
			magic.trigger(obj.x.y.a, 'someevent');
			expect(bool).toBe(true);
		});
	});
});
