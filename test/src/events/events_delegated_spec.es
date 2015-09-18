import magic from 'matreshka-magic';
import MK from 'matreshka';

describe('Delegated events: _delegateListener, _undelegateListener', () => {
	it('fires (a.b)', () => {
		let bool = false,
			f = evt => bool = true,
			obj = {
				a: {
					b: {}
				}
			};

		magic._delegateListener(obj, 'a.b', 'someevent', f);
		magic.trigger(obj.a.b, 'someevent');

		expect(bool).toBe(true);
	});

	it('fires (a.b.c)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('fires when reassigned (a.b, reassign a)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('fires when reassigned (a.b, reassign b)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('fires when reassigned (a.b.c, reassign a)', () => {

		let bool = false,
			f = evt => bool = true,
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

	it('fires when reassigned (a.b.c, reassign b)', () => {

		let bool = false,
			f = evt => bool = true,
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

	it('fires when reassigned (a.b.c, reassign c)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('remove event from old target when reassigned (a.b, reassign a)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('remove event from old target when reassigned (a.b, reassign b)', () => {
		let bool = false,
			f = evt => bool = true,
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


	it('remove event from old target when reassigned (a.b.c, reassign a)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('remove event from old target when reassigned (a.b.c, reassign b)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('remove event from old target when reassigned (a.b.c, reassign c)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('undelegate (a.b)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('undelegate (a.b.c)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('doesn\'t remove change event when undelegate (a.b.c)', () => {
		let bool = false,
			f = evt => bool = true,
			obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

		magic._delegateListener(obj, 'a.b.c', 'someevent', () => {});
		magic._delegateListener(obj, 'a.b', 'change:c', f);
		magic._undelegateListener(obj, 'a.b.c', 'someevent');
		obj.a.b.c = 55;


		expect(bool).toBe(true);
	});

	it('undelegate by callback (a.b)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('undelegate by callback (a.b.c)', () => {
		let bool = false,
			f = evt => bool = true,
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


	it('undelegate by callback and context (a.b)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('undelegate by callback and context (a.b.c)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('undelegate by callback but keeps when callbacks are not same (a.b)', () => {
		let bool = false,
			f = evt => bool = true,
			obj = {
				a: {
					b: {}
				}
			};

		magic._delegateListener(obj, 'a.b', 'someevent', f);
		magic._undelegateListener(obj, 'a.b', 'someevent', () => {});

		magic.trigger(obj.a.b, 'someevent');

		expect(bool).toBe(true);
	});

	it('undelegate by callback but keeps when callbacks are not same (a.b.c)', () => {
		let bool = false,
			f = evt => bool = true,
			obj = {
				a: {
					b: {
						c: {}
					}
				}
			};

		magic._delegateListener(obj, 'a.b.c', 'someevent', f);
		magic._undelegateListener(obj, 'a.b.c', 'someevent', () => {});

		magic.trigger(obj.a.b.c, 'someevent');

		expect(bool).toBe(true);
	});

	it('undelegate by callback but keeps when contexts are not same (a.b)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('undelegate by callback but keeps when contexts are not same (a.b.c)', () => {
		let bool = false,
			f = evt => bool = true,
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

	it('uses correct context for delegated events', () => {
		let bool = false,
			obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			ctx = {};

		magic._delegateListener(obj, 'a.b.c', 'someevent', function(evt) {
			bool = this === ctx
		}, ctx);

		magic.trigger(obj.a.b.c, 'someevent');

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Array)', () => {
		let obj = new MK.Array(),
			bool = false;

		magic._delegateListener(obj, '*', 'someevent', evt => bool = true);

		obj.push({});

		magic.trigger(obj[0], 'someevent');

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Object)', () => {
		let obj = new MK.Object(),
			bool = false;

		magic._delegateListener(obj, '*', 'someevent', evt => bool = true);

		obj.jset('x', {});

		magic.trigger(obj.x, 'someevent');

		expect(bool).toBe(true);
	});

	it('removes "*" events (MK.Array)', () => {
		let obj = new MK.Array(),
			bool = false;

		magic._delegateListener(obj, '*', 'someevent', evt => bool = true);

		obj.push({});

		magic._undelegateListener(obj, '*', 'someevent');

		magic.trigger(obj[0], 'someevent');

		expect(bool).toBe(false);
	});

	it('removes "*" events (MK.Object)', () => {
		let obj = new MK.Object(),
			bool = false;

		magic._delegateListener(obj, '*', 'someevent', evt => bool = true);

		obj.jset('x', {});

		magic._undelegateListener(obj, '*', 'someevent');

		magic.trigger(obj.x, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes "*" events using callback (MK.Array)', () => {
		let obj = new MK.Array(),
			bool = false,
			callback = evt => bool = true;

		magic._delegateListener(obj, '*', 'someevent', callback);

		obj.push({});

		magic._undelegateListener(obj, '*', 'someevent', callback);

		magic.trigger(obj[0], 'someevent');

		expect(bool).toBe(false);
	});

	it('removes "*" events using callback (MK.Object)', () => {
		let obj = new MK.Object(),
			bool = false,
			callback = evt => bool = true;

		magic._delegateListener(obj, '*', 'someevent', callback);

		obj.jset('x', {});

		magic._undelegateListener(obj, '*', 'someevent', callback);

		magic.trigger(obj.x, 'someevent');

		expect(bool).toBe(false);
	});

	it('works with "*" events (MK.Array), go deeper (*.a)', () => {
		let obj = new MK.Array(),
			bool = false;

		magic._delegateListener(obj, '*.a', 'someevent', evt => bool = true);

		obj.push({
			a: {}
		});

		magic.trigger(obj[0].a, 'someevent');

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Object), go deeper (*.a)', () => {
		let obj = new MK.Object(),
			bool = false;

		magic._delegateListener(obj, '*.a', 'someevent', evt => bool = true);

		obj.jset('x', {
			a: {}
		});

		magic.trigger(obj.x.a, 'someevent');

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Array), go deeper (*.*)', () => {
		let obj = new MK.Array(),
			bool = false;

		magic._delegateListener(obj, '*.*', 'someevent', evt => bool = true);

		obj.push(new MK.Array({}));

		magic.trigger(obj[0][0], 'someevent');

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Object), go deeper (*.*)', () => {
		let obj = new MK.Object(),
			bool = false;

		magic._delegateListener(obj, '*.*', 'someevent', evt => bool = true);

		obj.jset('x', new MK.Object({
			a: {}
		}));

		magic.trigger(obj.x.a, 'someevent');

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Array), go deeper (*.*.a)', () => {
		let obj = new MK.Array(),
			bool = false;

		magic._delegateListener(obj, '*.*.a', 'someevent', evt => bool = true);

		obj.push(new MK.Array({
			a: {}
		}));

		magic.trigger(obj[0][0].a, 'someevent');

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Object), go deeper (*.*.a)', () => {
		let obj = new MK.Object(),
			bool = false;

		magic._delegateListener(obj, '*.*.a', 'someevent', evt => bool = true);

		obj.jset('x', new MK.Object({
			y: new MK.Object({
				a: {}
			})
		}));

		magic.trigger(obj.x.y.a, 'someevent');

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