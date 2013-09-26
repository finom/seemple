"use strict";
MK.Hash = Class({
	'extends': MK.Object,
	constructor: function( predefined ) {
		if( MK.Hash.instance ) {
			return MK.Hash.instance;
		}
		
		MK.Hash.instance = this
			.initMK()
			.events()
			.hset( this.parse( document.location.hash ), {
				silent: true
			})
		;
	},
	events: function() {
		$( window ).on( 'hashchange', function() {
			this.setSelf( this.parse( document.location.hash ) );
		}.bind( this ) );
		
		return this
			.on( 'change', this.setHash )
		;
	},
	hset: function( key, value, opts ) {
		var parts;
		if( typeof key === 'object' ) {
			parts = key;
			opts = value;
		} else {
			parts = {};
			parts[ key ] = value;
		}		
	
		_.each( parts, function( value, key ) {
			if( value === null ) {
				this.remove( key );
			} else {
				/**
				 * warning! if value is not equals to string then change: event will be triggered twice
				 */
				parts[ key ] = value.toString();
				this.makeSpecial( key );
			}
		}, this );
		
		return this.jset( parts );
	},
	setSelf: function( parts ) {
		this.each( function( value, key ) {
			if( !( key in parts ) ) {
				this.remove( key );
			}
		}, this );
		
		return this.hset( parts );
	},
	setHash: function() {
		clearTimeout( this.perfomanceTimeout );
		this.perfomanceTimeout = setTimeout( function() {
			document.location.hash = this.stringify( this.toNative() );
		}.bind( this ) );
		
		return this;
	},
	parse: function( hash ) {
		var result = {};
		hash = hash.replace( '#', '' );
		if( hash ) {
			hash = unescape( hash ).split( '&' );
			hash.length && hash.forEach( function( part ) {
				var splitted = part.split( '=' );
				result[ splitted[ 0 ] ] = splitted[ 1 ];
			});
		}
		return result;
	},
	stringify: function( parts ) {
		var result = [],
			value;
		
		_.each( parts, function( value, key ) {
			if( value !== null ) {
				result.push( key + '=' + value );
			}
			
		});
				
		return '#' + result.join( '&' );
	}
});