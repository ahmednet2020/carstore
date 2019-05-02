importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
	workbox.routing.registerRoute(
		/car-1.jpg$/,
		new workbox.strategies.CacheFirst({
			 cacheName: 'img-cache',
		})
	);
	workbox.routing.registerRoute(
		'/index.html',
		new workbox.strategies.CacheFirst({
			 cacheName: 'html-cache',
		})
	);
	workbox.routing.registerRoute(
		/\.js$/,
		new workbox.strategies.NetworkFirst({
			 cacheName: 'js-cache',
		})
	);
	workbox.routing.registerRoute(
		/\.css$/,
		new workbox.strategies.CacheFirst({
			 cacheName: 'css-cache',
		})
	);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}