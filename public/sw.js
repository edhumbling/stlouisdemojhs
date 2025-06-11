const CACHE_NAME = 'st-louis-demo-jhs-v4';
const urlsToCache = [
  '/',
  '/manifest.json',
  'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Anton&family=Dancing+Script:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap'
];

// Install event - Fast installation
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
        // Skip waiting to activate immediately
        return self.skipWaiting();
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
    ]).then(() => {
      console.log('✅ St. Louis Demo. J.H.S PWA activated and ready!');

      // Send notification to user about successful installation
      self.registration.showNotification('🎉 St. Louis Demo. J.H.S App Ready!', {
        body: 'The app is now installed and ready to use. Tap to open the app.',
        icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
        badge: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
        tag: 'pwa-ready',
        requireInteraction: true,
        actions: [
          {
            action: 'open',
            title: 'Open App',
            icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297'
          }
        ],
        data: {
          url: '/'
        }
      });

      // Initialize daily student notifications
      scheduleStudentNotifications();
    })
  );
});

// Schedule daily notifications for students
function scheduleStudentNotifications() {
  console.log('📅 Setting up daily student notifications...');

  // Clear any existing alarms first
  if ('serviceWorker' in navigator && 'setInterval' in self) {
    // Schedule homework reminder for 7:00 PM Ghana time daily
    scheduleNotification('homework-reminder', {
      hour: 19, // 7 PM
      minute: 0,
      title: '📚 Homework Reminder!',
      body: 'Hey there, brilliant student! 🌟 Don\'t forget to complete any homework assignments you received today. Your future self will thank you! 💪✨',
      icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      badge: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      tag: 'homework-reminder',
      requireInteraction: true,
      actions: [
        {
          action: 'open-students-hub',
          title: '📖 Study Resources',
          icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297'
        },
        {
          action: 'dismiss',
          title: '✅ Got it!',
          icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297'
        }
      ],
      data: { url: '/students-hub' }
    });

    // Schedule learning encouragement for 7:30 PM Ghana time daily
    scheduleNotification('learning-encouragement', {
      hour: 19, // 7 PM
      minute: 30, // 30 minutes
      title: '🚀 Time to Level Up Your Learning!',
      body: 'Ready to explore amazing educational resources? 🎯 Visit our Students Hub for interactive tools, study materials, and fun learning content! 📱💡',
      icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      badge: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      tag: 'learning-encouragement',
      requireInteraction: true,
      actions: [
        {
          action: 'open-students-hub',
          title: '🎓 Explore Resources',
          icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297'
        },
        {
          action: 'open-ai-search',
          title: '🤖 AI Study Help',
          icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297'
        }
      ],
      data: { url: '/students-hub' }
    });
  }
}

function scheduleNotification(id, options) {
  const now = new Date();
  const ghanaTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Accra"}));

  // Calculate next occurrence of the specified time
  const nextNotification = new Date(ghanaTime);
  nextNotification.setHours(options.hour, options.minute, 0, 0);

  // If the time has already passed today, schedule for tomorrow
  if (nextNotification <= ghanaTime) {
    nextNotification.setDate(nextNotification.getDate() + 1);
  }

  const delay = nextNotification.getTime() - ghanaTime.getTime();

  console.log(`⏰ Scheduling ${id} notification for ${nextNotification.toLocaleString()} Ghana time`);

  // Set initial timeout
  setTimeout(() => {
    showStudentNotification(options);

    // Set daily interval (24 hours = 86400000 ms)
    setInterval(() => {
      showStudentNotification(options);
    }, 86400000);
  }, delay);
}

function showStudentNotification(options) {
  if ('serviceWorker' in navigator && 'Notification' in window) {
    self.registration.showNotification(options.title, {
      body: options.body,
      icon: options.icon,
      badge: options.badge,
      tag: options.tag,
      requireInteraction: options.requireInteraction,
      actions: options.actions,
      data: options.data,
      vibrate: [200, 100, 200], // Gentle vibration pattern
      silent: false
    });
  }
}

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('📱 Notification clicked:', event.notification.tag);

  event.notification.close();

  // Handle different notification actions
  if (event.action === 'open-students-hub') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if Students Hub is already open
        for (const client of clientList) {
          if (client.url.includes('/students-hub') && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open Students Hub
        if (clients.openWindow) {
          return clients.openWindow('/students-hub');
        }
      })
    );
  } else if (event.action === 'open-ai-search') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if AI Search is already open
        for (const client of clientList) {
          if (client.url.includes('/ai-search') && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open AI Search
        if (clients.openWindow) {
          return clients.openWindow('/ai-search');
        }
      })
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification (already handled above)
    console.log('📝 Student acknowledged the reminder');
  } else if (event.action === 'open' || event.notification.tag === 'pwa-ready' ||
             event.notification.tag === 'homework-reminder' ||
             event.notification.tag === 'learning-encouragement') {
    // Default action - open the app or specific page
    const targetUrl = event.notification.data?.url || '/';
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // If target page is already open, focus it
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open target page
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
    );
  }
});
