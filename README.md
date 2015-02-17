# Matreshka v0.3 (transitional)

[![Matreshka Website](http://i.imgur.com/hVEuu0o.png)](http://matreshka.io)

**As we move to 1.0 release matreshka website is under development. We apologize for it.**

[Check out docs in Russian](http://ru.matreshka.io)

### [Download](https://github.com/finom/matreshka/releases)

```html
<script src="matreshka.min.js"></script>
<input type="text" class="my-input">
<script>
var app = new Matreshka;
app.bindNode( 'x', '.my-input' );
app.x = 'Two-way data binding in JS? O rly?';
</script>
```

Matreshka - is the small and powerful client-side JavaScript framework that allows you to build your applications as simply as possible.

* Two-way data-bindings in JavaScript files. No more {{weird.syntax}} which brokes your HTML.
* It's simple. Really. You don't need to learn mass of articles to get started.
* Custom architecture. You can choose any way how you build your application.

## [Release History](https://github.com/finom/matreshka/releases)

## Todo
* Remove all deprecated code (v1.0)
* Fire ``remove`` and ``modify`` when data key is removed from ``Matreshka.Object`` instance (``remove``, ``removeDataKeys``)
* ``force`` flag for ``Matreshka.Array`` events
* ``Matreshka#off`` for delegated DOM events with specified selector
* Refactor ``Matreshka#_on`` and ``Matreshka#_off`` methods
* Remove event after handler call in ``Matreshka#once``
* ``binder.destroy`` member that calls when ``Matreshka#unbindNode`` is called
* ``private`` global event flag that makes event to be silent for delegated handlers
* Fire ``remove`` event on data remove for ``Matreshka.Object``
* Export Matreshka using ES6 syntax


**Maybe will be added in next versions**
* ``Matreshka.toMatreshka`` - converts JSON-able object to Matreshka instance
* Some way to get parents from delegated Matreshka event
* ``toJSONString`` method
* ``bindSandbox`` method which accepts single argument + event options
* ``sandbox`` and ``$sandbox`` that contain sandbox element

------------------------------------

[**Issues**](https://github.com/finom/matreshka/issues)

[**Website**](http://matreshka.io)

**Author:** Andrey Gubanov <a@odessite.com.ua>

**License:** [MIT License](https://raw.github.com/finom/matreshka/master/LICENSE)



