'use strict';

define(['magic-prod', 'magic-prod-min'], function (_magicProd, _magicProdMin) {
	var _magicProd2 = _interopRequireDefault(_magicProd);

	var _magicProdMin2 = _interopRequireDefault(_magicProdMin);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	describe('magic.js and magic.min.js load', function () {
		it('imports AMD modules in ES2015 style from magic.js', function () {
			expect((typeof _magicProd2.default === 'undefined' ? 'undefined' : _typeof(_magicProd2.default)) == 'object').toBe(true);
		});
		it('imports AMD modules in ES2015 style from magic.min.js', function () {
			expect((typeof _magicProdMin2.default === 'undefined' ? 'undefined' : _typeof(_magicProdMin2.default)) == 'object').toBe(true);
		});
		it('imports AMD module from magic.js', function (done) {
			require(['magic-prod'], function (magic) {
				expect((typeof magic === 'undefined' ? 'undefined' : _typeof(magic)) == 'object').toBe(true);
				done();
			});
		});
		it('imports AMD module from magic.min.js', function (done) {
			require(['magic-prod-min'], function (magic) {
				expect((typeof magic === 'undefined' ? 'undefined' : _typeof(magic)) == 'object').toBe(true);
				done();
			});
		});
		it('imports CJS module from magic.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("magic-prod") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(typeof win.module.exports.bindNode == 'function').toBe(true);
					document.body.removeChild(iframe);
					done();
				};

				script.src = src;
				win.module = {
					exports: {}
				};
				win.exports = win.module.exports;
				win.document.body.appendChild(script);
			};

			document.body.appendChild(iframe);
		});
		it('imports CJS module from magic.min.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("magic-prod-min") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(typeof win.module.exports.bindNode == 'function').toBe(true);
					document.body.removeChild(iframe);
					done();
				};

				script.src = src;
				win.module = {
					exports: {}
				};
				win.exports = win.module.exports;
				win.document.body.appendChild(script);
			};

			document.body.appendChild(iframe);
		});
		it('loads global variables if there is no CJS or AMD stuff for magic.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("magic-prod") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(_typeof(win.MatreshkaMagic) == 'object').toBe(true);
					expect(_typeof(win.magic) == 'object').toBe(true);
					document.body.removeChild(iframe);
					done();
				};

				script.src = src;
				win.document.body.appendChild(script);
			};

			document.body.appendChild(iframe);
		});
		it('loads global variables if there is no CJS or AMD stuff for magic.min.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("magic-prod-min") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(_typeof(win.MatreshkaMagic) == 'object').toBe(true);
					expect(_typeof(win.magic) == 'object').toBe(true);
					document.body.removeChild(iframe);
					done();
				};

				script.src = src;
				win.document.body.appendChild(script);
			};

			document.body.appendChild(iframe);
		});
	});
});