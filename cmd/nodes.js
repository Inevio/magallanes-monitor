'use strict';

module.exports = function( client, callback ){
  client.request( 'nodes', callback );
};
