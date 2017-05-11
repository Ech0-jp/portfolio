const resolver = {
    resolve: function resolve(options){
        function getRandomInteger(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
        function randomCharacter(characters){
            return characters[getRandomInteger(0, characters.length - 1)];
        }
        
        function doRandomizerEffect(options, callback){
            const characters = options.characters;
            const timeout = options.timeout;
            const element = options.element;
            const partialString = options.partialString;
            
            let iterations = options.iterations;
            
            setTimeout(() => {
               if (iterations >= 0) {
                   const nextOptions = Object.assign({}, options, {
                       iterations: iterations - 1
                   });
                   
                   if (iterations == 0) {
                       element.textContent = partialString;
                   } else {
                       element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                   }
                   
                   doRandomizerEffect(nextOptions, callback);
               } else if (typeof callback == "function") {
                   callback();
               }
            }, options.timeout);
        }
        
        function doResolverEffect(options){
            const resolveString = options.resolveString;
            const characters = options.characters;
            const offset = options.offset;
            const partialString = resolveString.substring(0, offset);
            const combinedOptions = Object.assign({}, options, {
                partialString: partialString
            });
            
            doRandomizerEffect(combinedOptions, () => {
                const nextOptions = Object.assign({}, options, { offset: offset + 1 });
                
                if (offset <= resolveString.length) {
                    doResolverEffect(nextOptions);
                } else if (typeof callback == "function") {
                    callback();
                }
            });
        }
        
        doResolverEffect(options);
    }
}

const options = {
    offset: 0,
    timeout: 5,
    iterations: 10,
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
}

function AnimateText(targetElement, text) {
    let assignedOptions = Object.assign({}, options, {resolveString: text, element: targetElement});
    resolver.resolve(assignedOptions);
}