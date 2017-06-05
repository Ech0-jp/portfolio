var mainImage = document.getElementById("mainImages");
var maxErrors = 100;
var margin = 2200;
var emptyImage = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABA‌​AACAUwAOw==";
var imageSources = [
    "./images/main/softwareDeveloper.jpg", 
    "./images/main/gameDeveloper.png", 
    "./images/main/unityLogo.png",
    "./images/main/cSharp.jpg",
    "./images/main/cPlusPlus.jpg",
    "./images/main/js.jpg",
    "./images/main/html-css.jpg"];
var imageSourcesBase64 = null;
var imageIndex = 0;
var corruptImageInterval;
var stopMain = false;

if (imageSourcesBase64 === null) {
    imageSourcesBase64 = new Array();
    for (var i = 0; i < imageSources.length; i++) {
        toBase64(imageSources[i], function(dataURL){ imageSourcesBase64.push(dataURL); }, "image/jpeg");
    }
}

function toBase64(src, callback, outputformat, target = null){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputformat);
        callback(dataURL, target);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
}

function MainTransition(){
    console.log("MainTransition() called.");
    stopMain = false;
    document.getElementById("main").style.visibility = "visible";
    $("#mainImageBorder, #mainImagesBackground, #mainImages").css({
        'animation-play-state': 'running'
    });
    
    setTimeout(() => {
        $("#mainImageBorder, #mainImagesBackground, #mainImages").css({
        'animation': 'none'
    });
        corruptImage();
        AnimateText(mainProjectsLink, "Projects");
        AnimateText(mainAboutLink, "About");
        AnimateText(mainContactLink, "Contact");
        AnimateText(mainResumeLink, "Resume"); 
    }, 1000);
}

function StopMain(){
    stopMain = true;
    document.getElementById("main").style.visibility = "collapse";
    $("#mainImageBorder, #mainImagesBackground, #mainImages").css({
        'animation': 'imageBorderAnimation 1s ease',
        'animation-play-state': 'paused'
    });
    
    mainProjectsLink.innerHTML = "";
    mainAboutLink.innerHTML = "";
    mainContactLink.innerHTML = "";
    mainResumeLink.innerHTML = "";
}

function corruptImage() {
    if (stopMain){
        mainImage.src = "#";
        return;
    }
    mainImage.src = imageSourcesBase64[imageIndex];
    setTimeout(() => {
        if (corruptImageInterval)
            clearInterval(corruptImageInterval);
        corruptImageInterval = setInterval(() => { base64Corruption(imageSourcesBase64[imageIndex], mainImage); }, 26);
        
        setTimeout(() => {
            
            imageIndex += 1;
            if (imageIndex == imageSourcesBase64.length)
                imageIndex = 0;
            
            setTimeout(() => { 
                clearInterval(corruptImageInterval);
                corruptImage(); 
            }, 1000);
            
        }, 1000);
        
    }, 2000);
}

$("#mainProjectsLink").click(function(){
    StartTransition("down", "projects");
    $(this).css({
        'pointer-events': 'none'
    });
    setTimeout(function(){
        $("#mainProjectsLink").css({
            'pointer-events': 'all'
        })
    }, 1000);
});

$("#mainContactLink").click(function(){
    StartTransition("up", "contact");
    $(this).css({
        'pointer-events': 'none'
    });
    setTimeout(function(){
        $("#mainContactLink").css({
            'pointer-events': 'all'
        })
    }, 1000);
});

$("#mainAboutLink").click(function(){
    StartTransition("left", "about");
    $(this).css({
        'pointer-events': 'none'
    });
    setTimeout(function(){
        $("#mainAboutLink").css({
            'pointer-events': 'all'
        })
    }, 1000);
});

$("#mainResumeLink").click(function(){
    StartTransition("right", "resume");
    $(this).css({
        'pointer-events': 'none'
    });
    setTimeout(function(){
        $("#mainResumeLink").css({
            'pointer-events': 'all'
        })
    }, 1000);
});





















































