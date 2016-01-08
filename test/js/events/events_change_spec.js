'use strict';

define(['matreshka-magic'], function (_matreshkaMagic) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	describe("Change event", function () {
		it('fires (x)', function () {
			var obj = {
				x: 1
			},
			    bool = false;

			_matreshkaMagic2.default._addListener(obj, 'change:x', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a', 'change:x', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'change:x', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'change:x', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e11;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e10;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e9;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a.b', 'change:c', function (evt) {
				return i += 1e8;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e7;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e6;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'change:x', function (evt) {
				return i += 1e5;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e4;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e3;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e2;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a', 'change:b', function (evt) {
				return i += 1e1;
			});

			_matreshkaMagic2.default._delegateListener(obj, 'a', 'change:b', function (evt) {
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

			_matreshkaMagic2.default._delegateListener(obj, 'a.b.c', 'someevent', function (evt) {
				return bool = true;
			});

			obj.a.b = null;
			expect(bool).toBe(false);
		});
	});
});