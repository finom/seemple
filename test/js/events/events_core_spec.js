'use strict';

define(['matreshka-magic', 'matreshka-magic'], function (magic, MK) {
	describe("Events core: _addListener, _removeListener, trigger", function () {
		it('fires', function () {
			var obj = {},
			    bool = false;

			magic._addListener(obj, 'someevent', function (evt) {
				return bool = true;
			});

			magic.trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});
		it('avoids conflicts', function () {
			var obj = {},
			    i = 0;

			magic._addListener(obj, 'someevent', function (evt) {
				return i += 1e0;
			});

			magic._addListener(obj, 'someevent', function (evt) {
				return i += 1e1;
			});

			magic._addListener(obj, 'someevent', function (evt) {
				return i += 1e2;
			});

			magic.trigger(obj, 'someevent');
			expect(i).toEqual(111);
		});
		it('removes (no args)', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			magic._addListener(obj, 'someevent', f);

			magic._removeListener(obj, 'someevent');

			magic.trigger(obj, 'someevent');
			expect(bool).toBe(false);
		});
		it('removes by callback', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			magic._addListener(obj, 'someevent', f);

			magic._removeListener(obj, 'someevent', f);

			magic.trigger(obj, 'someevent');
			expect(bool).toBe(false);
		});
		it('removes by callback but keeps when callbacks are not same', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			magic._addListener(obj, 'someevent', f);

			magic._removeListener(obj, 'someevent', function () {});

			magic.trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});
		it('removes by callback and context', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {};

			magic._addListener(obj, 'someevent', f, ctx);

			magic._removeListener(obj, 'someevent', f, ctx);

			magic.trigger(obj, 'someevent');
			expect(bool).toBe(false);
		});
		it('removes by callback but keeps when contexts are not same', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {};

			magic._addListener(obj, 'someevent', f, ctx);

			magic._removeListener(obj, 'someevent', f, {});

			magic.trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});
		it('removes by howToRemove (not documented core feature)', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    onData = {
				howToRemove: function howToRemove(onData, offData) {
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
});