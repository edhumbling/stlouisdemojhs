import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['framer-motion', 'react', 'react-dom', 'react-router-dom', 'lucide-react'],
    exclude: ['@calcom/embed-react', '@calcom/embed-core', '@calcom/embed-snippet']
  },
  build: {
    rollupOptions: {
      external: ['@calcom/embed-react', '@calcom/embed-core', '@calcom/embed-snippet'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
