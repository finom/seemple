/*
 * grunt-retro
 * https://github.com/twolfson/grunt-retro
 *
 * Copyright (c) 2013 Todd Wolfson
 * Licensed under the MIT license.
 */

var assert = require('assert');
module.exports = function (grunt) {
  // Proxy registerTask
  var registerTaskFn = grunt.registerTask;
  grunt.registerTask = function (taskName, taskList, taskFn) {
    // Capture arguments for manipulation
    var args = [].slice.call(arguments);

    // If there is no taskFn
    if (!taskFn) {
      // and if taskList is not an array
      if (!Array.isArray(taskList)) {
        args[1] = taskList.split(/\s+/g);
      }
    }

    // Invoke the original function
    return registerTaskFn.apply(this, args);
  };


  // Proxy registerMultiTask
  var registerMultiFn = grunt.registerMultiTask;
  grunt.registerMultiTask = function (taskName, description, taskFn) {
    var args = [].slice.call(arguments);

    // Wrap taskFn
    args[2] = function proxiedTaskFn () {
      // Fallback this.file
      // this.file = this.file || this.files[0].orig;
      var file = this.file;
      if (!file) {
        // Taken lovingly from https://github.com/gruntjs/grunt/blob/0.3-stable/lib/grunt/task.js#L79-L89
        this.file = {};
        // Handle data structured like either:
        // 'prop': [srcfiles]
        // {prop: {src: [srcfiles], dest: 'destfile'}}.
        if (grunt.utils.kindOf(this.data) === 'object') {
          if ('src' in this.data) { this.file.src = this.data.src; }
          if ('dest' in this.data) { this.file.dest = this.data.dest; }
        } else {
          this.file.src = this.data;
          // (except for this line)
          // this.file.dest = target;
          this.file.dest = this.target;
        }
      }

      // Call the original function
      return taskFn.apply(this, arguments);
    };

    // Call the original function
    return registerMultiFn.apply(this, args);
  };

  // Fallback grunt.utils and grunt...minimatch
  grunt.utils = grunt.utils || grunt.util;
  grunt.file.glob.minimatch = grunt.file.glob.minimatch || grunt.file.minimatch;

  // Set up storage for helpers
  var helpers = {};

  // Fallback helper helper
  function helper(name) {
    // Look up and assert the helper exists
    var helperFn = helpers[name];
    assert(helperFn, 'GRUNT HELPER: "' + name + '" could not be found.');

    // Call the helper with the arguments
    var args = [].slice.call(arguments, 1);
    return helperFn.apply(this, args);
  }
  grunt.helper = grunt.helper || helper;

  // Fallback registerHelper
  function registerHelper(name, fn) {
    helpers[name] = fn;
  }
  grunt.registerHelper = grunt.registerHelper || registerHelper;

  // Return grunt for a fluent interface
  return grunt;
};
