import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/pollen/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@atoms': path.resolve(import.meta.dirname, 'src/components/atoms'),
      '@molecules': path.resolve(
        import.meta.dirname,
        'src/components/molecules',
      ),
      '@organisms': path.resolve(
        import.meta.dirname,
        'src/components/organisms',
      ),
      '@pages': path.resolve(import.meta.dirname, 'src/pages'),
      '@assets': path.resolve(import.meta.dirname, 'src/assets'),
      '@utils': path.resolve(import.meta.dirname, 'src/utils'),
      '@context': path.resolve(import.meta.dirname, 'src/context'),
    },
  },
});
