Contribution
=======


Config AMD library
------
To run matreshka development source you need to use [require.js](http://requirejs.org/) or similar AMD library.
```js
requirejs.config({
	paths: {
		matreshka_dir: 'matreshka/src',
		matreshka: 'matreshka/src/matreshka',
		balalaika: 'matreshka/src/matreshka',
		xclass: 'matreshka/src/matreshka',
	}
});
```

Get Matreshka variables
-------
```js
require(['matreshka', 'balalaila', 'xclass'], function(MK, $, Class) {
	// ...
});
```

ECMAScript 2015 way
```js
import {Matreshka as MK, balalaika as $} from 'matreshka';
```

Or
```js
import MK from 'matreshka';
import $ from 'balalaika';
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
