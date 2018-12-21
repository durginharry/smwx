lat = 0;
lon = 0;
uuid = 0;
interval = 60000;
image_width = 1000;
image_quality = 65;

app = {
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {
  },
  receivedEvent: function(id) {}
};

photograph = function() {
  let url = 'http://smwx.org/upload.php';
      CameraPreview.setFlashMode('off');
      CameraPreview.takePicture({width:image_width, quality:image_quality}, function(base64PictureData) {
        pic = 'data:image/jpeg;base64,'+base64PictureData;
        $.post(url, {image: pic, lat: lat, lon: lon, uuid: uuid, timeout: 5000}, function(data, status, xhr) { }).fail(function(error, status, xhr) { });
      });
}

params = function() {
  let url = 'http://smwx.org/params.php';
  $.post(url, {uuid: uuid, timeout: 5000}, function(data, status, xhr) {
alert('.'+data+'.');
data = rtrim(data);
alert('.'+data+'.');
    params = split(",",data);
alert('.'+params+'.');
    interval = params[0]*1000;
    image_width = params[1];
    image_quality = params[2]; 
  });
}

function photoDelay() {
  return new Promise(resolve =>  setTimeout(resolve, interval));
}

function msg(m) {
  alert(m);
}

async function photos() {
  await photoDelay();
  params(); 
  photograph();
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
