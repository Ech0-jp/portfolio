var aboutText = "Hi, my name is Robert Andrew Gray, I go by the name \"Andrew\". I am a fresh graduate from George Brown College in T127 - Computer Programming Analyst. Originally, I went to GBC to become a Game Programmer. However, at the end of my second year in T163 Game Programming, I decided that it would be best to broaden my scope. So I transferred into year 2 of T127 so I could have more opportunities.<br><br>" +
    "Throughout my two years spent as a Game Programmer, I recieved an internship with a subsidiary of 13AM Games. It was extermely fun and very challenging as we were working with a new technology called the \"Myo Armband\". At first, we were a team of 8; the Lead Developer, two 2nd year student programmers, two 3rd year student programmers, 2 artists and a sound developer. In the first 6 months, I helped the other 2nd year student Steve develope gameplay mechanics with the Myo Armband as well as develope the User Interface for the game, while the 3rd years handled the devlopment of the Artificial Intelligence. At the end of those 6 months, the 3rd programmers graduated and left the team. In which, I took over for the AI developement while finishing up what was left for the UI. Unfortunatley, at the end of my second year, when I transferred courses and had to say goodbye. From there, I gained inspiration to learn more about the new industry I was branching into and started to work on the desktop application called \"MyAnimeViewer\" when I could. Eventually, in my final year of T127, MyAnimeViewer transferred over as a project for a class called Capstone. MyAnimeViewer is now out in early alpha as it functions, but is missing a lot of the components the final product will contain.<br><br>" +
    "Although my desire to flourish in the Game Industry burns strong. I am beyond happy working in any field that involves programming. With my goal being to eventually receive a Masters Degree in Computer Sciene and climb the corporate ladder and/or help with the latest developments of Artificial Intelligence or Virtual Reality.";

function AboutTransition(){
    document.getElementById("about").style.visibility = "visible";
    AnimateText(document.getElementById("aboutReturn"), "About");
    AnimateText(document.getElementById("aboutText"), aboutText, true, 5);
}

function StopAbout(){
    document.getElementById("about").style.visibility = "collapse";
    document.getElementById("aboutReturn").innerHTML = "";
    document.getElementById("aboutText").innerHTML = "";
}

$("#aboutReturn").click(function(){
    StartTransition("right", "main");
    $(this).css({
        'pointer-events': 'none'
    });
    setTimeout(function(){
        $("#aboutReturn").css({
            'pointer-events': 'all'
        })
    }, 1000);
});