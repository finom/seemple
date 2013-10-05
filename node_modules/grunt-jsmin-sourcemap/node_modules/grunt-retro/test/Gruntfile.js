module.exports = function (grunt) {
  // Load in grunt-retro
  grunt = require('../tasks/retro')(grunt);

  // Load in common config
  grunt = require('./grunt.common.js')(grunt);

  // Add nodeunit config
  grunt.config.set('nodeunit', {
    all: '*_test.js'
  });

  // Load in grunt-contrib-nodeunit
  process.chdir('..');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  process.chdir(__dirname);

  // Run project task then tests.
  // TEST: We can actually run single string of queries
  grunt.registerTask('default', 'test-setup nodeunit');
};