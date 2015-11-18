define(["exports", "balalaika"], function (exports, _balalaika) {
    "use strict";

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

    var _$ = _interopRequireDefault(_balalaika);

    var click = function click(node) {
        var ev = document.createEvent("MouseEvent");
        ev.initMouseEvent("click", true, /* bubble */true, /* cancelable */
        window, null, 0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0, /*left*/null);
        node.dispatchEvent(ev);
    };

    /* TODO:
        Test $ with various values
        Test addClass, removeClass
    */

    describe("Balalaika Events", function () {
        document.body.insertAdjacentHTML('beforeend', "\n        <div id=\"balalaika-test\">\n\n        </div>\n    ");
        var balalaikaTest = document.getElementById('balalaika-test');

        setTimeout(function () {
            return document.body.removeChild(balalaikaTest);
        });

        it('Adds event listener', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            (0, _$["default"])(balalaikaTest).on('click', f);
            click(balalaikaTest);

            expect(bool).toEqual(true);
        });

        it('Removes event listener (listener is specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };
            (0, _$["default"])(balalaikaTest).on('click', f).off('click', f);

            click(balalaikaTest);

            expect(bool).toEqual(false);
        });

        it('Removes event listener (listener is not specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };
            (0, _$["default"])(balalaikaTest).on('click', f).off('click');

            click(balalaikaTest);

            expect(bool).toEqual(false);
        });

        it('Adds namespaced listener', function () {
            var bool = false;
            (0, _$["default"])(balalaikaTest).on('click.yo', function (evt) {
                return bool = true;
            });

            click(balalaikaTest);

            expect(bool).toEqual(true);
        });

        it('Removes namespaced listener (listener is specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };
            (0, _$["default"])(balalaikaTest).on('click.yo', f);
            (0, _$["default"])(balalaikaTest).off('click.yo', f);

            click(balalaikaTest);

            expect(bool).toEqual(false);
        });

        it('Removes namespaced listener (listener is not specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };
            (0, _$["default"])(balalaikaTest).on('click.yo', f);
            (0, _$["default"])(balalaikaTest).off('click.yo');

            click(balalaikaTest);

            expect(bool).toEqual(false);
        });
    });
});