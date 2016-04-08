# Testing
There are few ways to run unit tests.

The first is running Karma test runner (from the root of the repo) via Karma CLI:
```
karma start test/karma.conf.js
```

The second is direct browser testing. At this case you need to get Babel preprocessor installed. Run:
```
babel test/src --watch --out-dir test/js
```

And open ``SpecRunner.html`` file using any browser.


The third way is using Grunt
```
grunt test
```

The same grunt task runs every time when you're making a build:
```
grunt
```
