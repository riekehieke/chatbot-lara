var cacheNames = "simple-sw-v1";

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheNames).then(function (cache) {

      return cache.addAll([
        "./",
        "./index.html",
        "./pages/rezept.html",
        "./pages/akte.html",
        "./pages/apotheke.html",
        "./pages/einstellungen.html",
        "./pages/erinnerung.html",
        "./pages/impressum.html",
        "./pages/katalog.html",
        "./pages/start.html",
        "./pages/termin.html",
        "./pages/unwohl.html",
        "https://unpkg.com/onsenui/css/onsenui.css",
        "https://unpkg.com/onsenui/css/onsen-css-components.min.css",
        "https://unpkg.com/onsenui/js/onsenui.min.js",
        "./assets/onsen-css-components.min.css",
        "./assets/fonts/EncodeSansSemiExpanded-Medium.ttf",
        "./assets/fonts/EncodeSansSemiExpanded-Regular.ttf",
        "./index.css",
        "./index.js",
        "./assets/smoothscroll.js",
        "./assets/alert.svg",
        "./assets/badge.svg",
        "./assets/calendar.svg",
        "./assets/pills.svg",
        "./assets/place.svg",
        "./assets/qr.png",
        "./manifest.json",
        "./assets/favicon/favicon.ico",
        "./assets/favicon/android-icon-36x36.png",
        "./assets/favicon/android-icon-48x48.png",
        "./assets/favicon/android-icon-72x72.png",
        "./assets/favicon/android-icon-96x96.png",
        "./assets/favicon/android-icon-144x144.png",
        "./assets/favicon/android-icon-192x192.png",
        "./assets/favicon/android-icon-512x512.png",
        "./assets/favicon/apple-icon-57x57.png",
        "./assets/favicon/apple-icon-60x60.png",
        "./assets/favicon/apple-icon-72x72.png",
        "./assets/favicon/apple-icon-76x76.png",
        "./assets/favicon/apple-icon-114x114.png",
        "./assets/favicon/apple-icon-120x120.png",
        "./assets/favicon/apple-icon-144x144.png",
        "./assets/favicon/apple-icon-152x152.png",
        "./assets/favicon/apple-icon-180x180.png",
        "./assets/favicon/apple-icon-precomposed.png",
        "./assets/favicon/apple-icon.png",
        "./assets/favicon/favicon-16x16.png",
        "./assets/favicon/favicon-32x32.png",
        "./assets/favicon/favicon-96x96.png",
        "./assets/favicon/ms-icon-70x70.png",
        "./assets/favicon/ms-icon-144x144.png",
        "./assets/favicon/ms-icon-150x150.png",
        "./assets/favicon/ms-icon-310x310.png",
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