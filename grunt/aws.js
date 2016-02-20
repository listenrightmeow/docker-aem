module.exports = function(grunt) {
  var cwd = process.cwd(),
      config = grunt.file.readJSON(cwd + '/config/aws.json');

  return {
    accessKeyID : config.accessKeyID,
    secretAccessKey : config.secretAccessKey
  }
}