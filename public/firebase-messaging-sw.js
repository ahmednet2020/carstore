// initialize firebase 
importScripts('https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.10.1/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyCAYw4YioZfWPA0QK40jGvd1Mvhr2F1iJI",
    authDomain: "carstore-d2063.firebaseapp.com",
    databaseURL: "https://carstore-d2063.firebaseio.com",
    projectId: "carstore-d2063",
    storageBucket: "carstore-d2063.appspot.com",
    messagingSenderId: "182851594715"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// this function work when website close by client
// if it is open onMessage function will fire in sw-reg.js file 
messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    badge: payload.data.badge
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});