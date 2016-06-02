'use strict';

module.exports = function( image, callback ){

  var req = {};

  if ( process.env.HOST_PORT === '2376' ) {

    req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/json?all=true';
    req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
    req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
    req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

  } else {
    req.url = 'http://' + process.env.HOST_IP + ':2375/containers/json?all=true';
  }

  request.get( req, function( error, http, body ){

    var containers = JSON.parse( body ).filter(function ( item ) {
      return item.Image === image;
    });

    async.map( containers, function ( item, callback ) {

      var req = {};

      if ( process.env.HOST_PORT === '2376' ) {

        req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/' + item.Id + '?force=true';
        req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
        req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
        req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

      } else {
        req.url = 'http://' + process.env.HOST_IP + ':2375/containers/' + item.Id + '?force=true';
      }

      request.del( req, function ( err, http, body ) {

        if ( err ){
          return callback( err );
        }

        var req = {};

        if ( process.env.HOST_PORT === '2376' ) {

          req.url  = 'https://' + process.env.HOST_IP + ':2376/images/' + image;
          req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
          req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
          req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

        } else {
          req.url = 'http://' + process.env.HOST_IP + ':2375/images/' + image;
        }

        request.del(req, function ( err, http, body ) {
          callback( err );
        });

      });

    }, function ( err ) {
      callback(err);
    });

  });

};
