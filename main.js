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
server.on( 'monitorKillContainer', require('./cmd/monitorKillContainer') );
server.on( 'monitorNode', require('./cmd/monitorNode') );
server.on( 'monitorRemoveImage', require('./cmd/monitorRemoveImage') );
server.on( 'monitorScaleImage', require('./cmd/monitorScaleImages') );
server.on( 'monitorUpdateImages', require('./cmd/monitorUpdateImages') );

// Service listener
server.on( 'updateService', function ( info, callback ) {
  client.request('registerService', info, callback);
});

server.on( 'killService', require('./cmd/monitorKillContainer') );
server.on( 'serviceSuspend', require('./cmd/serviceSuspend') );

// Update monitor status
require('./cmd/monitorUpdate' )( client );
