var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.moveTo(300, 0);
ctx.lineTo(300, 900);
ctx.moveTo(600, 0);
ctx.lineTo(600, 900);

ctx.moveTo(0, 300);
ctx.lineTo(900, 300);
ctx.moveTo(0, 600);
ctx.lineTo(900, 600);
ctx.stroke();

// used to download the html in jpg
var btn = document.getElementById('downBtn');
btn.onclick = function () {
    domtoimage.toJpeg(document.getElementById('myCanvas'))
        // data url to fix images in html and css 
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            // link.href = dataUrl; returns a hyperlink url 
            link.href = dataUrl;
            link.click();
        });
    }
        var btn = document.getElementById('simply');
btn.onclick = function () {
    domtoimage.toPng(document.getElementById('myCanvas'))
        // data url to fix images in html and css 
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.Png';
            // link.href = dataUrl; returns a hyperlink url 
            link.href = dataUrl;
            link.click();
        });

}

// To check weather the canvas is empty or not  
function canvasCheck(x, y) {
    var drawn = null;
    //  getimage data copies the pixel data of the specific triangle
    var d = ctx.getImageData(x, y, 300 - 5, 300 - 5);
    var len = d.data.length;
    for (var i = 0; i < len; i++) {
        if (!d.data[i]) {
            drawn = true;
        } else if (d.data[i]) {
            drawn = true;
            console.log('Something drawn on Canvas');
            return false;
            break;
        }
    }
    if (drawn) {
        console.log('Nothing drawn on canvas.. AKA, Canvas is Empty');
        return true;

    }
}
// To get the data from the images 
function loadImages(sources, callback) {
    var images = {};
    var loadedimges = 0;
    var numimages = 0;

    for (var src in sources) {
        numimages++;
    }
    var i = 1;
    for (var src in sources) {
        var x = "value" + i;
        console.log(x);
        images[x] = new Image();
        images[x].onload = function () {
            if (++loadedimges >= numimages) {
                console.log("return")
                callback(images);
            }
        };
        images[x].src = sources[src];
        console.log(images[x])
        i++;
    }
}

// select image from file manager 
loadFile = function (event) {
    var sources = {}
    for (var i = 0; i < event.target.files.length; i++) {
        var data = "value" + (i + 1);
        sources[data] = URL.createObjectURL(event.target.files[i]);
    }
    console.log(sources);

    loadImages(sources, function (images) {
        console.log(images.value1.currentSrc);
        console.log(images);
        //var z=2;

        var x, y;
        for (var j = 0; j < 9; j++) {

            if (j >= 0 && j <= 2) {
                y = 2;
            }
            else if (j >= 3 && j <= 5) {
                y = 302;
            }
            else if (j >= 6 && j <= 8) {
                y = 602;
            }
            if (j == 0 || j == 3 || j == 6) {
                x = 2;
            }
            else if (j == 1 || j == 4 || j == 7) {
                x = 302;
            }
            else if (j == 2 || j == 5 || j == 8) {
                x = 602;
            }
            var response = canvasCheck(x, y);
            if (response) {
                console.log(Object.keys(images).length);
                if ((Object.keys(images).length) + j <= 9) {
                    drawingImagesOnCanvas(x, y, images);
                    break;
                } else {
                    console.log("Space not enough")
                }
            }
        }
    });
}
// To drag and drop images in canvas 
window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    //var ctx=holder.getContext("2d");

    canvas.ondragover = function () { this.className = 'hover'; return false; };
    canvas.ondragend = function () { this.className = ''; return false; };
    canvas.ondrop = function (e) {
        e.stopPropagation();
        e.preventDefault();
        var sources = {};
        var files = e.dataTransfer.files
        // for img elements, url is the img src so 
        for (var i = 0; i < files.length; i++) {
            var data = "value" + (i + 1);
            sources[data] = URL.createObjectURL(e.dataTransfer.files[i]);
        }

        //console.log(file.name);
        loadImages(sources, function (images) {
            console.log(images.value1.currentSrc);
            console.log(images);

            var x, y;
            for (var j = 0; j < 9; j++) {

                if (j >= 0 && j <= 2) {
                    y = 2;
                }
                else if (j >= 3 && j <= 5) {
                    y = 302;
                }
                else if (j >= 6 && j <= 8) {
                    y = 602;
                }
                if (j == 0 || j == 3 || j == 6) {
                    x = 2;
                }
                else if (j == 1 || j == 4 || j == 7) {
                    x = 302;
                }
                else if (j == 2 || j == 5 || j == 8) {
                    x = 602;
                }
                var response = canvasCheck(x, y);
                if (response) {
                    console.log(Object.keys(images).length);
                    if ((Object.keys(images).length) + j <= 9) {
                        drawingImagesOnCanvas(x, y, images);
                        break;
                    } else {
                        console.log("Space not enough")
                    }
                }


            }
        });
    }
}
// place images inside the specific canvas 
function drawingImagesOnCanvas(x, y, images) {
    for (var src in images) {
        console.log(images[src]);
        ctx.drawImage(images[src], x, y, 300 - 5, 300 - 5);
        x = x + 300;
        if (x > 604) {3
            x = 0;
            y = y + 300;
        }

    }
}
// To check weather the canvas is fill or not 
// max upto 9 files
function checkFiles(files) {
    if (files.length > 9) {
        alert("The max no files is 9 only 9 files will be added to the canvas");

        let list = new DataTransfer();
        for (let i = 0; i < 9; i++)
            list.items.add(files[i])
        document.getElementById('image1').files = list.files
    }
}


