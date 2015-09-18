define(['exports', 'matreshka-magic'], function (exports, _matreshkaMagic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	describe("Events core: _addListener, _removeListener, trigger", function () {

		it('fires', function () {
			var obj = {},
			    bool = false;
			_magic['default']._addListener(obj, 'someevent', function (evt) {
				return bool = true;
			});
			_magic['default'].trigger(obj, 'someevent');
			expect(bool).toBe(true);
		});

		it('avoids conflicts', function () {
			var obj = {},
			    i = 0;
			_magic['default']._addListener(obj, 'someevent', function (evt) {
				return i += 1e0;
			});
			_magic['default']._addListener(obj, 'someevent', function (evt) {
				return i += 1e1;
			});
			_magic['default']._addListener(obj, 'someevent', function (evt) {
				return i += 1e2;
			});
			_magic['default'].trigger(obj, 'someevent');
			expect(i).toEqual(111);
		});

		it('removes (no args)', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			_magic['default']._addListener(obj, 'someevent', f);
			_magic['default']._removeListener(obj, 'someevent');
			_magic['default'].trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});

		it('removes by callback', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			_magic['default']._addListener(obj, 'someevent', f);
			_magic['default']._removeListener(obj, 'someevent', f);
			_magic['default'].trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});

		it('removes by callback but keeps when callbacks are not same', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			};

			_magic['default']._addListener(obj, 'someevent', f);
			_magic['default']._removeListener(obj, 'someevent', function () {});
			_magic['default'].trigger(obj, 'someevent');

			expect(bool).toBe(true);
		});

		it('removes by callback and context', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {};

			_magic['default']._addListener(obj, 'someevent', f, ctx);
			_magic['default']._removeListener(obj, 'someevent', f, ctx);
			_magic['default'].trigger(obj, 'someevent');

			expect(bool).toBe(false);
		});

		it('removes by callback but keeps when contexts are not same', function () {
			var obj = {},
			    bool = false,
			    f = function f(evt) {
				return bool = true;
			},
			    ctx = {};

			_magic['default']._addListener(obj, 'someevent', f, ctx);
			_magic['default']._removeListener(obj, 'someevent', f, {});
			_magic['default'].trigger(obj, 'someevent');

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

			_magic['default']._addListener(obj, 'someevent1', f, null, onData);
			_magic['default']._removeListener(obj, 'someevent1', null, null, {
				x: 42
			});

			_magic['default'].trigger(obj, 'someevent1');

			expect(bool).toBe(false);

			_magic['default']._addListener(obj, 'someevent2', f, null, onData);
			_magic['default']._removeListener(obj, 'someevent2', null, null, {
				x: 43
			});

			_magic['default'].trigger(obj, 'someevent2');

			expect(bool).toBe(true);
		});
	});

	// change events
	// dom events
});