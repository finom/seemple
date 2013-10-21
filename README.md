# Matreshka v0.0.2

[Download](https://github.com/finom/matreshka/archive/0.0.2.zip)

Matreshka - is the client-side Javascript framework that allows you to build your application a new way. The main advantages of Matreshka are:
* binding of DOM elements to the data
* model events
* Pub/Sub pattern
* improved data types (MK.Array and MK.Object)

Forget that you have a UI, because it changes automatically when the data changes.

## Getting started
#### Plug in Matreshka to your app

```html
<script src="build/matreshka.all.min.js"></script>
<!-- that's all -->
```

#### Matreshka (main class) using

`js
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

## Documentation
[Matreshka](http://finom.github.io/matreshka/docs/Matreshka.html)

[MK.Object](http://finom.github.io/matreshka/docs/Matreshka.Object.html)

[MK.Array](http://finom.github.io/matreshka/docs/Matreshka.Array.html)

## [Release History](https://github.com/finom/matreshka/releases)

------------------------------------
[**Issues**](https://github.com/finom/matreshka/issues)

**Author:** Andrey Gubanov <a@odessite.com.ua>

**License:** [MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)

**Support/Discussion**: [ENG](https://groups.google.com/forum/#!forum/matreshkajs), [RUS](https://groups.google.com/forum/#!forum/matreshkajs-rus)






