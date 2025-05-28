import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [{
    name: 'html-fallback',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url.includes('.') && !req.url.startsWith('/api')) {
          req.url = '/';
        }
        next();
      });
    }
  }]
});
