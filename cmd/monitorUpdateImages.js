'use strict';

module.exports = function( images, callback ){

  if ( Object.prototype.toString.call( images ) !== '[object Array]' ) {

    var req = {};

    if ( process.env.HOST_PORT === '2376' ) {

      req.url  = 'https://' + process.env.HOST_IP + ':2376/images/json?all=true';
      req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
      req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
      req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

    } else {
      req.url = 'http://' + process.env.HOST_IP + ':2375/images/json?all=true';
    }

    request.get( req, function( error, http, body ){

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

      headers : {

        'X-Registry-Auth' : new Buffer( JSON.stringify({

          username : process.env.REGISTRY_USER || '',
          password : process.env.REGISTRY_PASS || '',
          email    : process.env.REGISTRY_MAIL || ''

        }) ).toString('base64')

      }

    };

    if ( process.env.HOST_PORT === '2376' ) {

      req.url  = 'https://' + process.env.HOST_IP + ':2376/images/create?fromImage=' + image;
      req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
      req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
      req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

    } else {
      req.url = 'http://' + process.env.HOST_IP + ':2375/images/create?fromImage=' + image;
    }

    request.post( req, function ( error, http, body ) {
      callback( error, body );
    });

  }, function ( err, res ) {
    callback(err, JSON.parse(res[0].split('\r\n')[2]).status);
  });
}
