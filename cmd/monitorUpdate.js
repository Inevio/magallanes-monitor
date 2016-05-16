'use strict';

module.exports = function( client ){

  setInterval( function(){
    client.request( 'monitorUpdate', process.env.HOST_IP, function( error ){});
  }, 10 * 1000 );

};
