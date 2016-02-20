module.exports = function(grunt) {
  return {
    cloudfront: {
      files: [
        {src:'Dockerfile', dest:'Dockerfile'}
      ],
      options: {
        process: function(content, srcpath) {
          return content.replace(/(\"https?[\W\w].[^\s"]+)/gi, '$1' + grunt.config.get('signedURLParams'));
        }
      }
    },
    reset: {
      files: [
        {src:'Dockerfile', dest:'Dockerfile'}
      ],
      options: {
        process: function(content, srcpath) {
          return content.replace(/([?]+.[^\s]+)/gi, '"');
        }
      }
    }
  }
}