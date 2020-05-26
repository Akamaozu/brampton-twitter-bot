var supervisor = require('supe')(),
    path = require('path');

// register components
  supervisor.register( 'http-server', path.join( __dirname, 'components', 'http-server' ) );
  supervisor.register( 'brain', path.join( __dirname, 'components', 'brain' ) );

supervisor.start( 'http-server' );
supervisor.start( 'brain' );