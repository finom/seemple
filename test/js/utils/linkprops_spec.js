define(['exports', 'matreshka-magic'], function (exports, _matreshkaMagic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	describe('linkProps', function () {
		it('adds simple dependency', function () {
			var obj = {
				a: 1,
				b: 2
			};

			_magic['default'].linkProps(obj, 'c', 'a b', function (a, b) {
				return a + b;
			});

			expect(obj.c).toEqual(3);

			obj.a = 3;

			expect(obj.c).toEqual(5);

			obj.b = 3;

			expect(obj.c).toEqual(6);
		});

		it('adds dependency from another object', function () {
			var obj = {
				a: 1,
				b: 2
			},
			    obj2 = {
				c: 4,
				d: 8
			};

			_magic['default'].linkProps(obj, 'e', [obj, ['a', 'b'], obj2, 'c d'], function (a, b, c, d) {
				return a + b + c + d;
			});

			expect(obj.e).toEqual(15);
		});

		it('doesn\'t sets on init (setOnInit)', function () {
			var obj = {
				a: 1,
				b: 2,
				c: 0
			};

			_magic['default'].linkProps(obj, 'c', 'a b', function (a, b) {
				return a + b;
			}, false);

			expect(obj.c).toEqual(0);
		});

		it('saves from cyclical links', function () {
			var obj = {
				a: 1,
				b: 2,
				c: 3
			};

			_magic['default'].linkProps(obj, 'a', 'b c', function (x, y) {
				return x + y;
			});
			_magic['default'].linkProps(obj, 'b', 'a c', function (x, y) {
				return x + y;
			});
			_magic['default'].linkProps(obj, 'c', 'a b', function (x, y) {
				return x + y;
			});

			expect(obj.a).toEqual(27);
		});

		it('allows deep dependencies', function () {
			var obj = {
				a: { b: { c: 1 } }
			},
			    a = undefined,
			    b = undefined;

			_magic['default'].linkProps(obj, 'd', 'a.b.c', function (c) {
				return c;
			});
			expect(obj.d).toEqual(1);
			obj.a.b.c = 2;
			expect(obj.d).toEqual(2);
			b = obj.a.b;
			obj.a.b = { c: 3 };
			b.c = 'nope';
			expect(obj.d).toEqual(3);
			a = obj.a;
			obj.a = { b: { c: 4 } };
			a.b = { c: 'nope' };
			expect(obj.d).toEqual(4);
		});

		it('allows deep dependencies from another object', function () {
			var obj = {
				a: 1
			},
			    obj2 = {
				b: { c: { d: 2 } }
			};

			_magic['default'].linkProps(obj, 'd', [obj2, 'b.c.d'], function (c) {
				return c * 2;
			});

			expect(obj.d).toEqual(4);
		});
	});
});