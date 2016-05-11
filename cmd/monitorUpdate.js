'use strict';

module.exports = function( client ){

  client.request( 'monitorUpdate', process.env.HOST_IP, function( error ){
    setTimeout( module.exports.bind( null, client ), 10 * 1000 );
  });

};
