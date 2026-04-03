const CACHE_NAME = 'kinetic-scanner-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        'scanner.html',
        'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // لو الملف متخزن هيفتحه فوراً حتى لو مفيش نت
      return response || fetch(event.request);
    })
  );
});
