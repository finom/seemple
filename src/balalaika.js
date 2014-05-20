"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('balalaika', factory);
    } else {
        root.$b = factory();
    }
}(this, function () {
/**
 * @function $b
 * @version 1.0
 * @since 0.1
 * @extends Array
 * @summary <code>Balalaika</code> DOM utilite
 * 
 * @desc <p>Balalaika is tiny (999 bytes uncompressed) embedded library that makes easier vanilla.js (pure JS) coding. This is individual project and will be presented on github soon.</p>
 * 
 * <p>It's using in {@link http://finom.github.io/matreshka|Matreshka} framework as DOM utilite when jQuery is not defined.</p>
 * 
 * <p>Balalaika extends Array. It means that you can use Array methods such as <code>.forEach</code>, <code>.map</code>, <code>.reduce</code>, <code>.splice</code> and so on.</p>
 * 
 * <p>Balalaika includes 3 own methods: <code>.on</code>, <code>.off</code>, <code>.is</code> and static <code>.extend</code> method that work same way as jQuery analogues (<code>.on</code> doesn't support data). </p>
 * 
 * <p>WARNING: This lib works fine in modern browsers (including Internet Explorer 9) only or using DOM shims. For older browsers you still need jQuery.</p>
 * 
 * @example $( 'div' ).forEach( ... );
 * @example $( 'span', document.body ).map( ... );
 * @example $( '.button' ).on( 'click.mynamespace', ... );
 * @example $( '.button' ).off( 'click.mynamespace' );
 */
// nsRegAndEvents is regesp for eventname.namespace and the list of all events
// fn is empty array and balalaika prototype
return ( function( window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $ ) {
	$ = function( s, context ) {
		return new $.i( s, context );
	};
	
	$.i = function( s, context ) {
		fn.push.apply( this, !s ? fn : s.nodeType || s == window ? [s] : "" + s === s ? /</.test( s ) 
		? ( ( i = document.createElement( context || 'div' ) ).innerHTML = s, i.children ) : (context&&$(context)[0]||document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : s );
	};
	
	$.i[ l = 'prototype' ] = ( $.extend = function(obj) {
		k = arguments;
		for( i = 1; i < k.length; i++ ) {
			if ( l = k[ i ] ) {
				for (j in l) {
					obj[j] = l[j];
				}
			}
		}
		
		return obj;
	})( $.fn = $[ l ] = fn, { // $.fn = $.prototype = fn
		on: function( n, f ) {
			// n = [ eventName, nameSpace ]
			n = n.split( nsRegAndEvents );
			this.map( function( item ) {
				// item.b$ is balalaika_id for an element
				// i is eventName + id ("click75")
				// nsRegAndEvents[ i ] is array of events (eg all click events for element#75) ([[namespace, handler], [namespace, handler]])
				( nsRegAndEvents[ i = n[ 0 ] + ( item.b$ = item.b$ || ++id ) ] = nsRegAndEvents[ i ] || [] ).push([f, n[ 1 ]]);
				// item.addEventListener( eventName, f )
				item[ 'add' + s_EventListener ]( n[ 0 ], f );
			});
			return this;
		},
		off: function( n, f ) {
			// n = [ eventName, nameSpace ]
			n = n.split( nsRegAndEvents );
			// l = 'removeEventListener'
			l = 'remove' + s_EventListener;
			this.map( function( item ) {
				// k - array of events
				// item.b$ - balalaika_id for an element
				// n[ 0 ] + item.b$ - eventName + id ("click75")
				k = nsRegAndEvents[ n[ 0 ] + item.b$ ];
				// if array of events exist then i = length of array of events
				if( i = k && k.length ) {
					// while j = one of array of events
					while( j = k[ --i ] ) {
						// if( no f and no namespace || f but no namespace || no f but namespace || f and namespace )
						if( ( !f || f == j[ 0 ] ) && ( !n[ 1 ] || n[ 1 ] == j[ 1 ] ) ) {
							// item.removeEventListener( eventName, handler );
							item[ l ]( n[ 0 ], j[ 0 ] );
							// remove event from array of events
							k.splice( i, 1 );
						}
					}
				} else {
					// if event added before using addEventListener, just remove it using item.removeEventListener( eventName, f )
					!n[ 1 ] && item[ l ]( n[ 0 ], f );
				}	
			});
			return this;
		},
		is: function( s ) {
			i = this[ 0 ];
			j = !!i && ( i.matches
				|| i[ 'webkit' + s_MatchesSelector ]
				|| i[ 'moz' + s_MatchesSelector ]
				|| i[ 'ms' + s_MatchesSelector ] );
			return !!j && j.call( i, s );
		}
	});	
	return $;
})( window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector' );

}));