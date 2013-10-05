module.exports = function (grunt) {
  grunt.file.mkdir('actual');

  grunt.initConfig({
    'pkg': {
      'name': 'grunt-jsmin-sourcemap',
      'version': '1.5.0'
    },
    'jsmin-sourcemap': {
      // Compact format -- https://github.com/gruntjs/grunt/blob/master/docs/api.md#thisfile--grunttaskcurrentfile
      'actual/compact.min.js': 'test_files/jquery.js',
      // Normal format
      single: {
        src: 'test_files/jquery.js',
        dest: 'actual/jquery.min.js',
        destMap: 'actual/jquery.js.map'
      },
      multi: {
        src: ['test_files/jquery.js', 'test_files/underscore.js'],
        dest: 'actual/multi.min.js',
        destMap: 'actual/multi.js.map'
      },
      // Package specific interpolation
      interpolation: {
        src: 'test_files/jquery.js',
        dest: 'actual/interpolate.<%= pkg.name %>-<%= pkg.version %>.min.js',
        destMap: 'actual/interpolate.<%= pkg.name %>-<%= pkg.version %>.js.map'
      },
      // Nested files
      nested: {
        // Linux did not perform natural order sorting on first run
        // src: 'test_files/nested-src/*.js',
        src: ['test_files/nested-src/1.js', 'test_files/nested-src/3.js', 'test_files/nested-src/2.js'],
        dest: 'actual/nested-dest/nested.min.js'
      },
      // Different dests
      differentDest: {
        src: ['test_files/nested-src/1.js', 'test_files/nested-src/3.js', 'test_files/nested-src/2.js'],
        dest: 'actual/different-dest-js/differentDest.min.js',
        destMap: 'actual/different-dest-map/differentDest.min.js.map'
      }
    },
    test: {
      all: '*.test.js'
    }
  });

  // Load in jsmin-sourcemap
  grunt.loadTasks('../tasks');

  // Set up the default task
  grunt.registerTask('default', 'jsmin-sourcemap test');
};