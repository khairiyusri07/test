import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: ['index.html', 'menu.html', 'about.html', 'visit.html', 'order.html'],
    },
  },
});
