"use strict";
( function( MK, Array_prototype ) {
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	
	// Array methods flags
	var SIMPLE = 1,
		RETURNS_NEW_ARRAY = 2,
		RETURNS_NEW_TYPE = 3,
		MODIFIES = 4,
		MODIFIES_AND_RETURNS_NEW_TYPE = 5,
		SPLICE = 6,
		i; // uses in for
	
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
	var	createArrayMethod = function( type, name, silent ) {
		if( !Array_prototype[ name ] ) {
			throw Error( 'There no such method: ' + name + '. If you\'re using Internet Explorer 8 you should use es5-shim: https://github.com/kriskowal/es5-shim' );
		}
		if( type === SIMPLE ) {
			return function() {
				var array = this.toArray();
				Array_prototype[ name ].apply( array, arguments );
				return this;
			};
		} else if( type === RETURNS_NEW_ARRAY ) {
			return function() {
				var array = this.toArray(),
					returns = Array_prototype[ name ].apply( array, arguments );
					return new MK.Array().silentCreateFrom( returns );
			};
		} else if( type === RETURNS_NEW_TYPE ) {
			return function() {
				var array = this.toArray();
				return Array_prototype[ name ].apply( array, arguments );
			};
		} else if( type === MODIFIES ) {
			return function() {
				var args = [].slice.call( arguments ),
					array = this.toArray(),
					returns;
				
				if( typeof this._itemMediator === 'function' && ( name === 'unshift' || name === 'push' ) ) {
					for( var i = 0; i < args.length; i++ ) {
						args[ i ] = this._itemMediator.call( this, args[ i ], i );
					}
				}
				
				returns = Array_prototype[ name ].apply( array, args );
				
				this.silentCreateFrom( array );
				if( !silent ) {
					this.trigger( name, {
						returns: returns,
						args: args,
						originalArgs: [].slice.call( arguments ),
						method: name
					});
				}
				return this;
			};
		} else if( type === MODIFIES_AND_RETURNS_NEW_TYPE ) {
			return function() {
				var array = this.toArray(),
					returns = Array_prototype[ name ].apply( array, arguments );
				this.silentCreateFrom( array );
				if( !silent ) {
					this.trigger( name, {
						returns: returns,
						args: [].slice.call( arguments ),
						method: name
					});
				}
				return returns;
			};
		} else if( type === SPLICE ) { // the combination of returnsnew and modify
			return function() {
				var args = [].slice.call( arguments ),
					array = this.toArray(),
					returns;
				
				if( typeof this._itemMediator === 'function' ) {
					for( i = 2; i < args.length; i++ ) {
						args[ i ] = this._itemMediator.call( this, args[ i ], i );
					}
				}
				
				returns = Array_prototype[ name ].apply( array, args );
				
				this.silentCreateFrom( array );

				if( !silent ) {
					this.trigger( name, {
						returns: returns,
						args: args,
						originalArgs: [].slice.call( arguments ),
						method: name
					});
				}
				return new MK.Array().silentCreateFrom( returns );
			};
		}
	};
	
	/**
	 * @class Matreshka.Array
	 * @author Andrey Gubanov <a@odessite.com.ua>
	 * @license {@link https://raw.github.com/finom/matreshka/master/LICENSE MIT}
	 * Version 2.0, January 2004
	 * @classdesc Matreshka Array class  (Matreshka "collection"). Extends {@link Matreshka}.
	 * @inherits Matreshka
	 * @example <caption>Basic usage</caption>
	 * new MK.Array;
	 * @example <caption>Passing length</caption>
	 * // creates Matreshka.Array instance with length = 42
	 * new MK.Array( 42 );
	 * @example <caption>Passing elements</caption>
	 * // creates Matreshka.Array instance with length = 2
	 * new MK.Array( 'Hi', { a: 'b' } );
	 * @example <caption>Inheritance</caption>
	 * var MyClass = Class({
	 *	'extends': MK.Array,
	 * 	constructor: function() {
	 * 		// calls MK.Array constructor with this context and given arguments
	 * 		MyClass.parent.constructor( this, arguments );
	 *	},
	 * 	method: function() {}
	 * });
	 */
	MK.Array = Class({
		'extends': MK,
		/**
		 * @member {boolean} Matreshka.Array#isMKArray
		 * @summary <code>isMKArray</code> is always </code>true</code>. It using for easy detecting Matreshka.Array instance.
		 */
		isMKArray: true,
		length: 0,
		/**
		 * @method Matreshka.Array#itemRenderer
		 * @since 0.1
		 * @summary Renderer for array items. 
		 * @desc This method equals to <code>null</code> by default. You can assign function that returns types below to make {@Matreshka Array} to be "smart array" that changes DOM automatically when data is changed. Check [live example]{@link http://finom.github.io/matreshka/examples/#mk.array_itemrenderer} to see how it works.
		 * @returns {string|Node|jQuery} HTML or element
		 */
		itemRenderer: null,
		/**
		 * @method Matreshka.Array#Model
		 * @since 0.2
		 * @private
		 * @experimental
		 * @summary Override this property to specify the model class that the collection contains.
		 * @desc This property equals to <code>null</code> by default.
		 * @example
		 * var MyModel = Class({
		 * 	'extends': MK.Object
		 * });
		 * var MyMKArray = Class({
		 * 	'extends': MK.Array,
		 * 	Model: MyModel
		 * });
		 */
		Model: null,
		constructor: function( length ) {
			this.initMK();
			var al = arguments.length;
			if( al === 1 && typeof length === 'number' ) {
				this.length = length;
			} else {
				for( var i = 0; i < al; i++ ) {
					this[ i ] = arguments[ i ];
				}
				this.length = arguments.length;
			}
		},
		/**
		 * @method Matreshka.Array#setItemMediator
		 * @since 0.1
		 * @summary Sets function that transforms items
		 * @desc This method is using when you want to keep your items to be a certain type (string, number, object...). Pay attention that new mediator overrides Model property
		 * @example 
		 * var mkArray = new MK.Array( 1, 2, 3, 4, 5 );
		 * mkArray.setItemMediator( function( value ) {
		 * 	return String( value );
		 * });
		 * mkArray.push( 6, 7 );
		 * mkArray.unshift( true, {} );
		 * 
		 * console.log( mkArray.toJSON() ); // [ "true", "[object Object]", "1", "2", "3", "4", "5", "6", "7" ]
		 */
		setItemMediator: function( itemMediator ) {
			this._itemMediator = itemMediator;
			for( var i = 0; i < this.length; i++ ) {
				this[ i ] = itemMediator.call( this, this[ i ], i );
			}
			return this;
		},
		/**
		 * @method Matreshka.Array#createFrom
		 * @fires recreate
		 * @fires modify
		 * @summary Creates self from another array 
		 * @desc If you have array or array-like object (e.g. arguments) you can convert it to MK.Array instance by this method
		 * @param {Array} array
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * new MK.Array().createFrom( [1, 2, 3, 4, 5] );
		 */
		createFrom: function( array ) {
			var evtOpts = {
				createdFrom: array,
				was: this.toNative()
			};

			
			return this
				.silentCreateFrom( array )
				.trigger( 'recreate', evtOpts )
			;
		},
		
		/**
		 * @method Matreshka.Array#silentCreateFrom
		 * @summary Creates self from another array 
		 * @desc Works similar to {@link Matreshka.Array#createFrom} but doesn't trigger events
		 * @param {Array} array
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * new MK.Array().silentCreateFrom( [1, 2, 3, 4, 5] );
		 */
		silentCreateFrom: function( array ) {
			var diff = this.length - array.length,
				prepared;
			
			if( this._itemMediator ) {
				prepared = [];
				for( var i = 0; i < array.length; i++ ) {
					prepared[ i ] = this._itemMediator.call( this, array[ i ], i );
				}
				array = prepared;
			}
			
			for( i = 0; i < array.length; i++ ) {
				this[ i ] = array[ i ];
			}
			
			for( i = 0; i < diff; i++ ) {
				this.remove( i + array.length, { silent: true });
			}
			
			
			
			this.length = array.length;
			return this;
		},
		
		/**
		 * @method Matreshka.Array#toArray
		 * @summary Converts MK.Array instance to Javascript Array
		 * @returns {Array} Array instance
		 * @example <caption>Basic usage</caption>
		 * this.toArray();
		 */
		toArray: function() {
			try {
				return Array_prototype.slice.call( this );
			} catch( e ) {
				var array = [];
				for( var i = 0; i < this.length; i++ ) {
					array[ i ] = this[ i ];
				}
				return array;
			}
		},
		
		/**
		 * @method Matreshka.Array#toNative
		 * @summary Does the same as MK.Array#toArray
		 * @returns {Array} Array instance
		 * @example <caption>Basic usage</caption>
		 * this.toNative();
		 */
		toNative: function() {
			return this.toArray();
		},
		
		/**
		 * @method Matreshka.Array#initMK
		 * @summary Initializes MK.Array instance
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * var MyClass = Class({
		 * 	'extends': MK.Array,
		 *  constructor: function() {
		 *  	this.initMK();
		 * 	}
		 * });
		 */
		initMK: function() {
			var _this = this,
				s_container = 'container';
			
			if( _this.Model ) {
				_this.setItemMediator( function( item ) {
					return !item || !item.isMK || !item.instanceOf( _this.Model ) ? new _this.Model( item, this ) : item;
				});
			}
				
			return MK.prototype.initMK.call( _this )
				.on( 'push', function( evt ) {
					var bound;
					if( _this.itemRenderer && evt ) {
						if( bound = _this.bound( s_container ) || _this.bound() ) {
							for( i = _this.length - evt.args.length; i < _this.length; i++ ) {
								bound.appendChild( _this.initDOMItem( _this[ i ] ).bound( _this.__id ) );
							}
						}
					}
				})
				.on( 'pull pop shift', function( evt ) {
					var el;
					if( _this.itemRenderer && evt && evt.returns ) {
						if( el = evt.returns.bound( _this.__id ) ) {
							el.parentNode.removeChild( el )
							_this.killDOMItem( evt.returns );
						}
					}
				})
				.on( 'unshift', function( evt ) {
					var bound,
						el;
					if( _this.itemRenderer && evt ) {
						if( bound = _this.bound( s_container ) || _this.bound() ) {
							for( i = evt.args.length - 1; i + 1; i-- ) {
								el = _this.initDOMItem( _this[ i ] ).bound( _this.__id );
								if( bound.children ) {
									bound.insertBefore( el, bound.firstChild );
								} else {
									bound.appendChild( el );
								}
								
							}
						}
					}
				})
				.on( 'sort reverse', function() {
					var bound,
						el;
					if( _this.itemRenderer ) {
						if( bound = _this.bound( s_container ) || _this.bound() ) {
							for( var i = 0; i < _this.length; i++ ) {
								if( el = _this[ i ].bound( _this.__id ) ) {
									bound.appendChild( el );
								}
							}
						}
					}
				})
				.on( 'splice', function( evt ) {
					var bound,
						el;
					if( _this.itemRenderer && evt && evt.returns ) {
						if( bound = _this.bound( s_container ) || _this.bound() ) {
							for( var i = 0; i < evt.returns.length; i++ ) {
								if( el = evt.returns[ i ].bound( _this.__id ) ) {
									el.parentNode.removeChild( el )
									_this.killDOMItem( evt.returns[ i ] );
								}
							}
							for( i = 0; i < this.length; i++ ) {
								bound.appendChild( _this.initDOMItem( _this[ i ] ).bound( _this.__id ) );
							}
						}
					}
				})
				.on( 'pull pop shift splice', function( evt ) {
					if( evt && evt.returns ) {
						if( evt.method === 'splice' ) {
							if( evt.returns.length ) {
								_this.trigger( 'remove', MK.extend( { removed: evt.returns }, evt ) );
							}
						} else {
							_this.trigger( 'remove', MK.extend( { removed: [ evt.returns ] }, evt ) );
						}
					}
				})
				.on( 'push unshift splice', function( evt ) {
					var added;
					if( evt && evt.args && evt.args.length ) {
						if( evt.method === 'splice' ) {
							added = [].slice.call( evt.args, 2 );
							if( added && added.length ) {
								_this.trigger( 'add', MK.extend( { added: added }, evt ) );
							}
						} else {
							_this.trigger( 'add', MK.extend( { added: evt.args }, evt ) );
						}
					}
				})
				.on( 'recreate', function( evt ) {
					var _this = this,
						added, removed, now, was, bound;
						
					if( was = evt && evt.was ) {
						now = this.toNative();
						
						if( was.length ) {
							removed = was.filter( function( item ) {
								return !~now.indexOf( item );
							});
							
							if( removed.length ) {
								_this.trigger( 'remove', MK.extend( { removed: removed }, evt ) );
							}
						}
						
						if( now.length ) {
							added = now.filter( function( item ) {
								return !~was.indexOf( item );
							});
							
							if( added.length ) {
								_this.trigger( 'add', MK.extend( { added: added }, evt ) );
							}
						}
					}
					
					if( _this.itemRenderer ) {
						if( bound = _this.bound( s_container ) || _this.bound() ) {
							if( removed ) {
								for( var i = 0; i < removed.length; i++ ) {
									bound.removeChild( removed[ i ].bound( _this.__id ) );
									_this.killDOMItem( removed[ i ] );
								}
							}
							
							for( i = 0; i < _this.length; i++ ) {
								bound.appendChild( _this.initDOMItem( _this[ i ] ).bound( _this.__id ) );
							}
						}
					}
					
				})
				.on( 'recreate pull push pop unshift shift splice sort reverse', function( evt ) {
					_this.trigger( 'modify', evt );
				})
			;
		},
		
		/**
		 * @private
		 * @since 0.1
		 */
		initDOMItem: function( item ) {
			var _this = this,
				__id = _this.__id,
				el,
				$el,
				template;
				
			if( !item[ __id ] ) {
				item[ __id ] = _this;
			}

			if( _this.itemRenderer && !item.bound( __id ) ) {
				template = _this.itemRenderer( item );
				$el = typeof template === 'string' ? MK.$.parseHTML( template ) : MK.$( template );
				item
					.bindElement( __id, $el )
					.trigger( 'render', {
						element: $el[ 0 ],
						elements: $el
					})
				;
				_this.trigger( 'itemrender', {
					element: $el[ 0 ],
					elements: $el,
					item: item
				});
			}
			
			return item;
		},
		
		/**
		 * @private
		 * @since 0.1
		 */
		killDOMItem: function( item ) {
			return item.remove( this.__id, { silent: true });
		},
		
		/**
		 * @method Matreshka.Array#initializeSmartArray
		 * @since 0.1
		 * @summary Initializes "smart array"
		 * @desc This method is only needed when you're setting {@Matreshka.Array#itemRenderer} property after some items are added.
		 * @returns {boolean}
		 * @example <caption>Basic usage</caption>
		 * var mkArray = new MK.Array;
		 * // DOM is not changing because itemRenderer is not assigned yet
		 * mkArray.push( ... );
		 * mkArray.itemRenderer = function() { '<div>MyDiv</div>' };
		 * // DOM is changing after initializeSmartArray execution
		 * mkArray.initializeSmartArray();
		 * @example <caption>When <code>initializeSmartArray</code> is not needed</caption>
		 * var mkArray = new MK.Array;
		 * // setting itemRenderer before adding any item to array
		 * mkArray.itemRenderer = function() { '<div>MyDiv</div>' };
		 * // DOM is changing after push, no need to use initializeSmartArray
		 * mkArray.push( ... );
		 */
		initializeSmartArray: function() {
			var _this = this,
				bound;
			if( _this.itemRenderer ) {
				if( bound = _this.bound( 'container' ) || _this.bound() ) {
					for( var i = 0; i < _this.length; i++ ) {
						bound.appendChild( _this.initDOMItem( _this[ i ] ).bound( _this.__id ) );
					}
				}
			}
		},
		
		/**
		 * @method Matreshka.Array#hasOwnProperty
		 * @summary Tells is given property defined in the instance
		 * @returns {boolean}
		 * @example <caption>Basic usage</caption>
		 * var mkArray = new MK.Array( 42 ); // creates array with length = 42
		 * mkArray.hasOwnProperty( 5 ); // true
		 * mkArray.hasOwnProperty( 100500 ); // false
		 * mkArray.hasOwnProperty( 'length' ); // true
		 * mkArray.hasOwnProperty( 'blah' ); // false
		 */
		hasOwnProperty: function( p ) {
			return p === 'length' || p < this.length && p >= 0;
		},
		
		/**
		 * @method Matreshka.Array#toJSON
		 * @summary Converts MK.Array instance to native object
		 * @desc Diferrence between toJSON and toArray is that toJSON tries to call toJSON method for inner objects 
		 * @returns {object}
		 * @example <caption>Basic usage</caption>
		 * var json = this.toJSON();
		 */
		toJSON: function() {
			var JSON = [];
			for( var i = 0; i < this.length; i++ ) {
				this[ i ] && this[ i ].toJSON ? JSON.push( this[ i ].toJSON() ) : JSON.push( this[ i ] );
			}
			return JSON;
		},
		
		/**
		 * @method Matreshka.Array#concat
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat Array.prototype.concat} and accepts {@link Matreshka.Array} instances
		 * @param {...Array|...Matreshka.Array} array (Array instance or MK.Array instance)
		 * @returns {mkArray} new {@link Matreshka.Array} instance
		 * @example <caption>Basic usage 1</caption>
		 * var result = this.concat( [ 1, 2, 3 ] );
		 * @example <caption>Basic usage 2</caption>
		 * var mkArray = new MK.Array().createFrom( [ 1, 2, 3, 4, 5 ] ),
		 * 	result = this.concat( mkArray, [ 6, 7, 8 ] );
		 */
		concat: function() {
			var args = arguments,
				result = this.toArray(),
				arg;
			for( var i = 0; i < args.length; i++ ) {
				arg = args[ i ];
				if( arg instanceof Array || arg && arg.instanceOf && arg.instanceOf( MK.Array ) ) {
					for( var j = 0; j < arg.length; j++ ) {
						result.push( arg[ i ] );
					}
				}
			}
			
			return new MK.Array().createFrom( result );
		},
		
		
		/**
		 * @method Matreshka.Array#pull
		 * @since 0.1
		 * @fires pull
		 * @fires modify
		 * @summary Removes Matreshka#Array element by given index and returns that element.
		 * @param {string|number} index
		 * @returns {*} Removed element
		 * @example <caption>Basic usage</caption>
		 * var removed;
		 * this.createFrom( [ 'a', 'b', 'c' ] );
		 * removed = this.pull( 1 );
		 * alert( removed ); // 'b'
		 * alert( this.toString ); // 'a,c' 
		 */
		pull: function( index ) {
			var returns = this.silentPull( index );
			
			this.trigger( 'pull', {
				returns: returns,
				method: 'pull',
				args: [ index ]
			});
		
			return returns;
		},
		
		/**
		 * @method Matreshka.Array#silentPull
		 * @since 0.1
		 * @summary Works similar to {@link Matreshka.Array#pull} but doesn't trigger events
		 * @param {string|number} index
		 * @returns {*} Removed element
		 * @example <caption>Basic usage</caption>
		 * var removed;
		 * this.createFrom( [ 'a', 'b', 'c' ] );
		 * removed = this.silentPull( 1 );
		 * alert( removed ); // 'b'
		 * alert( this.toString ); // 'a,c'
		 */
		silentPull: function( index ) {
			var array = this.toArray(),
				returns = array.splice( index, 1 )[ 0 ];
				this.silentCreateFrom( array );
				
			return returns;
		},
		
		/**
		 * @method Matreshka.Array#push
		 * @fires push
		 * @fires add
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push Array.prototype.push} but returns self instead of length
		 * @param {...*} element
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.push( 1, 2, 3 );
		 * @example <caption>Chaining call</caption>
		 * this.push( 1, 2, 3 );
		 */
		push: createArrayMethod( MODIFIES, 'push' ),
		
		/**
		 * @method Matreshka.Array#pop
		 * @fires pop
		 * @fires remove
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop Array.prototype.pop}
		 * @returns {*|undefined} removed element
		 * @example <caption>Basic usage</caption>
		 * this.pop();
		 */
		pop: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'pop' ),
		
		/**
		 * @method Matreshka.Array#unshift
		 * @fires unshift
		 * @fires add
		 * @fires modify
		 * @param {...*} element
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift Array.prototype.unshift} but returns self instead of length
		 * @returns {*|undefined} removed element
		 * @example <caption>Basic usage</caption>
		 * this.unshift( 1, 2, 3 );
		 */
		unshift: createArrayMethod( MODIFIES, 'unshift' ),
		
		/**
		 * @method Matreshka.Array#shift
		 * @fires shift
		 * @fires remove
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift Array.prototype.shift}
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.shift( 1, 2, 3 );
		 */
		shift: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'shift' ),
		
		/**
		 * @method Matreshka.Array#sort
		 * @fires sort
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort Array.prototype.sort}
		 * @param {function} compareFunction
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.sort();
		 * @example <caption>Sorting callback</caption>
		 * this.sort( function( a, b ) {
		 * 	 return a > b ? -1 : 1;
		 * });
		 */
		sort: createArrayMethod( MODIFIES, 'sort' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#reverse
		 * @fires reverse
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse Array.prototype.reverse}
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.reverse();
		 */
		reverse: createArrayMethod( MODIFIES, 'reverse' ),
		
		/**
		 * @method Matreshka.Array#splice
		 * @fires splice
		 * @fires add
		 * @fires remove
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice Array.prototype.splice}
		 * @param {number} index
		 * @param {number} howMany
		 * @param {...*} [element]
		 * @returns {mkArray} New MK.Array
		 * @example <caption>Basic usage</caption>
		 * this.splice( 2, 0, { a: 3 }, { b: 4 } );
		 */
		splice: createArrayMethod( SPLICE, 'splice' ),
		
		/**
		 * @method Matreshka.Array#silentPush
		 * @summary Works similar to {@link Matreshka.Array#push} but doesn't trigger events
		 * @param {...*} element
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentPush( 1, 2, 3 );
		 */
		silentPush: createArrayMethod( MODIFIES, 'push', true ),
		
		/**
		 * @method Matreshka.Array#silentPop
		 * @summary Works similar to {@link Matreshka.Array#pop} but doesn't trigger events
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentPop();
		 */
		silentPop: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'pop', true ),
		
		/**
		 * @method Matreshka.Array#silentUnshift
		 * @summary Works similar to {@link Matreshka.Array#shift} but doesn't trigger events
		 * @param {...*} element
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentUnshift( 1, 2, 3 );
		 */
		silentUnshift: createArrayMethod( MODIFIES, 'unshift', true ),
		
		/**
		 * @method Matreshka.Array#silentShift
		 * @summary Works similar to {@link Matreshka.Array#shift} but doesn't trigger events
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentShift();
		 */
		silentShift: createArrayMethod( MODIFIES_AND_RETURNS_NEW_TYPE, 'shift', true ),
		
		/**
		 * @method Matreshka.Array#silentSort
		 * @summary Works similar to {@link Matreshka.Array#sort} but doesn't trigger events
		 * @param {function} compareFunction
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentSort();
		 * @example <caption>Sorting callback</caption>
		 * this.silentSort( function( a, b ) {
		 * 	 return a > b ? -1 : 1;
		 * });
		 */
		silentSort: createArrayMethod( MODIFIES, 'sort', true ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#silentReverse
		 * @summary Works similar to {@link Matreshka.Array#reverse} but doesn't trigger events
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentReverse();
		 */
		silentReverse: createArrayMethod( MODIFIES, 'reverse', true ),
		
		/**
		 * @method Matreshka.Array#silentSplice
		 * @summary Works similar to {@link Matreshka.Array#splice} but doesn't trigger events
		 * @param {number} index
		 * @param {number} howMany
		 * @param {...*} [element]
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentSplice( 2, 0, { a: 3 }, { b: 4 } );
		 */
		silentSplice: createArrayMethod( SPLICE, 'splice', true ),
		
		/**
		 * @method Matreshka.Array#map
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map Array.prototype.map}
		 * @param {arrayCallback} callback
		 * @param {*} [thisArg]
		 * @returns {mkArray} New MK.Array
		 * @example <caption>Basic usage</caption>
		 * var props = this.map( function( item ) {
		 * 	 return item.prop;
		 * });
		 */
		map: createArrayMethod( RETURNS_NEW_ARRAY, 'map' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#filter
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter Array.prototype.filter}
		 * @param {arrayCallback} callback
		 * @param {*} [thisArg]
		 * @returns {mkArray} New MK.Array
		 * @example <caption>Basic usage</caption>
		 * var filtered = this.filter( function( item ) {
		 * 	 return item > 4;
		 * });
		 */
		filter: createArrayMethod( RETURNS_NEW_ARRAY, 'filter' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#slice
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice Array.prototype.slice}
		 * @param {number} begin
		 * @param {number} end
		 * @returns {mkArray} New MK.Array
		 * @example <caption>Basic usage</caption>
		 * var sliced = this.slice( 1, 3 );
		 */
		slice: createArrayMethod( RETURNS_NEW_ARRAY, 'slice' ),
		
		/**
		 * @method Matreshka.Array#every
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every Array.prototype.every}
		 * @param {arrayCallback} callback
		 * @param {*} [thisArg]
		 * @returns {boolean}
		 * @example <caption>Basic usage</caption>
		 * var isBigEnough = this.every( function( item ) {
		 * 		return item > 10;
		 * });
		 */
		every: createArrayMethod( RETURNS_NEW_TYPE, 'every' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#some
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some Array.prototype.some}
		 * @param {arrayCallback} callback
		 * @param {*} [thisArg]
		 * @returns {boolean}
		 * @example <caption>Basic usage</caption>
		 * var isBigEnough = this.some( function( item ) {
		 * 		return item > 10;
		 * });
		 */
		some: createArrayMethod( RETURNS_NEW_TYPE, 'some' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#reduce
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce Array.prototype.reduce}
		 * @param {function} callback
		 * @param {*} [initialValue]
		 * @returns {*}
		 * @example <caption>Basic usage</caption>
		 * new MK.Array().createFrom( [0,1,2,3,4] ).reduce( function( previousValue, currentValue ) {
		 * 	return previousValue + currentValue;
		 * });
		 */
		reduce: createArrayMethod( RETURNS_NEW_TYPE, 'reduce' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#reduceRight
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight Array.prototype.reduceRight}
		 * @param {function} callback
		 * @param {*} [initialValue]
		 * @returns {*}
		 * @example <caption>Basic usage</caption>
		 * new MK.Array().createFrom( [0,1,2,3,4] ).reduceRight( function( previousValue, currentValue ) {
		 * 	return previousValue + currentValue;
		 * });
		 */
		reduceRight: createArrayMethod( RETURNS_NEW_TYPE, 'reduceRight' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#forEach
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach Array.prototype.forEach} but returns self instead of undefined
		 * @param {arrayCallback} callback
		 * @param {*} [thisArg]
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.forEach( function( item, index ) {
		 * 	console.log( index, item ); 
		 * });
		 */
		forEach: createArrayMethod( SIMPLE, 'forEach' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#each
		 * @summary Works similar to {@link Matreshka.Array.forEach}
		 * @param {arrayCallback} callback
		 * @param {*} [thisArg]
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.each( function( item, index ) {
		 * 	console.log( index, item ); 
		 * });
		 */
		each: createArrayMethod( SIMPLE, 'forEach' ), // @warning @todo third argument is not __this__
		
		/**
		 * @method Matreshka.Array#toString
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString Array.prototype.toString}
		 * @returns {string}
		 * @example <caption>Basic usage</caption>
		 * this.toString();
		 */
		toString: createArrayMethod( RETURNS_NEW_TYPE, 'toString' ),
		
		/**
		 * @method Matreshka.Array#indexOf
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf Array.prototype.indexOf}
		 * @param {number} searchElement
		 * @param {number} [fromIndex]
		 * @returns {string}
		 * @example <caption>Basic usage</caption>
		 * var mkArray = new MK.Array().createFrom( [ 1, 2, 3, 4, 4, 3, 2, 1 ] );
		 * alert( this.indexOf( 2 ) ); // alerts 1
		 */
		indexOf: createArrayMethod( RETURNS_NEW_TYPE, 'indexOf' ),
		
		/**
		 * @method Matreshka.Array#lastIndexOf
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf Array.prototype.lastIndexOf}
		 * @param {number} searchElement
		 * @param {number} [fromIndex]
		 * @returns {string}
		 * @example <caption>Basic usage</caption>
		 * var mkArray = new MK.Array().createFrom( [ 1, 2, 3, 4, 4, 3, 2, 1 ] );
		 * alert( this.lastIndexOf( 2 ) ); // alerts 6
		 */
		lastIndexOf: createArrayMethod( RETURNS_NEW_TYPE, 'lastIndexOf' ),
		
		/**
		 * @method Matreshka.Array#join
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join Array.prototype.join}
		 * @param {string} separator
		 * @returns {string}
		 * @example <caption>Basic usage</caption>
		 * var mkArray = new MK.Array().createFrom( [ 1, 2, 3, 4, 4, 3, 2, 1 ] );
		 * alert( this.join( ':' ) ); // alerts '1:2:3:4:4:3:2:1'
		 */
		join: createArrayMethod( RETURNS_NEW_TYPE, 'join' )
	});

/**
 * {@link Matreshka.Array} instance
 * @typedef {object} mkArray
 */
 
 /**
 * <p>Array callback is using in some {@link Matreshka.Array} methods like: {@link Matreshka.Array#forEach}, {@link Matreshka.Array#filter}, {@link Matreshka.Array#some}... as iterator callback.</p>
 * <p>To keep methods as fast as possible and reduce errors, most of methods are written using native {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype Array.prototype} methods. Pay attention that callback gets third argument that doesn't match self (<code>this</code> of the method). This is {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} representation of {@link Matreshka.Array} instance because <code>Array.prototype[ method ].apply( this, arguments );</code> doesn't work with DOM objects (XDomainRequest hack that we're using to keep dynamic accessors support). So we convert {@link Matreshka.Array} to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} and use it this way: <code>Array.prototype[ method ].apply( representation, arguments );</code></p>
 * @callback arrayCallback
 * @param {*} item
 * @param {string} key
 * @param {Array} array
 * @example
 * var callback = function( item, key, array ) {
 * 	console.log( item, key, array );
 * }
 * this.forEach( callback );
 * @example <caption>Third argument issue</caption>
 * this.forEach( function( item, key, array ) {
 * 	console.log( this === array ); // false
 * }, this );
 */
})( window.Matreshka, Array.prototype );