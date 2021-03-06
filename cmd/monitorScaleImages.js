'use strict';

module.exports = function( image, instances, callback ){

  var req = {};

  if ( process.env.HOST_PORT === '2376' ) {

    req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/json?all=true';
    req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
    req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
    req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

  } else {
    req.url = 'http://' + process.env.HOST_IP + ':2375/containers/json?all=true';
  }

  request.get( req, function( error, http, body ){

    var containers = JSON.parse( body ).filter(function ( item ) {
      return item.Image === image;
    });

    if ( containers.length === instances ) {
      callback('The services are already working.');
    } else if ( containers.length > instances ) {

      var newConts = new Array();

      while ( containers.length > instances ) {
        newConts.push(containers.shift().Id);
      }

      async.map( newConts, function ( cont, callback ) {
        deleteContainer( cont, callback );
      }, callback);

    } else if ( containers.length < instances ) {

      var request = new Array();

      for (var i = 0; i <= (instances - containers.length); i++) {
        request.push(function ( callback ) {
          startContainer( image, Math.trunc( (Math.random() * 1000) + 1 ), callback);
        });
      }

      async.parallel( request, callback );

    }

  });

};

function  deleteContainer ( cont, callback ) {

  var req = {};

  if ( process.env.HOST_PORT === '2376' ) {

    req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/' + cont + '?force=true';
    req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
    req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
    req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

  } else {
    req.url = 'http://' + process.env.HOST_IP + ':2375/containers/' + cont + '?force=true';
  }

  request.del( req, function ( err, http, body ) {
    callback( err, body );
  });
}

function startContainer ( image, id, callback ) {

  if ( image.indexOf('/') !== -1 ) {
    var containerName = image.split('/')[ 1 ].split(':')[ 0 ];
  } else {
    var containerName = image.split(':')[ 0 ];
  }

  containerName += '-' + id;

  var req = {
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

  if ( process.env.HOST_PORT === '2376' ) {

    req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/create?name=' + containerName;
    req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
    req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
    req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

  } else {
    req.url = 'http://' + process.env.HOST_IP + ':2375/containers/create?name=' + containerName;
  }

  request.post( req, function( error, http, body ){

    if( error ){
      return callback( error );
    }

    var req = {};

    if ( process.env.HOST_PORT === '2376' ) {

      req.url  = 'https://' + process.env.HOST_IP + ':2376/containers/' + body.Id + '/start';
      req.cert = fs.readFileSync( __dirname + '/../cert/cert.pem' );
      req.key  = fs.readFileSync( __dirname + '/../cert/key.pem' );
      req.ca   = fs.readFileSync( __dirname + '/../cert/ca.pem' );

    } else {
      req.url = 'http://' + process.env.HOST_IP + ':2375/containers/' + body.Id + '/start';
    }

    request.post( req, function( error, http, secondBody ){

      if ( error ) {
        return callback( error );
      }

      callback( null, [ body, secondBody ] );

    });

  });

}
