// taken from https://github.com/remy/polyfills
(function () {

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
		toggle: function (token) {
			if (!this.contains(token)) {
				this.add(token);
			} else {
				this.remove(token);
			}

			return this.contains(token);
		}
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

})(); 
;"use strict";
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
 * <p>WARNING: This lib works fine in modern browsers (including Internet Explorer 9) only or using DOM shims. For older browsers you still need jQuery.</p>
 * 
 * @example $( 'div' ).forEach( ... );
 * @example $( 'span', document.body ).map( ... );
 * @example $( '.button' ).on( 'click.mynamespace', ... );
 * @example $( '.button' ).off( '.mynamespace' );
 */
// nsRegAndEvents is regesp for eventname.namespace and the list of all events
// fn is empty array and balalaika prototype
window.$b = (function( window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $ ) {
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
})( window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector' );;"use strict";
( function( $, s_classList ) {
	if( !$b ) {
		throw new Error( 'Balalaika is missing' );
	}
	
	$b.extend( $b.fn, {
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
			var result = $b( this );
			s = $b( s ).slice();
			[].push.apply( result, s );
			for( var i = result.length - s.length; i < result.length; i++ ) {
				if( result.indexOf( result[ i ] ) !== i ) {
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
			node = node.firstElementChild;
		}
		
		return $b( node.children );
	};
	
	
	
	// IE8 Balalaika fix. This browser doesn't support HTMLCollection and NodeList as second argument for .apply
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
		}
		return $;
	})( document, $b );
	
	return $b;
})( window.$b, 'classList' ); 
;"use strict";
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
 * 		C.parent.method2( this, arguments );
 * 	},
 * 	method3: function( a, b ) { ... }
 * });
 * var D = Class({
 * 	'extends': C,
 * 	method3: function( a, b ) {
 * 		// you can pass any arguments to the method
 * 		// the same as C.prototype.call( this, a, b );
 * 		C.parent.method2( this, a, b );
 * 	}
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
})( this );;"use strict";// v2402
( function( gc, Class ) {
if( !Class ) {
	throw new Error( 'Class function is missing' );
}

// done: passed arguments to addDependence handler on init,
// bound, boundAll, select, selectAll,, element, elements as bindElement argument,
// pop and shift return returned value
// Allow to use numbers in MK.Object#addJSONKeys and MK.Object#removeJSONKeys, MK#remove
// Return removed element from MK.Array#pop and MK.Array#shift methods
// Do nothing if undefined is passed to MK.Object#addJSONKeys and MK.Object#removeJSONKeys
// Use element as this in MK.elementProcessors functions
// Listen 'keyup' event for checkboxes/radios (if keyboard is using) (MK.elementProcessors)
// Listen 'paste' event for input[type="text"] and textarea (MK.elementProcessors)
// Make possible to add DOM events like so:
// Class.Interface
// merged mk.domarray
// MK.Array#pull
// isMKObject, Array
// initAllDOMItems (no docs!)
// balalaika methods, new file structure
// arguments event property from mkArray renamed to args and made them array
// optional container for mkArray
// MK.binders
// MK.defaultBinders instead of elementProcessors
// mkArray triggers add remove
// removed capture argument from createFrom method
// recreate DOM handler and triggering add/remove
//fix: once doesn't work
//setMediator
// MK.Array#renderer -> itemRenderer
// initAllDOMItems -> initializeSmartArray
// Model for MK.Array,
// setItemMediator

var $ = window.jQuery || window.$b,

/**
 * @private
 * @since 0.0.4
 * @todo optimize
 */
_elementEvents = {
	list: {},
	add: function( o ) {
		$( o.el ).on( o.on.split( /\s/ ).join( '.mk ' ) + '.mk', o.handler );
		( this.list[ o.instance.__id ] = this.list[ o.instance.__id ] || [] ).push( o );
	},
	rem: function( o ) {
		var evts = this.list[ o.instance.__id ],
			evt;
		if( !evts ) return;
		for( var i = 0; i < evts.length; i++ ) {
			evt = evts[ i ];
			if( evt.el !== o.el ) continue;
			o.instance.off( '_change:' + o.key, evt.mkHandler );
			$( o.el ).off( evt.on + '.mk', evt.handler );
			this.list[ o.instance.__id ].splice( i--, 1 );
		}
	}
},
warn = function( warning ) {
	window.console && console.warn && console.warn( warning );
},
warnDeprecated = function( oldM, newM ) {
	warn( 'Method Matreshka' + oldM + ' is deprecated. Please use Matreshka' + newM + ' instead.' );
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
 *  }
 * });
