var supe = require('supe')(),
    path = require('path'),
    path_to_root = '.';

supe.start( 'base-station', path_to_root + '/base-station/base-station' );
supe.start( 'weather-sat', path_to_root + '/weather-satellite/satellite' );