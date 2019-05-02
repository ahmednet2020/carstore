var cache_version = "cache-v5";
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
self.addEventListener('push', function(event) {
  const data = event.data.json();
  const title = data.title;
  const options = {
    body: data.body,
    icon: 'img/car-1.jpg',
    badge: 'img/car-2.jpg'
  };

  console.log()
  event.waitUntil(self.registration.showNotification(title, options));
});
