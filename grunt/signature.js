module.exports = function(grunt) {
  grunt.registerTask('signature', function() {
    var cookies,
        type = grunt.option('type') || 'url',
        expireInteger = parseInt(grunt.option('expTime'), 10) || 1,
        expireString = grunt.option('expDuration') || 'days',
        sign = require('aws-cloudfront-sign'),
        moment = require('moment'),
        baseURL = 'http://d14f4fwrb98s3t.cloudfront.net/*',
        options = {
          expireTime: moment().add(expireInteger, expireString),
          keypairId: 'APKAJMLS5EJNYLY7XPPQ',
          // TODO: REPLACE WITH THE CORRECT PATH!
          privateKeyPath: process.cwd() + '/config/pk-private'
        };

    switch(type) {
      case 'cookie':
        cookies = sign.getSignedCookies(baseURL, options);

        for (var key in cookies) {
          grunt.log.oklns(key);
          console.log(cookies[key]);
        }
      break;
      case 'url':
        var path = baseURL.match(/.(?:\.\w+\/)(.+$)/)[1],
            route =  !/[\w\d]/.test(path) ? '\\' + path : path,
            re = new RegExp('.+(\\.\\w+\\/)(' + route + ')'),
            params = sign.getSignedUrl(baseURL, options).replace(re, '');

        grunt.config.set('signedURLParams', params);
        grunt.log.writeln(params);
      break;
    }
  });
}