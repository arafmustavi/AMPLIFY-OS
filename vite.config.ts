import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This is the most critical setting for GitHub Pages
  base: '/AMPLIFY-OS/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  // Fixed: Removed invalid historyApiFallback property
  server: {
  }
});
