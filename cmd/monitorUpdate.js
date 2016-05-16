'use strict';

module.exports = function( client ){

  var update = function(){
    client.request( 'monitorUpdate', process.env.HOST_IP, function( error ){});
  };

  update();
  setInterval( update, 10 * 1000 );

};
