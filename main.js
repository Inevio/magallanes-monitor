'use strict'

// Global Modules
require('./lib/async');
require('./lib/request');

// Modules
var vertigo = require('vertigo');

// Create server and client
var server = vertigo.createServer( 21042 );
var client = vertigo.createClient({ host : process.env.MAGALLANES_SERVER || 'magallanes-server', port : 21041 });

// Listen petitions
server.on( 'monitorAddImage', require('./cmd/monitorAddImage' ) );
server.on( 'monitorNode', require('./cmd/monitorNode') );
server.on( 'monitorRemoveImage', require('./cmd/monitorRemoveImage') );
server.on( 'monitorUpdateImages', require('./cmd/monitorUpdateImages') );
server.on( 'monitorScaleImage', require('./cmd/monitorScaleImages') );

// Update monitor status
require('./cmd/monitorUpdate' )( client );
