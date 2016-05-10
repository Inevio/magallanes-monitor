'use strict';

// Modules
var hostIp  = require('../hostIp');
var request = require('request');

module.exports = function( client, image, containerName,callback ){

  hostIp( function( error, ip ){

    if( error ){
      return callback( error );
    }

    var req = {

      url : 'http://' + ip + ':2375/images/create?fromImage=' + image,
      headers : {

        'X-Registry-Auth' : new Buffer( JSON.stringify({

          username : process.env.REGISTRY_USER || '',
          password : process.env.REGISTRY_PASS || '',
          email    : process.env.REGISTRY_MAIL || ''

        }) ).toString('base64')

      }

    };

    request.post( req, function( error, http, body ){

      if( error ){
        return callback( error );
      }

      var req = {

        url : 'http://' + ip + ':2375/containers/create?name=' + containerName,
        json : {
          'Image' : image
        }

      };

      request.post( req, function( error, http, secondaryBody ){
        callback( error, [ body, secondaryBody ] );
      });

    });

  });

};
