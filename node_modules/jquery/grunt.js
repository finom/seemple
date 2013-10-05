module.exports = function(grunt) {

  var exec = require('child_process').exec,
      http = require('http'),
      fs = require('fs'),
      host = 'ajax.googleapis.com',
      jqPath = '/ajax/libs/jquery/1.8.3/jquery.js';

  grunt.registerTask('build', 'builds jquery module for us in nodjs', function() {
    var tmpDir = './tmp', distDir = './lib',
        done = this.async(), wrapper;


    function buildjQuery(jq) {
      wrapper = fs.readFileSync('./src/wrapper.js', 'utf8');
      wrapper = wrapper.replace('//JQUERY_SOURCE', jq);
      fs.writeFileSync('./lib/node-jquery.js', wrapper);
      done();
    }

    function writejQuery() {
      var data = '',
          req = http.request({
        host: host,
        port: 80,
        path: jqPath,
        method: 'GET'
      }, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          data += chunk;
        });
        res.on('end', function() {
          fs.writeFileSync(tmpDir+'/jquery.js', data);
          buildjQuery(data);
        });
      });
      req.write('data\n');
      req.write('data\n');
      req.end();

    }

    function getjQuery() {
      var jq = null;
      try {
        jq = fs.readFileSync(tmpDir+'/jquery.js', 'utf8');
        buildjQuery(jq);
      } catch (e) {
        writejQuery();
      }
    }

    exec('mkdir '+tmpDir+' && mkdir '+distDir, getjQuery);
  });

  grunt.registerTask('clean', 'removes dist and tmp directories', function() {
    var done = this.async();
    exec('rm -rf ./tmp && rm -rf ./lib', function() {
      done();
    });
  });

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: ['test/*.js']
    },
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'build test');

};
