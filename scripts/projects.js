$(document).ready(function(){
    // Make sure that the element doesn't go above the page.
    function CheckPos() {
        var titlePosY = $("#titlePositionDummy").position().top;
        var positionLock = false;
        
        //position check for the title.
        if (titlePosY <= 180) {
            // Set Title
            $("#projectsTitle").css({
                'transform': 'translate(80px, 0)',
                'top': '120px',
                'bottom': 0
            });
            
            // Set Subtitle
            $("#projectsSubtitle").css({
                'transform': 'translate(80px, 0)', // +30
                'top': '180px',
                'bottom': 0
            });
            
            // Set Image
            $("#projectsImageBorder").css({
                'transform': 'translate(50px, 220px)',
                'top': 0,
                'bottom': 0
            });
            $("#projectsImagesBackground").css({
                'transform': 'translate(50px, 220px)',
                'top': 0,
                'bottom': 0
            });
            $("#projectsImages").css({
                'transform': 'translate(50px, 220px)',
                'top': 0,
                'bottom': 0
            });
            
            // Set Download
            $("#projectsDownload").css({
                'transform': 'translate(270px, 600px)',
                'top': 0,
                'bottom': 0
            });
            
            // Set Text
            $("#projectsText").css({
                'transform': 'translate(740px, 220px)',
                'top': 0,
                'bottom': 0
            });
            positionLock = true;
        } else {
            // Set Title
            $("#projectsTitle").css({
                'transform': 'translate(80px, 50%)',
                'top': '',
                'bottom': 'calc(50% + 230px)'
            });
            
            // Set Subtitle
            $("#projectsSubtitle").css({
                'transform': 'translate(80px, 50%)', // +30
                'top': '',
                'bottom': 'calc(50% + 180px)'
            });
            
            // Set Image
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
            
            // Set Download
            $("#projectsDownload").css({
                'transform': 'translate(270px, 50%)',
                'top': '',
                'bottom': 'calc(50% - 210px)'
            });
            
            // Set text
            $("#projectsText").css({
                'transform': 'translate(740px, 50%)',
                'top': '',
                'bottom': '50%'
            });
        }
        
        //check footer
        var footerPosY = $("#projects .footer-dummy").position().top;
        if (footerPosY <= 650){
            $("#projectsFooter").css({
               'bottom': '',
                'top': '650px'
            });
        } else {
            $("#projectsFooter").css({
               'bottom': '10px',
                'top': ''
            });
        }
    }
    setInterval(CheckPos, 100);
    
    // Menu functionality
    var menu = $(".menu");
    var menuBorderBottom = $("#menuBorderBottom");
    var expanded = false;
    var menuAnimating = false;
    
    var currentWidth = 150;
    var targetWidth = 1053;
    var targetHeight = 50;
    var targetRight = 451.5;
    
    var borderHeight = 50;
    var targetBorderHeight = 100;
    
    function expandMenu(){
        menu.css(
            "border", "3px solid white"
        );
        menu.animate({
            height: targetHeight,
            top: 50
        }, 500, function(){
            menu.animate({
                width: targetWidth,
                right: targetRight
            }, 500, function(){
                var menuIndex = 0;
                menu.children('a').each(function(){
                    $(this).css("pointer-events", "all");
                    $(this).css("cursor", "pointer");
                    $(this).removeClass("no-hover");
                    AnimateText(this, projectTitles[menuIndex]);
                    menuIndex++;
                });
                
                setTimeout(function(){
                    menuAnimating = false;
                }, 200);
            });
        });
        menuBorderBottom.animate({
            height: targetBorderHeight
        }, 500);
    }
    
    function closeMenu(){
        menu.children('a').each(function(){
            $(this).css("pointer-events", "none");
            $(this).css("cursor", "");
            $(this).addClass("no-hover");
            AnimateTextReverse(this);
        });
        setTimeout(function(){
            menu.animate({
                width: currentWidth,
                right: 0
            }, 500, function(){
                menu.animate({
                    height: 0,
                    top: 44
                }, 500);
                menuBorderBottom.animate({
                    height: borderHeight
                }, 500);
                setTimeout(function(){
                    menuAnimating = false;
                }, 500);
            });
        }, 500);
    }
    
    $(".menu-title").click(function(){
        if(expanded && !menuAnimating){
            closeMenu();
            expanded = false;
            menuAnimating = true;
        }else if(!menuAnimating){
            expandMenu();
            expanded = true;
            menuAnimating = true;
        }
    });
    
    menu.children('a').each(function(){
       $(this).click(function(){
            var text = this.innerHTML;
            var index = projectTitles.indexOf(text);
            if (index != projectIndex){
                ChangeProject(index);
                closeMenu();
                expanded = false;
                menuAnimating = true;
            }
       });
    });
    
    $("#projectsDownload").hover(function(){
        var y = $(this).position().top;
        $(this).stop(true, false).animate({
            letterSpacing: '65px',
            left: '-200px'
        }, 500);
    }, function(){
        var y = $(this).position().top;
        $(this).stop(true, false).animate({
            letterSpacing: '5px',
            left: ''
        }, 500);
    });
});

