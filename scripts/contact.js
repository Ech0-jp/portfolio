function ContactTransition() {
    document.getElementById("contact").style.visibility = "visible";
    
    AnimateText(document.getElementById("contact-header"), "Contact");
    
    $("#contact .container, #contact .container-horizontal, #contact .container-vertical").css({
        'animation-play-state': 'running'
    });
    
    setTimeout(function(){
        $("#contact .container, #contact .container-horizontal, #contact .container-vertical").css({
            'animation': 'none'
        });
        AnimateText(document.getElementById("contactFormHeader"), "Contact Me");
        $('#contactForm input[type="text"], #contactForm input[type="email"], #contactForm textarea').css({
            'animation-play-state': 'running'
        });
        $('#contactForm button[type="submit"]').css({
            'animation-play-state': 'running'
        });
        setTimeout(function(){
            AnimateText(document.getElementById("contactSubmit"), "Submit");
            $('#contactForm input[type="text"], #contactForm input[type="email"], #contactForm textarea').css({
                'animation': 'none'
            });
            $('#contactForm button[type="submit"]').css({
                'animation': 'none'
            });
        }, 1000);
    }, 2000);
}

function StopContact() {
    document.getElementById("contact").style.visibility = "collapse";
    $("#contact .container").css({
        'animation': 'container-anim 2s ease',
        'animation-play-state': 'paused'
    });
    $("#contact .container-horizontal").css({
        'animation': 'container-horizontal-anim 2s ease',
        'animation-play-state': 'paused'
    });
    $("#contact .container-vertical").css({
        'animation': 'container-vertical-anim 2s ease',
        'animation-play-state': 'paused'
    });
    $('#contactForm input[type="text"], #contactForm input[type="email"], #contactForm textarea').css({
        'animation': 'input-anim 1s ease',
        'animation-play-state': 'paused'
    });
    $('#contactForm button[type="submit"]').css({
        'animation': 'contact-button 1s ease',
        'animation-play-state': 'paused'
    });
    
    document.getElementById("contact-header").innerHTML = "";
    document.getElementById("contactFormHeader").innerHTML = "";
    document.getElementById("contactSubmit").innerHTML = "";
}

$("#contact-header").click(function(){
    StartTransition("down", "main");
    $(this).css({
        'pointer-events': 'none'
    });
    setTimeout(function(){
        $("#contact-header").css({
            'pointer-events': 'all'
        })
    }, 1000);
});

$("#contactForm").submit(function(e){
    $.ajax({
        url: "https://formspree.io/hit-the-hills@hotmail.ca",
        method: "POST",
        data: $(this).serialize(),
        dataType: "json"
    });
    e.preventDefault();
    $(this).get(0).reset();
    // MESSAGE SUCCESS !!!
});