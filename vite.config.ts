import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

// Custom plugin to inject build timestamp into service worker
const serviceWorkerTimestampPlugin = () => {
  return {
    name: 'service-worker-timestamp',
    // This hook runs after the bundle is written to disk
    writeBundle: (options: any) => {
      const swPath = resolve(options.dir || 'dist', 'sw.js');
      try {
        let swContent = readFileSync(swPath, 'utf-8');
        const timestamp = new Date().toISOString();
        swContent = swContent.replace(/_BUILD_TIMESTAMP_/g, timestamp);
        writeFileSync(swPath, swContent);
        console.log(`✅ Service worker version updated with timestamp: ${timestamp}`);
      } catch (error) {
        console.error('❌ Error updating service worker version:', error);
      }
    },
  };
};


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    serviceWorkerTimestampPlugin() // Add our custom plugin here
  ],
  base: '/',
  optimizeDeps: {
    include: ['framer-motion', 'react', 'react-dom', 'react-router-dom', 'lucide-react'],
    // Pre-bundle dependencies for faster page loads
    exclude: []
  },
  // Enable aggressive code splitting for faster initial load
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group core React libraries together for better caching
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Defer animations to separate chunk - not critical for initial render
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            // Icons in separate chunk - loaded as needed
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Material UI in separate chunk - heavy library
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui';
            }
            // Helmet for SEO
            if (id.includes('react-helmet')) {
              return 'vendor-seo';
            }
            return 'vendor-other';
          }
          // Split pages into individual chunks for lazy loading
          if (id.includes('src/pages/')) {
            const pageName = id.split('src/pages/')[1].split('.')[0].toLowerCase();
            return `page-${pageName}`;
          }
          // Split large component sections
          if (id.includes('src/components/home/')) {
            return 'components-home';
          }
          if (id.includes('src/components/chatbot/')) {
            return 'components-chatbot';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
