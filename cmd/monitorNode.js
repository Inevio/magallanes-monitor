'use strict';

// Modules
var execFile = require('child_process').execFile;
var request  = require('request');

module.exports = function( client, callback ){

  execFile( 'ip', ['route'], function( error, stdout ){

    var ip = stdout.match(/^default via ((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))/);

    if( !ip ){
      return callback('CAN NOT GET IP');
    }

    request.get( 'http://' + ip[ 1 ] + ':2375/containers/json?all=true', function( error, http, body ){
      callback( error, body );
    });

  });

};
