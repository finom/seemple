define(["exports", "matreshka_magic", "balalaika"], function (exports, _matreshka_magic, _balalaika) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var magic = _interopRequire(_matreshka_magic);

	var $ = _interopRequire(_balalaika);

	var q = function (s, c) {
		return $(s, c)[0] || null;
	};

	var bindInput = function (obj, key) {
		var input = $.create("input");
		magic.bindNode(obj, key, input, {
			on: function on(cbc) {
				this._onkeyup = cbc;
			},
			getValue: function getValue() {
				return this.value;
			},
			setValue: function setValue(v) {
				this.value = v;
			}
		});

		return input;
	};
	describe("Bindings", function () {
		it("should bind", function () {
			var obj = {},
			    input = bindInput(obj, "x");

			obj.x = "foo";
			expect(input.value).toEqual("foo");
			input.value = "bar";
			input._onkeyup({});
			expect(obj.x).toEqual("bar");
		});

		it("should unbind", function () {
			var obj = {},
			    input = bindInput(obj, "x");

			magic.unbindNode(obj, "x", input);

			obj.x = "foo";
			expect(input.value).toEqual("");
			input.value = "bar";
			input._onkeyup({});
			expect(obj.x).toEqual("foo");
		});

		it("should bind delegated target", function () {
			var obj = { x: { y: {} } },
			    input = bindInput(obj, "x.y.z");

			obj.x.y.z = "foo";
			expect(input.value).toEqual("foo");
			input.value = "bar";
			input._onkeyup({});
			expect(obj.x.y.z).toEqual("bar");
		});

		it("should unbind delegated target", function () {
			var obj = { x: { y: {} } },
			    input = bindInput(obj, "x.y.z");

			magic.unbindNode(obj, "x.y.z", input);

			obj.x.y.z = "foo";
			expect(input.value).toEqual("");
			input.value = "bar";
			input._onkeyup({});
			expect(obj.x.y.z).toEqual("foo");
		});

		it("should rebind delegated target", function () {
			var obj = { x: { y: {} } },
			    input = bindInput(obj, "x.y.z");

			obj.x = { y: { z: "foo" } };
			expect(input.value).toEqual("foo");
			input.value = "bar";
			input._onkeyup({});
			expect(obj.x.y.z).toEqual("bar");
		});

		it("should remove binding if delegated target is reassigned", function () {
			var obj = { x: { y: {} } },
			    input = bindInput(obj, "x.y.z"),
			    x = obj.x;

			obj.x = { y: { z: "foo" } };

			input.value = "bar";
			input._onkeyup({});
			expect(x.y.z).not.toEqual("bar");
			expect(obj.x.y.z).toEqual("bar");
		});
	});
});