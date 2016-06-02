'use strict';

module.exports = function( id, callback ){

  var req = {};

  if ( process.env.HOST_PORT === '2376' ) {

    req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/' + id + '/kill';
    req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
    req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
    req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

  } else {
    req.url = 'http://' + process.env.HOST_IP + ':2375/containers/' + id + '/kill';
  }

  request.post( req, function ( err, http, body ) {
    callback( err, body );
  });

};
