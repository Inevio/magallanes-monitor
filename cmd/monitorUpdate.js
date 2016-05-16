'use strict';

var update = function(){
  client.request( 'monitorUpdate', process.env.HOST_IP, function( error ){});
};

module.exports = function( client ){

  update();
  setInterval( update, 10 * 1000 );

};
