"use strict";
/*
 * todo pass arguments to the methods as event property
 * todo .pull method that removes an element with given index
 */
( function( MK, Array_prototype ) {
	if( !MK ) {
		throw Error( 'Matreshka is not defined' );
	}
	
	// Array methods flags (5 types) 
	var SIMPLE = 1,
		MODIFIES = 2,
		RETURNS_NEW_ARRAY = 3,
		RETURNS_NEW_TYPE = 4,
		SPLICE = 5;
	
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
		if( !Array.prototype[ name ] ) {
			throw Error( 'There no such method: ' + name + '. If you\'re using Internet Explorer 8 you should use es5-shim: https://github.com/kriskowal/es5-shim' );
		}
		if( type === SIMPLE ) {
			return function() {
				var array = this.toArray();
				Array.prototype[ name ].apply( array, arguments );
				return this;
			};
		} else if( type === MODIFIES ) {
			return function() {
				var array = this.toArray(),
					returns = Array.prototype[ name ].apply( array, arguments );
				this.silentCreateFrom( array );
				if( !silent ) {
					this.trigger( name, {
						returns: returns,
						arguments: arguments,
						method: name
					});
				}
				return this;
			};
		} else if( type === RETURNS_NEW_ARRAY ) {
			return function() {
				var array = this.toArray(),
					returns = Array.prototype[ name ].apply( array, arguments );
					return new MK.Array().silentCreateFrom( returns );
			};
		} else if( type === RETURNS_NEW_TYPE ) {
			return function() {
				var array = this.toArray();
				return Array.prototype[ name ].apply( array, arguments );;
			};
		} else if( type === SPLICE ) { // the combination of returnsnew and modify
			return function() {
				var array = this.toArray(),
					returns = Array.prototype[ name ].apply( array, arguments );
				this.silentCreateFrom( array );
				returns = new MK.Array().silentCreateFrom( returns );
				if( !silent ) {
					this.trigger( name, {
						returns: returns,
						method: name,
						arguments: arguments
					});
				}
				return returns;
			};
		}
	};
	
	/**
	 * @class Matreshka.Array
	 * @version 0.0.1
	 * @author Andrey Gubanov <a@odessite.com.ua>
	 * @license {@link http://www.apache.org/licenses/ Apache License}
	 * Version 2.0, January 2004
	 * @classdesc Matreshka Array class. Extends {@link Matreshka}.
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
		length: 0,
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
		 * @method Matreshka.Array#createFrom
		 * @fires recreate
		 * @fires modify
		 * @summary Creates self from another array 
		 * @desc If you have array or array-like object (e.g. arguments) you can convert it to MK.Array instance by this method
		 * @param {Array} array
		 * @param {capture} [boolean] if you want to capture previous value via <code>"was"</code> key in event gandler argument
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * new MK.Array().createFrom( [1, 2, 3, 4, 5] );
		 */
		createFrom: function( array, capture ) {
			var evtOpts = {
				createdFrom: array
			};
			if( capture ) {
				evtOpts.was = this.toNative()
			}
			this
				.silentCreateFrom( array )
				.trigger( 'recreate', evtOpts )
			;
			return this;
		},
		
		/**
		 * @method Matreshka.Array#silentCreateFrom
		 * @summary Creates self from another array 
		 * @desc Works similar to {@link Matreshka.Array#createFrom} but without triggering events
		 * @param {Array} array
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * new MK.Array().silentCreateFrom( [1, 2, 3, 4, 5] );
		 */
		silentCreateFrom: function( array ) {
			var diff = this.length - array.length;
			for( var i = 0; i < array.length; i++ ) {
				this[ i ] = array[ i ];
			}
			for( i = 0; i < diff; i++ ) {
				delete this[ i + array.length ];
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
				return Array.prototype.slice.call( this );
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
			MK.Array.parent.initMK( this, arguments );
			return this.on( 'recreate push pop unshift shift splice sort remove reverse', function( evtOptions ) {
				this.trigger( 'modify', evtOptions );
			});
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
				i, j, arg;
			for( i = 0; i < args.length; i++ ) {
				arg = args[ i ];
				if( arg instanceof Array || arg && arg.instanceOf && arg.instanceOf( MK.Array ) ) {
					for( j = 0; j < arg.length; j++ ) {
						result.push( arg[ i ] );
					}
				}
			}
			
			return new MK.Array().createFrom( result );
		},
		
		/**
		 * @method Matreshka.Array#push
		 * @fires push
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
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop Array.prototype.pop} but returns self instead of length
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.pop();
		 */
		pop: createArrayMethod( MODIFIES, 'pop' ),
		
		/**
		 * @method Matreshka.Array#unshift
		 * @fires unshift
		 * @fires modify
		 * @param {...*} element
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift Array.prototype.unshift} but returns self instead of length
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.unshift( 1, 2, 3 );
		 */
		unshift: createArrayMethod( MODIFIES, 'unshift' ),
		
		/**
		 * @method Matreshka.Array#shift
		 * @fires shift
		 * @fires modify
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift Array.prototype.shift} but returns self instead of length
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.shift( 1, 2, 3 );
		 */
		shift: createArrayMethod( MODIFIES, 'shift' ),
		
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
		 * @summary Works similar to {@link Matreshka.Array#push} but without triggering events
		 * @param {...*} element
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentPush( 1, 2, 3 );
		 */
		silentPush: createArrayMethod( MODIFIES, 'push', true ),
		
		/**
		 * @method Matreshka.Array#silentPop
		 * @summary Works similar to {@link Matreshka.Array#pop} but without triggering events
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentPop();
		 */
		silentPop: createArrayMethod( MODIFIES, 'pop', true ),
		
		/**
		 * @method Matreshka.Array#silentUnshift
		 * @summary Works similar to {@link Matreshka.Array#shift} but without triggering events
		 * @param {...*} element
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentUnshift( 1, 2, 3 );
		 */
		silentUnshift: createArrayMethod( MODIFIES, 'unshift', true ),
		
		/**
		 * @method Matreshka.Array#silentShift
		 * @summary Works similar to {@link Matreshka.Array#shift} but without triggering events
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentShift();
		 */
		silentShift: createArrayMethod( MODIFIES, 'shift', true ),
		
		/**
		 * @method Matreshka.Array#silentSort
		 * @summary Works similar to {@link Matreshka.Array#sort} but without triggering events
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
		 * @summary Works similar to {@link Matreshka.Array#reverse} but without triggering events
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * this.silentReverse();
		 */
		silentReverse: createArrayMethod( MODIFIES, 'reverse', true ),
		
		/**
		 * @method Matreshka.Array#silentSplice
		 * @summary Works similar to {@link Matreshka.Array#splice} but without triggering events
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