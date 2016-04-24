/*eslint-disable */
xdescribe('Events summary (on, off)', () => {
	let q = (s, c) => {
		let result = $(s, c)[0] || null;
		if (result) {
			result.click = result.click || (() => {
				let ev = document.createEvent("MouseEvent");
				ev.initMouseEvent(
					"click",
					true /* bubble */ , true /* cancelable */ ,
					window, null,
					0, 0, 0, 0, /* coordinates */
					false, false, false, false, /* modifier keys */
					0 /*left*/ , null
				);
				result.dispatchEvent(ev);
			});
		}
		return result;
	}

	let node = document.body.appendChild($.create({
		tagName: 'DIV',
		id: 's-test',
		innerHTML: `
			<div id="s-test-1">
				<div class="s-test-2">

				</div>
			</div>
		`
	}));

	node.click = node.click || function() {
		this.dispatchEvent(new MouseEvent('click'));
	}

	it('fires', () => {
		let obj = {},
			bool = false;
		magic.on(obj, 'someevent', evt => bool = true);
		magic.trigger(obj, 'someevent');
		expect(bool).toBe(true);
	});


	it('fires on Matreshka instance', () => {
		let mk = new MK,
			bool = false;
		mk.on('someevent', evt => bool = true);
		mk.trigger('someevent');
		expect(bool).toBe(true);
	});

	it('removes', () => {
		let obj = {},
			bool = false,
			f = evt => bool = true;

		magic.on(obj, 'someevent', f);
		magic.off(obj, 'someevent');
		magic.trigger(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes on Matreshka instance', () => {
		let mk = new MK,
			bool = false,
			f = evt => bool = true;

		mk.on('someevent', f);
		mk.off('someevent');
		mk.trigger('someevent');

		expect(bool).toBe(false);
	});

	it('fires delegated', () => {
		let obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			bool = false;

		magic.on(obj, 'a.b.c@someevent', evt => bool = true);
		magic.trigger(obj.a.b.c, 'someevent');
		expect(bool).toBe(true);
	});



	it('removes delegated', () => {
		let obj = {
				a: {
					b: {
						c: {}
					}
				}
			},
			bool = false;

		magic.on(obj, 'a.b.c@someevent', evt => bool = true);
		magic.off(obj, 'a.b.c@someevent');

		magic.trigger(obj.a.b.c, 'someevent');
		expect(bool).toBe(false);
	});

	it('fires (no selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode(obj, 'x', '#d-test')
		magic.on(obj, 'click::x', evt => bool = true);


		q('#d-test').click();

		expect(bool).toBe(true);
	});

	it('removes (no selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode(obj, 'x', '#d-test');
		magic.on(obj, 'click::x', evt => bool = true);
		magic.off(obj, 'click::x');

		q('#d-test').click();

		expect(bool).toBe(false);
	});

	it('fires (use selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode(obj, 'x', '#d-test');
		magic.on(obj, 'click::x(.d-test-2)', evt => bool = true);

		q('.d-test-2').click();

		expect(bool).toBe(true);
	});

	it('works with "*" events (MK.Array)', () => {
		let obj = new MK.Array(),
			bool = false;

		magic.on(obj, '@someevent', evt => bool = true);

		obj.push({});

		magic.trigger(obj[0], 'someevent');

		expect(bool).toBe(true);
	});

	it('fires (no selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode(obj, 'x', '#d-test')
		magic.on(obj, 'click::x', evt => bool = true);


		q('#d-test').click();

		expect(bool).toBe(true);
	});

	it('fires (use selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode(obj, 'x', '#d-test')
		magic.on(obj, 'click::x(.d-test-2)', evt => bool = true);

		q('.d-test-2').click();

		expect(bool).toBe(true);
	});

	it('triggers once', () => {
		let obj = {},
			i = 0,
			f = evt => i++;

		magic.once(obj, 'someevent', f);
		magic.trigger(obj, 'someevent');
		magic.trigger(obj, 'someevent');
		magic.trigger(obj, 'someevent');

		expect(i).toBe(1);
	});

	it('allows to pass name-handler object to "once"', () => {
		let obj = {},
			i = 0,
			j = 0,
			f1 = evt => i++,
			f2 = evt => j++;

		magic.once(obj, {
			foo: f1,
			bar: f2
		});

		magic.trigger(obj, 'foo');
		magic.trigger(obj, 'foo');
		magic.trigger(obj, 'foo');

		magic.trigger(obj, 'bar');
		magic.trigger(obj, 'bar');
		magic.trigger(obj, 'bar');

		expect(i).toBe(1);
		expect(j).toBe(1);
	});

	it('triggers once on Matreshka instance', () => {
		let mk = new MK,
			i = 0,
			f = evt => i++;

		mk.once('someevent', f);
		mk.trigger('someevent');
		mk.trigger('someevent');
		mk.trigger('someevent');

		expect(i).toBe(1);
	});


	it('onDebounce works', done => {
		let obj = {},
			i = 0,
			f = evt => i++;

		setTimeout(() => {
			expect(i).toBe(1);
			done();
		}, 200);

		magic.onDebounce(obj, 'someevent', f);
		magic.trigger(obj, 'someevent');
		magic.trigger(obj, 'someevent');
		magic.trigger(obj, 'someevent');
	});

	it('allows to pass name-handler object to "onDebounce"', (done) => {
		let obj = {},
			i = 0,
			j = 0,
			f1 = evt => i++,
			f2 = evt => j++;

		setTimeout(() => {
			expect(i).toBe(1);
			expect(j).toBe(1);
			done();
		}, 200);

		magic.onDebounce(obj, {
			foo: f1,
			bar: f2
		});

		magic.trigger(obj, 'foo');
		magic.trigger(obj, 'foo');
		magic.trigger(obj, 'foo');

		magic.trigger(obj, 'bar');
		magic.trigger(obj, 'bar');
		magic.trigger(obj, 'bar');
	});

	it('onDebounce works on Matreshka instance', done => {
		let mk = new MK,
			i = 0,
			f = evt => i++;

		setTimeout(() => {
			expect(i).toBe(1);
			done();
		}, 800);

		mk.onDebounce('someevent', f);
		mk.trigger('someevent');
		mk.trigger('someevent');
		mk.trigger('someevent');
	});


	it('allows to pass name-handler object to "on" and "off"', () => {
		let obj = {},
			bool = false,
			i = 0,
			handlers = {
				foo: () => i++,
				bar: () => i++
			};

		MK.on(obj, handlers);

		MK.trigger(obj, 'foo');
		MK.trigger(obj, 'bar');

		expect(i).toBe(2);

		MK.off(obj, handlers);

		expect(i).toBe(2);
	});


	it('allows to flip context and triggerOnInit (on)', () => {
		let obj = {},
			thisArg = {},
			bool = false,
			i = 0;

		MK.on(obj, 'foo', function() {
			expect(this).toEqual(thisArg);
			i++;
		}, true, thisArg);

		MK.on(obj, 'bar', function() {
			expect(this).toEqual(thisArg);
			i++;
		}, thisArg, true);

		expect(i).toBe(2);
	});

});
