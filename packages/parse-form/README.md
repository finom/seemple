# seemple-parse-form [![npm version](https://badge.fury.io/js/seemple-parse-form.svg)](https://badge.fury.io/js/seemple-parse-form)

The function binds named HTML form fields (input, select, textarea, etc.) in a given HTML form to their corresponding properties.

```html
<form class="my-form">
    <input type="text" value="foo" name="x">
</form>
```

```js
const object = {};
parseForm(object, '.my-form');

// ...
console.log(object.x); // 'foo'
object.x = 'bar'; // changes input value to 'bar'
```

## Usage

In **browser environment** (or whatever environment where ``Seemple`` is global variable)  ``Seemple`` is extended.
```html
<script src="path/to/seemple-parse-form.min.js"></script>
```

```js
Seemple.parseForm(object, form);
```

The bundle can be downloaded at [gh-pages branch](https://github.com/finom/seemple/tree/gh-pages)

-------------

In **CJS environment** ``Seemple`` is not extended.

```
npm install seemple-parse-form
```

```js
const parseForm = require('seemple-parse-form');
```


## API

The function accepts 4 arguments:
- ``object`` - an object (required)
- ``form`` - a selector, DOM node, etc. of the given form (custom selectors ``:sandbox`` and ``:bound(XXX)`` also acceptable) (required)
- ``callback`` - a function which will be called on every found field; accepts field name and field element itself
- ``eventOptions`` - event options which will be passed to every internal call of ``bindNode``.

Returns: parsed form element.


The third argument is useful when ``parseForm`` is used with ``Seemple.Object``: you can call ``addDataKeys`` method there.
```js
const form = parseForm(this, ':sandbox .foo', key => this.addDataKeys(key), {
    getValueOnBind: false
});
```
