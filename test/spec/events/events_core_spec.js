import addListener from 'src/_events/addlistener';
import removeListener from 'src/_events/removelistener';
import triggerOne from 'src/_events/triggerone';

describe('Events core: addListener, removeListener, triggerOne', () => {
	let obj,
		ctx,
		bool,
		handler;

	beforeEach(() => {
		obj = {};
		ctx = {};
		bool = false;
		handler = () => (bool = true);
	});

	it('fires', () => {
		addListener(obj, 'someevent', handler);
		triggerOne(obj, 'someevent');
		expect(bool).toBe(true);
	});

	it('avoids conflicts', () => {
		let i = 0;
		addListener(obj, 'someevent', () => (i += 1e0));
		addListener(obj, 'someevent', () => (i += 1e1));
		addListener(obj, 'someevent', () => (i += 1e2));
		triggerOne(obj, 'someevent');

		expect(i).toEqual(111);
	});

	it('removes (no args)', () => {
		addListener(obj, 'someevent', handler);
		removeListener(obj);
		triggerOne(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes by name', () => {
		addListener(obj, 'someevent', handler);
		removeListener(obj, 'someevent');
		triggerOne(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes by callback', () => {
		addListener(obj, 'someevent', handler);
		removeListener(obj, 'someevent', handler);
		triggerOne(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes by callback but keeps when callbacks are not same', () => {
		addListener(obj, 'someevent', handler);
		removeListener(obj, 'someevent', () => {});
		triggerOne(obj, 'someevent');

		expect(bool).toBe(true);
	});

	it('removes by callback and context', () => {
		addListener(obj, 'someevent', handler, ctx);
		removeListener(obj, 'someevent', handler, ctx);
		triggerOne(obj, 'someevent');

		expect(bool).toBe(false);
	});

	it('removes by callback but keeps when contexts are not same', () => {
		addListener(obj, 'someevent', handler, ctx);
		removeListener(obj, 'someevent', handler, {});
		triggerOne(obj, 'someevent');

		expect(bool).toBe(true);
	});

	xit('removes by howToRemove (not documented core feature)', () => {
		/*eslint-disable */
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
		/*eslint-enable */
	});
});
