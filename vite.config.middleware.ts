import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'rewrite-all',
      configureServer(server) {
        return () => {
          server.middlewares.use((req, _, next) => {
            const reqPath = req.url?.split('?')[0] || '';
            // If the request doesn't have a file extension, rewrite to index.html
            if (!path.extname(reqPath)) {
              req.url = '/index.html';
            }
            next();
          });
        };
      },
    },
  ],
});
