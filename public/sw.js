var cache_version = "cache-v1";
var files = ['/', '../index.html'];
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cache_version)
        .then(function (cache) {
            return cache.addAll(files)
        })
        .catch(function (err) {
            console.log("err install", err);
        })
    )
})
self.addEventListener('fetch', function(event) {
   // console.log(event.request.url);
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
   });