var projectIndex = 0;
var projectChangeTimeout = [3000, 2000, 3000, 1500, 1500, 2000, 600];
var projectImages = [];
var projectTitles = ["MyAnimeViewer", "Hammerfist", "Frogger", "Match 3", "Asteroids", "Blackjack", "Memory Game"];
var projectsSubtitles = [
    //MAV
    "June 2016 - Current",
    //Hammerfist
    "May 2015 - April 2016",
    //Frogger
    "DESN1083 - Assignment 2 - Mar 20, 2014",
    //Match 3
    "DESN1083 - Assignment 1 - Mar 1, 2014",
    //Asteroids
    "DESN1083 - Assignment 3 - Dec 14, 2013",
    //Blackjack
    "DESN1083 - Assignment 2 - Nov 28, 2013",
    //Memory Game
    "DESN1083 - Assignment 1 - Oct 21, 2013"
];
var projectsHrefs = [
    //MAV
    "https://www.dropbox.com/s/b1ryjmwocmulcyx/MyAnimeViewer.rar?dl=0",
    //Hammerfist
    "",
    //Frogger
    "https://www.dropbox.com/s/r93s24yydnlrnt0/Frogger.rar?dl=0",
    //Match 3
    "https://www.dropbox.com/s/llyroy5acq07lw4/K-On%21%20Match%203.rar?dl=0",
    //Asteroids
    "https://www.dropbox.com/s/352n7ykr7cwe5nz/Asteroids.rar?dl=0",
    //Blackjack
    "https://www.dropbox.com/s/u6w615fphneokul/Blackjack.rar?dl=0",
    //Memory Game
    "https://www.dropbox.com/s/p37oqsqiff41rnf/Memory%20Game.rar?dl=0"
];
var projectDescriptions = [
    //MAV Description
    "MyAnimeViewer is currently a desktop application that strives to make watching and tracking anime easier by taking multiple sources such as AniList.co and Crunchyroll.com and combining them into an easier to use desktop application. Features such as automatically updating your animelist when ever you watch an episode and notifying you when an entry in your plan to watch list goes live or a currently airing series in your currently watching list gets a new episode.<br/><br/>Features that are planned to be released consist of things such as Themes and Styles for the application that can be added and remove (similiar to MyAnimeList's CSS editor) and plugins to allow for sites that don't come as a default for MyAnimeViewer.",
    // Hammer Fist Description
    "A game where First-Person Brawling meets Boxercising. Developed in Unity using a Myo Armband as the controller. The player takes control of a descendant of a god to fight creatures that have escaped from their prison.<br><br>I joined a subsidiary of 13AM games during the summer after my first year of game development as an intern. During my 1 year time spent with them, I served as the UI programmer that helped with gameplay mechanics. After the 3rd years graduated and left the team, I took over as the AI programmer as well.",
    //Frogger Description.
    "Based off of the game made in 1981 by Konami, is a game where the player plays as a frog and has 3, 5, or 7 lives. The player must cross a series of roads filled with traffic and rivers that have logs to jump on to get across. At the end of the map, there are a few pads (or safe zones) that the player must reach. Once all the safezones are filled, the level is completed.<br/><br/>The theme that I went with for this remake is based off of an anime that I have watched called \"Madoka Magica\". A lot of the features that are in the original frogger are changed in this game, but it still carries the core concept (cross dangerous elements to reach a safe spot at the end of the map to complete the level and try for a highscore).",
    //Match 3 Description
    "A game with the concept of the well known game; bejeweled. The player is supposed to swap one gem with an adjacent one to form a chain of three or more gems of the same color. When this occurs the gems disappear and a new bunch of gems which are randomly generated drop from above to fill up the empty space. When falling gems automatically line-up a chain reaction is caused. The theme I went with on this game was an anime that i really enjoyed watching called K-On!.",
    //Asteroids Description
    "A remake of the tradition game: Asteroids. A game where you play as a space ship that is flying in an asteroid belt. You, the player, must survive as long as humanly possible while astroids are flying around you and enemy space ships try to blow you up. There wasn't much was changed from the original asteroids besides a major graphic overhaul and some added gameplay components. This was my first game made in Unity.",
    //Blackjack
    "A game that mimmics the traditional gambling game: BlackJack. A game where the player has to face the dealer. The goal is to get your 2 cards as close to 21 as possible, if you go over 21 you lose that hand. If the dealers hand is greater than yours, you also lose the hand. This continues until either you leave the table or run out of \"chips\"/money to play with. Features that would include real money were not included and the game does not have any online features.",
    //Memory Game
    "The first thing I ever programed and during my first year of college. It's a simple game where the player has to match the hidden tiles on the game board. I implemented a few game modes in this so the rules may vary depending on the game mode that is played."
];

