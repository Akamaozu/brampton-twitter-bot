var citizen = require('supe');

// toggle connection status periodically
  setInterval( function(){  
    citizen.noticeboard.notify( 'toggle-connection-status' );
  }, 1000 * 18 );