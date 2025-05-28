import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow access from Docker or LAN
    port: 5173,       // Default Vite port
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Use @/ to refer to src/
    },
  },
});
