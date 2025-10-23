import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for PWA with automatic version updates
if ('serviceWorker' in navigator) {
  // Listen for service worker messages about new versions
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NEW_VERSION_ACTIVATED') {
      console.log('🆕 New version detected:', event.data.version);
      console.log('💡 Message:', event.data.message);
      
      // Show a subtle notification to user about new version
      const updateBanner = document.createElement('div');
      updateBanner.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 999999;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 14px;
        max-width: 350px;
        animation: slideIn 0.5s ease-out;
      `;
      updateBanner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 24px;">🎉</div>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">New Update Available!</div>
            <div style="font-size: 12px; opacity: 0.9;">Refresh to get the latest features</div>
          </div>
        </div>
        <button onclick="location.reload()" style="
          margin-top: 12px;
          width: 100%;
          padding: 8px;
          background: white;
          color: #667eea;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
        ">Refresh Now</button>
      `;
      
      // Add animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(updateBanner);
      
      // Auto-dismiss after 30 seconds
      setTimeout(() => {
        updateBanner.style.animation = 'slideIn 0.5s ease-out reverse';
        setTimeout(() => updateBanner.remove(), 500);
      }, 30000);
    }
  });

  // Defer service worker registration to avoid blocking initial render
  window.addEventListener('load', () => {
    setTimeout(() => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ SW registered: ', registration);
          
          // Detect when a new service worker is waiting to activate
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('🔄 New service worker installed! Update available.');
                }
              });
            }
          });
          
          // Check for updates every 2 minutes (more frequent for faster detection)
          setInterval(() => {
            console.log('🔍 Checking for updates...');
            registration.update();
          }, 2 * 60 * 1000);
          
          // Also check for updates when page becomes visible
          document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
              console.log('👀 Page visible - checking for updates...');
              registration.update();
            }
          });
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