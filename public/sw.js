const CACHE_NAME = 'st-louis-demo-jhs-v7';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/applogo.png',
  '/loading Screen.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Anton&family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap'
];

// Install event - Progressive installation with better visibility
self.addEventListener('install', (event) => {
  console.log('🚀 St. Louis Demo. J.H.S PWA installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache opened for St. Louis Demo. J.H.S');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ St. Louis Demo. J.H.S PWA installed successfully!');

        // Notify all clients about successful installation
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'PWA_INSTALLED',
              message: 'App installed successfully!'
            });
          });
        });

        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ PWA installation failed:', error);

        // Notify clients about installation failure
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'PWA_INSTALL_FAILED',
              message: 'App installation failed. Please try again.'
            });
          });
        });
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - Fast activation
self.addEventListener('activate', (event) => {
  console.log('🎯 St. Louis Demo. J.H.S PWA activating...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ]).then(async () => {
      console.log('✅ St. Louis Demo. J.H.S PWA activated and ready!');
    })
  );
});

// Notification system removed
