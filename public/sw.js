// Update this version number with each deployment to force cache refresh
const CACHE_VERSION = '2025-10-23-louis-ai-v1.0.0';
const CACHE_NAME = `st-louis-demo-jhs-${CACHE_VERSION}`;
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

// Fetch event - Network first for JS/CSS, cache first for images
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Network-first strategy for JS, CSS, and HTML files
  if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response before caching
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
  } else {
    // Cache-first strategy for images and other assets
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((response) => {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
    );
  }
});

// Activate event - Fast activation with cache cleanup
self.addEventListener('activate', (event) => {
  console.log('🎯 St. Louis Demo. J.H.S PWA activating...');
  console.log('📦 New cache version:', CACHE_VERSION);

  event.waitUntil(
    Promise.all([
      // Clean up ALL old caches to force fresh content
      caches.keys().then((cacheNames) => {
        console.log('🔍 Found caches:', cacheNames);
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
      console.log('✨ Cache cleaned - users will get fresh content!');
      
      // Notify all clients to reload for new version
      const clients = await self.clients.matchAll();
      clients.forEach(client => {
        client.postMessage({
          type: 'NEW_VERSION_ACTIVATED',
          version: CACHE_VERSION,
          message: 'New version available! Refresh to get the latest updates.'
        });
      });
    })
  );
});

// Allow the page to request opening the app window after install
self.addEventListener('message', (event) => {
  if (!event || !event.data) return;
  const { type, url } = event.data;
  if (type === 'LAUNCH_APP') {
    const targetUrl = url || '/';
    event.waitUntil(
      self.clients.openWindow(targetUrl)
    );
  }
});

// Notification system removed
