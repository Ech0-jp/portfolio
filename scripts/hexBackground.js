var hexBackground = document.getElementById('hexBackground');
hexBackground.width = width;
hexBackground.height = height;
var ctx = hexBackground.getContext('2d');

var img = new Image(width, height);
img.src = "./images/HexBackground.png";

var radius = 0;

var hexInterval;

var AnimatedHexGrid = function(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.025)";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(70,239,244,0.05)"
    
    ctx.beginPath();
    ctx.arc(window.innerWidth/2, window.innerHeight/2, radius, 0, 2*Math.PI);
    ctx.lineWidth = 100;
    ctx.closePath();
    ctx.stroke();
    
    radius += 6;
    if (radius * 2 > width * 2)
        radius = 0;
      
    ctx.drawImage(img, 0, 0, width, height);
}

function StartHexInterval(){
    animated = true;
    hexInterval = setInterval(AnimatedHexGrid, 33);
}

function ClearHexInterval(){
    if (!hexInterval)
        return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);
    radius = 0;
    clearInterval(hexInterval);
}