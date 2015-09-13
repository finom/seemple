define(['exports', 'magic-prod', 'magic-prod-min'], function (exports, _magicProd, _magicProdMin) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _magic = _interopRequireDefault(_magicProd);

	var _magic2 = _interopRequireDefault(_magicProdMin);

	describe('magic.js and magic.min.js load', function () {
		it('imports AMD modules in ES2015 style from magic.js', function () {
			expect(typeof _magic['default'] == 'object').toBe(true);
		});

		it('imports AMD modules in ES2015 style from magic.min.js', function () {
			expect(typeof _magic2['default'] == 'object').toBe(true);
		});

		it('imports AMD module from magic.js', function (done) {
			require(['magic-prod'], function (magic) {
				expect(typeof magic == 'object').toBe(true);
				done();
			});
		});

		it('imports AMD module from magic.min.js', function (done) {
			require(['magic-prod-min'], function (magic) {
				expect(typeof magic == 'object').toBe(true);
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
				win.module = { exports: {} };
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
				win.module = { exports: {} };
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
					expect(typeof win.MatreshkaMagic == 'object').toBe(true);
					expect(typeof win.magic == 'object').toBe(true);
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
					expect(typeof win.MatreshkaMagic == 'object').toBe(true);
					expect(typeof win.magic == 'object').toBe(true);
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