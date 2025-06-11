const CACHE_NAME = 'st-louis-demo-jhs-v6';
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
    ]).then(async () => {
      console.log('✅ St. Louis Demo. J.H.S PWA activated and ready!');

      // Check if this is the first installation
      const isFirstInstall = await checkFirstInstall();

      if (isFirstInstall) {
        // Send notification to user about successful installation (only once)
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

        // Mark as installed
        await markAsInstalled();
      }

      // Initialize daily student notifications
      await initializeNotificationSystem();
    })
  );
});

// Helper functions for installation tracking
async function checkFirstInstall() {
  try {
    const cache = await caches.open('notification-state');
    const response = await cache.match('installation-status');
    return !response; // If no response, it's first install
  } catch (error) {
    console.log('Error checking installation status:', error);
    return true; // Default to first install if error
  }
}

async function markAsInstalled() {
  try {
    const cache = await caches.open('notification-state');
    await cache.put('installation-status', new Response('installed'));
  } catch (error) {
    console.log('Error marking as installed:', error);
  }
}

// Notification state management
async function getNotificationState() {
  try {
    const cache = await caches.open('notification-state');
    const response = await cache.match('notification-schedule');
    if (response) {
      return await response.json();
    }
  } catch (error) {
    console.log('Error getting notification state:', error);
  }
  return {
    lastMorning: null,
    lastHomework: null,
    lastLearning: null,
    missedNotifications: []
  };
}

async function saveNotificationState(state) {
  try {
    const cache = await caches.open('notification-state');
    await cache.put('notification-schedule', new Response(JSON.stringify(state)));
  } catch (error) {
    console.log('Error saving notification state:', error);
  }
}

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

// Initialize notification system
async function initializeNotificationSystem() {
  console.log('📅 Initializing notification system...');

  // Check for missed notifications when coming back online
  await checkMissedNotifications();

  // Set up periodic check for notifications
  setInterval(async () => {
    await checkAndSendNotifications();
  }, 60000); // Check every minute

  // Initial check
  await checkAndSendNotifications();
}

// Check for missed notifications and current ones
async function checkAndSendNotifications() {
  const now = new Date();
  const ghanaTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Accra"}));
  const currentHour = ghanaTime.getHours();
  const currentMinute = ghanaTime.getMinutes();
  const today = ghanaTime.toDateString();

  const state = await getNotificationState();

  // Check for 6:00 AM morning notification
  if (currentHour === 6 && currentMinute === 0 && state.lastMorning !== today) {
    await sendNotification('morning', 'morning-encouragement');
    state.lastMorning = today;
    await saveNotificationState(state);
  }

  // Check for 7:00 PM homework notification
  if (currentHour === 19 && currentMinute === 0 && state.lastHomework !== today) {
    await sendNotification('homework', 'homework-reminder');
    state.lastHomework = today;
    await saveNotificationState(state);
  }

  // Check for 7:30 PM learning notification
  if (currentHour === 19 && currentMinute === 30 && state.lastLearning !== today) {
    await sendNotification('learning', 'learning-encouragement');
    state.lastLearning = today;
    await saveNotificationState(state);
  }
}

// Check for missed notifications when user comes back online
async function checkMissedNotifications() {
  const now = new Date();
  const ghanaTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Accra"}));
  const today = ghanaTime.toDateString();
  const currentHour = ghanaTime.getHours();
  const currentMinute = ghanaTime.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  const state = await getNotificationState();

  // Check if we missed morning notification (6:00 AM)
  if (currentTime > 360 && state.lastMorning !== today) { // 360 = 6:00 AM in minutes
    await sendNotification('morning', 'morning-encouragement', true);
    state.lastMorning = today;
  }

  // Check if we missed homework notification (7:00 PM)
  if (currentTime > 1140 && state.lastHomework !== today) { // 1140 = 7:00 PM in minutes
    await sendNotification('homework', 'homework-reminder', true);
    state.lastHomework = today;
  }

  // Check if we missed learning notification (7:30 PM)
  if (currentTime > 1170 && state.lastLearning !== today) { // 1170 = 7:30 PM in minutes
    await sendNotification('learning', 'learning-encouragement', true);
    state.lastLearning = today;
  }

  await saveNotificationState(state);
}

// Send notification with proper message for the day
async function sendNotification(type, tag, isMissed = false) {
  try {
    // Get current day of week (0 = Sunday, 1 = Monday, etc.)
    const now = new Date();
    const ghanaTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Accra"}));
    const dayOfWeek = ghanaTime.getDay();

    // Get the appropriate message for today
    const todayMessage = dailyMessages[type][dayOfWeek];

    // Modify message if it's a missed notification
    let title = todayMessage.title;
    let body = todayMessage.body;

    if (isMissed) {
      title = `⏰ ${title}`;
      body = `You missed this earlier! ${body}`;
    }

    // Define actions based on notification type
    let actions = [];
    if (type === 'morning') {
      actions = [
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
      ];
    } else if (type === 'homework') {
      actions = [
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
      ];
    } else if (type === 'learning') {
      actions = [
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
      ];
    }

    await self.registration.showNotification(title, {
      body: body,
      icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      badge: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
      tag: tag,
      requireInteraction: true,
      actions: actions,
      data: { url: '/students-hub' },
      vibrate: [200, 100, 200], // Gentle vibration pattern
      silent: false,
      renotify: true // Allow renotification with same tag
    });

    console.log(`📱 Sent ${type} notification for ${ghanaTime.toDateString()}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Handle when user comes back online
self.addEventListener('online', async () => {
  console.log('📶 User came back online, checking for missed notifications...');
  await checkMissedNotifications();
});

// Handle service worker message events (for manual checks)
self.addEventListener('message', async (event) => {
  if (event.data && event.data.type === 'CHECK_NOTIFICATIONS') {
    console.log('📱 Manual notification check requested');
    await checkAndSendNotifications();
  }
});

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
