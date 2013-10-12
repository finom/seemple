"use strict";// tests, 
// BIG TODO: make Array.prototype default methods work in IE!
// @todo pass arguments to the methods as event property
( function( MK ) {
	if( !MK ) {
		throw Error( 'Matreshka is not defined' );
	}
	
	/**
	 * @class Matreshka.Object
	 * @version 0.0.1
	 * @author Andrey Gubanov <a@odessite.com.ua>
	 * @license {@link http://www.apache.org/licenses/ Apache License}
	 * Version 2.0, January 2004
	 * @classdesc Matreshka Object class. Extends {@link Matreshka}.
	 * @inherits Matreshka
	 * @example <caption>Basic usage</caption>
	 * new MK.Object;
	 * @example <caption>Passing object</caption>
	 * // creates Matreshka.Object instance with 2 enumerable keys (a, b)
	 * new MK.Object({ a: 1, b: 2 });
	 * // same as new MK.Object().jset({ a: 1, b: 2 });
	 * @example <caption>Inheritance</caption>
	 * var MyClass = Class({
	 *	'extends': MK.Object,
	 * 	constructor: function() {
	 * 		// calls MK.Object constructor with this context and given arguments
	 * 		MyClass.parent.constructor( this, arguments );
	 *	},
	 * 	method: function() {}
	 * });
	 */
	MK.Object = Class({
		'extends': MK,
		constructor: function( object ) {
			this.initMK();
			if( object ) {
				this.jset( object );
			}
		},
		
		/**
		 * @method Matreshka.Object#keys
		 * @summary Returns an array of keys of the {@link Matreshka.Object} instance
		 * @returns {string[]} keys
		 * @example <caption>Basic usage</caption>
		 * var keys = this.keys();
		 */
		keys: function() {
			var keys = [];
			for( var p in this._keys ) if( this._keys.hasOwnProperty( p ) ) {
				keys.push( p );
			}
			return keys;
		},
		
		/**
		 * @method Matreshka.Object#initMK
		 * @summary Initializes {@link Matreshka.Object} instance
		 * @returns {mkObject} self
		 * @example <caption>Basic usage</caption>
		 * var MyClass = Class({
		 * 	'extends': MK.Object,
		 *  constructor: function() {
		 *  	this.initMK();
		 * 	}
		 * });
		 */
		initMK: function() {
			MK.Object.parent.initMK( this, arguments );
			
			return this
				.defineNotEnum( '_keys', {} )
				.on( 'remove', function( opts ) {
					if( !opts || !opts.silent ) {
						this.trigger( 'modify', opts );
					}
				})
				.on( 'change', function( opts ) {
					if( opts && ( opts.key in this._keys ) && !opts.silent ) {
						this.trigger( 'modify', opts );
					}
				})
			;
		},
		
		/**
		 * @method Matreshka.Object#hasOwnProperty
		 * @summary Checks is {@link Matreshka.Object} instance has own property <code>key</code>
		 * @param {string} key
		 * @returns {mkObject} self
		 * @example <caption>Basic usage</caption>
		 * var mkObject = new MK.Object( { a: 1, b: 2 } );
		 * mkObject.hasOwnProperty( 'a' ); // true
		 * mkObject.hasOwnProperty( 'b' ); // true
		 * mkObject.hasOwnProperty( 'c' ); // false
		 */
		hasOwnProperty: function( key ) {
			return this._keys.hasOwnProperty( key );
		},
		
		/**
		 * @method Matreshka.Object#toObject
		 * @summary Converts {@link Matreshka.Object} instance to native object
		 * @returns {Object}
		 * @example <caption>Basic usage</caption>
		 * var mkObject = new MK.Object( { a: 1, b: 2 } );
		 * mkObject.toObject(); // returns { a: 1, b: 2 }
		 */
		toObject: function() {
			var o = {},
				_keys = this._keys;
			for( var p in _keys ) if( _keys.hasOwnProperty( p ) ) {
				o[ p ] = this[ p ];
			}
			return o;
		},
		
		/**
		 * @method Matreshka.Object#toNative
		 * @summary Does same as {@link Matreshka.Object#toObject}
		 * @returns {Object}
		 * @example <caption>Usage</caption>
		 * var mkObject = new MK.Object( { a: 1, b: 2 } );
		 * mkObject.toNative(); // returns { a: 1, b: 2 }
		 */
		toNative: function() {
			return this.toObject();
		},
		
		/**
		 * @method Matreshka.Object#toJSON
		 * @summary Converts {@link Matreshka.Object} instance to native object
		 * @desc The diferrence between {@link Matreshka.Object#toJSON} and {@link Matreshka.Object#toObject} is that  {@link Matreshka.Object#toJSON} tries to call <code>toJSON</code> method for inner objects.
		 * @returns {Object}
		 * @example <caption>Usage</caption>
		 * var json = this.toJSON();
		 */
		toJSON: function() {
			var JSON = {},
				_keys = this._keys;
			for( var p in _keys ) if( _keys.hasOwnProperty( p ) ) {
				JSON[ p ] = this[ p ] && this[ p ].toJSON ? this[ p ].toJSON() : this[ p ];
			}
			return JSON;
		},
		
		/**
		 * @method Matreshka.Object#keyOf
		 * @summary Gets key of given value
		 * @desc Returns first match or <code>null</code> if no property found (<code>Array.prototype.indexOf</code> analogue)
		 * @prop {*} o - value that we want to find
		 * @returns {(string|null)}
		 * @example <caption>Usage</caption>
		 * var mkObject = new MK.Object( { a: 1, b: 2 } );
		 * mkObject.keyOf( 1 ); // 'a'
		 * mkObject.keyOf( 2 ); // 'b'
		 * mkObject.keyOf( 3 ); // null
		 */
		keyOf: function( o ) {
			var _keys = this._keys;
			for( var p in _keys ) if( _keys.hasOwnProperty( p ) ) {
				if( o === _keys[ p ] ) {
					return p;
				}
			}
			return null;
		},
		
		/**
		 * @method Matreshka.Object#jset
		 * @fires change
		 * @fires change:*key*
		 * @fires modify
		 * @variation 1
		 * @summary Sets given property and adds key to enumerable list
		 * @desc <p>This is common method of {@link Matreshka.Object} insance that does two things:</p>
		 * <p>1. Sets property.</p>
		 * <p>2. Adds given key to enumerable list (key enumerates via {@link Matreshka.Object#each} method and includes to result object returned by {@link Matreshka.Object#toObject} and {@link Matreshka.Object#toJSON}) methods.</p>
		 * 
		 * @param {string} key
		 * @param {*} value
		 * @param {eventOptions} [evtOpts]
		 * 
		 * @returns {mkObject} self
		 * 
		 * @example <caption>Basic usage</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 );
		 * 
		 * @example <caption>{@link Matreshka.Object#each} method example</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 );
		 * // sets 'c' to 3 but not adds keys to enumerable list
		 * this.set( 'c', 3 );
		 * this.each( function( value, key ) {
		 * 	console.log( key, value ); 
		 * });
		 * // logs 'a' 1 and 'b' 2
		 * 
		 * @example <caption>{@link Matreshka.Object#keys} method example</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 );
		 * // sets 'c' to 3 but not adds keys to enumerable list
		 * this.set( 'c', 3 );
		 * console.log( this.keys() ); // logs [ 'a', 'b' ]
		 * 
		 * @example <caption>{@link Matreshka.Object#toObject} method example</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 );
		 * // sets 'c' to 3 but not adds keys to enumerable list
		 * this.set( 'c', 3 );
		 * console.log( this.toObject() ); // logs { a: 1, b: 2 }
		 * 
		 * @example <caption>After using {@link Matreshka.Object#jset} you can work with property as with regular property</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 ); // sets properties and adds to <code>'a'</code> and <code>'b'</code> enumerable list
		 * this.set( 'a', 3 ); 
		 * this.b = 4;
		 */
		
		/**
		 * @method Matreshka.Object#jset
		 * @variation 2
		 * @summary Uses key-value object for setting few properties and adding theirs keys to enumerable list
		 * @param {object} keyValuePairs
		 * @param {eventOptions} evtOpts
		 * 
		 * @returns {mkObject} self
		 * 
		 * @example <caption>Basic usage</caption>
		 * this.jset({
		 * 	a: 1,
		 * 	b: 2
		 * });
		 * @example <caption>Using <code>eventOptions</code></caption>
		 * this.jset({
		 * 	a: 1,
		 * 	b: 2
		 * }, { silent: true });
		 */
		jset: function( key, v, evtOpts ) {
			if( typeof key === 'undefined' ) return this;
			
			if( typeof key === 'object' ) {
				for( var i in key ) {
					this.jset( i, key[ i ], v );
				}
				return this;
			}
			
			this._keys[ key ] = 1;
			
			this.makeSpecial( key );
			
			return this.set( key, v, evtOpts );
		},
		
		/**
		 * @method Matreshka#remove
		 * @fires remove
		 * @fires remove:*key*
		 * @fires modify
		 * @summary Removes property from {@link Matreshka.Object} instance and from enumerable list
		 * @param {string} key - a key (space-delimited list of keys) that you want to remove from current instance
		 * @param {eventOptions} - [evtOptions]
		 * @returns {MKInstance} self
		 * @example <caption>Basic usage</caption>
		 * this.remove( 'myKey' );
		 * this.remove( 'myKey1 myKey2' );
		 * @example <caption>Using <code>eventOptions</code></caption>
		 * this.remove( 'myKey', { silent: true } );
		 */
		remove: function( key, evtOpts ) {
			this.removeJSONKeys( key );
			return MK.Object.parent.remove( this, key, evtOpts );
		},
		
		/**
		 * @method Matreshka.Object#addJSONKeys
		 * @summary Adds given keys to enumerable list
		 * @desc This method is used if you want to define enumerable keys but you don't know values yet.
		 * @param {(...string|string[]|string)} keys - a list of space-delimited keys or array of keys or repeated string
		 * @returns {mkObject} self
		 * @example <caption>Basic usage 1</caption>
		 * this.addJSONKeys( 'a b' );
		 * @example <caption>Basic usage 2</caption>
		 * this.addJSONKeys( [ 'a', 'b' ] );
		 * @example <caption>Basic usage 3</caption>
		 * this.addJSONKeys( 'a', 'b' );
		 * @example <caption>Using {@link Matreshka.Object#each}</caption>
		 * this.addJSONKeys( 'a b' );
		 * this.each( function( value, key ) {
		 * 	console.log( key, value );
		 * });
		 * // logs 'a' undefined and 'b' undefined
		 */
		addJSONKeys: function( keys ) {
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : keys.split( /\s/ );
			for( var i = 0; i < keys.length; i++ ) {
				this._keys[ keys[ i ] ] = 1;
				this.makeSpecial( keys[ i ] );
			}
			return this;
		},
		
		/**
		 * @method Matreshka.Object#removeJSONKeys
		 * @summary Removes keys from enumerable list (but not removes a property from the instance)
		 * @desc You can remove keys from enumerable list if you no longer need them as part of data.
		 * @param {(string|string[]|...string)} keys - a list of space-delimited keys or array of keys or repeated string
		 * @returns {mkObject} self
		 * @example <caption>Basic usage 1</caption>
		 * this.removeJSONKeys( 'a b' );
		 * @example <caption>Basic usage 2</caption>
		 * this.removeJSONKeys( [ 'a', 'b' ] );
		 * @example <caption>Basic usage 3</caption>
		 * this.removeJSONKeys( 'a', 'b' );
		 */
		removeJSONKeys: function( keys ) {
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : keys.split( /\s/ );
			for( var i = 0; i < keys.length; i++ ) {
				delete this._keys[ keys[ i ] ];
			}
			return this;
		},
		
		/**
		 * @method Matreshka.Object#each
		 * @summary Iterates enumerable properties
		 * @param {function} callback
		 * @param {*} [thisArg] - the context of callback
		 * @returns {mkObject} self
		 * @example <caption>Usage</caption>
		 * this.each( function() {
		 * 	... 
		 * }, this );
		 */
		each: function( callback, thisArg ) {
			for( var p in this._keys ) if( this._keys.hasOwnProperty( p ) ) {
				callback.call( thisArg, this[ p ], p, this );
			}
			
			return this;
		}
	});
	
/**
 * {@link Matreshka.Object} instance
 * @typedef {object} mkObject
 */
})( window.Matreshka );