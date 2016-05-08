'use strict'

// Modules
var vertigo = require('vertigo');

// Create server and client
var server = vertigo.createServer( 21042 );
var client = vertigo.createClient({ host : 'magallanes-server', port : 21042 });

// Listen petitions
module.exports = {

  nodes : require('./cmd/nodes' ).bind( null, client ),
  nodeByName : require('./cmd/nodeByName' ).bind( null, client ),
  nodeByIP : require('./cmd/nodeByIP' ).bind( null, client ),
  addNode : require('./cmd/addNode' ).bind( null, client ),
  addNodeWithName : require('./cmd/addNodeWithName' ).bind( null, client ),
  removeNode : require('./cmd/removeNode' ).bind( null, client ),
  removeNodeByName : require('./cmd/removeNodeByName' ).bind( null, client ),
  addImageToAllNodes : require('./cmd/addImageToAllNodes' ).bind( null, client ),
  removeImageFromAllNodes : require('./cmd/removeImageFromAllNodes' ).bind( null, client ),
  addImageToNodeByIP : require('./cmd/addImageToNodeByIP' ).bind( null, client ),
  addImageToNodeByName : require('./cmd/addImageToNodeByName' ).bind( null, client ),
  removeImageByNodeByIP : require('./cmd/removeImageByNodeByIP' ).bind( null, client ),
  removeImageByNodeByName : require('./cmd/removeImageByNodeByName' ).bind( null, client ),
  updateAllImagesOfAllNodes : require('./cmd/updateAllImagesOfAllNodes' ).bind( null, client ),
  updateImageOfAllNodes : require('./cmd/updateImageOfAllNodes' ).bind( null, client ),
  updateImageOfNode : require('./cmd/updateImageOfNode' ).bind( null, client ),
  scaleImageInAllNode : require('./cmd/scaleImageInAllNode' ).bind( null, client ),
  scaleImageInNodeByIP : require('./cmd/scaleImageInNodeByIP' ).bind( null, client ),
  scaleImageInNodeByName : require('./cmd/scaleImageInNodeByName' ).bind( null, client ),
  registerService : require('./cmd/registerService' ).bind( null, client ),
  monitorUpdate : require('./cmd/monitorUpdate' ).bind( null, client )

};

module.exports.monitorUpdate();
setInterval( module.exports.monitorUpdate, 10 * 1000 );
