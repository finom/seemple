# Matreshka.js Framework  [![GitHub version](https://badge.fury.io/gh/matreshkajs%2Fmatreshka.svg)](https://badge.fury.io/gh/matreshkajs%2Fmatreshka) [![npm version](https://badge.fury.io/js/matreshka.svg)](https://badge.fury.io/js/matreshka)

[![Matreshka Website](http://matreshka.io/img/mk5-logo_full-vert.svg)](http://matreshka.io)

[![Build Status](https://travis-ci.org/matreshkajs/matreshka.svg)](https://travis-ci.org/matreshkajs/matreshka) [![devDependency Status](https://img.shields.io/david/dev/matreshkajs/matreshka.svg)](https://david-dm.org/matreshkajs/matreshka#info=devDependencies)
[![Dependency Status](https://img.shields.io/david/matreshkajs/matreshka.svg)](https://david-dm.org/matreshkajs/matreshka)
[![Issue Stats](http://issuestats.com/github/matreshkajs/matreshka/badge/pr)](http://issuestats.com/github/matreshkajs/matreshka)
[![Issue Stats](http://issuestats.com/github/matreshkajs/matreshka/badge/issue)](http://issuestats.com/github/matreshkajs/matreshka)
[![Coverage Status](https://coveralls.io/repos/github/matreshkajs/matreshka/badge.svg?branch=master)](https://coveralls.io/github/matreshkajs/matreshka?branch=master)
[![Join the chat at https://gitter.im/finom/matreshka](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/matreshkajs/matreshka)



```html
<input class="first-name" type="text">
<input class="last-name" type="text">

<output class="last-name"></output>

<script src="matreshka.min.js"></script>
<script>
var app = new Matreshka();

app.bindNode({
	firstName: 'input.first-name',
	lastName: 'input.last-name',
	fullName: 'output.full-name'
})
.linkProps('fullName', 'firstName lastName', function(firstName, lastName) {
	return firstName + ' ' + lastName;
});

app.firstName = 'Brendan';
app.lastName = 'Eich';

alert(app.fullName);
</script>
```

Matreshka is small and powerful reactive JavaScript framework that allows you to build single page applications as easy as possible.

* Two-way data-bindings in JavaScript files.
* It's simple. Really. You don't need to learn mass of articles to get started.
* Custom architecture. You can choose any way how you build an application.
* [It's fast!](http://mathieuancelin.github.io/js-repaint-perfs/matreshka/index.html)

#### Sponsoring by [Shooju](http://shooju.com)

-----------------------------------

**[Download](https://github.com/finom/matreshka/releases)**

**Install via NPM**
```
npm install --save matreshka
```


**Install via Bower**
```
bower install matreshka
```

**CDN**
```html
<script src="https://cdn.jsdelivr.net/matreshka/latest/matreshka.min.js"></script>
```


-----------------------------------

## Resources
- [Vote for new features](https://trello.com/b/E5KcQESk/matreshka-js-features)
- [The website](http://matreshka.io)
- [Release History](https://github.com/matreshkajs/matreshka/releases)
- [JSDoc files for IDE](https://github.com/matreshkajs/matreshka.io/tree/master/en/jsdoc)
- [TodoMVC](https://github.com/matreshkajs/matreshka_todomvc)
- [Issues](https://github.com/matreshkajs/matreshka/issues)
- [Forum](http://matreshka.io/forum)
- [Twitter](https://twitter.com/matreshkajs)
- [Donate some Bitcoins](https://www.coinbase.com/finom)

**License:** [MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)
