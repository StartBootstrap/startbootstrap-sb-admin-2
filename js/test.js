function drawImage(imageObj){
      var canvas = document.getElementById("mau");
      var context = canvas.getContext("2d");

      var destX = 1;
      var destY = 1;

      context.drawImage(imageObj, destX, destY);

      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      var data = imageData.data;

      for (var i = 0; i < data.length; i += 4) {
        if (i % 100 == 0){
          data[i] = 130;
          data[i+1] = 255;
          data[i+2] = 100;  
        }
        
          // var red = data[i]; // red
          // var green = data[i + 1]; // green
          // var blue = data[i + 2]; // blue
          // // i+3 is alpha (the fourth element)
          // data[i] = green;
          // data[i + 1] = blue;
          // data[i + 2] = red;
      }

      // overwrite original image
      context.putImageData(imageData, 0, 0);
 }

var imageObj = new Image();
 imageObj.onload = function(){
     drawImage(this);
 };
 imageObj.src = '../img/heatmap.png';
