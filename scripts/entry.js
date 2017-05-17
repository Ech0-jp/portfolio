$(document).ready(function(){
    var screen = window.screen;
    var width = matrix.width = screen.width;
    var height = matrix.height = screen.height;
    
    var yPositions = Array(300).join(0).split('');
    var context = matrix.getContext('2d');
    
    var japanese = "あいうえおかきくけこさしすせそがぎぐげごぱぴぷぺぽアイウエオカキクケコサシスセソガギグゲゴパピプペポ";
    japanese = japanese.split("");
    
    var fontSize = 10;
    var columns = matrix.width / fontSize;
    
    var drops = [];
    for(var x = 0; x < columns; x++)
        drops[x] = 1;
    
    var matrixFilled = false;
    
    var draw = function(){
        context.fillStyle = "rgba(0, 0, 0, 0.05)";
        context.fillRect(0, 0, width, height);
        
        context.fillStyle = "#46EFF4"
        context.font = fontSize + "px arial";
        
        if (!matrixFilled){
            for(var i = 0; i < drops.length; i++){
                var text = japanese[Math.floor(Math.random() * japanese.length)];
                context.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > matrix.height && Math.random() > 0.975) {
                    drops[i] = 0;
                    if (matrixFilled == false) {
                        //animate the content background.
                        contentBacking.style.webkitAnimationPlayState = "running";
                        contentBackingBorderHorizontal.style.webkitAnimationPlayState = "running";
                        contentBackingBorderVertical.style.webkitAnimationPlayState = "running";
                        
                        // animate the welcome message.
                        setTimeout(() => {
                            //var target = entryWelcomeMessage;
                            AnimateText(entryWelcomeMessage, "Welcome to the portfolio of Andrew Gray!");
                        }, 2000);
                        
                        //animate the border for the button.
                        setTimeout(() => {
                            btnTop.style.webkitAnimationPlayState = "running";
                            btnBottom.style.webkitAnimationPlayState = "running";
                            setTimeout(() => {
                                btnRight.style.webkitAnimationPlayState = "running";
                                btnLeft.style.webkitAnimationPlayState = "running";
                                // Animate button text.
                                setTimeout(() => {
                                    //var target = entryButton;
                                    AnimateText(entryButton, "Enter");
                                    setTimeout(() => {
                                        btnEnter.style.pointerEvents = "all";
                                    }, 100);
                                }, 250);
                            }, 500);
                        }, 3500);
                        
                        matrixFilled = true;
                    }
                }
                drops[i]++;
            }
        }
        else{
            yPositions.map(function(y, index){
                text = japanese[Math.floor(Math.random() * japanese.length)];
                x = (index * 10) + 10;
                matrix.getContext('2d').fillText(text, x, y);
                if (y > 100 + Math.random() * 1e4)
                    yPositions[index] = 0;
                else
                    yPositions[index] = y + 10;
            });
        }
        
    };
    
    RunMatrix();
    
    function RunMatrix(){
        if (typeof Game_Interval != "undefined")
            clearInterval(Game_Interval);
        Game_Interval = setInterval(draw, 33);
    }
    
    window.StopMatrix = function(){
        clearInterval(Game_Interval);
    }
    
    window.StartMatrix = function(){
        Game_Interval = setInterval(draw, 33);
    }
    
    $("#btnEnter").click(function(){
        $("#btnEnter").addClass("no-hover");
        StartTransition("down", "entry");
    });
});































































