/*
	Matreshka v1.1.0-alpha.1 (2015-08-23)
	JavaScript Framework by Andrey Gubanov
	Released under the MIT license
	More info: http://matreshka.io
*/

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('xclass', factory);
	} else {
		// Browser globals
		root.Class = factory();
	}
}(this, function() {
	var isArguments = function(o) {
			return !!o && (o.toString() === '[object Arguments]'
				|| typeof o === 'object' && o !== null && 'length' in o && 'callee' in o);
		},
		ie = (function() {
			// Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
			var rv = -1,
				ua, re;
			if (navigator.appName == 'Microsoft Internet Explorer') {
				ua = navigator.userAgent;
				re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
				if (re.exec(ua) !== null) {
					rv = parseFloat(RegExp.$1);
				}
			}
			return rv;
		})(),
		ieDocumentMode = document.documentMode,
		ie8 = ieDocumentMode === 8,
		err = 'Internet Explorer ' + ie + ' doesn\'t support Class function';
	if (~ie && ie < 8) {
		throw Error(err);
	} else if (ieDocumentMode < 8) {
		throw Error(err + '. Switch your "Document Mode" to "Standards"');
	}



	var Class = function(prototype) {
		var realConstructor,
			constructor = prototype.constructor !== Object
				? prototype.constructor : function EmptyConstructor() {},
			extend = prototype['extends'] = prototype['extends'] || prototype.extend,
			extend_prototype = extend && extend.prototype,
			implement = prototype['implements'] = prototype['implements'] || prototype.implement,
			parent = {};

		realConstructor = constructor;

		delete prototype.extend;
		delete prototype.implement;

		if (extend_prototype) {
			for (var key in extend_prototype) {
				parent[key] = typeof extend_prototype[key] === 'function' ? (function(value) {
					return function(context, args) {
						args = isArguments(args) ? args : Array.prototype.slice.call(arguments, 1);
						return value.apply(context, args);
					};
				})(extend_prototype[key]) : extend_prototype[key];
			}

			parent.constructor = (function(value) {
				return function(context, args) {
					args = isArguments(args) ? args : Array.prototype.slice.call(arguments, 1);
					return value.apply(context, args);
				};
			})(extend_prototype.constructor);
		}

		if (ie8) {
			prototype.prototype = null;
			prototype.constructor = null;
			constructor = function() {
				if (this instanceof constructor) {
					var r = new XDomainRequest();
					for (var p in constructor.prototype)
						if (p !== 'constructor') {
							r[p] = constructor.prototype[p];
						}
					r.hasOwnProperty = constructor.prototype.hasOwnProperty;
					realConstructor.apply(r, arguments);

					return r;
				} else {
					realConstructor.apply(this, arguments);
				}
			};

			prototype.constructor = constructor;
			constructor.prototype = constructor.fn = prototype;
			constructor.parent = parent;
			extend && Class.IEInherits(constructor, extend);
		} else {
			prototype.constructor = constructor;
			constructor.prototype = constructor.fn = prototype;
			constructor.parent = parent;

			extend && Class.inherits(constructor, extend);
		}

		implement && implement.validate(constructor.prototype);

		constructor.same = function() {
			return function() {
				return constructor.apply(this, arguments);
			};
		};

		if (this instanceof Class) {
			return new constructor();
		} else {
			return constructor;
		}
	};

	Class.inherits = function(Child, Parent) {
		var prototype = Child.prototype,
			F = function() {},
            m;
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		for (m in prototype) {
			Child.prototype[m] = prototype[m];
		}

		if (typeof Symbol != 'undefined' && prototype[Symbol.iterator]) {
			Child.prototype[Symbol.iterator] = prototype[Symbol.iterator];
		}

		Child.prototype.instanceOf = function(_Class) {
			return this instanceof _Class;
		};
	};

	Class.IEInherits = function(Child, Parent) {
		var childHasOwn = Child.prototype.hasOwnProperty,
			childConstructor = Child.prototype.constructor,
			parentHasOwn,
			objectHasOwn = Object.prototype.hasOwnProperty;
		while (Parent) {
			parentHasOwn = parentHasOwn || Parent.prototype.hasOwnProperty;
			Child.prototype = (function(pp, cp) { // extending
				var o = {},
					i;
				for (i in pp) {
					o[i] = pp[i];
				}
				for (i in cp) {
					o[i] = cp[i];
				}
				return o;
			})(Parent.prototype, Child.prototype);
			Parent = Parent.prototype && Parent.prototype['extends'] && Parent.prototype['extends'].prototype;
		}

		if (childHasOwn !== objectHasOwn) {
			Child.prototype.hasOwnProperty = childHasOwn;
		} else if (parentHasOwn !== objectHasOwn) {
			Child.prototype.hasOwnProperty = parentHasOwn;
		}

		Child.prototype.constructor = childConstructor;

		Child.prototype.instanceOf = function(_Class) {
			var PossibleParent = Child;
			while (PossibleParent) {
				if (PossibleParent === _Class) {
					return true;
				}
				PossibleParent = PossibleParent.prototype['extends'];
			}
			return false;
		};
	};


	Class.Interface = function Interface(parent, props) {
		var propsMap = {},
			isArray = function(probArray) {
				return typeof probArray === 'object' && probArray !== null && 'length' in probArray;
			},
			properties,
			list,
            i;
		if (parent instanceof Interface) {
			for (i in parent.propsMap) propsMap[i] = 1;
			properties = isArray(props) ? props : [].slice.call(arguments, 1);
		} else {
			properties = isArray(parent) ? parent : arguments;
		}

		for (i = 0; i < properties.length; i++) {
			propsMap[properties[i]] = 1;
		}

		this.propsMap = propsMap;

		this.validate = function(prototype) {
			for (i in this.propsMap) {
				if (typeof prototype[i] !== 'function') {
					throw Error('Interface error: Method "' + i + '" is not implemented in '
						+ (prototype.constructor.name || prototype.name || 'given') + ' prototype');
				}
			}
		};
	};

	Class.isXDR = ie8;
	return Class;
}));

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
				e = e || win.event;
				e.target = e.target || e.srcElement;
				e.preventDefault  = e.preventDefault  || function(){e.returnValue = false;};
				e.stopPropagation = e.stopPropagation || function(){e.cancelBubble = true;};
				e.which = e.button ? ( e.button === 2 ? 3 : e.button === 4 ? 2 : e.button ) : e.keyCode;
				fn.call(self, e);
			});
		};
		Element.prototype[ s_rem ] = win[ s_rem ] = doc[ s_rem ] = function( on, fn ) {
			return this.detachEvent( 'on' + on, fn );
		};
	})( window, document, 'addEventListener', 'removeEventListener' );
}));


