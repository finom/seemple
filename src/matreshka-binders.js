"use strict";
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define( [ 'matreshka_dir/matreshka-core' ], factory );
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