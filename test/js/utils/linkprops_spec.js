'use strict';

define(['matreshka-magic', 'matreshka'], function (_matreshkaMagic, _matreshka) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	var _matreshka2 = _interopRequireDefault(_matreshka);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe('linkProps', function () {
		it('adds simple dependency', function () {
			var obj = {
				a: 1,
				b: 2
			};

			_matreshkaMagic2.default.linkProps(obj, 'c', 'a b', function (a, b) {
				return a + b;
			});

			expect(obj.c).toEqual(3);
			obj.a = 3;
			expect(obj.c).toEqual(5);
			obj.b = 3;
			expect(obj.c).toEqual(6);
		});
		it('adds simple dependency via Matreshka instance method', function () {
			var mk = new _matreshka2.default();
			mk.a = 1;
			mk.b = 2;
			mk.linkProps('c', 'a b', function (a, b) {
				return a + b;
			});
			expect(mk.c).toEqual(3);
			mk.a = 3;
			expect(mk.c).toEqual(5);
			mk.b = 3;
			expect(mk.c).toEqual(6);
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

			_matreshkaMagic2.default.linkProps(obj, 'e', [obj, ['a', 'b'], obj2, 'c d'], function (a, b, c, d) {
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

			_matreshkaMagic2.default.linkProps(obj, 'c', 'a b', function (a, b) {
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

			_matreshkaMagic2.default.linkProps(obj, 'a', 'b c', function (x, y) {
				return x + y;
			});

			_matreshkaMagic2.default.linkProps(obj, 'b', 'a c', function (x, y) {
				return x + y;
			});

			_matreshkaMagic2.default.linkProps(obj, 'c', 'a b', function (x, y) {
				return x + y;
			});

			expect(obj.a).toEqual(27);
		});
		it('allows deep dependencies', function () {
			var obj = {
				a: {
					b: {
						c: 1
					}
				}
			},
			    a = undefined,
			    b = undefined;

			_matreshkaMagic2.default.linkProps(obj, 'd', 'a.b.c', function (c) {
				return c;
			});

			expect(obj.d).toEqual(1);
			obj.a.b.c = 2;
			expect(obj.d).toEqual(2);
			b = obj.a.b;
			obj.a.b = {
				c: 3
			};
			b.c = 'nope';
			expect(obj.d).toEqual(3);
			a = obj.a;
			obj.a = {
				b: {
					c: 4
				}
			};
			a.b = {
				c: 'nope'
			};
			expect(obj.d).toEqual(4);
		});
		it('allows deep dependencies from another object', function () {
			var obj = {
				a: 1
			},
			    obj2 = {
				b: {
					c: {
						d: 2
					}
				}
			};

			_matreshkaMagic2.default.linkProps(obj, 'd', [obj2, 'b.c.d'], function (c) {
				return c * 2;
			});

			expect(obj.d).toEqual(4);
		});
		it('uses event options', function () {
			var obj = {},
			    i = 0;

			_matreshkaMagic2.default.linkProps(obj, 'c', 'a b', function (a, b) {
				return a + b;
			}, {
				foo: 'bar'
			});

			_matreshkaMagic2.default.on(obj, 'change:c', function (evt) {
				expect(evt.foo).toEqual('bar');
			});

			obj.a = 2;
			obj.b = 3;
		});
		it('uses silent: true in event options', function () {
			var obj = {},
			    i = 0;

			_matreshkaMagic2.default.on(obj, 'change:c', function (evt) {
				i++;
			});

			_matreshkaMagic2.default.linkProps(obj, 'c', 'a b', function (a, b) {
				return a + b;
			}, {
				silent: true
			});

			obj.a = 2;
			obj.b = 3;
			expect(i).toEqual(0);
		});
		it('allows to debounce handler', function (done) {
			var obj = {
				a: 1,
				b: 2
			},
			    i = 0;

			_matreshkaMagic2.default.on(obj, 'change:c', function (evt) {
				expect(obj.c).toEqual(5);
			});

			_matreshkaMagic2.default.linkProps(obj, 'c', 'a b', function (a, b) {
				i++;
				return a + b;
			}, {
				debounce: true
			});

			obj.a = 2;
			obj.b = 3;
			setTimeout(function () {
				expect(i).toEqual(1);
				done();
			}, 400);
		});
	});
});