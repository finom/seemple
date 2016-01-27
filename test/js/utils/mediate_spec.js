'use strict';

define(['matreshka-magic', 'matreshka'], function (_matreshkaMagic, _matreshka) {
	var _matreshkaMagic2 = _interopRequireDefault(_matreshkaMagic);

	var _matreshka2 = _interopRequireDefault(_matreshka);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _toConsumableArray(arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
				arr2[i] = arr[i];
			}

			return arr2;
		} else {
			return Array.from(arr);
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	describe('mediate', function () {
		it('mediates', function () {
			var obj = {};

			_matreshkaMagic2.default.mediate(obj, 'a', function (v) {
				return Number(v);
			});

			_matreshkaMagic2.default.mediate(obj, 'b c', function (v) {
				return Number(v);
			});

			obj.a = obj.b = obj.c = '123';
			expect(_typeof(obj.a)).toEqual('number');
			expect(_typeof(obj.b)).toEqual('number');
			expect(_typeof(obj.c)).toEqual('number');
		});
		it('mediates via Matreshka instance', function () {
			var mk = new _matreshka2.default();
			mk.mediate('a', function (v) {
				return Number(v);
			});
			mk.mediate('b c', function (v) {
				return Number(v);
			});
			mk.a = mk.b = mk.c = '123';
			expect(_typeof(mk.a)).toEqual('number');
			expect(_typeof(mk.b)).toEqual('number');
			expect(_typeof(mk.c)).toEqual('number');
		});
		it('mediates key-value object', function () {
			var obj = {};

			_matreshkaMagic2.default.mediate(obj, {
				a: function a(v) {
					return Number(v);
				},
				b: function b(v) {
					return Number(v);
				}
			});

			obj.a = obj.b = '123';
			expect(_typeof(obj.a)).toEqual('number');
			expect(_typeof(obj.b)).toEqual('number');
		});
		it('sets class for a property', function () {
			var obj = {
				x: {
					a: 42
				}
			};

			var X = function X(data) {
				_classCallCheck(this, X);

				_matreshkaMagic2.default.extend(this, data);
			};

			;

			_matreshkaMagic2.default.setClassFor(obj, 'x', X);

			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.a).toEqual(42);
		});
		it('sets class for a property via Matreshka instance method', function () {
			var mk = new _matreshka2.default();
			mk.x = {
				a: 42
			};

			var X = function X(data) {
				_classCallCheck(this, X);

				_matreshkaMagic2.default.extend(this, data);
			};

			;
			mk.setClassFor('x', X);
			expect(mk.x.constructor).toEqual(X);
			expect(mk.x.a).toEqual(42);
		});
		it('sets class for a property passing key-value object', function () {
			var obj = {
				x: {
					a: 1
				},
				y: {
					b: 2
				}
			};

			var X = function X(data) {
				_classCallCheck(this, X);

				_matreshkaMagic2.default.extend(this, data);
			};

			;

			var Y = function Y(data) {
				_classCallCheck(this, Y);

				_matreshkaMagic2.default.extend(this, data);
			};

			;

			_matreshkaMagic2.default.setClassFor(obj, {
				x: X,
				y: Y
			});

			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.a).toEqual(1);
			expect(obj.y.constructor).toEqual(Y);
			expect(obj.y.b).toEqual(2);
		});
		it('sets class for a property (trying to rewrite)', function () {
			var obj = {},
			    x = undefined;

			var X = function X() {
				_classCallCheck(this, X);
			};

			;

			_matreshkaMagic2.default.setClassFor(obj, 'x', X);

			x = obj.x;
			obj.x = {
				a: 42
			};
			expect(obj.x).toEqual(x);
			expect(obj.x.a).toEqual(42);
		});
		it('sets MK.Object class for a property', function () {
			var obj = {
				x: {
					a: 42
				}
			};

			var X = function (_MK$Object) {
				_inherits(X, _MK$Object);

				function X(data) {
					_classCallCheck(this, X);

					return _possibleConstructorReturn(this, Object.getPrototypeOf(X).call(this, data));
				}

				return X;
			}(_matreshka2.default.Object);

			;

			_matreshkaMagic2.default.setClassFor(obj, 'x', X);

			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.a).toEqual(42);
			obj.x = {
				b: 1,
				c: 2
			};
			expect(obj.x.keys()).toEqual(['b', 'c']);
		});
		it('sets MK.Array class for a property', function () {
			var obj = {
				x: [1, 2, 3, 4, 5]
			};

			var X = function (_MK$Array) {
				_inherits(X, _MK$Array);

				function X(data) {
					var _Object$getPrototypeO;

					_classCallCheck(this, X);

					return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(X)).call.apply(_Object$getPrototypeO, [this].concat(_toConsumableArray(data))));
				}

				return X;
			}(_matreshka2.default.Array);

			;

			_matreshkaMagic2.default.setClassFor(obj, 'x', X);

			expect(obj.x.constructor).toEqual(X);
			expect(obj.x.toArray()).toEqual([1, 2, 3, 4, 5]);
			obj.x = [6, 7, 8, 9, 0];
			expect(obj.x.toArray()).toEqual([6, 7, 8, 9, 0]);
		});
	});
});