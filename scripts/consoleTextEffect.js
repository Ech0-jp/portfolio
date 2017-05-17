const resolver = {
    resolve: function resolve(options){
        function getRandomInteger(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function randomCharacter(characters){
            return characters[getRandomInteger(0, characters.length - 1)];
        }
        
        function newString(text, offset, count){
            var newString = "";
            for(var i = 0; i < count; i++){
                newString += randomCharacter(options.characters);
                if (options.addWhiteSpace)
                    newString += ' ';
            }
            return text.substr(0, offset) + newString;
        }
        
        function doFillerEffect(element, text, offset, timeout){
            setTimeout(function(){
                var count = text.length - offset;
                element.innerHTML = newString(text, offset, count);
            }, timeout);
        }
        
        function doRandomizerEffect(element, count, timeout){
            setTimeout(function(){
                var text = "";
                for(var i = 0; i < count; i++){
                    text += randomCharacter(options.characters);
                    if (options.addWhiteSpace)
                        text += ' ';
                }
                element.innerHTML = text;
            }, timeout);
        }
        
        function doResolverEffect(options){
            const element = options.element;
            const resolveString = options.resolveString;
            
            for(var i = 1; i <= resolveString.length; i++){
                doRandomizerEffect(element, i, i * options.timeout);
            }
            
            setTimeout(function(){
                for(var i = 1; i <= resolveString.length; i++){
                    doFillerEffect(element, resolveString, i, i * options.timeout);
                }
            }, resolveString.length * options.timeout);
        }
        
        doResolverEffect(options);
    }
}

const resolverReverse = {
    resolve: function resolve(options){
        function getRandomInteger(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function randomCharacter(characters){
            return characters[getRandomInteger(0, characters.length - 1)];
        }
        
        function newString(text, offset, amount){
            var newString = "";
            for(var i = 0; i < amount; i++){
                newString += randomCharacter(options.characters);
                if (options.addWhiteSpace)
                        newString += ' ';
            }
            return text.substr(0, offset) + newString;
        }
        
        function doRandomizerEffect(text, offset, amount, element, timeout){
            setTimeout(function() {
                element.innerHTML = newString(text, offset, amount);
            }, timeout);
        }
        
        function doDissolveEffect(element, count, timeout){
            setTimeout(function(){
                var newString = "";
                for (var i = 0; i < count; i++){
                    newString += randomCharacter(options.characters);
                    if (options.addWhiteSpace)
                        newString += ' ';
                }
                element.innerHTML = newString;
            }, timeout);
        }
        
        function doResolverEffect(options){
            const element = options.element;
            const resolveString = options.resolveString;
            var offset = options.offset;
            
            for(var i = 0; i < resolveString.length; i++){
                doRandomizerEffect(resolveString, offset, i, element, i * options.timeout);
                offset--;
            }
            
            setTimeout(function(){
                var t = 1;
                for(var x = resolveString.length - 1; x > 0; x--){
                    doDissolveEffect(element, x, t * options.timeout);
                    t++;
                }
                setTimeout(function(){
                    element.innerHTML = '';
                }, resolveString.length * options.timeout);
            }, resolveString.length * options.timeout);
        }
        
        doResolverEffect(options);
    }
}

const Options = {
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '', '*', '=']
}

function AnimateText(targetElement, text, timeout = 20, addWhiteSpace = false){
    let assignedOptions = Object.assign({}, Options, {resolveString: text, element: targetElement, timeout: timeout, addWhiteSpace: addWhiteSpace});
    
    resolver.resolve(assignedOptions);
}

function AnimateTextReverse(targetElement, timeout = 20, addWhiteSpace = false){
    var text = targetElement.innerHTML;
    var offset = text.length - 1;
    let assignedOptions = Object.assign({}, Options, {resolveString: text, offset: offset, element: targetElement, timeout: timeout, addWhiteSpace: addWhiteSpace});
    
    resolverReverse.resolve(assignedOptions);
}