(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('balalaika', [
			'matreshka_dir/polyfills/addeventlistener'
		], factory);
	} else {
		root.$b = factory();
	}
}(this, function() {

	// nsRegAndEvents is regesp for eventname.namespace and the list of all events
	// fn is empty array and balalaika prototype
	return (function(window, document, fn, nsRegAndEvents, id, s_EventListener, s_MatchesSelector, i, j, k, l, $) {
		$ = function(s, context) {
			return new $.i(s, context);
		};

		$.i = function(s, context) {
			fn.push.apply(this, !s ? fn : s.nodeType || s == window ? [s] : "" + s === s ? /</.test(s) ? ((i = document.createElement(context || 'div')).innerHTML = s, i.children) : (context && $(context)[0] || document).querySelectorAll(s) : /f/.test(typeof s) ? /c/.test(document.readyState) ? s() : $(document).on('DOMContentLoaded', s) : s);
		};

		$.i[l = 'prototype'] = ($.extend = function(obj) {
			k = arguments;
			for (i = 1; i < k.length; i++) {
				if (l = k[i]) {
					for (j in l) {
						obj[j] = l[j];
					}
				}
			}

			return obj;
		})($.fn = $[l] = fn, { // $.fn = $.prototype = fn
			on: function(n, f) {
				// n = [ eventName, nameSpace ]
				n = n.split(nsRegAndEvents);
				this.map(function(item) {
					// item.b$ is balalaika_id for an element
					// i is eventName + id ("click75")
					// nsRegAndEvents[ i ] is array of events (eg all click events for element#75) ([[namespace, handler], [namespace, handler]])
					(nsRegAndEvents[i = n[0] + (item.b$ = item.b$ || ++id)] = nsRegAndEvents[i] || []).push([f, n[1]]);
					// item.addEventListener( eventName, f )
					item['add' + s_EventListener](n[0], f);
				});
				return this;
			},
			off: function(n, f) {
				// n = [ eventName, nameSpace ]
				n = n.split(nsRegAndEvents);
				// l = 'removeEventListener'
				l = 'remove' + s_EventListener;
				this.map(function(item) {
					// k - array of events
					// item.b$ - balalaika_id for an element
					// n[ 0 ] + item.b$ - eventName + id ("click75")
					k = nsRegAndEvents[n[0] + item.b$];
					// if array of events exist then i = length of array of events
					if (i = k && k.length) {
						// while j = one of array of events
						while (j = k[--i]) {
							// if( no f and no namespace || f but no namespace || no f but namespace || f and namespace )
							if ((!f || f == j[0]) && (!n[1] || n[1] == j[1])) {
								// item.removeEventListener( eventName, handler );
								item[l](n[0], j[0]);
								// remove event from array of events
								k.splice(i, 1);
							}
						}
					} else {
						// if event added before using addEventListener, just remove it using item.removeEventListener( eventName, f )
						!n[1] && item[l](n[0], f);
					}
				});
				return this;
			},
			is: function(s) {
				i = this[0];
				j = !!i && (i.matches || i['webkit' + s_MatchesSelector]
                    || i['moz' + s_MatchesSelector] || i['ms' + s_MatchesSelector]);
				return !!j && j.call(i, s);
			}
		});
		return $;
	})(window, document, [], /\.(.+)/, 0, 'EventListener', 'MatchesSelector');

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
	}

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
        define('matreshka_dir/balalaika-extended',[
			'balalaika',
			'matreshka_dir/polyfills/classlist'
		], factory);
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
					for( j = 0; j < a.length; j++ ) if( a[ j ] === e ) return j;
				},
				i, j;
			s = $b( s ).slice();
			[].push.apply( result, s );
			for( i = result.length - s.length; i < result.length; i++ ) {
				if( ( [].indexOf ? result.indexOf( result[ i ] )  : ieIndexOf( result, result[ i ] ) ) !== i ) { // @IE8
					result.splice( i--, 1 );
				}
			}
			return result;
		},
		not: function( s ) {
			var result = $b( this ),
				index,
				i;
			s = $b( s );
			
			for( i = 0; i < s.length; i++ ) {
				if( ~( index = result.indexOf( s[ i ] ) ) ) {
					result.splice( index, 1 );
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
	
	$b.create = function create( tagName, props ) {
		var el, i, j, prop;
		
		if( typeof tagName == 'object' ) {
			props = tagName;
			tagName = props.tagName;
		}
		
		el = document.createElement( tagName )
		
		if( props ) for( i in props ) {
			prop = props[ i ];
			if( i == 'attributes' && typeof prop == 'object' ) {
				for( j in prop ) if( prop.hasOwnProperty( j ) ) {
					el.setAttribute( j, prop[ j ] );
				}
			} else if( i == 'tagName' ) {
				continue;
			} else if( i == 'children' && prop ) {
				for( j = 0; j < prop.length; j++ ) {
					el.appendChild( create( prop[ j ] ) );
				}
			} else if( typeof el[ i ] == 'object' && el[ i ] !== null && typeof props == 'object' ) {
				for( j in prop ) if( prop.hasOwnProperty( j ) ) {
					el[ i ][ j ] = prop[ j ];
				}
			} else {
				el[ i ] = prop;
			}			
		}
		return el;
	};
	
	// @IE8 Balalaika fix. This browser doesn't support HTMLCollection and NodeList as second argument for .apply
	// This part of code will be removed in Matreshka 1.0
	(function( document, $, i, j, k, fn ) {
		var bugs,
			children = document.createElement( 'div' ).children;
		try { [].push.apply( [], children ); }
		catch( e ) { bugs = true; }
		bugs = bugs || typeof children === 'function' || document.documentMode < 9;

		if( bugs ) {
			fn = $.i[ j = 'prototype' ];

			$.i = function( s, context ) {
				k = !s ? fn : s && s.nodeType || s == window ? [s] : typeof s == 'string' ?  /</.test( s ) ? ( ( i = document.createElement( 'div' ) ).innerHTML = s, i.children ) : (context&&$(context)[0]||document).querySelectorAll(s) : /f/.test(typeof s) && (!s[0]&&!s[0].nodeType) ? /c/.test(document.readyState) ? s() : !function r(f){/in/(document.readyState)?setTimeout(r,9,f):f()}(s): s;
			
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


(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('matreshka_dir/dollar-lib',['matreshka_dir/balalaika-extended'], factory);
	} else {
		root.__DOLLAR_LIB = factory(root.$b);
	}
}(this, function($b) {
	var neededMethods = 'on off is hasClass addClass removeClass toggleClass add not find'.split(/\s+/),
		dollar = typeof window.$ == 'function' ? window.$ : null,
		useDollar = true,
		i;

	if (dollar) {
		for (i = 0; i < neededMethods.length; i++) {
			if (!dollar.prototype[neededMethods[i]]) {
				useDollar = false;
				break;
			}
		}

		if (!dollar.parseHTML) {
			useDollar = false;
		}
	} else {
		useDollar = false;
	}

	return useDollar ? dollar : $b;
}));


(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define('matreshka_dir/binders',factory);
	} else {
		root.__MK_BINDERS = factory();
	}
}(this, function(MK) {
	var readFiles = function(files, readAs, callback) {
			var length = files.length,
				j = 0,
				i = 0,
				filesArray = [],
				reader,
				file;

			for (; i < length; i++) {
				file = files[i];

				if (readAs) {
					reader = new FileReader();
					reader.onloadend = function(evt) {
						file.readerResult = reader.result;
						filesArray[j++] = file;
						if (j == length) {
							callback(filesArray);
						}
					};

					reader['readAs' + readAs[0].toUpperCase() + readAs.slice(1)](file);
				} else {
					filesArray[j++] = file;
					if (j == length) {
						callback(filesArray);
					}
				}
			}

		},
		binders;

	return binders = {
		innerHTML: function() { // @IE8
			return {
				on: null,
				getValue: function() {
					return this.innerHTML;
				},
				setValue: function(v) {
					this.innerHTML = v === null ? '' : v + '';
				}
			};
		},
		className: function(className) {
			var not = className.indexOf('!') === 0,
				contains;

			if (not) {
				className = className.replace('!', '');
			}

			return {
				on: null,
				getValue: function() {
					contains = this.classList.contains(className);
					return not ? !contains : !!contains;
				},
				setValue: function(v) {
					this.classList.toggle(className, not ? !v : !!v);
				}
			};
		},
		property: function(propertyName) {
			return {
				on: null,
				getValue: function() {
					return this[propertyName];
				},
				setValue: function(v) {
					// in case when you're trying to set read-only property
					try {
						this[propertyName] = v;
					} catch (e) {}
				}
			};
		},
		attribute: function(attributeName) {
			return {
				on: null,
				getValue: function() {
					return this.getAttribute(attributeName);
				},
				setValue: function(v) {
					this.setAttribute(attributeName, v);
				}
			};
		},
		dataset: function(prop) {
			return {
				on: null,
				getValue: function() {
					return this.dataset[prop];
				},
				setValue: function(v) {
					this.dataset[prop] = v;
				}
			};
		},
		textarea: function() {
			return binders.input('text');
		},
		progress: function() {
			return binders.input();
		},
		input: function(type, options) {
			var on;
			switch (type) {
				case 'checkbox':
					return {
						on: 'click keyup',
						getValue: function() {
							return this.checked;
						},
						setValue: function(v) {
							this.checked = v;
						}
					};
				case 'radio':
					return {
						on: 'click keyup',
						getValue: function() {
							return this.value;
						},
						setValue: function(v) {
							this.checked = this.value == v;
						}
					};
				case 'submit':
				case 'button':
				case 'image':
				case 'reset':
					return {};
				case 'hidden':
					on = null;
					break;
				case 'file':
					on = 'change';
					break;
				case 'text':
				case 'password':
					// IE8 requires to use 'keyup paste' instead of 'input'
					on = document.documentMode == 8 ? 'keyup paste' : 'input';
					break;
					/*  case 'date':
				case 'datetime':
				case 'datetime-local':
				case 'month':
				case 'time':
				case 'week':
				case 'range':
				case 'color':
				case 'search':
				case 'email':
				case 'tel':
				case 'url':
                case 'file':
				case 'number':  */
				default: // other future (HTML6+) inputs
					on = 'input';
			}

			return {
				on: on,
				getValue: function() {
					return this.value;
				},
				setValue: function(v) {
					if (this.value != v) {
						this.value = v;
					}
				}
			};
		},
		select: function(multiple) {
			var i;
			if (multiple) {
				return {
					on: 'change',
					getValue: function() {
						return [].slice.call(this.options)
							.filter(function(o) {
								return o.selected;
							})
							.map(function(o) {
								return o.value;
							});
					},
					setValue: function(v) {
						v = typeof v == 'string' ? [v] : v;
						for (i = this.options.length - 1; i >= 0; i--) {
							this.options[i].selected = ~v.indexOf(this.options[i].value);
						}
					}
				};
			} else {
				return {
					on: 'change',
					getValue: function() {
						return this.value;
					},
					setValue: function(v) {
						var _this = this,
							options;

						_this.value = v;

						if (!v) {
							options = _this.options;
							for (i = options.length - 1; i >= 0; i--) {
								if (!options[i].value) {
									options[i].selected = true;
								}
							}
						}
					}
				};
			}
		},
		visibility: function(value) {
			value = typeof value == 'undefined' ? true : value;

			return {
				on: null,
				getValue: null,
				setValue: function(v) {
					this.style.display = value ? (v ? '' : 'none') : (v ? 'none' : '');
				}
			};
		},
		file: function(readAs) {
			if (typeof FileList != 'undefined') {
				return {
					on: function(callback) {
						var handler = function() {
							var files = this.files;
							if (files.length) {
								readFiles(files, readAs, function(files) {
									callback(files);
								});
							} else {
								callback([]);
							}
						};

						this.addEventListener('change', handler);
					},
					getValue: function(evt) {
						var files = evt.domEvent || [];
						return this.multiple ? files : files[0] || null;
					}
				};
			} else {
				throw Error('file binder is not supported at this browser');
			}
		},
		style: function(property) {
			return {
				getValue: function() { // @IE8
					return window.getComputedStyle ? getComputedStyle(this, null)
						.getPropertyValue(property) : this.currentStyle[property];
				},
				setValue: function(v) {
					this.style[property] = v;
				}
			};
		}
	};
}));


(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define('matreshka-magic',[
			'matreshka_dir/balalaika-extended',
			'matreshka_dir/dollar-lib',
			'matreshka_dir/binders'
		], factory);
	} else {
		root.magic = root.MatreshkaMagic = factory(root.$b, root.__DOLLAR_LIB, root.__MK_BINDERS);
	}
}(this, function($b, $, binders) { // make dollar! useas$
	// trim, extend, randomString, toArray, each,
	// review and resort
	var magic, toArray, each, extend, trim, sym,
		initMK = function(object) {
			object._initMK ? object._initMK() : magic.initMK(object);
			return object;
		},

		/**
		 * @private
		 * @summary selectNodes selects nodes match to custom selectors such as :sandbox and :bound(KEY)
		 */
		selectNodes = function(object, s) {
			var result = $(),
				execResult,
				$bound,
				node,
				selectors,
				selector,
				i, j,
				random;

			// replacing :sandbox to :bound(sandbox)
			selectors = s.replace(/:sandbox/g, ':bound(sandbox)').split(',');

			for (i = 0; i < selectors.length; i++) {
				selector = selectors[i];

				if (execResult = /:bound\(([^(]*)\)(.*)/.exec(trim(selector))) {
					// getting KEY from :bound(KEY)
					$bound = object.$bound(execResult[1]);

					// if native selector passed after :bound(KEY) is not empty string
					// for example ":bound(KEY) .my-selector"
					if (selector = trim(execResult[2])) {
						// if native selector contains children selector
						// for example ":bound(KEY) > .my-selector"
						if (selector.indexOf('>') === 0) {
							// selecting children
							for (j = 0; j < $bound.length; j++) {
								node = $bound[j];
								random = magic.randomString();
								node.setAttribute(random, random);
								result = result.add($('[' + random + '="' + random + '"]' + selector, node));
								node.removeAttribute(random);
							}

						} else {
							// if native selector doesn't contain children selector
							result = result.add($bound.find(selector));
						}
					} else {
						// if native selector is empty string
						result = result.add($bound);
					}
					// if it's native selector
				} else {
					result = result.add(selector);
				}
			}


			return result;
		};

	magic = {
		/**
		 * @private
		 * @since 0.0.4
		 * @todo optimize
		 * @summary This object is used to map DOM nodes and their DOM events
		 */
		domEvents: {
			list: {},
			// adds events to the map
			add: function(o) {
				if (o.node) {
					if (typeof o.on == 'function') {
						o.on.call(o.node, o.handler);
					} else {
						$(o.node).on(o.on.split(/\s/).join('.mk ') + '.mk', o.handler);
					}
				}

				(this.list[o.instance[sym].id] = this.list[o.instance[sym].id] || []).push(o);
			},
			// removes events from the map
			remove: function(o) {
				var evts = this.list[o.instance[sym].id],
					evt, i;

				if (!evts) return;

				for (i = 0; i < evts.length; i++) {
					evt = evts[i];
					if (evt.node !== o.node) continue;
					// remove Matreshka event
					evt.mkHandler && magic._off(o.instance, '_runbindings:' + o.key, evt.mkHandler);
					// remove DOM event
					if (typeof evt.on == 'string') {
						$(o.node).off(evt.on + '.mk', evt.handler);
					}

					evt.removed = true;


					this.list[o.instance[sym].id].splice(i--, 1);
				}
			}
		},

		initMK: function(object) {
			if (!object[sym]) {
				Object.defineProperty(object, sym, {
					value: {
						events: {},
						special: {},
						id: 'mk' + Math.random()
					},
					enumerable: false,
					configurable: false,
					writable: false
				});
			}

			return object;
		},

		on: function(object, names, callback, triggerOnInit, context, evtData) {
			if (!object) return object;
			initMK(object);

			var t, i;

			// if event-callback object is passed to the function
			if (typeof names == 'object' && !(names instanceof Array)) {
				for (i in names) {
					if (names.hasOwnProperty(i)) {
						magic.on(object, i, names[i], callback, triggerOnInit);
					}
				}

				return object;
			}

			// callback is required
			if (!callback) throw Error('callback is not function for event(s) "' + names + '"');

			names = names instanceof Array ? names : trim(names)
				.replace(/\s+/g, ' ') // single spaces only
				.split(/\s(?![^(]*\))/g) // split by spaces
			;

			// allow to flip triggerOnInit and context
			if (typeof triggerOnInit != 'boolean' && typeof triggerOnInit != 'undefined') {
				t = context;
				context = triggerOnInit;
				triggerOnInit = t;
			}

			// for every name call _on method
			for (i = 0; i < names.length; i++) {
				magic._on(object, names[i], callback, context, evtData);
			}

			// trigger after event is initialized
			if (triggerOnInit === true) {
				callback.call(context || object, {
					triggeredOnInit: true
				});
			}

			return object;
		},

		_fastAddListener: function(object, name, callback, context, evtData) {
			var allEvents = object[sym].events,
				events = allEvents[name] || (allEvents[name] = []);

			events.push({
				callback: callback,
				context: context,
				ctx: context || object,
				name: name
			});

			if (name.indexOf('change:') === 0) {
				// define needed accessors for KEY
				magic._defineSpecial(object, name.replace('change:', ''));
			}

			return object;
		},

		_addListener: function(object, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var ctx = context || object,
				allEvents = object[sym].events,
				events = allEvents[name] || (allEvents[name] = []),
				l = events.length,
				domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)?(\((.*)\))?)?/,
				defaultEvtData = {
					callback: callback,
					//_callback: callback._callback || callback,
					context: context,
					ctx: ctx,
					//howToRemove: null,
					name: name
				},
				i,
				ev,
				_evtData,
				executed;

			for (i = 0; i < l; i++) {
				ev = events[i];
				if ((ev.callback == callback || ev.callback == callback._callback) && ev.context == context) {
					return object;
				}
			}

			if (evtData) {
				_evtData = {};
				for (i in evtData) {
					_evtData[i] = evtData[i];
				}
				for (i in defaultEvtData) {
					_evtData[i] = defaultEvtData[i];
				}
			} else {
				_evtData = defaultEvtData;
			}

			events.push(_evtData);

			executed = domEvtNameRegExp.exec(name);

			if (executed && executed[2]) {
				magic._addDOMListener(object, executed[3] || 'sandbox', executed[1], executed[5], callback, ctx, _evtData);
			} else if (name.indexOf('change:') === 0) {
				// define needed accessors for KEY
				magic._defineSpecial(object, name.replace('change:', ''));
			}

			allEvents[ 'addevent:' + name ]
				&& magic._trigger( object, 'addevent:' + name );

			return object;
		},

		_removeListener: function(object, name, callback, context, evtData) {
			if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

			var events = object[sym].events[name] || [],
				retain = object[sym].events[name] = [],
				domEvtNameRegExp = /([^\:\:]+)(::([^\(\)]+)(\((.*)\))?)?/,
				j = 0,
				l = events.length,
				evt,
				i,
				executed;

			evtData = evtData || {};

			executed = domEvtNameRegExp.exec(name);

			if (executed && executed[2]) {
				magic._removeDOMListener(object, executed[3], executed[1], executed[5], callback, context);
			} else {
				for (i = 0; i < l; i++) {
					evt = events[i];

					if (evt.howToRemove ? !evt.howToRemove(evt, evtData) : (callback && (callback !== evt.callback
						&& callback._callback !== evt.callback)) || (context && context !== evt.context)) {
						retain[j++] = evt;
					}
				}

				if (!retain.length) {
					delete object[sym].events[name];
				}
			}

			return object;
		},

		_delegateListener: function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var executed = /([^\.]+)\.(.*)/.exec(path),
				f,
				firstKey = executed ? executed[1] : path,
				changeKey,
				obj;

			path = executed ? executed[2] : '';

			evtData = evtData || {};

			if (firstKey) {
				if (firstKey == '*') {
					if (object.isMKArray) {
						f = function(evt) {
							(evt && evt.added ? evt.added : object).forEach(function(item) {
								item && magic._delegateListener(item, path, name, callback, context, evtData);
							});
						};

						f._callback = callback;
						magic._addListener(object, 'add', f, context, evtData);
						f();
					} else if (object.isMKObject) {
						f = function(evt) {
							var target = object[evt.key];

							if (target && evt && (evt.key in object[sym].keys)) {
								magic._delegateListener(target, path, name, callback, context, evtData);
							}
						};

						object.each(function(item) {
							magic._delegateListener(item, path, name, callback, context, evtData);
						});

						f._callback = callback;

						magic._addListener(object, 'change', f, context, evtData);
					} else {
						throw Error('"*" events are only allowed for MK.Array and MK.Object');
					}
				} else {
					f = function(evt) {
						if (evt && evt._silent) return;

						var target = object[firstKey],
							changeKey,
							triggerChange = true,
							i,
							changeEvents;

						evtData.path = path;

						evtData.previousValue = evt && evt.previousValue
							|| evtData.previousValue && evtData.previousValue[firstKey];

						if (evt && evt.previousValue && evt.previousValue[sym]) {
							magic._undelegateListener(evt.previousValue, path, name, callback, context, evtData);
						}

						if (typeof target == 'object' && target) {
							magic._delegateListener(target, path, name, callback, context, evtData);
						}

						if (name.indexOf('change:') === 0) {
							changeKey = name.replace('change:', '');

							if (!path && evtData.previousValue && evtData.previousValue[changeKey]
								!== target[changeKey]) {
								changeEvents = evtData.previousValue[sym].events[name];
								if (changeEvents) {
									for (i = 0; i < changeEvents.length; i++) {
										if (changeEvents[i].path === path) {
											triggerChange = false;
										}
									}
								}

								if (triggerChange) {
									magic.set(target, changeKey, target[changeKey], {
										force: true,
										previousValue: evtData.previousValue[changeKey],
										previousObject: evtData.previousValue,
										_silent: true
									});
								}
							}
						}
					};

					f._callback = callback;

					magic._addListener(object, 'change:' + firstKey, f, context, evtData);

					f();
				}
			} else {
				magic._addListener(object, name, callback, context, evtData);
			}
		},

		/**
		 * @private
		 * @summary this experimental function adds event listener to any object from deep tree of objects
		 */
		_delegateTreeListener: function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var f;

			f = function(evt) {
				var target = object[evt.key];

				if (target) {
					magic._delegateListener(target, path, name, callback, context, evtData);
					magic._delegateTreeListener(target, path, name, callback, context, evtData);
				}
			};

			each(object, function(item) {
				magic._delegateListener(item, path, name, callback, context, evtData);
				magic._delegateTreeListener(item, path, name, callback, context, evtData);
			});

			f._callback = callback;

			magic._addListener(object, 'change', f, context, evtData);

			return object;
		},



		_undelegateListener: function(object, path, name, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var executed = /([^\.]+)\.(.*)/.exec(path),
				firstKey = executed ? executed[1] : path,
				events,
				i,
				p = path;

			path = executed ? executed[2] : '';

			if (firstKey) {
				if (firstKey == '*') {
					if (object.isMKArray) {
						if (callback) {
							magic._undelegateListener(object, path, 'add', callback, context, evtData);
						} else {
							events = object[sym].events.add || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {

									magic._undelegateListener(object, path, 'add', events[i].callback);
								}
							}
						}

						object.forEach(function(item) {
							item && magic._undelegateListener(item, path, name, callback, context);
						});
					} else if (object.isMKObject) {
						if (callback) {
							magic._undelegateListener(object, path, 'change', callback, context);
						} else {
							events = object[sym].events.change || [];
							for (i = 0; i < events.length; i++) {
								if (events[i].path == p) {
									magic._undelegateListener(object, path, 'change', events[i].callback);
								}
							}
						}

						object.each(function(item) {
							item && magic._undelegateListener(item, path, name, callback, context);
						});
					}
				} else {
					if (callback) {
						magic._removeListener(object, 'change:' + firstKey, callback, context, evtData);
					} else {
						events = object[sym].events['change:' + firstKey] || [];
						for (i = 0; i < events.length; i++) {
							if (events[i].path == p) {
								magic._removeListener(object, 'change:' + firstKey, events[i].callback);
							}
						}
					}
					if (typeof object[firstKey] == 'object') {
						magic._undelegateListener(object[firstKey], path, name, callback, context, evtData);
					}
				}
			} else {
				magic._removeListener(object, name, callback, context, evtData);
			}
		},

		_addDOMListener: function(object, key, domEvtName, selector, callback, context, evtData) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			selector = selector || null;
			evtData = evtData || {};
			var domEvtHandler = function(domEvt) {
					var node = this,
						$nodes = $(node),
						evt = {
							self: object,
							node: node,
							$nodes: $nodes,
							key: key,
							domEvent: domEvt,
							originalEvent: domEvt.originalEvent || domEvt,
							preventDefault: function() {
								domEvt.preventDefault();
							},
							stopPropagation: function() {
								domEvt.stopPropagation();
							},
							which: domEvt.which,
							target: domEvt.target
						},
						randomID,
						is;

					// DOM event is delegated
					if (selector) {
						randomID = 'x' + String(Math.random()).split('.')[1];
						node.setAttribute(randomID, randomID);
						is = '[' + randomID + '="' + randomID + '"] ' + selector;

						if ($(domEvt.target).is(is + ',' + is + ' *')) {
							callback.call(context, evt);
						}

						node.removeAttribute(randomID);
					} else {
						callback.call(context, evt);
					}
				},
				fullEvtName = domEvtName + '.' + object[sym].id + key,
				bindHandler = function(evt) {
					evt && evt.$nodes && evt.$nodes.on(fullEvtName, domEvtHandler);
				},
				unbindHandler = function(evt) {
					evt && evt.$nodes && evt.$nodes.off(fullEvtName, domEvtHandler);
				};

			magic._defineSpecial(object, key);

			bindHandler._callback = unbindHandler._callback = callback;

			// minor but TODO
			// wat if user adds same DOM listener twice or more?
			// then bind/unbind will not be added but bindHandler will be called anyway
			magic._addListener(object, 'bind:' + key, bindHandler, context, evtData);
			magic._addListener(object, 'unbind:' + key, unbindHandler, context, evtData);

			bindHandler({
				$nodes: object[sym].special[key] && object[sym].special[key].$nodes
			});


			return object;
		},

		_removeDOMListener: function(object, key, domEvtName, selector, callback, context, evtData) {
			if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

			selector = selector || null;
			evtData = evtData || {};

			if (key && object[sym].special[key]) {
				object[sym].special[key].$nodes.off(domEvtName + '.' + object[sym].id + key);
				magic._removeListener(object, 'bind:' + key, callback, context, evtData);
				magic._removeListener(object, 'unbind:' + key, callback, context, evtData);
			}

			return object;
		},

		_on: function(object, name, callback, context) {
			if (!object) return object;
			initMK(object);

			var path;
			// index of @
			var lastIndexOfET = name.lastIndexOf('@');

			if (~lastIndexOfET) {
				path = name.slice(0, lastIndexOfET).replace(/([^@]*)@/g, function($0, key) {
					return (key || '*') + '.';
				}).replace(/\.$/, '.*') || '*';

				name = name.slice(lastIndexOfET + 1);

				magic._delegateListener(object, path, name, callback, context || object);
			} else {
				magic._addListener(object, name, callback, context);
			}

			return object;
		},

		_off: function(object, name, callback, context) {
			if (!object) return object;

			initMK(object);

			var path;
			// index of @
			var lastIndexOfET = name.lastIndexOf('@');

			if (~lastIndexOfET) {
				path = name.slice(0, lastIndexOfET);
				name = name.slice(lastIndexOfET + 1).replace(/@/g, '.');

				magic._undelegateListener(object, path, name, callback, context);
			} else {
				magic._removeListener(object, name, callback, context);
			}

			return object;
		},

		once: function(object, names, callback, context, evtData) {
			var i;
			if (!object || typeof object != 'object') return object;

			if (typeof names == 'object') {
				for (i in names)
					if (names.hasOwnProperty(i)) {
						magic.once(object, i, names[i], callback, context);
					}

				return object;
			}

			if (!callback) throw Error('callback is not function for event "' + names + '"');

			initMK(object);

			names = names.split(/\s/);

			for (i = 0; i < names.length; i++) {
				(function(name) {
					var once = (function(func) {
						var ran = false,
							memo;
						return function() {
							if (ran) return memo;
							ran = true;
							memo = func.apply(this, arguments);
							func = null;
							return memo;
						};
					})(callback);
					once._callback = callback;
					magic._on(object, name, once, context);
				})(names[i]);
			}

			return object;
		},

		onDebounce: function(object, names, callback, debounceDelay, triggerOnInit, context, evtData) {
			if (!object || typeof object != 'object') return object;

			var cbc, i;

			if (typeof names == 'object') {
				for (i in names)
					if (names.hasOwnProperty(i)) {
						magic.onDebounce(object, i, names[i], callback, debounceDelay, triggerOnInit, context);
					}

				return object;
			}

			// flip args
			if (typeof debounceDelay != 'number') {
				evtData = context;
				context = triggerOnInit;
				triggerOnInit = debounceDelay;
				debounceDelay = 0;
			}

			cbc = magic.debounce(callback, debounceDelay);

			// set reference to real callback for .off method
			cbc._callback = callback;

			return magic.on(object, names, cbc, triggerOnInit, context, evtData);
		},

		_defineSpecial: function(object, key, noAccessors) {
			if (!object || typeof object != 'object' || !object[sym] ) return object;

			var specialProps = object[sym].special[key];

			if (!specialProps) {
				specialProps = object[sym].special[key] = {
					$nodes: $(),
					value: object[key],
					getter: null,
					setter: null,
					mediator: null
				};

				if (!noAccessors) {
					Object.defineProperty(object, key, {
						configurable: true,
						enumerable: true,
						get: function() {
							return specialProps.getter ? specialProps.getter.call(object) : specialProps.value;
						},
						set: function(v) {
							specialProps.setter ? specialProps.setter.call(object, v) : magic.set(object, key, v, {
								fromSetter: true
							});
						}
					});
				}
			}

			return specialProps;
		},

		mediate: function(object, keys, mediator) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var type = typeof keys,
				i,
				special;

			if (type == 'object' && !(keys instanceof Array)) {
				for (i in keys) {
					if (keys.hasOwnProperty(i)) {
						magic.mediate(object, i, keys[i]);
					}
				}
				return object;
			}

			keys = type == 'string' ? keys.split(/\s/) : keys;

			for (i = 0; i < keys.length; i++)(function(key) {
				special = magic._defineSpecial(object, key);

				special.mediator = function(v) {
					return mediator.call(object, v, special.value, key, object);
				};

				magic.set(object, key, special.mediator(special.value), {
					fromMediator: true
				});
			})(keys[i]);

			return object;
		},

		setClassFor: function(object, keys, Class, updateFunction) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var type = typeof keys,
				i;

			if (type == 'object' && !(keys instanceof Array)) {
				for (i in keys)
					if (keys.hasOwnProperty(i)) {
						magic.setClassFor(object, i, keys[i], Class);
					}

				return object;
			}

			keys = type == 'string' ? keys.split(/\s/) : keys;

			updateFunction = updateFunction || function(instance, data) {
				var i;

				for (i in data) {
					if (data.hasOwnProperty(i)) {
						instance[i] = data[i];
					}
				}
			};

			for (i = 0; i < keys.length; i++) {
				magic.mediate(object, keys[i], function(v, previousValue) {
					var result;
					if (previousValue instanceof Class) {
						updateFunction.call(object, previousValue, v);
						result = previousValue;
					} else {
						result = new Class(v);
					}

					return result;
				});
			}

			return object;
		},

		linkProps: function(object, key, keys, getter, setOnInit) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			keys = typeof keys == 'string' ? keys.split(/\s/) : keys;

			var on_Change = function(evt) {
					var values = [],
						_protect = evt._protect = evt._protect || {};

					evt.fromDependency = true;

					if (!(key + object[sym].id in _protect)) {
						if (typeof keys[0] == 'object') {
							for (i = 0; i < keys.length; i += 2) {
								_this = keys[i];

								_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
								for (j = 0; j < _keys.length; j++) {
									values.push(_this[_keys[j]]);
								}
							}
						} else {
							for (i = 0; i < keys.length; i++) {
								_key = keys[i];
								_this = object;
								values.push(_this[_key]);
							}
						}

						_protect[key + object[sym].id] = 1;
						//evt._protect = evt._protect || evt.key + object[ sym ].id;

						magic.set(object, key, getter.apply(object, values), evt);
					}

				},
				_this, _key, _keys, i, j;

			getter = getter || function(value) {
				return value;
			};


			if (typeof keys[0] == 'object') {
				for (i = 0; i < keys.length; i += 2) {
					_this = initMK(keys[i]);
					_keys = typeof keys[i + 1] == 'string' ? keys[i + 1].split(/\s/) : keys[i + 1];
					for (j = 0; j < _keys.length; j++) {
						magic._defineSpecial(_this, _keys[j]);
						magic._fastAddListener(_this, '_rundependencies:' + _keys[j], on_Change);
					}
				}
			} else {
				for (i = 0; i < keys.length; i++) {
					_key = keys[i];
					_this = object;
					magic._defineSpecial(_this, _key);
					magic._fastAddListener(_this, '_rundependencies:' + _key, on_Change);
				}
			}

			setOnInit !== false && on_Change.call(typeof keys[0] == 'object' ? keys[0] : object, {
				key: typeof keys[0] == 'object' ? keys[1] : keys[0]
			});

			return object;
		},

		off: function(object, names, callback, context) {
			var i;

			// if event-callback object is passed to the function
			if (typeof names == 'object' && !(names instanceof Array)) {
				for (i in names)
					if (names.hasOwnProperty(i)) {
						magic.off(object, i, names[i], callback);
					}

				return object;
			}

			if (!names && !callback && !context && object[sym]) {
				object[sym].events = {};
				return object;
			}

			names = trim(names)
				.replace(/\s+/g, ' ') // single spaces only
				.split(/\s(?![^(]*\))/g);

			if (typeof object != 'object') {
				return object;
			}

			for (i = 0; i < names.length; i++) {
				object._off ? object._off(names[i], callback, context) : magic._off(object, names[i], callback, context);
			}

			return object;
		},


		trigger: function(object, names) {
			if (!object || typeof object != 'object' || !object[sym] || !object[sym].events) return object;

			var args,
				i;

			if (names) {
				args = toArray(arguments);
				names = names.split(/\s/);

				for (i = 0; i < names.length; i++) {
					args = args.slice();
					magic._trigger.apply(magic, args);
				}
			}

			return object;
		},


		_trigger: function(object, name) {
			var events = object && typeof object == 'object' && object[sym]
					&& object[sym].events && object[sym].events[name],
				args, i, l, ev;

			if (events) {
				args = toArray(arguments, 2),
					i = -1, l = events.length;
				while (++i < l)(ev = events[i]).callback.apply(ev.ctx, args);
			}

			return object;
		},

		_fastTrigger: function(object, name, evt) {
			var events = object[sym].events[name],
				i, l, ev;

			if (events) {
				i = -1, l = events.length;
				while (++i < l)(ev = events[i]).callback.call(ev.ctx, evt);
			}
		},

		bindNode: function(object, key, node, binder, evt, optional) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var isUndefined = typeof object[key] == 'undefined',
				$nodes,
				keys,
				i,
				j,
				special,
				indexOfDot,
				path,
				listenKey,
				changeHandler,
				domEvt,
				_binder,
				options,
				_options,
				mkHandler,
				foundBinder,
				_evt;

			/*
			 * this.bindNode([['key', $(), {on:'evt'}], [{key: $(), {on: 'evt'}}]], { silent: true });
			 */
			if (key instanceof Array) {
				for (i = 0; i < key.length; i++) {
					magic.bindNode(object, key[i][0], key[i][1], key[i][2] || evt, node);
				}

				return object;
			}

			/*
			 * this.bindNode('key1 key2', node, binder, { silent: true });
			 */
			if (typeof key == 'string') {
				keys = trim(key).split(/\s+/);
				if (keys.length > 1) {
					for (i = 0; i < keys.length; i++) {
						magic.bindNode(object, keys[i], node, binder, evt);
					}
					return object;
				}
			}

			/*
			 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
			 */
			if (typeof key == 'object') {
				for (i in key) {
					if (key.hasOwnProperty(i)) {
						magic.bindNode(object, i, key[i], node, binder, evt);
					}
				}

				return object;
			}

			/*
			 * this.bindNode('key', [ node, binder ], { silent: true });
			 */
			if (node && node.length == 2 && !node[1].nodeName && (node[1].setValue || node[1].getValue || node[1].on)) {
				return magic.bindNode(object, key, node[0], node[1], binder, evt);
			}

			indexOfDot = key.indexOf('.');

			if (~indexOfDot) {
				path = key.split('.');
				changeHandler = function(evt) {
					var target = evt && evt.value;
					if (!target) {
						target = object;
						for (var i = 0; i < path.length - 1; i++) {
							target = target[path[i]];
						}
					}
					magic.bindNode(target, path[path.length - 1], node, binder, evt, optional);

					if (evt && evt.previousValue) {
						magic.unbindNode(evt.previousValue, path[path.length - 1], node);
					}
				};

				magic._delegateListener(object, path.slice(0, path.length - 2).join('.'),
					'change:' + path[path.length - 2], changeHandler);

				changeHandler();

				return object;
			}

			$nodes = magic._getNodes(object, node);

			if (!$nodes.length) {
				if (optional) {
					return object;
				} else {
					throw Error('Binding error: node is missing for key "' + key + '".'
						+ (typeof node == 'string' ? ' The selector is "' + node + '"' : ''));
				}
			}

			evt = evt || {};

			special = magic._defineSpecial(object, key, key == 'sandbox');

			special.$nodes = special.$nodes.length ? special.$nodes.add($nodes) : $nodes;

			if (object.isMK) {
				if (key == 'sandbox') {
					object.$sandbox = $nodes;
					object.sandbox = $nodes[0];
				}
				object.$nodes[key] = special.$nodes;
				object.nodes[key] = special.$nodes[0];
			}

			if (key != 'sandbox') {
				for (i = 0; i < $nodes.length; i++) (function(node){
					var _binder,
						options = {
							self: object,
							key: key,
							$nodes: $nodes,
							node: node
						};

					if (binder === null) {
						_binder = {};
					} else {
						foundBinder = key == 'sandbox' ? null : magic.lookForBinder(node);

						if (foundBinder) {
							if (binder) {
								for (j in binder) {
									foundBinder[j] = binder[j];
								}
							}

							_binder = foundBinder;
						} else {
							_binder = binder || {};
						}
					}

					if (_binder.initialize) {
						_options = {
							value: special.value
						};
						for (j in options) {
							_options[j] = options[j];
						}
						_binder.initialize.call(node, _options);
					}

					if (_binder.setValue) {
						mkHandler = function(evt) {
							var v = object[key];
							if (evt && evt.changedNode == node && evt.onChangeValue == v) return;

							_options = {
								value: v
							};

							for (j in options) {
								_options[j] = options[j];
							}

							_binder.setValue.call(node, v, _options);
						};
						magic._fastAddListener(object, '_runbindings:' + key, mkHandler);
						!isUndefined && mkHandler();
					}

					if (_binder.getValue
							&& (isUndefined && evt.assignDefaultValue !== false || evt.assignDefaultValue === true)) {
						_evt = {
							fromNode: true
						};

						for (j in evt) {
							_evt[j] = evt[j];
						}

						magic.set(object, key, _binder.getValue.call(node, options), _evt);
					}

					if (_binder.getValue && _binder.on) {
						domEvt = {
							node: node,
							on: _binder.on,
							instance: object,
							key: key,
							mkHandler: mkHandler,
							handler: function(evt) {
								if (domEvt.removed) return;
								var oldvalue = object[key],
									value,
									j,
									_options = {
										value: oldvalue,
										domEvent: evt,
										originalEvent: evt.originalEvent || evt,
										preventDefault: function() {
											evt.preventDefault();
										},
										stopPropagation: function() {
											evt.stopPropagation();
										},
										which: evt.which,
										target: evt.target
									};


								// hasOwnProperty is not required there
								for (j in options) {
									_options[j] = options[j];
								}

								value = _binder.getValue.call(node, _options);

								if (value !== oldvalue) {
									magic.set(object, key, value, {
										fromNode: true,
										changedNode: node,
										onChangeValue: value
									});
								}
							}
						};

						magic.domEvents.add(domEvt);
					}

				})($nodes[i]);
			}

			if (!evt.silent) {
				_evt = {
					key: key,
					$nodes: $nodes,
					node: $nodes[0] || null
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				magic._fastTrigger(object, 'bind:' + key, _evt);
				magic._fastTrigger(object, 'bind', _evt);
			}

			return object;
		},

		bindOptionalNode: function(object, key, node, binder, evt) {
			if (typeof key == 'object') {
				/*
				 * this.bindNode({ key: $() }, { on: 'evt' }, { silent: true });
				 */
				magic.bindNode(object, key, node, binder, true);
			} else {
				magic.bindNode(object, key, node, binder, evt, true);
			}

			return object;
		},

		unbindNode: function(object, key, node, evt) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var type = typeof key,
				$nodes,
				keys,
				special = object[sym].special[key],
				i,
				indexOfDot,
				path,
				listenKey,
				_evt;

			if (key instanceof Array) {
				for (i = 0; i < key.length; i++) {
					evt = node;
					magic.unbindNode(object, key[i][0], key[i][1] || evt, evt);
				}

				return object;
			}

			if (type == 'string') {
				keys = key.split(/\s/);
				if (keys.length > 1) {
					for (i = 0; i < keys.length; i++) {
						magic.unbindNode(object, keys[i], node, evt);
					}
					return object;
				}
			}

			indexOfDot = key.indexOf('.');

			if (~indexOfDot) {
				path = key.split('.');
				var target = object;

				for (i = 0; i < path.length - 1; i++) {
					target = target[path[i]];
				}

				magic._undelegateListener(object, path.slice(0, path.length - 2), 'change:' + path[path.length - 2]);

				magic.unbindNode(target, path[path.length - 1], node, evt);

				return object;
			}

			if (key === null) {
				for (key in object[sym].special)
					if (object[sym].special.hasOwnProperty(key)) {
						magic.unbindNode(object, key, node, evt);
					}
				return object;
			} else if (type == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.unbindNode(object, i, key[i], node);
					}
				return object;
			} else if (!node) {
				if (special && special.$nodes) {
					return magic.unbindNode(object, key, special.$nodes, evt);
				} else {
					return object;
				}
			} else if (node.length == 2 && !node[1].nodeName && (node[1].setValue || node[1].getValue || node[1].on)) {
				// It actually ignores binder. With such a syntax you can assign definite binders to some variable and then easily delete all at once using
				return magic.unbindNode(object, key, node[0], evt);
			} else if (!special) {
				return object;
			}

			$nodes = magic._getNodes(object, node);

			each($nodes, function(node, i) {
				magic.domEvents.remove({
					key: key,
					node: node,
					instance: object
				});

				special.$nodes = special.$nodes.not(node);
			});

			if (object.isMK) {
				object.$nodes[key] = special.$nodes;
				object.nodes[key] = special.$nodes[0] || null;

				if (key == 'sandbox') {
					object.sandbox = special.$nodes[0] || null;
					object.$sandbox = special.$nodes;
				}
			}

			if (!evt || !evt.silent) {
				_evt = {
					key: key,
					$nodes: $nodes,
					node: $nodes[0] || null
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				magic._fastTrigger(object, 'unbind:' + key, _evt);
				magic._fastTrigger(object, 'unbind', _evt);
			}

			return object;
		},

		selectAll: function(object, s) {
			if (!object || typeof object != 'object' || !object.$sandbox) return $();
			initMK(object);

			return /:sandbox|:bound\(([^(]*)\)/.test(s) ? selectNodes(object, s) : object.$sandbox.find(s);
		},

		select: function(object, s) {
			return magic.selectAll(object, s)[0] || null;
		},

		boundAll: function(object, key) {
			if (!object || typeof object != 'object') return $();

			initMK(object);

			var special = object[sym].special,
				keys, $nodes, i;

			key = !key ? 'sandbox' : key;
			keys = typeof key == 'string' ? key.split(/\s+/) : key;
			if (keys.length <= 1) {
				return keys[0] in special ? special[keys[0]].$nodes : $();
			} else {
				$nodes = $();

				for (i = 0; i < keys.length; i++) {
					$nodes = $nodes.add(special[keys[i]].$nodes);
				}

				return $nodes;
			}
		},


		$bound: function(object, key) {
			return magic.boundAll(object, key);
		},


		bound: function(object, key) {
			if (!object || typeof object != 'object') return null;

			initMK(object);

			var special = object[sym].special,
				keys,
				i;

			key = !key ? 'sandbox' : key;
			keys = typeof key == 'string' ? key.split(/\s+/) : key;
			if (keys.length <= 1) {
				return keys[0] in special ? special[keys[0]].$nodes[0] || null : null;
			} else {
				for (i = 0; i < keys.length; i++) {
					if (keys[i] in special && special[keys[i]].$nodes.length) {
						return special[keys[i]].$nodes[0];
					}
				}
			}

			return null;
		},

		get: function(object, key) {
			return object && object[key];
		},

		// set method is the most often used method
		// we need to optimize it as good as possible
		set: function(object, key, v, evt) {

			if (!object || typeof object != 'object') return object;

			var type = typeof key,
				_isNaN = Number.isNaN || function(value) {
					return typeof value == 'number' && isNaN(value);
				},
                special, events, prevVal, newV, i, _evt, triggerChange;

			if (type == 'undefined') return object;

			if (type == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.set(object, i, key[i], v);
					}
				return object;
			}

			if (!object[sym] || !object[sym].special || !object[sym].special[key]) {
				object[key] = v;
				return object;
			}

			special = object[sym].special[key];
			events = object[sym].events;

			prevVal = special.value;

			if (special.mediator && v !== prevVal && (!evt || !evt.skipMediator && !evt.fromMediator)) {
				newV = special.mediator(v, prevVal, key, object);
			} else {
				newV = v;
			}

			_evt = {
				value: newV,
				previousValue: prevVal,
				key: key,
				node: special.$nodes[0] || null,
				$nodes: special.$nodes,
				self: object
			};

			if (evt && typeof evt == 'object') {
				for (i in evt) {
					_evt[i] = evt[i];
				}
			}

			triggerChange = (newV !== prevVal || _evt.force) && !_evt.silent;

			if (triggerChange) {
				events['beforechange:' + key] && magic._fastTrigger(object, 'beforechange:' + key, _evt);

				events.beforechange && magic._fastTrigger(object, 'beforechange', _evt);
			}

			special.value = newV;

			if (newV !== prevVal || _evt.force || _evt.forceHTML || newV !== v && !_isNaN(newV)) {
				if (!_evt.silentHTML) {
					events['_runbindings:' + key] && magic._fastTrigger(object, '_runbindings:' + key, _evt);
				}
			}

			if (triggerChange) {
				events['change:' + key] && magic._fastTrigger(object, 'change:' + key, _evt);

				events.change && magic._fastTrigger(object, 'change', _evt);
			}

			if ((newV !== prevVal || _evt.force || _evt.forceHTML) && !_evt.skipLinks) {
				events['_rundependencies:' + key] &&
					magic._fastTrigger(object, '_rundependencies:' + key, _evt);
			}

			return object;
		},


		/**
		 * @private
		 * Experimental simple template engine
		 */
		_parseBindings: function(object, node) {
			if (!object || typeof object != 'object') return null;

			initMK(object);

			var $nodes = (typeof node == 'string' ? magic.$.parseHTML(node.replace(/^\s+|\s+$/g, '')) : $(node)),
				all = $nodes.find('*').add($nodes);

			each(all, function(node) {

				(function f(node) {
					if (node.tagName !== 'TEXTAREA') {
						each(node.childNodes, function(childNode) {
							var previous = childNode.previousSibling,
								textContent;

							if (childNode.nodeType == 3 && ~childNode.nodeValue.indexOf('{{')) {
								textContent = childNode.nodeValue.replace(/{{([^}]*)}}/g,
									'<mk-bind mk-html="$1"></mk-bind>');
								if (previous) {
									previous.insertAdjacentHTML('afterend', textContent);
								} else {
									node.insertAdjacentHTML('afterbegin', textContent);
								}

								node.removeChild(childNode);
							} else if (childNode.nodeType == 1) {
								f(childNode);
							}
						});
					}
				})(node);
			});

			// reload list of nodes
			all = $nodes.find('*').add($nodes);

			each(all, function(node) {
				var bindHTMLKey = node.getAttribute('mk-html');
				if (bindHTMLKey) {
					magic.bindNode(object, bindHTMLKey, node, magic.binders.innerHTML());
					node.removeAttribute('mk-html');
				}

				each(node.attributes, function(attr) {
					var attrValue = trim(attr.value),
						attrName = attr.name,
						keys,
						key,
						binder;

					if (~attrValue.indexOf('{{')) {
						keys = attrValue.match(/{{[^}]*}}/g).map(function(key) {
							return key.replace(/{{(.*)}}/, '$1');
						});

						if (keys.length == 1 && /^{{[^}]*}}$/g.test(attrValue)) {
							key = keys[0];
						} else {
							key = magic.randomString();
							magic.linkProps(object, key, keys, function() {
								var v = attrValue;
								keys.forEach(function(_key) {
									v = v.replace(new RegExp('{{' + _key + '}}', 'g'), object[_key]);
								});

								return v;
							});
						}

						if ((attrName == 'value' && node.type != 'checkbox' || attrName == 'checked'
								&& node.type == 'checkbox') && magic.lookForBinder(node)) {
							magic.bindNode(object, key, node);
						} else {
							magic.bindNode(object, key, node, magic.binders.attribute(attrName));
						}
					}
				});
			});

			return $nodes;
		},

		remove: function(object, key, evt) {
			if (!object || typeof object != 'object') return null;

			var exists,
				keys = String(key).split(/\s/),
				i,
				_evt = {
					keys: keys
				};

			if (evt && typeof evt == 'object') {
				for (i in evt) {
					_evt[i] = evt[i];
				}
			}

			for (i = 0; i < keys.length; i++) {
				key = keys[i];
				exists = key in object;

				if (exists) {
					_evt.key = key;
					_evt.value = object[key];

					try { // @IE8 spike
						delete object[key];
					} catch (e) {}

					if (object[sym]) {
						magic.unbindNode(object, key);
						magic.off(object, 'change:' + key + ' beforechange:' + key
							+ ' _runbindings:' + key + ' _rundependencies:' + key);
						delete object[sym].special[key];

						if (!_evt.silent) {
							magic._fastTrigger(object, 'delete', _evt);
							magic._fastTrigger(object, 'delete:' + key, _evt);
						}
					}
				}
			}

			return object;
		},

		_getNodes: function(object, s) {
			return typeof s == 'string' && !/</.test(s) && /:sandbox|:bound\(([^(]*)\)/.test(s)
				? selectNodes(object, s) : $(s);
		},

		define: function(object, key, descriptor) {
			if (!object || typeof object != 'object') return object;

			var i;

			if (typeof key == 'object') {
				for (i in key) {
					magic.define(object, i, key[i]);
				}

				return object;
			}

			Object.defineProperty(object, key, descriptor);

			return object;
		},

		defineGetter: function(object, key, getter) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var i,
				special;

			if (typeof key == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.defineGetter(object, i, key[i]);
					}

				return object;
			}

			special = magic._defineSpecial(object, key);

			special.getter = function() {
				return getter.call(object, {
					value: special.value,
					key: key,
					self: object
				});
			};

			return object;
		},

		defineSetter: function(object, key, setter) {
			if (!object || typeof object != 'object') return object;

			initMK(object);

			var i;

			if (typeof key == 'object') {
				for (i in key)
					if (key.hasOwnProperty(i)) {
						magic.defineSetter(object, i, key[i]);
					}

				return object;
			}

			magic._defineSpecial(object, key).setter = function(v) {
				return setter.call(object, v, {
					value: v,
					key: key,
					self: object
				});
			};

			return object;
		},

		delay: function(object, f, delay, thisArg) {
			if (typeof delay == 'object') {
				thisArg = delay;
				delay = 0;
			}

			setTimeout(function() {
				f.call(thisArg || object);
			}, delay || 0);

			return object;
		},

		trim: trim = function(s) {
			return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, '');
		},

		toArray: toArray = function(object, start) {
			var array = [],
				l = object.length,
				i;

			start = start || 0;

			for (i = start; i < l; i++) {
				array[i - start] = object[i];
			}

			return array;
		},

		extend: extend = function(o1, o2) {
			var i, j;
			if (o1)
				for (i = 1; i < arguments.length; i++) {
					o2 = arguments[i];
					if (o2)
						for (j in o2)
							if (o2.hasOwnProperty(j)) {
								o1[j] = o2[j];
							}
				}
			return o1;
		},

		each: each = function(o, f, thisArg) {
			if (!o) return;
			if (o.isMK && typeof o.each == 'function') o.each(f, thisArg);
			else if ('length' in o)[].forEach.call(o, f, thisArg);
			else
				for (var i in o)
					if (o.hasOwnProperty(i)) {
						f.call(thisArg, o[i], i, o);
					}
			return o;
		},

		randomString: function() {
			return (new Date().getTime() - new Date(2013, 4, 3).getTime()).toString(36)
				+ Math.floor(Math.random() * 1679616).toString(36);
		},

		binders: binders,

		defaultBinders: [function(node) {
			var tagName = node.tagName,
				b;

			if (tagName == 'INPUT') {
				b = binders.input(node.type);
			} else if (tagName == 'TEXTAREA') {
				b = binders.textarea();
			} else if (tagName == 'SELECT') {
				b = binders.select(node.multiple);
			} else if (tagName == 'PROGRESS') {
				b = binders.progress();
			}

			return b;
		}],

		lookForBinder: function(node) {
			var result,
				ep = magic.defaultBinders,
				i;

			for (i = 0; i < ep.length; i++) {
				if (result = ep[i].call(node, node)) {
					return result;
				}
			}
		},

		debounce: function(f, d, thisArg) {
			var timeout;
			if (typeof d !== 'number') {
				thisArg = d;
				d = 0;
			}

			return function() {
				var args = arguments,
					ctx = this;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					f.apply(thisArg || ctx, args);
				}, d || 0);
			};
		},

		noop: function() {},

		$: $,

		$b: $b,

		useAs$: function(_$) {
			return magic.$ = this.$ = $ = _$;
		}
	};

	sym = magic.sym = typeof Symbol == 'undefined' ? 'mk-' + magic.randomString() : Symbol('matreshka');

	return magic;
}));


