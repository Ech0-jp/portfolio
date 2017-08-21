var toBase64 = function(src, callback, outputformat, target = null) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var context = canvas.getContext('2d');
        var dataURL;
        canvas.width = this.width;
        canvas.height = this.height;
        context.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputformat);
        callback(dataURL, target);
    };
    img.src = src;
    if (img.complete || img.complete === undefined){
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
}

export default toBase64;
