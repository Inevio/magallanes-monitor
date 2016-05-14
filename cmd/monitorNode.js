'use strict';

// Modules
var request = require('request');

module.exports = function( callback ){

  request.get( 'http://' + process.env.HOST_IP + ':2375/containers/json?all=true', function( error, http, body ){
    callback( error, JSON.parse( body ) );
  });

};
