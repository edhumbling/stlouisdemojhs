import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Force cache clear and service worker update
const APP_VERSION = 'v8-chatbot-fix-2024';
const STORED_VERSION = localStorage.getItem('app_version');

if (STORED_VERSION !== APP_VERSION) {
  console.log('🔄 New version detected, clearing caches...');
  
  // Clear all caches
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }
  
  // Unregister old service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
  
  // Update version
  localStorage.setItem('app_version', APP_VERSION);
  
  // Force reload after clearing
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

// Register Service Worker for PWA (notifications removed) - Deferred for faster page load
if ('serviceWorker' in navigator) {
  // Defer service worker registration to avoid blocking initial render
  window.addEventListener('load', () => {
    setTimeout(() => {
      navigator.serviceWorker.register('/sw.js?v=' + APP_VERSION)
        .then((registration) => {
          console.log('✅ SW registered: ', registration);
          
          // Check for updates every 5 minutes
          setInterval(() => {
            registration.update();
          }, 5 * 60 * 1000);
        })
        .catch((registrationError) => {
          console.log('❌ SW registration failed: ', registrationError);
        });
    }, 2000); // Register after 2 seconds to prioritize initial page load
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);