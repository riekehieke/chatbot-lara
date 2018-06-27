var cacheNames = "simple-sw-v1";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheNames).then(function (cache) {

      return cache.addAll([
        "./",
        "./index.html",
        "./pages/rezept.html",
        "./pages/start.html",
        "./pages/termin.html",
        "./pages/unwohl.html",
        "https://fonts.googleapis.com/css?family=Encode+Sans+Semi+Expanded",
        "https://unpkg.com/onsenui/css/onsenui.css",
        "https://unpkg.com/onsenui/css/onsen-css-components.min.css",
        "https://unpkg.com/onsenui/js/onsenui.min.js",
        "./assets/onsen-css-components.min.css",
        "./index.css",
        "./index.js",
        "./favicon.ico",
        "./manifest.json",
        "./assets/favicon/*",
        "./assets/Logo.svg",
        "./assets/smoothscroll.js"
      ]);
    })
  )
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        if (thisCacheName !== cacheNames) {
          return caches.delete(thisCacheName);
        }
      }))
    })
  )
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});