$(document).ready(function(){
    // Make sure that the element doesn't go above the page.
    function CheckPos() {
        var imgPosY = $("#imgPositionDummy").position().top;
        var titlePosY = $("#titlePositionDummy").position().top;
        
        // position check for the image.
        if (imgPosY <= 70) {
            $("#projectsImageBorder").css({
                'transform': 'translate(50px, 70px)',
                'top': 0,
                'bottom': 0
            });
            $("#projectsImagesBackground").css({
                'transform': 'translate(50px, 70px)',
                'top': 0,
                'bottom': 0
            });
            $("#projectsImages").css({
                'transform': 'translate(50px, 70px)',
                'top': 0,
                'bottom': 0
            });
        } else {
            $("#projectsImageBorder").css({
                'transform': 'translate(50px, 50%)',
                'top': '',
                'bottom': '50%'
            });
            $("#projectsImagesBackground").css({
                'transform': 'translate(50px, 50%)',
                'top': '',
                'bottom': '50%'
            });
            $("#projectsImages").css({
                'transform': 'translate(50px, 50%)',
                'top': '',
                'bottom': '50%'
            });
        }
        
        //position check for the title.
        if (titlePosY <= 30) {
            $("#projectsTitle").css({
                'transform': 'translate(80px, 0)',
                'top': 0,
                'bottom': 0
            });
        } else {
            $("#projectsTitle").css({
                'transform': 'translate(80px, 50%)',
                'top': '',
                'bottom': 'calc(50% + 200px)'
            });
        }
    }
    setInterval(CheckPos, 100);
});

var projectImages = [];
var projectTitles = ["Title 1", "Title 2", "Title 3", "Title 4"];
var projectDescriptions = ["Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1 Decription 1",
                          "Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2 Decription 2",
                          "Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3 Decription 3",
                          "Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4 Decription 4"];































































