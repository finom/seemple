/*
	Matreshka v0.2.0 (2014-07-14)
	JavaScript Framework by Andrey Gubanov
	Released under the MIT license
	More info: http://finom.github.io/matreshka/
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('xclass',factory);
    } else {
        // Browser globals
        root.Class = factory();
    }
}(this, function () {
	var isArguments = function( o ) {
		return !!o && ( o.toString() === '[object Arguments]' || typeof o === 'object' && o !== null && 'length' in o && 'callee' in o );
	},
	ie = (function() {
		// Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
		var rv = -1,
			ua, re;
		if ( navigator.appName == 'Microsoft Internet Explorer' ) {
			ua = navigator.userAgent;
			re = new RegExp( 'MSIE ([0-9]{1,}[\.0-9]{0,})' );
			if ( re.exec(ua) != null ) {
				rv = parseFloat( RegExp.$1 );
			}
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
	* @returns {xclass} class (or rather costructor of a class)
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
	* 		// next string does the same thing as B.prototype.apply( this, arguments ); does
	* 		C.parent.method2( this, arguments );
	* 	},
	* 	method3: function( a, b ) { ... }
	* });
	* var D = Class({
	* 	'extends': C,
	* 	method3: function( a, b ) {
	* 		// you can pass any arguments to the method
	* 		// next string does the same thing as C.prototype.call( this, a, b ); does
	* 		C.parent.method2( this, a, b );
	* 	}
	* });
	* @example <caption>AMD way (named modules)</caption>
	* retuire.config({
	* 	paths: {
	* 		'xclass': 'path/to/matreshka.min',
	* 		'matreshka': 'path/to/matreshka.min',
	* 		'balalaika': 'path/to/matreshka.min'
	* 	}
	* });
	* require(['xclass', 'matreshka', 'balalaika'], function(Class, MK, $) {
	* 	var $divs = $( 'div' );
	* 	var MyClass = Class({
	* 		'extends': MK
	* 	});
	* });
	* @example <caption>AMD way (unnamed Matreshka module)</caption>
	* // Matreshka contains Class function as "Class" property and balalaika as "$b" property
	* require(['path/to/matreshka.min'], function(MK) {
	* 	var $divs = MK.$b( 'div' );
	* 	var MyClass = MK.Class({
	* 		'extends': MK
	* 	});
	* });
	*/
	
	/**
	* @method Class.instanceOf
	* @summary Checks is instance of class created by {@link Class} function instanced by given class
	* @desc You still can use instanceof operator but it doesn't work in Internet Explorer 8 because of XDR hack. 
	* @param {function} class
	* @returns {boolean}
	* @example <caption>Usage</caption>
	* x = new X;
	* x.instanceOf( X ); // true
	*/
	var Class = function( prototype ) {
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
						args = isArguments( args ) ? args : Array.prototype.slice.call( arguments, 1 );
						return value.apply( context, args );
					}
				})( extend_prototype[ key ] ) : extend_prototype[ key ];
			}
			
			parent.constructor = ( function( value ) {
				return function( context, args ) {
					args = isArguments( args ) ? args : Array.prototype.slice.call( arguments, 1 );
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
		
		constructor.same = function() {
			return function() {
				return constructor.apply( this, arguments );
			};
		};
		
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

	/**
	* @constructor Class.Interface
	* @summary Simple interface implementation
	* @desc Btw <code>Class</code> function supports interfaces. You can create your own Interface constructor that should have <code>.validate</code> method and use it same way as described in examples. Pass interface instance to <code>'implements' property</code>.
	* @param {Interface} [parent] - parent interface
	* @param {Array|...string} - interface properties
	* @example <caption>Basic usage</caption>
	* var myInterface = new Class.Interface( 'method1', 'method2' );
	* var MyClass({
	*  'implements': myInterface,
	* 	method1: function() { ... },
	* 	method2: function() { ... }
	* });
	* @example <caption>Method is not implemented in class (error)</caption>
	* var myInterface = new Class.Interface( 'method1', 'method2' );
	* var MyClass({
	*  'implements': myInterface,
	* 	method1: function() { ... },
	* });
	* @example <caption>Inheritage</caption>
	* var interface1 = new Class.Interface( 'method1', 'method2' );
	* var interface2 = new Class.Interface( interface1, 'method3' );
	* var MyClass({
	*  'implements': interface2,
	* 	method1: function() { ... },
	* 	method2: function() { ... },
	* 	method3: function() { ... },
	* });
	*/
	Class.Interface = function Interface( parent, props ) {
		var propsMap = {},
			isArray = function( probArray ) {
				return typeof probArray === 'object' && probArray !== null && 'length' in probArray;
			},
			properties,
			list;
		if( parent instanceof Interface ) {
			for( var i in parent.propsMap ) propsMap[ i ] = 1;
			properties = isArray( props ) ? props : [].slice.call( arguments, 1 );
		} else {
			properties = isArray( parent ) ? parent : arguments;
		}
		for( i = 0; i < properties.length; i++ ) {
			propsMap[ properties[ i ] ] = 1;
		}
		
		this.propsMap = propsMap;
		
		this.validate = function( prototype ) {
			for( var i in this.propsMap ) {
				if( typeof prototype[ i ] !== 'function' ) {
					throw Error( '[Class.Interface] Method "' + i + '" is not implemented in '+ (prototype.constructor.name || prototype.name || 'given') +' prototype' );
				}
			}
		}
	};

	Class.isXDR = ie8;
    return Class;
}));

/**
 * @typedef {function} xclass
 * @summary Class (or rather costructor of a class) returned from {@link Class} function
 * @since 0.2
 * @property {function} same - Clones constructor (but only constructor, not prototype!)
 * @example
 * var MyXClass = Class({
 * 	method: function() { ... }
 * });
 * @example <caption><code>.same</code> method (clones constructor function)</caption>
 * var MyXClass = Class({
 * 	constructor: function( a ) {
 * 		thia.a = a;
 * 	}
 * });
 * 
 * // MyAnotherXClass works exactly same way as MyXClass
 * var MyAnotherXClass = Class({
 * 	'extends': MyXClass,
 * 	constructor: MyXClass.same()
 * });
 * 
 */;
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/polyfills/addeventlistener',factory);
    } else {
        factory();
    }
}(this, function () {
	( function( win, doc, s_add, s_rem ) {
	if( doc[s_add] ) return;
		Element.prototype[ s_add ] = win[ s_add ] = doc[ s_add ] = function( on, fn, self ) {
			return (self = this).attachEvent( 'on' + on, function(e){
				var e = e || win.event;
				e.target = e.target || e.srcElement;
				e.preventDefault  = e.preventDefault  || function(){e.returnValue = false};
				e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true};
				e.which = e.button ? ( e.button === 2 ? 3 : e.button === 4 ? 2 : e.button ) : e.keyCode;
				fn.call(self, e);
			});
		};
		Element.prototype[ s_rem ] = win[ s_rem ] = doc[ s_rem ] = function( on, fn ) {
			return this.detachEvent( 'on' + on, fn );
		};
	})( window, document, 'addEventListener', 'removeEventListener' );
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('balalaika', [
			'matreshka_dir/polyfills/addeventlistener'
		], factory);
    } else {
        root.$b = factory();
    }
}(this, function () {
/**
 * @function $b
 * @version 1.0
 * @since 0.1
 * @extends Array
 * @summary <code>Balalaika</code> DOM utilite
 * 
 * @desc <p>Balalaika is tiny (999 bytes uncompressed) embedded library that makes easier vanilla.js (pure JS) coding. This is individual project and will be presented on github soon.</p>
 * 
 * <p>It's using in {@link http://finom.github.io/matreshka|Matreshka} framework as DOM utilite when jQuery is not defined.</p>
 * 
 * <p>Balalaika extends Array. It means that you can use Array methods such as <code>.forEach</code>, <code>.map</code>, <code>.reduce</code>, <code>.splice</code> and so on.</p>
 * 
 * <p>Balalaika includes 3 own methods: <code>.on</code>, <code>.off</code>, <code>.is</code> and static <code>.extend</code> method that work same way as jQuery analogues (<code>.on</code> doesn't support data). </p>
 * 
 * @example $b( 'div' ).forEach( ... );
 * @example $b( 'span', document.body ).map( ... );
 * @example $b( '.button' ).on( 'click.mynamespace', ... );
 * @example $b( '.button' ).off( 'click.mynamespace' );
 * @example <caption>AMD way (named modules)</caption>
 * retuire.config({
 * 	paths: {
 * 		'xclass': 'path/to/matreshka.min',
 * 		'matreshka': 'path/to/matreshka.min',
 * 		'balalaika': 'path/to/matreshka.min'
 * 	}
 * });
 * require(['xclass', 'matreshka', 'balalaika'], function(Class, MK, $) {
 * 	var $divs = $( 'div' );
 * 	var MyClass = Class({
 * 		'extends': MK
 * 	});
 * });
 * @example <caption>AMD way (unnamed Matreshka module)</caption>
 * // Matreshka contains Class function as "Class" property and balalaika as "$b" property
 * require(['path/to/matreshka.min'], function(MK) {
 * 	var $divs = MK.$b( 'div' );
 * 	var MyClass = MK.Class({
 * 		'extends': MK
 * 	});
 * });
 */
// nsRegAndEvents is regesp for eventname.namespace and the list of all events
// fn is empty array and balalaika prototype
return ( function( window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $ ) {
	$ = function( s, context ) {
		return new $.i( s, context );
	};
	
	$.i = function( s, context ) {
		fn.push.apply( this, !s ? fn : s.nodeType || s == window ? [s] : "" + s === s ? /</.test( s ) 
		? ( ( i = document.createElement( context || 'div' ) ).innerHTML = s, i.children ) : (context&&$(context)[0]||document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : s );
	};
	
	$.i[ l = 'prototype' ] = ( $.extend = function(obj) {
		k = arguments;
		for( i = 1; i < k.length; i++ ) {
			if ( l = k[ i ] ) {
				for (j in l) {
					obj[j] = l[j];
				}
			}
		}
		
		return obj;
	})( $.fn = $[ l ] = fn, { // $.fn = $.prototype = fn
		on: function( n, f ) {
			// n = [ eventName, nameSpace ]
			n = n.split( nsRegAndEvents );
			this.map( function( item ) {
				// item.b$ is balalaika_id for an element
				// i is eventName + id ("click75")
				// nsRegAndEvents[ i ] is array of events (eg all click events for element#75) ([[namespace, handler], [namespace, handler]])
				( nsRegAndEvents[ i = n[ 0 ] + ( item.b$ = item.b$ || ++id ) ] = nsRegAndEvents[ i ] || [] ).push([f, n[ 1 ]]);
				// item.addEventListener( eventName, f )
				item[ 'add' + s_EventListener ]( n[ 0 ], f );
			});
			return this;
		},
		off: function( n, f ) {
			// n = [ eventName, nameSpace ]
			n = n.split( nsRegAndEvents );
			// l = 'removeEventListener'
			l = 'remove' + s_EventListener;
			this.map( function( item ) {
				// k - array of events
				// item.b$ - balalaika_id for an element
				// n[ 0 ] + item.b$ - eventName + id ("click75")
				k = nsRegAndEvents[ n[ 0 ] + item.b$ ];
				// if array of events exist then i = length of array of events
				if( i = k && k.length ) {
					// while j = one of array of events
					while( j = k[ --i ] ) {
						// if( no f and no namespace || f but no namespace || no f but namespace || f and namespace )
						if( ( !f || f == j[ 0 ] ) && ( !n[ 1 ] || n[ 1 ] == j[ 1 ] ) ) {
							// item.removeEventListener( eventName, handler );
							item[ l ]( n[ 0 ], j[ 0 ] );
							// remove event from array of events
							k.splice( i, 1 );
						}
					}
				} else {
					// if event added before using addEventListener, just remove it using item.removeEventListener( eventName, f )
					!n[ 1 ] && item[ l ]( n[ 0 ], f );
				}	
			});
			return this;
		},
		is: function( s ) {
			i = this[ 0 ];
			j = !!i && ( i.matches
				|| i[ 'webkit' + s_MatchesSelector ]
				|| i[ 'moz' + s_MatchesSelector ]
				|| i[ 'ms' + s_MatchesSelector ] );
			return !!j && j.call( i, s );
		}
	});	
	return $;
})( window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector' );

}));
// taken from https://github.com/remy/polyfills and modified
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/polyfills/classlist',factory);
    } else {
        factory();
    }
}(this, function () {
	var toggle = function (token, force) {
		if( typeof force === 'boolean' ) {
			this[ force ? 'add' : 'remove' ](token);
		} else {
			this[ !this.contains(token) ? 'add' : 'remove' ](token);
		}

		return this.contains(token);
	};
	
	if( window.DOMTokenList ) {
		var a = document.createElement( 'a' );
		a.classList.toggle( 'x', false );
		if( a.className ) {
			window.DOMTokenList.prototype.toggle = toggle;
		} 
	}
	
	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	var prototype = Array.prototype,
		push = prototype.push,
		splice = prototype.splice,
		join = prototype.join;

	function DOMTokenList(el) {
		this.el = el;
		// The className needs to be trimmed and split on whitespace
		// to retrieve a list of classes.
		var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
		for (var i = 0; i < classes.length; i++) {
			push.call(this, classes[i]);
		}
	};

	DOMTokenList.prototype = {
		add: function (token) {
			if (this.contains(token)) return;
			push.call(this, token);
			this.el.className = this.toString();
		},
		contains: function (token) {
			return this.el.className.indexOf(token) != -1;
		},
		item: function (index) {
			return this[index] || null;
		},
		remove: function (token) {
			if (!this.contains(token)) return;
			for (var i = 0; i < this.length; i++) {
				if (this[i] == token) break;
			}
			splice.call(this, i, 1);
			this.el.className = this.toString();
		},
		toString: function () {
			return join.call(this, ' ');
		},
		toggle: toggle
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter(obj, prop, getter) {
		if (Object.defineProperty) {
			Object.defineProperty(obj, prop, {
				get: getter
			});
		} else {
			obj.__defineGetter__(prop, getter);
		}
	}

	defineElementGetter(Element.prototype, 'classList', function () {
		return new DOMTokenList(this);
	});

}));



