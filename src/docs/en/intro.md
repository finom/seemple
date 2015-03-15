## [Introduction](#introduction)
Matreshka is a framework for massive and endlessly extending applications (within the Universe, of course), written in JavaScript. It allows you to build the program architecture so that neither your team nor you can get confused in plentiful entities, debugging logic described in the HTML file, numerous restrictions of other frameworks and incomprehensible abstractions.

Two-way data binding are implemented by [bindNode](#Matrashka-bindNode) method only and it does not require to change HTML, adding weird {% raw %}{{syntactic.constructions}}{% endraw %}. Having set a few rules, a programmer can continue to work with data and forget about the state of the visible part of the application.

> The order is not important, you can declare binders after the complete implementation of logic which is responsible for the data.

In Matreshka the collections are represented by [Matreshka.Array](#Matreshka.Array) class, whose instances themselves render HTML while adding, deleting and changing inner elements. You can say that the framework X renders elements of array too, but in Matreshka this issue is resolved very simply and elegantly.


Коллекции в Матрешке представлены классом [Matreshka.Array](#Matreshka.Array), экземпляры которого сами рендерят HTML при добавлении, удалении или изменении элементов. Вы можете сказать, что фреймворк X тоже отрисовывает элементы массива при изменении данных, но в Матрешке эта задача решается невероятно просто и элегантно.

Additionally, Matreshka is a framework which is very easy for understanding. Any developer, from a beginner who can write simple things in JavaScript to an experienced ninja, will handle it without any problems.

Today is the year [[script]]document.write(new Date().getFullYear());[[/script]] and it means that finally the time has come for the framework without any restrictions, strict rules or doubtful syntax. It is the time when you control the framework and not the reverse!


=======
## [Getting started](#getting-started)
All popular frameworks include lots of convenient and interesting functions. The problem is that it is difficult for a beginner to understand where to start his training. A great number of functional possibilities of a given framework leads us to the reasonable question "Hey, do I have to learn all that?"


This defect has been resolved in this documentation. To start working with the framework confidently, you should study the classes, properties and methods flagged as important [[i class="important"]][[/i]] (there are a little more than ten of them). Next, if you wish, you can gradually proceed to master the other methods which add the magic you couldn't even dream of into your JavaScript code.


> This page can't do without the fantastic possibilities of HTML5. It is available offline for any device whether it is your  computer or a mobile  phone.

> **Chrome for Android**: enter the menu and click  "Add to home screen"

> **Safari for iOS**: tap on the icon "Action" and choose "Add to Home Screen"

> **Any other devices**: just bookmark the page

> Now the documentation to Matreshka can be read without the Internet connection. If the page lags (noticed in Android 4.2), switch over to the mode "By one".

=======
## [Hello World!](#hello-world)
Writing your first application is very easy. You should:


**1\.** Create an HTML file with the following content

```html
<!DOCTYPE html>
<html>
	<head>
		<title>My first Matreshka application</title>
	</head>
	<body>
		<input type="text" class="my-input">
		<div class="my-output"></div>
		<script src="http://cdn.jsdelivr.net/matreshka/latest/matreshka.min.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>
```


**2\.** Write your first class which inherits Matreshka creating the file **js/app.js**

```js
var Application = Class({
	'extends': Matreshka,
	constructor: function() {
	
		// bind the property x and the text field
		this.bindNode( 'x', '.my-input' );
		
		// bind the property x and the block with the class "my-output"
		this.bindNode( 'x', '.my-output', {
			setValue: function( v ) {
				this.innerHTML = v;
			}
		});
		
		// if the property "х" has changed, inform about it in the console
		this.on( 'change:x', function() {
			console.log( 'x changed to ' + this.x );
		});
	}
});

var app = new Application();
```


**3\.** That's it!

Now you can open the developer's console (by pressing F12) and write:
```js
app.x = 'Hello World!';
```
Cool, isn't it? Now you can work with the properties directly without any weird encapsulations.

> Matreshka uses the object-oriented approach based on the classes which are acknowledged to be the best in most programming languages such as Python, C#, Java and many others. This solution allows to easily change over to new possibilities of JavaScript syntax described in the ECMAScript 2015 specs which supported by Matreshka out of the box. [Babel](http://babeljs.io/) let us make use of the cool new generation JS syntax today.
```js
class Application extends Matreshka {
	constructor: function() {
		this.bindNode( 'x', '.my-input' );
		this.bindNode( 'x', '.my-output', {
			setValue: function( v ) {
				this.innerHTML = v;
			}
		});
		this.on( 'change:x', function() {
			console.log( 'x changed to ' + this.x );
		});
	}
}
```

[Live example](http://jsbin.com/xotehu/1/edit?js,output) (click on "Run with JS", to launch it)

#### Links
* [Matreshka Class](#Matreshka)
* [Matreshka#bindNode method](#Matreshka-bindNode)
* [Matreshka#on method](#Matreshka-on)
* [Class function](#Class)

=======
## [TodoMVC](#todomvc)
The most effective way to understand if it is worth studying the library or  the framework is known to be the code. The project [TodoMVC](http://todomvc.com/) joins a score of frameworks letting us compare them through the example of one and the same application.

![TodoMVC](img/todomvc.png)

Look at the [working implementation of TodoMVC](todo/) on the base of Matreshka and then [take a glance over the source code with annotations](todo/js/docs/app.html). Looks very easy, doesn't it?

=======
## [How to plug it in?](#how-to-include)
Matreshka is an independent framework that requires no dependencies. But the possibility of using capabilities from the ECMAScript5 standard in the Internet Explorer 8 is absent. That's why if you support the IE8 in the apps which you develop, you should add another JavaScript file: [es5-shim](https://github.com/es-shims/es5-shim) or any other polyfill that implements the possibilities of the ECMAScript5.

Adding jQuery is optional for all browsers (though, it's recommended for IE8). Instead of this one, you can use another jQuery-like library, for example  [Zepto](http://zeptojs.com/). If you don't want to use any libraries at all, giving preference to [Vanilla.js](http://vanilla-js.com/), Matreshka will make use of the built-in micro-library which is called [Balalaika]($b).


```html
<!-- Required for для IE8 -->
<script src="js/es5-shim.min.js"></script> 
<script src="js/matreshka.min.js"></script>
```

Besides, Matreshka supports AMD (require.js or almond)
```js
require(['path/to/matreshka'], function(Matreshka) {
	//...
});
```

Import in the style of ECMAScript 2015 (using [Babel](http://babeljs.io/))
```js
import Matreshka from 'path/to/matreshka';
```