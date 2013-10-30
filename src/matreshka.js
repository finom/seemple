"use strict";
( function( gc, Class ) {
if( !Class ) {
	throw Error( 'Class function is not defined' );
}
/**
 * @class Matreshka
 * @version 0.0.3
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
 * }
 * });
*/
var MK = gc.MK = gc.Matreshka = Class({
	//__special: null, // { <key>: { getter: f, elements: jQ, value: 4 }}
	//__events: null,
	/** 
	 * @method Matreshka#on
	 * @summary Attaches an event handler to the self
	 * @desc The {@link Matreshka#on} method attaches event handler to the Matreshka instance. The event could be triggered by {@link Matreshka#trigger} method. 
	 * You can pass <code>"change:myKey"</code> as first {@link Matreshka#on} argument to monitor <code>"myKey"</code> property changes.
	 * @param {eventNames} names - Names of the space-delimited list of events (eg. "change:x ajaxcomplete change:y")
	 * @param {eventHandler} callback - A function to execute when the event is triggered
	 * @param {boolean} [triggerOnInit] - If <code>triggerOnInit</code> equals to <code>true</code> then an event handler will be triggered immediately
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
		var events,
			ev,
			names = names.split( /\s/ ),
			key,
			t;
			
		if( typeof triggerOnInit !== 'boolean' ) {
			t = context;
			context = triggerOnInit;
			triggerOnInit = t;
		}
		
		for( var i = 0; i < names.length; i++ ) {
			events = this.__events[names[i]] || (this.__events[names[i]] = []);
			ev = {
				callback: callback,
				context: context,
				ctx: context || this
			};
			
			events.push( ev );
			
			if( !names[ i ].indexOf( 'change:' ) ) { // means 'change:' in the beginning of the string
				this.makeSpecial( names[ i ].replace( 'change:', '' ) );
			}
			
			/*
				domEvt = names[ i ].split( '::' ); // todo .on( 'click::foo submit::bar' )
				if( domEvt.length > 1 ) {
					this.__special[ domEvt[ 1 ] ].elements.on( domEvt[ 0 ] + '.mk', { mk: {
						instance: this,
						key: domEvt[ 1 ]
					}}, function() {
						callback.apply( ctx, arguments );
					});
				}
			*/
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
				once._callback = callback;
				this.on(name, once, context);
			}).call( this, name );
			
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
		var retain, ev, events, names, i, l, j, k;
		
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
		
		if (allEvents && !silentAllEvent) triggerEvents(allEvents, arguments);
		
		return this;
	},
	
	/**
	 * @private
	 * @method Matreshka#elementProcessor
	 * @desc Returns options (defined in MK.elementProcessors: setValue, getValue, on) that matches given element
	 * @param {Node} el
	 * @returns {Object} properties
	 */
	elementProcessor: function( el ) {
		var result,
			ep = MK.elementProcessors;
		for( var i = 0; i < ep.length; i++ ) {
			result = ep[ i ]( el );
			if( result ) {
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
	 * @param {(Node[]|NodeList|Node|jQuery|string)} el - An element (DOM Node or DOM NodeList or array of nodes or jQuery instance or css selector...) that has to be binded to given key(s)
	 * @param {elementOptions} [elOpts] - An element options object which contains following properties: setValue (how to set value for an element), getValue (how to extract value from an element), on (when we have to extract a value from an element and assign it to given property)
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
	 * @example <caption>Basic usage 2. By Default {@link Matreshka.elementProcessors} array contains elementOptions for few dom elements <code>(input[type="text"], input[type="radio"], input[type="checkbox"], select, textarea...)</code>. So you don't need to pass eventOptions for these elements</caption>
	 * this.bindElement( 'myKey', '.checkbox' );
	 * 
	 * @example <caption>Custom checkbox 1. This example Shows how to create your own custom checkbox that has <code>"checked"</code> class if it's state is checked.</caption>
	 * this.bindElement( 'myKey', '.custom-checkbox', {
	 * 	on: 'click',
	 * 	getValue: function() {
	 * 		// at this case we use jQuery
	 * 		return $( this ).hasClass( 'checked' );
	 * 	},
	 * 	setValue: function( v ) {
	 * 		$( this ).toggleClass( 'checked', !!v );
	 * 	}
	 * });
	 * 
	 * @example <caption>Custom checkbox 2. In this example we'll do the same as in previous example but using predefined elementOptions via {@link Matreshka.elementProcessors}.</caption>
	 * //shift means that we're adding new elementProcessor to the beginning of MK.elementProcessors list
	 * MK.elementProcessors.shift( function( element ) {
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
	 * @example <caption>Extending default elementOptions. For example we're working with <code>input[type="text"]</code>. By default <code>"on"</code> property for this element contains <code>"keydown"</code> string. But we want to use <code>"blur"</code> event for the element that has been bound to <code>myKey</code> property</caption>
	 * this.bindElement( 'myKey', '.custom-checkbox', { on: "blur" });
	 * 
	 * @example <caption>Binding self to the element. If you want to use context (sandbox) for binding elements contained in single element, you can pass <code>this</code> special property to the method</caption>
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
	 * @param {elementOptions} [elOpts] - (see above)
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
	 * @desc {@link Matreshka#bindElement} accepts one more way how to pass <code>key, element, elementOptions</code> to the method. It looks ugly but helps when you want to memorize special bindings that you going to kill later using {@link Matreshka#unbindElement}.
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
	bindElement: function( key, el, elOpts, evtOpts ) {
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
		 * this.bindElement('key1 key2', el, elOpts, { silent: true });
		 */
		if( typeof key === 'string' ) {
			keys = key.split( /\s/ );
			if( keys.length > 1 ) {
				for( i = 0; i < keys.length; i++ ) {
					this.bindElement( keys[ i ], el, elOpts, evtOpts );
				}
				return this;
			}
		}
		
		
		/*
		 * this.bindElement({ key: $() }, { on: 'evt' }, { silent: true });
		 */		
		if( typeof key === 'object' ) {
			for( i in key ) if( key.hasOwnProperty( i ) ) {
				this.bindElement( i, key[ i ], el, elOpts );
			}
			return this;
		}
		
		this.makeSpecial( key );
		
		$el = $( el );
		
		if( !$el.length ) {
			try {
				console.warn( 'Binded Element is missing for key "'+key+'"' );
			} catch( e ) {}
			return this;
		}
		
		this.__special[ key ].elements = this.__special[ key ].elements.add( $el );
		
		$el.each( function( i, el ) {
			var options = elOpts !== null ? MK.extend( key === '__this__' ? {} : self.elementProcessor( el ), elOpts ) : {},
				mkHandler;
			if( options.setValue ) {
				mkHandler = function( evt ) {
					options.setValue.call( el, self[ key ], self, key );
				};
				self.on( '_change:' + key, mkHandler );
				if( !keyInThis && options.getValue ) {
					self.__special[ key ].value = options.getValue.call( el, self, key );
				} else if( keyInThis ) {
					mkHandler();
				}
			}
			
			if( options.getValue && options.on ) {
				$( el ).on( options.on.split( /\s/ ).join( '.mk ' ) + '.mk', { mk: {
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
				});
			}			
		});
		
		
		
		if( !evtOpts || !evtOpts.silent ) {
			this.trigger( 'bind:' + key, MK.extend({
				key: key,
				$el: $el,
				el: $el[ 0 ] || null
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
	 * @param {(Node[]|NodeList|Node|jQuery|string)} [el]- An element (DOM Node or DOM NodeList or array of nodes or jQuery instance or css selector) that has to be unbinded from given key(s)
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
	 * @param {(Node[]|NodeList|Node|jQuery|string)} [el]
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
			keys;
		try { // "Class doesn't support Automation" bug in IE8
			if( key === this ) {
				key = '__this__';
			}
		} catch( e ) {
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

		$el = $( el ).each( function( i, el ) {
			var evts = $._data( el, 'events' );
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
			}, this )
		}.bind( this ) )
		
		if( !evtOpts || !evtOpts.silent ) {
			this.trigger( 'unbind:' + key, MK.extend({
				key: key,
				$el: $el,
				el: $el[ 0 ] || null
			}, evtOpts ) );
		}
		
		return this;
	},
	
	/**
	 * @method Matreshka#$el
	 * @summary Returns elements wrapped with jQuery that bound to given property 
	 * @desc After you bound elements to a property you can extract them by using this method.
	 * @param {string} [key] - For which key we want to extract elements. If undefined or null returns elements bound to <code>this</code>.
	 * @returns {jQuery} Bound elements
	 * 
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( 'myKey', '.my-element' );
	 * this.$el( 'myKey' ); // returns $( '.my-element' )
	 * @example <caption>Get element bound to <code>this</code></caption>
	 * this.bindElement( this, '.app' );
	 * this.$el(); // returns $( '.app' )
	 */
	$el: function( key ) {
		key = key === this || !key ? '__this__' : key;
		var keys = key.split( /\s/ ),
			jQ;
		if( keys.length <= 1 ) {
			return key in this.__special ? this.__special[ key ].elements : $();
		} else {
			jQ = $();
			for( var i = 0; i < keys.length; i++ ) {
				jQ = jQ.add( this.__special[ keys[ i ] ].elements );
			}
			return jQ;
		}
	},
	
	/**
	 * @method Matreshka#el
	 * @summary Returns first bound element
	 * @param {string} [key] - For which key we want to extract single element. If undefined or null returns element bound to <code>this</code>.
	 * @returns {(Node|null)} Bound element
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( 'myKey', '.my-element' );
	 * this.el( 'mykey' ); // returns $( '.my-element' )[0]
	 * @example <caption>Get element bound to <code>this</code></caption>
	 * this.bindElement( this, '.app' );
	 * this.$el(); // returns $( '.app' )[0]
	 */
	el: function( key ) {
		return this.$el( key )[ 0 ] || null;
	},
	
	/**
	 * @method Matreshka#$
	 * @summary Finds elements that contained in element that bound to <code>this</code>
	 * @desc After you bind element to <code>this ("__this__")</code> you can use this method for finding elements that contained in bound element.
	 * @param {string} selector
	 * @returns {jQuery}
	 * @example <caption>Basic usage</caption>
	 * this.bindElement( this, '.app' );
	 * this.$( '.my-element' );
	 * // equals to
	 * this.$el().find( '.my-element' );
	 * // equals to
	 * $( '.app' ).find( '.my-element' );
	 */
	$: function( s ) {
		return this.$el().find( s );
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
				getter: function() { return specialProps.value; }
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
	eq: function( object ) {
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
		
		this.makeSpecial( key ).getter = getter.bind( this );
		return this;
	},
	
	/**
	 * @private
	 * @method Matreshka#addDependence
	 * @since 0.0.3
	 * @summary Defines smart getter
	 * @desc {@link Matreshka#addDependence} adds dependence of <code>key</code> from <code>keys</code>. You can use it instead of {@link Matreshka#defineGetter} if you want to listen change:*key* event for given key or bind key to an element.
	 * @param {string} key
	 * @param {string|string[]} keys
	 * @param {function} getter
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
	addDependence: function( key, keys, getter ) {
		var keys = typeof keys === 'string' ? keys.split( /\s/ ) : keys;
		return this
			.set( key, getter.call( this ) )
			.on( keys.join( ':_change ' ) + ':_change', function( evt ) {
				this.set( key, getter.call( this ), {
					silent: evt.silentChangeEvent
				});
			})
		;
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
		var prevVal = this.__special[ key ].value,
			evtObject;

		this.__special[ key ].value = v;
		evtOpts = evtOpts || {};
		
		if( v !== prevVal || evtOpts.triggerAnyway ) {
			this.trigger( '_change:' + key, { // using for changing element state
				silentAllEvent: true,
				silentChangeEvent: evtOpts.silent
			}); 
			
			if( !evtOpts.silent ) {
				evtObject = MK.extend({
					value: v,
					previousValue: prevVal,
					key: key,
					el: this.__special[ key ].elements[ 0 ] || null,
					$el: this.__special[ key ].elements,
					self: this
				}, evtOpts );
				
				this
					.trigger( 'change:' + key, evtObject )
					.trigger( 'change', evtObject )
				;
			}
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
			keys = key.split( /\s/ );
			
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
				delete this[ keys[ i ] ];				
				
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
	 * @param {*} - value
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
		
		if( MK.isXDR ) {
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
		return this.defineNotEnum({
			/**
			 * Instance id
			 * @private
			 * @since 0.0.2
			 * @member {number}
			 */
			__id: this.__id || new Date().getTime() + '' + Math.random(),
			/**
			 * This object contains all events
			 * @private
			 * @member {object}
			 * @todo write documentation for __events and __special
			 */
			__events: this.__events || {},
			/**
			 * This object contains all special values
			 * @private
			 * @member {object}
			 * @todo write documentation for __events and __special
			 */
			__special: this.__special || {}
		});
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
	 * @member {boolean} Matreshka.isXDR
	 * @summary Tells us are we using XDomainRequest hack. In other words, is current browser IE8.
	 */
	isXDR: Class.isXDR,
	
	/**
	 * @member {Array} Matreshka.elementProcessors
	 * @enum {function}
	 * @summary {@link Matreshka.elementProcessors} is the array of functions that compare given element by given rules and returns elementOptions if comparing is successfully. It used for defining elements behavior in {@link Matreshka#bindElement} method without passing third argument.
	 * @example <caption>HTML5 input type=number</caption>
	 * //shift means that we're adding new elementProcessor to the beginning of MK.elementProcessors list
	 * MK.elementProcessors.shift( function( element ) {
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
	 * MK.elementProcessors.shift( function( element ) {
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
	elementProcessors: [],
	
	/**
	 * @member {elementOptions} Matreshka.htmlp
	 * @summary <code>innerHTML</code> element options
	 * @desc By default if you pass html element to {@link Matreshka#bindElement} as second argument that doesn't match any <code>elementProcessor</code>, the binding does nothing. But sometimes you want to change <code>innerHTML</code> without having possibility to retrieve value from the element. {@link Matreshka.htmlp} is created as simple <code>elementOptions</code> object for this case for reducing your code.
	 * @example <caption>Usage</caption>
	 * this.bindElement( 'myKey', '.my-element', MK.htmlp );
	 * // same as
	 * this.bindElement( 'myKey', '.my-element', { // no "getValue" and no "on" property
	 * 	setValue: function( v ) {
	 * 		this.innerHTML = v;
	 * 	}
	 * });
	 */
	htmlp: {
		setValue: function( v ) {
			this.innerHTML = v;
		}
	},
	
	/**
	 * @method Matreshka.classp
	 * @since 0.0.2
	 * @summary <code>className</code> element options function
	 * @desc This function is a shortcut for using existence of element's <code>className</code> as boolean value when you bind it to a property.
	 * @param {string} className
	 * @returns {elementOptions}
	 * @example <caption>Usage</caption>
	 * this.bindElement( 'myKey', '.my-element', MK.classp( 'blah' ) );
	 * // same as
	 * this.bindElement( 'myKey', '.my-element', { // no "getValue" and no "on" property
	 * 	setValue: function( v ) {
	 * 		$( this ).toggleClass( 'blah', v );
	 * 	}
	 * });
	 * this.myKey = true; // adds 'blah' class to '.my-element'
	 * this.myKey = false; // removes 'blah' class from '.my-element'	
	 * @example <caption>Using "!" (not) statement</caption>
	 * this.bindElement( 'shown', '.my-element', MK.classp( '!hide' ) );
	 * // same as
	 * this.bindElement( 'shown', '.my-element', { // no "getValue" and no "on" property
	 * 	setValue: function( v ) {
	 * 		$( this ).toggleClass( 'hide', !v );
	 * 	}
	 * });
	 * this.shown = true; // removes 'hide' class from '.my-element'
	 * this.shown = false; // adds 'hide' class to '.my-element'
	 */
	classp: function( className ) {
		var not = !className.indexOf( '!' );
		if( not ) {
			className = className.replace( '!', '' );
		}
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
		for( var i in o ) if( o.hasOwnProperty( i ) ) {
			f.call( thisArg, o[ i ], i, o );
		}
	}
});

MK.elementProcessors.push( function( el ) {
	if( el.tagName === 'INPUT' && el.type === 'checkbox' ) {
		return {
			on: 'click',
			getValue: function() { return this.checked; },
			setValue: function( v ) { this.checked = v; }
		};
	} else if( el.tagName === 'INPUT' && el.type === 'radio' ) {
		return {
			on: 'click',
			getValue: function() { return this.value; },
			setValue: function( v ) {
				this.checked = this.value == v;
			}
		};
	} else if( el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' ) {
		return {
			on: 'keyup',
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
 * Event name or space-delimited list of event names 
 * @typedef {string} eventNames
 * @example
 * var eventNames = 'change:a change:b fyeah done change:x'
 * this.on( eventNames, function() {} );
 */

 /**
 * <code>elementOptions</code> contains information about how to extract value from an element, how to set value for an element and which element's event we have to listen
 * @typedef {object} elementOptions
 * @property {string} [on] - event name (or space-delimited list of events) which we have to listen
 * @property {function} [getValue] - function that tells how to extract value from an element (context <code>this</code> is given element)
 * @property {function} [setValue] - "How to set value" for an element (context <code>this</code> is given element)
 * 
 * @example
 * var elementOptions = {
 * 	on: 'click',
 * 	getValue: function() { return this.value; } 
 * 	setValue: function( v ) { this.value = v; } 
 * };
 * this.bindElement( 'a', '.my-checkbox', elementOptions );
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
 })( this, this.Class );