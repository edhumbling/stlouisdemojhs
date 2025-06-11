import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA and request notification permissions
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);

        // Request notification permission for student reminders
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              console.log('📱 Notification permission granted for student reminders');

              // Show welcome notification about daily reminders (only if not shown before)
              const hasShownWelcome = localStorage.getItem('notification-welcome-shown');
              if (!hasShownWelcome) {
                setTimeout(() => {
                  new Notification('🎓 St. Louis Demo JHS - Daily Study Reminders Enabled!', {
                    body: '🌅 Morning motivation at 6:00 AM, 📚 homework reminders at 7:00 PM, and 🚀 learning encouragement at 7:30 PM Ghana time. Unique messages every day! 🌟',
                    icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
                    badge: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
                    tag: 'reminder-setup',
                    requireInteraction: false
                  });
                  localStorage.setItem('notification-welcome-shown', 'true');
                }, 2000); // Show after 2 seconds
              }

              // Trigger manual notification check when app loads
              if (registration.active) {
                registration.active.postMessage({ type: 'CHECK_NOTIFICATIONS' });
              }
            } else {
              console.log('📱 Notification permission denied');
            }
          });
        } else if (Notification.permission === 'granted') {
          // If permission already granted, trigger notification check
          if (registration.active) {
            registration.active.postMessage({ type: 'CHECK_NOTIFICATIONS' });
          }
        }
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });

  // Check for missed notifications when user comes back online
  window.addEventListener('online', () => {
    console.log('📶 App came back online, checking for missed notifications...');
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_NOTIFICATIONS' });
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);