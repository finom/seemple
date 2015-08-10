"use strict";
(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define([
			'xclass',
			'matreshka-magic'
		], factory);
    } else {
        root.MK = root.Matreshka = factory( root.Class, root.MatreshkaMagic );
    }
}(this, function ( Class, magic ) {

if( !Class ) {
	throw Error( 'Class function is missing' );
}
if( ![].forEach ) {
	throw Error( 'Internet Explorer 8 requires to use es5-shim: https://github.com/es-shims/es5-shim' );
}

var toArray = magic.toArray,
	extend = magic.extend,

MK = Class({
	//__special: null, // { <key>: { getter: f, $nodes: jQ, value: 4 }}
	//__events: null,
	isMK: true,
	/**
	 * @private
	 * @member {boolean} Matreshka#isMKInitialized
	 * @summary Using for lazy initialization
	 */
	isMKInitialized: false,

	on: function( names, callback, triggerOnInit, context, evtData ) {
		return magic.on( this, names, callback, triggerOnInit, context, evtData );
	},

	onDebounce: function( names, callback, debounceDelay, triggerOnInit, context, evtData ) {
		return magic.onDebounce( this, names, callback, debounceDelay, triggerOnInit, context, evtData );
	},

	_on: function( name, callback, context, evtData ) {
		return magic._on( this, name, callback, context, evtData );
	},


	once: function ( names, callback, context ) {
		return magic.once( this, names, callback, context );
	},

	off: function( names, callback, context ) {
		return magic.off( this, names, callback, context );
	},

	_off: function( name, callback, context ) {
		return magic._off( this, name, callback, context );
	},


	trigger: function() {
		var args = magic.toArray( arguments );
		args.unshift( this );
		return magic.trigger.apply( magic, args );
	},

	_trigger: function() {
		var args = magic.toArray( arguments );
		args.unshift( this );
		return magic._trigger.apply( magic, args );
	},

	bindNode: function( key, node, binder, evt, optional ) {
		return magic.bindNode( this, key, node, binder, evt, optional );
	},

	bindOptionalNode: function( key, node, binder, evt ) {
		return magic.bindOptionalNode( this, key, node, binder, evt );
	},

	unbindNode: function( key, node, evt ) {
		return magic.unbindNode( this, key, node, evt );
	},

	boundAll: function( key ) {
		return magic.boundAll( this, key );
	},

	$bound: function( key ) {
		return magic.boundAll( this, key );
	},

	bound: function( key ) {
		return magic.bound( this, key );
	},

	selectAll: function( s ) {
		return magic.selectAll( this, s );
	},

	$: function( s ) {
		return magic.selectAll( this, s );
	},

	select: function( s ) {
		return magic.select( this, s );
	},

	/**
	 * @private
	 * @method Matreshka#_defineSpecial
	 * @todo Defines needed descriptor for given key
	 */
	_defineSpecial: function( key ) {
		return magic._defineSpecial( this, key );
	},

	eq: function( object ) { // @IE8
		return typeof object == 'object' && object !== null && this.__id == object.__id;
	},

	defineGetter: function( key, getter ) {
		var _this = this._initMK(),
			__special,
			i;
		if( typeof key == 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				_this.defineGetter( i, key[ i ] );
			}
			return _this;
		}

		__special = _this._defineSpecial( key );
		__special.getter = function() {
			return getter.call( _this, {
				value: __special.value,
				key: key,
				self: _this
			});
		};

		return _this;
	},

	defineSetter: function( key, setter ) {
		var _this = this._initMK(),
			i;
		if( typeof key == 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				_this.defineSetter( i, key[ i ] );
			}
			return _this;
		}

		_this._defineSpecial( key ).setter = function( v ) {
			return setter.call( _this, v, {
				value: v,
				key: key,
				self: _this
			});
		};

		return _this;
	},

	mediate: function( keys, mediator ) {
		return magic.mediate( this, keys, mediator );
	},

	linkProps: function( key, keys, getter, setOnInit ) {
        return magic.linkProps( this, key, keys, getter, setOnInit );

		/*var keys = typeof keys == 'string' ? keys.split( /\s/ ) : keys,
			on_Change = function( evt ) {
				var values = [],
					_protect = evt._protect = evt._protect || evt.key + this.__id;

				if( _protect !== key + self.__id ) {
					if( typeof keys[ 0 ] == 'object' ) {
						for( i = 0; i < keys.length; i += 2 ) {
							_this = keys[ i ];

							_keys = typeof keys[ i + 1 ] == 'string' ? keys[ i + 1 ].split( /\s/ ) : keys[ i + 1 ];
							for( j = 0; j < _keys.length; j++ ) {
								values.push( _this[ _keys[ j ] ] );
							}
						}
					} else {
						for( i = 0; i < keys.length; i++ ) {
							_key = keys[ i ];
							_this = self;
							values.push( _this[ _key ] );
						}
					}
					self.set( key, getter.apply( self, values ), extend({}, evt, {
						fromDependency: true
					}));
				}

			},
			_this, _key, _keys, i, j,
			self = this._initMK();
		getter = getter || function( value ) { return value; };


		if( typeof keys[ 0 ] == 'object' ) {
			for( i = 0; i < keys.length; i += 2 ) {
				_this = keys[ i ]._initMK();
				_keys = typeof keys[ i + 1 ] == 'string' ? keys[ i + 1 ].split( /\s/ ) : keys[ i + 1 ];
				for( j = 0; j < _keys.length; j++ ) {
					_this._defineSpecial( _keys[j] );
					_this._on( '_rundependencies:' + _keys[j], on_Change );
				}
			}
		} else {
			for( i = 0; i < keys.length; i++ ) {
				_key = keys[ i ];
				_this = this;
				_this._defineSpecial( _key );
				_this._on( '_rundependencies:' + _key, on_Change );
			}
		}

		setOnInit !== false && on_Change.call( typeof keys[ 0 ] == 'object' ? keys[ 0 ] : this, {
			key: typeof keys[ 0 ] == 'object' ? keys[ 1 ] : keys[ 0 ]
		});

		return this;*/
	},

	get: function( key ) {
		return this[ key ];
	},

	set: function( key, v, evt ) {
		return magic.set( this, key, v, evt );
	},

	remove: function( key, evt ) {
		return magic.remove( object, key, evt );
	},

	define: function( key, descriptor ) {
		var _this = this,
            p;

		if( typeof key == 'object' ) {
			for( p in key ) {
				_this.define( p, key[ p ] );
			}
			return _this;
		}

		Object.defineProperty( _this, key, descriptor );

		return _this;
	},

	delay: function( f, delay, thisArg ) {
		var _this = this;
		if( typeof delay == 'object' ) {
			thisArg = delay;
			delay = 0;
		}

		setTimeout( function() {
			f.call( thisArg || _this );
		}, delay || 0 );

		return _this;
	},

	/**
	 * @method Matreshka#_initMK
	 * @private
	 */
	_initMK: function() {
		var _this = magic.initMK( this );

        _this.nodes = _this.nodes = {};
        _this.$nodes = _this.$nodes = {};
        _this.sandbox = _this.sandbox || null;
        _this.$sandbox = _this.$sandbox || MK.$();

        return this;
	},

	toString: function() {
		return '[object Matreshka]'
	},

	constructor: function Matreshka() {
		this._initMK();
	},

	getAnswerToTheUltimateQuestionOfLifeTheUniverseAndEverything: function() {
		this.delay( function() {
			alert( 42 );
		}, 1000*60*60*24*365.25*7.5e6 );
	}
});


extend( MK, magic, {

	version: 'dev',

	Class: Class,

	isXDR: Class.isXDR,

	to: function to( data ) {
		var result,
			i;
		if( typeof data == 'object' ) {
			if( 'length' in data ) {
				result = [];
				for( i = 0; i < data.length; i++ ) {
					result[ i ] = to( data[ i ] );
				}
				result = new MK.Array().recreate( result );
			} else {
				result = {};
				for( i in data ) if( data.hasOwnProperty( i ) ) {
					result[i] = to( data[ i ] );
				}
				result = new MK.Object( result )
			}
		} else {
			result = data;
		}

		return result;
	}
});




return MK;
}));
