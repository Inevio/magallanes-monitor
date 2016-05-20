'use strict';

module.exports = function( ip, port, callback ){

  var client = vertigo.createClient({ host : ip, port : port });

  client.request('suspend', callback);

};
