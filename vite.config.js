import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'home2-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];
          if (url === '/home2' || url === '/home2/' || url === '/home2.html') {
            req.url = '/index.html';
          }
          next();
        });
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        home2: resolve(__dirname, 'home2.html')
      }
    }
  }
});
