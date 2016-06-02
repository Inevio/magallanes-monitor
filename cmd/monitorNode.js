'use strict';

var fs = require('fs');

module.exports = function( callback ){

  var req = {};

  if( process.env.HOST_PORT === '2376' ){

    req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/json?all=true';
    req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
    req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
    req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

  }else{
    req.url = 'http://' + process.env.HOST_IP + ':2375/containers/json?all=true';
  }

  request.get( req, function( error, http, body ){
    callback( error, JSON.parse( body ) );
  });

};
