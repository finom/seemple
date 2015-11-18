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

        setTimeout(function () {
            return document.body.removeChild(document.getElementById('balalaika-test'));
        });

        it('Adds event listener', function () {
            var b = false;
            (0, _$["default"])('#balalaika-test').on('click');
        });
    });
});