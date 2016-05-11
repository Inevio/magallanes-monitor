'use strict'

// Modules
var vertigo = require('vertigo');

// Create server and client
var server = vertigo.createServer( 21042 );
var client = vertigo.createClient({ host : 'magallanes-server', port : 21042 });

server.on('monitotAddImage', function (image, callback) {
    console.log('Operation started');
    require('./cmd/monitorAddImage' )( null, image, 'imagetest', function ( err, data ) {
        console.log('Operation ended');
        callback( err, data );
    });
});

// Listen petitions

var monitorUpdate = require('./cmd/monitorUpdate' ).bind( null, client );

monitorUpdate();
setInterval( monitorUpdate, 10 * 1000 );
