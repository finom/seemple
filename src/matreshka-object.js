"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define( [ 'matreshka_dir/matreshka-core'], factory );
    } else {
        factory( root.MK );
    }
}(this, function ( MK ) {
	var i;
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	
	/**
	 * @class Matreshka.Object
	 * @author Andrey Gubanov <a@odessite.com.ua>
	 * @license {@link https://raw.github.com/finom/matreshka/master/LICENSE MIT}
	 * Version 2.0, January 2004
	 * @classdesc Matreshka Object class (Matreshka "model"). Extends {@link Matreshka}.
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
	 * 		// calls MK.Object constructor with same context and given arguments
	 * 		MyClass.parent.constructor( this, arguments );
	 *	},
	 * 	method: function() {}
	 * });
	 */
	return MK.Object = MK.Class({
		'extends': MK,
		/**
		 * @member {boolean} Matreshka.Object#isMKObject
		 * @summary <code>isMKObject</code> is always </code>true</code>. It's using for easy Matreshka.Object instance detection.
		 */
		isMKObject: true,
		constructor: function( object ) {
			this.initMK();
			if( object ) {
				this.jset( object );
			}
		},
		
		/**
		 * @method Matreshka.Object#keys
		 * @summary Returns an array of enumerable keys
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
		 * @summary Initializes {@link Matreshka.Object} instance. See {@link Matreshka#initMK}.
		 * @returns {mkObject} self
		 * @example <caption>Basic usage</caption>
		 * var MyClass = Class({
		 * 	'extends': MK.Object,
		 * 	constructor: function() {
		 * 		this.initMK();
		 * 	}
		 * });
		 */
		initMK: function() {
			MK.Object.parent.initMK( this, arguments );
			
			return this
				.defineNotEnum( '_keys', {} )
				.on( 'remove', function( evt ) {
					if( !evt || !evt.silent ) {
						this.trigger( 'modify', evt );
					}
				})
				.on( 'change', function( evt ) {
					if( evt && ( evt.key in this._keys ) && !evt.silent ) {
						this.trigger( 'modify', evt );
					}
				})
			;
		},
		/**
		 * @method Matreshka.Object#on
		 * @since 0.2
		 * @summary Works same way as {@link Matreshka#on} and allows to attach event handlers for any existing and furite items
		 * @example
		 * var mkObject = new MK.Object();
		 * mkObject.on( '@something', function() {
		 * 	alert( 'something happens' )
		 * });
		 * mkArray.jset( 'x', new MK );
		 * mkArray.x.trigger( 'something' );
		 */ 
		
		_on: function( name, callback, context, xtra ) {
			var _this = this,
				f;
			if( name.indexOf( '@' ) === 0 ) {
				name = name.slice( 1 );
				f = function( evt ) {
					var target = _this[ evt.key ];
					if( target && target.isMK && evt && ( evt.key in _this._keys ) ) {
						target.on( name, callback, false, context || _this );
					}
				};
				
				_this.each( function( item ) {
					item.isMK && item.on( name, callback, false, context || _this );
				}, _this );
				
				f._callback = callback;
				_this.on( 'change', f, _this, true, name );
			} else {
				MK.prototype._on.call( _this, name, callback, context, xtra );
			}
			
			return this;
		},
		
		_off: function( name, callback, context ) {
			var _this = this,
				removeevents;
			if( name.indexOf( '@' ) === 0 ) {
				name = name.slice( 1 );
				if( callback ) {
					_this.off( 'change', callback, context );
				} else {
					events = _this.__events.change || [];
					for( var i = 0; i < events.length; i++ ) {
						if( events[ i ].xtra === name ) {
							_this.off( 'change', events[ i ].callback );
						}
					}
				}
				
				_this.each( function( item ) {
					item.isMK && item.off( name, callback, context );
				}, _this );
			} else {
				MK.prototype._off.call( _this, name, callback, context );
			}
			
			return this;
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
		 * @summary Gets key of given value  (<code>Array.prototype.indexOf</code> analogue)
		 * @desc Returns first match or <code>null</code> if no property found
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
		 * @fires change:KEY
		 * @fires modify
		 * @variation 1
		 * @summary Sets given property and adds key to enumerable list
		 * @desc <p>This is the important method of {@link Matreshka.Object} insance that does two things:</p>
		 * <p>1. Sets property.<br>
		 * 2. Adds given key to enumerable list (that key enumerates via {@link Matreshka.Object#each} method and includes to object that returnes from {@link Matreshka.Object#toObject} and {@link Matreshka.Object#toJSON}) methods.</p>
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
		 * @example <caption>{@link Matreshka.Object#each}</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 );
		 * // set 'c' to 3 but do not add keys to enumerable list
		 * this.set( 'c', 3 );
		 * this.each( function( value, key ) {
		 * 	console.log( key, value ); 
		 * });
		 * // logs 'a' 1 and 'b' 2
		 * 
		 * @example <caption>{@link Matreshka.Object#keys}</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 );
		 * // set 'c' to 3 but do not add keys to enumerable list
		 * this.set( 'c', 3 );
		 * console.log( this.keys() ); // logs [ 'a', 'b' ]
		 * 
		 * @example <caption>{@link Matreshka.Object#toObject}</caption>
		 * this.jset( 'a', 1 ).jset( 'b', 2 );
		 * // sets 'c' to 3 but not adds keys to enumerable list
		 * this.set( 'c', 3 );
		 * console.log( this.toObject() ); // logs { a: 1, b: 2 }
		 * 
		 * @example <caption>After using {@link Matreshka.Object#jset(1)} you can work with property as with regular property</caption>
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
				for( i in key ) {
					this.jset( i, key[ i ], v );
				}
				return this;
			}
			
			this._keys[ key ] = 1;
			
			this.makeSpecial( key );
			
			return this.set( key, v, evtOpts );
		},
		
		/**
		 * @method Matreshka.Object#remove
		 * @fires remove
		 * @fires remove:KEY
		 * @fires modify
		 * @summary Removes property from {@link Matreshka.Object} instance and from it's enumerable list. Look at {@link Matreshka#remove}.
		 * @param {string} key - A key (space-delimited list of keys) that you want to remove from current instance.
		 * @param {eventOptions} - [evtOptions] - Event options.
		 * @returns {mkObject} self
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
		 * @example <caption>{@link Matreshka.Object#each}</caption>
		 * this.addJSONKeys( 'a b' );
		 * this.each( function( value, key ) {
		 * 	console.log( key, value );
		 * });
		 * // logs 'a' undefined and 'b' undefined
		 */
		addJSONKeys: function( keys ) {
			if( !arguments.length ) return this;
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : String( keys ).split( /\s/ );
			for( i = 0; i < keys.length; i++ ) {
				this._keys[ keys[ i ] ] = 1;
				this.makeSpecial( keys[ i ] );
			}
			return this;
		},
		
		/**
		 * @method Matreshka.Object#removeJSONKeys
		 * @summary Removes keys from enumerable list (but doesn't delete a property from the instance)
		 * @desc You can remove keys from instance enumerable list if you no longer need them as part of instance data.
		 * @param {(string|string[]|...string)} keys - A list of space-delimited keys or array of keys or repeated string.
		 * @returns {mkObject} self
		 * @example <caption>Basic usage 1</caption>
		 * this.removeJSONKeys( 'a b' );
		 * @example <caption>Basic usage 2</caption>
		 * this.removeJSONKeys( [ 'a', 'b' ] );
		 * @example <caption>Basic usage 3</caption>
		 * this.removeJSONKeys( 'a', 'b' );
		 */
		removeJSONKeys: function( keys ) {
			if( !arguments.length ) return this;
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : String( keys ).split( /\s/ );
			for( i = 0; i < keys.length; i++ ) {
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
		 * this.each( function( value, key ) {
		 * 	... 
		 * }, this );
		 * @example <caption>Usage</caption>
		 * this
		 * 	.jset({ a: 1, b: 2 })
		 * 	.addJSONKeys( 'c' )
		 * 	.each( function( value, key ) {
		 * 		console.log( key, value );
		 * 	}, this );
		 * ; 
		 * // >>> a 1, b 2, c undefined
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
}));