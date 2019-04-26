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