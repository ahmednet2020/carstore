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
var cache_version = "cache-v4";
var files = ['/', '../index.html'];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cache_version)
        .then(function (cache) {
            return cache.addAll(files)
        })
        .then(function (cache) {
          return self.skipWaiting();
        })
        .catch(function (err) {
            console.log("err install", err);
        })
    )
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(
          keys.map( key => (key === cache_version ? key:caches.delete(key)) )
        ).then(() => {
          console.log('remove the old cashe done');
        }).catch(() => {
          console.log('remove old caches faild');
        })
    ));
})

self.addEventListener('fetch', function(event) {
  // console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
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
// self.addEventListener('push', function(event) {
//   const title = 'Push Codelab';
//   const options = {
//     body: 'Yay it works.',
//     icon: 'img/car-1.jpg',
//     badge: 'img/car-2.jpg'
//   };
//   console.log(event.data.blob())
//   event.waitUntil(self.registration.showNotification(title, options));
// });