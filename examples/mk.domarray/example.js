( function() {
	var Example = Class({
		'extends': MK.DOMArray,
		constructor: function() {
			this
				.initMK()
				.bindElement( this, 'table tbody' )
				.bindElement( 'log', '#log' )
			;
		},
		renderer: function( object ) {
			return '<tr><td class="a"></td><td class="b"></td><td class="c"></td></tr>' 
		},
		push: function() {
			var args = [];
			for( var i = 0; i < arguments.length; i++ ) {
				args[ i ] = new ExampleObject( arguments[ i ] );
			}
			return MK.DOMArray.prototype.push.apply( this, args );
		},
		unshift: function() {
			var args = [];
			for( var i = 0; i < arguments.length; i++ ) {
				args[ i ] = new ExampleObject( arguments[ i ] );
			}
			return MK.DOMArray.prototype.unshift.apply( this, args );
		},
		splice: function( index, howmany ) {
			var args = [ index, howmany ];
			for( var i = 2; i < arguments.length; i++ ) {
				args[ i ] = new ExampleObject( arguments[ i ] );
			}
			return MK.DOMArray.prototype.splice.apply( this, args );
		},
		demo: function( duration ) {
			var functions = Array.prototype.slice.call( arguments, 1 ),
				i = 0;
			( function callee( f ) {
				setTimeout( function() {
					this.log( f.toString().replace( /function\s*\(\)\s*{\s*([\s\S]+)}/, '$1' ).replace( /\n/g, '<br>' ).replace( /\t/g, '&#09;' ) );
					f.call( this );
					if( ++i < functions.length ) {
						callee.call( this, functions[ i ] );
					}
				}.bind( this ), duration );
			}).call( this, functions[ i ] );
		},
		log: function( text ) {
			this.$el( 'log' ).html( text );
		}
	});
	
	var ExampleObject = Class({
		'extends': MK.Object,
		constructor: function( o ) {
			this.initMK().jset( o ).on( 'render', function( evt ) {
				this.bindElement( this, evt.$el ).bindElement({
					a: this.$( '.a' ),
					b: this.$( '.b' ),
					c: this.$( '.c' )
				}, MK.htmlp );
			});
		}
	});
	
	window.example = new Example;
example.demo( 4000,
function() {
this.push({
	a: 1,
	b: 2,
	c: 3
})
},
function() {
this[ 0 ].a = 'xxx';
},
function() {
this.unshift({
	a: 4,
	b: 5,
	c: 6
})
},
function() {
this.push({
	a: 7,
	b: 8,
	c: 9
}, {
	a: 10,
	b: 11,
	c: 12
})
},
function() {
this.pop();
},

function() {
this.shift();
},
function() {
this.splice( 1, 2, {
	a: 13,
	b: 14,
	c: 15
}, {
	a: 'a',
	b: 'b',
	c: 'c'
})
},
function() {
this[ 0 ].a = 111;
this[ 1 ].c = 333;
this[ 2 ].b = 222;
},
function() {
this.unshift({
	a: 16,
	b: 17,
	c: 18
}, {
	a: 19,
	b: 20,
	c: 21
})
},
function() {
this.sort( function( x, y ) {
	return x.a > y.a ? 1 : -1;
})
});
})();