var imgnumber = 1;
function slidershow() {
    "use strict";
    if (imgnumber === 1) {
        document.getElementById("input1").checked = true;
    } else if (imgnumber === 2) {
        document.getElementById("input2").checked = true;
    } else if (imgnumber === 3) {
        document.getElementById("input3").checked = true;
    } else {
        imgnumber = 4;
    }
}