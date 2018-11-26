var app = {
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {},
  receivedEvent: function(id) {}
};

var photograph=function() {
  let url='http://harrysserver.com/camera/windward.php';
      CameraPreview.setFlashMode('off');
      CameraPreview.takePicture({height:1920, width:1080, quality:90}, function(base64PictureData) {
        var pic='data:image/jpeg;base64,'+base64PictureData;
        $.post(url, {image: pic, timeout: 50000});
      });
}

function photoDelay() {
  return new Promise(resolve =>  setTimeout(resolve, 60000));
}

async function photos() {
  await photoDelay();  
  photograph();
}

async function processArray() { 
 for (var i=0; i<Infinity; i++) { 
     await photos();
  };
}


var onSuccess = function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
app.initialize();

navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 30000, enableHighAccuracy: false});

//navigator.geolocation.getCurrentPosition(onSuccess, onError);

// CameraPreview.startCamera({camera: CameraPreview.CAMERA_DIRECTION.BACK});
// CameraPreview.hide();
// processArray();
