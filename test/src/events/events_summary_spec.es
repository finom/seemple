import magic from 'matreshka-magic';
import MK from 'matreshka';
import $ from 'balalaika';
let q = ( s, c ) => $( s, c )[0] || null;

describe( 'Events summary (_on, _off, on, off)', () => {
	document.body.appendChild( $.create({
		tagName: 'DIV',
		id: 's-test',
		innerHTML: `
			<div id="s-test-1">
				<div class="s-test-2">

				</div>
			</div>
		`
	}) );


	it( 'fires', () => {
		let obj = {},
			bool = false;
		magic._on( obj, 'someevent', evt => bool = true );
		magic.trigger( obj, 'someevent' );
		expect(bool).toBe(true);
	});

	it( 'fires delegated', () => {
		let obj = { a: { b: { c: {} } } },
			bool = false;

		magic._on( obj, 'a.b.c@someevent', evt => bool = true );
		magic.trigger( obj.a.b.c, 'someevent' );
		expect(bool).toBe(true);
	});

	it( 'removed delegated', () => {
		let obj = { a: { b: { c: {} } } },
			bool = false;

		magic._on( obj, 'a.b.c@someevent', evt => bool = true );
		magic._off( obj, 'a.b.c@someevent' );

		magic.trigger( obj.a.b.c, 'someevent' );
		expect(bool).toBe(false);
	});

	it( 'fires (no selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode( obj, 'x', '#d-test' )
		magic._on( obj, 'click::x', evt => bool = true );


		q( '#d-test' ).click();

		expect(bool).toBe(true);
	});

	it( 'removes (no selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode( obj, 'x', '#d-test' );
		magic._on( obj, 'click::x', evt => bool = true );
		magic._off( obj, 'click::x' );

		q( '#d-test' ).click();

		expect(bool).toBe(false);
	});

	it( 'fires (use selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode( obj, 'x', '#d-test' );
		magic._on( obj, 'click::x(.d-test-2)', evt => bool = true );

		q( '.d-test-2' ).click();

		expect(bool).toBe(true);
	});

	it( 'works with "*" events (MK.Array)', () => {
		let obj = new MK.Array(),
			bool = false;

		magic._on( obj, '@someevent', evt => bool = true );

		obj.push({});

		//magic._off( obj, '*@someevent'  );

		magic.trigger( obj[0], 'someevent' );

		expect(bool).toBe(true);
	});

	it( 'fires (no selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode( obj, 'x', '#d-test' )
		magic._on( obj, 'click::x', evt => bool = true );


		q( '#d-test' ).click();

		expect(bool).toBe(true);
	});

	it( 'fires (use selector)', () => {
		let obj = {},
			bool = false;

		magic.bindNode( obj, 'x', '#d-test' )
		magic._on( obj, 'click::x(.d-test-2)', evt => bool = true );

		q( '.d-test-2' ).click();

		expect(bool).toBe(true);
	});
});
