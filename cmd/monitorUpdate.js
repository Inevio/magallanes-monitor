'use strict';

// Modules
var hostIp = require('../hostIp');

module.exports = function( client, callback ){

  hostIp( function( error, ip ){

    if( error ){
      return callback( error );
    }

    client.request( 'monitorUpdate', ip, function( error ){
      callback( error );
    });

  });

};
