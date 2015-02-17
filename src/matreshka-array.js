"use strict";
(function (root, factory) {
    if (typeof define == 'function' && define.amd) {
        define( [ 'matreshka_dir/matreshka-core' ], factory );
    } else {
        factory( root.MK );
    }
}(this, function ( MK ) {
	"use strict";
	
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	
	var Array_prototype = Array.prototype,
		slice = Array_prototype.slice,
		// Array methods flags
		SIMPLE = 1,
		RETURNS_NEW_ARRAY = 2,
		RETURNS_NEW_TYPE = 3,
		MODIFIES = 4,
		MODIFIES_AND_RETURNS_NEW_TYPE = 5,
		SPLICE = 6,
		silentFlag = { silent: true, dontRender: true, skipMediator: true },
		throwDeprecated = function( oldM, newM ) {
			MK.throwDeprecated( '.Array' + oldM, '.Array' + newM );
		}, // uses in for
		createDeprecatedMethod = function( oldM, newM ) {
			return function() {
				throwDeprecated( oldM, newM );
				return this[ newM ].apply( this, slice.call( arguments ).concat({ silent: true }) )
			}
		},
		compare = function( a1, a2 ) {
			if ( a1.length != a2.length )
				return false;

			for (var i = 0, l = a1.length; i < l; i++) {
				if (a1[i] && a1[i].isMK && a1[i].eq(a2[i]) || a1[i] !== a2[i]) { 
					return false;   
				}           
			}
			return true;
		},
		indexOf = MK.isXDR ? function( sought ) {
			var _this = this,
				i, item,
				isMK = sought && sought.isMK;
				
			for( i = 0; i < _this.length; i++ ) {
				item = _this[i];
				if( isMK ? sought.eq( item ) : sought === item ) {
					return i;
				}
			}
			
			return -1;
		} : Array_prototype.indexOf,
		lastIndexOf = MK.isXDR ? function ( sought ) {
			var _this = this,
				i, item,
				isMK = sought && sought.isMK;
				
			for( i = _this.length - 1; i >= 0; i-- ) {
				item = _this[i];
				if( isMK ? sought.eq( item ) : sought === item ) {
					return i;
				}
			}
			
			return -1;
		} : Array_prototype.lastIndexOf,
	
	/**
	 * @function createArrayMethod
	 * @private
	 * @desc Creates function that works similar to original array function
	 * @param {number} type - function type (see above)
	 * @param {string} name - a name of a method that we want to "clone"
	 * @param {boolean} silent - uses for MODIFIES functions and say that event hasn't be triggered
	 * @example 
	 * createArrayMethod( MODIFIES, 'push', true );
	 */
	createArrayMethod = function( type, name, hasOptions ) {
		var i;
		
		if( type == SIMPLE ) {
			return function() {
				Array_prototype[ name ].apply( this.toArray(), arguments );
				return this;
			};
		} else if( type == RETURNS_NEW_ARRAY ) {
			return function() {
				return new MK.Array().recreate( Array_prototype[ name ].apply( this.toArray(), arguments ), silentFlag );
			};
		} else if( type == RETURNS_NEW_TYPE ) {
			return function() {
				return Array_prototype[ name ].apply( this.toArray(), arguments );
			};
		} else if( type == MODIFIES ) {
			return function() {
				var _this = this,
					_arguments = arguments,
					args = slice.call( _arguments, hasOptions ? -1 : 0 ),
					evt = hasOptions ? _arguments[ _arguments.length - 1 ] || {} : {},
					array = _this.toArray(),
					returns = Array_prototype[ name ].apply( array, args );
				
				if( !compare( _this, array ) ) {
					_this.recreate( array, silentFlag );
					
					evt = MK.extend({
						returns: returns,
						args: args,
						originalArgs: slice.call( _arguments ),
						method: name,
						self: _this
					}, evt );
					
					if( !evt.silent ) {
						_this._trigger( name, evt );
					}
					
					if( !evt.dontRender ) {
						_this.processRendering( evt );
					}
				}
				
				return _this;
			};
		} else if( type == MODIFIES_AND_RETURNS_NEW_TYPE ) {
			return function() {
				var _this = this,
					_arguments = arguments,
					args = slice.call( _arguments, 0, hasOptions ? -1 : _arguments.length ),
					evt = hasOptions ? _arguments[ _arguments.length - 1 ] || {} : {},
					array = _this.toArray(),
					returns;
				
				if( !evt.skipMediator && typeof _this._itemMediator == 'function' && ( name == 'unshift' || name == 'push' ) ) {
					for( i = 0; i < args.length; i++ ) {
						args[ i ] = _this._itemMediator.call( _this, args[ i ], i );
					}
				}
				
				returns = Array_prototype[ name ].apply( array, args );
				
				if( !compare( _this, array ) ) {
					_this.recreate( array, silentFlag );

					evt = MK.extend({
						returns: returns,
						args: args,
						originalArgs: slice.call( _arguments ),
						method: name,
						self: _this
					}, evt );
					
					if( !evt.silent ) {
						_this._trigger( name, evt );
					}
					if( !evt.dontRender ) {
						_this.processRendering( evt );
					}
				}
				return returns;
			};
		} else if( type == SPLICE ) { // the combination of returnsnew and modify
			return function() {
				var _this = this,
					_arguments = arguments,
					args = slice.call( _arguments, hasOptions ? -1 : 0 ),
					evt = hasOptions ? _arguments[ _arguments.length - 1 ] || {} : {},
					array = _this.toArray(),
					returns;
				
				if( !evt.skipMediator && typeof _this._itemMediator == 'function' ) {
					for( i = 2; i < args.length; i++ ) {
						args[ i ] = _this._itemMediator.call( v, args[ i ], i );
					}
				}
				
				returns = Array_prototype[ name ].apply( array, args );
				
				if( !compare( _this, array ) ) {
					_this.recreate( array, silentFlag );
					
					evt = MK.extend({
						returns: returns,
						args: args,
						originalArgs: slice.call( _arguments ),
						method: name,
						self: _this
					}, evt );
					
					if( !evt.silent ) {
						_this._trigger( name, evt );
					}
					
					if( !evt.dontRender ) {
						_this.processRendering( evt );
					}
				}
				
				return new MK.Array().recreate( returns, silentFlag );
			};
		}
	},
	
	prototype = {
		'extends': MK,
		isMKArray: true,
		length: 0,
		itemRenderer: null,
		renderIfPossible: true,
		useBindingsParser: false,
		Model: null,
		constructor: function( length ) {
			var _this = this._initMK(),
				al = arguments.length,
				i;
			if( al == 1 && typeof length == 'number' ) {
				_this.length = length;
			} else {
				for( i = 0; i < al; i++ ) {
					_this[ i ] = arguments[ i ];
				}
				_this.length = arguments.length;
			}
		},
		
		mediateItem: function( itemMediator ) {
			var _this = this, i;
			_this._itemMediator = itemMediator;
			for( i = 0; i < _this.length; i++ ) {
				_this[ i ] = itemMediator.call( _this, _this[ i ], i );
			}
			return _this;
		},
		
		setItemMediator: function() {
			throwDeprecated( '#setItemMediator', '#mediateItem' );
			return this.mediateItem.apply( this, arguments );
		},
		
		_on: function( name, callback, context, xtra ) {
			var _this = this._initMK(),
				f;
				
			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				f = function( evt ) {
					( evt && evt.added ? evt.added : _this ).forEach( function( item ) {
						item && item.isMK && item._on( name, callback, context || _this );
					});
				};
				
				f._callback = callback;
				_this._on( 'add', f, _this, name );
				f.call( context || _this );
			} else {
				MK.prototype._on.call( _this, name, callback, context, xtra );
			}
			
			return this;
		},
		
		_off: function( name, callback, context ) {
			var _this = this._initMK(),
				events,
				i;
				
			if( name.indexOf( '@' ) == 0 ) {
				name = name.slice( 1 );
				if( callback ) {
					_this.off( 'add', callback, context );
				} else {
					events = _this.__events.add || [];
					for( i = 0; i < events.length; i++ ) {
						if( events[ i ].xtra == name ) {
							_this.off( 'add', events[ i ].callback );
						}
					}
				}
				
				_this.forEach( function( item ) {
					item.isMK && item.off( name, callback, context );
				}, _this );
			} else {
				MK.prototype._off.call( _this, name, callback, context );
			}
			
			return this;
		},
		
		createFrom: function( array ) {
			throwDeprecated( '#createFrom', '#recreate' );
			return this.recreate( array );
		},
		
		silentCreateFrom: function( array ) {
			throwDeprecated( '#silentCreateFrom', '#recreate' );
			return this.recreate( array, {
				silent: true
			});
		},
		
		recreate: function( array, evt ) {
			array = array || [];
			var _this = this,
				diff = _this.length - array.length,
				was = _this.toNative(),
				prepared,
				i,
				added, removed, now;
				
			evt = evt || {};
			
			if( _this._itemMediator && !evt.skipMediator ) {
				prepared = [];
				for( i = 0; i < array.length; i++ ) {
					prepared[ i ] = _this._itemMediator.call( _this, array[ i ], i );
				}
				array = prepared;
			}
			
			for( i = 0; i < array.length; i++ ) {
				_this[ i ] = array[ i ];
			}
			
			for( i = 0; i < diff; i++ ) {
				_this.remove( i + array.length, { silent: true });
			}
			
			_this.length = array.length;
			
			now = _this.toNative();
			
			removed = was.length ? was.filter( function( item ) {
				return !~indexOf.call( now, item );
			}) : [];
			
			added = now.length ? now.filter( function( item ) {
				return !~indexOf.call( was, item );
			}) : [];
			
			evt = MK.extend({
				added: added,
				removed: removed,
				was: was,
				now: now,
				method: 'recreate',
				self: _this
			}, evt );
			
			if( !evt.silent ) {
				added.length && _this._trigger( 'add', evt );
				removed.length && _this._trigger( 'remove', evt );
				( added.length || removed.length ) && _this._trigger( 'recreate', evt );
			}
			
			if( !evt.dontRender ) {
				_this.processRendering( evt );
			}
			
			return _this;
		},
		
		
		toArray: function() {
			var _this = this._initMK(),
				array,
				i;
			try {
				return slice.call( _this );
			} catch( e ) {
				array = [];
				for( i = 0; i < _this.length; i++ ) {
					array[ i ] = _this[ i ];
				}
				return array;
			}
		},
		
		
		toNative: function() {
			return this.toArray();
		},
		
		/**
		 * @method Matreshka.Array#_initMK
		 * @private
		 */
		_initMK: function() {
			var _this = this;
			
			if( _this.isMKInitialized ) return _this;
				
			return MK.prototype._initMK.call( _this )
				.on( 'change:Model', function() {
					var Model = _this.Model;
					if( Model ) {
						_this.mediateItem( function( item ) {
							return !item || !item.isMK || !item.instanceOf( Model ) ? new Model( item && item.toJSON ? item.toJSON() : item, _this ) : item;
						});
					}
				}, true )
				.on( 'pull pop shift splice', function( evt ) {
					if( evt && evt.returns ) {
						if( evt.method == 'splice' ) {
							if( evt.returns.length ) {
								_this._trigger( 'remove', MK.extend( { removed: evt.returns }, evt ) );
							}
						} else {
							_this._trigger( 'remove', MK.extend( { removed: [ evt.returns ] }, evt ) );
						}
					}
				})
				.on( 'push unshift splice', function( evt ) {
					var added;
					if( evt && evt.args && evt.args.length ) {
						if( evt.method == 'splice' ) {
							added = slice.call( evt.args, 2 );
							if( added && added.length ) {
								_this._trigger( 'add', MK.extend( { added: added }, evt ) );
							}
						} else {
							_this._trigger( 'add', MK.extend( { added: evt.args }, evt ) );
						}
					}
				})
				.on( 'add remove sort reverse', function( evt ) {
					evt.added = evt.added || [];
					evt.removed = evt.removed || [];
					_this._trigger( 'modify', evt );
				})
				.on( 'add', function( evt ) {
					var _this = this,
						added = evt && evt.added;
					if( added && _this.__events.addone ) {
						added.forEach( function( item ) {
							_this._trigger( 'addone', {
								self: _this,
								added: item
							});
						});
					}
				})
				.on( 'remove', function( evt ) {
					var _this = this,
						removed = evt && evt.removed;
					if( removed && _this.__events.removeone ) {
						removed.forEach( function( item ) {
							_this._trigger( 'removeone', {
								self: _this,
								removed: item
							});
						});
					}
				})
			;
		},
		
		/**
		 * @private
		 * @since 0.1
		 */
		_renderOne: function( item ) {
			var _this = this,
				__id = _this.__id,
				renderer = item.renderer || _this.itemRenderer,
				rendererContext = renderer === item.renderer ? item: _this,
				bound = item.bound( __id ),
				el,
				$el,
				template;
				
			if( !item[ __id ] ) {
				item[ __id ] = _this;
			}
			
			if( !bound ) {
				if( typeof renderer == 'function' ) {
					renderer = renderer.call( rendererContext, item );
				}
				
				if( typeof renderer == 'string' && !~renderer.indexOf( '<' ) && !~renderer.indexOf( '{{' ) ) {
					template = rendererContext._getNodes( renderer );
					if( template = template && template[0] ) {
						template = template.innerHTML;
					} else {
						throw Error( 'renderer element is missing: ' + renderer );
					}
				} else {
					template = renderer;
				}
				
				$el = _this.useBindingsParser
					? item._parseBindings( template ) 
					: ( typeof template == 'string' ? MK.$.parseHTML( template.replace( /^\s+|\s+$/g, '' ) ) : MK.$( template ) );
				
				if( item && item.isMK && item.bindRenderedAsSandbox !== false && $el.length ) {
					item.bindNode( 'sandbox', $el );
				}
				
				item.bindNode( __id, $el );
		
				item._trigger( 'render', {
					element: $el[ 0 ],
					elements: $el,
					self: item,
					parentArray: _this
				});
				
				bound = item.bound( __id );
			} 
			
			return bound;
		},
		
		processRendering: function( evt ) {
			var _this = this,
				__id = _this.__id,
				container = container = _this.bound( 'container' ) || _this.bound(),
				destroyOne = function( item ) {
					if( item && item.isMK ) {
						var el = item.bound( __id );
						item.remove( __id, { silent: true });
						return el;
					}
				},
				renderOne = function( item ) {
					return item
						&& item.isMK
						&& _this.renderIfPossible 
						&& container 
						&& ( !evt || !evt.dontRender ) 
						&& ( _this.itemRenderer || item && item.renderer )
						&& _this._renderOne( item );
				},
				el,
				i;
			
			switch ( evt.method ) {
				case 'push':
					for( i = _this.length - evt.args.length; i < _this.length; i++ ) {
						if( el = renderOne( _this[ i ] ) ) {
							container.appendChild( el );
						}
					}
					break;
				case 'pull': case 'pop': case 'shift':
					if( el = destroyOne( evt.returns ) ) {
						el.parentNode.removeChild( el );
					}
					break;
				case 'unshift':
					for( i = evt.args.length - 1; i + 1; i-- ) {
						if( el = renderOne( _this[ i ] ) ) {
							if( container.children ) {
								container.insertBefore( el, container.firstChild );
							} else {
								container.appendChild( el );
							}
						}
					}
					break;
				case 'sort': case 'reverse':
					for( i = 0; i < _this.length; i++ ) {
						if( el = _this[ i ].bound( __id ) ) {
							container.appendChild( el );
						}
					}
					break;
				case 'rerender':
					for( i = 0; i < _this.length; i++ ) {
						if( el = renderOne( _this[ i ] ) ) {
							container.appendChild( el );
						}
					}
					break;
				case 'splice':
					for( i = 0; i < evt.returns.length; i++ ) {
						if( el = destroyOne( evt.returns[ i ] ) ) {
							el.parentNode.removeChild( el )
						}
					}
					for( i = 0; i < _this.length; i++ ) {
						if( el = renderOne( _this[ i ] ) ) {
							container.appendChild( el );
						}
					}
					break;
				case 'recreate':
					for( i = 0; i < evt.removed.length; i++ ) {
						if( el = destroyOne( evt.removed[ i ] ) ) {
							container.removeChild( el );
						}
					}
					
					for( i = 0; i < _this.length; i++ ) {
						if( el = renderOne( _this[ i ] ) ) {
							container.appendChild( el );
						}
					}
					break;
			}
			
			return _this;
		},
		
		
		rerender: function() {
			return this.processRendering({
				method: 'rerender'
			});
		},
		
		
		hasOwnProperty: function( p ) {
			return p == 'length' || p < this.length && p >= 0;
		},
		
		
		toJSON: function() {
			var JSON = [];
			for( var i = 0; i < this.length; i++ ) {
				this[ i ] && this[ i ].toJSON ? JSON.push( this[ i ].toJSON() ) : JSON.push( this[ i ] );
			}
			return JSON;
		},
		
		
		concat: function() {
			var args = arguments,
				result = this.toArray(),
				arg,
				i,
				j;
			for( i = 0; i < args.length; i++ ) {
				arg = args[ i ];
				if( arg instanceof Array || arg && arg.instanceOf && arg.instanceOf( MK.Array ) ) {
					for( j = 0; j < arg.length; j++ ) {
						result.push( arg[ i ] );
					}
				}
			}
			
			return new MK.Array().recreate( result );
		},
		
		
		
		pull: function( index, evt ) {
			var _this = this,
				array = _this.toArray(),
				_index = index,
				type = typeof index,
				returns;
			
			if( type != 'number' && type != 'string' ) {
				index = _this.indexOf( index );
				if( !~index ) {
					return null;
				}
			}
			
			returns = array.splice( index, 1 )[ 0 ] || null;
			
			if( !compare( array, _this ) ) {
				evt = evt || {};
				
				_this.recreate( array, silentFlag );
				
				evt = MK.extend({
					returns: returns,
					args: [ _index ],
					method: 'pull',
					self: _this
				}, evt );
				
				if( !evt.silent ) {
					_this._trigger( 'pull', evt );
				}
				
				_this.processRendering( evt );
			}
		
			return returns;
		},
		
		silentPull: createDeprecatedMethod( 'silentPull', 'pull' ),
		push: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'push' ),
		pop: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'pop' ),
		unshift: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'unshift' ),
		shift: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'shift' ),
		sort: createArrayMethod( MODIFIES, 'sort' ), // @warning @todo third argument is not __this__
		reverse: createArrayMethod( MODIFIES, 'reverse' ),
		splice: createArrayMethod( SPLICE, 'splice' ),
		push_: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'push', true ),
		pop_: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'pop', true ),
		unshift_: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'unshift', true ),
		shift_: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'shift', true ),
		sort_: createArrayMethod( MODIFIES, 'sort', true ), // @warning @todo third argument is not __this__
		reverse_: createArrayMethod( MODIFIES, 'reverse', true ),
		splice_: createArrayMethod( SPLICE, 'splice', true ),
		silentPush: createDeprecatedMethod( 'silentPush', 'push_' ),
		silentPop: createDeprecatedMethod( 'silentPop', 'pop_' ),
		silentUnshift: createDeprecatedMethod( 'silentUnshift', 'unshift_' ),
		silentShift: createDeprecatedMethod( 'silentShift', 'shift_' ),
		silentSort: createDeprecatedMethod( 'silentSort', 'sort_' ),
		silentReverse: createDeprecatedMethod( 'silentReverse', 'reverse_' ),
		silentSplice: createDeprecatedMethod( 'silentSplice', 'splice_' ),
		map: createArrayMethod( RETURNS_NEW_ARRAY, 'map' ), // @warning @todo third argument is not __this__
		filter: createArrayMethod( RETURNS_NEW_ARRAY, 'filter' ), // @warning @todo third argument is not __this__
		slice: createArrayMethod( RETURNS_NEW_ARRAY, 'slice' ),
		every: createArrayMethod( RETURNS_NEW_TYPE, 'every' ), // @warning @todo third argument is not __this__
		some: createArrayMethod( RETURNS_NEW_TYPE, 'some' ), // @warning @todo third argument is not __this__
		reduce: createArrayMethod( RETURNS_NEW_TYPE, 'reduce' ), // @warning @todo third argument is not __this__
		reduceRight: createArrayMethod( RETURNS_NEW_TYPE, 'reduceRight' ), // @warning @todo third argument is not __this__
		forEach: createArrayMethod( SIMPLE, 'forEach' ), // @warning @todo third argument is not __this__
		each: createArrayMethod( SIMPLE, 'forEach' ), // @warning @todo third argument is not __this__
		toString: createArrayMethod( RETURNS_NEW_TYPE, 'toString' ),
		join: createArrayMethod( RETURNS_NEW_TYPE, 'join' ),
		// es5-shim doesn't help with indexOf and lastIndexOf
		indexOf: indexOf,
		lastIndexOf: lastIndexOf
	};
	
	prototype[ typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator' ] = function() {
		var _this = this,
			i = 0;
		return {
			next: function() {
				if ( i > _this.length - 1 ) {
					return { done: true };
				} else {
					return { done: false, value: _this[ i++ ] };
				}
			}
		};
	};
	
	return MK.Array = MK.Class( prototype );
}));