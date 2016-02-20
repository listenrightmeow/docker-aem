module.exports = {
  options : {
    accessKeyId : '<%= accessKeyID %>',
    secretAccessKey : '<%= secretAccessKey %>',
    // TODO: REPLACE WITH THE CORRECT BUCKET!
    bucket : 'your-bucket'
  },
  aem : {
    options: {
      gzip: false
    },
    cwd: 'aem/',
    src: '*',
    dest: ''
  }
}