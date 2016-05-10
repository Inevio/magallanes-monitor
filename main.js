'use strict'

// Modules
var vertigo = require('vertigo');

// Create server and client
var server = vertigo.createServer( 21042 );
var client = vertigo.createClient({ host : 'magallanes-server', port : 21042 });

// Listen petitions
module.exports = {

  monitorAddImage : require('./cmd/monitorAddImage' ).bind( null, client ),
  monitorNode : require('./cmd/monitorNode' ).bind( null, client ),
  monitorUpdate : require('./cmd/monitorUpdate' ).bind( null, client )

};

module.exports.monitorUpdate();
setInterval( module.exports.monitorUpdate, 10 * 1000 );
