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
	workbox.precaching.precacheAndRoute([]);
}