(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define('matreshka_dir/matreshka-core',[
			'xclass',
			'matreshka-magic'
		], factory);
	} else {
		root.MK = root.Matreshka = factory(root.Class, root.MatreshkaMagic);
	}
}(this, function(Class, magic) {

	if (!Class) {
		throw Error('Class function is missing');
	}
	if (![].forEach) {
		throw Error('Internet Explorer 8 requires to use es5-shim: https://github.com/es-shims/es5-shim');
	}

	var toArray = magic.toArray,
		extend = magic.extend,
		sym = magic.sym,
		MK = Class({
			//__special: null, // { <key>: { getter: f, $nodes: jQ, value: 4 }}
			//__events: null,
			isMK: true,

			on: function(names, callback, triggerOnInit, context, evtData) {
				return magic.on(this, names, callback, triggerOnInit, context, evtData);
			},

			onDebounce: function(names, callback, debounceDelay, triggerOnInit, context, evtData) {
				return magic.onDebounce(this, names, callback, debounceDelay, triggerOnInit, context, evtData);
			},

			_on: function(name, callback, context, evtData) {
				return magic._on(this, name, callback, context, evtData);
			},


			once: function(names, callback, context) {
				return magic.once(this, names, callback, context);
			},

			off: function(names, callback, context) {
				return magic.off(this, names, callback, context);
			},

			_off: function(name, callback, context) {
				return magic._off(this, name, callback, context);
			},

			trigger: function() {
				var args = magic.toArray(arguments);
				args.unshift(this);
				return magic.trigger.apply(magic, args);
			},

			_trigger: function() {
				var args = magic.toArray(arguments);
				args.unshift(this);
				return magic._trigger.apply(magic, args);
			},

			bindNode: function(key, node, binder, evt, optional) {
				return magic.bindNode(this, key, node, binder, evt, optional);
			},

			bindOptionalNode: function(key, node, binder, evt) {
				return magic.bindOptionalNode(this, key, node, binder, evt);
			},

			unbindNode: function(key, node, evt) {
				return magic.unbindNode(this, key, node, evt);
			},

			boundAll: function(key) {
				return magic.boundAll(this, key);
			},

			$bound: function(key) {
				return magic.boundAll(this, key);
			},

			bound: function(key) {
				return magic.bound(this, key);
			},

			selectAll: function(s) {
				return magic.selectAll(this, s);
			},

			$: function(s) {
				return magic.selectAll(this, s);
			},

			select: function(s) {
				return magic.select(this, s);
			},

			/**
			 * @private
			 * @method Matreshka#_defineSpecial
			 * @todo Defines needed descriptor for given key
			 */
			_defineSpecial: function(key) {
				return magic._defineSpecial(this, key);
			},

			eq: function(object) { // @IE8
				return typeof object == 'object' && object !== null
                    && this[sym] && object[sym] && this[sym].id == object[sym].id;
			},

			defineGetter: function(key, getter) {
				return magic.defineGetter(this, key, getter);
			},

			defineSetter: function(key, setter) {
				return magic.defineSetter(this, key, setter);
			},

			mediate: function(keys, mediator) {
				return magic.mediate(this, keys, mediator);
			},

			setClassFor: function(keys, Class, updateFunction) {
				return magic.setClassFor(this, keys, Class, updateFunction);
			},

			linkProps: function(key, keys, getter, setOnInit) {
				return magic.linkProps(this, key, keys, getter, setOnInit);
			},

			get: function(key) {
				return this[key];
			},

			set: function(key, v, evt) {
				return magic.set(this, key, v, evt);
			},

			remove: function(key, evt) {
				return magic.remove(this, key, evt);
			},

			define: function(key, descriptor) {
				return magic.define(this, key, descriptor);
			},

			delay: function(f, delay, thisArg) {
				return magic.delay(this, f, delay, thisArg);
			},

			/**
			 * @method Matreshka#_initMK
			 * @private
			 */
			_initMK: function() {
				var _this = this;

				if(_this[sym]) return _this;

				magic.initMK(_this);

				_this.nodes = _this.nodes = {};
				_this.$nodes = _this.$nodes = {};
				_this.sandbox = _this.sandbox || null;
				_this.$sandbox = _this.$sandbox || MK.$();
				_this.Matreshka = MK;

				return _this;
			},

			toString: function() {
				return '[object Matreshka]';
			},

			constructor: function Matreshka() {
				this._initMK();
			}
		});

	/*

	This is the list of methods that inherited from magic. We need a way how to
	inherit them dynamically. method.apply is slow
	"on onDebounce _on once off _off trigger _trigger bindNode bindOptionalNode\
	 unbindNode boundAll $bound bound selectAll $ select _defineSpecial defineGetter\
	 defineSetter mediate fixClassOf linkProps get set remove define delay".split( /\s+/ )
	*/

	extend(MK, magic, {

		version: 'dev',

		Class: Class,

		isXDR: Class.isXDR,

		to: function(data) {
			var result,
				i;

			if (typeof data == 'object') {
				if ('length' in data) {
					result = [];
					for (i = 0; i < data.length; i++) {
						result[i] = MK.to(data[i]);
					}
					result = new MK.Array().recreate(result);
				} else {
					result = {};
					for (i in data)
						if (data.hasOwnProperty(i)) {
							result[i] = MK.to(data[i]);
						}
					result = new MK.Object(result);
				}
			} else {
				result = data;
			}

			return result;
		}
	});

	return MK;
}));