function ProjectsTransition(){
    document.getElementById("projects").style.visibility = "visible";
    
    AnimateText(document.getElementById("projectsText"), projectDescriptions[0], 2, true);
    AnimateText(document.getElementById("projectsSubtitle"), projectsSubtitles[0]);
    AnimateText(document.getElementById("projectsDownload"), "Download");
    document.getElementById("projectsDownload").href = projectsHrefs[0];
    AnimateText(document.getElementById("projectsTitle"), projectTitles[0]);
    AnimateText(document.getElementById("projectsFooter"), "Projects");
    $("#projectsImagesBackground, #projectsImages, #projectsImageBorder").css("webkitAnimationPlayState", "running");
    $("#menuBorderTop, #menuBorderBottom").css("webkitAnimationPlayState", "running");
    setTimeout(function(){
        $("#menuBorderLeft, #menuBorderRight").css("webkitAnimationPlayState", "running");
        setTimeout(function(){
            AnimateText(document.getElementById("menu-title"), "Menu");
            $(".menu").css("border", "3px solid white");
        }, 500);
    }, 500);
}

function ChangeProject(index){
    var title = document.getElementById("projectsTitle");
    var subtitle = document.getElementById("projectsSubtitle");
    var download = document.getElementById("projectsDownload");
    var text = document.getElementById("projectsText");
    
    AnimateTextReverse(title);
    AnimateTextReverse(subtitle);
    AnimateTextReverse(download);
    AnimateTextReverse(text, 2, true);
    
    setTimeout(function(){
        AnimateText(title, projectTitles[index]);
        AnimateText(subtitle, projectsSubtitles[index]);
        if (projectsHrefs[index] != ""){
            AnimateText(download, "Download");
            document.getElementById("projectsDownload").href = projectsHrefs[index];
        }
        AnimateText(text, projectDescriptions[index], 2, true);
        projectIndex = index;
    }, projectChangeTimeout[projectIndex]);
}

function StopProjects(){
    document.getElementById("projects").style.visibility = "collapse";
    
    document.getElementById("projectsText").innerHTML = "";
    document.getElementById("projectsSubtitle").innerHTML = "";
    document.getElementById("projectsDownload").innerHTML = "";
    document.getElementById("projectsTitle").innerHTML = "";
    document.getElementById("projectsFooter").innerHTML = "";
}

$("#projectsFooter").click(function(){
    StartTransition("up", "main");
});
























































