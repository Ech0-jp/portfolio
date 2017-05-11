var screen = window.screen;
var transitionCanvas = document.getElementById('transitionCanvas');
var width = transitionCanvas.width = screen.width;
var height = transitionCanvas.height = screen.height;
var context = transitionCanvas.getContext('2d');

var bg = new Image(width, height);
bg.src = "portfolio/images/HexBackground.png";

var japanese = "あいうえおかきくけこさしすせそがぎぐげごぱぴぷぺぽアイウエオカキクケコサシスセソガギグゲゴパピプペポ";
japanese = japanese.split("");

var fontSize = 10;
var columns = transitionCanvas.width / fontSize;

var drops = [];

var fadeIn = true;
var animated = false;
var transitionInterval;

function ResetTransition() {
    for(var x = 0; x < columns; x++)
        drops[x] = 1;
    fadeIn = true;
    animated = false;
    context.clearRect(0,0,width,height);
}

function StartTransition(direction, targetPage){
    ResetTransition();
    transitionCanvas.style.visibility = "visible";
    switch(direction){
        case "down":
            transitionInterval = setInterval(() => { TransitionDown(targetPage); }, 20);
            break;
        case "left":
            
            break;
        case "up":
            
            break;
        case "right":
            
            break;
    }
}

function TransitionDown(page) {
    // DEFAULT MATRIX RAIN BEGGINING
    if(fadeIn){
        context.fillStyle = "rgba(0, 0, 0, 0.25)";
        context.fillRect(0, 0, width, drops[0] * fontSize);

        context.fillStyle = "#46EFF4";
        context.font = fontSize + "px arial";
        
        for (var i = 0; i < drops.length; i++){
            var text = japanese[Math.floor(Math.random() * japanese.length)];
            context.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // HIDE ELEMENTS OF OLD PAGE
            if (drops[i] * fontSize > transitionCanvas.height + 50) {
                if (page == "entry") {
                    document.getElementById("entry").style.visibility = "collapse";
                    StopMatrix();
                } else if (page == "projects") {
                    document.getElementById("main").style.visibility = "collapse";
                    ClearHexInterval();
                    StopMain();
                } else if (page == "main") {
                    document.getElementById("projects").style.visibility = "collapse";
                    ClearHexInterval();
                    //StopProjects();
                }
                hexBackground.style.visibility = "visible";
                fadeIn = false;
            }
            
            drops[i]++;
        }
    // MATRIX CURTAIN RAISE.
    } else {
        context.clearRect(0,0,width,height);
        context.drawImage(bg, 0, 0, width, height);
        
        context.fillStyle = "black";
        context.fillRect(0, 0, width, drops[0] * fontSize);
        
        for(var i = 0; i < drops.length; i++){
            context.fillStyle = "#46EFF4";
            context.font = fontSize + "px arial";
            
            var text = japanese[Math.floor(Math.random() * japanese.length)];
            context.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // START ANIMATIONS FOR NEW PAGE
            if (drops[i] == 1){
                if (i == columns - 1 && !animated){
                    if (page == "projects") {
                        //ProjectsTransition();
                    } else if (page == "main" || page == "entry") {
                        MainTransition();
                    }
                    StartHexInterval();
                    animated = true;
                }
            }
            
            // CLEAN UP
            if (drops[i] < 0) {
                transitionCanvas.style.visibility = "collapse";
                clearInterval(transitionInterval);
            }
            
            drops[i]--;
        }
    }
}

































































