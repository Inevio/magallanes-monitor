'use strict';

// Modules
var request = require('request');

module.exports = function( image, callback ){

  request.get( 'http://' + process.env.HOST_IP + ':2375/containers/json?all=true', function( error, http, body ){

    var containers = JSON.parse( body ).filter(function ( item ) {
      return item.Image === image;
    });

    async.map( containers, function ( item, callback ) {

      request.del( 'http://' + process.env.HOST_IP + ':2375/containers/' + item.Id + '?force=true', function ( err, http, body ) {

        if ( err ){
          return callback( err );
        }

        request.del('http://' + process.env.HOST_IP + ':2375/images/' + image, function ( err, http, body ) {
          callback( err );
        });

      });

    }, function ( err ) {
      callback(err);
    });

  });

};