import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'generate-redirects',
      closeBundle() {
        // Tạo file _redirects trong thư mục dist khi build
        writeFileSync('./dist/_redirects', '/* /index.html 200');
        console.log('✅ Created _redirects file for client-side routing');
      }
    }
  ],
  server: {
    port: 3000, // Port cho môi trường phát triển
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
