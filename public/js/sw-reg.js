var publickey = "BLg0aCteMfSFAGtwnYmvJONFdOoR4E5AVeSqndDws7-gP3IOlDrUXPRwoi2FlhhyVtEET0wyarhcsre6UNjqIzo";
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
