var delay = 1500;
var sliderRadios = document.getElementsByName("carousel-3d");
var index = 0
var imageCount = sliderRadios.length;

setInterval(function() {
    index++;
    if (index > imageCount - 1) {
        index = 0;
    }
    sliderRadios[index].click();
    console.log(sliderRadios[index].id);
}, delay);