define(['exports', 'matreshka-prod', 'matreshka-prod-min'], function (exports, _matreshkaProd, _matreshkaProdMin) {
	'use strict';

	describe('matreshka.js and matreshka.min.js load', function () {
		it('imports AMD modules in ES2015 style from matreshka.js', function () {
			expect(typeof _matreshkaProd.Matreshka == 'function').toBe(true);
			expect(typeof _matreshkaProd.$b == 'function').toBe(true);
			expect(typeof _matreshkaProd.Class == 'function').toBe(true);
		});

		it('imports AMD modules in ES2015 style from matreshka.min.js', function () {
			expect(typeof _matreshkaProdMin.Matreshka == 'function').toBe(true);
			expect(typeof _matreshkaProdMin.$b == 'function').toBe(true);
			expect(typeof _matreshkaProdMin.Class == 'function').toBe(true);
		});

		it('imports AMD module from matreshka.js', function (done) {
			require(['matreshka-prod'], function (Matreshka) {
				expect(typeof Matreshka == 'function').toBe(true);
				done();
			});
		});

		it('imports AMD module from matreshka.min.js', function (done) {
			require(['matreshka-prod-min'], function (Matreshka) {
				expect(typeof Matreshka == 'function').toBe(true);
				done();
			});
		});

		it('imports CJS module from matreshka.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("matreshka-prod") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(typeof win.module.exports.Matreshka == 'function').toBe(true);
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

		it('imports CJS module from matreshka.min.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("matreshka-prod-min") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(typeof win.module.exports.Matreshka == 'function').toBe(true);
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

		it('loads global variables if there is no CJS or AMD stuff for matreshka.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("matreshka-prod") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(typeof win.Matreshka == 'function').toBe(true);
					expect(typeof win.MK == 'function').toBe(true);
					expect(typeof win.$b == 'function').toBe(true);
					expect(typeof win.Class == 'function').toBe(true);
					document.body.removeChild(iframe);
					done();
				};

				script.src = src;

				win.document.body.appendChild(script);
			};

			document.body.appendChild(iframe);
		});

		it('loads global variables if there is no CJS or AMD stuff for matreshka.min.js', function (done) {
			var iframe = document.createElement('iframe'),
			    src = require.toUrl("matreshka-prod-min") + '.js';

			iframe.onload = function () {
				var win = iframe.contentWindow,
				    script = win.document.createElement('script');

				script.onload = function () {
					expect(typeof win.Matreshka == 'function').toBe(true);
					expect(typeof win.MK == 'function').toBe(true);
					expect(typeof win.$b == 'function').toBe(true);
					expect(typeof win.Class == 'function').toBe(true);
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