'use strict';

// Modules
var execFile = require('child_process').execFile;
var ip = require('ip');

module.exports = function( client, callback ){

  client.request( 'monitorUpdate', process.env.HOST_IP || ip.address(), function( error ){
    //callback( error );
  });

};
