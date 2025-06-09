import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['framer-motion', 'react', 'react-dom', 'react-router-dom', 'lucide-react']
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn']
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor';
          }
          // Router
          if (id.includes('react-router')) {
            return 'router';
          }
          // Animations
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          // Icons
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // UI Libraries
          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'ui';
          }
          // Data and utilities
          if (id.includes('src/data') || id.includes('src/utils')) {
            return 'data';
          }
          // Pages - split by route groups
          if (id.includes('src/pages')) {
            if (id.includes('HomePage') || id.includes('AboutPage')) {
              return 'pages-core';
            }
            if (id.includes('Gallery') || id.includes('Media')) {
              return 'pages-media';
            }
            if (id.includes('Students') || id.includes('SHS') || id.includes('AI')) {
              return 'pages-tools';
            }
            return 'pages-other';
          }
          // Components
          if (id.includes('src/components')) {
            if (id.includes('home')) {
              return 'components-home';
            }
            if (id.includes('layout') || id.includes('common')) {
              return 'components-core';
            }
            return 'components-other';
          }
          // Node modules
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
});
