'use strict';

// Modules
var hostIp  = require('../hostIp');
var request = require('request');

module.exports = function( image, callback ){

  if( image.indexOf('/') !== -1 ){
    containerName = image.split('/')[ 1 ].split(':')[ 0 ];
  }else{
    containerName = image.split(':')[ 0 ];
  }

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
          'Image' : image,
          'HostConfig' : {
            'RestartPolicy' : {
              'Name' : 'on-failure'
            },
            'NetworkMode': 'localnet'
          },
          'NetworkingConfig': {
            'EndpointsConfig': {
              'localnet': {
                'Aliases': [ containerName ]
              }
            }
          }
        }

      };

      request.post( req, function( error, http, secondBody ){

        if ( error ) {
          return callback( error );
        }

        var req = {
          url : 'http://' + ip + ':2375/containers/' + secondBody.Id + '/start'
        };

        request.post( req, function( error, http, thirdBody ){

          if ( error ) {
            return callback( error );
          }

          callback( null, [ body, secondBody, thirdBody ] );

        });

      });

    });

  });

};
