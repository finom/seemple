"use strict";

define(['bquery'], function ($) {
    var click = function click(node) {
        var ev = document.createEvent("MouseEvent");
        ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
        node.dispatchEvent(ev);
    };

    describe("bQuery Events", function () {
        document.body.appendChild($.create('div', {
            id: 'bquery-test',
            innerHTML: "\n        <div class=\"child1\">\n            <div class=\"grandchild1\"></div>\n        </div>\n        <div class=\"child2\"></div>"
        }));
        var parent = document.getElementById('bquery-test'),
            child1 = parent.querySelector('.child1'),
            child2 = parent.querySelector('.child2'),
            grandchild1 = parent.querySelector('.grandchild1');
        it('Adds event listener', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', f);
            click(parent);
            expect(bool).toEqual(true);
        });
        it('Removes event listener (listener is specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', f).off('click', f);
            click(parent);
            expect(bool).toEqual(false);
        });
        it('Removes event listener (listener is not specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', f).off('click');
            click(parent);
            expect(bool).toEqual(false);
        });
        it('Adds namespaced listener', function () {
            var bool = false;
            $(parent).on('click.yo', function (evt) {
                return bool = true;
            });
            click(parent);
            expect(bool).toEqual(true);
            $(parent).off('click.yo');
        });
        it('Removes namespaced listener (listener is specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click.yo', f);
            $(parent).off('click.yo', f);
            click(parent);
            expect(bool).toEqual(false);
        });
        it('Removes namespaced listener (listener is not specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click.yo', f);
            $(parent).off('click.yo');
            click(parent);
            expect(bool).toEqual(false);
        });
        it('Adds bubbling event listener', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', f);
            click(grandchild1);
            expect(bool).toEqual(true);
            $(parent).off('click', f);
        });
        it('Adds delegated event listener', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', '.child1', f);
            click(child1);
            expect(bool).toEqual(true);
            $(parent).off('click', '.child1', f);
        });
        it('Adds delegated event listener (click on grandchildren)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', '.child1', f);
            click(grandchild1);
            expect(bool).toEqual(true);
            $(parent).off('click', '.child1', f);
        });
        it('Doesn\t trigger when clicked on wrong child', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', '.child1', f);
            click(child2);
            expect(bool).toEqual(false);
        });
        it('Removes delegated event listener (selector and handler are specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', '.child1', f);
            $(parent).off('click', '.child1', f);
            click(child1);
            expect(bool).toEqual(false);
        });
        it('Removes delegated event listener (selector is specified, handler is not specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', '.child1', f);
            $(parent).off('click', '.child1');
            click(child1);
            expect(bool).toEqual(false);
        });
        it('Removes delegated event listener (selector is not specified, handler is specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', '.child1', f);
            $(parent).off('click', f);
            click(child1);
            expect(bool).toEqual(false);
        });
        it('Removes delegated event listener (selector and handler are not specified)', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            };

            $(parent).on('click', '.child1', f);
            $(parent).off('click');
            click(child1);
            expect(bool).toEqual(false);
        });
        it('Stops propagation', function () {
            var bool = false,
                f = function f(evt) {
                return bool = true;
            },
                f2 = function f2(evt) {
                return evt.stopPropagation();
            };

            $(parent).on('click', f);
            $(child1).on('click', f2);
            click(child1);
            expect(bool).toEqual(false);
            $(child1).off('click');
            $(parent).off('click');
        });
    });
});