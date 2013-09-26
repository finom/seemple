( function() {
	var Example = Class({
		'extends': MK.DOMArray,
		constructor: function() {
			this
				.initMK()
				.bindElement( this, 'table' )
				.bindElement( 'log', '#log' )
			;
		},
		renderer: function( object ) {
			return '<tr><td>'+object.a+'</td><td>'+object.b+'</td><td>'+object.c+'</td></tr>' 
		},
		push: function() {
			var args = [];
			for( var i = 0; i < arguments.length; i++ ) {
				args[ i ] = new MK.Object( arguments[ i ] );
			}
			Example.parent.push( this, args );
		},
		unshift: function() {
			var args = [];
			for( var i = 0; i < arguments.length; i++ ) {
				args[ i ] = new MK.Object( arguments[ i ] );
			}
			Example.parent.unshift( this, arguments );
		},
		splice: function( index, howmany ) {
			var args = [ index, howmany ];
			for( var i = 2; i < arguments.length; i++ ) {
				args[ i ] = new MK.Object( arguments[ i ] );
			}
			Example.parent.push( this, arguments );
		},
		demo: function( duration ) {
			var functions = Array.prototype.slice.call( arguments, 1 ),
				i = 0;
			( function callee( f ) {
				setTimeout( function() {
					this.log( f.toString().replace( /function\(\)\s*{(.+)}/, '$1' ) );
					f();
					this.
					if( ++i < functions.length ) {
						callee( functions[ i ] );
					}
				}.bind( this ), duration );
			})( functions[ i ] );
		},
		log: function( text ) {
			var div = document.createElement( 'div' ),
				div.innerHTML = text;
			this.$el( 'log' ).append( div );
		}
	});
})();