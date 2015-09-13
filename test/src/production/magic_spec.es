import magic from 'magic-prod';
import magic2 from 'magic-prod-min';

describe('magic.js and magic.min.js load', () => {
	it('imports AMD modules in ES2015 style from magic.js', () => {
        expect(typeof magic == 'object').toBe(true);
	});

	it('imports AMD modules in ES2015 style from magic.min.js', () => {
        expect(typeof magic2 == 'object').toBe(true);
    });

	it('imports AMD module from magic.js', done => {
		require(['magic-prod'], function(magic) {
			expect(typeof magic == 'object').toBe(true);
			done();
		});
	});

	it('imports AMD module from magic.min.js', done => {
		require(['magic-prod-min'], function(magic) {
			expect(typeof magic == 'object').toBe(true);
			done();
		});
	});

	it('imports CJS module from magic.js', done => {
		let iframe = document.createElement('iframe'),
			src = require.toUrl("magic-prod") + '.js';



		iframe.onload = () => {
			let win = iframe.contentWindow,
				script = win.document.createElement('script');

			script.onload = () => {
				expect(typeof win.module.exports.bindNode == 'function').toBe(true);
				document.body.removeChild(iframe);
				done();
			};

			script.src = src;
			win.module = {exports: {}};
			win.exports = win.module.exports;

			win.document.body.appendChild(script);

		}

		document.body.appendChild(iframe);

    });


	it('imports CJS module from magic.min.js', done => {
		let iframe = document.createElement('iframe'),
			src = require.toUrl("magic-prod-min") + '.js';



		iframe.onload = () => {
			let win = iframe.contentWindow,
				script = win.document.createElement('script');

			script.onload = () => {
				expect(typeof win.module.exports.bindNode == 'function').toBe(true);
				document.body.removeChild(iframe);
				done();
			};

			script.src = src;
			win.module = {exports: {}};
			win.exports = win.module.exports;

			win.document.body.appendChild(script);

		}

		document.body.appendChild(iframe);

    });


	it('loads global variables if there is no CJS or AMD stuff for magic.js', done => {
		let iframe = document.createElement('iframe'),
			src = require.toUrl("magic-prod") + '.js';


		iframe.onload = () => {
			let win = iframe.contentWindow,
				script = win.document.createElement('script');

			script.onload = () => {
				expect(typeof win.MatreshkaMagic == 'object').toBe(true);
				expect(typeof win.magic == 'object').toBe(true);
				document.body.removeChild(iframe);
				done();
			};

			script.src = src;

			win.document.body.appendChild(script);

		}

		document.body.appendChild(iframe);
    });

	it('loads global variables if there is no CJS or AMD stuff for magic.min.js', done => {
		let iframe = document.createElement('iframe'),
			src = require.toUrl("magic-prod-min") + '.js';


		iframe.onload = () => {
			let win = iframe.contentWindow,
				script = win.document.createElement('script');

			script.onload = () => {
				expect(typeof win.MatreshkaMagic == 'object').toBe(true);
				expect(typeof win.magic == 'object').toBe(true);
				document.body.removeChild(iframe);
				done();
			};

			script.src = src;

			win.document.body.appendChild(script);

		}

		document.body.appendChild(iframe);
    });
});
