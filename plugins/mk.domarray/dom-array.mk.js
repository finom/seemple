"use strict";
// experimental stuff, not using in GPS yet, maybe will be in Updata2
MK.DOMArray = Class({
	'extends': MK.Array,
	initMK: function() {
		MK.DOMArray.parent.initMK( this );
		return this
			.set({
				_id: 'DC' + Math.random()
			})
			.on( 'push', function( evt ) {
				if( evt ) {
					for( var i = this.length - evt.arguments.length; i < this.length; i++ ) {
						this.doItem( this[ i ] ).$el( this._id ).appendTo( this.$el() );
					}
				}
			})
			.on( 'pop', function( evt ) {
				if( evt && evt.returns ) {
					evt.returns.$el( this._id ).remove()
					this.killItem( evt.returns );
				}
			})
			.on( 'unshift', function( evt ) {
				if( evt ) {
					for( var i = evt.arguments.length - 1; i + 1; i-- ) {
						this.doItem( this[ i ] ).$el( this._id ).prependTo( this.$el() );
					}
				}
			})
			.on( 'shift', function( evt ) {console.log( evt.returns )
				if( evt && evt.returns ) {
					evt.returns.$el( this._id ).remove()
					this.killItem( evt.returns );
				}
			})
			.on( 'sort reverse', function() {
				for( var i = 0; i < this.length; i++ ) {
					this[ i ].$el( this._id ).appendTo( this.$el() );
				}
			})
			.on( 'splice _initialize', function() {
				for( var i = 0; i < this.length; i++ ) {
					this.doItem( this[ i ] ).$el( this._id ).appendTo( this.$el() );
				}
			})
		;
	},
	doItem: function( item ) {
		var _id = this._id,
			el,
			$el;
			
		if( !item[ _id ] ) {
			item[ _id ] = this;
		}

		if( this.renderer ) {
			if( !item.el( _id ) ) {
				$el = $( this.renderer( item ) );
				el = $el[ 0 ];
				item.bindElement( _id, el );
				item.trigger( 'render', {
					el: el,
					$el: el
				});
			}
		}
		
		return item;
	},
	killItem: function( item ) {
		var _id = this._id;
		return item	
			.unbindElement( _id )
			.remove( _id, {
				silent: true
			})
		;
	}
});