(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define('matreshka_dir/matreshka-object',[
			'matreshka_dir/matreshka-core'
		], factory);
	} else {
		factory(root.MK);
	}
}(this, function(MK) {
	if (!MK) {
		throw new Error('Matreshka is missing');
	}
	var sym = MK.sym,
		i,

		prototype = {
			'extends': MK,
			isMKObject: true,
			renderer: null,
			constructor: function MatreshkaObject(object) {
				this.jset(object);
			},

			keys: function() {
				var _this = this._initMK(),
					keys = _this[sym].keys,
					result = [],
					p;

				for (p in keys)
					if (keys.hasOwnProperty(p)) {
						result.push(p);
					}

				return result;
			},

			/**
			 * @method Matreshka.Object#_initMK
			 * @private
			 */
			_initMK: function() {
				var _this = this,
					addedEvents;

				if (_this[sym]) return _this;

				MK.prototype._initMK.call(_this, arguments);

				_this[sym].keys = {};

				MK._fastAddListener(_this, 'addevent:modify', function(evt) {
					if (!addedEvents) {
						MK._fastAddListener(_this, 'change', function(evt) {
							if (evt && (evt.key in _this[sym].keys) && !evt.silent) {
								MK._fastTrigger(_this, 'modify', evt);
							}
						});

						MK._fastAddListener(_this, 'delete', function(evt) {
							if (evt && (evt.key in _this[sym].keys)) {
								_this.removeDataKeys(evt.key);

								if (!evt.silent) {
									MK._fastTrigger(_this, 'modify', evt);
								}
							}
						});

						addedEvents = true;
					}
				});

				return _this;
			},


			hasOwnProperty: function(key) {
				return this._initMK()[sym].keys.hasOwnProperty(key);
			},


			toObject: function() {
				var _this = this._initMK(),
					o = {},
					keys = _this[sym].keys,
					p;

				for (p in keys) {
					if (keys.hasOwnProperty(p)) {
						o[p] = _this[p];
					}
				}

				return o;
			},


			toNative: function() {
				return this.toObject();
			},


			toJSON: function() {
				var _this = this._initMK(),
					JSON = {},
					keys = _this[sym].keys,
					p;

				for (p in keys)
					if (keys.hasOwnProperty(p)) {
						JSON[p] = _this[p] && _this[p].toJSON ? _this[p].toJSON() : _this[p];
					}

				return JSON;
			},


			keyOf: function(o) {
				var _this = this._initMK(),
					keys = _this[sym].keys,
					p;

				for (p in keys)
					if (keys.hasOwnProperty(p)) {
						if (o && o.isMK) {
							if (o.eq(_this[p])) {
								return p;
							}
						} else if (o === _this[p]) {
							return p;
						}
					}

				return null;
			},


			jset: function(key, v, evt) {
				var _this = this._initMK(),
					type = typeof key;

				if (type == 'undefined') return _this;

				if (key && type == 'object') {
					key = key.toJSON ? key.toJSON() : key;

					for (i in key) {
						_this[sym].keys[i] = 1;
						_this._defineSpecial(i);
						_this.set(i, key[i], v);
					}

					return _this;
				}

				_this[sym].keys[key] = 1;
				_this._defineSpecial(key);
				return _this.set(key, v, evt);
			},


			addDataKeys: function(keys) {
				var _this = this._initMK(),
					args = arguments;
				if (!args.length) return _this;
				keys = args.length > 1 ? args : keys instanceof Array ? keys : String(keys).split(/\s/);
				for (i = 0; i < keys.length; i++) {
					_this[sym].keys[keys[i]] = 1;
					_this._defineSpecial(keys[i]);
				}
				return _this;
			},

			removeDataKeys: function(keys) {
				var _this = this._initMK(),
					args = arguments;
				if (!args.length) return _this;
				keys = args.length > 1 ? args : keys instanceof Array ? keys : String(keys).split(/\s/);
				for (i = 0; i < keys.length; i++) {
					delete _this[sym].keys[keys[i]];
				}
				return _this;
			},

			each: function(callback, thisArg) {
				var _this = this._initMK(),
					p;
				for (p in _this[sym].keys)
					if (_this[sym].keys.hasOwnProperty(p)) {
						callback.call(thisArg, _this[p], p, _this);
					}

				return _this;
			}
		};


	prototype[typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator'] = function() {
		var _this = this,
			keys = _this.keys(),
			i = 0;

		return {
			next: function() {
				if (i > keys.length - 1) {
					return {
						done: true
					};
				} else {
					return {
						done: false,
						value: _this[keys[i++]]
					};
				}
			}
		};
	};

	return MK.Object = MK.Class(prototype);
}));



