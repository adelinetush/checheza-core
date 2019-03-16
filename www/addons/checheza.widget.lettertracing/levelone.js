var canvaslevelone = document.getElementById('canvaslevelone');
var ctx = canvaslevelone.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
var mousedown = false;
var lastX, lastY;
var pixels = null;
var bluepixels = null;
var greenpixels = null;
var letterpixels = null;
ctx.lineWidth = 20;
ctx.lineCap = 'round';
ctx.strokeStyle = colors;
drawLetter("A");
pixels = ctx.getImageData(0,0, canvaslevelone.width, canvaslevelone.height);

letterpixels=getPixelAmountData(255,0,0)
console.log(letterpixels)

//http://creativejs.com/2011/12/day-3-play-with-your-pixels/index.html
function getPixelColourData(x,y) {
    var index = (y * pixels.width + x) * 4;
    return {
      r:pixels.data[index],
      g:pixels.data[index + 1],
      b:pixels.data[index + 2],
      a:pixels.data[index + 3]
    };
}

/*
  getpixelamount(r, g, b)
  returns the amount of pixels in the canvas of the colour
  provided
*/
function getPixelAmountData(r, g, b) {
  var pixels = ctx.getImageData(0, 0, canvaslevelone.width, canvaslevelone.height);
  var all = pixels.data.length;
  var amount = 0;
  for (i = 0; i < all; i += 4) {
    if (pixels.data[i] === r &&
        pixels.data[i + 1] === g &&
        pixels.data[i + 2] === b) {
      amount++;
    }
  }
  return amount;
}


// draw letter on canvass
function drawLetter(letter) {
    var centerX = (canvaslevelone.width - ctx.measureText(letter).width) / 2;
    var centerY = canvaslevelone.height / 2;
    ctx.fillStyle = "red";
    ctx.font = "400px 'alphabet";
    ctx.fillText(letter,centerX,centerY);
    console.log(centerX,centerY);
    console.log(ctx.measureText(letter));
}

function onmousemove(ev){
    var x = ev.clientX - canvaslevelone.offsetLeft;
    var y = ev.clientY - canvaslevelone.offsetTop;
    if (mousedown) {
        paint(x,y);
    }
}

function onmousedown(ev){
    mousedown = true;
    //method stops the default action of an element from happening
    ev.preventDefault();
}

function onmouseup(ev){
    mousedown = false;
    //method stops the default action of an element from happening
   // var pixelamount = getPixelsAmountData(255,0,0)
    //console.log(pixelamount)
    console.log("letterpixel");
    console.log(letterpixels)
    letterpixelsleft=getPixelAmountData(255,0,0);
    greenpixels=getPixelAmountData(0,255,0);
    bluepixels=getPixelAmountData(0,0,255);
    console.log("pixelsleft");
    console.log(letterpixelsleft);
    console.log("green");
    console.log(greenpixels);
    console.log("blue");
    console.log(bluepixels);
    ev.preventDefault() 
}


function paint(x,y){
    //checking for the colour of the pixel
    var colour =  getPixelColourData(x,y);
    if (colour.a == 0) {
        console.log("Outside letter");
        ctx.strokeStyle = 'rgba(0,0,0,0.0)';
    }
    else {
        console.log("Inside letter");
        ctx.strokeStyle = colors;
        ctx.beginPath();
    if (lastX > 0 && lastY >0 && Math.abs(lastX-x) < 2 && Math.abs(lastY-y) < 2) {
        ctx.moveTo(lastX,lastY);
    }
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = colour;
        console.log(lastX, lastY, x, y);
        lastX = x;
        lastY = y;

    }
}

var colors = "blue";

function changeColor(palette) {
	switch(palette.id) {
		case "blue":
			colors = "blue";
			break;
		case "green":
			colors = "green";
			break;
	}
};



canvaslevelone.addEventListener('mousemove',onmousemove,false);
canvaslevelone.addEventListener('mousedown',onmousedown,false);
canvaslevelone.addEventListener('mouseup',onmouseup,false);