( function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/balalaika-extended',[ 'balalaika', 'matreshka_dir/polyfills/classlist', ], factory);
    } else {
        factory( root.$b );
    }
}(this, function ( $b ) {
	var s_classList = 'classList',
		_on, _off;
	if( !$b ) {
		throw new Error( 'Balalaika is missing' );
	}
	
	_on = $b.fn.on;
	_off = $b.fn.off;
	
	$b.extend( $b.fn, {
		on: function( n, f ) {
			n.split( /\s/ ).forEach( function( n ) {
				_on.call( this, n, f );
			}, this );
			return this;
		},
		off: function( n, f ) {
			n.split( /\s/ ).forEach( function( n ) {
				_off.call( this, n, f );
			}, this );
			return this;
		},
		hasClass: function( className ) { return !!this[ 0 ] && this[ 0 ][ s_classList ].contains( className ); },
		addClass: function( className ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				classList.add.apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		removeClass: function( className ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				classList.remove.apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		toggleClass: function( className, b ) {
			this.forEach( function( item ) {
				var classList = item[ s_classList ];
				if( typeof b !== 'boolean' ) {
					b = !classList.contains( className );
				}
				classList[ b ? 'add' : 'remove' ].apply( classList, className.split( /\s/ ) );
			});
			return this;
		},
		add: function( s ) {
			var result = $b( this ),
				ieIndexOf = function( a, e ) {
					for( var i = 0; i < a.length; i++ ) if( a[ i ] === e ) return i;
				};
			s = $b( s ).slice();
			[].push.apply( result, s );
			for( var i = result.length - s.length; i < result.length; i++ ) {
				if( ( [].indexOf ? result.indexOf( result[ i ] )  : ieIndexOf( result, result[ i ] ) ) !== i ) { // @IE8
					result.splice( i--, 1 );
				}
			}
			return result;
		},
		find: function( s ) {
			var result = $b();
			this.forEach( function( item ) {
				result = result.add( $b( s, item ) );
			});
			return result;
		}
	});
	
	// simple html parser
	$b.parseHTML = function( html ) {
		var node = document.createElement( 'div' ),
			// wrapMap is taken from jQuery
			wrapMap = {
					option: [ 1, "<select multiple='multiple'>", "</select>" ],
					legend: [ 1, "<fieldset>", "</fieldset>" ],
					thead: [ 1, "<table>", "</table>" ],
					tr: [ 2, "<table><tbody>", "</tbody></table>" ],
					td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
					col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
					area: [ 1, "<map>", "</map>" ],
					_: [ 0, "", "" ]
			},
			wrapper,
			i;
			
		html = html.replace( /^\s+|\s+$/g, '' );
		
		wrapMap.optgroup = wrapMap.option;
		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;
		
		wrapper = wrapMap[ /<([\w:]+)/.exec( html )[ 1 ] ] || wrapMap._;
		
		node.innerHTML = wrapper[ 1 ] + html + wrapper[ 2 ];
		
		i = wrapper[ 0 ];
		
		while( i-- ) {
			node = node.children[ 0 ];
		}
		
		return $b( node.children );
	};
	
	$b.create = function( tagName, props ) {
		var el = document.createElement( tagName );
		if( props ) for( var i in props ) {
			if( el[ i ] && typeof props === 'object' ) {
				$b.extend( el[ i ], props[ i ] )
			} else {
				el[ i ] = props[ i ]
			}			
		}
		return el;
	};
	
	// @IE8 Balalaika fix. This browser doesn't support HTMLCollection and NodeList as second argument for .apply
	// This part of code will be removed in Matreshka 1.0
	(function( document, $, i, j, k, fn ) {
		if( document.documentMode < 9 ) {
			fn = $.i[ j = 'prototype' ];

			$.i = function( s, context ) {
				k = !s ? fn : s && s.nodeType || s === window ? [s] : "" + s === s ? /</.test( s ) ? ( ( i = document.createElement( 'div' ) ).innerHTML = s, i.children ) : (context&&$(context)[0]||document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : !function r(f){/in/(document.readyState)?setTimeout(r,9,f):f()}(s): s;
			
				j = []; for (i = k ? k.length : 0; i--; j[i] = k[i]) {}
				
				fn.push.apply( this, j );
			};
			
			$.i[ j ] = fn;
			
			fn.is = function( selector ) {
				var elem = this[ 0 ],
					elems = elem.parentNode.querySelectorAll( selector ),
					i;
				
				for ( i = 0; i < elems.length; i++ ) { if( elems[ i ] === elem ) return true; }
				return false;
			};
		}
		return $;
	})( document, $b );
	
	return $b;
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/dollar-lib',['matreshka_dir/balalaika-extended'], factory);
    } else {
        root.__DOLLAR_LIB = factory( root.$b );
    }
}(this, function ( $b ) {
	var neededMethods = ["on", "off", "is", "hasClass", "addClass", "removeClass", "toggleClass", "add", "find"],
		neededStaticMethods = [ 'parseHTML' ],
		$ = (function(){return this;})().$,
		useCurrentDollar = true,
		i;
	
	if( typeof $ === 'function' ) {
		for( i = 0; i < neededMethods.length; i++ ) {
			if( !$.prototype[ neededMethods[ i ] ] ) {
				useCurrentDollar = false;
				break;
			}
		}
		
		for( i = 0; i < neededStaticMethods.length; i++ ) {
			if( !$[ neededStaticMethods[ i ] ] ) {
				useCurrentDollar = false;
				break;
			}
		}
	} else {
		useCurrentDollar = false;
	}
	
    return useCurrentDollar ? $ : $b;
}));
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/polyfills/number.isnan',factory);
    } else {
        factory();
    }
}(this, function () {
	Number.isNaN = Number.isNaN || function(value) {
		return typeof value === 'number' && isNaN(value);
	};
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('matreshka_dir/matreshka-core',[
			'xclass',
			'balalaika',
			'matreshka_dir/dollar-lib',
			'matreshka_dir/polyfills/number.isnan'
		], factory);
    } else {
        root.MK = root.Matreshka = factory( root.Class, root.$b, root.__DOLLAR_LIB );
    }
}(this, function ( Class, $b, $ ) {
if( !Class ) {
	throw new Error( 'Class function is missing' );
}
if( ![].forEach ) {
	throw Error( 'If you\'re using Internet Explorer 8 you should use es5-shim: https://github.com/kriskowal/es5-shim' );
}
/*
done:
	new addDependence syntax
	return this from initializeSmartArray
	renamed addDependence to addDependency
	useAs$
	requirejs file structure
	MK.procrastinate
	defined 3 modules: matreshka, balalaika and xclass
	createfrom accepts undefined
	initialize binder member
	another args for binder members
	xclass.same() method
	new MK#defineSetter method
	optimized MK#bound
	changed cases when modify event is fired on MK.Array
	use 'delete' instead of 'remove' event in MK (core) because MK.Array has same event name that fires on another action
	$b.create static method
	throw error if no [].forEach
	fixed bug in balalaika parser
	added $b.fn.is for IE8
	addEventListener as polyfill (IE8 is not depended from jQuery from now)
	experimental '@evtName' event name for MK.Array and  MK.Object
	experimental 'key@evtName' event name for MK (core)
	fixed bug in MK#once, now handler could be removed by MK#off method
	allow adding eventName + eventHandler + context triad only once per instance (close to EventTarget.prototype.addEventListener behavior, where one handler function can be added only once per event name)
	Little refactoring of MK#trigger and MK#set
	Save MK#addDependency (no infinite loop when wrong recursive dependency)
	Fixed bug in xclass (splice vs slice issue)
	Refactored on and off methods
	Allowed to add dom events (eg "click::x") before element was been bound
	Throw error when bound element is missing
	MK.$bound
	
todo:
	bindings in html
	MK.Array#empty
	MK#setConst
	remove MK.Array itemrender event, it will be replaced by @render
	'on' binder key as function that accepts callback
	[maybe] turn on/off warnings (bound element is missing etc)
	MK.Object and MK.Array on, off methods docs
*/
/**
 * @private
 * @since 0.0.4
 * @todo optimize
 */
var domEventsMap = {
	list: {},
	add: function( o ) {
		if( o.on ) {
			if( typeof o.on === 'function' ) {
				o.on.call( o.el, o.handler );
			} else {
				$( o.el ).on( o.on.split( /\s/ ).join( '.mk ' ) + '.mk', o.handler );
			}
		}
		
		( this.list[ o.instance.__id ] = this.list[ o.instance.__id ] || [] ).push( o );
	},
	rem: function( o ) {
		var evts = this.list[ o.instance.__id ],
			evt;
		if( !evts ) return;
		for( var i = 0; i < evts.length; i++ ) {
			evt = evts[ i ];
			if( evt.el !== o.el ) continue;
			o.instance.off( '__beforechange:' + o.key, evt.mkHandler );
			$( o.el ).off( evt.on + '.mk', evt.handler );
			this.list[ o.instance.__id ].splice( i--, 1 );
		}
	}
},
warnDeprecated = function( oldM, newM ) {
	if( window.console && console.warn && !warnDeprecated[ oldM ] ) {
		console.warn( 'Method Matreshka' + oldM + ' is deprecated. Please use Matreshka' + newM + ' instead.' );
		warnDeprecated[ oldM ] = true;
	}
};


/**
 * @class Matreshka
 * @version 0.1
 * @author Andrey Gubanov <a@odessite.com.ua>
 * @license {@link https://raw.github.com/finom/matreshka/master/LICENSE MIT}
 * Version 2.0, January 2004
 * @alias MK
 * @example <caption>Basic usage</caption>
 * var m = new Matreshka;
 * @example <caption>Using MK synonim</caption>
 * var m = new MK;
 * @example <caption>Inheritance</caption>
 * var MyClass = Class({
 * 	'extends': Matreshka,
 * 	method: function() {
 * 		this.initMK();
 * 	}
 * });
*/
var Matreshka,
MK = Matreshka = Class({
	//__special: null, // { <key>: { getter: f, elements: jQ, value: 4 }}
	//__events: null,
	/**
	 * @member {boolean} Matreshka#isMK
	 * @summary <code>isMK</code> is always </code>true</code>. It's using for easy Matreshka instance detection.
	 */
	isMK: true,
	/**
	 * @private
	 * @member {boolean} Matreshka#isMKInitialized
	 * @summary Using for "Lazy initialization".
	 */
	isMKInitialized: false,
	/** 
	 * @method Matreshka#on
	 * @summary Attaches event handler
	 * @desc The {@link Matreshka#on} method attaches event handler to Matreshka instance. Event could be fired by {@link Matreshka#trigger} method. 
	 * 
	 * @param {eventNames} names - Name of the space-delimited list of names (eg. "change:x ajaxcomplete change:y"). Look at {@link eventNames} docs to get more examples of event names.
	 * @param {eventHandler} callback - A function to execute when the event is triggered
	 * @param {boolean} [triggerOnInit=false] - If <code>triggerOnInit</code> equals to <code>true</code> then an event handler will be triggered immediately
	 * @param {object} [context] - An object to use as <code>this</code>when executing <code>callback</code>
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.on( 'customEvent', function() {
	 *   alert( 'customEvent is fired' );
	 * });
	 * this.trigger( 'customEvent' );
	 * @example <caption>Passing context</caption>
	 * //Alert will be execuded in window context and display second argument,
	 * //that has been passed to .trigger method
	 * this.on( 'ohmygosh', alert, window );
	 * this.trigger( 'ohmygosh', 'Hello world' );
	 * @example <caption>Calling event handler immediately after initialization</caption>
	 * //Alerts "bar" immediately and waits for triggering "foo" event
	 * this.on( 'foo', function() {
	 *   alert( 'bar' );
	 * }, true );
	 */  
	on: function( names, callback, triggerOnInit, context, xtra ) {
		if( !callback ) throw Error( 'callback is not function for event(s) "'+names+'"' );
		var _this = this,
			t;
		names = names
			.replace( /\s+/g, ' ' ) // single spaces only
			.replace(/^\s+|\s+$/g, '') // trim
			.split( /\s(?![^(]*\))/g ) // split by spaces. todo: delegated dom events .replace( /.*\((.*)\)/, '$1' )
		;
		
		if( typeof triggerOnInit !== 'boolean' && typeof triggerOnInit !== 'undefined' ) {
			t = context;
			context = triggerOnInit;
			triggerOnInit = t;
		}
		
		for( var i = 0; i < names.length; i++ ) {
			_this._on( names[ i ], callback, context, xtra );
		}
		
		if( triggerOnInit === true ) {
			callback.call( context || _this, {
				triggeredOnInit: true
			});
		}
		
		return _this;
	},
	_on: function( name, callback, context, xtra ) {
		var indexOfET = name.indexOf( '@' ),
			_this = this,
			ctx = context || _this,
			events,
			ev,
			key,
			f, f2,
			domEvtHandler, domEvt, domEvtName;
		
		if( ~indexOfET ) {
			key = name.slice( 0, indexOfET );
			name = name.slice( indexOfET + 1 );
			f = function( evt ) {
				var target = _this[ key ];
				if( target && target.isMK ) {
					target.on( name, callback, ctx );
				}
				
				if( evt && evt.previousValue && evt.previousValue.isMK ) {
					evt.previousValue.off( name, callback, context );
				}
			};
			f._callback = callback;
			_this.on( 'change:' + key, f, true, _this, name );
		} else {
			events = _this.__events[ name ] || (_this.__events[ name ] = []);
			ev = {
				callback: callback,
				context: context,
				ctx: ctx,
				xtra: xtra
			};
			
			if( !events.some( function( ev2 ) {
				return ev2.callback === ev.callback && ev2.callback._callback === ev.callback && ev2.context === ev.context;
			}) ) {
				events.push( ev );
				
				// change:x
				if( name.indexOf( 'change:' ) === 0 ) {
					_this.makeSpecial( name.replace( 'change:', '' ) );
				}
				
				// click::x
				domEvt = name.split( '::' );
				domEvtName = domEvt[ 0 ];
				key = domEvt[ 1 ]; 
				if( key ) {
					domEvtHandler = function() {
						var args = [].slice.call( arguments );
						extend( args[ 0 ], {
							self: _this,
							element: this,
							elements: $( this ),
							key: key
						});
						
						args.unshift( name );
						_this.trigger.apply( _this, args );
					};
					f = function( evt ) {
						var elements = evt && evt.elements || _this.__special[ key ] && _this.__special[ key ].elements,
							evtName = domEvtName + '.' + _this.__id + key;
						elements && elements.on( evtName, domEvtHandler );
					},
					f2 = function( evt ) {
						evt.elements && evt.elements.off( domEvtName + '.' + _this.__id + key, domEvtHandler );
					};
					
					f._callback = f2._callback = callback;
					
					_this.on( 'bind:' + key, f, true );
					_this.on( 'unbind:' + key, f2 );
				}
			}
		}
		return _this;
	},
	
	/** 
	 * @method Matreshka#once
	 * @summary Attaching event handler that executes once.
	 * @desc Works similar to {@link Matreshka#on} method but a handler could be executed only once.
	 * Pay attention that this method doesn't have <code>triggerOnInit</code> argument.
	 * @param {eventNames} names - Space-delimited list of event names (e.g. <code>"change:x ajaxcomplete change:y"</code>)
	 * @param {eventHandler} callback - A function to execute when the event is triggered
	 * @param {object} [context] - An object to use as <code>this</code>when executing <code>callback</code>
	 * @returns {mk} self
	 * @example
	 * this.once( 'change:x', function() {
	 *   alert( 'x is changed' );
	 * });
	 * this.x = Math.random(); // alerts 'x is changed'
	 * this.x = Math.random(); // does nothing
	 */
	once: function ( names, callback, context ) {
		if( !callback ) throw Error( 'callback is not function for event "'+names+'"' );
		var _this = this,
			_once = function(func) {
				var ran = false, memo;
				return function() {
					if (ran) return memo;
					ran = true;
					memo = func.apply(this, arguments);
					func = null;
					return memo;
				};
			};
			
		names = names.split( /\s/ );
		
		for( var i = 0; i < names.length; i++ ) {
			( function( name ) {
				var once = _once(function () {
					_this.off( name, once );
					callback.apply(this, arguments);
				});
				once._callback = callback;
				_this.on( name, once, context ) ;
			})( names[ i ] );
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#off
	 * @summary Removes event handlers from Matreshka instance
	 * @desc If you no longer need some event or few events, you can remove them by passing event names as first argument to the {@link Matreshka#off} method.
	 * You can specify the callback and context for the events you want to remove and you can pass nothing to remove all events.
	 * @param {eventNames} [names] - Space-delimited list of event names (e.g. <code>"change:x ajaxcomplete change:y"</code>)
	 * @param {eventHandler} [callback] - A function that has been passed to {@link Matreshka#on}
	 * @param {object} [context] - An object that used as <code>this</code> when executing <code>callback</code>
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.off( 'change:x bind' );
	 * @example <caption>Remove all events</caption>
	 * this.off();
	 * @example <caption>Remove event with given event handler</caption>
	 * var handler = function() { 
	 * 	//...
	 * }
	 * this.on( 'change:x', handler );
	 * this.off( 'change:x', handler );
	 * @example <caption>Remove event with given event handler and given context</caption>
	 * var object = {};
	 * this.on( 'change:x', handler, object );
	 * this.off( 'change:x', handler, object );
	 */
	
	off: function( names, callback, context ) {
		if (!names && !callback && !context) {
			this.events = {};
			return this;
		}
		
		names = names
			.replace( /\s+/g, ' ' ) // single spaces only
			.replace(/^\s+|\s+$/g, '') // trim
			.split( /\s(?![^(]*\))/g )
		;
		
		for (var i = 0; i < names.length; i++) {
			this._off(names[ i ], callback, context);
		}
	},
  
	_off: function( name, callback, context ) {
		var indexOfET = name.indexOf( '@' ),
			_this = this,
			retain, ev, events, key, domEvt, domEvtName, domEvtKey;
		if( ~indexOfET ) {
			key = name.slice( 0, indexOfET );
			name = name.slice( indexOfET + 1 );
			
			if( callback ) {
				_this.off( 'change:' + key, callback, context );
			} else {
				events = _this.__events[ 'change:' + key ] || [];
				for( var i = 0; i < events.length; i++ ) {
					if( events[ i ].xtra === name ) {
						_this.off( 'change:' + key, events[ i ].callback );
					}
				}
			}
			
			if( _this[ key ] && _this[ key ].isMK ) {
				_this[ key ].off( name, callback, context );
			}
			
		} else if (events = _this.__events[name]) {
			_this.__events[name] = retain = [];
			if (callback || context) {
				for (var j = 0; j < events.length; j++) {
					ev = events[j];
					if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
						retain.push(ev);
					}
				}
			}
			if (!retain.length) delete _this.__events[name];
			
			domEvt = name.split( '::' );
			domEvtName = domEvt[ 0 ];
			key = domEvt[ 1 ]; 
			if( key && _this.__special[ key ] ) {
				_this.__special[ key ].elements.off( domEvtName + '.' + _this.__id + key );
				_this.off( 'bind:' + key, callback );
				_this.off( 'unbind:' + key, callback );
			}
		}
		
		return _this;
	},
	
	/**
	 * @method Matreshka#trigger
	 * @summary Fires event(s). Subsequent arguments will be passed to event handlers.
	 * @desc After attaching event handler using {@link Matreshka#on} or {@link Matreshka#once} you can trigger it by {@link Matreshka#trigger} method and pass needed arguments to event handler by subsequent arguments.
	 * You can bind <code>"all"</code> event to catch any event triggering.
	 * @param {eventNames} [names] - Event name or space-delimited list of event names that you want to fire.
	 * @param {...*} [arg] - Arguments that you want to pass to event handlers
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.on( 'jigurda ohyeah', function( a, b, c ) {
	 * 	alert( a, b, c );
	 * });
	 * this.trigger( 'ohyeah', 1, 2, 3 ); // alerts 6
	 */
	trigger: function (names, arg) {
		var args = Array.prototype.slice.call(arguments, 1),
			events,
			allEvents = this.__events.all,
			triggerEvents = function(events, args) {
				var ev, i = -1, l = events.length;
				while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args || []);
			};
			
		if( names ) {
			names = names.split( /\s/ );
			
			for( var i = 0; i < names.length; i++ ) {
				events = this.__events[names[i]];
				if (events) triggerEvents(events, args);
			}
			
			if (allEvents && names[ 0 ].indexOf( '__' )) triggerEvents(allEvents, args);
		}

		return this;
	},
	
	/**
	 * @private
	 * @method Matreshka#lookForBinder
	 * @desc Returns options (defined in MK.defaultBinders: setValue, getValue, on) that matches given element
	 * @param {Node} el
	 * @returns {Object} properties
	 */
	lookForBinder: function( el ) {
		var result,
			ep = MK.defaultBinders;
		for( var i = 0; i < ep.length; i++ ) {
			if( result = ep[ i ].call( el, el ) ) {
				return result;
			}
		}
		return {};
	},
	
	/**
	 * @method Matreshka#bindElement
	 * @variation 1
	 * @fires bind
	 * @summary Creates event bridge between DOM node and Matreshka instance property
	 * @desc This powerful function binds to each other element and instance property with given options that say "when and how to extract element's value", "how to set element's value when property is changed".
	 * 
	 * @param {(string|mk)} key - A key (or space-delimited list keys) that has to be bound to given element(s)
	 * @param {(Node[]|NodeList|Node|jQuery|balalaika|string)} el - An element (DOM Node or DOM NodeList or array of nodes or balalaika array or jQuery instance or css selector...) that has to be bound to given key(s). Pay attention that element is required, otherwise the error will be thrown.
	 * @param {binder} [binder] - A binder object which contains following properties: <code>setValue</code> (how to set value for an element), <code>getValue</code> (how to extract value from an element), <code>on</code> (when we have to extract a value from an element and assign it to given property) and <code>initialize</code> (what to do before binder initialized). Look at the {@link binder} documentation for more info. 
	 * @param {eventOptions} [evtOpts] - If you want to set <code>"silent"</code> flag or pass some options to a <code>"bind"</code> event handler
	 * 
	 * @returns {mk} self
	 * 
	 * @example <caption>Basic usage 1</caption>
	 * this.bindElement( 'myKey', 'input[type="checkbox"]', {
	 * 	on: 'click',
	 * 	getValue: function() {
	 * 		return this.checked; // "this" is checkbox element  
	 * 	},
	 * 	setValue: function( v ) {
	 * 		this.checked = !!v;
	 * 	}
	 * });
	 * // now when element is bound you can change myKey and look at changes in UI
	 * this.myKey = true; // makes checkbox checked
	 * this.myKey = false; // makes checkbox unchecked
	 * 
	 * @example <caption>Basic usage 2. Binding using {@link Matreshka.defaultBinders} array that contains binder for few types of DOM elements (<code>input[type="text"]</code>, <code>input[type="radio"]</code>, <code>input[type="checkbox"]</code>, <code>select</code>, <code>textarea</code>). So you don't need to pass {@link binder} for such elements</caption>
	 * this.bindElement( 'myKey', '.checkbox' );
	 * 
	 * @example <caption>Custom checkbox 1. This example shows how to create your own custom checkbox that has <code>"checked"</code> class if it's state is checked.</caption>
	 * this.bindElement( 'myKey', '.custom-checkbox', {
	 * 	on: 'click',
	 * 	getValue: function() {
	 * 		return $( this ).hasClass( 'checked' );
	 * 	},
	 * 	setValue: function( v ) {
	 * 		$( this ).toggleClass( 'checked', !!v );
	 * 	}
	 * });
	 * 
	 * @example <caption>Custom checkbox 2. In this example we'll do the same as in previous example but using predefined binder via {@link Matreshka.defaultBinders}.</caption>
	 * //shift means that we're adding new default binder to the beginning of MK.defaultBinders list
	 * MK.defaultBinders.shift( function( element ) {
	 * 	if( $( element ).hasClass( 'custom-checkbox' ) ) return {
	 * 		on: 'click',
	 * 		getValue: function() {
	 * 			return $( this ).hasClass( 'checked' );
	 * 		},
	 * 		setValue: function( v ) {
	 * 			$( this ).toggleClass( 'checked', !!v );
	 * 		}
	 * 	};
	 * });
	 * 
	 * this.bindElement( 'myKey', '.custom-checkbox' );
	 * 
	 * @example <caption><code>"bind"</code> event</caption>
	 * this.on( 'bind:myKey', function() { alert( 'ok!' ); });
	 * this.bindElement( 'myKey', '.custom-checkbox' ); // alerts "ok!"
	 * 
	 * @example <caption><code>"bind"</code> event options</caption>
	 * this.on( 'bind:myKey', function() { alert( 'ok!' ); });
	 * this.bindElement( 'myKey', '.custom-checkbox', {}, { silent: true } ); // no alert
	 * 
	 * @example <caption>Extending default binders. For example we're working with <code>input[type="text"]</code>. By default <code>"on"</code> property for this element contains <code>"keydown"</code> string. But we want to use <code>"blur"</code> event for the element that has been bound to <code>myKey</code> property</caption>
	 * this.bindElement( 'myKey', '.custom-checkbox', { on: "blur" });
	 * 
	 * @example <caption>Binding <code>this</code> to the element. If you want to use context (sandbox) for bindings of elements contained in single element, you can pass <code>this</code> special argument value to the method</caption>
	 * // you can use this.bindElement( '__this__', '.app' ); instead
	 * this.bindElement( this, '.app' );
	 * // this.$( '.my-element' ) takes element(s) from .app
	 * this.bindElement( 'myKey', this.$( '.my-element' ) );
	 * @example <caption>"Bound element is mising" error</caption>
	 * vae $el = $();
	 * this.bindElement( 'x', $el ); // ERROR because $el is empty
	 * // always check is element existing
	 * if( $el.length ) {
	 * 	this.bindElement( 'x', $el );
	 * }
	 */
	
	/**
	 * @method Matreshka#bindElement
	 * @variation 2
	 * @summary key-element object syntax alternative
	 * @desc {@link Matreshka#bindElement(1)} accepts key-element object use case if you have many bindings.
	 * 
	 * @param {object} keyElementPairs - (see example)
	 * @param {binder} [binder] - (see above)
	 * @param {eventOptions} [evtOpts] - (see above)
	 * 
	 * @example <caption>Basic usage</caption>
	 * this.bindElement({
	 * 	myKey1: '.custom-checkbox',
	 * 	myKey2: 'textarea'
	 * });
	 */
	
	/**
	 * @method Matreshka#bindElement
	 * @variation 3
	 * @summary "Many options" alternative
	 * @desc {@link Matreshka#bindElement(1)} accepts one more way how to pass <code>key, element, binder</code> to the method. It looks ugly but helps when you want to memorize special bindings that you going to kill later using {@link Matreshka#unbindElement(1)}.
	 * 
	 * @param {Array[]} setOfArguments - (see example)
	 * @param {eventOptions} [evtOpts] - (see above)
	 * 
	 * @example <caption>Basic usage</caption>
	 * this.bindElement([
	 * 	[{
	 * 		myKey1: '.my-element1',
	 * 		myKey2: '.my-element2'
	 * 	}],
	 * 	[{
	 * 		myKey3: '.my-element3',
	 * 		myKey4: '.my-element4'
	 * 	}, {
	 * 		on: 'click',
	 * 		getValue: function() { ... },
	 * 		setValue: function() { ... }
	 * 	}],
	 * 	[{
	 * 		myKey5: '.my-element5',
	 * 		myKey6: '.my-element6'
	 * 	}, {
	 * 		on: 'somethingelse',
	 * 		getValue: function() { ... },
	 * 		setValue: function() { ... }
	 * 	}]
	 * ]);
	 */
	bindElement: function( key, el, binder, evtOpts ) {
		var _this = this,
			$el,
			keys,
			i,
			keyInThis = key in this;
		
		/*
		 * this.bindElement(this, el, ...);
		 */
		if( this.eq( key ) ) {
			key = '__this__';
		}
		
		/*
		 * this.bindElement([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
		 */
		if( key instanceof Array ) {
			for( i = 0; i < key.length; i++ ) {
				this.bindElement( key[ i ][ 0 ], key[ i ][ 1 ], key[ i ][ 2 ] || evtOpts, el );
			}
			
			return this;
		}
		
		
		
		/*
		 * this.bindElement('key1 key2', el, binder, { silent: true });
		 */
		if( typeof key === 'string' ) {
			keys = key.split( /\s/ );
			if( keys.length > 1 ) {
				for( i = 0; i < keys.length; i++ ) {
					this.bindElement( keys[ i ], el, binder, evtOpts );
				}
				return this;
			}
		}
		
		
		/*
		 * this.bindElement({ key: $() }, { on: 'evt' }, { silent: true });
		 */		
		if( typeof key === 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				this.bindElement( i, key[ i ], el, binder );
			}
			return this;
		}
		
		this.makeSpecial( key );
		
		$el = $( el );
		
		if( !$el.length ) {
			throw Error( 'Matreshka.js Error: Bound Element is missing for key "'+key+'"' );
		}
		
		this.__special[ key ].elements = this.__special[ key ].elements.add( $el );
		
		MK.each( $el, function( el ) {
			var _binder = binder !== null ? extend( key === '__this__' ? {} : _this.lookForBinder( el ), binder ) : {},
				options = {
					self: _this,
					key: key,
					elements: $el,
					element: el
				},
				mkHandler;
				
			if( _binder.initialize ) {
				_binder.initialize.call( el, options );
			}
			
			if( _binder.setValue ) {
				mkHandler = function( evt ) {
					var v = _this[ key ];
					_binder.setValue.call( el, v, extend( { value: v }, options ) );
				};
				_this.on( '__beforechange:' + key, mkHandler );
				if( !keyInThis && _binder.getValue ) {
					_this.__special[ key ].value = _binder.getValue.call( el, options );
				} else if( keyInThis ) {
					mkHandler();
				}
			}
			
			if( _binder.getValue && _binder.on ) {
				domEventsMap.add({
					el: el,
					on: _binder.on,
					instance: _this,
					key: key,
					mkHandler: mkHandler,
					handler: function( event ) {
						var oldvalue = _this[ key ],
							value = _binder.getValue.call( el, extend( { value: oldvalue, event: event }, options ) );
						if( value !== oldvalue ) {
							_this.set( key, value, {
								fromElement: true
							});
						}
					}
				});
			}			
		});
		
		if( !evtOpts || !evtOpts.silent ) {
			this.trigger( 'bind:' + key, extend({
				key: key,
				elements: $el,
				element: $el[ 0 ] || null
			}, evtOpts ) );
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#unbindElement
	 * @fires unbind
	 * @variation 1
	 * @summary Breaks bindings between property (or properties) and DOM element(s)
	 * @desc If you no longer need a binding between element and Matreshka property you can remove it using this method.
	 * @param {string|null} key - A key (or space-delimited list keys) that has to get rid of binding with given element(s) (null if you want to unbind element(s) from any key of instance)
	 * @param {(Node[]|NodeList|Node|jQuery|balalaika|string)} [el]- An element (DOM Node or DOM NodeList or array of nodes or jQuery instance or css selector) that has to that has to get rid of binding with given key(s)
	 * @param {eventOptions} [evtOpts] - If you want to set "silent" flag or pass some options to "unbind" event handlers
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( 'myKey', '.my-element' );
	 * this.myKey = true; // changes myKey property and element state
	 * this.unbindElement( 'myKey', '.my-element' );
	 * this.myKey = false; // changes property only
	 */
	
	/**
	 * @method Matreshka#unbindElement
	 * @variation 2
	 * @summary Alternative key-element syntax for {@link Matreshka#unbindElement(1)}
	 * @param {object} keyElementPairs (see example)
	 * @param {eventOptions} [evtOpts] (see above)
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.unbindElement({
	 *	myKey1: '.my-element1' 
	 *	myKey1: '.my-element2' 
	 * });
	 */
	
	/**
	 * @method Matreshka#unbindElement
	 * @variation 3
	 * @summary Unbinds elements that passed to "big ugly array" (lok at {@link Matreshka#bindElement(1)})
	 * @param {array[]} setOfArguments (see example)
	 * @param {eventOptions} [evtOpts] (see above)
	 * @returns {mk} self
	 *  @example <caption>Basic usage</caption>
	 * var temporaryBindings = [
	 * 	[{
	 * 		myKey1: '.my-element1'
	 * 		myKey2: '.my-element2'
	 * 	}],
	 * 	[{
	 * 		myKey3: '.my-element3'
	 * 		myKey4: '.my-element4'
	 * 	}, {
	 * 		on: 'click',
	 * 		getValue: function() { ... },
	 * 		setValue: function() { ... }
	 * 	}],
	 * 	[{
	 * 		myKey5: '.my-element5'
	 * 		myKey6: '.my-element6'
	 * 	}, {
	 * 		on: 'somethingelse',
	 * 		getValue: function() { ... },
	 * 		setValue: function() { ... }
	 * 	}]
	 * ];
	 * this.bindElement( temporaryBindings );
	 * 
	 * // you no longer want to have these bindings
	 * this.unbindElement( temporaryBindings );
	 */
	
	unbindElement: function( key, el, evtOpts ) {
		var $el,
			keys;
			
		if( this.eq( key ) ) {
			key = '__this__';
		}
		
		if( key instanceof Array ) {
			for( var i = 0; i < key.length; i++ ) {
				evtOpts = el;
				this.unbindElement( key[ i ][ 0 ], key[ i ][ 1 ] || evtOpts, evtOpts );
			}
			
			return this;
		}
		
		if( typeof key === 'string' ) {
			keys = key.split( /\s/ );
			if( keys.length > 1 ) {
				for( i = 0; i < keys.length; i++ ) {
					this.unbindElement( keys[ i ], el, evtOpts );
				}
				return this;
			}
		}
		
		
		if( typeof key === 'object' && key !== null ) {
			for( var i in key ) if( key.hasOwnProperty( i ) ) {
				this.unbindElement( i, key[ i ], el );
			}
			return this;
		} else if( key === null ) {
			for( key in this.__special ) if( this.__special.hasOwnProperty( key ) ){
				this.unbindElement( key, el, evtOpts );
			}
			return this;
		} else if( !el ) {
			if( this.__special[ key ] && this.__special[ key ].elements ) {
				return this.unbindElement( key, this.__special[ key ].elements, evtOpts );
			} else {
				return this;
			}
		}
		
		$el = $( el );
		
		MK.each( $el, function( el, i ) {
			domEventsMap.rem({
				el: el,
				instance: this
			});
		}, this );
		
		if( !evtOpts || !evtOpts.silent ) {
			this.trigger( 'unbind:' + key, extend({
				key: key,
				elements: $el,
				element: $el[ 0 ] || null
			}, evtOpts ) );
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#boundAll
	 * @summary Returns collection of all elements (wrapped with jQuery or balalaika) that bound to given property (or properties)
	 * @desc After you bound elements to a property you can extract them by using this method.
	 * @param {string} [key] - For which key or space-delimited keys we want to extract elements. If key is undefined or null the method returns elements that bound to <code>this</code>.
	 * @returns {(jQuery|balalaika)} Bound elements
	 * 
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( 'myKey', '.my-element' );
	 * this.boundAll( 'myKey' ); // returns $( '.my-element' )
	 * @example <caption>Get element bound to <code>this</code></caption>
	 * this.bindElement( this, '.app' );
	 * this.boundAll(); // returns $( '.app' )
	 */
	boundAll: function( key ) {
		var __special = this.__special,
			keys, $el;
		key = key === this || !key ? '__this__' : key;
		keys = typeof key === 'string' ? key.split( /\s/ ) : key;
		if( keys.length <= 1 ) {
			return keys[ 0 ] in __special ? __special[ keys[ 0 ] ].elements : $();
		} else {
			$el = $();
			for( var i = 0; i < keys.length; i++ ) {
				$el = $el.add( __special[ keys[ i ] ].elements );
			}
			return $el;
		}
	},
	
	/**
	 * @method Matreshka#$bound
	 * @summary Does the same as {@link Matreshka#boundAll}. 
	 */
	$bound: function( key ) {
		return this.boundAll( key );
	},
	
	/**
	 * @method Matreshka#bound
	 * @summary Returns one bound element
	 * @param {string} [key] - For which key we want to extract single element. If undefined or null returns element bound to <code>this</code>.
	 * @returns {(Node|null)} Bound element
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( 'myKey', '.my-element' );
	 * this.bound( 'mykey' ); // returns $( '.my-element' )[0]
	 * @example <caption>Get element that bound to <code>this</code></caption>
	 * this.bindElement( this, '.app' );
	 * this.bound(); // returns $( '.app' )[0]
	 */
	bound: function( key ) {
		var __special = this.__special,
			keys;
		key = key === this || !key ? '__this__' : key;
		keys = typeof key === 'string' ? key.split( /\s/ ) : key;
		if( keys.length <= 1 ) {
			return keys[ 0 ] in __special ? __special[ keys[ 0 ] ].elements[ 0 ]  : null;
		} else {
			for( var i = 0; i < keys.length; i++ ) {
				if( keys[ i ] in __special && __special[ keys[ i ] ].elements.length ) {
					return __special[ keys[ i ] ].elements[ 0 ];
				}
			}
		}
		
		return null;
	},
	
	/**
	 * @method Matreshka#$el
	 * @deprecated since 0.1. Use {@link Matreshka#boundAll} method instead
	 */
	$el: function( key ) {
		warnDeprecated( '#$el', '#boundAll' );
		return this.boundAll( key );
	},
	
	/**
	 * @method Matreshka#el
	 * @deprecated since 0.1. Use {@link Matreshka#bound} method instead
	 */
	el: function( key ) {
		warnDeprecated( '#el', '#bound' );
		return this.bound( key );
	},
	
	/**
	 * @method Matreshka#selectAll
	 * @summary Finds all elements by selector in bound to <code>this</code>
	 * @desc After you bind element to <code>this</code> (<code>"__this__"</code>) you can use this method for finding needed elements inside it.
	 * @param {string} selector
	 * @returns {(jQuery|balalaika)}
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( this, '.app' );
	 * this.selectAll( '.my-element' );
	 * // same as
	 * this.boundAll().find( '.my-element' );
	 * // same as
	 * $( '.app' ).find( '.my-element' );
	 */
	selectAll: function( s ) {
		return this.boundAll().find( s );
	},
	
	/**
	 * @method Matreshka#$
	 * @variation instance
	 * @summary Works similar to {@link Matreshka#selectAll}
	 */
	$: function( s ) {
		return this.selectAll( s );
	},
	
	/**
	 * @method Matreshka#select
	 * @summary Finds one element by selector in bound to <code>this</code>
	 * @desc After you bind element to <code>this</code> (<code>"__this__"</code>) you can use this method for finding needed element inside it.
	 * @param {string} selector
	 * @returns {(jQuery|balalaika)}
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( this, '.app' );
	 * this.select( '.my-element' );
	 * // same as
	 * this.bound().querySelector( '.my-element' );
	 * // same as
	 * $( '.app' ).find( '.my-element' )[ 0 ];
	 */
	select: function( s ) {
		var bound = this.bound();
		return bound && bound.querySelector( s );
	},
	
	/**
	 * @private
	 * @method Matreshka#makeSpecial
	 * @todo create docs
	 */
	makeSpecial: function( key ) {
		var specialProps = this.__special[ key ];
		if( !specialProps ) {
			specialProps = this.__special[ key ] = {
				elements: $(),
				value: this[ key ],
				getter: function() { return specialProps.value; },
				setter: function( v ) {
					this.set( key, v, {
						fromSetter: true
					});
				},
				mediator: null
			};
			Object.defineProperty( this, key, {
				configurable: true,
				get: function() {
					return specialProps.getter.call( this );
				},
				set: function( v ) {
					specialProps.setter.call( this, v );
				}
			});
		}
		
		return specialProps;
	},
	
	/**
	 * @method Matreshka#eq
	 * @since 0.0.2
	 * @summary Checks is instance equals to given object
	 * @desc The IE8 throws an exception when you're trying to check equality of two Matreshka instances. Use <code>.eq</code> method instead of <code>==</code> and <code>===</code>
	 * @param {object} object - An object that you wish to test for equality with 
	 * @example <caption>IE8 issue</caption>
	 * this === object; //sometimes IE8 throws "Class doesn't support Automation"
	 * @example <caption>Basic usage</caption>
	 * this.eq( object ); // true or false
	 */
	eq: function( object ) { // @IE8
		return typeof object === 'object' && object !== null && this.__id === object.__id;
	},
	
	/**
	 * @method Matreshka#defineGetter
	 * @variation 1
	 * @summary Defines getter for given property
	 * @desc This method makes possible to create custom getter using Object.defineProperty. 
	 * @param {string} key - A key for which you want to customize getter
	 * @param {function} getter - Your getter
	 * @example <caption>Basic usage</caption>
	 * this.defineGetter( 'mykey', function() {
	 * 	return 42; // you can pass any computed value 
	 * });
	 */
	
	/**
	 * @method Matreshka#defineGetter
	 * @variation 2
	 * @summary Defines getter using key-getter pairs object
	 * @param {object} keyGetterPairs (see example)
	 * @example <caption>Basic usage</caption>
	 * this.defineGetter({
	 * 	myKey1: function() { return 1; } 
	 * 	myKey2: function() { return 2; } 
	 * });
	 */
	defineGetter: function( key, getter ) {
		if( typeof key === 'object' ) {
			for( var i in key ) if( key.hasOwnProperty( i ) ) {
				this.defineGetter( i, key[ i ] );
			}
			return this;
		}
		
		var __special = this.makeSpecial( key );
		__special.getter = function() {
			return getter.call( this, {
				value: __special.value,
				key: key,
				self: this
			});
		}.bind( this );
		
		return this;
	},
	
	/**
	 * @method Matreshka#defineSetter
	 * @variation 1
	 * @summary Defines setter for given property
	 * @desc This method makes possible to attach custom setter using Object.defineProperty. Pay attention that your setter overrides Matreshka's setter and <code>change:KEY</code> events will not be triggered on given property. Use this method only if you know what do you do, otherwise look at {@link Matreshka#on} and {@link Matreshka#setMediator} methods.
	 * @param {string} key - A key for which you want to customize setter
	 * @param {function} setter - Your setter
	 * @example <caption>Basic usage</caption>
	 * this.defineSetter( 'mykey', function( v ) {
	 * 	alert( v );
	 * });
	 */
	
	/**
	 * @method Matreshka#defineSetter
	 * @variation 2
	 * @summary Defines setter using key-setter pairs object
	 * @param {object} keySetterPairs (see example)
	 * @example <caption>Basic usage</caption>
	 * this.defineSetter({
	 * 	myKey1: function( v ) { alert( v ); } 
	 * 	myKey2: function( v ) { alert( v ); } 
	 * });
	 */
	defineSetter: function( key, setter ) {
		if( typeof key === 'object' ) {
			for( var i in key ) if( key.hasOwnProperty( i ) ) {
				this.defineSetter( i, key[ i ] );
			}
			return this;
		}
		
		this.makeSpecial( key ).setter = function( v ) {
			return setter.call( this, v, {
				value: v,
				key: key,
				self: this
			});
		}.bind( this );
		
		return this;
	},
	
	/**
	 * @method Matreshka#setMediator
	 * @variation 1
	 * @since 0.1
	 * @summary Transforms property value
	 * @desc This method is using when you want to keep your property to be a certain type (string, number, object...), range (e.g. 0...100) etc
	 * @param {string|string[]} - key or keys
	 * @param {function} - mediator
	 * @todo Better description
	 * @example
	 * this.setMediator( 'x', function() { return String( s ); } );
	 * this.x = 1;
	 * alert( typeof this.x ); // "string"
	 * @example <caption>Space delimited keys</caption>
	 * this.setMediator( 'x y', function() { return String( s ); } );
	 * @example <caption>Array of keys</caption>
	 * this.setMediator( [ 'x', 'y' ], function() { return String( s ); } );
	 */
	/**
	 * @method Matreshka#setMediator
	 * @variation 2
	 * @since 0.1
	 * @summary Does same as described above but accepts key-mediator object
	 * @example
	 * this.setMediator({
	 * 	x: String,
	 * 	y: parseInt
	 * });
	 * this.x = 1;
	 * this.y = 2;
	 * alert( typeof this.x ); // "string"
	 * alert( typeof this.y ); // "number"
	 * alert( this.y ); // 12345
	 * @example <caption>Space delimited keys</caption>
	 * this.setMediator({
	 * 	'x y': String,
	 * 	'z u': parseInt
	 * });
	 */
	setMediator: function( keys, mediator ) {
		var _this = this;
		if( typeof keys === 'object' && !( keys instanceof Array ) ) {
			for( var i in keys ) if( keys.hasOwnProperty( i ) ) {
				this.setMediator( i, keys[ i ] );
			}
			return _this;
		}
		
		keys = typeof keys === 'string' ? keys.split( /\s/ ) : keys; 

		for( var i = 0; i < keys.length; i++ ) ( function( key ) {
			var __special = _this.makeSpecial( key );
		
			__special.mediator = function( v ) {
				return mediator.call( _this, v, __special.value, key, _this );
			};
			
			__special.value = __special.mediator( __special.value );
		})( keys[ i ] );

		return _this;
	},
	
	/**
	 * @method Matreshka#addDependency
	 * @variation 1
	 * @since 0.1
	 * @summary Adds dependencies between properties
	 * @desc {@link Matreshka#addDependency(1)} adds dependency of property (properties) (first argument) from another properties (second argument). This method could be used as {@link Matreshka#defineGetter(1)} alternative as better for perfomance.
	 * @param {string|string[]} keys1 - Which properties dependent on
	 * @param {string|string[]} keys2 - From what properties are dependent
	 * @param {function} [getter=function(v){ return v; }] - Should return new property value
	 * @param {boolean} [setOnInit=true] - Pass false if you don't want to set dependency immediately
	 * @example <caption>Basic usage</caption>
	 * this.a = 3;
	 * this.b = 4;
	 * this.addDependency( 'perimeter', 'a b', function() { return ( this.a + this.b ) * 2} );
	 * alert( this.perimeter ); // 14
	 * this.on( 'change:perimeter', function() {
	 * 	alert( 'perimeter is changed to ' + this.perimeter );
	 * });
	 * this.a = 5; // alerts "perimeter is changed to 18"
	 */
	
	/**
	 * @method Matreshka#addDependency
	 * @variation 2
	 * @since 0.2
	 * @summary Adds dependencies between properties of one class from another classes
	 * @param {string|string[]} keys1 - Which properties dependent on
	 * @param {Array} instances_and_keys - An array tnat contains even items as instances and odd items as their keys
	 * @param {function} [getter=function(v){ return v; }] - Should return new property value
	 * @param {boolean} [setOnInit=true] - Pass false if you don't want to set dependency immediately
	 * @example <caption>Basic usage</caption>
	 * var instance = new MK,
	 *     anotherInstance1 = new MK,
	 *     anotherInstance2 = new MK;
	 * 
	 * anotherInstance1.a= 2;
	 * anotherInstance2.b = 3;
	 * 
	 * instance.addDependency( 'sum', [
	 * 	anotherInstance1, 'a',
	 * 	anotherInstance2, 'b'
	 * ], function( a, b ) {
	 * 	return a + b;
	 * });
	 * 
	 * alert( instance.sum ); // 5
	 * 
	 * instance.on( 'change:sum', function() {
	 * 	alert( 'instance.sum is changed to ' + this.sum );
	 * });
	 * 
	 * anotherInstance1.a = 5; // alerts "sum is changed to 8"
	 */
	
	addDependency: function( key, keys, getter, setOnInit ) {
		var keys = typeof keys === 'string' ? keys.split( /\s/ ) : keys,
			on_Change = function( evt ) {//console.log( 'evt', evt.key, evt.value );
				var values = [],
					_protect = evt._protect = evt._protect || evt.key + this.__id;
			
				if( _protect !== key + self.__id ) {
					if( typeof keys[ 0 ] === 'object' ) {
						for( var i = 0; i < keys.length; i += 2 ) {
							_this = keys[ i ];
							_key = keys[ i + 1 ];
							values.push( _this[ _key ] );
						}
					} else {
						for( var i = 0; i < keys.length; i++ ) {
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
			_this, _key,
			self = this;
		getter = getter || function( value ) { return value; };
		
		
		if( typeof keys[ 0 ] === 'object' ) {
			for( var i = 0; i < keys.length; i += 2 ) {
				_this = keys[ i ];
				_key = keys[ i + 1 ];
				_this.makeSpecial( _key );
				_this.on( '__afterchange:' + _key, on_Change );
			}
		} else {
			for( var i = 0; i < keys.length; i++ ) {
				_key = keys[ i ];
				_this = this;
				_this.makeSpecial( _key );
				_this.on( '__afterchange:' + _key, on_Change );
			}
		}
		
		setOnInit !== false && on_Change.call( typeof keys[ 0 ] === 'object' ? keys[ 0 ] : this, {
			key: typeof keys[ 0 ] === 'object' ? keys[ 1 ] : keys[ 0 ]
		});
		
		return this;
	},
	
	/**
	 * @method Matreshka#addDependence
	 * @deprecated since 0.2. This method is renamed. Use {@link Matreshka#addDependency(1)} instead
	 */
	addDependence: function() {
		warnDeprecated( '#addDependence', '#addDependency' );
		return this.addDependency.apply( this, arguments );
	},
	
	/**
	 * @method Matreshka#get
	 * @summary Just returns given property value (or value returned by getter)
	 * @param {string} key
	 * @example <caption>Basic usage</caption>
	 * this.get( 'myKey' ); // same as this[ 'myKey' ] or this.myKey
	 */
	get: function( key ) {
		return this[ key ];
	},
	
	/**
	 * @method Matreshka#set
	 * @fires change
	 * @fires change:KEY
	 * @variation 1
	 * @summary Sets value of given property and gives possibility to pass event object.
	 * @desc Possible flags:
	 * <ul>
	 * <li><code>silent</code> - don't fire </code>change</code> event
	 * <li><code>force</code> - fire </code>change</code> event even if property value is not changed
	 * <li><code>forceHTML</code> - change value for bound html element even if property value is not changed
	 * <li><code>skipMediator</code> - skips mediator (look at {@link Matreshka#setMediator})
	 * </ul>
	 * @param {string} key
	 * @param {*} value
	 * @param {eventOptions} [evtOpts]
	 * @example <caption>Basic usage</caption>
	 * this.on( 'change:myKey', function( evtOpts ) {
	 * 	alert( evtOpts.value );
	 * });
	 * this.set( 'myKey', 3 ); // same as this[ 'myKey' ] = 3 or this.myKey = 3, alerts 3
	 * @example <caption>Passing <code>eventOptions</code></caption>
	 * // no alert
	 * this.set( 'myKey', 4, {
	 * 	silent: true
	 * });
	 * // alerts 5, evtOpts (first argument of event handler) contains property <code>"myFlag"</code>
	 * this.set( 'myKey', 5, { 
	 * 	myFlag: 'Jigurda'
	 * });
	 */
	/**
	 * @method Matreshka#set
	 * @variation 2
	 * @summary You can use key-value pairs object if you want to set few properties at once
	 * @param {object} keyValuePairs
	 * @param {eventOptions} [evtOpts]
	 * @example <caption>Basic usage</caption>
	 * this.set({
	 * 	myKey1: 1,
	 * 	myKey2: 2
	 * });
	 * @example <caption>Passing <code>eventOptions</code></caption>
	 * this.set({
	 * 	myKey: 3
	 * }, {
	 * 	myFlag: 'Jigurda'
	 * });
	 */
	set: function( key, v, evtOpts ) {
		if( typeof key === 'undefined' ) return this;
		
		if( typeof key === 'object' && key !== this ) {
			for( var i in key ) if( key.hasOwnProperty( i ) ) {
				this.set( i, key[ i ], v );
			}
			return this;
		}
		if( !this.__special || !this.__special[ key ] ) {
			this[ key ] = v;
			return this;
		}
		var special = this.__special[ key ],
			prevVal = special.value,
			newV;
		
		evtOpts = evtOpts || {};
		
		if( special.mediator && v !== prevVal && !evtOpts.skipMediator ) {
			newV = special.mediator.call( this, v, prevVal, key, this );
		} else {
			newV = v;
		}
		
		special.value = newV;
		
		if( newV !== v && !Number.isNaN( newV ) ) {
			this.set( key, newV, {
				silent: true,
				forceHTML: true,
				skipMediator: true
			});
		}
		
		if( newV !== prevVal || evtOpts.force || evtOpts.forceHTML ) {
			evtOpts = extend({}, evtOpts, {
				value: newV,
				previousValue: prevVal,
				key: key,
				element: special.elements[ 0 ] || null,
				elements: special.elements,
				self: this
			});
			this.trigger( '__beforechange:' + key, evtOpts );
		}
		
		
		if( ( newV !== prevVal || evtOpts.force ) && !evtOpts.silent ) {
			this
				.trigger( 'change:' + key, evtOpts )
				.trigger( 'change', evtOpts )
			;
		}
		
		if( newV !== prevVal || evtOpts.force || evtOpts.forceHTML ) {
			this.trigger( '__afterchange:' + key, evtOpts );
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#remove
	 * @fires delete
	 * @fires delete:KEY
	 * @summary Removes property from {@link Matreshka} instance
	 * @param {string} key - A key (or space-delimited list of keys) that you want to remove from current instance
	 * @param {eventOptions} [evtOptions]
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.remove( 'myKey' );
	 * this.remove( 'myKey1 myKey2' );
	 * @example <caption>Using <code>eventOptions</code></caption>
	 * this.remove( 'myKey', { silent: true } );
	 */
	remove: function( key, evtOpts ) {
		var exists,
			keys = String( key ).split( /\s/ );
			
		evtOpts = extend({
			keys: keys
		}, evtOpts );
		
		for( var i = 0; i < keys.length; i++ ) {
			exists = keys[ i ] in this;
			if( exists ) {
				evtOpts.key = keys[ i ];
				evtOpts.value = this[ keys[ i ] ];
				
				this.unbindElement( keys[ i ] ).off( 'change:' + keys[ i ] );
				
				delete this.__special[ keys[ i ] ];
				
				try { // @IE8 fix
					delete this[ keys[ i ] ];
				} catch(e) {}
				
				if( !evtOpts || !evtOpts.silent ) {
					this
						.trigger( 'delete', evtOpts )
						.trigger( 'delete:' + keys[ i ], evtOpts )
					;
				}
			}
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#define
	 * @variation 1
	 * @summary Defines property using <code>Object.defineProperty</code>. Pay attention that <code>Object.defineProperty</code> doesn't work correctly in IE8.
	 * @param {string} key - key
	 * @param {function} descriptor - descriptor
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.define( 'myKey', {
	 * 	get: function() { ... }
	 * 	set: function() { ... }
	 * });
	 */
	/**
	 * @method Matreshka#define
	 * @variation 2
	 * @summary Defines properties passed to key-descriptor object. Works similar to <code>Object.defineProperties</code>
	 * @param {object} keyObjectPairs
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.define({
	 * 	myKey1: {
	 * 		get: function() { ... }
	 * 		set: function() { ... }
	 * 	},
	 * 	myKey2: {
	 * 		get: function() { ... }
	 * 		set: function() { ... }
	 * 	}
	 * |);
	 */
	define: function( key, descriptor ) {
		if( typeof key === 'object' ) {
			for( var p in key ) {
				this.define( p, key[ p ] );				
			}		
			return this;
		}
		Object.defineProperty( this, key, descriptor );
		return this;
	},
	
	/**
	 * @method Matreshka#defineNotEnum
	 * @variation 1
	 * @summary Defines non-enumerable property using get-set hack for IE8
	 * @param {string} key - key
	 * @param {*} value - value
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.defineNotEnum( 'myKey', 3 );
	 */
	/**
	 * @method Matreshka#defineNotEnum
	 * @variation 2
	 * @summary Defines non-enumerable properties defined in key-value object
	 * @param {object} keyValuePairs
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.defineNotEnum({
	 * 	myKey1: 3,
	 * 	myKey2: 4
	 * });
	 */
	defineNotEnum: function( key, value ) {
		if( typeof key === 'object' ) {
			for( var p in key ) {
				this.defineNotEnum( p, key[ p ] );				
			}		
			return this;
		}
		
		if( MK.isXDR ) { // @IE8
			Object.defineProperty( this, key, {
				get: function() {
					return value;	
				},
				set: function( v ) {
					value = v;
				},
				configurable: true
			});
		} else {
			Object.defineProperty( this, key, {
				value: value,
				enumerable: false,
				writable: true,
				configurable: true
			});
		}
		return this;
	},
	
	/**
	 * @method Matreshka#initMK
	 * @summary Initializes Matreshka
	 * @desc This method initializes Matreshka by creating needed objects. You should call it if you inherit your own class from Matreshka.
	 * @returns {mk} self
	 * @example <caption>Usage</caption>
	 * this.initMK();
	 */
	initMK: function() {
		if( !this.isMKInitialized ) {
			this.defineNotEnum({
				/**
				* Instance id
				* @private
				* @since 0.0.2
				* @member {number}
				*/
				__id: 'mk' + new Date().getTime() + Math.random(),
				/**
				* This object contains all events
				* @private
				* @member {object}
				* @todo write documentation for __events and __special
				*/
				__events: {},
				/**
				* This object contains all special values
				* @private
				* @member {object}
				* @todo write documentation for __events and __special
				*/
				__special: {}
			});
			this.isMKInitialized = true;
		}
		
		return this;
	},
	toString: function() {
		return '[object Matreshka]'	
	},
	constructor: function() {
		this.initMK();
	}
}),

/**
 * @method Matreshka.extend
 * @summary Extends o1 object with o2
 * @prop {object} o1
 * @prop {...object} o2
 * @returns {object} o1
 * @example <caption>Usage</caption>
 * var o1 = { a: 3 },
 *     o2 = { b: 4 }
 * MK.extend( o1, o2 );
 */
extend = MK.extend = function( o1, o2 ) {
	for( var i = 1; i < arguments.length; i++ ) {
		o2 = arguments[ i ];
		for( var j in o2 ) if( o2.hasOwnProperty( j ) ) {
			o1[ j ] = o2[ j ];
		}
	}
	return o1;
};

extend( MK, {
	/**
	* @method Matreshka.Class
	* @since 0.2
	* @summary Same as {@link Class} function
	* @example
	* MK.Class({
	* 	method: function() {}
	* });
	* 
	* //does same as
	* Class({
	* 	method: function() {}
	* });
	*/
	Class: Class,
	/**
	* @method Matreshka.$
	* @variation static
	* @summary Matreshka dom library (jQuery, Zepto, Balalaika etc)
	*/
	$: $,
	/**
	* @method Matreshka.$b
	* @summary [Balaiaika]{@link $b}
	*/
	$b: $b,
	/**
	 * @method Matreshka.useAs$
	 * @since 0.2
	 * @summary Use given dom library as main dom library 
	 * @param {function} $ - your favorite library (jQuery, $b etc.)
	 * @todo Convert bound elements to given lib instance
	 * @example
	 * this.useAs$( jQuery );
	 */
	useAs$: function( _$ ) {
		return MK.$ = $ = _$;
	},
	/**
	 * @method Matreshka.useBalalaika
	 * @deprecated since 0.2. Use {@link Matreshka.useAs$} method instead
	 */
	useBalalaika: function() {
		warnDeprecated( '.useBalalaika', '.useAsDOMLib' );
		MK.$ = $ = $b;
	},
	/**
	 * @method Matreshka.usejQuery
	 * @deprecated since 0.2. Use {@link Matreshka.useAsDOMLib} method instead
	 */
	usejQuery: function() {
		warnDeprecated( '.usejQuery', '.useAsDOMLib' );
		MK.$ = $ = jQuery;
	},
	/**
	 * @member {boolean} Matreshka.isXDR
	 * @summary Tells us are we using XDomainRequest hack. In other words, is current browser IE8.
	 */
	isXDR: Class.isXDR,
	
	/**
	 * @member {Array} Matreshka.elementProcessors
	 * @enum {function}
	 * @deprecated since 0.1. This property is renamed. Use {@link Matreshka.defaultBinders} instead
	 */
	
	/**
	 * @member {Array} Matreshka.defaultBinders
	 * @enum {function}
	 * @summary {@link Matreshka.defaultBinders} is the array of functions that examine given element by given rules and returns {@link binder} if examination
 gone successfully. It's using when {@link Matreshka#bindElement(1)} method did not get third argument.
	 * @example <caption>HTML5 input type=number</caption>
	 * //shift means that we're adding new default binder to the beginning of MK.defaultBinders list
	 * MK.defaultBinders.shift( function( element ) {
	 * 	if( element.tagName === 'input' && element.type === 'number' ) return {
	 * 		on: 'mouseup',
	 * 		getValue: function() {
	 * 			return this.value;
	 * 		},
	 * 		setValue: function( v ) {
	 * 			this.value = v;
	 * 		}
	 * 	};
	 * });
	 * this.bindElement( 'myKey', '.my-input-type-number' );
	 *
	 * @example <caption>Custom checkbox</caption>
	 * MK.defaultBinders.shift( function( element ) {
	 * 	if( $( element ).hasClass( 'custom-checkbox' ) ) return {
	 * 		on: 'click',
	 * 		getValue: function() {
	 * 			return $( this ).hasClass( 'checked' );
	 * 		},
	 * 		setValue: function( v ) {
	 * 			$( this ).toggleClass( 'checked', !!v );
	 * 		}
	 * 	};
	 * });
	 * this.bindElement( 'myKey', '.custom-checkbox' );
	 */
	defaultBinders: MK.elementProcessors = [],
	
	/**
	 * @member {binder} Matreshka.htmlp
	 * @deprecated since 0.1. Use {@link Matreshka.binders.innerHTML} function instead
	 */
	htmlp: {
		setValue: function( v ) {
			warnDeprecated( '.htmlp', '.binders.innerHTML' );
			this.innerHTML = v === null ? '' : v;
		}
	},
	
	/**
	 * @method Matreshka.classp
	 * @since 0.0.2
	 * @deprecated since 0.1. Use {@link Matreshka.binders.className} function instead
	 */
	classp: function( className ) {
		var not = !className.indexOf( '!' );
		if( not ) {
			className = className.replace( '!', '' );
		}
		warnDeprecated( '.classp', '.binders.className' );
		return {
			setValue: function( v ) {
				$( this ).toggleClass( className, not ? !v : !!v );
			}
		};
	},

	/**
	 * @method Matreshka.noop
	 * @summary Just empty function
	 */
	noop: function() {},
	
	/**
	 * @method Matreshka.each
	 * @summary Iterates given object with given callback
	 * @param {object} o - Iterable object
	 * @param {function} callback - Function to execute for each element.
	 * @param {*} [thisArg] - Object to use as <code>this</code> when executing <code>callback</code>
	 */
	each: function( o, f, thisArg ) {
		if( !o ) return;
		if( 'length' in o ) [].forEach.call( o, f, thisArg );
		else for( var i in o ) if( o.hasOwnProperty( i ) ) {
			f.call( thisArg, o[ i ], i, o );
		}
		return o;
	},
	
	/**
	 * @method Matreshka.procrastinate
	 * @since 0.2
	 * @summary Allows function to be called only once per time period
	 * @param {function} f - Function that has to procrastinated
	 * @param {number} [duration=0] - Procrastination duration in msec.
	 * @param {*} [thisArg] - Object to use as <code>this</code> when executing <code>f</code>
	 * @example
	 * var procrastinated = MK.procrastinate( function( x ) {
	 * 	console.log( 'I'm so lazy', x );
	 * }, 10 );
	 * for( var i = 0; i < 100; i++ ) {
	 * 	procrastinated( i );
	 * }
	 * 
	 * // >>>  I'm so lazy 100
	 */
	procrastinate: function ( f, d, thisArg ) {
		var timeout;
		if( typeof d !== 'number' ) {
			thisArg = d;
			d = 0;
		}
		return function() {
			var args = arguments,
				_this = this;
			clearTimeout( timeout );
			timeout = setTimeout( function() {
				f.apply( thisArg || _this, args );
			}, d || 0 );
		};
	}
});

MK.defaultBinders.push( function( el ) {
	if( el.tagName === 'INPUT' && el.type === 'checkbox' ) {
		return {
			on: 'click keyup',
			getValue: function() { return this.checked; },
			setValue: function( v ) { this.checked = v; }
		};
	} else if( el.tagName === 'INPUT' && el.type === 'radio' ) {
		return {
			on: 'click keyup',
			getValue: function() { return this.value; },
			setValue: function( v ) {
				this.checked = this.value == v;
			}
		};
	} else if( el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ) {
		return {
			on: 'keyup paste',
			getValue: function() { return this.value; },
			setValue: function( v ) { this.value = v; }
		};
	} else if( el.tagName === 'SELECT' ) {
		return {
			on: 'change',
			getValue: function() { return this.value; },
			setValue: function( v ) {
				this.value = v;
				if( !v ) {
					for( var i = this.options.length - 1; i >= 0; i-- ) {
						if( this.options[ i ].value === v ) {
							this.options[ i ].selected = true;
						}
					}
				}
			}
		};
	}
});

/**
 * Matreshka event handler
 * @callback eventHandler
 * @param {...*} options - any arguments that passed to {@link Matreshka#trigger} after event name
 * @example
 * var eventHandler = function() {
 * 	console.log( arguments ); 
 * }
 * this.on( 'fyeah', eventHandler );
 * this.trigger( 'fyeah', 'foo', 'bar', 'baz' ); // logs 'foo', 'bar', 'baz'
 */
 
 /**
 * {@link Matreshka} instance
 * @typedef {object} mk
 */

/**
 * {@link $b} instance
 * @typedef {Array} balalaika
 */

 /**
 * Event name or space-delimited list of event names
 * @typedef {string} eventNames
 * @example <caption>Space-delimited list of event names</caption>
 * this.on( 'x y z', function() {} );
 * @example <caption><code>change:KEY</code> event. Listens changes of given property.</caption>
 * this.on( 'change:x', function( evt ) {
 * 	alert( evt.value );
 * });
 * this.x = 1;
 * @example <caption>DOM events for bound elements (<code>DOM_EVENT::KEY</code>). Fires when fiven DOM event is fired on bound element (since v0.1.0).</caption>
 * this.bindElement( 'x', '.my-button' );
 * this.bindElement( 'y', '.my-select' );
 * this.on( 'click::x change::y', function( evt ) {
 * 	alert( 'clicked "x" or changed "y"' );
 * });
 * @example <caption>Bubbling events (<code>KEY@EVENT_NAME</code>). You can attach event to any inner member of Matreshka (since v0.2.0). This event type is "live" and fires even when property is set after event initialized.</caption>
 * this.on( 'x@change:a', function() {
 * 	alert( '"x.a" is changed' );
 * });
 * this.x = new MK;
 * this.x.a = 1;
 * @example <caption>Bubbling events (<code>@EVENT_NAME</code>) for <code>MK.Object</code> members (since v0.2.0). This event type is "live" and fires even when property is set after event initialized.</caption>
 * this.on( '@change:a', function() {
 * 	alert( '"a" is changed' );
 * });
 * this.jset( 'x', new MK );
 * this.x.a = 1;
 * @example <caption>Bubbling events (<code>@EVENT_NAME</code>) for <code>MK.Array</code> members (since v0.2.0). This event type is "live" and fires even when element is added after event initialized.</caption>
 * this.on( '@change:a', function() {
 * 	alert( '"a" is changed' );
 * });
 * this.push( new MK );
 * this[ 0 ].a = 1;
 */

 /**
 * <code>binder</code> contains information about how to extract value from an element, how to set value for an element and which element's event we have to listen
 * @typedef {object} binder
 * @property {string|function} [on] - event name or space-delimited list of events or which we have to listen. Function contained callback is also supported.
 * @property {function} [getValue] - function that tells how to extract value from an element (context <code>this</code> is given element)
 * @property {function} [setValue] - "How to set value" for an element (context <code>this</code> is given element)
 * @property {function} [initialize] - Fuction that executes once per binding
 * 
 * @example
 * var binder = {
 * 	on: 'click',
 * 	getValue: function( options ) { return this.value; } 
 * 	setValue: function( v, options ) { this.value = v; },
 * 	initialize: function( options ) {
 * 		alert( 'Binder is initialized. Initial input value=' + this.value );
 * 	}
 * };
 * this.bindElement( 'a', '.my-checkbox', binder );
 * @example <caption>Function as <code>on</code> property</caption>
 * var binder = {
 * 	on: function( callback ) {
 * 		this.onclick = callback;
 * 	},
 * 	getValue: function( options ) { return this.value; } 
 * 	setValue: function( v, options ) { this.value = v; },
 * 	initialize: function( options ) {
 * 		alert( 'Binder is initialized. Initial input value=' + this.value );
 * 	}
 * };
 * this.bindElement( 'a', '.my-checkbox', binder );
 */

/**
 * @typedef {object} eventOptions
 * @summary <code>eventOptions</code> object could contain any properties
 * @desc The one of special properties is <code>"silent"</code> that could be passed to <code>Matreshka#set</code>, <code>Matreshka#remove</code>, <code>Matreshka#bind</code>, <code>Matreshka#unbind</code> if you'd like to prevent the event from being triggered
 * 
 * @example
 * var eventOptions = { silent: true };
 * this.a = 1;
 * this.on( 'change:a', function() { alert( 'a is changed' ); });
 * this.a = 2; // no alert
 *
 * @example
 * var eventOptions = { f: 'yeah' };
 * this.a = 1;
 * this.on( 'change:a', function( eventOptions ) { alert( eventOptions.f ); });
 * this.set( 'a', 2 ); // alerts "yeah"
 */

return Matreshka;
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define( 'matreshka_dir/matreshka-object',[ 'matreshka_dir/matreshka-core'], factory );
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

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define( 'matreshka_dir/matreshka-array',[ 'matreshka_dir/matreshka-core' ], factory );
    } else {
        factory( root.MK );
    }
}(this, function ( MK ) {
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	
	var Array_prototype = Array.prototype,
		// Array methods flags
		SIMPLE = 1,
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
			return function() {
				throw Error( 'There no such method: ' + name + '. If you\'re using Internet Explorer 8 you should use es5-shim: https://github.com/kriskowal/es5-shim' );
			}
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
	 * 		// calls MK.Array constructor with same context and given arguments
	 * 		MyClass.parent.constructor( this, arguments );
	 *	},
	 * 	method: function() {}
	 * });
	 */
	return MK.Array = MK.Class({
		'extends': MK,
		/**
		 * @member {boolean} Matreshka.Array#isMKArray
		 * @summary <code>isMKArray</code> is always </code>true</code>. It's using for easy Matreshka.Array instance detection.
		 */
		isMKArray: true,
		length: 0,
		/**
		 * @method Matreshka.Array#itemRenderer
		 * @since 0.1
		 * @todo Maybe clearer explanation
		 * @summary Renderer for array items
		 * @desc This method equals to <code>null</code> by default. You can assign function that returns element for making {@Matreshka Array} to be "smart array" that changes DOM automatically when data is changed. Check [live example]{@link http://finom.github.io/matreshka/examples/#mk.array_itemrenderer} to see how it works.
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
		 * @summary Transforms items values
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
		 * @method Matreshka.Array#on
		 * @since 0.2
		 * @summary Works same way as {@link Matreshka#on} and allows to attach event handlers for any existing and furite items
		 * @example
		 * var mkArray = new MK.Array();
		 * mkArray.on( '@something', function() {
		 * 	alert( 'something happens' )
		 * });
		 * mkArray.push( new MK );
		 * mkArray[ 0 ].trigger( 'something' );
		 */ 
		
		_on: function( name, callback, context, xtra ) {
			var _this = this,
				f;
			if( name.indexOf( '@' ) === 0 ) {
				name = name.slice( 1 );
				f = function( evt ) {
					( evt && evt.added ? evt.added : _this ).forEach( function( item ) {
						item.isMK && item.on( name, callback, false, context || _this );
					}, _this );
				};
				
				f._callback = callback;
				_this.on( 'add', f, _this, true, name );
			} else {
				MK.prototype._on.call( _this, name, callback, context, xtra );
			}
			
			return this;
		},
		
		_off: function( name, callback, context ) {
			var _this = this,
				events;
			if( name.indexOf( '@' ) === 0 ) {
				name = name.slice( 1 );
				if( callback ) {
					_this.off( 'add', callback, context );
				} else {
					events = _this.__events.add || [];
					for( var i = 0; i < events.length; i++ ) {
						if( events[ i ].xtra === name ) {
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
		/**
		 * @method Matreshka.Array#createFrom
		 * @fires recreate
		 * @fires modify
		 * @summary Recreates {@link Matreshka.Array} instance from another array 
		 * @desc You can convert array or array-like object (e.g. arguments) to {@link Matreshka.Array} instance using this method
		 * @param {Array} array
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * new MK.Array().createFrom( [1, 2, 3, 4, 5] );
		 */
		createFrom: function( array ) {
			var evtOpts = {
				createdFrom: array = array || [],
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
		 * @summary Converts {@link Matreshka.Array} to Javascript Array
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
		 * @summary Does the same as {@link Matreshka.Array#toArray}
		 * @returns {Array} Array instance
		 * @example <caption>Basic usage</caption>
		 * this.toNative();
		 */
		toNative: function() {
			return this.toArray();
		},
		
		/**
		 * @method Matreshka.Array#initMK
		 * @summary Initializes {@link Matreshka.Array} instance. See {@link Matreshka#initMK}.
		 * @returns {mkArray} self
		 * @example <caption>Basic usage</caption>
		 * var MyClass = Class({
		 * 	'extends': MK.Array,
		 * 	constructor: function() {
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
				.on( 'add remove sort reverse', function( evt ) {
					_this.trigger( 'modify', evt );
				})
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
				$el = typeof template === 'string' ? MK.$.parseHTML( template.replace( /^\s+|\s+$/g, '' ) ) : MK.$( template );
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
		 * @desc This method is only needed when you're setting {@link Matreshka.Array#itemRenderer} property after some items are added.
		 * @returns {boolean}
		 * @example <caption>Basic usage</caption>
		 * var mkArray = new MK.Array;
		 * // DOM is not changing because itemRenderer is not assigned yet
		 * mkArray.push( ... );
		 * mkArray.itemRenderer = function() { '&lt;div&gt;MyDiv&lt;/div&gt;' };
		 * // DOM is changing after initializeSmartArray execution
		 * mkArray.initializeSmartArray();
		 * @example <caption>When <code>initializeSmartArray</code> is not needed</caption>
		 * var mkArray = new MK.Array;
		 * // setting itemRenderer before adding any item to array
		 * mkArray.itemRenderer = function() { '&lt;div&gt;MyDiv&lt;/div&gt;' };
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
			
			return _this;
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
		 * @summary Converts {@link Matreshka.Array} instance to native array
		 * @desc The difference between {@link Matreshka.Array#toJSON} and {@link Matreshka.Array#toArray} is that {@link Matreshka.Array#toJSON} tries to call toJSON method for inner objects 
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
		 * @summary Works similar to {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat Array.prototype.concat}
		 * @param {...Array|...Matreshka.Array} array (Array instance or MK.Array instance)
		 * @returns {mkArray} new {@link Matreshka.Array} instance
		 * @example <caption>Basic usage 1</caption>
		 * var result = this.concat( [ 1, 2, 3 ] );
		 * @example <caption>Basic usage 2</caption>
		 * var mkArray = new MK.Array().createFrom( [ 1, 2, 3, 4, 5 ] ),
		 *     result = this.concat( mkArray, [ 6, 7, 8 ] );
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
		 * @summary Removes {@link Matreshka#Array} element by given index and returns that element
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
		 * 	return item > 10;
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
		 * 	return item > 10;
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
		 * @summary Works similar to {@link Matreshka.Array#forEach}
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
 * <p>To keep methods as fast as possible and reduce errors, most of methods are written using native {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype Array.prototype} methods. Pay attention that callback gets third argument that doesn't match self (<code>this</code> of the method). This is Internet Explorer 8 support restriction and will be fixd after we refuse it.</p>
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
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define( 'matreshka_dir/matreshka-binders',[ 'matreshka_dir/matreshka-core' ], factory );
    } else {
        factory( root.MK );
    }
}(this, function ( MK ) {
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	var constructObject = function( f ) {
		return { on: null, getValue: null, setValue: f };
	};
	/**
	 * @namespace Matreshka.binders
	 * @desc Collection of binders. Feel free to add your own binders to this namespace.
	 */
	return MK.binders = {
		/**
		* @function Matreshka.binders.innerHTML
		* @since 0.1
		* @summary <code>innerHTML</code> binder
		* @desc This function returns {@link binder} that syncronizes property value and bound element <code>innerHTML</code>.
		* @returns {binder}
		* @example <caption>Usage</caption>
		* this.bindElement( 'myKey', '.my-element', MK.binders.innerHTML() );
		* // same as
		* this.bindElement( 'myKey', '.my-element', { // no "getValue" and no "on" property
		* 	setValue: function( v ) {
		* 		this.innerHTML = v;
		* 	}
		* });
		*/
		innerHTML: function() {// @IE8
			return constructObject( function( v ) {
				this.innerHTML = v === null ? '' : v;
			});
		},
  
		/**
		* @function Matreshka.binders.className
		* @since 0.1
		* @summary <code>className</code> binder
		* @desc This function returns {@link binder} that binds element to a property as element class name switcher.
		* @param {string} className
		* @returns {binder}
		* @example <caption>Usage</caption>
		* this.bindElement( 'myKey', '.my-element', MK.binders.className( 'blah' ) );
		* // same as
		* this.bindElement( 'myKey', '.my-element', { // no "getValue" and no "on" property
		* 	setValue: function( v ) {
		* 		$( this ).toggleClass( 'blah', v );
		* 	}
		* });
		* this.myKey = true; // adds 'blah' class to '.my-element'
		* this.myKey = false; // removes 'blah' class from '.my-element'	
		* @example <caption>Using "!" (not) statement</caption>
		* this.bindElement( 'shown', '.my-element', MK.binders.className( '!hide' ) );
		* // same as
		* this.bindElement( 'shown', '.my-element', { // no "getValue" and no "on" property
		* 	setValue: function( v ) {
		* 		$( this ).toggleClass( 'hide', !v );
		* 	}
		* });
		* this.shown = true; // removes 'hide' class from '.my-element'
		* this.shown = false; // adds 'hide' class to '.my-element'
		*/
		className: function( className ) {
			var not = !className.indexOf( '!' );
			if( not ) {
				className = className.replace( '!', '' );
			}
			return constructObject( function( v ) {
				MK.$( this ).toggleClass( className, not ? !v : !!v );
			});
		},
		switchClassName: function( className1, className2 ) {
			return constructObject( function( v ) {
				var $this = MK.$( this );
				$this.toggleClass( className2, !v );
				$this.toggleClass( className1, !!v );
			});
		},
		property: function( propertyName ) {
			return constructObject( function( v ) {
				this[ propertyName ] = v;
			});
		},
		switchProperty: function( propertyName, value1, value2 ) {
			return constructObject( function( v ) {
				this[ propertyName ] = v ? value1 : value2;
			});
		},
		attribute: function( attributeName ) {
			return constructObject( function( v ) {
				this.setAttribute( attributeName, v );
			});
		},
		switchAttribute: function( attributeName, value1, value2 ) {
			return constructObject( function( v ) {
				this.setAtteibute( attributeName, v ? value1 : value2 );
			});
		}
	};
}));
if ( typeof define === 'function' && define.amd ) {
	define( 'matreshka', [
		'matreshka_dir/matreshka-core',
		'matreshka_dir/matreshka-object',
		'matreshka_dir/matreshka-array',
		'matreshka_dir/matreshka-binders'
	], function( MK, MK_Object, MK_Array, MK_binders ) {
		return MK;
	});
};
;if(typeof define==="function"&&define.amd)define(["matreshka"],function(MK){return MK;});