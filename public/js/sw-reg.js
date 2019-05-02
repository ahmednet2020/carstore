// this key get from you firebase project console
// project setting ----> cloud messaging ----> Web Push certificates  --> Key pair
var publickey = "BLg0aCteMfSFAGtwnYmvJONFdOoR4E5AVeSqndDws7-gP3IOlDrUXPRwoi2FlhhyVtEET0wyarhcsre6UNjqIzo";
// ui Notification for client to get permission
var showNotification = document.querySelector(".showNotification")
var btnyas = document.querySelector("#btnyas")
var btnno = document.querySelector("#btnno")
var messaging = firebase.messaging();
var fireStore = firebase.firestore();
// Add the public key generated from the console here.
messaging.usePublicVapidKey(publickey);
// check if browser support pwa
if ('serviceWorker' in navigator) {
    window.addEventListener('load',function (e) {
        navigator.serviceWorker
        .register('./firebase-messaging-sw.js')
        .then((reg) => {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', reg.scope);
            // if user first time in page or no give your website permission
           if(Notification.permission === 'default') {
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
        sendToken()
      }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });
  })
  btnno.addEventListener("click", (e) => {
      showNotification.style.display = 'none'
      e.preventDefault()
  })
}
// if new Notification send and clint in page
// this function will run not setBackgroundMessageHandler in firebase-messaging-sw.js file
messaging.onMessage(function(payload) {
  // do what you nedd here
  console.log('Message received. ', payload);
})
// get fcm sdk teken user
// every user has own fcm token
// save this token in firestore collection
function sendToken() {
  messaging.getToken().then(function(token) {
    let FCMkey = token;
    fireStore.collection("FCMkeys").doc(FCMkey).set({
      token: FCMkey,
      date: new Date()
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

  }).catch(function (err) {
        console.log("err" + err);
  })
}
// if token change
messaging.onTokenRefresh(function() {
  sendToken()
})