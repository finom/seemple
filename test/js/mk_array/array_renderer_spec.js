define(['exports', 'matreshka', 'balalaika'], function (exports, _matreshka, _balalaika) {
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _MK = _interopRequireDefault(_matreshka);

    var _$ = _interopRequireDefault(_balalaika);

    var q = function q(s, c) {
        return (0, _$['default'])(s, c)[0] || null;
    };

    describe('MK.Array#renderer', function () {
        it('renders and removes items of collection', function () {
            var container = _$['default'].create('div', { attributes: { role: 'parent' } }),
                n = 10,
                arr = undefined;

            var Model = (function (_MK$Object) {
                _inherits(Model, _MK$Object);

                function Model() {
                    var _this = this;

                    _classCallCheck(this, Model);

                    _get(Object.getPrototypeOf(Model.prototype), 'constructor', this).call(this);
                    this.on('render', function (evt) {
                        return _this.bindNode('x', 'span', _MK['default'].binders.innerHTML());
                    });
                }

                return Model;
            })(_MK['default'].Object);

            var Arr = (function (_MK$Array) {
                _inherits(Arr, _MK$Array);

                _createClass(Arr, [{
                    key: 'itemRenderer',
                    value: function itemRenderer() {
                        return '<div role="child"><span></span></div>';
                    }
                }, {
                    key: 'Model',
                    get: function get() {
                        return Model;
                    }
                }]);

                function Arr() {
                    _classCallCheck(this, Arr);

                    _get(Object.getPrototypeOf(Arr.prototype), 'constructor', this).call(this);
                    this.bindNode('sandbox', container);
                }

                return Arr;
            })(_MK['default'].Array);

            arr = window.arr = new Arr();

            for (var i = 0; i < n; i++) {
                arr.push({ x: i });
            }

            expect(arr.length).toEqual(n);
            expect(arr.sandbox.children.length).toEqual(n);

            //arr.recreate();

            //expect( arr.length ).toEqual( 0 );
            //expect( arr.sandbox.children.length ).toEqual( 0 );
        });
    });
});