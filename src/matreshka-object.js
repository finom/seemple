"use strict";
(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define( [ 'matreshka_dir/matreshka-core'], factory );
    } else {
        factory( root.MK );
    }
}(this, function ( MK ) {
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	var sym = MK.sym,
        i,

	prototype = {
		'extends': MK,
		isMKObject: true,
		renderer: null,
		constructor: function MatreshkaObject( object ) {
			this.jset( object );
		},

		keys: function() {
			var _this = this._initMK(),
                keys = _this[ sym ].keys,
				result = [],
				p;

			for( p in keys ) if( keys.hasOwnProperty( p ) ) {
				result.push( p );
			}

			return result;
		},

		/**
		 * @method Matreshka.Object#_initMK
		 * @private
		 */
		_initMK: function() {
			var _this = this;
			if( _this[ sym ] ) return _this;

			MK.prototype._initMK.call( _this, arguments );

            _this[ sym ].keys = {};

			return _this
				._on( 'delete', function( evt ) {
					if( !evt || !evt.silent ) {
						_this._trigger( 'modify', evt );
					}
				})
				._on( 'change', function( evt ) {
					if( evt && ( evt.key in _this[ sym ].keys ) && !evt.silent ) {
						_this._trigger( 'modify', evt );
					}
				})
			;
		},


		/*_on: function( name, callback, context, xtra ) {
			var _this = this._initMK(),
				f;

			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				f = function( evt ) {
					var target = _this[ evt.key ];
					if( target && target.isMK && evt && ( evt.key in _this[ sym ].keys ) ) {
						target._on( name, callback, context || _this );
					}
				};

				_this.each( function( item ) {
					item && item.isMK && item._on( name, callback, context || _this );
				}, _this );

				f._callback = callback;
				_this._on( 'change', f, _this, name );
			} else {
				MK.prototype._on.call( _this, name, callback, context, xtra );
			}

			return this;
		},

		_off: function( name, callback, context ) {
			var _this = this._initMK(),
				removeevents;
			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				if( callback ) {
					_this.off( 'change', callback, context );
				} else {
					events = _this.__events.change || [];
					for( var i = 0; i < events.length; i++ ) {
						if( events[ i ].xtra == name ) {
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
		},*/


		hasOwnProperty: function( key ) {
			return this._initMK()[ sym ].keys.hasOwnProperty( key );
		},


		toObject: function() {
			var _this = this._initMK(),
				o = {},
				keys = _this[ sym ].keys,
				p;
			for( p in keys ) if( keys.hasOwnProperty( p ) ) {
				o[ p ] = _this[ p ];
			}
			return o;
		},


		toNative: function() {
			return this.toObject();
		},


		toJSON: function() {
			var _this = this._initMK(),
				JSON = {},
				keys = _this[ sym ].keys,
                p;

			for( p in keys ) if( keys.hasOwnProperty( p ) ) {
				JSON[ p ] = _this[ p ] && _this[ p ].toJSON ? _this[ p ].toJSON() : _this[ p ];
			}
			return JSON;
		},


		keyOf: function( o ) {
			var _this = this._initMK(),
				keys = _this[ sym ].keys,
				p;

			for( p in keys ) if( keys.hasOwnProperty( p ) ) {
				if( o && o.isMK ) {
					if( o.eq( _this[ p ] ) ) {
						return p;
					}
				} else if( o === _this[ p ] ) {
					return p;
				}
			}

			return null;
		},


		jset: function( key, v, evt ) {
			var _this = this._initMK(),
				type = typeof key;

			if( type == 'undefined' ) return _this;

			if( type == 'object' ) {
				key = key.toJSON ? key.toJSON() : key;
				for( i in key ) {
					_this.jset( i, key[ i ], v );
				}
				return _this;
			}

			_this[ sym ].keys[ key ] = 1;

			_this._defineSpecial( key );

			return _this.set( key, v, evt );
		},

		remove: function( key, evt ) {
			this.removeDataKeys( key );
			return MK.prototype.remove.call( this, key, evt );
		},

		addDataKeys: function( keys ) {
			var _this = this._initMK();
			if( !arguments.length ) return _this;
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : String( keys ).split( /\s/ );
			for( i = 0; i < keys.length; i++ ) {
				_this[ sym ].keys[ keys[ i ] ] = 1;
				_this._defineSpecial( keys[ i ] );
			}
			return _this;
		},

		removeDataKeys: function( keys ) {
			var _this = this._initMK();
			if( !arguments.length ) return _this;
			keys = arguments.length > 1 ? arguments : keys instanceof Array ? keys : String( keys ).split( /\s/ );
			for( i = 0; i < keys.length; i++ ) {
				delete _this[ sym ].keys[ keys[ i ] ];
			}
			return _this;
		},

		each: function( callback, thisArg ) {
			var _this = this._initMK(),
				p;
			for( p in _this[ sym ].keys ) if( _this[ sym ].keys.hasOwnProperty( p ) ) {
				callback.call( thisArg, _this[ p ], p, _this );
			}

			return _this;
		}
	};


	prototype[ typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator' ] = function() {
		var _this = this,
			keys = _this.keys(),
			i = 0;

		return {
			next: function() {
				if ( i > keys.length - 1 ) {
					return { done: true };
				} else {
					return { done: false, value: _this[ keys[ i++ ] ] };
				}
			}
		};
	};

	return MK.Object = MK.Class( prototype );
}));
