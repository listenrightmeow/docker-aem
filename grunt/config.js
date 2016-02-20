module.exports = function(grunt) {
  var cwd = process.cwd(),
      config = grunt.file.readJSON(cwd + '/config/aws.json');

  grunt.registerTask('config', '', function() {
    var done = this.async();

    grunt.config.set('accessKeyID', config.accessKeyID);
    grunt.config.set('secretAccessKey', config.secretAccessKey);

    done();
  });
};