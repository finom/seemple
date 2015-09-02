define(['exports', 'matreshka-magic'], function (exports, _matreshkaMagic) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_matreshkaMagic);

	describe("Change event", function () {
		it('fires (x)', function () {
			var obj = {
				x: 1
			},
			    bool = false;

			_magic['default']._addListener(obj, 'change:x', function (evt) {
				return bool = true;
			});

			obj.x = 2;

			expect(bool).toBe(true);
		});

		it('fires (delegated, a.x)', function () {
			var obj = {
				a: {
					x: 1
				}
			},
			    bool = false;

			_magic['default']._delegateListener(obj, 'a', 'change:x', function (evt) {
				return bool = true;
			});

			obj.a.x = 2;

			expect(bool).toBe(true);
		});

		it('fires (delegated, a.b.x)', function () {
			var obj = {
				a: {
					b: {
						x: 1
					}
				}
			},
			    bool = false;

			_magic['default']._delegateListener(obj, 'a.b', 'change:x', function (evt) {
				return bool = true;
			});

			obj.a.b.x = 2;

			expect(bool).toBe(true);
		});

		it('fires (delegated, a.b.x)', function () {
			var obj = {
				a: {
					b: {
						x: 1
					}
				}
			},
			    bool = false;

			_magic['default']._delegateListener(obj, 'a.b', 'change:x', function (evt) {
				return bool = true;
			});

			obj.a.b.x = 2;

			expect(bool).toBe(true);
		});

		it('fires when delegated target is reassigned (a.b.c.x, reassign a)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;

			_magic['default']._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return bool = true;
			});
			obj.a = {
				b: {
					c: {
						x: 2
					}
				}
			};

			expect(bool).toBe(true);
		});

		it('fires when delegated target is reassigned (a.b.c.x, reassign b)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;

			_magic['default']._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return bool = true;
			});
			obj.a.b = {
				c: {
					x: 2
				}
			};

			expect(bool).toBe(true);
		});

		it('fires when delegated target is reassigned (a.b.c.x, reassign c)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;

			_magic['default']._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return bool = true;
			});
			obj.a.b.c = {
				x: 2
			};

			expect(bool).toBe(true);
		});

		it('avoids conflicts', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    i = 0;

			_magic['default']._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e11;
			});
			_magic['default']._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e10;
			});
			_magic['default']._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e9;
			});
			_magic['default']._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e8;
			});
			_magic['default']._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e7;
			});
			_magic['default']._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e6;
			});
			_magic['default']._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e5;
			});
			_magic['default']._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e4;
			});
			_magic['default']._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e3;
			});
			_magic['default']._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e2;
			});
			_magic['default']._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e1;
			});
			_magic['default']._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e0;
			});
			obj.a = {
				b: {
					c: {
						x: 2
					}
				}
			};
			expect(i).toEqual(111111111111);
		});

		it('accepts null target (a.b.c, reassign b)', function () {
			var obj = {
				a: {
					b: {
						c: {
							x: 1
						}
					}
				}
			},
			    bool = false;

			_magic['default']._delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
				return bool = true;
			});

			obj.a.b = null;

			expect(bool).toBe(false);
		});
	});
});