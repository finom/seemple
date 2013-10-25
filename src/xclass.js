"use strict";
( function( gc ) {
var isArguments = function( o ) {
	return !!o && ( o.toString() === '[object Arguments]' || typeof o === 'object' && o !== null && 'length' in o && 'callee' in o );
},
ie = (function() {
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).

var rv = -1; // Return value assumes failure.
if ( navigator.appName == 'Microsoft Internet Explorer') {
	var ua = navigator.userAgent;
	var re = new RegExp( 'MSIE ([0-9]{1,}[\.0-9]{0,})' );
	if ( re.exec(ua) != null )
		rv = parseFloat( RegExp.$1 );
	}
	return rv;
})(),
ieDocumentMode = document.documentMode,
ie8 = ieDocumentMode === 8,
err = 'Internet Explorer ' + ie + ' doesn\'t support Class function';
if( ~ie && ie < 8 ) {
	throw Error( err );
} else if( ieDocumentMode < 8 ) {
	throw Error( err + '. Switch your "Document Mode" to "Standards"' );
}

/**
 * @function Class
 * @summary Javascript class implementation
 * @desc Class function provides possibility to use classical OOP. Modern browsers use prototype based implementation but Internet Explorer 8 uses XDomainRequest hack to provide possibility to use getters and setters by Object.defineProperty method. Each time when you create an instance, the Class function core creates XDomainRequest instance and extends it by given prototype.
 * @param {object} prototype - Methods and properties
 * @returns {function} constructor
 * @example <caption>Usage</caption>
 * var A = Class({
 * 	method1: function() { ... }
 * });
 * var B = Class({
 * 	'extends': A,
 * 	method2: function() { ... }
 * });
 * var C = Class({
 * 	'extends': B,
 * 	method2: function() {
 * 		// "this" is execution context
 * 		// arguments is just standard arguments pseudo array
 * 		// the same as B.prototype.apply( this, arguments );
 * 		C.patent.method2( this, arguments );
 * 	},
 * 	method3: function( a, b ) { ... }
 * });
 * var D = Class({
 * 	'extends': C,
 * 	method3: function( a, b ) {
 * 		// you can pass any arguments to the method
 * 		// the same as C.prototype.call( this, a, b );
 * 		C.patent.method2( this, a, b );
 * 	}
 * });
 */
 
 /**
 * @method instanceOf
 * @summary Checks is instance of class created by {@link Class} function instanced by given class
 * @desc You still can use instanceof operator but it doesn't work in Internet Explorer 8 because of XDR hack. 
 * @param {function} class
 * @returns {boolean}
 * @example <caption>Usage</caption>
 * x = new X;
 * x.instanceOf( X ); // true
 */
gc.Class = function( prototype ) {
	var constructor = realConstructor = prototype.constructor !== Object ? prototype.constructor : function EmptyConstructor() {},
		extend = prototype[ 'extends' ] = prototype[ 'extends' ] || prototype.extend,
		extend_prototype = extend && extend.prototype,
		implement = prototype[ 'implements' ] = prototype[ 'implements' ] || prototype.implement,
		realConstructor = constructor,
		parent = {};
	
	delete prototype.extend;
	delete prototype.implement;
	
	if( extend_prototype ) {
		for( var key in extend_prototype ) {
			parent[ key ] = typeof extend_prototype[ key ] === 'function' ? ( function( value ) {
				return function( context, args ) {
					args = isArguments( args ) ? args : Array.prototype.splice.call( arguments, 1 );
					return value.apply( context, args );
				}
			})( extend_prototype[ key ] ) : extend_prototype[ key ];
		}
		
		parent.constructor = ( function( value ) {
			return function( context, args ) {
				args = isArguments( args ) ? args : Array.prototype.splice.call( arguments, 1 );
				return value.apply( context, args );
			}
		})( extend_prototype.constructor );
	}
	
	if( ie8 ) {
		prototype.prototype = null;
		prototype.constructor = null;
		constructor = function() {
			if( this instanceof constructor ) {
				var r = new XDomainRequest;
				for( var p in constructor.prototype ) if( p !== 'constructor' ) {
					r[ p ] = constructor.prototype[ p ];
				}
				r.hasOwnProperty = constructor.prototype.hasOwnProperty;
				realConstructor.apply( r, arguments );

				return r;
			} else {
				realConstructor.apply( this, arguments );
			}			
		};
		
		prototype.constructor = constructor;
		constructor.prototype = prototype;
		constructor.parent = parent;
		extend && Class.IEInherits( constructor, extend );
	} else {
		prototype.constructor = constructor;
		constructor.prototype = prototype;
		constructor.parent = parent;

		extend && Class.inherits( constructor, extend );
	}
	
	implement && implement.validate( constructor.prototype );
	
	if( this instanceof Class ) {
		return new constructor;
	} else {
		return constructor;
	}
};

Class.inherits = function( Child, Parent ) {
	var prototype = Child.prototype,
		F = function() {};
	F.prototype = Parent.prototype;
    Child.prototype = new F;
    Child.prototype.constructor = Child;
	for( var m in prototype ) {
		Child.prototype[ m ] = prototype[ m ];
	};
	
	Child.prototype.instanceOf = function( _Class ) {
		return this instanceof _Class;
	}
};

Class.IEInherits = function( Child, Parent ) {
	var childHasOwn = Child.prototype.hasOwnProperty,
		childConstructor = Child.prototype.constructor,
		parentHasOwn,
		objectHasOwn = Object.prototype.hasOwnProperty;
	while ( Parent ) {
		parentHasOwn = parentHasOwn || Parent.prototype.hasOwnProperty,
		Child.prototype = ( function( pp, cp ) { // extending
			var o = {},
				i;
			for( i in pp )  {
				o[ i ] = pp[ i ]
			}
			for( i in cp ) {
				o[ i ] = cp[ i ]
			}
			return o;
		})( Parent.prototype, Child.prototype );
		Parent = Parent.prototype && Parent.prototype[ 'extends' ] && Parent.prototype[ 'extends' ].prototype;
	}

	if( childHasOwn !== objectHasOwn ) {
		Child.prototype.hasOwnProperty = childHasOwn;
	} else if( parentHasOwn !== objectHasOwn ) {
		Child.prototype.hasOwnProperty = parentHasOwn;
	}
	
	Child.prototype.constructor = childConstructor;
	
	Child.prototype.instanceOf = function( _Class ) {
		var PossibleParent = Child;
		while( PossibleParent ) {
			if( PossibleParent === _Class ) {
				return true;
			}
			PossibleParent = PossibleParent.prototype[ 'extends' ]
		}
		return false;
	}
};

gc.Class.isXDR = ie8;
})( this );