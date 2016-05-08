'use strict';

// Modules
var execFile = require('child_process').execFile;

module.exports = function( client, callback ){

  execFile( 'cat', ['/proc/self/cgroup'], function( error, stdout ){

    console.log( stdout );

    client.request( 'registerService', stdout, function( error ){
      callback( error );
    });

  });

};
