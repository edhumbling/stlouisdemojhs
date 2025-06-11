const CACHE_NAME = 'st-louis-demo-jhs-v5';
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

// Daily messages for each notification type
const dailyMessages = {
  morning: {
    0: { // Sunday
      title: '🌅 Sunday Morning Motivation!',
      body: 'Good morning, champion! 🌟 Even on Sunday, a little study time can work wonders. Review your notes, prepare for the week ahead, and arrive at school early tomorrow! 📚✨ Have a blessed day!'
    },
    1: { // Monday
      title: '🌅 Monday Morning Energy!',
      body: 'Rise and shine, superstar! 💪 Start this Monday strong with some morning study time. Review yesterday\'s lessons, get to school early, and make this week amazing! 🚀📖'
    },
    2: { // Tuesday
      title: '🌅 Tuesday Morning Boost!',
      body: 'Good morning, brilliant mind! 🧠✨ Tuesday is perfect for building momentum. Study a bit, arrive early at school, and keep that learning spirit alive! 📚🌟'
    },
    3: { // Wednesday
      title: '🌅 Wednesday Morning Power!',
      body: 'Midweek motivation coming your way! 💫 Use this morning to review, prepare, and get to school ahead of time. You\'re halfway to weekend success! 🎯📚'
    },
    4: { // Thursday
      title: '🌅 Thursday Morning Drive!',
      body: 'Almost there, achiever! 🏆 Thursday morning study sessions are golden. Review your work, head to school early, and finish this week strong! 💪📖'
    },
    5: { // Friday
      title: '🌅 Friday Morning Finish!',
      body: 'TGIF, scholar! 🎉 End the week with morning study excellence. Review the week\'s lessons, get to school early, and celebrate your learning journey! 🌟📚'
    },
    6: { // Saturday
      title: '🌅 Saturday Morning Prep!',
      body: 'Weekend warrior mode! 💪 Saturday mornings are perfect for catching up and getting ahead. Study smart, prepare for Monday, and enjoy your weekend! 🌈📖'
    }
  },
  homework: {
    0: { // Sunday
      title: '📚 Sunday Study Session!',
      body: 'Sunday evening reflection time! 🌅 Complete any pending assignments and prepare for the week ahead. Your dedication today sets the tone for tomorrow! 💫📖'
    },
    1: { // Monday
      title: '📚 Monday Homework Check!',
      body: 'Monday motivation in action! 💪 Tackle today\'s homework with enthusiasm. Every assignment completed is a step closer to your dreams! 🌟📝'
    },
    2: { // Tuesday
      title: '📚 Tuesday Task Time!',
      body: 'Tuesday productivity mode! 🚀 Focus on your homework and assignments. Your consistent effort is building an amazing future! ✨📚'
    },
    3: { // Wednesday
      title: '📚 Wednesday Work Session!',
      body: 'Midweek homework mastery! 🎯 You\'re doing great! Complete today\'s assignments and keep that learning momentum going strong! 💪📖'
    },
    4: { // Thursday
      title: '📚 Thursday Achievement Time!',
      body: 'Thursday excellence in progress! 🏆 Finish your homework with pride. You\'re almost at the weekend - keep pushing forward! 🌟📝'
    },
    5: { // Friday
      title: '📚 Friday Finish Strong!',
      body: 'Friday homework finale! 🎉 Complete your assignments and celebrate a week of hard work. Weekend relaxation awaits! 💫📚'
    },
    6: { // Saturday
      title: '📚 Saturday Study Boost!',
      body: 'Weekend homework warrior! 💪 Use this time to catch up, get ahead, or review. Your weekend effort makes Monday easier! 🌈📖'
    }
  },
  learning: {
    0: { // Sunday
      title: '🚀 Sunday Learning Adventure!',
      body: 'Sunday evening exploration! 🌟 Dive into our Students Hub for exciting educational content. Prepare your mind for the week ahead! 🧠✨'
    },
    1: { // Monday
      title: '🚀 Monday Learning Launch!',
      body: 'Monday night knowledge quest! 💫 Explore our amazing study resources and AI tools. Transform your learning experience! 🎯📱'
    },
    2: { // Tuesday
      title: '🚀 Tuesday Discovery Time!',
      body: 'Tuesday evening brain training! 🧠 Check out our interactive learning tools and educational resources. Knowledge is power! ⚡📚'
    },
    3: { // Wednesday
      title: '🚀 Wednesday Wonder Session!',
      body: 'Midweek learning magic! ✨ Explore our Students Hub for study materials, AI assistance, and educational games. Keep growing! 🌱📖'
    },
    4: { // Thursday
      title: '🚀 Thursday Thinking Time!',
      body: 'Thursday evening enrichment! 🎓 Discover new learning resources and study tools. Your curiosity is your superpower! 💪🔍'
    },
    5: { // Friday
      title: '🚀 Friday Fun Learning!',
      body: 'Friday evening educational fun! 🎉 Explore our Students Hub for engaging content and study resources. Learn while you relax! 🌟📱'
    },
    6: { // Saturday
      title: '🚀 Saturday Study Safari!',
      body: 'Weekend learning expedition! 🦁 Explore our educational resources at your own pace. Make learning an adventure! 🗺️📚'
    }
  }
};

// Schedule daily notifications for students
function scheduleStudentNotifications() {
  console.log('📅 Setting up daily student notifications...');

  // Clear any existing alarms first
  if ('serviceWorker' in navigator && 'setInterval' in self) {
    // Schedule morning encouragement for 6:00 AM Ghana time daily
    scheduleNotification('morning-encouragement', {
      hour: 6, // 6 AM
      minute: 0,
      type: 'morning',
      icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      badge: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      tag: 'morning-encouragement',
      requireInteraction: true,
      actions: [
        {
          action: 'open-students-hub',
          title: '📖 Study Resources',
          icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297'
        },
        {
          action: 'dismiss',
          title: '✅ Ready!',
          icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297'
        }
      ],
      data: { url: '/students-hub' }
    });

    // Schedule homework reminder for 7:00 PM Ghana time daily
    scheduleNotification('homework-reminder', {
      hour: 19, // 7 PM
      minute: 0,
      type: 'homework',
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
      type: 'learning',
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
    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const now = new Date();
    const ghanaTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Accra"}));
    const dayOfWeek = ghanaTime.getDay();

    // Get the appropriate message for today
    const todayMessage = dailyMessages[options.type][dayOfWeek];

    self.registration.showNotification(todayMessage.title, {
      body: todayMessage.body,
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
