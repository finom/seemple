import magic from 'matreshka-magic';

describe("Events core: _addListener, _removeListener, trigger", () => {

	it('fires', () => {
		let obj = {},
			bool = false;
		magic._addListener(obj, 'someevent', evt => bool = true);
		magic.trigger(obj, 'someevent');
		expect(bool).toBe(true);
	});

	it('avoids conflicts', () => {
		let obj = {},
			i = 0;
		magic._addListener(obj, 'someevent', evt => i += 1e0);
		magic._addListener(obj, 'someevent', evt => i += 1e1);
		magic._addListener(obj, 'someevent', evt => i += 1e2);
		magic.trigger(obj, 'someevent');
		expect(i).toEqual(111);
	});

	it('removes (no args)', () => {
		let obj = {},
			bool = false,
			f = evt => bool = true;

		magic._addListener(obj, 'someevent', f);
		magic._removeListener(obj, 'someevent');
		magic.trigger(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes by callback', () => {
		let obj = {},
			bool = false,
			f = evt => bool = true;

		magic._addListener(obj, 'someevent', f);
		magic._removeListener(obj, 'someevent', f);
		magic.trigger(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes by callback but keeps when callbacks are not same', () => {
		let obj = {},
			bool = false,
			f = evt => bool = true;

		magic._addListener(obj, 'someevent', f);
		magic._removeListener(obj, 'someevent', () => {});
		magic.trigger(obj, 'someevent');

		expect(bool).toBe(true);
	});

	it('removes by callback and context', () => {
		let obj = {},
			bool = false,
			f = evt => bool = true,
			ctx = {};

		magic._addListener(obj, 'someevent', f, ctx);
		magic._removeListener(obj, 'someevent', f, ctx);
		magic.trigger(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes by callback but keeps when contexts are not same', () => {
		let obj = {},
			bool = false,
			f = evt => bool = true,
			ctx = {};

		magic._addListener(obj, 'someevent', f, ctx);
		magic._removeListener(obj, 'someevent', f, {});
		magic.trigger(obj, 'someevent');

		expect(bool).toBe(true);
	});

	it('removes by howToRemove (not documented core feature)', () => {
		let obj = {},
			bool = false,
			f = evt => bool = true,
			onData = {
				howToRemove(onData, offData) {
					return offData.x === 42;
				}
			};

		magic._addListener(obj, 'someevent1', f, null, onData);
		magic._removeListener(obj, 'someevent1', null, null, {
			x: 42
		});

		magic.trigger(obj, 'someevent1');

		expect(bool).toBe(false);

		magic._addListener(obj, 'someevent2', f, null, onData);
		magic._removeListener(obj, 'someevent2', null, null, {
			x: 43
		});

		magic.trigger(obj, 'someevent2');

		expect(bool).toBe(true);
	});

});


// change events
// dom events
