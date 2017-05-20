$(document).ready(function(){
    var pdfWidth = '720px';
    var pdfHeight = '750px'
    var containerWidth = '150px';
    var containerTargetWidth = '726px';
    var containerHeight = '756px';
    var buttonHeight = '50px';
    var buttonTargetHeight = '803px';
    
    var resumeOpen = false;
    var cvOpen = false;
    
    function OpenResume(){
        $("#resumeButtonBottom").stop(true, false).animate({
            'height': buttonTargetHeight
        }, 500);
        $("#resumeExampleContainer").css("border", "3px solid white");
        $("#resumeExampleContainer").stop(true, false).animate({
            'height': containerHeight
        }, 500, null, function(){
            $("#resumeExampleContainer").stop(true, false).animate({
                'width': containerTargetWidth
            }, 500, null, function(){
                $("#resumeExample").css({'height': pdfHeight});
                resumeOpen = true;
            });
        });
    }
    
    function CloseResume(openCV = false){
        $("#resumeExample").css({'height': 0});
        $("#resumeExampleContainer").stop(true, false).animate({
            'width': containerWidth
        }, 500, null, function(){
            $("#resumeButtonBottom").stop(true, false).animate({
                'height': buttonHeight
            }, 500);
            $("#resumeExampleContainer").stop(true, false).animate({
                'height': 0
            }, 500, null, function(){
                $("#resumeExampleContainer").css("border", "0px solid white");
                resumeOpen = false;
                if (openCV)
                    OpenCV();
            });
        });
    }
    
    function OpenCV(){
        $("#cvButtonBottom").stop(true, false).animate({
            'height': buttonTargetHeight
        }, 500);
        $("#cvExampleContainer").css("border", "3px solid white");
        $("#cvExampleContainer").stop(true, false).animate({
            'height': containerHeight
        }, 500, null, function(){
            $("#cvExampleContainer").stop(true, false).animate({
                'width': containerTargetWidth
            }, 500, null, function(){
                $("#cvExample").css({'height': pdfHeight});
                cvOpen = true;
            });
        });
    }
    
    function CloseCV(openResume = false){
        $("#cvExample").css({'height': 0});
        $("#cvExampleContainer").stop(true, false).animate({
            'width': containerWidth
        }, 500, null, function(){
            $("#cvButtonBottom").stop(true, false).animate({
                'height': buttonHeight
            }, 500);
            $("#cvExampleContainer").stop(true, false).animate({
                'height': 0
            }, 500, null, function(){
                $("#cvExampleContainer").css("border", "0px solid white");
                cvOpen = false;
                if(openResume)
                    OpenResume();
            });
        });
    }
    
    window.ResumeTransition = function(){
        document.getElementById("resume").style.visibility = "visible";
        AnimateText(document.getElementById("resumeReturn"), "Resume");

        $("#resumeButton, #cvButton").animate({
            height: '51px'
        }, 250, null, function(){
            $("#resumeButtonTop, #cvButtonTop").css({
                'animation': 'buttonTop 0.5s ease',
                'animation-play-state': 'running'
            });
            $("#resumeButtonBottom, #cvButtonBottom").css({
                'animation': 'buttonBottom 0.5s ease',
                "animation-play-state": 'running'
            });
            setTimeout(function(){
                $("#resumeButtonLeft, #cvButtonLeft").css({
                    'animation': 'buttonLeft 0.5s ease',
                    'animation-play-state': 'running'
                });
                $("#resumeButtonRight, #cvButtonRight").css({
                    'animation': 'buttonRight 0.5s ease',
                    "animation-play-state": 'running'
                });
                setTimeout(function(){
                    AnimateText(document.getElementById("resumeButton"), "Resume");
                    AnimateText(document.getElementById("cvButton"), "Cover Letter");
                    $("#resumeButtonTop, #resumeButtonBottom, #resumeButtonLeft, #resumeButtonRight, #cvButtonTop, #cvButtonBottom, #cvButtonLeft, #cvButtonRight").css({
                        'animation': 'none'
                    });
                    setTimeout(function(){
                        OpenResume();
                    }, 500);
                }, 500);
            }, 500);
        });
    }
    
    window.StopResume = function(){
        document.getElementById("resume").style.visibility = "collapse";
        document.getElementById("resumeReturn").innerHTML = "";
        
        $("#resumeButton, #cvButton").css({'height': 0});
        document.getElementById("resumeButton").innerHTML = "";
        document.getElementById("cvButton").innerHTML = "";
        if(resumeOpen)
            CloseResume();
        if(cvOpen)
            CloseCV();
    }
    
    $("#resumeButton").click(function(){
        if(cvOpen)
            CloseCV(true);
    });
    
    $("#cvButton").click(function(){
        if(resumeOpen)
            CloseResume(true);
    });
    
//    ResumeTransition();
//    hexBackground.style.visibility = "visible";
//    StartHexInterval();
});

$("#resumeReturn").click(function(){
    StartTransition("left", "main");
    $(this).css({
        'pointer-events': 'none'
    });
    setTimeout(function(){
        $("#resumeReturn").css({
            'pointer-events': 'all'
        })
    }, 1000);
});





















































