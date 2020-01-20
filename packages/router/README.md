A router for Seemple.js
============

[![npm version](https://badge.fury.io/js/seemple-router.svg)](https://badge.fury.io/js/seemple-router)


[Demo](https://finom.github.io/seemple/router-demo.html#!/foo/bar/baz/)

Installing:
```
npm install seemple-router
```

A bundle (downloadable version) lives at [gh-pages branch](https://github.com/finom/seemple/tree/gh-pages)

# tl;dr

The library turns on two-way data binding between properties and parts of URL.

```js
// location.hash is used there
Seemple.initRouter(object, '/a/b/c/');
object.a = 'foo';
object.b = 'bar';
object.c = 'baz';

// makes location.hash to be #!/foo/bar/baz/
```

If you need to use History API instead of hash, pass ``"history"`` as the second argument.

```js
Seemple.initRouter(object, '/a/b/c/', 'history');
```

CJS module import:

```js
const initRouter = require('seemple-router');
initRouter(object, '/a/b/c/', 'history');
```

--------


How does "traditional" routing works? A developer defines a rule (route) and defines a function which will be called when current path fits given rule.

```js
route("books/:id", id => {
	// do something
});
```

The principle of **seemple-router** is different. You define which part of URL (both [hash](https://developer.mozilla.org/ru/docs/Web/API/Window/location), and [HTML5 History](https://developer.mozilla.org/ru/docs/Web/API/History_API) are supported) need to be synchronized with given property.

Let's say you need to synchronize ``"x"`` with the first part of ``location.hash`` and ``"y"`` with the second.

```js
Seemple.initRouter(object, '/x/y/');
```

Now when you type...

```js
object.x = 'foo';
object.y = 'bar';
```

...``location.hash`` is automatically changed to ``#!/foo/bar/``


And vice versa. When the URL is changed manually or via back and forward buttons, the properties will be changed automatically.

```js
location.hash = '#!/baz/qux/';

// ... after a moment
console.log(object.x, object.y); // ‘baz’, ‘qux’
```

As usually you can listen property changes with [Seemple#on](https://seemple.js.org/#!Seemple-on) method.

```js
Seemple.on(object, 'change:x', handler);
// for Seemple instances: this.on('change:x', handler);
```

## An asterisk syntax

You can pass a string which contain asterisks to ``initRouter`` if you don't need to synchronize some part of the path with a property.

```js
Seemple.initRouter(object, '/x/*/y');
```

If the hash looks like ``#!/foo/bar/baz/``, then ``this.x = "foo"`` and ``this.y = "baz"``.

This feature is useful in cases when classes control different parts of the path.


**class1.js**

```js
Seemple.initRouter(this, '/x/*/');
```

**class2.js**

```js
Seemple.initRouter(this, '/*/y/');
```

## Two things to remember

**1.** If a property has truthy value then URL will be changed immediately after ``initRouter`` call.


```js
object.x = 'foo';

Seemple.initRouter(object, '/x/y/');
```

**2.** If a property gets falsy value then all next listed properties will get ``null`` as new value.

```js
Seemple.initRouter(object, '/x/y/z/u/');

Seemple.y = null; // makes this.z and this.u to be null as well
```

The idea is to get actual state of URL. It could be weird to get ``"z"`` with value ``"foo"`` in case of non-existing bound part of URL.

## HTML5 History API

The plugin supports  HTML5 History as well. To initialize it you need to pass optional argument ``type`` with ``"history"`` value to the ``initRoute`` function (by default ``type`` is ``"hash"``).

```js
Seemple.initRouter(object, 'x/y/z/', 'history');
```

## CommonJS import

If an application is located at CJS environment  (NodeJS, Webpack, Rollup...) then requiring ``seemple-router`` doesn't add any static properties to ``Seemple`` class.

```js
const initRouter = require('seemple-router');
initRouter(object, '/x/y/');
```

``Router`` class import (read below):

```js
const Router = require('seemple-router/router');
const customRouter = new Router('myType');
```

## Additional information

### ``Seemple.Router`` class

**seemple-router** is powered by  ``Seemple.Router`` class. It accepts only one argument - router type (``"hash"``, ``"history"`` or a custom string).

By default, the library creates two instances of ``Seemple.Router`` with types ``hash`` and ``history``. They live at ``Seemple.Router.hash`` and ``Seemple.Router.history``. **seemple-router** uses lazy initialization so when you just attach the script onto webpage, the library does nothing.

For these two types of instances the singleton pattern is used. That means when you're trying to create another instance of ``hash`` routing via ``new Seemple.Router('hash')``, the ``Seemple.Router.hash`` will be returned instead of new instance creation. This logic centralizes URL handling, gives positive effect to the performance and doesn't make potential collisions. Objects which are handled by ``initRouter`` just subscribe to the changes of needed type of the router.

Custom instances (non-hash and non-history) of ``Seemple.Router`` can be created manually in case if you generate URL for further use. At this case changes of target properties don't affect on ``hash`` and don't call ``pushState``.

#### Properties

``Seemple.Router`` instances has 3 properties.

- ``path`` - contains actual URL, eg ``/foo/bar/baz/``.
- ``hashPath`` - contains actual URL and hashbang as a prefix, eg ``#!/foo/bar/baz/``
- ``parts`` - contains an array of all parts of the path, eg ``[‘foo’, ‘bar’, ‘baz’]``.

All these properties are created using [calc](https://seemple.io/#!Seemple-calc), which means when you change one property, the others are changed automatically.

```js
Seemple.Router.hash.path = '/foo/bar/baz/';
```

By changing these properties you can trigger needed procedures (update the path, change subscribed objects etc.)

#### Methods

- ``subscribe(object, route)`` - subscribes object for route changes.
- ``init()`` - used for lazy initialization in  ``subscribe`` method (no need to call it manually).

```js
const customRouter = new Seemple.Router('myType');
const object = {
	a: 'foo',
	b: 'bar'
};

customRouter.subscribe(object, '/a/b/');

console.log(customRouter.path); // /foo/bar/
```
