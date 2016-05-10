'use strict';

// Modules
var hostIp  = require('../hostIp');
var request = require('request');

module.exports = function( client, callback ){

  hostIp( function( error, ip ){

    if( error ){
      return callback( error );
    }

    request.get( 'http://' + ip + ':2375/containers/json?all=true', function( error, http, body ){
      callback( error, body );
    });

  });

};
