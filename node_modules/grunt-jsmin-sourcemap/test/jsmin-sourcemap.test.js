var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['jsmin-sourcemap'] = {
  setUp: function (done) {
    // setup here
    done();
  },
  'jsmin-sourcemap compact': function (test) {
    test.expect(4);

      var expectedCompact = grunt.file.read('expected/compact.min.js'),
          actualCompact = grunt.file.read('actual/compact.min.js'),
          actualCompactMap = grunt.file.read('actual/compact.min.js.map'),
          compactMapComment = '//@ sourceMappingURL=compact.min.js.map',
          compactMapDeclarativeExists = actualCompact.indexOf(compactMapComment) > -1;
        // outputs proper minified code
        test.strictEqual(actualCompact, expectedCompact, ' properly minifies a compact file');
        // which points to the map file
        test.ok(compactMapDeclarativeExists, ' points to the proper map location for the compact file');
        // and the map file points back to the minified code
        test.ok(actualCompactMap.indexOf('compact.min.js') > -1, ' points back to minified compact file');
        // as well as a sourcemap
        test.ok(actualCompactMap, ' generates a source map for a compact file');

    test.done();
  },
  'jsmin-sourcemap single': function (test) {
    test.expect(3);

      var expectedSingle = grunt.file.read('expected/jquery.min.js'),
          actualSingle = grunt.file.read('actual/jquery.min.js'),
          actualSingleMap = grunt.file.read('actual/jquery.js.map'),
          singleMapComment = '//@ sourceMappingURL=jquery.js.map',
          singleMapDeclarativeExists = actualSingle.indexOf(singleMapComment) > -1;
        // outputs proper minified code
        test.strictEqual(actualSingle, expectedSingle, ' properly minifies a single file');
        // which points to the map file
        test.ok(singleMapDeclarativeExists, ' points to the proper map location for the single file');
        // as well as a sourcemap
        test.ok(actualSingleMap, ' generates a source map for a single file');

    test.done();
  },
  'jsmin-sourcemap multi': function (test) {
    test.expect(3);
    // Multiple files (jquery.js + underscore.js)
      // processed via JSMin (grunt jsmin-sourcemap:multi)
      var expectedMulti = grunt.file.read('expected/multi.min.js'),
          actualMulti = grunt.file.read('actual/multi.min.js'),
          actualMultiMap = grunt.file.read('actual/multi.js.map'),
          multiMapComment = '//@ sourceMappingURL=multi.js.map',
          multiMapDeclarativeExists = actualMulti.indexOf(multiMapComment) > -1;
        // outputs proper minified code
        test.strictEqual(actualMulti, expectedMulti, ' properly minifies multiple files');
        // which points to the map file
        test.ok(multiMapDeclarativeExists, ' points to the proper map location for the multiple files');
        // as well as a sourcemap
        test.ok(actualMultiMap, ' generates a source map for multiple files');

    test.done();
  },
  'jsmin-sourcemap interpolate': function (test) {
    test.expect(3);
    // Interpolated file paths
    var interpolationStr = 'grunt-jsmin-sourcemap-1.5.0',
        expectedInterpolate = grunt.file.read('expected/interpolate.' + interpolationStr + '.min.js'),
        actualInterpolate = grunt.file.read('actual/interpolate.' + interpolationStr + '.min.js'),
        actualInterpolateMap = grunt.file.read('actual/interpolate.' + interpolationStr + '.js.map'),
        interpolateMapComment = '//@ sourceMappingURL=interpolate.' + interpolationStr + '.js.map',
        interpolateMapDeclarativeExists = actualInterpolate.indexOf(interpolateMapComment) > -1;

      // outputs proper minified code
      test.strictEqual(actualInterpolate, expectedInterpolate, ' properly minifies a interpolated file');
      // which points to the map file
      test.ok(interpolateMapDeclarativeExists, ' points to the proper map location for the interpolated file');
      // as well as a sourcemap
      test.ok(actualInterpolateMap, ' generates a source map for at the interpolated location');

    test.done();
  },
  'jsmin-sourcemap nested': function (test) {
    test.expect(3);

    // Multiple nested files
      // processed via JSMin
      var expectedNested = grunt.file.read('expected/nested-dest/nested.min.js'),
          actualNested = grunt.file.read('actual/nested-dest/nested.min.js'),
          actualNestedMap = grunt.file.read('actual/nested-dest/nested.min.js.map'),
          nestedMapComment = '//@ sourceMappingURL=nested.min.js.map',
          nestedMapDeclarativeExists = actualNested.indexOf(nestedMapComment) > -1;
        // outputs proper minified code
        test.strictEqual(actualNested, expectedNested, ' properly minifies nested files');
        // which points to the map file
        test.ok(nestedMapDeclarativeExists, ' points to the proper map location for the nested files');
        // as well as a sourcemap
        test.ok(actualNestedMap, ' generates a source map for nested files');
    test.done();
  },
  'jsmin-sourcemap differentDest': function (test) {
    test.expect(4);

    // Different dest files
      // processed via JSMin
      var expectedDifferentDest = grunt.file.read('expected/different-dest-js/differentDest.min.js'),
          actualDifferentDest = grunt.file.read('actual/different-dest-js/differentDest.min.js'),
          actualDifferentDestMap = grunt.file.read('actual/different-dest-map/differentDest.min.js.map'),
          differentDestMapComment = '//@ sourceMappingURL=../different-dest-map/differentDest.min.js.map',
          differentDestMapDeclarativeExists = actualDifferentDest.indexOf(differentDestMapComment) > -1;
        // outputs proper minified code
        test.strictEqual(actualDifferentDest, expectedDifferentDest, ' properly minifies differentDest files');
        // which points to the map file
        test.ok(differentDestMapDeclarativeExists, ' points to the proper map location for the differentDest files');
        // and the map file points back to the minified code
        test.ok(actualDifferentDestMap.indexOf('../different-dest-js/differentDest.min.js') > -1, ' points back to minified differentDest file');
        // as well as a sourcemap
        test.ok(actualDifferentDestMap, ' generates a source map for differentDest files');

    test.done();
  }
};
