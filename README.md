# Matreshka
Matreshka - is the client-side Javascript framework that allows you to build your application a new awesome way. The main advantages of Matreshka: binding DOM elements to data, mode events, improved data types (MK.Array and MK.Object). You will forget that you have a UI, because it will change when the data changes. Work only with the model!

## Getting started
#### Plug in Matreshka to your app
```html
<script src="build/js/matreshka.all.min.js"></script>
<!-- that's all -->
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

## Documentation
[Matreshka documentation](http://finom.github.io/matreshka/docs/Matreshka.html)

[MK.Object documentation](http://finom.github.io/matreshka/docs/Matreshka.Object.html)

[MK.Array documentation](http://finom.github.io/matreshka/docs/Matreshka.Array.html)


## Author
Andrey Gubanov
<a@odessite.com.ua>

## License
[MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)

#### [Issues](https://github.com/finom/matreshka/issues)

#### [Release History](https://github.com/finom/matreshka/releases)

#### Support/Discussion
[Google Group (ENG)](https://groups.google.com/forum/#!forum/matreshkajs)

[Google Group (RUS)](https://groups.google.com/forum/#!forum/matreshkajs-rus)

