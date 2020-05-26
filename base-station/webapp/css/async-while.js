
// #1 do background intermittent work
  setInterval( function(){
    pretty_log( 'intermittent work happening' );
  }, 10 );

// #2 do sync foreground work
  async_countdown( 10000000 );

// sync countdown
  function sync_countdown( limit ){
    if( typeof limit !== 'number' ) throw new Error( 'limit must be a number' );
    if( limit < 1 ) throw new Error( 'limit must be a positive number' );

    for( var i = 0; i < limit; i += 1 ){
      pretty_log( i + 1 );
    }
  }

// async countdown
  function async_countdown( limit, cb ){
    if( typeof limit !== 'number' ) throw new Error( 'limit must be a number' );
    if( limit < 1 ) throw new Error( 'limit must be a positive number' );
    if( typeof cb !== 'function' ) cb = function(){ console.log( 'all done!' ); };

    var i = 0,
        number_to_print = i + 1;

    async_while( condition, thing_to_do, cb );

    function thing_to_do(){
      number_to_print = i += 1;
      pretty_log( number_to_print );
    }

    function condition(){
      return i < limit;    
    }

    function async_while( condition, thing_to_do, cb ){
      var action = thing_to_do;

      do_next();

      function do_next(){
        asyncify( action, function(){
          if( ! condition() ) return setTimeout( cb, 0 );
          else do_next();
        });
      }
    }
 
   function asyncify( sync_func, cb ){
      setTimeout( function(){
        var success = false,
            results;

        try {
          results = sync_func();
          success = true;
        }

        catch(e){
          results = e;
        }

        if( ! success ) cb( results );
        else cb( null, results ); 
      }, 0 );
    }
  }

function pretty_log(){
  var input = Array.prototype.slice.call( arguments ),
      prefix = get_timestamp();

  input.unshift( prefix );
  console.log.apply( console, input );
}

function get_timestamp(){
  var now = new Date(),
      year = now.getFullYear(),
      month = leftpad( now.getMonth() + 1 ),
      date = leftpad( now.getDate() ),
      hour = leftpad( now.getHours() ),
      minute = leftpad( now.getMinutes() ),
      second = leftpad( now.getSeconds() ),

      prefix = '[' + year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second + ']';

  return prefix;
} 

function leftpad( n ) {
  var tr = ( parseInt(n) < 10 ) ? '0' + n : n;
  return tr;
}