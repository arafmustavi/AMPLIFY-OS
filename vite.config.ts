
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Matches your repository name exactly
  base: '/AMPLIFY-OS/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  // This prevents "process is not defined" errors in the browser
  define: {
    'process.env': {
      API_KEY: process.env.API_KEY || ''
    }
  }
});
