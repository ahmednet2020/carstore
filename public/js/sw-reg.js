// https://web-push-codelab.glitch.me/ for test
var publickey = "BJyjA0sQpxwfTVDyUp1GRinaN7xjREJf8ZsDI0h9T9OaNHs4N_KlogIHY2P0LXtULRzVwd6zcnaJQPUZI_tJB0U"
var privatekey = "no_DcnE5RNSbxPVHghA8qPnB8Rp1NRq9mZ9gDORHkcE"
var worker = document.querySelector(".worker")
var btnYas = document.querySelector("#btn-yas")
var btnNo = document.querySelector("#btn-no")
var deferredPrompt;
var showNotification = document.querySelector(".showNotification")
var btnyas = document.querySelector("#btnyas")
var btnno = document.querySelector("#btnno")
// check if browser support pwa
if ('serviceWorker' in navigator) {
    window.addEventListener('load',function (e) {
        navigator.serviceWorker
        .register('./sw.js') // register sw file
        .then((reg) => {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', reg.scope);
           if(Notification.permission === 'default') {
               initializeUI(reg);
           }
        })
        .catch((err) => {
           console.log('ServiceWorker registration failed: ', err);
        });
    });
}
// for Notification permission ui
function initializeUI(swRegistration) {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    //console.log(subscription)
    if (subscription === null) {
        showNotification.style.display = 'block'
        btnyas.addEventListener("click", (e) => {
            showNotification.style.display = 'none'
            e.preventDefault()
            subscribeUser(swRegistration);
        })
        btnno.addEventListener("click", (e) => {
            showNotification.style.display = 'none'
            e.preventDefault()
        })
    } else {
      console.log('User IS subscribed.');
    }
  });
}
//
function subscribeUser(swRegistration) {
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(publickey)
  })
  .then(function(subscription) {
  	// api key for 
  	// Subscription to Send To https://web-push-codelab.glitch.me/
    console.log('User is subscribed.', JSON.stringify(subscription));
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
  });
}

// build in function
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// add to home screen
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