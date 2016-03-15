Contributing
=======
Bug fixes and performance improvements are always welcome!

If you want to add some new feature please, [create an issue](https://github.com/finom/matreshka/issues) and tell about the feature you're going to add. I appreciate any activity but it's not possible to include to Matreshka everything users want.

It would be nice if you can show a proof-of-concept on JSBin, JSFiddle or CodePen. If you're going to add new method, use prototype-based extension.
```js
Matreshka.prototype.someCoolMethod = function() {
	alert('I am new cool method');
};
```

If you are going to implement something presented on [Trello board](https://trello.com/b/E5KcQESk/matreshka-js-features), please create an issue as well. After that, a given card will be moved to the "Todo" list.



Config AMD library
------
To run development version of Matreshka you need to use [require.js](http://requirejs.org/) or similar AMD library.
```js
requirejs.config({
	paths: {
	matreshka_dir: 'src',
        matreshka: 'src/amd-modules/matreshka',
        bquery: 'src/amd-modules/bquery',
        xclass: 'src/amd-modules/xclass',
	}
});
```

Get Matreshka variables
-------
```js
require(['matreshka', 'bquery', 'xclass'], function(MK, $, Class) {
	// ...
});
```

ECMAScript 2015 way
```js
import {Matreshka as MK, bquery as $} from 'matreshka';
```

Or
```js
import MK from 'matreshka';
import $ from 'bquery';
```

Task runner
-------
Matreshka uses [Grunt](http://gruntjs.com/) as task runner, so you need to install it globally first (after nodejs and npm, of course).
```
npm install -g grunt-cli
```
The next step is installing needed dependencies.
```
npm i
```

Test
------
If you want to fix some issue you need to run unit tests first before making pull request.

If you going to add new feature (eg some cool method), you need to create tests that cover your feature.

Please, take a look at [/test/README.md](/test/README.md) for more info about testing.


JSLint
------
After the tests are passed you need to run [JSLint](http://www.jslint.com/) that checks the quality of your code.
```
grunt jslint
```

Build
------
For building the project you need to run default Grunt task.
```
grunt
```
