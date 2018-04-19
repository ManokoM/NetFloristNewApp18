var petalSources = $('.flower .petals');

function populatePetals() {
    $.each(petalSources, function (index, src) {
        console.log(src);
        $(src).append(
          '<div class="petal petal1"></div>' +
          '<div class="petal petal2"></div>' +
          '<div class="petal petal3"></div>' +
          '<div class="petal petal4"></div>' +
          '<div class="petal petal5"></div>'
        );
    });
}


$(document).ready(function () {
    populatePetals();
});