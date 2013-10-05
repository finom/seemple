DOES NOT WORK ON WINDOWS
====
Many people are having problems getting this module to work on windows. The
failure has to do with building contextify on window. It seems to be a windows
environment issue. I don't have access to a windows machine so I cannot explore
working through the windows install process. If you figure out how to build
[contextify](https://github.com/brianmcd/contextify) on windows please send me working instructions!

NPM module jQuery is an EnderJS package. 
====
please use `npm install jquery` not `npm install jQuery`


node-jQuery
====

A stupid-simple wrapper over jQuery for  Node.JS (server). Currently 1.7.2.

Node.JS
---
```
    npm install jquery

    var $ = require('jquery');
```

Examples
---
```javascript
    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());
```

In Node.JS you may also create separate window instances

```javascript
    var jsdom = require('jsdom').jsdom
      , myWindow = jsdom().createWindow()
      , $ = require('jquery')
      , jq = require('jquery').create()
      , jQuery = require('jquery').create(myWindow)
      ;

    $("<h1>test passes</h1>").appendTo("body");
    console.log($("body").html());

    jq("<h2>other test passes</h2>").appendTo("body");
    console.log(jq("body").html());

    jQuery("<h3>third test passes</h3>").appendTo("body");
    console.log(jQuery("body").html());
```

Output:

```html
    <h1>test passes</h1>
    <h2>other test passes</h2>
    <h3>third test passes</h3>
```

JSONP Example
----

```javascript
    var $ = require('jquery');

    $.getJSON('http://twitter.com/status/user_timeline/treason.json?count=10&callback=?',function(data) {
      console.log(data);
    });
```

