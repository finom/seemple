( function() {
	var timedOut = function( duration ) {
		var functions = Array.prototype.slice.call( arguments, 1 ),
			i = 0;
		( function callee( f ) {
			setTimeout( function() {
				f();
				if( ++i < functions.length ) {
					callee( functions[ i ] );
				}
			}, duration );
		})( functions[ i ] );
	};
	
	var Example = Class({
		'extends': MK.DOMArray,
		constructor: function() {
			this.initMK().bindElement( this, 'table' );
		},
		renderer: function( object ) {
			return '<tr><td>'+object.a+'</td><td>'+object.b+'</td><td>'+object.c+'</td></tr>' 
		}
	});
})();