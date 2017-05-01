var elements = document.getElementsByClassName("console-text");
var strings = [];
for (var i = 0; i < elements.length; i++){
    strings[i] = elements[i].innerHTML;
    elements[i].innerHTML = "";
}
var index = 0;
var offset = 0;
var timeout = 5;
var iterations = 10;
var characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='];
var counter = 0;

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomCharacter() {
    return characters[getRandomInteger(0, characters.length - 1)];
}

function AnimateText(){
    var partialString = strings[index].substring(0, offset);
    setTimeout(() => {
        if (iterations >= 0) {
            if (iterations == 0) {
                elements[index].textContent = partialString;
                iterations = 10;
                offset++;
            } else {
                elements[index].textContent = partialString.substring(0, partialString.length - 1) + randomCharacter();
            }
            
            iterations--;
            if (offset <= strings[index].length)
                AnimateText();
            else
                index++;
        }
    }, timeout);
}