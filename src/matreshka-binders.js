"use strict";
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
})( Matreshka );