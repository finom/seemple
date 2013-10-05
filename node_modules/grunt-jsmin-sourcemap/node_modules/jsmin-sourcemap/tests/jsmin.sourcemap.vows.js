// Basics for testing
var fs = require('fs'),
    assert = require('assert'),
    jsmin = require('../lib/jsmin.sourcemap.js'),
    testFilesDir = __dirname + '/test_files',
    expectedDir = __dirname + '/expected_files';

// Reverse test items
var sourcemap = require('source-map'),
    charProps = require('char-props'),
    SourceMapConsumer = sourcemap.SourceMapConsumer;

// Define all of the commands that a test will use
module.exports = {
  // Set up for jQuery constants
  "jQuery": function jQueryPaths () {
    var info = {
      'paths': {'src': 'jquery.js', 'dest': 'jquery.min.js'}
    };
    return info;
  },
  // Set up for jQuery and _ constants
  "jQuery and Underscore": function jQueryAnd_Paths () {
    var info = {
      'paths': {'src': ['jquery.js', 'underscore.js'], 'dest': 'jqueryAndUnderscore.min.js'},
      'breaks': [141405]
    };
    return info;
  },
  // Set up for multiple file constants
  "Multiple files": function multiPaths () {
    var info = {
      'paths': {'src': ['1.js', '2.js', '3.js'], 'dest': 'multi.js'},
      'breaks': [52, 70]
    };
    return info;
  },
  "Multiple nested files": function () {
    var info = {
      'paths': {
        'src': [
          'nested.js',
          'nested/controllers/controller1.js',
          'nested/controllers/controller2.js',
          'nested/models/model1.js'
        ],
        'dest': 'nested.min.js'
      },
      'breaks': [1, 43, 88, 100]
    };
    return info;
  },
  // Generate minified code and source map (for single file)
  "minified and sourcemapped (single)": function (info) {
    // Localize the src and dest
    var filePaths = info.paths,
        src = filePaths.src,
        dest = filePaths.dest;

    // Read in the src file
    var singleSrc = fs.readFileSync(testFilesDir + '/' + src, 'utf8'),
        actualSingle = jsmin({'code': singleSrc, 'src': src, 'dest': dest}),
        expectedSingleCode = fs.readFileSync(expectedDir + '/' + dest, 'utf8');

    // Save to the code namespace
    info.code = {
      'input': [{'src': src, 'code': singleSrc}],
      'actual': actualSingle.code,
      'actualMap': actualSingle.sourcemap,
      'expected': expectedSingleCode
    };

    // Return info
    return info;
  },
  // Generate minified code and source map (for multiple files)
  "minified and sourcemapped (multi)": function (info) {
    // Localize the src and dest
    var filePaths = info.paths,
        src = filePaths.src,
        dest = filePaths.dest;

    // Read in the src files
    var srcFiles = src.map(function (filepath) {
      var fileSrc = fs.readFileSync(testFilesDir + '/' + filepath, 'utf8'),
          retObj = {
            'code': fileSrc,
            'src': filepath
          };
      return retObj;
    });

    var actualMulti = jsmin({'input': srcFiles, 'dest': dest}),
        expectedMultiCode = fs.readFileSync(expectedDir + '/' + dest, 'utf8');

    // Save to the code namespace
    info.code = {
      'input': srcFiles,
      'actual': actualMulti.code,
      'actualMap': actualMulti.sourcemap,
      'expected': expectedMultiCode
    };

    // Return info
    return info;
  },
  "is debuggable": function (info) {
    var actualCode = info.code.actual;
    fs.writeFileSync('debug.min.js', actualCode, 'utf8');
  },
  "_is debuggable": function (info) {
    return info;
  },
  // Compare minified code to gcc'd counterpart
  "matches its C-minified counterpart": function (info) {
    var code = info.code,
        paths = info.paths,
        srcPaths = JSON.stringify(paths.src);
    assert.strictEqual(code.actual, code.expected, 'Minified ' + srcPaths + ' does not match ' + paths.dest);
  },
  // Generate charProps from sourcemap
  "mapped against its source": function (info) {
    // Localize code items
    var code = info.code,
        input = code.input,
        actual = code.actual,
        actualMap = code.actualMap;

    // Iterate over the input
    var srcPropMap = {};
    input.forEach(function (item) {
      var src = item.src,
          code = item.code;
      srcPropMap[src] = charProps(code);
    });

    // Generate a consumer and charProps lookups
    info.props = {
      'consumer': new SourceMapConsumer(actualMap),
      'actualProps': charProps(actual),
      'srcPropMap': srcPropMap
    };

    // Return the info
    return info;
  },
  // Assert that each character reverse maps back to its same character
  "matches at all positions": function (info) {
    // Localize test items
    var srcCode = info.code.src,
        actualCode = info.code.actual,
        props = info.props,
        consumer = props.consumer,
        actualProps = props.actualProps,
        srcPropMap = props.srcPropMap,
        breaks = info.breaks || [];

    // Iterate over each of the characters
    var i = 0,
        len = actualCode.length;
    for (; i < len; i++) {
      // Look up the position of our index
      var actualPosition = {
        'line': actualProps.lineAt(i) + 1,
        'column': actualProps.columnAt(i)
      };

      // Grab the position of the item and its fil
      var srcPosition = consumer.originalPositionFor(actualPosition),
          srcFile = srcPosition.source;

      // If we have a source file and we are not at a break spot
      var atBreakSpot = breaks.indexOf(i) > -1;
      if (srcFile && !atBreakSpot) {
        // Grab the srcProps for it
        var srcProps = srcPropMap[srcFile];

        // Lookup the character at the src positions
        var srcLine = srcPosition.line - 1,
            srcCol = srcPosition.column,
            srcChar = srcProps.charAt({
              'line': srcLine,
              'column': srcCol
            });

        // Assert that the actual and expected characters are equal
        var actualChar = actualCode.charAt(i);
        assert.strictEqual(actualChar, srcChar, 'The sourcemapped character at index ' + i + ' does not match its original character at line ' + srcLine + ', column ' + srcCol + '.');
      }
    }
  }
};