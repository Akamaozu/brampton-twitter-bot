var citizen = require('supe'),
    express = require('express')(),
    server = require('http').Server( express ),
    socketio = require('socket.io')( server ),
    path = require('path'),
    fs = require('fs'),

    connection_status = false;

var target_port = process.env.SATELLITE_BASE_STATION_PORT || 5000;

server.listen( target_port, function( error ){
  if( error ) throw error;
  else console.log( 'action=listen-to-port success=true url='+ process.env.SATELLITE_BASE_STATION_URL +' port=' + target_port );
});

express.use( require('express').static( path.join( __dirname, '..', 'webapp' ) ) );

express.get('/', function(){
  var markup_cache;

  return function( req, res ){
    if( ! markup_cache ){
      var base_station_url = process.env.SATELLITE_BASE_STATION_URL + ':' + target_port,
          markup = fs.readFileSync( path.join( __dirname, '..', 'webapp', 'index.html' ), 'utf8' );

      markup_cache = markup.replace( '[BASE_STATION_URL]', base_station_url );
    }

    res.send( markup_cache );
  };

}());

socketio.on( 'connection', function( socket ){
  var name;

  console.log( 'new socket.io client connection' );

  socket.on( 'connection-status-request', function(){
    socket.emit( 'connection-status', connection_status );
  });

  socket.on( 'name', function( requested_name ){
    name = requested_name;
  });

  socket.on( 'file-upload', function( data ){
    console.log( 'action=upload satellite=' + name + ' file=' + data.name );
    socketio.emit( 'new-upload', { uploader: name, content: new Buffer( data.content ).toString('base64') });
  });
});

citizen.noticeboard.watch( 'toggle-connection-status', 'do-toggle', function(){

  connection_status = ! connection_status;
  socketio.emit( 'connection-status', connection_status );
});