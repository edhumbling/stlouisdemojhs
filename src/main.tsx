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

              // Show welcome notification about daily reminders
              setTimeout(() => {
                new Notification('🎓 St. Louis Demo JHS - Study Reminders Enabled!', {
                  body: '📚 You\'ll receive daily homework reminders at 7:00 PM and learning encouragement at 7:30 PM Ghana time. Stay on top of your studies! 🌟',
                  icon: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
                  badge: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748175062297',
                  tag: 'reminder-setup',
                  requireInteraction: false
                });
              }, 2000); // Show after 2 seconds
            } else {
              console.log('📱 Notification permission denied');
            }
          });
        }
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);