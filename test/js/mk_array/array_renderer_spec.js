'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

define(['matreshka', 'bquery'], function (_matreshka, _bquery) {
	var _matreshka2 = _interopRequireDefault(_matreshka);

	var _bquery2 = _interopRequireDefault(_bquery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
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
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
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

	var q = function q(s, c) {
		return (0, _bquery2.default)(s, c)[0] || null;
	};

	describe('MK.Array#renderer', function () {
		var n = 10;

		function createArr() {
			var Model = function (_MK$Object) {
				_inherits(Model, _MK$Object);

				function Model(obj) {
					_classCallCheck(this, Model);

					var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Model).call(this));

					_this.jset(obj).on('render', function (evt) {
						return _this.bindNode('x', ':sandbox span', _matreshka2.default.binders.innerHTML());
					});

					return _this;
				}

				return Model;
			}(_matreshka2.default.Object);

			var Arr = function (_MK$Array) {
				_inherits(Arr, _MK$Array);

				function Arr() {
					var _Object$getPrototypeO;

					_classCallCheck(this, Arr);

					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					var _this2 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Arr)).call.apply(_Object$getPrototypeO, [this].concat(args)));

					_this2.Model = Model;

					_this2.bindNode('sandbox', _bquery2.default.create('div', {
						attributes: {
							role: 'parent'
						}
					}));

					return _this2;
				}

				return Arr;
			}(_matreshka2.default.Array);

			return new Arr();
		}

		it('renders', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child" index="' + index++ + '"><span></span></div>';
			};

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			expect(arr.length).toEqual(n);
			expect(index).toEqual(n);
			expect(arr.sandbox.children.length).toEqual(n);
		});
		it('forces rendering', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child" index="' + index++ + '"><span></span></div>';
			};

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.rerender({
				forceRerender: true
			});
			expect(arr.length).toEqual(n);
			expect(index).toEqual(n * 2);
			expect(arr.sandbox.children.length).toEqual(n);
		});
		it('rerenders when renderer is changed', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child" index="' + index++ + '"><span></span></div>';
			};

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.itemRenderer = function () {
				return '<div role="child2" index="' + index++ + '"><span></span></div>';
			};

			expect(arr.length).toEqual(n);
			expect(index).toEqual(n * 2);
			expect(arr.sandbox.children.length).toEqual(n);
		});
		it('rerenders when rendered is changed (forceRerender: false)', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child" index="' + index++ + '"><span></span></div>';
			};

			for (var i = 0; i < n / 2; i++) {
				arr.push({
					x: i
				});
			}

			for (var i = 0; i < n / 2; i++) {
				arr.push_({
					x: i + n / 2
				}, {
					dontRender: true
				});
			}

			arr.set('itemRenderer', function () {
				return '<div role="child2" index="' + index++ + '"><span></span></div>';
			}, {
				forceRerender: false
			});
			expect(arr.length).toEqual(n);
			expect(index).toEqual(n);
			expect(arr.sandbox.children.length).toEqual(n);
		});
		it('removes rendered nodes', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child" index="' + index++ + '"><span></span></div>';
			};

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.recreate();
			expect(arr.length).toEqual(0);
			expect(index).toEqual(n);
			expect(arr.sandbox.children.length).toEqual(0);
		});
		it('renders if silent: true', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child" index="' + index++ + '"><span></span></div>';
			};

			for (var i = 0; i < n; i++) {
				arr.push_({
					x: i
				}, {
					silent: true
				});
			}

			expect(arr.length).toEqual(n);
			expect(index).toEqual(n);
			expect(arr.sandbox.children.length).toEqual(n);
		});
		it('uses bindings parser', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child3" index="' + index++ + '"><span attr="hey {{x}}"></span></div>';
			};

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			expect(q('[attr]', arr[5].sandbox).getAttribute('attr')).toEqual('hey ' + 5);
			expect(arr.length).toEqual(n);
			expect(index).toEqual(n);
			expect(arr.sandbox.children.length).toEqual(n);
		});
		it('wraps invalid renderer with <span>', function () {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return 'Hi there <div><span attr="hey {{x}}" index="' + index++ + '"></span></div>{{x}}';
			};

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			expect(arr.sandbox.children[0].tagName).toEqual('SPAN');
			expect(arr.sandbox.children[1].childNodes.length).toEqual(3);
			expect(arr.sandbox.children[2].childNodes[0].textContent).toEqual('Hi there ');
			expect(arr.sandbox.children[3].childNodes[1].tagName).toEqual('DIV');
			expect(arr.sandbox.children[4].childNodes[2].textContent).toEqual('4');
			expect(arr.length).toEqual(n);
			expect(index).toEqual(n);
			expect(arr.sandbox.children.length);
		});
		it('allows to use selector', function () {
			var arr = createArr();
			arr.sandbox.appendChild(_bquery2.default.create('div', {
				innerHTML: 'Hi there <div><span attr="hey {{x}}"></span></div>{{x}}',
				className: 'item-renderer'
			}));
			arr.itemRenderer = ':sandbox .item-renderer';

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			expect(arr.sandbox.children[0].tagName).toEqual('DIV');
			expect(arr.sandbox.children[1].childNodes[2].textContent).toEqual('0');
			expect(arr.length).toEqual(n);
			expect(arr.sandbox.children.length);
		});
		it('restores from container', function () {
			var arr = createArr(),
			    HTML = '';

			for (var i = 0; i < n; i++) {
				HTML += '<div><span>Hi there</span></div>';
			}

			arr.sandbox.innerHTML = HTML;
			arr.restore();
			expect(arr.length).toEqual(n);
			expect(arr.sandbox.children[0].textContent).toEqual('Hi there');
		});
		it('restores from node with custom selector', function () {
			var arr = createArr(),
			    HTML = '';

			for (var i = 0; i < n; i++) {
				HTML += '<div class="' + (i >= 5 ? 'fit' : 'nope') + '"><span>Hi there</span></div>';
			}

			arr.sandbox.innerHTML = HTML;
			arr.restore(':sandbox .fit');
			expect(arr.length).toEqual(5);
			expect(arr.sandbox.children[0].textContent).toEqual('Hi there');
		});
		it('restores from external node', function () {
			var arr = createArr(),
			    div = _bquery2.default.create('div', {
				className: 'restore-items'
			}),
			    HTML = '';

			for (var i = 0; i < n; i++) {
				HTML += '<div><span>Hi there</span></div>';
			}

			div.innerHTML = HTML;
			document.body.appendChild(div);
			arr.restore('.restore-items > div');
			document.body.removeChild(div);
			expect(arr.length).toEqual(n);
			expect(arr[0].sandbox.textContent).toEqual('Hi there');
		});
		it('sorts', function () {
			var arr = createArr();
			arr.itemRenderer = '<span><span></span></span>';

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.reverse();
			expect(arr.length).toEqual(n);
			expect(arr[0].sandbox.textContent).toEqual(String(n - 1));
			expect(arr[n - 1].sandbox.textContent).toEqual(String(0));
			expect(arr.sandbox.children[0].textContent).toEqual(String(n - 1));
			expect(arr.sandbox.children[n - 1].textContent).toEqual(String(0));
			arr.sort(function (a, b) {
				return a.x > b.x ? 1 : -1;
			});
			expect(arr[0].sandbox.textContent).toEqual(String(0));
			expect(arr[n - 1].sandbox.textContent).toEqual(String(n - 1));
			expect(arr.sandbox.children[0].textContent).toEqual(String(0));
			expect(arr.sandbox.children[n - 1].textContent).toEqual(String(n - 1));
		});
		it('orders by key', function () {
			var arr = createArr();
			arr.itemRenderer = '<span><span></span></span>';

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.orderBy('x', 'desc');
			expect(arr.length).toEqual(n);
			expect(arr[0].sandbox.textContent).toEqual(String(n - 1));
			expect(arr[n - 1].sandbox.textContent).toEqual(String(0));
			expect(arr.sandbox.children[0].textContent).toEqual(String(n - 1));
			expect(arr.sandbox.children[n - 1].textContent).toEqual(String(0));
			arr.orderBy('x', 'asc');
			expect(arr[0].sandbox.textContent).toEqual(String(0));
			expect(arr[n - 1].sandbox.textContent).toEqual(String(n - 1));
			expect(arr.sandbox.children[0].textContent).toEqual(String(0));
			expect(arr.sandbox.children[n - 1].textContent).toEqual(String(n - 1));
		});
		it('unshifts', function () {
			var arr = createArr();
			arr.itemRenderer = '<span><span></span></span>';

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.unshift({
				x: 'foo'
			});
			expect(arr.length).toEqual(n + 1);
			expect(arr[0].sandbox.textContent).toEqual('foo');
		});
		it('pulls pops and unshifts', function () {
			var arr = createArr();
			arr.itemRenderer = '<span><span></span></span>';

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.pull(1);
			expect(arr.length).toEqual(n - 1);
			expect(arr[1].sandbox.textContent).toEqual('2');
			arr.pop();
			expect(arr.length).toEqual(n - 2);
			expect(arr[n - 3].sandbox.textContent).toEqual(String(n - 2));
			arr.shift();
			expect(arr.length).toEqual(n - 3);
			expect(arr[0].sandbox.textContent).toEqual('2');
		});
		it('splices', function () {
			var arr = createArr();
			arr.itemRenderer = '<span><span></span></span>';

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			arr.splice(1, 2, {
				x: 'foo'
			}, {
				x: 'bar'
			});
			expect(arr.length).toEqual(n);
			expect(arr[1].sandbox.textContent).toEqual('foo');
			expect(arr[2].sandbox.textContent).toEqual('bar');
		});
		it('triggers "afterrender" event', function (done) {
			var arr = createArr(),
			    index = 0;

			arr.itemRenderer = function () {
				return '<div role="child"><span></span></div>';
			};

			arr.on('*@afterrender', function (evt) {
				expect(arr.indexOf(evt.self)).toEqual(index++);
				expect(arr.sandbox).toEqual(evt.self.sandbox.parentNode);

				if (index == n) {
					done();
				}
			});

			for (var i = 0; i < n; i++) {
				arr.push({
					x: i
				});
			}

			expect(arr.length).toEqual(n);
		});
	});
});