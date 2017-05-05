var screen = window.screen;
var transitionCanvas = document.getElementById('transitionCanvas');
var width = transitionCanvas.width = screen.width;
var height = transitionCanvas.height = screen.height;
var context = transitionCanvas.getContext('2d');

var japanese = "あいうえおかきくけこさしすせそがぎぐげごぱぴぷぺぽアイウエオカキクケコサシスセソガギグゲゴパピプペポ";
japanese = japanese.split("");

var fontSize = 10;
var columns = transitionCanvas.width / fontSize;

var drops = [];
for(var x = 0; x < columns; x++)
    drops[x] = 1;

var fadeIn = true;

function ResetDrops(){
    for(var x = 0; x < drops.length; x++)
        drops[x] = 1;
}

var Transition = function(){
    if(fadeIn){
        context.fillStyle = "rgba(0, 0, 0, 0.25)";
        context.fillRect(0, 0, width, drops[0] * fontSize);

        context.fillStyle = "#46EFF4";
        context.font = fontSize + "px arial";
        
        for (var i = 0; i < drops.length; i++){
            var text = japanese[Math.floor(Math.random() * japanese.length)];
            context.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > transitionCanvas.height + 50) {
                document.getElementById("entry").style.visibility = "collapse";
                // TELL THE ENTRY CANVAS TO STOP ANIMATING
                hexBackground.style.visibility = "visible";
                StopMatrix();
                fadeIn = false;
            }
            drops[i]++;
        }
    }
    else{
        context.clearRect(0,0,width,height)
        context.drawImage(img, 0, 0, width, height);
        
        context.fillStyle = "black";
        context.fillRect(0, 0, width, drops[0] * fontSize);
        
        for(var i = 0; i < drops.length; i++){
            context.fillStyle = "#46EFF4";
            context.font = fontSize + "px arial";
            
            var text = japanese[Math.floor(Math.random() * japanese.length)];
            context.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] == 1){
                if (i == columns - 1)
                    StartHexInterval();
            }
            
            if (drops[i] < 0){
                ResetDrops();
                transitionCanvas.style.visibility = "collapse";
                clearInterval(transitionInterval);
            }
            
            drops[i]--;
        }
    }
}

var transitionInterval;

var btnEnter = document.getElementById("btnEnter");
btnEnter.onclick = function(){
    transitionCanvas.style.visibility = "visible";
    transitionInterval = setInterval(Transition, 33);
}