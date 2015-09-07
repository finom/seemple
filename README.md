# Matreshka v1.0.7

[![Matreshka Website](http://matreshka.io/img/mk5-logo_full-vert.svg)](http://matreshka.io)

### [Download](https://github.com/finom/matreshka/releases)

[![Join the chat at https://gitter.im/finom/matreshka](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/finom/matreshka) 

```html
<script src="matreshka.min.js"></script>
<input type="text" class="my-input">
<script>
var app = new Matreshka;
app.bindNode( 'x', '.my-input' );
app.x = 'Two-way data binding in JS? O rly?';
</script>
``` 

Matreshka - is small and powerful client-side JavaScript framework that allows you to build single page applications as simply as possible.

* Two-way data-bindings in JavaScript files. No more {{weird.syntax}} inside HTML.
* It's simple. Really. You don't need to learn mass of articles to get started.
* Custom architecture. You can choose any way how you build an application.

## [Release History](https://github.com/finom/matreshka/releases)

## Todo
* Fire ``remove`` and ``modify`` when data key is removed from ``Matreshka.Object`` instance (``remove``, ``removeDataKeys``)
* ``force`` flag for ``Matreshka.Array`` events
* ``Matreshka#off`` for delegated DOM events with specified selector
* Refactor ``Matreshka#_on`` and ``Matreshka#_off`` methods
* Remove event after handler call in ``Matreshka#once``
* ``binder.destroy`` member that calls when ``Matreshka#unbindNode`` is called
* ``private`` global event flag that makes event to be silent for delegated handlers
* Fire ``remove`` event on data remove for ``Matreshka.Object``
* Export Matreshka using ES6 syntax
* ``Matreshka.to`` - converts JS object to Matreshka instance
* Some way to get parents from delegated Matreshka events
* ``this.bound.key`` instead of ``this.bound('key')`` as alternative
* Automated testing
* Comment every part of code
* Matreshka.Array.of
* Matreshka.Array.from
* ``getValue`` member for one-way data binders from ``Matreshka.binders``

**Maybe will be added in next versions**
* ``toJSONString`` method
* ``bindSandbox`` method which accepts single argument + event options


------------------------------------

## Resources
[**The website**](http://matreshka.io)

[**JSDoc files for IDE**](https://github.com/finom/matreshka_docs)

[**TodoMVC**](https://github.com/finom/matreshka_todomvc)

[**Issues**](https://github.com/finom/matreshka/issues)

[**Twitter**](https://twitter.com/matreshkajs)

[**Readme in Russian**](https://github.com/finom/matreshka/blob/master/README-ru.md)

**Author:** Andrey Gubanov <a@odessite.com.ua>

**License:** [MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)



