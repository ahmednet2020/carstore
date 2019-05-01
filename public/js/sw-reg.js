var publickey = "BLg0aCteMfSFAGtwnYmvJONFdOoR4E5AVeSqndDws7-gP3IOlDrUXPRwoi2FlhhyVtEET0wyarhcsre6UNjqIzo";
var worker = document.querySelector(".worker")
var btnYas = document.querySelector("#btn-yas")
var btnNo = document.querySelector("#btn-no")
var deferredPrompt;
var showNotification = document.querySelector(".showNotification")
var btnyas = document.querySelector("#btnyas")
var btnno = document.querySelector("#btnno")
var messaging = firebase.messaging();
// Add the public key generated from the console here.
messaging.usePublicVapidKey(publickey);
if ('serviceWorker' in navigator) {
    window.addEventListener('load',function (e) {
        navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then((reg) => {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', reg.scope);
           if(Notification.permission === 'default') {
               // initializeUI(reg);
               firebaseRequest()
           }
        })
        .catch((err) => {
        // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
function firebaseRequest() {
  showNotification.style.display = 'block'
  btnyas.addEventListener("click", (e) => {
      showNotification.style.display = 'none'
      e.preventDefault()
      messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        messaging.onMessage(function(payload) {
          console.log('Message received. ', payload);
        })
      }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });
  })
  btnno.addEventListener("click", (e) => {
      showNotification.style.display = 'none'
      e.preventDefault()
  })
}
// get fcm sdk teken user
messaging.getToken().then(function(teken) {
  console.log(teken)

}).catch(function (err) {
      console.log("err" + err);
})
// build in function
// function urlB64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
// // 
// function initializeUI(swRegistration) {
//   // Set the initial subscription value
//   swRegistration.pushManager.getSubscription()
//   .then(function(subscription) {
//     //console.log(subscription)
//     if (subscription === null) {
//         showNotification.style.display = 'block'
//         btnyas.addEventListener("click", (e) => {
//             showNotification.style.display = 'none'
//             e.preventDefault()
//             subscribeUser(swRegistration);
//         })
//         btnno.addEventListener("click", (e) => {
//             showNotification.style.display = 'none'
//             e.preventDefault()
//         })
//     } else {
//       console.log('User IS subscribed.');
//     }
//   });
// }
// //
// function subscribeUser(swRegistration) {
//   swRegistration.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlB64ToUint8Array(publickey)
//   })
//   .then(function(subscription) {
//     console.log('User is subscribed.');
//   })
//   .catch(function(err) {
//     console.log('Failed to subscribe the user: ', err);
//   });
// }


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