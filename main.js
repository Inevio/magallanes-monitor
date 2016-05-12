'use strict'

// Modules
var vertigo = require('vertigo');

// Create server and client
var server = vertigo.createServer( 21042 );
var client = vertigo.createClient({ host : 'magallanes-server', port : 21042 });

// Listen petitions
server.on( 'monitotAddImage', require('./cmd/monitorAddImage' ) );
server.on( 'monitorNode', require('./cmd/monitorNode') );

// Update monitor status
require('./cmd/monitorUpdate' )( client );
