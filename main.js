'use strict'

// Global Modules
require('./lib/async');

// Modules
var vertigo = require('vertigo');

// Create server and client
var server = vertigo.createServer( 21042 );
var client = vertigo.createClient({ host : 'magallanes-server', port : 21041 });

// Listen petitions
server.on( 'monitotAddImage', require('./cmd/monitorAddImage' ) );
server.on( 'monitorNode', require('./cmd/monitorNode') );
server.on( 'monitorRemoveImage', require('./cmd/monitorRemoveImage') );

// Update monitor status
require('./cmd/monitorUpdate' )( client );
