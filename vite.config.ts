import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Dev proxy to bypass CORS in browser during development
  server: {
    proxy: {
      '/api': {
        target: 'http://87.98.160.37:3001',
        changeOrigin: true,
        // keep /api prefix so requests map 1:1
      },
    },
  },
});
