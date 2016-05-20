'use strict';

module.exports = function( id, callback ){

  request.post({ 'http://' + process.env.HOST_IP + ':2375/containers/' + id + '/kill' }, function ( err, http, body ) {
    callback( err, body );
  });

};
