'use strict';

module.exports = function( client, callback ){

  client.request( 'monitorUpdate', process.env.HOST_IP, function( error ){
    callback( error );
  });

};
