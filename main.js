'use strict'

// Modules
var vertigo = require('vertigo');

// Create server and client
var server = vertigo.createServer( 21042 );
var client = vertigo.createClient({ host : 'magallanes-server', port : 21042 });

// Listen petitions
server.on( 'monitotAddImage', require('./cmd/monitorAddImage' ) );

// Update monitor status
var monitorUpdate = require('./cmd/monitorUpdate' ).bind( null, client );

monitorUpdate();
setInterval( monitorUpdate, 10 * 1000 );
