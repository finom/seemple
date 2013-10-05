var jsmin = require('jsmin-sourcemap'),
    path = require('path'),
    gruntRetro = require('grunt-retro');
module.exports = function (grunt) {
  // Load and bind grunt-retro
  grunt = gruntRetro(grunt);

  // Define the jsmin-sourcemap task
  grunt.registerMultiTask('jsmin-sourcemap', 'Generate minified JavaScript and sourcemap from files', function () {
    // Grab the files to minify
    var file = this.file,
        data = this.data,
        cwd = data.cwd || '.',
        srcFile = file.src,
        srcFiles = grunt.file.expand({'cwd': cwd}, srcFile);

    // Map each file into a JSMin input
    var input = srcFiles.map(function (file) {
      var filepath = path.join(cwd, file),
          code = grunt.file.read(filepath),
          src = file;
      return {'code': code, 'src': src};
    });

    // Grab the destFile and destMap paths, if it does not exist fallback to destFile + '.map'
    var destFile = path.join(cwd, file.dest),
        destMap = data.destMap;
    if (destMap !== undefined) {
      // Interpolate the map via grunt.template
      destMap = grunt.template.process(destMap);

      // Join it together with the cwd
      destMap = path.join(cwd, destMap);
    } else {
      destMap = destFile + ".map";
    }

    // Determine the relative dest and relative map path
    var destMapDir = path.dirname(destMap),
        destFileDir = path.dirname(destFile),
        destMapName = path.basename(destMap),
        destFileName = path.basename(destFile),
        relMapDirPath = path.relative(destFileDir, destMapDir),
        relDestDirPath = path.relative(destMapDir, destFileDir),
        relMapPath = path.join(relMapDirPath, destMapName),
        relDestPath = path.join(relDestDirPath, destFileName);

    // Convert any '\\'s to '/'s (since we are URL based)
    relMapPath = relMapPath.replace(/\\/g, '/');
    relDestPath = relDestPath.replace(/\\/g, '/');

    // Minify the input
    var retObj = jsmin({
          'input': input,
          'dest': relDestPath,
          'srcRoot': data.srcRoot
        });

    // Grab the minified code
    var code = retObj.code;

    // Append a sourceMappingURL to the code
    code = code + '\n//@ sourceMappingURL=' + relMapPath;

    // Write out the code and map
    grunt.file.write(destFile, code);
    grunt.file.write(destMap, retObj.sourcemap);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('Files "' + destFile + '", "' + destMap + '" created.');
  });
};