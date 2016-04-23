/*eslint-disable */
xdescribe('Delegated events: delegateListener, undelegateListener (Matreshka.Object and Matreshka.Array)', function() {
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
});
