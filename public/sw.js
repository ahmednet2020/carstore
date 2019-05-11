importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
if(workbox)
{
	workbox.core.skipWaiting();
	workbox.core.clientsClaim();
	workbox.core.setCacheNameDetails({
	  prefix: 'carstore',
	  suffix: 'v1'
	});
	workbox.routing.registerRoute(
		new RegExp(/.\.(jpg|png)/),
		new workbox.strategies.CacheFirst({
			 cacheName: 'img-cache',
		})
	);
	workbox.precaching.precacheAndRoute([
  {
    "url": "css/font-awesome.min.css",
    "revision": "1587f8872e13fa1dbe7f3535f684774f"
  },
  {
    "url": "css/media.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "css/normalize.css",
    "revision": "3f2d15ccdd5b9cc08e32def5e3360e7c"
  },
  {
    "url": "css/style.css",
    "revision": "cee322f48f6df7d1eb85778dbeb979c1"
  },
  {
    "url": "index.html",
    "revision": "c29d5741c85d6e53ad057874102aff4a"
  },
  {
    "url": "js/slider.js",
    "revision": "08f62fec45af2155b27695b86f73e8bb"
  },
  {
    "url": "js/sw-reg.js",
    "revision": "f35adefc0da872479292e60b697b4db7"
  },
  {
    "url": "robots.txt",
    "revision": "388ed88eec82ddeacbf877ee7dc4b225"
  }
]);
}


