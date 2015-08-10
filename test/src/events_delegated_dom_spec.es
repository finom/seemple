import magic from 'matreshka_magic';
import $ from 'balalaika';
let q = ( s, c ) => $( s, c )[0] || null;

describe( "Events core: _addDOMListener, _removeDOMListener", () => {
	document.body.appendChild( $.create({
		tagName: 'DIV',
		id: 'd-test',
		innerHTML: `
			<div id="d-test-1">
				<div class="d-test-2">
					
				</div>
			</div>
		`
	}) );
	
	it( 'fires (no selector)', () => {
		let obj = {},
			bool = false;
		
		magic.bindNode( obj, 'x', '#d-test' )
		magic._addDOMListener( obj, 'x', 'click', null, evt => bool = true );
			
		
		q( '#d-test' ).click();
		
		expect(bool).toBe(true);
	});
	
	it( 'removes (no selector)', () => {
		let obj = {},
			bool = false;
		
		magic._addDOMListener( obj, 'x', 'click', null, evt => bool = true );
		magic._removeDOMListener( obj, 'x', 'click' );
		magic.bindNode( obj, 'x', '#d-test' );
		
			console.log( obj )
		q( '#d-test' ).click();
		
		expect(bool).toBe(false);
	});
	
	it( 'fires (use selector)', () => {
		let obj = {},
			bool = false;
		
		magic.bindNode( obj, 'x', '#d-test' )
		magic._addDOMListener( obj, 'x', 'click', '.d-test-2', evt => bool = true );
			
		q( '.d-test-2' ).click();
		
		expect(bool).toBe(true);
	});
	
	it( 'adds (use selector) and removes (no selector)', () => {
		let obj = {},
			bool = false;
		
		magic.bindNode( obj, 'x', '#d-test' )
		magic._addDOMListener( obj, 'x', 'click', '.d-test-2', evt => bool = true );
		magic._removeDOMListener( obj, 'x', 'click' );
			
		q( '.d-test-2' ).click();
		
		expect(bool).toBe(false);
	});
	
	it( 'adds (use selector) then binds then removes (no selector)', () => {
		let obj = {},
			bool = false;
		
		
		magic.bindNode( obj, 'x', '#d-test' );
		magic._addDOMListener( obj, 'x', 'click', '.d-test-2', evt => bool = true );
		magic._removeDOMListener( obj, 'x', 'click' );
		
		q( '.d-test-2' ).click();
		
		expect(bool).toBe(false);
	});
	
	
	
	/*it( 'removes', () => {
		let obj = {},
			bool = false;
		
		magic._addDOMListener( obj, 'click', null, evt => bool = true );
		magic._removeDOMListener( obj, 'click', null );
			
		document.getElementById( 'd-test' ).click();
		
		expect(bool).toBe(false);
	});
	
	it( 'fires delegated', () => {
		let obj = {},
			bool = false;
		 
		magic._addDOMListener( obj, 'click', '#d-test-2', evt => bool = true );
			
		document.getElementById( '#d-test-2' ).click();
		
		expect(bool).toBe(true);
	});
	
	it( 'removes delegated', () => {
		let obj = {},
			bool = false;
		
		magic._addDOMListener( obj, '#d-test-2', null, evt => bool = true );
		magic._removeDOMListener( obj, '#d-test-2', null );
			
		document.getElementById( '#d-test-2' ).click();
		
		expect(bool).toBe(false);
	});*/
});
