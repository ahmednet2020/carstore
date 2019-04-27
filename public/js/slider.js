var imgnumber = 1;
var worker = document.querySelector(".worker")
var btnYas = document.querySelector("#btn-yas")
var btnNo = document.querySelector("#btn-no")
var deferredPrompt;
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
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    worker.style.display = 'block';
});
btnYas.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    worker.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  })
  window.addEventListener('appinstalled', (evt) => {
    console.dir(evt);
  });

  btnNo.addEventListener('click', (e) => {
    worker.style.display = 'none'
  })