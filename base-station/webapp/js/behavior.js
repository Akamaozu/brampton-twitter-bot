var socket = io( 'https://torontojs-basestation.herokuapp.com/' ),
    viewport = document.getElementById( 'uploaded' ),
    uploads = 0;

socket.on( 'new-upload', function ( file ){

  uploads += 1;

  var upload_markup = '<div id="upload-' + uploads + '" class="upload">' +
                        '<img class="image" src="data:image/jpeg;base64,'+ file.content +'">' +
                        '<div class="description">Satellite: ' + file.uploader + '</div>' +
                      '</div>';

  viewport.innerHTML = upload_markup + viewport.innerHTML;
});