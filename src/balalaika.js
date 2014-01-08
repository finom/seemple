"use strict";
!function( window, document, fn, s_EventListener, s_MatchesSelector, s_prototype, s_forEach ) { // http://jsbin.com/eqiCAKO/2
	var nsReg = /\.(.+)/,
	s_$b = '$b',
	id = 0,
	events = {},
	i, j,
	evtName,
	$ = window.$ = window[s_$b] = function( s, context ) {
		return new $.i( s, context );
	};
	
	$.i = function( s, context ) {
		fn.push.apply( this, !s ? fn : s && s.nodeType ? [s] : "" + s === s ? (context&&!context.nodeType&&context[ 0 ]||context||document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : s === window ? [s] : s );
	};
	
	$.i[ s_prototype ] = ( $.extend = function(obj) {
		var args = arguments,
			arg;
		for( i = 1; i < args.length; i++ ) {
			arg = args[ i ];
			if ( arg ) {
				for (j in arg) {
					obj[j] = arg[j];
				}
			}
		}
		
		return obj;
	})( $.fn = $[ s_prototype ] = fn, {
		on: function( n, f ) {
			n = n.split( nsReg );
			evtName = n[ 0 ];
			this[ s_forEach ]( function( item ) {
				i = evtName + ( item[ s_$b ] = item[ s_$b ] || ++id );
				( events[ i ] = events[ i ] || [] ).push({
					handler: f,
					namespace: n[ 1 ],
					type: evtName
				});
				
				item[ 'add' + s_EventListener ]( evtName, f );
			});
			return this;
		},
		off: function( n, f ) {
			n = n.split( nsReg );
			evtName = n[ 0 ];
			var ns = n[ 1 ];
			this[ s_forEach ]( function( item ) {
				var _id = item[ s_$b ],
					eventArray, h;
				ns || !f 
					? (events[ evtName + _id ] || fn)[ s_forEach ]( function( eventItem ) {
						h = eventItem.handler;
						if( ( !f || f === h ) && ( !ns || ns === eventItem.namespace ) ) {
							item[ 'remove' + s_EventListener ]( evtName, h );
							eventArray.splice( i--, 1 );
						}
					})
					: item[ 'remove' + s_EventListener ]( evtName, f );
	
			});
			return this;
		},
		is: function( s ) {
			i = this[ 0 ];
			j = i && ( i.matches
				|| i[ 'webkit' + s_MatchesSelector ]
				|| i[ 'moz' + s_MatchesSelector ]
				|| i[ 'ms' + s_MatchesSelector ] )
			;
			return !!j && j.call( i, s );
		}
	});
}( this, document, [], 'EventListener', 'MatchesSelector', 'prototype', 'forEach' );

!function(document, fn, s_prototype ) {
	if( document.documentMode <= 8 ) {
		var toArray = function(arrayLike) {
			j = []; for (i = arrayLike.length; i--; j[i] = arrayLike[i]); return j;
		},
		i, j,
		prototype = $b.i[ s_prototype ];
		$b.i = function( s, context ) {
			if( s && s.constructor === Array ) s = toArray( s ); // o_0 ie10/mode8
			fn.push.apply( this, !s ? fn : s && s.nodeType ? [s] : "" + s === s ? toArray((context&&!context.nodeType&&context[ 0 ]||context||document).querySelectorAll(s)) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() || fn : !function r(f){/in/(document.readyState)?setTimeout(r,9,f):f()}(s) || fn : s === window ? [s] : s );
		};
		$b.i[ s_prototype ] = prototype;
		if( !$b( 'html' ).is( 'html' ) ) {
			$b.fn.is = function( s ) {
				var el = this[ 0 ],
					is,
					b_b = 'b_b',
					selected;
				if( !el || !s || !el.setAttribute ) return false;
				el.setAttribute( b_b, b_b );
				selected = document.querySelector( s + '[b_b="b_b"]' );
				is = selected === el;
				el.removeAttribute( b_b, b_b );
				return is;
			};
		}
	}
}( document, [], 'prototype' );