*/
var MK = gc.MK = gc.Matreshka = Class({
	//__special: null, // { <key>: { getter: f, elements: jQ, value: 4 }}
	//__events: null,
	/**
	 * @member {boolean} Matreshka#isMK
	 * @summary <code>isMK</code> is always </code>true</code>. It using for easy detecting Matreshka instance.
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
	 * @summary Attaches an event handler to the self
	 * @desc The {@link Matreshka#on} method attaches event handler to the Matreshka instance. The event could be triggered by {@link Matreshka#trigger} method. 
	 * You can pass <code>"change:myKey"</code> as first {@link Matreshka#on} argument to monitor <code>"myKey"</code> property changes.
	 * @param {eventNames} names - Names of the space-delimited list of events (eg. "change:x ajaxcomplete change:y")
	 * @param {eventHandler} callback - A function to execute when the event is triggered
	 * @param {boolean} [triggerOnInit=false] - If <code>triggerOnInit</code> equals to <code>true</code> then an event handler will be triggered immediately
	 * @param {object} [context] - An object to use as <code>this</code>when executing <code>callback</code>
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.on( 'change:x', function() {
	 *   alert( 'x is changed' );
	 * });
	 * this.x = Math.random();
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
	on: function ( names, callback, triggerOnInit, context ) {
		if( !callback ) throw Error( 'callback is not function for event(s) "'+names+'"' );
		var events,
			ev,
			names = names.split( /\s/ ),
			ctx,
			key,
			domEvt,
			domEvtName,
			domEvtKey,
			_this = this,
			t;
		
		
		if( typeof triggerOnInit !== 'boolean' ) {
			t = context;
			context = triggerOnInit;
			triggerOnInit = t;
		}
		
		ctx = context || _this
		for( var i = 0; i < names.length; i++ ) {
			events = _this.__events[names[i]] || (_this.__events[names[i]] = []);
			ev = {
				callback: callback,
				context: context,
				ctx: ctx
			};
			
			events.push( ev );
			
			if( !names[ i ].indexOf( 'change:' ) ) { // means 'change:' in the beginning of the string
				_this.makeSpecial( names[ i ].replace( 'change:', '' ) );
			}
			
			
			domEvt = names[ i ].split( '::' );
			domEvtName = domEvt[ 0 ];
			domEvtKey = domEvt[ 1 ]; 
			if( domEvtKey && _this.__special[ domEvtKey ] ) {
				( function( evtName ) {
					_this.__special[ domEvtKey ].elements.on( domEvtName + '.' + _this.__id + domEvtKey, function() {
						var args = [].slice.call( arguments );
						MK.extend( args[ 0 ], {
							element: this,
							elements: $( this ),
							key: domEvt[ 1 ]
						});
						
						args.unshift( evtName );
						_this.trigger.apply( _this, args );
					});
				})( names[ i ] );
			}
			
		}
		
		if( triggerOnInit === true ) {
			ev.callback.call( ev.ctx, {
				triggeredOnInit: true
			});
		}
		
		return this;
	},
	
	/** 
	 * @method Matreshka#once
	 * @summary Attaches an event handler to the self. A handler is executed at most once.
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
		var self = this,
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
					self.off(name, once);
					callback.apply(this, arguments);
				});
				
				this.on( name, once, context ) ;
			}).call( this, names[ i ] );
			
			if( !names[ i ].indexOf( 'change:' ) ) { // means 'change:' substring is in the beginning of the string
				this.makeSpecial( names[ i ].replace( 'change:', '' ) );
			}
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#off
	 * @summary Removes all event handlers from Matreshka instance of given events
	 * @desc If you no longer need some event or few events, you can remove them by passing event names as first argument to the {@link Matreshka#off} method.
	 * You can specify the callback and given context for the events that you want to remove and you can pass nothing to remove all events.
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
	off: function (names, callback, context) {
		var retain, ev, events, names, i, l, j, k, domEvt, domEvtName, domEvtKey;
		
		if (!names && !callback && !context) {
			this.events = {};
			return this;
		}
		names = names.split( /\s/ );
		for (i = 0, l = names.length; i < l; i++) {
			name = names[i];
			if (events = this.__events[name]) {
				this.__events[name] = retain = [];
				if (callback || context) {
					for (j = 0, k = events.length; j < k; j++) {
						ev = events[j];
						if ((callback && callback !== ev.callback && callback !== ev.callback._callback) || (context && context !== ev.context)) {
							retain.push(ev);
						}
					}
				}
				if (!retain.length) delete this.__events[name];
				
				domEvt = names[ i ].split( '::' );
				domEvtName = domEvt[ 0 ];
				domEvtKey = domEvt[ 1 ]; 
				if( domEvtKey && this.__special[ domEvtKey ] ) {
					this.__special[ domEvtKey ].elements.off( domEvtName + '.' + this.__id + domEvtKey );
				}
			}
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#trigger
	 * @summary Trigger callbacks (event handlers) for the given event, or space-delimited list of events. Subsequent arguments to trigger will be passed along to the event callbacks.
	 * @desc After attaching event using {@link Matreshka#on} or {@link Matreshka#once} you can trigger it by {@link Matreshka#trigger} method and pass needed arguments to event handler using subsequent arguments.
	 * You can bind <code>"all"</code> event to catch any event triggering.
	 * @param {eventNames} [names] - Space-delimited list of event names that you want to trigger
	 * @param {...*} [arg] - Arguments that you wish to pass to the event handler
	 * @returns {mk} self
	 * @example <caption>Basic usage</caption>
	 * this.on( 'somethingchanged ohyeah', function( a, b, c ) {
	 * 	alert( 1 + 2 + 3 );
	 * });
	 * this.trigger( 'ohyeah', 1, 2, 3 ); // alerts 6
	 */
	trigger: function (names, arg) {
		var args = Array.prototype.slice.call(arguments, 1),
			silentAllEvent = args[ 0 ] && args[ 0 ].silentAllEvent,
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
		}
		
		if (allEvents && !silentAllEvent) triggerEvents(allEvents, args);
		
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
	 * @desc This powerful function binds element to instance property with given options that say when and how to extract element's value, how to set element's value when property is changed.
	 * 
	 * @param {(string|mk)} key - A key (or space-delimited list keys) that has to be binded to given element(s)
	 * @param {(Node[]|NodeList|Node|jQuery|balalaika|string)} el - An element (DOM Node or DOM NodeList or array of nodes or balalaika array or jQuery instance or css selector...) that has to be binded to given key(s)
	 * @param {binder} [binder] - A binder object which contains following properties: setValue (how to set value for an element), getValue (how to extract value from an element), on (when we have to extract a value from an element and assign it to given property)
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
	 * // now when element is binded you can change myKey and look at changes in UI
	 * this.myKey = true; // makes checkbox checked
	 * this.myKey = false; // makes checkbox unchecked
	 * 
	 * @example <caption>Basic usage 2. By {@link Matreshka.defaultBinders} array that contains binder for few dom elements (<code>input[type="text"]</code>, <code>input[type="radio"]</code>, <code>input[type="checkbox"]</code>, <code>select</code>, <code>textarea</code>). So you don't need to pass eventOptions for these elements</caption>
	 * this.bindElement( 'myKey', '.checkbox' );
	 * 
	 * @example <caption>Custom checkbox 1. This example Shows how to create your own custom checkbox that has <code>"checked"</code> class if it's state is checked.</caption>
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
	 * 	})
	 * this.bindElement( 'myKey', '.custom-checkbox' );
	 * 
	 * @example <caption>Use <code>"bind"</code> event</caption>
	 * this.on( 'bind:myKey', function() { alert( 'ok!' ); });
	 * this.bindElement( 'myKey', '.custom-checkbox' ); // alerts "ok!"
	 * 
	 * @example <caption>Use <code>"bind"</code> event options</caption>
	 * this.on( 'bind:myKey', function() { alert( 'ok!' ); });
	 * this.bindElement( 'myKey', '.custom-checkbox', {}, { silent: true } ); // no alert
	 * 
	 * @example <caption>Extending default binders. For example we're working with <code>input[type="text"]</code>. By default <code>"on"</code> property for this element contains <code>"keydown"</code> string. But we want to use <code>"blur"</code> event for the element that has been bound to <code>myKey</code> property</caption>
	 * this.bindElement( 'myKey', '.custom-checkbox', { on: "blur" });
	 * 
	 * @example <caption>Bind self to the element. If you want to use context (sandbox) for binding of elements contained in single element, you can pass <code>this</code> special property to the method</caption>
	 * // you can use this.bindElement( '__this__', '.app' ); instead
	 * this.bindElement( this, '.app' );
	 * // this.$( '.my-element' ) takes element(s) from .app
	 * this.bindElement( 'myKey', this.$( '.my-element' ) );
	 */
	
	/**
	 * @method Matreshka#bindElement
	 * @variation 2
	 * @summary Object alternative
	 * @desc {@link Matreshka#bindElement} accepts key-element use case if you have many bindings.
	 * 
	 * @param {object} keyElementPairs
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
	 * @summary Many options alternative
	 * @desc {@link Matreshka#bindElement} accepts one more way how to pass <code>key, element, binder</code> to the method. It looks ugly but helps when you want to memorize special bindings that you going to kill later using {@link Matreshka#unbindElement}.
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
		var self = this,
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
			warn( 'Bound Element is missing for key "'+key+'"' );
			return this;
		}
		
		this.__special[ key ].elements = this.__special[ key ].elements.add( $el );
		
		MK.each( $el, function( el ) {
			var options = binder !== null ? MK.extend( key === '__this__' ? {} : self.lookForBinder( el ), binder ) : {},
				mkHandler;
			if( options.setValue ) {
				mkHandler = function( evt ) {
					options.setValue.call( el, self[ key ], self, key );
				};
				self.on( '_change:' + key, mkHandler );
				if( !keyInThis && options.getValue ) {
					self.__special[ key ].value = options.getValue.call( el, self, key, null );
				} else if( keyInThis ) {
					mkHandler();
				}
			}
			
			if( options.getValue && options.on ) {
				_elementEvents.add({
					el: el,
					on: options.on,
					instance: self,
					key: key,
					mkHandler: mkHandler,
					handler: function( event ) {
						var value = options.getValue.call( el, self, key, event );
						if( value !== self[ key ] ) {
							self.set( key, value, {
								fromElement: true
							});
						}
					}
				});

				/*$( el ).on( options.on.split( /\s/ ).join( '.mk ' ) + '.mk', { mk: {
					instance: self,
					key: key,
					mkHandler: mkHandler
				}}, function() {
					var value = options.getValue.call( el, self, key );
					if( value !== self[ key ] ) {
						self.set( key, value, {
							fromElement: true
						});
					}
				});*/
			}			
		});
		
		
		
		if( !evtOpts || !evtOpts.silent ) {
			this.trigger( 'bind:' + key, MK.extend({
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
	 * @summary Unbinds element from given property
	 * @desc If you no longer need a bridge between element and Matreshka property you can remove it by this method.
	 * @param {string|null} key - A key (or space-delimited list keys) that has to be unbinded from given element(s) (null if you want to unbind element(s) from any key of instance)
	 * @param {(Node[]|NodeList|Node|jQuery|balalaika|string)} [el]- An element (DOM Node or DOM NodeList or array of nodes or jQuery instance or css selector) that has to be unbinded from given key(s)
	 * @param {eventOptions} [evtOpts] - If you want to set "silent" flag or pass some options to "unbind" event handler
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
	 * @summary Unbinds element(s) from given properties contained in key-element object
	 * @param {object} keyElementPairs (see example)
	 * @param {(Node[]|NodeList|Node|jQuery|balalaika|string)} [el]
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
	 * @summary Unbinds elements that passed to big ugly array (see {@link Matreshka#bindElement})
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
	 * ]
	 * this.bindElement( temporaryBindings );
	 * 
	 * // you no longer want to have these bindings
	 * this.unbindElement( temporaryBindings );
	 */
	
	unbindElement: function( key, el, evtOpts ) {
		var $el,
			keys,
			evts = _elementEvents[ this.__id ];
		
		if( !evts ) return this;
			
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
			_elementEvents.rem({
				el: el,
				instance: this
			});
			
			/*var evts = $._data( el, 'events' );
			MK.each( evts, function( evt, evtName ) {
				var mk;
				for( var i = 0; i < evt.length; i++ ) {
					if( evt[ i ].namespace === 'mk' && 'mk' in evt[ i ].data && this.eq( evt[ i ].data.mk.instance) ) {
						mk = evt[ i ].data.mk;
						this.off( '_change:' + mk.key, mk.mkHandler );
						// @question can I remove an element from event array: evt.splice( i--, 1 );? It works but I'm not sure is this good idea.
						$( el ).off( evtName + '.mk', evt[ i ].handler );
					}
				}
			}, this )*/
		}, this );
		
		if( !evtOpts || !evtOpts.silent ) {
			this.trigger( 'unbind:' + key, MK.extend({
				key: key,
				elements: $el,
				element: $el[ 0 ] || null
			}, evtOpts ) );
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#boundAll
	 * @summary Returns elements wrapped with jQuery or balalaika that bound to given property 
	 * @desc After you bound elements to a property you can extract them by using this method.
	 * @param {string} [key] - For which key we want to extract elements. If undefined or null returns elements bound to <code>this</code>.
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
		key = key === this || !key ? '__this__' : key;
		var keys = typeof key === 'string' ? key.split( /\s/ ) : key,
			$el;
		if( keys.length <= 1 ) {
			return keys[ 0 ] in this.__special ? this.__special[ keys[ 0 ] ].elements : $();
		} else {
			$el = $();
			for( var i = 0; i < keys.length; i++ ) {
				$el = $el.add( this.__special[ keys[ i ] ].elements );
			}
			return $el;
		}
	},
	
	/**
	 * @method Matreshka#bound
	 * @summary Returns first bound element
	 * @param {string} [key] - For which key we want to extract single element. If undefined or null returns element bound to <code>this</code>.
	 * @returns {(Node|null)} Bound element
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( 'myKey', '.my-element' );
	 * this.bound( 'mykey' ); // returns $( '.my-element' )[0]
	 * @example <caption>Get element bound to <code>this</code></caption>
	 * this.bindElement( this, '.app' );
	 * this.bound(); // returns $( '.app' )[0]
	 */
	bound: function( key ) {
		return this.boundAll( key )[ 0 ] || null;
	},
	
	/**
	 * @method Matreshka#$el
	 * @deprecated since 0.1. Use Matreshka#boundAll method instead
	 */
	$el: function( key ) {
		warnDeprecated( '#$el', '#boundAll' );
		return this.boundAll( key );
	},
	
	/**
	 * @method Matreshka#el
	 * @deprecated since 0.1. Use Matreshka#bound method instead
	 */
	el: function( key ) {
		warnDeprecated( '#el', '#bound' );
		return this.bound( key );
	},
	
	/**
	 * @method Matreshka#selectAll
	 * @summary Finds elements that contained in element that bound to <code>this</code>
	 * @desc After you bind element to <code>this ("__this__")</code> you can use this method for finding elements that contained in bound element.
	 * @param {string} selector
	 * @returns {(jQuery|balalaika)}
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( this, '.app' );
	 * this.selectAll( '.my-element' );
	 * // equals to
	 * this.boundAll().find( '.my-element' );
	 * // equals to
	 * $( '.app' ).find( '.my-element' );
	 */
	selectAll: function( s ) {
		return this.boundAll().find( s );
	},
	
	/**
	 * @method Matreshka#$
	 * @alias Matreshka#selectAll
	 */
	$: function( s ) {
		return this.selectAll( s );
	},
	
	/**
	 * @method Matreshka#select
	 * @summary Finds first element that contained in element that bound to <code>this</code>
	 * @desc After you bind element to <code>this ("__this__")</code> you can use this method for finding element that contained in bound element.
	 * @param {string} selector
	 * @returns {(jQuery|balalaika)}
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( this, '.app' );
	 * this.select( '.my-element' );
	 * // equals to
	 * this.bound().querySelector( '.my-element' );
	 * // equals to
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
				mediator: function( v ) { return v; }
			};
			Object.defineProperty( this, key, {
				configurable: true,
				get: function() {
					return specialProps.getter();
				},
				set: function( v ) {
					this.set( key, v, {
						fromSetter: true
					});
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
			return getter.call( this, __special.value, this, key );
		}.bind( this );
		
		return this;
	},
	
	/**
	 * @method Matreshka#setMediator
	 * @variation 1
	 * @since 0.1
	 * @summary Transforms property
	 * @desc This method is using when you want to keep your property to be a certain type (string, number, object...).
	 * @example
	 * this.setMediator( 'x', function() { return String( s ); } );
	 * this.x = 1;
	 * alert( typeof this.x ); // "string"
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
	 * this.y = '12345.678';
	 * alert( typeof this.x ); // "string"
	 * alert( typeof this.y ); // "number"
	 * alert( this.y ); // 12345
	 */
	setMediator: function( key, mediator ) {
		if( typeof key === 'object' ) {
			for( var i in key ) if( key.hasOwnProperty( i ) ) {
				this.setMediator( i, key[ i ] );
			}
			return this;
		}
		
		var __special = this.makeSpecial( key );
		
		__special.mediator = function( v ) {
			return mediator.call( this, v, this, key );
		}.bind( this );
		
		__special.value = __special.mediator( __special.value );
		
		return this;
	},
	
	/**
	 * @method Matreshka#addDependence
	 * @since 0.1
	 * @summary Defines smart getter
	 * @desc {@link Matreshka#addDependence} adds dependence of <code>key</code> from <code>keys</code>. You can use it instead of {@link Matreshka#defineGetter} if you want to listen change:*key* event for given key or bind key to an element)
	 * @param {string} key - what depends on
	 * @param {string|string[]} keys - depends from
	 * @param {function} [getter=function(value){return value;}] - how depends (should return value)
	 * @param {boolean} [setOnInit=true]
	 * @example <caption>Basic usage</caption>
	 * this.a = 3;
	 * this.b = 4;
	 * this.addDependence( 'perimeter', 'a b', function() { return ( this.a + this.b ) * 2} );
	 * alert( this.perimeter ); // 14
	 * this.on( 'change:perimeter', function() {
	 * 	alert( 'perimeter is changed to ' + this.perimeter );
	 * });
	 * this.a = 5; // alerts "perimeter is changed to 18"
	 */
	addDependence: function( key, keys, getter, setOnInit ) {
		var keys = typeof keys === 'string' ? keys.split( /\s/ ) : keys,
			on_Change = function( evt ) {
				var values = [];

				for( var i = 0; i < keys.length; i++ ) {
					if( typeof keys[ i ] === 'object' && keys[ i ][ 0 ].isMK ) {
						_this = keys[ i ][ 0 ];
						_key = keys[ i ][ 1 ];
					} else {
						_this = this;
						_key = keys[ i ];
					}
					values.push( _this[ _key ] );
				}
				
				this.set( key, getter.apply( this, values ), {
					silent: evt && evt.silentChangeEvent
				});
			},
			_this, _key;
		getter = getter || function( value ) { return value; };
		
		for( var i = 0; i < keys.length; i++ ) {
			if( typeof keys[ i ] === 'object' && keys[ i ][ 0 ].isMK ) {
				_this = keys[ i ][ 0 ];
				_key = keys[ i ][ 1 ];
			} else {
				_this = this;
				_key = keys[ i ];
			}
			_this.makeSpecial( _key );
			_this.on( '_change:' + _key, on_Change, this );
			
			setOnInit !== false && on_Change.call( this );
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#get
	 * @summary Just returns given property (or value returned by getter)
	 * @param {string} key
	 * @example <caption>Basic usage</caption>
	 * this.get( 'myKey' ); // equals to this[ 'myKey' ] or this.myKey
	 */
	get: function( key ) {
		return this[ key ];
	},
	
	/**
	 * @method Matreshka#set
	 * @fires change
	 * @fires change:*key*
	 * @variation 1
	 * @summary Sets value for given property 
	 * @desc Sets value for given property and gives possibility to pass event object (with <code>"silent"</code> property if you added <code>change:*key*</code> event in a past or other data).
	 * @param {string} key
	 * @param {*} value
	 * @param {eventOptions} [evtOpts]
	 * @example <caption>Basic usage</caption>
	 * this.on( 'change:myKey', function( evtOpts ) {
	 * 	alert( evtOpts.value );
	 * });
	 * this.set( 'myKey', 3 ); // equals to this[ 'myKey' ] = 3 or this.myKey = 3, alerts 3
	 * @example <caption>Passing <code>eventOptions</code></caption>
	 * // no alert
	 * this.set( 'myKey', 4, {
	 * 	silent: true
	 * });
	 * // alerts 5, evtOpts (first event handler argument) contains property myFlag
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
	 * 		myKey: 3
	 * 	}, {
	 * 		myFlag: 'Jigurda'
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
			evtObject;

		v = special.value = special.mediator( v );
		evtOpts = evtOpts || {};
		
		if( v !== prevVal || evtOpts.force || evtOpts.forceHTML ) {
			this.trigger( '_change:' + key, { // using for changing element state
				silentAllEvent: true,
				silentChangeEvent: evtOpts.silent || v === prevVal
			});
		}
		
		if( ( v !== prevVal || evtOpts.force ) && !evtOpts.silent ) {
			evtObject = MK.extend({
				value: v,
				previousValue: prevVal,
				key: key,
				element: special.elements[ 0 ] || null,
				elements: special.elements,
				self: this
			}, evtOpts );
			
			this
				.trigger( 'change:' + key, evtObject )
				.trigger( 'change', evtObject )
			;
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#remove
	 * @fires remove
	 * @fires remove:*key*
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
			
		evtOpts = MK.extend({
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
						.trigger( 'remove', evtOpts )
						.trigger( 'remove:' + keys[ i ], evtOpts )
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
	 * @summary Defines properties passed to key-object object. Works similar to <code>Object.defineProperties</code>
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
});



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
MK.extend = function( o1, o2 ) {
	for( var i = 1; i < arguments.length; i++ ) {
		o2 = arguments[ i ];
		for( var j in o2 ) if( o2.hasOwnProperty( j ) ) {
			o1[ j ] = o2[ j ];
		}
	}
	return o1;
};

MK.extend( MK, {
	/**
	* @method Matreshka.$
	* @summary Matreshka dom library (jQuery or Balalaika)
	*/
	$: $,
	/**
	 * @method Matreshka.useBalalaika
	 * @since 0.1
	 * @summary Use balalaika as DOM utilite anyway even if jQuery is on the page
	 * @todo Convert bound element to given lib instance
	 */
	useBalalaika: function() {
		if( !window.$b ) throw Error( 'Balalaika is missing' );
		MK.$ = $ = $b;
	},
	/**
	 * @method Matreshka.usejQuery
	 * @since 0.1
	 * @summary Use jQuery anyway even if it has been plugged in after Matreshka initialization
	 * @todo Convert bound element to given lib instance
	 */
	usejQuery: function() {
		if( !window.$b ) throw Error( 'jQuery is missing' );
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
	 * @summary {@link Matreshka.defaultBinders} is the array of functions that compare given element by given rules and returns {@binder} if comparing is successfully. It used for defining elements behavior in {@link Matreshka#bindElement} method without passing third argument.
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
	 * @param {object} o - iterable object
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
 * Event handler
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
 * @example
 * var eventNames = 'change:a change:b fyeah done change:x'
 * this.on( eventNames, function() {} );
 */

 /**
 * <code>binder</code> contains information about how to extract value from an element, how to set value for an element and which element's event we have to listen
 * @typedef {object} binder
 * @property {string} [on] - event name (or space-delimited list of events) which we have to listen
 * @property {function} [getValue] - function that tells how to extract value from an element (context <code>this</code> is given element)
 * @property {function} [setValue] - "How to set value" for an element (context <code>this</code> is given element)
 * 
 * @example
 * var binder = {
 * 	on: 'click',
 * 	getValue: function() { return this.value; } 
 * 	setValue: function( v ) { this.value = v; } 
 * };
 * this.bindElement( 'a', '.my-checkbox', binder );
 */

/**
 * @typedef {object} eventOptions
 * @summary <code>eventOptions</code> object could contain any properties. The only special property is <code>"silent"</code> that could be passed to {@link Matreshka#set}, {@link Matreshka#remove}, {@link Matreshka#bind}, {@link Matreshka#unbind} if you'd like to prevent the event from being triggered
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
 })( this, this.Class );;"use strict";
( function( MK ) {
	if( !MK ) {
		throw new Error( 'Matreshka is missing' );
	}
	var constructObject = function( f ) {
		return { on: null, getValue: null, setValue: f };
	};
	/**
	 * @namespace Matreshka.binders
	 * @desc TODO
	 */
	MK.binders = {
		/**
		* @function Matreshka.binders.innerHTML
		* @since 0.1
		* @summary <code>innerHTML</code> binder
		* @desc By default if you pass html element to {@link Matreshka#bindElement} as second argument that doesn't match any <code>defaultBinders item</code>, the binding does nothing. But sometimes you want to change <code>innerHTML</code> without having possibility to retrieve value from the element. {@link Matreshka.htmlp} is created as simple <code>binder</code> function for this case and it reduces your code.
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
		innerHTML: function() {
			return constructObject( function( v ) {
				this.innerHTML = v === null ? '' : v;
			});
		},
  
		/**
		* @function Matreshka.binders.className
		* @since 0.1
		* @summary <code>className</code> binder
		* @desc This function is a shortcut for using existence of element's <code>className</code> as boolean value when you bind it to a property.
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
})( Matreshka );;"use strict";
( function( MK ) {
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
	 * 		// calls MK.Object constructor with this context and given arguments
	 * 		MyClass.parent.constructor( this, arguments );
	 *	},
	 * 	method: function() {}
	 * });
	 */
	MK.Object = Class({
		'extends': MK,
		/**
		 * @member {boolean} Matreshka.Object#isMKObject
		 * @summary <code>isMKObject</code> is always </code>true</code>. It using for easy detecting Matreshka.Object instance.
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
})( window.Matreshka );;"use strict";
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
					for( i = 0; i < args.length; i++ ) {
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
				for( i = 0; i < al; i++ ) {
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
			for( i = 0; i < this.length; i++ ) {
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
				for( i = 0; i < array.length; i++ ) {
					prepared[ i ] = this._itemMediator.call( this, array[ i ], i );
				}
				array = prepared;
			}
			
			for( i = 0; i < array.length; i++ ) {
				this[ i ] = array[ i ];
			}
			for( i = 0; i < diff; i++ ) {
				this.remove( i + array.length );
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
				for( i = 0; i < this.length; i++ ) {
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
							for( i = 0; i < _this.length; i++ ) {
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
							for( i = 0; i < evt.returns.length; i++ ) {
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
							for( i = 0; i < this.length; i++ ) {
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
					for( i = 0; i < _this.length; i++ ) {
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
			for( i = 0; i < this.length; i++ ) {
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
		 * @returns {mkArray} self
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
		 * @returns {mkArray} self
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