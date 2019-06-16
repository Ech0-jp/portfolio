"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/portfolio/index.html","dd625c66734d500beb475c25b398098e"],["/portfolio/static/css/main.c1d52b7e.css","d3b7bda54a3af66da6eb3433762a2ee3"],["/portfolio/static/js/main.da14b9b2.js","453409d84f109d46700c9ff035327237"],["/portfolio/static/media/AndrewGray_CoverLetter_Example.00be93c1.pdf","00be93c14644e9fbc31ed0b6126143ad"],["/portfolio/static/media/AndrewGray_Resume_Example.ae50f200.pdf","ae50f200a638ba7030b4d9d4941c3d7f"],["/portfolio/static/media/HexBackground.1ba67c01.png","1ba67c01161d25193dfd06e1a645911e"],["/portfolio/static/media/ImageBorder.53052e99.png","53052e9921f82b942f8960ab389e297b"],["/portfolio/static/media/MAV_Browse.621975ff.jpg","621975ff19611c2b3b5df2bc7801065a"],["/portfolio/static/media/MAV_information.fe48737b.jpg","fe48737b2d9aad7cca893fff08db8f22"],["/portfolio/static/media/MAV_userlist.775f3d4c.jpg","775f3d4c279dcaf1d2e04f7b50f630d1"],["/portfolio/static/media/MAV_video.4bae4c72.png","4bae4c7264be3d4e74dca56e0b69e686"],["/portfolio/static/media/asteroids-game2.a05f32da.png","a05f32daa42bea14bd680490fd054d12"],["/portfolio/static/media/asteroids_game1.dd7a9ade.png","dd7a9adea0234ca8f2c7ff33bc3d300f"],["/portfolio/static/media/asteroids_menu.a7b4be6b.png","a7b4be6b04a6382158e0c257a237929e"],["/portfolio/static/media/blackjack_dealerwon.fc62b150.jpg","fc62b1508d7ac370b4aa235136ba8da1"],["/portfolio/static/media/blackjack_menu.466b76f6.jpg","466b76f691d90792490319eeabc3f69c"],["/portfolio/static/media/blackjack_playerwon.ac52391e.jpg","ac52391e705137ab05e10be434e5bd25"],["/portfolio/static/media/blackjack_table.97db4319.jpg","97db431909bd26cce0722873f45d5a15"],["/portfolio/static/media/cPlusPlus.2a1480ae.jpg","2a1480ae4f0e620fc370566739d2f1c8"],["/portfolio/static/media/cSharp.8effda40.jpg","8effda403a7d249eb142584a96727313"],["/portfolio/static/media/frogger_maingame.00c4e0c4.png","00c4e0c4aca3c2fcd730dbeb64f9fda1"],["/portfolio/static/media/game1.9539c5a6.jpg","9539c5a6b75d52cfb5dc4d51f7e280ae"],["/portfolio/static/media/game1.c5d652ca.jpg","c5d652ca19995b7f268699c4b56ef52d"],["/portfolio/static/media/game2.0b227c3f.jpg","0b227c3fc40077051eea936bf55c81cc"],["/portfolio/static/media/game3.3ad1fb3b.jpg","3ad1fb3bdd2cd5916cd40bfa4bb1bdfc"],["/portfolio/static/media/gameDeveloper.139673c7.png","139673c7f3943db8300af2306c38f994"],["/portfolio/static/media/html-css.03b9b9d8.jpg","03b9b9d82552d0c849f9283cfdc33a0a"],["/portfolio/static/media/js.08b15e3b.jpg","08b15e3b806695eb462e2dbf0a048289"],["/portfolio/static/media/lose.098ee04b.jpg","098ee04b57e9b3cbf9dc1244c89aec8c"],["/portfolio/static/media/match3_game.65f5af33.png","65f5af338e564b008e1c3cafad984238"],["/portfolio/static/media/match3_menu.6bbdc84f.png","6bbdc84f205df347518a6e3a0bb84e1c"],["/portfolio/static/media/memorygame_gameplay.1209aa66.jpg","1209aa662c42b119ec078d9c0bf797a2"],["/portfolio/static/media/memorygame_menu.dc46e966.jpg","dc46e96651d4f7d936fa260124ba5039"],["/portfolio/static/media/memorygame_start.5f07e8d7.jpg","5f07e8d798d97946ce17d145c441a7a0"],["/portfolio/static/media/menu1.60e9f579.jpg","60e9f5790004628c126f8c821e67b40b"],["/portfolio/static/media/menu2.b4cfd28e.jpg","b4cfd28eb2f94977d765f219c7f63e88"],["/portfolio/static/media/newgame.67026fd0.jpg","67026fd0548c3133ba252529a3018128"],["/portfolio/static/media/softwareDeveloper.bf33a0f5.jpg","bf33a0f5d794f7fe600e9b7eab5d822c"],["/portfolio/static/media/stats.9182f8b0.jpg","9182f8b0f4eabc122eb88cabdacc8bda"],["/portfolio/static/media/stats.f5383e23.jpg","f5383e23be24ccd8ded3687f2f5957c7"],["/portfolio/static/media/unityLogo.5a5f1b8e.png","5a5f1b8e8e5892e723f600c11d5a10f0"],["/portfolio/static/media/win.e33be406.jpg","e33be406aab1996583106bbacce9342c"],["/portfolio/static/media/win.f5d6a7ea.jpg","f5d6a7ea3530b77c591f7a169626e586"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,c){var o=new URL(e);return c&&o.pathname.match(c)||(o.search+=(o.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),o.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),o=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),o]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var c=new Request(t,{credentials:"same-origin"});return fetch(c).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/portfolio/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});