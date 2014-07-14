# Matreshka v0.2
### [Download](https://github.com/finom/matreshka/releases)
[![Matreshka Website](http://finom.github.io/img/mk-logo-colour.svg)](http://finom.github.io/matreshka)


Matreshka - is the small and powerful client-side Javascript framework that allows you to build your applications a new way. The main advantages of Matreshka are:
* Data-DOM bindings
* Firing events when data changes
* Improved data types (Matreshka.Array and Matreshka.Object)

Forget that you have an UI, because it changes automatically when the data changes!

## Getting started
#### Plug in Matreshka to your app
More info about how to attach Matreshka to your page you can find on [documentation](http://finom.github.io/matreshka/docs/)
```html
<script src="js/jquery.js"></script>
<script src="js/matreshka.min.js"></script>
```

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
* **.toString** method doesn't work (fixable)
* **MK.Object**: **for..in** cycle works buggy because of restriction of **Object.defineProperty** in IE8. Use **.each** method instead


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

## Todo
* **MK.Object#renderer** method (overrides MK.Array#itemRenderer)
* **Lazy initialization.** No need to run **.initMK** method
* v1.0 - Screw Internet Explorer 8. IE8 Support Ends April 8, 2014.
* CSS selectors for DOM events
	```js
	this.on( 'click::something(.x > .y)' )
	```
* Allow to render regular objects using **MK.Array#itemRenderer**

------------------------------------

[**Issues**](https://github.com/finom/matreshka/issues)

[**Website**](http://finom.github.io/matreshka/)

**Author:** Andrey Gubanov <a@odessite.com.ua>

**License:** [MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)

**Support/Discussion**: [ENG](https://groups.google.com/forum/#!forum/matreshkajs), [RUS](https://groups.google.com/forum/#!forum/matreshkajs-rus)




