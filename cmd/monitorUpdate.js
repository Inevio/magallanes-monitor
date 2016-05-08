'use strict';

// Modules
var execFile = require('child_process').execFile;
var ip = require('ip');

module.exports = function( client, callback ){

  console.log( !!process.env.HOST_IP, process.env.HOST_IP );

  client.request( 'monitorUpdate', process.env.HOST_IP || ip.address(), function( error ){
    //callback( error );
  });

};
