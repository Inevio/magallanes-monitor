'use strict';

module.exports = function( images, callback ){

  if ( Object.prototype.toString.call( images ) !== '[object Array]' ) {

    request.get( 'http://' + process.env.HOST_IP + ':2375/images/json?all=true', function( error, http, body ){

      images = new Array();
      body = JSON.parse( body );

      for (var i = 0; i < body.length; i++) {
        images = body[i].RepoTags.filter(function ( image ) {
          return image.indexOf(':latest');
        });
      }

      updateImage( images, callback );
    });

  } else {
    updateImage( images, callback );
  }

};

function updateImage( images, callback ) {

  async.map( images, function ( image, callback ) {

    var req = {

      url : 'http://' + process.env.HOST_IP + ':2375/images/create?fromImage=' + image,
      headers : {

        'X-Registry-Auth' : new Buffer( JSON.stringify({

          username : process.env.REGISTRY_USER || '',
          password : process.env.REGISTRY_PASS || '',
          email    : process.env.REGISTRY_MAIL || ''

        }) ).toString('base64')

      }

    };

    request.post( req, function ( error, http, body ) {
      callback( error, body );
    });

  }, function ( err, res ) {
    callback(err, JSON.parse(res[0].split('\r\n')[2]).status);
  });
}
