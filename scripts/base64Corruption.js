function base64Corruption(src, target){
    var corrupted = src;
    if (Math.random() > 0.7) {
        var errors = Math.round(Math.random() * maxErrors)
        for (var i = 0; i < errors; i++) {
            var p = margin + Math.round(Math.random() * (corrupted.length - margin - 1));
            corrupted = corrupted.substr(0, p) + corrupted.charAt(p + 1) + corrupted.charAt(p) + corrupted.substr(p + 2);
        }
    }
    target.src = corrupted;
}