lat = 0;
lon = 0;
uuid = 0;
interval = 10000;
max_length = 1000;
image_quality = 65;
url_upload = 'http://smwx.org/upload.php';
url_params = 'http://smwx.org/params.php';

app = {
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {
  },
  receivedEvent: function(id) {}
};

photograph = function() {
  CameraPreview.setFlashMode('off');
  CameraPreview.takePicture({height: max_length, width: max_length, quality: image_quality}, function(base64PictureData) {
    pic = 'data:image/jpeg;base64,'+base64PictureData;
    $.post(url_upload, {image: pic, lat: lat, lon: lon, uuid: uuid, timeout: 5000}, function(data, status, xhr) { }).fail(function(error, status, xhr) { });
  });
}

function photoDelay() {
  return new Promise(resolve =>  setTimeout(resolve, interval));
}

function msg(m) {
  alert(m);
}

async function photos() {
alert(0);
  await photoDelay();
alert(1);
  $.post(url_params, {uuid: uuid, timeout: 5000}, function(smwx_params, status, xhr) {
    params = smwx_params.split(",");
    interval = params[0]*1000;
    max_length = params[1];
    image_quality = params[2];
  });
alert(2); 
  params();
alert(3);
  photograph();
alert(4);
}

async function processArray() {
  for (var i = 0; i < Infinity; i++) { 
     await photos();
  };
}

function onError(e) {
  alert('code = '+e.code+'\n'+e.message);
}

function onSuccess(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
}

function get_uuid(uuid_value) {
  uuid = uuid_value;
}

app.initialize();
window.plugins.uniqueDeviceID.get(get_uuid);
navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 5000 });
CameraPreview.startCamera({camera: CameraPreview.CAMERA_DIRECTION.BACK});
CameraPreview.hide();
processArray();
