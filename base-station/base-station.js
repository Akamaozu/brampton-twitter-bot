var supervisor = require('supe')(),
    path = require('path');

// load helpers to make supervising components easier
  supervisor.use( require( './utils/supervisor/prefix-output-with-timestamp' ) );
  supervisor.use( require( './utils/supervisor/log-citizen-lifecycle' ) );
  supervisor.use( require( './utils/supervisor/pipe-citizen-std-outputs' ) );

// register components    
  supervisor.register( 'http-server', path.join( __dirname, 'components', 'http-server' ) );
  supervisor.register( 'brain', path.join( __dirname, 'components', 'brain' ) );

supervisor.start( 'http-server' );
supervisor.start( 'brain' );