(function(root, factory) {
	if (typeof define == 'function' && define.amd) {
		define('matreshka_dir/matreshka-array',[
			'matreshka_dir/matreshka-core'
		], factory);
	} else {
		factory(root.MK);
	}
}(this, function(MK) {
	if (!MK) {
		throw new Error('Matreshka is missing');
	}

	var Array_prototype = Array.prototype,
		sym = MK.sym,
		toArray = MK.toArray,
		slice = Array_prototype.slice,
		isXDR = MK.isXDR,
		compare = function(a1, a2, i, l) {
			if (a1.length != a2.length)
				return false;

			for (i = 0, l = a1.length; i < l; i++) {
				if (a1[i] && a1[i].isMK ? !a1[i].eq(a2[i]) : a1[i] !== a2[i]) {
					return false;
				}
			}

			return true;
		},
		indexOf = isXDR ? function(sought) {
			var _this = this,
				l = _this.length,
				i, item,
				isMK = sought && sought.isMK;

			for (i = 0; i < l; i++) {
				item = _this[i];
				if (isMK ? sought.eq(item) : sought === item) {
					return i;
				}
			}

			return -1;
		} : Array_prototype.indexOf,
		lastIndexOf = isXDR ? function(sought) {
			var _this = this,
				l = _this.length,
				i, item,
				isMK = sought && sought.isMK;

			for (i = l - 1; i >= 0; i--) {
				item = _this[i];
				if (isMK ? sought.eq(item) : sought === item) {
					return i;
				}
			}

			return -1;
		} : Array_prototype.lastIndexOf,



		triggerModify = function(_this, evt, additional) {
			var added = evt.added,
				removed = evt.removed,
				events = _this[sym].events,
				i;

			if(!evt.silent) {
				if (additional) {
					events[additional] && MK._fastTrigger(_this, additional, evt);
				}

				if (added.length) {
					events.add && MK._fastTrigger(_this, 'add', evt);

					if (events.addone) {
						for (i = 0; i < added.length; i++) {
							MK._fastTrigger(_this, 'addone', {
								self: _this,
								added: added[i]
							});
						}
					}
				}

				if (removed.length) {
					events.remove && MK._fastTrigger(_this, 'remove', evt);

					if (events.removeone) {
						for (i = 0; i < removed.length; i++) {
							MK._fastTrigger(_this, 'removeone', {
								self: _this,
								removed: removed[i]
							});
						}
					}
				}

				if (added.length || removed.length) {
					events.modify && MK._fastTrigger(_this, 'modify', evt);
				}
			}

			if (added.length || removed.length) {
				if (!evt.dontRender) {
					_this.processRendering(evt);
				}
			}
		},

		recreate = function(_this, array) {
			array = array || [];
			var diff = _this.length - array.length,
				prepared,
				i;

			for (i = 0; i < array.length; i++) {
				_this[i] = array[i];
			}

			for (i = 0; i < diff; i++) {
				_this.remove(i + array.length, {
					silent: true
				});
			}

			_this.length = array.length;

			return _this;
		},

		createMethod = function(name, hasOptions) {
			var i,
				_evt;


			switch (name) {
				case 'forEach':
					return function() {
						var _this = this;
						Array_prototype[name].apply(isXDR ? _this.toArray() : _this, arguments);
						return _this;
					};
				case 'map':
				case 'filter':
				case 'slice':
					return function() {
						var _this = this;
						return MK.Array.from(Array_prototype[name].apply(isXDR ? _this.toArray() : _this, arguments));
					};
				case 'every':
				case 'some':
				case 'reduce':
				case 'reduceRight':
				case 'join':
					return function() {
						var _this = this;
						return Array_prototype[name].apply(isXDR ? _this.toArray() : _this, arguments);
					};
				case 'sort':
				case 'reverse':
					return function() {
						if (!this.length) return;

						var _this = this._initMK(),
							_arguments = arguments,
							args = toArray(_arguments),
							evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
							array = _this.toArray(),
							returns = Array_prototype[name].apply(array, args);

						if (hasOptions) {
							args.pop();
						}

						if (isXDR) {
							array = _this.toArray();
							returns = Array_prototype[name].apply(array, args);
							recreate(_this, array);
						} else {
							returns = Array_prototype[name].apply(_this, args);
						}

						_evt = {
							returns: returns,
							args: args,
							originalArgs: _arguments,
							method: name,
							self: _this,
							added: [],
							removed: []
						};

						for (i in evt) {
							_evt[i] = evt[i];
						}


						triggerModify(_this, _evt, name);

						return _this;
					};

				case 'pop':
				case 'shift':
					return function() {
						if (!this.length) return;

						var _this = this._initMK(),
							_arguments = arguments,
							args = toArray(_arguments),
							evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
							array,
							returns,
							added,
							removed;

						if (hasOptions) {
							args.pop();
						}


						if (isXDR) {
							array = _this.toArray();
							returns = Array_prototype[name].apply(array, args);
							recreate(_this, array);
						} else {
							returns = Array_prototype[name].apply(_this, args);
						}

						_evt = {
							returns: returns,
							args: args,
							originalArgs: _arguments,
							method: name,
							self: _this,
							added: added = [],
							removed: removed = [returns]
						};

						for (i in evt) {
							_evt[i] = evt[i];
						}

						triggerModify(_this, _evt, name);

						return returns;
					};
				case 'push':
				case 'unshift':
					return function() {
						var _this = this._initMK(),
							_arguments = arguments,
							args = toArray(_arguments),
							evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
							array,
							returns,
							added,
							removed;

						if (hasOptions) {
							args.pop();
						}

						if (!args.length) return _this.length;

						if (!evt.skipMediator && typeof _this._itemMediator == 'function') {
							for (i = 0; i < args.length; i++) {
								args[i] = _this._itemMediator.call(_this, args[i], i);
							}
						}

						if (isXDR) {
							array = _this.toArray();
							returns = Array_prototype[name].apply(array, args);
							recreate(_this, array);
						} else {
							returns = Array_prototype[name].apply(_this, args);
						}

						_evt = {
							returns: returns,
							args: args,
							originalArgs: _arguments,
							method: name,
							self: _this,
							added: added = args,
							removed: removed = []
						};

						for (i in evt) {
							_evt[i] = evt[i];
						}

						triggerModify(_this, _evt, name);

						return returns;
					};
				case 'splice':
					return function() {
						var _this = this._initMK(),
							_arguments = arguments,
							args = toArray(_arguments),
							evt = hasOptions ? _arguments[_arguments.length - 1] || {} : {},
							array,
							returns,
							added = toArray(args, 2),
							removed;

						if (hasOptions) {
							args.pop();
						}

						if (!evt.skipMediator && typeof _this._itemMediator == 'function') {
							for (i = 2; i < args.length; i++) {
								args[i] = _this._itemMediator.call(_this, args[i], i);
							}
						}

						if (isXDR) {
							array = _this.toArray();
							returns = Array_prototype[name].apply(array, args);
							recreate(_this, array);
						} else {
							returns = Array_prototype[name].apply(_this, args);
						}

						removed = returns;

						if (added.length || removed.length) {
							_evt = {
								returns: returns,
								args: args,
								originalArgs: _arguments,
								method: name,
								self: _this,
								added: added,
								removed: removed
							};

							for (i in evt) {
								_evt[i] = evt[i];
							}

							triggerModify(_this, _evt, name);
						}

						return MK.Array.from(returns);
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
			constructor: function MatreshkaArray(length) {
				var _this = this._initMK(),
					al = arguments.length,
					i;
				if (al == 1 && typeof length == 'number') {
					_this.length = length;
				} else {
					for (i = 0; i < al; i++) {
						_this[i] = arguments[i];
					}
					_this.length = arguments.length;
				}
			},


			mediateItem: function(itemMediator) {
				var _this = this,
					l = _this.length,
					i;
				_this._itemMediator = itemMediator;
				for (i = 0; i < l; i++) {
					_this[i] = itemMediator.call(_this, _this[i], i);
				}
				return _this;
			},


			recreate: function(array, evt) {
				array = array || [];
				var _this = this._initMK(),
					diff = _this.length - array.length,
					was = _this.toArray(),
					prepared,
					i, j,
					_evt,
					added, removed, now;

				evt = evt || {};

				if (_this._itemMediator && !evt.skipMediator) {
					prepared = [];
					for (i = 0; i < array.length; i++) {
						prepared[i] = _this._itemMediator.call(_this, array[i], i);
					}
					array = prepared;
				}

				for (i = 0; i < array.length; i++) {
					_this[i] = array[i];
				}

				for (i = 0; i < diff; i++) {
					try { // @IE8 spike
						delete _this[i + array.length];
					} catch (e) {}

					delete _this[sym].special[i + array.length];

					/*_this.remove(i + array.length, {
						silent: true
					});*/
				}

				_this.length = array.length;

				if (evt.silent && evt.dontRender) {
					return _this;
				}

				now = _this.toArray();

				if (now.length) {
					removed = [];
					j = 0;
					for (i = 0; i < was.length; i++) {
						if (!~indexOf.call(now, was[i])) {
							removed[j++] = was[i];
						}
					}
				} else {
					removed = was;
				}

				if (was.length) {
					added = [];
					j = 0;
					for (i = 0; i < now.length; i++) {
						if (!~indexOf.call(was, now[i])) {
							added[j++] = now[i];
						}
					}
				} else {
					added = now;
				}

				_evt = {
					added: added,
					removed: removed,
					was: was,
					now: now,
					method: 'recreate',
					self: _this
				};

				for (i in evt) {
					_evt[i] = evt[i];
				}

				triggerModify(_this, _evt, 'recreate');

				return _this;
			},


			toArray: function() {
				var _this = this,
					array = [],
					l = _this.length,
					i;

				array = [];
				for (i = 0; i < l; i++) {
					array[i] = _this[i];
				}

				return array;
			},


			toNative: function() {
				return this.toArray();
			},

			/**
			 * @method Matreshka.Array#_initMK
			 * @private
			 */
			_initMK: function() {
				var _this = this,
					changeModel;

				if (_this[sym]) return _this;

				changeModel = function() {
					var Model = _this.Model;
					if (Model) {
						_this.mediateItem(function(item) {
							return !item || !item.isMK || !(item && item.instanceOf ? item.instanceOf(Model)
							: item instanceof Model)
							? new Model(item && item.toJSON ? item.toJSON() : item, _this) : item;
						});
					}
				};

				MK.prototype._initMK.call(_this);

				MK._fastAddListener(_this, 'change:Model', changeModel);

				MK._fastAddListener(_this, 'change:itemRenderer', function() {
					_this.rerender({
						forceRerender: true
					});
				});

				changeModel();

				return _this;
			},

			/**
			 * @private
			 * @since 0.1
			 */
			_renderOne: function(item, evt) {
				if (!item || !item.isMK || !this.renderIfPossible || evt.dontRender) return;

				var _this = this,
					id = _this[sym].id,
					renderer = item.renderer || _this.itemRenderer,
					rendererContext = renderer === item.renderer ? item : _this,
					arraysNodes = item[sym].arraysNodes = item[sym].arraysNodes || {},
					node = arraysNodes[id],
					$node,
					template,
					itemEvt,
					sandboxes,
					i;

				if(!renderer) return;

				if (evt.moveSandbox) {
					if (node = item.bound(['sandbox'])) {
						arraysNodes[id] = node;
					}
				}

				if(node && evt.forceRerender) {
					sandboxes = item.boundAll(['sandbox']);

					for(i = 0; i < sandboxes.length; i++) {
						if(node == sandboxes[i]) {
							item.unbindNode('sandbox', node);
							break;
						}
					}

					node = arraysNodes[id] = null;
				}

				if (!node) {
					if (typeof renderer == 'function') {
						renderer = renderer.call(rendererContext, item);
					}

					if (typeof renderer == 'string' && !/<|{{/.test(renderer)) {
						template = rendererContext._getNodes(renderer);
						if (template = template && template[0]) {
							template = template.innerHTML;
						} else {
							throw Error('renderer node is missing: ' + renderer);
						}
					} else {
						template = renderer;
					}

					$node = _this.useBindingsParser ? MK._parseBindings(item, template) : (typeof template == 'string'
						? MK.$.parseHTML(template.replace(/^\s+|\s+$/g, '')) : MK.$(template));

					if (item.bindRenderedAsSandbox !== false && $node.length) {
						MK.bindNode(item, 'sandbox', $node);
					}

					node = $node[0];

					arraysNodes[id] = node;

					itemEvt = {
						node: node,
						$nodes: $node,
						self: item,
						parentArray: _this
					};

					item.onRender && item.onRender(itemEvt);
					_this.onItemRender && _this.onItemRender(item, itemEvt);

					MK._fastTrigger(item, 'render', itemEvt);
				}

				return node;
			},

			processRendering: function(evt) {
				var _this = this,
					props = _this[sym],
					id = props.id,
					l = _this.length,
					destroyOne = function(item) {
						var arraysNodes;
						if (item && item.isMK) {
							if (arraysNodes = item[sym].arraysNodes) {
								node = arraysNodes[id];
								delete arraysNodes[id];
							}

							return node;
						}
					},
					node,
					i,
					item,
					container = props.special.container || props.special.sandbox;

				container = container && container.$nodes;
				container = container && container[0];

				if (!container) return _this;

				switch (evt.method) {
					case 'push':
						for (i = l - evt.added.length; i < l; i++) {
							if (node = _this._renderOne(_this[i], evt)) {
								container.appendChild(node);
							}
						}

						break;
					case 'unshift':
						for (i = evt.added.length - 1; i + 1; i--) {
							if (node = _this._renderOne(_this[i], evt)) {
								if (container.children) {
									container.insertBefore(node, container.firstChild);
								} else {
									container.appendChild(node);
								}
							}
						}

						break;
					case 'pull':
					case 'pop':
					case 'shift':
						for (i = 0; i < evt.removed.length; i++) {
							if (node = destroyOne(evt.removed[i])) {
								container.removeChild(node);
							}
						}

						break;
					case 'sort':
					case 'reverse':
						for (i = 0; i < l; i++) {
							item = _this[i];
							if (node = item && item.isMK && item[sym].arraysNodes[id]) {
								container.appendChild(node);
							}
						}

						break;
					case 'rerender':
						if(evt.forceRerender) {
							for (i = 0; i < l; i++) {
								if (node = destroyOne(_this[i])) {
									container.removeChild(node);
								}
							}
						}

						for (i = 0; i < l; i++) {
							if (node = _this._renderOne(_this[i], evt)) {
								container.appendChild(node);
							}
						}

						break;
					case 'recreate':
					case 'splice':
						for (i = 0; i < evt.removed.length; i++) {
							if (node = destroyOne(evt.removed[i])) {
								container.removeChild(node);
							}
						}

						for (i = 0; i < l; i++) {
							if (node = _this._renderOne(_this[i], evt)) {
								container.appendChild(node);
							}
						}

						break;
				}

				return _this;
			},


			rerender: function(evt) {
				var _evt = {
						method: 'rerender'
					},
					i;
				if(evt && typeof evt == 'object') {
					for(i in evt) {
						_evt[i] = evt[i];
					}
				}

				return this.processRendering(_evt);
			},


			hasOwnProperty: function(p) {
				return p == 'length' || p < this.length && p >= 0;
			},


			toJSON: function() {
				var _this = this,
					JSON = [],
					l = _this.length,
					i;

				for (i = 0; i < l; i++) {
					_this[i] && _this[i].toJSON ? JSON.push(_this[i].toJSON()) : JSON.push(_this[i]);
				}

				return JSON;
			},


			concat: function() {
				var args = arguments,
					result = this.toArray(),
					arg,
					i,
					j;

				for (i = 0; i < args.length; i++) {
					arg = args[i];
					if (arg instanceof Array || arg instanceof MK.Array || arg && arg.instanceOf && arg.instanceOf(MK.Array)) {
						for (j = 0; j < arg.length; j++) {
							result.push(arg[j]);
						}
					}
				}

				return MK.Array.from(result);
			},



			pull: function(index, evt) {
				var _this = this._initMK(),
					array = _this.toArray(),
					_index = index,
					type = typeof index,
					returns,
					removed,
					_evt,
					i;

				if (type != 'number' && type != 'string') {
					index = _this.indexOf(index);
					if (!~index) {
						return null;
					}
				}

				returns = array.splice(index, 1)[0] || null;

				if (!compare(array, _this)) {
					evt = evt || {};

					recreate(_this, array, evt);

					_evt = {
						returns: returns,
						args: [_index],
						method: 'pull',
						self: _this,
						added: [],
						removed: removed = returns ? [returns] : []
					};

					for (i in evt) {
						_evt[i] = evt[i];
					}

					triggerModify(_this, _evt, 'pull');
				}

				return returns;
			},

			// es5-shim doesn't help with indexOf and lastIndexOf
			indexOf: indexOf,
			lastIndexOf: lastIndexOf,
			toString: function() {
				return this.toArray().join(',');
			}
		};

	'push pop unshift shift sort reverse splice map filter slice every some reduce reduceRight forEach join'
	.split(' ').forEach(function(name) {
		prototype[name] = createMethod(name);
	});

	'push pop unshift shift sort reverse splice'.split(' ').forEach(function(name) {
		prototype[name + '_'] = createMethod(name, 1);
	});

	prototype.each = prototype.forEach;

	prototype[typeof Symbol != 'undefined' ? Symbol.iterator : '@@iterator'] = function() {
		var _this = this,
			i = 0;
		return {
			next: function() {
				if (i > _this.length - 1) {
					return {
						done: true
					};
				} else {
					return {
						done: false,
						value: _this[i++]
					};
				}
			}
		};
	};

	MK.Array = MK.Class(prototype);

	MK.Array.of = function() {
		var result = new MK.Array(),
			args = arguments,
			i;

		result.length = args.length;

		for (i = 0; i < args.length; i++) {
			result[i] = args[i];
		}

		return result;
	};

	// Doesn't work with maps and sets yet
	MK.Array.from = function(arrayLike, mapFn, thisArg) {
		var result = new MK.Array(),
			i;

		result.length = arrayLike.length;

		for (i = 0; i < arrayLike.length; i++) {
			result[i] = mapFn ? mapFn.call(thisArg, arrayLike[i], i, arrayLike) : arrayLike[i];
		}

		return result;
	};

	return MK.Array;
}));


if ( typeof define === 'function' && define.amd ) {
	define( 'matreshka', [
		'matreshka_dir/matreshka-core',
		'matreshka_dir/matreshka-object',
		'matreshka_dir/matreshka-array'
	], function( MK, MK_Object, MK_Array, MK_binders ) {
		return MK;
	});
};
;							if(typeof define==="function"&&define.amd) {								define(["matreshka"],function(MK){									MK.version="1.1.0-alpha.1";									return MK;								});							} else {								Matreshka.version="1.1.0-alpha.1";								if(typeof exports=="object") module.exports=Matreshka;							}