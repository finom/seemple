# Matreshka v0.1
### [Download](https://github.com/finom/matreshka/releases)
[![Matreshka Website](http://finom.github.io/img/mk-logo-colour.svg)](http://finom.github.io/matreshka)



Matreshka - is the small (25KB uncompressed, 8KB gzipped) client-side Javascript framework that allows you to build your application a new way. The main advantages of Matreshka are:
* DOM-data bindings
* Events of data change
* Improved data types (MK.Array and MK.Object)

Forget that you have a UI, because it changes automatically when the data changes.

## Getting started
#### Plug in Matreshka to your app

```html
<!-- Latest version of jQuery 1.X or 2.X -->
<script src="js/jquery.js"></script>
<script src="js//matreshka.min.js"></script>
<!-- that's all -->
```
(more info about how to attach Matreshka to your page ou can find in [documentation](http://finom.github.io/matreshka/docs/))

#### Matreshka (main class) using

```js
var mk = new MK;

mk.bindElement( 'myKey', '.my-element' ); // you just bound element to your key "myKey"

mk.on( 'change:myKey', function() {
	alert( 'yeah' );
});

mk.myKey = 5; // changes DOM element (".my-element") and alerts "yeah"
```

#### Matreshka.Object (inherits Matreshka) using

```js
var mkObject = new MK.Object({
	a: 3,
	b: 4
});

mkObject.bindElement({
	a: '.a-element',
	b: '.b-element'
});

mkObject.on( 'modify', function() {
	alert( 'yeah' );
});

mkObject.a = 5; // changes DOM element (".a-element") and alerts "yeah"

console.log( mkObject.toJSON() ); // logs { a:5, b:4 }
```

#### Matreshka.Array (inherits Matreshka) using
```js
mkArray = new MK.Array( 1, 2, 3, 4 );

mkArray.on( 'push', function() {
	alert( 'yeah' );
});

mkArray.push( 5 ); // adds 5 to the end of given array and alerts "yeah"

console.log( mkArray.toString() ); // logs "1,2,3,4,5"
```

Cool?

[More live examples](http://finom.github.io/matreshka/examples/)

## [Documentation](http://finom.github.io/matreshka/docs/)

## Known issues in Internet Explorer 8
**All classes**: **.toString** method doesn't work (fixable)
**MK.Object**: **for..in** cycle works buggy because of restriction of **Object.defineProperty** in IE8. Use **.each** method instead


## Known issues because of Internet Explorer 8
These bugs will be fixed in Matreshka v1.0 when IE8 support will be removed
**MK.Array**: Standard iterators (.forEeach, .map, .some) takes native array as third callback's element.
For example
```js
var array = new MK.Array( 1, 2, 3, 4, 5 );
array.forEach( function( item, index, self ) {
	alert( array === self ); // false
});
```

## [Release History](https://github.com/finom/matreshka/releases)

## Roadmap
* v0.2 MK.Array Model property (very close to Backbone style)
* v0.2 MK.Object renderer method (overrides MK.Array#itemRenderer for that item)
* v0.2 Lazy initialization. No need to run **.initMK** method
* v0.2 Optimize methods speed
	* bound
* v1.0 Screw Internet Explorer 8. IE8 Support Ends April 8, 2014.
* Do defineSetter method
* New event engine 
	* evt.stopEventsChain method
	* evt.type property
	* Event of change collection item
	* CSS selectors for DOM events
	```js
	this.on( 'click::something(.x > .y)' )
	```
* Optimize code for minifier
* Allow to render regular objects using MK.Array#itemRenderer
* Improve addDependence method to make possible to add dependence between other instances keys (not only current instance key)
* Somehow add same event handler for few instances
* ~~Allow to use numbers in MK.Object#**addJSONKeys** and MK.Object#**removeJSONKeys**~~
* ~~Return removed element from MK.Array#pop and MK.Array#shift methods~~
* ~~Do nothing if undefined is passed to MK.Object#**addJSONKey**s and MK.Object#**removeJSONKeys** (now throws error)~~
* ~~Remove jQuery dependence (create mQuery(?))~~
* ~~Use element as **this** in MK.elementProcessors functions~~
* ~~Merge **MK.DOMArray** with **MK.Array**~~
* ~~Listen **'keyup'** event for checkboxes/radios (if keyboard is using) (MK.elementProcessors)~~`
* ~~Listen **'paste'** event for input[type="text"] and textarea (MK.elementProcessors)~~
* ~~Create MK#**addDependence** method~~
```js
mk.addDependence( 'perimeter', 'a b', function() { return ( this.a + this.b ) * 2} );
mk.addDependence( 'a', 'perimeter b', function() { return this.perimeter/2 - this.b } );
mk.addDependence( 'b', 'perimeter a', function() { return this.perimeter/2 - this.a } );
```

* ~~Make possible to add DOM events like so:~~
```js
mk.on( 'click::myKey', f );
// Instead of
// mk.$el( 'myKey' ).on( 'click', f.bind( this ) );
```



------------------------------------

[**Issues**](https://github.com/finom/matreshka/issues)

[**Website**](http://finom.github.io/matreshka/)

**Author:** Andrey Gubanov <a@odessite.com.ua>

**License:** [MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)

**Support/Discussion**: [ENG](https://groups.google.com/forum/#!forum/matreshkajs), [RUS](https://groups.google.com/forum/#!forum/matreshkajs-rus)








